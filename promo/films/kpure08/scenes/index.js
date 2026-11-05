// kpure08 · Planet Talk: Uranus · "Scorpio, No More Tests" (29 s vertical, hard cut) · screwed · Fm · star_advice
//   0      Uranus phasing through Scorpio's dark wall, static flicker lighting Scorpio's face; "SCORPIO. | Stop testing. *Just ask.*"
//   0.45   glitch · 2.7 "The slow-reply *test.*" a text lands; Scorpio sets a timer: WAIT 2:00:00 (on purpose)
//   5.6    ♏ "If they *chase*, they care." · 8.0 ♅ "Unexpected for you? *Ask straight.*" · 10.8 "Trust is *built*, not caught."
//   13.4   Scorpio types: "I really like talking to you. Do you feel the same?" · 16.6 sent
//   16.8   the long beat: typing… (silence) · 19.8 "yes. I was scared to say it"
//   22.8   Pisces in the doorway, sobbing: "*both* scared! *both* brave!" · 25.6 ♅ "See? *Simple.*"
//   27.6   "No test. | *Just the answer.*" · hard cut at 29
import { urFilm, HK, r3 } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 29, TEST = 2.7, TYPE = 13.4, SENT = 16.6, DOTS = 16.9, REPLY = 19.8, PIS = 22.8, LAST = 27.6
const MSG = 'I really like talking to you. Do you feel the same?'
const fl = t => t < 2.4 ? (Math.sin(t * 37) > 0.2 ? 1 : 0.35) : 1

function room(x, t, K) {
  x.fillStyle = '#0a0714'; x.fillRect(0, 0, 1080, 1920)
  // brick wall
  for (let j = 0; j < 20; j++) for (let i = -1; i < 8; i++) { const X = i * 160 + (j % 2) * 80, Y = j * 72; K.rect(x, X + 4, Y + 4, 152, 64, j % 3 ? '#1e1430' : '#22163a') }
  // the cold static light from where Uranus came through
  const a = 0.35 * fl(t)
  const g = x.createRadialGradient(560, 760, 40, 560, 760, 900); g.addColorStop(0, `rgba(143,230,232,${a})`); g.addColorStop(1, 'rgba(143,230,232,0)')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // the scorched-out hole outline in the wall (a ring of loose bricks)
  if (t < TEST + 0.4) { x.save(); x.globalAlpha = 1 - prog(t, TEST, TEST + 0.4); x.strokeStyle = '#8fe6e8'; x.lineWidth = 8; x.setLineDash([30, 18]); x.beginPath(); x.arc(560, 780, 260, 0, Math.PI * 2); x.stroke(); x.restore() }
  // desk
  K.box(x, -20, 1560, 1120, 400, '#2a1a30', { o: 8 })
}

