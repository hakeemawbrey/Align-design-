// r2a0167: star_advice, ADVICE SOLO, "What Aquarians need | after a fight." (~51 s vertical, signs3kit social cut,
// music: lofi · F). One sign the whole film (makeFilm solo mode, 9 cards): a relatable Aquarius truth + a warm reframe.
//   0.0–3.6    "What Aquarians need | *after a fight.*"
//   3.6–37.8   space (take it, then land: a little UFO) · a pros-and-cons list (add how you feel) · went quiet (say "I
//              need a minute") · don't want it fixed (ask to be heard) · the apology is a meme (add one real sentence)
//              · replaying it on loop (you can press stop) · feel boxed in (love can have windows) · the right person
//              gives you room to orbit (Leo) · coming back after is the love part
//  37.8        "Big space. | *Bigger heart.*"
//  41.0        LESSON: "Space isn’t leaving. | It’s how you *come back.*"  STATUS: LANDED
//  46.9        "Leo saved you | *a seat.*" over the match card: Aquarius + Leo (the orbit, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'aquarius', ACC = '#6fc3ff'
const ST = { x: -190 }
const UFO = ['.....SSS.....', '....SSSSS....', '..GGGGGGGGG..', 'GGGYGGYGGYGGG', '..GGGGGGGGG..', '...Y..Y..Y...']
const UFO_C = { S: SKYB, G: '#9aa5c4', Y: GOLD }
const WRENCH = ['GG...GG', 'GG...GG', '.GGGGG.', '...G...', '...G...', '...G...', '...G...', '..GGG..']
const FROG = ['.GG...GG.', 'GWKG.GWKG', 'GGGGGGGGG', 'GGGGGGGGG', 'GRRRRRRRG', '.GGGGGGG.']
const STOP = ['RRRRRRR', 'RWWWWWR', 'RWWWWWR', 'RWWWWWR', 'RWWWWWR', 'RWWWWWR', 'RRRRRRR']

