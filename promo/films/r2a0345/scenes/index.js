// r2a0345: star_advice, ADVICE ROLLCALL, "Each sign's | next chapter." (~56 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific next chapter for each, each with one light visual gag.
//   0.0–3.6    "Each sign’s | *next chapter.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ starting something and finishing it (100%) · ♉ a garden that's finally yours · ♊ one big idea, fully explored
//              · ♋ friends who feel like family · ♌ a spotlight you don't have to chase · ♍ good enough, and at peace with it
//              · ♎ your own opinion, out loud ("i'd like the pasta.") · ♏ letting someone in, just a little (a door ajar)
//              · ♐ an adventure you get to keep (a snow globe) · ♑ success with weekends off · ♒ your strange idea takes off
//              · ♓ happy tears, way more of them
//  49.2        "Turn the page. | *It’s a good one.*"  The twelve fly up into a group photo.
//  52.6        callback: "Libra ordered. | *No group vote.*" (the pasta, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', PAPER = '#fff4e2'

// ── props
const SPROUT = [
  '.L.......L.',
  'LLL.....LLL',
  '.LLL...LLL.',
  '...LL.LL...',
  '....LLL....',
  '.....L.....',
  '.....L.....',
  '.....L.....',
  '..TTTTTTT..',
  '...TTTTT...',
  '...TTTTT...',
]
const SPROUT_C = { L: '#5fd068', T: '#c9744a' }
const BULB = [
  '...YYYYY...',
  '..YYWYYYY..',
  '.YYWYYYYYY.',
  '.YYYYYYYYY.',
  '.YYYYYYYYY.',
  '..YYYYYYY..',
  '...YYYYY...',
  '....GGG....',
  '....GGG....',
  '.....G.....',
]
const BULB_C = { Y: GOLD, W: '#fff8d0', G: '#9aa5c4' }
const DOOR = [
  'FFFFFFFFFF',
  'FDDDDDDLLF',
  'FDDDDDDLLF',
  'FDDDDDDLLF',
  'FDDDDDYLLF',
  'FDDDDDDLLF',
  'FDDDDDDLLF',
  'FDDDDDDLLF',
  'FDDDDDDLLF',
  'FFFFFFFFFF',
]
const DOOR_C = { F: '#4a4470', D: WOOD, Y: GOLD, L: '#fff1a8' }
const GLOBE = [
  '...WWWWW...',
  '..WSSSSSW..',
  '.WSSWSSSSW.',
  'WSSSSSWSSSW',
  'WSWSSGSSSSW',
  'WSSSGGGSWSW',
  '.WSGGGGGSW.',
  '..WWWWWWW..',
  '.BBBBBBBBB.',
  'BBBBBBBBBBB',
]
const GLOBE_C = { W: '#c9e9ff', S: '#6fc3ff', G: '#5fd068', B: WOOD }
const ROCKET = [
  '.....R.....',
  '....RWR....',
  '...RWWWR...',
  '...WWWWW...',
  '...WSSWW...',
  '...WSSWW...',
  '...WWWWW...',
  '..RWWWWWR..',
  '.RR.WWW.RR.',
  '....OYO....',
  '.....O.....',
]
const ROCKET_C = { R: RED, W: PAPER, S: SKYB, O: '#ffb34a', Y: GOLD }
const RAINBOW = [
  '...RRRRRRR...',
  '.RROOOOOOORR.',
  'ROOYYYYYYYOOR',
  'ROYYGGGGGYYOR',
  'OYYGG...GGYYO',
  'OYG.......GYO',
]
const RAINBOW_C = { R: RED, O: '#ffb34a', Y: GOLD, G: '#5fd068' }

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

