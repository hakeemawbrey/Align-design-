// kpjue09 · PLANET TALK: JUPITER → SAGITTARIUS (home sign, LONG) · "Sagittarius Packs for Two" (75 s, star_talk, hard cut).
//   0.0  frame 0: Jupiter crashing into an airport departure board, every flap mid-flip to JUPITER, Sagittarius mid-run
//        with a suitcase. Hook "SAGITTARIUS. Freeze. Uncle's here." Record scratch + freeze: "wait till you see the
//        suitcase." (the promised payoff)
//   3.2  ch1 THE ESCAPE: the crush texted "I really like you"; Sag booked a flight within a minute.
//  17.2  ch2 THE SUITCASE: passport, snacks, sunglasses… and THEIR hoodie (caught). Pisces the gate agent cries.
//  31.2  ch3 UNCLE'S STORY: ~12 years round the Sun → in astrology a year in each sign. Travel AND stay.
//        "Commitment isn't a cage. It's a travel buddy."
//  50.0  ch4 THE TEXT: "want to come with me?" "where??" "anywhere. together." "packing."
//  62.0  ch5 THE GATE: the crush runs in with a suitcase, two passports, Pisces sobs on the PA.
//  70.2  "Packed for two. Finally." hard cut at 75.
import { drawSpace, drawSign, drawPlanet, entrance, drawEntranceFx, entranceCues, planetSize } from '../../planetkit.js'
import { recordScratch, recordScratchCues, chapter, chapterCues, caught, caughtCues, screenShake, shakeCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, phone, sticker, pr, easeOut, easeInOut, back, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 75
const JS = planetSize('jupiter', 500)
const IN = { at: -0.63, x: 540, y: 560, size: JS }
const HOOK = { at: -1, text: 'SAGITTARIUS. | Freeze. *Uncle’s* here.', top: 1010, size: 98, out: [2.9, 3.15] }
const REC = { at: 0.55, len: 1.7, caption: 'wait till you see the *suitcase.*', sub: 'chapter 0 · the escape attempt', top: 1300 }
const SHAKE = { at: 0.15, len: 0.5, amp: 26 }
const CH = [
  { at: 3.2, out: [16.8, 17.1], n: 1, title: 'The Escape', y: 150 },
  { at: 17.2, out: [30.8, 31.1], n: 2, title: 'The Suitcase', y: 150 },
  { at: 31.2, out: [49.6, 49.9], n: 3, title: 'Uncle’s Story', y: 150 },
  { at: 50.0, out: [61.6, 61.9], n: 4, title: 'The Text', y: 150 },
  { at: 62.0, out: [74.0, 74.3], n: 5, title: 'The Gate', y: 150 },
]
const OPEN = 17.6, CAUGHT = { at: 22.4, x: 760, y: 1400, r: 120, out: [25.6, 25.9], label: 'THEIR HOODIE', arrow: 'tl' }
const STORY = 31.2, TEXT = 50.0, GATE = 62.0

const B = [
  { t0: 3.6, t1: 7.4, x: 540, y: 1250, who: 'sagittarius', text: 'They texted *“I really like you.”* So obviously… I booked a flight.', tail: 0, maxW: 760 },
  { t0: 7.6, t1: 10.6, x: 540, y: 1250, who: 'jupiter', text: 'Within a *minute,* kiddo?', tail: 0, tailUp: true },
  { t0: 10.8, t1: 14.2, x: 540, y: 1250, who: 'sagittarius', text: 'Feelings got big. So I went *bigger.* It’s my move!', tail: 0 },
  { t0: 14.4, t1: 17.0, x: 540, y: 1250, who: 'jupiter', text: 'Open the *suitcase.*', tail: 0, tailUp: true },
  { t0: 19.0, t1: 22.0, x: 540, y: 1250, who: 'sagittarius', text: 'Passport. Snacks. Sunglasses. *And…*', tail: 0 },
  { t0: 22.2, t1: 25.0, x: 540, y: 1250, who: 'jupiter', text: '…*their* hoodie, kiddo.', tail: 0, tailUp: true },
  { t0: 25.2, t1: 28.6, x: 540, y: 1250, who: 'sagittarius', text: 'It’s… *very soft.*', tail: 0 },
  { t0: 28.8, t1: 31.0, x: 560, y: 1250, who: 'pisces', text: 'this is so *romantic* 😭 sorry', tail: 120, maxW: 600 },
  { t0: 31.6, t1: 36.0, x: 540, y: 960, who: 'jupiter', text: 'Let me tell you something. I take about *12 years* to go round the Sun.', tail: 0, tailUp: true, maxW: 760 },
  { t0: 36.2, t1: 41.0, x: 540, y: 960, who: 'jupiter', text: 'So in astrology, I spend about a year in each sign. I *travel.* And I *stay.*', tail: 0, tailUp: true, maxW: 760 },
  { t0: 41.2, t1: 45.6, x: 540, y: 960, who: 'jupiter', text: 'Commitment isn’t a cage, kiddo. It’s a *travel buddy.*', tail: 0, tailUp: true, maxW: 740 },
  { t0: 45.8, t1: 49.6, x: 540, y: 1460, who: 'sagittarius', text: '…a *travel buddy.*', tail: 0 },
  { t0: 58.0, t1: 61.8, x: 540, y: 1400, who: 'sagittarius', text: 'They said *YES.*', tail: 0 },
  { t0: 64.0, t1: 66.8, x: 360, y: 1250, who: 'gemini', text: 'Wait for *me!*', tail: -80 },
  { t0: 67.0, t1: 70.0, x: 600, y: 1250, who: 'pisces', text: 'NOW BOARDING: *two hearts* 😭', tail: 80, maxW: 600 },
  { t0: 70.2, t1: 76, x: 600, y: 1250, who: 'sagittarius', text: 'Packed for two. *Finally.*', tail: 60 },
]
const DESTS = ['LISBON', 'TOKYO', 'LIMA', 'MONTRÉAL']

function board(x, t, alpha, mode) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha
  x.fillStyle = '#0d0a14'; rr(x, 70, 200, 940, 480, 24); x.fill(); x.strokeStyle = '#3a2b6b'; x.lineWidth = 10; x.stroke()
  x.fillStyle = GOLD; x.font = '800 34px Inter'; x.fillText('DEPARTURES', 110, 260)
  for (let r = 0; r < 4; r++) {
    let word = DESTS[r]
    if (mode === 'jupiter') { const flip = pr(t, -0.6 + r * 0.12, 0.2 + r * 0.12); word = flip >= 1 ? 'JUPITER' : flip > 0 ? 'XQWZRKA'.split('').map((c, i) => String.fromCharCode(65 + ((Math.floor(t * 30) + i * 7 + r) % 26))).join('') : word }
    if (mode === 'anywhere') word = r % 2 ? 'ANYWHERE ELSE' : 'ANYWHERE BUT HERE'
    if (mode === 'gate') word = r === 0 ? 'ANYWHERE FOR 2' : DESTS[r]
    const y = 300 + r * 88
    for (let c = 0; c < 17; c++) { x.fillStyle = '#1d1828'; x.fillRect(110 + c * 50, y, 44, 66); x.fillStyle = '#0d0a14'; x.fillRect(110 + c * 50, y + 32, 44, 2) }
    x.fillStyle = mode === 'gate' && r === 0 ? '#7dffb0' : '#f6efe0'; x.font = '700 44px "Space Mono", monospace'
    word.split('').forEach((ch, c) => { if (c < 17) x.fillText(ch, 118 + c * 50, y + 50) })
  }
  x.restore()
}

