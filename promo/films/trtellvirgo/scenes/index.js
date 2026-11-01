// trtellvirgo: TELL ME WITHOUT TELLING ME, "Tell me you're a Virgo without telling me." (20 s vertical, Star Talk Trends §1,
// music: pop · D). Story 0–15.6, then the shared end card. The format look lives in ./tellkit.js (identical in all five).
//   0.0–2.1    hook: "Tell me you’re a *Virgo* | without telling me." ♍ Virgo pops in, straightens an invisible crease, winks.
//   2.1–4.85   TELL 1 "labels *the snacks.*"  A label maker prints SALTY, CRUNCHY… and YOURS ♥ onto three jars. "much better."
//   4.85–7.6   TELL 2 "edits one text *nine times.*"  The draft cycles hey → hey! → hey :) → hi! → … EDIT 9/9 → sends "hey :)".
//   7.6        card cut.
//   7.6–10.95  TELL 3 (the twist) "already wrote down *your allergies.*"  A neat notebook: YOUR NOTES ✓ no walnuts
//              ✓ window seat ✓ hates cilantro. The date: "you remembered??" → heart eyes.
//   11.35      THE STARS' stamp slams "…a VIRGO."  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Organized *affection*."  (Virgo sticks a ♥ FAVORITE label on the date.)
import { makeTell, R, box, bubble, label, shadow, sparkles, hearts, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, MONO, T } from './tellkit.js'

// a label maker in front of the star, tape feeding out
function labelMaker(x, t, cx, cy, tape = 0, text = '') {
  x.save(); x.translate(cx, cy); x.rotate(-0.12)
  box(x, -60, -40, 120, 80, '#ef5c94', { b: 6, hi: '#ff8fb8' })
  R(x, '#14102a', -44, -28, 88, 26)
  x.font = `700 16px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text.slice(0, 7), 0, -15)
  for (let i = 0; i < 3; i++) R(x, BONE, -40 + i * 30, 12, 20, 14)
  if (tape > 0) { R(x, INK, 60, -12, 8 + 70 * tape, 26); R(x, '#fffbea', 62, -8, 4 + 66 * tape, 18) }
  x.restore()
  void t
}
function jar(x, cx, by, lid, txt, lk) {
  box(x, cx - 62, by - 150, 124, 150, 'rgba(190,230,255,0.35)', { b: 6 })
  for (let i = 0; i < 9; i++) R(x, ['#f2c75c', '#e98b4a', '#f7e08a'][i % 3], cx - 52 + (i % 3) * 36, by - 60 - Math.floor(i / 3) * 26, 30, 22)
  box(x, cx - 70, by - 178, 140, 26, lid, { b: 6 })
  if (lk > 0.01) {
    x.save(); x.translate(cx, by - 100); x.rotate(-0.05); x.scale(lk, lk)
    R(x, INK, -60, -20, 120, 40); R(x, '#fffbea', -56, -16, 112, 32)
    x.font = `700 21px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
    x.restore()
  }
}
function tell1(x, t, S) {
  const { u, hero } = S
  // the shelf
  R(x, INK, 420, 1090, 600, 30); R(x, '#a07850', 426, 1094, 588, 18); R(x, '#7a5634', 426, 1108, 588, 6)
  const L = [['SALTY', 0.55, '#3fb08a'], ['CRUNCHY', 1.05, '#4f7cd8'], ['YOURS ♥', 1.6, PINK]]
  L.forEach(([txt, at, lid], i) => jar(x, 520 + i * 200, 1090, lid, txt, pop01(t, S.t0 + at + 0.12, 0.25, 2.6)))
  shadow(x, 250, 1160, 200)
  const printing = L.find(([, at]) => u > at - 0.3 && u < at + 0.12)
  const tape = printing ? prog(u, printing[1] - 0.3, printing[1] + 0.05) : 0
  hero(x, t, { x: 240, y: 990, s: 230, mood: u > 1.9 ? 'happy' : 'squint', look: [1, 0.4], hops: L.map(([, at]) => S.t0 + at + 0.1).concat([S.t0 + 1.95]) })
  labelMaker(x, t, 310, 1070, tape, printing ? printing[0] : '')
  L.forEach(([, at], i) => sparkles(x, t, 520 + i * 200, 990, S.t0 + at + 0.12, 6, 70, i, [GOLD, BONE]))
  bubble(x, t, 330, 760, S.t0 + 1.95, S.t1, 'much better.', { size: 36, tail: -0.4 })
}

