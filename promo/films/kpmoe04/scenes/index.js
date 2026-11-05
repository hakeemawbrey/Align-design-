// kpmoe04 · Planet Talk: The Moon · to Cancer (its home sign) · "Who Takes Care of Cancer?" (70.5 s, LONG, hard cut)
// dreamy · Ab. Four chapters, a beat every ~3 s, the payoff promised up front ("stay for who knocks").
//   0      frame 0: the Moon mid-zoom through the kitchen window, Cancer mid-wash at 2 a.m. beside a wobbling plate
//          tower; "CANCER. Hush. | Who fed *you?*" · 0.8 HUSH (tape stop, "shh…") · 2.4 "Stay for *who knocks.*"
//   5.0    ① THE HOST: "everyone came over! I made *three* soups." · tonight's checklist ticks · the Moon: "and who
//          asked how *you* were?" · "…oh. nobody. but that's *fine!*" · "in astrology, i rule you. so i *felt* that."
//  22.2    ② THE PHASES: "even i wane. i'm not full *every night.*" · phase strip · "you don't have to be either."
//          · Cancer sits down: "…i'm actually *tired.*"
//  36.4    ③ THE ASK: the draft "can I vent for a sec?" typed and deleted ×3 · "being needed isn't the same as being
//          *held.*" · "send it." · sent · seen · typing…
//  54.0    ④ THE KNOCK: knock knock · the door: Pisces with soup, sobbing "I brought *soup.* for YOU." · "…for *me?*"
//          · on the floor together, Cancer finally talks · the Moon dims the light: "there it is. *full again.*"
//  69.0    "Full moon for everyone. | *Tonight,* for you." · hard cut at 70.5
import { moonFilm, HK } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const C1 = 5.0, C2 = 22.2, C3 = 36.4, C4 = 54.0, DOOR = 55.2, FLOOR = 61.8, DIM = 64.8, END = 70.5
const SINK = { x: 340, y: 1230, s: 300 }

function plates(x, K, t, X, Y, n) {
  const wob = Math.sin(t * 3.2) * 0.03 + (t > 16 && t < 18.4 ? Math.sin(t * 14) * 0.09 * (1 - prog(t, 16, 18.4)) : 0)
  x.save(); x.translate(X, Y); x.rotate(wob)
  for (let i = 0; i < n; i++) { K.box(x, -90 + Math.sin(i * 1.7) * 8, -28 - i * 30, 180, 22, i % 3 ? '#efe6d6' : '#cfe0ff', { o: 4 }) }
  x.restore()
}
function kitchen(x, t, K) {
  K.room(x, t, { wall: '#3e3260', wall2: '#221a40', floor: '#3a2f4e', warm: 0.5, frame: '#c98a5a' })
  // the door (right), swings open at DOOR
  const open = ease.outBack(prog(t, DOOR, DOOR + 0.5), 1.4)
  K.box(x, 800, 780, 240, 600, '#140c28', { o: 8 })
  if (open > 0) { x.save(); x.globalAlpha = 0.5 * open; const g = x.createLinearGradient(800, 0, 1040, 0); g.addColorStop(0, 'rgba(255,214,140,0.9)'); g.addColorStop(1, 'rgba(255,214,140,0.2)'); x.fillStyle = g; x.fillRect(800, 780, 240, 600); x.restore() }
  const w = 240 * (1 - 0.82 * clamp(open))
  K.box(x, 800, 780, w, 600, '#8a5a3a', { o: 6 }); if (w > 80) { K.rect(x, 800 + w - 50, 1080, 22, 22, '#f2c75c'); K.rect(x, 820, 820, w - 40, 220, '#7a4a2e'); K.rect(x, 820, 1080 + 40, w - 40, 220, '#7a4a2e') }
  // the counter + sink (left)
  if (t < FLOOR) {
    K.box(x, -40, 1380, 700, 60, '#d8d0e8', { o: 6 }); K.box(x, -40, 1440, 680, 480, '#5a4a7a', { o: 6 })
    K.box(x, 220, 1388, 240, 30, '#9aa3d6', { o: 4 })
    K.rect(x, 330, 1290, 14, 92, '#b8bdd8'); K.rect(x, 330, 1290, 70, 14, '#b8bdd8')
    const n = Math.round(lerp(11, 6, prog(t, 4, 20)))
    plates(x, K, t, 110, 1380, n)
  }
}
function draftText(t) {
  const typeIn = (s, a, b) => s.slice(0, Math.floor(s.length * clamp(prog(t, a, b))))
  const del = (s, a, b) => s.slice(0, Math.ceil(s.length * (1 - clamp(prog(t, a, b)))))
  const A = 'can I vent for a sec?', B = 'hey are you up', C = 'is it ok if'
  if (t < 38.6) return typeIn(A, 37.0, 38.3)
  if (t < 39.2) return del(A, 38.6, 39.0)
  if (t < 40.6) return typeIn(B, 39.3, 40.3)
  if (t < 41.1) return del(B, 40.6, 40.95)
  if (t < 42.3) return typeIn(C, 41.2, 42.0)
  if (t < 42.8) return del(C, 42.3, 42.6)
  if (t < 49.2) return ''
  if (t < 49.6) return typeIn(A, 48.0, 49.0)
  return ''
}
const DELS = [38.6, 40.6, 42.3]

