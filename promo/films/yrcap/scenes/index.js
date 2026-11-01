// yrcap: THEN vs NOW, "After hours, for you." (20 s vertical, Star Talk Then vs Now §10, music: synthwave · Em)
// Story 0–15.6, then the shared end card. The format look and timing live in ./thennow.js (identical in Block B).
//   0.0–7.2   THEN "Capricorn dating | in *2016*"  (old phone video, stamp 02·08·2016). ♑ Capricorn, in a little
//             necktie, keeps office hours. The text thread (6:02 PM): ♌ Leo, the date: "hey :) dinner tonight?" ·
//             Capricorn: "auto-reply: back at 9 AM." · then, stamped MON 9:01 AM: "Yes." Stickers:
//             "texts answered: *9 to 5*" · "6:02 PM: *out of office*" · "reply: *Monday, 9:01 AM*".
//   7.22      card cut → NOW on the drop.
//   7.27–12.4 NOW "Capricorn dating | in *2026*"  11:04 PM. Capricorn is dozing (zzz)… Leo: "still up?" Capricorn
//             wakes and answers in a second, with a big pixel heart. Sticker: "11:04 PM: *still up*". ♑ CAPRICORN:
//             "for you, the office is *always open*." Then it signs off anyway: "Best regards, C." (still Capricorn).
//   12.55–15.5 PAYOFF  the 2016 polaroid drops top-left. THE STARS: "Office closed. *Heart open.*"
//             Last: "*After hours*, for you."
import { makeFilm, R, INK, GOLD, BONE, PINK, ROSE, SKY, MONO, INTER, HEART, drawBits, pop01, outK, popOut, r3, sparkles } from './thennow.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const PANEL = { x: 140, y: 560, w: 580, h: 340, head: 56 }
const THEN_MSG = [
  { t: 1.6, side: 'r', text: 'hey :) dinner tonight?' },
  { t: 3.3, side: 'l', text: 'auto-reply: back at 9 AM.' },
  { t: 5.05, side: 'l', text: 'Yes.', stamp: 'MON 9:01 AM' },
]
const NOW_MSG = [
  { t: 7.75, side: 'r', text: 'still up?' },
  { t: 8.35, side: 'l', heart: true },
  { t: 10.9, side: 'l', text: 'Best regards, C.' },
]
const WAKE_T = 7.95, HEART_T = 8.35

