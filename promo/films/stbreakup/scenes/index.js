// stbreakup (60 s vertical Align ad, Star Talk season 2 extra #2: "The Aunties Heard"; promo/films/STARTALK12.md) · story
// 0–55.6, then the shared end card.
//   0.00–13.2  "The Aunties heard | about the *breakup.*"  ♋ AUNTIE CANCER (crockpot of soup) and ♉ AUNTIE TAURUS (a tissue
//              box) skid in from both sides. YOUR STAR sits under a little rain cloud. CANCER: "We came as SOON as we heard."
//              TAURUS: "We brought *soup.*" … "And tissues. The *good* ones."  YOU: "i'm fine. totally fine." (the cloud pours)
//              THE BOOTH (♊ Gemini + ♐ Sag, headsets) pops into the corner. GEMINI: "And the Aunties have *ARRIVED,* folks."
//  13.30       card cut (flip)
//  13.4–25.6   "The *draft.*"  Cancer takes the phone; the draft to the ex grows and grows, the glasses fog, steam puffs.
//              CANCER: "Give me that. We'll tell him about *himself.*"  SAG: "And the Aunties are *WINDING UP!*"
//              TAURUS: "Paragraph four. *Sources cited.*"  GEMINI: "She's going for the *long* paragraph."  Pisces sobs.
//  25.70       card cut (deal)
//  25.8–35.8   "Never | *mind.*"  The thumb over SEND, a drumroll; Cancer looks at you… silence. GEMINI (whisper): "…wait.
//              She's *stopping.*"  The draft deletes letter by letter. CANCER: "Actually. Come *here.*"  The aunties squish you
//              in a hug. SAG, sobbing: "I'm not crying. *You're* crying."  Pisces fountains.
//  36.00       card cut (shuffle)
//  36.1–41.8   "Things you | get *back.*"  Taurus unrolls a list: ✓ your Friday nights ✓ your playlist ✓ YOU.
//  42.0–46.3   ★ LESSON UNLOCKED: "You don't need | closure from them. | Give it to *yourself.*"
//  46.5–50.1   "Tonight's *deck.*"  A fresh deck deals in. TAURUS: "When you're ready, a new deck. *Every night.*"
//  50.3–55.45  The cloud breaks into a little sun. CANCER (lid rattling): "Soup's ready. *Take your time.*" End card 55.6.
// One canvas (sky + cast + phone + list + banner), DOM type + the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawScroll, drawCrockpot } from '../../staunties/scenes/props.js'
import { drawMic, drawDesk } from '../../stlive5th/scenes/props.js'
import { popText, actor, lessonBanner, veil, bubble, speedLines, pixelPanel, sparkBurst, drawHearts, drawPixelStar, easeOutBack, bmp,
  pop01, outK, popOut, rgba, inR, R, nodK, FONTS, GOLD, BONE, PINK, LAV, INK, MINT, RED, INTER, MONO,
  head, wordPops, chip, scratch, womp, drumroll, levelUp, crickets, cheer, flutter, holds } from '../../stgroupchat2/kit.js'

export const DURATION = 60
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const YOU_COL = '#ff9cc0'
const CAN = signStar('cancer'), TAU = signStar('taurus'), GEM = signStar('gemini'), SAG = signStar('sagittarius'), PIS = signStar('pisces')
const C_TAG = `${CAN.glyph} AUNTIE CANCER`, T_TAG = `${TAU.glyph} AUNTIE TAURUS`, G_TAG = `${GEM.glyph} GEMINI`, S_TAG = `${SAG.glyph} SAG`, Y_TAG = 'YOU'
const C_TXT = '#8fdcff', T_TXT = '#ffd27a', G_TXT = '#ffe066', S_TXT = '#d0a8ff'