function suitcase(x, t, X, Y, open) {
  x.save(); x.translate(X, Y)
  x.fillStyle = '#d9573b'; x.strokeStyle = INK; x.lineWidth = 8
  if (open > 0) {
    x.save(); x.translate(0, -110); x.rotate(-1.9 * open); x.fillStyle = '#c24a32'; rr(x, -170, -10, 340, 30 + 0 * open, 10); x.fill(); x.stroke()
    x.fillRect(-170, 0, 340, 0); x.restore()
    x.fillStyle = '#5b2a20'; rr(x, -170, -110, 340, 220, 20); x.fill(); x.stroke()
  } else {
    rr(x, -170, -110, 340, 220, 20); x.fill(); x.stroke()
    x.fillStyle = GOLD; x.fillRect(-30, -130, 60, 20)
    ;['✈', '★', '♐︎'].forEach((s, i) => { x.save(); x.translate(-100 + i * 90, 0); x.rotate((i - 1) * 0.2); x.fillStyle = [BONE, '#7fe0ff', GOLD][i]; rr(x, -36, -30, 72, 60, 10); x.fill(); x.fillStyle = INK; x.font = '800 34px Inter'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore() })
  }
  x.restore()
}

function item(x, kind, X, Y, s = 1) {
  x.save(); x.translate(X, Y); x.scale(s, s); x.strokeStyle = INK; x.lineWidth = 6
  if (kind === 'passport') { x.fillStyle = '#2c3e8f'; rr(x, -50, -66, 100, 132, 10); x.fill(); x.stroke(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, -10, 22, 0, Math.PI * 2); x.fill() }
  if (kind === 'snacks') { x.fillStyle = GOLD; rr(x, -56, -40, 112, 80, 14); x.fill(); x.stroke(); x.fillStyle = INK; x.font = '800 22px Inter'; x.textAlign = 'center'; x.fillText('SNACKS', 0, 8) }
  if (kind === 'shades') { x.fillStyle = INK; x.beginPath(); x.ellipse(-36, 0, 32, 24, 0, 0, Math.PI * 2); x.ellipse(36, 0, 32, 24, 0, 0, Math.PI * 2); x.fill(); x.fillRect(-6, -6, 12, 6) }
  if (kind === 'hoodie') { x.fillStyle = '#ff8fb1'; x.beginPath(); x.moveTo(-90, -40); x.lineTo(-40, -70); x.quadraticCurveTo(0, -40, 40, -70); x.lineTo(90, -40); x.lineTo(70, 0); x.lineTo(55, -10); x.lineTo(55, 80); x.lineTo(-55, 80); x.lineTo(-55, -10); x.lineTo(-70, 0); x.closePath(); x.fill(); x.stroke(); x.fillStyle = '#ff6f9d'; rr(x, -35, 20, 70, 36, 10); x.fill() }
  x.restore()
}

