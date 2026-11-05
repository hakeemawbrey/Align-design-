// kpre12 — PISCES REACTS: "Pisces reacts to one whole kind day" (60 s vertical trial reel, star_advice; dreamy · Db). Hard cut.
// Kit: ../../kpre07/scenes/prkit.js (read-only) on top of hookkit.js. No end card, no card cut. Chapter stickers per moment.
//   0–3    frame 0: Pisces mid-scream-sob, the CRY-O-METER smoking, hook "Five tiny kind moments. Pisces: unwell."
//          promise sticker "wait for #5" · whip zoom
//   3–12   1 THE DOOR      a stranger holds the door for someone carrying too many bags
//  12–22   2 THE EARBUDS   two friends share one pair of earbuds and dance at the bus stop
//  22–32   3 THE COCOA     a neighbour leaves a mug of cocoa + a note for the delivery person
//  32–42   4 THE DOG       a dog greets its person like it's been ten years (it's been an hour)
//  42–60   5 THE TWIST     the clip turns around: LIVE, Pisces crying all day. A friend walks in with a blanket:
//          "you okay?" · "the BEST." · a gold star on the meter · last line, hard cut.
import { buildReact, sobCues, bits, pix, PIX, PAL, INK, BONE, GOLD, PINK, CYAN, MINT, INTER, MONO, label, panel, r3 } from '../../kpre07/scenes/prkit.js'
import { chapter, chapterCues } from '../../hookkit.js'
import { drawSign, drawBubble } from '../../mlpilot/scenes/mlkit.js'

const M = [
  { at: 3.0, title: 'THE DOOR' }, { at: 12.0, title: 'THE EARBUDS' }, { at: 22.0, title: 'THE COCOA' },
  { at: 32.0, title: 'THE DOG' }, { at: 42.0, title: 'THE TWIST' },
]
const END = 60.4
const STICK = M.map((m, i) => ({ at: m.at, out: [r3((M[i + 1]?.at ?? END) - 0.3), r3((M[i + 1]?.at ?? END) - 0.1)], n: i + 1, title: m.title, x: 56, y: 132, color: i === 4 ? GOLD : '#bcb6ff' }))
const PROMISE = { at: 0.9, out: [2.7, 2.9], n: '★', title: 'WAIT FOR #5', x: 300, y: 1830 - 96, color: GOLD }
const mi = t => { for (let i = M.length - 1; i >= 0; i--) if (t >= M[i].at) return i; return -1 }
const bags = (x, cx, cy, c) => { for (let i = 0; i < 4; i++) bits(x, ['KKKKK', 'K...K', 'KRRRK', 'KRRRK', 'KKKKK'].map(r => r.replace(/R/g, 'RGPC'[i])), PAL, cx + (i % 2) * 40 - 20, cy - i * 34, c) }