export const T = {
  // 1 · they heard
  run: [-0.6, 0.55], open1: -1.6, l1: -1.35, l2: 2.55, set: 4.35, tissue: 4.6, l3: 4.95, l4: 7.68, pour: [8.3, 10.2],
  booth: 9.9, l5: 10.26, close1: 13.15, h0Out: [9.6, 9.8], h1: 9.85, h1Land: 10.2, h1Out: [13.1, 13.25],
  cut1: 13.3,
  // 2 · the draft
  phone: [13.35, 13.75], h2: 13.45, h2Land: 13.8, open2: 13.5, l6: 13.7, draft: [14.2, 25.4], l7: 17.05, l8: 19.75, l9: 22.6,
  rage: [16.0, 25.5], close2: 25.6, h2Out: [25.45, 25.6],
  cut2: 25.7,
  // 3 · never mind
  hover: [25.8, 27.6], roll: [25.9, 27.4], look: 27.0, open3: 27.85, l10: 28.0, del: [29.0, 30.4], l11: 30.6, phoneOut: [30.45, 30.8],
  h3: 30.65, h3Land: 31.0, hug: [31.45, 31.9], l12: 33.1, unhug: [35.4, 35.85], close3: 35.92, h3Out: [35.7, 35.9],
  cut3: 36.0,
  // 4 · things you get back
  h4: 36.1, h4Land: 36.45, scroll: [36.2, 37.2], open4: 36.1, l13: 36.2, l14: 38.5, checks: [38.8, 39.6, 40.4], close4: 41.86,
  scrollUp: [41.55, 41.95], h4Out: [41.7, 41.85],
  // 5 · lesson + deck + last line
  banner: 42.0, lesson: 42.4, lessonLate: 43.4, lessonOut: [46.05, 46.3],
  h5: 46.45, h5Land: 46.8, deck: [46.5, 47.4], open5: 46.6, l15: 46.8, deckOut: [49.9, 50.2], h5Out: [49.95, 50.1],
  sun: [49.9, 50.6], l16: 50.35, close5: 55.3,
  h6: 50.35, h6Land: 50.7,
  out: [55.0, 55.45],
}
const L = (t, speaker, text) => ({ t, speaker, text, color: { [C_TAG]: C_TXT, [T_TAG]: T_TXT, [G_TAG]: G_TXT, [S_TAG]: S_TXT, [Y_TAG]: PINK }[speaker] })
const LINES1 = [L(T.l1, C_TAG, 'We came as *SOON* as we heard.'), L(T.l2, T_TAG, 'We brought *soup.*'), L(T.l3, T_TAG, 'And tissues. *The good ones.*'),
  L(T.l4, Y_TAG, "i'm fine. *totally* fine."), L(T.l5, G_TAG, 'And the Aunties have *ARRIVED,* folks.')]
const LINES2 = [L(T.l6, C_TAG, "Give me that. We'll tell him about *himself.*"), L(T.l7, S_TAG, 'And the Aunties are *WINDING UP!*'),
  L(T.l8, T_TAG, 'Paragraph four. *Sources cited.*'), L(T.l9, G_TAG, "She's going for the *long* paragraph.")]
const LINES3 = [L(T.l10, G_TAG, "…wait. She's *stopping.*"), L(T.l11, C_TAG, 'Actually. *Come here.*'), L(T.l12, S_TAG, "I'm not crying. *You're* crying.")]
const LINES4 = [L(T.l13, T_TAG, 'Things you get *back.*'), L(T.l14, T_TAG, 'Your Friday nights. Your playlist. *You.*')]
const LINES5 = [L(T.l15, T_TAG, "When you're ready, a new deck. *Every night.*"), L(T.l16, C_TAG, "Soup's ready. *Take your time.*")]
const CPS = 28
export const BOXES = [[LINES1, T.close1], [LINES2, T.close2], [LINES3, T.close3], [LINES4, T.close4], [LINES5, T.close5]]
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5]
const hopsOf = tag => talkHops(ALL, tag, { cps: CPS })

// ── the cast
const SEAT_C = [230, 1150, 300], SEAT_T = [850, 1150, 300], HUG_C = [360, 1150, 300], HUG_T = [720, 1150, 300]
const CANCER = { kind: 'auntie', color: CAN.color, glyph: CAN.glyph, seed: 3, glasses: { frame: '#b3203f', hi: '#ffe08a', chain: true }, out: T.out,
  pos: [[-1, -260, 1150, 300], [T.run[1], ...SEAT_C, 'out', 0, 1.15], [T.hug[1], ...HUG_C, 'spring', 30, 0.45], [T.unhug[1], ...SEAT_C, 'io', 20, 0.45]],
  hops: [...hopsOf(C_TAG), T.set, T.rage[0] + 1, T.rage[0] + 4.4, T.rage[0] + 7.6, T.banner + 0.1, T.l16 + 0.9],
  mood: [[-9, 'wide', 1, 0], [T.run[1], 'sparkle', 1, 0], [T.l2, 'happy', 1, 0], [T.l4 + 0.6, 'squint', 1, 0], [T.l6, 'squint', 1, -1], [T.rage[0], 'squint', 1, -1],
    [T.hover[0], 'squint', 1, -1, false], [T.look, 'neutral', 1, 1], [T.look + 0.7, 'sparkle', 1, 1, false], [T.l11, 'sparkle', 1, 0], [T.hug[0], 'happy'], [T.cut3, 'happy', 1, 0],
    [T.banner, 'sparkle'], [T.h5, 'happy', 1, 0], [T.l16, 'happy', 1, 0], [T.l16 + 2.2, 'wink', 1, 0], [T.l16 + 2.7, 'happy', 1, 0]],
  fog: [[0, 0], [T.rage[0] + 0.6, 0.5], [T.rage[0] + 3.5, 0.9], [T.look + 0.3, 0.3], [T.l11, 0]],
  shake: [[0, 0], [T.rage[0] + 2, 2], [T.rage[0] + 6, 4], [T.hover[0], 0]],
  tears: [[0, 0], [T.look + 0.8, [0.6, false]], [T.hug[0], [0.7, false]], [T.unhug[1], 0]] }
