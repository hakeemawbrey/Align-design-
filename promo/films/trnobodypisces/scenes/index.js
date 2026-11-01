// trnobodypisces: NOBODY: · "Pisces watching a sock ad:" (15 s vertical, Star Talk Trends §2.5, music: chiptune · F#)
// Story 0–10.6, then the shared end card. The format's look lives in ./nobody.js (identical in all five NOBODY: films).
//   0.00–2.72  "Nobody:"  the blank meme card, a blinking caret, crickets, a tumbleweed. Silence.
//   2.72       card cut → "Pisces watching *a sock ad:*" (drop 2.82). A couch, a pixel TV. ♓ Pisces and ♉ their date
//              (popcorn). On TV, a commercial: one lonely sock in a laundry basket… another sock appears… they run…
//              they reunite (heart). SOFT SOCKS · NOW IN PAIRS. Pisces: sniffle → streams → fountains.
//   4.9        ♓: "they found *each other…*"
//   5.6–7.3    the escalation: ♉, eyes never leaving the TV, passes a tissue. Then another. Then the whole box.
//   7.75       "*Soft* hours."  Both happy; Pisces still crying (happy tears count).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import {
  makeNobody, T, GOLD, BONE, INK, INTER, MEME, R, r3, pop01, drawBits, sparkles, hearts, star, pisces, TISSUE, HEART,
} from './nobody.js'

const TAU = signStar('taurus')
const PSP = `${signStar('pisces').glyph}︎ PISCES`
const LINES = [{ t: 4.9, speaker: PSP, color: '#b9b2ff', text: 'they found *each other…*' }]

const E = { tv: 2.95, solo: 3.1, enter: [3.6, 3.95], run: [4.2, 4.75], tag: 4.95, tis: [5.6, 6.3], box: 7.0 }
const TV = { x: 300, y: 545, w: 480, h: 345 }, SCR = { x: 330, y: 572, w: 420, h: 285 }
const SOCK = ['.CCCC..', '.WWWW..', '.CCCC..', '.CKCK..', '.CCCC..', '.CCCCC.', '.CCCCCC', '..CCCCC']
const PIS_P = { x: 350, y: 1062, s: 240 }, TAU_P = { x: 740, y: 1068, s: 230 }
const PIS_HOPS = [T.drop + 0.1, 3.75, E.run[1] + 0.05, 4.95, 5.4, E.tis[0] + 0.45, E.tis[1] + 0.45, E.box + 0.45, T.PLate + 0.05]
const TAU_HOPS = [T.drop + 0.2, 3.3, 4.0, 4.7, 5.6, 6.3, 7.0, T.PLate + 0.2]
const BOXBM = ['..W.W..', '.WWWWW.', 'BBBBBBB', 'BPBBBPB', 'BBBBBBB', 'BBBBBBB']