const CAMEOS = [
  // 1 · space
  { sign: S, cap: 'Need space after a fight? | *Take it. Then land.*', mood: 'happy', look: [1, 0], star: { x: -170, y: -60 },
    back(x, t, lt, P) { drawBits(x, UFO, UFO_C, 370 + Math.sin(t * 1.5) * 10, 1010 + Math.sin(t * 2) * 8, 22 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 800, 740, 'SPACE: TAKEN', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 960, 'RETURN: SOON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 2 · the list
  { sign: S, cap: 'Made a pros-and-cons list? | *Add how you feel.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'PROS', -80, -150, { size: 28, font: MONO, weight: 700, color: GREEN }); txt(x, 'CONS', 80, -150, { size: 28, font: MONO, weight: 700, color: RED })
        x.fillStyle = INK; x.fillRect(-2, -170, 4, 220)
        for (let i = 0; i < 4; i++) { x.fillStyle = '#9aa5c4'; x.fillRect(-140, -100 + i * 40, 110, 10); x.fillRect(30, -100 + i * 40, 110, 10) }
        if (lt > 1.0) { txt(x, 'FEELINGS:', 0, 100, { size: 30, font: MONO, weight: 700 }); drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 0, 150, 8 * pop01(t, P.t0 + 1.3, 0.3, 2.4)) }
      })
    } },
  // 3 · went quiet
  { sign: S, cap: 'Went quiet? | Say *“I need a minute.”*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 60, tail: 'bl' })
      bubble(x, 790, 960, 'need a minute. | not leaving.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl', col: SKYB })
      sparkles(x, t, 790, 960, P.t0 + 1.2, 6, 170, 0.5)
    } },
  // 4 · heard, not fixed
  { sign: S, cap: 'Don’t want it fixed? | *Ask to be heard.*', mood: lt => lt > 1.3 ? 'heart' : 'eyeroll', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), drop = prog(lt, 1.0, 1.4)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 960, 190 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', look: [-1, 0], seed: 14, glyph: false })
      drawBits(x, WRENCH, { G: '#c9c9d8' }, 900, lerp(880, 1100, ease.inQuad(drop)), 12 * k, { rot: lerp(0.3, 1.6, drop), alpha: 1 - prog(lt, 1.4, 1.7) })
      bubble(x, 800, 700, lt < 1.3 ? 'i can fix—' : 'i’m listening.', pop01(t, P.t0 + (lt < 1.3 ? 0.4 : 1.3), 0.25, 2.2), { size: 40, tail: 'bc', col: lt < 1.3 ? BONE : MINT })
    } },
  // 5 · the meme apology
  { sign: S, cap: 'Your apology is a meme? | *Add one real sentence.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 790, 860, k, { head: 'MY PERSON', headCol: LAV, size: 28, w: 300, h: 440, lines: [] })
      drawBits(x, FROG, { G: '#5fd068', W: '#ffffff', K: INK, R: RED }, 790, 860, 16 * k * pop01(t, P.t0 + 0.5, 0.3, 2.2), { rot: 0.05 })
      label(x, 790, 1030, 'i’m sorry. truly.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.03 })
    } },
  // 6 · the replay
  { sign: S, cap: 'Replaying it on loop? | *You can press stop.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = lt > 1.3 ? 9 : 1 + Math.floor(prog(lt, 0.3, 1.3) * 8)
      label(x, 790, 720, `▶ REPLAY ×${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: lt > 1.3 ? GREY : PINK, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, STOP, { R: RED, W: '#ffffff' }, 790, 930, 22 * pop01(t, P.t0 + 1.1, 0.3, 2.4))
      label(x, 790, 1110, 'STOPPED. BREATHE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 7 · boxed in
  { sign: S, cap: 'Feel boxed in? | *Love can have windows.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: { x: 0, y: 10, s: 240 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 1000); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-190, -200, 380, 330); x.fillStyle = '#c98f2a'; x.fillRect(-180, -190, 360, 310)
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), w = ease.outBack ? ease.outBack(prog(lt, 0.9, 1.4)) : prog(lt, 0.9, 1.4)
      if (k <= 0.01) return
      x.save(); x.translate(540, 1000); x.scale(k, k)
      // the box front, drawn around a window that opens onto the star
      const ww = 110 * clamp(w, 0, 1.2), wh = 190 * clamp(w, 0, 1.2)
      x.fillStyle = '#c98f2a'
      x.fillRect(-180, -190, 180 - ww, 310); x.fillRect(ww, -190, 180 - ww, 310); x.fillRect(-ww, -190 + wh, 2 * ww, 310 - wh)
      if (w > 0.01) { x.fillStyle = INK; x.fillRect(-ww - 6, -190, 6, wh); x.fillRect(ww, -190, 6, wh); x.fillRect(-ww - 6, -190 + wh, 2 * ww + 12, 6) }
      x.fillStyle = '#a8702a'; x.fillRect(-180, 40, 360, 16)
      x.restore()
      label(x, 540, 1170, 'WINDOW: OPEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 8 · Align: room to orbit
  { sign: S, cap: 'The right person | *gives you room to orbit.*', mood: 'heart', star: { x: 0, y: -20, s: 220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      x.save(); x.globalAlpha = 0.4 * k; x.strokeStyle = BONE; x.lineWidth = 3; x.setLineDash([12, 12]); x.beginPath(); x.ellipse(540, 860, 300, 120, 0, 0, Math.PI * 2); x.stroke(); x.restore()
      const a = lt * 1.6
      if (k > 0.01) signChar(x, t, 'leo', 540 + Math.cos(a) * 300, 860 + Math.sin(a) * 120, 130 * k, { mood: 'heart', seed: 22, glyph: false })
      label(x, 540, 1130, '✦ MATCH: GIVES SPACE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  // 9 · coming back
  { sign: S, cap: 'Coming back after? | *That’s the love part.*', mood: 'heart', star: { x: -120 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 700, 900, 230 * k, { mood: lt > 1.0 ? 'heart' : 'sparkle', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.1] })
      bubble(x, 800, 640, 'missed you.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bc', col: PINK })
      hearts(x, t, 575, 830, P.t0 + 1.2, { n: 5, life: 1.6, spread: 50, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0167', key: 'F', accent: ACC, solo: S, ending: 'card',
  title: 'What Aquarians | need *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'leo', chip: 'ALIGNED' },
  group: { cap: 'Big space. | *Bigger heart.*', mood: 'heart' },
  lesson: { text: 'Space isn’t leaving. | It’s how you *come back.*', chip: 'STATUS: LANDED' },
  last: { text: 'Leo saved you | *a seat.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
