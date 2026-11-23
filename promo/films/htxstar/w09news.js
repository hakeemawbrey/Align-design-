// Houston Star Talk · w09 · STAR NEWS parodies (hst211–hst223). Desk, LIVE tag, chyron, ticker, field reporters.
// Each episode is its own premise; all end on the party ticket (Jan 9 only: no venue, time, price or RSVP method).
import {
  BADGE, STING, Kp, fadeK, Y, PAL, studio, liveTag, chy, ots, repTag, mic, splitFrame, partyCard,
  bayou, street, strip, bungalow, park, bridge, bats, beach, tunnel, cafe, office, village, crawfishTable, crawfish, oakPollen, pollenCar, mosquito, sweatDrops, sweater, sunnies, readers, clipboard, phone,
  houMap, PL, wxIcon, tempTag, bigNum, meter, tree,
  box, txt, FLOOR, label, sparkles, hearts, pop01, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV, skyline, freeway, car, shield, streetSign, heatSun, HGREEN, BRAKE, clamp, ease, prog,
} from './w09.js'

const A = [540, 1080, 260]                       // the anchor behind the desk
const AL = [300, 1080, 240]                      // the anchor, left of an over-the-shoulder box
const OTS = [770, 800, 470, 400]
const desk = (o) => (x, t, lt) => { studio(x, t, o); liveTag(x, t); chy(x, t, typeof o.head === 'function' ? o.head(lt) : o.head, o.tick, o) }
const field = (bg, o) => (x, t, lt) => { bg(x, t, lt); liveTag(x, t, o.live || '● LIVE'); chy(x, t, typeof o.head === 'function' ? o.head(lt) : o.head, o.tick, o) }
const blinker = (x, t, cx, cy, on = true) => { if (on && (t * 2.4) % 1 < 0.5) { x.fillStyle = '#ffb02a'; x.fillRect(cx - 10, cy - 10, 20, 20); x.save(); x.globalAlpha = 0.4; x.beginPath(); x.arc(cx, cy, 34, 0, Math.PI * 2); x.fill(); x.restore() } }
const fwy = (x, t, sc = 1) => { skyline(x, 1010, t, { alpha: 0.85 }); freeway(x, 1000, 420, 2, t * 300 * sc) }

