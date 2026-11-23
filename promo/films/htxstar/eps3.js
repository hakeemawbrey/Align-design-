// Houston Star Talk: episodes 7–10 (see promo/films/HOUSTON-STARTALK.md)
// hst007 mission control · hst008 nature doc (the Katy cousin) · hst009 the slab · hst010 long distance (Katy ↔ Montrose)
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside } from '../starrace/ep.js'
import { label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, MONO, SERIF, SIGN_IDS } from '../signs3kit.js'
import { skyline, car, freeway, sweat, partyCard, taco, BRAKE, HGREEN, overheadSign, streetSign, calendar, cones, missionControl, loopMap, lowerThird, narr, houses, mural, coffeeShop, slab, garage } from './kit.js'

const Y = 1255
const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
const night = (x, t) => { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); outside(x, { ground: '#221b38' }) }
const big = (x, s, y = 700, col = GOLD, size = 120) => txt(x, s, 540, y, { size, col })

// ── hst007 · Houston, we have a match (mission control)
const HEIGHTS = [640, 560], KATY = [270, 640], PARTY = [560, 600]
const mission = {
  hook: 'Houston, | we have a match.', badge: BADGE, cues: STING, endLen: 6.2,
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Mission: Jan 9.', stars: ['taurus', 'cancer', 'capricorn', 'virgo'] }),
  scenes: [
    { dur: 3.6, set: (x, t) => missionControl(x, t, () => loopMap(x, 540, 610, 1, t, { dots: [[...HEIGHTS, '#f2b544', 'TAURUS · HEIGHTS'], [...KATY, '#5ec8ff', 'CANCER · KATY']] })),
      cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05, 0.4] },
      lines: [[0.4, 1.4, 'capricorn', 'all stations, | stand by.'], [2.0, 1.4, 'capricorn', 'possible | match.']] },
    { dur: 3.6, set: (x, t) => missionControl(x, t, () => loopMap(x, 540, 610, 1, t, { dots: [[...HEIGHTS, '#f2b544', 'HEIGHTS'], [...KATY, '#5ec8ff', 'KATY']], route: [KATY, HEIGHTS] })),
      cast: { virgo: [[0, 300, 1250, 210]], gemini: [[0, 780, 1250, 210]] }, mood: { virgo: 'squint', gemini: 'wide' },
      lines: [[0.3, 1.4, 'virgo', 'distance: | Katy.'], [1.9, 1.5, 'gemini', "that's | long distance."]] },
    { dur: 3.6, set: (x, t, lt) => missionControl(x, t, (cx, cy) => { for (const [dx, col] of [[-170, '#f2b544'], [170, '#5ec8ff']]) { x.strokeStyle = col; x.lineWidth = 6; x.beginPath(); x.arc(cx + dx * (1 - 0.4 * clamp(lt / 2)), cy, 150, 0, Math.PI * 2); x.stroke() } if (lt > 2) sparkles(x, t, cx, cy, 2 + (t - lt), 12, 200, 3) }),
      cast: { virgo: [[0, 300, 1250, 210]] }, mood: { virgo: lt => lt > 2 ? 'heart' : 'squint' },
      lines: [[0.3, 1.5, 'virgo', 'running | the charts...'], [2.1, 1.3, 'virgo', 'ALIGNED.']], stick: [[2.0, 1.4, 'CHARTS: ALIGNED', GOLD]] },
    { dur: 4.2, set: (x, t) => missionControl(x, t, (cx, cy) => big(x, 'GO / NO GO?', cy, BONE, 90)),
      cast: { capricorn: [[0, 540, 1100, 200]], aries: [[0, 160, 1330, 150]], leo: [[0, 400, 1330, 150]], pisces: [[0, 680, 1330, 150]], libra: [[0, 920, 1330, 150]] },
      mood: { capricorn: 'squint', aries: 'squint', leo: 'sparkle', pisces: 'heart', libra: 'wide' },
      lines: [[0.2, 1.0, 'capricorn', 'go / no go?'], [1.2, 0.7, 'aries', 'GO!'], [1.9, 0.7, 'leo', 'GO.'], [2.6, 0.8, 'pisces', 'go *sniff*'], [3.4, 0.8, 'libra', 'go? | ...go.']] },
    { dur: 3.6, set: (x, t) => missionControl(x, t, (cx, cy) => { loopMap(x, cx, cy, 1, t, { dots: [[...KATY, '#5ec8ff', 'CANCER']] }); x.fillStyle = 'rgba(255,58,78,0.35)'; x.fillRect(cx - 450, cy - 20, 900, 40); txt(x, 'TRAFFIC ON I-10', cx, cy - 60, { size: 40, col: BRAKE, font: MONO, weight: 700 }) }),
      cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: 'wide' },
      lines: [[0.3, 1.4, 'scorpio', 'we have | a problem.'], [1.9, 1.4, 'scorpio', 'the Katy | Freeway.']], stick: [[0.2, 1.0, 'ALERT', BRAKE]] },
    { dur: 3.6, set: (x, t) => missionControl(x, t, (cx, cy) => loopMap(x, cx, cy, 1, t, { dots: [[...HEIGHTS, '#f2b544'], [...KATY, '#5ec8ff'], [...PARTY, GOLD, 'BETA PARTY · JAN 9']], route: [KATY, PARTY] })),
      cast: { aquarius: [[0, 540, 1250, 230]] }, mood: { aquarius: 'sparkle' },
      lines: [[0.3, 1.5, 'aquarius', 'new trajectory:'], [1.9, 1.5, 'aquarius', 'meet at | the party.']] },
    { dur: 4.4, set: (x, t, lt) => { missionControl(x, t, (cx, cy) => { const n = 3 - Math.floor(lt / 0.8); big(x, n > 0 ? String(n) : 'LIFTOFF', cy, n > 0 ? BONE : GOLD, n > 0 ? 220 : 110) }); if (lt > 2.4) sparkles(x, t, 540, 900, 2.4 + (t - lt), 16, 420, 7) },
      cast: { taurus: [[0, 400, 1250, 200], [2.4, 400, 1250, 200], [4.2, 470, -200, 200]], cancer: [[0, 680, 1250, 200], [2.4, 680, 1250, 200], [4.2, 610, -200, 200]] }, mood: { taurus: 'heart', cancer: 'heart' },
      lines: [[2.5, 1.2, 'cancer', 'liftoff!']], stick: [[0.1, 2.3, 'T-MINUS JAN 9', GOLD]] },
    { dur: 3.4, set: (x, t, lt) => { missionControl(x, t, (cx, cy) => big(x, 'MATCH', cy, GOLD, 150)); sparkles(x, t, 540, 610, t - lt, 16, 400, 2) },
      cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'happy' }, hops: { capricorn: [0.2, 0.8, 1.4] },
      lines: [[0.4, 2.4, 'capricorn', 'Houston, | we have a match.']] },
  ],
}

