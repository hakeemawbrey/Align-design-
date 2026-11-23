// Houston Star Talk · worker w11 · MISSION CONTROL (hst261–hst272). Engine: starrace/ep.js; props: kit.js + w11kit.js.
// Each one talks to the viewer ("you"), ends on the party ticket (Jan 9 only: no venue, time or price).
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, table } from '../starrace/ep.js'
import { label, sparkles, hearts, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { skyline, car, freeway, sweat, heatSun, shimmer, partyCard, taco, BRAKE, overheadSign, streetSign, shield, loopMap, cones, puffer, inviteCard, soupPot, coffeeShop, houses } from './kit.js'
import { Y, BADGE, STING, Kp, fadeK, big, mono, PAL, mcRoom, headset, helmet, rocket, telemetry, goBoard, checklist, phoneChat, night, duskSky, bayou, lobby, glassDoors, parkingLot, crawTray, crawfish, clipboardOn, partyRoom, shop } from './w11kit.js'

const mc = (pal, draw, o = {}) => (x, t, lt) => mcRoom(x, t, (cx, cy) => draw?.(x, t, lt, cx, cy), { pal, ...o })
const hs = (...ids) => (x, t, lt, P) => ids.forEach(id => headset(x, P, id))
const beep = (t0, n = 3, f = 1760) => Array.from({ length: n }, (_, i) => ['chip', t0 + i * 0.18, f, 0.08, { gain: 0.02, decay: 0.08 }])
const CL = [700, 640], MID = [560, 590], KATY = [270, 640], HEI = [600, 540], SUG = [380, 720], WOOD = [520, 420], PEAR = [640, 730], SPR = [470, 440], MONT = [600, 600]
const countdown = (x, lt, a, step = 0.8, col = BONE) => { const n = 3 - Math.floor((lt - a) / step); if (lt < a) return; big(x, n > 0 ? String(n) : 'LIFTOFF', 620, n > 0 ? col : GOLD, n > 0 ? 220 : 110) }

// ── hst261 · Houston, we have a problem: you're single
const e261 = {
  hook: "Houston, we have | a problem: | you're single", badge: BADGE, cues: [...STING, ...beep(4.0), ...beep(15.5)], endLen: 6.2,
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Problem solved: Jan 9.', stars: ['aries', 'virgo', 'gemini', 'pisces'] }),
  scenes: [
    { dur: 3.6, set: mc(PAL.navy, (x, t, lt, cx, cy) => { mono(x, 'SUBJECT: YOU', cx, cy - 170, 44, SKYB); telemetry(x, cx - 380, cy - 110, 760, 260, t, u => 0.5 + 0.35 * Math.sin(u * 30), { col: BRAKE, name: 'LOVE LIFE SIGNAL' }) }),
      front: hs('aries'), cast: { aries: [[0, 540, 1250, 230]] }, mood: { aries: 'squint' }, hops: { aries: [0.05, 0.4] },
      lines: [[0.4, 1.6, 'aries', 'you. | yes, YOU.'], [2.2, 1.3, 'aries', 'we see | the problem.']] },
    { dur: 3.8, set: mc(PAL.navy, (x, t, lt, cx, cy) => { mono(x, 'TEXTS SENT THIS WEEK', cx, cy - 170, 40, BONE); big(x, '0', cy - 40, BRAKE, 160); mono(x, 'TEXTS DRAFTED: 41', cx, cy + 140, 44, GOLD) }),
      front: clip('virgo'), cast: { virgo: [[0, 540, 1250, 230]] }, mood: { virgo: 'squint' },
      lines: [[0.3, 1.5, 'virgo', 'texts sent: | zero.'], [2.0, 1.6, 'virgo', 'drafted: | forty-one.']], stick: [[2.2, 1.4, 'DRAFTS ARE NOT TEXTS', PINK]] },
    { dur: 3.8, set: mc(PAL.navy, (x, t, lt, cx, cy) => { loopMap(x, cx, cy, 1, t, { dots: [[560, 600, PINK, 'YOU']] }); x.strokeStyle = BRAKE; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.ellipse(cx, cy, 120, 74, 0, 0, Math.PI * 2); x.stroke(); x.setLineDash([]); mono(x, 'DATING RADIUS: INSIDE THE LOOP', cx, cy + 200, 30, BRAKE) }),
      front: hs('capricorn'), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'eyeroll' },
      lines: [[0.3, 1.6, 'capricorn', 'you only date | inside the Loop.'], [2.1, 1.5, 'capricorn', 'Houston is | HUGE.']] },
    { dur: 3.8, set: mc(PAL.navy, (x, t, lt, cx, cy) => { mono(x, 'WEEKEND LOG', cx, cy - 190, 44, SKYB); ['SAT · AC + COUCH', 'SUN · AC + COUCH', 'SUN NIGHT · "maybe next week"'].forEach((s, i) => { if (lt > 0.4 + i * 0.6) mono(x, s, cx, cy - 80 + i * 90, 38, BONE) }) }),
      cast: { pisces: [[0, 540, 1250, 230]] }, mood: { pisces: 'wide' },
      lines: [[2.0, 1.6, 'pisces', "that's | me too *sniff*"]] },
    { dur: 4.0, set: mc(PAL.navy, (x, t, lt, cx, cy) => { mono(x, 'OPTIONS', cx, cy - 210, 44, SKYB); ['A · SWIPE UNTIL 2AM', 'B · BAYOU RUN CLUB', 'C · THE BETA PARTY'].forEach((s, i) => { const on = (i === 1 && lt > 1.2 && lt < 2.2) || (i === 2 && lt > 2.2); box(x, cx - 340, cy - 130 + i * 110, 680, 84, on ? '#1f7a4a' : '#1e2a50', 4); mono(x, s, cx, cy - 88 + i * 110, 38, BONE) }) }),
      cast: { gemini: [[0, 280, 1250, 210]], sagittarius: [[0, 800, 1250, 210]] }, mood: { gemini: 'sparkle', sagittarius: 'happy' },
      lines: [[0.9, 1.3, 'gemini', 'B! | run club!'], [2.3, 1.5, 'sagittarius', 'C. | obviously.']] },
    { dur: 3.8, set: mc(PAL.navy, (x, t, lt, cx, cy) => { const u = clamp(lt / 2.6); x.strokeStyle = PINK; x.lineWidth = 7; x.beginPath(); for (let i = 0; i <= 40 * u; i++) { const v = i / 40; const px = cx - 360 + v * 720, py = cy + 160 - Math.sin(v * Math.PI * 0.5) * 320; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke(); mono(x, 'YOU', cx - 360, cy + 200, 32, PINK); if (u >= 1) label(x, cx + 330, cy - 200, 'JAN 9', 1, { size: 44, bg: GOLD, font: MONO, weight: 700 }) }),
      front: hs('aquarius'), cast: { aquarius: [[0, 540, 1250, 230]] }, mood: { aquarius: 'sparkle' },
      lines: [[0.3, 1.5, 'aquarius', 'new | trajectory.'], [2.0, 1.6, 'aquarius', 'plotting: | Jan 9.']] },
    { dur: 4.2, set: (x, t, lt) => { mc(PAL.navy, (x, t, lt) => countdown(x, lt, 1.2))(x, t, lt); if (lt > 3.6) sparkles(x, t, 540, 900, 3.6 + (t - lt), 16, 420, 7) },
      cast: { aries: [[0, 300, 1250, 210]], libra: [[0, 780, 1250, 210]] }, mood: { aries: 'squint', libra: 'wide' },
      lines: [[0.1, 1.0, 'aries', 'are you | GO?'], [3.7, 0.5, 'libra', 'GO!']] },
    { dur: 3.4, set: (x, t, lt) => { mc(PAL.navy, (x, t, lt, cx, cy) => { big(x, 'PROBLEM', cy - 70, BONE, 100); big(x, 'SOLVED', cy + 60, GOLD, 120) })(x, t, lt); sparkles(x, t, 540, 610, t - lt, 16, 400, 2) },
      front: hs('aries'), cast: { aries: [[0, 540, 1250, 230]] }, mood: { aries: 'happy' }, hops: { aries: [0.2, 0.8, 1.4] },
      lines: [[0.4, 2.4, 'aries', 'Houston, | problem solved.']] },
  ],
}
function clip(id) { return (x, t, lt, P) => clipboardOn(x, P, id) }

// ── hst262 · Mission control is tracking your love life (heart telemetry)
const e262 = (() => {
  const hr = (spike, calm) => (u, t) => { const base = 0.35 + 0.08 * Math.sin(u * 50); return calm ? base : base + spike * Math.max(0, Math.sin(u * 14)) ** 8 * 0.5 }
  return {
    hook: 'Mission control is | tracking your love life', badge: BADGE, cues: [...STING, ...beep(4.2, 4, 1318.5), ['bell', 22.0, 880, 0.02, 1.2, 0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Heart rate: nominal. Jan 9.', stars: ['scorpio', 'taurus', 'cancer', 'virgo'] }),
    scenes: [
      { dur: 3.6, set: mc(PAL.plum, (x, t, lt, cx, cy) => telemetry(x, cx - 400, cy - 200, 800, 400, t, hr(0, true), { col: PINK, name: 'YOUR HEART · LIVE' })),
        front: hs('scorpio'), cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: 'squint' }, hops: { scorpio: [0.05, 0.4] },
        lines: [[0.4, 1.6, 'scorpio', 'flight surgeon | here.'], [2.2, 1.3, 'scorpio', 'watching | your heart.']] },
      { dur: 3.8, set: mc(PAL.plum, (x, t, lt, cx, cy) => { telemetry(x, cx - 400, cy - 200, 800, 400, t, hr(clamp((lt - 0.5) / 0.5), false), { col: BRAKE, name: 'YOUR HEART · LIVE' }); if (lt > 0.5) label(x, cx, cy - 120, 'NEW MESSAGE', Kp(lt, 0.5), { size: 44, bg: SKYB, font: MONO, weight: 700 }) }, { alarm: 0.5 }),
        front: hs('scorpio'), cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: 'wide' },
        lines: [[0.9, 1.4, 'scorpio', 'oh. | they texted.'], [2.5, 1.2, 'scorpio', 'spiking.']], stick: [[2.4, 1.3, 'HEART RATE: SPIKING', BRAKE]] },
      { dur: 3.8, set: mc(PAL.plum, (x, t, lt, cx, cy) => phoneChat(x, cx, cy + 10, t, [], { typing: 1, s: 0.78, head: 'THEM' })),
        cast: { cancer: [[0, 540, 1250, 230]] }, mood: { cancer: 'wide' },
        lines: [[0.3, 1.5, 'cancer', "they're | typing..."], [2.0, 1.6, 'cancer', 'stop | refreshing.']] },
      { dur: 3.6, set: mc(PAL.plum, (x, t, lt, cx, cy) => phoneChat(x, cx, cy + 10, t, [['l', 'tacos | this weekend?', Kp(lt, 0.2)]], { s: 0.78, head: 'THEM' })),
        cast: { taurus: [[0, 540, 1250, 230]] }, mood: { taurus: lt => lt > 0.8 ? 'heart' : 'wide' }, hops: { taurus: [0.9, 1.3] },
        lines: [[0.9, 1.2, 'taurus', 'TACOS.'], [2.2, 1.3, 'taurus', 'say yes.']] },
      { dur: 3.8, set: mc(PAL.plum, (x, t, lt, cx, cy) => { const d = 'lol maybe idk haha', n = lt < 1.6 ? d.length : Math.max(0, d.length - Math.floor((lt - 1.6) * 20)); phoneChat(x, cx, cy + 10, t, [['l', 'tacos | this weekend?'], ['r', d.slice(0, n) + (Math.sin(t * 6) > 0 ? '|' : ' '), n > 0 ? 1 : 0]], { s: 0.78, head: 'THEM' }) }),
        front: clip('virgo'), cast: { virgo: [[0, 540, 1250, 230]] }, mood: { virgo: 'squint' },
        lines: [[0.4, 1.3, 'virgo', 'delete | the "lol".'], [2.1, 1.4, 'virgo', 'just | say yes.']] },
      { dur: 3.6, set: mc(PAL.plum, (x, t, lt, cx, cy) => { phoneChat(x, cx - 170, cy + 10, t, [['l', 'tacos | this weekend?'], ['r', 'yes! | where?', Kp(lt, 0.2)]], { s: 0.7, head: 'THEM' }); telemetry(x, cx + 90, cy - 120, 320, 240, t, hr(0, true), { col: MINT, name: 'HR' }) }),
        front: hs('scorpio'), cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: 'happy' },
        lines: [[1.0, 1.8, 'scorpio', 'heart rate: | nominal.']], stick: [[0.6, 1.4, 'SENT', MINT]] },
      { dur: 4.0, set: (x, t, lt) => { night(x, t); streetSign(x, 760, 700, 'FEEDER RD', { k: 1 }) }, front: (x, t, lt) => { box(x, 80, FLOOR - 240, 300, 260, '#e05a3a', 6); box(x, 60, FLOOR - 290, 340, 60, GOLD, 5); txt(x, 'TACO TRUCK', 230, FLOOR - 260, { size: 34, col: INK }); for (let k = 0; k < 2; k++) taco(x, 470 + k * 140, FLOOR - 40, 1.1) },
        cast: { cancer: [[0, 700, Y, 220]], taurus: [[0, 940, Y, 200]] }, mood: { cancer: 'heart', taurus: 'heart' },
        lines: [[0.4, 1.6, 'cancer', 'taco truck | on a feeder road.'], [2.2, 1.5, 'taurus', 'very | Houston.']] },
      { dur: 3.6, set: (x, t, lt) => { mc(PAL.plum, (x, t, lt, cx, cy) => { mono(x, 'NEXT MISSION', cx, cy - 120, 44, SKYB); big(x, 'JAN 9', cy + 20, GOLD, 170) })(x, t, lt); sparkles(x, t, 540, 610, t - lt, 14, 380, 4) },
        front: hs('scorpio'), cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: 'heart' }, hops: { scorpio: [0.3, 1.0] },
        lines: [[0.4, 2.4, 'scorpio', 'now bring them | Jan 9.']] },
    ],
  }
})()

