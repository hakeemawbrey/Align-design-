// mlfight: MOONLIGHT LANE, Ep 4 "The First Fight" (120 s vertical, STARTALK-EPISODES.md, music: cinematic · F).
// Taurus wants a cosy night in; Gemini already said yes to three parties. Story 0–115.6, then the end card.
//     0.0–2.0   ◀◀ PREVIOUSLY ON… (Sag dealt dessert · Rule four: broken · Libra sat down, by accident)
//     2.0–7.0   cold open, the apartment: "Cosy night in? | *Three parties.*"  Taurus: "blanket fort tonight?"
//               Gemini (at the door, sparkling): "I said yes to THREE parties."
//     7.0–10.0  title card.
//    10.0–22.0  Act 1a: Taurus builds the perfect night (blanket, soup, a candle, the good bread).
//    22.0–31.0  Act 1b, the lane: Gemini collects three invitations, each stamped YES.
//    31.0–40.0  Act 1c: Gemini bursts in. "tonight? I made soup." / "tonight? I made *plans.*"
//    40.0       card cut.
//    40.0–70.0  Act 2: the last slice of the good bread (cinematic zoom, "was that… the good bread?"), a point-scoring
//               spiral (scorecards tick 1–1, 2–2, 3–3, both "winning"; Leo texts bad advice), then the low point:
//               opposite ends of the couch, the soup goes cold, the clock ticks.
//    70.0–89.8  THE STARS ADVISE: Fight the problem · Say the need under it · Find the both (tonight's move).
//    90.0–104   Act 3: the need under it, said out loud; the plan on a napkin (PARTY #1 · 1 HR → SOUP + COUCH);
//               a Push / Pull / Align reading together lands on ALIGN. "*Us* vs the problem."
//   104–108     LESSON UNLOCKED: "Fight the problem, | not the *person.*"  +1 SOUP AFTER THE PARTY
//   108–111.6   lane tag: Scorpio leaves a tiny loaf with a note at the flower stall; Libra can't tell who it's from.
//   111.6–115.6 NEXT TIME: "Libra gets a *mystery* note."
// One canvas (sets + stars), DOM type, dialogue boxes, the kit's show pieces, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  loadFonts, drawLane, LANE, standY, drawSign, drawPisces, drawApartment, APT, drawCafe, CAFE, drawPastry, drawIcon,
  drawBubble, drawPhone, sparkles, showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues,
  buildAdvise, adviseCues, buildNextTime, nextTimeCues, ML_GOLD, BONE, INK, PINK, CYAN, MINT, INTER, MONO, SERIF, pop01, outK, r3,
} from './mlkit.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN          // 115.6
const G = s => signStar(s).glyph + '︎'
const SP = { taurus: `${G('taurus')} TAURUS`, gemini: `${G('gemini')} GEMINI`, stars: 'THE STARS' }
const COL = { taurus: '#9fe6b0', gemini: '#ffe27a' }

// ── the timeline
const T = {
  prev: 0, cold: 2.0, title: 7.0, a1: 10.0, a1b: 22.0, a1c: 31.0, a2: 40.0, a2b: 49.6, a2c: 59.6, adv: 70.0,
  a3: 90.0, a3b: 97.4, lesson: 104.0, tag: 108.0, next: 111.6,
  tQ: 3.7, gX: 5.0,
  props: [10.9, 12.0, 13.1, 14.2],                 // blanket, soup, candle, the good bread
  invites: [24.0, 25.3, 26.6], stamps: [24.45, 25.75, 27.05],
  burst: 31.4,
  grab: 41.2, bite: 42.2, gasp: 43.9, zoom: [43.9, 44.5], zoomOut: [48.7, 49.4],
  score: [51.6, 53.6, 55.4, 57.2], leoText: 57.9,
  apart: [59.6, 60.4], cold0: 62.0, ticks: 63.0,
  napkin: [98.2, 98.6], draw: [98.8, 101.0], reading: [101.0, 101.3], spin: [101.4, 102.9], align: 102.95,
  scoIn: [108.2, 108.9], scoOut: [109.4, 110.0], libIn: 109.9,
}
const CPS = 28

