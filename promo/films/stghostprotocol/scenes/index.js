// stghostprotocol (45 s vertical Align ad, Star Talk season 2 extra #3: "The Protocol"; promo/films/STARTALK12.md) · story
// 0–40.6, then the shared end card.
//   0.00–12.8  "How to end things | *without* ghosting."  ♑ CAPRICORN runs a seminar: a whiteboard reading THE PROTOCOL, a
//              pointer, a whistle; an audience of stars (Pisces among them). CAPRICORN: "Welcome to *the protocol.*" …
//              "Phones on silent. *Notebooks out.*"  "Exhibit *A.*": two demo stars on the board. One gets "so… next
//              weekend?", reads it (Seen) and turns translucent, then floats off (womp). CAPRICORN: "Exhibit A: *the
//              ghost.*" … "Leaves them wondering. For *weeks.*"  The other star waits while a calendar flips (crickets).
//  12.90       card cut (flip)
//  13.0–24.3   "Exhibit *B.*"  Same text. The star types one kind sentence: "I enjoyed meeting you, but I don't feel a
//              match. Wishing you the best."  The other reads it, nods, replies "thanks for telling me ♥", and they wave
//              and part. CAPRICORN: "Exhibit B: *one kind sentence.*"  The audience GASPS. ♈ ARIES: "That's *IT?*"
//              CAPRICORN: "That's it. One *sentence.*"
//  24.4–28.0   ♓ PISCES stands up, fountaining: "It's so *BEAUTIFUL.*"  A slow clap spreads through the room.
//  28.20       card cut (deal)
//  28.4–32.4   ★ LESSON UNLOCKED: "One kind sentence | beats *silence.* | Every time."
//  32.6–35.9   The board shows a card with dealbreakers stamped on. CAPRICORN: "Even better: dealbreakers up front.
//              *Day one.*"
//  36.0–40.45  "Class | *dismissed.*"  CAPRICORN: "Protocol complete. *Be nice out there.*" One last whistle. End card 40.6.
// One canvas (sky + board + cast + banner), DOM type + the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText, actor, lessonBanner, veil, bubble, pixelPanel, sparkBurst, drawHearts, drawPixelStar, easeOutBack,
  pop01, outK, popOut, rgba, inR, R, FONTS, GOLD, BONE, PINK, LAV, INK, MINT, RED, INTER, MONO,
  head, wordPops, chip, scratch, womp, drumroll, levelUp, whistleBlow, crickets, cheer, flutter, holds } from '../../stgroupchat2/kit.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const CAP = signStar('capricorn'), PIS = signStar('pisces'), ARI = signStar('aries')
const CAP_TAG = `${CAP.glyph} CAPRICORN`, PIS_TAG = `${PIS.glyph} PISCES`, ARI_TAG = `${ARI.glyph} ARIES`
const CAP_TXT = '#7dffd0'
const GHOST_COL = '#b9a7ff', THEM_COL = '#7fe0b0'

