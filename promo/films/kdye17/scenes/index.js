// kdye17: DATE YOURSELF, "Solo Day Trip" (66 s vertical, LONG, star_advice post, pop · A, LOOP). Row: month2/m16.md.
// Feeling: scared to do things alone with no one to talk to. Engine: ../../kdye01/dykit.js · props: ../../kdye01/props.js.
// Promise up front: "the ending, though." Payoff: the voice note it records… sent to itself.
//   0.0–3.4   FRAME 0: ♊ Gemini mid-leap through closing train doors. Whip at 0.12.
//             Hook "Gemini, solo day trip. | *No group chat.*" Stamp at 1.3.
//   CH 1 THE TRAIN             3.4 the window seat (the urge to narrate the cows) · 10.6 the text it deletes
//   CH 2 THE NEW NEIGHBOURHOOD 18.0 the market (free samples) · 25.6 a dog says hi (Biscuit)
//   CH 3 THE OPEN MIC          33.0 just listening · 40.6 Pisces sobs in the audience; Gemini claps (and cries a bit)
//   CH 4 SUNSET                48.0 the bridge at sunset · 56.0 a voice note… "to: me"
//   64.2–66   last line "You were the best | *person to go with.*", then a loop back to frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../../kdye01/dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, INTER, MONO, R, box, room, street, phone, mug, table, shadow, glow, drawBits, sun, plateText,
  sparkles, hearts, bubble, label, pop01, outK, r3, CORAL, SKYB, MINT,
} from '../../kdye01/props.js'

const D = 66.0
const GEM = '#ffd23a'
const ST = { window: [3.4, 10.6], text: [10.6, 18.0], market: [18.0, 25.6], dog: [25.6, 33.0], mic: [33.0, 40.6], crowd: [40.6, 48.0], bridge: [48.0, 56.0], note: [56.0, 66.0] }
const NOTE = ['..NN', '..NN', '..N.', '..N.', 'NNN.', 'NNN.']
const DOG = ['B.....BB.', 'BB...BBBB', 'BBBBBBBYB', 'BBBBBBBBN', 'BBBBBBB..', 'B.B..B.B.']
const COW = ['WWBWWWW.', 'WBBWWBWW', 'WWWWWWWW', 'W.W..W.W']

function trainCar(x, t, u, fields = true) {
  R(x, '#3a4a6a', 0, 0, 1080, 1920)
  box(x, 60, 440, 960, 520, '#8fd3ff', { b: 12 })
  x.save(); x.beginPath(); x.rect(60, 440, 960, 520); x.clip()
  R(x, '#ffd8a0', 60, 440, 960, 260); R(x, '#5fbf6f', 60, 700, 960, 260)
  for (let i = 0; i < 8; i++) { const bx = ((i * 260 - u * 520) % 2080 + 2080) % 2080 - 200; R(x, '#3f8f5a', bx, 650, 120, 60); if (fields && i % 3 === 0) drawBits(x, COW, { W: BONE, B: INK }, bx + 180, 800, 12) }
  x.restore()
  R(x, INK, 530, 440, 20, 520)
  for (let i = 0; i < 3; i++) box(x, 90 + i * 330, 1000, 260, 260, '#c84a5a', { b: 6 })
}

function opener(x, t, S) {
  R(x, '#2a2a4a', 0, 0, 1080, 1920)
  R(x, '#8c86a8', 0, 1300, 1080, 40)
  // the train doors, mid-close
  const c = 0.6 + 0.15 * clamp(t / 3)
  box(x, 140, 560, 800, 760, '#c9c2d8', { b: 10 })
  R(x, '#14102a', 160, 580, 760, 720)
  box(x, 160, 580, 380 * c, 720, '#e8504a', { b: 6 }); box(x, 920 - 380 * c, 580, 380 * c, 720, '#e8504a', { b: 6 })
  R(x, '#8fd3ff', 200, 640, 380 * c - 80, 200); R(x, '#8fd3ff', 960 - 380 * c, 640, 380 * c - 80, 200)
  S.hero(x, t, { x: 540, y: 1050, s: 280, mood: 'wide', look: [1, 0], squash: -0.12 })
  label(x, 'DOORS CLOSING', 540, 520, { size: 34, col: RED })
  S.pis(x, t, { x: 930, y: 1480, s: 130, mood: 'wide', look: [-1, -0.6] }, 1)
}

