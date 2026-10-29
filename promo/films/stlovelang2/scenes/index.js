// stlovelang2 (60 s vertical Align ad, Star Talk season 2 extra #4: "The Love Language Olympics"; promo/films/STARTALK12.md,
// folder renamed from stlovelang because a season 3 film lives there. That film already plays the talk-card "how do you like
// to be loved?" flip, so this one turns on an instant replay instead, and its lesson and tie-in differ) · story 0–55.6,
// then the shared end card.
//   0.00–4.50  "The Love Language | *Olympics.*"  THE BOOTH (♊ Gemini + ♐ Sag, headsets, one mic) at the desk; ♌ LEO (crown)
//              and ♍ VIRGO (clipboard) on the field. GEMINI: "WELCOME to the Love Language *Olympics!*"  SAG: "Today's
//              pair: Leo and *Virgo.*"
//   4.6–13.6   "Event one: | *the surprise.*"  Confetti; gifts arc over from Leo and pile up round Virgo until only its eyes
//              show. LEO: "SURPRISE! I got you *everything!*"  GEMINI: "Leo goes BIG! A *parade* of gifts!"  SAG: "And Virgo
//              is… *overwhelmed.*"  Pisces sobs in the stands.
//  13.70       card cut (flip)
//  13.8–21.9   "Event two: | *the closet.*"  Virgo quietly sorts Leo's messy closet into neat colour rows; Leo admires
//              itself in a hand mirror. SAG (whisper): "Virgo's *quietly* fixing the closet…"  GEMINI: "And Leo didn't
//              *notice.*" (womp, crickets; Virgo droops)
//  22.00       card cut (deal)
//  22.1–33.5   "Instant | *replay.*"  The jumbotron (VHS lines). GEMINI: "They're speaking *different languages,* folks!"
//              Two panels: WHAT LIGHTS LEO UP (applause) · WHAT LIGHTS VIRGO UP (a helping hand). SAG: "Each one loves the
//              way *they* like it."  Leo and Virgo look up, double-take, light bulbs. LEO: "…you like *help?*"
//              VIRGO: "…you like *applause?*"
//  33.60       card cut (shuffle)
//  33.7–41.3   "Event three: | *the swap.*"  Leo quietly does Virgo's dishes; Virgo glows. Virgo whips out a sign and
//              pom-poms: "LEO! YOU ARE *ICONIC!*"  Leo melts. GEMINI: "THEY GET IT! THEY *GET* IT!"  Confetti, Pisces wails.
//  41.5–45.4   ★ LESSON UNLOCKED: "Watch what | lights them *up.* | Then do that."
//  45.6–49.1   A card with PUSH and ALIGN chips. GEMINI: "Push: where you'll rub. Align: where it *holds.*"
//  49.3–55.45  "Medal | *ceremony.*"  The podium: both on the top step. SAG: "And the gold goes to… *both of them.*"
//              Two gold medals drop. Everything pops out by 55.45; end card at 55.6.
// One canvas (sky + booth + field + props + jumbotron + banner), DOM type + the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawMic, drawDesk, confetti } from '../../stlive5th/scenes/props.js'
import { popText, actor, lessonBanner, veil, bubble, pixelPanel, sparkBurst, drawHearts, drawPixelStar, easeOutBack, drawCrown,
  pop01, outK, popOut, rgba, inR, R, FONTS, GOLD, BONE, PINK, LAV, INK, MINT, RED, INTER, MONO,
  head, wordPops, chip, scratch, womp, drumroll, levelUp, crickets, cheer, flutter, holds } from '../../stgroupchat2/kit.js'

export const DURATION = 60
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const LEO = signStar('leo'), VIR = signStar('virgo'), GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces')
const L_TAG = `${LEO.glyph} LEO`, V_TAG = `${VIR.glyph} VIRGO`, G_TAG = `${GEM.glyph} GEMINI`, S_TAG = `${SAG.glyph} SAG`
const L_TXT = '#ffc46b', V_TXT = '#ff8fbd', G_TXT = '#ffe066', S_TXT = '#d0a8ff'

