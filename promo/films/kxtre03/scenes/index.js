// kxtre03: PLOT TWIST, 'Plot Twist: "Can We Talk Later?"' (115 s vertical, Trends: Extended ep 3, rows in
// promo/films/month2/m41.md; music: screwed · Ebm). Engine: ../../kxtre01/scenes/xkit.js. No end card; hard cut.
// ♋ Cancer gets "can we talk later?" from ♒ Aquarius at 9 A.M. and spirals all day. The friends weigh in (♏ Scorpio,
// ♌ Leo, ♊ Gemini); ♓ Pisces sends a crying voice note and cries through the whole day.
//   0.0–3.8   frame 0: Cancer mid-scream into a pillow, the phone flying out of their hand; shake + whip
//   1 9:04 AM (read it forty times) · 2 THE SPIRAL (loading bar, worst cases) · 3 THE GROUP CHAT · 4 THE REHEARSAL
//   ("it's fine." four ways in the mirror) · 5 THE CLEANING (stress-folded towels) · 6 THE WAIT (the clock crawls)
//   7 THE CALL: answered; PLOT TWIST slam; "can I meet your family at the holidays? I didn't want to ask by text."
//   8 THE AFTER: happy fountains, the chat goes off, the towels stay folded. Last: "Later was | *worth the wait.*"
import {
  makeEp, star, pisces, room, couch, tag, sfx, hearts, sparkles, confetti, phone, clock, label, glowSpot,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, MONO, r3,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#8fd8ff'
const CAN = 'cancer', AQU = 'aquarius'
const bedroom = (x, t, warm = 0) => {
  room(x, t, { wall: '#26305a', wall2: '#2c3866', night: false, warm })
  box(x, 120, 1110, 520, 110, '#c9a6ff', { b: 8, hi: '#e0c8ff' }); box(x, 120, 1060, 160, 60, BONE, { b: 6 })
}
function pillow(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -110, -60, 220, 120, BONE, { b: 8, hi: '#ffffff' }); x.restore() }
function towels(x, cx, base, n) {
  const C = ['#ff8fb1', '#8fd8ff', '#9fe6b0', '#f2c75c', '#c9a6ff']
  for (let i = 0; i < n; i++) box(x, cx - 100 + (i % 2) * 6, base - (i + 1) * 34, 200, 26, C[i % 5], { b: 4 })
}
function mirror(x, t, cx, cy, mood, text, k) {
  box(x, cx - 170, cy - 260, 340, 480, '#b8d8f0', { b: 10 })
  R(x, 'rgba(255,255,255,0.3)', cx - 140, cy - 230, 40, 200)
  x.save(); x.beginPath(); x.rect(cx - 170, cy - 260, 340, 480); x.clip()
  x.save(); x.translate(cx, 0); x.scale(-1, 1); star(x, t, CAN, { x: 0, y: cy + 40, s: 230, mood, look: [0, 0], alpha: 0.85, glyph: false }); x.restore()
  x.restore()
  if (text) tag(x, text, cx, cy - 330, k, { bg: BONE, size: 44 })
}

function hook(x, t, S) {
  bedroom(x, t)
  const sq = 0.08 * Math.sin(t * 30)
  pillow(x, 420, 980, -0.1)
  star(x, t, CAN, { x: 470, y: 900, s: 260, mood: 'squint', look: [-1, 0.6], squash: sq, hops: [0.2, 0.6, 1.0, 1.4] })
  sfx(x, t, 'AAAAA', 300, 760, -0.3, { size: 70, col: ACC, life: 3.5 })
  const f = clamp((t + 0.4) / 3.4)
  x.save(); x.translate(lerp(640, 860, f), lerp(860, 640, f) - 120 * Math.sin(Math.PI * f)); x.rotate(-0.4 + t * 2.5)
  box(x, -60, -100, 120, 200, '#14102c', { b: 6 }); R(x, PINK, -44, -30, 88, 40)
  x.restore()
  pisces(x, t, { x: 920, y: 1180, s: 130, tears: 2, look: [-1, -0.4], noBox: true })
  void S
}

