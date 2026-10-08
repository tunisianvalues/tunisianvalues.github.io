// ════════════════════════════════════════════════════════════════
// MÉTADONNÉES PARLEMENTAIRES DES PARTIS TUNISIENS (217 SIÈGES)
// ════════════════════════════════════════════════════════════════
const PARLIAMENT_CONFIG = {
  TOTAL_SEATS: 217,
  MAJORITY: 109,

  parties: {
    pt: { color: "#dc2626", order: -95, short: "Parti des Travailleurs" },
    watad: { color: "#b91c1c", order: -90, short: "Watad" },
    frontpopulaire: { color: "#991b1b", order: -80, short: "Front Populaire" },
    massar: { color: "#e11d48", order: -65, short: "Al Massar" },
    baath: { color: "#15803d", order: -50, short: "Baath" },
    attayar: { color: "#ea580c", order: -35, short: "Attayar" },
    ettakatol: { color: "#f97316", order: -25, short: "Ettakatol" },
    aljoumhouri: { color: "#7c3aed", order: -15, short: "Al Joumhouri" },
    echaab: { color: "#16a34a", order: -5, short: "Echaâb" },
    "25jul": { color: "#d97706", order: 10, short: "25-Juillet" },
    tahya: { color: "#0284c7", order: 25, short: "Tahya Tounes" },
    upl: { color: "#4f46e5", order: 35, short: "UPL" },
    afek: { color: "#2563eb", order: 45, short: "Afek Tounes" },
    pl: { color: "#eab308", order: 55, short: "Parti Libéral" },
    pdl: { color: "#1e3a8a", order: 70, short: "PDL" },
    tnp: { color: "#78350f", order: 80, short: "Nationalistes (TNP)" },
    ennahdha: { color: "#059669", order: 90, short: "Ennahdha" },
    alkarama: { color: "#064e3b", order: 98, short: "Al Karama" },
  },

  incompatibilities: [
    ["ennahdha", "pdl"],
    ["ennahdha", "pt"],
    ["ennahdha", "watad"],
    ["ennahdha", "25jul"],
    ["alkarama", "pdl"],
    ["alkarama", "pt"],
    ["alkarama", "watad"],
    ["alkarama", "pl"],
    ["pdl", "25jul"],
    ["pdl", "pt"],
    ["pdl", "watad"],
    ["pt", "afek"],
    ["watad", "afek"],
    ["tnp", "*"],
  ],
};

const PRIORITY_LEVELS = [
  { label: "Aucun", mult: 0 },
  { label: "Faible", mult: 1 },
  { label: "Moyen", mult: 2.2 },
  { label: "Élevé", mult: 3.8 },
  { label: "Très élevé", mult: 5.5 },
];

let _currentPayload = null;
let _axisPriorities = {
  pana: 2,
  coop: 2,
  econ: 2,
  reli: 2,
  soci: 2,
  demo: 2,
  decent: 2,
};

// Filtre actif de coalition (vide = tous les sièges sont colorés)
let _filterCoalitionPartyIds = [];
let _lastComputedParties = [];

// ════════════════════════════════════════════════════════════════
// CHARGEUR UNIVERSEL DE DONNÉES
// ════════════════════════════════════════════════════════════════
function loadParliamentResultData() {
  let hashStr = window.location.hash ? window.location.hash.substring(1) : "";
  let sharePayload = null;

  if (hashStr) {
    if (hashStr.startsWith("s=")) sharePayload = hashStr.substring(2);
    else if (hashStr.startsWith("share=")) sharePayload = hashStr.substring(6);
    else if (
      hashStr.includes("~") ||
      hashStr.startsWith("eyJ") ||
      hashStr.length >= 10
    )
      sharePayload = hashStr;
  }

  if (!sharePayload && typeof getParam === "function") {
    sharePayload = getParam("share") || getParam("s");
  }

  if (sharePayload && typeof decodeResultsShare === "function") {
    const decoded = decodeResultsShare(sharePayload);
    if (decoded) return decoded;
  }

  if (typeof getParam === "function" && getParam("s_pana") !== null) {
    const legacyAxes = {};
    const axesKeys =
      typeof axes !== "undefined"
        ? axes
        : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];
    axesKeys.forEach((ax) => {
      legacyAxes[ax] = {
        s: parseFloat(getParam("s_" + ax) || 0),
        n: parseFloat(getParam("n_" + ax) || 0),
        m: parseFloat(getParam("m_" + ax) || 0),
      };
    });
    const ans =
      typeof parseAnswers === "function" ? parseAnswers(getParam("ans")) : {};
    return {
      name: "",
      axes: legacyAxes,
      icons: [],
      answers: ans,
      isShared: false,
    };
  }

  try {
    const saved = localStorage.getItem("tv_latest_results");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.axes) return parsed;
    }
  } catch (e) {
    console.error("Erreur lecture localStorage:", e);
  }

  return null;
}

