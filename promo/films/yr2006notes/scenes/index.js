// yr2006notes (20 s vertical, Star Talk Then vs Now · 23) "Folded or spoken." · chiptune B.
// The format's shared look lives in ./tvn.js (identical in all five Block E films). Story 0–15.6, then the end card.
//   THEN 2006  "Love notes | in *2006*"  Class. ♎ Libra (side-swept bangs) at a desk, ♓ Pisces in the middle seat,
//              ♏ Scorpio across the row. Rule of three: (1) the note: "do u like me?  ☐ yes ☐ no ☐ maybe" (sticker
//              "the checkbox era"); (2) folded, and folded, into a tiny triangle (sticker "folded 11×"); (3) passed down
//              the row: Pisces relays it… and bursts into tears doing it (sticker "relay: 1 crying friend").
//              Scorpio unfolds it, ticks "yes"… and adds a fourth box: "☑ obviously". Libra goes heart-eyed.
//   card cut   7.267, on the switch.
//   NOW 2026   "Love notes | in *2026*"  7:00 AM (clock overlay). Libra, half asleep, holds record: a voice note
//              (sticker "7 AM. brave."), re-records it (sticker "re-recorded 4×"), sends. Scorpio wakes, plays it:
//              "good morning! I like u. ok bye!"… and replays it (sticker "played 9×"). Scorpio's reply voice note:
//              "yes. obviously." (callback). Libra melts; Pisces, bottom-left, sobs into a tissue.
//   PAYOFF     the 2006 polaroid top-left, NOW big. THE STARS: "any format. *still brave.*"
//              Last: "Folded or *spoken.*"
import { makeTVN, BEAT, r3, INK, BONE, GOLD, PINK, HOT, INTER, MONO, SERIF, clamp, lerp, prog, ease, easeOutBack, rng } from './tvn.js'

const LIB = 'libra', SCO = 'scorpio'
const LB = { x: 250, y: 1180, s: 250 }, SC = { x: 830, y: 1180, s: 250 }, PI = { x: 540, y: 1250, s: 150 }
const PAPER = { x: 620, y: 890, w: 500, h: 320 }

const TT = {
  write: [0.9, 2.25], rows: [1.35, 1.65, 1.95], fold: [2.4, 2.8, 3.2, 3.6],
  toP: [3.8, 4.1], toS: [4.5, 4.8], unfold: [5.0, 5.4], check: 5.8, obv: 6.2, love: 6.42,
}
const CUT = BEAT(12)
const NT = {
  in: CUT + 0.05, wake: 7.85, rec1: [8.05, 8.75], rerec: 8.85, rec2: [9.05, 9.75], send: 9.9,
  scoWake: 10.05, play: [10.2, 10.9], replay: [10.9, 11.15], reply: 11.25, love: 11.45,
}
const SHEET = INK

function checkBox(x, W, X, Y, on, col = '#c8324a') {
  W.px(X, Y, 30, 30, '#2a2a6a'); W.px(X + 4, Y + 4, 22, 22, '#fbf6e8')
  if (on > 0) W.bits(['.......C', '......CC', 'C....CC.', 'CC..CC..', '.CCCC...', '..CC....'], { C: col }, X + 22, Y + 8, 7, { outline: null, sx: on, sy: on })
}

