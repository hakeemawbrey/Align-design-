// stpregame — "Pre-Game." (45 s vertical Align ad, Star Talk S3 #19; pitch: startalk-concepts/C-story.md §8)
// Story 0–40.6, then the shared end card. ♈ COACH ARIES (sweatband, whistle) and the whole zodiac squad hype you up
// before tonight's deck drops, like a team before the big game. ♓ Pisces is the team mascot (a foam fish hat), crying.
//   0.00–4.6   "9 PM. | Game time."  A locker-room door on a neon court rattles (the squad is hyped behind it)… 1.16 the
//              doors BURST open (the drop), Aries charges out at you and blows the whistle; the squad pours out and lines
//              up. ARIES: "THE DECK DROPS TONIGHT. YOU READY?" The squad hops: "HOO!"
//   4.6–10.2   "Pep talk."  Aries paces: "YOU'RE KIND. YOU'RE FUNNY." (a synced nod on each) → "YOU TEXT BACK. THAT'S RARE."
//              The squad gasps; a gold ✦ RARE ✦ rarity chip stamps in.
//  10.2–13.3   "Hype squad."  THE STARS: "WHO'S A CATCH? YOU'RE A CATCH!" A stadium wave runs down the line, every glyph
//              flashing… except Pisces, busy crying, who hops alone a beat late. Everyone turns to look at Pisces.
//  13.38       card cut (deal).
//  13.4–19.4   "Real talk."  The music drops away; a close-up on Aries, soft eyes. "hey. last one said no. we know."
//              Pisces sobs; Scorpio: "shh!" → "one no isn't the whole season." The squad nods.
//  19.4–22.8   "Tonight's deck."  Your phone rises (POV); the squad crowds in over your shoulder, eyes darting as the cards
//              deal; the top card flips. ARIES (whispering, small type): "okay. okay. take your time." The card glows…
//  22.82       you swipe it: ALIGN →. The music tape-stops.
//  22.8–27.3   "The wait."  Dead silence, a heartbeat. Everyone frozen, Aries chattering its whistle, Pisces pulls its fish
//              hat over its eyes (and peeks). ♊ GEMINI pops up from behind the phone: "…did they pick us back??"
//              Everyone turns to Gemini.
//  27.27      card cut (flip) = the reveal, on the lift: the phone shows the match ("You both aligned.", ✦ RARE PULL ✦).
//  27.3–31.7   "They picked | you back."  The squad erupts (heart eyes, confetti). THE STARS: "WE ARE SO BACK." The
//              squad stacks into a cheer pyramid; Pisces climbs to the top with a bucket of glitter and tips it over Aries.
//              Aries, glittered, blinks twice.
//  31.71–36.1  ★ LESSON UNLOCKED (lesson.js): "A no isn't a verdict. | It's just not your match." +1 HEART. The stage tilts
//              down so the team looks up at it.
//  36.1–40.6   "Whatever happens: | we're proud of you."  The team photo: the pyramid, glittered Aries in front, a slow
//              proud nod. Aries blows the whistle: pfft, glitter. All out by 40.5; the end card takes over at 40.6.
// One canvas (sky + court + doors + phone + stars + props), DOM type + dialogue boxes + the lesson above it, grain on top.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { onStar, drawSweatband, drawWhistle, drawFishHat, drawGlitterCoat, drawDoors, drawFloor, drawBucket, drawRareChip, drawBubble } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#9fe8ff', MINT = '#7dffb0', HOT = '#ff5ad1'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
export const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid
export const KEY = 'Am'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // 1 · the locker room
  h0: 0.12, h0Land: BEAT(0), h0Out: [4.5, 4.68],
  rattle: [0.28, 0.6, 0.86], burst: BEAT(1), run: [1.17, 1.6], whistle: BEAT(2), pour: 1.24, pourGap: 0.08,
  l1: 1.95, hoo: 3.5,
  // 2 · pep talk
  h1: 4.66, h1Land: 4.95, l2: 4.9, l3: 7.6, h1Out: [10.06, 10.22],
  // 3 · hype squad
  h2: 10.22, h2Land: BEAT(18), l4: 10.3, wave: 10.72, waveGap: 0.105, late: 12.32, turn: 12.56, close1: 13.25, h2Out: [13.1, 13.28],
  cut1: BEAT(23),                                                  // 13.378
  // 4 · real talk
  h3: 13.46, h3Land: 13.76, l5: 13.9, sob: 15.62, shh: [15.95, 16.8], l6: 17.0, close2: 19.6, h3Out: [19.3, 19.46],
  // 5 · tonight's deck
  phone: [19.38, 19.92], h4: 19.52, h4Land: 19.84, deal: 19.95, dealGap: 0.09, flip: [20.86, 21.16], l7: 20.4, glow: 22.12, swipe: BEAT(40), close3: 23.35, h4Out: [22.72, 22.88],
  // 6 · the wait
  h5: 22.98, h5Land: 23.28, hat: [23.5, 23.75], peek: [24.5, 25.1], beats: [23.68, 23.93, 26.02, 26.27], crick: 24.3, gemUp: [24.38, 24.72], l8: 24.85, turnBack: 26.38, lean2: [26.6, 27.2], close4: 27.25, h5Out: [27.05, 27.22],
  cut2: BEAT(48),                                                  // 27.267: the reveal
  // 7 · they picked you back
  h6: 27.36, h6Land: 27.66, l9: 27.75, close5: 29.85, phoneAway: [28.82, 29.18], move: 28.86, stack: [29.0, 29.08, 29.16, 29.3, 29.38, 29.52],
  tip: [29.66, 29.92], pour2: [29.8, 30.55], splat: 30.12, blinks: [30.72, 30.98], h6Out: [31.38, 31.56],
  // 8 · LESSON UNLOCKED
  lesson: BEAT(56), lessonOut: [35.92, 36.12], tilt: [31.45, 31.95], untilt: [35.98, 36.5],
  // 9 · whatever happens
  h7: 36.18, h7Land: 36.78, nod: [37.25, 38.25], pfft: 38.9, out: [40.05, 40.48], h7Out: [40.22, 40.46],
}
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'A no isn’t a verdict. | It’s just not | your *match.*', chip: '+1 HEART', accentColor: GOLD, dim: 0.5 }