// ════════════════════════════════════════════════════════════════
// RÉPARTITION DES SIÈGES PAR AXE AVEC SEUIL D'ENTRÉE RÉALISTE
// ════════════════════════════════════════════════════════════════
function computeObjetivo176Parliament(payload) {
  if (!payload || !payload.axes) return { parties: [], axisSeats: {} };

  const axesKeys =
    typeof axes !== "undefined"
      ? axes
      : ["econ", "demo", "reli", "soci", "coop", "decent", "pana"];

  // 1. Vecteur utilisateur (-100 à +100)
  const userVec = {};
  axesKeys.forEach((ax) => {
    const a = payload.axes[ax] || { s: 0, n: 0, m: 0 };
    const s = parseFloat(a.s || 0);
    const n = parseFloat(a.n || 0);
    const m = parseFloat(a.m || 0);
    let exactL = 0,
      exactR = 0;
    if (m > 0) {
      const neutral = (n / m) * 100;
      const dm = m - n;
      if (dm > 0) {
        const dp = 100 - neutral;
        const ns = (s + dm) / (2 * dm);
        exactL = ns * dp;
        exactR = dp - exactL;
      }
    }
    userVec[ax] = exactR - exactL;
  });

  // 2. Détermination du nombre de sièges par axe
  let totalPriorityMult = 0;
  axesKeys.forEach((ax) => {
    const lvlIdx = _axisPriorities[ax] !== undefined ? _axisPriorities[ax] : 2;
    totalPriorityMult += PRIORITY_LEVELS[lvlIdx].mult;
  });
  if (totalPriorityMult === 0) totalPriorityMult = 1;

  const axisSeats = {};
  let allocatedSeats = 0;
  const axisRemainders = [];

  axesKeys.forEach((ax) => {
    const lvlIdx = _axisPriorities[ax] !== undefined ? _axisPriorities[ax] : 2;
    const mult = PRIORITY_LEVELS[lvlIdx].mult;
    const exact = (mult / totalPriorityMult) * PARLIAMENT_CONFIG.TOTAL_SEATS;
    const floor = Math.floor(exact);
    axisSeats[ax] = floor;
    allocatedSeats += floor;
    axisRemainders.push({ ax: ax, rem: exact - floor });
  });

  axisRemainders.sort((a, b) => b.rem - a.rem);
  let remAxis = PARLIAMENT_CONFIG.TOTAL_SEATS - allocatedSeats;
  for (let i = 0; i < remAxis; i++) {
    axisSeats[axisRemainders[i % axisRemainders.length].ax] += 1;
  }

  // 3. Calcul des suffrages accumulés par thème
  const partyVotes = {};
  ideologies.forEach((p) => {
    partyVotes[p.id] = 0;
  });

  axesKeys.forEach((ax) => {
    const seatsWeight = axisSeats[ax] || 0;
    if (seatsWeight <= 0) return;

    const uVal = userVec[ax];

    ideologies.forEach((p) => {
      let pVal = 0;
      if (p.range_vector && p.range_vector[ax]) {
        pVal = (p.range_vector[ax][0] + p.range_vector[ax][1]) / 2;
      }
      const dist = Math.abs(uVal - pVal);
      const accord = Math.max(0, 100 - dist / 2);

      const themePower = Math.pow(accord / 100, 2.7);
      partyVotes[p.id] += themePower * seatsWeight;
    });
  });

  // 4. Seuil parlementaire de 5.5 %
  let totalVotes = 0;
  const rankedParties = ideologies
    .map((p) => {
      const v = partyVotes[p.id] || 0;
      totalVotes += v;
      return { id: p.id, name: p.name, votes: v };
    })
    .sort((a, b) => b.votes - a.votes);

  let qualifying = rankedParties.filter((p) => p.votes / totalVotes >= 0.055);
  if (qualifying.length < 5) qualifying = rankedParties.slice(0, 6);
  else if (qualifying.length > 7) qualifying = qualifying.slice(0, 7);

  // 5. Répartition proportionnelle des 217 sièges
  let qualifyingVoteSum = qualifying.reduce((acc, p) => acc + p.votes, 0);
  let totalAllocated = 0;
  const distributed = qualifying.map((p) => {
    const exact = (p.votes / qualifyingVoteSum) * PARLIAMENT_CONFIG.TOTAL_SEATS;
    const floor = Math.floor(exact);
    totalAllocated += floor;
    return { id: p.id, seats: floor, rem: exact - floor };
  });

  let remaining = PARLIAMENT_CONFIG.TOTAL_SEATS - totalAllocated;
  distributed.sort((a, b) => b.rem - a.rem);
  for (let i = 0; i < remaining; i++) {
    distributed[i % distributed.length].seats += 1;
  }

  const seatsMap = {};
  distributed.forEach((d) => {
    seatsMap[d.id] = d.seats;
  });

  // 6. Assemblage ordonné de Gauche à Droite
  const finalParties = qualifying
    .map((p) => {
      const meta = PARLIAMENT_CONFIG.parties[p.id] || {
        color: "#64748b",
        order: 0,
        short: p.name,
      };
      return {
        id: p.id,
        name: p.name,
        short: meta.short,
        color: meta.color,
        order: meta.order,
        seats: seatsMap[p.id] || 0,
      };
    })
    .filter((p) => p.seats > 0);

  finalParties.sort((a, b) => a.order - b.order);

  return { parties: finalParties, axisSeats: axisSeats };
}

