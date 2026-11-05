// ktte23: THIS OR THAT: LOVE EDITION (long), "Pisces: 30 Choices, Don't Cry" (60 s vertical, star advice trial reel,
// dreamy · C). Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Pisces mid-sob lunging into PICNIC at question one; a NO-CRY STREAK counter slams 0.0 s in red;
//   record scratch "it's question one." Promise: "wait for question 30."
//   chapters (hook-kit stickers): 1 FIRST DATES (Q1–8) · 2 TEXTING (Q9–16) · 3 BIG FEELINGS (Q17–24)
//   · 4 LIGHTNING ROUND (Q25–29, under a second each) · 5 QUESTION 30.
//   gags every 8–10 s: the streak counter resets on every pick · THE STARS host from the corner · a "composure…" loading
//   bar errors out ("too many feelings") · Cancer restocks the tissues · a sneeze sends a pair of cards flying ·
//   the lightning round · Q30 freeze.
//   Q30: BE LOVED vs BE UNDERSTOOD → a third card: BOTH? → picked; happy-tear fountains, hearts, confetti.
//   Last: "The right one *does both.*" Hard cut.
import { makeTT, bubble, label, star, hearts, confetti, box, R, pop01, outK, RED, GOLD, BONE, INK, INTER, STAR, drawStarChar, prog, ease, lerp } from '../../ktte01/scenes/ttkit.js'
import { chapter, chapterCues, loadingBar, loadingBarCues } from '../../hookkit.js'

const Q = [
  // 1 FIRST DATES
  ['PICNIC', 'DINNER', 'heart', 'fork', 'a'], ['EARLY', 'LATE', 'sun', 'moon', 'b'], ['DRESS UP', 'COMFY', 'star', 'house', 'b'],
  ['COFFEE', 'TEA', 'fork', 'fork', 'b'], ['SPLIT IT', 'TAKE TURNS', 'cal', 'heart', 'b'], ['HUG HELLO', 'WAVE HELLO', 'heart', 'hand', 'a'],
  ['WALK HOME', 'RIDE HOME', 'moon', 'house', 'a'], ['TEXT AFTER', 'WAIT A DAY', 'phone', 'clock', 'a'],
  // 2 TEXTING
  ['CALL', 'TEXT', 'phone', 'bubble', 'a'], ['EMOJI', 'WORDS', 'heart', 'bubble', 'b'], ['GOOD MORNING TEXT', 'GOOD NIGHT TEXT', 'sun', 'moon', 'b'],
  ['VOICE NOTE', 'LONG TEXT', 'phone', 'bubble', 'a'], ['REPLY FAST', 'REPLY THOUGHTFUL', 'clock', 'heart', 'b'], ['PET NAMES', 'REAL NAMES', 'heart', 'star', 'a'],
  ['MEMES', 'PHOTOS OF YOUR DAY', 'q', 'cam', 'b'], ['SAY GOODNIGHT FIRST', 'WAIT FOR IT', 'moon', 'clock', 'a'],
  // 3 BIG FEELINGS
  ['SAY IT', 'WRITE IT', 'bubble', 'cal', 'b'], ['CRY AT MOVIES', 'CRY AT WEDDINGS', 'star', 'heart', 'a'], ['BIG GESTURE', 'SMALL HABIT', 'spark', 'heart', 'b'],
  ['TALK IT OUT', 'SLEEP ON IT', 'bubble', 'zz', null], ['KEEP OLD LETTERS', 'LET THEM GO', 'cal', 'hand', 'a'], ['SAY “I MISS YOU”', 'HINT AT IT', 'heart', 'q', 'a'],
  ['HOLD HANDS', 'LINK ARMS', 'hand', 'heart', 'a'], ['FOREVER', 'ONE DAY AT A TIME', 'star', 'cal', 'b'],
  // 4 LIGHTNING
  ['CATS', 'DOGS', 'heart', 'heart', 'b'], ['RAIN', 'SNOW', 'sweat', 'spark', 'b'], ['BEACH', 'MOUNTAINS', 'sun', 'star', 'a'],
  ['PANCAKES', 'WAFFLES', 'fork', 'fork', 'a'], ['STARS', 'MOON', 'star', 'moon', 'a'],
]
const rounds = Q.map(([a, b, ia, ib, pick], i) => {
  const ch = i < 8 ? 0 : i < 16 ? 1 : i < 24 ? 2 : 3
  const d = i === 0 ? 1.7 : ch === 3 ? 0.9 : ch === 2 ? 1.75 : 1.55
  const r = { a, b, ia, ib, pick, d }
  if (pick === null) Object.assign(r, { buzz: true, alarm: 'ACHOO!', d: 2.2, pickAt: 1.1, hover: true })
  if ([2, 5, 13, 16, 21, 23].includes(i)) Object.assign(r, { hover: true, d: d + 0.5, pickAt: (d + 0.5) * 0.66 })
  return r
})
rounds.push({ a: 'BE LOVED', b: 'BE UNDERSTOOD', ia: 'heart', ib: 'bubble', pick: 'c', c: { text: 'BOTH?', ic: 'heart', at: 4.3, tag: 'CAN I PICK…' }, d: 8.4, pickAt: 6.6, hover: true, freeze: [1.2, 2.4], freezeCap: 'the *hardest* one.', capTop: 1620 })

