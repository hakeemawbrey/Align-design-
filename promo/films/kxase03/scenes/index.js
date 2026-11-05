// kxase03 · Ask the Stars: Extended, ep 3 · "When You Like Them More" (75 s vertical, star_advice post, pop · E)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../../kxase01/xkit.js.
//   0.00   frame 0: ♈ Aries mid-sprint carrying a heart bigger than itself, slamming into a doorframe (shake).
//          Slam title "I like them *WAY* more."  0.8 record scratch "full speed. | *alone.*"
//   2.2    promise "wait for their *honest* answer"
//   3.0    1 · THE QUESTION  DM "I think I like them *more* | than they like me."
//  12.5    2 · WHY IT HAPPENS  THE STARS on a seesaw: Aries (and the big heart) down, ♉ Taurus up in the air.
//          "uneven at the start is *normal.*" → "uneven for months is *information.*"  Chip ♈ CARDINAL FIRE · MARS.
//  25.0    3 · THE STORY  a speedrun HUD: Aries plans five dates in five days; the calendar fills one-sided;
//          Taurus: "so many plans! can we keep *sunday* slow?" Aries: "wait. am I doing *all* the steering?"
//  40.0    4 · WHAT HELPS  "say it out loud, *kindly.*" → the card "I really like you. | *are we on the same page?*"
//  55.0    5 · THE ANSWER  the café. Taurus: "I'm slower than you. but I'm *in.*" "next date is *my* plan."
//  69.0    the seesaw again, level. Pisces sobs.  73.5 last line "Ask. Then *believe* | the answer."
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, table, mug, heart, confetti,
  signStar, INK, BONE, GOLD, PINK, RED, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxase01/xkit.js'

const ARI = 'aries', TAU = 'taurus'
const AC = '#ffb0a0'

// a big pixel heart carried by a star
function bigHeart(x, cx, cy, cell, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); heart(x, 0, 0, cell, '#ff5c8a'); x.restore() }

// the seesaw: angle a (+ = left end down)
function seesaw(x, t, a, { heartMid = 0 } = {}) {
  const P = { x: 540, y: 1150 }, L = 400
  // the pivot
  x.fillStyle = INK; x.beginPath(); x.moveTo(P.x - 70, 1210); x.lineTo(P.x + 70, 1210); x.lineTo(P.x, P.y); x.closePath(); x.fill()
  x.fillStyle = '#8c86a8'; x.beginPath(); x.moveTo(P.x - 54, 1204); x.lineTo(P.x + 54, 1204); x.lineTo(P.x, P.y + 14); x.closePath(); x.fill()
  x.save(); x.translate(P.x, P.y); x.rotate(-a)
  box(x, -L, -14, 2 * L, 28, '#c98a4a', { b: 6, hi: 'rgba(255,255,255,0.25)' })
  x.restore()
  const l = { x: P.x - L * 0.85 * Math.cos(a), y: P.y + L * 0.85 * Math.sin(a) }, r = { x: P.x + L * 0.85 * Math.cos(a), y: P.y - L * 0.85 * Math.sin(a) }
  const swing = Math.sin(t * 2) * 4
  star(x, t, ARI, { x: l.x, y: l.y - 110 + swing, s: 220, mood: a > 0.1 ? 'wide' : 'heart', look: [1, -1] })
  bigHeart(x, lerp(l.x + 40, P.x, heartMid), lerp(l.y - 60, P.y - 150, heartMid) + swing, lerp(14, 12, heartMid), -a)
  star(x, t, TAU, { x: r.x, y: r.y - 110 - swing, s: 220, mood: a > 0.1 ? 'neutral' : 'happy', look: [-1, -1] })
}

// the calendar wall (shot D): five days, filled by the HUD splits
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
const PLANS = ['movie night', 'ice skating', 'cocoa walk', 'museum', 'dinner']
const SPLIT0 = 26.4
function calendar(x, t) {
  x.save(); x.translate(540, 800); x.scale(0.9, 0.9); x.translate(-540, -590)
  box(x, 90, 380, 900, 420, '#f5eedf', { b: 8 })
  R(x, RED, 90, 380, 900, 60)
  label(x, 'THIS WEEK', 540, 412, { size: 32, col: BONE })
  DAYS.forEach((d, i) => {
    const cx = 90 + 90 + i * 180
    R(x, 'rgba(27,18,54,0.25)', cx + 88, 440, 4, 360)
    label(x, d, cx, 480, { size: 26, col: INK })
    const k = pop01(t, SPLIT0 + i, 0.3, 2.6)
    if (k > 0.01) {
      x.save(); x.translate(cx, 640); x.rotate(-0.12 + 0.05 * i); x.scale(k, k)
      R(x, INK, -78, -70, 156, 140); R(x, AC, -72, -64, 144, 128)
      x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      PLANS[i].split(' ').forEach((w, j, a) => x.fillText(w, 0, (j - (a.length - 1) / 2) * 28 - 14))
      x.font = `700 16px ${MONO}`; x.fillText('♈︎ PLANNED', 0, 42)
      x.restore()
    }
  })
  x.restore()
}

