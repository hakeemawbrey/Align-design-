// Houston Star Talk · w03 stories, part C (hst077–hst085). Grammar: htxstar/w03.js (story wrapper) on starrace/ep.js.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, table } from '../starrace/ep.js'
import { label, sparkles, signChar, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { story, Y, Kp, nightSet, beach, gull, court, ball, foodTruck, museum, painting, livingRoom, pond, paddleBoat, duck, foodStreet, phone, partySet, heartPop, sunset, dayFill, tree, car, freeway, heatSun, bowl, mosquito, stringLights } from './w03.js'
import { BRAKE, HGREEN, streetSign, skyline, sweat, taco, shield, puffer as _p } from './kit.js'

// ── shared bits for part C
function raspa(x, cx, cy, col = '#ff5a8a') { x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 34, cy - 20); x.lineTo(cx + 34, cy - 20); x.lineTo(cx + 20, cy + 50); x.lineTo(cx - 20, cy + 50); x.fill(); x.fillStyle = BONE; x.beginPath(); x.moveTo(cx - 28, cy - 16); x.lineTo(cx + 28, cy - 16); x.lineTo(cx + 16, cy + 44); x.lineTo(cx - 16, cy + 44); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy - 22, 38, Math.PI, 0); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy - 22, 32, Math.PI, 0); x.fill() }
function scoreTag(x, a, b, k = 1) { label(x, 540, 640, a + '  ·  ' + b, k, { size: 50, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) }
function door(x, cx, base, col = '#7a8290', n = 0) {
  box(x, cx - 110, base - 520, 220, 520, col, 6); x.fillStyle = '#6a7280'; for (let k = 0; k < 6; k++) x.fillRect(cx - 110, base - 500 + k * 80, 220, 6)
  box(x, cx - 50, base - 200, 100, 200, '#3a3f4a', 5); box(x, cx - 70, base - 440, 140, 100, '#bfe6ff', 5)
}
function townhomes(x, t) { dayFill(x, '#9fd8ff', '#ffe8c0', FLOOR + 60); for (let k = 0; k < 5; k++) door(x, 110 + k * 215, FLOOR + 60); x.fillStyle = '#9a9a9a'; x.fillRect(0, FLOOR + 60, 1080, 600) }
function rooftop(x, t, smoke = 0) {
  sunset(x, '#ffb36b', '#d9708c', '#3a2a6a', 1200); skyline(x, 1150, t, { alpha: 0.9 })
  x.fillStyle = '#5a5a6a'; x.fillRect(0, 1150, 1080, 770); for (let k = 0; k < 12; k++) box(x, 20 + k * 90, 1080, 10, 90, '#c9c9d6', 2); box(x, 0, 1076, 1080, 10, '#c9c9d6', 3)
  stringLights(x, t, 330)
  if (smoke > 0) for (let k = 0; k < 6; k++) { const ph = (t * 0.5 + k / 6) % 1; x.fillStyle = `rgba(80,80,90,${(0.6 * smoke * (1 - ph)).toFixed(2)})`; x.beginPath(); x.arc(880 + Math.sin(t + k) * 30, 1000 - ph * 600, 40 + ph * 60, 0, Math.PI * 2); x.fill() }
  box(x, 820, 1080, 130, 120, '#2a2a2a', 6); box(x, 800, 1060, 170, 24, '#4a4a4a', 5)
}
const coldSet = (x, t) => { dayFill(x, '#8a9ab0', '#c9d2dc', FLOOR + 60); skyline(x, 1100, t, { alpha: 0.5, lit: '#ffe9a8' }); x.fillStyle = '#4a4a5a'; x.fillRect(0, FLOOR + 60, 1080, 600) }
const warmSet = (x, t) => { dayFill(x, '#8fd3ff', '#fff0c0', FLOOR + 60); heatSun(x, 880, 330, t, 80); skyline(x, 1100, t, { alpha: 0.5 }); x.fillStyle = '#5a9a4a'; x.fillRect(0, FLOOR + 60, 1080, 600) }

// ── hst077 · Sag took you to Galveston for the sunset
const gal = (sky) => (x, t) => beach(x, t, sky ? { sky } : undefined)
const GOLDEN = ['#ffb04a', '#ff7a6a', '#5a3a8a']
const galv = {
  hook: 'Sag took you | to Galveston | for the sunset', key: 'A',
  closing: 'Jan 9. Good company, guaranteed.', endStars: ['sagittarius', 'taurus', 'pisces', 'cancer'],
  lesson: ["It's not the place.", "It's the company."],
  lessonSet: gal(GOLDEN), lessonCast: { sagittarius: [[0, 330, Y + 80, 210]], taurus: [[0, 750, Y + 80, 210]] }, lessonMood: { sagittarius: 'heart', taurus: 'heart' },
  scenes: [
    { dur: 3.6, set: gal(), front: (x, t) => gull(x, 300 + Math.sin(t) * 200, 520, t, 1.4), cast: { sagittarius: [[0, 540, Y + 80, 290]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.05, 0.4, 0.75] },
      lines: [[0.6, 2.7, 'sagittarius', 'Grab a towel. | Beach day, you!']] },
    { dur: 3.8, set: (x, t) => { dayFill(x, '#8fd3ff', '#fff0c0', 1920); freeway(x, 1100, 420, 3, t * 400); shield(x, 880, 760, '45', 1.1) }, front: (x) => car(x, 540, 1330, '#ff9a3c', { open: true, s: 1.2 }),
      cast: { sagittarius: [[0, 600, 1190, 170]], taurus: [[0, 470, 1190, 170]] }, mood: { sagittarius: 'happy', taurus: 'squint' },
      lines: [[0.2, 1.5, 'taurus', 'An HOUR | for a beach?'], [1.9, 1.7, 'sagittarius', "Houston is an | hour from Houston."]] },
    { dur: 3.8, set: gal(), cast: { sagittarius: [[0, 330, Y + 80, 240]], taurus: [[0, 750, Y + 80, 240]] }, mood: { sagittarius: 'sparkle', taurus: 'wide' }, sfx: [[0.6, 'womp']],
      lines: [[0.4, 1.4, 'taurus', "It's... | brown."], [2.0, 1.6, 'sagittarius', "It's ROMANTIC | brown."]] },
    { dur: 3.8, set: gal(), front: (x, t, lt, P) => { const p = clamp((lt - 0.5) / 1.4); const [cx, cy, s] = P.at('taurus'); if (p < 0.05) taco(x, cx - s * 0.5, cy + 20, 1.1); else { gull(x, cx - s * 0.5 + p * 700, cy - p * 700, t, 1.5); taco(x, cx - s * 0.5 + p * 700, cy + 20 - p * 700, 0.9) } },
      cast: { sagittarius: [[0, 330, Y + 80, 240]], taurus: [[0, 750, Y + 80, 240]] }, mood: { sagittarius: 'wide', taurus: 'wide' }, sfx: [[0.5, 'whoosh']],
      lines: [[1.6, 1.0, 'taurus', 'My TACO.'], [2.7, 1.0, 'sagittarius', 'He needed it.']] },
    { dur: 3.6, set: gal(), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('taurus'); sweat(x, cx + s * 0.35, cy - s * 0.35, t, 3) }, cast: { sagittarius: [[0, 330, Y + 80, 240]], taurus: [[0, 750, Y + 80, 240]] }, mood: { sagittarius: 'happy', taurus: 'eyeroll' },
      lines: [[0.2, 1.4, 'sagittarius', 'Give it | till sunset.'], [1.9, 1.5, 'taurus', "It's 4 PM."]] },
    { dur: 3.8, set: gal(GOLDEN), cast: { sagittarius: [[0, 330, Y + 80, 240]], taurus: [[0, 750, Y + 80, 240]] }, mood: { sagittarius: 'happy', taurus: lt => lt < 1.4 ? 'neutral' : 'sparkle' }, look: { taurus: [0, -1] },
      stick: [[0.1, 1.2, '6:12 PM', GOLD]], lines: [[1.5, 2.1, 'taurus', '...okay. | That IS pretty.']] },
    { dur: 3.8, set: gal(['#ff9a4a', '#e0607a', '#3a2a6a']), front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 1.6), cast: { sagittarius: [[0, 400, Y + 80, 240]], taurus: [[0, 680, Y + 80, 240]] }, mood: { sagittarius: 'heart', taurus: 'heart' }, sfx: [[1.6, 'ding']],
      lines: [[0.2, 1.5, 'taurus', 'Honestly? | Perfect day.'], [1.9, 1.5, 'sagittarius', 'Told you.']] },
    { dur: 3.2, set: gal(['#ff9a4a', '#e0607a', '#3a2a6a']), cast: { sagittarius: [[0, 400, Y + 80, 240]], taurus: [[0, 680, Y + 80, 240]] }, mood: { sagittarius: 'sparkle', taurus: 'wink' },
      lines: [[0.2, 1.3, 'sagittarius', 'Again next | summer?'], [1.6, 1.4, 'taurus', "It's 80° now. | Next week."]] },
  ],
}