const TAURUS = { kind: 'auntie', color: TAU.color, glyph: TAU.glyph, seed: 8, glasses: { frame: '#5a2e14', hi: '#ffd98a' }, out: T.out,
  pos: [[-1, 1340, 1150, 300], [T.run[1] + 0.12, ...SEAT_T, 'out', 0, 1.2], [T.hug[1] + 0.05, ...HUG_T, 'spring', 30, 0.45], [T.unhug[1], ...SEAT_T, 'io', 20, 0.45]],
  hops: [...hopsOf(T_TAG), T.tissue, T.rage[0] + 2.2, T.rage[0] + 6.1, T.banner + 0.15, T.checks[2]],
  mood: [[-9, 'wide', -1, 0], [T.run[1], 'sparkle', -1, 0], [T.l3 + 1.2, 'happy', -1, 0], [T.l4 + 0.6, 'squint', -1, 0], [T.l6, 'neutral', -1, -1], [T.rage[0], 'squint', -1, -1],
    [T.hover[0], 'wide', -1, -1, false], [T.l11, 'sparkle', -1, 0], [T.hug[0], 'happy'], [T.h4, 'happy', -1, 0], [T.checks[2], 'sparkle', -1, 0],
    [T.banner, 'sparkle'], [T.h5, 'happy', -1, 0], [T.l16 + 2.4, 'wink', -1, 0], [T.l16 + 2.9, 'happy', -1, 0]],
  fog: [[0, 0], [T.rage[0] + 1.6, 0.6], [T.rage[0] + 5, 0.95], [T.look + 0.3, 0.3], [T.l11, 0]],
  shake: [[0, 0], [T.rage[0] + 3, 2], [T.hover[0], 0]],
  tears: [[0, 0], [T.hug[0] + 0.2, [0.7, false]], [T.unhug[1], 0]] }
const YOU = { color: YOU_COL, seed: 12, glow: 0.9, out: T.out, pos: [[0, 540, 1235, 210], [T.hug[1], 540, 1225, 210, 'spring', 10], [T.unhug[1], 540, 1235, 210]],
  hops: [T.tissue + 0.3, T.l4, T.l4 + 0.45, T.hug[0] + 0.2, T.checks[2] + 0.05, T.banner + 0.2, T.sun[0] + 0.3],
  mood: [[-9, 'neutral', 0, 1], [T.run[1] - 0.2, 'wide', -1, 0], [T.run[1] + 0.3, 'wide', 1, 0], [T.l2 + 0.6, 'neutral', 1, 0], [T.tissue + 0.4, 'squint', 0, 0],
    [T.l4, 'happy', 0, 0], [T.pour[0], 'neutral', 0, 1], [T.l6, 'wide', -1, -1], [T.rage[0] + 2, 'squint', -1, -1], [T.hover[0], 'neutral', 0, 1],
    [T.l11, 'wide', -1, 0], [T.hug[0], 'happy'], [T.unhug[1], 'neutral', 1, -1], [T.checks[0], 'happy', 1, -1], [T.checks[2], 'sparkle'], [T.banner, 'happy'],
    [T.h5, 'sparkle', 0, -1], [T.sun[0], 'happy', 0, -1]],
  squash: [[0, 0.08], [T.hug[0] + 0.25, 0.2], [T.unhug[0], 0.04], [T.checks[2], 0]],
  tears: [[0, [0.35, false]], [T.l4 - 0.1, 0], [T.pour[0], [0.5, false]], [T.l11, [0.4, false]], [T.unhug[1], 0]] }
