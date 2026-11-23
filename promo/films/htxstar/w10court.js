// Houston Star Talk · w10 courtroom parodies (hst236–hst247). Grammar from hst006: a bench, a judge star, witnesses,
// exhibits on an easel, a jury, a verdict with a gavel. Each case is a small Houston dating problem with a warm verdict.
import { clamp } from '../../src/lib.js'
import { box, txt, clock } from '../starrace/ep.js'
import { sparkles, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB } from '../signs3kit.js'
import { partyCard, gavel, taco, overheadSign, car, BRAKE } from './kit.js'
import { Y, BADGE, STING, Kp, stamp, BANG, court, stand, juryRail, easel, jabot, specs, phone, cloud, thermostat, frost, sweater, queso, check, crawfish, blinker, postcard, hair, card, signChar, coat } from './w10.js'

const JY = 600
/** build a court episode: the judge sits at the bench in every scene unless j: false; bang: lt of a gavel hit */
function trial({ hook, judge, pal, endLine, endStars, scenes, cues = [], hookUntil }) {
  let acc = 0
  const bangs = []
  const S = scenes.map((s, i) => {
    const t0 = acc; acc += s.dur
    const withJ = s.j !== false
    if (s.bang != null) bangs.push(t0 + s.bang)
    const jk = i === 0 ? [[0, 540, JY, 0], [2.5, 540, JY, 0], [2.85, 540, JY, 220]] : [[0, 540, JY, 220]]
    return {
      dur: s.dur, lines: s.lines, hops: s.hops, look: s.look,
      cast: { ...(withJ ? { [judge]: jk } : {}), ...s.cast },
      mood: { [judge]: 'squint', ...s.mood },
      set: (x, t, lt, P) => { court(x, t, pal, s.head, { bench: s.bench ?? withJ }); s.set?.(x, t, lt, P) },
      back: s.back,
      front: (x, t, lt, P) => {
        if (withJ && P.at(judge)[2] > 40) { jabot(x, P, judge); if (s.specs !== false && (judge === 'taurus' || judge === 'cancer')) specs(x, P, judge); gavel(x, 700, 600, t, s.bang != null && lt > s.bang - 0.15 && lt < s.bang + 0.35 ? 1 : (s.bang == null && i === 0 ? (t * 3) % 1 : 0)) }
        if (s.bang != null && lt > s.bang) sparkles(x, t, 540, 620, t - lt + s.bang, 12, 280, 9)
        s.front?.(x, t, lt, P)
      },
    }
  })
  return {
    hook, hookUntil, badge: BADGE, endLen: 6.2,
    cues: [...STING, ...bangs.flatMap(b => BANG(Math.round(b * 100) / 100)), ...cues],
    end: (x, t, lt) => partyCard(x, t, lt, { line: endLine, stars: endStars }),
    scenes: S,
  }
}
const jury = (ids, moods = {}) => ({ cast: Object.fromEntries(ids.map((id, i) => [id, [[0, 160 + i * (760 / (ids.length - 1)), 940, 150]]])), mood: moods })
const onStand = (pal = 'wood') => (x, t, lt, P) => stand(x, 780, pal)

