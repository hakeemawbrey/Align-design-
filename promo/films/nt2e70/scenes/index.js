// nt2e70: PLOT TWIST, "Plot Twist: “we need to talk”" (18 s vertical, Star Talk Trends Vol. 2 ep 70,
// promo/films/next30/b14.md; music: cinematic · Gm). Story 0–15.6, then the shared short end card. Format: ../../nt2e66/scenes/twist.js.
//   0.0–2.1    hook (frame 0, cold blue): "*We need to talk.*"  Libra frozen mid-sip, the text on the phone.
//   2.1–4.85   BEAT 1 "you rehearse *every* bad ending."  Libra at the mirror; the reflection mouths "it's not you…"
//              and "I need space…"
//   4.85–7.6   BEAT 2 "the walk to the bench. *Slow motion.*"  Leaves drift; Libra creeps towards Scorpio on a park bench.
//   7.6        PLOT TWIST slam.
//   8.75–11.35 BEAT 3 (warm) "it was a *talk card.*"  Scorpio holds up a talk card: "What made you smile this week?"
//              "I'll go first: you." Libra melts.
//   11.95      THE STARS: "Big talk, *soft* landing."  Pisces, sobbing happily: "aww."
import { makeTwist, drawStage, chatPhone, thought, mug, sfx, R, box, bubble, label, shadow, sparkles, hearts, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, SERIF, MONO, T } from '../../nt2e66/scenes/twist.js'

const FLOOR = 1180

function park(x, t, warm) {
  R(x, warm ? '#3a2a4a' : '#141a3a', 0, 0, 1080, FLOOR)
  for (let i = 0; i < 26; i++) R(x, `rgba(255,247,220,${0.25 + 0.4 * Math.abs(Math.sin(t * 1.5 + i))})`, (i * 157) % 1080, 160 + (i * 233) % 600, 5, 5)
  // trees
  for (const [tx, s] of [[90, 1], [990, 0.9]]) { R(x, INK, tx - 22, FLOOR - 380 * s, 44, 380 * s); R(x, '#4a3428', tx - 14, FLOOR - 380 * s, 28, 380 * s); x.fillStyle = INK; x.beginPath(); x.arc(tx, FLOOR - 430 * s, 170 * s + 8, 0, Math.PI * 2); x.fill(); x.fillStyle = warm ? '#c8703a' : '#2f4a3a'; x.beginPath(); x.arc(tx, FLOOR - 430 * s, 170 * s, 0, Math.PI * 2); x.fill() }
  // a lamp
  R(x, INK, 760, FLOOR - 520, 16, 520); box(x, 724, FLOOR - 560, 88, 50, '#ffe7a8', { b: 6 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(768, FLOOR - 520, 10, 768, FLOOR - 400, 420); g.addColorStop(0, `rgba(255,230,160,${warm ? 0.35 : 0.18})`); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(300, FLOOR - 900, 900, 900); x.restore()
  R(x, INK, 0, FLOOR, 1080, 8); R(x, '#2a3a2e', 0, FLOOR + 8, 1080, 740)
  bench(x, 600, FLOOR + 20)
}
function bench(x, cx, floorY) {
  box(x, cx - 240, floorY - 200, 480, 30, '#8a5a3a', { b: 6 }); box(x, cx - 240, floorY - 140, 480, 30, '#8a5a3a', { b: 6 })
  box(x, cx - 250, floorY - 90, 500, 34, '#a06a44', { b: 6 })
  R(x, INK, cx - 220, floorY - 56, 18, 56); R(x, INK, cx + 202, floorY - 56, 18, 56)
}
function leaves(x, t, slow) {
  for (let i = 0; i < 10; i++) { const ph = (t * 0.12 * slow + i / 10) % 1; x.save(); x.translate((i * 113) % 1080 + 40 * Math.sin(t * slow + i), ph * 1300 + 100); x.rotate(t * slow + i); box(x, -12, -7, 24, 14, i % 2 ? '#c8703a' : '#e0a040', { b: 3 }); x.restore() }
}
function mirror(x, cx, cy) { box(x, cx - 150, cy - 230, 300, 460, '#9fc8e0', { b: 12, hi: 'rgba(255,255,255,0.4)' }); R(x, 'rgba(255,255,255,0.25)', cx - 110, cy - 200, 30, 400) }

function talkCard(x, t, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05 + 0.02 * Math.sin(t * 2)); x.scale(k, k)
  box(x, -230, -150, 460, 300, '#1e1540', { b: 8 })
  x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-212, -132, 424, 264)
  x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -100)
  x.font = `italic 500 46px ${SERIF}`; x.fillStyle = BONE
  lines.forEach((l, i) => x.fillText(l, 0, -30 + i * 54))
  x.restore()
}

