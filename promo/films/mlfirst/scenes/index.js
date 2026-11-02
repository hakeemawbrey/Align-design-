// mlfirst: MOONLIGHT LANE · Ep 9 "Saying It First" (120 s vertical, STARTALK-EPISODES.md, music: house · G)
// Story 0–115.6, then the shared end card. The show look (lane, café, apartment, bug, title, previously, advise,
// next time) is ./mlkit.js, copied unchanged from mlpilot.
//    0.0–2.0    PREVIOUSLY ON…  one balloon at 7 PM · a pixel moon ("still here") · Scorpio knew the name
//    2.0–7.0    cold open: Virgo's apartment, 11:48 PM, a love-note draft scroll that reaches the rug. "Three drafts. |
//               Eleven footnotes." VIRGO: "it's three words. why is it a thesis?"
//    7.0–10.0   title card
//   10.0–19.4   Act 1 · the lane at dusk: Virgo and Aries (Ep 2) stroll, Aries carries ONE balloon. Six weeks in.
//   19.4–28.8   Act 1 · the apartment: three drafts pinned on the wall, Virgo presents them with a pointer.
//   28.8–40.0   Act 1 · the café: "I need the perfect moment." Taurus slides a bun. Pisces is already crying.
//   40.0        card cut (the middle candidate)
//   40.0–48.4   Act 2 · bad advice: Leo (with a spotlight) wants a choir; Gemini wants forty hearts.
//   48.4–61.0   Act 2 · the rule of three: "I…" + a sneeze · "I…" + a bus · "I…" + Pisces sobbing out the window.
//   61.0–70.0   Act 2 · the pressure (sweat, zoom) → "I love… yogurt." Crickets. Aries: "…cool! me too?" Virgo slumps.
//   70.0–90.0   THE STARS ADVISE (softer bed): no strings · no perfect moment · let them answer in their time
//   90.0–104    Act 3 · the bench under the middle lamp post (the lift): the drafts blow away, Virgo says it plainly,
//               Aries' face does a pixel-sparkle fireworks thing, "I love you too." Last line card.
//  104–108      LESSON UNLOCKED "Real beats | perfect." chip "−11 FOOTNOTES"
//  108–111.6    lane tag (split screen): Libra and Scorpio each decide to ask the other out tomorrow.
//  111.6–115.6  NEXT TIME: "The Moonlight Lane block party."
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  ML_GOLD, BONE, INK, PINK, CYAN, INTER, MONO, SERIF, loadFonts, r3, pop01, outK, popOut, bump,
  drawSign, drawPisces, standY, drawLane, LANE, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, drawBubble, drawIcon, drawPastry, sparkles, rgba,
} from './mlkit.js'

export const DURATION = 120
const END = DURATION - ENDCARD_LEN            // 115.6
const SG = s => signStar(s)
const sp = (s, name) => `${SG(s).glyph}︎ ${name}`
const SPK = { V: sp('virgo', 'VIRGO'), A: sp('aries', 'ARIES'), T: sp('taurus', 'TAURUS'), P: sp('pisces', 'PISCES'), L: sp('leo', 'LEO'), G: sp('gemini', 'GEMINI'), S: 'THE STARS' }
const COL = { V: '#a8e6a0', A: '#ff9a8a', T: '#9fe6b0', P: '#9fd8ff', L: '#ffd27a', G: '#ffe27a', S: ML_GOLD }
const line = (k, t, text) => ({ t, speaker: SPK[k], color: COL[k], text })

// ── the timeline
const T = {
  prev: 0, cold: 2, title: 7,
  walk: 10, drafts: 19.4, cafe: 28.8, advice: 40, tries: 48.4, press: 61, slump: 66.2,
  adv: 70, advOut: [89.4, 89.9],
  bench: 90, lesson: 104, tag: 108, next: 111.6,
  // gags
  bun: 33.2, sneezeI: 49.5, sneeze: 50.5, busI: 53.3, bus: [53.9, 55.7], pisI: 57.3, pisSob: 58.0,
  yogurt: 63.9, crick: 65.0, cool: 66.3,
  drop: 92.4, said: 94.2, fx: 96.5, too: 98.3,
}

