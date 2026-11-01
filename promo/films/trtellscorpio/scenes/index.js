// trtellscorpio: TELL ME WITHOUT TELLING ME, "Tell me you're a Scorpio without telling me." (20 s vertical, Star Talk Trends
// §1, music: pop · Eb). Story 0–15.6, then the shared end card. The format look lives in ./tellkit.js (identical in all five).
//   0.0–2.1    hook: "Tell me you’re a *Scorpio* | without telling me." ♏ Scorpio pops in in sunglasses, slides them down, winks.
//   2.1–4.85   TELL 1 "sunglasses. *indoors.*"  A living room, one lamp. Scorpio in shades: "this lamp is a lot."
//   4.85–7.6   TELL 2 "remembers *week one.*"  The date: "fave snack? you won’t—"  Scorpio: "pickles. week one. tuesday."
//              A WEEK 1 file pops up with a pixel pickle. The date: heart eyes.
//   7.6        card cut.
//   7.6–10.95  TELL 3 (the twist) "the intense stare? just *listening.*"  Dramatic red speed lines, an INTENSITY meter…
//              the date gulps "…so I tripped on stage." The meter flips to JUST LISTENING; Scorpio: "and THEN??"
//   11.35      THE STARS' stamp slams "…a SCORPIO."  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "*Deep* end only."
import { makeTell, R, box, bubble, label, shadow, sparkles, hearts, starFrame, inSprite, shadesCells, pop01, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, MONO, T } from './tellkit.js'

const SC = '#e23d66'
// sunglasses on the hero sprite (same frame options as hero())
function shades(x, t, o, up = 0) { inSprite(x, starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: 3, squash: o.squash || 0 }), () => shadesCells(x, up)) }

// ── TELL 1: sunglasses, indoors
function room(x, t, lampA) {
  // floor + rug + wall line
  R(x, '#1f1838', 0, 1150, 1080, 120); R(x, '#2a2148', 0, 1150, 1080, 8)
  x.save(); x.fillStyle = '#5a2a4a'; x.beginPath(); x.ellipse(540, 1190, 360, 40, 0, 0, Math.PI * 2); x.fill(); x.restore()
  // a window with the night outside
  box(x, 90, 560, 220, 260, '#141032', { b: 8 }); R(x, INK, 196, 560, 8, 260); R(x, INK, 90, 686, 220, 8)
  for (const [a, b] of [[130, 600], [250, 630], [160, 750], [270, 760]]) R(x, '#fff6d8', a, b, 6, 6)
  // a plant
  box(x, 860, 1060, 110, 90, '#c0623a', { b: 6 }); for (const [dx, dy, r] of [[-30, -40, 0.4], [0, -70, 0], [30, -40, -0.4]]) { x.save(); x.translate(915 + dx, 1060 + dy); x.rotate(r); R(x, INK, -22, -50, 44, 100); R(x, '#3fb08a', -16, -44, 32, 88); x.restore() }
  // the lamp
  R(x, INK, 538, 380, 6, 150)
  box(x, 470, 530, 140, 70, '#f2c75c', { b: 6, hi: '#ffe39a' })
  if (lampA > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 600, 0, 1180); g.addColorStop(0, `rgba(255,226,150,${0.22 * lampA})`); g.addColorStop(1, `rgba(255,226,150,${0.04 * lampA})`)
    x.fillStyle = g; x.beginPath(); x.moveTo(475, 600); x.lineTo(605, 600); x.lineTo(820, 1180); x.lineTo(260, 1180); x.closePath(); x.fill(); x.restore()
  }
  void t
}
function tell1(x, t, S) {
  const { u, hero } = S
  const flick = u > 1.0 && u < 1.25 ? (Math.floor(u * 40) % 2 ? 0.3 : 1) : 1
  room(x, t, flick)
  shadow(x, 540, 1170, 260)
  const o = { x: 540, y: 960, s: 290, mood: 'neutral', look: [0, 0], hops: [S.t0 + 0.3, S.t0 + 1.45, S.t0 + 1.8] }
  hero(x, t, o)
  // a slow peek over the shades, then they go back up
  const peek = Math.sin(Math.PI * clamp(prog(u, 2.0, 2.65)))
  shades(x, t, o, -0.35 * peek)
  bubble(x, t, 700, 700, S.t0 + 1.4, S.t1, 'this lamp is a lot.', { size: 36, tail: -0.4 })
}