// ── hst078 · Aries lost at pickleball to you
const P78 = { aries: ['paddle'], libra: ['paddle'] }
const ct = (x, t) => court(x, t)
const pickle = {
  hook: 'Aries lost | at pickleball | to you', key: 'C',
  closing: 'Jan 9. Bring your A game.', endStars: ['aries', 'libra', 'leo', 'virgo'],
  lesson: ['How they lose', "shows how they'll love."],
  lessonSet: ct, lessonCast: { aries: [[0, 330, Y, 210]], libra: [[0, 750, Y, 210]] }, lessonMood: { aries: 'heart', libra: 'heart' }, lessonWear: P78,
  scenes: [
    { dur: 3.6, set: ct, front: (x, t, lt) => ball(x, 540 + Math.sin(lt * 5) * 380, 900 - Math.abs(Math.cos(lt * 5)) * 200), cast: { aries: [[0, 540, Y, 290]] }, mood: { aries: 'squint' }, hops: { aries: [0.05, 0.4] }, wear: { aries: ['paddle', ['sweatband', BRAKE]] }, sfx: [[0.1, 'blip', 880], [0.7, 'blip', 1046.5]],
      lines: [[0.6, 2.7, 'aries', 'You. Me. | Pickleball.']] },
    { dur: 3.6, set: ct, front: (x, t, lt) => ball(x, 540 + Math.sin(lt * 4) * 300, 1000 - Math.abs(Math.cos(lt * 4)) * 260), cast: { aries: [[0, 250, Y, 230]], libra: [[0, 830, Y, 230]] }, mood: { aries: 'squint', libra: 'happy' }, wear: { aries: ['paddle', ['sweatband', BRAKE]], libra: ['paddle'] },
      lines: [[0.3, 2.6, 'aries', "I don't play | for FUN."]] },
    { dur: 3.8, set: ct, cast: { aries: [[0, 250, Y, 230]], libra: [[0, 830, Y, 230]] }, mood: { aries: 'wide', libra: 'sparkle' }, wear: { aries: ['paddle', ['sweatband', BRAKE]], libra: ['paddle'] },
      stick: [[0.1, 3.6, 'LIBRA 9 · ARIES 2', GOLD]], lines: [[0.6, 1.3, 'libra', 'Good shot!'], [2.1, 1.6, 'aries', "Don't be NICE | to me."]] },
    { dur: 3.6, set: ct, front: (x, t, lt) => { const p = clamp(lt / 0.9); ball(x, 830 - p * 900, 1000 - Math.sin(Math.PI * p) * 200) }, cast: { aries: [[0, 250, Y, 230], [0.8, 250, Y + 120, 230]], libra: [[0, 830, Y, 230]] }, mood: { aries: 'sleepy', libra: 'wide' }, wear: { aries: ['paddle', ['sweatband', BRAKE]], libra: ['paddle'] }, sfx: [[0.8, 'thud'], [1.0, 'womp']],
      stick: [[1.2, 2.2, 'GAME: LIBRA', MINT]] },
    { dur: 3.6, set: ct, cast: { aries: [[0, 250, Y + 120, 230]], libra: [[0, 830, Y, 230], [1.4, 520, Y, 230]] }, mood: { aries: 'sleepy', libra: 'happy' }, wear: { aries: [['sweatband', BRAKE]], libra: ['paddle'] }, sfx: [[0.1, 'crickets']],
      lines: [[1.7, 1.7, 'libra', 'You okay?']] },
    { dur: 3.8, set: ct, cast: { aries: [[0, 250, Y + 120, 230], [0.6, 260, Y, 230]], libra: [[0, 520, Y, 230]] }, mood: { aries: 'happy', libra: lt => lt < 1.8 ? 'wide' : 'sparkle' }, hops: { aries: [0.6] }, wear: { aries: [['sweatband', BRAKE]], libra: ['paddle'] },
      lines: [[0.8, 2.6, 'aries', 'Good game. | Seriously.']] },
    { dur: 3.8, set: ct, front: (x, t, lt) => heartPop(x, t, lt, 400, 1000, 1.8), cast: { aries: [[0, 260, Y, 230]], libra: [[0, 520, Y, 230]] }, mood: { aries: 'sparkle', libra: 'heart' }, wear: { aries: [['sweatband', BRAKE]], libra: ['paddle'] }, sfx: [[1.8, 'ding']],
      lines: [[0.2, 1.5, 'aries', 'Teach me | that backhand?'], [1.9, 1.7, 'libra', 'If you buy | the raspas.']] },
    { dur: 3.2, set: (x, t) => { dayFill(x, '#ffb38a', '#ffe3b0', FLOOR + 60); tree(x, 540, 1150, 1.2, '#2f6a3a', t); x.fillStyle = '#5a9a4a'; x.fillRect(0, FLOOR + 60, 1080, 600); box(x, 180, 1330, 720, 30, '#8a5530', 6) },
      front: (x, t, lt, P) => { for (const [id, col] of [['aries', '#ff5a8a'], ['libra', '#5ec8ff']]) { const [cx, cy, s] = P.at(id); raspa(x, cx + s * 0.5, cy + 10, col) } },
      cast: { aries: [[0, 360, Y, 230]], libra: [[0, 700, Y, 230]] }, mood: { aries: 'heart', libra: 'happy' },
      lines: [[0.2, 1.2, 'aries', 'Rematch?'], [1.6, 1.4, 'libra', 'Next week.']] },
  ],
}

