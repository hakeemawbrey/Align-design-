// One news slide as a standalone 1080×1350 HTML page, in Align's Stardust
// language: indigo surfaces, warm bone type, EB Garamond italic headlines,
// Space Mono eyebrows, sign colours for highlights, gold only as a ✦ accent.
//
// Headline markup: wrap words in *asterisks* to light them in the slide's
// accent (the slide's sign colour, else the carousel's, else gold). Use
// [[double brackets]] for a soft highlight bar instead.

import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { OVERLAY_CSS, OVERLAY_HTML, hashString } from '../../src/backgrounds.mjs'
import { SIGN_COLORS } from '../../src/schema.mjs'
import { art, colorOf } from './art.mjs'

export const W = 1080
export const H = 1350
const require = createRequire(import.meta.url)

function font(pkg, file) {
  const dir = path.dirname(require.resolve(`${pkg}/package.json`))
  return `data:font/woff2;base64,${readFileSync(path.join(dir, 'files', file)).toString('base64')}`
}
let FONTS
function fonts() {
  const face = (fam, style, weight, uri) => `@font-face{font-family:'${fam}';font-style:${style};font-weight:${weight};font-display:block;src:url(${uri}) format('woff2');}`
  FONTS ??= [
    face('EB Garamond', 'italic', 500, font('@fontsource/eb-garamond', 'eb-garamond-latin-500-italic.woff2')),
    face('EB Garamond', 'italic', 400, font('@fontsource/eb-garamond', 'eb-garamond-latin-400-italic.woff2')),
    face('EB Garamond', 'normal', 500, font('@fontsource/eb-garamond', 'eb-garamond-latin-500-normal.woff2')),
    face('Inter', 'normal', 400, font('@fontsource/inter', 'inter-latin-400-normal.woff2')),
    face('Inter', 'normal', 500, font('@fontsource/inter', 'inter-latin-500-normal.woff2')),
    face('Inter', 'italic', 600, font('@fontsource/inter', 'inter-latin-600-italic.woff2')),
    face('Space Mono', 'normal', 400, font('@fontsource/space-mono', 'space-mono-latin-400-normal.woff2')),
  ].join('\n')
  return FONTS
}

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// *word* → accent, [[words]] → highlight bar, \n → line break.
const rich = (s) => esc(s)
  .replace(/\[\[(.+?)\]\]/g, '<mark>$1</mark>')
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/\n/g, '<br>')

const SPARK = (c = '#f2c75c', s = 18) => `<svg viewBox="0 0 20 20" width="${s}" height="${s}" aria-hidden="true"><path fill="${c}" d="M10 0c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10C5.4 9.4 9.4 5.4 10 0z"/></svg>`

const VERDICT = { true: ['true', '#7fd8b0'], misleading: ['half true', '#f2c75c'], false: ['not true', '#e8628a'], context: ['needs context', '#9a7be0'] }

const accentOf = (slide, c) => colorOf(slide.accent ?? slide.sign ?? c.accent ?? c.signs?.[0] ?? 'gold', '#f2c75c')

// ---- layouts --------------------------------------------------------------
// Each returns inner HTML; boxes with class "fit" shrink to their max height.

function eyebrowRule(text, accent) {
  return `<div class="rule"><span class="ln"></span>${SPARK('#f2c75c', 20)}<span>${esc(text)}</span>${SPARK('#f2c75c', 20)}<span class="ln"></span></div>`
}

