// ════════════════════════════════════════════════
// ÉTAT GLOBAL
// ════════════════════════════════════════════════
let _uv = {};
let _ua = {};
let _pop = 0;
let _totalN = 0;
let _barsData = [];
let _rawResultData = null;

// ════════════════════════════════════════════════
// CHARGEMENT DES DONNÉES (HASH / PARAMS / LOCALSTORAGE)
// ════════════════════════════════════════════════
function loadResultsData() {
    // 1. Hash de partage (#s=... ou #share=... ou #[Nom]~...)
    let hashStr = window.location.hash ? window.location.hash.substring(1) : "";
    let sharePayload = null;
    if (hashStr) {
        if (hashStr.startsWith("s=")) {
            sharePayload = hashStr.substring(2);
        } else if (hashStr.startsWith("share=")) {
            sharePayload = hashStr.substring(6);
        } else if (hashStr.includes("~") || hashStr.startsWith("eyJ") || hashStr.length >= 10) {
            sharePayload = hashStr;
        }
    }

    // 2. Query param de partage (?share=... ou ?s=...)
    if (!sharePayload) {
        sharePayload = getParam("share") || getParam("s");
    }

    if (sharePayload) {
        const decoded = decodeResultsShare(sharePayload);
        if (decoded) return decoded;
    }

    // 3. Anciens paramètres d'URL (Rétrocompatibilité s_pana=...)
    if (getParam("s_pana") !== null) {
        const legacyAxes = {};
        const axesKeys = (typeof axes !== 'undefined') ? axes : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];
        axesKeys.forEach(ax => {
            legacyAxes[ax] = {
                s: parseFloat(getParam("s_" + ax) || 0),
                n: parseFloat(getParam("n_" + ax) || 0),
                m: parseFloat(getParam("m_" + ax) || 0)
            };
        });
        const iconsParam = getParam("icons") || "";
        const icons = iconsParam ? iconsParam.split(",").filter(Boolean) : [];
        const ans = parseAnswers(getParam("ans"));
        return {
            name: "",
            axes: legacyAxes,
            icons: icons,
            answers: ans,
            isShared: false
        };
    }

    // 4. LocalStorage
    try {
        const saved = localStorage.getItem("tv_latest_results");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.axes) {
                return {
                    name: parsed.name || "",
                    axes: parsed.axes,
                    icons: Array.isArray(parsed.icons) ? parsed.icons : [],
                    answers: parsed.answers || {},
                    isShared: false
                };
            }
        }
    } catch (e) {
        console.error("Erreur lecture localStorage:", e);
    }

    return null;
}