// ── hst079 · The aunties met your date at the taco truck
const GL = { cancer: ['glasses'], taurus: ['glasses'] }
const tr = (x, t) => foodTruck(x, t, { col: '#3aa0b0', word: 'TACOS', menu: ['FLOUR', 'CORN', 'BEAN & CHEESE', 'MIGAS'] })
const AU = { cancer: [[0, 200, Y + 40, 230]], taurus: [[0, 430, Y + 40, 230]], aquarius: [[0, 840, Y + 40, 230]] }
const bag = (x, cx, cy, k = 1) => { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -60, -70, 120, 140, '#c9a77a', 6); x.fillStyle = '#a8865a'; x.fillRect(-60, -70, 120, 20); x.restore() }
const truck = {
  hook: 'The aunties met | your date at | the taco truck', key: 'G',
  closing: 'Jan 9. The aunties approve.', endStars: ['cancer', 'taurus', 'aquarius', 'pisces'],
  lesson: ['Listening is', 'a love language.'],
  lessonSet: tr, lessonCast: { cancer: [[0, 240, Y + 40, 200]], taurus: [[0, 540, Y + 40, 200]], aquarius: [[0, 840, Y + 40, 200]] }, lessonMood: { cancer: 'heart', taurus: 'heart', aquarius: 'happy' }, lessonWear: GL,
  scenes: [
    { dur: 3.6, set: tr, cast: { cancer: [[0, 330, Y + 40, 300]], taurus: [[0, 750, Y + 40, 300]] }, mood: { cancer: 'squint', taurus: 'squint' }, hops: { cancer: [0.05], taurus: [0.15] }, wear: GL,
      lines: [[0.5, 2.8, 'cancer', 'So THIS is | your date?']] },
    { dur: 3.8, set: tr, cast: AU, mood: { cancer: 'squint', taurus: 'squint', aquarius: 'happy' }, hops: { aquarius: [0.2] }, wear: GL,
      lines: [[0.3, 1.4, 'taurus', 'Flour | or corn?'], [2.0, 1.6, 'aquarius', 'Both?']] },
    { dur: 3.6, set: tr, cast: AU, mood: { cancer: 'wide', taurus: 'squint', aquarius: 'happy' }, wear: GL, sfx: [[0.2, 'scratch']],
      lines: [[0.3, 1.4, 'cancer', 'BOTH?? | Indecisive.'], [1.9, 1.4, 'taurus', 'Hmm. Noted.']] },
    { dur: 3.8, set: tr, cast: AU, mood: { cancer: 'squint', taurus: 'squint', aquarius: 'neutral' }, look: { cancer: [1, 0], taurus: [-1, 0] }, wear: GL,
      lines: [[0.2, 1.5, 'taurus', 'Do you pay | or split?'], [1.9, 1.7, 'aquarius', 'Whatever | they want.']] },
    { dur: 3.6, set: tr, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aquarius'); bag(x, cx - s * 0.6, cy + 10, Kp(lt, 0.3)) }, cast: AU, mood: { cancer: 'wide', taurus: 'wide', aquarius: 'sparkle' }, wear: GL, sfx: [[0.3, 'pop', 784]],
      lines: [[0.4, 2.8, 'aquarius', 'I ordered | for you two.']] },
    { dur: 3.8, set: tr, front: (x, t, lt) => { taco(x, 220, 1000, 1.3); taco(x, 450, 1000, 1.3) }, cast: AU, mood: { cancer: 'sparkle', taurus: 'wide', aquarius: 'happy' }, wear: GL,
      lines: [[0.2, 1.5, 'cancer', 'Bean and cheese? | My favorite?'], [1.9, 1.7, 'aquarius', 'They told me | you love it.']] },
    { dur: 3.8, set: tr, front: (x, t, lt) => heartPop(x, t, lt, 330, 1000, 0.5), cast: { ...AU, pisces: [[0, 640, 960, 140]] }, mood: { cancer: 'heart', taurus: 'heart', aquarius: 'happy', pisces: 'heart' }, hops: { cancer: [0.5], taurus: [0.6] }, wear: GL, sfx: [[0.5, 'cheer']],
      lines: [[0.6, 1.4, 'taurus', 'They LISTEN | to you.'], [2.2, 1.4, 'cancer', 'Keep | this one.']] },
    { dur: 3.2, set: tr, cast: AU, mood: { cancer: 'happy', taurus: 'wink', aquarius: 'sparkle' }, wear: GL,
      lines: [[0.2, 2.6, 'taurus', 'Sunday lunch. | Our house.']] },
  ],
}

