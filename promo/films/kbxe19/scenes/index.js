// kbxe19: BEFORE YOU TEXT YOUR EX, Ep 19 (long), 'The "can we try again" draft' (90 s, star_advice post, cinematic · Bbm).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line.
//   0.0   frame 0: Libra mid-gasp, a draft so long it unrolls off the phone like a scroll, STOP mid-slam. Hook "The try-again
//         draft. *Wait* for the verdict."  0.35 STOP + freeze ("it's *four* screens long.")  THE STARS: "this one gets a
//         real look." / "three questions. then a verdict."  → the sign flips: 3 QUESTIONS FIRST
//   CHAPTER 1 · THE DRAFT (6–20): it gets longer (SCREEN 4 OF 4); then Libra's scales tip: MISS THEM vs WHY IT ENDED.
//   CHAPTER 2 · QUESTION ONE (20–38): "What changed since it ended?" ("…nothing. just time.") → the rerun: the same fight
//         in March and the same fight imagined now, side by side → SAME FIGHT stamp.
//   CHAPTER 3 · QUESTION TWO (38–56): "What do I actually miss?" → two columns, THE PERSON vs THE ROUTINE, items drop in.
//   CHAPTER 4 · QUESTION THREE (56–72): "What would I tell a friend?" → Pisces steps in and says it (crying); a hug.
//   CHAPTER 5 · THE VERDICT (72–90): NOT TONIGHT stamps down; the scroll rolls up and away; Libra writes what they need.
//   87.5  "You can miss them *and* move on." lands 89.05, hard cut at 90.
import {
  makeBX, chapter, roomLiving, roomBedroom, sign, pisces, drawCard, drawChips, R, box, bubble, sparkles, label, tag, glowAt, hearts, wrap,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, GREEN, INTER, MONO,
} from '../../kbxe01/bxkit.js'

const D = 90
const T = { s0: 0.35, c1: 6.0, scales: 13.0, c2: 20.0, rerun: 26.0, same: 33.0, c3: 38.0, cols: 44.0, c4: 56.0, pis: 62.0, hug: 68.5, c5: 72.0, stamp: 72.6, roll: 75.5, note: 78.5, last: 87.5, land: 89.05 }
const QS = [
  { q: 'What changed since it ended?', a: '…honestly? nothing. just time.', at: T.c2 + 0.4, mood: 'squint' },
  { q: 'What do I actually miss?', a: '…let me make a list.', at: T.c3 + 0.4, mood: 'neutral' },
  { q: 'What would I tell a friend?', a: '…ooh. that’s a hard one.', at: T.c4 + 0.4, mood: 'wide' },
]
const TICK = [T.same + 3.0, T.cols + 9.5, T.hug + 1.5]
const OLD = [{ stamp: 'APR 9' }, { side: 'L', text: 'i think we tried our best' }, { side: 'R', text: 'yeah. we did.' }]
const SNIPS = ['hey. I know it’s been a while', 'I’ve been thinking about us', 'I think I’ve changed', 'we were SO good at the start', 'remember the lake trip?', 'maybe we rushed the ending', 'I miss your laugh', 'can we try again?']

const libra = (x, t, o) => sign(x, t, 'libra', { seed: 3, ...o })
function scroll(x, cx, top, len, t, a = 1) {
  if (len <= 2) return
  x.save(); x.globalAlpha *= a
  R(x, INK, cx - 150, top, 300, len + 10); R(x, '#f4eee4', cx - 144, top, 288, len)
  x.font = `600 22px ${INTER}`; x.fillStyle = '#3a2d66'; x.textAlign = 'left'; x.textBaseline = 'middle'
  for (let i = 0; i * 44 + 30 < len; i++) x.fillText(SNIPS[i % SNIPS.length], cx - 128, top + 30 + i * 44)
  R(x, '#d8b26a', cx - 160, top + len - 6, 320, 22)
  x.restore()
}
function chips(x, t) { drawChips(x, 540, 545, TICK.map(k => t > k), 1) }
function qCard(x, t, i, until) {
  const q = QS[i]
  const k = easeOutBack(prog(t, q.at, q.at + 0.3), 1.6) * outK(t, [until - 0.25, until])
  drawCard(x, lerp(1500, 540, clamp(easeOutBack(prog(t, q.at, q.at + 0.3), 1.6))), 730, i + 1, q.q, { k: Math.max(0.01, k), tick: prog(t, TICK[i], TICK[i] + 0.3) })
}