// ── hst008 · Rare footage: a Katy cousin crossing the Loop (nature doc)
const doc = {
  hook: 'Rare footage: | a Katy cousin | crossing the Loop', badge: BADGE, cues: STING, endLen: 6.2,
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Worth the migration. Jan 9.', stars: ['cancer', 'taurus', 'scorpio', 'pisces'] }),
  scenes: [
    { dur: 4.0, set: (x, t, lt) => { outside(x, { ground: '#2f3a28' }); houses(x, FLOOR + 60, t) }, front: (x, t, lt) => { lowerThird(x, 'THE KATY COUSIN', 'Cousinus katyensis', Kp(lt, 0.4)); narr(x, lt, 'At dawn, the Katy cousin | prepares for the long journey east.', 1.6) },
      cast: { cancer: [[0, 540, Y - 60, 250]] }, mood: { cancer: lt => lt < 1 ? 'sleepy' : 'happy' }, hops: { cancer: [0.05, 1.0] } },
    { dur: 4.0, set: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.6 }); freeway(x, FLOOR - 160, 600, 5, t * 300) }, front: (x, t, lt) => { car(x, 540, FLOOR + 120, '#5ec8ff', { open: true }); narr(x, lt, 'The Katy Freeway. | It is very, very wide.', 0.3) },
      cast: { cancer: [[0, 520, FLOOR + 5, 190]] }, mood: { cancer: 'neutral' },
      lines: [[2.4, 1.4, 'cancer', 'still | on I-10.']] },
    { dur: 3.8, set: (x, t, lt) => { skyline(x, FLOOR - 150, t, { alpha: 0.7 }); freeway(x, FLOOR - 160, 600, 3, t * 300); overheadSign(x, 540, 820, 'BELTWAY 8', 'INSIDE: HOUSTON?', Kp(lt, 0.1)) },
      front: (x, t, lt) => { car(x, 540, FLOOR + 120, '#5ec8ff', { open: true }); narr(x, lt, 'Few make it past the Beltway.', 0.3, 1.6) },
      cast: { cancer: [[0, 520, FLOOR + 5, 190]] }, mood: { cancer: 'wide' },
      lines: [[2.2, 1.5, 'cancer', 'is this | still Houston?']] },
    { dur: 4.0, set: (x, t) => { mural(x, t); outside(x, { ground: '#2a2440' }) }, front: (x, t, lt) => { lowerThird(x, 'A MONTROSE LOCAL', 'Scorpius insiderloopus', Kp(lt, 0.2)); narr(x, lt, 'The locals are wary of outsiders.', 1.4, 1.2) },
      cast: { scorpio: [[0, 760, Y, 250]], cancer: [[0, 300, Y, 220]] }, mood: { scorpio: 'squint', cancer: 'wide' },
      lines: [[2.7, 1.3, 'scorpio', "where'd you go | to high school?"]] },
    { dur: 3.8, set: (x, t) => night(x, t), front: (x, t, lt) => { car(x, 540 + 300 * Math.sin(lt * 2.2), FLOOR + 120, '#5ec8ff', { open: true }); narr(x, lt, 'Parking. | The final predator.', 0.2, 2.0) },
      cast: { cancer: [[0, 540, FLOOR + 5, 190]] }, mood: { cancer: 'eyeroll' },
      lines: [[2.3, 1.4, 'cancer', 'third | lap.']] },
    { dur: 3.6, set: (x, t) => night(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); sweat(x, cx + s * 0.3, cy - s * 0.3, t, 4); narr(x, lt, 'The humidity tests | even the strongest.', 0.2) },
      cast: { cancer: [[0, 540, Y, 260]] }, mood: { cancer: 'wide' }, lines: [[2.2, 1.2, 'cancer', '...soup.']] },
    { dur: 4.6, set: (x, t, lt) => { night(x, t); for (let k = 0; k < 18; k++) { const ph = (t * 0.3 + k / 18) % 1; x.fillStyle = [GOLD, PINK, '#8fe3ff'][k % 3]; x.fillRect(80 + (k * 113) % 920, 520 + ph * 700, 14, 22) } label(x, 540, 640, 'BETA PARTY · JAN 9', Kp(lt, 0.1), { size: 46, bg: GOLD, rot: -0.03 }) },
      front: (x, t, lt) => narr(x, lt, 'And at last… a match. | Inside the Loop.', 2.6),
      cast: { cancer: [[0, 300, Y, 240], [1.0, 420, Y, 240]], taurus: [[0, 800, Y, 240], [1.0, 680, Y, 240]] }, mood: { cancer: 'heart', taurus: 'heart' },
      lines: [[0.9, 1.3, 'taurus', 'you came | all this way?'], [2.3, 1.2, 'cancer', 'my cousin | drove me.']] },
  ],
}

