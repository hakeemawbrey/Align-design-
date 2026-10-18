// Background layers for a slide. Each kind returns { css, html } that the
// template drops behind the text. Everything is self-contained (images are
// inlined as data URIs) so a page renders identically with no network/file
// access.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { SIGN_COLORS, TINTS } from './schema.mjs'

export const W = 1080
export const H = 1350

const IMG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../app/public/img')

// Source art is ~640px, so inlining is cheap; cache because a carousel tends
// to hold one image for several slides.
const imgCache = new Map()
export function imageDataUri(rel) {
  if (!imgCache.has(rel)) {
    const buf = readFileSync(path.join(IMG_ROOT, rel))
    imgCache.set(rel, `data:image/jpeg;base64,${buf.toString('base64')}`)
  }
  return imgCache.get(rel)
}

export function tintHex(t, fallback = 'violet') {
  const v = t ?? fallback
  return TINTS[v] ?? (/^#[0-9a-f]{6}$/i.test(v) ? v : TINTS[fallback])
}

function rgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const rgba = (hex, a) => `rgba(${rgb(hex).join(',')},${a})`

// Mix toward white; neon cores burn hotter than the tint itself.
function lighten(hex, k) {
  const c = rgb(hex).map((v) => Math.round(v + (255 - v) * k))
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

// Small deterministic PRNG (mulberry32) so stars are stable across runs.
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hashString(s) {
  let h = 2166136261
  for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return h >>> 0
}

const svgUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

// Film grain: fractal noise tile, desaturated, blended over everything.
const GRAIN = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360">
  <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/></filter>
  <rect width="100%" height="100%" filter="url(#n)"/></svg>`)

/** Shared overlay layers: grain and vignette sit above every background. */
export const OVERLAY_CSS = `
.grain { position:absolute; inset:-2px; background-image:url("${GRAIN}"); background-size:360px 360px;
  mix-blend-mode:overlay; opacity:.42; pointer-events:none; }
.vignette { position:absolute; inset:0; pointer-events:none;
  background: radial-gradient(ellipse 78% 70% at 50% 46%, transparent 55%, rgba(0,0,0,.5) 100%); }
`
export const OVERLAY_HTML = `<div class="vignette"></div><div class="grain"></div>`

// zoom/focus reframe any kind the same way: scale around the focus point.
function frame(bg) {
  const focus = bg.focus ?? '50% 50%'
  const zoom = bg.zoom ?? 1
  return { focus, zoom, transform: `transform:scale(${zoom}); transform-origin:${focus};` }
}

// `crop` is a built-in extra zoom: the aura art has a hard black border and an
// inner frame. `soften` blurs what's left of that frame into the glow.
function photo(bg, rel, crop = 1, soften = 0.6) {
  const { focus, zoom } = frame(bg)
  const transform = `transform:scale(${(zoom * crop).toFixed(3)}); transform-origin:${focus};`
  return {
    css: `
.bg-photo { position:absolute; inset:0; overflow:hidden; background:#07040b; }
.bg-photo img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
  object-position:${focus}; ${transform}
  /* upscaled from ~640px: a hair of blur hides JPEG blocks, grain restores texture */
  filter: blur(${soften}px) saturate(1.08) contrast(1.06) brightness(.9); }`,
    html: `<div class="bg-photo"><img src="${imageDataUri(rel)}" alt=""></div>`,
  }
}

function veil(bg) {
  const { focus, zoom } = frame(bg)
  // Extra scale so the blur's soft edges never show at the frame border.
  const s = (zoom * 1.18).toFixed(3)
  return {
    css: `
.bg-veil { position:absolute; inset:0; overflow:hidden; background:#120a26; }
.bg-veil img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${focus};
  transform:scale(${s}); transform-origin:${focus};
  filter: blur(42px) saturate(.55) brightness(.82) contrast(1.1); }
/* indigo wash: colour blend keeps the shape of the light but kills skin tones */
.bg-veil .tint { position:absolute; inset:0; background:linear-gradient(170deg, #5b3fb0 0%, #34206e 55%, #160b33 100%);
  mix-blend-mode:color; opacity:.78; }
.bg-veil .tint2 { position:absolute; inset:0; mix-blend-mode:soft-light;
  background: radial-gradient(ellipse 70% 55% at 50% 38%, rgba(190,160,255,.55), rgba(20,10,50,.6) 75%); }
/* frosted-card sheen, so it reads as a covered card rather than a bad photo */
.bg-veil .sheen { position:absolute; inset:0;
  background: linear-gradient(118deg, rgba(255,255,255,0) 30%, rgba(220,200,255,.10) 45%, rgba(255,255,255,0) 60%); }`,
    html: `<div class="bg-veil"><img src="${imageDataUri(`people/p${bg.person}.jpg`)}" alt="">
  <div class="tint"></div><div class="tint2"></div><div class="sheen"></div></div>`,
  }
}

// Moon phase: 0 new, .25 first quarter, .5 full, .75 last quarter, 1 new.
// The lit shape is a half-disc plus a half-ellipse terminator.
function moonPath(cx, cy, r, p) {
  const k = Math.cos(2 * Math.PI * p)
  const rx = Math.max(0.001, r * Math.abs(k))
  const top = `${cx} ${cy - r}`
  const bot = `${cx} ${cy + r}`
  if (p <= 0.5) {
    return `M${top} A${r} ${r} 0 0 1 ${bot} A${rx} ${r} 0 0 ${k > 0 ? 0 : 1} ${top}Z`
  }
  return `M${top} A${r} ${r} 0 0 0 ${bot} A${rx} ${r} 0 0 ${k > 0 ? 1 : 0} ${top}Z`
}

function moonSvg(phase, cx, cy, r) {
  const lit = (1 - Math.cos(2 * Math.PI * phase)) / 2 // illuminated fraction
  if (lit < 0.02) {
    // New moon: just a faint earthshine disc so the param still shows.
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1b1436" opacity=".7"/>`
  }
  const halo = 0.25 + 0.75 * lit
  return `
  <defs>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#fff2dc" stop-opacity="${0.55 * halo}"/>
      <stop offset=".18" stop-color="#e8d8ff" stop-opacity="${0.22 * halo}"/>
      <stop offset=".45" stop-color="#9a7be0" stop-opacity="${0.08 * halo}"/>
      <stop offset="1" stop-color="#9a7be0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="face" cx="42%" cy="38%" r="70%">
      <stop offset="0" stop-color="#fffaf0"/><stop offset=".7" stop-color="#f1e6d2"/><stop offset="1" stop-color="#cdbfae"/>
    </radialGradient>
    <filter id="edge" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="1.6"/></filter>
    <filter id="lampGlow" x="-100%" y="-200%" width="300%" height="500%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
    <clipPath id="lit"><path d="${moonPath(cx, cy, r, phase)}"/></clipPath>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${r * 7}" fill="url(#halo)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#231b45" opacity=".55"/>
  <path d="${moonPath(cx, cy, r, phase)}" fill="#fff4e0" opacity=".55" filter="url(#bloom)"/>
  <g clip-path="url(#lit)" filter="url(#soft)">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#face)"/>
    <g fill="#b9a99a" opacity=".32">
      <ellipse cx="${cx - r * 0.28}" cy="${cy - r * 0.22}" rx="${r * 0.3}" ry="${r * 0.22}"/>
      <ellipse cx="${cx + r * 0.18}" cy="${cy - r * 0.05}" rx="${r * 0.2}" ry="${r * 0.26}"/>
      <ellipse cx="${cx - r * 0.05}" cy="${cy + r * 0.38}" rx="${r * 0.24}" ry="${r * 0.14}"/>
      <ellipse cx="${cx + r * 0.42}" cy="${cy + r * 0.3}" rx="${r * 0.12}" ry="${r * 0.1}"/>
    </g>
  </g>`
}

function sky(bg, seed) {
  const tint = tintHex(bg.tint, 'violet')
  const rand = rng(seed)
  const { transform } = frame(bg)

  // Stars: mostly dust, a few bright ones with a soft bloom. Fewer near the
  // horizon where the glow would wash them out anyway.
  let dust = ''
  let bright = ''
  for (let i = 0; i < 420; i++) {
    const x = rand() * W
    const y = Math.pow(rand(), 1.35) * H * 0.82
    const m = Math.pow(rand(), 4)
    const r = 0.45 + m * 1.9
    const warm = rand()
    const col = warm < 0.15 ? '#ffe2c4' : warm < 0.32 ? '#d6ccff' : '#fbf7ff'
    const a = (0.25 + rand() * 0.6) * (1 - (y / H) * 0.6)
    dust += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${col}" opacity="${a.toFixed(2)}"/>`
    if (m > 0.62) bright += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 2.6).toFixed(1)}" fill="${col}" opacity=".45"/>`
  }

  // A low, seeded ridge so the glow has something to sit behind.
  let ridge = `M0 ${H}`
  const base = H * 0.86
  const ph1 = rand() * 6
  const ph2 = rand() * 6
  for (let x = 0; x <= W; x += 20) {
    const y = base + Math.sin(x / 210 + ph1) * 26 + Math.sin(x / 77 + ph2) * 9
    ridge += ` L${x} ${y.toFixed(1)}`
  }
  ridge += ` L${W} ${H}Z`

  const moonX = 300 + rand() * 520
  const moonY = 190 + rand() * 170
  const moon = bg.moon === undefined ? '' : moonSvg(bg.moon, moonX, moonY, 78)

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="sb" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5"/></filter>
    <filter id="haze" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.009" numOctaves="4" seed="${seed % 997}"/>
      <feColorMatrix type="matrix" values="0 0 0 0 ${rgb(tint)[0] / 255}  0 0 0 0 ${rgb(tint)[1] / 255}  0 0 0 0 ${rgb(tint)[2] / 255}  0 0 0 1.4 -0.55"/>
    </filter>
    <linearGradient id="band" gradientTransform="rotate(${-28 + rand() * 20} .5 .5)">
      <stop offset=".2" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity="1"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
    <mask id="bandMask"><rect width="${W}" height="${H}" fill="url(#band)"/></mask>
  </defs>
  <rect width="${W}" height="${H}" filter="url(#haze)" mask="url(#bandMask)" opacity=".38"/>
  <g filter="url(#sb)">${bright}</g>
  ${dust}
  ${moon}
  <ellipse cx="${W * 0.5}" cy="${base}" rx="${W * 0.8}" ry="${H * 0.16}" fill="${tint}" opacity=".32" filter="url(#glow)"/>
  <path d="${ridge}" fill="#05030d"/>
