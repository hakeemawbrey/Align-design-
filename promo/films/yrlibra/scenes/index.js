// yrlibra: THEN vs NOW, "Decided. Together." (20 s vertical, Star Talk Then vs Now §7, music: synthwave · Bm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./thennow.js (identical in Block B).
//   0.0–7.2   THEN "Libra dating | in *2016*"  (old phone video, stamp 10·21·2016). ♎ Libra, chunky old phone in hand,
//             fires off twelve outfit photos; they fly up and pin to the wall, #1–#12. The friends vote: one vote each.
//             Meanwhile ♊ Gemini, the date, waits under a clock spinning through the hour… and dozes off. Stickers:
//             "12 outfits sent *for a vote*" · "the vote: *a 12-way tie*" · "the date started *an hour ago*".
//   7.22      card cut → NOW on the drop.
//   7.27–12.4 NOW "Libra dating | in *2026*"  Libra holds up two shirts on hangers, to the date this time. Sticker:
//             "decision time: *4 seconds*". ♎ LIBRA: "you choose. I *trust* you." Gemini picks the pink one: a gold check.
//             Libra beams… and still texts the group: "they chose!!" (the NOW star isn't perfect either).
//   12.55–15.5 PAYOFF  the 2016 polaroid drops top-left. THE STARS: "One vote. *The right one.*"
//             Last: "*Decided*. Together."
import { makeFilm, R, INK, GOLD, BONE, PINK, SKY, MONO, INTER, drawBits, pop01, outK, popOut, r3, sparkles } from './thennow.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const SHIRT = ['SSS.SSS', 'SSSSSSS', 'S.SSS.S', '..SSS..', '..SSS..', '..SSS..']
const SHIRT_COLS = ['#ff8fb1', '#8fd8f6', '#9fe6b0', '#ffd36b', '#c7a6ff', '#ff9f6b', '#ffffff', '#6b8cff', '#f2c75c', '#ff6f9a', '#7fe0c0', '#d9cdf0']
const GRID = { x: 150, y: 560, cw: 118, ch: 104 }
const SEND0 = 0.95, SEND_GAP = 0.2                 // photo i leaves the phone at SEND0 + i·gap
const VOTE_T = 3.55                                // the votes come in: one each
const DOZE_T = 5.0                                 // the date dozes off
const PHONE = { x: 430, y: 1000 }

