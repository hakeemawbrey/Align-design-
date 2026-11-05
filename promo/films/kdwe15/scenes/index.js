// kdwe15 · Don't Watch This If You're a ___ · "Sagittarius Plans Spontaneity" (16 s vertical, hard cut) · chiptune · A
//   0      Sagittarius waving a map in front of the lens; "SAGITTARIUS. | Close your eyes. *Now.*" · scratch · whip out
//   1.5    to the crush (Leo): ♐ "let's just go somewhere, *spontaneously!*"
//   4.4    whip zoom: the "spontaneous" plan, a laminated binder with tabs, opening page by page
//          "Spontaneous: | *three months* in the making."
//   7.8    ♌ "yes! *let's go!*" → 9.4 Sagittarius faints into a beanbag
//   10.4   Pisces sobbing over the laminated map: "it's *laminated!!*" · 13.9 "Spontaneous. | *Laminated.*" · cut at 16
import { dwFilm, tag } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const SA = tag('sagittarius'), LE = tag('leo'), PI = tag('pisces')
const PLAN = [4.4, 7.6], YES = 7.8, FAINT = 9.4, PIS = 10.4
const PAGES = [['DAY 1 · 7:00', 'sunrise hike (casual)'], ['DAY 1 · 9:47', 'snack stop (planned)'], ['DAY 1 · 12:15', '“random” noodle place'], ['DAY 2 · ALL', 'be spontaneous ✓']]
const F = dwFilm({
  id: 'kdwe15', sign: 'sagittarius', dur: 16, ending: 'cut',
  hook: 'SAGITTARIUS.|Close your eyes. *Now.*', hookOut: 1.3, scratch: 'eyes: *wide open.*',
  lens: { mood: 'wide', look: [0, 0] }, pull: { x: 330, y: 1250, s: 300 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: YES - 0.1, cam: [1.05, 560, 1080] },
    { at: PIS, cam: [1, 540, 1000] },
  ],
  shakes: [FAINT + 0.5],
  heads: [
    { text: 'Spontaneous:|*three months* in the making.', at: 4.6, out: [7.4, 7.65], top: 240, size: 80 },
    { text: 'Spontaneous.|*Laminated.*', at: 13.9, top: 250, size: 110 },
  ],
  boxes: [
    { open: 1.45, close: 4.3, lines: [{ t: 1.6, speaker: SA, text: 'let’s just go somewhere, *spontaneously!*', color: '#c9a6ff' }] },
    { open: 7.9, close: 10.2, lines: [{ t: 8.05, speaker: LE, text: 'yes! *let’s go!*', color: '#ffb36b' }] },
    { open: 10.55, close: 13.5, lines: [{ t: 10.7, speaker: PI, text: 'it’s *laminated!!*', color: '#9fd7ff' }] },
  ],
  pitch: { [SA]: 659.25, [LE]: 440, [PI]: 1046.5 },
  paint(x, t, K) {
    K.room(x, t, { wall: '#2a2450', wall2: '#14102e', floor: '#2a2440', window: true, frame: '#c9a6ff' })
    // the beanbag
    x.fillStyle = '#140c28'; x.beginPath(); x.ellipse(300, 1360, 210, 90, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8628a'; x.beginPath(); x.ellipse(300, 1352, 198, 80, 0, 0, Math.PI * 2); x.fill()
    K.star(x, t, 'leo', { x: 820, y: 1240, s: 290, mood: t < YES ? 'happy' : 'sparkle', look: [-1, 0], seed: 8 })
    if (t > PIS) {
      K.pisces(x, t, { x: 560, y: 1000, s: 230, pop: K.pop01(t, PIS, 0.4), look: [0, 1], tears: 3 })
      // the laminated map in Pisces' fins (with tear drops on it)
      const k = K.pop01(t, PIS + 0.1, 0.35)
      x.save(); x.translate(560, 1170); x.scale(k, k); x.rotate(-0.05); K.box(x, -120, -50, 240, 100, '#cfe9c8', { o: 4 }); K.rect(x, -100, -30, 90, 6, '#3f8a6a'); K.rect(x, -20, 0, 110, 6, '#c9603a'); K.rect(x, -60, 14, 40, 6, '#3f8a6a')
      const sh = (t * 0.8) % 1; x.save(); x.beginPath(); x.rect(-120, -50, 240, 100); x.clip(); x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.moveTo(-160 + sh * 400, -60); x.lineTo(-120 + sh * 400, -60); x.lineTo(-180 + sh * 400, 60); x.lineTo(-220 + sh * 400, 60); x.fill(); x.restore()
      x.restore()
    }
    if (!K.hide) {
      const f = ease.inOutQuad(prog(t, FAINT, FAINT + 0.5))
      const mood = t < PLAN[0] ? 'happy' : t < YES ? 'wink' : t < FAINT ? 'wide' : 'sleepy'
      K.star(x, t, 'sagittarius', { x: lerp(330, 300, f), y: lerp(1250, 1290, f), s: 300, mood, look: [1, 0], seed: 4, rot: -f * 1.3, zzz: false })
      if (t > FAINT + 0.5) for (let i = 0; i < 3; i++) { const a = t * 3 + i * 2.1; K.txt(x, '✦', 260 + Math.cos(a) * 90, 1110 + Math.sin(a) * 26, { size: 34, color: '#f2c75c' }) }
    }
  },
  over(x, t, K) {
    const k = K.inOut(t, PLAN[0], PLAN[1])
    if (k <= 0.01) return
    x.save(); x.translate(560, 960); x.scale(k, k); x.rotate(-0.04)
    K.box(x, -380, -340, 760, 620, '#3f8a6a', { o: 8 })
    // tabs
    ;['#ff6fa8', '#f2c75c', '#7fd0f0', '#c9a6ff'].forEach((c, i) => K.box(x, 380, -300 + i * 120, 50, 90, c, { o: 4 }))
    K.txt(x, 'SPONTANEOUS TRIP', 0, -290, { size: 44, font: K.INTER, weight: 900, color: '#efe6d6' })
    K.txt(x, 'v14 · FINAL · final(2)', 0, -246, { size: 22, color: '#cfe9c8' })
    PAGES.forEach(([h, b], i) => {
      const p = K.pop01(t, PLAN[0] + 0.5 + i * 0.5, 0.3)
      if (p <= 0) return
      x.save(); x.translate(0, -160 + i * 112); x.scale(p, p)
      K.box(x, -330, -44, 660, 92, '#f6ecd4', { o: 4 }); K.txt(x, h, -310, -14, { size: 22, align: 'left', color: K.RED }); K.txt(x, b, -310, 20, { size: 28, align: 'left', color: '#2a1a3a' })
      x.restore()
    })
    // the laminate shine
    const sh = ((t - PLAN[0]) * 0.7) % 1
    x.save(); x.beginPath(); x.rect(-380, -340, 760, 620); x.clip(); x.fillStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.moveTo(-600 + sh * 1400, -360); x.lineTo(-480 + sh * 1400, -360); x.lineTo(-700 + sh * 1400, 300); x.lineTo(-820 + sh * 1400, 300); x.fill(); x.restore()
    x.restore()
  },
  cues: [
    ['whoosh', PLAN[0] - 0.05, 0.3, 0.05], ...PAGES.map((_, i) => ['tick', +(PLAN[0] + 0.5 + i * 0.5).toFixed(2), 0.05]), ['glitter', PLAN[0] + 0.3, PLAN[0] + 1.2],
    ['whoosh', FAINT, 0.5, 0.05], ['boom', FAINT + 0.5, 0.08], ['pluck', FAINT + 0.6, 1318.51, 0.03, 0.4, 0], ['pluck', FAINT + 0.8, 1567.98, 0.03, 0.4, 0],
    ['pop', PIS + 0.03, 987.77, 0.05, 0.3], ['glitter', PIS, PIS + 1.4],
  ],
  music: { style: 'chiptune', key: 'A', seed: 4115, sections: { drop: 1.42, lift: [YES] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
