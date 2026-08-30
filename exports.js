(function(){
    const modal        = document.getElementById('export-modal');
    const previewWrap  = document.getElementById('export-preview-wrap');
    const previewInner = document.getElementById('export-preview-inner');
    const capArea      = document.getElementById('capture-area');

    const cbBars    = document.getElementById('opt-bars');
    const cbIcons   = document.getElementById('opt-icons');
    const cbCompass = document.getElementById('opt-compass');

    function initIconChips() {
        const iconsList = (window._tvIconsList && Array.isArray(window._tvIconsList))
            ? window._tvIconsList
            : (getParam('icons') || '').split(',').filter(i => i.length > 0);
        const container  = document.getElementById('icons-chips-container');
        container.innerHTML = '';
        if (iconsList.length === 0) {
            document.getElementById('pill-icons').style.display = 'none';
            return;
        }
        iconsList.forEach(n => {
            const specName = window.TV ? window.TV.tr('spec_' + n) : (specialLabels[n] || n);
            const lbl = document.createElement('label');
            lbl.className = 'icon-chip active';
            lbl.dataset.icon = n;
            lbl.innerHTML = `
                <input type="checkbox" checked style="display:none">
                <img src="icons/${n}.png" onerror="this.style.display='none'">
                ${specName}`;
            lbl.querySelector('input').addEventListener('change', e => {
                lbl.classList.toggle('active', e.target.checked);
                buildPreview();
            });
            container.appendChild(lbl);
        });
    }

    function getSelectedIcons() {
        return Array.from(document.querySelectorAll('#icons-chips-container .icon-chip input:checked'))
            .map(inp => inp.parentElement.dataset.icon);
    }

    function updatePills() {
        document.getElementById('pill-bars').classList.toggle('active', cbBars.checked);
        document.getElementById('pill-icons').classList.toggle('active', cbIcons.checked);
        document.getElementById('pill-compass').classList.toggle('active', cbCompass.checked);
        document.getElementById('icons-selector-row').style.display = cbIcons.checked ? 'block' : 'none';
    }

    ['opt-bars','opt-icons','opt-compass'].forEach(id => {
        document.getElementById(id).addEventListener('change', () => { updatePills(); buildPreview(); });
    });

    function buildCardHTML() {
        const winner     = document.getElementById('ideology-label')?.innerText || '—';
        const iconsList  = cbIcons.checked ? getSelectedIcons() : [];
        const date       = new Date().toLocaleDateString('fr-FR');
        const foundParty = ideologies.find(i => i.name === winner);
        const winnerImg  = foundParty ? foundParty.image : null;

        const winnerPers = document.getElementById('personality-label')?.innerText || '—';
        const foundPers  = typeof personalities !== 'undefined' ? personalities.find(p => p.name === winnerPers) : null;
        const persImg    = foundPers ? foundPers.image : null;

        const trMyProfile = window.TV ? window.TV.tr('export_date_label') : "Mon profil politique";
        const trPop       = window.TV ? window.TV.tr('results_populism') : "Populisme";
        const trAxes      = window.TV ? window.TV.tr('results_axes_title') : "Axes politiques";
        const trNeutral   = window.TV ? window.TV.tr('neutral_pct') : "Neutre";
        const trSpec      = window.TV ? window.TV.tr('results_special_title') : "Positions spéciales";
        const trCompass   = window.TV ? window.TV.tr('results_compass_title') : "Boussole Politique";
        const trLabelParty = window.TV ? window.TV.tr('results_closest_party') : "Parti le plus proche";
        const trLabelPers  = window.TV ? window.TV.tr('results_closest_personality') : "Personnalité la plus proche";

        let html = `
        <div style="width:1000px;background:#fff;line-height:1.4;box-sizing:border-box;font-family:'Oswald',sans-serif;">
          <style>@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap');</style>

          <div style="background:linear-gradient(135deg,#1e293b,#334155);padding:22px 32px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="color:#fff;font-size:28px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">TUNISIAN VALUES</div>
              <div style="color:rgba(255,255,255,.55);font-size:12px;letter-spacing:.1em;margin-top:4px;text-transform:uppercase;">${trMyProfile}</div>
            </div>
            <div style="text-align:right;color:rgba(255,255,255,.4);font-size:11px;">${date}<br><span style="font-size:9px;letter-spacing:.05em;">tunisianvalues.github.io</span></div>
          </div>

          <div style="padding:20px 32px 16px;border-bottom:2px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;background:#fafafa;box-sizing:border-box;gap:20px;">
            <div style="display:flex;align-items:center;gap:14px;flex:1;">
              <div style="width:68px;height:68px;background:#fff;border-radius:11px;border:2px solid #f1f5f9;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,.07);">
                ${winnerImg ? `<img src="${winnerImg}" style="width:100%;height:100%;object-fit:contain;padding:5px;">` : `<span style="font-size:28px;">🏛️</span>`}
              </div>
              <div>
                <div style="color:#9ca3af;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:2px;">${trLabelParty}</div>
                <div style="color:#111827;font-size:20px;font-weight:700;line-height:1.1;">${winner}</div>
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:14px;flex:1;border-left:1.5px solid #e5e7eb;padding-left:20px;">
              <div style="width:68px;height:68px;background:#fff;border-radius:50%;border:2px solid #f1f5f9;overflow:hidden;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,.07);">
                ${persImg ? `<img src="${persImg}" style="width:100%;height:100%;object-fit:cover;">` : `<span style="font-size:28px;color:#cbd5e1">👤</span>`}
              </div>
              <div>
                <div style="color:#9ca3af;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:2px;">${trLabelPers}</div>
                <div style="color:#111827;font-size:20px;font-weight:700;line-height:1.1;">${winnerPers}</div>
              </div>
            </div>

            <div style="flex-shrink:0;margin-left:auto;background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;padding:5px 11px;border-radius:6px;height:fit-content;white-space:nowrap;">
              ${trPop} : ${_pop}%
            </div>
          </div>`;

        if (cbBars.checked) {
            html += `<div style="padding:18px 32px;">
              <div style="font-size:10px;font-weight:700;letter-spacing:.12em;color:#9ca3af;text-transform:uppercase;margin-bottom:12px;">${trAxes}</div>`;
            
            _barsData.forEach(b => {
                const trName = window.TV ? window.TV.tr('ax_' + b.ax) : b.cfg.name;
                const trLeft = window.TV ? window.TV.tr('ax_' + b.ax + '_left') : b.cfg.leftLabel;
                const trRight = window.TV ? window.TV.tr('ax_' + b.ax + '_right') : b.cfg.rightLabel;
                
                html += `
                <div style="margin-bottom:11px;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                    <span style="font-size:12px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:.04em;">${trName}</span>
                  </div>
                  <div style="height:22px;border-radius:11px;overflow:hidden;background:#f3f4f6;display:flex;">
                    <div style="width:${b.leftExact}%;background:${b.cfg.leftColor};height:100%;"></div>
                    <div style="width:${b.neutralExact}%;background:#e5e7eb;height:100%;"></div>
                    <div style="width:${b.rightExact}%;background:${b.cfg.rightColor};height:100%;"></div>
                  </div>
                  <div style="display:flex;justify-content:space-between;margin-top:2px;">
                    <span style="font-size:10px;color:${b.cfg.leftColor};font-weight:700;">${b.left}% ${trLeft}</span>
                    <span style="font-size:10px;color:#9ca3af;">${trNeutral} ${b.neutral}%</span>
                    <span style="font-size:10px;color:${b.cfg.rightColor};font-weight:700;">${trRight} ${b.right}%</span>
                  </div>
                </div>`;
            });
            html += `</div>`;
        }

        if (iconsList.length > 0) {
            html += `<div style="padding:14px 32px 16px;border-top:2px solid #f1f5f9;background:#fafafa;">
              <div style="font-size:10px;font-weight:700;letter-spacing:.12em;color:#9ca3af;text-transform:uppercase;margin-bottom:10px;">${trSpec}</div>
              <div style="display:flex;flex-wrap:wrap;gap:12px;">`;
            iconsList.forEach(n => {
                const specName = window.TV ? window.TV.tr('spec_' + n) : (specialLabels[n]||n);
                html += `
                <div style="display:flex;flex-direction:column;align-items:center;gap:4px;width:70px;">
                  <div style="width:48px;height:48px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;overflow:hidden;display:flex;align-items:center;justify-content:center;">
                    <img src="icons/${n}.png" style="width:100%;height:100%;object-fit:contain;padding:4px;">
                  </div>
                  <span style="font-size:9px;color:#374151;font-weight:700;text-align:center;line-height:1.2;">${specName}</span>
                </div>`;
            });
            html += `</div></div>`;
        }

        if (cbCompass.checked) {
            html += `<div style="padding:18px 32px 22px;border-top:2px solid #f1f5f9;">
              <div style="font-size:10px;font-weight:700;letter-spacing:.12em;color:#9ca3af;text-transform:uppercase;margin-bottom:12px;">${trCompass}</div>
              <div style="display:flex;justify-content:center;">
                <img id="compass-export-img" style="width:460px;height:460px;border-radius:12px;border:1px solid #e5e7eb;">
              </div>
            </div>`;
        }

        html += `</div>`;
        return html;
    }

    function injectCompassImage(container) {
        if (!cbCompass.checked) return Promise.resolve();
        return new Promise(resolve => {
            const offscreen = document.createElement('canvas');
            window.drawCompassOnCanvas(offscreen, 460, 460, 2).then(() => {
                const dataUrl = offscreen.toDataURL('image/png');
                const img = container.querySelector('#compass-export-img');
                if (img) img.src = dataUrl;
                if (img) {
                    img.onload = resolve;
                    img.onerror = resolve;
                } else {
                    resolve();
                }
            });
        });
    }

    function buildPreview() {
        const html = buildCardHTML();
        previewInner.innerHTML = html;

        if (cbCompass.checked && window.drawCompassOnCanvas) {
            const offscreen = document.createElement('canvas');
            window.drawCompassOnCanvas(offscreen, 460, 460, 1).then(() => {
                const img = previewInner.querySelector('#compass-export-img');
                if (img) img.src = offscreen.toDataURL('image/png');
            });
        }

        const wrapW = previewWrap.getBoundingClientRect().width || 680;
        const scale = wrapW / 1000;
        previewInner.style.transform = `scale(${scale})`;
        previewInner.style.width = '1000px';
        setTimeout(() => {
            previewWrap.style.height = (previewInner.scrollHeight * scale) + 'px';
        }, 300);
    }

    function openModal() {
        initIconChips();
        updatePills();
        buildPreview();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    document.getElementById('modal-dl-btn').addEventListener('click', function() {
        const btn = this;
        btn.innerHTML = '⏳ Génération…';
        btn.disabled = true;

        capArea.innerHTML = buildCardHTML();
        const el = capArea.firstElementChild;

        injectCompassImage(capArea).then(() => {
            setTimeout(() => {
                htmlToImage.toPng(el, { pixelRatio: 2.5, backgroundColor: '#ffffff' })
                    .then(dataUrl => {
                        const a = document.createElement('a');
                        a.download = 'mes-resultats-tunisianvalues.png';
                        a.href = dataUrl; a.click();
                        
                        const trDL = window.TV ? window.TV.tr('btn_download') : "Télécharger";
                        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg> ${trDL}`;
                        btn.disabled = false;
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Erreur lors de la génération. Veuillez réessayer.");
                        btn.innerHTML = 'Réessayer';
                        btn.disabled = false;
                    });
            }, 200);
        });
    });

    document.getElementById('download-btn').addEventListener('click', openModal);
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
})();
