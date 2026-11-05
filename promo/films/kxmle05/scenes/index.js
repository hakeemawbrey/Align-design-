// kxmle05 · MOONLIGHT LANE: SIDE STORIES · "Who Feeds Taurus?" (90 s vertical, star_advice; pop · F)
// Rows: promo/films/month2/m48.md. Engine: ../../kxmle01/scenes/sidekit.js (read-only).
//   0.0   frame 0: ♉ Taurus mid-juggle of six flying plates in the rush-hour café, orders shouted from both sides; their
//         own soup sits cold on the table (caught); slam "Feeds everyone. | *Eats* nothing."; record scratch at 0.75
//   4.4   1 · THE CAFÉ: the rush (Gemini: a bun and advice · Leo: a *hype* croissant · Virgo: decaf at exactly warm)
//         · 12.5 closing time: the lane chat is all asks · 20 Pisces: "a tissue, a hug and a *bun?*"
//  26     2 · RUNNING ON EMPTY: loading bar → "Error: Taurus needs a break" · a tray goes flying · 34 asleep standing up,
//         orders still coming · 41 the pantry, one cracker: "who feeds *me?*" (a tear drips from upstairs: Pisces)
//  48     3 · THE STARS ADVISE · 64 4 · THE SOUP: "I'm worn out. Could someone look after me tonight?" → the chat floods
//         · 72 the friends cook (the toast goes flying, Virgo measures salt with a ruler), a talk card, "too much salt.
//         *perfect.*" · 80 LESSON · 83.5 Taurus eats at last · hard cut on "Let them | *feed* you."
import { loadingBar, loadingBarCues, screenShake, shakeCues } from '../../hookkit.js'
import {
  makeSide, lines, hopsOf, cafe, star, cry, pisces, sticker, drip, phone,
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, bump, LANE, standY, drawSign, CAFE,
  drawCafeTable, drawBubble, sparkles, drawPastry, drawTalkCard, drawBlanket, key, clamp, lerp, prog, ease,
} from '../../kxmle01/scenes/sidekit.js'

const L0 = lines([{ t: 2.3, who: 'taurus', text: 'everybody eats. I’ll have mine *later.*' }])
const L1 = lines([
  { t: 5.0, who: 'gemini', text: 'a bun and some *advice,* please!' },
  { t: 7.2, who: 'leo', text: 'one *hype* croissant. make it *loud.*' },
  { t: 9.6, who: 'virgo', text: 'decaf at exactly *warm.*' },
])
const L3 = lines([
  { t: 20.6, who: 'pisces', text: 'can I have a tissue, a hug and a *bun?*' },
  { t: 23.4, who: 'taurus', text: '…of *course,* hon.' },
])
const L4 = lines([{ t: 31.2, who: 'taurus', text: 'I’m *FINE.* totally *fine.*' }])
const L5 = lines([
  { t: 35.0, who: 'leo', text: 'Taurus? …one more *bun?*' },
  { t: 37.6, who: 'taurus', text: '(snore) …*coming!*' },
])
const L6 = lines([{ t: 42.0, who: 'taurus', text: 'I feed everyone. who feeds *me?*' }])
const L7 = lines([{ t: 69.4, who: 'taurus', text: '…oh. *oh.*' }])
const L8 = lines([
  { t: 72.5, who: 'leo', text: 'the toast went *flying!* it’s fine!' },
  { t: 75.4, who: 'gemini', text: 'talk card: what do *you* need?' },
  { t: 77.8, who: 'taurus', text: 'too much salt. *perfect.*' },
])
const L9 = lines([
  { t: 83.8, who: 'taurus', text: 'same time *next* week?' },
  { t: 85.4, who: 'leo', text: 'we’ll bring *dessert.*' },
])
const BOXES = [[L0, 2.1, 4.3], [L1, 4.8, 12.3], [L3, 20.4, 25.9], [L4, 31.0, 33.8], [L5, 34.8, 40.9], [L6, 41.8, 47.8], [L7, 69.2, 71.8], [L8, 72.3, 79.9], [L9, 83.6, 87.6]]
const ALL = BOXES.flatMap(b => b[0])
const H = s => hopsOf(ALL, s)
const T = { rush: 4.4, close: 12.5, pis: 20.0, empty: 26.0, tray: 30.4, asleep: 34.0, pantry: 41.0, adv: 48.0, ask: 64.0, cook: 72.0, toast: 72.6, card: 75.0, bowl: 77.0, lesson: 80.0, end: 83.5 }