// ── hst263 · POV: your date lives in Clear Lake (an engineer plans your date like a launch)
const e263 = (() => {
  const lake = (x, t) => { duskSky(x, '#1b2a52', '#3f6a9a', '#9fd0e8'); x.fillStyle = '#2b5a7a'; x.fillRect(0, FLOOR - 200, 1080, 1000); for (let k = 0; k < 3; k++) { const bx = 160 + k * 360, b = Math.sin(t * 2 + k) * 8; box(x, bx - 90, FLOOR - 230 + b, 180, 40, BONE, 5); x.fillStyle = INK; x.fillRect(bx - 4, FLOOR - 420 + b, 8, 190); x.fillStyle = '#efe6d6'; x.beginPath(); x.moveTo(bx + 4, FLOOR - 410 + b); x.lineTo(bx + 90, FLOOR - 250 + b); x.lineTo(bx + 4, FLOOR - 250 + b); x.fill() } x.fillStyle = '#26364a'; x.fillRect(0, FLOOR + 40, 1080, 600) }
  return {
    hook: 'POV: your date | lives in Clear Lake', badge: BADGE, cues: [...STING, ...beep(8.0, 3, 1568)], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Clear Lake to you: Jan 9.', stars: ['virgo', 'cancer', 'pisces', 'leo'] }),
    scenes: [
      { dur: 3.8, set: (x, t) => lake(x, t), front: hs('virgo'), cast: { virgo: [[0, 540, Y, 250]] }, mood: { virgo: 'happy' }, hops: { virgo: [0.05, 0.5] },
        lines: [[0.4, 1.6, 'virgo', 'hi. I live | in Clear Lake.'], [2.2, 1.4, 'virgo', 'I made | a launch plan.']] },
      { dur: 3.8, set: mc(PAL.teal, (x, t, lt, cx, cy) => { loopMap(x, cx, cy, 1, t, { dots: [[...CL, SKYB, 'CLEAR LAKE'], [...MID, PINK, 'YOU']], route: [CL, MID] }); mono(x, 'TRAJECTORY: GULF FREEWAY', cx, cy + 220, 32, GOLD) }),
        front: hs('virgo'), cast: { virgo: [[0, 540, 1250, 230]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 1.5, 'virgo', 'route: | I-45 north.'], [2.0, 1.6, 'virgo', 'ETA: | 35 minutes.']], stick: [[2.2, 1.4, '(WITHOUT TRAFFIC)', BONE]] },
      { dur: 3.8, set: (x, t) => { x.fillStyle = '#1d2a3a'; x.fillRect(0, 0, 1080, 1920) }, front: (x, t, lt) => checklist(x, 540, 760, [['DINNER PLAN'], ['BACKUP DINNER'], ['SWEATER (FOR THE AC)'], ['BOAT PHOTO']], lt / 0.7, { title: 'DATE · PRE-FLIGHT' }),
        cast: { virgo: [[0, 540, 1350, 200]] }, mood: { virgo: 'squint' },
        lines: [[2.4, 1.3, 'virgo', 'all | nominal.']] },
      { dur: 3.8, set: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.6 }); freeway(x, FLOOR - 160, 600, 4, t * 260); shield(x, 880, 520, '45', 1) }, front: (x, t, lt) => { cones(x, FLOOR + 380, 6, t); car(x, 520, FLOOR + 120, '#5ec8ff', { open: true, brake: lt > 0.6 ? 1 : 0 }) },
        cast: { virgo: [[0, 500, FLOOR + 5, 190]] }, mood: { virgo: 'wide' },
        lines: [[0.4, 1.4, 'virgo', 'construction. | adjusting.'], [2.1, 1.5, 'virgo', 'recalculating | trajectory.']] },
      { dur: 3.6, set: (x, t) => { night(x, t, '#2a2140'); streetSign(x, 820, 640, 'MIDTOWN', { k: 1 }) },
        cast: { virgo: [[0, 440, Y, 250]] }, mood: { virgo: lt => lt > 1.8 ? 'wide' : 'heart' }, hops: { virgo: [0.3] },
        lines: [[0.3, 1.4, 'virgo', 'you look… | nominal.'], [1.9, 1.6, 'virgo', '…I mean | GREAT.']] },
      { dur: 3.8, set: (x, t) => { night(x, t, '#2a2140'); table(x, 540, 560) }, front: (x, t, lt) => { taco(x, 470, FLOOR - 70, 1.2); taco(x, 610, FLOOR - 70, 1.2); if (lt > 1.5) { x.save(); x.translate(760, 820); x.rotate(0.05); box(x, -120, -90, 240, 180, BONE, 6); x.fillStyle = '#5ec8ff'; x.fillRect(-104, -74, 208, 120); box(x, -60, 0, 120, 26, BONE, 3); x.fillStyle = INK; x.fillRect(-4, -60, 6, 60); x.restore() } },
        cast: { virgo: [[0, 300, Y - 60, 220]] }, mood: { virgo: 'sparkle' },
        lines: [[0.3, 1.2, 'virgo', 'I brought | a photo.'], [2.0, 1.5, 'virgo', 'it’s my | boat.']] },
      { dur: 3.6, set: mc(PAL.teal, (x, t, lt, cx, cy) => { mono(x, 'DOCKING', cx, cy - 60, 70, MINT); x.fillStyle = MINT; x.fillRect(cx - 300, cy + 20, 600 * clamp(lt / 2.4), 30) }),
        cast: { cancer: [[0, 300, 1250, 210]], pisces: [[0, 780, 1250, 210]] }, mood: { cancer: 'happy', pisces: 'heart' },
        lines: [[0.3, 1.5, 'pisces', "they're | so cute *sniff*"], [2.0, 1.5, 'cancer', 'docking: | successful.']] },
      { dur: 3.6, set: (x, t, lt) => { lake(x, t); label(x, 540, 640, 'MISSION 2: JAN 9', Kp(lt, 0.8), { size: 50, bg: GOLD, rot: -0.03 }) },
        front: hs('virgo'), cast: { virgo: [[0, 540, Y, 250]] }, mood: { virgo: 'heart' }, hops: { virgo: [0.2, 1.0] },
        lines: [[0.3, 1.4, 'virgo', 'next mission?'], [1.9, 1.5, 'virgo', 'Jan 9. | GO?']] },
    ],
  }
})()