// ── hst009 · Leo spent all year on this trunk for ONE message (slab culture, a celebration)
const slabEp = {
  hook: 'Leo spent all year | on this trunk… | for ONE message', badge: BADGE, cues: STING, endLen: 6.2,
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Pop the trunk. Jan 9.', stars: ['leo', 'virgo', 'aquarius', 'pisces'] }),
  scenes: [
    { dur: 3.4, set: (x, t) => garage(x), front: (x, t) => slab(x, 540, 1180, t, { paint: 0.15, col: '#6a6a7a' }),
      cast: { leo: [[0, 540, 900, 230]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05, 0.5] },
      lines: [[0.5, 2.4, 'leo', 'this year, | the trunk speaks.']] },
    { dur: 3.6, set: (x, t) => garage(x), front: (x, t, lt) => { slab(x, 540, 1180, t, { paint: clamp(lt / 2.5), col: '#b0306a' }); for (let k = 0; k < 20; k++) { const ph = (t * 2 + k / 20) % 1; x.fillStyle = `rgba(255,120,180,${(0.6 * (1 - ph)).toFixed(2)})`; x.fillRect(200 + ph * 260 + (k * 37) % 300, 980 + (k * 53) % 160, 10, 10) } },
      cast: { leo: [[0, 200, 900, 200]] }, mood: { leo: 'squint' },
      lines: [[0.3, 1.5, 'leo', 'candy paint. | coat one.'], [2.0, 1.4, 'leo', '...of fourteen.']], stick: [[2.2, 1.2, 'COAT 14', PINK]] },
    { dur: 3.4, set: (x, t) => garage(x), front: (x, t) => slab(x, 540, 1180, t, { paint: 1, col: '#b0306a' }),
      cast: { virgo: [[0, 880, 900, 200]] }, mood: { virgo: 'squint' }, hops: { virgo: [0.3, 0.9, 1.5, 2.1] },
      lines: [[0.3, 2.6, 'virgo', 'wax on. | I can see my future.']] },
    { dur: 3.4, set: (x, t) => garage(x), front: (x, t) => slab(x, 540, 1180, t, { paint: 1, col: '#b0306a', col2: '#5ec8ff' }),
      cast: { gemini: [[0, 200, 900, 200]] }, mood: { gemini: 'sparkle' },
      lines: [[0.3, 2.5, 'gemini', 'two-tone. | obviously.']] },
    { dur: 3.6, set: (x, t) => garage(x), front: (x, t, lt) => slab(x, 540, 1180, t, { paint: 1, col: '#b0306a', col2: '#5ec8ff', elbows: clamp(lt / 1.2) }),
      cast: { sagittarius: [[0, 880, 900, 200]] }, mood: { sagittarius: 'wide' },
      lines: [[1.3, 2.1, 'sagittarius', 'the swangas | are SWANGIN.']] },
    { dur: 3.4, set: (x, t) => garage(x), front: (x, t, lt) => slab(x, 540, 1180, t, { paint: 1, col: '#b0306a', col2: '#5ec8ff', elbows: 1, glow: clamp(lt / 0.8) }),
      cast: { aquarius: [[0, 200, 900, 200]] }, mood: { aquarius: 'sparkle' },
      lines: [[0.4, 2.4, 'aquarius', 'neon underglow. | you\'re welcome.']] },
    { dur: 4.4, title: 'SUNDAY · THE CRUISE', set: (x, t) => night(x, t), front: (x, t, lt) => slab(x, -300 + clamp(lt / 3) * 840, 1180, t, { paint: 1, col: '#b0306a', col2: '#5ec8ff', elbows: 1, glow: 1, s: 0.9 }),
      cast: { pisces: [[0, 200, 760, 180]], cancer: [[0, 520, 760, 180]], taurus: [[0, 860, 760, 180]] }, mood: { pisces: 'heart', cancer: 'wide', taurus: 'wide' },
      lines: [[2.4, 1.6, 'pisces', "it's so | shiny."]] },
    { dur: 4.8, set: (x, t, lt) => { night(x, t); if (lt > 1.2) sparkles(x, t, 330, 900, 1.2 + (t - lt), 16, 380, 4) }, front: (x, t, lt) => slab(x, 600, 1180, t, { paint: 1, col: '#b0306a', col2: '#5ec8ff', elbows: 1, glow: 1, trunk: clamp((lt - 0.6) / 0.8), s: 0.9 }),
      cast: { leo: [[0, 880, 940, 200]] }, mood: { leo: lt => lt > 1.4 ? 'heart' : 'squint' },
      lines: [[0.2, 1.0, 'leo', 'and now…'], [3.0, 1.6, 'leo', 'the message.']], stick: [[1.2, 1.6, 'POP THE TRUNK', GOLD]] },
  ],
}

