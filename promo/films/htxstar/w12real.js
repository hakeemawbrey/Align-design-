// w12 · Houston Star Talk reality dating shows (hst299–hst310): villa nights, confessional cut-ins (the star looks at
// YOU), Houston group dates, and the star ceremony (gold stars instead of roses). Generic shows, no real show names.
// Party facts: only the date (Jan 9). Built on starrace/ep.js scenes; props in w12kit.js.
import { clamp, prog, ease } from '../../src/lib.js'
import { partyCard, taco, puffer, soupPot, plantBlanket, coffeeShop, houses, mural, car } from './kit.js'
import {
  Kp, BADGE, STING, dingS, music, lines, villa, confessional, ceremony, goldStar, showTitle, flashback, pond, paddleBoat, batBridge,
  bayouTrail, porch, tunnel, kitchen, thermostat, sweater, glasses, clipboard, heldStar, confetti,
  label, sparkles, pop01, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV, box, txt, BRAKE,
} from './w12kit.js'

const Y = 1290
const NAMES = { aries: 'ARIES', taurus: 'TAURUS', gemini: 'GEMINI', cancer: 'CANCER', leo: 'LEO', virgo: 'VIRGO', libra: 'LIBRA', scorpio: 'SCORPIO', sagittarius: 'SAGITTARIUS', capricorn: 'CAPRICORN', aquarius: 'AQUARIUS', pisces: 'PISCES' }
/** a reality episode: R = { show, tag, th, hook, endLine, endStars, scenes } with helpers below */
const ep = R => ({ hook: R.hook, badge: BADGE, cues: [...STING, ...(R.cues || [])], endLen: 6.2, end: (x, t, lt) => partyCard(x, t, lt, { line: R.endLine, stars: R.endStars }), scenes: R.scenes })
/** the opening: villa + show title card + whoever is on the deck */
const opener = (R, cast, lines, extra = {}) => ({ dur: 3.2, set: (x, t, lt) => { villa(x, t, R.th); showTitle(x, t, R.show, R.tag, { cy: 790, col: R.col || PINK }) }, cast, lines, hops: Object.fromEntries(Object.keys(cast).map(id => [id, [0.02, 0.5]])), ...extra })
/** an arrival on the deck with a name sticker */
const arrive = (R, id, from, where, lines, { front, cast, ...extra } = {}) => ({ dur: 3.0, set: (x, t, lt) => villa(x, t, R.th), lines, ...extra,
  cast: { [id]: [[0, from, Y, 210], [0.8, 540, Y, 210]], ...(cast || {}) },
  front: (x, t, lt, P) => { label(x, 540, 1560, `${NAMES[id]} · ${where}`, Kp(lt, 0.6), { size: 40, bg: R.col || PINK, rot: -0.03, font: MONO, weight: 700 }); front?.(x, t, lt, P) } })
/** a confessional: the star alone, talking to you */
const conf = (id, sub, lines, extra = {}) => ({ dur: 3.4, set: (x, t, lt) => confessional(x, t, lt, { wall: extra.wall || '#3a1f4a', name: NAMES[id], sub }), cast: { [id]: [[0, 540, 1170, 320]] }, lines, ...extra, cast: { [id]: [[0, 540, 1170, 320]], ...(extra.cast || {}) } })
/** the star ceremony: host behind the tray, contestants on both sides; give = [[lt, id]] */
const POS = [[170, Y + 40], [350, Y + 60], [730, Y + 60], [910, Y + 40]]
const cer = (R, host, ids, give, lines, extra = {}) => {
  const n0 = extra.n ?? give.length
  return { dur: extra.dur || 4.8, set: (x, t, lt) => ceremony(x, t, { n: n0 - give.filter(g => lt > g[0]).length, wall: R.cerWall || '#1a0f2e' }),
    cast: { [host]: [[0, 540, 960, 200]], ...Object.fromEntries(ids.map((id, i) => [id, [[0, POS[i][0], POS[i][1], 170]]])) },
    mood: { [host]: 'happy', ...Object.fromEntries(ids.map(id => { const g = give.find(g => g[1] === id); return [id, lt => g && lt > g[0] ? 'heart' : extra.wait || 'neutral'] })), ...(extra.mood || {}) },
    hops: Object.fromEntries(give.map(([a, id]) => [id, [a + 0.1, a + 0.5]])),
    front: (x, t, lt, P) => { give.forEach(([a, id]) => heldStar(x, P, id, t, Kp(lt, a, 0.35), 0.48)); if (lt < 0.25 || true) txt(x, 'THE STAR CEREMONY', 540, 1620, { size: 34, col: GOLD, font: MONO, weight: 700 }); extra.front?.(x, t, lt, P) },
    lines, cues: give.map(([a]) => a), ...extra.scene }
}
const withCues = (scenes, extra = []) => { let acc = 0; const cues = [...extra]; for (const s of scenes) { (s.cues || []).forEach(a => cues.push(dingS(Math.round((acc + a) * 100) / 100))); acc += s.dur } return cues }
const R0 = R => ({ ...R, cues: withCues(R.scenes, R.cues) })

// ── the 12 episodes ─────────────────────────────────────────────────────────────────────────────────────────
const LOOP = { show: 'Love Inside | the Loop', col: PINK, th: {} }
const BAYOU = { show: 'Bayou | Hearts', col: MINT, th: { sky1: '#0f1f3a', sky2: '#2a5a6a', pool: '#2a9ab0', lights: [MINT, GOLD, SKYB] } }
const HUMID = { show: 'Humidity | House', col: '#ff9a3c', th: { sky1: '#2a0f1a', sky2: '#7a3a2a', pool: '#2f8fa0', deck: '#b08a5a', lights: ['#ff9a3c', GOLD, PINK] } }
const SPACE = { show: 'Space City | Singles', col: LAV, th: { sky1: '#0a0a2a', sky2: '#3a2a7a', pool: '#3a6ad0', lights: [LAV, SKYB, BONE] } }