function beat1(x, t, S) {
  const { u, hero } = S
  drawStage(x, t, { warm: 0, wall: '#2a2a48', floor: '#383656', window: false })
  mirror(x, 720, 800)
  x.save(); x.beginPath(); x.rect(570, 570, 300, 460); x.clip(); x.globalAlpha = 0.75
  hero(x, t, { x: 720, y: 860, s: 200, mood: 'squint', look: [-1, 0], hops: [S.t0 + 0.6, S.t0 + 1.4] }); x.restore()
  hero(x, t, { x: 330, y: 1010, s: 230, mood: 'wide', look: [1, -0.3], hops: [S.t0 + 0.5] })
  thought(x, t, 720, 500, 'it’s not you…', S.t0 + 0.5, S.t0 + 1.4, { size: 36 })
  thought(x, t, 720, 500, 'I need space…', S.t0 + 1.4, S.t1, { size: 36 })
}

function beat2(x, t, S) {
  const { u, hero, date } = S
  park(x, t, 0)
  leaves(x, t, 0.35)
  date(x, t, { x: 700, y: 960, s: 200, mood: 'neutral', look: [-1, 0], bob: 3 })
  const px = lerp(80, 330, u / 2.75)
  hero(x, t, { x: px, y: 1030, s: 220, mood: 'wide', look: [1, 0], bob: 2, hops: [S.t0 + 0.4, S.t0 + 1.4, S.t0 + 2.4] })
  label(x, 's l o w l y', 300, 780, { size: 40, font: INTER, weight: 800, col: 'rgba(239,230,214,0.8)' })
}

function beat3(x, t, S) {
  const { u, hero, date } = S
  park(x, t, 1)
  leaves(x, t, 1)
  const ck = pop01(t, S.t0 + 1.2, 0.35, 2.2)
  date(x, t, { x: 700, y: 960, s: 200, mood: 'happy', look: [-1, -0.3], hops: [S.t0 + 1.2, S.t0 + 2.1] })
  hero(x, t, { x: 400, y: 990, s: 210, mood: u > 2.3 ? 'heart' : 'wide', look: [1, -0.5], hops: [S.t0 + 2.35] })
  talkCard(x, t, 540, 600, ck * 1.2, ['What made you', 'smile this week?'])
  bubble(x, t, 760, 820, S.t0 + 1.9, S.t1, 'I’ll go first: you.', { size: 32, tail: -0.1 })
  if (u > 2.35) hearts(x, t, S.t0 + 2.4, 400, 880, { n: 5 })
}

const EP = makeTwist({
  id: 'nt2e70', sign: 'libra', name: 'Libra', date: 'scorpio', deep: '#b0487a', accent: '#7fd0ff',
  hookText: '*We need to talk.*', hookSize: 84, hookAccent: 124,
  room: park,
  slamScene: (x, t) => park(x, t, 0),
  hook(x, t, S) {
    drawStage(x, t, { warm: 0, wall: '#2a2a48', floor: '#383656' })
    S.hero(x, t, { x: 330, y: 980, s: 260, mood: 'wide', look: [1, -0.3], bob: 0, blink: false })
    mug(x, 430, 960, { col: '#c9a6ff', s: 1.1 })
    chatPhone(x, t, 760, 880, [{ text: 'we need\nto talk.', size: 40 }], { s: 1.2, rot: 0.04, name: 'SCORPIO' })
  },
  hookCues: [['pop', 0.4, 523.25, 0.03, 0.3]],
  tells: [
    { caption: 'you rehearse *every* bad ending.', draw: beat1, pis: { x: 120, y: 1660, look: [1, -0.6] },
      cues: [['pop', 0.5, 622.25, 0.035, 0.3], ['pop', 1.4, 587.33, 0.035, 0.3]] },
    { caption: 'the walk to the bench. *Slow motion.*', draw: beat2, pis: { x: 960, y: 1660 },
      cues: [['tom', 0.4, 60, { gain: 0.2, decay: 0.5 }], ['tom', 1.4, 60, { gain: 0.2, decay: 0.5 }], ['tom', 2.4, 60, { gain: 0.22, decay: 0.5 }]] },
    { caption: 'it was a *talk card.*', draw: beat3, pis: { x: 960, y: 1660 },
      cues: [['pop', 1.2, 1174.66, 0.045, 0], ['glitter', 1.25, 1.8], ['pop', 1.9, 880, 0.03, 0.3], ['pluck', 2.35, 1567.98, 0.035, 0, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 420, 1070, 220 * ok); shadow(x, 680, 1080, 200 * ok)
    hero(x, t, { x: 420, y: 880, s: 250, pop: ok, mood: 'heart', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 890, s: 230, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Big talk, *soft* landing.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, clamp, ease, sparkles, sfx, RED]