function windowSeat(x, t, S) {
  const { u } = S
  trainCar(x, t, u)
  S.hero(x, t, { x: 420, y: 1120, s: 250, mood: u > 4.2 ? 'sparkle' : 'wide', look: [0.4, -1], hops: [S.a + 0.8, S.a + 1.6, S.a + 2.4] })
  ;['omg COWS', 'must tell everyone', 'should I post the cows'].forEach((s, i) => bubble(x, t, 700, 1080 + i * 0, S.a + 0.6 + i * 0.9, S.a + 1.5 + i * 0.9, s, { size: 30, col: '#d8d0f0', tail: -0.4 }))
}
function deleteText(x, t, S) {
  const { u } = S
  trainCar(x, t, u + 7)
  const msg = 'you guys!!! the'
  const n = u < 1.6 ? Math.floor(msg.length * prog(u, 0.3, 1.6)) : Math.max(0, Math.floor(msg.length * (1 - prog(u, 2.2, 3.0))))
  const away = ease.inCubic(prog(u, 3.4, 4.0))
  phone(x, 680, lerp(1100, 1700, away), { s: 1.4, rot: -0.08, draw: c => { c.font = `700 12px ${MONO}`; c.fillStyle = '#9fe6b0'; c.textAlign = 'center'; c.fillText('GROUP CHAT', 0, -90); c.fillStyle = BONE; c.textAlign = 'left'; c.fillText(msg.slice(0, n) + (Math.floor(t * 3) % 2 ? '|' : ''), -50, 40) } })
  S.hero(x, t, { x: 330, y: 1120, s: 250, mood: u > 4.0 ? 'happy' : 'neutral', look: u > 4.0 ? [0.4, -1] : [1, 0.6], hops: [S.a + 4.0] })
}
function market(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1260, sky: 'day', lamps: [], tint: '#3a3260' })
  for (const [sx, col] of [[90, '#e8504a'], [580, '#4f7cd8']]) {
    for (let i = 0; i < 4; i++) R(x, i % 2 ? BONE : col, sx + i * 105, 700, 105, 80)
    box(x, sx + 10, 1020, 400, 200, '#6b4428', { b: 6 })
    for (let i = 0; i < 6; i++) { x.fillStyle = [CORAL, GOLD, MINT, PINK][i % 4]; x.beginPath(); x.arc(sx + 60 + i * 60, 1000, 26, 0, Math.PI * 2); x.fill() }
  }
  S.npc(x, t, { sign: 'cancer', x: 780, y: 880, s: 120, mood: 'happy', look: [-1, 0] })
  const taste = u > 2.6
  S.hero(x, t, { x: 420, y: 1240, s: 240, mood: taste ? 'heart' : 'sparkle', look: [1, -0.4], hops: [S.a + 2.6] })
  if (taste) hearts(x, t, S.a + 2.6, 420, 1080, { n: 4 })
  plateText(x, 'FREE SAMPLE', 700, 1110, { size: 26, bg: INK, col: GOLD, rot: 0.05 })
}
function dog(x, t, S) {
  const { u } = S
  street(x, t, { horizon: 1260, sky: 'day', lamps: [180, 900], tint: '#3a3260' })
  const dx = lerp(1200, 640, ease.outCubic(prog(u, 0.2, 1.4)))
  drawBits(x, DOG, { B: '#c88a4a', Y: INK, N: INK }, dx, 1200 + 3 * Math.sin(t * 8), 16)
  if (u > 1.4) hearts(x, t, S.a + 1.4, 640, 1100, { n: 5 })
  S.npc(x, t, { sign: 'taurus', x: 880, y: 1040, s: 170, mood: 'happy', look: [-1, 0] })
  R(x, '#e8504a', 700, 1100, 160, 6)
  S.hero(x, t, { x: 360, y: 1120, s: 250, mood: u > 1.4 ? 'heart' : 'wide', look: [1, 0.6], hops: [S.a + 1.5, S.a + 1.9] })
}
function cafe(x, t) {
  room(x, { wall: '#5a3a3a', wall2: '#52343a', floor: '#3a2a2a', floorY: 1320, stripes: false })
  box(x, 300, 860, 480, 80, '#8a5a3a', { b: 6 })
  x.save(); x.globalCompositeOperation = 'lighter'; glow(x, 540, 700, 420, '255,220,150', 0.3); x.restore()
  R(x, INK, 640, 640, 10, 220); box(x, 620, 610, 50, 40, '#8c86a8', { b: 4 })
  for (let i = 0; i < 4; i++) { const p = ((t * 0.45 + i / 4) % 1); drawBits(x, NOTE, { N: [GOLD, PINK, SKYB][i % 3] }, 300 + i * 160, 760 - p * 300, 9, { alpha: Math.sin(Math.PI * p) }) }
}
function mic(x, t, S) {
  const { u } = S
  cafe(x, t)
  S.npc(x, t, { sign: 'libra', x: 520, y: 760, s: 170, mood: 'happy', look: [0.6, 0], hops: Array.from({ length: 8 }, (_, i) => S.a + i * 0.9) })
  table(x, 330, 1200, 260)
  mug(x, 380, 1200, { col: '#ffd0e4', steam: 0.6, t })
  S.hero(x, t, { x: 260, y: 1080, s: 220, mood: u > 3.8 ? 'sparkle' : 'happy', look: [1, -0.6] })
}
function crowd(x, t, S) {
  const { u } = S
  cafe(x, t)
  S.npc(x, t, { sign: 'libra', x: 520, y: 760, s: 170, mood: 'sleepy', look: [0, 0], zzz: false })
  S.pis(x, t, { x: 800, y: 1100, s: 180, mood: 'sparkle', look: [-0.6, -1] }, 3)
  const clap = u > 3.6
  S.hero(x, t, { x: 300, y: 1100, s: 230, mood: clap ? 'happy' : 'sparkle', look: [1, -0.6], tears: u > 2.0 ? 2 : 0, hops: clap ? [S.a + 3.6, S.a + 3.9, S.a + 4.2] : [] })
  if (clap) [3.6, 3.9, 4.2].forEach((c, i) => { const k = pop01(t, S.a + c, 0.2, 3) * outK(t, [S.a + c + 0.4, S.a + c + 0.6]); if (k > 0.01) label(x, 'CLAP!', [200, 420, 300][i], [900, 880, 820][i], { size: 40 * k, col: GOLD, font: INTER, weight: 800 }) })
}
function bridge(x, t, S) {
  const { u } = S
  const g = x.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, '#2a1f5a'); g.addColorStop(0.6, '#ff7a6a'); g.addColorStop(1, '#ffc88a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1200)
  sun(x, 540, lerp(980, 1120, prog(u, 0, 8)), 130, 1)
  R(x, '#3a5aa0', 0, 1180, 1080, 740); for (let i = 0; i < 10; i++) R(x, 'rgba(255,200,150,0.5)', 400 + ((i * 53) % 280), 1220 + i * 40, 100 - i * 6, 6)
  R(x, INK, 0, 1150, 1080, 20); for (let i = 0; i < 1080; i += 80) R(x, INK, i, 1060, 12, 100); R(x, INK, 0, 1050, 1080, 14)
  S.hero(x, t, { x: 320, y: 960, s: 240, mood: u > 3.6 ? 'sparkle' : 'happy', look: [0.6, 0.2] })
}
function voiceNote(x, t, S) {
  const { u } = S
  bridge(x, t, { ...S, u: u + 8 })
  const sent = u > 6.0
  phone(x, 720, 760, { s: 2.2, rot: 0.04, draw: c => {
    c.font = `700 10px ${MONO}`; c.textAlign = 'center'; c.fillStyle = '#9fe6b0'; c.fillText('VOICE NOTE', 0, -90)
    c.fillStyle = BONE; c.fillText('to:', -20, -70); c.fillStyle = GOLD; c.font = `800 12px ${INTER}`; c.fillText(u > 1.2 ? 'me' : '…', 10, -70)
    for (let i = 0; i < 12; i++) { const h = u > 1.6 && !sent ? 6 + 26 * Math.abs(Math.sin(t * 9 + i * 1.3)) : 6; c.fillStyle = '#9fe6b0'; c.fillRect(-48 + i * 8, -10 - h / 2, 5, h) }
    c.fillStyle = sent ? '#5fd38a' : '#e8504a'; c.fillRect(-36, 60, 72, 26); c.fillStyle = INK; c.font = `800 11px ${INTER}`; c.fillText(sent ? 'SENT ✓' : '● REC', 0, 77)
  } })
  if (sent) { sparkles(x, t, 720, 960, S.a + 6.0, 12, 200, 1); hearts(x, t, S.a + 6.1, 320, 800, { n: 6 }) }
  S.pis(x, t, { x: 900, y: 1500, s: 120, mood: 'happy', look: [-1, -1] }, sent ? 3 : 2)
}