// ── hst211 · BREAKING: someone used a turn signal on 59
const signal = (() => {
  const pal = PAL.navy, tick = 'TURN SIGNAL SIGHTING CONFIRMED  ·  DRIVERS ADVISED TO WAVE BACK  ·  FEEDER ROADS REMAIN OPEN  ·  EXPERTS: "EVERY CAR HAS ONE"  ·  '
  const o = (head, kick = 'BREAKING') => ({ pal, tick, head, kick })
  const traffic = (x, t, lt, { blink = true } = {}) => { fwy(x, t, 0.2); shield(x, 900, 560, '59', 0.8); [[200, 1110, '#5ec8ff'], [620, 1110, '#e0a030', 1], [400, 1320, '#c96a8a'], [860, 1320, '#7ab07a']].forEach(([cx, cy, c, me]) => { car(x, cx, cy, c, { brake: me ? 0 : 1 }); if (me) blinker(x, t, cx + 110, cy - 22, blink) }) }
  return {
    hook: 'BREAKING: a turn | signal was used | on 59', badge: BADGE, cues: [...STING, ['bell', 1.0, 880, 0.02, 0.6, 0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Signal your intentions. Jan 9.', stars: ['libra', 'scorpio', 'capricorn', 'pisces'] }),
    scenes: [
      { dur: 3.0, set: desk(o('TURN SIGNAL SPOTTED ON 59')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#203a6a'; x.fillRect(cx - 300, cy - 300, 600, 600); shield(x, cx - 80, cy, '59', 1.2); blinker(x, t, cx + 120, cy, true); txt(x, '➜', cx + 120, cy + 90, { size: 60, col: '#ffb02a' }) }, { title: 'SW FREEWAY' }),
        cast: { capricorn: [[0, ...AL]] }, mood: { capricorn: 'wide' }, hops: { capricorn: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'capricorn', "if you're on 59 | right now: stay calm."]] },
      { dur: 3.2, set: field((x, t, lt) => traffic(x, t, lt), o('LIVE: SOUTHWEST FREEWAY')), front: (x, t, lt, P) => { mic(x, P, 'aries'); repTag(x, 'ARIES', 'ON THE SHOULDER', Kp(lt, 0.2)) },
        cast: { aries: [[0, 860, 860, 220]] }, mood: { aries: 'wide' }, hops: { aries: [0.2, 0.6, 1.0] },
        lines: [[0.4, 1.3, 'aries', 'it blinked. | THREE TIMES.'], [1.9, 1.2, 'aries', 'on purpose!']] },
      { dur: 3.0, set: field((x, t) => { street(x, t); streetSign(x, 760, 720, 'FEEDER RD', { k: 1 }) }, o('WITNESS: "I LET THEM IN"', 'LIVE')),
        cast: { taurus: [[0, 340, Y, 260]] }, mood: { taurus: 'sparkle' },
        lines: [[0.3, 2.4, 'taurus', "I let them in. | didn't know I could."]] },
      { dur: 3.0, set: field((x, t) => street(x, t), o('WITNESSES: EMOTIONAL', 'LIVE')),
        cast: { pisces: [[0, 540, Y, 270]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 1.2] },
        lines: [[0.3, 2.4, 'pisces', 'it was just so | considerate.']], stick: [[1.2, 1.6, 'PISCES: CRYING (HAPPY)', SKYB]] },
      { dur: 3.4, set: desk(o('EXPERT: EVERY CAR HAS ONE', 'ANALYSIS')), front: (x, t, lt, P) => clipboard(x, P, 'virgo', -1),
        back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#f4efe4'; x.fillRect(cx - 300, cy - 300, 600, 600); txt(x, 'THE LEVER', cx, cy - 130, { size: 40, font: MONO, weight: 700 }); box(x, cx - 140, cy - 40, 280, 30, '#8f96a0', 5); box(x, cx + 120, cy - 60, 50, 70, INK, 3); txt(x, '← left  right →', cx, cy + 70, { size: 34, font: MONO, weight: 700 }) }, { title: 'DIAGRAM' }),
        cast: { virgo: [[0, ...AL]] }, mood: { virgo: 'squint' },
        lines: [[0.2, 1.5, 'virgo', 'every car | has one.'], [1.8, 1.4, 'virgo', 'left of | the wheel.']] },
      { dur: 3.0, set: field((x, t) => { bungalow(x, t, { col: '#d0a060' }) }, o('MORE STARS COME FORWARD', 'LIVE')),
        cast: { gemini: [[0, 360, Y, 250]] }, mood: { gemini: lt => lt < 1.4 ? 'sparkle' : 'wide' },
        lines: [[0.3, 1.2, 'gemini', 'I used mine | once!'], [1.6, 1.2, 'gemini', '...by | accident.']] },
      { dur: 3.0, set: desk(o('THE DRIVER HAS BEEN FOUND', 'DEVELOPING')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#2a1d52'; x.fillRect(cx - 300, cy - 300, 600, 600); txt(x, '?', cx, cy, { size: 260, col: GOLD }) }, { title: 'WHO?' }),
        cast: { capricorn: [[0, ...AL]] }, mood: { capricorn: 'squint' },
        lines: [[0.3, 2.4, 'capricorn', "we found | the driver."]] },
      { dur: 3.4, set: field((x, t, lt) => traffic(x, t, lt), o('DRIVER: LIBRA', 'EXCLUSIVE')), front: (x, t, lt, P) => mic(x, P, 'aries', -1),
        cast: { libra: [[0, 330, 860, 240]], aries: [[0, 780, 860, 200]] }, mood: { libra: 'happy', aries: 'wide' },
        lines: [[0.3, 2.8, 'libra', 'I just wanted you to know | where I was going.']] },
      { dur: 3.4, set: field((x, t) => { street(x, t, { night: false }) }, o('THE CAR BEHIND: SCORPIO', 'UPDATE')),
        back: (x, t, lt) => { if (lt > 1.6) hearts(x, t, 540, 960, t - lt + 1.6, { n: 6, spread: 200 }) },
        cast: { scorpio: [[0, 760, Y, 250], [1.2, 640, Y, 250]], libra: [[0, 300, Y, 240], [1.2, 420, Y, 240]] }, mood: { scorpio: lt => lt < 1.4 ? 'squint' : 'heart', libra: 'heart' }, look: { libra: [1, 0], scorpio: [-1, 0] },
        lines: [[0.2, 1.9, 'scorpio', "nobody's ever | told me before."]] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'STAR NEWS')),
        cast: { capricorn: [[0, ...A]] }, mood: { capricorn: 'wink' },
        lines: [[0.2, 2.9, 'capricorn', 'in traffic and in love: | signal your intentions.']], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 3.0, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', 'NEXT')),
        cast: { capricorn: [[0, ...A]] }, mood: { capricorn: 'happy' }, hops: { capricorn: [1.6] },
        lines: [[0.3, 2.4, 'capricorn', 'blinker on. | see you Jan 9.']] },
    ],
  }
})()


// ── hst212 · We tracked your "20 minutes away"
const twenty = (() => {
  const pal = PAL.plum, tick = 'TRAFFIC ON 290: YES  ·  BELTWAY: ALSO YES  ·  "20 MINUTES" REMAINS A FEELING  ·  COFFEE REFILLS: ONGOING  ·  '
  const o = (head, clock, kick = 'TRACKING') => ({ pal, tick, head, kick, clock })
  const route = lt => { const p = clamp(lt) ; return [PL.cypress[0] + (PL.eado[0] - PL.cypress[0]) * p, PL.cypress[1] + (PL.eado[1] - PL.cypress[1]) * p] }
  const map = (x, t, p, k = 1) => { houMap(x, t, { cy: 830, places: [PL.cypress, PL.eado], title: 'STAR TRACKER' }); const [dx, dy] = route(p); x.setLineDash([16, 12]); x.strokeStyle = PINK; x.lineWidth = 6; x.beginPath(); x.moveTo(PL.cypress[0], PL.cypress[1]); x.lineTo(PL.eado[0], PL.eado[1]); x.stroke(); x.setLineDash([]); const q = 1 + 0.2 * Math.sin(t * 8); x.fillStyle = GOLD; x.beginPath(); x.arc(dx, dy, 22 * q, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 5; x.stroke() }
  const drive = (x, t, lt, P, extra) => { fwy(x, t, 1); extra?.(x, t, lt); const [cx] = P.at('sagittarius'); car(x, cx, 1200, '#7a3fb0', { open: true }) }
  const sag = cx => ({ sagittarius: [[0, cx, 1085, 190]] })
  const shop = (x, t) => cafe(x, t, { wall: '#b06a4a', sign: 'EADO COFFEE' })
  return {
    hook: "We tracked your | '20 minutes away'", badge: BADGE, cues: [...STING, ['bell', 30.6, 1046.5, 0.02, 1.2, 0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Leave 20 minutes early. Jan 9.', stars: ['sagittarius', 'libra', 'aquarius', 'taurus'] }),
    scenes: [
      { dur: 3.0, set: desk(o('LIVE TRACKER: "20 MINUTES AWAY"', 'MIN 0')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.save(); x.translate(cx, cy); x.scale(0.48, 0.55); x.translate(-540, -830); map(x, t, 0); x.restore() }, { title: 'CYPRESS → EADO' }),
        cast: { aquarius: [[0, ...AL]] }, mood: { aquarius: 'squint' }, hops: { aquarius: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'aquarius', "you said 20 minutes. | we checked."]] },
      { dur: 3.0, set: field(shop, o('EADO: THE DATE IS SEATED', 'MIN 5', 'LIVE')),
        cast: { libra: [[0, 360, Y, 250]] }, mood: { libra: 'happy' }, lines: [[0.3, 2.4, 'libra', 'they said | 20 minutes.']] },
      { dur: 3.0, set: (x, t, lt) => { liveTag(x, t); chy(x, t, '290 INBOUND', tick, o('', 'MIN 20')) }, back: (x, t, lt, P) => drive(x, t, lt, P, (x) => streetSign(x, 820, 560, 'CYPRESS', { k: 1, pole: false })),
        cast: sag(420), mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.3, 0.9, 1.5] },
        lines: [[0.3, 2.4, 'sagittarius', 'almost | there!']], stick: [[1.0, 1.8, 'LOCATION: STILL CYPRESS', GOLD]] },
      { dur: 3.2, set: (x, t, lt) => { x.fillStyle = pal.bg; x.fillRect(0, 0, 1080, 1920); map(x, t, 0.35 + 0.08 * lt / 3.2); liveTag(x, t); chy(x, t, 'TRACKER: ENTERING BELTWAY 8', tick, o('', 'MIN 32')) },
        cast: { aquarius: [[0, 170, 1290, 140]] }, mood: { aquarius: 'wide' }, lines: [[0.3, 2.6, 'aquarius', 'the Beltway | has entered the chat.']] },
      { dur: 3.0, set: (x, t, lt) => { liveTag(x, t); chy(x, t, 'EXIT CLOSED FOR CONSTRUCTION', tick, o('', 'MIN 41')) }, back: (x, t, lt, P) => drive(x, t, lt, P, (x) => { box(x, 300, 520, 520, 150, HGREEN, 7); txt(x, 'EXIT CLOSED', 560, 595, { size: 54, col: BONE }); for (let k = 0; k < 4; k++) { x.fillStyle = '#ff7a2a'; x.beginPath(); x.moveTo(620 + k * 110, 1150); x.lineTo(650 + k * 110, 1060); x.lineTo(680 + k * 110, 1150); x.fill() } }),
        cast: sag(380), mood: { sagittarius: 'wide' }, lines: [[0.3, 2.4, 'sagittarius', 'they moved | the exit?!']] },
      { dur: 3.0, set: (x, t, lt) => { liveTag(x, t); chy(x, t, 'TEXAS U-TURN IN PROGRESS', tick, o('', 'MIN 47')) }, back: (x, t, lt, P) => { street(x, t); box(x, 0, 1060, 1080, 300, '#2a2638', 0); txt(x, 'FEEDER ROAD', 840, 1090, { size: 30, col: BONE, font: MONO, weight: 700 }); x.strokeStyle = GOLD; x.lineWidth = 10; x.beginPath(); x.arc(540, 1200, 160, Math.PI * 0.1, Math.PI * 1.9); x.stroke(); const a = Math.PI * 0.1 + Math.PI * 1.8 * clamp(lt / 2.6); const [cx] = P.at('sagittarius'); car(x, 540 + Math.cos(a) * 160, 1200 + Math.sin(a) * 160 * 0.3, '#7a3fb0', { open: true, s: 0.7, flip: Math.sin(a) < 0 }) },
        cast: { sagittarius: [[0, 300, 880, 200]] }, mood: { sagittarius: 'sparkle' }, lines: [[0.3, 2.4, 'sagittarius', 'Texas U-turn. | love those.']] },
      { dur: 3.0, set: field(shop, o('REFILL NUMBER THREE', 'MIN 58', 'LIVE')),
        cast: { libra: [[0, 330, Y, 240]], taurus: [[0, 780, Y, 220]] }, mood: { libra: 'sleepy', taurus: 'happy' },
        lines: [[0.2, 1.3, 'taurus', 'pastry while | you wait?'], [1.6, 1.3, 'libra', 'two, | please.']] },
      { dur: 3.2, set: desk(o('ANALYSIS: WHAT IS 20 MINUTES?', 'MIN 63', 'ANALYSIS')), front: (x, t, lt, P) => clipboard(x, P, 'virgo', 1),
        cast: { aquarius: [[0, 300, 1080, 220]], virgo: [[0, 760, 1080, 220]] }, mood: { virgo: 'squint', aquarius: 'neutral' },
        lines: [[0.2, 2.8, 'virgo', 'in Houston, 20 minutes | is a feeling.']] },
      { dur: 3.4, set: field(shop, o('ARRIVAL CONFIRMED', 'MIN 70', 'UPDATE')),
        back: (x, t, lt) => { if (lt > 2.0) hearts(x, t, 540, 960, t - lt + 2.0, { n: 6, spread: 200 }) },
        cast: { libra: [[0, 330, Y, 240]], sagittarius: [[0, 1250, Y, 240], [0.6, 760, Y, 240]] }, mood: { libra: lt => lt > 1.9 ? 'heart' : 'happy', sagittarius: lt => lt > 1.9 ? 'heart' : 'wide' }, look: { libra: [1, 0], sagittarius: [-1, 0] },
        lines: [[0.6, 1.2, 'sagittarius', 'sorry! | traffic!'], [1.9, 1.4, 'libra', 'I just got | here too.']] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'MIN 71', 'STAR NEWS')),
        cast: { aquarius: [[0, ...A]] }, mood: { aquarius: 'wink' },
        lines: [[0.2, 2.9, 'aquarius', 'add 20 to your 20. | and text when you leave.']], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 2.8, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', null, 'NEXT')),
        cast: { aquarius: [[0, ...A]] }, mood: { aquarius: 'happy' }, hops: { aquarius: [1.4] },
        lines: [[0.3, 2.2, 'aquarius', "Jan 9. | we'll be tracking."]] },
    ],
  }
})()

