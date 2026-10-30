// srhtxbingo (30 s vertical, Star Talk Remix of htxbingo "Houston first-date bingo") · story 0–25.6, then the shared
// end card. THE STARS host your Houston first date like a bingo night: a gold caller star in a green visor, dauber in
// hand, calls the squares as they get daubed; ♓ Pisces in the corner plays along on its own card, crying.
//   0.00–8.80  "Houston | first-date *bingo.*"  the 3×3 card springs in; FREE SPACE, then eight squares daub on the beat
//              (Blames I-45, Mentions an ex, "idk lol", Phone on table, Talks about the heat, Small talk, "So what do
//              you do?", Late again). Box: "Houston first date? dauber *ready.*" → "I-45. the ex. 'idk lol'. the *phone*."
//              Win lines strike, BINGO! slams (7.54); Pisces holds up its own full card and sobs.
//   8.93       "BINGO. | *…again.*"  older, fully daubed cards slide out from behind; the caller rolls its eyes.
//              Box: "babe. you win this game *every* weekend."
//  11.20 cut → "Align skips | the *bingo.*"  the caller bonks the card; the squares fly off and burst into stars.
//  13.30      "Talk cards, | not *small talk.*"  the "Small talk" square yawns, then flips into a real talk card.
//              Box: "no more 'so what do you *do*?'"
//  17.27      ★ LESSON UNLOCKED: "Skip the small talk. | Ask something *real.*" (+1 BLACKOUT… OF SMALL TALK)
//  21.45 cut → "Get a *real* | first date."  one gold YOU TWO square; the caller daubs a heart on it; Pisces cries
//              happy. Box: "now *that's* a winning card."  Out by 25.45.
// One canvas (sky + card + stars), DOM type + two dialogue boxes + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  BONE, GOLD, PINK, RED, DULL, CYAN, LILAC, D2R, TAU, rgba, pop01, outK, thud, ink, sparkle, glow,
  CARD, tileC, square, bingoFrame, DAUB, starFrame, inSprite, tearsCells, dauber, miniCard, heartPath, person, visorCells, MONO,
} from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)
const PIS = signStar('pisces')
const r3 = v => +v.toFixed(3)

// ── the timeline
const T = {
  h0: 0.1, h0Late: BEAT(1), h0Out: 8.7, card: 0.3, callerIn: 0.85, open1: 1.25,
  free: BEAT(3), stamps: [4, 5, 6, 7, 8, 9, 10, 11].map(BEAT),
  strikes: [BEAT(11.75), BEAT(12), BEAT(12.25)], bingo: BEAT(12.5), pisCard: BEAT(13.5),
  ha: BEAT(15), haLate: BEAT(15.6), stack: BEAT(15.5), roll: [9.3, 10.1], haOut: 10.95, close1: 11.15,
  cut1: 11.2,
  h1: 11.25, h1Late: BEAT(20), bonk: BEAT(21), fly: BEAT(21.3), h1Out: 13.05,
  h2: 13.3, h2Late: BEAT(23.5), tile2: 13.2, flip: BEAT(25), h2Out: 16.95, talkOut: 16.95, close2: 17.0,
  lesson: BEAT(30), lessonOut: [21.25, 21.42],
  cut2: 21.45,
  h3: 21.5, h3Real: BEAT(38.2), tile5: 21.55, heart: BEAT(39.5), h3Out: 25.1, open3: 22.4, close3: 25.25,
  out: [25.05, 25.45],
}
const SPEAK = 'THE STARS'
const CPS = 30
const LINES1 = [
  { t: 1.45, speaker: SPEAK, text: 'Houston first date? dauber *ready.*' },
  { t: 4.5, speaker: SPEAK, text: "I-45. the ex. 'idk lol'. the *phone.*" },
  { t: 8.1, speaker: SPEAK, text: 'babe. you win this game *every* weekend.' },
]
const LINES2 = [{ t: 14.4, speaker: SPEAK, text: "no more 'so what do you *do*?'" }]
const LINES3 = [{ t: 22.55, speaker: SPEAK, text: "now *that's* a winning card." }]
const HOPS = [T.callerIn + 0.35, ...[LINES1, LINES2, LINES3].flatMap(L => talkHops(L, SPEAK, { cps: CPS })), T.bingo + 0.02, T.bonk - 0.3, T.heart - 0.3]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Skip the small talk. | Ask something *real.*', chip: '+1 BLACKOUT (OF SMALL TALK)' }

