// marblerace · Race 1, one sign's point of view. Same simulate() call as the main film (seed 38), so every POV matches
// the main race frame for frame. The camera stays on one sign; that sign's inner monologue runs as bubbles (the main
// film's lines plus its own); after it finishes, it comments from the corner while the camera follows whoever is still
// racing; an end card gives its place and its love lesson (SERIES.md). Used by promo/films/marblerace-<sign>/.
import { clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER } from '../../signs3kit.js'
import { FPS, GATE, FINISH_Y, COURSE } from './race.js'
import { makeBuild, MAIN_SAY, SIM, pos, FIN, ORDER, SWALLOW, HOLE, ID, SIGN, ORD, clampY, NF, r2, T_LAST } from './index.js'

const RETRO = COURSE.Z[0]

// [t, seconds, sign, text]: extra lines for this POV (other signs' replies included). Times are film seconds.
const LINES = {
  aries: [[6.0, 2, 'aries', 'out of my way, | space rocks!'], [14.3, 2, 'aries', 'did a STAR | just hit me?'], [19.8, 2, 'aries', 'spin faster, | wheel!'],
    [23.4, 2.2, 'aries', 'black hole? | too slow for me.'], [29.4, 2.2, 'aries', 'wait. people | are passing me?'], [31.8, 2, 'taurus', 'we stopped | for snacks.'],
    [34.0, 2, 'aries', 'UP?? which way | is forward?'], [37.4, 1.8, 'aries', 'planet. | bonk.'], [42.2, 2.2, 'aries', 'left everyone | behind. again.'],
    [44.6, 2, 'aquarius', 'you could | wait sometimes.'], [50.0, 2.4, 'aries', '7th?? | rematch.'], [53.4, 2.6, 'aries', '...next time | I look back.']],
  taurus: [[2.9, 1.8, 'taurus', 'no rush.'], [9.6, 1.8, 'taurus', 'careful, | crumbs.'], [16.9, 1.8, 'taurus', 'ow. | rude sun.'],
    [20.6, 2.2, 'taurus', 'pretty wheel. | want to stop?'], [24.2, 2, 'taurus', 'black hole? | hard pass.'], [28.6, 2.2, 'taurus', 'wonder where | Cancer is.'],
    [33.4, 2, 'taurus', "gravity's | going UP."], [36.4, 2.2, 'taurus', "fine. I'll | wait it out."], [40.6, 1.8, 'taurus', 'Saturn. | so pretty.'],
    [42.6, 1.8, 'taurus', 'there | you are.'], [52.6, 2.4, 'taurus', '11th. | best race ever.'], [55.2, 2, 'taurus', 'go Virgo!']],
  gemini: [[3.0, 1.8, 'gemini', 'race? | which one?'], [7.6, 2, 'gemini', 'wait, was | that a rock?'], [12.4, 2, 'gemini', 'two suns! | like me!'],
    [15.0, 1.8, 'gemini', 'spinny! | again!'], [25.4, 2, 'gemini', 'hi Capricorn! | race you!'], [34.0, 2.0, 'gemini', 'Capricorn, | high five?'],
    [36.4, 2.4, 'gemini', 'wait, everyone | else is still racing?'], [39.4, 2.2, 'gemini', 'is this the | lucky part?'], [43.4, 2.4, 'gemini', "I'd share the | trophy. half each."],
    [48.0, 2.2, 'gemini', 'go Taurus! | go Cancer!'], [53.4, 2.2, 'gemini', 'Virgo! | almost there!']],
  cancer: [[3.0, 1.8, 'cancer', 'is everyone | okay?'], [10.0, 1.8, 'cancer', 'best snack | ever.'], [13.4, 2, 'cancer', 'so many rocks. | stay close.'],
    [19.6, 1.8, 'cancer', 'Taurus, | wait up!'], [22.4, 2, 'cancer', 'that hole | looks lonely.'], [28.0, 2, 'cancer', 'is it... | getting slower?'],
    [37.4, 2, 'cancer', 'I want | to go home.'], [39.8, 1.8, 'cancer', 'okay. | down again.'], [41.9, 2, 'cancer', "where's | Taurus?"],
    [52.2, 2.2, 'cancer', 'we did it. | together.'], [55.0, 2.2, 'cancer', "Virgo, | we're waiting!"]],
  leo: [[3.0, 2, 'leo', 'cameras on me, | please.'], [8.0, 1.8, 'leo', 'watch this | angle.'], [16.2, 2, 'leo', 'that sun | copied me.'],
    [18.6, 2, 'leo', 'a wheel | of ME.'], [21.2, 2.2, 'leo', 'a black hole? | no spotlight.'], [26.0, 2, 'leo', 'where did | everyone look?'],
    [30.6, 2, 'leo', 'UP? | dramatic.'], [33.6, 2, 'leo', "I'd like | a rings moment."], [37.6, 1.8, 'leo', 'am I | winning?'],
    [40.6, 2, 'leo', "...who's | clapping?"], [46.0, 2.2, 'leo', '5th. | still iconic.'], [49.4, 2.4, 'leo', "go Pisces! | I'm clapping!"], [53.4, 2.2, 'leo', 'encore | for Virgo!']],
  virgo: [[3.0, 2, 'virgo', 'lane checked. | line planned.'], [7.6, 1.8, 'virgo', "rock at | 2 o'clock."], [14.6, 2, 'virgo', 'a sun was | not on the map.'],
    [18.8, 1.8, 'virgo', 'wheel speed: | annoying.'], [22.4, 1.8, 'virgo', 'avoiding | the black hole.'], [26.4, 1.8, 'virgo', 'perfect. | on schedule.'],
    [30.2, 2.2, 'virgo', 'why is everyone | slowing down?'], [34.0, 2, 'virgo', "I'll just | wait. calmly."], [40.8, 2, 'virgo', 'could someone | help?'],
    [45.0, 2, 'virgo', 'Saturn: | not in the plan.'], [49.4, 1.8, 'virgo', 'comet: | also not.']],
  libra: [[3.0, 2, 'libra', 'left lane? | right lane?'], [6.6, 1.6, 'libra', '...both?'], [9.8, 2, 'libra', "Taurus, which | way's better?"],
    [12.0, 2, 'taurus', 'whichever | has snacks.'], [16.4, 2, 'libra', "two suns. | I can't choose."], [20.0, 2, 'libra', 'Cancer, | left or right?'],
    [22.2, 2, 'cancer', "just pick one. | it's okay."], [25.2, 1.8, 'libra', 'okay. | middle.'], [31.0, 2.2, 'libra', 'up AND down? | finally, balance.'],
    [35.0, 1.8, 'libra', 'this is | fair, right?'], [39.6, 1.8, 'libra', 'pros: | Saturn.'], [42.4, 1.8, 'libra', 'cons: | also Saturn.'],
    [45.6, 2, 'libra', "I'll just | follow Cancer."], [51.0, 2.2, 'libra', '9th. | right in the middle.'], [54.2, 2.2, 'libra', 'should I have | gone left?']],
  scorpio: [[3.0, 1.8, 'scorpio', 'watching | everyone.'], [7.6, 1.8, 'scorpio', "Virgo's | line is good."], [11.0, 1.4, 'scorpio', 'noted.'],
    [15.2, 1.8, 'scorpio', 'I see | your strategy.'], [19.2, 1.8, 'pisces', 'you look | so brave.'], [21.0, 1.4, 'scorpio', '...thanks.'],
    [28.4, 2, 'scorpio', 'totally | planned that.'], [31.0, 1.8, 'scorpio', '3rd. | as intended.'], [35.4, 2.4, 'scorpio', "I can't lie. | I panicked."],
    [39.4, 2, 'scorpio', 'is Pisces | okay?'], [43.4, 2.2, 'scorpio', "...I'll wait | for Pisces."], [50.2, 1.8, 'scorpio', 'you made it.'],
    [53.4, 2.2, 'scorpio', 'fine. | I was scared.']],
  sagittarius: [[3.0, 1.8, 'sagittarius', 'where are | we going?'], [7.0, 1.8, 'sagittarius', "who cares! | let's go!"], [11.4, 1.6, 'sagittarius', 'road trip!'],
    [17.6, 1.8, 'sagittarius', 'ANOTHER | spin!'], [20.4, 1.8, 'sagittarius', 'black hole? | sounds fun!'], [23.0, 1.8, 'sagittarius', '...it missed | me. sad.'],
    [26.8, 2, 'sagittarius', 'upside down | is better!'], [31.0, 1.6, 'sagittarius', 'hi Saturn!'], [34.4, 1.8, 'sagittarius', 'comet! | race you!'],
    [37.6, 1.8, 'sagittarius', 'almost done? | no!'], [44.2, 2.2, 'sagittarius', 'again? can | we go again?'], [48.4, 2.2, 'sagittarius', 'Aquarius! | that route!'],
    [53.2, 2.2, 'sagittarius', 'best long way | ever.']],
  capricorn: [[3.0, 1.8, 'capricorn', 'I have | a plan.'], [6.6, 1.8, 'capricorn', 'step one: | lead.'], [14.4, 1.8, 'capricorn', 'Gemini, | stay back.'],
    [18.0, 1.6, 'capricorn', 'do NOT | look at it.'], [25.4, 2, 'capricorn', 'who has | the rulebook?'], [34.2, 2, 'capricorn', '0.3 | seconds.'],
    [36.8, 2, 'capricorn', 'I planned | everything.'], [39.8, 2, 'capricorn', 'except | the fun part.'], [44.0, 2.2, 'capricorn', 'Gemini. | ...good race.'],
    [48.2, 2, 'capricorn', '...high five?'], [53.2, 2.2, 'capricorn', 'next race: | a team.']],
  aquarius: [[3.0, 2, 'aquarius', "everyone's | going left."], [6.2, 1.6, 'aquarius', 'so, | right.'], [9.4, 1.8, 'leo', 'where are | you going?'],
    [15.2, 2, 'aquarius', 'suns are | overrated.'], [18.0, 2, 'aquarius', 'reverse spin. | trust me.'], [21.0, 2.2, 'aquarius', 'skip the black hole. | too obvious.'],
    [24.6, 1.6, 'aquarius', 'stardust. | nice.'], [28.4, 2, 'aquarius', 'gravity up? | I called it.'], [33.2, 1.8, 'aquarius', 'Leo, | try my line.'],
    [35.6, 1.8, 'aquarius', 'shortcut | incoming.'], [41.4, 1.8, 'aquarius', 'that was | the route.'], [44.0, 2, 'aquarius', 'I should | tell people.'],
    [49.2, 2, 'aquarius', '6th, | my way.'], [52.8, 2.4, 'aquarius', "next time I'll | draw a map."]],
  pisces: [[3.0, 1.8, 'pisces', "we're all | so brave."], [7.0, 1.8, 'pisces', 'the rocks | look lonely.'], [10.2, 2, 'pisces', 'Cancer, are | you crying too?'],
    [12.4, 1.4, 'cancer', 'a little.'], [16.0, 1.8, 'pisces', 'two suns | in love.'], [19.2, 1.8, 'pisces', 'you look | so brave.'],
    [21.0, 1.4, 'scorpio', '...thanks.'], [23.0, 1.6, 'pisces', 'no! | Scorpio!'], [26.4, 2, 'pisces', 'is Scorpio | okay?'],
    [28.6, 1.6, 'taurus', 'have | a crumb.'], [32.0, 2, 'pisces', 'floating! | like a dream.'], [35.0, 2, 'pisces', 'Saturn has | a hula hoop.'],
    [42.4, 2, 'pisces', 'a comet! | make a wish.'], [44.8, 2, 'pisces', 'I wished | for everyone.'], [50.6, 2, 'pisces', 'Scorpio | waited for me.'],
    [53.6, 1.8, 'pisces', 'happy | tears.']],
}
// hook (2nd line) · lesson lines (the last one in gold italic) · the partner on the end card
const CARD = {
  aries: ['Aries didn\'t look back.', ['Fast is a gift.', 'Look back once in a while.']],
  taurus: ['Taurus brought a snack.', ["Fastest isn't the point.", 'Who you finish with is.'], 'cancer'],
  gemini: ['How Gemini won.', ['Luck got you here.', 'Who are you sharing it with?']],
  cancer: ['Cancer got half a snack.', ['Waiting for someone', "isn't losing."], 'taurus'],
  leo: ['Leo vs. an actual star.', ['The spotlight moves.', "Who's still clapping?"]],
  virgo: ['Virgo had a plan.', ['Even the best plan', 'meets retrograde.', 'Let someone help.']],
  libra: ["Libra couldn't pick a lane.", ["You can't take both lanes.", 'Choose.']],
  scorpio: ['Scorpio did it on purpose.', ['Pretending you meant it', 'is still pretending.'], 'pisces'],
  sagittarius: ['Sagittarius took the long way.', ['The long way', 'was the fun part.']],
  capricorn: ['Capricorn lost by 0.3 s.', ['You planned everything', 'except being happy.']],
  aquarius: ['Aquarius found a new route.', ['Your own route is fine.', 'Tell people where you went.']],
  pisces: ['Pisces felt everything.', ['Feeling everything', 'is not a weakness.'], 'scorpio'],
}