// ── hst213 · LIVE: an open parking spot in Rice Village
const spot = (() => {
  const pal = PAL.teal, tick = 'SPOT REMAINS OPEN  ·  CIRCLING STARS: 14  ·  PARALLEL PARKING ATTEMPTS: ONGOING  ·  SNACKS BEING SHARED  ·  '
  const o = (head, kick = 'LIVE') => ({ pal, tick, head, kick })
  const cam = (x, t, lt, { taken = 0 } = {}) => {   // STAR CAM 2: the street from above
    x.fillStyle = '#3a3650'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#5a5a6a'; x.fillRect(0, 380, 1080, 200); x.fillRect(0, 1180, 1080, 200)
    for (let k = 0; k < 6; k++) { x.fillStyle = BONE; x.fillRect(k * 200 + 40, 870, 110, 12) }
    const cols = ['#c96a5a', '#5a9ac9', '#c9a65a', '#7ab07a', '#c96a8a', '#8a6ac9']
    for (let k = 0; k < 6; k++) { if (k === 3) continue; box(x, 30 + k * 175, 600, 140, 230, cols[k], 5); box(x, 50 + k * 175, 650, 100, 70, '#bfe6ff', 3) }
    for (let k = 0; k < 6; k++) box(x, 30 + k * 175, 940, 140, 230, cols[(k + 2) % 6], 5)
    if (!taken) { x.save(); x.shadowColor = GOLD; x.shadowBlur = 30 + 10 * Math.sin(t * 5); x.strokeStyle = GOLD; x.lineWidth = 8; x.strokeRect(555, 600, 140, 230); x.restore(); txt(x, 'OPEN', 625, 715, { size: 40, col: GOLD }) }
    else box(x, 555, 600, 140, 230, '#e0a030', 5)
    for (let k = 0; k < 4; k++) { const cx = ((lt * 220 + k * 270) % 1300) - 110; box(x, cx - 60, 880 + (k % 2) * 0, 120, 60, ['#ff8fb1', '#ffd36b', '#8fe3ff', '#7dffb0'][k], 4) }
    box(x, 40, 400, 220, 54, BRAKE, 4); txt(x, 'STAR CAM 2', 150, 428, { size: 28, col: BONE, font: MONO, weight: 700 })
  }
  return {
    hook: 'LIVE: an open | parking spot in | Rice Village', badge: BADGE, cues: [...STING, ['bell', 25.2, 1318.5, 0.02, 1.0, 0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Carpool. Jan 9.', stars: ['cancer', 'pisces', 'taurus', 'aries'] }),
    scenes: [
      { dur: 3.0, set: desk(o('OPEN SPOT: RICE VILLAGE', 'BREAKING')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.save(); x.translate(cx, cy); x.scale(0.5, 0.5); x.translate(-540, -800); cam(x, t, lt); x.restore() }, { title: 'THE VILLAGE' }),
        cast: { leo: [[0, ...AL]] }, mood: { leo: 'wide' }, hops: { leo: [0.05, 0.4] },
        lines: [[0.3, 2.5, 'leo', "if you're circling the | Village: we see you."]] },
      { dur: 3.0, set: field((x, t) => village(x, t), o('CIRCLING: 40 MINUTES')), back: (x, t, lt, P) => { const [cx] = P.at('taurus'); car(x, cx, 1260, '#e0a030', { open: true }) },
        cast: { taurus: [[0, -150, 1145, 180], [2.8, 1250, 1145, 180]] }, mood: { taurus: 'sleepy' },
        lines: [[0.6, 1.8, 'taurus', 'lap | eleven.']], stick: [[0.4, 1.6, 'TAURUS: CIRCLING', GOLD]] },
      { dur: 3.0, set: (x, t, lt) => { cam(x, t, lt); liveTag(x, t); chy(x, t, 'STAR CAM 2: THE SPOT', tick, o('')) },
        cast: { leo: [[0, 900, 1330, 140]] }, mood: { leo: 'squint' }, lines: [[0.3, 2.4, 'leo', 'it is still | open, folks.']] },
      { dur: 3.4, set: field((x, t) => village(x, t), o('PARALLEL PARKING ATTEMPT')), back: (x, t, lt, P) => { const w = Math.sin(lt * 4) * 60; car(x, 560 + w, 1260, '#ff5a6e', { brake: w < 0 ? 1 : 0 }) }, front: (x, t, lt, P) => clipboard(x, P, 'virgo', 1),
        cast: { aries: [[0, 560, 1140, 170]], virgo: [[0, 200, 980, 210]] }, mood: { aries: 'wide', virgo: 'squint' },
        lines: [[0.2, 1.4, 'virgo', 'cut left. | LEFT.'], [1.8, 1.3, 'aries', 'I AM | left!']] },
      { dur: 3.0, set: field((x, t) => village(x, t), o('CROWD: GROWING')),
        cast: { gemini: [[0, 330, Y, 230]], sagittarius: [[0, 760, Y, 230]] }, mood: { gemini: 'sparkle', sagittarius: 'wide' }, look: { gemini: [1, -0.5], sagittarius: [-1, -0.5] },
        lines: [[0.2, 1.3, 'gemini', 'better than | TV.'], [1.6, 1.2, 'sagittarius', 'anyone want | a snack?']] },
      { dur: 3.0, set: desk(o('THE SPOT: HOUR TWO', 'DEVELOPING')),
        cast: { leo: [[0, ...A]] }, mood: { leo: 'squint' }, lines: [[0.3, 2.4, 'leo', 'and then... | something happened.']] },
      { dur: 3.4, set: field((x, t) => village(x, t), o('A STAR GIVES UP THEIR SPOT', 'UPDATE')),
        cast: { cancer: [[0, 330, Y, 240]], pisces: [[0, 1250, Y, 230], [0.6, 780, Y, 230]] }, mood: { cancer: 'happy', pisces: 'heart' }, look: { cancer: [1, 0], pisces: [-1, 0] },
        lines: [[0.4, 1.3, 'cancer', 'take mine, | sweetie.'], [1.9, 1.4, 'pisces', 'nobody ever | does this.']], stick: [[2.0, 1.3, 'PISCES: CRYING (HAPPY)', SKYB]] },
      { dur: 3.0, set: (x, t, lt) => { cam(x, t, lt, { taken: lt > 1.2 }); liveTag(x, t); chy(x, t, 'THE SPOT HAS BEEN TAKEN', tick, o('', 'UPDATE')) },
        back: (x, t, lt) => { if (lt > 1.2) sparkles(x, t, 625, 715, t - lt + 1.2, 12, 200, 4) },
        cast: { taurus: [[0, 625, 1200, 180], [1.2, 625, 715, 160]] }, mood: { taurus: lt => lt > 1.2 ? 'heart' : 'wide' },
        lines: [[1.4, 1.5, 'taurus', "I'm never | leaving."]] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'STAR NEWS')),
        cast: { leo: [[0, ...A]] }, mood: { leo: 'wink' },
        lines: [[0.2, 2.9, 'leo', 'be the one | who says "take mine."']], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 2.8, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', 'NEXT')),
        cast: { leo: [[0, ...A]] }, mood: { leo: 'happy' }, hops: { leo: [1.4] }, lines: [[0.3, 2.2, 'leo', 'Jan 9. | carpool.']] },
    ],
  }
})()

