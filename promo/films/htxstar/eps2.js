// Houston Star Talk: the story episodes (crazy hooks, full little plots). See promo/films/HOUSTON-STARTALK.md.
// hst004: the 610 time loop · hst005: BREAKING: 55° in Houston (news parody) · hst006: the kolache trial (courtroom)
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside } from '../starrace/ep.js'
import { label, sparkles, pop01, GOLD, BONE, PINK, INK, MONO, SIGN_IDS } from '../signs3kit.js'
import { cones, skyline, car, freeway, sweat, partyCard, taco, BRAKE, overheadSign, calendar, cobweb, newsDesk, liveBug, chyron, puffer, phoneFlash, soupPot, plantBlanket, courtroom, gavel, kolache, klobasnek } from './kit.js'

const Y = 1255
const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))

// ── hst004 · the 610 time loop
const loop = (() => {
  const lane = FLOOR + 120
  const road = (x, t, lt, { year, flip = 0, web = 0, sign = 'WESTHEIMER', signK = 1, sunset = 0 } = {}) => {
    skyline(x, FLOOR - 150, t, { alpha: 0.8 }); freeway(x, FLOOR - 160, 600, 3, t * 900)
    overheadSign(x, 540, 830, sign === 'PARTY' ? 'BETA PARTY' : `EXIT  ${sign}`, sign === 'PARTY' ? 'EXIT  JAN 9' : '610 LOOP', signK, { gold: sign === 'PARTY' })
    if (year) calendar(x, 160, 1040, 'YEAR', year, 1, flip)
  }
  const leoCar = (x, t, lt, P, web = 0) => { const [cx] = P.at('leo'); car(x, cx, lane, '#e0a030', { open: true }); if (web > 0) cobweb(x, cx - 120, lane - 40, 0.8, web) }
  return {
    hook: 'I got on the 610 | in 2019. | Still on it.', badge: BADGE, cues: STING, endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Take the exit. Jan 9.', stars: ['leo', 'taurus', 'gemini', 'virgo'] }),
    scenes: [
      { dur: 2.8, set: (x, t, lt) => road(x, t, lt, { year: '2019' }), front: (x, t, lt, P) => leoCar(x, t, lt, P),
        cast: { leo: [[0, 380, lane - 115, 190]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05, 0.6] },
        lines: [[0.5, 2.0, 'leo', 'quick drive. | 20 minutes.']] },
      { dur: 3.0, set: (x, t, lt) => road(x, t, lt, { year: lt < 1.5 ? '2019' : '2020', flip: prog(lt, 1.3, 1.7) }), front: (x, t, lt, P) => leoCar(x, t, lt, P),
        cast: { leo: [[0, 380, lane - 115, 190]] }, mood: { leo: lt => lt > 1 ? 'wide' : 'happy' }, look: { leo: [1, -1] },
        lines: [[0.3, 1.2, 'leo', 'wait, | that was it?'], [1.7, 1.2, 'leo', "I'll loop | around."]] },
      { dur: 3.0, set: (x, t, lt) => road(x, t, lt, { year: String(2021 + Math.min(3, Math.floor(lt * 1.6))), flip: (lt * 1.6) % 1 }), front: (x, t, lt, P) => leoCar(x, t, lt, P, clamp(lt / 2)),
        cast: { leo: [[0, 380, lane - 115, 190]] }, mood: { leo: 'sleepy' },
        lines: [[0.4, 1.4, 'leo', 'there it | is again.'], [2.0, 0.9, 'leo', 'missed it.']], stick: [[1.2, 1.4, 'LAP 1,000.', GOLD]] },
      { dur: 3.2, set: (x, t, lt) => { road(x, t, lt, { year: '2022' }); cones(x, FLOOR + 470, 6, t) }, front: (x, t, lt, P) => leoCar(x, t, lt, P, 1),
        cast: { leo: [[0, 380, lane - 115, 190]] }, mood: { leo: 'eyeroll' },
        lines: [[0.3, 2.5, 'leo', "they're widening it. | again."]], stick: [[0.2, 1.3, 'CONSTRUCTION: STILL', '#ff7a2a']] },
      { dur: 3.2, set: (x, t, lt) => road(x, t, lt, { year: '2023' }), front: (x, t, lt, P) => leoCar(x, t, lt, P, 1),
        cast: { leo: [[0, 380, lane - 115, 190]], gemini: [[0, -200, lane - 330, 150], [3.0, 1300, lane - 330, 150]] }, mood: { leo: 'neutral', gemini: 'sparkle' },
        lines: [[1.0, 1.2, 'gemini', 'hi again!'], [2.2, 0.9, 'leo', 'every | lap.']] },
      { dur: 3.2, set: (x, t, lt) => road(x, t, lt, { year: '2024' }), front: (x, t, lt, P) => { leoCar(x, t, lt, P, 1); if (lt < 1.6) puffer(x, P, 'leo') },
        cast: { leo: [[0, 380, lane - 115, 190]] }, mood: { leo: lt => lt < 1.6 ? 'squint' : 'wide' },
        lines: [[0.2, 1.3, 'leo', "it's 55! | coat!"], [1.7, 1.3, 'leo', "...it's 80."]], stick: [[0.1, 1.4, 'THE ONE COLD DAY', '#8fe3ff']] },
      { dur: 3.0, set: (x, t, lt) => road(x, t, lt, { year: '2025' }), front: (x, t, lt, P) => { leoCar(x, t, lt, P, 1); const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.3, cy - s * 0.3, t) },
        cast: { leo: [[0, 380, lane - 115, 190]] }, mood: { leo: 'wide' },
        lines: [[0.3, 2.4, 'leo', "it's been summer | the whole time."]], stick: [[0.2, 1.1, 'SEASON: SUMMER', BRAKE], [1.4, 1.4, 'SEASON: STILL SUMMER', BRAKE]] },
      { dur: 3.4, set: (x, t, lt) => { road(x, t, lt, { year: '2026' }); box(x, 0, FLOOR + 460, 1080, 60, '#3a3450', 0); txt(x, 'FEEDER ROAD', 820, FLOOR + 490, { size: 28, col: BONE, font: MONO, weight: 700 }) },
        front: (x, t, lt, P) => { leoCar(x, t, lt, P, 1); const [tx, ty, ts] = P.at('taurus'); taco(x, tx + ts * 0.45, ty + 20, 0.8) },
        cast: { leo: [[0, 380, lane - 115, 190]], taurus: [[0, 1250, FLOOR + 400, 150], [1.0, 820, FLOOR + 400, 150]] }, mood: { leo: 'wide', taurus: 'happy' },
        lines: [[1.1, 1.3, 'taurus', 'take the | feeder, babe.'], [2.4, 1.0, 'leo', "I can't | leave."]] },
      { dur: 4.2, set: (x, t, lt) => road(x, t, lt, { year: 'JAN 9', sign: 'PARTY', signK: Kp(lt, 0.2, 0.45) }),
        back: (x, t, lt) => { if (lt > 0.6) sparkles(x, t, 540, 830, 0.6 + (t - lt), 14, 380, 5) },
        front: (x, t, lt, P) => leoCar(x, t, lt, P, clamp(1 - (lt - 1.6) * 2)),
        cast: { leo: [[0, 380, lane - 115, 190], [2.4, 380, lane - 115, 190], [3.6, 1250, lane - 260, 190]] }, mood: { leo: lt => lt > 1 ? 'heart' : 'wide' }, look: { leo: [0.4, -1] },
        lines: [[0.6, 1.1, 'leo', '...a GOLD | exit?'], [1.8, 1.4, 'leo', 'finally. one | worth taking.']] },
    ],
  }
})()

