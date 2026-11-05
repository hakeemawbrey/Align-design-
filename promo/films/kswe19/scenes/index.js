// kswe19 · SIGN SWAP · "Swapped at the Holiday Dinner" (90 s vertical, Month 2 boost m11 #19, long, jazzy · Eb, hard cut)
// Cousins ♋ Cancer and ♒ Aquarius swap right before the family holiday dinner. (Both are blue, so the Aquarius BODY
// always wears Aquarius' pink headphones: st9aquahome.js, read-only.)
//   0.0   frame 0: the holiday table, Aquarius mid-reach for the gravy, the swap bolt mid-strike, the whole family frozen
//         mid-gasp. Hook "So… *are you seeing anyone?*"   2.8 "Wait for *grandma's toast.*"
//   5.0   CH 1 · THE SWAP: the hallway. Cancer, in Aquarius' body: "why do i feel… unbothered?" Aquarius, in Cancer's
//         body: "why do i want to hug EVERYONE"
//   18.0  CH 2 · THE QUESTION: ♌ the aunt: "so! are you seeing anyone?" Record scratch. Cancer-as-Aquarius, calm: "not
//         right now. and i'm really happy." The table: "…oh! good for you!"  CALM ✓
//   34.0  CH 3 · THE CHAOS ROUND: the bread rolls go flying (♈), the same story twice (♊), the seating chart re-done (♍),
//         and Aquarius-as-Cancer hugging every single person.
//   50.0  CH 4 · THE ALBUM: the sofa, the photo album, a baby photo: Aquarius-as-Cancer sobbing "we were SO small"; ♓ the
//         aunt sobbing too.
//   64.0  CH 5 · GRANDMA'S TOAST: ♑ grandma raises a mug: "to whoever you bring home… and to you, if it's just you."
//         Everyone cries; the swap fades back in a warm glow. "am i still the favourite?" "always."
//   87.6  last line "Single at dinner. *Still* the favourite." holds, hard cut at 90.0.
import { drawAquaHeadphones } from '../../st9aquahome.js'
import { makeSwap } from '../../kswe01/scenes/swapfilm.js'
import { star, swapper, swapBolt, swapTag, bubble, sticker, shadow, hearts, sparkles, table, mug, label, drawBits, R, box, INK, GOLD, PINK, RED, BONE, SIGN, pop01, outK, prog, ease, clamp, lerp, r3 } from '../../kswe01/scenes/swapkit.js'

const CA = SIGN('cancer'), AQ = SIGN('aquarius')
// Cancer's soul in Aquarius' body (phones on) · Aquarius' soul in Cancer's body
function canIn(x, t, px, py, s, k, o = {}) { const r = swapper(x, t, px, py, s, 'cancer', 'aquarius', k, o); if (k > 0.55 && (o.pop ?? 1) > 0.3) drawAquaHeadphones(x, r, s, { k: 0 }); return r }
function aqIn(x, t, px, py, s, k, o = {}) { const r = swapper(x, t, px, py, s, 'aquarius', 'cancer', k, o); if (k < 0.45 && (o.pop ?? 1) > 0.3) drawAquaHeadphones(x, r, s, { k: 0 }); return r }