function orbit(x, t, cx, cy, R) {
  // the zodiac ring as a lens: Jupiter's ~12-year lap, about a year per sign (astrology framing)
  x.save()
  x.strokeStyle = 'rgba(242,199,92,0.5)'; x.lineWidth = 4; x.setLineDash([10, 10]); x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
  const G = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
  const lap = pr(t, 36.2, 41.0) * 12, cur = Math.floor(lap) % 12
  G.forEach((g, i) => {
    const a = -Math.PI / 2 + i / 12 * Math.PI * 2, gx = cx + Math.cos(a) * (R + 62), gy = cy + Math.sin(a) * (R + 62)
    x.fillStyle = i === cur && t > 36.2 ? GOLD : 'rgba(20,11,46,0.9)'; x.beginPath(); x.arc(gx, gy, 34, 0, Math.PI * 2); x.fill(); x.strokeStyle = GOLD; x.lineWidth = 3; x.stroke()
    x.fillStyle = i === cur && t > 36.2 ? INK : BONE; x.font = '700 36px "Space Mono", monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(g + '︎', gx, gy + 2)
  })
  // the Sun in the middle, little Jupiter on its lap
  drawPlanet(x, 'sun', cx, cy, 110, t, { mood: 'happy', glow: 0.6, bob: 0 })
  const a = -Math.PI / 2 + (t < 36.2 ? (t - 31.2) * 0.25 : lap / 12 * Math.PI * 2)
  drawPlanet(x, 'jupiter', cx + Math.cos(a) * R, cy + Math.sin(a) * R, 70, t, { mood: 'happy', glow: 0.4, bob: 0, blink: false })
  if (t > 36.2 && t < 41) { x.fillStyle = BONE; x.font = '800 30px Inter'; x.textAlign = 'center'; x.fillText(`year ${Math.min(12, Math.floor(lap) + 1)}`, cx, cy + 90) }
  x.restore()
}

