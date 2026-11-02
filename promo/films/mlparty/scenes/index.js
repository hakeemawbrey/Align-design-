// mlparty: MOONLIGHT LANE · Ep 10 "The Block Party" (the finale; 120 s vertical, STARTALK-EPISODES.md, music: pop · A)
// Story 0–115.6, then the shared end card. The show look is ./mlkit.js, copied unchanged from mlpilot.
//    0.0–2.0    PREVIOUSLY ON…  "I love… yogurt." · the bench, said plainly · "tomorrow, I ask." (both of them)
//    2.0–7.0    cold open: garlands and lamps flicker on down the whole lane. LIBRA: "tonight I ask Scorpio out."
//    7.0–10.0   title card
//   10.0–40.0   Act 1 · one long pan down the lane, a callback per couple:
//               ♑ Capricorn snoozes the HARD STOP alarm and stays with ♌ Leo (Ep 1) · ♈ Aries brings ONE balloon, ♍ Virgo brings yogurt (Eps 2, 9)
//               · ♓ Pisces (window) and ♒ Aquarius (street) trade pixel moons (Ep 8) · ♉ Taurus & ♊ Gemini's napkin plan
//               "PARTY 1 HR → SOUP" (Ep 4) · ♋ Cancer on a video call with ♐ Sagittarius (Ep 7) · ♌ Leo & ♑ Capricorn on
//               the rooftop (Ep 6) · ♎ Libra at the stall, with a plan.
//   40.0        card cut (the middle candidate)
//   40.0–61.0   Act 2 · three near misses: they swap places through the crowd · a conga line sweeps Libra away mid
//               "would y—" · Pisces lands between them, sobbing "I LOVE PARTIES!!"
//   61.0–70.0   the low point: "maybe the universe says no." Gemini: "play it cool." THE STARS: no games.
//   70.0–90.0   THE STARS ADVISE (softer bed): love is small things, daily · be brave once · show up as you
//   90.0–104    Act 3 (the lift): under the middle lamp both say "would you—" at once, laugh; Libra asks, Scorpio says
//               yes. Scorpio's pastry box holds the founding card (just the card). The lane cheers, Pisces sobs.
//  104–108      LESSON UNLOCKED "Be brave | once." chip "+1 YES"
//  108–111.6    lane tag: the bench, one croissant, both push it over… they split it.
//  111.6–115.6  "THE END… for now" · last line "Would you? Yes."
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, CYAN, MINT, MONO, r3, loadFonts, pop01, outK, bump,
  drawSign, drawPisces, standY, drawLane, LANE,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, drawBubble, drawIcon, drawPastry, drawMysteryCard, sparkles, rgba,
} from './mlkit.js'

export const DURATION = 120
const MOON = { x: 860, y: 610, r: 100 }   // (as mlpilot: clear of the headlines)
const END = DURATION - ENDCARD_LEN            // 115.6
const sp = (s, name) => `${signStar(s).glyph}︎ ${name}`
const SPK = { LI: sp('libra', 'LIBRA'), SC: sp('scorpio', 'SCORPIO'), CP: sp('capricorn', 'CAPRICORN'), AR: sp('aries', 'ARIES'), PI: sp('pisces', 'PISCES'), GE: sp('gemini', 'GEMINI'), CA: sp('cancer', 'CANCER'), LE: sp('leo', 'LEO'), S: 'THE STARS' }
const COL = { LI: '#ffb3d9', SC: '#c9a6ff', CP: '#c8d0e0', AR: '#ff9a8a', PI: '#9fd8ff', GE: '#ffe27a', CA: '#bfe0ff', LE: '#ffd27a', S: ML_GOLD }
const line = (k, t, text) => ({ t, speaker: SPK[k], color: COL[k], text })

const T = {
  prev: 0, cold: 2, title: 7, tour: 10, miss1: 40, miss2: 47, miss3: 54, low: 61,
  adv: 70, advOut: [89.4, 89.9], act3: 90, lesson: 104, tag: 108, next: 111.6,
  snooze: 12.2, pisMoon: 20.4, pisSend: 21.6,
  conga: [49.9, 53.2], pisDrop: [55.9, 56.35],
  meet: 92.0, both: 92.6, laugh: 93.6, open: 100.6, card: [100.8, 101.6], cheer: 101.2,
  split: 110.1,
}
const BOXES = [
  { open: 3.2, close: 6.7, lines: [line('LI', 3.4, 'tonight I ask Scorpio out. *tonight.*')] },
  { open: 10.8, close: 39.8, lines: [
    line('CP', 11.0, 'hard stop? *what* hard stop?'), line('AR', 15.3, 'I brought *one* balloon. growth!'),
    line('PI', 19.9, "a pixel moon! I'm *fine.* (I'm not.)"), line('GE', 24.3, 'one hour of party. then *soup.*'),
    line('CA', 28.9, 'everyone, say hi to *Sagittarius!*'), line('LE', 33.3, 'just us up here. *chosen.*'),
    line('S', 37.6, 'and Libra has a *plan.*')] },
  { open: 61.1, close: 69.7, lines: [line('LI', 61.3, 'maybe the universe says *no.*'), line('GE', 64.3, 'play it cool. make them come to *you.*'), line('S', 67.3, "(that's a game. we don't do *games.*)")] },
  { open: 94.1, close: 103.6, lines: [line('SC', 94.3, 'you first. *please.*'), line('LI', 96.8, 'would you go out with *me?*'), line('SC', 99.4, 'yes. also, I made you *this.*')] },
]
const LINES = BOXES.flatMap(b => b.lines)
const H = Object.fromEntries(Object.keys(SPK).map(k => [k, talkHops(LINES, SPK[k])]))

