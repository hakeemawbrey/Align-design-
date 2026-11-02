// mljealous: MOONLIGHT LANE · Ep 6 · "Jealous Moon" (120 s vertical, promo/films/STARTALK-EPISODES.md; music: jazzy · Bb)
// Leo's partner Capricorn (the Ep 1 couple, together now) laughs at Gemini's joke at the café, and a little green moon starts to hover over Leo's head.
// The green moon is the episode's picture of jealousy: a feeling, not a villain. It turns gold when Leo names the need.
//   0.0–2.0     ◀◀ PREVIOUSLY ON: "for you" (Ep 5) · a flower, back (Ep 5) · Capricorn stayed (Ep 1)
//   2.0–7.0     cold open in the café: Capricorn laughing with Gemini; Leo, at the table, very still. "Leo went | *quiet.*"
//   7.0–10.0    title card
//  10.0–20.4    Act 1: date night; Gemini's moon joke ("I'm full!"); Capricorn loves it; the green moon appears
//  20.4–30.0    too loud: "I ALSO know jokes! Knock knock!" … "…I forgot." Taurus slides over a croissant. Pisces: tears.
//  30.0–40.0    outside: "you okay?" "Totally fine!" The moon above Leo: not fine.
//  40.0–49.0    Act 2: 1 AM, Leo re-reads old messages ("HAHAHA" last week, "haha" tonight)
//  49.0–58.0    the mirror pep talk ("You are hilarious.") — the reflection rolls its eyes
//  58.0–64.0    the snap: "maybe go date Gemini, then." · "…wow. Okay."
//  64.0–70.0    low point: the longest walk home, a gap between them; Pisces weeping upstairs
//  70.0–90.0    THE STARS ADVISE (jealousy is information · name the need · ask for it kindly; never control)
//  90.0–102.2   Act 3 at Capricorn's door: sorry · "I think I wanted to feel chosen." · the moon turns gold · Capricorn: "I cleared my calendar for you."
//               "I feel chosen when you listen." · "can we plan a night that's just us?"
// 102.2–108     the rooftop, Friday (under the LESSON at 104: "*Chosen,* out loud." · chip "+1 ROOFTOP FRIDAY")
// 108.0–111.6  the lane tag: Scorpio sees Libra laughing with a customer, gets a green moon too… and buys a flower
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "Sagittarius is *moving away.*"  ·  115.6–120 end card
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  loadFonts, drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, drawPastry, drawBubble, drawPhone, sparkles, starFrame, inSprite, pop01, outK, bump, mixHex,
  BONE, INK, MONO, ML_GOLD, r3,
} from './mlkit.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const EP = 6
const MOON = { x: 860, y: 610, r: 100 }        // the series' lane moon (clear of the headlines)
const GREEN = '#8ee06a'

const who = (sign, name) => { const S = signStar(sign); return { speaker: `${S.glyph}︎ ${name}`, color: mixHex(S.color, '#ffffff', 0.35) } }
const LEO = who('leo', 'LEO'), CAP = who('capricorn', 'CAPRICORN'), GEM = who('gemini', 'GEMINI'), TAU = who('taurus', 'TAURUS')
const STARS = { speaker: 'THE STARS' }

const T = {
  prev: 0, cold: 2, title: 7, a1: 10, loud: 20.4, outside: 30, phone: 40, mirror: 49, snap: 58, walk: 64, advise: 70,
  a3: 90, roof: 102.2, lesson: 104, tag: 108, nextTime: 111.6,
  gemIn: 10.9, laugh: 15.6, moon1: 16.4,
  standUp: 20.6, forgot: 25.0, croissant: 26.6, pisSob: 25.6,
  moonGrow: 35.0,
  phoneIn: 42.4,
  eyeroll: 54.6,
  snapAt: 59.9, hurt: 60.5,
  walkGo: [64.2, 69.8],
  leoIn: [90.0, 90.9], gold: 93.9, capStep: [94.6, 95.3], hearts: 100.2,
  tagLook: 108.3, tagMoon: 108.6, tagWalk: [109.5, 110.3], tagFlower: 110.6,
}
const CUTS = [T.phone, T.advise, T.roof]       // cardfx keeps the middle one: 70.0, into THE STARS ADVISE

