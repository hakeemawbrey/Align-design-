// r2t0348: THE SIGNS AS… v3, BELIKE, "Awkward first date? | *Zodiacs be like.*" (topic: when the date's awkward;
// signs3kit social cut, music: lofi · G). Ending: card (Aquarius + Sagittarius: they both love aliens).
//   ♈ asked for date two during the silence · ♉ focused on the pasta · ♊ one second of silence, nine stories
//   · ♋ bathroom call to mom · ♌ started a slideshow · ♍ reorganised the condiments · ♎ complimented the napkins
//   · ♏ ran their chart mid-meal · ♐ invited the next table · ♑ a list of forty questions · ♒ asked about aliens
//   · ♓ already planned the wedding (crying)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', ACC = '#ff8f8f', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 34, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
const PASTA = ['..YYWYYYY..', '.YYYYWYYYY.', 'YWYYYYYWYYY', 'BBBBBBBBBBB', '.BBBBBBBBB.', '..BBBBBBB..']
const PHONE = ['KKKKKKK', 'KGGGGGK', 'KGGGGGK', 'KGGGGGK', 'KGGGGGK', 'KKKKKKK', 'KKWWWKK', 'KKKKKKK']
const BOTTLE = ['.KK.', '.KK.', 'BBBB', 'BWWB', 'BBBB', 'BBBB']
const UFO = ['....GGGG....', '...GWWWWG...', '..GGGGGGGG..', 'SSSSSSSSSSSS', '.SYSSYSSYSS.', '..SSSSSSSS..']
const NAPKIN = ['PPPPPPPP', 'PWPPPPWP', 'PPPWWPPP', 'PPPWWPPP', 'PWPPPPWP', 'PPPPPPPP']
/** a little table edge across the panel */
function table(x, k) { if (k <= 0.01) return; x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(150, 1090, 780, 34); x.fillStyle = BROWN; x.fillRect(158, 1094, 764, 24); x.restore() }
/** a birth-chart wheel */
function chart(x, t, cx, cy, k, R = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.4)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, R + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, R * 0.62, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * R * 0.62, Math.sin(a) * R * 0.62); x.lineTo(Math.cos(a) * R, Math.sin(a) * R); x.stroke() }
  x.strokeStyle = PINK; x.lineWidth = 3; x.beginPath(); x.moveTo(Math.cos(0.4) * R * 0.6, Math.sin(0.4) * R * 0.6); x.lineTo(Math.cos(2.8) * R * 0.6, Math.sin(2.8) * R * 0.6); x.lineTo(Math.cos(4.6) * R * 0.6, Math.sin(4.6) * R * 0.6); x.closePath(); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Three seconds of silence? | *Asked for date two.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      table(x, pop01(t, P.t0 + 0.1, 0.3, 2))
      L(x, 790, 700, '. . .', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, 0.04, 44)
      bubble(x, 790, 900, 'tomorrow? | same time?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Conversation died. | *Focused on the pasta.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      table(x, pop01(t, P.t0 + 0.1, 0.3, 2))
      drawBits(x, PASTA, { Y: '#ffd98a', W: '#fff4e2', B: SKYB }, 800, 1030, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 760, 'NEW BEST FRIEND', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 34)
      if (lt > 1.0) hearts(x, t, 370, 760, P.t0 + 1.1, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'One second of silence. | *Nine stories.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const S = [['so my cousin', 700, 640], ['then a goose!', 860, 740], ['ANYWAY', 690, 850], ['wait, also', 860, 950], ['the mall?!', 720, 1060]]
      S.forEach(([s, cx, cy], i) => bubble(x, cx, cy, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.2), { size: 30, col: i % 2 ? '#ffe76a' : BONE, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Felt awkward? | *Bathroom call to mom.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: '#2a2350', G: '#c9e8ff', W: STEEL }, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      L(x, 800, 680, 'MOM ♡ 0:47', pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, -0.05, 38)
      bubble(x, 800, 1090, 'he said “cool”?? | what does it mean', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Awkward pause? | *Leo started a slideshow.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 830); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -130, 360, 250); x.fillStyle = BONE; x.fillRect(-170, -120, 340, 230)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEO: THE EARLY YEARS', 0, -84)
        x.restore()
        signChar(x, t, 'leo', 780, 880, 120 * k, { mood: 'wink', seed: 61, glyph: false, glow: 0.4 })
      }
      L(x, 780, 1080, 'SLIDE 1 OF 212', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#ffb34a', 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Awkward silence? | *Reorganised the condiments.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      table(x, pop01(t, P.t0 + 0.1, 0.3, 2))
      const COLS = [RED, '#ffd23a', MINT, LAV, SKYB]
      const order = clamp((lt - 0.4) / 1.0)
      for (let i = 0; i < 5; i++) {
        const messy = [3, 0, 4, 1, 2][i]
        const cx = lerp(640 + messy * 72, 640 + i * 72, ease.inOutCubic(order)), rot = lerp((i % 2 ? 0.3 : -0.25), 0, order)
        drawBits(x, BOTTLE, { K: INK, B: COLS[i], W: BONE }, cx, 1030, 12 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2), { rot })
      }
      L(x, 790, 760, 'SORTED BY COLOUR', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Awkward silence? | *Complimented the napkins.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, NAPKIN, { P: PINK, W: BONE }, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      bubble(x, 800, 720, 'these napkins? | stunning.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 800, 960, P.t0 + 1.0, 7, 160, 0.3, [PINK, BONE, LAV])
    } },
  { sign: 'scorpio', cap: 'Awkward date? | *Ran their chart mid-meal.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 1080, 'VENUS IN… INTERESTING', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Things got awkward. | *Invited the next table.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      table(x, pop01(t, P.t0 + 0.1, 0.3, 2))
      const ids = ['gemini', 'leo', 'aries']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.6 + i * 0.25, 0.35, 2); if (k > 0.01) signChar(x, t, id, 640 + i * 120, 980 - (i % 2) * 40, 140 * k, { mood: 'happy', look: [-1, 0], seed: 30 + i, glyph: false, hops: [P.t0 + 1.3 + i * 0.1] }) })
      L(x, 790, 680, 'DATE: NOW A PARTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Awkward silence? | *Pulled out forty questions.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -180, 300, 360); x.fillStyle = BONE; x.fillRect(-142, -172, 284, 344)
        x.fillStyle = BROWN; x.fillRect(-50, -196, 100, 34)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        ;['1. siblings?', '2. 5-year plan?', '3. your sign?', '4. credit score?'].forEach((q, i) => { x.globalAlpha = clamp((lt - 0.4 - i * 0.3) * 4); x.fillText(q, -122, -110 + i * 66) })
        x.restore()
      }
      L(x, 800, 1110, 'Q 4 OF 40', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Awkward pause? | *Asked about aliens.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, UFO, { G: MINT, W: '#e8fff4', S: STEEL, Y: '#ffe76a' }, 800 + Math.sin(t * 2.4) * 30, 700, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 960, 'so… | do you believe?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Awkward goodbye. | *Already planned the wedding.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', tears: lt => lt > 0.9 ? 3 : 1, star: { x: -170 },
    front(x, t, lt, P) {
      L(x, 800, 700, 'WEDDING: PLANNED', pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.04, 36)
      L(x, 800, 820, 'DATE: 40 MINUTES', pop01(t, P.t0 + 1.2, 0.3, 2.2), BONE, -0.04, 32)
      hearts(x, t, 800, 1060, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0348', key: 'G', accent: ACC, ending: 'card',
  title: 'Awkward first date? | *Zodiacs be like.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'sagittarius', chip: 'IT’S A MATCH' },
  group: { cap: 'Awkward? | *Totally. Adorable.*', moods: ['sparkle', 'heart', 'wide', 'wide', 'wink', 'squint', 'sparkle', 'squint', 'sparkle', 'neutral', 'sparkle', 'heart'] },
  lesson: { text: 'Awkward just means | you *care a little.*', chip: 'STATUS: SMITTEN' },
  last: { text: 'Date two? | *Alien movies.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
