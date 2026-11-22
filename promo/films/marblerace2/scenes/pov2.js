// marblerace2 · Race 2 from one pair's point of view. Same baked race as the main film (race2.js), so every version
// matches frame for frame. The camera stays on the pair; their running conversation plays as bubbles (the main film's
// lines plus their own); after they finish they comment from the corner while the camera follows whoever is still
// racing; an end card gives their place and their lesson. Used by promo/films/marblerace2-<pair>/.
import { clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER } from '../../signs3kit.js'
import { FPS, GATE, FINISH_Y, COURSE } from '../../marblerace/scenes/race.js'
import { makeBuild, MAIN_SAY, SIM, pos, FIN, PAIRS, PFIN, PORDER, PI_OF, SWALLOW, HOLE, ID, SIGN, ORD, clampY, NF, r2, T_LAST, PNAME } from './index.js'

const RETRO = COURSE.Z[0]
// [t, seconds, sign, text]: this pair's own lines (film seconds), written against the baked race (bake2.mjs timeline)
const LINES = {
  'taurus-cancer': [[3.2, 1.6, 'cancer', 'is the scarf | tight enough?'], [5.0, 1.4, 'taurus', 'perfect.'], [13.4, 1.8, 'taurus', 'ow. rude sun. | again.'],
    [15.6, 1.6, 'cancer', 'stay | close.'], [18.4, 1.8, 'taurus', 'black hole? | hard pass.'], [21.4, 1.8, 'cancer', 'was that... | Libra?'],
    [24.8, 1.8, 'cancer', 'up ahead: | retrograde.'], [29.6, 1.6, 'taurus', 'see? | floating.'], [34.6, 1.8, 'cancer', "we're... | in front?"],
    [36.8, 1.6, 'taurus', 'keep | our pace.'], [38.8, 1.6, 'cancer', 'almost | there.'], [43.6, 2.0, 'cancer', 'we | did it.'],
    [49.0, 2.0, 'taurus', 'snacks | for everyone?'], [53.0, 2.0, 'cancer', 'go Libra! | go Gemini!'], [57.0, 1.8, 'taurus', "we'll wait."]],
  'capricorn-aquarius': [[3.2, 1.6, 'capricorn', 'straight | down. go.'], [5.2, 1.8, 'aquarius', 'or a | loop-de-loop?'], [7.4, 1.2, 'capricorn', 'focus.'],
    [14.9, 1.6, 'aquarius', 'sun! | hi sun!'], [17.0, 1.6, 'capricorn', 'stay | on the line.'], [21.8, 1.8, 'aquarius', 'we skipped | the black hole?'],
    [24.0, 1.6, 'capricorn', 'rules are | rules.'], [28.6, 1.8, 'aquarius', "gravity's | flipping!"], [31.2, 1.8, 'capricorn', "we're 2nd. | hold it."],
    [40.4, 1.6, 'aquarius', 'we can | still...'], [46.0, 2.2, 'aquarius', '2nd together. | best lap ever.'], [50.0, 2.0, 'capricorn', '...fine. | it was fun.'],
    [54.4, 2.0, 'aquarius', 'next race: | MY route.'], [58.0, 1.6, 'capricorn', "...we'll see."]],
  'leo-aries': [[8.4, 1.6, 'leo', 'smile for | the cameras!'], [10.6, 1.6, 'aries', 'was that | a STAR?'], [12.4, 1.6, 'leo', "we're | still first!"],
    [17.0, 1.6, 'aries', 'black hole? | skip it!'], [19.6, 1.6, 'leo', 'leading | looks good.'], [22.4, 1.6, 'aries', "who's | behind us?"],
    [27.4, 1.6, 'leo', 'why are we | going UP?'], [32.6, 1.6, 'aries', "they're | passing us!"], [34.6, 1.6, 'leo', '...take | turns?'],
    [36.6, 1.8, 'aries', 'your turn. | lead.'], [39.0, 1.8, 'leo', 'together, | then.'], [41.6, 1.6, 'aries', 'GO GO GO!'],
    [47.0, 2.0, 'leo', '3rd. | still iconic.'], [50.4, 2.0, 'aries', 'we took | turns!'], [54.0, 2.0, 'leo', 'next time: | I lead.'], [56.4, 1.6, 'aries', "we'll | see."]],
  'pisces-scorpio': [[3.2, 1.6, 'pisces', "I'm so | proud of us."], [5.2, 1.6, 'scorpio', "we haven't | started."], [12.6, 1.6, 'pisces', 'the suns | waved at us!'],
    [15.0, 1.4, 'scorpio', 'black hole | ahead.'], [16.6, 1.4, 'pisces', "I'm | ready."], [21.6, 1.8, 'scorpio', '...plan B: | just roll.'],
    [23.8, 1.6, 'pisces', 'I like | plan B.'], [31.0, 1.8, 'pisces', 'floating! | like a dream!'], [33.6, 1.6, 'scorpio', 'hold on | to the rope.'],
    [38.2, 1.8, 'pisces', 'Saturn has | a hula hoop!'], [41.0, 1.4, 'scorpio', "it's | a ring."], [44.0, 1.6, 'pisces', 'are we | winning?'],
    [46.0, 1.6, 'scorpio', "we're | together."], [48.0, 1.4, 'pisces', '*sniff*'], [52.4, 2.0, 'scorpio', '4th. | the plan failed.'],
    [55.0, 2.0, 'pisces', 'best | failure ever.'], [58.4, 1.6, 'scorpio', '...yeah.']],
  'sagittarius-virgo': [[3.2, 1.8, 'sagittarius', 'which way? | all of them?'], [5.4, 1.6, 'virgo', 'down. | only down.'], [13.6, 1.6, 'sagittarius', 'a sun! | hello!'],
    [15.8, 1.8, 'virgo', 'that was | not on the map.'], [18.6, 1.8, 'sagittarius', "the map's | a plane now."], [21.0, 1.2, 'virgo', 'I know.'],
    [23.0, 1.6, 'sagittarius', 'souvenir | stop?'], [25.0, 1.0, 'virgo', 'no.'], [30.0, 1.8, 'sagittarius', 'upside down | is better!'],
    [32.6, 1.8, 'virgo', 'this was | not the plan.'], [35.2, 1.6, 'sagittarius', 'but is it | fun?'], [37.4, 1.4, 'virgo', '...a little.'],
    [40.0, 1.4, 'sagittarius', 'hi Saturn!'], [43.0, 1.4, 'virgo', 'left. | LEFT.'], [45.0, 1.2, 'sagittarius', 'right!'], [47.4, 1.6, 'virgo', '...okay. | right.'],
    [54.0, 2.0, 'sagittarius', 'souvenirs | for everyone!'], [57.0, 2.0, 'virgo', '...it was | a good detour.']],
  'libra-gemini': [[3.2, 1.6, 'gemini', 'left or | right?'], [5.0, 1.2, 'libra', '...yes?'], [8.0, 1.4, 'gemini', 'you pick!'], [9.6, 1.4, 'libra', "I can't!"],
    [15.0, 1.4, 'libra', "we're | free!"], [17.2, 1.6, 'gemini', 'black hole! | ooh, shiny.'], [19.2, 1.6, 'libra', "don't look | at it."],
    [26.0, 1.8, 'libra', "everyone's | so far ahead."], [28.0, 1.2, 'gemini', 'more race | for us!'], [29.6, 1.8, 'libra', 'the suns?? | AGAIN??'],
    [31.8, 1.6, 'gemini', 'hi again, | suns!'], [35.0, 1.8, 'libra', 'should we have | gone left?'], [37.2, 1.8, 'gemini', 'we went | BOTH ways!'],
    [40.4, 1.8, 'libra', "I'm sorry I | couldn't choose."], [43.0, 1.6, 'gemini', "I'm not | sorry."], [45.4, 1.2, 'libra', '...why?'],
    [47.4, 1.8, 'gemini', 'more time | with you.'], [50.0, 1.2, 'libra', '...oh.']],
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
  const focus = key.split('-'), [A, B] = focus, P = PI_OF(A), place = PORDER.indexOf(P) + 1, fin = PFIN[P], sw = SWALLOW[A]
  const END = r2(T_LAST + 0.9), DURATION = r2(END + 7.2)
  const mid = t => (clampY(pos(t, ID(A))[1]) + clampY(pos(t, ID(B))[1])) / 2
  const CAM = new Float32Array(NF)
  const target = t => {
    if (t < GATE + 0.2) return Math.max(-330, mid(t) - 1050)
    if (sw && t > sw.t - 1.4 && t < sw.t + 0.9) return HOLE.y - 1000
    if (t < fin + 1.2) return mid(t) - 1050
    const run = PAIRS.map((p, i) => i).filter(i => PFIN[i] > t).map(i => (clampY(pos(t, ID(PAIRS[i][0]))[1]) + clampY(pos(t, ID(PAIRS[i][1]))[1])) / 2)
    return (run.length ? Math.max(...run) : FINISH_Y + 60) - 1050
  }
  let c = target(0)
  for (let f = 0; f < NF; f++) { const t = f / FPS, tg = target(t); if (Math.abs(tg - c) > 1300) c = tg; else c += (tg - c) * (1 - Math.exp(-(1 / FPS) / 0.22)); CAM[f] = c }
  const camAt = t => { const f = Math.max(0, Math.min(NF - 1, t * FPS)), a = Math.floor(f), b = Math.min(NF - 1, a + 1); return CAM[a] + (CAM[b] - CAM[a]) * (f - a) }

  const SAY = [...MAIN_SAY, ...LINES[key].map(l => [...l, true])].sort((a, b) => a[0] - b[0])
  const STICK = [[GATE + 0.05, 1.8, (PNAME([A, B]) + "'S RACE").toUpperCase(), GOLD, INK]]
  const hits = []; for (const e of SIM.events) if (focus.includes(e.id) && e.kind === 'sun' && !hits.some(h => Math.abs(h - e.t) < 2.5)) hits.push(e.t)
  for (const h of hits) STICK.push([h + 0.05, 1.3, 'BINARY STAR!', GOLD, INK])
  if (sw) STICK.push([sw.t + 0.02, 0.9, 'BLACK HOLE!!', PINK, INK], [sw.t + 0.92, 1.6, '…BACK TO THE START.', GOLD, INK])
  let rin = null; for (let f = 0; f < NF; f++) { const t = f / FPS; if (pos(t, ID(A))[1] > RETRO.y0 && (!sw || t > sw.t + 1)) { rin = t; break } }
  if (rin !== null) STICK.push([rin + 0.7, 1.6, 'RETROGRADE…', PINK, INK])
  if (END - fin > 4) STICK.push([fin + 1.25, 1.8, 'MEANWHILE…', GOLD, INK])
  STICK.sort((a, b) => a[0] - b[0])
  for (let k = 1; k < STICK.length; k++) if (STICK[k][0] < STICK[k - 1][0] + STICK[k - 1][1]) STICK[k - 1][1] = Math.max(0.6, STICK[k][0] - STICK[k - 1][0] - 0.05)

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
    ...hits.map(h => ['pluck', r2(h), 392, 0.025, 0.3, 0]),
    ...(sw ? [['whoosh', r2(sw.t), 0.9, 0.035]] : []),
    ['bell', r2(fin + 0.05), place === 1 ? 1760 : 1318.5, 0.022, 1.6, 0],
    ...PORDER.filter(i => i !== P && PFIN[i] > fin).map(i => ['pop', r2(PFIN[i]), NOTE[(5 - PORDER.indexOf(i)) % 6], 0.015, 0]),
    ['glitter', r2(END + 0.6), r2(END + 1.4)], ['bell', r2(END + 1.45), 1046.5, 0.016, 1.8, 0],
  ].sort((a, b) => a[1] - b[1])
  return { HOOK: 'Same pairs race. | ' + CARD[key][0], HOOK_STYLE: 'box', HOOK_UNTIL: 2.6, SCENES: [makeBuild({ camAt, SAY, STICK, focus, end, endT: END })], DURATION, STORY_END: DURATION, CUES, T: { gate: GATE, fin, end: END } }
}