const BOOTH_Y = 640
const GEMINI = { kind: 'booth', color: GEM.color, propCol: '#ffe066', seed: 21, in: T.booth, pos: [[0, 760, BOOTH_Y, 138]], out: [T.cut3 - 0.3, T.cut3],
  hops: hopsOf(G_TAG), mood: [[0, 'wide', 0, 0], [T.l5 + 1.4, 'happy', -1, 1], [T.l6, 'wide', -1, 1], [T.l9 + 1.5, 'squint', -1, 1], [T.hover[0], 'wide', -1, 1, false], [T.l11, 'sparkle', -1, 1], [T.l12, 'sparkle', 1, 0]],
  tears: [[0, 0], [T.l12, [0.9, true]]] }
const SAGS = { kind: 'booth', color: SAG.color, propCol: '#b07cff', seed: 23, in: T.booth + 0.08, pos: [[0, 935, BOOTH_Y, 138]], out: [T.cut3 - 0.3, T.cut3],
  hops: hopsOf(S_TAG), mood: [[0, 'happy', -1, 0], [T.l7, 'wide', -1, 1], [T.l8, 'happy', -1, 1], [T.hover[0], 'wide', -1, 1, false], [T.l11, 'sparkle', -1, 1], [T.l12, 'squint', -1, 0], [T.l12 + 1, 'sparkle', -1, 0]],
  tears: [[0, 0], [T.l11 + 0.6, [0.5, false]], [T.l12 + 0.4, [1, true]]] }
const PISCES = { color: PIS.color, seed: 17, in: 1.4, pos: [[0, 118, 640, 128]], glow: 0.8, out: T.out,
  mood: [[0, 'happy'], [T.hover[0], 'wide', 0, 1, false], [T.l11, 'happy'], [T.banner, 'sparkle']],
  tears: [[0, [0.8, true]], [T.hover[0], 0], [T.l11 + 0.4, [1, true]], [T.cut3, [0.5, false]]], hops: [1.5, T.hug[0] + 0.3, T.banner + 0.2], tissue: [[0, 0], [T.l12 + 0.6, 1], [T.l12 + 1.8, 0]] }

// ── the draft (letter-by-letter: types in, then deletes)
const DRAFT = ['Dear Him,', 'We are writing to inform you', 'that our baby is a GIFT.', 'Paragraph 1: Thursday.', 'Paragraph 2: the playlist.',
  'Paragraph 3: the PLAYLIST.', 'Paragraph 4: (sources)', 'In conclusion: the audacity.', 'P.S. the soup was not for you.', 'P.P.S.', 'P.P.P.S.']
const DRAFT_N = DRAFT.reduce((a, l) => a + l.length, 0)
const PHONE = { x: 250, y: 470, w: 470, h: 600 }

