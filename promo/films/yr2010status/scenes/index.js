// yr2010status (20 s vertical, Star Talk Then vs Now · 24) "Official, offline." · chiptune C.
// The format's shared look lives in ./tvn.js (identical in all five Block E films). Story 0–15.6, then the end card.
//   THEN 2010  "Going official | in *2010*"  ♌ Leo (side-swept bangs) at a giant generic "status update" box,
//              ♐ Sagittarius beside. Rule of three: (1) types "IT'S OFFICIAL!!!!" (sticker "caps lock: on");
//              (2) POST: confetti everywhere (sticker "posted to: everyone"); (3) the comments pile in: "omg!!!",
//              "FINALLY", "who is this??"… and "mom: who is this" (sticker "mom commented."). Sagittarius hides
//              behind a paw of confetti, blushing; ♓ Pisces comments "crying!!!" and is.
//   card cut   7.267, on the switch.
//   NOW 2026   "Going official | in *2026*"  A little café table: Leo and Sagittarius across from their two best
//              friends (♊ Gemini, ♓ Pisces). Leo, quietly: "so… we're official." (sticker "announcement volume: low").
//              Gemini: "no post? no confetti?" Leo: "just u guys." (sticker "audience: 2"). Pisces bursts into tears
//              and throws tissues like confetti (sticker "confetti: tissues"). The phone stays face-down. Quiet joy.
//   PAYOFF     the 2010 polaroid top-left, NOW big. THE STARS: "big love can be *quiet.*"
//              Last: "Official, *offline.*"
import { makeTVN, BEAT, r3, INK, BONE, GOLD, PINK, HOT, INTER, MONO, SERIF, clamp, lerp, prog, ease, easeOutBack, rng } from './tvn.js'

const LEO = 'leo', SAG = 'sagittarius', GEM = 'gemini'
const BOX = { x: 600, y: 790, w: 640, h: 290 }
const TT = { type: [0.9, 2.2], post: 2.45, comments: [3.45, 3.75, 4.05, 4.35, 4.75, 5.15], sagHide: 5.5 }
const TYPED = "IT'S OFFICIAL!!!!"
const COMMENTS = [
  { who: '', text: 'omg!!!', x: 190, y: 985, rot: -0.06 },
  { who: '', text: 'FINALLY', x: 920, y: 980, rot: 0.06 },
  { who: '', text: 'who is this??', x: 560, y: 1075, rot: 0.04 },
  { who: '', text: 'congrats u two', x: 560, y: 985, rot: -0.03 },
  { who: 'mom:', text: 'who is this', x: 560, y: 1160, rot: 0.02, col: '#ffe2e2' },
  { who: '', text: 'crying!!!', x: 730, y: 1250, rot: -0.03, col: '#d9f2ff' },
]
const CUT = BEAT(12)
const NT = { in: CUT + 0.05, b1: 7.95, b2: 8.9, b3: 9.6, sob: 9.95, toss: 10.1, hands: 10.7 }

// NOW seats
const N = { leo: { x: 200, y: 1170, s: 220 }, sag: { x: 400, y: 1185, s: 200 }, gem: { x: 690, y: 1185, s: 200 }, pis: { x: 890, y: 1170, s: 210 } }

function confetti(x, W, t, t0, cx, cy, n, seed, spread = 1) {
  const dt = t - t0
  if (dt < 0 || dt > 4) return
  const R = rng(seed)
  for (let i = 0; i < n; i++) {
    const a = R() * Math.PI * 2, v = (300 + R() * 700) * spread, c = ['#ff4f86', '#f2c75c', '#7fe0ff', '#9fe6b0', '#c39bff', '#ffffff'][i % 6]
    const X = cx + Math.cos(a) * v * dt * 0.8, Y = cy + Math.sin(a) * v * dt * 0.6 - 300 * dt + 420 * dt * dt
    const flip = Math.abs(Math.sin(t * 9 + i))
    W.px(X, Y, 14, 14 * flip + 3, c)
  }
}
function speech(x, W, t, cx, cy, t0, text, { t1 = 99, size = 28, col = '#fffaf0', fg = INK, tail = 0 } = {}) {
  const k = W.pop01(t, t0, 0.25, 2.4) * W.outK(t, [t1 - 0.15, t1])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + 40, h = size + 30
  W.panel(-w / 2, -h / 2, w, h, col, { P: 5 })
  W.px(tail - 10, h / 2 + 2, 20, 12, INK); W.px(tail - 6, h / 2, 12, 9, col)
  W.txt(text, 0, 2, { size, color: fg, shadow: false })
  x.restore()
}