const stop = (k, draw, cues = []) => ({ a: ST[k][0], b: ST[k][1], sticker: null, draw, cues })
const EP = makeDate({
  id: 'kdye17', sign: 'gemini', name: 'Gemini', D, ending: 'loop',
  hook: 'Gemini, solo day trip. | *No group chat.*', hookSize: 100, hookAccent: GEM,
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.45, from: 1.5 } }],
  promise: { text: 'the *ending,* though.', at: 3.6, out: [9.6, 9.9], top: 400 },
  chapters: [
    { at: 3.4, out: [17.6, 18.0], n: 1, title: 'THE TRAIN' },
    { at: 18.0, out: [32.6, 33.0], n: 2, title: 'THE NEW NEIGHBOURHOOD' },
    { at: 33.0, out: [47.6, 48.0], n: 3, title: 'THE OPEN MIC' },
    { at: 48.0, out: [63.8, 64.1], n: 4, title: 'SUNSET' },
  ],
  opener,
  stops: [
    stop('window', windowSeat, [0.6, 1.5, 2.4].map((a, i) => ['pop', a, [880, 987.77, 1174.66][i], 0.035, 0.3])),
    stop('text', deleteText, [...Array.from({ length: 8 }, (_, i) => ['tick', r3(0.3 + i * 0.16), 0.02]), ...Array.from({ length: 6 }, (_, i) => ['tick', r3(2.2 + i * 0.13), 0.025]), ['whoosh', 3.4, 0.4, 0.03]]),
    stop('market', market, [['whoosh', 0.02, 0.4, 0.035], ['pluck', 2.6, 1174.66, 0.04, 0.5, 0]]),
    stop('dog', dog, [['whoosh', 0.2, 0.5, 0.03], ['pop', 1.4, 1318.51, 0.045, 0.2], ['pop', 1.5, 1567.98, 0.035, 0.2]]),
    stop('mic', mic, [['whoosh', 0.02, 0.4, 0.035]]),
    stop('crowd', crowd, [['pluck', 2.0, 659.25, 0.03, 0.8, -0.3], ['clap', 3.6, { gain: 0.12, pan: -0.3 }], ['clap', 3.9, { gain: 0.12, pan: 0.3 }], ['clap', 4.2, { gain: 0.14 }]]),
    stop('bridge', bridge, [['whoosh', 0.02, 0.4, 0.035], ['bell', 1.0, 1760, 0.025, 1.4, 0]]),
    stop('note', voiceNote, [['pop', 1.2, 880, 0.04, 0.3], ['riser', 1.6, 6.0, 0.012], ['pop', 6.0, 1567.98, 0.06, 0], ['bell', 6.05, 2093, 0.04, 1.4, 0], ['glitter', 6.0, 6.6]]),
  ],
  lines: [
    { t: 4.0, who: 'hero', text: 'who do I *tell* about the cows?' },
    { t: 7.2, who: 'stars', text: 'nobody. just *look* at them.' },
    { t: 11.2, who: 'hero', text: 'you guys!!! the… *never mind.*' },
    { t: 14.6, who: 'stars', text: "some views don't need a *caption.*" },
    { t: 18.8, who: 'hero', text: 'free samples? *for me?*' },
    { t: 22.0, who: 'stars', text: 'a new street. a *new* favourite.' },
    { t: 26.4, who: '♉︎ A LOCAL', text: "his name's *Biscuit.*" },
    { t: 29.6, who: 'hero', text: 'best stranger *ever.*' },
    { t: 33.8, who: 'stars', text: 'just listen. no *commentary.*' },
    { t: 37.2, who: 'hero', text: "…I don't want to *talk.* wow." },
    { t: 41.4, who: 'pisces', text: 'that song was about *ME.*' },
    { t: 44.6, who: 'stars', text: "you're *both* crying. good." },
    { t: 48.8, who: 'stars', text: 'sunset. *front row.* solo.' },
    { t: 52.2, who: 'hero', text: 'I never stopped *talking* long enough.' },
    { t: 56.6, who: 'hero', text: 'voice note… to *me.*' },
    { t: 59.4, who: 'hero', text: 'today was *good.* you were *good.*' },
  ],
  boxes: [[3.8, 10.4, [0, 1]], [11.0, 17.8, [2, 3]], [18.6, 25.4, [4, 5]], [26.2, 32.8, [6, 7]], [33.6, 40.4, [8, 9]], [41.2, 47.8, [10, 11]], [48.6, 55.8, [12, 13]], [56.4, 63.8, [14, 15]]],
  last: { t: 64.2, text: 'You were the best | *person to go with.*', top: 300, size: 92, accent: GEM },
  cues: [['whoosh', 0.0, 0.5, 0.05], ['tick', 0.12, 0.06]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, shadow, outK, r3]
