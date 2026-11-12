// r2a0603: star_advice, ADVICE SOLO (aquarius), "What an Aquarius | *won't say.*" (signs3kit social cut, music: lofi · C).
// Nine cards, a quiet Aquarius truth + a warm reframe: every meme you sent is saved in a folder · "weird" is high praise
// · they argue to bond · skip the small talk, ask about the theory · feelings make them buffer · they care about the world
// and you, specifically · odd gifts mean they listened · a 2 a.m. article means "thinking of you" · their weird little
// world has room for you.
// Ending: callback. "P.S. That folder? | *It has a backup.*" (the meme folder comes back, doubled).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd4ff', ST = { x: -180 }, SG = 'aquarius'
const CACTUS = ['...G...', '..GGG..', 'G.GGG..', 'GGGGG.G', '..GGGGG', '..GGG..', '..GGG..', '.RRRRR.', '.RRRRR.', '..RRR..']
const CACTUS_C = { G: '#4fbf6a', R: '#e07a4a' }

// a folder of saved memes (pixel folder + little picture tiles)
function folder(x, t, cx, cy, k, { n = 6, title = 'YOU ♡', rot = -0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -100, 316, 230)
  x.fillStyle = INK; x.fillRect(-166, -134, 332, 256); x.fillRect(-166, -160, 140, 40)
  x.fillStyle = '#ffd23a'; x.fillRect(-158, -152, 124, 30); x.fillRect(-158, -126, 316, 240)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(title, -140, -137)
  const COLS = [PINK, SKYB, MINT, LAV, '#ffb34a', BONE]
  for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3); x.fillStyle = INK; x.fillRect(-136 + c * 94, -94 + r * 100, 84, 84); x.fillStyle = COLS[i % 6]; x.fillRect(-130 + c * 94, -88 + r * 100, 72, 72); x.fillStyle = INK; x.fillRect(-108 + c * 94, -64 + r * 100, 8, 8); x.fillRect(-84 + c * 94, -64 + r * 100, 8, 8); x.fillRect(-110 + c * 94, -40 + r * 100, 36, 6) }
  x.restore()
}

const CAMEOS = [
  { sign: SG, cap: 'Saved every meme you sent. | In *a folder.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      folder(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { n: Math.min(6, 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 6)) })
      L(x, 800, 1080, 'ARCHIVED WITH LOVE', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: SG, cap: 'Called you weird? | That’s *high praise.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'you’re so weird', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 900, 'TRANSLATION:', pop01(t, P.t0 + 0.9, 0.3, 2.2), BONE, 0.03, 30)
      L(x, 770, 1000, 'BEST FRIEND MATERIAL', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: SG, cap: 'They argue for fun. | It’s *how they bond.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'actually…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      bubble(x, 800, 800, 'counterpoint!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      bubble(x, 780, 950, 'love this. again?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      L(x, 770, 1110, 'FRIENDSHIP: LEVEL UP', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: SG, cap: 'Skip the small talk. | Ask about *the theory.*', mood: lt => lt > 1.0 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.0) bubble(x, 800, 700, 'nice weather, huh', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: STEEL, tail: 'br' })
      else bubble(x, 800, 700, 'so… octopus dreams?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: SKYB, tail: 'br' })
      sparkles(x, t, 450, 820, P.t0 + 1.0, 7, 160, 0.2)
      L(x, 800, 960, lt > 1.0 ? 'TALK TIME: 3 HRS ♡' : 'TALK TIME: 4 SEC', 1, lt > 1.0 ? MINT : STEEL, -0.04, 32)
    } },
  { sign: SG, cap: 'Feelings make them | *buffer.* Give it time.', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800, 820, k, { w: 340, h: 240, rot: 0.03, head: '⚠ SYSTEM', headBg: '#ffd23a', headInk: INK, lines: lt > 1.5 ? ['feelings:', ['processed ♡', '#2f8a48']] : ['too many', 'feelings'], size: 34 })
      if (lt < 1.5 && k > 0.9) { x.save(); x.translate(800, 940); for (let i = 0; i < 8; i++) { const a = t * 6 + i * Math.PI / 4; x.globalAlpha = (i + 1) / 8; x.fillStyle = BONE; x.fillRect(Math.cos(a) * 26 - 5, Math.sin(a) * 26 - 5, 10, 10) } x.restore() }
      L(x, 800, 1090, lt > 1.5 ? 'WORTH THE WAIT' : 'PLEASE HOLD…', 1, lt > 1.5 ? PINK : LAV, -0.04, 32)
    } },
  { sign: SG, cap: 'They care about the world. | And *you.* Specifically.', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 840, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 1.0) { const d = ease.outCubic(prog(lt, 1.0, 1.4)); bits(x, 'HEARTB', 850, lerp(640, 820, d), 12) }
      L(x, 800, 1070, 'PINNED: YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 36)
    } },
  { sign: SG, cap: 'A weird gift means | *they listened.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      if (lt < 1.0) bits(x, 'GIFT', 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 14) * 0.05 * (lt > 0.6 ? 1 : 0) })
      else { drawBits(x, CACTUS, CACTUS_C, 800, 860, 20 * pop01(t, P.t0 + 1.0, 0.3, 2.2)); sparkles(x, t, 800, 860, P.t0 + 1.0, 7, 170, 0.5) }
      L(x, 800, 1080, 'YOU MENTIONED IT ONCE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: SG, cap: 'A 2 a.m. article means | *“thinking of you.”*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '2:04 AM', headCol: LAV, size: 22, lines: [['link: why cats', SKYB, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['knock things off', SKYB, pop01(t, P.t0 + 0.6, 0.2, 2), false], ['thought of u', PINK, pop01(t, P.t0 + 1.2, 0.2, 2), false]] })
      L(x, 800, 1110, 'TRANSLATED: ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: SG, cap: 'Their weird little world | has *room for you.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 1000); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 128, Math.PI, 0); x.fill()
        x.fillStyle = '#7d6cff'; x.beginPath(); x.arc(0, 0, 120, Math.PI, 0); x.fill()
        x.fillStyle = '#b9a8ff'; x.fillRect(-60, -70, 24, 16); x.fillRect(30, -40, 30, 16)
        x.restore()
      }
      friend(x, t, 'gemini', 760, 840, 140, pop01(t, P.t0 + 0.7, 0.3, 2), { mood: 'happy', look: [1, 0], seed: 39 })
      friend(x, t, 'cancer', 860, 840, 140, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 40 })
      L(x, 800, 650, 'POPULATION: US', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0603', key: 'C', accent: ACC, solo: SG, ending: 'callback',
  title: 'What an Aquarius | *won’t say.*',
  cameos: CAMEOS,
  group: { cap: 'Odd on the outside. | *Loyal* all through.', mood: 'heart' },
  last: {
    text: 'P.S. That folder? | *It has a backup.*',
    draw(x, t, lt) {
      folder(x, t, 400, 1150, pop01(lt, 0.4, 0.35, 2), { rot: -0.07 })
      folder(x, t, 680, 1190, pop01(lt, 0.9, 0.35, 2), { title: 'YOU ♡ (2)', rot: 0.06 })
      sparkles(x, t, 680, 1190, t - lt + 1.1, 7, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