export const T = {
  open1: -1.6, l1: -1.4, l2: 2.5,
  h0Out: [4.45, 4.6], h1: 4.65, h1Land: 5.0, l3: 5.2, conf1: 5.15, gifts: [5.4, 9.6], l4: 7.95, l5: 10.85, close1: 13.58, h1Out: [13.4, 13.6], giftsOut: [13.35, 13.65],
  cut1: 13.7,
  h2: 13.8, h2Land: 14.15, closet: [13.8, 14.2], open2: 14.1, l6: 14.3, sort: [15.0, 17.6], l7: 17.15, womp: 18.15, chirp: [18.9, 21.3], close2: 19.6, droop: 19.0,
  passBy: [19.8, 21.4], h2Out: [21.7, 21.9], closetOut: [21.6, 21.9],
  cut2: 22.0,
  h3: 22.1, h3Land: 22.45, tron: [22.1, 22.5], open3: 22.4, l8: 22.6, panL: 24.45, panR: 25.15, l9: 25.95, look: 27.6, bulb: 28.4, l10: 28.9, l11: 31.0, close3: 33.4,
  tronOut: [33.3, 33.55], h3Out: [33.3, 33.5],
  cut3: 33.6,
  h4: 33.7, h4Land: 34.05, sink: [33.75, 34.15], dishes: [34.3, 36.0], glowV: 35.4, sign: 36.15, open4: 36.2, l12: 36.4, melt: 37.4, l13: 38.85, conf2: 38.85, close4: 41.47,
  h4Out: [41.25, 41.45], sinkOut: [41.2, 41.45],
  banner: 41.5, lesson: 41.9, lessonLate: 42.7, lessonOut: [45.15, 45.4],
  h5: 45.55, h5Land: 45.9, card: [45.55, 45.95], open5: 45.65, l14: 45.8, cardOut: [48.95, 49.2], h5Out: [49.0, 49.15],
  h6: 49.3, h6Land: 49.65, podium: [49.2, 49.7], l15: 49.45, medals: [51.25, 51.6], close5: 55.3,
  out: [55.0, 55.45],
}
const L = (t, speaker, text) => ({ t, speaker, text, color: { [L_TAG]: L_TXT, [V_TAG]: V_TXT, [G_TAG]: G_TXT, [S_TAG]: S_TXT }[speaker] })
const LINES1 = [L(T.l1, G_TAG, 'WELCOME to the Love Language *Olympics!*'), L(T.l2, S_TAG, "Today's pair: Leo and *Virgo.*"),
  L(T.l3, L_TAG, 'SURPRISE! I got you *everything!*'), L(T.l4, G_TAG, 'Leo goes BIG! A *parade* of gifts!'), L(T.l5, S_TAG, 'And Virgo is… *overwhelmed.*')]
const LINES2 = [L(T.l6, S_TAG, "Virgo's *quietly* fixing the closet…"), L(T.l7, G_TAG, "And Leo didn't *notice.*")]
const LINES3 = [L(T.l8, G_TAG, "They're speaking *different languages,* folks!"), L(T.l9, S_TAG, 'Each one loves the way *they* like it.'),
  L(T.l10, L_TAG, '…you like *help?*'), L(T.l11, V_TAG, '…you like *applause?*')]
const LINES4 = [L(T.l12, V_TAG, 'LEO! YOU ARE *ICONIC!*'), L(T.l13, G_TAG, 'THEY GET IT! THEY *GET* IT!')]
const LINES5 = [L(T.l14, G_TAG, "Push: where you'll rub. Align: where it *holds.*"), L(T.l15, S_TAG, 'And the gold goes to… *both of them.*')]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4], [LINES5, T.close5]]
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5]
const hopsOf = tag => talkHops(ALL, tag, { cps: CPS })

// ── where things stand
const BOOTH_Y = 650
const boothOn = t => !(t >= T.cut2 && t < T.cut3) && t < T.banner
const LEO_A = [290, 1195, 240], VIR_A = [790, 1195, 240]
const LEO_C = [215, 1195, 230], VIR_C = [850, 1195, 230]
const LEO_S = [330, 1195, 230], VIR_S = [860, 1195, 230]
const POD_L = [410, 1080, 200], POD_V = [670, 1080, 200]
const LEO_ACT = { color: LEO.color, glyph: LEO.glyph, seed: 4, prop: 'crown', out: T.out,
  pos: [[0, ...LEO_A], [T.closet[1], ...LEO_C], [T.passBy[0], ...LEO_C], [T.passBy[1], 470, 1195, 230, 'io', 0, 1.4], [T.cut2, ...LEO_A, 'cut', 0, 0.01],
    [T.sink[1], ...LEO_S, 'io', 20], [T.podium[1], ...POD_L, 'back', 60, 0.5]],
  hops: [...hopsOf(L_TAG), 0.0 - 0.15, T.conf1, T.gifts[0] + 1, T.gifts[0] + 2.2, T.bulb, T.dishes[0] + 0.5, T.dishes[0] + 1.2, T.melt, T.l13 + 0.4, T.medals[1], T.medals[1] + 0.6],
  mood: [[-9, 'happy', 0, 0], [T.l2, 'wink', 1, 0], [T.l3, 'happy', 1, 0], [T.gifts[1], 'sparkle', 1, 0], [T.l5, 'neutral', 1, 0], [T.cut1, 'squint', -1, -1],
    [T.passBy[0], 'happy', 1, -1], [T.cut2, 'neutral', 0, -1], [T.panL, 'happy', 0, -1], [T.look, 'wide', 1, -1, false], [T.bulb, 'sparkle', 1, 0], [T.l11, 'wide', 1, 0],
    [T.sink[0], 'neutral', 1, 1], [T.glowV, 'happy', 1, 1], [T.l12 + 0.4, 'wide', 1, 0], [T.melt, 'heart'], [T.banner, 'sparkle'], [T.h5, 'happy', 1, 0], [T.medals[1], 'heart']],
  squash: [[0, 0], [T.melt, 0.18], [T.l13, 0]] }