// ── hst010 · He lives in Katy. I live in Montrose. We tried. (long distance)
const ld = (() => {
  const split = (x, t) => { x.fillStyle = '#2a2140'; x.fillRect(0, 0, 540, 1920); x.fillStyle = '#20304a'; x.fillRect(540, 0, 540, 1920); x.fillStyle = INK; x.fillRect(532, 0, 16, 1920); txt(x, 'MONTROSE', 270, 820, { size: 44, col: PINK, font: MONO, weight: 700 }); txt(x, 'KATY', 810, 820, { size: 44, col: '#8fe3ff', font: MONO, weight: 700 }) }
  return {
    hook: 'He lives in Katy. | I live in Montrose. | We tried.', badge: BADGE, cues: STING, endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Same place. Same night. Jan 9.', stars: ['scorpio', 'sagittarius', 'gemini', 'libra'] }),
    scenes: [
      { dur: 3.8, set: (x, t) => split(x, t), cast: { scorpio: [[0, 270, 1150, 230]], sagittarius: [[0, 810, 1150, 230]] }, mood: { scorpio: 'heart', sagittarius: 'heart' }, hops: { scorpio: [0.05], sagittarius: [0.15] },
        lines: [[0.4, 1.4, 'sagittarius', 'dinner | this week?'], [2.0, 1.5, 'scorpio', 'meet | halfway?']] },
      { dur: 4.0, set: (x, t) => missionControl(x, t, (cx, cy) => loopMap(x, cx, cy, 1, t, { dots: [[620, 590, PINK, 'MONTROSE'], [270, 640, '#8fe3ff', 'KATY'], [440, 615, GOLD, 'HALFWAY: A FEEDER ROAD']], route: [[270, 640], [620, 590]] })),
        cast: { virgo: [[0, 540, 1250, 220]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 1.6, 'virgo', 'halfway is… | a feeder road.'], [2.2, 1.5, 'virgo', 'by a | coffee shop.']], stick: [[0.1, 1.2, 'ATTEMPT 1', BONE]] },
      { dur: 4.0, set: (x, t) => { night(x, t); streetSign(x, 760, 760, 'WESTHEIMER', { k: 1 }) }, front: (x, t, lt) => { car(x, 340, FLOOR + 120 - Math.abs(Math.sin(lt * 9)) * 30, '#ff8fb1', { open: true }) },
        cast: { scorpio: [[0, 320, FLOOR + 5 - 0, 190]] }, mood: { scorpio: 'wide' },
        lines: [[0.3, 1.4, 'scorpio', 'the bumps. | THE BUMPS.'], [2.1, 1.5, 'scorpio', "I'll be | 30 late."]], stick: [[0.1, 1.2, 'ATTEMPT 1', BONE]] },
      { dur: 4.0, set: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.7 }); freeway(x, FLOOR - 160, 600, 3, t * 400); overheadSign(x, 540, 820, 'TEXAS U-TURN', 'NEXT LEFT', 1) },
        front: (x, t, lt) => car(x, 540, FLOOR + 120, '#5ec8ff', { open: true, flip: lt > 1.6 }),
        cast: { sagittarius: [[0, 520, FLOOR + 5, 190]] }, mood: { sagittarius: lt => lt > 1.6 ? 'wide' : 'sparkle' },
        lines: [[0.3, 1.2, 'sagittarius', 'U-turn!'], [2.0, 1.6, 'sagittarius', 'wrong… | direction.']], stick: [[0.1, 1.2, 'ATTEMPT 2', BONE]] },
      { dur: 4.2, set: (x, t) => { night(x, t); coffeeShop(x, 540, FLOOR + 60, true) },
        cast: { scorpio: [[0, 200, Y, 220]], sagittarius: [[0, 880, Y, 220]] }, mood: { scorpio: 'wide', sagittarius: 'wide' },
        lines: [[0.5, 1.4, 'sagittarius', "we're | BOTH here!"], [2.1, 1.6, 'scorpio', "it's | closed."]], stick: [[0.1, 1.2, 'ATTEMPT 3', BONE]] },
      { dur: 3.8, set: (x, t) => split(x, t), cast: { scorpio: [[0, 270, 1150, 230]], sagittarius: [[0, 810, 1150, 230]] }, mood: { scorpio: 'neutral', sagittarius: 'neutral' },
        lines: [[0.3, 1.5, 'scorpio', 'is this | worth it?'], [2.0, 1.5, 'sagittarius', '...the beta | party?']] },
      { dur: 4.6, set: (x, t, lt) => { night(x, t); label(x, 540, 640, 'BETA PARTY · JAN 9', Kp(lt, 0.1), { size: 46, bg: GOLD, rot: -0.03 }); if (lt > 1.6) sparkles(x, t, 540, 1000, 1.6 + (t - lt), 14, 300, 8) },
        cast: { scorpio: [[0, 150, Y, 230], [1.4, 430, Y, 230]], sagittarius: [[0, 930, Y, 230], [1.4, 650, Y, 230]] }, mood: { scorpio: 'heart', sagittarius: 'heart' },
        lines: [[1.6, 1.4, 'sagittarius', 'same place.'], [3.0, 1.4, 'scorpio', 'same night.']] },
    ],
  }
})()

export const HST3 = { hst007: mission, hst008: doc, hst009: slabEp, hst010: ld }
