// kxtve07 · Then vs Now: Extended · "Date Night: One Month vs Ten Years" (60 s vertical, dreamy · Gb). Hard cut.
// Rows: promo/films/month2/m40.md. Look: ../../kxtve01/tvkit.js.
//   0.00  HOOK: THEN ♋ Cancer mid-trip in brand-new shoes at a fancy restaurant door, ♑ Capricorn mid-catch · NOW ♋ Cancer
//         in slippers mid-trip over a cushion, ♑ Capricorn mid-catch again. Slam "Same couple. | *One month* vs *ten years.*"
//   6.6   1 · GETTING READY   THEN two hours, a cloud of cologne · NOW "is this shirt clean?" "it's ours."
//  16.0   2 · DINNER          THEN tiny plates, both pretend to read the menu · NOW their usual spot, the usual order
//  25.4   3 · THE TALK CARD   "What's your dream trip?" THEN big nervous answers · NOW "we already went. let's go back."
//  34.8   4 · THE GIFT        THEN a giant teddy that won't fit in the car · NOW Capricorn fixed the squeaky cupboard
//  44.2   5 · THE WALK HOME   both eras hold hands exactly the same way; ♓ Pisces, the neighbour at a window, sobbing
//  57.9   last line "Ten years. | *Same hand* to hold." → cut at 60.
import {
  makeThenNowX, star, room, couch, R, speech, hearts, sparkles, drawBits, drawPixelStar,
  pop01, outK, inR, bump, walk, clamp, lerp, prog, ease, rng, mixHex, GOLD, BONE, PINK, INK, INTER, MONO, SW, SH, T, TAU, SPLIT,
} from '../../kxtve01/tvkit.js'
import { talkCard } from '../../kxrce01/rckit.js'

const C = T.ch, SPL = SPLIT

function fancy(x, t, old) {
  room(x, t, { wall: old ? '#6a3a3a' : '#5a3a4a', floor: old ? '#3a1a1a' : '#3a2230', old, winX: 640, winW: 280, lamp: false })
  for (let i = 0; i < 3; i++) { R(x, INK, 120 + i * 180, 60, 4, 80); x.fillStyle = '#ffe08a'; x.beginPath(); x.arc(122 + i * 180, 150, 20, 0, TAU); x.fill() }
}
function cozy(x, t) { room(x, t, { wall: '#3a4a6a', floor: '#2a2a48', winX: 660, winW: 260 }) }
function dinnerTable(x, cx, cy, w, cloth = '#f4f0e6') { R(x, INK, cx - w / 2 - 6, cy - 6, w + 12, 40); R(x, cloth, cx - w / 2, cy, w, 28); R(x, INK, cx - 12, cy + 34, 24, 140) }
function plate(x, cx, cy, food) { R(x, INK, cx - 50, cy - 10, 100, 20); R(x, '#ffffff', cx - 46, cy - 7, 92, 14); if (food) R(x, food, cx - (food === '#e07a3a' ? 30 : 6), cy - 18, food === '#e07a3a' ? 60 : 12, 10) }
function door(x, cx, cy, fancyDoor = true) { R(x, INK, cx - 80, cy - 280, 160, 280); R(x, fancyDoor ? '#8a2a2a' : '#7a5a3a', cx - 72, cy - 272, 144, 272); R(x, GOLD, cx + 40, cy - 140, 14, 14) }
function cushion(x, cx, cy) { R(x, INK, cx - 50, cy - 24, 100, 40); R(x, '#ff8fb1', cx - 46, cy - 20, 92, 32) }
function slippers(x, F) { void x; void F }
function teddy(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  drawBits(x, ['BB......BB', 'BBBBBBBBBB', '.BBWBBWBB.', '.BBBBBBBB.', '.BBBNNBBB.', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', '.BB....BB.'], { B: '#c8905a', W: INK, N: '#5a3a2a' }, 0, 0, 22)
  x.restore()
}
function car(x, cx, cy) { R(x, INK, cx - 200, cy - 120, 400, 140); R(x, '#5a8ad8', cx - 194, cy - 114, 388, 128); R(x, '#cfe8ff', cx - 140, cy - 100, 120, 60); for (const wx of [-120, 120]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + wx, cy + 20, 36, 0, TAU); x.fill() } }
function cupboard(x, cx, cy, open) {
  R(x, INK, cx - 110, cy - 200, 220, 200); R(x, '#a07850', cx - 104, cy - 194, 208, 188)
  x.save(); x.translate(cx - 104, cy - 194); x.scale(1 - 0.75 * open, 1); R(x, INK, 0, 0, 104, 188); R(x, '#c8a070', 4, 4, 96, 180); x.restore()
  R(x, INK, cx, cy - 194, 4, 188); R(x, '#c8a070', cx + 4, cy - 190, 96, 180)
}
function nightStreet(x, t, old) {
  R(x, old ? '#2a1a3a' : '#141838', 0, 0, SW, SH)
  for (let i = 0; i < 20; i++) R(x, `rgba(255,240,200,${0.3 + 0.4 * Math.sin(t * 2 + i)})`, (i * 97) % SW, (i * 41) % 200, 4, 4)
  for (let i = 0; i < 5; i++) { const bh = 200 + (i % 3) * 60; R(x, old ? '#3a2a4a' : '#221a50', i * 210, 430 - bh, 200, bh); for (let k = 0; k < 4; k++) R(x, '#ffd98a', i * 210 + 30 + k * 40, 430 - bh + 40, 16, 20) }
  // Pisces at an upstairs window
  R(x, INK, 820, 120, 140, 130); R(x, '#ffe7a0', 826, 126, 128, 118)
  R(x, old ? '#4a3a3a' : '#3a3a5a', 0, 430, SW, SH - 430)
  R(x, INK, 120, 260, 8, 170); R(x, '#ffe08a', 104, 240, 40, 26)
}
function handHold(x, t, cx, cy) { drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, cx, cy, 7) }

