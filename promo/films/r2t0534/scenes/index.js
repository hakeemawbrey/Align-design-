// r2t0534: star_talk, ROLLCALL (twelve signs), "The signs | painting a room." (signs3kit social cut, music: lofi · D).
// Each sign's most extreme decorating self. Ending: group (twelve colours, one room).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -180 }
const ROLLER = ['PPPPPPPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP', 'KKKKKKKKKK', '.........K', '.........K', '....KKKKKK', '....K.....', '....W.....', '....W.....', '....W.....', '....W.....', '....W.....']
const CAN = ['.KKKKKKKK.', 'KSSSSSSSSK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', '.KKKKKKKK.']
const roller = (x, cx, cy, cell, col, o) => drawBits(x, ROLLER, { P: col, K: INK, W: '#8a4a2e' }, cx, cy, cell, o)
const can = (x, cx, cy, cell, col, o) => drawBits(x, CAN, { P: col, K: INK, S: STEEL }, cx, cy, cell, o)
/** a wall square (an outlined rectangle), painted bottom-up by p, with an optional second colour */
function wall(x, cx, cy, w, h, k, cols, p = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  const n = cols.length
  cols.forEach((c, i) => { x.fillStyle = c; x.fillRect(-w / 2 + i * w / n, h / 2 - h * clamp(p), w / n + 0.5, h * clamp(p)) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Whole room. | *Four minutes.* Still wet.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.2, 0.5, 0.8, 1.1],
    front(x, t, lt, P) {
      wall(x, 800, 830, 300, 300, pop01(t, P.t0 + 0.15, 0.3, 2), [RED], clamp((lt - 0.2) / 0.8))
      roller(x, 680, 830 - 120 * Math.sin(t * 18), 8, RED, { rot: 0.2 })
      L(x, 800, 1070, 'WET PAINT!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.05, 36)
    } },
  { sign: 'taurus', cap: 'Picked “beige.” | After *nine months.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const shades = ['#e8d6b8', '#e3cfae', '#ead9bd', '#e6d3b3']
      shades.forEach((c, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2); if (k > 0.01) { x.save(); x.translate(720 + (i % 2) * 160, 760 + Math.floor(i / 2) * 170); x.rotate((i - 1.5) * 0.05); x.scale(k, k); x.fillStyle = INK; x.fillRect(-66, -76, 132, 152); x.fillStyle = c; x.fillRect(-60, -70, 120, 110); x.fillStyle = CREAM; x.fillRect(-60, 40, 120, 30); x.fillStyle = INK; x.font = '700 18px monospace'; x.textAlign = 'center'; x.fillText(`BEIGE ${i + 1}`, 0, 60); x.restore() } })
      L(x, 800, 1110, 'CHOSE: BEIGE 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Every wall | a *different colour.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.2, 1.7],
    front(x, t, lt, P) {
      wall(x, 800, 840, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), [MINT, PINK, GOLD, SKYB], clamp((lt - 0.3) / 1.0))
      L(x, 800, 1070, 'VIBE: ALL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Painted around | the *height marks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      wall(x, 800, 840, 300, 340, k, ['#8fc9ff'], clamp((lt - 0.3) / 0.9))
      if (k > 0.5) { x.save(); x.fillStyle = CREAM; x.fillRect(740, 700, 120, 290); x.fillStyle = INK; x.font = '700 22px monospace'; x.textAlign = 'center'; ;[['AGE 9', 730], ['AGE 7', 820], ['AGE 5', 910]].forEach(([s, y]) => { x.fillRect(750, y + 10, 100, 4); x.fillText(s, 800, y) }); x.restore() }
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 3, life: 1.2, spread: 120, cell: 6, seed: 6 })
    } },
  { sign: 'leo', cap: 'Gold. | *Every* wall.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      wall(x, 800, 830, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), [GOLD], clamp((lt - 0.3) / 0.8))
      L(x, 800, 1060, 'SHADE: “ME”', pop01(t, P.t0 + 1.2, 0.3, 2.4), ACC, 0.04, 34)
      sparkles(x, t, 800, 830, P.t0 + 1.2, 8, 200, 0.1)
    } },
  { sign: 'virgo', cap: 'Taped the room | for *three days.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      wall(x, 800, 830, 300, 300, k, [CREAM], 0)
      if (k > 0.5) { x.save(); x.fillStyle = '#7fa7ff'; const n = Math.floor(clamp((lt - 0.3) / 1.2) * 8); for (let i = 0; i < n; i++) { x.fillRect(660, 700 + i * 34, 280, 10) } x.restore() }
      L(x, 800, 1070, 'PAINTED: 0%', pop01(t, P.t0 + 1.5, 0.3, 2.4), STEEL, -0.04, 32)
    } },
  { sign: 'libra', cap: '“Eggshell or ivory?” | Asked *their match.*', mood: 'wide', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MATCH ♡', headCol: PINK, lines: [['eggshell or', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true], ['ivory??', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2), true], ['…same?', MINT, pop01(t, P.t0 + 1.5, 0.25, 2.2)]] })
    } },
  { sign: 'scorpio', cap: 'Painted it black. | Called it *“cozy.”*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      wall(x, 800, 830, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), ['#0a0616'], clamp((lt - 0.3) / 0.8))
      bits(x, 'CANDLE', 800, 860, 10 * pop01(t, P.t0 + 1.1, 0.3, 2))
      L(x, 800, 1060, 'SO COZY', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Got bored. | Left *half a wall.*', mood: 'happy', look: [1, -1], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      wall(x, 800, 830, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), [LAV, CREAM], clamp((lt - 0.2) / 0.5))
      bubble(x, 800, 1060, 'good enough!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Under budget. | *To the cent.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'RECEIPT', headBg: '#7fa7c9', headInk: INK, lines: ['paint   40.00', 'tape     4.99', 'brush    3.01', 'left     0.00'], size: 26, font: 'monospace', weight: 700, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1080, 'NAILED IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Painted | *only the ceiling.*', mood: 'sparkle', look: [0, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(130, 528, 820, 64); x.fillStyle = SKYB; x.fillRect(136, 534, 808 * clamp((lt - 0.3) / 0.9), 52); x.restore() }
      roller(x, 820, 720, 12 * k, SKYB, { rot: Math.PI })
      L(x, 800, 1060, 'WALLS: OPTIONAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Painted a sky. | *Cried* at it.', mood: 'wide', tears: 3, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      wall(x, 800, 830, 300, 300, k, ['#8fc9ff'], clamp((lt - 0.3) / 0.8))
      if (lt > 1.0) bits(x, 'CLOUD', 800, 800, 12 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 1060, 'IT’S SO PRETTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0534', key: 'D', accent: ACC, ending: 'group',
  title: 'The signs | *painting a room.*',
  cameos: CAMEOS,
  group: { cap: 'One room. | *Twelve* colours.', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'squint', 'wide', 'squint', 'happy', 'neutral', 'sparkle', 'wide'],
    draw(x, t, lt) {
      const t0 = t - lt
      ;[RED, '#e8d6b8', MINT, '#8fc9ff', GOLD, CREAM, PINK, '#2a1a4a', LAV, '#7fa7c9', SKYB, '#c9e4ff'].forEach((c, i) => {
        const k = pop01(t, t0 + 1.3 + i * 0.06, 0.3, 2)
        if (k > 0.01) { x.save(); x.translate(200 + i * 62, 760); x.scale(k, k); x.fillStyle = INK; x.fillRect(-28, -46, 56, 92); x.fillStyle = c; x.fillRect(-22, -40, 44, 80); x.restore() }
      })
    } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