// ── hst214 · Your crush might be a tunnel crush (the downtown tunnels)
const tunnels = (() => {
  const pal = PAL.wine, tick = 'TUNNELS: OPEN WEEKDAYS ONLY  ·  LUNCH LINE: LONG  ·  AIR CONDITIONING: EXCELLENT  ·  ABOVE-GROUND SIGHTINGS: RARE  ·  '
  const o = (head, kick = 'EXCLUSIVE') => ({ pal, tick, head, kick })
  const tun = (busy = 1) => field((x, t) => tunnel(x, t, { busy }), o(''))
  const T = (head, busy = 1, kick = 'LIVE') => (x, t, lt) => { tunnel(x, t, { busy }); liveTag(x, t); chy(x, t, head, tick, o('', kick)) }
  const walkers = { leo: [[0, -120, 1150, 130], [3.0, 1200, 1150, 130]], virgo: [[0, 1200, 1210, 130], [3.0, -120, 1210, 130]] }
  return {
    hook: 'Your crush might be | a tunnel crush', badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Meet above ground. Jan 9.', stars: ['cancer', 'aquarius', 'scorpio', 'sagittarius'] }),
    scenes: [
      { dur: 3.0, set: desk(o('EXCLUSIVE: A TUNNEL CRUSH')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.save(); x.translate(cx, cy); x.scale(0.5, 0.5); x.translate(-540, -800); tunnel(x, t); x.restore() }, { title: 'DOWNTOWN' }),
        cast: { sagittarius: [[0, ...AL]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'sagittarius', 'work downtown? | this is about you.']] },
      { dur: 3.0, set: T('LIVE: UNDER DOWNTOWN, 11:45'), front: (x, t, lt, P) => { mic(x, P, 'scorpio'); repTag(x, 'SCORPIO', 'UNDERGROUND', Kp(lt, 0.2)) },
        cast: { scorpio: [[0, 780, 980, 230]], ...walkers }, mood: { scorpio: 'squint', leo: 'happy', virgo: 'squint' },
        lines: [[0.4, 2.3, 'scorpio', '(whispering) | lunch rush.']] },
      { dur: 3.0, set: T('SUBJECT A: SAME TABLE DAILY'), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); box(x, cx + s * 0.3, cy, 110, 40, '#7dbf5a', 4) },
        cast: { cancer: [[0, 360, Y - 40, 250]] }, mood: { cancer: 'happy' }, lines: [[0.3, 2.4, 'cancer', 'same table. | every weekday.']] },
      { dur: 3.0, set: T('SUBJECT B: SAME COFFEE DAILY'), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aquarius'); box(x, cx + s * 0.32, cy - 10, 44, 60, BONE, 4) },
        cast: { aquarius: [[0, 720, Y - 40, 250]] }, mood: { aquarius: 'neutral' }, lines: [[0.3, 2.4, 'aquarius', 'we wave. | that is it.']] },
      { dur: 3.2, set: desk(o('ABOVE-GROUND SIGHTINGS: ZERO', 'DEVELOPING')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#8fd0ff'; x.fillRect(cx - 300, cy - 300, 600, 600); heatSun(x, cx, cy - 20, t, 80); txt(x, '0 SIGHTINGS', cx, cy + 150, { size: 44, col: INK }) }, { title: 'OUTSIDE' }),
        cast: { sagittarius: [[0, ...AL]] }, mood: { sagittarius: 'wide' }, lines: [[0.3, 2.6, 'sagittarius', 'they have never | met outside.']] },
      { dur: 3.0, set: T('SATURDAY: TUNNELS CLOSED', 0, 'MEANWHILE'), back: (x) => { x.fillStyle = 'rgba(10,6,30,0.55)'; x.fillRect(0, 380, 1080, 1040) },
        cast: { scorpio: [[0, 540, Y - 40, 230]] }, mood: { scorpio: 'sleepy' }, lines: [[0.3, 2.4, 'scorpio', 'on weekends, | they vanish.']] },
      { dur: 3.4, set: field((x, t) => street(x, t), o('SPOTTED: OUTSIDE, IN DAYLIGHT', 'UPDATE')), front: (x, t, lt, P) => { sunnies(x, P, 'aquarius') },
        back: (x, t, lt) => { if (lt > 1.9) hearts(x, t, 540, 960, t - lt + 1.9, { n: 6, spread: 200 }) },
        cast: { cancer: [[0, -150, Y, 240], [0.8, 330, Y, 240]], aquarius: [[0, 1250, Y, 240], [0.8, 760, Y, 240]] }, mood: { cancer: 'wide', aquarius: lt => lt > 1.8 ? 'heart' : 'wide' }, look: { cancer: [1, 0], aquarius: [-1, 0] },
        lines: [[0.9, 1.0, 'cancer', 'is that... | you?'], [2.0, 1.3, 'aquarius', 'you look different | in daylight!']] },
      { dur: 3.0, set: field((x, t) => street(x, t), o('PLANS MADE ABOVE GROUND', 'UPDATE')),
        cast: { cancer: [[0, 330, Y, 240]], aquarius: [[0, 760, Y, 240]] }, mood: { cancer: 'heart', aquarius: 'happy' }, look: { cancer: [1, 0], aquarius: [-1, 0] },
        lines: [[0.2, 1.5, 'aquarius', 'want to hang | out up here?'], [1.8, 1.0, 'cancer', 'yes!']], stick: [[1.8, 1.1, 'CONFIRMED', MINT]] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'STAR NEWS')),
        cast: { sagittarius: [[0, ...A]] }, mood: { sagittarius: 'wink' },
        lines: [[0.2, 2.9, 'sagittarius', 'say hi outside | the routine.']], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 2.8, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', 'NEXT')),
        cast: { sagittarius: [[0, ...A]] }, mood: { sagittarius: 'happy' }, hops: { sagittarius: [1.4] }, lines: [[0.3, 2.2, 'sagittarius', 'Jan 9. | above ground.']] },
    ],
  }
})()

