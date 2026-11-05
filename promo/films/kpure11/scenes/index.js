// kpure11 · Planet Talk: Uranus · "Aquarius, the Most Unexpected Thing" (78 s vertical, loop) · synthwave · Gm · star_talk
// The home-sign heart-to-heart (in astrology, Uranus rules Aquarius). Four chapters, a beat every 8–10 s.
//   0      Uranus and Aquarius mid-air HIGH-FIVE, the frame glitching apart; "AQUARIUS. | My favourite *weirdo.* Sit."
//   2.6    the promise: "Stay for the *most unexpected move.*"
//   6.0    CH 1 · THE CRUSH: ♒ "There's someone. I *like* them. Ugh." · ♅ "In astrology, I rule *you.* So I get it."
//          ♒ "I refuse to be *normal* about it." · ♅ "Then let's be *unexpected.*"
//   20.0   CH 2 · THE PLANS: plan A a code message ("*in binary*") → glitch PLAN_A.EXE · "Too weird. *Even for me.*"
//          plan B a banner in the sky → glitch · "They'd need *binoculars.*" · plan C a riddle hunt → glitch ·
//          "They'd still be *looking.* In March."
//   38.0   CH 3 · THE GLITCH: Uranus tips onto its side ("Uranus spins on its side. *True.* Still chill.")
//          ♒ "Plain feelings feel… *exposed.*" · silence · ♅ "The most unexpected thing *you* could do… is say it *simply.*"
//   54.0   CH 4 · THE MOVE: at the crush's door · loading "being sincere…" · knock · ♒ "I like you. That's it.
//          *That's the message.*" · the crush: "I've been waiting for you to be *normal* about it." · "*Yes.*" (laughing)
//   68.8   Pisces sobbing in the bushes with a SAY IT sign · 72.0 "Plainly. | *The wildest thing I've done.*" · loop
import { urFilm, HK, r3 } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 78
const C1 = 6.0, C2 = 20.0, C3 = 38.0, C4 = 54.0
const PA = 20.6, PB = 26.6, PC = 32.0
const TIP = 38.6, QUIET = 46.2, DOOR = 54.0, LOAD = 55.0, KNOCK = 58.4, OPEN = 58.8, SAY = 59.2, WAITED = 63.2, YES = 66.8, PIS = 68.8, LAST = 72.0
const CRUSH = 'libra', CC = '#f0a3c8'
const CH = [
  { at: C1, out: [C1 + 3.2, C1 + 3.2 + 0.3], n: 1, title: 'THE CRUSH' },
  { at: C2, out: [C2 + 3.0, C2 + 3.0 + 0.3], n: 2, title: 'THE PLANS' },
  { at: C3, out: [C3 + 3.0, C3 + 3.0 + 0.3], n: 3, title: 'THE GLITCH' },
  { at: C4, out: [C4 + 3.0, C4 + 3.0 + 0.3], n: 4, title: 'THE MOVE' },
]
const PLANS = [
  { at: PA, card: 'PLAN A · A CODE MESSAGE', g: 23.6, exe: 'PLAN_A.EXE has stopped responding' },
  { at: PB, card: 'PLAN B · A BANNER IN THE SKY', g: 29.2, exe: 'PLAN_B.EXE has stopped responding' },
  { at: PC, card: 'PLAN C · A 12-CLUE RIDDLE HUNT', g: 34.6, exe: 'PLAN_C.EXE has stopped responding' },
]
const LOADB = { at: LOAD, len: 3.0, label: 'being sincere…', stallAt: 99, error: null, y: 940 }

