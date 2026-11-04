// nf16e03: MEET THE FAMILY, Ep 3, "A kind no is still a no." (38 s vertical, star_advice, music: pop · D).
// Story 0–35.6, then the short 2.4 s end card (no card-cut transition). The series look lives in ../../nf16e01/scenes/familykit.js.
//   0.0–3.2    DEAR STARS: "“They want us | there *all week.*”" — an Aries, phone buzzing. ♈ Aries mid-hop, the phone
//              buzzing with MOM: "come for the WHOLE week!!"
//   3.2–10.8   "Seven days. | *Seven plans.*"  The calendar fills, one plan a day. ARIES: "ok. I'm just gonna text *NO.*"
//              The phone: "NO." in big red, a thumb over SEND…
//  10.8–19.8   "Yes first. | *Then* the limit."  THE STARS: "wait. what *can* you say yes to?" → "start there. then say the
//              *limit.*" The NO. shrinks away and the rewrite types on: "we can't do the whole week. we'd love Saturday,
//              and we're bringing pie."
//  19.8–26.2   "And then…"  typing… MOM: "Saturday it is. bring the pie!!" + a heart. Pisces fountains.
//              THE STARS: "a clear no, said warmly, still *lands.*"
//  26.2        ★ LESSON UNLOCKED: "Warm first. | *Clear* always."  +1 PIE CREDIT
//  30.2–35.6   "Saturday. | *Pie.* Done."  Aries and ♐ Sagittarius carry the pie. THE STARS: "Say the love first. Then
//              say the limit."
import { makeFamily, K, box, R, ink, sparkles, hearts, shadow, phone, calendar, confetti, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, MINT, RED, INK, EXCL } from '../../nf16e01/scenes/familykit.js'

const ARI = K.tag('aries')
const T = { b1: 3.2, b2: 10.8, b3: 19.8, lesson: 26.2, b4: 30.2, end: 35.61, no: 7.9, rewrite: 16.6, typing: [20.3, 21.7], reply: 21.7, heart: 22.2 }
const BOXES = [
  { open: 5.6, close: 10.6, lines: [{ t: 5.8, speaker: ARI, color: '#ff9a8a', text: "ok. I'm just gonna text *NO.*" }] },
  { open: 11.2, close: 16.4, lines: [
    { t: 11.4, speaker: K.STARS, text: 'wait. what *can* you say yes to?' },
    { t: 13.9, speaker: K.STARS, text: 'start there. then say the *limit.*' },
  ] },
  { open: 22.4, close: 26.0, lines: [{ t: 22.6, speaker: K.STARS, text: 'a clear no, said warmly, still *lands.*' }] },
  { open: 30.75, close: 35.1, lines: [{ t: 30.95, speaker: K.STARS, text: 'Say the love first. Then say the limit.' }] },
]
const MOM = [{ at: -1, side: 'L', text: 'come for the WHOLE week!!' }, { at: -1, side: 'L', text: "I made a list" }]
const PLANS = ['PIE', 'HIKE', 'GAMES', 'LUNCH', 'SING', 'CRAFT', 'MORE PIE']

function hook(x, t, S) {
  shadow(x, 360, 1330, 280)
  const buzz = 6 * Math.sin(t * 60) * (Math.sin(t * 3) > 0 ? 1 : 0)
  S.asker(x, t, { x: 340, y: 1150, s: 270, mood: 'wide', look: [1, -0.5], hops: [-0.12, 1.0, 2.0] })
  phone(x, t, { cx: 760 + buzz, top: 680, w: 400, h: 560, title: 'MOM', msgs: MOM, rot: 0.06, fs: 34 })
  if (Math.sin(t * 3) > 0) for (const d of [-1, 1]) R(x, GOLD, 760 + d * 225, 760 + 30 * Math.sin(t * 9), 14, 40)
}
function beat1(x, t, S) {
  const u = t - S.t0
  const fills = PLANS.map((m, i) => ({ i: 14 + i, col: [PINK, MINT, GOLD, '#7fd0ff', PINK, MINT, GOLD][i], mark: m.length > 5 ? 'PIE+' : m, k: easeOutBack(prog(u, 0.6 + i * 0.45, 0.9 + i * 0.45), 2.4) }))
  calendar(x, 540, 700, { w: 600, h: 470, fills, rot: 0.02 })
  shadow(x, 300, 1320, 220)
  const panic = u > 3.6
  S.asker(x, t, { x: 300, y: 1170, s: 220, mood: panic ? 'squint' : 'wide', look: [1, -1], hops: [S.t0 + 3.7, T.no] })
  if (t > T.no - 0.6) {
    phone(x, t, { cx: 760, top: 960, w: 340, h: 360, fs: 60, title: 'MOM', msgs: [{ at: T.no, side: 'R', text: 'NO.', col: RED }], rot: 0.05 })
  }
  if (panic) drawBits(x, EXCL, { E: RED }, 470, 990 - 8 * Math.sin(t * 8), 9)
}
function beat2(x, t, S) {
  const msgs = [...MOM, { at: T.rewrite, side: 'R', text: "we can't do the whole week. we'd love Saturday, and we're bringing pie.", col: MINT }]
  const noK = 1 - ease.inCubic(prog(t, 12.4, 12.9))
  phone(x, t, { cx: 610, top: 440, w: 600, h: 820, fs: 38, title: 'MOM', msgs: noK > 0.02 ? [...MOM, { at: S.t0 - 1, side: 'R', text: 'NO.', col: RED }] : msgs, alpha: 1 })
  if (noK > 0.02 && noK < 0.98) sparkles(x, t, 760, 1100, 12.6, 8, 90, 1, [RED, BONE])
  shadow(x, 200, 1330, 200)
  S.asker(x, t, { x: 200, y: 1190, s: 200, mood: t > T.rewrite + 0.4 ? 'sparkle' : t > 12.9 ? 'neutral' : 'wide', look: [1, -1], hops: [T.rewrite, T.rewrite + 0.4] })
}
function beat3(x, t, S) {
  const msgs = [...MOM, { at: -1, side: 'R', text: "we can't do the whole week. we'd love Saturday, and we're bringing pie.", col: MINT },
    { at: T.reply, side: 'L', text: 'Saturday it is. bring the pie!!' }, { at: T.heart, side: 'L', text: '♥ ♥ ♥' }]
  phone(x, t, { cx: 610, top: 440, w: 600, h: 820, fs: 38, title: 'MOM', msgs, typing: T.typing })
  shadow(x, 200, 1330, 200)
  S.asker(x, t, { x: 200, y: 1190, s: 200, mood: t > T.reply ? 'happy' : 'neutral', look: [1, -1], hops: [T.reply + 0.05, T.reply + 0.45, T.heart + 0.3] })
  confetti(x, t, T.reply + 0.05, 600, 700)
  hearts(x, t, T.heart, 200, 1020, { n: 5 })
}
function beat4(x, t, S) {
  shadow(x, 360, 1300, 220); shadow(x, 720, 1300, 220)
  S.asker(x, t, { x: 360, y: 1150, s: 220, mood: 'happy', look: [1, -0.4], hops: [S.t0 + 0.4, 33.2] })
  S.partner(x, t, { x: 720, y: 1150, s: 220, mood: t > 33.2 ? 'heart' : 'happy', look: [-1, -0.4], hops: [S.t0 + 0.55, 33.3] })
  // the pie, carried between them
  const py = 1010 + 6 * Math.sin(t * 4)
  box(x, 440, py - 30, 200, 50, '#e3a05a', { b: 6, hi: '#f2c27e' }); for (let i = 0; i < 5; i++) R(x, '#b56a2a', 456 + i * 38, py - 22, 22, 7)
  box(x, 420, py + 20, 240, 16, '#c9c3dc', { b: 5 })
  for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.55)', 490 + i * 40, py - 80 - 12 * Math.sin(t * 3 + i), 8, 24)
}

