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
// ENCODAGE & DÉCODAGE COMPACT POUR LE PARTAGE
// ════════════════════════════════════════════════

function encodeResultsShare(payload) {
    try {
        const axesKeys = (typeof axes !== 'undefined') ? axes : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];
        const axList = axesKeys.map(ax => {
            const a = (payload.axes && payload.axes[ax]) ? payload.axes[ax] : { s: 0, n: 0, m: 0 };
            return [
                Math.round(parseFloat(a.s || 0) * 10) / 10,
                Math.round(parseFloat(a.n || 0) * 10) / 10,
                Math.round(parseFloat(a.m || 0) * 10) / 10
            ];
        });

        let ansPayload = "";
        if (typeof questions !== "undefined" && questions.length > 0 && payload.answers) {
            const valToChar = { "-1": "a", "-0.5": "b", "0": "c", "0.5": "d", "1": "e" };
            ansPayload = questions.map(q => {
                const v = payload.answers[q.id];
                return (v !== undefined && valToChar[String(v)] !== undefined) ? valToChar[String(v)] : "_";
            }).join("");
        } else if (typeof payload.answers === "string") {
            ansPayload = payload.answers;
        }

        const obj = {
            v: 1,
            n: payload.name ? String(payload.name).trim().substring(0, 30) : "",
            ax: axList,
            ic: Array.isArray(payload.icons) ? payload.icons : [],
            a: ansPayload
        };

        const json = JSON.stringify(obj);
        const utf8Bytes = encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode(parseInt(p1, 16));
        });
        return btoa(utf8Bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch(e) {
        console.error("Erreur lors de l'encodage du partage :", e);
        return "";
    }
}

function decodeResultsShare(str) {
    try {
        if (!str || typeof str !== 'string') return null;
        let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
        while (base64.length % 4) base64 += "=";
        const binStr = atob(base64);
        const jsonStr = decodeURIComponent(binStr.split("").map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        const obj = JSON.parse(jsonStr);
        if (!obj || !obj.ax) return null;

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
    } catch(e) {
        console.error("Erreur lors du décodage du partage :", e);
        return null;
    }
}