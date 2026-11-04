// nt2e66: PLOT TWIST, "Plot Twist: the late date" (20 s vertical, Star Talk Trends Vol. 2 ep 66, promo/films/next30/b14.md;
// music: cinematic · Cm). Story 0–15.6, then the shared end card. Format: ./twist.js on ../../nt2e61/scenes/t2kit.js.
//   0.0–2.1    hook (frame 0, cold blue): "They’re *20 minutes* late."  Virgo at a café table, tapping, the clock at 7:20.
//   2.1–4.85   BEAT 1 "draft a calm text. *delete it.*"  "no worries! take your time :)" is typed… and deleted.
//   4.8        card cut.
//   4.85–7.6   BEAT 2 "did I say the *wrong* café?"  A map; three pins drop; Virgo's thought cloud: "the OTHER corner??"
//   7.6        PLOT TWIST slam.
//   8.75–11.35 BEAT 3 (warm) "they were outside, *rehearsing* hello."  Through the window: Gemini pacing, practising
//              "hi." "hey." "HELLO." Virgo sees, melts.
//   11.95      THE STARS: "Nervous is a *compliment*."  Pisces, sobbing happily: "aww."
import { makeTwist, drawStage, chatPhone, clockFace, thought, table, mug, sfx, R, box, bubble, label, shadow, sparkles, hearts, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, MONO, T } from './twist.js'

const FLOOR = 1180

function cafe(x, t, warm, { m = 20 } = {}) {
  drawStage(x, t, { warm, wall: '#3a2a3a', floor: '#4a3428' })
  // a café sign, a shelf of cups
  box(x, 90, 430, 420, 90, '#2a1d2a', { b: 6 }); x.font = `800 44px ${INTER}`; x.fillStyle = warm ? GOLD : '#9aa6d8'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CAFÉ', 300, 476)
  clockFace(x, 300, 650, 80, m)
  table(x, 400, FLOOR, { w: 380, h: 210 })
  mug(x, 300, 930, { col: '#c9a6ff', s: 0.8 })
}

function beat1(x, t, S) {
  const { u, hero } = S
  cafe(x, t, 0, { m: 21 + u * 0.4 })
  hero(x, t, { x: 520, y: 900, s: 220, mood: u > 1.8 ? 'squint' : 'neutral', look: [1, 0.4], hops: [S.t0 + 0.4, S.t0 + 0.8] })
  // the draft: types in, then is deleted letter by letter
  const full = 'no worries! take\nyour time :)'
  const typed = Math.floor(clamp(prog(u, 0.2, 1.2)) * full.length), del = Math.floor(clamp(prog(u, 1.7, 2.3)) * full.length)
  const shown = full.slice(0, Math.max(0, typed - del))
  chatPhone(x, t, 820, 860, shown ? [{ me: true, text: shown, size: 30 }] : [], { s: 1, rot: 0.05, name: 'DRAFT' })
  if (u > 1.7) sfx(x, t, 'delete.', 820, 560, S.t0 + 1.7, { size: 40, col: RED, life: 0.8 })
}

function pinMap(x, t, S) {
  box(x, 160, 420, 760, 520, '#cfe3c4', { b: 8 })
  for (let i = 0; i < 6; i++) R(x, '#efe6d6', 160, 460 + i * 86, 760, 18)
  for (let i = 0; i < 5; i++) R(x, '#efe6d6', 200 + i * 160, 420, 18, 520)
  R(x, '#7fbfe0', 160, 840, 760, 40)
  ;[[330, 600, 0.3], [620, 520, 0.6], [760, 760, 0.9]].forEach(([px, py, at], i) => {
    const k = pop01(t, S.t0 + at, 0.25, 3)
    if (k <= 0.01) return
    x.save(); x.translate(px, py - (1 - k) * 80)
    R(x, INK, -24, -70, 48, 48); R(x, RED, -18, -64, 36, 36); R(x, INK, -4, -22, 8, 30)
    x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(['HERE?', 'HERE??', 'HERE???'][i], 0, -90)
    x.restore()
  })
}
function beat2(x, t, S) {
  const { u, hero } = S
  cafe(x, t, 0, { m: 24 })
  pinMap(x, t, S)
  hero(x, t, { x: 300, y: 1050, s: 220, mood: 'wide', look: [1, -0.8], squash: 0.03 * Math.sin(t * 25), hops: [S.t0 + 0.3, S.t0 + 0.6, S.t0 + 0.9] })
  thought(x, t, 690, 1040, 'the OTHER corner??', S.t0 + 1.2, S.t1, { size: 34 })
}

