// stgym — "Love Gym." (45 s vertical Align ad, Star Talk "Wild Lessons" #22, music: house · A, a gym-class workout).
// Story 0–40.6, then the shared end card. Brief: promo/films/STARTALK-WILD.md §22 (rules: STARTALK4.md).
//   0.0–3.25   A floating gym in the night sky; the LOVE GYM neon flickers on. ♈ COACH ARIES (headband, whistle) blows the
//              whistle: "Welcome to | *Love Gym.*"  ARIES: "it's FEELINGS DAY. *nobody* skips it."  ♑ CAPRICORN (your star)
//              squints from the lifting platform. ♓ Pisces is already on the CRY CARDIO treadmill, sobbing backwards.
//   3.3        card cut. "Set one: | *“I missed you.”*"  A light bar (tag: I MISSED YOU ×3) drops onto Capricorn's top
//              point. CAP: "can I just do cardio? for a decade?" Three squats on the beat, each rep louder:
//              "i missed you." (whisper) · "i missed you." · "I MISSED YOU!!" (blurted; it blushes). ARIES: "LOOK. AT. THAT. *FORM.*"
//   9.5        "Set two: | *“that hurt.”*"  The tag flips: THAT HURT MY FEELINGS ×5. Two fake reps, "it's fine." /
//              "it's FINE." → the board buzzes NO REP. ARIES: "“it's fine” is NOT a rep." Then five real reps, fast, 1/5…5/5.
//              CAP: "huh. I feel… *lighter?*"
//   17.45      card cut. "The *heaviest* | lift."  Drumroll; a huge bar (I LIKE YOU · 1 REP) slams down and squashes it flat.
//              CAP: "that's not a weight. it's a *confession.*"  ARIES spots: "I got you. *breathe.*"
//   22.82      "Lift… | *lift…*"  The music grinds down (tape stop) while it shakes the bar up inch by inch.
//   24.49      (lift) LOCKOUT: "I LIKE YOU." Confetti, cheers; Pisces flies off the back of its treadmill. "Personal | *best.*"
//              A notification: "them · i like you too!!" Capricorn faints with heart eyes; the giant bar floats away like
//              a balloon. ARIES: "see? it gets *lighter* every rep." "It gets | *lighter.*" It pops back up and juggles a
//              tiny dumbbell.
//   30.45      card cut. 30.6 ★ LESSON UNLOCKED: "Feelings are a muscle. | Use them *daily.*" (+1 STRENGTH)
//   35.15      "Your daily | *rep.*"  A talk card deals in: "What did you | miss today?" ARIES: "one talk card a day.
//              *both* of you play."
//   38.8       "Same time | *tomorrow.*"  The whistle; Capricorn groans… then flexes. Pisces happy-sobs. All out by 40.45.
// One canvas (sky + gym + cast), DOM type, dialogue boxes, the shared lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starAt, drawBarbell, drawDumbbell, drawSweatband, drawWhistle, drawTreadmill, drawNeon, drawBoard, drawNotif, drawTear, drawSweat, drawPixelHeart, makeTalkCard, rgba } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0', RED = '#ff5d6c', CYAN = '#7fe0ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)
export const KEY = 'A'

// ── the timeline
const REPS2 = [23, 24, 25, 26, 27].map(BEAT)
export const T = {
  black: [0, 0.25], neon: [0.08, 0.62],
  ariIn: 0.22, whistle1: BEAT(0), h1: 0.3, h1Land: 0.86, l1: 1.0, capIn: 1.25, pisIn: 1.6, h1Out: [3.02, 3.2],
  cut1: 3.3,
  barIn: [3.3, 3.62], h2: 3.36, h2Land: 3.7, l2: 4.05,
  rep1: BEAT(9), rep2: BEAT(11), rep3: BEAT(13), l3: 8.15, h2Out: [9.22, 9.4],
  flip: [9.42, 9.72], h3: 9.5, h3Land: 9.86,
  fake1: BEAT(17), fake2: BEAT(19), l4: 11.75, reps2: REPS2, l5: 15.9, h3Out: [17.0, 17.18],
  cut2: 17.45,
  h4: 17.52, h4Land: 17.86, roll: [17.62, BEAT(32)], drop: BEAT(32), l6: 18.75, l7: 21.95, h4Out: [22.62, 22.78],
  strain: [BEAT(40), BEAT(43)], h5: 22.86, h5Land: 23.6, h5Out: [24.3, 24.46],
  lock: BEAT(43), h6: 24.56, h6Land: 24.86, pisFly: [24.6, 25.15],
  notif: BEAT(45), faint: [BEAT(46), BEAT(46) + 0.36], float: [26.3, 27.3], l8: 26.45, notifOut: [27.55, 27.85], h6Out: [27.05, 27.2],
  h7: 27.3, h7Land: 27.62, up: [BEAT(50), BEAT(50) + 0.32], pisBack: [28.1, 28.5], bell: BEAT(51) + 0.05, close2: 29.65, h7Out: [30.1, 30.28],
  cut3: 30.45,
  lesson: BEAT(54), lessonOut: [34.95, 35.15], spread: [34.85, 35.3],
  card: [35.15, 35.65], h8: 35.2, h8Land: 35.56, l9: 35.4, cardOut: [38.35, 38.65], close3: 38.72, h8Out: [38.55, 38.7],
  gather: [38.6, 39.0], h9: 38.8, h9Land: 39.14, whistle2: BEAT(69), flex: BEAT(70), out: [40.0, 40.45], h9Out: [40.22, 40.42],
}