// ── hst215 · Your car is yellow now. It's oak season.
const pollen = (() => {
  const pal = PAL.forest, tick = 'OAK POLLEN: EVERYWHERE  ·  CAR WASHES: POINTLESS  ·  SNEEZES REPORTED IN EVERY ZIP CODE  ·  LINT ROLLERS SOLD OUT IN THE HEIGHTS  ·  '
  const o = (head, kick = 'ALERT') => ({ pal, tick, head, kick })
  const dust = (x, t) => oakPollen(x, t, 1, 70)
  return {
    hook: "Your car is | yellow now. | It's oak season.", badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Shoot your shot. Jan 9.', stars: ['leo', 'scorpio', 'gemini', 'pisces'] }),
    scenes: [
      { dur: 3.0, set: desk(o('POLLEN ALERT: ALL OF HOUSTON')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#8fd0ff'; x.fillRect(cx - 300, cy - 300, 600, 600); pollenCar(x, cx, cy + 60, '#2a2a3a', 0.4 + 0.6 * clamp(lt / 2), 1.3); oakPollen(x, t, 1, 40) }, { title: 'YOUR CAR' }), front: dust,
        cast: { gemini: [[0, ...AL]] }, mood: { gemini: 'wide' }, hops: { gemini: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'gemini', 'go check your car. | yes, you.']] },
      { dur: 3.2, set: field((x, t, lt) => { street(x, t); pollenCar(x, 760, 1280, '#5ec8ff', clamp(lt / 2.4)) }, o('CAR WASHED: 1 HOUR AGO', 'LIVE')), front: dust,
        cast: { taurus: [[0, 300, Y - 40, 240]] }, mood: { taurus: lt => lt < 1.5 ? 'happy' : 'wide' }, look: { taurus: [1, 0.4] },
        lines: [[0.3, 2.6, 'taurus', 'I washed it | an hour ago.']] },
      { dur: 3.0, set: field((x, t) => { street(x, t); pollenCar(x, 760, 1280, '#1b1236', 1) }, o('BLACK CARS: NOW BEIGE', 'LIVE')), front: dust,
        cast: { libra: [[0, 300, Y - 40, 240]] }, mood: { libra: 'eyeroll' },
        lines: [[0.3, 2.4, 'libra', "it was black. | it's beige now."]] },
      { dur: 3.2, set: field((x, t) => bayou(x, t), o('SNEEZES: CITYWIDE', 'LIVE')), front: dust,
        cast: { pisces: [[0, 540, Y - 20, 260]] }, mood: { pisces: lt => lt < 1.4 ? 'squint' : 'heart' }, hops: { pisces: [0.4, 0.5, 1.4] },
        lines: [[0.2, 1.3, 'pisces', "it's not tears, | it's pollen."], [1.7, 1.3, 'pisces', "...it's | both."]] },
      { dur: 3.2, set: desk(o('EXPERT: WHY IS EVERYTHING YELLOW?', 'ANALYSIS')), front: (x, t, lt, P) => clipboard(x, P, 'virgo', -1),
        back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#bfe6ff'; x.fillRect(cx - 300, cy - 300, 600, 600); tree(x, cx, cy + 180, 1.3); oakPollen(x, t, 1, 50) }, { title: 'LIVE OAK' }),
        cast: { virgo: [[0, ...AL]] }, mood: { virgo: 'squint' },
        lines: [[0.2, 1.4, 'virgo', 'the oaks | are blooming.'], [1.7, 1.3, 'virgo', 'basically | tree dating.']] },
      { dur: 3.0, set: field((x, t) => bayou(x, t), o('RUN CLUB: UNSTOPPABLE', 'LIVE')), front: dust,
        back: (x, t, lt, P) => { const [cx, cy] = P.at('aries'); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(214,200,60,0.7)'; x.fillRect(cx - 80 - k * 40, cy + 40 + (k % 3) * 10, 18, 18) } },
        cast: { aries: [[0, -150, Y - 20, 230], [2.8, 1250, Y - 20, 230]] }, mood: { aries: 'sparkle' },
        lines: [[0.5, 1.8, 'aries', "can't stop. | run club."]] },
      { dur: 3.4, set: field((x, t, lt) => { street(x, t); pollenCar(x, 650, 1280, '#2a2a3a', 1, 1.4); if (lt > 0.8) { x.strokeStyle = INK; x.lineWidth = 6; x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('TEXT ME ♥', 650, 1180) } }, o('MESSAGE FOUND IN THE POLLEN', 'UPDATE')), front: dust,
        cast: { leo: [[0, 260, Y - 40, 230]] }, mood: { leo: 'wink' },
        lines: [[0.3, 2.6, 'leo', 'wrote my number | in the pollen.']], stick: [[1.2, 1.8, 'BOLD MOVE', GOLD]] },
      { dur: 3.2, set: field((x, t) => { street(x, t); pollenCar(x, 650, 1280, '#2a2a3a', 1, 1.4); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('TEXT ME ♥', 650, 1180) }, o('IT WORKED', 'UPDATE')), front: dust,
        back: (x, t, lt) => { if (lt > 1.2) hearts(x, t, 540, 900, t - lt + 1.2, { n: 6, spread: 200 }) },
        cast: { scorpio: [[0, 900, Y - 40, 230]] }, mood: { scorpio: lt => lt < 1.2 ? 'squint' : 'heart' },
        lines: [[0.3, 2.4, 'scorpio', 'okay. | that worked.']] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'STAR NEWS')),
        cast: { gemini: [[0, ...A]] }, mood: { gemini: 'wink' },
        lines: [[0.2, 2.9, 'gemini', 'messy season? | shoot your shot anyway.']], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 2.8, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', 'NEXT')),
        cast: { gemini: [[0, ...A]] }, mood: { gemini: 'happy' }, hops: { gemini: [1.4] }, lines: [[0.3, 2.2, 'gemini', 'Jan 9. | bring a lint roller.']] },
    ],
  }
})()