const pop1 = (t, t0, d = 0.3) => easeOutBack(prog(t, t0, t0 + d), 2.2)

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The Aunties heard | about the *breakup.*', { top: 150, size: 100, accentSize: 150, at: -1, late: 1, lateAt: -0.6, wobble: true, accentColor: C_TXT })
  const H1 = popText(root, 'The Booth | is *live.*', { top: 150, size: 108, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: RED })
  const H2 = popText(root, 'The *draft.*', { top: 210, size: 116, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: RED })
  const H3 = popText(root, 'Never | *mind.*', { top: 150, size: 112, accentSize: 168, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: C_TXT })
  const H4 = popText(root, 'Things you | get *back.*', { top: 150, size: 108, accentSize: 160, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: T_TXT })
  const H5 = popText(root, "Tonight's *deck.*", { top: 210, size: 108, accentSize: 160, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: LAV })
  const H6 = popText(root, 'Take | *your time.*', { top: 150, size: 108, accentSize: 160, at: T.h6, late: 2, lateAt: T.h6Land, lateGap: 0.14, wobble: true, accentColor: GOLD })
  const LESSON = popText(root, "You don't need | closure from them. | Give it to *yourself.*", { top: 660, size: 88, accentSize: 128, at: T.lesson, gap: 0.08, late: 1, lateAt: T.lessonLate, wobble: true, lineHeight: 1.08 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.out], [LESSON, T.lessonOut]]
  const BOX_Y = 1450
  const mk = (lines, open, close) => dialogueBox(root, { lines, y: BOX_Y, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [mk(LINES1, T.open1, T.close1), mk(LINES2, T.open2, T.close2), mk(LINES3, T.open3, T.close3), mk(LINES4, T.open4, T.close4), mk(LINES5, T.open5, T.close5)]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // the little rain cloud over your star (it pours on "totally fine", then turns into a sun at the end)
  const CLOUD = ['....XXXX......', '..XXWWWWXX....', '.XWWWWWWWWXXX.', 'XWWWWWWWWWWWWX', 'XWWWWWWWWWWWWX', '.XXXXXXXXXXXX.']
  function drawCloud(t) {
    if (t > T.out[1]) return
    const sunK = ease.inOutCubic(prog(t, ...T.sun))
    const cx = 540, cy = 1020 + Math.sin(t * 1.6) * 6, px = 10
    const hide = inR(t, [T.phone[0], T.phoneOut[1]]) ? 1 - clamp(prog(t, T.phone[0], T.phone[0] + 0.2)) + clamp(prog(t, ...T.phoneOut)) : 1
    const hk = clamp(hide) * popOut(t, T.out)
    if (hk <= 0.01) return
    x.save(); x.globalAlpha *= hk
    if (sunK < 1) {
      x.save(); x.globalAlpha *= 1 - sunK
      bmp(x, CLOUD, cx - 7 * px, cy - 3 * px, px, { X: '#3c3a5c', W: '#8a87ad' })
      const rate = inR(t, T.pour) ? 3 : 1, n = inR(t, T.pour) ? 14 : 5
      for (let i = 0; i < n; i++) {
        const ph = ((t * rate * 0.9 + i / n) % 1)
        R(x, '#8fd0ff', cx - 60 + ((i * 37) % 120), cy + 3 * px + ph * 120, 6, 16)
      }
      x.restore()
    }
    if (sunK > 0) {
      x.save(); x.translate(cx, cy); x.scale(sunK, sunK); x.rotate(t * 0.6)
      x.fillStyle = '#ffd25a'
      for (let i = 0; i < 8; i++) { x.rotate(Math.PI / 4); x.fillRect(-6, -78, 12, 24) }
      x.restore()
      x.save(); x.translate(cx, cy); x.scale(sunK, sunK); x.fillStyle = '#ffd25a'; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff1b0'; x.fillRect(-20, -26, 14, 10); x.restore()
    }
    x.restore()
  }

  // props carried in: the crockpot (Cancer) and the tissue box (Taurus)
  function drawCarry(t, rC, rT) {
    if (!rC || !rT) return
    const o = popOut(t, T.out)
    // crockpot: in Cancer's arms while running, then on the floor between Cancer and you
    const setP = ease.outCubic(prog(t, T.set - 0.3, T.set))
    const px = rC.x + 110, py = rC.y + 30
    const cx = lerp(px, 365, setP), cy = lerp(py, 1355, setP)
    const showPot = !(inR(t, [T.phone[0], T.phoneOut[1]]))
    if (showPot || t > T.cut3) drawCrockpot(x, t, cx, cy, 9 * o, { rattle: inR(t, [T.set, T.set + 0.4]) || inR(t, [T.l16 + 0.2, T.l16 + 1.4]) ? 1 : 0.15, steam: 1 })
    // tissue box: carried by Taurus, then on the floor right of you
    const bx = lerp(rT.x - 120, 720, setP), by = lerp(rT.y + 30, 1345, setP)
    if (showPot && t < T.cut3) {
      x.save(); x.translate(bx, by); x.scale(o, o)
      R(x, INK, -52, -50, 104, 54); R(x, '#7fd0e6', -48, -46, 96, 46); R(x, '#ff9cc0', -48, -30, 96, 10); R(x, INK, -20, -50, 40, 6)
      // the tissue that pops up
      const tk = inR(t, [T.tissue, T.tissue + 0.6]) ? Math.sin(Math.PI * prog(t, T.tissue, T.tissue + 0.6)) : 0
      R(x, '#fbf7ee', -14, -64 - tk * 40, 28, 18 + tk * 20); R(x, '#fbf7ee', -6, -76 - tk * 44, 12, 14)
      x.restore()
    }
  }

  function drawPhone(t) {
    if (t < T.phone[0] || t > T.phoneOut[1]) return
    const k = pop1(t, T.phone[0], 0.36) * (1 - ease.inCubic(prog(t, ...T.phoneOut)))
    if (k <= 0.01) return
    const { x: X, y: Y, w, h } = PHONE, cx = X + w / 2, cy = Y + h / 2
    const shake = inR(t, T.rage) ? 3 * Math.sin(t * 50) * prog(t, ...T.rage) : 0
    x.save(); x.translate(cx + shake, cy); x.rotate(-0.03); x.scale(k, k); x.translate(-cx, -cy)
    pixelPanel(x, X, Y, w, h, { P: 10, fill: '#120d2a', border: '#8f86c8', glow: 0.25 })
    R(x, '#1d1640', X + 24, Y + 26, w - 48, 54)
    x.font = `700 26px ${MONO}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TO: HIM', cx, Y + 54)
    // the draft text
    let n
    if (t < T.del[0]) n = Math.floor(clamp(prog(t, ...T.draft)) * DRAFT_N)
    else n = Math.floor((1 - clamp(prog(t, ...T.del))) * DRAFT_N * clamp(prog(t, T.draft[0], T.draft[1])) )
    if (t >= T.del[0]) n = Math.floor((1 - clamp(prog(t, ...T.del))) * DRAFT_N)
    const shown = []
    let left = n
    for (const l of DRAFT) { if (left <= 0) break; shown.push(l.slice(0, left)); left -= l.length }
    const top = Y + 104, lh = 42, maxRows = 8
    const scroll = Math.max(0, shown.length - maxRows)
    x.save(); x.beginPath(); x.rect(X + 24, top - 10, w - 48, maxRows * lh + 10); x.clip()
    x.font = `700 25px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'top'; x.fillStyle = '#fff'
    shown.slice(scroll).forEach((l, i) => x.fillText(l, X + 38, top + i * lh))
    if (Math.sin(t * 12) > 0 && shown.length) { const last = shown[shown.length - 1]; R(x, '#fff', X + 40 + x.measureText(last).width, top + (Math.min(shown.length, maxRows) - 1) * lh, 4, 28) }
    x.restore()
    if (t >= T.del[1] && t < T.phoneOut[0]) { x.font = `700 28px ${MONO}`; x.fillStyle = rgba(BONE, 0.6); x.textAlign = 'center'; x.fillText('DRAFT DELETED', cx, cy) }
    // the SEND button (glows red while the thumb hovers)
    const hot = inR(t, T.hover)
    const pulse = hot ? 0.5 + 0.5 * Math.sin(t * 16) : 0
    x.save(); x.translate(cx, Y + h - 70)
    pixelPanel(x, -110, -34, 220, 68, { P: 6, fill: hot ? `rgba(255,93,115,${0.35 + 0.4 * pulse})` : '#2a1f52', border: hot ? RED : GOLD, glow: 0.2 + pulse * 0.6 })
    x.font = `700 34px ${MONO}`; x.fillStyle = hot ? '#fff' : GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEND', 0, 2)
    x.restore()
    // Cancer's paw hovering (a pixel point) — trembles, then pulls back at the look
    if (inR(t, [T.hover[0], T.del[0]])) {
      const back = ease.inOutCubic(prog(t, T.look, T.look + 0.5))
      const hx = cx + 40 + back * 120, hy = Y + h - 40 + back * 80 + Math.sin(t * 40) * 2
      x.save(); x.translate(hx, hy); x.rotate(-0.6); x.fillStyle = CAN.color
      x.beginPath(); x.moveTo(0, -36); x.lineTo(22, 30); x.lineTo(-22, 30); x.closePath(); x.fill(); x.restore()
    }
    x.restore()
    // steam puffs from the aunties' heads while drafting
    if (inR(t, T.rage)) for (let i = 0; i < 4; i++) {
      const ph = ((t - T.rage[0]) * 0.9 + i * 0.25) % 1, side = i % 2 ? 1 : -1
      const sx = (side < 0 ? 230 : 850) + side * 30 * ph, sy = 960 - ph * 140
      x.save(); x.globalAlpha *= Math.sin(Math.PI * ph) * 0.7; R(x, '#f4f0ff', sx - 12, sy, 24, 18); R(x, '#f4f0ff', sx - 4, sy - 12, 18, 14); x.restore()
    }
  }

  function drawBooth(t) {
    if (t < T.booth || t > T.cut3) return
    const k = pop1(t, T.booth, 0.35) * (1 - ease.inCubic(prog(t, T.cut3 - 0.3, T.cut3)))
    if (k <= 0.01) return
    x.save(); x.translate(848, BOOTH_Y + 70); x.scale(k, k); x.translate(-848, -(BOOTH_Y + 70))
    // ON AIR sign
    pixelPanel(x, 780, BOOTH_Y - 140, 136, 46, { P: 4, fill: Math.sin(t * 4) > -0.6 ? '#ff3355' : '#5a1020', border: '#ffd0d8', glow: 0.4 })
    x.font = `700 24px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ON AIR', 848, BOOTH_Y - 116)
    x.restore()
  }
  function drawBoothFront(t) {
    if (t < T.booth || t > T.cut3) return
    const k = pop1(t, T.booth, 0.35) * (1 - ease.inCubic(prog(t, T.cut3 - 0.3, T.cut3)))
    if (k <= 0.01) return
    x.save(); x.translate(848, BOOTH_Y + 70); x.scale(k, k); x.translate(-848, -(BOOTH_Y + 70))
    drawDesk(x, 680, 1020, BOOTH_Y + 52, 64)
    const toG = [G_TAG].includes(speakerAt(t)) ? -0.35 : 0.35
    drawMic(x, 848, BOOTH_Y + 52, toG, 0.8)
    x.restore()
  }
  function speakerAt(t) { let s = null; for (const l of ALL) if (l.t <= t) s = l.speaker; return s }

  function drawList(t) {
    if (t < T.scroll[0] || t > T.scrollUp[1]) return
    let len = ease.outCubic(prog(t, ...T.scroll)) * 560
    if (t > T.scrollUp[0]) len *= 1 - ease.inCubic(prog(t, ...T.scrollUp))
    const items = [
      { text: 'Your Friday nights', check: T.checks[0] }, { text: 'Your playlist', check: T.checks[1] },
      { text: 'YOU', check: T.checks[2], scale: 1.5, font: "italic 600 72px 'EB Garamond', serif" },
    ]
    drawScroll(x, t, 540, 470, 600, len, items, { rowH: 100, font: "italic 600 50px 'EB Garamond', serif" })
    if (t > T.checks[2]) sparkBurst(x, t, 540, 470 + 330, T.checks[2], { n: 12, R: 300, size: 28, seed: 6 })
  }

  function drawDeck(t) {
    if (t < T.deck[0] || t > T.deckOut[1]) return
    const k = 1 - ease.inCubic(prog(t, ...T.deckOut))
    for (let i = 0; i < 5; i++) {
      const p = easeOutBack(prog(t, T.deck[0] + i * 0.14, T.deck[0] + i * 0.14 + 0.4), 1.8)
      if (p <= 0) continue
      const ang = (i - 2) * 0.22 * p, dx = (i - 2) * 120 * p, dy = Math.abs(i - 2) * 26 * p
      x.save(); x.translate(540 + dx, 860 + dy); x.rotate(ang); x.scale(k, k)
      pixelPanel(x, -90, -135, 180, 270, { P: 6, fill: '#2a1f52', border: GOLD, glow: 0.4 })
      drawPixelStar(x, 0, -10, 56, 2, GOLD)
      x.font = `700 18px ${MONO}`; x.fillStyle = rgba(BONE, 0.7); x.textAlign = 'center'; x.fillText('TONIGHT', 0, 90)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        actor(x, t, PISCES)
        drawBooth(t)
        actor(x, t, GEMINI); actor(x, t, SAGS)
        drawBoothFront(t)
        drawList(t)
        drawDeck(t)
        drawCloud(t)
        const rC = actor(x, t, CANCER), rT = actor(x, t, TAURUS)
        if (t < T.run[1] + 0.1) { if (rC) speedLines(x, t, rC.x - 120, rC.y, 200, -1, 1 - prog(t, T.run[1] - 0.2, T.run[1] + 0.1)); if (rT) speedLines(x, t, rT.x + 120, rT.y, 200, 1, 1 - prog(t, T.run[1] - 0.1, T.run[1] + 0.2)) }
        actor(x, t, YOU)
        drawCarry(t, rC, rT)
        drawPhone(t)
        if (inR(t, [T.hug[0], T.unhug[0]])) drawHearts(x, t, T.hug[0] + 0.3, 540, 1060, { n: 8, px: 8, spread: 300, life: 1.6 })
        if (inR(t, [T.l11 - 0.1, T.l11 + 0.5])) sparkBurst(x, t, 540, 800, T.l11, { n: 10, R: 300, size: 24, seed: 8 })
        veil(x, t, T.banner - 0.1, T.lessonOut, 0.4)
        lessonBanner(x, t, T.banner, T.lessonOut)
        if (inR(t, [T.sun[0], T.sun[1] + 0.6])) sparkBurst(x, t, 540, 1020, T.sun[0] + 0.3, { n: 12, R: 220, size: 24, seed: 4 })
      }
      boxes.forEach(b => b.update(t))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates; the default selection keeps 13.3 (→ the draft), 25.7 (→ never mind) and 36.0 (→ the list)
export const CUTS = [4.4, { t: T.cut1, kind: 'flip' }, 19.7, { t: T.cut2, kind: 'deal' }, 31.5, { t: T.cut3, kind: 'shuffle' }, 46.4]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (cinematic in Bb)
const BB = { Bb4: 466.16, D5: 587.33, F5: 698.46 }
const PITCH = { [C_TAG]: 880, [T_TAG]: 659.25, [G_TAG]: 1046.5, [S_TAG]: 783.99, [Y_TAG]: 987.77 }
export const CUES = [
  ['whoosh', 0.05, 0.4, 0.06], ['boom', T.run[1] - 0.05, 0.12], ['pop', T.run[1], 392, 0.04, -0.4], ['pop', T.run[1] + 0.12, 349.23, 0.04, 0.4],
  ['tom', T.set, 90, { gain: 0.2, decay: 0.3, rev: 0.2 }], ...flutter(T.set + 0.05, 5, 0.06, 0.03),
  ['pop', T.tissue, 1174.66, 0.04, 0.3], ['whoosh', T.tissue + 0.05, 0.2, 0.03],
  ['pop', T.l4 + 0.1, 523.25, 0.03, 0], ['boom', T.pour[0], 0.1], ['whoosh', T.pour[0] + 0.05, 1.2, 0.04],
  ...head(T.h1, 3, T.h1Land, 2), ['pop', T.booth, 880, 0.04, 0.5], ['glitter', T.booth, T.booth + 0.4],
  // the draft
  ...head(T.h2, 1, T.h2Land, 3), ['whoosh', T.phone[0], 0.4, 0.04],
  ...Array.from({ length: 60 }, (_, i) => ['tick', +(T.draft[0] + i * 0.18).toFixed(3), 0.02 + 0.012 * (i / 60)]),
  ['riser', T.rage[0] + 4, T.rage[1] - 0.2],
  // never mind
  ...drumroll(T.roll[0], T.roll[1]), ['tick', T.look, 0.04],
  ...Array.from({ length: 16 }, (_, i) => ['tick', +(T.del[0] + i * 0.085).toFixed(3), 0.035]), ['whoosh', T.phoneOut[0], 0.3, 0.04],
  ...head(T.h3, 2, T.h3Land, 1), ['pop', T.hug[0] + 0.3, 523.25, 0.04, -0.3], ['pop', T.hug[0] + 0.35, 523.25, 0.04, 0.3], ['bell', T.hug[0] + 0.4, 1174.66, 0.03, 1.8, 0],
  ['pop', T.l12 + 0.7, 330, 0.05, 0.5], ['whoosh', T.l12 + 0.75, 0.25, 0.04],   // Pisces honks
  // the list
  ...head(T.h4, 3, T.h4Land, 4), ['whoosh', T.scroll[0] + 0.2, 0.6, 0.05], ...flutter(T.scroll[0], 10, 0.08),
  ...T.checks.map((t, i) => ['pluck', t, [1046.5, 1174.66, 1567.98][i], 0.04, 0.4, 0]), ['bell', T.checks[2] + 0.05, 1567.98, 0.035, 1.6, 0], ['glitter', T.checks[2], T.checks[2] + 0.6],
  ['whoosh', T.scrollUp[0], 0.35, 0.04],
  // lesson
  ...levelUp(T.banner, [BB.Bb4, BB.D5, BB.F5]), ...cheer(T.banner, 1.6, 0.045), ['pop', T.banner + 0.45, 1567.98, 0.03, 0.4],
  ...wordPops(T.lesson, 8, 0.08, 0, 0.02), ['pop', T.lessonLate, 1046.5, 0.05, 0], ['pluck', T.lessonLate, 1318.51, 0.045, 0.8, 0],
  ['whoosh', T.lessonOut[0], 0.35, 0.03],
  // deck + sun
  ...head(T.h5, 2, T.h5Land, 2), ...[0, 1, 2, 3, 4].map(i => ['tick', +(T.deck[0] + i * 0.14 + 0.1).toFixed(3), 0.04]), ['whoosh', T.deckOut[0], 0.3, 0.03],
  ['bell', T.sun[0] + 0.3, 1318.51, 0.035, 2.0, 0], ['glitter', T.sun[0] + 0.3, T.sun[1] + 0.3],
  ...[0, 1, 2, 3, 4, 5].map(i => ['tick', +(T.l16 + 0.25 + i * 0.18).toFixed(3), 0.03]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...[LINES1, LINES2, LINES3, LINES4, LINES5].flatMap(ls => talkCues(ls, { cps: CPS, pitch: PITCH })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
].filter(c => c[1] >= 0)
export const HOLDS = holds(BOXES, lineTimes, CPS)
