// sxfriendafter — "After the Breakup." (45 s vertical Align ad · Star Talk Shows · FRIENDS & SELF-LOVE, ep. 3)
// Story 0–40.6, then the shared end card. A gentle recovery montage for ♎ LIBRA, with its friends (♉ Taurus, ♈ Aries,
// ♐ Sag, ♓ Pisces) linked round it as a gold constellation the whole way. Not a straight line: day 12 happens.
//   0.00–6.8   "Day 1."  Libra is a blanket burrito on the floor. The friends pop in round it one by one; 2.82 (drop)
//              the gold constellation lines snap between them. LIBRA: "I'm fine. I'm a burrito now." TAURUS (soup):
//              "soup for the burrito." Pisces sobs harder than Libra.
//   6.8–11.7   "Day 5."  A walk under the street lamps, the blanket worn as a cape. SAG: "fresh air! one foot, then the
//              other." Libra trips on the cape; the friends catch it.
//  11.71       card cut (deal).
//  11.7–18.0   "Day 12."  A happy little walk… a dog trots past. LIBRA: "…is that their dog?" POOF: burrito again.
//              "We don't talk | about day 12."  The friends calmly re-form the constellation round it.
//              TAURUS: "setbacks are normal. soup?"
//  18.0–25.0   "Day 20."  ARIES: "why'd the star go to school? to get brighter." Silence. Crickets. Then Libra
//              SNORTS, laughs so hard it falls over. "SHE LAUGHED!" LIBRA: "that was terrible. HA! HA!"
//  25.04       card cut (flip).
//  25.0–29.0   "Day 40."  New haircut energy: a fringe, sunglasses, slow-mo wind, the friends as backup dancers.
//              THE STARS: "new fringe. new frequency."
//  29.0–32.7   "Tonight's deck."  Libra opens the deck again; the veiled top card flips; Libra smiles. "…okay. one card."
//  32.825      ★ LESSON UNLOCKED: "Healing isn't a straight line. | It's a constellation." +1 GLOWING UP. Behind it
//              the five days (1, 5, 12, 20, 40) join up as a zig-zag constellation.
//  37.3–40.6   "The sky's | still dealing."  Card backs drift down like shooting stars over the whole crew.
// One canvas (sky + set + stars + props), DOM type + dialogue boxes + the lesson above it, the show bug, grain on top.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawBurrito, drawCape, drawFringe, drawShades, drawDog, drawSoup, drawLamp, drawBubble, drawLink } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#9fe8ff', MINT = '#7dffb0', LIBC = '#f08ae6'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
export const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid
export const KEY = 'Bb'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // 1 · day 1
  h0: 0.12, h0Land: BEAT(0), h0Out: [6.6, 6.78], arrive: [1.0, 1.4, 1.8, 2.2], snap: BEAT(4), l1: 1.2, l2: 4.2, close1: 6.7,
  // 2 · day 5
  s2: 6.8, h1: 6.85, h1Land: 7.1, l3: 7.1, trip: 9.6, close2: 10.4, h1Out: [11.5, 11.68],
  c1: BEAT(20),                                                     // 11.71
  // 3 · day 12
  h2: 11.78, h2Land: 12.0, dog: [12.1, 12.6], l4: 12.6, relapse: 13.6, h2Out: [13.5, 13.66], h2b: 13.75, h2bLand: 14.05, ring: [13.95, 14.4], snap2: 14.5,
  dogOff: [15.4, 16.2], l5: 15.0, close3: 17.9, h2bOut: [17.8, 17.98],
  // 4 · day 20
  s4: 18.0, h3: 18.05, h3Land: 18.3, l6: 18.3, crick: 20.55, snort: 21.0, fall: [21.4, 21.75], laughed: [21.35, 22.75], l7: 21.9, up: [23.7, 24.1], close4: 25.0, h3Out: [24.85, 25.0],
  c3: BEAT(44),                                                     // 25.044
  // 5 · day 40
  h4: 25.1, h4Land: 25.4, l8: 25.4, close5: 28.3, shades: 28.35, h4Out: [28.85, 29.0],
  // 6 · tonight's deck
  phone: [29.0, 29.45], h5: 29.05, h5Land: 29.35, deal: 29.5, dealGap: 0.09, flip: [30.0, 30.28], glow: 30.5, l9: 29.6, close6: 32.15, phoneAway: [32.3, 32.65], h5Out: [32.5, 32.68],
  // 7 · LESSON UNLOCKED
  lesson: BEAT(58), lessonOut: [37.1, 37.3], castOut: [32.55, 32.8], castBack: 37.3,
  // 8 · the sky's still dealing
  h6: 37.35, h6Land: 37.75, out: [40.05, 40.45], h6Out: [40.2, 40.45],
}
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Healing isn’t a straight line. | It’s a *constellation.*', chip: '+1 GLOWING UP', accentColor: GOLD, dim: 0.5 }

