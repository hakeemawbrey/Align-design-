// Houston Star Talk · w03 stories, part B (hst069–hst076). Grammar: htxstar/w03.js (story wrapper) on starrace/ep.js.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, table } from '../starrace/ep.js'
import { label, sparkles, signChar, notes, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { story, Y, Kp, nightSet, livingRoom, doily, tunnel, foodStreet, shopStreet, familyYard, lawn, karaoke, phone, partySet, heartPop, sunset, dayFill, tree, car, heatSun, kolache, klobasnek, mosquito } from './w03.js'
import { BRAKE, HGREEN, streetSign, skyline, sweat, taco } from './kit.js'

// ── shared bits for part B
/** a big generic profile card (no app UI): a title strip, a photo row and text rows */
function profileCard(x, cx, cy, k, { rows = [], photos = 0, shades = true, hl = -1 } = {}) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -330, -300, 660, 600, '#14102a', 12); x.fillStyle = '#f4efe4'; x.fillRect(-306, -270, 612, 540)
  for (let i = 0; i < photos; i++) { const px = -270 + i * 140; box(x, px, -240, 120, 140, '#c9a6ff', 4); x.fillStyle = '#f2b544'; x.beginPath(); x.arc(px + 60, -170, 34, 0, Math.PI * 2); x.fill(); if (shades) { x.fillStyle = INK; x.fillRect(px + 30, -184, 26, 14); x.fillRect(px + 64, -184, 26, 14); x.fillRect(px + 56, -180, 8, 4) } }
  rows.forEach((r, i) => { const y = (photos ? -40 : -200) + i * 84; if (i === hl) { x.fillStyle = 'rgba(255,143,177,0.45)'; x.fillRect(-290, y - 34, 580, 68) } txt(x, r, -270, y, { size: r.length > 24 ? 30 : 36, col: INK, align: 'left', font: i === 0 && !photos ? MONO : undefined, weight: 800 }) })
  x.restore()
}
function lamp(x, cx, t, swing = 0.3) { const a = Math.sin(t * 2.2) * swing; x.save(); x.translate(cx, 0); x.rotate(a); x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 420); x.stroke(); box(x, -70, 420, 140, 60, '#8f96a0', 6); x.fillStyle = 'rgba(255,240,180,0.18)'; x.beginPath(); x.moveTo(-60, 480); x.lineTo(-260, 1400); x.lineTo(260, 1400); x.lineTo(60, 480); x.fill(); x.restore() }
function folder(x, cx, cy, k, title = 'FILE: YOU') { if (k <= 0) return; x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k); box(x, -150, -100, 300, 200, '#e8c27a', 6); box(x, -150, -128, 120, 30, '#e8c27a', 5); txt(x, title, 0, 0, { size: 36, col: INK, font: MONO, weight: 700 }); x.restore() }
function rack(x, cx, top, items, t) {
  box(x, cx - 380, top, 760, 16, '#8f96a0', 5); box(x, cx - 380, top, 16, 520, '#8f96a0', 4); box(x, cx + 364, top, 16, 520, '#8f96a0', 4)
  items.forEach(([col, word], i) => { const px = cx - 300 + i * (600 / Math.max(1, items.length - 1)), sw = Math.sin(t * 2 + i) * 0.05; x.save(); x.translate(px, top + 16); x.rotate(sw); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 30); x.stroke(); box(x, -70, 30, 140, 200, col, 5); box(x, -100, 30, 30, 90, col, 4); box(x, 70, 30, 30, 90, col, 4); if (word) txt(x, word, 0, 270, { size: 26, col: BONE, font: MONO, weight: 700 }); x.restore() })
}
function bedroom(x, t) { x.fillStyle = '#3a2a5a'; x.fillRect(0, 0, 1080, FLOOR + 60); for (let k = 0; k < 1080; k += 120) { x.fillStyle = 'rgba(255,255,255,0.03)'; x.fillRect(k, 0, 60, FLOOR + 60) } x.fillStyle = '#5a3e4a'; x.fillRect(0, FLOOR + 60, 1080, 600); box(x, 760, 560, 220, 420, '#bfe6ff', 8) }
function pastryBox(x, cx, cy, k = 1, open = 0, sausage = true) {
  if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -130, -40, 260, 90, '#f4efe4', 6)
  if (open > 0) { for (let i = 0; i < 3; i++) (sausage ? klobasnek : kolache)(x, -80 + i * 80, -50, 0.5) }
  box(x, -130, -40 - 80 * open, 260, 16, '#f4efe4', 5); x.restore()
}
const capHat = c => { c.fillStyle = INK; c.fillRect(11.5, 8.2, 13, 4.4); c.fillStyle = '#2b3f7a'; c.fillRect(12.1, 8.8, 11.8, 3.2); c.fillStyle = INK; c.fillRect(10, 12, 16, 1.6); c.fillStyle = GOLD; c.fillRect(17, 9.4, 2, 2) }
const lyricSet = s => (x, t) => karaoke(x, t, { lyric: s })