function bowl(x, cx, cy, t, { cold = false, steam = 1, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-70, -10, 140, 60); x.fillRect(-60, 50, 120, 12)
  x.fillStyle = '#f3e6d0'; x.fillRect(-62, -4, 124, 50); x.fillStyle = cold ? '#9aa8c8' : '#e8903a'; x.fillRect(-56, -4, 112, 14)
  if (!cold && steam) for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.fillStyle = `rgba(255,255,255,${0.7 * (1 - ph)})`; x.fillRect(-30 + i * 26, -30 - ph * 110, 10, 24) }
  if (cold) { x.fillStyle = '#7fe0ff'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillText('cold', 0, 90) }
  x.restore()
}
const taurusBehind = (t, o = {}) => c => star(c, t, { sign: 'taurus', size: 210, x: CAFE.counter.x + 80, y: CAFE.counter.y, seed: 9, walk: false, hops: H('taurus'), moods: [[0, 'happy', [-1, 1]]], ...o })

function hook(x, t) {
  cafe(x, t)
  pisces(x, 92, 1250, 120, t, { tears: 3, look: [1, -1] })
  star(x, t, { sign: 'gemini', size: 190, x: 150, y: 1440, seed: 8, walk: false, hops: [0.1, 0.6], moods: [[0, 'wide', [1, -1]]] })
  star(x, t, { sign: 'leo', size: 190, x: 930, y: 1440, seed: 7, walk: false, hops: [0.3, 0.8], moods: [[0, 'wide', [-1, -1]]] })
  star(x, t, { sign: 'taurus', size: 290, x: 540, y: 1400, seed: 9, walk: false, hops: [0, 0.4, 2.3, 2.8], moods: [[-1, 'wide', [0, -1]], [2.2, 'happy', [0, -1]]] })
  for (let i = 0; i < 6; i++) {
    const p = ((t * 0.7 + i / 6) % 1 + 1) % 1, a = p * Math.PI * 2
    const px = 540 + Math.cos(a) * 330, py = 860 + Math.sin(a) * 200
    x.fillStyle = INK; x.fillRect(px - 62, py + 14, 124, 16); x.fillStyle = '#fff'; x.fillRect(px - 56, py + 16, 112, 10)
    drawPastry(x, px, py, 5, ['croissant', 'bun', 'cake', 'loaf'][i % 4])
  }
  drawBubble(x, 170, 1120, 'BUN!', { size: 34, col: '#ffe27a' }); drawBubble(x, 910, 1120, 'CROISSANT!', { size: 30, col: '#ffd2a8' })
  x.fillStyle = INK; x.fillRect(690, 1290, 200, 24); x.fillRect(780, 1300, 20, 160)
  bowl(x, 790, 1222, t, { cold: true })
}
function rush(x, t) {
  cafe(x, t, { behind: taurusBehind(t, { moods: [[0, 'happy', [-1, 1]], [9.8, 'squint', [-1, 1]]], hops: [5.6, 7.8, 10.2, ...H('taurus')] }) })
  pisces(x, 92, 1250, 120, t, { tears: 2, look: [1, 0] })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'gemini', size: 210, x: S0.x, y: S0.y, seed: 8, walk: false, hops: H('gemini'), moods: [[0, 'sparkle', [1, -1]]] })
  star(x, t, { sign: 'leo', size: 210, x: S1.x, y: S1.y, seed: 7, walk: false, hops: H('leo'), moods: [[0, 'wink', [-1, -1]]] })
  star(x, t, { sign: 'virgo', size: 200, x: [[8.8, 1200], [9.5, 960]], seed: 6, hops: H('virgo'), moods: [[0, 'neutral', [-1, -1]]] })
  drawCafeTable(x, t, { cups: 2, pastry: null })
  for (const [a, px, kind] of [[5.9, S0.x, 'bun'], [8.1, S1.x, 'croissant']]) { const p = ease.outCubic(prog(t, a, a + 0.45)); if (p > 0) drawPastry(x, lerp(CAFE.counter.x, px + 30, p), lerp(930, 1240, p) - Math.sin(Math.PI * p) * 150, 7, kind) }
  sticker(x, 860, 760, 'ORDERS: 47', { size: 38, bg: '#ffd2e0', rot: 0.05, k: pop01(t, 10.6, 0.3, 2.4) })
}
function closing(x, t) {
  cafe(x, t, { chairsUp: 1, view: 'late', lights: 0.6 })
  const S0 = CAFE.seats[0]
  star(x, t, { sign: 'taurus', size: 220, x: S0.x, y: S0.y, seed: 9, walk: false, squash: 0.06, moods: [[0, 'neutral', [1, 1]], [17.0, 'squint', [1, 1]]] })
  drawCafeTable(x, t, { cups: 0, pastry: null })
  bowl(x, 480, 1250, t, { cold: true })
  const msgs = [{ at: 13.4, side: 'L', text: 'LEO: save me a croissant tmrw?' }, { at: 14.4, side: 'L', text: 'GEMINI: open early?? need advice' }, { at: 15.4, side: 'L', text: 'VIRGO: is the decaf decaf' }, { at: 16.4, side: 'L', text: 'ARIES: can I pay friday' }]
  phone(x, 790, 860, 440, 640, t, { title: 'THE LANE (11)', msgs, alpha: clamp((t - 12.9) / 0.3) })
  sticker(x, 790, 1240, 'nobody asked “how are you?”', { size: 30, bg: '#c9b8ff', rot: -0.03, k: pop01(t, 17.6, 0.3, 2) })
}
function pisCome(x, t) {
  cafe(x, t, { chairsUp: 1, view: 'late', lights: 0.7 })
  const S0 = CAFE.seats[0]
  star(x, t, { sign: 'taurus', size: 220, x: [[0, S0.x], [24.0, S0.x], [24.5, 470]], y: [[0, S0.y], [24.0, S0.y], [24.3, 1440]], seed: 9, hops: H('taurus'), moods: [[0, 'neutral', [1, 0]], [21.0, 'wide', [1, 0]], [23.3, 'happy', [1, 0]]] })
  star(x, t, { sign: 'pisces', size: 220, x: [[20, 1180], [20.8, 740], [24.0, 740], [24.5, 640]], seed: 12, tears: 3, hops: H('pisces'), moods: [[0, 'wide', [-1, 0]], [24.4, 'happy', undefined]] })
  drawCafeTable(x, t, { cups: 0, pastry: null })
  const p = ease.outCubic(prog(t, 23.6, 24.0)); if (p > 0) drawPastry(x, lerp(420, 700, p), lerp(1240, 1100, p), 7, 'bun')
  sparkles(x, t, 560, 1150, 24.5, 14, 200, 4, [PINK, ML_GOLD, BONE])
  sticker(x, 560, 900, 'HUG', { size: 44, bg: '#ffd2e0', rot: 0.06, k: pop01(t, 24.5, 0.3, 2.4) * outK(t, [25.6, 25.9]) })
}
function empty(x, t) {
  const sleepy = t > 26.6 && t < 30.4
  cafe(x, t, { behind: taurusBehind(t, { moods: [[0, sleepy ? 'sleepy' : 'neutral', [-1, 1]], [T.tray, 'wide', [1, 0]], [31.2, 'happy', [-1, 1]]], hops: [T.tray, ...H('taurus')] }) })
  pisces(x, 92, 1250, 120, t, { tears: 2, look: [1, 0] })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'aries', size: 210, x: S0.x, y: S0.y, seed: 1, walk: false, moods: [[0, 'happy', [1, -1]], [T.tray, 'wide', [1, -1]]] })
  star(x, t, { sign: 'libra', size: 210, x: S1.x, y: S1.y, seed: 10, walk: false, moods: [[0, 'happy', [-1, -1]], [T.tray, 'wide', [-1, -1]]] })
  drawCafeTable(x, t, { cups: 2, pastry: null })
  // a tray goes flying
  for (let i = 0; i < 4; i++) { const p = prog(t, T.tray + i * 0.05, T.tray + 1.0 + i * 0.05); if (p > 0 && p < 1) drawPastry(x, lerp(CAFE.counter.x, [120, 360, 820, 1000][i], p), 930 - Math.sin(Math.PI * p) * 380 + p * 300, 6, ['bun', 'croissant', 'cake', 'loaf'][i]) }
}
function asleep(x, t) {
  cafe(x, t, { behind: taurusBehind(t, { moods: [[0, 'sleepy', undefined], [37.5, 'wide', [-1, 1]], [38.6, 'sleepy', undefined]], hops: H('taurus') }) })
  pisces(x, 92, 1250, 120, t, { tears: 2, look: [1, 0] })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'leo', size: 210, x: S0.x, y: S0.y, seed: 7, walk: false, hops: H('leo'), moods: [[0, 'neutral', [1, -1]]] })
  star(x, t, { sign: 'gemini', size: 210, x: S1.x, y: S1.y, seed: 8, walk: false, moods: [[0, 'happy', [-1, -1]]] })
  drawCafeTable(x, t, { cups: 2, pastry: null })
  ;[[35.6, 260, 'one more bun!'], [36.4, 820, 'oat milk?'], [39.2, 300, 'two more!'], [39.9, 800, 'advice??']].forEach(([a, bx, s]) => drawBubble(x, bx, 1060, s, { size: 30, col: '#ffe27a', k: pop01(t, a, 0.25, 2.2) * outK(t, [a + 1.3, a + 1.5]) }))
}
function pantry(x, t) {
  x.fillStyle = '#1d1430'; x.fillRect(0, 0, 1080, 1920)
  for (let r = 0; r < 4; r++) { x.fillStyle = '#5e3828'; x.fillRect(80, 520 + r * 220, 920, 22); for (let j = 0; j < 7; j++) { x.fillStyle = INK; x.fillRect(110 + j * 130, 430 + r * 220, 80, 90); x.fillStyle = ['#e8dcc8', '#d8455f', '#ffd36e', '#7fe0ff'][(r + j) % 4]; x.fillRect(116 + j * 130, 436 + r * 220, 68, 78) } }
  const g = x.createRadialGradient(540, 1250, 40, 540, 1250, 600); g.addColorStop(0, 'rgba(255,220,150,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#3a2a40'; x.fillRect(0, 1440, 1080, 480)
  star(x, t, { sign: 'taurus', size: 240, x: 540, y: 1440, seed: 9, walk: false, squash: 0.09, hops: H('taurus'), moods: [[0, 'neutral', [0, 1]], [42.0, 'squint', [0, 1]]] })
  cry(x, 540, standY(240, 1440), 240, t, t > 43.5 ? 1 : 0, { squash: 0.09, seed: 9 })
  x.fillStyle = INK; x.fillRect(676, 1286, 48, 48); x.fillStyle = '#e0b060'; x.fillRect(680, 1290, 40, 40)
  sticker(x, 760, 1220, 'one cracker', { size: 26, bg: '#fff4dc', rot: 0.06, k: pop01(t, 41.6, 0.3, 2) })
  drip(x, 880, 0, 1440, t, 45.6, 1.0); drip(x, 880, 0, 1440, t, 46.7, 1.0)
  sticker(x, 860, 330, '(Pisces, upstairs)', { size: 30, k: pop01(t, 45.4, 0.3, 2) * outK(t, [47.6, 47.9]), rot: 0.05, bg: '#c9b8ff' })
}
function ask(x, t) {
  pantry(x, Math.min(t, 47))
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(0, 0, 1080, 1920)
  const msgs = [{ at: 64.8, side: 'R', text: 'I’m worn out. Could someone look after me tonight?' }, { at: 66.6, side: 'L', text: 'GEMINI: ON IT' }, { at: 67.0, side: 'L', text: 'LEO: say less' }, { at: 67.4, side: 'L', text: 'VIRGO: making a plan' }, { at: 67.8, side: 'L', text: 'PISCES: crying, coming' }]
  phone(x, 600, 900, 600, 900, t, { title: 'THE LANE (11)', msgs, typing: [65.6, 66.6] })
  star(x, t, { sign: 'taurus', size: 220, x: 170, y: 1470, seed: 9, walk: false, hops: [66.6, 67.0, 67.4, 67.8, ...H('taurus')], moods: [[0, 'neutral', [1, -1]], [66.6, 'wide', [1, -1]], [69.4, 'happy', [1, -1]]] })
  cry(x, 170, standY(220, 1470), 220, t, t > 68 ? 2 : 0)
  sparkles(x, t, 600, 1100, 66.6, 14, 260, 5, [ML_GOLD, PINK, BONE])
}
function cook(x, t) {
  cafe(x, t, { behind: c => {
    star(c, t, { sign: 'leo', size: 200, x: CAFE.counter.x - 60, y: CAFE.counter.y, seed: 7, walk: false, hops: [T.toast, ...H('leo')], moods: [[0, 'wide', [1, 0]], [73.6, 'happy', [0, 1]]] })
    star(c, t, { sign: 'virgo', size: 200, x: CAFE.counter.x + 160, y: CAFE.counter.y, seed: 6, walk: false, moods: [[0, 'squint', [0, 1]]] })
  } })
  pisces(x, 92, 1250, 120, t, { tears: 3, mood: 'happy', look: [1, 0], pull: bump(t, 78.2, 0.6) })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'taurus', size: 220, x: S0.x, y: S0.y, seed: 9, walk: false, hops: [77.6, ...H('taurus')], moods: [[0, 'wide', [1, 0]], [75.8, 'happy', [1, 0]], [77.8, 'heart', undefined]] })
  drawBlanket(x, S0.x - 130, 1330, 260, 90, t, { col: '#c05a6a' })
  star(x, t, { sign: 'gemini', size: 210, x: S1.x, y: S1.y, seed: 8, walk: false, hops: [T.card, ...H('gemini')], moods: [[0, 'happy', [-1, 0]]] })
  drawCafeTable(x, t, { cups: 1, pastry: null })
  // the toast goes flying
  const p = prog(t, T.toast, T.toast + 1.1); if (p > 0 && p < 1) { const tx = lerp(CAFE.counter.x - 60, 1150, p), ty = 900 - Math.sin(Math.PI * p) * 400; x.fillStyle = INK; x.fillRect(tx - 34, ty - 30, 68, 60); x.fillStyle = '#c98a3a'; x.fillRect(tx - 28, ty - 24, 56, 48) }
  sticker(x, CAFE.counter.x + 160, 760, 'SALT: 2 cm', { size: 30, bg: '#c9f7e0', rot: 0.05, k: pop01(t, 73.8, 0.3, 2.2) * outK(t, [76.6, 76.9]) })
  const ck = pop01(t, T.card, 0.3, 2) * outK(t, [76.8, 77.1]); if (ck > 0.01) drawTalkCard(x, 560, 940, 300 * ck, t, { q: 'What do you need this week?', rot: -0.04 })
  bowl(x, 480, 1250, t, { k: pop01(t, T.bowl, 0.35, 2) })
  sparkles(x, t, 480, 1200, 77.8, 14, 200, 7, [ML_GOLD, PINK, BONE])
}
function ending(x, t) {
  cafe(x, t)
  const S0 = CAFE.seats[0]
  star(x, t, { sign: 'taurus', size: 230, x: S0.x, y: S0.y, seed: 9, walk: false, hops: [84.0, 86.4, ...H('taurus')], moods: [[0, 'happy', [1, 0]], [85.6, 'heart', undefined]] })
  drawBlanket(x, S0.x - 130, 1330, 260, 90, t, { col: '#c05a6a' })
  star(x, t, { sign: 'leo', size: 200, x: 720, y: 1440, seed: 7, walk: false, hops: H('leo'), moods: [[0, 'happy', [-1, 0]]] })
  star(x, t, { sign: 'virgo', size: 190, x: 880, y: 1450, seed: 6, walk: false, moods: [[0, 'happy', [-1, 0]]] })
  star(x, t, { sign: 'gemini', size: 190, x: 600, y: 1150, seed: 8, walk: false, moods: [[0, 'sparkle', [-1, 0]]] })
  star(x, t, { sign: 'pisces', size: 200, x: 970, y: 1180, seed: 12, walk: false, tears: 3, moods: [[0, 'happy', undefined]], hops: [85.0, 87.8] })
  drawCafeTable(x, t, { cups: 2, pastry: 'cake' })
  bowl(x, 470, 1250, t)
  sparkles(x, t, 470, 1180, 84.0, 12, 200, 9, [ML_GOLD, PINK, BONE])
}

