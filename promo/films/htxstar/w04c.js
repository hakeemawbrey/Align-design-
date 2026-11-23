// Houston Star Talk, batch w04 (story format): hst100–hst106. See promo/posting/htx/FARM.md and htxstar/w04kit.js.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, table, room } from '../starrace/ep.js'
import { signChar, notes } from '../signs3kit.js'
import { skyline, car, freeway, sweat, taco, overheadSign, streetSign, coffeeShop, heatSun, BRAKE } from './kit.js'
import { story, SFX, Kp, Y, fit, night, sky, sun, ground, tree, kitchen, porch, bayou, bellaire, phoneChat, steam, boba, pond, paddleBoat, batBridge, crawfishTable, crawfish, tunnel, karaoke, hearts, sparkles, label, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from './w04kit.js'

const YOU = (y = 1480) => [540, y, 100]
const AUNTS = { cancer: 'glasses', taurus: 'glasses' }

// ── hst100 · Libra washed the car for you. Then: pollen.
const drive = (x, t) => { sky(x, '#8fd0ff', '#fff4d8', FLOOR + 60); porch(x, t); x.fillStyle = '#9aa0a8'; x.fillRect(0, 1360, 1080, 560); x.fillStyle = INK; x.fillRect(0, 1354, 1080, 8) }
const pollen = (x, t, k) => { for (let i = 0; i < Math.round(90 * k); i++) { const ph = (t * 0.35 + i * 0.137) % 1; x.fillStyle = 'rgba(240,210,60,0.85)'; x.fillRect((i * 97 + Math.sin(t * 2 + i) * 40) % 1080, ph * 1500, 9, 9) } }
const yellowCar = (x, cx, cy, k, t, flip = false, base = '#5ec8ff') => { car(x, cx, cy, base, { s: 1.5, flip }); if (k > 0) { x.save(); x.globalAlpha = 0.85 * clamp(k); x.fillStyle = '#e8c83a'; x.fillRect(cx - 180, cy - 130, 360, 40); x.fillRect(cx - 186, cy - 62, 372, 30); for (let i = 0; i < 30; i++) x.fillRect(cx - 170 + (i * 37) % 340, cy - 120 + (i * 23) % 90, 8, 8); x.restore() } else { sparkles(x, t, cx, cy - 60, t - 0.2, 6, 200, 7) } }
const hst100 = story({
  hook: 'Libra washed | the car for you. | Then: pollen.', key: 'G',
  close: 'Pollen and all. Jan 9.', stars: ['libra', 'taurus', 'pisces', 'gemini'],
  scenes: [
    { dur: 3.6, set: (x, t) => drive(x, t), front: (x, t, lt) => { yellowCar(x, 620, 1290, 0, t); for (let i = 0; i < 8; i++) { const ph = (t * 0.8 + i / 8) % 1; x.fillStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.arc(420 + i * 50, 1180 - ph * 200, 14, 0, Math.PI * 2); x.fill() } },
      cast: { libra: [[0, 240, 1180, 240]] }, mood: { libra: 'sparkle' }, hops: { libra: [0.02, 0.3, 0.6] },
      lines: [[0.3, 1.5, 'libra', 'date tonight! | everything perfect.']] },
    { dur: 3.4, set: (x, t) => drive(x, t), front: (x, t) => yellowCar(x, 620, 1290, 0, t), cast: { libra: [[0, 240, 1180, 240]] }, mood: { libra: 'heart' },
      lines: [[0.3, 2.4, 'libra', "you'll see your | reflection in it."]] },
    { dur: 3.8, set: (x, t, lt) => { drive(x, t); pollen(x, t, clamp(lt / 1.5)) }, front: (x, t, lt) => yellowCar(x, 620, 1290, clamp((lt - 0.6) / 1.4), t), cast: { libra: [[0, 240, 1180, 240]] }, mood: { libra: lt => lt > 1.4 ? 'wide' : 'happy' },
      stick: [[0.2, 1.4, 'OAK POLLEN SEASON', GOLD]], lines: [[1.8, 1.8, 'libra', 'no. | NO.']], sfx: [SFX.womp(1.8)] },
    { dur: 3.6, set: (x, t, lt) => { drive(x, t); pollen(x, t, 1) }, front: (x, t, lt) => yellowCar(x, 620, 1290, lt < 1.2 ? 1 - lt / 1.2 : clamp((lt - 1.6) / 0.8), t), cast: { libra: [[0, 240, 1180, 240]] }, mood: { libra: 'squint' },
      stick: [[0.1, 1.0, 'WASH #2', BONE]], lines: [[2.0, 1.4, 'libra', 'AGAIN?!']], sfx: [SFX.thud(2.0)] },
    { dur: 3.4, set: (x, t, lt) => { drive(x, t); pollen(x, t, 1) }, front: (x, t) => yellowCar(x, 620, 1290, 1, t), cast: { libra: [[0, 240, 1180, 240]], pisces: [[0, 900, 1060, 150]] }, mood: { libra: 'squint', pisces: 'wide' }, hops: { libra: [0.8] },
      lines: [[0.8, 1.2, 'libra', '*ACHOO*'], [2.1, 1.2, 'pisces', '*sniff* | allergies.']] },
    { dur: 3.8, set: (x, t, lt) => { drive(x, t); pollen(x, t, 0.6) }, front: (x, t, lt) => { yellowCar(x, 620, 1290, 1, t); yellowCar(x, 1500 - clamp(lt / 1.2) * 600, 1560, 1, t, true, '#ff8a3c') },
      cast: { libra: [[0, 240, 1180, 240]], taurus: [[0, 1500, 1420, 200], [1.2, 900, 1420, 200]] }, mood: { libra: 'wide', taurus: 'happy' },
      lines: [[1.4, 2.2, 'taurus', 'sorry. my car is | ALSO yellow.']], sfx: [SFX.boing(1.2)] },
    { dur: 3.8, set: (x, t, lt) => { drive(x, t); hearts(x, t, 540, 1000, t - lt + 0.4, { n: 8 }) }, cast: { libra: [[0, 340, 1220, 240]], taurus: [[0, 740, 1220, 240]] }, mood: { libra: 'heart', taurus: 'heart' }, hops: { libra: [0.3, 0.6], taurus: [0.4, 0.7] },
      lines: [[0.3, 1.5, 'taurus', 'we match!'], [2.0, 1.6, 'libra', "honestly? | you're perfect."]], sfx: [SFX.cheer(0.3)] },
    { dur: 3.4, set: (x, t) => { drive(x, t); pollen(x, t, 0.4) }, cast: { libra: [[0, 340, 1220, 240]], taurus: [[0, 740, 1220, 240]] }, mood: { libra: 'wink', taurus: 'happy' },
      lines: [[0.3, 2.6, 'libra', 'perfect is | overrated.']] },
  ],
  lesson: { lines: ['Nobody shows up', 'spotless.', 'Show up anyway.'], cast: { libra: [[0, 330, 1370, 190]], taurus: [[0, 750, 1370, 190]] }, mood: { libra: 'heart', taurus: 'happy' }, line: ['libra', '*achoo*'] },
})

// ── hst101 · Never put Aries on a paddle boat (Hermann Park)
const turtle = (x, cx, cy) => { x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 56, 30, 0, Math.PI, 0); x.fill(); x.fillStyle = '#3a7a4a'; x.beginPath(); x.ellipse(cx, cy, 50, 25, 0, Math.PI, 0); x.fill(); box(x, cx + 48, cy - 20, 26, 18, '#5a9a5a', 3); x.fillStyle = INK; x.fillRect(cx + 62, cy - 16, 5, 5) }
const boat = (x, t, cx, cy, spin = 0, col = '#ffd36b', s = 1) => { x.save(); x.translate(cx, cy); x.rotate(spin); paddleBoat(x, 0, 0, col, s); x.restore() }
const PAIR = (cx, cy, s = 200) => ({ aries: [[0, cx - 80, cy, s]], capricorn: [[0, cx + 80, cy, s]] })
const hst101 = story({
  hook: 'Never put Aries | on a paddle boat', key: 'D',
  close: 'Paddle together. Jan 9.', stars: ['aries', 'capricorn', 'pisces', 'cancer'],
  scenes: [
    { dur: 3.6, title: 'HERMANN PARK', set: (x, t) => pond(x, t), front: (x, t) => boat(x, t, 540, 1230 + Math.sin(t * 2) * 6), cast: PAIR(540, 1140), mood: { aries: 'sparkle', capricorn: 'squint' }, hops: { aries: [0.02, 0.3, 0.6] },
      lines: [[0.3, 1.5, 'aries', "you watching? | we'll WIN."]] },
    { dur: 3.6, set: (x, t) => pond(x, t), front: (x, t) => boat(x, t, 540, 1230 + Math.sin(t * 2) * 6), cast: PAIR(540, 1140), mood: { aries: 'wide', capricorn: 'squint' },
      lines: [[0.2, 1.4, 'capricorn', "it's not | a race."], [1.8, 1.6, 'aries', 'EVERYTHING | is a race.']] },
    { dur: 3.8, set: (x, t) => pond(x, t), front: (x, t, lt) => boat(x, t, 540, 1230, lt * 2.2), cast: { aries: [[0, 460, 1140, 200]], capricorn: [[0, 620, 1140, 200]] }, mood: { aries: 'wide', capricorn: 'wide' },
      stick: [[0.2, 1.2, 'SPINNING', BONE]], lines: [[1.0, 1.2, 'aries', 'FASTER!'], [2.3, 1.3, 'capricorn', 'LEFT! | LEFT!']], sfx: [SFX.boing(0.4)] },
    { dur: 3.6, set: (x, t) => pond(x, t), front: (x, t, lt) => { boat(x, t, 540, 1230, 0.3 * Math.sin(lt * 3)); boat(x, t, -200 + lt * 420, 980, 0, '#ff8fb1', 0.7) }, cast: { aries: [[0, 460, 1140, 200]], capricorn: [[0, 620, 1140, 200]], pisces: [[0, -240, 920, 140], [3.6, 1270, 920, 140]], cancer: [[0, -140, 920, 140], [3.6, 1370, 920, 140]] },
      mood: { aries: 'eyeroll', capricorn: 'neutral', pisces: 'heart', cancer: 'happy' }, lines: [[1.3, 1.8, 'pisces', "we're just | floating!"]], sfx: [SFX.womp(2.0)] },
    { dur: 3.4, set: (x, t) => pond(x, t), front: (x, t, lt) => { boat(x, t, 540, 1230, 0.3 * Math.sin(lt * 3)); turtle(x, 1100 - lt * 400, 1350) }, cast: { aries: [[0, 460, 1140, 200]], capricorn: [[0, 620, 1140, 200]] }, mood: { aries: 'wide', capricorn: 'wide' }, look: { aries: [1, 1], capricorn: [1, 1] },
      stick: [[0.6, 2.6, 'PASSED BY A TURTLE', GOLD]] },
    { dur: 3.8, set: (x, t) => pond(x, t), front: (x, t) => boat(x, t, 540, 1230), cast: PAIR(540, 1140), mood: { aries: 'neutral', capricorn: 'happy' },
      lines: [[0.3, 1.6, 'capricorn', 'count with me. | left. right.'], [2.1, 1.4, 'aries', 'left. | right.']], sfx: [SFX.ding(2.1)] },
    { dur: 3.8, set: (x, t) => { sky(x, '#ff9a6a', '#ffd8a8', 760); pond(x, t); x.fillStyle = 'rgba(255,140,80,0.2)'; x.fillRect(0, 0, 1080, 1920) }, front: (x, t, lt) => boat(x, t, 200 + lt * 180, 1230), cast: { aries: [[0, 120, 1140, 200], [3.8, 804, 1140, 200]], capricorn: [[0, 280, 1140, 200], [3.8, 964, 1140, 200]] },
      mood: { aries: 'happy', capricorn: 'happy' }, lines: [[1.0, 2.2, 'aries', 'oh. | this is nice.']] },
    { dur: 3.6, set: (x, t, lt) => { pond(x, t); box(x, 600, 1190, 480, 60, '#8a6a4a', 6); hearts(x, t, 540, 1000, t - lt + 0.8, { n: 8 }) }, cast: { aries: [[0, 700, 1110, 200]], capricorn: [[0, 900, 1110, 200]] }, mood: { aries: 'happy', capricorn: 'heart' },
      lines: [[0.2, 1.3, 'aries', 'we came | in last.'], [1.7, 1.7, 'capricorn', "we weren't | racing."]] },
  ],
  lesson: { lines: ["It's not a race.", 'Paddle', 'together.'], cast: { aries: [[0, 330, 1370, 190]], capricorn: [[0, 750, 1370, 190]] }, mood: { aries: 'happy', capricorn: 'heart' }, line: ['aries', '...rematch?'] },
})