// ── hst005 · BREAKING: 55° in Houston (news parody)
const news = (() => {
  const TICK = 'STARS ADVISED TO REMAIN CALM  ·  SOUP SUPPLIES LOW  ·  PUFFER COATS SPOTTED IN MIDTOWN  ·  PLANTS BEING TUCKED IN  ·  '
  const desk = (x, t, lt, head = 'BREAKING: 55° IN HOUSTON') => { newsDesk(x, t); liveBug(x, t); chyron(x, t, head, TICK, 1) }
  const street = (x, t, lt, head) => { skyline(x, FLOOR + 60, t, { alpha: 0.9, lit: '#bfe6ff' }); outside(x, { ground: '#2a2e48' }); liveBug(x, t); chyron(x, t, head, TICK, 1) }
  return {
    hook: 'BREAKING: Houston | hits 55 degrees', badge: { ...BADGE, y: 360, x: 860 }, cues: STING, endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Dress for both. Jan 9.', stars: ['capricorn', 'leo', 'cancer', 'virgo'] }),
    scenes: [
      { dur: 2.8, set: (x, t, lt) => desk(x, t, lt), cast: { capricorn: [[0, 540, 1080, 260]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05] },
        lines: [[0.6, 1.9, 'capricorn', 'this is | not a drill.']] },
      { dur: 3.0, set: (x, t, lt) => street(x, t, lt, 'LIVE: MIDTOWN, 55°'), front: (x, t, lt, P) => puffer(x, P, 'leo'),
        cast: { leo: [[0, 540, Y - 60, 280]] }, mood: { leo: 'squint' }, hops: { leo: [0.1, 0.5, 0.9] },
        lines: [[0.3, 2.4, 'leo', "I'm wearing | everything I own."]] },
      { dur: 3.6, set: (x, t, lt) => { desk(x, t, lt, 'FORECAST: COLD UNTIL THURSDAY'); box(x, 150, 420, 780, 520, '#0f3a5a', 8); for (let k = 0; k < 3; k++) { const r = 80 + k * 70; x.strokeStyle = 'rgba(242,199,92,0.7)'; x.lineWidth = 5; x.beginPath(); x.ellipse(540, 680, r * 1.8, r, 0, 0, Math.PI * 2); x.stroke() } const fx = 150 + clamp(lt / 2.5) * 640; for (let k = 0; k < 5; k++) { x.fillStyle = '#5ec8ff'; x.beginPath(); x.moveTo(fx, 450 + k * 100); x.lineTo(fx + 40, 470 + k * 100); x.lineTo(fx, 490 + k * 100); x.fill() } txt(x, 'COLD FRONT', 540, 470, { size: 40, col: '#8fe3ff', font: MONO, weight: 700 }) },
        cast: { virgo: [[0, 820, 1090, 220]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 1.5, 'virgo', 'the front arrives | at 2:14 PM.'], [2.0, 1.5, 'virgo', 'leaves | Thursday.']] },
      { dur: 3.0, set: (x, t, lt) => street(x, t, lt, 'LIVE: BUFFALO BAYOU, 55°'),
        cast: { aries: [[0, -200, Y, 240], [1.2, 1300, Y, 240]] }, mood: { aries: 'squint' },
        lines: [[0.4, 1.5, 'aries', 'running | in shorts.']] },
      { dur: 3.0, set: (x, t, lt) => street(x, t, lt, 'LIVE: BELLAIRE BLVD, 55°'), front: (x, t) => soupPot(x, 760, 1180, t),
        cast: { pisces: [[0, 330, Y, 250]] }, mood: { pisces: 'heart' },
        lines: [[0.3, 2.3, 'pisces', 'pho weather. | finally.']] },
      { dur: 3.0, set: (x, t, lt) => { street(x, t, lt, 'THE PLANTS ARE BEING TUCKED IN'); plantBlanket(x, 760, FLOOR + 60) },
        cast: { cancer: [[0, 330, Y, 260]] }, mood: { cancer: 'wide' },
        lines: [[0.3, 2.3, 'cancer', 'the plants | need blankets.']] },
      { dur: 3.0, set: (x, t, lt) => street(x, t, lt, 'CAR THERMOMETER PHOTOS: UP'), front: (x, t, lt) => phoneFlash(x, 760, 980, t, '55°', lt),
        cast: { gemini: [[0, 360, Y, 260]] }, mood: { gemini: 'sparkle' },
        lines: [[0.3, 2.3, 'gemini', 'posted the car | thermometer. twice.']] },
      { dur: 3.0, set: (x, t, lt) => street(x, t, lt, 'SOUP SUPPLIES LOW'), front: (x, t) => soupPot(x, 740, 1180, t),
        cast: { virgo: [[0, 340, Y, 260]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 2.3, 'virgo', 'soup for | the whole week.']] },
      { dur: 3.4, set: (x, t, lt) => desk(x, t, lt, lt < 0.5 ? 'BREAKING: 55° IN HOUSTON' : 'UPDATE: 81° BY 3PM'),
        front: (x, t, lt, P) => { if (lt > 0.6) { puffer(x, P, 'leo'); const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.25, cy - s * 0.35, t) } },
        cast: { capricorn: [[0, 540, 1080, 260], [0.5, 340, 1080, 240]], leo: [[0, 1250, 700, 180], [0.6, 820, 700, 180]] }, mood: { capricorn: 'wide', leo: 'squint' },
        lines: [[0.9, 2.1, 'leo', "I'm keeping | the coat on."]], stick: [[0.5, 1.2, 'UPDATE: 81°', BRAKE]] },
      { dur: 3.0, set: (x, t, lt) => desk(x, t, lt, 'NEXT: THE HOUSTON BETA PARTY, JAN 9'),
        cast: { capricorn: [[0, 540, 1080, 260]] }, mood: { capricorn: 'wink' },
        lines: [[0.3, 1.2, 'capricorn', 'whatever | the weather...'], [1.6, 1.3, 'capricorn', 'see you | Jan 9.']] },
    ],
  }
})()