const CAP = signStar('capricorn'), ARI = signStar('aries'), PIS = signStar('pisces')
const NAME = { cap: `${CAP.glyph}︎ CAPRICORN`, ari: `${ARI.glyph}︎ COACH ARIES` }
const TAG = { cap: '#9fe0c8', ari: '#ff8a7a' }
const L = (t, id, text) => ({ t, speaker: NAME[id], color: TAG[id], text })
const LINES_A = [
  L(T.l1, 'ari', 'it’s FEELINGS DAY. *nobody* skips it.'),
  L(T.l2, 'cap', 'can I just do cardio? for a *decade?*'),
  L(T.l3, 'ari', 'LOOK. AT. THAT. *FORM.*'),
  L(T.l4, 'ari', '“it’s fine” is *NOT* a rep.'),
  L(T.l5, 'cap', 'huh. I feel… *lighter?*'),
  L(T.l6, 'cap', 'that’s not a weight. it’s a *confession.*'),
  L(T.l7, 'ari', 'I got you. *breathe.*'),
]
const LINES_B = [L(T.l8, 'ari', 'see? it gets *lighter* every rep.')]
const LINES_C = [L(T.l9, 'ari', 'one talk card a day. *both* of you play.')]
export const BOXES = [{ lines: LINES_A, close: 24.35 }, { lines: LINES_B, close: T.close2 }, { lines: LINES_C, close: T.close3 }]
const CPS = 28
export const ALL_LINES = BOXES.flatMap(b => b.lines)
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Feelings are a muscle. | Use them *daily.*', chip: '+1 STRENGTH' }

// the reps: [t, text, size, color, side]
const POPS = [
  [T.rep1, 'i missed you.', 30, '#c9c3dc', -1],
  [T.rep2, 'i missed you.', 44, BONE, 1],
  [T.rep3, 'I MISSED YOU!!', 66, GOLD, 0],
  [T.fake1, 'it’s fine.', 46, '#c9c3dc', -1],
  [T.fake2, 'it’s FINE.', 54, '#c9c3dc', 1],
  ...REPS2.map((t, i) => [t, 'that hurt my feelings.', 36 + i * 3, i === 4 ? GOLD : BONE, [-1, 1, -1, 1, 0][i]]),
]
const REP_TIMES = [T.rep1, T.rep2, T.rep3, T.fake1, T.fake2, ...REPS2]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, a, b) => t >= a && t < b
const arcTo = (t, [a, b], p0, p1, h) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(p0[0], p1[0], e), lerp(p0[1], p1[1], e) - Math.sin(p * Math.PI) * h, lerp(p0[2] ?? 0, p1[2] ?? 0, e)] }

// ── the stage
const FLOOR = 1420
const CAP_HOME = [540, 1180, 250], CAP_SIDE = [250, 1260, 190]
const ARI_HOME = [892, 1330, 172], ARI_SIDE = [868, 1300, 170]
const TREAD = [180, 1350]
const PIS_RUN = [196, 1302, 104]
const BOARD = { x: 610, y: 566, w: 410, h: 128 }

// Capricorn: squash from the reps + the heavy bar
function repSq(t) {
  let s = 0
  for (const r of REP_TIMES) {
    const k = t - r
    if (k > -0.26 && k < 0) s = Math.max(s, 0.24 * Math.sin((k + 0.26) / 0.26 * Math.PI / 2))
    else if (k >= 0 && k < 0.5) s = -0.13 * Math.exp(-k * 7) * Math.cos(k * 22)
  }
  return s
}
function capSquash(t) {
  if (t < T.barIn[1]) return 0
  if (t < T.drop) return 0.03 + repSq(t) + (inW(t, T.barIn[1], T.barIn[1] + 0.5) ? 0.14 * Math.exp(-(t - T.barIn[1]) * 8) * Math.cos((t - T.barIn[1]) * 24) : 0)
  if (t < T.strain[0]) { const k = t - T.drop; return 0.3 + 0.18 * Math.exp(-k * 6) * Math.cos(k * 20) + Math.sin(t * 47) * 0.012 }
  if (t < T.lock) { const p = prog(t, ...T.strain); return lerp(0.3, 0.12, ease.inQuad(p)) + Math.sin(t * 61) * 0.025 * (0.5 + p) }
  if (t < T.faint[0]) { const k = t - T.lock; return -0.16 * Math.exp(-k * 5) * Math.cos(k * 18) }
  return 0
}
function capPos(t) {
  if (t >= T.spread[0] && t < T.gather[1]) {
    if (t < T.spread[1]) return arcTo(t, T.spread, CAP_HOME, CAP_SIDE, 70)
    if (t < T.gather[0]) return CAP_SIDE
    return arcTo(t, T.gather, CAP_SIDE, CAP_HOME, 70)
  }
  return CAP_HOME
}
function capRot(t) {
  if (t < T.faint[0] || t >= T.up[1]) return 0
  if (t < T.up[0]) { const p = prog(t, ...T.faint); return -1.42 * easeOutBack(p, 1.6) }
  return -1.42 * (1 - easeOutBack(prog(t, ...T.up), 1.4))
}
function capMood(t) {
  const st = (mood, look, o = {}) => ({ mood, look, blink: o.blink })
  if (t < T.l2) return st('squint', [1, 0])
  if (t < T.rep1 - 0.3) return st('neutral', [1, 0])
  if (t < T.rep3 - 0.3) return st('squint', [0, 0])
  if (t < T.rep3 + 0.45) return st('wide', [0, 0], { blink: false })
  if (t < T.flip[0]) return st('happy', [0, 0])
  if (t < T.fake1 - 0.3) return st('neutral', [-1, 0])
  if (t < T.l4) return st('eyeroll', [-1, -1])
  if (t < T.reps2[0] - 0.3) return st('wide', [1, 0], { blink: false })
  if (t < T.l5) return st('squint', [0, 0])
  if (t < T.cut2) return st('sparkle', [0, -1])
  if (t < T.drop) return st('wide', [0, -1], { blink: false })
  if (t < T.l7) return st('wide', [0, 0], { blink: false })
  if (t < T.strain[0]) return st('neutral', [1, 0])
  if (t < T.lock) return st('squint', [0, 0])
  if (t < T.notif) return st('happy', [0, 0])
  if (t < T.faint[0]) return st('wide', [1, -1], { blink: false })
  if (t < T.up[0]) return st('heart', [0, 0])
  if (t < T.lesson) return st('happy', [0, 0])
  if (t < T.card[0]) return st('sparkle', [0, -1])
  if (t < T.whistle2) return st('happy', [1, 0])
  if (t < T.flex) return st('squint', [1, 0])
  return st('wink', [0, 0])
}
function ariMood(t) {
  const st = (mood, look) => ({ mood, look })
  if (t < T.whistle1 + 0.5) return st('squint', [-1, 0])
  if (t < T.l2) return st('happy', [-1, 0])
  if (t < T.rep3) return st('neutral', [-1, -1])
  if (t < T.flip[0]) return st('sparkle', [-1, -1])
  if (t < T.reps2[0]) return st(inW(t, T.fake1, T.l4) ? 'squint' : 'neutral', [-1, 0])
  if (t < T.cut2) return st('happy', [-1, 0])
  if (t < T.l7) return st('wide', [-1, -1])
  if (t < T.lock) return st('neutral', [-1, -1])
  if (t < T.faint[0]) return st('happy', [-1, -1])
  if (t < T.lesson) return st('wink', [-1, 0])
  if (t < T.whistle2) return st('happy', [-1, 0])
  return st('happy', [-1, 0])
}