const BOX_Y = 1585, BOX_H = 250, CPS = 28
const LINES = {
  a1: [
    { t: 10.4, ...STARS, text: 'Leo and Capricorn. Date night at the café.' },
    { t: 13.0, ...GEM, text: '…and the *moon* says, “I’m full!”' },
    { t: 15.5, ...CAP, text: 'HA! That’s *so* good!' },
    { t: 17.3, ...STARS, text: 'Leo has *never* been this quiet.' },
  ],
  loud: [
    { t: 20.8, ...LEO, text: 'I ALSO know jokes! *Knock knock!*' },
    { t: 23.4, ...CAP, text: '…who’s there?' },
    { t: 24.9, ...LEO, text: '…I *forgot.*' },
    { t: 26.6, ...TAU, text: 'eat a croissant, sweetie.' },
  ],
  outside: [
    { t: 30.4, ...CAP, text: 'you okay? You went *quiet.*' },
    { t: 32.8, ...LEO, text: 'me? *Totally* fine!' },
    { t: 35.2, ...STARS, text: 'the moon above Leo: *not* fine.' },
  ],
  phone: [
    { t: 43.0, ...LEO, text: 'last week: “HAHAHA.” Tonight: “*haha.*”' },
    { t: 46.0, ...STARS, text: 'Leo. It’s *one* message.' },
  ],
  mirror: [
    { t: 49.5, ...LEO, text: 'you are funny. You are *hilarious.*' },
    { t: 52.2, ...LEO, text: 'why did the star cross the… *sky?*' },
    { t: 55.0, ...STARS, text: 'even the mirror is *tired.*' },
  ],
  snap: [
    { t: 58.3, ...CAP, text: 'Gemini’s moon joke was *so*—' },
    { t: 59.9, ...LEO, text: 'maybe go date *Gemini,* then.' },
    { t: 61.8, ...CAP, text: '…wow. Okay.' },
  ],
  walk: [
    { t: 66.4, ...STARS, text: 'Leo snapped. And Leo *knows* it.' },
  ],
  a3: [
    { t: 90.3, ...LEO, text: 'sorry I snapped. That wasn’t *fair.*' },
    { t: 92.4, ...LEO, text: 'I think I wanted to feel *chosen.*' },
    { t: 95.0, ...CAP, text: 'I cleared my calendar for *you.*' },
    { t: 97.0, ...CAP, text: 'and I feel chosen when you *listen.*' },
    { t: 99.3, ...LEO, text: 'can we plan a night that’s just *us?*' },
  ],
}
const BOXES = {
  a1: { open: 10.2, close: 20.25 }, loud: { open: 20.6, close: 29.85 }, outside: { open: 30.2, close: 39.6 },
  phone: { open: 42.8, close: 48.85 }, mirror: { open: 49.3, close: 57.85 }, snap: { open: 58.1, close: 63.85 },
  walk: { open: 66.2, close: 69.6 }, a3: { open: 90.1, close: 102.05 },
}
const ALL_LINES = Object.values(LINES).flat()

const CAPS = [
  { text: 'Leo went | *quiet.*', at: 2.15, out: [6.6, 6.9], kicker: 'THE CAFÉ · 9:05 PM' },
  { text: 'The *spiral.*', at: 40.2, out: [42.1, 42.4], kicker: "LEO'S PLACE · 1:14 AM" },
  { text: 'The *longest* | walk home.', at: 64.2, out: [68.9, 69.3], kicker: '10:40 PM' },
  { text: 'Friday. | *Rooftop.*', at: 102.35, out: [103.7, 104.0], kicker: 'THE ROOFTOP' },
  { text: 'Oh. *Same.*', at: 108.25, out: [111.1, 111.45], kicker: 'THE FLOWER STALL' },
]

const ADVISE = {
  at: T.advise, out: [89.5, 89.95],
  cards: [
    { at: 71.0, icon: 'moon', head: 'Jealousy is *information.*', body: 'It points at a need, not a crime. Get curious about it.' },
    { at: 76.8, icon: 'heart', head: 'Name the *need.*', body: 'Try: “I think I wanted to feel chosen tonight.”' },
    { at: 82.6, icon: 'chat', head: 'Ask for it *kindly.*', body: '“Can we plan a night that’s just us?” Never control who they talk to.' },
  ],
  lines: [
    { t: 71.4, text: 'Leo, this one’s *yours.*' },
    { t: 77.3, text: 'the feeling is okay. Snapping *isn’t.*' },
    { t: 83.2, text: 'ask for the night. Not the *rules.*' },
  ],
}
const LESSON = { at: T.lesson, out: [107.6, 107.9], text: '*Chosen,* out loud.', chip: '+1 ROOFTOP FRIDAY' }

