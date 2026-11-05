// kpmoe06 · Planet Talk: The Moon · to Virgo · "Virgo's Date Report" (24.2 s vertical, hard cut) · lofi · D
//   0      frame 0: the Moon mid-burst out of the desk lamp's flash, way too big; Virgo mid-scribble on a clipboard
//          "DATE REVIEW"; "VIRGO. | Put down the *date report.*" · 0.9 record scratch + freeze "yep. *a date report.*"
//   2.4    "Reviewing your own *first date.*" · the list fills to 14 mistakes
//   6.2    the Moon: "look at me. *craters.* every single one." (true) · caught: CRATER · 9.4 "and people still *look up.*"
//  12.0    the Moon: "now write *one* thing that went well." · the list fades, one line: "they laughed at my joke."
//  17.2    Virgo: "…they *did* laugh." · 19.4 notification "had fun. *again soon?*" · Pisces sobs
//  22.4    "Fourteen mistakes. *One* laugh. | Laugh wins." · hard cut at 24.2
import { moonFilm, HK } from '../../kpmoe01/moonkit.js'
import { prog, ease, clamp } from '../../../src/lib.js'

const GOOD = 15.0, NOTI = 19.4
const MISTAKES = ['laughed too loud', 'said “you too” to the waiter', 'ordered the messy pasta', 'talked about my plant (9 min)', 'forgot their dog’s name', 'checked the time once']
const CAUGHT = { at: 7.0, x: 690, y: 650, r: 60, out: [9.0, 9.15], label: 'CRATER', arrow: 'tl', rec: false }
const NOTE = { at: NOTI, out: [21.6, 21.85], title: 'texts', body: 'had fun. *again soon?*', glyph: '♍', time: 'now' }

function clipboard(x, t, K) {
  x.save(); x.translate(740, 1270); x.rotate(0.04)
  K.box(x, -190, -240, 380, 480, '#c98a5a', { o: 7 }); K.box(x, -170, -210, 340, 440, '#fffaf0', { o: 3 }); K.box(x, -60, -258, 120, 40, '#b8bdd8', { o: 5 })
  K.txt(x, 'DATE REVIEW', 0, -170, { size: 28, color: '#c0475a' })
  const fade = 1 - ease.inOutCubic(prog(t, GOOD - 0.6, GOOD))
  if (fade > 0.01) {
    const n = Math.min(MISTAKES.length, 2 + Math.floor(Math.max(0, t - 0.3) / 0.45))
    x.globalAlpha = fade
    MISTAKES.slice(0, n).forEach((m, i) => K.txt(x, `${i + 1}. ${m}`, -150, -112 + i * 44, { size: 20, align: 'left', color: K.INK, maxW: 310 }))
    const cnt = t < 2.4 ? n : Math.min(14, n + Math.floor((t - 2.4) / 0.3))
    K.txt(x, '…', -150, -112 + n * 44, { size: 22, align: 'left', color: K.INK })
    x.save(); x.translate(60, 170); x.rotate(-0.08); K.box(x, -110, -32, 220, 64, '#ff3b4e', { o: 4 }); K.txt(x, `MISTAKES: ${cnt}`, 0, 2, { size: 24, color: '#fff' }); x.restore()
    x.globalAlpha = 1
  }
  const g = ease.outBack(prog(t, GOOD, GOOD + 0.4))
  if (g > 0.01) {
    x.save(); x.translate(0, 0); x.scale(g, g)
    K.rect(x, -160, -40, 320, 80, 'rgba(242,199,92,0.5)')
    K.txt(x, '1. they laughed', 0, -14, { size: 28, color: K.INK }); K.txt(x, 'at my joke.', 0, 22, { size: 28, color: K.INK })
    x.restore()
  }
  x.restore()
}
function lamp(x, t, K) {
  K.box(x, 920, 1340, 120, 40, '#3a2f5a', { o: 5 }); K.rect(x, 974, 1060, 12, 290, '#3a2f5a')
  x.fillStyle = K.INK; x.beginPath(); x.moveTo(880, 1100); x.lineTo(1080, 1100); x.lineTo(1040, 980); x.lineTo(920, 980); x.closePath(); x.fill()
  x.fillStyle = '#f2c75c'; x.beginPath(); x.moveTo(890, 1092); x.lineTo(1070, 1092); x.lineTo(1034, 988); x.lineTo(926, 988); x.closePath(); x.fill()
}

