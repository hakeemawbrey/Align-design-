// kpsue10: PLANET TALK: THE SUN, Ep 10 "Capricorn After the Promotion" (26 s, star_advice post, house · C). Loop.
// Frame 0: the Sun mid-burst into a midnight office, Capricorn mid-type at the laptop, hook "CAPRICORN. It's midnight. Hi."
//   3.0 Capricorn: can't date yet, after the promotion · 5.8 THE PLAN (the same line, three years running)
//   10.4 Sun: your heart isn't a five-year plan, leave some room · 14.0 "room… for fun?" · 16.4 one dinner, friends
//   count · 18.4 FRIDAY: dinner w/ friends · 19.2 the laptop closes · 19.6 Pisces cries · 22.8 "Laptop closed. Life open."
import { episode, drawPanel, rr, key, INK } from '../../kpsue01/sunkit.js'

const PLAN = [{ at: 6.0, text: '2021: date after the promotion' }, { at: 6.5, text: '2023: date after the promotion' }, { at: 7.0, text: '2025: date after the promotion', color: '#c23a3a' }]

function office(x, t) {
  x.save()
  // desk
  x.fillStyle = '#3a2a24'; x.fillRect(0, 1560, 1080, 380); x.fillStyle = '#5a4034'; x.fillRect(0, 1548, 1080, 22)
  // digital clock
  x.translate(170, 1330); x.fillStyle = INK; rr(x, -120, -56, 240, 112, 18); x.fill(); x.fillStyle = '#1a0f12'; rr(x, -108, -44, 216, 88, 12); x.fill()
  x.fillStyle = '#ff5a3a'; x.shadowColor = '#ff5a3a'; x.shadowBlur = 14; x.font = "700 44px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(Math.floor(t * 1.2) % 2 ? '12:00' : '12 00', 0, -4); x.font = "700 20px 'Space Mono', monospace"; x.fillText('AM', 80, 26)
  x.restore()
}
function laptop(x, t) {
  const lid = key(t, [[0, 0], [19.0, 0], [19.5, 1]])
  x.save(); x.translate(810, 1500)
  // base
  x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 40); x.lineTo(200, 40); x.lineTo(220, 70); x.lineTo(-220, 70); x.closePath(); x.fill()
  // screen (squashes down as it closes)
  x.save(); x.translate(0, 40); x.scale(1, Math.max(0.05, 1 - lid)); x.translate(0, -40)
  x.fillStyle = INK; rr(x, -170, -180, 340, 220, 18); x.fill()
  x.fillStyle = '#d8e6ff'; rr(x, -156, -166, 312, 192, 10); x.fill()
  x.fillStyle = '#2a3a6a'; x.font = '800 22px Inter'; x.textAlign = 'left'; x.fillText('Q4 REPORT (v19)', -140, -136)
  for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(42,58,106,0.35)'; x.fillRect(-140, -112 + i * 24, 120 + ((i * 53) % 150), 10) }
  x.restore()
  x.restore()
}

const E = episode({
  sign: 'capricorn', duration: 26, ending: 'loop',
  entrance: { kind: 'burst', at: -0.25, x: 540, y: 600, size: 520 },
  hook: { text: 'CAPRICORN. It’s | *midnight.* Hi.', top: 860 },
  tint: '#3a5a9a',
  sun: { mood: [[0, 'wide'], [0.6, 'happy'], [3.0, 'neutral'], [5.8, 'wide'], [7.2, 'sad'], [10.4, 'happy'], [14.0, 'love'], [16.4, 'proud'], [18.6, 'happy'], [20.4, 'love'], [22.8, 'happy']], hops: [10.4, 16.4, 18.7] },
  me: {
    base: { x: 450, y: 1420, size: 300 },
    mood: [[0, 'squint'], [1.0, 'wide'], [3.0, 'neutral'], [5.8, 'squint'], [10.4, 'wide'], [12.0, 'neutral'], [14.0, 'sparkle'], [16.4, 'neutral'], [18.6, 'happy'], [25.0, 'squint']],
    look: [[0, [1, 0]], [1.0, [0, -1]], [3.0, [0, 0]], [5.8, [0, -1]], [18.6, [0, -1]], [25.0, [1, 0]]],
    tears: [[0, 0], [19.4, 1], [22.6, 0]],
    sweat: [[0, true], [3.0, false]],
  },
  bubbles: [
    { t0: 3.0, t1: 5.6, who: 'capricorn', text: 'Can’t date yet. *After* the promotion.' },
    { t0: 10.4, t1: 13.8, who: 'sun', text: 'Your heart isn’t a five-year plan. Leave some *room.*', y: 1070 },
    { t0: 14.0, t1: 16.2, who: 'capricorn', text: 'Room. In the calendar. For… *fun?*' },
    { t0: 16.4, t1: 18.4, who: 'sun', text: 'Start small. One dinner. *Friends count.*', y: 1070 },
    { t0: 20.4, t1: 22.4, who: 'pisces', text: 'A calendar invite. I’m *undone.*' },
    { t0: 22.8, t1: 25.5, who: 'capricorn', text: 'Laptop closed. *Life* open.', size: 54, x: 470, maxW: 700, tail: -20 },
  ],
  pisces: { at: 19.6, out: [25.3, 25.6], tears: [[19.6, 3]], hops: [20.4, 20.8] },
  back: office,
  front(x, t) {
    laptop(x, t)
    const pv = (a, b) => Math.min(1, Math.max(0, (t - a) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - b) / 0.3)))
    const p1 = pv(5.8, 10.2)
    if (p1 > 0.01) drawPanel(x, t, { x: 540, y: 1020, w: 780, h: 320, title: 'THE PLAN', color: '#8fb0e0', pop: p1, rows: PLAN, size: 36 })
    const p2 = pv(18.4, 22.6)
    if (p2 > 0.01) drawPanel(x, t, { x: 540, y: 1020, w: 700, h: 230, title: 'FRIDAY', color: '#f2c75c', pop: p2, rows: [{ at: 18.7, text: '7 pm · dinner w/ friends ★', serif: true, color: '#c23a6a' }], size: 40 })
  },
  cues: [...PLAN.map((r, i) => ['pop', r.at, 659.25 + i * 70, 0.03, 0.2]), ['bell', 18.75, 1046.5, 0.05, 1.8, 0], ['glitter', 18.7, 19.3], ['tom', 19.45, 120, { gain: 0.2, decay: 0.2 }], ['tick', 19.5, 0.08]],
})
export const { DURATION, SCENES, CUES } = E