const LOAD = { at: 26.6, len: 3.4, label: 'running on empty…', stallAt: 99, error: 'Error: Taurus needs a break', y: 560 }
const SHAKE = { at: T.tray, len: 0.5, amp: 24 }
const S = makeSide({
  id: 'kxmle05', duration: 90, lastAt: 88.3,
  music: { style: 'pop', key: 'F', seed: 4805, hits: [T.tray, 66.6, 77.8, 84.0] },
  hook: { text: 'Feeds everyone. | *Eats* nothing.', size: 112 },
  rec: { at: 0.75, len: 1.4, caption: 'yep. that’s *Taurus.*', sub: 'the café, 7:58 PM' },
  caught: { x: 790, y: 1240, r: 140, ry: 110, label: 'THEIR SOUP', arrow: 'tr' },
  promise: 'wait for the *soup*',
  chapters: [{ at: T.rush, title: 'the café' }, { at: T.empty, title: 'running on empty', y: 1215 }, { at: T.adv + 0.1, title: 'the stars advise', y: 1215 }, { at: T.ask, title: 'the soup' }],
  scenes: [[0, hook], [T.rush, rush], [T.close, closing], [T.pis, pisCome], [T.empty, empty], [T.asleep, asleep], [T.pantry, pantry], [T.adv, pantry], [T.ask, ask], [T.cook, cook], [T.end, ending]],
  boxes: BOXES,
  caps: [
    { text: 'The café | *rush.*', at: 4.6, out: [7.0, 7.3], size: 100, late: 1, lateAt: 5.0 },
    { text: 'Everyone’s | *person.*', kicker: 'CLOSING TIME', at: 12.7, out: [16.3, 16.6], late: 1, lateAt: 13.3 },
    { text: 'Nobody asks | *back.*', at: 16.9, out: [19.6, 19.9], late: 1, lateAt: 17.4 },
    { text: 'Ask *out loud.*', at: 64.3, out: [66.4, 66.7], size: 100, late: 2, lateAt: 64.7 },
    { text: 'Let them | *feed* you.', at: 87.6, out: null, size: 108, late: 2, lateAt: 88.0 },
  ],
  advise: {
    at: T.adv, out: [63.55, 64.0],
    cards: [
      { at: 49.3, icon: 'cup', head: 'Givers need *too.*', body: 'Being the strong friend doesn’t mean you need nothing.' },
      { at: 54.3, icon: 'question', head: 'They can’t read *your* mind.', body: 'Running on empty in silence looks like “fine” from outside.' },
      { at: 59.3, icon: 'chat', head: 'Ask for it *out loud.*', body: '“I’m worn out. Could someone look after me tonight?”' },
    ],
    lines: [
      { t: 49.1, text: 'Taurus, this one’s *yours.*' },
      { t: 51.6, text: 'you fill every plate but *yours.*' },
      { t: 54.6, text: 'they love you. they just can’t *see* it.' },
      { t: 57.2, text: '“fine” is hiding the *real* answer.' },
      { t: 59.6, text: 'say it plainly. *once.*' },
      { t: 61.6, text: 'then let them *show up.*' },
    ],
  },
  lesson: { at: T.lesson, out: [83.25, 83.5], text: 'Let them | *show up.*', chip: '+1 SOUP (SALTY)' },
  fx: [[loadingBar, LOAD, loadingBarCues], [screenShake, SHAKE, shakeCues]],
  cues: [
    ...[0.1, 0.35, 0.6].map(a => ['pop', a, 1046.5, 0.03, 0]),
    ['whoosh', T.rush, 0.4, 0.04], ['whoosh', 5.9, 0.35, 0.035], ['whoosh', 8.1, 0.35, 0.035], ['pop', 10.6, 523.25, 0.04, 0.2],
    ['whoosh', T.close, 0.45, 0.04], ...[13.4, 14.4, 15.4, 16.4].map(a => ['pop', a, 880, 0.035, -0.25]), ['pop', 17.6, 392, 0.04, 0.2],
    ['whoosh', T.pis, 0.4, 0.035], ['whoosh', 23.6, 0.3, 0.03], ['pop', 24.5, 1318.51, 0.045, 0], ['glitter', 24.5, 25.1],
    ['whoosh', T.empty, 0.4, 0.04], ['whoosh', T.tray, 0.6, 0.05], ['crash', T.tray + 0.9, { gain: 0.02, len: 0.6 }],
    ['whoosh', T.asleep, 0.4, 0.035], ...[35.6, 36.4, 39.2, 39.9].map(a => ['pop', a, 987.77, 0.03, 0.2]),
    ['whoosh', T.pantry, 0.5, 0.04], ['pluck', 46.5, 1567.98, 0.03, 0.5, 0.3], ['pluck', 47.6, 1567.98, 0.03, 0.5, 0.3],
    ['pop', 64.8, 1174.66, 0.04, 0.25], ...[66.6, 67.0, 67.4, 67.8].map((a, i) => ['pop', a, [880, 987.77, 1174.66, 1318.51][i], 0.045, -0.25]), ['glitter', 66.6, 68.2],
    ['whoosh', T.cook, 0.4, 0.04], ['whoosh', T.toast, 0.6, 0.05], ['pop', 73.8, 783.99, 0.035, 0.2], ['pop', T.card, 1318.51, 0.045, 0], ['pop', T.bowl, 1046.5, 0.05, 0], ['bell', 77.8, 1760, 0.035, 1.4, 0], ['glitter', 77.8, 78.5],
    ['whoosh', T.end, 0.4, 0.04], ['glitter', 84.0, 84.7], ['pluck', 87.8, 1567.98, 0.03, 0.5, 0.3],
  ],
})
export const { DURATION, SCENES, CUES, MUSIC, CHECK } = S