function tv(x, t, k) {
  const tk = pop01(t, E.tv, 0.4, 1.8) * k
  if (tk <= 0.01) return
  x.save(); x.translate(540, 720); x.scale(tk, tk); x.translate(-540, -720)
  // antenna + stand
  R(x, INK, 470, 470, 8, 80); R(x, INK, 600, 480, 8, 70); R(x, INK, 462, 466, 24, 12); R(x, INK, 592, 476, 24, 12)
  R(x, INK, 500, TV.y + TV.h, 80, 40); R(x, INK, 440, TV.y + TV.h + 34, 200, 18)
  R(x, 'rgba(6,4,18,0.5)', TV.x + 14, TV.y + 16, TV.w, TV.h)
  R(x, INK, TV.x - 6, TV.y - 6, TV.w + 12, TV.h + 12); R(x, '#8f97b5', TV.x, TV.y, TV.w, TV.h); R(x, '#b9c0d8', TV.x, TV.y, TV.w, 8)
  // the commercial
  x.save(); x.beginPath(); x.rect(SCR.x, SCR.y, SCR.w, SCR.h); x.clip()
  R(x, '#ffe9c7', SCR.x, SCR.y, SCR.w, SCR.h); R(x, '#ffd7a8', SCR.x, SCR.y + 190, SCR.w, SCR.h - 190)
  // the laundry basket
  R(x, INK, 360, 760, 130, 70); R(x, '#c98b4a', 366, 766, 118, 58); for (let i = 0; i < 5; i++) R(x, '#a0703c', 372 + i * 24, 770, 8, 50)
  const run = ease.inOutCubic(prog(t, ...E.run)), ent = ease.outCubic(prog(t, ...E.enter))
  const sad = t < E.enter[0]
  const ax = lerp(425, 505, run), ay = lerp(735, 770, run) - (run > 0 && run < 1 ? Math.abs(Math.sin(run * 12)) * 16 : 0)
  const bx = lerp(lerp(800, 680, ent), 580, run), by = 770 - (run > 0 && run < 1 ? Math.abs(Math.sin(run * 12 + 1)) * 16 : 0)
  drawBits(x, SOCK, { C: '#ff8fb1', W: BONE, K: INK }, ax, ay, 9, { rot: sad ? -0.25 + 0.03 * Math.sin(t * 3) : -0.05 })
  if (t > E.enter[0]) drawBits(x, SOCK, { C: '#ff8fb1', W: BONE, K: INK }, bx, by, 9, { sx: -1, rot: 0.05 })
  if (sad && t > E.solo) { x.font = `700 26px ${INTER}`; x.fillStyle = 'rgba(27,18,54,0.6)'; x.textAlign = 'center'; x.fillText('…', 425, 660) }
  if (t > E.run[1]) {
    drawBits(x, HEART, { H: '#ff4f86' }, 542, 690 - 8 * Math.sin((t - E.run[1]) * 6), 9 * pop01(t, E.run[1], 0.3, 2.6))
  }
  const tg = pop01(t, E.tag, 0.3, 2.2)
  if (tg > 0.01) {
    x.save(); x.translate(540, 830); x.scale(tg, tg)
    R(x, INK, -190, -22, 380, 44); x.font = `800 24px ${INTER}`; x.fillStyle = MEME; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('SOFT SOCKS · NOW IN PAIRS', 0, 2); x.restore()
  }
  // scanlines
  x.fillStyle = 'rgba(0,0,0,0.06)'; for (let y = SCR.y; y < SCR.y + SCR.h; y += 6) x.fillRect(SCR.x, y, SCR.w, 2)
  x.restore()
  // the screen's glow on the room
  x.restore()
}

function couch(x, front, k) {
  x.save(); x.globalAlpha *= clamp(k)
  if (!front) {
    R(x, INK, 160, 1000, 760, 170); R(x, '#5a4aa8', 166, 1006, 748, 158); R(x, '#6e5ec0', 166, 1006, 748, 12)
    R(x, '#4a3c92', 536, 1020, 8, 140)
  } else {
    R(x, INK, 160, 1170, 760, 140); R(x, '#6e5ec0', 166, 1176, 748, 128); R(x, '#8476d6', 166, 1176, 748, 12)
    R(x, INK, 120, 1080, 80, 230); R(x, '#6e5ec0', 126, 1086, 68, 218); R(x, INK, 880, 1080, 80, 230); R(x, '#6e5ec0', 886, 1086, 68, 218)
    for (const lx of [170, 880]) R(x, INK, lx, 1310, 30, 40)
  }
  x.restore()
}