const F = urFilm({
  id: 'kpure08', sign: 'scorpio', dur: D, ending: 'cut',
  hook: { text: 'SCORPIO. | Stop testing. | *Just ask.*', top: 210, size: 100 },
  entry: { kind: 'burst', at: -0.4, x: 560, y: 860, size: 400 },
  brk: { at: 0.45, len: 0.5 },
  debris: [
    { w: 150, h: 60, color: '#2a1d44', x: 420, y: 700, vx: -700, vy: -900, spin: 4, t0: -0.25 },
    { w: 150, h: 60, color: '#2a1d44', x: 700, y: 720, vx: 650, vy: -800, spin: -5, t0: -0.25 },
    { w: 150, h: 60, color: '#22163a', x: 560, y: 600, vx: 100, vy: -1300, spin: 3, t0: -0.25 },
  ],
  bg: room,
  paint(x, t, K) {
    const U = K.track(t, [[0, { x: 560, y: 860, size: 400 }], [TEST + 0.5, { x: 300, y: 720, size: 310 }]])
    K.uranus(x, t, { ...U, mood: t < TEST ? 'sly' : t < 8 ? 'wide' : t < REPLY ? 'neutral' : 'love', look: t < TEST ? [0, 1] : [0.8, 0.8], hops: [REPLY + 0.2] })
    const waiting = t > DOTS && t < REPLY
    const S = K.track(t, [[0, { x: 420, y: 1440, s: 330 }], [TEST + 0.5, { x: 300, y: 1450, s: 300 }]])
    const mood = t < TEST ? 'wide' : t < 8 ? 'squint' : t < TYPE ? 'wide' : waiting ? 'squint' : t >= REPLY ? 'heart' : 'neutral'
    x.save(); x.globalAlpha = t < 2.4 ? lerp(0.55, 1, fl(t)) : 1
    K.sign(x, t, 'scorpio', { ...S, mood, look: t < TEST ? [0.4, -1] : [1, -0.3], hops: [REPLY + 0.1, REPLY + 0.5], sweat: waiting, blush: t > REPLY ? 0.9 : undefined, shadow: true })
    x.restore()
    const pk = K.pop01(t, PIS, 0.4)
    if (pk > 0) K.pisces(x, t, { x: 880, y: 1720, s: 230, pop: pk, hops: [PIS + 0.8, PIS + 1.6] })
  },
  over(x, t, K) {
    const pk = K.pop01(t, TEST, 0.35)
    if (pk <= 0.01) return
    const typed = MSG.slice(0, Math.max(0, Math.floor((t - TYPE - 0.2) * 24)))
    K.phone(x, t, {
      X: 720, Y: 1060, w: 470, h: 780, rot: 0.04, pop: pk, title: 'them', time: '21:08', size: 28,
      bubbles: [
        { side: 'L', text: 'hey! how was your day?', at: 2.9 },
        ...(t >= SENT ? [{ side: 'R', text: MSG, at: SENT }] : []),
        ...(t >= REPLY ? [{ side: 'L', text: 'yes. I was scared to say it', at: REPLY, color: '#9fe6b0' }] : []),
      ],
      screen(c, tt, w, h) {
        // the WAIT timer, then the draft, then the typing dots
        if (t < TYPE) {
          const k = K.win(t, 3.4, 12.9)
          if (k > 0.01) { c.save(); c.translate(0, h / 2 - 140); c.scale(k, k); K.box(c, -180, -50, 360, 100, '#3a1020', { o: 4 }); const left = 7200 - Math.floor(Math.max(0, t - 3.6) * 1); const hh = Math.floor(left / 3600), mm = Math.floor(left / 60) % 60, ss = left % 60; K.txt(c, `WAIT ${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 0, 2, { size: 34, color: '#ff8fb1' }); c.restore() }
        } else if (t < SENT) {
          const y = h / 2 - 190
          K.rrect(c, -w / 2 + 20, y, w - 40, 150, 22, '#2c2450', '#ff8fb1', 3)
          const words = typed.split(' '); const rows = ['']; for (const wd of words) { if ((rows[rows.length - 1] + ' ' + wd).length > 20) rows.push(wd); else rows[rows.length - 1] = (rows[rows.length - 1] + ' ' + wd).trim() }
          rows.slice(-3).forEach((r, i, a) => K.txt(c, r + (i === a.length - 1 && Math.floor(t * 3) % 2 ? '|' : ''), -w / 2 + 40, y + 34 + i * 40, { size: 26, align: 'left' }))
        }
        if (t > DOTS && t < REPLY) {
          const y = h / 2 - 120
          K.rrect(c, -w / 2 + 24, y, 130, 60, 26, '#efe6d6')
          for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 7 - i * 0.8)); c.fillStyle = '#7a6a9a'; c.beginPath(); c.arc(-w / 2 + 60 + i * 30, y + 30 - b * 8, 9, 0, Math.PI * 2); c.fill() }
        }
      },
    })
  },
  lines: [
    { t0: 5.6, t1: 7.8, who: 'scorpio', text: 'If they *chase*, they care.', x: 380, y: 1800, tailUp: true, tail: -80 },
    { t0: 8.0, t1: 10.6, who: 'uranus', text: 'Unexpected for you? *Ask straight.*', x: 560, y: 340, tail: -220, maxW: 760 },
    { t0: 10.8, t1: 13.2, who: 'uranus', text: 'Trust is *built*, not caught.', x: 560, y: 340, tail: -220 },
    { t0: PIS + 0.2, t1: 25.4, who: 'pisces', text: '*both* scared! *both* brave!', x: 620, y: 1480, tail: 220 },
    { t0: 25.6, t1: 27.3, who: 'uranus', text: 'See? *Simple.*', x: 560, y: 340, tail: -220 },
  ],
  heads: [
    { at: TEST, text: 'The slow-reply | *test.*', out: [5.3, 5.55], top: 240, size: 100 },
    { at: LAST, text: 'No test. | *Just the answer.*', top: 250, size: 104 },
  ],
  cues: [
    ['tick', 3.6, 0.06], ['pop', 3.62, 330, 0.05, 0],
    ...Array.from({ length: 12 }, (_, i) => ['tick', r3(TYPE + 0.3 + i * 0.22), 0.025]),
    ['whoosh', SENT - 0.05, 0.25, 0.05], ['pop', SENT, 1046.5, 0.05, 0.2],
    ['pop', REPLY, 1318.51, 0.06, 0], ['bell', REPLY + 0.05, 659.25, 0.05, 2.4, 0], ['glitter', REPLY, REPLY + 1], ['glitter', PIS, PIS + 1],
  ],
  music: { style: 'screwed', key: 'Fm', seed: 8108, sections: { drop: 0.45, breakdown: [DOTS], lift: [REPLY] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
