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

export const NEWS = { hst211: signal, hst212: twenty, hst213: spot, hst214: tunnels }
