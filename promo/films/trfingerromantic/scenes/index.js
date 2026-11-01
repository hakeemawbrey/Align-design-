// trfingerromantic: PUT A FINGER DOWN, hopeless romantic edition (30 s vertical, Star Talk Trends §8, music: house · A)
// Story 0–25.6, then the shared end card. The format look lives in ./finger.js (identical in all five trfinger* films).
//   0.0–2.7    "Put a finger down: | *hopeless romantic* edition."  ♎ Libra pops in, the ten fingers fan up. Counter: 10.
//              Pisces plays along on tiny hands, bottom right.
//   2.8        the sticker "put a finger down if…" slaps on (the drop).
//   2.9–5.1    "…you planned the wedding | after *one* coffee."  A bubble "coffee sometime?" → a three-tier pixel cake
//              pops up next to it. Finger.
//   5.2–7.4    "…you stare out windows | *on purpose.*"  A rainy pixel window; Libra gazes, sparkly. Finger.
//   7.45–9.6   "…you made a playlist | called *‘us?’*"  A playlist card: "us?" · "us (for real)" · "us?? (v3)". Finger.
//   9.7–13.4   "…you cried at a | *stranger’s* proposal."  Libra drops one finger… and Pisces, bottom right, drops ALL of
//              theirs at once, sobbing. THE STARS (off-screen): "pisces. that was *one* prompt."
//  13.6        card cut.
//  13.75–15.5 "…you kept a *receipt* | because they touched it."  A receipt with a pixel heart drawn on it. Finger.
//  15.6–18.0  "…you believe in love | at *first sight.*"  Libra doesn't even wait for the headline: all five remaining
//              fingers slam down at once (16.16), heart eyes. Counter: 0, in pink.
//  18.0–22.4  The hands drop away. THE STARS pop in: "zero. a *full-time* romantic." → "dream big. then meet the *real*
//              them." A talk card ("What does a perfect lazy Sunday look like for you?") floats down between them.
//  22.5–25.5  "*Guilty.* Happily."  The hands pop back up, all ten fingers wide, waving. Out by 25.5.
// One canvas (sky + props + stars + hands), DOM type + sticker + counter + box + bug, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, HOT, MONO, INTER, BEAT, pop01, outK, popOut, drawBits, sparkles, starFrame, inSprite, tearsCells,
  fingerState, drawHands, buildBug, buildSticker, buildCounter, buildProgress, drawBubble, fingerCues,
} from './finger.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const LIB = signStar('libra'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.12, h0Land: 0.62, h0Out: [2.55, 2.75],
  heroIn: 0.25, handsIn: [0.5, 0.9], fanUp: 0.95, countIn: 1.75, pisIn: 1.2,
  sticker: BEAT(4), stickerOut: [17.85, 18.05],
  p1: 2.9, p1Out: [4.95, 5.1], bub1: 3.05, cake: 3.65,
  p2: 5.2, p2Out: [7.2, 7.35], win: 5.35,
  p3: 7.45, p3Out: [9.45, 9.6], list: 7.6,
  p4: 9.7, p4Out: [13.2, 13.4], pisAll: 11.0,
  cut: 13.6,
  p5: 13.75, p5Out: [15.35, 15.5], rec: 13.9,
  p6: BEAT(27), p6Out: [17.85, 18.05], allDown: BEAT(28),
  handsOut: [18.0, 18.4], narIn: 18.1, card: [19.7, 20.25], narOut: [22.1, 22.4],
  h7: 22.5, h7Land: 22.55, handsBack: [22.6, 23.0], wave: 23.0,
  countOut: [22.0, 22.3],
  out: [25.1, 25.5], h7Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
// fingers 0–4 left hand pinky → thumb, 5–9 right hand thumb → pinky. Each starts folded (−1), fans up in the intro,
// and all ten come back up for "Guilty. Happily."
const BACK = i => T.handsBack[0] + 0.1 + i * 0.04
const DOWNS = [[BEAT(7)], [BEAT(11)], [BEAT(15)], [BEAT(18)], [BEAT(26)], ...[0, 1, 2, 3, 4].map(k => [T.allDown + k * 0.05])]
const F = fingerState(DOWNS.map((d, i) => [-1, T.fanUp + i * 0.08, ...d, BACK(i)]))
// Pisces plays along… then folds all of its remaining fingers at the proposal
const PF = fingerState(DOWNS.map((d, i) => [-1, T.fanUp + i * 0.08, i < 3 ? d[0] : T.pisAll + (i - 3) * 0.045]))

