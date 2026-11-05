// kpmee06: PLANET TALK · MERCURY to VIRGO, "The Overthinker's Debrief" (79 s vertical, star_advice, LONG · home sign,
// house · G). In astrology Mercury rules Virgo. 2:13 a.m. after a first date; Virgo is replaying one moment. Hard cut.
//   0.00  frame 0: the dark bedroom, Mercury bursting through the wall wearing alarm-clock bells, ringing; Virgo bolt
//         upright in bed with a printed, red-circled transcript of the date. Slam "VIRGO. It's 2 a.m. | *Drop the
//         transcript.*" Whip on frame 0, shake.
//   0.80  record scratch + freeze: "replaying *one* moment. on loop."   2.70 promise: "wait for what they *actually* texted."
//   3.20  CH1 THE REPLAY: the memory on a little TV at 1×, 0.5×, 0.25× ("this menu has *nine* fonts.") · Virgo "I said
//         the menu thing. *why.*" · Mercury: "the 2 a.m. *replay.*" / "I do it too. *fast.*" · "I live *closest* to the
//         Sun." / "I know about *burning out.*"
//  20.00  CH2 THE TRANSCRIPT: red circles ("too eager?", "said 'cool' 4×", "THE MENU THING") · Mercury reads it aloud at
//         speed · Virgo "I need to know what they *really* thought." · loading bar "analysing tone…" → "Error: not
//         enough data (ask them)"
//  36.00  CH3 THREE FACTS: what happened / what you're guessing / what you can ask · a talk card on the nightstand:
//         "what made you laugh today?" · Virgo "ok. sleep. then *ask.*"
//  56.00  CH4 WHAT THEY SAID: a text lands: "best night. the menu thing?? you're so funny" · Mercury "read that *again.*"
//         · roommate Pisces in the doorway, happy-sobbing "I heard *everything*" · Virgo replies "had the best time too.
//         again Saturday?" → "YES." · the transcript goes flying · slam "That moment you replayed? | *Their favourite
//         part.*" 77.2, hard cut at 79.
import { film, track, merc, sign, room, bed, phone, burst, label, hearts, box, drawEntranceFx, entrance, entranceCues, clamp, lerp, prog, ease, easeOutBack, GOLD, INK, BONE, RED, PINK, INTER, MONO, SERIF } from '../../kpmee01/mercurykit.js'

export const DURATION = 79
const IN = { at: -0.2, len: 0.55, x: 300, y: 700, size: 330 }
const LAND = entrance('burst', 0, IN).land
const VIR = '#9fd08a'
const BR = { wall: '#232a4a', wall2: '#10142c', floor: '#2c2c50', win: { x: 640, y: 320, w: 320, h: 340 } }

const MK = [
  [LAND, { x: 300, y: 700, size: 330, mood: 'wide' }],
  [3.2, { x: 300, y: 720, size: 310, mood: 'wide' }],
  [12.0, { x: 780, y: 760, size: 310, mood: 'neutral' }],
  [13.6, { mood: 'happy' }],
  [17.0, { mood: 'sad' }],
  [19.0, { mood: 'happy' }],
  [27.0, { x: 790, y: 760, mood: 'neutral' }],
  [30.0, { mood: 'happy' }],
  [49.0, { x: 790, y: 740, mood: 'happy' }],
  [53.0, { mood: 'sleepy' }],
  [56.0, { mood: 'wide' }],
  [72.0, { x: 790, y: 720, size: 300, mood: 'love' }],
  [73.5, { x: 220, y: 480 }, 'lin'],
  [74.1, { x: 940, y: 420 }, 'lin'],
  [74.7, { x: 790, y: 720, mood: 'proud' }, 'out'],
]
const VK = [
  [0, { x: 420, y: 1110, size: 300, mood: 'wide', look: [1, -0.6] }],
  [3.2, { mood: 'squint', look: [0, 1] }],
  [12.0, { mood: 'squint', look: [1, -0.3] }],
  [14.0, { mood: 'neutral' }],
  [27.0, { mood: 'wide', look: [1, -0.3] }],
  [30.0, { mood: 'squint' }],
  [49.0, { mood: 'happy', look: [1, 0.3] }],
  [53.0, { mood: 'sleepy' }],
  [57.2, { mood: 'wide', look: [1, -0.5] }],
  [60.0, { mood: 'sparkle', look: [0, 0] }],
  [72.0, { mood: 'happy' }],
]
const VHOPS = [0.4, 12.2, 12.6, 27.2, 27.7, 49.2, 53.2, 57.3, 60.2, 60.6, 72.1, 72.5, 72.9, 73.3, 75.0]