// ── hst264 · T-minus 9 days: your party outfit check
const e264 = (() => {
  const closet = (x, t) => { x.fillStyle = '#2a1a3a'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#3a2550'; x.fillRect(0, FLOOR + 60, 1080, 600); box(x, 760, 420, 240, 820, '#bfe6ff', 8); x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(790, 460, 30, 740); for (let k = 0; k < 6; k++) { x.fillStyle = [PINK, GOLD, SKYB, MINT, LAV, '#e05a3a'][k]; x.fillRect(80 + k * 100, 380, 70, 220) } x.fillStyle = INK; x.fillRect(60, 360, 640, 10) }
  return {
    hook: 'T-minus 9 days: | your outfit check', badge: BADGE, cues: [...STING, ...beep(6.5, 2), ...beep(14.0, 2, 523.25)], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Dressed for 80°. Jan 9.', stars: ['libra', 'leo', 'sagittarius', 'taurus'] }),
    scenes: [
      { dur: 3.6, set: (x, t) => closet(x, t), front: hs('libra'), cast: { libra: [[0, 420, Y, 250]] }, mood: { libra: 'sparkle' }, hops: { libra: [0.05, 0.5] },
        lines: [[0.4, 1.6, 'libra', 'your outfit. | pre-flight.'], [2.2, 1.3, 'libra', 'systems | check.']] },
      { dur: 3.8, set: mc(PAL.amber, (x, t, lt, cx, cy) => { heatSun(x, cx - 230, cy - 40, t, 70); mono(x, 'OUTSIDE: SOUP', cx - 230, cy + 140, 34, GOLD); for (let k = 0; k < 10; k++) { x.fillStyle = '#ffffff'; x.fillRect(cx + 150 + (k * 47) % 200, cy - 160 + ((t * 120 + k * 60) % 300), 12, 12) } mono(x, 'INSIDE: ARCTIC AC', cx + 240, cy + 140, 34, SKYB) }),
        front: hs('aquarius'), cast: { aquarius: [[0, 540, 1250, 230]] }, mood: { aquarius: 'squint' },
        lines: [[0.3, 1.4, 'aquarius', 'outside: | soup.'], [1.9, 1.6, 'aquarius', 'inside: | the Arctic.']] },
      { dur: 3.8, set: (x, t) => { duskSky(x, '#ff9a3c', '#ffc24a', '#ffe08a'); heatSun(x, 860, 420, t, 80); shimmer(x, 500, 900, t) }, front: (x, t, lt, P) => { puffer(x, P, 'leo'); const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.4, cy - s * 0.4, t, 4) },
        cast: { leo: [[0, 440, Y, 250]] }, mood: { leo: 'wide' },
        lines: [[0.4, 1.5, 'leo', "but it's | January!"]], stick: [[2.0, 1.6, 'PUFFER: NO GO', BRAKE]] },
      { dur: 3.8, set: (x, t) => lobby(x, t), cast: { taurus: [[0, 540, Y, 240]] }, mood: { taurus: 'wide' }, hops: { taurus: [0.4, 0.6, 0.8, 1.0, 1.2] },
        lines: [[0.4, 1.5, 'taurus', 'shorts. | in THIS AC?']], stick: [[2.0, 1.6, 'SHORTS: NO GO', BRAKE]] },
      { dur: 3.8, set: (x, t) => closet(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('libra'); box(x, cx - s * 0.42, cy + s * 0.02, s * 0.84, s * 0.34, '#5a3a8a', 5); x.fillStyle = GOLD; x.fillRect(cx - 4, cy + s * 0.02, 8, s * 0.34) },
        cast: { libra: [[0, 420, Y, 250]] }, mood: { libra: 'heart' },
        lines: [[0.3, 1.5, 'libra', 'a light layer. | take it off.'], [2.0, 1.4, 'libra', 'put it | back on.']], stick: [[2.1, 1.5, 'LAYERS: GO', '#7dffb0']] },
      { dur: 3.6, set: (x, t) => closet(x, t), front: (x, t, lt) => { for (let k = 0; k < 2; k++) { const px = 620 + k * 120, py = FLOOR + 20; box(x, px - 40, py - 140, 80, 140, '#8a4a2a', 6); box(x, px - 40, py - 10, 150, 50, '#8a4a2a', 6) } },
        cast: { sagittarius: [[0, 300, Y, 240]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.3, 0.6] },
        lines: [[0.3, 1.5, 'sagittarius', 'boots are | coming out.'], [2.0, 1.4, 'sagittarius', 'rodeo | season.']] },
      { dur: 3.8, set: mc(PAL.amber, (x, t, lt) => goBoard(x, [['FIT', lt > 0.4 ? 'GO' : '?'], ['SWEATER', lt > 0.9 ? 'GO' : '?'], ['BOOTS', lt > 1.4 ? 'GO' : '?'], ['CONFIDENCE', lt > 1.9 ? 'GO' : '?']], 540, 420)),
        front: hs('libra'), cast: { libra: [[0, 540, 1250, 230]] }, mood: { libra: lt => lt > 2 ? 'heart' : 'squint' },
        lines: [[2.2, 1.4, 'libra', 'all | systems GO.']] },
      { dur: 3.6, set: (x, t, lt) => { closet(x, t); if (lt > 0.6) sparkles(x, t, 540, 900, 0.6 + (t - lt), 16, 380, 3) },
        cast: { libra: [[0, 300, Y, 220], [1.0, 300, Y - 80, 220]], leo: [[0, 540, Y, 220], [1.1, 540, Y - 80, 220]], taurus: [[0, 780, Y, 220], [1.2, 780, Y - 80, 220]] }, mood: { libra: 'heart', leo: 'sparkle', taurus: 'happy' },
        lines: [[1.2, 2.0, 'libra', 'cleared | for Jan 9.']] },
    ],
  }
})()