const SPEAK = 'THE STARS'
const LINES = [
  { t: 11.35, speaker: SPEAK, text: 'pisces. that was *one* prompt.' },
  { t: 18.45, speaker: SPEAK, text: 'zero. a *full-time* romantic.' },
  { t: 20.95, speaker: SPEAK, text: 'dream big. then meet the *real* them.' },
]
const CPS = 30
const BOX1 = { open: 11.15, close: 13.5 }, BOX2 = { open: 18.25, close: 24.2 }

// layout
const HERO = { x: 540, y: 960, s: 300 }, HERO_B = { x: 410, y: 960, s: 280 }, NAR = { x: 700, y: 960, s: 260 }
const HANDS = { lx: 190, rx: 890, y: 900, cell: 13 }
const PIS_AT = { x: 890, y: 1780, s: 140 }
const CARD = { cx: 555, cy: 610, w: 300 }

const NAR_HOPS = [T.narIn + 0.3, ...talkHops(LINES.slice(1), SPEAK, { cps: CPS })]
const HERO_HOPS = [T.heroIn + 0.35, T.countIn + 0.05, ...F.downs.filter(v => v < T.allDown), T.allDown + 0.02, T.card[1], T.wave, T.wave + 0.6]

// pixel bits
const CAKE = ['....HH....', '...WWWW...', '...WPPW...', '..WWWWWW..', '..WPPPPW..', '.WWWWWWWW.', '.WPPPPPPW.', 'WWWWWWWWWW', 'WPPPPPPPPW', 'SSSSSSSSSS']
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "800 28px Inter", "700 34px Inter", "italic 500 150px 'EB Garamond'", "700 120px 'Space Mono'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const cardImg = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + 'card-talk-3.png' })

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const PT = { top: 262, size: 84, accentSize: 112, gap: 0.08, fit: true }
  const H0 = popText(root, 'Put a finger down: | *hopeless romantic* | edition.', { top: 170, size: 88, accentSize: 120, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: LIB.color })
  const P1 = popText(root, '…you planned the wedding | after *one* coffee.', { ...PT, at: T.p1, accentColor: '#ffe27a' })
  const P2 = popText(root, '…you stare out windows | *on purpose.*', { ...PT, at: T.p2, accentColor: '#7fd0ff' })
  const P3 = popText(root, '…you made a playlist | called *‘us?’*', { ...PT, at: T.p3, late: 1, lateAt: T.p3 + 0.35, wobble: true, accentColor: '#c9a6ff' })
  const P4 = popText(root, '…you cried at a | *stranger’s* proposal.', { ...PT, at: T.p4, accentColor: '#8fe3ff' })
  const P5 = popText(root, '…you kept a *receipt* | because they touched it.', { ...PT, at: T.p5, accentColor: '#7dffb0' })
  const P6 = popText(root, '…you believe in love | at *first sight.*', { ...PT, at: T.p6, late: 2, lateAt: T.p6 + 0.45, wobble: true, accentColor: HOT })
  const H7 = popText(root, '*Guilty.* Happily.', { top: 240, size: 120, accentSize: 170, at: T.h7Land, gap: 0.3, accentColor: HOT })
  const HEADS = [[H0, T.h0Out], [P1, T.p1Out], [P2, T.p2Out], [P3, T.p3Out], [P4, T.p4Out], [P5, T.p5Out], [P6, T.p6Out], [H7, T.h7Out]]
  const sticker = buildSticker(root, { at: T.sticker })
  const counter = buildCounter(root, { top: 1170 })
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const bar = buildProgress(root, { end: STORY_END })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── pieces
  function pisces(t) {
    const k = pop01(t, T.pisIn, 0.35, 2) * popOut(t, T.out)
    if (k <= 0.01) return
    const tears = t > T.pisAll ? 3 : t > BEAT(11) ? 2 : 1
    const mood = t > T.pisAll ? 'wide' : 'sparkle'
    const opts = { color: PIS.color, mood, look: [-1, -1], seed: 6, glow: 0.8, pop: k, hops: [T.pisAll + 0.05, T.pisAll + 0.6, T.allDown] }
    drawStarChar(x, PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts)
    inSprite(x, starFrame(PIS_AT.x, PIS_AT.y, PIS_AT.s, t, opts), () => tearsCells(x, t, tears))
    drawHands(x, t, PF, { lx: PIS_AT.x - 118, rx: PIS_AT.x + 118, y: PIS_AT.y - 22, cell: 6, color: PIS.color, pop: k * outK(t, T.handsOut), sway: 0.4 })
  }

  function heroPose(t) {
    const mv = ease.inOutCubic(prog(t, T.handsOut[0], T.narIn + 0.3)) * (1 - ease.inOutCubic(prog(t, T.narOut[0], T.handsBack[1])))
    return { x: lerp(HERO.x, HERO_B.x, mv), y: HERO.y, s: lerp(HERO.s, HERO_B.s, mv) }
  }

  function hero(t) {
    const k = pop01(t, T.heroIn, 0.4, 2.1) * popOut(t, T.out)
    if (k <= 0.01) return
    const P = heroPose(t)
    let mood = 'happy', look = [0, 0], blink, squash = 0
    if (t > T.bub1 && t < T.cake) { mood = 'neutral'; look = [0, -1] }
    else if (t > T.cake && t < T.p2) { mood = 'heart'; look = undefined }
    else if (t > T.p2 && t < T.p3) { mood = 'sparkle'; look = [-1, -1] }
    else if (t > T.p3 && t < T.p4) { mood = t > BEAT(15) ? 'happy' : 'sparkle'; look = [0, -1] }
    else if (t > T.p4 && t < T.pisAll) { mood = t > BEAT(18) ? 'sparkle' : 'neutral'; look = [0, 0] }
    else if (t > T.pisAll && t < T.p5) { mood = 'wide'; look = [1, 1]; blink = false }          // stares at Pisces
    else if (t > T.p5 && t < T.p6) { mood = t > BEAT(26) ? 'happy' : 'sparkle'; look = [0, -1] }
    else if (t > T.p6 && t < T.allDown) { mood = 'wide'; look = [0, 0] }
    else if (t > T.allDown && t < T.handsOut[0]) { mood = 'heart'; look = undefined; squash = -0.08 * Math.sin(Math.PI * prog(t, T.allDown, T.allDown + 0.5)) }
    else if (t > T.handsOut[0] && t < T.card[1]) { mood = 'happy'; look = [1, 0] }
    else if (t > T.card[1] && t < T.narOut[0]) { mood = 'sparkle'; look = [1, -1] }
    else if (t > T.narOut[0]) { mood = t > T.wave ? 'heart' : 'happy'; look = undefined }
    drawStarChar(x, P.x, P.y, P.s, t, { color: LIB.color, glyph: LIB.glyph, mood, look, blink, hops: HERO_HOPS, pop: k, seed: 3, glow: 1.1, squash })
    if (t > T.allDown && t < T.handsOut[0]) sparkles(x, t, P.x, P.y - 40, T.allDown + 0.02, 10, 190, 2, [HOT, BONE, PINK])
  }

  function narrator(t) {
    if (t < T.narIn || t > T.narOut[1]) return
    const k = pop01(t, T.narIn, 0.4, 2.1) * popOut(t, T.narOut)
    if (k <= 0.01) return
    const sl = ease.outCubic(prog(t, T.narIn, T.narIn + 0.45))
    drawStarChar(x, lerp(1200, NAR.x, sl), NAR.y, NAR.s, t, { color: STAR.sky, mood: t > T.card[1] ? 'sparkle' : 'happy', look: [-1, t > T.card[1] ? -1 : 0], hops: NAR_HOPS, pop: k, seed: 2, glow: 1.05 })
  }

  function talkCard(t) {
    if (!cardImg || t < T.card[0] || t > T.narOut[1]) return
    const k = easeOutBack(prog(t, ...T.card), 1.3), ok = popOut(t, T.narOut)
    if (ok <= 0) return
    const w = CARD.w * ok, h = w * cardImg.height / cardImg.width
    const cy = lerp(-200, CARD.cy, k) + Math.sin(t * 2) * 8, rot = lerp(-0.5, -0.04, k) + 0.02 * Math.sin(t * 1.6)
    x.save(); x.translate(CARD.cx, cy); x.rotate(rot)
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h)
    x.drawImage(cardImg, -w / 2, -h / 2, w, h)
    x.restore()
    sparkles(x, t, CARD.cx, CARD.cy, T.card[1], 10, 200, 1, [GOLD, BONE, PINK])
  }

  // P1: "coffee sometime?" → the cake
  function prop1(t) {
    const o = [T.p1Out[0] - 0.1, T.p1Out[1]]
    drawBubble(x, t, { cx: 400, cy: 610, text: 'coffee sometime?', at: T.bub1, out: o, side: 'L', size: 40 })
    const k = pop01(t, T.cake, 0.4, 2.6) * popOut(t, o)
    if (k > 0.01) {
      drawBits(x, CAKE, { H: HOT, W: '#fff4e0', P: PINK, S: '#c9b48a' }, 790, 640, 14 * k)
      sparkles(x, t, 790, 640, T.cake, 8, 110, 1, [GOLD, BONE, HOT], 20)
    }
  }
  // P2: the rainy window
  function prop2(t) {
    const o = [T.p2Out[0] - 0.1, T.p2Out[1]]
    const k = pop01(t, T.win, 0.32, 2) * popOut(t, o)
    if (k <= 0.01) return
    const w = 300, h = 250
    x.save(); x.translate(540, 640); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 22, -h / 2 - 22, w + 44, h + 44)
    x.fillStyle = '#8a5a2e'; x.fillRect(-w / 2 - 16, -h / 2 - 16, w + 32, h + 32)
    x.fillStyle = '#2b3f7a'; x.fillRect(-w / 2, -h / 2, w, h)
    x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
    x.fillStyle = 'rgba(160,210,255,0.7)'
    for (let i = 0; i < 26; i++) {
      const px = -w / 2 + ((i * 53) % w), ph = ((t * 1.3 + i * 0.37) % 1)
      x.fillRect(px, -h / 2 - 30 + ph * (h + 60), 5, 26)
    }
    x.restore()
    x.fillStyle = '#8a5a2e'; x.fillRect(-6, -h / 2, 12, h); x.fillRect(-w / 2, -6, w, 12)
    x.fillStyle = '#6b4322'; x.fillRect(-w / 2 - 30, h / 2 + 16, w + 60, 16)
    x.restore()
  }
  // P3: the playlist
  function prop3(t) {
    const o = [T.p3Out[0] - 0.1, T.p3Out[1]]
    const k = pop01(t, T.list, 0.32, 2) * popOut(t, o)
    if (k <= 0.01) return
    const w = 440, h = 270
    x.save(); x.translate(540, 650); x.rotate(0.03); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#2a1f55'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#c9a6ff'; x.fillRect(-w / 2, -h / 2, w, 50)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('PLAYLISTS', -w / 2 + 20, -h / 2 + 26)
    const rows = ['♪ us?', '♪ us (for real)', '♪ us?? (v3)']
    x.font = `700 38px ${INTER}`
    rows.forEach((r, i) => {
      const at = T.list + 0.2 + i * 0.3
      if (t < at) return
      const kk = pop01(t, at, 0.25, 2.4)
      x.save(); x.translate(-w / 2 + 26, -h / 2 + 96 + i * 62); x.scale(kk, kk)
      x.fillStyle = i === 0 ? '#ffe27a' : BONE; x.fillText(r, 0, 0)
      x.restore()
    })
    x.restore()
  }
  // P5: the receipt with a heart on it
  function prop5(t) {
    const o = [T.p5Out[0] - 0.1, T.p5Out[1]]
    const k = pop01(t, T.rec, 0.32, 2) * popOut(t, o)
    if (k <= 0.01) return
    const w = 230, h = 300
    x.save(); x.translate(540, 640); x.rotate(-0.07 + 0.03 * Math.sin(t * 2)); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#f6f1e6'; x.fillRect(-w / 2, -h / 2, w, h)
    for (let i = 0; i < 10; i++) { x.fillStyle = INK; x.fillRect(-w / 2 + i * 23, h / 2, 12, 10) }
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('* RECEIPT *', 0, -h / 2 + 30)
    x.textAlign = 'left'
    ;[['2 TEA', '6.00'], ['1 SCONE', '3.50']].forEach(([a, b], i) => { x.fillText(a, -w / 2 + 16, -h / 2 + 76 + i * 34); x.textAlign = 'right'; x.fillText(b, w / 2 - 16, -h / 2 + 76 + i * 34); x.textAlign = 'left' })
    x.fillRect(-w / 2 + 16, -h / 2 + 140, w - 32, 3)
    x.textAlign = 'center'; x.fillText('THANK YOU!', 0, -h / 2 + 170)
    x.restore()
    const hk = pop01(t, T.rec + 0.45, 0.35, 2.6) * popOut(t, o)
    if (hk > 0.01) drawBits(x, HEART, { H: HOT }, 560, 720, 10 * hk, { rot: -0.1 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 2.5))
      const base = t < 2.5 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      const dS = t - T.allDown, shake = dS > 0 && dS < 0.45 ? 14 * Math.exp(-dS * 9) * Math.sin(dS * 55) : 0
      if (t < T.out[1] + 0.02) {
        pisces(t)
        prop1(t); prop2(t); prop3(t); prop5(t)
        x.save(); x.translate(0, shake)
        talkCard(t)
        hero(t)
        narrator(t)
        const hk = pop01(t, T.handsIn[0], T.handsIn[1] - T.handsIn[0], 1.8)
        const ho = ease.inCubic(prog(t, ...T.handsOut)), hb = pop01(t, T.handsBack[0], T.handsBack[1] - T.handsBack[0], 2)
        const away = t < T.handsBack[0] ? ho : 1 - clamp(hb)
        const wav = t > T.wave ? Math.sin((t - T.wave) * 9) * 18 * popOut(t, T.out) : 0
        drawHands(x, t, F, { ...HANDS, lx: HANDS.lx - wav, rx: HANDS.rx + wav, y: HANDS.y + (1 - clamp(hk)) * 500 + away * 700, color: LIB.color, pop: clamp(hk, 0, 1.2) * popOut(t, T.out), alpha: 1 - away })
        x.restore()
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      sticker.update(t, outK(t, T.stickerOut))
      counter.update(t, F, pop01(t, T.countIn, 0.3, 2.2) * outK(t, T.countOut), { at: T.countIn })
      box1.update(t); box2.update(t)
      bug.update(t, outK(t, T.bugOut))
      bar.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.6, between Pisces' meltdown and the receipt)
const CUTS = [9.62, { t: T.cut, kind: 'flip' }, 17.98]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // cold open
  ...wordPops(T.h0, 4, 0.07, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0], ['pop', T.bug + 0.06, 880, 0.03, -0.4],
  ['pop', T.heroIn + 0.05, 739.99, 0.04, 0], ['whoosh', T.handsIn[0], 0.4, 0.04], ['pop', T.countIn, 1318.51, 0.04, 0],
  ['pop', T.pisIn + 0.05, 987.77, 0.025, 0.5],
  ['tick', T.sticker, 0.08], ['pop', T.sticker + 0.02, 659.25, 0.05, 0], ['whoosh', T.sticker - 0.12, 0.25, 0.03],
  // prompts
  ...wordPops(T.p1, 5, 0.08, 1), ['pop', T.bub1, 880, 0.04, -0.2],
  ['pluck', T.cake, 1174.66, 0.04, 0.5, 0.3], ['pluck', T.cake + 0.12, 1567.98, 0.035, 0.6, 0.3], ['glitter', T.cake, T.cake + 0.4],
  ...wordPops(T.p2, 5, 0.08, 2), ['whoosh', T.win, 1.2, 0.02],
  ...wordPops(T.p3, 4, 0.08, 3), ['pop', T.p3 + 0.35, 1174.66, 0.045, 0],
  ...[0, 1, 2].map(i => ['pop', +(T.list + 0.2 + i * 0.3).toFixed(3), NOTE[(i * 2) % 7] * 1.5, 0.03, 0.2]),
  ...wordPops(T.p4, 5, 0.08, 4),
  // Pisces folds everything
  ['whoosh', T.pisAll - 0.05, 0.3, 0.03], ['pluck', T.pisAll + 0.35, 392, 0.035, 0.6, 0.5], ['pluck', T.pisAll + 0.55, 349.23, 0.03, 0.7, 0.5],
  ...wordPops(T.p5, 6, 0.08, 0), ['pop', T.rec, 739.99, 0.04, 0], ['pluck', T.rec + 0.45, 1567.98, 0.04, 0.5, 0],
  // love at first sight: no hesitation
  ...wordPops(T.p6, 4, 0.08, 1), ['pop', T.p6 + 0.45, 1174.66, 0.045, 0],
  ['boom', T.allDown, 0.28], ['tom', T.allDown, 92, { gain: 0.26, decay: 0.3 }], ['glitter', T.allDown + 0.05, T.allDown + 0.5],
  ['pluck', T.allDown + 0.15, 1174.66, 0.04, 0.5, 0], ['pluck', T.allDown + 0.27, 1567.98, 0.035, 0.5, 0],
  // THE STARS + the talk card
  ['whoosh', T.handsOut[0], 0.4, 0.035], ['whoosh', T.narIn, 0.35, 0.035], ['pop', T.narIn + 0.3, 880, 0.04, 0.3],
  ['whoosh', T.card[0], 0.45, 0.035], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0], ['glitter', T.card[1], T.card[1] + 0.4],
  ...talkCues(LINES, { cps: CPS }),
  ['whoosh', T.narOut[0], 0.3, 0.03],
  // "Guilty. Happily."
  ['whoosh', T.handsBack[0], 0.3, 0.035], ['pop', T.h7Land, 1174.66, 0.045, 0], ['pop', T.h7Land + 0.1, 1567.98, 0.04, 0],
  ['bell', T.wave, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...fingerCues(F),
  ...PF.downs.filter(v => v >= T.pisAll - 0.01).map((v, i) => ['pop', +v.toFixed(3), 1318.51 - i * 90, 0.018, 0.5]),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
