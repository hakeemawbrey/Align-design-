// mlfriends: MOONLIGHT LANE, Ep 3 "Meet the Friends" (120 s vertical, STARTALK-EPISODES.md, music: funk · E).
// Cancer brings their new person, Sagittarius, to the lane's Sunday dinner at the café. Story 0–115.6, then the end card.
//     0.0–2.0   ◀◀ PREVIOUSLY ON… (Capricorn stayed · Aries: one balloon · Scorpio slowed down)
//     2.0–7.0   cold open on the lane: Cancer briefs the friends. "Rule one: | no *scrapbook.*"  Leo: "what scrapbook?"
//               Cancer: "EXACTLY."
//     7.0–10.0  title card.
//    10.0–23.4  Act 1a, the café: the HOUSE RULES clipboard (no solos · three questions max · try not to cry · normal
//               portions). Pisces breaks rule 4 while it is still being written; Taurus: "define *normal*."
//    23.4–32.6  Act 1b, the lane at dusk: Sagittarius arrives with a plant. "is that weird?" Cancer: heart eyes.
//    32.6–40.0  Act 1c, the long table: everyone turns at once. Taurus' "normal amount of food" is a mountain.
//    40.0       card cut.
//    40.0–70.0  Act 2: rule two, broken (Leo's toast + song) · rule three, broken (Virgo's interview) · rule four,
//               broken in 0.2 seconds (Pisces). Sag shrinks behind the table. Cancer panics, reaches for the
//               scrapbook; the table: "NO." Taurus: "…more bread?"
//    70.0–89.8  THE STARS ADVISE: Let them be them · Check in, privately · Include, don't spotlight (tonight's move).
//    90.0–104   Act 3: by the kitchen door ("hey. you okay? we can leave whenever."), then Sag deals dessert like a
//               card dealer and is a hit. "*Your people*, | our table."
//   104–108     LESSON UNLOCKED: "Include, | don't *spotlight.*"  +1 SEAT AT THE TABLE
//   108–111.6   lane tag: Libra sits next to Scorpio "by accident". Scorpio knows.
//   111.6–115.6 NEXT TIME: "Taurus and Gemini have their *first fight*."
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
  loadFonts, drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawPastry, drawIcon,
  drawBubble, sparkles, showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues,
  buildAdvise, adviseCues, buildNextTime, nextTimeCues, ML_GOLD, BONE, INK, PINK, INTER, MONO, pop01, outK, popOut, bump, r3,
} from './mlkit.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN          // 115.6
const G = s => signStar(s).glyph + '︎'
const SP = {
  cancer: `${G('cancer')} CANCER`, sag: `${G('sagittarius')} SAG`, leo: `${G('leo')} LEO`, virgo: `${G('virgo')} VIRGO`,
  pisces: `${G('pisces')} PISCES`, taurus: `${G('taurus')} TAURUS`, stars: 'THE STARS', all: 'EVERYONE',
}
const COL = { cancer: '#bfe3ff', sag: '#d9a6ff', leo: '#ffd36e', virgo: '#9fe6b0', pisces: '#8fe3ff', taurus: '#9fe6b0', all: PINK }

// ── the timeline
const T = {
  prev: 0, cold: 2.0, title: 7.0,
  a1: 10.0, a1b: 23.4, a1c: 32.6, a2: 40.0, adv: 70.0, a3: 90.0, a3b: 98.6, lesson: 104.0, tag: 108.0, next: 111.6,
  // cold open
  leoQ: 4.15, cancerX: 5.25,
  // act 1a: the rules
  rule: [11.0, 13.6, 16.3, 17.5, 20.1], pisBurst: 17.75,
  // act 1b: arrival
  lamps: 23.6, sagIn: [24.6, 26.4], heart: 31.3,
  // act 1c: the table
  enter: [32.7, 33.4], turn: 33.55, mountain: [37.6, 38.5],
  // act 2
  leoUp: [40.5, 40.9], stamp2: 44.6, leoDown: [46.6, 47.0], qs: [50.0, 50.85, 51.7, 52.5], stamp3: 52.95, pisFloods: 54.85, stamp4: 55.05,
  zoomIn: [61.6, 62.6], book: 64.4, no: 65.8, zoomOut: [65.8, 66.1], bread: 67.65,
  // act 3
  deal: [99.4, 99.95, 100.5, 101.05], sagGrow: [98.7, 99.6],
  // tag
  libIn: [108.2, 108.9], scoLook: 109.9,
}
const CPS = 28

