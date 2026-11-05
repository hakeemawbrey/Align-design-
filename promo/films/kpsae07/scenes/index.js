// kpsae07 · Planet Talk: Saturn · "Saturn Books Libra's 'Sometime'" (24 s vertical, hard cut) · cinematic · Eb
//   0      Saturn bursting in way too big as a giant hourglass slams onto the café table, sand mid-splash; Libra mid
//          "we should hang out sometime!" · "LIBRA. | 'Sometime' is *not* a date."  · 0.25 the landing
//   2.5    ♄ "LIBRA. Show me the *chat.*" · 2.9 six months of "sometime!" · 4.4 ticker: LOCAL "SOMETIME" STILL NOT SCHEDULED
//   5.0    ♎ "we're *definitely* hanging out! …sometime." · 7.6 the calendar · ♄ "pick a day. *any* day."
//   9.8    Libra hovers TUE ↔ THU, scales wobbling · 12.4 ♄ "a *maybe* isn't kind. a *day* is."
//   14.6   THU · 7 PM stamped · ♎ sending "Thursday at 7?" · 16.4 notification "YES. finally!!"
//   17.0   Pisces the intern, sobbing: "it has a *time!!*" · 19.2 ♄ "…see? a plan is *romantic.*"
//   21.9   ♎ "Thursday, seven. *Sometime* found." · hard cut 24
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp, rng } from '../../../src/lib.js'