// ── the dialogue
const LIB = '♎ LIBRA', TAU = '♉ TAURUS', SAG = '♐ SAG', ARI = '♈ ARIES', STARS = 'THE STARS'
const TAUC = '#f2c46a', SAGC = '#c49aff', ARIC = '#ff8a64'
const L1 = [
  { t: T.l1, speaker: LIB, color: LIBC, text: 'I’m fine. I’m a *burrito* now.' },
  { t: T.l2, speaker: TAU, color: TAUC, text: 'soup for the *burrito.*' },
]
const L2 = [{ t: T.l3, speaker: SAG, color: SAGC, text: 'fresh air! one foot, then the *other.*' }]
const L3 = [
  { t: T.l4, speaker: LIB, color: LIBC, text: '…is that *their* dog?' },
  { t: T.l5, speaker: TAU, color: TAUC, text: 'setbacks are *normal.* soup?' },
]
const L4 = [
  { t: T.l6, speaker: ARI, color: ARIC, text: 'why’d the star go to school? to get *brighter.*' },
  { t: T.l7, speaker: LIB, color: LIBC, text: 'that was *terrible.* HA! HA!' },
]
const L5 = [{ t: T.l8, speaker: STARS, text: 'new fringe. *new frequency.*' }]
const L6 = [{ t: T.l9, speaker: LIB, color: LIBC, text: '…okay. *one* card.' }]
export const ALL_LINES = [...L1, ...L2, ...L3, ...L4, ...L5, ...L6]
export const BOXES = [[L1, T.close1, 52], [L2, T.close2, 52], [L3, T.close3, 52], [L4, T.close4, 50], [L5, T.close5, 52], [L6, T.close6, 52]]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
const charAt = (li, word) => { const s = ALL_LINES[li].text.replace(/\*/g, ''); return LT[li].chars[Math.max(0, s.indexOf(word))] }
export const TW = { their: charAt(3, 'their'), brighter: charAt(5, 'brighter'), terrible: charAt(6, 'terrible'), freq: charAt(7, 'new frequency') }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b
const JUMP = (t, t0, d = 0.42) => { const p = prog(t, t0, t0 + d); return p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0 }
const tween = (a, b, p, arc = 0) => { const e = ease.inOutCubic(p); return [lerp(a[0], b[0], e), lerp(a[1], b[1], e) - Math.sin(Math.PI * p) * arc, lerp(a[2], b[2], e)] }

// ── the cast
const CAST = { lib: { ...signStar('libra'), seed: 7 }, tau: { ...signStar('taurus'), seed: 11 }, ari: { ...signStar('aries'), seed: 3 }, sag: { ...signStar('sagittarius'), seed: 43 }, pis: { ...signStar('pisces'), seed: 59 } }
const KEYS = Object.keys(CAST)
const LAY = {
  RING: { lib: [540, 1135, 270], tau: [185, 1115, 150], ari: [895, 1115, 150], sag: [320, 800, 120], pis: [760, 800, 120] },
  WALK: { lib: [540, 1155, 230], tau: [300, 1190, 140], ari: [790, 1180, 140], sag: [960, 1190, 120], pis: [110, 1200, 120] },
  D20: { lib: [420, 1140, 260], tau: [175, 1120, 140], ari: [810, 1100, 170], sag: [320, 800, 120], pis: [760, 800, 120] },
  D40: { lib: [540, 1110, 320], tau: [165, 1185, 140], ari: [915, 1185, 140], sag: [270, 840, 110], pis: [810, 840, 110] },
  DECK: { lib: [140, 1010, 190], ari: [945, 1010, 170], tau: [150, 1300, 120], pis: [925, 1300, 110] },
}
const LINKS = [['lib', 'tau'], ['tau', 'sag'], ['sag', 'pis'], ['pis', 'ari'], ['ari', 'lib']]
const GROUND = 1290
const DAYS = [['DAY 1', 150, 1300], ['DAY 5', 340, 1170], ['DAY 12', 540, 1320], ['DAY 20', 740, 1150], ['DAY 40', 930, 1060]]

