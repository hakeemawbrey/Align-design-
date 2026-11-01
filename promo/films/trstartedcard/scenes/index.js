// trstartedcard: HOW IT STARTED vs HOW IT'S GOING, "Card first. Face last." (20 s vertical, Star Talk Trends §6,
// music: dreamy · Eb). The format's look lives in ./started.js (identical in all five tr-started films).
//   0–6.6     HOW IT STARTED (a split photo, two rooms, one night): ♑ Capricorn and ♐ Sagittarius each get the same
//             blind mystery card in tonight's deck. "no photo? skip." / "a mystery? …skip." Both thumbs drag it toward
//             SKIP (nudge, nudge, almost gone)… "…wait." Both tap YES. ♓ Pisces, Sag's roommate, sobs in the doorway.
//             THE STARS: "both thumbs. *one inch* from skip."
//   6.6       card cut.
//   6.6–12.3  HOW IT'S GOING (their living room): that card hangs framed above the couch, with a little plaque:
//             "ALMOST SKIPPED". ♓ Pisces visits and weeps at it like it's a museum. Pisces' sob knocks the frame
//             crooked; Capricorn hops up and straightens it. THE STARS: "the card they almost skipped. *now it's art.*"
//   12.3–15.6 the two photos side by side. Last line: "Card first. *Face* last."
import { lerp, prog, ease } from '../../../src/lib.js'
import { A as ASSETS } from '../../../src/scenes/common.js'
import {
  makeStarted, drawStarChar, signStar, R, speech, hearts, sparkles, pisces, pop01, r3,
  INK, BONE, GOLD, PINK, MONO, HEART,
} from './started.js'

const CAP = signStar('capricorn'), SAG = signStar('sagittarius')

