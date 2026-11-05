// kmte16: MIRROR TALK No. 16 (long), "The night before the first date since the breakup." (75 s vertical, star_advice
// post, cinematic · Dm). Hard cut. Row: promo/films/month2/m21.md. No end card, no card cut. Chapter stickers (hookkit).
//   0.00   frame 0: Cancer mid-throw of outfits, shirts flying, one landing on the mirror. Hook "Date tomorrow. First since |
//          *the breakup.*"  2.7: the promise: "Wait for what the mirror says *last.*"
//   5.0    1 · THE PANIC   "what if they ask about my *ex*?" · "what if I cry? I *always* cry." · the pile grows · PISCES:
//          "…same." · REFLECTION: "breathe. one *thing* at a time."
//   17.0   2 · THE OUTFIT  "which one feels like *you*?" · the parade: TRYING TOO HARD ✗ · VERY SERIOUS ✗ · COMFY SWEATER ♡ ·
//          Cancer puts it on: "the comfy one. it's *so* me." · "then that's the *one*."
//   30.0   3 · THE WHAT-IFS  loading bar "loading what-ifs…" → error · five what-if bubbles · the reflection pops them one by one ·
//          "a what-if isn't a *plan*. it's just *noise*."
//   44.0   4 · THE OLD PHOTO  "we used to get ready *together*." · "you're allowed to miss that. *and* go." · Cancer turns the
//          photo face down, gently · PISCES: "that was so *grown up*" · "this one's *yours*. a new story."
//   58.0   5 · THE PROMISE  "what if it goes *badly*?" · "then come home and tell me. *just you*." · "and if it goes *well*… same."
//          · alarm set 8:00 AM · "goodnight. you've *got* this."
//   73.0   last line "Go as *yourself.* | That's the plan."  Hard cut at 75.
import { makeMirror, drawPhoto, drawClock, bubble, hearts, sparkles, confetti, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const CH = [5.0, 17.0, 30.0, 44.0, 58.0]
const T = {
  promise: 2.7,
  a1: 5.4, a2: 8.0, pile: 9.6, p1: 10.8, m1: 12.4,
  m2: 17.4, parade: [19.0, 20.6, 22.2], pick: 23.6, wear: 24.2, a3: 25.2, m3: 27.6,
  bar: 30.4, a4: 34.6, wi: [36.0, 36.5, 37.0, 37.5, 38.0], popAt: [39.2, 39.5, 39.8, 40.1, 40.4], m4: 40.9,
  photo: 44.3, a5: 45.4, m5: 47.9, flip: [50.6, 51.2], p2: 52.4, m6: 54.6,
  a6: 58.4, m7: 61.0, m8: 64.0, alarm: 66.6, m9: 69.0, dim: [68.6, 72.0], last: 73.0,
}
const SHIRT = ['.CC..CC.', 'CCCCCCCC', 'CCCCCCCC', '.CCCCCC.', '.CCCCCC.', '.CCCCCC.']
const SCOL = ['#ff8fb1', '#7fd0ff', '#ffe27a', '#9fe6b0', '#c9a6ff', '#ffb36b']
const PARADE = [{ label: 'TRYING TOO HARD', col: '#ffd23a', ok: false }, { label: 'VERY SERIOUS', col: '#4a4060', ok: false }, { label: 'COMFY SWEATER', col: '#ff9fc0', ok: true }]
const WHATIF = ['what if I trip?', 'what if I talk too much?', 'what if they’re late?', 'what if it’s awkward?', 'what if I like them?']

const F = makeMirror({
  id: 'kmte16', sign: 'cancer', dur: 75,
  hook: { text: 'Date tomorrow. First since | *the breakup.*', accentColor: '#c9a6ff', size: 88, out: [2.45, 2.65] },
  chapters: [
    { at: CH[0], text: 'THE PANIC' }, { at: CH[1], text: 'THE OUTFIT' }, { at: CH[2], text: 'THE WHAT-IFS' }, { at: CH[3], text: 'THE OLD PHOTO' }, { at: CH[4], text: 'THE PROMISE', out: [72.6, 72.9] },
  ],
  bulbs: t => lerp(1, 0.35, ease.inOutCubic(prog(t, ...T.dim))),
  fx: [
    { k: 'screenShake', at: 0.0, amp: 16, len: 0.6 },
    { k: 'whipZoom', at: CH[0] - 0.06, from: 1.3 }, { k: 'screenShake', at: T.pile, amp: 14, len: 0.4 }, { k: 'whipZoom', at: T.m1 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[1] - 0.06, from: 1.3 }, { k: 'screenShake', at: T.pick, amp: 12, len: 0.35 },
    { k: 'whipZoom', at: CH[2] - 0.06, from: 1.3 }, { k: 'loadingBar', at: T.bar, len: 3.4, label: 'loading what-ifs…', stallAt: 99, error: 'Error: too many what-ifs', y: 900 },
    { k: 'whipZoom', at: T.m4 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[3] - 0.06, from: 1.3 }, { k: 'screenShake', at: T.flip[1], amp: 8, len: 0.3 }, { k: 'whipZoom', at: T.m6 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[4] - 0.06, from: 1.3 }, { k: 'notification', at: 62.6, out: [65.6, 65.9], title: 'texts', body: 'see you tomorrow at 7! *can’t wait*', glyph: '★', y: 240 },
    { k: 'screenShake', at: T.m9, amp: 6, len: 0.3 }, { k: 'screenShake', at: T.alarm, amp: 8, len: 0.3 },
  ],
  caps: [
    { at: T.promise, out: [4.7, 4.95], text: 'Wait for what the | mirror says *last.*', accent: '#ffd36b', size: 86, accentSize: 112 },
    { at: CH[0] + 0.3, out: [16.7, 16.95], text: 'Outfit crisis: *level 9.*', accent: '#ff8fa0', top: 240, size: 76, accentSize: 100 },
    { at: CH[1] + 0.3, out: [29.7, 29.95], text: 'Pick the one that’s *you.*', accent: '#ff9fc0', top: 240, size: 76, accentSize: 100 },
    { at: CH[2] + 0.3, out: [43.7, 43.95], text: 'What-ifs are *noise.*', accent: '#8fe9ff', top: 240, size: 76, accentSize: 100 },
    { at: CH[3] + 0.3, out: [57.7, 57.95], text: 'Miss it. *And* go.', accent: '#c9a6ff', top: 240, size: 76, accentSize: 100 },
    { at: CH[4] + 0.3, out: [62.2, 62.45], text: 'Tell me *everything.*', accent: '#7dffb0', top: 240, size: 76, accentSize: 100 },
    { at: T.last, out: [99, 100], text: 'Go as *yourself.* | That’s the plan.', accent: '#ffd36b', gap: 0.1, size: 92, accentSize: 120 },
  ],
  lines: [
    { t: T.a1, who: 'S', text: 'what if they ask about my *ex*?' },
    { t: T.a2, who: 'S', text: 'what if I cry? I *always* cry.' },
    { t: T.p1, who: 'P', text: '…*same*.' },
    { t: T.m1, who: 'M', text: "breathe. we'll go one *thing* at a time." },
    { t: T.m2, who: 'M', text: 'which one feels like *you*?' },
    { t: T.a3, who: 'S', text: "the comfy one. it's *so* me." },
    { t: T.m3, who: 'M', text: "then that's the *one*." },
    { t: T.a4, who: 'S', text: "what if they're bored? what if I'm *weird*?" },
    { t: T.m4, who: 'M', text: "a what-if isn't a *plan*. it's just *noise*." },
    { t: T.a5, who: 'S', text: 'we used to get ready *together*.' },
    { t: T.m5, who: 'M', text: "you're allowed to miss that. *and* go." },
    { t: T.p2, who: 'P', text: 'that was so *grown up*' },
    { t: T.m6, who: 'M', text: "this one's *yours*. a new story." },
    { t: T.a6, who: 'S', text: 'what if it goes *badly*?' },
    { t: T.m7, who: 'M', text: 'then come home and tell me. *just you*.' },
    { t: T.m8, who: 'M', text: 'and if it goes *well*… same.' },
    { t: T.m9, who: 'M', text: "goodnight. you've *got* this." },
  ],
  boxes: [[5.2, 16.7], [17.2, 29.7], [34.4, 43.7], [45.2, 57.7], [58.2, 72.6]],
  pose(t) {
    const b = ease.outCubic(prog(t, 0.6, 1.2))
    const p = { x: lerp(420, 300, b), y: lerp(1120, 1225, b), s: lerp(310, 280, b), mood: 'wide', look: [1, -0.6], blink: t < 1 ? false : undefined, rot: t < 1 ? 0.25 * Math.sin(t * 9) : 0 }
    if (t > T.a1) p.mood = 'wide'
    if (t > T.m1) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > T.m2) { p.mood = 'sparkle'; p.look = [1, -0.6] }
    if (t > T.pick) { p.mood = 'happy'; p.look = undefined }
    if (t > CH[2]) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.m4) { p.mood = 'neutral'; p.look = [1, -0.6] }
    if (t > T.photo) { p.mood = 'sparkle'; p.look = [1, 0.2] }
    if (t > T.flip[1]) { p.mood = 'happy'; p.look = undefined }
    if (t > T.a6) { p.mood = 'wide'; p.look = [1, -0.8] }
    if (t > T.m7) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.m8 + 1) { p.mood = 'happy'; p.look = undefined }
    if (t > T.m9 + 1.5) p.mood = 'sleepy'
    p.draw = (x, tt, Fr) => {
      // the comfy sweater, once it's on: a pink knit band with a heart
      if (tt > T.wear) {
        const k = pop01(tt, T.wear, 0.3, 2)
        x.save(); x.translate(Fr.ox, Fr.cy + Fr.S * 0.31); x.scale(k, k)
        R(x, INK, -Fr.S * 0.3, -18, Fr.S * 0.6, 40); R(x, '#ff9fc0', -Fr.S * 0.28, -13, Fr.S * 0.56, 30)
        for (let i = 0; i < 8; i++) R(x, '#ffd0e0', -Fr.S * 0.26 + i * Fr.S * 0.07, -8, 8, 6)
        drawBits(x, ['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: '#e8344e' }, 0, 6, 4, { outline: null })
        x.restore()
      }
    }
    return p
  },
  signHops: [T.pick, T.flip[1] + 0.2, T.m8 + 1.2, T.alarm],
  refl(t) {
    const p = { mood: 'neutral', look: [-1, 0.6] }
    if (t < 1) { p.mood = 'wide'; p.look = [-1, -0.6] }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.wi[0] && t < T.m4) { p.mood = 'squint'; p.x = 760; p.y = 1000; p.s = 200 }
    if (t > T.m4) p.mood = 'happy'
    if (t > T.photo && t < T.m6) { p.mood = 'sparkle' }
    if (t > T.m7) p.mood = 'happy'
    if (t > T.m9) p.mood = 'wink'
    return p
  },
  reflHops: [...[39.2, 39.5, 39.8, 40.1, 40.4]],
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > CH[1]) { p.mood = 'sparkle' }
    if (t > T.pick && t < CH[2]) { p.tears = 3; p.mood = 'happy' }
    if (t > CH[2]) { p.tears = 2; p.mood = 'wide' }
    if (t > T.photo) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.m8) { p.tears = 3; p.mood = 'happy' }
    if (t > T.m9 + 1.5) p.mood = 'sleepy'
    return p
  },
  tissuePulls: [T.p1, T.pick + 0.3, T.flip[1], T.p2, T.p2 + 0.4, T.m8 + 0.5],
  glass(x, t) {
    // the outfit parade across the glass
    PARADE.forEach((o, i) => {
      const t0 = T.parade[i], k = easeOutBack(prog(t, t0, t0 + 0.35), 1.6) * (i < 2 ? outK(t, [t0 + 1.4, t0 + 1.6]) : outK(t, [T.wear - 0.2, T.wear]))
      if (k <= 0.01) return
      drawBits(x, SHIRT, { C: o.col }, 540, 760, 26 * k)
      x.save(); x.translate(540, 900); x.scale(k, k); R(x, INK, -170, -26, 340, 52); R(x, BONE, -164, -20, 328, 40)
      x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(o.label, 0, 2); x.restore()
      if (t > t0 + 0.7) {
        const sk = pop01(t, t0 + 0.7, 0.2, 2.6)
        x.save(); x.translate(680, 680); x.rotate(-0.2); x.scale(sk * k, sk * k)
        if (o.ok) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 0, 0, 14)
        else { R(x, '#e8344e', -60, -12, 120, 24); x.rotate(1.57); R(x, '#e8344e', -60, -12, 120, 24) }
        x.restore()
      }
    })
    // the old photo, propped in the mirror's corner, then turned face down
    if (t > T.photo && t < CH[4] + 0.4) {
      const k = easeOutBack(prog(t, T.photo, T.photo + 0.4), 1.6)
      const f = ease.inOutCubic(prog(t, ...T.flip))
      const sx = Math.abs(Math.cos(Math.PI * f))
      x.save(); x.translate(430, 760); x.scale(Math.max(0.03, sx) * outK(t, [CH[4], CH[4] + 0.4]), outK(t, [CH[4], CH[4] + 0.4]))
      if (f < 0.5) drawPhoto(x, { cx: 0, cy: 0, w: 220, rot: -0.05, k, a: '#3f7cf0', b: '#f0a03a', capt: 'us, last spring', heart: true })
      else { R(x, INK, -116, -136, 232, 272); R(x, '#e9dcc4', -110, -130, 220, 260); x.font = `600 22px ${INTER}`; x.fillStyle = '#8a7a6a'; x.textAlign = 'center'; x.fillText('thank you', 0, 0) }
      x.restore()
    }
  },
  front(x, t, K) {
    // frame 0: the outfits mid-flight (and one stuck on the mirror's corner)
    if (t < 5) {
      for (let i = 0; i < 5; i++) {
        const p = ((t * 0.9 + i * 0.27) % 1.3)
        if (p > 1) continue
        drawBits(x, SHIRT, { C: SCOL[i] }, lerp(380, 120 + i * 220, p), 1000 - Math.sin(Math.PI * p) * (520 + i * 40), 11, { rot: p * 5 + i })
      }
    }
    if (t < CH[1] + 0.3) drawBits(x, SHIRT, { C: '#7fd0ff' }, 270, 510, 11, { rot: -0.4, alpha: outK(t, [CH[1], CH[1] + 0.3]) })
    // the pile on the floor (grows in chapter 1)
    const pile = t < T.pile ? 0.35 : t < CH[1] + 0.5 ? 1 : 1 - prog(t, CH[1] + 0.5, CH[1] + 1)
    for (let i = 0; i < Math.round(9 * pile); i++) drawBits(x, SHIRT, { C: SCOL[i % 6] }, 110 + (i % 3) * 60, 1360 - Math.floor(i / 3) * 36, 9, { rot: (i * 0.7) % 1 - 0.5 })
    // what-if bubbles, popped by the reflection
    WHATIF.forEach((w, i) => {
      const pos = [[300, 640], [650, 560], [420, 800], [720, 760], [560, 980]][i]
      const pp = T.popAt[i]
      if (t < pp) bubble(x, t, pos[0], pos[1], T.wi[i], pp, w, { size: 30, col: ['#ffd0e0', '#ffe27a', '#c9f0ff', '#d9ccff', '#ffc9a8'][i], tail: (i % 2 ? 0.4 : -0.4), rot: (i % 2 ? 0.04 : -0.04) })
      sparkles(x, t, pos[0], pos[1], pp, 8, 70, i, ['#fff', '#8fe9ff', GOLD])
    })
    // the alarm clock
    if (t > T.alarm) drawClock(x, 560, 1180, '8:00 AM', { k: pop01(t, T.alarm, 0.3, 2.4) * outK(t, [T.last - 0.1, T.last + 0.2]), size: 40, col: '#7dffb0' })
    sparkles(x, t, 300, 1180, T.pick, 12, 180, 2)
    hearts(x, t, T.flip[1] + 0.1, 430, 700, { n: 6, cell: 7, spread: 160 })
    hearts(x, t, T.m8 + 1.2, 300, 1080, { n: 6, cell: 7, spread: 160 })
    void K
  },
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['whoosh', r3(i * 0.42), 0.35, 0.03]),
    ['pop', T.pile, 392, 0.05, 0], ['whoosh', T.pile, 0.4, 0.03],
    ...T.parade.flatMap((p, i) => [['whoosh', p, 0.35, 0.035], ['pop', r3(p + 0.7), i < 2 ? 330 : 1174.66, 0.05, 0.2]]),
    ['bell', T.pick, 1760, 0.03, 1.0, 0], ['glitter', T.pick, T.pick + 0.5], ['pop', T.wear, 880, 0.04, -0.2],
    ...T.wi.map((w, i) => ['pop', w, [659.25, 739.99, 830.61, 880, 987.77][i], 0.04, (i % 2 ? 0.3 : -0.3)]),
    ...T.popAt.map((p, i) => ['pop', p, 1760 - i * 80, 0.045, (i % 2 ? 0.3 : -0.3)]),
    ['whoosh', T.photo, 0.4, 0.03], ['pluck', T.photo + 0.3, 587.33, 0.035, 0.9, 0],
    ['whoosh', T.flip[0], 0.3, 0.03], ['tick', T.flip[1], 0.05], ['swell', T.flip[1] - 0.2, T.flip[1] + 0.8, { gain: 0.035, f0: 500, f1: 4000 }],
    ['pop', T.alarm, 1174.66, 0.045, 0], ['pluck', T.alarm + 0.1, 2349.32, 0.02, 0.2, 0],
    ['bell', T.last + 0.55, 1174.66, 0.03, 1.4, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