const EP = makeFamily({
  id: 'nf16e03', D: 40, key: 'D', asker: 'aries', partner: 'sagittarius',
  askerAcc: [['beanie', '#f2c75c']], partnerAcc: [['scarf', '#7fd0ff']],
  q: { text: '“They want us | there *all week.*”', sign: '— an Aries, phone buzzing', out: [2.9, 3.2] },
  hook,
  hookPis: { x: 960, y: 1360, s: 120, at: 0.6, tears: 1, look: [-1, -1] },
  beats: [
    { t0: T.b1, t1: T.b2, head: 'Seven days. | *Seven plans.*', accent: PINK, draw: beat1, stars: null, pis: { x: 950, y: 1330, s: 120, tears: 2, look: [-1, -1] } },
    { t0: T.b2, t1: T.b3, head: 'Yes first. | *Then* the limit.', accent: MINT, draw: beat2, stars: { x: 150, y: 960, s: 140 }, pis: { x: 960, y: 1330, s: 110, tears: 1, look: [-1, -1], at: 5.8 } },
    { t0: T.b3, t1: T.lesson, head: 'And *then…*', accent: GOLD, size: 104, accentSize: 140, draw: beat3, stars: { x: 150, y: 960, s: 140 }, pis: { x: 960, y: 1330, s: 130, tears: 3, mood: 'sparkle', look: [-1, -1], at: 2.0 } },
    { t0: T.lesson, t1: T.b4, head: null, draw: beat3, stars: null, pis: null, punch: false },
    { t0: T.b4, t1: T.end, head: 'Saturday. | *Pie.* Done.', accent: GOLD, draw: beat4, stars: { x: 140, y: 1300, s: 140 }, pis: { x: 950, y: 1300, s: 130, tears: 3, mood: 'happy', look: [-1, -1], at: 0.6 } },
  ],
  boxes: BOXES,
  lesson: { at: T.lesson, out: [30.0, 30.2], text: 'Warm first. | *Clear* always.', chip: '+1 PIE CREDIT', accentColor: MINT, dim: 0.6 },
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, T.b4],
  flashes: [T.b1, T.b2],
  shakes: [T.no],
  cues: [
    ...[0.1, 0.25, 0.4, 2.2, 2.35, 2.5].map(a => ['tick', a, 0.03]),
    ...PLANS.map((_, i) => ['pop', +(T.b1 + 0.75 + i * 0.45).toFixed(3), [880, 987.77, 1174.66, 1318.51, 1567.98, 1760, 1975.5][i], 0.035, 0]),
    ['tom', T.no, 92, { gain: 0.3, decay: 0.3 }], ['pop', T.no, 440, 0.05, 0.2],
    ['whoosh', 12.4, 0.4, 0.03], ['pop', T.rewrite, 1174.66, 0.045, 0.2], ['glitter', T.rewrite, T.rewrite + 0.4],
    ...[0, 0.15, 0.3, 0.7, 0.85, 1.0].map(a => ['tick', +(T.typing[0] + a).toFixed(3), 0.02]),
    ['pop', T.reply, 1318.51, 0.05, -0.2], ['pop', T.heart, 1567.98, 0.045, -0.2], ['bell', T.heart + 0.05, 1760, 0.03, 1, 0],
    ['pluck', 33.2, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [INK, BONE, ink, lerp, clamp, pop01, outK]
