// r2t0161: THE SIGNS AS… v3, ROLLCALL, "The signs giving | a presentation." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "The signs giving | *a presentation.*"
//   3.6–49.2   ♈ started before the meeting did · ♉ presented from a beanbag · ♊ rehearsed one topic, presented three
//              · ♋ thanked their mom on slide one · ♌ brought a fog machine to the budget review · ♍ slide 47 of 212
//              · ♎ couldn't pick a font, used all of them · ♏ slide one: everyone's birth chart · ♐ clicked once, told
//              a travel story · ♑ ended at 9:59:59 exactly · ♒ presented as a hologram · ♓ opened with a sunset, cried
//  49.2        "Twelve presentations. | *Zero on topic.*"
//  52.6        callback: "Leo’s fog | *never cleared.*"  fog rolls in over the room, a little Leo glows inside it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, clock, beam, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#8fe3ff'
const ST = { x: -170 }

const BEANBAG = ['....PPPPPP....', '..PPPPPPPPPP..', '.PPPPpPPPPPPP.', 'PPPPPPPPPPpPPP', 'PPpPPPPPPPPPPP', 'PPPPPPPPPPPPPP', '.PPPPPPPPPPPP.']
const CLICKER = ['KK', 'KK', 'RK', 'KK', 'KK', 'KK']

