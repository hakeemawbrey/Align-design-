// kpmoe08 · Planet Talk: The Moon · to Scorpio · "Scorpio's Midnight Scroll" (24.4 s vertical, hard cut) · screwed · Fm
//   0      frame 0: the Moon mid-rise over the rooftops like a spotlight, its beam on Scorpio mid-scroll of an ex's
//          profile at 00:01; "SCORPIO. | I *see* your midnight scroll." · 0.8 HUSH (tape stop, "shh…")
//   2.4    "00:01. *Their* profile. Again." · 5.4 the Moon: "i'm up every night. i know you *look.*"
//   8.6    "not judging. i remember *everything* too." · 11.8 "but checking keeps it *open.*"
//  14.6    "mute isn't weak. it's *care.*" · 17.4 the mute dialog, MUTE pressed · 18.4 "*exhale.*", the night lightens
//  19.8    Scorpio texts a friend: "walk tomorrow?" → "YES. 9am" · Pisces sobs
//  22.6    "Muted. Not erased. | *Resting.*" · hard cut at 24.4
import { moonFilm } from '../../kpmoe01/moonkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const MUTE = 17.8, EXH = 18.4, FRIEND = 19.8

function rooftops(x, t, K) {
  const lift = ease.inOutCubic(prog(t, EXH, EXH + 1.5))
  K.drawSpace(x, t, { planet: 'moon', seed: 4, tint: lift > 0 ? '#8fa0ff' : undefined, horizon: { y: 1560, color: '#1d1636', rim: '#9aa3d6' } })
  // the skyline
  const B = [[0, 1180, 200], [190, 1260, 160], [340, 1120, 180], [700, 1220, 170], [860, 1140, 230]]
  for (const [bx, by, bw] of B) { K.box(x, bx, by, bw, 600, '#1a1430', { o: 5 }); for (let j = 0; j < 6; j++) for (let i = 0; i < 3; i++) if ((i + j * 2 + bx) % 3) K.rect(x, bx + 24 + i * (bw / 3.4), by + 40 + j * 70, 22, 28, (i + j) % 4 ? 'rgba(255,214,140,0.18)' : 'rgba(255,214,140,0.55)') }
}
function spotlight(x, t, M) {
  const on = clamp(t + 1) * (1 - 0.6 * ease.inOutCubic(prog(t, EXH, EXH + 1.2)))
  x.save(); x.globalAlpha = 0.22 * on
  const g = x.createLinearGradient(0, 700, 0, 1600); g.addColorStop(0, 'rgba(230,235,255,0.9)'); g.addColorStop(1, 'rgba(230,235,255,0.2)')
  x.fillStyle = g; x.beginPath(); x.moveTo(500, 760); x.lineTo(620, 760); x.lineTo(560, 1640); x.lineTo(100, 1640); x.closePath(); x.fill()
  x.restore()
}