// ════════════════════════════════════════════════════════════════
// DESSIN GÉOMÉTRIQUE DE L'HÉMICYCLE (SVG SANS CHEVAUCHEMENT)
// ════════════════════════════════════════════════════════════════
function renderHemicycleSVG(parties) {
  const svg = document.getElementById("hemicycle-svg");
  if (!svg) return;
  svg.innerHTML = "";

  const totalSeats = PARLIAMENT_CONFIG.TOTAL_SEATS;
  const cx = 270,
    cy = 275;
  const rows = 6;
  const rMin = 115,
    rMax = 250;

  let radii = [];
  let sumR = 0;
  for (let r = 0; r < rows; r++) {
    const radius = rMin + (r * (rMax - rMin)) / (rows - 1);
    radii.push(radius);
    sumR += radius;
  }

  let seatsPerRow = [];
  let distributed = 0;
  for (let r = 0; r < rows; r++) {
    const count = Math.round((radii[r] / sumR) * totalSeats);
    seatsPerRow.push(count);
    distributed += count;
  }
  seatsPerRow[rows - 1] += totalSeats - distributed;

  let dots = [];
  for (let r = 0; r < rows; r++) {
    const rad = radii[r];
    const count = seatsPerRow[r];
    for (let i = 0; i < count; i++) {
      const angle = Math.PI - (Math.PI * (i + 0.5)) / count;
      const x = cx + rad * Math.cos(angle);
      const y = cy - rad * Math.sin(angle);
      dots.push({ x, y, angle });
    }
  }

  dots.sort((a, b) => b.angle - a.angle);

  // Ligne médiane
  const midline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line",
  );
  midline.setAttribute("x1", cx);
  midline.setAttribute("y1", cy - rMin + 20);
  midline.setAttribute("x2", cx);
  midline.setAttribute("y2", cy - rMax - 12);
  midline.setAttribute("stroke", "#e2e8f0");
  midline.setAttribute("stroke-width", "2");
  midline.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(midline);

  // Seuil de majorité dans le creux central de l'arc (zéro collision)
  const textNumber = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text",
  );
  textNumber.setAttribute("x", cx);
  textNumber.setAttribute("y", cy - 40);
  textNumber.setAttribute("text-anchor", "middle");
  textNumber.setAttribute("font-size", "28");
  textNumber.setAttribute("font-weight", "bold");
  textNumber.setAttribute("fill", "#1e293b");
  textNumber.setAttribute("class", "font-oswald");
  textNumber.textContent = "109";
  svg.appendChild(textNumber);

  const textLabel = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text",
  );
  textLabel.setAttribute("x", cx);
  textLabel.setAttribute("y", cy - 20);
  textLabel.setAttribute("text-anchor", "middle");
  textLabel.setAttribute("font-size", "10");
  textLabel.setAttribute("font-weight", "bold");
  textLabel.setAttribute("letter-spacing", "0.1em");
  textLabel.setAttribute("fill", "#94a3b8");
  textLabel.setAttribute("class", "font-oswald uppercase");
  textLabel.textContent = "MAJORITÉ REQUISE";
  svg.appendChild(textLabel);

  // Attribution séquentielle des sièges
  let seatIdx = 0;
  parties.forEach((p) => {
    for (let s = 0; s < p.seats; s++) {
      if (seatIdx < dots.length) {
        dots[seatIdx].partyId = p.id;
        dots[seatIdx].color = p.color;
        dots[seatIdx].partyName = p.name;
        seatIdx++;
      }
    }
  });

  dots.forEach((d) => {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("cx", d.x.toFixed(1));
    circle.setAttribute("cy", d.y.toFixed(1));
    circle.setAttribute("r", "5.0");
    circle.setAttribute("fill", d.color || "#94a3b8");
    circle.setAttribute("data-party", d.partyId);
    circle.setAttribute("class", "seat-dot");

    const title = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "title",
    );
    title.textContent = `${d.partyName}`;
    circle.appendChild(title);
    svg.appendChild(circle);
  });

  refreshSeatHighlighting();
}

