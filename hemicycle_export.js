// ════════════════════════════════════════════════════════════════
// TUNISIAN VALUES — MODULE D'EXPORTATION D'IMAGE (HÉMICYCLE)
// ════════════════════════════════════════════════════════════════
(function () {
  const modal = document.getElementById("export-modal");
  const previewWrap = document.getElementById("export-preview-wrap");
  const previewInner = document.getElementById("export-preview-inner");
  const capArea = document.getElementById("capture-area");

  function buildParliamentCardHTML() {
    const parties = window._parliamentParties || [];
    const coalitions = window._parliamentCoalitions || [];

    if (parties.length === 0) return "";

    const topParty = parties.reduce(
      (prev, curr) => (curr.seats > prev.seats ? curr : prev),
      parties[0],
    );
    const topIdeology =
      typeof ideologies !== "undefined"
        ? ideologies.find((i) => i.id === topParty.id)
        : null;
    const topLogo = topIdeology ? topIdeology.image : null;

    const bestCoalition = coalitions.length > 0 ? coalitions[0] : null;
    const dateStr = new Date().toLocaleDateString("fr-FR");

    // Génération du SVG de l'hémicycle pour la carte d'export
    const cx = 250,
      cy = 255;
    const rows = 6;
    const rMin = 105,
      rMax = 230;

    let radii = [];
    let sumR = 0;
    for (let r = 0; r < rows; r++) {
      const rad = rMin + (r * (rMax - rMin)) / (rows - 1);
      radii.push(rad);
      sumR += rad;
    }

    let seatsPerRow = [];
    let distributed = 0;
    for (let r = 0; r < rows; r++) {
      const count = Math.round((radii[r] / sumR) * 217);
      seatsPerRow.push(count);
      distributed += count;
    }
    seatsPerRow[rows - 1] += 217 - distributed;

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

    let seatIdx = 0;
    parties.forEach((p) => {
      for (let s = 0; s < p.seats; s++) {
        if (seatIdx < dots.length) {
          dots[seatIdx].color = p.color;
          seatIdx++;
        }
      }
    });

    let svgDotsHTML = "";
    dots.forEach((d) => {
      svgDotsHTML += `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="4.6" fill="${d.color || "#94a3b8"}" />`;
    });

    // Génération de la liste des partis pour la carte
    let partiesRowsHTML = "";
    const sortedParties = [...parties].sort((a, b) => b.seats - a.seats);
    sortedParties.forEach((p) => {
      const ideology =
        typeof ideologies !== "undefined"
          ? ideologies.find((i) => i.id === p.id)
          : null;
      const logo = ideology && ideology.image ? ideology.image : "";
      const pct = ((p.seats / 217) * 100).toFixed(1);

      partiesRowsHTML += `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid #f1f5f9;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="width:10px;height:10px;border-radius:50%;background:${p.color};flex-shrink:0;"></span>
                        ${logo ? `<img src="${logo}" style="width:22px;height:22px;object-fit:contain;background:#fff;border-radius:4px;border:1px solid #e2e8f0;padding:1px;">` : ""}
                        <span style="font-size:12px;font-weight:700;color:#1e293b;text-transform:uppercase;">${p.name}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-size:11px;color:#94a3b8;">${pct}%</span>
                        <span style="font-size:14px;font-weight:700;color:#0f172a;min-width:26px;text-align:right;">${p.seats}</span>
                    </div>
                </div>
            `;
    });

    // HTML complet de la carte (largeur fixe 1000px)
    let html = `
        <div style="width:1000px;background:#ffffff;box-sizing:border-box;font-family:'Oswald',sans-serif;color:#1e293b;line-height:1.3;">
            <style>@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap');</style>

            <!-- EN-TÊTE NOIR/SLATE -->
            <div style="background:linear-gradient(135deg,#1e293b,#334155);padding:22px 32px;display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <div style="color:#ffffff;font-size:26px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">TUNISIAN VALUES</div>
                    <div style="color:rgba(255,255,255,.6);font-size:11px;letter-spacing:.12em;margin-top:2px;text-transform:uppercase;">COMPOSITION DE MON HÉMICYCLE (217 SIÈGES)</div>
                </div>
                <div style="text-align:right;color:rgba(255,255,255,.45);font-size:11px;text-transform:uppercase;letter-spacing:.05em;">
                    ${dateStr}<br>
                    <span style="font-size:9px;color:rgba(255,255,255,.3);">tunisianvalues.github.io</span>
                </div>
            </div>

            <!-- BANDEAU PREMIER GROUPE -->
            <div style="padding:18px 32px;background:#fafafa;border-bottom:2px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;">
                <div style="display:flex;align-items:center;gap:14px;">
                    <div style="width:58px;height:58px;background:#fff;border-radius:10px;border:2px solid #f1f5f9;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.06);">
                        ${topLogo ? `<img src="${topLogo}" style="width:100%;height:100%;object-fit:contain;padding:4px;">` : `<span style="font-size:22px;">🏛️</span>`}
                    </div>
                    <div>
                        <div style="color:#94a3b8;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">PREMIER GROUPE PARLEMENTAIRE</div>
                        <div style="color:#111827;font-size:22px;font-weight:700;text-transform:uppercase;line-height:1.1;">${topParty.name}</div>
                    </div>
                </div>
                <div style="background:#fee2e2;color:#dc2626;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:6px 14px;border-radius:8px;">
                    ${topParty.seats} SIÈGES (${((topParty.seats / 217) * 100).toFixed(1)}%)
                </div>
            </div>

            <!-- CORPS : DIAGRAMME + LISTE -->
            <div style="padding:22px 32px;display:flex;gap:36px;align-items:center;">
                <!-- Gauche : Diagramme de l'hémicycle -->
                <div style="flex:1.1;display:flex;flex-direction:column;align-items:center;">
                    <svg viewBox="0 0 500 290" style="width:100%;max-width:460px;height:auto;overflow:visible;">
                        <line x1="${cx}" y1="${cy - rMin + 20}" x2="${cx}" y2="${cy - rMax - 10}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 4" />
                        <text x="${cx}" y="${cy - 35}" text-anchor="middle" font-size="26" font-weight="bold" fill="#1e293b" font-family="'Oswald',sans-serif">109</text>
                        <text x="${cx}" y="${cy - 18}" text-anchor="middle" font-size="9" font-weight="bold" letter-spacing="0.1em" fill="#94a3b8" font-family="'Oswald',sans-serif">MAJORITÉ REQUISE</text>
                        ${svgDotsHTML}
                    </svg>
                    <div style="font-size:10px;color:#94a3b8;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-top:6px;">
                        SEUIL DE MAJORITÉ : 109 / 217 SIÈGES
                    </div>
                </div>

                <!-- Droite : Liste ordonnée des partis -->
                <div style="flex:0.9;">
                    <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">
                        GROUPES PARLEMENTAIRES (${parties.length})
                    </div>
                    ${partiesRowsHTML}
                </div>
            </div>`;

    // Section de la coalition principale
    if (bestCoalition) {
      let coalitionLogos = "";
      let barSegments = "";
      bestCoalition.parties.forEach((p) => {
        const ideology =
          typeof ideologies !== "undefined"
            ? ideologies.find((i) => i.id === p.id)
            : null;
        const logo = ideology && ideology.image ? ideology.image : "";
        if (logo) {
          coalitionLogos += `<img src="${logo}" style="width:20px;height:20px;object-fit:contain;background:#fff;border-radius:4px;border:1px solid #cbd5e1;padding:1px;">`;
        }
        const w = ((p.seats / bestCoalition.totalSeats) * 100).toFixed(1);
        barSegments += `<div style="width:${w}%;background:${p.color};height:100%;"></div>`;
      });

      const coalitionTitle = bestCoalition.parties
        .map((p) => p.short)
        .join(" + ");

      html += `
            <div style="padding:16px 32px 22px;background:#f8fafc;border-top:2px solid #f1f5f9;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <div>
                        <div style="font-size:9px;font-weight:700;color:#94a3b8;letter-spacing:.12em;text-transform:uppercase;">COALITION MAJORITAIRE RECOMMANDÉE</div>
                        <div style="display:flex;align-items:center;gap:6px;margin-top:3px;">
                            ${coalitionLogos}
                            <span style="font-size:13px;font-weight:700;color:#1e293b;text-transform:uppercase;">${coalitionTitle}</span>
                        </div>
                    </div>
                    <div style="font-size:16px;font-weight:700;color:#059669;text-transform:uppercase;">
                        ${bestCoalition.totalSeats} SIÈGES <span style="font-size:10px;color:#94a3b8;font-weight:400;">(+${bestCoalition.totalSeats - 109})</span>
                    </div>
                </div>
                <div style="height:10px;background:#e2e8f0;border-radius:5px;overflow:hidden;display:flex;">
                    ${barSegments}
                </div>
            </div>`;
    }

    html += `
            <div style="padding:10px 32px;background:#f1f5f9;text-align:center;font-size:9px;color:#94a3b8;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">
                SIMULATION ÉTABLIE SUR TUNISIANVALUES.GITHUB.IO — SCELLEMENT DES 217 SIÈGES DE L'ARP
            </div>
        </div>`;

    return html;
  }

  function openModal() {
    if (!modal) return;
    const html = buildParliamentCardHTML();
    if (!html) return;

    previewInner.innerHTML = html;

    // Redimensionnement fluide pour la prévisualisation dans la boîte de dialogue
    const wrapW = previewWrap.getBoundingClientRect().width || 680;
    const scale = wrapW / 1000;
    previewInner.style.transform = `scale(${scale})`;
    previewInner.style.width = "1000px";

    setTimeout(() => {
      previewWrap.style.height = previewInner.scrollHeight * scale + "px";
    }, 150);

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  // Gestionnaire de téléchargement direct en PNG
  document.addEventListener("DOMContentLoaded", () => {
    const btnExport = document.getElementById("btn-export-card");
    if (btnExport) btnExport.addEventListener("click", openModal);

    const btnClose = document.getElementById("export-modal-close");
    if (btnClose) btnClose.addEventListener("click", closeModal);

    const btnCancel = document.getElementById("export-modal-cancel");
    if (btnCancel) btnCancel.addEventListener("click", closeModal);

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }

    const btnDl = document.getElementById("export-modal-dl");
    if (btnDl) {
      btnDl.addEventListener("click", function () {
        const btn = this;
        btn.innerHTML = "Génération…";
        btn.disabled = true;

        capArea.innerHTML = buildParliamentCardHTML();
        const el = capArea.firstElementChild;

        setTimeout(() => {
          htmlToImage
            .toPng(el, { pixelRatio: 2.2, backgroundColor: "#ffffff" })
            .then((dataUrl) => {
              const a = document.createElement("a");
              a.download = "mon-hemicycle-tunisianvalues.png";
              a.href = dataUrl;
              a.click();

              btn.innerHTML = "Télécharger en PNG";
              btn.disabled = false;
            })
            .catch((err) => {
              console.error("Erreur lors de l'export de l'hémicycle :", err);
              alert("Une erreur est survenue lors de la création de l'image.");
              btn.innerHTML = "Réessayer";
              btn.disabled = false;
            });
        }, 150);
      });
    }
  });

  window.openHemicycleExportModal = openModal;
})();