// dialogue (≤ 46 chars, each holds ≥ 1.5 s after typing)
const BOXES = [
  { open: 3.1, close: 6.7, lines: [line('V', 3.3, "it's three words. why is it a *thesis?*")] },
  { open: 10.7, close: 19.2, lines: [line('S', 10.9, 'Virgo and Aries. *Six weeks* in.'), line('S', 14.0, 'Aries learned to go *slow.*'), line('S', 16.8, 'and Virgo has a *feeling.*')] },
  { open: 20.0, close: 28.6, lines: [line('V', 20.2, 'draft A: *direct.* too risky.'), line('V', 23.0, 'draft B: eleven *footnotes.*'), line('V', 25.6, 'draft C: a *slideshow.* with charts.')] },
  { open: 29.2, close: 39.4, lines: [line('V', 29.4, 'I need the *perfect* moment to say it.'), line('T', 32.6, 'eat first. *then* feelings.'), line('P', 35.4, "you're saying it?! I'm *already* crying.")] },
  { open: 40.6, close: 48.2, lines: [line('L', 40.8, 'say it with a *spotlight.* and a choir.'), line('G', 43.5, 'no! text it. with *forty* hearts.'), line('S', 46.0, '(both of these are *bad* advice.)')] },
  { open: 61.1, close: 69.8, lines: [line('A', 61.3, "you've said “I” six times. you okay?"), line('V', 63.9, 'I love… *yogurt.*'), line('V', 66.6, 'eleven footnotes. and I said *yogurt.*')] },
  { open: 90.8, close: 103.6, lines: [line('V', 91.0, "there's no perfect moment. so…"), line('V', 94.2, 'I love you. no rush to say it *back.*'), line('A', 98.3, 'I love you *too.*'), line('A', 100.6, 'also… did you say *yogurt?*')] },
]
const LINES = BOXES.flatMap(b => b.lines)
const hopsOf = k => talkHops(LINES, SPK[k])
const H = { V: hopsOf('V'), A: hopsOf('A'), T: hopsOf('T'), P: hopsOf('P'), L: hopsOf('L'), G: hopsOf('G') }

// captions (Inter 800 headline, one italic accent)
const CAPS = [
  { text: 'Three drafts. | *Eleven* footnotes.', kicker: 'SUNDAY · 11:48 PM', at: 2.15, out: [6.6, 6.9] },
  { text: 'Six weeks. | *One* balloon.', kicker: 'EARLIER THAT EVENING', at: 10.2, out: [16.3, 16.6] },
  { text: 'Virgo has | a *feeling.*', at: 16.75, out: [19.0, 19.3] },
  { text: 'The *drafts.*', at: 19.6, out: [28.4, 28.7] },
  { text: 'The *perfect* | moment.', at: 29.0, out: [39.5, 39.85] },
  { text: 'Friends with | *opinions.*', at: 40.25, out: [48.0, 48.3] },
  { text: 'Moment one: | *a sneeze.*', at: 50.6, out: [52.9, 53.2] },
  { text: 'Moment two: | *a bus.*', at: 54.8, out: [57.0, 57.3] },
  { text: 'Moment three: | *Pisces.*', at: 58.3, out: [60.6, 60.9] },
  { text: 'Say it. | *Say it.*', at: 61.2, out: [63.6, 63.85] },
  { text: 'I love… | *yogurt?*', at: 64.6, out: [69.5, 69.85] },
  { text: 'No speech. | *No footnotes.*', at: 90.2, out: [96.2, 96.5] },
  { text: 'Aries’ face did | a *fireworks* thing.', at: 96.9, out: [103.6, 103.9], size: 84 },
  { text: 'Same plan. | *Tomorrow.*', at: 108.2, out: [111.2, 111.5] },
  { text: '*No* perfect moment. | Just this one.', at: 112.4, out: [115.05, 115.4], size: 88, top: 300 },   // the last line
]
const ADVISE = {
  at: T.adv, out: T.advOut,
  cards: [
    { at: 71.0, icon: 'heart', head: 'A feeling isn’t a *contract.*', body: 'Say it with no strings. They don’t owe you anything back tonight.' },
    { at: 77.0, icon: 'clock', head: 'No *perfect* moment.', body: 'There’s only a real one. Sneezes, buses and Pisces included.' },
    { at: 83.0, icon: 'moon', head: 'Let them answer *in their time.*', body: 'Try: “No rush to say it back. I just wanted you to know.”' },
  ],
  lines: [
    { t: 71.6, text: 'Virgo, this one’s *yours.*' },
    { t: 77.6, text: 'say it on a Tuesday. say it *plainly.*' },
    { t: 83.6, text: 'Aries? your pace is *not* a verdict.' },
  ],
}
const LESSON = { at: T.lesson, out: [107.6, 107.95], text: 'Real beats | *perfect.*', chip: '−11 FOOTNOTES' }

// ── little helpers
const path = (t, keys) => {           // keys [[t, v], …] eased between
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) return lerp(keys[i - 1][1], keys[i][1], ease.inOutCubic(prog(t, keys[i - 1][0], keys[i][0])))
  return keys[keys.length - 1][1]
}
const steps = (a, b, d = 0.34) => Array.from({ length: Math.max(0, Math.floor((b - a) / d)) }, (_, i) => r3(a + i * d))
const R = (g, x, y, w, h, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }

