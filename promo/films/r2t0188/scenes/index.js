// r2t0188: star_talk ROLLCALL, "The signs | at the aquarium." (~54 s vertical, signs3kit social cut, music: lofi · G).
// Ending: 'group' (the group beat is the punchline; the octopus from Scorpio's card turns up with notes).
//   0.0–3.6    "The signs | *at the aquarium.*"
//   3.6–49.2   ♈ raced the dolphins, lost, demanded a rematch · ♉ watched the jellyfish for three hours · ♊ gave every fish
//              a voice · ♋ saw a hermit crab, felt seen · ♌ met a starfish, assumed it's a fan · ♍ corrected an info sign
//              · ♎ checked the seahorses' compatibility · ♏ stared down an octopus, mutual respect · ♐ asked if the tank
//              has a guest pass · ♑ priced the water bill · ♒ asked the turtle for its birth time · ♓ met a whale, cried, best friends
//  49.2        "The octopus | *has notes.*"  The twelve pose for the photo while the octopus holds up a clipboard.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, wheel, tank, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#8fe3ff', L = { x: -160 }, R = { x: 160 }

const DOLPHIN = ['.........GG...', '........GGG...', '..GGGGGGGGGG..', '.GGGGGGGGGGGG.', 'GGKGGGGGGGGGGG', 'GGGGWWWWWGGGG.', '.GGWWWWWWW..GG', '..........GGG.']
const DOLPHIN_C = { G: '#8fa8d8', W: '#dce6ff', K: INK }
const JELLY = ['..PPPPP..', '.PPPPPPP.', 'PPpPPPpPP', 'PPPPPPPPP', 'P.P.P.P.P', 'P.P.P.P.P', '.P.P.P.P.', '.P.P.P.P.', 'P...P...P']
const FISH = ['.....OOO..', '..OOOOOOO.', 'O.OOKOOOOO', 'OOOOOOOOOO', 'O.OOOOOOOO', '..OOOOOOO.', '.....OOO..']
const CRAB = ['....SSSS....', '...SSssSS...', '..SSSssSSS..', '.SSSSSSSSSS.', 'C.RRRRRRRR.C', 'CCRKRRRRKRCC', '..RRRRRRRR..', '.R.R....R.R.']
const CRAB_C = { S: '#e0b070', s: '#c98f4a', R: '#ff6b5a', C: '#ff6b5a', K: INK }
const STARFISH = ['.....O.....', '....OOO....', 'OOOOOOOOOOO', '.OOOKOKOOO.', '..OOOOOOO..', '..OOO.OOO..', '.OO.....OO.']
const SEAHORSE = ['.YYY.', 'YYKYY', '.YYYY', '..YY.', '.YYY.', 'YYYY.', 'YYYY.', '.YYY.', '..YY.', '..Y.Y', '...YY']
const OCTO = ['...PPPPPP...', '..PPPPPPPP..', '.PPPPPPPPPP.', '.PPWKPPWKPP.', '.PPPPPPPPPP.', '..PPPPPPPP..', '.P.P.PP.P.P.', 'P.P.P..P.P.P', 'P..P....P..P']
const OCTO_C = { P: '#c97bff', W: '#fff', K: INK }
const SNORKEL = ['.KKKKKKKKKK.', 'KGGGGKKGGGGK', 'KGGGGKKGGGGK', '.KKKKKKKKKK.']
const TURTLE = ['....GGGGG....', '..GGgGGgGG...', '.GGGGgGGGGG.H', 'GgGGGGGGgGGHH', '.GGGGGGGGGG.H', '.F..F...F..F.']
const TURTLE_C = { G: '#5fd068', g: '#3a9a48', H: '#9fd8a0', F: '#9fd8a0' }
const WHALE = ['......BBBBBBB.......', '...BBBBBBBBBBBBB..BB', '.BBBBBBBBBBBBBBBBBB.', 'BBKBBBBBBBBBBBBBBBB.', 'BBBBBBBBBBBBBBBBB.BB', 'BWWWWWWWWWWWBBB.....', '.WWWWWWWWWBB........']
const WHALE_C = { B: '#3d6fd8', W: '#c4d8ff', K: INK }

