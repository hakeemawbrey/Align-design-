// r2a0712: star_advice, ADVICE SOLO, "Scorpio, it's okay | to start over." (signs3kit social cut, music: lofi · F, ending: callback)
// One sign the whole way (solo mode, 9 cards): a relatable Scorpio truth + a warm reframe, one visual gag each.
//   0.0–3.6    "Scorpio, it’s okay | *to start over.*"
//   3.6–37.8   nine cards: new era in the mirror · a brighter playlist · rearranged the room at 2 a.m. · packing up the
//              past (keep the lessons box) · page one of a new notebook · trust slowly (a door opened a crack)
//              · new match? say hi first · the plant didn't make it, grow a new one · rising, softly (a little phoenix)
//  37.8        "Deep heart. | *Fresh page.*"
//  41.2        callback: "The new plant? | *Thriving.*"  The sprout comes back in full bloom.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, sofa, POT, POT_C, SPROUT, SPROUT_C, DEAD, DEAD_C, FLOWER, FLOWER_C, BIRDFIRE, BIRDFIRE_C, RED, CREAM, GREEN, ORANGE, VIOLET, WOOD, NIGHT } from './props.js'

const S = 'scorpio', ROSE = '#ff5e8a'
// a pot with something in it: 'dead' | 'sprout' | 'bloom'
function plant(x, cx, cy, cell, k, what, t = 0) {
  if (k <= 0.01) return
  drawBits(x, POT, POT_C, cx, cy, cell * k)
  if (what === 'dead') drawBits(x, DEAD, DEAD_C, cx, cy - 8 * cell * k, cell * k)
  else if (what === 'sprout') drawBits(x, SPROUT, SPROUT_C, cx, cy - 6 * cell * k, cell * k)
  else { drawBits(x, FLOWER, FLOWER_C, cx, cy - 9 * cell * k, cell * k, { rot: 0.05 * Math.sin(t * 2) }); drawBits(x, FLOWER, { ...FLOWER_C, P: '#ff9ac0' }, cx - 5 * cell * k, cy - 7 * cell * k, cell * 0.7 * k, { rot: -0.2 }); drawBits(x, FLOWER, { ...FLOWER_C, P: LAV }, cx + 5 * cell * k, cy - 7 * cell * k, cell * 0.7 * k, { rot: 0.2 }) }
}
// a cardboard box with a sticker
function box(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -90, 320, 210)
  x.fillStyle = INK; x.fillRect(-168, -108, 336, 216); x.fillStyle = '#c99a5a'; x.fillRect(-160, -100, 320, 200)
  x.fillStyle = '#a87a3a'; x.fillRect(-160, -100, 320, 40); x.fillStyle = '#e8c88a'; x.fillRect(-20, -100, 40, 200)
  x.restore()
  label(x, cx, cy + 20, text, k, { size: 30, bg: CREAM, font: MONO, weight: 700, rot: -0.04 })
}
// a mirror with sparkles
function mirror(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 180, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 122, 172, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe8ff'; x.beginPath(); x.ellipse(0, 0, 104, 154, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-60, -110, 18, 90); x.fillRect(-30, -120, 10, 50)
  x.restore()
}
// a door opening a crack, with warm light
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -210, 240, 420)
  x.fillStyle = '#fff1a0'; x.fillRect(-110, -200, 220, 410)
  const w = 220 * (1 - 0.35 * open)
  x.fillStyle = INK; x.fillRect(-110 - 4, -200, w + 8, 410); x.fillStyle = '#8a5ac0'; x.fillRect(-110, -196, w, 402)
  x.fillStyle = '#a87ae0'; x.fillRect(-90, -170, w - 40, 150); x.fillRect(-90, 10, w - 40, 170)
  x.fillStyle = GOLD; x.fillRect(-110 + w - 30, 0, 16, 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'New look, new era? | *Love that for you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      mirror(x, t, 790, 830, k)
      if (k > 0.5) signChar(x, t, S, 790, 840, 150, { mood: lt > 1.2 ? 'wink' : 'neutral', seed: 31, glyph: false, glow: 0.4, alpha: clamp((k - 0.5) * 2) })
      label(x, 790, 1080, 'ERA: NEW ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: ROSE, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'Deleted the sad playlist? | *Make a brighter one.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4, 2.0],
    front(x, t, lt, P, F) {
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW PLAYLIST', headCol: GOLD, lines: [['sunny songs', GOLD, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['dance in kitchen', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)], ['hum loudly', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)]] })
      if (lt > 1.3) notes(x, t, F.x, F.cy - 80, { n: 4, cell: 7, col: GOLD, seed: 3 })
    } },
  { sign: S, cap: 'Moved the sofa at 2 a.m.? | *Fresh start counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', star: { x: 60, y: -40, s: 240 }, hops: [1.4],
    back(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.3))
      sofa(x, lerp(300, 620, p), 1040, 0.85 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 760, 620, '2:00 A.M.', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: LAV, font: MONO, weight: 700, rot: 0.05 })
      label(x, 300, 700, 'NEW VIBE ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: S, cap: 'Packing up the past? | *Keep the lessons.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      box(x, 790, 950, pop01(t, P.t0 + 0.2, 0.35, 2), 'LESSONS: KEEP ♡')
      label(x, 790, 680, 'DRAMA: DONATED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: S, cap: 'Back to page one? | *Great stories start there.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      board(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 360, frame: ROSE, bg: CREAM, rot: 0.05 }, x => {
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CHAPTER 1', 0, -110)
        x.fillStyle = '#c9c0e0'; for (let i = 0; i < 5; i++) x.fillRect(-110, -40 + i * 40, 220 * (i === 4 ? 0.5 : 1) * clamp((lt - 0.6 - i * 0.15) / 0.3), 8)
      })
    } },
  { sign: S, cap: 'Trust feels hard? | *Go slow. That’s allowed.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      door(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.6)))
      bubble(x, 790, 580, 'hi… ?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 790, 1110, 'OPENING: SLOWLY', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: LAV, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: S, cap: 'New match? | *Say hi first. It’s okay.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: ROSE, lines: [['hi :)', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['HI!! finally', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)]] })
      hearts(x, t, 560, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Plant didn’t make it? | *Grow a new one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      plant(x, 680, 1000, 16, k, 'dead')
      plant(x, 880, 1000, 16, pop01(t, P.t0 + 1.0, 0.35, 2), 'sprout')
      label(x, 680, 720, 'RIP, GREG', k, { size: 30, bg: '#c7c0b0', font: MONO, weight: 700, rot: -0.06 })
      label(x, 850, 780, 'HI, GREG 2', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, font: MONO, weight: 700, rot: 0.06 })
    } },
  { sign: S, cap: 'Phoenix energy? | *Rise softly.*', mood: 'sparkle', look: [1, -1], star: { x: -200, y: 30 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.4, 2)
      drawBits(x, BIRDFIRE, BIRDFIRE_C, 800, lerp(940, 780, ease.outCubic(prog(lt, 0.3, 1.5))) + 10 * Math.sin(t * 4), 22 * k, { sy: 1 + 0.08 * Math.sin(t * 8) })
      sparkles(x, t, 800, 800, P.t0 + 1.4, 7, 170, 0.5, [GOLD, ORANGE, PINK])
      label(x, 800, 1100, 'SOFT LAUNCH ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0712', key: 'F', accent: ROSE, solo: S, ending: 'callback',
  title: 'Scorpio, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'Deep heart. | *Fresh page.*', mood: 'heart' },
  last: {
    text: 'Greg 2? | *Thriving.*',
    draw(x, t, lt) {
      const t0 = t - lt
      plant(x, 540, 1260, 26, pop01(t, t0 + 0.4, 0.45, 2), lt > 1.2 ? 'bloom' : 'sprout', t)
      sparkles(x, t, 540, 1000, t0 + 1.2, 9, 230, 0.2, [GOLD, PINK, MINT])
      hearts(x, t, 540, 960, t0 + 1.4, { n: 7, life: 1.8, spread: 360, cell: 8, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