// ── a phone with the blind card on it; slide = 0…1 toward SKIP (left), yes = 0…1 the tap
function phone(x, t, cx, cy, img, slide, yes, seed) {
  const w = 190, h = 320
  x.save(); x.translate(cx, cy); x.rotate(0.03 * Math.sin(seed))
  R(x, INK, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16); R(x, '#2a2050', -w / 2, -h / 2, w, h)
  x.font = `700 15px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.75)'; x.textAlign = 'center'; x.fillText("TONIGHT'S DECK", 0, -h / 2 + 24)
  x.beginPath(); x.rect(-w / 2, -h / 2 + 34, w, h - 40); x.clip()
  const cw = 140, ch = cw * (img ? img.height / img.width : 1.38)
  x.save(); x.translate(-slide * 120, 14); x.rotate(-slide * 0.35)
  const g = yes > 0 ? yes : 0
  if (g > 0) { x.shadowColor = GOLD; x.shadowBlur = 30 * g }
  if (img) x.drawImage(img, -cw / 2, -ch / 2, cw, ch); else R(x, '#6a3fc0', -cw / 2, -ch / 2, cw, ch)
  x.shadowBlur = 0
  x.restore()
  // the SKIP stamp grows as it slides
  if (slide > 0.15 && yes <= 0) {
    x.save(); x.globalAlpha = Math.min(1, (slide - 0.15) * 3); x.translate(40, -60); x.rotate(0.2)
    x.font = `800 34px Inter, sans-serif`; x.lineWidth = 8; x.strokeStyle = INK; x.strokeText('SKIP?', 0, 0); x.fillStyle = '#ff6b6b'; x.fillText('SKIP?', 0, 0); x.restore()
  }
  if (yes > 0) {
    const k = pop01(yes, 0, 0.5, 3)
    x.save(); x.translate(0, 120); x.scale(k, k)
    x.font = `800 40px Inter, sans-serif`; x.lineWidth = 9; x.strokeStyle = INK; x.strokeText('YES', 0, 0); x.fillStyle = '#7fe0a0'; x.fillText('YES', 0, 0); x.restore()
  }
  x.restore()
}

// ── A: two rooms, one night
const A = { look: 0.9, cap1: 1.5, sag1: 2.15, n1: [1.7, 1.95], n2: [2.35, 2.6], n3: [3.2, 3.75], wait: 3.95, back: [4.0, 4.35], tap: 4.6, sagTap: 4.75 }
function sceneA(x, t, T, as) {
  // left: Capricorn's tidy room · right: Sagittarius' room with a packed bag
  R(x, '#3b3a62', 0, 0, 410, 820); R(x, '#4a3462', 410, 0, 410, 820)
  R(x, '#2a2a48', 0, 640, 410, 180); R(x, '#33243f', 410, 640, 410, 180)
  for (let i = 0; i < 4; i++) R(x, '#4c4b78', 30, 90 + i * 26, 110, 10)                       // a neat shelf of planners
  R(x, INK, 26, 80, 4, 120)
  R(x, INK, 660, 560, 120, 90); R(x, '#c46a3a', 666, 566, 108, 78); R(x, '#8a4626', 700, 548, 40, 14)  // the travel bag
  // ♓ Pisces in Sag's doorway, sniffling
  R(x, INK, 718, 150, 96, 300); R(x, '#24183a', 724, 156, 84, 294)
  x.save(); x.beginPath(); x.rect(724, 156, 84, 294); x.clip()
  pisces(x, t, 768, 380, 110, t > A.sagTap ? 3 : t > A.n3[0] ? 2 : 1, { mood: t > A.sagTap ? 'happy' : 'wide', look: [-1, 0] })
  x.restore()
  R(x, INK, 406, 0, 8, 820)                                                                      // the split
  // slides: nudge, nudge, almost gone, then back
  const sl = 0.25 * ease.inOutCubic(prog(t, ...A.n1)) + 0.25 * ease.inOutCubic(prog(t, ...A.n2)) + 0.4 * ease.inOutCubic(prog(t, ...A.n3)) - 0.9 * ease.outBack(prog(t, ...A.back))
  phone(x, t, 205, 300, as.card, Math.max(0, sl), t > A.tap ? (t - A.tap) : 0, 1)
  phone(x, t, 595, 300, as.card, Math.max(0, sl * 0.95), t > A.sagTap ? (t - A.sagTap) : 0, 2)
  sparkles(x, t, 205, 314, A.tap, 8, 90, 1, [GOLD, BONE], 20)
  sparkles(x, t, 595, 314, A.sagTap, 8, 90, 2, [GOLD, BONE], 20)
  let m = 'neutral', l = [0, -1]
  if (t > A.n3[0]) m = 'squint'
  if (t > A.wait - 0.1) m = 'wide'
  if (t > A.tap) m = 'sparkle'
  const hc = [A.cap1, A.wait, A.tap], hs = [A.sag1, A.wait, A.sagTap]
  drawStarChar(x, 205, 600, 200, t, { color: CAP.color, glyph: CAP.glyph, mood: m === 'neutral' ? 'squint' : m, look: l, hops: hc, seed: 3 })
  drawStarChar(x, 560, 600, 200, t, { color: SAG.color, glyph: SAG.glyph, mood: m === 'neutral' ? 'happy' : m, look: l, hops: hs, seed: 7 })
  speech(x, t, 210, 110, A.cap1, 'no photo? skip.', { size: 30, life: 1.4 })
  speech(x, t, 610, 110, A.sag1, 'a mystery? …skip.', { size: 30, life: 1.3 })
  speech(x, t, 210, 110, A.wait, '…wait.', { size: 36, life: 0.75 })
  speech(x, t, 610, 110, A.wait + 0.08, '…wait.', { size: 36, life: 0.7 })
  speech(x, t, 410, 110, A.tap + 0.3, 'one look.', { size: 36, life: 1.3, col: '#fff3c4' })
}

// ── B: the living room, the card framed
const B = { glint: 7.3, pisIn: [7.6, 8.1], plaque: 7.95, sob: 8.6, tilt: [10.0, 10.15], capUp: 10.75, fix: [11.0, 11.3], proud: 11.35 }
function sceneB(x, t, T, as) {
  R(x, '#5a3c6e', 0, 0, 820, 820); R(x, '#4c3160', 0, 640, 820, 180)
  for (let i = 0; i < 12; i++) R(x, '#634379', i * 72, 0, 4, 640)
  // warm lamp
  const lg = x.createRadialGradient(110, 300, 10, 110, 300, 300); lg.addColorStop(0, 'rgba(255,210,140,0.4)'); lg.addColorStop(1, 'rgba(255,210,140,0)')
  x.fillStyle = lg; x.fillRect(0, 0, 820, 820)
  R(x, INK, 96, 250, 30, 380); R(x, '#c9a06a', 102, 256, 18, 374); R(x, INK, 56, 200, 110, 70); R(x, '#ffe2a8', 62, 206, 98, 58)
  // the frame (crooked after the sob, straightened by Capricorn)
  const tilt = 0.12 * ease.outBack(prog(t, ...B.tilt)) * (1 - ease.inOutCubic(prog(t, ...B.fix)))
  const wob = t > B.fix[1] ? 0.03 * Math.exp(-(t - B.fix[1]) * 6) * Math.sin((t - B.fix[1]) * 22) : 0
  x.save(); x.translate(410, 250); x.rotate(tilt + wob)
  const cw = 170, ch = cw * (as.card ? as.card.height / as.card.width : 1.38)
  R(x, INK, -cw / 2 - 44, -ch / 2 - 44, cw + 88, ch + 88); R(x, GOLD, -cw / 2 - 38, -ch / 2 - 38, cw + 76, ch + 76)
  R(x, '#b8892e', -cw / 2 - 38, ch / 2 + 26, cw + 76, 12); R(x, '#f3e3c0', -cw / 2 - 18, -ch / 2 - 18, cw + 36, ch + 36)
  if (as.card) x.drawImage(as.card, -cw / 2, -ch / 2, cw, ch)
  x.restore()
  // glint
  if (t > B.glint && t < B.glint + 0.6) { const p = (t - B.glint) / 0.6; x.save(); x.globalAlpha = Math.sin(Math.PI * p) * 0.8; x.fillStyle = '#fff'; x.translate(410 - 120 + 240 * p, 250); x.rotate(0.5); x.fillRect(-10, -200, 20, 400); x.restore() }
  // the plaque
  const pk = pop01(t, B.plaque, 0.3, 2.4)
  if (pk > 0.01) {
    x.save(); x.translate(410, 452); x.scale(pk, pk)
    R(x, INK, -126, -24, 252, 48); R(x, '#d8b25a', -120, -18, 240, 36)
    x.font = `700 21px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ALMOST SKIPPED', 0, 1)
    x.restore()
  }
  // the couch
  R(x, INK, 150, 560, 520, 150); R(x, '#d16a8c', 158, 568, 504, 60); R(x, '#b9577a', 158, 628, 504, 74)
  R(x, INK, 130, 590, 50, 130); R(x, '#d16a8c', 136, 596, 38, 118); R(x, INK, 640, 590, 50, 130); R(x, '#d16a8c', 646, 596, 38, 118)
  // the couple: Capricorn hops up to fix the frame and comes back
  const up = Math.sin(Math.PI * prog(t, B.capUp, B.proud + 0.3))
  const cx = lerp(330, 380, up), cy = lerp(560, 470, up)
  const hc = [7.0, B.capUp, B.proud], hs = [7.15, B.sob + 0.2, B.proud + 0.1]
  drawStarChar(x, cx, cy, 190, t, { color: CAP.color, glyph: CAP.glyph, mood: t > B.tilt[0] && t < B.fix[1] ? 'wide' : t > B.proud ? 'sparkle' : 'happy', look: t > B.tilt[0] && t < B.fix[1] ? [0, -1] : [1, 0], hops: hc, seed: 3, glow: 1.2 })
  drawStarChar(x, 500, 560, 190, t, { color: SAG.color, glyph: SAG.glyph, mood: t > B.proud ? 'heart' : 'happy', look: [-1, 0], hops: hs, seed: 7, glow: 1.2 })
  // ♓ Pisces visits the "museum"
  const pin = ease.outCubic(prog(t, ...B.pisIn))
  if (pin > 0) pisces(x, t, lerp(900, 700, pin), 520, 170, t > B.sob ? 3 : 1, { mood: t > B.sob ? 'happy' : 'sparkle', look: [-1, -1], hops: [B.pisIn[1], B.sob, B.tilt[0] - 0.1] })
  speech(x, t, 690, 360, B.sob, 'it’s so beautiful', { size: 28, life: 1.3, tail: 1 })
  speech(x, t, 380, 140 + 0, B.fix[1] + 0.05, 'level.', { size: 34, life: 1.0, col: '#fff3c4' })
  sparkles(x, t, 410, 250, B.fix[1], 10, 150, 1, [GOLD, BONE, PINK], 22)
  if (t > B.proud) hearts(x, t, 440, 460, B.proud, { n: 6, life: 1.6, cell: 6, spread: 200 })
}