// ── hst216 · The first-date question every Houstonian asks
const school = (() => {
  const pal = PAL.candy, tick = 'MOST ASKED QUESTION ON HOUSTON FIRST DATES  ·  FOLLOW-UP: "WHERE ARE YOU FROM ORIGINALLY?"  ·  YEARBOOKS SPOTTED AT BRUNCH  ·  '
  const o = (head, kick = 'DEVELOPING') => ({ pal, tick, head, kick })
  const brunch = (x, t) => cafe(x, t, { wall: '#d07a9a', sign: 'BRUNCH' })
  return {
    hook: 'Every Houston first | date asks this', badge: BADGE, cues: [...STING, ['bell', 0.9, 1318.5, 0.02, 0.8, 0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: "Say where you're from. Jan 9.", stars: ['virgo', 'pisces', 'cancer', 'sagittarius'] }),
    scenes: [
      { dur: 3.0, set: desk(o('THE QUESTION', 'BREAKING')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#fff0f6'; x.fillRect(cx - 300, cy - 300, 600, 600); txt(x, "WHERE'D YOU GO", cx, cy - 60, { size: 46 }); txt(x, 'TO HIGH SCHOOL?', cx, cy + 10, { size: 46 }); txt(x, '?', cx, cy + 130, { size: 120, col: '#ff5aa0' }) }, { title: 'TONIGHT' }),
        cast: { cancer: [[0, ...AL]] }, mood: { cancer: 'wide' }, hops: { cancer: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'cancer', 'your date will | ask you this.']] },
      { dur: 3.0, set: field(brunch, o('LIVE: MIDTOWN BRUNCH', 'LIVE')),
        cast: { libra: [[0, 320, Y, 240]], sagittarius: [[0, 760, Y, 240]] }, mood: { libra: 'happy', sagittarius: 'happy' }, look: { libra: [1, 0], sagittarius: [-1, 0] },
        lines: [[0.3, 2.4, 'libra', "so... where'd you | go to high school?"]] },
      { dur: 3.0, set: field(brunch, o('LIVE: MIDTOWN BRUNCH', 'LIVE')),
        cast: { libra: [[0, 320, Y, 240]], sagittarius: [[0, 760, Y, 240]] }, mood: { libra: 'wide', sagittarius: 'sparkle' }, look: { libra: [1, 0] },
        lines: [[0.3, 2.4, 'sagittarius', 'which one? | I went to three.']] },
      { dur: 3.2, set: desk(o("IT'S NOT SMALL TALK", 'ANALYSIS')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.save(); x.translate(cx, cy); x.scale(0.5, 0.55); x.translate(-540, -830); houMap(x, t, { places: [PL.katy, PL.heights, PL.pearland, PL.cypress, PL.sugarland, PL.clearlake] }); x.restore() }, { title: 'THE MAP' }),
        cast: { cancer: [[0, ...AL]] }, mood: { cancer: 'squint' },
        lines: [[0.2, 2.8, 'cancer', "it's not small talk. | it's a map."]] },
      { dur: 3.0, set: field((x, t) => bungalow(x, t, { col: '#8ab0d0' }), o('ANSWERS VARY', 'LIVE')),
        cast: { leo: [[0, 360, Y, 250]] }, mood: { leo: 'sparkle' },
        lines: [[0.3, 2.4, 'leo', "I'm from Katy | originally."]], stick: [[1.2, 1.6, 'DIFFERENT QUESTION', GOLD]] },
      { dur: 3.0, set: field((x, t) => street(x, t), o('ANSWERS VARY', 'LIVE')),
        cast: { scorpio: [[0, 540, Y, 250]] }, mood: { scorpio: 'squint' },
        lines: [[0.3, 2.4, 'scorpio', 'I share that | on date three.']], stick: [[1.2, 1.6, 'CLASSIFIED', '#8f96a0']] },
      { dur: 3.0, set: field(brunch, o('ANSWERS VARY', 'LIVE')), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('capricorn'); box(x, cx + s * 0.3, cy - 30, 120, 150, '#2b5fb0', 5); txt(x, 'CLASS', cx + s * 0.3 + 60, cy + 20, { size: 22, col: GOLD, font: MONO, weight: 700 }) },
        cast: { capricorn: [[0, 380, Y, 240]] }, mood: { capricorn: 'happy' },
        lines: [[0.3, 2.4, 'capricorn', 'I brought | my yearbook.']] },
      { dur: 3.6, set: field(brunch, o('MATCH: SAME HIGH SCHOOL', 'UPDATE')),
        back: (x, t, lt) => { if (lt > 1.8) hearts(x, t, 540, 960, t - lt + 1.8, { n: 7, spread: 220 }) },
        cast: { virgo: [[0, 320, Y, 240]], pisces: [[0, 760, Y, 240]] }, mood: { virgo: lt => lt < 0.4 ? 'happy' : 'wide', pisces: 'heart' }, look: { virgo: [1, 0], pisces: [-1, 0] },
        lines: [[0.2, 1.4, 'virgo', 'wait. | SAME school?'], [1.8, 1.6, 'pisces', 'same lunch | table?!']], stick: [[1.9, 1.5, 'PISCES: CRYING', SKYB]] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'STAR NEWS')),
        cast: { cancer: [[0, ...A]] }, mood: { cancer: 'wink' },
        lines: [[0.2, 2.9, 'cancer', 'then ask the next one: | what do you love now?']], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 2.8, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', 'NEXT')),
        cast: { cancer: [[0, ...A]] }, mood: { cancer: 'happy' }, hops: { cancer: [1.4] }, lines: [[0.3, 2.2, 'cancer', 'Jan 9. | bring your answer.']] },
    ],
  }
})()

// ── hst217 · Houston's official bird was spotted near you (the mosquito)
const skeeter = (() => {
  const pal = PAL.ice, tick = 'MOSQUITO ACTIVITY: HIGH AT DUSK  ·  LONG SLEEVES IN 90°: SPOTTED  ·  CANDLES LIT CITYWIDE  ·  FREE MUSEUM NIGHTS: ZERO BITES  ·  '
  const o = (head, kick = 'WILDLIFE') => ({ pal, tick, head, kick })
  const swarm = (cx, cy, n = 5, R = 160) => (x, t) => { for (let k = 0; k < n; k++) mosquito(x, cx + Math.cos(t * (2 + k * 0.4) + k * 1.3) * R, cy + Math.sin(t * (2.6 + k * 0.3) + k) * R * 0.6, t + k, 2.2) }
  const museum = (x, t) => { x.fillStyle = '#e8e0d0'; x.fillRect(0, 0, 1080, FLOOR + 60); x.fillStyle = '#d8ccb4'; x.beginPath(); x.moveTo(60, 560); x.lineTo(540, 400); x.lineTo(1020, 560); x.fill(); for (let k = 0; k < 6; k++) box(x, 110 + k * 160, 600, 60, FLOOR - 560, '#f4efe4', 4); box(x, 380, 760, 320, 240, '#c9a6ff', 6); box(x, 420, 800, 240, 160, '#ffd36b', 4); x.fillStyle = '#b8a88a'; x.fillRect(0, FLOOR + 60, 1080, 1920) }
  return {
    hook: "Houston's official | bird is near you", badge: BADGE, cues: [...STING, ['pluck', 0.8, 1760, 0.02, 0.3, 0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Plan B ready. Jan 9.', stars: ['libra', 'capricorn', 'cancer', 'pisces'] }),
    scenes: [
      { dur: 3.0, set: desk(o('OFFICIAL BIRD SPOTTED NEAR YOU')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#bfe6ff'; x.fillRect(cx - 300, cy - 300, 600, 600); mosquito(x, cx + 20 * Math.sin(t * 3), cy + 14 * Math.cos(t * 4), t, 7) }, { title: 'THE BIRD' }),
        cast: { taurus: [[0, ...AL]] }, mood: { taurus: 'wide' }, hops: { taurus: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'taurus', 'the official bird | is near you.']] },
      { dur: 3.0, set: field((x, t) => park(x, t), o('LIVE: PICNIC IN PROGRESS', 'LIVE')), front: swarm(380, 1000),
        cast: { leo: [[0, 380, Y - 30, 240]] }, mood: { leo: 'squint' }, hops: { leo: [0.4, 0.9, 1.4, 1.9] },
        lines: [[0.3, 2.4, 'leo', 'I wore shorts. | I regret it.']] },
      { dur: 3.0, set: field((x, t) => park(x, t), o('LONG SLEEVES IN 90°', 'LIVE')), front: (x, t, lt, P) => { sweater(x, P, 'gemini', '#5a9ac9'); const [cx, cy, s] = P.at('gemini'); sweatDrops(x, cx + s * 0.3, cy - s * 0.35, t) },
        cast: { gemini: [[0, 640, Y - 30, 240]] }, mood: { gemini: 'squint' },
        lines: [[0.3, 2.4, 'gemini', 'long sleeves. | in 90 degrees.']] },
      { dur: 3.2, set: desk(o('MOSQUITO RADAR', 'ANALYSIS')), front: (x, t, lt, P) => clipboard(x, P, 'virgo', -1),
        back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.save(); x.translate(cx, cy); x.scale(0.5, 0.55); x.translate(-540, -830); houMap(x, t, { tint: `rgba(40,20,80,${(0.3 + 0.2 * clamp(lt / 2)).toFixed(2)})` }); for (let k = 0; k < 9; k++) mosquito(x, 200 + (k * 137) % 700, 600 + (k * 89) % 460, t + k, 3.2); x.restore() }, { title: 'DUSK' }),
        cast: { virgo: [[0, ...AL]] }, mood: { virgo: 'squint' },
        lines: [[0.2, 1.4, 'virgo', 'peak activity: | dusk.'], [1.7, 1.3, 'virgo', 'like most | first dates.']] },
      { dur: 3.0, set: field((x, t) => bayou(x, t, { dusk: 1 }), o('CANDLES LIT ON THE BAYOU', 'LIVE')),
        front: (x, t, lt, P) => { for (const cx of [700, 820]) { box(x, cx - 26, 1250, 52, 60, '#f2c75c', 4); x.fillStyle = '#ffb02a'; x.beginPath(); x.arc(cx, 1236 + 3 * Math.sin(t * 9 + cx), 12, 0, Math.PI * 2); x.fill() } },
        cast: { cancer: [[0, 330, Y - 30, 240]] }, mood: { cancer: 'happy' },
        lines: [[0.3, 2.4, 'cancer', 'I brought candles | for everyone.']] },
      { dur: 3.0, set: field((x, t) => bayou(x, t, { dusk: 1 }), o('BITES: ONE STAR ONLY', 'LIVE')), front: swarm(540, 1000, 6, 140),
        cast: { pisces: [[0, 540, Y - 30, 250]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 1.0, 1.7] },
        lines: [[0.3, 2.4, 'pisces', 'they only | bite ME.']], stick: [[1.2, 1.5, 'PISCES: CRYING', SKYB]] },
      { dur: 3.2, set: field((x, t) => park(x, t, { lake: false }), o('EXCLUSIVE INTERVIEW', 'EXCLUSIVE')), front: (x, t, lt, P) => { mic(x, P, 'sagittarius'); mosquito(x, 800 + 10 * Math.sin(t * 5), 900 + 8 * Math.cos(t * 6), t, 5) },
        cast: { sagittarius: [[0, 360, Y - 30, 230]] }, mood: { sagittarius: 'sparkle' },
        lines: [[0.2, 1.2, 'sagittarius', 'any | comment?'], [1.6, 1.2, [800, 900, 120], 'bzz.']] },
      { dur: 3.0, set: desk(o('DATE TIP: HAVE A PLAN B', 'STAR NEWS')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.save(); x.translate(cx, cy); x.scale(0.5, 0.5); x.translate(-540, -800); museum(x, t); x.restore() }, { title: 'FREE MUSEUM NIGHT' }),
        cast: { taurus: [[0, ...AL]] }, mood: { taurus: 'happy' },
        lines: [[0.3, 2.4, 'taurus', 'outdoors? | have a plan B.']] },
      { dur: 3.2, set: field(museum, o('MUSEUM DATE: ZERO BITES', 'UPDATE')),
        back: (x, t, lt) => { if (lt > 1.6) hearts(x, t, 540, 960, t - lt + 1.6, { n: 6, spread: 200 }) },
        cast: { libra: [[0, 300, Y, 230]], capricorn: [[0, 780, Y, 230]] }, mood: { libra: 'heart', capricorn: 'happy' }, look: { libra: [1, 0], capricorn: [-1, 0] },
        lines: [[0.2, 1.3, 'capricorn', 'free museum night. | zero bites.'], [1.7, 1.2, 'libra', 'and | art!']] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'STAR NEWS')),
        cast: { taurus: [[0, ...A]] }, mood: { taurus: 'wink' },
        lines: [[0.2, 2.9, 'taurus', 'outdoor date? | always pack a plan B.']], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 2.8, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', 'NEXT')),
        cast: { taurus: [[0, ...A]] }, mood: { taurus: 'happy' }, hops: { taurus: [1.4] }, lines: [[0.3, 2.2, 'taurus', 'see you Jan 9. | bzz.']] },
    ],
  }
})()

