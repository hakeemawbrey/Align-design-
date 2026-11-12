// r2t0737: star_talk, BE LIKE, "Zodiacs when the food arrives | be like." (signs3kit social cut, lofi · E). Ending: callback.
//   ♈ ate it before it landed · ♉ hugged the plate, whispered "finally." · ♊ talked so much the food got cold
//   · ♋ saved a bite for everyone at home · ♌ not their birthday, got the song anyway · ♍ sent it back, crooked parsley
//   · ♎ moved the plate for better lighting · ♏ knew your order before you did · ♐ ordered the mystery dish, asked for two more
//   · ♑ ate in nine minutes, back to work · ♒ soup with chopsticks, on purpose · ♓ the food arrived, happy tears
//   group "Silence. | Everyone's eating."  callback: "Aquarius is still | on the soup." (the chopsticks, minute 45)
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, steam, soupSticks, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Ate it | *before it landed.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, -1], star: ST, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      const fly = ease.outCubic(prog(lt, 0.2, 0.8))
      bits(x, 'PLATE', lerp(1000, 800, fly), lerp(560, 720, fly) + Math.sin(t * 6) * 6, 18 * clamp(fly * 3), { rot: -0.2 + 0.1 * fly })
      bits(x, 'FORK', 650, 860, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.5 })
      L(x, 800, 1000, 'PLATE: STILL AIRBORNE', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Hugged the plate. | Whispered *"finally."*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 760, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 760, 920, { n: 3 })
      bubble(x, 800, 700, 'finally.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl' })
      hearts(x, t, 700, 980, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Talked so much | the food *got cold.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['so anyway—', 'and THEN—', 'wait, also—', 'okay so—']
      bubble(x, 800, 700, W[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bits(x, 'PLATE', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SNOW', 860, 900, 9 * pop01(t, P.t0 + 1.3, 0.3, 2.4))
      L(x, 800, 1120, 'FOOD TEMP: ICE AGE', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, -0.04, 28)
    } },
  { sign: 'cancer', cap: 'Saved a bite | for *everyone at home.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      const N = ['MOM', 'DOG', 'NEIGHBOUR']
      N.forEach((n, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), cy = 1060 - i * 140
        bits(x, 'BOX', 740, cy, 14 * k)
        L(x, 880, cy, n, pop01(t, P.t0 + 0.5 + i * 0.35, 0.3, 2.2), CREAM, i % 2 ? 0.05 : -0.05, 28)
      })
      bubble(x, 790, 640, 'for later!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Not their birthday. | Got *the song anyway.*', mood: 'sparkle', star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'CUPCAKE', 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 800, 820, { n: 4, cell: 7, col: '#ffb34a', seed: 1 })
      L(x, 800, 690, 'HAPPY B-DAY, LEO', pop01(t, P.t0 + 0.8, 0.3, 2.2), '#ffb34a', -0.04, 32)
      bubble(x, 800, 1130, "it's in may.", pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Sent it back. | Parsley was *crooked.*', mood: lt => lt > 1.4 ? 'neutral' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PARS', 830, 910, 10 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.5 })
      bits(x, 'LENS', 860, 840, 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.1 })
      L(x, 800, 690, 'ANGLE: 3° OFF', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Moved the plate | for *better lighting.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, -1], star: ST,
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.8, 1.2))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(780, 650); x.lineTo(820, 650); x.lineTo(940, 1060); x.lineTo(660, 1060); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      bits(x, 'LAMP', 800, 620, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const mv = ease.inOutCubic(prog(lt, 0.4, 0.9))
      bits(x, 'PLATE', lerp(640, 800, mv), 1020, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1150, 'GOLDEN HOUR: FOUND', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Knew your order | *before you did.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 290, h: 250, head: 'YOUR ORDER', headBg: '#c97bff', lines: ['noodles.', 'extra spicy.', 'no onions.'], size: 32, progress: clamp((lt - 0.3) / 0.8) })
      bubble(x, 800, 1100, "you're welcome.", pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Ordered the mystery dish. | Asked *for two more.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const lift = ease.outCubic(prog(lt, 0.9, 1.3))
      bits(x, 'PLATE', 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOCHE', 800, 930 - 90 * lift, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lift * 0.3 })
      L(x, 800, 700, 'WHAT IS IT? NO IDEA', pop01(t, P.t0 + 0.6, 0.3, 2.2), '#ff9a4a', -0.04, 28)
      L(x, 800, 1140, 'ORDER: 2 MORE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Ate in nine minutes. | *Back to work.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'LAPTOP', 800, 990, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1150, 'LUNCH: 9:00 FLAT', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Soup with chopsticks. | *On purpose.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      soupSticks(x, t, 790, 1000, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'more fun', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'The food arrived. | *Happy tears.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 960, P.t0 + 0.5, 7, 180, 0.4)
      bubble(x, 800, 710, "it's so beautiful", pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0737', key: 'E', accent: ACC, ending: 'callback',
  title: 'Food\'s here? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Silence. | *Everyone\'s eating.*' },
  last: {
    text: 'Aquarius is still | *on the soup.*',
    draw(x, t, lt) {
      soupSticks(x, t, 540, 1120, pop01(t, t - lt + 0.5, 0.4, 2), 26)
      L(x, 540, 1340, 'MINUTE 45', pop01(t, t - lt + 1.5, 0.3, 2.2), SKYB, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