function clip(x, t, H) {
  const W = H.WIN, i = mi(t), lt = i >= 0 ? t - M[i].at : t
  if (i < 0) {   // frame 0: a montage flicker of all five
    x.fillStyle = '#2a3550'; x.fillRect(W.x, W.y, W.w, W.h)
    label(x, 'TODAY: KINDNESS', W.x + W.w / 2, W.y + 250, { size: 70, col: BONE })
    label(x, '5 moments · 1 Pisces · 0 composure', W.x + W.w / 2, W.y + 340, { size: 30, font: MONO, weight: 700, col: '#bcb6ff' })
    for (let k = 0; k < 8; k++) pix(x, 'heart', W.x + 80 + k * 115, W.y + 470 + Math.sin(t * 4 + k) * 14, 6)
    return
  }
  if (i === 0) {
    x.fillStyle = '#5a4a72'; x.fillRect(W.x, W.y, W.w, W.h); x.fillStyle = '#3a4566'; x.fillRect(W.x, W.y + 480, W.w, 120)
    x.fillStyle = INK; x.fillRect(W.x + 380, W.y + 100, 260, 390); x.fillStyle = '#ffe7a8'; x.fillRect(W.x + 390, W.y + 110, 240, 380)
    const open = H.in(lt, 1.0, 2.0)
    x.save(); x.translate(W.x + 390, 0); x.scale(1 - 0.75 * open, 1); x.fillStyle = '#8a5a3a'; x.fillRect(0, W.y + 110, 240, 380); x.fillStyle = GOLD; x.fillRect(200, W.y + 290, 18, 18); x.restore()
    H.person(W.x + 300, W.y + 410, 15, { col: '#e8a87c', shirt: '#3fb88a', wave: 0 })
    const walk = H.in(lt, 2.0, 5.5)
    H.person(H.lerp(W.x + 860, W.x + 520, walk), W.y + 410, 15, { col: '#8a5a3a', shirt: '#e163d6' })
    bags(x, H.lerp(W.x + 860, W.x + 520, walk) + 70, W.y + 380, 7)
    if (lt > 5.6) label(x, '"thank you!!"', W.x + 620, W.y + 60 + 20, { size: 40, col: BONE, k: H.pop(lt, 5.6) })
  } else if (i === 1) {
    x.fillStyle = '#1d2a66'; x.fillRect(W.x, W.y, W.w, W.h); x.fillStyle = '#3a4566'; x.fillRect(W.x, W.y + 480, W.w, 120)
    x.fillStyle = INK; x.fillRect(W.x + 100, W.y + 120, 16, 360); x.fillStyle = '#f2a33a'; x.fillRect(W.x + 60, W.y + 100, 100, 60)
    label(x, 'BUS', W.x + 110, W.y + 130, { size: 30, col: INK, shadow: false })
    const b1 = Math.abs(Math.sin(lt * 6)) * 24, b2 = Math.abs(Math.sin(lt * 6 + 0.5)) * 24
    H.person(W.x + 400, W.y + 420 - b1, 16, { col: '#e8a87c', shirt: '#5a7be0', wave: lt > 2 ? lt * 8 : 0 })
    H.person(W.x + 620, W.y + 420 - b2, 16, { col: '#c98a5a', shirt: '#ff8fb1', wave: lt > 2 ? lt * 8 + 2 : 0, flip: true })
    x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.moveTo(W.x + 420, W.y + 300 - b1); x.quadraticCurveTo(W.x + 510, W.y + 400, W.x + 600, W.y + 300 - b2); x.stroke()
    for (let k = 0; k < 4; k++) pix(x, 'note', W.x + 300 + k * 140, W.y + 220 - ((lt * 80 + k * 40) % 140), 7)
    if (lt > 4) label(x, 'ONE PAIR · TWO FRIENDS', W.x + W.w / 2, W.y + 60, { size: 34, font: MONO, weight: 700, col: GOLD, k: H.pop(lt, 4) })
  } else if (i === 2) {
    x.fillStyle = '#6a4a5a'; x.fillRect(W.x, W.y, W.w, W.h); x.fillStyle = '#8a6a5a'; x.fillRect(W.x, W.y + 460, W.w, 140)
    x.fillStyle = INK; x.fillRect(W.x + 120, W.y + 80, 240, 390); x.fillStyle = '#3fb88a'; x.fillRect(W.x + 130, W.y + 90, 220, 380)
    pix(x, 'cup', W.x + 260, W.y + 500, 8)
    panel(x, W.x + 420, W.y + 500, 180, 70, { border: BONE, fillC: '#fff8ec' }); label(x, 'stay warm!', W.x + 420, W.y + 500, { size: 26, col: INK, shadow: false })
    const walk = H.in(lt, 1.6, 4.2)
    H.person(H.lerp(W.x + 1000, W.x + 620, walk), W.y + 400, 15, { col: '#c98a5a', shirt: '#c86a3a' })
    bits(x, ['KKKKKK', 'KOOOOK', 'KOOOOK', 'KKKKKK'], PAL, H.lerp(W.x + 1000, W.x + 620, walk) + 70, W.y + 420, 12)
    if (lt > 4.8) { label(x, '♡', H.lerp(W.x + 1000, W.x + 620, walk), W.y + 230, { size: 70, col: PINK, k: H.pop(lt, 4.8) }) }
  } else if (i === 3) {
    x.fillStyle = '#3a2f52'; x.fillRect(W.x, W.y, W.w, W.h); x.fillStyle = '#8a5a3a'; x.fillRect(W.x, W.y + 460, W.w, 140)
    x.fillStyle = INK; x.fillRect(W.x + 640, W.y + 60, 260, 410); x.fillStyle = '#ffe7a8'; x.fillRect(W.x + 650, W.y + 70, 240, 400)
    const open = H.in(lt, 0.6, 1.4)
    x.save(); x.translate(W.x + 650, 0); x.scale(1 - 0.8 * open, 1); x.fillStyle = '#5a4a9a'; x.fillRect(0, W.y + 70, 240, 400); x.restore()
    if (open > 0.5) H.person(W.x + 770, W.y + 400, 15, { col: '#e8a87c', shirt: '#7c74f0' })
    const jump = Math.abs(Math.sin(lt * 9)) * 60 * (lt > 1.2 ? 1 : 0)
    bits(x, ['.KK.....KK', 'KOOK...KOK', 'KOOKKKKKOK', '.KWWWWWWWK.', 'KWWKWWKWWWK', 'KWWWWWWWWWK', '.KWWPPWWWK.', '..KK..KK...'].map(r => r.padEnd(11, '.')), PAL, W.x + 460, W.y + 440 - jump, 11)
    for (let k = 0; k < 4; k++) if (lt > 1.4) pix(x, 'heart', W.x + 400 + k * 50, W.y + 300 - ((lt * 90 + k * 40) % 160), 5)
    label(x, lt < 4 ? 'TIME AWAY: 10 YEARS?' : 'TIME AWAY: 1 HOUR', W.x + 320, W.y + 70, { size: 32, font: MONO, weight: 700, col: lt < 4 ? '#ff6f91' : MINT })
  } else {
    // the twist: the camera turns around
    x.fillStyle = '#16123a'; x.fillRect(W.x, W.y, W.w, W.h)
    label(x, '● LIVE · PISCES, ALL DAY', W.x + W.w / 2, W.y + 60, { size: 32, font: MONO, weight: 700, col: '#ff6f91' })
    drawSign(x, 'pisces', W.x + 380, W.y + 360, 230, t, { mood: lt > 8 ? 'heart' : 'wide', tears: 3, look: [1, 0], seed: 12 })
    const inn = H.in(lt, 2.0, 4.0)
    drawSign(x, 'cancer', H.lerp(W.x + 1100, W.x + 660, inn), W.y + 380, 200, t, { mood: 'happy', look: [-1, 0], seed: 3 })
    if (lt > 5.0) drawBubble(x, W.x + 660, W.y + 170, 'you okay?', { size: 32, k: H.pop(lt, 5.0) })
    if (lt > 7.2) drawBubble(x, W.x + 360, W.y + 170, 'the BEST.', { size: 32, col: '#ffe8f2', k: H.pop(lt, 7.2) })
    const bk = H.in(lt, 6.0, 7.0)
    if (bk > 0) panel(x, W.x + 380, W.y + 470, 300 * bk + 1, 90, { border: '#c06a8a', fillC: '#e08aa8' })
    // 53 s: today's highlights, replayed for the crier
    if (lt > 11) {
      x.fillStyle = `rgba(6,4,18,${0.75 * H.clamp((lt - 11) * 3)})`; x.fillRect(W.x, W.y, W.w, W.h)
      label(x, "TODAY'S HIGHLIGHTS", W.x + W.w / 2, W.y + 90, { size: 44, col: GOLD, k: H.pop(lt, 11.1) })
      ;['THE DOOR', 'THE EARBUDS', 'THE COCOA', 'THE DOG'].forEach((n, k) => { const kk = H.pop(lt, 11.5 + k * 0.5, 0.3, 2.2); const px = W.x + 150 + k * 220; panel(x, px, W.y + 300, 190, 160, { k: kk, border: '#bcb6ff', rot: (k % 2 ? 0.04 : -0.04) }); pix(x, 'heart', px, W.y + 280, 6 * kk); label(x, n, px, W.y + 345, { size: 22, font: MONO, weight: 700, col: BONE, k: kk }) })
      label(x, '+ 1 friend who noticed', W.x + W.w / 2, W.y + 470, { size: 34, col: PINK, k: H.pop(lt, 14.0) })
    }
  }
}