const CAMEOS = [
  { sign: 'aries', cap: 'Lost to the dolphins. | *Demanded a rematch.*', mood: lt => lt > 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: L, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      tank(x, t, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), () => drawBits(x, DOLPHIN, DOLPHIN_C, lerp(-200, 60, ease.outCubic(prog(lt, 0.3, 1.0))), -20 + Math.sin(t * 4) * 12, 14))
      label(x, 790, 1110, 'REMATCH!!', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 44, bg: RED, color: CREAM, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Watched the jellyfish. | *For three hours.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      tank(x, t, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        drawBits(x, JELLY, { P: PINK, p: '#fff' }, -50, -40 + Math.sin(t * 1.5) * 30, 14, { alpha: 0.9 })
        drawBits(x, JELLY, { P: LAV, p: '#fff' }, 70, 60 + Math.sin(t * 1.5 + 2) * 30, 11, { alpha: 0.9 })
      })
      label(x, 790, 1110, 'CLOSING TIME?', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Gave every fish | *a backstory.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      tank(x, t, 790, 900, 330, 300, pop01(t, P.t0 + 0.2, 0.35, 2), () => { drawBits(x, FISH, { O: ORANGE, K: INK }, -40 + Math.sin(t * 2) * 30, -20, 14); drawBits(x, FISH, { O: GOLD, K: INK }, 60 - Math.sin(t * 2) * 30, 70, 10, { sx: -1 }) })
      bubble(x, 790, 640, Math.floor(lt * 1.5) % 2 ? '“I’m Gary.”' : '“blub. rude.”', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Saw a hermit crab. | *Felt deeply seen.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, CRAB, CRAB_C, 790, 930 + Math.abs(Math.sin(t * 5)) * -8, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'SAME.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 52, bg: SKYB, rot: 0.05 })
      hearts(x, t, 600, 820, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Met a starfish. | *Assumed it’s a fan.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, STARFISH, { O: ORANGE, K: INK }, 800, 960, 22 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: Math.sin(t * 2) * 0.08 })
      bubble(x, 790, 680, 'aw, hi fan.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
      label(x, 800, 1140, 'AUTOGRAPH: SIGNED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Read every sign. | *Corrected one.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 880, 340, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'THE CLOWNFISH', 0, -90, { size: 26, font: MONO, weight: 700 })
        x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-140, -40 + i * 36, 280 - i * 40, 10)
        const c = clamp((lt - 0.8) / 0.4)
        if (c > 0) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(-140, 32); x.lineTo(-140 + 200 * c, 32); x.stroke() }
        if (lt > 1.2) txt(x, 'its*', 90, 80, { size: 34, color: RED })
      })
      label(x, 790, 1110, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Checked the seahorses’ | *compatibility.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SEAHORSE, { Y: GOLD, K: INK }, 720, 900 + Math.sin(t * 2) * 10, 22 * k, { sx: -1 })
      drawBits(x, SEAHORSE, { Y: PINK, K: INK }, 860, 900 + Math.sin(t * 2 + 1) * 10, 22 * k)
      label(x, 790, 1140, 'ALIGNED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 7 })
    } },
  { sign: 'scorpio', cap: 'Stared down an octopus. | *Mutual respect.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      tank(x, t, 790, 880, 330, 360, pop01(t, P.t0 + 0.2, 0.35, 2), () => drawBits(x, OCTO, OCTO_C, 0, Math.sin(t * 1.5) * 10, 20))
      label(x, 790, 1120, 'NOD. NOD.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Asked if the tank | *has a guest pass.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [-1, 0], star: R, hops: [0.9],
    front(x, t, lt, P, F) {
      const k = ease.outBack(prog(lt, 0.3, 0.7))
      if (k > 0.01) inSprite(x, F, () => { x.globalAlpha = clamp(k); x.translate(18, 18); x.scale(k, k); x.translate(-18, -18); drawBits(x, SNORKEL, { K: INK, G: '#8fe3ff' }, 18, 18, 1.4) })
      bubble(x, 320, 660, 'just a quick dip?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: CREAM, tail: 'br' })
      label(x, 320, 1100, 'STAFF: NO.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Skipped the sharks. | *Priced the water bill.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      const u = ease.outCubic(prog(lt, 0.3, 1.4))
      card(x, 320, 700 + u * 180, 240, 80 + u * 380, 1, { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'WATER', 0, -u * 190 + 30, { size: 26, font: MONO, weight: 700 })
        x.fillStyle = GREY; for (let i = 0; i < Math.floor(u * 7); i++) x.fillRect(-90, -u * 190 + 70 + i * 40, 180 - (i % 3) * 40, 10)
      })
      label(x, 320, 1150, 'WORTH IT?', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Asked the turtle | *for its birth time.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TURTLE, TURTLE_C, 790, 1010, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      wheel(x, 790, 760, 90, pop01(t, P.t0 + 0.9, 0.35, 2), t, 0.2)
      label(x, 800, 1150, 'RISING: SLOW', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Met a whale. | *Cried. Best friends now.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: L,
    back(x, t, lt, P) {
      tank(x, t, 760, 860, 420, 440, pop01(t, P.t0 + 0.1, 0.35, 2), () => drawBits(x, WHALE, WHALE_C, lerp(260, 20, ease.outCubic(prog(lt, 0.2, 1.4))), 20, 16))
    },
    front(x, t, lt, P) { hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 }) } },
]

const F = makeFilm({
  id: 'r2t0188', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs | *at the aquarium.*',
  cameos: CAMEOS,
  group: {
    cap: 'The octopus | *has notes.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.45, 2)
      drawBits(x, OCTO, OCTO_C, 360, 640 + Math.sin(t * 2) * 8, 22 * k)
      card(x, 700, 620, 300, 220, pop01(t, t - lt + 2.0, 0.35, 2.2), { bg: CREAM, rot: 0.06 }, () => {
        txt(x, 'NOTES', 0, -70, { size: 30, font: MONO, weight: 700 })
        txt(x, 'ARIES: SPLASHY', 0, -12, { size: 30, font: MONO, weight: 700, color: RED })
        txt(x, 'PISCES: A DEAR', 0, 42, { size: 30, font: MONO, weight: 700, color: GREEN })
      })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
