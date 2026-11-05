// kxtre09: WAIT FOR IT, "Wait For It: Capricorn's Friend File" (117 s vertical, Trends: Extended ep 9, rows in
// promo/films/month2/m41.md; music: jazzy · Bb). Engine: ../../kxtre01/scenes/xkit.js. No end card; hard cut.
// A slow, suspicious build: ♑ Capricorn builds a spreadsheet about the friends at 11 PM (columns: allergies, favourite
// snack, "hard month?"). ♊ Gemini and ♌ Leo think it's a performance review. Wait for it: every row was a gift.
// ♉ Taurus gets their snack, ♋ Cancer a mug, ♓ Pisces a tissue box with a bow (Pisces bawls). Row 12 is Capricorn's own.
//   0.0–3.6   frame 0: Capricorn mid-slam of a giant spreadsheet onto the table, cells flying; record scratch
//   1 THE FILE · 2 ROWS 1–3 · 3 SUSPICION · 4 THE COLUMNS · 5 THE PRINTER · 6 THE PARTY · 7 WAIT FOR IT…
//   8 ROW 12: "me: say 'I love you guys' out loud". Capricorn says it. Last: "Row twelve: | *said it out loud.*"
import {
  makeEp, star, pisces, room, partyRoom, table, tag, sfx, hearts, sparkles, confetti, label, glowSpot, drawBits,
  prog, lerp, clamp, ease, R, box, GOLD, BONE, PINK, INK, MINT, SKYB, RED, INTER, MONO, r3,
} from '../../kxtre01/scenes/xkit.js'