// ── hst236 · Scorpio is on trial for leaving you on read
const hst236 = trial({
  hook: 'Scorpio on trial | for leaving you | on read', judge: 'libra', pal: 'night',
  endLine: 'Reply to the invite. Jan 9.', endStars: ['scorpio', 'libra', 'gemini', 'pisces'],
  scenes: [
    { dur: 3.0, head: 'THE PEOPLE v. SCORPIO', cast: { scorpio: [[0, 360, Y, 270]] }, mood: { scorpio: 'squint' }, hops: { scorpio: [0.05, 0.5] },
      front: (x, t, lt, P) => { const [cx, cy, s] = P.at('scorpio'); phone(x, cx + s * 0.62, cy - 20, 0.9, 'SEEN', { sub: '9:14 PM' }) },
      lines: [[0.6, 1.9, 'scorpio', 'I plead... | busy.']] },
    { dur: 3.4, head: 'EXHIBIT A', cast: { scorpio: [[0, 250, Y, 220]] }, mood: { scorpio: 'wide' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => { phone(x, cx, cy, 1.0, 'u free fri?', { sub: 'SEEN 9:14' }) }, { w: 340, h: 320 }),
      lines: [[0.4, 1.4, 'libra', 'seen at 9:14. | replied...?'], [2.0, 1.3, 'scorpio', 'Thursday.']] },
    { dur: 3.2, head: 'FOR THE DEFENSE', cast: { scorpio: [[0, 380, Y, 260]] }, mood: { scorpio: 'squint', libra: 'neutral' },
      lines: [[0.3, 1.4, 'scorpio', 'I was on 290. | two hours.'], [1.9, 1.2, 'libra', 'sustained. | 290 is real.']] },
    { dur: 3.2, head: 'WITNESS: GEMINI', cast: { gemini: [[0, 780, Y - 50, 240]] }, mood: { gemini: 'sparkle' }, front: onStand('night'),
      lines: [[0.3, 2.0, 'gemini', 'Scorpio replies | to MY memes | in 4 seconds.']], stick: [[2.3, 0.9, 'GASP.', PINK]] },
    { dur: 3.0, head: 'WITNESS: PISCES', cast: { pisces: [[0, 780, Y - 50, 240]] }, mood: { pisces: 'wide' }, front: onStand('night'),
      lines: [[0.3, 2.3, 'pisces', 'I refreshed | for three days.']] },
    { dur: 3.4, head: 'THE CROSS-EXAMINATION', cast: { scorpio: [[0, 360, Y, 260]] }, mood: { scorpio: 'wide', libra: 'wide' },
      lines: [[0.2, 1.4, 'scorpio', 'I read it | forty times.'], [1.8, 1.5, 'scorpio', 'I was scared | to sound dumb.']] },
    { dur: 3.0, j: false, head: 'THE JURY', set: (x) => juryRail(x, 'night'), ...jury(['aries', 'taurus', 'leo', 'sagittarius', 'aquarius'], { taurus: 'heart', leo: 'wide' }),
      lines: [[0.3, 2.2, 'taurus', "that's | kinda sweet."]] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { scorpio: [[0, 300, Y, 220]], pisces: [[0, 780, Y, 220]] }, mood: { libra: lt => lt > 1 ? 'happy' : 'squint', scorpio: 'wide', pisces: 'wide' },
      lines: [[1.1, 2.3, 'libra', 'guilty of | caring too much.']], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
    { dur: 3.6, head: 'THE SENTENCE', cast: { scorpio: [[0, 360, Y, 250]] }, mood: { libra: 'wink', scorpio: 'squint' },
      lines: [[0.2, 1.6, 'libra', 'reply within | a day.'], [1.9, 1.6, 'libra', '"busy, call | you later?" | counts.']] },
    { dur: 3.2, head: 'CASE CLOSED', cast: { scorpio: [[0, 320, Y, 250]], pisces: [[0, 780, Y, 230]] }, mood: { scorpio: 'happy', pisces: 'heart' },
      front: (x, t, lt, P) => { const [cx, cy, s] = P.at('scorpio'); phone(x, cx + s * 0.6, cy - 30, 0.85, 'Jan 9?', { sub: lt > 1 ? 'SENT' : 'typing' }) },
      lines: [[0.3, 1.4, 'scorpio', 'see you | Jan 9?'], [1.9, 1.1, 'pisces', 'replied | in 1 sec!']] },
  ],
})

// ── hst237 · Leo is suing the Houston humidity
const frizzStar = (x, t, cx, cy, s, frizz, mood) => { const P = { at: () => [cx, cy, s] }; hair(x, P, 'leo', frizz, t); signChar(x, t, 'leo', cx, cy, s, { mood, seed: 9 }) }
const hst237 = trial({
  hook: 'Leo took the Houston | humidity to court', judge: 'capricorn', pal: 'sun',
  endLine: 'Come as you are. Jan 9.', endStars: ['leo', 'capricorn', 'cancer', 'pisces'],
  scenes: [
    { dur: 3.0, head: 'LEO v. THE HUMIDITY', cast: { leo: [[0, 330, Y, 270]] }, mood: { leo: 'squint' }, hops: { leo: [0.05, 0.6] },
      back: (x, t, lt, P) => hair(x, P, 'leo', 1, t), front: (x, t) => cloud(x, 800, 1080, 0.9, t, { col: '#e8eef6' }),
      lines: [[0.6, 1.9, 'leo', 'you saw | my hair.']] },
    { dur: 3.2, head: 'EXHIBIT A: 7:58 AM', cast: { leo: [[0, 250, Y, 210]] }, mood: { leo: 'sparkle' }, back: (x, t, lt, P) => hair(x, P, 'leo', 0, t),
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => frizzStar(x, t, cx, cy + 40, 170, 0, 'sparkle')),
      lines: [[0.5, 2.2, 'leo', 'perfect. | flawless.']] },
    { dur: 3.2, head: 'EXHIBIT B: 8:01 AM', cast: { leo: [[0, 250, Y, 210]] }, mood: { leo: 'wide' }, back: (x, t, lt, P) => hair(x, P, 'leo', 0, t),
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT B', (cx, cy) => frizzStar(x, t, cx, cy + 40, 170, 1, 'wide')),
      lines: [[0.4, 1.6, 'leo', 'three minutes | outside.']], stick: [[2.2, 0.9, 'GASP.', PINK]] },
    { dur: 3.4, head: 'FOR THE DEFENSE', cast: { leo: [[0, 280, Y, 220]] }, mood: { leo: 'squint' }, back: (x, t, lt, P) => hair(x, P, 'leo', 1, t),
      front: (x, t) => cloud(x, 760, 1080, 1.1, t, { col: '#e8eef6' }),
      lines: [[0.3, 1.4, [760, 1150, 200], "it's not me. | it's the heat."], [1.9, 1.3, [760, 1150, 200], '...ok it IS me.']] },
    { dur: 3.0, head: 'WITNESS: VIRGO', cast: { virgo: [[0, 780, Y - 50, 240]] }, mood: { virgo: 'squint' }, front: onStand('sun'),
      lines: [[0.3, 1.2, 'virgo', 'it was 80° | in January.'], [1.7, 1.2, 'capricorn', "so... | a Tuesday."]] },
    { dur: 3.0, head: 'WITNESS: AUNTIE CANCER', cast: { cancer: [[0, 780, Y - 50, 240]] }, mood: { cancer: 'happy' },
      front: (x, t, lt, P) => { stand(x, 780, 'sun'); specs(x, P, 'cancer') }, lines: [[0.3, 2.4, 'cancer', 'baby, keep | a hair tie | in the car.']] },
    { dur: 3.4, head: 'LEO, IN TEARS', cast: { leo: [[0, 360, Y, 260]] }, mood: { leo: 'wide', capricorn: 'neutral' }, back: (x, t, lt, P) => hair(x, P, 'leo', 1, t),
      lines: [[0.2, 1.3, 'leo', 'my date | is at 7.'], [1.7, 1.5, 'leo', 'what if they | see the frizz?']] },
    { dur: 3.0, j: false, head: 'THE JURY', set: (x) => juryRail(x, 'sun'), ...jury(['pisces', 'aquarius', 'aries', 'sagittarius'], { pisces: 'heart', aquarius: 'wink' }),
      lines: [[0.2, 1.3, 'pisces', 'the frizz | is beautiful.'], [1.6, 1.2, 'aquarius', 'it has | personality.']] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { leo: [[0, 330, Y, 230]] }, mood: { capricorn: lt => lt > 1 ? 'happy' : 'squint', leo: 'wide' }, back: (x, t, lt, P) => hair(x, P, 'leo', 1, t),
      lines: [[1.1, 2.3, 'capricorn', 'humidity: | not guilty.']], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
    { dur: 3.4, head: 'ALSO', cast: { leo: [[0, 330, Y, 240]] }, mood: { capricorn: 'wink', leo: lt => lt > 1.8 ? 'heart' : 'wide' }, back: (x, t, lt, P) => hair(x, P, 'leo', 1, t),
      lines: [[0.2, 1.5, 'capricorn', 'they asked you | out frizzy.'], [1.9, 1.3, 'leo', 'frizz | era.']], stick: [[2.0, 1.2, 'CASE CLOSED', MINT]] },
  ],
})

// ── hst238 · Taurus is suing Houston brunch for the wait
const hst238 = trial({
  hook: 'Taurus is suing | Houston brunch | for the wait', judge: 'virgo', pal: 'rose',
  endLine: 'Worth the wait. Jan 9.', endStars: ['taurus', 'aries', 'libra', 'virgo'],
  scenes: [
    { dur: 3.0, head: 'TAURUS v. BRUNCH', cast: { taurus: [[0, 360, Y, 270]] }, mood: { taurus: 'squint' }, hops: { taurus: [0.05, 0.4, 0.8] },
      front: (x, t) => clock(x, 790, 1060, '1:58', '#ff8fb1'), lines: [[0.6, 1.9, 'taurus', "you've waited | too. I know."]] },
    { dur: 3.2, head: 'EXHIBIT A: THE WAITLIST', cast: { taurus: [[0, 250, Y, 210]] }, mood: { taurus: 'wide' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => { txt(x, 'PARTY OF 2', cx, cy - 70, { size: 40, col: INK, font: MONO, weight: 700 }); txt(x, '118 MIN', cx, cy + 20, { size: 76, col: BRAKE }) }),
      lines: [[0.4, 2.3, 'taurus', 'I was | party of two.']] },
    { dur: 3.2, head: 'WITNESS: LIBRA', cast: { libra: [[0, 780, Y - 50, 240]] }, mood: { libra: 'sparkle' }, front: onStand('rose'),
      lines: [[0.2, 1.3, 'libra', 'I planned | this outfit.'], [1.7, 1.3, 'libra', 'the line | is the runway.']] },
    { dur: 3.0, head: 'WITNESS: GEMINI', cast: { gemini: [[0, 780, Y - 50, 240]] }, mood: { gemini: 'happy' }, front: onStand('rose'),
      lines: [[0.3, 2.3, 'gemini', 'we talked | the whole time. | best part.']] },
    { dur: 3.2, head: 'EXHIBIT B: THE TACO', cast: { taurus: [[0, 300, Y, 240]] }, mood: { taurus: 'heart', virgo: 'neutral' },
      front: (x, t, lt) => { const k = Kp(lt, 0.2); if (k > 0) taco(x, 760, 1150, 1.9 * k) }, lines: [[1.0, 1.9, 'taurus', '...worth it.']] },
    { dur: 3.4, head: 'THE CROSS-EXAMINATION', cast: { taurus: [[0, 340, Y, 250]] }, mood: { taurus: 'wink', virgo: 'squint' },
      lines: [[0.2, 1.3, 'virgo', 'how was | the wait?'], [1.7, 1.5, 'taurus', '...I met | someone in line.']], stick: [[2.3, 1.0, 'TWIST.', GOLD]] },
    { dur: 3.0, head: 'SURPRISE WITNESS: ARIES', cast: { aries: [[0, 780, Y - 50, 240]], taurus: [[0, 300, Y, 220]] }, mood: { aries: 'happy', taurus: 'heart' }, front: onStand('rose'),
      lines: [[0.3, 2.3, 'aries', 'hi. | I was party | of one.']] },
    { dur: 3.0, j: false, head: 'THE JURY', set: (x) => juryRail(x, 'rose'), ...jury(['leo', 'scorpio', 'cancer', 'pisces', 'sagittarius'], { pisces: 'heart', cancer: 'heart' }),
      lines: [[0.3, 2.2, 'leo', 'the jury | ordered brunch.']] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { taurus: [[0, 300, Y, 220]], aries: [[0, 780, Y, 220]] }, mood: { virgo: lt => lt > 1 ? 'happy' : 'squint', taurus: 'wide', aries: 'wide' },
      lines: [[1.1, 2.3, 'virgo', 'the wait was | spent well.']], stick: [[0.95, 1.0, 'DISMISSED.', GOLD]] },
    { dur: 3.2, head: 'NEXT HEARING: JAN 9', cast: { taurus: [[0, 360, Y, 240], [1.2, 430, Y, 240]], aries: [[0, 760, Y, 240], [1.2, 660, Y, 240]] }, mood: { taurus: 'heart', aries: 'heart' },
      lines: [[0.3, 1.3, 'taurus', 'same time | next week?'], [1.8, 1.2, 'aries', 'Jan 9 | first.']] },
  ],
})

// ── hst239 · You decide: who pays for the queso?
const hst239 = trial({
  hook: 'You decide: | who pays | for the queso?', judge: 'taurus', pal: 'marble',
  endLine: 'Take turns. See you Jan 9.', endStars: ['capricorn', 'sagittarius', 'taurus', 'aries'],
  scenes: [
    { dur: 3.0, head: 'CAPRICORN v. SAGITTARIUS', cast: { capricorn: [[0, 260, Y, 240]], sagittarius: [[0, 820, Y, 240]] }, mood: { capricorn: 'squint', sagittarius: 'happy' }, hops: { capricorn: [0.05], sagittarius: [0.3] },
      front: (x, t) => queso(x, 540, 1240, 1.2), lines: [[0.6, 1.9, 'capricorn', "you're | the jury."]] },
    { dur: 3.2, head: 'EXHIBIT A: THE CHECK', cast: { capricorn: [[0, 260, Y, 220]] }, mood: { capricorn: 'squint' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => { check(x, cx - 60, cy, 1.1); queso(x, cx + 100, cy + 60, 0.6) }),
      lines: [[0.5, 2.2, 'capricorn', 'I had | three chips.']] },
    { dur: 3.2, head: 'FOR THE DEFENSE', cast: { sagittarius: [[0, 360, Y, 260]] }, mood: { sagittarius: 'wink' },
      lines: [[0.3, 1.8, 'sagittarius', "I'll get | the next one."]], stick: [[2.1, 1.0, 'SAID 9 TIMES', PINK]] },
    { dur: 3.2, head: 'WITNESS: VIRGO', cast: { virgo: [[0, 780, Y - 50, 240]] }, mood: { virgo: 'squint' }, front: (x, t, lt, P) => { stand(x, 780, 'marble'); card(x, 330, 1150, 0.9, 'THE LEDGER', 'SINCE AUGUST') },
      lines: [[0.3, 2.4, 'virgo', 'I kept | a spreadsheet.']] },
    { dur: 3.0, head: 'WITNESS: ARIES', cast: { aries: [[0, 780, Y - 50, 240]] }, mood: { aries: 'happy' }, front: onStand('marble'),
      lines: [[0.3, 1.4, 'aries', 'I ate | most of it.']], stick: [[1.9, 1.0, 'GASP.', PINK]] },
    { dur: 3.2, head: 'THE QUESO SPEAKS', cast: { pisces: [[0, 820, Y, 200]] }, mood: { pisces: 'wide' }, front: (x, t) => queso(x, 420, 1200, 1.9),
      lines: [[0.3, 2.0, [420, 1240, 180], 'I just want | to be loved.']], stick: [[2.3, 0.8, 'AWW.', PINK]] },
    { dur: 3.4, head: 'THE BENCH', cast: {}, mood: { taurus: 'happy' },
      lines: [[0.2, 1.3, 'taurus', 'babies. | listen.'], [1.7, 1.6, 'taurus', 'nobody likes | keeping score.']] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { capricorn: [[0, 260, Y, 220]], sagittarius: [[0, 820, Y, 220]] }, mood: { taurus: lt => lt > 1 ? 'wink' : 'squint', capricorn: 'wide', sagittarius: 'wide' },
      lines: [[1.1, 2.3, 'taurus', 'take turns. | say it out loud.']], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
    { dur: 3.4, head: 'THE AGREEMENT', cast: { capricorn: [[0, 300, Y, 240]], sagittarius: [[0, 780, Y - 50, 240]] }, mood: { capricorn: 'happy', sagittarius: 'happy' },
      lines: [[0.2, 1.2, 'sagittarius', 'this one | is mine.'], [1.6, 1.6, 'capricorn', 'next one | is mine.']] },
    { dur: 3.0, head: 'CASE CLOSED', cast: { capricorn: [[0, 300, Y, 240], [1.0, 420, Y, 240]], sagittarius: [[0, 780, Y, 240], [1.0, 660, Y, 240]] }, mood: { capricorn: 'heart', sagittarius: 'heart' },
      front: (x, t) => queso(x, 540, 1260, 1.0), lines: [[1.0, 1.8, 'sagittarius', 'second bowl?']] },
  ],
})

// ── hst240 · Cancer is suing the office AC
const shiver = t => Math.sin(t * 40) * 4
const scarf = (x, cx, cy, s, col = '#c9a6ff') => { box(x, cx - s * 0.36, cy + s * 0.16, s * 0.72, s * 0.12, col, 5); box(x, cx + s * 0.12, cy + s * 0.2, s * 0.12, s * 0.26, col, 4) }
const hst240 = trial({
  hook: 'Cancer is suing | the office AC', judge: 'aquarius', pal: 'mint',
  endLine: 'Bring a sweater anyway. Jan 9.', endStars: ['cancer', 'aquarius', 'leo', 'sagittarius'],
  scenes: [
    { dur: 3.0, head: 'CANCER v. THE AC', set: (x) => frost(x, 0.9), cast: { cancer: [[0, 360, Y, 270]] }, mood: { cancer: 'wide' }, hops: { cancer: [0.05, 0.3, 0.6, 0.9] },
      front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); scarf(x, cx + shiver(t), cy, s); thermostat(x, 820, 1080, 1.1, '64°', t) },
      lines: [[0.7, 1.8, 'cancer', 'you know | this feeling.']] },
    { dur: 3.2, head: 'EXHIBIT A', set: (x) => frost(x, 0.7), cast: { cancer: [[0, 250, Y, 210]] }, mood: { cancer: 'squint' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => { txt(x, 'OUTSIDE 95°', cx, cy - 60, { size: 44, col: BRAKE, font: MONO, weight: 700 }); txt(x, 'MY DESK 64°', cx, cy + 30, { size: 44, col: '#2b5fb0', font: MONO, weight: 700 }) }),
      lines: [[0.5, 2.2, 'cancer', 'make it | make sense.']] },
    { dur: 3.0, head: 'EXHIBIT B: THE DRAWER', set: (x) => frost(x, 0.7), cast: { cancer: [[0, 300, Y, 230]] }, mood: { cancer: 'happy' },
      front: (x, t, lt) => { for (let k = 0; k < 3; k++) { const kk = Kp(lt, 0.2 + k * 0.35); if (kk > 0) sweater(x, 620 + k * 160, 1120, 0.55 * kk, ['#ff8fb1', '#ffd36b', '#8fe3ff'][k]) } },
      lines: [[1.3, 1.6, 'cancer', 'three sweaters. | at work.']] },
    { dur: 3.0, head: 'WITNESS: SAGITTARIUS', cast: { sagittarius: [[0, 780, Y - 50, 240]] }, mood: { sagittarius: 'happy' }, front: onStand('mint'),
      lines: [[0.3, 2.4, 'sagittarius', 'shorts | AND a parka. | every day.']] },
    { dur: 3.0, head: 'WITNESS: LEO', cast: { leo: [[0, 780, Y - 50, 240]] }, mood: { leo: 'sparkle' }, front: onStand('mint'),
      lines: [[0.3, 1.5, 'leo', 'I love it. | I run hot.']], stick: [[2.0, 0.9, 'BOO.', PINK]] },
    { dur: 3.4, head: 'FOR THE DEFENSE: THE AC', cast: { cancer: [[0, 250, Y, 210]] }, mood: { cancer: 'wide' }, front: (x, t) => thermostat(x, 740, 1230, 1.2, '64°', t),
      lines: [[0.3, 2.0, [740, 1180, 200], "without me | you'd be soup."]], stick: [[2.4, 0.9, 'FAIR.', MINT]] },
    { dur: 3.0, j: false, head: 'THE JURY (COLD)', set: (x) => { frost(x, 1); juryRail(x, 'mint') }, ...jury(['aries', 'gemini', 'virgo', 'libra', 'pisces'], { pisces: 'wide', virgo: 'squint' }),
      front: (x, t, lt, P) => { for (const id of ['aries', 'gemini', 'virgo', 'libra', 'pisces']) { const [cx, cy, s] = P.at(id); scarf(x, cx + shiver(t + cx), cy, s, '#8fe3ff') } },
      lines: [[0.3, 2.2, 'gemini', 'can we | deliberate | outside?']] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { cancer: [[0, 330, Y, 230]] }, mood: { aquarius: lt => lt > 1 ? 'happy' : 'squint', cancer: 'wide' },
      lines: [[1.1, 2.3, 'aquarius', 'the AC stays. | it is Houston.']], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
    { dur: 3.2, head: 'THE COMPROMISE', cast: { cancer: [[0, 330, Y, 240]] }, mood: { aquarius: 'wink', cancer: 'happy' },
      lines: [[0.2, 1.3, 'cancer', 'can I bring | a blanket?'], [1.7, 1.3, 'aquarius', 'approved.']], stick: [[1.9, 1.1, 'APPROVED', MINT]] },
    { dur: 3.0, head: 'CASE CLOSED', cast: { cancer: [[0, 540, Y, 270]] }, mood: { cancer: 'heart' },
      front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); box(x, cx - s * 0.6, cy + s * 0.05, s * 1.2, s * 0.42, '#ff8fb1', 6); for (let k = 0; k < 4; k++) { x.fillStyle = '#ffd1e0'; x.fillRect(cx - s * 0.5 + k * s * 0.28, cy + s * 0.12, s * 0.12, s * 0.12) } },
      lines: [[0.4, 2.2, 'cancer', 'cozy. | finally.']] },
  ],
})

