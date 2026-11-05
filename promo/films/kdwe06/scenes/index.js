// kdwe06 · Don't Watch This If You're a ___ · "Taurus Sets Two Plates" (17 s vertical, hard cut) · jazzy · F
//   0      Taurus with a ladle, blocking the lens; "TAURUS. | This one's *private.*" · scratch + freeze · whip out
//   1.5    "Single and *loving it.*": Taurus at the stove, a big cosy pot steaming
//   4.4    whip zoom to the table: two plates, two napkins, two candles · "…*two* plates?" · CAUGHT on plate two
//   6.9    ♉ "just in *case.*" · 9.4 notification: FRIEND "still coming to dinner tonight?"
//   10.2   ♉ "…yes. bringing *dessert.*" (a cake box pops into its hands)
//   12.0   Pisces at the window, sobbing: "the *candles!!*" · 15.3 "Table for one. | *Napkins* for two." · hard cut at 17
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const TA = tag('taurus'), PI = tag('pisces')
const TABLE = 4.4, NOTE = 9.4, CAKE = 10.4, PIS = 12.0
function plate(x, K, X, Y) { x.fillStyle = '#140c28'; x.beginPath(); x.ellipse(X, Y, 92, 30, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#efe6d6'; x.beginPath(); x.ellipse(X, Y - 4, 84, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d9cbb0'; x.beginPath(); x.ellipse(X, Y - 4, 50, 13, 0, 0, Math.PI * 2); x.fill() }
function candle(x, K, X, Y, t, i) {
  K.box(x, X - 14, Y - 110, 28, 110, '#f6e8d0', { o: 3 })
  const f = 1 + 0.15 * Math.sin(t * 13 + i * 2)
  x.save(); x.translate(X, Y - 124); x.scale(1, f); x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(0, 0, 10, 20, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff3c0'; x.beginPath(); x.ellipse(0, 4, 5, 10, 0, 0, Math.PI * 2); x.fill(); x.restore()
  const g = x.createRadialGradient(X, Y - 124, 4, X, Y - 124, 160); g.addColorStop(0, 'rgba(255,190,110,0.35)'); g.addColorStop(1, 'rgba(255,190,110,0)'); x.fillStyle = g; x.fillRect(X - 160, Y - 290, 320, 320)
}
const F = dwFilm({
  id: 'kdwe06', sign: 'taurus', dur: 17, ending: 'cut',
  hook: 'TAURUS.|This one’s *private.*', hookOut: 1.3, scratch: 'private? *we’re in.*',
  lens: { mood: 'squint', look: [0, 0] }, pull: { x: 400, y: 1240, s: 300 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: TABLE, cam: [1.35, 820, 1180] },
    { at: 6.8, cam: [1.1, 660, 1100] },
    { at: PIS, cam: [1, 600, 1000] },
  ],
  heads: [
    { text: 'Single and *loving it.*', at: 1.5, out: [4.1, 4.35], top: 240 },
    { text: '…*two* plates?', at: 4.6, out: [6.5, 6.75], top: 240, size: 110 },
    { text: 'Table for one.|*Napkins* for two.', at: 15.3, top: 250 },
  ],
  boxes: [
    { open: 6.9, close: 11.9, lines: [{ t: 7.05, speaker: TA, text: 'just in *case.*', color: '#9fe6b0' }, { t: 10.2, speaker: TA, text: '…yes. bringing *dessert.*', color: '#9fe6b0' }] },
    { open: 12.2, close: 14.9, lines: [{ t: 12.35, speaker: PI, text: 'the *candles!!*', color: '#9fd7ff' }] },
  ],
  pitch: { [TA]: 392, [PI]: 1046.5 },
  fx: [
    { f: HK.caught, c: HK.caughtCues, o: { at: 5.1, x: 730, y: 985, r: 150, out: [6.5, 6.75], label: 'PLATE #2', arrow: 'bl', rec: false } },
    { f: HK.notification, c: HK.notificationCues, o: { at: NOTE, out: [11.6, 11.85], title: 'messages', body: 'FRIEND: still coming to *dinner* tonight?', glyph: '♉', y: 140 } },
  ],
  paint(x, t, K) {
    K.room(x, t, { wall: '#3a2a22', wall2: '#22150f', floor: '#3a2a20', window: true, warm: 0.7 })
    // stove + pot
    K.box(x, 60, 1300, 400, 480, '#4a4a5a'); K.box(x, 120, 1270, 280, 30, '#2a2a3a')
    K.box(x, 70, 1160, 180, 110, '#c9603a'); K.rect(x, 60, 1150, 200, 20, '#a8482a'); K.rect(x, 240, 1080, 12, 90, '#8a8a9a'); K.box(x, 222, 1060, 50, 30, '#8a8a9a', { o: 3 })
    for (let i = 0; i < 4; i++) { const ph = (t * 0.6 + i / 4) % 1; x.save(); x.globalAlpha = 0.35 * (1 - ph); x.fillStyle = '#fff'; x.beginPath(); x.arc(110 + i * 34 + Math.sin(t * 2 + i) * 14, 1130 - ph * 220, 16 + ph * 20, 0, Math.PI * 2); x.fill(); x.restore() }
    // the table set for two
    K.box(x, 520, 1220, 600, 30, '#8a5a3a'); K.rect(x, 560, 1250, 24, 530, '#5a3a24'); K.rect(x, 1060, 1250, 24, 530, '#5a3a24')
    x.fillStyle = '#c84a5a'; x.fillRect(540, 1206, 560, 16)
    plate(x, K, 640, 1200); plate(x, K, 960, 1200)
    for (const X of [560, 1050]) { K.box(x, X - 18, 1170, 36, 34, '#ffb3c6', { o: 3 }) }
    candle(x, K, 760, 1196, t, 0); candle(x, K, 840, 1196, t, 1)
    if (t > PIS) K.pisces(x, t, { x: 820, y: 560, s: 230, pop: K.pop01(t, PIS, 0.4), look: [0, 1], tears: 3 })
    if (!K.hide) {
      const at2 = t > 6.8
      const X = at2 ? 470 : 400, Y = at2 ? 1170 : 1240
      const mood = t < TABLE ? 'happy' : t < NOTE ? (t < 7 ? 'wide' : 'neutral') : t < CAKE ? 'wide' : 'sparkle'
      K.star(x, t, 'taurus', { x: X, y: Y, s: 300, mood, look: at2 ? [1, 0] : [0, -0.4], seed: 2, rot: !at2 ? Math.sin(t * 4) * 0.05 : 0 })
      const ck = K.pop01(t, CAKE, 0.35)
      if (ck > 0) { x.save(); x.translate(X + 120, Y + 40); x.scale(ck, ck); K.box(x, -70, -60, 140, 100, '#ffd9e6'); K.rect(x, -70, -20, 140, 14, '#e8628a'); K.label(x, 'DESSERT', 0, 20, { size: 18, pad: 6 }); x.restore() }
    }
  },
  cues: [
    ['bell', 2.0, 659.25, 0.025, 1.4, -0.3], ['tick', 3.0, 0.03], ['tick', 3.6, 0.03],
    ['pop', CAKE + 0.02, 783.99, 0.05, 0.2], ['glitter', CAKE, CAKE + 0.9],
    ['pop', PIS + 0.03, 987.77, 0.05, 0.3], ['glitter', PIS, PIS + 1.4],
  ],
  music: { style: 'jazzy', key: 'F', seed: 4106, sections: { drop: 1.42, lift: [TABLE], breakdown: [NOTE] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
