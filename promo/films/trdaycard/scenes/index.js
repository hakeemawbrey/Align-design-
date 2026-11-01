// trdaycard: A DAY IN THE LIFE OF… a blind mystery card (30 s vertical, Star Talk Trends §10.1, music: lofi · Ab)
// Story 0–25.6, then the shared end card. The vlog look lives in ./day.js (identical in all five trday films).
//   0.0–5.0   6:58 PM "A day in the life of… | a *blind card.*"  The card sleeps on top of the deck (z's), the clock flips,
//             it wakes with a hop and narrates: "rise and shine. I work the *night shift*." Sticker: "job: *being picked*".
//             Pisces, behind, is already moved by the work ethic.
//   5.0–9.3   7:00 PM "Commute: | *shuffled.*"  The deck splits and riffles; the card is flung in loops (X_X eyes) and lands
//             dizzy. "my commute? a *shuffle*. every. single. night." Sticker: "commute: *chaotic*".
//   9.3–13.3  8:00 PM "The big shift: | *dealt.*"  Two neighbours slap down on tonight's deck, then our card, centre, proud.
//             "dealt into *tonight's deck*. mom, I made it!" Sticker: "made *the deck!*". Pisces: proud tears.
//  13.4       card cut.
//  13.4–18.6  9:14 PM "Big meeting: | *flipped.*"  The card flips face-up (veiled: no photo). A Taurus star reads it: looks,
//             looks AWAY (the card sweats; sticker "almost *skipped* me"), then leans right in. "they're reading me. act
//             *natural*."
//  18.6–22.4  9:20 PM "Clock out: | finally *loved.*"  Heart eyes, a hug, hearts; "no photo. they liked me *anyway*."
//             Sticker "being loved: *11/10*". Pisces: fountains.
//  22.4–25.5  11:11 PM "*Face* last. | Always."  The card winks. Everything pops out by 25.5.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, MONO, FONTS, pop01, outK, popOut, drawBits, sparkles, hearts, pisces,
  buildBug, buildClock, buildProgress, buildSticker, drawWash, handheld, wordPops, stickerCue, clockCues,
} from './day.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const TAU = signStar('taurus')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.15, h0Land: 0.85, h0Out: [4.75, 4.95],
  wake: 1.85, alarm: 1.55,
  h1: 5.0, h1Out: [9.05, 9.25], fling: [5.45, 8.15], riffle: [5.3, 8.3], land: 8.15,
  h2: 9.35, h2Out: [12.95, 13.15], matIn: [9.3, 9.6], dealA: [9.55, 9.82], dealB: [9.75, 10.02], dealH: [9.95, 10.3], dealOut: [12.95, 13.25],
  cut: 13.4,
  h3: 13.45, h3Out: [18.4, 18.6], readerIn: 13.65, flip: [14.0, 14.5], glance1: 14.6, away: 15.55, back: 16.55,
  h4: 18.65, h4Out: [22.2, 22.4], love: 18.7, hug: [19.0, 19.4],
  h5: 22.5, wink: 22.95,
  out: [25.05, 25.45], h5Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE CARD', SC = '#d9a6ff'
const LINES = [
  { t: 2.3, speaker: SPEAK, color: SC, text: 'rise and shine. I work the *night shift*.' },
  { t: 5.7, speaker: SPEAK, color: SC, text: 'my commute? a *shuffle*. every. single. night.' },
  { t: 9.7, speaker: SPEAK, color: SC, text: "dealt into *tonight's deck*. mom, I made it!" },
  { t: 15.0, speaker: SPEAK, color: SC, text: "they're reading me. act *natural*." },
  { t: 18.9, speaker: SPEAK, color: SC, text: 'no photo. they liked me *anyway*.' },
]
const CPS = 30
const BOX1 = { open: 2.1, close: 13.1 }, BOX2 = { open: 14.8, close: 22.1 }
const STAMPS = [{ t: 0, text: '6:58 PM' }, { t: T.h1, text: '7:00 PM' }, { t: T.h2, text: '8:00 PM' }, { t: T.h3, text: '9:14 PM' }, { t: T.h4, text: '9:20 PM' }, { t: T.h5, text: '11:11 PM' }]
const STICK = [
  { text: 'job: *being picked*', x: 540, y: 1300, rot: -3, at: 3.3, out: [4.7, 4.95] },
  { text: 'commute: *chaotic*', x: 330, y: 1300, rot: 4, at: 6.6, out: [9.0, 9.25] },
  { text: 'made *the deck!*', x: 540, y: 1318, rot: -4, at: 11.0, out: [12.9, 13.15] },
  { text: 'almost *skipped* me', x: 640, y: 492, rot: 3, at: 15.75, out: [18.35, 18.6] },
  { text: 'being loved: *11/10*', x: 640, y: 492, rot: -3, at: 19.6, out: [22.15, 22.4] },
]
const CUTS = [9.3, { t: T.cut, kind: 'flip' }, 18.62]