function feast(x, t, y = 1130) {
  table(x, 540, y, 960, '#7a4a2a', '#f4ecdc')
  // a roast, a gravy boat, rolls, candles
  box(x, 440, y - 70, 200, 70, '#c96a3a', { b: 6, hi: 'rgba(255,255,255,0.2)' })
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.beginPath(); x.arc(170 + i * 50, y - 22, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8b86a'; x.beginPath(); x.arc(170 + i * 50, y - 22, 19, 0, Math.PI * 2); x.fill() }
  for (const cx of [360, 720]) { R(x, INK, cx - 10, y - 110, 20, 110); R(x, '#fff3e0', cx - 6, y - 106, 12, 106); R(x, '#ffd27a', cx - 6, y - 128 + Math.sin(t * 11 + cx) * 3, 12, 18) }
}
function gravy(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -60, -30, 120, 50, '#efe6d6', { b: 5 }); R(x, '#8a5a2a', -50, -26, 100, 12); box(x, 60, -20, 40, 14, '#efe6d6', { b: 4 }); x.restore() }
const FAM = [['leo', 150, 0], ['aries', 320, 1], ['gemini', 760, 2], ['virgo', 930, 3]]
function family(x, t, y, mood = 'happy', hops = []) {
  for (const [id, fx, i] of FAM) star(x, t, fx, y, 170, id, { mood: typeof mood === 'function' ? mood(id) : mood, look: [fx < 540 ? 1 : -1, 0.2], seed: i + 3, hops: hops.map(h => h + i * 0.07) })
}
function opening(x, t) {
  family(x, t, 960, 'wide')
  feast(x, t)
  swapBolt(x, t, -0.25, { x1: 540, y1: 300, x2: 540, y2: 1000, colA: CA.color, colB: AQ.color, dur: 1.1 })
  const k = clamp(0.5 + t / 0.6 * 0.5), reach = ease.outCubic(clamp(0.5 + t / 1.0))
  shadow(x, 540, 1560, 260)
  aqIn(x, t, 540, 1380, 300, k, { mood: 'wide', look: [0, -0.8], blink: false, hops: [2.2] })
  gravy(x, lerp(640, 600, reach), 1120, -0.2)
  box(x, lerp(560, 600, reach) - 30, 1150, 60, 40, CA.color, { b: 5 })
  swapTag(x, t, 540, 1760, 'aquarius', 'cancer', 2.1, { out: 4.8, both: true })
}
// ── CH 1
function hallShot(x, t) {
  shadow(x, 320, 1195, 260); shadow(x, 760, 1195, 260)
  canIn(x, t, 320, 960, 290, 1, { mood: t < 8 ? 'neutral' : 'squint', look: [0.4, -0.3], hops: [7.0, 11.4] })
  aqIn(x, t, 760, 960, 290, 1, { mood: t < 12 ? 'wide' : 'sparkle', look: [-1, 0], hops: [12.2, 12.8, 13.4, 16.0] })
  bubble(x, t, 330, 640, 7.0, 11.8, 'why do i feel…\nUNBOTHERED?', { size: 44, tail: -0.3 })
  bubble(x, t, 740, 620, 12.0, 17.6, 'why do i want to\nhug EVERYONE', { size: 44, tail: 0.3, col: '#ffe7a8' })
  if (t > 14.4) { const hk = ease.inOutCubic(prog(t, 14.4, 15.2)); x.save(); x.globalAlpha = hk; heartBig(x, 540, 940, 8); x.restore() }
}
function heartBig(x, cx, cy, cell) { drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, cx, cy, cell) }
// ── CH 2
function questionShot(x, t) {
  family(x, t, 960, id => id === 'leo' ? (t < 21 ? 'happy' : 'wide') : t > 27.6 ? 'happy' : 'neutral', [20.0, 27.8])
  feast(x, t)
  shadow(x, 540, 1560, 260)
  canIn(x, t, 540, 1380, 300, 1, { mood: t < 23.4 ? 'neutral' : 'happy', look: [0, -0.8], hops: [23.6, 27.9] })
  bubble(x, t, 260, 700, 19.6, 23.2, 'so! are you\nseeing anyone?', { size: 44, tail: -0.6, col: '#ffe7a8' })
  bubble(x, t, 540, 1120, 23.6, 27.4, 'not right now.\nand i’m really happy.', { size: 44, tail: null })
  bubble(x, t, 760, 700, 27.8, 31.4, '…oh! good for you!', { size: 44, tail: 0.5 })
  sticker(x, t, 'CALM ✓', 840, 1520, 28.6, 33.8, { col: '#2fc79a', ink: '#fff', size: 56, rot: 0.08 })
}
// ── CH 3: the chaos round (four 4-s gags)
const GAGS = [['the bread rolls', 34.6], ['the same story. twice.', 38.6], ['the seating chart', 42.6], ['the hugs', 46.6]]
function chaosShot(x, t) {
  const g = t < 38.6 ? 0 : t < 42.6 ? 1 : t < 46.6 ? 2 : 3
  feast(x, t, 1180)
  if (g === 0) {
    star(x, t, 300, 1000, 230, 'aries', { mood: 'wide', look: [1, -0.6], hops: [35.0] })
    for (let i = 0; i < 4; i++) { const p = clamp((t - 35.0 - i * 0.12) / 1.2), rx = 330 + p * (300 + i * 80), ry = 1100 - Math.sin(Math.PI * p) * (360 + i * 40); x.fillStyle = INK; x.beginPath(); x.arc(rx, ry, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8b86a'; x.beginPath(); x.arc(rx, ry, 21, 0, Math.PI * 2); x.fill() }
    star(x, t, 800, 1000, 220, 'pisces', { mood: 'wide', look: [-1, -0.6], tears: 1, seed: 6 })
  }
  if (g === 1) {
    star(x, t, 540, 1000, 250, 'gemini', { mood: 'happy', look: [0, 0], hops: [39.0, 39.6, 40.2, 40.8, 41.4] })
    bubble(x, t, 540, 680, 39.0, 40.6, 'so THEN the goose—', { size: 44, tail: 0 })
    bubble(x, t, 540, 680, 40.8, 42.5, 'so THEN the goose—', { size: 44, tail: 0, col: '#ffe7a8' })
    if (t > 40.8) sticker(x, t, 'AGAIN', 820, 520, 40.9, 42.5, { col: RED, ink: '#fff', size: 44, rot: 0.1 })
  }
  if (g === 2) {
    star(x, t, 380, 1000, 240, 'virgo', { mood: 'squint', look: [1, 0], hops: [43.0, 43.8, 44.6] })
    box(x, 600, 760, 300, 360, '#f4ecdc', { b: 6 }); label(x, 'SEATING v7', 750, 800, { size: 30, col: INK, font: 'Inter', weight: 800 })
    for (let i = 0; i < 5; i++) { const sw = Math.floor((t - 42.6) * 2) % 5 === i; R(x, sw ? PINK : '#c9c2b0', 630, 840 + i * 52, 240, 32) }
  }
  if (g === 3) {
    const hug = ease.inOutCubic(prog(t, 46.8, 47.6))
    star(x, t, lerp(220, 380, hug), 1000, 210, 'leo', { mood: 'wide', look: [1, 0], seed: 3 })
    aqIn(x, t, 540, 990, 260, 1, { mood: 'heart', look: [0, 0], hops: [47.0, 47.6, 48.2, 48.8, 49.4] })
    star(x, t, lerp(860, 700, hug), 1000, 210, 'virgo', { mood: t < 48 ? 'wide' : 'happy', look: [-1, 0], seed: 5 })
    hearts(x, t, 47.6, 540, 820, { n: 8, spread: 260 })
  }
  for (const [txt, at] of GAGS) sticker(x, t, txt, 540, 520, at, at + 3.8, { col: GOLD, size: 50, rot: -0.04 })
}
// ── CH 4: the album
function albumShot(x, t) {
  box(x, 180, 1010, 720, 120, '#7a4a6a', { b: 6 }); box(x, 150, 1100, 780, 100, '#8a5a7a', { b: 6, hi: 'rgba(255,255,255,0.18)' })
  // the album, open
  box(x, 330, 600, 420, 300, '#c96a3a', { b: 6 }); R(x, '#fffbea', 344, 614, 190, 272); R(x, '#fffbea', 546, 614, 190, 272)
  for (const [px, c] of [[439, CA.color], [641, AQ.color]]) { box(x, px - 70, 650, 140, 140, '#c9d6ff', { b: 4 }); x.fillStyle = INK; x.beginPath(); x.arc(px, 728, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(px, 728, 28, 0, Math.PI * 2); x.fill() }
  label(x, 'us, age 3', 540, 850, { size: 26, col: INK, font: "'Space Mono'", weight: 700 })
  aqIn(x, t, 350, 1010, 260, 1, { mood: 'sparkle', look: [0.6, -0.8], tears: t < 52.6 ? 1 : 3, hops: [52.7, 53.3, 53.9, 56.4, 57.0] })
  canIn(x, t, 730, 1010, 260, 1, { mood: t < 55 ? 'neutral' : 'happy', look: [-0.6, -0.8], hops: [58.0] })
  bubble(x, t, 330, 460, 52.8, 56.2, 'we were SO small', { size: 46, tail: -0.3 })
  if (t > 56.0) {
    const pk = ease.outCubic(prog(t, 56.0, 56.6))
    star(x, t, lerp(1250, 900, pk), 1450, 270, 'pisces', { mood: 'sparkle', look: [-1, -0.6], tears: 3, hops: [56.7, 57.3, 57.9, 58.5, 59.1, 59.7, 60.3, 60.9] })
    bubble(x, t, 760, 1720, 57.0, 63.6, 'I REMEMBER THIS', { size: 44, col: '#d9d4ff', tail: null })
  }
}
// ── CH 5: grandma's toast
function toastShot(x, t) {
  family(x, t, 960, t > 74 ? 'sparkle' : 'happy', [66.0, 74.2])
  feast(x, t)
  // grandma, standing, a mug raised, round glasses
  const gr = star(x, t, 540, 700, 250, 'capricorn', { mood: t < 72 ? 'happy' : 'sparkle', look: [0, 0.3], tears: t > 74 ? 1 : 0, seed: 12, hops: [65.6, 68.8, 72.2] })
  for (const d of [-1, 1]) { x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(540 + d * 40, gr.top + 112, 26, 0, Math.PI * 2); x.stroke() }
  const raise = ease.outCubic(prog(t, 65.2, 65.8)); mug(x, 700, lerp(820, 640, raise), '#e8344e', 1.1)
  bubble(x, t, 540, 470, 66.0, 69.6, 'to whoever you\nbring home…', { size: 46, tail: 0 })
  bubble(x, t, 540, 470, 69.8, 73.8, '…and to you,\nif it’s just you.', { size: 46, tail: 0, col: '#ffe7a8' })
  // the swap fades back (a warm glow), Cancer on its own again
  const back = ease.inOutCubic(prog(t, 74.0, 75.6))
  if (t > 74 && t < 76.2) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 1380, 40, 540, 1380, 420); g.addColorStop(0, `rgba(255,220,150,${0.5 * Math.sin(Math.PI * prog(t, 74, 76.2))})`); g.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = g; x.fillRect(120, 960, 840, 840); x.restore() }
  shadow(x, 540, 1560, 260)
  canIn(x, t, 540, 1380, 300, 1 - back, { soul: back < 0.5, mood: t < 73.8 ? 'happy' : 'sparkle', look: [0, -0.8], tears: t > 73.8 ? 3 : 0, hops: [74.2, 76.6, 79.0, 83.0] })
  bubble(x, t, 540, 1700, 77.0, 80.6, 'am i still the favourite?', { size: 42, tail: null })
  bubble(x, t, 540, 470, 80.8, 87.2, 'always.', { size: 60, tail: 0, col: '#ffe7a8' })
  if (t > 74.4) star(x, t, 230, 1470, 230, 'pisces', { mood: 'sparkle', look: [1, -0.6], tears: 3, seed: 6, hops: [74.5, 75.1, 75.7, 76.3, 76.9, 77.5, 78.1] })
  hearts(x, t, 81.0, 540, 1200, { n: 9, spread: 300 })
}

const EP = makeSwap({
  duration: 90, ending: 'cut', shade: 1,
  hook: { text: 'So… *are you seeing anyone?*', out: [2.6, 2.8], top: 210 },
  caps: [
    { at: 2.85, out: [4.8, 5.0], text: 'Wait for *grandma’s toast.*', top: 230 },
    { at: 7.6, out: [17.4, 17.6], text: 'Cousins. *Swapped.*', top: 330, size: 80 },
    { at: 23.7, out: [27.4, 27.6], text: 'Cancer, *as Aquarius:*', top: 330, size: 80 },
  ],
  shots: [
    { at: 0, room: 'dinner', roomOpts: { warm: 0.4 }, cam: [1.15, 540, 1080], push: 0.05, draw: opening },
    { at: 5.0, room: 'hall', roomOpts: { warm: 0.2 }, cam: [1.12, 540, 960], push: 0.05, draw: hallShot },
    { at: 18.0, room: 'dinner', roomOpts: { warm: 0.4 }, cam: [1.2, 540, 1080], push: 0.06, draw: questionShot },
    { at: 34.0, room: 'dinner', roomOpts: { warm: 0.4 }, cam: [1.2, 540, 1060], push: 0.05, draw: chaosShot },
    { at: 50.0, room: 'sofa', roomOpts: { warm: 0.5 }, cam: [1.05, 540, 1000], push: 0.06, draw: albumShot },
    { at: 64.0, room: 'dinner', roomOpts: { warm: 0.6 }, cam: [1.15, 540, 1060], push: 0.06, draw: toastShot },
  ],
  fx: [
    { kind: 'whip', at: -0.2, from: 1.45 },
    { kind: 'shake', at: 0.0, len: 0.6, amp: 26 },
    { kind: 'rec', at: 0.8, len: 1.2, caption: 'the holiday dinner. *minute one.*', top: 1580 },
    { kind: 'chapter', at: 5.0, out: [7.4, 7.6], n: 1, title: 'the swap' },
    { kind: 'chapter', at: 18.0, out: [19.4, 19.6], n: 2, title: 'the question' },
    { kind: 'rec', at: 21.2, len: 1.6, caption: 'the question. *every year.*', top: 1580 },
    { kind: 'chapter', at: 34.0, out: [34.5, 34.6], n: 3, title: 'the chaos round' },
    { kind: 'chapter', at: 50.0, out: [52.4, 52.6], n: 4, title: 'the album' },
    { kind: 'chapter', at: 64.0, out: [65.8, 66.0], n: 5, title: 'grandma’s toast' },
    { kind: 'shake', at: 35.0, len: 0.4, amp: 16 },
  ],
  flash: [{ at: 2.0, col: AQ.color, a: 0.4 }, { at: 69.8, col: '#ffe7a8', a: 0.3 }, { at: 80.8, col: PINK, a: 0.3 }],
  punch: [
    { at: 12.2, dur: 1.4, z: 0.08, x: 660, y: 920 }, { at: 23.6, dur: 1.8, z: 0.05, x: 540, y: 1120 },
    { at: 52.7, dur: 1.4, z: 0.08, x: 440, y: 920 }, { at: 69.8, dur: 2.0, z: 0.06, x: 540, y: 900 }, { at: 80.8, dur: 1.6, z: 0.05, x: 540, y: 1060 },
  ],
  last: { at: 87.6, text: 'Single at dinner. *Still* the favourite.', top: 290, size: 86 },
  cues: [
    ['glitter', 0.0, 0.6], ['tom', 0.02, 70, { gain: 0.25, decay: 0.25 }], ['pop', 2.1, 1174.66, 0.05, 0],
    ['pop', 7.0, 783.99, 0.035, -0.3], ['pop', 12.0, 987.77, 0.035, 0.3], ['glitter', 14.4, 15.0],
    ['pop', 19.6, 987.77, 0.04, -0.4], ['pop', 23.6, 783.99, 0.04, 0], ['pop', 27.8, 1174.66, 0.04, 0.4], ['tom', 28.6, 120, { gain: 0.2, decay: 0.15 }],
    ...GAGS.map(([, at], i) => ['pop', r3(at), [659.25, 783.99, 880, 1046.5][i], 0.04, 0]),
    ...[35.0, 35.12, 35.24, 35.36].map(t => ['whoosh', t, 0.2, 0.02]), ['pop', 39.0, 880, 0.03, 0], ['pop', 40.8, 880, 0.03, 0], ['tick', 40.9, 0.06],
    ...[43.0, 43.5, 44.0, 44.5, 45.0, 45.5].map(t => ['tick', t, 0.03]), ['glitter', 47.6, 48.4],
    ['pluck', 52.8, 659.25, 0.035, 0.5, 0], ['pluck', 52.95, 587.33, 0.035, 0.5, 0], ['pluck', 56.8, 523.25, 0.03, 0.5, 0.3],
    ['bell', 65.8, 1318.51, 0.03, 1.2, 0], ['pop', 66.0, 783.99, 0.035, 0], ['pop', 69.8, 987.77, 0.04, 0],
    ['glitter', 74.0, 75.6], ['pluck', 74.3, 783.99, 0.04, 0.6, 0], ['pluck', 74.45, 659.25, 0.04, 0.6, 0], ['pluck', 74.6, 587.33, 0.035, 0.6, 0],
    ['pop', 77.0, 880, 0.035, 0], ['bell', 80.85, 1567.98, 0.04, 1.4, 0], ['glitter', 81.0, 81.8],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