// ── hst080 · Your friend went quiet for a week (pho on a 60° day)
const chat = (x, t, lt, msgs) => phone(x, 540, 720, lt, msgs, { w: 560, h: 460 })
const quiet = {
  hook: 'Your friend | went quiet for | a week', key: 'B',
  closing: 'Jan 9. Bring your quiet friend.', endStars: ['aquarius', 'gemini', 'leo', 'pisces'],
  lesson: ['Space is fine.', 'Silence needs a sentence.'],
  lessonSet: (x, t) => foodStreet(x, t), lessonCast: { gemini: [[0, 220, Y, 200]], aquarius: [[0, 540, Y, 210]], leo: [[0, 860, Y, 200]] }, lessonMood: { gemini: 'heart', aquarius: 'heart', leo: 'heart' },
  scenes: [
    { dur: 3.6, set: (x, t) => foodStreet(x, t), back: (x, t, lt) => chat(x, t, lt, [['l', 'brunch?', 0], ['l', 'karaoke??', 0.3], ['l', 'hellooo', 0.6]]), cast: { gemini: [[0, 300, Y, 250]], leo: [[0, 790, Y, 250]] }, mood: { gemini: 'squint', leo: 'wide' }, hops: { gemini: [0.05], leo: [0.2] }, sfx: [[0.0, 'buzz']],
      lines: [[0.8, 2.6, 'gemini', 'You noticed too? | Aquarius is quiet.']] },
    { dur: 3.8, set: (x, t) => foodStreet(x, t), back: (x, t, lt) => chat(x, t, lt, [['l', 'brunch?', 0], ['l', 'karaoke??', 0], ['l', 'hellooo', 0], ['r', 'seen', 0.3]]), cast: { gemini: [[0, 300, Y, 250]], leo: [[0, 790, Y, 250]] }, mood: { gemini: 'neutral', leo: 'squint' }, sfx: [[0.4, 'crickets']],
      lines: [[1.4, 2.2, 'leo', 'A whole WEEK. | Just "seen."']] },
    { dur: 3.8, set: (x, t) => foodStreet(x, t), cast: { gemini: [[0, 300, Y, 250]], leo: [[0, 790, Y, 250]] }, mood: { gemini: 'squint', leo: 'sparkle' }, wear: { leo: ['crown'] },
      lines: [[0.2, 1.6, 'leo', 'Post a vague | quote about it?'], [2.0, 1.6, 'gemini', 'No. | We check in.']] },
    { dur: 3.8, set: (x, t) => { dayFill(x, '#a8b8c8', '#dfe6ee', FLOOR + 60); x.fillStyle = '#6a5a7a'; x.fillRect(0, FLOOR + 60, 1080, 600); box(x, 640, 520, 300, 820, '#4a6a8a', 8); box(x, 700, 600, 180, 180, '#bfe6ff', 5); x.fillStyle = GOLD; x.fillRect(660, 960, 20, 20) },
      front: (x, t, lt) => { bowl(x, 230, 1030, t); bowl(x, 470, 1030, t, '#c97a3a') }, cast: { gemini: [[0, 230, Y, 220]], leo: [[0, 470, Y, 220]] }, mood: { gemini: 'happy', leo: 'happy' }, wear: { leo: ['crown'] },
      stick: [[0.1, 1.6, '60° · PHO WEATHER', SKYB]], lines: [[1.8, 1.8, 'gemini', '*knock knock*']] },
    { dur: 3.8, set: (x, t) => { dayFill(x, '#a8b8c8', '#dfe6ee', FLOOR + 60); x.fillStyle = '#6a5a7a'; x.fillRect(0, FLOOR + 60, 1080, 600); box(x, 640, 520, 300, 820, '#2a2a3a', 8) },
      front: (x, t, lt) => { bowl(x, 230, 1030, t); bowl(x, 470, 1030, t, '#c97a3a') }, cast: { gemini: [[0, 230, Y, 220]], leo: [[0, 470, Y, 220]], aquarius: [[0, 790, Y, 240]] }, mood: { gemini: 'happy', leo: 'sparkle', aquarius: 'sleepy' }, wear: { leo: ['crown'] },
      lines: [[0.3, 1.2, 'aquarius', '...hi.'], [1.7, 1.8, 'leo', 'We brought | soup.']] },
    { dur: 3.8, set: (x, t) => { dayFill(x, '#a8b8c8', '#dfe6ee', FLOOR + 60); x.fillStyle = '#6a5a7a'; x.fillRect(0, FLOOR + 60, 1080, 600); box(x, 640, 520, 300, 820, '#2a2a3a', 8) },
      cast: { gemini: [[0, 230, Y, 220]], leo: [[0, 470, Y, 220]], aquarius: [[0, 790, Y, 240]] }, mood: { gemini: 'sparkle', leo: 'happy', aquarius: 'neutral' }, wear: { leo: ['crown'] },
      lines: [[0.2, 1.6, 'aquarius', "I wasn't mad. | Just tired."], [2.0, 1.6, 'gemini', 'You can | say that.']] },
    { dur: 3.8, set: (x, t) => { livingRoom(x, t, { wall: '#4a5a7a', couch: '#c9a6ff' }) }, front: (x, t, lt) => { bowl(x, 300, 1260, t); bowl(x, 540, 1260, t, '#c97a3a'); bowl(x, 780, 1260, t); heartPop(x, t, lt, 540, 900, 1.6) },
      cast: { gemini: [[0, 300, 1120, 210]], aquarius: [[0, 540, 1120, 210]], leo: [[0, 780, 1120, 210]] }, mood: { gemini: 'happy', aquarius: 'heart', leo: 'happy' }, wear: { leo: ['crown'] }, sfx: [[1.6, 'ding']],
      lines: [[0.3, 2.5, 'aquarius', "Next time | I'll say it."]] },
    { dur: 3.2, set: (x, t) => { livingRoom(x, t, { wall: '#4a5a7a', couch: '#c9a6ff' }) }, front: (x, t) => { bowl(x, 300, 1260, t); bowl(x, 540, 1260, t, '#c97a3a'); bowl(x, 780, 1260, t) },
      cast: { gemini: [[0, 300, 1120, 210]], aquarius: [[0, 540, 1120, 210]], leo: [[0, 780, 1120, 210]] }, mood: { gemini: 'wink', aquarius: 'happy', leo: 'sparkle' }, wear: { leo: ['crown'] },
      lines: [[0.2, 2.6, 'leo', "And we'll | bring the pho."]] },
  ],
}