const R = buildReact({
  id: 'kpre12', duration: END, ending: 'cut',
  hook: 'Five tiny kind moments. | Pisces: *unwell.*',
  hookOut: [2.7, 2.95],
  playing: 'one whole day',
  clip,
  tears: t => 3,
  meter: t => { const i = mi(t); if (i < 0) return 1; const lt = t - M[i].at; return Math.min(1, 0.35 + Math.max(0, lt - 1.5) * 0.25 + i * 0.08) },
  mood: t => (t > 50 ? 'heart' : 'wide'),
  react(x, t, H) {
    // the meter smokes when it pegs
    if (mi(t) < 0 || (t > 6 && (t - M[mi(t)].at) > 5)) for (let k = 0; k < 4; k++) { const p = ((t * 0.8 + k / 4) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); x.fillStyle = '#c9c2d6'; x.beginPath(); x.arc(850 + Math.sin(k + t) * 30, 1060 - p * 120, 18 + p * 30, 0, Math.PI * 2); x.fill(); x.restore() }
    // moment 5: the friend steps into the reaction cam too
    if (t > 44) {
      const lt = t - 42, inn = H.in(lt, 2.0, 4.0)
      drawSign(x, 'cancer', H.lerp(1200, 760, inn), 1480, 280, t, { mood: 'happy', look: [-1, 0], seed: 3 })
      const bk = H.in(lt, 6.0, 7.0)
      if (bk > 0) panel(x, 420, 1640, 420 * bk + 1, 110, { border: '#c06a8a', fillC: '#e08aa8' })
      if (lt > 14.5) for (let k = 0; k < 2; k++) pix(x, 'drop', 720 + k * 90, 1470 + ((t * 90 + k * 30) % 90), 6)
      if (lt > 8.2) { pix(x, 'star', 990, 1100, 9 * H.pop(lt, 8.2, 0.35, 2.4)); label(x, 'GOLD STAR', 850, 1300, { size: 30, font: MONO, weight: 700, col: GOLD, k: H.pop(lt, 8.4) }) }
    }
  },
  last: { at: 59.5, text: 'Number five: someone checked on the crier.' },
  extra: [chapter(PROMISE), ...STICK.map(chapter)],
  cues: [...chapterCues(PROMISE), ...STICK.flatMap(chapterCues), ...M.flatMap(m => [['whoosh', r3(m.at - 0.05), 0.4, 0.045]]),
    ['tick', 4.0, 0.05], ['pop', 8.6, 987.77, 0.04, 0.3], ['pop', 16.0, 1174.66, 0.04, 0], ['tick', 23.6, 0.04], ['pop', 26.8, 1318.51, 0.045, 0.3],
    ['tick', 32.6, 0.05], ...Array.from({ length: 8 }, (_, k) => ['pop', r3(33.3 + k * 0.35), 880 + (k % 3) * 110, 0.025, k % 2 ? 0.3 : -0.3]), ['bell', 36.0, 1760, 0.03, 1, 0],
    ['whoosh', 44.0, 0.5, 0.04], ['whoosh', 53.0, 0.4, 0.04], ['pop', 53.5, 880, 0.035, -0.3], ['pop', 54.0, 987.77, 0.035, -0.1], ['pop', 54.5, 1174.66, 0.035, 0.1], ['pop', 55.0, 1318.51, 0.035, 0.3], ['bell', 56.0, 1760, 0.03, 1.2, 0], ...sobCues(56.6, 3, 0.03), ['pop', 47.0, 880, 0.045, 0.3], ['whoosh', 48.0, 0.4, 0.03], ['pop', 49.2, 1174.66, 0.05, -0.3], ['bell', 50.2, 2349.32, 0.035, 1.4, 0], ['glitter', 50.2, 50.9],
    ...[1.0, 6.5, 9.5, 15, 19, 25, 29, 35.5, 39, 45, 51, 55].flatMap(s => sobCues(s, 2, 0.028))],
})
export const { DURATION, SCENES, CUES } = R
