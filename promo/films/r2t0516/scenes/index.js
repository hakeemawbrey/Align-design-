// r2t0516: THE SIGNS AS… v3, "Zodiacs making a wish | *be like.*" (~54 s vertical, signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme version of itself while making a wish. Ending: group.
//   0.0–3.6    "Zodiacs making a wish | *be like.*"
//   3.6–49.2   ♈ blew out the candles before the song · ♉ wished for cake, mid-bite · ♊ forty wishes, remembers none
//              · ♋ spent the wish on everyone else · ♌ wished on a star: their reflection · ♍ submitted it with footnotes
//              · ♎ wished for a match, picked all twelve · ♏ already knows your wish · ♐ chased the shooting star
//              through two countries · ♑ the wish has a five-year plan · ♒ wished for aliens, left them a snack
//              · ♓ wished on an eyelash, cried for an hour
//  49.2        "Twelve wishes. | *Zero candles left.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ffd23a', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
const CAKE = [
  '..F...F...F..',
  '..W...W...W..',
  '..W...W...W..',
  'PPPPPPPPPPPPP',
  'PpPPpPPpPPpPP',
  'CCCCCCCCCCCCC',
  'CCCCCCCCCCCCC',
  'PPPPPPPPPPPPP',
  'CCCCCCCCCCCCC',
  'CCCCCCCCCCCCC',
  'KKKKKKKKKKKKK',
]
const CAKE_C = { F: '#ffb34a', W: '#8fe3ff', P: '#ff8fb1', p: '#ffd0e0', C: '#fff4e2', K: '#c9a6ff' }
const OUT_C = { ...CAKE_C, F: '#140c30' }
const SLICE = ['......PP', '....PPPP', '..PPPPPP', 'CCCCCCCC', 'PPPPPPPP', 'CCCCCCCC', 'CCCCCCCC']
const FORK = ['G.G.G', 'G.G.G', 'GGGGG', '..G..', '..G..', '..G..', '..G..', '..G..']
const STARB = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YY...YY.', 'YY.....YY']
const UFO = ['....GGG....', '...GSSSG...', '.MMMMMMMMM.', 'MMyMMyMMyMM', '.MMMMMMMMM.', '...B...B...']
const UFO_C = { G: '#8fe3ff', S: '#d8f6ff', M: '#9aa5c4', y: '#ffe36a', B: '#7dffb0' }
const COOKIE = ['.CCCC.', 'CCdCCC', 'CCCCdC', 'CdCCCC', '.CCCC.']
const EYELASH = ['.K.K.K.K.', '.K.K.K.K.', 'K.......K', '.KKKKKKK.']

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
function smoke(x, t, cx, cy, t0) {
  if (t < t0) return
  x.save()
  for (let i = 0; i < 9; i++) { const ph = ((t - t0) * 0.8 + i / 9) % 1; x.globalAlpha = 0.55 * (1 - ph); x.fillStyle = '#d8dbe8'; x.fillRect(cx + (i % 3 - 1) * 70 + Math.sin(ph * 6 + i) * 14, cy - ph * 160, 14, 14) }
  x.restore()
}
// a tiny profile card with a sign star in it
function profile(x, t, cx, cy, k, id, rot) {
  card(x, cx, cy, 150, 200, k, rot, x => { x.fillStyle = '#2a2350'; x.fillRect(-62, -86, 124, 120) })
  if (k > 0.5) { x.save(); x.translate(cx, cy); x.rotate(rot); x.translate(-cx, -cy); signChar(x, t, id, cx, cy - 20, 96 * k, { mood: 'happy', seed: id.length, glyph: false, glow: 0.5 }); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText(id.toUpperCase().slice(0, 6), cx, cy + 66); x.restore() }
}

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Blew out the candles | *before the song.*', mood: lt => lt > 0.7 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [0.6],
    front(x, t, lt, P) {
      const out = lt > 0.65
      drawBits(x, CAKE, out ? OUT_C : CAKE_C, 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (out) smoke(x, t, 800, 880, P.t0 + 0.65 * 3.1 / 2.4)
      bubble(x, 800, 690, 'happy birth—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'br' })
      L(x, 790, 1170, 'WISH: SPEEDRUN', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04)
    } },
  { sign: 'taurus', cap: 'Wished for cake. | *Mid-bite.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SLICE, CAKE_C, 800, 980, 26 * k)
      drawBits(x, FORK, { G: '#d8dbe8' }, 650, 920, 12 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.6 })
      L(x, 800, 700, 'WISH: GRANTED', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1160, 'SLICE #3', pop01(t, P.t0 + 1.8, 0.3, 2.2), PINK, 0.04)
    } },
  { sign: 'gemini', cap: 'Made forty wishes. | *Remembers none.*', mood: lt => lt > 1.6 ? 'wide' : 'sparkle', look: [1, 0], star: LS, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 39)
      L(x, 800, 760, `WISH #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 48)
      for (let i = 0; i < 5; i++) { const ph = ((t * 0.6 + i / 5) % 1); drawBits(x, STARB, { Y: i % 2 ? GOLD : BONE }, 700 + i * 50, 1100 - ph * 300, 6, { alpha: Math.sin(Math.PI * ph) }) }
      bubble(x, 800, 1060, 'wait, | what was #1?', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Spent their wish | *on everyone else.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'for mom. | for you. | for the dog.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      hearts(x, t, 800, 1050, P.t0 + 0.8, { n: 7, life: 2.2, spread: 220, cell: 8, seed: 2 })
      L(x, 800, 1150, 'MYSELF: NEXT YEAR', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Wished on a star. | *Their reflection.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: LS, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      card(x, 800, 900, 260, 360, k, 0.04, x => { x.fillStyle = '#bfe6ff'; x.fillRect(-112, -162, 224, 324); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-90, -140, 30, 140) }, GOLD)
      if (k > 0.6) signChar(x, t, 'leo', 800, 900, 170, { mood: lt > 1.1 ? 'wink' : 'sparkle', seed: 81, glyph: false, glow: 0.4 })
      L(x, 800, 650, 'STAR: SPOTTED', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
      sparkles(x, t, 800, 900, P.t0 + 1.3, 7, 170, 0.6)
    } },
  { sign: 'virgo', cap: 'Submitted the wish | *with footnotes.*', mood: 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 920, 280, 360, pop01(t, P.t0 + 0.25, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('MY WISH', 0, -140)
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 9)
        for (let i = 0; i < n; i++) { x.fillStyle = i % 3 === 2 ? '#c9a6ff' : GREY; x.fillRect(-110, -96 + i * 30, i % 3 === 2 ? 140 : 220, 12) }
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; if (lt > 1.4) x.fillText('¹ ² ³ ⁴ ⁵ ⁶', 0, 150)
      })
      L(x, 800, 690, 'PAGE 1 OF 6', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.05, 32)
    } },
  { sign: 'libra', cap: 'Wished for a match. | *Picked all twelve.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      profile(x, t, 700, 900, pop01(t, P.t0 + 0.3, 0.3, 2), 'aries', -0.16)
      profile(x, t, 820, 880, pop01(t, P.t0 + 0.5, 0.3, 2), 'leo', 0)
      profile(x, t, 930, 900, pop01(t, P.t0 + 0.7, 0.3, 2), 'gemini', 0.16)
      L(x, 810, 660, 'YES. YES. ALSO YES.', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 28)
      hearts(x, t, 820, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'Your wish? | Scorpio *already knows.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      card(x, 800, 900, 280, 280, k, 0.05, x => {
        x.strokeStyle = '#6b62a8'; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
        x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = i % 2 ? '#c97bff' : GOLD; x.fillRect(Math.cos(a) * 86 - 7, Math.sin(a) * 86 - 7, 14, 14) }
      })
      L(x, 800, 660, 'READ YOUR CHART', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#c97bff', -0.04, 30, PAPER)
      bubble(x, 800, 1140, '…interesting.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Chased the shooting star. | *Two countries.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [-1, -1], star: RS, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.2, 1.8))
      drawBits(x, STARB, { Y: GOLD }, lerp(260, 160, f), lerp(600, 760, f), 14)
      x.save(); x.globalAlpha = 0.6; x.fillStyle = BONE; for (let i = 1; i < 6; i++) x.fillRect(lerp(260, 160, f) + i * 30, lerp(600, 760, f) - i * 22, 12, 6); x.restore()
      L(x, 340, 1000, 'PASSPORT: STAMPED', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 28)
      L(x, 340, 1100, 'STAR: STILL AHEAD', pop01(t, P.t0 + 1.8, 0.3, 2.2), SKYB, -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Their wish comes with | *a five-year plan.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 270, 260, pop01(t, P.t0 + 0.3, 0.3, 2), -0.04, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('WISH ROADMAP', 0, -100)
        x.fillRect(-100, -70, 4, 160); x.fillRect(-100, 88, 200, 4)
        const p = clamp((lt - 0.5) / 1.1)
        for (let i = 0; i < 5; i++) if (p * 5 > i) { x.fillStyle = '#2fc79a'; x.fillRect(-80 + i * 38, 80 - (i + 1) * 28, 26, (i + 1) * 28) }
      })
      L(x, 800, 660, 'YEAR 1: SAVE', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04)
      L(x, 800, 1140, 'WISH: ON TRACK', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, -0.04)
    } },
  { sign: 'aquarius', cap: 'Wished for aliens. | *Left them a snack.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, -1], star: LS,
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 1.0, 1.3))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = MINT; x.beginPath(); x.moveTo(770, 700); x.lineTo(850, 700); x.lineTo(920, 1060); x.lineTo(700, 1060); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      const f = ease.outCubic(prog(lt, 0.4, 1.0))
      drawBits(x, UFO, UFO_C, 810, lerp(480, 660, f) + Math.sin(t * 3) * 6, 15, { alpha: f })
      drawBits(x, COOKIE, { C: '#e0a85a', d: '#7a4a2e' }, 810, 1060, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 810, 1170, 'FOR THE VISITORS', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Wished on an eyelash. | *Cried for an hour.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 1], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 900, 220, 160, pop01(t, P.t0 + 0.25, 0.3, 2), 0.05, () => drawBits(x, EYELASH, { K: INK }, 0, 0, 14, { outline: null }), '#ffd0e0')
      bubble(x, 800, 690, 'it’s just | so beautiful', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      L(x, 800, 1120, 'WISH: VERY DEEP', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#b7a6ff', -0.04, 32)
    } },
]

// the three-line hook: shrink the title so it fits the width and stays above the stage card's name tab
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
  id: 'r2t0516', key: 'C', accent: ACC, ending: 'group',
  title: 'Zodiacs making a wish | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve wishes. | *Zero candles left.*',
    moods: ['sparkle', 'heart', 'wide', 'heart', 'wink', 'squint', 'heart', 'squint', 'sparkle', 'neutral', 'wide', 'wide'],
    draw(x, t, lt) {
      drawBits(x, CAKE, OUT_C, 420, 700, 17 * pop01(t, t - lt + 0.9, 0.35, 2))
      smoke(x, t, 420, 610, t - lt + 1.2)
      L(x, 730, 700, 'CANDLES: GONE', pop01(t, t - lt + 1.8, 0.3, 2.4), GOLD, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
