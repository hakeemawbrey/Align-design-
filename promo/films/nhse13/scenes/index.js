// nhse13: HOLIDAY SURVIVAL GUIDE No. 13, "The long drive home" (30 s vertical, star_advice post, music: lofi · Dm).
// The show look lives in ./survkit.js (nhse14–24 import it from here). Story 0–25.6, then the shared end card.
//   0.0–5.4    hook "Six hours. | *One* car." Frame 0: the car seen head-on in sunset traffic; ♑ Capricorn grips the wheel,
//              ♊ Gemini mid-sentence ("and ANOTHER thing—"), ♓ Pisces in the back seat crying at the sunset. The arrival
//              sign ticks the wrong way: 6 H 12 MIN → 6 H 14 MIN. SITUATION: "holiday traffic, two moods."
//   5.4        guide "How to survive: | *the long drive.*"
//   5.4–9.4    1 "Pack snacks for *both* moods." Two bags land on the hood: CRUNCHY (Gemini crunches, crumbs everywhere)
//              and a tidy box of apple slices (Capricorn nods once).
//   9.4–13.4   2 "Take turns picking the sound." Two tapes, GEMINI MIX and CALM DRIVE; a TURN arrow flips between them and
//              each sign bops to its own.
//   13.4–17.4  3 "Stuck in a jam? Pull a *talk card.*" (card cut 13.4) Brake lights everywhere; a talk card flips up in
//              the windshield ("What's a hill you will die on?"); Gemini: "pineapple on pizza." Capricorn: "labelled
//              spice jars." Both crack up.
//   17.4–25.6  THE STARS: "the road is long. make the car *kind*." The car again, at night: Gemini drives now, Capricorn
//              eats an apple slice with its feet up, 2 H 05 MIN, Pisces happy-crying at the stars.
//              endHead "Hour five. | *Still* laughing."  Last line: "Pass the snacks. *Pass* the wheel."
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, RED, MINT, INTER, MONO, PANEL, drawPixelStar } from './survkit.js'

const P = PANEL
const HORIZON = 760

// ── the backdrop: sky, hills and the road receding behind the car (the camera faces the car, so traffic queues behind)
function backdrop(x, t, night) {
  const g = x.createLinearGradient(0, P.y, 0, HORIZON)
  if (night) { g.addColorStop(0, '#0d0b2a'); g.addColorStop(1, '#2a2160') } else { g.addColorStop(0, '#5a3a8a'); g.addColorStop(0.55, '#e8708a'); g.addColorStop(1, '#ffc27a') }
  x.fillStyle = g; x.fillRect(P.x, P.y, P.w, HORIZON - P.y)
  if (night) { for (let i = 0; i < 14; i++) drawPixelStar(x, P.x + 40 + ((i * 137) % (P.w - 80)), P.y + 30 + ((i * 71) % 220), 12 + (i % 3) * 4, 1, BONE) }
  else { x.save(); x.fillStyle = '#ffe9a8'; x.beginPath(); x.arc(780, HORIZON - 30, 70, Math.PI, 0); x.fill(); x.restore() }
  // hills
  x.fillStyle = night ? '#1a1640' : '#7a3f7a'
  x.beginPath(); x.moveTo(P.x, HORIZON); for (let i = 0; i <= 12; i++) x.lineTo(P.x + i * 80, HORIZON - 40 - 30 * Math.sin(i * 1.3)); x.lineTo(P.x + P.w, HORIZON); x.fill()
  R(x, night ? '#16122e' : '#4a2f5a', P.x, HORIZON, P.w, P.y + P.h - HORIZON)
  // the road
  x.fillStyle = night ? '#2a2540' : '#3a3050'
  x.beginPath(); x.moveTo(500, HORIZON); x.lineTo(580, HORIZON); x.lineTo(1000, P.y + P.h); x.lineTo(80, P.y + P.h); x.fill()
  for (let i = 0; i < 6; i++) { const p = ((i / 6 + t * 0.03) % 1), y = lerp(HORIZON, P.y + P.h, p * p), w = lerp(3, 16, p); R(x, '#f2d68a', 540 - w / 2, y, w, lerp(6, 40, p)) }
  // the queue of cars behind: headlights getting smaller toward the horizon
  for (let i = 0; i < 5; i++) {
    const p = 1 - i / 5, y = lerp(HORIZON + 6, 900, p * p), s = lerp(0.12, 0.42, p * p)
    for (const side of [-1, 1]) {
      const cx = 540 + side * 210 * s * 1.6 + (side < 0 ? -10 : 10)
      box(x, cx - 160 * s, y - 70 * s, 320 * s, 90 * s, side < 0 ? '#5a4a8a' : '#3a6a7a', { b: Math.max(2, 5 * s) })
      R(x, '#fff3c0', cx - 130 * s, y - 30 * s, 50 * s, 26 * s); R(x, '#fff3c0', cx + 80 * s, y - 30 * s, 50 * s, 26 * s)
    }
  }
}

