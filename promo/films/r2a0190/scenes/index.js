// r2a0190: star_advice, ADVICE ROLL CALL, "Reconnecting with | an old friend…" (topic: "How each sign | can reconnect
// with an old friend.", reworded to fit two lines; the name tab on each card names the sign) (~54 s vertical, signs3kit
// social cut, music: lofi · G). Twelve signs in zodiac order, one warm line each with a light gag. Ending: group.
//   0.0–3.6    "Reconnecting with | *an old friend…*"
//   3.6–49.2   ♈ just text first (sent!) · ♉ suggest your old spot (two milkshakes) · ♊ send the thing that's so them
//              (a duck picture) · ♋ bring up a sweet memory (an old photo) · ♌ celebrate the wins you missed (late
//              congrats) · ♍ make an actual plan (a circled date) · ♎ lead with "I missed you" · ♏ say the real thing
//              (two puzzle pieces) · ♐ start mid-story like no time passed · ♑ a voice note, not a formal email
//              · ♒ share your newest weird obsession (rock #212) · ♓ tell them what they meant to you
//  49.2        "It’s been ages. | *Feels like yesterday.*"  The twelve pose; two bubbles: "hey you!" / "HEY YOU!!"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, phone, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#7dffb0', L = { x: -160 }, R = { x: 160 }
const SHAKE = ['...R.....', '...R.....', '..R......', 'WWWWWWW..', 'PPPPPPP..', '.PPPPP...', '.PPPPP...', '..PPP....', '...G.....', '..GGG....']
const DUCK = ['...YYY.....', '..YYKYY....', '..YYYYYOO..', '...YYY.....', '.YYYYYYYY..', 'YYYYYYYYYY.', '.YYYYYYYY..']
const PZ_A = ['AAAAAA..', 'AAAAAA..', 'AAAAAAAA', 'AAAAAAAA', 'AAAAAA..', 'AAAAAA..']
const PZ_B = ['..BBBBBB', '..BBBBBB', 'BBBBBBBB', 'BBBBBBBB', '..BBBBBB', '..BBBBBB']
const ROCK = ['..GGGG..', '.GgGGGG.', 'GGGGgGGG', 'GgGGGGGG', '.GGGGgG.', '..GGGG..']
const HAT = ['...Y...', '..PYP..', '..PPP..', '.PYPPP.', '.PPPYP.', 'PPYPPPP']

