// kpmae01: PLANET TALK: MARS, Ep 1 · ♈ Aries (Mars's home sign) · "Mars trains Aries for one ask"
// (74.5 s vertical, long, star_talk, funk · E). Hard cut. Chapter stickers, a beat every 8–10 s, the payoff promised
// up front ("stay for their answer") and paid at the end. Look: ../marskit.js (shared by kpmae01–12).
//   0.00 frame 0: Mars mid-crash through the gym ceiling in a red dust cloud, ♈ Aries frozen mid-push-up below.
//        Hook: "ARIES. Today you ask them out."   0.1 lands (shake).   1.0 Mars: "COACH MARS. Reporting for duty."
//   3.2  the promise tag: STAY FOR THEIR ANSWER.
//   6.0  ch 1 THE CRUSH. Aries: "someone at the climbing wall. three weeks of eye contact."   9.8 Mars: "Three WEEKS?"
//  12.6  Aries: "I'll do it RIGHT NOW."  14.8 Mars, beaming: "That's my sign! But first: training."
//  19.0  ch 2 THE TRAINING. Rep 1: eye contact ("Hold it. Smile. Don't stare."). Rep 2: say hi to a mirror ("HI!!!" →
//        "Softer." → "hi. :)"). Rep 3: a good question (a talk card: "What's something you're looking forward to?";
//        "Questions beat pickup lines.").  34.6 ACHIEVEMENT: training complete.  37.0 ♓ Pisces on the bench: sobbing.
//  40.0  ch 3 THE OVERSHOOT. Aries sprints at the wall mid-climb ("NOW NOW NOW—"); Mars body-blocks: record scratch,
//        "they're mid-climb." 44.6 "Bold isn't rushing them." 47.4 "…huh. I needed that one too." 50.2 "Wait till
//        they're down. Then ask clearly."  53.6 ♎ climbs down.
//  56.0  ch 4 THE ASK. Aries walks over: "Hey. I'm Aries. Coffee Saturday?"  60.8 the long beat (loading the answer…)
//  63.8  ♎: "yes. I was hoping you'd ask."  67.0 Pisces: "I'm on the BENCH and I'm crying."
//  70.6  the line slams: "Bold. And kind."   72.0 Mars, voice cracking: "That's my sign."  Hold, hard cut at 74.5.
import {
  makeEpisode, drawSign, entrance, drawEntranceFx, entranceCues, pisces, dust, flash, hearts, rr, talkCard, speedLines,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../marskit.js'
import { screenShake, shakeCues, chapter, chapterCues, recordScratch, recordScratchCues, achievement, achievementCues, loadingBar, loadingBarCues } from '../../hookkit.js'

const D = 74.5
const IN = { at: -0.6, x: 430, y: 620, size: 360 }
const T = {
  land: 0.1, promise: [3.2, 5.9], ch: [6.0, 19.0, 40.0, 56.0],
  sprint1: 12.6, reps: [19.4, 23.6, 29.2], mirror: [23.4, 29.0], card: [29.4, 34.3], ach: 34.6, pis: 37.0,
  sprint2: [40.3, 42.5], block: [41.9, 42.4], rec: 42.6, back: [44.2, 44.8], down: [53.6, 55.6], walk: [56.4, 57.6],
  wait: 60.8, yes: 63.8, pis2: 67.0, last: 70.6, sign: 72.0, mUp: [53.0, 53.6],
}
const REC = { at: T.rec, len: 1.6, caption: 'they’re *mid-climb.*', top: 760 }
const B = (t0, t1, who, text, o = {}) => ({ t0, t1, who, text, x: 540, y: 1120, tail: who === 'mars' ? -120 : -220, tailUp: who === 'mars', ...o })
const BUB = [
  B(1.0, 3.0, 'mars', 'COACH MARS. Reporting for *duty.*'),
  B(6.3, 9.6, 'aries', 'someone at the climbing wall. three weeks of *eye contact.*', { maxW: 760 }),
  B(9.8, 12.4, 'mars', 'Three WEEKS? Why haven’t you *asked?*'),
  B(12.6, 14.6, 'aries', 'I’ll do it *RIGHT NOW.*', { shake: 3 }),
  B(14.8, 18.7, 'mars', 'That’s my sign! But first: *training.*'),
  B(19.8, 23.2, 'mars', 'Hold it. Smile. Don’t *stare.*'),
  B(24.0, 25.2, 'aries', 'HI!!!', { size: 64, shake: 6 }),
  B(25.4, 26.6, 'mars', '*Softer.*'),
  B(26.8, 29.0, 'aries', 'hi. :)', { size: 40 }),
  B(31.0, 34.2, 'mars', 'Questions beat *pickup lines.*', { x: 320, y: 1080, maxW: 420 }),
  B(37.0, 39.7, 'pisces', 'the montage got me. I’m *sobbing.*', { x: 520, y: 1520, tail: -280, tailUp: false }),
  B(40.5, 42.3, 'aries', 'NOW NOW *NOW—*', { y: 820, shake: 5 }),
  B(44.6, 47.2, 'mars', 'Bold isn’t *rushing* them.', { y: 820, tail: 60, tailUp: false }),
  B(47.4, 50.0, 'mars', '…huh. I needed that one *too.*', { y: 820, tail: 60, tailUp: false }),
  B(50.2, 53.0, 'mars', 'Wait till they’re down. Then ask *clearly.*', { y: 820, tail: 60, tailUp: false }),
  B(57.8, 60.6, 'aries', 'Hey. I’m Aries. Coffee *Saturday?*', { tail: 100, tailUp: false }),
  B(63.8, 66.8, 'libra', 'yes. I was *hoping* you’d ask.', { tail: 220, tailUp: false }),
  B(67.0, 69.8, 'pisces', 'I’m on the BENCH and I’m *crying.*', { x: 520, y: 1520, tail: -280, tailUp: false }),
  B(72.0, 1e9, 'mars', '(voice cracking) That’s my *sign.*', { y: 1000, tail: -120, tailUp: true }),
]
const SHAKE = { at: T.land, len: 0.55, amp: 32 }
const CH = ['THE CRUSH', 'THE TRAINING', 'THE OVERSHOOT', 'THE ASK'].map((title, i) => ({ at: T.ch[i], out: [T.ch[i] + 3.2, T.ch[i] + 3.5], n: i + 1, title, y: 140 }))
const ACH = { at: T.ach, out: [36.8, 37.1], title: 'ACHIEVEMENT UNLOCKED', text: 'training *complete*', icon: '♈︎', y: 720 }
const LOAD = { at: T.wait, len: 2.8, label: 'loading their answer…', stallAt: 99, error: null, y: 1010 }
const REPS = ['REP 1 · EYE CONTACT', 'REP 2 · SAY HI (TO A MIRROR)', 'REP 3 · A GOOD QUESTION']
const HOLDS = Array.from({ length: 22 }, (_, i) => [740 + ((i * 97) % 300), 330 + ((i * 151) % 1100), ['#ff5c8e', '#7dffb0', GOLD, '#7fe0ff', '#c9a6ff'][i % 5], 14 + (i % 3) * 6])

function gym(x, t) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#1e1238'); g.addColorStop(0.72, '#2c1a4c'); g.addColorStop(0.73, '#3a2a6a'); g.addColorStop(1, '#251a48'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // climbing wall
  x.fillStyle = '#4a3a7a'; x.beginPath(); x.moveTo(700, 270); x.lineTo(1080, 250); x.lineTo(1080, 1400); x.lineTo(720, 1400); x.closePath(); x.fill()
  for (const [hx, hy, c, r] of HOLDS) { x.fillStyle = c; x.beginPath(); x.ellipse(hx, hy, r, r * 0.8, hx * 0.01, 0, Math.PI * 2); x.fill() }
  // the belay rope from the top
  x.strokeStyle = '#f2c75c'; x.lineWidth = 4; x.beginPath(); x.moveTo(900, 250); x.lineTo(880, 1400); x.stroke()
  // mats
  x.fillStyle = '#2a8fd0'; rr(x, 60, 1520, 600, 60, 14); x.fill(); x.fillStyle = '#2479b4'; rr(x, 60, 1560, 600, 30, 14); x.fill()
  x.fillStyle = '#e5573b'; rr(x, 720, 1440, 340, 90, 14); x.fill()
  // ceiling, with the Mars-shaped hole (a crash, not tidy)
  x.fillStyle = '#120a26'; x.fillRect(0, 0, 1080, 140)
  const hole = t > -0.15
  if (hole) { x.fillStyle = '#07041a'; x.beginPath(); for (let i = 0; i <= 14; i++) { const a = i / 14 * Math.PI, r = 200 + ((i * 37) % 30); x.lineTo(430 + Math.cos(a) * r, 140 - Math.sin(a) * 120 * 0.9) } x.closePath(); x.fill()
    x.fillStyle = '#fff6dc'; for (let i = 0; i < 6; i++) x.fillRect(280 + i * 55, 40 + (i % 3) * 25, 4, 4) }
  x.fillStyle = '#3a2a5a'; x.fillRect(0, 136, 1080, 8)
}
function tiles(x, t) {   // ceiling tiles falling at frame 0
  const p = clamp((t + 0.5) / 1.6)
  if (p >= 1) return
  for (let i = 0; i < 9; i++) {
    const X = 260 + i * 42 + Math.sin(i * 3) * 40, Y = 120 + p * p * (900 + i * 60)
    x.save(); x.globalAlpha = 1 - p; x.translate(X, Y); x.rotate(p * (i % 2 ? 4 : -3)); x.fillStyle = i % 2 ? '#3a2a5a' : '#5a4a7a'; x.fillRect(-34, -14, 68, 28); x.restore()
  }
}
function mirror(x, t, A) {
  if (t < T.mirror[0] || t > T.mirror[1] + 0.3) return
  const k = pop01(t, T.mirror[0], 0.3, 1.8) * outK(t, [T.mirror[1], T.mirror[1] + 0.3])
  x.save(); x.translate(600, 1300); x.scale(k, k)
  x.fillStyle = '#8a7fa0'; rr(x, -110, -230, 220, 420, 20); x.fill(); x.fillStyle = '#bfe6ff'; rr(x, -96, -216, 192, 392, 14); x.fill()
  x.save(); rr(x, -96, -216, 192, 392, 14); x.clip(); x.globalAlpha = 0.7; drawSign(x, 'aries', 0, 30, 200, t, { mood: A.mood, look: [-1, 0], glyph: false }); x.restore()
  x.restore()
}

