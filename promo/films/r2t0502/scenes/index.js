// r2t0502: star_talk, ROLLCALL (twelve signs), "The signs | as dogs." (signs3kit social cut, music: lofi · E).
// Every star gets floppy dog ears. Aries caught the mail truck · Taurus won't move until treat · Gemini brought one stick,
// then six more · Cancer missed you for forty seconds · Leo is best in show, every show · Virgo checked the new pup's
// birth chart · Libra already found a match at the park · Scorpio knows where the treats are hidden · Sagittarius off
// the leash, now in another town · Capricorn fetches the paper, reads it · Aquarius invented a new game · Pisces saw
// another dog get petted and wept.
// Ending: lesson ("Loyal, loud or dramatic: | all good dogs.") then "Who's a good sign? | You are."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, friend, bits, confetti, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }

const EAR = ['.BB.', 'BBBB', 'BBBB', 'BBBB', 'BBBB', 'BBB.', '.BB.']
const DOGBONE = ['WW......WW', 'WWWWWWWWWW', '.WWWWWWWW.', 'WWWWWWWWWW', 'WW......WW']
const STICK = ['WW.......', '.WWW.....', '...WWWW..', '......WWW', '....W....']
const BALL = ['..YYY..', '.YYWYY.', 'YYWYYYY', 'YWYYYYY', 'YYYYYWY', '.YYYWY.', '..YYY..']
const MAILTRUCK = ['..RRRRRRRRR...', '..RWWWWWWWR...', 'RRRRRRRRRRRRRR', 'RRWWRRRRRRRRRR', 'RRRRRRRRRRRRRR', '.KK.......KK..']
// two floppy ears hanging off the star's upper arms, flapping a little
function ears(x, t, F, s = 1) {
  const c = 8 * (F.S / 300) * s, w = Math.sin(t * 6) * 0.08
  drawBits(x, EAR, { B: '#8a5a32' }, F.x - F.S * 0.24, F.cy - F.S * 0.2, c, { rot: 0.5 + w })
  drawBits(x, EAR, { B: '#8a5a32' }, F.x + F.S * 0.24, F.cy - F.S * 0.2, c, { rot: -0.5 - w })
}
const dog = (front) => (x, t, lt, P, F) => { if (F) ears(x, t, F); front(x, t, lt, P, F) }