const CAPS = [
  { text: 'The whole lane. | *One* party.', kicker: 'SATURDAY · 9:00 PM', at: 2.15, out: [6.6, 6.9] },
  { text: 'Capricorn & Leo: | *past* the hard stop.', at: 10.3, out: [14.0, 14.3] },
  { text: 'Aries: | *one* balloon.', at: 14.8, out: [18.6, 18.9] },
  { text: 'Pisces & Aquarius: | *still here.*', at: 19.3, out: [22.9, 23.2] },
  { text: 'Taurus & Gemini: | *then* soup.', at: 23.8, out: [27.6, 27.9] },
  { text: 'Cancer: | *far,* not apart.', at: 28.3, out: [32.0, 32.3] },
  { text: 'Leo & Capricorn: | the *rooftop.*', at: 32.8, out: [36.6, 36.9] },
  { text: 'And Libra… | has a *plan.*', at: 37.3, out: [39.6, 39.9] },
  { text: 'Near miss *one.*', at: 40.35, out: [46.7, 47.0] },
  { text: 'Near miss *two.*', at: 47.3, out: [53.6, 53.9] },
  { text: 'Near miss *three.*', at: 54.2, out: [60.6, 60.9] },
  { text: 'Maybe it’s | a *sign?*', at: 61.2, out: [69.4, 69.8] },
  { text: 'Under the | *middle* lamp.', at: 90.2, out: [92.3, 92.6] },
  { text: '*Same* time.', at: 92.8, out: [96.5, 96.8], size: 110 },
  { text: 'The *founding* card.', at: 101.0, out: [103.6, 103.9] },
  { text: '*Half* each.', at: 108.2, out: [111.2, 111.5], size: 110 },
  { text: '*Would you?* Yes.', at: 112.4, out: [115.05, 115.4], size: 110, top: 300 },   // the last line
]
const ADVISE = {
  at: T.adv, out: T.advOut,
  cards: [
    { at: 71.0, icon: 'heart', head: 'Love is *small things,* daily.', body: 'A saved pastry. A note. Showing up on a Tuesday. It all adds up.' },
    { at: 77.0, icon: 'chat', head: 'Be brave *once.*', body: 'One clear sentence beats a hundred hints: “Would you go out with me?”' },
    { at: 83.0, icon: 'star', head: 'Show up *as you.*', body: 'Not cool, not perfect. Just you, asking kindly, ready for any answer.' },
  ],
  lines: [
    { t: 71.6, text: 'Libra, Scorpio: this one’s *yours.*' },
    { t: 77.6, text: 'a hundred hints. or *one* sentence.' },
    { t: 83.6, text: 'and the whole lane? *show up.*' },
  ],
}
const LESSON = { at: T.lesson, out: [107.6, 107.95], text: 'Be brave | *once.*', chip: '+1 YES' }

