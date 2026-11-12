// r2t0209: THE SIGNS AS… v3, BE LIKE, "Moved their stuff? | Zodiacs be like." (~57 s vertical, signs3kit, lofi · D)
//   0.0–3.6    "Moved their stuff? | Zodiacs *be like.*"
//   3.6–49.2   ♈ moved it back before you let go · ♉ moved one mug, felt it from work · ♊ didn't notice, moved everything
//              else · ♋ the blanket was grandma's spot · ♌ moved their portrait off the centre · ♍ moved the remote, Virgo
//              made a map · ♎ moved a vase, the whole room is off · ♏ already knows who · ♐ what stuff? one backpack
//              · ♑ moved one file, scheduled a meeting · ♒ "the lamp wanted to move" · ♓ moved their plant, said goodbye
//  49.2        "Touch nothing. | *Ever.*"
//  52.6        callback: "The mug? | *Back home.*"  Taurus and the mug, reunited.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = ORANGE
const ST = { x: -170 }

const MUG = ['.WWWWWW.', 'WTTTTTTWWW', 'WTTTTTTW.W', 'WTTTTTTWWW', 'WTTTTTTW', '.WWWWWW.']
const MUG_C = { W: '#ff8fb1', T: '#6b3a1e' }
const LAMP = ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', '....B....', '....B....', '....B....', '...BBB...', '..BBBBB..']
const LAMP_C = { Y: SUN, B: '#8a4a2e' }
const VASE = ['..F.F..', '.FFFFF.', '..GGG..', '..GGG..', '.BBBBB.', 'BBBBBBB', 'BBBBBBB', '.BBBBB.']
const VASE_C = { F: PINK, G: GREEN, B: '#6fc3ff' }
const PACK = ['...GGGGG...', '..G.....G..', '.GGGGGGGGG.', 'GGGGGGGGGGG', 'GGgggggggGG', 'GGgGGGGGgGG', 'GGgggggggGG', 'GGGGGGGGGGG', '.GGGGGGGGG.']
const PLANT = ['...L....L...', '..LLL..LLL..', '..LLLLLLLL..', '...LLLLLL...', '.....LL.....', '.....SS.....', '..PPPPPPPP..', '..PPPPPPPP..', '...PPPPPP...']
const PLANT_C = { L: GREEN, S: '#3f8f45', P: '#e0784a' }
const GLASS = ['..KKKK....', '.K....K...', 'K......K..', 'K......K..', 'K......K..', '.K....K...', '..KKKKKK..', '.......KK.', '........KK']
const BLANKET = ['PPPPPPPPPPPP', 'PWPPWPPWPPWP', 'PPPPPPPPPPPP', 'PPWPPWPPWPPW', 'PPPPPPPPPPPP', 'PWPPWPPWPPWP', 'PPPPPPPPPPPP']