const CAMEOS = [
  { sign: 'aries', cap: 'Chased the mail truck. | *Caught it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.3, 0.6, 0.9, 1.2],
    front: dog((x, t, lt, P) => {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const stop = lt > 1.2 ? 0 : Math.sin(t * 30) * 4
      drawBits(x, MAILTRUCK, { R: '#6fc3ff', W: CREAM, K: INK }, 800 + stop, 900, 22 * k)
      L(x, 800, 690, 'MAIL: SECURED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 34)
      bubble(x, 800, 1100, 'WOOF.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
    }) },
  { sign: 'taurus', cap: 'Will not move. | Until *treat.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front: dog((x, t, lt, P) => {
      L(x, 800, 700, 'BUDGE: NO', pop01(t, P.t0 + 0.3, 0.3, 2.2), STEEL, -0.04, 40)
      const d = ease.outCubic(prog(lt, 1.0, 1.4))
      drawBits(x, DOGBONE, { W: CREAM }, lerp(990, 800, d), 920, 14 * clamp(d * 3), { rot: 0.2 })
      if (lt > 1.5) L(x, 800, 1090, 'OK. MOVING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 34)
    }) },
  { sign: 'gemini', cap: 'Brought you one stick. | Then *six more.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front: dog((x, t, lt, P) => {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 6)
      for (let i = 0; i < n; i++) drawBits(x, STICK, { W: WOOD }, 700 + (i % 3) * 110, 760 + Math.floor(i / 3) * 110, 12 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.25, 2), { rot: i * 0.7 })
      L(x, 800, 1120, `STICKS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.04, 34)
    }) },
  { sign: 'cancer', cap: 'You were gone | *forty seconds.* Missed you.', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4, 1.6, 1.8],
    front: dog((x, t, lt, P) => {
      bits(x, 'HOUSE', 800, 850, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'GONE: 0:40', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, 0.04, 34)
      bubble(x, 800, 1100, 'YOU’RE BACK!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 400, 820, P.t0 + 1.5, { n: 6, life: 1.6, spread: 160, cell: 7, seed: 1 })
    }) },
  { sign: 'leo', cap: 'Best in show. | *Every* show.', mood: 'sparkle', star: ST, hops: [1.2],
    front: dog((x, t, lt, P) => {
      bits(x, 'TROPHY', 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 650, 'DIDN’T EVEN ENTER', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
      sparkles(x, t, 800, 860, P.t0 + 1.0, 7, 180, 0.2)
    }) },
  { sign: 'virgo', cap: 'Checked the new pup’s | *birth chart* first.', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front: dog((x, t, lt, P) => {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 300, head: 'BIRTH CHART', headBg: LAV, headInk: INK, lines: ['sun: fetch', 'moon: naps', 'rising: zoomies'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1080, 'APPROVED. SNIFF.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    }) },
  { sign: 'libra', cap: 'Ten minutes at the park. | *Found a match.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front: dog((x, t, lt, P) => {
      const F2 = friend(x, t, 'gemini', 800, 940, 190, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 23 })
      if (F2) ears(x, t, F2)
      L(x, 800, 690, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, 600, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    }) },
  { sign: 'scorpio', cap: 'Knows exactly where | you *hid the treats.*', mood: 'squint', look: [1, -1], star: ST, hops: [1.3],
    front: dog((x, t, lt, P) => {
      bits(x, 'BOX', 800, 760, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'TOP SHELF, LEFT', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.04, 30)
      bubble(x, 800, 1020, 'nice try.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    }) },
  { sign: 'sagittarius', cap: 'Off the leash. | Now in *another town.*', mood: 'sparkle', look: [1, -1], star: { x: -200, y: -20, s: 240 }, hops: [0.4, 0.8, 1.2, 1.6],
    front: dog((x, t, lt, P) => {
      bits(x, 'MAP', 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      const p = clamp((lt - 0.5) / 1.2)
      x.save(); x.fillStyle = INK; for (let i = 0; i < 8 * p; i++) x.fillRect(700 + i * 26, 900 - Math.sin(i * 0.8) * 40, 10, 10); x.restore()
      L(x, 800, 1090, 'BRB, MOM', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 36)
    }) },
  { sign: 'capricorn', cap: 'Fetches the paper. | *Reads it* first.', mood: 'squint', look: [1, 0], star: ST, hops: [1.2],
    front: dog((x, t, lt, P) => {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'THE NEWS', headBg: STEEL, headInk: INK, lines: ['MARKETS UP', 'BONES UP'], size: 34 })
      L(x, 800, 1070, 'WILL BRIEF YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    }) },
  { sign: 'aquarius', cap: 'Won’t fetch. | *Invented* a new sport.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front: dog((x, t, lt, P) => {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const a = t * 5
      drawBits(x, BALL, { Y: '#c8ff4a', W: '#ffffff' }, 800 + Math.cos(a) * 110, 860 + Math.sin(a) * 110, 12 * k)
      drawBits(x, BALL, { Y: '#c8ff4a', W: '#ffffff' }, 800 - Math.cos(a) * 110, 860 - Math.sin(a) * 110, 12 * k)
      L(x, 800, 1090, 'RULES: UNCLEAR', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 32)
    }) },
  { sign: 'pisces', cap: 'Saw another dog | get petted. *Wept.*', mood: 'sparkle', tears: 3, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front: dog((x, t, lt, P) => {
      const F2 = friend(x, t, 'taurus', 820, 960, 180, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'heart', look: [0, -1], seed: 29 })
      if (F2) ears(x, t, F2)
      bubble(x, 820, 690, 'pat pat', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bc' })
      L(x, 820, 1140, 'BEAUTIFUL.', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 32)
    }) },
]

const F = makeFilm({
  id: 'r2t0502', key: 'E', accent: ACC, ending: 'lesson',
  title: 'The signs | *as dogs.*',
  cameos: CAMEOS,
  group: { cap: 'Walkies? | *ALL of them.*', moods: ['sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'happy', 'heart', 'squint', 'sparkle', 'happy', 'sparkle', 'sparkle'] },
  lesson: { text: 'Loyal, loud or dramatic: | *all* good dogs.', chip: 'STATUS: GOOD DOG' },
  last: { text: 'Who’s a good sign? | *You are.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