const F = makeX({
  id: 'kxase03', series: 'ask', dur: 75, ending: 'cut',
  hook: { text: 'I like them *WAY* more.', out: 2.9, top: 200, size: 118, color: AC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'wait for their *honest* answer', top: 1300 },
  chapters: [{ at: 3.0, title: 'the question' }, { at: 12.5, title: 'why it happens' }, { at: 25.0, title: 'the story' }, { at: 40.0, title: 'what helps' }, { at: 55.0, title: 'the answer' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'shake', at: 0.12, len: 0.5, amp: 30 },
    { k: 'scratch', at: 0.8, len: 1.3, caption: 'full speed. | *alone.*', top: 1480 },
    { k: 'hud', at: 25.3, out: [32.6, 32.9], title: 'ARIES · PLANNING DATES · ANY%', start: 25.4, color: '#ff9f6b',
      splits: PLANS.map((n, i) => ({ at: SPLIT0 + i, name: n })) },
    { k: 'ach', at: 31.2, out: [33.4, 33.7], text: 'planned a *whole* week. solo.', title: 'ACHIEVEMENT UNLOCKED' },
    { k: 'shake', at: 69.0, len: 0.3, amp: 10 },
  ],
  dm: { at: 3.2, out: [12.2, 12.5], text: 'I think I like them *more* | than they like me.', top: 300 },
  chip: { at: 21.6, out: [24.3, 24.6], text: '♈ CARDINAL FIRE · RULED BY MARS', color: AC, top: 1290 },
  lines: [
    say(5.6, ARI, 'I plan everything. they just… show up.'),
    say(9.0, ARI, 'is that *bad?*'),
    stars(13.0, 'uneven at the start is *normal.*'),
    stars(17.0, 'uneven for months is *information.*'),
    say(33.3, TAU, 'so many plans! can we keep *sunday* slow?'),
    say(36.6, ARI, 'wait. am I doing *all* the steering?'),
    stars(40.6, 'say it out loud, *kindly.*'),
    stars(43.8, 'then let them answer in their own words.'),
    say(59.6, TAU, "I'm slower than you. but I'm *in.*"),
    say(63.0, ARI, 'slow and in? I can *do* slow.'),
    say(66.2, TAU, 'next date is *my* plan.'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 24.6 }, { from: 4, to: 6, close: 39.7 }, { from: 6, to: 8, close: 47.7 }, { from: 8, to: 11, close: 68.8 }],
  cards: [{ at: 48.0, out: [53.4, 53.75], text: 'I really like you. | *are we on the same page?*', label: 'SAY IT KINDLY', top: 430 }],
  last: { at: 73.5, text: 'Ask. Then *believe* | the answer.', top: 300, color: AC },
  shots: [
    // A · the doorframe crash (0–3)
    { at: 0, set: 'street', cam: [1.15, 560, 900], push: 0.02,
      draw(x, t) {
        const hit = t < 0.12 ? 0 : 1
        const ax = hit ? 560 - 30 * Math.exp(-(t - 0.12) * 4) : lerp(480, 600, prog(t, -0.6, 0.12))
        x.save(); x.translate(ax, 980); x.rotate(hit ? -0.18 : 0.12)
        star(x, t, ARI, { x: 0, y: 0, s: 280, mood: hit ? 'squint' : 'wide', look: [1, 0], squash: hit ? 0.14 * Math.exp(-(t - 0.12) * 5) : -0.06 })
        x.restore()
        bigHeart(x, ax + 110, 900, 22, 0.2)
        if (hit) for (let i = 0; i < 5; i++) { const a = -1.2 + i * 0.6; R(x, GOLD, 680 + Math.cos(a) * 120, 860 + Math.sin(a) * 120, 22, 8) }
        // speed lines
        if (t < 2.4) { x.save(); x.globalAlpha = 0.6; for (let i = 0; i < 6; i++) R(x, BONE, 120 + (i % 3) * 30, 860 + i * 40, 160 - (i % 3) * 30, 6); x.restore() }
      },
      pis: { x: 330, y: 1230, s: 120, tears: 1, mood: 'wide', look: [1, -1] } },
    // B · the question
    { at: 3.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, ARI, { x: 500, y: 1040, s: 320, mood: t < 9 ? 'happy' : 'wide', look: [0, -1], hops: S.hopsFor(ARI) })
        bigHeart(x, 700, 1000, 12, 0.2)
      },
      pis: t => ({ x: 920, y: 1250, s: 140, tears: t < 9 ? 1 : 2, mood: 'sparkle', look: [-1, -0.6] }) },
    // C · THE STARS (12.5–15.8) then the seesaw (15.8–25)
    { at: 12.5, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, ARI, { x: 190, y: 1210, s: 150, mood: 'neutral', look: [1, -1] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    { at: 15.8, set: 'sky', push: 0.04,
      draw(x, t) { seesaw(x, t, 0.32 + 0.03 * Math.sin(t * 2)) },
      pis: { x: 900, y: 1330, s: 120, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // D · the week (25–40)
    { at: 25.0, set: 'room', setOpts: { couch: false }, cam: [1.0, 540, 960], push: 0.03,
      draw(x, t, S) {
        calendar(x, t)
        const busy = t < 31.5
        star(x, t, ARI, { x: 300, y: 1100, s: 230, mood: busy ? 'happy' : t > 37 ? 'wide' : 'happy', look: busy ? [0, -1] : [1, 0], hops: busy ? [26.3, 27.3, 28.3, 29.3, 30.3] : S.hopsFor(ARI) })
        star(x, t, TAU, { x: 760, y: 1100, s: 230, mood: t < 33.4 ? 'sleepy' : 'happy', look: [-1, 0], hops: S.hopsFor(TAU) })
      },
      pis: t => ({ x: 540, y: 1250, s: 110, tears: t < 37 ? 1 : 2, mood: 'sparkle', look: [0, -1] }) },
    // E · what helps
    { at: 40.0, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1010, s: 370, mood: t > 48 ? 'heart' : 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, ARI, { x: 180, y: 1210, s: 160, mood: t > 50 ? 'happy' : 'neutral', look: [1, -1], hops: [50.2, 50.9] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 2, mood: 'sparkle', look: [-1, -1] } },
    // F · the café (55–69)
    { at: 55.0, set: 'cafe', cam: [1.1, 540, 920], push: 0.04,
      draw(x, t, S) {
        table(x, 540, 1060, 440, '#8a5a3a')
        mug(x, t, 470, 1035, 0.7); mug(x, t, 610, 1035, 0.7, '#5a9a6a')
        star(x, t, ARI, { x: 290, y: 980, s: 240, mood: t < 59.5 ? 'neutral' : 'heart', look: [1, 0], hops: S.hopsFor(ARI) })
        star(x, t, TAU, { x: 790, y: 980, s: 240, mood: t < 59.4 ? 'neutral' : 'happy', look: [-1, 0], hops: S.hopsFor(TAU) })
        if (inR(t, 55.6, 58.0)) {
          const k = pop01(t, 55.6, 0.3, 2.4) * outK(t, [57.7, 58.0])
          x.save(); x.translate(420, 720); x.scale(k, k); R(x, INK, -250, -50, 500, 100); R(x, BONE, -244, -44, 488, 88)
          x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('are we on the same page?', 0, 2); x.restore()
        }
        if (inR(t, 58.0, 59.6)) for (let i = 0; i < 3; i++) { const on = Math.floor(t * 5 + i) % 3 === 0; R(x, INK, 760 + i * 34, 780, 24, 24); R(x, on ? GOLD : '#9a90b8', 764 + i * 34, 784, 16, 16) }
        if (t > 59.6) hearts(x, t, 59.6, 290, 840, { n: 5, cell: 6 })
      },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: t < 59.6 ? 1 : 3, mood: t < 59.6 ? 'wide' : 'happy', look: [-1, -1], hops: t > 59.6 ? [59.8, 60.4, 61.0] : null }) },
    // G · the seesaw, level (69–75)
    { at: 69.0, set: 'sky', push: 0.03, noFlash: true,
      draw(x, t) { seesaw(x, t, 0.32 * (1 - ease.outBack(prog(t, 69.0, 70.2))), { heartMid: ease.inOutCubic(prog(t, 69.3, 70.6)) }); sparkles(x, t, 540, 1000, 70.4, 12, 200, 1) },
      pis: t => ({ x: 900, y: 1330, s: 130, tears: 3, mood: 'happy', look: [-1, -1], hops: [70.5, 71.1, 71.7] }) },
  ],
  cues: [
    ['pop', 0.12, 164.81, 0.07, 0], ['tick', 0.14, 0.06],
    ['pop', 55.6, 1318.51, 0.035, 0], ['tick', 58.1, 0.02], ['tick', 58.5, 0.02], ['tick', 58.9, 0.02],
    ['glitter', 59.6, 60.3], ['pluck', 59.9, 659.25, 0.035, 0.5, 0.3], ['pluck', 60.1, 587.33, 0.035, 0.5, 0.3],
    ['whoosh', 69.2, 1.0, 0.04], ['bell', 70.3, 1318.51, 0.03, 1.0, 0], ['glitter', 70.4, 71.0],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