const LIST = ['cooked for six', 'two breakups, listened', 'leftovers packed for all', 'the dishes (still going)']
const F = moonFilm({
  id: 'kpmoe04', sign: 'cancer', dur: END, ending: 'cut',
  hook: { text: 'CANCER. Hush. | Who fed *you?*', out: [2.2, 2.4] },
  enter: { kind: 'zoom', at: -0.55, x: 800, y: 540, size: 380 },
  whip: false,
  hush: [{ at: 0.8, len: 1.4 }],
  flashes: [0.35],
  shakes: [54.4, 54.85],
  chapters: [
    { at: C1, out: [C2 - 0.4, C2 - 0.2], n: 1, title: 'the host', y: 150 },
    { at: C2, out: [C3 - 0.4, C3 - 0.2], n: 2, title: 'the phases', y: 150 },
    { at: C3, out: [C4 - 0.4, C4 - 0.2], n: 3, title: 'the ask', y: 150 },
    { at: C4, out: [END - 2.2, END - 2.0], n: 4, title: 'the knock', y: 150 },
  ],
  moon: [
    { at: 0, mood: 'wide' },
    { at: 1.0, mood: 'sleepy' },
    { at: 2.3, mood: 'sad' },
    { at: 12.3, mood: 'sly' },
    { at: 18.5, mood: 'cry', tears: 1 },
    { at: C2, mood: 'neutral', tears: 0 },
    { at: 30.1, mood: 'happy' },
    { at: 42.9, mood: 'sad' },
    { at: 46.7, mood: 'happy' },
    { at: 51.4, mood: 'wide' },
    { at: DOOR, mood: 'love' },
    { at: DIM, x: 820, y: 560, size: 260, mood: 'happy', d: 1.2 },
    { at: 68.4, mood: 'love' },
  ],
  me: [
    { at: 0, ...SINK, mood: 'wide', look: [1, -0.5], squash: 0.06 },
    { at: 2.3, mood: 'sleepy', squash: 0 },
    { at: 5.5, mood: 'happy', look: [1, -0.3] },
    { at: 12.3, mood: 'wide' },
    { at: 15.5, mood: 'happy', look: [0, 0] },
    { at: 18.5, mood: 'sparkle', tears: 1, look: [1, -0.5] },
    { at: C2, mood: 'neutral', tears: 0 },
    { at: 30.1, mood: 'sparkle' },
    { at: 33.6, y: 1300, mood: 'sleepy', squash: 0.1, d: 0.6 },
    { at: C3, y: 1260, x: 300, mood: 'squint', look: [1, 0.3], squash: 0 },
    { at: 42.9, mood: 'sparkle', tears: 1, look: [1, -0.5] },
    { at: 47.9, mood: 'squint', look: [1, 0.3], tears: 0 },
    { at: 50.6, mood: 'wide' },
    { at: 54.3, mood: 'wide', look: [1, 0] },
    { at: DOOR, mood: 'sparkle', look: [1, 0] },
    { at: 59.5, mood: 'heart', tears: 2 },
    { at: FLOOR, x: 360, y: 1470, s: 270, mood: 'happy', tears: 1, look: [1, 0], d: 0.7 },
    { at: 68.4, mood: 'happy', tears: 2 },
  ],
  meHops: [5.6, 33.7, 50.6, 54.4, 59.7, 62.1],
  meProp(x, t, m, K) {
    // the plate in its hands while washing (chapter 1)
    if (t < C2) { x.save(); x.translate(m.x + m.s * 0.4, m.y + m.s * 0.32); x.rotate(Math.sin(t * 6) * 0.25); K.box(x, -60, -12, 120, 24, '#efe6d6', { o: 4 }); x.restore() }
  },
  pis: {
    x: 930, y: 1170, s: 230, from: DOOR + 0.2, cloud: false, scope: false,
    keys: [{ at: DOOR, tears: 3, mood: 'sparkle', look: [-1, 0] }, { at: FLOOR, x: 720, y: 1470, s: 250, d: 0.7, tears: 2, mood: 'happy' }, { at: 66, tears: 3, mood: 'sparkle' }],
    sobs: [56.6, 59.9, 66.2], hops: [56.5, 57.0, 62.2, 66.2],
  },
  says: [
    { t0: 5.6, t1: 8.3, who: 'cancer', text: 'everyone came over! I made *three* soups.', x: 420, y: 1640, tail: -60, tailUp: true },
    { t0: 12.4, t1: 15.3, who: 'moon', text: 'and who asked how *you* were?', x: 540, y: 900, tail: 230, tailUp: true },
    { t0: 15.6, t1: 18.3, who: 'cancer', text: '…oh. nobody. but that’s *fine!*', x: 420, y: 1640, tail: -60, tailUp: true },
    { t0: 18.6, t1: 21.8, who: 'moon', text: 'in astrology, i rule you. so i *felt* that.', x: 540, y: 900, tail: 230, tailUp: true },
    { t0: 22.6, t1: 25.4, who: 'moon', text: 'even i wane. i’m not full *every night.*', x: 540, y: 900, tail: 230, tailUp: true },
    { t0: 30.2, t1: 33.4, who: 'moon', text: 'you don’t have to be full every night *either.*', x: 540, y: 900, tail: 230, tailUp: true },
    { t0: 33.8, t1: 36.0, who: 'cancer', text: '…i’m actually *tired.*', x: 420, y: 1660, tail: -60, tailUp: true },
    { t0: 43.0, t1: 46.4, who: 'moon', text: 'being needed isn’t the same as being *held.*', x: 540, y: 880, tail: 230, tailUp: true },
    { t0: 46.8, t1: 48.6, who: 'moon', text: 'send it, love.', x: 540, y: 880, tail: 230, tailUp: true },
    { t0: 56.4, t1: 59.3, who: 'pisces', text: 'I brought *soup.* for YOU.', x: 660, y: 1660, tail: 160, tailUp: true },
    { t0: 59.6, t1: 61.5, who: 'cancer', text: '…for *me?*', x: 360, y: 1660, tail: -40, tailUp: true, size: 50 },
    { t0: 62.2, t1: 64.6, who: 'cancer', text: 'okay. so. *today…*', x: 380, y: 1720, tail: -20, tailUp: true },
    { t0: 65.2, t1: 68.4, who: 'moon', text: 'there it is. *full again.*', x: 560, y: 760, tail: 240, tailUp: true },
  ],
  heads: [
    { text: 'Stay for *who knocks.*', at: 2.4, out: [4.7, 4.95], top: 260, size: 84 },
    { text: '*knock knock.*', at: 54.4, out: [55.6, 55.85], top: 1000, size: 110 },
    { text: 'Full moon for everyone. | *Tonight,* for you.', at: 69.0, top: 240, size: 84 },
  ],
  set(x, t, K) {
    kitchen(x, t, K)
    const dim = ease.inOutCubic(prog(t, DIM, DIM + 1.4))
    if (dim > 0) { const g = x.createRadialGradient(540, 1470, 40, 540, 1470, 560); g.addColorStop(0, `rgba(255,200,130,${0.5 * dim})`); g.addColorStop(1, 'rgba(255,200,130,0)'); x.fillStyle = g; x.fillRect(0, 900, 1080, 1100) }
  },
  front(x, t, K) {
    // the soup pot (from the door, then on the floor between them)
    if (t > DOOR + 0.2) {
      const p = ease.inOutCubic(prog(t, FLOOR, FLOOR + 0.7)), X = lerp(780, 540, p), Y = lerp(1350, 1560, p)
      K.box(x, X - 70, Y - 50, 140, 90, '#c0475a', { o: 5 }); K.rect(x, X - 80, Y - 56, 160, 14, '#e05d72')
      x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 5; for (const d of [-20, 20]) { x.beginPath(); for (let i = 0; i <= 8; i++) { const yy = Y - 66 - i * 9, xx = X + d + Math.sin(t * 3 + i * 0.8 + d) * 6; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
    }
    // the Moon dims the light: everything warmer and softer around the two of them
    const dim = ease.inOutCubic(prog(t, DIM, DIM + 1.4))
    if (dim > 0) {
      x.save(); x.fillStyle = `rgba(10,6,30,${0.16 * dim})`; x.fillRect(-200, -200, 1480, 2320)
      x.restore()
    }
  },
  over(x, t, K) {
    // tonight's checklist (chapter 1)
    const k = K.inOut(t, 8.5, 12.2)
    if (k > 0.01) {
      x.save(); x.translate(540, 1000); x.scale(k, k); x.rotate(-0.02)
      K.box(x, -400, -190, 800, 380, '#fffaf0', { o: 8 }); K.txt(x, 'TONIGHT', -360, -140, { size: 34, align: 'left', color: '#c0475a' })
      LIST.forEach((s, i) => { const on = t > 8.9 + i * 0.7; K.box(x, -360, -86 + i * 72, 40, 40, on ? '#7dffb0' : '#efe6d6', { o: 4 }); if (on) K.txt(x, '✓', -340, -64 + i * 72, { size: 34, color: K.INK }); K.txt(x, s, -300, -64 + i * 72, { size: 32, align: 'left', color: K.INK }) })
      x.restore()
    }
    K.phaseStrip(x, t, { at: 25.6, out: 30.0, y: 1580, r: 44, label: 'every phase is still the Moon' })
    // the draft (chapter 3)
    const pk = ease.outBack(prog(t, C3 + 0.3, C3 + 0.6)) * (1 - ease.inCubic(prog(t, C4 - 0.3, C4)))
    if (pk > 0.01) {
      const sent = t >= 49.6
      const bubbles = [{ side: 'L', text: 'night!! thank u for dinner', at: null }]
      if (sent) bubbles.push({ side: 'R', text: 'can I vent for a sec?', at: 49.6 })
      if (t > 51.4) bubbles.push({ side: 'L', text: '• • •', at: 51.4 })
      const dt = draftText(t)
      K.phone(x, t, {
        X: 760, Y: 1330, w: 430, h: 620, rot: 0.05, pop: pk, title: 'pisces', time: '2:04', size: 26, bubbles,
        screen: (c, tt, w, h) => {
          const by = h / 2 - 140
          K.rrect(c, -w / 2 + 16, by - 10, w - 32, 100, 28, '#efe6d6')
          K.txt(c, dt + (Math.floor(tt * 2.5) % 2 ? '|' : ''), -w / 2 + 34, by + 40, { size: 24, align: 'left', color: K.INK, maxW: w - 70 })
          if (t > 50.6) K.txt(c, 'seen', w / 2 - 30, by - 40, { size: 18, align: 'right', color: '#bdb3d8' })
        },
      })
      // the delete counter
      const nDel = DELS.filter(d => t > d).length
      if (nDel && t < 43) { x.save(); x.translate(760, 960); x.rotate(-0.05); K.box(x, -150, -34, 300, 68, '#ff3b4e', { o: 5 }); K.txt(x, `DELETED ×${nDel}`, 0, 2, { size: 30, color: '#fff' }); x.restore() }
    }
  },
  cues: [
    ['pop', 5.6, 783.99, 0.04, -0.2],
    ...[0, 1, 2, 3].map(i => ['pop', +(8.9 + i * 0.7).toFixed(2), [880, 987.77, 1046.5, 1174.66][i], 0.045, 0.1]),
    ['tom', 16.1, 180, { gain: 0.12 }], ['tick', 18.3, 0.05],
    ['bell', 25.6, 1046.5, 0.03, 2.0, 0], ['glitter', 25.6, 27.2], ['whoosh', 33.6, 0.5, 0.04],
    ...DELS.flatMap(d => [['tick', d, 0.06], ['pop', d + 0.05, 311.13, 0.04, 0]]),
    ['pop', 49.6, 987.77, 0.05, 0.2], ['tick', 50.6, 0.04], ['pop', 51.4, 659.25, 0.03, -0.2],
    ['tom', 54.4, 140, { gain: 0.3 }], ['tom', 54.85, 140, { gain: 0.3 }], ['whoosh', DOOR, 0.6, 0.05], ['glitter', DOOR, DOOR + 1.6],
    ['bell', DIM, 1396.91, 0.035, 2.4, 0.2], ['bell', 69.0, 1046.5, 0.04, 2.6, -0.1],
  ],
  music: { style: 'dreamy', key: 'Ab', seed: 20204, sections: { drop: 2.3, breakdown: [C3, 51.4], lift: [C2, DOOR] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