// ── TELL 2: week one, remembered
function tell2(x, t, S) {
  const { u, hero, date } = S
  shadow(x, 280, 1190, 220); shadow(x, 800, 1190, 210)
  const fk = pop01(t, S.t0 + 1.25, 0.3, 2.4)
  if (fk > 0.01) {
    x.save(); x.translate(540, 650); x.rotate(-0.04); x.scale(fk, fk)
    box(x, -170, -150, 120, 30, '#d9a648', { b: 6 })
    box(x, -170, -120, 340, 230, '#e9b85a', { b: 6, hi: '#f5cd78' })
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('WEEK 1', -150, -82)
    x.font = `700 22px ${MONO}`; x.fillText('fave snack:', -150, -36)
    // a pixel pickle
    x.save(); x.translate(60, 30); x.rotate(-0.5)
    R(x, INK, -70, -26, 140, 52); R(x, '#5fa84a', -64, -20, 128, 40); R(x, '#7fc860', -60, -18, 116, 10)
    for (const d of [-40, -10, 20, 48]) R(x, '#3f7c34', d, 2, 8, 8)
    x.restore()
    x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.fillText('(tuesday)', -150, 70)
    x.restore()
  }
  hero(x, t, { x: 280, y: 1060, s: 230, mood: u < 0.9 ? 'squint' : 'neutral', look: [1, 0], hops: [S.t0 + 0.95, S.t0 + 1.3, S.t0 + 1.6] })
  shades(x, t, { x: 280, y: 1060, s: 230, hops: [S.t0 + 0.95, S.t0 + 1.3, S.t0 + 1.6] }, 1)
  const dm = u < 0.9 ? 'happy' : u < 1.85 ? 'wide' : 'heart'
  date(x, t, { x: 800, y: 1070, s: 220, mood: dm, look: [-1, 0], hops: [S.t0 + 0.35, S.t0 + 1.85], blush: u > 1.85 ? 1 : undefined })
  hearts(x, t, S.t0 + 1.9, 800, 930, { n: 6 })
  bubble(x, t, 730, 900, S.t0 + 0.3, S.t0 + 0.95, 'fave snack? you won’t—', { size: 32, tail: 0.3 })
  bubble(x, t, 400, 880, S.t0 + 0.95, S.t1, 'pickles. week one. tuesday.', { size: 32, tail: -0.5 })
}