function A(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  if (i < 0) {
    fancy(x, t, true); door(x, 200, 440)
    star(x, t, { sign: 'cancer', x: 450, y: 380, s: 150, mood: 'wide', bangs: '#6a4a2a', seed: 5, squash: -0.15 })
    star(x, t, { sign: 'capricorn', x: 620, y: 360, s: 150, mood: 'wide', bangs: true, seed: 2, look: [-1, 0] })
    R(x, INK, 400, 470, 90, 24); R(x, '#c8302a', 404, 474, 82, 16)
    return
  }
  if (i === 0) {
    cozy(x, t)
    R(x, INK, 120, 100, 160, 330); R(x, '#cfe8ff', 130, 110, 140, 310)
    star(x, t, { sign: 'capricorn', x: 420, y: 380, s: 160, mood: 'squint', bangs: true, seed: 2, look: [-1, 0] })
    for (let k = 0; k < 8; k++) { const tt = (t * 0.5 + k / 8) % 1; x.save(); x.globalAlpha = 0.45 * (1 - tt); x.fillStyle = '#c9a6ff'; x.beginPath(); x.arc(420 + 40 * Math.sin(k * 2 + t), 330 - tt * 200, 40 + tt * 60, 0, TAU); x.fill(); x.restore() }
    x.save(); x.translate(780, 180); x.rotate(t * 4); R(x, INK, -4, -60, 8, 60); x.restore(); x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(780, 180, 70, 0, TAU); x.stroke()
    speech(x, t, 780, 300, C[0] + 1.0, '2 HOURS', { size: 32, life: 3.0, col: '#fff3c8' })
  } else if (i === 1) {
    fancy(x, t, true); dinnerTable(x, 480, 420, 520)
    plate(x, 380, 410, '#5fbf6a'); plate(x, 580, 410, '#5fbf6a')
    star(x, t, { sign: 'cancer', x: 300, y: 330, s: 150, mood: 'squint', bangs: '#6a4a2a', seed: 5 })
    star(x, t, { sign: 'capricorn', x: 660, y: 330, s: 150, mood: 'squint', bangs: true, seed: 2 })
    R(x, INK, 420, 160, 120, 150); R(x, '#2a1a3a', 426, 166, 108, 138); for (let k = 0; k < 6; k++) R(x, '#8a7aa8', 440, 190 + k * 18, 70, 4)
    speech(x, t, 480, 100, C[1] + 1.5, '(tiny food)', { size: 30, life: 2.4, col: BONE })
  } else if (i === 2) {
    fancy(x, t, true); dinnerTable(x, 480, 440, 520)
    talkCard(x, 480, 300, 120, 'What’s your dream trip?', { rot: -0.05, flip: clamp(prog(t, C[2] + 0.2, C[2] + 0.8) * 2 - 1) })
    star(x, t, { sign: 'cancer', x: 250, y: 350, s: 150, mood: u > 1.2 ? 'sparkle' : 'wide', bangs: '#6a4a2a', seed: 5, hops: [C[2] + 1.4, C[2] + 2.2] })
    star(x, t, { sign: 'capricorn', x: 720, y: 350, s: 150, mood: 'wide', bangs: true, seed: 2 })
    speech(x, t, 260, 130, C[2] + 1.4, 'THE MOON!', { size: 32, life: 1.4, col: '#fff3c8' })
    speech(x, t, 720, 130, C[2] + 2.6, '…Mars?', { size: 32, life: 1.6, col: '#fff3c8' })
  } else if (i === 3) {
    R(x, '#1a1438', 0, 0, SW, SH); R(x, '#3a3450', 0, 430, SW, SH - 430)
    car(x, 600, 470)
    teddy(x, 520, 300 + 6 * Math.sin(t * 6), 1.0)
    star(x, t, { sign: 'capricorn', x: 180, y: 420, s: 150, mood: 'wide', bangs: true, seed: 2, look: [1, 0] })
    star(x, t, { sign: 'cancer', x: 860, y: 430, s: 140, mood: 'heart', bangs: '#6a4a2a', seed: 5, look: [-1, 0] })
    speech(x, t, 520, 80, C[3] + 1.4, 'it won’t FIT', { size: 32, life: 2.6, col: '#ffd0d0' })
  } else {
    nightStreet(x, t, true)
    const [wx] = walk(t, [[C[4], 300, 0], [T.pay + 4, 560, 0]])
    star(x, t, { sign: 'cancer', x: wx - 70, y: 470, s: 130, mood: 'heart', bangs: '#6a4a2a', seed: 5, hops: [C[4] + 0.6, C[4] + 1.6, C[4] + 2.6, C[4] + 3.6] })
    star(x, t, { sign: 'capricorn', x: wx + 70, y: 470, s: 130, mood: 'happy', bangs: true, seed: 2, hops: [C[4] + 1.1, C[4] + 2.1, C[4] + 3.1] })
    handHold(x, t, wx, 470)
    star(x, t, { sign: 'pisces', x: 890, y: 200, s: 90, mood: 'sparkle', tears: 3, bangs: '#3a2a5a', seed: 6 })
  }
}
function B(x, t, K) {
  const i = K.ch(t), u = K.local(t)
  if (i < 0) {
    cozy(x, t); couch(x, 600, 440, 440, '#7a6aa8'); cushion(x, 420, 470)
    star(x, t, { sign: 'cancer', x: 360, y: 380, s: 150, mood: 'wide', seed: 5, squash: -0.15 })
    star(x, t, { sign: 'capricorn', x: 530, y: 360, s: 150, mood: 'happy', seed: 2, look: [-1, 0] })
    return
  }
  if (i === 0) {
    cozy(x, t)
    star(x, t, { sign: 'capricorn', x: 300, y: 380, s: 160, mood: 'neutral', seed: 2, look: [1, 0] })
    star(x, t, { sign: 'cancer', x: 680, y: 380, s: 160, mood: u > SPL + 2.2 ? 'happy' : 'wink', seed: 5, look: [-1, 0] })
    R(x, INK, 440, 280, 120, 110); R(x, '#5a8ad8', 446, 286, 108, 98)
    speech(x, t, 300, 150, C[0] + SPL + 0.2, 'is this shirt clean?', { size: 28, life: 1.8, tail: -1 })
    speech(x, t, 680, 150, C[0] + SPL + 1.6, 'it’s mine.', { size: 28, life: 1.2, tail: 1 })
    speech(x, t, 300, 150, C[0] + SPL + 2.9, 'it’s OURS.', { size: 30, life: 1.8, tail: -1, col: '#ffe0f0' })
  } else if (i === 1) {
    cozy(x, t); dinnerTable(x, 480, 420, 520, '#f4c8a0')
    plate(x, 380, 410, '#e07a3a'); plate(x, 580, 410, '#e07a3a')
    star(x, t, { sign: 'cancer', x: 300, y: 330, s: 150, mood: 'happy', seed: 5 })
    star(x, t, { sign: 'capricorn', x: 660, y: 330, s: 150, mood: 'happy', seed: 2 })
    speech(x, t, 480, 120, C[1] + SPL + 0.4, '“the usual?”', { size: 32, life: 2.6, col: BONE })
  } else if (i === 2) {
    cozy(x, t); dinnerTable(x, 480, 440, 520, '#f4c8a0')
    R(x, INK, 780, 90, 150, 110); R(x, '#7fd0ff', 786, 96, 138, 50); R(x, '#f2e0a0', 786, 146, 138, 48)
    talkCard(x, 480, 300, 120, 'What’s your dream trip?', { rot: 0.05 })
    star(x, t, { sign: 'cancer', x: 250, y: 350, s: 150, mood: u > SPL + 2 ? 'heart' : 'happy', seed: 5 })
    star(x, t, { sign: 'capricorn', x: 700, y: 350, s: 150, mood: 'happy', seed: 2, look: [1, -1] })
  } else if (i === 3) {
    cozy(x, t)
    const op = prog(t, C[3] + SPL + 0.6, C[3] + SPL + 1.6)
    cupboard(x, 300, 430, op)
    if (op > 0.5) speech(x, t, 300, 120, C[3] + SPL + 1.2, '(no squeak)', { size: 30, life: 2.6, col: '#d8ffe0' })
    star(x, t, { sign: 'capricorn', x: 520, y: 380, s: 150, mood: 'wink', seed: 2, look: [-1, 0] })
    star(x, t, { sign: 'cancer', x: 760, y: 380, s: 150, mood: op > 0.6 ? 'sparkle' : 'neutral', tears: op > 0.6 ? 2 : 0, seed: 5, look: [-1, 0] })
  } else {
    nightStreet(x, t, false)
    const [wx] = walk(t, [[C[4], 300, 0], [T.pay + 4, 560, 0]])
    star(x, t, { sign: 'cancer', x: wx - 70, y: 470, s: 130, mood: 'heart', seed: 5, hops: [C[4] + 0.6, C[4] + 1.6, C[4] + 2.6, C[4] + 3.6] })
    star(x, t, { sign: 'capricorn', x: wx + 70, y: 470, s: 130, mood: 'happy', seed: 2, hops: [C[4] + 1.1, C[4] + 2.1, C[4] + 3.1] })
    handHold(x, t, wx, 470)
    star(x, t, { sign: 'pisces', x: 890, y: 200, s: 90, mood: 'sparkle', tears: 3, seed: 6 })
    if (t > T.pay) hearts(x, t, wx, 330, T.pay + 0.3, { n: 6, cell: 7 })
  }
}

