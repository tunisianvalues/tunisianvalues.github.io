// ════════════════════════════════════════════════
// UTILITAIRES
// ════════════════════════════════════════════════

function getParam(v) {
    for (const p of window.location.search.substring(1).split("&")) {
        const [k,val] = p.split("=");
        if (decodeURIComponent(k) === v) return decodeURIComponent(val||"");
    }
    return null;
}

function parseAnswers(s) {
    if (!s) return {};
    if (typeof s === 'object' && s !== null) return s;
    const m = {};
    s.split(',').forEach(p => { 
        const [k,v] = p.split(':'); 
        if (k && v !== undefined) m[k] = parseFloat(v); 
    });
    return m;
}

function pctToVector(l, r) { 
    return r - l; 
}

function cosineSimilarity(vecA, vecB, weights) {
    let dot = 0, magA = 0, magB = 0;
    for (const k in vecA) {
        const w = weights ? (weights[k]||1) : 1;
        const a = vecA[k]*w, b = vecB[k]*w;
        dot += a*b; magA += a*a; magB += b*b;
    }
    if (!magA || !magB) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function calculatePopulismScore(ans, qm) {
    if (!ans || !qm) return 0;
    let t = 0, ab = 0, c = 0;
    qm.forEach(q => {
        if (q.tags?.includes('is_populist') && ans[q.id] !== undefined) {
            t += ans[q.id]; ab += Math.abs(ans[q.id]); c++;
        }
    });
    if (!c || !ab) return 0;
    return Math.round((t/c + 1) * 50);
}

// ════════════════════════════════════════════════
// ENCODAGE & DÉCODAGE ULTRA-COMPACT POUR LE PARTAGE
// ════════════════════════════════════════════════

const _B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const _valToCode = { "-1": 1, "-0.5": 2, "0": 3, "0.5": 4, "1": 5 };
const _codeToVal = [undefined, -1, -0.5, 0, 0.5, 1];

function encodeResultsShare(payload) {
    try {
        if (!payload) return "";
        const answers = payload.answers || {};

        // S'il n'y a pas d'objets questions, fallback
        if (typeof questions === "undefined" || !questions.length) {
            return "";
        }

        let vals = questions.map(q => {
            const v = answers[q.id];
            return (v !== undefined && _valToCode[String(v)] !== undefined) ? _valToCode[String(v)] : 0;
        });

        // Enlever les zéros finaux (questions optionnelles non répondues)
        while (vals.length > 0 && vals[vals.length - 1] === 0) {
            vals.pop();
        }

        let packed = "";
        for (let i = 0; i < vals.length; i += 2) {
            const v1 = vals[i];
            const v2 = (i + 1 < vals.length) ? vals[i + 1] : 0;
            const code = (v1 << 3) | v2;
            packed += _B64[code];
        }

        const rawName = payload.name ? String(payload.name).trim().substring(0, 30) : "";
        const encName = encodeURIComponent(rawName);
        return encName ? `${encName}~${packed}` : packed;
    } catch(e) {
        console.error("Erreur lors de l'encodage du partage :", e);
        return "";
    }
}

function decodeResultsShare(str) {
    try {
        if (!str || typeof str !== "string") return null;
        str = str.trim();
        if (str.startsWith("s=")) str = str.substring(2);
        if (str.startsWith("share=")) str = str.substring(6);

        // 1. Rétrocompatibilité : Ancien format JSON base64 (e.g. eyJ...)
        if (str.startsWith("eyJ") || (str.length > 60 && !str.includes("~") && !str.includes("."))) {
            try {
                let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
                while (base64.length % 4) base64 += "=";
                const binStr = atob(base64);
                const jsonStr = decodeURIComponent(binStr.split("").map(function(c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(""));
                const obj = JSON.parse(jsonStr);
                if (obj && obj.ax) {
                    const axesKeys = (typeof axes !== 'undefined') ? axes : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];
                    const resAxes = {};
                    axesKeys.forEach((ax, idx) => {
                        const tuple = obj.ax[idx] || [0, 0, 0];
                        resAxes[ax] = { s: tuple[0], n: tuple[1], m: tuple[2] };
                    });

                    const ansMap = {};
                    if (obj.a && typeof obj.a === 'string' && typeof questions !== "undefined") {
                        const charToVal = { "a": -1, "b": -0.5, "c": 0, "d": 0.5, "e": 1 };
                        for (let i = 0; i < obj.a.length && i < questions.length; i++) {
                            const ch = obj.a[i];
                            if (charToVal[ch] !== undefined) {
                                ansMap[questions[i].id] = charToVal[ch];
                            }
                        }
                    } else if (obj.a && typeof obj.a === 'object') {
                        Object.assign(ansMap, obj.a);
                    }

                    return {
                        name: obj.n || "",
                        axes: resAxes,
                        icons: Array.isArray(obj.ic) ? obj.ic : [],
                        answers: ansMap,
                        isShared: true
                    };
                }
            } catch (err) {
                // continuer vers le décodeur ultra-compact
            }
        }

        // 2. Nouveau format ultra-compact : [Nom]~[PackedBase64]
        let name = "";
        let packed = str;
        if (str.includes("~")) {
            const parts = str.split("~");
            try {
                name = decodeURIComponent(parts[0]);
            } catch (e) {
                name = parts[0];
            }
            packed = parts.slice(1).join("~");
        }

        const answersMap = {};
        if (typeof questions !== "undefined") {
            let idx = 0;
            for (let i = 0; i < packed.length; i++) {
                const code = _B64.indexOf(packed[i]);
                if (code === -1) continue;
                const v1 = (code >> 3) & 7;
                const v2 = code & 7;

                if (idx < questions.length && v1 > 0 && _codeToVal[v1] !== undefined) {
                    answersMap[questions[idx].id] = _codeToVal[v1];
                }
                idx++;
                if (idx < questions.length && v2 > 0 && _codeToVal[v2] !== undefined) {
                    answersMap[questions[idx].id] = _codeToVal[v2];
                }
                idx++;
            }
        }

        // Calcul exact des scores d'axes et des icônes spéciales
        const axesKeys = (typeof axes !== 'undefined') ? axes : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];
        const calculatedAxes = {};
        axesKeys.forEach(ax => {
            calculatedAxes[ax] = { s: 0, n: 0, m: 0 };
        });

        const special_icons = [];
        if (typeof questions !== "undefined") {
            questions.forEach(q => {
                if (answersMap[q.id] !== undefined) {
                    const val = answersMap[q.id];
                    axesKeys.forEach(ax => {
                        const eff = (q.effect && q.effect[ax]) || 0;
                        if (eff !== 0) {
                            calculatedAxes[ax].m += Math.abs(eff);
                            if (val === 0) {
                                calculatedAxes[ax].n += Math.abs(eff);
                            } else {
                                calculatedAxes[ax].s += eff * val;
                            }
                        }
                    });
                    if (q.special && val > 0 && !special_icons.includes(q.special)) {
                        special_icons.push(q.special);
                    }
                }
            });
        }

        return {
            name: name,
            axes: calculatedAxes,
            icons: special_icons,
            answers: answersMap,
            isShared: true
        };
    } catch(e) {
        console.error("Erreur lors du décodage du partage :", e);
        return null;
    }
}