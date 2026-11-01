// yrvirgo: THEN vs NOW, "Wing it (scheduled)." (20 s vertical, Star Talk Then vs Now §6, music: synthwave · Am)
// Story 0–15.6, then the shared end card. The format look and timing live in ./thennow.js (identical in Block B).
//   0.0–7.2   THEN "Virgo dating | in *2016*"  (old phone video, stamp 03·12·2016). ♍ Virgo hands ♉ Taurus, the date,
//             a printed date itinerary that unrolls… and unrolls, down to the floor. Stickers: "a printed *itinerary*" ·
//             "7:15: laugh *(natural)*" (Virgo checks it off with a forced laugh) · "page 1 of *4*" (three more pages
//             flop out, stapled). Taurus reads, wide-eyed. Pisces cries at the thoroughness.
//   7.22      card cut → NOW on the drop.
//   7.27–12.4 NOW "Virgo dating | in *2026*"  A color-coded shared calendar pops up on the wall: dinner, walk, dessert…
//             and one rainbow block: "wing it". Sticker: "shared calendar: *color-coded*". ♍ VIRGO: "I left an hour
//             *open*. for chaos." A reminder pops: "WING IT IN 10 MIN" (the NOW star isn't perfect either).
//   12.55–15.5 PAYOFF  the 2016 polaroid drops top-left, the calendar slides right. THE STARS: "Same Virgo. *Looser*
//             grip." Last: "Wing it *(scheduled)*."
import { makeFilm, R, INK, GOLD, BONE, PINK, SKY, MONO, INTER, drawBits, pop01, outK, popOut, r3, sparkles } from './thennow.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