// ── hst081 · Your date cried at every single painting (free museum night)
const mus = (a, b) => (x, t) => { museum(x, t, { wall: '#e9e2f2' }); if (a) painting(x, 540, 720, 420, 460, a, b) }
const art = {
  hook: 'Your date | cried at every | single painting', key: 'F',
  closing: 'Jan 9. Take your time.', endStars: ['pisces', 'capricorn', 'cancer', 'libra'],
  lesson: ['Slow down to', 'their speed sometimes.'],
  lessonSet: mus(), lessonCast: { capricorn: [[0, 330, Y, 210]], pisces: [[0, 750, Y, 210]] }, lessonMood: { capricorn: 'heart', pisces: 'heart' },
  scenes: [
    { dur: 3.6, set: mus(), cast: { capricorn: [[0, 300, Y, 270]], pisces: [[0, 800, Y, 230]] }, mood: { capricorn: 'squint', pisces: 'sparkle' }, hops: { capricorn: [0.05, 0.3] },
      lines: [[0.5, 2.8, 'capricorn', 'Free museum night. | Efficient.']] },
    { dur: 3.8, set: mus('#2b5fb0', '#8fe3ff'), cast: { pisces: [[0, 540, Y, 260]] }, mood: { pisces: 'sparkle' }, look: { pisces: [0, -1] }, sfx: [[0.6, 'sob']],
      lines: [[0.4, 2.8, 'pisces', "It's so | BLUE *sob*"]] },
    { dur: 3.8, set: mus('#c9c9d6', '#1b1236'), cast: { pisces: [[0, 300, Y, 240]], capricorn: [[0, 780, Y, 240]] }, mood: { pisces: 'sparkle', capricorn: 'eyeroll' }, sfx: [[0.3, 'sob']],
      lines: [[0.2, 1.5, 'pisces', "It's so | lonely..."], [1.9, 1.7, 'capricorn', "It's a | square."]] },
    { dur: 3.6, set: mus(), cast: { capricorn: [[0, 780, Y, 240], [1.0, 880, Y, 240]], pisces: [[0, 300, Y, 240]] }, mood: { capricorn: 'squint', pisces: 'sparkle' },
      stick: [[0.1, 1.2, '12 ROOMS LEFT', BRAKE]], lines: [[1.4, 2.0, 'capricorn', 'We have | a schedule.']] },
    { dur: 3.8, set: mus('#f2c75c', '#c0603a'), cast: { capricorn: [[0, 540, Y, 260]] }, mood: { capricorn: lt => lt < 1.2 ? 'squint' : 'wide' }, look: { capricorn: [0, -1] }, sfx: [[1.2, 'crickets']],
      lines: [[2.2, 1.5, 'capricorn', '...oh.']] },
    { dur: 3.8, set: mus('#f2c75c', '#c0603a'), cast: { capricorn: [[0, 360, Y, 250]], pisces: [[0, 760, Y, 230]] }, mood: { capricorn: 'sparkle', pisces: 'wide' }, wear: { capricorn: [['tears', 1]] },
      lines: [[0.3, 2.2, 'capricorn', "It looks like | grandma's kitchen."]] },
    { dur: 3.8, set: mus('#f2c75c', '#c0603a'), front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 1.6), cast: { capricorn: [[0, 400, Y, 250]], pisces: [[0, 680, Y, 230]] }, mood: { capricorn: 'sparkle', pisces: 'heart' }, wear: { capricorn: [['tears', 2]], pisces: ['tissue'] }, sfx: [[1.6, 'ding']],
      lines: [[0.3, 1.2, 'pisces', 'Here.'], [1.8, 1.7, 'capricorn', 'Take your time. | All of it.']] },
    { dur: 3.2, set: mus(), front: (x) => box(x, 240, 1330, 600, 40, '#8a5530', 6), cast: { capricorn: [[0, 400, Y, 230]], pisces: [[0, 680, Y, 230]] }, mood: { capricorn: 'happy', pisces: 'heart' },
      lines: [[0.2, 1.4, 'capricorn', 'Same time | next week?'], [1.8, 1.2, 'pisces', '*sob* yes.']] },
  ],
}