</svg>`

  return {
    css: `
.bg-sky { position:absolute; inset:0; overflow:hidden;
  background:
    radial-gradient(ellipse 95% 38% at 50% 100%, ${rgba(tint, 0.55)}, ${rgba(tint, 0.12)} 55%, transparent 80%),
    radial-gradient(ellipse 60% 22% at 30% 92%, ${rgba(lighten(tint, 0.3), 0.25)}, transparent 70%),
    linear-gradient(180deg, #0b0620 0%, #120930 45%, #140a2e 70%, ${rgba(tint, 0.35)} 100%); }
.bg-sky .scene { position:absolute; inset:0; ${transform} }
.bg-sky svg { position:absolute; inset:0; width:100%; height:100%; }`,
    html: `<div class="bg-sky"><div class="scene">${svg}</div></div>`,
  }
}

// Bounce light: a second colour from across the room, like the reference's
// red lamp against a purple wall.
const BOUNCE = { violet: 'rub', rub: 'violet', ember: 'violet', gold: 'ember', tide: 'rub', spark: 'tide' }

function neon(bg) {
  const tint = tintHex(bg.tint, 'violet')
  const bounce = TINTS[BOUNCE[bg.tint]] ?? TINTS.rub
  const hot = lighten(tint, 0.5)
  const { transform } = frame(bg)
  const rand = rng(hashString(tint)) // per tint, not per slide, so held scenes stay put
  const gx = Math.round(W * (0.2 + rand() * 0.12))
  const gy = Math.round(H * (0.38 + rand() * 0.12))
  const lx = Math.round(W * 0.87)
  const ly = Math.round(H * 0.6)

  // The room: rough plaster lit by a point light (real diffuse lighting over
  // noise, so the falloff has texture instead of a flat CSS gradient), a
  // second lamp low on the right, and a ceiling plane receding top-right.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="wall" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.004 0.007" numOctaves="4" seed="7"/>
      <feGaussianBlur stdDeviation="2" result="bump"/>
      <feDiffuseLighting in="bump" surfaceScale="2.5" diffuseConstant="1.1" lighting-color="${hot}" result="key">
        <fePointLight x="${gx}" y="${gy}" z="200"/>
      </feDiffuseLighting>
      <feDiffuseLighting in="bump" surfaceScale="2.5" diffuseConstant="1" lighting-color="${bounce}" result="fill">
        <fePointLight x="${lx}" y="${ly}" z="120"/>
      </feDiffuseLighting>
      <feComposite in="key" in2="fill" operator="arithmetic" k2="1" k3=".55" result="lit"/>
      <!-- light falls off with distance: square the result to darken the far wall -->
      <feComponentTransfer in="lit"><feFuncR type="gamma" exponent="3.4"/><feFuncG type="gamma" exponent="3.4"/><feFuncB type="gamma" exponent="3.4"/></feComponentTransfer>
    </filter>
    <radialGradient id="key" cx="${gx}" cy="${gy}" r="${W * 0.75}" gradientUnits="userSpaceOnUse"
      gradientTransform="translate(${gx} ${gy}) rotate(-20) scale(1 1.35) translate(${-gx} ${-gy})">
      <stop offset="0" stop-color="${hot}" stop-opacity=".95"/>
      <stop offset=".12" stop-color="${tint}" stop-opacity=".7"/>
      <stop offset=".4" stop-color="${tint}" stop-opacity=".22"/>
      <stop offset="1" stop-color="${tint}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="spill" cx="${lx}" cy="${ly}" r="${W * 0.55}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${lighten(bounce, 0.2)}" stop-opacity=".85"/>
      <stop offset=".25" stop-color="${bounce}" stop-opacity=".5"/>
      <stop offset=".6" stop-color="${bounce}" stop-opacity=".14"/>
      <stop offset="1" stop-color="${bounce}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="shadow" cx="${gx}" cy="${gy}" r="${W * 1.1}" gradientUnits="userSpaceOnUse">
      <stop offset=".25" stop-color="#030106" stop-opacity="0"/>
      <stop offset=".75" stop-color="#030106" stop-opacity=".7"/>
      <stop offset="1" stop-color="#030106" stop-opacity=".85"/>
    </radialGradient>
    <linearGradient id="ceilFade" x1="1" y1="0" x2=".3" y2=".55">
      <stop offset="0" stop-color="#000" stop-opacity=".0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/>
    </linearGradient>
    <pattern id="slats" width="70" height="70" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
      <rect width="70" height="2" fill="#fff" opacity=".05"/>
    </pattern>
    <filter id="lampGlow" x="-100%" y="-200%" width="300%" height="500%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="bloom" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="34"/></filter>
    <filter id="edge" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="#050208"/>
  <rect width="${W}" height="${H}" filter="url(#wall)" opacity=".6"/>
  <rect width="${W}" height="${H}" fill="url(#key)" style="mix-blend-mode:screen"/>
  <rect width="${W}" height="${H}" fill="url(#spill)" style="mix-blend-mode:screen"/>
  <rect width="${W}" height="${H}" fill="url(#shadow)"/>
  <!-- ceiling plane, a touch darker, with faint slats -->
  <path d="M${W * 0.28} 0 L${W} 0 L${W} ${H * 0.5} Z" fill="#040207" opacity=".5" filter="url(#edge)"/>
  <path d="M${W * 0.28} 0 L${W} 0 L${W} ${H * 0.5} Z" fill="url(#slats)"/>
  <path d="M${W * 0.28} 0 L${W} ${H * 0.5}" stroke="${tint}" stroke-opacity=".12" stroke-width="3" filter="url(#soft)"/>
  <!-- the bounce lamp: an off-frame fixture, seen only as its cone and bloom -->
  <path d="M${lx - 20} ${ly} L${lx - 260} ${ly - 520} L${lx + 160} ${ly - 560} L${lx + 20} ${ly} Z" fill="${bounce}" opacity=".28" filter="url(#soft)" style="mix-blend-mode:screen"/>
  <g transform="translate(${lx} ${ly}) rotate(-18)">
    <ellipse rx="100" ry="46" fill="${bounce}" opacity=".85" filter="url(#bloom)"/>
  </g>
</svg>`
  return {
    css: `
.bg-neon { position:absolute; inset:0; overflow:hidden; background:#050208; }
.bg-neon .scene { position:absolute; inset:0; ${transform} }
.bg-neon svg { position:absolute; inset:0; width:100%; height:100%; }`,
    html: `<div class="bg-neon"><div class="scene">${svg}</div></div>`,
  }
}

/**
 * CSS + HTML for a slide's background layer.
 * `seed` should be stable per slide (e.g. hash of carousel id + slide index).
 */
// The `type` style's ground: near-black indigo with the faintest wash of the
// sign's own colour, so the coloured type is the only thing on the slide.
export function typeGround(sign) {
  const { dark } = SIGN_COLORS[sign] ?? SIGN_COLORS.pisces
  return {
    css: `
.bg-type { position:absolute; inset:0; background:
  radial-gradient(120% 80% at 20% 100%, ${dark}cc 0%, ${dark}33 45%, transparent 75%),
  linear-gradient(180deg, #07040f 0%, #0b0620 100%); }`,
    html: `<div class="bg-type"></div>`,
  }
}

export function background(bg, { seed = 1 } = {}) {
  switch (bg.kind) {
    case 'figure': return photo(bg, `figure/${bg.sign}.jpg`)
    case 'aura': return photo(bg, `aura/${bg.sign}.jpg`, 1.22, 5)
    case 'veil': return veil(bg)
    case 'sky': return sky(bg, seed)
    case 'neon': return neon(bg)
    default: throw new Error(`unknown bg kind: ${bg.kind}`)
  }
}