// ── THEN: the printed itinerary, unrolling from Virgo's hand
const ITIN = ['7:00  arrive', '7:04  small talk', '7:15  laugh (natural)', '7:20  compliment #1', '7:31  dessert?', '7:32  dessert (yes)', '8:00  walk, 12 min', '8:12  goodnight', '8:13  review']
const UNROLL = [0.9, 3.0]
const CHECK_T = 3.75                       // Virgo ticks "laugh (natural)"
const PAGES_T = 5.1                        // pages 2–4 flop out
function itinerary(x, t, T, ctx) {
  if (ctx.era !== 'then' || t > T.sw) return
  const k = pop01(t, 0.7, 0.3, 2)
  if (k <= 0.01) return
  const px = 392, top = 930, w = 272
  const L = lerp(40, 470, ease.outCubic(prog(t, ...UNROLL)))
  x.save(); x.globalAlpha = clamp(k)
  // pages 2–4: stapled behind, flopping down one after another
  for (let p = 2; p >= 0; p--) {
    const pp = ease.outBack(prog(t, PAGES_T + p * 0.18, PAGES_T + p * 0.18 + 0.35), 1.6)
    if (pp <= 0) continue
    const ang = (0.18 + p * 0.16) * pp
    x.save(); x.translate(px + w, top); x.rotate(ang)
    R(x, INK, -4, -4, 120 + 8, 470 * pp + 8); R(x, ['#ece4d2', '#f2ead8', '#f7f1e4'][p], 0, 0, 120, 470 * pp)
    for (let r = 0; r < 12; r++) { const yy = 30 + r * 34; if (yy < 470 * pp - 10) R(x, '#b9ad96', 14, yy, 80 - (r % 3) * 16, 5) }
    x.restore()
  }
  // the sheet
  R(x, 'rgba(6,4,18,0.4)', px + 12, top + 14, w, L)
  R(x, INK, px - 5, top - 5, w + 10, L + 10)
  R(x, '#fbf7ee', px, top, w, L)
  // header + staple
  x.save(); x.beginPath(); x.rect(px, top, w, L); x.clip()
  x.font = `800 21px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('DATE ITINERARY', px + 16, top + 30)
  R(x, '#c9c2d8', px + 16, top + 48, w - 32, 3)
  x.font = `700 17px ${MONO}`
  ITIN.forEach((s, i) => {
    const yy = top + 78 + i * 42
    x.fillStyle = '#3b2a63'; x.fillText(s, px + 40, yy)
    // checkboxes; "laugh (natural)" gets a tick at CHECK_T
    R(x, INK, px + 14, yy - 9, 18, 18); R(x, '#fbf7ee', px + 17, yy - 6, 12, 12)
    if (i < 2 && t > 2.2 + i * 0.4 || i === 2 && t > CHECK_T) { x.fillStyle = '#2f9e5b'; x.font = `800 20px ${INTER}`; x.fillText('✓', px + 15, yy - 1); x.font = `700 17px ${MONO}` }
  })
  x.restore()
  R(x, '#9aa0b8', px + w - 30, top + 8, 18, 5)
  // the roll at the top edge (Virgo's grip)
  R(x, INK, px - 10, top - 14, w + 20, 22); R(x, '#e9e1cf', px - 6, top - 10, w + 12, 14)
  x.restore()
  if (t > CHECK_T && t < CHECK_T + 0.8) sparkles(x, t, px + 22, top + 78 + 2 * 42, CHECK_T, 6, 40, 0.3, ['#2f9e5b', BONE])
}

// ── NOW: the color-coded shared calendar on the wall
const CAL = { x: 180, y: 560, w: 480, head: 70, row: 66 }
const BLOCKS = [
  { t: 7.6, r0: 0, r1: 1, text: 'dinner', col: '#9fe6b0' },
  { t: 7.85, r0: 1, r1: 1.5, text: 'walk', col: SKY },
  { t: 8.1, r0: 1.5, r1: 2, text: 'dessert', col: '#ffb3d0' },
  { t: 8.55, r0: 2, r1: 3, text: 'wing it', wing: true },
]
const HOURS = ['7 PM', '8 PM', '9 PM', '10 PM']
const REMIND_T = 10.5
function calendar(x, t, T, ctx) {
  if (ctx.era !== 'now') return
  const k = pop01(t, T.sw + 0.08, 0.4, 2) * clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const slide = ease.inOutCubic(prog(t, T.pay - 0.05, T.pay + 0.4))
  const ox = CAL.x + 190 * slide, sc = lerp(1, 0.9, slide)
  const H = CAL.head + HOURS.length * CAL.row + 18
  x.save(); x.translate(ox + CAL.w / 2, CAL.y + H / 2); x.scale(k * sc, k * sc); x.translate(-(CAL.w / 2), -(H / 2))
  R(x, 'rgba(6,4,18,0.45)', 16, 18, CAL.w, H)
  R(x, INK, -8, -8, CAL.w + 16, H + 16)
  R(x, '#fbfaff', 0, 0, CAL.w, H)
  R(x, '#2b2160', 0, 0, CAL.w, CAL.head)
  x.font = `800 30px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('SAT · OUR PLANS', 22, CAL.head / 2 + 1)
  // shared: two little sign dots
  for (const [i, c] of [[0, ctx.HERO.color], [1, ctx.DATE.color]]) { R(x, INK, CAL.w - 84 + i * 34, 20, 30, 30); R(x, c, CAL.w - 81 + i * 34, 23, 24, 24) }
  HOURS.forEach((h, i) => {
    const ry = CAL.head + 10 + i * CAL.row
    R(x, '#e3def0', 12, ry, CAL.w - 24, 2)
    x.font = `700 20px ${MONO}`; x.fillStyle = '#7a6f99'; x.fillText(h, 16, ry + 18)
  })
  for (const b of BLOCKS) {
    const p = pop01(t, b.t, 0.3, 2.4)
    if (p <= 0.01) continue
    const by = CAL.head + 14 + b.r0 * CAL.row, bh = (b.r1 - b.r0) * CAL.row - 6, bx = 112, bw = CAL.w - 132
    x.save(); x.translate(bx + bw / 2, by + bh / 2); x.scale(p, p); x.translate(-(bx + bw / 2), -(by + bh / 2))
    R(x, INK, bx - 3, by - 3, bw + 6, bh + 6)
    if (b.wing) {
      const cols = ['#ff8fb1', '#ffd36b', '#9fe6b0', '#8fd8f6', '#c7a6ff']
      const sw = 22, off = (t * 40) % (sw * cols.length)
      x.save(); x.beginPath(); x.rect(bx, by, bw, bh); x.clip()
      for (let i = -2; i < bw / sw + 6; i++) {
        x.fillStyle = cols[((i % cols.length) + cols.length) % cols.length]
        x.beginPath(); const sx = bx + i * sw - off + 60
        x.moveTo(sx, by); x.lineTo(sx + sw, by); x.lineTo(sx + sw - 60, by + bh); x.lineTo(sx - 60, by + bh); x.closePath(); x.fill()
      }
      x.restore()
      R(x, '#fffaf0', bx + bw / 2 - 86, by + bh / 2 - 24, 172, 48)
      x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'
      x.fillText('wing it', bx + bw / 2, by + bh / 2 + 1)
    } else {
      R(x, b.col, bx, by, bw, bh); R(x, 'rgba(255,255,255,0.35)', bx, by, bw, 5)
      x.font = `700 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'
      x.fillText(b.text, bx + 16, by + bh / 2 + 1)
    }
    x.restore()
  }
  // the reminder pops under the wing-it block
  const rk = pop01(t, REMIND_T, 0.3, 2.6) * outK(t, [T.pay - 0.1, T.pay + 0.1])
  if (rk > 0.01) {
    const wob = Math.sin((t - REMIND_T) * 30) * Math.exp(-(t - REMIND_T) * 4) * 0.08
    x.save(); x.translate(CAL.w / 2 + 50, H - 44); x.rotate(-0.03 + wob); x.scale(rk, rk)
    x.font = `700 20px ${MONO}`
    const rw = x.measureText('REMINDER: WING IT · 10 MIN').width + 40
    R(x, 'rgba(6,4,18,0.45)', -rw / 2 + 8, -22, rw, 52); R(x, INK, -rw / 2 - 4, -30, rw + 8, 60); R(x, GOLD, -rw / 2, -26, rw, 52)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('REMINDER: WING IT · 10 MIN', 0, 1)
    x.restore()
  }
  x.restore()
  const wingY = CAL.y + CAL.head + 14 + 2.5 * CAL.row
  sparkles(x, t, CAL.x + 112 + (CAL.w - 132) / 2, wingY, 8.6, 10, 140, 0.7, ['#ff8fb1', '#ffd36b', '#8fd8f6', BONE])
}

const EP = makeFilm({
  id: 'yrvirgo', key: 'Am', seed: 6061,
  year: '2016', stamp: '03·12·2016',
  hero: { sign: 'virgo', lineColor: '#c9e6a0' },
  date: { sign: 'taurus', lineColor: '#9fe6b0' },
  cap0: 'Virgo dating | in *2016*',
  cap1: 'Virgo dating | in *2026*',
  last: 'Wing it *(scheduled)*.',
  stickers: [
    { text: 'a printed *itinerary*', at: 1.6, out: [6.85, 7.1], top: 1395, cx: 520, rot: -2.5 },
    { text: '7:15: laugh *(natural)*', at: 3.6, out: [6.85, 7.1], top: 1507, cx: 565, rot: 2 },
    { text: 'page 1 of *4*', at: 5.05, out: [6.85, 7.1], top: 1619, cx: 500, rot: -1.5 },
    { text: 'shared calendar: *color-coded*', at: 7.75, out: [8.75, 8.95], top: 1420, cx: 540, rot: -2 },
  ],
  nowLine: { who: 'hero', text: 'I left an hour *open*. for chaos.' },
  starsLine: 'Same Virgo. *Looser* grip.',
  snap: 5.5,
  moods(ph, t) {
    if (ph === 'then') {
      if (t > CHECK_T - 0.05 && t < CHECK_T + 0.7) return { mood: 'happy', squash: 0.05 * Math.sin(t * 40) }    // the scheduled laugh
      return { mood: 'sparkle', look: [1, 0.3] }
    }
    if (ph === 'now') return t > REMIND_T && t < REMIND_T + 0.9 ? { mood: 'wide', look: [0.6, -1] } : t > 8.55 && t < 9.1 ? { mood: 'wink' } : { mood: 'happy' }
    return null
  },
  dateMoods(ph, t) {
    if (ph === 'then') return t > PAGES_T + 0.1 ? { mood: 'wide', look: [-1, 0.3], squash: 0.05 } : t > 2.2 ? { mood: 'wide', look: [-1, 0.5] } : { mood: 'neutral', look: [-1, 0] }
    if (ph === 'now') return t > 8.55 ? { mood: 'sparkle', look: [-1, -0.6] } : { mood: 'neutral', look: [-1, -0.6] }
    return null
  },
  heroHops: [CHECK_T, r3(CHECK_T + 0.32), 8.6],
  dateHops: [r3(PAGES_T + 0.2)],
  back: calendar,
  front: itinerary,
  cues: T => [
    ['whoosh', UNROLL[0], 0.9, 0.03], ...[1.2, 1.5, 1.8, 2.1, 2.4].map(v => ['tick', v, 0.02]),
    ['tick', 2.2, 0.03], ['tick', 2.6, 0.03], ['pop', CHECK_T, 1318.51, 0.035, -0.3], ['pop', r3(CHECK_T + 0.16), 1567.98, 0.03, -0.3], ['pop', r3(CHECK_T + 0.32), 1318.51, 0.03, -0.3],
    ...[0, 1, 2].map(p => ['tom', r3(PAGES_T + p * 0.18 + 0.2), 120 - p * 12, { gain: 0.12, decay: 0.2 }]),
    ...BLOCKS.slice(0, 3).map((b, i) => ['tom', r3(b.t + 0.05), 130 + i * 18, { gain: 0.1, decay: 0.16 }]),
    ['glitter', 8.55, 9.2], ['pop', 8.6, 2093, 0.035, 0], ['bell', REMIND_T, 1567.98, 0.03, 1.0, 0.3], ['bell', r3(REMIND_T + 0.15), 1567.98, 0.025, 1.0, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
