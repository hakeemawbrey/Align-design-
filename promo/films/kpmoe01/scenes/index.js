// kpmoe01 · Planet Talk: The Moon · to Aries · "The 3 a.m. Confession" (23 s vertical, hard cut) · lofi · E
//   0      frame 0: the Moon mid-crash through the night outside Aries' window, Aries in bed, thumb over SEND at 3:07;
//          "ARIES. | Put the phone *down.*"
//   0.7    HUSH: the music tape-stops, the room dims, "shh…" floats out of the Moon
//   2.6    "Typing *it* at 3:07 a.m." · the Moon: it's 3 a.m. · Aries: "but I MEAN it!!"
//   6.9    the Moon: "feelings at 3 a.m. are real. sending them at 3 a.m. is a *choice.*"
//  10.6    loading bar: "waiting for a reply at 3 a.m…" → Error: they are asleep
//  13.4    the Moon: "say it in *daylight.* when they can answer." · 16.4 a reminder drops: SAY IT · 10:00 AM
//  18.3    flash → 10:00 AM, sunlit room: Aries says it, "me too??" · Pisces (on its cloud) sobs
//  21.2    "Same feeling. | *Better* lighting." · hard cut at 23.0
import { moonFilm, HK } from '../moonkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const DAY = 18.3
const LOAD = { at: 10.6, len: 2.6, label: 'waiting for a reply at 3 a.m…', stallAt: 99, error: 'Error: they are *asleep.*', y: 1000 }
const NOTE = { at: 16.4, out: [18.0, 18.25], title: 'reminders', body: 'SAY IT · *10:00 AM*', glyph: '♈', time: '3:12' }

function bed(x, K) {
  K.box(x, 60, 1330, 620, 150, '#5a3f7a', { o: 6 })          // frame
  K.box(x, 80, 1250, 580, 110, '#e8e2f5', { o: 5 })          // sheet
  K.box(x, 90, 1210, 160, 70, '#fffaf0', { o: 5 })           // pillow
  K.box(x, 260, 1300, 400, 90, '#c0475a', { o: 5 })          // blanket
  K.rect(x, 260, 1300, 400, 12, '#e05d72')
}
function draft(K, typed) {
  return (x, t, w, h) => {
    const by = h / 2 - 150
    K.rrect(x, -w / 2 + 16, by - 20, w - 140, 130, 30, '#efe6d6')
    const s = typed(t)
    K.txt(x, s.slice(0, 14), -w / 2 + 34, by + 22, { size: 27, align: 'left', color: '#1b1236' }); K.txt(x, s.slice(15) + (Math.floor(t * 2.5) % 2 ? '|' : ''), -w / 2 + 34, by + 70, { size: 27, align: 'left', color: '#1b1236', maxW: w - 190 })
    const pulse = 1 + 0.08 * Math.sin(t * 9)
    x.save(); x.translate(w / 2 - 70, by + 48); x.scale(pulse, pulse); K.rrect(x, -52, -40, 104, 80, 30, '#ff3b4e'); K.txt(x, 'SEND', 0, 2, { size: 22, color: '#fff' }); x.restore()
  }
}

