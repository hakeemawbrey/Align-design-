// Art for news slides. Everything is drawn here (SVG) or inlined from the
// app's own sign art, so a slide renders with no network.
//
// art kinds:
//   { kind: 'planet', body: 'mars', sign?: 'virgo', rx?: true }   glossy orb on a starfield
//   { kind: 'moon', phase: 0..1, sign?: 'cancer' }                the Moon at a phase (0 new, .5 full)
//   { kind: 'eclipse', type: 'solar'|'lunar', sign?: 'aquarius' }
//   { kind: 'pair', a: 'venus', b: 'mars', sign? }                two orbs meeting (an aspect)
//   { kind: 'figure', sign } / { kind: 'aura', sign }             the app's sign art
//   { kind: 'stars', tint? }                                       plain starfield
//   { kind: 'wheel', signs?: [...], tint? }                        a zodiac wheel with lit signs
// Optional on all: zoom (1–1.6), focus ("x% y%").

import { imageDataUri, rng, hashString } from '../../src/backgrounds.mjs'
import { SIGN_COLORS, SIGNS } from '../../src/schema.mjs'

export const PLANET_COLORS = {
  sun: '#f2c75c', moon: '#efe6d6', mercury: '#7fd8b0', venus: '#e8628a', mars: '#f0603a',
  jupiter: '#f39a3a', saturn: '#d9c08a', uranus: '#38c4ec', neptune: '#7c74f0', pluto: '#9a7be0',
}
export const TINTS = {
  violet: '#9a7be0', rub: '#e8628a', gold: '#f2c75c', spark: '#7fd8b0', tide: '#3fb6f0', bone: '#efe6d6',
}
export const ART_KINDS = ['planet', 'moon', 'eclipse', 'pair', 'figure', 'aura', 'stars', 'wheel']

const hex = (c) => TINTS[c] ?? PLANET_COLORS[c] ?? SIGN_COLORS[c]?.color ?? (/^#[0-9a-f]{6}$/i.test(c ?? '') ? c : null)
export const colorOf = (c, fallback = '#9a7be0') => hex(c) ?? fallback
const rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (h, a) => `rgba(${rgb(h).join(',')},${a})`
const mix = (h, k, to = 255) => '#' + rgb(h).map((v) => Math.round(v + (to - v) * k).toString(16).padStart(2, '0')).join('')

function starfield(w, h, seed, n = 260) {
  const r = rng(seed)
  let s = ''
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h
    const m = Math.pow(r(), 5)
    const rad = 0.5 + m * 2.4
    const col = r() < 0.2 ? '#ffe6c8' : r() < 0.4 ? '#d9ceff' : '#fbf7ff'
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(2)}" fill="${col}" opacity="${(0.25 + r() * 0.65).toFixed(2)}"/>`
    if (m > 0.55) s += `<path d="M${x} ${y - rad * 7}L${x + rad * .7} ${y}L${x} ${y + rad * 7}L${x - rad * .7} ${y}Z M${x - rad * 7} ${y}L${x} ${y - rad * .7}L${x + rad * 7} ${y}L${x} ${y + rad * .7}Z" fill="${col}" opacity=".7"/>`
  }
  return s
}

// A glossy orb, like the app's chart-wheel markers: lit from the upper left,
// a rim of the sign's colour, a soft halo.
function orb(id, cx, cy, R, color, { bands = false, ring = false, rim = null } = {}) {
  const light = mix(color, 0.55), dark = mix(color, 0.72, 0)
  const rimC = rim ?? color
  let extra = ''
  if (bands) {
    for (let i = -3; i <= 3; i++) {
      const y = cy + i * R * 0.24
      extra += `<ellipse cx="${cx}" cy="${y}" rx="${R * 1.05}" ry="${R * 0.07}" fill="${i % 2 ? dark : light}" opacity=".28" clip-path="url(#c${id})"/>`
    }
  }
  const ringBack = ring ? `<ellipse cx="${cx}" cy="${cy}" rx="${R * 2.05}" ry="${R * 0.5}" fill="none" stroke="${light}" stroke-width="${R * 0.12}" opacity=".55" transform="rotate(-14 ${cx} ${cy})"/>` : ''
  const ringFront = ring ? `<path d="M${cx - R * 2.05} ${cy} A${R * 2.05} ${R * 0.5} 0 0 0 ${cx + R * 2.05} ${cy}" fill="none" stroke="${light}" stroke-width="${R * 0.12}" opacity=".8" transform="rotate(-14 ${cx} ${cy})"/>` : ''
  return `
  <defs>
    <radialGradient id="g${id}" cx="36%" cy="32%" r="78%">
      <stop offset="0" stop-color="#fffaf2"/><stop offset=".16" stop-color="${light}"/>
      <stop offset=".55" stop-color="${color}"/><stop offset="1" stop-color="${dark}"/>
    </radialGradient>
    <radialGradient id="h${id}"><stop offset=".45" stop-color="${rimC}" stop-opacity=".55"/><stop offset="1" stop-color="${rimC}" stop-opacity="0"/></radialGradient>
    <clipPath id="c${id}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${R * 2.1}" fill="url(#h${id})"/>
  ${ringBack}
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#g${id})"/>
  ${extra}
  <ellipse cx="${cx - R * 0.32}" cy="${cy - R * 0.42}" rx="${R * 0.36}" ry="${R * 0.2}" fill="#fff" opacity=".45" transform="rotate(-30 ${cx - R * 0.32} ${cy - R * 0.42})"/>
  <circle cx="${cx}" cy="${cy}" r="${R - 1.5}" fill="none" stroke="${mix(rimC, 0.4)}" stroke-width="3" opacity=".6"/>
  ${ringFront}`
}