function bells(x, t, P, ring) {
  if (!ring) return
  const j = Math.sin(t * 60) * 0.2
  for (const s of [-1, 1]) {
    x.save(); x.translate(P.x + s * P.size * 0.28, P.y - P.size * 0.45); x.rotate(s * 0.5 + j)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 52, Math.PI, 0); x.lineTo(52, 10); x.lineTo(-52, 10); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 44, Math.PI, 0); x.lineTo(44, 4); x.lineTo(-44, 4); x.fill()
    x.restore()
  }
  x.save(); x.strokeStyle = GOLD; x.lineWidth = 8
  for (let i = 0; i < 3; i++) { x.globalAlpha = 0.8 - i * 0.25; x.beginPath(); x.arc(P.x, P.y - P.size * 0.4, P.size * (0.75 + i * 0.15 + ((t * 3) % 1) * 0.1), -2.4, -0.7); x.stroke() }
  x.restore()
}
function bedroom(x, t, dim = 0.25) {
  room(x, t, { ...BR, dim })
  // wall hole (after the entrance)
  if (t > IN.at) { x.fillStyle = '#07041a'; x.beginPath(); for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, r = 190 + (i % 2) * 40; const px = 300 + Math.cos(a) * r, py = 700 + Math.sin(a) * r * 0.9; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.closePath(); x.fill(); x.strokeStyle = INK; x.lineWidth = 10; x.stroke() }
  // door (right)
  box(x, 900, 760, 200, 660, '#5a4070', { r: 8 })
  x.fillStyle = GOLD; x.beginPath(); x.arc(930, 1100, 14, 0, Math.PI * 2); x.fill()
  bed(x, 470, 1430, 760, '#4a6ad0')
  // nightstand + clock
  box(x, 830, 1260, 160, 170, '#6b4a3a', { r: 10 })
  box(x, 845, 1180, 130, 76, '#0f0a26', { r: 10, b: 5 })
  label(x, '2:13', 910, 1219, { size: 44, font: MONO, weight: 700, col: '#ff6b6b', stroke: null, alpha: 0.6 + 0.4 * (Math.floor(t * 2) % 2) })
}
function transcriptProp(x, t, cx, cy, rot = 0.1, k = 1) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -90, -120, 180, 240, '#f4e8cc', { r: 6, b: 5 })
  x.fillStyle = '#b8a88a'; for (let i = 0; i < 8; i++) x.fillRect(-70, -95 + i * 26, 120 - (i % 3) * 20, 8)
  x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.ellipse(-10, -40, 60, 20, 0, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.ellipse(0, 50, 50, 18, 0, 0, Math.PI * 2); x.stroke()
  x.restore()
}
function virgo(x, t) { const V = track(t, VK); sign(x, 'virgo', t, V, { hops: VHOPS, shadow: false }); return V }
function mercAt(x, t, H, ov = {}) {
  let P
  if (t < LAND) { drawEntranceFx(x, 'mercury', 'burst', t, IN); P = { ...entrance('burst', t, IN), mood: 'wide' } } else P = track(t, MK)
  P = { ...P, ...ov }
  bells(x, t, P, t < 3.2)
  merc(x, t, P, { talk: H.mouth(t), sweat: t < 3.2, hops: [13.6, 14.4, 15.2, 17.2, 18.0, 30.2, 31.0, 38, 42, 46, 50, 72.2, 74.8] })
}