// layout
const DECK = { x: 540, y: 940, w: 360 }
const MAT = { x: 540, y: 960, w: 960, h: 600 }
const SLOT = { a: { x: 250, y: 990, w: 250 }, b: { x: 830, y: 990, w: 250 }, h: { x: 540, y: 980, w: 320 } }
const BIG = { x: 640, y: 905, w: 480 }
const READER = { x: 215, y: 1170, s: 230 }

const READER_HOPS = [T.readerIn + 0.3, T.back, T.back + 0.35, T.love + 0.1, T.hug[0], T.wink + 0.1]
const CARD_HOPS = [T.wake, T.wake + 0.45, T.dealH[1] + 0.5, T.dealH[1] + 0.9, ...talkHops(LINES, SPEAK, { cps: CPS })]

// ── the hero card's face (pixel eyes + mouth on the card art)
function eyeBM(kind, lx = 0, ly = 0) {
  if (kind === 'shut') return ['KKKK']
  if (kind === 'happy') return ['.KK.', 'K..K']
  if (kind === 'x') return ['K.K', '.K.', 'K.K']
  if (kind === 'heart') return ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
  const wide = kind === 'wide'
  const w = wide ? 5 : 4, h = wide ? 6 : 5, ps = wide ? 1 : 2
  const rows = Array.from({ length: h }, (_, j) => Array.from({ length: w }, (_, i) => ((i === 0 || i === w - 1) && (j === 0 || j === h - 1)) ? '.' : 'W'))
  const px = clamp(Math.round((w - ps) / 2 + lx), 0, w - ps), py = clamp(Math.round((h - ps) / 2 + ly), 1, h - 1 - ps)
  for (let j = 0; j < ps; j++) for (let i = 0; i < ps; i++) rows[py + j][px + i] = 'K'
  return rows.map(r => r.join(''))
}
const MOUTH = { smile: ['K...K', '.KKK.'], grin: ['KKKKK', 'KRRRK', '.KKK.'], o: ['.K.', 'K.K', '.K.'], flat: ['KKKK'], wavy: ['K.K.K', '.K.K.'] }
const FCOL = { W: '#fffbea', K: INK, H: '#ff4f86', R: '#ff8fa0' }
function drawFace(x, t, w, h, face, f) {
  const c = w / 44, ey = (face === 'back' ? -0.31 : -0.2) * h, my = ey + c * 6.5, dx = w * 0.15
  let { eyes = 'open', mouth = 'smile', look = [0, 0], blush = false } = f
  if (eyes === 'open' || eyes === 'wide') { const ph = (t * 0.37 + 0.3) % 1; if (ph < 0.04) eyes = 'shut' }
  const L = eyes === 'wink' ? 'happy' : eyes, R = eyes === 'wink' ? 'open' : eyes
  const OL = 'rgba(27,18,54,0.95)'
  drawBits(x, eyeBM(L, look[0], look[1]), FCOL, -dx, ey, c, { outline: OL })
  drawBits(x, eyeBM(R, look[0], look[1]), FCOL, dx, ey, c, { outline: OL })
  if (blush) for (const s of [-1, 1]) { x.fillStyle = 'rgba(255,120,160,0.75)'; x.fillRect(s * dx - c * 1.5 + s * c * 2, ey + c * 3.6, c * 3, c * 1.2) }
  drawBits(x, MOUTH[mouth], FCOL, 0, my, c, { outline: 'rgba(239,230,214,0.9)' })
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + src })
  const [backImg, faceImg] = await Promise.all([load('card-back.png'), load('card-profile-3.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'A day in the life of… | a *blind card.*', { top: 176, size: 84, accentSize: 128, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: '#d9a6ff' })
  const H1 = popText(root, 'Commute: | *shuffled.*', { top: 176, size: 100, accentSize: 140, at: T.h1, gap: 0.1, accentColor: '#ffb88a' })
  const H2 = popText(root, 'The big shift: | *dealt.*', { top: 176, size: 100, accentSize: 140, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'Big meeting: | *flipped.*', { top: 176, size: 100, accentSize: 140, at: T.h3, gap: 0.1, accentColor: '#7fd0ff' })
  const H4 = popText(root, 'Clock out: | finally *loved.*', { top: 176, size: 100, accentSize: 140, at: T.h4, gap: 0.1, accentColor: '#ff8fb1' })
  const H5 = popText(root, '*Face* last. | Always.', { top: 176, size: 120, accentSize: 160, at: T.h5, gap: 0.14, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]
  const stickers = STICK.map(s => buildSticker(root, s))
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { stamps: STAMPS, at: T.bug + 0.1 })
  const bar = buildProgress(root, { end: STORY_END, marks: STAMPS.slice(1).map(s => s.t), at: T.bug + 0.15 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── a card (image) centred on (cx, cy), width w; sx = flip scale (−1…1), face drawn on top when given
  function card(img, cx, cy, w, { rot = 0, sx = 1, sy = 1, alpha = 1, face = null, side = 'back' } = {}) {
    if (!img || alpha <= 0.01 || w <= 1) return
    const h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
    x.drawImage(img, -w / 2, -h / 2, w, h)
    if (face && Math.abs(sx) > 0.25) drawFace(x, face.t, w, h, side, face)
    x.restore()
  }

  // ── the hero card's pose + face at t
  function hero(t) {
    let px = DECK.x, py = DECK.y, w = DECK.w, rot = 0, sx = 1, sy = 1, side = 'back', alpha = 1
    let f = { eyes: 'shut', mouth: 'flat' }
    // beat 1: asleep on the deck, wakes
    if (t >= T.wake) f = { eyes: t < T.wake + 0.5 ? 'wide' : 'open', mouth: t < T.wake + 0.5 ? 'o' : 'smile', look: [0, 0] }
    if (t > 3.1 && t < 4.9) f = { eyes: 'happy', mouth: 'grin', blush: true }
    // beat 2: flung around the riffle in loops, lands dizzy
    if (t >= T.fling[0] && t < T.h2) {
      const u = prog(t, ...T.fling), e = ease.inOutQuad(u)
      px = 540 + 330 * Math.sin(e * Math.PI * 3); py = DECK.y - 120 - 260 * Math.sin(e * Math.PI) + 90 * Math.sin(e * Math.PI * 6)
      rot = e * Math.PI * 4; w = DECK.w * (1 - 0.25 * Math.sin(e * Math.PI))
      if (u >= 1) { px = DECK.x; py = DECK.y; rot = 0.12 * Math.sin((t - T.land) * 12) * Math.exp(-(t - T.land) * 2.5); w = DECK.w }
      f = { eyes: 'x', mouth: u < 1 ? 'o' : 'wavy' }
      if (t > T.land + 0.7) f = { eyes: 'x', mouth: 'wavy' }
    }
    // beat 3: dealt into tonight's deck
    if (t >= T.h2 - 0.05 && t < T.cut) {
      const up = ease.inCubic(prog(t, T.h2 - 0.05, T.dealH[0])), d = easeOutBack(prog(t, ...T.dealH), 1.2)
      if (t < T.dealH[0]) { px = DECK.x; py = lerp(DECK.y, -500, up); rot = up * 0.4; w = DECK.w }
      else { px = lerp(-200, SLOT.h.x, d); py = lerp(-300, SLOT.h.y, d); rot = lerp(-0.9, 0, d); w = SLOT.h.w }
      const dt = t - T.dealH[1]
      if (dt > 0 && dt < 0.4) { const q = Math.exp(-dt * 10) * Math.cos(dt * 30); sx = 1 + 0.08 * q; sy = 1 - 0.08 * q }
      f = { eyes: t < T.dealH[1] + 0.2 ? 'wide' : 'happy', mouth: 'grin', blush: t > T.dealH[1] + 0.2 }
      if (t > 11.9) f = { eyes: 'open', mouth: 'smile', look: [0, 0] }
    }
    // beat 4+: the big meeting (moves under the cut), flips, gets read
    if (t >= T.cut - 0.1) {
      const m = ease.inOutCubic(prog(t, T.cut - 0.1, T.cut + 0.2))
      px = lerp(SLOT.h.x, BIG.x, m); py = lerp(SLOT.h.y, BIG.y, m); w = lerp(SLOT.h.w, BIG.w, m); rot = 0
      const fp = prog(t, ...T.flip)
      sx = Math.cos(Math.PI * ease.inOutCubic(fp)); if (fp >= 0.5) { side = 'front'; sx = -sx }
      py -= 40 * Math.sin(Math.PI * fp)
      f = { eyes: 'open', mouth: 'flat', look: [-1, 0] }
      if (fp >= 0.5) f = { eyes: 'wide', mouth: 'o', look: [-1, 0] }
      if (t > T.glance1 + 0.3) f = { eyes: 'open', mouth: 'smile', look: [-1, 0] }
      if (t > T.away) f = { eyes: 'wide', mouth: 'wavy', look: [-1, 1] }
      if (t > T.back) f = { eyes: 'wide', mouth: 'o', look: [-1, 0] }
      if (t > T.back + 0.8) f = { eyes: 'happy', mouth: 'smile', blush: true }
      if (t > T.love) {
        const hg = ease.inOutCubic(prog(t, ...T.hug))
        rot = -0.1 * hg + 0.02 * Math.sin(t * 3); px -= 20 * hg
        f = { eyes: t < T.hug[1] ? 'wide' : 'heart', mouth: 'grin', blush: true }
      }
      if (t > T.h5 - 0.1) f = { eyes: t > T.wink && t < T.wink + 0.9 ? 'wink' : 'happy', mouth: 'grin', blush: true }
      const o = popOut(t, T.out); w *= o; alpha = clamp(o * 3)
    }
    // squash from hops
    let hsq = 0
    for (const hp of CARD_HOPS) { const dt = t - hp; if (dt > 0 && dt < 0.5) hsq = 0.07 * Math.sin(dt * 18) * Math.exp(-dt * 6) }
    const lift = CARD_HOPS.reduce((a, hp) => { const dt = t - hp; return dt > 0 && dt < 0.3 ? Math.max(a, Math.sin(Math.PI * dt / 0.3)) : a }, 0)
    py -= lift * 26 - Math.sin(t * 2.1) * 6
    card(side === 'back' ? backImg : faceImg, px, py, w, { rot, sx: sx * (1 + hsq), sy: sy * (1 - hsq), alpha, face: { ...f, t }, side })
    // sleepy z's / sweat
    if (t < T.wake) for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; drawBits(x, ['KKK', '..K', '.K.', 'K..', 'KKK'], { K: BONE }, px + 150 + ph * 60, py - 260 - ph * 150, 7 + 5 * ph, { alpha: Math.sin(Math.PI * ph), outline: null }) }
    if (t > T.away && t < T.back + 0.4) for (let k = 0; k < 2; k++) { const ph = (t * 1.3 + k * 0.5) % 1; drawBits(x, ['.S.', 'SSS', 'SSS', '.S.'], { S: '#8fe3ff' }, px + w * 0.42 + k * 26, py - w * 0.6 + ph * 90, 7, { alpha: 1 - ph }) }
    return { px, py, w }
  }

  function deckStack(t) {
    // beat 1: the sleeping deck under the hero; beat 2: two half-decks riffling
    if (t < T.fling[0]) { for (let i = 4; i >= 1; i--) card(backImg, DECK.x + i * 7, DECK.y + i * 9, DECK.w, { rot: 0.02 * (i % 2 ? 1 : -1), alpha: 0.95 }); return }
    if (t < T.h2) {
      const k = pop01(t, T.riffle[0], 0.3) * outK(t, [T.h1Out[0], T.h1Out[1]])
      const sp = ease.inOutCubic(prog(t, T.riffle[0], T.riffle[0] + 0.4))
      for (const s of [-1, 1]) for (let i = 3; i >= 0; i--) card(backImg, 540 + s * 260 * sp + i * 5, 1020 + i * 7, 230 * k, { rot: s * 0.12 * sp })
      // cards flicking across
      if (t < T.riffle[1]) for (let i = 0; i < 5; i++) { const ph = ((t - T.riffle[0]) * 1.6 + i / 5) % 1; const s = i % 2 ? 1 : -1; card(backImg, 540 + s * 260 * (1 - 2 * ph), 1000 - 230 * Math.sin(Math.PI * ph), 200 * k, { rot: s * (ph * 3 - 1.5) }) }
    }
  }

  function dealt(t) {
    if (t < T.matIn[0] || t > T.dealOut[1] + 0.05) return
    const mk = pop01(t, T.matIn[0], 0.3, 1.6) * outK(t, T.dealOut)
    if (mk > 0.01) {
      x.save(); x.translate(MAT.x, MAT.y); x.scale(mk, mk)
      x.fillStyle = 'rgba(27,18,54,0.75)'; x.beginPath(); x.roundRect(-MAT.w / 2, -MAT.h / 2, MAT.w, MAT.h, 28); x.fill()
      x.strokeStyle = GOLD; x.lineWidth = 5; x.setLineDash([18, 12]); x.stroke(); x.setLineDash([])
      x.font = `700 32px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText("TONIGHT'S DECK", 0, -MAT.h / 2 + 40)
      x.restore()
    }
    for (const [S, D, seed] of [[SLOT.a, T.dealA, 1], [SLOT.b, T.dealB, 2]]) {
      if (t < D[0]) continue
      const d = easeOutBack(prog(t, ...D), 1.2), o = ease.inCubic(prog(t, ...T.dealOut))
      card(backImg, lerp(seed === 1 ? -200 : 1280, S.x, d) + (seed === 1 ? -1 : 1) * o * 700, lerp(-300, S.y, d), S.w, { rot: lerp(seed === 1 ? -0.9 : 0.9, seed === 1 ? -0.05 : 0.05, d) })
    }
  }

  function reader(t) {
    if (t < T.readerIn || t > T.out[1]) return
    const k = pop01(t, T.readerIn, 0.36, 2.1) * popOut(t, T.out)
    const lean = ease.inOutCubic(prog(t, T.back, T.back + 0.3)), hug = ease.inOutCubic(prog(t, ...T.hug))
    const px = READER.x + 70 * lean + 110 * hug, py = READER.y - 30 * hug
    let mood = 'neutral', look = [1, -0.5]
    if (t > T.glance1) { mood = 'neutral'; look = [1, -0.6] }
    if (t > T.away) { mood = 'neutral'; look = [-1, 0.6] }
    if (t > T.back) { mood = 'sparkle'; look = [1, -0.6] }
    if (t > T.love) { mood = 'heart'; look = undefined }
    if (t > T.h5) mood = 'happy'
    drawStarChar(x, px, py, READER.s, t, { color: TAU.color, glyph: TAU.glyph, mood, look, hops: READER_HOPS, pop: k, seed: 9, glow: 1.1 })
    if (t > T.back && t < T.back + 0.6) sparkles(x, t, px + 60, py - 100, T.back, 8, 120, 2, [GOLD, BONE])
  }

  function piscesBg(t) {
    if (t > T.out[1]) return
    const o = popOut(t, T.out)
    if (t >= T.h2 - 0.1 && t < T.cut) {   // beat 3: peeks in top-right, proud tears
      const k = pop01(t, T.h2 + 0.5, 0.3, 2) * outK(t, T.h2Out)
      pisces(x, t, { x: 960, y: 585, s: 100, pop: k }, 2, 'sparkle', [-1, 1])
      return
    }
    const k = pop01(t, 0.9, 0.36, 2) * (t < T.h2 ? outK(t, [T.h2 - 0.3, T.h2 - 0.1]) : pop01(t, T.cut + 0.3, 0.3, 2)) * o
    const tears = t > T.love ? 3 : t > T.away && t < T.back ? 2 : t > T.fling[0] && t < T.h2 ? 2 : 1
    const mood = t > T.love ? 'happy' : t > T.fling[0] && t < T.h2 ? 'wide' : t > T.away && t < T.back ? 'wide' : 'sparkle'
    pisces(x, t, { x: 920, y: 1255, s: 130, pop: k }, tears, mood, [-1, -0.5])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawWash(x, t, { warm: clamp(prog(t, 0.2, 1.2)) * popOut(t, T.out) })
      const hh = handheld(t)
      x.save(); x.translate(540 + hh.dx, 960 + hh.dy); x.rotate(hh.rot); x.translate(-540, -960)
      if (t < T.out[1] + 0.02) {
        piscesBg(t)
        deckStack(t)
        dealt(t)
        const H = hero(t)
        reader(t)
        if (t > T.love) hearts(x, t, H.px - 100, H.py - 200, T.hug[0], { n: 8, life: 3, spread: 360, alpha: popOut(t, T.out) })
        if (t > T.dealH[1] && t < T.dealH[1] + 0.7) sparkles(x, t, SLOT.h.x, SLOT.h.y, T.dealH[1], 10, 230, 1, [GOLD, BONE, PINK])
        if (t > T.wink && t < T.wink + 0.7) sparkles(x, t, H.px, H.py - 120, T.wink, 10, 260, 3, [GOLD, BONE, '#d9a6ff'])
        // the alarm "ring" marks before the wake
        if (t > T.alarm && t < T.wake + 0.2) { const a = Math.sin(Math.PI * prog(t, T.alarm, T.wake + 0.2)); for (const s of [-1, 1]) drawBits(x, ['K.', '.K', 'K.', '.K'].map(r => s < 0 ? r.split('').reverse().join('') : r), { K: GOLD }, 540 + s * (250 + 10 * Math.sin(t * 40)), 700, 9, { alpha: a, outline: null }) }
      }
      x.restore()
      box1.update(t); box2.update(t)
      for (const s of stickers) s.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut)); bar.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.4, between "dealt" and "flipped")
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound
export const CUES = [
  ...wordPops(T.h0, 5, 0.07, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.bug + 0.16, 0.03],
  // the alarm + the wake
  ...Array.from({ length: 6 }, (_, i) => ['bell', +(T.alarm + i * 0.06).toFixed(3), 2349.32, 0.012, 0.15, i % 2 ? 0.4 : -0.4]),
  ['pop', T.wake, 1318.51, 0.05, 0], ['pop', T.wake + 0.08, 1567.98, 0.035, 0], ['pop', T.wake + 0.45, 987.77, 0.03, 0],
  // the shuffle
  ...wordPops(T.h1, 2, 0.1, 2, 0.026), ['whoosh', T.fling[0], 0.5, 0.04],
  ...Array.from({ length: 22 }, (_, i) => ['tick', +(T.riffle[0] + 0.1 + i * 0.12).toFixed(3), 0.014 + 0.006 * (i % 3)]),
  ['whoosh', 6.4, 0.4, 0.03], ['whoosh', 7.3, 0.4, 0.03], ['boom', T.land, 0.15], ['pop', T.land + 0.05, 440, 0.04, 0], ['pluck', T.land + 0.3, 330, 0.03, 0.6, 0],
  // the deal
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['whoosh', T.dealA[0], 0.3, 0.03], ['tick', T.dealA[1], 0.05], ['tick', T.dealB[1], 0.05],
  ['whoosh', T.dealH[0], 0.35, 0.035], ['tick', T.dealH[1], 0.07], ['pop', T.dealH[1] + 0.02, 1174.66, 0.04, 0], ['glitter', T.dealH[1], T.dealH[1] + 0.4],
  ['whoosh', T.dealOut[0], 0.3, 0.025],
  // the flip + the read
  ...wordPops(T.h3, 3, 0.1, 3, 0.026), ['pop', T.readerIn + 0.05, 659.25, 0.04, -0.3],
  ['whoosh', T.flip[0], 0.4, 0.035], ['tick', (T.flip[0] + T.flip[1]) / 2, 0.06], ['pop', T.flip[1], 1318.51, 0.04, 0.2],
  ['pluck', T.away, 392, 0.03, 0.5, -0.3], ['pluck', T.away + 0.18, 370, 0.03, 0.5, -0.3],
  ['pop', T.back, 1174.66, 0.045, -0.2], ['pop', T.back + 0.08, 1567.98, 0.035, -0.2], ['glitter', T.back, T.back + 0.3],
  // loved
  ...wordPops(T.h4, 4, 0.1, 0, 0.026), ['pluck', T.love, 1174.66, 0.045, 0.5, -0.2], ['pluck', T.love + 0.12, 1567.98, 0.04, 0.5, -0.2],
  ['riser', T.hug[0] - 0.4, T.hug[1], 0.025], ['bell', T.hug[1], 1760, 0.03, 1.0, 0], ['glitter', T.hug[1], T.hug[1] + 0.6],
  // face last
  ...wordPops(T.h5, 3, 0.14, 2, 0.03), ['pop', T.wink, 1567.98, 0.045, 0.2], ['bell', T.wink + 0.05, 2349.32, 0.025, 1.0, 0.2], ['glitter', T.wink, T.wink + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...clockCues(STAMPS), ...STICK.flatMap((s, i) => stickerCue(s.at, i)),
  ...talkCues(LINES, { cps: CPS }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