const CAMEOS = [
  { sign: 'aries', cap: 'Starting something. | *And finishing it.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const p = Math.min(100, Math.floor(ease.inOutQuad(prog(lt, 0.3, 1.6)) * 100))
      card(x, 800, 880, 320, 170, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, '#2a2350', () => {
        txt(x, 'THE PROJECT', 0, -44, 30, BONE, MONO, 700)
        x.fillStyle = INK; x.fillRect(-130, -4, 260, 44); x.fillStyle = p >= 100 ? MINT : '#ff6b5a'; x.fillRect(-126, 0, 252 * p / 100, 36)
      })
      label(x, 800, 1080, p >= 100 ? 'DONE ✓' : `${p}%`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: p >= 100 ? MINT : GOLD, rot: 0.05, font: MONO, weight: 700 })
      if (p >= 100) sparkles(x, t, 800, 880, P.t0 + 1.6 * 1.29, 7, 190, 0.3)
    } },
  { sign: 'taurus', cap: 'A garden | *that’s finally yours.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.3, 1.3))
      drawBits(x, SPROUT, SPROUT_C, 800, 1000 - 60 * g, 24 * Math.max(0.35, g) * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1150, 'MINE ♥', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'One big idea. | *Fully explored.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const on = lt > 0.9
      if (on) { x.save(); x.globalAlpha = 0.25; x.fillStyle = GOLD; x.beginPath(); x.arc(800, 800, 170 + 10 * Math.sin(t * 4), 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, BULB, on ? BULB_C : { ...BULB_C, Y: '#9aa5c4', W: '#c9c2e6' }, 800, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1120, 'CHAPTERS: 12', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Friends who feel | *like family.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const C = ['#ff6b5a', '#5fd068', '#ffd23a', '#c97bff']
      C.forEach((c, i) => drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: c }, 665 + i * 90, 900 + (i % 2 ? -30 : 0), 16 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.2)))
      label(x, 800, 1090, 'CHOSEN FAMILY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'A spotlight you | *don’t have to chase.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: { x: -120 },
    back(x, t, lt, P) {
      const a = ease.outCubic(prog(lt, 0.6, 1.1))
      if (a > 0) { x.save(); x.globalAlpha = 0.35 * a; x.fillStyle = '#fff1a8'; x.beginPath(); x.moveTo(380, 470); x.lineTo(460, 470); x.lineTo(620, 1180); x.lineTo(220, 1180); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 820, 760, 'oh! for me?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      sparkles(x, t, 420, 860, P.t0 + 1.1, 7, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Good enough. | *At peace with it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 880, 300, 330, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, PAPER, () => {
        for (let i = 0; i < 4; i++) {
          x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(-110, -120 + i * 70, 40, 40)
          if (i < 3) txt(x, '✓', -90, -98 + i * 70, 40, '#2fc79a')
          x.fillStyle = '#c9c2e6'; x.fillRect(-50, -106 + i * 70, 150, 12)
        }
      })
      label(x, 800, 1110, '3 OF 4: LOVELY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Your own opinion. | *Out loud.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'what do | you want?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      bubble(x, 790, 940, 'the pasta. | definitely.', pop01(t, P.t0 + 1.0, 0.25, 2.6), { size: 50, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Letting someone in. | *Just a little.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const o = ease.outCubic(prog(lt, 0.6, 1.3))
      drawBits(x, DOOR, { ...DOOR_C, L: o > 0.2 ? '#fff1a8' : WOOD }, 800, 900, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (o > 0.2) { x.save(); x.globalAlpha = 0.3 * o; x.fillStyle = '#fff1a8'; x.beginPath(); x.moveTo(860, 760); x.lineTo(920, 760); x.lineTo(980, 1150); x.lineTo(820, 1150); x.closePath(); x.fill(); x.restore() }
      label(x, 800, 680, 'DOOR: 5% OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#c97bff', color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'An adventure | *you get to keep.*', mood: 'sparkle', look: [-1, 0], star: { x: 150 }, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 330, 890, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 3) })
      for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; x.save(); x.globalAlpha = 0.9; x.fillStyle = '#fff'; x.fillRect(260 + i * 26, 790 + ph * 140, 8, 8); x.restore() }
      label(x, 330, 1110, 'SOUVENIR: FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Success. | *With weekends off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      card(x, 320, 860, 320, 260, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, PAPER, () => {
        x.fillStyle = '#2fc79a'; x.fillRect(-160, -130, 320, 56); txt(x, 'THIS WEEKEND', 0, -102, 28, INK, MONO, 700)
        txt(x, 'SAT: OFF', -110, -24, 34, INK, MONO, 700, 'left'); txt(x, 'SUN: OFF', -110, 40, 34, INK, MONO, 700, 'left')
        if (lt > 0.8) txt(x, '✓', 110, -24, 40, '#2fc79a'); if (lt > 1.2) txt(x, '✓', 110, 40, 40, '#2fc79a')
      })
      label(x, 320, 1090, 'STILL WINNING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Your strange idea? | *It takes off.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const up = ease.inQuad(prog(lt, 0.9, 2.2))
      drawBits(x, ROCKET, ROCKET_C, 800, 1000 - 380 * up, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (up > 0) { x.save(); x.globalAlpha = 0.5; x.fillStyle = BONE; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(780 + i * 14, 1000 - 380 * up + 150 + i * 22, 20 + i * 6, 0, Math.PI * 2); x.fill() } x.restore() }
      label(x, 800, 1150, 'EVERYONE: “WHOA.”', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Happy tears. | *Way more of them.*', mood: lt => lt < 0.8 ? 'happy' : 'sparkle', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, RAINBOW, RAINBOW_C, 800, 820, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      hearts(x, t, 800, 960, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 6 })
      label(x, 800, 1090, 'THE GOOD KIND', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0345', key: 'G', accent: GOLD, ending: 'callback',
  title: 'Each sign’s | *next chapter.*',
  cameos: CAMEOS,
  group: { cap: 'Turn the page. | *It’s a good one.*' },
  last: {
    text: 'Libra ordered. | *No group vote.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 400, 1130, 300 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      bubble(x, 720, 960, 'the pasta, | please.', pop01(t, t - lt + 0.8, 0.25, 2.4), { size: 56, col: PINK, tail: 'bl' })
      sparkles(x, t, 720, 960, t - lt + 1.0, 6, 170, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
