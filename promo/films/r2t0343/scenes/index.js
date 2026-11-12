// r2t0343: star_talk, BELIKE, "Zodiacs called the | wrong sign be like." (~56 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme reaction to someone guessing their sign wrong.
//   0.0–3.6    "Zodiacs called the | wrong sign *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ corrected you at full volume · ♉ too offended to argue, took a nap · ♊ half right, the other half is mad
//              · ♋ went home to tell their mom · ♌ framed proof: "LEO, OBVIOUSLY" · ♍ sent you a forty-page PDF with sources
//              · ♎ agreed to be a Taurus now · ♏ smiled, said "noted." · ♐ guessed yours back: potato
//              · ♑ booked a meeting to discuss it · ♒ started a podcast about it · ♓ you guessed RIGHT: sobbed, felt seen
//  49.2        "Rule one: | *never guess.*"  The twelve fly up into a group photo.
//  52.6        callback: "Virgo sent | *the second edition.*" (the PDF, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', PAPER = '#fff4e2'

// ── props
const PILLOW = [
  '.WWWWWWWWWWWW.',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
]
const PILLOW_C = { W: '#c9c2e6' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSHHSHHK',
  'KSHHHHHK',
  'KSSHHHSK',
  'KSSSHSSK',
  'KSSSSSSK',
  'KSGSSRSK',
  'KSSSSSSK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', H: '#ff4f86', G: '#5fd068', R: '#e23d4e' }
const MIC = [
  '.GGGG.',
  'GGWGGG',
  'GGGGGG',
  'GGGGGG',
  '.GGGG.',
  '..KK..',
  '..KK..',
  '..KK..',
  '.KKKK.',
]
const MIC_C = { G: '#9aa5c4', W: '#ffffff', K: '#4a4470' }

/** a card with ink border and drop shadow; fn draws inside (origin at the card's centre) */
function card(x, cx, cy, w, h, k, rot, bg, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
/** the PDF: a stack of pages with a title and a page count */
function pdf(x, cx, cy, k, title, pages) {
  card(x, cx + 16, cy + 16, 280, 360, k, 0.08, '#e8dcc6', () => {})
  card(x, cx, cy, 280, 360, k, 0.03, PAPER, () => {
    x.fillStyle = RED; x.fillRect(-140, -180, 280, 56); txt(x, 'PDF', 0, -152, 30, '#fff', MONO, 700)
    txt(x, title, 0, -84, 26, INK, MONO, 700)
    x.fillStyle = '#c9c2e6'; for (let i = 0; i < 5; i++) x.fillRect(-110, -40 + i * 34, i === 4 ? 120 : 220, 10)
    txt(x, pages, 0, 150, 26, '#6b62a8', MONO, 700)
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Corrected you | *at full volume.*', mood: 'squint', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'you think | i’m a libra?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
      bubble(x, 780, 920, 'ARIES!!', pop01(t, P.t0 + 0.9, 0.25, 2.6) * (1 + 0.04 * Math.sin(t * 30)), { size: 84, col: '#ff8f7a', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Too offended to argue. | *Took a nap.*', mood: lt => lt > 1.0 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      drawBits(x, PILLOW, PILLOW_C, 400, 1060, 22 * pop01(t, P.t0 + 0.7, 0.3, 2))
    },
    front(x, t, lt, P, F) {
      bubble(x, 780, 700, 'a gemini?? | wow.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      if (lt > 1.1) for (let i = 0; i < 3; i++) { const ph = ((lt - 1.1) * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); txt(x, 'z', 560 + ph * 80 + i * 20, 800 - ph * 140, 40 + i * 10, BONE); x.restore() }
      label(x, 790, 1010, 'DO NOT DISTURB', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'You were half right. | *The other half’s mad.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'fair.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 56, col: MINT, tail: 'bl' })
      bubble(x, 820, 920, 'RUDE.', pop01(t, P.t0 + 1.1, 0.25, 2.6), { size: 64, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Went home | *to tell their mom.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 800, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 + 0.04 * Math.sin(t * 20) * (lt > 0.6 ? 1 : 0) })
      label(x, 800, 650, 'CALLING MOM ♥', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: SKYB, rot: -0.05 })
      bubble(x, 790, 1130, 'they said VIRGO.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Framed the proof. | *Hung it up.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 300, pop01(t, P.t0 + 0.3, 0.35, 2), -0.03, GOLD, () => {
        x.fillStyle = PAPER; x.fillRect(-140, -120, 280, 240)
        txt(x, 'OFFICIAL', 0, -70, 28, '#8a4a2e', MONO, 700)
        txt(x, 'LEO,', 0, 0, 54, INK)
        txt(x, 'OBVIOUSLY.', 0, 60, 40, '#e23d4e')
      })
      sparkles(x, t, 790, 860, P.t0 + 0.8, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Sent a forty-page PDF. | *With sources.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pdf(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'WHY I’M A VIRGO', `PAGE ${Math.min(40, Math.max(1, Math.floor(lt * 20)))}/40`)
      label(x, 790, 640, 'SOURCES: 12', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Agreed to be | *a Taurus now.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'taurus, right?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      bubble(x, 780, 920, 'sure! | i can be that!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Smiled politely. | *Said “noted.”*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'noted.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 72, col: LAV, tail: 'bl' })
      label(x, 790, 960, 'MEMORY: PERMANENT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#c97bff', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Guessed yours back. | *Way worse.*', mood: 'sparkle', look: [-1, 0], star: { x: 150 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      bubble(x, 330, 760, 'you’re giving… | potato.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, col: BONE, tail: 'br' })
      label(x, 330, 980, 'NOT A SIGN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.06 })
    } },
  { sign: 'capricorn', cap: 'Booked a meeting | *to discuss it.*', mood: lt => lt > 1.2 ? 'neutral' : 'squint', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      card(x, 320, 860, 340, 260, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, PAPER, () => {
        x.fillStyle = '#2fc79a'; x.fillRect(-170, -130, 340, 56); txt(x, 'INVITE', 0, -102, 30, INK, MONO, 700)
        txt(x, 'RE: MY SIGN', 0, -30, 34, INK)
        txt(x, 'MON · 9:00', 0, 20, 30, '#6b62a8', MONO, 700)
        txt(x, 'AGENDA: 4 ITEMS', 0, 70, 24, '#6b62a8', MONO, 700)
      })
      label(x, 320, 1080, 'ATTENDANCE: REQUIRED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Not offended. | *Started a podcast.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 800, 960, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 660, 'EP. 1: I’M AN AQUARIUS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04 })
      label(x, 860, 1150, '● REC', pop01(t, P.t0 + 1.3, 0.3, 2) * (Math.floor(t * 2) % 2 ? 1 : 0.85), { size: 30, bg: RED, color: PAPER, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You guessed right. | *Sobbing.* Felt seen.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'pisces?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 52, col: BONE, tail: 'br' })
      label(x, 790, 940, 'YOU GET ME', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: PINK, rot: -0.05 })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0343', key: 'G', accent: LAV, ending: 'callback',
  title: 'Zodiacs called the | wrong sign *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Rule one: | *never guess.*' },
  last: {
    text: 'Virgo sent | *the second edition.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1150, 280 * k, { mood: lt > 1.5 ? 'happy' : 'squint', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      pdf(x, 700, 1120, pop01(t, t - lt + 0.7, 0.35, 2), 'VOL. 2', 'PAGE 1/86')
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
