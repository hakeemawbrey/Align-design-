// srdummies (60 s vertical, Star Talk Remix of "Astrology for dummies") · story 0–55.6, then the shared end card.
// A brand-new little star (YOU, NEW HERE) fires the original's dumb-in-a-charming-way questions as big Q headlines;
// THE STARS answer in the box, each with its own pixel illustration. Mercury talks back, Pisces cries, the Fool card
// shows up for the tie-in (talk cards), and the new star graduates.
//   0.00–4.40  NO JUDGEMENT · "Astrology for | *dummies.*"  The new star pops in under a bouncing "?". THE STARS: "no
//              such thing as a *dumb question.*"
//   4.50–10.5  Q1 "What's my *sign?*"  A MAY 12 calendar page; the Sun slides along ♈ ♉ ♊ and lands on Taurus.
//              THE STARS: "where the Sun was *on your birthday.*"  YOU: "so I'm a Taurus. *done!*"
//  10.6–17.1   Q2 "Why do they want | my *birth time?*"  A clock spins; the Moon hops sign to sign. THE STARS: "the Moon
//              changes sign every *~2.5 days.*" → "your Rising changes every *~2 hours.*" (the new star goes dizzy)
//  17.20       card cut (deal)
//  17.3–23.6   Q3 "What's a | *Rising* sign?"  A ♎ disc rises over the hills like a sunrise. THE STARS: "the sign on the
//              horizon *when you were born.*" → "it's your *first impression.*" (a HELLO · RISING: ♎ LIBRA tag slaps on)
//  23.75–30.0  Q4 "Why's everyone | blaming *Mercury?*"  BLAMED FOR: the wifi · your ex texting · the printer. Mercury
//              draws a retrograde loop. THE STARS: "it only *looks* like it's going backwards." ☿ MERCURY: "I am NOT going
//              *backwards.*"  (℞ ~3× A YEAR)
//  30.10       card cut (shuffle)
//  30.2–36.4   Q5 "Am I a | *cusp?*"  The Sun teeters on the ARIES | TAURUS line with a balance pole, then hops.
//              THE STARS: "nope. the Sun's in *one sign at a time.*" → "your birth time *settles it.*"
//  36.5–42.5   Q6 "Who do I | *get along* with?"  Flame + wind roar; a drop on a mountain grows a sprout. THE STARS:
//              "fire + air fan *the flames.*" → "earth + water *grow things.*"
//  42.60       card cut (flip)
//  42.7–46.6   Q7 "Okay but… | is it *real?*"  CLAY TABLETS · STONE CIRCLES · ASTROLABES. THE STARS: "people have read us
//              for *thousands of years.*"
//  46.71–50.8  ★ LESSON UNLOCKED: "Try it on. | Keep what *fits.*"  +1 CURIOSITY
//  50.9–55.45  The Fool talk card ("What's a hill you will die on?") deals in. THE STARS: "even the Fool asks *good
//              questions.*"  Then "Congrats. | You're *not* a | dummy anymore."  A graduation cap tosses and lands.
// One canvas (sky + illustrations + cast), DOM type + dialogue boxes + lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SIGNS, ELEMENT_COLOR, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { pstar, GOLD, BONE, PINK, LAV, INK, MONO, INTER, SERIF, rgba, pop01, popOut, outK, inR, glow, orbChar, gradCap, pointer, sparkBurst, tears, sweat, chip, hearts, steam } from './props.js'

export const DURATION = 60
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const BEAT = n => 0.6 + n * 0.5556
const NEW_COL = '#bfe3ff', MERC_COL = '#9fd2e8'

const Q = [
  { n: 'NO JUDGEMENT', a: 0.15, b: 4.42, text: 'Astrology for | *dummies.*', acc: PINK },
  { n: 'Q1', a: 4.5, b: 10.5, text: "What's my *sign?*", acc: GOLD },
  { n: 'Q2', a: 10.6, b: 17.1, text: 'Why do they want | my *birth time?*', acc: '#dcd6f2', size: 92 },
  { n: 'Q3', a: 17.3, b: 23.65, text: "What's a | *Rising* sign?", acc: signStar('libra').color },
  { n: 'Q4', a: 23.75, b: 30.0, text: "Why's everyone | blaming *Mercury?*", acc: MERC_COL, size: 92 },
  { n: 'Q5', a: 30.2, b: 36.4, text: 'Am I a | *cusp?*', acc: GOLD },
  { n: 'Q6', a: 36.5, b: 42.5, text: 'Who do I | *get along* with?', acc: ELEMENT_COLOR.fire, size: 104 },
  { n: 'Q7', a: 42.7, b: 46.55, text: 'Okay but… | is it *real?*', acc: GOLD },
]
const T = {
  pop: 0.3, toCorner: [4.3, 4.9],
  cal: 5.0, slide: [5.5, 6.6], done: 7.9,
  clock: 10.9, moonHop: 11.4, rising: 14.2,
  hills: 17.5, rise: [18.1, 20.2], tag: 21.1, tagFly: [22.7, 23.15],
  blame: [24.0, 24.3, 24.6], loop: [24.4, 28.6], rx: 26.4,
  strip: 30.4, teeter: [30.8, 32.5], hop: BEAT(57), clockQ5: 33.9, tick: [34.2, 34.5, 34.8],
  icons: 36.8, fireAir: 37.2, earthWater: 39.8,
  hist: [43.3, 43.7, 44.1],
  lesson: BEAT(83), lessonOut: [50.65, 50.85],
  deal: [50.9, 51.45], h8: 52.3, h8Land: 53.2, toss: BEAT(96), land: 54.75, out: [55.0, 55.45],
}
const CUT1 = 17.2, CUT2 = 30.1, CUT3 = 42.6
const NARR = 'THE STARS', NEWN = '☆ YOU (NEW HERE)', MERN = '☿ MERCURY'
const L = (t, speaker, text, color) => ({ t, speaker, text, color })
const BOXES = [
  [[L(1.4, NARR, 'no such thing as a *dumb question.*')], 1.2, 4.3],
  [[L(5.1, NARR, 'where the Sun was *on your birthday.*'), L(7.9, NEWN, "so I'm a Taurus. *done!*", NEW_COL)], 4.9, 10.45],
  [[L(11.0, NARR, 'the Moon changes sign every *~2.5 days.*', '#dcd6f2'), L(14.2, NARR, 'your Rising changes every *~2 hours.*', signStar('libra').color)], 10.8, 17.05],
  [[L(17.9, NARR, 'the sign on the horizon *when you were born.*', signStar('libra').color), L(21.0, NARR, "it's your *first impression.*", signStar('libra').color)], 17.7, 23.6],
  [[L(24.3, NARR, "it only *looks* like it's going backwards.", MERC_COL), L(27.4, MERN, 'I am NOT going *backwards.*', MERC_COL)], 24.1, 29.95],
  [[L(30.7, NARR, "nope. the Sun's in *one sign at a time.*"), L(33.8, NARR, 'your birth time *settles it.*')], 30.5, 36.3],
  [[L(37.0, NARR, 'fire + air fan *the flames.*', ELEMENT_COLOR.fire), L(39.6, NARR, 'earth + water *grow things.*', '#7fdc8a')], 36.8, 42.45],
  [[L(43.0, NARR, 'people have read us for *thousands of years.*')], 42.85, 46.5],
  [[L(51.0, NARR, 'even the Fool asks *good questions.*')], 50.85, 53.8],
]
const ALL = BOXES.flatMap(b => b[0])
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Try it on. | Keep what *fits.*', chip: '+1 CURIOSITY', accentColor: GOLD, dim: 0.55 }

