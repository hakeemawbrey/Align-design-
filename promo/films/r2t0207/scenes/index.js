// r2t0207: THE SIGNS AS… v3, SOLO, "Scorpios on a trip | be like." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): Scorpio's mystery doesn't take holidays.
//   0.0–3.6    "Scorpios on a trip | *be like.*"
//   3.6–37.8   nine cards (3.8 s each): packed one suitcase, all black · sunglasses indoors at night · beach day in the
//              only shadow · postcard signed "you know who" · the tour guide's secret, already knew · group trip,
//              trusted one person, barely · holiday crush, ran their birth chart first · hot spring for six hours
//              · came home, told nobody where they went
//  37.8        "Mysterious. | *Even on vacation.*"  Scorpio comes back, big.
//  41.0        LESSON UNLOCKED: "Love a Scorpio slowly. | They *let you in.*"  STATUS: TRUSTED
//  46.9        "Next trip? | *You’re invited.*"  two tickets slide in.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, sun, shades, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'scorpio', ACC = '#c97bff'
const ST = { x: -190 }

const CASE = ['....KKKK....', '....K..K....', 'KKKKKKKKKKKK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KGGGGGGGGGGK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KDDDDDDDDDDK', 'KKKKKKKKKKKK', '.WW......WW.']
const CASE_C = { K: '#55507a', D: '#2a2350', G: GOLD, W: '#9aa5c4' }
const SHIRT = ['KK..KK', 'KKKKKK', '.KKKK.', '.KKKK.', '.KKKK.']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const UMB = ['....RRRRR....', '..RRWWRRRWW..', '.RRWWWRRRWWWR', 'RRRRRRRRRRRRR', '......B......', '......B......', '......B......', '......B......', '......B......', '......BB.....']
const UMB_C = { R: '#e23d4e', W: '#fff4e2', B: '#8a4a2e' }
const TICKET = ['GGGGGGGGGGGGGG', 'GWWWWWWWGWWWWG', 'GWKKKKWWGWKKWG', 'GWWWWWWWGWWWWG', 'GWKKKWWWGWKKWG', 'GWWWWWWWGWWWWG', 'GGGGGGGGGGGGGG']
const TICKET_C = { G: GOLD, W: '#fff4e2', K: '#6b62a8' }