function space(x, t, K) {
  K.drawSpace(x, t, { planet: 'uranus', seed: 11, horizon: { y: 1600 } })
}
function street(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0c0a26'); g.addColorStop(1, '#2a1a40')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  K.drawSpace(x, t, { planet: 'uranus', seed: 12, stars: 0.8, glow: 0.4 })
  // the house front + the door
  K.box(x, 540, 640, 560, 1000, '#3a2a56', { o: 8 }); for (let j = 0; j < 12; j++) K.rect(x, 540, 660 + j * 80, 560, 3, 'rgba(0,0,0,0.18)')
  const op = ease.outCubic(prog(t, OPEN - 0.1, OPEN + 0.3))
  K.box(x, 680, 1000, 280, 460, '#ffd98a', { o: 6 })                       // warm light behind the door
  x.save(); x.translate(680, 1000); x.scale(1 - 0.85 * op, 1); K.box(x, 0, 0, 280, 460, '#7a3a4a', { o: 6 }); K.rect(x, 230, 230, 24, 24, '#f2c75c'); x.restore()
  K.box(x, 640, 960, 360, 30, '#2a1a40', { o: 5 })
  K.label(x, 'NO. 11', 820, 920, { size: 24, bg: '#efe6d6' })
  // the path + the bushes
  K.rect(x, -20, 1460, 1120, 480, '#1e1430'); K.box(x, 640, 1460, 360, 480, '#4a3a5a', { o: 5 })
  for (const [bx, by, r] of [[110, 1700, 160], [330, 1780, 130], [960, 1760, 150]]) { x.fillStyle = '#140c28'; x.beginPath(); x.arc(bx, by, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#2f7a5a'; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
}
function whiteboard(x, t, K, k) {
  if (k <= 0.01) return
  x.save(); x.translate(560, 1000); x.scale(k, k)
  K.box(x, -380, -230, 760, 460, '#f6f4ee', { o: 8 }); K.rect(x, -380, 230, 760, 16, '#9aa6b8')
  K.txt(x, 'HOW TO TELL THEM (UNEXPECTEDLY)', 0, -190, { size: 26, color: '#2a3fb8' })
  PLANS.forEach((p, i) => {
    if (t < p.at) return
    const y = -110 + i * 110, crossed = t > p.g + 0.3
    K.box(x, -340, y - 40, 680, 80, ['#9fe6b0', '#f2c75c', '#c9a6ff'][i], { o: 4 })
    K.txt(x, p.card, 0, y + 2, { size: 28, font: K.INTER, weight: 800, color: K.INK })
    if (crossed) { const c = prog(t, p.g + 0.3, p.g + 0.6); x.save(); x.strokeStyle = K.RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(-330, y + 20); x.lineTo(-330 + 660 * c, y - 20); x.stroke(); x.restore() }
  })
  x.restore()
}
// a little prop per plan: binary ribbon, the sky banner, a pile of clue envelopes
function planProp(x, t, K) {
  const a = K.win(t, PA + 0.4, PA + 3.0)
  if (a > 0.01) { x.save(); x.globalAlpha = a; for (let i = 0; i < 3; i++) K.txt(x, '01001000 01001001'.slice(i * 2, i * 2 + 14), 560, 1300 + i * 46, { size: 34, color: '#7dffb0' }); x.restore() }
  const b = K.win(t, PB + 0.4, PB + 3.0)
  if (b > 0.01) { x.save(); x.translate(lerp(1400, 560, ease.outCubic(prog(t, PB + 0.4, PB + 1.4))), 1330); K.box(x, -300, -50, 600, 100, '#ff8fb1', { o: 5 }); K.txt(x, 'TINY TEXT. LOOK UP. →', 0, 2, { size: 30, color: K.INK }); x.restore() }
  const c = K.win(t, PC + 0.4, PC + 3.0)
  if (c > 0.01) for (let i = 0; i < 12; i++) { const k = K.pop01(t, PC + 0.4 + i * 0.08, 0.2); if (k > 0) { x.save(); x.translate(300 + (i % 6) * 90, 1300 + Math.floor(i / 6) * 90); x.rotate((i % 3 - 1) * 0.2); x.scale(k, k); K.box(x, -36, -24, 72, 48, '#efe6d6', { o: 3 }); K.txt(x, String(i + 1), 0, 2, { size: 22, color: K.INK }); x.restore() } }
}

const F = urFilm({
  id: 'kpure11', sign: 'aquarius', dur: D, ending: 'loop',
  hook: { text: 'AQUARIUS. | My favourite *weirdo.* | Sit.', top: 210, size: 98 },
  entry: { kind: 'slide', from: 'left', at: -0.42, len: 0.7, x: 400, y: 820, size: 360 },
  brk: { at: -0.05, len: 0.6, amp: 1.2 },
  bg(x, t, K) { (t < DOOR ? space : street)(x, t, K) },
  paint(x, t, K) {
    if (t < DOOR) {
      // Uranus
      const U = K.track(t, [
        [0, { x: 400, y: 820, size: 360 }], [2.4, { x: 400, y: 820, size: 360 }], [3.0, { x: 300, y: 780, size: 360 }],
        [C2, { x: 300, y: 780, size: 360 }], [C2 + 0.5, { x: 200, y: 560, size: 260 }],
        [C3, { x: 200, y: 560, size: 260 }], [C3 + 0.5, { x: 400, y: 800, size: 380 }],
        [QUIET, { x: 400, y: 800, size: 380 }], [QUIET + 0.4, { x: 540, y: 820, size: 540 }],
      ])
      const tip = ease.outBack(prog(t, TIP, TIP + 0.6)) * (1 - ease.inOutCubic(prog(t, QUIET - 0.6, QUIET)))
      const mood = t < 2.6 ? 'happy' : t < C2 ? (t > 9.4 && t < 12.6 ? 'proud' : 'sly') : t < C3 ? (PLANS.some(p => t > p.g && t < p.g + 2.6) ? 'wide' : 'happy') : t < 42.2 ? 'happy' : t < QUIET ? 'sad' : 'neutral'
      K.uranus(x, t, { ...U, rot: tip * Math.PI / 2, mood, look: t < 2.4 ? [1, 0] : [1, 0.6], hops: [0.32, C2 + 0.6, 24.2, 29.8, 35.2] })
      // Aquarius: mid-leap at frame 0 (the high-five), then standing
      const leap = 1 - ease.outCubic(prog(t, 0.3, 1.0))
      const A = K.track(t, [[0, { x: 690, y: 820, s: 330 }], [1.1, { x: 740, y: 1380, s: 330 }], [C2, { x: 740, y: 1380, s: 330 }], [C2 + 0.5, { x: 860, y: 1500, s: 280 }], [C3, { x: 860, y: 1500, s: 280 }], [C3 + 0.5, { x: 760, y: 1440, s: 300 }], [QUIET, { x: 760, y: 1440, s: 300 }], [QUIET + 0.4, { x: 820, y: 1560, s: 260 }]])
      const am = t < 2.6 ? 'happy' : t < C2 ? (t < 9.4 ? 'heart' : t < 15.6 ? 'squint' : 'sparkle') : t < C3 ? (PLANS.some(p => t > p.at && t < p.g) ? 'sparkle' : 'wide') : t < 42.2 ? 'neutral' : t < QUIET ? 'sleepy' : 'wide'
      K.sign(x, t, 'aquarius', { ...A, mood: am, zzz: false, rot: leap * 0.3, look: t < 2.4 ? [-1, 0] : [-1, -0.5], hops: [6.5, 12.9, PA + 0.1, PB + 0.1, PC + 0.1], shadow: t > 1.1 })
      // the high-five spark
      const sp = prog(t, -0.2, 0.7)
      if (sp < 1) { x.save(); x.globalAlpha = 1 - sp; x.strokeStyle = '#fffbea'; x.lineWidth = 12; x.lineCap = 'round'; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, r0 = 40 + sp * 100, r1 = 120 + sp * 260; x.beginPath(); x.moveTo(560 + Math.cos(a) * r0, 760 + Math.sin(a) * r0); x.lineTo(560 + Math.cos(a) * r1, 760 + Math.sin(a) * r1); x.stroke() } x.restore(); K.label(x, 'SLAP!', 560, 760, { size: 54, bg: '#f2c75c', pop: 1 - sp * 0.3, rot: -0.1 }) }
      return
    }
    // ── CH 4: the door
    K.uranus(x, t, { noEntry: true, x: 200, y: 600, size: 230, mood: t < YES ? 'sly' : t < 74.2 ? 'love' : 'proud', look: [1, 0.8], hops: [YES + 0.2, YES + 0.7, 74.3] })
    const knock = t > KNOCK - 0.1 && t < KNOCK + 0.3 ? Math.sin(prog(t, KNOCK - 0.1, KNOCK + 0.3) * Math.PI * 2) * 14 : 0
    K.sign(x, t, 'aquarius', { x: 420 + knock, y: 1400, s: 300, mood: t < SAY ? 'wide' : t < YES ? 'squint' : 'heart', look: [1, -0.2], hops: [YES, YES + 0.4, YES + 0.8, 74.4, 74.8], sweat: t > LOAD && t < WAITED, blush: t > SAY ? 0.9 : undefined, shadow: true })
    const ck = K.pop01(t, OPEN + 0.1, 0.35)
    if (ck > 0) K.sign(x, t, CRUSH, { x: 820, y: 1320, s: 280, pop: ck, glyph: false, seed: 4, mood: t < WAITED ? 'wide' : t < YES ? 'wink' : 'happy', look: [-1, 0], hops: [YES + 0.1, YES + 0.5, 74.5, 74.9] })
    // Pisces in the bushes with a SAY IT sign
    const pk = K.pop01(t, DOOR + 1.0, 0.4)
    if (pk > 0) {
      const up = t > PIS ? 1 : 0.6
      x.save(); x.translate(960, 1600 - 60 * up); x.scale(pk, pk); x.rotate(0.06 * Math.sin(t * 3)); x.fillStyle = '#140c28'; x.fillRect(-8, 0, 16, 140); K.box(x, -110, -70, 220, 90, '#fffaf0', { o: 5 }); K.txt(x, 'SAY IT', 0, -24, { size: 40, font: K.INTER, weight: 900, color: '#e8628a' }); x.restore()
      K.pisces(x, t, { x: 880, y: 1720 - 40 * up, s: 220, pop: pk, tears: t > YES ? 3 : 2, hops: [PIS + 0.4, PIS + 1.2] })
    }
  },
  over(x, t, K) {
    if (t > C2 - 0.2 && t < C3 + 0.3) { whiteboard(x, t, K, K.pop01(t, C2 + 0.2, 0.35) * K.outK(t, [C3 - 0.3, C3])); planProp(x, t, K) }
    // the astrology lens sticker
    const lk = K.win(t, 9.6, 12.6)
    if (lk > 0.01) K.label(x, 'IN ASTROLOGY: URANUS RULES AQUARIUS', 540, 1080, { size: 30, bg: '#7fe3ff', pop: lk, rot: -0.04 })
  },
  lines: [
    { t0: 6.4, t1: 9.2, who: 'aquarius', text: 'There’s someone. I *like* them. Ugh.', x: 640, y: 1760, tailUp: true, tail: 100 },
    { t0: 9.4, t1: 12.6, who: 'uranus', text: 'In astrology, I rule *you.* So I get it.', x: 560, y: 420, tail: -220, maxW: 760 },
    { t0: 12.8, t1: 15.4, who: 'aquarius', text: 'I refuse to be *normal* about it.', x: 640, y: 1760, tailUp: true, tail: 100 },
    { t0: 15.6, t1: 19.6, who: 'uranus', text: 'Then let’s be *unexpected.*', x: 560, y: 420, tail: -220 },
    { t0: PA + 0.2, t1: 23.3, who: 'aquarius', text: 'I’ll send it *in binary.*', x: 600, y: 1800, tailUp: true, tail: 220 },
    { t0: 24.2, t1: 26.4, who: 'uranus', text: 'Too weird. *Even for me.*', x: 560, y: 380, tail: -300 },
    { t0: PB + 0.2, t1: 28.9, who: 'aquarius', text: 'A banner. *In the sky.*', x: 600, y: 1800, tailUp: true, tail: 220 },
    { t0: 29.8, t1: 31.8, who: 'uranus', text: 'They’d need *binoculars.*', x: 560, y: 380, tail: -300 },
    { t0: PC + 0.2, t1: 34.3, who: 'aquarius', text: 'Twelve clues. *One* answer.', x: 600, y: 1800, tailUp: true, tail: 220 },
    { t0: 35.2, t1: 37.6, who: 'uranus', text: 'They’d still be *looking.* In March.', x: 560, y: 380, tail: -300, maxW: 760 },
    { t0: 42.2, t1: 46.0, who: 'aquarius', text: 'Truth? Plain feelings feel… *exposed.*', x: 600, y: 1780, tailUp: true, tail: 140, maxW: 720 },
    { t0: 46.8, t1: 49.6, who: 'uranus', text: 'The most unexpected thing *you* could do…', x: 540, y: 380, tail: 0, maxW: 820 },
    { t0: 49.8, t1: 53.4, who: 'uranus', text: '…is say it *simply.*', x: 540, y: 380, tail: 0, size: 54 },
    { t0: SAY, t1: 63.0, who: 'aquarius', text: 'I like you. That’s it. *That’s the message.*', x: 460, y: 1780, tailUp: true, tail: -40, maxW: 760 },
    { t0: WAITED, t1: 66.6, who: 'the crush', color: CC, text: 'I’ve been waiting for you to be *normal* about it.', x: 620, y: 880, tail: 180, maxW: 740 },
    { t0: YES, t1: 68.6, who: 'the crush', color: CC, text: '*Yes.* (laughing)', x: 700, y: 880, tail: 120, size: 54 },
    { t0: PIS + 0.2, t1: 71.6, who: 'pisces', text: 'I’m *SO* proud!!', x: 680, y: 1440, tail: 200 },
    { t0: 74.2, t1: 76.8, who: 'uranus', text: 'Told you. *Unexpected.*', x: 520, y: 780, tail: -260 },
  ],
  heads: [
    { at: 2.6, text: 'Stay for the | *most unexpected move.*', out: [5.6, 5.85], top: 240, size: 92 },
    { at: TIP + 0.3, text: 'Uranus spins on its side. | *True.* Still chill.', out: [41.8, 42.05], top: 240, size: 78 },
    { at: LAST, text: 'Plainly. | *The wildest thing I’ve done.*', top: 240, size: 92, out: [D - 0.5, D - 0.2] },
  ],
  fx: [
    ...CH.map(c => ({ f: HK.chapter, c: HK.chapterCues, o: c })),
    ...PLANS.map(p => ({ f: HK.glitch, c: HK.glitchCues, o: { at: p.g, len: 1.0, text: p.exe, buttons: ['TOO WEIRD', 'OK'] } })),
    { f: HK.whipZoom, c: HK.whipZoomCues, o: { at: QUIET, len: 0.5, from: 1.35 } },
    { f: HK.loadingBar, c: HK.loadingBarCues, o: LOADB },
    { f: HK.whipZoom, c: HK.whipZoomCues, o: { at: DOOR, len: 0.45, from: 1.5 } },
  ],
  cues: [
    ['boom', 0.32, 0.3], ['pop', 0.32, 1318.51, 0.06, 0], ['glitter', 0.32, 1.2],
    ['bell', 9.6, 783.99, 0.04, 2, 0],
    ...PLANS.map(p => ['pop', p.at, 659.25, 0.05, 0]),
    ['whoosh', TIP, 0.5, 0.05], ['tom', TIP + 0.5, 120, { gain: 0.15, decay: 0.3 }],
    ...[0, 0.25, 0.5].map(d => ['tom', r3(KNOCK + d), 200, { gain: 0.2, decay: 0.15 }]),
    ['whoosh', OPEN, 0.4, 0.05], ['bell', OPEN + 0.2, 659.25, 0.04, 2, 0],
    ['glitter', YES, YES + 1.4], ['crash', YES, { gain: 0.04, len: 2 }], ['glitter', PIS, PIS + 1],
  ],
  music: { style: 'synthwave', key: 'Gm', seed: 8111, sections: { drop: 0.5, breakdown: [C2, QUIET], lift: [C3, DOOR, YES] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
