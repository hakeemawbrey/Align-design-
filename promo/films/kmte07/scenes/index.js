// kmte07: MIRROR TALK No. 7, '"I don't mind, you pick."' (18 s vertical, star_advice post, pop · C). Loops.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Libra mid-twirl between two spinning menus, both pointing at it. Hook '"I don't mind, you pick." |
//          (I *mind.*)'  0.6: record scratch + freeze, a neon TACOS thought bubble: "inner voice: *TACOS.*"
//   2.8    "Every. *Single.* Time."  them: "where do you want to eat?" → "I don't mind, you pick!"
//   5.2    REFLECTION: "you clearly want *tacos*."  LIBRA: "but what if they *don't*?"
//   9.8    REFLECTION: "then you'll find out. that's *dating*."  Libra sends "actually… tacos?" → "YES. finally a plan"
//          Pisces cries happy tears onto a taco.  14.2 last line "You get a *vote.*"  16.6: the menus spin back in;
//          17.55–18 eases into frame 0 (loop).
import { makeMirror, drawPhone, confetti, sparkles, hearts, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const T = { scratch: 0.6, them: 3.0, mine: 3.8, m1: 5.2, s1: 7.4, m2: 9.8, typing: [11.9, 12.5], send: 12.6, reply: 13.4, last: 14.2, twirl: 15.6, back: 16.6 }
const TACO = ['....YYYYY....', '..YYOOOOOYY..', '.YOGRGGRGGOY.', 'YOGGGRGGGGGOY', 'YOOOOOOOOOOOY', 'YYYYYYYYYYYYY']
const TCOL = { Y: '#f2c75c', O: '#e89a3a', G: '#5fd38a', R: '#e8344e' }

function menu(x, cx, cy, rot, k, title, items, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.45)', -95 + 10, -125 + 14, 190, 250)
  box(x, -95, -125, 190, 250, '#fff4dc', { b: 5 })
  R(x, col, -95, -125, 190, 44)
  x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -102)
  x.font = `600 20px ${INTER}`
  items.forEach((s, i) => { R(x, 'rgba(58,42,90,0.2)', -70, -50 + i * 44 + 16, 140, 2); x.fillStyle = '#3a2a5a'; x.fillText(s, 0, -50 + i * 44) })
  x.restore()
}
function thought(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [dx, dy, r] of [[-120, 120, 14], [-92, 92, 20]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 5, 0, 7); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(dx, dy, r, 0, 7); x.fill() }
  R(x, INK, -150, -78, 300, 156); R(x, '#241a44', -142, -70, 284, 140)
  const fl = 0.75 + 0.25 * Math.sin(t * 23) * Math.sin(t * 7)
  x.font = `800 72px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = '#ff5fa2'; x.shadowBlur = 24 * fl; x.fillStyle = `rgba(255,${Math.round(150 + 80 * fl)},${Math.round(200 + 40 * fl)},1)`; x.fillText('TACOS', 0, 4)
  x.restore()
}

const F = makeMirror({
  id: 'kmte07', sign: 'libra', dur: 18, loop: true,
  hook: { text: '“I don’t mind, you pick.” | (I *mind.*)', accentColor: '#ff8fb1', size: 92, out: [2.55, 2.8] },
  fx: [
    { k: 'recordScratch', at: T.scratch, len: 1.4, caption: 'inner voice: *TACOS.*', top: 1520 },
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.3 },
    { k: 'screenShake', at: T.s1 + 0.05, amp: 10, len: 0.35 },
    { k: 'whipZoom', at: T.m2 - 0.08, from: 1.25 },
    { k: 'whipZoom', at: T.reply - 0.06, from: 1.2 },
  ],
  caps: [
    { at: 2.85, out: [9.5, 9.7], text: 'Every. *Single.* Time.', accent: '#ff8fb1', size: 96, accentSize: 124 },
    { at: 9.75, out: [13.9, 14.1], text: 'Say what | you *want.*', accent: '#8fe9ff' },
    { at: T.last, out: [99, 100], text: 'You get | a *vote.*', accent: '#ffd36b', size: 108, accentSize: 146, gap: 0.1 },
  ],
  lines: [
    { t: T.m1, who: 'M', text: 'you clearly want *tacos*.' },
    { t: T.s1, who: 'S', text: "but what if they *don't*?" },
    { t: T.m2, who: 'M', text: "then you'll find out. that's *dating*." },
  ],
  boxes: [[5.0, 12.6]],
  pose(t) {
    const settle = ease.outCubic(prog(t, 2.2, 2.8)), back = ease.inOutCubic(prog(t, T.back, 17.5))
    const m = settle * (1 - back)
    const p = { x: lerp(470, 300, m), y: lerp(1060, 1225, m), s: lerp(320, 280, m), rot: (1 - m) * 0.32 * Math.cos(t * 9), mood: 'wide', look: [0, -0.5], blink: false }
    if (t > 2.4) { p.mood = 'neutral'; p.look = [1, 0.6]; p.blink = undefined }
    if (t > T.m1) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.s1) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.m2) { p.mood = 'neutral'; p.look = [0.6, 0.2] }
    if (t > T.typing[0]) { p.mood = 'neutral'; p.look = [1, 0.4] }
    if (t > T.reply) { p.mood = 'heart'; p.look = undefined }
    if (t > T.twirl && t < T.twirl + 0.7) p.rot = 0.4 * Math.sin(Math.PI * prog(t, T.twirl, T.twirl + 0.7) * 2)
    if (t > T.back) { p.mood = 'wide'; p.look = [0, -0.5] }
    return p
  },
  refl(t) {
    const settle = ease.outCubic(prog(t, 2.2, 2.8)), back = ease.inOutCubic(prog(t, T.back, 17.5)), m = settle * (1 - back)
    const p = { x: lerp(560, 650, m), y: lerp(880, 905, m), s: lerp(300, 250, m), mood: m < 0.5 ? 'wide' : 'neutral', look: [-1, 0.6], rot: 0 }
    if (t > T.m1 && t < T.back) p.mood = 'happy'
    if (t > T.reply && t < T.back) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > T.m2) p.mood = 'sparkle'
    if (t > T.reply && t < T.back) { p.tears = 3; p.mood = 'happy' }
    p.draw = undefined
    return p
  },
  tissuePulls: [T.reply + 0.4, T.reply + 0.9],
  front(x, t, K) {
    // the two menus orbiting the twirl (frame 0 and the loop-back)
    const mk = t < 2.2 ? 1 : t < T.back ? 1 - ease.inCubic(prog(t, 2.2, 2.5)) : ease.outCubic(prog(t, T.back, 17.4))
    const a = 0.4 + (t < T.scratch ? t : t < T.scratch + 1.4 ? T.scratch : t - 1.4) * 2.4
    menu(x, 470 + Math.cos(a) * 300, 980 + Math.sin(a) * 120, Math.sin(a) * 0.3, mk * 0.95, 'NOODLES', ['spicy', 'mild', 'extra'], '#7fd0ff')
    menu(x, 470 + Math.cos(a + Math.PI) * 300, 980 + Math.sin(a + Math.PI) * 120, -Math.sin(a) * 0.3, mk * 0.95, 'SALAD', ['big', 'bigger', 'leaf'], '#9fe6b0')
    // the TACOS thought bubble
    const tk = Math.max(t < 2.4 ? pop01(t, T.scratch + 0.08, 0.3, 2.4) : 0, t > T.m1 && t < T.s1 + 1.2 ? pop01(t, T.m1 + 0.3, 0.3, 2.4) * outK(t, [T.s1 + 0.9, T.s1 + 1.2]) : 0)
    thought(x, t, t < 2.4 ? 600 : 470, t < 2.4 ? 700 : 900, tk)
    // the phone
    if (t > 2.7 && t < T.last + 0.3) {
      const inn = easeOutBack(prog(t, 2.7, 3.0), 1.4), hide = ease.inCubic(prog(t, T.m1 - 0.3, T.m1)), come = easeOutBack(prog(t, T.m2 + 1.6, T.m2 + 1.95), 1.4), go = ease.inCubic(prog(t, T.last - 0.1, T.last + 0.3))
      const y = t < T.m2 ? 540 + (1 - inn) * 1500 + hide * 1500 : 540 + (1 - come) * 1500 + go * 1500
      drawPhone(x, t, { cx: 690, top: y, w: 480, h: 620, title: 'them ♡', size: 30, rot: -0.03, typing: T.typing, msgs: [
        { at: T.them, side: 'L', text: 'where do you want to eat?' }, { at: T.mine, side: 'R', text: "I don't mind, you pick!" },
        { at: T.send, side: 'R', text: 'actually… tacos?' }, { at: T.reply, side: 'L', text: 'YES. finally a plan' },
      ] })
    }
    // Pisces' taco, with tears raining on it
    if (t > T.reply && t < T.back) {
      const k = pop01(t, T.reply + 0.2, 0.3, 2.4) * (1 - prog(t, T.back - 0.3, T.back))
      drawBits(x, TACO, TCOL, K.PIS_AT.x - 100, K.PIS_AT.y + 50, 7 * k)
    }
    confetti(x, t, T.reply, 690, 900)
    hearts(x, t, T.reply + 0.2, 300, 1080, { n: 6, cell: 7, spread: 160 })
    sparkles(x, t, 300, 1100, T.twirl + 0.3, 10, 160, 2)
  },
  cues: [
    ['whoosh', 0.0, 0.5, 0.04], ['whoosh', 0.3, 0.4, 0.03],
    ['bell', T.scratch + 0.15, 1046.5, 0.025, 0.8, 0], ['glitter', T.scratch + 0.1, T.scratch + 0.6],
    ['pop', T.them, 880, 0.045, -0.2], ['pop', T.mine, 1174.66, 0.045, 0.2],
    ['pop', T.m1 + 0.3, 1318.51, 0.035, 0], ['whoosh', T.m2 + 1.6, 0.4, 0.035],
    ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02], ['pop', T.send, 1174.66, 0.045, 0.2],
    ['pop', T.reply, 1318.51, 0.05, -0.2], ['pop', T.reply + 0.08, 1760, 0.035, -0.2], ['glitter', T.reply, T.reply + 0.5],
    ['bell', T.last + 0.45, 1567.98, 0.03, 1.0, 0], ['whoosh', T.twirl, 0.5, 0.03], ['whoosh', T.back, 0.6, 0.035],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