// ── hst082 · You hosted dinner on your EaDo rooftop
const AP = { cancer: [['apron', '#f4efe4']] }
const roof = (s = 0) => (x, t) => rooftop(x, t, s)
const host = {
  hook: 'You hosted | dinner on your | EaDo rooftop', key: 'D',
  closing: 'Jan 9. Nothing to host. Just come.', endStars: ['cancer', 'scorpio', 'aries', 'pisces'],
  lesson: ['Imperfect and together', 'beats perfect and stressed.'],
  lessonSet: roof(), lessonCast: { cancer: [[0, 330, Y, 210]], scorpio: [[0, 750, Y, 210]] }, lessonMood: { cancer: 'heart', scorpio: 'heart' },
  scenes: [
    { dur: 3.6, set: roof(), cast: { cancer: [[0, 540, Y, 290]] }, mood: { cancer: 'sparkle' }, hops: { cancer: [0.05, 0.4, 0.75] }, wear: AP,
      lines: [[0.6, 2.7, 'cancer', "Rooftop dinner. | I'm a HOST now."]] },
    { dur: 3.8, set: roof(), back: (x, t, lt) => phone(x, 540, 700, lt, [['l', "I'm here!", 0.1], ['l', 'which one is yours?', 0.6]], { w: 560, h: 340 }), cast: { cancer: [[0, 540, Y, 250]] }, mood: { cancer: 'happy' }, wear: AP,
      lines: [[1.6, 2.0, 'cancer', 'The gray one. | With the door.']] },
    { dur: 3.8, set: townhomes, cast: { scorpio: [[0, 540, Y + 40, 240]] }, mood: { scorpio: 'wide' }, look: { scorpio: [-1, 0] }, sfx: [[0.6, 'womp']],
      lines: [[0.5, 2.8, 'scorpio', "They're ALL gray. | With doors."]] },
    { dur: 3.6, set: townhomes, cast: { scorpio: [[0, 330, Y + 40, 230]], aries: [[0, 760, Y + 40, 0], [0.4, 760, Y + 40, 230]] }, mood: { scorpio: 'neutral', aries: 'squint' }, sfx: [[0.3, 'thud']],
      lines: [[0.7, 1.4, 'scorpio', 'Hi! Dinner?'], [2.2, 1.3, 'aries', 'Wrong house.']] },
    { dur: 3.6, set: roof(1), front: (x, t) => { mosquito(x, 300, 800, t, 1.6) }, cast: { cancer: [[0, 540, Y, 250]] }, mood: { cancer: 'wide' }, wear: AP, sfx: [[0.3, 'buzz']],
      lines: [[0.5, 2.6, 'cancer', 'The food is | burning...']] },
    { dur: 3.8, set: roof(1), front: (x, t) => { for (let k = 0; k < 5; k++) mosquito(x, 200 + k * 170, 700 + (k % 2) * 200, t + k, 1.5) }, cast: { cancer: [[0, 540, Y, 250]], pisces: [[0, 200, 1000, 140]] }, mood: { cancer: 'eyeroll', pisces: 'wide' }, hops: { cancer: [0.3, 0.7, 1.1] }, wear: AP, sfx: [[0.2, 'buzz'], [1.6, 'sob']],
      lines: [[0.4, 2.2, 'cancer', 'And the | city bird is here.']] },
    { dur: 3.8, set: roof(0.4), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('scorpio'); box(x, cx + s * 0.4, cy - 20, 90, 110, '#c9a77a', 5) }, cast: { cancer: [[0, 300, Y, 240]], scorpio: [[0, 1200, Y, 240], [1.0, 780, Y, 240]] }, mood: { cancer: 'wide', scorpio: 'happy' }, wear: AP,
      lines: [[1.0, 1.4, 'scorpio', 'Found you. | Brought tacos.'], [2.6, 1.1, 'cancer', 'It\'s RUINED.']] },
    { dur: 3.4, set: roof(), front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 0.8), cast: { cancer: [[0, 400, Y, 240]], scorpio: [[0, 680, Y, 240]] }, mood: { cancer: 'heart', scorpio: 'heart' }, wear: AP, sfx: [[0.8, 'ding']],
      lines: [[0.2, 1.2, 'scorpio', 'Is it?'], [1.6, 1.6, 'cancer', 'Honestly? | Best dinner.']] },
  ],
}

// ── hst083 · Your ex texted on the one cold day
const PF = { libra: [['puffer', '#c9a6ff']] }
const ex = {
  hook: 'Your ex texted | on the one | cold day', key: 'E',
  closing: 'Jan 9. New year, new people.', endStars: ['libra', 'capricorn', 'sagittarius', 'pisces'],
  lesson: ['Nostalgia is not', 'a reason to go back.'],
  lessonSet: warmSet, lessonCast: { capricorn: [[0, 220, Y, 200]], libra: [[0, 540, Y, 210]], sagittarius: [[0, 860, Y, 200]] }, lessonMood: { capricorn: 'happy', libra: 'heart', sagittarius: 'happy' },
  scenes: [
    { dur: 3.6, set: coldSet, back: (x, t, lt) => phone(x, 540, 700, lt, [['l', "it's cold.", 0.0], ['l', 'remember us?', 0.3]], { w: 520, h: 340 }), cast: { libra: [[0, 540, Y, 290]] }, mood: { libra: 'wide' }, hops: { libra: [0.05, 0.3] }, wear: PF, sfx: [[0.0, 'buzz']],
      lines: [[0.8, 2.6, 'libra', "It's 55° and | my ex texted."]] },
    { dur: 3.8, set: coldSet, cast: { libra: [[0, 540, Y, 260]] }, mood: { libra: 'sparkle' }, look: { libra: [0, -1] }, wear: PF,
      lines: [[0.3, 2.8, 'libra', 'Remember | cuddle weather?']] },
    { dur: 3.8, set: coldSet, cast: { capricorn: [[0, -150, Y, 230], [0.6, 200, Y, 230]], libra: [[0, 540, Y, 240]], sagittarius: [[0, 1230, Y, 230], [0.8, 880, Y, 230]] }, mood: { capricorn: 'squint', libra: 'neutral', sagittarius: 'squint' }, wear: PF, sfx: [[0.6, 'scratch']],
      lines: [[0.8, 1.4, 'capricorn', 'He cancelled | four times.'], [2.4, 1.3, 'sagittarius', 'In ONE month.']] },
    { dur: 3.6, set: coldSet, cast: { capricorn: [[0, 200, Y, 230]], libra: [[0, 540, Y, 240]], sagittarius: [[0, 880, Y, 230]] }, mood: { capricorn: 'eyeroll', libra: 'sparkle', sagittarius: 'squint' }, wear: PF,
      lines: [[0.2, 1.4, 'libra', "But it's | COLD."], [1.8, 1.5, 'sagittarius', "It's 55, babe."]] },
    { dur: 3.6, set: coldSet, back: (x, t, lt) => phone(x, 540, 700, lt, [['r', 'hey...', 0.3]], { w: 520, h: 300, typing: 1.0 }), cast: { capricorn: [[0, 200, Y, 230]], libra: [[0, 540, Y, 240]], sagittarius: [[0, 880, Y, 230]], pisces: [[0, 540, 1000, 130]] }, mood: { capricorn: 'wide', libra: 'neutral', sagittarius: 'wide', pisces: 'wide' }, wear: PF, sfx: [[0.6, 'sob']],
      lines: [[1.6, 1.8, 'pisces', 'nooo *sob*']] },
    { dur: 3.8, set: coldSet, back: (x, t, lt) => phone(x, 540, 700, lt, [['r', 'Stay warm.', 0.3], ['r', "I'm good.", 0.8]], { w: 520, h: 340 }), cast: { capricorn: [[0, 200, Y, 230]], libra: [[0, 540, Y, 240]], sagittarius: [[0, 880, Y, 230]] }, mood: { capricorn: lt => lt < 1.2 ? 'wide' : 'heart', libra: 'sparkle', sagittarius: lt => lt < 1.2 ? 'wide' : 'heart' }, hops: { capricorn: [1.2, 1.6], sagittarius: [1.3, 1.7] }, wear: PF, sfx: [[1.2, 'cheer']],
      lines: [[1.6, 1.9, 'sagittarius', 'SENT. | Iconic.']] },
    { dur: 3.8, set: warmSet, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('libra'); sweat(x, cx + s * 0.35, cy - s * 0.35, t, 3) }, cast: { libra: [[0, 540, Y, 260]] }, mood: { libra: 'happy' }, wear: { libra: [] },
      stick: [[0.1, 1.4, 'NEXT DAY · 81°', '#ff9a3c']], lines: [[1.6, 2.0, 'libra', 'And just like | that: summer.']] },
    { dur: 3.2, set: warmSet, cast: { capricorn: [[0, 220, Y, 220]], libra: [[0, 540, Y, 240]], sagittarius: [[0, 860, Y, 220]] }, mood: { capricorn: 'happy', libra: 'sparkle', sagittarius: 'happy' },
      lines: [[0.2, 1.4, 'capricorn', 'Proud of you.'], [1.8, 1.2, 'libra', 'Brunch?']] },
  ],
}