const ACC = '#9fe6b0'
const CAP = 'capricorn'
const ROWS = [['TAURUS', 'the spicy chips'], ['CANCER', 'mugs. any mug.'], ['PISCES', 'tissues (always)'], ['LEO', 'a mirror'], ['GEMINI', 'two snacks'], ['…', '…'], ['…', '…'], ['…', '…'], ['…', '…'], ['…', '…'], ['…', '…'], ['ME', "say 'I love you guys' out loud"]]
// the spreadsheet: n rows filled, cols visible (0…3), k scale
function sheet(x, t, cx, cy, { n = 3, cols = 1, w = 820, rowH = 64, show = 6, from = 0, k = 1, hi = -1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const H = (show + 1) * rowH
  box(x, -w / 2, -H / 2, w, H, '#ffffff', { b: 8 })
  const heads = ['FRIEND', 'FAV SNACK', 'ALLERGIES', 'HARD MONTH?'], cw = [220, w - 220 - 3 * 0, 0, 0]
  const colW = cols <= 1 ? [220, w - 220] : [180, (w - 180) / cols, (w - 180) / cols, (w - 180) / cols]
  R(x, '#2a9a5a', -w / 2, -H / 2, w, rowH)
  let xx = -w / 2
  for (let c = 0; c <= cols; c++) { x.font = `800 ${cols > 2 ? 22 : 28}px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(heads[c], xx + 14, -H / 2 + rowH / 2); xx += colW[c]; R(x, '#cfd8d0', xx - 2, -H / 2, 3, H) }
  for (let r = 0; r < show; r++) {
    const ri = from + r, y = -H / 2 + (r + 1) * rowH
    R(x, '#cfd8d0', -w / 2, y, w, 3)
    if (ri === hi) R(x, '#fff2a8', -w / 2, y + 3, w, rowH - 3)
    if (ri >= n) continue
    const [nm, snack] = ROWS[ri]
    x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.fillText(`${ri + 1}  ${nm}`, -w / 2 + 12, y + rowH / 2)
    x.font = `700 ${cols > 1 ? 20 : 26}px ${INTER}`; x.fillText(snack, -w / 2 + colW[0] + 12, y + rowH / 2)
    if (cols > 1) { x.fillText(['none', 'none', 'onions', 'none', 'none'][ri] || '', -w / 2 + colW[0] + colW[1] + 12, y + rowH / 2) }
    if (cols > 2) { x.fillText(['march', 'every winter', 'all of them', 'june', 'april'][ri] || '', -w / 2 + colW[0] + colW[1] * 2 + 12, y + rowH / 2) }
  }
  x.restore()
  void cw; void t
}
function laptop(x, cx, cy, w = 900, h = 640) { box(x, cx - w / 2, cy - h / 2, w, h, '#14102c', { b: 10 }); box(x, cx - w / 2 - 40, cy + h / 2, w + 80, 30, '#8a8aa0', { b: 6 }) }
function gift(x, cx, cy, col, k = 1, open = 0) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -60, -50 - open * 40, 120, 30, col, { b: 5 }); box(x, -54, -20, 108, 80, col, { b: 5 }); R(x, GOLD, -8, -20, 16, 80); R(x, GOLD, -8, -50 - open * 40, 16, 30); x.restore() }

function hook(x, t, S) {
  partyRoom(x, t, { warm: 0.6 })
  table(x, 540, 1160, { w: 760 })
  const slam = 1 - ease.outCubic(clamp((t + 0.3) / 0.5))
  x.save(); x.translate(540, 1000 - slam * 200); x.rotate(-0.08 + slam * 0.3); sheet(x, t, 0, 0, { n: 3, w: 640, show: 4, k: 1 }); x.restore()
  for (let i = 0; i < 10; i++) { const a = i * 0.63, d = 300 + (i % 3) * 80 + t * 40; R(x, i % 2 ? '#2a9a5a' : '#ffffff', 540 + Math.cos(a) * d, 1050 + Math.sin(a) * d * 0.5 - 100, 40, 26) }
  star(x, t, CAP, { x: 540, y: 760, s: 220, mood: 'squint', look: [0, 1], squash: 0.1 })
  pisces(x, t, { x: 930, y: 1420, s: 130, tears: 2, look: [-1, -1] })
  void S
}

const C = []
C.push({ name: 'THE FILE', dur: 13, stamp: '11:04 PM', caption: '11 PM. *a new spreadsheet.*',
  cues: Array.from({ length: 20 }, (_, i) => ['tick', r3(1 + i * 0.5), 0.02]),
  draw(x, t, S) {
    room(x, t, { wall: '#262048', wall2: '#2d2654' })
    laptop(x, 540, 760)
    label(x, 'FRIENDS (final) (2)', 540, 490, { size: 30, col: BONE, font: INTER, weight: 800 })
    sheet(x, t, 540, 780, { n: 0, w: 780, show: 6, k: 0.9 })
    const cells = Math.floor(prog(S.u, 1, 11) * 18)
    for (let i = 0; i < cells; i++) R(x, ['#ffd27a', '#9fe6b0', '#ff8fb1'][i % 3], 220 + (i % 6) * 110, 680 + Math.floor(i / 6) * 58, 100, 50)
    star(x, t, CAP, { x: 540, y: 1260, s: 200, mood: 'squint', look: [0, -1], hops: S.hops(3, 6, 9) })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 1, look: [-1, -1], pop: S.w(5, 13), mood: 'sleepy' })
  } })
C.push({ name: 'ROWS 1–3', dur: 13, caption: 'it has *our names* in it.',
  cues: [1.2, 4.0, 6.8].map(v => ['pop', v, 659.25, 0.04, 0]),
  draw(x, t, S) {
    room(x, t, { wall: '#262048', wall2: '#2d2654' })
    laptop(x, 540, 760)
    sheet(x, t, 540, 780, { n: Math.floor(1 + prog(S.u, 1.2, 7.0) * 2.99), w: 780, show: 6, k: 0.9 })
    star(x, t, CAP, { x: 540, y: 1260, s: 200, mood: 'happy', look: [0, -1], hops: S.hops(1.2, 4.0, 6.8) })
    tag(x, 'NOTES COLUMN: PRIVATE', 540, 360, S.w(8.4, 13), { bg: GOLD, size: 34 })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 1, look: [-1, -1], pop: S.w(3, 13) })
  } })
C.push({ name: 'SUSPICION', dur: 14, caption: 'the friends *notice.*',
  bubbles: [{ at: 1.8, end: 5.0, x: 260, y: 620, text: 'is this a… performance review?', tail: 0.2, size: 32 }, { at: 5.0, end: 8.4, x: 820, y: 560, text: 'am I being RANKED??', tail: -0.3, size: 36 }, { at: 9.0, end: 12.6, x: 540, y: 820, text: 'nothing to see here.', size: 38 }],
  cues: [['tom', 8.6, 100, { gain: 0.25, decay: 0.2 }], ['tick', 8.62, 0.06]],
  draw(x, t, S) {
    room(x, t, { wall: '#262048', wall2: '#2d2654' })
    const shut = ease.inCubic(prog(S.u, 8.2, 8.6))
    if (shut < 1) { x.save(); x.translate(540, 1080); x.scale(1, 1 - shut); x.translate(-540, -1080); laptop(x, 540, 760); sheet(x, t, 540, 780, { n: 3, w: 780, show: 6, k: 0.9 }); x.restore() } else box(x, 70, 1060, 940, 40, '#8a8aa0', { b: 6 })
    star(x, t, 'gemini', { x: 160, y: 960, s: 180, mood: 'wide', look: [1, 0], hops: S.hops(1.8) })
    star(x, t, 'leo', { x: 920, y: 940, s: 180, mood: 'squint', look: [-1, 0], hops: S.hops(5.0) })
    star(x, t, CAP, { x: 540, y: 1260, s: 200, mood: S.u > 8.6 ? 'wink' : 'wide', look: [0, -1], hops: S.hops(8.6, 9.0) })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 2, look: [-1, -1], pop: S.w(3, 14) })
  } })
C.push({ name: 'THE COLUMNS', dur: 14, caption: 'more *columns.* more *suspicion.*',
  cues: [['pop', 1.6, 523.25, 0.05, 0], ['pop', 5.0, 587.33, 0.05, 0], ['tom', 8.4, 90, { gain: 0.3, decay: 0.3 }], ['riser', 7.0, 8.4, 0.02]],
  draw(x, t, S) {
    room(x, t, { wall: '#262048', wall2: '#2d2654' })
    laptop(x, 540, 760)
    const cols = S.u < 1.6 ? 1 : S.u < 5 ? 2 : 3
    sheet(x, t, 540, 780, { n: 5, cols, w: 820, show: 6, k: 0.9, hi: S.u > 8.4 ? 2 : -1 })
    if (S.u > 8.4) tag(x, '“HARD MONTH?”', 540, 360, S.w(8.4, 14), { bg: RED, col: BONE, size: 50 })
    star(x, t, CAP, { x: 540, y: 1260, s: 200, mood: 'happy', look: [0, -1], hops: S.hops(1.6, 5.0) })
    star(x, t, 'gemini', { x: 160, y: 1260, s: 160, mood: S.u > 8.4 ? 'wide' : 'squint', look: [1, -1] })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: S.u > 8.4 ? 3 : 2, look: [-1, -1] })
  } })
C.push({ name: 'THE PRINTER', dur: 13, caption: 'then *the printer.*',
  bubbles: [{ at: 7.8, end: 10.8, x: 330, y: 700, text: 'sorry. sorry, printer.', tail: 0.2, size: 36 }],
  cues: [...Array.from({ length: 10 }, (_, i) => ['tick', r3(1 + i * 0.25), 0.04]), ['tom', 4.0, 70, { gain: 0.3, decay: 0.3 }], ['tom', 6.8, 160, { gain: 0.2, decay: 0.1 }], ['whoosh', 7.0, 0.5, 0.04]],
  draw(x, t, S) {
    room(x, t, { wall: '#262048', wall2: '#2d2654' })
    box(x, 520, 960, 380, 200, '#c9c4d8', { b: 8, hi: '#e0dcea' }); R(x, INK, 560, 990, 300, 16)
    const jam = S.u > 4 && S.u < 6.8
    if (jam) { label(x, 'PAPER JAM', 710, 1080, { size: 34, col: RED, font: INTER, weight: 800 }); x.save(); x.translate(710, 950); x.rotate(Math.sin(t * 30) * 0.1); R(x, '#ffffff', -120, -60, 240, 60); x.restore() }
    if (S.u > 6.8) for (let i = 0; i < 12; i++) { const f = S.u - 6.8 + i * 0.12; const px = 710 + Math.sin(i * 2) * 240 * Math.min(1, f), py = 900 - 400 * Math.min(1, f) + 300 * Math.max(0, f - 1); x.save(); x.translate(px, py); x.rotate(f * 2 + i); R(x, INK, -42, -32, 84, 64); R(x, '#ffffff', -38, -28, 76, 56); x.restore() }
    const kick = Math.sin(Math.PI * prog(S.u, 6.4, 7.0))
    star(x, t, CAP, { x: 330 + kick * 60, y: 1100, s: 230, mood: S.u > 7.8 ? 'squint' : jam ? 'wide' : 'neutral', look: [1, 0], squash: kick * 0.1, hops: S.hops(7.8) })
    pisces(x, t, { x: 930, y: 1420, s: 120, tears: 2, look: [-1, -1], pop: S.w(2, 13) })
  } })
C.push({ name: 'THE PARTY', dur: 14, stamp: 'SATURDAY', caption: 'the party. Capricorn *has the sheet.*',
  bubbles: [{ at: 3.0, end: 6.4, x: 540, y: 600, text: 'row one. Taurus.', size: 40 }, { at: 6.8, end: 10.0, x: 860, y: 760, text: 'here it comes…', tail: -0.3, size: 32 }],
  cues: Array.from({ length: 24 }, (_, i) => ['tom', r3(8 + i * 0.25), 140 + (i % 2) * 20, { gain: 0.08 + i * 0.004, decay: 0.08 }]),
  draw(x, t, S) {
    partyRoom(x, t)
    table(x, 540, 1180, { w: 860 })
    ;[['taurus', 220], ['cancer', 380], ['leo', 700], ['gemini', 860]].forEach(([id, px], i) => star(x, t, id, { x: px, y: 1080, s: 150, mood: S.u > 8 ? 'wide' : 'neutral', look: [px < 540 ? 1 : -1, -0.5], squash: S.u > 8 ? 0.03 * Math.sin(t * 20 + i) : 0 }))
    star(x, t, CAP, { x: 540, y: 880, s: 220, mood: 'neutral', look: [0, 0.4], hops: S.hops(3.0) })
    x.save(); x.translate(540, 1000); x.rotate(-0.05); box(x, -90, -60, 180, 120, '#ffffff', { b: 5 }); for (let i = 0; i < 5; i++) R(x, '#2a9a5a', -80, -50 + i * 22, 160, 6); x.restore()
    pisces(x, t, { x: 930, y: 1420, s: 130, tears: 2, look: [-1, -1] })
    if (S.u > 8) tag(x, 'DRUMROLL', 540, 380, S.w(8, 14), { bg: GOLD, size: 44 })
  } })
C.push({ name: 'WAIT FOR IT…', dur: 15, caption: 'every row… *was a gift.*', captionAt: 1.0,
  bubbles: [{ at: 2.4, end: 5.0, x: 220, y: 760, text: 'MY CHIPS', size: 36 }, { at: 5.2, end: 7.8, x: 380, y: 700, text: 'a mug!!', size: 36 }, { at: 10.4, end: 14.6, x: 860, y: 900, text: 'A TISSUE BOX WITH A BOW', tail: -0.3, size: 32, col: '#cfe9ff' }],
  cues: [['pop', 2.2, 783.99, 0.05, -0.6], ['glitter', 2.2, 2.8], ['pop', 5.0, 880, 0.05, -0.3], ['glitter', 5.0, 5.6], ['pop', 7.6, 987.77, 0.05, 0.3], ['bell', 10.2, 1567.98, 0.05, 1.2, 0.6], ['glitter', 10.2, 11.2], ['pluck', 10.8, 392, 0.04, 0.6, 0.6], ['pluck', 11.1, 349.23, 0.04, 0.6, 0.6]],
  draw(x, t, S) {
    partyRoom(x, t)
    table(x, 540, 1180, { w: 860 })
    const opened = [2.2, 5.0, 7.6, 10.2]
    ;[['taurus', 220, PINK], ['cancer', 380, SKYB], ['leo', 700, GOLD]].forEach(([id, px, col], i) => {
      const o = S.u > opened[i]
      star(x, t, id, { x: px, y: 1080, s: 150, mood: o ? 'heart' : 'wide', look: [0, -0.5], hops: S.hops(opened[i], opened[i] + 0.4) })
      gift(x, px, 1150, col, 0.8, ease.outCubic(prog(S.u, opened[i], opened[i] + 0.4)))
      if (o) sparkles(x, t, px, 1100, S.at(opened[i]), 8, 100, i)
    })
    star(x, t, CAP, { x: 540, y: 880, s: 220, mood: 'happy', look: [0, 0.4], hops: S.hops(2.2, 5.0, 7.6, 10.2) })
    const pk = S.u > 10.2
    pisces(x, t, { x: 880, y: 1080, s: 190, tears: pk ? 3 : 2, look: [0, -1], mood: pk ? 'sparkle' : 'wide', noBox: !pk, hops: S.hops(10.2, 10.6, 11.0, 11.4) })
    if (pk) { x.save(); x.translate(880, 1200); box(x, -70, -30, 140, 70, '#9fd8f6', { b: 5 }); drawBits(x, ['B...B', 'BB.BB', 'BBBBB', 'BB.BB', 'B...B'], { B: PINK }, 0, -40, 9); x.restore(); hearts(x, t, S.at(10.4), 880, 960, { n: 7 }) }
  } })
C.push({ name: 'ROW 12', dur: 17.4, caption: null,
  bubbles: [{ at: 4.6, end: 8.0, x: 540, y: 560, text: 'I. love. you. guys.', size: 48 }],
  cues: [['riser', 1.0, 3.6, 0.03], ['tom', 3.8, 90, { gain: 0.3, decay: 0.3 }], ['pop', 4.6, 659.25, 0.05, 0], ['pop', 5.4, 783.99, 0.05, 0], ['pop', 6.2, 880, 0.05, 0], ['pop', 7.0, 1046.5, 0.05, 0], ['bell', 8.4, 1567.98, 0.05, 1.2, 0], ['glitter', 8.4, 9.4]],
  draw(x, t, S) {
    partyRoom(x, t)
    const z = ease.inOutCubic(prog(S.u, 0.4, 3.0)), back = ease.inOutCubic(prog(S.u, 3.6, 4.4))
    if (back < 1) { x.save(); x.globalAlpha = 1 - back; sheet(x, t, 540, 800, { n: 12, w: 900, show: 6, from: 6, k: 0.9 + z * 0.2, hi: 11 }); x.restore() }
    if (back > 0) {
      table(x, 540, 1180, { w: 860 })
      const hug = ease.inOutCubic(prog(S.u, 8.4, 9.6))
      const cast = [['taurus', 220], ['cancer', 380], ['leo', 700], ['gemini', 860]]
      cast.forEach(([id, px], i) => star(x, t, id, { x: lerp(px, 540 + (px - 540) * 0.45, hug), y: lerp(1080, 960, hug), s: 160, pop: back, mood: S.u > 8.4 ? 'heart' : 'wide', look: [px < 540 ? 1 : -1, -0.5], hops: S.hops(8.4, 8.8, 11, 13, 15).map(v => v + i * 0.1) }))
      star(x, t, CAP, { x: 540, y: lerp(880, 900, hug), s: 230, pop: back, mood: S.u > 8 ? 'happy' : 'squint', look: [0, 0], blush: 1, hops: S.hops(4.6, 5.4, 6.2, 7.0, 8.4) })
      pisces(x, t, { x: lerp(930, 760, hug), y: lerp(1420, 1100, hug), s: 160, tears: 3, look: [-1, -1], hops: S.hops(8.4, 8.9, 12, 14) })
      if (S.u > 8.4) { confetti(x, t, S.at(8.4), 540, 800); hearts(x, t, S.at(9 + Math.floor((S.u - 9) / 2) * 2), 540, 760, { n: 6 }) }
    }
  } })

const EP = makeEp({
  id: 'kxtre09', bug: 'WAIT FOR IT…', lead: CAP, accent: ACC, deep: '#2a8a5a',
  music: { style: 'jazzy', key: 'Bb', seed: 4109, breakdown: [57.6], lift: [84.6] },
  hook: {
    text: 'Capricorn made a spreadsheet. | *For friends.*', len: 3.6, draw: hook, top: 250, size: 92,
    fx: [['whip', { at: -0.08, len: 0.45, from: 1.3, blur: 6 }], ['shake', { at: -0.05, len: 0.5, amp: 24 }], ['rec', { at: 1.0, len: 1.5, caption: 'this looks *bad.* (wait for it)', top: 1180 }]],
  },
  promiseAt: 2.55,
  promise: 'wait for *row 12.*',
  chapters: C,
  last: { text: 'Row twelve: | *said it out loud.*', at: 15.4, top: 300, size: 100 },
  ending: 'cut',
  hits: [92.6, 108.0],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
void [glowSpot, MINT, MONO, BONE, INK]