/** the paper note at fold stage f (0 flat … 3 triangle) */
function note(x, W, t, cx, cy, f, k = 1) {
  if (f >= 3) { triangle(x, W, cx, cy, 1.0 * k, 0); return }
  const sy = f < 1 ? lerp(1, 0.5, f) : 0.5
  const sx = f < 1 ? 1 : f < 2 ? lerp(1, 0.28, f - 1) : lerp(0.28, 0.15, f - 2)
  x.save(); x.translate(cx, cy); x.scale(sx * k, sy * k); x.rotate(f > 2 ? (f - 2) * 0.8 : 0)
  const w = PAPER.w, h = PAPER.h
  W.panel(-w / 2, -h / 2, w, h, '#fbf6e8', { P: 6 })
  for (let i = 0; i < 5; i++) W.px(-w / 2 + 16, -h / 2 + 70 + i * 50, w - 32, 2, 'rgba(120,150,220,0.45)')
  W.px(-w / 2 + 50, -h / 2 + 6, 3, h - 12, 'rgba(230,90,110,0.5)')
  if (f < 0.6) {
    const wr = prog(t, TT.write[0], TT.rows[0])
    x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w * (t > TT.unfold[0] ? 1 : wr), 90); x.clip()
    W.txt('do u like me?', -w / 2 + 70, -h / 2 + 48, { size: 50, color: '#2a2a6a', align: 'left', font: SERIF, weight: 600, italic: true, shadow: false })
    x.restore()
    const labels = ['yes', 'no', 'maybe']
    labels.forEach((l, i) => {
      if (t < TT.rows[i] && t < TT.unfold[0]) return
      const X = -w / 2 + 70 + i * 130, Y = -h / 2 + 112
      checkBox(x, W, X, Y, i === 0 ? W.pop01(t, TT.check, 0.25, 2.6) : 0)
      W.txt(l, X + 40, Y + 15, { size: 34, color: '#2a2a6a', align: 'left', font: SERIF, weight: 600, italic: true, shadow: false })
    })
    // Scorpio adds a fourth box
    const ok = W.pop01(t, TT.obv, 0.3, 2.6)
    if (ok > 0.01 && t < CUT) {
      x.save(); x.translate(-w / 2 + 70, -h / 2 + 200); x.scale(ok, ok)
      checkBox(x, W, 0, 0, 1)
      W.txt('obviously', 42, 16, { size: 38, color: '#c8324a', align: 'left', font: SERIF, weight: 700, italic: true, shadow: false })
      x.restore()
    }
  }
  // fold creases
  if (f > 0.4) { W.px(-w / 2, -2, w, 4, 'rgba(160,140,100,0.5)') }
  if (f > 1.4) for (let i = 1; i < 4; i++) W.px(-w / 2 + i * w / 4 - 2, -h / 2, 4, h, 'rgba(160,140,100,0.5)')
  x.restore()
}
function triangle(x, W, cx, cy, k, rot) {
  W.bits(['......P', '.....PP', '....PpP', '...PPpP', '..PppPP', '.PPPPpP', 'PPPPPPP'], { P: '#fbf6e8', p: '#d9d0b8' }, cx, cy, 9 * k, { rot })
}

