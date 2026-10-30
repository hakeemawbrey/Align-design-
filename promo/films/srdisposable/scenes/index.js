// srdisposable — "We've made people disposable." (Star Talk Remix of promo/films/disposable, 60 s vertical, slow and warm)
// story 0–55.6, then the end card. The stars run the sky's LOST & FOUND, where everyone who got swiped, ghosted or left
// on read ends up: little grey stars riding a conveyor belt, each with a tag.
//   0.0–5.2   "We've made people disposable."  The belt rolls; grey stars with tags (SWIPED LEFT, GHOSTED, LEFT ON READ…).
//             THE STARS: "this is where the swiped ones end up."
//   5.3–12.2  "Every one of them had a name."  ♋ AUNTIE CANCER lifts one off the belt: GHOSTED · AFTER 3 DATES.
//             CANCER: "this one made soup for someone." ♉ AUNTIE TAURUS: "and got 'seen' 3 days ago." Pisces sobs.
//  12.3       card cut (flip).
//  12.35–18.7 "Swiped. Seen. Next."  The belt speeds up (a candy-factory panic): the aunties scramble, a grey star bonks
//             off Taurus' head. TAURUS: "SLOW. IT. DOWN." ♑ CAPRICORN slams the big STOP button: the belt dies (tape
//             stop). Crickets.
//  18.9–25.5 "Nobody is disposable."  THE STARS: "they're not broken. they got rushed." One by one the grey stars get their
//             colour and their glow back; the tags fall off. "people need time to shine."
//  25.7       card cut (deal).
//  25.8–31.4 "Tonight's deck."  The belt rolls away; the restored stars hop down into a row. Three cards deal in, slowly.
//             THE STARS: "a few people a night. chosen with care."
//  31.5–39.2 "What matters, said first."  The middle card comes forward; ✕ GHOSTING, ✕ READS, NO REPLY, ✕ FLAKY PLANS stamp
//             on, one at a time. CANCER: "if it ends it, it goes on the card."
//  39.35      card cut (flip).
//  39.45–44.8 "Nobody gets picked alone."  Two cards slide together and lock: YOU BOTH CHOSE. TAURUS: "you both choose.
//             nobody gets tossed."
//  45.04–50.2 ★ LESSON UNLOCKED: "People aren't disposable. Neither are you."  +1 SELF-WORTH
//  50.3–55.45 "Be chosen."  The restored stars hop in a row, Pisces cries, the gold star winks; the end card at 55.6.
// One canvas, DOM type + dialogue boxes + the shared LESSON banner above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText, buildLesson, lessonCues } from '../../lesson.js'
import { drawTears, drawWhistle, drawBitmap } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5c6e', GREY = '#8a8ca8'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)