// ── hst265 · Before your first date: are you GO? (roll call with real advice)
const e265 = {
  hook: 'Before your first date: | are you GO?', badge: BADGE, cues: [...STING, ...beep(3.8, 2), ...beep(7.6, 2), ...beep(11.4, 2), ...beep(15.2, 2), ...beep(26.0, 4, 2093)], endLen: 6.2,
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'You are GO. Jan 9.', stars: ['capricorn', 'cancer', 'gemini', 'pisces'] }),
  scenes: [
    { dur: 3.6, set: mc(PAL.green, (x, t, lt) => goBoard(x, [['LOCATION', '?'], ['PARKING', '?'], ['COMMS', '?'], ['TALK', '?'], ['FEELINGS', '?']], 540, 430)),
      front: hs('capricorn'), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05, 0.4] },
      lines: [[0.4, 1.4, 'capricorn', 'first date | tonight?'], [2.0, 1.4, 'capricorn', 'roll | call.']] },
    { dur: 3.8, set: mc(PAL.green, (x, t, lt) => goBoard(x, [['LOCATION', lt > 1.8 ? 'GO' : '?'], ['PARKING', '?'], ['COMMS', '?'], ['TALK', '?'], ['FEELINGS', '?']], 540, 430)),
      front: hs('cancer'), cast: { cancer: [[0, 540, 1250, 230]] }, mood: { cancer: 'happy' },
      lines: [[0.3, 1.5, 'cancer', 'somewhere | public?'], [2.0, 1.5, 'cancer', 'a busy café. | GO.']] },
    { dur: 3.8, set: (x, t) => { night(x, t, '#2a2a3a'); streetSign(x, 760, 620, 'RICE VILLAGE', { k: 1, sub: 'NO PARKING' }) }, front: (x, t, lt) => car(x, 300 + 260 * Math.sin(lt * 2.4), FLOOR + 120, '#e05a3a'),
      cast: { virgo: [[0, 820, Y - 140, 200]] }, mood: { virgo: 'eyeroll' },
      lines: [[0.3, 1.4, 'virgo', 'parking in | the Village?'], [2.0, 1.6, 'virgo', 'park once. | then walk.']] },
    { dur: 3.8, set: mc(PAL.green, (x, t, lt, cx, cy) => phoneChat(x, cx, cy + 10, t, [['r', 'date at 7 | at the café', Kp(lt, 0.3)], ['l', 'got it. | text me after!', Kp(lt, 1.4)]], { s: 0.76, head: 'BEST FRIEND' })),
      front: hs('gemini'), cast: { gemini: [[0, 540, 1250, 230]] }, mood: { gemini: 'sparkle' },
      lines: [[0.3, 1.4, 'gemini', 'tell a friend | where you are.'], [2.1, 1.2, 'gemini', 'comms: | GO.']] },
    { dur: 3.8, set: (x, t) => { night(x, t); table(x, 540, 560) }, front: (x, t, lt) => { if (lt > 1.9) { x.strokeStyle = BRAKE; x.lineWidth = 10; x.beginPath(); x.moveTo(330, 640); x.lineTo(750, 760); x.stroke() } txt(x, "where'd you go | to high school?".replace(' | ', ' '), 540, 700, { size: 40, col: lt > 1.9 ? '#8f96a0' : BONE }) },
      cast: { aquarius: [[0, 540, Y - 60, 230]] }, mood: { aquarius: 'squint' },
      lines: [[0.3, 1.4, 'aquarius', 'ask more than | the usual.'], [2.1, 1.5, 'aquarius', 'ask about | their week.']] },
    { dur: 3.8, set: mc(PAL.green, (x, t, lt, cx, cy) => big(x, 'FEELINGS?', cy, PINK, 110)),
      cast: { pisces: [[0, 300, 1250, 210]], capricorn: [[0, 780, 1250, 210]] }, mood: { pisces: 'wide', capricorn: 'happy' },
      lines: [[0.3, 1.5, 'pisces', "what if | they're nice?"], [2.0, 1.6, 'capricorn', "that's | the goal."]] },
    { dur: 3.6, set: (x, t, lt) => { mc(PAL.green, (x, t, lt) => goBoard(x, [['LOCATION', 'GO'], ['PARKING', 'GO'], ['COMMS', 'GO'], ['TALK', 'GO'], ['FEELINGS', lt > 0.6 ? 'GO' : '?']], 540, 430))(x, t, lt); if (lt > 0.8) sparkles(x, t, 540, 610, 0.8 + (t - lt), 14, 400, 5) },
      front: hs('capricorn'), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: lt => lt > 1 ? 'heart' : 'squint' },
      lines: [[1.0, 2.0, 'capricorn', 'you are GO | for date.']] },
    { dur: 3.6, set: (x, t, lt) => { mc(PAL.green, (x, t, lt, cx, cy) => { mono(x, 'IF IT GOES WELL', cx, cy - 110, 44, MINT); big(x, 'JAN 9', cy + 30, GOLD, 170) })(x, t, lt) },
      cast: { pisces: [[0, 540, 1250, 230]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 0.9, 1.5] },
      lines: [[0.4, 2.4, 'pisces', 'bring them | Jan 9 *sniff*']] },
  ],
}

// ── hst266 · Your crush is orbiting you (stories, no texts) — mission control explains orbits
const e266 = (() => {
  const orbitScr = (lap) => (x, t, lt, cx, cy) => { x.fillStyle = PINK; x.beginPath(); x.arc(cx, cy, 60, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 5; x.stroke(); mono(x, 'YOU', cx, cy, 30, INK); x.strokeStyle = 'rgba(143,227,255,0.6)'; x.setLineDash([10, 10]); x.lineWidth = 4; x.beginPath(); x.ellipse(cx, cy, 300, 150, -0.2, 0, Math.PI * 2); x.stroke(); x.setLineDash([]); const a = t * 1.6, ox = cx + Math.cos(a) * 300 * Math.cos(-0.2) - Math.sin(a) * 150 * Math.sin(-0.2), oy = cy + Math.cos(a) * 300 * Math.sin(-0.2) + Math.sin(a) * 150 * Math.cos(-0.2); x.fillStyle = GOLD; x.beginPath(); x.arc(ox, oy, 22, 0, Math.PI * 2); x.fill(); x.stroke(); if (lap) mono(x, lap, cx + 300, cy - 210, 30, GOLD) }
  return {
    hook: 'Your crush is | orbiting you', badge: BADGE, cues: [...STING, ['swell', 26.0, 28.6, { gain: 0.03 }]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Land somewhere. Jan 9.', stars: ['gemini', 'aquarius', 'leo', 'sagittarius'] }),
    scenes: [
      { dur: 3.6, set: mc(PAL.navy, orbitScr('')), front: hs('aquarius'), cast: { aquarius: [[0, 540, 1250, 230]] }, mood: { aquarius: 'squint' }, hops: { aquarius: [0.05, 0.4] },
        lines: [[0.4, 1.5, 'aquarius', 'object | in orbit.'], [2.1, 1.3, 'aquarius', 'around | you.']] },
      { dur: 3.8, set: mc(PAL.navy, (x, t, lt, cx, cy) => { mono(x, 'VIEWS YOUR STORIES', cx - 210, cy - 110, 30, BONE); txt(x, 'ALL', cx - 210, cy - 10, { size: 100, col: MINT }); mono(x, 'TEXTS SENT', cx + 220, cy - 110, 30, BONE); txt(x, '0', cx + 220, cy - 10, { size: 100, col: BRAKE }) }),
        cast: { sagittarius: [[0, 540, 1250, 230]] }, mood: { sagittarius: 'wide' },
        lines: [[0.3, 1.5, 'sagittarius', 'they watch | every story.'], [2.0, 1.5, 'sagittarius', 'never | text.']] },
      { dur: 3.8, set: mc(PAL.navy, (x, t, lt, cx, cy) => { loopMap(x, cx, cy, 1, t); const a = t * 2.2; x.fillStyle = GOLD; x.beginPath(); x.arc(cx + Math.cos(a) * 250, cy + Math.sin(a) * 152, 18, 0, Math.PI * 2); x.fill(); mono(x, 'LAP ' + (40 + Math.floor(lt * 2)), cx + 300, cy + 220, 34, GOLD) }),
        front: hs('capricorn'), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'eyeroll' },
        lines: [[0.3, 1.5, 'capricorn', 'circling | Beltway 8…'], [2.0, 1.5, 'capricorn', '…for weeks.']] },
      { dur: 3.8, set: (x, t) => { x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 60; k++) { x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillRect((k * 173) % 1080, (k * 311) % 1920, 5, 5) } },
        front: (x, t, lt, P) => helmet(x, P, 'gemini'), cast: { gemini: [[0, 380, 900, 240], [3.8, 700, 820, 240]] }, mood: { gemini: 'sparkle' },
        lines: [[0.3, 1.4, 'gemini', "I'm just | busy!"], [2.0, 1.5, 'gemini', '…orbiting.']] },
      { dur: 3.8, set: mc(PAL.navy, (x, t, lt, cx, cy) => { mono(x, 'YOUR OPTIONS', cx, cy - 170, 44, SKYB); for (const [i, s] of [[0, 'A · SAY HI FIRST'], [1, 'B · LET THEM ORBIT']]) { if (lt > 0.4 + i * 1.0) { box(x, cx - 330, cy - 90 + i * 120, 660, 90, '#1e2a50', 4); mono(x, s, cx, cy - 45 + i * 120, 40, BONE) } } }),
        front: hs('aquarius'), cast: { aquarius: [[0, 540, 1250, 230]] }, mood: { aquarius: 'happy' },
        lines: [[2.4, 1.3, 'aquarius', 'both | are fine.']] },
      { dur: 3.6, set: (x, t) => { x.fillStyle = '#1a1033'; x.fillRect(0, 0, 1080, 1920) }, cast: { leo: [[0, 540, Y - 100, 280]] }, mood: { leo: 'heart' }, hops: { leo: [0.2] },
        lines: [[0.3, 1.4, 'leo', 'but you | deserve…'], [1.9, 1.6, 'leo', 'someone | who lands.']] },
      { dur: 3.8, set: (x, t, lt) => { x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = PINK; box(x, 380, 1000, 320, 120, PINK, 8); mono(x, 'YOU · DOCK', 540, 1060, 34, INK); if (lt > 2) hearts(x, t, 540, 820, t - lt + 2, { n: 6, seed: 3 }) },
        front: (x, t, lt, P) => helmet(x, P, 'gemini'), cast: { gemini: [[0, 540, 420, 220], [2.0, 540, 820, 220]] }, mood: { gemini: lt => lt > 2 ? 'heart' : 'wide' },
        lines: [[2.1, 1.5, 'gemini', 'hi. | for real.']], stick: [[2.0, 1.4, 'DOCKED', GOLD]] },
      { dur: 3.6, set: (x, t, lt) => { mc(PAL.navy, (x, t, lt, cx, cy) => { mono(x, 'LANDING SITE', cx, cy - 110, 44, SKYB); big(x, 'JAN 9', cy + 30, GOLD, 170) })(x, t, lt); sparkles(x, t, 540, 610, t - lt, 14, 380, 6) },
        front: hs('aquarius'), cast: { aquarius: [[0, 540, 1250, 230]] }, mood: { aquarius: 'sparkle' }, hops: { aquarius: [0.3, 1.0] },
        lines: [[0.4, 2.4, 'aquarius', 'landing site: | Jan 9.']] },
    ],
  }
})()