const TVN = makeTVN({
  id: 'yr2006notes', year: '2006', date: '10·05·2006',
  heads: { then: 'Love notes | in *2006*', now: 'Love notes | in *2026*', last: 'Folded or | *spoken.*' },
  line: 'any format. *still brave.*',
  stickers: [
    { text: 'the checkbox era', at: 2.0, x: 270, y: 545, rot: -0.06, bg: '#fff1c8' },
    { text: 'folded 11×', at: 3.35, x: 250, y: 640, rot: 0.05 },
    { text: 'relay: 1 crying friend', at: 4.6, x: 290, y: 735, rot: -0.04, bg: '#d9f2ff' },
    { text: '7 AM. brave.', at: 8.1, x: 240, y: 545, rot: -0.06, bg: '#d9ffe6' },
    { text: 're-recorded 4×', at: 9.0, x: 260, y: 640, rot: 0.05 },
    { text: 'played 9×', at: 10.95, x: 230, y: 735, rot: -0.05, bg: '#ffe2e2', size: 44 },
  ],
  freeze: 6.0, crop: [100, 600, 880],

  thenWorld(x, t, W) {
    const live = W.live
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = live ? W.pop01(t, 0.35, 0.4, 2) : 1
    // the long school desk
    W.px(40, 1290, 1000, 34, INK); W.px(46, 1294, 988, 26, '#a86f3e'); W.px(46, 1294, 988, 6, '#c98f58')
    for (const X of [120, 960]) { W.px(X, 1320, 22, 120, INK); W.px(X + 4, 1320, 14, 116, '#7a4e2a') }
    // Libra (writer)
    let lm = 'squint', ll = [1, -0.6]
    if (t > TT.write[1] && t < TT.fold[0]) lm = 'sparkle'
    if (t > TT.fold[0] && t < TT.toP[0]) { lm = 'happy' }
    if (t > TT.toP[0] && t < TT.check) { lm = 'wide'; ll = [1, -0.3] }
    if (t > TT.check) { lm = 'wide'; ll = [1, -0.6] }
    if (t > TT.love) { lm = 'heart'; ll = undefined }
    W.star(LIB, LB.x, LB.y, LB.s, { pop: k, mood: lm, look: ll, bangs: true, seed: 3, hops: [0.75, ...TT.rows, TT.fold[3], TT.toP[0], TT.love, TT.love + 0.35], blink: lm === 'wide' ? false : undefined })
    // Pisces (middle seat, the relay)
    const holding = t > TT.toP[1] && t < TT.toS[0]
    W.pisces(PI.x, PI.y, PI.s, t > TT.toP[1] ? 3 : 0, t > TT.toP[1] ? 'happy' : 'neutral', { pop: k, look: [0, -1], hops: [TT.toP[1] + 0.05, TT.toS[0] - 0.05, TT.love + 0.1], seed: 6 })
    // Scorpio (across the row)
    let sm = 'neutral', sl = [-1, 0]
    if (t > TT.toS[1] && t < TT.check) { sm = 'wide'; sl = [-1, -0.6] }
    if (t > TT.check - 0.1) { sm = 'sparkle'; sl = [-1, -0.6] }
    if (t > TT.obv + 0.1) { sm = 'wink'; sl = undefined }
    W.star(SCO, SC.x, SC.y, SC.s, { pop: live ? W.pop01(t, 0.5, 0.4, 2) : 1, mood: sm, look: sl, bangs: '#3a1020', seed: 9, hops: [0.9, TT.toS[1] + 0.05, TT.check, TT.obv] })
    // the note: write → fold → fly → unfold
    if (!live && t > TT.unfold[1]) { note(x, W, t, PAPER.x, PAPER.y, 0); return }
    if (t < TT.fold[0]) { const pk = W.pop01(t, TT.write[0] - 0.25, 0.35, 2); if (pk > 0.01) note(x, W, t, PAPER.x, PAPER.y, 0, pk) }
    else if (t < TT.fold[3]) {
      const f = t < TT.fold[1] ? prog(t, TT.fold[0], TT.fold[1]) : t < TT.fold[2] ? 1 + prog(t, TT.fold[1], TT.fold[2]) : 2 + prog(t, TT.fold[2], TT.fold[3])
      note(x, W, t, lerp(PAPER.x, LB.x + 90, ease.inOutCubic(prog(t, TT.fold[2], TT.fold[3]))), lerp(PAPER.y, 1240, ease.inOutCubic(prog(t, TT.fold[2], TT.fold[3]))), f)
    } else if (t < TT.unfold[0]) {
      let px = LB.x + 90, py = 1240, rot = 0
      const arc = (a, b, [t0, t1]) => { const q = ease.inOutQuad(prog(t, t0, t1)); return [lerp(a[0], b[0], q), lerp(a[1], b[1], q) - 160 * Math.sin(Math.PI * q), q * 6.3] }
      if (t > TT.toP[0]) [px, py, rot] = arc([LB.x + 90, 1240], [PI.x, PI.y - 110], TT.toP)
      if (t > TT.toS[0]) [px, py, rot] = arc([PI.x, PI.y - 110], [SC.x - 90, 1240], TT.toS)
      if (holding) { px = PI.x + 4 * Math.sin(t * 30); py = PI.y - 110 }
      triangle(x, W, px, py, 1, rot)
      if (t > TT.toS[1]) W.sparkles(t, SC.x - 90, 1240, TT.toS[1], 6, 50, 1)
    } else {
      const u = ease.outCubic(prog(t, ...TT.unfold))
      note(x, W, t, lerp(SC.x - 90, PAPER.x, u), lerp(1240, PAPER.y, u), 3 * (1 - u))
      if (t > TT.love) W.sparkles(t, LB.x, LB.y - 40, TT.love, 10, 170, 1, [HOT, PINK, GOLD])
    }
    // Scorpio's pen ticking the box
    if (live && t > TT.check - 0.3 && t < TT.obv + 0.15) W.bits(['.TT.', 'TTTT', 'RRRR', 'RrRR', 'RrRR', 'RrRR', 'RRRR', 'cccc', '.cc.'], { T: '#1b1236', R: '#c8324a', r: '#ff6a7e', c: '#e8e6f0' }, PAPER.x - 70 + (t > TT.obv - 0.1 ? 40 : 0) + 6 * Math.sin(t * 25), PAPER.y - 10 + (t > TT.obv - 0.1 ? 90 : 0) - 40, 8, { rot: -0.5 })
  },

  nowWorld(x, t, W) {
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = W.pop01(t, NT.in, 0.36, 2)
    // Libra
    let lm = 'sleepy', ll = [1, -0.6]
    if (t > NT.wake) { lm = 'wide' }
    if (t > NT.rec1[0] && t < NT.rec1[1]) lm = 'squint'
    if (t > NT.rerec - 0.1 && t < NT.rec2[0]) lm = 'eyeroll'
    if (t > NT.rec2[0] && t < NT.rec2[1]) lm = 'squint'
    if (t > NT.send) { lm = 'wide'; ll = [1, 0] }
    if (t > NT.love) { lm = 'heart'; ll = undefined }
    W.star(LIB, LB.x, LB.y, LB.s, { pop: k, mood: lm, look: ll, seed: 3, zzz: true, hops: [NT.wake, NT.rec1[0], NT.rerec, NT.rec2[0], NT.send, NT.love, NT.love + 0.35, 12.6], blink: lm === 'wide' ? false : undefined })
    // Scorpio: asleep, then plays it
    let sm = 'sleepy', sl
    if (t > NT.scoWake) { sm = 'wide'; sl = [-1, -0.6] }
    if (t > NT.play[0] + 0.3) sm = 'sparkle'
    if (t > NT.replay[0]) sm = 'heart'
    if (t > NT.reply - 0.1 && t < NT.reply + 0.5) sm = 'wink'
    if (t > NT.reply + 0.5) sm = 'heart'
    W.star(SCO, SC.x, SC.y, SC.s, { pop: W.pop01(t, NT.in + 0.1, 0.36, 2), mood: sm, look: sl, seed: 9, zzz: true, hops: [NT.scoWake, NT.play[0] + 0.3, NT.replay[0], NT.reply, 12.9] })
    if (t > NT.love) W.sparkles(t, LB.x, LB.y - 40, NT.love, 10, 170, 2, [HOT, PINK, GOLD])
    // the clock overlay
    const ck = W.pop01(t, 7.6, 0.3, 2.4) * W.outK(t, [TVN_T().pay - 0.25, TVN_T().pay - 0.05])
    if (ck > 0.01) {
      x.save(); x.translate(700, 680); x.scale(ck, ck)
      W.panel(-120, -34, 240, 68, 'rgba(16,10,36,0.92)', { rim: BONE, P: 5 })
      x.fillStyle = '#ff5a5a'; if ((t * 1.6) % 1 < 0.6) x.fillRect(-98, -8, 16, 16)
      W.txt(t < 10.0 ? '7:00 AM' : '7:01 AM', 14, 2, { size: 36, color: BONE, shadow: false, spacing: 2 })
      x.restore()
    }
    // Libra's voice note
    const card = W.pop01(t, NT.rec1[0] - 0.2, 0.3, 2)
    if (card > 0.01) {
      const recording = (t > NT.rec1[0] && t < NT.rec1[1]) || (t > NT.rec2[0] && t < NT.rec2[1])
      const sent = t > NT.send
      const slide = ease.inOutCubic(prog(t, NT.send, NT.send + 0.3))
      let fill = 0
      if (t > NT.rec1[0] && t < NT.rerec) fill = clamp((t - NT.rec1[0]) / (NT.rec1[1] - NT.rec1[0]))
      if (t > NT.rerec && t < NT.rec2[0]) fill = 1 - clamp((t - NT.rerec) / 0.15)
      if (t > NT.rec2[0]) fill = clamp((t - NT.rec2[0]) / (NT.rec2[1] - NT.rec2[0]))
      let head = -1
      if (t > NT.play[0] && t < NT.replay[1]) head = t < NT.play[1] ? prog(t, ...NT.play) : (prog(t, ...NT.replay) * 3) % 1
      voiceNote(x, W, t, lerp(560, 600, slide), 870, 460, card, { col: sent ? PINK : '#2c2452', fill, recording, head, dur: sent ? '0:04' : recording ? `0:0${Math.floor(fill * 4)}` : '0:04', fg: sent ? INK : BONE })
      // what it says, while it plays
      if (t > NT.play[0] + 0.1 && t < NT.replay[1] + 0.05) {
        const q = W.pop01(t, NT.play[0] + 0.1, 0.25, 2.4)
        x.save(); x.translate(600, 750); x.scale(q, q)
        W.panel(-220, -40, 440, 80, '#fffaf0', { P: 5 })
        W.txt('“good morning! I like u.', 0, -12, { size: 24, color: INK, shadow: false })
        W.txt('ok bye!”', 0, 18, { size: 24, color: INK, shadow: false })
        x.restore()
      }
    }
    // Scorpio's reply voice note: "yes. obviously."
    if (t > NT.reply) {
      const q = easeOutBack(prog(t, NT.reply, NT.reply + 0.3), 2.2)
      voiceNote(x, W, t, 520, 1030, 330, q, { col: '#3a1a30', fill: 1, head: clamp((t - NT.reply - 0.2) / 1.2), dur: '0:02', fg: BONE, small: true })
      const b = W.pop01(t, NT.reply + 0.2, 0.25, 2.4)
      if (b > 0.01) { x.save(); x.translate(520, 950); x.scale(b, b); W.panel(-150, -30, 300, 60, '#fffaf0', { P: 5 }); W.txt('“yes. obviously.”', 0, 2, { size: 26, color: '#c8324a', shadow: false }); x.restore() }
    }
    // Pisces, bottom-left, sobbing into a tissue
    if (t > NT.love - 0.15) {
      const P = W.pisces(178, 1395, 130, 3, 'happy', { pop: W.pop01(t, NT.love - 0.15, 0.3, 2), hops: [NT.love + 0.2], look: [1, -1] })
      W.inSprite(P, () => { x.fillStyle = INK; x.fillRect(27, 22, 9, 9); x.fillStyle = '#ffffff'; x.fillRect(28, 23, 7, 7) })
    }
  },

  cues(T) {
    return [
      // THEN: pencil scratches, the box ticks, the folds, the flicks, Pisces sob, unfold, the check, "obviously"
      ...Array.from({ length: 18 }, (_, i) => ['tick', r3(TT.write[0] + i * 0.075), 0.012]),
      ...TT.rows.map((r, i) => ['pop', r, [987.77, 1174.66, 1318.51][i], 0.03, -0.2]),
      ...TT.fold.slice(1).map((f, i) => ['tick', r3(f - 0.05), 0.05 + i * 0.01]), ['whoosh', TT.fold[0], 0.2, 0.025],
      ['whoosh', TT.toP[0], 0.25, 0.035], ['pop', TT.toP[1], 1174.66, 0.04, 0], ['pluck', r3(TT.toP[1] + 0.1), 659.25, 0.03, 0.6, 0],
      ['whoosh', TT.toS[0], 0.25, 0.035], ['pop', TT.toS[1], 1318.51, 0.04, 0.4],
      ['whoosh', TT.unfold[0], 0.3, 0.03], ['tick', TT.check, 0.06], ['pop', TT.check, 1567.98, 0.04, 0.2],
      ['pop', TT.obv, 1760, 0.05, 0.2], ['bell', TT.love, 2349.32, 0.03, 1.0, -0.3], ['glitter', TT.love, r3(TT.love + 0.4)],
      // NOW: a little alarm chirp, record blips, the re-record scrub, send, notification, playback, reply
      ['pluck', 7.6, 2093, 0.03, 0.15, 0.3], ['pluck', 7.75, 2093, 0.03, 0.15, 0.3],
      ['pop', NT.rec1[0], 880, 0.035, -0.2], ['tapeStop', NT.rerec, 0.2], ['pop', NT.rec2[0], 880, 0.035, -0.2],
      ['whoosh', NT.send, 0.3, 0.04], ['pop', r3(NT.send + 0.05), 1174.66, 0.04, 0.3],
      ['bell', NT.scoWake, 2637.02, 0.025, 0.8, 0.4], ['pop', NT.play[0], 987.77, 0.03, 0.3],
      ...Array.from({ length: 8 }, (_, i) => ['pop', r3(NT.play[0] + 0.15 + i * 0.08), [659.25, 739.99, 880, 739.99, 987.77, 880, 1174.66, 987.77][i], 0.016, -0.2]),
      ['tapeStop', r3(NT.replay[0] - 0.05), 0.15], ['pop', NT.replay[0], 1318.51, 0.03, 0.3],
      ['pop', NT.reply, 1567.98, 0.045, 0.3], ['bell', r3(NT.reply + 0.05), 2349.32, 0.03, 1.0, 0.3], ['glitter', NT.love, r3(NT.love + 0.4)],
    ]
  },
})
function TVN_T() { return TVN.T }