// ── hst241 · Virgo sued you for saying "20 minutes away"
const hst241 = trial({
  hook: 'Virgo sued you | for saying | "20 minutes away"', judge: 'capricorn', pal: 'wood',
  endLine: 'Leave early. Jan 9.', endStars: ['virgo', 'aries', 'capricorn', 'libra'],
  scenes: [
    { dur: 3.0, head: 'VIRGO v. YOU', cast: { virgo: [[0, 280, Y, 250]], aries: [[0, 800, Y, 230]] }, mood: { virgo: 'squint', aries: 'happy' }, hops: { virgo: [0.05, 0.5] },
      front: (x, t, lt, P) => card(x, 800, 1020, 0.6, 'YOU', '(ARIES)', '#ffd36b'), lines: [[0.6, 1.9, 'virgo', 'you said | 20 minutes.']] },
    { dur: 3.2, head: 'EXHIBIT A: THE TEXT', cast: { virgo: [[0, 250, Y, 210]] }, mood: { virgo: 'squint' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => phone(x, cx, cy, 1.0, 'omw! 20 min', { sub: 'SENT 6:00' })),
      lines: [[0.5, 2.2, 'virgo', 'sent at | 6:00.']] },
    { dur: 3.0, head: 'EXHIBIT B: ARRIVAL', cast: { virgo: [[0, 250, Y, 210]] }, mood: { virgo: 'wide' },
      front: (x, t, lt) => { if (Kp(lt, 0.1) > 0) clock(x, 760, 1060, '7:12', '#ff5a6e') }, stick: [[1.0, 1.6, 'GASP.', PINK]] },
    { dur: 3.4, head: 'FOR THE DEFENSE', cast: { aries: [[0, 360, Y, 250]] }, mood: { aries: 'wide', capricorn: 'neutral' },
      lines: [[0.2, 1.5, 'aries', '20 minutes | without traffic!'], [1.9, 1.3, 'capricorn', 'this is | Houston.']] },
    { dur: 3.2, head: 'WITNESS: THE KATY FREEWAY', j: false, cast: { aries: [[0, 300, Y, 200]] }, mood: { aries: 'eyeroll' },
      front: (x, t, lt) => overheadSign(x, 560, 760, 'I-10 WEST', 'KATY FWY', Kp(lt, 0.1)),
      lines: [[0.6, 2.2, [560, 1130, 200], 'I was | very busy.']] },
    { dur: 3.0, head: 'WITNESS: LIBRA', cast: { libra: [[0, 780, Y - 50, 240]] }, mood: { libra: 'wink' }, front: onStand('wood'),
      lines: [[0.3, 2.3, 'libra', 'I always | add 30.']] },
    { dur: 3.6, head: 'THE HONEST PART', cast: { aries: [[0, 300, Y, 230]], virgo: [[0, 780, Y, 230]] }, mood: { aries: 'wide', virgo: 'neutral' },
      lines: [[0.2, 1.5, 'aries', "I didn't want | you to wait."], [1.9, 1.5, 'virgo', 'I waited | anyway.']] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { aries: [[0, 300, Y, 220]], virgo: [[0, 780, Y, 220]] }, mood: { capricorn: lt => lt > 1 ? 'happy' : 'squint', aries: 'wide', virgo: 'wide' },
      lines: [[1.1, 2.3, 'capricorn', 'honest ETA. | every time.']], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
    { dur: 3.4, head: "IT'S A LOVE LANGUAGE", cast: { aries: [[0, 300, Y, 240]], virgo: [[0, 780, Y - 50, 240]] }, mood: { aries: 'happy', virgo: lt => lt > 1.8 ? 'heart' : 'squint' },
      front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aries'); phone(x, cx + s * 0.6, cy - 30, 0.8, 'more like 50', { sub: 'SENT' }) },
      lines: [[0.2, 1.4, 'aries', "leaving now. | it'll be 50."], [1.9, 1.2, 'virgo', 'perfect.']] },
    { dur: 3.0, head: 'CASE CLOSED', cast: { virgo: [[0, 400, Y, 250]], aries: [[0, 700, Y, 250]] }, mood: { virgo: 'heart', aries: 'heart' },
      lines: [[0.3, 2.3, 'virgo', 'Jan 9. | leave early.']] },
  ],
})

// ── hst242 · Gemini is on trial for "Spring" or "The Woodlands"
const hst242 = trial({
  hook: 'Gemini is on trial: | Spring or | The Woodlands?', judge: 'libra', pal: 'marble',
  endLine: 'Every side of town. Jan 9.', endStars: ['gemini', 'libra', 'scorpio', 'pisces'],
  scenes: [
    { dur: 3.0, head: 'THE PEOPLE v. GEMINI', cast: { gemini: [[0, 380, Y, 260]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.05, 0.45] },
      front: (x, t) => { postcard(x, 720, 1060, 0.7, 'GREETINGS FROM', 'SPRING', '#7dffb0', -0.1); postcard(x, 820, 1200, 0.7, 'GREETINGS FROM', 'THE WOODLANDS', '#8fe3ff', 0.08) },
      lines: [[0.6, 1.9, 'gemini', 'you ask where | I live...']] },
    { dur: 3.0, head: 'EXHIBIT A', cast: { gemini: [[0, 250, Y, 210]] }, mood: { gemini: 'wink' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => postcard(x, cx, cy, 1.0, 'GREETINGS FROM', 'SPRING', '#7dffb0', 0)),
      lines: [[0.5, 2.2, 'gemini', 'Spring, | to some people...']] },
    { dur: 3.0, head: 'EXHIBIT B', cast: { gemini: [[0, 250, Y, 210]] }, mood: { gemini: 'sparkle' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT B', (cx, cy) => postcard(x, cx, cy, 1.0, 'GREETINGS FROM', 'THE WOODLANDS', '#8fe3ff', 0)),
      lines: [[0.5, 2.2, 'gemini', '...The Woodlands | to others.']] },
    { dur: 3.2, head: 'WITNESS: CAPRICORN', cast: { capricorn: [[0, 780, Y - 50, 240]], gemini: [[0, 280, Y, 200]] }, mood: { capricorn: 'squint', gemini: 'wide' }, front: onStand('marble'),
      lines: [[0.3, 1.3, 'capricorn', 'the zip code | says...'], [1.7, 1.2, 'gemini', 'OBJECTION!']] },
    { dur: 3.4, head: 'WITNESS: SCORPIO', cast: { scorpio: [[0, 780, Y - 50, 240]], gemini: [[0, 280, Y, 200]] }, mood: { scorpio: 'squint', gemini: 'wide' }, front: onStand('marble'),
      lines: [[0.3, 1.5, 'scorpio', "where'd you go | to high school?"], [2.0, 1.2, 'gemini', '...which one?']], stick: [[2.2, 1.0, 'GASP.', PINK]] },
    { dur: 3.4, head: 'THE REAL QUESTION', cast: { gemini: [[0, 380, Y, 260]] }, mood: { gemini: 'wide', libra: 'neutral' },
      lines: [[0.2, 1.4, 'gemini', 'what if | they think...'], [1.8, 1.4, 'gemini', "...I'm not | from Houston?"]] },
    { dur: 3.0, j: false, head: 'FROM THE GALLERY', set: (x) => juryRail(x, 'marble'), ...jury(['pisces', 'leo', 'taurus', 'aquarius'], { pisces: 'heart' }),
      lines: [[0.3, 2.3, 'pisces', "it's ALL | Houston | to us!"]] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { gemini: [[0, 330, Y, 240]] }, mood: { libra: lt => lt > 1 ? 'happy' : 'squint', gemini: 'wide' },
      lines: [[1.1, 2.3, 'libra', "you're both. | you're Houston."]], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
    { dur: 3.0, head: 'CASE CLOSED', cast: { gemini: [[0, 540, Y, 280]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.3, 0.8, 1.3] },
      lines: [[0.3, 2.3, 'gemini', "I'm from | Houston!"]] },
    { dur: 3.0, head: 'SEE YOU JAN 9', cast: { gemini: [[0, 380, Y, 250]], scorpio: [[0, 720, Y, 240]] }, mood: { gemini: 'happy', scorpio: 'wink' },
      lines: [[0.3, 1.2, 'scorpio', 'driving in?'], [1.6, 1.2, 'gemini', 'Jan 9. | both of me.']] },
  ],
})

// ── hst243 · Pisces is suing the one cold day in Houston
const hst243 = trial({
  hook: "Pisces is suing | Houston's one | cold day", judge: 'cancer', pal: 'night',
  endLine: 'Find your season. Jan 9.', endStars: ['pisces', 'leo', 'cancer', 'sagittarius'],
  scenes: [
    { dur: 3.0, head: 'PISCES v. THE COLD FRONT', cast: { pisces: [[0, 330, Y, 270]] }, mood: { pisces: 'wide' }, hops: { pisces: [0.05, 0.5] },
      front: (x, t, lt, P) => { coat(x, P, 'pisces', '#5ec8ff'); cloud(x, 810, 1060, 0.85, t, { col: '#bfe0ff' }) }, lines: [[0.6, 1.9, 'pisces', 'you remember | the cold day?']] },
    { dur: 3.2, head: 'EXHIBIT A: MONDAY', cast: { pisces: [[0, 250, Y, 210]] }, mood: { pisces: 'heart' }, front: (x, t, lt, P) => { coat(x, P, 'pisces', '#5ec8ff'); easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => phone(x, cx, cy, 1.0, '55°', { sub: 'MONDAY' })) },
      lines: [[0.5, 2.2, 'pisces', 'it was 55. | I wore the puffer.']] },
    { dur: 3.2, head: 'EXHIBIT B: THURSDAY', cast: { pisces: [[0, 250, Y, 210]] }, mood: { pisces: 'wide' }, front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT B', (cx, cy) => phone(x, cx, cy, 1.0, '81°', { sub: 'THURSDAY', col: '#ffd36b' })),
      lines: [[0.5, 2.2, 'pisces', 'by Thursday | it was 81.']] },
    { dur: 3.4, head: 'FOR THE DEFENSE: THE FRONT', cast: { pisces: [[0, 250, Y, 200]] }, mood: { pisces: 'wide' }, front: (x, t) => cloud(x, 740, 1080, 1.1, t, { col: '#bfe0ff' }),
      lines: [[0.3, 2.4, [740, 1150, 200], 'I said I was | just passing | through.']] },
    { dur: 3.0, head: 'WITNESS: SAGITTARIUS', cast: { sagittarius: [[0, 780, Y - 50, 240]] }, mood: { sagittarius: 'happy' }, front: onStand('night'),
      lines: [[0.3, 2.3, 'sagittarius', 'the front | never stays. | we all know.']] },
    { dur: 3.2, head: 'PISCES, IN TEARS', cast: { pisces: [[0, 380, Y, 260]] }, mood: { pisces: 'wide' },
      front: (x, t, lt, P) => { const [cx, cy, s] = P.at('pisces'); box(x, cx - s * 0.5, cy + s * 0.18, s, s * 0.12, '#ff8fb1', 4) }, lines: [[0.3, 2.4, 'pisces', 'I bought | a scarf. | for us.']] },
    { dur: 3.6, head: 'THE BENCH', cast: { pisces: [[0, 330, Y, 230]] }, mood: { cancer: 'happy', pisces: 'wide' },
      lines: [[0.2, 1.3, 'cancer', 'baby. | listen to me.'], [1.7, 1.7, 'cancer', 'one day | is not | a season.']] },
    { dur: 3.4, head: 'THE VERDICT', bang: 0.8, cast: { pisces: [[0, 330, Y, 230]] }, mood: { cancer: lt => lt > 1 ? 'wink' : 'squint', pisces: 'wide' },
      lines: [[1.0, 2.2, 'cancer', "the front: | free to go."]], stick: [[0.85, 1.0, 'BANG.', GOLD]] },
    { dur: 3.4, head: 'A NEW WITNESS', cast: { pisces: [[0, 300, Y, 230]], leo: [[0, 1180, Y, 240], [0.6, 780, Y - 50, 240]] }, mood: { pisces: lt => lt > 1.8 ? 'heart' : 'wide', leo: 'sparkle' },
      lines: [[0.2, 1.2, 'pisces', "what's MY | season?"], [1.6, 1.6, 'leo', "hi. I'm 80° | all year."]] },
    { dur: 3.0, head: 'CASE CLOSED', cast: { pisces: [[0, 400, Y, 250]], leo: [[0, 690, Y, 250]] }, mood: { pisces: 'heart', leo: 'heart' },
      lines: [[0.3, 1.1, 'leo', 'Jan 9?'], [1.5, 1.2, 'pisces', 'yes!!']] },
  ],
})

// ── hst244 · You're the jury: Aquarius never uses a blinker
const hst244 = trial({
  hook: "You're the jury: | Aquarius never | uses a blinker", judge: 'virgo', pal: 'sun',
  endLine: 'Signal. Then come. Jan 9.', endStars: ['aquarius', 'libra', 'virgo', 'taurus'],
  scenes: [
    { dur: 3.0, head: 'THE PEOPLE v. AQUARIUS', cast: { aquarius: [[0, 340, Y, 270]] }, mood: { aquarius: 'wink' }, hops: { aquarius: [0.05, 0.5] },
      front: (x, t) => blinker(x, 800, 1100, t, false, 1.2), lines: [[0.6, 1.9, 'aquarius', "you've met | me on 59."]] },
    { dur: 3.4, head: 'EXHIBIT A: THE CAR', cast: { aquarius: [[0, 250, Y, 210]] }, mood: { aquarius: 'happy' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => { car(x, cx, cy + 40, '#8fe3ff', { s: 1.1 }); x.fillStyle = '#5a4020'; x.fillRect(cx + 118, cy + 18, 14, 14) }),
      lines: [[0.4, 1.4, 'aquarius', "my car doesn't | have those."]], stick: [[2.1, 1.1, 'IT DOES.', PINK]] },
    { dur: 3.2, head: 'WITNESS: TAURUS', cast: { taurus: [[0, 780, Y - 50, 240]] }, mood: { taurus: 'squint' }, front: onStand('sun'),
      lines: [[0.3, 2.4, 'taurus', 'merged into | my lane like | a mystery.']] },
    { dur: 3.4, head: 'WITNESS: LIBRA', cast: { libra: [[0, 780, Y - 50, 240]] }, mood: { libra: 'wide' }, front: onStand('sun'),
      lines: [[0.2, 1.2, 'libra', 'also in | the relationship.'], [1.6, 1.6, 'libra', "I never know | where we're going."]], stick: [[2.3, 0.9, 'OOF.', PINK]] },
    { dur: 3.0, head: 'FOR THE DEFENSE', cast: { aquarius: [[0, 360, Y, 250]] }, mood: { aquarius: 'sparkle' },
      lines: [[0.3, 2.3, 'aquarius', 'I like | to keep it | spontaneous.']] },
    { dur: 3.4, head: 'THE BENCH', cast: { aquarius: [[0, 330, Y, 230]] }, mood: { virgo: 'squint', aquarius: 'wide' },
      lines: [[0.2, 1.3, 'virgo', 'spontaneous | is fine.'], [1.7, 1.5, 'virgo', 'confusing | is not.']] },
    { dur: 3.0, j: false, head: 'THE JURY', set: (x) => juryRail(x, 'sun'), ...jury(['pisces', 'gemini', 'cancer', 'scorpio', 'aries'], { pisces: 'wide', cancer: 'wide' }),
      lines: [[0.3, 2.3, 'pisces', 'we just want | to know | the plan!']] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { aquarius: [[0, 300, Y, 220]], libra: [[0, 780, Y, 220]] }, mood: { virgo: lt => lt > 1 ? 'happy' : 'squint', aquarius: 'wide', libra: 'wide' },
      lines: [[1.1, 2.3, 'virgo', 'signal your | intentions.']], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
    { dur: 3.6, head: 'ON THE ROAD AND IN LOVE', cast: { aquarius: [[0, 300, Y, 240]], libra: [[0, 780, Y - 50, 240]] }, mood: { aquarius: 'happy', libra: lt => lt > 2 ? 'heart' : 'wide' },
      front: (x, t, lt) => { if (lt > 0.4) blinker(x, 540, 1060, t, true, 0.9) },
      lines: [[0.5, 1.2, 'aquarius', '*blink blink*'], [1.9, 1.5, 'aquarius', 'Libra. | I like you.']] },
    { dur: 3.0, head: 'CASE CLOSED', cast: { aquarius: [[0, 400, Y, 250]], libra: [[0, 690, Y, 250]] }, mood: { aquarius: 'heart', libra: 'heart' },
      lines: [[0.3, 2.3, 'aquarius', 'turning left. | to Jan 9.']] },
  ],
})

// ── hst245 · Libra took 3 months to pick a date spot
const hst245 = trial({
  hook: 'Libra took months | to pick | a date spot', judge: 'taurus', pal: 'wood',
  endLine: 'Just pick. Jan 9.', endStars: ['libra', 'aries', 'taurus', 'scorpio'],
  scenes: [
    { dur: 3.0, head: 'THE PEOPLE v. LIBRA', cast: { libra: [[0, 360, Y, 270]] }, mood: { libra: 'wide' }, hops: { libra: [0.05, 0.4, 0.8] },
      front: (x, t, lt, P) => card(x, 800, 1080, 0.8, 'WHERE', 'TO EAT?'), lines: [[0.6, 1.9, 'libra', "you've asked me | where to eat."]] },
    { dur: 3.2, head: 'EXHIBIT A: THE LIST', cast: { libra: [[0, 250, Y, 210]] }, mood: { libra: 'sparkle' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => ['BELLAIRE', 'HEIGHTS', 'HILLCROFT', 'CLEAR LAKE', 'EaDo'].forEach((w, i) => txt(x, `${i + 1}. ${w}`, cx - 160, cy - 120 + i * 56, { size: 34, col: INK, font: MONO, weight: 700, align: 'left' }))),
      lines: [[0.5, 2.2, 'libra', 'I made | a list.']] },
    { dur: 2.8, head: 'EXHIBIT A, PAGE 9', cast: { libra: [[0, 250, Y, 210]] }, mood: { libra: 'wide' },
      front: (x, t, lt) => easel(x, 760, 1000, 1, 'PAGE 9', (cx, cy) => { for (let i = 0; i < 6; i++) { x.fillStyle = '#9a8f80'; x.fillRect(cx - 160, cy - 120 + i * 50, 320 - (i % 3) * 40, 12) } }), stick: [[0.5, 1.8, 'PAGE 9.', PINK]] },
    { dur: 3.4, head: 'WITNESS: ARIES (THE DATE)', cast: { aries: [[0, 780, Y - 50, 240]] }, mood: { aries: 'squint' }, front: onStand('wood'),
      lines: [[0.2, 1.3, 'aries', 'I asked | in October.'], [1.7, 1.5, 'aries', "it's | January."]] },
    { dur: 3.4, head: 'FOR THE DEFENSE', cast: { libra: [[0, 330, Y, 240]] }, mood: { libra: 'sparkle' }, front: (x, t, lt) => { const k = Kp(lt, 0.3); if (k > 0) crawfish(x, 760, 1200, 1.4 * k) },
      lines: [[0.2, 1.4, 'libra', 'crawfish season | just started!'], [1.8, 1.4, 'libra', 'MORE options | now!']] },
    { dur: 3.0, head: 'WITNESS: SCORPIO', cast: { scorpio: [[0, 780, Y - 50, 240]] }, mood: { scorpio: 'squint' }, front: onStand('wood'),
      lines: [[0.3, 2.3, 'scorpio', 'pick | the first one.']] },
    { dur: 3.6, head: 'THE BENCH', cast: { libra: [[0, 330, Y, 230]] }, mood: { taurus: 'happy', libra: 'wide' },
      lines: [[0.2, 1.4, 'taurus', "baby, the spot | doesn't matter."], [1.8, 1.6, 'taurus', 'the person | does.']] },
    { dur: 3.4, head: 'THE ORDER', bang: 0.8, cast: { libra: [[0, 330, Y, 230]] }, mood: { taurus: lt => lt > 1 ? 'wink' : 'squint', libra: 'wide' },
      lines: [[1.0, 2.2, 'taurus', 'a decision. | today.']], stick: [[0.85, 1.0, 'BANG.', GOLD]] },
    { dur: 3.4, head: 'THE DECISION', cast: { libra: [[0, 300, Y, 240]], aries: [[0, 780, Y - 50, 240]] }, mood: { libra: 'squint', aries: lt => lt > 1.8 ? 'heart' : 'wide' },
      lines: [[0.2, 1.5, 'libra', 'crawfish. | Bellaire. | Saturday.']], stick: [[1.9, 1.3, 'DECIDED.', MINT]] },
    { dur: 3.0, head: 'CASE CLOSED', cast: { libra: [[0, 400, Y, 250]], aries: [[0, 690, Y, 250]] }, mood: { libra: 'heart', aries: 'heart' },
      lines: [[0.3, 1.1, 'libra', '...and Jan 9?'], [1.6, 1.1, 'aries', 'both.']] },
  ],
})

// ── hst246 · Sagittarius is on trial for one more Galveston trip
const hst246 = trial({
  hook: 'Sagittarius on trial | for one more | Galveston trip', judge: 'capricorn', pal: 'mint',
  endLine: 'Stay in town. Jan 9.', endStars: ['sagittarius', 'cancer', 'capricorn', 'gemini'],
  scenes: [
    { dur: 3.0, head: 'THE PEOPLE v. SAGITTARIUS', cast: { sagittarius: [[0, 340, Y, 270]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.05, 0.4] },
      front: (x, t) => postcard(x, 790, 1100, 0.8, 'GREETINGS FROM', 'GALVESTON', '#ffd36b', -0.08), lines: [[0.6, 1.9, 'sagittarius', "you know I | can't sit still."]] },
    { dur: 3.0, head: 'EXHIBIT A: TRIP 1', cast: { sagittarius: [[0, 250, Y, 210]] }, mood: { sagittarius: 'happy' },
      front: (x, t, lt) => easel(x, 760, 1000, Kp(lt, 0.1), 'EXHIBIT A', (cx, cy) => postcard(x, cx, cy, 1.0, 'TRIP 1', 'GALVESTON', '#ffd36b', 0)), lines: [[0.5, 2.2, 'sagittarius', 'one beach day.']] },
    { dur: 2.8, head: 'EXHIBIT N: TRIP 14', cast: { sagittarius: [[0, 250, Y, 210]] }, mood: { sagittarius: 'wink' },
      front: (x, t, lt) => easel(x, 760, 1000, 1, 'EXHIBIT N', (cx, cy) => { for (let k = 0; k < 4; k++) postcard(x, cx - 60 + k * 40, cy - 40 + k * 30, 0.7, `TRIP ${11 + k}`, 'GALVESTON', '#ffd36b', -0.1 + k * 0.07) }), stick: [[0.5, 1.8, '14 WEEKENDS', PINK]] },
    { dur: 3.4, head: 'WITNESS: CANCER', cast: { cancer: [[0, 780, Y - 50, 240]] }, mood: { cancer: 'wide' }, front: onStand('mint'),
      lines: [[0.2, 1.4, 'cancer', 'I planned | a dinner.'], [1.8, 1.4, 'cancer', 'Sag was | at the beach.']] },
    { dur: 3.2, head: 'FOR THE DEFENSE', cast: { sagittarius: [[0, 360, Y, 250]] }, mood: { sagittarius: 'sparkle' },
      lines: [[0.3, 2.4, 'sagittarius', 'the water | is brown, but | it is MINE.']] },
    { dur: 3.2, head: 'WITNESS: GEMINI', cast: { gemini: [[0, 780, Y - 50, 240]] }, mood: { gemini: 'happy', capricorn: 'squint' }, front: onStand('mint'),
      lines: [[0.2, 1.4, 'gemini', 'brown water | is a vibe.'], [1.8, 1.2, 'capricorn', 'irrelevant.']] },
    { dur: 3.6, head: 'THE REAL REASON', cast: { sagittarius: [[0, 330, Y, 240]] }, mood: { sagittarius: 'wide', capricorn: 'neutral' },
      lines: [[0.2, 1.4, 'sagittarius', 'what if | I miss something?'], [1.8, 1.6, 'capricorn', 'you are | missing someone.']] },
    { dur: 3.6, head: 'THE VERDICT', bang: 0.9, cast: { sagittarius: [[0, 300, Y, 220]], cancer: [[0, 780, Y, 220]] }, mood: { capricorn: lt => lt > 1 ? 'happy' : 'squint', sagittarius: 'wide', cancer: 'wide' },
      lines: [[1.1, 2.3, 'capricorn', 'stay one | weekend.']], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
    { dur: 3.2, head: 'WHICH WEEKEND?', cast: { sagittarius: [[0, 330, Y, 240]] }, mood: { capricorn: 'wink', sagittarius: 'squint' },
      lines: [[0.2, 1.2, 'sagittarius', 'which one?'], [1.5, 1.5, 'capricorn', 'Jan 9.']] },
    { dur: 3.2, head: 'CASE CLOSED', cast: { sagittarius: [[0, 400, Y, 250]], cancer: [[0, 690, Y, 250]] }, mood: { sagittarius: 'heart', cancer: 'heart' },
      lines: [[0.3, 1.3, 'sagittarius', 'then the beach | together?'], [1.8, 1.2, 'cancer', 'together.']] },
  ],
})

// ── hst247 · Houston traffic court, but for your love life (a rapid docket)
const docket = (n, id, charge, a, b, mood = 'wide') => ({ dur: 3.2, head: `CASE ${n}: ${id.toUpperCase()}`, cast: { [id]: [[0, 300, Y, 240]] }, mood: { [id]: mood },
  front: (x, t, lt) => { const k = Kp(lt, 0.05); if (k > 0) { x.save(); x.translate(790, 1100); x.scale(k, k); box(x, -190, -130, 380, 260, BONE, 6); x.fillStyle = BRAKE; x.fillRect(-190, -130, 380, 50); txt(x, 'CHARGE', 0, -104, { size: 28, col: BONE, font: MONO, weight: 700 }); charge.split(' | ').forEach((l, i, A) => txt(x, l, 0, -10 + (i - (A.length - 1) / 2) * 54 + 20, { size: 38, col: INK })); x.restore() } },
  lines: [[0.5, 1.3, id, a], [2.0, 1.1, 'scorpio', b]], bang: 2.0 })
const hst247 = trial({
  hook: 'Houston traffic court, | but for | your love life', judge: 'scorpio', pal: 'rose',
  endLine: 'Court is in session. Jan 9.', endStars: ['scorpio', 'aries', 'pisces', 'capricorn'],
  scenes: [
    { dur: 3.0, head: 'LOVE TRAFFIC COURT', cast: { aries: [[0, 200, Y, 200]], taurus: [[0, 420, Y, 200]], gemini: [[0, 640, Y, 200]], pisces: [[0, 860, Y, 200]] }, mood: { aries: 'wide', taurus: 'wide', gemini: 'wide', pisces: 'wide' },
      hops: { aries: [0.05], taurus: [0.15], gemini: [0.25], pisces: [0.35] }, lines: [[0.7, 1.8, 'gemini', 'is that... | YOU in line?']] },
    docket(1, 'aries', 'circled Rice Village | six times', 'there was | ALMOST a spot!', 'guilty. | walk.'),
    docket(2, 'taurus', 'U-turn under | the freeway | for a taco', 'a Texas U-turn | is legal!', 'acquitted. | fair.', 'happy'),
    docket(3, 'gemini', 'feeder road | the whole way', "it's scenic!", 'guilty. | of charm.', 'sparkle'),
    docket(4, 'capricorn', 'arrived | two hours early', 'traffic | was fine?', 'suspicious. | dismissed.', 'squint'),
    docket(5, 'pisces', 'cried over | the Westheimer | bumps', 'they were | SO bumpy.', 'understandable.'),
    docket(6, 'virgo', 'parked in the | shade, a mile | away', 'my seats | stay cool.', 'smart. | acquitted.', 'squint'),
    { dur: 3.4, head: 'CASE 7: YOU', cast: {}, mood: { scorpio: 'squint' },
      front: (x, t, lt) => { const k = Kp(lt, 0.05); if (k > 0) { x.save(); x.translate(540, 1120); x.scale(k, k); box(x, -260, -130, 520, 260, BONE, 6); x.fillStyle = BRAKE; x.fillRect(-260, -130, 520, 50); txt(x, 'CHARGE', 0, -104, { size: 28, col: BONE, font: MONO, weight: 700 }); txt(x, 'watched this', 0, -16, { size: 44, col: INK }); txt(x, 'whole thing', 0, 44, { size: 44, col: INK }); x.restore() } },
      lines: [[0.3, 1.4, 'scorpio', 'yes. | you.'], [1.9, 1.3, 'scorpio', 'and you | loved it.']] },
    { dur: 3.6, head: 'SENTENCING', bang: 2.2, cast: { aries: [[0, 160, Y, 170]], taurus: [[0, 310, Y, 170]], gemini: [[0, 460, Y, 170]], capricorn: [[0, 610, Y, 170]], pisces: [[0, 760, Y, 170]], virgo: [[0, 910, Y, 170]] },
      mood: { scorpio: lt => lt > 2.2 ? 'wink' : 'squint', aries: 'wide', taurus: 'wide', gemini: 'wide', capricorn: 'wide', pisces: 'wide', virgo: 'wide' },
      lines: [[0.3, 1.8, 'scorpio', 'all of you | are sentenced | to...']], stick: [[2.2, 1.2, 'BANG.', GOLD]] },
    { dur: 3.0, head: 'THE BETA PARTY · JAN 9', cast: { aries: [[0, 160, Y, 170]], taurus: [[0, 310, Y, 170]], gemini: [[0, 460, Y, 170]], capricorn: [[0, 610, Y, 170]], pisces: [[0, 760, Y, 170]], virgo: [[0, 910, Y, 170]] },
      mood: { scorpio: 'happy', aries: 'heart', taurus: 'heart', gemini: 'sparkle', capricorn: 'happy', pisces: 'heart', virgo: 'happy' }, hops: { aries: [0.3], taurus: [0.4], gemini: [0.5], capricorn: [0.6], pisces: [0.7], virgo: [0.8] },
      lines: [[0.3, 2.3, 'scorpio', '...the beta | party. Jan 9.']] },
  ],
})

export const W10C = { hst236, hst237, hst238, hst239, hst240, hst241, hst242, hst243, hst244, hst245, hst246, hst247 }
