// r2t0152: star_talk ROLLCALL, "The signs | at a night market." (~57 s vertical, signs3kit social cut, music: lofi · E).
// Ending: 'callback'.
//   0.0–3.6    "The signs | *at a night market.*"
//   3.6–49.2   ♈ spiciest skewer, asked for hotter · ♉ every stall, then back again · ♊ asked forty strangers their sign
//              · ♋ gifts for the whole family tree · ♌ light-up crown all night · ♍ ranked every dumpling, with footnotes
//              · ♎ forty minutes choosing a lantern · ♏ found the secret stall · ♐ came for snacks, left with a goldfish
//              · ♑ haggled a keychain down to free · ♒ birth chart on a T-shirt · ♓ cried at the lanterns, all of them
//  49.2        "Twelve bags. | *Zero regrets.*"
//  52.6        callback: "The goldfish | *got a passport.*"  Sagittarius's goldfish comes back with its papers.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, wheel, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#ffb34a', L = { x: -160 }, R = { x: 160 }
const SKEWER = ['..........SS', '.MMM.MMM.SS.', 'MMMMMMMMSS..', 'MMMMMMMSS...', '.MMM.MSS.MM.', '.....SS.....', '....SS......', '...SS.......', '..SS........', '.SS.........', 'SS..........']
const SKEWER_C = { M: '#c9572e', S: '#e8c68a' }
const FLAME = ['..R...R..', '.RYR.RYR.', 'RYYYRYYYR', 'RYWYYYWYR', '.RYYYYYR.']
const FLAME_C = { R: RED, Y: GOLD, W: '#fff4e2' }
const BOAT = ['W.........W', 'WYYOYYOYYYW', '.WWWWWWWWW.']
const BOAT_C = { W: '#fff4e2', Y: GOLD, O: '#c9572e' }
const BAG = ['..K...K..', '.K.....K.', 'PPPPPPPPP', 'PPPPPPPPP', 'PPWPPPPPP', 'PPPPPPPPP', 'PPPPPPPPP', 'PPPPPPPPP']
const CROWN = ['G...G...G', 'GG.GGG.GG', 'GGGGGGGGG', 'GRGGBGGRG', 'GGGGGGGGG']
const CROWN_C = { G: GOLD, R: RED, B: SKYB }
const LANTERN = ['...KKK...', '.LLLLLLL.', 'LLLLLLLLL', 'LLYLLLYLL', 'LLLLLLLLL', 'LLLLLLLLL', '.LLLLLLL.', '...KKK...', '....Y....', '...YYY...']
const FISH = ['....WWWWW....', '..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWOOWWWWWWW', 'WWWOOOOWWOWWW', 'WWOOKOOOOOWWW', 'WWWOOOOWWOWWW', 'WWWWOOWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..', '....WWWWW....', '.....RRR.....']
const FISH_C = { W: '#9fdcff', O: '#ff9a4a', K: INK, R: RED }
const SHIRT = ['..WW.....WW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', '...WWWWWWW...', '...WWWWWWW...', '...WWWWWWW...', '...WWWWWWW...', '...WWWWWWW...']
const KEYRING = ['.GGG.', 'G...G', 'G...G', '.GGG.', '..G..', '.SSS.', 'SSSSS', '.SSS.', 'S...S']

