// kpure12 · Planet Talk: Uranus · "Pisces, You Can Text First" (27 s vertical, hard cut) · dreamy · E · star_advice
//   0      Uranus rolling through a mountain of tissues, tissues mid-flurry, Pisces mid-sob; "PISCES. | Wipe your eyes. *Text first.*"
//   0.45   glitch · 2.7 "Nine pages. *Unsent.*" the love poem unrolls to the floor (PAGE 9/9)
//   5.8    ♓ "If I send *hi*, it's too much. And not *enough.*" · 9.2 ♅ "Unexpected move: *short and brave.*"
//   12.2   the draft shrinks: 9 PAGES → 1 PARAGRAPH → 6 WORDS: "want to get coffee on saturday?"
//   16.0   Pisces presses SEND, sobbing: "*sent.* (sob)" · 18.4 notification: "yes!! I was *hoping* you'd ask"
//   19.2   Pisces cries harder, happy: "they were *HOPING!!*" · 22.0 ♅ "Six words. *All heart.*"
//   25.2   "Nine pages. | *Six words* worked." · hard cut at 27
import { urFilm, HK, r3 } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 27, POEM = 2.7, SHRINK = 12.2, SEND = 16.0, NOTE = 18.4, HAPPY = 19.2, LAST = 25.2
const DRAFTS = [
  { at: SHRINK, tag: '9 PAGES', text: 'Dear you, | the moon and I | have been talking…' },
  { at: 13.4, tag: '1 PARAGRAPH', text: 'hi! so I’ve been | thinking about | you a lot and…' },
  { at: 14.6, tag: '6 WORDS', text: 'want to get coffee | *on saturday?*' },
]
const NOTIF = { at: NOTE, out: [21.8, 22.1], title: 'MESSAGES', body: 'yes!! I was *hoping* you’d ask', glyph: '♥', y: 380 }

function bedroom(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#13283e'); g.addColorStop(1, '#1f4252')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let j = 0; j < 14; j++) for (let i = 0; i < 9; i++) if ((i + j) % 3 === 0) K.rect(x, i * 130 + 40, j * 120 + 60, 8, 8, 'rgba(255,255,255,0.05)')
  // fairy lights
  for (let i = 0; i < 10; i++) { const on = 0.5 + 0.5 * Math.sin(t * 2.5 + i); x.fillStyle = `rgba(255,190,220,${0.4 + 0.5 * on})`; x.beginPath(); x.arc(60 + i * 106, 330 + 30 * Math.sin(i * 0.9), 11, 0, Math.PI * 2); x.fill() }
  // bed + floor
  x.fillStyle = '#122030'; x.fillRect(0, 1600, 1080, 320)
  K.box(x, 520, 1400, 600, 220, '#e8a0b8', { o: 8 }); K.box(x, 560, 1340, 200, 90, '#efe6d6', { o: 5 })
  // the tissue mountain (left)
  for (let i = 0; i < 22; i++) { const tx = 60 + ((i * 83) % 380), ty = 1590 - Math.floor(i / 5) * 46 - ((i * 29) % 30); x.save(); x.translate(tx, ty); x.rotate(((i * 37) % 10 - 5) * 0.08); K.box(x, -40, -26, 80, 52, '#fbf7ff', { o: 3 }); x.restore() }
}
function tissue(x) { x.fillStyle = '#140c28'; x.fillRect(-44, -30, 88, 60); x.fillStyle = '#fbf7ff'; x.fillRect(-40, -26, 80, 52); x.fillStyle = '#e8e0f4'; x.fillRect(-40, 6, 80, 6) }