// ── the dialogue (each block = one box; every line ≤ ~46 chars and holds ≥ 1.5 s after it finishes typing)
const L1A = [
  { t: 10.6, speaker: SP.stars, text: 'Taurus has planned the *perfect* night.' },
  { t: 13.9, speaker: SP.taurus, color: COL.taurus, text: 'soup. blanket. the good bread. *you.*' },
  { t: 17.6, speaker: SP.stars, text: 'one small detail: it is *Friday.*' },
]
const L1B = [
  { t: 22.4, speaker: SP.stars, text: 'meanwhile, Gemini got *invited.*' },
  { t: 27.45, speaker: SP.gemini, color: COL.gemini, text: "rooftop! Leo's! Aquarius's! *yes!*" },
]
const L1C = [
  { t: 32.0, speaker: SP.taurus, color: COL.taurus, text: 'tonight? I made *soup.*' },
  { t: 34.6, speaker: SP.gemini, color: COL.gemini, text: 'tonight? I made *plans.*' },
  { t: 37.2, speaker: SP.stars, text: 'two plans. *uh-oh.*' },
]
const L2 = [
  { t: 44.2, speaker: SP.taurus, color: COL.taurus, text: 'was that… the *good* bread?' },
  { t: 46.9, speaker: SP.gemini, color: COL.gemini, text: "it's *just* bread." },
  { t: 50.0, speaker: SP.taurus, color: COL.taurus, text: 'you ALWAYS eat the *last* slice.' },
  { t: 53.0, speaker: SP.gemini, color: COL.gemini, text: 'you ALWAYS say no to *fun.*' },
  { t: 56.0, speaker: SP.stars, text: 'both of them winning. neither *happy.*' },
  { t: 60.4, speaker: SP.stars, text: 'the couch has never been this *long.*' },
  { t: 64.3, speaker: SP.taurus, color: COL.taurus, text: '…' },
  { t: 66.0, speaker: SP.gemini, color: COL.gemini, text: "…*the soup's cold.*" },
]
const ADV_LINES = [
  { t: 70.85, text: "Taurus. Gemini. this one's *yours.*" },
  { t: 74.0, text: "a fight about bread isn't about *bread.*" },
  { t: 77.5, text: 'try: "I miss quiet time with *you.*"' },
  { t: 80.5, text: 'and: "I want you to meet my *people.*"' },
  { t: 83.5, text: 'now find the plan with *both* in it.' },
  { t: 86.3, text: 'you two vs the problem. *always.*' },
]
const ADV_CARDS = [
  { at: 71.3, icon: 'heart', head: 'Fight the *problem.*', body: "Not the person. It's “us vs the plan,” not “me vs you.”" },
  { at: 77.3, icon: 'chat', head: 'Say the need *under it.*', body: '“I miss quiet time with you.” “I want you to meet my people.”' },
  { at: 83.3, icon: 'check', head: 'Find the *both.*', body: 'One party, then home. Two needs, one night.' },
]
const L3 = [
  { t: 90.6, speaker: SP.taurus, color: COL.taurus, text: 'I miss quiet time with *you.*' },
  { t: 93.1, speaker: SP.gemini, color: COL.gemini, text: 'I want you to meet my *people.*' },
  { t: 95.7, speaker: SP.gemini, color: COL.gemini, text: 'one party. one hour. then *soup?*' },
  { t: 98.8, speaker: SP.taurus, color: COL.taurus, text: "deal. I'll guard the *good bread.*" },
]
const BOXES = [
  { lines: L1A, open: 10.4, close: 21.8 }, { lines: L1B, open: 22.2, close: 30.8 }, { lines: L1C, open: 31.8, close: 39.85 },
  { lines: L2, open: 44.1, close: 69.6 }, { lines: L3, open: 90.4, close: 101.7 },
]
export const CHECK = { BOXES, ADV_LINES, adviseOut: [89.3, 89.8], cps: CPS }
const ALL_LINES = [...L1A, ...L1B, ...L1C, ...L2, ...L3]
const hopsOf = sp => talkHops(ALL_LINES, sp, { cps: CPS })

