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
// ENCODAGE & DÉCODAGE EXACT & COMPACT POUR LE PARTAGE
// ════════════════════════════════════════════════

const _B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const _valToCode = { "-1": 1, "-0.5": 2, "0": 3, "0.5": 4, "1": 5 };
const _codeToVal = [undefined, -1, -0.5, 0, 0.5, 1];

function encodeResultsShare(payload) {
    try {
        if (!payload) return "";
        const name = payload.name ? String(payload.name).trim().substring(0, 30) : "";
        const axesObj = payload.axes || {};
        const icons = Array.isArray(payload.icons) ? payload.icons : [];
        const answers = payload.answers || {};

        const axesKeys = (typeof axes !== 'undefined') ? axes : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];

        // 1. Encodage exact des scores d'axes (s, n, m)
        const axesStr = axesKeys.map(ax => {
            const a = axesObj[ax] || { s: 0, n: 0, m: 0 };
            return `${Math.round(parseFloat(a.s || 0) * 10) / 10},${Math.round(parseFloat(a.n || 0) * 10) / 10},${Math.round(parseFloat(a.m || 0) * 10) / 10}`;
        }).join(";");

        // 2. Encodage des badges spéciaux
        const iconsStr = icons.join(",");

        // 3. Encodage compact des réponses aux questions (3 bits par question)
        let ansPacked = "";
        if (typeof questions !== "undefined" && questions.length > 0) {
            let vals = questions.map(q => {
                const v = answers[q.id];
                return (v !== undefined && _valToCode[String(v)] !== undefined) ? _valToCode[String(v)] : 0;
            });
            while (vals.length > 0 && vals[vals.length - 1] === 0) {
                vals.pop();
            }
            for (let i = 0; i < vals.length; i += 2) {
                const v1 = vals[i];
                const v2 = (i + 1 < vals.length) ? vals[i + 1] : 0;
                ansPacked += _B64[(v1 << 3) | v2];
            }
        }

        const encName = encodeURIComponent(name);
        return `v2~${encName}~${axesStr}~${iconsStr}~${ansPacked}`;
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

        const axesKeys = (typeof axes !== 'undefined') ? axes : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];

        // ── FORMAT V2 (SOLUTION 1 : Scores exacts + Réponses compactées) ──
        if (str.startsWith("v2~")) {
            const parts = str.split("~");
            let name = "";
            try { name = decodeURIComponent(parts[1] || ""); } catch(e) { name = parts[1] || ""; }
            const axesPart = parts[2] || "";
            const iconsPart = parts[3] || "";
            const ansPart = parts[4] || "";

            const resAxes = {};
            const axesList = axesPart.split(";");
            axesKeys.forEach((ax, idx) => {
                const raw = axesList[idx] ? axesList[idx].split(",") : [0, 0, 0];
                resAxes[ax] = {
                    s: parseFloat(raw[0]) || 0,
                    n: parseFloat(raw[1]) || 0,
                    m: parseFloat(raw[2]) || 0
                };
            });

            const icons = iconsPart ? iconsPart.split(",").filter(Boolean) : [];

            const answersMap = {};
            if (typeof questions !== "undefined") {
                let idx = 0;
                for (let i = 0; i < ansPart.length; i++) {
                    const code = _B64.indexOf(ansPart[i]);
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

            return {
                name: name,
                axes: resAxes,
                icons: icons,
                answers: answersMap,
                isShared: true
            };
        }

        // ── FORMAT V1 JSON BASE64 (Rétrocompatibilité : eyJ...) ──
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
                // continuer
            }
        }

        // ── FORMAT V1 COMPACT BASE64 ANSWERS ([Nom]~[PackedBase64]) ──
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

        // Calcul des axes pour le format V1
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