const LAYOUTS = {
  // Big cover: art on top fading into the sky, rule eyebrow, huge headline.
  cover(s, c, ctx) {
    return `
    <div class="art cover-art">${ctx.art.html}<div class="fade"></div></div>
    <div class="cover-text">
      ${eyebrowRule(s.kicker ?? c.eyebrow ?? 'sky news', ctx.accent)}
      <h1 class="fit head center" data-max="${s.dek ? 330 : 400}" data-big="150" data-small="64">${rich(s.headline)}</h1>
      ${s.dek ? `<p class="dek center">${rich(s.dek)}</p>` : ''}
      ${s.swipe === false ? '' : `<div class="swipe">${esc(s.swipe ?? 'swipe')} <span>→</span></div>`}
    </div>`
  },

  // One story: framed art card on top, kicker, headline, body.
  story(s, c, ctx) {
    return `
    <div class="art frame-art">${ctx.art.html}${s.tag ? `<div class="tag">${esc(s.tag)}</div>` : ''}</div>
    ${s.inset ? `<div class="art inset-art">${ctx.art2.html}</div>` : ''}
    <div class="story-text">
      ${s.kicker ? `<div class="kicker"><i style="background:${ctx.accent}"></i>${esc(s.kicker)}</div>` : ''}
      <h2 class="fit head" data-max="${s.body ? 250 : 380}" data-big="104" data-small="54">${rich(s.headline)}</h2>
      ${s.body ? `<p class="fit body" data-max="${s.headline ? 190 : 400}" data-big="36" data-small="26">${rich(s.body)}</p>` : ''}
    </div>`
  },

  // Ranked sign: a raised card with a big gilt number.
  rank(s, c, ctx) {
    const sc = SIGN_COLORS[s.sign]?.color ?? ctx.accent
    return `
    <div class="card rank">
      <div class="art rank-art">${ctx.art.html}<div class="rank-fade"></div></div>
      <div class="num">#${esc(s.rank)}</div>
      <div class="rank-body">
        <div class="sign-name" style="color:${sc}">${esc(s.title ?? s.sign)}</div>
        ${s.dates ? `<div class="kicker small">${esc(s.dates)}</div>` : ''}
        <p class="fit hook" data-max="190" data-big="54" data-small="32">${rich(s.headline)}</p>
        <p class="fit body" data-max="360" data-big="40" data-small="25">${rich(s.body)}</p>
      </div>
    </div>`
  },

  // Full-bleed sign art, one statement in the middle.
  callout(s, c, ctx) {
    return `
    <div class="art full-art">${ctx.art.html}<div class="shade-mid"></div></div>
    <div class="callout-text">
      ${s.kicker ? `<div class="kicker center"><span class="pill">${esc(s.kicker)}</span></div>` : ''}
      <h1 class="fit head center" data-max="520" data-big="140" data-small="62">${rich(s.headline)}</h1>
      ${s.body ? `<p class="dek center">${rich(s.body)}</p>` : ''}
    </div>`
  },

  // The viral claim, then Align's sky note under it.
  note(s, c, ctx) {
    const [label, vc] = VERDICT[s.verdict] ?? VERDICT.context
    return `
    <div class="note-wrap">
      <div class="kicker">${esc(s.kicker ?? 'going around')}</div>
      <h2 class="fit head claim" data-max="420" data-big="92" data-small="50">${rich(s.headline)}</h2>
      <div class="note">
        <div class="note-top">
          <div class="note-title">${SPARK('#f2c75c', 22)} sky note</div>
          <div class="verdict" style="color:${vc};border-color:${vc}"><i style="background:${vc}"></i>${label}</div>
        </div>
        <div class="note-by">written by align, checked against the ephemeris</div>
        <p class="fit body bone" data-max="380" data-big="36" data-small="26">${rich(s.body)}</p>
      </div>
    </div>`
  },

  // Rows: a calendar of dates, or a list of signs. rows: [{ label, text, sign?, color? }]
  list(s, c, ctx) {
    const rows = (s.rows ?? []).map((r) => {
      const col = colorOf(r.color ?? r.sign ?? null, ctx.accent)
      return `<div class="row"><div class="row-l">${r.sign ? `<i class="orb" style="--c:${col}"></i>` : `<i class="dot" style="background:${col}"></i>`}<span>${esc(r.label)}</span></div><div class="row-t">${rich(r.text)}</div></div>`
    }).join('')
    return `
    <div class="list-wrap">
      ${s.kicker ? `<div class="kicker"><i style="background:${ctx.accent}"></i>${esc(s.kicker)}</div>` : ''}
      ${s.headline ? `<h2 class="fit head" data-max="230" data-big="92" data-small="52">${rich(s.headline)}</h2>` : ''}
      <div class="rows fit-rows">${rows}</div>
    </div>`
  },


  // Planet hero: one huge body on black, headline under it, divider wordmark.
  hero(s, c, ctx) {
    return `
    <div class="art hero-art">${ctx.art.html}<div class="hero-fade"></div></div>
    <div class="hero-text">
      ${s.kicker ? `<div class="kicker center">${esc(s.kicker)}</div>` : ''}
      <h1 class="fit head center" data-max="${s.dek ? 300 : 360}" data-big="128" data-small="60">${rich(s.headline)}</h1>
      <div class="divider"><span class="ln"></span><span class="dmark">align ${SPARK('#f2c75c', 16)}</span><span class="ln"></span></div>
      ${s.dek ? `<p class="dek center">${rich(s.dek)}</p>` : ''}
    </div>`
  },

  // Breaking: a giant outlined word behind the art, headline below.
  breaking(s, c, ctx) {
    return `
    <div class="giant" style="font-size:${Math.min(330, Math.round(2050 / (s.word ?? 'breaking').length))}px">${esc(s.word ?? 'breaking')}</div>
    <div class="art breaking-art">${ctx.art.html}</div>
    <div class="cover-text">
      ${eyebrowRule(s.kicker ?? 'sky news', ctx.accent)}
      <h1 class="fit head center" data-max="${s.dek ? 300 : 360}" data-big="128" data-small="60">${rich(s.headline)}</h1>
      ${s.dek ? `<p class="dek center">${rich(s.dek)}</p>` : ''}
    </div>`
  },

  // Split: two arts side by side (two signs, two planets), a raised panel with the headline.
  split(s, c, ctx) {
    return `
    <div class="art split-l">${ctx.art.html}${s.labels?.[0] ? `<div class="tag">${esc(s.labels[0])}</div>` : ''}</div>
    <div class="art split-r">${ctx.art2.html}${s.labels?.[1] ? `<div class="tag tag-r">${esc(s.labels[1])}</div>` : ''}</div>
    <div class="split-badge">${SPARK('#3a2c4e', 44)}</div>
    <div class="split-panel">
      ${s.kicker ? `<div class="kicker center">${esc(s.kicker)}</div>` : ''}
      <h1 class="fit head center" data-max="300" data-big="110" data-small="56">${rich(s.headline)}</h1>
      ${s.swipe === false ? '' : `<div class="swipe">${esc(s.swipe ?? 'swipe')} <span>→</span></div>`}
    </div>`
  },

  // Table: a ranked list with a value column. rows: [{ rank?, label, sign?, color?, text?, value? }]
  table(s, c, ctx) {
    const rows = (s.rows ?? []).map((r, k) => {
      const col = colorOf(r.color ?? r.sign ?? null, ctx.accent)
      return `<div class="trow"><div class="trank" style="background:${col}">${esc(r.rank ?? k + 1)}</div>
        <div class="tname"><b>${esc(r.label)}</b>${r.text ? `<span>${rich(r.text)}</span>` : ''}</div>
        <div class="tval" style="color:${col}">${esc(r.value ?? '')}</div></div>`
    }).join('')
    return `
    <div class="list-wrap">
      ${s.kicker ? `<div class="kicker"><i style="background:${ctx.accent}"></i>${esc(s.kicker)}</div>` : ''}
      ${s.headline ? `<h2 class="fit head" data-max="230" data-big="88" data-small="50">${rich(s.headline)}</h2>` : ''}
      ${s.columns ? `<div class="thead"><span>${esc(s.columns[0] ?? '')}</span><span>${esc(s.columns[1] ?? '')}</span></div>` : ''}
      <div class="rows fit-rows table">${rows}</div>
    </div>`
  },

  // Closing slide: small art, a line, the save/share prompt.
  end(s, c, ctx) {
    return `
    <div class="art end-art">${ctx.art.html}</div>
    <div class="end-text">
      <h2 class="fit head center" data-max="360" data-big="96" data-small="52">${rich(s.headline)}</h2>
      ${s.body ? `<p class="dek center">${rich(s.body)}</p>` : ''}
      <div class="end-mark">align ${SPARK('#f2c75c', 22)}</div>
    </div>`
  },
}
export const LAYOUT_NAMES = Object.keys(LAYOUTS)