// ── hst084 · Your paddle boat date went in circles (park pond)
const pd = (sky) => (x, t) => pond(x, t, sky ? { sky } : {})
const boat = (spin = 0) => (x, t, lt) => paddleBoat(x, 540, 1290, '#5ec8ff', spin ? Math.sin(lt * spin) * 0.2 : 0)
const BC = { aquarius: [[0, 400, 1160, 200]], sagittarius: [[0, 680, 1160, 200]] }
const paddle = {
  hook: 'Your paddle boat | date went | in circles', key: 'A',
  closing: 'Jan 9. Steer here together.', endStars: ['aquarius', 'sagittarius', 'gemini', 'taurus'],
  lesson: ['Talk first.', 'Then pedal the same way.'],
  lessonSet: pd(['#ffb38a', '#e08aa0', '#5a4a90']), lessonCast: { aquarius: [[0, 330, Y + 60, 210]], sagittarius: [[0, 750, Y + 60, 210]] }, lessonMood: { aquarius: 'heart', sagittarius: 'heart' },
  scenes: [
    { dur: 3.6, set: pd(), front: boat(4), cast: BC, mood: { aquarius: 'sparkle', sagittarius: 'happy' }, hops: { aquarius: [0.05, 0.4] },
      lines: [[0.5, 2.8, 'aquarius', 'Paddle boats. | How hard can it be?']] },
    { dur: 3.8, set: pd(), front: (x, t, lt) => { x.save(); x.translate(540, 1250); x.rotate(lt * 1.6); x.translate(-540, -1250); paddleBoat(x, 540, 1290, '#5ec8ff') ; x.restore() }, cast: BC, mood: { aquarius: 'wide', sagittarius: 'wide' }, sfx: [[0.3, 'whoosh']],
      lines: [[0.3, 1.4, 'sagittarius', 'Pedal LEFT!'], [1.9, 1.6, 'aquarius', 'I AM | pedaling left!']] },
    { dur: 3.8, set: pd(), front: (x, t, lt) => { boat(6)(x, t, lt); duck(x, 1150 - lt * 320, 1500, 1.4) }, cast: BC, mood: { aquarius: 'squint', sagittarius: 'eyeroll' },
      stick: [[0.2, 1.3, 'THE DUCK IS WINNING', GOLD]], lines: [[1.7, 1.9, 'aquarius', 'Did that duck | just smirk?']] },
    { dur: 3.8, set: pd(), front: boat(3), cast: BC, mood: { aquarius: 'squint', sagittarius: 'squint' }, look: { aquarius: [1, 0], sagittarius: [-1, 0] }, sfx: [[2.2, 'womp']],
      lines: [[0.2, 1.5, 'sagittarius', "You're doing | it wrong."], [1.9, 1.7, 'aquarius', "You're doing | it LOUD."]] },
    { dur: 3.4, set: pd(), front: boat(0), cast: BC, mood: { aquarius: 'neutral', sagittarius: 'neutral' }, sfx: [[0.3, 'crickets']],
      stick: [[0.4, 2.6, '*drifting*', BONE]] },
    { dur: 3.8, set: pd(), front: boat(0), cast: BC, mood: { aquarius: 'happy', sagittarius: 'sparkle' },
      lines: [[0.2, 1.4, 'aquarius', 'Okay. | Plan?'], [1.8, 1.8, 'sagittarius', 'You steer. | I pedal.']] },
    { dur: 3.8, set: pd(['#ffb38a', '#e08aa0', '#5a4a90']), front: (x, t, lt) => { x.save(); x.translate(-200 + lt * 110, 0); paddleBoat(x, 540, 1290, '#5ec8ff'); x.restore(); duck(x, 900 - lt * 60, 1500, 1.4) },
      cast: { aquarius: [[0, 200, 1160, 200], [3.8, 618, 1160, 200]], sagittarius: [[0, 480, 1160, 200], [3.8, 898, 1160, 200]] }, mood: { aquarius: 'sparkle', sagittarius: 'sparkle' }, sfx: [[0.4, 'cheer']],
      lines: [[0.6, 2.4, 'sagittarius', "We're | MOVING!"]] },
    { dur: 3.2, set: pd(['#ffb38a', '#e08aa0', '#5a4a90']), front: (x, t, lt) => { paddleBoat(x, 760, 1290, '#5ec8ff'); heartPop(x, t, lt, 700, 1000, 0.3) }, cast: { aquarius: [[0, 618, 1160, 200]], sagittarius: [[0, 898, 1160, 200]] }, mood: { aquarius: 'heart', sagittarius: 'heart' },
      lines: [[0.3, 1.2, 'aquarius', 'Teamwork.'], [1.7, 1.3, 'sagittarius', 'Rematch: | the duck.']] },
  ],
}

