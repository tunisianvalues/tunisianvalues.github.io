// ════════════════════════════════════════════════════════════════
// TUNISIAN VALUES — MODULE D'EXPORTATION ÉPURÉ (HÉMICYCLE)
// ════════════════════════════════════════════════════════════════
(function() {
    const modal = document.getElementById('export-modal');
    const previewWrap = document.getElementById('export-preview-wrap');
    const previewInner = document.getElementById('export-preview-inner');
    const capArea = document.getElementById('capture-area');

    function buildParliamentCardHTML() {
        const parties = window._parliamentParties || [];
        if (parties.length === 0) return "";

        const topParty = parties.reduce((prev, curr) => (curr.seats > prev.seats ? curr : prev), parties[0]);
        const topIdeology = (typeof ideologies !== 'undefined') ? ideologies.find(i => i.id === topParty.id) : null;
        const topLogo = topIdeology ? topIdeology.image : null;
        const dateStr = new Date().toLocaleDateString('fr-FR');

        // Génération géométrique de l'hémicycle
        const cx = 250, cy = 255;
        const rows = 6;
        const rMin = 105, rMax = 230;

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
        seatsPerRow[rows - 1] += (217 - distributed);

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
        parties.forEach(p => {
            for (let s = 0; s < p.seats; s++) {
                if (seatIdx < dots.length) {
                    dots[seatIdx].color = p.color;
                    seatIdx++;
                }
            }
        });

        let svgDotsHTML = "";
        dots.forEach(d => {
            svgDotsHTML += `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="4.6" fill="${d.color || '#94a3b8'}" />`;
        });

        // Liste compacte des groupes
        let partiesRowsHTML = "";
        const sortedParties = [...parties].sort((a, b) => b.seats - a.seats);
        sortedParties.forEach(p => {
            const ideology = (typeof ideologies !== 'undefined') ? ideologies.find(i => i.id === p.id) : null;
            const logo = (ideology && ideology.image) ? ideology.image : "";

            partiesRowsHTML += `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <span style="width:10px;height:10px;border-radius:50%;background:${p.color};flex-shrink:0;"></span>
                        ${logo ? `<img src="${logo}" style="width:26px;height:26px;object-fit:contain;background:#fff;border-radius:6px;border:1px solid #e2e8f0;padding:2px;">` : ''}
                        <span style="font-size:13px;font-weight:700;color:#1e293b;text-transform:uppercase;">${p.name}</span>
                    </div>
                    <span style="font-size:16px;font-weight:700;color:#0f172a;">${p.seats}</span>
                </div>
            `;
        });

        // Structure pure et sobre
        return `
        <div style="width:1000px;background:#ffffff;box-sizing:border-box;font-family:'Oswald',sans-serif;color:#1e293b;">
            <style>@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap');</style>

            <!-- EN-TÊTE OFFICIEL -->
            <div style="background:linear-gradient(135deg,#1e293b,#334155);padding:22px 32px;display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <div style="color:#ffffff;font-size:26px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">TUNISIAN VALUES</div>
                    <div style="color:rgba(255,255,255,.6);font-size:11px;letter-spacing:.12em;margin-top:2px;text-transform:uppercase;">MON HÉMICYCLE</div>
                </div>
                <div style="text-align:right;color:rgba(255,255,255,.45);font-size:11px;text-transform:uppercase;">
                    ${dateStr}<br>
                    <span style="font-size:9px;color:rgba(255,255,255,.3);">tunisianvalues.github.io</span>
                </div>
            </div>

            <!-- PREMIER GROUPE -->
            <div style="padding:16px 32px;background:#fafafa;border-bottom:2px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;">
                <div style="display:flex;align-items:center;gap:14px;">
                    <div style="width:52px;height:52px;background:#fff;border-radius:10px;border:2px solid #f1f5f9;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,.05);">
                        ${topLogo ? `<img src="${topLogo}" style="width:100%;height:100%;object-fit:contain;padding:3px;">` : `<span style="font-size:20px;">🏛️</span>`}
                    </div>
                    <div>
                        <div style="color:#94a3b8;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">PREMIER GROUPE</div>
                        <div style="color:#111827;font-size:22px;font-weight:700;text-transform:uppercase;line-height:1.1;">${topParty.name}</div>
                    </div>
                </div>
                <div style="background:#fee2e2;color:#dc2626;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:6px 16px;border-radius:8px;">
                    ${topParty.seats} SIÈGES
                </div>
            </div>

            <!-- HÉMICYCLE + GROUPES -->
            <div style="padding:24px 32px 30px;display:flex;gap:40px;align-items:center;">
                <!-- Gauche : Diagramme de l'hémicycle -->
                <div style="flex:1.1;display:flex;flex-direction:column;align-items:center;">
                    <svg viewBox="0 0 500 290" style="width:100%;max-width:460px;height:auto;overflow:visible;">
                        <line x1="${cx}" y1="${cy - rMin + 20}" x2="${cx}" y2="${cy - rMax - 10}" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 4" />
                        <text x="${cx}" y="${cy - 35}" text-anchor="middle" font-size="26" font-weight="bold" fill="#1e293b" font-family="'Oswald',sans-serif">109</text>
                        <text x="${cx}" y="${cy - 18}" text-anchor="middle" font-size="9" font-weight="bold" letter-spacing="0.1em" fill="#94a3b8" font-family="'Oswald',sans-serif">MAJORITÉ</text>
                        ${svgDotsHTML}
                    </svg>
                </div>

                <!-- Droite : Groupes parlementaires -->
                <div style="flex:0.9;">
                    <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">
                        GROUPES PARLEMENTAIRES
                    </div>
                    ${partiesRowsHTML}
                </div>
            </div>
        </div>`;
    }

    function openModal() {
        if (!modal) return;
        const html = buildParliamentCardHTML();
        if (!html) return;

        previewInner.innerHTML = html;

        const wrapW = previewWrap.getBoundingClientRect().width || 680;
        const scale = wrapW / 1000;
        previewInner.style.transform = `scale(${scale})`;
        previewInner.style.width = '1000px';

        setTimeout(() => {
            previewWrap.style.height = (previewInner.scrollHeight * scale) + 'px';
        }, 150);

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

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
            btnDl.addEventListener("click", function() {
                const btn = this;
                btn.innerHTML = "Génération…";
                btn.disabled = true;

                capArea.innerHTML = buildParliamentCardHTML();
                const el = capArea.firstElementChild;

                setTimeout(() => {
                    htmlToImage.toPng(el, { pixelRatio: 2.2, backgroundColor: '#ffffff' })
                        .then(dataUrl => {
                            const a = document.createElement('a');
                            a.download = 'mon-hemicycle-tunisianvalues.png';
                            a.href = dataUrl;
                            a.click();

                            btn.innerHTML = "Télécharger en PNG";
                            btn.disabled = false;
                        })
                        .catch(err => {
                            console.error(err);
                            alert("Erreur lors de la création de l'image.");
                            btn.innerHTML = "Réessayer";
                            btn.disabled = false;
                        });
                }, 150);
            });
        }
    });

    window.openHemicycleExportModal = openModal;
})();