const C = []
C.push({ name: '9:04 AM', dur: 14, stamp: '9:04 AM', caption: 'the text: *no context.*',
  cues: [...Array.from({ length: 18 }, (_, i) => ['whoosh', r3(4.0 + i * 0.5), 0.15, 0.015]), ['tom', 1.2, 100, { gain: 0.25, decay: 0.3 }]],
  draw(x, t, S) {
    bedroom(x, t)
    const reads = Math.floor(1 + 39 * ease.inCubic(prog(S.u, 3.6, 13)))
    star(x, t, CAN, { x: 300, y: 1000, s: 230, mood: S.u > 8 ? 'wide' : 'squint', look: [1, -0.6], hops: S.hops(1.2, 6, 9, 12) })
    const scroll = S.u > 3.6 ? Math.sin(S.u * 7) * 20 : 0
    phone(x, t, 730, 640 + scroll, { w: 440, h: 640, title: '♒ AQUARIUS', size: 34, msgs: [{ at: S.at(1.0), me: false, text: 'can we talk later?' }] })
    tag(x, `READ IT: ${reads}×`, 730, 1080, S.w(3.6, 14), { bg: PINK, size: 40, rot: -0.05 })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 1, look: [-1, -1], pop: S.w(5, 14) })
  } })
C.push({ name: 'THE SPIRAL', dur: 14, caption: 'my brain: *worst case only.*',
  fx: [['load', { at: 0.8, len: 5.0, label: 'what did I do…', stallAt: 99, error: 'Error: assumed the worst', y: 640 }]],
  bubbles: [
    { at: 6.4, end: 9.4, x: 300, y: 560, text: 'they found my old posts', think: true, size: 34 },
    { at: 8.4, end: 11.4, x: 760, y: 470, text: 'I said "lol" wrong', think: true, size: 34 },
    { at: 10.4, end: 13.8, x: 520, y: 700, text: 'they want their hoodie back', think: true, size: 34 },
  ],
  draw(x, t, S) {
    bedroom(x, t)
    star(x, t, CAN, { x: 540, y: 1020, s: 260, mood: S.u > 6 ? 'wide' : 'squint', look: [0, -1], squash: 0.03 * Math.sin(t * 25), hops: S.hops(6.4, 8.4, 10.4) })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 2, look: [-1, -1], pop: S.w(2, 14) })
  } })
C.push({ name: 'THE GROUP CHAT', dur: 14, caption: 'the chat *weighs in.*',
  cues: [['pop', 1.0, 880, 0.04, 0], ['pop', 3.2, 987.77, 0.04, 0], ['pop', 5.4, 783.99, 0.04, 0], ['pluck', 5.6, 392, 0.04, 0.5, 0], ['pluck', 5.9, 349.23, 0.04, 0.5, 0], ['pop', 8.6, 1046.5, 0.04, 0], ['tick', 11.4, 0.05]],
  draw(x, t, S) {
    bedroom(x, t)
    phone(x, t, 560, 640, { w: 640, h: 820, title: 'THE STARS GROUP CHAT', size: 32, msgs: [
      { at: S.at(-30), me: true, text: 'they said "can we talk later?"', col: '#ffd0e0' },
      { at: S.at(1.0), me: false, text: '♏ screenshot it. zoom in.' },
      { at: S.at(3.2), me: false, text: '♌ be the bigger star' },
      { at: S.at(5.4), me: false, text: '♓ ▶ voice note 0:47 (crying)' },
      { at: S.at(8.6), me: false, text: '♊ or… ask them?' },
    ] })
    star(x, t, CAN, { x: 200, y: 1250, s: 180, mood: S.u > 11.4 ? 'eyeroll' : 'wide', look: [1, -1], hops: S.hops(1.0, 3.2, 5.4, 8.6) })
    if (S.u > 11.4) sfx(x, t, 'no.', 300, 1080, S.at(11.4), { size: 50, col: ACC })
    pisces(x, t, { x: 900, y: 1250, s: 170, tears: S.u > 5.4 ? 3 : 2, look: [-1, -1], hops: S.hops(5.4, 5.8) })
  } })