const CAPS = [
  { text: 'Cosy night in? | *Three parties.*', kicker: 'FRIDAY · 7:30 PM', at: 2.15, out: [6.65, 6.95], accentColor: '#ffe27a' },
  { text: 'Taurus: | *a quiet night.*', at: 10.2, out: [21.4, 21.75], accentColor: '#9fe6b0' },
  { text: 'Gemini: | *three yeses.*', at: 22.15, out: [30.4, 30.75], accentColor: '#ffe27a' },
  { text: 'Same night. | *Two plans.*', at: 31.2, out: [39.5, 39.85] },
  { text: 'The *bread.*', at: 40.3, out: [49.1, 49.45], accentColor: '#ffb36e', size: 104 },
  { text: 'Both | *winning.*', at: 49.8, out: [59.1, 59.45], accentColor: '#ff6b6b' },
  { text: 'Opposite *ends.*', at: 59.8, out: [69.3, 69.6], accentColor: CYAN },
  { text: 'Say the need | *under it.*', at: 90.2, out: [97.0, 97.3] },
  { text: '*Us* | vs the problem.', at: 101.5, out: [103.6, 103.95], accentColor: ML_GOLD },
  { text: 'A tiny loaf. | *No name.*', at: 108.2, out: [111.2, 111.5], accentColor: '#ffb3d9', size: 88 },
]
const SEATS = { near: APT.couch.seats, far: [205, 875] }
const FEET = APT.couch.seatY, SZ = 230

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const R = (a, b, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
  const S = (sign, wx, feet, size, t, o = {}) => drawSign(x, sign, wx, standY(size, feet), size, t, o)

  const prevStills = [
    { caption: 'Sag dealt dessert.', scene: c => { drawCafe(c, 3, {}); drawSign(c, 'sagittarius', 540, standY(300, 1450), 300, 3, { mood: 'sparkle' }); drawPastry(c, 760, 1080, 8, 'cake') }, crop: [140, 760, 800, 960] },
    { caption: 'Rule four: broken.', scene: c => { drawCafe(c, 2, {}); drawPisces(c, 540, standY(320, 1450), 320, 2.3, { tears: 3, mood: 'wide' }) }, crop: [160, 760, 760, 900] },
    { caption: 'Libra sat down. By accident.', scene: c => { drawCafe(c, 4, { view: 'late' }); drawSign(c, 'libra', CAFE.seats[0].x, standY(240, CAFE.seats[0].y), 240, 4, { mood: 'happy' }); drawSign(c, 'scorpio', CAFE.seats[1].x, standY(240, CAFE.seats[1].y), 240, 4, { mood: 'wink' }) }, crop: [140, 820, 800, 940] },
  ]
  const prev = buildPreviously(root, { at: T.prev, len: 2, stills: prevStills })
  const title = buildTitle(root, { ep: 4, title: 'The First Fight', at: T.title, len: 3 })
  const caps = CAPS.map(c => buildCaption(root, c))
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1580, height: 250, size: 46, open: b.open, close: b.close, cps: CPS }))
  const adv = buildAdvise(root, { at: T.adv, out: CHECK.adviseOut, cards: ADV_CARDS, lines: ADV_LINES })
  const lesson = buildLesson(root, { at: T.lesson, out: [107.65, 107.95], text: 'Fight the problem, | not the *person.*', chip: '+1 SOUP AFTER THE PARTY' })
  const next = buildNextTime(root, { at: T.next, out: [115.05, 115.5], teaser: 'Libra gets a *mystery* note.' })
  const bug = showBug(root, 4, { at: 2.05 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ─────────── props
  function loaf(lx, ly, slices, k = 1) {         // the good bread on its board: `slices` slices left (0…4)
    if (k <= 0.01) return
    x.save(); x.translate(lx, ly); x.scale(k, k)
    R(-96, 2, 192, 18, INK); R(-90, 4, 180, 12, '#b07a4a')
    const w = 26 * slices + 40
    R(-w / 2 - 4, -54, w + 8, 58, INK); R(-w / 2, -50, w, 52, '#d89a52'); R(-w / 2 + 6, -46, w - 12, 10, '#f0c080')
    for (let i = 1; i <= slices; i++) R(-w / 2 + 20 + (i - 1) * 26, -50, 3, 52, '#a8682e')
    x.restore()
  }
  function soupPot(px, py, t, steam, k = 1) {
    if (k <= 0.01) return
    x.save(); x.translate(px, py); x.scale(k, k)
    R(-62, -66, 124, 72, INK); R(-56, -60, 112, 60, '#d8455f'); R(-70, -54, 14, 12, INK); R(56, -54, 14, 12, INK); R(-60, -72, 120, 10, INK)
    R(-50, -40, 100, 6, '#ff7a8a')
    if (steam > 0.01) { x.globalAlpha *= 0.55 * steam; for (let i = 0; i < 3; i++) R(-24 + i * 22 + Math.sin(t * 3 + i) * 5, -110 - ((t * 24 + i * 9) % 30), 8, 22, '#ffffff') }
    x.restore()
  }
  function candle(cx, cy, t, k = 1) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    R(-14, -50, 28, 50, INK); R(-10, -46, 20, 46, '#fff1d8'); R(-2, -58, 4, 10, INK)
    const f = 1 + 0.15 * Math.sin(t * 13)
    R(-6, -76 * f, 12, 18 * f, '#ffb84a'); R(-3, -70 * f, 6, 10, '#fff1a0')
    x.restore()
  }
  function coffeeTable(t, st) {
    R(340, 1452, 400, 22, INK); R(346, 1456, 388, 14, '#8a5a3a'); R(370, 1474, 20, 80, INK); R(690, 1474, 20, 80, INK)
    candle(400, 1452, t, st.candle ?? 1)
    soupPot(520, 1452, t, st.steam ?? 1, st.soup ?? 1)
    loaf(660, 1450, st.slices ?? 1, st.bread ?? 1)
  }
  function blanket(bx, by, k, col = '#ffb36e') {
    if (k <= 0.01) return
    x.save(); x.translate(bx, by); x.scale(k, k)
    R(-120, -20, 240, 70, INK); R(-114, -14, 228, 58, col); for (let i = 0; i < 5; i++) R(-110 + i * 48, -14, 20, 58, '#ffd8a8')
    x.restore()
  }
  function invite(cx, cy, label, time, k, stampK, rot) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 0.9, k * 0.9)
    R(-150, -96, 300, 192, INK); R(-142, -88, 284, 176, '#fff8e8'); R(-142, -88, 284, 40, '#c9a6ff')
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 22px ${MONO}`; x.fillText("YOU'RE INVITED", 0, -67)
    x.font = `800 40px ${INTER}`; x.fillText(label, 0, -6)
    x.font = `700 28px ${MONO}`; x.fillText(time, 0, 44)
    if (stampK > 0.01) {
      x.save(); x.rotate(-0.25); x.scale(lerp(2, 1, ease.outCubic(clamp(stampK))), lerp(2, 1, ease.outCubic(clamp(stampK)))); x.globalAlpha *= clamp(stampK * 3)
      R(-86, -40, 172, 80, '#3fae6a'); R(-78, -32, 156, 64, '#fff8e8'); R(-72, -26, 144, 52, '#3fae6a')
      x.fillStyle = '#ffffff'; x.font = `800 40px ${INTER}`; x.fillText('YES!', 0, 2)
      x.restore()
    }
    x.restore()
  }
  function scorecard(cx, cy, n, col, k) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k * 1.4, k * 1.4)
    R(-70, -56, 140, 112, INK); R(-62, -48, 124, 96, '#fff8e8'); R(-62, -48, 124, 22, col)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 16px ${MONO}`; x.fillText('POINTS', 0, -37)
    x.font = `800 54px ${INTER}`; x.fillText(String(n), 0, 12)
    x.restore()
  }
  function clock(cx, cy, t, k) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k * 1.7, k * 1.7)
    R(-50, -50, 100, 100, INK); R(-44, -44, 88, 88, '#fff8e8')
    const a = Math.floor(t) * Math.PI / 30
    x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a) * 34, -Math.cos(a) * 34); x.stroke()
    x.beginPath(); x.moveTo(0, 0); x.lineTo(20, 8); x.stroke()
    x.restore()
  }
  function napkin(t) {
    const k = easeOutBack(prog(t, ...T.napkin), 1.5) * outK(t, [103.6, 103.95])
    if (k <= 0.01) return
    const d = prog(t, ...T.draw)
    x.save(); x.translate(540, 720); x.rotate(-0.03); x.scale(k * 0.9, k * 0.9)
    R(-380, -250, 760, 470, INK); R(-370, -240, 740, 450, '#fffdf6')
    x.strokeStyle = 'rgba(180,170,150,0.5)'; x.lineWidth = 3; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-370, -200 + i * 70); x.lineTo(370, -200 + i * 70); x.stroke() }
    x.fillStyle = '#3a50a0'; x.textAlign = 'center'; x.textBaseline = 'middle'
    const ink = (s, sx, sy, at, size = 44) => { if (d < at) return; x.save(); x.globalAlpha *= clamp((d - at) * 8); x.font = `italic 600 ${size}px ${SERIF}`; x.fillText(s, sx, sy); x.restore() }
    ink('THE PLAN', 0, -190, 0.0, 50)
    ink('party #1', -200, -80, 0.12, 54); ink('1 hour', -200, -20, 0.25, 40)
    if (d > 0.4) { const a = clamp((d - 0.4) * 4); x.strokeStyle = '#3a50a0'; x.lineWidth = 7; x.beginPath(); x.moveTo(-60, -50); x.lineTo(-60 + 120 * a, -50); x.stroke(); if (a >= 1) { x.beginPath(); x.moveTo(44, -68); x.lineTo(62, -50); x.lineTo(44, -32); x.stroke() } }
    ink('soup +', 200, -80, 0.62, 54); ink('couch', 200, -20, 0.72, 54)
    if (d > 0.82) { drawIcon(x, 'heart', -40, 70, 9) }
    ink('us vs the plan', 0, 170, 0.9, 40)
    x.restore()
  }
  function reading(t) {
    const k = easeOutBack(prog(t, ...T.reading), 1.6) * outK(t, [103.6, 103.95])
    if (k <= 0.01) return
    x.save(); x.translate(540, 1045); x.scale(k, k)
    R(-330, -96, 660, 192, INK); R(-322, -88, 644, 176, '#150c2c'); R(-322, -88, 644, 6, ML_GOLD)
    x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('OUR READING TONIGHT', 0, -58)
    const opts = ['PUSH', 'PULL', 'ALIGN']
    // the highlight hops PUSH → PULL → ALIGN → PUSH → … and lands on ALIGN
    let hi = 2
    if (t < T.spin[1]) { const p = prog(t, ...T.spin), steps = 7, n = Math.floor(ease.outQuad(p) * steps); hi = (n + 0) % 3; if (t < T.spin[0]) hi = -1 }
    opts.forEach((o, i) => {
      const cx = -205 + i * 205, on = i === hi, landed = i === 2 && t >= T.align
      R(cx - 92, -12, 184, 74, INK); R(cx - 86, -6, 172, 62, on ? (landed ? ML_GOLD : '#4a3a7a') : '#2a2050')
      x.fillStyle = on && landed ? INK : BONE; x.font = `800 34px ${INTER}`; x.fillText(o, cx, 26)
    })
    x.restore()
    if (t > T.align) sparkles(x, t, 745, 1071, T.align, 12, 190, 5, [ML_GOLD, BONE, MINT])
  }
  function pisWindow(t, tears = 2) {     // Pisces, the upstairs neighbour, watching from across the street (always crying)
    const W0 = APT.window
    x.save(); x.beginPath(); x.rect(W0.x, W0.y, W0.w, W0.h); x.clip()
    R(W0.x + 120, W0.y + 300, 120, 100, '#ffd98a')
    drawPisces(x, W0.x + 180, W0.y + 370, 80, t, { tears, box: false, look: [0, 1] })
    x.restore()
  }

  // ─────────── scenes
  function apt(t, st) {
    x.save()
    if (st.zoom && st.zoom !== 1) { const [fx, fy] = st.focus; R(0, 0, 1080, 1920, '#05040c'); x.translate(fx, fy); x.scale(st.zoom, st.zoom); x.translate(-fx, -fy) }
    drawApartment(x, t, { lamp: st.lamp ?? 1, time: st.time || 'night' })
    pisWindow(t, st.pisTears ?? 2)
    if (st.under) st.under(t)
    for (const [k, o] of st.cast) if (o) S(k, o.x, o.feet ?? FEET, o.size ?? SZ, t, o)
    coffeeTable(t, st.table || {})
    if (st.after) st.after(t)
    x.restore()
  }
  function coldOpen(t) {
    apt(t, {
      table: { slices: 2 },
      cast: [
        ['taurus', { x: SEATS.near[0], mood: t > T.gX + 0.3 ? 'wide' : 'happy', look: [1, 0], seed: 9, hops: [T.tQ, T.gX + 0.3] }],
        ['gemini', { x: 840, feet: 1500, size: 240, mood: 'sparkle', look: [-1, 0], seed: 4, hops: [2.4, T.gX, T.gX + 0.35, T.gX + 0.7] }],
      ],
      under: tt => blanket(SEATS.near[0], 1360, 1),
      after: tt => {
        sparkles(x, tt, 840, 1330, 2.4, 10, 180, 2, [ML_GOLD, '#ffe27a', BONE])
        drawBubble(x, 380, 1080, 'blanket fort tonight?', { k: pop01(tt, T.tQ, 0.25, 2.4) * outK(tt, [6.6, 6.9]) })
        drawBubble(x, 700, 1180, 'I said yes to THREE parties.', { size: 30, col: '#fff3b0', k: pop01(tt, T.gX, 0.25, 2.4) * outK(tt, [6.6, 6.9]) })
      },
    })
  }
  function act1a(t) {
    const pk = i => pop01(t, T.props[i], 0.35, 2.2)
    apt(t, {
      table: { candle: pk(2), soup: pk(1), bread: pk(3), slices: 4 },
      cast: [['taurus', { x: lerp(780, SEATS.near[0], ease.inOutCubic(prog(t, 15.6, 16.6))), mood: t > 16.6 ? 'heart' : 'happy', look: [1, 1], seed: 9, hops: [...T.props.map(p => p - 0.1), ...hopsOf(SP.taurus).filter(h => h < 22), 15.7, 16.0, 16.3] }]],
      under: tt => blanket(SEATS.near[0], 1360, pk(0)),
      after: tt => T.props.forEach((p, i) => sparkles(x, tt, [SEATS.near[0], 520, 400, 660][i], [1340, 1400, 1400, 1400][i], p + 0.1, 6, 80, i + 1, [ML_GOLD, BONE, '#9fe6b0'])),
    })
  }
  function act1b(t) {
    drawLane(x, t, { moon: { x: 860, y: 610, r: 100 }, pan: lerp(700, 820, prog(t, T.a1b, T.a1c)) }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 108, t, { tears: 2, box: false, look: [1, 1] })
      drawSign(c, 'gemini', 1500, standY(250), 250, t, { mood: t > T.stamps[2] ? 'heart' : 'sparkle', look: [0, -1], seed: 4, hops: [...T.stamps, ...hopsOf(SP.gemini).filter(h => h > 22 && h < 31)] })
      drawSign(c, 'leo', 1240, standY(170), 170, t, { mood: 'happy', look: [1, 0], seed: 5 })
      drawSign(c, 'aquarius', 1780, standY(170), 170, t, { mood: 'sparkle', look: [-1, 0], seed: 13 })
    })
    const pos = [[255, 600, -0.06], [540, 870, 0.04], [825, 600, 0.05]], labels = [['ROOFTOP', '8 PM'], ["LEO'S", '9 PM'], ["AQUARIUS'S", '10 PM']]
    pos.forEach(([cx, cy, r], i) => invite(cx, cy, labels[i][0], labels[i][1], pop01(t, T.invites[i], 0.35, 2) * outK(t, [30.4, 30.8]), prog(t, T.stamps[i], T.stamps[i] + 0.18), r))
  }
  function act1c(t) {
    const burst = ease.outBack(prog(t, T.burst, T.burst + 0.35))
    apt(t, {
      table: { slices: 1 },
      cast: [
        ['taurus', { x: SEATS.near[0], mood: t > 34.2 ? 'squint' : t > T.burst ? 'happy' : 'sleepy', zzz: false, look: [1, 0], seed: 9, hops: hopsOf(SP.taurus).filter(h => h > 31 && h < 40) }],
        ['gemini', { x: lerp(1240, 820, burst), feet: 1500, size: 240, mood: t > 34.2 && t < 36.5 ? 'squint' : t > 36.5 ? 'wide' : 'sparkle', look: [-1, 0], seed: 4, hops: [T.burst + 0.1, ...hopsOf(SP.gemini).filter(h => h > 31 && h < 40)] }],
      ],
      under: tt => blanket(SEATS.near[0], 1360, 1),
      after: tt => {
        // the two plans, side by side
        const k1 = pop01(tt, 32.3, 0.3, 2) * outK(tt, [39.5, 39.85]), k2 = pop01(tt, 34.5, 0.3, 2) * outK(tt, [39.5, 39.85])
        if (k1 > 0.01) { x.save(); x.translate(280, 820); x.scale(k1, k1); R(-150, -110, 300, 220, INK); R(-142, -102, 284, 204, '#e8fff0'); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('PLAN A', 0, -64); x.font = `700 26px ${MONO}`; x.fillText('soup', 0, -16); x.fillText('blanket', 0, 22); x.fillText('bread', 0, 60); x.restore() }
        if (k2 > 0.01) { x.save(); x.translate(800, 820); x.scale(k2, k2); R(-150, -110, 300, 220, INK); R(-142, -102, 284, 204, '#fff8d8'); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('PLAN B', 0, -64); x.font = `700 26px ${MONO}`; x.fillText('party', 0, -16); x.fillText('party', 0, 22); x.fillText('PARTY', 0, 60); x.restore() }
      },
    })
  }
  function act2(t) {
    const zIn = ease.inOutCubic(prog(t, ...T.zoom)) * (1 - ease.inOutCubic(prog(t, ...T.zoomOut)))
    const apart = ease.inOutCubic(prog(t, ...T.apart))
    const sc = T.score.filter(s => t >= s).length
    const low = t > T.a2c
    const steam = 1 - prog(t, T.cold0, T.cold0 + 1.5)
    const gx0 = t < T.grab ? 820 : lerp(820, 760, prog(t, T.grab, T.grab + 0.4))
    const gxs = low ? lerp(SEATS.near[1], SEATS.far[1], apart) : t > T.a2b ? SEATS.near[1] : gx0
    const txs = low ? lerp(SEATS.near[0], SEATS.far[0], apart) : SEATS.near[0]
    let tm = 'happy', gm = 'sparkle'
    if (t > T.gasp) { tm = 'wide'; gm = 'neutral' }
    if (t > 46.9) gm = 'eyeroll'
    if (t > T.a2b) { tm = 'squint'; gm = 'squint' }
    if (sc >= 1 && t < T.a2c) { tm = t % 1.6 < 0.8 ? 'squint' : 'sparkle'; gm = t % 1.6 < 0.8 ? 'sparkle' : 'squint' }
    if (low) { tm = 'neutral'; gm = 'neutral' }
    apt(t, {
      zoom: 1 + 0.6 * zIn, focus: [SEATS.near[0] + 40, 1230],
      lamp: low ? 0.55 : 1, pisTears: low ? 3 : 2,
      table: { slices: t < T.bite ? 1 : 0, steam },
      cast: [
        ['taurus', { x: txs, mood: tm, look: low ? [-1, 1] : [1, 0], seed: 9, hops: [T.gasp, ...hopsOf(SP.taurus).filter(h => h > 43 && h < 70), ...T.score.filter((_, i) => i % 2 === 0)] }],
        ['gemini', { x: gxs, feet: t > T.a2b ? FEET : 1500, size: t > T.a2b ? SZ : 240, mood: gm, look: low ? [1, 1] : [-1, 0], seed: 4, hops: [T.grab, ...hopsOf(SP.gemini).filter(h => h > 46 && h < 70), ...T.score.filter((_, i) => i % 2 === 1)] }],
      ],
      under: tt => blanket(txs, 1360, 1),
      after: tt => {
        // the last slice: in Gemini's hand, then gone in one bite
        if (tt > T.grab && tt < T.bite) { const p = ease.outCubic(prog(tt, T.grab, T.grab + 0.4)); R(lerp(700, gxs - 120, p) - 16, lerp(1400, 1260, p) - 24, 32, 48, INK); R(lerp(700, gxs - 120, p) - 12, lerp(1400, 1260, p) - 20, 24, 40, '#f0c080') }
        if (tt > T.bite && tt < T.bite + 0.6) sparkles(x, tt, gxs - 100, 1240, T.bite, 6, 60, 2, ['#f0c080', BONE])
        if (tt > T.gasp && tt < 49.0) { x.save(); x.globalAlpha = clamp(prog(tt, T.gasp, T.gasp + 0.2)) * outK(tt, [48.6, 49]); x.font = `800 60px ${INTER}`; x.fillStyle = '#ffd36e'; x.textAlign = 'center'; x.fillText('crumbs.', 560, 1170); x.restore() }
        // the scorecards
        const sk = pop01(tt, T.score[0] - 0.3, 0.3, 2) * outK(tt, [59.0, 59.5])
        scorecard(txs, 940, Math.ceil(sc / 2) + (sc >= 1 ? 0 : 0), '#9fe6b0', sk)
        scorecard(gxs, 940, Math.floor(sc / 2), '#ffe27a', sk)
        // Leo's (bad) advice by text
        const pk = pop01(tt, T.leoText, 0.35, 1.8) * outK(tt, [59.0, 59.4])
        if (pk > 0.01) { x.save(); x.translate(540, 680); x.scale(pk * 1.3, pk * 1.3); x.translate(-540, -680); drawPhone(x, 540, 700, 420, 420, tt, { title: `${G('leo')} Leo`, msgs: [{ at: T.leoText + 0.2, side: 'L', text: 'just win the argument lol' }] }); x.restore() }
        // the low point: the clock, the gap
        clock(540, 900, tt, pop01(tt, T.ticks, 0.3, 2) * outK(tt, [69.3, 69.6]))
      },
    })
  }
  function act3a(t) {
    apt(t, {
      table: { slices: 0, steam: 0 },
      cast: [
        ['taurus', { x: lerp(SEATS.far[0], SEATS.near[0] + 30, ease.inOutCubic(prog(t, 90.2, 91.2))), mood: t > 93.6 ? 'happy' : 'neutral', look: [1, 0], seed: 9, hops: [90.3, 90.7, ...hopsOf(SP.taurus).filter(h => h > 90 && h < 98)], blush: t > 93.5 }],
        ['gemini', { x: lerp(SEATS.far[1], SEATS.near[1] - 30, ease.inOutCubic(prog(t, 92.2, 93.2))), mood: t > 95.5 ? 'sparkle' : t > 92 ? 'happy' : 'neutral', look: [-1, 0], seed: 4, hops: [92.3, 92.7, ...hopsOf(SP.gemini).filter(h => h > 92 && h < 98)] }],
      ],
      under: tt => blanket(lerp(SEATS.far[0], SEATS.near[0] + 30, ease.inOutCubic(prog(tt, 90.2, 91.2))), 1360, 1),
    })
  }
  function act3b(t) {
    apt(t, {
      table: { slices: 0, steam: 0 },
      cast: [
        ['taurus', { x: SEATS.near[0] + 30, mood: t > T.align ? 'heart' : 'happy', look: [1, -1], seed: 9, hops: [T.align + 0.05, ...hopsOf(SP.taurus).filter(h => h > 98)] }],
        ['gemini', { x: SEATS.near[1] - 30, mood: t > T.align ? 'heart' : 'sparkle', look: [-1, -1], seed: 4, hops: [T.align + 0.1, 98.8, 99.6, 100.4] }],
      ],
      under: tt => blanket(SEATS.near[0] + 140, 1360, 1.6),
      after: tt => { napkin(tt); reading(tt) },
    })
  }
  function tag(t) {
    const pan = 1080
    const si = ease.outCubic(prog(t, ...T.scoIn)), so = ease.inCubic(prog(t, ...T.scoOut))
    const noteK = t > T.scoIn[1] ? 1 : 0
    drawLane(x, t, { moon: { x: 860, y: 610, r: 100 }, pan, time: 'late' }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 108, t, { tears: 3, box: false, look: [1, 1] })
      // the loaf + note on the stall
      if (noteK) { c.save(); c.translate(1880, 1288); drawPastry(c, 0, 0, 5, 'loaf'); c.fillStyle = INK; c.fillRect(30, -46, 70, 50); c.fillStyle = '#fff8e8'; c.fillRect(34, -42, 62, 42); drawIcon(c, 'heart', 50, -36, 3.2); c.restore() }
      if (t < T.scoOut[1]) drawSign(c, 'scorpio', lerp(1600, 1810, si) - so * 420, standY(200), 200, t, { mood: 'squint', look: [1, 0], seed: 11, hops: [T.scoIn[0] + 0.1, T.scoIn[0] + 0.4, T.scoOut[0], T.scoOut[0] + 0.3] })
      if (t > T.libIn) {
        const k = ease.outCubic(prog(t, T.libIn, T.libIn + 0.5))
        drawSign(c, 'libra', lerp(2200, 1990, k), standY(210), 210, t, { mood: t > 110.6 ? 'wide' : 'sparkle', look: t > 110.6 ? [Math.sin(t * 4) > 0 ? 1 : -1, 0] : [-1, 1], seed: 10, hops: [T.libIn + 0.1, 110.6] })
      }
    })
    drawBubble(x, 760, 1020, 'who…?', { size: 34, col: '#ffe0ef', k: pop01(t, 110.7, 0.25, 2.4) * outK(t, [111.2, 111.5]) })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.setTransform(1, 0, 0, 1, 0, 0)
      if (t < T.cold) drawSky(x, t, SKY_H)
      else if (t < T.title) coldOpen(t)
      else if (t < T.a1) drawSky(x, t, SKY_H)
      else if (t < T.a1b) act1a(t)
      else if (t < T.a1c) act1b(t)
      else if (t < T.a2) act1c(t)
      else if (t < T.adv + 0.7) act2(t)
      else if (t < T.a3) drawSky(x, t, SKY_H)
      else if (t < T.a3b) act3a(t)
      else if (t < T.tag) act3b(t)
      else if (t < T.next) tag(t)
      else drawSky(x, t, SKY_H)
      prev.update(t); title.update(t)
      for (const c of caps) c.update(t)
      for (const b of boxes) b.update(t)
      adv.update(t); lesson.update(t); next.update(t)
      bug.update(t, title.on(t) || prev.on(t) ? 0 : 1)
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx plays the middle one: 40.0, into the bread)
const CUTS = [22.0, { t: 40.0, kind: 'flip' }, 90.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const NOTE = [698.46, 783.99, 880, 1046.5, 1174.66, 1396.91]
export const CUES = [
  ...previouslyCues(T.prev, 3, 2),
  ...CAPS.flatMap(c => captionCues(c)),
  ['glitter', 2.4, 2.9], ['pop', T.tQ, 880, 0.035, -0.3], ['pop', T.gX, 1396.91, 0.05, 0.3], ['tom', r3(T.gX + 0.3), 110, { gain: 0.16, decay: 0.2 }],
  ...titleCues(T.title, 3),
  ...T.props.flatMap((p, i) => [['pop', p, NOTE[i], 0.04, -0.2], ['glitter', r3(p + 0.1), r3(p + 0.4)]]),
  ...T.invites.map((p, i) => ['whoosh', r3(p - 0.05), 0.3, 0.035]), ...T.stamps.flatMap((s, i) => [['tick', s, 0.07], ['pop', s, NOTE[i * 2], 0.045, 0]]),
  ['whoosh', T.burst, 0.45, 0.05], ['pop', 32.3, 880, 0.03, -0.3], ['pop', 34.5, 880, 0.03, 0.3],
  ['pop', T.grab, 1174.66, 0.03, 0.3], ['tick', T.bite, 0.08], ['tick', r3(T.bite + 0.12), 0.06],
  ['boom', T.gasp, 0.3], ['tom', T.gasp, 82, { gain: 0.3, decay: 0.4 }], ['riser', 43.0, T.gasp, 0.03],
  ...T.score.map((s, i) => ['bell', s, NOTE[(i + 2) % 6] * 2, 0.025, 0.6, i % 2 ? 0.4 : -0.4]),
  ['pop', r3(T.leoText + 0.2), 1046.5, 0.04, 0.2],
  ...Array.from({ length: 7 }, (_, i) => ['tick', r3(T.ticks + i), 0.035]),
  ...talkCues(ALL_LINES, { cps: CPS }),
  ...adviseCues({ at: T.adv, cards: ADV_CARDS, lines: ADV_LINES }),
  ['whoosh', T.napkin[0], 0.35, 0.035], ...Array.from({ length: 18 }, (_, i) => ['tick', r3(T.draw[0] + i * 0.12), 0.012]),
  ['whoosh', T.reading[0], 0.35, 0.04], ...Array.from({ length: 7 }, (_, i) => ['tick', r3(T.spin[0] + 1.5 * Math.sqrt(i / 7) * (T.spin[1] - T.spin[0]) / 1.5), 0.04]),
  ['bell', T.align, 1760, 0.04, 1.4, 0], ['glitter', T.align, r3(T.align + 0.6)], ['pluck', T.align, 1396.91, 0.04, 0.8, 0],
  ...lessonCues(T.lesson, { text: 'Fight the problem, | not the *person.*', chip: '+1 SOUP AFTER THE PARTY' }),
  ['whoosh', T.scoIn[0], 0.3, 0.025], ['tick', T.scoIn[1], 0.05], ['whoosh', T.scoOut[0], 0.3, 0.03], ['pop', 110.7, 1174.66, 0.03, 0.3],
  ...nextTimeCues(T.next),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