// ═══════════════════════════════════════ helpers ═══════════════════════════════════════
const walkX = (t, [a, b], x0, x1) => lerp(x0, x1, ease.inOutQuad(prog(t, a, b)))
const steps = ([a, b], dt = 0.3) => { const o = []; for (let s = a; s < b - 0.05; s += dt) o.push(r3(s)); return o }
const SEED = { libra: 3, scorpio: 7, taurus: 9, gemini: 4, aquarius: 11, capricorn: 10, leo: 5, pisces: 12, sagittarius: 8 }
function cast(c, sign, x, feet, size, t, o = {}) {
  const y = standY(size, feet), opts = { seed: SEED[sign] ?? 1, ...o }
  drawSign(c, sign, x, y, size, t, opts)
  const F = starFrame(x, y, size, t, opts)
  return { F, x, y, size, top: F.cy - size * 0.62 }
}
function R(c, x, y, w, h, col) { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
const hopsOf = (key, sp) => talkHops(LINES[key], sp.speaker, { cps: CPS })

// the jealous moon: a little pixel crescent with a sulky eye (green), or a happy one (gold)
const JM = ['...KKKK...', '..KGGGGK..', '.KGGGGK...', 'KGGGGK....', 'KGXGGK....', 'KGGGGK....', 'KGGGGGK...', '.KGGGGGKKK', '..KGGGGGGK', '...KKKKKK.']
function drawJealousMoon(c, x, y, cell, t, { k = 1, gold = 0, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  const col = mixHex(GREEN, ML_GOLD, gold), wob = Math.sin(t * 2.4) * cell * 0.6
  c.save(); c.globalAlpha *= alpha; c.translate(Math.round(x), Math.round(y + wob)); c.scale(k, k)
  const g = c.createRadialGradient(0, 0, 0, 0, 0, cell * 9); g.addColorStop(0, `rgba(${gold > 0.5 ? '255,207,110' : '142,224,106'},0.35)`); g.addColorStop(1, 'rgba(0,0,0,0)')
  c.fillStyle = g; c.fillRect(-cell * 9, -cell * 9, cell * 18, cell * 18)
  c.translate(-5 * cell, -5 * cell); c.scale(cell, cell)
  const pal = { K: INK, G: col, X: gold > 0.5 ? col : INK }
  JM.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const p = pal[row[i]]; if (p) { c.fillStyle = p; c.fillRect(i, j, 1.02, 1.02) } } })
  if (gold > 0.5) { c.fillStyle = INK; c.fillRect(2, 4, 1, 0.6); c.fillRect(3, 3.6, 1, 0.6) }   // a happy closed eye
  c.restore()
}
/** a floor mirror (frame + glass); inner(ctx) paints the reflection, clipped to the glass */
function drawMirror(c, x0, y0, w, h, inner) {
  R(c, x0 - 18, y0 - 18, w + 36, h + 36, INK); R(c, x0 - 12, y0 - 12, w + 24, h + 24, ML_GOLD)
  const g = c.createLinearGradient(x0, y0, x0 + w, y0 + h); g.addColorStop(0, '#3a4a7a'); g.addColorStop(1, '#5a6aa0')
  c.fillStyle = g; c.fillRect(x0, y0, w, h)
  c.save(); c.beginPath(); c.rect(x0, y0, w, h); c.clip(); inner(c)
  c.fillStyle = 'rgba(220,235,255,0.16)'; c.beginPath(); c.moveTo(x0 + 20, y0); c.lineTo(x0 + 90, y0); c.lineTo(x0 + 20, y0 + 160); c.closePath(); c.fill()
  c.restore()
  R(c, x0 + w / 2 - 70, y0 + h + 18, 140, 14, INK); R(c, x0 + 20, y0 + h + 18, 14, 60, INK); R(c, x0 + w - 34, y0 + h + 18, 14, 60, INK)
}
function shout(c, t, t0, text, x, y, rot, col = '#ffd36e', size = 64, life = 1.6) {
  const k = pop01(t, t0, 0.2, 2.8) * outK(t, [t0 + life, t0 + life + 0.25])
  if (k <= 0.01) return
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(k, k)
  c.font = `800 ${size}px Inter, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'
  c.lineWidth = size * 0.18; c.strokeStyle = INK; c.strokeText(text, 0, 0); c.fillStyle = col; c.fillText(text, 0, 0)
  c.restore()
}
function hearts(c, t, x, y, t0, n = 5) {
  for (let i = 0; i < n; i++) {
    const p = prog(t, t0 + i * 0.18, t0 + i * 0.18 + 1.6)
    if (p <= 0 || p >= 1) continue
    c.save(); c.globalAlpha = Math.sin(Math.PI * p); c.translate(x + Math.sin(p * 7 + i) * 30 + (i - n / 2) * 26, y - p * 220); c.scale(5, 5)
    const H = ['.KK.KK.', 'KPPKPPK', 'KPPPPPK', '.KPPPK.', '..KPK..', '...K...']
    H.forEach((row, j) => { for (let q = 0; q < row.length; q++) { const col = row[q] === 'K' ? INK : row[q] === 'P' ? '#ff6b9a' : null; if (col) { c.fillStyle = col; c.fillRect(q - 3.5, j - 3, 1.02, 1.02) } } })
    c.restore()
  }
}

// ═══════════════════════════════════════ build ═══════════════════════════════════════
async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, c))
  const boxes = Object.entries(LINES).map(([k, lines]) => dialogueBox(root, { lines, y: BOX_Y, height: BOX_H, size: 46, cps: CPS, ...BOXES[k] }))
  const adv = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: '#ffb36e', dim: 0.62 })
  const next = buildNextTime(root, { at: T.nextTime, out: [115.2, 115.55], teaser: 'Sagittarius is *moving away.*' })
  const title = buildTitle(root, { ep: EP, title: 'Jealous Moon', at: T.title, len: 3 })
  const bagStill = (c, flower) => {
    c.save(); c.translate(540, 1000); c.scale(4, 4)
    if (flower) { R(c, 12, -80, 4, 40, '#3f8a5a'); R(c, 2, -92, 24, 20, INK); R(c, 4, -90, 20, 16, '#ff8fb1'); R(c, 10, -86, 8, 8, ML_GOLD) }
    R(c, -34, -44, 68, 92, INK); R(c, -30, -40, 60, 84, '#c9955a'); R(c, -30, -40, 60, 14, '#a8743e')
    if (!flower) { c.fillStyle = '#2a1430'; c.font = "italic 600 20px 'EB Garamond', serif"; c.textAlign = 'center'; c.fillText('for you', 0, 14) }
    c.restore()
  }
  const prev = buildPreviously(root, { at: T.prev, len: 2, stills: [
    { caption: '“for you.”', scene: c => { drawLane(c, 5, { moon: MOON, pan: 1080 }); bagStill(c, false) }, crop: [140, 560, 800, 945] },
    { caption: 'A flower, back.', scene: c => { drawCafe(c, 5, { view: 'late' }); bagStill(c, true); drawSign(c, 'scorpio', 300, standY(220, 1200), 220, 5, { seed: 7, mood: 'heart' }) }, crop: [100, 560, 800, 945] },
    { caption: 'Capricorn stayed.', scene: c => { drawCafe(c, 3, { chairsUp: 1 }); drawSign(c, 'leo', 330, standY(240, 1400), 240, 3, { seed: 5, mood: 'happy' }); drawSign(c, 'capricorn', 750, standY(240, 1400), 240, 3, { seed: 10, mood: 'happy' }); drawCafeTable(c, 3, { cups: 2, pastry: null }) }, crop: [60, 820, 960, 1130] },
  ] })
  const bug = showBug(root, EP)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── the café date (cold open + Act 1 + too loud)
  function cafeDate(t) {
    const loud = t >= T.loud && t < T.outside
    drawCafe(x, t, { behind: c => cast(c, 'taurus', 700, CAFE.counter.y, 210, t, { mood: t > T.croissant ? 'happy' : t > T.forgot ? 'squint' : 'neutral', look: [-1, 0.5], hops: hopsOf('loud', TAU) }) })
    // Pisces at the back table, overcome by all of it
    drawPisces(x, 165, standY(140, 1250), 140, t, { tears: t > T.pisSob ? 3 : t < 7 ? 2 : 1, box: true, pull: bump(t, T.pisSob, 0.6), look: [1, 0.5] })
    // Gemini at the counter, telling the moon joke
    const gk = t < T.cold + 4.9 ? 1 : pop01(t, T.gemIn, 0.35, 2)
    if (t < T.cold + 5 || t >= T.gemIn) cast(x, 'gemini', 960, 1250, 170, t, { mood: t > T.laugh && t < T.loud ? 'happy' : 'sparkle', look: [-1, 0], pop: gk, hops: [...hopsOf('a1', GEM), T.laugh, 4.2, 5.0] })
    // the table: Leo (left), Capricorn (right)
    const leoMood = loud ? (t > T.forgot ? 'wide' : 'sparkle') : t < 7 ? 'neutral' : t > T.laugh ? 'neutral' : 'happy'
    const leoUp = loud ? ease.outBack(prog(t, T.standUp, T.standUp + 0.35)) * (1 - ease.inOutQuad(prog(t, T.forgot + 0.6, T.forgot + 1.2))) : 0
    const L0 = cast(x, 'leo', CAFE.seats[0].x, CAFE.seats[0].y - leoUp * 150, 230, t, { mood: leoMood, look: loud ? [0, -0.5] : [1, 0], hops: loud ? [...hopsOf('loud', LEO), T.standUp] : [], squash: t > T.forgot && t < T.forgot + 0.6 ? 0.08 : 0 })
    const capLaugh = (t > 3.0 && t < 6.8) || (t > T.laugh && t < T.loud)
    cast(x, 'capricorn', CAFE.seats[1].x, CAFE.seats[1].y, 230, t, { mood: capLaugh ? 'happy' : loud && t > T.forgot ? 'wide' : 'neutral', look: capLaugh ? [1, -0.2] : [-1, 0], hops: [...hopsOf('a1', CAP), ...hopsOf('loud', CAP), T.laugh + 0.3, T.laugh + 0.6, 3.4, 3.8] })
    drawCafeTable(x, t, { cups: 2, pastry: t > T.croissant + 0.3 ? 'croissant' : null })
    // the green moon over Leo
    const mk = t < 7 ? pop01(t, 4.0, 0.4, 2) : pop01(t, T.moon1, 0.4, 2)
    drawJealousMoon(x, L0.x + 10, L0.top - 90, t < 7 ? 9 : loud ? 12 : 10, t, { k: mk })
    if (capLaugh) shout(x, t, t < 7 ? 3.0 : T.laugh, 'HA HA!', 830, 1060, 0.08, '#7dffb0', 52, t < 7 ? 3.5 : 3.6)
    if (loud) { shout(x, t, 21.0, 'KNOCK', 300, 700, -0.12, '#ffd36e', 60, 1.4); shout(x, t, 21.5, 'KNOCK!', 420, 610, 0.1, '#ffd36e', 64, 1.2) }
    // Taurus' croissant slides across
    const cp = ease.outCubic(prog(t, T.croissant, T.croissant + 0.35))
    if (t > T.croissant && cp < 1) drawPastry(x, lerp(1000, 540, cp), lerp(1240, 1310, cp), 4, 'croissant')
    if (t > T.pisSob && loud) drawBubble(x, 165, 920, '*sniff*', { k: pop01(t, T.pisSob + 0.1, 0.25, 2.2), size: 24 })
  }
  function outside(t) {
    drawLane(x, t, { moon: MOON, pan: 560 }, c => {
      const L0 = cast(c, 'leo', 1000, LANE.feet, 220, t, { mood: t > 32.6 && t < 34.6 ? 'sparkle' : 'neutral', look: [1, -0.3], hops: hopsOf('outside', LEO) })
      cast(c, 'capricorn', 1260, LANE.feet, 210, t, { mood: 'neutral', look: [-1, 0], hops: hopsOf('outside', CAP) })
      const grow = 1 + 0.6 * ease.outBack(prog(t, T.moonGrow, T.moonGrow + 0.5))
      drawJealousMoon(c, L0.x + 10, L0.top - 90 - (grow - 1) * 80, 11 * grow, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 2, look: [1, 1] })
    })
  }
  function phone(t) {
    drawApartment(x, t, { time: 'late', lamp: 0.6 })
    const L0 = cast(x, 'leo', 330, APT.couch.seatY, 230, t, { mood: t > 43.8 ? 'wide' : 'neutral', look: [1, -1], hops: hopsOf('phone', LEO), squash: 0.05 * bump(t, 47.4, 0.8) })
    drawJealousMoon(x, L0.x, L0.top - 90, 11, t)
    const pk = pop01(t, T.phoneIn, 0.4, 1.8)
    if (pk > 0.01) {
      x.save(); x.translate(720, 760); x.scale(pk, pk); x.translate(-720, -760)
      drawPhone(x, 720, 760, 520, 780, t, { title: `${signStar('capricorn').glyph}︎ my Capricorn`, msgs: [
        { at: 0, side: 'L', text: 'LAST WEEK' }, { at: 0, side: 'R', text: 'and then the cat sat on the cake' }, { at: 0, side: 'L', text: 'HAHAHA' },
        { at: 44.2, side: 'L', text: 'TONIGHT' }, { at: 44.5, side: 'R', text: 'had fun tonight!' }, { at: 44.9, side: 'L', text: 'haha' },
      ] })
      x.restore()
      if (t > 45.0) { const zk = pop01(t, 45.0, 0.3, 2); x.save(); x.strokeStyle = '#e8566e'; x.lineWidth = 8; x.globalAlpha = zk; x.beginPath(); x.ellipse(565, 1043, 90 * zk, 44 * zk, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
    }
  }
  function mirror(t) {
    drawApartment(x, t, { time: 'late', lamp: 0.8 })
    const MX = 110, MY = 560, MW = 360, MH = 760
    const roll = t > T.eyeroll && t < 57.4
    drawMirror(x, MX, MY, MW, MH, c => {
      // the reflection: same Leo, facing back… mostly
      cast(c, 'leo', MX + MW / 2, MY + MH - 30, 230, t, { mood: roll ? 'eyeroll' : t > 49.4 ? 'sparkle' : 'neutral', look: roll ? undefined : [1, 0], hops: roll ? [] : [...hopsOf('mirror', LEO)] })
    })
    const L0 = cast(x, 'leo', 760, 1470, 260, t, { mood: t > T.eyeroll + 0.3 && t < 57.6 ? 'wide' : 'sparkle', look: [-1, 0], hops: hopsOf('mirror', LEO) })
    drawJealousMoon(x, L0.x + 20, L0.top - 90, 11, t)
    if (t > 52.2 && t < 54.6) shout(x, t, 53.4, 'ba-dum… tss?', 760, 820, -0.06, BONE, 46, 1.0)
  }
  function snap(t) {
    drawLane(x, t, { moon: MOON, pan: 500 }, c => {
      const L0 = cast(c, 'leo', 1120, LANE.feet, 220, t, { mood: t > T.snapAt + 1.3 ? 'neutral' : t > T.snapAt ? 'squint' : 'neutral', look: t > 61.8 ? [0, 1] : [-1, 0], hops: [...hopsOf('snap', LEO), T.snapAt] })
      cast(c, 'capricorn', 880, LANE.feet, 210, t, { mood: t > T.hurt ? 'wide' : 'happy', look: t > 61.6 ? [-1, 0.5] : [1, 0], hops: hopsOf('snap', CAP) })
      drawJealousMoon(c, L0.x + 10, L0.top - 80, t > T.snapAt ? 15 : 12, t)
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: t > T.hurt ? 3 : 1, mood: 'wide', look: [1, 1] })
    })
    if (t > T.snapAt && t < T.snapAt + 0.25) { x.fillStyle = 'rgba(142,224,106,0.18)'; x.fillRect(0, 0, 1080, 1920) }
  }
  function walk(t) {
    const pan = lerp(560, 120, ease.inOutQuad(prog(t, ...T.walkGo)))
    drawLane(x, t, { moon: MOON, time: 'late', pan, lit: ['a4', 'pisces', 'c2', 'd6'] }, c => {
      const ax = walkX(t, T.walkGo, 980, 430), lx = walkX(t, T.walkGo, 1380, 820)
      cast(c, 'capricorn', ax, LANE.feet, 200, t, { mood: 'neutral', look: [-1, 0.6], hops: steps(T.walkGo, 0.42) })
      const L0 = cast(c, 'leo', lx, LANE.feet, 210, t, { mood: 'neutral', look: [-1, 1], hops: steps([T.walkGo[0] + 0.2, T.walkGo[1]], 0.42) })
      drawJealousMoon(c, L0.x + 10, L0.top - 90, 12, t, { alpha: 0.85 })
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 3, pull: bump(t, 66.0, 0.6) + bump(t, 68.2, 0.6), mood: 'wide', look: [1, 1] })
      // * crickets *
      if (t > 65.2 && t < 66.4) { c.save(); c.globalAlpha = Math.sin(Math.PI * prog(t, 65.2, 66.4)); c.font = `700 30px ${MONO}`; c.fillStyle = '#9fe6b0'; c.textAlign = 'center'; c.fillText('* chirp *', (ax + lx) / 2, 1250); c.restore() }
    })
  }
  function door(t) {
    drawLane(x, t, { moon: MOON, pan: 0 }, c => {
      const lx = walkX(t, T.leoIn, 900, 690)
      const gold = ease.inOutQuad(prog(t, T.gold, T.gold + 0.5))
      const L0 = cast(c, 'leo', lx, LANE.feet, 230, t, { mood: t > T.hearts ? 'heart' : t > 95.2 ? 'happy' : t > 92.3 ? 'neutral' : 'squint', look: [-1, 0], blush: t > 95.2 ? 0.9 : 0, hops: [...steps(T.leoIn, 0.3), ...hopsOf('a3', LEO), T.gold, T.hearts] })
      const ax = walkX(t, T.capStep, 430, 500)
      cast(c, 'capricorn', ax, LANE.feet, 215, t, { mood: t > T.hearts ? 'heart' : t > 94.8 ? 'happy' : 'neutral', look: [1, 0], blush: t > 94.8 ? 0.9 : 0, hops: [...hopsOf('a3', CAP), T.hearts + 0.1] })
      // the green moon: shrinks and turns gold when Leo names it, then floats off like a little lantern
      const up = ease.inQuad(prog(t, 97.0, 100.0))
      drawJealousMoon(c, L0.x + 10, L0.top - 90 - up * 500, 12 * (1 - 0.35 * gold), t, { gold, alpha: 1 - prog(t, 99.4, 100.0) })
      if (t > T.gold) sparkles(c, t, L0.x + 10, L0.top - 80, T.gold, 10, 120, 5, [ML_GOLD, BONE])
      hearts(c, t, (lx + ax) / 2, L0.top - 30, T.hearts)
    })
  }
  function rooftop(t) {
    drawLane(x, t, { moon: MOON, pan: 860, zoom: 1.6, focus: [540, 900] }, c => {
      cast(c, 'leo', 1330, LANE.roof.y, 150, t, { mood: 'happy', look: [1, 0], blush: 0.8, hops: [102.6, 105.4] })
      cast(c, 'capricorn', 1460, LANE.roof.y, 145, t, { mood: t > 105 ? 'heart' : 'happy', look: [-1, 0], blush: 0.8, hops: [102.8, 105.6] })
      drawJealousMoon(c, 1395, 700, 4, t, { gold: 1 })
    })
  }
  function tag(t) {
    drawLane(x, t, { moon: MOON, pan: 1040 }, c => {
      const sagOut = ease.inQuad(prog(t, 109.6, 110.4))
      cast(c, 'sagittarius', 1730 - sagOut * 500, LANE.feet, 180, t, { mood: 'happy', look: [1, 0], alpha: 1 - sagOut, hops: [108.4, 108.9] })
      cast(c, 'libra', 1960, LANE.feet, 200, t, { mood: 'happy', look: t > T.tagWalk[1] ? [-1, 0] : [-1, 0.2], blush: t > T.tagFlower ? 0.9 : 0, hops: [108.4, 108.9, T.tagFlower] })
      const sx = walkX(t, T.tagWalk, 1420, 1680)
      const S0 = cast(c, 'scorpio', sx, LANE.feet, 190, t, { mood: t > T.tagFlower ? 'happy' : t > T.tagMoon ? 'squint' : 'neutral', look: [1, 0], blush: t > T.tagFlower ? 0.9 : 0, hops: [T.tagMoon, ...steps(T.tagWalk, 0.25), T.tagFlower] })
      drawJealousMoon(c, S0.x, S0.top - 70, 10, t, { k: pop01(t, T.tagMoon, 0.35, 2) * outK(t, [T.tagWalk[0], T.tagWalk[0] + 0.3]) })
      if (t < 109.5) shout(c, t, 108.4, 'HA HA!', 1830, 1030, 0.08, '#ffd36e', 44, 1.0)
      drawBubble(c, sx, S0.top - 50, 'one flower, please.', { k: pop01(t, 110.0, 0.25, 2.2) * outK(t, [111.2, 111.45]), size: 26 })
      if (t > T.tagFlower) {
        c.save(); c.translate(sx - 95, S0.y + 20); const fk = pop01(t, T.tagFlower, 0.3, 2.4); c.scale(fk * 1.6, fk * 1.6)
        R(c, -2, -10, 4, 44, '#3f8a5a'); R(c, -12, -30, 24, 22, INK); R(c, -10, -28, 20, 18, '#ff8fb1'); R(c, -4, -22, 8, 6, ML_GOLD)
        c.restore()
        sparkles(c, t, sx - 95, S0.y - 10, T.tagFlower, 8, 90, 3, ['#ff8fb1', ML_GOLD, BONE])
      }
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.cold) drawSky(x, t, SKY_H)
      else if (t < T.title) cafeDate(t)
      else if (t < T.a1) drawSky(x, t, SKY_H)
      else if (t < T.outside) cafeDate(t)
      else if (t < T.phone) outside(t)
      else if (t < T.mirror) phone(t)
      else if (t < T.snap) mirror(t)
      else if (t < T.walk) snap(t)
      else if (t < T.advise) walk(t)
      else if (t < T.a3) { if (t < T.advise + 0.7) walk(t); else drawSky(x, t, SKY_H) }
      else if (t < T.roof) door(t)
      else if (t < T.tag) rooftop(t)
      else if (t < T.nextTime) tag(t)
      else drawSky(x, t, SKY_H)
      for (const c of caps) c.update(t)
      for (const b of boxes) b.update(t)
      adv.update(t); lesson.update(t); next.update(t); title.update(t); prev.update(t)
      bug.update(t, title.on(t) || prev.on(t) || t >= STORY_END ? 0 : 1)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const footsteps = (st, gain = 0.013) => st.map((s, i) => ['tick', s, gain * (i % 2 ? 0.8 : 1)])
export const CUES = [
  ...previouslyCues(T.prev, 3, 2),
  ...titleCues(T.title, 3),
  ...CAPS.flatMap(c => captionCues(c)),
  ...talkCues(ALL_LINES, { cps: CPS }),
  // cold open: the laugh, the green moon
  ['pop', 3.0, 987.77, 0.03, 0.3], ['pop', 3.15, 1174.66, 0.025, 0.3], ['pluck', 4.0, 392, 0.03, 0.6, -0.3],
  // act 1: Gemini, the joke, the laugh, the moon
  ['pop', T.gemIn, 880, 0.03, 0.4], ['bell', 14.4, 1760, 0.02, 0.8, 0.3],
  ['pop', T.laugh, 987.77, 0.035, 0.3], ['pop', T.laugh + 0.15, 1174.66, 0.03, 0.3], ['pop', T.laugh + 0.3, 1318.51, 0.025, 0.3],
  ['pluck', T.moon1, 392, 0.04, 0.8, -0.3], ['pluck', T.moon1 + 0.12, 369.99, 0.035, 0.8, -0.3],
  // too loud
  ['whoosh', T.standUp, 0.3, 0.035], ['tom', 21.0, 160, { gain: 0.16, decay: 0.2 }], ['tom', 21.5, 160, { gain: 0.18, decay: 0.2 }],
  ['pluck', T.forgot + 0.6, 330, 0.035, 0.5, 0], ['pluck', T.forgot + 0.8, 311.13, 0.035, 0.6, 0],
  ['whoosh', T.croissant, 0.3, 0.03], ['tick', T.croissant + 0.35, 0.04], ['pop', T.pisSob, 739.99, 0.025, -0.4],
  // outside: the moon grows
  ['pluck', T.moonGrow, 392, 0.045, 0.8, -0.2], ['riser', T.moonGrow - 0.3, T.moonGrow + 0.4, 0.02],
  // phone
  ['whoosh', T.phoneIn, 0.35, 0.035], ['pop', 44.2, 880, 0.03, 0], ['pop', 44.5, 987.77, 0.03, 0.2], ['pop', 44.9, 659.25, 0.035, -0.2], ['tick', 45.0, 0.05],
  // mirror: rimshot that doesn't land, the eyeroll
  ['tom', 53.4, 180, { gain: 0.14, decay: 0.15 }], ['tom', 53.6, 140, { gain: 0.14, decay: 0.15 }], ['tick', 53.85, 0.05],
  ['pluck', T.eyeroll, 523.25, 0.03, 0.5, -0.3], ['pluck', T.eyeroll + 0.2, 392, 0.03, 0.6, -0.3],
  // the snap
  ['boom', T.snapAt, 0.1], ['pluck', T.hurt, 311.13, 0.035, 0.8, 0],
  // walk home: footsteps + crickets
  ...footsteps(steps(T.walkGo, 0.42)),
  ['pluck', 65.3, 2637, 0.012, 0.1, 0.3], ['pluck', 65.39, 2637, 0.012, 0.1, 0.3], ['pluck', 65.63, 2637, 0.012, 0.1, 0.3], ['pluck', 65.72, 2637, 0.012, 0.1, 0.3],
  ...adviseCues(ADVISE),
  // act 3: the moon turns gold, hearts
  ...footsteps(steps(T.leoIn, 0.3)),
  ['bell', T.gold, 1760, 0.035, 1.4, 0], ['glitter', T.gold, T.gold + 0.6], ['pop', T.gold + 0.05, 1174.66, 0.04, 0],
  ['pop', T.hearts, 1174.66, 0.04, 0], ['pluck', T.hearts + 0.1, 1567.98, 0.035, 0.6, 0], ['glitter', T.hearts, T.hearts + 0.8],
  ['whoosh', T.roof, 0.4, 0.03],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Bb' }),
  // the tag
  ['pop', 108.4, 987.77, 0.03, 0.3], ['pluck', T.tagMoon, 392, 0.035, 0.6, -0.2], ...footsteps(steps(T.tagWalk, 0.25)),
  ['pop', T.tagFlower, 1318.51, 0.045, 0.2], ['glitter', T.tagFlower, T.tagFlower + 0.5],
  ...nextTimeCues(T.nextTime),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
