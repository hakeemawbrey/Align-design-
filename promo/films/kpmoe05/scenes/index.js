// kpmoe05 · Planet Talk: The Moon · to Leo · "Leo Refreshes the Views" (23.5 s vertical, loop) · funk · A
//   0      frame 0: the Moon mid-slide into an ECLIPSE of Leo's ring light, Leo mid-refresh of its story viewers;
//          "LEO. | Stop *refreshing* the views." · 0.55 whip zoom
//   2.5    "Viewed by 212. | Not by *them.*" · refresh ×4 (212 → 215, still not them)
//   5.6    the Moon: "darling. i don't make my own light *either.*" · 8.8 "it's the sun's. reflected. people still
//          write *poems* about me." (moonlight is reflected sunlight: true) · 12.8 "so. *glow anyway.*"
//  14.6    the Moon slides off: the ring light blazes, the phone goes face down, Leo dances
//  17.0    notification: "*them* viewed your story" · Leo: "oh? didn’t *notice.*" · caught: NOTICED · Pisces sobs
//  20.6    "Glowing. | *Refresh* button retired." · 23.05 loop → frame 0
import { moonFilm, HK } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const OFF = 14.6, NOTI = 17.0, DUR = 23.5
const RING = { x: 700, y: 720, r: 220 }
const REFRESH = [2.9, 3.6, 4.3, 5.0]
const NOTE = { at: NOTI, out: [18.8, 19.05], title: 'stories', body: '*them* viewed your story', glyph: '♌', time: 'now' }
const CAUGHT = { at: 19.4, x: 360, y: 1250, r: 170, out: [20.4, 20.55], label: 'NOTICED', arrow: 'br', rec: false }