// ── layout
const NEWB0 = { x: 540, y: 1010, s: 300 }, NEWB = { x: 175, y: 1325, s: 180 }
const STARS = { x: 905, y: 1318, s: 190 }
const PISP = { x: 968, y: 600, s: 100 }
const MID = { x: 540, y: 880 }
const lerpP = (a, b, e) => ({ x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), s: lerp(a.s, b.s, e) })
const segOn = (t, i) => t >= Q[i].a - 0.05 && t < Q[i].b + 0.05
const segK = (t, i, d = 0.35) => pop01(t, Q[i].a + 0.15, d, 2.2) * popOut(t, [Q[i].b - 0.3, Q[i].b])

const HOPS = {
  stars: [...talkHops(ALL, NARR, { cps: CPS }), T.toss],
  newb: [...talkHops(ALL, NEWN, { cps: CPS }), T.pop + 0.4, T.toCorner[1], T.slide[1] + 0.2, T.tagFly[1], T.hop, T.land],
  merc: talkHops(ALL, MERN, { cps: CPS }),
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 44px Inter", "italic 500 168px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const CARD = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-talk-1.png' })

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const HEADS = Q.map(q => [popText(root, q.text, { top: 205, size: q.size || 112, accentSize: (q.size || 112) * 1.5, gap: 0.08, wobble: true, fit: true, at: q.a + 0.1, late: 1, lateAt: q.a + 0.55, accentColor: q.acc }), [q.b - 0.15, q.b]])
  const H8 = popText(root, 'Congrats. | You\'re *not* a | dummy anymore.', { top: 190, size: 100, accentSize: 150, gap: 0.08, wobble: true, fit: true, at: T.h8, late: 0, accentColor: GOLD })
  HEADS.push([H8, T.out])
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1450, width: 960, height: 290, open, close, cps: CPS }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const GF = "'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', sans-serif"
  const txt = (s, px, py, { size = 40, font = INTER, w = 800, col = BONE, align = 'center', a = 1 } = {}) => {
    x.save(); x.globalAlpha *= a; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(6,4,18,0.8)'; x.fillText(s, px + 2, py + 3); x.fillStyle = col; x.fillText(s, px, py); x.restore()
  }
  const panel = (cx, cy, w, h, border, fillC = 'rgba(16,9,38,0.92)') => {
    x.fillStyle = border; x.fillRect(cx - w / 2 - 6, cy - h / 2, w + 12, h); x.fillRect(cx - w / 2, cy - h / 2 - 6, w, h + 12)
    x.fillStyle = fillC; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  }
  /** three sign tiles in a row (ids), centred at y; returns tile centres */
  function tiles(ids, y, k, { lit = -1, w = 290, h = 170 } = {}) {
    const out = []
    ids.forEach((id, i) => {
      const s = SIGNS.find(z => z.id === id), cx = 540 + (i - 1) * (w + 20)
      out.push({ x: cx, y })
      const kk = clamp(k)
      if (kk <= 0) return
      x.save(); x.translate(cx, y); x.scale(k, k)
      panel(0, 0, w, h, i === lit ? s.color : rgba(s.color, 0.5), i === lit ? rgba(s.color, 0.3) : 'rgba(16,9,38,0.88)')
      x.restore()
      txt(s.glyph + '︎', cx, y - 26 * k, { size: 64 * k, font: GF, w: 700, col: s.color, a: kk })
      txt(s.name.toUpperCase(), cx, y + 48 * k, { size: 30 * k, font: MONO, w: 700, col: BONE, a: kk })
    })
    return out
  }

  // ── Q1: the calendar page + the Sun sliding to Taurus
  function q1(t) {
    if (!segOn(t, 1)) return
    const k = segK(t, 1)
    const ck = pop01(t, T.cal, 0.4, 2.4) * popOut(t, [Q[1].b - 0.3, Q[1].b])
    if (ck > 0.01) {
      x.save(); x.translate(540, 640); x.scale(ck, ck); x.rotate(-0.04)
      x.fillStyle = INK; x.fillRect(-176, -126, 352, 252); x.fillStyle = '#f4ecdc'; x.fillRect(-170, -120, 340, 240)
      x.fillStyle = '#e23d66'; x.fillRect(-170, -120, 340, 70)
      x.fillStyle = INK; for (const bx of [-110, -40, 40, 110]) x.fillRect(bx - 6, -138, 12, 34)
      x.restore()
      txt('MAY', 540, 640 - 85 * ck, { size: 42 * ck, font: MONO, w: 700, col: '#fff', a: clamp(ck) })
      txt('12', 540, 640 + 30 * ck, { size: 120 * ck, col: INK, a: clamp(ck) })
      if (t > T.slide[1]) { hearts(x, t, 540 + 150, 560, T.slide[1] + 0.1, { n: 0 }) }
    }
    const T3 = tiles(['aries', 'taurus', 'gemini'], 980, k, { lit: t > T.slide[1] ? 1 : -1 })
    // the Sun
    const e = ease.inOutCubic(prog(t, ...T.slide)), land = t - T.slide[1]
    const sx = lerp(T3[0].x - 40, T3[1].x, e), sy = 980 - 150 - (land > 0 ? Math.abs(Math.sin(land * 9)) * 30 * Math.exp(-land * 4) : Math.abs(Math.sin(e * Math.PI * 3)) * 20)
    orbChar(x, sx, sy, 56, t, { color: '#f6c45a', mood: 'shades', seed: 3, pop: pop01(t, Q[1].a + 0.6, 0.35, 2.2) * popOut(t, [Q[1].b - 0.3, Q[1].b]) })
    if (land > 0) {
      sparkBurst(x, t, T3[1].x, 980, T.slide[1], { n: 14, R: 220, size: 26, seed: 2, cols: [GOLD, '#e9b24a', BONE] })
      chip(x, 'YOUR SUN SIGN', T3[1].x, 1100, { size: 30, k: pop01(t, T.slide[1] + 0.2, 0.3, 2.6) * popOut(t, [Q[1].b - 0.3, Q[1].b]), fg: INK, bg: GOLD, border: BONE })
    }
  }

  // ── Q2: a spinning clock + the Moon hopping signs (+ the Rising sweeping round)
  function q2(t) {
    if (!segOn(t, 2)) return
    const k = segK(t, 2)
    const cx = 300, cy = 690, r = 140 * k
    if (r > 1) {
      glow(x, cx, cy, r * 1.8, '#dcd6f2', 0.5)
      x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 10, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#f4ecdc'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
      x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; x.fillRect(cx + Math.cos(a) * r * 0.82 - 5, cy + Math.sin(a) * r * 0.82 - 5, 10, 10) }
      const sp = t < T.rising ? 2.4 : 2.4 + (t - T.rising) * 9
      const ha = (t - Q[2].a) * sp, ma = (t - Q[2].a) * sp * 12
      x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(ha) * r * 0.5, cy - Math.cos(ha) * r * 0.5); x.stroke()
      x.strokeStyle = '#e23d66'; x.lineWidth = 7; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.sin(ma) * r * 0.78, cy - Math.cos(ma) * r * 0.78); x.stroke()
      x.restore()
    }
    // the Rising chip (by the clock)
    chip(x, 'RISING: ~2 HRS EACH', 740, 560, { size: 30, k: pop01(t, T.rising + 0.9, 0.3, 2.6) * popOut(t, [Q[2].b - 0.3, Q[2].b]), fg: signStar('libra').color, border: signStar('libra').color })
    chip(x, 'MOON: ~2.5 DAYS EACH', 740, 640, { size: 30, k: pop01(t, 12.2, 0.3, 2.6) * popOut(t, [Q[2].b - 0.3, Q[2].b]), fg: '#dcd6f2', border: '#dcd6f2' })
    // the Moon hops ♐ → ♑ → ♒ (on loop)
    const T3 = tiles(['sagittarius', 'capricorn', 'aquarius'], 1010, k, { lit: Math.floor(Math.max(0, t - T.moonHop) / 0.9) % 3 })
    if (t > T.moonHop) {
      const ph = (t - T.moonHop) / 0.9, i = Math.floor(ph) % 3, f = ph % 1
      const a = T3[i], b = T3[(i + 1) % 3]
      const hopE = f < 0.6 ? 0 : ease.inOutCubic((f - 0.6) / 0.4)
      const wrap = (i + 1) % 3 === 0
      const mx = wrap ? lerp(a.x, a.x + 120, hopE) : lerp(a.x, b.x, hopE), my = 1010 - 150 - Math.sin(Math.PI * hopE) * 90
      orbChar(x, mx, my, 42, t, { color: '#dcd6f2', mood: 'happy', seed: 5, pop: pop01(t, T.moonHop - 0.2, 0.3, 2.2) * popOut(t, [Q[2].b - 0.3, Q[2].b]), alpha: wrap ? 1 - hopE : 1 })
    }
  }

  // ── Q3: hills + a ♎ sunrise + the HELLO tag
  function q3(t) {
    if (!segOn(t, 3)) return
    const o = popOut(t, [Q[3].b - 0.3, Q[3].b])
    const hk = ease.outCubic(prog(t, T.hills, T.hills + 0.6)) * clamp(o)
    // the rising disc (behind the hills)
    const re = ease.inOutCubic(prog(t, ...T.rise))
    const dy = lerp(1180, 830, re), lib = signStar('libra')
    if (hk > 0) {
      glow(x, 540, dy, 420 * re + 40, '#ffb36b', 0.9 * hk)
      x.save(); x.globalAlpha = hk
      x.fillStyle = '#ffd08a'; x.beginPath(); x.arc(540, dy, 150, 0, Math.PI * 2); x.fill()
      x.fillStyle = lib.color; x.beginPath(); x.arc(540, dy, 130, 0, Math.PI * 2); x.fill()
      x.font = `700 150px ${GF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff4e0'; x.fillText(lib.glyph + '︎', 540, dy + 8)
      // rays
      x.strokeStyle = rgba('#ffd08a', 0.6 * re); x.lineWidth = 10
      for (let i = 0; i < 9; i++) { const a = Math.PI + (i + 0.5) * Math.PI / 9 + Math.sin(t) * 0.03; x.beginPath(); x.moveTo(540 + Math.cos(a) * 190, dy + Math.sin(a) * 190); x.lineTo(540 + Math.cos(a) * 250, dy + Math.sin(a) * 250); x.stroke() }
      x.restore()
      // hills
      x.save(); x.globalAlpha = hk
      x.fillStyle = '#2a1850'; x.beginPath(); x.moveTo(0, 1250); x.quadraticCurveTo(270, 1010, 540, 1110); x.quadraticCurveTo(820, 1210, 1080, 1060); x.lineTo(1080, 1250); x.closePath(); x.fill()
      x.fillStyle = '#1b1236'; x.beginPath(); x.moveTo(0, 1250); x.quadraticCurveTo(380, 1110, 700, 1170); x.quadraticCurveTo(900, 1200, 1080, 1150); x.lineTo(1080, 1250); x.closePath(); x.fill()
      x.strokeStyle = rgba('#ffd08a', 0.9); x.lineWidth = 6; x.beginPath(); x.moveTo(0, 1250); x.quadraticCurveTo(270, 1010, 540, 1110); x.quadraticCurveTo(820, 1210, 1080, 1060); x.stroke()
      x.restore()
      chip(x, 'EAST · AC', 780, 760, { size: 28, k: pop01(t, T.rise[1] - 0.3, 0.3, 2.4) * clamp(o), fg: '#ffd08a', border: '#ffd08a' })
    }
  }
  function helloTag(t, nb) {
    if (t < T.tag || t > T.out[1]) return
    const fe = ease.inOutCubic(prog(t, ...T.tagFly))
    const k = pop01(t, T.tag, 0.35, 2.6) * popOut(t, T.out)
    const cx = lerp(540, nb.x + nb.s * 0.02, fe), cy = lerp(700, nb.y + nb.s * 0.18, fe), s = lerp(1, 0.32, fe) * k
    if (s <= 0.01) return
    const lib = signStar('libra')
    x.save(); x.translate(cx, cy); x.rotate(lerp(-0.06, 0.12, fe)); x.scale(s, s)
    panel(0, 0, 440, 240, '#e23d66', '#fff')
    x.fillStyle = '#e23d66'; x.fillRect(-220, -120, 440, 92)
    x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('HELLO', 0, -84)
    x.font = `700 24px ${MONO}`; x.fillText('my Rising is', 0, -42)
    x.font = `700 64px ${GF}`; x.fillStyle = lib.color; x.fillText(lib.glyph + '︎ LIBRA', 0, 48)
    x.restore()
  }

  // ── Q4: blamed + Mercury's retrograde loop
  const loopPt = u => { const s = lerp(-1.4, 7.7, u); return { x: 262 + 90 * s - 200 * Math.sin(s), y: 900 + 120 * Math.cos(s) } }
  function q4(t) {
    if (!segOn(t, 4)) return
    const o = popOut(t, [Q[4].b - 0.3, Q[4].b])
    ;['the wifi', 'your ex texting', 'the printer'].forEach((s, i) => {
      const k = pop01(t, T.blame[i], 0.3, 2.6) * o * (1 - prog(t, T.loop[0] + 1.8, T.loop[0] + 2.1))
      chip(x, 'BLAMED FOR: ' + s, 540 + [-90, 80, -40][i], 560 + i * 80, { size: 30, k, fg: '#ffd0d8', border: '#e23d66' })
    })
    const u = ease.inOutQuad(prog(t, ...T.loop))
    if (t < T.loop[0]) return
    // the trail
    x.save(); x.strokeStyle = rgba(MERC_COL, 0.55 * o); x.lineWidth = 8; x.setLineDash([14, 12]); x.lineCap = 'round'; x.beginPath()
    for (let i = 0; i <= 80; i++) { const v = u * i / 80, p = loopPt(v); i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y) }
    x.stroke(); x.restore()
    const p = loopPt(u), q = loopPt(Math.min(1, u + 0.01))
    const back = q.x < p.x - 0.1 && u > 0 && u < 1
    orbChar(x, p.x, p.y, 58, t, { color: MERC_COL, mood: t > 27.4 ? 'angry' : back ? 'wide' : 'neutral', look: [back ? -1 : 1, 0], seed: 7, pop: pop01(t, T.loop[0], 0.35, 2.2) * o })
    if (t > 27.4) steam(x, t, p.x, p.y - 60, { amount: clamp(o) })
    chip(x, '℞ RETROGRADE', p.x, p.y - 104, { size: 26, k: back ? 1 : 0, fg: PINK, border: PINK })
    chip(x, '℞ ~3× A YEAR · ~3 WEEKS', 540, 1180, { size: 30, k: pop01(t, T.rx + 0.8, 0.3, 2.6) * o, fg: MERC_COL, border: MERC_COL })
  }

  // ── Q5: the cusp tightrope
  function q5(t) {
    if (!segOn(t, 5)) return
    const k = segK(t, 5), o = popOut(t, [Q[5].b - 0.3, Q[5].b])
    const ar = signStar('aries'), ta = signStar('taurus')
    const y = 960, w = 420, h = 230
    if (k > 0.01) {
      x.save(); x.translate(540, y); x.scale(k, k)
      const lit = t > T.hop + 0.3
      panel(-w / 2 - 6, 0, w, h, ar.color, lit ? 'rgba(16,9,38,0.92)' : rgba(ar.color, 0.22))
      panel(w / 2 + 6, 0, w, h, ta.color, lit ? rgba(ta.color, 0.3) : rgba(ta.color, 0.22))
      x.restore()
      txt(ar.glyph + '︎ ARIES', 540 - (w / 2 + 6) * k, y + 30 * k, { size: 48 * k, font: GF, w: 700, col: ar.color, a: clamp(k) })
      txt(ta.glyph + '︎ TAURUS', 540 + (w / 2 + 6) * k, y + 30 * k, { size: 48 * k, font: GF, w: 700, col: ta.color, a: clamp(k) })
      txt('APR 19', 540 - (w / 2 + 6) * k, y + 84 * k, { size: 26 * k, font: MONO, w: 700, a: clamp(k) })
      txt('APR 20', 540 + (w / 2 + 6) * k, y + 84 * k, { size: 26 * k, font: MONO, w: 700, a: clamp(k) })
      // the line
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = BONE; x.fillRect(536, y - h / 2 - 60, 8, h + 60); x.restore()
    }
    // the Sun on the line
    const hopE = ease.outCubic(prog(t, T.hop, T.hop + 0.45))
    const wob = t < T.hop ? Math.sin((t - T.teeter[0]) * (6 + 6 * prog(t, ...T.teeter))) * 0.35 * prog(t, T.teeter[0], T.hop) : 0.25 * Math.sin((t - T.hop) * 14) * Math.exp(-(t - T.hop) * 5)
    const sx = lerp(540, 540 + w / 2 + 6, hopE), sy = y - h / 2 - 70 - Math.sin(Math.PI * hopE) * 140
    const sk = pop01(t, T.teeter[0] - 0.2, 0.35, 2.2) * o
    if (sk > 0.01) {
      x.save(); x.translate(sx, sy + 40); x.rotate(wob); x.translate(-sx, -(sy + 40))
      if (t < T.hop + 0.1) { x.fillStyle = INK; x.fillRect(sx - 190 * sk, sy + 34, 380 * sk, 10); x.fillStyle = '#b07a3a'; x.fillRect(sx - 186 * sk, sy + 36, 372 * sk, 6) }
      orbChar(x, sx, sy, 48, t, { color: '#f6c45a', mood: t < T.hop ? 'wide' : 'happy', seed: 3, pop: sk })
      x.restore()
      if (t < T.hop && t > T.teeter[0] + 0.5) sweat(x, t, sx + 46, sy - 50, 5)
      sparkBurst(x, t, sx, sy, T.hop + 0.45, { n: 12, R: 160, size: 24, seed: 9, cols: [ta.color, GOLD] })
    }
    // the clock that settles it
    const ck = pop01(t, T.clockQ5, 0.35, 2.4) * o
    if (ck > 0.01) {
      const cx = 540, cy = 1185, r = 54 * ck
      x.save(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4ecdc'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
      const steps = T.tick.filter(v => t > v).length, a = -Math.PI / 2 + steps * 0.9
      x.strokeStyle = '#e23d66'; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r * 0.75, cy + Math.sin(a) * r * 0.75); x.stroke(); x.restore()
      if (t > T.tick[2] + 0.2) chip(x, '✓ SETTLED', cx + 200, cy, { size: 30, k: pop01(t, T.tick[2] + 0.2, 0.3, 2.6) * o, fg: INK, bg: '#7dffb0', border: BONE })
    }
  }

  // ── Q6: elements that get along
  function flame(cx, cy, s, t, a = 1) {
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(s, s)
    const f = 1 + 0.08 * Math.sin(t * 13)
    x.fillStyle = '#f0603a'; x.beginPath(); x.moveTo(0, -120 * f); x.quadraticCurveTo(80, -30, 60, 30); x.quadraticCurveTo(40, 80, 0, 80); x.quadraticCurveTo(-40, 80, -60, 30); x.quadraticCurveTo(-80, -30, 0, -120 * f); x.fill()
    x.fillStyle = '#ffc04a'; x.beginPath(); x.moveTo(0, -50 * f); x.quadraticCurveTo(40, 10, 30, 40); x.quadraticCurveTo(15, 70, 0, 70); x.quadraticCurveTo(-15, 70, -30, 40); x.quadraticCurveTo(-40, 10, 0, -50 * f); x.fill()
    x.restore(); glow(x, cx, cy, 150 * s, '#f0603a', a)
  }
  function wind(cx, cy, s, t, a = 1) {
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(s, s); x.strokeStyle = '#7fd0f0'; x.lineWidth = 12; x.lineCap = 'round'
    for (let i = 0; i < 3; i++) { const o = Math.sin(t * 6 + i) * 10; x.beginPath(); x.moveTo(-90 + o, -40 + i * 40); x.lineTo(40 + o, -40 + i * 40); x.arc(40 + o, -60 + i * 40, 20, Math.PI / 2, -Math.PI, true); x.stroke() }
    x.restore()
  }
  function mountain(cx, cy, s, t, a = 1, sprout = 0) {
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(s, s)
    x.fillStyle = '#e9b24a'; x.beginPath(); x.moveTo(-110, 70); x.lineTo(-20, -80); x.lineTo(20, -20); x.lineTo(50, -60); x.lineTo(120, 70); x.closePath(); x.fill()
    x.fillStyle = '#fff1d6'; x.beginPath(); x.moveTo(-20, -80); x.lineTo(-40, -46); x.lineTo(0, -46); x.closePath(); x.fill()
    if (sprout > 0) {
      x.strokeStyle = '#4fd07a'; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, -20); x.lineTo(0, -20 - 90 * sprout); x.stroke()
      x.fillStyle = '#4fd07a'; const lk = clamp(sprout * 1.4 - 0.4)
      x.beginPath(); x.ellipse(-26 * lk, -20 - 80 * sprout, 26 * lk, 12 * lk, -0.5, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(26 * lk, -20 - 95 * sprout, 26 * lk, 12 * lk, 0.5, 0, Math.PI * 2); x.fill()
      if (sprout >= 1) { x.fillStyle = '#ff8fb1'; x.fillRect(-12, -134, 24, 24); x.fillStyle = '#fff4b0'; x.fillRect(-5, -127, 10, 10) }
    }
    x.restore()
  }
  function drop(cx, cy, s, a = 1) {
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(s, s); x.fillStyle = '#3f7cf0'
    x.beginPath(); x.moveTo(0, -70); x.quadraticCurveTo(60, 10, 40, 40); x.quadraticCurveTo(0, 80, -40, 40); x.quadraticCurveTo(-60, 10, 0, -70); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-20, -6, 12, 26); x.restore()
  }
  function q6(t) {
    if (!segOn(t, 6)) return
    const o = popOut(t, [Q[6].b - 0.3, Q[6].b])
    const k = i => pop01(t, T.icons + i * 0.12, 0.35, 2.4) * o
    // fire + air (top row), earth + water (bottom row)
    const fa = ease.inOutCubic(prog(t, T.fireAir, T.fireAir + 0.6)), roar = 1 + 0.45 * ease.outCubic(prog(t, T.fireAir + 0.5, T.fireAir + 1.1))
    flame(lerp(330, 470, fa), 690, 0.9 * k(0) * roar, t, clamp(k(0)))
    wind(lerp(750, 690, fa), 690, 0.9 * k(1), t, clamp(k(1)))
    const ew = prog(t, T.earthWater, T.earthWater + 0.7), grow = ease.outCubic(prog(t, T.earthWater + 0.7, T.earthWater + 1.6))
    mountain(450, 1060, 1.0 * k(2), t, clamp(k(2)), grow)
    if (ew < 1) drop(lerp(750, 450, ease.inOutCubic(ew)), lerp(1040, 960, ew) - Math.sin(Math.PI * ew) * 180, 0.9 * k(3), clamp(k(3)))
    else sparkBurst(x, t, 450, 1000, T.earthWater + 0.7, { n: 10, R: 120, size: 22, seed: 4, cols: ['#3f7cf0', '#9fe0ff'] })
    chip(x, 'FIRE + AIR', 540, 860, { size: 28, k: pop01(t, T.fireAir + 0.6, 0.3, 2.6) * o, fg: '#ffc04a', border: '#f0603a' })
    chip(x, 'EARTH + WATER', 540, 1200, { size: 28, k: pop01(t, T.earthWater + 1.0, 0.3, 2.6) * o, fg: '#9fe0ff', border: '#3f7cf0' })
    chip(x, 'SAME ELEMENT: EASY', 540, 545, { size: 28, k: pop01(t, T.icons + 0.6, 0.3, 2.6) * o, fg: GOLD, border: GOLD })
  }

  // ── Q7: thousands of years of sky-watching
  function q7(t) {
    if (!segOn(t, 7)) return
    const o = popOut(t, [Q[7].b - 0.3, Q[7].b])
    const items = ['CLAY TABLETS', 'STONE CIRCLES', 'ASTROLABES']
    items.forEach((s, i) => {
      const k = pop01(t, T.hist[i], 0.4, 2.4) * o
      if (k <= 0.01) return
      const cx = 220 + i * 320, cy = 860
      x.save(); x.translate(cx, cy); x.scale(k, k)
      x.strokeStyle = BONE; x.lineWidth = 7; x.fillStyle = 'rgba(239,230,214,0.18)'
      if (i === 0) { x.fillStyle = '#c9925a'; x.fillRect(-80, -100, 160, 200); x.fillStyle = '#8a5a2e'; for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) if ((r * 5 + c) % 3) x.fillRect(-60 + c * 26, -80 + r * 30, 12, 8) }
      if (i === 1) { x.fillStyle = '#8f8aa8'; for (let j = 0; j < 5; j++) { const a = Math.PI + j * Math.PI / 4; x.fillRect(Math.cos(a) * 100 - 16, Math.sin(a) * 30 - 20 - 50, 32, 110) } x.fillRect(-110, -90, 220, 24) }
      if (i === 2) { x.fillStyle = '#e9b24a'; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill(); x.fillStyle = '#1b1236'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#e9b24a'; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 10, 70, 46, 0, 0, Math.PI * 2); x.stroke(); x.save(); x.rotate(t * 0.8); x.fillStyle = '#ffd08a'; x.fillRect(-90, -4, 180, 8); x.restore(); x.fillStyle = '#e9b24a'; x.fillRect(-14, -128, 28, 30) }
      x.restore()
      chip(x, s, cx, cy + 160, { size: 24, k, fg: BONE, border: GOLD })
    })
  }

  // ── tie-in: the Fool talk card
  function drawCard(t) {
    if (t < T.deal[0] || !CARD) return
    const e = ease.outCubic(prog(t, ...T.deal)), o = popOut(t, T.out)
    const h = 640 * o, w = h * CARD.width / CARD.height
    if (h <= 1) return
    const cx = 560, cy = lerp(1600, 880, e)
    const shrink = ease.inOutCubic(prog(t, T.h8 - 0.1, T.h8 + 0.5))
    const s = lerp(1, 0.72, shrink), yy = lerp(cy, 970, shrink)
    glow(x, cx, yy, h * 0.8 * s, GOLD, 0.7 * clamp(e))
    x.save(); x.translate(cx, yy); x.rotate(lerp(0.5, -0.05, e) + Math.sin(t * 1.4) * 0.015); x.scale(s, s)
    x.globalAlpha = clamp(e * 2); x.drawImage(CARD, -w / 2, -h / 2, w, h); x.restore()
    sparkBurst(x, t, cx, 880, T.deal[1], { n: 12, R: 420, size: 26, seed: 21 })
  }

  // ── the cast
  function newbPos(t) {
    if (t < T.toCorner[0]) return NEWB0
    const e = ease.inOutCubic(prog(t, ...T.toCorner))
    const p = lerpP(NEWB0, NEWB, e); p.y -= Math.sin(Math.PI * e) * 120
    return p
  }
  function newbMood(t) {
    if (t < 1.4) return { mood: 'wide', look: [0, -1] }
    if (t < Q[1].a) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.done) return { mood: t > T.slide[1] ? 'sparkle' : 'neutral', look: [1, -1] }
    if (t < Q[2].a) return { mood: 'happy', look: [0, 0] }
    if (t < Q[3].a) return { mood: t > T.rising + 0.9 ? 'eyeroll' : 'wide', look: [1, -1], blink: false }
    if (t < Q[4].a) return { mood: t > T.tagFly[1] ? 'happy' : 'sparkle', look: [1, -1] }
    if (t < Q[5].a) return { mood: t > 27.4 ? 'squint' : 'neutral', look: [1, -1] }
    if (t < Q[6].a) return { mood: t > T.hop ? 'happy' : 'wide', look: [1, -1] }
    if (t < Q[7].a) return { mood: 'sparkle', look: [1, -1] }
    if (t < T.lesson) return { mood: t > T.hist[2] + 0.4 ? 'happy' : 'squint', look: [1, -1] }
    if (t < T.toss) return { mood: 'sparkle', look: [1, -1] }
    return { mood: t > T.land ? 'happy' : 'wide', look: [0, -1] }
  }
  // the "?" that floats over the new star while there's a question on screen
  function qmark(t, r, k) {
    if (k <= 0.01) return
    const Qm = ['.XXX.', 'X...X', '...X.', '..X..', '.....', '..X..']
    const c = 9, bx = r.x - 2.5 * c, by = r.top - 90 - Math.abs(Math.sin(t * 5)) * 16
    x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK
    Qm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') x.fillRect(bx + i * c - 3, by + j * c - 3, c + 6, c + 6) }))
    x.fillStyle = GOLD; Qm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') x.fillRect(bx + i * c, by + j * c, c, c) }))
    x.restore()
  }
  function drawNewb(t) {
    const p = newbPos(t), st = newbMood(t), o = popOut(t, T.out)
    const pk = pop01(t, T.pop, 0.45, 2.4) * o
    if (pk <= 0.01) return null
    const dizzy = inR(t, [T.rising + 0.9, Q[3].a - 0.2])
    const r = drawStarChar(x, p.x + (dizzy ? Math.sin(t * 9) * 6 : 0), p.y, p.s, t, { color: NEW_COL, mood: st.mood, look: st.look, blink: st.blink, hops: HOPS.newb, seed: 21, pop: pk })
    if (dizzy) for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.094; pstar(x, r.x + Math.cos(a) * 70, r.top - 20 + Math.sin(a) * 16, 22, 1, [GOLD, BONE, PINK][i]) }
    const asking = Q.some((q, i) => i > 0 && inR(t, [q.a + 0.1, q.a + 2.6])) || inR(t, [0.6, 4.3])
    qmark(t, r, asking ? pop01(t, Math.max(0.6, ...Q.filter(q => q.a + 0.1 <= t).map(q => q.a + 0.1)), 0.3, 2.6) : 0)
    // the grad cap: tossed at T.toss, lands on the head
    if (t > T.toss - 0.4) {
      const cell = Math.max(2, Math.round(r.size / 36))
      const fl = prog(t, T.toss, T.land), up = Math.sin(Math.PI * fl) * 520
      const ck = pop01(t, T.toss - 0.4, 0.3, 2.4) * o
      x.save(); x.translate(r.x, r.top + cell * 2 - up); x.rotate(fl < 1 ? fl * Math.PI * 4 : 0); x.translate(-r.x, -(r.top + cell * 2 - up))
      gradCap(x, r.x - cell, r.top + cell * 2 - up, cell * (fl < 1 ? 1.3 : 1), t, { alpha: clamp(ck) })
      x.restore()
      sparkBurst(x, t, r.x, r.top, T.land, { n: 14, R: 200, size: 24, seed: 33 })
    }
    return r
  }
  function drawStars(t, nb) {
    const o = popOut(t, T.out), pk = pop01(t, 1.0, 0.45, 2.4) * o
    if (pk <= 0.01) return
    let mood = 'happy', look = [-1, -1]
    if (inR(t, [T.done, Q[2].a])) mood = 'wink'
    if (inR(t, [27.4, Q[5].a])) mood = 'eyeroll'
    if (t > T.toss) mood = 'heart'
    const r = drawStarChar(x, STARS.x, STARS.y, STARS.s, t, { color: STAR.sky, mood, look, hops: HOPS.stars, seed: 2, pop: pk })
    // the pointer, aimed at the illustration of the moment
    const aimAt = [[Q[1].a + 0.5, 540, 980], [Q[2].a + 0.5, 540, 1010], [Q[3].a + 0.5, 540, 900], [Q[4].a + 0.8, 540, 930], [Q[5].a + 0.5, 540, 900], [Q[6].a + 0.5, 540, 860], [Q[7].a + 0.6, 540, 900], [T.deal[1], 600, 1000]]
    const cur = aimAt.filter(a => t >= a[0]).pop()
    if (cur && t > 5 && !inR(t, [T.lesson - 0.2, T.lessonOut[1]]) && t < T.h8) {
      const seg = Q.findIndex(q => t >= q.a && t < q.b)
      const segEnd = seg >= 0 ? Q[seg].b : T.h8
      const ak = pop01(t, cur[0], 0.3, 2.2) * popOut(t, [segEnd - 0.3, segEnd]) * o
      const bx = r.x - r.size * 0.3, by = r.y - r.size * 0.05
      pointer(x, bx, by, lerp(bx, lerp(bx, cur[1], 0.6), ak), lerp(by, lerp(by, cur[2], 0.6), ak), { alpha: clamp(ak) })
    }
  }
  function drawPisces(t) {
    const o = popOut(t, T.out), k = pop01(t, 2.2, 0.4, 2.4) * o
    if (k <= 0.01) return
    let mood = 'neutral', cry = 0
    if (inR(t, [T.done, Q[2].a])) { mood = 'squint'; cry = 1 }           // "done!" (it's never done)
    if (inR(t, [T.tag + 0.3, Q[4].a])) mood = 'heart'
    if (inR(t, [T.earthWater + 1.6, Q[7].a])) { mood = 'squint'; cry = 1 } // the little flower
    if (t > T.land) { mood = 'squint'; cry = 1 }                          // graduation
    const r = drawStarChar(x, PISP.x, PISP.y, PISP.s, t, { color: signStar('pisces').color, mood, look: [-1, 1], seed: 17, pop: k, glow: 0.8, hops: [2.6, T.land + 0.1] })
    if (cry) tears(x, t, r.x, r.y - 4, 14, { amount: cry * clamp(k), cell: 7, seed: 3, color: '#a8e6ff' })
  }
  function drawEyebrows(t) {
    Q.forEach(q => {
      if (t < q.a - 0.05 || t > q.b) return
      const k = pop01(t, q.a, 0.3, 2.6) * outK(t, [q.b - 0.15, q.b])
      chip(x, q.n === 'NO JUDGEMENT' ? q.n : `${q.n} · FROM ☆ YOU`, 540, 160, { size: 30, k, fg: INK, bg: GOLD, border: BONE })
    })
  }
  function confetti(t) {
    const p = prog(t, T.land - 0.2, T.land + 1.2)
    if (p <= 0 || p >= 1) return
    for (let i = 0; i < 28; i++) {
      const a = -Math.PI / 2 + (i / 28 - 0.5) * 2.8, v = 700 + (i * 97 % 300)
      const px = 540 + Math.cos(a) * v * p, py = 1000 + Math.sin(a) * v * p + 900 * p * p
      if (i % 3 === 0) { x.save(); x.globalAlpha = 1 - p; x.font = `700 44px ${SERIF}`; x.fillStyle = SIGNS[i % 12].color; x.textAlign = 'center'; x.fillText(SIGNS[i % 12].glyph + '︎', px, py); x.restore() }
      else pstar(x, px, py, 24, 1 - p, [GOLD, PINK, BONE, LAV][i % 4])
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        q1(t); q2(t); q3(t); q4(t); q5(t); q6(t); q7(t)
        drawCard(t)
        drawPisces(t)
        drawStars(t)
        const nb = drawNewb(t)
        if (nb) helloTag(t, newbPos(t))
        drawEyebrows(t)
        confetti(t)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (each question change); the default selection keeps 17.2 (→ Q3), 30.1 (→ Q5) and 42.6 (→ Q7),
// one per 12–13 s. The others play as plain beat changes.
const CUTS = [10.55, { t: CUT1, kind: 'deal' }, 23.7, { t: CUT2, kind: 'shuffle' }, 36.45, { t: CUT3, kind: 'flip' }, 46.6]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (B♭ major; pop / pluck / bell are moved into the film's key by the engine)
const NOTE = [466.16, 523.25, 587.33, 698.46, 783.99, 932.33, 1046.5]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const chipS = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
const ticks = (a, b, gap, gain = 0.02) => { const o = []; for (let t = a; t < b; t += gap) o.push(['tick', r3(t), gain]); return o }
const buzzer = t => [chipS(t, 880, 0.12, { duty: 0.5, gain: 0.04 }), chipS(t + 0.13, 1174.66, 0.18, { duty: 0.5, gain: 0.04 })]   // the quiz-show "Q" ding
const sob = (t0, n) => Array.from({ length: n }, (_, i) => chipS(t0 + i * 0.28, [659.25, 622.25, 587.33][i % 3], 0.18, { duty: 0.5, gain: 0.026, slide: -0.4, vib: 0.05 }))
const nWords = s => s.split(' ').filter(w => w !== '|').length

export const CUES = [
  ...Q.flatMap((q, i) => [...(i ? buzzer(q.a) : []), ...wordPops(q.a + 0.1, nWords(q.text) - 1, 0.08, i), ['pop', r3(q.a + 0.55), 1174.66, 0.05, 0], ['pluck', r3(q.a + 0.55), 1174.66, 0.04, 0.6, 0]]),
  ['pop', T.pop + 0.1, 880, 0.04, 0], ['pop', 0.7, 1318.51, 0.03, 0], ['whoosh', T.toCorner[0], 0.5, 0.04],
  // Q1
  ['pop', T.cal, 783.99, 0.045, 0], ['whoosh', T.slide[0], 1.0, 0.035], ['pluck', T.slide[1], 1046.5, 0.05, 0.7, 0], ['bell', T.slide[1] + 0.05, 1567.98, 0.03, 1.2, 0], ['glitter', T.slide[1], T.slide[1] + 0.5],
  ...sob(T.done + 0.5, 4),
  // Q2
  ...ticks(T.clock, T.rising, 0.28, 0.025), ...ticks(T.rising, Q[2].b - 0.4, 0.07, 0.022),
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.moonHop + 0.54 + i * 0.9), 1318.51, 0.03, 0.3]),
  ['whoosh', T.rising + 0.9, 0.8, 0.04],
  // Q3
  ['riser', T.rise[0], T.rise[1], 0.04], ['bell', T.rise[1], 1760, 0.04, 1.6, 0], ['glitter', T.rise[1], T.rise[1] + 0.6],
  ['pop', T.tag, 659.25, 0.06, 0], ['tom', T.tag + 0.02, 120, { gain: 0.2, decay: 0.2, rev: 0.1 }], ['whoosh', T.tagFly[0], 0.4, 0.03], ['pop', T.tagFly[1], 1046.5, 0.04, -0.4],
  // Q4
  ...T.blame.map((t, i) => ['pop', r3(t), [587.33, 698.46, 783.99][i], 0.045, (i - 1) * 0.3]),
  ['whoosh', T.loop[0] + 0.6, 1.4, 0.035], ['whoosh', T.rx - 0.4, 0.8, 0.04], ['pop', T.rx + 0.8, 1046.5, 0.04, 0],
  ['boom', 27.45, 0.1], ...ticks(27.6, 28.6, 0.12, 0.02),
  // Q5
  ...ticks(T.teeter[0], T.hop, 0.18, 0.022), ['whoosh', T.hop, 0.4, 0.04], ['pluck', T.hop + 0.45, 1174.66, 0.05, 0.6, 0.3], ['glitter', T.hop + 0.45, T.hop + 0.9],
  ['pop', T.clockQ5, 880, 0.04, 0], ...T.tick.map(t => ['tick', r3(t), 0.05]), ['bell', T.tick[2] + 0.2, 1567.98, 0.035, 1.2, 0.3],
  // Q6
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.icons + i * 0.12), NOTE[i + 2], 0.035, (i % 2 ? 0.3 : -0.3)]),
  ['whoosh', T.fireAir + 0.2, 0.8, 0.05], ['boom', T.fireAir + 0.6, 0.12],
  ['pop', T.earthWater + 0.7, 1567.98, 0.04, -0.2], ['pluck', T.earthWater + 1.0, 1174.66, 0.04, 0.6, 0], ['bell', T.earthWater + 1.6, 2093, 0.03, 1.2, 0], ...sob(T.earthWater + 1.7, 3),
  // Q7
  ...T.hist.map((t, i) => ['pop', r3(t), [523.25, 659.25, 783.99][i], 0.045, (i - 1) * 0.4]),
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // tie-in + last line
  ['whoosh', T.deal[0], 0.6, 0.045], ['pop', T.deal[1], 1174.66, 0.045, 0], ['glitter', T.deal[1], T.deal[1] + 0.6],
  ...wordPops(T.h8, 7, 0.08, 2), ['pop', r3(T.h8 + 0.4), 1318.51, 0.05, 0],
  ['whoosh', T.toss, 0.6, 0.05], ['pop', T.land, 1567.98, 0.06, 0], ['crash', T.land, { gain: 0.06, len: 1.4 }], ['bell', T.land + 0.02, 2349.32, 0.045, 1.6, 0], ['glitter', T.land, T.land + 1.0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...BOXES.flatMap(([lines]) => talkCues(lines, { cps: CPS, pitch: { [NARR]: 784, [NEWN]: 1174.66, [MERN]: 987.77 } })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const __CHECK = { boxes: BOXES, lesson: LESSON }