// ── hst267 · Houston, we have a humidity problem (date-night hair)
const e267 = (() => {
  const frizz = (x, P, id, k, t) => { const [cx, cy, s] = P.at(id); for (let i = 0; i < 26; i++) { const a = Math.PI * (1.05 + 0.9 * i / 25), r = s * (0.5 + 0.35 * k) + Math.sin(t * 6 + i) * 6; x.fillStyle = i % 2 ? '#e8a23a' : '#c9783a'; x.beginPath(); x.arc(cx + Math.cos(a) * r, cy - s * 0.05 + Math.sin(a) * r, s * (0.1 + 0.1 * k), 0, Math.PI * 2); x.fill() } }
  const hot = (x, t) => { duskSky(x, '#ff8a3c', '#ffb347', '#ffe08a'); heatSun(x, 860, 440, t, 80); shimmer(x, 500, 900, t); x.fillStyle = '#6a5a4a'; x.fillRect(0, FLOOR + 60, 1080, 600) }
  return {
    hook: 'Houston, we have | a humidity problem', badge: BADGE, cues: [...STING, ...beep(4.0, 3, 1046.5)], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Bring the frizz. Jan 9.', stars: ['leo', 'pisces', 'scorpio', 'sagittarius'] }),
    scenes: [
      { dur: 3.6, set: (x, t) => hot(x, t), back: (x, t, lt, P) => frizz(x, P, 'leo', 0, t), cast: { leo: [[0, 540, Y, 260]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05, 0.5] },
        lines: [[0.4, 1.4, 'leo', 'my mane | is perfect.'], [2.0, 1.4, 'leo', 'date in | 20 minutes.']] },
      { dur: 3.8, set: mc(PAL.red, (x, t, lt, cx, cy) => { x.strokeStyle = BONE; x.lineWidth = 10; x.beginPath(); x.arc(cx, cy + 120, 220, Math.PI, 0); x.stroke(); const a = Math.PI + Math.PI * clamp(0.4 + lt / 3); x.strokeStyle = BRAKE; x.beginPath(); x.moveTo(cx, cy + 120); x.lineTo(cx + Math.cos(a) * 200, cy + 120 + Math.sin(a) * 200); x.stroke(); mono(x, 'HUMIDITY', cx, cy + 180, 40, BRAKE); mono(x, 'SOUP', cx + 260, cy + 80, 30, BRAKE) }, { alarm: 0.6 }),
        front: hs('scorpio'), cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: 'wide' },
        lines: [[0.3, 1.4, 'scorpio', 'Houston, | humidity rising.'], [2.0, 1.6, 'scorpio', 'protect | the mane.']] },
      { dur: 3.8, set: (x, t) => hot(x, t), back: (x, t, lt, P) => frizz(x, P, 'leo', clamp(lt / 1.2), t), cast: { leo: [[0, 400, Y, 250]], taurus: [[0, 820, Y, 210]] }, mood: { leo: 'wide', taurus: 'squint' },
        lines: [[0.5, 1.4, 'leo', 'is it | bad?'], [2.1, 1.4, 'taurus', "it's… | big."]], stick: [[1.2, 1.4, 'MANE: EXPANDING', GOLD]] },
      { dur: 3.8, set: mc(PAL.red, (x, t, lt, cx, cy) => { mono(x, 'PLAN A: THE TUNNELS', cx, cy - 190, 40, GOLD); x.strokeStyle = SKYB; x.lineWidth = 12; x.beginPath(); x.moveTo(cx - 300, cy - 40); x.lineTo(cx - 100, cy - 40); x.lineTo(cx - 100, cy + 100); x.lineTo(cx + 200, cy + 100); x.lineTo(cx + 200, cy - 80); x.lineTo(cx + 320, cy - 80); x.stroke(); if (lt > 1.8) label(x, cx, cy + 20, 'CLOSED WEEKENDS', Kp(lt, 1.8), { size: 48, bg: BRAKE, font: MONO, weight: 700 }) }),
        cast: { virgo: [[0, 300, 1250, 210]], leo: [[0, 780, 1250, 210]] }, mood: { virgo: 'sparkle', leo: lt => lt > 1.8 ? 'wide' : 'happy' },
        lines: [[0.3, 1.4, 'virgo', 'take the | tunnels!'], [2.0, 1.5, 'leo', "it's | Saturday."]] },
      { dur: 3.8, set: (x, t) => { hot(x, t); parkingLot(x, t); x.fillStyle = '#2a5a2a'; x.beginPath(); x.arc(820, 900, 200, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a3a20'; x.fillRect(800, 900, 40, 360); x.fillStyle = 'rgba(0,0,0,0.3)'; x.beginPath(); x.ellipse(820, FLOOR + 100, 260, 60, 0, 0, Math.PI * 2); x.fill() },
        front: (x, t, lt) => car(x, 200 + 600 * ease.inOutCubic(clamp(lt / 2)), FLOOR + 120, '#e05a3a', { open: true }),
        cast: { sagittarius: [[0, 180, FLOOR + 5, 180], [2.0, 780, FLOOR + 5, 180]] }, mood: { sagittarius: 'sparkle' },
        lines: [[2.1, 1.6, 'sagittarius', 'shade spot | ACQUIRED.']], stick: [[0.2, 1.4, 'PLAN B: SHADE', GOLD]] },
      { dur: 3.8, set: (x, t) => { night(x, t, '#3a2a3a'); coffeeShop(x, 540, FLOOR + 60) }, back: (x, t, lt, P) => { frizz(x, P, 'leo', 1, t); frizz(x, P, 'pisces', 0.8, t) },
        cast: { leo: [[0, 260, Y, 220]], pisces: [[0, 820, Y, 220]] }, mood: { leo: 'wide', pisces: 'heart' },
        lines: [[0.4, 1.6, 'pisces', 'my hair | did that too.'], [2.2, 1.4, 'leo', '…really?']] },
      { dur: 3.6, set: (x, t, lt) => { night(x, t, '#3a2a3a'); hearts(x, t, 540, 900, t - lt + 0.4, { n: 8, seed: 5 }) }, back: (x, t, lt, P) => { frizz(x, P, 'leo', 1, t); frizz(x, P, 'pisces', 0.8, t) },
        cast: { leo: [[0, 300, Y, 230], [1.0, 420, Y, 230]], pisces: [[0, 780, Y, 230], [1.0, 660, Y, 230]] }, mood: { leo: 'heart', pisces: 'heart' }, hops: { leo: [1.3], pisces: [1.4] },
        lines: [[1.2, 1.8, 'leo', 'humidity | bonded us.']] },
      { dur: 3.4, set: (x, t, lt) => { mc(PAL.red, (x, t, lt, cx, cy) => { big(x, 'PROBLEM', cy - 70, BONE, 100); big(x, 'SOLVED', cy + 60, GOLD, 120) })(x, t, lt); sparkles(x, t, 540, 610, t - lt, 14, 400, 8) },
        front: hs('scorpio'), cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: 'happy' }, hops: { scorpio: [0.2, 0.9] },
        lines: [[0.4, 2.4, 'scorpio', 'next stop: | Jan 9.']] },
    ],
  }
})()