export function makePOV(id) {
  const I = ID(id), place = ORDER.indexOf(id) + 1, fin = FIN[id], sw = SWALLOW[id]
  const END = r2(T_LAST + 0.9), DURATION = r2(END + 7.2)
  const T = { gate: GATE, fin, end: END }
  // ── camera: on the sign; on a swallow, hold on the black hole for the gulp, then cut to the wormhole exit;
  //    after it finishes, follow whoever is still racing nearest the line (hard cut when that changes)
  const CAM = new Float32Array(NF)
  const target = t => {
    if (t < GATE + 0.2) return Math.max(-330, clampY(pos(t, I)[1]) - 1050)
    if (sw && t > sw.t - 1.4 && t < sw.t + 0.9) return HOLE.y - 1000
    if (t < fin + 1.2) return clampY(pos(t, I)[1]) - 1050
    const run = Object.keys(FIN).filter(k => FIN[k] > t).map(k => clampY(pos(t, ID(k))[1]))
    return (run.length ? Math.max(...run) : FINISH_Y + 60) - 1050
  }
  let c = target(0)
  for (let f = 0; f < NF; f++) {
    const t = f / FPS, tg = target(t)
    if (Math.abs(tg - c) > 1300) c = tg
    else c += (tg - c) * (1 - Math.exp(-(1 / FPS) / 0.22))
    CAM[f] = c
  }
  const camAt = t => { const f = Math.max(0, Math.min(NF - 1, t * FPS)), a = Math.floor(f), b = Math.min(NF - 1, a + 1); return CAM[a] + (CAM[b] - CAM[a]) * (f - a) }

  const SAY = [...MAIN_SAY, ...LINES[id].map(l => [...l, true])].sort((a, b) => a[0] - b[0])
  // stickers from this sign's own race events
  const STICK = [[GATE + 0.05, 1.8, SIGN[id].name.toUpperCase() + "'S RACE", GOLD, INK]]
  const hits = []; for (const e of SIM.events) if (e.id === id && (e.kind === 'sun' || e.kind === 'comet') && !hits.some(h => Math.abs(h[0] - e.t) < 2)) hits.push([e.t, e.kind])
  for (const [h, k] of hits) STICK.push([h + 0.05, 1.3, k === 'sun' ? 'BINARY STAR!' : 'COMET!', k === 'sun' ? GOLD : '#8fe3ff', INK])
  if (sw) STICK.push([sw.t + 0.02, 0.9, 'BLACK HOLE!!', PINK, INK], [sw.t + 0.92, 1.6, '…WORMHOLE.', GOLD, INK])
  let rin = null; for (let f = 0; f < NF; f++) { if (pos(f / FPS, I)[1] > RETRO.y0) { rin = f / FPS; break } }
  if (!sw && rin !== null) STICK.push([rin + 0.7, 1.8, 'RETROGRADE…', PINK, INK])
  if (END - fin > 4) STICK.push([fin + 1.25, 1.8, 'MEANWHILE…', GOLD, INK])

  function end(x, t, { cookie }) {
    // corner: the finished sign watching the rest of the race
    const ck = clamp((t - fin - 1.2) / 0.4) * (1 - clamp((t - END) / 0.3))
    if (ck > 0) drawStarChar(x, 200, 1260, 128, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: place <= 3 ? 'heart' : 'happy', seed: 4, pop: ck, look: [0.6, -0.4] })
    if (t < END) return
    const a = clamp((t - END) / 0.5)
    x.fillStyle = `rgba(8,5,22,${(0.92 * a).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
    const [, lesson, partner] = CARD[id]
    const sk = pop01(t, END + 0.3, 0.4, 1.7)
    if (sk > 0) {
      const cx = partner ? 450 : 540
      drawStarChar(x, cx, 860 + (1 - sk) * 60, 260, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: 'heart', seed: 7, pop: clamp(sk), hops: [END + 1.4, END + 2.9, END + 4.4] })
      if (partner) { drawStarChar(x, 690, 900 + (1 - sk) * 60, 170, t, { color: SIGN[partner].color, glyph: SIGN[partner].glyph, mood: 'heart', seed: 8, pop: clamp(sk), hops: [END + 1.6, END + 3.1, END + 4.6] }); if (partner === 'cancer' || id === 'cancer') cookie(580, 960) }
      x.save(); x.globalAlpha = clamp(sk); x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `800 62px ${INTER}`; x.fillStyle = BONE; x.fillText(SIGN[id].name, 540, 560)
      x.restore()
      label(x, 540, 1110, `${ORD(place)} of 12`, sk, { size: 40, bg: place === 1 ? GOLD : BONE, rot: -0.04 })
      if (t > END + 0.6) sparkles(x, t, 540, 860, END + 0.6, 12, 240, 7)
    }
    const lk = pop01(t, END + 1.4, 0.45, 1.5)
    if (lk > 0) {
      x.save(); x.globalAlpha = clamp(lk); x.textAlign = 'center'; x.textBaseline = 'middle'
      lesson.forEach((ln, j) => {
        const last = j === lesson.length - 1
        x.font = last ? `italic 500 66px 'EB Garamond', Georgia, serif` : `800 54px ${INTER}`
        x.fillStyle = last ? GOLD : BONE; x.fillText(ln, 540, 1260 + j * 76)
      })
      x.restore()
    }
  }

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
  const CUES = [
    ['pluck', r2(GATE), 784, 0.03, 0.4, 0],
    ['whoosh', r2(GATE + 0.05), 0.5, 0.02],
    ...hits.map(([h]) => ['pluck', r2(h), 392, 0.025, 0.3, 0]),
    ...(sw ? [['whoosh', r2(sw.t), 0.9, 0.035]] : []),
    ['bell', r2(fin + 0.05), place === 1 ? 1760 : 1318.5, 0.022, 1.6, 0],
    ...ORDER.filter(k => k !== id && FIN[k] > fin).map(k => ['pop', r2(FIN[k]), NOTE[(11 - ORDER.indexOf(k)) % 7], 0.015, 0]),
    ['glitter', r2(END + 0.6), r2(END + 1.4)],
    ['bell', r2(END + 1.45), 1046.5, 0.016, 1.8, 0],
  ]
  return {
    HOOK: 'Same space race. | ' + CARD[id][0], HOOK_STYLE: 'box', HOOK_UNTIL: 2.6,
    SCENES: [makeBuild({ camAt, SAY, STICK, focus: id, end, endT: END })], DURATION, STORY_END: DURATION, CUES, T,
  }
}
