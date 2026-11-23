// Houston Star Talk, batch w04 (story format): hst093–hst099. See promo/posting/htx/FARM.md and htxstar/w04kit.js.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, table, room } from '../starrace/ep.js'
import { signChar, notes } from '../signs3kit.js'
import { skyline, car, freeway, sweat, taco, overheadSign, streetSign, cones, mural, coffeeShop, soupPot, heatSun, BRAKE } from './kit.js'
import { story, SFX, Kp, Y, fit, night, sky, sun, ground, tree, kitchen, porch, bayou, bellaire, brunchFront, phoneChat, bigText, steam, boba, bowl, corkBoard, chapel, court, crawfishTable, karaoke, hearts, sparkles, label, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from './w04kit.js'

const YOU = (y = 1480) => [540, y, 100]

// ── hst093 · Scorpio ran a background check on your date
function tacoTruck(x, cx, base, t, { open = true, txt: s = 'TACOS' } = {}) {
  box(x, cx - 300, base - 420, 600, 340, '#f4efe4', 8); box(x, cx - 300, base - 420, 600, 70, '#c0304a', 0); fit(x, s, cx, base - 385, 400, { size: 52, col: BONE })
  if (open) { box(x, cx - 220, base - 330, 300, 150, '#2a2040', 5); x.fillStyle = '#ffd36b'; x.fillRect(cx - 210, base - 320, 280, 20) }
  box(x, cx + 120, base - 330, 140, 110, '#bfe6ff', 5)
  for (const wx of [cx - 190, cx + 190]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, base - 70, 48, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(wx, base - 70, 20, 0, Math.PI * 2); x.fill() }
}
const shrub = (x, cx, base) => { for (const [dx, r] of [[-60, 70], [0, 90], [60, 70]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx, base - r * 0.7, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2f7a46'; x.beginPath(); x.arc(cx + dx, base - r * 0.7, r, 0, Math.PI * 2); x.fill() } }
const hst093 = story({
  hook: 'Scorpio ran a | background check | on your date', key: 'D',
  close: 'Just ask. Jan 9.', stars: ['scorpio', 'libra', 'gemini', 'pisces'],
  scenes: [
    { dur: 3.6, set: (x, t, lt) => corkBoard(x, t, 0.4 + lt * 0.15), cast: { scorpio: [[0, 540, 1250, 270]] }, mood: { scorpio: 'squint' }, props: { scorpio: 'magnifier' }, hops: { scorpio: [0.02, 0.4] },
      lines: [[0.3, 1.5, 'scorpio', 'you have a date? | I have questions.'], [2.0, 1.4, 'scorpio', 'many | questions.']] },
    { dur: 3.8, set: (x, t) => corkBoard(x, t, 1), cast: { scorpio: [[0, 540, 1250, 270]] }, mood: { scorpio: 'squint' }, props: { scorpio: 'magnifier' },
      lines: [[0.3, 1.5, 'scorpio', 'high school? | unknown.'], [2.0, 1.6, 'scorpio', 'cousin in Katy? | ...likely.']], sfx: [SFX.thud(0.3), SFX.thud(2.0)] },
    { dur: 3.6, set: (x, t) => corkBoard(x, t, 1), cast: { scorpio: [[0, 300, 1250, 240]], gemini: [[0, 800, 1250, 230]] }, mood: { scorpio: 'wide', gemini: 'wink' }, props: { scorpio: 'magnifier' },
      lines: [[0.3, 1.5, 'gemini', "word is... | they're a Libra."], [2.0, 1.4, 'scorpio', 'a LIBRA.']], sfx: [SFX.gasp(2.0)] },
    { dur: 3.8, title: 'THE TACO TRUCK · 9PM', set: (x, t) => { night(x, t); tacoTruck(x, 700, FLOOR + 60, t) }, front: (x, t) => shrub(x, 220, FLOOR + 70),
      cast: { libra: [[0, 700, 1300, 200]], scorpio: [[0, 220, 1170, 200]] }, mood: { libra: 'happy', scorpio: 'squint' }, props: { scorpio: 'magnifier' }, look: { scorpio: [1, 0] },
      lines: [[0.6, 2.4, 'scorpio', '*whispers* | suspect ordered flour.']] },
    { dur: 3.6, set: (x, t) => { night(x, t); tacoTruck(x, 700, FLOOR + 60, t) }, front: (x, t) => shrub(x, 220, FLOOR + 70),
      cast: { libra: [[0, 700, 1300, 200], [0.6, 480, 1300, 210]], scorpio: [[0, 220, 1170, 200]] }, mood: { libra: 'wide', scorpio: 'wide' }, props: { scorpio: 'magnifier' }, look: { libra: [-1, 0] },
      lines: [[0.9, 1.8, 'libra', '...Scorpio? | is that you?']], sfx: [SFX.womp(1.0)] },
    { dur: 3.8, set: (x, t) => { night(x, t); tacoTruck(x, 700, FLOOR + 60, t) }, cast: { libra: [[0, 760, Y, 230]], scorpio: [[0, 320, Y, 230]] }, mood: { libra: 'happy', scorpio: 'neutral' }, props: { scorpio: 'magnifier' },
      lines: [[0.3, 1.6, 'libra', 'you could | just ask me.'], [2.1, 1.4, 'scorpio', '...ask?']], sfx: [SFX.cricket(2.6)] },
    { dur: 4.0, set: (x, t) => { night(x, t); box(x, 240, 1290, 600, 30, '#6b3b1f', 5) }, cast: { libra: [[0, 720, 1240, 230]], scorpio: [[0, 360, 1240, 230]] }, mood: { libra: 'sparkle', scorpio: lt => lt > 2.2 ? 'wide' : 'squint' },
      lines: [[0.2, 1.8, 'scorpio', "where'd you go | to high school?"], [2.2, 1.6, 'libra', 'same as you. | we had chem.']], sfx: [SFX.gasp(2.2)] },
    { dur: 3.6, set: (x, t, lt) => { night(x, t); box(x, 240, 1290, 600, 30, '#6b3b1f', 5); hearts(x, t, 540, 1000, t - lt + 0.8, { n: 8, spread: 260 }) }, cast: { libra: [[0, 720, 1240, 230]], scorpio: [[0, 360, 1240, 230]] }, mood: { libra: 'heart', scorpio: 'heart' }, hops: { scorpio: [0.4, 0.8] },
      lines: [[0.3, 1.4, 'scorpio', '...I KNEW it.'], [1.9, 1.6, 'scorpio', 'case closed. | dinner Friday?']] },
  ],
  lesson: { lines: ['Curious is cute.', "Snooping isn't.", 'Just ask.'], cast: { scorpio: [[0, 330, 1370, 190]], libra: [[0, 750, 1370, 190]] }, mood: { scorpio: 'happy', libra: 'heart' }, line: ['libra', 'flour, by | the way.'] },
})

// ── hst094 · You asked Taurus for a bite (a breakfast taco, then the next morning)
const morning = (x, t) => { sky(x, '#ffc58a', '#fff0d0', FLOOR + 60); sun(x, 880, 300, 70); skyline(x, FLOOR + 60, t, { col: '#c87a6a', lit: '#ffe0a0', alpha: 0.5 }); ground(x, '#b8a890') }
const TACO = (x, P, id, dx = 0.6, s = 1.5) => { const [cx, cy, sz] = P.at(id); taco(x, cx + sz * dx, cy + sz * 0.1, s) }
const hst094 = story({
  hook: 'You asked Taurus | for a bite', key: 'G',
  close: 'Save me a bite. Jan 9.', stars: ['taurus', 'aquarius', 'pisces', 'cancer'],
  scenes: [
    { dur: 3.6, title: '7AM · THE TACO TRUCK', set: (x, t) => { morning(x, t); tacoTruck(x, 660, FLOOR + 60, t) }, front: (x, t, lt, P) => TACO(x, P, 'taurus'),
      cast: { taurus: [[0, 300, 1230, 270]] }, mood: { taurus: 'heart' }, hops: { taurus: [0.02, 0.4] },
      lines: [[0.3, 1.5, 'taurus', 'good morning. | this is MY taco.']] },
    { dur: 3.6, set: (x, t) => { morning(x, t); tacoTruck(x, 660, FLOOR + 60, t) }, front: (x, t, lt, P) => TACO(x, P, 'taurus'),
      cast: { taurus: [[0, 300, 1230, 260]], aquarius: [[0, 800, 1230, 230]] }, mood: { taurus: 'happy', aquarius: 'sparkle' },
      lines: [[0.3, 1.5, 'aquarius', 'ooh. can I | get one bite?']] },
    { dur: 3.6, set: (x, t, lt) => { morning(x, t); tacoTruck(x, 660, FLOOR + 60, t); x.fillStyle = 'rgba(40,20,60,0.25)'; x.fillRect(0, 0, 1080, 1920) }, front: (x, t, lt, P) => TACO(x, P, 'taurus'),
      cast: { taurus: [[0, 300, 1230, 300]], aquarius: [[0, 800, 1230, 230]] }, mood: { taurus: 'wide', aquarius: 'wide' },
      stick: [[0.1, 3.0, 'SLOW MOTION', BONE]], lines: [[0.5, 2.6, 'taurus', 'nooooooooo.']], sfx: [SFX.womp(0.5)] },
    { dur: 3.6, set: (x, t) => { morning(x, t); tacoTruck(x, 660, FLOOR + 60, t) }, front: (x, t, lt, P) => TACO(x, P, 'taurus', -0.6, 0.6),
      cast: { taurus: [[0, 300, 1230, 260]], aquarius: [[0, 800, 1230, 230]] }, mood: { taurus: 'wink', aquarius: 'eyeroll' }, look: { taurus: [1, -1] },
      lines: [[0.3, 1.4, 'taurus', 'what taco?'], [1.9, 1.6, 'aquarius', "it's fine. | ...it's fine."]] },
    { dur: 3.4, set: (x, t) => { morning(x, t); tacoTruck(x, 660, FLOOR + 60, t) }, cast: { aquarius: [[0, 700, 1230, 220], [1.6, 1300, 1230, 220]], pisces: [[0, 240, 1300, 170]] }, mood: { aquarius: 'neutral', pisces: 'heart' },
      lines: [[0.3, 1.5, 'pisces', 'that was | so sad.']], sfx: [SFX.womp(0.2)] },
    { dur: 3.8, title: 'THE NEXT MORNING', set: (x, t) => porch(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('taurus'); box(x, cx + s * 0.35, cy - s * 0.05, 90, 110, '#c9a478', 5) },
      cast: { taurus: [[0, 260, 1250, 240]], aquarius: [[0, 760, 1250, 230]] }, mood: { taurus: 'happy', aquarius: 'wide' },
      lines: [[0.4, 1.4, 'aquarius', 'Taurus? | at my door?'], [2.0, 1.6, 'taurus', 'two tacos. | one is yours.']], sfx: [SFX.ding(2.0)] },
    { dur: 3.8, set: (x, t, lt) => { porch(x, t); taco(x, 640, 1100, 1.8); if (lt > 1.8) hearts(x, t, 540, 1000, t - lt + 1.8, { n: 8, spread: 260 }) },
      cast: { taurus: [[0, 260, 1250, 240]], aquarius: [[0, 760, 1250, 230]] }, mood: { taurus: 'sparkle', aquarius: lt => lt > 1.8 ? 'heart' : 'wide' },
      lines: [[0.3, 1.6, 'taurus', 'flour. extra salsa. | right?'], [2.0, 1.6, 'aquarius', 'you | remembered?']] },
    { dur: 3.4, set: (x, t) => porch(x, t), front: (x, t, lt, P) => TACO(x, P, 'taurus'), cast: { taurus: [[0, 260, 1250, 240]], aquarius: [[0, 760, 1250, 230]] }, mood: { taurus: 'wink', aquarius: 'happy' }, hops: { aquarius: [1.8, 2.1] },
      lines: [[0.3, 2.6, 'taurus', '...still not | sharing mine.']], sfx: [SFX.boing(1.8)] },
  ],
  lesson: { lines: ['Love is remembering', 'the little things.', 'Like their taco order.'], cast: { taurus: [[0, 330, 1370, 190]], aquarius: [[0, 750, 1370, 190]] }, mood: { taurus: 'heart', aquarius: 'heart' }, line: ['taurus', 'one bite. | ONE.'] },
})

// ── hst095 · Libra is picking where we eat (Bellaire Blvd, around the world on one street)
const blvd = (x, t, signs, dark = 0) => { bellaire(x, t, { signs }); for (let i = 0; i < dark; i++) box(x, i * 270 + 24, 560, 222, 120, '#0b0820', 5) }
const hst095 = story({
  hook: 'Libra is picking | where we eat', key: 'F',
  close: "Say what you want. Jan 9.", stars: ['libra', 'leo', 'sagittarius', 'pisces'],
  scenes: [
    { dur: 3.6, title: 'BELLAIRE BLVD · 8PM', set: (x, t) => blvd(x, t, ['PHO', 'BOBA', 'HOT POT', 'BBQ']), cast: { libra: [[0, 540, 1240, 270]] }, mood: { libra: 'sparkle' }, hops: { libra: [0.02, 0.4] },
      lines: [[0.3, 1.5, 'libra', 'you pick! | no wait.'], [2.0, 1.4, 'libra', "I'll pick."]] },
    { dur: 3.6, set: (x, t) => blvd(x, t, ['PHO', 'BOBA', 'HOT POT', 'BBQ']), cast: { libra: [[0, 160, 1240, 230], [0.2, 200, 1240, 230]] }, mood: { libra: 'squint' }, look: { libra: [0, -1] },
      lines: [[0.4, 2.4, 'libra', "pho? | but it's 80 degrees."]] },
    { dur: 3.6, set: (x, t) => blvd(x, t, ['PHO', 'BOBA', 'HOT POT', 'BBQ']), cast: { libra: [[0, 200, 1240, 230], [0.4, 420, 1240, 230]] }, mood: { libra: 'squint' }, look: { libra: [0, -1] },
      lines: [[0.6, 2.4, 'libra', "boba isn't | dinner. is it?"]] },
    { dur: 3.6, set: (x, t) => blvd(x, t, ['PHO', 'BOBA', 'HOT POT', 'BBQ']), cast: { libra: [[0, 420, 1240, 230], [0.4, 680, 1240, 230]] }, mood: { libra: 'wide' }, look: { libra: [0, -1] },
      lines: [[0.6, 2.4, 'libra', 'hot pot is | a commitment.']] },
    { dur: 3.8, set: (x, t, lt) => { blvd(x, t, ['PHO', 'BOBA', 'HOT POT', 'BBQ'], Math.min(4, Math.floor(lt / 0.6))); label(x, 540, 900, '10:58 PM', 1, { size: 60, bg: BRAKE, color: BONE, font: MONO, weight: 700, rot: 0 }) },
      cast: { libra: [[0, 540, 1240, 250]] }, mood: { libra: 'wide' },
      lines: [[0.3, 1.6, YOU(), 'Libra. | it\'s almost 11.'], [2.1, 1.4, 'libra', 'oh no.']], sfx: [SFX.womp(2.1), SFX.thud(0.6), SFX.thud(1.2), SFX.thud(1.8)] },
    { dur: 3.8, set: (x, t) => blvd(x, t, ['PHO', 'BOBA', 'HOT POT', 'BBQ'], 4), cast: { libra: [[0, 540, 1240, 250]] }, mood: { libra: lt => lt > 2 ? 'squint' : 'neutral' },
      lines: [[0.2, 1.8, YOU(), 'what do YOU | want? honestly.'], [2.2, 1.4, 'libra', '...honestly?']], sfx: [SFX.cricket(1.0)] },
    { dur: 3.8, set: (x, t, lt) => { blvd(x, t, ['PHO', 'BOBA', 'HOT POT', 'DUMPLINGS'], 3); label(x, 540, 900, 'OPEN LATE', Kp(lt, 1.6), { size: 50, bg: MINT, font: MONO, weight: 700 }) },
      cast: { libra: [[0, 540, 1240, 260]] }, mood: { libra: lt => lt > 1.6 ? 'heart' : 'happy' }, hops: { libra: [1.6, 2.0] },
      lines: [[0.2, 1.4, 'libra', 'dumplings.'], [1.7, 1.9, 'libra', 'I ALWAYS | want dumplings.']], sfx: [SFX.ding(1.6)] },
    { dur: 3.6, set: (x, t, lt) => { kitchen(x, t, { wall: '#ffe8c8', tile: '#ff9a8a' }); table(x, 540, 640, 1240); bowl(x, 460, 1210, 0.7); bowl(x, 640, 1210, 0.7); steam(x, 550, 1150, t); hearts(x, t, 540, 950, t - lt + 0.8, { n: 6 }) },
      cast: { libra: [[0, 300, 1150, 240]] }, mood: { libra: 'heart' }, lines: [[0.4, 2.6, 'libra', 'best dinner | of my LIFE.']] },
  ],
  lesson: { lines: ['Say what you want.', "They can't", 'read your mind.'], cast: { libra: [[0, 540, 1370, 200]] }, mood: { libra: 'sparkle' }, line: ['libra', 'dessert? | ...boba.'] },
})

// ── hst096 · Aquarius planned a silent date (a very quiet chapel in Montrose)
const hst096 = story({
  hook: 'Gemini on | a silent date', key: 'Db',
  close: 'Then come be loud. Jan 9.', stars: ['aquarius', 'gemini', 'pisces', 'virgo'],
  scenes: [
    { dur: 3.6, title: 'MONTROSE · 4PM', set: (x, t) => night(x, t), cast: { aquarius: [[0, 330, Y, 260]], gemini: [[0, 760, Y, 240]] }, mood: { aquarius: 'sleepy', gemini: 'sparkle' }, hops: { gemini: [0.02, 0.3, 0.6, 0.9] },
      lines: [[0.3, 1.5, 'aquarius', "you'll love this. | it's very quiet."], [2.1, 1.4, 'gemini', 'quiet? | like... how quiet?']] },
    { dur: 3.6, set: (x, t) => chapel(x, t), cast: { aquarius: [[0, 360, 1240, 240]], gemini: [[0, 720, 1240, 230]] }, mood: { aquarius: 'sleepy', gemini: 'wide' },
      lines: [[0.4, 1.4, 'gemini', 'so we just... | sit?'], [2.0, 1.2, 'aquarius', 'shh.']] },
    { dur: 3.6, set: (x, t) => chapel(x, t), cast: { aquarius: [[0, 360, 1240, 240]], gemini: [[0, 720, 1240, 230]] }, mood: { aquarius: 'sleepy', gemini: 'wide' }, look: { gemini: [1, 0] },
      stick: [[0.2, 3.0, '*silence*', BONE]], sfx: [SFX.cricket(0.5), SFX.cricket(1.3), SFX.cricket(2.1)] },
    { dur: 3.6, set: (x, t) => chapel(x, t), front: (x, t) => sweat(x, 800, 1080, t, 3), cast: { aquarius: [[0, 360, 1240, 240]], gemini: [[0, 720, 1240, 230]] }, mood: { aquarius: 'sleepy', gemini: 'squint' },
      lines: [[0.3, 1.5, 'gemini', '*whispers* | is this a test?'], [2.0, 1.2, 'aquarius', 'shh.']] },
    { dur: 3.4, set: (x, t) => chapel(x, t), cast: { aquarius: [[0, 360, 1240, 240]], gemini: [[0, 720, 1240, 230]], pisces: [[0, 930, 1170, 150]] }, mood: { aquarius: 'sleepy', gemini: 'wide', pisces: 'heart' },
      stick: [[0.2, 2.8, 'PISCES IS CRYING. SILENTLY.', LAV]] },
    { dur: 3.8, set: (x, t) => chapel(x, t), cast: { aquarius: [[0, 360, 1240, 240]], gemini: [[0, 720, 1240, 230]] }, mood: { aquarius: 'sleepy', gemini: lt => lt > 1.4 ? 'sleepy' : 'neutral' },
      stick: [[0.2, 1.2, 'MINUTE 9', GOLD]], lines: [[2.0, 1.6, 'gemini', '...oh.']], sfx: [SFX.gasp(2.0)] },
    { dur: 3.8, set: (x, t) => night(x, t), cast: { aquarius: [[0, 330, Y, 250]], gemini: [[0, 760, Y, 240]] }, mood: { aquarius: 'happy', gemini: 'sparkle' }, hops: { gemini: [2.0, 2.2, 2.4, 2.6] },
      lines: [[0.3, 1.5, 'aquarius', 'you were | so quiet.'], [2.0, 1.6, 'gemini', 'I KNOW!! | it was SO good!']] },
    { dur: 3.4, set: (x, t, lt) => { night(x, t); hearts(x, t, 540, 1000, t - lt + 0.6, { n: 8 }) }, cast: { aquarius: [[0, 330, Y, 250]], gemini: [[0, 760, Y, 240]] }, mood: { aquarius: 'heart', gemini: 'heart' },
      lines: [[0.3, 2.6, 'gemini', 'can we come | back next week?']] },
  ],
  lesson: { lines: ['Comfortable', 'silence is a', 'green flag.'], cast: { aquarius: [[0, 330, 1370, 190]], gemini: [[0, 750, 1370, 190]] }, mood: { aquarius: 'sleepy', gemini: 'heart' }, line: ['gemini', '...'] },
})

// ── hst097 · Sag said it's 20 minutes away (Houston is an hour from Houston)
const drive = (x, t, sign, sub, k = 1) => { sky(x, '#8fd0ff', '#e8f6ff', FLOOR - 160); skyline(x, FLOOR - 150, t, { col: '#5a6f9a', lit: '#ffe39a', alpha: 0.45 }); freeway(x, FLOOR - 160, 600, 4, t * 380); if (sign) overheadSign(x, 540, 760, sign, sub, k) }
const sagCar = (x, t, lt) => car(x, 540, FLOOR + 120, '#f2b544', { open: true })
const hst097 = story({
  hook: 'Do not ask Sag | how far it is', key: 'A',
  close: 'Only 20 minutes away. Jan 9.', stars: ['sagittarius', 'cancer', 'leo', 'pisces'],
  scenes: [
    { dur: 3.6, set: (x, t) => drive(x, t, 'THE PLACE', '20 MIN (SAG SAYS)'), front: (x, t, lt) => sagCar(x, t, lt), cast: { sagittarius: [[0, 520, FLOOR + 5, 210]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.02, 0.35, 0.7] },
      lines: [[0.3, 1.5, 'sagittarius', 'you\'ll love it. | 20 minutes.'], [2.0, 1.4, 'sagittarius', 'tops.']] },
    { dur: 3.6, set: (x, t, lt) => drive(x, t, 'SUGAR LAND', 'NEXT EXIT', Kp(lt, 0.1)), front: (x, t, lt) => sagCar(x, t, lt), cast: { sagittarius: [[0, 520, FLOOR + 5, 210]] }, mood: { sagittarius: 'happy' },
      stick: [[0.2, 1.4, 'MINUTE 35', GOLD]], lines: [[1.8, 1.6, 'sagittarius', 'almost | there!']] },
    { dur: 3.8, set: (x, t, lt) => drive(x, t, 'KATY', 'KEEP LEFT', Kp(lt, 0.1)), front: (x, t, lt) => sagCar(x, t, lt), cast: { sagittarius: [[0, 520, FLOOR + 5, 210]] }, mood: { sagittarius: lt => lt > 1.8 ? 'wink' : 'happy' },
      stick: [[0.2, 1.4, 'MINUTE 50', GOLD]], lines: [[0.4, 1.4, YOU(1420), 'Sag. | this is Katy.'], [2.0, 1.6, 'sagittarius', "it's still | Houston!"]], sfx: [SFX.womp(0.4)] },
    { dur: 3.4, set: (x, t) => { drive(x, t); }, front: (x, t, lt) => sagCar(x, t, lt), cast: { sagittarius: [[0, 520, FLOOR + 5, 210]], cancer: [[0, 900, 1000, 160]] }, mood: { sagittarius: 'happy', cancer: 'heart' }, hops: { cancer: [0.3, 0.6, 0.9, 1.2] },
      lines: [[0.3, 2.2, 'cancer', 'hiii! | (the Katy cousin)']] },
    { dur: 3.8, set: (x, t) => drive(x, t), front: (x, t, lt) => { sagCar(x, t, lt); notes(x, t, 540, 1100, { n: 5, cell: 7 }) }, cast: { sagittarius: [[0, 520, FLOOR + 5, 210]] }, mood: { sagittarius: 'sparkle' },
      lines: [[0.3, 1.6, YOU(1420), 'okay. | playlist trade.'], [2.0, 1.6, 'sagittarius', 'THIS song?? | I love it!']], sfx: [SFX.pluck(0.3, 659), SFX.pluck(0.6, 784), SFX.pluck(0.9, 988)] },
    { dur: 3.8, set: (x, t, lt) => { drive(x, t); hearts(x, t, 540, 1000, t - lt, { n: 8 }) }, front: (x, t, lt) => { sagCar(x, t, lt); notes(x, t, 540, 1100, { n: 6, cell: 8 }) }, cast: { sagittarius: [[0, 520, FLOOR + 5, 210]] }, mood: { sagittarius: 'heart' }, hops: { sagittarius: [0.3, 0.8, 1.3, 1.8, 2.3] },
      stick: [[0.2, 1.6, 'MINUTE 70 (WHO CARES)', PINK]], lines: [[2.0, 1.6, YOU(1420), 'okay this | is fun.']] },
    { dur: 3.8, set: (x, t) => { night(x, t); coffeeShop(x, 540, FLOOR + 60, true) }, cast: { sagittarius: [[0, 200, Y, 230]] }, mood: { sagittarius: 'wide' },
      lines: [[0.3, 1.4, 'sagittarius', "we're here!"], [2.0, 1.6, 'sagittarius', "...it's | closed."]], sfx: [SFX.womp(2.0)] },
    { dur: 3.6, set: (x, t, lt) => { night(x, t); car(x, 540, FLOOR + 120, '#f2b544', { open: true }); sparkles(x, t, 540, 1000, t - lt, 10, 300, 3) }, cast: { sagittarius: [[0, 520, FLOOR + 5, 210]] }, mood: { sagittarius: 'heart' },
      lines: [[0.3, 1.4, YOU(1420), 'best drive | ever.'], [1.9, 1.6, 'sagittarius', 'next week? | only 40 min.']] },
  ],
  lesson: { lines: ['The ride counts too.', 'Enjoy the', 'in-between.'], cast: { sagittarius: [[0, 540, 1370, 200]] }, mood: { sagittarius: 'heart' }, line: ['sagittarius', '20 minutes. | promise.'] },
})

// ── hst098 · Gemini said yes to everything this Saturday
const sched = (x, lt, k = 1) => { if (k <= 0) return; x.save(); x.translate(500, 860); x.scale(k * 0.85, k * 0.85); box(x, -340, -300, 680, 600, BONE, 8); box(x, -340, -300, 680, 80, '#c9a6ff', 0); txt(x, 'GEMINI · SATURDAY', 0, -258, { size: 36, col: INK, font: MONO, weight: 700 }); ['6AM  RUN CLUB', '10AM BRUNCH', '2PM  PICKLEBALL', '6PM  CRAWFISH', '9PM  KARAOKE', '11PM A DATE (?)'].forEach((s, i) => txt(x, s, -290, -170 + i * 80, { size: 40, col: INK, font: MONO, weight: 700, align: 'left' })); x.restore() }
const tired = ['sparkle', 'happy', 'neutral', 'sleepy']
const hst098 = story({
  hook: 'Everything Gemini | said yes to | on Saturday', key: 'E',
  close: 'One plan. Jan 9.', stars: ['gemini', 'libra', 'leo', 'pisces'],
  scenes: [
    { dur: 3.6, set: (x, t, lt) => { night(x, t); sched(x, lt) }, cast: { gemini: [[0, 820, 1300, 230]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.02, 0.3, 0.6] },
      lines: [[0.3, 1.5, 'gemini', 'you free | Saturday?'], [2.0, 1.4, 'gemini', "I'm SO | booked."]] },
    { dur: 3.4, title: '6AM · RUN CLUB', set: (x, t) => bayou(x, t), cast: { gemini: [[0, 200, 1250, 230], [3.4, 900, 1250, 230]] }, mood: { gemini: tired[0] }, props: { gemini: 'sweatband' },
      lines: [[0.8, 2.2, 'gemini', 'run club! | love this!']] },
    { dur: 3.4, title: '10AM · BRUNCH', set: (x, t) => brunchFront(x, t), cast: { gemini: [[0, 540, 1260, 240]] }, mood: { gemini: tired[1] }, props: { gemini: 'sweatband' },
      lines: [[0.8, 2.2, 'gemini', 'brunch! | love... this.']] },
    { dur: 3.4, title: '2PM · PICKLEBALL', set: (x, t) => court(x, t), front: (x, t) => sweat(x, 620, 1100, t, 4), cast: { gemini: [[0, 540, 1260, 240]] }, mood: { gemini: tired[2] }, props: { gemini: ['sweatband', 'paddle'] },
      lines: [[0.8, 2.2, 'gemini', 'pickle... | ball... yay.']] },
    { dur: 3.4, title: '6PM · CRAWFISH', set: (x, t) => crawfishTable(x, t, 0.5), cast: { gemini: [[0, 540, 1250, 240]] }, mood: { gemini: tired[3] },
      lines: [[0.8, 2.2, 'gemini', 'they\'re so small | in January...']] },
    { dur: 3.6, title: '9PM · KARAOKE', set: (x, t) => karaoke(x, t, '♪ zzz ♪', 0.3), cast: { gemini: [[0, 540, 1240, 260], [2.0, 540, 1300, 260]] }, mood: { gemini: 'sleepy' }, props: { gemini: 'mic' },
      stick: [[2.0, 1.5, 'NEXT: 11PM DATE', BRAKE]], sfx: [SFX.womp(1.9)] },
    { dur: 4.0, set: (x, t, lt) => { night(x, t); phoneChat(x, 540, 760, [[0.3, 1, 'I overbooked today. | so sorry.'], [1.4, 1, 'rain check for | Tuesday?']], lt, { title: 'GEMINI ♊' }) },
      cast: { gemini: [[0, 860, 1320, 200]] }, mood: { gemini: 'neutral' }, sfx: [SFX.pluck(0.3, 523), SFX.pluck(1.4, 659)] },
    { dur: 3.6, set: (x, t, lt) => { night(x, t); phoneChat(x, 540, 760, [[0, 1, 'I overbooked today. | so sorry.'], [0, 1, 'rain check for | Tuesday?'], [0.4, 0, 'honestly same lol. | rest up! Tuesday!']], lt, { title: 'GEMINI ♊' }) },
      cast: { gemini: [[0, 860, 1320, 200]] }, mood: { gemini: lt => lt > 1 ? 'heart' : 'wide' }, sfx: [SFX.ding(0.4)] },
    { dur: 3.6, set: (x, t, lt) => { room(x, { wall: '#3a2a5a' }); box(x, 180, 1220, 720, 140, '#c0507a', 8); box(x, 180, 1120, 720, 100, '#a0406a', 8); steam(x, 760, 1160, t) },
      cast: { gemini: [[0, 460, 1170, 250]] }, mood: { gemini: 'sleepy' }, lines: [[0.4, 2.6, 'gemini', 'a whole evening. | for ME.']] },
  ],
  lesson: { lines: ['A kind no', 'beats a', 'tired yes.'], cast: { gemini: [[0, 540, 1370, 200]] }, mood: { gemini: 'happy' }, line: ['gemini', 'one plan | per day.'] },
})

// ── hst099 · Cancer brought a sweater for you (it's 90° out; the AC inside is arctic)
const hotOut = (x, t) => { sky(x, '#ffb36b', '#ffe8b0', FLOOR + 60); heatSun(x, 860, 330, t, 90); skyline(x, FLOOR + 60, t, { col: '#c8805a', lit: '#ffe0a0', alpha: 0.5 }); ground(x, '#c8a878') }
const cold = (x, t, lt, k) => {
  room(x, { wall: '#5a7aa0', floor: '#4a5a70', trim: '#2a3a50' }); table(x, 540, 640, 1240, '#7a8aa0')
  for (let i = 0; i < 12; i++) { const L = 40 + 80 * k * (0.5 + 0.5 * Math.sin(i * 2.3)); x.fillStyle = INK; x.beginPath(); x.moveTo(40 + i * 90, 0); x.lineTo(80 + i * 90, 0); x.lineTo(60 + i * 90, L + 6); x.fill(); x.fillStyle = '#dff6ff'; x.beginPath(); x.moveTo(46 + i * 90, 0); x.lineTo(74 + i * 90, 0); x.lineTo(60 + i * 90, L); x.fill() }
  for (let i = 0; i < Math.round(30 * k); i++) { const ph = (t * 0.3 + i * 0.137) % 1; x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillRect((i * 151 + Math.sin(t + i) * 30) % 1080, ph * 1400, 8, 8) }
  box(x, 400, 300, 280, 90, '#dff6ff', 6); txt(x, 'AC: ARCTIC', 540, 346, { size: 40, col: INK, font: MONO, weight: 700 })
}
const hst099 = story({
  hook: "It's 90°. | Cancer packed | a sweater.", key: 'C',
  close: 'Bring a sweater. Jan 9.', stars: ['cancer', 'capricorn', 'pisces', 'virgo'],
  scenes: [
    { dur: 3.6, set: (x, t) => hotOut(x, t), front: (x, t) => sweat(x, 640, 1080, t, 3), cast: { cancer: [[0, 540, 1240, 280]] }, mood: { cancer: 'happy' }, props: { cancer: 'sweater' }, hops: { cancer: [0.02, 0.4] },
      lines: [[0.3, 1.5, 'cancer', "it's 90 out. | hi."], [2.0, 1.4, 'cancer', 'I brought | a sweater.']] },
    { dur: 3.6, set: (x, t) => hotOut(x, t), cast: { cancer: [[0, 540, 1240, 280]] }, mood: { cancer: 'wink' }, props: { cancer: 'sweater' },
      lines: [[0.3, 1.5, YOU(), 'Cancer. | it\'s SO hot.'], [2.0, 1.4, 'cancer', 'trust me.']] },
    { dur: 3.6, title: 'INSIDE', set: (x, t, lt) => cold(x, t, lt, clamp(lt / 3)), cast: { cancer: [[0, 300, 1150, 250]] }, mood: { cancer: 'squint' }, props: { cancer: 'sweater' },
      lines: [[0.6, 2.2, 'cancer', 'here we go.']], sfx: [SFX.gasp(0.3)] },
    { dur: 3.8, set: (x, t, lt) => cold(x, t, lt, 1), cast: { cancer: [[0, 300, 1150, 250]] }, mood: { cancer: 'happy' }, props: { cancer: 'sweater' },
      lines: [[0.3, 1.8, YOU(), 'why is it | SO cold in here?'], [2.2, 1.4, 'cancer', 'Houston AC.']] },
    { dur: 3.6, set: (x, t, lt) => cold(x, t, lt, 1), cast: { cancer: [[0, 300, 1150, 250]], capricorn: [[0, 1200, 1150, 230], [0.5, 780, 1150, 230]] }, mood: { cancer: 'eyeroll', capricorn: 'happy' }, props: { cancer: 'sweater' },
      lines: [[0.8, 2.0, 'capricorn', 'start you | with ice water?']], sfx: [SFX.womp(2.2)] },
    { dur: 3.8, set: (x, t, lt) => cold(x, t, lt, 1), cast: { cancer: [[0, 300, 1150, 250], [1.2, 480, 1150, 250]] }, mood: { cancer: 'heart' },
      lines: [[1.4, 2.2, 'cancer', 'here. | I knew.']], sfx: [SFX.ding(1.4)] },
    { dur: 3.8, set: (x, t, lt) => { cold(x, t, lt, 1); hearts(x, t, 540, 900, t - lt + 1.8, { n: 8 }) }, cast: { cancer: [[0, 480, 1150, 250]] }, mood: { cancer: lt => lt > 1.8 ? 'wink' : 'happy' }, props: { cancer: 'sweater' },
      lines: [[0.2, 1.5, YOU(), 'wait. what | about you?'], [1.9, 1.7, 'cancer', 'I brought | two.']], sfx: [SFX.boing(1.9)] },
    { dur: 3.4, set: (x, t, lt) => { cold(x, t, lt, 1); soupPot(x, 640, 1200, t) }, cast: { cancer: [[0, 300, 1150, 250]], pisces: [[0, 900, 1420, 140]] }, mood: { cancer: 'happy', pisces: 'heart' }, props: { cancer: 'sweater', pisces: 'scarf' },
      lines: [[0.3, 2.6, 'cancer', 'also soup. | always soup.']] },
  ],
  lesson: { lines: ['Notice what', 'they need', 'before they ask.'], cast: { cancer: [[0, 540, 1370, 200]] }, mood: { cancer: 'heart' }, props: { cancer: 'sweater' }, line: ['cancer', 'did you | eat?'] },
})

export const W04B = { hst093, hst094, hst095, hst096, hst097, hst098, hst099 }