// ════════════════════════════════════════════════════════════════
// LISTE DES GROUPES AVEC LOGOS VISIBLES (36 PX)
// ════════════════════════════════════════════════════════════════
function renderPartiesList(parties) {
  const container = document.getElementById("parties-list");
  if (!container) return;
  container.innerHTML = "";

  const sorted = [...parties].sort((a, b) => b.seats - a.seats);

  sorted.forEach((p) => {
    const pct = ((p.seats / PARLIAMENT_CONFIG.TOTAL_SEATS) * 100).toFixed(1);
    const found =
      typeof ideologies !== "undefined"
        ? ideologies.find((i) => i.id === p.id)
        : null;
    const logoSrc = found ? found.image : null;

    const row = document.createElement("div");
    row.className =
      "party-row flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-red-50/50 cursor-pointer border border-slate-100 hover:border-red-200 font-oswald";
    row.setAttribute("data-party", p.id);

    row.innerHTML = `
            <div class="flex items-center gap-2.5 min-w-0 pr-2">
                ${logoSrc ? `<img src="${logoSrc}" class="w-9 h-9 object-contain rounded-lg bg-white p-1 border border-slate-200 shadow-xs flex-shrink-0" onerror="this.style.display='none'">` : `<span class="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs" style="color:${p.color}">🏛️</span>`}
                <div class="min-w-0">
                    <span class="font-bold text-sm text-slate-800 truncate block leading-tight uppercase">${p.name}</span>
                    <span class="text-[10px] text-slate-400 uppercase font-bold tracking-wider">${pct}% de l'Assemblée</span>
                </div>
            </div>
            <div class="flex items-center gap-2.5 flex-shrink-0">
                <div class="w-12 bg-slate-200 h-1.5 rounded-full overflow-hidden hidden sm:block">
                    <div class="h-full rounded-full" style="width: ${pct}%; background-color: ${p.color};"></div>
                </div>
                <span class="font-bold text-lg text-slate-900 w-7 text-right">${p.seats}</span>
            </div>
        `;

    row.addEventListener("mouseenter", () => highlightSingleParty(p.id));
    row.addEventListener("mouseleave", () => refreshSeatHighlighting());
    row.addEventListener("click", () => highlightSingleParty(p.id));

    container.appendChild(row);
  });
}

