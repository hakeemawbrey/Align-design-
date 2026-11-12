// r2t0566: star_talk, SOLO (libra), "Libras on their birthday | *be like.*" (signs3kit social cut, music: lofi · C).
// Ending: callback (the restaurant scale from card 1 finally tips, at 11:59).
//   where to eat? still deciding · seven outfits, one party · cut the cake with a ruler · invited both exes, to keep it
//   fair · group photo, take forty-two · two cakes, hurt no one's feelings · seating chart sorted by compatibility
//   · one balloon off-colour, party paused · friends argued, Libra mediated in a tiara.
//   group "Their birthday? | A *peace summit.*"   last "Dinner decided: | *at 11:59.*" (the scale tips)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'libra', ACC = '#ff8fb1', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// a balance scale with two pans; tilt in radians (+ = right pan down)
function scale(x, cx, cy, k, tilt, left, right) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 288); x.fillRect(-84, 144, 168, 16)
  x.save(); x.translate(0, -140); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-200, -10, 400, 20); x.fillStyle = GOLD; x.fillRect(-196, -5, 392, 10)
  for (const [s, text] of [[-1, left], [1, right]]) {
    x.save(); x.translate(s * 190, 0); x.rotate(-tilt)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-70, 120); x.moveTo(0, 0); x.lineTo(70, 120); x.stroke()
    x.fillStyle = INK; x.fillRect(-92, 116, 184, 26); x.fillStyle = GOLD; x.fillRect(-86, 120, 172, 16)
    L(x, 0, 90, text, 1, s < 0 ? MINT : PINK, 0, 34)
    x.restore()
  }
  x.restore(); x.fillStyle = '#fff1b0'; x.fillRect(-12, -152, 24, 24)
  x.restore()
}
const CAKE = [
  '...F..F..F...',
  '...C..C..C...',
  '...C..C..C...',
  '.PPPPPPPPPPP.',
  'PpPPpPPPpPPpP',
  'WWWWWWWWWWWWW',
  'PPPPPPPPPPPPP',
  'WWWWWWWWWWWWW',
  'PPPPPPPPPPPPP',
]
const CAKE_C = { F: '#ffb34a', C: '#8fe3ff', P: '#ff8fb1', p: '#ffd0e0', W: '#fff4e2' }
const CAKE2_C = { F: '#ffb34a', C: '#ff8fb1', P: '#7dffb0', p: '#d6ffe6', W: '#fff4e2' }
const RULER = ['YYYYYYYYYYYYYYYYYYYY', 'Y.Y.Y.Y.Y.Y.Y.Y.Y.YY', 'YYYYYYYYYYYYYYYYYYYY']
const CAMERA = [
  '...KKK.......',
  'KKKKKKKKKKKKK',
  'KGGGGGGGGGGGK',
  'KGGG.....GGGK',
  'KGG..LLL..GGK',
  'KGG..LWL..GGK',
  'KGG..LLL..GGK',
  'KGGG.....GGGK',
  'KGGGGGGGGGGGK',
  'KKKKKKKKKKKKK',
]
const CAMERA_C = { K: '#2a2350', G: '#9aa5c4', L: '#8fe3ff', W: '#ffffff' }
const TIARA = ['Y...Y...Y', 'YY.YPY.YY', 'YYYYYYYYY']
const TIARA_C = { Y: GOLD, P: '#ff8fb1' }
const BALLOON = ['.BBB.', 'BBBBB', 'BWBBB', 'BBBBB', '.BBB.', '..B..']
// clothes rack with hangers
function rack(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -170, 400, 14); x.fillRect(-200, -170, 12, 340); x.fillRect(188, -170, 12, 340)
  x.fillStyle = '#c9c9d8'; x.fillRect(-196, -166, 392, 6)
  const COLS = [PINK, MINT, LAV, GOLD, SKYB, ORANGE, '#ff6b5a']
  for (let i = 0; i < 7; i++) {
    const px = -160 + i * 53, a = i < n ? 1 : 0.18
    x.globalAlpha = a; x.fillStyle = INK; x.fillRect(px - 22, -150, 48, 150); x.fillStyle = COLS[i]; x.fillRect(px - 18, -146, 40, 142)
    x.fillStyle = INK; x.fillRect(px, -166, 4, 18)
  }
  x.restore()
}
// paper seating chart: pairs of glyphs with hearts
function chartSheet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -186, 340, 380)
  x.fillStyle = INK; x.fillRect(-176, -200, 352, 400); x.fillStyle = CREAM; x.fillRect(-168, -192, 336, 384)
  x.fillStyle = LAV; x.fillRect(-168, -192, 336, 62)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEATING', 0, -160)
  const PAIRS = [['♈︎', '♎︎'], ['♉︎', '♋︎'], ['♊︎', '♒︎'], ['♌︎', '♐︎']]
  PAIRS.forEach(([a, b], i) => {
    const y = -90 + i * 72, on = clamp((lt - 0.4 - i * 0.25) * 4)
    x.globalAlpha = on
    x.fillStyle = '#e8dcc6'; x.beginPath(); x.ellipse(0, y, 120, 26, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.font = `700 36px 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.fillText(a, -70, y + 2); x.fillText(b, 70, y + 2)
    drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 0, y, 5)
    x.globalAlpha = 1
  })
  x.restore()
}
// a scowly little star with a bubble
function grump(x, t, cx, cy, id, k, happy, text, seed) {
  if (k <= 0.01) return
  signChar(x, t, id, cx, cy, 150 * k, { mood: happy ? 'happy' : 'squint', seed, glyph: false })
  if (!happy) bubble(x, cx, cy - 130, text, k, { size: 30, col: '#ffd0d0', tail: 'bc' })
}

const ST = { x: -180 }
const CAMEOS = [
  // 1 · where to eat
  { sign: S, cap: 'Where to eat? | *Still deciding.*', mood: lt => lt > 1.5 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      scale(x, 770, 880, 0.72 * pop01(t, P.t0 + 0.2, 0.35, 2), 0.22 * Math.sin(t * 4.2), 'TACOS', 'SUSHI')
      L(x, 790, 1130, '11:47 PM', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 36)
    } },
  // 2 · outfits
  { sign: S, cap: 'Seven outfits. | *One party.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 6)
      rack(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), n)
      L(x, 790, 640, `OUTFIT ${n}/7`, pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, -0.05, 36)
      bubble(x, 790, 1110, 'okay, the first one', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  // 3 · ruler cake
  { sign: S, cap: 'Cut the cake | with a *ruler.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0.3], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAKE, CAKE_C, 790, 900, 24 * k)
      const r = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, RULER, { Y: GOLD }, 790 + Math.sin(t * 3) * 30, 760, 14 * r, { rot: -0.05 })
      L(x, 790, 1110, 'EXACTLY 1/12 EACH', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  // 4 · both exes
  { sign: S, cap: 'Invited both exes. | *To be fair.*', mood: lt => lt > 1.4 ? 'happy' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'scorpio', 650, 920, 170 * k, { mood: 'squint', look: [1, 0], seed: 31, glyph: false })
        signChar(x, t, 'gemini', 920, 920, 170 * k, { mood: 'wide', look: [-1, 0], seed: 32, glyph: false })
      }
      L(x, 650, 1080, 'EX #1', k, LAV, -0.05, 28); L(x, 920, 1080, 'EX #2', k, SKYB, 0.05, 28)
      L(x, 790, 650, 'SEATED VERY APART', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  // 5 · group photo
  { sign: S, cap: 'Group photo? | Take *forty-two.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAMERA, CAMERA_C, 790, 860, 20 * k)
      const n = 30 + Math.floor(clamp((lt - 0.4) / 1.6) * 12)
      L(x, 790, 650, `TAKE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 40)
      const fl = (lt * 2.4) % 1; if (lt > 0.5 && fl < 0.15) { x.fillStyle = `rgba(255,250,235,${(0.35 * (1 - fl / 0.15)).toFixed(3)})`; x.fillRect(110, 480, 860, 740) }
      bubble(x, 790, 1100, 'the lighting!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  // 6 · two cakes
  { sign: S, cap: 'Two cakes. | Hurt *no one’s feelings.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 680, 900, 15 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, CAKE, CAKE2_C, 900, 900, 15 * pop01(t, P.t0 + 0.5, 0.35, 2))
      L(x, 680, 760, 'CHOC', pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, -0.05, 28)
      L(x, 900, 760, 'VANILLA', pop01(t, P.t0 + 0.7, 0.3, 2.2), MINT, 0.05, 28)
      L(x, 790, 1100, 'BOTH. OBVIOUSLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.03, 32)
    } },
  // 7 · Align: seating by compatibility
  { sign: S, cap: 'Seating chart? | Sorted by *compatibility.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chartSheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      hearts(x, t, 790, 700, P.t0 + 1.7, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 5 })
    } },
  // 8 · balloon off-colour
  { sign: S, cap: 'One balloon off-colour. | *Party paused.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, -0.4], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const COLS = [PINK, PINK, PINK, '#ff6b2a', PINK]
      COLS.forEach((c, i) => {
        const bx = 640 + i * 75, by = 800 + Math.sin(t * 2 + i) * 10 + (i % 2) * 40
        x.strokeStyle = BONE; x.lineWidth = 2; x.globalAlpha = k; x.beginPath(); x.moveTo(bx, by + 40); x.lineTo(bx + 5, by + 190); x.stroke(); x.globalAlpha = 1
        drawBits(x, BALLOON, { B: c, W: '#fff' }, bx, by, 13 * k)
      })
      if (lt > 1.0) drawBits(x, ['RR...RR', '.RR.RR.', '..RRR..', '.RR.RR.', 'RR...RR'], { R: RED }, 865, 780, 8 * pop01(t, P.t0 + 1.1 * 1.29, 0.25, 2.4))
      L(x, 790, 1120, 'PARTY: PAUSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 34, CREAM)
    } },
  // 9 · mediated in a tiara
  { sign: S, cap: 'Friends argued. | Libra mediated. *In a tiara.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P, F) {
      drawBits(x, TIARA, TIARA_C, F.x, F.top - 26, 12 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const happy = lt > 1.4, k = pop01(t, P.t0 + 0.3, 0.35, 2)
      grump(x, t, 680, 960, 'aries', k, happy, 'hmph', 41)
      grump(x, t, 900, 960, 'taurus', k, happy, 'hmph!', 42)
      L(x, 790, 680, 'PEACE RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
      if (happy) hearts(x, t, 790, 900, P.t0 + 1.5, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 8 })
    } },
]

// the hook is long: shrink the title block so it stays on two lines above the name tab
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

const F = makeFilm({
  id: 'r2t0566', key: 'C', accent: ACC, solo: S,
  title: 'Libras on their birthday | *be like.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Their birthday? | A *peace summit.*', mood: 'sparkle' },
  last: {
    text: 'Dinner decided: | *at 11:59.*',
    draw(x, t, lt) {
      const tip = ease.outBounce ? ease.outBounce(prog(lt, 0.7, 1.5)) : ease.outCubic(prog(lt, 0.7, 1.5))
      scale(x, 540, 1060, pop01(t, t - lt + 0.2, 0.35, 2), lt < 0.7 ? 0.2 * Math.sin(t * 6) : 0.3 * tip, 'TACOS', 'SUSHI')
      L(x, 540, 1330, 'SUSHI. FINAL. MAYBE.', pop01(t, t - lt + 1.6, 0.3, 2.4), GOLD, -0.03, 32)
      sparkles(x, t, 730, 1000, t - lt + 1.5, 7, 140, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
