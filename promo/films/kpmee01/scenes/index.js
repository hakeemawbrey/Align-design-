// kpmee01: PLANET TALK · MERCURY to ARIES, "Sent Before Thinking" (24 s vertical, star_talk, chiptune · E). Hard cut.
// Mercury, the fast talker, finally meets someone faster: Aries sent "so we're dating now?" 0.2 s after one coffee.
//   0.00  frame 0: a café. Mercury mid-skid in from the right, brakes smoking, nearly flattened by Aries's gold text
//         bubble flying the other way. Slam "ARIES. | Even *I* type slower." Whip zoom on frame 0, shake on the landing.
//   0.95  record scratch + freeze: "one coffee. *0.2 seconds.*"
//   2.40  phone close: the chat. Mercury reads it back at triple speed; "caught" circle on the sent text.
//   6.00  two-shot: Aries "too much?" → Mercury in bursts: "speed is cute" / "add a question" / "leave room for them"
//  10.10  phone: REWIND glitch, the text un-sends, the rewrite types: "had fun. again Thursday?" → sent → "YES!! thursday"
//  15.00  café: Aries hops, Pisces in the corner sobs happy tears into a napkin. Mercury takes a victory lap.
//  22.30  slam "Fast is fine. | Add a *question mark.*", hold, hard cut at 24.
import { film, track, merc, sign, room, table, cup, phone, burst, smoke, speedLines, label, hearts, entrance, drawEntranceFx, entranceCues, box, clamp, lerp, prog, ease, GOLD, INK, BONE, INTER } from '../mercurykit.js'

export const DURATION = 24
const IN = { at: -0.35, len: 0.75, x: 760, y: 880, size: 340 }
const LAND = entrance('slide', 0, IN).land
const ROOM = { wall: '#3a2448', wall2: '#22143a', floor: '#4a2f45', win: { x: 640, y: 300, w: 330, h: 360 }, lamp: { x: 300, y: 500 } }

const MK = [
  [LAND, { x: 760, y: 880, size: 340, mood: 'wide' }],
  [2.3, { mood: 'wide' }],
  [6.0, { x: 770, y: 780, size: 320, mood: 'wide' }],
  [7.0, { mood: 'happy' }],
  [15.0, { x: 760, y: 760, size: 300, mood: 'happy' }],
  [17.5, { mood: 'proud' }],
  [19.5, { x: 760, y: 760 }],
  [20.0, { x: 180, y: 520 }, 'lin'],
  [20.5, { x: 900, y: 420 }, 'lin'],
  [21.0, { x: 760, y: 760 }, 'out'],
  [22.2, { mood: 'happy' }],
]
const AK = [
  [0, { x: 290, y: 1110, size: 300, mood: 'wide', look: [1, 0] }],
  [6.0, { x: 290, y: 1150, size: 300, mood: 'squint', look: [1, -0.3] }],
  [7.0, { mood: 'wide' }],
  [15.0, { x: 300, y: 1110, mood: 'happy', look: [0, 0] }],
  [19.6, { mood: 'wide', look: [-1, -1] }],
  [21.0, { mood: 'happy', look: [1, 0] }],
]
const AHOPS = [0.45, 6.15, 6.45, 15.05, 15.35, 15.65, 16.0, 21.1]

const P1 = { name: 'Jules', sub: 'online', color: '#7fd0f0' }
const MSGS = [
  { at: -5, side: 'L', text: 'that was fun :)' },
  { at: -5, side: 'R', text: 'so we’re dating now?', out: 10.45 },
  { at: 12.65, side: 'R', text: 'had fun. again Thursday?' },
  { at: 14.45, side: 'L', text: 'YES!! thursday' },
]
const COMPOSE = [{ t0: 10.9, text: 'had fun. again Thursday?', cps: 20, sent: 12.65, gold: true }]
const DOTS = [[13.0, 14.45]]