const ARI_HOPS = [...talkHops(ALL_LINES, NAME.ari, { cps: CPS }), T.lock + 0.05, T.lock + 0.45, T.flex + 0.1]
const CAP_HOPS = [...talkHops(ALL_LINES, NAME.cap, { cps: CPS }).filter(h => !inW(h, T.drop, T.lock + 0.6) && !inW(h, T.barIn[0], T.drop)), T.up[1], T.flex]
const PIS_HOPS = []
for (let t = T.pisIn + 0.3; t < STORY_END; t += BL / 2) if (!inW(t, T.pisFly[0] - 0.05, T.pisBack[1] + 0.1)) PIS_HOPS.push(+t.toFixed(3))

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 64px Inter", "800 40px Inter", "800 36px Inter", "italic 500 150px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 66px 'Space Mono'", "700 46px 'Space Mono'", "700 34px 'Space Mono'", "700 22px 'Space Mono'", "700 17px 'Space Mono'", "400 21px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const lovers = await loadImg('card-talk-6.png')
  const TALK = makeTalkCard(document, lovers, ['What did you', 'miss today?'])
  const TALK_BODY = 612 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HT = (text, o) => popText(root, text, { top: 176, size: 104, accentSize: 140, wobble: true, ...o })
  const H1 = HT('Welcome to | *Love Gym.*', { size: 100, accentSize: 156, at: T.h1, late: 2, lateAt: T.h1Land, accentColor: PINK })
  const H2 = HT('Set one: | *“I missed you.”*', { size: 104, accentSize: 132, at: T.h2, late: 3, lateAt: T.h2Land, accentColor: GOLD })
  const H3 = HT('Set two: | *“that hurt.”*', { size: 104, accentSize: 140, at: T.h3, late: 2, lateAt: T.h3Land, accentColor: GOLD })
  const H4 = HT('The *heaviest* | lift.', { size: 112, accentSize: 156, at: T.h4, late: 0, accentColor: PINK })
  const H5 = HT('Lift… | *lift…*', { size: 112, accentSize: 168, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: PINK })
  const H6 = HT('Personal | *best.*', { size: 116, accentSize: 172, at: T.h6, late: 1, lateAt: T.h6Land, accentColor: MINT })
  const H7 = HT('It gets | *lighter.*', { size: 116, accentSize: 172, at: T.h7, late: 1, lateAt: T.h7Land, accentColor: MINT })
  const H8 = HT('Your daily | *rep.*', { size: 116, accentSize: 172, at: T.h8, late: 1, lateAt: T.h8Land, accentColor: GOLD })
  const H9 = HT('Same time | *tomorrow.*', { size: 112, accentSize: 164, at: T.h9, late: 1, lateAt: T.h9Land, accentColor: GOLD })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out], [H9, T.h9Out]]
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1490, width: 960, height: 290, open: b.lines[0].t - 0.22, close: b.close, cps: CPS }))
  const lesson = buildLesson(root, { ...LESSON, dim: 0.62 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const shakeAt = t => {
    let a = 0
    for (const [t0, amp] of [[T.drop, 30], [T.lock, 12], [T.barIn[1], 5]]) { const k = t - t0; if (k >= 0 && k < 0.45) a = Math.max(a, amp * (1 - k / 0.45)) }
    if (inW(t, ...T.strain)) a = Math.max(a, 2 + 4 * prog(t, ...T.strain))
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }
  function sparkleRing(t, cx, cy, t0, n, Rr, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, MINT][i % 4])
    }
    x.restore()
  }
  function tears(s, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62, wind = 0 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    ;[s.L, s.R].forEach(([ex, ey], si) => {
      const side = si ? 1 : -1
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = wind ? wind * (240 + ((k * 37) % 5) * 40) : side * (120 + ((k * 37) % 5) * 26) * spread, vy = -(160 + ((k * 53) % 4) * 38) * (wind ? 0.45 : 1)
        drawTear(x, ex + vx * a, ey + 6 + vy * a + 900 * a * a, px)
      }
    })
  }
  function drawPop(t, t0, text, px, py, col, size = 46, life = 1.1, font = MONO) {
    const a = t - t0
    if (a < 0 || a > life) return
    const k = pop01(t, t0, 0.25, 3), o = 1 - prog(a, life - 0.3, life)
    x.save(); x.translate(px, py - a * 30); x.rotate(-0.06); x.scale(k, k); x.globalAlpha = o
    x.font = `${font === MONO ? 700 : 800} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'
    x.lineWidth = Math.max(8, size / 5); x.strokeStyle = '#1a1030'; x.strokeText(text, 0, 0); x.fillStyle = col; x.fillText(text, 0, 0)
    x.restore()
  }

  // ── the gym (a floating platform in the sky)
  function drawGym(t, a) {
    x.save(); x.globalAlpha *= a
    // floor
    x.fillStyle = '#05030e'; x.fillRect(-20, FLOOR - 6, W + 40, 8)
    const g = x.createLinearGradient(0, FLOOR, 0, FLOOR + 500); g.addColorStop(0, '#231a48'); g.addColorStop(1, '#0d0822')
    x.fillStyle = g; x.fillRect(-20, FLOOR + 2, W + 40, 520)
    x.fillStyle = '#5f4bab'; x.fillRect(-20, FLOOR + 2, W + 40, 6)
    for (let i = 0; i < 9; i++) { x.fillStyle = 'rgba(14,10,34,0.65)'; x.fillRect(i * 124 + 40, FLOOR + 10, 6, 70) }
    // the lifting platform (wood + rubber)
    const px0 = 300, pw = 480, py = 1291
    x.fillStyle = '#14102a'; x.fillRect(px0 - 6, py - 6, pw + 12, FLOOR - py + 6)
    x.fillStyle = '#6b4a3a'; x.fillRect(px0, py, pw, FLOOR - py)
    x.fillStyle = '#8a6450'; x.fillRect(px0 + 120, py, pw - 240, FLOOR - py)
    x.fillStyle = '#a77c62'; x.fillRect(px0, py, pw, 6)
    x.fillStyle = 'rgba(20,16,42,0.5)'; for (let i = 1; i < 4; i++) x.fillRect(px0 + 120, py + i * 32, pw - 240, 3)
    x.restore()
  }

  // ── the cast
  function capOpts(t) {
    const m = capMood(t)
    return { color: CAP.color, glyph: CAP.glyph, mood: m.mood, look: m.look, blink: m.blink, squash: capSquash(t), hops: CAP_HOPS, seed: 3, glow: 1 }
  }
  function drawCap(t, a) {
    if (t < T.capIn) return null
    const [cx, cy, size] = capPos(t)
    const pk = pop01(t, T.capIn, 0.34, 2) * a
    if (pk <= 0) return null
    const o = { ...capOpts(t), pop: pk }
    const rot = capRot(t)
    const foot = cy + 15.84 * Math.round(size * pk / 36)
    x.save()
    if (rot) { x.translate(cx, foot); x.rotate(rot); x.translate(-cx, -foot) }
    drawStarChar(x, cx, cy, size, t, o)
    const s = starAt(cx, cy, size, t, o)
    drawSweatband(x, s, '#4fd1b8', BONE, { t })
    // sweat while it works
    if (inW(t, T.reps2[0] - 0.3, T.l5) || inW(t, T.drop, T.lock)) {
      const ph = (t * 1.6) % 1, c = s.cell
      x.save(); x.globalAlpha = Math.sin(ph * Math.PI)
      drawSweat(x, s.R[0] + c * 4, s.R[1] - c * 5 + ph * 50, Math.max(4, c * 0.9))
      drawSweat(x, s.L[0] - c * 4, s.L[1] - c * 3 + ((ph + 0.5) % 1) * 50, Math.max(4, c * 0.8))
      x.restore()
    }
    // blush burst on the blurted rep
    if (inW(t, T.rep3 + 0.1, T.rep3 + 1.4)) for (let i = 0; i < 4; i++) {
      const ag = t - T.rep3 - 0.1 - i * 0.18
      if (ag < 0 || ag > 0.8) continue
      x.save(); x.globalAlpha = 1 - ag / 0.8; drawPixelHeart(x, cx + (i % 2 ? 1 : -1) * (90 + i * 12), cy - 110 - ag * 120, 4, i % 2 ? '#ff4f7e' : '#ff8fc8'); x.restore()
    }
    // hearts when it faints
    if (inW(t, T.faint[0], T.up[0])) for (let i = 0; i < 8; i++) {
      const born = T.faint[0] + i * 0.25, ag = t - born
      if (ag < 0 || ag > 1.2) continue
      x.save(); x.globalAlpha = 1 - ag / 1.2; drawPixelHeart(x, cx - 160 + (i % 3) * 60, cy - 30 - ag * 140, 5, i % 2 ? '#ff4f7e' : '#ff8fc8'); x.restore()
    }
    x.restore()
    return s
  }
  function drawAries(t, a) {
    if (t < T.ariIn) return
    const p = t >= T.spread[0] && t < T.gather[1] ? (t < T.spread[1] ? arcTo(t, T.spread, ARI_HOME, ARI_SIDE, 50) : t < T.gather[0] ? ARI_SIDE : arcTo(t, T.gather, ARI_SIDE, ARI_HOME, 50)) : ARI_HOME
    const pk = pop01(t, T.ariIn, 0.34, 2.2) * a
    if (pk <= 0) return
    const m = ariMood(t)
    const blowing = inW(t, T.whistle1 - 0.05, T.whistle1 + 0.55) || inW(t, T.whistle2 - 0.05, T.whistle2 + 0.5)
    // spotting: leans toward Capricorn
    let sq = 0
    if (inW(t, T.l7, T.lock)) sq = 0.05 + Math.sin(t * 40) * 0.01
    const o = { color: ARI.color, glyph: ARI.glyph, mood: blowing ? 'squint' : m.mood, look: m.look, hops: ARI_HOPS, seed: 6, pop: pk, glow: 1, squash: sq }
    drawStarChar(x, p[0], p[1], p[2], t, o)
    const s = starAt(p[0], p[1], p[2], t, o)
    drawSweatband(x, s, RED, BONE, { t: t + 1 })
    drawWhistle(x, s, t, blowing)
    if (blowing) {
      const t0 = t < 20 ? T.whistle1 : T.whistle2
      drawPop(t, t0 + 0.02, 'TWEEEET!', p[0] - 40, p[1] - 150, CYAN, 40, 0.75)
    }
  }
  function pisPos(t) {
    if (t < T.pisFly[0]) return [...PIS_RUN, 0]
    if (t < T.pisFly[1]) { const q = arcTo(t, T.pisFly, PIS_RUN, [724, 1243, 104], 200); return [q[0], q[1], 104, prog(t, ...T.pisFly) * Math.PI * 2.2] }
    if (t < T.pisBack[0]) return [724, 1243, 104, Math.PI * 0.2]
    if (t < T.pisBack[1]) { const q = arcTo(t, T.pisBack, [724, 1243, 104], PIS_RUN, 160); return [q[0], q[1], 104, Math.PI * 0.2 * (1 - prog(t, ...T.pisBack))] }
    return [...PIS_RUN, 0]
  }
  function drawPisces(t, a) {
    if (t < T.pisIn) return
    const k = pop01(t, T.pisIn, 0.3, 2.2) * a
    if (k <= 0) return
    const [px, py, size, rot] = pisPos(t)
    const flying = inW(t, T.pisFly[0], T.pisBack[1])
    const watching = inW(t, T.drop, T.lock)
    const mood = flying ? 'sparkle' : watching ? 'wide' : 'sparkle'
    const o = { color: PIS.color, glyph: null, mood, look: watching ? [1, -1] : flying ? [0, 0] : [-1, 0], hops: PIS_HOPS, seed: 5, pop: k, glow: 0.9, bob: 2 }
    x.save()
    if (rot) { x.translate(px, py); x.rotate(rot); x.translate(-px, -py) }
    drawStarChar(x, px, py, size, t, o)
    x.restore()
    const s = starAt(px, py, size, t, o)
    if (!flying) tears(s, size, t, T.pisIn + 0.2, STORY_END, { gap: watching ? 0.07 : 0.11, wind: 1, life: 0.55 })
    else tears(s, size, t, T.pisFly[0], T.pisBack[1], { gap: 0.07, spread: 1.4 })
    if (inW(t, T.pisFly[0] + 0.1, T.pisFly[0] + 1.2)) drawPop(t, T.pisFly[0] + 0.1, 'WAAAH!', 600, 1450, '#b7b1ff', 36)
  }

  // ── the bars
  function lightBar(t, s) {
    if (t < T.barIn[0] || t >= T.cut2) return
    const set2 = t >= (T.flip[0] + T.flip[1]) / 2
    const dropY = t < T.barIn[1] ? -900 * (1 - ease.inQuad(prog(t, ...T.barIn))) : 0
    let rot = 0, sc = 1
    if (inW(t, ...T.flip)) { const p = prog(t, ...T.flip); rot = Math.sin(p * Math.PI) * 0.12; sc = 1 + 0.08 * Math.sin(p * Math.PI) }
    const reps = REP_TIMES.filter(r => t >= r)
    drawBarbell(x, s.top[0], s.top[1] - 8 + dropY, {
      half: 262, plates: set2 ? 3 : 2, plateH: 150, scale: sc, rot,
      tag: set2 ? 'THAT HURT MY FEELINGS' : 'I MISSED YOU', tagSub: set2 ? '× 5 REPS' : '× 3 REPS', tagCol: set2 ? CYAN : GOLD,
      bend: 6 + (reps.length && t - reps[reps.length - 1] < 0.3 ? 6 : 0),
    })
  }
  function heavyBar(t, s) {
    if (t < T.drop - 0.3 || t >= T.float[1]) return
    let y, bend, rot = 0
    if (t < T.drop) { y = lerp(-500, s.top[1] - 8, ease.inCubic(prog(t, T.drop - 0.3, T.drop))); bend = 0 }
    else if (t < T.faint[0]) { y = s.top[1] - 8; bend = t < T.lock ? 34 + Math.sin(t * 30) * 3 : 34 * Math.exp(-(t - T.lock) * 4) }
    else {
      const p = prog(t, ...T.float), e = ease.inQuad(p)
      const s0 = starAt(...CAP_HOME, T.faint[0], capOpts(T.faint[0]))
      y = lerp(s0.top[1] - 8, -560, e) + Math.sin(t * 5) * 8 * (1 - p); bend = 0; rot = Math.sin(t * 2.4) * 0.08
      // balloon string + hearts
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3; x.beginPath(); x.moveTo(540, y + 10); x.quadraticCurveTo(560 + Math.sin(t * 4) * 20, y + 140, 530, y + 260); x.stroke(); x.restore()
    }
    drawBarbell(x, t < T.faint[0] ? s.top[0] : 540, y, { half: 300, plates: 3, plateH: 250, tag: 'I LIKE YOU', tagSub: '1 REP · HEAVIEST', tagCol: PINK, bend, rot, plateCol: '#3a1f4a', rim: GOLD })
  }
  function tinyBell(t, s) {
    if (t < T.bell || t >= T.spread[0] + 0.2) return
    if (!s) return
    let y, rot
    if (t < T.bell + 0.4) { y = lerp(-80, s.top[1] - 34, ease.inQuad(prog(t, T.bell, T.bell + 0.4))); rot = (t - T.bell) * 8 }
    else { const ph = ((t - T.bell - 0.4) / (BL * 2)) % 1; y = s.top[1] - 34 - Math.sin(ph * Math.PI) * 150; rot = ph * Math.PI * 2 }
    drawDumbbell(x, s.top[0], y, 1, rot)
  }

  // ── HUD
  function drawHUD(t, a) {
    const nk = t < T.neon[1] ? (Math.sin(t * 70) > 0 ? 1 : 0.2) * prog(t, T.neon[0], T.neon[0] + 0.1) : 1
    drawNeon(x, 290, 572, t, a * (t < T.neon[0] ? 0 : 1), t < T.neon[1] ? 1 : 0)
    void nk
    if (t < T.barIn[0] || t >= T.float[1] + 0.5) return
    const set2 = t >= T.flip[0] + 0.15
    const heavy = t >= T.cut2
    const real2 = T.reps2.filter(r => t >= r).length
    const r1 = [T.rep1, T.rep2, T.rep3].filter(r => t >= r).length
    let flash = '', fk = 0
    for (const f of [T.fake1, T.fake2]) if (inW(t, f + 0.05, f + 0.95)) { flash = 'NO REP'; fk = 1 }
    if (inW(t, T.rep3 + 0.05, T.flip[0])) { flash = 'SET DONE'; fk = 1 }
    if (inW(t, T.reps2[4] + 0.05, T.cut2)) { flash = 'SET DONE'; fk = 1 }
    if (heavy && t >= T.lock) { flash = 'P.B.!'; fk = 1 }
    let bump = 0
    for (const r of [...REP_TIMES, T.lock]) { const k = t - r; if (k >= 0 && k < 0.3) bump = 1 - k / 0.3 }
    drawBoard(x, BOARD.x, BOARD.y, BOARD.w, BOARD.h, t, {
      set: heavy ? 'SET 3 · THE BIG ONE' : set2 ? 'SET 2 · FIVE REPS' : 'SET 1 · THREE REPS',
      reps: heavy ? (t >= T.lock ? 1 : 0) : set2 ? real2 : r1, of: heavy ? 1 : set2 ? 5 : 3, flash, flashK: fk, bump, alpha: a,
    })
  }
  function confetti(t) {
    const a = t - T.lock
    if (a < 0 || a > 2.6) return
    for (let i = 0; i < 46; i++) {
      const sx = (i * 197) % W, sp = 380 + (i * 53) % 260, y0 = -40 - (i * 71) % 300
      const y = y0 + sp * a, xx = sx + Math.sin(a * 4 + i) * 30
      if (y > 1500) continue
      x.save(); x.globalAlpha = 1 - prog(a, 2.0, 2.6); x.translate(xx, y); x.rotate(a * 6 + i)
      x.fillStyle = [GOLD, PINK, MINT, CYAN, BONE][i % 5]; x.fillRect(-7, -4, 14, 8); x.restore()
    }
  }
  function drawTalkCard(t) {
    if (!TALK || t < T.card[0] || t > T.cardOut[1]) return
    const p = prog(t, ...T.card), e = ease.outCubic(p), o = ease.inCubic(prog(t, ...T.cardOut))
    const cx = lerp(1240, 590, e) + o * 60, cy = lerp(1500, 930, e) - Math.sin(p * Math.PI) * 90 + Math.sin(t * 2) * 6 * e + o * 160
    const rot = lerp(1.2, 0.035, e) + 0.02 * Math.sin(t * 1.5) * e
    const w = 300 / TALK_BODY, h = w * TALK.height / TALK.width
    const gl = x.createRadialGradient(cx, cy, 0, cx, cy, 420); gl.addColorStop(0, rgba(GOLD, 0.3 * e * (1 - o))); gl.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gl; x.fillRect(cx - 420, cy - 420, 840, 840)
    x.save(); x.globalAlpha = 1 - o; x.translate(cx, cy); x.rotate(rot); x.drawImage(TALK, -w / 2, -h / 2, w, h); x.restore()
    sparkleRing(t, cx, cy, T.card[1] - 0.05, 12, 230, 0.4)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const sh = shakeAt(t)
      x.save(); x.translate(sh[0], sh[1])
      if (t < T.out[1] + 0.02) {
        const a = Math.min(clamp(prog(t, 0.05, 0.4) * 1.2), popOut(t, T.out))
        drawGym(t, a)
        drawHUD(t, a)
        drawTreadmill(x, TREAD[0], TREAD[1], t, inW(t, T.drop, T.lock) ? 1.8 : 1)
        drawPisces(t, a)
        const s = drawCap(t, a)
        if (s && capRot(t) === 0) { lightBar(t, s); heavyBar(t, s); tinyBell(t, s) }
        else if (t >= T.faint[0]) heavyBar(t, s || starAt(...CAP_HOME, t, capOpts(t)))
        drawAries(t, a)
        // the rep pops
        for (const [t0, text, size, col, side] of POPS) drawPop(t, t0 + 0.02, text, 540 + side * (text.length > 16 ? 120 : 210), 860 - (side === 0 ? 20 : 0), col, size, text.length > 16 ? (side === 0 ? 1.0 : 0.56) : 1.05)
        for (const f of [T.fake1, T.fake2]) drawPop(t, f + 0.3, '✕', 540 + (f === T.fake1 ? -1 : 1) * 380, 930, RED, 64, 0.7)
        drawPop(t, T.drop + 0.02, 'THUD.', 820, 900, BONE, 70, 0.9, INTER)
        drawPop(t, T.lock + 0.02, 'I LIKE YOU.', 540, 830, PINK, 96, 1.5, INTER)
        confetti(t)
        drawNotif(x, 540, 700, easeOutBack(prog(t, T.notif, T.notif + 0.32), 1.8) * outK(t, T.notifOut), 'THEM · NOW', 'i like you too!!')
        drawTalkCard(t)
        if (t >= T.lock && t < T.lock + 0.8) sparkleRing(t, 540, 1000, T.lock + 0.02, 14, 300, 0.5)
        if (t >= T.flex && t < T.flex + 0.8) sparkleRing(t, 540, 1100, T.flex + 0.02, 10, 200, 0.2)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1000, T.out[0] + 0.1, 16, 420, 0.2)
      }
      x.restore()
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts: the three beat changes that clear the screen (hook → set one, set two → the heavy lift, the payoff → LESSON).
export const CUTS = [{ t: T.cut1, keep: true }, { t: T.cut2, keep: true }, { t: T.cut3, keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched pop/pluck/bell are moved into the key by the engine; chip cues are written in A major on the fx bus)
const NOTE = [880, 987.77, 1108.73, 1318.51, 1479.98, 1760, 1975.53]
const Ah = { A3: 220, E4: 329.63, A4: 440, Cs5: 554.37, E5: 659.25, A5: 880, Cs6: 1108.73, E6: 1318.51, A6: 1760 }
const FX = { bus: 'fx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.07, base, gain), ...(land ? [['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]] : [])]
const whistle = (t, len = 0.5) => [['chip', t, 2637, len, { ...FX, wave: 'square', duty: 0.5, vib: 0.07, gain: 0.03, decay: 0.3, sustain: 0.85 }], ['chip', t, 2793, len, { ...FX, wave: 'tri', vib: 0.09, gain: 0.025, decay: 0.3, sustain: 0.85 }], ['chip', t, 4000, len * 0.6, { ...FX, wave: 'noise', gain: 0.008, decay: 0.2, sustain: 0.6 }]]
const buzz = (t, len = 0.42, g = 1) => [['chip', t, 98, len, { ...FX, wave: 'square', duty: 0.5, gain: 0.05 * g, decay: 0.04, sustain: 0.92 }], ['chip', t, 103.6, len, { ...FX, wave: 'square', duty: 0.3, gain: 0.045 * g, decay: 0.04, sustain: 0.92 }], ['tick', t, 0.06 * g]]
const ding = (t, g = 1) => [['bell', t, 1318.51, 0.045 * g, 0.9, 0], ['bell', +(t + 0.09).toFixed(3), 1760, 0.04 * g, 1.1, 0], ['tick', t, 0.04 * g]]
const grunt = (t, f = 196, g = 1) => [['tom', t, 70, { ...FX, gain: 0.14 * g, decay: 0.16 }], ['chip', t - 0.12, f, 0.18, { ...FX, wave: 'square', duty: 0.25, slide: -8, gain: 0.018 * g, decay: 0.12, sustain: 0.5 }]]
const roll = (t0, t1) => { const out = []; for (let t = t0, i = 0; t < t1; t += 1 / 22, i++) { const p = (t - t0) / (t1 - t0); out.push(['snare', +t.toFixed(3), { gain: 0.05 + 0.13 * p * p, decay: 0.07, snappy: 0.9, tone: 200, pan: (i % 2 ? 0.12 : -0.12), rev: 0.15, bus: 'fx' }]) } return out }
const cheers = (t0, t1) => { const out = [['swell', t0, t0 + 0.6, { gain: 0.04, f0: 700, f1: 3600 }]]; for (let k = 0; t0 + k * 0.06 < t1; k++) { const p = k * 0.06 / (t1 - t0); out.push(['clap', +(t0 + k * 0.06 + ((k * 0.037) % 0.03)).toFixed(3), { ...FX, gain: (0.1 + ((k * 0.61) % 1) * 0.05) * (1 - p * 0.85), pan: ((k * 0.61) % 1) * 1.4 - 0.7, rev: 0.25 }]) } return out }
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const creak = (t, len) => [['chip', t, 140, len, { ...FX, wave: 'square', duty: 0.12, slide: 4, vib: 0.08, gain: 0.02, decay: len, sustain: 0.8 }]]
const slideUp = (t, len) => [['chip', t, Ah.E5, len, { ...FX, wave: 'tri', slide: 20 / len, vib: 0.03, gain: 0.028, decay: len, sustain: 0.8 }]]
const boing = (t, f = Ah.E5) => [['chip', t, f, 0.2, { ...FX, wave: 'tri', slide: 24, gain: 0.03, decay: 0.15, sustain: 0.5 }]]

const PITCH = { [NAME.cap]: 760, [NAME.ari]: 1150 }
export const CUES = [
  // the hook
  ['glitter', 0.1, 0.5], ...[0.1, 0.2, 0.33, 0.45].map(t => ['tick', t, 0.03]), ['pop', T.ariIn, 784, 0.03, 0.3],
  ...whistle(T.whistle1, 0.45), ...whistle(T.whistle1 + 0.55, 0.18),
  ...head(T.h1, 2, T.h1Land, 0), ['pop', T.capIn, 523.25, 0.03, 0], ['pop', T.pisIn, 1318.51, 0.025, -0.4], ...sob(T.pisIn + 0.3, Ah.E6),
  // set one
  ['whoosh', T.barIn[0], 0.3, 0.05], ['tom', T.barIn[1], 110, { ...FX, gain: 0.16, decay: 0.15 }], ['clap', T.barIn[1], { ...FX, gain: 0.05 }],
  ...head(T.h2, 2, T.h2Land, 1),
  ...grunt(T.rep1, 220, 0.6), ...ding(T.rep1, 0.6), ...grunt(T.rep2, 247, 0.8), ...ding(T.rep2, 0.8), ...grunt(T.rep3, 294, 1.1), ...ding(T.rep3, 1.2),
  ['glitter', T.rep3, T.rep3 + 0.6], ['pop', T.rep3 + 0.4, 1760, 0.03, 0],
  // set two
  ['whoosh', T.flip[0], 0.3, 0.05], ['tick', (T.flip[0] + T.flip[1]) / 2, 0.06], ...head(T.h3, 2, T.h3Land, 3),
  ...grunt(T.fake1, 196, 0.5), ...buzz(T.fake1 + 0.06, 0.4), ...grunt(T.fake2, 196, 0.6), ...buzz(T.fake2 + 0.06, 0.5, 1.2),
  ...T.reps2.flatMap((r, i) => [...grunt(r, 220 + i * 25, 0.8 + i * 0.1), ...ding(r, 0.5 + i * 0.12)]),
  ['bell', T.reps2[4] + 0.12, 1760, 0.04, 1.4, 0], ['glitter', T.l5, T.l5 + 0.6],
  // the heaviest lift
  ...head(T.h4, 3, T.h4Land, 0),
  ...roll(T.roll[0], T.roll[1]),
  ['boom', T.drop, 0.2], ['tom', T.drop, 55, { ...FX, gain: 0.34, decay: 0.55 }], ['crash', T.drop, { bus: 'fx', gain: 0.004, len: 1.6 }], ['chip', T.drop + 0.05, 1200, 0.3, { ...FX, wave: 'tri', slide: -30, gain: 0.03, decay: 0.2, sustain: 0.5 }],
  ...creak(T.l6 + 0.4, 0.6), ...creak(T.l7 - 0.4, 0.5),
  ...head(T.h5, 1, T.h5Land, 2), ['tapeStop', T.strain[0] + 0.02, 1.55], ...creak(T.strain[0] + 0.1, 0.7), ...creak(T.strain[0] + 0.85, 0.7),
  ...slideUp(T.strain[0] + 0.1, 1.5),
  // lockout
  ['boom', T.lock, 0.14], ...ding(T.lock, 1.4), ['crash', T.lock, { bus: 'fx', gain: 0.003, len: 1.4 }], ['glitter', T.lock, T.lock + 1.2], ...cheers(T.lock + 0.04, T.lock + 2.2),
  ...head(T.h6, 1, T.h6Land, 4), ['whoosh', T.pisFly[0], 0.5, 0.05], ...sob(T.pisFly[0] + 0.15, Ah.A6), ['pop', T.pisFly[1], 392, 0.03, -0.4],
  ['pop', T.notif, 1760, 0.045, 0.2], ['pop', T.notif + 0.08, 2349.32, 0.04, 0.2], ['bell', T.notif + 0.05, 1760, 0.04, 1.2, 0.2],
  ['whoosh', T.faint[0], 0.36, 0.04], ['boom', T.faint[1], 0.05], ...slideUp(T.float[0], 2.4),
  // it gets lighter
  ...head(T.h7, 2, T.h7Land, 1), ['pop', T.pisBack[1], 659.25, 0.03, -0.4],
  ...boing(T.up[1]), ['tick', T.bell + 0.4, 0.06], ['pop', T.bell + 0.4, 1318.51, 0.03, 0],
  // the lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // the talk card
  ['whoosh', T.card[0], 0.45, 0.06], ['tick', T.card[1] - 0.04, 0.07], ['pop', T.card[1], 1174.66, 0.04, 0.2],
  ...head(T.h8, 2, T.h8Land, 2),
  // same time tomorrow
  ...head(T.h9, 2, T.h9Land, 0), ...whistle(T.whistle2, 0.4), ...grunt(T.whistle2 + 0.4, 165, 0.7), ...boing(T.flex, Ah.A5), ['glitter', T.flex, T.flex + 0.5],
  ...sob(T.flex + 0.1, Ah.E6, 2),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
