// kpvee06 · Planet Talk: Venus to Virgo — "Tear Up Page Four" (25.8 s vertical, star_advice, hard cut). lofi · D.
//   0.00  frame 0: Venus mid-spin in a glitter cyclone, a 12-page partner checklist mid-explosion into flying pages;
//         Virgo grabbing at them. Slam "VIRGO. Tear up *page four.*"
//   3.0   PAGE 4 lands: "must alphabetise spices · correct font in texts · same favourite season" (caught: the font).
//   5.2   Virgo: "Standards keep me safe!" Venus: "Standards, darling, yes." / "A rubric, no."
//  11.6   the short list: WHAT MATTERS: kind · honest · makes you laugh (circled one by one). "Three things. Everything
//         else is trivia."  17.2 Virgo folds page 4 into a paper heart.
//  18.4   a text from the "wrong font" person: "hi!! sorry about my font lol". Virgo: "…honestly? Cute."
//  21.6   Pisces sobs at the short list.  24.2 slam "Three things. *Kind* comes first." Hard cut.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { episode, panel, txt, rich, heart, sparkleBurst, pop01, outK, sobCues, INK, ROSE, CREAM, GOLD, BONE, VRIM } from '../../kpvee01/venuskit.js'

const T = { page: 3.0, list: 11.6, circ: [12.2, 13.0, 13.8], fold: [17.2, 17.8], notif: 18.4, sob: 21.6, last: 24.2 }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

function cyclone(x, t) {
  const a = 1 - prog(t, 1.4, 2.6)
  if (a <= 0) return
  for (let k = 0; k < 12; k++) {
    const ang = t * 3.2 + k * 0.52, R = 180 + k * 34 + Math.sin(t * 2 + k) * 30
    const px = 540 + Math.cos(ang) * R, py = 900 + Math.sin(ang) * R * 0.55 - k * 22 + (t + 0.6) * 120
    x.save(); x.globalAlpha = a; x.translate(px, py); x.rotate(ang * 1.3)
    x.fillStyle = INK; x.fillRect(-52, -68, 104, 136); x.fillStyle = CREAM; x.fillRect(-46, -62, 92, 124)
    x.fillStyle = 'rgba(27,18,54,0.35)'; for (let j = 0; j < 5; j++) x.fillRect(-36, -44 + j * 20, 72 - (j % 2) * 18, 6)
    txt(x, `p.${k + 1}`, 0, -50, { size: 16, color: VRIM })
    x.restore()
  }
}
function page4(x, t) {
  const k = pop01(t, T.page, 0.4, 1.8)
  const fold = ease.inCubic(prog(t, ...T.fold))
  if (k <= 0.01 || fold >= 1) return
  const sw = ease.inOutCubic(prog(t, T.list - 0.2, T.list + 0.3))
  x.save(); x.translate(540, 1060); x.rotate(-0.05 + fold * 1.5); x.scale(k * (1 - fold), k * (1 - fold))
  if (sw < 0.5) {
    x.scale(1, Math.max(0.03, 1 - sw * 2))
    panel(x, 0, 0, 760, 400, { fill: CREAM, rad: 12 })
    txt(x, 'PARTNER CHECKLIST · PAGE 4', 0, -150, { size: 30, color: VRIM })
    ;['□ must alphabetise spices', '□ correct font in texts', '□ same favourite season', '□ folds towels in thirds'].forEach((l, i) => txt(x, l, -320, -80 + i * 64, { size: 40, align: 'left', color: INK, weight: 700 }))
  } else {
    x.scale(1, Math.max(0.03, (sw - 0.5) * 2))
    panel(x, 0, 0, 760, 400, { fill: '#fff1f5', rad: 12 })
    txt(x, 'WHAT ACTUALLY MATTERS', 0, -150, { size: 32, color: VRIM })
    ;['kind', 'honest', 'makes you laugh'].forEach((l, i) => {
      txt(x, l, 0, -70 + i * 80, { size: 56, italic: true, color: INK })
      const c = prog(t, T.circ[i], T.circ[i] + 0.4)
      if (c > 0) { x.strokeStyle = '#d8324a'; x.lineWidth = 7; x.beginPath(); x.ellipse(0, -70 + i * 80, 60 + l.length * 13, 36, -0.05, -1.5, -1.5 + c * 6.6); x.stroke() }
    })
  }
  x.restore()
  // paper heart
  const hk = pop01(t, T.fold[1], 0.35, 2.6) * outK(t, [23.9, 24.2])
  void hk
}
function paperHeart(x, t) {
  const hk = pop01(t, T.fold[1], 0.35, 2.6)
  if (hk <= 0.01) return
  heart(x, 540, 1080 + Math.sin(t * 2) * 10, 110 * hk, { color: CREAM, rot: Math.sin(t * 1.5) * 0.08 })
  txt(x, 'p.4', 540, 1050, { size: 34, color: VRIM, s: hk })
}