// ════════════════════════════════════════════════
// INIT PRINCIPAL
// ════════════════════════════════════════════════
window.onload = function() {
    _rawResultData = loadResultsData();

    // Si aucune donnée n'est trouvée, afficher l'état vide
    if (!_rawResultData || !_rawResultData.axes) {
        renderEmptyState();
        return;
    }

    // Fournir les icônes globales pour l'export
    window._tvIconsList = _rawResultData.icons || [];

    let totalN = 0;
    const axesKeys = (typeof axes !== 'undefined') ? axes : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];

    // 1. CALCUL DES DONNÉES EXACTES DES AXES
    try {
        axesKeys.forEach(ax => {
            const cfg = axesConfig[ax];
            const axData = _rawResultData.axes[ax] || { s: 0, n: 0, m: 0 };
            const s = parseFloat(axData.s || 0);
            const n = parseFloat(axData.n || 0);
            const m = parseFloat(axData.m || 0);

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
        _ua = _rawResultData.answers || {};

        if (typeof questions !== 'undefined') {
            _pop = calculatePopulismScore(_ua, questions);
        }
    } catch (e) {
        console.error("Erreur de calcul des données :", e);
    }

    // Gestion de la bannière partagée
    const sharedBanner = document.getElementById("shared-banner");
    const sharedTitle = document.getElementById("shared-banner-title");
    if (_rawResultData.isShared && sharedBanner) {
        sharedBanner.classList.remove("hidden");
        if (sharedTitle) {
            const name = _rawResultData.name ? _rawResultData.name.trim() : "";
            if (name) {
                const trShared = window.TV ? window.TV.tr("share_shared_by").replace("{name}", name) : `Profil politique partagé par ${name}`;
                sharedTitle.textContent = trShared;
            } else {
                const trAnon = window.TV ? window.TV.tr("share_shared_by_anon") : "Profil politique partagé";
                sharedTitle.textContent = trAnon;
            }
        }
    }

    // Initialisation du modal de partage
    initShareModal();

    // 2. FONCTION D'AFFICHAGE DU DOM
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

        const iconsList = _rawResultData.icons || [];
        if (iconsList.length > 0) {
            const container = document.getElementById("special-icons-container");
            if (container) {
                const trSpecTitle = window.TV ? window.TV.tr('results_special_title') : 'Positions Spéciales';
                let h = `<h3 class="text-3xl font-bold mb-8 text-gray-800">${trSpecTitle}</h3><div class="flex justify-center gap-8 flex-wrap">`;
                iconsList.forEach(n => {
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
        axesKeys.forEach(ax => {
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
            axesKeys.forEach(ax => {
                const u = _uv[ax],
                    [mn, mx] = party.range_vector[ax],
                    w = weights[ax];
                pen += (u < mn ? mn - u : u > mx ? u - mx : 0) * 0.2 * w; // Pénalité de zone
            });
            const sc = Math.max(0, Math.min(100, Math.round(base - pen) - Math.round(Math.abs(_pop - party.populism) * 0.2)));
            scores.push({ name: party.name, score: sc, veto: false, image: party.image, id: party.id });
        });
        scores.sort((a, b) => b.score - a.score);

        // ── 2. CALCUL PERSONNALITÉS (Point exact) ──
        let persScores = [];
        if (typeof personalities !== "undefined") {
            personalities.forEach(p => {
                let vet = false;
                const pm = p.vector;

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

                axesKeys.forEach(ax => {
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

        const avgN = _totalN / axesKeys.length;
        document.getElementById("neutrality-warning")?.classList.toggle("hidden", avgN <= 50);

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
                `<span class="text-6xl">${indep ? '🇹🇳' : '🏛️'}</span>`;
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

            h += `<div class="mb-5 ${s.veto ? 'opacity-50' : ''} hover:bg-gray-50 p-3 rounded-lg border border-transparent hover:border-gray-200 transition-all">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center">
                    ${imgH}
                    <div class="flex flex-col">
                        <span class="text-lg font-bold text-gray-800 leading-tight">${s.name}</span>
                        ${s.id ? `
                        <button onclick="document.getElementById('hist-${s.id}').classList.toggle('hidden')" class="text-left text-[11px] text-red-600 hover:text-red-800 font-bold flex items-center gap-1 mt-1 uppercase tracking-wider transition-colors cursor-pointer">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            ${trReadHist}
                        </button>` : ''}
                    </div>
                  </div>
                  <span class="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">${s.veto ? trIncomp : s.score + '%'}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-3">
                  <div class="${col} h-3 rounded-full" style="width:${s.veto ? 100 : s.score}%"></div>
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

        // ── 5. AFFICHAGE DU DUO DE LOGOS INTERNATIONAL EN HAUT ──
        renderTopInternationalMatch(top, indep);
    }

    function renderTopInternationalMatch(topParty, isIndep) {
        const userCountry = localStorage.getItem("tv_user_country") || "tn";
        const intlSeparator = document.getElementById("intl-party-separator");
        const intlCol = document.getElementById("intl-party-col");
        const intlLogoImg = document.getElementById("intl-party-logo-img");
        const intlPlaceholder = document.getElementById("intl-party-logo-placeholder");
        const intlFlagIcon = document.getElementById("intl-party-country-flag-icon");
        const intlCountryNameTxt = document.getElementById("intl-country-name-txt");

        if (userCountry === "tn" || isIndep || !topParty || !topParty.id) {
            // Mode Tunisie standard : masquer le parti international
            if (intlSeparator) intlSeparator.style.display = "none";
            if (intlCol) intlCol.style.display = "none";
            return;
        }

        const countryMeta = (typeof internationalEquivalents !== "undefined" && internationalEquivalents._countryMeta)
            ? internationalEquivalents._countryMeta[userCountry]
            : null;

        const partyId = topParty.id;
        const eqData = (typeof internationalEquivalents !== "undefined" && internationalEquivalents[partyId])
            ? internationalEquivalents[partyId][userCountry]
            : null;

        const flagSrc = countryMeta ? countryMeta.flag : "images/flag_" + userCountry + ".svg";
        const countryName = countryMeta ? countryMeta.name : userCountry.toUpperCase();

        if (intlCountryNameTxt) intlCountryNameTxt.textContent = countryName;
        if (intlFlagIcon && flagSrc) intlFlagIcon.src = flagSrc;

        if (intlSeparator) intlSeparator.style.display = "flex";
        if (intlCol) intlCol.style.display = "flex";

        if (!eqData) {
            // Pas d'équivalent direct (ex: Ennahdha en France)
            if (intlLogoImg) intlLogoImg.style.display = "none";
            if (intlPlaceholder) {
                intlPlaceholder.style.display = "block";
                intlPlaceholder.textContent = "Spécificité tunisienne";
            }
            return;
        }

        // Équivalent trouvé avec logo ou nom
        if (eqData.logo) {
            if (intlLogoImg) {
                intlLogoImg.src = eqData.logo;
                intlLogoImg.style.display = "block";
                intlLogoImg.onerror = () => {
                    intlLogoImg.style.display = "none";
                    if (intlPlaceholder) {
                        intlPlaceholder.style.display = "block";
                        intlPlaceholder.textContent = eqData.name;
                    }
                };
            }
            if (intlPlaceholder) intlPlaceholder.style.display = "none";
        } else {
            if (intlLogoImg) intlLogoImg.style.display = "none";
            if (intlPlaceholder) {
                intlPlaceholder.style.display = "block";
                intlPlaceholder.textContent = eqData.name;
            }
        }
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

// ════════════════════════════════════════════════
// MODAL DE PARTAGE DE LIEN
// ════════════════════════════════════════════════
function initShareModal() {
    const shareBtn = document.getElementById("share-btn");
    const shareModal = document.getElementById("share-modal");
    const shareClose = document.getElementById("share-modal-close");
    const shareInput = document.getElementById("share-name-input");
    const shareOutput = document.getElementById("share-link-output");
    const shareCopyBtn = document.getElementById("share-copy-btn");
    const shareToast = document.getElementById("share-toast");

    if (!shareBtn || !shareModal || !shareOutput) return;

    function generateShareUrl() {
        if (!_rawResultData) return "";
        const nameVal = shareInput ? shareInput.value.trim() : "";
        const payload = {
            name: nameVal,
            axes: _rawResultData.axes,
            icons: _rawResultData.icons,
            answers: _rawResultData.answers
        };
        const hash = encodeResultsShare(payload);
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/$/, "");
        return baseUrl + "#s=" + hash;
    }

    function updateUrlOutput() {
        shareOutput.value = generateShareUrl();
    }

    shareBtn.addEventListener("click", () => {
        if (_rawResultData && _rawResultData.name && shareInput) {
            shareInput.value = _rawResultData.name;
        }
        updateUrlOutput();
        shareModal.classList.remove("hidden");
        if (shareToast) shareToast.classList.add("hidden");
    });

    if (shareClose) {
        shareClose.addEventListener("click", () => {
            shareModal.classList.add("hidden");
        });
    }

    shareModal.addEventListener("click", (e) => {
        if (e.target === shareModal) {
            shareModal.classList.add("hidden");
        }
    });

    if (shareInput) {
        shareInput.addEventListener("input", updateUrlOutput);
    }

    if (shareCopyBtn) {
        shareCopyBtn.addEventListener("click", () => {
            const urlToCopy = shareOutput.value || generateShareUrl();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(urlToCopy).then(showCopySuccess).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }
        });
    }

    function fallbackCopy() {
        shareOutput.select();
        shareOutput.setSelectionRange(0, 99999);
        try {
            document.execCommand("copy");
            showCopySuccess();
        } catch (e) {
            console.error("Échec de copie :", e);
        }
    }

    function showCopySuccess() {
        if (shareToast) {
            shareToast.classList.remove("hidden");
            setTimeout(() => {
                if (shareToast) shareToast.classList.add("hidden");
            }, 3000);
        }
        const copyTextSpan = document.getElementById("share-copy-text");
        if (copyTextSpan) {
            const originalText = copyTextSpan.textContent;
            copyTextSpan.textContent = "Copié !";
            setTimeout(() => {
                copyTextSpan.textContent = originalText;
            }, 2000);
        }
    }
}

// ════════════════════════════════════════════════
// ÉTAT VIDE (Si l'utilisateur arrive sans résultats)
// ════════════════════════════════════════════════
function renderEmptyState() {
    const container = document.getElementById("results-container");
    if (!container) return;

    const trTitle = window.TV ? window.TV.tr("results_no_data_title") : "Aucun résultat trouvé";
    const trBody = window.TV ? window.TV.tr("results_no_data_body") : "Vous n'avez pas encore passé le test. Répondez au questionnaire pour découvrir votre positionnement.";
    const trCta = window.TV ? window.TV.tr("results_no_data_cta") : "Commencer le test";

    container.innerHTML = `
    <div class="text-center py-12 px-4 max-w-lg mx-auto">
        <div class="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">
            🗳️
        </div>
        <h2 class="text-3xl font-bold text-slate-800 mb-3 font-oswald tracking-wide">${trTitle}</h2>
        <p class="text-slate-600 text-sm font-sans mb-8 leading-relaxed">${trBody}</p>
        <a href="instructions.html" class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-3.5 rounded-xl shadow-lg transition-colors font-oswald">
            ${trCta} →
        </a>
    </div>`;
}