// ── chapter scenes
function draftCh(x, t) {
  roomLiving(x, t)
  const u = t - T.c1
  if (t < T.scales) {
    libra(x, t, { x: 260, y: 1220, s: 240, mood: 'neutral', look: [1, -0.6], hops: [T.c1 + 1, T.c1 + 2.5, T.c1 + 4] })
    scroll(x, 640, 560, 200 + 700 * ease.outCubic(prog(u, 0.2, 6)), t)
    tag(x, `SCREEN ${1 + Math.min(3, Math.floor(u / 1.6))} OF 4`, 640, 500, { size: 26, bg: GOLD })
    pisces(x, t, { x: 960, y: 1380, s: 150, tears: u > 3 ? 3 : 2, mood: 'sparkle', look: [-1, -0.7], role: 'READING ALONG' })
  } else {
    // the scales: MISS THEM vs WHY IT ENDED, tipping back and forth
    const v = T.scales
    const tip = 0.28 * Math.sin((t - v) * 1.8) * (1 - 0.5 * prog(t, v + 4, v + 7))
    x.save(); x.translate(540, 760)
    R(x, INK, -12, 0, 24, 520); R(x, GOLD, -6, 0, 12, 520)
    x.rotate(tip); R(x, INK, -330, -10, 660, 20); R(x, GOLD, -324, -6, 648, 12)
    for (const d of [-1, 1]) {
      x.save(); x.translate(d * 300, 0); x.rotate(-tip)
      R(x, INK, -4, 0, 8, 160); R(x, INK, -130, 160, 260, 26); R(x, BONE, -124, 164, 248, 18)
      x.font = `900 30px ${INTER}`; x.fillStyle = d < 0 ? '#ff8fb1' : '#9fd8ff'; x.textAlign = 'center'; x.fillText(d < 0 ? 'MISS THEM' : 'WHY IT ENDED', 0, 130)
      x.restore()
    }
    x.restore()
    libra(x, t, { x: 540, y: 1360, s: 220, mood: 'squint', look: [Math.sin((t - v) * 1.8), -1], hops: [v + 0.8, v + 2.5, v + 4.2] })
    pisces(x, t, { x: 960, y: 1430, s: 130, tears: 2, mood: 'wide', look: [-1, -0.7] })
  }
}
function q1Ch(x, t) {
  roomLiving(x, t, { a: 0.75 })
  chips(x, t)
  if (t < T.rerun) {
    qCard(x, t, 0, T.rerun)
    libra(x, t, { x: 380, y: 1230, s: 250, mood: t > QS[0].at + 0.8 ? 'squint' : 'neutral', look: [0, -0.6], hops: [QS[0].at + 0.8] })
    bubble(x, t, 540, 970, QS[0].at + 0.8, T.rerun, QS[0].a, { size: 46, maxW: 800 })
    pisces(x, t, { x: 960, y: 1440, s: 130, tears: 2, mood: 'sparkle', look: [-1, -0.6] })
  } else {
    // the rerun: same fight, twice
    const u = t - T.rerun
    for (const [i, lbl] of [[0, 'MARCH'], [1, 'NOW (IMAGINED)']]) {
      const cx = i ? 790 : 290, k = pop01(t, T.rerun + i * 0.5, 0.35, 1.8)
      x.save(); x.translate(cx, 940); x.scale(k, k)
      R(x, INK, -236, -300, 472, 600); R(x, i ? '#24183f' : '#2b2446', -230, -294, 460, 588)
      x.restore()
      if (k < 0.05) continue
      label(x, lbl, cx, 680, { size: 26, col: GOLD, k })
      libra(x, t, { x: cx - 100, y: 1060, s: 150 * k, mood: 'squint', glyph: false, hops: [T.rerun + 1.2 + i * 0.4, T.rerun + 3.0 + i * 0.4] })
      sign(x, t, 'aries', { x: cx + 100, y: 1060, s: 150 * k, mood: 'squint', glyph: false, seed: 9, look: [-1, 0], hops: [T.rerun + 2.1 + i * 0.4] })
      bubble(x, t, cx, 790, T.rerun + 1.2 + i * 0.4, T.c3 - 0.1, 'you never plan anything', { size: 24, maxW: 380 })
      bubble(x, t, cx, 880, T.rerun + 2.1 + i * 0.4, T.c3 - 0.1, 'you always cancel!', { size: 24, maxW: 380, col: '#ffd0c0' })
    }
    if (t > T.same) {
      const k = easeOutBack(prog(t, T.same, T.same + 0.25), 2.4)
      x.save(); x.translate(540, 1300); x.rotate(-0.12); x.scale(2 - k, 2 - k); x.globalAlpha = clamp(k * 3)
      x.strokeStyle = '#ff5a6a'; x.lineWidth = 12; x.strokeRect(-260, -60, 520, 120)
      x.font = `900 72px ${INTER}`; x.fillStyle = '#ff5a6a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAME FIGHT', 0, 4)
      x.restore()
    }
    pisces(x, t, { x: 980, y: 1500, s: 120, tears: 3, mood: 'wide', look: [-1, -0.8] })
    void u
  }
}
const PERSON = ['their laugh']
const ROUTINE = ['sunday pancakes', 'someone to text goodnight', 'having weekend plans', 'the lake trip', 'not being the single one']
function q2Ch(x, t) {
  roomLiving(x, t, { a: 0.75 })
  chips(x, t)
  if (t < T.cols) {
    qCard(x, t, 1, T.cols)
    libra(x, t, { x: 380, y: 1230, s: 250, mood: 'neutral', look: [0, -0.6], hops: [QS[1].at + 0.8] })
    bubble(x, t, 540, 970, QS[1].at + 0.8, T.cols, QS[1].a, { size: 46, maxW: 800 })
    pisces(x, t, { x: 960, y: 1440, s: 130, tears: 2, mood: 'sparkle', look: [-1, -0.6] })
  } else {
    const u = t - T.cols
    for (const [i, name, col] of [[0, 'THE PERSON', '#ff8fb1'], [1, 'THE ROUTINE', '#9fd8ff']]) {
      const cx = i ? 790 : 290
      R(x, INK, cx - 236, 600, 472, 760); R(x, '#1d1640', cx - 230, 606, 460, 748)
      x.font = `900 36px ${INTER}`; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, cx, 650)
    }
    const items = [[ROUTINE[0], 1], [PERSON[0], 0], [ROUTINE[1], 1], [ROUTINE[2], 1], [ROUTINE[3], 1], [ROUTINE[4], 1]]
    const n = [0, 0]
    items.forEach(([s, c], i) => {
      const at = 0.6 + i * 1.3
      if (u < at) return
      const j = n[c]++, cx = c ? 790 : 290, k = easeOutBack(prog(u, at, at + 0.35), 1.8)
      const y = lerp(560, 730 + j * 96, clamp(k))
      x.save(); x.translate(cx, y); x.rotate(0.04 * (i % 2 ? 1 : -1))
      x.font = `800 30px ${INTER}`; const w = Math.min(420, x.measureText(s).width + 40)
      R(x, INK, -w / 2 - 5, -32, w + 10, 64); R(x, c ? '#d8eeff' : '#ffe0ec', -w / 2, -27, w, 54)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
      x.restore()
    })
    if (u > 8.6) tag(x, 'MOSTLY: THE ROUTINE', 540, 1420, { size: 34, bg: GOLD, k: pop01(t, T.cols + 8.6, 0.3, 2.2) })
    libra(x, t, { x: 140, y: 1500, s: 150, mood: u > 8.6 ? 'wide' : 'squint', look: [1, -1] })
    pisces(x, t, { x: 960, y: 1500, s: 130, tears: 3, mood: 'sparkle', look: [-1, -1] })
  }
}
function q3Ch(x, t) {
  roomLiving(x, t, { a: 0.8 })
  chips(x, t)
  if (t < T.pis) {
    qCard(x, t, 2, T.pis)
    libra(x, t, { x: 380, y: 1230, s: 250, mood: t > QS[2].at + 0.8 ? 'wide' : 'neutral', look: [0, -0.6], hops: [QS[2].at + 0.8] })
    bubble(x, t, 540, 970, QS[2].at + 0.8, T.pis, QS[2].a, { size: 46, maxW: 800 })
    pisces(x, t, { x: 960, y: 1440, s: 130, tears: 2, mood: 'sparkle', look: [-1, -0.6] })
  } else {
    // Pisces steps into the light and says it
    const u = t - T.pis
    glowAt(x, 760, 1000, 380, '255,214,150', 0.25 * clamp(u))
    const hug = ease.inOutCubic(prog(t, T.hug, T.hug + 0.6))
    libra(x, t, { x: lerp(300, 450, hug), y: 1150, s: 250, mood: u < 3 ? 'neutral' : u < 6.5 ? 'sparkle' : 'happy', look: [1, -0.2], tears: u > 3 ? 2 : 0, hops: [T.pis + 3.2, T.hug + 0.6] })
    pisces(x, t, { x: lerp(780, 640, hug), y: 1150, s: 250, tears: 3, mood: hug > 0.5 ? 'happy' : 'sparkle', look: [-1, 0], pop: pop01(t, T.pis + 0.1, 0.4, 2), hops: [T.pis + 0.5, T.pis + 1.4, T.pis + 2.3, T.hug + 0.6] })
    if (hug > 0.9) hearts(x, t, T.hug + 0.6, 540, 980, { n: 7 })
  }
}
function verdict(x, t) {
  roomBedroom(x, t)
  const u = t - T.c5
  // the scroll: on the table, then rolls up and flies off
  const roll = ease.inCubic(prog(t, T.roll, T.roll + 1.2))
  if (roll < 1) scroll(x, lerp(700, 1300, roll * roll), 560 + roll * 200, 760 * (1 - roll), t)
  // NOT TONIGHT
  if (t > T.stamp && t < T.note) {
    const k = easeOutBack(prog(t, T.stamp, T.stamp + 0.25), 2.4)
    x.save(); x.translate(620, 860); x.rotate(-0.14); x.scale(2.2 - 1.2 * k, 2.2 - 1.2 * k); x.globalAlpha = clamp(k * 3) * outK(t, [T.note - 0.4, T.note])
    x.strokeStyle = '#ff5a6a'; x.lineWidth = 14; x.strokeRect(-280, -80, 560, 160)
    x.font = `900 86px ${INTER}`; x.fillStyle = '#ff5a6a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NOT TONIGHT', 0, 6)
    x.restore()
  }
  // the note: what I need
  const nk = pop01(t, T.note, 0.35, 1.8)
  if (nk > 0.01) {
    x.save(); x.translate(620, 860); x.rotate(0.03); x.scale(nk, nk)
    R(x, INK, -290, -280, 580, 560); R(x, '#fff6c8', -282, -272, 564, 544)
    x.font = `900 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('what I need:', -252, -210)
    x.font = `700 36px ${INTER}`; x.fillStyle = '#3a2d66'
    ;['someone who plans with me', 'someone who shows up', 'a laugh I don’t have to miss', 'me, first.'].forEach((l, i) => { const a = 0.6 + i * 1.3; if (t - T.note > a) x.fillText('· ' + l.slice(0, Math.round(l.length * prog(t - T.note, a, a + 0.9))), -252, -120 + i * 80) })
    x.restore()
  }
  libra(x, t, { x: 200, y: 1300, s: 230, mood: u < 3.5 ? 'wide' : t > T.note + 5 ? 'happy' : 'neutral', look: [1, -0.6], hops: [T.stamp + 0.1, T.roll + 0.3, T.note + 0.6, T.note + 1.9, T.note + 3.2, T.note + 4.5] })
  pisces(x, t, { x: 960, y: 1440, s: 140, tears: 3, mood: 'happy', role: 'PROUD ROOMMATE' })
  if (t > T.note + 5.5) sparkles(x, t, 620, 860, T.note + 5.5, 12, 300, 2, [GOLD, BONE, '#ff8fb1'])
}

const CH = [
  { at: 5.6, out: [T.c2 - 0.3, T.c2 - 0.1], n: 1, title: 'THE DRAFT' },
  { at: T.c2, out: [T.c3 - 0.3, T.c3 - 0.1], n: 2, title: 'QUESTION ONE' },
  { at: T.c3, out: [T.c4 - 0.3, T.c4 - 0.1], n: 3, title: 'QUESTION TWO' },
  { at: T.c4, out: [T.c5 - 0.3, T.c5 - 0.1], n: 4, title: 'QUESTION THREE' },
  { at: T.c5, out: [T.last - 0.3, T.last - 0.1], n: 5, title: 'THE VERDICT' },
].map(c => ({ ...c, x: 60, y: 130 }))
const HEADS = { size: 84, top: 270 }

const EP = makeBX({
  id: 'kbxe19', sign: 'libra', duration: D, T, ending: 'cut',
  hook: { text: 'The try-again draft. | *Wait* for the verdict.', out: [5.3, 5.5], accentColor: '#ff8fb1', size: 100 },
  shakes: [{ at: T.s0, len: 0.5, amp: 30 }, { at: T.same, len: 0.4, amp: 20 }, { at: T.stamp, len: 0.6, amp: 34 }],
  recs: [{ at: T.s0 + 0.07, len: 1.25, sub: '11:58 PM · DRAFT SAVED', caption: 'it’s *four* screens long.' }],
  segments: [
    { kind: 'draft', t0: 0, t1: T.c1, stopAt: T.s0, flipAt: 3.8, room: (x, t) => roomLiving(x, t), contact: 'Rory', sub: 'last seen in April', clock: '11:58 PM', draft: 'hey. I know it’s been a while. I’ve been thinking about us and I think', old: OLD,
      hero: { x: 175, y: 1250, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.5] },
      extra: (x, t, S, { info }) => scroll(x, 340, info.fieldTop + 70, 520 + 30 * Math.sin(t * 3), t) },
    { kind: 'scene', t0: T.c1, t1: T.c2, draw: draftCh },
    { kind: 'scene', t0: T.c2, t1: T.c3, draw: q1Ch },
    { kind: 'scene', t0: T.c3, t1: T.c4, draw: q2Ch },
    { kind: 'scene', t0: T.c4, t1: T.c5, draw: q3Ch },
    { kind: 'scene', t0: T.c5, t1: D + 0.1, draw: verdict },
  ],
  pis: (x, t) => { if (t < T.c1) pisces(x, t, { x: 985, y: 760, s: 150, tears: 2, mood: 'wide', look: [-1, 0.2], role: 'ROOMMATE' }) },
  heads: [
    { text: 'It gets | *longer.*', at: T.c1 + 0.4, out: [T.scales - 0.25, T.scales - 0.05], ...HEADS },
    { text: 'Libra *weighs* it.', at: T.scales + 0.1, out: [T.c2 - 0.25, T.c2 - 0.05], ...HEADS },
    { text: 'The rerun: | *same* fight.', at: T.rerun + 0.1, out: [T.c3 - 0.25, T.c3 - 0.05], ...HEADS },
    { text: 'Person, or | *routine?*', at: T.cols + 0.1, out: [T.c4 - 0.25, T.c4 - 0.05], ...HEADS },
    { text: 'Pisces says | the *friend* part.', at: T.pis + 0.1, out: [T.c5 - 0.25, T.c5 - 0.05], ...HEADS },
    { text: 'The *verdict.*', at: T.c5 + 0.1, out: [T.note - 0.25, T.note - 0.05], ...HEADS },
    { text: 'Libra wrote | what they *need.*', at: T.note + 0.1, out: [T.last - 0.25, T.last - 0.05], ...HEADS },
    { text: 'You can miss them | *and* move on.', at: T.last, late: 2, lateAt: T.land, size: 96, top: 200, accent: '#ff8fb1' },
  ],
  boxes: [
    { lines: [{ t: 1.8, speaker: 'THE STARS', text: 'okay. this one gets a *real* look.' }, { t: 3.9, speaker: 'THE STARS', text: 'three questions. then a verdict.' }], open: 1.65, close: T.c1 - 0.1 },
    { lines: [{ t: T.scales + 1.6, speaker: 'THE STARS', text: 'missing them is real. so is *why.*' }], open: T.scales + 1.45, close: T.c2 - 0.1 },
    { lines: [{ t: T.same + 0.8, speaker: 'THE STARS', text: 'time passed. the fight didn’t.' }], open: T.same + 0.65, close: T.c3 - 0.1 },
    { lines: [{ t: T.cols + 9.6, speaker: 'THE STARS', text: 'a routine can be rebuilt. *with* anyone.' }], open: T.cols + 9.45, close: T.c4 - 0.1 },
    { lines: [{ t: T.pis + 0.5, speaker: '♓︎ PISCES', color: '#9fd8ff', text: 'you’d tell ME: you deserve someone who *shows up.*' }, { t: T.hug + 0.8, speaker: 'THE STARS', text: 'so tell *yourself.*' }], open: T.pis + 0.35, close: T.c5 - 0.1 },
    { lines: [{ t: T.roll + 0.4, speaker: 'THE STARS', text: 'not tonight. maybe not ever. both okay.' }, { t: T.note + 5.6, speaker: 'THE STARS', text: 'missing them can come along for the ride.' }], open: T.roll + 0.25, close: T.last - 0.1 },
  ],
  kit: CH.map(c => [chapter, c]),
  cues: [
    ['pluck', 0.6, 659.25, 0.03, 0.5, 0.4], ['pluck', 0.74, 587.33, 0.03, 0.5, 0.4],
    ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.c1 + 0.3 + i * 0.45).toFixed(2), 0.02]), ...[0, 1, 2, 3].map(i => ['pop', +(T.c1 + i * 1.6).toFixed(2), 880 + i * 110, 0.035, 0.2]),
    ['whoosh', T.scales, 0.5, 0.035], ['bell', T.scales + 0.5, 987.77, 0.02, 1.2, -0.3], ['bell', T.scales + 2.2, 1174.66, 0.02, 1.2, 0.3], ['bell', T.scales + 3.9, 987.77, 0.02, 1.2, -0.3],
    ...QS.flatMap((q, i) => [['whoosh', q.at, 0.3, 0.04], ['pop', q.at + 0.2, [659.25, 830.61, 1108.73][i], 0.05, 0], ['tick', q.at + 0.22, 0.06], ['pop', q.at + 0.8, 880, 0.03, 0.2]]),
    ...TICK.flatMap((k, i) => [['pop', k + 0.15, 1318.51, 0.05, -0.2], ['bell', k + 0.17, 1760 * (i === 2 ? 1.5 : 1), 0.028, 0.9, 0], ['glitter', k + 0.15, k + 0.4]]),
    ['whoosh', T.rerun, 0.35, 0.035], ['whoosh', T.rerun + 0.5, 0.35, 0.035], ['pop', T.rerun + 1.2, 987.77, 0.04, -0.3], ['pop', T.rerun + 2.1, 739.99, 0.04, 0.3],
    ['boom', T.same, 0.25], ['tom', T.same, 80, { gain: 0.28, decay: 0.3 }],
    ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(T.cols + 0.6 + i * 1.3).toFixed(2), i === 1 ? 1318.51 : 987.77, 0.04, i === 1 ? -0.3 : 0.3]), ['pop', T.cols + 8.6, 1567.98, 0.05, 0],
    ['bell', T.pis + 0.2, 1174.66, 0.02, 1.6, 0], ['pluck', T.pis + 2.8, 659.25, 0.035, 0.5, 0.3], ['pluck', T.pis + 2.94, 587.33, 0.035, 0.5, 0.3], ['glitter', T.hug + 0.6, T.hug + 1.4],
    ['boom', T.stamp, 0.4], ['tom', T.stamp, 66, { gain: 0.36, decay: 0.45 }], ['crash', T.stamp, { gain: 0.06, len: 1.6 }],
    ['whoosh', T.roll, 1.2, 0.045], ['whoosh', T.note, 0.35, 0.035],
    ...[0, 1, 2, 3].map(i => ['pop', +(T.note + 0.6 + i * 1.3).toFixed(2), [880, 987.77, 1174.66, 1318.51][i], 0.04, 0]), ['glitter', T.note + 5.5, T.note + 6.2], ['bell', T.note + 5.6, 1760, 0.03, 1.4, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, wrap, GREEN, MONO]
