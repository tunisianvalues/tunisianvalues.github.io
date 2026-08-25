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
    let t = 0, ab = 0, c = 0;
    qm.forEach(q => {
        if (q.tags?.includes('is_populist') && ans[q.id] !== undefined) {
            t += ans[q.id]; ab += Math.abs(ans[q.id]); c++;
        }
    });
    if (!c || !ab) return 0;
    return Math.round((t/c + 1) * 50);
}