// ── TELL 3: the stare is listening
function speedLines(x, t, cx, cy, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  for (let i = 0; i < 28; i++) {
    const ang = (i / 28) * Math.PI * 2 + Math.floor(t * 12) * 0.05, r0 = 300 + ((i * 37) % 90), r1 = 900
    x.strokeStyle = i % 3 ? 'rgba(226,61,102,0.45)' : 'rgba(255,180,200,0.35)'; x.lineWidth = 6 + (i % 3) * 4
    x.beginPath(); x.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0); x.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1); x.stroke()
  }
  x.restore()
}
function meter(x, t, cx, cy, u, k) {
  if (k <= 0.01) return
  const flip = u > 1.75
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -180, -60, 360, 120, '#14102a', { b: 6 })
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = flip ? '#9fe6b0' : '#ff8fa0'
  x.fillText(flip ? 'STATUS:' : 'INTENSITY', 0, -32)
  if (!flip) {
    const f = clamp(prog(u, 0.7, 1.4))
    for (let i = 0; i < 10; i++) R(x, (i + 1) / 10 <= f + 0.001 ? (i > 6 ? RED : '#ff8fa0') : '#2a1f55', -160 + i * 32, -6, 26, 40)
  } else {
    x.font = `800 34px ${INTER}`; x.fillStyle = '#9fe6b0'; x.fillText('just listening', 0, 14)
  }
  x.restore()
  void t
}
function tell3(x, t, S) {
  const { u, hero, date } = S
  const drama = clamp(prog(u, 0.6, 0.8)) * (1 - clamp(prog(u, 1.75, 1.95)))
  speedLines(x, t, 300, 1000, drama)
  if (drama > 0) { x.save(); x.fillStyle = `rgba(90,8,30,${0.35 * drama})`; x.fillRect(0, 380, 1080, 1100); x.restore() }
  shadow(x, 300, 1190, 240); shadow(x, 800, 1190, 210)
  const o = { x: 300, y: 1040, s: 250, mood: u < 1.75 ? 'squint' : 'sparkle', look: [1, 0], hops: [S.t0 + 1.8, S.t0 + 2.2, S.t0 + 2.5], squash: u > 1.8 ? -0.05 : 0 }
  hero(x, t, o)
  meter(x, t, 300, 720, u, pop01(t, S.t0 + 0.65, 0.3, 2.4))
  const dm = u < 1.85 ? 'wide' : u < 2.6 ? 'happy' : 'heart'
  date(x, t, { x: 800, y: 1060, s: 220, mood: dm, look: [-1, 0], hops: [S.t0 + 0.9, S.t0 + 1.2, S.t0 + 2.6], blush: u > 2.6 ? 1 : undefined, squash: u < 1.85 && u > 0.7 ? 0.04 : 0 })
  // a sweat drop on the date while the stare is on
  if (drama > 0.5) { const ph = (t * 1.4) % 1; R(x, '#8fe3ff', 900 + 0, 900 + ph * 40, 14, 20) }
  hearts(x, t, S.t0 + 2.62, 800, 920, { n: 5 })
  bubble(x, t, 780, 860, S.t0 + 0.75, S.t0 + 1.95, '…so I tripped on stage.', { size: 30, tail: 0.2 })
  bubble(x, t, 470, 560, S.t0 + 1.95, S.t1, 'and THEN??', { size: 40, tail: -0.5, col: '#ffd2dc' })
  sparkles(x, t, 300, 720, S.t0 + 1.76, 8, 200, 1, ['#9fe6b0', BONE, GOLD])
}

const EP = makeTell({
  id: 'trtellscorpio', sign: 'scorpio', name: 'Scorpio', date: 'aquarius', deep: '#b0173f', accent: '#ff6a8c',
  hookMood: 'neutral',
  hook: (x, t, S) => {
    const o = { x: 540, y: 930, s: 330, pop: S.k, hops: [T.heroIn + 0.35, T.wink - 0.05] }
    shades(x, t, o, -0.45 * Math.sin(Math.PI * clamp(prog(t, T.wink - 0.15, T.wink + 0.65))))
  },
  tells: [
    { caption: 'sunglasses. *indoors.*', draw: tell1,
      cues: [['pop', 0.3, 659.25, 0.035, 0], ['tick', 1.0, 0.03], ['tick', 1.08, 0.03], ['tick', 1.17, 0.03], ['pop', 1.42, 880, 0.03, 0.3], ['pluck', 2.05, 987.77, 0.03, 0.4, 0]] },
    { caption: 'remembers *week one.*', draw: tell2,
      cues: [['pop', 0.32, 1174.66, 0.03, 0.4], ['pop', 0.97, 739.99, 0.035, -0.4], ['pop', 1.27, 1318.51, 0.045, 0], ['tick', 1.3, 0.04], ['pluck', 1.88, 1174.66, 0.04, 0.5, 0.3], ['pluck', 2.0, 1567.98, 0.035, 0.5, 0.3]] },
    { caption: 'the intense stare? just *listening.*', draw: tell3,
      cues: [['boom', 0.6, 0.16], ['tom', 0.62, 110, { gain: 0.16, decay: 0.4 }], ['tom', 0.95, 98, { gain: 0.14, decay: 0.4 }], ['riser', 0.7, 1.4, 0.02], ['pop', 0.77, 659.25, 0.03, 0.4],
        ['pop', 1.76, 1318.51, 0.05, 0], ['glitter', 1.76, 2.1], ['pop', 1.97, 1567.98, 0.04, -0.3], ['pluck', 2.62, 1174.66, 0.04, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 400, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    const o = { x: 400, y: 880, s: 260, pop: ok, mood: t > T.stamp + 0.15 ? 'sparkle' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS }
    hero(x, t, o); shades(x, t, o, 1)
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: '*Deep* end only.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, lerp, ease, SC]
