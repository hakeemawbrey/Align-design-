// ngfe24: 24 DAYS OF GREEN FLAGS, door 24 (finale): "Chooses you on ordinary days too." (18 s vertical, cinematic · D)
//   hook "Door *24.* | The last one." · every other door is already open. Behind 24: an ordinary morning, a wall page
//   that says "a Tuesday in January". Pisces and Taurus share the last toast: "want the last piece?" "let's split it."
//   Pisces cries happy: "I just really like Tuesdays with you." The flag plants; all twelve signs pop in for the photo;
//   the strip is full. Last: "Every day. Not just *December.*"
import { makeDoor, room, windowFrame, table, mug, bubble, hearts, shadow, box, drawStarChar, signStar, sparkles, confetti, R, INK, BONE, GOLD, GREEN, INTER, MONO, prog, ease, lerp, pop01 } from '../../ngfe01/scenes/advent.js'
const ALL = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
function toast(x, cx, cy, s = 1) { box(x, cx - 40 * s, cy - 36 * s, 80 * s, 70 * s, '#e8b060', { b: 5 }); R(x, '#f6d090', cx - 30 * s, cy - 26 * s, 60 * s, 50 * s) }
function scene(x, t, S) {
  const { u, hero, mate, pisces } = S
  room(x, { wall: '#3a3a64', wall2: '#424270', floor: '#4a4064' })
  windowFrame(x, t, 560, 280, 360, 300, { snow: true })
  // the wall page: a Tuesday in January
  box(x, 110, 290, 300, 300, BONE, { b: 8 })
  R(x, '#d8344e', 110, 290, 300, 80)
  x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 48px ${INTER}`; x.fillStyle = BONE; x.fillText('JAN', 260, 332)
  x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.fillText('a Tuesday', 260, 430); x.fillText('in January', 260, 476)
  x.font = `700 22px ${MONO}`; x.fillStyle = '#8a8098'; x.fillText('(nothing planned)', 260, 540)
  x.restore()
  shadow(x, 280, 1160, 230); shadow(x, 800, 1160, 230)
  const cry = u > 3.0
  pisces(x, t, { x: 280, y: 960, s: 250, hops: [S.t0 + 2.2, S.t0 + 3.05], opts: { glow: 1 } }, cry ? 3 : 0, cry ? 'happy' : 'sparkle', [1, -0.2])
  mate(x, t, { x: 800, y: 960, s: 250, mood: u < 4.0 ? 'happy' : 'heart', look: [-1, -0.2], hops: [S.t0 + 0.9, S.t0 + 4.05] })
  table(x, 540, 1070, 820, { cloth: '#e8e0f0' })
  mug(x, t, 260, 1056, 1.1, '#5fb0d8'); mug(x, t, 840, 1056, 1.1, '#e86a8a')
  // the last toast: split in two
  const sp = ease.outBack(prog(u, 2.3, 2.6))
  box(x, 440, 1050, 200, 14, BONE, { b: 4 })
  toast(x, 540 - 46 * sp, 1020, 1 - 0.3 * Math.min(1, sp)); if (sp > 0) toast(x, 540 + 46 * sp, 1020, 0.7)
  if (u > 4.0) hearts(x, t, S.t0 + 4.1, 800, 790)
  bubble(x, t, 760, 680, S.t0 + 0.9, S.t0 + 2.2, 'want the last\npiece?', { size: 44, tail: 0.1, col: '#ffe0c2' })
  bubble(x, t, 320, 680, S.t0 + 2.2, S.t0 + 3.2, "let's split it.", { size: 46, tail: -0.1 })
  bubble(x, t, 400, 650, S.t0 + 3.25, S.t1 - 0.2, 'I just really like\nTuesdays with you.', { size: 42, tail: -0.3 })
  void hero; void GOLD; void lerp
}
const EP = makeDoor({
  day: 24, hero: 'pisces', mate: 'taurus', hook: 'Door *24.* | The last one.', allOpen: true,
  flag: 'chooses you on *ordinary days,* too.', scene, pis: false, calPisces: false, payPisces: false, payPair: false,
  payoff(x, t, S) {
    // the whole zodiac pops in for the photo: two rows round the flag, Pisces front and centre, crying
    const back = ALL.filter(s => s !== 'pisces' && s !== 'taurus')
    back.forEach((sg, i) => {
      const k = pop01(t, 8.9 + i * 0.06, 0.32, 2.2) * S.ok
      const c = signStar(sg), bx = 100 + i * 98, by = 1000 + (i % 2) * 24
      drawStarChar(x, bx, by, 120, t, { color: c.color, mood: t > 9.4 ? 'happy' : 'sparkle', look: [0, -0.3], seed: 40 + i, glow: 0.8, pop: k, hops: [9.36 + (i % 3) * 0.05, 10.45 + i * 0.03] })
    })
    const pk = pop01(t, 9.0, 0.36, 2.2) * S.ok
    shadow(x, 330, 1215, 220 * pk); shadow(x, 760, 1215, 220 * pk)
    S.pisces(x, t, { x: 330, y: 1080, s: 220, pop: pk, hops: S.PAY_HOPS }, 3, 'happy', [1, -0.3])
    S.mate(x, t, { x: 760, y: 1080, s: 220, pop: pop01(t, 9.08, 0.36, 2.2) * S.ok, mood: 'heart', look: [-1, -0.3], hops: S.PAY_HOPS.map(h => h + 0.08) })
    confetti(x, t, 10.45, 540, 600, { n: 40, cols: [GREEN, GOLD, '#ff8fb1', BONE, '#7fd0ff'] })
    sparkles(x, t, 540, 1000, 10.45, 14, 380, 1, [GREEN, GOLD, BONE])
  },
  cues: [['pop', 0.9, 880, 0.035, 0.3], ['pop', 2.2, 1174.66, 0.04, -0.3], ['pop', 2.35, 1567.98, 0.035, 0], ['pop', 3.25, 987.77, 0.04, -0.3], ['pluck', 3.05, 1318.51, 0.035, 0.6, -0.3], ['pluck', 4.1, 1567.98, 0.035, 0.6, 0.3],
    ...Array.from({ length: 10 }, (_, i) => ['pop', +(6.55 + i * 0.06).toFixed(2), [880, 987.77, 1174.66, 1318.51, 1567.98][i % 5], 0.02, (i % 2 ? 0.3 : -0.3)]), ['glitter', 8.1, 8.8]],
  last: 'Every day. Not just *December.*',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
