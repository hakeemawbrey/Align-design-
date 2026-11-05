// kpsue01: PLANET TALK: THE SUN, Ep 1 "Aries Times Its Heartbreak" (23.6 s vertical, star_talk post, chiptune · E).
// Hard cut. Frame 0: the Sun mid-crash onto Aries' push-up mat, hook "ARIES. Drop the *stopwatch.*", speedrun HUD.
//   0.2 landing boom · 3.0 Aries: the "let's just be friends" text, over it in four minutes · 6.4 Sun: feel it longer
//   9.8 Aries: feelings are SLOW · 12.0 Sun: feeling it IS the brave part · 15.8 record scratch: Aries sniffling
//   16.6 Pisces pops in sobbing · 19.8 Sun: walk, call a friend, let it be slow · 21.6 "Fine. Sad. At a jog."
import { episode, drawPhone, key, INK } from '../sunkit.js'

// (no HUD: a stopwatch prop instead)
const _HUD = { at: -1, start: -3.2, out: [9.4, 9.7], title: 'GET OVER IT · ANY%', splits: [{ at: 1.4, name: 'read the text' }, { at: 4.6, name: 'deleted the playlist' }, { at: 7.9, name: 'still sad??' }], color: '#ff6a4a' }
const REC = { at: 15.8, len: 1.5, caption: 'aries, *sniffling* at full speed', sub: 'ARIES · FEELINGS: LOADING', top: 1640 }
const PHONE = { msgs: [{ at: -5, side: 'L', text: 'hey… can we just be friends? :)' }], title: 'Jordan' }

const E = episode({
  sign: 'aries', duration: 23.6, ending: 'cut',
  entrance: { kind: 'crash', at: -0.6, x: 540, y: 620, size: 520 },
  hook: { text: 'ARIES. Drop the | *stopwatch.*' },
  sun: {
    mood: [[0, 'wide'], [0.5, 'happy'], [6.4, 'wide'], [7.6, 'happy'], [12, 'proud'], [13.2, 'happy'], [15.8, 'sad'], [19.8, 'happy'], [21.6, 'love']],
    shades: [[0, true], [6.3, false]],
    pos: [[9.6, { y: 620 }], [10.2, { y: 560 }], [16, { y: 560 }], [16.5, { y: 600, size: 540 }]],
    hops: [6.4, 12.0, 19.8, 22.2],
  },
  me: {
    mood: [[0, 'wide'], [1.0, 'squint'], [3, 'neutral'], [6.4, 'wide'], [9.8, 'squint'], [12, 'neutral'], [15.6, 'sleepy'], [17.4, 'neutral'], [21.6, 'happy']],
    tears: [[0, 0], [15.6, 1], [20, 0]],
    squash: [[-1, 0.22], [0, 0.22], [0.2, -0.06], [0.45, 0.22], [0.7, -0.06], [0.95, 0.2], [1.25, 0]],
    hops: [22.0, 22.3, 22.6, 22.9, 23.2],
    look: [[0, [0, -1]], [3, [1, 0]], [6.2, [0, -1]]],
  },
  bubbles: [
    { t0: 3.0, t1: 6.2, who: 'aries', text: 'They said "just friends." I’ll be over it in *four minutes.*' },
    { t0: 6.4, t1: 9.6, who: 'sun', text: 'ARIES! You’re allowed to feel it for more than *four minutes!*', shake: 2 },
    { t0: 9.8, t1: 11.8, who: 'aries', text: 'Feelings are *SLOW.* I am FAST.' },
    { t0: 12.0, t1: 15.6, who: 'sun', text: 'Being sad doesn’t make you less brave. *Feeling it* is the brave part.' },
    { t0: 17.2, t1: 19.6, who: 'pisces', text: 'I’m sniffling for *both* of us!!' },
    { t0: 19.8, t1: 21.4, who: 'sun', text: 'Take a walk. Call a friend. Let it be *slow.*' },
    { t0: 21.6, who: 'aries', text: 'Fine. Sad. *At a jog.*', size: 54 },
  ],
  pisces: { at: 16.6, tears: [[16.6, 3]], hops: [17.2, 17.6] },
  rec: [REC],
  front(x, t) {
    // the stopwatch (Aries is timing its heartbreak)
    const out = Math.min(1, Math.max(0, (t - 12.6) / 0.3))
    if (out < 1) {
      const sec = Math.min(t, 12.0) + 192, flying = t > 12.0
      const sx = flying ? 790 + (t - 12) * 900 : 790, sy = flying ? 1300 - (t - 12) * 1400 + (t - 12) ** 2 * 1800 : 1300
      x.save(); x.translate(sx, sy); x.rotate(flying ? (t - 12) * 14 : 0.12 + 0.05 * Math.sin(t * 9))
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill(); x.fillRect(-18, -122, 36, 36)
      x.fillStyle = '#fff8ea'; x.beginPath(); x.arc(0, 0, 78, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ff5a3a'; x.fillRect(-12, -116, 24, 22)
      x.fillStyle = '#ff5a3a'; x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(`${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`, 0, 4)
      x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); const a = sec * Math.PI * 2 / 60 - Math.PI / 2; x.moveTo(Math.cos(a) * 50, Math.sin(a) * 50); x.lineTo(Math.cos(a) * 66, Math.sin(a) * 66); x.stroke()
      x.restore()
    }
    if (t > 2.8 && t < 6.6) {
      const p = Math.min(1, (t - 2.8) / 0.3), q = Math.max(0, (t - 6.2) / 0.3)
      drawPhone(x, t, { ...PHONE, x: 840, y: 1180, s: 0.55, rot: 0.08, pop: p * (1 - q) })
    }
  },
  cues: [['whoosh', 12.0, 0.5, 0.08], ...Array.from({ length: 12 }, (_, i) => ['tick', i, 0.025]), ['tick', 0.25, 0.06], ['tick', 0.7, 0.05], ['boom', 15.8, 0.15], ['bell', 21.65, 659.25, 0.04, 1.4, 0], ...[22.0, 22.3, 22.6, 22.9, 23.2].map(t => ['tick', t, 0.04])],
})
export const { DURATION, SCENES, CUES } = E
void key; void _HUD