export const T = {
  blow0: [-0.3, 0.45], open1: -1.6, l1: -1.35, l2: 2.55, h0Out: [5.15, 5.35],
  exA: 5.4, h1: 5.45, h1Land: 5.8, demo: 5.5, textA: 5.95, l3: 6.3, seen: 6.9, fade: [7.2, 8.1], away: [8.3, 9.6], l4: 8.78,
  cal: [10.1, 12.4], close1: 12.6, h1Out: [12.55, 12.75], demoOut: [12.6, 12.85],
  cut1: 12.9,
  exB: 13.0, h2: 13.05, h2Land: 13.4, demo2: 13.1, textB: 13.35, open2: 13.3, l5: 13.5, dots: [14.2, 15.2], kind: 15.2, read: [15.4, 16.9],
  nod: 16.9, thanks: 17.5, wave: [18.6, 19.0], part: [19.3, 20.1], gasp: 20.2, l6: 20.55, l7: 22.47, close2: 25.08, h2Out: [24.95, 25.1],
  stand: [25.1, 25.45], open3: 25.15, l8: 25.3, clap: [26.25, 27.95], close3: 28.0, sit: [27.7, 28.05],
  cut2: 28.2,
  banner: 28.4, lesson: 28.8, lessonLate: 29.55, lessonOut: [32.15, 32.4], boardDim: [28.3, 28.4],
  h4: 32.6, h4Land: 32.95, card: [32.6, 33.0], stamps: [33.6, 34.3], open4: 32.7, l9: 32.85, cardOut: [36.1, 36.35], h4Out: [36.15, 36.3],
  h5: 36.4, h5Land: 36.7, l10: 36.48, blow1: [38.3, 38.95], close4: 40.25,
  out: [40.0, 40.45],
}
const L = (t, speaker, text, color) => ({ t, speaker, text, color })
const LINES1 = [L(T.l1, CAP_TAG, 'Welcome to *the protocol.*', CAP_TXT), L(T.l2, CAP_TAG, 'Phones on silent. *Notebooks out.*', CAP_TXT),
  L(T.l3, CAP_TAG, 'Exhibit A: *the ghost.*', CAP_TXT), L(T.l4, CAP_TAG, 'Leaves them wondering. For *weeks.*', CAP_TXT)]
const LINES2 = [L(T.l5, CAP_TAG, 'Exhibit B: *one kind sentence.*', CAP_TXT), L(T.l6, ARI_TAG, "That's *IT?*", '#ffb08a'), L(T.l7, CAP_TAG, "That's it. One *sentence.*", CAP_TXT)]
const LINES3 = [L(T.l8, PIS_TAG, "It's so *BEAUTIFUL.*", '#b9b3ff')]
const LINES4 = [L(T.l9, CAP_TAG, 'Even better: dealbreakers up front. *Day one.*', CAP_TXT), L(T.l10, CAP_TAG, 'Protocol complete. *Be nice out there.*', CAP_TXT)]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4]]
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4]

// ── board + cast layout
const BOARD = { x: 110, y: 440, w: 860, h: 590 }
const DEMO_L = { x: 330, y: 900, s: 150 }, DEMO_R = { x: 750, y: 900, s: 150 }
const CAPRI = { color: CAP.color, glyph: CAP.glyph, seed: 9, whistle: true, out: T.out, pos: [[0, 880, 1150, 250]],
  blow: [T.blow0, [T.gasp + 3.4, T.gasp + 3.7], T.blow1],
  hops: [...talkHops(ALL, CAP_TAG, { cps: CPS }), T.exA, T.exB, T.banner + 0.1],
  mood: [[-9, 'squint', -1, 0], [0.5, 'neutral', -1, 0], [T.l2, 'squint', 0, 0], [T.exA, 'neutral', -1, -1], [T.fade[0], 'squint', -1, -1], [T.l4, 'neutral', 0, 0],
    [T.exB, 'neutral', -1, -1], [T.gasp, 'happy', -1, 1], [T.l7, 'neutral', 0, 0], [T.l8, 'eyeroll'], [T.clap[0], 'happy', -1, 1], [T.banner, 'sparkle'],
    [T.h4, 'neutral', -1, -1], [T.l10, 'happy', 0, 0], [T.blow1[0], 'squint', 0, 0], [T.blow1[1], 'wink', 0, 0]] }
const AUD = [
  { id: 'aries', x: 95 }, { id: 'libra', x: 235 }, { id: 'pisces', x: 375 }, { id: 'leo', x: 515 }, { id: 'aquarius', x: 655 }, { id: 'taurus', x: 795 }, { id: 'scorpio', x: 965 },
].map((a, i) => ({ ...a, i, ...signStar(a.id), y: 1345, s: 112 }))