// ── hst006 · Virgo took Houston to court over a kolache
const trial = (() => {
  const room = (x, t, lt, head = 'THE STARS v. THE KLOBASNEK') => { courtroom(x); txt(x, head, 540, 1420, { size: head.length > 24 ? 42 : 50, col: GOLD, font: MONO, weight: 700 }) }
  const judge = { capricorn: [[0, 540, 600, 220]] }
  return {
    hook: 'Virgo sued Houston | over a kolache', badge: BADGE, cues: [...STING, ['pluck', 26.15, 196, 0.05, 0.6, 0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Bring both kinds. Jan 9.', stars: ['virgo', 'taurus', 'gemini', 'pisces'] }),
    scenes: [
      { dur: 2.8, set: (x, t, lt) => room(x, t, lt), front: (x, t, lt, P) => { gavel(x, 700, 600, t, (t * 3) % 1); const [cx, cy, s] = P.at('virgo'); klobasnek(x, cx + s * 0.55, cy - 20, 1) },
        cast: { ...judge, virgo: [[0, 380, Y, 270]] }, mood: { capricorn: 'squint', virgo: 'squint' }, hops: { virgo: [0.05] },
        lines: [[0.6, 1.6, 'virgo', 'Your Honor.']] },
      { dur: 3.4, set: (x, t, lt) => room(x, t, lt), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('virgo'); if (lt < 1.7) klobasnek(x, cx + s * 0.55, cy - 20, 1.1); else kolache(x, cx + s * 0.55, cy - 20, 1.1) },
        cast: { ...judge, virgo: [[0, 380, Y, 270]] }, mood: { capricorn: 'neutral', virgo: 'squint' },
        lines: [[0.2, 1.4, 'virgo', 'THIS is a | klobasnek.'], [1.8, 1.5, 'virgo', 'THIS is | a kolache.']] },
      { dur: 3.4, set: (x, t, lt) => room(x, t, lt, 'WITNESS: TAURUS'), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('taurus'); klobasnek(x, cx + s * 0.55, cy - 10, 0.9) },
        cast: { ...judge, taurus: [[0, 700, Y, 260]] }, mood: { taurus: 'happy', capricorn: 'squint' },
        lines: [[0.2, 1.6, 'taurus', "I've called it | a kolache forever."], [1.9, 1.4, 'taurus', "and I'd | do it again."]], stick: [[2.0, 1.2, 'GASP.', PINK]] },
      { dur: 3.0, set: (x, t, lt) => room(x, t, lt, 'WITNESS: GEMINI'), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('gemini'); kolache(x, cx - s * 0.6, cy - 10, 0.8); klobasnek(x, cx + s * 0.6, cy - 10, 0.8) },
        cast: { ...judge, gemini: [[0, 540, Y, 250]] }, mood: { gemini: 'sparkle' },
        lines: [[0.3, 2.3, 'gemini', "it's both. | I'm both."]] },
      { dur: 3.2, set: (x, t, lt) => room(x, t, lt, 'FOR THE DEFENSE: SCORPIO'),
        cast: { ...judge, scorpio: [[0, 760, Y, 250]] }, mood: { scorpio: 'squint' },
        lines: [[0.3, 1.0, 'scorpio', 'objection.'], [1.5, 1.5, 'scorpio', "I'm | hungry."]] },
      { dur: 3.2, set: (x, t, lt) => room(x, t, lt, 'EXHIBIT B'), front: (x, t, lt) => { const k = Kp(lt, 0.2); if (k > 0) taco(x, 540, 1060, 1.8 * k) },
        cast: { ...judge, virgo: [[0, 260, Y, 220]] }, mood: { virgo: 'wide', capricorn: 'squint' },
        lines: [[0.6, 1.2, 'virgo', 'a breakfast | taco?'], [2.0, 1.1, 'capricorn', 'irrelevant. | delicious.']] },
      { dur: 3.2, set: (x, t, lt) => { room(x, t, lt, 'THE JURY'); box(x, 80, 1000, 920, 60, '#6b3b1f', 6) },
        cast: Object.fromEntries(['aries', 'leo', 'libra', 'sagittarius', 'aquarius'].map((id, i) => [id, [[0, 160 + i * 190, 940, 150]]])), mood: { aries: 'happy', leo: 'happy', libra: 'wide', sagittarius: 'happy', aquarius: 'wink' },
        lines: [[0.4, 1.2, 'libra', 'the jury | is eating...'], [1.9, 1.1, 'libra', '...the | evidence.']], stick: [[1.8, 1.2, 'ORDER!', BRAKE]] },
      { dur: 3.0, set: (x, t, lt) => room(x, t, lt, 'FROM THE GALLERY'),
        cast: { ...judge, pisces: [[0, 360, Y, 250]] }, mood: { pisces: 'heart' },
        lines: [[0.3, 2.3, 'pisces', "can't we all | just share?"]] },
      { dur: 3.6, set: (x, t, lt) => room(x, t, lt, 'THE VERDICT'), front: (x, t, lt) => { gavel(x, 700, 600, t, lt > 0.9 && lt < 1.3 ? 1 : 0); if (lt > 1.0) sparkles(x, t, 540, 620, 1.0 + (t - lt), 14, 300, 9) },
        cast: { ...judge, virgo: [[0, 300, Y, 220]], taurus: [[0, 780, Y, 220]] }, mood: { capricorn: lt => lt > 1 ? 'happy' : 'squint', virgo: 'wide', taurus: 'wide' },
        lines: [[1.1, 2.2, 'capricorn', "it's delicious. | case closed."]], stick: [[0.95, 1.0, 'BANG.', GOLD]] },
      { dur: 3.2, set: (x, t, lt) => room(x, t, lt, 'APPEAL: JAN 9'),
        cast: { ...judge, virgo: [[0, 360, Y, 250]] }, mood: { virgo: 'squint', capricorn: 'wink' },
        lines: [[0.2, 1.3, 'virgo', 'I will | appeal.'], [1.6, 1.5, 'capricorn', 'at the party. | bring both.']] },
    ],
  }
})()

export const HST2 = { hst004: loop, hst005: news, hst006: trial }
