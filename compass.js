// ════════════════════════════════════════════════
// COMPASS POLITIQUE — BOUSSOLE DYNAMIQUE PREMIUM (V6)
// Tooltip simplifié : Uniquement le nom du parti
// ════════════════════════════════════════════════
(function() {
    function mid(range) { return (range[0] + range[1]) / 2; }
    function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
    function isMobile() { return window.innerWidth < 640 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent); }

    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        hex = hex.replace('#', '');
        if (hex.length === 3) { r = parseInt(hex[0]+hex[0],16); g = parseInt(hex[1]+hex[1],16); b = parseInt(hex[2]+hex[2],16); }
        else if (hex.length === 6) { r = parseInt(hex.substring(0,2),16); g = parseInt(hex.substring(2,4),16); b = parseInt(hex.substring(4,6),16); }
        return `${r},${g},${b}`;
    }

    function resolveCollisions(items, minDist, ux, uy) {
        const userAvoidDist = minDist + 16; 
        for (let it = 0; it < 300; it++) {
            let moved = false;
            for (let i = 0; i < items.length; i++) {
                const dxU = items[i].px - ux;
                const dyU = items[i].py - uy;
                const distU = Math.sqrt(dxU * dxU + dyU * dyU);
                if (distU < userAvoidDist && distU > 0.01) {
                    const push = (userAvoidDist - distU) + 0.5;
                    const nx = dxU / distU, ny = dyU / distU;
                    items[i].px += nx * push; 
                    items[i].py += ny * push;
                    moved = true;
                }
                for (let j = i + 1; j < items.length; j++) {
                    const a = items[i], b = items[j];
                    const dx = b.px - a.px, dy = b.py - a.py;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < minDist && dist > 0.01) {
                        const push = (minDist - dist) / 2 + 0.5;
                        const nx = dx / dist, ny = dy / dist;
                        a.px -= nx * push; a.py -= ny * push;
                        b.px += nx * push; b.py += ny * push;
                        moved = true;
                    }
                }
            }
            if (!moved) break;
        }
    }

    function roundRect(ctx, x, y, w, h, r) {
        r = Math.min(r, w / 2, h / 2);
        ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r); 
        ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); 
        ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); 
        ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
    }

    function drawPill(ctx, text, x, y, bgCol, fgCol, mobile) {
        ctx.save();
        const fontSize = mobile ? 9 : 11;
        ctx.font = `bold ${fontSize}px Oswald, sans-serif`;
        const metrics = ctx.measureText(text);
        const estimatedWidth = text.length * (fontSize * 0.55);
        const textWidth = Math.max(metrics.width, estimatedWidth);
        const w = textWidth + (mobile ? 28 : 36);
        const h = mobile ? 22 : 26;
        
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 6; ctx.shadowOffsetY = 3;
        ctx.fillStyle = bgCol;
        roundRect(ctx, x - w/2, y - h/2, w, h, h/2); ctx.fill();
        
        ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
        ctx.fillStyle = fgCol; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
        ctx.fillText(text, x, y + (mobile ? 1 : 1.5));
        ctx.restore();
    }

    // ── GESTIONNAIRE D'INFO-BULLE (TOOLTIP) ──
    function getTooltip() {
        let tt = document.getElementById('compass-tooltip');
        if (!tt) {
            tt = document.createElement('div');
            tt.id = 'compass-tooltip';
            tt.className = 'absolute z-50 pointer-events-none transition-opacity duration-200 bg-slate-900/95 backdrop-blur-sm text-white rounded-lg shadow-xl px-4 py-2 font-oswald text-center whitespace-nowrap';
            tt.style.opacity = '0';
            tt.style.transform = 'translate(-50%, -100%)';
            tt.style.marginTop = '-12px'; // Décalage au-dessus de la souris
            
            const wrapper = document.getElementById('compass-wrapper');
            if (wrapper) {
                wrapper.style.position = 'relative';
                wrapper.appendChild(tt);
            }
        }
        return tt;
    }

    window.drawCompassOnCanvas = function(canvas, displayW, displayH, dpr) {
        const mobile = isMobile() || displayW < 400;
        dpr = dpr || window.devicePixelRatio || 2; 
        
        canvas.width = displayW * dpr; canvas.height = displayH * dpr;
        canvas.style.width = displayW + 'px'; canvas.style.height = displayH + 'px';

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr); 
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';

        const W = displayW, H = displayH;
        const LOGO = mobile ? 22 : 32, HALF = LOGO / 2, PAD = 3, CELL = LOGO + PAD * 2 + 5;
        const MARGIN = mobile ? 45 : 55;
        const gx = MARGIN, gy = MARGIN, gw = W - MARGIN*2, gh = H - MARGIN*2;
        const cx = gx + gw / 2, cy = gy + gh / 2;

        const INNER_PAD = LOGO + 10; 
        const sX = (gw - 2 * INNER_PAD) / 200;
        const sY = (gh - 2 * INNER_PAD) / 200;

        const selX = document.getElementById('select-compass-x')?.value || 'reli';
        const selY = document.getElementById('select-compass-y')?.value || 'demo';

        const cfgX = axesConfig[selX];
        const cfgY = axesConfig[selY];
        const tr = (k, def) => (typeof window.TV !== 'undefined') ? window.TV.tr(k) : def;

        const lblXLeft = tr('ax_' + selX + '_left', cfgX.leftLabel).toUpperCase();
        const lblXRight = tr('ax_' + selX + '_right', cfgX.rightLabel).toUpperCase();
        const lblYTop = tr('ax_' + selY + '_left', cfgY.leftLabel).toUpperCase();
        const lblYBot = tr('ax_' + selY + '_right', cfgY.rightLabel).toUpperCase();

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#f8fafc'; roundRect(ctx, gx, gy, gw, gh, 12); ctx.fill();
        ctx.save(); ctx.beginPath(); roundRect(ctx, gx, gy, gw, gh, 12); ctx.clip();

        const cXL = hexToRgb(cfgX.leftColor), cXR = hexToRgb(cfgX.rightColor);
        const cYT = hexToRgb(cfgY.leftColor), cYB = hexToRgb(cfgY.rightColor);
        ctx.fillStyle = `rgba(${cXL}, 0.04)`; ctx.fillRect(gx, gy, gw/2, gh/2); 
        ctx.fillStyle = `rgba(${cXR}, 0.04)`; ctx.fillRect(cx, gy, gw/2, gh/2); 
        ctx.fillStyle = `rgba(${cXL}, 0.04)`; ctx.fillRect(gx, cy, gw/2, gh/2); 
        ctx.fillStyle = `rgba(${cXR}, 0.04)`; ctx.fillRect(cx, cy, gw/2, gh/2); 

        ctx.strokeStyle = 'rgba(203, 213, 225, 0.6)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
        [-75, -50, -25, 25, 50, 75].forEach(v => {
            const px = cx + (v * sX), py = cy + (v * sY);
            ctx.beginPath(); ctx.moveTo(px, gy); ctx.lineTo(px, gy + gh); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(gx, py); ctx.lineTo(gx + gw, py); ctx.stroke();
        });
        ctx.setLineDash([]);

        ctx.lineWidth = 2.5;
        let gradX = ctx.createLinearGradient(gx, cy, gx + gw, cy);
        gradX.addColorStop(0, cfgX.leftColor); gradX.addColorStop(1, cfgX.rightColor);
        ctx.strokeStyle = gradX; ctx.beginPath(); ctx.moveTo(gx, cy); ctx.lineTo(gx + gw, cy); ctx.stroke();

        let gradY = ctx.createLinearGradient(cx, gy, cx, gy + gh);
        gradY.addColorStop(0, cfgY.leftColor); gradY.addColorStop(1, cfgY.rightColor);
        ctx.strokeStyle = gradY; ctx.beginPath(); ctx.moveTo(cx, gy); ctx.lineTo(cx, gy + gh); ctx.stroke();
        ctx.restore(); 

        ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; roundRect(ctx, gx, gy, gw, gh, 12); ctx.stroke();

        const wallMinX = gx + HALF + PAD; const wallMaxX = gx + gw - HALF - PAD;
        const wallMinY = gy + HALF + PAD; const wallMaxY = gy + gh - HALF - PAD;

        let userRawX = 0, userRawY = 0;
        if (typeof _uv !== 'undefined') { userRawX = _uv[selX] || 0; userRawY = _uv[selY] || 0; }
        const ux = clamp(cx + userRawX * sX, wallMinX, wallMaxX);
        const uy = clamp(cy + userRawY * sY, wallMinY, wallMaxY);

        const items = ideologies.map(p => {
            const valX = mid(p.range_vector[selX]), valY = mid(p.range_vector[selY]);
            return { party: p, origX: cx + valX * sX, origY: cy + valY * sY, px: cx + valX * sX, py: cy + valY * sY };
        });

        resolveCollisions(items, CELL, ux, uy);
        
        items.forEach(it => {
            it.px = clamp(it.px, wallMinX, wallMaxX);
            it.py = clamp(it.py, wallMinY, wallMaxY);
        });

        // ── SAUVEGARDE POUR L'INTERACTIVITÉ ──
        canvas.__compassItems = items;
        canvas.__compassHitRadius = HALF + PAD;

        // ── INIT EVENTS (1 SEULE FOIS) ──
        if (!canvas.__hasTooltipEvents) {
            canvas.__hasTooltipEvents = true;
            
            canvas.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const mx = e.clientX - rect.left; 
                const my = e.clientY - rect.top;
                
                let hit = null;
                const r = this.__compassHitRadius;
                if (this.__compassItems) {
                    for (let i = this.__compassItems.length - 1; i >= 0; i--) {
                        const it = this.__compassItems[i];
                        if (Math.hypot(mx - it.px, my - it.py) < r) {
                            hit = it; break;
                        }
                    }
                }

                const tt = getTooltip();
                if (hit) {
                    this.style.cursor = 'pointer';
                    // Modification ici : Uniquement le nom du parti, en majuscules.
                    tt.innerHTML = `
                        <div style="font-size:13px; font-weight:700; letter-spacing:0.05em; text-transform:uppercase;">
                            ${hit.party.name}
                        </div>
                    `;
                    tt.style.left = mx + 'px';
                    tt.style.top = (my - r) + 'px';
                    tt.style.opacity = '1';
                } else {
                    this.style.cursor = 'default';
                    tt.style.opacity = '0';
                }
            });

            canvas.addEventListener('mouseleave', function() {
                const tt = document.getElementById('compass-tooltip');
                if (tt) tt.style.opacity = '0';
            });
        }

        return new Promise(resolve => {
            Promise.all(items.map(it => new Promise(res => {
                if (!it.party.image) return res({...it, img: null });
                const img = new Image(); img.src = it.party.image;
                img.onload = () => res({...it, img }); img.onerror = () => res({...it, img: null });
            }))).then(loaded => {
                
                loaded.forEach(({ px, py, origX, origY }) => {
                    if (Math.hypot(px - origX, py - origY) > 6) {
                        ctx.strokeStyle = 'rgba(148,163,184,0.4)'; ctx.lineWidth = 1.5; ctx.setLineDash([2, 3]);
                        ctx.beginPath(); ctx.moveTo(origX, origY); ctx.lineTo(px, py); ctx.stroke();
                        ctx.setLineDash([]); ctx.fillStyle = '#94a3b8';
                        ctx.beginPath(); ctx.arc(origX, origY, 2.5, 0, Math.PI * 2); ctx.fill();
                    }
                });

                loaded.forEach(({ img, px, py, party }) => {
                    ctx.shadowColor = 'rgba(15, 23, 42, 0.12)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3; 
                    ctx.fillStyle = '#ffffff'; roundRect(ctx, px - HALF - PAD, py - HALF - PAD, LOGO + PAD * 2, LOGO + PAD * 2, 8); ctx.fill();
                    ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; 
                    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1.5; roundRect(ctx, px - HALF - PAD, py - HALF - PAD, LOGO + PAD * 2, LOGO + PAD * 2, 8); ctx.stroke();

                    ctx.save(); ctx.beginPath(); roundRect(ctx, px - HALF, py - HALF, LOGO, LOGO, 5); ctx.clip();
                    if (img) {
                        const ratio = Math.min(LOGO / img.width, LOGO / img.height);
                        ctx.drawImage(img, px - (img.width*ratio)/2, py - (img.height*ratio)/2, img.width*ratio, img.height*ratio);
                    } else {
                        ctx.fillStyle = '#f8fafc'; ctx.fillRect(px - HALF, py - HALF, LOGO, LOGO);
                        ctx.fillStyle = '#475569'; ctx.font = `bold ${mobile ? 10 : 14}px Oswald, sans-serif`; 
                        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                        ctx.fillText(party.name.charAt(0), px, py + 1);
                    }
                    ctx.restore();
                });

                const youR = mobile ? 6 : 8;
                let gradUser = ctx.createRadialGradient(ux, uy, youR, ux, uy, youR * 4);
                gradUser.addColorStop(0, 'rgba(220, 38, 38, 0.35)'); gradUser.addColorStop(1, 'rgba(220, 38, 38, 0)');
                ctx.fillStyle = gradUser; ctx.beginPath(); ctx.arc(ux, uy, youR * 4, 0, Math.PI * 2); ctx.fill();

                ctx.shadowColor = 'rgba(220, 38, 38, 0.6)'; ctx.shadowBlur = 10;
                ctx.fillStyle = '#dc2626'; ctx.beginPath(); ctx.arc(ux, uy, youR, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.stroke();

                const youLabel = tr('legend_you', 'VOUS').toUpperCase();
                drawPill(ctx, youLabel, ux, uy - 18, '#dc2626', '#ffffff', mobile);

                drawPill(ctx, lblYTop, cx, gy, cfgY.leftColor, '#ffffff', mobile);
                drawPill(ctx, lblYBot, cx, gy + gh, cfgY.rightColor, '#ffffff', mobile);
                
                ctx.save(); ctx.translate(gx, cy); ctx.rotate(-Math.PI / 2);
                drawPill(ctx, lblXLeft, 0, 0, cfgX.leftColor, '#ffffff', mobile); ctx.restore();

                ctx.save(); ctx.translate(gx + gw, cy); ctx.rotate(Math.PI / 2);
                drawPill(ctx, lblXRight, 0, 0, cfgX.rightColor, '#ffffff', mobile); ctx.restore();

                resolve();
            });
        });
    };

    window.renderCompass = function() {
        const canvas = document.getElementById('compass-canvas');
        if (!canvas) return;
        const mobile = isMobile(); 
        const dpr = Math.max(window.devicePixelRatio || 1, 2);
        const container = canvas.parentElement; 
        const maxW = mobile ? 360 : 600; 
        const available = Math.max(260, (container ? container.clientWidth : 600));
        const size = Math.min(available, maxW);
        window.drawCompassOnCanvas(canvas, size, size, dpr);
    };

    document.addEventListener('DOMContentLoaded', () => {
        const sx = document.getElementById('select-compass-x');
        const sy = document.getElementById('select-compass-y');
        const wrapper = document.getElementById('compass-wrapper');

        const updateWithFade = () => {
            if (wrapper) wrapper.style.opacity = '0.3'; 
            setTimeout(() => { window.renderCompass(); if (wrapper) wrapper.style.opacity = '1'; }, 150); 
        };

        if(sx) sx.addEventListener('change', updateWithFade);
        if(sy) sy.addEventListener('change', updateWithFade);
    });

    document.addEventListener('tv:langchange', () => {
        const content = document.getElementById('compass-content');
        if (content && !content.classList.contains('hidden')) window.renderCompass();
    });

    let _resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(_resizeTimer);
        _resizeTimer = setTimeout(function() {
            const content = document.getElementById('compass-content');
            if (content && !content.classList.contains('hidden')) window.renderCompass();
        }, 200);
    });
})();