function beat3(x, t, S) {
  const { u, hero, date } = S
  cafe(x, t, 1, { m: 25 })
  // outside the window: Gemini pacing, rehearsing
  x.save(); x.beginPath(); x.rect(640, 430, 300, 340); x.clip()
  R(x, '#ffcf8a', 640, 430, 300, 340)
  const px = 790 + 70 * Math.sin(t * 2.4)
  date(x, t, { x: px, y: 640, s: 170, mood: 'neutral', look: [Math.cos(t * 2.4) > 0 ? 1 : -1, 0], hops: [S.t0 + 1.25, S.t0 + 1.75, S.t0 + 2.25] })
  x.restore()
  R(x, INK, 785, 430, 10, 340); R(x, INK, 640, 595, 300, 10)
  const words = [['hi.', 1.25, 46], ['hey.', 1.75, 56], ['HELLO.', 2.25, 76]]
  words.forEach(([w, at, sz], i) => { const k = pop01(t, S.t0 + at, 0.2, 3); if (k > 0.01) label(x, w, [640, 760, 800][i], [370, 310, 240][i], { size: sz * k, font: INTER, weight: 800, col: BONE, rot: [-0.1, 0.06, -0.04][i] }) })
  hero(x, t, { x: 470, y: 900, s: 220, mood: u > 2.3 ? 'heart' : 'wide', look: [1, -0.4], hops: [S.t0 + 2.35] })
  if (u > 2.35) hearts(x, t, S.t0 + 2.4, 470, 800, { n: 5 })
}

const EP = makeTwist({
  id: 'nt2e66', sign: 'virgo', name: 'Virgo', date: 'gemini', deep: '#b0487a', accent: '#7fd0ff',
  hookText: 'They’re *20 minutes* late.',
  room: (x, t, warm) => cafe(x, t, warm, { m: 25 }),
  hook(x, t, S) {
    cafe(x, t, 0, { m: 20 + t * 0.4 })
    S.hero(x, t, { x: 560, y: 900, s: 260, mood: 'squint', look: [-1, -0.6], hops: [0.2, 0.55, 0.9, 1.25, 1.6] })
    for (let i = 0; i < 4; i++) { const at = 0.2 + i * 0.35; sfx(x, t, 'tap', 690 + (i % 2) * 40, 820 - i * 18, at, { size: 30, col: BONE, life: 0.25 }) }
  },
  hookCues: [0, 1, 2, 3].map(i => ['tick', 0.2 + i * 0.35, 0.05]),
  tells: [
    { caption: 'draft a calm text. *delete it.*', draw: beat1, pis: { x: 120, y: 1660, look: [1, -0.6] },
      cues: Array.from({ length: 8 }, (_, i) => ['tick', 0.2 + i * 0.12, 0.025]).concat([['whoosh', 1.7, 0.5, 0.02], ['pop', 2.3, 392, 0.03, 0.3]]) },
    { caption: 'did I say the *wrong* café?', draw: beat2, pis: { x: 960, y: 1660 },
      cues: [['pop', 0.3, 659.25, 0.04, -0.3], ['pop', 0.6, 622.25, 0.04, 0], ['pop', 0.9, 587.33, 0.04, 0.3], ['riser', 1.0, 1.5, 0.015]] },
    { caption: 'they were outside, *rehearsing* hello.', draw: beat3, pis: { x: 960, y: 1660 },
      cues: [['pop', 1.25, 880, 0.03, 0.3], ['pop', 1.75, 987.77, 0.035, 0.3], ['pop', 2.25, 1318.51, 0.045, 0.3], ['pluck', 2.4, 1567.98, 0.035, 0, 0.3], ['glitter', 2.4, 2.9]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 420, 1070, 220 * ok); shadow(x, 680, 1080, 200 * ok)
    hero(x, t, { x: 420, y: 880, s: 250, pop: ok, mood: 'heart', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 890, s: 230, pop: ok, mood: t > T.last ? 'happy' : 'wide', look: [-1, 0], blush: 1, hops: [T.stamp + 0.1, T.last + 1.7] })
    bubble(x, t, 690, 660, T.stamp + 0.3, T.out[0], 'hi.', { size: 40, tail: 0 })
  },
  last: 'Nervous is a *compliment*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, lerp, sparkles, MONO, GOLD]