// ── hst102 · Your date vs. the crawfish boil (the aunties are watching)
const flying = (x, lt, a) => { const p = clamp((lt - a) / 1.0); if (p <= 0 || p >= 1) return; x.save(); x.translate(560 + p * 420, 1060 - Math.sin(Math.PI * p) * 520); x.rotate(p * 9); crawfish(x, 0, 0, 1.2); x.restore() }
const hst102 = story({
  hook: 'Your date vs. | the crawfish boil', key: 'Bb',
  close: 'Bring them along. Jan 9.', stars: ['virgo', 'cancer', 'taurus', 'pisces'],
  scenes: [
    { dur: 3.6, set: (x, t) => crawfishTable(x, t, 1), cast: { cancer: [[0, 260, 1250, 240]], taurus: [[0, 820, 1250, 240]] }, mood: { cancer: 'wide', taurus: 'sparkle' }, props: AUNTS, hops: { cancer: [0.02, 0.35], taurus: [0.1, 0.45] },
      lines: [[0.3, 1.5, 'cancer', 'you brought | SOMEONE?'], [2.0, 1.4, 'taurus', 'sit. | eat.']] },
    { dur: 3.6, set: (x, t) => crawfishTable(x, t, 1), cast: { virgo: [[0, 540, 1250, 250]] }, mood: { virgo: 'wide' },
      lines: [[0.3, 2.4, 'virgo', 'with... | my hands?']], sfx: [SFX.gasp(0.3)] },
    { dur: 3.6, set: (x, t) => crawfishTable(x, t, 1), cast: { cancer: [[0, 220, 1000, 220]], taurus: [[0, 860, 1000, 220]], virgo: [[0, 540, 1250, 230]] }, mood: { cancer: 'squint', taurus: 'squint', virgo: 'neutral' }, props: AUNTS,
      lines: [[0.4, 2.2, 'taurus', "let's see | the technique."]] },
    { dur: 3.6, set: (x, t, lt) => { crawfishTable(x, t, 1); flying(x, lt, 0.5) }, cast: { cancer: [[0, 220, 1000, 220]], taurus: [[0, 860, 1000, 220]], virgo: [[0, 540, 1250, 230]] }, mood: { cancer: 'wide', taurus: 'wide', virgo: 'wide' }, props: AUNTS,
      stick: [[1.6, 1.8, 'IT ESCAPED', BRAKE]], sfx: [SFX.boing(0.5), SFX.womp(1.6)] },
    { dur: 3.6, set: (x, t) => crawfishTable(x, t, 1), front: (x, t) => sweat(x, 620, 1110, t, 3), cast: { cancer: [[0, 240, 1250, 230]], virgo: [[0, 760, 1250, 230]] }, mood: { cancer: 'happy', virgo: 'squint' }, props: { cancer: 'glasses' },
      lines: [[0.3, 2.4, 'cancer', "they're small | in January, baby."]] },
    { dur: 3.8, set: (x, t) => crawfishTable(x, t, 1), cast: { taurus: [[0, 900, 1250, 230], [0.8, 720, 1250, 230]], virgo: [[0, 380, 1250, 230]] }, mood: { taurus: 'happy', virgo: 'neutral' }, props: { taurus: 'glasses' },
      lines: [[1.0, 2.4, 'taurus', 'twist. pinch. | pull. like this.']], sfx: [SFX.ding(1.0)] },
    { dur: 3.8, set: (x, t, lt) => { crawfishTable(x, t, 1); if (lt > 0.8) sparkles(x, t, 540, 1050, t - lt + 0.8, 12, 300, 4) }, cast: { cancer: [[0, 220, 1000, 220]], taurus: [[0, 860, 1000, 220]], virgo: [[0, 540, 1250, 240]] },
      mood: { cancer: 'heart', taurus: 'heart', virgo: 'sparkle' }, props: AUNTS, hops: { cancer: [1.0, 1.3], taurus: [1.1, 1.4], virgo: [0.8] },
      lines: [[1.1, 2.2, 'cancer', 'A NATURAL!!']], sfx: [SFX.cheer(1.0)] },
    { dur: 3.8, set: (x, t) => { crawfishTable(x, t, 0.3); for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) crawfish(x, 300 + c * 90, 980 - r * 30, 0.6, '#b8502a') }, cast: { cancer: [[0, 220, 1250, 230]], taurus: [[0, 860, 1250, 230]], pisces: [[0, 540, 1420, 140]] },
      mood: { cancer: 'heart', taurus: 'wink', pisces: 'heart' }, props: AUNTS,
      lines: [[0.3, 1.5, 'taurus', '...and the shells | are in rows.'], [2.0, 1.6, 'cancer', "we're keeping | this one."]] },
  ],
  lesson: { lines: ["Nobody's born", 'knowing your people.', 'Teach with love.'], cast: { cancer: [[0, 330, 1370, 190]], taurus: [[0, 750, 1370, 190]] }, mood: { cancer: 'heart', taurus: 'heart' }, props: AUNTS, line: ['cancer', 'take a plate | home, baby.'] },
})

