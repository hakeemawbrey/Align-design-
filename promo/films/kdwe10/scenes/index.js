// kdwe10 · Don't Watch This If You're a ___ · "Aquarius Rewinds the Proposal" (17 s vertical, hard cut) · synthwave · Gm
//   0      Aquarius blocking the lens with a gadget; "AQUARIUS. | Scroll. This is *classified.*" · scratch · whip out
//   1.5    a desk of gadgets: ♒ "romance is a social *construct.*"
//   4.2    whip pan: a hidden screen playing a fictional rom-com, the proposal scene · "Also *Aquarius:*"
//   6.2    ◀◀ REWIND ×2 · 7.6 on the couch, one pixel tear
//   8.6    loading bar (hook kit) "staying detached…" 99% → ERROR
//   11.6   Pisces on the couch too, sobbing: "they said *YES!!*" · 14.4 "Detached. | *Rewound* the proposal twice." · cut at 17
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const AQ = tag('aquarius'), PI = tag('pisces')
const PAN = 4.2, REW = [6.2, 7.2], COUCH = 7.4, PIS = 11.6
const LOAD = { at: 8.6, len: 2.8, label: 'staying detached…', stallAt: 99, error: 'ERROR: too many feelings', y: 1520 }
// the film-in-the-film: its own clock rewinds during REW
function movieT(t) { if (t < REW[0]) return t - PAN; if (t < REW[1]) return lerp(REW[0] - PAN, 0, ease.inOutQuad(prog(t, ...REW))); return t - REW[1] }
function movie(x, K, t, X, Y) {
  const mt = movieT(t)
  K.box(x, X - 300, Y - 200, 600, 400, '#0a0820', { o: 14 })
  x.save(); x.beginPath(); x.rect(X - 300, Y - 200, 600, 400); x.clip()
  const g = x.createLinearGradient(0, Y - 200, 0, Y + 200); g.addColorStop(0, '#3a2a6a'); g.addColorStop(1, '#ff8f7a'); x.fillStyle = g; x.fillRect(X - 300, Y - 200, 600, 400)
  K.rect(x, X - 300, Y + 110, 600, 90, '#2a1a3a')
  // two silhouettes: one kneels, a ring glints
  const kneel = ease.outCubic(prog(mt, 0.6, 1.4))
  K.rect(x, X - 110, Y - 40, 60, 150, '#140c28'); x.fillStyle = '#140c28'; x.beginPath(); x.arc(X - 80, Y - 70, 34, 0, Math.PI * 2); x.fill()
  const ky = lerp(0, 60, kneel)
  K.rect(x, X + 50, Y - 40 + ky, 60, 150 - ky, '#140c28'); x.beginPath(); x.arc(X + 80, Y - 70 + ky, 34, 0, Math.PI * 2); x.fill()
  if (kneel > 0.8) { const s = 0.6 + 0.4 * Math.sin(mt * 12); x.fillStyle = '#fff6c0'; x.beginPath(); x.arc(X + 20, Y + 10 + ky * 0.4, 10 * s, 0, Math.PI * 2); x.fill() }
  if (mt > 1.8) K.txt(x, 'yes!!', X - 80, Y - 140, { size: 34, color: '#fff' })
  if (t > REW[0] && t < REW[1]) { x.fillStyle = 'rgba(255,255,255,0.08)'; for (let i = 0; i < 12; i++) x.fillRect(X - 300, Y - 200 + ((i * 37 + t * 900) % 400), 600, 6); K.txt(x, '◀◀ REWIND ×2', X, Y - 150, { size: 40, color: '#fff' }) }
  x.restore()
  K.txt(x, '“THE PIER AT NINE”  (a made-up film)', X, Y + 236, { size: 20, color: '#bdb3d8' })
}
const F = dwFilm({
  id: 'kdwe10', sign: 'aquarius', dur: 17, ending: 'cut',
  hook: 'AQUARIUS.|Scroll. This is *classified.*', hookOut: 1.3, scratch: 'declassifying *now.*',
  lens: { mood: 'squint', look: [0, 0] }, pull: { x: 300, y: 1250, s: 300 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: PAN, cam: [1, 1640, 960] },
    { at: COUCH, cam: [1.1, 1640, 1060] },
  ],
  heads: [
    { text: 'Also *Aquarius:*', at: 4.4, out: [6.0, 6.2], top: 240, size: 104 },
    { text: 'Detached.|*Rewound* the proposal twice.', at: 14.4, top: 250, size: 80 },
  ],
  boxes: [
    { open: 1.45, close: 4.0, lines: [{ t: 1.6, speaker: AQ, text: 'romance is a social *construct.*', color: '#7fe3ff' }] },
    { open: 11.75, close: 14.2, lines: [{ t: 11.9, speaker: PI, text: 'they said *YES!!*', color: '#9fd7ff' }] },
  ],
  pitch: { [AQ]: 987.77, [PI]: 1046.5 },
  fx: [{ f: HK.loadingBar, c: HK.loadingBarCues, o: LOAD }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#1e2a48', wall2: '#0f1428', floor: '#22283a', window: true })
    // the gadget desk
    K.box(x, 60, 1320, 900, 36, '#4a5a7a')
    K.box(x, 560, 1180, 120, 140, '#7fe3ff'); K.rect(x, 580, 1200, 80, 40, '#1a1236'); K.rect(x, 600, 1210, 12, 12, '#ff6fa8')
    K.box(x, 740, 1230, 160, 90, '#c9a6ff'); for (let i = 0; i < 4; i++) K.rect(x, 760 + i * 36, 1250, 20, 20 + 10 * Math.sin(t * 5 + i), '#1a1236')
    K.rect(x, 860, 1100, 10, 130, '#8a8a9a'); x.fillStyle = '#ff6fa8'; x.beginPath(); x.arc(865, 1095, 16 + 3 * Math.sin(t * 8), 0, Math.PI * 2); x.fill()
    // the hidden screen + the couch
    movie(x, K, t, 1640, 760)
    K.box(x, 1280, 1230, 720, 140, '#6a4a8a'); K.box(x, 1280, 1150, 80, 220, '#6a4a8a'); K.box(x, 1920, 1150, 80, 220, '#6a4a8a')
    if (t > PIS) K.pisces(x, t, { x: 1800, y: 1160, s: 250, pop: K.pop01(t, PIS, 0.4), look: [0, -1], tears: 3 })
    if (!K.hide) {
      if (t < PAN) K.star(x, t, 'aquarius', { x: 300, y: 1250, s: 300, mood: t < 2.6 ? 'squint' : 'neutral', look: [1, 0], seed: 11 })
      else if (t < COUCH) { const k = ease.outBack(prog(t, PAN + 0.2, PAN + 0.6)); K.star(x, t, 'aquarius', { x: lerp(1120, 1260, k), y: 1240, s: 260, mood: 'wide', look: [1, -1], seed: 11, rot: 0.3 * (1 - k) }) }
      else K.star(x, t, 'aquarius', { x: 1480, y: 1160, s: 280, mood: t < 8.6 ? 'sparkle' : t < PIS ? 'wide' : 'sparkle', look: [0, -1], seed: 11, tears: t > 7.6 ? (t > PIS ? 2 : 1) : 0 })
    }
  },
  cues: [
    ['whoosh', PAN - 0.05, 0.3, 0.05], ['bell', PAN + 1.5, 1567.98, 0.03, 1.4, 0.2],
    ['whoosh', REW[0], 1.0, 0.05], ...[0, 0.2, 0.4, 0.6, 0.8].map(d => ['tick', +(REW[0] + d).toFixed(2), 0.04]),
    ['pop', 7.65, 1318.51, 0.03, 0],
    ['pop', PIS + 0.03, 987.77, 0.05, 0.3], ['glitter', PIS, PIS + 1.4],
  ],
  music: { style: 'synthwave', key: 'Gm', seed: 4110, sections: { drop: 1.42, breakdown: [PAN], lift: [PIS] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
