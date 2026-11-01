// trtelltaurus: TELL ME WITHOUT TELLING ME, "Tell me you're a Taurus without telling me." (20 s vertical, Star Talk Trends §1,
// music: pop · G). Story 0–15.6, then the shared end card. The format look lives in ./tellkit.js (identical in all five).
//   0.0–2.1    hook: "Tell me you’re a *Taurus* | without telling me." ♉ Taurus pops in, cosy, and winks.
//   2.1–4.85   TELL 1 "five blankets. *minimum.*"  Five blankets thump down one by one (×1 … ×5) until only Taurus's eyes peek
//              out: "perfect."
//   4.85–7.6   TELL 2 "orders *the same thing.* every time."  Three order tickets: MON / WED / FRI, "the usual". The date:
//              "try something new?"  Taurus: "I did. extra fries."
//   7.6        card cut.
//   7.6–10.95  TELL 3 (the twist) "shares *the last fry.* (the big one.)"  One fry left. A long, long pause… Taurus pulls it out
//              (it keeps coming: it is HUGE) and hands it over: "for you."  The date melts.
//   11.35      THE STARS' stamp slams "…a TAURUS."  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Comfort is a *love language*."
import { makeTell, R, box, bubble, label, shadow, sparkles, hearts, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, RED, INTER, MONO, T } from './tellkit.js'

// ── TELL 1: five blankets
const BLANKETS = [['#ef5c94', '#ff8fb8'], ['#4f7cd8', '#7fa4f0'], ['#3fb08a', '#6fd0aa'], ['#f2c75c', '#ffe39a'], ['#a35cf0', '#c08aff']]
function tell1(x, t, S) {
  const { u, hero } = S
  R(x, '#1f1838', 0, 1160, 1080, 100); R(x, '#2a2148', 0, 1160, 1080, 8)
  shadow(x, 540, 1166, 480)
  hero(x, t, { x: 540, y: 800, s: 280, mood: u > 1.85 ? 'happy' : 'sleepy', look: [0, 0], zzz: false, hops: [S.t0 + 1.9] })
  const at = [0.3, 0.6, 0.9, 1.2, 1.5]
  let count = 0
  BLANKETS.forEach(([c, hi], i) => {
    const a = at[i]
    if (u < a - 0.25) return
    const p = ease.inQuad(clamp(prog(u, a - 0.25, a)))
    const y = lerp(380, 1160 - (i + 1) * 66, p)
    const sq = u > a && u < a + 0.2 ? 0.1 * Math.sin(Math.PI * (u - a) / 0.2) : 0
    if (u >= a) count = i + 1
    x.save(); x.translate(540, y + 31); x.scale(1 + sq, 1 - sq)
    box(x, -250, -31, 500, 66, c, { b: 6, hi })
    for (let k = 0; k < 6; k++) R(x, 'rgba(255,255,255,0.22)', -220 + k * 80, -31, 26, 62)
    R(x, INK, -252, -10, 14, 40); R(x, INK, 238, -10, 14, 40)
    x.restore()
  })
  if (count) label(x, `×${count}`, 860, 840, { size: 64, col: GOLD, font: INTER, weight: 800, rot: 0.1 })
  bubble(x, t, 620, 650, S.t0 + 1.85, S.t1, 'perfect.', { size: 38, tail: -0.3 })
}