// ── the dialogue (each block = one box; every line ≤ ~46 chars and holds ≥ 1.5 s after it finishes typing)
const L1A = [
  { t: 11.2, speaker: SP.cancer, color: COL.cancer, text: 'okay. new person tonight. *house rules.*' },
  { t: 14.6, speaker: SP.leo, color: COL.leo, text: 'no solos?! not even a *small* one?' },
  { t: 17.65, speaker: SP.pisces, color: COL.pisces, text: "I'm not crying. *you're* crying." },
  { t: 20.45, speaker: SP.taurus, color: COL.taurus, text: 'define *normal.*' },
]
const L1B = [
  { t: 24.05, speaker: SP.stars, text: "Cancer's new person: *Sagittarius.*" },
  { t: 26.9, speaker: SP.sag, color: COL.sag, text: 'hi! I brought a plant. is that *weird?*' },
  { t: 30.2, speaker: SP.cancer, color: COL.cancer, text: "it's *perfect.* come in." },
]
const L1C = [
  { t: 33.9, speaker: SP.stars, text: 'four friends. *no pressure.*' },
  { t: 37.0, speaker: SP.taurus, color: COL.taurus, text: 'I made a *normal* amount of food.' },
]
const L2 = [
  { t: 40.6, speaker: SP.leo, color: COL.leo, text: 'a toast! to Sag! and also to *me!*' },
  { t: 43.85, speaker: SP.leo, color: COL.leo, text: '(singing) welcome to the *laaane!*' },
  { t: 47.3, speaker: SP.virgo, color: COL.virgo, text: 'quick questions. just three. *maybe nine.*' },
  { t: 54.9, speaker: SP.pisces, color: COL.pisces, text: 'you two just look so *HAPPY.*' },
  { t: 59.7, speaker: SP.stars, text: "Sag hasn't said a word since the *toast.*" },
  { t: 62.7, speaker: SP.cancer, color: COL.cancer, text: "it's ruined. get the *scrapbook.*" },
  { t: T.no, speaker: SP.all, color: COL.all, text: '*NO.*' },
  { t: T.bread, speaker: SP.taurus, color: COL.taurus, text: '…more *bread?*' },
]
const ADV_LINES = [
  { t: 70.9, text: "Cancer, this one's *yours.*" },
  { t: 73.8, text: "your friends aren't a show to *run.*" },
  { t: 77.6, text: 'pull them aside. keep it *small.*' },
  { t: 80.5, text: '"we can leave *whenever* you want."' },
  { t: 83.5, text: 'then hand them *one* easy job.' },
  { t: 86.0, text: 'Leo. Virgo. we see you. *gently.*' },
]
const ADV_CARDS = [
  { at: 71.3, icon: 'star', head: 'Let them be *them.*', body: "Don't perform your friends. They're lovable unrehearsed." },
  { at: 77.3, icon: 'chat', head: 'Check in, *privately.*', body: '“You okay? We can leave whenever.”' },
  { at: 83.3, icon: 'cup', head: 'Include, don’t *spotlight.*', body: 'Give them one easy way in, like a small job.' },
]
const L3 = [
  { t: 90.55, speaker: SP.cancer, color: COL.cancer, text: 'hey. you okay? we can leave *whenever.*' },
  { t: 94.05, speaker: SP.sag, color: COL.sag, text: "I'm good! just… a lot of *faces.*" },
  { t: 97.2, speaker: SP.cancer, color: COL.cancer, text: "want a job? you're on *dessert.*" },
  { t: 100.1, speaker: SP.leo, color: COL.leo, text: 'they deal better than *I* sing!' },
]
const BOXES = [
  { lines: L1A, open: 11.0, close: 23.2 }, { lines: L1B, open: 23.9, close: 32.75 }, { lines: L1C, open: 33.7, close: 39.85 },
  { lines: L2, open: 40.5, close: 69.65 }, { lines: L3, open: 90.5, close: 103.8 },
]
export const CHECK = { BOXES, ADV_LINES, adviseOut: [89.3, 89.8], cps: CPS }
const ALL_LINES = [...L1A, ...L1B, ...L1C, ...L2, ...L3]
const hopsOf = sp => talkHops(ALL_LINES, sp, { cps: CPS })

const CAPS = [
  { text: 'Rule one: | no *scrapbook.*', kicker: 'SUNDAY · 6:52 PM', at: 2.15, out: [6.65, 6.95], accentColor: PINK },
  { text: 'The *rules.*', at: 10.2, out: [22.9, 23.25] },
  { text: 'And… | *here they are.*', kicker: '6:59 PM', at: 23.55, out: [32.1, 32.45], accentColor: '#d9a6ff' },
  { text: 'Sunday *dinner.*', at: 32.75, out: [39.6, 39.9] },
  { text: 'Rule two: | *broken.*', at: 40.25, out: [46.75, 47.0], accentColor: '#ff6b6b' },
  { text: 'Rule three: | *broken.*', at: 47.1, out: [54.45, 54.7], accentColor: '#ff6b6b' },
  { text: 'Rule four: | *0.2 seconds.*', at: 54.8, out: [59.3, 59.6], accentColor: '#8fe3ff' },
  { text: 'Sag went | *quiet.*', at: 59.7, out: [69.3, 69.6], accentColor: '#d9a6ff' },
  { text: 'Check in, | *privately.*', kicker: 'BY THE KITCHEN DOOR', at: 90.2, out: [98.2, 98.5] },
  { text: '*Your people,* | our table.', at: 100.6, out: [103.6, 103.95], accentColor: ML_GOLD },
  { text: 'Libra sits down. | *By accident.*', at: 108.2, out: [111.2, 111.5], accentColor: '#ffb3d9', size: 84 },
]