function draw(x, t, H) {
  drawSpace(x, t, { planet: 'jupiter', seed: 23 })
  // the terminal floor
  x.fillStyle = '#231a3c'; x.fillRect(0, 1640, 1080, 280); x.strokeStyle = 'rgba(242,199,92,0.5)'; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 1640); x.lineTo(1080, 1640); x.stroke()
  const story = t > STORY && t < TEXT
  // departures board (hidden during the story)
  const bA = 1 - pr(t, STORY, STORY + 0.4) * (1 - pr(t, GATE - 0.4, GATE))
  const mode = t < 3 ? 'jupiter' : t > 10.8 && t < 14.4 ? 'anywhere' : t > GATE ? 'gate' : 'normal'
  board(x, t, bA, mode)
  if (story) {
    const k = easeOut(pr(t, STORY, STORY + 0.5)) * (1 - pr(t, TEXT - 0.5, TEXT))
    x.save(); x.globalAlpha = k; orbit(x, t, 540, 1290, 210); x.restore()
    if (t > 32.8 && t < 36.0) sticker(x, 'TRUE: ~12 YEARS PER LAP', 540, 1620, { size: 32, bg: '#7dffb0', rot: -0.04, scale: easeOut(pr(t, 32.8, 33.1)) })
    if (t > 41.6 && t < 45.6) sticker(x, 'CAGE ✕   TRAVEL BUDDY ✓', 540, 1620, { size: 34, rot: 0.04, scale: easeOut(pr(t, 41.8, 42.1)) })
  }
  // Jupiter
  const P = entrance('crash', t, IN)
  drawEntranceFx(x, 'jupiter', 'crash', t, IN)
  const jMood = t < 3 ? 'wide' : t < 17 ? 'sly' : t < 31 ? 'happy' : t < 50 ? 'proud' : 'happy'
  const down = easeInOut(pr(t, 2.9, 3.5)) * (1 - easeInOut(pr(t, STORY, STORY + 0.5)) * (1 - easeInOut(pr(t, GATE - 0.5, GATE))))
  const jy = 340 * down - (story ? 40 : 0), jsz = P.size * (1 - 0.22 * down)
  drawJupiter(x, P.x, P.y + jy, jsz, t, { rot: P.rot, squash: P.squash, mood: t > 31.6 && t < 45.6 ? 'happy' : jMood, lines: H.lines, look: [0, 0.9], hops: [7.7, 14.5, 22.3, 31.7, 41.3, 58.2, 70.4], tears: t > 66 ? 1 : 0 })
  // Sagittarius + the suitcase
  const run = t < 3.0
  const sagX = story ? 540 : t > TEXT && t < GATE ? 840 : t > GATE ? 720 : 360
  const sagY = story ? 1660 : t > TEXT && t < GATE ? 1560 : 1500
  const stride = run ? Math.sin(t * 30) : 0
  const sagMood = t < 3 ? 'wide' : t < 10.8 ? 'happy' : t < 14.4 ? 'wink' : t < 22.2 ? 'neutral' : t < 28.8 ? 'heart' : t < 45.8 ? 'neutral' : t < 50 ? 'sparkle' : t < 58 ? 'wide' : 'happy'
  if (!story && t < TEXT) {
    const op = easeOut(pr(t, OPEN, OPEN + 0.4)) * (1 - pr(t, 30.6, 31.0))
    suitcase(x, t, 760 + (run ? -60 + stride * 10 : 0), 1540, op)
    if (op > 0) {
      ;[['passport', 620, 1390, 18.9], ['snacks', 760, 1340, 19.7], ['shades', 900, 1390, 20.5], ['hoodie', 760, 1400, 22.2]].forEach(([k, ix, iy, at]) => {
        const p = back(pr(t, at - 0.3, at), 2)
        if (p > 0) item(x, k, 760 + (ix - 760) * Math.min(1, p), 1520 + (iy - 1520) * Math.min(1, p), (k === 'hoodie' ? 1.25 : 1) * Math.min(1, p) * (1 - pr(t, 30.6, 31)))
      })
    }
  }
  if (t > GATE) { suitcase(x, t, 900, 1560, 0); item(x, 'passport', 860, 1390, 0.8 * easeOut(pr(t, 70.0, 70.4))); item(x, 'passport', 950, 1390, 0.8 * easeOut(pr(t, 70.3, 70.7))) }
  drawSign(x, 'sagittarius', sagX + (run ? 40 * stride : 0), sagY - Math.abs(stride) * 30, story ? 240 : 290, t, { mood: sagMood, lines: H.lines, look: story ? [0, -1] : [0.4, -1], hops: [11, 46, 58.2, 58.7, 59.2, 70.5], shadow: true, squash: run ? 0.08 * stride : 0, sweat: run })
  if (t > 4.4 && t < 10.6) sticker(x, 'FLIGHT BOOKED IN 0:58', 760, 1390, { size: 34, bg: '#ff8fb1', rot: -0.05, scale: easeOut(pr(t, 7.8, 8.1)) })
  // ch1 phone with the text that started it
  const ph1 = easeOut(pr(t, 3.6, 4.0)) * (1 - pr(t, 7.2, 7.6))
  if (ph1 > 0) phone(x, 800, 1470, 340, 360, { title: 'them', scale: ph1, msgs: [{ text: 'I really like you', at: 3.9 }], t })
  // Pisces the gate agent (ch2 cameo, ch5)
  const pk2 = easeOut(pr(t, 28.6, 29.0)) * (1 - pr(t, 30.8, 31.1))
  if (pk2 > 0) { pisces(x, 940, 1330, 220, t, { pop: pk2, hops: [29.3, 30] }); sticker(x, 'GATE AGENT', 940, 1200, { size: 24, scale: pk2, bg: '#c9a6ff' }) }
  // ch4: the text
  const ph = easeOut(pr(t, TEXT + 0.1, TEXT + 0.5)) * (1 - pr(t, GATE - 0.4, GATE))
  if (ph > 0) phone(x, 420, 1240, 560, 700, { title: 'them', scale: ph, t, glow: 0.4, msgs: [
    { text: 'want to come with me?', me: true, at: 51.0 }, { text: 'where??', at: 53.4 }, { text: 'anywhere. together.', me: true, at: 55.2 }, { text: 'packing. ♥', at: 57.2 },
  ] })
  if (t > 51.6 && t < 53.4) { x.fillStyle = BONE; for (let i = 0; i < 3; i++) { x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(t * 6 + i)); x.beginPath(); x.arc(210 + i * 30, 1460, 10, 0, Math.PI * 2); x.fill() } x.globalAlpha = 1 }
  // ch5: the crush runs in; Pisces on the gate desk
  if (t > GATE) {
    const ck = easeOut(pr(t, GATE + 0.6, GATE + 1.6))
    drawSign(x, 'gemini', -200 + 560 * ck, 1500 - (ck < 1 ? Math.abs(Math.sin(t * 28)) * 30 : 0), 270, t, { mood: ck < 1 ? 'wide' : 'happy', lines: H.lines, look: [1, 0], hops: [64.2, 70.6], shadow: true })
    if (ck > 0.2) suitcase(x, t, -320 + 560 * ck, 1580, 0)
    x.fillStyle = '#3a2350'; rr(x, 800, 1020, 260, 80, 14); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke()
    pisces(x, 930, 960, 200, t, { hops: [67.2, 67.9, 68.6] })
    sticker(x, 'GATE 9 · ANYWHERE', 260, 760, { size: 30, rot: -0.04, bg: GOLD })
  }
  if (t > 59.8 && t < 61.8) for (let i = 0; i < 10; i++) { const k = pr(t, 59.8 + i * 0.1, 61.2 + i * 0.1); x.globalAlpha = Math.max(0, 1 - k); x.fillStyle = ['#ff8fb1', GOLD, '#7fe0ff'][i % 3]; x.fillRect(840 + Math.cos(i) * 300 * k, 1400 - 500 * k + Math.sin(i * 3) * 60, 18, 18); x.globalAlpha = 1 }
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK, freeze: [REC],
  overlays: [[screenShake(SHAKE), shakeCues(SHAKE)], [recordScratch(REC), recordScratchCues(REC)], ...CH.map(c => [chapter(c), chapterCues(c)]), [caught(CAUGHT), caughtCues(CAUGHT)]],
  cues: [...entranceCues('crash', IN), ...Array.from({ length: 12 }, (_, i) => ['tick', +(i * 0.06).toFixed(2), 0.05]), ['pop', 3.9, 1046.5, 0.05, 0], ['riser', 10.6, 11.0, 0.06],
    ['boom', OPEN, 0.2], ['pop', 18.9, 660, 0.05, 0], ['pop', 19.7, 740, 0.05, 0], ['pop', 20.5, 830, 0.05, 0], ['glitter', 28.8, 30.0],
    ['bell', 32.8, 1046.5, 0.05, 1.4, 0], ...Array.from({ length: 12 }, (_, i) => ['pluck', +(36.2 + i * 0.4).toFixed(2), 523.25 * 2 ** ([0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 4][i] / 12), 0.04, 0.4, 0]),
    ['pop', 51.0, 1200, 0.05, 0], ['bell', 53.4, 1568, 0.05, 0.8, 0], ['pop', 55.2, 1200, 0.05, 0], ['bell', 57.2, 1568, 0.06, 1.2, 0], ['glitter', 58.0, 59.6],
    ['whoosh', GATE + 0.6, 0.6, 0.12], ['bell', 67.0, 784, 0.06, 1.2, 0], ['bell', 67.3, 988, 0.06, 1.2, 0], ['glitter', 67.0, 68.6], ['bell', 70.2, 1318.5, 0.06, 1.8, 0]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