const EP = episode({
  sign: 'virgo', dur: 25.8, ending: 'cut',
  enter: { kind: 'spin', at: -0.6, x: 540, y: 640, size: 400 },
  venus: [
    { t: 0, x: 540, y: 640, size: 400, mood: 'wide', look: [0, 1] },
    { t: 1.6, mood: 'sly', look: [0, 1] },
    { t: 7.4, mood: 'happy' },
    { t: 9.6, mood: 'sly' },
    { t: 11.6, mood: 'love', look: [0, 1] },
    { t: 19.2, mood: 'happy' },
    { t: 24.0, mood: 'proud' },
  ],
  signK: [
    { t: 0, x: 540, y: 1420, size: 280, mood: 'wide', look: [0.8, -1], squash: -0.1 },
    { t: 1.2, squash: 0 },
    { t: 3.2, mood: 'neutral', look: [0, -1] },
    { t: 5.2, mood: 'squint', look: [0, 0] },
    { t: 9.6, mood: 'wide', look: [0, -1] },
    { t: 12.2, mood: 'neutral', look: [0, -1] },
    { t: 17.2, mood: 'happy', look: [0, -1] },
    { t: 18.6, mood: 'wide', look: [0, 0] },
    { t: 19.2, mood: 'heart', look: [0, 0] },
  ],
  pisK: [
    { t: 0, x: 910, y: 1600, size: 175, mood: 'wide', look: [-1, -1], tears: 1 },
    { t: 12.3, mood: 'sparkle', tears: 2 },
    { t: 21.6, mood: 'happy', tears: 3, d: 0.1 },
  ],
  bubbles: [
    { t0: 5.2, t1: 7.2, who: 'virgo', text: 'Standards keep me *safe!*', x: 520, y: 1760 },
    { t0: 7.4, t1: 9.4, who: 'venus', text: 'Standards, darling, *yes.*', y: 310 },
    { t0: 9.6, t1: 11.4, who: 'venus', text: 'A *rubric*, no.', y: 310, size: 62 },
    { t0: 14.6, t1: 17.0, who: 'venus', text: 'Three things. The rest is *trivia.*', y: 310 },
    { t0: 19.2, t1: 21.4, who: 'virgo', text: '…honestly? *Cute.*', x: 520, y: 1760 },
    { t0: 21.6, t1: 23.9, who: 'pisces', text: 'a SHORT list. I’m *so* proud', x: 520, y: 1780, tail: 300 },
  ],
  fx: [
    ['slamTitle', { at: -1, text: 'VIRGO. Tear up | *page four.*', top: 170, size: 112, out: [2.6, 2.8] }],
    ['whipZoom', { at: 0.4, from: 1.4, len: 0.4 }],
    ['screenShake', { at: 0.42, len: 0.45, amp: 22 }],
    ['caught', { at: 3.6, x: 360, y: 1043, r: 300, ry: 46, label: 'THE FONT??', arrow: 'tr', rec: false, out: [5.0, 5.2] }],
    ['notification', { at: T.notif, out: [21.8, 22.1], title: 'texts', body: 'them: hi!! sorry about my *font* lol', glyph: '♍' }],
    ['slamTitle', { at: T.last, text: 'Three things. | *Kind* comes first.', top: 170, size: 104 }],
  ],
  mid(x, t) { cyclone(x, t); page4(x, t); paperHeart(x, t) },
  front(x, t, S) {
    T.circ.forEach(c => sparkleBurst(x, t, 540, 1060, c + 0.35, { R: 180, n: 8 }))
    sparkleBurst(x, t, 540, 1080, T.fold[1], { R: 260 })
    void S; void lerp; void rich; void BONE; void ROSE; void GOLD; void clamp
  },
  cues: [
    ['whoosh', T.page, 0.4, 0.05], ['tick', T.page + 0.4, 0.05],
    ['whoosh', T.list - 0.2, 0.3, 0.05], ...T.circ.map((c, i) => ['pop', c + 0.3, [880, 1108.73, 1318.51][i], 0.05, 0]),
    ['whoosh', T.fold[0], 0.5, 0.05], ['pop', T.fold[1], 1567.98, 0.05, 0], ['glitter', T.fold[1], T.fold[1] + 0.5],
    ['bell', 19.2, 1760, 0.03, 1.0, 0], ...sobCues(T.sob, 4),
  ],
})
export const { DURATION, SCENES, CUES } = EP