// ── helpers
const path = (t, keys) => {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) return lerp(keys[i - 1][1], keys[i][1], ease.inOutCubic(prog(t, keys[i - 1][0], keys[i][0])))
  return keys[keys.length - 1][1]
}
const steps = (a, b, d = 0.34) => Array.from({ length: Math.max(0, Math.floor((b - a) / d)) }, (_, i) => r3(a + i * d))
const R = (g, x, y, w, h, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
const BULB = [ML_GOLD, PINK, CYAN, MINT, '#fff1c8']
function garlands(g, t, on = 1, onAt = null) {     // block-party string lights strung down the whole lane (world coords)
  const pts = [0, 300, 600, 900, 1200, 1500, 1800, 2160]
  for (let s = 0; s < pts.length - 1; s++) {
    const x0 = pts[s], x1 = pts[s + 1], y0 = 1000 + (s % 2) * 30
    g.strokeStyle = '#1b1530'; g.lineWidth = 3; g.beginPath()
    for (let i = 0; i <= 24; i++) { const u = i / 24; g.lineTo(lerp(x0, x1, u), y0 + Math.sin(Math.PI * u) * 60) }
    g.stroke()
    for (let i = 1; i < 10; i++) {
      const u = i / 10, bx = lerp(x0, x1, u), by = y0 + Math.sin(Math.PI * u) * 60 + 8
      const k = onAt == null ? on : clamp(prog(t, onAt + bx / 2160 * 1.6, onAt + bx / 2160 * 1.6 + 0.12))
      const c = BULB[(i + s) % 5]
      R(g, bx - 6, by - 5, 12, 14, k > 0.5 ? c : '#3a3550')
      if (k > 0.01) { g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(bx, by, 0, bx, by, 36); gr.addColorStop(0, rgba(c, 0.4 * k * (0.8 + 0.2 * Math.sin(t * 3 + i)))); gr.addColorStop(1, rgba(c, 0)); g.fillStyle = gr; g.fillRect(bx - 36, by - 36, 72, 72); g.restore() }
    }
  }
}
function balloon(g, hx, hy, t) {
  const bx = hx + 30 + 8 * Math.sin(t * 1.7), by = hy - 230 + 6 * Math.sin(t * 2.3)
  g.strokeStyle = BONE; g.lineWidth = 3; g.beginPath(); g.moveTo(hx, hy); g.quadraticCurveTo(hx + 30, hy - 110, bx, by + 40); g.stroke()
  drawIcon(g, 'balloon', bx - 32, by - 50, 8)
}
function yogurtCup(g, cx, cy, s) {
  R(g, cx - 13 * s, cy - 14 * s, 26 * s, 4 * s, INK); R(g, cx - 12 * s, cy - 13 * s, 24 * s, 3 * s, PINK)
  R(g, cx - 11 * s, cy - 10 * s, 22 * s, 20 * s, INK); R(g, cx - 10 * s, cy - 10 * s, 20 * s, 19 * s, '#fffaf0'); R(g, cx - 6 * s, cy - 4 * s, 12 * s, 6 * s, PINK)
}
function phone(g, cx, cy, w, h, fn) {
  R(g, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12, INK); R(g, cx - w / 2, cy - h / 2, w, h, '#2a2050')
  R(g, cx - w / 2 + 8, cy - h / 2 + 22, w - 16, h - 40, '#120c2a')
  g.save(); g.beginPath(); g.rect(cx - w / 2 + 8, cy - h / 2 + 22, w - 16, h - 40); g.clip(); fn(); g.restore()
}
function napkin(g, cx, cy) {
  R(g, cx - 104, cy - 54, 208, 108, INK); R(g, cx - 100, cy - 50, 200, 100, '#fffaf0')
  g.fillStyle = INK; g.font = `700 22px ${MONO}`; g.textAlign = 'center'; g.textBaseline = 'middle'
  g.fillText('PARTY 1 HR', cx, cy - 20); g.fillText('→ SOUP', cx, cy + 16)
}
function pastryBox(g, cx, cy, s, open = 0) {
  R(g, cx - 34 * s, cy - 20 * s, 68 * s, 44 * s, INK); R(g, cx - 31 * s, cy - 17 * s, 62 * s, 38 * s, '#fffaf0')
  R(g, cx - 3 * s, cy - 17 * s, 6 * s, 38 * s, ML_GOLD)
  g.save(); g.translate(cx - 34 * s, cy - 20 * s); g.rotate(-open * 1.9)
  R(g, 0, -8 * s, 68 * s, 10 * s, INK); R(g, 2 * s, -6 * s, 64 * s, 6 * s, '#f6e8c8'); R(g, 31 * s, -8 * s, 6 * s, 10 * s, ML_GOLD)
  g.restore()
}
function congaStar(g, t, i, x, feet) {
  const signs = ['aries', 'gemini', 'capricorn', 'virgo', 'taurus']
  drawSign(g, signs[i], x, standY(150, feet), 150, t, { mood: 'happy', look: [1, 0], hops: steps(T.conga[0] + i * 0.08, T.conga[1], 0.28), seed: 20 + i })
}
const CROWD = [['aries', 620], ['virgo', 740], ['taurus', 860], ['gemini', 1300], ['capricorn', 1420], ['leo', 1540], ['aquarius', 1650], ['cancer', 520]]
function crowd(g, t, t0, feet = 1480) {
  CROWD.forEach(([s, x], i) => drawSign(g, s, x, standY(140, feet), 140, t, { mood: t > T.cheer ? 'happy' : 'sparkle', look: [x < 1000 ? 1 : -1, -0.5], pop: pop01(t, t0 + i * 0.06, 0.3, 2), hops: t > T.cheer ? steps(T.cheer + i * 0.05, T.cheer + 2.6, 0.42) : null, seed: 30 + i }))
}

const PREV = [
  { caption: 'I love… yogurt.', crop: [460, 820, 620, 732], scene: g => drawLane(g, 1, { moon: MOON, pan: 360 }, c => { drawSign(c, 'virgo', 700, standY(220), 220, 1, { mood: 'wide' }); drawSign(c, 'aries', 1000, standY(220), 220, 1, { mood: 'wide', look: [-1, 0] }); yogurtCup(c, 770, 1020, 5) }) },
  { caption: 'Said it plainly.', crop: [300, 840, 620, 732], scene: g => drawLane(g, 1, { moon: MOON, time: 'late', pan: 650 }, c => { drawSign(c, 'virgo', 1080, standY(200, LANE.bench.seatY), 200, 1, { mood: 'heart' }); drawSign(c, 'aries', 1300, standY(200, LANE.bench.seatY), 200, 1, { mood: 'heart' }) }) },
  { caption: 'Tomorrow, I ask.', crop: [580, 860, 600, 708], scene: g => drawLane(g, 1, { moon: MOON, pan: 1080 }, c => { drawSign(c, 'libra', 1890, standY(220), 220, 1, { mood: 'sparkle', look: [0, 1] }); drawBubble(c, 1890, 1080, 'tomorrow, I ask.', { size: 34 }) }) },
]

async function build(stage) {
  const cardImg = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + 'card-founding.png' })
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const prev = buildPreviously(root, { at: T.prev, len: 2, stills: PREV })
  const title = buildTitle(root, { ep: 10, title: 'The Block Party', at: T.title, len: 3 })
  const caps = CAPS.map(c => buildCaption(root, c))
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1530, height: 250, size: 46, open: b.open, close: b.close, cps: 28 }))
  const adv = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, LESSON)
  const fin = buildNextTime(root, { at: T.next, out: [115.15, 115.55], teaser: '*for now*', finale: true })
  const bug = showBug(root, 10, { at: 2.05 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function coldOpen(t) {
    drawLane(x, t, { moon: MOON, pan: 600, lampsAt: 2.3, time: 'night' }, c => {
      garlands(c, t, 0, 3.0)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 2, mood: 'sparkle', box: false })
      drawSign(c, 'libra', 1180, standY(230), 230, t, { mood: t > 4.8 ? 'sparkle' : 'neutral', look: [-1, -0.5], hops: H.LI, seed: 6 })
    })
  }

  function tour(t) {
    const pan = path(t, [[10, 0], [14.0, 0], [14.8, 140], [18.5, 140], [19.3, 330], [23.0, 330], [23.8, 680], [27.5, 680], [28.3, 880], [32.0, 880], [32.8, 900], [36.5, 900], [37.3, 1080]])
    const pz = 1 + 0.12 * clamp(prog(t, 19.3, 19.9)) * (1 - prog(t, 22.6, 23.2))
    drawLane(x, t, { moon: MOON, pan, zoom: pz, focus: [505, 1000] }, c => {
      garlands(c, t)
      const S = 200
      // Pisces (window) and Aquarius (on the street below) trade pixel moons, in person
      const aqX = 950, aqY = standY(190)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: t > T.pisMoon ? 3 : 2, mood: t > T.pisMoon ? 'happy' : 'sparkle', box: false, look: [1, 1], hops: [T.pisMoon + 0.4, T.pisSend] })
      drawSign(c, 'aquarius', aqX, aqY, 190, t, { mood: t > T.pisSend + 0.5 ? 'heart' : 'happy', look: [-0.6, -1], hops: [T.pisMoon - 0.1, T.pisSend + 0.5], seed: 15 })
      // pixel moon, 1.8x with a dark halo + gold glow so it reads on a phone against the lit awning
      const pxMoon = (mx, my) => {
        c.save(); const g = c.createRadialGradient(mx, my, 10, mx, my, 95)
        g.addColorStop(0, 'rgba(40,20,70,0.85)'); g.addColorStop(0.55, 'rgba(242,199,92,0.28)'); g.addColorStop(1, 'rgba(242,199,92,0)')
        c.fillStyle = g; c.beginPath(); c.arc(mx, my, 95, 0, Math.PI * 2); c.fill(); c.restore()
        drawIcon(c, 'moon', mx - 50, my - 44, 11)
      }
      const arc = (p, x0, y0, x1, y1) => [lerp(x0, x1, p), lerp(y0, y1, p) - Math.sin(Math.PI * p) * 120]
      const up = prog(t, T.pisMoon - 0.1, T.pisMoon + 0.4), down = prog(t, T.pisSend, T.pisSend + 0.5)
      { const [mx, my] = up <= 0 ? [aqX + 70, aqY - 60] : arc(up, aqX + 70, aqY - 60, LANE.pisces.x + 60, LANE.pisces.y - 20); pxMoon(mx, my) }
      if (t > T.pisSend - 0.6) { const [mx, my] = down <= 0 ? [LANE.pisces.x - 60, LANE.pisces.y - 20] : arc(down, LANE.pisces.x - 60, LANE.pisces.y - 20, aqX - 70, aqY - 60); pxMoon(mx, my) }
      sparkles(c, t, LANE.pisces.x + 60, LANE.pisces.y - 20, T.pisMoon + 0.4, 10, 90, 3, [ML_GOLD, CYAN, BONE])
      sparkles(c, t, aqX - 70, aqY - 60, T.pisSend + 0.5, 10, 90, 5, [ML_GOLD, CYAN, BONE])
      // Capricorn & Leo (the Ep 1 blind date): the HARD STOP alarm, snoozed; they stay, then head up to the roof
      const off = path(t, [[14.0, 0], [15.6, -480]])
      drawMysteryCard(c, 70 + off, standY(S) - 20, 70, t, { sign: 'leo', rot: -0.2 })
      if (t < 15.6) {
        drawSign(c, 'capricorn', 200 + off, standY(S), S, t, { mood: t > T.snooze + 0.3 ? 'happy' : 'neutral', look: [1, -0.5], hops: [...H.CP, ...(t > T.snooze + 0.3 ? steps(T.snooze + 0.4, 15.6, 0.42) : [])], seed: 11 })
        drawSign(c, 'leo', 400 + off, standY(S), S, t, { mood: t > T.snooze + 0.3 ? 'heart' : 'happy', look: [-1, 0], hops: [T.snooze + 0.35, ...steps(T.snooze + 0.6, 15.6, 0.42)], seed: 17 })
      }
      if (t < T.snooze + 0.8) drawBubble(c, 240, standY(S) - 190, t < T.snooze ? 'HARD STOP 9:00' : 'snoozed.', { size: 30, col: t < T.snooze ? '#ffb0b0' : BONE, k: pop01(t, 10.4, 0.25, 2.2) * (1 + 0.08 * Math.sin(t * 40) * (t < T.snooze ? 1 : 0)) })
      // Aries (one balloon) + Virgo (yogurt)
      drawSign(c, 'virgo', 560, standY(S), S, t, { mood: 'happy', look: [1, 0], seed: 3 })
      yogurtCup(c, 465, standY(S) + 10, 3)
      drawSign(c, 'aries', 750, standY(S), S, t, { mood: t > 15 ? 'sparkle' : 'happy', look: [-1, 0], hops: H.AR, seed: 5 })
      balloon(c, 815, standY(S) + 30, t)
      // Taurus & Gemini: the food table + the napkin plan
      R(c, 1050, 1300, 330, 24, INK); R(c, 1054, 1302, 322, 18, '#c0703a')
      drawSign(c, 'taurus', 1120, standY(S), S, t, { mood: 'happy', look: [1, 0], seed: 9 })
      drawSign(c, 'gemini', 1320, standY(S), S, t, { mood: t > 24.3 ? 'wink' : 'happy', look: [-1, 0], hops: H.GE, seed: 4 })
      R(c, 1030, 1320, 370, 110, INK); R(c, 1036, 1324, 358, 100, '#8a3a4a')
      for (const [px, k] of [[1090, 'bun'], [1160, 'croissant'], [1230, 'cake'], [1310, 'loaf']]) drawPastry(c, px, 1294, 5, k)
      napkin(c, 1215, 1376)
      // Cancer on the bench, video-calling Sagittarius
      drawSign(c, 'cancer', 1520, standY(S), S, t, { mood: t > 28.9 ? 'happy' : 'sparkle', look: [1, -0.4], hops: H.CA, seed: 13 })
      phone(c, 1665, 1250, 130, 200, () => { R(c, 1608, 1172, 114, 160, '#2a3a7a'); drawSign(c, 'sagittarius', 1665, 1258, 100, t, { mood: 'happy', hops: [29.4, 30.2, 31.0], seed: 14 }) })
      // Leo & Capricorn on the rooftop (they went up after the hard stop)
      if (t > 30.5) drawSign(c, 'leo', 1330, standY(160, LANE.roof.y + 10), 160, t, { pop: pop01(t, 30.5, 0.35, 2), mood: t > 33.3 ? 'heart' : 'happy', look: [1, 0], hops: H.LE, seed: 7 })
      if (t > 30.6) drawSign(c, 'capricorn', 1490, standY(160, LANE.roof.y + 10), 160, t, { pop: pop01(t, 30.6, 0.35, 2), mood: t > 34.4 ? 'heart' : 'happy', look: [-1, 0], hops: [34.4], seed: 11 })
      // Libra at the stall, looking toward the café
      drawSign(c, 'libra', 1960, standY(210), 210, t, { mood: t > 37.6 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [38.0], seed: 6 })
    })
  }

  function misses(t) {
    const pan = 500
    drawLane(x, t, { moon: MOON, pan }, c => {
      garlands(c, t)
      const S = 210
      const pisLand = t > T.pisDrop[0]
      if (!pisLand) drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 2, mood: t > 53 ? 'wide' : 'sparkle', box: false, look: [1, 1] })
      let lx, sx, lm = 'neutral', sm = 'neutral', ll = [-1, 0], sl = [1, 0], lh = [], sh = []
      if (t < T.miss2) {                     // one: they swap places through the crowd
        lx = path(t, [[40.4, 1520], [44.4, 960]]); sx = path(t, [[40.4, 980], [44.4, 1500]])
        ll = t < 44.6 ? [0, -1] : [1, 0]; sl = t < 44.6 ? [0, -1] : [-1, 0]; lm = sm = t < 44.6 ? 'sparkle' : 'wide'
        lh = steps(40.4, 44.4); sh = steps(40.5, 44.4)
      } else if (t < T.miss3) {              // two: the conga line
        lx = t < 50.6 ? 900 : lerp(900, pan + 1300, ease.inQuad(prog(t, 50.6, T.conga[1]))); sx = 1200
        lm = t > 50.6 ? 'wide' : 'sparkle'; sm = t > 51 ? 'squint' : 'sparkle'; ll = [1, 0]; sl = [-1, 0]
        lh = t > 50.6 ? steps(50.6, 53.2, 0.28) : [47.4, 49.6]; sh = [47.5, 49.6]
      } else if (t < T.low) {                // three: Pisces lands in the middle
        lx = 880; sx = 1200; ll = [1, 0]; sl = [-1, 0]
        lm = t > T.pisDrop[1] ? 'wide' : 'sparkle'; sm = lm; lh = [54.4, 55.4]; sh = [54.5]
        const hug = clamp(prog(t, 57.2, 57.6)) * (1 - prog(t, 59.8, 60.3))
        lx += hug * 70; sx -= hug * 70
      }
      drawSign(c, 'libra', lx, standY(S), S, t, { mood: lm, look: ll, hops: lh, seed: 6 })
      drawSign(c, 'scorpio', sx, standY(S), S, t, { mood: sm, look: sl, hops: sh, seed: 8 })
      if (t < T.miss2) {
        drawBubble(c, 960, standY(S) - 180, 'Scorpio?', { size: 34, k: pop01(t, 44.8, 0.25, 2.2) })
        drawBubble(c, 1500, standY(S) - 180, 'Libra?', { size: 34, k: pop01(t, 45.3, 0.25, 2.2) })
      } else if (t < T.miss3) {
        drawBubble(c, 900, standY(S) - 180, 'would y—', { size: 34, k: pop01(t, 49.5, 0.25, 2.2) * outK(t, [50.5, 50.7]) })
        drawBubble(c, 1200, standY(S) - 180, 'would y—', { size: 34, k: pop01(t, 49.65, 0.25, 2.2) * outK(t, [50.5, 50.7]) })
        if (t > T.conga[0]) {
          const lead = lerp(pan - 250, pan + 1350, prog(t, ...T.conga))
          for (let i = 0; i < 5; i++) congaStar(c, t, i, lead - i * 125, 1470)
          drawBubble(c, lead, 1160, 'CONGA!', { size: 34, col: '#fff1c8', k: pop01(t, T.conga[0] + 0.3, 0.25, 2.2) })
        }
      } else if (t < T.low) {
        drawBubble(c, 880, standY(S) - 180, 'so, um—', { size: 34, k: pop01(t, 55.4, 0.25, 2.2) * outK(t, [56.0, 56.2]) })
        if (pisLand) {
          const dk = ease.inQuad(prog(t, ...T.pisDrop))
          drawPisces(c, 1040, lerp(LANE.pisces.y, standY(190), dk), 190, t, { tears: 3, mood: 'happy', hops: [T.pisDrop[1], 57.2, 58.0, 58.8, 59.6], pull: bump(t, 58.4, 0.5) })
          drawBubble(c, 1040, standY(190) - 200, 'I LOVE PARTIES!!', { size: 36, col: '#bfe9ff', k: pop01(t, 56.5, 0.25, 2.4) })
        }
      }
    })
  }

  function low(t) {
    drawLane(x, t, { moon: MOON, pan: 650, time: 'night' }, c => {
      garlands(c, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 2, mood: 'wide', box: false })
      const S = 200
      drawSign(c, 'scorpio', 970, standY(S), S, t, { mood: 'sleepy', look: [1, 1], rot: 0.12, seed: 8 })
      drawSign(c, 'libra', 1180, standY(S, LANE.bench.seatY), S, t, { mood: t > 67.3 ? 'squint' : 'sleepy', look: [-1, 1], rot: -0.14, hops: H.LI, seed: 6 })
      drawSign(c, 'gemini', 1420, standY(S), S, t, { mood: t > 67.3 ? 'wide' : 'wink', look: [-1, 0], hops: H.GE, seed: 4 })
      if (t > 64.2 && t < 67.2) drawIcon(c, 'star', 1290, standY(S) - 150, 4)
    })
  }

  function act3(t) {
    const pan = 560
    drawLane(x, t, { moon: MOON, pan, lit: { pisces: 1, cafe: 1, a0: 1, a4: 1, b0: 1, c0: 1, c2: 1, d1: 1, d5: 1 } }, c => {
      garlands(c, t)
      const S = 210, sy = standY(S)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10 - (t > T.cheer ? 20 : 0), 110 + (t > T.cheer ? 40 : 0), t, { tears: t > T.cheer ? 3 : 2, mood: t > T.cheer ? 'happy' : 'sparkle', box: false, hops: t > T.cheer ? steps(T.cheer, 104, 0.5) : null })
      const sx = path(t, [[90.2, 700], [T.meet, 950]]), lx = path(t, [[90.2, 1460], [T.meet, 1170]])
      const said = t > 97.9, yes = t > 99.4
      drawSign(c, 'scorpio', sx, sy, S, t, { mood: yes ? 'heart' : t > T.both && t < T.laugh + 0.6 ? 'wide' : t > T.laugh ? 'happy' : 'neutral', look: [1, 0], hops: [...steps(90.2, T.meet), T.laugh, T.laugh + 0.3, ...H.SC, T.cheer], seed: 8 })
      drawSign(c, 'libra', lx, sy, S, t, { mood: yes ? 'heart' : said ? 'sparkle' : t > T.both && t < T.laugh + 0.6 ? 'wide' : t > T.laugh ? 'happy' : 'neutral', look: [-1, 0], hops: [...steps(90.25, T.meet), T.laugh + 0.05, T.laugh + 0.35, ...H.LI, T.cheer + 0.1], seed: 6 })
      drawBubble(c, sx - 10, sy - 180, 'would you—', { size: 32, k: pop01(t, T.both, 0.22, 2.4) * outK(t, [T.laugh - 0.1, T.laugh + 0.1]) })
      drawBubble(c, lx + 10, sy - 180, 'would you—', { size: 32, k: pop01(t, T.both, 0.22, 2.4) * outK(t, [T.laugh - 0.1, T.laugh + 0.1]) })
      if (t > T.laugh && t < T.laugh + 1.2) drawBubble(c, (sx + lx) / 2, sy - 230, 'ha!', { size: 34, col: '#fff1c8', k: pop01(t, T.laugh, 0.2, 2.4) })
      // the pastry box → the founding card
      const bxX = sx + 70, bxY = sy + 50
      pastryBox(c, bxX, bxY, 1.6, ease.outBack(prog(t, T.open, T.open + 0.35)))
      if (cardImg && t > T.card[0]) {
        const k = ease.outBack(prog(t, ...T.card)), w = 210 * (0.4 + 0.6 * k), h = w * cardImg.height / cardImg.width
        const cy = lerp(bxY - 20, sy - 300, k) + Math.sin(t * 2) * 6
        c.save(); c.shadowColor = rgba(ML_GOLD, 0.9); c.shadowBlur = 50; c.translate((bxX + lx) / 2 - 40 * (1 - k), cy); c.rotate(0.05 * Math.sin(t * 1.5))
        c.drawImage(cardImg, -w / 2, -h / 2, w, h); c.restore()
        sparkles(c, t, (bxX + lx) / 2, cy, T.card[1] - 0.2, 14, 220, 7, [ML_GOLD, BONE, PINK])
      }
      if (t > T.cheer - 0.3) {
        crowd(c, t, T.cheer - 0.3)
        for (let i = 0; i < 6; i++) sparkles(c, t, pan + 120 + i * 170, 620 + (i % 2) * 110, T.cheer + 0.2 + i * 0.35, 18, 240, 40 + i, [ML_GOLD, PINK, CYAN, MINT, BONE])
      }
    })
  }

  function tag(t) {
    drawLane(x, t, { moon: MOON, pan: 650, time: 'late', lit: { pisces: 1, cafe: 0.6, c2: 1, d6: 1, a4: 1 } }, c => {
      garlands(c, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 3, mood: 'happy', box: false })
      const S = 200, sy = standY(S, LANE.bench.seatY)
      const push = t < T.split ? Math.sin((t - 108.6) * 4) * 30 * clamp(prog(t, 108.6, 108.9)) : 0
      drawSign(c, 'scorpio', 1070, sy, S, t, { mood: t > T.split ? 'heart' : 'happy', look: [1, 0.5], hops: [108.8, T.split], seed: 8 })
      drawSign(c, 'libra', 1310, sy, S, t, { mood: t > T.split ? 'heart' : 'happy', look: [-1, 0.5], hops: [109.3, T.split + 0.05], seed: 6 })
      const half = ease.outBack(prog(t, T.split, T.split + 0.3))
      if (t < T.split) drawPastry(c, 1190 + push, sy + 40, 7, 'croissant')
      else { c.save(); c.beginPath(); c.rect(0, 0, 1190, 1920); c.clip(); drawPastry(c, 1190 - half * 50, sy + 40, 7, 'croissant'); c.restore(); c.save(); c.beginPath(); c.rect(1190, 0, 1000, 1920); c.clip(); drawPastry(c, 1190 + half * 50, sy + 40, 7, 'croissant'); c.restore() }
      sparkles(c, t, 1190, sy + 30, T.split, 10, 110, 9, [ML_GOLD, BONE, PINK])
    })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      if (t < T.cold) drawSky(x, t, SKY_H)
      else if (t < T.title) coldOpen(t)
      else if (t < T.tour) drawSky(x, t, SKY_H)
      else if (t < T.miss1) tour(t)
      else if (t < T.low) misses(t)
      else if (t < T.adv + 0.7) low(t)
      else if (t < T.act3) drawSky(x, t, SKY_H)
      else if (t < T.tag) act3(t)
      else if (t < T.next) tag(t)
      else drawSky(x, t, SKY_H)
      prev.update(t); title.update(t)
      for (const c of caps) c.update(t)
      for (const b of boxes) b.update(t)
      adv.update(t); lesson.update(t); fin.update(t)
      bug.update(t, title.on(t) || prev.on(t) ? 0 : outK(t, [END - 0.3, END]))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx plays only the middle one: 40.0, the tour → the near misses)