// ── our car, head-on; o = { driver, passenger, pis, snacksOnHood, brake }
const CAR = { l: 140, r: 940, roof: 600, glass: [620, 905], hood: 905, bumper: 1080 }
function car(x, t, o) {
  // interior shadow inside the windshield
  x.fillStyle = '#1c1636'
  x.beginPath(); x.moveTo(CAR.l + 90, CAR.glass[0]); x.lineTo(CAR.r - 90, CAR.glass[0]); x.lineTo(CAR.r - 30, CAR.glass[1]); x.lineTo(CAR.l + 30, CAR.glass[1]); x.fill()
  // back seat + Pisces
  R(x, '#3a2f5a', 300, 760, 480, 150)
  if (o.pis) pisces(x, t, o.pis)
  // the two front seats
  const D = o.driver, Q = o.passenger
  star(x, t, Q.sign, Q.o)
  star(x, t, D.sign, D.o)
  // steering wheel in front of the driver (viewer's right)
  const sw = o.wheelTurn ?? 0
  x.save(); x.translate(700, 908); x.rotate(sw)
  x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 70, Math.PI * 1.05, Math.PI * 1.95); x.stroke()
  x.strokeStyle = '#4a4466'; x.lineWidth = 12; x.stroke(); x.restore()
  // glass glare
  x.save(); x.globalAlpha = 0.12; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(CAR.l + 160, CAR.glass[0]); x.lineTo(CAR.l + 260, CAR.glass[0]); x.lineTo(CAR.l + 120, CAR.glass[1]); x.lineTo(CAR.l + 40, CAR.glass[1]); x.fill(); x.restore()
  // pillars + roof
  const body = o.body ?? '#d8443a'
  x.fillStyle = INK; x.beginPath(); x.moveTo(CAR.l + 60, CAR.roof - 10); x.lineTo(CAR.r - 60, CAR.roof - 10); x.lineTo(CAR.r - 70, CAR.glass[0] + 6); x.lineTo(CAR.l + 70, CAR.glass[0] + 6); x.fill()
  x.fillStyle = body; x.beginPath(); x.moveTo(CAR.l + 70, CAR.roof); x.lineTo(CAR.r - 70, CAR.roof); x.lineTo(CAR.r - 80, CAR.glass[0]); x.lineTo(CAR.l + 80, CAR.glass[0]); x.fill()
  for (const d of [-1, 1]) {
    const ex = d < 0 ? CAR.l : CAR.r
    x.fillStyle = INK; x.beginPath(); x.moveTo(ex - d * 66, CAR.roof); x.lineTo(ex - d * 100, CAR.roof); x.lineTo(ex - d * 40, CAR.glass[1]); x.lineTo(ex - d * 6, CAR.glass[1]); x.fill()
    x.fillStyle = body; x.beginPath(); x.moveTo(ex - d * 72, CAR.roof + 4); x.lineTo(ex - d * 92, CAR.roof + 4); x.lineTo(ex - d * 34, CAR.glass[1]); x.lineTo(ex - d * 14, CAR.glass[1]); x.fill()
    // side mirrors
    box(x, ex - (d < 0 ? 70 : -10), 820, 60, 44, body, { b: 5 })
  }
  // hood, grille, headlights, bumper, wheels
  box(x, CAR.l, CAR.hood, CAR.r - CAR.l, CAR.bumper - CAR.hood, body, { b: 7, hi: 'rgba(255,255,255,0.18)' })
  box(x, 400, 975, 280, 70, '#2a2148', { b: 5 })
  for (let i = 0; i < 5; i++) R(x, '#5a5470', 414 + i * 54, 990, 40, 40)
  const hl = o.brake ? '#ff5a5a' : '#fff3c0'
  for (const cx of [230, 850]) { box(x, cx - 70, 960, 140, 64, hl, { b: 5 }); if (!o.brake) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, 992, 10, cx, 992, 150); g.addColorStop(0, 'rgba(255,240,190,0.35)'); g.addColorStop(1, 'rgba(255,240,190,0)'); x.fillStyle = g; x.fillRect(cx - 150, 842, 300, 300); x.restore() } }
  box(x, CAR.l - 20, CAR.bumper, CAR.r - CAR.l + 40, 60, '#8a8aa0', { b: 6 })
  for (const cx of [230, 850]) box(x, cx - 70, CAR.bumper + 66, 140, 90, '#1a1530', { b: 5 })
  // a little wreath on the grille
  drawBits(x, ['..GGGG..', '.GGRGGG.', 'GGG..GGG', 'GR....RG', 'GGG..GGG', '.GGGRGG.', '..GGGG..'], { G: '#2f9a5a', R: RED }, 540, 1010, 7)
}