function ringLight(x, t, K) {
  const eclipse = 1 - ease.inOutCubic(prog(t, OFF, OFF + 0.6))
  const bright = lerp(1, 0.35, eclipse * clamp(t + 1))
  x.save()
  const g = x.createRadialGradient(RING.x, RING.y, RING.r * 0.6, RING.x, RING.y, RING.r * 2.2)
  g.addColorStop(0, `rgba(255,240,200,${0.55 * bright})`); g.addColorStop(1, 'rgba(255,240,200,0)')
  x.fillStyle = g; x.fillRect(RING.x - 600, RING.y - 600, 1200, 1200)
  x.strokeStyle = K.INK; x.lineWidth = 70; x.beginPath(); x.arc(RING.x, RING.y, RING.r, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = `rgba(255,248,225,${0.5 + 0.5 * bright})`; x.lineWidth = 52; x.stroke()
  K.rect(x, RING.x - 8, RING.y + RING.r + 30, 16, 640, '#2a2040')
  x.restore()
}

const F = moonFilm({
  id: 'kpmoe05', sign: 'leo', dur: DUR, ending: 'loop',
  hook: { text: 'LEO. | Stop *refreshing* the views.', out: [2.3, 2.5] },
  enter: { kind: 'slide', at: -0.4, x: RING.x, y: RING.y, size: 400 },
  whip: { at: 0.55 },
  flashes: [OFF + 0.3],
  moon: [
    { at: 0, mood: 'wide' },
    { at: 1.0, mood: 'sly' },
    { at: 5.5, mood: 'neutral' },
    { at: 8.7, mood: 'proud' },
    { at: 12.7, mood: 'happy' },
    { at: OFF, x: 910, y: 430, size: 240, mood: 'happy', d: 0.6 },
    { at: 19.3, mood: 'sly' },
  ],
  me: [
    { at: 0, x: 340, y: 1250, s: 300, mood: 'squint', look: [1, 0.6], squash: 0.05 },
    { at: 2.5, mood: 'wide', squash: 0 },
    { at: 5.5, mood: 'neutral', look: [1, -0.6] },
    { at: 8.7, mood: 'sparkle' },
    { at: OFF, x: 460, mood: 'happy', look: [0, 0], d: 0.5 },
    { at: NOTI, mood: 'wide', look: [1, -0.4] },
    { at: 17.9, mood: 'wink', look: [-1, 0] },
    { at: 21.6, x: 340, mood: 'squint', look: [1, 0.6], d: 1.2 },
  ],
  meHops: [...REFRESH, OFF + 0.7, OFF + 1.1, OFF + 1.5, OFF + 1.9, OFF + 2.3, NOTI, 18.0],
  pis: { x: 170, y: 480, s: 150, keys: [{ at: 0, tears: 1, mood: 'wide', look: [1, 0.3] }, { at: 8.8, tears: 2, mood: 'sparkle' }, { at: 19.6, tears: 3, mood: 'happy', y: 560 }, { at: 21.8, y: 480, tears: 1, mood: 'wide' }], sobs: [9.0, 19.7], hops: [19.7, 20.1] },
  says: [
    { t0: 5.6, t1: 8.5, who: 'moon', text: 'darling. i don’t make my own light *either.*', x: 540, y: 1000, tail: 160, tailUp: true },
    { t0: 8.8, t1: 12.5, who: 'moon', text: 'it’s the sun’s. reflected. people still write *poems* about me.', x: 540, y: 1000, tail: 160, tailUp: true },
    { t0: 12.8, t1: 14.5, who: 'moon', text: 'so. *glow anyway.*', x: 540, y: 1000, tail: 160, tailUp: true, size: 52 },
    { t0: 17.9, t1: 20.3, who: 'leo', text: 'oh? didn’t *notice.*', x: 560, y: 1640, tail: -100, tailUp: true },
  ],
  heads: [
    { text: 'Viewed by 212. | Not by *them.*', at: 2.5, out: [5.2, 5.45], top: 240, size: 84 },
    { text: 'Glowing. | *Refresh* button retired.', at: 20.6, out: [22.6, 22.85], top: 240, size: 88 },
  ],
  fx: [
    { f: HK.notification, c: HK.notificationCues, o: NOTE },
    { f: HK.caught, c: HK.caughtCues, o: CAUGHT },
  ],
  set(x, t, K) { K.room(x, t, { wall: '#5a3a5e', wall2: '#2e1e40', floor: '#3e2a46', window: false, warm: 0.4 }) },
  paint(x, t, K) { ringLight(x, t, K) },
  over(x, t, K) {
    // the phone: the story viewer list, refreshed ×4, then flipped face down at OFF
    const flip = ease.inOutCubic(prog(t, OFF, OFF + 0.5)), k = 1
    if (k < 0.01) return
    const n = 212 + REFRESH.filter(r => t > r).length
    x.save(); x.translate(780, 1380); x.scale(1, Math.abs(1 - 2 * flip) || 0.01)
    if (flip < 0.5) {
      K.phone(x, t, {
        X: 0, Y: 0, w: 400, h: 580, rot: 0.06, pop: k, title: 'your story', time: '9:12', size: 24,
        screen: (c, tt, w, h) => {
          K.txt(c, `viewed by ${n}`, 0, -h / 2 + 190, { size: 34, color: K.GOLD })
          const spin = REFRESH.some(r => tt > r - 0.05 && tt < r + 0.35)
          if (spin) { c.save(); c.translate(0, -h / 2 + 250); c.rotate(tt * 14); c.strokeStyle = '#efe6d6'; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, 20, 0, 4.5); c.stroke(); c.restore() }
          ;['sky_fan', 'best.friend', 'cousin.k', 'work_pal', 'neighbour'].forEach((u, i) => { K.rrect(c, -w / 2 + 30, -h / 2 + 290 + i * 54, 40, 40, 20, ['#ff8fb1', '#7fe3ff', '#7dffb0', '#f2c75c', '#c9a6ff'][i]); K.txt(c, u, -w / 2 + 90, -h / 2 + 310 + i * 54, { size: 22, align: 'left' }) })
        },
      })
    } else {
      x.rotate(0.06); K.rrect(x, -214, -304, 428, 608, 56, K.INK); K.rrect(x, -200, -290, 400, 580, 46, '#3a2f5a'); K.txt(x, 'face down.', 0, 0, { size: 34, color: '#bdb3d8' })
    }
    x.restore()
  },
  cues: [
    ...REFRESH.flatMap(r => [['whoosh', r - 0.05, 0.2, 0.025], ['tick', r + 0.3, 0.05], ['pop', r + 0.32, 880, 0.03, 0.2]]),
    ['whoosh', OFF, 0.5, 0.05], ['bell', OFF + 0.3, 1318.51, 0.05, 1.8, 0], ['glitter', OFF + 0.3, OFF + 1.6], ['pop', 17.9, 987.77, 0.04, -0.2],
  ],
  music: { style: 'funk', key: 'A', seed: 20205, sections: { drop: 0.6, lift: [OFF + 0.3] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