function thread(x, t, T, ctx) {
  const era = ctx.era
  const msgs = era === 'then' ? THEN_MSG : NOW_MSG
  const t0 = era === 'then' ? 0.6 : T.sw + 0.08
  const k = pop01(t, t0, 0.35, 2) * clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const slide = era === 'now' ? ease.inOutCubic(prog(t, T.pay - 0.05, T.pay + 0.4)) : 0
  const sc = k * lerp(1, 0.86, slide)
  x.save(); x.translate(PANEL.x + PANEL.w / 2 + 170 * slide, PANEL.y + PANEL.h / 2); x.scale(sc, sc); x.translate(-PANEL.w / 2, -PANEL.h / 2)
  R(x, 'rgba(6,4,18,0.45)', 14, 16, PANEL.w, PANEL.h)
  R(x, INK, -6, -6, PANEL.w + 12, PANEL.h + 12)
  R(x, era === 'then' ? '#e9ecf2' : '#141033', 0, 0, PANEL.w, PANEL.h)
  R(x, era === 'then' ? '#5d6b8a' : '#2b2160', 0, 0, PANEL.w, PANEL.head)
  x.font = `800 26px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('♌︎ LEO', 20, PANEL.head / 2 + 1)
  x.font = `700 24px ${MONO}`; x.textAlign = 'right'
  x.fillStyle = era === 'then' ? '#ffe7a0' : SKY
  x.fillText(era === 'then' ? '6:02 PM' : '11:04 PM', PANEL.w - 18, PANEL.head / 2 + 1)
  // the bubbles stack downward
  let y = PANEL.head + 20
  for (const m of msgs) {
    const p = pop01(t, m.t, 0.3, 2.6)
    if (p <= 0.01) break
    x.font = `700 26px ${INTER}`
    const w = m.heart ? 120 : x.measureText(m.text).width + 40, h = m.heart ? 92 : 56
    const bx = m.side === 'r' ? PANEL.w - 20 - w : 20
    const fill = m.side === 'r' ? (era === 'then' ? '#ffd36b' : '#ffb347') : (era === 'then' ? '#ffffff' : '#c9e6a0')
    x.save(); x.translate(bx + (m.side === 'r' ? w : 0), y + h / 2); x.scale(p, p); x.translate(-(m.side === 'r' ? w : 0), -h / 2)
    R(x, INK, -4, -4, w + 8, h + 8); R(x, fill, 0, 0, w, h)
    if (m.heart) {
      const beat = 1 + 0.12 * Math.max(0, Math.sin((t - m.t) * 9))
      drawBits(x, HEART, { H: ROSE }, w / 2, h / 2, 9 * beat)
    } else {
      x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(m.text, 20, h / 2 + 1)
    }
    x.restore()
    if (m.stamp) {
      x.font = `700 18px ${MONO}`; x.fillStyle = era === 'then' ? '#b8432e' : SKY; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText(m.stamp, bx + w + 16, y + h / 2)
    }
    y += h + 16
  }
  x.restore()
  if (era === 'now') sparkles(x, t, PANEL.x + 80, PANEL.y + PANEL.head + 20 + 56 + 16 + 46, HEART_T + 0.05, 10, 110, 0.4, [ROSE, PINK, GOLD])
}

// ── the necktie (both eras: Capricorn is Capricorn), in sprite cells
function tie(x, F, t, T, ctx) {
  const fl = ctx.era === 'now' ? Math.sin(t * 3) * 0.3 : 0
  x.fillStyle = INK
  x.fillRect(16, 24, 4, 3); x.fillRect(15.5 + fl, 26.5, 5, 6.5); x.fillRect(16.5 + fl, 33, 3, 1.5)
  x.fillStyle = ctx.era === 'then' ? '#5d6b8a' : '#c0392b'
  x.fillRect(17, 25, 2, 1.5); x.fillRect(16.5 + fl, 27, 3, 5.5); x.fillRect(17.5 + fl, 32.5, 1, 1)
}

// ── THEN: the office-hours plaque on the wall above Capricorn
function plaque(x, t, T, ctx) {
  if (ctx.era !== 'then') return
  const k = pop01(t, 0.9, 0.3, 2.4)
  if (k <= 0.01) return
  x.save(); x.translate(862, 662); x.rotate(0.04); x.scale(k * 0.85, k * 0.85)
  R(x, 'rgba(6,4,18,0.45)', -110, -50, 236, 112)
  R(x, INK, -122, -60, 244, 112); R(x, '#d9b25c', -116, -54, 232, 100); R(x, '#f2d58a', -116, -54, 232, 8)
  x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('OFFICE HOURS', 0, -18); x.font = `700 30px ${MONO}`; x.fillText('9 – 5', 0, 20)
  x.restore()
}

const EP = makeFilm({
  id: 'yrcap', key: 'Em', seed: 1105,
  year: '2016', stamp: '02·08·2016',
  hero: { sign: 'capricorn', lineColor: '#c9e6a0' },
  date: { sign: 'leo', lineColor: '#ffd27a' },
  cap0: 'Capricorn dating | in *2016*',
  cap1: 'Capricorn dating | in *2026*',
  last: '*After hours*, for you.', lastLate: 2,
  stickers: [
    { text: 'texts answered: *9 to 5*', at: 1.5, out: [6.85, 7.1], top: 1375, cx: 520, rot: -2.5 },
    { text: '6:02 PM: *out of office*', at: 3.45, out: [6.85, 7.1], top: 1483, cx: 560, rot: 2 },
    { text: 'reply: *Monday, 9:01 AM*', at: 5.2, out: [6.85, 7.1], top: 1591, cx: 510, rot: -1.5 },
    { text: '11:04 PM: *still up*', at: 7.75, out: [8.75, 8.95], top: 1420, cx: 540, rot: -2 },
  ],
  nowLine: { who: 'hero', text: 'for you, the office is *always open*.' },
  starsLine: 'Office closed. *Heart open.*',
  snap: 5.6,
  moods(ph, t) {
    if (ph === 'then') return t > 3.3 && t < 4.4 ? { mood: 'squint', look: [1, -1] } : { mood: 'neutral', look: [1, -1] }
    if (ph === 'now') return t < WAKE_T ? { mood: 'sleepy' } : t < HEART_T ? { mood: 'wide', look: [1, -1], squash: 0.06 } : { mood: 'heart' }
    return null
  },
  dateMoods(ph, t) {
    if (ph === 'then') return t > 5.1 ? { mood: 'squint', look: [-1, -1] } : t > 3.35 ? { mood: 'wide', look: [-1, -1] } : { mood: 'sparkle', look: [-1, -1] }
    if (ph === 'now') return t > HEART_T + 0.1 ? { mood: 'heart', look: [-1, 0] } : { mood: 'sparkle', look: [-1, -1] }
    return null
  },
  heroHops: [WAKE_T, r3(WAKE_T + 0.25)],
  dateHops: [1.6, r3(HEART_T + 0.15), r3(HEART_T + 0.5)],
  back: (x, t, T, ctx) => { thread(x, t, T, ctx); plaque(x, t, T, ctx) },
  heroProp: tie,
  cues: T => [
    ...THEN_MSG.map((m, i) => ['pop', m.t, m.side === 'r' ? 987.77 : 659.25, 0.035, m.side === 'r' ? 0.3 : -0.3]),
    ['tick', 0.95, 0.03], ['pluck', 3.35, 220, 0.035, 0.6, -0.2], ['pluck', 5.1, 246.94, 0.035, 0.6, -0.2],
    ['pop', 7.75, 987.77, 0.035, 0.3], ['pop', WAKE_T, 1567.98, 0.03, -0.2],
    ['pop', HEART_T, 1318.51, 0.045, -0.3], ['bell', r3(HEART_T + 0.08), 1567.98, 0.035, 1.3, -0.2], ['glitter', HEART_T, r3(HEART_T + 0.6)],
    ['pop', 10.9, 659.25, 0.03, -0.3], ['pop', r3(10.98), 587.33, 0.025, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
