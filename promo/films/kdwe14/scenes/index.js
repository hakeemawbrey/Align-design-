// kdwe14 · Don't Watch This If You're a ___ · "Aries Preps for the Family Dinner" (17 s vertical, loop) · funk · D
//   0      Aries shielding the lens with a festive napkin; "ARIES. | Scroll. *Fast.* You're good at it." · scratch · whip out
//   1.5    in the car outside the holiday dinner, rehearsing answers to "so are you seeing anyone?":
//          "i'm focusing on *me!*" · "i'm *thriving!*" · "next *question!*" (Pisces sobbing in the back seat)
//   6.9    news desk (hook kit): BREAKING "Single at the *dinner*" + ticker
//   9.8    inside: the aunt asks… "so! how's the *job?*" · Aries deflates: "…good! it's *good.*"
//   14.3   "Rehearsed for a question | *nobody asked.*" · 16.55 Aries spots the lens again → frame 0 (loop)
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const AR = tag('aries'), CA = '♋︎ THE AUNT', PI = tag('pisces')
const NEWS = { at: 6.9, out: [9.5, 9.75], headline: 'Single at the *dinner*', tag: 'BREAKING', channel: 'STAR NEWS', ticker: ['aunt spotted at the front door', 'the question is expected any minute', 'Aries says it is “thriving”'], clock: '6:58' }
const INSIDE = 9.8
const F = dwFilm({
  id: 'kdwe14', sign: 'aries', dur: 17, ending: 'loop',
  hook: 'ARIES.|Scroll. *Fast.* You’re good at it.', hookOut: 1.3, hookSize: 92, scratch: 'too slow. *sorry.*',
  lens: { mood: 'wide', look: [0, 0] }, pull: { x: 420, y: 1180, s: 300 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: INSIDE, cam: [1, 1740, 960] },
    { at: 14.2, cam: [1, 540, 960] },
  ],
  punch: [{ at: 1.6, dur: 1.2, z: 0.12, x: 420, y: 1150 }, { at: 3.3, dur: 1.2, z: 0.18, x: 420, y: 1150 }, { at: 5.0, dur: 1.2, z: 0.24, x: 420, y: 1150 }, { at: 10.0, dur: 1.4, z: 0.2, x: 1900, y: 1150 }],
  heads: [
    { text: 'Rehearsed for a question|*nobody asked.*', at: 14.3, out: [16.25, 16.5], top: 250, size: 80 },
  ],
  boxes: [
    { open: 1.45, close: 6.7, lines: [{ t: 1.6, speaker: AR, text: 'i’m focusing on *me!*', color: '#ff9a7a' }, { t: 3.3, speaker: AR, text: 'i’m *thriving!*', color: '#ff9a7a' }, { t: 5.0, speaker: AR, text: 'next *question!*', color: '#ff9a7a' }] },
    { open: 9.9, close: 14.0, lines: [{ t: 10.05, speaker: CA, text: 'so! how’s the *job?*', color: '#d8d8ff' }, { t: 12.0, speaker: AR, text: '…good! it’s *good.*', color: '#ff9a7a' }] },
  ],
  pitch: { [AR]: 523.25, [CA]: 440, [PI]: 1046.5 },
  fx: [{ f: HK.newsDesk, c: HK.newsDeskCues, o: NEWS }],
  paint(x, t, K) {
    // ── the car (x 0…1080): the house through the windshield, the dashboard
    x.fillStyle = '#10142a'; x.fillRect(-600, -800, 1700, 3600)
    for (let k = 0; k < 20; k++) { const sx = (k * 157) % 1080, sy = 300 + (k * 89) % 400; K.rect(x, sx, sy, 5, 5, `rgba(255,244,220,${0.4 + 0.4 * Math.sin(t * 3 + k)})`) }
    K.box(x, 300, 640, 480, 380, '#5a3a4a', { o: 8 }); x.fillStyle = '#140c28'; x.beginPath(); x.moveTo(270, 650); x.lineTo(540, 470); x.lineTo(810, 650); x.fill(); x.fillStyle = '#8a3a3a'; x.beginPath(); x.moveTo(296, 640); x.lineTo(540, 490); x.lineTo(784, 640); x.fill()
    for (const [wx, wy] of [[350, 720], [610, 720]]) { K.box(x, wx, wy, 120, 100, '#ffd98a', { o: 5 }) }
    K.box(x, 500, 860, 80, 160, '#3a2030', { o: 5 }); x.strokeStyle = '#2fc79a'; x.lineWidth = 16; x.beginPath(); x.arc(540, 820, 30, 0, Math.PI * 2); x.stroke()
    // fairy lights
    for (let i = 0; i < 12; i++) { const c = ['#ff6fa8', '#f2c75c', '#7fd0f0'][i % 3]; x.fillStyle = Math.sin(t * 4 + i) > -0.3 ? c : '#3a2a3a'; x.beginPath(); x.arc(310 + i * 42, 650 - Math.abs(Math.sin(i * 0.5)) * 10, 8, 0, Math.PI * 2); x.fill() }
    // the windshield frame + dashboard + wheel
    x.fillStyle = '#1a1226'; x.fillRect(-600, 1300, 1800, 900); x.fillRect(-600, -800, 680, 3000); x.fillRect(1000, -800, 600, 3000)
    K.box(x, 60, 1290, 960, 70, '#3a2a40')
    // Pisces sobbing in the back seat (the rear-view mirror)
    K.box(x, 400, 200, 280, 120, '#2a2a3a', { o: 6 })
    x.save(); x.beginPath(); x.rect(400, 200, 280, 120); x.clip(); K.rect(x, 400, 200, 280, 120, '#3a3a5a'); K.pisces(x, t, { x: 540, y: 275, s: 150, look: [0, 0], tears: 3, mood: 'sparkle' }); x.restore()
    if (!K.hide && (t < INSIDE || t >= 14.2)) {
      const mood = t >= 14.2 ? 'eyeroll' : t < 3.3 ? 'happy' : t < 5.0 ? 'sparkle' : t < 6.9 ? 'wink' : 'wide'
      K.star(x, t, 'aries', { x: 420, y: 1180, s: 300, mood, look: [0, 0], seed: 3 })
    }
    x.strokeStyle = '#140c28'; x.lineWidth = 46; x.beginPath(); x.arc(420, 1430, 200, Math.PI * 1.1, Math.PI * 1.9); x.stroke(); x.strokeStyle = '#4a3a50'; x.lineWidth = 30; x.stroke()
    // ── the dinner (x 1200…2280)
    x.save(); x.beginPath(); x.rect(1200, -800, 1500, 3600); x.clip()
    K.room(x, t, { wall: '#4a2a2a', wall2: '#2a1414', floor: '#3a2420', window: true, warm: 0.8 })
    K.box(x, 1260, 1260, 960, 40, '#8a5a3a'); x.fillStyle = '#c84a5a'; x.fillRect(1260, 1250, 960, 14)
    for (const px of [1420, 1740, 2060]) { x.fillStyle = '#efe6d6'; x.beginPath(); x.ellipse(px, 1248, 80, 22, 0, 0, Math.PI * 2); x.fill() }
    K.box(x, 1690, 1150, 100, 90, '#c9603a')
    K.star(x, t, 'cancer', { x: 1980, y: 1160, s: 290, mood: t < 12 ? 'happy' : 'sparkle', look: [-1, 0], seed: 2, badge: true })
    K.pisces(x, t, { x: 1730, y: 880, s: 200, look: [0, 1], tears: 3 })
    if (!K.hide && t >= INSIDE) {
      const deflate = ease.outCubic(prog(t, 10.7, 11.3))
      K.star(x, t, 'aries', { x: 1500, y: 1170 + deflate * 30, s: 290, mood: t < 10.7 ? 'sparkle' : t < 12 ? 'wide' : 'neutral', look: [1, 0], seed: 3, squash: deflate * 0.2 })
    }
    x.restore()
  },
  cues: [
    ['pop', 1.62, 783.99, 0.04, 0], ['pop', 3.32, 880, 0.04, 0], ['pop', 5.02, 987.77, 0.04, 0],
    ['whoosh', INSIDE - 0.05, 0.3, 0.05], ['tick', INSIDE, 0.05],
    ['whoosh', 10.7, 0.6, 0.04], ['pluck', 10.75, 392, 0.04, 0.8, 0], ['pluck', 11.0, 349.23, 0.04, 0.8, 0], ['pluck', 11.25, 293.66, 0.04, 1.2, 0],
  ],
  music: { style: 'funk', key: 'D', seed: 4114, sections: { drop: 1.42, breakdown: [INSIDE], lift: [14.2] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
