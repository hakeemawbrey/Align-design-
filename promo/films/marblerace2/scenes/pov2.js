// marblerace2 · Race 2 from one pair's point of view. Same baked race as the main film (race2.js), so every version
// matches frame for frame. The camera stays on the pair (holding on a black hole for each gulp); their running
// conversation plays as bubbles (the main film's lines plus their own); after they finish they comment from the corner
// while the camera follows whoever is still racing; an end card gives their place and their lesson.
import { clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER } from '../../signs3kit.js'
import { FPS, GATE } from '../../marblerace/scenes/race.js'
import { makeBuild, MAIN_SAY, pos, PAIRS, PFIN, PORDER, PI_OF, SWALLOWS, HOLES, ID, SIGN, ORD, clampY, NF, r2, PNAME, COURSE, FINISH_Y } from './index.js'

const RETRO = COURSE.Z.find(z => z.g < 0)
// [t, seconds, sign, text]: this pair's own lines (film seconds), written against the baked race (bake2.mjs timeline)
const LINES = {
  'taurus-cancer': [[3.2, 1.5, 'cancer', 'is the scarf | tight enough?'], [5.0, 1.2, 'taurus', 'perfect.'], [11.3, 1.4, 'taurus', 'meteor. | rude.'],
    [13.0, 1.6, 'cancer', "everyone's | so far ahead."], [15.0, 1.4, 'taurus', 'our pace.'], [17.2, 1.4, 'cancer', 'which hole?'], [19.0, 1.2, 'taurus', 'neither.'],
    [21.0, 1.6, 'cancer', 'Leo & Aries | went LEFT.'], [22.8, 1.1, 'taurus', 'noted.'], [28.0, 1.6, 'cancer', "we're | 3rd now!"], [30.4, 1.2, 'taurus', 'boing.'],
    [32.4, 1.6, 'cancer', "they're | still fighting."], [35.0, 1.4, 'taurus', 'let them.'], [37.2, 1.6, 'cancer', 'is that | Jupiter?'], [39.0, 1.2, 'taurus', 'big.'],
    [43.0, 1.6, 'cancer', 'Sagittarius | got eaten!'], [54.2, 1.8, 'taurus', 'we did.'], [56.6, 1.8, 'cancer', 'by a | crumb.']],
  'capricorn-aquarius': [[3.2, 1.5, 'capricorn', 'straight | down. go.'], [5.0, 1.6, 'aquarius', 'or a | loop-de-loop?'], [7.0, 1.0, 'capricorn', 'focus.'],
    [10.8, 1.4, 'aquarius', 'meteor! | cool!'], [12.6, 1.6, 'capricorn', "5th. | unacceptable."], [15.0, 1.2, 'aquarius', 'wind!'], [17.0, 1.6, 'capricorn', 'no holes. | rules.'],
    [19.4, 1.4, 'aquarius', 'bye Leo!'], [21.2, 1.6, 'capricorn', 'first. | finally.'], [23.4, 1.6, 'aquarius', 'Sagittarius | is back.'], [26.0, 1.4, 'capricorn', 'not today.'],
    [34.3, 1.4, 'aquarius', 'moon! | hi!'], [41.0, 1.6, 'capricorn', "we're | ahead!"], [42.8, 1.2, 'aquarius', 'by a lot?'], [44.4, 1.1, 'aquarius', '...whoa.'],
    [47.6, 1.6, 'aquarius', "something's | behind us."], [49.6, 1.2, 'capricorn', 'who?'], [51.2, 1.1, 'aquarius', 'Taurus.'],
    [54.4, 1.8, 'capricorn', '2nd. | AGAIN??'], [56.6, 2.0, 'aquarius', 'by 0.12. | so close!']],
  'sagittarius-virgo': [[3.2, 1.6, 'sagittarius', 'which way? | all of them?'], [5.0, 1.4, 'virgo', 'down. | only down.'], [10.1, 1.3, 'virgo', 'METEOR.'],
    [12.2, 1.6, 'sagittarius', "we're | winning!"], [14.2, 1.3, 'virgo', 'for now.'], [16.6, 1.6, 'sagittarius', 'a black hole! | two!'], [18.4, 1.4, 'virgo', 'we go | between.'],
    [20.6, 1.6, 'sagittarius', 'still | winning!'], [22.6, 1.6, 'virgo', 'Capricorn | is close.'], [24.6, 1.6, 'sagittarius', "gravity's | upside down!"],
    [36.2, 1.6, 'sagittarius', 'race you, | Capricorn!'], [38.4, 1.4, 'virgo', 'we ARE | racing them.'], [40.4, 1.2, 'sagittarius', 'comet!!'],
    [45.3, 1.6, 'virgo', 'where... | are we?'], [47.2, 1.6, 'sagittarius', 'the meteors! | again!'], [49.4, 1.6, 'virgo', 'this was NOT | on the map.'],
    [51.6, 1.3, 'sagittarius', 'souvenirs!'], [53.4, 1.6, 'virgo', 'left hole | or right?'], [55.5, 1.4, 'sagittarius', '...left.'], [57.6, 1.6, 'virgo', 'the START??'],
    [59.6, 1.6, 'sagittarius', 'the long | way!'], [61.6, 1.6, 'sagittarius', 'pulsar! | again!'], [64.6, 1.6, 'virgo', 'I know | this part.'],
    [67.6, 1.4, 'sagittarius', 'the holes...'], [69.2, 1.4, 'virgo', 'BETWEEN them.'], [71.4, 1.4, 'sagittarius', 'supernova!'], [74.0, 1.6, 'virgo', 'retrograde. | again.'],
    [77.6, 1.6, 'sagittarius', "we're | experts now."], [81.0, 1.4, 'sagittarius', 'hi Jupiter!'], [84.4, 1.4, 'virgo', 'almost | there.'],
    [87.2, 1.8, 'virgo', 'not the horizon. | please.'], [89.4, 1.4, 'sagittarius', 'they WAITED!']],
  'libra-gemini': [[3.2, 1.5, 'gemini', 'left or | right?'], [5.0, 1.2, 'libra', '...yes?'], [7.4, 1.4, 'gemini', 'you pick!'], [11.4, 1.4, 'gemini', 'meteors! | pretty!'],
    [13.4, 1.6, 'libra', "we're in | the middle."], [15.0, 1.1, 'gemini', 'perfect!'], [18.2, 1.6, 'gemini', 'left one! | no, right!'], [20.2, 1.6, 'libra', '...we went | between.'],
    [22.2, 1.4, 'gemini', 'by accident!'], [24.4, 1.6, 'libra', "gravity's | flipping."], [26.6, 1.2, 'gemini', 'wheee!'], [29.0, 1.4, 'libra', "we're | 4th?"],
    [31.0, 1.2, 'gemini', 'boing!'], [33.4, 1.6, 'libra', 'careful. | moons.'], [36.0, 1.6, 'gemini', 'left or right | of Jupiter?'], [38.0, 1.3, 'libra', '...middle.'],
    [45.4, 1.6, 'gemini', "we're | 3rd now!"], [47.6, 1.6, 'libra', "don't look | at the hole."], [49.6, 1.6, 'gemini', 'we missed | everything!'],
    [51.6, 1.6, 'libra', 'the middle | worked?'], [53.6, 1.4, 'gemini', 'it worked!']],
  'pisces-scorpio': [[3.2, 1.3, 'pisces', "I'm so | proud of us."], [8.2, 1.3, 'scorpio', 'still | first.'], [9.8, 1.4, 'pisces', 'a meteor | hit me!'],
    [11.8, 1.6, 'scorpio', "we're | slipping."], [14.0, 1.4, 'pisces', 'is it | time?'], [15.8, 1.2, 'scorpio', 'almost.'], [23.6, 1.6, 'scorpio', '...plan B: | just roll.'],
    [25.6, 1.6, 'pisces', 'I like | plan B.'], [28.0, 1.4, 'scorpio', 'last place.'], [30.0, 1.6, 'pisces', 'together, | though.'], [33.0, 1.6, 'pisces', 'a supernova! | so pretty!'],
    [35.6, 1.4, 'scorpio', "it's | exploding."], [38.0, 1.4, 'pisces', 'floating!'], [41.0, 1.4, 'scorpio', 'hold | the rope.'], [43.6, 1.2, 'pisces', 'boing!'],
    [47.2, 1.4, 'pisces', 'comets!'], [50.0, 1.6, 'scorpio', 'the horizon. | NOT again.'], [52.6, 1.6, 'pisces', 'we made | it past!'], [56.0, 1.6, 'scorpio', '4th. | probably.'],
    [58.6, 1.2, 'pisces', '*sniff*'], [60.4, 1.2, 'scorpio', 'almost.']],
  'leo-aries': [[4.8, 1.4, 'leo', 'smile for | the cameras!'], [6.8, 1.2, 'aries', 'faster!'], [9.0, 1.4, 'leo', 'meteors? | rude.'], [10.6, 1.3, 'aries', "we're | 3rd!"],
    [15.6, 1.4, 'leo', 'still | leading!'], [17.4, 1.4, 'aries', 'left? | right?'], [20.4, 1.6, 'leo', 'where | are we?'], [22.2, 1.6, 'aries', 'THE START??'],
    [24.4, 1.2, 'leo', 'meteor!'], [26.2, 1.4, 'aries', "we're LAST."], [28.2, 1.4, 'leo', 'take turns?'], [30.0, 1.4, 'aries', 'your turn. | lead.'],
    [32.0, 1.4, 'leo', 'together, | then.'], [34.4, 1.4, 'leo', 'between | the holes!'], [36.2, 1.3, 'aries', 'supernova!'], [38.4, 1.3, 'leo', 'floating...'],
    [40.4, 1.4, 'aries', "we're | going UP."], [42.6, 1.3, 'leo', 'still up.'], [44.8, 1.6, 'aries', 'I hate | retrograde.'], [47.0, 1.3, 'leo', 'patience.'],
    [49.0, 1.6, 'aries', 'LEO said | patience?'], [51.4, 1.4, 'leo', "I'm | growing."], [54.0, 1.2, 'aries', 'boing!'], [56.3, 1.3, 'leo', 'a moon?!'],
    [58.6, 1.4, 'aries', 'comets!'], [61.0, 1.6, 'leo', 'the horizon. | go LEFT.'], [63.2, 1.3, 'aries', 'LEFT!'], [65.0, 1.4, 'leo', 'we made it!'], [67.4, 1.4, 'aries', 'almost | home.']],
}
const CARD = {
  'taurus-cancer': ["Taurus & Cancer's side.", ['Go at the pace', 'you can keep together.']],
  'capricorn-aquarius': ["Capricorn & Aquarius's side.", ['Your plan and their idea', 'can share one rope.']],
  'leo-aries': ["Leo & Aries's side.", ['Two leaders can work.', 'Take turns.']],
  'pisces-scorpio': ["Pisces & Scorpio's side.", ['Even if the plan fails,', 'you still have each other.']],
  'sagittarius-virgo': ["Sagittarius & Virgo's side.", ['The right partner', 'makes getting lost fun.']],
  'libra-gemini': ["Libra & Gemini's side.", ['One of you decides.', 'One of you steadies.']],
}
export { LINES }

