// kdwe01 · Don't Watch This If You're a ___ · "Scorpio's Unbothered Timer" (16 s vertical, loop) · screwed · Fm
//   0      Scorpio slapping the lens, eyes narrowed; "SCORPIO. | Scroll. *Now.*"  · 0.48 record scratch + freeze · whip out
//   1.3    Scorpio at its desk, the phone pops: CRUSH "hey, what are you up to?" · "Mysterious? *Rehearsed.*"
//   2.3    the reply is typed in a blink ("nothing much, you?") · 3.6 Scorpio sets a timer on it: SEND IN 2:00:00
//   5.4    close: Scorpio staring at the timer · loading bar "acting unbothered… 99%"
//   8.9    CRUSH "no rush btw :)" → the bar hits ERROR, Scorpio's eyes go heart, SEND NOW
//   9.5    ♏ "…okay. the timer was *for me.*" · 11.4 Pisces drops in, sobbing: "you *LIKE* them!!"
//   13.0   "Unbothered. With a *timer* on." · 15.55 Scorpio spots the lens again and lunges → frame 0 (loop)
import { dwFilm, tag } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const SC = tag('scorpio'), PI = tag('pisces')
const PHONE = [1.45, 10.7]
const TIMER = 3.6, NORUSH = 8.9, SEND = 9.25
const F = dwFilm({
  id: 'kdwe01', sign: 'scorpio', dur: 16, ending: 'loop',
  hook: 'SCORPIO.|Scroll. *Now.*', hookOut: 1.3, scratch: 'you were *warned.*',
  lens: { mood: 'squint', look: [0, 0] }, pull: { x: 300, y: 1250, s: 380 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 5.4, cam: [1.3, 420, 1120] },
    { at: 11.2, cam: [1, 540, 1000] },
  ],
  punch: [{ at: 3.6, dur: 1.4, z: 0.18, x: 520, y: 1000 }],
  shakes: [NORUSH + 0.35],
  flashes: [SEND],
  heads: [
    { text: 'Mysterious? *Rehearsed.*', at: 1.3, out: [5.1, 5.35], top: 240 },
    { text: 'Typed in a blink.|*Sending* in two hours.', at: 3.75, out: [5.1, 5.35], top: 380, size: 64 },
    { text: 'Unbothered.|With a *timer* on.', at: 13.0, out: [15.25, 15.5], top: 250 },
  ],
  boxes: [
    { open: 9.4, close: 11.2, lines: [{ t: 9.55, speaker: SC, text: '…okay. the timer was *for me.*', color: '#ff6fa8' }] },
    { open: 11.6, close: 13.0, lines: [{ t: 11.75, speaker: PI, text: 'you *LIKE* them!!', color: '#9fd7ff' }] },
  ],
  pitch: { [SC]: 523.25, [PI]: 1046.5 },
  paint(x, t, K) {
    K.room(x, t, { wall: '#2b1640', wall2: '#170c2a', floor: '#3b1f3c', frame: '#6a2a5a' })
    // desk + lamp
    K.box(x, 60, 1330, 960, 40, '#5b3a4a'); K.rect(x, 110, 1370, 30, 420, '#2a1a2a'); K.rect(x, 940, 1370, 30, 420, '#2a1a2a')
    K.box(x, 820, 1150, 30, 180, '#4a3550'); K.box(x, 760, 1110, 150, 60, '#c94a7a')
    // the sign itself (once it is off the lens)
    const sendJolt = prog(t, SEND, SEND + 0.25)
    if (!K.hide) {
      const mood = t < TIMER ? 'squint' : t < NORUSH ? (t < 6.6 ? 'neutral' : 'squint') : t < SEND + 0.3 ? 'wide' : t < 11.2 ? 'heart' : 'happy'
      const lunge = ease.inCubic(prog(t, 15.4, 15.55))
      K.star(x, t, 'scorpio', { x: 300, y: 1250 - 40 * Math.sin(Math.PI * sendJolt), s: 380, mood, look: t < 11.2 ? [1, 0.3] : [0.3, -0.6], squash: -0.08 * lunge, seed: 9 })
    }
    if (t > 11.2) {
      const k = K.pop01(t, 11.3, 0.4)
      K.pisces(x, t, { x: 800, y: 1250, s: 300, pop: k, look: [-1, -0.3], mood: t < 12.4 ? 'wide' : 'sparkle', tears: 3 })
    }
  },
  over(x, t, K) {
    // the phone (screen space)
    const k = K.pop01(t, PHONE[0], 0.35) * K.outK(t, [PHONE[1] - 0.3, PHONE[1]])
    if (k <= 0.01) return
    const typed = 'nothing much, you?'.slice(0, Math.floor(clamp((t - 2.3) / 0.35) * 18))
    const sent = t > SEND
    const bubbles = [
      { side: 'L', text: 'hey, what are you up to?', at: 1.7, from: 'CRUSH ♡' },
      ...(t > 2.3 ? [{ side: 'R', text: sent ? 'nothing much, you?' : typed + (t < 2.65 ? '|' : ''), color: sent ? K.PINK : '#3a2f5a', ink: sent ? K.INK : K.BONE }] : []),
      ...(t > NORUSH ? [{ side: 'L', text: 'no rush btw :)', at: NORUSH, from: 'CRUSH ♡' }] : []),
    ]
    K.phone(x, t, {
      X: 740, Y: 1000, w: 460, h: 720, pop: k, rot: 0.05, title: 'CRUSH ♡', time: '9:41', bubbles, size: 30,
      screen: (c, tt, w, h) => {
        // the timer panel at the bottom of the screen
        const tk = K.pop01(tt, TIMER, 0.3) * (sent ? K.outK(tt, [SEND, SEND + 0.2]) : 1)
        if (tk <= 0.01) return
        c.save(); c.translate(0, h / 2 - 150); c.scale(tk, tk)
        K.rrect(c, -w / 2 + 24, -90, w - 48, 180, 24, '#2b0f22', K.RED, 4)
        const left = 7200 - Math.max(0, (Math.min(tt, NORUSH) - TIMER)) * 1
        const hh = Math.floor(left / 3600), mm = Math.floor(left % 3600 / 60), ss = Math.floor(left % 60)
        K.txt(c, 'SEND IN', 0, -52, { size: 24, color: '#ffb3c6' })
        K.txt(c, `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 0, 0, { size: 60, color: '#fff' })
        const now = tt > NORUSH + 0.1
        K.rrect(c, -110, 40, 220, 40, 20, now ? K.RED : '#4a2a3a'); K.txt(c, now ? 'SEND NOW ▶' : 'SCHEDULED', 0, 61, { size: 20, color: '#fff' })
        c.restore()
      },
    })
    K.loading(x, t, { at: 6.0, out: 9.3, label: 'acting unbothered…', pct: tt => tt < NORUSH ? 0.2 + 0.79 * ease.outCubic(prog(tt, 6.1, 8.4)) : 1, Y: 1500, err: 'ERROR' })
    K.caught(x, t, { X: 740, Y: 1260, r: 150, at: TIMER + 0.5, out: 5.3 })
  },
  cues: [
    ['pop', 1.72, 880, 0.05, 0.2], ['tick', 1.74, 0.05],
    ...[2.32, 2.4, 2.46, 2.53, 2.6].map(t => ['tick', t, 0.035]),
    ['bell', 3.62, 1318.51, 0.04, 0.6, 0.2], ['pop', 3.7, 659.25, 0.04, 0],
    ...[6.2, 6.7, 7.2, 7.7, 8.2].map(t => ['tick', t, 0.03]),
    ['pop', 8.92, 987.77, 0.05, 0.2], ['pop', 9.0, 1318.51, 0.04, 0],
    ['whoosh', 9.2, 0.25, 0.06], ['bell', 9.28, 1567.98, 0.05, 1.2, 0],
    ['pop', 11.32, 783.99, 0.05, -0.3], ['glitter', 11.4, 12.6],
  ],
  music: { style: 'screwed', key: 'Fm', seed: 4101, sections: { drop: 0.98, lift: [9.25] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