// ── hst103 · Scorpio swore they're not scared of bats (the bridge at sunset)
const hst103 = story({
  hook: "Scorpio swore | they're not scared | of bats", key: 'Eb',
  close: 'Come as you are. Jan 9.', stars: ['scorpio', 'taurus', 'pisces', 'aquarius'],
  scenes: [
    { dur: 3.6, title: 'THE BAT BRIDGE · SUNSET', set: (x, t, lt) => batBridge(x, t, lt, 0.05), cast: { scorpio: [[0, 330, 1260, 250]], taurus: [[0, 760, 1260, 230]] }, mood: { scorpio: 'squint', taurus: 'happy' }, hops: { scorpio: [0.02, 0.4] }, look: { scorpio: [0, 0] },
      lines: [[0.3, 1.6, 'scorpio', "a bat date? | cute. I'm fine."]] },
    { dur: 3.6, set: (x, t, lt) => batBridge(x, t, lt, 0), cast: { scorpio: [[0, 330, 1260, 250]], taurus: [[0, 760, 1260, 230]] }, mood: { scorpio: 'squint', taurus: 'happy' }, props: { scorpio: 'shades' },
      lines: [[0.2, 1.5, 'scorpio', "I'm Scorpio. | I fear nothing."], [1.9, 1.6, 'taurus', 'they come out | at sunset.']] },
    { dur: 3.4, set: (x, t, lt) => batBridge(x, t, lt, 0), cast: { scorpio: [[0, 330, 1260, 250]], taurus: [[0, 760, 1260, 230]] }, mood: { scorpio: 'neutral', taurus: 'sleepy' }, props: { scorpio: 'shades' },
      stick: [[0.2, 2.8, 'ANY MINUTE NOW', GOLD]], sfx: [SFX.cricket(0.6), SFX.cricket(1.4), SFX.cricket(2.2)] },
    { dur: 3.6, set: (x, t, lt) => batBridge(x, t, lt, 0.15 + lt * 0.1), cast: { scorpio: [[0, 330, 1260, 250]], taurus: [[0, 760, 1260, 230]] }, mood: { scorpio: 'wide', taurus: 'sparkle' }, look: { scorpio: [0, -1], taurus: [0, -1] },
      lines: [[0.6, 2.4, 'scorpio', "...that's | a LOT of bats."]] },
    { dur: 3.6, set: (x, t, lt) => batBridge(x, t, lt, 1), cast: { scorpio: [[0, 330, 1260, 250], [0.5, 900, 1300, 200]], taurus: [[0, 760, 1260, 230], [0.5, 680, 1260, 240]] }, mood: { scorpio: 'wide', taurus: 'happy' },
      stick: [[0.4, 2.0, 'FEARS NOTHING', BRAKE]], lines: [[0.4, 1.0, 'scorpio', 'AAAA!']], sfx: [SFX.womp(0.4)] },
    { dur: 3.8, set: (x, t, lt) => batBridge(x, t, lt, 1), cast: { scorpio: [[0, 900, 1300, 200]], taurus: [[0, 680, 1260, 240]] }, mood: { scorpio: 'wide', taurus: 'heart' }, look: { taurus: [1, 0] },
      lines: [[0.3, 2.2, 'taurus', "hey. | I got you."]], sfx: [SFX.ding(0.3)] },
    { dur: 3.8, set: (x, t, lt) => { batBridge(x, t, lt, 0.8); hearts(x, t, 540, 1050, t - lt + 1.6, { n: 6 }) }, cast: { scorpio: [[0, 900, 1300, 200], [1.0, 820, 1260, 230]], taurus: [[0, 680, 1260, 240], [1.0, 560, 1260, 230]] }, mood: { scorpio: lt => lt > 1.5 ? 'heart' : 'squint', taurus: 'heart' }, look: { scorpio: [0, -1] },
      lines: [[1.2, 2.2, 'scorpio', "okay. they're | kinda cute."]] },
    { dur: 3.4, set: (x, t, lt) => batBridge(x, t, lt, 0.4), cast: { scorpio: [[0, 760, 1260, 230]], taurus: [[0, 330, 1260, 230]] }, mood: { scorpio: 'squint', taurus: 'wink' }, props: { scorpio: 'shades' }, look: { scorpio: [0, 0], taurus: [0, 0] },
      lines: [[0.2, 1.4, 'scorpio', 'tell NO ONE.'], [1.8, 1.4, 'taurus', 'promise.']] },
  ],
  lesson: { lines: ['Let them see', 'you scared.', "That's trust."], cast: { scorpio: [[0, 330, 1370, 190]], taurus: [[0, 750, 1370, 190]] }, mood: { scorpio: 'heart', taurus: 'heart' }, line: ['scorpio', 'bats are | fine. now.'] },
})

