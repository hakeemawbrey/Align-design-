// st4campaign (20 s vertical Align ad, Star Talk season 4 · EP 071, thread A: the vote opens) · story 0–15.6, then the
// shared end card ("come" + the Align logo, cta SIGN UP TO VOTE YOUR CITY).
//   0.00–6.60  "The stars are | *campaigning.*"  Four sign stars pop in, 2 × 2, each with a pixel picket sign on a stick:
//              ♌ Leo (crown) "LA!", ♊ Gemini "NEW YORK!", ♓ Pisces "NEW ORLEANS!", ♑ Capricorn (tie) "CHICAGO!".
//              They chant and pump the signs on the beat, then side-eye each other (rivals!).
//              Drop (2.82): THE STARS: "after Texas, you pick where we land." → all four snap round to you, wide-eyed.
//   6.60–10.95 "Texas first. | Then *you* pick."  THE STARS: "every sign-up is a *vote*." → little pixel envelopes flap
//              up from below and pop into new stars in the sky; the four look up, sparkle-eyed.
//   10.95 cut → "Every sign-up | is a *star.*"  The four cheer lower down, signs pumping, the new stars twinkling all
//              around them and a last shower raining in. Everything pops out by 15.45; the end card takes over at 15.6.
// No counts, no leader: all four signs get the same treatment, the same size, the same sparkle.
// Easter eggs: the seed constellation (EP 71) top-left; the ghost peeks out from behind the LA sign's right edge.
// One canvas (sky + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 71
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the cast: four campaigners, one sign each (2 × 2; nobody bigger, nobody first in the frame's reading order by size)
const CAST = [
  { id: 'leo', city: 'LA!', col: 0, row: 0, at: 0.45, seed: 3, ph: 0 },
  { id: 'gemini', city: 'NEW YORK!', col: 1, row: 0, at: 0.72, seed: 5, ph: 1.6 },
  { id: 'pisces', city: 'NEW ORLEANS!', col: 0, row: 1, at: 0.99, seed: 7, ph: 3.1 },
  { id: 'capricorn', city: 'CHICAGO!', col: 1, row: 1, at: 1.26, seed: 9, ph: 4.4 },
].map(c => ({ ...c, ...signStar(c.id) }))
const COLX = [290, 790], ROWY = [858, 1238], SIZE = 212, SIGN_UP = 192   // sign centre sits SIGN_UP px above the star
const LOW = 110                                                            // beat 3 drops the group into the freed space

// ── the timeline
const T = {
  h0: 0.12, h0Out: [6.42, 6.6],
  chant: [1.68, 2.24, 2.8, 3.36], open: 2.62, l1: BEAT(4) + 0.02,          // the drop: 2.82
  side: [3.2, 3.95], snap: 4.12,
  h1: 6.66, h1Land: 7.1, l2: 6.8, env0: 7.35, envGap: 0.27, nEnv: 11, look: 7.5, spark: 8.4,
  close: 10.8, h1Out: [10.66, 10.84],
  cut: 10.95,
  h2: 11.0, h2Land: 11.45, shower: [11.6, 13.6], heart: 12.6, h2Out: [15.2, 15.42], out: [15.05, 15.45],
  ghost: 8.55,
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'after Texas, you pick where we *land.*' },
  { t: T.l2, speaker: SPEAK, text: 'every sign-up is a *vote.*' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── pixel bits
/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']          // Leo's (starleo)
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const TIE = ['.KKK.', '.RRR.', '..R..', '.RRR.', '.RrR.', 'RRrRR', 'RRRRR', '.RRR.', '..R..']        // Capricorn's (starcap)
const TIE_C = { K: '#7a1f33', R: '#d8344f', r: '#ffd36b' }
const ENV = ['WWWWWWWWWWW', 'WfWWWWWWWfW', 'WWfWWWWWfWW', 'WWWffHffWWW', 'WWWWWHWWWWW', 'WWWWWWWWWWW', 'sssssssssss']
const ENV_C = { W: '#fbf6ea', f: '#c9bfae', s: '#ddd2bd', H: '#ff4f86' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// where each campaigner stands at time t
function spot(c, t) {
  const lk = t >= T.cut ? 1 : 0
  return { x: COLX[c.col], y: ROWY[c.row] + LOW * lk - (c.row === 1 ? 0 : 0) }
}
function castState(c, t) {
  if (t < c.at + 0.4) return { mood: 'happy', look: [0, 0] }
  if (t < T.side[0]) return { mood: c.id === 'leo' ? 'sparkle' : c.id === 'capricorn' ? 'squint' : 'happy', look: [0, 0] }
  if (t < T.side[1]) return { mood: 'squint', look: [c.col ? -1 : 1, c.row ? -0.6 : 0.6], blink: false }   // eyeing the rivals
  if (t < T.look) return { mood: 'wide', look: [0, 0], blink: false }                                        // "…you pick?"
  if (t < T.spark) return { mood: 'wide', look: [c.col ? -0.4 : 0.4, -1], blink: false }                    // envelopes flying up
  if (t < T.cut) return { mood: 'sparkle', look: [0, -0.6] }
  if (t < T.heart + (c.col + c.row) * 0.15) return { mood: 'happy' }
  return { mood: c.id === 'capricorn' && t < T.heart + 1.2 ? 'wink' : 'heart' }
}
// the sign pump: a quick lift on each chant beat, then a steady 2-beat sway (bigger in the cheer)
function pump(c, t) {
  let lift = 0
  const beats = t < T.cut ? T.chant : [11.6, 12.16, 12.72, 13.28, 13.84, 14.4]
  for (const b of beats) { const d = t - b - c.col * 0.06 - c.row * 0.03; if (d > 0 && d < 0.4) lift = Math.max(lift, Math.sin(Math.PI * d / 0.4)) }
  const amp = t >= T.cut ? 0.1 : t > T.chant[0] && t < T.side[0] ? 0.07 : 0.045
  return { lift, rot: amp * Math.sin(t * 5.655 + c.ph) }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 44px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The stars are | *campaigning.*', { top: 196, size: 104, accentSize: 156, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0 + 0.42, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Texas first. | Then *you* pick.', { top: 196, size: 112, accentSize: 158, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Every sign-up | is a *star.*', { top: 196, size: 118, accentSize: 210, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.3, life = 1.3
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 200 + Math.sin(p * 6 + i) * 14), Math.round(cy - 60 - p * 200), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }

  // ── the new stars: each envelope (beat 2) and each shower star (beat 3) ends as a twinkling star at a fixed spot
  const SKYSPOTS = []
  for (let i = 0; i < 26; i++) {
    // spread across the gaps of the 2 × 2 layout (left/right margins, centre aisle, between the rows)
    const lane = i % 4
    const sx = lane === 0 || lane === 3 ? 70 + hash(i) * 60 : lane === 1 ? 950 + hash(i) * 60 : 480 + hash(i) * 120
    const sy = 560 + hash(i + 9) * 800
    SKYSPOTS.push({ x: sx, y: sy })
  }
  const ENVS = Array.from({ length: T.nEnv }, (_, i) => ({ t0: T.env0 + i * T.envGap, fx: 140 + hash(i + 3) * 800, to: SKYSPOTS[i] }))
  const SHOWER = Array.from({ length: 15 }, (_, i) => ({ t0: T.shower[0] + i * ((T.shower[1] - T.shower[0]) / 15), to: SKYSPOTS[T.nEnv + i] }))

  function drawNewStars(t) {
    const ok = popOut(t, T.out)
    const dy = t >= T.cut ? LOW * 0.35 : 0
    const all = [...ENVS.map(e => ({ born: e.t0 + 0.75, to: e.to })), ...SHOWER.map(s => ({ born: s.t0 + 0.45, to: s.to }))]
    all.forEach((s, i) => {
      if (t < s.born) return
      const k = easeOutBack(prog(t, s.born, s.born + 0.3), 2.4) * ok
      if (k <= 0.02) return
      const tw = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.9)
      const px = s.to.x, py = s.to.y + (i >= T.nEnv ? dy : dy)
      const g = x.createRadialGradient(px, py, 0, px, py, 34)
      g.addColorStop(0, `rgba(242,199,92,${0.35 * tw * k})`); g.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = g; x.fillRect(px - 34, py - 34, 68, 68)
      x.save(); x.globalAlpha = clamp(k) * (0.7 + 0.3 * tw)
      drawPixelStar(x, px, py, 26 * k, tw > 0.8 ? 0 : 1, i % 3 ? GOLD : BONE, '#fff6e6')
      x.restore()
    })
  }
  // the envelopes: pop up from the bottom, flap up in an arc to their spot, burst into a star
  function drawEnvelopes(t) {
    if (t < T.env0 || t >= T.cut) return
    ENVS.forEach((e, i) => {
      const p = prog(t, e.t0, e.t0 + 0.75)
      if (p <= 0 || p >= 1) { if (p >= 1) sparkles(t, e.to.x, e.to.y, e.t0 + 0.75, 6, 34, i, [GOLD, BONE]); return }
      const q = ease.inOutCubic(p)
      const ex = lerp(e.fx, e.to.x, q) + Math.sin(p * 9 + i) * 16, ey = lerp(1370, e.to.y, q) - Math.sin(Math.PI * p) * 90
      const flap = Math.sin(t * 22 + i) * 0.18
      drawBits(x, ENV, ENV_C, Math.round(ex), Math.round(ey), 5 * (0.8 + 0.25 * Math.sin(Math.PI * p)), { rot: flap })
    })
  }
  // the shower (beat 3): little gold stars fall in from above to their spots
  function drawShower(t) {
    if (t < T.shower[0]) return
    SHOWER.forEach((s, i) => {
      const p = prog(t, s.t0, s.t0 + 0.45)
      if (p <= 0 || p >= 1) return
      const sx = s.to.x + (1 - p) * 60, sy = lerp(-40, s.to.y + LOW * 0.35, ease.inQuad(p))
      x.save(); x.globalAlpha = 0.8
      x.fillStyle = 'rgba(255,241,200,0.6)'; x.fillRect(Math.round(sx + 6), Math.round(sy - 70), 4, 60)
      drawPixelStar(x, sx, sy, 24, 1, GOLD, '#fff6e6')
      x.restore()
    })
  }

  // a picket sign: board + stick, rotated about the star's centre ("the hand")
  function drawSign(t, c, cx, cy, k, { lift, rot }) {
    x.save(); x.translate(Math.round(cx), Math.round(cy - lift * 26)); x.rotate(rot); x.scale(k, k)
    x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(c.city).width, bw = Math.max(200, Math.round(tw + 64)), bh = 100, by = -SIGN_UP
    // stick
    x.fillStyle = INK; x.fillRect(-11, by + bh / 2 - 6, 22, SIGN_UP - bh / 2 + 6)
    x.fillStyle = '#b0773f'; x.fillRect(-6, by + bh / 2, 12, SIGN_UP - bh / 2); x.fillStyle = '#d29a5c'; x.fillRect(-6, by + bh / 2, 4, SIGN_UP - bh / 2)
    // board: ink outline, sign-colour rim, cream face, stepped pixel corners
    const P = 8, L = -bw / 2, Tp = by - bh / 2
    x.fillStyle = INK; x.fillRect(L - P, Tp, bw + 2 * P, bh); x.fillRect(L, Tp - P, bw, bh + 2 * P)
    x.fillStyle = c.color; x.fillRect(L, Tp, bw, bh)
    x.fillStyle = '#fbf6ea'; x.fillRect(L + P, Tp + P, bw - 2 * P, bh - 2 * P)
    x.fillStyle = 'rgba(27,18,54,0.12)'; x.fillRect(L + P, Tp + bh - 2 * P, bw - 2 * P, P)
    // the city, in ink, a stripe of the sign colour under it
    x.fillStyle = INK; x.fillText(c.city, 0, by + 2)
    x.fillStyle = c.color; x.fillRect(-tw / 2, by + 26, tw, 5)
    // the ghost lives behind the LA sign: it leans out past the board's right edge, in the sign's own frame
    if (c.id === 'leo') drawGhostCameo(x, t, { x: bw / 2 + P, y: by + 4, at: T.ghost, dur: 1.4, from: 'left', cell: 3 })
    x.restore()
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    // hearts first, so they float up behind the signs and never cover a city name
    if (t > T.heart) CAST.forEach((c, n) => { const p = spot(c, t); floatHearts(t, p.x, p.y - 40, T.heart + n * 0.2, T.out[0] - 0.4, n * 3) })
    CAST.forEach((c, n) => {
      const k = pop01(t, c.at, 0.36, 2.2) * ok
      if (k <= 0.02) return
      const p = spot(c, t), pm = pump(c, t)
      const cheer = t >= T.cut ? 1 : 0
      const lift = pm.lift
      const drop = (1 - ease.outCubic(prog(t, c.at - 0.1, c.at + 0.22))) * -260
      const sx = p.x, sy = p.y + drop
      drawSign(t, c, sx, sy - lift * 10, clamp(k), pm)
      const st = castState(c, t)
      const hops = [c.at + 0.28, ...T.chant.map(b => b + c.col * 0.06 + c.row * 0.03), T.snap + n * 0.04, T.look + n * 0.05, ...(cheer ? [11.62, 12.18, 12.74, 13.3, 13.86, 14.42].map(b => b + n * 0.05) : [])]
      const gasp = t >= T.snap && t < T.snap + 0.5 ? -0.12 * Math.exp(-(t - T.snap) * 7) * Math.cos((t - T.snap) * 20) : 0
      const r = drawStarChar(x, sx, sy, SIZE, t, { color: c.color, glyph: c.glyph, ...st, hops, pop: k, squash: gasp, seed: c.seed, glow: 1.05 + 0.2 * cheer })
      if (c.id === 'leo') drawBits(x, CROWN, CROWN_C, Math.round(r.x - 4), Math.round(r.top + 10), 6.4 * k, { rot: -0.22 + 0.04 * Math.sin(t * 3) })
      if (c.id === 'capricorn') drawBits(x, TIE, TIE_C, Math.round(r.x), Math.round(r.y + SIZE * 0.27 * k), SIZE * k / 26, { rot: Math.sin(t * 3) * 0.04 })
      sparkles(t, r.x, r.y, c.at + 0.25, 8, 150, n, [GOLD, c.color, BONE])
      if (t > T.spark && t < T.cut) sparkles(t, r.x, r.y, T.spark + n * 0.08, 8, 160, n + 1, [GOLD, BONE])
      if (t >= T.cut) sparkles(t, r.x, r.y, T.h2Land + n * 0.07, 10, 170, n + 2, [GOLD, c.color, BONE, PINK])
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        drawNewStars(t)
        drawCast(t)
        drawEnvelopes(t)
        drawShower(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.62 (H0 out → "Texas first.") and 10.95 (box shut → "Every sign-up is a star.").
// cardfx keeps one for this film (the 10.95 one). End card flips at 15.6.
const CUTS = [6.62, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }),
  cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // the stars are campaigning: headline, four campaigners pop in with their signs, the chant
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0 + 0.42, 1174.66, 0.045, 0],
  ...CAST.map((c, i) => ['pop', +(c.at + 0.05).toFixed(3), NOTE[(i * 2) % 7], 0.045, c.col ? 0.35 : -0.35]),
  ...CAST.map(c => ['tick', +(c.at + 0.2).toFixed(3), 0.03]),
  ...T.chant.flatMap((b, i) => [['pop', b, i % 2 ? 880 : 739.99, 0.04, 0], ['tick', b + 0.02, 0.035]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.side[0], 440, 0.035, 0.5, -0.3], ['pluck', T.side[0] + 0.2, 415.3, 0.03, 0.5, 0.3],
  ['pop', T.snap, 1318.51, 0.045, 0], ['bell', T.snap + 0.02, 1760, 0.022, 0.8, 0],
  // texas first, then you pick: the envelopes flap up and pop into stars
  ...wordPops(T.h1, 3, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ...Array.from({ length: T.nEnv }, (_, i) => [['whoosh', +(T.env0 + i * T.envGap).toFixed(3), 0.22, 0.012], ['pluck', +(T.env0 + i * T.envGap + 0.75).toFixed(3), NOTE[i % 7] * 2, 0.022, 0.4, ((i % 3) - 1) * 0.4]]).flat(),
  ['glitter', T.spark, T.spark + 0.5],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // every sign-up is a star: the cheer + the shower
  ...wordPops(T.h2, 3, 0.08, 2, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ...Array.from({ length: 15 }, (_, i) => ['bell', +(T.shower[0] + i * 2 / 15 + 0.45).toFixed(3), NOTE[(i * 3) % 7] * 2, 0.012, 0.6, ((i % 5) - 2) * 0.2]),
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0], ['bell', T.heart + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
