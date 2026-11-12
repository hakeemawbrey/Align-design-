// r2t0340: star_talk, SOLO (scorpio), "Scorpios making | plans *be like.*" (signs3kit social cut, music: lofi · F).
// Ending: lesson (LESSON UNLOCKED, then a last line).
//   agreed to plans, told no one where · answered the group chat with one dot · booked the corner booth · plans cancelled,
//   secretly thrilled · guest list five, trusted two · dress code: all black · movie pick: a three-hour mystery
//   · studied the menu days ahead · you were late once in 2019: noted, fondly
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, phone, clock, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

const ACC = '#ff6b9a'
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'YYYYYYYY', 'YYYKKYYY', 'YYYKKYYY', 'YYYYYYYY']
const LOCK_C = { K: '#9aa5c4', Y: GOLD }

const S = 'scorpio', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Agreed to plans. | *Told no one where.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 820, 320, 200, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04, x => { lines(x, ['LOCATION:'], { size: 34, y: -40, font: MONO, weight: 700 }); lines(x, ['██████'], { size: 46, y: 30 }) })
      drawBits(x, LOCK, LOCK_C, 800, 1030, 16 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      if (lt > 1.5) bubble(x, 420, 640, 'you’ll see.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Group chat asks who’s in. | Scorpio: *“.”*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'GROUP CHAT', headCol: GOLD, rows: [['who’s in??', LAV, pop01(t, P.t0 + 0.4, 0.25, 2)], ['me!!', MINT, pop01(t, P.t0 + 0.7, 0.25, 2)], ['.', ACC, pop01(t, P.t0 + 1.3, 0.25, 2.4), true]] })
      if (lt > 1.7) L(x, 800, 1130, 'THAT MEANS YES', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Booked the corner booth. | *Back to the wall.*', mood: 'squint', look: [1, 0], star: { x: -60, y: -30, s: 260 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.05, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k
      x.fillStyle = INK; x.fillRect(214, 640, 652, 520); x.fillStyle = '#7a2e3a'; x.fillRect(224, 650, 632, 500)
      x.fillStyle = '#9a3e4c'; for (let i = 0; i < 5; i++) x.fillRect(244 + i * 124, 670, 100, 300)
      x.fillStyle = INK; x.fillRect(214, 1000, 652, 30); x.fillStyle = '#c98f5a'; x.fillRect(224, 1004, 632, 20)
      x.restore()
    },
    front(x, t, lt, P) { if (lt > 1.2) L(x, 760, 600, 'SEES ALL EXITS', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 32) } },
  { sign: S, cap: 'Plans got cancelled. | *Secretly thrilled.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 820, 300, 180, pop01(t, P.t0 + 0.2, 0.35, 2), -0.03, x => lines(x, ['so sorry,', 'can’t make it'], { size: 34 }))
      if (lt > 1.1) { L(x, 800, 1040, 'NIGHT IN: UNLOCKED', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, 0.04, 30); sparkles(x, t, 420, 860, P.t0 + 1.2, 8, 190, 0.2) }
    } },
  { sign: S, cap: 'Guest list: five. | *Trusted: two.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 300, 380, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        lines(x, ['GUESTS'], { size: 36, y: -140 })
        ;['Sam', 'Jo', 'Ari', 'Kim', 'Lee'].forEach((n, i) => { x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.fillStyle = INK; x.fillText(n, -60, -70 + i * 52); if (lt > 0.8 + i * 0.2) { x.fillStyle = i === 1 || i === 3 ? '#2f8a4a' : '#9aa5c4'; x.fillText(i === 1 || i === 3 ? '✓' : '?', -110, -70 + i * 52) } })
      })
    } },
  { sign: S, cap: 'Dress code? | *All black. Obviously.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 320, 300, pop01(t, P.t0 + 0.25, 0.35, 2), -0.04, x => {
        lines(x, ['DRESS CODE'], { size: 32, y: -110, font: MONO, weight: 700 })
        for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(-120 + i * 90, -60, 60, 130); x.fillStyle = '#0a0612'; x.fillRect(-114 + i * 90, -54, 48, 118) }
        lines(x, ['black, black, black'], { size: 22, y: 110, font: MONO, weight: 700 })
      })
    } },
  { sign: S, cap: 'Movie pick? | *A three-hour mystery.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 840, 280, 380, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        x.fillStyle = '#140c30'; x.fillRect(-120, -170, 240, 340)
        lines(x, ['WHO', 'DID IT?'], { size: 48, y: -60, color: CREAM })
        lines(x, ['part 4', '3 hr 12 min'], { size: 24, y: 90, font: MONO, weight: 700, color: GOLD })
      }, ACC)
      if (lt > 1.4) bubble(x, 420, 640, 'I know already.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'Studied the menu. | *Days in advance.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const d = 1 + Math.min(3, Math.floor(clamp((lt - 0.4) / 1.2) * 4))
      card(x, 800, 860, 300, 360, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04, x => {
        lines(x, ['MENU'], { size: 40, y: -140 })
        x.fillStyle = '#c9cde0'; for (let i = 0; i < 5; i++) x.fillRect(-110, -80 + i * 46, 220, 12)
        x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.ellipse(0, 4, 130, 30, 0, 0, Math.PI * 2); x.stroke()
      })
      L(x, 800, 1100, `STUDY DAY ${d}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'You were late once. | *Noted. Fondly.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 850, 320, 260, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => { lines(x, ['MAY 2019', '7:12 PM'], { size: 40, y: -40, font: MONO, weight: 700 }); lines(x, ['12 min late'], { size: 28, y: 60, color: RED }) }, '#ffe7a8')
      if (lt > 1.4) { L(x, 800, 1080, 'FORGIVEN. NOT FORGOTTEN.', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 26); hearts(x, t, 800, 760, P.t0 + 1.5, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 3 }) }
    } },
]

const F = makeFilm({
  id: 'r2t0340', key: 'F', accent: ACC, solo: 'scorpio', ending: 'lesson',
  title: 'Scorpios making | plans *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Few plans. | *Deep ones.*', mood: 'squint' },
  lesson: { text: 'Got the invite? | *That’s trust.*', chip: 'TRUST: EARNED' },
  last: {
    text: 'The address? | *Sent at 7:59.*',
    draw(x, t, lt) {
      const t0 = t - lt
      phone(x, 810, 1150, 0.95 * pop01(t, t0 + 0.5, 0.4, 2), { head: 'SCORPIO', headCol: ACC, rot: -0.03, rows: [['7:59 PM', GREY, 1], ['come now.', ACC, pop01(t, t0 + 1.0, 0.25, 2.4)]] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