// ── hst104 · You said meet in the tunnels. On a Saturday. (downtown)
const bigClock = (x, cx, cy, t) => { box(x, cx - 6, cy + 90, 12, 260, '#8f96a0', 4); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 96, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, 86, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx, cy - 64); x.moveTo(cx, cy); x.lineTo(cx + 46, cy + 10); x.stroke() }
const door = (x, t) => { night(x, t, '#2a2438'); box(x, 340, 780, 400, 600, '#3a4a6a', 8); box(x, 370, 820, 340, 540, '#26304a', 5); box(x, 360, 960, 360, 110, BRAKE, 5); fit(x, 'TUNNEL', 540, 995, 320, { size: 40, col: BONE, font: MONO, weight: 700 }); fit(x, 'CLOSED WEEKENDS', 540, 1040, 320, { size: 30, col: BONE, font: MONO, weight: 700 }) }
const hst104 = story({
  hook: 'You said meet | in the tunnels. | On a Saturday.', key: 'C',
  close: 'Say it twice: Jan 9.', stars: ['gemini', 'libra', 'capricorn', 'pisces'],
  scenes: [
    { dur: 3.6, title: 'SATURDAY · DOWNTOWN', set: (x, t) => door(x, t), cast: { gemini: [[0, 220, 1260, 240]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.02, 0.3, 0.6] },
      lines: [[0.3, 1.6, 'gemini', 'meet you in | the tunnels!']] },
    { dur: 3.6, set: (x, t) => door(x, t), cast: { gemini: [[0, 220, 1260, 240], [0.6, 860, 1260, 240]] }, mood: { gemini: lt => lt > 1.4 ? 'wide' : 'happy' }, look: { gemini: [-1, -1] },
      lines: [[1.4, 2.0, 'gemini', 'CLOSED | WEEKENDS?!']], sfx: [SFX.womp(1.4)] },
    { dur: 3.6, title: 'MONDAY · NOON', set: (x, t) => tunnel(x, t), cast: { gemini: [[0, 540, 1290, 250]] }, mood: { gemini: 'sparkle' },
      lines: [[0.4, 2.2, 'gemini', 'okay. | take two.']] },
    { dur: 3.6, set: (x, t) => tunnel(x, t, [['← FOOD COURT', 260], ['FOOD COURT →', 820]]), cast: { gemini: [[0, 540, 1290, 250]] }, mood: { gemini: 'wide' }, look: { gemini: [1, -1] },
      lines: [[0.4, 2.4, 'gemini', 'WHICH | food court?']], sfx: [SFX.boing(0.4)] },
    { dur: 3.8, set: (x, t) => tunnel(x, t, [['TOWER 2 →', 260], ['← ESCALATOR', 820]]), cast: { libra: [[0, 540, 1290, 250]] }, mood: { libra: 'happy' },
      lines: [[0.3, 1.5, 'libra', "I'm by | the escalator!"], [2.0, 1.6, 'libra', 'the... | tall one?']] },
    { dur: 3.6, set: (x, t) => tunnel(x, t, [['← EXIT', 260], ['EXIT →', 820]]), cast: { gemini: [[0, 300, 1290, 230]], libra: [[0, 780, 1290, 230]] }, mood: { gemini: 'wide', libra: 'wide' }, look: { gemini: [-1, 0], libra: [1, 0] },
      stick: [[0.2, 2.8, 'LOST: BOTH OF THEM', BRAKE]], sfx: [SFX.womp(0.3)] },
    { dur: 4.0, set: (x, t, lt) => { tunnel(x, t); phoneChat(x, 540, 900, [[0.3, 0, "let's be exact."], [1.2, 1, 'under the | big clock?'], [2.2, 0, 'under the big clock.']], lt, { title: 'LIBRA ♎', s: 0.85 }) },
      cast: { gemini: [[0, 880, 1330, 190]] }, mood: { gemini: 'squint' }, sfx: [SFX.pluck(0.3, 523), SFX.pluck(1.2, 659), SFX.ding(2.2)] },
    { dur: 3.6, set: (x, t, lt) => { tunnel(x, t); bigClock(x, 540, 700, t); if (lt > 1.2) hearts(x, t, 540, 1050, t - lt + 1.2, { n: 8 }) }, cast: { gemini: [[0, -100, 1290, 230], [1.0, 380, 1290, 230]], libra: [[0, 1180, 1290, 230], [1.0, 700, 1290, 230]] },
      mood: { gemini: 'heart', libra: 'heart' }, lines: [[1.4, 2.0, 'gemini', 'FOUND you! | and it\'s air-conditioned!']], sfx: [SFX.cheer(1.2)] },
  ],
  lesson: { lines: ['Say the plan', 'out loud.', 'Twice.'], cast: { gemini: [[0, 330, 1370, 190]], libra: [[0, 750, 1370, 190]] }, mood: { gemini: 'happy', libra: 'heart' }, line: ['libra', 'under the | big clock.'] },
})