// ── TELL 2: the usual
function ticket(x, cx, cy, day, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -130, -60, 260, 120, '#fffbea', { b: 6 })
  for (let i = 0; i < 9; i++) R(x, INK, -130 + i * 30, 54, 14, 12)
  x.font = `700 24px ${MONO}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(day, 0, -28)
  x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.fillText('the usual', 0, 16)
  x.restore()
}
function tell2(x, t, S) {
  const { u, hero, date } = S
  ;[['MON', 0.3, 330, 640, -0.08], ['WED', 0.65, 560, 600, 0.05], ['FRI', 1.0, 790, 650, -0.03]].forEach(([d, a, cx, cy, r]) => ticket(x, cx, cy, d, pop01(t, S.t0 + a, 0.28, 2.6), r))
  shadow(x, 280, 1190, 220); shadow(x, 810, 1190, 210)
  hero(x, t, { x: 280, y: 1070, s: 230, mood: u < 1.9 ? 'happy' : 'wink', look: [1, 0], hops: [S.t0 + 0.32, S.t0 + 0.67, S.t0 + 1.02, S.t0 + 1.95] })
  date(x, t, { x: 810, y: 1080, s: 210, mood: u < 1.3 ? 'neutral' : u < 1.95 ? 'happy' : 'squint', look: [-1, -0.5], hops: [S.t0 + 1.35] })
  bubble(x, t, 760, 880, S.t0 + 1.3, S.t1, 'try something new?', { size: 32, tail: 0.3 })
  bubble(x, t, 330, 870, S.t0 + 1.95, S.t1, 'I did. extra fries.', { size: 32, tail: -0.4 })
}

// ── TELL 3: the last fry (the big one)
function fryBox(x, cx, by) {
  x.save(); x.translate(cx, by)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-96, -170); x.lineTo(96, -170); x.lineTo(76, 6); x.lineTo(-76, 6); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-88, -164); x.lineTo(88, -164); x.lineTo(70, 0); x.lineTo(-70, 0); x.closePath(); x.fill()
  for (const d of [-40, 0, 40]) R(x, 'rgba(255,255,255,0.8)', d - 6, -160, 12, 156)
  x.restore()
}
function fry(x, x0, y0, len, rot) {
  x.save(); x.translate(x0, y0); x.rotate(rot)
  R(x, INK, -18, -len, 36, len + 6); R(x, '#f7d26a', -12, -len + 6, 24, len - 6); R(x, '#ffe9a0', -12, -len + 6, 8, len - 6); R(x, '#d9a640', -12, -len + 6, 24, 10)
  x.restore()
}
function tell3(x, t, S) {
  const { u, hero, date } = S
  shadow(x, 260, 1190, 220); shadow(x, 820, 1190, 210)
  // the fry: sits in the box, gets pulled… and pulled… it's enormous; then it swings over to the date
  const pull = ease.inOutQuad(clamp(prog(u, 1.35, 2.0)))
  const give = ease.inOutCubic(clamp(prog(u, 2.05, 2.45)))
  const len = lerp(110, 400, pull)
  const fx = lerp(540, 590, give), fy = lerp(760, 900, give) - pull * 40 * (1 - give), rot = lerp(lerp(0.05, -0.2, pull), 1.5, give)
  if (give < 1) fry(x, fx, fy + (1 - pull) * 0 + 0, len, rot)
  fryBox(x, 540, 900)
  if (give >= 1) fry(x, 590, 900, len, 1.5)
  // a dramatic pause: Taurus stares at the last fry
  const pausing = u > 0.55 && u < 1.35
  hero(x, t, { x: 260, y: 1060, s: 230, mood: pausing ? 'squint' : u < 2.05 ? 'wide' : 'happy', look: pausing ? [1, -0.6] : [1, 0], hops: [S.t0 + 1.35, S.t0 + 2.05, S.t0 + 2.4] })
  if (pausing) { const ph = (t * 1.4) % 1; R(x, '#8fe3ff', 340, 920 + ph * 40, 14, 20); label(x, '…', 400, 840, { size: 60, col: BONE, font: INTER, weight: 800, alpha: clamp(prog(u, 0.6, 0.8)) }) }
  date(x, t, { x: 820, y: 1070, s: 220, mood: u < 1.6 ? 'neutral' : u < 2.45 ? 'wide' : 'heart', look: [-1, -0.5], blush: u > 2.45 ? 1 : undefined, hops: [S.t0 + 1.7, S.t0 + 2.5] })
  hearts(x, t, S.t0 + 2.5, 840, 930, { n: 6 })
  sparkles(x, t, 540, 520, S.t0 + 2.0, 10, 140, 1, [GOLD, '#ffe9a0', BONE])
  bubble(x, t, 330, 860 - 20, S.t0 + 2.1, S.t1, 'for you.', { size: 40, tail: -0.3 })
}

const EP = makeTell({
  id: 'trtelltaurus', sign: 'taurus', name: 'Taurus', date: 'capricorn', deep: '#a8650c', accent: '#f6c45e',
  hookMood: 'happy',
  tells: [
    { caption: 'five blankets. *minimum.*', draw: tell1,
      cues: [...[0.3, 0.6, 0.9, 1.2, 1.5].flatMap((a, i) => [['whoosh', +(a - 0.22).toFixed(3), 0.18, 0.02], ['tom', a, 120 - i * 6, { gain: 0.12, decay: 0.2 }], ['pop', +(a + 0.02).toFixed(3), [587.33, 659.25, 739.99, 880, 987.77][i], 0.03, 0.4]]), ['pop', 1.87, 1174.66, 0.035, 0]] },
    { caption: 'orders *the same thing.* every time.', draw: tell2,
      cues: [['pop', 0.3, 880, 0.04, -0.3], ['pop', 0.65, 880, 0.04, 0], ['pop', 1.0, 880, 0.045, 0.3], ['pop', 1.32, 1174.66, 0.03, 0.4], ['pop', 1.97, 739.99, 0.035, -0.4], ['pluck', 2.05, 1567.98, 0.03, 0.4, -0.3]] },
    { caption: 'shares *the last fry.* (the big one.)', draw: tell3,
      cues: [['pluck', 0.6, 2637, 0.012, 0.1, 0.3], ['pluck', 0.7, 2637, 0.012, 0.1, 0.3], ['pluck', 0.95, 2637, 0.012, 0.1, 0.3], ['riser', 1.35, 2.0, 0.025], ['whoosh', 2.05, 0.4, 0.03], ['pop', 2.0, 1567.98, 0.045, 0], ['glitter', 2.0, 2.3],
        ['pop', 2.12, 880, 0.03, -0.3], ['pluck', 2.5, 1174.66, 0.04, 0.5, 0.3], ['pluck', 2.62, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 400, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    hero(x, t, { x: 400, y: 880, s: 260, pop: ok, mood: t > T.stamp + 0.15 ? 'sparkle' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
    // one cosy blanket over both (callback)
    const bk = pop01(t, T.last + 0.5, 0.3, 2.2) * ok
    if (bk > 0.01) { x.save(); x.translate(545, 1000); x.scale(bk, bk); box(x, -270, -40, 540, 80, '#ef5c94', { b: 6, hi: '#ff8fb8' }); for (let k = 0; k < 7; k++) R(x, 'rgba(255,255,255,0.22)', -250 + k * 78, -40, 26, 80); x.restore() }
  },
  last: 'Comfort is a *love language*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['tom', +(T.last + 0.5).toFixed(3), 110, { gain: 0.12, decay: 0.2 }]]
void [PINK, easeOutBack]