// ── geometry
const SEAT = { leo: 140, virgo: 335, cancer: 538, sag: 738, pisces: 935 }
const TABLE_Y = 1282, ROW_FEET = 1296, ROW_S = 205
const RULES = ['1. NO SCRAPBOOK. EVER.', '2. LEO: NO SOLOS', '3. VIRGO: THREE QUESTIONS MAX', '4. PISCES: TRY NOT TO CRY', '5. TAURUS: NORMAL PORTIONS']

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── stills for PREVIOUSLY ON
  const prevStills = [
    { caption: 'Capricorn stayed.', scene: c => { drawCafe(c, 3, { chairsUp: 0.8, view: 'late', behind: k => drawSign(k, 'taurus', CAFE.counter.x, standY(190, CAFE.counter.y), 190, 3, { mood: 'happy' }) }); drawSign(c, 'capricorn', 420, standY(260, 1450), 260, 3, { mood: 'heart' }) }, crop: [120, 780, 860, 1010] },
    { caption: 'Aries: one balloon.', scene: c => drawLane(c, 2, { moon: { x: 860, y: 610, r: 100 }, pan: 900 }, k => { drawSign(k, 'aries', 1250, standY(230), 230, 2, { mood: 'happy' }); balloon(k, 1380, 1000, 2); drawSign(k, 'virgo', 1470, standY(210), 210, 2, { mood: 'sparkle' }) }), crop: [140, 700, 900, 1060] },
    { caption: 'Scorpio… slowed down.', scene: c => drawLane(c, 4, { moon: { x: 860, y: 610, r: 100 }, pan: 1080 }, k => { drawSign(k, 'libra', 1890, standY(210), 210, 4, { mood: 'happy' }); drawSign(k, 'scorpio', 1640, standY(210), 210, 4, { mood: 'sleepy', zzz: false }) }), crop: [300, 760, 780, 920] },
  ]
  const prev = buildPreviously(root, { at: T.prev, len: 2, stills: prevStills })
  const title = buildTitle(root, { ep: 3, title: 'Meet the Friends', at: T.title, len: 3 })
  const caps = CAPS.map(c => buildCaption(root, c))
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1580, height: 250, size: 46, open: b.open, close: b.close, cps: CPS }))
  const adv = buildAdvise(root, { at: T.adv, out: CHECK.adviseOut, cards: ADV_CARDS, lines: ADV_LINES })
  const lesson = buildLesson(root, { at: T.lesson, out: [107.65, 107.95], text: 'Include, | don’t *spotlight.*', chip: '+1 SEAT AT THE TABLE' })
  const next = buildNextTime(root, { at: T.next, out: [115.05, 115.5], teaser: 'Taurus and Gemini have their *first fight.*' })
  const bug = showBug(root, 3, { at: 2.05 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const S = (sign, wx, feet, size, t, o = {}) => drawSign(x, sign, wx, standY(size, feet), size, t, o)
  const R = (a, b, w, h, c) => { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }

  // ─────────── props
  function clipboard(t, k) {
    if (k <= 0.01) return
    x.save(); x.translate(540, 700); x.rotate(-0.025); x.scale(k, k); x.translate(-540, -700)
    R(156, 356, 784, 690, INK); R(166, 366, 764, 670, '#8a5a3a'); R(186, 386, 724, 630, '#fff8e8')
    R(450, 336, 180, 50, INK); R(460, 344, 160, 34, '#c0c4d0'); R(500, 352, 80, 14, '#8a8ea0')
    x.font = `800 46px ${INTER}`; x.fillStyle = '#c2306a'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('HOUSE RULES', 548, 452)
    R(250, 486, 596, 6, '#e8c8a0')
    x.font = `700 33px ${MONO}`; x.textAlign = 'left'
    RULES.forEach((r, i) => {
      const at = T.rule[i] - (i === 0 ? 0.6 : 0), p = pop01(t, at, 0.3, 2)
      if (p <= 0.01) return
      const y = 556 + i * 98
      x.save(); x.globalAlpha *= clamp(p); x.translate(220, y); x.scale(p, p)
      R(0, -22, 44, 44, INK); R(5, -17, 34, 34, '#fff8e8')
      x.fillStyle = INK; x.fillText(r, 62, 2)
      x.restore()
      // the mark: a tick… except rule 4 (Pisces is already crying) gets a teardrop
      const m = pop01(t, T.rule[i] + (i === 3 ? 0.25 : 0.55), 0.25, 2.6)
      if (m > 0.01) {
        x.save(); x.translate(242, y); x.scale(m, m)
        if (i === 3) { R(-8, -20, 16, 8, '#4aa8e8'); R(-12, -12, 24, 22, '#4aa8e8'); R(-8, 10, 16, 6, '#4aa8e8'); R(-6, -8, 6, 6, '#ffffff') }
        else drawIcon(x, 'check', -26, -24, 5.2)
        x.restore()
      }
    })
    x.restore()
  }
  function plant(px, py, s = 1, a = 1) {
    x.save(); x.globalAlpha *= a; x.translate(px, py); x.scale(s, s)
    R(-30, -10, 60, 52, INK); R(-24, -4, 48, 42, '#c0703a'); R(-30, -14, 60, 12, INK); R(-26, -12, 52, 8, '#d8844a')
    ;[[-40, -60], [-12, -88], [14, -70], [30, -46], [-34, -36]].forEach(([u, v], i) => { R(u - 3, v - 3, 34, 22, INK); R(u, v, 28, 16, i % 2 ? '#4fae72' : '#3f8a5a'); R(u / 3 + 2, v / 2 - 6, 4, -v / 2, '#2e6a44') })
    x.restore()
  }
  function scrapbook(bx, by, k, t) {
    if (k <= 0.01) return
    x.save(); x.translate(bx, by); x.rotate(-0.12 + 0.04 * Math.sin(t * 6)); x.scale(k, k)
    R(-96, -70, 192, 140, INK); R(-88, -62, 176, 124, '#ff8fb1'); R(-88, -62, 18, 124, '#d85a86')
    drawIcon(x, 'heart', -18, -40, 6)
    x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('US ♥', 10, 42)
    x.restore()
  }
  function stamp(t, at, text, cy = 800) {
    const p = prog(t, at, at + 0.18), o = outK(t, [at + 2.2, at + 2.5])
    if (p <= 0 || o <= 0) return
    const s = lerp(2.4, 1, ease.outCubic(p))
    x.save(); x.globalAlpha = clamp(p * 3) * o; x.translate(540, cy); x.rotate(-0.13); x.scale(s, s)
    x.font = `800 74px ${INTER}`; const w = x.measureText(text).width + 70
    R(-w / 2 - 6, -66, w + 12, 132, INK); R(-w / 2, -60, w, 120, '#ff5a6a'); R(-w / 2 + 10, -50, w - 20, 100, '#fff1ee'); R(-w / 2 + 16, -44, w - 32, 88, '#ff5a6a')
    x.fillStyle = '#fff6f0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
    x.restore()
  }
  function notes(t, cx, cy, t0, t1) {
    if (t < t0 || t > t1 + 0.6) return
    const a = outK(t, [t1, t1 + 0.6])
    for (let i = 0; i < 6; i++) {
      const ph = ((t - t0) * 0.6 + i / 6) % 1
      const nx = cx + Math.sin(ph * 6 + i) * 60 + (i - 2.5) * 40, ny = cy - ph * 260
      x.save(); x.globalAlpha = a * Math.sin(Math.PI * ph); x.translate(Math.round(nx), Math.round(ny))
      R(-2, -2, 18, 14, INK); R(0, 0, 14, 10, i % 2 ? ML_GOLD : PINK); R(10, -34, 6, 36, INK); R(12, -32, 2, 32, i % 2 ? ML_GOLD : PINK); R(10, -36, 18, 8, INK)
      x.restore()
    }
  }
  function spotlight(t, cx, a) {
    if (a <= 0.01) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, `rgba(255,240,190,${0.32 * a})`); g.addColorStop(1, `rgba(255,220,150,${0.05 * a})`)
    x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, 0); x.lineTo(cx + 40, 0); x.lineTo(cx + 190, 1300); x.lineTo(cx - 190, 1300); x.closePath(); x.fill()
    x.restore()
  }
  function longTable(t, { mountain = 0, dessert = 0, plates = true } = {}) {
    // cloth, apron, legs
    R(30, TABLE_Y - 8, 1020, 26, INK); R(36, TABLE_Y - 4, 1008, 22, '#f6ead2')
    R(30, TABLE_Y + 18, 1020, 64, INK); R(36, TABLE_Y + 18, 1008, 58, '#e8d6b4')
    for (let i = 0; i < 18; i++) R(46 + i * 56, TABLE_Y + 18, 26, 58, '#d8455f')
    R(36, TABLE_Y + 70, 1008, 6, '#b8a080')
    R(90, TABLE_Y + 82, 22, 170, INK); R(968, TABLE_Y + 82, 22, 170, INK)
    if (plates) for (const k of Object.keys(SEAT)) { R(SEAT[k] - 50, TABLE_Y - 14, 100, 10, INK); R(SEAT[k] - 46, TABLE_Y - 12, 92, 6, '#ffffff') }
    // dessert dealt onto each plate
    if (dessert) Object.keys(SEAT).filter(k => k !== 'sag').forEach((k, i) => {
      const at = T.deal[i], p = prog(t, at - 0.45, at)
      if (p <= 0) return
      const sx = SEAT.sag + 20, sy = TABLE_Y - 200, ex = SEAT[k], ey = TABLE_Y - 30
      const e = ease.inOutQuad(p), px = lerp(sx, ex, e), py = lerp(sy, ey, e) - Math.sin(Math.PI * e) * 220
      x.save(); x.translate(px, py); x.rotate((1 - e) * 4 * (i % 2 ? 1 : -1)); drawPastry(x, 0, 0, 4.4, ['cake', 'bun', 'cake', 'croissant'][i]); x.restore()
      if (p >= 1) sparkles(x, t, ex, ey - 10, at, 6, 70, i + 3, [ML_GOLD, BONE, PINK])
    })
    // Taurus' "normal amount of food"
    if (mountain > 0.01) {
      const kinds = ['loaf', 'bun', 'croissant', 'cake']
      let n = 0
      for (let row = 0; row < 6; row++) for (let i = 0; i < 6 - row; i++) {
        const k = clamp(mountain * 21 - n++)
        if (k <= 0) continue
        const px = 840 - (5 - row) * 33 + i * 66, py = TABLE_Y - 34 - row * 42 - (1 - easeOutBack(k, 2)) * 120
        drawPastry(x, px, py, 4.6, kinds[(row + i) % 4])
      }
    }
  }
  function balloon(c, bx, by, t) {
    c.save(); c.translate(bx, by + Math.sin(t * 2) * 8)
    c.fillStyle = INK; c.fillRect(-34, -44, 68, 84); c.fillStyle = '#ff6b8a'; c.fillRect(-28, -38, 56, 72); c.fillStyle = '#ffd0dc'; c.fillRect(-18, -28, 12, 16)
    c.fillStyle = INK; c.fillRect(-2, 40, 4, 200)
    c.restore()
  }

  // ─────────── scenes
  function coldOpen(t) {
    const pan = 380 + (t - T.cold) * 14
    drawLane(x, t, { moon: { x: 860, y: 610, r: 100 }, pan }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 108, t, { tears: t > 5.3 ? 3 : 2, box: false, look: [0, 1] })
      const cHop = [2.3, T.cancerX, T.cancerX + 0.3]
      drawSign(c, 'cancer', 650, standY(220), 220, t, { mood: t > T.cancerX ? 'wide' : 'neutral', look: [1, 0], hops: cHop, seed: 3 })
      // the clipboard in Cancer's hand
      c.save(); c.translate(760, 1290 + Math.sin(t * 2.2) * 4); c.rotate(0.15); c.fillStyle = INK; c.fillRect(-40, -54, 80, 108); c.fillStyle = '#8a5a3a'; c.fillRect(-34, -48, 68, 96); c.fillStyle = '#fff8e8'; c.fillRect(-28, -38, 56, 80)
      c.fillStyle = INK; for (let i = 0; i < 4; i++) c.fillRect(-20, -26 + i * 18, 36 - (i % 2) * 10, 5); c.restore()
      drawSign(c, 'leo', 920, standY(200), 200, t, { mood: t > T.leoQ && t < T.cancerX ? 'wide' : t > T.cancerX ? 'eyeroll' : 'happy', look: [-1, 0], hops: [T.leoQ], seed: 5 })
      drawSign(c, 'virgo', 1110, standY(190), 190, t, { mood: 'squint', look: [-1, 0], seed: 7 })
      drawSign(c, 'taurus', 1300, standY(200), 200, t, { mood: 'happy', look: [-1, 0], seed: 9 })
      drawBubble(c, 960, 1040, 'what scrapbook?', { k: pop01(t, T.leoQ, 0.25, 2.4) * outK(t, [6.6, 6.9]) })
      drawBubble(c, 620, 1000, 'EXACTLY.', { size: 40, col: '#ffd0dc', k: pop01(t, T.cancerX, 0.25, 2.6) * outK(t, [6.6, 6.9]) })
    })
  }
  function act1a(t) {
    drawCafe(x, t, {})
    const line = (sign, wx, size, o) => S(sign, wx, 1530, size, t, o)
    const look = [0, -1]
    line('cancer', 150, 220, { mood: t > 22 ? 'squint' : 'neutral', look: [1, -1], hops: hopsOf(SP.cancer).filter(h => h < 23), seed: 3 })
    line('leo', 410, 175, { mood: t > T.rule[1] + 0.2 && t < 19 ? 'wide' : 'happy', look, hops: hopsOf(SP.leo).filter(h => h < 23), squash: t > T.rule[1] + 0.2 && t < 17 ? 0.08 : 0, seed: 5 })
    line('virgo', 590, 170, { mood: t > T.rule[2] + 0.2 ? 'squint' : 'neutral', look, seed: 7 })
    drawPisces(x, 765, standY(170, 1530), 170, t, { tears: t > T.pisBurst ? 3 : t > T.rule[3] ? 1 : 0, mood: t > T.pisBurst ? 'wide' : 'sparkle', look, hops: [T.pisBurst, ...hopsOf(SP.pisces).filter(h => h < 23)], pull: clamp(prog(t, 18.6, 19.2)) })
    line('taurus', 965, 175, { mood: t > T.rule[4] + 0.2 ? 'squint' : 'happy', look: t > 20.4 ? [-1, -1] : look, hops: hopsOf(SP.taurus).filter(h => h < 23), seed: 9 })
    clipboard(t, pop01(t, 10.35, 0.4, 1.8) * outK(t, [22.9, 23.3]))
    // Virgo's question pad, already 40 deep
    const vk = pop01(t, T.rule[2] + 0.5, 0.25, 2.4) * outK(t, [19.6, 20])
    drawBubble(x, 620, 1220, 'question 1 of 40', { size: 28, col: '#d9ffe6', k: vk })
  }
  function act1b(t) {
    const pan = lerp(520, 640, prog(t, T.a1b, T.a1c))
    drawLane(x, t, { moon: { x: 860, y: 610, r: 100 }, time: 'dusk', pan, lampsAt: T.lamps }, c => {
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 108, t, { tears: t > T.heart ? 3 : 1, box: false, mood: t > T.heart ? 'happy' : 'sparkle', look: [1, 1] })
      const sp = ease.outCubic(prog(t, ...T.sagIn))
      const sx = lerp(1820, 1300, sp)
      const hop = []; for (let h = T.sagIn[0]; h < T.sagIn[1]; h += 0.36) hop.push(h)
      const cMood = t > T.heart ? 'heart' : t > 26.4 ? 'sparkle' : 'neutral'
      drawSign(c, 'cancer', 1010, standY(220), 220, t, { mood: cMood, look: t > T.sagIn[0] ? [1, 0] : [0, 0], hops: [...hopsOf(SP.cancer).filter(h => h > 23 && h < 33), T.heart], seed: 3, blush: t > 27.5 })
      drawSign(c, 'sagittarius', sx, standY(210), 210, t, { mood: t > 31.8 ? 'heart' : 'happy', look: [-1, 0], hops: [...hop, ...hopsOf(SP.sag).filter(h => h < 33)], seed: 8 })
      plant(sx - 120, 1360 - Math.abs(Math.sin((t - T.sagIn[0]) * 8.7)) * (t < T.sagIn[1] ? 14 : 0), 1)
      if (t > T.heart) sparkles(c, t, 1010, 1180, T.heart, 10, 160, 4, [PINK, ML_GOLD, BONE])
    })
  }
  function tableScene(t, st) {
    const zoom = st.zoom || 1, [fx, fy] = st.focus || [540, 1150]
    x.save()
    if (st.shake) { x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920) }
    if (zoom !== 1 || st.shake) { x.translate(fx, fy + (st.shake || 0)); x.scale(zoom, zoom); x.translate(-fx, -fy) }
    drawCafe(x, t, { behind: c => drawSign(c, 'taurus', 730, standY(200, 925), 200, t, st.taurus || { mood: 'happy', look: [0, 1], seed: 9 }) })
    if (st.spot) spotlight(t, st.spot.x, st.spot.a)
    for (const [k, o] of st.row) {
      if (!o) continue
      const size = o.size || ROW_S, feet = o.feet || ROW_FEET, sx = o.x ?? SEAT[k === 'sagittarius' ? 'sag' : k]
      if (k === 'pisces') drawPisces(x, sx, standY(size, feet), size, t, o)
      else S(k, sx, feet, size, t, o)
    }
    longTable(t, st.table || {})
    if (st.after) st.after(t)
    x.restore()
  }
  function act1c(t) {
    const enter = ease.outCubic(prog(t, ...T.enter))
    const turned = t > T.turn
    const lk = turned ? [1, 0] : [0, 1]
    const stare = turned && t < 36.5
    tableScene(t, {
      row: [
        ['leo', { mood: stare ? 'wide' : 'happy', look: lk, seed: 5, hops: t < 36.5 ? [T.turn] : [] }],
        ['virgo', { mood: stare ? 'wide' : 'squint', look: lk, seed: 7, hops: [T.turn + 0.05] }],
        ['pisces', { x: SEAT.cancer, mood: stare ? 'wide' : 'sparkle', look: lk, tears: turned ? 2 : 1, hops: [T.turn + 0.1] }],
      ],
      taurus: { mood: t > 37 ? 'happy' : stare ? 'wide' : 'happy', look: turned ? [1, 1] : [0, 1], seed: 9, hops: [T.turn + 0.15, ...hopsOf(SP.taurus).filter(h => h > 36 && h < 40)] },
      table: { mountain: prog(t, ...T.mountain) },
      after: tt => {
        const cx = lerp(1260, 760, enter)
        S('cancer', cx, 1500, 210, tt, { mood: tt > 37.7 ? 'wide' : 'happy', look: tt > 37.7 ? [0, -1] : [-1, 0], seed: 3, hops: [T.enter[0] + 0.1, T.enter[0] + 0.45] })
        S('sagittarius', cx + 200, 1500, 200, tt, { mood: tt > 34.5 && tt < 37.7 ? 'neutral' : tt > 37.7 ? 'wide' : 'happy', look: tt > 37.7 ? [0, -1] : [-1, 0], seed: 8, hops: [T.enter[0] + 0.2, T.enter[0] + 0.55], squash: tt > 34 && tt < 37.5 ? 0.04 : 0 })
        plant(cx + 330, 1480, 0.8)
        // the silence after everyone turns
        if (tt > T.turn + 0.2 && tt < 35.4) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(tt, T.turn + 0.2, 35.4)); x.font = `700 32px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('* stare *', 330, 1080); x.restore() }
      },
    })
  }
  function act2(t) {
    const leoUp = ease.outBack(prog(t, ...T.leoUp)) * (1 - ease.inOutCubic(prog(t, ...T.leoDown)))
    const shrink = clamp(0.12 * prog(t, 42, 44.5) + 0.16 * prog(t, 50, 53) + 0.18 * prog(t, 55, 56) + 0.08 * prog(t, 59.6, 61))
    const z = ease.inOutCubic(prog(t, ...T.zoomIn)) * (1 - ease.outCubic(prog(t, ...T.zoomOut)))
    const dtNo = t - T.no, shake = dtNo > 0 && dtNo < 0.5 ? 16 * Math.exp(-dtNo * 9) * Math.sin(dtNo * 60) : 0
    const no = t > T.no && t < 67.4
    const virgoQ = t > T.qs[0] - 0.3 && t < 54.5
    const leoMood = no ? 'wide' : leoUp > 0.2 ? 'sparkle' : t > 47 && t < 54.6 ? 'eyeroll' : 'happy'
    const sagMood = t > 59.5 ? 'neutral' : t > 41 ? 'wide' : 'happy'
    const cMood = no ? 'happy' : t > 61.4 ? 'wide' : t > 44.6 ? 'squint' : 'happy'
    tableScene(t, {
      zoom: 1 + 0.55 * z, focus: [SEAT.cancer, 1160], shake,
      spot: { x: SEAT.leo + 40, a: leoUp },
      taurus: { mood: no ? 'wide' : t > T.bread ? 'sparkle' : 'happy', look: [-1, 1], seed: 9, hops: [T.no, T.bread + 0.1] },
      row: [
        ['leo', { mood: leoMood, look: virgoQ ? [1, 0] : undefined, size: ROW_S + 30 * leoUp, feet: ROW_FEET - 70 * leoUp, seed: 5, hops: [...hopsOf(SP.leo).filter(h => h > 40 && h < 47), T.no] }],
        ['virgo', { mood: no ? 'wide' : virgoQ ? 'squint' : 'neutral', look: virgoQ ? [1, 0] : [-1, -1], seed: 7, hops: [...hopsOf(SP.virgo).filter(h => h > 46 && h < 54), ...T.qs, T.no + 0.04] }],
        ['cancer', { mood: cMood, look: t > 59.5 && t < 61.4 ? [1, 0] : undefined, seed: 3, hops: [...hopsOf(SP.cancer).filter(h => h > 60 && h < 66)], squash: t > 61.4 && t < 64 ? 0.06 * Math.sin(t * 30) : 0 }],
        ['sagittarius', { mood: sagMood, look: t > 59.5 ? [0, 1] : [-1, 0], size: ROW_S * (1 - shrink), seed: 8 }],
        ['pisces', { mood: t > T.pisFloods ? 'wide' : 'sparkle', tears: t > T.pisFloods && t < 60 ? 3 : 2, look: [-1, 0], hops: [T.pisFloods, T.no + 0.08], pull: clamp(prog(t, 55.5, 56.4)) }],
      ],
      table: { mountain: t < 41 ? 1 - prog(t, 40.0, 40.6) : 0 },
      after: tt => {
        notes(tt, SEAT.leo + 40, 1000, 43.5, 46.4)
        const qs = ['five-year plan?', 'how do you load a dishwasher?', 'favorite vegetable? why?', 'question four—']
        qs.forEach((q, i) => drawBubble(x, 560 + [0, 60, 20, -20][i], 1060 - i * 92, q, { size: 28, col: '#d9ffe6', tail: i ? null : 'down', k: pop01(tt, T.qs[i], 0.25, 2.4) * outK(tt, [54.2, 54.5]) }))
        if (tt > 57.2 && tt < 69.6) drawBubble(x, SEAT.sag + 30, 1110, '…', { size: 30, k: pop01(tt, 57.4, 0.3, 2) * outK(tt, [69.2, 69.5]) })
        scrapbook(SEAT.cancer + 10, 1110, pop01(tt, T.book, 0.3, 2) * outK(tt, [T.no + 0.15, T.no + 0.35]), tt)
      },
    })
    stamp(t, T.stamp2, 'RULE 2: BROKEN', 760)
    stamp(t, T.stamp3, 'RULE 3: BROKEN', 760)
    stamp(t, T.stamp4, 'RULE 4: BROKEN', 760)
    // the panic: a dark vignette while Cancer spirals
    const v = ease.inOutCubic(prog(t, 61.2, 62.4)) * (1 - prog(t, T.no, T.no + 0.2))
    if (v > 0.01) { const g = x.createRadialGradient(540, 1100, 200, 540, 1100, 1100); g.addColorStop(0, 'rgba(6,4,20,0)'); g.addColorStop(1, `rgba(6,4,20,${0.75 * v})`); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920) }
    if (t > T.no && t < T.no + 0.8) sparkles(x, t, 540, 1050, T.no, 12, 260, 7, ['#ff6b6b', BONE, ML_GOLD])
  }
  function kitchenDoor() {
    R(56, 936, 248, 324, INK); R(66, 946, 228, 314, '#7a4030'); R(76, 956, 208, 294, '#9a5a40')
    R(130, 990, 100, 100, INK); R(140, 1000, 80, 80, '#ffe2a0'); R(150, 1010, 24, 20, '#fff8e0')
    R(80, 1120, 200, 8, '#6a3628'); R(260, 1100, 14, 40, ML_GOLD)
  }
  function act3a(t) {
    drawCafe(x, t, {})
    kitchenDoor()
    // Pisces peeking in from the right edge (crying, obviously), then Taurus' arm… er, star pulls them back
    const peek = ease.outBack(prog(t, 94.4, 94.9)) * (1 - ease.inCubic(prog(t, 96.4, 96.8)))
    if (peek > 0.01) drawPisces(x, lerp(1180, 1010, peek), standY(150, 1340), 150, t, { tears: 3, mood: 'happy', look: [-1, 0], box: false })
    S('cancer', 400, 1470, 240, t, { mood: t > 95.3 ? 'happy' : 'neutral', look: [1, 0], seed: 3, hops: hopsOf(SP.cancer).filter(h => h > 90 && h < 98.5), blush: t > 95 })
    S('sagittarius', 690, 1470, 230, t, { mood: t > 97.6 ? 'sparkle' : t > 93.4 ? 'happy' : 'neutral', look: [-1, 0], seed: 8, hops: [...hopsOf(SP.sag).filter(h => h > 92 && h < 98), 97.7] })
  }
  function act3b(t) {
    const grow = ease.outBack(prog(t, ...T.sagGrow))
    const dealing = t > T.deal[0] - 0.6 && t < T.deal[3] + 0.4
    tableScene(t, {
      taurus: { mood: t > T.deal[3] ? 'heart' : 'happy', look: [0, 1], seed: 9, hops: [T.deal[3] + 0.05] },
      row: [
        ['leo', { mood: t > T.deal[0] ? 'sparkle' : 'happy', look: t < 101.5 ? [1, 0] : undefined, seed: 5, hops: [T.deal[0] + 0.05, ...hopsOf(SP.leo).filter(h => h > 99)] }],
        ['virgo', { mood: t > T.deal[1] ? 'heart' : 'neutral', look: [1, 0], seed: 7, hops: [T.deal[1] + 0.05] }],
        ['cancer', { mood: t > T.deal[2] ? 'heart' : 'happy', look: [1, 0], seed: 3, hops: [T.deal[2] + 0.05] }],
        ['sagittarius', { mood: dealing ? 'sparkle' : 'happy', look: dealing ? undefined : [-1, 0], size: ROW_S * lerp(0.7, 1.08, grow), feet: ROW_FEET - 10, seed: 8, hops: [...T.deal.map(d => d - 0.5), 102.2] }],
        ['pisces', { mood: 'happy', tears: 3, look: [-1, 0], seed: 12, hops: [T.deal[3] + 0.6] }],
      ],
      table: { dessert: 1 },
      after: tt => {
        // the dessert deck in Sag's hand
        if (tt < T.deal[3] + 0.2) { const left = 4 - T.deal.filter(d => tt > d - 0.45).length; for (let i = 0; i < left; i++) drawPastry(x, SEAT.sag + 24, TABLE_Y - 190 - i * 18, 4, 'cake') }
        sparkles(x, tt, SEAT.sag, 1150, T.sagGrow[1] - 0.2, 10, 170, 9, [ML_GOLD, '#d9a6ff', BONE])
      },
    })
  }
  function tag(t) {
    drawCafe(x, t, { view: 'late', chairsUp: 0.9, behind: c => drawPisces(c, 700, standY(160, 925), 160, t, { tears: 2, mood: 'happy', look: [-1, 1], box: false }) })
    const li = ease.outCubic(prog(t, ...T.libIn))
    S('scorpio', CAFE.seats[1].x, CAFE.seats[1].y, 220, t, { mood: t > T.scoLook + 0.9 ? 'wink' : 'neutral', look: t > T.scoLook ? [-1, 0] : [0, 1], seed: 11, hops: [T.scoLook + 0.9] })
    S('libra', lerp(-160, CAFE.seats[0].x, li), CAFE.seats[0].y, 220, t, { mood: t > 109.2 ? 'happy' : 'sparkle', look: t > T.scoLook + 0.3 ? [1, 0] : [0, -1], seed: 10, hops: [T.libIn[0] + 0.1, T.libIn[0] + 0.45], blush: true })
    drawCafeTable(x, t, { cups: 1, pastry: 'bun' })
    drawBubble(x, 380, 1080, 'oh! is this seat… free?', { size: 28, col: '#ffe0ef', k: pop01(t, 109.0, 0.25, 2.4) * outK(t, [111.2, 111.5]) })
    drawBubble(x, 790, 1060, 'mm-hm.', { size: 30, k: pop01(t, T.scoLook + 0.9, 0.25, 2.4) * outK(t, [111.2, 111.5]) })
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

// card-cut candidates (cardfx plays the middle one: 40.0, the table reshuffles into Act 2)
const CUTS = [23.4, { t: 40.0, kind: 'flip' }, 90.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
export const CUES = [
  ...previouslyCues(T.prev, 3, 2),
  ...CAPS.flatMap(c => captionCues(c)),
  ['pop', T.leoQ, 880, 0.04, 0.3], ['pop', T.cancerX, 1318.51, 0.05, -0.2], ['tom', T.cancerX, 110, { gain: 0.18, decay: 0.2 }],
  ...titleCues(T.title, 3),
  // act 1a: the clipboard, ticks, Pisces' burst
  ['whoosh', 10.35, 0.4, 0.04], ['tick', 10.7, 0.05],
  ...T.rule.map((r, i) => ['pop', r3(r), NOTE[i % 6], 0.035, -0.2]), ...T.rule.map((r, i) => ['tick', r3(r + (i === 3 ? 0.25 : 0.55)), 0.06]),
  ['pluck', T.pisBurst, 1318.51, 0.04, 0.6, 0.4], ['glitter', T.pisBurst, r3(T.pisBurst + 0.4)],
  // act 1b: lamps, Sag hops in, the heart
  ['tick', T.lamps, 0.04], ['tick', r3(T.lamps + 0.32), 0.04], ['tick', r3(T.lamps + 0.64), 0.04],
  ...Array.from({ length: 5 }, (_, i) => ['pop', r3(T.sagIn[0] + i * 0.36), 587.33 + i * 40, 0.02, 0.4]),
  ['pluck', T.heart, 1318.51, 0.045, 0.6, -0.2], ['glitter', T.heart, r3(T.heart + 0.5)],
  // act 1c: the door, the stare, the mountain
  ['bell', T.enter[0], 2349.32, 0.03, 1.0, 0.5], ['whoosh', T.turn, 0.3, 0.05], ['tick', r3(T.turn + 0.05), 0.06],
  ...Array.from({ length: 8 }, (_, i) => ['pop', r3(T.mountain[0] + i * 0.1), NOTE[i % 6], 0.025, 0.3]),
  // act 2
  ['whoosh', T.leoUp[0], 0.4, 0.04], ['riser', 43.5, 44.5, 0.025], ['boom', T.stamp2, 0.25], ['tick', T.stamp2, 0.07],
  ...T.qs.map((q, i) => ['pop', q, NOTE[(i * 2) % 6], 0.04, 0.1]), ['boom', T.stamp3, 0.25], ['tick', T.stamp3, 0.07],
  ['pluck', T.pisFloods, 1567.98, 0.04, 0.5, 0.4], ['boom', T.stamp4, 0.25], ['tick', T.stamp4, 0.07],
  ['riser', T.zoomIn[0], T.zoomIn[1] + 1.2, 0.03], ['pop', T.book, 1174.66, 0.04, 0], ['glitter', T.book, r3(T.book + 0.4)],
  ['boom', T.no, 0.32], ['tom', T.no, 92, { gain: 0.3, decay: 0.3 }], ['tick', T.no, 0.07],
  ...talkCues(ALL_LINES, { cps: CPS }),
  ...adviseCues({ at: T.adv, cards: ADV_CARDS, lines: ADV_LINES }),
  // act 3
  ['pop', 94.5, 987.77, 0.025, 0.5], ['whoosh', 96.45, 0.3, 0.025],
  ['riser', T.sagGrow[0], T.sagGrow[1], 0.025], ['glitter', T.sagGrow[1] - 0.2, T.sagGrow[1] + 0.4],
  ...T.deal.flatMap((d, i) => [['whoosh', r3(d - 0.45), 0.25, 0.035], ['pop', d, NOTE[(i * 2 + 1) % 6], 0.045, (i - 1.5) * 0.3]]),
  ...lessonCues(T.lesson, { text: 'Include, | don’t *spotlight.*', chip: '+1 SEAT AT THE TABLE' }),
  // tag
  ['whoosh', T.libIn[0], 0.3, 0.03], ['pop', 109.0, 1174.66, 0.03, -0.3], ['pop', r3(T.scoLook + 0.9), 739.99, 0.035, 0.3],
  ...nextTimeCues(T.next),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