function paper(g, cx, cy, w, h, rot, { title = '', rows = 4, foot = '', chart = false, hi = 0, stamp = null, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  g.save(); g.globalAlpha *= alpha; g.translate(cx, cy); g.rotate(rot); g.scale(1 + 0.06 * hi, 1 + 0.06 * hi)
  if (hi > 0) { g.shadowColor = rgba(ML_GOLD, 0.8 * hi); g.shadowBlur = 40 * hi }
  R(g, -w / 2 - 5, -h / 2 - 5, w + 10, h + 10, INK); g.shadowBlur = 0
  R(g, -w / 2, -h / 2, w, h, '#fbf3e0')
  R(g, -10, -h / 2 - 14, 20, 20, '#e8566e')                               // the pin
  g.fillStyle = INK; g.font = `800 ${Math.round(w * 0.13)}px ${INTER}`; g.textAlign = 'center'; g.textBaseline = 'top'
  g.fillText(title, 0, -h / 2 + 16)
  for (let i = 0; i < rows; i++) R(g, -w / 2 + 16, -h / 2 + 30 + w * 0.17 + i * 20, (w - 32) * [1, 0.86, 0.94, 0.6, 0.8][i % 5], 7, 'rgba(27,18,54,0.35)')
  if (chart) {
    const y0 = h / 2 - w * 0.36
    g.fillStyle = PINK; g.beginPath(); g.moveTo(0, y0); g.arc(0, y0, w * 0.22, 0, Math.PI * 1.45); g.fill()
    g.fillStyle = '#7fb0ff'; g.beginPath(); g.moveTo(0, y0); g.arc(0, y0, w * 0.22, Math.PI * 1.45, Math.PI * 2); g.fill()
    g.strokeStyle = INK; g.lineWidth = 3; g.beginPath(); g.arc(0, y0, w * 0.22, 0, Math.PI * 2); g.stroke()
  }
  if (foot) { g.fillStyle = '#7a5a8a'; g.font = `italic 500 ${Math.round(w * 0.1)}px ${SERIF}`; g.textBaseline = 'bottom'; g.fillText(foot, 0, h / 2 - 10) }
  if (stamp) { g.save(); g.rotate(-0.25); g.strokeStyle = '#e8566e'; g.lineWidth = 5; g.strokeRect(-w * 0.4, -18, w * 0.8, 40); g.fillStyle = '#e8566e'; g.font = `800 ${Math.round(w * 0.12)}px ${INTER}`; g.textBaseline = 'middle'; g.fillText(stamp, 0, 2); g.restore() }
  g.restore()
}
function balloon(g, hx, hy, t, k = 1) {         // ONE balloon (the Ep 2 callback), string to (hx, hy)
  if (k <= 0.01) return
  const bx = hx + 30 + 8 * Math.sin(t * 1.7), by = hy - 230 + 6 * Math.sin(t * 2.3)
  g.strokeStyle = '#efe6d6'; g.lineWidth = 3; g.beginPath(); g.moveTo(hx, hy)
  g.quadraticCurveTo(hx + 30, hy - 110, bx, by + 40); g.stroke()
  drawIcon(g, 'balloon', bx - 8 * 8 * k / 2, by - 50 * k, 8 * k)
}
function drop(g, x, y, s = 6) { R(g, x - s, y - s, s * 2, s * 3, INK); R(g, x - s + 3, y - s + 3, s * 2 - 6, s * 3 - 6, '#8fe3ff'); R(g, x - s + 3, y - s + 3, 4, 4, '#ffffff') }
function bus(g, x, yb, t) {                     // a plain pixel bus (no name, no number)
  const w = 760, h = 360, y = yb - h, sh = Math.sin(t * 40) * 3
  R(g, x - 6, y - 6 + sh, w + 12, h - 30, INK)
  R(g, x, y + sh, w, h - 42, '#3fa7a0'); R(g, x, y + sh + h - 140, w, 30, '#ffcf6e')
  for (let i = 0; i < 6; i++) R(g, x + 30 + i * 120, y + 40 + sh, 90, 110, '#bfe9ff')
  R(g, x + w - 70, y + 40 + sh, 50, 200, '#8fd0e8')
  for (const wx of [140, w - 170]) { R(g, x + wx - 6, yb - 96, 112, 112, INK); R(g, x + wx, yb - 90, 100, 100, '#3a3550'); R(g, x + wx + 34, yb - 56, 32, 32, '#9a96b0') }
  for (let i = 0; i < 4; i++) R(g, x + w + 20 + i * 40 + (t * 300 % 40), yb - 60 - i * 14, 26, 12, 'rgba(239,230,214,0.5)')
}
function yogurtCup(g, cx, cy, s) {
  R(g, cx - 13 * s, cy - 14 * s, 26 * s, 4 * s, INK); R(g, cx - 12 * s, cy - 13 * s, 24 * s, 3 * s, PINK)
  R(g, cx - 11 * s, cy - 10 * s, 22 * s, 20 * s, INK); R(g, cx - 10 * s, cy - 10 * s, 20 * s, 19 * s, '#fffaf0')
  R(g, cx - 6 * s, cy - 4 * s, 12 * s, 6 * s, PINK)
}
function spotlight(g, x, yTop, yBot, a) {
  if (a <= 0.01) return
  g.save(); g.globalCompositeOperation = 'lighter'
  const gr = g.createLinearGradient(0, yTop, 0, yBot); gr.addColorStop(0, `rgba(255,236,170,${0.65 * a})`); gr.addColorStop(1, `rgba(255,236,170,${0.08 * a})`)
  g.fillStyle = gr; g.beginPath(); g.moveTo(x - 30, yTop); g.lineTo(x + 30, yTop); g.lineTo(x + 170, yBot); g.lineTo(x - 170, yBot); g.closePath(); g.fill()
  g.restore()
}
function crickets(g, t, t0, x, y) {
  const k = Math.sin(Math.PI * prog(t, t0, t0 + 1.2))
  if (k <= 0.01) return
  g.save(); g.globalAlpha = k; g.font = `700 32px ${MONO}`; g.fillStyle = '#9fe6b0'; g.textAlign = 'center'; g.fillText('* chirp *', x, y); g.restore()
}

// ── the previously stills (painted once at build)
const PREV = [
  { caption: 'One balloon. 7 PM.', crop: [520, 820, 620, 732], scene: g => drawLane(g, 1, { time: 'dusk', pan: 300, lampsAt: 0 }, c => { drawSign(c, 'virgo', 720, standY(200), 200, 1, { mood: 'happy' }); drawSign(c, 'aries', 920, standY(200), 200, 1, { mood: 'happy', look: [-1, 0] }); balloon(c, 990, 1340, 1) }) },
  { caption: 'Still here.', crop: [300, 700, 560, 661], scene: g => { drawApartment(g, 1, {}); drawPisces(g, 560, standY(220, 1400), 220, 1, { tears: 3, mood: 'happy' }); drawIcon(g, 'moon', 470, 760, 14) } },
  { caption: 'Scorpio knew the name.', crop: [480, 840, 600, 708], scene: g => drawLane(g, 1, { pan: 1150 }, c => { drawSign(c, 'scorpio', 1780, standY(200), 200, 1, { mood: 'happy' }); drawSign(c, 'libra', 1960, standY(200), 200, 1, { mood: 'heart', look: [-1, 0] }) }) },
]

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const prev = buildPreviously(root, { at: T.prev, len: 2, stills: PREV })
  const title = buildTitle(root, { ep: 9, title: 'Saying It First', at: T.title, len: 3 })
  const caps = CAPS.map(c => buildCaption(root, c))
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1530, height: 250, size: 46, open: b.open, close: b.close, cps: 28 }))
  const adv = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, LESSON)
  const next = buildNextTime(root, { at: T.next, out: [115.15, 115.55], teaser: 'The *Moonlight Lane block party.*' })
  const bug = showBug(root, 9, { at: 2.05 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ─── scenes
  function coldOpen(t) {
    drawApartment(x, t, { time: 'late' })
    const S = 230, vx = 400, vy = standY(S, APT.couch.seatY)
    const unroll = ease.outCubic(prog(t, 2.6, 4.2))
    // the scroll: from Virgo's hands down onto the rug and across the floor
    const L = 120 + unroll * 820
    x.save(); x.fillStyle = INK; x.fillRect(vx + 70, vy + 10, 120, Math.min(L, 380) + 6)
    x.fillStyle = '#fbf3e0'; x.fillRect(vx + 76, vy + 14, 108, Math.min(L, 380))
    if (L > 380) { x.fillStyle = INK; x.fillRect(vx + 70, vy + 384, Math.min(L - 380, 560) + 6, 70); x.fillStyle = '#fbf3e0'; x.fillRect(vx + 76, vy + 390, Math.min(L - 380, 560), 58) }
    x.fillStyle = 'rgba(27,18,54,0.3)'
    for (let i = 0; i < 16; i++) { const yy = vy + 34 + i * 22; if (yy < vy + 14 + Math.min(L, 380) - 10) x.fillRect(vx + 88, yy, [84, 70, 90, 50][i % 4], 6) }
    for (let i = 0; i < 18; i++) { const xx = vx + 90 + i * 30; if (L > 380 && xx < vx + 76 + L - 380 - 20) x.fillRect(xx, vy + 405 + (i % 3) * 12, 20, 5) }
    x.fillStyle = '#7a5a8a'; x.font = `italic 500 24px ${SERIF}`; x.textAlign = 'left'
    if (L > 700) x.fillText('¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ¹⁰ ¹¹', vx + 300, vy + 440)
    x.restore()
    drawSign(x, 'virgo', vx, vy, S, t, { mood: t > 4.6 ? 'wide' : 'squint', look: [1, 1], hops: H.V, seed: 3 })
    for (let i = 0; i < 2; i++) if (t > 4.6) drop(x, vx - 70 + i * 140, vy - 110 + ((t * 120 + i * 40) % 60), 5)
  }

  function walk(t) {
    const pan = path(t, [[10, 240], [19.4, 520]])
    drawLane(x, t, { time: 'dusk', pan, lampsAt: 12.5 }, c => {
      const vX = path(t, [[10, 560], [19.4, 1000]]), aX = vX + 230
      const moving = H.V
      const hop = steps(10.2, 19.2)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: t > 17 ? 3 : 1, mood: 'happy', box: false })
      drawSign(c, 'virgo', vX, standY(210), 210, t, { mood: t > 16.8 ? 'heart' : 'happy', look: [1, 0], hops: [...hop, ...moving], seed: 3 })
      drawSign(c, 'aries', aX, standY(210), 210, t, { mood: 'happy', look: [-1, 0], hops: hop.map(h => h + 0.05), seed: 5 })
      balloon(c, aX + 70, standY(210) + 30, t)
      if (t > 16.9) for (let i = 0; i < 3; i++) { const p = ((t - 16.9) * 0.6 + i / 3) % 1; drawIcon(c, 'heart', vX - 30 + i * 30 + Math.sin(p * 8) * 10, standY(210) - 150 - p * 160, 5) }
    })
  }

  const DR = [{ cx: 120, cy: 470, rot: -0.05, title: 'DRAFT A', rows: 1, foot: '“I love you.”', at: 20.2 }, { cx: 300, cy: 500, rot: 0.04, title: 'DRAFT B', rows: 5, foot: '¹ see footnotes ²–¹¹', at: 23.0 }, { cx: 480, cy: 460, rot: -0.03, title: 'DRAFT C', rows: 2, chart: true, at: 25.6 }]
  function drafts(t) {
    drawApartment(x, t, {})
    DR.forEach((d, i) => {
      const k = pop01(t, T.drafts + 0.2 + i * 0.15, 0.35, 2)
      const on = t >= d.at && (i === 2 || t < DR[i + 1].at) ? Math.min(1, (t - d.at) * 4) : 0
      paper(x, d.cx, d.cy, 160 * k, 220 * k, d.rot + 0.04 * bump(t, d.at, 0.4), { title: d.title, rows: d.rows, foot: d.foot, chart: d.chart, hi: on, stamp: i === 0 && t > 21.0 ? 'TOO RISKY' : null })
    })
    const S = 240, vx = 760, vy = standY(S, 1470)
    // the pointer
    const tgt = t < 23 ? DR[0] : t < 25.6 ? DR[1] : DR[2]
    const px = vx - 90, py = vy - 10, ex = lerp(px, tgt.cx + 40, 0.92), ey = lerp(py, tgt.cy + 60, 0.92)
    x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(px, py); x.lineTo(ex, ey); x.stroke()
    x.strokeStyle = '#c08a4a'; x.lineWidth = 5; x.beginPath(); x.moveTo(px, py); x.lineTo(ex, ey); x.stroke()
    R(x, ex - 6, ey - 6, 12, 12, '#e8566e')
    drawSign(x, 'virgo', vx, vy, S, t, { mood: t > 25.6 ? 'sparkle' : 'neutral', look: [-1, -1], hops: H.V, seed: 3 })
  }

  function cafe(t) {
    drawCafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x, standY(200, CAFE.counter.y), 200, t, { mood: t > 32.4 ? 'happy' : 'neutral', look: [-1, 1], hops: H.T, seed: 9 }) })
    const S = 230
    drawSign(x, 'virgo', CAFE.seats[0].x, standY(S, CAFE.seats[0].y), S, t, { mood: t > T.bun + 0.3 ? 'happy' : 'squint', look: t > 35.3 ? [1, 0] : [1, -1], hops: [...H.V, T.bun + 0.4], seed: 3 })
    drawPisces(x, CAFE.seats[1].x, standY(S, CAFE.seats[1].y), S, t, { tears: t > 35.3 ? 3 : 2, mood: t > 35.3 ? 'wide' : 'sparkle', look: [-1, 0], hops: H.P, pull: bump(t, 36.4, 0.6) + bump(t, 37.6, 0.6) })
    drawCafeTable(x, t, { cups: 2, pastry: null })
    // the bun slides from the counter onto the table
    const bk = ease.outCubic(prog(t, T.bun - 0.5, T.bun))
    if (t > T.bun - 0.5) drawPastry(x, lerp(760, 470, bk), lerp(1060, 1288, bk) - Math.sin(Math.PI * bk) * 120, 7, 'bun')
  }

  function advice(t) {
    drawLane(x, t, { pan: 560 }, c => {
      const S = 210
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 2, box: false, mood: 'wide', look: [1, 1] })
      const lx = 820, gx2 = 1340, vx = 1080
      spotlight(c, lx, 560, 1440, clamp(prog(t, 40.8, 41.2)) * (1 - prog(t, 43.3, 43.6) * 0.7))
      const lookV = t < 43.4 ? [-1, 0] : t < 45.9 ? [1, 0] : [0, -1]
      drawSign(c, 'leo', lx, standY(S), S, t, { mood: t < 43.4 ? 'sparkle' : 'neutral', look: [1, 0], hops: H.L, seed: 7 })
      drawSign(c, 'virgo', vx, standY(S), S, t, { mood: t > 45.9 ? 'eyeroll' : 'wide', look: lookV, seed: 3 })
      drawSign(c, 'gemini', gx2, standY(S), S, t, { mood: 'wink', look: [-1, 0], hops: H.G, seed: 4 })
      // Leo's choir: three tiny music notes; Gemini's phone of hearts
      if (t > 41.4 && t < 43.4) for (let i = 0; i < 3; i++) { const p = ((t - 41.4) * 0.8 + i / 3) % 1; drawIcon(c, 'star', lx - 80 + i * 70, standY(S) - 140 - p * 120, 4) }
      if (t > 43.5) {
        const k = pop01(t, 43.6, 0.3, 2)
        R(c, gx2 + 90, standY(S) - 120, 110 * k, 180 * k, INK); R(c, gx2 + 96, standY(S) - 114, 98 * k, 168 * k, '#2a2050')
        const n = Math.min(12, Math.floor((t - 43.7) * 8))
        for (let i = 0; i < n; i++) drawIcon(c, 'heart', gx2 + 104 + (i % 3) * 30, standY(S) - 104 + Math.floor(i / 3) * 36, 3)
      }
    })
  }

  function tries(t) {
    const pan = 360
    // attempt bubbles, reactions
    drawLane(x, t, { pan, lit: { pisces: 1, cafe: 1, a0: 1, a4: 1, c0: 1, c2: 1, d1: 1 } }, c => {
      const S = 220, vx = 760, ax = 1000, vy = standY(S)
      const sob = t > T.pisSob
      // Pisces: in the window, then flinging it open and leaning out
      const lean = ease.outBack(prog(t, T.pisSob - 0.2, T.pisSob + 0.15))
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10 - lean * 30, 110 + lean * 50, t, { tears: sob ? 3 : 1, mood: sob ? 'happy' : 'sparkle', box: false, hops: sob ? [58.0, 58.6, 59.2] : null })
      let vm = 'neutral', am = 'happy', aLook = [-1, 0]
      const tryOn = [T.sneezeI, T.busI, T.pisI].some(a => t > a && t < a + 1.2)
      if (tryOn) vm = 'sparkle'
      if (t > T.sneeze && t < T.busI) { vm = 'squint'; am = t < T.sneeze + 0.6 ? 'squint' : 'happy' }
      if (t > T.bus[1] && t < T.pisI) vm = 'squint'
      if (sob) { vm = 'eyeroll'; am = 'wide'; aLook = [-1, -1] }
      if (t > 59.4) vm = 'squint'
      const sneezeSq = bump(t, T.sneeze - 0.35, 0.35) * -0.12 + bump(t, T.sneeze, 0.25) * 0.2
      drawSign(c, 'virgo', vx, vy, S, t, { mood: vm, look: [1, 0], seed: 3, hops: [T.sneezeI, T.busI, T.pisI].map(v => v - 0.05) })
      drawSign(c, 'aries', ax, vy, S, t, { mood: am, look: aLook, seed: 5, squash: sneezeSq })
      balloon(c, ax + 70, vy + 30, t)
      // "I…" bubbles
      for (const a of [T.sneezeI, T.busI, T.pisI]) drawBubble(c, vx - 20, vy - 190, 'I…', { size: 40, k: pop01(t, a, 0.25, 2.2) * (t < a + 1.1 ? 1 : 0) })
      // sneeze
      if (t > T.sneeze && t < T.sneeze + 1.4) { drawBubble(c, ax + 60, vy - 200, 'ACHOO!', { size: 44, col: '#fff1c8', k: pop01(t, T.sneeze, 0.2, 2.6) }) }
      sparkles(c, t, ax - 60, vy - 30, T.sneeze, 12, 170, 4, [CYAN, BONE, '#bfe9ff'])
      // Pisces sob bubble
      if (sob && t < 60.8) drawBubble(c, LANE.pisces.x + 170, LANE.pisces.y - 150, "I'M SO HAPPY FOR YOU!!", { size: 30, col: '#bfe9ff', k: pop01(t, T.pisSob + 0.1, 0.25, 2.2), tail: 'down' })
      // the bus (in front of everyone)
      if (t > T.bus[0] && t < T.bus[1]) bus(c, lerp(pan + 1200, pan - 900, prog(t, ...T.bus)), 1470, t)
      if (t > T.bus[0] + 0.2 && t < T.bus[1] - 0.2) drawBubble(c, pan + 540, 1010, 'VRRRMMMM', { size: 40, col: '#fff1c8', tail: null, k: 1 })
    })
  }

  function pressure(t) {
    // zoom in on the pair under the café lamp, then the slump on the bench
    const z = t < T.slump ? lerp(1, 1.35, ease.inOutCubic(prog(t, T.press, 63.5))) : lerp(1.35, 1, ease.inOutCubic(prog(t, T.slump, T.slump + 0.8)))
    const shake = t > 62.4 && t < T.yogurt ? Math.sin(t * 60) * 3 : 0
    drawLane(x, t, { pan: 360, zoom: z, focus: [540, 1180], shake, lit: { pisces: 1, cafe: 1, a0: 1, a4: 1, c0: 1, c2: 1, d1: 1 } }, c => {
      const S = 220, vx = 760, vy = standY(S)
      const ax = lerp(1000, 1500, ease.inCubic(prog(t, 67.6, 69.4)))
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 2, mood: 'wide', box: false, look: [1, 1] })
      let vm = t < 62.6 ? 'wide' : t < T.yogurt ? 'squint' : t < T.crick + 1 ? 'wide' : 'sleepy'
      const slump = clamp(prog(t, 66.4, 67.0)) * 0.22
      drawSign(c, 'virgo', vx, vy, S, t, { mood: vm, look: [1, 0], seed: 3, hops: H.V, rot: -slump, squash: t > 62.4 && t < T.yogurt ? 0.04 * Math.sin(t * 30) : 0 })
      if (t > 61.8 && t < T.yogurt + 0.6) for (let i = 0; i < 3; i++) drop(c, vx - 90 + i * 90, vy - 120 + ((t * 140 + i * 30) % 90), 6)
      drawSign(c, 'aries', ax, vy, S, t, { mood: t > T.yogurt + 0.3 && t < T.cool ? 'wide' : 'happy', look: ax > 1010 ? [1, 0] : [-1, 0], seed: 5, hops: [...H.A, ...(t > 67.6 ? steps(67.6, 69.4, 0.3) : []), T.cool] })
      balloon(c, ax + 70, vy + 30, t)
      // the yogurt thought, crickets, Aries' "…cool! me too?"
      const yk = pop01(t, T.yogurt + 0.5, 0.3, 2.2) * outK(t, [66.2, 66.5])
      if (yk > 0.01) { drawBubble(c, vx + 10, vy - 250, '        ', { size: 80, k: yk }); yogurtCup(c, vx + 10, vy - 252, 4.4 * yk) }
      crickets(c, t, T.crick, 880, vy - 230)
      drawBubble(c, ax + 20, vy - 200, '…cool! me too?', { size: 32, k: pop01(t, T.cool, 0.25, 2.2) * outK(t, [67.5, 67.8]) })
    })
  }

  function bench(t) {
    const pan = 650
    drawLane(x, t, { time: 'late', pan, lit: { pisces: 1, cafe: 0.6, c2: 1, d6: 1, a4: 1 } }, c => {
      const S = 200, vx = 1080, ax = 1300, sy = standY(S, LANE.bench.seatY)
      const said = t > T.said + 1.7, fx = t > T.fx
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: t > T.too ? 3 : 2, mood: t > T.too ? 'happy' : 'sparkle', box: false, look: [1, 1], hops: t > T.too ? [T.too + 0.1, T.too + 0.7, T.too + 1.3] : null })
      drawSign(c, 'virgo', vx, sy, S, t, { mood: t > T.too ? 'heart' : said ? 'sparkle' : 'neutral', look: [1, 0], seed: 3, hops: [...H.V, T.too + 0.2] })
      drawSign(c, 'aries', ax, sy, S, t, { mood: t > T.too + 1.2 ? 'heart' : fx ? 'sparkle' : said ? 'wide' : 'happy', look: [-1, 0], seed: 5, hops: [...H.A, T.fx, T.fx + 0.5], blush: fx ? true : undefined })
      balloon(c, ax + 64, sy + 30, t)
      // the drafts: out of Virgo's paws and away on the breeze
      if (t > T.drop - 0.4) for (let i = 0; i < 3; i++) {
        const p = prog(t, T.drop + i * 0.25, T.drop + 2.6 + i * 0.25)
        if (p >= 1) continue
        paper(c, vx - 40 - p * (300 + i * 120) + Math.sin(p * 9 + i) * 30, sy - 10 - p * (500 + i * 60) + Math.sin(p * 5) * 40, 70, 96, p * 6 + i, { title: 'ABC'[i], rows: 3 })
      }
      // Aries' face does a fireworks thing: pixel sparkles, no bangs
      if (fx) {
        for (let i = 0; i < 6; i++) sparkles(c, t, ax + [-60, 80, 0, -110, 120, 20][i], sy - 160 - [0, 30, 90, 160, 140, 230][i], T.fx + i * 0.32, 10, 120, 10 + i, [ML_GOLD, PINK, CYAN, BONE])
        for (let i = 0; i < 5; i++) sparkles(c, t, pan + 200 + i * 170, 640 + (i % 2) * 90, T.fx + 0.4 + i * 0.45, 18, 240, 20 + i, [ML_GOLD, PINK, '#7dffb0', BONE])
        for (let i = 0; i < 4; i++) sparkles(c, t, pan + 260 + i * 200, 600 + (i % 2) * 120, T.too + 0.3 + i * 0.5, 18, 240, 30 + i, [ML_GOLD, PINK, CYAN])
      }
    })
  }

  function laneTag(t) {
    // split screen: left the café (Scorpio, napkin), right the flower stall (Libra, a little card)
    const k = ease.outCubic(prog(t, T.tag, T.tag + 0.4))
    x.save(); x.beginPath(); x.rect(0, 0, 540, 1920); x.clip(); x.translate(-430 - (1 - k) * 120, 0)
    drawCafe(x, t, { behind: c => drawSign(c, 'scorpio', CAFE.counter.x, standY(220, CAFE.counter.y), 220, t, { mood: t > 110.2 ? 'sparkle' : 'neutral', look: [0, 1], hops: [109.3, 110.3], seed: 8 }) })
    x.restore()
    x.save(); x.beginPath(); x.rect(540, 0, 540, 1920); x.clip()
    drawLane(x, t, { pan: 1890 - 810 + (1 - k) * 120 }, c => drawSign(c, 'libra', 1890, standY(220), 220, t, { mood: t > 110.2 ? 'sparkle' : 'neutral', look: [0, 1], hops: [109.5, 110.3], seed: 6 }))
    x.restore()
    R(x, 534, 0, 12, 1920, INK); R(x, 537, 0, 6, 1920, ML_GOLD)
    drawBubble(x, 300, 1340, 'tomorrow, I ask.', { size: 30, k: pop01(t, 109.3, 0.25, 2.2) })
    drawBubble(x, 800, 1500, 'tomorrow, I ask.', { size: 30, k: pop01(t, 109.5, 0.25, 2.2) })
    // Pisces, in the corner of the café, crying at the symmetry
    drawPisces(x, 120, 1300, 120, t, { tears: 3, mood: 'happy', box: false, pop: pop01(t, 110.0, 0.3, 2) })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      if (t < T.cold) drawSky(x, t, SKY_H)
      else if (t < T.walk) { if (t < T.title) coldOpen(t); else drawSky(x, t, SKY_H) }
      else if (t < T.drafts) walk(t)
      else if (t < T.cafe) drafts(t)
      else if (t < T.advice) cafe(t)
      else if (t < T.tries) advice(t)
      else if (t < T.press) tries(t)
      else if (t < T.adv + 0.7) pressure(t)
      else if (t < T.bench) drawSky(x, t, SKY_H)
      else if (t < T.tag) bench(t)
      else if (t < T.next) laneTag(t)
      else drawSky(x, t, SKY_H)
      prev.update(t); title.update(t)
      for (const c of caps) c.update(t)
      for (const b of boxes) b.update(t)
      adv.update(t); lesson.update(t); next.update(t)
      bug.update(t, title.on(t) || prev.on(t) ? 0 : outK(t, [END - 0.3, END]))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx plays only the middle one: 40.0, café → bad advice)
