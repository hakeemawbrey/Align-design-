// One slide as a standalone 1080×1350 HTML document. Fonts and art are
// inlined so the page needs nothing but itself; render.mjs waits for
// window.__ready, which the fitting script sets once the type is sized.

import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { background, hashString, OVERLAY_CSS, OVERLAY_HTML, typeGround, W, H } from './backgrounds.mjs'
import { SIGN_COLORS } from './schema.mjs'

const require = createRequire(import.meta.url)

function fontUri(pkg, file) {
  const dir = path.dirname(require.resolve(`${pkg}/package.json`))
  const buf = readFileSync(path.join(dir, 'files', file))
  return `data:font/woff2;base64,${buf.toString('base64')}`
}

let fontCss
function fonts() {
  // Built lazily and once: ~50KB of base64 per face.
  fontCss ??= `
@font-face { font-family:'Poppins'; font-style:italic; font-weight:800; font-display:block;
  src:url(${fontUri('@fontsource/poppins', 'poppins-latin-800-italic.woff2')}) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
@font-face { font-family:'Poppins'; font-style:italic; font-weight:800; font-display:block;
  src:url(${fontUri('@fontsource/poppins', 'poppins-latin-ext-800-italic.woff2')}) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family:'Space Mono'; font-style:normal; font-weight:400; font-display:block;
  src:url(${fontUri('@fontsource/space-mono', 'space-mono-latin-400-normal.woff2')}) format('woff2'); }`
  return fontCss
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Size caps. The fitter grows type to the biggest size that fits, like the
// reference where a short line runs almost edge to edge; `size` lowers the cap.
const CAPS = { l: { one: 176, two: 136 }, m: { one: 132, two: 116 }, s: { one: 104, two: 96 } }
const AUTO = { one: 168, two: 128 }

// The four-point star in the mark, drawn rather than typed: Space Mono has no ✦.
const SPARK = `<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path fill="currentColor"
  d="M10 0c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10C5.4 9.4 9.4 5.4 10 0z"/></svg>`

// `style` is 'type' (text only, in the sign's colour) or 'photo' (text over
// the slide's bg). The carousel's own `style` field wins over the option.
export function slideHtml(carousel, index, { style = 'type' } = {}) {
  const slide = carousel.slides[index]
  const total = carousel.slides.length
  const seed = (hashString(carousel.id) + index * 7919) >>> 0
  const type = (carousel.style ?? style) === 'type'
  const sign = carousel.signs?.[0]
  const ink = type ? (SIGN_COLORS[sign] ?? SIGN_COLORS.pisces).color : '#fff7ec'
  const bg = type ? typeGround(sign) : background(slide.bg, { seed })
  const text = slide.text.toLowerCase()
  // Explicit \n become <br>; inside each line the browser balances the wrap.
  const body = text.split('\n').map((l) => esc(l.trim())).join('<br>')
  const forced = text.includes('\n') ? text.split('\n').length : 0
  const caps = CAPS[slide.size] ?? AUTO

  return `<!doctype html>
<html><head><meta charset="utf-8">
<style>
${fonts()}
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:${W}px; height:${H}px; overflow:hidden; background:#050208; }
.frame { position:relative; width:${W}px; height:${H}px; overflow:hidden; }
${bg.css}
${OVERLAY_CSS}
/* bottom 45%: keeps the type legible on bright art */
.shade { position:absolute; left:0; right:0; bottom:0; height:45%;
  background: linear-gradient(180deg, rgba(6,3,12,0) 0%, rgba(6,3,12,.38) 45%, rgba(6,3,12,.72) 100%); }
.text { position:absolute; left:64px; bottom:120px; width:952px;
  font-family:'Poppins', sans-serif; font-weight:800; font-style:italic;
  color:${ink}; letter-spacing:-0.02em; line-height:.98; text-transform:lowercase;
  text-wrap:balance; overflow-wrap:normal; hyphens:none;
  text-shadow: ${type ? `0 0 48px ${ink}40` : '0 2px 6px rgba(0,0,0,.25), 0 6px 40px rgba(0,0,0,.35)'}; }
.chrome { position:absolute; top:56px; font-family:'Space Mono', monospace; font-size:22px;
  letter-spacing:.24em; color:#fff7ec; opacity:.55; text-transform:lowercase; }
.mark { left:64px; display:flex; align-items:center; gap:10px; }
.mark svg { margin-top:-2px; }
.count { right:64px; letter-spacing:.12em; }
</style></head>
<body><div class="frame">
${bg.html}
${type ? '' : '<div class="shade"></div>'}
${OVERLAY_HTML}
<div class="chrome mark">align ${SPARK}</div>
<div class="chrome count">${index + 1}/${total}</div>
<div class="text" id="t" style="font-size:100px">${body}</div>
</div>
<script>
// Pick the biggest size that fits: one line if it can stay huge, else two,
// else three. Italic glyphs lean past their advance box, so leave slack.
(async () => {
  await document.fonts.ready
  const el = document.getElementById('t')
  const maxW = 952 - 14
  const set = (s) => { el.style.fontSize = s + 'px' }
  const lines = () => Math.round(el.getBoundingClientRect().height / (parseFloat(el.style.fontSize) * 0.98))
  const widest = () => {
    const r = document.createRange(); r.selectNodeContents(el)
    let w = 0
    for (const b of r.getClientRects()) w = Math.max(w, b.right - 64)
    return w
  }
  const fits = (n) => lines() <= n && widest() <= maxW
  // Largest size in [lo, hi] (2px steps) that fits in n lines, or 0.
  const best = (n, lo, hi) => {
    for (let s = hi; s >= lo; s -= 2) { set(s); if (fits(n)) return s }
    return 0
  }
  const forced = ${forced}
  let size
  if (forced) size = best(forced, 40, forced === 1 ? ${caps.one} : ${caps.two})
  else size = best(1, 112, ${caps.one}) || best(2, 80, ${caps.two}) || best(3, 40, Math.min(104, ${caps.two}))
  // Nothing fit in the line budget (one unbreakable long word): fit width alone.
  if (!size) for (size = 104; size > 24; size -= 2) { set(size); if (widest() <= maxW) break }
  set(size)
  window.__fit = { size, lines: lines(), width: Math.round(widest()) }
  window.__ready = true
})()
</script>
</body></html>`
}