function moonDisc(cx, cy, R, phase, tint) {
  // Lit part: half disc + terminator ellipse. phase 0 new → .5 full → 1 new.
  const k = Math.cos(2 * Math.PI * phase)
  const rx = Math.max(0.001, R * Math.abs(k))
  const top = `${cx} ${cy - R}`, bot = `${cx} ${cy + R}`
  const lit = phase <= 0.5
    ? `M${top} A${R} ${R} 0 0 1 ${bot} A${rx} ${R} 0 0 ${k > 0 ? 0 : 1} ${top}Z`
    : `M${top} A${R} ${R} 0 0 0 ${bot} A${rx} ${R} 0 0 ${k > 0 ? 1 : 0} ${top}Z`
  const r = rng(77)
  let maria = ''
  for (let i = 0; i < 9; i++) {
    maria += `<circle cx="${cx + (r() - 0.5) * R * 1.2}" cy="${cy + (r() - 0.5) * R * 1.2}" r="${R * (0.08 + r() * 0.2)}" fill="#b9aec8" opacity="${(0.18 + r() * 0.2).toFixed(2)}"/>`
  }
  return `
  <defs>
    <radialGradient id="mg" cx="42%" cy="38%" r="70%"><stop offset="0" stop-color="#fffaf0"/><stop offset=".7" stop-color="#e9dfcf"/><stop offset="1" stop-color="#bfb2a2"/></radialGradient>
    <radialGradient id="mh"><stop offset=".4" stop-color="${tint}" stop-opacity=".5"/><stop offset="1" stop-color="${tint}" stop-opacity="0"/></radialGradient>
    <clipPath id="ml"><path d="${lit}"/></clipPath>
    <filter id="mb"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${R * 2.3}" fill="url(#mh)" opacity="${(0.25 + 0.75 * (1 - Math.abs(k)) / 2 + (phase > .4 && phase < .6 ? .3 : 0)).toFixed(2)}"/>
  <circle cx="${cx}" cy="${cy}" r="${R}" fill="#1b1235" stroke="${rgba('#efe6d6', 0.18)}" stroke-width="2"/>
  <g clip-path="url(#ml)" filter="url(#mb)"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#mg)"/>${maria}</g>`
}

function eclipse(cx, cy, R, type, tint) {
  if (type === 'lunar') {
    return `<defs><radialGradient id="eb" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#f6a27a"/><stop offset=".6" stop-color="#b3402e"/><stop offset="1" stop-color="#4a1020"/></radialGradient>
    <radialGradient id="eh"><stop offset=".4" stop-color="#e8628a" stop-opacity=".45"/><stop offset="1" stop-color="#e8628a" stop-opacity="0"/></radialGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${R * 2.4}" fill="url(#eh)"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#eb)"/>
    <circle cx="${cx - R * 0.35}" cy="${cy - R * 0.1}" r="${R * 0.9}" fill="#0b0620" opacity=".35"/>`
  }
  // Annular: a thin ring of fire around a dark disc.
  return `<defs>
    <radialGradient id="ec"><stop offset=".5" stop-color="#fff4cf" stop-opacity=".9"/><stop offset=".62" stop-color="${tint}" stop-opacity=".55"/><stop offset="1" stop-color="${tint}" stop-opacity="0"/></radialGradient>
    <filter id="ef"><feGaussianBlur stdDeviation="6"/></filter></defs>
    <circle cx="${cx}" cy="${cy}" r="${R * 2.6}" fill="url(#ec)"/>
    <circle cx="${cx}" cy="${cy}" r="${R * 1.02}" fill="#fff7e0" filter="url(#ef)"/>
    <circle cx="${cx}" cy="${cy}" r="${R * 1.0}" fill="#fff4cf"/>
    <circle cx="${cx + 3}" cy="${cy + 2}" r="${R * 0.9}" fill="#070414"/>`
}