const CUTS = [T.title + 3, T.miss1, T.low]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END, corners: 'tr bl br' }), cardCuts(CUTS)]

export const CUES = [
  ...previouslyCues(T.prev, PREV.length, 2),
  ...CAPS.flatMap(c => captionCues(c)),
  ...titleCues(T.title, 3),
  ...talkCues(LINES, { cps: 28 }),
  // cold open: lamps + garlands light up down the lane
  ...Array.from({ length: 8 }, (_, i) => ['pop', r3(3.0 + i * 0.2), [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51, 1760][i], 0.025, (i / 7 - 0.5)]), ['glitter', 3.0, 4.6],
  // the tour
  ...[14.4, 18.9, 23.4, 27.9, 32.4, 36.9].map(v => ['whoosh', v, 0.6, 0.03]),
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(10.4 + i * 0.25), 0.04]), ['pop', T.snooze, 659.25, 0.04, -0.3], ['pluck', T.snooze + 0.3, 987.77, 0.03, 0.5, -0.3],
  ['pop', T.pisMoon, 1318.51, 0.045, 0.2], ['glitter', T.pisMoon, T.pisMoon + 0.5], ['whoosh', T.pisSend, 0.4, 0.03], ['pluck', T.pisSend + 0.1, 1760, 0.03, 0.5, 0.3],
  ['bell', 29.4, 1760, 0.02, 1, 0.4], ['pluck', 34.4, 1174.66, 0.035, 0.6, 0],
  // near misses
  ['pop', 44.8, 880, 0.04, -0.2], ['pop', 45.3, 739.99, 0.04, 0.3], ['pluck', 45.6, 587.33, 0.03, 0.6, 0],
  ['pop', 49.5, 880, 0.035, -0.2], ['pop', 49.65, 880, 0.035, 0.2], ...steps(T.conga[0], T.conga[1], 0.28).map((v, i) => ['tick', v, 0.03 + (i % 2) * 0.02]), ['pop', T.conga[0] + 0.3, 1318.51, 0.045, 0],
  ['pop', 55.4, 880, 0.035, -0.2], ['whoosh', T.pisDrop[0], 0.45, 0.05], ['tom', T.pisDrop[1], 90, { gain: 0.2, decay: 0.3 }], ['pop', 56.5, 1567.98, 0.05, 0], ['pluck', 57.2, 1318.51, 0.035, 0.5, 0],
  ...adviseCues(ADVISE),
  // act 3
  ['pop', T.both, 880, 0.045, -0.3], ['pop', T.both, 987.77, 0.045, 0.3], ['pluck', T.laugh, 1318.51, 0.04, 0.6, 0], ['pop', T.laugh + 0.15, 1174.66, 0.03, 0],
  ['tick', T.open, 0.06], ['pop', T.open + 0.1, 880, 0.04, 0], ['riser', T.card[0] - 0.2, T.card[1], 0.03], ['bell', T.card[1], 1760, 0.035, 1.6, 0], ['glitter', T.card[1] - 0.2, T.card[1] + 0.6],
  ['glitter', T.cheer, T.cheer + 2.2], ...Array.from({ length: 6 }, (_, i) => ['bell', r3(T.cheer + 0.2 + i * 0.35), [1760, 2349.32, 1975.53][i % 3], 0.02, 1, (i % 2 ? 0.4 : -0.4)]),
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: 'A' }),
  // tag: the croissant split
  ['whoosh', T.tag, 0.4, 0.03], ['tick', 108.9, 0.03], ['tick', 109.3, 0.03], ['pop', T.split, 1174.66, 0.04, 0], ['glitter', T.split, T.split + 0.5],
  ...nextTimeCues(T.next),
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