// Art box size per layout, so the drawn art is laid out for its frame.
const ART_BOX = {
  cover: [W, 800], story: [952, 620], rank: [984, 470], callout: [W, H], note: [0, 0], list: [0, 0], end: [W, 620],
  hero: [W, 860], breaking: [W, 820], split: [W / 2, 760], table: [0, 0],
}

export function slideHtml(c, i) {
  const s = c.slides[i]
  const total = c.slides.length
  const layout = LAYOUTS[s.layout] ? s.layout : 'story'
  const accent = accentOf(s, c)
  const [aw, ah] = ART_BOX[layout]
  const a = aw ? art(s.art ?? defaultArt(s, c), aw, ah, (hashString(c.id) + i * 7919) >>> 0) : { css: '', html: '' }
  const glow = colorOf(s.sign ?? c.signs?.[0] ?? 'violet')
  const second = s.art2 ?? s.inset
  const a2 = second ? art(second, layout === 'split' ? W / 2 : 300, layout === 'split' ? 760 : 300, (hashString(c.id) + i * 31) >>> 0, '2') : { css: '', html: '' }
  const inner = LAYOUTS[layout](s, c, { accent, art: a, art2: a2 })

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0b0620}
.frame{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#efe6d6;
  background:
    radial-gradient(ellipse 90% 40% at 50% 104%, ${glow}33, transparent 70%),
    linear-gradient(180deg,#0b0620 0%,#140a2e 55%,#1a0f38 100%);}
${OVERLAY_CSS}
.vignette{background:radial-gradient(ellipse 85% 75% at 50% 46%, transparent 60%, rgba(5,2,15,.45) 100%)}
.grain{opacity:.32}
/* chrome */
.top{position:absolute;top:52px;left:64px;right:64px;display:flex;justify-content:space-between;align-items:center;z-index:5}
.mark{font:400 22px 'Space Mono',monospace;letter-spacing:.24em;color:#efe6d6;opacity:.7;display:flex;gap:10px;align-items:center;text-transform:lowercase}
.mark b{font-weight:400;color:#b3a6c4}
.count{font:400 20px 'Space Mono',monospace;letter-spacing:.12em;color:#efe6d6;padding:10px 18px;border-radius:999px;
  background:rgba(52,35,95,.6);border:1px solid rgba(179,166,196,.22)}
/* type */
.head{font-family:'EB Garamond',Georgia,serif;font-style:italic;font-weight:500;line-height:1.02;letter-spacing:-.015em;color:#efe6d6;text-wrap:balance}
.head em,.hook em,.body em,.dek em,.row-t em{font-style:inherit;color:${accent};text-shadow:0 0 36px ${accent}55}
.head mark,.hook mark,.body mark{color:#efe6d6;background:linear-gradient(transparent 12%, ${accent}55 12%, ${accent}55 92%, transparent 92%);padding:0 .12em;border-radius:6px;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.center{text-align:center}
.dek{font:500 32px/1.35 'Inter',sans-serif;color:#b3a6c4;margin-top:22px}
.body{font:400 34px/1.42 'Inter',sans-serif;color:#b3a6c4;margin-top:22px}
.body.bone{color:#efe6d6}
.kicker{font:400 22px 'Space Mono',monospace;letter-spacing:.22em;text-transform:uppercase;color:#b3a6c4;display:flex;align-items:center;gap:14px;margin-bottom:22px}
.kicker.center{justify-content:center}
.kicker i{width:14px;height:14px;border-radius:50%;box-shadow:0 0 14px currentColor}
.kicker.small{font-size:20px;margin:22px 0 22px}
.rule{display:flex;align-items:center;justify-content:center;gap:16px;font:400 22px 'Space Mono',monospace;letter-spacing:.24em;text-transform:uppercase;color:#b3a6c4;margin-bottom:26px}
.rule .ln{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(179,166,196,.45))}
.rule .ln:last-child{background:linear-gradient(270deg,transparent,rgba(179,166,196,.45))}
.art{position:absolute;overflow:hidden}
${a.css}
${a2.css}
/* cover */
.cover-art{left:0;top:0;width:${W}px;height:800px}
.cover-art .fade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,6,32,.0) 45%,rgba(16,8,40,.85) 85%,#140a2e 100%)}
.cover-text{position:absolute;left:64px;right:64px;bottom:96px}
.swipe{margin-top:30px;text-align:center;font:400 20px 'Space Mono',monospace;letter-spacing:.24em;text-transform:uppercase;color:#7d6f94}
.swipe span{color:#f2c75c}
/* story */
.frame-art{left:64px;top:130px;width:952px;height:620px;border-radius:36px;border:1px solid rgba(179,166,196,.22);box-shadow:0 30px 80px rgba(5,2,15,.6)}
.tag{position:absolute;left:24px;top:24px;font:400 18px 'Space Mono',monospace;letter-spacing:.2em;text-transform:uppercase;color:#efe6d6;padding:9px 16px;border-radius:999px;background:rgba(20,10,46,.7);border:1px solid rgba(179,166,196,.25)}
.story-text{position:absolute;left:64px;right:64px;top:800px;bottom:80px}
/* rank */
.card{position:absolute;left:48px;right:48px;top:128px;bottom:72px;border-radius:44px;padding:56px 60px;
  background:linear-gradient(170deg,rgba(40,26,78,.92),rgba(20,10,46,.96));border:1px solid rgba(179,166,196,.2);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 40px 90px rgba(5,2,15,.55)}
.card.rank{padding:0;overflow:hidden}
.rank-art{left:0;top:0;width:984px;height:470px}
.rank-fade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,10,46,0) 35%,rgba(26,15,58,.9) 88%,#1c1040 100%)}
.rank .num{position:absolute;left:56px;top:300px}
.rank-body{position:absolute;left:60px;right:60px;top:500px;bottom:56px;display:flex;flex-direction:column;justify-content:center}
.num{font:italic 500 210px/0.9 'EB Garamond',serif;letter-spacing:-.03em;
  background:linear-gradient(90deg,#a9802e 0%,#f2c75c 22%,#fff4cf 44%,#f2c75c 62%,#b88a2c 82%,#f2d784 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.sign-name{font:italic 500 112px/1 'EB Garamond',serif;letter-spacing:-.01em}
.hook{font:italic 600 44px/1.25 'Inter',sans-serif;color:#efe6d6;letter-spacing:-.01em}
/* callout */
.full-art{inset:0}
.shade-mid{position:absolute;inset:0;background:radial-gradient(ellipse 90% 45% at 50% 62%, rgba(11,6,32,.82), rgba(11,6,32,.35) 70%, rgba(11,6,32,.15))}
.callout-text{position:absolute;left:72px;right:72px;bottom:150px}
/* note */
.note-wrap{position:absolute;left:64px;right:64px;top:150px;bottom:80px;display:flex;flex-direction:column;justify-content:center}
.claim{color:#efe6d6}
.note{margin-top:56px;border-radius:36px;padding:40px 44px;background:rgba(52,35,95,.55);border:1px solid rgba(179,166,196,.25);box-shadow:inset 0 1px 0 rgba(255,255,255,.07)}
.note-top{display:flex;justify-content:space-between;align-items:center}
.note-title{font:italic 500 46px 'EB Garamond',serif;display:flex;gap:14px;align-items:center}
.verdict{font:400 20px 'Space Mono',monospace;letter-spacing:.18em;text-transform:uppercase;border:1.5px solid;border-radius:999px;padding:10px 18px;display:flex;gap:10px;align-items:center}
.verdict i{width:12px;height:12px;border-radius:50%}
.note-by{font:400 26px 'Inter',sans-serif;color:#7d6f94;margin-top:6px}
/* list */
.list-wrap{position:absolute;left:64px;right:64px;top:150px;bottom:80px;display:flex;flex-direction:column;justify-content:center}
.rows{margin-top:30px;display:flex;flex-direction:column}
.row{display:grid;grid-template-columns:270px 1fr;gap:24px;align-items:baseline;padding:30px 0;border-top:1px solid rgba(179,166,196,.16)}
.row:last-child{border-bottom:1px solid rgba(179,166,196,.16)}
.row-l{display:flex;gap:14px;align-items:center;font:400 22px 'Space Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#efe6d6}
.row-l .dot{width:12px;height:12px;border-radius:50%;flex:none}
.row-l .orb{width:26px;height:26px;border-radius:50%;flex:none;
  background:radial-gradient(circle at 35% 30%,#fff 0,color-mix(in srgb,var(--c) 55%,#fff) 18%,var(--c) 55%,color-mix(in srgb,var(--c) 40%,#000) 100%);box-shadow:0 0 16px var(--c)}
.row-t{font:400 36px/1.32 'Inter',sans-serif;color:#b3a6c4}
.row-t b{font-weight:500;color:#efe6d6}

/* hero */
.frame.hero-bg{background:#05030f}
.hero-art{left:0;top:40px;width:${W}px;height:860px;background:radial-gradient(ellipse 70% 60% at 50% 50%, #120a2a 0%, #05030f 80%) !important}
.hero-fade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,3,15,0) 75%,#07041a 100%)}
.hero-text{position:absolute;left:64px;right:64px;bottom:90px}
.divider{display:flex;align-items:center;gap:18px;margin-top:30px}
.divider .ln{flex:1;height:2px;background:linear-gradient(90deg,transparent,#f2c75c 50%,transparent)}
.dmark{font:400 20px 'Space Mono',monospace;letter-spacing:.3em;color:#efe6d6;opacity:.8;display:flex;gap:8px;align-items:center}
/* breaking */
.giant{position:absolute;left:-20px;right:-20px;top:96px;text-align:center;font:italic 500 330px/1 'EB Garamond',serif;letter-spacing:-.04em;
  color:transparent;-webkit-text-stroke:3px rgba(239,230,214,.55);background:linear-gradient(180deg,rgba(239,230,214,.42),rgba(239,230,214,.05));-webkit-background-clip:text;background-clip:text;white-space:nowrap;z-index:2;mix-blend-mode:screen}
.breaking-art{left:0;top:110px;width:${W}px;height:820px;background:transparent !important}
.breaking-art .scene svg > rect:first-of-type{opacity:.6}
/* split */
.split-l,.split-r{top:0;width:${W / 2}px;height:760px}
.split-l{left:0}.split-r{left:${W / 2}px;border-left:2px solid rgba(11,6,32,.9)}
.split-l .tag,.split-r .tag{top:130px}
.tag-r{left:auto;right:24px}
.split-badge{position:absolute;left:${W / 2 - 52}px;top:708px;width:104px;height:104px;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:3;
  background:linear-gradient(100deg,#f8edff 0%,#fff7ec 38%,#eaf4ff 72%,#ffeff7 100%);box-shadow:0 0 40px rgba(248,237,255,.4)}
.split-panel{position:absolute;left:0;right:0;top:760px;bottom:0;padding:90px 72px 70px;background:linear-gradient(180deg,#281a4e,#140a2e);border-top:1px solid rgba(179,166,196,.25)}
/* table */
.thead{display:flex;justify-content:space-between;font:400 18px 'Space Mono',monospace;letter-spacing:.2em;text-transform:uppercase;color:#7d6f94;margin:26px 0 -10px;padding-left:96px}
.trow{display:grid;grid-template-columns:72px 1fr auto;gap:24px;align-items:center;padding:22px 0;border-top:1px solid rgba(179,166,196,.16)}
.trow:last-child{border-bottom:1px solid rgba(179,166,196,.16)}
.trank{width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;font:italic 500 44px 'EB Garamond',serif;color:#0b0620}
.tname b{display:block;font:italic 500 46px/1.05 'EB Garamond',serif;color:#efe6d6}
.tname span{display:block;font:400 26px/1.3 'Inter',sans-serif;color:#b3a6c4;margin-top:4px}
.tval{font:400 26px 'Space Mono',monospace;letter-spacing:.1em;text-transform:uppercase;text-align:right}
/* story inset */
.inset-art{left:${W - 64 - 300 + 30}px;top:${130 + 620 - 300 + 40}px;width:300px;height:300px;border-radius:50%;border:4px solid #efe6d6;box-shadow:0 20px 60px rgba(5,2,15,.7);z-index:2}
.pill{padding:10px 20px;border-radius:999px;background:rgba(11,6,32,.72);border:1px solid rgba(179,166,196,.28);color:#efe6d6}
/* end */
.end-art{left:0;top:110px;width:${W}px;height:620px}
.end-text{position:absolute;left:72px;right:72px;bottom:110px}
.end-mark{margin-top:42px;display:flex;justify-content:center;gap:12px;align-items:center;font:400 26px 'Space Mono',monospace;letter-spacing:.28em;color:#efe6d6;opacity:.8}
</style></head><body><div class="frame${layout === 'hero' || layout === 'breaking' ? ' hero-bg' : ''}">
${inner}
${OVERLAY_HTML}
<div class="top"><div class="mark">align ${SPARK('#f2c75c', 18)} <b>${esc(c.series ?? 'sky news')}</b></div>${total > 1 ? `<div class="count">${i + 1}/${total}</div>` : ''}</div>
</div>
<script>
(async () => {
  await document.fonts.ready
  // Each .fit grows to the biggest size (data-big) that fits data-max px tall
  // and its own width, down to data-small.
  for (const el of document.querySelectorAll('.fit')) {
    const max = +el.dataset.max, big = +el.dataset.big, small = +el.dataset.small
    let s = big
    for (; s > small; s -= 2) {
      el.style.fontSize = s + 'px'
      if (el.scrollHeight <= max && el.scrollWidth <= el.clientWidth + 2) break
    }
    el.style.fontSize = s + 'px'
  }
  // Lists: shrink rows until they fit above the bottom margin.
  const rows = document.querySelector('.fit-rows')
  if (rows && rows.children.length <= 4 && !rows.classList.contains('table')) {
    rows.querySelectorAll('.row-t').forEach((r) => (r.style.fontSize = '42px'))
    rows.querySelectorAll('.row').forEach((r) => (r.style.padding = '44px 0'))
    rows.querySelectorAll('.row-l').forEach((r) => (r.style.fontSize = '26px'))
  }
  if (rows) {
    const wrap = rows.parentElement
    let f = parseFloat(rows.querySelector('.row-t')?.style.fontSize) || 36, pad = parseFloat(rows.querySelector('.row')?.style.paddingTop) || 30
    const over = () => rows.getBoundingClientRect().bottom > wrap.getBoundingClientRect().bottom
    while (over() && f > 22) {
      f -= 1; pad = Math.max(10, pad - 1)
      rows.querySelectorAll('.row-t').forEach((r) => (r.style.fontSize = f + 'px'))
      rows.querySelectorAll('.row').forEach((r) => (r.style.padding = pad + 'px 0'))
    }
  }
  // Report overflow so the renderer can flag it.
  const frame = document.querySelector('.frame').getBoundingClientRect()
  const bad = [...document.querySelectorAll('.head,.body,.hook,.dek,.row')].filter((e) => {
    const r = e.getBoundingClientRect(); return r.bottom > frame.bottom - 40 || e.scrollHeight > e.clientHeight + 4 && e.classList.contains('fit') && +getComputedStyle(e).fontSize.replace('px','') <= +e.dataset.small
  }).map((e) => e.className)
  window.__overflow = bad
  window.__ready = true
})()
</script></body></html>`
}

// Art when a slide doesn't name any: the sign's figure, else a starfield.
function defaultArt(s, c) {
  const sign = s.sign ?? c.signs?.[0]
  if (s.layout === 'rank') return { kind: 'figure', sign: s.sign, focus: '50% 35%' }
  if (sign && (s.layout === 'callout' || s.layout === 'cover')) return { kind: 'figure', sign }
  return { kind: 'stars', tint: sign ?? 'violet' }
}