export const T = {
  black: [0, 0.4],
  h1: 0.3, h1Land: 1.3, h1Out: [5.0, 5.2],
  l1: 1.7, closeA: 5.2,
  h2: 5.35, h2Land: 6.05, h2Out: [12.0, 12.2], lift: [5.5, 6.1], tagZoom: 6.2, putBack: [11.5, 11.95],
  l2: 6.5, l3: 9.4, closeB: 12.2, sob: 10.7,
  cut1: 12.3,
  h3: 12.4, h3Land: 13.1, h3Out: [18.5, 18.7], ramp: [12.4, 15.5], bonk: 14.8,
  l4: 15.6, closeC: 18.7,
  stop: BEAT(30), capIn: 16.6, crick: [17.95, 18.35],
  h4: 18.95, h4Land: 19.8, h4Out: [25.35, 25.55],
  l5: 19.3, restore: [21.4, 23.4], l6: 23.0, closeD: 25.55,
  cut2: 25.7,
  h5: 25.85, h5Land: 26.3, h5Out: [31.2, 31.4], hopOff: [25.8, 26.6], deal: [26.3, 27.0, 27.7],
  l7: 27.2, closeE: 31.4,
  h6: 31.55, h6Land: 32.25, h6Out: [39.05, 39.25], fwd: [31.6, 32.2], stamps: [32.8, 34.0, 35.2],
  l8: 35.65, closeF: 39.25,
  cut3: 39.35,
  h7: 39.45, h7Land: 40.1, h7Out: [44.6, 44.8], slide: [39.5, 40.3], lock: 40.4, hearts: 40.7,
  l9: 41.0, closeG: 44.75,
  lesson: BEAT(80), lessonOut: [49.9, 50.2],                                    // 45.044
  h8: 50.35, h8Land: 50.75, h8Out: [55.15, 55.45], rowUp: [50.3, 50.9], wink: 52.6, cheer: 51.2,
  out: [55.05, 55.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: "People aren’t | *disposable.* | Neither are you.", chip: '+1 SELF-WORTH', accentColor: GOLD }

// ── the dialogue
const STARS = 'THE STARS', CAN = '♋ AUNTIE CANCER', TAU = '♉ AUNTIE TAURUS', CAP = '♑ CAPRICORN'
const CANC = '#7fd6ff', TAUC = '#ffd27a'
const LA_ = [{ t: T.l1, speaker: STARS, text: 'this is where the swiped ones *end up.*' }]
const LB_ = [{ t: T.l2, speaker: CAN, color: CANC, text: 'this one made *soup* for someone.' }, { t: T.l3, speaker: TAU, color: TAUC, text: "and got 'seen' *3 days ago.*" }]
const LC_ = [{ t: T.l4, speaker: TAU, color: TAUC, text: 'SLOW. IT. *DOWN.*' }]
const LD_ = [{ t: T.l5, speaker: STARS, text: "they're not broken. they got *rushed.*" }, { t: T.l6, speaker: STARS, text: 'people need *time* to shine.' }]
const LE_ = [{ t: T.l7, speaker: STARS, text: 'a few people a night. *chosen* with care.' }]
const LF_ = [{ t: T.l8, speaker: CAN, color: CANC, text: 'if it ends it, it goes on the *card.*' }]
const LG_ = [{ t: T.l9, speaker: TAU, color: TAUC, text: 'you both choose. *nobody* gets tossed.' }]
export const ALL_LINES = [...LA_, ...LB_, ...LC_, ...LD_, ...LE_, ...LF_, ...LG_]
const BOXES = [[LA_, T.closeA], [LB_, T.closeB], [LC_, T.closeC], [LD_, T.closeD], [LE_, T.closeE], [LF_, T.closeF], [LG_, T.closeG]]
const CPS = 26
const HOPS_OF = sp => talkHops(ALL_LINES, sp, { cps: CPS })
void lineTimes

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const mixc = (a, b, k) => { const A1 = parseInt(a.slice(1), 16), B1 = parseInt(b.slice(1), 16); const c = s => Math.round(lerp((A1 >> s) & 255, (B1 >> s) & 255, clamp(k))).toString(16).padStart(2, '0'); return `#${c(16)}${c(8)}${c(0)}` }

// ── the belt: speed (px/s) and its integral, tabulated once (pure)
const speedAt = t => t < T.ramp[0] ? 70 : t < T.ramp[1] ? lerp(70, 760, ease.inQuad(prog(t, ...T.ramp))) : t < T.stop ? 760 : lerp(760, 0, ease.outCubic(prog(t, T.stop, T.stop + 0.45)))
const DT = 0.01, POS = (() => { const a = [0]; for (let i = 1; i <= 6000; i++) a.push(a[i - 1] + speedAt((i - 0.5) * DT) * DT); return a })()
const beltPos = t => { const f = clamp(t, 0, 59.99) / DT, i = Math.floor(f); return lerp(POS[i], POS[i + 1], f - i) }
const SLOT = 240, NS = 6, BELT_Y = 1095
const TAGS = ['SWIPED LEFT', 'GHOSTED', 'LEFT ON READ', 'UNMATCHED', "'TOO SHORT'", "SAID 'HEY'", 'SEEN · NO REPLY', 'SWIPED · 0.4 s']
const slotX = (i, t) => { const v = i * SLOT + beltPos(t); return { x: (v % (NS * SLOT)) - SLOT, lap: Math.floor(v / (NS * SLOT)) } }
// which slots are on screen once the belt stops (they get restored and become the end crowd)
const STOPPED = Array.from({ length: NS }, (_, i) => ({ i, x: slotX(i, 30).x })).filter(s => s.x > 40 && s.x < 1040).sort((a, b) => a.x - b.x)
const RESTORE_SIGNS = ['aries', 'leo', 'virgo', 'aquarius', 'sagittarius', 'libra']
const ROW_X = n => STOPPED.length === 1 ? 540 : lerp(300, 780, n / (STOPPED.length - 1))

// ── the cast
const CAST = {
  g0: { col: STAR.sky, glyph: null, seed: 3, gold: true },
  can: { ...signStar('cancer'), seed: 11 },
  tau: { ...signStar('taurus'), seed: 17 },
  pis: { ...signStar('pisces'), seed: 29 },
  cap: { ...signStar('capricorn'), seed: 37 },
}
for (const k in CAST) if (!CAST[k].col) CAST[k].col = CAST[k].color
const ORDER = ['pis', 'can', 'tau', 'cap', 'g0']
const LAY = {
  A: { g0: [540, 640, 170], can: [190, 780, 170], tau: [890, 780, 170], pis: [150, 1320, 110] },
  B: { g0: [880, 600, 140], can: [190, 780, 170], tau: [890, 790, 170], pis: [150, 1320, 110] },
  C: { g0: [540, 640, 150], can: [190, 780, 170], tau: [890, 780, 170], pis: [150, 1320, 110], cap: [790, 1300, 140] },
  D: { g0: [925, 1250, 140], can: [140, 560, 120], tau: [940, 560, 120], pis: [150, 1250, 110] },
  E: { g0: [165, 1265, 150], can: [120, 580, 112], tau: [960, 580, 112], cap: [918, 1265, 140] },
  F: { g0: [540, 620, 170], can: [150, 600, 130], tau: [930, 600, 130], cap: [930, 1260, 130], pis: [150, 1260, 120] },
}
const SEG = [{ t: 0, L: LAY.A }, { t: T.h2 - 0.05, L: LAY.B, anim: 0.4 }, { t: T.h3, L: LAY.A, anim: 0.4 }, { t: T.capIn, L: LAY.C, anim: 0.35 },
  { t: T.cut2, L: LAY.D }, { t: T.cut3, L: LAY.E }, { t: T.h8 - 0.05, L: LAY.F, anim: 0.45 }]
function place(k, t) {
  let i = 0
  for (let j = 0; j < SEG.length; j++) if (t >= SEG[j].t) i = j
  const S = SEG[i], cur = S.L[k], stag = (CAST[k].seed % 7) * 0.03
  if (S.anim && i > 0) {
    const prev = SEG[i - 1].L[k], t0 = S.t + stag, p = prog(t, t0, t0 + S.anim)
    if (cur && prev) { const e = ease.inOutCubic(p); return { p: [lerp(prev[0], cur[0], e), lerp(prev[1], cur[1], e) - Math.sin(Math.PI * p) * 50, lerp(prev[2], cur[2], e)], pk: 1 } }
    if (cur) return { p: [cur[0], lerp(2150, cur[1], ease.outBack ? ease.outCubic(p) : p), cur[2]], pk: 1 }
    if (prev) { const o = popOut(t, [t0, t0 + 0.28]); return o > 0 ? { p: prev, pk: o } : null }
    return null
  }
  if (!cur) return null
  let pk = 1
  if (i === 0) pk = pop01(t, 0.5 + stag * 4, 0.45, 1.8)
  return { p: cur, pk }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const ims = await Promise.all(['card-profile-1.png', 'card-profile-2.png', 'card-profile-3.png', 'card-profile-5.png'].map(loadImg))
  const PROF = ims.map(im => bake(im, 640))
  const FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H = (text, o) => popText(root, text, { wobble: true, late: 1, fit: true, gap: 0.1, ...o })
  const HEADS = [
    [H("We've made people | *disposable.*", { top: 190, size: 108, accentSize: 156, at: T.h1, lateAt: T.h1Land, accentColor: RED }), T.h1Out],
    [H('Every one of them | had a *name.*', { top: 190, size: 108, accentSize: 156, at: T.h2, lateAt: T.h2Land, accentColor: GOLD }), T.h2Out],
    [H('Swiped. Seen. | *Next.*', { top: 190, size: 116, accentSize: 170, at: T.h3, lateAt: T.h3Land, accentColor: RED }), T.h3Out],
    [H('Nobody is | *disposable.*', { top: 190, size: 116, accentSize: 164, at: T.h4, lateAt: T.h4Land, accentColor: GOLD }), T.h4Out],
    [H("Tonight's *deck.*", { top: 215, size: 120, accentSize: 168, at: T.h5, lateAt: T.h5Land, accentColor: LAV }), T.h5Out],
    [H('What matters, | said *first.*', { top: 190, size: 112, accentSize: 160, at: T.h6, lateAt: T.h6Land, accentColor: PINK }), T.h6Out],
    [H('Nobody gets | picked *alone.*', { top: 190, size: 112, accentSize: 156, at: T.h7, lateAt: T.h7Land, accentColor: GOLD }), T.h7Out],
    [H('Be *chosen.*', { top: 215, size: 140, accentSize: 196, at: T.h8, lateAt: T.h8Land, accentColor: GOLD }), T.h8Out],
  ]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1430, width: 960, height: 290, close, cps: CPS }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }

  // ─────────────────────────────── the LOST & FOUND belt
  const beltK = t => 1 - ease.inCubic(prog(t, T.hopOff[0], T.hopOff[1]))       // rolls away down the frame
  function drawBelt(t) {
    const k = beltK(t)
    if (k <= 0) return
    const yo = (1 - k) * 900
    x.save(); x.translate(0, yo)
    // housing + belt
    x.fillStyle = '#241a4a'; x.fillRect(-20, BELT_Y + 40, 1120, 110)
    x.fillStyle = '#3a2d6e'; x.fillRect(-20, BELT_Y, 1120, 46)
    const off = beltPos(t) % 60
    x.fillStyle = '#2b2156'
    for (let xx = -60 + off; xx < 1120; xx += 60) x.fillRect(xx, BELT_Y + 4, 26, 38)
    x.fillStyle = 'rgba(201,166,255,0.35)'; x.fillRect(-20, BELT_Y, 1120, 4)
    for (let xx = 40; xx < 1100; xx += 120) {
      x.fillStyle = '#140d2a'; x.beginPath(); x.arc(xx, BELT_Y + 95, 30, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#5b4a9a'; x.lineWidth = 5; x.beginPath(); x.arc(xx, BELT_Y + 95, 30, beltPos(t) / 30, beltPos(t) / 30 + 4.2); x.stroke()
    }
    // the hazard stripe + label
    for (let xx = -20; xx < 1100; xx += 40) { x.fillStyle = (xx / 40) % 2 ? '#f2c75c' : '#1b1236'; x.fillRect(xx, BELT_Y + 150, 40, 14) }
    x.fillStyle = 'rgba(16,10,38,0.92)'; x.fillRect(310, BELT_Y + 66, 460, 58); x.strokeStyle = GOLD; x.lineWidth = 3; x.strokeRect(316, BELT_Y + 72, 448, 46)
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('LOST & FOUND · PEOPLE', 540, BELT_Y + 106)
    x.restore()
  }
  function greyStar(t, i) {
    const { x: sx, lap } = slotX(i, Math.min(t, 30))
    const n = STOPPED.findIndex(s => s.i === i)
    const rest = n >= 0 ? clamp(prog(t, T.restore[0] + n * 0.4, T.restore[0] + n * 0.4 + 0.5)) : 0
    const col = n >= 0 ? mixc(GREY, signStar(RESTORE_SIGNS[n]).color, rest) : GREY
    let px = sx, py = BELT_Y - 62, size = 112
    // hop off the belt into the row, then up into the finale
    if (n >= 0 && t >= T.hopOff[0]) {
      const p = prog(t, T.hopOff[0] + n * 0.08, T.hopOff[0] + n * 0.08 + 0.55), e = ease.inOutCubic(p)
      px = lerp(sx, ROW_X(n), e); py = lerp(BELT_Y - 62, 1335, e) - Math.sin(Math.PI * p) * 160; size = lerp(112, 84, e)
      const u = ease.inOutCubic(prog(t, ...T.rowUp))
      py = lerp(py, 1000, u); size = lerp(size, 120, u)
    } else if (t >= T.hopOff[0]) return
    if (px < -100 || px > 1180) return
    // the bonk: one of them flies up off the belt and bounces off Taurus
    const tag = TAGS[(i + lap * NS) % TAGS.length]
    const rstate = rest > 0.5
    const mood = t >= T.hearts && rstate ? 'heart' : rstate ? (t >= T.restore[1] + 0.3 ? 'happy' : 'sparkle') : t >= T.stop && t < T.restore[0] ? 'wide' : t > T.ramp[0] + 1.2 && t < T.stop ? 'wide' : 'sleepy'
    const hopT = n >= 0 ? [T.restore[0] + n * 0.4 + 0.2, T.hopOff[0] + n * 0.08, T.lock + n * 0.05, T.cheer + n * 0.07, T.h8Land + n * 0.05] : []
    const jitter = t > T.ramp[0] && t < T.stop ? Math.sin(t * 40 + i) * 4 * prog(t, ...T.ramp) : 0
    const k = popOut(t, T.out)
    const R = drawStarChar(x, px, py + jitter, size, t, { color: col, glyph: null, mood, look: rstate ? [0, 0] : [0, 1], seed: 60 + i, glow: lerp(0.15, 0.9, rest), blush: rstate ? undefined : false, hops: hopT, pop: k, zzz: false, tips: rest > 0.5, bob: rstate ? 4 : 1 })
    // the tag hangs below it until it's restored (then falls)
    const tf = prog(t, T.restore[0] + Math.max(0, n) * 0.4, T.restore[0] + Math.max(0, n) * 0.4 + 0.7)
    if ((n < 0 || tf < 1) && t < T.hopOff[0]) {
      x.save(); x.translate(R.x + 30, R.y + 70 + ease.inQuad(tf) * 260); x.rotate(0.08 + tf * 1.2); x.globalAlpha = 1 - tf
      x.font = `700 20px ${MONO}`; const tw = x.measureText(tag).width
      x.strokeStyle = BONE; x.lineWidth = 2; x.beginPath(); x.moveTo(-10, -20); x.lineTo(0, 0); x.stroke()
      x.fillStyle = '#efe6d6'; x.fillRect(0, 0, tw + 22, 34); x.fillStyle = '#1b1236'; x.textAlign = 'left'; x.fillText(tag, 11, 24)
      x.restore()
    }
  }
  function drawGreyStars(t) { for (let i = 0; i < NS; i++) greyStar(t, i) }

  // the one Cancer lifts off the belt
  function drawHero(t) {
    if (t < T.lift[0] || t > T.putBack[1]) return
    const up = ease.inOutCubic(prog(t, ...T.lift)), down = ease.inCubic(prog(t, ...T.putBack))
    const px = lerp(400, 540, up), py = lerp(BELT_Y - 62, 820, up) + down * 340, size = lerp(112, 190, up)
    const a = 1 - down
    const R = drawStarChar(x, px, py, size, t, { color: GREY, mood: t >= T.sob ? 'squint' : 'sleepy', look: [0, 1], seed: 77, glow: 0.2, blush: false, zzz: false, tips: false, alpha: a })
    const zp = easeOutBack(prog(t, T.tagZoom, T.tagZoom + 0.4), 2)
    if (zp > 0) {
      x.save(); x.globalAlpha = a; x.translate(R.x, R.y + size * 0.62); x.rotate(-0.04); x.scale(zp, zp)
      const l1 = 'GHOSTED', l2 = 'AFTER 3 DATES'
      x.font = `700 34px ${MONO}`; const tw = Math.max(x.measureText(l1).width, x.measureText(l2).width)
      x.fillStyle = BONE; x.fillRect(-tw / 2 - 24, 0, tw + 48, 104)
      x.strokeStyle = '#1b1236'; x.lineWidth = 3; x.strokeRect(-tw / 2 - 16, 8, tw + 32, 88)
      x.fillStyle = RED; x.textAlign = 'center'; x.fillText(l1, 0, 44); x.fillStyle = '#1b1236'; x.font = `700 28px ${MONO}`; x.fillText(l2, 0, 82)
      x.restore()
    }
    if (t >= T.sob) drawTears(x, [[R.x - R.size * 0.17, R.y + R.size * 0.07], [R.x + R.size * 0.17, R.y + R.size * 0.07]], t, T.sob, { cell: 6, strength: 0.6, alpha: a })
  }
  // the bonk: a grey star pops off the belt, arcs into Taurus' head, bounces off-screen
  function drawBonk(t) {
    const p = prog(t, T.bonk - 0.5, T.bonk + 0.6)
    if (p <= 0 || p >= 1) return
    let px, py
    if (t < T.bonk) { const q = prog(t, T.bonk - 0.5, T.bonk); px = lerp(600, 890, q); py = lerp(BELT_Y - 60, 700, q) - Math.sin(Math.PI * q) * 220 }
    else { const q = prog(t, T.bonk, T.bonk + 0.6); px = lerp(890, 1250, q); py = lerp(700, 300, q) - Math.sin(Math.PI * q) * 160 }
    x.save(); x.translate(px, py); x.rotate(t * 12)
    drawStarChar(x, 0, 0, 90, t, { color: GREY, mood: 'wide', look: [0, 0], blink: false, seed: 88, glow: 0.2, blush: false, tips: false })
    x.restore()
  }
  // the STOP button
  function drawStop(t) {
    const p = easeOutBack(prog(t, T.capIn, T.capIn + 0.4), 1.8) * (1 - ease.inCubic(prog(t, T.cut2 - 0.3, T.cut2)))
    if (p <= 0) return
    const press = pulse(t, T.stop - 0.05, 0.3)
    x.save(); x.translate(950, 1330); x.scale(p, p)
    x.fillStyle = '#3a3a5a'; x.fillRect(-70, 10, 140, 50)
    x.fillStyle = '#8a1f2a'; x.beginPath(); x.ellipse(0, 10 + press * 10, 62, 22, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#e8484f'; x.fillRect(-62, -16 + press * 12, 124, 26); x.beginPath(); x.ellipse(0, -16 + press * 12, 62, 22, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('STOP', 0, -8 + press * 12)
    x.restore()
  }

  // ─────────────────────────────── the deck, the stamps, the pair
  function drawImg(img, cx, cy, wBody, rot, a = 1) {
    if (!img || a <= 0) return
    const w = wBody / FACE_BODY, h = w * img.height / img.width
    x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(rot); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  const FAN = [[-1, 280, 0.16], [0, 540, 0], [1, 800, -0.16]]
  function drawDeck(t) {
    if (t < T.deal[0] || t >= T.h7) return
    const fw = ease.inOutCubic(prog(t, ...T.fwd)), o = prog(t, T.h6Out[0] - 0.1, T.h7)
    FAN.forEach(([side, fx, rot], i) => {
      const p = prog(t, T.deal[i], T.deal[i] + 0.7)
      if (p <= 0) return
      const e = easeOutBack(p, 1.3)
      let cx = lerp(540, fx, e), cy = lerp(2300, 940, e), wB = 280, a = 1
      if (side !== 0) { cx += side * fw * 70; cy += fw * 60; a = 1 - 0.6 * fw; wB = 280 - fw * 30 }
      else { cy -= fw * 30; wB = 280 + fw * 150 }
      drawImg(PROF[i], cx, cy, wB, side === 0 ? 0 : -rot, a * (1 - o))
    })
    const STAMPS = [['✕ GHOSTING', 1050], ['✕ READS, NO REPLY', 1135], ['✕ FLAKY PLANS', 1220]]
    STAMPS.forEach(([txt, y], i) => {
      const t0 = T.stamps[i]
      if (t < t0 - 0.15) return
      const p = prog(t, t0 - 0.15, t0), sc = t < t0 ? lerp(2.4, 1, ease.inCubic(p)) : 1 + 0.08 * pulse(t, t0, 0.2)
      x.save(); x.globalAlpha = (t < t0 ? p : 1) * (1 - o); x.translate(540, y); x.rotate(-0.05 + i * 0.04); x.scale(sc, sc)
      x.font = `700 42px ${MONO}`; const tw = x.measureText(txt).width
      x.fillStyle = 'rgba(20,8,24,0.92)'; x.fillRect(-tw / 2 - 24, -38, tw + 48, 76)
      x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-tw / 2 - 18, -32, tw + 36, 64)
      x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
      x.restore()
    })
  }
  function drawPair(t) {
    if (t < T.h7 - 0.1 || t >= T.h8) return
    const p = ease.inOutCubic(prog(t, ...T.slide)), ip = easeOutBack(prog(t, T.h7 - 0.1, T.h7 + 0.4), 1.6)
    const k = 1 - prog(t, T.lesson - 0.3, T.lesson + 0.2) * 0.5 - prog(t, T.lessonOut[1], T.h8)
    const lk = clamp(prog(t, T.lock, T.lock + 0.5))
    if (lk > 0) { const gg = x.createRadialGradient(540, 960, 0, 540, 960, 620); gg.addColorStop(0, rgba(GOLD, 0.35 * lk * k)); gg.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gg; x.fillRect(0, 340, W, 1240) }
    drawImg(PROF[0], lerp(-200, 380, p), 960, 290 * ip, lerp(-0.4, -0.08, p), k)
    drawImg(PROF[3], lerp(1280, 700, p), 960, 290 * ip, lerp(0.4, 0.08, p), k)
    if (lk > 0) {
      const hb = 1 + 0.15 * Math.sin((t - T.lock) * 6)
      drawBitmap(x, ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], 540, 960, 14 * easeOutBack(lk, 2.6) * hb, { X: GOLD }, { alpha: k })
      x.save(); x.globalAlpha = lk * k * (1 - prog(t, T.lesson - 0.4, T.lesson)); x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('YOU BOTH CHOSE', 540, 590); x.restore()
    }
  }

  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4]) }
    x.restore()
  }

  // ─────────────────────────────── the cast
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
  const SCR = Array.from({ length: 14 }, (_, i) => +(T.ramp[0] + 1.4 + i * 0.13 * (1 - i / 30)).toFixed(3)).filter(v => v < T.stop)
  const HOPS = {
    g0: [...HOPS_OF(STARS), ...T.stamps, T.lock, T.cheer, T.h8Land],
    can: [...HOPS_OF(CAN), ...SCR.filter((_, i) => i % 2 === 0), ...T.stamps.map(s => s + 0.05), T.lock + 0.05, T.cheer + 0.05],
    tau: [...HOPS_OF(TAU), ...SCR.filter((_, i) => i % 2 === 1), ...T.stamps.map(s => s + 0.08), T.lock + 0.08, T.cheer + 0.1],
    pis: [T.lock + 0.1, T.cheer + 0.12, ...T.stamps.map(s => s + 0.1)],
    cap: [...HOPS_OF(CAP), T.stop, ...T.stamps.map(s => s + 0.03), T.lock + 0.03, T.cheer + 0.04],
  }
  function stateOf(k, t, p) {
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0, rot = 0
    if (t < T.h2) { look = toward(p, 540, BELT_Y); mood = t > T.h1Land ? 'squint' : 'neutral'; if (k === 'pis') tears = 0.4 }
    else if (t < T.h3) {
      look = toward(p, 540, 820); mood = t >= T.tagZoom ? 'wide' : 'neutral'
      if (k === 'can' && t >= T.l2) { look = [0, 0]; mood = 'sparkle' }
      if (t >= T.l3) mood = 'squint'
      if (k === 'tau' && t >= T.l3) { mood = 'eyeroll' }
      if (k === 'pis') tears = t >= T.sob ? 1 : 0.5
    } else if (t < T.h4) {
      const sp = prog(t, ...T.ramp)
      look = [Math.round(Math.sin(t * (2 + sp * 10))), 1]; mood = sp > 0.3 ? 'wide' : 'neutral'; blink = sp > 0.3 ? false : undefined
      if (sp > 0.3 && (k === 'can' || k === 'tau') && t < T.stop) dx = Math.sin(t * 22 + p[0]) * 26 * sp
      if (k === 'tau' && t >= T.bonk && t < T.bonk + 1.0) { mood = 'eyeroll'; squash = 0.25 * Math.exp(-(t - T.bonk) * 4) * Math.abs(Math.cos((t - T.bonk) * 18)); dy = 18 * Math.exp(-(t - T.bonk) * 3) }
      if (k === 'tau' && t >= T.l4 && t < T.stop) { mood = 'squint'; look = [0, 0] }
      if (t >= T.stop) { mood = 'wide'; dx = 0; look = toward(p, 950, 1330); const kk = t - T.stop; squash = -0.2 * Math.exp(-kk * 6) * Math.cos(kk * 22); for (const c of T.crick) { const b = t - (c + p[0] / W * 0.25); if (b >= 0 && b < 0.13) blink = 1 } }
      if (k === 'cap') { mood = 'squint'; look = [1, 0] }
      if (k === 'pis') tears = 0.7
    } else if (t < T.cut2) {
      look = toward(p, 540, BELT_Y); mood = t >= T.restore[0] ? 'sparkle' : 'neutral'
      if (k === 'g0' && t < T.restore[0]) look = [0, 0]
      if (t >= T.restore[1]) mood = 'happy'
      if (k === 'pis') tears = t >= T.restore[0] ? 1 : 0.5
    } else if (t < T.h7) {
      look = toward(p, 540, 980); mood = 'sparkle'
      if (t >= T.stamps[0] - 0.15) mood = 'wide'
      for (const s of T.stamps) if (t >= s && t < s + 0.6) mood = 'happy'
      if (k === 'can' && t >= T.l8) { look = [0, 0]; mood = 'happy' }
      if (k === 'pis') tears = 0.5
    } else if (t < T.h8) {
      look = toward(p, 540, 960); mood = 'wide'
      if (t >= T.hearts + p[0] / W * 0.15) mood = 'heart'
      if (k === 'tau' && t >= T.l9 && t < T.lesson) { look = [0, 0]; mood = 'happy' }
      if (t >= T.lesson) { mood = 'sparkle'; look = toward(p, 540, 700) }
      if (k === 'pis') tears = 1
    } else {
      look = [0, 0]; mood = 'happy'
      if (k === 'g0' && t >= T.wink) mood = 'wink'
      if (k === 'pis') { tears = 1; mood = 'squint' }
    }
    return { mood, look, blink, squash, dx, dy, tears, rot }
  }
  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    for (const k of ORDER) {
      const P = place(k, t)
      if (!P) continue
      const p = P.p, pk = P.pk * ok
      if (pk <= 0.02) continue
      const C = CAST[k], st = stateOf(k, t, p)
      const R = drawStarChar(x, p[0] + st.dx, p[1] + st.dy, p[2], t, { color: C.col, glyph: p[2] >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: C.gold ? 1.1 : 0.85, bob: p[2] * 0.04 })
      if (st.tears > 0) { const S = R.size, ey = R.y + S * 0.07, exo = S * 0.17; drawTears(x, [[R.x - exo, ey], [R.x + exo, ey]], t, 0, { cell: Math.max(4, S / 22), strength: st.tears }) }
      if (k === 'cap' && t < T.cut2) { const blow = pulse(t, T.stop - 0.02, 0.62); drawWhistle(x, R.x + R.size * 0.03, R.y + R.size * 0.13, R.size / 24, { blow, t, flip: true }) }
    }
  }

  function drawWorld(t) {
    const warm = clamp(prog(t, T.restore[0], T.restore[1]))
    drawSky(x, t, { ...SKY_H, dim: lerp(0.4, SKY_H.dim, warm), stars: lerp(0.6, 1, warm) })
    if (warm < 1) { x.fillStyle = rgba('#0b1028', 0.3 * (1 - warm)); x.fillRect(0, 0, W, 1920) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      if (t < T.out[1] + 0.02) {
        drawBelt(t)
        drawDeck(t)
        drawPair(t)
        drawStop(t)
        drawCast(t)
        drawGreyStars(t)
        drawHero(t)
        drawBonk(t)
        STOPPED.forEach((s, n) => sparkles(t, s.x, BELT_Y - 62, T.restore[0] + n * 0.4 + 0.25, 8, 140, n, 0.6, 22))
        sparkles(t, 540, 960, T.lock, 14, 380, 0.2, 0.8, 30)
        for (const s of T.stamps) sparkles(t, 540, 1130, s, 8, 260, s, 0.5, 22)
        sparkles(t, 540, 1000, T.cheer, 16, 460, 0.4, 0.9, 30)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: the default selection keeps 12.3 (flip) and 25.7 (deal); 39.35 (flip) is kept too, so there is
// a card cut every ~13.5 s. 5.25 and 18.85 stay inert.
export const CUTS = [5.25, { t: T.cut1, kind: 'flip' }, 18.85, { t: T.cut2, kind: 'deal' }, { t: T.cut3, kind: 'flip', dir: -1, keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are moved into the film's key by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.1, base, gain), ['pop', land, 1174.66, 0.045, 0], ['pluck', land, 1174.66, 0.04, 0.8, 0]]
const chirp = (t0, gain = 0.013) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const sob = (t0, gain = 0.018) => [['pop', r3(t0), 659.25, gain, -0.3], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, -0.3], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, -0.3]]
const whistle = (t0, len = 0.5, gain = 0.026) => Array.from({ length: Math.round(len / 0.03) }, (_, i) => ['pop', r3(t0 + i * 0.03), i % 2 ? 2793.83 : 2349.32, gain * (1 - 0.4 * i / (len / 0.03)), 0.1])
const cheer = (t0, big = false) => [['whoosh', r3(t0 + 0.2), big ? 0.9 : 0.4, big ? 0.05 : 0.03], ['glitter', r3(t0), r3(t0 + (big ? 0.6 : 0.25))], ['pop', r3(t0 + 0.02), NOTE[big ? 5 : 3], 0.03, 0]]
const PITCH = { [STARS]: 880, [CAN]: 739.99, [TAU]: 587.33, [CAP]: 659.25 }

export const CUES = [
  ...head(T.h1, 3, T.h1Land, 0),
  ...Array.from({ length: 20 }, (_, i) => ['tick', r3(0.6 + i * 0.6), 0.008]),
  ...head(T.h2, 5, T.h2Land, 2), ['whoosh', T.lift[0], 0.5, 0.03], ['pop', T.tagZoom, 880, 0.035, 0], ...sob(T.sob), ...sob(r3(T.sob + 0.7), 0.015),
  ['whoosh', T.putBack[0], 0.4, 0.025],
  ...head(T.h3, 3, T.h3Land, 4),
  ...Array.from({ length: 28 }, (_, i) => { const tt = T.ramp[0] + 0.2 + i * (0.22 - i * 0.0055); return ['tick', r3(tt), 0.012 + i * 0.0006] }).filter(c => c[1] < T.stop),
  ['riser', T.ramp[0] + 1, T.stop, 0.03],
  ['whoosh', r3(T.bonk - 0.45), 0.4, 0.035], ['boom', T.bonk, 0.1], ['pop', T.bonk, 392, 0.05, 0.3], ['pop', r3(T.bonk + 0.12), 523.25, 0.04, 0.4],
  ['whoosh', T.capIn, 0.3, 0.035],
  ['boom', T.stop, 0.18], ...whistle(r3(T.stop + 0.02), 0.45), ['tapeStop', T.stop, 0.6],
  ...T.crick.flatMap(c => [...chirp(c), ...chirp(r3(c + 0.22), 0.01)]),
  ...head(T.h4, 2, T.h4Land, 1),
  ...[0, 1, 2, 3, 4].map(n => ['bell', r3(T.restore[0] + n * 0.4 + 0.25), NOTE[(n * 2) % 7] * 2, 0.03, 1.4, (n - 2) * 0.2]), ['glitter', T.restore[0], T.restore[1]],
  ...head(T.h5, 1, T.h5Land, 3), ['whoosh', T.hopOff[0], 0.6, 0.035],
  ...T.deal.flatMap((d, i) => [['tick', r3(d + 0.5), 0.045], ['pop', r3(d + 0.5), NOTE[i * 2], 0.028, (i - 1) * 0.3]]),
  ...head(T.h6, 3, T.h6Land, 0), ['whoosh', T.fwd[0], 0.4, 0.03],
  ...T.stamps.flatMap(s => [['boom', s, 0.1], ['tick', s, 0.05], ...cheer(r3(s + 0.08))]),
  ...head(T.h7, 4, T.h7Land, 2), ['whoosh', T.slide[0], 0.6, 0.035],
  ['bell', T.lock, 1760, 0.04, 2, 0], ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['pluck', r3(T.lock + i * 0.012), f, 0.028, 1.4, (i - 1.5) * 0.2]), ['glitter', T.lock, r3(T.lock + 0.6)],
  ...sob(r3(T.hearts + 0.5), 0.014),
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Dm' }),
  ...head(T.h8, 1, T.h8Land, 2), ['bell', r3(T.h8Land + 0.02), 1760, 0.03, 1.8, 0], ...cheer(T.cheer, true),
  ['tick', T.wink, 0.035], ['pluck', r3(T.wink + 0.02), 1318.51, 0.028, 0.6, 0.2],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH, gain: 0.016 }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