C.push({ name: 'THE REHEARSAL', dur: 14, caption: "practising *“it's fine.”*",
  cues: [2.0, 5.0, 8.0, 11.0].flatMap((v, i) => [['pop', v, [659.25, 783.99, 880, 523.25][i], 0.05, 0.2], ['tick', r3(v + 0.02), 0.04]]),
  draw(x, t, S) {
    room(x, t, { wall: '#26305a', wall2: '#2c3866', window: false, art: false })
    const takes = [["it's fine.", 'neutral'], ["it's FINE.", 'wide'], ["it's fine :)", 'happy'], ["it's… fine.", 'squint']]
    const k = Math.min(3, Math.floor(clamp((S.u - 2) / 3, 0, 3.99)))
    const [txt, mood] = takes[k]
    mirror(x, t, 680, 820, mood, S.u > 2 ? txt : null, S.w(2 + k * 3, 2 + k * 3 + 2.8))
    star(x, t, CAN, { x: 300, y: 1060, s: 240, mood, look: [1, -0.2], hops: S.hops(2, 5, 8, 11) })
    tag(x, `TAKE ${k + 1}`, 300, 760, S.w(2, 14), { bg: GOLD, size: 32, rot: 0.05 })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 2, look: [-1, -1], pop: S.w(6, 14) })
  } })
C.push({ name: 'THE CLEANING', dur: 13, caption: 'stress-folding *every towel.*',
  cues: Array.from({ length: 16 }, (_, i) => ['whoosh', r3(1.0 + i * 0.7), 0.12, 0.02]),
  draw(x, t, S) {
    room(x, t, { wall: '#2a2f58', wall2: '#30366a', night: false })
    const n = Math.floor(clamp((S.u - 1) / 0.7, 0, 16))
    towels(x, 740, 1240, n)
    const flap = Math.sin(S.u * 9)
    star(x, t, CAN, { x: 340, y: 1060, s: 240, mood: 'squint', look: [1, 0], squash: 0.05 * flap, hops: S.hops(...Array.from({ length: 16 }, (_, i) => 1 + i * 0.7)) })
    if (S.u > 1) box(x, 420 + flap * 20, 960 - Math.abs(flap) * 30, 140, 26, ['#ff8fb1', '#8fd8ff', '#9fe6b0'][n % 3], { b: 4 })
    tag(x, `TOWELS FOLDED: ${n * 3 + 1}`, 540, 470, S.w(1.2, 13), { bg: MINT, size: 40 })
    pisces(x, t, { x: 140, y: 1420, s: 120, tears: 2, look: [1, -1], pop: S.w(4, 13) })
  } })
C.push({ name: 'THE WAIT', dur: 13, caption: 'the day *crawls.*',
  cues: Array.from({ length: 13 }, (_, i) => ['tick', r3(0.5 + i), 0.04]),
  draw(x, t, S) {
    room(x, t, { wall: '#262048', wall2: '#2d2654', night: S.u > 8 })
    couch(x, 540, 1200, { w: 640 })
    const p = ease.inOutCubic(prog(S.u, 0.4, 12)), mins = 15 * 60 + 238 * p
    clock(x, 540, 560, 110, mins)
    const hh = Math.floor(mins / 60) - 12, mm = Math.floor(mins % 60)
    label(x, `${hh}:${String(mm).padStart(2, '0')} PM`, 540, 720, { size: 46, col: ACC })
    star(x, t, CAN, { x: 470, y: 1030, s: 220, mood: S.u > 9 ? 'sleepy' : 'neutral', look: [0.6, 0.6], hops: S.hops(3, 6, 9) })
    box(x, 600, 1010, 50, 80, '#14102c', { b: 5 })
    pisces(x, t, { x: 760, y: 1060, s: 170, tears: 2, look: [-1, 0], noBox: true, mood: 'sparkle' })
  } })
C.push({ name: 'THE CALL', dur: 14, stamp: '6:58 PM', caption: 'then the call. *plot twist.*', captionAt: 7.0,
  fx: [
    ['call', { at: 0.5, out: [4.4, 4.6], name: 'Aquarius', sub: 'incoming call…', glyph: '♒', color: '#7fd0f0', answerAt: 3.6 }],
    ['slam', { at: 4.7, text: '*PLOT* TWIST', top: 520, size: 140, out: [6.8, 7.0], accentColor: RED }],
    ['glitch', { at: 4.7, len: 0.6, dialog: false }],
  ],
  bubbles: [
    { at: 7.4, end: 10.6, x: 780, y: 520, text: 'can I meet your family at the holidays?', tail: -0.3, size: 34 },
    { at: 10.2, end: 13.8, x: 760, y: 700, text: "I didn't want to ask by text.", tail: -0.3, size: 34 },
  ],
  draw(x, t, S) {
    split(x, t, S)
  } })