// ── hst268 · Mission control, but it's your group chat
const e268 = (() => {
  const feed = (msgs) => (x, t, lt, cx, cy) => { msgs.forEach(([who, s, col], i) => { const y = cy - 220 + i * 92 - Math.max(0, lt * 30 - 40); if (y < cy - 260 || y > cy + 250) return; box(x, cx - 380, y - 34, 760, 70, '#1e2a50', 3); mono(x, who, cx - 360, y, 28, col || GOLD, 'left'); txt(x, s, cx - 180, y, { size: 32, col: BONE, align: 'left' }) }) }
  return {
    hook: "Mission control, but | it's your group chat", badge: BADGE, cues: [...STING, ...beep(4.0, 6, 1975.5), ...beep(24.5, 3, 1318.5)], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Add them to the chat. Jan 9.', stars: ['capricorn', 'gemini', 'libra', 'scorpio'] }),
    scenes: [
      { dur: 3.6, set: mc(PAL.teal, feed([['GEMINI', 'guys', SKYB], ['GEMINI', 'GUYS', SKYB], ['GEMINI', 'beta party jan 9??', SKYB], ['ARIES', 'k', BRAKE]])),
        front: hs('capricorn'), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05, 0.4] },
        lines: [[0.4, 1.4, 'capricorn', 'your group chat. | live.'], [2.1, 1.3, 'capricorn', 'stand by.']] },
      { dur: 3.6, set: mc(PAL.teal, (x, t, lt, cx, cy) => { mono(x, 'GEMINI · NEW MESSAGES', cx, cy - 150, 40, SKYB); big(x, String(14 + Math.floor(lt * 9)), cy, SKYB, 180) }),
        cast: { gemini: [[0, 540, 1250, 230]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.3, 0.6, 0.9, 1.2, 1.5] },
        lines: [[0.3, 1.4, 'gemini', 'wait, | one more.'], [2.0, 1.4, 'gemini', 'ok two | more.']] },
      { dur: 3.8, set: mc(PAL.teal, (x, t, lt, cx, cy) => { loopMap(x, cx, cy, 1, t, { dots: [[...SPR, MINT, 'SPRING'], [...PEAR, PINK, 'PEARLAND'], [...MONT, GOLD, 'MONTROSE']] }); x.strokeStyle = BRAKE; x.lineWidth = 6; x.beginPath(); x.moveTo(...SPR); x.lineTo(...PEAR); x.lineTo(...MONT); x.stroke() }),
        front: hs('capricorn'), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'eyeroll' },
        lines: [[0.3, 1.5, 'capricorn', "who's | driving?"], [2.0, 1.5, 'capricorn', 'that route | is 3 loops.']] },
      { dur: 3.6, set: mc(PAL.teal, feed([['LIBRA', 'we split a ride share', PINK], ['CANCER', 'love that', MINT], ['SAG', 'shotgun', GOLD]])),
        cast: { libra: [[0, 540, 1250, 230]] }, mood: { libra: 'heart' },
        lines: [[0.3, 1.5, 'libra', 'we split | a ride.']], stick: [[1.9, 1.5, 'RIDE SHARE: GO', MINT]] },
      { dur: 3.8, set: mc(PAL.teal, (x, t, lt, cx, cy) => { for (let k = 0; k < 4; k++) { const px = cx - 300 + k * 200; box(x, px - 70, cy - 150, 140, 260, '#1e2a50', 4); box(x, px - 40, cy - 90, 80, 150, [PINK, GOLD, SKYB, LAV][k], 4); mono(x, String(k + 1), px, cy + 150, 34, BONE) } }),
        cast: { libra: [[0, 300, 1250, 210]], aries: [[0, 780, 1250, 210]] }, mood: { libra: 'wide', aries: 'neutral' },
        lines: [[0.3, 1.5, 'libra', 'which | outfit??'], [2.1, 1.0, 'aries', 'k']] },
      { dur: 3.6, set: mc(PAL.teal, feed([['CANCER', "i'm bringing snacks", MINT], ['TAURUS', 'what snacks', '#e8a23a'], ['TAURUS', 'list them', '#e8a23a']])),
        cast: { cancer: [[0, 300, 1250, 210]], taurus: [[0, 780, 1250, 210]] }, mood: { cancer: 'happy', taurus: 'wide' },
        lines: [[0.3, 1.4, 'cancer', "I'm bringing | snacks."], [1.9, 1.4, 'taurus', 'WHAT | snacks?']] },
      { dur: 3.6, set: mc(PAL.teal, (x, t, lt, cx, cy) => { mono(x, 'SCORPIO · UNREAD', cx, cy - 120, 40, LAV); big(x, '312', cy + 20, LAV, 180) }),
        cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: lt => lt < 1 ? 'sleepy' : 'wide' }, hops: { scorpio: [1.0] },
        lines: [[1.2, 1.8, 'scorpio', 'what did | I miss?']] },
      { dur: 3.6, set: (x, t, lt) => { mc(PAL.teal, (x, t, lt, cx, cy) => { mono(x, 'PLAN LOCKED', cx, cy - 110, 50, MINT); big(x, 'JAN 9', cy + 30, GOLD, 170) })(x, t, lt); sparkles(x, t, 540, 610, t - lt, 14, 400, 9) },
        cast: { gemini: [[0, 220, 1250, 180]], capricorn: [[0, 540, 1250, 200]], libra: [[0, 860, 1250, 180]] }, mood: { gemini: 'heart', capricorn: 'happy', libra: 'heart' }, hops: { gemini: [0.3, 0.9], capricorn: [0.4], libra: [0.5, 1.1] },
        lines: [[0.4, 2.4, 'capricorn', "we're | going."]] },
    ],
  }
})()

// ── hst269 · Abort mission: your ex just texted (protect your peace)
const e269 = {
  hook: 'Abort mission: | your ex just texted', badge: BADGE, cues: [...STING, ...beep(0.4, 4, 880), ...beep(18.6, 2, 523.25)], endLen: 6.2,
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Forward only. Jan 9.', stars: ['taurus', 'aries', 'virgo', 'pisces'] }),
  scenes: [
    { dur: 3.6, set: mc(PAL.red, (x, t, lt, cx, cy) => { big(x, 'INCOMING', cy - 40, BRAKE, 120); mono(x, 'SENDER: YOUR EX', cx, cy + 90, 44, BONE) }, { alarm: 1 }),
      front: hs('scorpio'), cast: { scorpio: [[0, 540, 1250, 230]] }, mood: { scorpio: 'wide' }, hops: { scorpio: [0.05, 0.4] },
      lines: [[0.4, 1.5, 'scorpio', 'incoming | message.'], [2.1, 1.3, 'scorpio', "it's | your ex."]] },
    { dur: 3.8, set: mc(PAL.red, (x, t, lt, cx, cy) => phoneChat(x, cx, cy + 10, t, [['l', 'hey stranger', Kp(lt, 0.2)]], { s: 0.78, head: 'EX' })),
      cast: { taurus: [[0, 540, 1250, 230]] }, mood: { taurus: 'wide' },
      lines: [[0.5, 1.5, 'taurus', '"hey | stranger"?'], [2.2, 1.4, 'taurus', 'should I…']] },
    { dur: 3.6, set: mc(PAL.red, (x, t, lt) => goBoard(x, [['ARIES', lt > 0.4 ? 'NO GO' : '?'], ['VIRGO', lt > 1.2 ? 'NO GO' : '?'], ['PISCES', lt > 2.0 ? 'NO GO' : '?']], 540, 470)),
      cast: { aries: [[0, 200, 1250, 180]], virgo: [[0, 540, 1250, 180]], pisces: [[0, 880, 1250, 180]] }, mood: { aries: 'squint', virgo: 'squint', pisces: 'wide' },
      lines: [[0.4, 0.9, 'aries', 'ABORT.'], [1.2, 0.9, 'virgo', 'abort.'], [2.0, 1.4, 'pisces', 'abort | *sniff*']] },
    { dur: 3.8, set: mc(PAL.red, (x, t, lt, cx, cy) => { mono(x, 'MISSION LOG', cx, cy - 190, 44, GOLD); ['LEFT YOU ON READ', 'FORGOT YOUR BIRTHDAY', 'SAID "U UP" AT 2AM'].forEach((s, i) => { if (lt > 0.3 + i * 0.6) mono(x, '· ' + s, cx, cy - 80 + i * 90, 38, BONE) }) }),
      front: clip('virgo'), cast: { virgo: [[0, 540, 1250, 230]] }, mood: { virgo: 'squint' },
      lines: [[2.1, 1.5, 'virgo', 'remember | why it ended.']] },
    { dur: 3.8, set: (x, t) => { x.fillStyle = '#1a1033'; x.fillRect(0, 0, 1080, 1920) }, front: hs('scorpio'), cast: { scorpio: [[0, 540, Y - 100, 280]] }, mood: { scorpio: 'happy' },
      lines: [[0.3, 1.5, 'scorpio', "you don't | owe a reply."], [2.0, 1.6, 'scorpio', 'protect | your peace.']] },
    { dur: 3.6, set: mc(PAL.red, (x, t, lt, cx, cy) => { const p = lt > 0.8; box(x, cx - 190, cy - 90 + (p ? 10 : 0), 380, 180, p ? '#8a1830' : BRAKE, 8); txt(x, 'MUTE', cx, cy + (p ? 10 : 0), { size: 90, col: BONE }) }),
      cast: { taurus: [[0, 540, 1250, 230]] }, mood: { taurus: lt => lt > 1 ? 'happy' : 'squint' }, hops: { taurus: [0.8] },
      lines: [[1.2, 1.2, 'taurus', 'muted.'], [2.5, 1.0, 'taurus', 'felt | good.']], stick: [[0.9, 1.2, 'MUTED', MINT]] },
    { dur: 3.8, set: mc(PAL.green, (x, t, lt, cx, cy) => loopMap(x, cx, cy, 1, t, { dots: [[...HEI, GOLD, 'HEIGHTS'], [...SUG, PINK, 'SUGAR LAND'], [...CL, SKYB, 'CLEAR LAKE'], [...WOOD, MINT, 'THE WOODLANDS'], [...MONT, LAV]].filter((_, i) => lt > i * 0.4) })),
      front: hs('aries'), cast: { aries: [[0, 540, 1250, 230]] }, mood: { aries: 'sparkle' },
      lines: [[0.3, 1.5, 'aries', 'new year. | new people.'], [2.0, 1.6, 'aries', 'all over | the city.']] },
    { dur: 3.6, set: (x, t, lt) => { mc(PAL.green, (x, t, lt, cx, cy) => { mono(x, 'NEW HEADING', cx, cy - 110, 44, MINT); big(x, 'JAN 9', cy + 30, GOLD, 170) })(x, t, lt); sparkles(x, t, 540, 610, t - lt, 14, 380, 10) },
      cast: { taurus: [[0, 540, 1250, 230]] }, mood: { taurus: 'heart' }, hops: { taurus: [0.3, 1.0] },
      lines: [[0.4, 2.4, 'taurus', 'mission: | forward.']] },
  ],
}

