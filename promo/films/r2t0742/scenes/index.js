// r2t0742: THE SIGNS AS… v3, "Zodiacs when they | lose a game | *be like.*" (the batch hook, re-split to fit) (~54 s vertical,
// signs3kit social cut, music: lofi · E). Twelve signs losing one game night, each pushed to the extreme. Ending: group.
//   ♈ a rage lap round the block · ♉ kept the snack bowl · ♊ lost at chess, now it's checkers · ♋ hugged the winner,
//   cried · ♌ gave a winner's speech anyway · ♍ found a typo in the rules · ♎ declared a tie · ♏ wrote it down
//   · ♐ laughed the loudest · ♑ hired a coach · ♒ questioned the concept of winning · ♓ comforted the dice
//   group "Good game? | *Debatable.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, board, confetti, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }
const DIE = ['KKKKKKKKK', 'KWWWWWWWK', 'KWKWWWWWK', 'KWWWWWWWK', 'KWWWKWWWK', 'KWWWWWWWK', 'KWWWWWKWK', 'KWWWWWWWK', 'KKKKKKKKK']
const DIE_C = { K: INK, W: CREAM }
const CHECKER = (x, cx, cy, r, col) => { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 4, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }

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

const CAMEOS = [
  { sign: 'aries', cap: 'Lost one round. | *Ran a rage lap.*', mood: lt => lt > 0.6 ? 'squint' : 'wide', star: ST, hops: [0.5, 0.8, 1.1, 1.4],
    front(x, t, lt, P) {
      L(x, 800, 680, 'YOU LOSE', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.05, 40)
      const n = 1 + Math.floor(clamp((lt - 0.8) / 1.2) * 3)
      L(x, 800, 900, `LAPS: ${n}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), '#ff6b5a', 0.04, 44)
      bubble(x, 800, 1090, 'i’m FINE', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Lost the game. | *Kept the snack bowl.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', star: { x: -170, y: -10 },
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 690, 'CONSOLATION PRIZE', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 30)
      L(x, 800, 1080, 'NOT SHARING', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#5fd068', 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Losing at chess? | *Now it’s checkers.*', mood: lt => lt > 1.1 ? 'wink' : 'wide', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      board(x, 800, 900, 6, 40, k)
      if (lt > 1.0) for (let i = 0; i < 6; i++) CHECKER(x, 720 + (i % 3) * 80, 860 + Math.floor(i / 3) * 80, 22 * pop01(t, P.t0 + 1.0 + i * 0.06, 0.25, 2.2), i % 2 ? RED : INK)
      swapLabel(x, 800, 680, lt, 0.9, 'CHESS', 'NEW RULES', { size: 34, fromBg: CREAM, toBg: '#ffd23a' })
    } },
  { sign: 'cancer', cap: 'Hugged the winner. | *Then cried.*', mood: 'wide', look: [1, 0], star: ST, tears: lt => lt > 1.2 ? 2 : 0,
    front(x, t, lt, P) {
      friend(x, t, 'leo', 800, 920, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.0 ? 'wide' : 'sparkle', look: [-1, 0] })
      label2(x, t, lt, P)
      hearts(x, t, 620, 820, P.t0 + 0.8, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Lost the game. | *Gave the speech anyway.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'i’d like to | thank me', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      bits(x, 'TROPHY', 800, 950, 14 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      L(x, 800, 1110, 'PLACE: LAST', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Lost. | *Found a typo in the rules.*', mood: 'squint', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'RULES p.37', headBg: '#5fd068', headInk: INK, lines: ['each player', ['recieves', RED], 'two cards', ''], size: 32, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1100, 'GAME: VOID', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: 'libra', cap: 'Clearly lost. | *Declared a tie.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST,
    front(x, t, lt, P) {
      bits(x, 'SCALE', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.06 })
      L(x, 800, 660, 'SCORE: 2 – 14', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 34)
      L(x, 800, 1090, 'EVERYONE WINS!', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Smiled. Shook hands. | *Wrote it down.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 300, h: 300, bg: '#2a2350', ink: BONE, head: 'NOTED.', headBg: '#c97bff', lines: ['game night', 'tuesday', ['see you then', PINK]], size: 32, progress: clamp((lt - 0.5) / 1.0) })
      bubble(x, 800, 1100, 'good game ♡', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Lost by a mile. | *Laughed the loudest.*', mood: lt => Math.floor(lt * 4) % 2 ? 'sparkle' : 'happy', star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      for (const [i, [xx, yy]] of [[700, 700], [880, 780], [760, 950], [900, 1060]].entries()) bubble(x, xx, yy, 'HA', pop01(t, P.t0 + 0.4 + i * 0.35, 0.25, 2.2), { size: 44, tail: i % 2 ? 'br' : 'bl' })
    } },
  { sign: 'capricorn', cap: 'Lost one board game. | *Hired a coach.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 820, 960, 170, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'squint', look: [-1, 0] })
      L(x, 820, 760, 'COACH', pop01(t, P.t0 + 0.7, 0.3, 2.2), '#5fd068', -0.04, 36)
      L(x, 800, 620, 'PRACTICE: 6 A.M.', pop01(t, P.t0 + 1.4, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Lost the game. | *Questioned winning itself.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'who decided | points matter?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 940, 'TABLE: CONFUSED', pop01(t, P.t0 + 1.2, 0.3, 2.2), '#6fc3ff', -0.04, 32)
      L(x, 800, 1070, 'A FAIR POINT, SADLY', pop01(t, P.t0 + 1.8, 0.3, 2.2), CREAM, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Lost the game. | *Comforted the dice.*', mood: 'wide', look: [1, 0], star: ST, tears: 3,
    front(x, t, lt, P) {
      drawBits(x, DIE, DIE_C, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.1 + Math.sin(t * 2) * 0.03 })
      bubble(x, 800, 690, 'it’s not | your fault', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 800, 840, P.t0 + 1.3, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 8 })
    } },
]
// Cancer's card: the "GG" label swaps to a soggy one once the tears start
function label2(x, t, lt, P) { swapLabel(x, 800, 1100, lt, 1.2, 'GOOD GAME!', 'SO PROUD OF U', { size: 32, fromBg: MINT, toBg: SKYB }) }

const F = makeFilm({
  id: 'r2t0742', key: 'E', accent: ACC, ending: 'group',
  title: 'Zodiacs when they | lose a game | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Good game? | *Debatable.*',
    draw(x, t, lt) {
      L(x, 540, 640, 'SCORES: NOT DISCUSSED', pop01(t, t - lt + 1.6, 0.3, 2.2), GOLD, -0.03, 34)
      drawBits(x, DIE, DIE_C, 860, 700, 9 * pop01(t, t - lt + 2.0, 0.3, 2.2), { rot: 0.3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