const F = urFilm({
  id: 'kpure12', sign: 'pisces', dur: D, ending: 'cut',
  hook: { text: 'PISCES. | Wipe your eyes. | *Text first.*', top: 210, size: 100 },
  entry: { roll: true, from: 'left', at: -0.3, x: 420, y: 920, size: 380 },
  brk: { at: 0.48, len: 0.45 },
  debris: Array.from({ length: 7 }, (_, i) => ({ draw: tissue, x: 240 + i * 30, y: 1460, vx: -500 + i * 170, vy: -1300 - (i % 3) * 250, spin: (i % 2 ? 4 : -4), t0: -0.35, front: true })),
  bg: bedroom,
  paint(x, t, K) {
    const U = K.track(t, [[0, { x: 420, y: 920, size: 380 }], [POEM + 0.5, { x: 250, y: 720, size: 300 }]])
    K.uranus(x, t, { ...U, mood: t < POEM ? 'happy' : t < 9.2 ? 'wide' : t < HAPPY ? 'sly' : 'love', look: t < POEM ? [1, 0.5] : [1, 0.8], hops: [0.4, NOTE + 0.2] })
    const P = K.track(t, [[0, { x: 790, y: 1300, s: 360 }], [POEM + 0.5, { x: 770, y: 1330, s: 340 }]])
    const happy = t >= NOTE
    K.sign(x, t, 'pisces', { ...P, mood: happy ? 'sparkle' : t < SEND ? 'wide' : 'squint', tears: happy ? 3 : t < 9.2 ? 3 : 2, look: t < POEM ? [-1, 0] : [-0.6, 0.4], hops: happy ? [NOTE + 0.1, NOTE + 0.4, NOTE + 0.7, HAPPY + 0.5, HAPPY + 1.0, HAPPY + 1.5] : [SEND + 0.1], seed: 6, shadow: true })
    // the poem scroll, unrolling from Pisces's fins to the floor
    const un = ease.outCubic(prog(t, POEM + 0.2, POEM + 1.4)) * (1 - ease.inCubic(prog(t, SHRINK - 0.3, SHRINK + 0.2)))
    if (un > 0.01) {
      const top = 1400, h = 440 * un
      K.box(x, 640, top, 220, h, '#fffaf0', { o: 5 })
      x.save(); x.beginPath(); x.rect(640, top, 220, h); x.clip()
      for (let i = 0; i < 22; i++) K.rect(x, 660, top + 20 + i * 28, 150 - (i % 3) * 30, 8, '#c9a6ff')
      x.restore()
      if (un > 0.9) K.label(x, 'PAGE 9 / 9', 750, top + h + 40, { size: 26, bg: '#ff8fb1' })
    }
  },
  over(x, t, K) {
    // the phone with the shrinking draft
    const pk = K.pop01(t, SHRINK - 0.2, 0.35) * K.outK(t, [NOTE - 0.2, NOTE + 0.1])
    if (pk > 0.01) {
      const d = DRAFTS.filter(q => t >= q.at).pop() || DRAFTS[0]
      const bump = 1 + 0.12 * Math.exp(-(t - d.at) * 8)
      x.save(); x.translate(540, 1000); x.rotate(-0.03); x.scale(pk, pk)
      K.box(x, -330, -260, 660, 520, '#1a1236', { o: 8 }); K.rect(x, -330, -260, 660, 70, '#2c2450')
      K.txt(x, '♥ the crush', 0, -224, { size: 30 })
      x.save(); x.scale(bump, bump); K.label(x, d.tag, 0, -130, { size: 34, bg: d.tag === '6 WORDS' ? '#7dffb0' : '#ff8fb1' }); x.restore()
      K.rich(x, d.text, 0, -30, { size: 40, color: '#efe6d6', accent: '#7fe3ff', stroke: null, lh: 1.3, maxW: 600 })
      // the SEND button
      const pr = t > SEND && t < SEND + 0.25 ? 0.9 : 1
      x.save(); x.translate(0, 190); x.scale(pr, pr); K.box(x, -150, -44, 300, 88, t > SEND ? '#7dffb0' : '#5aa8ff', { o: 5 }); K.txt(x, t > SEND ? 'SENT ✓' : 'SEND', 0, 2, { size: 40, font: K.INTER, weight: 900, color: K.INK }); x.restore()
      x.restore()
    }
  },
  lines: [
    { t0: 5.8, t1: 9.0, who: 'pisces', text: 'If I send *hi*, it’s too much. And not *enough.*', x: 600, y: 1700, tailUp: true, tail: 160, maxW: 760 },
    { t0: 9.2, t1: 12.0, who: 'uranus', text: 'Unexpected move: *short and brave.*', x: 560, y: 420, tail: -260, maxW: 760 },
    { t0: SEND + 0.4, t1: 18.0, who: 'pisces', text: '*sent.* (sob)', x: 700, y: 1700, tailUp: true, tail: 60 },
    { t0: HAPPY, t1: 21.8, who: 'pisces', text: 'they were *HOPING!!*', x: 680, y: 1700, tailUp: true, tail: 80 },
    { t0: 22.0, t1: 24.6, who: 'uranus', text: 'Six words. *All heart.*', x: 560, y: 420, tail: -260 },
  ],
  heads: [
    { at: POEM, text: 'Nine pages. | *Unsent.*', out: [5.5, 5.75], top: 240, size: 104 },
    { at: LAST, text: 'Nine pages. | *Six words* worked.', top: 240, size: 104 },
  ],
  fx: [{ f: HK.notification, c: HK.notificationCues, o: NOTIF }],
  cues: [
    ['whoosh', POEM + 0.2, 1.0, 0.04],
    ...DRAFTS.map((q, i) => ['pop', q.at, 659.25 * Math.pow(2, i / 4), 0.05, 0]),
    ['tick', SEND, 0.08], ['pop', SEND + 0.05, 1046.5, 0.06, 0], ['whoosh', SEND + 0.05, 0.3, 0.05],
    ['glitter', NOTE, NOTE + 1.2], ['glitter', HAPPY + 0.5, HAPPY + 1.5],
  ],
  music: { style: 'dreamy', key: 'E', seed: 8112, sections: { drop: 0.48, breakdown: [SHRINK], lift: [NOTE] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