const EP = makeStarted({
  id: 'trstartedcard', accent: GOLD,
  load: async () => ({ card: await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = ASSETS + 'card-sign-back.png' }) }),
  A: { draw: sceneA, stamp: 'NIGHT 1', sub: 'one blind card. two thumbs.' },
  B: { draw: sceneB, stamp: 'TODAY', sub: 'it’s framed. above the couch.' },
  lines: [{ t: 2.95, text: 'both thumbs. *one inch* from skip.' }, { t: 8.95, text: 'the card they almost skipped. *now it’s art.*' }],
  last: 'Card first. *Face* last.',
  cues: () => [
    ['pop', A.cap1, 784, 0.035, -0.3], ['pop', A.sag1, 880, 0.035, 0.3],
    ['whoosh', A.n1[0], 0.18, 0.02], ['whoosh', A.n2[0], 0.18, 0.022], ['riser', A.n3[0], A.n3[1], 0.025],
    ['pop', A.wait, 659.25, 0.04, 0], ['whoosh', A.back[0], 0.25, 0.03],
    ['pluck', A.tap, 1318.51, 0.04, 0.5, -0.3], ['pluck', A.sagTap, 1567.98, 0.04, 0.5, 0.3], ['glitter', A.tap, A.tap + 0.5],
    ['bell', B.glint, 2093, 0.02, 1.0, 0], ['pop', B.plaque, 1046.5, 0.03, 0],
    ['pop', B.sob, 1174.66, 0.03, 0.4], ['tom', B.tilt[0], 160, { gain: 0.15, decay: 0.15 }], ['tick', B.tilt[0] + 0.02, 0.05],
    ['whoosh', B.capUp, 0.2, 0.02], ['tick', B.fix[1], 0.05], ['bell', B.fix[1] + 0.03, 1760, 0.025, 0.9, 0],
    ['pop', r3(B.proud + 0.05), 1318.51, 0.03, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [HEART, BONE]
