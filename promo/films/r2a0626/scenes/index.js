// r2a0626: star_advice, ADVICE SOLO (scorpio), "Scorpio, let them | *see you.*" (signs3kit social cut, music: lofi · D).
// Nine cards: a relatable Scorpio truth + a warm reframe, one gag each: you read everyone, let someone read you ·
// feelings in a vault, crack the door · the mystery is cute, so is your laugh · sunglasses indoors, take them off ·
// testing them again? they passed · say the soft thing out loud · a match asks how you are, tell them ·
// trust takes time, small steps count · being known is scary and so worth it (the curtains open).
// Ending: lesson ("The right people | *love the real you.*") then the last line.
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', ST = { x: -180 }, SG = 'scorpio'

/** a little steel safe whose door swings open by p (0…1), hearts spill out when open */
function vault(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -108, 248, 240)
  x.fillStyle = INK; x.fillRect(-130, -120, 260, 240)
  x.fillStyle = '#5a5f80'; x.fillRect(-120, -110, 240, 220)
  x.fillStyle = NIGHT; x.fillRect(-100, -90, 200, 180)
  x.fillStyle = '#ffe9a8'; x.globalAlpha = 0.5 * p; x.fillRect(-100, -90, 200, 180); x.globalAlpha = 1
  // the door, hinged on the left, foreshortened as it opens
  const dw = 200 * (1 - 0.82 * p)
  x.fillStyle = INK; x.fillRect(-106, -96, dw + 12, 192)
  x.fillStyle = STEEL; x.fillRect(-100, -90, dw, 180)
  if (p < 0.6) { x.fillStyle = INK; x.beginPath(); x.arc(-100 + dw / 2, 0, 34 * (1 - p), 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.fillRect(-100 + dw / 2 - 5, -26 * (1 - p), 10, 22 * (1 - p)) }
  x.restore()
}

/** two curtains that slide apart by p, warm light behind */
function curtains(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#fff1b0'; x.globalAlpha = 0.18 + 0.4 * p; x.fillRect(-150, -170, 300, 340); x.globalAlpha = 1
  x.fillStyle = INK; x.fillRect(-170, -190, 340, 22)
  const w = 150 * (1 - 0.75 * p)
  for (const s of [-1, 1]) {
    const l = s < 0 ? -150 : 150 - w
    x.fillStyle = INK; x.fillRect(l - 6, -168, w + 12, 344)
    x.fillStyle = '#a02a58'; x.fillRect(l, -168, w, 338)
    x.fillStyle = '#c94a7a'; for (let i = 0; i < 4; i++) x.fillRect(l + 12 + i * (w / 4), -168, 8, 338)
  }
  x.restore()
}

const CAMEOS = [
  { sign: SG, cap: 'You read everyone. | Let *someone* read you.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      swapLabel(x, 800, 660, lt, 1.2, 'CLOSED BOOK', 'NOW OPEN ♡', { size: 38, fromBg: STEEL, toBg: MINT })
      L(x, 800, 1080, 'SCORPIO: VOL. 1', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: SG, cap: 'Feelings in a vault? | *Crack the door.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vault(x, t, 800, 880, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.9, 1.5)))
      if (lt > 1.4) hearts(x, t, 800, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
      L(x, 800, 640, 'JUST A LITTLE', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: SG, cap: 'The mystery is cute. | So is *your laugh.*', mood: lt => lt > 1.1 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.1, 1.4],
    front(x, t, lt, P) {
      L(x, 800, 700, '✦ MYSTERIOUS ✦', pop01(t, P.t0 + 0.2, 0.3, 2), '#b04ad0', 0.04, 34)
      const sh = lt > 1.1 && lt < 2.0 ? Math.sin(t * 30) * 4 : 0
      bubble(x, 800 + sh, 920, 'HAHA! snort.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 48, col: GOLD, tail: 'bl' })
      sparkles(x, t, 800, 920, P.t0 + 1.2, 6, 160, 0.3)
    } },
  { sign: SG, cap: 'Sunglasses indoors? | Take them off. *Stay.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P, F) {
      const off = ease.inOutCubic(prog(lt, 0.9, 1.5))
      bits(x, 'SHADES', lerp(F.x, 800, off), lerp(F.cy - 10, 1080, off), 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: off * 0.3 })
      L(x, 800, 680, 'EYES: VISIBLE', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: SG, cap: 'Testing them again? | They *passed.* Twice.', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, head: 'TRUST TEST', headBg: '#b04ad0', lines: [['showed up ✓', '#2f8a48'], ['kept a secret ✓', '#2f8a48'], ['remembered ✓', '#2f8a48'], ['still here ✓', '#2f8a48']], size: 30, progress: clamp((lt - 0.4) / 1.2) })
      L(x, 800, 1110, 'YOU CAN RELAX', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Say the soft thing. | *Out loud.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 800, 820, 'i missed you.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 52, col: PINK, tail: 'bl' })
      L(x, 800, 640, '(whispers)', pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, -0.05, 30)
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 6 })
      L(x, 800, 1040, 'SENT. SURVIVED.', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: SG, cap: 'Match asks how you are? | *Tell them.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ♏︎', headCol: LAV, lines: [['how are you?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['"fine."', STEEL, lt > 0.9 && lt < 1.3 ? 1 : 0, true], ['honestly? nervous', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2), true], ['same :)', MINT, pop01(t, P.t0 + 1.8, 0.25, 2.2)]], size: 20 })
    } },
  { sign: SG, cap: 'Trust takes time. | *Small steps* count.', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.35))
      for (let i = 0; i < 4; i++) { const on = i < n; x.fillStyle = INK; x.fillRect(640 + i * 80 - 4, 1120 - i * 60 - 4, 88, 60 + i * 60 + 8); x.fillStyle = on ? GOLD : '#3a3460'; x.fillRect(640 + i * 80, 1120 - i * 60, 80, 60 + i * 60) }
      L(x, 800, 700, `STEP ${n} ✓`, pop01(t, P.t0 + 0.3, 0.3, 2), MINT, 0.04, 44)
    } },
  { sign: SG, cap: 'Being known is scary. | And *so worth it.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      curtains(x, 800, 870, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.8, 1.6)))
      if (lt > 1.4) hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 8 })
      L(x, 800, 1110, 'TA-DA. IT’S YOU.', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0626', key: 'D', accent: ACC, solo: SG, ending: 'lesson',
  title: 'Scorpio, let them | *see you.*',
  cameos: CAMEOS,
  group: { cap: 'Still mysterious. | Also *very loved.*', mood: 'heart' },
  lesson: { text: 'The right people | *love the real you.*', chip: 'STATUS: SEEN' },
  last: {
    text: 'Keep a little mystery. | *Share the rest.*',
    draw(x, t, lt) {
      bits(x, 'SHADES', 540, 1480, 22 * pop01(t, t - lt + 0.6, 0.35, 2), { rot: 0.1 })
      hearts(x, t, 540, 1420, t - lt + 0.9, { n: 6, life: 2, spread: 260, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