const F = moonFilm({
  id: 'kpmoe01', sign: 'aries', dur: 23, ending: 'cut',
  hook: { text: 'ARIES. | Put the phone *down.*', out: [2.3, 2.5] },
  enter: { kind: 'crash', at: -0.6, x: 770, y: 560, size: 430 },
  whip: false,
  hush: [{ at: 0.7, len: 1.4 }],
  flashes: [0.1, DAY],
  shakes: [0.1],
  moon: [
    { at: 0, mood: 'wide' },
    { at: 1.0, mood: 'sleepy' },
    { at: 2.3, mood: 'sad' },
    { at: 6.8, mood: 'neutral' },
    { at: 10.6, mood: 'sly' },
    { at: 13.3, mood: 'happy' },
    { at: DAY, x: 880, y: 600, size: 230, mood: 'happy', d: 0.01 },
  ],
  me: [
    { at: 0, x: 360, y: 1180, s: 300, mood: 'wide', look: [1, 0.6] },
    { at: 2.3, mood: 'squint', look: [1, -0.5] },
    { at: 4.6, mood: 'heart', squash: 0.06 },
    { at: 6.8, mood: 'neutral', squash: 0, look: [1, -0.6] },
    { at: 10.6, mood: 'wide', look: [1, 0.6] },
    { at: 13.3, mood: 'sparkle', look: [1, -0.6] },
    { at: DAY, x: 360, y: 1180, mood: 'happy', look: [1, 0.3], d: 0.01 },
    { at: 20.3, mood: 'heart', squash: 0.05 },
  ],
  meHops: [2.4, 16.5, 20.3, 20.6],
  pis: { x: 210, y: 600, s: 160, keys: [{ at: 0, tears: 1, mood: 'wide' }, { at: 9.0, tears: 2, mood: 'sparkle' }, { at: 20.5, tears: 3, mood: 'happy', look: [1, 0.4], s: 210, x: 230 }], sobs: [9.1, 20.6], hops: [20.6, 21.0] },
  says: [
    { t0: 2.6, t1: 4.5, who: 'moon', text: 'shh… it’s *3:07,* aries.', x: 540, y: 905, tail: 180, tailUp: true },
    { t0: 4.7, t1: 6.6, who: 'aries', text: 'but I *MEAN* it!!', x: 380, y: 1650, tail: -40, tailUp: true, size: 50 },
    { t0: 6.9, t1: 10.4, who: 'moon', text: 'feelings at 3 a.m. are real. sending them at 3 a.m. is a *choice.*', x: 540, y: 935, tail: 180, tailUp: true },
    { t0: 13.4, t1: 16.2, who: 'moon', text: 'say it in *daylight.* when they can answer.', x: 540, y: 905, tail: 180, tailUp: true },
    { t0: 18.6, t1: 20.6, who: 'aries', text: 'I like you. like, a *lot.*', x: 380, y: 1650, tail: -40, tailUp: true },
  ],
  heads: [
    { text: 'Typing *it* at 3:07 a.m.', at: 2.6, out: [6.4, 6.65], top: 230, size: 80 },
    { text: 'Same feeling. | *Better* lighting.', at: 21.2, top: 230, size: 96 },
  ],
  fx: [
    { f: HK.loadingBar, c: HK.loadingBarCues, o: LOAD },
    { f: HK.notification, c: HK.notificationCues, o: NOTE },
  ],
  set(x, t, K) {
    const day = t >= DAY
    K.room(x, t, day ? { wall: '#f3cf8f', wall2: '#e9b26b', floor: '#9a6a52', warm: 1, lamp: false } : { wall: '#2a2350', wall2: '#151236', floor: '#2e2744', warm: 0.1 })
    if (day) {
      K.rect(x, 640, 300, 320, 420, '#8fd0ff'); K.rect(x, 640, 560, 320, 160, '#bfe6ff')
      x.fillStyle = '#ffe58a'; x.beginPath(); x.arc(720, 380, 40, 0, Math.PI * 2); x.fill()
      K.rect(x, 795, 300, 10, 420, K.INK); K.rect(x, 640, 505, 320, 10, K.INK)
    }
    // the bedside clock
    K.box(x, 90, 860, 240, 100, '#1b1236', { o: 5 })
    K.txt(x, day ? '10:00' : '3:07', 210, 912, { size: 60, font: K.INTER, weight: 900, color: day ? '#7dffb0' : '#ff5c6e' })
  },
  paint(x, t, K) { bed(x, K) },
  over(x, t, K) {
    const night = t < DAY
    const typed = t => 'I THINK I LIKE YOU A LOT'
    // the phone: night draft (until the reminder) → day chat
    const kIn = night ? 1 - ease.inCubic(prog(t, 17.6, 18.0)) : ease.outBack(prog(t, DAY + 0.2, DAY + 0.55))
    if (kIn > 0.01) {
      K.phone(x, t, night
        ? { X: 790, Y: 1400, w: 440, h: 620, rot: 0.06, pop: kIn, title: 'crush', time: '3:07', size: 30, bubbles: [{ side: 'L', text: 'haha night!', at: null }], screen: draft(K, typed) }
        : { X: 790, Y: 1400, w: 440, h: 620, rot: 0.05, pop: kIn, title: 'crush', time: '10:00', size: 32, bubbles: [{ side: 'R', text: 'I like you. like, a lot.', at: 18.9 }, { side: 'L', text: 'me too??', at: 20.3 }] })
    }
    // the thumb hovering over SEND (night)
    if (night && t < 17.6) {
      const hov = Math.sin(t * 5) * 10, back = ease.inOutCubic(prog(t, 6.9, 7.6)) * 120
      x.save(); x.translate(960 + back * 0.3, 1530 + hov + back); x.rotate(-0.5)
      K.box(x, -34, -10, 68, 150, '#ffd2a8', { o: 6 }); K.rect(x, -20, -4, 40, 30, '#ffe4cc')
      x.restore()
    }
  },
  cues: [
    ['tick', 2.6, 0.05], ['pop', 4.7, 1046.5, 0.04, -0.2],
    ['bell', DAY, 1318.51, 0.04, 1.8, 0.2], ['bell', DAY + 0.2, 1567.98, 0.03, 1.6, -0.2], ['glitter', DAY, DAY + 1.2],
    ['pop', 18.9, 880, 0.04, 0.2], ['pop', 20.3, 1174.66, 0.05, -0.2], ['glitter', 20.4, 21.6],
  ],
  music: { style: 'lofi', key: 'E', seed: 20201, sections: { drop: 2.2, lift: [DAY] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