function scene(x, t, Tm, k) {
  if (k <= 0) return
  // the TV's light flickers over the room
  const gl = 0.12 + 0.04 * Math.sin(t * 9) * Math.sin(t * 2.3)
  const g = x.createRadialGradient(540, 760, 0, 540, 900, 700); g.addColorStop(0, `rgba(255,233,199,${gl * k})`); g.addColorStop(1, 'rgba(255,233,199,0)'); x.fillStyle = g; x.fillRect(0, 450, 1080, 1000)
  tv(x, t, k)
  const ck = pop01(t, Tm.drop - 0.05, 0.36, 1.8) * k
  couch(x, false, ck)
  // ♓ Pisces: sniffle → streams → fountains
  const pp = pop01(t, Tm.drop, 0.36, 2.1) * k
  const tears = t < E.solo + 0.3 ? 0 : t < E.enter[0] + 0.2 ? 1 : t < E.run[1] ? 2 : 3
  let pm = t < E.solo + 0.3 ? 'happy' : 'sparkle'
  if (t > Tm.PLate) pm = 'happy'
  pisces(x, t, { ...PIS_P, pop: pp }, tears, pm, [0.4, -1], { glyph: signStar('pisces').glyph, glow: 1.1 })
  // ♉ Taurus: eyes on the TV, munching, never looks
  const tp = pop01(t, Tm.drop + 0.12, 0.36, 2.1) * k
  star(x, t, { ...TAU_P, pop: tp }, { color: TAU.color, glyph: TAU.glyph, mood: t > Tm.PLate ? 'happy' : 'neutral', look: t > Tm.PLate ? undefined : [-0.4, -1], hops: TAU_HOPS, seed: 9 })
  couch(x, true, ck)
  // popcorn
  if (tp > 0.3) {
    R(x, INK, 790, 1160, 120, 50); R(x, '#e2394f', 796, 1166, 108, 38); for (let i = 0; i < 4; i++) R(x, BONE, 800 + i * 26, 1166, 12, 38)
    for (let i = 0; i < 7; i++) R(x, i % 2 ? '#fff6d8' : '#ffe9a0', 800 + (i * 37) % 100, 1140 + (i * 13) % 20, 18, 18)
  }
  // the hand-offs: tissue, tissue, the whole box (Taurus never looks)
  const pile = []
  ;[E.tis[0], E.tis[1], E.box].forEach((h, i) => {
    if (t < h) return
    const f = ease.inOutCubic(prog(t, h, h + 0.45))
    const px = lerp(660, 520 - i * 6, f), py = lerp(1140, 1150 - i * 22, f) - Math.sin(f * Math.PI) * 110
    pile.push([px, py, i])
  })
  for (const [px, py, i] of pile) drawBits(x, i === 2 ? BOXBM : TISSUE, { W: '#ffffff', B: '#7fd0f0', P: '#ff8fb1' }, px, py, i === 2 ? 9 : 7, { rot: i === 2 ? 0 : 0.2 * (i ? -1 : 1) })
  sparkles(x, t, PIS_P.x, PIS_P.y - 40, Tm.PLate, 10, 170, 2, ['#b9b2ff', BONE, GOLD])
  if (t > Tm.PLate) hearts(x, t, 550, 1000, Tm.PLate + 0.05, 5, 2)
}

const EP = makeNobody({
  caption: 'Pisces watching *a sock ad:*', capAccent: '#5b52d6',
  last: '*Soft* hours.', lastAccent: '#b9b2ff',
  lines: LINES,
  scene,
  cues: Tm => [
    ['pop', r3(Tm.drop + 0.02), 659.25, 0.04, -0.3], ['pop', r3(Tm.drop + 0.14), 880, 0.035, 0.3],
    ['tick', E.tv, 0.05], ['pop', r3(E.tv + 0.1), 1318.51, 0.02, 0],
    // the ad: a sad little phrase, the other sock, the run, the reunion
    ['pluck', E.solo, 587.33, 0.03, 0.8, 0], ['pluck', r3(E.solo + 0.28), 523.25, 0.03, 0.8, 0],
    ['pop', E.enter[0], 987.77, 0.035, 0.3], ['riser', E.run[0], E.run[1], 0.025],
    ['bell', E.run[1], 1760, 0.035, 1.0, 0], ['glitter', E.run[1], r3(E.run[1] + 0.35)], ['pop', E.tag, 1174.66, 0.035, 0],
    // sniffles
    ...[3.45, 3.9, 4.6, 5.2].map(s => ['tick', s, 0.02]),
    // munching + the hand-offs
    ...[3.3, 4.0, 4.7].map(m => ['tick', r3(m + 0.05), 0.015]),
    ['whoosh', E.tis[0], 0.3, 0.025], ['pop', r3(E.tis[0] + 0.45), 1567.98, 0.025, -0.3],
    ['whoosh', E.tis[1], 0.3, 0.025], ['pop', r3(E.tis[1] + 0.45), 1567.98, 0.028, -0.3],
    ['whoosh', E.box, 0.35, 0.035], ['tick', r3(E.box + 0.45), 0.06], ['pop', r3(E.box + 0.45), 880, 0.04, -0.3],
  ],
})
void MEME

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