function highlightSingleParty(partyId) {
  const allSeats = document.querySelectorAll(".seat-dot");
  allSeats.forEach((s) => {
    if (s.getAttribute("data-party") === partyId) {
      s.style.opacity = "1";
      s.style.transform = "scale(1.4)";
      s.style.filter = "drop-shadow(0 0 3px rgba(0,0,0,0.4))";
    } else {
      s.style.opacity = "0.2";
      s.style.transform = "scale(0.85)";
      s.style.filter = "none";
    }
  });
}

function refreshSeatHighlighting() {
  const allSeats = document.querySelectorAll(".seat-dot");
  const filter = _filterCoalitionPartyIds;
  const resetBtn = document.getElementById("btn-reset-view");

  if (resetBtn) {
    resetBtn.classList.toggle("hidden", filter.length === 0);
  }

  allSeats.forEach((s) => {
    const pId = s.getAttribute("data-party");
    // Si aucun filtre actif : tous les sièges sont à 100 % de couleur
    if (filter.length === 0) {
      s.style.opacity = "1";
      s.style.transform = "scale(1)";
      s.style.filter = "none";
    } else if (filter.includes(pId)) {
      s.style.opacity = "1";
      s.style.transform = "scale(1.2)";
      s.style.filter = "drop-shadow(0 0 2px rgba(0,0,0,0.3))";
    } else {
      s.style.opacity = "0.2";
      s.style.transform = "scale(0.85)";
      s.style.filter = "none";
    }
  });
}

function resetCoalitionFilter() {
  _filterCoalitionPartyIds = [];
  document
    .querySelectorAll(".coalition-card")
    .forEach((c) => c.classList.remove("active-coalition"));
  refreshSeatHighlighting();
}

// ════════════════════════════════════════════════════════════════
// MOTEUR DES COALITIONS (2 COLONNES LARGES, TOUT VISIBLE)
// ════════════════════════════════════════════════════════════════
function areCompatible(p1, p2) {
  if (p1.id === p2.id) return true;
  for (const [a, b] of PARLIAMENT_CONFIG.incompatibilities) {
    if (b === "*") {
      if (p1.id === a || p2.id === a) return false;
    } else {
      if ((p1.id === a && p2.id === b) || (p1.id === b && p2.id === a))
        return false;
    }
  }
  return true;
}

function findCoalitions(parties) {
  const target = PARLIAMENT_CONFIG.MAJORITY;
  const coalitions = [];
  const maxCombo = 4;

  function helper(startIndex, current) {
    const totalSeats = current.reduce((sum, p) => sum + p.seats, 0);

    if (totalSeats >= target) {
      for (let i = 0; i < current.length; i++) {
        for (let j = i + 1; j < current.length; j++) {
          if (!areCompatible(current[i], current[j])) return;
        }
      }

      const isMinimal = current.every((p) => totalSeats - p.seats < target);
      if (isMinimal) {
        const orders = current.map((p) => p.order);
        const spread = Math.max(...orders) - Math.min(...orders);
        coalitions.push({
          parties: [...current],
          totalSeats: totalSeats,
          spread: spread,
        });
      }
      return;
    }

    if (current.length >= maxCombo) return;

    for (let i = startIndex; i < parties.length; i++) {
      current.push(parties[i]);
      helper(i + 1, current);
      current.pop();
    }
  }

  helper(0, []);
  coalitions.sort((a, b) => a.spread - b.spread || b.totalSeats - a.totalSeats);
  return coalitions.slice(0, 6);
}

