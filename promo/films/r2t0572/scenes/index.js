// r2t0572: THE SIGNS AS… v3, "Zodiacs when it's their turn to cook | *be like.*" (~54 s vertical, signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each the most extreme version of itself on cooking night. Ending: group.
//   0.0–3.6    "Zodiacs when it's their turn to cook | *be like.*"
//   3.6–49.2   ♈ cranked it to max, done in four minutes · ♉ ate it all while plating · ♊ started three recipes, made a
//              fourth · ♋ cooked for twelve, there are two of you · ♌ named the dish after themself · ♍ measured the salt
//              with tweezers · ♎ polled all twelve signs, nobody's eaten · ♏ secret recipe, locked · ♐ a dish from abroad,
//              can't pronounce it · ♑ meal-prepped the whole month · ♒ cereal, but warm · ♓ chopped onions, still crying
//  49.2        "Dinner is served. | *Sort of.*"  a takeout bag drops in. (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#7dffb0', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4', STEEL = '#c9c9d8'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
const PAN = ['..BBBBBBB.......', '.BFFFFFFFB......', 'BFFFFFFFFFBHHHHH', '.BBBBBBBBB......']
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const POT = ['.H.........H.', 'HPPPPPPPPPPPH', '.PPPPPPPPPPP.', '.PPPPPPPPPPP.', '.PPPPPPPPPPP.', '.PPPPPPPPPPP.', '..PPPPPPPPP..']
const ONION = ['....G....', '...GG....', '..OOOO...', '.OOoOOO..', 'OOOoOOOO.', 'OOOoOOOO.', '.OOoOOO..', '..OOOO...']
const BOWL = ['WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..', '...WWWWW...']
const TWEEZ = ['K.......', '.K......', '..K.....', '...KKKKK', '..K.....', '.K......', 'K.......']
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'GGGGGGGG', 'GGGKKGGG', 'GGGKKGGG', 'GGGGGGGG']
const BAG = ['..K....K..', '..K....K..', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBWWWWBBB', 'BBBWWWWBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
function txt(x, s, px, py, size, col = INK, font = INTER, w = 800) { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py) }
function steam(x, t, cx, cy, { n = 6, col = '#e8e8f4', h = 140, alpha = 0.6 } = {}) {
  x.save()
  for (let i = 0; i < n; i++) { const ph = ((t * 0.7 + i / n) % 1); x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillStyle = col; x.fillRect(cx + ((i % 3) - 1) * 40 + Math.sin(ph * 6 + i) * 12 - 7, cy - ph * h, 14, 14) }
  x.restore()
}
// a stove dial that swings to MAX
function dial(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, 7); x.fill()
  x.fillStyle = STEEL; x.beginPath(); x.arc(0, 0, 86, 0, 7); x.fill()
  txt(x, 'LOW', -60, 60, 20, INK, MONO, 700); txt(x, 'MAX', 60, 60, 20, RED, MONO, 700)
  x.rotate(lerp(-2.2, 2.2, ease.outBack ? ease.outBack(prog(lt, 0.3, 0.7)) : prog(lt, 0.3, 0.7)))
  x.fillStyle = INK; x.fillRect(-12, -80, 24, 70)
  x.restore()
}

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Cranked it to max. | *Done in four minutes.*', mood: lt => lt > 0.8 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [0.6],
    front(x, t, lt, P) {
      dial(x, 800, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      drawBits(x, PAN, { B: STEEL, F: '#3a2a1e', H: BROWN }, 770, 1010, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      steam(x, t, 790, 980, { col: '#6b6b80', alpha: 0.7 })
      L(x, 800, 1130, 'CRISPY: VERY', pop01(t, P.t0 + 1.5, 0.3, 2.2), ORANGE, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Ate it all | *while plating.*', mood: lt => lt > 1.4 ? 'sleepy' : 'heart', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), left = 1 - clamp((lt - 0.4) / 1.0)
      drawBits(x, PLATE, { W: PAPER }, 800, 960, 22 * k)
      if (left > 0.02) { x.save(); x.globalAlpha = k; x.fillStyle = ORANGE; x.fillRect(800 - 90 * left, 920, 180 * left, 40); x.fillStyle = '#5fd068'; x.fillRect(800 - 50 * left, 900, 100 * left, 24); x.restore() }
      L(x, 800, 700, 'TASTE TEST #14', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 32)
      bubble(x, 800, 1130, 'chef’s kiss.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Started three recipes. | *Made a fourth.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: LS,
    front(x, t, lt, P) {
      const R = ['TACOS', 'SOUP', 'CAKE']
      for (let i = 0; i < 3; i++) card(x, 700 + i * 100, 820 + (i % 2) * 40, 150, 190, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), (i - 1) * 0.12, x => { txt(x, R[i], 0, -60, 26, INK, MONO, 700); x.fillStyle = GREY; for (let j = 0; j < 3; j++) x.fillRect(-50, -16 + j * 30, 100, 10); x.strokeStyle = RED; x.lineWidth = 8; if (lt > 0.9 + i * 0.25) { x.beginPath(); x.moveTo(-60, -70); x.lineTo(60, 70); x.stroke() } })
      L(x, 800, 1090, 'RECIPE 4: SOUP-TACO', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Cooked for twelve. | *There are two of you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, POT, { H: '#2a2350', P: '#5fb4ff' }, 790, 960, 24 * k)
      steam(x, t, 800, 840, { n: 8, h: 180 })
      L(x, 800, 680, 'SERVES: 40', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.04, 36)
      L(x, 800, 1150, 'LEFTOVERS: A MONTH', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: 'leo', cap: 'Named the dish | *after themself.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: LS, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 800, 900, 300, 380, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        x.fillStyle = GOLD; x.fillRect(-150, -190, 300, 16); x.fillRect(-150, 174, 300, 16)
        txt(x, 'TONIGHT', 0, -140, 24, '#6b62a8', MONO, 700)
        txt(x, 'Pasta', 0, -70, 44, INK, "'EB Garamond', Georgia, serif", 600)
        txt(x, 'à la Leo', 0, -18, 44, ORANGE, "'EB Garamond', Georgia, serif", 600)
      })
      if (lt > 0.5) signChar(x, t, 'leo', 800, 990, 120, { mood: 'wink', seed: 81, glyph: false, glow: 0.4 })
      L(x, 800, 650, 'A MASTERPIECE', pop01(t, P.t0 + 1.4, 0.3, 2.2), ORANGE, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Measured the salt | *with tweezers.*', mood: 'squint', look: [1, 0.5], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TWEEZ, { K: STEEL }, 780, 860, 18 * k, { rot: 0.3 })
      if (lt > 0.6) { x.fillStyle = '#ffffff'; x.fillRect(870, 900, 10, 10) }
      card(x, 800, 1040, 240, 60, k, 0, () => txt(x, '0.4 g', 0, 2, 34, '#2fc79a', MONO, 700), '#2a2350')
      L(x, 800, 680, 'EXACTLY ONE GRAIN', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Polled all twelve signs. | *Nobody’s eaten.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 880, 300, 260, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        txt(x, 'PASTA OR RICE?', 0, -96, 26, INK, MONO, 700)
        const p = clamp((lt - 0.4) / 1.0)
        x.fillStyle = PINK; x.fillRect(-120, -50, 230 * p * 0.5, 40); txt(x, '6', 130, -30, 28, INK, MONO, 700)
        x.fillStyle = SKYB; x.fillRect(-120, 10, 230 * p * 0.5, 40); txt(x, '6', 130, 30, 28, INK, MONO, 700)
        txt(x, 'TIE. AGAIN.', 0, 90, 28, RED, MONO, 700)
      })
      L(x, 800, 1110, 'DINNER: 9:45 PM', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Secret recipe. | You’ll *never know.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 920, 280, 220, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => { x.fillStyle = BROWN; x.fillRect(-140, -110, 280, 50); txt(x, 'RECIPES', 0, -84, 26, PAPER, MONO, 700) }, '#c8935a')
      drawBits(x, LOCK, { K: STEEL, G: GOLD }, 800, 960, 14 * pop01(t, P.t0 + 0.7, 0.3, 2.4))
      bubble(x, 800, 680, 'it’s… love.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 1150, 'ACCESS: DENIED', pop01(t, P.t0 + 1.9, 0.3, 2.2), '#c97bff', -0.04, 30, PAPER)
    } },
  { sign: 'sagittarius', cap: 'A dish from abroad. | *Can’t pronounce it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [-1, 0], star: RS, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, BOWL, { W: '#ff9a4a' }, 300, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 300, 920)
      bubble(x, 300, 700, 'it’s called… | uh…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'br' })
      L(x, 300, 1110, 'SOUVENIR SPICES: 31', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 26)
    } },
  { sign: 'capricorn', cap: 'Meal-prepped | *the whole month.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(clamp((lt - 0.2) / 1.2) * 12) + 1)
      for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3); card(x, 710 + c * 92, 1060 - r * 70, 84, 58, 1, 0, x => { x.fillStyle = '#5fd068'; x.fillRect(-30, -14, 26, 20); x.fillStyle = ORANGE; x.fillRect(2, -14, 26, 20) }, '#d8f0ff') }
      L(x, 800, 700, 'DAY 1 OF 30', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Cereal. | *But warm.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, BOWL, { W: SKYB }, 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); for (let i = 0; i < 7; i++) { x.fillStyle = [GOLD, PINK, MINT][i % 3]; x.fillRect(720 + i * 24, 920 + (i % 2) * 8, 16, 16) } x.restore()
      steam(x, t, 800, 900)
      L(x, 800, 690, 'A NEW CUISINE', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 32)
      L(x, 800, 1130, 'MICROWAVED: 2 MIN', pop01(t, P.t0 + 1.8, 0.3, 2.2), BONE, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Chopped one onion. | *Still crying.*', mood: 'wide', tears: lt => lt < 0.7 ? 1 : 3, look: [1, 1], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ONION, { G: '#5fd068', O: '#e8c8f0', o: '#b78fd0' }, 800, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 680, 'it’s so | beautiful', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 1140, 'HOUR TWO', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#b7a6ff', -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0572', key: 'E', accent: ACC, ending: 'group',
  title: 'Zodiacs when it’s their turn to cook | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Dinner is served. | *Sort of.*',
    moods: ['wide', 'sleepy', 'wink', 'heart', 'sparkle', 'squint', 'neutral', 'squint', 'sparkle', 'happy', 'wide', 'wide'],
    draw(x, t, lt) {
      const t0 = t - lt, d = ease.outCubic(prog(lt, 1.6, 2.2))
      if (lt > 1.6) drawBits(x, BAG, { K: BROWN, B: '#c8935a', W: PAPER }, 540, lerp(420, 680, d), 24)
      L(x, 540, 480, 'TAKEOUT: ON THE WAY', pop01(t, t0 + 2.4, 0.3, 2.4), GOLD, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
// the hook is long: shrink the title so it fits the width and stays above the stage card's name tab
function fitTitleScenes(SCENES, maxW = 940, maxH = 268) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const prev = tb.style.display; tb.style.display = 'block'
      const scale = k => { tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'; for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px' }
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) scale((maxW - 8) / widest)
      for (let i = 0; i < 8 && tb.offsetHeight > maxH; i++) scale(0.94)
      tb.style.display = prev
    }
    return r
  }]
}
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