// ── hst069 · The aunties read your dating profile (living room, doily)
const G = { cancer: ['glasses'], taurus: ['glasses'] }
const couch = { cancer: [[0, 330, 1150, 240]], taurus: [[0, 750, 1150, 240]] }
const room69 = (x, t) => { livingRoom(x, t, { wall: '#6a3a4a', couch: '#3a7a6a' }); doily(x, 540, 1120, 300) }
const profile = {
  hook: 'The aunties | read your | dating profile', key: 'C',
  closing: 'Jan 9. Come as you are.', endStars: ['cancer', 'taurus', 'pisces', 'virgo'],
  lesson: ['Specific is attractive.', 'Say what you actually love.'],
  lessonSet: room69, lessonCast: couch, lessonMood: { cancer: 'heart', taurus: 'heart' }, lessonWear: G,
  scenes: [
    { dur: 3.6, set: room69, back: (x, t, lt) => profileCard(x, 540, 700, Kp(lt, 2.5, 0.3), { rows: ['LOOKING FOR:', 'inside the Loop ONLY'], hl: 1 }), cast: { cancer: [[0, 300, 1150, 280]], taurus: [[0, 780, 1150, 280]] }, mood: { cancer: 'squint', taurus: 'squint' }, hops: { cancer: [0.05], taurus: [0.15] }, wear: G,
      lines: [[0.5, 2.8, 'cancer', 'Baby. We read | your profile.']] },
    { dur: 3.8, set: room69, back: (x, t, lt) => profileCard(x, 540, 700, 1, { rows: ['LOOKING FOR:', 'inside the Loop ONLY'], hl: 1 }), cast: couch, mood: { cancer: 'wide', taurus: 'squint' }, wear: G,
      lines: [[0.2, 1.5, 'taurus', '"Inside the | Loop ONLY"?'], [1.9, 1.7, 'cancer', 'Skip your soulmate | over the 610?']] },
    { dur: 3.8, set: room69, back: (x, t, lt) => profileCard(x, 540, 700, 1, { photos: 4, rows: ['', 'every. single. photo.'] }), cast: couch, mood: { cancer: 'eyeroll', taurus: 'squint' }, wear: G, sfx: [[1.8, 'womp']],
      lines: [[0.3, 1.4, 'taurus', 'All sunglasses.'], [1.9, 1.7, 'cancer', 'Are you in | witness protection?']] },
    { dur: 3.6, set: room69, back: (x, t, lt) => profileCard(x, 540, 700, 1, { rows: ['ABOUT ME:', 'idk lol'], hl: 1 }), cast: { ...couch, pisces: [[0, 540, 1000, 140]] }, mood: { cancer: 'neutral', taurus: 'neutral', pisces: 'wide' }, wear: G, sfx: [[0.3, 'crickets']],
      lines: [[1.4, 1.0, 'taurus', '"idk lol."'], [2.5, 1.0, 'pisces', '*sob*']] },
    { dur: 3.8, set: room69, back: (x, t, lt) => phone(x, 540, 700, lt, [], { w: 520, h: 300, typing: 1.2 }), cast: couch, mood: { cancer: 'sparkle', taurus: 'happy' }, wear: G,
      lines: [[0.2, 2.2, 'cancer', 'So tell us. What | do you LOVE?']] },
    { dur: 4.0, set: room69, back: (x, t, lt) => phone(x, 540, 700, lt, [['r', 'bats at sunset', 0.1], ['r', 'free museum nights', 0.6], ["r", "grandma's tamales", 1.1]], { w: 560, h: 420 }), front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 1.6),
      cast: couch, mood: { cancer: lt => lt < 1.6 ? 'wide' : 'heart', taurus: lt => lt < 1.6 ? 'wide' : 'heart' }, hops: { cancer: [1.6], taurus: [1.7] }, wear: G, sfx: [[1.6, 'ding']],
      lines: [[1.9, 1.9, 'taurus', 'THAT. | Write THAT.']] },
    { dur: 3.6, set: room69, back: (x, t, lt) => profileCard(x, 540, 700, Kp(lt, 0.1), { rows: ['ABOUT ME:', 'bats at sunset.', 'museum nights.', "grandma's tamales."] }), cast: couch, mood: { cancer: 'sparkle', taurus: 'sparkle' }, wear: G, sfx: [[0.2, 'cheer']],
      lines: [[1.0, 2.2, 'cancer', 'Now they know | who you are.']] },
    { dur: 3.2, set: room69, cast: couch, mood: { cancer: 'happy', taurus: 'wink' }, wear: G,
      lines: [[0.2, 1.4, 'taurus', 'Also. One photo | without shades.'], [1.8, 1.3, 'cancer', 'We love you.']] },
  ],
}