function friend(x, t, P, id, cx, cy, at, s = 200, mood = 'happy', look = [-1, 0]) {
  const k = pop01(t, P.t0 + at, 0.4, 2)
  if (k > 0.01) return signChar(x, t, id, cx, cy, s * k, { mood, look, seed: 13, glyph: false, hops: [P.t0 + at + 0.6] })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Just text first. | *Like, right now.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 }, () => {
        txt(x, 'OLD FRIEND', 0, -130, { size: 22, font: MONO, weight: 700, color: GOLD })
        const k = pop01(lt, 0.5, 0.25, 2)
        if (k > 0.01) { x.save(); x.translate(10, -40); x.scale(k, k); x.fillStyle = ORANGE; x.fillRect(-90, -34, 180, 68); txt(x, 'hey!! it’s', 0, -12, { size: 24 }); txt(x, 'been ages', 0, 16, { size: 24 }); x.restore() }
        if (lt > 1.1) txt(x, 'SENT ✓', 50, 20, { size: 20, font: MONO, weight: 700, color: MINT })
      })
      label(x, 790, 1130, 'NO OVERTHINKING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Suggest the old spot. | *Same order.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SHAKE, { R: RED, W: CREAM, P: PINK, G: GREY }, 720, 920, 20 * k)
      drawBits(x, SHAKE, { R: RED, W: CREAM, P: '#c98f4a', G: GREY }, 880, 920, 20 * pop01(t, P.t0 + 0.5, 0.35, 2), { sx: -1 })
      label(x, 790, 1130, 'BOOTH 4, ALWAYS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Send the thing | *that’s so them.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 280, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: SKYB, rot: 0.04 }, () => drawBits(x, DUCK, { Y: GOLD, K: INK, O: ORANGE }, 0, 10, 18))
      label(x, 790, 1080, 'THIS IS YOU', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 640, 'HAHAHA!!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Bring up a memory. | *They kept it too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 870, 290, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.05 }, () => {
        x.fillStyle = '#2a2350'; x.fillRect(-125, -150, 250, 230)
        signChar(x, t, 'cancer', -50, -30, 110, { mood: 'happy', seed: 51, glyph: false, glow: 0.4 })
        signChar(x, t, 'leo', 55, -30, 110, { mood: 'wink', seed: 52, glyph: false, glow: 0.4 })
        txt(x, 'summer ’14', 0, 120, { size: 30, color: '#6b62a8' })
      })
      hearts(x, t, 790, 700, P.t0 + 1.4, { n: 4, life: 1.4, spread: 180, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Celebrate the wins | *you missed.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.9, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const F2 = friend(x, t, P, 'virgo', 810, 990, 0.3, 200, lt > 1.2 ? 'heart' : 'wide')
      if (F2 && lt > 0.7) drawBits(x, HAT, { Y: GOLD, P: PINK }, 810, F2.top - 40, 12)
      label(x, 790, 680, 'CONGRATS (LATE)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 810, 900, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Make an actual plan. | *Date. Time. Place.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 870, 320, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = RED; x.fillRect(-160, -160, 320, 56); txt(x, 'SATURDAY', 0, -132, { size: 28, font: MONO, weight: 700, color: CREAM })
        txt(x, '11:00', 0, -40, { size: 54 })
        txt(x, 'the old café', 0, 40, { size: 30, color: '#6b62a8' })
        const c = clamp((lt - 0.8) / 0.5)
        if (c > 0) { x.strokeStyle = GREEN; x.lineWidth = 8; x.beginPath(); x.ellipse(0, -40, 110, 50, 0, -Math.PI / 2, -Math.PI / 2 + c * Math.PI * 2); x.stroke() }
      })
      label(x, 790, 1120, 'LOCKED IN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Skip the awkward. | *Say “I missed you.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 820, 'I missed you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: PINK, tail: 'bl' })
      bubble(x, 800, 1020, 'me too!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: CREAM, tail: 'br' })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Say the real thing. | *They’ll meet you there.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const j = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, PZ_A, { A: '#c97bff' }, lerp(640, 755, j), 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, PZ_B, { B: MINT }, lerp(940, 835, j), 900, 20 * pop01(t, P.t0 + 0.35, 0.35, 2))
      if (j > 0.95) sparkles(x, t, 795, 900, P.t0 + 1.25, 7, 160, 0.3)
      label(x, 790, 1110, 'FITS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Start mid-story. | *Like no time passed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [-1, 0], star: R, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 330, 680, '…so the goose?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: CREAM, tail: 'br' })
      friend(x, t, P, 'gemini', 320, 990, 0.7, 200, lt > 1.2 ? 'sparkle' : 'wide', [1, 0])
      label(x, 330, 1130, 'STILL FUNNY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Send a voice note. | *Not a formal email.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 320, 860, 320, 140, k, { bg: MINT, rot: -0.03 }, () => {
        x.fillStyle = INK; x.beginPath(); x.moveTo(-130, -26); x.lineTo(-96, 0); x.lineTo(-130, 26); x.fill()
        for (let i = 0; i < 12; i++) { const h = 14 + Math.abs(Math.sin(i * 1.7 + t * 6)) * 40; x.fillRect(-70 + i * 17, -h / 2, 10, h) }
      })
      label(x, 320, 1070, 'NO “DEAR SIR”', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Share your newest | *weird obsession.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, ROCK, { G: GREY, g: '#c4cde4' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 })
      label(x, 790, 1100, 'ROCK #212', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 680, 'his name is Kevin', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: CREAM, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Tell them | *what they meant to you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: lt => lt < 1.3 ? 3 : 2, look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'you got me', 0, -40, { size: 34, color: '#6b62a8' })
        txt(x, 'through it ♥', 0, 20, { size: 34, color: '#6b62a8' })
      })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0190', key: 'G', accent: ACC, ending: 'group',
  title: 'Reconnecting with | *an old friend…*',
  cameos: CAMEOS,
  group: {
    cap: 'It’s been ages. | *Feels like yesterday.*',
    draw(x, t, lt) {
      bubble(x, 380, 640, 'hey you!', pop01(t, t - lt + 1.4, 0.25, 2.2), { size: 44, col: CREAM, tail: 'bl' })
      bubble(x, 720, 720, 'HEY YOU!!', pop01(t, t - lt + 2.0, 0.25, 2.2), { size: 48, col: MINT, tail: 'br' })
      hearts(x, t, 540, 860, t - lt + 2.4, { n: 4, life: 1.2, spread: 160, cell: 6, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