const ORDER = [0, 5, 7, 2, 3, 8, 1, 6]                  // daub order (index into SQUARES); FREE SPACE (4) first
const stampAt = i => i === 4 ? T.free : T.stamps[ORDER.indexOf(i)]
const daubCol = i => i === 4 ? GOLD : DAUB[ORDER.indexOf(i)]
const STRIKES = [[0, 8], [2, 6], [3, 5], [1, 7]]
const FLY = [4, 0, 6, 2, 8, 7, 3, 5, 1]

// ── layout: the original card geometry, scaled into the middle band (headline above, box below)
const CS = 0.6, CCX = CARD.x + CARD.w / 2, CCY = CARD.y + (CARD.head + CARD.tile * 3 + CARD.gap * 2 + CARD.pad) / 2
const CY = 905                                       // on-screen card centre
const toScr = (px, py) => [540 + (px - CCX) * CS, CY + (py - CCY) * CS]
const CALLER = { x: 925, y: 1300, size: 250 }
const CALLER3 = { x: 905, y: 1290, size: 240 }
const PISP = { x: 135, y: 1320, size: 160 }

function callerState(t) {
  if (t < T.open1) return { mood: 'happy' }
  if (t < T.free) return { mood: 'sparkle', look: [-1, -1] }
  if (t < T.bingo - 0.3) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.bingo) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.roll[0]) return { mood: 'happy' }
  if (t < T.roll[1]) return { mood: 'eyeroll', blink: false }
  if (t < T.cut1) return { mood: 'squint', look: [0, 0] }
  if (t < T.flip) return { mood: 'squint', look: [-1, -1] }
  if (t < T.lesson) return { mood: 'sparkle', look: [-1, -1] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function pisState(t) {
  if (t < T.bingo) return { mood: 'squint', look: [1, -1], tears: 1 }
  if (t < T.ha) return { mood: 'wide', tears: 3, blink: false }
  if (t < T.cut1) return { mood: 'squint', tears: 3 }
  if (t < T.flip) return { mood: 'neutral', look: [1, -1], tears: 0 }
  if (t < T.heart) return { mood: 'sparkle', look: [1, -1], tears: 0 }
  return { mood: 'heart', tears: 2 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 80px Inter", "italic 500 150px 'EB Garamond'", "italic 500 62px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const talkImg = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-talk-1.png' })
    .then(im => { if (!im) return null; const c = document.createElement('canvas'); c.width = 460; c.height = Math.round(460 * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c })
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston | first-date | *bingo.*', { top: 140, size: 116, accentSize: 168, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Late, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const HA = popText(root, 'BINGO. | *…again.*', { top: 190, size: 120, accentSize: 170, at: T.ha, gap: 0.08, late: 1, lateAt: T.haLate, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H1 = popText(root, 'Align skips | the *bingo.*', { top: 190, size: 126, accentSize: 170, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Late, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H2 = popText(root, 'Talk cards, | not *small* *talk.*', { top: 190, size: 112, accentSize: 150, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Late, lateGap: 0.12, wobble: true, accentColor: CYAN, lineHeight: 1.0 })
  const H3 = popText(root, 'Get a *real* | first date.', { top: 190, size: 126, accentSize: 176, at: T.h3, gap: 0.08, late: 2, lateAt: T.h3Real, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [HA, T.haOut], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1460, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1460, width: 960, height: 290, open: LINES2[0].t - 0.2, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES3, y: 1460, width: 960, height: 290, open: T.open3, close: T.close3, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── act 1–2: the bingo card (drawn in the original's card space, scaled into the frame)
  function drawBingo(t) {
    if (t > T.h1Out + 0.3) return
    const ck = pop01(t, T.card, 0.5, 1.7)
    const bang = thud(t, T.bingo, 26, 6) + 0.8 * thud(t, T.bonk, 30, 8)
    const sag = ease.inOutCubic(prog(t, T.ha, T.ha + 0.5)) * (1 - ease.inOutCubic(prog(t, T.cut1 - 0.3, T.cut1)))
    const fo = ease.inCubic(prog(t, T.fly + 0.85, T.fly + 1.3))
    const thumps = [T.free, ...T.stamps].reduce((s, ts) => s + thud(t, ts, 28, 10), 0)
    x.save(); x.translate(540, CY); x.scale(CS, CS); x.translate(-CCX, -CCY)
    // older cards slide out from behind ("…again.")
    const stk = [[-1, -9, -150, 40], [1, 8, 150, 20], [-1, -3, -40, -60]]
    stk.forEach(([sd, rot, dx, dy], k) => {
      const p = easeOutBack(prog(t, T.stack + k * 0.12, T.stack + k * 0.12 + 0.45), 1.5)
      const a = 1 - ease.inCubic(prog(t, T.haOut - 0.2, T.haOut + 0.2))
      if (p <= 0 || a <= 0) return
      x.save(); x.globalAlpha = 0.55 * a
      x.translate(CCX + dx * p, CCY + 40 + dy * p); x.rotate(rot * p * D2R); x.scale(0.84, 0.84); x.translate(-CCX, -CCY)
      bingoFrame(x)
      for (let i = 0; i < 9; i++) { const c = tileC(i); x.save(); x.translate(c.x, c.y); square(x, i, t, { d: 1, col: DAUB[(i + k * 3) % 8] }); x.restore() }
      x.restore()
    })
    const sc = ck * (1 - 0.08 * sag) * (1 - 0.6 * fo) * (1 + 0.04 * bang)
    x.translate(CCX, CCY + 8 * thumps + 30 * sag + 6 * Math.sin(t * 1.8))
    x.rotate((-1.5 + 1.0 * Math.sin(t * 1.3) + 4 * sag + 2 * bang) * D2R)
    x.scale(sc * (1 - 0.015 * thumps), sc * (1 + 0.015 * thumps))
    x.translate(-CCX, -CCY)
    x.globalAlpha = clamp(ck * 3) * (1 - fo)
    bingoFrame(x)
    for (let i = 0; i < 9; i++) {
      const c = tileC(i)
      const tk = pop01(t, T.card + 0.18 + ((i % 3) + Math.floor(i / 3)) * 0.05, 0.36, 2.2)
      const tf = T.fly + FLY[i] * 0.09, fp = prog(t, tf, tf + 0.55)
      if (fp >= 1) continue
      const r = rng(90 + i)
      const vx = (c.x - CCX) * 2.2 + (r() - 0.5) * 300, vy = -500 - r() * 500
      const fx = c.x + vx * fp, fy = c.y + vy * fp + 1900 * fp * fp
      x.save(); x.translate(fx, fy); x.rotate((r() - 0.5) * 3 * fp); x.scale(tk * (1 - 0.4 * fp), tk * (1 - 0.4 * fp))
      x.globalAlpha *= clamp(tk * 3) * (1 - ease.inQuad(fp))
      const ts = stampAt(i)
      square(x, i, t, { d: t >= ts - 0.16 ? t - (ts - 0.16) : -1, col: daubCol(i) })
      x.restore()
    }
    STRIKES.forEach(([a0, b0], k) => {
      const ts = k < 3 ? T.strikes[k] : T.strikes[2]
      const p = ease.outCubic(prog(t, ts, ts + 0.2))
      if (p <= 0 || t > T.fly) return
      const A_ = tileC(a0), B_ = tileC(b0), ex = (B_.x - A_.x) * 0.12, ey = (B_.y - A_.y) * 0.12
      x.save(); x.globalAlpha *= 0.9 * (1 - 0.5 * sag)
      x.beginPath(); x.moveTo(A_.x - ex, A_.y - ey); x.lineTo(lerp(A_.x - ex, B_.x + ex, p), lerp(A_.y - ey, B_.y + ey, p))
      ink(x, GOLD, { w: 18, fa: 0, glow: 30 }); x.restore()
    })
    x.restore()
    ;[T.free, ...T.stamps].forEach((ts, k) => {
      const i = k === 0 ? 4 : ORDER[k - 1], [sx, sy] = toScr(tileC(i).x, tileC(i).y)
      sparkle(x, sx, sy, t, ts, { n: 9, R: 130, seed: 10 + k, size: 20, cols: [daubCol(i), '#fff3e0', GOLD] })
    })
    // BINGO!
    if (t >= T.bingo - 0.16 && t < T.ha + 0.3) {
      const sp = prog(t, T.bingo - 0.16, T.bingo)
      const s2 = lerp(3, 1, ease.inCubic(sp)) * (1 + 0.1 * thud(t, T.bingo, 30, 8))
      const a = clamp(sp * 2.5) * outK(t, T.ha - 0.1, 0.3)
      x.save(); x.translate(540, CY); x.rotate(-9 * D2R); x.scale(s2 * 0.72, s2 * 0.72); x.globalAlpha = a
      x.font = "900 236px Inter, 'Helvetica Neue', Arial, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineJoin = 'round'; x.lineWidth = 46; x.strokeStyle = '#1a0b2e'; x.strokeText('BINGO!', 0, 10)
      x.shadowColor = PINK; x.shadowBlur = 40; x.lineWidth = 16; x.strokeStyle = PINK; x.strokeText('BINGO!', 0, 10); x.shadowBlur = 0
      const g = x.createLinearGradient(0, -100, 0, 110); g.addColorStop(0, '#fff1b8'); g.addColorStop(1, GOLD)
      x.fillStyle = g; x.fillText('BINGO!', 0, 10)
      x.restore()
      sparkle(x, 540, CY, t, T.bingo, { n: 26, R: 480, seed: 3, size: 34, dur: 1.0 })
    }
    for (let i = 0; i < 9; i++) {
      const tf = T.fly + FLY[i] * 0.09, [sx, sy] = toScr(tileC(i).x, tileC(i).y)
      sparkle(x, sx, sy, t, tf, { n: 8, R: 170, seed: 50 + i, size: 22 })
    }
  }

  // ── act 3: "Small talk" yawns, then flips into a real talk card
  function drawTalk(t) {
    if (t < T.tile2 || t > T.talkOut + 0.4) return
    const o = ease.inCubic(prog(t, T.talkOut - 0.1, T.talkOut + 0.35))
    const cx = 500, cy = 930 + 10 * Math.sin((t - T.tile2) * 2) + 120 * o
    const tk = pop01(t, T.tile2, 0.45, 1.8)
    const fp = prog(t, T.flip - 0.3, T.flip)
    const ang = fp < 1 ? Math.PI * ease.inOutCubic(fp) : Math.PI
    const sx = Math.abs(Math.cos(ang)) * (1 + 0.08 * thud(t, T.flip, 24, 8))
    glow(x, cx, cy, 560, fp >= 0.5 ? CYAN : DULL, (fp >= 0.5 ? 1 : 0.4) * (1 - o))
    x.save(); x.translate(cx, cy); x.rotate((-2 + 1.5 * Math.sin((t - T.tile2) * 1.4)) * D2R); x.globalAlpha = 1 - o
    if (ang < Math.PI / 2) {
      x.scale(1.6 * tk * sx, 1.6 * tk); square(x, 8, t, { col: DULL })
      const zz = prog(t, T.tile2 + 0.3, T.flip - 0.3)
      if (zz > 0) { x.fillStyle = DULL; x.font = "800 34px Inter, sans-serif"; x.textAlign = 'center'; for (let k = 0; k < 3; k++) { const u = (zz * 1.6 + k / 3) % 1; x.globalAlpha = (1 - o) * Math.sin(Math.PI * u); x.fillText('z', 100 + 30 * u + k * 6, -100 - 90 * u) } }
    } else if (talkImg) {
      const s = 1 - 0.15 * o
      x.scale(s * sx, s)
      x.drawImage(talkImg, -talkImg.width / 2, -talkImg.height / 2)
    }
    x.restore()
    sparkle(x, cx, cy, t, T.flip, { n: 18, R: 430, seed: 21, size: 28, cols: [CYAN, GOLD, '#fff3e0', LILAC] })
  }

  // ── act 4: one gold YOU TWO square; the caller daubs a heart on it
  function drawEnd(t, ok) {
    if (t < T.tile5) return
    const tk = pop01(t, T.tile5, 0.5, 1.8)
    const cx = 500, cy = 960 + 10 * Math.sin((t - T.tile5) * 2)
    const S = 600, hb = thud(t, T.heart, 26, 7)
    glow(x, cx, cy, 640, GOLD, 0.7 * clamp(tk) * ok)
    x.save(); x.translate(cx, cy); x.rotate((-2 + 1.2 * Math.sin((t - T.tile5) * 1.5) + 2 * hb) * D2R)
    const k = 0.86 * tk; x.scale(k * (1 + 0.04 * hb), k * (1 - 0.04 * hb)); x.globalAlpha = clamp(tk * 3) * ok
    x.beginPath(); x.roundRect(-S / 2, -S / 2, S, S, 56); x.fillStyle = 'rgba(52,36,22,0.96)'; x.fill(); ink(x, GOLD, { w: 10, fa: 0, glow: 30 })
    x.save(); x.globalAlpha *= 0.45; x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.roundRect(-S / 2 + 22, -S / 2 + 22, S - 44, S - 44, 40); x.stroke(); x.restore()
    const d = t - (T.heart - 0.16)
    if (d >= 0) {
      const sp = clamp(d / 0.16), sc = lerp(2.2, 1, ease.inCubic(sp)) * (1 + 0.12 * thud(d, 0.16, 30, 9))
      x.save(); x.translate(0, 10); x.scale(sc, sc); x.globalAlpha *= clamp(sp * 2.5)
      heartPath(x, 230); x.fillStyle = rgba(PINK, 0.7); x.shadowColor = PINK; x.shadowBlur = 40; x.fill(); x.shadowBlur = 0
      x.lineWidth = 6; x.strokeStyle = rgba('#ffffff', 0.4); x.stroke()
      x.restore()
    }
    const lean = ease.inOutCubic(prog(t, T.heart - 0.1, T.heart + 0.4))
    person(x, -120 + 14 * lean, 200 + 6 * Math.sin(t * 4), GOLD)
    person(x, 120 - 14 * lean, 200 + 6 * Math.sin(t * 4 + 1.5), lean > 0.5 ? '#fff3e0' : CYAN)
    x.fillStyle = GOLD; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.save(); x.letterSpacing = '6px'; x.fillText('★  YOU TWO  ★', 0, -S / 2 + 62); x.restore()
    x.restore()
    sparkle(x, cx, cy, t, T.heart, { n: 22, R: 480, seed: 81, size: 32, dur: 1.0, cols: [PINK, GOLD, '#fff3e0', LILAC] })
  }

  // ── the caller (THE STARS): visor on, dauber in hand
  function callerPos(t) {
    if (t < T.cut2) {
      // the bonk: a little lunge toward the card
      const lunge = Math.sin(Math.PI * prog(t, T.bonk - 0.3, T.bonk + 0.15))
      return { x: CALLER.x - 90 * lunge, y: CALLER.y - 70 * lunge, size: CALLER.size }
    }
    return CALLER3
  }
  function drawCaller(t, ok) {
    const inT = t < T.cut2 ? T.callerIn : T.tile5 + 0.3
    const pp = pop01(t, inT, 0.38, 2.2) * ok
    if (pp <= 0.02) return
    const P = callerPos(t), st = callerState(t)
    let squash = 0
    if (t >= T.bingo && t < T.bingo + 0.5) squash = 0.2 * Math.exp(-(t - T.bingo) * 7) * Math.cos((t - T.bingo) * 20)
    const opts = { hops: HOPS, seed: 3, pop: pp, squash }
    const r = drawStarChar(x, P.x, P.y, P.size, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, glow: 1.1, ...opts })
    inSprite(x, starFrame(P.x, P.y, P.size, t, opts), () => visorCells(x))
    // the dauber: dips on every daub (act 1), swings at the bonk, daubs the heart (act 4)
    const daubs = [T.free, ...T.stamps, T.heart]
    let dip = 0
    for (const ts of daubs) if (t >= ts - 0.2 && t < ts + 0.15) dip = Math.max(dip, Math.sin(Math.PI * prog(t, ts - 0.2, ts + 0.15)))
    const swing = Math.sin(Math.PI * prog(t, T.bonk - 0.3, T.bonk + 0.2))
    dauber(x, r.x - P.size * 0.55 - 30 * dip, r.y + P.size * 0.05 + 30 * dip, { rot: 0.6 + 0.5 * dip + 0.9 * swing, s: P.size / 210 * pp, col: t > T.cut2 ? PINK : DAUB[Math.floor(t * 1.8) % 8] })
  }

  function drawPisces(t, ok) {
    const at = 1.8
    const pp = pop01(t, at, 0.36, 2.1) * ok
    if (pp <= 0.02) return
    const st = pisState(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const P = PISP
    const opts = { hops: [at + 0.3, T.bingo + 0.1, T.pisCard, T.pisCard + 0.5, T.heart + 0.1, T.heart + 0.7], seed: 6, pop: pp, squash: sob }
    // its own card: held low and daubed in secret, then thrust up at BINGO
    const up = ease.outBack(prog(t, T.pisCard - 0.15, T.pisCard + 0.2)) * (1 - ease.inCubic(prog(t, T.cut1 - 0.4, T.cut1)))
    const filled = t < T.bingo ? Math.min(9, 1 + Math.floor((t - at) * 1.3)) : 9
    if (t < T.cut1) miniCard(x, P.x + 80 - 70 * up, P.y + 40 - 230 * up, t, { s: (0.6 + 0.35 * up) * pp, rot: 0.12 - 0.2 * up + 0.05 * Math.sin(t * 9) * up, filled })
    drawStarChar(x, P.x, P.y, P.size, t, { color: PIS.color, glyph: null, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, ...opts })
    inSprite(x, starFrame(P.x, P.y, P.size, t, opts), () => tearsCells(x, t, st.tears))
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      const ok = 1 - ease.inQuad(prog(t, ...T.out))
      if (t < T.cut2) { drawBingo(t); drawTalk(t) } else drawEnd(t, ok)
      drawPisces(t, t < T.lesson - 0.2 || t > T.cut2 ? ok : 1 - ease.inQuad(prog(t, T.lesson - 0.2, T.lesson + 0.2)))
      drawCaller(t, t < T.cut2 ? 1 : ok)
      box1.update(t); box2.update(t); box3.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 11.2 (…again → "Align skips the bingo."), 17.2 (→ lesson), 21.45 (lesson → "Get a real first date.")
const CUTS = [{ t: T.cut1, kind: 'flip' }, 17.2, { t: T.cut2, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX in the films' D-major palette; the engine re-keys pop/pluck/bell into C minor)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.14, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const daub = (ts, f, pan) => [['whoosh', r3(ts - 0.16), 0.14, 0.025], ['tick', ts, 0.08], ['pop', ts, f, 0.05, pan]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const PITCH = { pitch: { [SPEAK]: 740 } }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook
  ...wordPops(T.h0, 2, 0.08), ['pop', T.h0Late, 1318.51, 0.055, 0], ['pluck', T.h0Late, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.card, 0.5, 0.035], ['glitter', T.card + 0.4, T.card + 1.0],
  ['pop', T.callerIn + 0.05, 739.99, 0.045, 0.3], ['bell', T.callerIn + 0.1, 1318.51, 0.02, 0.8, 0.3],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES1, { cps: CPS, ...PITCH }), ...talkCues(LINES2, { cps: CPS, ...PITCH }), ...talkCues(LINES3, { cps: CPS, ...PITCH }),
  ...daub(T.free, 880, 0), ['bell', T.free, 1174.66, 0.035, 0.8, 0],
  ...T.stamps.flatMap((ts, k) => daub(ts, NOTE[k % 7], ((ORDER[k] % 3) - 1) * 0.45)),
  ...T.strikes.map((ts, k) => ['pluck', ts, [987.77, 1174.66, 1318.51][k], 0.045, 0.3, (k - 1) * 0.4]),
  ['whoosh', T.bingo - 0.2, 0.2, 0.05], ['boom', T.bingo, 0.16], ['tick', T.bingo, 0.09], ['glitter', T.bingo, T.bingo + 1.0],
  ['bell', T.bingo + 0.02, 1760, 0.05, 1.4, -0.15], ['bell', T.bingo + 0.06, 2349.32, 0.035, 1.4, 0.15],
  ['pop', T.pisCard, 1318.51, 0.035, -0.5], ['pop', T.pisCard + 0.08, 1567.98, 0.03, -0.5], ...sob(T.pisCard + 0.3, 1320), ...sob(T.pisCard + 1.1, 1250),
  // …again
  ...wordPops(T.ha, 1, 0.08, 3, 0.04), ['whoosh', T.ha, 0.34, 0.035], ['pop', T.haLate, 1174.66, 0.05, 0],
  ...[880, 739.99, 587.33, 493.88].map((f, i) => ['pluck', r3(T.haLate + 0.1 + i * 0.12), f, 0.04, 0.3, -0.2 + i * 0.13]),
  ...[0, 1, 2].map(k => ['whoosh', r3(T.stack + k * 0.12), 0.25, 0.025]),
  ['whoosh', T.roll[0], 0.4, 0.02],
  // align skips the bingo
  ...wordPops(T.h1, 3, 0.08, 1, 0.026), ['pop', T.h1Late, 1318.51, 0.055, 0], ['pluck', T.h1Late, 1174.66, 0.05, 0.6, 0],
  ['whoosh', T.bonk - 0.25, 0.25, 0.04], ['tom', T.bonk, 110, { ...FX, gain: 0.22, decay: 0.2 }], ['tick', T.bonk, 0.09],
  ...FLY.map((o, i) => ['pop', r3(T.fly + o * 0.09), NOTE[(o + 2) % 7], 0.035, ((i % 3) - 1) * 0.5]),
  ['glitter', T.fly, T.fly + 1.0],
  // talk cards
  ...wordPops(T.h2, 3, 0.08, 0, 0.026), ['pop', T.h2Late, 1174.66, 0.05, -0.1], ['pop', r3(T.h2Late + 0.12), 1318.51, 0.05, 0.1],
  ['pop', T.tile2, 587.33, 0.045, 0], ['whoosh', r3(T.flip - 0.3), 0.3, 0.04], ['bell', T.flip, 1174.66, 0.05, 1.2, 0], ['glitter', T.flip, T.flip + 0.7],
  ['pop', T.close2, 880, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Cm' }),
  // get a real first date
  ...wordPops(T.h3, 2, 0.08, 0, 0.03), ['pop', T.h3Real, 1318.51, 0.055, 0], ['pluck', T.h3Real, 1174.66, 0.05, 0.6, 0], ['pop', r3(T.h3Real + 0.12), 1567.98, 0.04, 0.1],
  ['whoosh', T.tile5, 0.5, 0.03], ['pop', T.open3, 739.99, 0.04, 0],
  ['whoosh', r3(T.heart - 0.18), 0.18, 0.04], ['tick', T.heart, 0.08],
  ['bell', T.heart, 1760, 0.055, 1.4, -0.1], ['bell', r3(T.heart + 0.03), 2349.32, 0.04, 1.4, 0.1], ['glitter', T.heart, T.heart + 0.8],
  ...sob(T.heart + 0.4, 1568), ...sob(T.heart + 1.2, 1660, 2),
  ['pop', T.close3, 880, 0.03, 0], ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