// the arrival sign at the top of the panel
function arrival(x, t, text, { k = 1, col = '#9fe6b0' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 500); x.scale(k, k)
  box(x, -230, -38, 460, 76, '#14102a', { b: 6 })
  x.font = `700 32px ${MONO}`; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

const CAP = 'capricorn', GEM = 'gemini'
// driver = Capricorn (viewer's right), passenger = Gemini (viewer's left)
const seats = { drv: { x: 705, y: 800, s: 245 }, pas: { x: 375, y: 800, s: 245 } }
const pis0 = { x: 540, y: 735, s: 130 }

function set(x, t, S) {
  if (!S.end) {
    backdrop(x, t, false)
    car(x, t, {
      driver: { sign: CAP, o: { ...seats.drv, mood: 'squint', look: [0, 1], squash: 0.03 * Math.sin(t * 18) } },
      passenger: { sign: GEM, o: { ...seats.pas, mood: 'happy', hops: [0.3, 0.9, 1.5, 2.1, 2.7, 3.3, 3.9, 4.5] } },
      pis: { ...pis0, tears: 2, mood: 'wide', look: [1, -1] },
      wheelTurn: 0.04 * Math.sin(t * 7),
    })
    const tick = t > 2.6
    arrival(x, t, tick ? 'ARRIVAL: 6 H 14 MIN' : 'ARRIVAL: 6 H 12 MIN', { k: 1 + (tick ? 0.12 * Math.exp(-(t - 2.6) * 6) * Math.sin((t - 2.6) * 40) : 0), col: tick ? '#ff9a9a' : '#9fe6b0' })
    bubble(x, t, 330, 640, -1, 5.3, 'and ANOTHER thing—', { size: 32, tail: 0.2 })
    if (t > 2.7) label(x, '+2 MIN', 820, 560, { size: 34, col: '#ff9a9a', alpha: 1 - prog(t, 4.6, 5.1), rot: 0.1 })
    return
  }
  // the ending: night, the wheel has passed to Gemini, Capricorn's feet on the dash with an apple slice
  backdrop(x, t, true)
  car(x, t, {
    driver: { sign: GEM, o: { ...seats.drv, mood: t > 21.4 ? 'sparkle' : 'happy', look: [0, 0], hops: [17.8, 19.9] } },
    passenger: { sign: CAP, o: { ...seats.pas, mood: 'happy', look: [1, 0], hops: [18.2, 21.5] } },
    pis: { ...pis0, tears: 3, mood: 'happy', look: [0, -1] },
    body: '#d8443a',
  })
  // Capricorn's apple slice
  drawBits(x, ['.GGG.', 'GWWWG', 'GWWWG', '.GGG.'], { G: '#6fcf5a', W: '#fff6d8' }, 470, 880, 8, { rot: -0.4 })
  arrival(x, t, 'ARRIVAL: 2 H 05 MIN', { k: pop01(t, 17.7, 0.3, 2) })
  hearts(x, t, 18.4, 540, 700, { n: 5 })
}

// ── step 1: snacks for both moods
function step1(x, t, S) {
  backdrop(x, t, false)
  const u = S.u
  const crunch = u > 1.6
  car(x, t, {
    driver: { sign: CAP, o: { ...seats.drv, mood: u > 2.4 ? 'happy' : 'neutral', look: [-1, 1], hops: [S.t0 + 2.4] } },
    passenger: { sign: GEM, o: { ...seats.pas, mood: crunch ? 'happy' : 'wide', look: [1, 1], hops: crunch ? [S.t0 + 1.6, S.t0 + 1.85, S.t0 + 2.1, S.t0 + 2.35, S.t0 + 2.6, S.t0 + 2.85] : [] } },
    pis: { ...pis0, tears: 1, mood: 'wide', look: [0, 1] },
  })
  // two snacks drop onto the hood
  const a = easeDrop(prog(u, 0.4, 0.9)), b = easeDrop(prog(u, 0.9, 1.4))
  if (u > 0.4) { x.save(); x.translate(330, lerp(500, 940, a)); x.rotate(-0.12); box(x, -90, -70, 180, 130, '#f2cf4a', { b: 6 }); label(x, 'CRUNCHY', 0, -8, { size: 30, col: INK, stroke: null }); drawBits(x, ['.Y.Y.', 'YYYYY'], { Y: '#e8a23a' }, 0, 34, 8); x.restore() }
  if (u > 0.9) { x.save(); x.translate(750, lerp(500, 950, b)); box(x, -86, -56, 172, 112, '#2fc79a', { b: 6 }); for (let i = 0; i < 4; i++) drawBits(x, ['.WW.', 'WWWW', '.WW.'], { W: '#fff6d8' }, -54 + i * 36, 8, 7, { rot: 0.3 }); label(x, 'TIDY', 0, -34, { size: 24, col: INK, stroke: null }); x.restore() }
  // crumbs + CRUNCH
  if (crunch) {
    for (let i = 0; i < 14; i++) { const p = ((u - 1.6) * 1.4 + i / 14) % 1; R(x, '#e8a23a', 380 + Math.sin(i * 3.7) * 120 * p, 780 + p * 180, 8, 8) }
    for (const [i, c] of [[0, 1.6], [1, 2.1], [2, 2.6]]) label(x, 'CRUNCH', [220, 470, 300][i], [560, 600, 520][i], { size: 36 * pop01(u, c, 0.2, 2.6), col: GOLD, rot: [-0.15, 0.12, -0.05][i], alpha: outK(u, [c + 0.7, c + 0.9]) })
  }
  if (u > 2.4) bubble(x, t, 780, 600, S.t0 + 2.4, S.t1, 'acceptable.', { size: 32, col: '#c8f3e4', tail: -0.3 })
}
function easeDrop(p) { if (p <= 0) return 0; if (p >= 1) return 1; const b = 1 - p; return 1 - b * b * Math.abs(Math.cos(p * 7)) }

// ── step 2: take turns picking the sound
function tape(x, cx, cy, labelTxt, col, on) {
  x.save(); x.translate(cx, cy); x.scale(on ? 1.08 : 0.92, on ? 1.08 : 0.92); x.globalAlpha *= on ? 1 : 0.8
  box(x, -130, -76, 260, 152, '#2a2148', { b: 7 })
  R(x, col, -110, -60, 220, 54)
  x.font = `800 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(labelTxt, 0, -32)
  for (const d of [-1, 1]) { box(x, d * 50 - 22, 14, 44, 44, BONE, { b: 4 }); R(x, INK, d * 50 - 6, 30, 12, 12) }
  x.restore()
}
function step2(x, t, S) {
  backdrop(x, t, false)
  const u = S.u
  const turn = u < 1.2 ? 0 : u < 2.4 ? 1 : 0       // Gemini, Capricorn, Gemini
  const beat = k => (Math.floor(u * 2.6) % 2 === k)
  car(x, t, {
    driver: { sign: CAP, o: { ...seats.drv, mood: turn === 1 ? 'happy' : 'neutral', look: [-1, 0], hops: turn === 1 ? [S.t0 + 1.25, S.t0 + 1.65, S.t0 + 2.05] : [] } },
    passenger: { sign: GEM, o: { ...seats.pas, mood: turn === 0 ? 'sparkle' : 'happy', look: [1, 0], hops: turn === 0 ? [S.t0 + 0.1, S.t0 + 0.5, S.t0 + 0.9, S.t0 + 2.45, S.t0 + 2.85, S.t0 + 3.25] : [] } },
    pis: { ...pis0, tears: 2, mood: 'happy', look: [0, -1] },
  })
  const k = pop01(u, 0.05, 0.3, 2)
  x.save(); x.translate(540, 540); x.scale(k, k); x.translate(-540, -540)
  tape(x, 330, 560, 'GEMINI MIX', '#f2cf4a', turn === 0)
  tape(x, 750, 560, 'CALM DRIVE', '#2fc79a', turn === 1)
  // the TURN arrow
  const ax = turn === 0 ? 330 : 750
  drawBits(x, ['.WWW.', '.WWW.', 'WWWWW', '.WWW.', '..W..'], { W: GOLD }, ax, 452 + 6 * Math.sin(t * 8), 9)
  label(x, 'TURN', ax, 410, { size: 26, col: GOLD })
  x.restore()
  // little music notes out of the car, in the colour of whoever's turn it is
  for (let i = 0; i < 6; i++) { const p = ((u * 0.7 + i / 6) % 1); drawBits(x, ['.NN', '.N.', 'NN.'], { N: turn === 0 ? '#f2cf4a' : '#2fc79a' }, 200 + i * 140 + Math.sin(p * 6 + i) * 20, 860 - p * 200, 7, { alpha: Math.sin(Math.PI * p) * (beat(i % 2) ? 1 : 0.7) }) }
}

// ── step 3: stuck in a jam → a talk card
function step3(x, t, S) {
  backdrop(x, t, false)
  const u = S.u
  car(x, t, {
    driver: { sign: CAP, o: { ...seats.drv, mood: u > 2.6 ? 'happy' : u > 1.0 ? 'wide' : 'squint', look: [-1, -1], hops: [S.t0 + 2.6, S.t0 + 2.9, S.t0 + 3.2] } },
    passenger: { sign: GEM, o: { ...seats.pas, mood: u > 1.6 ? 'happy' : 'wide', look: [1, -1], hops: [S.t0 + 1.6, S.t0 + 2.9, S.t0 + 3.2] } },
    pis: { ...pis0, tears: 3, mood: u > 2.6 ? 'happy' : 'wide', look: [0, -1] },
    brake: true,
  })
  // brake lights glow red across the frame (everyone is stopped)
  x.save(); x.globalAlpha = 0.18 * clamp(prog(u, 0, 0.3)); R(x, '#ff3a5a', P.x, P.y, P.w, P.h); x.restore()
  // the talk card flips up in the windshield
  const img = S.img['card-talk-1.png']
  const k = pop01(u, 0.5, 0.4, 1.6)
  if (img && k > 0.01) {
    const w = 250, h = w * img.height / img.width
    x.save(); x.translate(540, 650); x.scale(k, k); x.rotate(-0.05)
    R(x, 'rgba(6,4,18,0.5)', -w / 2 + 12, -h / 2 + 14, w, h)
    x.drawImage(img, -w / 2, -h / 2, w, h)
    x.restore()
  }
  sparkles(x, t, 540, 650, S.t0 + 0.8, 10, 190, 2)
  bubble(x, t, 280, 760, S.t0 + 1.6, S.t1, 'pineapple on pizza.', { size: 30, tail: 0.3, maxW: 300 })
  bubble(x, t, 800, 760, S.t0 + 2.5, S.t1, 'labelled spice jars.', { size: 30, col: '#c8f3e4', tail: -0.3, maxW: 300 })
}

const EP = makeSurvival({
  no: 13,
  accent: '#ffb27a',
  hook: 'Six hours. | *One* car.',
  situation: 'holiday traffic, two moods.',
  guide: 'How to survive: | *the long drive.*',
  endHead: 'Hour five. | *Still* laughing.',
  line: 'the road is long. make the car *kind.*',
  last: 'Pass the snacks. | *Pass* the wheel.',
  images: ['card-talk-1.png'],
  set,
  steps: [
    { text: 'Pack snacks for *both* moods.', draw: step1, cues: [['whoosh', 0.4, 0.3, 0.03], ['tick', 0.9, 0.06], ['whoosh', 0.9, 0.3, 0.03], ['tick', 1.4, 0.06], ...[1.6, 1.85, 2.1, 2.35, 2.6, 2.85].map(c => ['tick', c, 0.04]), ['pop', 2.4, 659.25, 0.035, 0.3]] },
    { text: 'Take turns picking the sound.', draw: step2, cues: [['pop', 0.1, 880, 0.04, -0.3], ['tick', 1.2, 0.07], ['pop', 1.22, 659.25, 0.04, 0.3], ['tick', 2.4, 0.07], ['pop', 2.42, 880, 0.04, -0.3]] },
    { text: 'Stuck in a jam? Pull a *talk card.*', draw: step3, cues: [['whoosh', 0.5, 0.4, 0.04], ['pluck', 0.9, 1318.51, 0.04, 0.6, 0], ['glitter', 0.8, 1.2], ['pop', 1.6, 987.77, 0.035, -0.3], ['pop', 2.5, 739.99, 0.035, 0.3], ['pop', 2.65, 987.77, 0.03, 0], ['pop', 2.95, 1174.66, 0.03, 0]] },
  ],
  cues: [['tick', 2.6, 0.05], ['pop', 2.62, 440, 0.04, 0.3], ['pop', 17.7, 1174.66, 0.035, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [MINT, PINK, INTER, snow]