const F = moonFilm({
  id: 'kpmoe08', sign: 'scorpio', dur: 24.4, ending: 'cut',
  hook: { text: 'SCORPIO. | I *see* your midnight scroll.', out: [2.2, 2.4] },
  enter: { kind: 'rise', at: -0.6, x: 560, y: 700, size: 440 },
  horizon: { y: 1560 },
  whip: false,
  hush: [{ at: 0.8, len: 1.4 }],
  shakes: [MUTE],
  moon: [
    { at: 0, mood: 'sly' },
    { at: 2.2, mood: 'sad' },
    { at: 8.5, mood: 'neutral' },
    { at: 11.7, mood: 'sad' },
    { at: 14.5, mood: 'happy' },
    { at: EXH, mood: 'love' },
  ],
  me: [
    { at: 0, x: 330, y: 1440, s: 270, mood: 'squint', look: [1, 0.6] },
    { at: 2.2, mood: 'wide', look: [1, -0.6] },
    { at: 5.3, mood: 'sparkle', look: [1, -0.7] },
    { at: 11.7, mood: 'neutral', look: [1, 0.3], tears: 1 },
    { at: 14.5, mood: 'squint', look: [1, 0.4], tears: 0 },
    { at: MUTE, mood: 'wide' },
    { at: EXH, mood: 'sleepy', squash: 0.08 },
    { at: 19.5, mood: 'happy', squash: 0 },
    { at: 21.2, mood: 'sparkle', look: [0, 0] },
  ],
  meHops: [MUTE, 21.3],
  pis: { x: 180, y: 600, s: 140, keys: [{ at: 0, tears: 1, mood: 'wide', look: [1, 0.3] }, { at: 11.8, tears: 2, mood: 'sparkle' }, { at: 21.3, tears: 3, mood: 'happy', look: [1, 0.5] }], sobs: [12.0, 21.4], hops: [21.4, 21.8] },
  says: [
    { t0: 5.4, t1: 8.3, who: 'moon', text: 'i’m up every night. i know you *look.*', x: 540, y: 1010, tail: 0, tailUp: true },
    { t0: 8.6, t1: 11.6, who: 'moon', text: 'not judging. i remember *everything* too.', x: 540, y: 1010, tail: 0, tailUp: true },
    { t0: 11.8, t1: 14.4, who: 'moon', text: 'but checking keeps it *open.*', x: 540, y: 1010, tail: 0, tailUp: true },
    { t0: 14.6, t1: 17.2, who: 'moon', text: 'mute isn’t weak. it’s *care.*', x: 540, y: 1010, tail: 0, tailUp: true },
  ],
  heads: [
    { text: '00:01. *Their* profile. | Again.', at: 2.4, out: [5.1, 5.35], top: 240, size: 86 },
    { text: '*exhale.*', at: EXH, out: [19.5, 19.75], top: 280, size: 120 },
    { text: 'Muted. Not erased. | *Resting.*', at: 22.6, top: 240, size: 90 },
  ],
  set(x, t, K) { rooftops(x, t, K) },
  paint(x, t, K) { spotlight(x, t) },
  over(x, t, K) {
    const k = 1 - ease.inCubic(prog(t, 22.2, 22.6))
    if (k < 0.01) return
    const friend = t >= FRIEND
    K.phone(x, t, {
      X: 770, Y: 1400, w: 400, h: 560, rot: 0.06, pop: k, title: friend ? 'bestie' : 'ex_account', time: friend ? '00:14' : '00:01', size: 26,
      bubbles: friend ? [{ side: 'R', text: 'walk tomorrow?', at: FRIEND + 0.4 }, { side: 'L', text: 'YES. 9am', at: 21.2 }] : [],
      screen: friend ? null : (c, tt, w, h) => {
        const muted = tt > MUTE
        c.save(); c.globalAlpha = muted ? 0.3 : 1
        K.rrect(c, -50, -h / 2 + 160, 100, 100, 50, '#c9a6ff'); K.txt(c, '@ex_account', 0, -h / 2 + 290, { size: 22 })
        const scroll = (tt * 40) % 120
        for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) K.rect(c, -w / 2 + 24 + i * ((w - 48) / 3), -h / 2 + 320 + j * 120 - scroll, (w - 48) / 3 - 8, 112, ['#3a2f5a', '#5a3f7a', '#2e2452'][(i + j) % 3])
        c.restore()
        if (tt > 17.2 && tt < EXH + 0.4) {
          const d = ease.outBack(prog(tt, 17.2, 17.5))
          c.save(); c.scale(d, d); K.rrect(c, -150, -90, 300, 180, 24, '#efe6d6'); K.txt(c, 'mute this account?', 0, -40, { size: 20, color: K.INK })
          const pr = tt > MUTE ? 0.9 : 1; c.save(); c.translate(0, 30); c.scale(pr, pr); K.rrect(c, -80, -26, 160, 52, 20, tt > MUTE ? '#7dffb0' : '#ff3b4e'); K.txt(c, tt > MUTE ? 'MUTED' : 'MUTE', 0, 2, { size: 22, color: K.INK }); c.restore(); c.restore()
        }
      },
    })
  },
  cues: [
    ['tick', MUTE, 0.07], ['pop', MUTE + 0.02, 523.25, 0.05, 0], ['whoosh', EXH, 1.2, 0.05], ['bell', EXH + 0.2, 1046.5, 0.04, 2.4, 0],
    ['pop', FRIEND + 0.4, 880, 0.04, 0.2], ['pop', 21.2, 1174.66, 0.05, -0.2], ['glitter', 21.2, 22.4],
  ],
  music: { style: 'screwed', key: 'Fm', seed: 20208, sections: { drop: 2.3, breakdown: [17.2], lift: [EXH] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