// ── hst218 · The Heights and Sugar Land signed a dating treaty
const treaty = (() => {
  const pal = PAL.sunset, tick = 'TALKS CONTINUE ON A FEEDER ROAD  ·  PARKING REMAINS THE KEY ISSUE  ·  THE HALFWAY TACO SPOT: AGREED  ·  DOGS IN BANDANAS PRESENT  ·  '
  const o = (head, kick = 'SUMMIT') => ({ pal, tick, head, kick })
  const summit = (x, t) => { cafe(x, t, { wall: '#7a5a8a', sign: 'HALFWAY COFFEE' }); box(x, 200, 1230, 680, 40, '#8a5530', 6); for (const [cx, c] of [[300, '#7ab0a0'], [780, '#e0a030']]) { box(x, cx - 4, 1080, 8, 150, '#8f96a0', 2); box(x, cx, 1080, 80, 52, c, 3) } }
  const pair = { aquarius: [[0, 300, 1110, 230]], taurus: [[0, 780, 1110, 230]] }
  return {
    hook: 'The Heights and | Sugar Land signed | a dating treaty', badge: BADGE, cues: [...STING, ['bell', 24.6, 1046.5, 0.02, 1.4, 0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Meet halfway. Jan 9.', stars: ['aquarius', 'taurus', 'gemini', 'pisces'] }),
    scenes: [
      { dur: 3.2, set: desk(o('HEIGHTS–SUGAR LAND SUMMIT', 'BREAKING')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.save(); x.translate(cx, cy); x.scale(0.5, 0.55); x.translate(-540, -830); houMap(x, t, { places: [PL.heights, PL.sugarland] }); x.setLineDash([16, 12]); x.strokeStyle = PINK; x.lineWidth = 8; x.beginPath(); x.moveTo(PL.heights[0], PL.heights[1]); x.lineTo(PL.sugarland[0], PL.sugarland[1]); x.stroke(); x.restore() }, { title: 'HEIGHTS ↔ SUGAR LAND' }),
        cast: { virgo: [[0, ...AL]] }, mood: { virgo: 'wide' }, hops: { virgo: [0.05, 0.5] },
        lines: [[0.3, 2.7, 'virgo', "you're in the Heights. | they're in Sugar Land."]] },
      { dur: 3.0, set: field(summit, o('LIVE: A COFFEE SHOP ON A FEEDER ROAD', 'LIVE')), cast: pair, mood: { aquarius: 'neutral', taurus: 'neutral' }, look: { aquarius: [1, 0], taurus: [-1, 0] },
        lines: [[0.3, 2.4, 'aquarius', 'nobody leaves | the Heights.']] },
      { dur: 3.0, set: field(summit, o('OPENING STATEMENTS', 'LIVE')), cast: pair, mood: { aquarius: 'neutral', taurus: 'squint' }, look: { aquarius: [1, 0], taurus: [-1, 0] },
        lines: [[0.3, 2.4, 'taurus', 'my street has | a quiet hour.']] },
      { dur: 3.0, set: desk(o('TALKS STALL OVER PARKING', 'DEVELOPING')),
        cast: { virgo: [[0, ...A]] }, mood: { virgo: 'squint' }, lines: [[0.3, 2.4, 'virgo', 'talks have stalled. | on parking.']] },
      { dur: 3.0, set: field(summit, o('A MEDIATOR ARRIVES', 'LIVE')), front: (x, t, lt, P) => clipboard(x, P, 'gemini', 1),
        cast: { ...pair, gemini: [[0, 540, 1500, 200], [0.5, 540, 860, 200]] }, mood: { gemini: 'sparkle' }, look: { aquarius: [1, -0.5], taurus: [-1, -0.5] },
        lines: [[0.6, 2.2, 'gemini', 'proposal: | alternate weekends.']] },
      { dur: 3.2, set: field(summit, o('TERMS: THE HALFWAY TACO SPOT', 'LIVE')), cast: pair, mood: { aquarius: 'happy', taurus: lt => lt > 1.6 ? 'heart' : 'happy' }, look: { aquarius: [1, 0], taurus: [-1, 0] },
        lines: [[0.2, 1.4, 'aquarius', 'and the halfway | taco spot?'], [1.8, 1.0, 'taurus', 'deal.']] },
      { dur: 3.2, set: field(summit, o('TREATY SIGNED', 'HISTORIC')), cast: pair, mood: { aquarius: 'heart', taurus: 'heart' }, look: { aquarius: [1, 0], taurus: [-1, 0] },
        back: (x, t, lt) => { const k = Kp(lt, 0.2, 0.4); if (k > 0) { x.save(); x.translate(540, 1060); x.scale(k, k); box(x, -120, -80, 240, 150, BONE, 5); txt(x, 'TREATY', 0, -40, { size: 40 }); x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(-90, 30); for (let q = 0; q < 8; q++) x.lineTo(-90 + q * 22 * clamp((lt - 0.6) / 1.2), 30 + (q % 2 ? -14 : 8)); x.stroke(); x.restore() } if (lt > 1.6) sparkles(x, t, 540, 1000, t - lt + 1.6, 12, 260, 3) },
        lines: [], stick: [[1.6, 1.5, 'TREATY SIGNED', GOLD]] },
      { dur: 3.0, set: field((x, t) => street(x, t), o('REACTION FROM THE PUBLIC', 'LIVE')),
        cast: { pisces: [[0, 540, Y, 250]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 1.2] },
        lines: [[0.3, 2.4, 'pisces', 'I love | diplomacy.']] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'STAR NEWS')),
        cast: { virgo: [[0, ...A]] }, mood: { virgo: 'wink' },
        lines: [[0.2, 2.9, 'virgo', "distance is a schedule | problem. not a love one."]], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 2.8, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', 'NEXT')),
        cast: { virgo: [[0, ...A]] }, mood: { virgo: 'happy' }, hops: { virgo: [1.4] }, lines: [[0.3, 2.2, 'virgo', 'Jan 9. | all sides of town.']] },
    ],
  }
})()

