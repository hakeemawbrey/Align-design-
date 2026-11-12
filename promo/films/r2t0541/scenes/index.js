// r2t0541: star_talk, ROLLCALL, "The signs | house-sitting." (signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme house-sitter. Ending: callback (the cat moved in with Cancer).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Owners left at nine. | *Repainted* by ten.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    back(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.3, 1.4))
      if (p > 0.01) { x.save(); x.fillStyle = INK; x.fillRect(636, 608, 308, 6 + 440 * p); x.fillStyle = RED; x.fillRect(640, 612, 300, 440 * p); x.restore() }
    },
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.3, 1.4))
      bits(x, 'ROLLER', 790, 640 + 420 * p, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1150, 'NEW COLOUR: ARIES RED', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Watered the plants. | Ate *the fridge.*', mood: lt => lt > 1.5 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'FRIDGE', 790, 840, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) swapLabel(x, 790, 1130, lt, 1.3, 'FRIDGE: FULL', 'FRIDGE: EMPTY', { size: 32, fromBg: MINT, toBg: PINK })
      bubble(x, 760, 600, 'snack?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Told the neighbours | *six* different stories.', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const S = ['I live here now', 'I’m the cousin', 'I’m a spy', 'it’s my twin’s', 'I’m the plumber', 'I’m the cat']
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.33))
      bubble(x, 790, 760, S[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 960, `STORY #${n + 1}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.05, 36)
    } },
  { sign: 'cancer', cap: 'Fed the cat once. | Now it’s *their cat.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CAT', 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 650, 'CUSTODY: PENDING', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
      hearts(x, t, 760, 900, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Did a photoshoot. | In *every room.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bits(x, 'CAMERA', 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      for (const f of [0.7, 1.2, 1.7]) { const d = lt - f; if (d > 0 && d < 0.25) { x.save(); x.globalAlpha = 0.5 * (1 - d / 0.25); x.fillStyle = '#fff8e0'; x.fillRect(180, 470, 720, 760); x.restore() } }
      const rooms = ['KITCHEN', 'BATHTUB', 'ROOF']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.7) / 0.5))
      if (lt > 0.7) L(x, 790, 1080, `SHOT: ${rooms[n]}`, 1, GOLD, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Left it cleaner. | *Labelled the spoons.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sp = ['SPOON 1', 'SPOON 2', 'SPOON 3']
      sp.forEach((s, i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.4, 0.3, 2.2)
        if (k <= 0.01) return
        x.save(); x.translate(700 + i * 90, 860); x.scale(k, k); x.rotate((i - 1) * 0.08)
        x.fillStyle = INK; x.fillRect(-14, -150, 28, 210); x.beginPath(); x.ellipse(0, -170, 40, 56, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = STEEL; x.fillRect(-9, -145, 18, 200); x.beginPath(); x.ellipse(0, -170, 33, 49, 0, 0, Math.PI * 2); x.fill()
        x.restore()
        L(x, 700 + i * 90, 950 + (i % 2) * 60, s, k, MINT, (i - 1) * 0.08, 22)
      })
      L(x, 790, 1150, 'ALPHABETICAL', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Moved the couch. | *Eleven times.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(11, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.17))
      bits(x, 'COUCH', n % 2 ? 720 : 860, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, `LAYOUT #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), PINK, -0.04, 36)
      bubble(x, 790, 1110, 'hmm, or there?', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Found the hidden snacks. | *In four minutes.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LENS', 760, 720, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bits(x, 'COOKIE', 840, 960, 22 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      L(x, 790, 1130, 'SNACKS: LOCATED', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 32)
      sparkles(x, t, 840, 960, P.t0 + 1.1, 6, 130, 0.4)
    } },
  { sign: 'sagittarius', cap: 'House-sat from | *another country.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      const p = prog(lt, 0.1, 2.2)
      if (p > 0 && p < 1) bits(x, 'PLANE', lerp(150, 950, p), 560 - 40 * p, 14, { rot: Math.PI / 2 })
    },
    front(x, t, lt, P) {
      phone(x, t, 320, 860, pop01(t, P.t0 + 0.4, 0.3, 2), { head: 'VIDEO CALL', headCol: SKYB, lines: [['how’s the plant?', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['dead?', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)], ['love you, bye!', MINT, pop01(t, P.t0 + 1.9, 0.25, 2.2)]] })
    } },
  { sign: 'capricorn', cap: 'Billed the plants | *rent.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLANT', 680, 1080, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 820, 800, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 290, h: 300, head: 'INVOICE', headBg: STEEL, headInk: INK, lines: ['to: the fern', 'sunlight: 3 hrs', 'due: friday'], size: 26, align: 'left', progress: prog(lt, 0.7, 1.5) })
      L(x, 840, 1110, 'PAID IN LEAVES', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Upgraded the toaster. | It *talks now.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'TOASTER', 790, 980, 22 * k)
      if (lt > 0.6 && lt < 1.6) { x.save(); x.globalAlpha = 0.8; x.fillStyle = SKYB; for (let i = 0; i < 4; i++) x.fillRect(700 + i * 50 + Math.sin(t * 30 + i) * 8, 860 - i * 20, 14, 14); x.restore() }
      bubble(x, 790, 690, 'good morning, | human.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Wrote the goldfish | a *goodbye letter.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BOWLF', 800, 1030, 20 * k)
      bits(x, 'FISH', 800 + 30 * Math.sin(t * 2), 1020, 7 * k)
      sheet(x, 790, 730, pop01(t, P.t0 + 0.6, 0.35, 2), { w: 280, h: 230, head: 'DEAR BUBBLES', headBg: PINK, headInk: INK, lines: ['page 1 of 9', 'I’ll never forget'], size: 26 })
    } },
]

const F = makeFilm({
  id: 'r2t0541', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | *house-sitting.*',
  cameos: CAMEOS,
  group: { cap: 'The house survived. | *Mostly.*' },
  last: {
    text: 'The cat? | Lives with *Cancer.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 400, 1080, 260 * k, { mood: lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], seed: 9, hops: [t0 + 1.2] })
      bits(x, 'CAT', 730, 1110, 20 * pop01(t, t0 + 0.6, 0.3, 2))
      L(x, 730, 1290, 'NEW ADDRESS', pop01(t, t0 + 1.2, 0.3, 2.4), PINK, -0.04, 32)
      hearts(x, t, 560, 980, t0 + 1.3, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