/** rising steam wisps over (cx, cy) */
function steam(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.55 * k; x.fillStyle = BONE
  for (let i = 0; i < 9; i++) { const ph = ((t * 0.5 + i / 9) % 1); x.beginPath(); x.arc(cx + Math.sin(i * 2.1) * 140 + Math.sin(ph * 6 + i) * 20, cy - ph * 260, 22 + 26 * ph, 0, Math.PI * 2); x.globalAlpha = 0.45 * k * Math.sin(Math.PI * ph); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Packed one suitcase. | *All black.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 4; i++) { const d = ease.outBack(prog(lt, 0.5 + i * 0.18, 0.8 + i * 0.18)); if (lt > 0.45 + i * 0.18) drawBits(x, SHIRT, { K: '#141020' }, 700 + i * 60, lerp(600, 830 + (i % 2) * 20, d), 12, { outline: '#55507a', rot: (i - 1.5) * 0.15 }) }
      label(x, 790, 1150, 'COLOURS PACKED: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sunglasses on. | *Indoors. At night.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const d = ease.outBack(prog(lt, 0.3, 0.7))
      if (lt > 0.25) shades(x, F.x, lerp(F.cy - 300, F.cy + 4, d), 16)
      drawBits(x, MOON, { Y: GOLD }, 820, 700, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 940, 'TIME: 11:48 PM', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'LOCATION: HOTEL LOBBY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Beach day. | *Sat in the only shadow.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, -1], star: { x: -150, y: 20 },
    back(x, t, lt, P) {
      sun(x, t, 820, 640, 60, pop01(t, P.t0 + 0.2, 0.35, 2), { face: true })
      drawBits(x, UMB, UMB_C, 400, 820, 26 * pop01(t, P.t0 + 0.35, 0.35, 2))
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.ellipse(390, 1060, 170 * pop01(t, P.t0 + 0.4, 0.35, 2), 30, 0, 0, Math.PI * 2); x.fill()
    },
    front(x, t, lt, P) {
      label(x, 790, 1060, 'SHADE: CLAIMED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Postcard home. | Signed *“you know who.”*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 380, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.05 }, () => {
        x.fillStyle = SKYB; x.fillRect(80, -110, 90, 70); x.fillStyle = INK; x.fillRect(70, -120, 110, 4)
        txt(x, 'wish you', -60, -60, { size: 32 }); txt(x, 'were here.', -60, -14, { size: 32 })
        if (lt > 1.0) txt(x, '— you know who', 0, 80, { size: 30, color: '#8a3ad0' })
      })
      label(x, 790, 1100, 'RETURN ADDRESS: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tour guide’s secret? | *Scorpio knew already.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 820, 1000, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 14, glyph: false, hops: [P.t0 + 0.6] })
      bubble(x, 800, 720, 'secret fact!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 380, 620, 'old news.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Group trip. | Trusted *one. Barely.*', mood: 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const IDS = ['gemini', 'leo', 'libra', 'aries', 'taurus', 'cancer']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2); if (k > 0.01) signChar(x, t, id, 690 + (i % 3) * 110, 780 + Math.floor(i / 3) * 150, 110 * k, { mood: i === 4 ? 'heart' : 'happy', seed: 40 + i, glyph: false, alpha: lt > 1.2 && i !== 4 ? 0.4 : 1 }) })
      label(x, 790, 1110, 'TRUSTED: 1 OF 6', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Holiday crush? | Ran *their birth chart* first.', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 830, 130, pop01(t, P.t0 + 0.2, 0.4, 2), t)
      label(x, 790, 1060, lt > 1.3 ? 'VERDICT: …MAYBE' : 'SCANNING…', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: lt > 1.3 ? PINK : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hot spring. | *Stayed in six hours.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 40 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.35, 2)
      x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(150, 990, 460, 150); x.fillStyle = '#6fc3ff'; x.fillRect(160, 1000, 440, 130); x.fillStyle = '#9fe0ff'; x.fillRect(160, 1000, 440, 16); x.restore()
    },
    front(x, t, lt, P) {
      x.save(); x.fillStyle = '#6fc3ff'; x.globalAlpha = 0.85 * pop01(t, P.t0 + 0.1, 0.35, 2); x.fillRect(160, 1030, 440, 100); x.restore()
      steam(x, t, 380, 1000, pop01(t, P.t0 + 0.3, 0.4, 2))
      clock(x, 820, 780, 90, pop01(t, P.t0 + 0.5, 0.35, 2), Math.floor(lt * 3) % 12, (lt * 400) % 60)
      label(x, 820, 990, 'HOURS: 6', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Came home. | Told *nobody* anything.', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'how was the trip?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'br' })
      bubble(x, 760, 860, '…it was fine.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 1060, 'DETAILS: SEALED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

/** a round wall clock (local copy: props' clock, kept here so this card can spin it) */
function clock(x, cx, cy, r, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  const hand = (a, len, w) => { x.save(); x.rotate(a); x.fillStyle = INK; x.fillRect(-w / 2, -len, w, len); x.restore() }
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, r * 0.5, 10); hand(m / 60 * Math.PI * 2, r * 0.75, 6)
  x.fillStyle = RED; x.fillRect(-7, -7, 14, 14)
  x.restore()
}

const F = makeFilm({
  id: 'r2t0207', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpios on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Mysterious. | *Even on vacation.*', mood: 'wink' },
  lesson: { text: 'Love a Scorpio slowly. | They *let you in.*', chip: 'STATUS: TRUSTED' },
  last: {
    text: 'Next trip? | *You’re invited.*',
    draw(x, t, lt) {
      for (let i = 0; i < 2; i++) { const d = ease.outBack(prog(lt, 0.4 + i * 0.25, 0.9 + i * 0.25)); if (d > 0.01) drawBits(x, TICKET, TICKET_C, lerp(1200, 680 + i * 220, d), 1300 + i * 30, 14, { rot: (i ? 0.08 : -0.06) }) }
      label(x, 790, 1440, 'TICKETS: 2', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
