// kpure01 · Planet Talk: Uranus · "Aries, Try Waiting Five Seconds" (24 s vertical, hard cut) · chiptune · E · star_talk
//   0      Uranus mid-roll across the gym like a bowling ball, Aries's dumbbells "went flying"; "ARIES. | Plot twist *incoming.*"
//   0.45   glitch (pattern break) · 0.45 Uranus lands, Aries shocked
//   2.8    the premise: one date, and Aries is already typing "so are we dating or what" · "One date. *Already* typing."
//   5.4    ♅ "What if you did the *unexpected*… and asked a *question?*" · 9.4 ♈ "A question? *Me?*"
//   10.2   the draft is slashed; Aries types "what did you think of tonight?" · 12.9 sent
//   13.2   the PATIENCE HUD: 1… 2… 3… 4… 5 SECONDS (Aries sweating, vibrating)
//   18.4   notification: "honestly? best night in ages" · Aries leaps · 19.0 Pisces pops up sobbing happy
//   22.8   "Five seconds. | *Personal best.*" · hard cut at 24
import { urFilm, HK, r3 } from '../urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const DRAFT1 = 'so are we dating or what', DRAFT2 = 'what did you think of tonight?'
const SENT = 12.9, HUD = 13.2, NOTE = 18.4, PIS = 19.0, LAST = 22.8
const NOTIF = { at: NOTE, out: [21.6, 21.9], title: 'MESSAGES', body: 'honestly? *best night in ages*', glyph: '♥', y: 380 }

function gym(x, t, K) {
  K.drawSpace(x, t, { planet: 'uranus', seed: 3, stars: 0.5 })
  // the gym wall + floor
  const g = x.createLinearGradient(0, 300, 0, 1400); g.addColorStop(0, '#22163f'); g.addColorStop(1, '#3a2350')
  x.fillStyle = g; x.fillRect(0, 300, 1080, 1100)
  for (let i = 0; i < 6; i++) K.rect(x, 60 + i * 180, 360, 10, 1000, 'rgba(255,255,255,0.04)')
  // the mirror strip + a rack
  K.box(x, 640, 430, 380, 520, '#2f3e66', { o: 8 }); K.rect(x, 660, 450, 60, 480, 'rgba(255,255,255,0.10)')
  K.box(x, 80, 1080, 420, 30, '#5a4a6a'); for (let i = 0; i < 4; i++) K.box(x, 110 + i * 100, 1040, 40, 40, '#e5573b')
  const f = x.createLinearGradient(0, 1400, 0, 1920); f.addColorStop(0, '#4a2a3a'); f.addColorStop(1, '#1a0c20')
  x.fillStyle = f; x.fillRect(0, 1400, 1080, 520); K.rect(x, 0, 1394, 1080, 12, K.INK)
  K.label(x, 'LEG DAY', 830, 990, { size: 26, bg: '#e5573b', ink: '#fff', rot: 0.05 })
}