function place(k, t) {
  if (t < T.s2) {
    if (k === 'lib') return { p: LAY.RING.lib, pk: 1 }
    const i = ['tau', 'sag', 'pis', 'ari'].indexOf(k)
    return t < T.arrive[i] ? null : { p: LAY.RING[k], pk: pop01(t, T.arrive[i], 0.35, 2.2) }
  }
  if (t < T.c1) return { p: t < T.s2 + 0.4 ? tween(LAY.RING[k], LAY.WALK[k], prog(t, T.s2, T.s2 + 0.4), 60) : LAY.WALK[k], pk: 1 }
  if (t < T.s4) {
    if (k === 'lib' && t >= T.relapse) return { p: LAY.RING.lib, pk: 1 }
    if (t >= T.ring[0]) return { p: tween(LAY.WALK[k], LAY.RING[k], prog(t, ...T.ring), 80), pk: 1 }
    return { p: LAY.WALK[k], pk: 1 }
  }
  if (t < T.c3) return { p: LAY.D20[k], pk: 1 }
  if (t < T.phone[0]) return { p: LAY.D40[k], pk: 1 }
  if (t < T.castBack) {
    const L = LAY.DECK[k]
    if (!L) return null
    return { p: L, pk: pop01(t, T.phone[0] + 0.05, 0.3, 2) * (1 - prog(t, ...T.castOut)) }
  }
  const stg = { lib: 0, tau: 0.06, ari: 0.1, sag: 0.14, pis: 0.18 }[k]
  return { p: LAY.RING[k], pk: pop01(t, T.castBack + stg, 0.32, 2) }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "800 26px Inter", "500 30px Inter", "italic 500 190px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-3.png')])
  const BACK = bake(backIm, 420), FACE = bake(faceIm, 520)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HL = (text, o) => popText(root, text, { late: 1, wobble: true, ...o })
  const H0 = HL('Day *1.*', { top: 190, size: 130, accentSize: 190, at: T.h0, lateAt: T.h0Land, accentColor: LAV })
  const H1 = HL('Day *5.*', { top: 190, size: 130, accentSize: 190, at: T.h1, lateAt: T.h1Land, accentColor: CYAN })
  const H2 = HL('Day *12.*', { top: 190, size: 130, accentSize: 190, at: T.h2, lateAt: T.h2Land, accentColor: MINT })
  const H2b = HL('We don’t talk | about day *12.*', { top: 150, size: 100, accentSize: 150, at: T.h2b, lateAt: T.h2bLand, accentColor: PINK, lineHeight: 1.0 })
  const H3 = HL('Day *20.*', { top: 190, size: 130, accentSize: 190, at: T.h3, lateAt: T.h3Land, accentColor: GOLD })
  const H4 = HL('Day *40.*', { top: 190, size: 130, accentSize: 190, at: T.h4, lateAt: T.h4Land, accentColor: LIBC })
  const H5 = HL('Tonight’s *deck.*', { top: 205, size: 116, accentSize: 164, at: T.h5, lateAt: T.h5Land, accentColor: LAV })
  const H6 = HL('The sky’s | still *dealing.*', { top: 150, size: 112, accentSize: 158, at: T.h6, lateAt: T.h6Land, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H2b, T.h2bOut], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out]]
  const boxes = BOXES.map(([lines, close, size]) => dialogueBox(root, { lines, y: 1400, width: 960, height: 300, close, cps: CPS, size }))

  // ── the show bug (top-left, the whole story)
  const bug = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: 'rgba(239,230,214,0.82)', textShadow: '0 2px 10px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', opacity: 0 }, root)
  bug.innerHTML = '<span style="color:#ff8fb1">♥</span> FRIENDS <span style="color:#ff8fb1">&amp;</span> SELF-LOVE'

  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── the phone (POV)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawPhone(t) {
    if (t < T.phone[0] || t > T.phoneAway[1]) return
    const up = easeOutBack(prog(t, ...T.phone), 1.3), aw = ease.inCubic(prog(t, ...T.phoneAway))
    x.save()
    x.translate(540, lerp(2400, 975, up) + aw * 1500); x.rotate((lerp(7, 0, up) - aw * 14) * Math.PI / 180)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    x.save(); x.shadowColor = rgba(LAV, 0.7); x.shadowBlur = 80; rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#2a1a5c'); g.addColorStop(0.6, '#24164f'); g.addColorStop(1, '#1a1040')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    const r = rng(12)
    for (let i = 0; i < 26; i++) { x.fillStyle = rgba(BONE, 0.15 + 0.35 * r()); x.fillRect(Math.round(sx + r() * sw), Math.round(sy + r() * sh), 2, 2) }
    x.fillStyle = rgba(BONE, 0.9); x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillText('9:00 PM', sx + 34, sy + 44)
    x.textAlign = 'right'; x.fillText('✦', sx + sw - 34, sy + 44)
    x.fillStyle = BONE; x.textAlign = 'left'; x.font = `italic 500 46px ${SERIF}`; x.fillText('Tonight’s deck', sx + 32, sy + 118)
    for (let i = 0; i < 5; i++) {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.34)
      if (p <= 0) continue
      const e = easeOutBack(p, 1.4), jr = ((i * 37) % 7 - 3) * 0.012
      const cx = lerp((i - 2) * 50, (i - 2) * 3, e), cy = lerp(sh, 18 - i * 3, e), rot = lerp((i - 2) * 0.5, jr, e)
      if (i < 4) { drawCardImg(BACK, BACK_BODY, cx, cy, 286, rot); continue }
      const f = prog(t, ...T.flip), sxk = Math.cos(f * Math.PI)
      const glow = clamp(prog(t, T.glow, T.glow + 0.25))
      if (glow > 0) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const gg = x.createRadialGradient(cx, cy, 40, cx, cy, 300); gg.addColorStop(0, rgba(GOLD, 0.42 * glow * (0.75 + 0.25 * Math.sin(t * 9)))); gg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = gg; x.fillRect(cx - 300, cy - 300, 600, 600); x.restore()
      }
      if (sxk > 0) drawCardImg(BACK, BACK_BODY, cx, cy, 286, rot, sxk)
      else drawCardImg(FACE, FACE_BODY, cx, cy, 286, rot, -sxk)
    }
    const ly = sy + sh - 92
    x.font = `700 22px ${MONO}`; x.textBaseline = 'alphabetic'
    x.textAlign = 'left'; x.fillStyle = rgba(BONE, 0.55); x.fillText('← RELEASE', sx + 30, ly)
    x.textAlign = 'right'; x.fillText('ALIGN →', sx + sw - 30, ly)
    x.textAlign = 'center'; x.font = `500 21px ${INTER}`; x.fillStyle = rgba(BONE, 0.5); x.fillText('Card first. Face last.', 0, sy + sh - 44)
    x.fillStyle = '#140d2a'; rr(-60, sy + 12, 120, 30, 15); x.fill()
    x.restore()
    x.restore()
  }

  // ─────────────────────────────── fx
  function sparkles(t, cx, cy, t0, n, Rr, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.6 + 0.6 * p), cy + Math.sin(a) * Rr * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV, CYAN][i % 5])
    }
    x.restore()
  }
  function smoke(t, t0, cx, cy, R0 = 50) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const r = rng(4)
    x.save()
    for (let i = 0; i < 14; i++) {
      const a = r() * Math.PI * 2, v = 140 + r() * 220, rad = (R0 * 0.5 + r() * R0 * 0.6) * (1 + tt * 1.4)
      const px = cx + Math.cos(a) * v * tt, py = cy + Math.sin(a) * v * tt * 0.6
      x.globalAlpha = 0.6 * (1 - tt / 0.7)
      x.fillStyle = i % 3 ? '#ffc2d6' : '#f4ecff'
      const c = Math.max(6, Math.round(rad / 4))
      x.fillRect(Math.round(px - c * 1.5), Math.round(py - c), c * 3, c * 2); x.fillRect(Math.round(px - c), Math.round(py - c * 1.5), c * 2, c * 3)
    }
    x.restore()
  }
  const CONF = [GOLD, PINK, CYAN, MINT, LAV, BONE]
  function confetti(t, t0, x0, y0, n, seed, { spread = 1, up = 1, dur = 2.0 } = {}) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const r = rng(seed)
    x.save()
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (r() - 0.5) * 2.4 * spread, v = (700 + r() * 900) * up, sz = 9 + r() * 9, spin = (r() - 0.5) * 18, c = CONF[i % CONF.length], drag = 0.7 + r() * 0.5
      const px = x0 + Math.cos(a) * v * tt * drag * 0.8, py = y0 + Math.sin(a) * v * tt * drag + 900 * tt * tt
      const al = 1 - prog(tt, dur * 0.6, dur)
      if (al <= 0 || py > H + 30) continue
      x.globalAlpha = al
      x.save(); x.translate(px, py); x.rotate(spin * tt); x.fillStyle = c; x.fillRect(-sz / 2, -sz * 0.3, sz, sz * 0.6 * Math.abs(Math.cos(spin * tt * 0.7)) + 2); x.restore()
    }
    x.restore()
  }
  function drawTears(eyes, t, cell, strength) {
    if (strength <= 0) return
    const c = Math.max(3, Math.round(cell))
    x.save()
    eyes.forEach(([ex, ey], side) => {
      const dir = side === 0 ? -1 : 1
      for (let k = 0; k < 8; k++) {
        const ph = (t * 2.1 + k / 8) % 1
        const vx = dir * (60 + 40 * strength) * c / 6, vy = -40 * c / 6
        const px = ex + vx * ph * 1.6, py = ey + vy * ph * 1.6 + 260 * c / 6 * ph * ph
        const a = (1 - ph) * clamp(strength)
        if (a <= 0.03) continue
        x.globalAlpha = a
        const X = Math.round(px), Y = Math.round(py)
        x.fillStyle = '#16204a'; x.fillRect(X - 1, Y - 1, c + 2, 2 * c + 2)
        x.fillStyle = '#5cc6ff'; x.fillRect(X, Y, c, 2 * c)
        x.fillStyle = '#e6f8ff'; x.fillRect(X, Y, Math.ceil(c / 2), Math.ceil(c / 2))
      }
    })
    x.restore()
  }

  // ─────────────────────────────── moods
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 60 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 120 ? Math.sign(ty - p[1]) : 0]
  const WALK_HOPS = Array.from({ length: 20 }, (_, i) => BEAT(11 + i)).filter(h => (h > T.s2 + 0.4 && h < T.c1) || (h > T.c1 && h < T.dog[1]))
  const HOPS = {}
  for (const k of KEYS) {
    const st = (CAST[k].seed % 5) * 0.03
    const h = [...WALK_HOPS.map(v => v + st), T.snap + st, T.snap2 + st, T.lesson + 1.8 + st, T.castBack + 0.4 + st]
    if (k !== 'lib') h.push(T.laughed[0] + st, T.laughed[0] + 0.5 + st)
    for (const s of KEYS) void s
    HOPS[k] = h
  }
  HOPS.lib.push(...talkHops(ALL_LINES, LIB, { cps: CPS }))
  HOPS.tau.push(...talkHops(ALL_LINES, TAU, { cps: CPS }))
  HOPS.sag.push(...talkHops(ALL_LINES, SAG, { cps: CPS }))
  HOPS.ari.push(...talkHops(ALL_LINES, ARI, { cps: CPS }))
  // day 40: backup dancers on every beat
  for (const k of ['tau', 'ari', 'sag', 'pis']) for (let i = 0; i < 7; i++) HOPS[k].push(BEAT(45 + i) + (k === 'pis' ? 0.12 : 0))
  for (const k of KEYS) HOPS[k].sort((a, b) => a - b)

  function stateOf(k, t, p) {
    let mood = 'happy', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0
    const isL = k === 'lib', isP = k === 'pis'
    if (isP) tears = 0.6
    const L = place('lib', t), LP = L ? L.p : [540, 1135]
    if (t < T.s2) {
      if (isL) { mood = 'squint'; look = [0, 1]; if (t >= T.l2) { mood = 'neutral'; look = [-1, 0] } if (t >= LT[1].done) mood = 'sparkle' }
      else { mood = 'neutral'; look = toward(p, LP[0], LP[1]); if (t >= T.snap) mood = 'sparkle' }
      if (isP) { mood = 'squint'; tears = 1 }
    } else if (t < T.c1) {
      look = [1, 0]
      if (isL) { mood = 'neutral'; look = [1, 1]; if (t >= T.trip) { const kk = t - T.trip; mood = kk < 0.6 ? 'wide' : 'happy'; dy = kk < 0.6 ? 30 * Math.sin(kk * 5) : 0 } }
      else if (t >= T.trip && t < T.trip + 0.8) { mood = 'wide'; look = toward(p, LP[0], LP[1]) }
    } else if (t < T.s4) {
      look = [1, 0]
      if (isL) {
        mood = 'happy'
        if (t >= T.dog[0] + 0.2) { mood = 'wide'; look = [1, 1]; blink = false }
        if (t >= T.relapse) { mood = 'squint'; look = [0, 1]; tears = 0.5; blink = undefined }
        if (t >= LT[4].done) { mood = 'sparkle'; look = [-1, 0]; tears = 0 }
      } else {
        if (t >= T.relapse) { mood = 'neutral'; look = toward(p, LP[0], LP[1]) }
        if (t >= T.snap2) mood = 'sparkle'
        if (isP && t >= T.relapse) { mood = 'squint'; tears = 1 }
      }
    } else if (t < T.c3) {
      if (isL) {
        mood = 'neutral'; look = toward(p, LAY.D20.ari[0], LAY.D20.ari[1])
        if (t >= T.crick) { mood = 'squint'; look = [0, 0] }
        if (t >= T.snort) { mood = 'happy'; squash = 0.08 * Math.abs(Math.sin((t - T.snort) * 14)) }
        if (t >= T.up[1]) { mood = 'happy'; squash = 0.04 * Math.abs(Math.sin(t * 10)) }
      } else {
        mood = k === 'ari' ? 'wink' : 'neutral'; look = k === 'ari' ? [-1, 0] : toward(p, LAY.D20.ari[0], LAY.D20.ari[1])
        if (t >= T.crick) { mood = k === 'ari' ? 'squint' : 'eyeroll'; look = [0, 0] }
        if (t >= T.snort) { mood = 'wide'; look = toward(p, LAY.D20.lib[0], LAY.D20.lib[1]); blink = false }
        if (t >= T.laughed[0] + 0.5) { mood = 'heart'; blink = undefined }
        if (isP && t >= T.snort) tears = 1
      }
    } else if (t < T.phone[0]) {
      if (isL) { mood = 'happy'; look = [0, 0]; if (t >= T.shades + 0.3) mood = 'wink' }
      else { mood = 'happy'; look = toward(p, 540, 1110) }
      if (isP) { mood = 'happy'; tears = 0.7 }
    } else if (t < T.castBack) {
      look = toward(p, 540, 975); mood = 'wide'
      if (t >= T.flip[1]) mood = isL ? 'happy' : 'sparkle'
      if (isP) tears = 0.8
    } else {
      mood = 'happy'; look = isL ? [0, 0] : toward(p, 540, 1135)
      if (isP) { mood = 'happy'; tears = 1 }
    }
    let j = 0
    if (!isL && t >= T.trip && t < T.trip + 0.6) j = 0.5 * JUMP(t, T.trip + 0.05, 0.35)
    dy -= j * p[2] * 0.4
    return { mood, look, blink, squash, dx, dy, tears }
  }

  // ─────────────────────────────── the world
  function drawWorld(t) {
    drawSky(x, t, SKY_H)
    // ground
    x.fillStyle = '#170f33'; x.fillRect(0, GROUND, W, H - GROUND)
    x.fillStyle = 'rgba(201,166,255,0.18)'; x.fillRect(0, GROUND, W, 6)
    const walking = (t >= T.s2 && t < T.dog[1] + 0.2)
    const scroll = (t - T.s2) * 260
    if (t >= T.s2 && t < T.s4) {
      // the path + street lamps scrolling past (they stop when the dog does)
      const sc = walking ? scroll : (T.dog[1] + 0.2 - T.s2) * 260
      x.fillStyle = '#231848'; x.fillRect(0, GROUND, W, 40)
      for (let i = -1; i < 14; i++) { const lx = ((i * 100 - sc) % 1400 + 1400) % 1400 - 100; x.fillStyle = 'rgba(201,166,255,0.14)'; x.fillRect(Math.round(lx), GROUND + 16, 50, 6) }
      for (let i = 0; i < 3; i++) { const lx = ((i * 480 + 200 - sc * 0.8) % 1440 + 1440) % 1440 - 180; drawLamp(x, lx, GROUND, 6) }
    } else {
      for (let i = 0; i < W; i += 90) { x.fillStyle = 'rgba(201,166,255,0.06)'; x.fillRect(i, GROUND + 6, 4, H - GROUND) }
      x.fillStyle = 'rgba(240,138,230,0.14)'; x.beginPath(); x.ellipse(540, GROUND + 70, 440, 50, 0, 0, Math.PI * 2); x.fill()
    }
    // day 40: wind streaks + a spotlight glow
    if (t >= T.c3 && t < T.phone[0]) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(540, 1100, 40, 540, 1100, 520); g.addColorStop(0, 'rgba(240,138,230,0.28)'); g.addColorStop(1, 'rgba(240,138,230,0)')
      x.fillStyle = g; x.fillRect(0, 500, W, 1200)
      for (let i = 0; i < 14; i++) { const ph = (t * 1.3 + i * 0.137) % 1, yy = 520 + ((i * 97) % 760); x.fillStyle = `rgba(239,230,214,${0.25 * Math.sin(Math.PI * ph)})`; x.fillRect(Math.round(W - ph * (W + 300)), yy, 160, 4) }
      x.restore()
    }
    if (t >= T.phone[0] && t < T.castBack) { x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(0, 0, W, H) }
  }

  // the constellation of friends (behind the stars)
  function linksAlpha(t) {
    if (t < T.snap - 0.3) return 0
    if (t < T.s2) return 1
    if (t < T.relapse) return 0.25 * (1 - prog(t, T.s2, T.s2 + 0.3))     // on the walk the lines fade back
    if (t < T.s4) return clamp(prog(t, T.snap2 - 0.3, T.snap2))
    if (t < T.phone[0]) return 1
    if (t < T.castBack) return 0
    return clamp(prog(t, T.castBack + 0.3, T.castBack + 0.7))
  }
  function drawLinks(t, pts) {
    const a = linksAlpha(t)
    if (a <= 0) return
    const t0 = t < T.s2 ? T.snap - 0.3 : t < T.s4 ? T.snap2 - 0.3 : t >= T.castBack ? T.castBack + 0.3 : -10
    LINKS.forEach(([u, v], i) => { if (pts[u] && pts[v]) drawLink(x, pts[u], pts[v], prog(t, t0 + i * 0.06, t0 + i * 0.06 + 0.25), a * 0.85) })
  }

  function drawActor(k, t, P, ok) {
    const p = P.p, pk = P.pk * ok
    if (pk <= 0.02 || p[2] <= 0) return null
    const C = CAST[k], st = stateOf(k, t, p)
    const px = p[0] + st.dx, py = p[1] + st.dy
    // Libra's laugh-fall: rotate round its feet
    let rot = 0
    if (k === 'lib' && t >= T.fall[0] && t < T.c3) rot = 1.35 * ease.outCubic(prog(t, ...T.fall)) * (1 - ease.inOutCubic(prog(t, ...T.up))) + Math.sin(t * 12) * 0.04 * (t < T.up[1] && t >= T.fall[1] ? 1 : 0)
    x.save()
    if (rot) { const fy = py + p[2] * 0.36; x.translate(px, fy); x.rotate(rot); x.translate(-px, -fy) }
    const R = drawStarChar(x, px, py, p[2], t, { color: C.color, glyph: p[2] >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: 0.9 })
    // Libra's looks
    if (k === 'lib') {
      const burrito = t < T.s2 ? 1 : inR(t, T.relapse, T.s4) ? pop01(t, T.relapse, 0.3, 2) : 0
      if (burrito > 0) drawBurrito(x, R, clamp(burrito, 0, 1.1))
      if (inR(t, T.s2, T.relapse)) drawCape(x, R, t, t < T.c1 ? 1 : 0.0)
      if (t >= T.c3) drawFringe(x, R)
      if (t >= T.c3 && t < T.phone[0]) drawShades(x, R, ease.inOutCubic(prog(t, T.shades, T.shades + 0.25)))
    }
    if (k === 'tau' && (t < T.s2 || inR(t, T.snap2, T.s4))) drawSoup(x, R.x + R.size * 0.48, R.y + R.size * 0.05, 6, t)
    x.restore()
    if (st.tears > 0) drawTears([[px - R.size * 0.17, R.y + R.size * 0.07], [px + R.size * 0.17, R.y + R.size * 0.07]], t, Math.max(4, R.size / 22), st.tears)
    return R
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return {}
    const pts = {}, list = []
    for (const k of KEYS) { const P = place(k, t); if (P) { list.push([k, P]); pts[k] = [P.p[0], P.p[1]] } }
    drawLinks(t, pts)
    list.sort((a, b) => a[1].p[1] - b[1].p[1])
    const Rs = {}
    for (const [k, P] of list) Rs[k] = drawActor(k, t, P, ok)
    return Rs
  }

  // the lesson's background: the five days joined up as a zig-zag constellation
  function drawDays(t) {
    const k = clamp(prog(t, T.lesson + 0.2, T.lesson + 0.5)) * (1 - prog(t, ...T.lessonOut))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    for (let i = 0; i < DAYS.length - 1; i++) drawLink(x, [DAYS[i][1], DAYS[i][2]], [DAYS[i + 1][1], DAYS[i + 1][2]], prog(t, T.lesson + 0.4 + i * 0.3, T.lesson + 0.7 + i * 0.3), 1)
    DAYS.forEach(([lab, dx, dy], i) => {
      const p = pop01(t, T.lesson + 0.3 + i * 0.3, 0.3, 2.4)
      if (p <= 0.02) return
      x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(dx, dy, 2, dx, dy, 46 * p); gg.addColorStop(0, rgba(i === 2 ? CYAN : GOLD, 0.9)); gg.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gg; x.fillRect(dx - 50, dy - 50, 100, 100); x.restore()
      drawPixelStar(x, dx, dy, 64 * p, 1, i === 2 ? CYAN : GOLD)
      x.fillStyle = rgba(BONE, 0.85 * clamp(p)); x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
      x.fillText(lab, dx, dy + 52)
    })
    x.restore()
  }

  // card backs drifting down like shooting stars (the final)
  function drawFallingCards(t) {
    if (t < T.castBack) return
    const ok = popOut(t, T.out)
    const r = rng(31)
    for (let i = 0; i < 9; i++) {
      const t0 = T.castBack + 0.2 + i * 0.28 + r() * 0.2, tt = t - t0, x0 = 80 + r() * 920, spd = 220 + r() * 160, rot0 = (r() - 0.5) * 0.8
      if (tt < 0) continue
      const cy = 480 + tt * spd, cx = x0 + Math.sin(tt * 1.5 + i) * 30
      if (cy > 1100) continue
      {
        const sxk = Math.max(0.3, Math.abs(Math.cos(tt * 1.4 + i))), al = ok * clamp((1100 - cy) / 200)
        x.save(); x.globalAlpha = al; x.translate(cx, cy); x.rotate(rot0 + tt * 0.6); x.scale(sxk, 1)
        x.fillStyle = '#1a1030'; x.fillRect(-36, -54, 72, 108)
        x.fillStyle = GOLD; x.fillRect(-32, -50, 64, 100)
        x.fillStyle = '#3a2280'; x.fillRect(-26, -44, 52, 88)
        x.restore()
        x.save(); x.globalAlpha = al; drawPixelStar(x, cx, cy, 30, 1, GOLD); x.restore()
      }
      if (i % 2) { x.save(); x.globalAlpha = 0.5 * ok; x.fillStyle = GOLD; x.fillRect(Math.round(cx - 2), Math.round(cy - 90), 4, 50); x.restore() }
    }
  }

  // speech bubbles + the dog
  function drawOverlays(t, Rs) {
    if (t >= T.dog[0] && t < T.dogOff[1]) {
      const xIn = lerp(1160, 860, ease.outCubic(prog(t, ...T.dog))), xOff = lerp(0, 500, ease.inCubic(prog(t, ...T.dogOff)))
      drawDog(x, xIn + xOff, GROUND + 6, 7, t, t < T.dog[1] || t >= T.dogOff[0])
    }
    const bub = (text, [t0, t1], bx, by, opts) => { if (t < t0 || t >= t1) return; const k = pop01(t, t0, 0.25, 2.4) * (1 - prog(t, t1 - 0.15, t1)); drawBubble(x, bx, by, text, k, opts) }
    bub('*cricket*', [T.crick, T.snort], 540, 900, { size: 30, tail: 'none', col: '#c9a6ff' })
    bub('pfff—', [T.snort, T.fall[0] + 0.1], 470, 900, { size: 44, tail: 'left' })
    bub('SHE LAUGHED!', T.laughed, 280, 900, { size: 46, tail: 'left', col: '#ffe08a' })
    bub('*sob*', [T.relapse + 0.3, T.ring[1] + 0.2], 760, 690, { size: 30, tail: 'none', col: '#9fe8ff' })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      drawDays(t)
      let Rs = {}
      if (t < T.out[1] + 0.02) {
        drawFallingCards(t)
        Rs = drawCast(t)
        drawPhone(t)
        drawOverlays(t, Rs)
        smoke(t, T.relapse - 0.03, 540, 1135, 80)
        sparkles(t, 540, 960, T.snap, 14, 360, 0.2, 0.9, 28)
        sparkles(t, 540, 960, T.snap2, 14, 360, 0.5, 0.9, 28)
        sparkles(t, 540, 1080, T.c3 + 0.1, 16, 320, 0.3, 0.9, 30)
        sparkles(t, 540, 975, T.flip[1], 12, 260, 0.5, 0.8, 26)
        confetti(t, T.laughed[0], 420, 1000, 60, 5)
        confetti(t, T.castBack + 0.3, 540, 1000, 50, 9, { spread: 1.2, up: 0.8 })
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      bug.style.opacity = String(clamp(prog(t, 0.3, 0.6)) * (1 - prog(t, STORY_END - 0.25, STORY_END)))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the 2nd + 4th: 11.71 deal into day 12, 25.04 flip into day 40).
// The others stay inert: 6.8 (→ day 5), 18.0 (→ day 20), 32.5 (→ the lesson).
export const CUTS = [6.8, { t: T.c1, kind: 'deal' }, T.s4, { t: T.c3, kind: 'flip' }, 32.5]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell in the D-major palette; the engine re-keys them into Bb)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const chirp = (t, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t + i * 0.045), 4186, gain, 0.4])
const cheers = (t0, t1, n = 14, gain = 0.07) => { const out = [['swell', r3(t0), r3(t1), { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < n; k++) out.push(['clap', r3(t0 + 0.08 + k * ((t1 - t0) / n) + (k * 0.037) % 0.05), { ...FX, gain, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const laugh = (t0, n = 8) => Array.from({ length: n }, (_, i) => ['chip', r3(t0 + i * 0.13), 660 + (i % 2) * 120, 0.08, { ...FX, wave: 'square', duty: 0.25, slide: -3, gain: 0.02, decay: 0.05, sustain: 0.4 }])
const PITCH = { [LIB]: 900, [TAU]: 560, [SAG]: 760, [ARI]: 640, [STARS]: 1046.5 }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · day 1
  ...head(T.h0, 1, T.h0Land, 0),
  ...T.arrive.map((a, i) => ['pop', a, NOTE[1 + i], 0.035, (i % 2 ? 0.4 : -0.4)]),
  ['riser', 1.0, T.snap, 0.03], ['bell', T.snap, 1760, 0.04, 1.8, 0], ['glitter', T.snap, r3(T.snap + 0.9)],
  ...sob(r3(T.l1 + 1.2), 1318.5, 3), ...sob(r3(T.l2 + 1.3), 1174.7, 3),
  // 2 · day 5
  ...head(T.h1, 1, T.h1Land, 2),
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(BEAT(12 + i)), 0.02]),
  ['whoosh', T.trip, 0.25, 0.05], ['tom', r3(T.trip + 0.1), 90, { ...FX, gain: 0.16, decay: 0.15 }], ['pop', r3(T.trip + 0.3), 880, 0.03, 0],
  // 3 · day 12
  ...head(T.h2, 1, T.h2Land, 4),
  ...Array.from({ length: 4 }, (_, i) => ['tick', r3(T.dog[0] + i * 0.12), 0.03]), ['pop', r3(T.dog[1] + 0.1), 1567.98, 0.025, 0.5],
  ['tapeStop', r3(TW.their), 0.5],
  ['boom', T.relapse, 0.18], ['whoosh', T.relapse, 0.3, 0.06],
  ...head(T.h2b, 4, T.h2bLand, 1, 0.02),
  ...sob(r3(T.relapse + 0.3), 1318.5, 3),
  ['whoosh', T.ring[0], 0.3, 0.04], ['bell', T.snap2, 1567.98, 0.035, 1.6, 0], ['glitter', T.snap2, r3(T.snap2 + 0.7)],
  // 4 · day 20
  ...head(T.h3, 1, T.h3Land, 3),
  ...chirp(r3(T.crick + 0.05)), ...chirp(r3(T.crick + 0.3), 0.011),
  ['pop', T.snort, 330, 0.05, 0], ...laugh(r3(T.snort + 0.15), 10),
  ['whoosh', T.fall[0], 0.25, 0.04], ['tom', r3(T.fall[1]), 80, { ...FX, gain: 0.2, decay: 0.18 }],
  ...cheers(r3(T.laughed[0]), r3(T.laughed[0] + 1.2), 12, 0.07), ['glitter', T.laughed[0], r3(T.laughed[0] + 0.6)],
  ...sob(r3(T.laughed[0] + 0.4), 1318.5, 3),
  // 5 · day 40
  ...head(T.h4, 1, T.h4Land, 5),
  ['swell', r3(T.c3), r3(T.c3 + 2), { bus: 'sfx', gain: 0.03, f0: 400, f1: 1200 }],
  ['tick', T.shades, 0.05], ['pop', r3(T.shades + 0.3), 1567.98, 0.03, 0.2],
  // 6 · tonight's deck
  ['whoosh', T.phone[0], 0.45, 0.05], ...head(T.h5, 1, T.h5Land, 3),
  ...[0, 1, 2, 3, 4].map(i => ['tick', r3(T.deal + i * T.dealGap + 0.2), 0.05]),
  ['tick', r3(T.flip[0] + 0.12), 0.05], ['bell', T.flip[1], 1318.51, 0.035, 1.4, 0], ['glitter', r3(T.flip[0] + 0.1), r3(T.flip[1] + 0.4)],
  ['bell', T.glow, 1567.98, 0.025, 1.2, 0.2],
  ['whoosh', T.phoneAway[0], 0.35, 0.04],
  // 7 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...DAYS.map((d, i) => ['pop', r3(T.lesson + 0.3 + i * 0.3), NOTE[i + 1], 0.02, -0.4 + i * 0.2]),
  // 8 · the sky's still dealing
  ...wordPops(T.h6, 3, 0.08, 1, 0.022), ['pop', T.h6Land, 1174.66, 0.045, 0], ['pluck', T.h6Land, 880, 0.04, 0.8, 0],
  ...[0, 1, 2, 3].map(i => ['tick', r3(T.castBack + 0.3 + i * 0.55), 0.025]), ['glitter', r3(T.castBack + 0.3), r3(T.castBack + 1.2)],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