/** the secret stall: a dark booth, a curtain, a question mark */
function stall(x, cx, cy, k, lt) {
  card(x, cx, cy, 320, 380, k, { bg: NIGHT, rot: 0.02 }, () => {
    x.fillStyle = PURPLE; for (let i = 0; i < 8; i++) x.fillRect(-160 + i * 40, -190, 40, 50 + (i % 2) * 12)
    const open = ease.inOutCubic(prog(lt, 0.8, 1.3))
    x.fillStyle = '#6a2a6e'; x.fillRect(-140, -120, 140 - 90 * open, 300); x.fillRect(0 + 90 * open, -120, 140 - 90 * open, 300)
    if (open > 0.1) { x.globalAlpha = open; txt(x, '?', 0, 30, { size: 120, color: GOLD }); x.globalAlpha = 1 }
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ate the spiciest skewer. | *Asked for hotter.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, SKEWER, SKEWER_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const f = pop01(t, P.t0 + 0.7, 0.3, 2)
      drawBits(x, FLAME, FLAME_C, 760, 720 + Math.sin(t * 14) * 4, 18 * f)
      bubble(x, 790, 1110, 'got hotter?', pop01(t, P.t0 + 1.4 * 1.29, 0.25, 2.2), { size: 44, col: CREAM, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Tried every stall. | *Then went back.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.25))
      for (let i = 0; i < n; i++) drawBits(x, BOAT, BOAT_C, 790 + (i % 2 ? 14 : -14), 1100 - i * 62, 22)
      label(x, 790, 640, 'ROUND TWO', pop01(t, P.t0 + 1.6 * 1.29, 0.3, 2.2), { size: 40, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked forty strangers | *their sign.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(40, Math.floor(Math.max(0, lt - 0.3) * 22))
      bubble(x, 790, 680, 'what’s your | sign??', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, col: CREAM, tail: 'bl' })
      label(x, 790, 960, `ASKED: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Bought gifts for | *the whole family tree.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const C = [PINK, MINT, SKYB, GOLD, LAV]
      for (let i = 0; i < 5; i++) drawBits(x, BAG, { K: INK, P: C[i], W: '#fff' }, 700 + (i % 3) * 100, 1080 - Math.floor(i / 3) * 150 - (i % 2) * 20, 16 * pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2.2))
      label(x, 790, 680, 'GRANDMA’S COUSIN TOO', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Light-up crown. | Wore it *all night.*', mood: 'sparkle', star: { x: -140, y: 30 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      const k = ease.outBack(prog(lt, 0.3, 0.7))
      const blink = 0.6 + 0.4 * Math.sin(t * 10)
      if (k > 0.01) {
        x.save(); x.globalAlpha = 0.35 * blink; x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(F.x, F.top - 30, 120, 0, Math.PI * 2); x.fill(); x.restore()
        drawBits(x, CROWN, CROWN_C, F.x, F.top - 28 - (1 - k) * 200, 14)
      }
      label(x, 790, 760, 'BATTERY: FOREVER', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'you’re | welcome.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, col: CREAM, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Ranked every dumpling. | *With footnotes.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = WOOD; x.fillRect(-60, -215, 120, 34)
        txt(x, 'DUMPLINGS', 0, -150, { size: 30, font: MONO, weight: 700 })
        const R = ['1. pork*', '2. veg**', '3. shrimp†']
        R.forEach((s, i) => { if (lt > 0.5 + i * 0.3) txt(x, s, -130, -80 + i * 60, { size: 34, align: 'left' }) })
        if (lt > 1.5) { x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-130, 110 + i * 22, 260 - i * 50, 8) }
      })
    } },
  { sign: 'libra', cap: 'Forty minutes | *choosing a lantern.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const C = [[PINK, RED], [MINT, GREEN], [GOLD, ORANGE], [SKYB, '#6fc3ff']]
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const pick = Math.floor(lt * 2) % 4
      C.forEach(([a, b], i) => drawBits(x, LANTERN, { K: INK, L: a, Y: b }, 640 + i * 100, 900 + (i % 2) * 40, 12 * k * (i === pick ? 1.25 : 1), { alpha: i === pick ? 1 : 0.6 }))
      label(x, 790, 1120, 'STILL DECIDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Found the secret stall. | *No sign. No menu.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      stall(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1120, 'PASSWORD: ACCEPTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Came for snacks. | Left with *a goldfish.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [-1, 0], star: R, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, FISH, FISH_C, 320, 880 + Math.sin(t * 3) * 6, 20 * pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 320, 1120, 'NAME: NOODLE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Haggled a keychain | *down to free.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, KEYRING, { G: GREY, S: GOLD }, 320, 820, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 2) * 0.15 })
      const p = Math.max(0, 5 - Math.floor(Math.max(0, lt - 0.4) / 0.22))
      label(x, 320, 1080, p > 0 ? `PRICE: ${p}` : 'PRICE: FREE', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: p > 0 ? GOLD : MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 320, 620, 'pleasure.', pop01(t, P.t0 + 1.7 * 1.29, 0.25, 2.2), { size: 40, col: CREAM, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Got their birth chart | *on a T-shirt.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SHIRT, { W: '#6fc3ff' }, 790, 880, 26 * k)
      wheel(x, 790, 900, 70, k, t, 0.1)
      label(x, 790, 1150, 'LIMITED EDITION: 1', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the lanterns. | *All of them.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, -1], star: L,
    back(x, t, lt, P) {
      const C = [[PINK, RED], [GOLD, ORANGE], [MINT, GREEN], [SKYB, '#6fc3ff'], [LAV, PURPLE]]
      for (let i = 0; i < 5; i++) {
        const p = prog(lt, 0.2 + i * 0.25, 2.4 + i * 0.25)
        if (p > 0) drawBits(x, LANTERN, { K: INK, L: C[i][0], Y: C[i][1] }, 640 + i * 70 + Math.sin(t * 2 + i) * 14, lerp(1150, 560, p), 11, { alpha: clamp(p * 5) })
      }
    },
    front(x, t, lt, P) { label(x, 820, 1150, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 }) } },
]

const F = makeFilm({
  id: 'r2t0152', key: 'E', accent: ACC, ending: 'callback',
  title: 'The signs | *at a night market.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve bags. | *Zero regrets.*' },
  last: {
    text: 'The goldfish | *got a passport.*',
    draw(x, t, lt) {
      drawBits(x, FISH, FISH_C, 540, 1080 + Math.sin(t * 3) * 6, 26 * pop01(t, t - lt + 0.4, 0.4, 2))
      card(x, 830, 1080, 220, 300, pop01(t, t - lt + 0.9, 0.4, 2.2), { bg: '#2f3f8f', rot: 0.08 }, () => {
        txt(x, 'PASSPORT', 0, -100, { size: 30, font: MONO, weight: 700, color: GOLD })
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, 10, 50, 0, Math.PI * 2); x.fill()
        x.fillStyle = ORANGE; x.beginPath(); x.ellipse(0, 10, 30, 18, 0, 0, Math.PI * 2); x.fill(); x.fillRect(24, -2, 22, 24)
        txt(x, 'NOODLE', 0, 105, { size: 28, font: MONO, weight: 700, color: CREAM })
      })
      sparkles(x, t, 830, 1080, t - lt + 1.3, 6, 180, 0.3)
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 240, 1110, 210 * k, { mood: lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], seed: 47, hops: [t - lt + 1.7] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
