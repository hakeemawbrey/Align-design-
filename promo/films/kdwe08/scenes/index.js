// kdwe08 · Don't Watch This If You're a ___ · "Sagittarius Saves the Voice Notes" (18 s vertical, hard cut) · synthwave · Bm
//   0      Sagittarius mid-sprint into the lens; "SAGITTARIUS. | Don't. *Watch.* This." · scratch + freeze · whip out
//   1.5    packing a backpack: ♐ "i don't catch *feelings.*" · "Free *spirit.*"
//   4.2    the phone: a folder SAVED VOICE NOTES, every one from the crush, starred · "*Every* voice note. | Starred."
//   7.8    2:00 AM, lights off: Sag in bed replaying one, grinning, heart eyes
//   10.6   countdown (hook kit) "Denial ends in…" 3 · 2 · 1 · LOVE!
//   13.0   Pisces sobbing: "that's *love!!*" · 16.0 "Free spirit. | *Saved* every voice note." · hard cut at 18
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const SA = tag('sagittarius'), PI = tag('pisces')
const FOLDER = [4.2, 7.6], NIGHT = 7.8, COUNT = 10.6, PIS = 13.0
const NOTES = [['0:12', 'hiii'], ['0:41', 'the dog story'], ['1:03', 'goodnight'], ['0:08', 'lol'], ['2:17', 'about your trip'], ['0:33', 'goodnight 2']]
const COUNTO = { at: COUNT, from: 3, gap: 0.55, go: 'LOVE!', y: 900, color: '#c9a6ff' }
const F = dwFilm({
  id: 'kdwe08', sign: 'sagittarius', dur: 18, ending: 'cut',
  hook: 'SAGITTARIUS.|Don’t. *Watch.* This.', hookOut: 1.3, scratch: 'free spirit? *rewind.*',
  lens: { mood: 'wide', look: [0, 0] }, pull: { x: 330, y: 1250, s: 320 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: NIGHT, cam: [1.15, 540, 1150] },
    { at: PIS, cam: [1, 540, 1000] },
  ],
  heads: [
    { text: 'Free *spirit.*', at: 2.9, out: [4.0, 4.2], top: 240, size: 110 },
    { text: '*Every* voice note.|Starred.', at: 4.4, out: [7.3, 7.55], top: 240 },
    { text: '2:00 AM. *Replay.*', at: 8.0, out: [10.3, 10.55], top: 240 },
    { text: 'Denial ends in…', at: COUNT, out: [12.6, 12.85], top: 300, size: 80 },
    { text: 'Free spirit.|*Saved* every voice note.', at: 16.0, top: 250, size: 84 },
  ],
  boxes: [
    { open: 1.45, close: 4.0, lines: [{ t: 1.6, speaker: SA, text: 'i don’t catch *feelings.*', color: '#c9a6ff' }] },
    { open: 13.1, close: 15.8, lines: [{ t: 13.25, speaker: PI, text: 'that’s *love!!*', color: '#9fd7ff' }] },
  ],
  pitch: { [SA]: 659.25, [PI]: 1046.5 },
  fx: [{ f: HK.countdown, c: HK.countdownCues, o: COUNTO }],
  paint(x, t, K) {
    const night = t > NIGHT ? 1 : 0
    K.room(x, t, { wall: '#2a2050', wall2: '#140e30', floor: '#2a2040', window: true, frame: '#c9a6ff', lamp: !night })
    if (!night) {
      // the backpack, half packed
      K.box(x, 660, 1100, 220, 260, '#3f8a6a'); K.box(x, 690, 1180, 160, 80, '#2f6a52'); K.rect(x, 700, 1080, 140, 30, '#efe6d6'); K.box(x, 900, 1300, 90, 60, '#f2c75c')
    } else {
      // the bed
      K.box(x, 80, 1260, 920, 120, '#5a4a8a'); K.box(x, 80, 1180, 200, 90, '#efe6d6')
    }
    if (t > PIS) K.pisces(x, t, { x: 820, y: 1080, s: 240, pop: K.pop01(t, PIS, 0.4), look: [-1, 0], tears: 3 })
    if (!K.hide) {
      if (!night) K.star(x, t, 'sagittarius', { x: 330, y: 1250, s: 320, mood: t < 2.9 ? 'happy' : t < FOLDER[0] ? 'wink' : 'wide', look: [1, 0], seed: 4 })
      else K.star(x, t, 'sagittarius', { x: 420, y: 1170, s: 300, mood: t < COUNT ? 'heart' : t < PIS ? 'wide' : 'happy', look: [1, 0.5], seed: 4, rot: -0.2 })
    }
    if (night) { x.save(); x.fillStyle = 'rgba(6,4,24,0.35)'; x.fillRect(-800, -800, 3000, 3600); x.restore() }
    if (night && t < COUNT) {
      // phone glow on the face
      const g = x.createRadialGradient(560, 1150, 20, 560, 1150, 380); g.addColorStop(0, 'rgba(160,200,255,0.35)'); g.addColorStop(1, 'rgba(160,200,255,0)'); x.fillStyle = g; x.fillRect(100, 700, 900, 900)
      K.box(x, 560, 1080, 90, 150, '#1a1236'); K.rect(x, 568, 1090, 74, 130, '#9fd7ff')
      for (let i = 0; i < 8; i++) K.rect(x, 574 + i * 8, 1155 - 18 * Math.abs(Math.sin(t * 9 + i)), 5, 36 * Math.abs(Math.sin(t * 9 + i)) + 4, '#1a1236')
    }
  },
  over(x, t, K) {
    const k = K.inOut(t, FOLDER[0], FOLDER[1])
    if (k <= 0.01) return
    K.phone(x, t, {
      X: 700, Y: 1000, w: 480, h: 780, pop: k, rot: 0.04, title: 'SAVED VOICE NOTES ★', time: '7:12',
      screen: (c, tt, w, h) => {
        NOTES.forEach(([len, name], i) => {
          const p = K.pop01(tt, FOLDER[0] + 0.3 + i * 0.35, 0.28)
          if (p <= 0) return
          c.save(); c.translate(0, -h / 2 + 200 + i * 96); c.scale(p, p)
          K.rrect(c, -w / 2 + 20, -38, w - 40, 76, 18, '#2c2450')
          c.fillStyle = '#c9a6ff'; c.beginPath(); c.arc(-w / 2 + 62, 0, 22, 0, Math.PI * 2); c.fill(); K.txt(c, '▶', -w / 2 + 63, 1, { size: 20, color: '#1a1236' })
          K.txt(c, `crush · ${name}`, -w / 2 + 100, -8, { size: 22, align: 'left', color: '#efe6d6', maxW: w - 220 })
          K.txt(c, len, -w / 2 + 100, 18, { size: 18, align: 'left', color: '#bdb3d8' })
          K.txt(c, '★', w / 2 - 50, 0, { size: 34, color: '#f2c75c' })
          c.restore()
        })
      },
    })
  },
  cues: [
    ...NOTES.map((_, i) => ['pop', +(FOLDER[0] + 0.32 + i * 0.35).toFixed(2), 880 + i * 60, 0.035, 0.2]),
    ['whoosh', NIGHT - 0.05, 0.3, 0.05], ['pluck', NIGHT + 0.4, 659.25, 0.04, 0.6, 0], ['pluck', NIGHT + 0.7, 783.99, 0.04, 0.6, 0], ['pluck', NIGHT + 1.0, 987.77, 0.04, 0.8, 0],
    ['pop', PIS + 0.03, 987.77, 0.05, 0.3], ['glitter', PIS, PIS + 1.4],
  ],
  music: { style: 'synthwave', key: 'Bm', seed: 4108, sections: { drop: 1.42, breakdown: [NIGHT], lift: [COUNT + 2.2] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
