// r2t0134: THE SIGNS AS… v3, SOLO film, "Mad Geminis | be like." (topic: Geminis when they're mad) (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine ways a Gemini is "mad", each pushed to the extreme (and lovable). Ending: group.
//   0.0–3.6    "Mad Geminis | *be like.*"
//   3.6–37.8   mad for ten minutes, forgot why · argued with themself, lost · silent treatment, four minutes
//              · "not talking to you" + a meme anyway · one angry text, forty voice notes · blocked you, unblocked to add
//              one more thing · bio changed to a riddle · mad mid-sentence, laughing by the end · the grudge box: empty
//  37.8        "Mad for a minute. | *Besties by dinner.*" (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, cloud, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const S = 'gemini', YEL = '#ffd23a'

const CAMEOS = [
  { sign: S, cap: 'Mad for ten minutes. | Then *forgot why.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: lt => lt > 1.4 ? [1, -1] : [1, 0], star: { x: -200 },
    front(x, t, lt, P, F) {
      cloud(x, t, F.x, F.top - 70, 14, pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - prog(lt, 1.3, 1.5)), { col: '#6b6f88' })
      const m = Math.max(0, 10 - Math.floor(clamp((lt - 0.2) / 1.1) * 10))
      label(x, 790, 760, `MAD: ${m}:00`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 990, 'wait, why | was I mad?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Argued with themself. | *Lost.*', mood: lt => lt > 1.6 ? 'eyeroll' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, S, 800, 960, 230 * k, { mood: lt > 1.5 ? 'wink' : 'squint', look: [-1, 0], seed: 31, glyph: false })
      bubble(x, 420, 610, 'you’re wrong', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bc' })
      bubble(x, 800, 650, 'no, YOU are', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 800, 1160, 'WINNER: ALSO ME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'The silent treatment. | Lasted *four minutes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: lt => lt > 1.4 ? [1, 0] : [-1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const s = Math.min(4, Math.floor(clamp((lt - 0.2) / 1.1) * 4))
      label(x, 790, 760, 'SILENT', pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - prog(lt, 1.35, 1.5)), { size: 50, bg: GREY, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 880, `0:0${s}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'OK SO ANYWAY', pop01(t, P.t0 + 1.45, 0.25, 2.4), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: '“Not talking to you.” | Sends *a meme.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      phone(x, 790, 860, k, { head: 'GEMINI', headCol: YEL, size: 22, lines: [['not talking to you', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)]] })
      const m = pop01(t, P.t0 + 1.1, 0.3, 2.4)
      card(x, 790, 920, 180, 150, m * k, { bg: '#8fd0ff', rot: -0.06 }, () => {
        signChar(x, t, 'taurus', 0, 4, 110, { mood: 'sleepy', seed: 41, glyph: false, glow: 0.4 })
        txt(x, 'me rn', 0, -56, { size: 24 })
      })
      label(x, 790, 1120, 'lol', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.05 })
    } },
  { sign: S, cap: 'One angry text. | *Forty voice notes.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      card(x, 790, 860, 260, 420, k, { bg: '#2a2350', rot: 0.04 }, () => {
        x.fillStyle = DEEP; x.fillRect(-118, -196, 236, 392)
        const n = Math.min(9, Math.floor(clamp((lt - 0.3) / 1.4) * 9) + 1)
        for (let i = 0; i < n; i++) {
          const y = -170 + i * 42; x.fillStyle = YEL; x.fillRect(-100 + (i % 2) * 20, y, 180, 32)
          x.fillStyle = INK; x.fillRect(-90 + (i % 2) * 20, y + 8, 14, 16); for (let j = 0; j < 9; j++) x.fillRect(-66 + (i % 2) * 20 + j * 15, y + 16 - (2 + ((i + j) * 7) % 10), 6, 4 + ((i + j) * 7) % 20)
        }
      })
      label(x, 790, 630, `VOICE NOTE ${Math.min(40, 1 + Math.floor(lt * 18))}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Blocked you. | Unblocked *to add one thing.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const un = lt > 1.0
      label(x, 790, 760, un ? 'UNBLOCKED' : 'BLOCKED', pop01(t, P.t0 + 0.2, 0.3, 2) * (un ? pop01(t, P.t0 + 1.0 * 3.1 / 2.4, 0.25, 2.4) : 1), { size: 46, bg: un ? MINT : RED, color: un ? INK : CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 990, 'ALSO another | thing:', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Changed their bio | to *a riddle about you.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 860, 290, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', rot: 0.04 }, () => {
        x.fillStyle = DEEP; x.fillRect(-130, -165, 260, 150)
        signChar(x, t, S, 0, -86, 120, { mood: 'squint', seed: 51, glyph: false, glow: 0.6 })
        txt(x, '♊︎ GEMINI', 0, 20, { size: 26, font: MONO, weight: 700, color: YEL })
        const B = 'some people know | what they did ☁︎'.split('|')
        B.forEach((l, i) => txt(x, l.trim(), 0, 76 + i * 36, { size: 24, weight: 700, color: BONE }))
      })
      label(x, 790, 640, 'BIO UPDATED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: YEL, rot: -0.05 })
    } },
  { sign: S, cap: 'Mad mid-sentence. | *Laughing* by the end.', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const w = ['I am SO', 'unbelievably', 'mad that', 'you… haha', 'HAHA ok'], n = Math.min(4, Math.floor(clamp((lt - 0.2) / 1.6) * 5))
      bubble(x, 790, 760, w[n], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: n > 2 ? MINT : BONE, tail: 'bl' })
      label(x, 790, 980, n > 2 ? 'MOOD: LOL' : 'MOOD: MAD', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: n > 2 ? MINT : RED, color: n > 2 ? INK : CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Holding a grudge? | *Lost it.*', mood: lt => lt > 1.3 ? 'wide' : 'neutral', look: [1, 1], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), op = ease.outCubic(prog(lt, 0.9, 1.3))
      card(x, 790, 960, 260, 180, k, { bg: WOOD, rot: 0 }, () => { txt(x, 'GRUDGE', 0, 10, { size: 40 }) })
      if (k > 0.01) { x.save(); x.translate(790 - 130, 870); x.rotate(-1.2 * op); x.fillStyle = INK; x.fillRect(-6, -30, 272, 36); x.fillStyle = '#a5732a'; x.fillRect(0, -24, 260, 24); x.restore() }
      label(x, 790, 690, 'EMPTY??', pop01(t, P.t0 + 1.35, 0.3, 2.4), { size: 40, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 6, 120, 0.4, [BONE, GOLD])
    } },
]

const F = makeFilm({
  id: 'r2t0134', key: 'D', accent: YEL, solo: S, ending: 'group',
  title: 'Mad Geminis | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Mad for a minute. | *Besties by dinner.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