function renderCoalitions(coalitions) {
  const grid = document.getElementById("coalitions-grid");
  if (!grid) return;
  grid.innerHTML = "";

  if (coalitions.length === 0) {
    grid.innerHTML = `
            <div class="col-span-full p-4 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200 font-oswald text-xs uppercase">
                Aucune coalition de 2 à 4 partis n'atteint les 109 sièges.
            </div>
        `;
    return;
  }

  coalitions.forEach((c) => {
    const card = document.createElement("div");
    const partyIds = c.parties.map((p) => p.id);

    card.className =
      "coalition-card p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex flex-col justify-between font-oswald";

    let barSegments = "";
    c.parties.forEach((p) => {
      const w = ((p.seats / c.totalSeats) * 100).toFixed(1);
      barSegments += `<div style="width: ${w}%; background-color: ${p.color};" class="h-full" title="${p.short} (${p.seats})"></div>`;
    });

    // Badges des partis avec vrais logos agrandis (24 px) et noms complets
    let memberBadges = "";
    c.parties.forEach((p) => {
      const found =
        typeof ideologies !== "undefined"
          ? ideologies.find((i) => i.id === p.id)
          : null;
      const logo =
        found && found.image
          ? `<img src="${found.image}" class="w-6 h-6 object-contain rounded bg-white p-0.5 border border-slate-200 flex-shrink-0">`
          : "";
      memberBadges += `
                <div class="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded-lg">
                    ${logo}
                    <span class="font-bold text-xs text-slate-800 uppercase leading-none">${p.short}</span>
                    <span class="text-xs font-bold text-slate-500">(${p.seats})</span>
                </div>
            `;
    });

    card.innerHTML = `
            <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                    <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Majorité absolue</span>
                    <span class="text-xl font-bold text-emerald-600">${c.totalSeats} sièges <span class="text-xs text-slate-400 font-normal">(+${c.totalSeats - PARLIAMENT_CONFIG.MAJORITY})</span></span>
                </div>
                <div class="flex flex-wrap items-center gap-1.5 mb-3">
                    ${memberBadges}
                </div>
            </div>
            <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex shadow-inner mt-1">
                ${barSegments}
            </div>
        `;

    card.addEventListener("click", () => {
      _filterCoalitionPartyIds = partyIds;
      document
        .querySelectorAll(".coalition-card")
        .forEach((el) => el.classList.remove("active-coalition"));
      card.classList.add("active-coalition");
      refreshSeatHighlighting();
    });

    grid.appendChild(card);
  });
}