const D = 24
const PH = [2.9, 7.4], CAL = [7.6, 16.3], TICK = [4.4, 7.5]
const N = { at: 16.4, out: [19.0, 19.25], title: 'texts', body: 'YES. finally!! see you *thursday*', glyph: '♡', y: 330 }
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const F = saFilm({
  id: 'kpsae07', sign: 'libra', dur: D, ending: 'cut',
  hook: "LIBRA.|'Sometime' is *not* a date.", hookY: 210, hookSize: 90, hookOut: 2.4,
  arrive: { kind: 'burst', at: -0.3, x: 620, y: 600, size: 400 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 9.8, cam: [1.12, 420, 1120] },
    { at: 12.3, cam: [1, 540, 960] },
    { at: 21.8, cam: [1.12, 420, 1120] },
  ],
  says: [
    { t0: -2, t1: 0.7, who: 'libra', text: 'we should hang out *sometime!*', x: 400, y: 1680, tailUp: true, tail: -60 },
    { t0: 2.5, t1: 4.2, who: 'saturn', text: 'LIBRA. Show me the *chat.*', x: 540, y: 185 },
    { t0: 5.0, t1: 7.3, who: 'libra', text: "we're *definitely* hanging out! …sometime.", x: 420, y: 1680, tailUp: true, tail: -60 },
    { t0: 7.8, t1: 9.6, who: 'saturn', text: 'pick a day. *any* day.', x: 540, y: 185 },
    { t0: 10.0, t1: 12.2, who: 'libra', text: 'Tuesday? Thursday? *both* are lovely…', x: 420, y: 1680, tailUp: true, tail: -60 },
    { t0: 12.4, t1: 14.4, who: 'saturn', text: "a *maybe* isn't kind. a *day* is.", x: 540, y: 185 },
    { t0: 14.6, t1: 16.2, who: 'libra', text: 'sending: "Thursday at *7?*"', x: 420, y: 1680, tailUp: true, tail: -60 },
    { t0: 17.0, t1: 19.0, who: 'pisces', text: 'it has a *time!!*', x: 700, y: 1480, tail: 200 },
    { t0: 19.2, t1: 21.6, who: 'saturn', text: '…see? a plan is *romantic.*', x: 540, y: 185 },
    { t0: 21.9, who: 'libra', text: 'Thursday, seven. *Sometime* found.', x: 440, y: 1680, tailUp: true, tail: -60, size: 48 },
  ],
  fx: [{ f: HK.notification, c: HK.notificationCues, o: N }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#2a2340', wall2: '#151024', floor: '#2e2238', floorY: 1500, frame: '#5a4a7a', warm: 0.45 })
    // the café table
    K.box(x, 100, 1400, 880, 36, '#d9c3a0'); K.box(x, 500, 1436, 80, 260, '#5a3a2a')
    K.box(x, 200, 1352, 70, 48, '#fffaf0'); K.rect(x, 210, 1360, 50, 14, '#b07a45')
    // the hourglass: slams down at frame 0 (mid-splash), then stands, sand running
    const slam = ease.inQuad(prog(t, -0.45, 0.08))
    const hx = 760, hy = lerp(300, 1250, slam)
    x.save(); x.translate(hx, hy); x.rotate((1 - slam) * 0.3)
    K.box(x, -90, -160, 180, 22, '#8a5a3a'); K.box(x, -90, 138, 180, 22, '#8a5a3a')
    x.fillStyle = 'rgba(200,230,255,0.35)'; x.strokeStyle = K.INK; x.lineWidth = 6
    x.beginPath(); x.moveTo(-70, -138); x.lineTo(70, -138); x.lineTo(10, 0); x.lineTo(70, 138); x.lineTo(-70, 138); x.lineTo(-10, 0); x.closePath(); x.fill(); x.stroke()
    const run = clamp(t / 22)
    x.fillStyle = '#f2c75c'
    x.beginPath(); x.moveTo(-60 + 50 * run, -130 + 120 * run); x.lineTo(60 - 50 * run, -130 + 120 * run); x.lineTo(8, -4); x.lineTo(-8, -4); x.closePath(); x.fill()
    x.beginPath(); x.moveTo(-64, 132); x.lineTo(64, 132); x.lineTo(64 - 40 * run, 132 - 70 * run - 10); x.lineTo(-64 + 40 * run, 132 - 70 * run - 10); x.closePath(); x.fill()
    if (t > 0.1) x.fillRect(-3, 0, 6, 132 - 70 * run)
    x.restore()
    // the sand splash (mid-air at frame 0)
    const R = rng(31)
    for (let i = 0; i < 30; i++) {
      const a = -Math.PI * (0.1 + 0.8 * R()), v = 300 + R() * 700, d = t + 0.05
      if (d < 0 || d > 1.4) continue
      const X = hx + Math.cos(a) * v * d, Y = 1390 + Math.sin(a) * v * d + 1400 * d * d
      if (Y > 1410) continue
      x.fillStyle = K.INK; x.fillRect(X - 2, Y - 2, 16, 16); x.fillStyle = '#f2c75c'; x.fillRect(X, Y, 12, 12)
    }
    // Libra, scales wobbling while it can't choose
    const wob = t > 9.8 && t < 14.6 ? 0.22 * Math.sin(t * 7.5) : t < 0.8 ? 0.1 * Math.sin(t * 20) : 0
    const lMood = t < 0.3 ? 'happy' : t < 2.4 ? 'wide' : t < 7.5 ? 'happy' : t < 12.3 ? 'squint' : t < 16.4 ? 'neutral' : t < 21.8 ? 'sparkle' : 'happy'
    K.sign(x, t, 'libra', { x: 330, y: 1240, s: 310, mood: lMood, rot: wob, look: t > 7.6 && t < 16.3 ? [1, -1] : [0.8, -0.5], sweat: t > 9.8 && t < 14.6 })
    // Saturn
    const sMood = t < 2.4 ? 'angry' : t < 7.5 ? 'sly' : t < 12.3 ? 'neutral' : t < 16.4 ? 'neutral' : 'happy'
    K.arriving(x, t, { mood: sMood, look: [-0.8, 0.6] })
    K.intern(x, t, { x: 940, y: 1590, s: 190, pop: K.pop01(t, 1.6, 0.4), tears: t > 16.9 ? 3 : 2, mood: t > 16.9 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) {
    // the chat: six months of "sometime"
    const pk = K.inOut(t, PH[0], PH[1])
    K.phone(x, t, {
      X: 560, Y: 1000, w: 520, h: 760, pop: pk, rot: 0.03, title: 'chat', time: '9:41', size: 28,
      bubbles: [
        { side: 'L', from: 'MARCH', text: 'we should get coffee sometime!', at: 3.0 },
        { side: 'R', text: 'yes!! sometime!', at: 3.4, color: '#e0c0ff' },
        { side: 'L', from: 'JUNE', text: 'omg we NEED to hang out sometime', at: 3.8 },
        { side: 'R', text: 'sometime soon!!', at: 4.2, color: '#e0c0ff' },
      ],
    })
    // the news ticker
    const tk = K.inOut(t, TICK[0], TICK[1])
    if (tk > 0.01) {
      x.save(); x.globalAlpha *= clamp(tk)
      K.rect(x, 0, 1790, 1080, 70, '#c8243a'); K.rect(x, 0, 1790, 190, 70, K.INK); K.txt(x, 'BREAKING', 95, 1826, { size: 28, color: '#fff' })
      x.save(); x.beginPath(); x.rect(190, 1790, 890, 70); x.clip()
      const s = 'LOCAL "SOMETIME" STILL NOT SCHEDULED  ·  SIX MONTHS AND COUNTING  ·  '
      const off = (t - TICK[0]) * 260
      for (let k = 0; k < 3; k++) K.txt(x, s, 1080 - off + k * 1500, 1826, { size: 30, align: 'left', color: '#fff' })
      x.restore(); x.restore()
    }
    // the calendar
    const ck = K.inOut(t, CAL[0], CAL[1])
    if (ck > 0.01) {
      x.save(); x.translate(540, 800); x.scale(ck * 0.92, ck * 0.92)
      K.box(x, -460, -170, 920, 340, '#fffaf0', { o: 8 })
      K.rect(x, -460, -170, 920, 70, '#c8243a'); K.txt(x, 'THIS WEEK', 0, -134, { size: 34, color: '#fff' })
      const hover = t < 9.8 ? -1 : t < 14.6 ? (Math.floor((t - 9.8) / 0.45) % 2 ? 3 : 1) : 3
      DAYS.forEach((d, i) => {
        const X = -400 + i * 133, picked = t > 14.6 && i === 3
        if (i === hover) K.rrect(x, X - 58, -84, 116, 230, 16, picked ? '#7dffb0' : 'rgba(242,199,92,0.45)')
        K.txt(x, d, X, -54, { size: 26, color: K.INK })
        K.txt(x, String(8 + i), X, 10, { size: 50, color: K.INK })
        if (picked) { const s = K.pop01(t, 14.6, 0.3, 2.6); x.save(); x.translate(X, 100); x.rotate(-0.1); x.scale(s, s); K.box(x, -56, -24, 112, 48, '#c8243a', { o: 4 }); K.txt(x, '7 PM', 0, 2, { size: 26, color: '#fff' }); x.restore() }
      })
      x.restore()
    }
  },
  cues: [
    ['boom', 0.08, 0.07], ...[0.12, 0.2, 0.3, 0.42].map(t => ['tick', t, 0.04]),
    ...[3.0, 3.4, 3.8, 4.2].map((t, i) => ['pop', t, [783.99, 987.77, 783.99, 987.77][i], 0.04, 0]),
    ['bell', 4.45, 1244.51, 0.035, 0.8, 0], ['whoosh', 7.6, 0.3, 0.04], ['pop', 7.75, 622.25, 0.05, 0],
    ...Array.from({ length: 11 }, (_, k) => ['tick', 9.8 + k * 0.45, 0.03]),
    ['boom', 14.62, 0.05], ['pop', 14.68, 1244.51, 0.05, 0], ['glitter', 16.5, 17.8], ['glitter', 17.0, 18.4], ['bell', 22.0, 1244.51, 0.04, 1.0, 0],
  ],
  music: { style: 'cinematic', key: 'Eb', seed: 7107, sections: { lift: [16.4] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