// ── TELL 2: one text, nine drafts
const DRAFTS = ['hey', 'hey!', 'hey :)', 'hi!', 'hello :)', 'hey there', 'hiii', 'hi :)', 'hey :)']
function tell2(x, t, S) {
  const { u, hero } = S
  const P = { cx: 600, top: 520, w: 470, h: 640 }
  x.save()
  box(x, P.cx - P.w / 2, P.top, P.w, P.h, '#2a2148', { b: 8 })
  R(x, '#14102a', P.cx - P.w / 2 + 20, P.top + 60, P.w - 40, P.h - 90)
  R(x, '#3a2d66', P.cx - 50, P.top + 22, 100, 14)
  x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('to: my crush', P.cx, P.top + 92)
  R(x, 'rgba(239,230,214,0.2)', P.cx - P.w / 2 + 20, P.top + 120, P.w - 40, 3)
  // the draft field
  const sent = u > 1.95
  const n = clamp(Math.floor((u - 0.2) / 0.18), 0, 8)
  const fy = P.top + P.h - 110
  R(x, INK, P.cx - P.w / 2 + 34, fy - 6, P.w - 68, 72); R(x, '#241a46', P.cx - P.w / 2 + 38, fy - 2, P.w - 76, 64)
  if (!sent) {
    x.font = `700 32px ${MONO}`; x.textAlign = 'left'; x.fillStyle = BONE
    const txt = u > 0.2 ? DRAFTS[n] : ''
    x.fillText(txt, P.cx - P.w / 2 + 60, fy + 30)
    if (Math.floor(t * 3) % 2) R(x, GOLD, P.cx - P.w / 2 + 64 + x.measureText(txt).width, fy + 12, 4, 38)
    if (u > 0.25) label(x, `EDIT ${n + 1}/9`, P.cx + P.w / 2 - 90, fy - 44, { size: 24, col: n === 8 ? GOLD : '#ff8fb8' })
  } else {
    const k = pop01(t, S.t0 + 1.95, 0.25, 2.4)
    x.save(); x.translate(P.cx + 100, P.top + 210); x.scale(k, k)
    R(x, INK, -90, -36, 180, 72); R(x, '#ef5c94', -86, -32, 172, 64)
    x.font = `700 32px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('hey :)', 0, 2)
    x.restore()
    label(x, 'SENT ✓', P.cx + 130, P.top + 268, { size: 20, col: '#9fe6b0', alpha: k })
  }
  x.restore()
  shadow(x, 220, 1260, 170)
  const hops = Array.from({ length: 9 }, (_, i) => S.t0 + 0.2 + i * 0.18).filter((_, i) => i % 2 === 0).concat([S.t0 + 1.97])
  hero(x, t, { x: 210, y: 1160, s: 190, mood: u > 1.95 ? 'happy' : u > 1.3 ? 'wide' : 'squint', look: [1, -1], hops })
  sparkles(x, t, P.cx + 100, P.top + 210, S.t0 + 1.97, 8, 110, 2, ['#ef5c94', BONE, GOLD])
}

// ── TELL 3: the notebook with your notes
function notebook(x, t, S, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 700); x.rotate(-0.03); x.scale(k, k)
  box(x, -230, -190, 460, 380, '#fffbea', { b: 8 })
  R(x, '#ef5c94', -230, -190, 460, 60)
  for (let i = 0; i < 7; i++) R(x, INK, -200 + i * 66, -206, 14, 30)
  x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR NOTES', 0, -158)
  const L = [['no walnuts', 0.95], ['window seat', 1.3], ['hates cilantro', 1.65]]
  L.forEach(([txt, at], i) => {
    const y = -70 + i * 84
    R(x, 'rgba(63,124,240,0.25)', -200, y + 34, 400, 3)
    const lk = clamp(prog(S.u, at, at + 0.2))
    if (lk <= 0) return
    x.globalAlpha = lk
    // a pixel check mark
    for (const [cx, cy] of [[-188, 0], [-182, 6], [-176, 12], [-170, 6], [-164, 0], [-158, -6], [-152, -12]]) R(x, '#2fa86a', cx, y + cy - 4, 8, 8)
    x.font = `700 32px ${MONO}`; x.fillStyle = '#2c2a7a'; x.textAlign = 'left'; x.fillText(txt, -130, y + 2)
    x.globalAlpha = 1
  })
  x.restore()
  void t
}
function tell3(x, t, S) {
  const { u, hero, date } = S
  shadow(x, 280, 1210, 210); shadow(x, 800, 1210, 210)
  notebook(x, t, S, pop01(t, S.t0 + 0.6, 0.35, 2.2))
  hero(x, t, { x: 270, y: 1070, s: 220, mood: u > 2.4 ? 'happy' : 'neutral', look: u > 2.4 ? [1, 0] : [1, -1], hops: [S.t0 + 0.62, S.t0 + 0.97, S.t0 + 1.32, S.t0 + 1.67, S.t0 + 2.45] })
  const dMood = u < 1.9 ? 'neutral' : u < 2.4 ? 'wide' : 'heart'
  date(x, t, { x: 800, y: 1070, s: 230, mood: dMood, look: u < 1.9 ? [-1, -1] : [-1, 0], blush: u > 2.4 ? 1 : 0, hops: [S.t0 + 1.9, S.t0 + 2.4] })
  hearts(x, t, S.t0 + 2.45, 800, 920, { n: 6 })
  bubble(x, t, 760, 1340 - 450, S.t0 + 1.9, S.t1, 'you remembered??', { size: 34, tail: 0.3 })
}

const EP = makeTell({
  id: 'trtellvirgo', sign: 'virgo', name: 'Virgo', date: 'cancer', deep: '#b8245e', accent: '#ff7aaa',
  hookMood: 'happy',
  tells: [
    { caption: 'labels *the snacks.*', draw: tell1,
      cues: [['tick', 0.3, 0.03], ['tick', 0.38, 0.03], ['tick', 0.46, 0.03], ['pop', 0.67, 1174.66, 0.04, 0.1], ['tick', 0.8, 0.03], ['tick', 0.88, 0.03], ['pop', 1.17, 1318.51, 0.04, 0.3], ['tick', 1.35, 0.03], ['tick', 1.43, 0.03], ['pop', 1.72, 1567.98, 0.045, 0.5], ['pop', 1.95, 880, 0.03, -0.3]] },
    { caption: 'edits one text *nine times.*', draw: tell2,
      cues: [...Array.from({ length: 9 }, (_, i) => ['tick', +(0.2 + i * 0.18).toFixed(3), 0.03 + i * 0.002]), ['whoosh', 1.93, 0.3, 0.03], ['pop', 1.97, 1318.51, 0.05, 0.2], ['pop', 2.05, 1760, 0.035, 0.2]] },
    { caption: 'already wrote down *your allergies.*', draw: tell3,
      cues: [['pop', 0.6, 987.77, 0.04, 0], ['tick', 0.95, 0.04], ['tick', 1.3, 0.04], ['tick', 1.65, 0.045], ['pop', 1.9, 1318.51, 0.035, 0.4], ['pluck', 2.42, 1174.66, 0.04, 0.5, 0.3], ['pluck', 2.54, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    shadow(x, 400, 1070, 220 * ok); shadow(x, 690, 1080, 200 * ok)
    hero(x, t, { x: 400, y: 880, s: 260, pop: ok, mood: t > T.stamp + 0.15 ? 'sparkle' : 'wide', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 690, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 0.45] })
    // Virgo sticks a label on the date
    const lk = pop01(t, T.last + 0.4, 0.25, 2.8) * ok
    if (lk > 0.01) {
      x.save(); x.translate(690, 1010); x.rotate(0.08); x.scale(lk, lk)
      R(x, INK, -100, -22, 200, 44); R(x, '#fffbea', -96, -18, 192, 36)
      x.font = `700 22px ${MONO}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥ FAVORITE', 0, 1)
      x.restore()
    }
  },
  finaleCues: [],
  last: 'Organized *affection*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['pop', +(T.last + 0.4).toFixed(3), 1567.98, 0.04, 0.3]]
void [lerp, ease, PINK]