export const W12R = {
  // hst299 · arrivals night: two parking spots, a Katy drive, a plant
  hst299: R0({ ...LOOP, tag: 'S1 · E1', hook: 'Six Houston singles. | One villa. | Zero parking.', music: ['pop', 'G', 4299], endLine: 'Park nice. Jan 9.', endStars: ['libra', 'virgo', 'leo', 'sagittarius'],
    scenes: [
      opener(LOOP, { libra: [[0, 540, Y, 210]] }, [[0.6, 1.6, 'libra', 'welcome to | the villa!']], { mood: { libra: 'sparkle' } }),
      arrive(LOOP, 'leo', 1250, 'RIVER OAKS', [[1.0, 1.8, 'leo', 'I parked in | two spots. for us.']], { mood: { leo: 'wink' } }),
      arrive(LOOP, 'virgo', -170, 'THE HEIGHTS', [[1.0, 1.8, 'virgo', 'someone took | TWO spots.']], { mood: { virgo: 'squint' }, front: (x, t, lt, P) => clipboard(x, P, 'virgo') }),
      arrive(LOOP, 'sagittarius', 1250, 'KATY', [[1.0, 1.8, 'sagittarius', 'drove 45 min. | worth it?']], { mood: { sagittarius: 'wide' } }),
      conf('virgo', 'The Heights', [[0.4, 1.4, 'virgo', 'two spots. | at a VILLA.'], [1.9, 1.3, 'virgo', 'I made | a chart.']], { mood: { virgo: 'squint' }, front: (x, t, lt, P) => clipboard(x, P, 'virgo', 0.5) }),
      conf('sagittarius', 'Katy', [[0.4, 1.4, 'sagittarius', 'Katy IS | Houston.'], [1.9, 1.4, 'sagittarius', 'would YOU | drive this far?']], { wall: '#1f3a4a' }),
      arrive(LOOP, 'aquarius', -170, 'MONTROSE', [[1.0, 1.8, 'aquarius', 'I brought the | villa a plant.']], { mood: { aquarius: 'sparkle' }, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aquarius'); box(x, cx + s * 0.45 - 30, cy + 10, 60, 60, '#c9783a', 4); x.fillStyle = '#3f8a4a'; x.beginPath(); x.ellipse(cx + s * 0.45, cy - 20, 26, 44, 0, 0, Math.PI * 2); x.fill() } }),
      cer(LOOP, 'libra', ['virgo', 'leo', 'aquarius', 'sagittarius'], [[0.5, 'virgo'], [1.4, 'aquarius'], [2.4, 'leo'], [3.4, 'sagittarius']], [[0.2, 1.2, 'libra', 'Virgo.'], [2.3, 1.0, 'libra', 'Leo, you | moved the car.'], [3.4, 1.3, 'libra', 'Katy: | accept this star?']], { dur: 5.0 }),
      conf('sagittarius', 'Katy', [[0.4, 2.4, 'sagittarius', 'staying. | the drive was | worth it.']], { wall: '#1f3a4a', mood: { sagittarius: 'heart' }, dur: 3.0 }),
    ] }),

  // hst300 · group date: Hermann Park paddle boats, Gemini and Libra go in circles
  hst300: R0({ ...BAYOU, tag: 'GROUP DATE', hook: 'Group date: | paddle boats. | It went in circles.', music: ['jazzy', 'F', 4300], endLine: 'Go in circles with us. Jan 9.', endStars: ['gemini', 'libra', 'taurus', 'aries'],
    scenes: [
      opener(BAYOU, { aries: [[0, 540, Y, 210]] }, [[0.6, 1.8, 'aries', 'GROUP DATE! | paddle boats!']], { mood: { aries: 'sparkle' }, hops: { aries: [0.02, 0.4, 0.8, 1.2] } }),
      { dur: 3.2, set: (x, t, lt) => pond(x, t), front: (x, t, lt, P) => { const [gx, gy] = P.at('gemini'); paddleBoat(x, gx + 60, gy + 90, '#ff6a5a', 1, Math.sin(lt) * 0.05) },
        cast: { gemini: [[0, 380, 1300, 160]], libra: [[0, 540, 1300, 160]] }, lines: [[0.4, 1.4, 'gemini', 'I steer!'], [1.8, 1.3, 'libra', 'no, I | steer!']], mood: { gemini: 'sparkle', libra: 'squint' } },
      { dur: 3.4, set: (x, t, lt) => pond(x, t), front: (x, t, lt, P) => { const a = lt * 2.2, cx = 540 + Math.cos(a) * 160, cy = 1420 + Math.sin(a) * 60; paddleBoat(x, cx, cy, '#ff6a5a', 1, Math.sin(a) * 0.2) },
        back: (x, t, lt) => {}, cast: { gemini: [[0, 470 + 160, 1330, 160], [1, 470, 1380, 160], [2, 380 - 0, 1330, 160], [3.4, 610, 1330, 160]], libra: [[0, 630 + 160, 1330, 160], [1, 630, 1380, 160], [2, 540, 1330, 160], [3.4, 770, 1330, 160]] },
        lines: [[0.4, 1.4, 'gemini', 'left! | LEFT!'], [2.0, 1.3, 'libra', 'we are... | spinning.']], stick: [[1.2, 1.6, 'LAP 6', GOLD]], mood: { gemini: 'wide', libra: 'wide' } },
      conf('libra', 'Midtown', [[0.4, 1.4, 'libra', 'we went in | circles for 40 min.'], [1.9, 1.4, 'libra', 'best date | ever.']], { mood: { libra: 'heart' }, wall: '#1f4a3a' }),
      { dur: 3.2, set: (x, t, lt) => pond(x, t), front: (x, t, lt, P) => paddleBoat(x, 300, 1440, '#5ec8ff', 0.9),
        cast: { taurus: [[0, 300, 1350, 160]] }, lines: [[0.4, 1.4, 'taurus', 'I brought | snacks.'], [1.9, 1.2, 'taurus', 'I will not | pedal.']], mood: { taurus: 'sleepy' } },
      conf('taurus', 'Sugar Land', [[0.4, 2.6, 'taurus', 'a boat you | pedal? on a date? | in this humidity?']], { mood: { taurus: 'eyeroll' } }),
      conf('gemini', 'The Heights', [[0.4, 1.4, 'gemini', 'we are | 2 for 2.'], [1.9, 1.4, 'gemini', "you'd pedal | for me, right?"]], { mood: { gemini: 'wink' }, wall: '#3a2a12' }),
      cer(BAYOU, 'aries', ['gemini', 'libra', 'taurus'], [[0.5, 'libra'], [1.5, 'gemini'], [3.0, 'taurus']], [[0.3, 1.0, 'aries', 'Libra.'], [1.4, 1.2, 'aries', 'Gemini. | both of you.'], [2.9, 1.6, 'aries', 'Taurus. thanks | for the snacks.']], { dur: 4.8, mood: { taurus: lt => lt > 3 ? 'heart' : 'sleepy' } }),
    ] }),

  // hst301 · Pisces cries in every confessional (and gets the star)
  hst301: R0({ ...SPACE, tag: 'S1 · E3', hook: 'Pisces has cried in | every confessional', music: ['dreamy', 'E', 4301], endLine: 'Happy tears only. Jan 9.', endStars: ['pisces', 'cancer', 'scorpio', 'aquarius'],
    scenes: [
      conf('pisces', 'Clear Lake', [[0.2, 1.5, 'pisces', 'confessional | number 14.'], [1.9, 1.4, 'pisces', "I'm fine. | (I'm not)"]], { wall: '#1f2a5a' }),
      { dur: 3.0, set: (x, t, lt) => villa(x, t, SPACE.th), front: (x, t, lt, P) => puffer(x, P, 'pisces', '#5ec8ff'), cast: { pisces: [[0, 540, Y, 210]] }, lines: [[0.5, 2.0, 'pisces', "it's 55°. | I'm FREEZING."]], stick: [[0.2, 1.4, 'MONDAY', LAV]] },
      conf('pisces', 'Clear Lake', [[0.3, 2.6, 'pisces', 'the cold is | so... beautiful.']], { wall: '#1f2a5a', dur: 3.0 }),
      { dur: 3.2, set: (x, t, lt) => batBridge(x, t, lt), cast: { pisces: [[0, 400, 1180, 170]], scorpio: [[0, 650, 1180, 170]] }, lines: [[0.4, 1.4, 'scorpio', 'the bats | are out.'], [1.9, 1.2, 'pisces', "I'm crying."]], stick: [[0.1, 1.2, 'WEDNESDAY', LAV]], mood: { scorpio: 'squint' } },
      conf('scorpio', 'EaDo', [[0.4, 1.4, 'scorpio', 'she cried | at the bats.'], [1.9, 1.4, 'scorpio', '...I did too.']], { wall: '#3a1a2a', mood: { scorpio: 'neutral' } }),
      { dur: 3.0, set: (x, t, lt) => villa(x, t, SPACE.th), cast: { pisces: [[0, 380, Y, 200]], cancer: [[0, 700, Y, 200]] }, front: (x, t, lt, P) => { const [cx, cy] = P.at('cancer'); soupPot(x, cx + 120, cy + 90, t) },
        lines: [[0.4, 1.3, 'cancer', 'I made | you soup.'], [1.8, 1.0, 'pisces', '(sob)']], stick: [[0.1, 1.2, 'FRIDAY', LAV]], mood: { cancer: 'heart' } },
      conf('pisces', 'Clear Lake', [[0.3, 1.4, 'pisces', 'someone said | "y\'all" nicely.'], [1.9, 1.4, 'pisces', 'do YOU cry | this much?']], { wall: '#1f2a5a', mood: { pisces: 'sparkle' } }),
      cer(SPACE, 'aquarius', ['scorpio', 'pisces', 'cancer'], [[0.5, 'cancer'], [1.5, 'scorpio'], [3.0, 'pisces']], [[0.3, 1.0, 'aquarius', 'Cancer.'], [1.4, 1.2, 'aquarius', 'Scorpio.'], [2.8, 1.8, 'aquarius', 'Pisces. | please accept.']], { dur: 4.8 }),
      conf('pisces', 'Clear Lake', [[0.3, 2.4, 'pisces', 'confessional 15: | happy tears.']], { wall: '#1f2a5a', mood: { pisces: 'heart' }, dur: 3.0 }),
    ] }),

  // hst302 · the breakfast taco ceremony (no roses: tacos)
  hst302: R0({ ...HUMID, tag: 'TACO NIGHT', cerWall: '#2a1408', hook: 'No roses here. | Just breakfast tacos.', music: ['funk', 'D', 4302], endLine: 'Flour or corn, Jan 9.', endStars: ['leo', 'cancer', 'virgo', 'capricorn'],
    scenes: [
      opener(HUMID, { leo: [[0, 540, Y, 220]] }, [[0.6, 1.8, 'leo', 'tonight: the | taco ceremony.']], { mood: { leo: 'sparkle' } }),
      { dur: 3.2, set: (x, t, lt) => kitchen(x, t), front: (x, t, lt) => { for (let k = 0; k < 5; k++) taco(x, 380 + k * 80, 1130, 0.8) }, cast: { leo: [[0, 540, 1000, 200]] },
        lines: [[0.4, 1.4, 'leo', 'five tacos. | five hearts.'], [2.0, 1.1, 'leo', 'flour.']], mood: { leo: 'wink' } },
      conf('virgo', 'Rice Village', [[0.4, 1.4, 'virgo', 'all flour?'], [1.9, 1.4, 'virgo', 'I asked | for corn.']], { mood: { virgo: 'squint' }, wall: '#3a2a12', front: (x, t, lt, P) => clipboard(x, P, 'virgo', 0.5) }),
      conf('capricorn', 'Memorial', [[0.4, 1.4, 'capricorn', 'I woke up | at 5 to run.'], [1.9, 1.4, 'capricorn', 'I NEED | that taco.']], { wall: '#2a2a3a', mood: { capricorn: 'squint' } }),
      { dur: 3.2, set: (x, t, lt) => kitchen(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('leo'); taco(x, cx + s * 0.5, cy + 10, 0.9) }, cast: { leo: [[0, 400, 1000, 200]], virgo: [[0, 760, 1000, 200]] },
        lines: [[0.4, 1.3, 'leo', 'I made you | one corn.'], [1.9, 1.2, 'virgo', '...oh.']], mood: { virgo: lt => lt > 1.8 ? 'heart' : 'wide' } },
      conf('virgo', 'Rice Village', [[0.4, 2.6, 'virgo', 'he remembered | corn. that is | a green flag.']], { mood: { virgo: 'heart' }, wall: '#3a2a12', dur: 3.0 }),
      cer(HUMID, 'leo', ['capricorn', 'virgo', 'cancer'], [[0.5, 'virgo'], [1.5, 'capricorn'], [3.0, 'cancer']], [[0.3, 1.0, 'leo', 'Virgo: corn.'], [1.4, 1.2, 'leo', 'Capricorn.'], [2.8, 1.8, 'leo', 'Cancer: | accept this taco?']],
        { dur: 4.8, front: (x, t, lt, P) => {} }),
      conf('cancer', 'Third Ward', [[0.3, 1.4, 'cancer', 'I came for | the tacos.'], [1.9, 1.4, 'cancer', 'flour or corn: | YOU pick.']], { mood: { cancer: 'wink' }, wall: '#3a1a1a' }),
    ] }),

  // hst303 · first date under the bat bridge (Scorpio and Aquarius)
  hst303: R0({ ...LOOP, tag: 'FIRST DATE', hook: 'First date under | the bat bridge', music: ['synthwave', 'A', 4303], endLine: 'Sunset plans: Jan 9.', endStars: ['scorpio', 'aquarius', 'libra', 'pisces'],
    scenes: [
      { dur: 3.2, set: (x, t, lt) => batBridge(x, t, lt, { bats: 0.3 }), cast: { scorpio: [[0, 400, 1180, 180]], aquarius: [[0, 680, 1180, 180]] }, hops: { scorpio: [0.05], aquarius: [0.3] },
        lines: [[0.9, 1.8, 'aquarius', 'wait for | sunset.']], mood: { scorpio: 'squint', aquarius: 'sparkle' } },
      conf('scorpio', 'EaDo', [[0.4, 1.4, 'scorpio', 'a bat date. | ok.'], [1.9, 1.4, 'scorpio', 'I thought it | was a metaphor.']], { wall: '#3a1a2a', mood: { scorpio: 'eyeroll' } }),
      { dur: 3.0, set: (x, t, lt) => batBridge(x, t, lt, { bats: 0.2 }), cast: { scorpio: [[0, 400, 1180, 180]], aquarius: [[0, 680, 1180, 180]] }, lines: [[0.4, 1.4, 'scorpio', 'where are | they?'], [1.8, 1.0, 'aquarius', 'patience.']], mood: { scorpio: 'neutral' } },
      { dur: 3.6, set: (x, t, lt) => batBridge(x, t, lt, { bats: clamp(lt / 1.2) }), cast: { scorpio: [[0, 400, 1180, 180], [2.5, 470, 1180, 180]], aquarius: [[0, 680, 1180, 180], [2.5, 610, 1180, 180]] }, lines: [[0.6, 1.4, 'scorpio', '...oh.'], [2.1, 1.4, 'scorpio', 'oh WOW.']], mood: { scorpio: 'wide', aquarius: 'heart' } },
      conf('aquarius', 'Montrose', [[0.4, 1.4, 'aquarius', 'Scorpio | smiled.'], [1.9, 1.4, 'aquarius', 'on camera. | rare footage.']], { wall: '#1f3a4a', mood: { aquarius: 'sparkle' } }),
      conf('scorpio', 'EaDo', [[0.4, 1.4, 'scorpio', "I didn't | smile."], [1.9, 1.4, 'scorpio', "...don't tell | anyone. ok?"]], { wall: '#3a1a2a', mood: { scorpio: lt => lt > 1.8 ? 'wink' : 'squint' } }),
      { dur: 3.2, set: (x, t, lt) => batBridge(x, t, lt, { bats: 0.6 }), back: (x, t, lt) => sparkles(x, t, 540, 1050, t - lt + 0.3, 10, 260, 3), cast: { scorpio: [[0, 470, 1180, 180]], aquarius: [[0, 610, 1180, 180]] }, lines: [[0.4, 2.4, 'scorpio', 'same time | next week?']], mood: { scorpio: 'heart', aquarius: 'heart' } },
      cer(LOOP, 'libra', ['scorpio', 'aquarius'], [[0.6, 'aquarius'], [2.0, 'scorpio']], [[0.4, 1.2, 'libra', 'Aquarius.'], [1.8, 2.0, 'libra', 'Scorpio. we | saw the smile.']], { dur: 4.4, mood: { scorpio: lt => lt > 2 ? 'wink' : 'squint' } }),
    ] }),

  // hst304 · hometown visits, Houston edition (Sugar Land, Third Ward, Bellaire, Clear Lake)
  hst304: R0({ ...BAYOU, tag: 'HOMETOWNS', hook: 'Hometown visits, | Houston edition', music: ['house', 'C', 4304], endLine: 'Every side of town. Jan 9.', endStars: ['libra', 'capricorn', 'cancer', 'taurus'],
    scenes: [
      opener(BAYOU, { libra: [[0, 540, Y, 210]] }, [[0.6, 1.8, 'libra', 'hometown | week!']], { mood: { libra: 'sparkle' } }),
      { dur: 3.4, set: (x, t, lt) => { const g = x.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, '#8fc8f0'); g.addColorStop(1, '#e8f4ff'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); houses(x, 1200, t); x.fillStyle = '#5aa04a'; x.fillRect(0, 1200, 1080, 720) },
        cast: { capricorn: [[0, 540, 1330, 200]] }, lines: [[0.4, 1.4, 'capricorn', 'Sugar Land. | lawns: edged.'], [1.9, 1.3, 'capricorn', 'mom has | questions.']], stick: [[0.1, 1.4, 'SUGAR LAND', MINT]], mood: { capricorn: 'squint' } },
      { dur: 3.4, set: (x, t, lt) => { mural(x, t); x.fillStyle = '#3a2a3a'; x.fillRect(0, 1320, 1080, 600) }, cast: { cancer: [[0, 540, 1260, 200]] },
        lines: [[0.4, 1.4, 'cancer', 'Third Ward: | murals, music.'], [1.9, 1.3, 'cancer', 'and my | auntie\'s food.']], stick: [[0.1, 1.4, 'THIRD WARD', MINT]], mood: { cancer: 'heart' } },
      { dur: 3.4, set: (x, t, lt) => { x.fillStyle = '#1a1030'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 5; k++) { box(x, k * 220, 500, 200, 720, ['#c0304a', '#2b5fb0', '#c98e1a', '#1f7a4a', '#8a3ab0'][k], 6); txt(x, ['PHO', 'BOBA', 'HOT POT', 'DUMPLING', 'BAKERY'][k], k * 220 + 100, 560, { size: 30, col: BONE, font: MONO, weight: 700 }) } x.fillStyle = '#2a2638'; x.fillRect(0, 1220, 1080, 700) },
        cast: { taurus: [[0, 300, 1330, 200], [3.4, 780, 1330, 200]] }, lines: [[0.4, 1.4, 'taurus', 'Bellaire: | the food crawl.'], [1.9, 1.3, 'taurus', 'stop 9 | of 12.']], stick: [[0.1, 1.4, 'BELLAIRE BLVD', MINT]], mood: { taurus: 'heart' } },
      { dur: 3.4, set: (x, t, lt) => { pond(x, t, { sky1: '#5aa0e0', sky2: '#c8e8ff' }) }, front: (x, t, lt) => paddleBoat(x, 540 + Math.sin(t) * 20, 1450, BONE, 1.2), cast: { aquarius: [[0, 540, 1290, 180]] },
        lines: [[0.4, 1.4, 'aquarius', 'Clear Lake. | the neighbors'], [1.9, 1.3, 'aquarius', 'are all | engineers.']], stick: [[0.1, 1.4, 'CLEAR LAKE', MINT]] },
      conf('libra', 'host', [[0.4, 1.4, 'libra', 'four hometowns. | one city.'], [1.9, 1.4, 'libra', "where's YOUR | hometown?"]], { wall: '#1f4a3a', mood: { libra: 'sparkle' } }),
      cer(BAYOU, 'libra', ['capricorn', 'cancer', 'taurus', 'aquarius'], [[0.5, 'cancer'], [1.3, 'taurus'], [2.1, 'aquarius'], [3.1, 'capricorn']], [[0.3, 1.6, 'libra', 'everyone | gets a star.'], [2.9, 1.6, 'libra', 'tell your | mom, Capricorn.']], { dur: 4.8 }),
    ] }),

  // hst305 · the tunnel date (on a Saturday)
  hst305: R0({ ...HUMID, tag: 'ONE-ON-ONE', hook: 'He planned | a tunnel date. | On a Saturday.', music: ['chiptune', 'G', 4305], endLine: 'Plan B: Jan 9.', endStars: ['aries', 'gemini', 'libra', 'leo'],
    scenes: [
      opener(HUMID, { aries: [[0, 540, Y, 220]] }, [[0.6, 1.8, 'aries', 'I planned | EVERYTHING.']], { mood: { aries: 'sparkle' } }),
      conf('aries', 'Memorial', [[0.4, 1.4, 'aries', 'the tunnels: | AC, food,'], [1.9, 1.4, 'aries', 'romance. | under downtown.']], { wall: '#3a1a1a', mood: { aries: 'sparkle' } }),
      { dur: 3.6, set: (x, t, lt) => tunnel(x, t, { gate: clamp((lt - 1.4) / 0.6) }), cast: { aries: [[0, 400, 1460, 200]], gemini: [[0, 680, 1460, 200]] },
        lines: [[0.3, 1.0, 'aries', 'ta-da!'], [2.1, 1.3, 'gemini', 'it is... | closing?']], stick: [[2.0, 1.5, 'CLOSED WEEKENDS', BRAKE]], mood: { aries: lt => lt > 2 ? 'wide' : 'sparkle', gemini: 'wide' } },
      conf('gemini', 'Midtown', [[0.4, 1.4, 'gemini', 'the tunnels | close weekends.'], [1.9, 1.4, 'gemini', 'everyone | knows that.']], { wall: '#1f3a4a', mood: { gemini: 'eyeroll' } }),
      conf('aries', 'Memorial', [[0.4, 1.4, 'aries', "I didn't | know that."], [1.9, 1.4, 'aries', 'did YOU | know that?']], { wall: '#3a1a1a', mood: { aries: 'wide' } }),
      { dur: 3.6, set: (x, t, lt) => { const g = x.createLinearGradient(0, 0, 0, 1200); g.addColorStop(0, '#5aa0e0'); g.addColorStop(1, '#ffe2b0'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#5aa04a'; x.fillRect(0, 1200, 1080, 720); box(x, 240, 1380, 600, 120, '#ff8fb1', 5); for (let k = 0; k < 5; k++) { x.fillStyle = BONE; x.fillRect(260 + k * 120, 1380, 60, 120) } },
        cast: { aries: [[0, 380, 1320, 190]], gemini: [[0, 700, 1320, 190]] }, lines: [[0.4, 1.4, 'aries', 'plan B: picnic | on the green.'], [2.0, 1.4, 'gemini', 'ok, this | is cute.']], stick: [[0.1, 1.4, 'DISCOVERY GREEN', MINT]], mood: { gemini: 'heart', aries: 'sparkle' } },
      conf('gemini', 'Midtown', [[0.3, 2.6, 'gemini', 'he pivoted. | THAT is the | green flag.']], { wall: '#1f3a4a', mood: { gemini: 'heart' }, dur: 3.0 }),
      cer(HUMID, 'libra', ['aries', 'gemini'], [[0.6, 'gemini'], [2.0, 'aries']], [[0.4, 1.2, 'libra', 'Gemini.'], [1.8, 2.0, 'libra', 'Aries. check | the hours next time.']], { dur: 4.4 }),
    ] }),

  // hst306 · the thermostat war
  hst306: R0({ ...SPACE, tag: 'S1 · E6', hook: 'Villa drama: | who touched | the thermostat?', music: ['funk', 'Bb', 4306], endLine: 'Bring a sweater. Jan 9.', endStars: ['cancer', 'capricorn', 'leo', 'virgo'],
    scenes: [
      { dur: 3.2, set: (x, t, lt) => { villa(x, t, SPACE.th); thermostat(x, 540, 900, '64°') }, cast: { cancer: [[0, 540, Y, 210]] }, front: (x, t, lt, P) => sweater(x, P, 'cancer'), hops: { cancer: [0.02, 0.4] },
        lines: [[0.9, 1.8, 'cancer', 'who made it | 64 in here?']], mood: { cancer: 'wide' } },
      conf('capricorn', 'Uptown', [[0.4, 1.4, 'capricorn', 'it was me.'], [1.9, 1.4, 'capricorn', "it's 88 | outside."]], { wall: '#2a2a3a', mood: { capricorn: 'squint' } }),
      { dur: 3.2, set: (x, t, lt) => { villa(x, t, SPACE.th); thermostat(x, 540, 900, lt < 1.6 ? '64°' : '76°') }, cast: { leo: [[0, 1250, Y, 210], [0.7, 540, Y, 210]] }, lines: [[1.0, 1.8, 'leo', '76. my | glow needs heat.']], mood: { leo: 'wink' } },
      conf('cancer', 'Bellaire', [[0.4, 1.4, 'cancer', 'I keep a | sweater in | every room.'], [1.9, 1.4, 'cancer', 'indoor AC | is arctic.']], { wall: '#3a1a2a', front: (x, t, lt, P) => sweater(x, P, 'cancer') }),
      { dur: 3.2, set: (x, t, lt) => { villa(x, t, SPACE.th); thermostat(x, 540, 900, ['64°', '76°', '64°', '76°'][Math.floor(lt * 2.5) % 4]) }, cast: { leo: [[0, 300, Y, 190]], capricorn: [[0, 780, Y, 190]] }, lines: [[0.3, 1.0, 'leo', 'up.'], [1.3, 1.0, 'capricorn', 'down.'], [2.3, 0.9, 'leo', 'UP.']], stick: [[0.1, 1.2, 'HOUR 3', GOLD]], mood: { leo: 'squint', capricorn: 'squint' } },
      { dur: 3.4, set: (x, t, lt) => { villa(x, t, SPACE.th); thermostat(x, 540, 900, lt < 1.6 ? '76°' : '72°') }, cast: { virgo: [[0, 540, Y, 200]], leo: [[0, 230, Y + 30, 170]], capricorn: [[0, 850, Y + 30, 170]] },
        front: (x, t, lt, P) => clipboard(x, P, 'virgo'), lines: [[0.3, 1.4, 'virgo', 'compromise: | 72.'], [1.9, 1.3, 'virgo', 'and sweaters.']], mood: { virgo: 'happy', leo: 'eyeroll', capricorn: 'neutral' } },
      conf('virgo', 'The Heights', [[0.4, 2.6, 'virgo', 'what do YOU | set it to? | be honest.']], { wall: '#1f4a3a', mood: { virgo: 'wink' }, front: (x, t, lt, P) => clipboard(x, P, 'virgo', 0.5), dur: 3.0 }),
      cer(SPACE, 'virgo', ['leo', 'capricorn', 'cancer'], [[0.5, 'cancer'], [1.5, 'capricorn'], [2.5, 'leo']], [[0.3, 1.0, 'virgo', 'Cancer.'], [2.4, 2.2, 'virgo', 'and Leo. hands | off the AC.']], { dur: 4.8 }),
    ] }),

  // hst307 · the one cold day at the villa
  hst307: R0({ ...LOOP, tag: 'S1 · E7', hook: "It's 55 degrees. | The villa panics.", music: ['lofi', 'D', 4307], endLine: 'Cold or not, Jan 9.', endStars: ['sagittarius', 'taurus', 'pisces', 'cancer'],
    scenes: [
      { dur: 3.2, set: (x, t, lt) => villa(x, t, { sky1: '#3a4a6a', sky2: '#8a9ab0', pool: '#4a7a9a', lights: [SKYB, BONE, LAV] }), front: (x, t, lt, P) => { puffer(x, P, 'sagittarius'); puffer(x, P, 'taurus', '#2b5fb0') },
        cast: { sagittarius: [[0, 350, Y, 200]], taurus: [[0, 730, Y, 200]] }, hops: { sagittarius: [0.02, 0.3, 0.6], taurus: [0.2] }, lines: [[0.9, 1.8, 'sagittarius', 'IT IS | FIFTY-FIVE.']], mood: { sagittarius: 'wide', taurus: 'squint' } },
      conf('taurus', 'Pearland', [[0.4, 1.4, 'taurus', 'I put my | plants to bed.'], [1.9, 1.4, 'taurus', 'with a | blanket.']], { wall: '#2a3a2a', front: (x, t, lt) => plantBlanket(x, 880, 1180) }),
      { dur: 3.2, set: (x, t, lt) => villa(x, t, { sky1: '#3a4a6a', sky2: '#8a9ab0', pool: '#4a7a9a' }), front: (x, t, lt, P) => { const [cx, cy] = P.at('cancer'); soupPot(x, cx + 130, cy + 90, t) },
        cast: { cancer: [[0, 420, Y, 200]], pisces: [[0, 760, Y, 190]] }, lines: [[0.4, 1.4, 'cancer', 'soup for | the villa.'], [1.9, 1.2, 'pisces', '(happy sob)']], mood: { cancer: 'heart' } },
      conf('sagittarius', 'Cypress', [[0.4, 1.4, 'sagittarius', 'I posted the | car thermometer.'], [1.9, 1.4, 'sagittarius', 'you did | too. admit it.']], { wall: '#1f3a4a', mood: { sagittarius: 'wink' }, front: (x, t, lt, P) => puffer(x, P, 'sagittarius') }),
      { dur: 3.4, set: (x, t, lt) => porch(x, t), front: (x, t, lt, P) => { puffer(x, P, 'sagittarius'); puffer(x, P, 'taurus', '#2b5fb0') }, cast: { sagittarius: [[0, 400, 1300, 190]], taurus: [[0, 680, 1300, 190]] },
        lines: [[0.4, 1.4, 'taurus', 'porch date. | coats on.'], [1.9, 1.3, 'sagittarius', 'cozy | season!']], stick: [[0.1, 1.2, '2 PM: 55°', SKYB]], mood: { sagittarius: 'heart', taurus: 'heart' } },
      { dur: 3.2, set: (x, t, lt) => porch(x, t, { wall: '#e0a070' }), cast: { sagittarius: [[0, 400, 1300, 190]], taurus: [[0, 680, 1300, 190]] }, lines: [[0.4, 1.4, 'sagittarius', 'is it... | warm again?'], [1.9, 1.2, 'taurus', "it's 80."]], stick: [[0.1, 1.4, 'THURSDAY: 80°', BRAKE]], mood: { sagittarius: 'wide', taurus: 'eyeroll' } },
      conf('taurus', 'Pearland', [[0.4, 2.6, 'taurus', 'cold day: gone. | the date? | still on.']], { wall: '#2a3a2a', mood: { taurus: 'heart' }, dur: 3.0 }),
      cer(LOOP, 'cancer', ['sagittarius', 'taurus', 'pisces'], [[0.5, 'pisces'], [1.5, 'taurus'], [2.6, 'sagittarius']], [[0.3, 1.0, 'cancer', 'Pisces.'], [1.4, 1.0, 'cancer', 'Taurus.'], [2.5, 2.0, 'cancer', 'Sag. you can | take the coat off.']], { dur: 4.8 }),
    ] }),

  // hst308 · run club meet-cute on the bayou trail
  hst308: R0({ ...BAYOU, tag: 'ONE-ON-ONE', hook: 'They met at | run club. 6 a.m.', music: ['house', 'A', 4308], endLine: 'Your pace, Jan 9.', endStars: ['aries', 'virgo', 'gemini', 'sagittarius'],
    scenes: [
      { dur: 3.2, set: (x, t, lt) => bayouTrail(x, t, { scroll: lt * 600 }), cast: { aries: [[0, 300, 1250, 190], [3.2, 760, 1250, 190]], virgo: [[0, 600, 1250, 190], [3.2, 640, 1250, 190]] }, hops: { aries: [0.02, 0.3, 0.6, 0.9] },
        lines: [[1.0, 1.8, 'aries', 'race you | to the bridge!']], mood: { aries: 'sparkle', virgo: 'squint' } },
      conf('virgo', 'Rice Village', [[0.4, 1.4, 'virgo', 'it is | 6 a.m.'], [1.9, 1.4, 'virgo', 'I brought | a pace chart.']], { wall: '#1f4a3a', front: (x, t, lt, P) => clipboard(x, P, 'virgo', 0.5) }),
      { dur: 3.2, set: (x, t, lt) => bayouTrail(x, t, { scroll: lt * 900 }), cast: { aries: [[0, 760, 1250, 190], [2.0, 1250, 1250, 190]], virgo: [[0, 400, 1250, 190]] }, lines: [[0.4, 1.4, 'aries', 'keep up!'], [2.0, 1.2, 'virgo', '...bye.']], mood: { virgo: 'eyeroll' } },
      conf('aries', 'Memorial', [[0.4, 1.4, 'aries', 'I lapped her. | twice.'], [1.9, 1.4, 'aries', 'wait. was | that bad?']], { wall: '#3a1a1a', mood: { aries: lt => lt > 1.8 ? 'wide' : 'sparkle' } }),
      { dur: 3.4, set: (x, t, lt) => bayouTrail(x, t, { scroll: lt * 200 }), cast: { aries: [[0, 1250, 1250, 190], [1.0, 640, 1250, 190]], virgo: [[0, 420, 1250, 190]] }, lines: [[1.1, 1.3, 'aries', 'your pace?'], [2.5, 0.9, 'virgo', 'yes.']], mood: { aries: 'happy', virgo: 'heart' } },
      { dur: 3.2, set: (x, t, lt) => bayouTrail(x, t, { scroll: lt * 300, sky1: '#ff9a7a', sky2: '#ffd9a8' }), back: (x, t, lt) => sparkles(x, t, 540, 1100, t - lt + 0.3, 8, 240, 6), cast: { aries: [[0, 600, 1250, 190]], virgo: [[0, 460, 1250, 190]] },
        lines: [[0.4, 2.4, 'virgo', 'breakfast | tacos after?']], mood: { aries: 'heart', virgo: 'heart' } },
      conf('virgo', 'Rice Village', [[0.4, 2.6, 'virgo', 'he slowed down. | find someone | who matches YOU.']], { wall: '#1f4a3a', mood: { virgo: 'heart' }, dur: 3.0 }),
      cer(BAYOU, 'gemini', ['aries', 'virgo', 'sagittarius'], [[0.5, 'virgo'], [1.5, 'aries'], [2.6, 'sagittarius']], [[0.3, 1.0, 'gemini', 'Virgo.'], [1.4, 1.0, 'gemini', 'Aries.'], [2.5, 2.0, 'gemini', 'Sag, you slept | through run club.']], { dur: 4.8, mood: { sagittarius: lt => lt > 2.6 ? 'heart' : 'sleepy' } }),
    ] }),

  // hst309 · reunion special, hosted by the aunties
  hst309: R0({ ...HUMID, tag: 'REUNION', hook: 'Reunion special: | the aunties | have questions', music: ['jazzy', 'Eb', 4309], endLine: 'Reunion: Jan 9.', endStars: ['cancer', 'taurus', 'pisces', 'sagittarius'],
    scenes: [
      { dur: 3.2, set: (x, t, lt) => { ceremony(x, t, { tray: false, wall: '#2a1430' }); showTitle(x, t, 'The | Reunion', 'LIVE', { cy: 760, col: '#ff9a3c' }) }, front: (x, t, lt, P) => { glasses(x, P, 'cancer'); glasses(x, P, 'taurus') },
        cast: { cancer: [[0, 360, 1260, 220]], taurus: [[0, 720, 1260, 220]] }, hops: { cancer: [0.02], taurus: [0.2] }, lines: [[1.0, 1.8, 'taurus', 'sit down, | babies.']], mood: { cancer: 'squint', taurus: 'squint' } },
      { dur: 3.2, set: (x, t, lt) => { villa(x, t, HUMID.th); flashback(x, t) }, cast: { sagittarius: [[0, 540, Y, 210]] }, lines: [[0.3, 2.0, 'sagittarius', 'Katy IS | Houston.']], stick: [[0.1, 1.4, 'EPISODE 1', '#c9a06a']] },
      { dur: 3.2, set: (x, t, lt) => ceremony(x, t, { tray: false, wall: '#2a1430' }), front: (x, t, lt, P) => { glasses(x, P, 'cancer'); glasses(x, P, 'taurus') }, cast: { cancer: [[0, 230, 1260, 180]], taurus: [[0, 430, 1260, 180]], sagittarius: [[0, 800, 1260, 200]] },
        lines: [[0.3, 1.3, 'cancer', 'do you stand | by that?'], [1.8, 1.3, 'sagittarius', 'I... do.']], mood: { sagittarius: 'wide', cancer: 'squint' } },
      conf('sagittarius', 'Katy', [[0.4, 1.4, 'sagittarius', 'it says Houston | on my mail.'], [1.9, 1.4, 'sagittarius', 'YOU decide. | comment.']], { wall: '#1f3a4a', mood: { sagittarius: 'wink' } }),
      { dur: 3.2, set: (x, t, lt) => { kitchen(x, t); flashback(x, t) }, cast: { virgo: [[0, 540, 1000, 200]] }, lines: [[0.3, 2.0, 'virgo', 'I asked | for CORN.']], stick: [[0.1, 1.4, 'TACO NIGHT', '#c9a06a']], mood: { virgo: 'squint' } },
      { dur: 3.2, set: (x, t, lt) => ceremony(x, t, { tray: false, wall: '#2a1430' }), front: (x, t, lt, P) => { glasses(x, P, 'cancer'); glasses(x, P, 'taurus') }, cast: { cancer: [[0, 230, 1260, 180]], taurus: [[0, 430, 1260, 180]], pisces: [[0, 800, 1260, 200]] },
        lines: [[0.3, 1.3, 'taurus', 'Pisces, how | are you?'], [1.8, 1.2, 'pisces', '(sob)']], mood: { taurus: 'happy' } },
      conf('pisces', 'Clear Lake', [[0.4, 1.4, 'pisces', 'the aunties | asked how I am.'], [1.9, 1.4, 'pisces', 'nobody asks | that!']], { wall: '#1f2a5a', mood: { pisces: 'sparkle' } }),
      { dur: 3.6, set: (x, t, lt) => ceremony(x, t, { tray: false, wall: '#2a1430' }), front: (x, t, lt, P) => { glasses(x, P, 'cancer'); glasses(x, P, 'taurus'); confetti(x, t, t - lt + 1.2, 40) },
        cast: { cancer: [[0, 200, 1260, 170]], taurus: [[0, 400, 1260, 170]], sagittarius: [[0, 640, 1260, 170]], pisces: [[0, 870, 1260, 170]], virgo: [[0, 540, 1000, 160]] },
        lines: [[0.3, 1.4, 'cancer', 'now hug.'], [1.9, 1.5, 'taurus', 'and eat | something.']], hops: { sagittarius: [1.2], pisces: [1.3], virgo: [1.4] }, mood: { cancer: 'heart', taurus: 'heart', sagittarius: 'heart', pisces: 'heart', virgo: 'heart' } },
    ] }),

  // hst310 · the season finale: Scorpio's final star goes to... you
  hst310: R0({ ...LOOP, tag: 'FINALE', hook: 'The last star | goes to... you?', music: ['synthwave', 'F', 4310], endLine: 'Your star. Jan 9.', endStars: ['scorpio', 'aquarius', 'capricorn', 'libra'],
    scenes: [
      opener(LOOP, { scorpio: [[0, 540, Y, 220]] }, [[0.6, 1.8, 'scorpio', 'one star | left.']], { mood: { scorpio: 'squint' } }),
      { dur: 3.2, set: (x, t, lt) => { mural(x, t); x.fillStyle = '#3a2a3a'; x.fillRect(0, 1320, 1080, 600) }, cast: { aquarius: [[0, 540, 1260, 210]] }, lines: [[0.4, 1.4, 'aquarius', 'Montrose: | murals, vintage,'], [1.9, 1.2, 'aquarius', 'and me.']], stick: [[0.1, 1.4, 'OPTION 1: MONTROSE', PINK]], mood: { aquarius: 'sparkle' } },
      { dur: 3.2, set: (x, t, lt) => pond(x, t, { sky1: '#5aa0e0', sky2: '#c8e8ff' }), front: (x, t, lt) => paddleBoat(x, 540 + Math.sin(t) * 20, 1450, BONE, 1.2), cast: { capricorn: [[0, 540, 1290, 180]] },
        lines: [[0.4, 1.4, 'capricorn', 'Clear Lake: | a boat, a plan,'], [1.9, 1.2, 'capricorn', 'and spreadsheets.']], stick: [[0.1, 1.4, 'OPTION 2: CLEAR LAKE', PINK]] },
      conf('scorpio', 'EaDo', [[0.4, 1.4, 'scorpio', 'Montrose or | Clear Lake.'], [1.9, 1.4, 'scorpio', "that's long | distance."]], { wall: '#3a1a2a', mood: { scorpio: 'squint' } }),
      cer(LOOP, 'scorpio', ['aquarius', 'capricorn'], [], [[0.3, 1.4, 'scorpio', 'the last star | goes to...'], [2.0, 1.6, 'scorpio', '...']], { dur: 3.8, n: 1, wait: 'wide' }),
      { dur: 3.6, set: (x, t, lt) => ceremony(x, t, { n: 0 }), back: (x, t, lt) => sparkles(x, t, 540, 900, t - lt + 0.5, 14, 360, 7),
        front: (x, t, lt, P) => { const k = Kp(lt, 0.4, 0.45); if (k > 0) { x.save(); x.translate(540, 760); x.scale(k * 2.2, k * 2.2); goldStar(x, 0, 0, 60, t); x.restore() } },
        cast: { scorpio: [[0, 540, 1120, 280]] }, lines: [[0.6, 1.4, 'scorpio', '...you.'], [2.2, 1.3, 'scorpio', 'yes, YOU.']], look: { scorpio: [0, 0.4] }, mood: { scorpio: 'heart' }, cues: [0.5] },
      conf('aquarius', 'Montrose', [[0.4, 1.4, 'aquarius', 'honestly? | fair.'], [1.9, 1.4, 'aquarius', "we're all | invited anyway."]], { wall: '#1f3a4a', mood: { aquarius: 'wink' } }),
      { dur: 3.2, set: (x, t, lt) => villa(x, t), front: (x, t, lt) => confetti(x, t, t - lt + 0.2, 50), cast: { scorpio: [[0, 540, Y, 220]], aquarius: [[0, 240, Y + 30, 180]], capricorn: [[0, 840, Y + 30, 180]] },
        lines: [[0.4, 2.4, 'scorpio', 'see you | on Jan 9.']], mood: { scorpio: 'wink', aquarius: 'heart', capricorn: 'heart' }, hops: { aquarius: [0.5, 1.2], capricorn: [0.7, 1.4] } },
    ] }),
}
export const realEp = R => ep(R)