// ════════════════════════════════════════════════════════════════
// SÉLECTEUR DE PRIORITÉS PAR AXE (RESPONSIVE SMARTPHONE)
// ════════════════════════════════════════════════════════════════
function renderPrioritiesSelector(axisSeats) {
  const container = document.getElementById("priorities-container");
  if (!container) return;
  container.innerHTML = "";

  const axesKeys =
    typeof axes !== "undefined"
      ? axes
      : ["pana", "coop", "econ", "reli", "soci", "demo", "decent"];

  axesKeys.forEach((axId) => {
    const axConfig =
      typeof axesConfig !== "undefined" && axesConfig[axId]
        ? axesConfig[axId]
        : { name: axId, leftLabel: "", rightLabel: "" };
    const currentSeats = axisSeats[axId] || 0;
    const currentLvl =
      _axisPriorities[axId] !== undefined ? _axisPriorities[axId] : 2;

    const row = document.createElement("div");
    row.className =
      "p-2.5 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-oswald";

    let buttonsHTML = "";
    PRIORITY_LEVELS.forEach((lvl, idx) => {
      const isActive = idx === currentLvl;
      buttonsHTML += `
                <button onclick="setAxisPriority('${axId}', ${idx})" class="priority-btn ${isActive ? "active" : ""} px-2 py-1 text-[11px] sm:text-xs font-bold rounded-md border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors uppercase flex-1 sm:flex-none">
                    ${lvl.label}
                </button>
            `;
    });

    row.innerHTML = `
            <div class="flex items-center justify-between sm:justify-start gap-2 flex-1 min-w-0">
                <div>
                    <h3 class="font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wide leading-tight">${axConfig.name}</h3>
                    <p class="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider">${axConfig.leftLabel} vs ${axConfig.rightLabel}</p>
                </div>
                <div class="text-right sm:hidden">
                    <span class="font-bold text-sm text-slate-900">${currentSeats}</span>
                    <span class="text-[9px] text-slate-400 uppercase tracking-widest">sièges</span>
                </div>
            </div>
            <div class="flex items-center justify-between sm:justify-end gap-2.5 flex-shrink-0">
                <div class="flex items-center gap-1 w-full sm:w-auto">
                    ${buttonsHTML}
                </div>
                <div class="text-right min-w-[50px] hidden sm:block">
                    <span class="font-bold text-base text-slate-900">${currentSeats}</span>
                    <span class="text-[10px] text-slate-400 uppercase block tracking-widest">sièges</span>
                </div>
            </div>
        `;

    container.appendChild(row);
  });
}

function setAxisPriority(axisId, levelIdx) {
  _axisPriorities[axisId] = levelIdx;
  updateParliament();
}

function renderEmptyParliamentState() {
  const container = document.getElementById("hemicycle-container");
  if (!container) return;

  container.innerHTML = `
    <div class="text-center py-10 px-4 max-w-lg mx-auto font-oswald">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 tracking-wide uppercase">Aucun résultat trouvé</h2>
        <p class="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed uppercase tracking-wider">
            Vous n'avez pas encore passé le quiz. Répondez au questionnaire pour générer la composition de votre parlement.
        </p>
        <a href="instructions.html" class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-base px-6 py-3 rounded-xl shadow-lg transition-colors">
            Commencer le test →
        </a>
    </div>`;
}

// ════════════════════════════════════════════════════════════════
// ACTUALISATION DYNAMIQUE
// ════════════════════════════════════════════════════════════════
function updateParliament() {
  if (!_currentPayload) return;

  const { parties, axisSeats } = computeObjetivo176Parliament(_currentPayload);
  _lastComputedParties = parties;

  // Rendre disponible pour le module d'exportation
  window._parliamentParties = parties;

  renderHemicycleSVG(parties);
  renderPartiesList(parties);
  renderPrioritiesSelector(axisSeats);

  const coalitions = findCoalitions(parties);
  window._parliamentCoalitions = coalitions;

  renderCoalitions(coalitions);

  const topParty = parties.reduce(
    (prev, curr) => (curr.seats > prev.seats ? curr : prev),
    parties[0],
  );
  const leadBox = document.getElementById("parliament-lead-box");
  if (leadBox && topParty) {
    leadBox.innerHTML = `Le groupe le plus important serait <strong>${topParty.name}</strong> avec <strong>${topParty.seats} sièges</strong>. L'Assemblée compte <strong>${parties.length} partis représentés</strong>. Aucun parti ne peut atteindre la majorité absolue (109 sièges) à lui seul : une coalition est nécessaire.`;
  }
}

// ════════════════════════════════════════════════════════════════
// INITIALISATION
// ════════════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  const currentParams = window.location.search + window.location.hash;
  const backBtn = document.getElementById("nav-back-results");
  const footerBackBtn = document.getElementById("btn-footer-back-results");
  if (backBtn && currentParams) backBtn.href = "results.html" + currentParams;
  if (footerBackBtn && currentParams)
    footerBackBtn.href = "results.html" + currentParams;

  _currentPayload = loadParliamentResultData();
  if (!_currentPayload) {
    renderEmptyParliamentState();
    return;
  }

  updateParliament();
});