const SPEECH = [
  { t0: 3.0, t1: 5.7, x: 540, y: 300, who: 'mercury', text: 'so-we’re-dating-*NOW?*', size: 48, cps: 60, tail: 260 },
  { t0: 6.2, t1: 8.6, x: 330, y: 860, who: 'aries', text: 'too much?', size: 46, tail: -20 },
  ...burst(7.0, ['speed is *cute.*', 'add a *question.*', 'leave room for *them.*'], { x: 600, y: 330, t1: 9.95, gap: 0.5 }),
  { t0: 15.35, t1: 17.4, x: 800, y: 1090, who: 'pisces', text: 'they said *YES*', size: 44, tail: 120 },
  { t0: 17.6, t1: 19.4, x: 560, y: 470, who: 'mercury', text: 'see? *still* the fastest.', size: 44, cps: 46 },
]

function cafe(x, t, sh = 0) {
  room(x, t, ROOM)
  // skid marks
  if (t > -0.3) { x.fillStyle = 'rgba(10,6,24,0.5)'; const w = clamp((t + 0.3) / 0.7) * 520; x.fillRect(760, 1060 + sh, w, 12); x.fillRect(780, 1090 + sh, w * 0.9, 10) }
}

function shotCafe(x, t, H) {
  cafe(x, t)
  // Pisces in the corner booth with a napkin
  const late = t > 15.0
  sign(x, 'pisces', t, { x: 935, y: late ? 1270 : 1300, size: late ? 200 : 170, mood: late ? 'sparkle' : 'neutral', look: late ? [-1, 0] : [-1, 0.2], tears: late ? 3 : 1, shadow: false }, { hops: [15.3, 15.7, 16.1, 16.5] })
  if (late) { box(x, 860, 1330, 80, 50, '#ffffff', { r: 8, b: 4 }) }
  // Aries behind the table
  const A = track(t, AK)
  sign(x, 'aries', t, A, { hops: AHOPS })
  table(x, 330, 1250, 520, '#9a6240')
  cup(x, 230, 1250, '#efe6d6', t); cup(x, 430, 1250, '#f2c75c', t, false)
  // Mercury
  if (t < LAND) { drawEntranceFx(x, 'mercury', 'slide', t, IN); const P = entrance('slide', t, IN); merc(x, t, { ...P, mood: 'wide' }, { talk: 0, sweat: true }) }
  else {
    const P = track(t, MK)
    smoke(x, t, P.x + 170, 1040, { k: 1 - prog(t, 1.6, 2.4) })
    merc(x, t, P, { talk: H.mouth(t), sweat: t < 3, hops: [17.6, 18.0, 21.0] })
  }
  // the text bubble flying past (frame 0)
  const fp = prog(t, -0.5, 0.75)
  if (fp > 0 && fp < 1) {
    const bx = lerp(330, 1500, ease.inQuad(fp)), by = lerp(940, 820, fp)
    x.save(); x.translate(bx, by); x.rotate(-0.08)
    speedLines(x, t, -340, 0, { n: 0 })
    x.strokeStyle = 'rgba(242,199,92,0.7)'; x.lineCap = 'round'
    for (let k = 0; k < 5; k++) { x.lineWidth = 6; x.beginPath(); x.moveTo(-230 - k * 30, -50 + k * 25); x.lineTo(-420 - k * 50, -50 + k * 25); x.stroke() }
    box(x, -220, -52, 440, 104, GOLD, { r: 40 })
    x.font = `800 38px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('so we’re dating now?', 0, 2)
    x.restore()
  }
  if (t > 15.0 && t < 18.5) hearts(x, t, 15.1, 300, 900, { n: 7 })
}

function shotPhone(x, t, H) {
  cafe(x, t)
  x.fillStyle = 'rgba(5,3,14,0.55)'; x.fillRect(0, 0, 1080, 1920)
  const t0 = t < 10 ? 2.4 : 10.1
  const k = ease.outCubic(prog(t, t0, t0 + 0.35))
  phone(x, t, { ...P1, x: 540, y: lerp(1500, 1000, k), s: 1.02, rot: lerp(0.2, 0, k), msgs: MSGS, compose: COMPOSE, dots: DOTS, receipt: t < 10.45 ? { at: 0, text: 'Read 0.2 s ago' } : null })
  // Mercury peeking over the phone top
  const pk = ease.outCubic(prog(t, t0 + 0.25, t0 + 0.6))
  merc(x, t, { x: 900, y: lerp(560, 455, pk), size: 210, mood: t > 14.45 ? 'happy' : t > 10 ? 'sly' : 'wide', look: [-1, 1] }, { talk: H.mouth(t), sweat: t < 10 })
  if (t > 4.5 && t < 5.75) { const k = Math.min(1, (t - 4.5) / 0.2); x.save(); x.translate(540, 1400); x.rotate(-0.06); x.scale(k, k); box(x, -230, -46, 460, 92, '#ff3b3b', { r: 14 }); label(x, 'SENT. ALREADY.', 0, 2, { size: 54, col: BONE, sw: 0, stroke: null }); x.restore() }
  if (t > 10.1 && t < 10.75) label(x, '⏪ REWIND', 540, 380, { size: 70, col: GOLD, rot: -0.05 })
}

function shotTwo(x, t, H) {
  cafe(x, t)
  const A = track(t, AK)
  sign(x, 'aries', t, A, { hops: AHOPS })
  table(x, 330, 1290, 520, '#9a6240'); cup(x, 230, 1290, '#efe6d6', t)
  sign(x, 'pisces', t, { x: 940, y: 1310, size: 160, mood: 'wide', look: [-1, 0], tears: 2, shadow: false })
  const P = track(t, MK)
  merc(x, t, P, { talk: H.mouth(t), hops: [7.0, 7.5, 8.0] })
}

function draw(x, t, H) {
  if (t < 2.4) shotCafe(x, t, H)
  else if (t < 6.0) shotPhone(x, t, H)
  else if (t < 10.1) shotTwo(x, t, H)
  else if (t < 15.0) shotPhone(x, t, H)
  else shotCafe(x, t, H)
}

const F = film({
  id: 'kpmee01', duration: DURATION, draw, speech: SPEECH,
  hook: { text: 'ARIES. | Even *I* type slower.', top: 200, size: 108, out: [2.25, 2.4] },
  last: { at: 22.3, text: 'Fast is fine. | Add a *question mark.*', top: 240, size: 96 },
  fx: [
    ['whip', { at: -0.08, len: 0.45 }],
    ['shake', { at: LAND, len: 0.45, amp: 26 }],
    ['rec', { at: 0.95, len: 1.3, caption: 'one coffee. *0.2 seconds.*', sub: 'aries, after the first date' }],
    ['whip', { at: 2.4, len: 0.35, from: 1.35 }],
    ['caught', { at: 4.1, x: 610, y: 1262, r: 250, ry: 75, out: [5.7, 5.85], label: null, arrow: null, rec: false }],
    ['glitch', { at: 10.1, len: 0.6, dialog: false }],
    ['whip', { at: 15.0, len: 0.35, from: 1.3 }],
  ],
  extraCues: [
    ...entranceCues('slide', IN),
    ['whoosh', 0.02, 0.5, 0.05],
    ['tapeStop', 10.1, 0.5],
    ['whoosh', 12.65, 0.3, 0.05], ['pop', 12.7, 1318.51, 0.04, 0.2],
    ['pop', 14.45, 1567.98, 0.05, -0.2], ['glitter', 14.5, 15.3],
    ['whoosh', 19.6, 0.5, 0.06], ['whoosh', 20.2, 0.5, 0.06],
    ['pluck', 15.5, 659.25, 0.035, 0.5, 0.3], ['pluck', 15.7, 587.33, 0.035, 0.5, 0.3],
  ],
})
export const SCENES = F.SCENES
export const CUES = F.CUES
void [BONE]
