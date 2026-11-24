// Prototype renderer for Align "sky news" carousel directions.
// Usage: node news/proto/render-proto.mjs [wire|observatory|aurawire|compare ...]
// Renders 1080x1350 JPEGs to news/proto/out/<direction>/0N.jpg and a compare grid.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..'); // carousel/
const OUT = path.join(HERE, 'out');
const ASSETS = path.join(HERE, 'assets');
const NM = path.join(ROOT, 'node_modules/@fontsource');
const REFS = '/root/.claude/uploads/389b31dd-88d7-51a7-8648-0e1c25792299';

const W = 1080, H = 1350;

// ---------- palette ----------
const P = {
  bone: '#efe6d6', gold: '#f2c75c', ink: '#07041a', indigo: '#0b0620',
  virgo: '#ef5c94', aquarius: '#38c4ec', capricorn: '#2fc79a', leo: '#f39a3a',
};

// ---------- inline helpers ----------
const b64 = (file) => fs.readFileSync(file).toString('base64');
const mime = (f) => (f.endsWith('.png') ? 'image/png' : f.endsWith('.woff2') ? 'font/woff2' : 'image/jpeg');
const uri = (file) => `data:${mime(file)};base64,${b64(file)}`;
const imgCache = {};
const img = (name) => (imgCache[name] ??= uri(path.join(ASSETS, name.includes('.') ? name : `${name}.jpg`)));

function face(family, file, weight = 400, style = 'normal') {
  return `@font-face{font-family:'${family}';src:url(${uri(path.join(NM, file))}) format('woff2');font-weight:${weight};font-style:${style};font-display:block}`;
}
const FONTS = [
  face('Anton', 'anton/files/anton-latin-400-normal.woff2'),
  face('Oswald', 'oswald/files/oswald-latin-400-normal.woff2', 400),
  face('Oswald', 'oswald/files/oswald-latin-500-normal.woff2', 500),
  face('Oswald', 'oswald/files/oswald-latin-600-normal.woff2', 600),
  face('Playfair', 'playfair-display/files/playfair-display-latin-700-normal.woff2', 700),
  face('Playfair', 'playfair-display/files/playfair-display-latin-800-normal.woff2', 800),
  face('Playfair', 'playfair-display/files/playfair-display-latin-900-normal.woff2', 900),
  face('Playfair', 'playfair-display/files/playfair-display-latin-400-italic.woff2', 400, 'italic'),
  face('Playfair', 'playfair-display/files/playfair-display-latin-600-italic.woff2', 600, 'italic'),
  face('Inter', 'inter/files/inter-latin-400-normal.woff2', 400),
  face('Inter', 'inter/files/inter-latin-500-normal.woff2', 500),
  face('Inter', 'inter/files/inter-latin-600-normal.woff2', 600),
].join('\n');

// 4-point star, drawn so it never depends on a font having the glyph.
const star = (size, color) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 20 20" style="display:inline-block;vertical-align:middle"><path d="M10 0 C10.9 6.4 13.6 9.1 20 10 C13.6 10.9 10.9 13.6 10 20 C9.1 13.6 6.4 10.9 0 10 C6.4 9.1 9.1 6.4 10 0Z" fill="${color}"/></svg>`;

// Film grain as an SVG turbulence tile.
const GRAIN = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`
).toString('base64')}`;