export function makePOV2(key) {
  const focus = key.split('-'), [A, B] = focus, P = PI_OF(A), place = PORDER.indexOf(P) + 1, fin = PFIN[P]
  const mine = SWALLOWS.filter(e => e.id === A)
  const END = r2(Math.max(fin, PFIN[PORDER[2]]) + 2.0), DURATION = r2(END + 7.2)
  const mid = t => (clampY(pos(t, ID(A))[1]) + clampY(pos(t, ID(B))[1])) / 2
  const holeY = name => HOLES.find(h => h.name === name).y
  const CAM = new Float32Array(NF)
  const target = t => {
    if (t < GATE + 0.2) return Math.max(-330, mid(t) - 1050)
    for (const e of mine) if (t > e.t - 1.2 && t < e.t + 0.25) return holeY(e.hole) - 1000
    if (t < fin + 1.2) return mid(t) - 1050
    const run = PAIRS.map((p, i) => i).filter(i => PFIN[i] > t).map(i => (clampY(pos(t, ID(PAIRS[i][0]))[1]) + clampY(pos(t, ID(PAIRS[i][1]))[1])) / 2)
    return (run.length ? Math.max(...run) : FINISH_Y + 60) - 1050
  }
  let c = target(0)
  for (let f = 0; f < NF; f++) { const t = f / FPS, tg = target(t); if (Math.abs(tg - c) > 1300) c = tg; else c += (tg - c) * (1 - Math.exp(-(1 / FPS) / 0.22)); CAM[f] = c }
  const camAt = t => { const f = Math.max(0, Math.min(NF - 1, t * FPS)), a = Math.floor(f), b = Math.min(NF - 1, a + 1); return CAM[a] + (CAM[b] - CAM[a]) * (f - a) }

  const SAY = [...MAIN_SAY, ...LINES[key].map(l => [...l, true])].sort((a, b) => a[0] - b[0])
  const STICK = [[GATE + 0.05, 1.8, (PNAME([A, B]) + "'S RACE").toUpperCase(), GOLD, INK]]
  const TXT = { start: ['LEFT HOLE!!', '…BACK TO THE START.'], shortcut: ['SHORTCUT!!', null], horizon: ['EVENT HORIZON!!', '…BACK TO THE METEORS.'] }
  for (const e of mine) { const [a, b] = TXT[e.hole]; STICK.push([e.t + 0.02, 0.9, a, e.hole === 'shortcut' ? GOLD : PINK, INK]); if (b) STICK.push([e.t + 0.95, 1.5, b, GOLD, INK]) }
  let rin = null; for (let f = 0; f < NF; f++) { const t = f / FPS, y = pos(t, ID(A))[1]; if (y > RETRO.y0 && y < RETRO.y1) { rin = t; break } }
  if (rin !== null) STICK.push([rin + 0.5, 1.5, 'RETROGRADE…', PINK, INK])
  if (END - fin > 4) STICK.push([fin + 1.25, 1.8, 'MEANWHILE…', GOLD, INK])
  STICK.sort((a, b) => a[0] - b[0])
  for (let k = 1; k < STICK.length; k++) if (STICK[k][0] < STICK[k - 1][0] + STICK[k - 1][1]) STICK[k - 1][1] = Math.max(0.3, STICK[k][0] - STICK[k - 1][0] - 0.03)

  function end(x, t) {
    const ck = clamp((t - fin - 1.2) / 0.4) * (1 - clamp((t - END) / 0.3))
    if (ck > 0) focus.forEach((id, q) => drawStarChar(x, 180 + q * 130, 1260, 120, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: place <= 3 ? 'heart' : 'happy', seed: 4 + q, pop: ck, look: [0.6, -0.4] }))
    if (t < END) return
    const a = clamp((t - END) / 0.5)
    x.fillStyle = `rgba(8,5,22,${(0.92 * a).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
    const lesson = CARD[key][1], sk = pop01(t, END + 0.3, 0.4, 1.7)
    if (sk > 0) {
      focus.forEach((id, q) => drawStarChar(x, 410 + q * 260, 880 + (1 - sk) * 60, 220, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: 'heart', seed: 7 + q, pop: clamp(sk), hops: [END + 1.4 + q * 0.2, END + 2.9 + q * 0.2, END + 4.4 + q * 0.2] }))
      x.save(); x.globalAlpha = clamp(sk); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 58px ${INTER}`; x.fillStyle = BONE; x.fillText(PNAME([A, B]), 540, 600); x.restore()
      label(x, 540, 1110, `${ORD(place)} of 6`, sk, { size: 40, bg: place === 1 ? GOLD : BONE, rot: -0.04 })
      if (t > END + 0.6) sparkles(x, t, 540, 860, END + 0.6, 12, 240, 7)
    }
    const lk = pop01(t, END + 1.4, 0.45, 1.5)
    if (lk > 0) {
      x.save(); x.globalAlpha = clamp(lk); x.textAlign = 'center'; x.textBaseline = 'middle'
      lesson.forEach((ln, j) => { const last = j === lesson.length - 1; x.font = last ? `italic 500 66px 'EB Garamond', Georgia, serif` : `800 54px ${INTER}`; x.fillStyle = last ? GOLD : BONE; x.fillText(ln, 540, 1260 + j * 76) })
      x.restore()
    }
  }
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
  const CUES = [
    ['pluck', r2(GATE), 784, 0.03, 0.4, 0], ['whoosh', r2(GATE + 0.05), 0.5, 0.02],
    ...mine.map(e => ['whoosh', r2(e.t), 0.9, 0.035]),
    ['bell', r2(fin + 0.05), place === 1 ? 1760 : 1318.5, 0.022, 1.6, 0],
    ...PORDER.filter(i => i !== P && PFIN[i] > fin && PFIN[i] < END).map(i => ['pop', r2(PFIN[i]), NOTE[(5 - PORDER.indexOf(i)) % 6], 0.015, 0]),
    ['glitter', r2(END + 0.6), r2(END + 1.4)], ['bell', r2(END + 1.45), 1046.5, 0.016, 1.8, 0],
  ].sort((a, b) => a[1] - b[1])
  return { HOOK: 'Same pairs race. | ' + CARD[key][0], HOOK_STYLE: 'box', HOOK_UNTIL: 2.6, SCENES: [makeBuild({ camAt, SAY, STICK, focus, end, endT: END, dur: DURATION })], DURATION, STORY_END: DURATION, CUES, T: { gate: GATE, fin, end: END } }
}