// ── hst070 · Gemini got lost in the tunnels under downtown
const lostSet = (x, t) => tunnel(x, t)
const lost = {
  hook: 'Gemini got lost | in the tunnels | under downtown', key: 'E',
  closing: "Jan 9. Don't get lost.", endStars: ['gemini', 'libra', 'capricorn', 'pisces'],
  lesson: ["Saying \"I'm lost\"", 'is how you get found.'],
  lessonSet: (x, t) => shopStreet(x, t), lessonCast: { gemini: [[0, 330, Y, 210]], libra: [[0, 750, Y, 210]] }, lessonMood: { gemini: 'heart', libra: 'heart' },
  scenes: [
    { dur: 3.6, set: lostSet, cast: { gemini: [[0, 180, Y, 270], [1.2, 540, Y, 270]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.05] }, sfx: [[0.1, 'blip', 1318.51]],
      lines: [[1.0, 2.5, 'gemini', 'Meet you at noon. | I know the tunnels.']] },
    { dur: 3.8, set: lostSet, cast: { gemini: [[0, 540, Y, 250]] }, mood: { gemini: 'squint' }, look: { gemini: [-1, -1] },
      lines: [[0.2, 1.5, 'gemini', 'Left. No, right. | No...'], [2.0, 1.7, 'gemini', "We'll split up."]] },
    { dur: 3.8, set: lostSet, front: (x, t, lt) => signChar(x, t, 'gemini', 540 + 320 * ease.inOutCubic(clamp(lt)), Y, 230, { mood: 'sparkle', seed: 21, hops: [t - lt + 2.5] }), cast: { gemini: [[0, 540, Y, 250], [1.0, 220, Y, 230]] }, mood: { gemini: 'happy' },
      lines: [[1.2, 1.2, 'gemini', "I'll go left."], [2.5, 1.2, [860, Y, 230], "I'll go right."]] },
    { dur: 3.6, set: lostSet, front: (x, t, lt, P) => signChar(x, t, 'gemini', 760, Y, 230, { mood: 'wide', seed: 21, hops: [t - lt + 0.3] }), cast: { gemini: [[0, 320, Y, 230]] }, mood: { gemini: 'wide' }, sfx: [[0.3, 'crickets']],
      stick: [[0.1, 1.6, 'SAME CORNER. AGAIN.', GOLD]], lines: [[2.0, 1.4, 'gemini', 'Oh. Hi. | ...Hi.']] },
    { dur: 3.8, set: lostSet, cast: { gemini: [[0, 320, Y, 240]], libra: [[0, 1200, Y, 240], [1.0, 760, Y, 240]] }, mood: { gemini: 'squint', libra: 'wide' },
      lines: [[1.0, 1.4, 'libra', 'Is this the | way out?'], [2.5, 1.2, 'gemini', 'Nobody knows.']] },
    { dur: 3.8, set: lostSet, cast: { gemini: [[0, 320, Y, 240]], libra: [[0, 760, Y, 240]] }, mood: { gemini: 'squint', libra: 'happy' },
      lines: [[0.2, 1.5, 'libra', 'Should we | ask someone?'], [1.9, 1.7, 'gemini', "I don't ASK. | I KNOW."]] },
    { dur: 3.6, set: lostSet, cast: { gemini: [[0, 320, Y, 240]], libra: [[0, 760, Y, 240]] }, mood: { gemini: 'eyeroll', libra: 'wink' }, sfx: [[1.4, 'womp']],
      stick: [[0.1, 1.2, '1:15 PM', BRAKE]], lines: [[1.4, 2.0, 'gemini', "...okay. I'm lost."]] },
    { dur: 3.8, set: lostSet, front: (x, t, lt) => { label(x, 540, 640, 'EXIT →', Kp(lt, 1.6), { size: 70, bg: MINT, rot: -0.03, font: MONO, weight: 700 }) },
      cast: { gemini: [[0, 240, Y, 220]], libra: [[0, 840, Y, 220]], capricorn: [[0, 540, Y + 40, 230]] }, mood: { gemini: 'wide', libra: 'happy', capricorn: 'squint' }, wear: { capricorn: [capHat] },
      lines: [[0.2, 1.4, 'capricorn', 'Need directions?'], [1.8, 1.8, 'capricorn', "It's right there. | All day."]] },
    { dur: 3.4, set: (x, t) => shopStreet(x, t), front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 0.3), cast: { gemini: [[0, 380, Y, 240]], libra: [[0, 700, Y, 240]] }, mood: { gemini: 'heart', libra: 'heart' }, sfx: [[0.3, 'ding']],
      lines: [[0.3, 1.3, 'libra', 'Lunch tomorrow?'], [1.8, 1.5, 'gemini', 'Only if we | ask first.']] },
  ],
}

// ── hst071 · POV: your date asks where you're from (Bellaire, interrogation lamp)
const tableTop = (x) => { box(x, 60, 1330, 960, 60, '#8a5530', 8); x.fillStyle = '#6b3b1f'; x.fillRect(60, 1390, 960, 530) }
const bel = (swing = 0.3, disco = false) => (x, t) => { foodStreet(x, t); x.fillStyle = 'rgba(8,5,22,0.45)'; x.fillRect(0, 0, 1080, 1920); if (disco) for (let k = 0; k < 30; k++) { x.fillStyle = [PINK, SKYB, GOLD][k % 3]; x.globalAlpha = 0.4; x.fillRect(540 + Math.cos(t + k) * (100 + k * 13), 800 + Math.sin(t * 1.3 + k) * (80 + k * 9), 12, 12) } x.globalAlpha = 1; if (!disco) lamp(x, 540, t, swing) }
const SC = { scorpio: [[0, 540, 1180, 330]] }
const you = (s, bg = BONE) => [0.15, 3.0, 'YOU: ' + s, bg]
const pov = {
  hook: 'POV: your date | asks where | you\'re from', key: 'D',
  closing: 'Jan 9. Ask a better question.', endStars: ['scorpio', 'libra', 'leo', 'pisces'],
  lesson: ['Ask questions that', 'open doors, not files.'],
  lessonSet: bel(0, true), lessonCast: { scorpio: [[0, 540, 1180, 260]] }, lessonMood: { scorpio: 'heart' },
  scenes: [
    { dur: 3.4, set: bel(0.35), front: tableTop, cast: SC, mood: { scorpio: 'squint' }, hops: { scorpio: [0.05, 0.4] }, sfx: [[0.1, 'tape', 0.6]],
      lines: [[0.4, 2.8, 'scorpio', 'So. Where are | you from?']] },
    { dur: 3.4, set: bel(0.3), front: tableTop, cast: SC, mood: { scorpio: 'squint' }, stick: [you('Houston.')],
      lines: [[1.6, 1.6, 'scorpio', 'Originally?']] },
    { dur: 3.6, set: bel(0.5), front: tableTop, cast: SC, mood: { scorpio: 'eyeroll' }, stick: [you('...Houston.')],
      lines: [[1.5, 2.0, 'scorpio', "Where'd you go | to high school?"]] },
    { dur: 3.8, set: bel(0.6), front: (x, t, lt) => { tableTop(x); folder(x, 820, 1260, Kp(lt, 0.2)) }, cast: SC, mood: { scorpio: 'squint' }, sfx: [[0.2, 'thud']],
      lines: [[0.4, 1.5, 'scorpio', 'Which side | of the Beltway?'], [2.1, 1.5, 'scorpio', 'Flour or corn? | Answer.']] },
    { dur: 3.6, set: bel(0.0), front: (x) => { tableTop(x); folder(x, 820, 1260, 1) }, cast: SC, mood: { scorpio: lt => lt < 1.2 ? 'squint' : 'wide' }, hops: { scorpio: [1.2] }, sfx: [[1.2, 'scratch'], [1.6, 'crickets']],
      stick: [[0.15, 3.3, 'YOU: What do YOU love about Houston?', PINK]] },
    { dur: 3.8, set: bel(0.0), front: tableTop, cast: SC, mood: { scorpio: 'sparkle' },
      lines: [[0.2, 1.5, 'scorpio', '...honestly? | The food.'], [1.9, 1.8, 'scorpio', 'One street. | The whole world.']] },
    { dur: 3.8, set: bel(0, true), front: (x, t, lt) => { tableTop(x); heartPop(x, t, lt, 540, 900, 0.6) }, cast: SC, mood: { scorpio: 'heart' }, hops: { scorpio: [0.6, 1.0] }, sfx: [[0.6, 'cheer']],
      lines: [[0.3, 1.5, 'scorpio', 'Pho? Then boba? | Then karaoke?'], [2.0, 1.6, 'scorpio', 'I know | every spot.']] },
    { dur: 3.2, set: bel(0, true), front: tableTop, cast: SC, mood: { scorpio: 'wink' },
      lines: [[0.2, 2.7, 'scorpio', 'Sorry. I interrogate | when I\'m nervous.']] },
  ],
}