// ── shots
function shotBed(x, t, H, dim) {
  bedroom(x, t, dim)
  const V = virgo(x, t)
  const holding = t < 53.4
  transcriptProp(x, t, V.x + 170, V.y + 20, 0.15, holding ? 1 : 0)
  if (t > 49 && t < 56) talkCard(x, t, 910, 1060, 0.55)
  if (t > 63 && t < 72) piscesDoor(x, t)
  if (t > 72) { flying(x, t); piscesDoor(x, t); hearts(x, t, 72.1, 420, 920, { n: 9, col: VIR }) }
  mercAt(x, t, H)
}
function piscesDoor(x, t) {
  sign(x, 'pisces', t, { x: 990, y: 1130, size: 230, mood: 'sparkle', look: [-1, 0], tears: 3 }, { hops: [63.2, 63.6, 64.0, 64.4, 72.3, 72.7, 73.1] })
}
function flying(x, t) {
  for (let i = 0; i < 6; i++) {
    const p = prog(t, 72 + i * 0.12, 74.5 + i * 0.12); if (p <= 0 || p >= 1) continue
    transcriptProp(x, t, 590 + (i - 2.5) * 140 * p * 2, 1150 - p * 1100 + p * p * 300, p * 6 * (i % 2 ? 1 : -1), 0.6)
  }
}
function talkCard(x, t, cx, cy, s0) {
  const fl = prog(t, 49.3, 49.8), sc = Math.abs(Math.cos(fl * Math.PI))
  const front = fl > 0.5
  x.save(); x.translate(cx, cy); x.scale(s0 * sc, s0)
  box(x, -170, -240, 340, 480, front ? BONE : '#3a2d66', { r: 22, b: 8 })
  if (front) {
    label(x, 'TALK CARD', 0, -170, { size: 30, font: MONO, weight: 700, col: '#8a6a3a', stroke: null })
    x.font = `italic 600 50px ${SERIF}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    ;['what made', 'you laugh', 'today?'].forEach((l, i) => x.fillText(l, 0, -40 + i * 64))
  } else { x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(-130, -200, 260, 400); label(x, '?', 0, 0, { size: 140, col: GOLD, stroke: null }) }
  x.restore()
}
// CH1: the memory replay TV
function shotTV(x, t, H) {
  bedroom(x, t, 0.6)
  const seg = t < 6.8 ? 0 : t < 10.4 ? 1 : 2, speed = [1, 0.5, 0.25][seg], s0 = [3.2, 6.8, 10.4][seg]
  const u = ((t - s0) * speed) % 2.4
  box(x, 120, 520, 840, 700, '#2b2350', { r: 40, b: 14 })
  x.save(); x.beginPath(); x.roundRect(160, 560, 760, 620, 24); x.clip()
  x.fillStyle = '#3a2448'; x.fillRect(160, 560, 760, 620)
  x.fillStyle = 'rgba(255,217,138,0.2)'; x.beginPath(); x.arc(540, 640, 300, 0, Math.PI * 2); x.fill()
  box(x, 240, 1000, 600, 30, '#9a6240', { r: 8 })
  sign(x, 'virgo', t, { x: 330, y: 900, size: 220, mood: u > 0.8 ? 'squint' : 'happy', look: [1, 0], shadow: false })
  sign(x, 'sagittarius', t, { x: 750, y: 900, size: 220, mood: u > 1.0 ? 'happy' : 'neutral', look: [-1, 0], shadow: false })
  if (u > 0.2) { box(x, 230, 640, 420, 80, BONE, { r: 22, b: 5 }); x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('this menu has nine fonts.', 440, 682) }
  if (u > 1.0) label(x, 'ha!', 770, 720, { size: 50, col: GOLD })
  // scanlines
  x.fillStyle = 'rgba(0,0,0,0.18)'; for (let y = 560; y < 1180; y += 8) x.fillRect(160, y, 760, 3)
  x.restore()
  label(x, `◀◀ REPLAY  ${speed}×`, 540, 470, { size: 50, font: MONO, weight: 700, col: '#ff6b6b' })
  label(x, `replay #${12 + seg * 7 + Math.floor((t - s0) / 1.2)}`, 540, 1300, { size: 40, font: MONO, weight: 700, col: GOLD })
  merc(x, t, { x: 880, y: 1520, size: 230, mood: 'sly', look: [-1, -1] }, { talk: H.mouth(t) })
  sign(x, 'virgo', t, { x: 250, y: 1560, size: 230, mood: 'squint', look: [1, -1], shadow: false }, { hops: [4.0, 7.4, 11.0] })
}
// CH2: the transcript close-up
const TLINES = [['ME', 'hi! you look nice'], ['THEM', 'you too :)'], ['ME', 'cool. cool cool.'], ['THEM', 'what are you getting?'], ['ME', 'this menu has nine fonts.'], ['THEM', '(laughs)'], ['ME', 'cool!'], ['ME', 'anyway cool']]
const NOTES = [{ at: 21.0, row: 0, text: 'too eager?' }, { at: 22.3, row: 2, text: 'said “cool” 4×' }, { at: 23.6, row: 4, text: 'THE MENU THING' }]
function shotTranscript(x, t, H) {
  x.fillStyle = '#10142c'; x.fillRect(0, 0, 1080, 1920)
  x.save(); x.translate(540, 1020); x.rotate(-0.04)
  box(x, -430, -620, 860, 1240, '#f4e8cc', { r: 8, b: 10 })
  label(x, 'DATE TRANSCRIPT · DRAFT 6', 0, -550, { size: 34, font: MONO, weight: 700, col: '#8a6a3a', stroke: null })
  TLINES.forEach(([who, txt], i) => {
    const y = -440 + i * 120
    x.font = `800 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = who === 'ME' ? '#4a7a3a' : '#7a5a8a'; x.fillText(who + ':', -380, y)
    x.font = `600 40px ${INTER}`; x.fillStyle = '#2a2240'; x.fillText(txt, -240, y)
  })
  for (const n of NOTES) {
    const k = clamp((t - n.at) / 0.3); if (k <= 0) continue
    const y = -440 + n.row * 120
    x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(40, y, 300, 50, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); x.stroke()
    if (k >= 1) label(x, n.text, 230, y - 70, { size: 38, col: RED, stroke: '#f4e8cc', sw: 8, rot: -0.06, font: INTER })
  }
  x.restore()
  merc(x, t, { x: 900, y: 300 + Math.sin(t * 5) * 20, size: 220, mood: 'wide', look: [-1, 1] }, { talk: H.mouth(t), sweat: true })
}
// CH3: three facts board
const FACTS = [{ at: 37.0, n: 1, head: 'WHAT HAPPENED', body: 'you joked. they laughed.', col: '#5fd38a' }, { at: 40.8, n: 2, head: 'WHAT YOU’RE GUESSING', body: '“they think I’m weird”', col: '#ff6b6b' }, { at: 44.6, n: 3, head: 'WHAT YOU CAN ASK', body: '“had fun? again soon?”', col: GOLD }]
function shotFacts(x, t, H) {
  bedroom(x, t, 0.65)
  FACTS.forEach((f, i) => {
    const k = easeOutBack(prog(t, f.at, f.at + 0.35), 2.2); if (k <= 0.01) return
    const y = 560 + i * 300
    x.save(); x.translate(540, y); x.rotate((i - 1) * 0.03); x.scale(k, k)
    box(x, -440, -120, 880, 240, '#1b1440', { r: 30, b: 8 })
    x.fillStyle = f.col; x.beginPath(); x.arc(-350, 0, 56, 0, Math.PI * 2); x.fill(); label(x, String(f.n), -350, 3, { size: 64, col: INK, stroke: null })
    label(x, f.head, -260, -44, { size: 36, font: MONO, weight: 700, col: f.col, align: 'left', stroke: null })
    label(x, f.body, -260, 32, { size: 50, col: BONE, align: 'left', stroke: null })
    if (i === 1 && t > 43.4) { x.strokeStyle = RED; x.lineWidth = 10; const w = clamp((t - 43.4) / 0.3) * 560; x.beginPath(); x.moveTo(-270, 32); x.lineTo(-270 + w, 26); x.stroke() }
    x.restore()
  })
  merc(x, t, { x: 880, y: 1620, size: 240, mood: 'happy', look: [-1, -1] }, { talk: H.mouth(t), hops: [37.2, 41.0, 44.8] })
  sign(x, 'virgo', t, { x: 240, y: 1580, size: 240, mood: t > 44.6 ? 'happy' : 'neutral', look: [1, -1], shadow: false }, { hops: [37.4, 41.2, 45.0] })
}
// CH4: the phone
const SP = { name: 'Sam', sub: 'online', color: '#f0603a' }
const MSGS = [
  { at: -5, side: 'R', text: 'home safe! thanks for tonight' },
  { at: -5, side: 'L', text: 'same!!' },
  { at: 58.2, side: 'L', text: 'best night. the menu thing?? you’re so funny' },
  { at: 69.6, side: 'R', text: 'had the best time too. again Saturday?' },
  { at: 71.2, side: 'L', text: 'YES.' },
]
const COMPOSE = [{ t0: 67.6, text: 'had the best time too. again Saturday?', cps: 22, sent: 69.6, gold: true }]
function shotPhone(x, t, H, t0) {
  bedroom(x, t, 0.6)
  const k = ease.outCubic(prog(t, t0, t0 + 0.35))
  phone(x, t, { ...SP, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.15, 0, k), msgs: MSGS, compose: COMPOSE, dots: [[70.0, 71.2]] })
  merc(x, t, { x: 900, y: 470, size: 210, mood: t > 58.2 ? 'love' : 'wide', look: [-1, 1] }, { talk: H.mouth(t) })
  if (t > 59.0 && t < 62.0) { x.save(); x.translate(540, 1620); x.rotate(-0.05); const s = easeOutBack(prog(t, 59.0, 59.3), 2.4); x.scale(s, s); box(x, -300, -46, 600, 92, GOLD, { r: 14 }); label(x, 'THE MENU THING.', 0, 2, { size: 54, col: INK, stroke: null }); x.restore() }
}
function promise(x, t) {
  const k = easeOutBack(prog(t, 2.7, 3.0), 2.4) * (1 - ease.inQuad(prog(t, 7.4, 7.7)))
  if (k <= 0.01) return
  x.save(); x.translate(540, 1680); x.rotate(-0.04); x.scale(k, k)
  box(x, -400, -54, 800, 108, GOLD, { r: 20 })
  label(x, 'wait for what they ACTUALLY texted', 0, 2, { size: 42, col: INK, stroke: null })
  x.restore()
}

const SPEECH = [
  { t0: 12.2, t1: 13.5, x: 330, y: 860, who: 'virgo', text: 'I said the menu thing. *why.*', size: 42, tail: 40, maxW: 560 },
  ...burst(13.6, ['oh I know this.', 'the 2 a.m. *replay.*', 'I do it too. *fast.*'], { x: 540, y: 300, gap: 0.8, t1: 16.8 }),
  ...burst(17.0, ['I live *closest* to the Sun.', 'I know about *burning out.*'], { x: 540, y: 300, gap: 0.9, t1: 19.9 }),
  { t0: 24.4, t1: 26.8, x: 540, y: 1620, who: 'mercury', text: '“cool.” “cool.” “cool!” “cool…”', size: 44, cps: 60, tailUp: true, tail: 260 },
  { t0: 27.3, t1: 31.2, x: 330, y: 840, who: 'virgo', text: 'I need to know what they *really* thought.', size: 40, tail: 40, maxW: 540 },
  ...burst(29.8, ['you can’t know from *here.*', 'you can only *guess.*'], { x: 540, y: 300, gap: 0.9, t1: 32.4 }),
  ...burst(37.2, ['fact one.'], { x: 620, y: 1390, t1: 40.6, size: 40, tail: 220 }),
  ...burst(41.0, ['that’s a *guess.*'], { x: 620, y: 1390, t1: 44.4, size: 40, tail: 220 }),
  ...burst(44.8, ['that’s your *move.*'], { x: 620, y: 1390, t1: 48.8, size: 40, tail: 220 }),
  { t0: 50.0, t1: 52.8, x: 560, y: 380, who: 'mercury', text: 'and tomorrow, ask *them* this one.', size: 42, cps: 44 },
  { t0: 53.4, t1: 55.8, x: 330, y: 840, who: 'virgo', text: 'ok. sleep. then *ask.*', size: 44, tail: 40 },
  ...burst(62.2, ['wait.', 'read that *again.*'], { x: 540, y: 300, gap: 0.6, t1: 63.0 }),
  { t0: 64.0, t1: 66.8, x: 760, y: 960, who: 'pisces', text: 'I heard *everything*', size: 40, tail: 160, maxW: 420 },
  { t0: 72.4, t1: 74.6, x: 400, y: 850, who: 'virgo', text: 'they *liked* it?!', size: 46, tail: 20 },
]

function draw(x, t, H) {
  if (t < 3.2) shotBed(x, t, H, 0.25)
  else if (t < 12.0) shotTV(x, t, H)
  else if (t < 20.0) shotBed(x, t, H, 0.25)
  else if (t < 27.0) shotTranscript(x, t, H)
  else if (t < 36.0) shotBed(x, t, H, 0.25)
  else if (t < 49.0) shotFacts(x, t, H)
  else if (t < 57.4) shotBed(x, t, H, t > 53.4 ? 0.25 + 0.35 * prog(t, 53.4, 55.5) : 0.25)
  else if (t < 63.0) shotPhone(x, t, H, 57.4)
  else if (t < 67.3) shotBed(x, t, H, 0.2)
  else if (t < 72.0) shotPhone(x, t, H, 67.3)
  else shotBed(x, t, H, 0.15)
  promise(x, t)
}

const CH = (at, n, title) => ['chapter', { at, out: [at + 3.0, at + 3.2], n, title }]
const F = film({
  id: 'kpmee06', duration: DURATION, draw, speech: SPEECH,
  hook: { text: 'VIRGO. It’s 2 a.m. | *Drop the transcript.*', top: 200, size: 100, out: [3.05, 3.2] },
  last: { at: 77.2, text: 'That moment you replayed? | *Their favourite part.*', top: 240, size: 88 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['shake', { at: 0.0, len: 0.6, amp: 30 }],
    ['rec', { at: 0.8, len: 1.4, caption: 'replaying *one* moment. on loop.', sub: 'virgo, after a first date', top: 1560 }],
    CH(3.3, 1, 'the replay'),
    ['whip', { at: 12.0, len: 0.3, from: 1.25 }],
    CH(20.1, 2, 'the transcript'),
    ['whip', { at: 27.0, len: 0.3, from: 1.25 }],
    ['load', { at: 32.6, len: 3.2, label: 'analysing their tone…', error: 'Error: not enough data (ask them)', y: 620 }],
    CH(36.1, 3, 'three facts'),
    CH(56.1, 4, 'what they said'),
    ['notif', { at: 56.6, out: [57.3, 57.45], title: 'texts', body: 'Sam: best night. the menu *thing??*', glyph: '♐', color: '#f0603a' }],
    ['whip', { at: 72.0, len: 0.35, from: 1.3 }],
  ],
  extraCues: [
    ...entranceCues('burst', IN),
    ...Array.from({ length: 10 }, (_, i) => ['bell', +(0.02 + i * 0.16).toFixed(2), 1318.51, 0.035, 0.3, 0]),
    ['tapeStop', 6.8, 0.5], ['tapeStop', 10.4, 0.5],
    ...[21.0, 22.3, 23.6].map(a => ['pop', a, 880, 0.04, 0.2]),
    ...[37.0, 40.8, 44.6].map(a => ['tom', a, 90, { gain: 0.2, decay: 0.3 }]),
    ['whoosh', 49.3, 0.4, 0.05], ['glitter', 49.6, 50.4],
    ['pop', 58.2, 1567.98, 0.05, -0.2], ['glitter', 58.2, 59.4],
    ['pluck', 64.1, 659.25, 0.035, 0.5, 0.3], ['pluck', 64.3, 587.33, 0.035, 0.5, 0.3],
    ['whoosh', 69.6, 0.3, 0.05], ['pop', 69.65, 1318.51, 0.04, 0.2], ['pop', 71.2, 1760, 0.05, -0.2],
    ['whoosh', 72.1, 0.6, 0.07], ['whoosh', 73.5, 0.5, 0.06], ['whoosh', 74.1, 0.4, 0.06],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [PINK]