// Headline markup: lines split by "|", *accent*, #highlight box#.
function lines(src, { cls = '' } = {}) {
  return src
    .split('|')
    .map((ln) => {
      const html = ln
        .replace(/\*([^*]+)\*/g, '<span class="ac">$1</span>')
        .replace(/#([^#]+)#/g, '<span class="hl">$1</span>');
      return `<span class="ln ${cls}">${html}</span>`;
    })
    .join('');
}

// ---------- base page ----------
function page(body, css = '') {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONTS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;background:#000;overflow:hidden}
.slide{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:${P.bone};-webkit-font-smoothing:antialiased}
.ln{display:table;white-space:nowrap}
.fit.center .ln{margin:0 auto}
.abs{position:absolute}
${css}
</style></head><body>${body}
<script>
// Fit each [data-fit] block: one font size for all lines, so the longest line
// hits data-fit px; then shrink if it is taller than data-maxh; cap at data-maxfs.
// data-justify stretches near-full lines to the full width with word spacing.
window.__fit = () => {
  for (const el of document.querySelectorAll('[data-fit]')) {
    const target = +el.dataset.fit, maxh = +(el.dataset.maxh || 1e9), maxfs = +(el.dataset.maxfs || 1e9);
    const ls = [...el.querySelectorAll('.ln')];
    el.style.fontSize = '100px';
    const widest = Math.max(...ls.map((l) => l.getBoundingClientRect().width));
    let fs = Math.min(100 * target / widest, maxfs);
    el.style.fontSize = fs + 'px';
    const h = el.getBoundingClientRect().height;
    if (h > maxh) { fs *= maxh / h; el.style.fontSize = fs + 'px'; }
    if (el.dataset.justify !== undefined) {
      const full = Math.max(...ls.map((l) => l.getBoundingClientRect().width));
      for (const l of ls) {
        const w = l.getBoundingClientRect().width, gaps = (l.textContent.trim().match(/ +/g) || []).length;
        if (gaps && w < full && w / full > 0.8) l.style.wordSpacing = ((full - w) / gaps) + 'px';
      }
    }
    el.dataset.fs = fs.toFixed(1);
  }
};
</script></body></html>`;
}

// =====================================================================
// Direction A — "Wire": sports/tech news grammar.
// photo top fading to black · divider with centred mark · giant Anton caps
// in two colours · small dateline.
// =====================================================================
const A_CSS = `
.photo{position:absolute;left:0;top:0;width:100%;background-repeat:no-repeat}
.photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 52%,rgba(0,0,0,.75) 78%,#000 100%)}
.stack{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;padding:0 0 64px}
.div{display:flex;align-items:center;gap:22px;width:960px;margin-bottom:30px}
.div i{flex:1;height:2px;background:linear-gradient(90deg,rgba(239,230,214,0),rgba(239,230,214,.85))}
.div i:last-child{background:linear-gradient(270deg,rgba(239,230,214,0),rgba(239,230,214,.85))}
.mark{font:400 30px/1 Anton;letter-spacing:.1em;color:${P.bone};display:flex;align-items:center;gap:9px}
.fit{font-family:Anton;line-height:.98;text-transform:uppercase;color:${P.bone};text-align:center;letter-spacing:.003em}
.fit .ac{color:var(--ac)}
.date{margin-top:30px;font:500 28px/1 Oswald;letter-spacing:.2em;color:${P.bone};opacity:.75;text-transform:uppercase}
.date b{color:var(--ac);font-weight:500}
.sub{font:500 33px/1.32 Oswald;color:rgba(239,230,214,.78);text-align:center;width:900px}
.hook{font:400 60px/1.02 Anton;text-transform:uppercase;text-align:center;color:${P.bone}}
.rows{width:930px;display:flex;flex-direction:column;gap:30px;margin-top:40px}
.row{display:flex;align-items:center;gap:28px}
.row .n{font:400 58px/1 Anton;text-transform:uppercase;color:var(--ac);width:330px;text-align:right;flex:none}
.row .t{font:500 33px/1.2 Oswald;color:rgba(239,230,214,.86);white-space:nowrap}
`;
const aDivider = () => `<div class="div"><i></i><span class="mark">ALIGN ${star(20, P.bone)}</span><i></i></div>`;
const aPhoto = (name, h, size, pos, extra = '') =>
  `<div class="photo" style="height:${h}px;background-image:url(${img(name)});background-size:${size};background-position:${pos};${extra}"></div>`;

const A = [
  // 01 cover: mars
  () => page(`<div class="slide" style="--ac:${P.virgo}">
    ${aPhoto('mars', 960, '900px', '50% 36px')}
    <div class="stack">
      ${aDivider()}
      <div class="fit center" data-fit="980" data-maxh="470">${lines('MARS TURNS|*RETROGRADE* IN|*VIRGO* TOMORROW')}</div>
      <div class="date">Sky news <b>/</b> Jan 9</div>
    </div></div>`, A_CSS),
  // 02 cover: eclipse
  () => page(`<div class="slide" style="--ac:${P.aquarius}">
    ${aPhoto('eclipse-sunrise', 900, '1560px', '80% 7%')}
    <div class="stack">
      ${aDivider()}
      <div class="fit center" data-fit="990" data-maxh="470">${lines('THE *RING OF FIRE*|ECLIPSE IN *AQUARIUS*|IS IN *7 DAYS*')}</div>
      <div class="date">Sky news <b>/</b> Jan 30</div>
    </div></div>`, A_CSS),
  // 03 ranked
  () => page(`<div class="slide" style="--ac:${P.capricorn}">
    ${aPhoto('aura-capricorn', 820, '1180px', '50% 0%')}
    <div class="stack">
      ${aDivider()}
      <div class="fit center" data-fit="990" data-maxh="260">${lines('*#1* CAPRICORN')}</div>
      <div class="hook" style="margin-top:22px">${lines('The boring work you did in|December finally pays out', { cls: '' })}</div>
      <div class="sub" style="margin-top:26px">Mars slows everyone else down. You were already<br>moving at that speed, so you get noticed first.</div>
    </div></div>`, A_CSS + `.hook .ln{margin:0 auto}`),
  // 04 myth check
  () => page(`<div class="slide" style="--ac:${P.gold}">
    ${aPhoto('eclipse-ring', 800, '1700px', '48% 44%', 'filter:brightness(1.9) contrast(1.4)')}
    <div class="stack">
      ${aDivider()}
      <div class="fit center" data-fit="900" data-maxh="330">${lines('“YOUR 300-YEAR|KARMIC DEBT IS ERASED|AT THE ECLIPSE”')}</div>
      <div class="fit center" data-fit="560" style="margin-top:14px">${lines('*NOT TRUE.*')}</div>
      <div class="sub" style="margin-top:30px">Solar eclipses happen every year and none of them wipe<br>anything. It is a new moon: a good day to start, that’s all.</div>
    </div></div>`, A_CSS),
  // 05 list
  () => page(`<div class="slide" style="--ac:${P.virgo}">
    ${aPhoto('mars', 620, '760px', '50% -150px')}
    <div class="stack">
      ${aDivider()}
      <div class="fit center" data-fit="960" data-maxh="300">${lines('MARS RETROGRADE:|*WHO FEELS IT MOST*')}</div>
      <div class="rows" style="gap:34px;margin-top:48px">
        <div class="row"><span class="n">Virgo</span><span class="t">It’s in your sign. Set your own pace.</span></div>
        <div class="row"><span class="n">Gemini</span><span class="t">Home plans stall. Repair, don’t rebuild.</span></div>
        <div class="row"><span class="n">Sagittarius</span><span class="t">Career red tape. Resend, don’t quit.</span></div>
        <div class="row"><span class="n">Pisces</span><span class="t">Old arguments return. Listen first.</span></div>
      </div>
    </div></div>`, A_CSS),
];

// =====================================================================
// Direction B — "Observatory": huge real planet on black, bold serif caps,
// gold second half, thin gold glow line, italic wordmark.
// The planet sits centred in whatever space the text block leaves.
// =====================================================================
const B_CSS = `
.slide{background:#000;display:flex;flex-direction:column}
.planet{flex:1;min-height:0;background-repeat:no-repeat;background-position:50% 50%}
.soft{-webkit-mask-image:radial-gradient(ellipse 50% 50% at 50% 50%,#000 70%,transparent 100%);mask-image:radial-gradient(ellipse 50% 50% at 50% 50%,#000 70%,transparent 100%)}
.stack{display:flex;flex-direction:column;align-items:center;padding:0 0 66px}
.fit{font-family:Playfair;font-weight:800;line-height:1.08;text-transform:uppercase;color:${P.bone};text-align:center;letter-spacing:.01em;font-variant-numeric:lining-nums}
.fit .ac,.gold{background:linear-gradient(180deg,#f7d886 0%,#e7b54c 55%,#c8923a 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.glow{position:relative;width:620px;height:2px;margin:40px 0 30px;background:linear-gradient(90deg,rgba(242,199,92,0),rgba(242,199,92,.9) 50%,rgba(242,199,92,0))}
.glow::after{content:"";position:absolute;left:50%;top:50%;width:150px;height:10px;transform:translate(-50%,-50%);background:radial-gradient(ellipse at center,rgba(255,226,150,.95),rgba(242,199,92,0) 70%);filter:blur(3px)}
.wm{font:italic 600 26px/1 Playfair;letter-spacing:.42em;color:rgba(239,230,214,.62);text-transform:uppercase;display:flex;align-items:center;gap:6px;padding-left:.42em}
.it{font:italic 400 36px/1.34 Playfair;color:rgba(239,230,214,.86);text-align:center;font-variant-numeric:lining-nums}
.rows{display:flex;flex-direction:column;gap:28px;align-items:center}
.row{text-align:center}
.row .n{font:800 46px/1 Playfair;text-transform:uppercase;letter-spacing:.04em}
.row .t{font:italic 400 32px/1.3 Playfair;color:rgba(239,230,214,.84);margin-top:8px}
`;
const bWord = () => `<div class="wm">align ${star(15, 'rgba(242,199,92,.85)')}</div>`;
const bPlanet = (name, size, { pos = '50% 50%', cls = '', style = '' } = {}) =>
  `<div class="planet ${cls}" style="background-image:url(${img(name)});background-size:${size};background-position:${pos};${style}"></div>`;

const B = [
  () => page(`<div class="slide">
    ${bPlanet('mars', '660px', { style: 'margin-top:40px' })}
    <div class="stack">
      <div class="fit center" data-fit="900" data-maxh="460">${lines('MARS TURNS|RETROGRADE|*IN VIRGO*|*TOMORROW*')}</div>
      <div class="glow"></div>${bWord()}
    </div></div>`, B_CSS),
  () => page(`<div class="slide">
    ${bPlanet('eclipse-ring', '1500px', { pos: '57% 33%', cls: 'soft', style: 'filter:brightness(1.35) contrast(1.4);margin:20px 0 10px' })}
    <div class="stack">
      <div class="fit center" data-fit="900" data-maxh="460">${lines('THE RING OF FIRE|ECLIPSE IN|*AQUARIUS IS*|*IN 7 DAYS*')}</div>
      <div class="glow"></div>${bWord()}
    </div></div>`, B_CSS),
  () => page(`<div class="slide">
    ${bPlanet('saturn', '1120px', { pos: '50% 52%', cls: 'soft', style: 'margin-top:20px' })}
    <div class="stack">
      <div class="fit center" data-fit="920" data-maxh="200">${lines('*NO. 1* CAPRICORN')}</div>
      <div class="fit center gold" data-fit="840" style="margin-top:24px;font-weight:700;line-height:1.16">${lines('The boring work you did in|December finally pays out')}</div>
      <div class="it" style="margin-top:24px">Mars slows everyone else down. You were already<br>moving at that speed, so you get noticed first.</div>
      <div class="glow"></div>${bWord()}
    </div></div>`, B_CSS),
  () => page(`<div class="slide">
    ${bPlanet('moon', '540px', { style: 'margin-top:40px' })}
    <div class="stack">
      <div class="fit center" data-fit="880" data-maxh="330">${lines('“YOUR 300-YEAR|KARMIC DEBT IS ERASED|AT THE ECLIPSE”')}</div>
      <div class="fit center" data-fit="560" style="margin-top:22px">${lines('*NOT TRUE*')}</div>
      <div class="glow" style="margin:34px 0 28px"></div>
      <div class="it">Solar eclipses happen every year and none of them<br>wipe anything. It is a new moon: a good day to start.</div>
    </div></div>`, B_CSS),
  () => page(`<div class="slide">
    ${bPlanet('mars', '430px', { style: 'margin-top:30px' })}
    <div class="stack">
      <div class="fit center" data-fit="900" data-maxh="230">${lines('MARS RETROGRADE|*WHO FEELS IT MOST*')}</div>
      <div class="glow" style="margin:34px 0 34px"></div>
      <div class="rows">
        <div class="row"><div class="n gold">Virgo</div><div class="t">It’s in your sign. Set your own pace.</div></div>
        <div class="row"><div class="n gold">Gemini</div><div class="t">Home plans stall. Repair, don’t rebuild.</div></div>
        <div class="row"><div class="n gold">Sagittarius</div><div class="t">Career moves hit red tape. Resend, don’t quit.</div></div>
        <div class="row"><div class="n gold">Pisces</div><div class="t">Old arguments return. Listen first.</div></div>
      </div>
    </div></div>`, B_CSS),
];

// =====================================================================
// Direction C — "Aura wire": A's punch + Align's aura. Real photo with a
// soft sign-colour bloom haloing it, film grain, left-aligned condensed caps,
// ONE sign-colour highlight bar per slide.
// =====================================================================
const C_CSS = `
.slide{background:${P.ink}}
.bloom{position:absolute;border-radius:50%;filter:blur(30px)}
.ph{position:absolute;background-repeat:no-repeat}
.disc{-webkit-mask-image:radial-gradient(circle at 50% 50%,#000 49.2%,transparent 50%);mask-image:radial-gradient(circle at 50% 50%,#000 49.2%,transparent 50%)}
.screen{mix-blend-mode:screen}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,4,26,0) 34%,rgba(7,4,26,.7) 58%,rgba(7,4,26,.97) 76%)}
.grain{position:absolute;inset:0;background-image:url(${GRAIN});opacity:.17;mix-blend-mode:overlay}
.stack{position:absolute;left:64px;right:64px;bottom:72px;display:flex;flex-direction:column;align-items:flex-start}
.eye{font:600 25px/1 Inter;letter-spacing:.24em;text-transform:uppercase;color:rgba(239,230,214,.82);margin-bottom:30px;display:flex;align-items:center;gap:14px}
.eye::before{content:"";width:12px;height:12px;border-radius:50%;background:var(--ac);box-shadow:0 0 16px var(--ac)}
.fit{font-family:Anton;line-height:1.06;text-transform:uppercase;color:${P.bone};letter-spacing:.004em}
.hl{display:inline-block;line-height:.98;background:var(--ac);color:${P.ink};padding:.02em .1em 0;margin:0 0 0 -.1em;box-shadow:0 0 60px color-mix(in srgb,var(--ac) 40%,transparent)}
.ln + .ln{margin-top:.04em}
.body{font:400 33px/1.4 Inter;color:rgba(239,230,214,.84);margin-top:30px}
.hook{font:400 62px/1.04 Anton;text-transform:uppercase;color:${P.bone};margin-top:24px}
.mk{position:absolute;left:64px;top:64px;font:600 24px/1 Inter;letter-spacing:.2em;color:rgba(239,230,214,.72);display:flex;align-items:center;gap:8px}
.rows{display:flex;flex-direction:column;gap:24px;margin-top:44px;width:100%}
.row{display:flex;align-items:baseline;gap:24px}
.row .n{font:400 60px/1 Anton;text-transform:uppercase;color:${P.bone};width:304px;flex:none}
.row .t{font:400 30px/1.3 Inter;color:rgba(239,230,214,.78)}
`;
const cMark = () => `<div class="mk">ALIGN ${star(16, 'rgba(239,230,214,.75)')}</div>`;
// bloom: {x,y,r} centre/radius of the halo · ph: the photo layer markup
const cBase = ({ ac, bloom, ph, ring = false, shade = true }) => {
  const halo = ring
    ? `<div class="ph screen" style="left:${bloom.x - bloom.r * 1.9}px;top:${bloom.y - bloom.r * 1.9}px;width:${bloom.r * 3.8}px;height:${bloom.r * 3.8}px;background:radial-gradient(circle at 50% 50%,transparent ${bloom.r * 0.97}px,color-mix(in srgb,${ac} 85%,transparent) ${bloom.r * 1.04}px,color-mix(in srgb,${ac} 32%,transparent) ${bloom.r * 1.3}px,transparent ${bloom.r * 1.9}px)"></div>`
    : `<div class="bloom" style="left:${bloom.x - bloom.r * 1.5}px;top:${bloom.y - bloom.r * 1.5}px;width:${bloom.r * 3}px;height:${bloom.r * 3}px;background:radial-gradient(circle at 50% 50%,${ac} 0%,color-mix(in srgb,${ac} 60%,transparent) 30%,color-mix(in srgb,${ac} 18%,transparent) 50%,transparent 68%);opacity:${bloom.o ?? 0.75}"></div>`;
  return ring ? `${ph}${halo}${shade ? '<div class="shade"></div>' : ''}<div class="grain"></div>${cMark()}`
    : `${halo}${ph}${shade ? '<div class="shade"></div>' : ''}<div class="grain"></div>${cMark()}`;
};
const disc = (name, x, y, d) =>
  `<div class="ph disc" style="left:${x - d / 2}px;top:${y - d / 2}px;width:${d}px;height:${d}px;background-image:url(${img(name)});background-size:${d}px"></div>`;
// The 2017 eclipse frame (measured): moon disc centre at (48.4%, 49.2%), radius 0.18 x image width.
const ECL_R = 0.18;
const eclipse = (cx, cy, wpx) => {
  const hpx = wpx * 1301 / 1920, ix = 0.484 * wpx, iy = 0.492 * hpx;
  return `<div class="ph" style="left:${cx - ix}px;top:${cy - iy}px;width:${wpx}px;height:${hpx}px;background-image:url(${img('eclipse-ring')});background-size:100% 100%;filter:brightness(1.5) contrast(1.4);-webkit-mask-image:radial-gradient(circle ${ECL_R * 2.3 * wpx}px at ${ix}px ${iy}px,#000 55%,transparent 100%)"></div>`;
};

const C = [
  () => page(`<div class="slide" style="--ac:${P.virgo}">
    ${cBase({ ac: P.virgo, bloom: { x: 600, y: 380, r: 430, o: 0.85 }, ph: disc('mars', 600, 380, 800) })}
    <div class="stack">
      <div class="eye">Sky news · Jan 9</div>
      <div class="fit" data-fit="950" data-maxh="580">${lines('MARS TURNS|#RETROGRADE#|IN VIRGO|TOMORROW')}</div>
    </div></div>`, C_CSS),
  () => page(`<div class="slide" style="--ac:${P.aquarius}">
    ${cBase({ ac: P.aquarius, ring: true, bloom: { x: 560, y: 380, r: ECL_R * 1500 }, ph: eclipse(560, 380, 1500) })}
    <div class="stack">
      <div class="eye">Sky news · Jan 30</div>
      <div class="fit" data-fit="950" data-maxh="580">${lines('THE #RING OF FIRE#|ECLIPSE IN|AQUARIUS IS|IN 7 DAYS')}</div>
    </div></div>`, C_CSS),
  () => page(`<div class="slide" style="--ac:${P.capricorn}">
    ${cBase({ ac: P.capricorn, bloom: { x: 540, y: 420, r: 420, o: 0.45 }, ph: `<div class="ph screen" style="left:-60px;top:-60px;width:1200px;height:1080px;background-image:url(${img('aura-capricorn')});background-size:1200px"></div>` })}
    <div class="stack">
      <div class="eye">Ranked · January</div>
      <div class="fit" data-fit="950" data-maxh="230">${lines('#NO.1# CAPRICORN')}</div>
      <div class="hook">The boring work you did in<br>December finally pays out</div>
      <div class="body" style="margin-top:22px">Mars slows everyone else down. You were already<br>moving at that speed, so you get noticed first.</div>
    </div></div>`, C_CSS),
  () => page(`<div class="slide" style="--ac:${P.aquarius}">
    ${cBase({ ac: P.aquarius, ring: true, bloom: { x: 560, y: 300, r: ECL_R * 1150 }, ph: eclipse(560, 300, 1150) })}
    <div class="stack">
      <div class="eye">Sky note · Claim check</div>
      <div class="fit" data-fit="950" data-maxh="360">${lines('“YOUR 300-YEAR|KARMIC DEBT IS ERASED|AT THE ECLIPSE”')}</div>
      <div class="fit" data-fit="440" style="margin-top:26px">${lines('#NOT TRUE#')}</div>
      <div class="body">Solar eclipses happen every year and none of them<br>wipe anything. It is a new moon: a good day to start.</div>
    </div></div>`, C_CSS),
  () => page(`<div class="slide" style="--ac:${P.virgo}">
    ${cBase({ ac: P.virgo, bloom: { x: 800, y: 250, r: 330, o: 0.85 }, ph: disc('mars', 800, 250, 600) })}
    <div class="stack">
      <div class="eye">Mars retrograde · Jan 9</div>
      <div class="fit" data-fit="950" data-maxh="270">${lines('WHO FEELS IT|#THE MOST#')}</div>
      <div class="rows">
        <div class="row"><div class="n">Virgo</div><div class="t">It’s in your sign. Set your own pace.</div></div>
        <div class="row"><div class="n">Gemini</div><div class="t">Home plans stall. Repair, don’t rebuild.</div></div>
        <div class="row"><div class="n">Sagittarius</div><div class="t">Career red tape. Resend, don’t quit.</div></div>
        <div class="row"><div class="n">Pisces</div><div class="t">Old arguments return. Listen first.</div></div>
      </div>
    </div></div>`, C_CSS),
];

const DIRS = { wire: A, observatory: B, aurawire: C };

// ---------- compare grid ----------
// Reference crops: [file, top of the post in the 1320x2868 phone shot].
const REF_COVERS = [
  ['7bdbf06e-image.png', 430], // TYO mercury
  ['a5a39a80-image.png', 430], // whisperwillow jupiter
  ['b8c80f08-image.png', 455], // jacked
  ['8b08070c-image.png', 336], // tastebud
  ['e34f3a75-image.png', 372], // technology
];
function compareHtml() {
  const TW = 360, TH = 450, G = 14, LAB = 190;
  const refUri = (f) => uri(path.join(REFS, f));
  const tile = (src, style = '') => `<div style="width:${TW}px;height:${TH}px;overflow:hidden;border-radius:6px;background:#111;${style}">${src}</div>`;
  const refTile = ([f, top]) => {
    const scale = TW / 1320; // full post width = phone width
    return tile(`<img src="${refUri(f)}" style="display:block;width:${TW}px;margin-top:${-top * scale}px">`);
  };
  const outTile = (dir, i) => tile(`<img src="${uri(path.join(OUT, dir, `0${i + 1}.jpg`))}" style="display:block;width:${TW}px;height:${TH}px">`);
  const row = (label, sub, tiles) => `<div style="display:flex;gap:${G}px;align-items:center"><div style="width:${LAB}px;flex:none;color:#efe6d6;font:600 26px/1.15 Inter">${label}<div style="font:400 17px/1.3 Inter;opacity:.6;margin-top:8px">${sub}</div></div>${tiles.join('')}</div>`;
  const rows = [
    row('References', 'TYO · whisperwillow · jacked · tastebud · technology', REF_COVERS.map(refTile)),
    row('A · Wire', 'photo top, divider + mark, Anton two-colour', [0, 1, 2, 3, 4].map((i) => outTile('wire', i))),
    row('B · Observatory', 'planet on black, serif caps, gold glow line', [0, 1, 2, 3, 4].map((i) => outTile('observatory', i))),
    row('C · Aura wire', 'screened photo + sign bloom, grain, one highlight', [0, 1, 2, 3, 4].map((i) => outTile('aurawire', i))),
  ];
  const w = LAB + 5 * TW + 6 * G + 60, h = 4 * TH + 3 * 22 + 60;
  return { w, h, html: `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}*{margin:0;box-sizing:border-box}body{background:#0b0b0d;width:${w}px;height:${h}px;padding:30px;display:flex;flex-direction:column;gap:22px}</style></head><body>${rows.join('')}</body></html>` };
}

// ---------- main ----------
async function launch() {
  try { return await chromium.launch(); } catch {
    return chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome' });
  }
}

const want = process.argv.slice(2);
const todo = want.length ? want : [...Object.keys(DIRS), 'compare'];
const browser = await launch();
const pg = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
for (const name of todo) {
  if (name === 'compare') continue;
  const slides = DIRS[name];
  if (!slides) throw new Error(`unknown direction ${name}`);
  fs.mkdirSync(path.join(OUT, name), { recursive: true });
  for (let i = 0; i < slides.length; i++) {
    await pg.setContent(slides[i](), { waitUntil: 'load' });
    await pg.evaluate(() => document.fonts.ready);
    await pg.evaluate(() => window.__fit());
    const fits = await pg.evaluate(() => [...document.querySelectorAll('[data-fit]')].map((e) => {
      const r = e.getBoundingClientRect(); return `${e.dataset.fs}px ${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.top)}`;
    }));
    const file = path.join(OUT, name, `0${i + 1}.jpg`);
    await pg.screenshot({ path: file, type: 'jpeg', quality: 92 });
    console.log(file, fits.join(' | '));
  }
}
if (todo.includes('compare')) {
  const { w, h, html } = compareHtml();
  await pg.setViewportSize({ width: w, height: h });
  await pg.setContent(html, { waitUntil: 'load' });
  await pg.evaluate(() => document.fonts.ready);
  const file = path.join(OUT, 'compare.jpg');
  await pg.screenshot({ path: file, type: 'jpeg', quality: 88 });
  console.log(file);
}
await browser.close();