// ── hst105 · Leo joined run club. For a crush. (6AM on the bayou)
const hst105 = story({
  hook: 'Leo joined | run club. | For a crush.', key: 'F',
  close: 'No running required. Jan 9.', stars: ['leo', 'sagittarius', 'virgo', 'pisces'],
  scenes: [
    { dur: 3.6, title: '6AM · THE BAYOU', set: (x, t) => bayou(x, t), cast: { leo: [[0, 540, 1250, 270]] }, mood: { leo: 'wink' }, props: { leo: ['crown', 'sweatband'] }, hops: { leo: [0.02, 0.4] }, look: { leo: [0, 0] },
      lines: [[0.3, 1.6, 'leo', 'I LOVE running. | (don\'t tell them.)']] },
    { dur: 3.6, set: (x, t) => bayou(x, t), cast: { leo: [[0, 260, 1250, 240]], sagittarius: [[0, 800, 1250, 230]], virgo: [[0, 540, 1060, 180]] }, mood: { leo: 'heart', sagittarius: 'sparkle', virgo: 'squint' }, props: { leo: ['crown', 'sweatband'], virgo: 'clipboard', sagittarius: 'sweatband' },
      lines: [[0.3, 1.5, 'leo', '*whispers* | that\'s them.'], [2.0, 1.4, 'virgo', 'and... GO!']], sfx: [SFX.ding(2.0)] },
    { dur: 3.6, set: (x, t) => bayou(x, t), front: (x, t) => sweat(x, 360, 1130, t, 4), cast: { leo: [[0, 260, 1250, 240], [3.6, 420, 1250, 240]], sagittarius: [[0, 700, 1250, 230], [3.6, 1300, 1250, 230]] }, mood: { leo: 'wide', sagittarius: 'happy' }, props: { leo: ['crown', 'sweatband'], sagittarius: 'sweatband' },
      lines: [[1.4, 2.0, 'leo', 'is the air | SOUP?']] },
    { dur: 3.6, set: (x, t) => bayou(x, t), front: (x, t) => sweat(x, 640, 1130, t, 4), cast: { leo: [[0, 540, 1250, 240], [1.6, 540, 1290, 240]], virgo: [[0, 860, 1060, 170]] }, mood: { leo: 'sleepy', virgo: 'squint' }, props: { leo: ['crown', 'sweatband'], virgo: 'clipboard' },
      lines: [[0.3, 1.3, 'virgo', 'PACE! | PACE!'], [1.9, 1.5, 'leo', '*wheeze*']], sfx: [SFX.womp(1.8)] },
    { dur: 3.8, set: (x, t) => bayou(x, t), cast: { leo: [[0, 300, 1270, 240]], sagittarius: [[0, 1200, 1250, 230], [0.8, 760, 1250, 230]] }, mood: { leo: 'neutral', sagittarius: 'happy' }, props: { leo: ['crown', 'sweatband'], sagittarius: 'sweatband' },
      lines: [[0.9, 1.3, 'sagittarius', 'you okay?'], [2.3, 1.4, 'leo', 'I hate | running.']] },
    { dur: 3.8, set: (x, t) => bayou(x, t), cast: { leo: [[0, 300, 1270, 240]], sagittarius: [[0, 760, 1250, 230]] }, mood: { leo: 'heart', sagittarius: lt => lt > 1.8 ? 'heart' : 'wide' }, props: { leo: ['crown', 'sweatband'], sagittarius: 'sweatband' },
      lines: [[0.2, 1.5, 'leo', 'I came | for you.'], [1.9, 1.8, 'sagittarius', '...I hate | running TOO.']], sfx: [SFX.gasp(0.2), SFX.boing(1.9)] },
    { dur: 3.8, set: (x, t, lt) => { bayou(x, t); taco(x, 440, 1170, 1); taco(x, 640, 1170, 1); hearts(x, t, 540, 1000, t - lt + 0.8, { n: 8 }) }, cast: { leo: [[0, 300, 1270, 240]], sagittarius: [[0, 780, 1250, 230]] }, mood: { leo: 'heart', sagittarius: 'heart' }, props: { leo: 'crown' },
      lines: [[0.4, 2.4, 'sagittarius', 'breakfast | tacos instead?']] },
    { dur: 3.4, set: (x, t) => bayou(x, t), cast: { virgo: [[0, 540, 1250, 250]], pisces: [[0, 880, 1380, 140]] }, mood: { virgo: 'wink', pisces: 'heart' }, props: { virgo: 'clipboard' },
      lines: [[0.3, 2.6, 'virgo', 'you two: | WALK club. Tuesdays.']] },
  ],
  lesson: { lines: ["Don't fake the hobby.", 'Share the', 'real you.'], cast: { leo: [[0, 330, 1370, 190]], sagittarius: [[0, 750, 1370, 190]] }, mood: { leo: 'heart', sagittarius: 'happy' }, props: { leo: 'crown' }, line: ['leo', 'walking is | cardio. right?'] },
})