// ── the dialogue
const ARI = '♈ COACH ARIES', STARS = 'THE STARS', GEMN = '♊ GEMINI', ARIC = '#ff8a64', GEMC = '#f6d65a'
const L1 = [
  { t: T.l1, speaker: ARI, color: ARIC, text: 'THE DECK DROPS TONIGHT. *YOU READY?*' },
  { t: T.l2, speaker: ARI, color: ARIC, text: 'YOU’RE KIND. YOU’RE *FUNNY.*' },
  { t: T.l3, speaker: ARI, color: ARIC, text: 'YOU TEXT BACK. THAT’S *RARE.*' },
  { t: T.l4, speaker: STARS, text: 'WHO’S A CATCH? *YOU’RE* A CATCH!' },
]
const L2 = [
  { t: T.l5, speaker: ARI, color: ARIC, text: 'hey. last one said *no.* we know.' },
  { t: T.l6, speaker: ARI, color: ARIC, text: 'one no isn’t the whole *season.*' },
]
const L3 = [{ t: T.l7, speaker: ARI + ' (whispering)', color: ARIC, text: 'okay. okay. take your *time.*' }]
const L4 = [{ t: T.l8, speaker: GEMN, color: GEMC, text: '…did they pick *us* back??' }]
const L5 = [{ t: T.l9, speaker: STARS, text: 'WE ARE SO *BACK.*' }]
export const ALL_LINES = [...L1, ...L2, ...L3, ...L4, ...L5]
export const BOXES = [[L1, T.close1, 52], [L2, T.close2, 52], [L3, T.close3, 44], [L4, T.close4, 52], [L5, T.close5, 52]]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
const charAt = (li, word) => { const s = ALL_LINES[li].text.replace(/\*/g, ''); return LT[li].chars[Math.max(0, s.indexOf(word))] }
export const TW = {
  ready: charAt(0, 'READY'), kind: charAt(1, 'KIND'), funny: charAt(1, 'FUNNY'), text: charAt(2, 'TEXT'), rare: charAt(2, 'RARE'),
  catch2: charAt(3, 'YOU’RE'), no: charAt(4, 'no.'), season: charAt(5, 'season'), us: charAt(7, 'us'), back: charAt(8, 'BACK'),
}
const ARI_HOPS = [...talkHops(L1, ARI, { cps: CPS }), ...talkHops(L2, ARI, { cps: CPS })]
const GEM_HOPS = talkHops(L4, GEMN, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b
const JUMP = (t, t0, d = 0.42) => { const p = prog(t, t0, t0 + d); return p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0 }

// ── the cast
const CAST = {
  ari: { ...signStar('aries'), seed: 3 },
  tau: { ...signStar('taurus'), seed: 11 }, gem: { ...signStar('gemini'), seed: 17 }, can: { ...signStar('cancer'), seed: 23 },
  leo: { ...signStar('leo'), seed: 29 }, vir: { ...signStar('virgo'), seed: 31 }, lib: { ...signStar('libra'), seed: 37 },
  sco: { ...signStar('scorpio'), seed: 41 }, sag: { ...signStar('sagittarius'), seed: 43 }, cap: { ...signStar('capricorn'), seed: 47 },
  aqu: { ...signStar('aquarius'), seed: 53 }, pis: { ...signStar('pisces'), seed: 59 },
}
const KEYS = Object.keys(CAST)
const HORIZON = 940, DOOR = { x: 540, y: HORIZON, w: 280, h: 370 }
// layouts: key → [x, y, size] (world px; missing = off stage)
const LAY = {
  LINE: { gem: [92, 1000, 104], vir: [212, 1000, 104], sag: [332, 1000, 104], cap: [748, 1000, 104], aqu: [868, 1000, 104], sco: [988, 1000, 104],
    tau: [158, 1140, 126], can: [330, 1140, 126], lib: [750, 1140, 126], leo: [922, 1140, 126], pis: [980, 1306, 116], ari: [540, 1215, 288] },
  TALK: { ari: [540, 1085, 500], can: [118, 760, 146], tau: [122, 1048, 150], pis: [958, 760, 146], sco: [952, 1048, 144],
    vir: [300, 590, 94], lib: [780, 590, 94], leo: [196, 1812, 112], cap: [540, 1828, 108], aqu: [884, 1812, 112] },
  DECK: { ari: [126, 985, 180], can: [116, 712, 136], tau: [118, 1262, 138], leo: [964, 712, 136], vir: [964, 985, 146], cap: [962, 1262, 138],
    aqu: [268, 548, 98], lib: [812, 548, 98], sag: [232, 1815, 114], sco: [540, 1824, 114], pis: [848, 1810, 120] },
  PYR: { cap: [384, 1016, 134], can: [540, 1016, 134], sco: [696, 1016, 134], lib: [462, 890, 128], vir: [618, 890, 128], pis: [540, 766, 122],
    ari: [540, 1258, 272], tau: [250, 1276, 146], leo: [830, 1276, 146], gem: [104, 940, 110], aqu: [976, 940, 110], sag: [106, 1150, 104] },
}
const WAVE = ['gem', 'tau', 'vir', 'can', 'sag', 'ari', 'cap', 'lib', 'aqu', 'leo', 'sco']             // then Pisces, late
const STACK = ['cap', 'can', 'sco', 'lib', 'vir', 'pis']
const GEM_PEEK = [540, 528, 140]

/** where actor k is at t → { p: [x, y, s], pk, layer } or null */
function place(k, t) {
  const C = CAST[k], stag = (C.seed % 7) * 0.03
  if (t < T.burst) return null
  if (t < T.cut1) {                                               // pour out of the doorway onto the court
    const to = LAY.LINE[k]
    if (k === 'ari') {
      const p = prog(t, ...T.run), e = ease.outCubic(p)
      return { p: [540, lerp(HORIZON - 40, to[1], e) - Math.sin(Math.PI * p) * 160, lerp(90, to[2], easeOutBack(p, 2.4))], pk: 1 }
    }
    const i = WAVE.indexOf(k) < 0 ? 11 : WAVE.indexOf(k), t0 = T.pour + i * T.pourGap, p = prog(t, t0, t0 + 0.42)
    if (p <= 0) return null
    const e = ease.inOutCubic(p)
    return { p: [lerp(540, to[0], e), lerp(HORIZON - 30, to[1], e) - Math.sin(Math.PI * p) * 150, lerp(60, to[2], e)], pk: 1 }
  }
  if (t < T.phone[0]) { const L = LAY.TALK[k]; return L ? { p: L, pk: t < T.cut1 + 0.6 ? pop01(t, T.cut1 + 0.04 + stag, 0.3, 2) : 1 } : null }
  if (t < T.move) {                                               // around the phone (POV)
    if (k === 'gem') {
      if (t < T.gemUp[0]) return null
      const u = easeOutBack(prog(t, ...T.gemUp), 1.6)
      return { p: [GEM_PEEK[0], lerp(GEM_PEEK[1] + 130, GEM_PEEK[1], u), GEM_PEEK[2]], pk: 1, layer: 'behind' }
    }
    const L = LAY.DECK[k], prev = LAY.TALK[k]
    const t0 = T.phone[0] + stag, p = prog(t, t0, t0 + 0.42)
    if (prev && p < 1) { const e = ease.inOutCubic(p); return { p: [lerp(prev[0], L[0], e), lerp(prev[1], L[1], e) - Math.sin(Math.PI * p) * 60, lerp(prev[2], L[2], e)], pk: 1 } }
    return { p: L, pk: prev ? 1 : pop01(t, t0, 0.32, 2) }
  }
  // the payoff: everyone rushes into the pyramid formation; the stack climbs in order
  const to = LAY.PYR[k], from = k === 'gem' ? GEM_PEEK : LAY.DECK[k]
  const si = STACK.indexOf(k), land = si >= 0 ? T.stack[si] : T.move + 0.18 + stag
  const t0 = si >= 0 ? land - 0.34 : T.move + stag, p = prog(t, t0, land)
  if (p < 1) { const e = ease.inOutCubic(p); return { p: [lerp(from[0], to[0], e), lerp(from[1], to[1], e) - Math.sin(Math.PI * p) * (si >= 0 ? 190 : 90), lerp(from[2], to[2], e)], pk: 1, layer: k === 'gem' && p < 0.3 ? 'behind' : undefined } }
  return { p: to, pk: 1 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "500 30px Inter", "700 30px Inter", "italic 500 190px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-1.png')])
  const BACK = bake(backIm, 420), FACE = bake(faceIm, 520)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (the season's headline helper)
  const HL = (text, o) => popText(root, text, { late: 1, wobble: true, ...o })
  const H0 = HL('9 PM. | *Game time.*', { top: 150, size: 120, accentSize: 158, at: T.h0, lateAt: T.h0Land, accentColor: HOT, lineHeight: 1.0 })
  const H1 = HL('Pep *talk.*', { top: 200, size: 124, accentSize: 172, at: T.h1, lateAt: T.h1Land, accentColor: GOLD })
  const H2 = HL('Hype *squad.*', { top: 200, size: 124, accentSize: 172, at: T.h2, lateAt: T.h2Land, accentColor: PINK })
  const H3 = HL('Real *talk.*', { top: 200, size: 124, accentSize: 172, at: T.h3, lateAt: T.h3Land, accentColor: LAV })
  const H4 = HL('Tonight’s *deck.*', { top: 205, size: 116, accentSize: 164, at: T.h4, lateAt: T.h4Land, accentColor: LAV })
  const H5 = HL('The *wait.*', { top: 205, size: 124, accentSize: 172, at: T.h5, lateAt: T.h5Land, accentColor: CYAN })
  const H6 = HL('They picked | you *back.*', { top: 150, size: 112, accentSize: 156, at: T.h6, lateAt: T.h6Land, accentColor: PINK, lineHeight: 1.0 })
  const H7 = HL('Whatever happens: | we’re *proud* of you.', { top: 168, size: 92, accentSize: 132, at: T.h7, lateAt: T.h7Land, late: 3, lateGap: 0.12, accentColor: GOLD, lineHeight: 1.08, gap: 0.08, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const boxes = BOXES.map(([lines, close, size]) => dialogueBox(root, { lines, y: 1400, width: 960, height: 300, close, cps: CPS, size }))

  // ── the lesson (over the scene, under the grain and the card cuts)
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── stage offset: the lesson tilts the "camera" up to the banner (the world slides down)
  const tiltY = t => { const a = ease.inOutCubic(prog(t, ...T.tilt)), b = ease.inOutCubic(prog(t, ...T.untilt)); return 600 * a * (1 - b) + 170 * b }

  // ─────────────────────────────── the phone (POV; local units 420 × 800, centred)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function phonePos(t) {
    if (t < T.phone[0] || t > T.phoneAway[1]) return null
    const up = easeOutBack(prog(t, ...T.phone), 1.3), aw = ease.inCubic(prog(t, ...T.phoneAway))
    const push = 0.07 * ease.inOutCubic(prog(t, T.swipe + 0.3, T.cut2)) * (1 - prog(t, T.cut2, T.cut2 + 0.01))
    return { x: 540, y: lerp(2400, 975, up) + aw * 1500, s: 1 + push, r: lerp(7, 0, up) - aw * 14 }
  }
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawPhone(t) {
    const P = phonePos(t)
    if (!P) return
    x.save()
    x.translate(P.x, P.y); x.rotate(P.r * Math.PI / 180); x.scale(P.s, P.s)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    const match = t >= T.cut2 - 0.03
    x.save(); x.shadowColor = rgba(match ? PINK : LAV, 0.7); x.shadowBlur = 80; rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh)
    if (match) { g.addColorStop(0, '#120a2c'); g.addColorStop(0.55, '#24124a'); g.addColorStop(1, '#3a1650') }
    else { g.addColorStop(0, '#2a1a5c'); g.addColorStop(0.6, '#24164f'); g.addColorStop(1, '#1a1040') }
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    // a few faint stars on the screen
    const r = rng(12)
    for (let i = 0; i < 26; i++) { x.fillStyle = rgba(BONE, 0.15 + 0.35 * r()); x.fillRect(Math.round(sx + r() * sw), Math.round(sy + r() * sh), 2, 2) }
    // status
    x.fillStyle = rgba(BONE, 0.9); x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillText('9:00 PM', sx + 34, sy + 44)
    x.textAlign = 'right'; x.fillText('✦', sx + sw - 34, sy + 44)
    if (match) drawMatch(t, sx, sy, sw, sh)
    else drawDeck(t, sx, sy, sw, sh)
    x.fillStyle = '#140d2a'; rr(-60, sy + 12, 120, 30, 15); x.fill()      // notch
    x.globalAlpha = 0.07; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + sh * 0.45); x.fill(); x.globalAlpha = 1
    x.restore()
    x.restore()
  }
  const STACK_Y = 18, CARD_W = 286
  function drawDeck(t, sx, sy, sw, sh) {
    x.fillStyle = BONE; x.textAlign = 'left'; x.font = `italic 500 46px ${SERIF}`; x.fillText('Tonight’s deck', sx + 32, sy + 118)
    // the deal: five backs fly up into a neat pile; the top one flips to a veiled card
    for (let i = 0; i < 5; i++) {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.34)
      if (p <= 0) continue
      const e = easeOutBack(p, 1.4), jr = ((i * 37) % 7 - 3) * 0.012
      const cx = lerp((i - 2) * 50, (i - 2) * 3, e), cy = lerp(sh, STACK_Y - i * 3, e), rot = lerp((i - 2) * 0.5, jr, e)
      if (i < 4) { drawCardImg(BACK, BACK_BODY, cx, cy, CARD_W, rot); continue }
      // the top card
      const f = prog(t, ...T.flip), sxk = Math.cos(f * Math.PI)
      const sw2 = prog(t, T.swipe, T.swipe + 0.32), se = ease.inCubic(sw2)
      const tx = cx + se * 520, trot = rot + se * 0.42, ty = cy - se * 40
      const glow = clamp(prog(t, T.glow, T.glow + 0.25)) * (1 - sw2)
      if (glow > 0) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const gg = x.createRadialGradient(tx, ty, 40, tx, ty, 300); gg.addColorStop(0, rgba(GOLD, 0.42 * glow * (0.75 + 0.25 * Math.sin(t * 9)))); gg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = gg; x.fillRect(tx - 300, ty - 300, 600, 600); x.restore()
      }
      if (sxk > 0) drawCardImg(BACK, BACK_BODY, tx, ty, CARD_W, trot, sxk)
      else drawCardImg(FACE, FACE_BODY, tx, ty, CARD_W, trot, -sxk)
      if (glow > 0) { x.save(); x.translate(tx, ty); x.rotate(trot); x.strokeStyle = rgba('#ffe08a', 0.85 * glow); x.lineWidth = 5; rr(-CARD_W / 2 - 6, -224, CARD_W + 12, 448, 26); x.stroke(); x.restore() }
    }
    // release / align, under the card
    const ly = sy + sh - 92, lit = clamp(prog(t, T.swipe - 0.12, T.swipe + 0.05)) * (1 - prog(t, T.swipe + 1.6, T.swipe + 2.2))
    x.font = `700 22px ${MONO}`; x.textBaseline = 'alphabetic'
    x.textAlign = 'left'; x.fillStyle = rgba(BONE, 0.55); x.fillText('← RELEASE', sx + 30, ly)
    x.textAlign = 'right'
    if (lit > 0) { x.save(); x.shadowColor = rgba(GOLD, 0.95); x.shadowBlur = 22 * lit; x.fillStyle = rgba('#ffe08a', 0.55 + 0.45 * lit); const sc = 1 + 0.18 * lit * (0.8 + 0.2 * Math.sin(t * 14)); x.translate(sx + sw - 30, ly); x.scale(sc, sc); x.fillText('ALIGN →', 0, 0); x.restore() }
    else { x.fillStyle = rgba(BONE, 0.55); x.fillText('ALIGN →', sx + sw - 30, ly) }
    // the hint line
    x.textAlign = 'center'; x.font = `500 21px ${INTER}`; x.fillStyle = rgba(BONE, 0.5); x.fillText('Hold the card to peek', 0, sy + sh - 44)
  }
  function drawMatch(t, sx, sy, sw, sh) {
    const k = t - T.cut2
    // chip
    drawRareChip(x, 0, sy + 122, 0.8 * lerp(1.6, 1, ease.outCubic(prog(k, 0.2, 0.42))) * clamp(prog(k, 0.2, 0.26) * 6), '✦ RARE PULL ✦', { size: 30 })
    // two auras, colliding, a star burst between them
    const ay = sy + 330, cl = ease.outCubic(prog(k, 0.0, 0.6)), br = 1 + 0.06 * Math.sin(t * 5)
    x.save(); x.globalCompositeOperation = 'lighter'
    for (const [dx, c1, c2] of [[-1, '#d8ff6a', '#3fd17a'], [1, '#ff7ad9', '#9a6cff']]) {
      const cx = dx * lerp(150, 62, cl), gg = x.createRadialGradient(cx, ay, 6, cx, ay, 120 * br)
      gg.addColorStop(0, rgba(c1, 0.95)); gg.addColorStop(0.45, rgba(c2, 0.55)); gg.addColorStop(1, rgba(c2, 0))
      x.fillStyle = gg; x.beginPath(); x.arc(cx, ay, 120 * br, 0, Math.PI * 2); x.fill()
    }
    const fl = pulse(k, 0.35, 0.8)
    if (fl > 0) { const gg = x.createRadialGradient(0, ay, 0, 0, ay, 200); gg.addColorStop(0, rgba('#fff6d8', 0.9 * fl)); gg.addColorStop(1, rgba('#fff6d8', 0)); x.fillStyle = gg; x.fillRect(-200, ay - 200, 400, 400) }
    x.restore()
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2 + 0.3, d = 40 + 90 * ease.outCubic(prog(k, 0.35, 1.1)), al = 1 - prog(k, 0.8, 1.6)
      if (al > 0 && k > 0.35) { x.globalAlpha = al; drawPixelStar(x, Math.cos(a) * d, ay + Math.sin(a) * d * 0.8, 18, i % 2 ? 1 : 2, [GOLD, BONE, PINK, CYAN][i % 4]); x.globalAlpha = 1 }
    }
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    const tk = clamp(prog(k, 0.3, 0.6))
    x.globalAlpha = tk
    x.fillStyle = rgba(BONE, 0.62); x.font = `700 15px ${MONO}`; x.fillText('MUTUAL ALIGN · YOU BOTH SAID YES', 0, sy + 520)
    x.fillStyle = BONE; x.font = `italic 500 52px ${SERIF}`; x.fillText('You both aligned.', 0, sy + 590)
    // the button
    rr(-140, sy + 636, 280, 62, 31); x.fillStyle = '#f6efff'; x.fill()
    x.fillStyle = '#1b1236'; x.font = `italic 500 28px ${SERIF}`; x.fillText('Say something ✦', 0, sy + 676)
    x.globalAlpha = 1
  }

  // ─────────────────────────────── sparkles, confetti, smoke
  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV, CYAN][i % 5])
    }
    x.restore()
  }
  const CONF = [GOLD, PINK, CYAN, MINT, LAV, '#ff8a64', BONE]
  function confetti(t, t0, x0, y0, n, seed, { spread = 1, up = 1, dur = 2.4 } = {}) {
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
  function smoke(t, t0, cx, cy) {
    const tt = t - t0
    if (tt < 0 || tt > 1.6) return
    const r = rng(4)
    x.save()
    for (let i = 0; i < 16; i++) {
      const a = Math.PI * (0.05 + 0.9 * r()), v = 180 + r() * 360, rad = (36 + r() * 46) * (1 + tt * 1.4)
      const px = cx + Math.cos(a) * v * tt * (r() < 0.5 ? -1 : 1) * 1.4, py = cy - 20 + Math.sin(a) * v * tt * 0.35
      x.globalAlpha = 0.5 * (1 - tt / 1.6)
      const c = Math.max(6, Math.round(rad / 6))
      x.fillStyle = i % 3 ? '#d9cff2' : '#f4ecff'
      for (let j = -3; j <= 3; j++) for (let k2 = -3; k2 <= 3; k2++) if (j * j + k2 * k2 <= 10) x.fillRect(Math.round(px + j * c), Math.round(py + k2 * c * 0.8), c, c)
    }
    x.restore()
  }

  // ─────────────────────────────── the glitter dump: Pisces (top of the pyramid) tips the bucket over Aries
  const BUCKET_AT = (t) => { const P = LAY.PYR.pis; return [P[0] + 8, P[1] + 64 + tiltY(t)] }
  function bucketRot(t) { return 2.25 * ease.inOutCubic(prog(t, ...T.tip)) * (1 - ease.inOutCubic(prog(t, T.pour2[1] + 0.25, T.pour2[1] + 0.7))) }
  function drawGlitterFall(t) {
    if (t < T.pour2[0] || t > T.pour2[1] + 1.2) return
    const [bx, by] = BUCKET_AT(t), cols = ['#ffe08a', '#ff8fb1', '#9fe8ff', '#ffffff', '#c9a6ff', '#7dffb0']
    const A2 = LAY.PYR.ari, top = A2[1] + tiltY(t) - A2[2] * 0.4
    const r = rng(77), N = 340
    x.save()
    for (let i = 0; i < N; i++) {
      const born = T.pour2[0] + (i / N) * (T.pour2[1] - T.pour2[0]), tt = t - born
      const vx = (r() - 0.5) * 300, vy = 40 + r() * 160, sz = 7 + Math.round(r() * 5), stop = top + r() * A2[2] * 0.55, c = cols[i % cols.length]
      if (tt < 0) continue
      const px = bx + 40 + vx * tt, py = by + 26 + vy * tt + 1500 * tt * tt
      if (py > stop) continue                                     // landed on Aries (now part of the coat)
      x.globalAlpha = 0.95
      x.fillStyle = c; x.fillRect(Math.round(px), Math.round(py), sz, sz)
    }
    x.restore()
  }
  // glitter landing puffs + a little puddle at Aries' feet
  function glitterPuddle(t, ax, ay, s, k) {
    if (k <= 0) return
    const r = rng(19), cols = ['#ffe08a', '#ff8fb1', '#9fe8ff', '#ffffff', '#c9a6ff']
    x.save()
    for (let i = 0; i < 60; i++) {
      const dx = (r() - 0.5) * s * 1.3, dy = s * 0.42 + r() * s * 0.12, when = r()
      if (when > k) continue
      x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 6 + i)
      x.fillStyle = cols[i % 5]; x.fillRect(Math.round(ax + dx), Math.round(ay + dy), 6, 6)
    }
    x.restore()
  }

  // ─────────────────────────────── the cast: moods, looks, reactions
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 60 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 120 ? Math.sign(ty - p[1]) : 0]
  const nodK = (t, t0, d = 0.42) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(k / d * Math.PI) }
  function hopsFor(k) {
    const C = CAST[k], st = (C.seed % 5) * 0.03
    const h = []
    if (k === 'ari') h.push(T.run[1] - 0.05, ...ARI_HOPS, T.hoo + 0.05)
    else h.push(T.hoo + st, T.hoo + 0.6 + st)
    const wi = WAVE.indexOf(k)
    if (wi >= 0) h.push(T.wave + wi * T.waveGap)
    if (k === 'pis') h.push(T.late)
    if (k === 'gem') h.push(...GEM_HOPS)
    // the payoff: jumping for joy around the phone, then the stack landings, then cheers
    if (k !== 'gem') for (let j = 0; j < 3; j++) h.push(T.cut2 + 0.08 + j * 0.5 + st)
    h.push(TW.back + st)
    if (STACK.indexOf(k) < 0 && k !== 'ari') h.push(T.splat + 0.2 + st, T.splat + 0.75 + st)
    if (k === 'ari') h.push(T.cut2 + 0.1, T.cut2 + 0.6, T.cut2 + 1.1, T.move + 0.3, T.move + 0.62)
    h.push(T.lesson + 1.75 + st)
    if (k !== 'ari') h.push(T.pfft + 0.25 + st)
    return h.sort((a, b) => a - b)
  }
  const HOPS = Object.fromEntries(KEYS.map(k => [k, hopsFor(k)]))

  function stateOf(k, t, p) {
    const C = CAST[k]
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0, flash = 0
    const isP = k === 'pis', isA = k === 'ari'
    if (isP) tears = 0.45
    if (t < T.cut1) {
      // ── the court: pour out, pep talk, the wave
      if (t < T.burst + 0.9) { mood = 'wide'; look = [0, 0] }
      else if (t < T.l2) {
        mood = isA ? 'squint' : 'happy'
        if (isA && t >= TW.ready) mood = 'wide'
        if (!isA && t >= T.hoo) mood = 'heart'
      } else if (t < T.h2) {
        mood = isA ? 'happy' : 'sparkle'; look = isA ? [0, 0] : toward(p, 540 + ariDX(t), 1215)
        const n = Math.max(nodK(t, TW.kind + 0.05), nodK(t, TW.funny + 0.05))
        if (!isA && n > 0) { mood = 'happy'; squash = 0.14 * n; dy = 12 * n }
        if (t >= TW.rare) {
          const kk = t - TW.rare
          if (!isA && kk < 1.1) { mood = 'wide'; blink = false; dy = -40 * Math.exp(-kk * 5) * Math.abs(Math.cos(kk * 9)); look = [0, -1] }
          else if (!isA) mood = 'heart'
          if (isA) mood = kk < 0.9 ? 'wink' : 'happy'
        }
      } else {
        // the wave
        mood = 'happy'
        const wi = WAVE.indexOf(k)
        if (wi >= 0) { const w0 = T.wave + wi * T.waveGap; flash = pulse(t, w0, 0.45); if (t > w0 && t < w0 + 0.5) mood = 'wide' }
        if (isP) {
          mood = t < T.late ? 'squint' : t < T.turn + 0.1 ? 'wide' : 'neutral'
          tears = t < T.late ? 1 : 0.2
          if (t >= T.late) flash = pulse(t, T.late, 0.45)
          if (t >= T.turn) look = [-1, 0]
        }
        if (!isP && t >= T.turn) { const P2 = LAY.LINE.pis; look = toward(p, P2[0], P2[1]); mood = 'squint'; blink = false }
      }
      if (isA && t < T.cut1 && t > T.burst + 0.9 && t < T.l1) mood = 'squint'
    } else if (t < T.phone[0]) {
      // ── real talk
      mood = 'sparkle'; look = isA ? [0, 0] : toward(p, 540, 1085)
      if (isA) { mood = t < LT[5].start ? 'sparkle' : 'happy'; if (t >= LT[5].done + 0.25 && t < LT[5].done + 0.9) mood = 'wink' }
      if (isP) {
        tears = t >= T.sob ? (t < T.shh[0] + 0.1 ? 1 : 0.15) : 0.6
        if (t >= T.sob && t < T.shh[0] + 0.1) { mood = 'squint'; squash = 0.05 * Math.abs(Math.sin(t * 9)) }
        if (inR(t, T.shh[0] + 0.1, T.shh[1])) { mood = 'wide'; blink = false; look = [0, 1] }
      }
      if (k === 'sco' && inR(t, T.shh[0] - 0.15, T.shh[1])) { mood = 'squint'; look = [0, -1] }
      if (!isA && t >= TW.season) { const n = nodK(t, TW.season + 0.05, 0.6); mood = 'happy'; squash += 0.12 * n; dy += 10 * n }
    } else if (t < T.cut2) {
      // ── the deck and the wait (POV: the phone is at 540, 975)
      const ph = [540, 975]
      look = toward(p, ph[0], ph[1]); mood = 'wide'
      if (t < T.flip[0]) {                                        // eyes darting card to card while it deals
        const dart = Math.floor((t + C.seed * 0.13) * 5) % 3
        look = [dart - 1, toward(p, ph[0], ph[1])[1]]
      } else if (t < T.glow) { mood = t < T.flip[1] + 0.9 ? 'sparkle' : 'neutral' }
      const lean = ease.inOutCubic(prog(t, T.phone[1], T.phone[1] + 0.5))
      dx = Math.sign(ph[0] - p[0]) * 26 * lean
      if (t >= T.l7 && t < T.glow) { const n = Math.max(nodK(t, T.l7 + 0.5, 0.5), nodK(t, T.l7 + 1.1, 0.5)); squash += 0.08 * n }
      if (t >= T.glow) { mood = 'wide'; blink = false }
      if (t >= T.swipe) {                                         // the gasp, then held breath
        const kk = t - T.swipe
        dy = -26 * Math.exp(-kk * 6) * Math.abs(Math.cos(kk * 10))
        squash = 0.07 + 0.02 * Math.sin(t * 3 + C.seed)
        dx = Math.sign(ph[0] - p[0]) * (26 + 18 * ease.inOutCubic(prog(t, ...T.lean2)))
      }
      if (t >= TW.us + 0.05 && t < T.turnBack) { look = toward(p, GEM_PEEK[0], GEM_PEEK[1]); mood = 'squint' }
      if (isA) {
        mood = t < T.glow ? 'squint' : 'wide'
        if (t >= T.l7 && t < LT[6].done + 0.6) mood = 'squint'
        if (t >= T.swipe) { squash += 0.05 * Math.sin(t * 47) }            // trembling
      }
      if (isP) { tears = t >= T.swipe ? 0 : 0.5 }
      if (k === 'gem') { look = t < TW.us + 0.6 ? [0, 0] : [0, 1]; mood = t < T.l8 ? 'wide' : t < LT[7].done + 0.3 ? 'neutral' : 'squint' }
    } else {
      // ── they picked you back · the pyramid · the glitter · the lesson · the team photo
      mood = 'heart'; look = [0, 0]
      if (t >= T.move) { mood = 'happy'; look = toward(p, 540, 1258) }
      if (t >= T.tip[0] && t < T.splat + 0.6) { mood = 'wide'; look = toward(p, 540, 1100) }
      if (t >= T.splat + 0.6) { mood = 'happy'; look = [0, 0] }
      if (isP) { tears = 1; if (t >= T.move) mood = t >= T.tip[0] && t < T.pour2[1] ? 'happy' : 'squint' }
      if (isA) {
        mood = 'happy'
        if (t >= T.splat - 0.02) {
          const kk = t - T.splat
          if (kk < 0.6) { mood = 'wide'; blink = false; squash = 0.24 * Math.exp(-kk * 5) * Math.cos(kk * 18) + 0.06 }
          else if (kk < 1.5) { mood = 'squint'; blink = undefined }
          for (const b of T.blinks) if (t >= b && t < b + 0.12) blink = 1
          if (kk >= 1.5) mood = 'happy'
        }
      }
      if (t >= T.lesson - 0.1 && t < T.untilt[0]) { mood = isA ? 'happy' : 'sparkle'; look = [0, -1] }
      if (t >= T.untilt[0]) {
        mood = isA ? 'happy' : 'sparkle'; look = isA ? [0, 0] : toward(p, 540, 1258)
        if (isA) {
          const n = nodK(t, T.nod[0], T.nod[1] - T.nod[0])
          squash += 0.1 * n; dy += 22 * n; if (n > 0.15) mood = 'happy'
          const kp = t - T.pfft
          if (kp >= 0 && kp < 0.45) { mood = 'wide'; blink = false }
          else if (kp >= 0.45 && kp < 1.1) mood = 'squint'
        }
        if (!isA && t >= T.pfft + 0.15 && t < T.pfft + 1.0) mood = 'happy'
      }
    }
    // big jumps: the HOO, the stadium wave, Pisces' late hop, the celebration round the phone, the cheer at the splat
    const st0 = (C.seed % 5) * 0.03, inStack = STACK.indexOf(k) >= 0
    let j = 0
    if (!isA && t >= T.hoo && t < T.hoo + 1.2) j = Math.max(JUMP(t, T.hoo + st0), 0.7 * JUMP(t, T.hoo + 0.55 + st0))
    const wi = WAVE.indexOf(k)
    if (wi >= 0) j = Math.max(j, 1.1 * JUMP(t, T.wave + wi * T.waveGap, 0.4))
    if (isP) j = Math.max(j, 1.35 * JUMP(t, T.late, 0.5))
    if (t >= T.cut2 && t < T.move) for (let q = 0; q < 3; q++) j = Math.max(j, JUMP(t, T.cut2 + 0.06 + q * 0.5 + st0))
    if (!isA && !inStack && t >= T.splat) j = Math.max(j, JUMP(t, T.splat + 0.2 + st0), 0.7 * JUMP(t, T.splat + 0.75 + st0))
    if (!isA && !inStack && t >= T.pfft) j = Math.max(j, 0.5 * JUMP(t, T.pfft + 0.25 + st0, 0.36))
    dy -= j * p[2] * 0.45; squash -= j * 0.12
    return { mood, look, blink, squash, dx, dy, tears, flash }
  }
  // Aries paces during the pep talk
  function ariDX(t) {
    if (t < T.l2) return 0
    const a = ease.inOutCubic(prog(t, TW.kind - 0.1, TW.kind + 0.25)), b = ease.inOutCubic(prog(t, TW.funny - 0.1, TW.funny + 0.25)), c = ease.inOutCubic(prog(t, TW.text - 0.15, TW.text + 0.25))
    return -150 * a + 300 * b - 150 * c
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

  function drawActor(k, t, P, ok) {
    const p = P.p, pk = P.pk * ok
    if (pk <= 0.02 || p[2] <= 0) return
    const C = CAST[k], st = stateOf(k, t, p)
    let px = p[0] + st.dx, py = p[1] + st.dy + tiltY(t)
    if (k === 'ari' && t < T.cut1) px += ariDX(t)
    const size = p[2]
    const opts = { color: C.color, glyph: size >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: 0.9, bob: size * 0.035 }
    if (k === 'pis' && t >= T.hat[0] && t < T.cut2) opts.mood = 'wide'
    const R = drawStarChar(x, px, py, size, t, opts)
    const S = R.size
    // props in star space
    onStar(x, px, py, size, t, opts, Pp => {
      if (k === 'ari') drawSweatband(Pp, x, { band: '#e8484f', stripe: '#f4ecdc', shade: '#b8323a' })
      else if (k !== 'pis') drawSweatband(Pp, x, {})
      if (k === 'ari') {
        const blow = Math.max(pulse(t, T.whistle - 0.02, 0.62), 0.5 * pulse(t, T.cut1 - 1.2, 0.01))
        const chatter = t >= T.swipe && t < T.cut2 ? 1 : 0
        const gl = t >= T.pfft ? prog(t, T.pfft, T.pfft + 0.9) : 0
        drawWhistle(Pp, x, t, { blow, chatter, glitter: gl > 0 && gl < 1 ? gl : 0 })
        const coat = t >= T.splat - 0.05 ? clamp((t - T.splat + 0.05) / 0.5) : 0
        if (coat > 0) drawGlitterCoat(Pp, x, t, coat)
      }
      if (k === 'pis') {
        let down = 0
        if (t >= T.hat[0] && t < T.cut2) {
          down = ease.inOutCubic(prog(t, ...T.hat))
          const pk2 = prog(t, ...T.peek); if (pk2 > 0 && pk2 < 1) down -= 0.32 * Math.sin(Math.PI * pk2)
          down *= 1 - ease.outCubic(prog(t, T.cut2 - 0.05, T.cut2 + 0.2))
        }
        drawFishHat(Pp, x, t, { down })
      }
    })
    // the glyph flash on the wave
    if (st.flash > 0 && C.glyph) {
      const gxp = px + (27.6 - 18) * (S / 36), gyp = R.y + (29.4 - 18) * (S / 36)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(gxp, gyp, 2, gxp, gyp, S * 0.32); g.addColorStop(0, rgba('#fff3c8', 0.95 * st.flash)); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.fillRect(gxp - S * 0.32, gyp - S * 0.32, S * 0.64, S * 0.64); x.restore()
      drawPixelStar(x, gxp, gyp - S * 0.18 * st.flash, 22 * st.flash, 2, GOLD)
    }
    if (st.tears > 0 && !(k === 'pis' && t >= T.hat[0] && t < T.cut2)) {
      const ey = R.y + S * 0.07, exo = S * 0.17
      drawTears([[px - exo, ey], [px + exo, ey]], t, Math.max(4, S / 22), st.tears)
    }
    return R
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const list = []
    for (const k of KEYS) { const P = place(k, t); if (P) list.push([k, P]) }
    list.sort((a, b) => (a[1].p[1] + (a[1].p[2] > 300 ? 400 : 0)) - (b[1].p[1] + (b[1].p[2] > 300 ? 400 : 0)))
    const behind = list.filter(([, P]) => P.layer === 'behind'), front = list.filter(([, P]) => P.layer !== 'behind')
    for (const [k, P] of behind) drawActor(k, t, P, ok)
    drawPhone(t)
    for (const [k, P] of front) {
      if (k === 'ari' && t >= T.move) { drawGlitterFall(t); }
      drawActor(k, t, P, ok)
      if (k === 'pis' && t >= T.stack[5] - 0.05 && t < T.pour2[1] + 1.2) {
        const [bx, by] = BUCKET_AT(t), bk = pop01(t, T.stack[5] - 0.05, 0.3, 2) * (1 - prog(t, T.pour2[1] + 0.6, T.pour2[1] + 1.0))
        if (bk > 0.02) { x.save(); x.globalAlpha = clamp(bk); drawBucket(x, bx, by, 8 * Math.min(1, bk), bucketRot(t), t); x.restore() }
      }
    }
  }

  // ─────────────────────────────── the world: sky, court, doors (they all slide with the tilt)
  function drawWorld(t) {
    drawSky(x, t, SKY_H)
    const ty = tiltY(t), ok = popOut(t, T.out)
    const fl = pulse(t, T.burst - 0.02, 0.3)
    x.save(); x.translate(0, ty)
    // a push-in on the real talk: the court zooms behind the close-up
    const zoom = inR(t, T.cut1, T.phone[1] + 0.3) ? 1.28 + 0.05 * prog(t, T.cut1, T.phone[0]) : 1
    const talkK = inR(t, T.cut1, T.phone[1] + 0.3) ? 1 : 0, lesK = clamp(prog(t, ...T.tilt)) * (1 - prog(t, ...T.untilt))
    x.translate(540, HORIZON); x.scale(zoom, zoom); x.translate(-540, -HORIZON)
    const deckDim = inR(t, T.phone[0], T.move + 0.4) ? 0.55 * clamp(prog(t, T.phone[0], T.phone[1])) * (1 - prog(t, T.move, T.move + 0.4)) : 0
    drawFloor(x, t, { horizon: HORIZON, alpha: ok * (1 - deckDim * 0.6) * clamp(prog(t, 0, 0.3) + 0.2) })
    const rattle = T.rattle.reduce((m, r) => Math.max(m, pulse(t, r, 0.18)), 0)
    const open = t < T.burst ? 0 : easeOutBack(prog(t, T.burst, T.burst + 0.2), 1.6)
    drawDoors(x, t, { ...DOOR, open: clamp(open, 0, 1.06), rattle, alpha: ok * (1 - deckDim), light: 1, lit: 1 - 0.9 * talkK - 0.6 * lesK, sign: 1 - Math.max(talkK, lesK, deckDim / 0.55) })
    if (fl > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = rgba('#ffe6b0', 0.22 * fl); x.fillRect(-200, -400, W + 400, H + 800); x.restore() }
    smoke(t, T.burst, 540, HORIZON - 10)
    x.restore()
    if (deckDim > 0) { x.fillStyle = `rgba(6,4,18,${0.3 * deckDim})`; x.fillRect(0, 0, W, H) }
  }

  // the "shh!" bubble, the RARE chip
  function drawOverlays(t) {
    const shk = pop01(t, T.shh[0], 0.25, 2.4) * (1 - prog(t, T.shh[1] - 0.15, T.shh[1]))
    if (t >= T.shh[0] && shk > 0) { const P = LAY.TALK.sco; drawBubble(x, P[0] - 78, P[1] - 136, 'shh!', shk, { size: 42, tail: 'right' }) }
    const rk = t >= TW.rare ? lerp(1.9, 1, ease.outCubic(prog(t, TW.rare, TW.rare + 0.18))) * (1 - ease.inCubic(prog(t, T.h1Out[0] - 0.3, T.h1Out[0]))) : 0
    if (rk > 0.02 && t < T.h1Out[0]) {
      x.save(); x.globalAlpha = clamp(prog(t, TW.rare, TW.rare + 0.08)); drawRareChip(x, 540, 1030, rk, '✦ RARE ✦', { size: 46 }); x.restore()
      sparkles(t, 540, 1030, TW.rare + 0.05, 12, 260, 0.4, 0.7, 26)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      if (t < T.out[1] + 0.02) {
        drawCast(t)
        drawOverlays(t)
        // bursts
        sparkles(t, 540, 1100, T.burst + 0.05, 14, 420, 0.2, 0.8, 30)
        sparkles(t, 540, 975, T.cut2 + 0.06, 16, 330, 0.5, 0.9, 30)
        confetti(t, T.cut2 + 0.02, 540, 1000, 70, 3)
        confetti(t, T.splat + 0.1, 540, 1150 + tiltY(t), 50, 9, { spread: 1.3, up: 0.8 })
        if (t >= T.splat) glitterPuddle(t, 540, LAY.PYR.ari[1] + tiltY(t), LAY.PYR.ari[2], clamp((t - T.splat) / 0.8) * popOut(t, T.out))
        sparkles(t, 640, LAY.PYR.ari[1] + tiltY(t) + 40, T.pfft + 0.1, 12, 200, 0.9, 0.8, 24)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the 2nd + 4th: 13.38 deal into the real talk, 27.27 flip = the
// reveal). The others stay inert: 10.2 (pep talk → hype squad), 19.38 (real talk → the deck), 31.6 (→ the lesson).
export const CUTS = [10.2, { t: T.cut1, kind: 'deal' }, T.phone[0], { t: T.cut2, kind: 'flip' }, 31.6]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are written in the D-major palette (the engine moves them into A minor's C major);
//    chip / tom / clap cues ride a private 'sfx' bus, written straight in A minor.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const whistle = (t, len = 0.5, g = 0.05) => [['chip', r3(t), 2637, len, { ...FX, wave: 'square', duty: 0.5, arp: [0, 0, 1, 1, 0, 1], gain: g, decay: 0.04, sustain: 0.85 }], ['chip', r3(t), 9000, len * 0.8, { ...FX, wave: 'noise', gain: g * 0.35, decay: 0.05, sustain: 0.5 }]]
const thump = (t, g = 0.22) => [['tom', r3(t), 70, { ...FX, gain: g, decay: 0.2 }], ['tick', r3(t), 0.05]]
const heartbeat = t => [['tom', r3(t), 55, { ...FX, gain: 0.26, decay: 0.16 }], ['boom', r3(t), 0.05]]
const chirp = (t, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t + i * 0.045), 4186, gain, 0.4])
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const boing = t => [['chip', r3(t), 330, 0.32, { ...FX, wave: 'square', duty: 0.25, slide: 14, vib: 0.03, gain: 0.03, decay: 0.2, sustain: 0.6 }]]
const cheers = (t0, t1, n = 14, gain = 0.07) => { const out = [['swell', r3(t0), r3(t1), { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < n; k++) out.push(['clap', r3(t0 + 0.08 + k * ((t1 - t0) / n) + (k * 0.037) % 0.05), { ...FX, gain, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const stamp = t => [['tom', r3(t), 82, { ...FX, gain: 0.28, decay: 0.28 }], ['boom', r3(t), 0.08], ['clap', r3(t + 0.005), { ...FX, gain: 0.12 }]]
const shh = t => [['chip', r3(t), 6000, 0.42, { ...FX, wave: 'noise', gain: 0.03, decay: 0.3, sustain: 0.7 }]]
const pfft = t => [['chip', r3(t), 2637, 0.09, { ...FX, wave: 'square', duty: 0.5, gain: 0.02, decay: 0.05, sustain: 0.4 }], ['chip', r3(t + 0.05), 5000, 0.3, { ...FX, wave: 'noise', gain: 0.03, decay: 0.15, sustain: 0.3 }], ['glitter', r3(t + 0.05), r3(t + 0.6)], ['pop', r3(t + 0.12), 1318.51, 0.02, 0.2]]
const ARI_PITCH = 620
const PITCH = { [ARI]: ARI_PITCH, [ARI + ' (whispering)']: 700, [STARS]: 880, [GEMN]: 1046.5 }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],   // the private sfx bus rides inside the music mix (levelled ~36 dB down): bring it back up
  // 1 · the locker room
  ...head(T.h0, 2, T.h0Land, 0),
  ...T.rattle.flatMap(r => thump(r, 0.18)),
  ['riser', 0.2, T.burst, 0.035],
  ['boom', T.burst, 0.3], ['whoosh', r3(T.burst + 0.02), 0.5, 0.09], ['glitter', T.burst, r3(T.burst + 0.6)], ...cheers(r3(T.burst + 0.05), r3(T.burst + 1.0), 10, 0.05),
  ['tom', r3(T.run[1]), 90, { ...FX, gain: 0.2, decay: 0.2 }],
  ...whistle(T.whistle, 0.5, 0.06),
  ...Array.from({ length: 11 }, (_, i) => ['pop', r3(T.pour + 0.42 + i * T.pourGap), NOTE[i % 7], 0.016, ((i % 5) - 2) * 0.2]),
  ...cheers(r3(T.hoo), r3(T.hoo + 0.7), 8, 0.06), ['pop', r3(T.hoo), 1174.66, 0.03, 0],
  // 2 · pep talk
  ...head(T.h1, 1, T.h1Land, 2),
  ['pop', r3(TW.kind + 0.06), 587.33, 0.03, -0.2], ['pop', r3(TW.funny + 0.06), 659.25, 0.03, 0.2],
  ['whoosh', r3(TW.kind - 0.1), 0.25, 0.03], ['whoosh', r3(TW.funny - 0.1), 0.25, 0.03], ['whoosh', r3(TW.text - 0.15), 0.25, 0.03],
  ...stamp(TW.rare), ['bell', r3(TW.rare + 0.02), 1760, 0.035, 1.4, 0], ['glitter', r3(TW.rare), r3(TW.rare + 0.6)], ['whoosh', r3(TW.rare + 0.05), 0.3, 0.05],
  ...[0, 1, 2, 3].map(i => ['chip', r3(TW.rare + 0.12 + i * 0.06), [880, 1046.5, 1318.5, 1760][i], 0.08, { ...FX, wave: 'square', duty: 0.25, gain: 0.022, decay: 0.05, sustain: 0.5 }]),
  // 3 · hype squad: the wave, the late hop
  ...head(T.h2, 1, T.h2Land, 4),
  ...WAVE.map((k, i) => ['pop', r3(T.wave + i * T.waveGap), NOTE[i % 7] * (i >= 7 ? 2 : 1), 0.03, -0.5 + i * 0.09]),
  ...sob(r3(T.wave + 0.4), 1318.5, 3),
  ['tick', r3(T.late - 0.4), 0.02], ...boing(T.late), ['pop', T.late, 440, 0.03, 0.5],
  ['tick', r3(T.turn), 0.06], ['tick', r3(T.turn + 0.03), 0.05], ...chirp(r3(T.turn + 0.35)), ...chirp(r3(T.turn + 0.62), 0.011),
  // 4 · real talk
  ...head(T.h3, 1, T.h3Land, 1, 0.02),
  ...sob(T.sob, 1318.5, 3), ...sob(r3(T.sob + 0.55), 1174.7, 2),
  ...shh(T.shh[0]), ['pop', r3(T.shh[0]), 1318.51, 0.02, 0.4],
  ['pluck', r3(TW.season + 0.1), 659.25, 0.03, 0.9, 0], ['pluck', r3(TW.season + 0.22), 880, 0.025, 0.9, 0],
  // 5 · tonight's deck
  ['whoosh', T.phone[0], 0.45, 0.05], ['pop', r3(T.phone[1] - 0.1), 880, 0.03, 0],
  ...head(T.h4, 1, T.h4Land, 3),
  ...[0, 1, 2, 3, 4].map(i => ['tick', r3(T.deal + i * T.dealGap + 0.2), 0.05]),
  ['tick', r3(T.flip[0] + 0.12), 0.05], ['bell', T.flip[1], 1318.51, 0.035, 1.4, 0], ['glitter', r3(T.flip[0] + 0.1), r3(T.flip[1] + 0.4)],
  ['bell', T.glow, 1567.98, 0.025, 1.2, 0.2], ['riser', r3(T.glow), r3(T.swipe), 0.03],
  ['whoosh', r3(T.swipe - 0.02), 0.3, 0.07], ['pluck', r3(T.swipe + 0.05), 1174.66, 0.04, 0.6, 0.3], ['pop', r3(T.swipe + 0.05), 1318.51, 0.035, 0.3],
  // 6 · the wait (the music tape-stops on the swipe)
  ['tapeStop', r3(T.swipe + 0.02), 0.55],
  ...head(T.h5, 1, T.h5Land, 5, 0.018),
  ...T.beats.flatMap(heartbeat),
  ['pop', r3(T.hat[0] + 0.05), 523.25, 0.025, 0.4], ['pop', r3(T.hat[0] + 0.14), 440, 0.022, 0.4],
  ...chirp(T.crick, 0.012),
  ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.swipe + 0.8 + i * 0.32), 0.012]),       // the whistle chattering
  ['pop', r3(T.gemUp[0] + 0.1), 1318.51, 0.03, 0], ['whoosh', r3(T.gemUp[0]), 0.25, 0.03],
  ['tick', r3(TW.us + 0.06), 0.06], ['tick', r3(TW.us + 0.09), 0.05], ['tick', r3(T.turnBack), 0.05],
  ['riser', r3(T.lean2[0]), r3(T.cut2), 0.03],
  // 7 · they picked you back (the lift lands on the flip)
  ['boom', r3(T.cut2 + 0.02), 0.26], ['glitter', r3(T.cut2 + 0.05), r3(T.cut2 + 0.9)], ['bell', r3(T.cut2 + 0.35), 1760, 0.04, 1.8, 0],
  ...cheers(r3(T.cut2 + 0.05), r3(T.cut2 + 1.8), 16, 0.08),
  ...[0, 1, 2, 3].map(i => ['chip', r3(T.cut2 + 0.24 + i * 0.06), [880, 1046.5, 1318.5, 1760][i], 0.08, { ...FX, wave: 'square', duty: 0.25, gain: 0.02, decay: 0.05, sustain: 0.5 }]),   // RARE PULL: the RARE stamp's arpeggio, called back
  ...head(T.h6, 3, T.h6Land, 2),
  ['whoosh', T.phoneAway[0], 0.35, 0.05],
  ...T.stack.map((s, i) => ['pop', r3(s), NOTE[i % 7] * 1.0, 0.035, ((i % 3) - 1) * 0.3]), ...T.stack.map(s => ['tick', r3(s), 0.05]),
  ['pop', r3(T.tip[0]), 659.25, 0.03, 0], ['whoosh', r3(T.tip[0] + 0.1), 0.4, 0.05],
  ['glitter', r3(T.pour2[0]), r3(T.pour2[1])], ['swell', r3(T.pour2[0]), r3(T.splat), { bus: 'sfx', gain: 0.04, f0: 3000, f1: 8000 }],
  ['boom', r3(T.splat), 0.12], ['tom', r3(T.splat), 110, { ...FX, gain: 0.2, decay: 0.2 }], ...cheers(r3(T.splat + 0.15), r3(T.splat + 1.2), 12, 0.07),
  ...T.blinks.map(b => ['tick', r3(b), 0.05]), ...T.blinks.map((b, i) => ['pop', r3(b + 0.02), 1567.98 + i * 200, 0.02, 0]),
  // 8 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['whoosh', T.tilt[0], 0.5, 0.035], ['whoosh', T.untilt[0], 0.5, 0.03],
  // 9 · whatever happens
  ...wordPops(T.h7, 3, 0.08, 1, 0.022), ['pop', T.h7Land, 1174.66, 0.045, 0], ['pluck', T.h7Land, 880, 0.04, 0.8, 0], ['pop', r3(T.h7Land + 0.12), 1318.51, 0.035, 0], ['pop', r3(T.h7Land + 0.24), 1174.66, 0.03, 0],
  ['pluck', r3(T.nod[0] + 0.4), 659.25, 0.03, 1.2, 0], ['pluck', r3(T.nod[0] + 0.52), 880, 0.025, 1.2, 0],
  ...pfft(T.pfft),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