const VIR_ACT = { color: VIR.color, glyph: VIR.glyph, seed: 6, clipboard: [[0, 1], [T.gifts[0] + 2, 0], [T.cut1, 1], [T.cut3, 0]], out: T.out,
  pos: [[0, ...VIR_A], [T.gifts[0] + 2.6, 790, 1035, 200, 'io', 40, 0.6], [T.cut1, 790, 1035, 200], [T.cut1 + 0.02, ...VIR_A, 'cut', 0, 0.02], [T.closet[1], ...VIR_C], [T.cut2, ...VIR_A, 'cut', 0, 0.01], [T.sink[1], ...VIR_S], [T.podium[1], ...POD_V, 'back', 60, 0.5]],
  hops: [...hopsOf(V_TAG), T.l2 + 0.6, T.sort[0], T.sort[0] + 0.8, T.sort[0] + 1.6, T.bulb + 0.05, T.glowV, T.sign, T.medals[1] + 0.05, T.medals[1] + 0.65],
  mood: [[-9, 'neutral', -1, 0], [T.l2 + 0.6, 'happy', 0, 0], [T.l3, 'wide', -1, 0], [T.gifts[0] + 1.5, 'wide', 0, -1, false], [T.cut1, 'neutral', 0, 0], [T.sort[0], 'squint', -1, 0],
    [T.sort[1], 'happy', -1, 0], [T.l7 + 0.5, 'neutral', -1, 0], [T.droop, 'squint', -1, 1], [T.cut2, 'neutral', 0, -1], [T.panR, 'happy', 0, -1], [T.look, 'wide', -1, -1, false],
    [T.bulb, 'sparkle', -1, 0], [T.sink[0], 'neutral', -1, 0], [T.glowV, 'heart'], [T.sign, 'happy', -1, 0], [T.banner, 'sparkle'], [T.h5, 'happy', -1, 0], [T.medals[1], 'heart']],
  sweat: [[0, 0], [T.gifts[0] + 1, 1], [T.cut1, 0]],
  squash: [[0, 0], [T.droop, 0.16], [T.cut2, 0]] }
const GEMINI = { kind: 'booth', color: GEM.color, propCol: '#ffe066', seed: 21, pos: [[0, 400, BOOTH_Y, 150]], hops: [-0.2, ...hopsOf(G_TAG)],
  mood: [[-9, 'wide', 0, 0], [0.8, 'happy', 0, 1], [T.l4, 'wide', 0, 1], [T.l5, 'squint', 1, 1], [T.l7, 'neutral', 1, 1], [T.womp, 'squint', 0, 0], [T.cut3, 'neutral', 1, 1], [T.l12, 'wide', 1, 1], [T.l13, 'happy']],
  tears: [[0, 0], [T.l13 + 1, [0.8, true]]] }
const SAGIT = { kind: 'booth', color: SAG.color, propCol: '#b07cff', seed: 23, pos: [[0, 680, BOOTH_Y, 150]], hops: hopsOf(S_TAG),
  mood: [[-9, 'happy', -1, 0], [T.l2, 'happy', 0, 1], [T.l5, 'squint', 0, 1], [T.l6, 'squint', 0, 1], [T.womp, 'eyeroll'], [T.cut3, 'neutral', 0, 1], [T.l12, 'wide', 0, 1], [T.l13, 'sparkle']] }
const PISCES = { color: PIS.color, seed: 17, pos: [[0, 1000, 930, 110]], glow: 0.8, out: T.out,
  mood: [[0, 'happy'], [T.cut2, 'wide', -1, -1], [T.bulb, 'sparkle'], [T.l13, 'happy']],
  tears: [[0, [0.8, true]], [T.cut2, [0.4, false]], [T.l13, [1, true]], [T.banner, [0.5, false]]], hops: [T.gifts[1], T.l13 + 0.2, T.medals[1] + 0.2] }