// ── hst106 · Pisces signed up for karaoke (Bellaire)
const hst106 = story({
  hook: 'Pisces signed up | for karaoke', key: 'A',
  close: 'Be brave. Jan 9.', stars: ['pisces', 'taurus', 'leo', 'gemini'],
  scenes: [
    { dur: 3.6, title: 'KARAOKE · BELLAIRE', set: (x, t) => karaoke(x, t, '♪ UP NEXT: PISCES ♪', 0), cast: { pisces: [[0, 540, 1240, 270]] }, mood: { pisces: 'wide' }, props: { pisces: 'mic' }, hops: { pisces: [0.02, 0.2, 0.4, 0.6] },
      lines: [[0.3, 1.6, 'pisces', 'you came! | I\'m SO nervous.']] },
    { dur: 3.6, set: (x, t) => karaoke(x, t, '♪ UP NEXT: PISCES ♪', 0), cast: { pisces: [[0, 300, 1200, 230]], taurus: [[0, 800, 1300, 220]] }, mood: { pisces: 'wide', taurus: 'sparkle' }, props: { pisces: 'mic' },
      lines: [[0.3, 1.4, 'taurus', 'you got this!'], [1.9, 1.6, 'pisces', 'my song is | SO sad.']] },
    { dur: 3.8, set: (x, t, lt) => karaoke(x, t, '♪ my heart is stuck on the 610 ♪', lt / 3.8), front: (x, t) => notes(x, t, 540, 1050, { n: 4, cell: 7 }), cast: { pisces: [[0, 540, 1240, 260]] }, mood: { pisces: 'squint' }, props: { pisces: 'mic' },
      stick: [[1.6, 2.0, 'OFF KEY', BRAKE]], sfx: [SFX.pluck(0.3, 660), SFX.pluck(0.9, 620), SFX.pluck(1.5, 590)] },
    { dur: 3.6, set: (x, t, lt) => karaoke(x, t, '♪ ...and the feeder road ♪', 0.4), cast: { pisces: [[0, 540, 1240, 260]], leo: [[0, 180, 1400, 140]], gemini: [[0, 900, 1400, 140]] }, mood: { pisces: 'heart', leo: 'wide', gemini: 'wide' }, props: { pisces: 'mic' },
      lines: [[0.4, 1.8, 'pisces', '*sob* | ...the FEEDER...']], sfx: [SFX.cricket(2.4), SFX.womp(0.6)] },
    { dur: 3.6, set: (x, t) => karaoke(x, t, '♪ ...and the feeder road ♪', 0.5), cast: { pisces: [[0, 360, 1240, 250]], taurus: [[0, 1200, 1240, 240], [0.6, 740, 1240, 240]] }, mood: { pisces: 'wide', taurus: 'sparkle' }, props: { pisces: 'mic', taurus: 'mic' },
      lines: [[0.8, 2.2, 'taurus', 'DUET!']], sfx: [SFX.ding(0.8)] },
    { dur: 3.8, set: (x, t, lt) => { karaoke(x, t, '♪ but I found you on the 610 ♪', lt / 3.8); sparkles(x, t, 540, 900, t - lt, 12, 400, 2) }, front: (x, t) => notes(x, t, 540, 1050, { n: 7, cell: 8 }), cast: { pisces: [[0, 360, 1240, 250]], taurus: [[0, 740, 1240, 240]], leo: [[0, 180, 1400, 140]], gemini: [[0, 900, 1400, 140]] },
      mood: { pisces: 'heart', taurus: 'heart', leo: 'sparkle', gemini: 'sparkle' }, props: { pisces: 'mic', taurus: 'mic' }, hops: { pisces: [0.4, 1.2, 2.0], taurus: [0.6, 1.4, 2.2], leo: [1.0, 1.4], gemini: [1.1, 1.5] }, sfx: [SFX.cheer(1.0)] },
    { dur: 3.8, set: (x, t) => karaoke(x, t, '♪ ♪ ♪', 1), cast: { pisces: [[0, 360, 1240, 250]], taurus: [[0, 740, 1240, 240]] }, mood: { pisces: 'heart', taurus: 'happy' },
      lines: [[0.3, 1.5, 'pisces', 'best night | of my LIFE.'], [2.0, 1.6, 'taurus', 'you were | so brave.']] },
    { dur: 3.2, set: (x, t) => karaoke(x, t, '♪ UP NEXT: LEO (3 SONGS) ♪', 0), cast: { leo: [[0, 540, 1240, 270]] }, mood: { leo: 'sparkle' }, props: { leo: ['crown', 'mic'] },
      lines: [[0.3, 2.4, 'leo', 'my turn.']] },
  ],
  lesson: { lines: ["You don't have", 'to be perfect.', 'Just brave.'], cast: { pisces: [[0, 330, 1370, 190]], taurus: [[0, 750, 1370, 190]] }, mood: { pisces: 'heart', taurus: 'heart' }, line: ['pisces', '*happy sob*'] },
})

export const W04C = { hst100, hst101, hst102, hst103, hst104, hst105, hst106 }
