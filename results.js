// ════════════════════════════════════════════════
// ÉTAT GLOBAL
// ════════════════════════════════════════════════
let _uv = {};
let _ua = {};
let _pop = 0;
let _totalN = 0;
let _barsData = [];

// ════════════════════════════════════════════════
// INIT PRINCIPAL
// ════════════════════════════════════════════════
window.onload = function() {
        let totalN = 0;

        // 1. CALCUL DES DONNÉES (Exécuté une seule fois)
        try {
            axes.forEach(ax => {
                const cfg = axesConfig[ax];
                const s = parseFloat(getParam("s_" + ax) || 0);
                const n = parseFloat(getParam("n_" + ax) || 0);
                const m = parseFloat(getParam("m_" + ax) || 0);

                let exactNeutral = 0,
                    exactLeft = 0,
                    exactRight = 0;

                if (m > 0) {
                    exactNeutral = (n / m) * 100;
                    const dm = m - n;
                    if (dm > 0) {
                        const dp = 100 - exactNeutral;
                        const ns = (s + dm) / (2 * dm);
                        exactLeft = ns * dp;
                        exactRight = dp - exactLeft;
                    }
                } else {
                    exactNeutral = 100;
                }

                const rLeft = Math.round(exactLeft);
                const rNeutral = Math.round(exactNeutral);
                const rRight = 100 - rLeft - rNeutral;

                totalN += exactNeutral;
                _uv[ax] = pctToVector(exactLeft, exactRight);

                _barsData.push({
                    ax,
                    cfg,
                    left: rLeft,
                    right: rRight,
                    neutral: rNeutral,
                    leftExact: exactLeft,
                    rightExact: exactRight,
                    neutralExact: exactNeutral
                });
            });

            _totalN = totalN;
            _ua = parseAnswers(getParam("ans"));

            if (typeof questions !== 'undefined') {
                _pop = calculatePopulismScore(_ua, questions);
            }
        } catch (e) {
            console.error("Erreur de calcul des données :", e);
        }

        // 2. FONCTION D'AFFICHAGE (Peut être ré-exécutée si la langue change)
        function renderUI() {
            const bc = document.getElementById("bars-container");
            const wc = document.getElementById("weights-container");

            if (bc) bc.innerHTML = '';
            if (wc) wc.innerHTML = '';

            _barsData.forEach(b => {
                const trName = window.TV ? window.TV.tr('ax_' + b.ax) : b.cfg.name;
                const trLeft = window.TV ? window.TV.tr('ax_' + b.ax + '_left') : b.cfg.leftLabel;
                const trRight = window.TV ? window.TV.tr('ax_' + b.ax + '_right') : b.cfg.rightLabel;
                const trNeutral = window.TV ? window.TV.tr('neutral_pct') : 'Neutre';

                if (bc) {
                    bc.innerHTML += `
                    <div class="mb-2">
                      <div class="flex justify-between items-end mb-1">
                        <span class="text-lg font-bold" style="color:${b.cfg.leftColor}">${trName}</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-8 shadow-inner flex overflow-hidden bar-shadow">
                        <div style="width:${b.left}%;background-color:${b.cfg.leftColor}" class="h-full"></div>
                        <div style="width:${b.neutral}%;background-color:#cbd5e1" class="h-full"></div>
                        <div style="width:${b.right}%;background-color:${b.cfg.rightColor}" class="h-full"></div>
                      </div>
                      <div class="flex justify-between items-center text-sm mt-1 font-medium">
                        <div class="text-left w-1/3 leading-tight">
                          <span class="text-xl font-bold" style="color:${b.cfg.leftColor}">${b.left}%</span>
                          <span class="text-gray-600 block text-xs uppercase">${trLeft}</span>
                        </div>
                        <div class="text-center w-1/3 text-gray-400 text-xs">${trNeutral}: ${b.neutral}%</div>
                        <div class="text-right w-1/3 leading-tight">
                          <span class="text-xl font-bold" style="color:${b.cfg.rightColor}">${b.right}%</span>
                          <span class="text-gray-600 block text-xs uppercase">${trRight}</span>
                        </div>
                      </div>
                    </div>`;
                }

                if (wc) {
                    const existingSlider = document.getElementById(`weight-${b.ax}`);
                    const currentVal = existingSlider ? existingSlider.value : 1;

                    wc.innerHTML += `
                    <div class="flex flex-col">
                      <label class="font-bold text-gray-700">${trName}</label>
                      <input type="range" id="weight-${b.ax}" min="0.5" max="2" step="0.5" value="${currentVal}" class="slider-input">
                    </div>`;
                }
            });

            const popMeter = document.getElementById("populism-meter");
            if (popMeter) {
                const trPop = window.TV ? window.TV.tr('results_populism') : 'Populisme';
                popMeter.innerHTML = `${trPop}: <span class="font-bold text-${_pop>60?'red':'blue'}-600">${_pop}%</span>`;
            }

            const iconsParam = getParam("icons");
            if (iconsParam) {
                const container = document.getElementById("special-icons-container");
                const list = iconsParam.split(',').filter(i => i.length > 0);
                if (list.length > 0 && container) {
                    const trSpecTitle = window.TV ? window.TV.tr('results_special_title') : 'Positions Spéciales';
                    let h = `<h3 class="text-3xl font-bold mb-8 text-gray-800">${trSpecTitle}</h3><div class="flex justify-center gap-8 flex-wrap">`;
                    list.forEach(n => {
                        const specName = window.TV ? window.TV.tr('spec_' + n) : (specialLabels[n] || n);
                        h += `<div class="flex flex-col items-center group w-40">
                        <div class="bg-white p-3 rounded-xl shadow-md border border-gray-100 group-hover:shadow-lg transition-all mb-2">
                            <img src="icons/${n}.png" alt="${specName}" class="h-20 w-20 object-contain" onerror="this.style.display='none'">
                        </div>
                        <span class="text-gray-700 font-semibold text-center">${specName}</span>
                    </div>`;
                    });
                    h += `</div>`;
                    container.innerHTML = h;
                }
            }

            calculateMatch();
        }

        renderUI();

        document.addEventListener('tv:langchange', function() {
            renderUI();
            if (typeof window.renderCompass === "function" && document.getElementById("compass-content") && !document.getElementById("compass-content").classList.contains("hidden")) {
                window.renderCompass();
            }
        });

        function calculateMatch() {
            const weights = {};
            axes.forEach(ax => {
                const el = document.getElementById(`weight-${ax}`);
                weights[ax] = el ? parseFloat(el.value) : 1;
            });

            const mid = rv => { const m = {}; for (const ax in rv) m[ax] = (rv[ax][0] + rv[ax][1]) / 2; return m; };

            // ── 1. CALCUL PARTIS (Système de zone) ──
            let scores = [];
            ideologies.forEach(party => {
                let vet = false;
                const pm = mid(party.range_vector);
                ["demo", "reli", "econ"].forEach(ax => {
                    const u = _uv[ax],
                        [mn, mx] = party.range_vector[ax];
                    if ((u < mn ? mn - u : u > mx ? u - mx : 0) > 100) vet = true;
                });
                if (party.vetos)
                    for (const q in party.vetos) {
                        const r = party.vetos[q],
                            v = _ua[q] || 0;
                        if ((r.type === "greater" && v > r.val) || (r.type === "less" && v < r.val)) vet = true;
                    }
                if (vet) { scores.push({ name: party.name, score: 0, veto: true, image: party.image, id: party.id }); return; }
                let sim = cosineSimilarity(_uv, pm, weights);
                let base = (sim + 1) * 50,
                    pen = 0;
                axes.forEach(ax => {
                    const u = _uv[ax],
                        [mn, mx] = party.range_vector[ax],
                        w = weights[ax];
                    pen += (u < mn ? mn - u : u > mx ? u - mx : 0) * 0.2 * w; // Pénalité de zone
                });
                const sc = Math.max(0, Math.min(100, Math.round(base - pen) - Math.round(Math.abs(_pop - party.populism) * 0.2)));
                scores.push({ name: party.name, score: sc, veto: false, image: party.image, id: party.id });
            });
            scores.sort((a, b) => b.score - a.score);

            // ── 2. CALCUL PERSONNALITÉS (Nouveau système - Point exact) ──
            let persScores = [];
            if (typeof personalities !== "undefined") {
                personalities.forEach(p => {
                    let vet = false;
                    const pm = p.vector; // On utilise le point exact au lieu du mid()

                    ["demo", "reli", "econ"].forEach(ax => {
                        const u = _uv[ax];
                        if (Math.abs(u - pm[ax]) > 100) vet = true;
                    });
                    if (p.vetos)
                        for (const q in p.vetos) {
                            const r = p.vetos[q],
                                v = _ua[q] || 0;
                            if ((r.type === "greater" && v > r.val) || (r.type === "less" && v < r.val)) vet = true;
                        }
                    if (vet) { persScores.push({ name: p.name, score: 0, veto: true, image: p.image, id: p.id }); return; }

                    let sim = cosineSimilarity(_uv, pm, weights);
                    let base = (sim + 1) * 50,
                        pen = 0;

                    axes.forEach(ax => {
                        const u = _uv[ax],
                            w = weights[ax];
                        pen += Math.abs(u - pm[ax]) * 0.12 * w;
                    });

                    // ── SYSTEME DE BOOSTS ──
                    let bonus = 0;
                    if (p.boosts) {
                        for (const q in p.boosts) {
                            const b = p.boosts[q];
                            const v = _ua[q] || 0;
                            if ((b.type === "greater" && v > b.val) || (b.type === "less" && v < b.val)) {
                                bonus += b.bonus;
                            }
                        }
                    }

                    const sc = Math.max(0, Math.min(100, Math.round(base - pen) - Math.round(Math.abs(_pop - p.populism) * 0.2) + bonus));
                    persScores.push({ name: p.name, score: sc, veto: false, image: p.image, id: p.id });
                });
                persScores.sort((a, b) => b.score - a.score);
            }

            const avgN = _totalN / axes.length;
            document.getElementById("neutrality-warning") ?.classList.toggle("hidden", avgN <= 50);

            let top = scores[0],
                indep = avgN > 60 || !top || top.score < 50;

            const trIndep = window.TV ? window.TV.tr('results_independent') : "Indépendant / Sans Affiliation";
            if (indep) top = { name: trIndep, score: top ? top.score : 0, image: null };

            // MAJ DOM Parti
            const lbl = document.getElementById("ideology-label");
            if (lbl) {
                lbl.innerText = top.name;
                lbl.classList.toggle("text-red-600", !indep);
                lbl.classList.toggle("text-gray-600", indep);
            }
            const winImg = document.getElementById("winner-image-container");
            if (winImg) {
                winImg.innerHTML = top.image ?
                    `<img src="${top.image}" class="h-full w-full object-contain">` :
                    `<span class="text-6xl">${indep?'🇹🇳':'🏛️'}</span>`;
            }

            // MAJ DOM Personnalité
            let topPers = persScores[0];
            const trNoPers = window.TV ? window.TV.tr('results_no_personality') : "Aucune figure proche";
            if (indep || !topPers || topPers.score < 45) {
                topPers = { name: trNoPers, score: topPers ? topPers.score : 0, image: null };
            }

            const persLbl = document.getElementById("personality-label");
            if (persLbl) {
                persLbl.innerText = topPers.name;
                persLbl.classList.toggle("text-red-600", topPers.image !== null);
                persLbl.classList.toggle("text-gray-600", topPers.image === null);
            }
            const persImg = document.getElementById("personality-image-container");
            if (persImg) {
                persImg.innerHTML = topPers.image ?
                    `<img src="${topPers.image}" class="h-full w-full object-cover">` :
                    `<span class="text-6xl text-slate-300">👤</span>`;
            }

            // ── 3. CLASSEMENT PARTIS UNIQUEMENT ──
            const trIncomp = window.TV ? window.TV.tr('result_incompatible') : 'Incompatible';
            const trReadHist = window.TV ? window.TV.tr('btn_read_history') : "Aperçu historique";
            let h = "";

            scores.forEach(s => {
                        const col = s.veto ? "bg-gray-400" : s.score > 85 ? "bg-green-600" : s.score > 65 ? "bg-green-500" : s.score > 45 ? "bg-yellow-500" : "bg-red-500";
                        const imgH = s.image ?
                            `<img src="${s.image}" class="h-12 w-12 object-contain mr-4 rounded-md bg-white p-1 shadow-sm border border-gray-100" onerror="this.style.display='none'">` :
                            `<div class="h-12 w-12 mr-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">?</div>`;
                        const trHistText = window.TV ? window.TV.tr('hist_' + s.id) : "";

                        h += `<div class="mb-5 ${s.veto?'opacity-50':''} hover:bg-gray-50 p-3 rounded-lg border border-transparent hover:border-gray-200 transition-all">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center">
                    ${imgH}
                    <div class="flex flex-col">
                        <span class="text-lg font-bold text-gray-800 leading-tight">${s.name}</span>
                        ${s.id ? `
                        <button onclick="document.getElementById('hist-${s.id}').classList.toggle('hidden')" class="text-left text-[11px] text-red-600 hover:text-red-800 font-bold flex items-center gap-1 mt-1 uppercase tracking-wider transition-colors">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ${trReadHist}
                        </button>` : ''}
                    </div>
                  </div>
                  <span class="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">${s.veto ? trIncomp : s.score+'%'}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-3">
                  <div class="${col} h-3 rounded-full" style="width:${s.veto?100:s.score}%"></div>
                </div>
                ${s.id ? `
                <div id="hist-${s.id}" class="hidden mt-3 p-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 leading-relaxed shadow-sm font-sans">
                    ${trHistText}
                </div>` : ''}
            </div>`;
        });
        
        const rankContent = document.getElementById("ranking-content");
        if (rankContent) rankContent.innerHTML = h;

        // ── 4. CLASSEMENT PERSONNALITÉS ──
        let hPerso = "";
        persScores.forEach(s => {
            const col = s.veto ? "bg-gray-400" : s.score > 85 ? "bg-green-600" : s.score > 65 ? "bg-green-500" : s.score > 45 ? "bg-yellow-500" : "bg-red-500";
            const imgH = s.image
                ? `<img src="${s.image}" class="h-12 w-12 object-cover rounded-full shadow-sm border border-red-100 bg-white" onerror="this.style.display='none'">`
                : `<div class="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-xs">?</div>`;

            hPerso += `<div class="mb-5 ${s.veto ? 'opacity-50' : ''} hover:bg-red-100/50 p-3 rounded-lg border border-transparent hover:border-red-200 transition-all">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    ${imgH}
                    <span class="ml-4 text-lg font-bold text-gray-800 leading-tight">${s.name}</span>
                  </div>
                  <span class="text-sm font-bold text-red-700 bg-white px-3 py-1.5 rounded-lg border border-red-200 shadow-sm">${s.veto ? trIncomp : s.score + '%'}</span>
                </div>
                <div class="w-full bg-white rounded-full h-3 overflow-hidden mt-3 border border-red-100">
                  <div class="${col} h-full rounded-full" style="width:${s.veto ? 100 : s.score}%"></div>
                </div>
            </div>`;
        });
        
        const rankPersoContent = document.getElementById("ranking-perso-content");
        if (rankPersoContent) rankPersoContent.innerHTML = hPerso;
    }

    const btnRecalculate = document.getElementById("recalculate-button");
    if (btnRecalculate) btnRecalculate.addEventListener("click", calculateMatch);

    const btnRefine = document.getElementById("toggle-refinement");
    if (btnRefine) {
        btnRefine.onclick = () => {
            document.getElementById("refinement-content")?.classList.toggle("hidden");
            document.getElementById("refinement-arrow")?.classList.toggle("rotate-180");
        };
    }

    const btnRanking = document.getElementById("toggle-ranking");
    if (btnRanking) {
        btnRanking.onclick = () => {
            document.getElementById("ranking-content")?.classList.toggle("hidden");
            document.getElementById("ranking-arrow")?.classList.toggle("rotate-180");
        };
    }

    const btnRankingPerso = document.getElementById("toggle-ranking-perso");
    if (btnRankingPerso) {
        btnRankingPerso.onclick = () => {
            document.getElementById("ranking-perso-content")?.classList.toggle("hidden");
            document.getElementById("ranking-perso-arrow")?.classList.toggle("rotate-180");
        };
    }

    const btnCompass = document.getElementById("toggle-compass");
    if (btnCompass) {
        btnCompass.onclick = () => {
            const content = document.getElementById("compass-content");
            if (!content) return;
            const isHidden = content.classList.toggle("hidden");
            document.getElementById("compass-arrow")?.classList.toggle("rotate-180");
            if (!isHidden && typeof window.renderCompass === "function") {
                setTimeout(window.renderCompass, 100);
            }
        };
    }
};