const host = (x, t, k, hops) => { if (k > 0.01) drawStarChar(x, 150, 1590, 170, t, { color: STAR.sky, mood: 'happy', look: [1, -1], pop: k, seed: 4, hops }) }
const EP = makeTT({
  id: 'ktte23', mode: 'solo', signs: ['pisces'],
  hook: 'PISCES: 30 CHOICES. | *DON’T CRY.*', accent: '#a9a2ff',
  brk: { kind: 'scratch', t: 0.12, len: 0.5, cap: 'it’s question *one.*' },
  rounds, r0: -0.62,
  last: 'The right one | *does both.*',
  ending: 'cut', fin: 4.6,
  pose: () => ({ tears: 3 }),
  over(x, t, S) {
    const T = S.T, v = S.v
    // the question counter + the NO-CRY STREAK (resets on every pick: Pisces cries at all of them)
    const ri = T.rounds.findIndex(r => v >= r.t0 && v < r.t1)
    if (ri >= 0 && v > T.hookOut + 0.2) label(x, `Q ${ri + 1}/30`, 960, 410, { size: 34, col: GOLD, align: 'right' })
    if (v < T.E && v > T.hookOut + 0.2) {
      let last = -1
      for (const r of T.rounds) if (!r.buzz && r.slam <= v) last = r.slam
      const st = last < 0 ? v + 0.62 : v - last, hot = last >= 0 && st < 0.4
      label(x, `NO-CRY STREAK ${Math.max(0, st).toFixed(1)}s`, 120, 410, { size: 30, col: hot ? RED : BONE, align: 'left' })
      if (hot) label(x, 'RESET', 180, 365, { size: 30 * pop01(t, T.realOf(last), 0.2, 2.4), col: RED, font: INTER, weight: 800, rot: -0.1 })
    }
    // the promise
    bubble(x, t, 540, 1600, 1.2, 7.5, 'wait for question 30.', { size: 42, col: '#ffe6a6' })
    // THE STARS host pops in at every chapter with a line
    const lines = [[T.chap[1], 'chapter two. texting. brace.'], [T.chap[2] + 0.2, 'tissues are restocked. go.'], [T.chap[3], 'lightning round!!'], [T.chap[4] + 0.1, 'question 30. the big one.']]
    for (const [a, txt] of lines) { const k = pop01(t, a, 0.3, 2) * outK(t, [a + 3.0, a + 3.3]); host(x, t, k, [a + 0.3, a + 1.0]); bubble(x, t, 400, 1440, a + 0.25, a + 3.0, txt, { size: 38, tail: -0.6 }) }
    // Cancer restocks the tissues at chapter 3
    const c0 = T.chap[2] - 0.2, ck = ease.outCubic(prog(t, c0, c0 + 0.6)) * (1 - ease.inCubic(prog(t, c0 + 3.4, c0 + 4.0)))
    if (ck > 0.01) { const X = lerp(1250, 860, ck); star(x, t, 'cancer', { x: X, y: 1330, s: 210, mood: 'happy', look: [-1, 0], hops: [c0 + 0.7, c0 + 1.4] }); box(x, X - 170, 1390, 110, 70, '#9fd8f6', { b: 5 }); R(x, '#ffffff', X - 132, 1345, 34, 48); box(x, X - 150, 1320, 110, 70, '#9fd8f6', { b: 5 }); R(x, '#ffffff', X - 112, 1275, 34, 48) }
    // the finale
    if (v >= T.E - 0.6) { hearts(x, t, T.realOf(T.E - 0.5), 470, 1150, { n: 8 }); confetti(x, t, T.realOf(T.E), 540, 760, { n: 34 }) }
    if (v >= T.E) { host(x, t, pop01(t, T.realOf(T.E + 0.6), 0.3, 2), [T.realOf(T.E + 0.9)]); bubble(x, t, 450, 1440, T.realOf(T.E + 0.8), 99, 'yes. you can have both.', { size: 40, tail: -0.6 }) }
  },
  fx(T) {
    const real = v => +T.realOf(v).toFixed(3)
    const CH = ['FIRST DATES', 'TEXTING', 'BIG FEELINGS', 'LIGHTNING ROUND', 'QUESTION 30']
    const at = [real(T.hookOut + 0.25), real(T.rounds[8].t0), real(T.rounds[16].t0), real(T.rounds[24].t0), real(T.rounds[29].t0)]
    T.chap = at
    const scenes = [], cues = []
    CH.forEach((title, i) => { const C = { at: at[i], out: [at[i] + 3.2, at[i] + 3.5], n: i + 1, title, y: 245 }; scenes.push(chapter(C)); cues.push(...chapterCues(C)) })
    const L = { at: real(T.rounds[12].t0 + 0.3), len: 2.6, label: 'composure…', stallAt: 2, error: 'Error: too many feelings', y: 1520 }
    scenes.push(loadingBar(L)); cues.push(...loadingBarCues(L))
    return { scenes, cues }
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHAPTERS = EP.T.chap
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
