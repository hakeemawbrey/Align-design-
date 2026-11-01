// trtellleo: TELL ME WITHOUT TELLING ME, "Tell me you're a Leo without telling me." (20 s vertical, Star Talk Trends §1,
// music: pop · C). Story 0–15.6, then the shared end card. The format look lives in ./tellkit.js (identical in all five).
//   0.0–2.1    hook: "Tell me you’re a *Leo* | without telling me." ♌ Leo pops in wearing a tiny crown and winks.
//   2.1–4.85   TELL 1 "ring light… for a *phone call.*"  A ring light clicks on; Leo glows; the phone says VOICE CALL.
//              Leo: "how’s my lighting?"  The phone: "…it’s audio only."
//   4.85–7.6   TELL 2 "applauds their own *parallel parking.*"  Leo's car backs into the gap (a little crooked); Leo pops
//              out and claps for itself: CLAP! CLAP! CLAP!  "flawless."
//   7.6        card cut.
//   7.6–10.95  TELL 3 (the twist) "hypes their *date* harder than themselves."  The spotlight is on Leo… Leo shoves it
//              onto the date, raises a MY DATE!! sign, confetti: "they’re SO funny!!"  The date melts (heart eyes).
//   11.35      THE STARS' stamp slams "…a LEO."  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Main character, *generous* edition."
import { makeTell, R, box, bubble, label, shadow, spotlight, sparkles, confetti, hearts, drawBits, starFrame, inSprite, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, RED, INTER, T } from './tellkit.js'

const LEO = '#f39a3a'

// a tiny pixel crown on top of the sprite
function crown(x, t, o) {
  const F = starFrame(o.x, o.y, o.s, t, o)
  inSprite(x, F, () => {
    const C = ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG']
    C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = INK; x.fillRect(15.5 + i - 0.25, -2.4 + j - 0.25, 1.5, 1.5) }))
    C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = ch === 'R' ? RED : GOLD; x.fillRect(15.5 + i, -2.4 + j, 1, 1) }))
  })
}

