// v3a061: ADVICE ROLL CALL, "Each sign's | green flag." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, one warm green flag each (a little green flag waves on every card). Ending: callback.
//   0.0–3.6    "Each sign’s | *green flag.*"
//   3.6–49.2   ♈ defends you in the group chat · ♉ shows up every time (attendance: all ticks) · ♊ asks follow-up
//              questions (#7) · ♋ "home safe?" · ♌ runs your fan club (member #1) · ♍ checked the menu for your allergy
//              · ♎ hands you the remote · ♏ your secrets, in a vault · ♐ two tickets: ADMIT 2
//              · ♑ date night, booked and circled · ♒ loves your weird side · ♓ sobs at your good news
//  49.2        "Twelve signs. | *All green.*"
//  52.6        callback: "Taurus? | *Already there.*" the attendance sheet comes back and keeps ticking.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, phone, checklist, calendar, bits, greenFlag, confetti, ORANGE, RED, TEAL, CREAM, GREEN, NAVY, GREY, clamp, prog, ease } from './props.js'

const flag = (x, t, P) => greenFlag(x, t, 900, 610, pop01(t, P.t0 + 0.9, 0.35, 2.2))

// an attendance sheet: a grid of days, ticked one by one
function attendance(x, cx, cy, k, n, { cols = 5, rows = 3, title = 'TAURUS: SHOWED UP' } = {}) {
  if (k <= 0.01) return
  const w = cols * 64 + 40, h = rows * 64 + 100
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = MINT; x.fillRect(-w / 2, -h / 2, w, 56)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 29)
  for (let i = 0; i < cols * rows; i++) {
    const c = i % cols, r = Math.floor(i / cols), px = -w / 2 + 20 + c * 64, py = -h / 2 + 76 + r * 64
    x.fillStyle = '#d8d0c0'; x.fillRect(px, py, 56, 56)
    if (i < n) { x.fillStyle = TEAL; x.fillRect(px + 10, py + 26, 10, 10); x.fillRect(px + 18, py + 34, 10, 10); x.fillRect(px + 26, py + 26, 10, 10); x.fillRect(px + 34, py + 18, 10, 10); x.fillRect(px + 42, py + 10, 10, 10) }
  }
  x.restore()
}
// a little steel vault door
function vault(x, t, cx, cy, k, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 320, 320)
  x.fillStyle = INK; x.fillRect(-168, -168, 336, 336)
  x.fillStyle = GREY; x.fillRect(-160, -160, 320, 320)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  x.rotate(spin)
  x.fillStyle = INK; for (let i = 0; i < 3; i++) { x.save(); x.rotate(i * Math.PI / 3); x.fillRect(-90, -9, 180, 18); x.restore() }
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 30, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Defends you | *in the group chat.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { time: 'CHAT', head: 'ARIES:', body: ['hey. that’s', 'MY friend.'], bodyBg: '#ff9a8a', size: 32 })
      label(x, 790, 1100, 'ARIES HAS ENTERED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      flag(x, t, P)
    } },
  { sign: 'taurus', cap: 'Shows up. | *Every single time.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', star: { x: -190 },
    front(x, t, lt, P) {
      attendance(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), Math.floor(clamp((lt - 0.5) / 1.3) * 15))
      label(x, 790, 1080, 'MISSED: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      flag(x, t, P)
    } },
  { sign: 'gemini', cap: 'Asks | *follow-up questions.*', mood: lt => lt > 0.8 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      const Q = ['wait, then what?', 'and how did that feel?', 'no WAY. go on.']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.55))
      bubble(x, 760, 700, Q[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 880, `FOLLOW-UP #${n + 5}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      flag(x, t, P)
    } },
  { sign: 'cancer', cap: 'Checks you | *got home safe.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { time: '11:58', head: 'CANCER:', body: ['home safe?', 'text me!!'], bodyBg: SKYB, size: 34, foot: lt > 1.3 ? 'you: home ✓' : '' })
      hearts(x, t, 470, 820, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 2 })
      flag(x, t, P)
    } },
  { sign: 'leo', cap: 'Runs your | *fan club.*', mood: 'sparkle', star: { x: -190 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 220, title: '✦ YOUR FAN CLUB ✦', titleBg: ORANGE, lines: ['PRESIDENT:', 'LEO'], size: 44, rot: -0.04 })
      label(x, 790, 1050, 'MEMBERS: 1 (LOUD)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      confetti(x, t, P.t0 + 1.0, 790, 700, { spread: 360 })
      flag(x, t, P)
    } },
  { sign: 'virgo', cap: 'Remembers | *your allergies.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 790, 830, k, { w: 300, h: 330, title: 'MENU', titleBg: MINT, lines: ['soup', 'pasta', 'nut cake', 'salad'], size: 36, rot: 0.04 })
      if (lt > 0.9 && k > 0.9) { x.save(); x.translate(790, 830); x.rotate(0.04); x.fillStyle = RED; x.fillRect(-90, 46 + 6, 180, 8); x.restore() }
      label(x, 790, 1060, 'CHECKED FOR YOU ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      flag(x, t, P)
    } },
  { sign: 'libra', cap: 'Lets *you* | pick the movie.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 820, 1000, 180 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0], seed: 17, glyph: false })
      note(x, 600, 900 - ease.outCubic(prog(lt, 0.4, 1.2)) * 60, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 120, h: 190, bg: NAVY, ink: BONE, lines: ['▶'], size: 50, rot: -0.3 })
      bubble(x, 760, 660, 'your call!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      flag(x, t, P)
    } },
  { sign: 'scorpio', cap: 'Your secrets? | *Locked forever.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      vault(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.4)) * Math.PI * 2)
      label(x, 790, 1060, 'YOUR SECRETS: SAFE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      flag(x, t, P)
    } },
  { sign: 'sagittarius', cap: 'Brings you | *on the adventure.*', mood: 'sparkle', star: { x: -190 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'TICKET', 760, 790, 18 * k, { rot: -0.12 })
      bits(x, 'TICKET', 820, 880, 18 * k, { rot: 0.08 })
      label(x, 790, 1040, 'ADMIT: 2', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 460, 610, 'you’re coming!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      flag(x, t, P)
    } },
  { sign: 'capricorn', cap: 'Plans the date. | *Circles it twice.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      calendar(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { month: 'FRIDAY', big: '7', note: 'DATE NIGHT ♥', noteCol: PINK })
      const c = ease.outCubic(prog(lt, 1.0, 1.7))
      if (c > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; for (const [r, o] of [[105, 0], [118, 0.3]]) { x.beginPath(); x.ellipse(790, 840, r, r * 1.1, 0, o, o + c * Math.PI * 2); x.stroke() } x.restore() }
      flag(x, t, P)
    } },
  { sign: 'aquarius', cap: 'Loves | *your weird side.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'SOCK', 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 * Math.sin(t * 5) })
      bubble(x, 700, 660, 'sock puppet show? | YES.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1060, 'WEIRD: WELCOME', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      flag(x, t, P)
    } },
  { sign: 'pisces', cap: 'Cries | *at your good news.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: lt => lt > 1.0 ? 3 : 2, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 200, title: 'YOU:', titleBg: MINT, lines: ['I got', 'the job!'], size: 42, rot: 0.05 })
      label(x, 800, 1050, 'PISCES: SOBBING (HAPPY)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 800, P.t0 + 1.2, { n: 5, life: 1.8, spread: 140, cell: 7, seed: 5 })
      flag(x, t, P)
    } },
]

const F = makeFilm({
  id: 'v3a061', key: 'D', accent: '#5fe08a', ending: 'callback',
  title: 'Each sign’s | *green flag.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *All green.*' },
  last: {
    text: 'Taurus? | *Already there.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1270, 260 * k, { mood: lt > 2 ? 'heart' : 'happy', seed: 31, hops: [t - lt + 1.0, t - lt + 2.4] })
      attendance(x, 540, 870, k, 15 + Math.floor(clamp((lt - 0.9) / 1.5) * 9), { cols: 6, rows: 4, title: 'STILL SHOWING UP' })
      greenFlag(x, t, 800, 1180, pop01(t, t - lt + 1.6, 0.35, 2.2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