const F = moonFilm({
  id: 'kpmoe06', sign: 'virgo', dur: 24.2, ending: 'cut',
  hook: { text: 'VIRGO. | Put down the *date report.*', out: [2.2, 2.4] },
  enter: { kind: 'burst', at: -0.3, x: 780, y: 560, size: 380 },
  whip: false,
  freeze: { at: 0.9, len: 1.1, caption: 'yep. *a date report.*' },
  moon: [
    { at: 0, mood: 'wide' },
    { at: 2.1, mood: 'sad' },
    { at: 6.1, mood: 'proud' },
    { at: 9.3, mood: 'happy' },
    { at: 11.9, mood: 'neutral' },
    { at: GOOD, mood: 'happy' },
    { at: NOTI, mood: 'love' },
  ],
  me: [
    { at: 0, x: 300, y: 1250, s: 290, mood: 'squint', look: [1, 0.4], squash: 0.04 },
    { at: 2.4, mood: 'wide', squash: 0 },
    { at: 6.1, mood: 'neutral', look: [1, -0.6] },
    { at: 9.3, mood: 'sparkle', look: [1, -0.6] },
    { at: 11.9, mood: 'squint', look: [1, 0.3] },
    { at: GOOD, mood: 'wide', look: [1, 0.2] },
    { at: 17.1, mood: 'happy' },
    { at: NOTI, mood: 'heart', look: [0, 0] },
  ],
  meHops: [2.5, 17.2, NOTI, NOTI + 0.4],
  meProp(x, t, m, K) {
    // the pen, scribbling
    if (t < GOOD + 1) { const w = t < 2.4 || (t > 14.8 && t < GOOD + 0.6) ? Math.sin(t * 22) * 8 : 0; x.save(); x.translate(m.x + m.s * 0.45 + w, m.y + m.s * 0.05); x.rotate(0.6); K.box(x, -8, -60, 16, 100, '#7fe3ff', { o: 4 }); x.restore() }
  },
  pis: { x: 180, y: 540, s: 150, keys: [{ at: 0, tears: 1, mood: 'wide', look: [1, 0.4] }, { at: 9.4, tears: 2, mood: 'sparkle' }, { at: 20.0, tears: 3, mood: 'happy' }], sobs: [9.6, 20.1], hops: [20.1, 20.5] },
  says: [
    { t0: 6.2, t1: 9.1, who: 'moon', text: 'look at me. *craters.* every single one.', x: 540, y: 950, tail: 220, tailUp: true },
    { t0: 9.4, t1: 11.8, who: 'moon', text: 'and people still *look up.*', x: 540, y: 950, tail: 220, tailUp: true },
    { t0: 12.0, t1: 14.8, who: 'moon', text: 'now write *one* thing that went well.', x: 540, y: 950, tail: 220, tailUp: true },
    { t0: 17.2, t1: 19.2, who: 'virgo', text: '…they *did* laugh.', x: 340, y: 1660, tail: -40, tailUp: true },
  ],
  heads: [
    { text: 'Reviewing your own *first date.*', at: 2.4, out: [5.6, 5.85], top: 240, size: 80 },
    { text: 'Fourteen mistakes. *One* laugh. | Laugh wins.', at: 22.4, top: 240, size: 78 },
  ],
  fx: [
    { f: HK.caught, c: HK.caughtCues, o: CAUGHT },
    { f: HK.notification, c: HK.notificationCues, o: NOTE },
  ],
  set(x, t, K) {
    K.room(x, t, { wall: '#2e3a5a', wall2: '#1a2038', floor: '#2a2e44', warm: 0.3, frame: '#7dffb0' })
    K.box(x, -40, 1380, 1160, 50, '#8a6a4a', { o: 6 }); K.rect(x, 60, 1430, 30, 500, K.INK); K.rect(x, 990, 1430, 30, 500, K.INK)
  },
  paint(x, t, K) { lamp(x, t, K) },
  front(x, t, K) { clipboard(x, t, K) },
  cues: [
    ...MISTAKES.map((_, i) => ['tick', +(0.3 + i * 0.45).toFixed(2), 0.04]).filter(c => c[1] > 2.1),
    ['pop', 2.6, 659.25, 0.03, 0], ['pop', 3.6, 698.46, 0.03, 0], ['pop', 4.6, 739.99, 0.03, 0],
    ['whoosh', GOOD - 0.6, 0.6, 0.04], ['bell', GOOD, 1174.66, 0.05, 2.0, 0], ['glitter', GOOD, GOOD + 1.4], ['pop', 17.2, 880, 0.03, 0],
  ],
  music: { style: 'lofi', key: 'D', seed: 20206, sections: { drop: 2.1, lift: [GOOD] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