const pop1 = (t, t0, d = 0.3) => easeOutBack(prog(t, t0, t0 + d), 2.2)

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'How to end things | *without* ghosting.', { top: 150, size: 96, accentSize: 138, at: -1, late: 0, wobble: true, accentColor: CAP_TXT })
  const H1 = popText(root, 'Exhibit *A.*', { top: 200, size: 120, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GHOST_COL })
  const H2 = popText(root, 'Exhibit *B.*', { top: 200, size: 120, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: MINT })
  const H4 = popText(root, 'Even | *better.*', { top: 150, size: 108, accentSize: 160, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: GOLD })
  const H5 = popText(root, 'Class | *dismissed.*', { top: 150, size: 108, accentSize: 160, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: CAP_TXT })
  const LESSON = popText(root, 'One kind sentence | beats *silence.* | Every time.', { top: 650, size: 96, accentSize: 140, at: T.lesson, gap: 0.08, late: 0, wobble: true, lineHeight: 1.06 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H4, T.h4Out], [H5, T.out], [LESSON, T.lessonOut]]
  const BOX_Y = 1450
  const mk = (lines, open, close) => dialogueBox(root, { lines, y: BOX_Y, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [mk(LINES1, T.open1, T.close1), mk(LINES2, T.open2, T.close2), mk(LINES3, T.open3, T.close3), mk(LINES4, T.open4, T.close4)]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function boardK(t) { return (1 - ease.inCubic(prog(t, ...T.boardDim))) + pop1(t, T.h4 - 0.1, 0.35) * (t > T.h4 - 0.1 ? 1 : 0) }
  function drawBoard(t) {
    let k = t < T.boardDim[0] ? 1 : t < T.h4 - 0.1 ? 1 - ease.inCubic(prog(t, ...T.boardDim)) : pop1(t, T.h4 - 0.1, 0.35)
    k *= popOut(t, T.out)
    if (k <= 0.01) return
    const { x: X, y: Y, w, h } = BOARD, cx = X + w / 2, cy = Y + h / 2
    x.save(); x.translate(cx, cy); x.scale(k, k); x.translate(-cx, -cy)
    // easel legs
    R(x, '#5a3a22', X + 90, Y + h - 10, 18, 90); R(x, '#5a3a22', X + w - 108, Y + h - 10, 18, 90)
    // frame + white surface
    R(x, INK, X - 6, Y - 6, w + 12, h + 12); R(x, '#b8bccc', X, Y, w, h); R(x, '#f4f5fa', X + 14, Y + 14, w - 28, h - 28)
    R(x, '#dfe2ee', X + 14, Y + h - 40, w - 28, 26)
    // marker tray + markers
    R(x, '#8a8fa8', X + 40, Y + h - 20, w - 80, 12); R(x, RED, X + 80, Y + h - 30, 60, 12); R(x, '#3d6cf2', X + 160, Y + h - 30, 60, 12)
    // heading in marker
    let title = 'THE PROTOCOL', col = '#2a2350'
    if (t >= T.exA && t < T.exB) { title = 'EXHIBIT A: THE GHOST'; col = '#7a5cd6' }
    if (t >= T.exB && t < T.boardDim[0]) { title = 'EXHIBIT B: ONE SENTENCE'; col = '#1f9a6a' }
    if (t >= T.h4 - 0.1) { title = 'BONUS: UP FRONT'; col = '#b07c10' }
    if (t >= T.cardOut[0]) { title = 'THE PROTOCOL'; col = '#2a2350' }
    const tk = pop1(t, [-1, T.exA, T.exB, T.h4 - 0.1, T.cardOut[0]].filter(v => v <= t).pop() ?? -1, 0.3)
    x.save(); x.translate(cx, Y + 74); x.rotate(-0.015); x.scale(1, tk)
    x.font = `800 ${title.length > 14 ? 50 : 72}px ${INTER}`; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, 0)
    R(x, col, -x.measureText(title).width / 2, 34, x.measureText(title).width, 6)
    x.restore()
    if (t < T.exA || t >= T.cardOut[0]) {
      // the protocol, step by step
      x.font = `700 40px ${INTER}`; x.fillStyle = '#3a3358'; x.textAlign = 'left'
      ;['1. say it', '2. say it kindly', '3. say it once'].forEach((s, i) => { const sk = t < T.exA ? 1 : pop1(t, T.cardOut[0] + 0.2 + i * 0.25, 0.3); if (sk > 0) { x.save(); x.globalAlpha = clamp(sk); x.fillText(s, X + 90, Y + 200 + i * 80); if (t >= T.cardOut[0]) { const ck = pop1(t, T.cardOut[0] + 0.5 + i * 0.25, 0.25); x.font = `800 52px ${INTER}`; x.fillStyle = '#1f9a6a'; x.save(); x.translate(X + 520, Y + 196 + i * 80); x.scale(ck, ck); x.fillText('✓', 0, 0); x.restore(); x.font = `700 40px ${INTER}`; x.fillStyle = '#3a3358' } x.restore() } })
    }
    x.restore()
  }

  // the two demo stars on the board
  function demo(t) {
    let on = null
    if (t >= T.demo && t < T.demoOut[1]) on = 'A'
    if (t >= T.demo2 && t < T.part[1] + 0.2) on = 'B'
    if (!on) return
    const t0 = on === 'A' ? T.demo : T.demo2
    let k = pop1(t, t0, 0.35)
    if (on === 'A') k *= 1 - ease.inCubic(prog(t, ...T.demoOut))
    // receiver (right)
    let rx = DEMO_R.x, gxp = DEMO_L.x, gy = DEMO_L.y, ga = 1
    if (on === 'B') { const p = ease.inOutCubic(prog(t, ...T.part)); rx += p * 400; gxp -= p * 400; k *= 1 - p }
    let rMood = 'neutral', rLook = [-1, -1]
    if (on === 'A') { rMood = t < T.seen ? 'happy' : t < T.away[0] ? 'neutral' : 'sleepy'; if (t > T.cal[0]) rMood = 'neutral'; rLook = t > T.cal[0] ? [0, 1] : [-1, 0] }
    else { rMood = t < T.kind ? 'neutral' : t < T.nod ? 'squint' : t < T.thanks ? 'neutral' : 'happy'; rLook = [-1, 0] }
    const nodY = on === 'B' && inR(t, [T.nod, T.nod + 0.5]) ? Math.sin(Math.PI * prog(t, T.nod, T.nod + 0.5)) * 12 : 0
    const waveH = on === 'B' && inR(t, T.wave) ? [T.wave[0] + 0.05, T.wave[0] + 0.25] : null
    drawStarChar(x, rx, DEMO_R.y + nodY, DEMO_R.s, t, { color: THEM_COL, mood: rMood, look: rLook, seed: 31, pop: k, glow: 0.6, squash: on === 'A' && t > T.cal[0] ? 0.12 : 0, hops: waveH || [t0 + 0.1, T.thanks] })
    // ghost (left)
    let gMood = 'neutral', gLook = [1, 0]
    if (on === 'A') {
      ga = 1 - 0.8 * ease.inOutQuad(prog(t, ...T.fade))
      const aw = ease.inCubic(prog(t, ...T.away)); gy -= aw * 420; gxp -= aw * 120
      gMood = t < T.textA + 0.3 ? 'neutral' : t < T.fade[0] ? 'wide' : 'squint'; gLook = t < T.fade[0] ? [1, 0] : [-1, -1]
      if (t > T.away[1]) ga = 0
    } else { gMood = t < T.dots[0] ? 'neutral' : t < T.kind ? 'squint' : t < T.thanks ? 'neutral' : 'happy'; gLook = [1, 0] }
    const wob = on === 'A' && t > T.fade[0] ? Math.sin(t * 9) * 6 : 0
    x.save(); x.globalAlpha *= ga
    if (ga > 0.01) drawStarChar(x, gxp + wob, gy, DEMO_L.s, t, { alpha: ga, color: GHOST_COL, mood: gMood, look: gLook, seed: 33, pop: k, glow: on === 'A' ? 0.6 + 0.6 * prog(t, ...T.fade) : 0.6, hops: on === 'B' ? (waveH || [t0 + 0.12, T.dots[0], T.kind]) : [t0 + 0.12] })
    x.restore()
    // translucent wisps while it fades
    if (on === 'A' && t > T.fade[0] && ga > 0.01) for (let i = 0; i < 4; i++) { const ph = ((t - T.fade[0]) * 0.8 + i * 0.25) % 1; x.save(); x.globalAlpha *= 0.35 * Math.sin(Math.PI * ph); R(x, GHOST_COL, gxp - 40 + i * 26, gy + 60 + ph * 60, 10, 18); x.restore() }
    // the texts
    const msgY = 700
    const tA = on === 'A' ? T.textA : T.textB
    if (t >= tA && k > 0.3 && !(on === 'B' && t > T.kind)) {
      const bk = pop1(t, tA, 0.3)
      x.save(); x.translate(DEMO_R.x - 30, msgY); x.scale(bk, bk)
      bubble(x, 0, 0, 380, 84, { fill: '#3d6cf2', tail: 'b', P: 6 })
      x.font = `800 34px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('so… next weekend?', 0, 2)
      x.restore()
      if (on === 'A' && t > T.seen) { x.font = `700 24px ${MONO}`; x.fillStyle = '#8a8fa8'; x.textAlign = 'center'; x.fillText('Seen', DEMO_R.x + 110, msgY + 72) }
    }
    if (on === 'A' && inR(t, T.cal)) {
      // the calendar flipping beside the one left waiting
      const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU']
      const i = Math.min(days.length - 1, Math.floor(prog(t, ...T.cal) * days.length))
      const ck = pop1(t, T.cal[0], 0.3) * (1 - ease.inCubic(prog(t, ...T.demoOut)))
      x.save(); x.translate(470, 880); x.scale(ck, ck)
      R(x, INK, -66, -70, 132, 140); R(x, '#fbf7ee', -60, -64, 120, 128); R(x, RED, -60, -64, 120, 36)
      x.font = `700 24px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(days[i], 0, -46)
      x.font = `800 52px ${INTER}`; x.fillStyle = INK; x.fillText(String(12 + i), 0, 18)
      x.restore()
    }
    if (on === 'B') {
      if (inR(t, T.dots)) { bubble(x, DEMO_L.x + 40, 780, 110, 54, { fill: '#efe6d6', P: 4, shine: false }); for (let d = 0; d < 3; d++) R(x, '#3a3358', DEMO_L.x + 8 + d * 24, 772 + (Math.sin(t * 10 - d) > 0.3 ? -4 : 0), 14, 14) }
      if (t >= T.kind && t < T.part[0]) {
        const kk = pop1(t, T.kind, 0.35) * (1 - ease.inCubic(prog(t, T.thanks - 0.25, T.thanks)))
        x.save(); x.translate(540, 690); x.scale(kk, kk)
        bubble(x, 0, 0, 800, 200, { fill: '#2fa877', tail: 'b', P: 8 })
        x.font = `800 38px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'
        ;['I enjoyed meeting you, but I', "don't feel a match.", 'Wishing you the best.'].forEach((l, i) => x.fillText(l, 0, -54 + i * 54))
        x.restore()
      }
      if (t >= T.thanks && t < T.part[0]) {
        const tk = pop1(t, T.thanks, 0.3)
        x.save(); x.translate(DEMO_R.x - 40, 780); x.scale(tk, tk)
        bubble(x, 0, -40, 330, 70, { fill: '#3d6cf2', tail: 'b', P: 6 })
        x.font = `800 28px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('thanks for telling me ♥', 0, -38)
        x.restore()
      }
    }
  }

  function audience(t) {
    for (const a of AUD) {
      const k = popOut(t, T.out)
      let mood = 'neutral', look = [0, -1], sq = 0, dy = 0, blink, hops = [T.gasp + a.i * 0.02]
      if (t >= T.fade[0] && t < T.cut1) { mood = 'wide'; look = [-1, -1] }
      if (t >= T.cal[0] && t < T.cut1) { mood = 'squint'; look = [0, -1] }
      if (t >= T.kind && t < T.gasp) { mood = 'neutral'; look = [0, -1] }
      if (t >= T.gasp && t < T.l7) { mood = 'wide'; look = [0, -1]; sq = -0.12 * (1 - prog(t, T.gasp, T.gasp + 0.6)); blink = false }
      if (t >= T.l7 && t < T.clap[0]) { mood = 'sparkle'; look = [0, -1] }
      if (t >= T.l8 && t < T.clap[0]) { mood = 'wide'; look = [a.x < 375 ? 1 : -1, 0] }
      if (t >= T.clap[0] && t < T.banner) { mood = 'happy'; const lag = a.i * 0.12, cl = (t - T.clap[0] - lag); if (cl > 0) { const rate = 0.55 - 0.35 * clamp(cl / 1.8); sq = Math.max(0, Math.sin(cl / rate * Math.PI)) * 0.1 } }
      if (t >= T.banner) { mood = 'sparkle'; look = [0, -1] }
      if (t >= T.l10) { mood = 'happy'; look = [0, 0] }
      if (a.id === 'pisces') {
        if (inR(t, [T.stand[0], T.sit[1]])) { const st = ease.outBack(prog(t, ...T.stand)) * (1 - ease.inOutCubic(prog(t, ...T.sit))); dy = -210 * st; mood = 'sparkle'; look = [0, -1] }
        if (t >= T.gasp) hops.push(T.stand[0], T.l8 + 0.4)
      }
      if (a.id === 'aries') hops.push(...talkHops(ALL, ARI_TAG, { cps: CPS }))
      const r = drawStarChar(x, a.x, a.y + dy, a.id === 'pisces' && dy < -10 ? 150 : a.s, t, { color: a.color, mood, look, blink, squash: sq, hops, seed: 40 + a.i, pop: k, glow: 0.6 })
      // tiny notebooks once they're told
      if (t > T.l2 + 1.1 && t < T.gasp && a.id !== 'pisces') { const nk = pop1(t, T.l2 + 1.1 + a.i * 0.08, 0.25); x.save(); x.translate(a.x + 34, a.y + 30); x.rotate(-0.2); x.scale(nk * k, nk * k); R(x, INK, -16, -20, 32, 40); R(x, '#fbf7ee', -13, -17, 26, 34); R(x, '#8a8fa8', -9, -10, 18, 3); R(x, '#8a8fa8', -9, -2, 14, 3); x.restore() }
      // Pisces: always a little teary; the fountain when it stands
      if (a.id === 'pisces') {
        const cell = r.size / 36, ey = r.y + 1.2 * cell, dx = 4.6 * cell
        const amt = inR(t, [T.stand[0], T.sit[1] + 1]) ? 1 : 0.4
        for (const side of [-1, 1]) for (let q = 0; q < (amt > 0.5 ? 6 : 2); q++) {
          const ph = ((t * (amt > 0.5 ? 1.6 : 0.7)) + q / 6) % 1
          const gx2 = r.x + side * dx + side * (amt > 0.5 ? 80 : 6) * ph, gy2 = ey + (amt > 0.5 ? -60 * ph + 200 * ph * ph : 40 * ph * ph)
          x.save(); x.globalAlpha *= k * (1 - ph * 0.7); R(x, '#9fe4ff', gx2 - 3, gy2, 7, 12); x.restore()
        }
      }
    }
    // the clap: little pixel bursts over the audience
    if (inR(t, T.clap)) for (const a of AUD) { const lag = a.i * 0.12, cl = t - T.clap[0] - lag; if (cl > 0) { const rate = 0.55 - 0.35 * clamp(cl / 1.8), ph = (cl / rate) % 2; if (ph < 0.35) { x.save(); x.globalAlpha *= 1 - ph / 0.35; R(x, BONE, a.x - 30, a.y - 80, 8, 8); R(x, BONE, a.x + 22, a.y - 84, 8, 8); R(x, BONE, a.x - 4, a.y - 96, 8, 8); x.restore() } } }
  }

  // the pointer from Capricorn to the board
  function pointer(t, r) {
    if (!r || t > T.boardDim[0]) return
    const tgt = t < T.exA ? [420, 650] : t < T.exB ? [DEMO_L.x + 40, 760] : t < T.kind ? [DEMO_L.x + 40, 760] : [600, 720]
    const sx = r.x - 90, sy = r.y + 10
    const ang = Math.atan2(tgt[1] - sy, tgt[0] - sx) + Math.sin(t * 3) * 0.03
    x.save(); x.translate(sx, sy); x.rotate(ang); R(x, INK, 0, -5, 230, 10); R(x, '#c58a4a', 0, -3, 226, 6); R(x, RED, 220, -6, 16, 12); x.restore()
  }

  function dealCard(t) {
    if (t < T.card[0] || t > T.cardOut[1]) return
    const k = easeOutBack(prog(t, ...T.card), 1.8) * (1 - ease.inCubic(prog(t, ...T.cardOut)))
    if (k <= 0.01) return
    x.save(); x.translate(540, 780); x.rotate(0.03); x.scale(k, k)
    pixelPanel(x, -230, -190, 460, 340, { P: 8, fill: '#2a1f52', border: GOLD, glow: 0.5 })
    drawPixelStar(x, 0, -120, 54, 2, GOLD)
    x.font = `700 24px ${MONO}`; x.fillStyle = rgba(BONE, 0.8); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR CARD · DEALBREAKERS', 0, -60)
    ;['✕ NOT LOOKING FOR CASUAL', '✕ NO LONG DISTANCE'].forEach((s, i) => {
      const sk = easeOutBack(prog(t, T.stamps[i], T.stamps[i] + 0.25), 3)
      if (sk <= 0) return
      x.save(); x.translate(0, 10 + i * 76); x.rotate(-0.04 + i * 0.06); x.scale(sk * (1 + 0.6 * (1 - clamp(sk))), sk)
      R(x, RED, -200, -28, 400, 56); x.font = `700 26px ${MONO}`; x.fillStyle = '#fff'; x.fillText(s, 0, 2); x.restore()
    })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawBoard(t)
        demo(t)
        veil(x, t, T.banner - 0.1, T.lessonOut, 0.35)
        dealCard(t)
        const rC = actor(x, t, CAPRI)
        pointer(t, rC)
        audience(t)
        if (inR(t, [T.gasp, T.gasp + 0.6])) sparkBurst(x, t, 540, 1250, T.gasp, { n: 12, R: 420, size: 24, seed: 3, cols: [BONE, GOLD] })
        if (inR(t, [T.l8, T.l8 + 2])) drawHearts(x, t, T.l8 + 0.2, 375, 1060, { n: 7, px: 7, spread: 160 })
        lessonBanner(x, t, T.banner, T.lessonOut)
      }
      boxes.forEach(b => b.update(t))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates; the default selection keeps 12.9 (→ exhibit B) and 28.2 (→ the lesson)
export const CUTS = [5.35, { t: T.cut1, kind: 'flip' }, 25.08, { t: T.cut2, kind: 'deal' }, 36.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (screwed, C#m)
const CS = { Cs5: 554.37, E5: 659.25, Gs5: 830.61 }
const PITCH = { [CAP_TAG]: 659.25, [PIS_TAG]: 987.77, [ARI_TAG]: 880 }
export const CUES = [
  ...whistleBlow(0.0, 0.4),
  ...[0, 1, 2].map(i => ['pop', +(0.6 + i * 0.5).toFixed(3), [659.25, 783.99, 987.77][i], 0.03, 0]),
  ...AUD.map((a, i) => ['tick', +(T.l2 + 1.1 + i * 0.08).toFixed(3), 0.025]),
  // exhibit A
  ...head(T.h1, 1, T.h1Land, 2), ['pop', T.demo, 880, 0.035, -0.3], ['pop', T.demo + 0.05, 783.99, 0.035, 0.3],
  ['pop', T.textA, 1174.66, 0.045, 0.3], ['tick', T.seen, 0.04],
  ['whoosh', T.fade[0], 0.9, 0.04], ['glitter', T.fade[0], T.fade[1]], ['whoosh', T.away[0], 0.8, 0.05], ...womp(T.away[0] + 0.3, 466.16),
  ...Array.from({ length: 11 }, (_, i) => ['tick', +(T.cal[0] + i * (T.cal[1] - T.cal[0]) / 11).toFixed(3), 0.035]),
  ...crickets(T.cal[0] + 0.2, T.cal[1]),
  // exhibit B
  ...head(T.h2, 1, T.h2Land, 4), ['pop', T.textB, 1174.66, 0.045, 0.3],
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.dots[0] + i * 0.12).toFixed(3), 0.025]),
  ['pop', T.kind, 1318.51, 0.05, -0.2], ['bell', T.kind + 0.05, 1567.98, 0.03, 1.4, 0], ['glitter', T.kind, T.kind + 0.5],
  ['pop', T.nod, 523.25, 0.03, 0.3], ['pop', T.thanks, 1174.66, 0.04, 0.3], ['pluck', T.thanks + 0.05, 1318.51, 0.03, 0.5, 0.3],
  ['whoosh', T.part[0], 0.5, 0.04],
  ['whoosh', T.gasp - 0.05, 0.25, 0.06], ...AUD.map((a, i) => ['pop', +(T.gasp + i * 0.02).toFixed(3), 392 + i * 30, 0.03, (a.x - 540) / 600]), ['boom', T.gasp, 0.1],
  ...whistleBlow(T.gasp + 3.4, 0.25),
  // Pisces + the slow clap (gets faster)
  ['whoosh', T.stand[0], 0.3, 0.05], ['pop', T.stand[1], 1046.5, 0.04, -0.2], ['glitter', T.stand[0], T.stand[1] + 0.6],
  ...(() => { const out = []; for (let k = 0, tt = T.clap[0]; tt < T.clap[1]; k++) { out.push(['clap', +tt.toFixed(3), { gain: 0.1 + 0.08 * Math.min(1, k / 8), rev: 0.3 }]); tt += Math.max(0.16, 0.55 - k * 0.06) } return out })(),
  ...cheer(T.clap[1] - 0.6, 1.2, 0.04),
  // lesson
  ...levelUp(T.banner, [CS.Cs5, CS.E5, CS.Gs5]), ...cheer(T.banner, 1.6, 0.045), ['pop', T.banner + 0.45, 1567.98, 0.03, 0.4],
  ...wordPops(T.lesson, 7, 0.08, 0, 0.022), ['pluck', T.lesson + 0.4, 1318.51, 0.04, 0.8, 0],
  ...[0, 1, 2].map(i => ['tick', +(T.cardOut[0] + 0.5 + i * 0.25).toFixed(3), 0.04]),
  ['whoosh', T.lessonOut[0], 0.35, 0.03],
  // up front + dismissed
  ...head(T.h4, 1, T.h4Land, 1), ['whoosh', T.card[0], 0.4, 0.04], ...T.stamps.map(t => ['boom', t, 0.09]), ...T.stamps.map(t => ['pop', t, 330, 0.05, 0]),
  ...head(T.h5, 1, T.h5Land, 3), ...whistleBlow(T.blow1[0], 0.6), ...cheer(T.blow1[0] + 0.3, 1.2, 0.035),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...[LINES1, LINES2, LINES3, LINES4].flatMap(ls => talkCues(ls, { cps: CPS, pitch: PITCH })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
].filter(c => c[1] >= 0)
export const HOLDS = holds(BOXES, lineTimes, CPS)