// ── hst270 · Houston, we have a crawfish situation (January: season's just starting)
const e270 = {
  hook: 'Houston, we have | a crawfish situation', badge: BADGE, cues: [...STING, ...beep(0.5, 3, 1174.7)], endLen: 6.2,
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Peel one for someone. Jan 9.', stars: ['cancer', 'pisces', 'leo', 'sagittarius'] }),
  scenes: [
    { dur: 3.6, set: mc(PAL.amber, (x, t, lt, cx, cy) => { for (let r = 80; r <= 240; r += 80) { x.strokeStyle = 'rgba(125,255,176,0.4)'; x.lineWidth = 3; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke() } const a = t * 2; x.strokeStyle = MINT; x.lineWidth = 5; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * 240, cy + Math.sin(a) * 240); x.stroke(); crawfish(x, cx + 120, cy - 90, 1.2, 0.4) }),
      front: hs('cancer'), cast: { cancer: [[0, 540, 1250, 230]] }, mood: { cancer: 'wide' }, hops: { cancer: [0.05, 0.4] },
      lines: [[0.4, 1.5, 'cancer', 'radar shows… | crawfish.'], [2.1, 1.3, 'cancer', 'season | is starting!']] },
    { dur: 3.8, set: mc(PAL.amber, (x, t, lt, cx, cy) => { crawfish(x, cx - 150, cy, 1.0); crawfish(x, cx + 150, cy, 2.4); mono(x, 'JANUARY', cx - 150, cy + 130, 34, BONE); mono(x, 'MARCH', cx + 150, cy + 130, 34, BONE) }),
      front: clip('virgo'), cast: { virgo: [[0, 540, 1250, 230]] }, mood: { virgo: 'squint' },
      lines: [[0.3, 1.5, 'virgo', 'small | in January.'], [2.0, 1.6, 'virgo', 'still | counts.']] },
    { dur: 3.6, set: mc(PAL.amber, (x, t, lt, cx, cy) => { mono(x, 'MISSION BRIEF', cx, cy - 150, 44, GOLD); txt(x, 'take your date', cx, cy - 40, { size: 60, col: BONE }); txt(x, 'to a crawfish boil', cx, cy + 40, { size: 60, col: BONE }) }),
      cast: { sagittarius: [[0, 540, 1250, 230]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.4, 0.8] },
      lines: [[0.4, 1.5, 'sagittarius', 'perfect | first date.'], [2.1, 1.3, 'sagittarius', 'messy = | honest.']] },
    { dur: 3.8, set: (x, t) => { x.fillStyle = '#2a3a4a'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 8; k++) { x.fillStyle = [GOLD, PINK, SKYB][k % 3]; x.beginPath(); x.arc(70 + k * 135, 360 + Math.sin(t * 2 + k) * 8, 22, 0, Math.PI * 2); x.fill() } x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 350); x.quadraticCurveTo(540, 420, 1080, 350); x.stroke(); table(x, 540, 900) },
      front: (x, t) => crawTray(x, 540, FLOOR - 80, t), cast: { leo: [[0, 300, Y - 160, 220]], pisces: [[0, 780, Y - 160, 220]] }, mood: { leo: 'sparkle', pisces: 'heart' },
      lines: [[0.3, 1.6, 'leo', 'Viet-Cajun. | garlic butter.'], [2.1, 1.4, 'pisces', 'oh | wow.']] },
    { dur: 3.6, set: (x, t) => { x.fillStyle = '#2a3a4a'; x.fillRect(0, 0, 1080, 1920); table(x, 540, 900) }, front: (x, t) => crawTray(x, 540, FLOOR - 80, t),
      cast: { pisces: [[0, 540, Y - 180, 260]] }, mood: { pisces: 'wide' },
      lines: [[0.3, 1.4, 'pisces', "it's | spicy…"], [1.9, 1.5, 'pisces', 'I love it | *sniff*']] },
    { dur: 3.8, set: mc(PAL.amber, (x, t, lt, cx, cy) => { ['PINCH', 'TWIST', 'PEEL'].forEach((s, i) => { const k = Kp(lt, 0.2 + i * 0.6); if (k > 0) label(x, cx - 260 + i * 260, cy, s, k, { size: 54, bg: [GOLD, PINK, SKYB][i], font: MONO, weight: 700 }) }); crawfish(x, cx, cy + 150, 1.4, Math.sin(t * 3) * 0.3) }),
      front: hs('cancer'), cast: { cancer: [[0, 540, 1250, 230]] }, mood: { cancer: 'happy' },
      lines: [[2.1, 1.5, 'cancer', 'and bring | napkins.']] },
    { dur: 3.8, set: (x, t, lt) => { x.fillStyle = '#2a3a4a'; x.fillRect(0, 0, 1080, 1920); table(x, 540, 900); if (lt > 1.6) hearts(x, t, 540, 820, t - lt + 1.6, { n: 6, seed: 9 }) }, front: (x, t) => crawTray(x, 540, FLOOR - 80, t, 8),
      cast: { leo: [[0, 300, Y - 160, 220], [1.4, 400, Y - 160, 220]], pisces: [[0, 780, Y - 160, 220], [1.4, 680, Y - 160, 220]] }, mood: { leo: 'heart', pisces: 'heart' },
      lines: [[0.3, 1.2, 'leo', 'here. | peeled one.'], [1.9, 1.6, 'pisces', 'for ME? | *sniff*']] },
    { dur: 3.4, set: (x, t, lt) => { mc(PAL.amber, (x, t, lt, cx, cy) => { mono(x, 'SITUATION: DELICIOUS', cx, cy - 110, 44, GOLD); big(x, 'JAN 9', cy + 30, GOLD, 170) })(x, t, lt); sparkles(x, t, 540, 610, t - lt, 14, 380, 11) },
      front: hs('cancer'), cast: { cancer: [[0, 540, 1250, 230]] }, mood: { cancer: 'heart' }, hops: { cancer: [0.3, 1.0] },
      lines: [[0.4, 2.4, 'cancer', 'see you | Jan 9.']] },
  ],
}