const pop1 = (t, t0, d = 0.3) => easeOutBack(prog(t, t0, t0 + d), 2.2)
const GIFT_COLS = [['#ff5d73', '#ffe066'], ['#5ec8ff', '#ffffff'], ['#7fe08a', '#ff8fb1'], ['#c9a6ff', '#ffe066'], ['#ffb05e', '#5ec8ff']]
// the pile: 12 gifts, landing in rows round Virgo (x offsets, y levels from the floor)
const PILE = [[-110, 0], [0, 0], [110, 0], [-160, 0], [160, 0], [-80, -1], [30, -1], [130, -1], [-130, -1], [-30, -2], [80, -2], [10, -3]]

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The Love Language | *Olympics.*', { top: 150, size: 100, accentSize: 156, at: -1, late: 1, lateAt: -0.6, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'Event one: | *the surprise.*', { top: 150, size: 100, accentSize: 150, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: L_TXT })
  const H2 = popText(root, 'Event two: | *the closet.*', { top: 150, size: 100, accentSize: 150, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: V_TXT })
  const H3 = popText(root, 'Instant *replay.*', { top: 200, size: 100, accentSize: 150, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: RED })
  const H4 = popText(root, 'Event three: | *the swap.*', { top: 150, size: 100, accentSize: 150, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: MINT })
  const H5 = popText(root, 'Know your | *Push.*', { top: 150, size: 100, accentSize: 156, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: READING.push })
  const H6 = popText(root, 'Medal | *ceremony.*', { top: 150, size: 100, accentSize: 156, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: GOLD })
  const LESSON = popText(root, 'Watch what | lights them *up.* | Then do that.', { top: 650, size: 100, accentSize: 150, at: T.lesson, gap: 0.08, late: 0, wobble: true, lineHeight: 1.06 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.out], [LESSON, T.lessonOut]]
  const BOX_Y = 1450
  const mk = (lines, open, close) => dialogueBox(root, { lines, y: BOX_Y, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [mk(LINES1, T.open1, T.close1), mk(LINES2, T.open2, T.close2), mk(LINES3, T.open3, T.close3), mk(LINES4, T.open4, T.close4), mk(LINES5, T.open5, T.close5)]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function boothK(t) {
    if (t >= T.banner) return 0
    if (t >= T.cut2 && t < T.cut3) return 0
    let k = 1
    if (t >= T.cut3) k = pop1(t, T.cut3 + 0.1, 0.35)
    if (t > T.cut2 - 0.3 && t < T.cut2) k = 1 - prog(t, T.cut2 - 0.3, T.cut2)
    if (t > T.banner - 0.3) k *= 1 - prog(t, T.banner - 0.3, T.banner)
    return k
  }
  function drawBooth(t) {
    const k = boothK(t)
    if (k <= 0.01) return
    x.save(); x.translate(540, BOOTH_Y + 60); x.scale(k, k); x.translate(-540, -(BOOTH_Y + 60))
    actor(x, t, GEMINI); actor(x, t, SAGIT)
    drawDesk(x, 230, 850, BOOTH_Y + 55, 70)
    x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('● LIVE · LOVE LANGUAGE OLYMPICS', 540, BOOTH_Y + 92)
    let s = null; for (const l of ALL) if (l.t <= t) s = l.speaker
    drawMic(x, 540, BOOTH_Y + 55, s === G_TAG ? -0.4 : s === S_TAG ? 0.4 : 0, 0.8)
    x.restore()
  }

  function drawGift(cx, cy, w, cols, rot = 0) {
    x.save(); x.translate(cx, cy); x.rotate(rot)
    R(x, INK, -w / 2 - 4, -w * 0.8 - 4, w + 8, w * 0.8 + 8); R(x, cols[0], -w / 2, -w * 0.8, w, w * 0.8)
    R(x, cols[1], -w * 0.08, -w * 0.8, w * 0.16, w * 0.8); R(x, cols[1], -w / 2, -w * 0.48, w, w * 0.14)
    R(x, cols[1], -w * 0.28, -w * 0.98, w * 0.22, w * 0.18); R(x, cols[1], w * 0.06, -w * 0.98, w * 0.22, w * 0.18)
    x.restore()
  }
  function drawGifts(t) {
    if (t < T.gifts[0] || t > T.giftsOut[1]) return
    const out = 1 - ease.inCubic(prog(t, ...T.giftsOut))
    const n = PILE.length, dur = T.gifts[1] - T.gifts[0]
    PILE.forEach(([dx, lv], i) => {
      const t0 = T.gifts[0] + i * (dur / n) * 0.92, fl = 0.55
      if (t < t0) return
      const p = clamp((t - t0) / fl)
      const tx = VIR_A[0] + dx, ty = 1300 + lv * 82
      const sx = LEO_A[0] + 40, sy = 1120
      const gx2 = lerp(sx, tx, p), gy2 = lerp(sy, ty, p) - Math.sin(Math.PI * p) * 300
      const land = p >= 1 ? Math.exp(-(t - t0 - fl) * 10) * Math.sin((t - t0 - fl) * 30) * 0.08 : 0
      x.save(); x.globalAlpha *= out
      drawGift(gx2, gy2, 92, GIFT_COLS[i % GIFT_COLS.length], (1 - p) * (i % 2 ? 2 : -2) + land)
      x.restore()
    })
    // balloons tied to the pile
    const bk = pop1(t, T.gifts[1] - 0.3, 0.5) * out
    if (bk > 0.01) for (let i = 0; i < 3; i++) {
      const bx = VIR_A[0] - 80 + i * 80 + Math.sin(t * 2 + i) * 8, by = 880 - i % 2 * 40
      x.save(); x.globalAlpha *= bk; x.strokeStyle = BONE; x.lineWidth = 2; x.beginPath(); x.moveTo(bx, by + 50); x.lineTo(VIR_A[0] - 20 + i * 20, 1050); x.stroke()
      x.fillStyle = ['#ff5d73', '#ffe066', '#5ec8ff'][i]; x.beginPath(); x.ellipse(bx, by, 38, 48, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(bx - 18, by - 28, 10, 14); x.restore()
    }
  }

  // the closet: messy → sorted
  const CLOTHES = Array.from({ length: 14 }, (_, i) => ({ col: ['#ff5d73', '#ffb05e', '#ffe066', '#7fe08a', '#5ec8ff', '#c9a6ff', '#ff8fb1'][i % 7], r: ((i * 53) % 17) / 17, s: ((i * 29) % 13) / 13 }))
  function drawCloset(t) {
    if (t < T.closet[0] || t > T.closetOut[1]) return
    const k = pop1(t, T.closet[0], 0.4) * (1 - ease.inCubic(prog(t, ...T.closetOut)))
    if (k <= 0.01) return
    const cx = 535, top = 900, w = 330, h = 420
    x.save(); x.translate(cx, top + h); x.scale(k, k); x.translate(-cx, -(top + h))
    R(x, INK, cx - w / 2 - 8, top - 8, w + 16, h + 16); R(x, '#8a5a3a', cx - w / 2, top, w, h); R(x, '#3a2418', cx - w / 2 + 16, top + 16, w - 32, h - 32)
    R(x, '#b98a5a', cx - w / 2 + 16, top + 60, w - 32, 8)          // the rail
    // doors open
    R(x, '#9a6a44', cx - w / 2 - 70, top + 4, 62, h - 8); R(x, '#9a6a44', cx + w / 2 + 8, top + 4, 62, h - 8)
    // clothes: from a heap on the floor to hangers sorted by colour
    const order = CLOTHES.map((c, i) => i).sort((a, b) => CLOTHES[a].col.localeCompare(CLOTHES[b].col))
    CLOTHES.forEach((c, i) => {
      const j = order.indexOf(i)
      const pi = clamp((t - T.sort[0] - j * 0.17) / 0.35)
      const e = ease.inOutCubic(pi)
      const hx = cx - w / 2 + 34 + j * ((w - 68) / 13), hy = top + 70
      const mx = cx - 110 + c.r * 220, my = top + h - 70 - c.s * 70
      const px2 = lerp(mx, hx, e), py2 = lerp(my, hy, e), rot = lerp((c.r - 0.5) * 2.4, 0, e)
      x.save(); x.translate(px2, py2); x.rotate(rot)
      if (e > 0.6) { x.strokeStyle = '#d0d0e0'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -10); x.stroke() }
      R(x, INK, -11, -2, 22, 92); R(x, c.col, -9, 0, 18, 88); R(x, 'rgba(255,255,255,0.25)', -9, 0, 18, 8)
      x.restore()
    })
    // the labels Virgo adds
    const lk = pop1(t, T.sort[1] - 0.2, 0.3)
    if (lk > 0.01) { x.save(); x.translate(cx, top + 210); x.scale(lk, lk); R(x, '#fbf7ee', -110, -18, 220, 36); x.font = `700 22px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SORTED BY HUE', 0, 1); x.restore() }
    if (inR(t, [T.sort[1], T.sort[1] + 0.8])) sparkBurst(x, t, cx, top + 160, T.sort[1], { n: 10, R: 220, size: 22, seed: 5 })
    x.restore()
  }
  // Leo's hand mirror (event two)
  function drawMirror(t, r) {
    if (!r || t < T.closet[1] || t > T.cut2) return
    const k = pop1(t, T.closet[1], 0.3)
    const mx = r.x + 120, my = r.y - 40 + Math.sin(t * 3) * 6
    x.save(); x.translate(mx, my); x.rotate(-0.3); x.scale(k, k)
    R(x, INK, -6, 30, 12, 60); R(x, '#c58a4a', -4, 32, 8, 56)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 40, 48, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffd25a'; x.beginPath(); x.ellipse(0, 0, 34, 42, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#bfefff'; x.beginPath(); x.ellipse(0, 0, 26, 34, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-14, -20, 8, 16)
    x.restore()
    if (Math.sin(t * 5) > 0.7) drawPixelStar(x, mx + 30, my - 40, 22, 1, '#fff')
  }

  // the jumbotron replay
  function drawTron(t) {
    if (t < T.tron[0] || t > T.tronOut[1]) return
    const k = easeOutBack(prog(t, ...T.tron), 1.6) * (1 - ease.inCubic(prog(t, ...T.tronOut)))
    if (k <= 0.01) return
    const X = 130, Y = 440, w = 820, h = 460
    x.save(); x.translate(540, Y + h / 2); x.scale(k, k); x.translate(-540, -(Y + h / 2))
    R(x, '#2a2a3c', X + w / 2 - 20, Y + h, 40, 120)
    pixelPanel(x, X, Y, w, h, { P: 10, fill: '#0c1630', border: '#8f86c8', glow: 0.3 })
    x.save(); x.beginPath(); x.rect(X + 20, Y + 20, w - 40, h - 40); x.clip()
    x.font = `700 32px ${MONO}`; x.fillStyle = RED; x.textAlign = 'left'; x.textBaseline = 'middle'
    if (Math.sin(t * 5) > -0.3) x.fillText('● REPLAY', X + 44, Y + 54)
    x.fillStyle = rgba(BONE, 0.7); x.textAlign = 'right'; x.fillText('◀◀ x2', X + w - 44, Y + 54)
    // two panels
    for (const [i, lbl, col, t0] of [[0, 'WHAT LIGHTS LEO UP', LEO.color, T.panL], [1, 'WHAT LIGHTS VIRGO UP', VIR.color, T.panR]]) {
      const pk = pop1(t, t0, 0.35)
      if (pk <= 0.01) continue
      const px2 = X + 40 + i * (w / 2 - 20), py2 = Y + 90, pw = w / 2 - 60, ph = h - 140
      x.save(); x.translate(px2 + pw / 2, py2 + ph / 2); x.scale(pk, pk); x.translate(-(px2 + pw / 2), -(py2 + ph / 2))
      R(x, '#18264a', px2, py2, pw, ph); R(x, col, px2, py2, pw, 6)
      x.font = `700 20px ${MONO}`; x.fillStyle = col; x.textAlign = 'center'; x.fillText(lbl, px2 + pw / 2, py2 + 30)
      const sx = px2 + pw / 2, sy = py2 + ph / 2 + 50
      if (i === 0) {
        // Leo glowing under applause: little clapping hands + "!!!"
        drawStarChar(x, sx, sy, 130, t, { color: LEO.color, mood: 'sparkle', look: [0, 0], seed: 50, glow: 1.3, bob: 4 })
        drawCrown(x, sx, sy - 60, 4)
        for (let c = 0; c < 4; c++) { const ph2 = (t * 3 + c * 0.25) % 1; x.save(); x.globalAlpha *= Math.sin(Math.PI * ph2); x.font = `800 28px ${INTER}`; x.fillStyle = GOLD; x.fillText('CLAP', sx - 120 + c * 80, sy - 90 - ph2 * 30); x.restore() }
      } else {
        // Virgo glowing as someone carries its groceries
        drawStarChar(x, sx - 40, sy, 130, t, { color: VIR.color, mood: 'heart', look: [1, 0], seed: 51, glow: 1.3, bob: 4 })
        const hx = sx + 80, hy = sy + 10
        R(x, INK, hx - 32, hy - 40, 64, 70); R(x, '#d9b27a', hx - 28, hy - 36, 56, 62); R(x, '#7fe08a', hx - 18, hy - 54, 10, 22); R(x, '#ff5d73', hx + 2, hy - 50, 16, 16)
        x.font = `700 20px ${MONO}`; x.fillStyle = rgba(BONE, 0.8); x.fillText('"got it 4 u"', hx, hy + 56)
      }
      x.restore()
    }
    // VHS lines
    for (let i = 0; i < 6; i++) { const yy = Y + ((t * 220 + i * 97) % h); x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect(X + 20, yy, w - 40, 6) }
    if (Math.sin(t * 13) > 0.85) { x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(X + 20, Y + 20, w - 40, h - 40) }
    x.restore()
    x.restore()
  }
  function bulbs(t, rL, rV) {
    if (!inR(t, [T.bulb, T.cut3])) return
    for (const r of [rL, rV]) {
      if (!r) continue
      const k = pop1(t, T.bulb, 0.3), bx = r.x, by = r.top - 70
      x.save(); x.translate(bx, by); x.scale(k, k)
      x.fillStyle = 'rgba(255,230,120,0.25)'; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.fill()
      R(x, INK, -24, -30, 48, 48); R(x, '#ffe066', -20, -26, 40, 40); R(x, '#fff6c0', -12, -20, 10, 10); R(x, INK, -14, 18, 28, 16); R(x, '#a0a0b8', -10, 20, 20, 12)
      x.restore()
    }
  }

  // event three: the sink (Leo does Virgo's dishes) and Virgo's sign
  function drawSink(t) {
    if (t < T.sink[0] || t > T.sinkOut[1]) return
    const k = pop1(t, T.sink[0], 0.35) * (1 - ease.inCubic(prog(t, ...T.sinkOut)))
    if (k <= 0.01) return
    const cx = 640, cy = 1300
    x.save(); x.translate(cx, cy); x.scale(k * 1.35, k * 1.35)
    R(x, INK, -110, -20, 220, 110); R(x, '#c8ccdc', -104, -14, 208, 98); R(x, '#8a90a8', -90, -4, 180, 30)
    R(x, INK, 40, -86, 12, 70); R(x, '#c8ccdc', 42, -84, 8, 66); R(x, '#c8ccdc', 0, -86, 50, 10)
    // plates: dirty stack shrinks, clean stack grows
    const n = 5, done = Math.floor(clamp(prog(t, ...T.dishes)) * n)
    for (let i = 0; i < n - done; i++) { R(x, INK, -150, -24 - i * 16, 70, 14); R(x, '#e8e0d0', -147, -22 - i * 16, 64, 10); R(x, '#a07a50', -130, -22 - i * 16, 20, 4) }
    for (let i = 0; i < done; i++) { R(x, INK, 64, -24 - i * 16, 70, 14); R(x, '#ffffff', 67, -22 - i * 16, 64, 10) }
    if (done > 0 && Math.sin(t * 6) > 0.6) drawPixelStar(x, 99, -50 - done * 16, 22, 1, '#fff')
    // bubbles
    if (inR(t, T.dishes)) for (let i = 0; i < 5; i++) { const ph = (t * 1.2 + i * 0.2) % 1; x.save(); x.globalAlpha *= 1 - ph; x.strokeStyle = '#bfefff'; x.lineWidth = 3; x.beginPath(); x.arc(-60 + i * 30, -10 - ph * 80, 8 + i % 2 * 4, 0, Math.PI * 2); x.stroke(); x.restore() }
    x.restore()
  }
  function drawSign(t, rV) {
    if (!rV || t < T.sign || t > T.sinkOut[1]) return
    const k = pop1(t, T.sign, 0.35) * (1 - ease.inCubic(prog(t, ...T.sinkOut)))
    if (k <= 0.01) return
    const sx = rV.x, sy = rV.top - 150 + Math.sin(t * 8) * 8
    x.save(); x.translate(sx, sy); x.rotate(Math.sin(t * 6) * 0.06); x.scale(k, k)
    R(x, INK, -6, 40, 12, 110); R(x, '#c58a4a', -3, 42, 6, 106)
    pixelPanel(x, -170, -60, 340, 110, { P: 6, fill: '#fff6e0', border: VIR.color, glow: 0.5 })
    x.font = `800 44px ${INTER}`; x.fillStyle = VIR.color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEO = ICONIC', 0, -4)
    x.restore()
    // pom-poms
    for (const s of [-1, 1]) { const px2 = rV.x + s * 140, py2 = rV.y - 10 + Math.sin(t * 14 + s) * 16; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; R(x, i % 2 ? GOLD : VIR.color, px2 + Math.cos(a) * 22 - 6, py2 + Math.sin(a) * 22 - 6, 12, 12) } }
  }

  function drawPushCard(t) {
    if (t < T.card[0] || t > T.cardOut[1]) return
    const k = easeOutBack(prog(t, ...T.card), 1.8) * (1 - ease.inCubic(prog(t, ...T.cardOut)))
    if (k <= 0.01) return
    x.save(); x.translate(540, 820); x.rotate(-0.03); x.scale(k, k)
    pixelPanel(x, -300, -200, 600, 400, { P: 8, fill: '#2a1f52', border: GOLD, glow: 0.5 })
    x.font = `700 26px ${MONO}`; x.fillStyle = rgba(BONE, 0.8); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌ LEO  ·  ♍ VIRGO', 0, -140)
    ;[['PUSH', 'gifts vs. help', READING.push, T.l14 + 0.2], ['ALIGN', 'both show up', READING.align, T.l14 + 1.2]].forEach(([lab, sub, col, t0], i) => {
      const ck = easeOutBack(prog(t, t0, t0 + 0.3), 2.6)
      if (ck <= 0) return
      x.save(); x.translate(0, -40 + i * 130); x.scale(ck, ck)
      R(x, 'rgba(14,8,32,0.9)', -240, -46, 480, 92); R(x, col, -240, -46, 480, 6); R(x, col, -240, 40, 480, 6)
      x.font = `700 36px ${MONO}`; x.fillStyle = col; x.textAlign = 'left'; x.fillText(lab, -210, 0)
      x.font = `700 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'right'; x.fillText(sub, 210, 0)
      x.restore()
    })
    x.restore()
  }

  function drawPodium(t) {
    if (t < T.podium[0]) return
    const k = pop1(t, T.podium[0], 0.45) * popOut(t, T.out)
    if (k <= 0.01) return
    x.save(); x.translate(540, 1400); x.scale(k, k); x.translate(-540, -1400)
    // 2nd + 3rd steps, empty (nobody else competed); the wide top step for both
    R(x, INK, 140, 1240, 150, 160); R(x, '#8a8fa8', 146, 1246, 138, 154)
    R(x, INK, 790, 1270, 150, 130); R(x, '#a0703a', 796, 1276, 138, 124)
    R(x, INK, 280, 1170, 520, 230); R(x, '#d9a640', 286, 1176, 508, 224); R(x, '#ffe08a', 286, 1176, 508, 10)
    x.font = `800 72px ${INTER}`; x.fillStyle = '#7a5410'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('1', 540, 1290)
    x.font = `800 40px ${INTER}`; x.fillStyle = '#3a3358'; x.fillText('2', 215, 1320); x.fillText('3', 865, 1335)
    x.restore()
  }
  function drawMedals(t, rL, rV) {
    if (t < T.medals[0]) return
    for (const [r, i] of [[rL, 0], [rV, 1]]) {
      if (!r) continue
      const p = ease.outBounce ? ease.outBounce(prog(t, T.medals[0] + i * 0.12, T.medals[1] + i * 0.12)) : easeOutBack(prog(t, T.medals[0] + i * 0.12, T.medals[1] + i * 0.12), 1.5)
      const mx = r.x, my = lerp(r.y - 700, r.y + 30, p)
      x.save(); x.globalAlpha *= popOut(t, T.out)
      x.strokeStyle = '#ff5d73'; x.lineWidth = 6; x.beginPath(); x.moveTo(mx - 30, my - 60); x.lineTo(mx, my); x.lineTo(mx + 30, my - 60); x.stroke()
      x.fillStyle = INK; x.beginPath(); x.arc(mx, my + 18, 30, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffd23f'; x.beginPath(); x.arc(mx, my + 18, 25, 0, Math.PI * 2); x.fill()
      drawPixelStar(x, mx, my + 18, 26, 1, '#fff6c0')
      x.restore()
    }
    if (t > T.medals[1]) sparkBurst(x, t, 540, 1100, T.medals[1], { n: 14, R: 420, size: 28, seed: 9 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        actor(x, t, PISCES)
        drawBooth(t)
        drawTron(t)
        drawCloset(t)
        drawPodium(t)
        drawPushCard(t)
        const rL = actor(x, t, LEO_ACT)
        drawMirror(t, rL)
        drawSink(t)
        drawGifts(t)
        const rV = actor(x, t, VIR_ACT)
        bulbs(t, rL, rV)
        drawSign(t, rV)
        drawMedals(t, rL, rV)
        if (inR(t, [T.conf1, T.conf1 + 5])) confetti(x, t, T.conf1, { x0: LEO_A[0], y0: 1150, n: 60, seed: 3, life: 4.5 })
        if (inR(t, [T.conf2, T.conf2 + 5])) confetti(x, t, T.conf2, { x0: 540, y0: 1200, n: 90, seed: 7, life: 4.5 })
        if (inR(t, [T.medals[1], T.medals[1] + 5])) confetti(x, t, T.medals[1], { x0: 540, y0: 1150, n: 80, seed: 11, life: 4.2 })
        if (inR(t, [T.glowV, T.glowV + 1.8]) && rV) drawHearts(x, t, T.glowV, rV.x, rV.y - 120, { n: 6, px: 7, spread: 140 })
        if (inR(t, [T.melt, T.melt + 1.8]) && rL) drawHearts(x, t, T.melt, rL.x, rL.y - 120, { n: 6, px: 7, spread: 140 })
        veil(x, t, T.banner - 0.1, T.lessonOut, 0.4)
        lessonBanner(x, t, T.banner, T.lessonOut)
      }
      boxes.forEach(b => b.update(t))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates; the default selection keeps 13.7 (→ the closet), 22.0 (→ the replay) and 33.6 (→ the swap)
export const CUTS = [4.55, { t: T.cut1, kind: 'flip' }, 18.1, { t: T.cut2, kind: 'deal' }, 28.3, { t: T.cut3, kind: 'shuffle' }, 45.5]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (funk in E minor)
const EM = { E5: 659.25, G5: 783.99, B5: 987.77 }
const PITCH = { [L_TAG]: 783.99, [V_TAG]: 987.77, [G_TAG]: 1046.5, [S_TAG]: 880 }
const fanfare = t => [[EM.E5, 0], [EM.G5, 0.18], [EM.B5, 0.36], [EM.E5 * 2, 0.6]].map(([f, d], i) => chip(t + d, f, i === 3 ? 0.9 : 0.16, { gain: 0.06, duty: 0.5, decay: 0.1, sustain: 0.8, rev: 0.2, dly: 0.2 }))
export const CUES = [
  ...head(T.h1, 3, T.h1Land, 1), ['boom', T.conf1, 0.1], ['glitter', T.conf1, T.conf1 + 1.2], ...cheer(T.conf1, 1.2, 0.04),
  ...PILE.map((_, i) => ['whoosh', +(T.gifts[0] + i * ((T.gifts[1] - T.gifts[0]) / PILE.length) * 0.92).toFixed(3), 0.25, 0.025]),
  ...PILE.map((_, i) => ['pop', +(T.gifts[0] + i * ((T.gifts[1] - T.gifts[0]) / PILE.length) * 0.92 + 0.55).toFixed(3), 300 + i * 25, 0.035, 0.4]),
  ['pop', T.gifts[1], 1174.66, 0.04, 0.4],
  // event two
  ...head(T.h2, 3, T.h2Land, 3), ['whoosh', T.closet[0], 0.4, 0.04], ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.sort[0] + i * 0.17).toFixed(3), 0.03]),
  ['bell', T.sort[1], 1567.98, 0.03, 1.4, 0], ['glitter', T.sort[1], T.sort[1] + 0.6],
  ...womp(T.womp, 493.88), ...crickets(T.chirp[0], T.chirp[1]),
  // replay
  ...scratch(T.cut2 + 0.05), ...head(T.h3, 2, T.h3Land, 4), ['whoosh', T.tron[0], 0.4, 0.05],
  ['pop', T.panL, 880, 0.04, -0.3], ['pop', T.panR, 987.77, 0.04, 0.3],
  ['pop', T.look, 392, 0.04, 0], ['pop', T.look + 0.1, 440, 0.04, 0], ['bell', T.bulb, 1567.98, 0.035, 1.4, 0], ['pluck', T.bulb + 0.05, 1975.53, 0.03, 0.6, 0],
  // event three
  ...head(T.h4, 3, T.h4Land, 2), ['whoosh', T.sink[0], 0.35, 0.04], ...Array.from({ length: 5 }, (_, i) => ['tick', +(T.dishes[0] + i * 0.34).toFixed(3), 0.035]),
  ['bell', T.glowV, 1318.51, 0.03, 1.4, 0.3], ['pop', T.sign, 783.99, 0.05, 0.3], ['whoosh', T.sign, 0.3, 0.05],
  ['pop', T.melt, 1174.66, 0.045, -0.3], ['glitter', T.melt, T.melt + 0.6],
  ['boom', T.conf2, 0.12], ...cheer(T.conf2, 1.8, 0.055),
  // lesson
  ...levelUp(T.banner, [EM.E5, EM.G5, EM.B5]), ...cheer(T.banner, 1.6, 0.045), ['pop', T.banner + 0.45, 1567.98, 0.03, 0.4],
  ...wordPops(T.lesson, 8, 0.08, 0, 0.022), ['pluck', T.lesson + 0.3, 1318.51, 0.04, 0.8, 0],
  ['whoosh', T.lessonOut[0], 0.35, 0.03],
  // push card + medals
  ...head(T.h5, 3, T.h5Land, 5), ['whoosh', T.card[0], 0.4, 0.04], ['pop', T.l14 + 0.2, 392, 0.04, -0.3], ['pop', T.l14 + 1.2, 880, 0.04, 0.3],
  ...head(T.h6, 2, T.h6Land, 0), ['whoosh', T.podium[0], 0.4, 0.05], ['tom', T.podium[0] + 0.3, 90, { gain: 0.2, decay: 0.3, rev: 0.2 }],
  ...drumroll(T.l15 + 0.3, T.medals[0]), ['crash', T.medals[1], { gain: 0.06, len: 2 }], ...fanfare(T.medals[1]), ...cheer(T.medals[1], 2.2, 0.055),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...[LINES1, LINES2, LINES3, LINES4, LINES5].flatMap(ls => talkCues(ls, { cps: CPS, pitch: PITCH })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
].filter(c => c[1] >= 0)
export const HOLDS = holds(BOXES, lineTimes, CPS)