function voiceNote(x, W, t, cx, cy, w, k, { col, fill = 1, recording = false, head = -1, dur = '0:04', fg = BONE, small = false }) {
  const h = small ? 84 : 110
  x.save(); x.translate(cx, cy); x.scale(k, k)
  W.panel(-w / 2, -h / 2, w, h, col, { P: 6 })
  // play / record button
  const bx = -w / 2 + h / 2 + 4
  W.px(bx - 30, -30, 60, 60, INK)
  W.px(bx - 26, -26, 52, 52, recording ? '#ff5a5a' : GOLD)
  if (recording) { if ((t * 3) % 1 < 0.6) W.px(bx - 10, -10, 20, 20, '#ffffff') }
  else W.bits(['P...', 'PP..', 'PPP.', 'PPPP', 'PPP.', 'PP..', 'P...'], { P: INK }, bx + 3, 0, 5, { outline: null })
  // waveform
  const R = rng(small ? 9 : 4), n = small ? 14 : 22, x0 = bx + 46, span = w / 2 - 70 - x0
  for (let i = 0; i < n; i++) {
    const hh = 10 + R() * (h * 0.5), on = i / n <= fill
    if (!on) continue
    const live = recording && i / n > fill - 0.12 ? 0.6 + 0.4 * Math.sin(t * 30 + i) : 1
    const played = head >= 0 && i / n <= head
    W.px(x0 + i * span / n, -hh * live / 2, span / n - 4, hh * live, played ? (small ? '#ff8fb1' : '#ffffff') : fg)
  }
  if (head >= 0) W.px(x0 + head * span - 2, -h / 2 + 10, 4, h - 20, small ? GOLD : INK)
  W.txt(dur, w / 2 - 38, 2, { size: small ? 20 : 24, color: fg, shadow: false })
  x.restore()
}

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TVN