// ── hst085 · It's Jan 9. You're still on the couch.
const den = (x, t) => livingRoom(x, t, { wall: '#2a2a4a', couch: '#5a6ad0' })
const blanketOn = (x, P) => { const [cx, cy, s] = P.at('pisces'); box(x, cx - s * 0.55, cy + s * 0.05, s * 1.1, s * 0.4, '#ff8fb1', 6); for (let k = 0; k < 4; k++) { x.fillStyle = '#ffd1e0'; x.fillRect(cx - s * 0.45 + k * s * 0.26, cy + s * 0.12, s * 0.1, s * 0.1) } }
const couch = {
  hook: "It's Jan 9. | You're still | on the couch.", key: 'C',
  closing: 'See you there. Jan 9.', endStars: ['pisces', 'scorpio', 'leo', 'capricorn'],
  lesson: ['Show up.', 'The right people are, too.'],
  lessonSet: (x, t) => partySet(x, t), lessonCast: { pisces: [[0, 330, Y, 210]], scorpio: [[0, 750, Y, 210]] }, lessonMood: { pisces: 'heart', scorpio: 'heart' },
  scenes: [
    { dur: 3.6, set: den, back: (x, t) => { box(x, 130, 560, 300, 160, '#14102a', 8); txt(x, 'JAN 9', 280, 640, { size: 64, col: GOLD, font: MONO, weight: 700 }) }, front: (x, t, lt, P) => blanketOn(x, P), cast: { pisces: [[0, 540, 1160, 280]] }, mood: { pisces: 'sleepy' }, hops: { pisces: [0.05, 0.35] }, sfx: [[0.05, 'buzz'], [0.4, 'buzz']],
      lines: [[0.6, 2.7, 'pisces', "It's Jan 9. | I'm SO comfy."]] },
    { dur: 3.8, set: den, front: (x, t, lt, P) => blanketOn(x, P), cast: { pisces: [[0, 540, 1160, 260]] }, mood: { pisces: 'neutral' },
      lines: [[0.2, 1.6, 'pisces', "I won't know | anyone there."], [2.0, 1.6, 'pisces', "And it's | 80 degrees."]] },
    { dur: 3.6, set: den, front: (x, t, lt, P) => blanketOn(x, P), cast: { pisces: [[0, 540, 1160, 240]], leo: [[0, 1250, Y + 40, 240], [0.6, 860, Y + 40, 240]] }, mood: { pisces: 'wide', leo: 'sparkle' }, hops: { leo: [0.6, 0.9] }, wear: { leo: ['crown'] }, sfx: [[0.6, 'thud']],
      lines: [[0.9, 2.5, 'leo', 'Get UP. | Outfit. NOW.']] },
    { dur: 3.8, set: den, front: (x, t, lt, P) => blanketOn(x, P), cast: { pisces: [[0, 540, 1160, 240]], sagittarius: [[0, 180, Y + 40, 220]], cancer: [[0, 880, Y + 40, 220]] }, mood: { pisces: 'neutral', sagittarius: 'sparkle', cancer: 'happy' }, hops: { sagittarius: [0.1], cancer: [0.3] },
      lines: [[0.2, 1.5, 'sagittarius', "You'll meet | everyone!"], [1.9, 1.7, 'cancer', 'We saved | you a spot.']] },
    { dur: 3.6, set: den, front: (x, t, lt, P) => blanketOn(x, P), cast: { pisces: [[0, 540, 1160, 240]], capricorn: [[0, 860, Y + 40, 240]] }, mood: { pisces: 'sparkle', capricorn: 'happy' },
      lines: [[0.2, 1.5, 'capricorn', "You don't have | to stay long."], [1.9, 1.5, 'capricorn', 'Just | show up.']] },
    { dur: 3.6, set: (x, t) => { den(x, t); box(x, 380, 460, 320, 560, '#bfe6ff', 10) }, cast: { pisces: [[0, 540, Y, 260]] }, mood: { pisces: 'sparkle' }, hops: { pisces: [0.4, 1.0, 1.6] }, wear: { pisces: [['bow', GOLD]] }, sfx: [[0.4, 'riser', 2.4]],
      stick: [[0.1, 3.2, 'GETTING READY', PINK]] },
    { dur: 3.8, set: (x, t, lt) => partySet(x, t, lt), cast: { pisces: [[0, 280, Y, 230]], scorpio: [[0, 1200, Y, 230], [1.0, 760, Y, 230]] }, mood: { pisces: 'wide', scorpio: 'happy' }, wear: { pisces: [['bow', GOLD]] },
      lines: [[1.1, 2.5, 'scorpio', 'Hi. I almost | didn\'t come either.']] },
    { dur: 3.2, set: (x, t) => partySet(x, t), front: (x, t, lt) => heartPop(x, t, lt, 520, 1000, 0.3), cast: { pisces: [[0, 360, Y, 240]], scorpio: [[0, 700, Y, 240]] }, mood: { pisces: 'heart', scorpio: 'heart' }, wear: { pisces: [['bow', GOLD]] }, sfx: [[0.3, 'sob']],
      lines: [[0.4, 2.4, 'pisces', '*sob* | hi.']] },
  ],
}

export const W03C = { hst077: story(galv), hst078: story(pickle), hst079: story(truck), hst080: story(quiet), hst081: story(art), hst082: story(host), hst083: story(ex), hst084: story(paddle), hst085: story(couch) }