// ── hst271 · Spacewalk: you leaving the AC (indoor Arctic → outdoor soup)
const e271 = (() => {
  const CAP = [540, 770, 100]   // Capricorn's voice from a speaker (a position speaker)
  const speaker = (x) => { box(x, 470, 720, 140, 90, '#2a3550', 6); for (let k = 0; k < 3; k++) { x.fillStyle = INK; x.fillRect(490, 740 + k * 18, 100, 6) } }
  const hot = (x, t) => { duskSky(x, '#ff9a3c', '#ffc24a', '#ffe08a'); heatSun(x, 880, 420, t, 80); shimmer(x, 500, 900, t) }
  return {
    hook: 'Spacewalk: you | leaving the AC', badge: BADGE, cues: [...STING, ['swell', 3.8, 5.6, { gain: 0.03 }], ...beep(18.8, 3, 784)], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Bring a sweater. Jan 9.', stars: ['aquarius', 'libra', 'capricorn', 'gemini'] }),
    scenes: [
      { dur: 3.6, set: (x, t) => lobby(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aquarius'); box(x, cx - s * 0.42, cy + s * 0.02, s * 0.84, s * 0.32, '#5a7ab0', 5) },
        cast: { aquarius: [[0, 540, Y, 250]] }, mood: { aquarius: 'squint' }, hops: { aquarius: [0.05, 0.4] },
        lines: [[0.4, 1.4, 'aquarius', 'leaving | the building.'], [2.0, 1.4, 'aquarius', 'wish | me luck.']] },
      { dur: 3.8, set: (x, t, lt) => { hot(x, t); glassDoors(x, clamp((lt - 0.3) / 1.2)) }, front: (x, t, lt, P) => { helmet(x, P, 'aquarius'); speaker(x) },
        cast: { aquarius: [[0, 540, Y, 250]] }, mood: { aquarius: 'wide' },
        lines: [[0.3, 1.4, CAP, 'copy. | begin EVA.'], [2.0, 1.5, 'aquarius', 'opening | the doors…']], stick: [[0.2, 1.4, 'AIRLOCK', SKYB]] },
      { dur: 3.8, set: (x, t) => { hot(x, t); x.fillStyle = '#6a5a4a'; x.fillRect(0, FLOOR + 60, 1080, 600) }, front: (x, t, lt, P) => { helmet(x, P, 'aquarius', clamp(lt / 1.4)); const [cx, cy, s] = P.at('aquarius'); sweat(x, cx + s * 0.7, cy - s * 0.3, t, 3) },
        cast: { aquarius: [[0, 540, Y, 250]] }, mood: { aquarius: 'wide' },
        lines: [[0.3, 1.4, 'aquarius', 'visor | fogged.'], [2.0, 1.5, 'aquarius', "it's | soup."]] },
      { dur: 3.8, set: (x, t) => { hot(x, t); parkingLot(x, t) }, front: (x, t, lt, P) => { car(x, 920, FLOOR + 120, '#5ec8ff'); helmet(x, P, 'aquarius', 0.5); speaker(x) },
        cast: { aquarius: [[0, 180, Y, 200], [3.6, 620, Y, 200]] }, mood: { aquarius: 'squint' },
        lines: [[0.3, 1.5, CAP, 'target: | your car.'], [2.0, 1.5, CAP, 'no shade. | sorry.']] },
      { dur: 3.6, set: (x, t) => { x.fillStyle = '#3a2a2a'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#ff7a2a'; x.globalAlpha = 0.3 + 0.1 * Math.sin(t * 5); x.fillRect(0, 0, 1080, 1920); x.globalAlpha = 1; x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.arc(540, 700, 220, 0, Math.PI * 2); x.stroke(); x.strokeStyle = '#ff5a3a'; x.lineWidth = 16; x.stroke() },
        cast: { aquarius: [[0, 300, Y, 210]], gemini: [[0, 780, Y, 210]] }, mood: { aquarius: 'wide', gemini: 'wide' },
        lines: [[0.3, 1.4, 'aquarius', 'the seatbelt | is lava.'], [1.9, 1.5, 'gemini', 'the WHEEL | is lava.']] },
      { dur: 3.6, set: (x, t, lt) => { x.fillStyle = '#2a3a5a'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 40; k++) { const ph = (t * 0.8 + k * 0.05) % 1; x.fillStyle = '#ffffff'; x.fillRect(80 + (k * 97) % 920, 300 + ph * 1100, 10, 10) } },
        cast: { aquarius: [[0, 300, Y, 210]], gemini: [[0, 780, Y, 210]] }, mood: { aquarius: 'happy', gemini: 'heart' },
        lines: [[0.3, 1.3, 'aquarius', 'AC: | maximum.'], [1.8, 1.5, 'gemini', 'I can | see again.']] },
      { dur: 3.8, set: (x, t) => { lobby(x, t); table(x, 540, 560) }, front: (x, t, lt, P) => { if (lt > 1.6) { const [cx, cy, s] = P.at('aquarius'); box(x, cx - s * 0.42, cy + s * 0.02, s * 0.84, s * 0.32, '#c98ab0', 5) } },
        cast: { aquarius: [[0, 300, Y - 60, 220]], libra: [[0, 780, Y - 60, 220]] }, mood: { aquarius: lt => lt > 1.6 ? 'heart' : 'wide', libra: 'happy' },
        lines: [[0.3, 1.3, 'aquarius', 'freezing | again.'], [1.7, 1.7, 'libra', 'I brought | you a sweater.']] },
      { dur: 3.4, set: (x, t, lt) => { mcRoom(x, t, (cx, cy) => { mono(x, 'EVA COMPLETE', cx, cy - 110, 50, MINT); big(x, 'JAN 9', cy + 30, GOLD, 170) }, { pal: PAL.navy }); sparkles(x, t, 540, 610, t - lt, 14, 380, 12) },
        front: hs('capricorn'), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'happy' }, hops: { capricorn: [0.3, 1.0] },
        lines: [[0.4, 2.4, 'capricorn', 'next EVA: | Jan 9.']] },
    ],
  }
})()

// ── hst272 · Your launch window opens Jan 9 (all 12 stations roll call)
const e272 = (() => {
  const pad = (x, t, lt, cx, cy, fl = 0, rise = 0) => { x.fillStyle = '#3a3a50'; x.fillRect(cx - 300, cy + 200, 600, 60); for (let k = 0; k < 6; k++) { x.strokeStyle = '#8f96a0'; x.lineWidth = 6; x.beginPath(); x.moveTo(cx + 160, cy + 200); x.lineTo(cx + 160, cy - 200); x.stroke() } rocket(x, cx, cy - rise, 0.9, t, fl) }
  const roll = (ids, says, moods) => ({ dur: 3.8, set: mc(PAL.navy, (x, t, lt, cx, cy) => goBoard(x, ids.map((id, i) => [id.toUpperCase(), lt > 0.3 + i * 1.1 ? 'GO' : '?']), 540, 480)),
    cast: Object.fromEntries(ids.map((id, i) => [id, [[0, 200 + i * 340, 1250, 190]]])), mood: Object.fromEntries(ids.map((id, i) => [id, moods[i]])),
    lines: ids.map((id, i) => [0.3 + i * 1.1, 1.15, id, says[i]]) })
  return {
    hook: 'Your launch window | opens Jan 9', badge: BADGE, cues: [...STING, ['swell', 25.4, 28.6, { gain: 0.04 }], ['tom', 29.6, 70, { gain: 0.3, decay: 0.8 }]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Launch window: Jan 9.', stars: ['capricorn', 'aries', 'libra', 'pisces'] }),
    scenes: [
      { dur: 3.6, set: mc(PAL.navy, (x, t, lt, cx, cy) => pad(x, t, lt, cx, cy - 20)), front: hs('capricorn'), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05, 0.4] },
        lines: [[0.4, 1.5, 'capricorn', 'your launch | window…'], [2.1, 1.3, 'capricorn', 'opens | Jan 9.']] },
      roll(['aries', 'taurus', 'gemini'], ['GO!', 'go… after | snacks.', 'go go | GO!'], ['squint', 'happy', 'sparkle']),
      roll(['cancer', 'leo', 'virgo'], ['go. bring | a jacket.', 'GO. already | dressed.', 'go. list | is done.'], ['happy', 'sparkle', 'squint']),
      roll(['libra', 'scorpio', 'sagittarius'], ['go? | …go.', 'go. | (seen)', "GO, I'm | driving!"], ['wide', 'squint', 'sparkle']),
      roll(['capricorn', 'aquarius', 'pisces'], ['go. | on time.', 'go. weird, | but go.', 'go | *sniff*'], ['happy', 'sparkle', 'heart']),
      { dur: 3.6, set: (x, t) => { x.fillStyle = '#0a0f24'; x.fillRect(0, 0, 1080, 1920) }, front: hs('capricorn'), cast: { capricorn: [[0, 540, Y - 120, 300]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [1.6] },
        lines: [[0.3, 1.2, 'capricorn', 'and you?'], [1.7, 1.6, 'capricorn', 'are | you GO?']] },
      { dur: 4.0, set: mc(PAL.navy, (x, t, lt, cx, cy) => { pad(x, t, lt, cx + 220, cy - 20, lt > 2.4 ? 1 : 0.3); const n = 3 - Math.floor(lt / 0.8); txt(x, n > 0 ? String(n) : 'GO', cx - 200, cy, { size: 220, col: n > 0 ? BONE : GOLD }) }),
        cast: { aries: [[0, 200, 1250, 180]], leo: [[0, 540, 1250, 180]], sagittarius: [[0, 880, 1250, 180]] }, mood: { aries: 'wide', leo: 'wide', sagittarius: 'wide' }, hops: { aries: [2.4], leo: [2.5], sagittarius: [2.6] } },
      { dur: 4.0, set: (x, t, lt) => { duskSky(x, '#0a0f24', '#2a1d52', '#c2557a'); skyline(x, FLOOR + 60, t, { alpha: 0.9 }); rocket(x, 540, 1300 - ease.inQuad(clamp(lt / 3.6)) * 1500, 1.2, t, 1); if (lt > 0.6) sparkles(x, t, 540, 900, 0.6 + (t - lt), 18, 460, 13) },
        cast: { taurus: [[0, 160, 1500, 160]], cancer: [[0, 920, 1500, 160]] }, mood: { taurus: 'heart', cancer: 'heart' },
        lines: [[1.0, 2.2, 'cancer', 'see you | up there.']], stick: [[0.2, 1.6, 'LIFTOFF', GOLD]] },
    ],
  }
})()

export const W11 = { hst261: e261, hst262: e262, hst263: e263, hst264: e264, hst265: e265, hst266: e266, hst267: e267, hst268: e268, hst269: e269, hst270: e270, hst271: e271, hst272: e272 }
