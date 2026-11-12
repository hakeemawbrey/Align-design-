// r2t0153: star_talk ROLLCALL, "The signs | at a hotel." (~57 s vertical, signs3kit social cut, music: lofi · G). Ending: 'lesson'.
//   0.0–3.6    "The signs | *at a hotel.*"
//   3.6–49.2   ♈ raced the elevator, took the stairs, won · ♉ took every pillow, built a nest · ♊ knows the night clerk's
//              whole life story · ♋ unpacked everything, hung family photos · ♌ wore the robe to the lobby · ♍ re-made the
//              hotel bed · ♎ swiped left on three rooms · ♏ do not disturb, all week · ♐ never saw the room · ♑ ran a meeting
//              from the pool · ♒ befriended the ice machine · ♓ two towel swans, cried: it's a match
//  49.2        "Five stars. | *Zero sleep.*"
//  52.4        LESSON: "Anywhere's home | *with your people.*"  CHECK-IN: COMPLETE
//  58.3        "Checkout's at noon. | *Nobody's leaving.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#8fe3ff', L = { x: -160 }, R = { x: 160 }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const ROBE = ['..W.....W..', '.WWW...WWW.', 'WWWWW.WWWWW', 'WWWWWPWWWWW', 'WW.WWPWW.WW', 'WW.WWPWW.WW', '...WWWWW...', '...WWWWW...', '...WWWWW...']
const BED = ['HH..........', 'HHWWWWWWWWWW', 'HHBBBBBBBBBB', 'HHBBBBBBBBBB', 'HHHHHHHHHHHH', 'H..........H']
const BED_C = { H: WOOD, W: CREAM, B: '#e8e0f0' }
const HANGER = ['...KKK...', '..K...K..', '..K...K..', '...KKK...', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR']
const RING = ['...PPPPP...', '.PPPPPPPPP.', 'PPPP...PPPP', 'PPP.....PPP', 'PPPP...PPPP', '.PPPPPPPPP.', '...PPPPP...']
const ICE = ['GGGGGGGGG', 'GSSSSSSSG', 'GSWWWWWSG', 'GSWWWWWSG', 'GSSSSSSSG', 'GGGGGGGGG', 'GKKKKKKKG', 'GKWKWKWKG', 'GKKKKKKKG', 'GGGGGGGGG']
const ICE_C = { G: GREY, S: SKYB, W: CREAM, K: NIGHT }
const SWAN = ['WW.......', 'WWW......', '.WW......', '.WW......', '.WW...WW.', '.WWWWWWWW', 'WWWWWWWWW', '.WWWWWWW.']

const CAMEOS = [
  { sign: 'aries', cap: 'Raced the elevator. | Took the stairs. *Won.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [0.5, 0.8, 1.1],
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: GREY, rot: 0 }, () => {
        x.fillStyle = '#7d879f'; x.fillRect(-120, -150, 116, 320); x.fillRect(4, -150, 116, 320)
        x.fillStyle = INK; x.fillRect(-60, -190, 120, 32)
        txt(x, `${String(Math.min(30, Math.floor(lt * 4))).padStart(2, '0')} ▲`, 0, -174, { size: 24, font: MONO, weight: 700, color: lt > 1.4 ? RED : MINT })
      })
      label(x, 790, 1110, 'ARIES: 1ST', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Took every pillow. | *Built a nest.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: { x: -40, y: 20 },
    back(x, t, lt, P) {
      const n = Math.min(8, Math.floor(Math.max(0, lt - 0.2) / 0.15))
      const POS = [[-230, 120], [230, 120], [-260, 40], [260, 40], [-200, -40], [200, -40], [-140, 180], [140, 180]]
      for (let i = 0; i < n; i++) drawBits(x, PILLOW, { W: i % 2 ? CREAM : '#e8e0f0' }, 500 + POS[i][0], 900 + POS[i][1], 16, { rot: (i % 3 - 1) * 0.2 })
    },
    front(x, t, lt, P) { label(x, 500, 620, 'PILLOWS: ALL', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GREEN, rot: -0.04, font: MONO, weight: 700 }) } },
  { sign: 'gemini', cap: 'Knows the night clerk’s | *whole life story.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 1000, 190 * k, { mood: lt > 1.4 ? 'wide' : 'neutral', look: [-1, 0], seed: 21, glyph: false })
      const ch = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.6) / 0.2))
      bubble(x, 760, 700, `…chapter ${ch}`, pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: CREAM, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Unpacked everything. | *Hung family photos.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const C = [PINK, GOLD, MINT, SKYB, LAV]
      C.forEach((c, i) => card(x, 660 + (i % 3) * 130, 700 + Math.floor(i / 3) * 170, 100, 130, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2.2), { bg: GOLD, rot: (i % 2 ? 0.06 : -0.06) }, () => { x.fillStyle = c; x.fillRect(-40, -55, 80, 110); drawBits(x, ['.S.', 'SSS', 'S.S'], { S: CREAM }, 0, 0, 12) }))
      label(x, 790, 1110, 'HOME NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wore the robe | *to the lobby.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, ROBE, { W: CREAM, P: PINK }, F.x, F.cy + 125, 15 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 760, 'RUNWAY: LOBBY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'no photos. | (photos.)', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Re-made the hotel bed. | *Hospital corners.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 980, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'HOUSEKEEPING: CORRECTED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 26, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) sparkles(x, t, 790, 960, P.t0 + 1.4 * 1.29, 6, 170, 0.3)
    } },
  { sign: 'libra', cap: 'Swiped left | *on three rooms.*', mood: lt => lt > 1.8 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      for (let i = 0; i < 4; i++) {
        const out = i < n ? ease.inCubic(clamp((lt - 0.3 - (i + 1) * 0.45 + 0.3) / 0.3)) : 0
        if (i > n) continue
        card(x, 790 - out * 500, 860, 280, 340, i === n ? pop01(t, P.t0 + 0.2 + i * 0.58, 0.3, 2) : 1, { bg: CREAM, rot: 0.04 - out * 0.4 }, () => {
          x.fillStyle = SKYB; x.fillRect(-110, -140, 220, 160)
          x.fillStyle = [GREY, WOOD, GREEN, GOLD][i]; x.fillRect(-110, -30, 220, 50)
          txt(x, `ROOM ${401 + i * 101}`, 0, 80, { size: 34, font: MONO, weight: 700 })
          if (i === 3) txt(x, '♥ VIEW', 0, 130, { size: 30, color: RED })
        })
      }
    } },
  { sign: 'scorpio', cap: 'Do Not Disturb. | *All week.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, HANGER, { K: GOLD, R: PURPLE }, 790, 880, 24 * k, { rot: Math.sin(t * 2) * 0.05 })
      if (k > 0.5) { txt(x, 'DO NOT', 790, 870, { size: 38, font: MONO, weight: 700, color: CREAM }); txt(x, 'DISTURB', 790, 920, { size: 38, font: MONO, weight: 700, color: CREAM }); txt(x, 'EVER.', 790, 990, { size: 34, font: MONO, weight: 700, color: GOLD }) }
      label(x, 790, 1150, 'DAY 6', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Never saw the room. | *Out exploring.*', mood: 'sparkle', look: [-1, 0], star: R, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 320, 980, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(150, 870); x.lineTo(150 + 50 * Math.cos(i * 0.35), 870 + 50 * Math.sin(i * 0.35)); x.stroke() } x.restore()
      label(x, 320, 700, 'BED: UNTOUCHED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ran a meeting | *from the pool.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160, y: -30 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.35, 2)
      x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = '#4fb6e8'; x.fillRect(130, 1000, 820, 200); x.restore()
      drawBits(x, RING, { P: PINK }, 700, 1000 + Math.sin(t * 2) * 6, 26 * k)
    },
    front(x, t, lt, P) {
      card(x, 330, 860, 280, 180, pop01(t, P.t0 + 0.4, 0.35, 2), { bg: NIGHT, rot: -0.04 }, () => {
        x.fillStyle = SKYB; x.fillRect(-120, -70, 240, 140)
        txt(x, 'Q3 REVIEW', 0, -30, { size: 30, font: MONO, weight: 700 })
        for (let i = 0; i < 4; i++) { x.fillStyle = [GREEN, GOLD, ORANGE, RED][i]; x.fillRect(-80 + i * 44, 50 - 20 * (i + 1), 30, 20 * (i + 1)) }
      })
      label(x, 330, 660, 'YOU’RE ON MUTE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Befriended | *the ice machine.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ICE, ICE_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { sx: 1 + (lt > 1.3 ? 0.03 * Math.sin(t * 20) : 0) })
      bubble(x, 760, 620, 'hi buddy.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
      bubble(x, 860, 1130, 'clunk.', pop01(t, P.t0 + 1.3 * 1.29, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Two towel swans. | Cried: *it’s a match.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), j = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, SWAN, { W: CREAM }, lerp(640, 720, j), 920, 22 * k)
      drawBits(x, SWAN, { W: CREAM }, lerp(940, 860, j), 920, 22 * k, { sx: -1 })
      if (j > 0.9) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 760, 14)
      label(x, 790, 1110, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0153', key: 'G', accent: ACC, ending: 'lesson',
  title: 'The signs | *at a hotel.*',
  cameos: CAMEOS,
  group: { cap: 'Five stars. | *Zero sleep.*' },
  lesson: { text: 'Anywhere’s home | *with your people.*', chip: 'CHECK-IN: COMPLETE' },
  last: { text: 'Checkout’s at noon. | *Nobody’s leaving.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