export const { DURATION, SCENES, CUES, MUSIC } = makeThenNowX({
  id: 'kxtve07', thing: 'Date night', stamp: '02·14·2016', accent: '#ff8fb1', ending: 'cut', hookTime: '7:00 PM',
  hook: { text: 'Same couple. | *One month* vs *ten years.*' },
  promise: 'Wait for | *the walk home.*',
  chapters: [
    { time: '6 PM', title: 'GETTING READY' }, { time: '7 PM', title: 'DINNER' }, { time: '8 PM', title: 'THE TALK CARD' },
    { time: '9 PM', title: 'THE GIFT' }, { time: '10 PM', title: 'THE WALK HOME' },
  ],
  A, B,
  lines: [
    { t: 3.5, who: 'stars', text: 'the same couple, *ten years apart.*' },
    { t: 7.0, who: 'capricorn', text: 'two hours. one *cologne cloud.*' },
    { t: 11.3, who: 'cancer', text: 'whose shirt? *ours.* obviously.' },
    { t: 16.4, who: 'capricorn', text: 'I can’t read this *fancy menu.*' },
    { t: 20.8, who: 'cancer', text: 'they brought *the usual.* we didn’t ask.' },
    { t: 25.8, who: 'cancer', text: 'dream trip? the *MOON.* maybe Mars?' },
    { t: 30.2, who: 'capricorn', text: 'we already went. *let’s go back.*' },
    { t: 35.2, who: 'cancer', text: 'a bear! it’s *bigger than the car.*' },
    { t: 39.6, who: 'cancer', text: 'you fixed the *squeaky cupboard?*' },
    { t: 44.6, who: 'stars', text: 'one month in: *holding hands.*' },
    { t: 48.8, who: 'stars', text: 'ten years in: *the same hands.*' },
    { t: 51.0, who: 'pisces', text: 'I watch them every night and *cry*' },
    { t: 54.0, who: 'stars', text: 'love got quieter. *never smaller.*' },
  ],
  boxes: [[3.4, 6.4], [6.8, 15.8], [16.2, 25.2], [25.6, 34.6], [35.0, 44.0], [44.4, 53.4], [53.8, 58.3]],
  last: 'Ten years. | *Same hand* to hold.',
  music: { style: 'dreamy', key: 'Gb', seed: 5107 },
  cues: [['whoosh', 0.02, 0.5, 0.05], ['whoosh', C[2] + 0.2, 0.5, 0.035], ['pluck', C[2] + 0.8, 1318.51, 0.035, 0.6, 0], ['pop', C[3] + SPL + 1.6, 1046.5, 0.035, 0], ['glitter', C[3] + SPL + 1.6, C[3] + SPL + 2.2], ['glitter', T.pay + 0.3, T.pay + 1.0]],
})