// ── THEN: the wall of twelve outfit photos (flying from the phone), the votes, the clock
function outfits(x, t, T, ctx) {
  if (ctx.era !== 'then') return
  for (let i = 0; i < 12; i++) {
    const t0 = SEND0 + i * SEND_GAP
    const p = prog(t, t0, t0 + 0.35)
    if (p <= 0) continue
    const col = i % 4, row = Math.floor(i / 4)
    const tx = GRID.x + col * GRID.cw + GRID.cw / 2, ty = GRID.y + row * GRID.ch + GRID.ch / 2
    const e = ease.outCubic(p)
    const cx = lerp(PHONE.x, tx, e), cy = lerp(PHONE.y - 60, ty, e) - Math.sin(Math.PI * p) * 120
    const sc = lerp(0.3, 1, e)
    x.save(); x.translate(cx, cy); x.rotate((i % 2 ? 0.05 : -0.05) * e + (1 - e) * 0.6); x.scale(sc, sc)
    R(x, 'rgba(6,4,18,0.45)', -46, -40, 100, 92)
    R(x, INK, -52, -48, 104, 96); R(x, '#f6f0e4', -48, -44, 96, 88)
    R(x, '#2a1f55', -42, -38, 84, 62)
    drawBits(x, SHIRT, { S: SHIRT_COLS[i] }, 0, -8, 7, { outline: INK })
    x.font = `700 16px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(`#${i + 1}`, 0, 34)
    x.restore()
    // the votes: a "1" badge on every single one
    const v = pop01(t, VOTE_T + i * 0.06, 0.25, 2.6)
    if (v > 0.01) {
      x.save(); x.translate(tx + 40, ty - 36); x.scale(v, v)
      R(x, INK, -17, -17, 34, 34); R(x, PINK, -14, -14, 28, 28)
      x.font = `800 20px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('1', 0, 1)
      x.restore()
    }
  }
  // the clock above the date: hands spin through the hour
  const ck = pop01(t, 1.9, 0.3, 2.2)
  if (ck > 0.01) {
    const cx = 760, cy = 640, r = 54
    const spin = Math.max(0, t - 2.0) * 7
    x.save(); x.translate(cx, cy); x.scale(ck, ck)
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.beginPath(); x.arc(8, 10, r + 6, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#f6f0e4'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
    for (let h = 0; h < 12; h++) { const a = h / 12 * Math.PI * 2; R(x, '#7a6f99', Math.cos(a) * (r - 10) - 3, Math.sin(a) * (r - 10) - 3, 6, 6) }
    x.strokeStyle = INK; x.lineCap = 'square'
    x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(spin / 12 - Math.PI / 2) * 28, Math.sin(spin / 12 - Math.PI / 2) * 28); x.stroke()
    x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(spin - Math.PI / 2) * 42, Math.sin(spin - Math.PI / 2) * 42); x.stroke()
    R(x, PINK, -5, -5, 10, 10)
    x.restore()
  }
}
const PHONE_BM = ['KKKKKKK', 'KsssssK', 'KsssssK', 'KsssssK', 'KsssssK', 'KKKKKKK', 'KK.K.KK', 'KKKKKKK']
function oldPhone(x, t, T, ctx) {
  if (ctx.era !== 'then' || !ctx.hero) return
  const k = pop01(t, 0.6, 0.3, 2)
  if (k <= 0.01) return
  const buzz = t > SEND0 && t < SEND0 + 12 * SEND_GAP ? Math.sin(t * 60) * 3 : 0
  drawBits(x, PHONE_BM, { K: '#3a3550', s: t > SEND0 && t < SEND0 + 12 * SEND_GAP ? '#cfe9ff' : '#8fb4d8' }, PHONE.x + buzz, PHONE.y + (ctx.hero.F.cy - ctx.hero.y), 10 * k, { rot: 0.12 })
}

// ── NOW: two shirts on hangers, held up to the date; the pick; the group text
const PICK_T = 10.75, TEXT_T = 11.3
function hangers(x, t, T, ctx) {
  if (ctx.era !== 'now') return
  const k = pop01(t, T.sw + 0.15, 0.35, 2.2) * clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const pick = prog(t, PICK_T, PICK_T + 0.3)
  ;[[480, '#6b8cff', -1], [625, '#ff8fb1', 1]].forEach(([hx, col, side], i) => {
    const chosen = i === 1
    const sway = Math.sin(t * 2.2 + i) * 0.05
    const lift = chosen ? -26 * ease.outBack(pick) : 8 * pick
    const dim = !chosen ? 1 - 0.4 * pick : 1
    x.save(); x.globalAlpha = clamp(k) * dim; x.translate(hx, 880 + lift); x.rotate(sway); x.scale(k, k)
    // hanger
    x.strokeStyle = INK; x.lineWidth = 7
    x.beginPath(); x.moveTo(0, -78); x.lineTo(0, -66); x.moveTo(-50, -34); x.lineTo(0, -66); x.lineTo(50, -34); x.stroke()
    x.strokeStyle = '#c9c2d8'; x.lineWidth = 3
    x.beginPath(); x.moveTo(-48, -36); x.lineTo(0, -64); x.lineTo(48, -36); x.stroke()
    drawBits(x, SHIRT, { S: col }, 0, 6, 15, { outline: INK })
    x.restore()
  })
  if (pick > 0) {
    const c = pop01(t, PICK_T + 0.1, 0.3, 2.8) * clamp(popOut(t, T.out))
    x.save(); x.translate(625, 760); x.scale(c, c)
    R(x, INK, -28, -28, 56, 56); R(x, GOLD, -24, -24, 48, 48)
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✓', 0, 2)
    x.restore()
  }
  sparkles(x, t, 625, 860, PICK_T + 0.1, 10, 120, 0.5, [GOLD, PINK, BONE])
  // still texts the group (but after)
  const b = pop01(t, TEXT_T, 0.3, 2.6) * outK(t, [T.pay - 0.1, T.pay + 0.1])
  if (b > 0.01) {
    x.save(); x.translate(260, 770); x.rotate(-0.04); x.scale(b, b)
    x.font = `700 24px ${MONO}`
    const w = x.measureText('to group: "they chose!!"').width + 36
    R(x, 'rgba(6,4,18,0.45)', -w / 2 + 8, -24, w, 54); R(x, INK, -w / 2 - 4, -32, w + 8, 62); R(x, '#9fe6b0', -w / 2, -28, w, 54)
    R(x, '#9fe6b0', -w / 2 + 30, 26, 16, 12); R(x, INK, -w / 2 + 30, 38, 16, 4)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('to group: "they chose!!"', 0, 0)
    x.restore()
  }
}

const EP = makeFilm({
  id: 'yrlibra', key: 'Bm', seed: 7072,
  year: '2016', stamp: '10·21·2016',
  hero: { sign: 'libra', lineColor: '#ffb3d0' },
  date: { sign: 'gemini', lineColor: '#ffe7a0' },
  cap0: 'Libra dating | in *2016*',
  cap1: 'Libra dating | in *2026*',
  last: '*Decided*. Together.', lastLate: 2,
  stickers: [
    { text: '12 outfits sent *for a vote*', at: 1.5, out: [6.85, 7.1], top: 1375, cx: 540, rot: -2.5 },
    { text: 'the vote: *a 12-way tie*', at: 3.75, out: [6.85, 7.1], top: 1483, cx: 560, rot: 2 },
    { text: 'the date started *an hour ago*', at: 5.15, out: [6.85, 7.1], top: 1591, cx: 500, rot: -1.5 },
    { text: 'decision time: *4 seconds*', at: 7.75, out: [8.75, 8.95], top: 1420, cx: 540, rot: -2 },
  ],
  nowLine: { who: 'hero', text: 'you choose. I *trust* you.' },
  starsLine: 'One vote. *The right one.*',
  snap: 5.6,
  moods(ph, t) {
    if (ph === 'then') {
      if (t > VOTE_T + 0.2 && t < VOTE_T + 1.6) return { mood: 'wide', look: [-0.3, -1], squash: 0.04 * Math.sin(t * 30) }
      return { mood: 'sparkle', look: [0.4, -1] }
    }
    if (ph === 'now') return t > PICK_T + 0.15 ? { mood: 'heart' } : { mood: 'happy', look: [1, 0] }
    return null
  },
  dateMoods(ph, t) {
    if (ph === 'then') return t > DOZE_T ? { mood: 'sleepy', squash: 0.05 } : t > 3.0 ? { mood: 'neutral', look: [-0.4, -1] } : { mood: 'neutral', look: [-1, 0] }
    if (ph === 'now') return t > PICK_T ? { mood: 'happy' } : { mood: 'sparkle', look: [-1, -0.4] }
    return null
  },
  heroHops: [r3(VOTE_T + 0.3), r3(PICK_T + 0.2)],
  dateHops: [PICK_T, r3(PICK_T + 0.35)],
  back: outfits,
  mid: hangers,
  front: oldPhone,
  cues: T => [
    ...Array.from({ length: 12 }, (_, i) => ['pop', r3(SEND0 + i * SEND_GAP + 0.3), [659.25, 783.99, 880, 987.77][i % 4], 0.022, (i % 4 - 1.5) * 0.2]),
    ...Array.from({ length: 12 }, (_, i) => ['tick', r3(VOTE_T + i * 0.06), 0.02]),
    ['pluck', r3(VOTE_T + 0.8), 246.94, 0.04, 0.6, 0],
    ...[2.2, 2.75, 3.3, 4.4, 4.95].map(v => ['tick', v, 0.03]),
    ['pop', DOZE_T, 392, 0.03, 0.4], ['pop', r3(DOZE_T + 0.3), 349.23, 0.025, 0.4],
    ['pop', r3(T.sw + 0.2), 1174.66, 0.03, 0],
    ['pop', PICK_T, 1318.51, 0.04, 0.3], ['bell', r3(PICK_T + 0.12), 1567.98, 0.035, 1.2, 0.3], ['glitter', PICK_T, r3(PICK_T + 0.6)],
    ['pop', TEXT_T, 1567.98, 0.03, -0.3], ['pop', r3(TEXT_T + 0.08), 2093, 0.025, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