const CAMEOS = [
  { sign: 'aries', cap: 'Moved it back | *before you let go.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -150 }, hops: [0.6, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = lt < 0.7 ? ease.inOutCubic(prog(lt, 0.3, 0.7)) : 1 - ease.outBack(prog(lt, 0.75, 1.0))
      drawBits(x, LAMP, LAMP_C, lerp(720, 900, p), 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'TIME AWAY: 0.2 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: '#ff6b5a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Moved one mug. | Taurus *felt it from work.*', mood: lt => lt > 1.0 ? 'eyeroll' : 'happy', star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'THE OFFICE', 0, -70, { size: 28, font: MONO, weight: 700 })
        drawBits(x, MUG, MUG_C, lerp(-40, 70, ease.inOutCubic(prog(lt, 0.5, 1.0))), 20, 12)
      })
      label(x, 790, 1060, 'MUG: 3 CM LEFT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: '#5fd068', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'i felt that.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Didn’t notice. | *Moved everything else.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const items = [[LAMP, LAMP_C, 12], [VASE, VASE_C, 12], [MUG, MUG_C, 12], [PLANT, PLANT_C, 10]]
      items.forEach(([bm, c, s], i) => { const a = lt * 2.2 + i * Math.PI / 2; drawBits(x, bm, c, 790 + Math.cos(a) * 140, 880 + Math.sin(a) * 160, s * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2)) })
      label(x, 790, 1150, 'NEW LAYOUT #6', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#ffd23a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Moved the blanket? | *That was Grandma’s.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BLANKET, { P: '#c97bff', W: '#fff4e2' }, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.06 })
      label(x, 790, 680, 'BLANKET: SACRED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'since 1987.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Moved their portrait | *off the centre.*', mood: lt => lt > 1.0 ? 'eyeroll' : 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const off = lt < 1.2 ? ease.inOutCubic(prog(lt, 0.4, 0.8)) * 90 : (1 - ease.outBack(prog(lt, 1.3, 1.7))) * 90
      card(x, 790 + off, 830, 230, 290, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: GOLD, rot: 0.02 }, () => {
        x.fillStyle = DEEP; x.fillRect(-95, -125, 190, 250)
        signChar(x, t, 'leo', 0, 10, 150, { mood: 'sparkle', seed: 70, glyph: false, glow: 0.4 })
      })
      label(x, 790, 1100, lt > 1.6 ? 'CENTRED AGAIN' : 'OFF BY 90 PX', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: lt > 1.6 ? MINT : ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Moved the remote? | *Virgo made a map.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 360, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8f0d0', rot: -0.03 }, () => {
        x.fillStyle = '#b7d8a0'; x.fillRect(-150, -120, 110, 80); x.fillRect(40, 20, 110, 90)
        txt(x, 'SOFA', -95, -80, { size: 22, font: MONO, weight: 700 }); txt(x, 'TV', 95, 65, { size: 22, font: MONO, weight: 700 })
        x.strokeStyle = '#d0453a'; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-95, -40); x.lineTo(-95 + 120 * clamp((lt - 0.5) / 0.8), -40 + 80 * clamp((lt - 0.5) / 0.8)); x.stroke(); x.setLineDash([])
        if (lt > 1.3) txt(x, 'X', 25, 40, { size: 48, color: '#d0453a' })
      })
      label(x, 790, 1100, 'REMOTE: LOCATED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Moved one vase. | *The room feels off.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 1000, 380, 30, k, { bg: '#c98f2a', rot: 0 })
      drawBits(x, VASE, VASE_C, 690, 930, 14 * k); drawBits(x, VASE, VASE_C, lerp(890, 940, ease.inOutCubic(prog(lt, 0.4, 0.8))), 930, 14 * k)
      label(x, 790, 700, lt > 0.9 ? 'BALANCE: 0%' : 'BALANCE: 100%', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: lt > 0.9 ? ORANGE : PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'SHELF + VASE: NOT A MATCH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Didn’t ask who. | *Already knows.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: GOLD }, 780, 840, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'SUSPECT: GEMINI', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 780, 640, 'mm-hm.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'What stuff? | *They own one backpack.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, PACK, { G: '#a35cf0', g: '#c9a6ff' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 660, 'BELONGINGS: ALL', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'travel light!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Moved one file. | *Scheduled a meeting.*', mood: lt => lt > 1.4 ? 'neutral' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'INVITE', 0, -90, { size: 30, font: MONO, weight: 700 })
        txt(x, 'RE: the file', 0, -30, { size: 32 }); txt(x, 'Mon · 9:00', 0, 20, { size: 32 })
        txt(x, '2 hours', 0, 70, { size: 30, color: '#d0453a' })
      })
      label(x, 790, 1100, 'ATTENDANCE: MANDATORY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their lamp moved? | *“It wanted to.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      drawBits(x, LAMP, LAMP_C, 790 + Math.sin(lt * 3) * 60, 900 - Math.abs(Math.sin(lt * 3)) * 60, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(lt * 3) * 0.25 })
      label(x, 790, 1100, 'LAMP: FREE NOW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Moved their plant? | *Pisces said goodbye.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, lerp(760, 880, ease.inOutCubic(prog(lt, 0.4, 1.4))), 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 780, 650, 'be happy there…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 800, 1120, 'DISTANCE: 1 METRE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0209', key: 'D', accent: ACC, ending: 'callback',
  title: 'Moved their stuff? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Touch nothing. | *Ever.*' },
  last: {
    text: 'The mug? | *Back home.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1080, 280 * k, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 52, hops: [t - lt + 1.4] })
      const d = ease.outBack(prog(lt, 0.8, 1.3))
      if (lt > 0.75) drawBits(x, MUG, MUG_C, 720, lerp(700, 1110, d), 24)
      label(x, 720, 1300, 'MUG: HOME', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 560, 950, t - lt + 1.4, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