const CUTS = [T.cafe, T.advice, T.press]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
export const CUES = [
  ...previouslyCues(T.prev, PREV.length, 2),
  ...CAPS.flatMap(c => captionCues(c)),
  ...titleCues(T.title, 3),
  ...talkCues(LINES, { cps: 28 }),
  // cold open: the scroll unrolls
  ['whoosh', 2.6, 1.4, 0.035], ...[2.8, 3.1, 3.4, 3.7, 4.0].map(v => ['tick', v, 0.025]), ['pluck', 4.6, 659.25, 0.03, 0.5, 0.2],
  // the stroll, the drafts, the bun
  ['bell', 12.5, 1760, 0.02, 1.2, 0.3], ['pluck', 16.9, 1174.66, 0.03, 0.6, 0],
  ...[20.2, 23.0, 25.6].map((v, i) => ['pop', v, [880, 987.77, 1174.66][i], 0.04, -0.2]), ['tick', 21.0, 0.06], ['pop', 21.0, 587.33, 0.04, 0],
  ['whoosh', T.bun - 0.5, 0.4, 0.04], ['pop', T.bun, 739.99, 0.05, 0.1], ['pluck', 35.5, 1318.51, 0.03, 0.5, 0.4],
  // bad advice: spotlight clunk, choir sparkle, phone hearts
  ['tom', 40.85, 110, { gain: 0.12, decay: 0.2 }], ['glitter', 41.4, 42.4], ...Array.from({ length: 8 }, (_, i) => ['pop', r3(43.7 + i * 0.125), 1174.66 + i * 60, 0.02, 0.4]),
  // the three moments
  ['pop', T.sneezeI, 880, 0.035, -0.2], ['whoosh', T.sneeze - 0.35, 0.3, 0.03], ['pop', T.sneeze, 1567.98, 0.05, 0.3], ['glitter', T.sneeze, T.sneeze + 0.5],
  ['pop', T.busI, 880, 0.035, -0.2], ['whoosh', T.bus[0], 1.8, 0.06], ['tom', T.bus[0] + 0.5, 70, { gain: 0.18, decay: 0.6 }], ['tom', T.bus[0] + 0.9, 65, { gain: 0.16, decay: 0.6 }],
  ['pop', T.pisI, 880, 0.035, -0.2], ['tick', T.pisSob - 0.1, 0.06], ['pluck', T.pisSob, 1318.51, 0.04, 0.5, -0.4], ['pluck', T.pisSob + 0.3, 1174.66, 0.035, 0.5, -0.4], ['pluck', T.pisSob + 0.6, 987.77, 0.03, 0.5, -0.4],
  // the pressure, the yogurt, crickets, the slump
  ['riser', 61.4, T.yogurt, 0.03], ['pop', T.yogurt + 0.5, 1318.51, 0.05, 0], ['pluck', T.yogurt + 0.55, 587.33, 0.04, 0.8, 0],
  ...[0, 0.09, 0.33, 0.42].map(d => ['pluck', r3(T.crick + d), 2637, 0.012, 0.1, 0.3]), ['pop', T.cool, 987.77, 0.035, 0.3], ['whoosh', 66.4, 0.5, 0.03],
  ...adviseCues(ADVISE),
  // act 3: the drafts blow away, the sparkle fireworks, "too"
  ['whoosh', T.drop, 1.2, 0.04], ['glitter', T.fx, T.fx + 1.6], ['bell', T.fx, 1760, 0.035, 1.4, 0], ['bell', T.fx + 0.45, 2349.32, 0.025, 1.2, 0.3], ['bell', T.fx + 0.9, 1760, 0.025, 1.2, -0.3],
  ['pluck', T.too + 0.1, 1174.66, 0.045, 0.8, 0], ['glitter', T.too + 0.3, T.too + 2.2],
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: 'G' }),
  // lane tag
  ['whoosh', T.tag, 0.4, 0.04], ['pop', 109.3, 880, 0.035, -0.4], ['pop', 109.5, 880, 0.035, 0.4], ['pluck', 110.3, 1318.51, 0.035, 0.6, 0],
  ...nextTimeCues(T.next),
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