const F = urFilm({
  id: 'kpure01', sign: 'aries', dur: 24, ending: 'cut',
  hook: { text: 'ARIES. | Plot twist *incoming.*', top: 230 },
  entry: { roll: true, from: 'left', at: -0.3, x: 540, y: 760 },
  debris: [
    { label: '10', w: 150, h: 70, color: '#e5573b', ink: '#fff', x: 380, y: 1150, vx: -620, vy: -1300, spin: 7, t0: -0.5 },
    { label: '10', w: 150, h: 70, color: '#e5573b', ink: '#fff', x: 700, y: 1180, vx: 700, vy: -1400, spin: -6, t0: -0.45 },
    { label: 'H2O', w: 70, h: 120, color: '#7fe3ff', x: 560, y: 1300, vx: 200, vy: -1700, spin: 9, t0: -0.35 },
  ],
  bg: gym,
  paint(x, t, K) {
    const U = K.track(t, [[0, { x: 540, y: 760, size: 437 }], [3.0, { x: 300, y: 640, size: 360 }], [LAST - 0.6, { x: 300, y: 640, size: 360 }], [LAST, { x: 560, y: 900, size: 400 }]])
    const ur = t < 5.4 ? 'wide' : t < NOTE ? 'sly' : 'happy'
    K.uranus(x, t, { ...U, mood: t < 1.2 ? 'happy' : ur, look: t < 2.8 ? [0, 1] : [1, 0.3], hops: [0.6, NOTE + 0.3] })
    const A = K.track(t, [[0, { x: 540, y: 1430, s: 320 }], [3.0, { x: 300, y: 1440, s: 290 }], [LAST - 0.6, { x: 300, y: 1440, s: 290 }], [LAST, { x: 380, y: 1460, s: 300 }]])
    const waiting = t >= HUD && t < NOTE
    const vib = waiting ? Math.sin(t * 70) * (4 + 6 * prog(t, HUD, NOTE)) : 0
    const mood = t < 2.8 ? 'wide' : t < 9.4 ? 'squint' : t < 11.2 ? 'wide' : waiting ? 'squint' : t >= NOTE ? 'heart' : 'neutral'
    K.sign(x, t, 'aries', { x: A.x + vib, y: A.y, s: A.s, mood, look: t < 2.8 ? [0, -1] : [1, -0.4], hops: [0.5, 3.1, NOTE + 0.1, NOTE + 0.5, NOTE + 0.9], sweat: waiting, shadow: true })
    // Pisces, sobbing happy behind the bench
    const pk = K.pop01(t, PIS, 0.4)
    if (pk > 0) K.pisces(x, t, { x: 880, y: 1640, s: 250, pop: pk, hops: [PIS + 0.8, PIS + 1.6] })
  },
  over(x, t, K) {
    // the phone
    const pk = K.pop01(t, 2.85, 0.35) * K.outK(t, [19.0, 19.3])
    if (pk <= 0.01) return
    const typed = (s, a, cps = 22) => s.slice(0, Math.max(0, Math.floor((t - a) * cps)))
    const slash = prog(t, 9.6, 9.95)
    K.phone(x, t, {
      X: 755, Y: 1060, w: 460, h: 720, rot: 0.05, pop: pk, title: '♈︎ → the date', time: '23:12', size: 30,
      bubbles: [{ side: 'L', text: 'had fun tonight :)', at: 2.95 }, ...(t >= SENT ? [{ side: 'R', text: DRAFT2, at: SENT }] : [])],
      screen(c, tt, w, h) {
        if (t >= SENT) return
        // the draft box at the bottom of the screen
        const y = h / 2 - 150
        K.rrect(c, -w / 2 + 20, y, w - 40, 110, 22, '#2c2450', '#ff8fb1', 3)
        const s = t < 10.2 ? typed(DRAFT1, 3.2) : typed(DRAFT2, 10.4)
        const cur = Math.floor(t * 3) % 2 ? '|' : ''
        c.save(); c.font = `700 27px ${K.MONO}`; c.fillStyle = '#efe6d6'; c.textBaseline = 'middle'
        const rows = s.length > 18 ? [s.slice(0, s.lastIndexOf(' ', 18) + 1 || 18), s.slice(s.lastIndexOf(' ', 18) + 1 || 18)] : [s]
        rows.forEach((r, i) => c.fillText(r + (i === rows.length - 1 ? cur : ''), -w / 2 + 40, y + 36 + i * 36))
        c.restore()
        if (t < 10.2 && slash > 0) { c.save(); c.strokeStyle = K.RED; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(-w / 2 + 30, y + 80); c.lineTo(-w / 2 + 30 + (w - 60) * slash, y + 25); c.stroke(); c.restore() }
      },
    })
    // the PATIENCE HUD
    const hk = K.win(t, HUD, NOTE - 0.1)
    if (hk > 0.01) {
      const sec = clamp(Math.floor(t - HUD) + 1, 1, 5)
      x.save(); x.translate(540, 300); x.scale(hk, hk)
      K.box(x, -400, -95, 800, 190, 'rgba(10,6,30,0.95)', { o: 7 })
      K.txt(x, 'PATIENCE', -370, -50, { size: 34, align: 'left', color: '#7dffb0' })
      K.txt(x, `${sec} SECOND${sec > 1 ? 'S' : ''}`, 370, -50, { size: 34, align: 'right', color: K.GOLD })
      for (let i = 0; i < 5; i++) {
        const on = i < sec, bump = on && i === sec - 1 ? 1 + 0.25 * Math.exp(-((t - HUD) % 1) * 8) : 1
        x.save(); x.translate(-300 + i * 150, 30); x.scale(bump, bump)
        K.box(x, -60, -30, 120, 60, on ? (sec === 5 ? K.GOLD : '#7dffb0') : '#2c2450', { o: 4 })
        x.restore()
      }
      x.restore()
    }
  },
  lines: [
    { t0: 3.1, t1: 5.1, who: 'aries', text: 'ONE date. Time to *lock it in.*', x: 380, y: 1760, tailUp: true, tail: -120 },
    { t0: 5.4, t1: 9.2, who: 'uranus', text: 'What if you did the *unexpected*… and asked a *question?*', x: 540, y: 290, tail: -200, maxW: 820 },
    { t0: 9.4, t1: 11.3, who: 'aries', text: 'A question? *Me?*', x: 360, y: 1760, tailUp: true, tail: -80 },
    { t0: 11.5, t1: 13.0, who: 'uranus', text: 'Send it. Then *wait.*', x: 540, y: 290, tail: -200 },
    { t0: PIS + 0.2, t1: 22.4, who: 'pisces', text: 'they had a *GOOD TIME!!*', x: 640, y: 1250, tail: 180 },
  ],
  heads: [
    { at: 2.95, text: 'One date. | *Already* typing.', out: [5.1, 5.35], top: 230, size: 92 },
    { at: LAST, text: 'Five seconds. | *Personal best.*', top: 250, size: 104 },
  ],
  fx: [
    { f: HK.notification, c: HK.notificationCues, o: NOTIF },
    { f: HK.screenShake, c: HK.shakeCues, o: { at: NOTE + 0.05, len: 0.45, amp: 18 } },
  ],
  cues: [
    ['whoosh', 9.58, 0.2, 0.04], ['tick', 9.7, 0.06],
    ['pop', SENT, 1046.5, 0.05, 0.2], ['whoosh', SENT - 0.05, 0.25, 0.04],
    ...[0, 1, 2, 3, 4].map(i => ['chip', r3(HUD + i), r3(523.25 * Math.pow(2, i / 6)), 0.12, { gain: 0.04 }]),
    ['glitter', PIS, PIS + 1.2],
  ],
  music: { style: 'chiptune', key: 'E', seed: 8101, sections: { drop: 0.45, breakdown: [HUD], lift: [NOTE] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