function split(x, t, S) {
  // a call split: Cancer on the couch (left), Aquarius at home (right)
  room(x, t, { wall: '#262048', wall2: '#2d2654', night: true })
  R(x, INK, 534, 0, 12, 1920)
  glowSpot(x, 800, 900, 300, '127,208,240', 0.25)
  const melt = S.u > 10.5
  star(x, t, CAN, { x: 290, y: 1000, s: 230, mood: melt ? 'sparkle' : S.u > 7.4 ? 'wide' : 'squint', look: [1, -0.2], hops: S.hops(7.6, 10.6, 11.0) })
  if (melt) { star(x, t, CAN, { x: 290, y: 1000, s: 230, mood: 'sparkle', look: [1, -0.2], tears: 3, hops: S.hops(10.6, 11.0) }); hearts(x, t, S.at(10.8), 290, 860) }
  star(x, t, AQU, { x: 800, y: 1000, s: 230, mood: S.u > 7.4 ? 'happy' : 'neutral', look: [-1, -0.2], hops: S.hops(7.4, 7.9, 10.2, 10.7), blush: 1 })
  pisces(x, t, { x: 140, y: 1420, s: 120, tears: 3, look: [1, -1], pop: S.w(8, 14) })
}
C.push({ name: 'THE AFTER', dur: 15, caption: null,
  fx: [
    ['notif', { at: 1.2, out: [4.6, 4.9], title: 'group chat', body: '♏ WE KNEW IT. (we did not know it)', glyph: '♏' }],
    ['notif', { at: 5.2, out: [8.4, 8.7], title: 'group chat', body: '♓ ▶ voice note 1:12 (crying, *happy*)', glyph: '♓' }],
  ],
  bubbles: [{ at: 1.6, end: 5.0, x: 330, y: 620, text: 'yes. YES. obviously yes.', tail: 0.2, size: 36 }],
  cues: [['glitter', 0.4, 1.2], ['pluck', 9.0, 659.25, 0.04, 0.5, 0], ['pluck', 9.2, 783.99, 0.04, 0.5, 0]],
  draw(x, t, S) {
    room(x, t, { wall: '#2c2350', wall2: '#33295c', night: true, warm: 1 })
    towels(x, 860, 1240, 16)
    tag(x, 'STILL FOLDED', 860, 620, S.w(2, 15), { bg: MINT, size: 30 })
    star(x, t, CAN, { x: 380, y: 1040, s: 280, mood: 'sparkle', look: [0, -0.4], tears: 3, hops: S.hops(0.4, 0.9, 1.4, 5.4, 9.0, 9.5) })
    if (S.u > 0.4) confetti(x, t, S.at(0.4), 380, 800)
    hearts(x, t, S.at(2 + Math.floor(S.u / 2) * 2), 380, 860, { n: 5 })
    pisces(x, t, { x: 160, y: 1440, s: 150, tears: 3, look: [1, -1], hops: S.hops(5.4, 5.9, 9.2) })
  } })

const EP = makeEp({
  id: 'kxtre03', bug: 'PLOT TWIST', lead: CAN, accent: ACC, deep: '#2f6fb0',
  music: { style: 'screwed', key: 'Ebm', seed: 4103, breakdown: [70.8], lift: [84.8] },
  hook: {
    text: '“Can we talk later?” | at *9 A.M.*', len: 3.8, draw: hook, top: 250, size: 100,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['shake', { at: -0.1, len: 0.7, amp: 24 }]],
  },
  promiseAt: 1.4,
  promise: 'wait for *the plot twist.*',
  chapters: C,
  last: { text: 'Later was | *worth the wait.*', at: 13.2, top: 300, size: 104 },
  ending: 'cut',
  hits: [89.5, 100.6],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [sparkles, GOLD, BONE, SKYB, INTER, MONO, lerp]