const TVN = makeTVN({
  id: 'yr2010status', year: '2010', date: '02·14·2010',
  heads: { then: 'Going official | in *2010*', now: 'Going official | in *2026*', last: 'Official, | *offline.*' },
  line: 'big love can be *quiet.*',
  stickers: [
    { text: 'caps lock: on', at: 1.9, x: 250, y: 520, rot: -0.06, bg: '#fff1c8' },
    { text: 'posted to: everyone', at: 2.95, x: 290, y: 600, rot: 0.05, bg: '#ffe2e2' },
    { text: 'mom commented.', at: 5.0, x: 330, y: 1488, rot: -0.04, size: 44 },
    { text: 'announcement volume: low', at: 8.35, x: 330, y: 548, rot: -0.05, bg: '#d9ffe6' },
    { text: 'audience: 2', at: 9.3, x: 240, y: 645, rot: 0.05 },
    { text: 'confetti: tissues', at: 10.25, x: 290, y: 740, rot: -0.05, bg: '#d9f2ff' },
  ],
  freeze: 3.1, crop: [100, 560, 880],

  thenWorld(x, t, W) {
    const live = W.live
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = live ? W.pop01(t, 0.35, 0.4, 2) : 1
    // Leo, typing, then posing
    let lm = 'squint', ll = [1, -1]
    if (t > TT.type[1]) { lm = 'sparkle'; ll = [1, -1] }
    if (t > TT.post) { lm = 'happy'; ll = undefined }
    if (t > TT.comments[4] && t < TT.comments[4] + 0.6) { lm = 'wide'; ll = [1, -1] }
    if (t > TT.comments[4] + 0.6) lm = 'sparkle'
    W.star(LEO, 230, 1240, 220, { pop: k, mood: lm, look: ll, bangs: true, seed: 2, hops: [0.75, 1.2, 1.6, 2.0, TT.post, TT.post + 0.3, TT.post + 0.6, TT.comments[4] + 0.05, 6.3] })
    // Sagittarius, blushing, then hiding behind a fan of confetti
    const hide = ease.inOutCubic(prog(t, TT.sagHide, TT.sagHide + 0.3))
    W.star(SAG, 860, 1250, 200, { pop: live ? W.pop01(t, 0.5, 0.4, 2) : 1, mood: t > TT.post ? (t > TT.comments[2] ? 'wide' : 'happy') : 'neutral', look: t > TT.comments[2] ? [-1, -1] : undefined, seed: 7, blush: t > TT.post ? 1 : undefined, hops: [0.9, TT.post + 0.1, TT.comments[2]] })
    if (hide > 0.01) W.bits(['..PPPPP..', '.PPYPPPP.', 'PPPPPBPPP', 'PYPPPPPYP', 'PPPBPPPPP', '.PPPPYPP.', '..PPPPP..', '....G....', '....G....'], { P: '#ff8fb1', Y: '#f2c75c', B: '#7fe0ff', G: '#9a7a4a' }, 860, lerp(1380, 1235, hide), 13, { rot: 0.1 * Math.sin(t * 4) })
    // the status-update box
    const bk = live ? W.pop01(t, 0.55, 0.4, 2) : 1
    x.save(); x.translate(BOX.x, BOX.y); x.scale(bk, bk)
    const { w, h } = BOX
    W.panel(-w / 2, -h / 2, w, h, '#f4f2fa', { P: 8 })
    W.px(-w / 2 + 8, -h / 2, w - 16, 62, '#5b6fd6'); W.px(-w / 2, -h / 2 + 8, w, 54, '#5b6fd6')
    W.txt('status update', -w / 2 + 30, -h / 2 + 32, { size: 30, color: '#ffffff', align: 'left', shadow: false, font: INTER, weight: 800 })
    const typed = TYPED.slice(0, Math.round(TYPED.length * prog(t, ...TT.type)))
    W.txt(typed, -w / 2 + 34, -18, { size: 50, color: INK, align: 'left', shadow: false, font: INTER, weight: 800 })
    if (t < TT.type[1] && Math.floor(t * 3) % 2) { x.font = `800 50px ${INTER}`; W.px(-w / 2 + 38 + x.measureText(typed).width, -46, 5, 56, INK) }
    if (t > TT.type[1] - 0.1) W.bits(['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: HOT }, -w / 2 + 70, 46, 7)
    // POST button → POSTED
    const dn = t > TT.post && t < TT.post + 0.15, posted = t > TT.post
    W.panel(w / 2 - 200, h / 2 - 76, 170, 56, dn ? '#fff6c8' : posted ? '#9fe6b0' : '#5b6fd6', { P: 5 })
    W.txt(posted ? 'POSTED!' : 'POST', w / 2 - 115, h / 2 - 47, { size: 26, color: posted ? INK : '#ffffff', shadow: false, font: INTER, weight: 800 })
    if (posted) for (let i = 0; i < 5; i++) if (t > TT.comments[i]) W.bits(['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: [HOT, GOLD, '#7fe0ff', HOT, '#9fe6b0'][i] }, -w / 2 + 160 + i * 44, 46, 5)
    x.restore()
    // the confetti burst
    confetti(x, W, t, TT.post, BOX.x, BOX.y, 70, 11)
    confetti(x, W, t, TT.post + 0.25, BOX.x - 200, BOX.y - 60, 30, 12, 0.7)
    confetti(x, W, t, TT.post + 0.25, BOX.x + 200, BOX.y - 60, 30, 13, 0.7)
    // Pisces, front middle, crying (and commenting about it)
    if (t > TT.comments[5] - 0.6) W.pisces(560, 1300, 130, 3, 'happy', { pop: live ? W.pop01(t, TT.comments[5] - 0.6, 0.3, 2) : 1, hops: [TT.comments[5], TT.comments[5] + 0.4], look: [0, -1] })
    // the comments pile in
    if (live) COMMENTS.forEach((c, i) => {
      const at = TT.comments[i], kk = W.pop01(t, at, 0.28, 2.6)
      if (kk <= 0.01) return
      x.save(); x.translate(c.x, c.y); x.rotate(c.rot); x.scale(kk, kk)
      x.font = `700 30px ${MONO}`
      const s = c.who ? `${c.who} ${c.text}` : c.text, ww = x.measureText(s).width + 40
      W.panel(-ww / 2, -28, ww, 56, c.col || '#fffaf0', { P: 5 })
      if (c.who) { W.txt(c.who, -ww / 2 + 20, 2, { size: 30, color: HOT, align: 'left', shadow: false }); x.font = `700 30px ${MONO}`; W.txt(c.text, -ww / 2 + 20 + x.measureText(c.who + ' ').width, 2, { size: 30, color: INK, align: 'left', shadow: false }) }
      else W.txt(s, 0, 2, { size: 30, color: INK, shadow: false })
      x.restore()
    })
  },

  nowWorld(x, t, W) {
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = W.pop01(t, NT.in, 0.36, 2)
    // the café table: two mugs, a phone face-down
    W.px(60, 1290, 960, 30, INK); W.px(66, 1294, 948, 22, '#8a5a3a'); W.px(66, 1294, 948, 5, '#b07a52')
    for (const X of [530, 990]) { W.px(X - 11, 1316, 22, 110, INK); W.px(X - 7, 1316, 14, 106, '#6a4228') }
    const mug = X => W.bits(['.WWWW..', 'WccccWW', 'WccccW.W', 'WccccWW', 'WccccW.', '.WWWW..'], { W: '#f4f1fa', c: '#7a4a2a' }, X, 1262, 7)
    mug(300); mug(790)
    W.px(500, 1278, 90, 14, INK); W.px(504, 1280, 82, 8, '#3a3166')
    // the couple (left) and the best friends (right)
    const quiet = t > NT.b1 && t < NT.b1 + 0.8
    W.star(LEO, N.leo.x, N.leo.y, N.leo.s, { pop: k, mood: quiet ? 'wink' : t > NT.hands ? 'happy' : 'sparkle', look: [1, 0], seed: 2, blush: 1, hops: [NT.in + 0.3, NT.b1, NT.b3, NT.hands] })
    W.star(SAG, N.sag.x, N.sag.y, N.sag.s, { pop: W.pop01(t, NT.in + 0.08, 0.36, 2), mood: t > NT.hands ? 'happy' : 'sparkle', look: [1, 0], seed: 7, blush: 1, hops: [NT.in + 0.4, NT.b3 + 0.1, NT.hands + 0.05] })
    if (t > NT.hands) {
      const hk = W.pop01(t, NT.hands, 0.3, 2.6)
      W.bits(['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: HOT }, (N.leo.x + N.sag.x) / 2, 1040 - 10 * Math.sin(t * 3), 8 * hk)
    }
    let gm = 'happy', gl = [-1, 0]
    if (t > NT.b1 + 0.6 && t < NT.b2) { gm = 'wide' }
    if (t > NT.b2 && t < NT.b3 + 0.3) { gm = 'squint' }
    if (t > NT.b3 + 0.3) { gm = 'heart'; gl = undefined }
    W.star(GEM, N.gem.x, N.gem.y, N.gem.s, { pop: W.pop01(t, NT.in + 0.14, 0.36, 2), mood: gm, look: gl, seed: 4, hops: [NT.in + 0.5, NT.b1 + 0.6, NT.b2, NT.b3 + 0.35] })
    let pt = 0, pm = 'happy'
    if (t > NT.b1 + 0.6) { pt = 1; pm = 'wide' }
    if (t > NT.sob) { pt = 3; pm = 'happy' }
    W.pisces(N.pis.x, N.pis.y, N.pis.s, pt, pm, { pop: W.pop01(t, NT.in + 0.2, 0.36, 2), look: [-1, 0], hops: [NT.in + 0.6, NT.sob, NT.toss, NT.toss + 0.3, NT.toss + 0.6] })
    // tissue "confetti"
    const dt = t - NT.toss
    if (dt > 0) {
      const R = rng(21)
      for (let i = 0; i < 16; i++) {
        const a = -Math.PI / 2 + (R() - 0.5) * 2.4, v = 380 + R() * 380, d = dt - i * 0.05
        if (d <= 0) continue
        const X = N.pis.x - 40 + Math.cos(a) * v * d * 0.9 - 120 * d, Y = N.pis.y - 80 + Math.sin(a) * v * d + 300 * d * d
        if (Y > 1290) continue
        W.bits(['TTT', 'TtT', 'TTT'], { T: '#ffffff', t: '#e3def0' }, X, Y + 6 * Math.sin(t * 6 + i), 6, { rot: Math.sin(t * 5 + i) })
      }
    }
    // the quiet conversation
    speech(x, W, t, 320, 930, NT.b1, "so... we're official.", { t1: NT.b2 - 0.1, size: 30, tail: -80 })
    speech(x, W, t, 700, 930, NT.b2, 'no post? no confetti?', { t1: NT.b3 + 0.9, size: 30, tail: 0 })
    speech(x, W, t, 300, 1010 - 90, NT.b3, 'just u guys.', { t1: NT.hands + 1.2, size: 30, tail: -60, col: '#ffe2ec' })
  },

  cues(T) {
    return [
      // THEN: loud keyboard clacks, the POST, the confetti cannon, comment pops (mom's is a record scratch-ish drop)
      ...Array.from({ length: TYPED.length }, (_, i) => ['tick', r3(TT.type[0] + i * (TT.type[1] - TT.type[0]) / TYPED.length), 0.03]),
      ['pop', TT.post, 1174.66, 0.05, 0], ['boom', r3(TT.post + 0.02), 0.22], ['glitter', TT.post, r3(TT.post + 0.8)],
      ['bell', r3(TT.post + 0.05), 2349.32, 0.03, 1.2, 0], ['whoosh', r3(TT.post + 0.25), 0.4, 0.04],
      ...TT.comments.map((c, i) => ['pop', c, [987.77, 1174.66, 1318.51, 1567.98, 659.25, 1760][i], 0.04, i % 2 ? 0.4 : -0.4]),
      ['pluck', r3(TT.comments[4] + 0.05), 440, 0.04, 0.4, 0], ['whoosh', TT.sagHide, 0.25, 0.03],
      // NOW: a soft whisper blip, the bubbles, the sob, the tissue toss, a little heart
      ['pop', NT.b1, 659.25, 0.02, -0.3], ['pop', NT.b2, 987.77, 0.035, 0.3], ['pop', NT.b3, 739.99, 0.025, -0.3],
      ['pluck', NT.sob, 659.25, 0.04, 0.6, 0.5], ['pluck', r3(NT.sob + 0.15), 587.33, 0.04, 0.8, 0.5],
      ['whoosh', NT.toss, 0.35, 0.035], ['glitter', NT.toss, r3(NT.toss + 0.6)],
      ['pluck', NT.hands, 1174.66, 0.035, 0.6, -0.3], ['bell', r3(NT.hands + 0.08), 2349.32, 0.025, 1.0, -0.3],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TVN