/** a projector screen on a stand; fn draws the slide inside a w×h area centred at (0, 0) */
function screen(x, cx, cy, k, fn, { w = 360, h = 250, rot = 0.03, bg = CREAM } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -h / 2 - 34, w + 44, 22)
  x.fillStyle = GREY; x.fillRect(-w / 2 - 16, -h / 2 - 30, w + 32, 14)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) { x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip(); fn(); x.restore() }
  x.restore()
}
/** a soft grey fog puff cluster */
function fog(x, t, cx, cy, k, { n = 7, spread = 260, r = 90, a = 0.55, seed = 0 } = {}) {
  if (k <= 0.01) return
  x.save()
  for (let i = 0; i < n; i++) {
    const ox = Math.sin(i * 2.3 + seed) * spread + Math.sin(t * 0.9 + i) * 20, oy = Math.cos(i * 1.7 + seed) * spread * 0.35 + Math.sin(t * 1.3 + i * 2) * 10
    x.globalAlpha = a * k; x.fillStyle = i % 2 ? '#d9d4e8' : '#bdb6d4'
    x.beginPath(); x.arc(cx + ox * k, cy + oy, r * (0.7 + 0.3 * k) * (0.8 + 0.25 * Math.sin(i * 3.1)), 0, Math.PI * 2); x.fill()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Started presenting | *before the meeting.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [0.4, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 720, 95, pop01(t, P.t0 + 0.2, 0.3, 2), 8, 41)
      label(x, 790, 880, 'MEETING: 9:00', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'AND SO—', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Presented | *from a beanbag.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170, y: 40 },
    back(x, t, lt, P) { drawBits(x, BEANBAG, { P: '#5fd068', p: '#3fa850' }, 370, 1050, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      screen(x, 790, 760, pop01(t, P.t0 + 0.3, 0.35, 2), () => { txt(x, 'Q3 RESULTS', 0, -60, { size: 40 }); txt(x, '(very cosy)', 0, 20, { size: 34, weight: 700, color: BROWN }) })
      label(x, 790, 1030, 'COMFY MODE: ON', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Rehearsed one topic. | Presented *three others.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const S = ['TAXES', 'OWLS?', 'SOUP!']
      const n = Math.min(2, Math.floor(prog(lt, 0.4, 1.9) * 3))
      screen(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), () => { txt(x, S[n], 0, -10, { size: 56 }); txt(x, `TOPIC ${n + 1} OF ?`, 0, 70, { size: 26, font: MONO, weight: 700, color: RED }) })
      bubble(x, 790, 1050, 'quick tangent!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Slide one: | *thank you, Mom.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: lt => lt > 1.4 ? 1 : 0, star: ST,
    front(x, t, lt, P) {
      screen(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), () => { txt(x, 'THANK YOU', 0, -40, { size: 48, color: RED }); txt(x, 'MOM', 0, 30, { size: 64, color: RED }) }, { bg: '#ffe3ec' })
      hearts(x, t, 560, 1180, P.t0 + 0.9, { n: 6, life: 2.0, spread: 200, cell: 8, seed: 2 })
      label(x, 790, 1040, 'SLIDE 1 OF 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Brought a fog machine. | To *the budget review.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.0],
    back(x, t, lt, P) {
      beam(x, 360, 470, 390, 1160, 220, ease.outCubic(prog(lt, 0.6, 1.0)))
      fog(x, t, 430, 1130, ease.outCubic(prog(lt, 0.2, 1.3)), { n: 8, spread: 190, r: 65, a: 0.6 })
    },
    front(x, t, lt, P) {
      screen(x, 790, 720, pop01(t, P.t0 + 0.2, 0.35, 2), () => { txt(x, 'BUDGET REVIEW', 0, -50, { size: 36 }); for (let i = 0; i < 3; i++) { x.fillStyle = GREY; x.fillRect(-130 + i * 100, 80 - 30 - i * 20, 60, 30 + i * 20) } }, { w: 340, h: 230 })
      label(x, 790, 1010, '✦ PRESENTING: ME ✦', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Slide 47 of 212. | *Appendix next.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      screen(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        txt(x, 'FOOTNOTE 9(b)', 0, -80, { size: 32, font: MONO, weight: 700 })
        for (let i = 0; i < 5; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-150, -36 + i * 26, 300 - (i % 2) * 70, 10) }
      })
      label(x, 790, 1010, `SLIDE ${47 + Math.floor(prog(lt, 0.5, 2.2) * 3)} / 212`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'APPENDIX A–F', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a font. | Used *all of them.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const FONTS = [`800 44px ${INTER}`, `italic 500 48px Georgia, serif`, `700 40px ${MONO}`, `900 42px Impact, ${INTER}`, `italic 700 40px cursive`]
      const n = 1 + Math.floor(prog(lt, 0.3, 1.6) * 5)
      screen(x, 790, 790, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        for (let i = 0; i < Math.min(5, n); i++) { x.font = FONTS[i]; x.fillStyle = [INK, RED, '#6b62a8', GREEN, '#e8a24a'][i]; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Hello', -90 + (i % 2) * 180, -90 + i * 46) }
      }, { w: 360, h: 300 })
      label(x, 790, 1080, 'FONTS: 5', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Slide one: | *everyone’s birth chart.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      screen(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        for (let i = 0; i < 3; i++) chart(x, -110 + i * 110, -10, 46, pop01(t, P.t0 + 0.5 + i * 0.25, 0.3, 2), t, 0.3)
        txt(x, 'MEET YOUR TEAM', 0, 88, { size: 26, font: MONO, weight: 700 })
      }, { bg: DEEP })
      bubble(x, 790, 1050, 'it explains a lot.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Clicked one slide. | Told *a travel story.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P, F) {
      drawBits(x, CLICKER, { K: '#2a2350', R: RED }, F.x + 120, F.cy + 10, 12 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.3 })
      screen(x, 790, 720, pop01(t, P.t0 + 0.3, 0.35, 2), () => { txt(x, 'SLIDE 2', 0, -40, { size: 48 }); txt(x, '(of 30)', 0, 30, { size: 32, weight: 700, color: GREY }) }, { w: 320, h: 220 })
      bubble(x, 790, 990, 'so there I was, | on a mountain…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bl' })
      label(x, 790, 1150, 'MINUTE 34', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ended at 9:59:59. | *Exactly as planned.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const s = Math.min(59, 50 + Math.floor(prog(lt, 0.3, 1.5) * 10))
      card(x, 790, 760, 360, 150, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: INK, rot: -0.02 }, () => txt(x, `9:59:${s}`, 0, 4, { size: 76, font: MONO, weight: 700, color: s === 59 ? MINT : RED }))
      label(x, 780, 950, 'QUESTIONS? NO? GOOD.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.6) sparkles(x, t, 790, 760, P.t0 + 1.6 * 1.29, 6, 180, 0.3)
    } },
  { sign: 'aquarius', cap: 'Presented as | *a hologram.*', hideStar: true, star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.05, 0.45, 1.8), fl = 0.72 + 0.18 * Math.sin(t * 23) + 0.1 * Math.sin(t * 7)
      beam(x, 370, 1180, 370, 760, 170, ease.outCubic(prog(lt, 0.1, 0.5)), { col: MINT, a: 0.25 })
      signChar(x, t, 'aquarius', 370, 880, 300, { mood: lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], pop: k, alpha: fl, seed: 13, hops: [P.t0 + 0.1] })
      x.save(); x.globalAlpha = 0.25; x.fillStyle = MINT; for (let i = 0; i < 14; i++) x.fillRect(220, 720 + i * 24 + (t * 40 % 24), 300, 4); x.restore()
      label(x, 790, 720, 'JOINED FROM: HOME', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'can you see me?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Opened with a sunset. | *Cried* on slide one.', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, 790, 780, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const g = x.createLinearGradient(0, -125, 0, 125); g.addColorStop(0, '#ff8fb1'); g.addColorStop(0.6, '#ffb34a'); g.addColorStop(1, '#6b62a8'); x.fillStyle = g; x.fillRect(-180, -125, 360, 250)
        x.fillStyle = SUN; x.beginPath(); x.arc(0, 50, 60, Math.PI, 0); x.fill()
        x.fillStyle = '#2a2350'; x.fillRect(-180, 50, 360, 80)
      })
      label(x, 790, 1050, 'SLIDE 1: FEELINGS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0161', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs giving | *a presentation.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve presentations. | *Zero on topic.*' },
  last: {
    text: 'Leo’s fog | *never cleared.*',
    draw(x, t, lt) {
      const k = ease.outCubic(clamp(lt / 1.4))
      fog(x, t, 540, 1150, k, { n: 12, spread: 420, r: 110, a: 0.45, seed: 2 })
      const s = pop01(t, t - lt + 0.9, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'leo', 540, 1030, 280 * s, { mood: 'sparkle', seed: 52, hops: [t - lt + 1.6, t - lt + 2.6] })
      fog(x, t + 1.7, 540, 1300, k, { n: 9, spread: 400, r: 80, a: 0.55, seed: 5 })
      label(x, 540, 1440, 'BUDGET: STILL UNCLEAR', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 38, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