function wheel(cx, cy, R, lit, tint) {
  let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${rgba('#efe6d6', .22)}" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${R * 0.72}" fill="none" stroke="${rgba('#efe6d6', .14)}" stroke-width="2"/>`
  SIGNS.forEach((sg, i) => {
    const a = (-90 + i * 30) * Math.PI / 180
    const a2 = (-90 + i * 30 + 15) * Math.PI / 180
    s += `<line x1="${cx + Math.cos(a) * R * 0.72}" y1="${cy + Math.sin(a) * R * 0.72}" x2="${cx + Math.cos(a) * R}" y2="${cy + Math.sin(a) * R}" stroke="${rgba('#efe6d6', .16)}" stroke-width="2"/>`
    const on = !lit?.length || lit.includes(sg)
    const c = SIGN_COLORS[sg].color
    const x = cx + Math.cos(a2) * R * 0.86, y = cy + Math.sin(a2) * R * 0.86
    s += on ? orb(`w${i}`, x, y, R * 0.07, c) : `<circle cx="${x}" cy="${y}" r="${R * 0.035}" fill="${rgba('#b3a6c4', .35)}"/>`
  })
  return s + `<circle cx="${cx}" cy="${cy}" r="${R * 0.3}" fill="${rgba(tint, .12)}"/>`
}

/**
 * Returns { css, html } for an art box of size w×h (the box is
 * position:relative; this fills it).
 */
export function art(a, w, h, seed = 1) {
  if (!a) return { css: '', html: '' }
  const zoom = a.zoom ?? 1, focus = a.focus ?? '50% 50%'
  const tf = `transform:scale(${zoom}); transform-origin:${focus};`
  if (a.kind === 'figure' || a.kind === 'aura') {
    const crop = a.kind === 'aura' ? 1.22 : 1
    return {
      css: `.art img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:${focus};
        transform:scale(${(zoom * crop).toFixed(3)}); transform-origin:${focus}; filter: blur(${a.kind === 'aura' ? 4 : .5}px) saturate(1.08) contrast(1.06) brightness(.92); }`,
      html: `<img src="${imageDataUri(`${a.kind}/${a.sign}.jpg`)}" alt="">`,
    }
  }
  const tint = colorOf(a.tint ?? a.sign ?? (a.kind === 'planet' ? a.body : null) ?? 'violet')
  const cx = w / 2, cy = h / 2
  let body = ''
  const R = Math.min(w, h) * 0.26
  if (a.kind === 'planet') {
    const c = colorOf(a.body)
    body = orb('p', cx, cy, R, c, { bands: a.body === 'jupiter' || a.body === 'saturn', ring: a.body === 'saturn', rim: a.sign ? colorOf(a.sign) : null })
    if (a.rx) {
      // retrograde: a backward arc around the planet
      body += `<path d="M${cx + R * 1.55} ${cy - R * 0.5} A${R * 1.6} ${R * 1.6} 0 1 0 ${cx + R * 1.2} ${cy + R * 1.05}" fill="none" stroke="${rgba('#efe6d6', .55)}" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>
      <path d="M${cx + R * 1.2} ${cy + R * 1.05} l-6 -34 m6 34 l-34 -2" stroke="${rgba('#efe6d6', .7)}" stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(200 ${cx + R * 1.2} ${cy + R * 1.05})"/>`
    }
  } else if (a.kind === 'pair') {
    body = orb('a', cx - R * 0.95, cy + R * 0.15, R * 0.78, colorOf(a.a)) + orb('b', cx + R * 0.95, cy - R * 0.15, R * 0.78, colorOf(a.b))
      + `<line x1="${cx - R * 0.1}" y1="${cy}" x2="${cx + R * 0.1}" y2="${cy}" stroke="#fff4cf" stroke-width="3" opacity=".7"/>`
  } else if (a.kind === 'moon') {
    body = moonDisc(cx, cy, R * 1.05, a.phase ?? 0.5, tint)
  } else if (a.kind === 'eclipse') {
    body = eclipse(cx, cy, R, a.type ?? 'solar', tint)
  } else if (a.kind === 'wheel') {
    body = wheel(cx, cy, Math.min(w, h) * 0.42, a.signs, tint)
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><radialGradient id="neb" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="${tint}" stop-opacity=".28"/><stop offset="1" stop-color="${tint}" stop-opacity="0"/></radialGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#neb)"/>
    ${starfield(w, h, (seed ^ hashString(a.kind)) >>> 0)}
    ${body}</svg>`
  return {
    css: `.art .scene { position:absolute; inset:0; ${tf} }
      .art { background: radial-gradient(ellipse 80% 70% at 50% 45%, #1e1240 0%, #0b0620 75%); }`,
    html: `<div class="scene">${svg}</div>`,
  }
}