// ── hst219 · Crawfish season just started. Your sign reacts.
const mudbugs = (() => {
  const pal = { ...PAL.navy, chy: '#d83a2a', desk: '#d83a2a', kick: GOLD }, tick = 'CRAWFISH SEASON: OPEN  ·  SIZE: SMALL (IT IS EARLY)  ·  GARLIC BUTTER SUPPLIES: HOLDING  ·  NEWSPAPER ON EVERY TABLE  ·  '
  const o = (head, kick = 'SEASON OPENER') => ({ pal, tick, head, kick })
  const yard = (x, t) => { bungalow(x, t, { col: '#d0a060' }); crawfishTable(x, t, 540, 1240) }
  return {
    hook: 'Crawfish season | just started. | Your sign reacts.', badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Good things start small. Jan 9.', stars: ['capricorn', 'libra', 'leo', 'pisces'] }),
    scenes: [
      { dur: 3.0, set: desk(o('CRAWFISH SEASON IS OPEN')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#f4e1b0'; x.fillRect(cx - 300, cy - 300, 600, 600); for (let k = 0; k < 9; k++) crawfish(x, cx - 180 + (k % 3) * 180, cy - 140 + Math.floor(k / 3) * 140 + 6 * Math.sin(t * 4 + k), 1.4, Math.sin(k) * 0.4) }, { title: 'MUDBUGS' }),
        cast: { taurus: [[0, ...AL]] }, mood: { taurus: 'heart' }, hops: { taurus: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'taurus', 'you smelled it too. | it is starting.']] },
      { dur: 3.0, set: field(yard, o('LIVE: FIRST BOIL OF THE YEAR', 'LIVE')),
        cast: { sagittarius: [[0, 540, 1000, 240]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.3, 0.8] },
        lines: [[0.3, 2.4, 'sagittarius', 'first boil | of the year!']] },
      { dur: 3.0, set: field(yard, o('SIZE CHECK: SMALL', 'LIVE')), front: (x, t, lt, P) => { readers(x, P, 'virgo'); crawfish(x, 760, 900, 0.7, 0.2) },
        cast: { virgo: [[0, 460, 1000, 240]] }, mood: { virgo: 'squint' }, look: { virgo: [1, 0] },
        lines: [[0.3, 2.4, 'virgo', "they're tiny. | it's early."]] },
      { dur: 3.2, set: field(yard, o('TUTORIAL: PINCH, TWIST, PULL', 'LIVE')), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); crawfish(x, cx + s * 0.5, cy, 1.2, Math.sin(lt * 3) * 0.5) },
        cast: { cancer: [[0, 420, 1000, 240]] }, mood: { cancer: 'happy' },
        lines: [[0.3, 2.6, 'cancer', 'pinch. twist. | pull. you got it.']] },
      { dur: 3.0, set: field(yard, o('VIET-CAJUN: GARLIC BUTTER', 'LIVE')), front: (x, t, lt, P) => { box(x, 700, 940, 140, 100, '#f2c75c', 5); txt(x, 'GARLIC', 770, 990, { size: 26, font: MONO, weight: 700 }) },
        cast: { leo: [[0, 420, 1000, 240]] }, mood: { leo: 'heart' },
        lines: [[0.3, 2.4, 'leo', 'garlic butter. | the Houston way.']] },
      { dur: 3.0, set: field(yard, o('SPICE LEVEL: EMOTIONAL', 'LIVE')),
        cast: { pisces: [[0, 540, 1000, 250]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 1.1] },
        lines: [[0.3, 2.4, 'pisces', "it's the spice. | and I'm happy."]] },
      { dur: 3.0, set: field(yard, o('SPEED ROUND', 'LIVE')),
        cast: { aries: [[0, 300, 1000, 230], [1.2, 780, 1000, 230], [2.4, 300, 1000, 230]] }, mood: { aries: 'wide' },
        lines: [[0.2, 1.2, 'aries', 'speed | round!']], stick: [[1.4, 1.4, 'ARIES: 0 PEELED', BRAKE]] },
      { dur: 3.2, set: desk(o('FORECAST: BIGGER BY SPRING', 'ANALYSIS')), back: (x, t, lt) => ots(x, ...OTS, 1, (cx, cy) => { x.fillStyle = '#f4e1b0'; x.fillRect(cx - 300, cy - 300, 600, 600); crawfish(x, cx - 150, cy, 0.9); txt(x, '→', cx, cy, { size: 80 }); crawfish(x, cx + 150, cy, 2.0) }, { title: 'JAN → SPRING' }),
        cast: { taurus: [[0, ...AL]] }, mood: { taurus: 'happy' }, lines: [[0.3, 2.6, 'taurus', 'they get bigger | by spring.']] },
      { dur: 3.4, set: field(yard, o('MOMENT OF THE NIGHT', 'UPDATE')),
        back: (x, t, lt) => { if (lt > 1.8) hearts(x, t, 540, 860, t - lt + 1.8, { n: 6, spread: 200 }) },
        front: (x, t, lt, P) => { const [cx, cy, s] = P.at('capricorn'); box(x, cx + s * 0.25, cy + 10, 110, 50, BONE, 4); for (let k = 0; k < 4; k++) { x.fillStyle = '#ff9a7a'; x.fillRect(cx + s * 0.25 + 12 + k * 24, cy + 22, 16, 24) } },
        cast: { capricorn: [[0, 330, 1000, 230]], libra: [[0, 780, 1000, 230]] }, mood: { capricorn: 'happy', libra: lt => lt > 1.8 ? 'heart' : 'wide' }, look: { capricorn: [1, 0], libra: [-1, 0] },
        lines: [[0.2, 1.4, 'capricorn', 'I peeled these | for you.'], [1.8, 1.3, 'libra', 'marry | me.']] },
      { dur: 3.4, set: desk(o("TONIGHT'S TAKEAWAY", 'STAR NEWS')),
        cast: { taurus: [[0, ...A]] }, mood: { taurus: 'wink' },
        lines: [[0.2, 2.9, 'taurus', 'good things start small. | let them grow.']], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] },
      { dur: 2.8, set: desk(o('NEXT: HOUSTON BETA PARTY · JAN 9', 'NEXT')),
        cast: { taurus: [[0, ...A]] }, mood: { taurus: 'happy' }, hops: { taurus: [1.4] }, lines: [[0.3, 2.2, 'taurus', 'Jan 9. | wash your hands.']] },
    ],
  }
})()

export const NEWS = { hst215: pollen, hst216: school, hst217: skeeter, hst218: treaty, hst219: mudbugs, hst211: signal, hst212: twenty, hst213: spot, hst214: tunnels }