// ── TELL 1: a ring light for a voice call
function ringLight(x, cx, cy, Rr, on, t) {
  // stand + tripod
  R(x, INK, cx - 7, cy + Rr - 6, 14, 1180 - cy - Rr + 6); R(x, '#5a5470', cx - 3, cy + Rr, 6, 1180 - cy - Rr)
  for (const d of [-1, 1]) { x.save(); x.translate(cx, 1150); x.rotate(d * 0.5); R(x, INK, -6, 0, 12, 80); x.restore() }
  if (on > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, Rr * 0.5, cx, cy, Rr * 3.2)
    g.addColorStop(0, `rgba(255,248,225,${0.28 * on})`); g.addColorStop(1, 'rgba(255,248,225,0)')
    x.fillStyle = g; x.fillRect(cx - Rr * 3.2, cy - Rr * 3.2, Rr * 6.4, Rr * 6.4); x.restore()
  }
  // the ring: chunky pixel cells around a circle
  const N = 44, c = 22
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, px = Math.round((cx + Math.cos(a) * Rr) / 4) * 4, py = Math.round((cy + Math.sin(a) * Rr) / 4) * 4
    if (pass === 0) R(x, INK, px - c / 2 - 5, py - c / 2 - 5, c + 10, c + 10)
    else R(x, on > 0.5 ? (i % 2 ? '#fffbea' : '#fff1c8') : '#6a6488', px - c / 2, py - c / 2, c, c)
  }
  void t
}
function phone(x, t, cx, cy, rot, timer) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -70, -125, 140, 250, '#2a2148', { b: 7 })
  R(x, '#14102a', -58, -108, 116, 210)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 18px 'Space Mono', monospace`; x.fillStyle = '#9fe6b0'; x.fillText('VOICE', 0, -66); x.fillText('CALL', 0, -44)
  x.font = `700 20px 'Space Mono', monospace`; x.fillStyle = BONE; x.fillText(timer, 0, -10)
  // a little waveform
  for (let i = 0; i < 7; i++) { const h = 8 + 22 * Math.abs(Math.sin(t * 9 + i * 1.3)); R(x, '#9fe6b0', -42 + i * 12, 40 - h / 2, 7, h) }
  x.restore()
}
function tell1(x, t, S) {
  const { u, hero } = S
  const on = clamp(prog(u, 0.25, 0.3))
  ringLight(x, 290, 720, 150, on, t)
  shadow(x, 650, 1150, 230)
  // light wash on the hero
  if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(560, 880, 20, 560, 880, 330); g.addColorStop(0, `rgba(255,250,232,${0.22 * on})`); g.addColorStop(1, 'rgba(255,250,232,0)'); x.fillStyle = g; x.fillRect(200, 520, 720, 720); x.restore() }
  const mood = u < 0.3 ? 'neutral' : u > 1.75 && u < 2.3 ? 'wide' : 'sparkle'
  hero(x, t, { x: 640, y: 940, s: 270, mood, look: u > 1.75 ? [1, -0.6] : [0, 0], hops: [S.t0 + 0.32, S.t0 + 0.85, S.t0 + 1.2] })
  phone(x, t, 880, 800, 0.14, `0:0${Math.min(9, Math.floor(u * 3) + 1)}`)
  sparkles(x, t, 290, 720, S.t0 + 0.27, 10, 180, 1, ['#fffbea', GOLD, BONE])
  bubble(x, t, 500, 640, S.t0 + 0.75, S.t1, 'how’s my lighting?', { size: 36, tail: 0.3 })
  bubble(x, t, 840, 540, S.t0 + 1.7, S.t1, '…it’s audio only.', { size: 30, col: '#c9f2d4', tail: 0.2 })
}

// ── TELL 2: applause for its own parallel parking
function car(x, cx, cy, col, rot = 0, w = 290) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  const h = 70
  box(x, -w * 0.28, -h - 52, w * 0.56, 58, col, { b: 6 })
  R(x, '#bfe8ff', -w * 0.24, -h - 44, w * 0.21, 40); R(x, '#bfe8ff', w * 0.03, -h - 44, w * 0.21, 40)
  box(x, -w / 2, -h, w, h, col, { b: 6, hi: 'rgba(255,255,255,0.25)' })
  R(x, '#fff1a8', w / 2 - 22, -h + 14, 16, 14); R(x, RED, -w / 2 + 6, -h + 14, 14, 14)
  for (const d of [-0.3, 0.3]) { R(x, INK, d * w - 30, -14, 60, 46); R(x, '#5a5470', d * w - 14, 2, 28, 16) }
  x.restore()
}
function tell2(x, t, S) {
  const { u, hero } = S
  // the street
  R(x, '#231c3c', 0, 900, 1080, 300); R(x, '#2e2650', 0, 900, 1080, 10)
  for (let i = 0; i < 7; i++) R(x, 'rgba(239,230,214,0.35)', i * 170 + 20, 960, 90, 8)
  R(x, INK, 0, 1196, 1080, 12); R(x, '#8c86a8', 0, 1204, 1080, 26); R(x, '#5f5a7c', 0, 1230, 1080, 50)
  car(x, 175, 1180, '#4f7cd8')
  car(x, 905, 1180, '#3fb08a')
  // Leo's car: drives in, then backs into the gap, ending a little crooked
  const a = ease.outCubic(prog(u, 0, 0.5)), b = ease.inOutCubic(prog(u, 0.55, 1.3))
  let cx = lerp(1350, 760, a), cy = 1040, rot = 0
  if (u > 0.55) { cx = lerp(760, 540, b); cy = lerp(1040, 1178, b); rot = 0.32 * Math.sin(Math.PI * b) + 0.05 * b }
  if (u > 1.3 && u < 1.5) cx += 6 * Math.sin((u - 1.3) * 60)
  car(x, cx, cy, LEO, rot)
  if (u > 0.55 && u < 1.3) for (let i = 0; i < 3; i++) { const p = ((u * 2.5 + i / 3) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#cfc8e8', cx + 160 + p * 60, cy - 30 - p * 30 - i * 6, 18, 18); x.restore() }
  // Leo pops out and claps for itself
  const pk = pop01(t, S.t0 + 1.45, 0.35, 2.3)
  if (pk > 0.01) {
    const claps = [1.62, 1.92, 2.22].map(c => S.t0 + c)
    hero(x, t, { x: 540, y: 850, s: 230, pop: pk, mood: 'happy', hops: claps })
    claps.forEach((c, i) => {
      const k = pop01(t, c, 0.2, 3) * outK(t, [c + 0.5, c + 0.7])
      if (k > 0.01) label(x, 'CLAP!', [330, 760, 430][i], [700, 690, 600][i], { size: 44 * k, col: GOLD, font: INTER, weight: 800, rot: [-0.2, 0.18, -0.08][i] })
      sparkles(x, t, [330, 760, 430][i], [700, 690, 600][i], c, 6, 60, i, [GOLD, BONE])
    })
    bubble(x, t, 760, 560, S.t0 + 2.3, S.t1, 'flawless.', { size: 36, tail: -0.5 })
  }
}

// ── TELL 3: the spotlight goes to the date
function sign(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const bob = 14 * Math.abs(Math.sin(t * 7))
  x.save(); x.translate(cx, cy - bob); x.rotate(0.06 * Math.sin(t * 7)); x.scale(k, k)
  R(x, INK, -9, 40, 18, 200); R(x, '#a07850', -4, 40, 8, 196)
  box(x, -170, -70, 340, 130, BONE, { b: 8 })
  x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('MY DATE!!', 0, -2)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, -150, -64, 5)
  drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 150, 50, 5)
  x.restore()
}
function tell3(x, t, S) {
  const { u, hero, date } = S
  // two little round stages
  for (const [cx, w] of [[300, 300], [720, 340]]) { x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, 1150, w / 2 + 6, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3a2d66'; x.beginPath(); x.ellipse(cx, 1146, w / 2, 32, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  const sw = ease.inOutCubic(prog(u, 0.55, 1.0))
  spotlight(x, lerp(380, 640, sw), 380, lerp(300, 720, sw), 1150, 330, 1)
  // Leo basks… then shoves the light over
  const lMood = u < 0.5 ? 'sparkle' : 'happy'
  const leoHops = [S.t0 + 0.5, S.t0 + 1.05, S.t0 + 1.4, S.t0 + 1.75, S.t0 + 2.1, S.t0 + 2.45, S.t0 + 2.8]
  const signK = pop01(t, S.t0 + 1.05, 0.3, 2.4)
  if (signK > 0.01) sign(x, t, 300, 790, signK)
  hero(x, t, { x: 300, y: 1030, s: 220, mood: lMood, look: u < 0.5 ? [0, 0] : [1, -0.3], hops: leoHops })
  confetti(x, t, S.t0 + 1.1, 300, 760)
  // the date: surprised, then shy, then melting
  const dMood = u < 1.0 ? 'neutral' : u < 1.25 ? 'wide' : u < 2.3 ? 'happy' : 'heart'
  date(x, t, { x: 720, y: 1000, s: 250, mood: dMood, look: u < 1.0 ? [-1, 0] : u < 2.3 ? [-1, 0.6] : [-1, 0], blush: u > 1.25 ? 1 : 0, hops: [S.t0 + 1.05, S.t0 + 2.3] })
  hearts(x, t, S.t0 + 2.35, 720, 830, { n: 6 })
  bubble(x, t, 400, 560, S.t0 + 1.6, S.t1, 'they’re SO funny!!', { size: 36, tail: -0.6 })
}

const EP = makeTell({
  id: 'trtellleo', sign: 'leo', name: 'Leo', date: 'libra', deep: '#c45a12', accent: LEO,
  hookMood: 'sparkle',
  hook: (x, t, S) => crown(x, t, { x: 540, y: 930, s: 330, pop: S.k, hops: [T.heroIn + 0.35, T.wink - 0.05] }),
  tells: [
    { caption: 'ring light… for a *phone call.*', draw: tell1,
      cues: [['tick', 0.25, 0.07], ['pop', 0.27, 1760, 0.03, -0.3], ['glitter', 0.27, 0.6], ['pop', 0.78, 880, 0.03, 0], ['pop', 1.72, 659.25, 0.03, 0.4]] },
    { caption: 'applauds their own *parallel parking.*', draw: tell2,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['riser', 0.55, 1.3, 0.015], ['tick', 1.3, 0.05], ['tick', 1.38, 0.04], ['pop', 1.47, 987.77, 0.04, 0],
        ['clap', 1.62, { gain: 0.14, pan: -0.3 }], ['clap', 1.92, { gain: 0.14, pan: 0.3 }], ['clap', 2.22, { gain: 0.16 }], ['pop', 2.3, 1174.66, 0.03, 0.3]] },
    { caption: 'hypes their *date* harder than themselves.', draw: tell3,
      cues: [['whoosh', 0.55, 0.45, 0.03], ['pop', 1.05, 1318.51, 0.045, -0.3], ['glitter', 1.1, 1.6], ['pop', 1.6, 880, 0.03, -0.3], ['pluck', 2.32, 1174.66, 0.04, 0.5, 0.3], ['pluck', 2.44, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 400, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    const o = { x: 400, y: 880, s: 260, pop: ok, mood: t > T.stamp + 0.15 ? 'sparkle' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS }
    hero(x, t, o); crown(x, t, o)
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Main character, *generous* edition.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, BONE, easeOutBack, label]