function draw(x, t, K) {
  gym(x, t)
  // ♎ on the wall: climbing, then down at the end of ch 3
  const dn = ease.inOutCubic(prog(t, ...T.down))
  const climb = t < T.down[0] ? Math.sin(t * 0.6) * 40 : 0
  const lx = lerp(890, 850, dn), ly = lerp(560 + climb, 1350, dn)
  drawSign(x, 'libra', lx, ly, 220, t, { mood: t < T.yes - 2.4 ? 'happy' : t < T.yes ? 'neutral' : 'heart', look: t < T.walk[0] ? [-0.5, 0.5] : [-1, 0], hops: t > T.yes ? [T.yes + 0.1, T.yes + 0.5, T.yes + 0.9] : [], shadow: dn > 0.9, seed: 7 })
  // Pisces on the bench, holding a belay rope to nothing
  x.fillStyle = '#6a4a36'; rr(x, 40, 1700, 260, 24, 8); x.fill(); x.fillRect(60, 1724, 14, 60); x.fillRect(266, 1724, 14, 60)
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.moveTo(220, 1640); x.quadraticCurveTo(300, 1500, 360, 1660); x.stroke()
  const pc = (t > T.pis - 0.5 && t < 40) || t > T.pis2 - 0.3
  pisces(x, t, 170, 1620, 180, { mood: pc ? 'sparkle' : 'happy', tears: pc ? 3 : 1, look: [1, -0.6], hops: [37.1, 37.5, 37.9, 38.3, 67.1, 67.5, 67.9, 68.3, 68.7], squash: pc ? 0.05 * Math.sin(t * 22) : 0 })
  // Aries
  let ax = 330, asq = 0, am = 'wide'
  if (t < 1) { asq = 0.18 * Math.sin(t * 12) ** 2; am = 'wide' }
  else if (t < 6) am = 'happy'
  else if (t < 9.8) am = 'heart'
  else if (t < 14.8) { am = 'wide'; if (t > T.sprint1 && t < 14.6) ax = 330 + 60 * Math.sin((t - T.sprint1) * 9) }
  else if (t < 19) am = 'sparkle'
  else if (t < 23.4) am = t % 2.2 < 0.15 ? 'neutral' : 'squint'
  else if (t < 29) am = t < 25.4 ? 'wide' : 'happy'
  else if (t < 40) am = 'happy'
  if (t >= T.sprint2[0] && t < T.back[1]) {
    const run = ease.inQuad(prog(t, T.sprint2[0], T.block[1])), back = ease.inOutCubic(prog(t, ...T.back))
    ax = lerp(lerp(330, 560, run), 330, back); am = t < T.rec ? 'angry' : 'wide'; asq = t > T.block[1] && t < T.rec + 0.1 ? 0.18 : 0
  } else if (t >= 44.8 && t < T.walk[0]) am = t < 50 ? 'neutral' : 'squint'
  if (t >= T.walk[0]) { ax = lerp(330, 620, ease.inOutCubic(prog(t, ...T.walk))); am = t < T.wait ? 'neutral' : t < T.yes ? 'wide' : 'heart' }
  const ariesPose = { mood: am }
  mirror(x, t, ariesPose)
  drawSign(x, 'aries', ax, 1410, 280, t, { mood: am, look: t < T.walk[0] && t > 19 && t < 23.4 ? [0, 0] : t < 40 ? [0.4, -1] : [1, -0.4], squash: asq, sweat: t > T.wait && t < T.yes, hops: [6.4, 6.9, 7.5, 12.7, 13.1, 13.5, 26.9, 57.9, 58.4, 58.9, T.yes + 0.1, T.yes + 0.5, T.yes + 0.9], shadow: true })
  if (t > T.sprint2[0] && t < T.block[1]) speedLines(x, t, ax, 1410, 0.8)
  hearts(x, t, T.yes + 0.1, 740, 1300, { n: 16 }); hearts(x, t, T.yes + 0.8, 640, 1250, { n: 10, seed: 9 })
  // the talk card (rep 3)
  talkCard(x, t, { at: T.card[0], out: [T.card[1], T.card[1] + 0.3], cx: 800, cy: 960, w: 410, text: 'What’s | something you’re | looking *forward* to?', rot: -0.05 })
  // Mars
  tiles(x, t)
  const P = entrance('crash', t, IN)
  drawEntranceFx(x, 'mars', 'crash', t, IN)
  dust(x, t, T.land - 0.05, 430, 760, { R: 460, seed: 3, n: 34 })
  const blk = ease.outCubic(prog(t, ...T.block)) * (1 - ease.inOutCubic(prog(t, ...T.mUp)))
  const mx = lerp(P.x, 640, blk), my = lerp(P.y, 1290, blk), ms = lerp(P.size, 300, blk)
  let mm = 'angry'
  if (t > 3) mm = 'happy'; if (t > 9.8) mm = 'wide'; if (t > 14.8) mm = 'proud'; if (t > 19) mm = 'neutral'; if (t > 24 && t < 25.4) mm = 'wide'
  if (t > 25.4) mm = 'happy'; if (t > T.ach) mm = 'love'; if (t > 40) mm = 'angry'; if (t > 44.6) mm = 'neutral'; if (t > 47.4) mm = 'sad'; if (t > 50.2) mm = 'happy'
  if (t > T.wait) mm = 'wide'; if (t > T.yes) mm = 'love'; if (t > T.sign) mm = 'cry'
  K.mars(mx, my, ms, { rot: P.rot, squash: P.squash + (t > T.block[1] && t < T.rec + 0.1 ? 0.15 : 0), alpha: P.alpha, mood: mm, tears: t > T.sign ? 2 : 0, panic: (t > 9.8 && t < 12.4) || (t > T.wait && t < T.yes), look: t < 40 ? [-0.4, 1] : [0.6, 0.4],
    hops: [1.1, 1.7, 2.3, 9.9, 10.5, 11.2, 14.9, 15.5, 16.3, 17.2, 20.0, 20.7, 25.5, 31.1, 31.8, 32.6, 44.7, 45.4, 50.3, 51.0, 51.8, 72.1, 72.7, 73.3] })
  // rep labels + the promise tag
  REPS.forEach((s, i) => {
    const at = T.reps[i], k = pop01(t, at, 0.25, 2.2) * outK(t, [at + 3.4, at + 3.6])
    if (k <= 0.01) return
    x.save(); x.translate(540, 345); x.scale(k, k); x.rotate(0.03)
    x.font = `800 46px ${INTER}`; const w = x.measureText(s).width + 60
    x.fillStyle = INK; rr(x, -w / 2 - 6, -42, w + 12, 84, 18); x.fill(); x.fillStyle = '#7dffb0'; rr(x, -w / 2, -36, w, 72, 14); x.fill()
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore()
  })
  const pk = pop01(t, T.promise[0], 0.3, 2.2) * outK(t, [T.promise[1], T.promise[1] + 0.2])
  if (pk > 0.01) {
    x.save(); x.translate(540, 1000); x.scale(pk, pk); x.rotate(-0.04)
    x.font = `800 50px ${INTER}`; const s = 'STAY FOR THEIR ANSWER ↓', w = x.measureText(s).width + 70
    x.fillStyle = INK; rr(x, -w / 2 - 6, -48, w + 12, 96, 48); x.fill(); x.fillStyle = GOLD; rr(x, -w / 2, -42, w, 84, 42); x.fill()
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 3); x.restore()
  }
}
function over(x, t) {
  flash(x, t, T.land, { col: '#ffc0a0', d: 0.22, a: 0.6 })
  flash(x, t, T.yes, { col: '#ffe6f0', d: 0.3, a: 0.4 })
  // the long beat: everything dims a little while the answer loads
  const dim = Math.sin(Math.PI * prog(t, T.wait, T.yes))
  if (dim > 0.01) { x.fillStyle = `rgba(6,4,18,${0.35 * dim})`; x.fillRect(0, 0, 1080, 1920) }
}

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae01', duration: D, end: 'cut',
  hook: { at: -1, text: 'ARIES. Today you | ask them *out.*', out: [2.9, 3.1], top: 280 },
  bubbles: BUB, draw, over, freeze: [REC],
  overlays: [screenShake(SHAKE), ...CH.map(chapter), achievement(ACH), recordScratch(REC), loadingBar(LOAD), screenShake({ at: 24.05, len: 0.4, amp: 16, seed: 3 }), screenShake({ at: T.block[1], len: 0.4, amp: 24, seed: 5 })],
  last: { at: T.last, text: 'Bold. And *kind.*', top: 300, size: 118 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('crash', IN), ['crash', 0.0, { gain: 0.05 }], ...Array.from({ length: 6 }, (_, i) => ['tick', +(0.15 + i * 0.09).toFixed(2), 0.03]),
    popCue(T.promise[0], 1174.66, 0.05, 0), ['bell', T.promise[0] + 0.05, 1760, 0.03, 0.8, 0],
    ...CH.flatMap(c => chapterCues(c)),
    ...[13.0, 13.25, 13.5, 13.75].map(s => ['tick', s, 0.03]),
    ...T.reps.map(r => popCue(r, 880, 0.05, 0)), ...T.reps.map(r => ['whoosh', r - 0.1, 0.3, 0.03]),
    ...shakeCues({ at: 24.05, len: 0.4 }), ['whoosh', T.mirror[0], 0.3, 0.03], ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[0] + 0.3, 1318.51, 0.04, 0.6, 0.2],
    ...achievementCues(ACH), ...sobCues(37.2, 4), ...sobCues(38.5, 3),
    ['riser', T.sprint2[0], T.block[1], 0.05], ...shakeCues({ at: T.block[1], len: 0.4 }), ...recordScratchCues(REC),
    ['whoosh', T.back[0], 0.4, 0.03], ['pluck', 47.6, 587.33, 0.03, 0.8, 0], ['whoosh', T.down[0], 1.6, 0.03], ['whoosh', T.mUp[0], 0.5, 0.03],
    ...[56.5, 56.8, 57.1, 57.4].map(s => ['tick', s, 0.03]),
    ...loadingBarCues(LOAD), ...Array.from({ length: 6 }, (_, i) => ['tom', +(T.wait + 0.2 + i * 0.45).toFixed(2), 70, { gain: 0.12, decay: 0.2 }]),
    popCue(T.yes, 1318.51, 0.06, 0.2), popCue(T.yes + 0.08, 1567.98, 0.05, 0.2), ['glitter', T.yes, T.yes + 1.2], ['bell', T.yes + 0.1, 1760, 0.04, 1.4, 0],
    ...sobCues(67.2, 4), ...sobCues(68.5, 3), ['pluck', T.sign + 0.3, 523.25, 0.03, 0.9, 0],
  ],
})
