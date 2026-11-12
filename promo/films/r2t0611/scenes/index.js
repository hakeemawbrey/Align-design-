// r2t0611: star_talk, BELIKE, "Zodiacs when you | peek *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · C).
// Ending: callback.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one "someone looked at my screen" reaction per sign (3.8 s each):
//              ♈ read it out loud for you · ♉ phone face down, under a sandwich · ♊ three group chats told
//              · ♋ it was just photos of mom · ♌ brightness up, it's their own profile · ♍ privacy screen, mid-glance
//              · ♎ showed you anyway: "rate my match?" · ♏ one peek, a 40-digit passcode · ♐ nothing to hide, 4,000 photos
//              · ♑ that's a viewing fee · ♒ nothing secret, just 80 tabs on aliens · ♓ you saw the puppy video, now you both cry
//  49.2        "Eyes on your | *own screen.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Scorpio still | *can't unlock it.*"  Scorpio and the phone: WRONG PASSCODE.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, RED, CREAM, STEEL, NIGHT, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff'
const R = { x: -170 }

/** a phone showing a grid of tiny photos that scrolls */
function photoPhone(x, t, cx, cy, k, scroll, cols) {
  if (k <= 0.01) return
  phone(x, t, cx, cy, k, { head: 'PHOTOS', headCol: GOLD })
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.beginPath(); x.rect(-104, -100, 208, 262); x.clip()
  for (let j = 0; j < 12; j++) for (let i = 0; i < 3; i++) {
    const y = -96 + j * 70 - (scroll % 70) - Math.floor(scroll / 70) * 0
    x.fillStyle = cols[(i + j * 2 + Math.floor(scroll / 70)) % cols.length]; x.fillRect(-100 + i * 68, y, 62, 62)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'You peeked? | *Read it out loud.*', mood: 'sparkle', look: [1, 0], star: R, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      phone(x, t, 800, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'NOTES', headCol: '#ff6b5a', lines: [['dear diary…', BONE, 1, false], ['today i…', BONE, 1, false]] })
      bubble(x, 760, 620, 'AND THEN | I SAID…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 44, col: '#ff6b5a', tail: 'bl' })
      L(x, 800, 1150, 'VOLUME: MAXIMUM', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Phone face down. | *Under a sandwich.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const drop = ease.outBounce ? ease.outBounce(prog(lt, 0.7, 1.1)) : ease.outCubic(prog(lt, 0.7, 1.1))
      phone(x, t, 800, 1000, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '', rot: 1.57 })
      if (lt > 0.7) bits(x, 'SANDWICH', 800, lerp(600, 960, drop), 24)
      L(x, 800, 660, 'SCREEN: PROTECTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'You looked once. | *Three group chats know.*', mood: lt => lt > 1.0 ? 'wink' : 'wide', look: [1, 0], star: R,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'GROUP CHAT', headCol: GOLD, lines: [['they PEEKED', '#ffd23a', pop01(t, P.t0 + 0.5, 0.25, 2), true], ['no WAY', BONE, pop01(t, P.t0 + 1.0, 0.25, 2), false], ['details??', MINT, pop01(t, P.t0 + 1.4, 0.25, 2), false]] })
      L(x, 800, 1150, `CHATS TOLD: ${Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.5) / 0.4))}`, pop01(t, P.t0 + 0.5, 0.3, 2), PINK, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'The big secret? | *Photos of mom.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: R, hops: [1.3],
    front(x, t, lt, P) {
      photoPhone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), lt * 60, ['#ffb0c8', '#ffd6a8', '#c9a6ff', '#ffe7a8'])
      L(x, 800, 1150, 'ALBUM: MOM (2,431)', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, 0.04, 30)
      hearts(x, t, 800, 700, P.t0 + 1.4, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Turned the brightness up. | *It’s their profile.*', mood: 'sparkle', look: [1, 0], star: R, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), b = ease.outCubic(prog(lt, 0.6, 1.2))
      if (b > 0.01) { x.save(); x.globalAlpha = 0.35 * b; x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(800, 880, 260, 0, Math.PI * 2); x.fill(); x.restore() }
      phone(x, t, 800, 880, k, { head: '♌︎ MY PROFILE', headCol: GOLD, lines: [['★ ★ ★ ★ ★', GOLD, 1, false], ['icon. legend.', BONE, 1, false]] })
      L(x, 800, 620, `BRIGHTNESS: ${Math.round(lerp(40, 100, b))}%`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, -0.04, 34)
      sparkles(x, t, 800, 880, P.t0 + 1.3, 8, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Privacy screen installed. | *Mid-glance.*', mood: 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), s = ease.inOutCubic(prog(lt, 0.6, 1.2))
      phone(x, t, 800, 880, k, { head: 'INBOX', headCol: MINT, lines: [['re: re: re:', BONE, 1, false], ['spreadsheet v9', BONE, 1, false]] })
      if (s > 0) { x.save(); x.translate(800, 880); x.rotate(0.05); x.fillStyle = 'rgba(10,8,24,0.92)'; x.fillRect(-112, -170, 224, 340 * s); x.restore() }
      L(x, 800, 1150, 'VIEWING ANGLE: 0°', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Showed you anyway. | *“Rate my match?”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      phone(x, t, 800, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'NEW MATCH', headCol: PINK, lines: [['♎︎ + ♊︎', PINK, 1, false], ['say hi?', BONE, 1, false]] })
      bubble(x, 780, 630, 'cute or | too cute?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 1050, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'One peek. | *New 40-digit passcode.*', mood: 'squint', look: [1, 0], star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(Math.max(0, lt - 0.3) / 0.1))
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'NEW PASSCODE', headCol: '#c97bff' })
      x.save(); x.translate(800, 880); x.rotate(0.05)
      for (let i = 0; i < n; i++) { x.fillStyle = BONE; x.fillRect(-90 + (i % 4) * 50, -60 + Math.floor(i / 4) * 60, 30, 30) }
      x.restore()
      L(x, 800, 1150, `DIGITS: ${Math.min(40, n * 4)}`, pop01(t, P.t0 + 0.4, 0.3, 2), '#c97bff', 0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Nothing to hide. | *Here’s 4,000 photos.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      photoPhone(x, t, 300, 880, pop01(t, P.t0 + 0.15, 0.3, 2), lt * 240, ['#ff9a4a', '#7dd18a', '#8fe3ff', '#ffd23a', '#c97bff'])
      L(x, 300, 640, `PHOTO ${Math.min(4000, Math.round(1 + lt * lt * 700))} OF 4,000`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 28)
      bubble(x, 310, 1150, 'oh this is | a good one', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'You looked? | That’s a *viewing fee.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 360, head: 'INVOICE', headBg: '#9aa5c4', headInk: INK, lines: ['1 peek', '$5.00', '', 'due: now'], size: 34, progress: prog(lt, 0.4, 1.2) })
      L(x, 800, 1150, 'PAYMENT: EXPECTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Nothing secret. | *Just 80 tabs on aliens.*', mood: 'sparkle', look: [1, -1], star: R, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'TABS: 80', headCol: MINT, lines: [['are ufos shy?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2), false], ['aliens: signs?', BONE, pop01(t, P.t0 + 0.8, 0.25, 2), false], ['me, an alien?', MINT, pop01(t, P.t0 + 1.1, 0.25, 2), false]] })
      bubble(x, 780, 620, 'want to | read along?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'You saw the puppy video. | *Now you both cry.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, t, 820, 760, 0.8 * pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'HE’S HOME!', headCol: PINK, lines: [['good boy ♥', PINK, 1, false]] })
      friend(x, t, 'gemini', 820, 1060, 190, pop01(t, P.t0 + 0.9, 0.35, 2), { mood: 'wide', look: [-1, 0], tears: 2 })
      hearts(x, t, 560, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0611', key: 'C', accent: ACC, ending: 'callback',
  title: 'Zodiacs when you | peek *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Eyes on your | *own screen.*' },
  last: {
    text: 'Scorpio still | *can’t unlock it.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 380, 1150, 240 * k, { mood: lt > 1.6 ? 'wide' : 'squint', look: [1, 0], seed: 14, hops: [t - lt + 1.6], glyph: false })
      phone(x, t, 700, 1100, 0.8 * pop01(t, t - lt + 0.6, 0.35, 2), { head: 'LOCKED', headCol: '#c97bff' })
      const n = Math.min(12, 1 + Math.floor(Math.max(0, lt - 1.0) / 0.35))
      label(x, 700, 1360, `WRONG PASSCODE ×${n}`, pop01(t, t - lt + 1.0, 0.3, 2.2), { size: 32, bg: '#ff6b5a', rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