// ── hst072 · Capricorn parked a mile away for shade (Rice Village)
const cap = (x, t) => shopStreet(x, t)
const shade = {
  hook: 'Capricorn parked | a mile away | for shade', key: 'F',
  closing: 'Jan 9. Carpool. Trust us.', endStars: ['capricorn', 'gemini', 'pisces', 'sagittarius'],
  lesson: ['Notice the small care.', "It's never small."],
  lessonSet: (x, t) => { x.fillStyle = '#3d2a4a'; x.fillRect(0, 0, 1080, 1920) }, lessonCast: { capricorn: [[0, 330, Y, 210]], gemini: [[0, 750, Y, 210]] }, lessonMood: { capricorn: 'heart', gemini: 'heart' },
  scenes: [
    { dur: 3.6, set: cap, front: (x, t, lt) => car(x, 1200 - ((lt * 380) % 1500), 1290, '#7dffb0', { flip: true, open: true }), cast: { capricorn: [[0, 1200, 1180, 190], [3.6, -168, 1180, 190]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05] }, sfx: [[0.1, 'whoosh']],
      lines: [[0.4, 2.6, 'capricorn', 'Save me a seat. | Parking first.']] },
    { dur: 3.6, set: cap, front: (x) => car(x, 540, 1290, '#7dffb0', { open: true }), cast: { capricorn: [[0, 560, 1180, 190]] }, mood: { capricorn: 'wide' },
      stick: [[0.1, 1.4, 'OPEN SPOT · FULL SUN', '#ff9a3c']], lines: [[1.6, 1.8, 'capricorn', 'In the SUN? | Absolutely not.']] },
    { dur: 3.6, set: cap, front: (x, t, lt) => { tree(x, 900, 1180, 0.9, '#2f6a3a', t); car(x, 900, 1290, '#c9a6ff'); car(x, 200 + lt * 40, 1290, '#7dffb0', { open: true }) }, cast: { capricorn: [[0, 220, 1180, 190], [3.6, 364, 1180, 190]] }, mood: { capricorn: 'eyeroll' }, sfx: [[1.2, 'womp']],
      stick: [[0.1, 1.0, 'LAP 4', GOLD]], lines: [[1.3, 2.0, 'capricorn', 'The one tree. | TAKEN.']] },
    { dur: 3.6, set: (x, t) => { dayFill(x, '#8fd3ff', '#fff0c0', FLOOR + 60); for (const cx of [200, 520, 840]) tree(x, cx, 1200, 1.1, '#2f6a3a', t); x.fillStyle = '#2a2638'; x.fillRect(0, 1180, 1080, 740) },
      front: (x) => car(x, 520, 1290, '#7dffb0', { open: true }), cast: { capricorn: [[0, 540, 1180, 190]] }, mood: { capricorn: 'sparkle' }, hops: { capricorn: [0.4, 0.8] }, sfx: [[0.4, 'ding']],
      stick: [[0.1, 1.3, 'SHADE · 1 MILE AWAY', MINT]], lines: [[1.5, 1.9, 'capricorn', 'Shade. | Worth it.']] },
    { dur: 3.8, set: (x, t) => shopStreet(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('capricorn'); sweat(x, cx + s * 0.35, cy - s * 0.35, t, 5); sweat(x, cx - s * 0.35, cy - s * 0.3, t + 0.3, 3) },
      cast: { capricorn: [[0, -100, Y, 240], [3.8, 700, Y, 240]] }, mood: { capricorn: 'wide' },
      lines: [[1.2, 2.4, 'capricorn', 'Why is the | sidewalk SOUP?']] },
    { dur: 3.8, set: (x, t) => { x.fillStyle = '#3d2a4a'; x.fillRect(0, 0, 1080, 1920); box(x, 120, 520, 360, 140, '#c9c9d6', 8); for (let k = 0; k < 6; k++) { x.fillStyle = INK; x.fillRect(150 + k * 55, 560, 30, 60) } for (let k = 0; k < 5; k++) { const ph = (t * 0.8 + k / 5) % 1; x.fillStyle = `rgba(190,230,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.fillRect(160 + k * 60, 680 + ph * 200, 30, 8) } table(x, 640, 480, FLOOR - 40, '#8a5530') },
      front: (x) => { box(x, 700, 1210, 50, 80, '#bfe6ff', 4); x.fillStyle = BONE; x.fillRect(708, 1218, 34, 20) },
      cast: { gemini: [[0, 820, 1140, 230]], capricorn: [[0, -100, Y, 230], [1.4, 260, Y, 230]] }, mood: { gemini: 'happy', capricorn: 'wide' },
      lines: [[1.6, 2.0, 'gemini', 'Saved you | the AC seat.']] },
    { dur: 3.8, set: (x, t) => { x.fillStyle = '#3d2a4a'; x.fillRect(0, 0, 1080, 1920); table(x, 640, 480, FLOOR - 40, '#8a5530') }, front: (x, t, lt) => { box(x, 700, 1210, 50, 80, '#bfe6ff', 4); heartPop(x, t, lt, 400, 1000, 1.8) },
      cast: { gemini: [[0, 820, 1140, 230]], capricorn: [[0, 260, Y, 230]] }, mood: { gemini: 'happy', capricorn: lt => lt < 1.8 ? 'wide' : 'heart' }, sfx: [[1.8, 'ding']],
      lines: [[0.2, 1.5, 'capricorn', 'Ice water? | For me?'], [1.9, 1.7, 'gemini', 'You said | you run hot.']] },
    { dur: 3.2, set: (x, t) => { x.fillStyle = '#3d2a4a'; x.fillRect(0, 0, 1080, 1920); table(x, 640, 480, FLOOR - 40, '#8a5530') },
      cast: { gemini: [[0, 820, 1140, 230]], capricorn: [[0, 300, Y, 230]], pisces: [[0, 540, 900, 140]] }, mood: { gemini: 'heart', capricorn: 'heart', pisces: 'heart' }, sfx: [[0.6, 'sob']],
      lines: [[0.2, 1.4, 'capricorn', 'You remembered | that?'], [1.8, 1.2, 'pisces', '*sob*']] },
  ],
}

// ── hst073 · The group chat picked your Jan 9 outfit (party prep)
const RACK = [['#e05a3a', 'PUFFER'], ['#ffd36b', 'SEQUINS'], ['#c9b8a0', 'NEUTRAL'], ['#8a5530', 'BOOTS']]
const br = (x, t) => { bedroom(x, t); rack(x, t ? 540 : 540, 560, RACK, t) }
const F4 = { leo: [[0, 160, Y, 200]], libra: [[0, 400, Y, 200]], sagittarius: [[0, 660, Y, 200]], virgo: [[0, 910, Y, 200]] }
const outfit = {
  hook: 'The group chat | picked your | Jan 9 outfit', key: 'D',
  closing: 'Jan 9. Wear the thing you love.', endStars: ['leo', 'libra', 'sagittarius', 'virgo'],
  lesson: ['Good friends hype', 'the real you.'],
  lessonSet: (x, t) => partySet(x, t), lessonCast: F4, lessonMood: { leo: 'heart', libra: 'heart', sagittarius: 'heart', virgo: 'heart' }, lessonWear: { leo: ['crown'], virgo: ['clipboard'] },
  scenes: [
    { dur: 3.6, set: (x, t) => bedroom(x, t), back: (x, t, lt) => phone(x, 540, 840, lt, [['l', 'OUTFIT EMERGENCY', 0.0], ['l', 'for Jan 9', 0.3]], { w: 560, h: 340 }),
      cast: { leo: [[0, -120, Y, 220], [0.5, 160, Y, 220]], libra: [[0, -120, Y, 220], [0.7, 400, Y, 220]], sagittarius: [[0, 1200, Y, 220], [0.6, 660, Y, 220]], virgo: [[0, 1200, Y, 220], [0.8, 910, Y, 220]] }, mood: { leo: 'sparkle', libra: 'happy', sagittarius: 'happy', virgo: 'squint' }, wear: { leo: ['crown'], virgo: ['clipboard'] }, sfx: [[0.1, 'buzz']],
      lines: [[1.0, 2.4, 'leo', 'Your outfit? | We have notes.']] },
    { dur: 3.8, set: br, cast: F4, mood: { leo: 'happy', libra: 'happy', sagittarius: 'happy', virgo: 'squint' }, wear: { leo: ['crown'], virgo: ['clipboard'] },
      lines: [[0.2, 1.6, 'virgo', 'Forecast: 80°. | In January.'], [2.0, 1.6, 'sagittarius', 'Bring a sweater. | For the AC.']] },
    { dur: 3.8, set: br, cast: F4, mood: { leo: 'sparkle', libra: 'squint', sagittarius: 'happy', virgo: 'neutral' }, wear: { leo: ['crown'], virgo: ['clipboard'] },
      lines: [[0.2, 1.5, 'leo', 'Sequins. | Obviously.'], [1.9, 1.7, 'libra', 'Neutrals. | Timeless.']] },
    { dur: 3.8, set: br, cast: F4, mood: { leo: 'eyeroll', libra: 'neutral', sagittarius: 'sparkle', virgo: 'wide' }, hops: { sagittarius: [0.2, 0.5] }, wear: { leo: ['crown'], virgo: ['clipboard'] },
      lines: [[0.2, 1.5, 'sagittarius', "BOOTS! It's | boots season!"], [1.9, 1.7, 'virgo', "It's 80 | degrees."]] },
    { dur: 3.6, set: br, cast: F4, mood: { leo: 'squint', libra: 'squint', sagittarius: 'squint', virgo: 'squint' }, wear: { leo: ['crown'], virgo: ['clipboard'] }, sfx: [[0.3, 'crickets']],
      stick: [[0.2, 3.0, 'THE VOTE: 1 · 1 · 1 · 1', GOLD]] },
    { dur: 3.8, set: br, cast: F4, mood: { leo: 'neutral', libra: 'sparkle', sagittarius: 'neutral', virgo: 'neutral' }, look: { leo: [0, 1], sagittarius: [0, 1], virgo: [0, 1] }, wear: { leo: ['crown'], virgo: ['clipboard'] }, sfx: [[0.2, 'tape', 0.4]],
      lines: [[0.4, 2.8, 'libra', 'Wait. What do | YOU want to wear?']] },
    { dur: 3.8, set: (x, t) => bedroom(x, t), back: (x, t, lt) => { const k = Kp(lt, 0.2); if (k > 0) { x.save(); x.translate(540, 820); x.scale(k, k); box(x, -150, -170, 300, 300, '#5ec8ff', 8); box(x, -210, -170, 70, 150, '#5ec8ff', 6); box(x, 140, -170, 70, 150, '#5ec8ff', 6); txt(x, 'YOUR', 0, -40, { size: 40, col: INK }); txt(x, 'FAVORITE', 0, 10, { size: 40, col: INK }); x.restore() } }, front: (x, t, lt) => heartPop(x, t, lt, 540, 800, 0.6),
      cast: F4, mood: { leo: 'heart', libra: 'heart', sagittarius: 'heart', virgo: 'heart' }, hops: { leo: [0.6], libra: [0.7], sagittarius: [0.8], virgo: [0.9] }, wear: { leo: ['crown'], virgo: ['clipboard'] }, sfx: [[0.6, 'cheer']],
      lines: [[1.4, 2.2, 'leo', "Honestly? | That's SO you."]] },
    { dur: 3.2, set: (x, t, lt) => partySet(x, t, lt), cast: F4, mood: { leo: 'sparkle', libra: 'happy', sagittarius: 'sparkle', virgo: 'happy' }, hops: { leo: [0.2, 0.8], libra: [0.3], sagittarius: [0.25, 0.9], virgo: [0.4] }, wear: { leo: ['crown'], virgo: ['clipboard'] },
      lines: [[0.8, 2.2, 'sagittarius', 'See you | Jan 9!']] },
  ],
}

// ── hst074 · You met all their cousins in Katy
const yard74 = (x, t) => familyYard(x, t)
const KIN = { aries: [[0, 140, 1120, 170]], leo: [[0, 360, 1100, 170]], gemini: [[0, 720, 1100, 170]], sagittarius: [[0, 940, 1120, 170]] }
const cousins = {
  hook: 'You met all | their cousins | in Katy', key: 'C',
  closing: 'Jan 9. Bring the cousins.', endStars: ['cancer', 'taurus', 'aries', 'leo'],
  lesson: ['Show up for their people.', "That's love, too."],
  lessonSet: yard74, lessonCast: { cancer: [[0, 330, Y, 210]], taurus: [[0, 750, Y, 210]] }, lessonMood: { cancer: 'heart', taurus: 'heart' },
  scenes: [
    { dur: 3.6, set: yard74, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); pastryBox(x, cx + s * 0.6, cy + 30, 0.8) }, cast: { cancer: [[0, 400, Y, 270]], taurus: [[0, 760, Y, 240]] }, mood: { cancer: 'wide', taurus: 'happy' }, hops: { cancer: [0.05, 0.3, 0.55] },
      lines: [[0.6, 2.7, 'cancer', 'Their WHOLE | family? Today?']] },
    { dur: 3.8, set: yard74, cast: { ...KIN, cancer: [[0, 400, Y + 60, 220]], taurus: [[0, 680, Y + 60, 220]] }, mood: { aries: 'squint', leo: 'sparkle', gemini: 'happy', sagittarius: 'happy', cancer: 'wide', taurus: 'happy' }, hops: { aries: [0.1], leo: [0.3], gemini: [0.5], sagittarius: [0.7] }, sfx: [[0.1, 'pop', 660], [0.3, 'pop', 784], [0.5, 'pop', 880], [0.7, 'pop', 1046.5]],
      lines: [[1.0, 2.4, 'leo', 'So THIS is | the one?']] },
    { dur: 3.8, set: yard74, cast: { ...KIN, cancer: [[0, 400, Y + 60, 220]], taurus: [[0, 680, Y + 60, 220]] }, mood: { aries: 'wide', leo: 'squint', gemini: 'squint', sagittarius: 'squint', cancer: 'wide', taurus: 'neutral' },
      lines: [[0.2, 1.6, 'gemini', "Where'd you go | to high school?"], [2.0, 1.6, 'aries', 'Inside the | LOOP?!']] },
    { dur: 3.8, set: yard74, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); pastryBox(x, cx + 10, cy - s * 0.95, 1, clamp(lt / 0.6)) }, cast: { ...KIN, cancer: [[0, 400, Y + 60, 220]], taurus: [[0, 680, Y + 60, 220]] }, mood: { aries: 'happy', leo: 'happy', gemini: 'happy', sagittarius: 'happy', cancer: 'sparkle', taurus: 'happy' },
      lines: [[0.2, 1.4, 'cancer', 'I brought | kolaches!'], [2.0, 1.6, 'sagittarius', "Those are | KLOBASNEKS."]] },
    { dur: 3.8, set: yard74, front: (x, t, lt) => { kolache(x, 250, 800, 0.8); klobasnek(x, 830, 800, 0.8) }, cast: { ...KIN, cancer: [[0, 400, Y + 60, 220]], taurus: [[0, 680, Y + 60, 220]] }, mood: { aries: 'squint', leo: 'eyeroll', gemini: 'wide', sagittarius: 'squint', cancer: 'wide', taurus: 'wide' }, hops: { aries: [0.2, 1.2], gemini: [0.5, 1.6], leo: [0.9], sagittarius: [1.3] }, sfx: [[0.2, 'scratch']],
      stick: [[0.1, 1.4, 'THE GREAT DEBATE', BRAKE]], lines: [[1.6, 1.0, 'aries', "It's a kolache!"], [2.7, 1.0, 'gemini', 'KLOBASNEK!']] },
    { dur: 3.8, set: yard74, cast: { ...KIN, cancer: [[0, 420, Y + 60, 220]], taurus: [[0, 660, Y + 60, 220]] }, mood: { aries: 'squint', leo: 'squint', gemini: 'squint', sagittarius: 'squint', cancer: 'happy', taurus: 'wink' }, look: { aries: [1, 0], leo: [1, 0], gemini: [-1, 0], sagittarius: [-1, 0] },
      lines: [[0.2, 1.5, 'cancer', 'They forgot | I\'m here.'], [1.9, 1.7, 'taurus', 'Exactly. | They LOVE you.']] },
    { dur: 3.8, set: yard74, front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 1.6), cast: { ...KIN, cancer: [[0, 420, Y + 60, 220]], taurus: [[0, 660, Y + 60, 220]] }, mood: { aries: 'happy', leo: 'heart', gemini: 'happy', sagittarius: 'happy', cancer: 'heart', taurus: 'heart' }, sfx: [[1.6, 'cheer']],
      lines: [[0.3, 2.0, 'leo', 'Come back Sunday. | Bring more.']] },
    { dur: 3.2, set: yard74, cast: { cancer: [[0, 380, Y, 240]], taurus: [[0, 700, Y, 240]] }, mood: { cancer: 'sparkle', taurus: 'happy' },
      lines: [[0.2, 1.3, 'cancer', "I'm family now?"], [1.7, 1.4, 'taurus', 'Since the | klobasnek.']] },
  ],
}

// ── hst075 · Your crush texted 'k.' Virgo spiraled. (a downtown park lawn)
const lw = (x, t) => lawn(x, t)
const kk = {
  hook: "Your crush | texted 'k.' | Virgo spiraled.", key: 'E',
  closing: 'Jan 9. Text back with words.', endStars: ['virgo', 'aquarius', 'pisces', 'scorpio'],
  lesson: ['When in doubt, ask.', "Don't decode."],
  lessonSet: lw, lessonCast: { virgo: [[0, 330, Y, 210]], aquarius: [[0, 750, Y, 210]] }, lessonMood: { virgo: 'heart', aquarius: 'happy' }, lessonWear: { virgo: ['clipboard'] },
  scenes: [
    { dur: 3.6, set: lw, back: (x, t, lt) => phone(x, 540, 720, lt, [['l', 'k', 0.0]], { w: 440, h: 320 }), cast: { virgo: [[0, 540, Y, 290]] }, mood: { virgo: 'wide' }, hops: { virgo: [0.05, 0.25] }, wear: { virgo: ['clipboard'] }, sfx: [[0.05, 'buzz']],
      lines: [[0.6, 2.7, 'virgo', 'They said "k." | Just "k."']] },
    { dur: 3.8, set: lw, back: (x, t, lt) => phone(x, 540, 720, lt, [['l', 'k', 0.0]], { w: 440, h: 320 }), cast: { virgo: [[0, 540, Y, 260]] }, mood: { virgo: 'squint' }, wear: { virgo: ['clipboard'] },
      lines: [[0.2, 1.5, 'virgo', 'No period? | Lowercase?'], [1.9, 1.7, 'virgo', "It's a SIGN."]] },
    { dur: 3.8, set: lw, back: (x, t, lt) => phone(x, 540, 720, lt, [['l', 'omg yes!!!', 0.0], ['l', 'k', 0.4]], { w: 440, h: 380 }), cast: { virgo: [[0, 540, Y, 260]], aquarius: [[0, 900, Y, 200]] }, mood: { virgo: 'wide', aquarius: 'eyeroll' }, wear: { virgo: ['clipboard'] },
      lines: [[0.6, 1.6, 'virgo', 'Last text had | THREE exclamations!']] , stick: [[2.4, 1.3, 'EVIDENCE', BRAKE]] },
    { dur: 3.8, set: lw, back: (x, t, lt) => { for (let k = 0; k < 6; k++) { const ph = clamp((lt - 0.2 - k * 0.12) / 1.4); x.save(); x.translate(540 + Math.cos(k) * ph * 400, 1000 - ph * 480); x.rotate(ph * 5 + k); box(x, -40, -50, 80, 100, BONE, 4); x.restore() } },
      cast: { virgo: [[0, 540, Y, 260]], pisces: [[0, 180, Y, 180]], aquarius: [[0, 900, Y, 200]] }, mood: { virgo: 'wide', pisces: 'wide', aquarius: 'eyeroll' }, hops: { virgo: [0.2, 0.5, 0.8] }, wear: { virgo: ['clipboard'] }, sfx: [[0.2, 'scratch'], [1.8, 'sob']],
      lines: [[0.3, 1.3, 'virgo', "They're BORED | of me."], [1.8, 1.8, 'pisces', 'they hate you | *sob*']] },
    { dur: 3.8, set: lw, cast: { virgo: [[0, 360, Y, 240]], aquarius: [[0, 760, Y, 240]] }, mood: { virgo: 'wide', aquarius: 'happy' }, wear: { virgo: ['clipboard'] },
      lines: [[0.2, 1.5, 'aquarius', 'Or... | just ask them?'], [1.9, 1.7, 'virgo', 'ASK? Like | a PERSON?']] },
    { dur: 3.8, set: lw, back: (x, t, lt) => phone(x, 540, 720, lt, [['r', 'hey, are we good?', 0.3]], { w: 520, h: 380, typing: 1.4 }), cast: { virgo: [[0, 280, Y, 220]], aquarius: [[0, 820, Y, 220]] }, mood: { virgo: 'squint', aquarius: 'squint' }, wear: { virgo: ['clipboard'] }, sfx: [[0.3, 'blip', 1046.5], [1.4, 'riser', 2.2]],
      lines: [[1.6, 1.9, 'virgo', '...sent. | Oh no. Sent.']] },
    { dur: 3.8, set: lw, back: (x, t, lt) => phone(x, 540, 720, lt, [['r', 'hey, are we good?', 0], ['l', 'YES!! sorry', 0.2], ['l', 'was driving on 59', 0.6], ['l', "can't wait to see you", 1.0]], { w: 560, h: 520 }), front: (x, t, lt) => heartPop(x, t, lt, 540, 1000, 1.2),
      cast: { virgo: [[0, 280, Y + 40, 210]], pisces: [[0, 820, Y + 40, 200]] }, mood: { virgo: lt => lt < 1.2 ? 'wide' : 'heart', pisces: 'heart' }, wear: { virgo: ['clipboard'] }, sfx: [[1.2, 'ding']],
      lines: [[2.0, 1.7, 'pisces', 'they LOVE you | *sob*']] },
    { dur: 3.2, set: lw, cast: { virgo: [[0, 360, Y, 240]], aquarius: [[0, 760, Y, 240]] }, mood: { virgo: 'eyeroll', aquarius: 'wink' }, wear: { virgo: ['clipboard'] },
      lines: [[0.2, 1.5, 'virgo', '40 minutes. | On one letter.'], [1.9, 1.1, 'aquarius', 'We know.']] },
  ],
}

// ── hst076 · Leo sang to your crush on Bellaire (karaoke)
const kar = (s) => lyricSet(s)
const LM = { leo: ['crown', 'mic'] }
const KC = { leo: [[0, 360, Y, 250]], aquarius: [[0, 800, Y + 40, 220]] }
const song = {
  hook: 'Leo sang to | your crush | on Bellaire', key: 'G',
  closing: 'Jan 9. Bring your duet.', endStars: ['leo', 'aquarius', 'pisces', 'libra'],
  lesson: ['Say it plainly.', 'Grand gestures are optional.'],
  lessonSet: kar('♪ duet ♪'), lessonCast: { leo: [[0, 330, Y, 210]], aquarius: [[0, 750, Y, 210]] }, lessonMood: { leo: 'heart', aquarius: 'heart' }, lessonWear: { leo: ['crown'] },
  scenes: [
    { dur: 3.6, set: (x, t) => foodStreet(x, t, { words: ['KARAOKE', 'BOBA', 'PHO', 'HOT POT', 'BAKERY', 'NOODLES'] }), cast: { leo: [[0, 540, Y, 290]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05, 0.4, 0.75] }, wear: { leo: ['crown'] },
      lines: [[0.6, 2.7, 'leo', "Watch me win | your crush."]] },
    { dur: 3.8, set: kar('♪ my heart is a feeder road ♪'), front: (x, t) => notes(x, t, 360, 1000, { n: 4, cell: 7 }), cast: KC, mood: { leo: 'sparkle', aquarius: 'neutral' }, hops: { leo: [0.3, 0.9, 1.5, 2.1] }, wear: LM,
      lines: [[0.4, 2.8, 'leo', '♪ MY HEART | IS A FEEDER ROAD ♪']] },
    { dur: 3.6, set: kar('♪ it goes on and on ♪'), cast: { ...KC, pisces: [[0, 560, 1000, 140]] }, mood: { leo: 'wide', aquarius: 'wide', pisces: 'wide' }, wear: LM, sfx: [[0.4, 'womp']],
      lines: [[0.3, 1.2, 'leo', '♪ AAAAAA ♪'], [1.9, 1.4, 'aquarius', '...was that | a key change?']] },
    { dur: 3.8, set: kar('♪ you are my 610 ♪'), cast: { leo: [[0, 360, Y, 250], [0.8, 420, Y + 70, 230]], aquarius: [[0, 800, Y + 40, 220]] }, mood: { leo: 'sparkle', aquarius: 'eyeroll' }, wear: LM, sfx: [[1.0, 'crickets']],
      lines: [[0.3, 1.6, 'leo', '♪ YOU ARE | MY 6-1-0 ♪'], [2.2, 1.4, 'aquarius', '...are you | okay?']] },
    { dur: 3.6, set: kar('♪ ♪ ♪'), cast: KC, mood: { leo: 'neutral', aquarius: 'neutral' }, wear: { leo: ['crown'] }, sfx: [[0.1, 'tape', 0.6]],
      stick: [[0.2, 1.2, 'MUSIC STOPS', BRAKE]], lines: [[1.6, 1.8, 'leo', 'Okay. | Real talk.']] },
    { dur: 3.8, set: kar(' '), cast: KC, mood: { leo: 'sparkle', aquarius: lt => lt < 2.4 ? 'wide' : 'sparkle' }, wear: { leo: ['crown'] },
      lines: [[0.4, 2.6, 'leo', 'I just like you. | A lot.']] },
    { dur: 3.8, set: kar(' '), front: (x, t, lt) => heartPop(x, t, lt, 580, 1000, 0.4), cast: KC, mood: { leo: 'heart', aquarius: 'heart' }, hops: { leo: [0.4], aquarius: [0.5] }, sfx: [[0.4, 'cheer']],
      lines: [[0.5, 2.6, 'aquarius', 'That was better | than the song.']] },
    { dur: 3.2, set: kar('♪ duet ♪'), cast: KC, mood: { leo: 'sparkle', aquarius: 'happy' }, wear: { leo: ['crown'], aquarius: ['mic'] },
      lines: [[0.2, 1.3, 'aquarius', 'Duet?'], [1.6, 1.4, 'leo', 'Obviously.']] },
  ],
}

export const W03B = { hst069: story(profile), hst070: story(lost), hst071: story(pov), hst072: story(shade), hst073: story(outfit), hst074: story(cousins), hst075: story(kk), hst076: story(song) }
