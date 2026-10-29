// stgroupchat2 (45 s vertical Align ad, Star Talk season 2 extra #1: "The Group Chat"; promo/films/STARTALK12.md, folder
// renamed from stgroupchat because a season 3 film already lives there) · story 0–40.6, then the shared end card.
//   0.00–4.40  "The group chat | has *opinions.*"  A big pixel phone: your date texted "had fun!". YOUR STAR (rose pink,
//              bottom left) taps FORWARD; whoosh, the text lands in THE GROUP CHAT · 12. THE STARS: "a date texted you. so
//              naturally…" / "…you sent it to *the group chat.*"  Pisces is already crying, bottom right.
//   4.40–15.2  "Twelve stars. | *One* text."  Twelve little sign stars peek round the phone, typing. ♍ "too many exclamation
//              points" · ♏ "he used a period. red flag" · ♊ "send a meme" · ♌ "send NOTHING". Then the thread scrolls into
//              chaos: messages pour in faster and faster, the phone shakes, the badge climbs to 99+, your star sweats.
//  15.30       card cut (deal)
//  15.4–21.2   "*Time out.*"  ♍ VIRGO hops out of the ring with a clipboard and blows the whistle (record scratch; the
//              chat freezes). VIRGO: "Everybody. *Phones down.*" … "What do *you* want to say?"  Crickets. Your star thinks.
//  21.2–26.7   "Just | *you.*"  You type "I had fun too. Again soon?" and post it. Silence: twelve stars frozen, wide-eyed…
//              then every one of them hearts it (♥ 12), Pisces bawls.
//  26.90       card cut (flip)
//  27.0–30.9   ★ LESSON UNLOCKED: "Your friends | love you. | Your *gut* | knows you."
//  31.0–34.5   "Talk *cards.*"  A talk card: the question, two face-down answers. THE STARS: "on a talk card, it's just
//              *your* answer."
//  34.6–40.4   the phone is back. THE GROUP CHAT: "Send it. We'll be *screaming quietly.*"  You send it to your date
//              (Delivered); twelve stars vibrate in total silence. Everything pops out by 40.45; end card at 40.6.
// One canvas (sky + phone + cast + banner), DOM type + the dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { popText, actor, track, step, lessonBanner, veil, bubble, speedLines, pixelPanel, sparkBurst, drawHearts, drawPixelStar, easeOutBack,
  pop01, outK, popOut, rgba, inR, R, nodK, FONTS, GOLD, BONE, PINK, LAV, INK, MINT, RED, INTER, MONO,
  head, wordPops, chip, scratch, womp, drumroll, levelUp, whistleBlow, crickets, cheer, flutter, holds } from '../kit.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const YOU_COL = '#ff9cc0', BLUE = '#3d6cf2'
const STARS_TAG = 'THE STARS', VIR_TAG = '♍ VIRGO', CHAT_TAG = 'THE GROUP CHAT'
const SIGN_IDS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const SG = Object.fromEntries(SIGN_IDS.map(id => [id, signStar(id)]))

// ── the timeline
export const T = {
  open1: -1.6, l1: -1.4, tap: 1.75, fwd: [1.85, 2.3], l2: 3.2, close1: 6.1, h0Out: [4.2, 4.4],
  h1: 4.5, h1Land: 4.95, ring: 4.6, m: [5.0, 6.65, 8.3, 9.95], chaos: [11.55, 15.1], h1Out: [11.4, 11.6], h2: 11.6, h2Out: [15.05, 15.25], open4: 11.95, l7: 12.15, close4: 15.15,
  cut1: 15.3,
  whistle: 15.42, vIn: 15.36, h3: 15.5, h3Land: 15.75, open2: 15.7, l3: 15.95, l4: 18.55, think: [19.9, 21.3], close2: 21.3, h3Out: [21.1, 21.3],
  vOut: [21.15, 21.5],
  h4: 21.35, h4Land: 21.7, type: [21.6, 23.55], post: 23.85, hush: [24.0, 25.35], hearts: 25.35, h4Out: [26.55, 26.75],
  cut2: 26.9,
  banner: 27.0, lesson: 27.4, lessonLate: 28.3, lessonOut: [30.75, 31.0], phoneOut: [26.95, 27.0], phoneIn: [34.45, 34.8],
  h5: 31.05, h5Land: 31.35, card: [31.1, 31.5], flip: 33.6, open3: 31.25, l5: 31.45, h5Out: [34.35, 34.55], cardOut: [34.25, 34.55],
  l6: 34.85, send: 37.0, scream: [37.25, 40.2], close3: 40.25,
  out: [40.0, 40.45],
}
const LINES1 = [
  { t: T.l1, speaker: STARS_TAG, color: GOLD, text: 'a date texted you. so *naturally…*' },
  { t: T.l2, speaker: STARS_TAG, color: GOLD, text: '…you sent it to *the group chat.*' },
]
const LINES2 = [
  { t: T.l3, speaker: VIR_TAG, color: SG.virgo.color, text: 'Everybody. *Phones down.*' },
  { t: T.l4, speaker: VIR_TAG, color: SG.virgo.color, text: 'What do *you* want to say?' },
]
const LINES3 = [
  { t: T.l5, speaker: STARS_TAG, color: GOLD, text: "on a talk card, it's just *your* answer." },
  { t: T.l6, speaker: CHAT_TAG, color: PINK, text: "Send it. We'll be *screaming quietly.*" },
]
const CPS = 28
const LINES4 = [{ t: T.l7, speaker: STARS_TAG, color: GOLD, text: 'it has been *ten seconds.*' }]
export const BOXES = [[LINES1, T.close1], [LINES4, T.close4], [LINES2, T.close2], [LINES3, T.close3]]
const LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS })

// ── the thread (who, text, when). The four the brief names are spaced to be read; then it pours.
const MSGS = [
  { t: T.m[0], who: 'virgo', text: 'too many exclamation points' },
  { t: T.m[1], who: 'scorpio', text: 'he used a period. red flag' },
  { t: T.m[2], who: 'gemini', text: 'send a meme' },
  { t: T.m[3], who: 'leo', text: 'send NOTHING', big: true },
]
const POUR = [
  ['aries', 'CALL HIM'], ['taurus', 'invite him to dinner'], ['cancer', 'how was the parking'], ['sagittarius', 'lol'],
  ['capricorn', 'reply in 3-5 days'], ['libra', 'both options are valid'], ['aquarius', 'send a voice memo'],
  ['pisces', '(sobbing)'], ['aries', "WAIT DON'T CALL"], ['scorpio', 'what did he MEAN'], ['gemini', 'meme attached'],
  ['leo', 'NOTHING. AT. ALL.'], ['cancer', 'did he walk you out'], ['taurus', 'what did you eat'], ['sagittarius', 'lmaooo'],
  ['virgo', 'see slide 4'], ['capricorn', 'no. 2-4 days'], ['libra', 'or send something?'], ['aquarius', 'whale noises'],
  ['aries', 'CALL HIM'], ['pisces', '(still sobbing)'], ['scorpio', 'zoom in on the period'], ['gemini', 'two memes'],
  ['leo', 'nothing'], ['taurus', 'dinner. sunday.'], ['cancer', 'text me when home'], ['sagittarius', 'LMAOOO'],
  ['libra', 'hmm'], ['capricorn', 'final answer: 3 days'], ['aquarius', 'pending'], ['aries', 'CALL'], ['virgo', 'slide 9'],
]
{
  // accelerating: gap from 0.42 s down to ~0.08 s
  let tt = T.chaos[0]
  POUR.forEach(([who, text], i) => { MSGS.push({ t: +tt.toFixed(3), who, text, pour: true }); tt += Math.max(0.075, 0.42 * Math.pow(0.86, i)) })
}
const MINE = { t: T.post, who: 'you', text: 'I had fun too. Again soon?' }
MSGS.push(MINE)
const DRAFT = MINE.text

// ── layout
const PH = { x: 150, y: 440, w: 780, h: 850 }              // the phone body
const SCR = { x: 178, y: 520, w: 724, h: 690 }              // the screen (under the header)
const ROW = 86, INPUT_Y = 1226
const RING = SIGN_IDS.map((id, i) => ({ id, x: i < 6 ? 78 : 1002, y: 535 + (i % 6) * 140, s: 104 }))

// ── the cast
const YOU = { color: YOU_COL, seed: 12, pos: [[0, 180, 1345, 220]], glow: 0.9 }
const YOU_HOPS = [-0.18, T.tap - 0.08, T.m[0] + 0.1, T.chaos[0] + 1.2, T.whistle + 0.05, T.type[0], T.type[0] + 0.7, T.type[0] + 1.4, T.post, T.hearts + 0.9, T.banner + 0.2, T.send]
YOU.hops = YOU_HOPS
YOU.mood = [[0, 'happy', 1, -1], [T.tap + 0.25, 'wink', 1, -1], [T.l2, 'happy', 1, -1], [T.m[0], 'neutral', 1, -1], [T.m[1] + 0.2, 'wide', 1, -1],
  [T.m[3], 'wide', 1, 0], [T.chaos[0] + 1, 'eyeroll'], [T.chaos[0] + 2.2, 'wide', 1, -1], [T.whistle, 'wide', 1, 0], [T.l4, 'neutral', 0, 0],
  [T.think[0], 'squint', 0, -1], [T.think[0] + 0.8, 'neutral', 1, -1], [T.type[0], 'squint', 1, -1], [T.post, 'neutral', 1, -1], [T.hush[0] + 0.4, 'wide', 1, -1, false],
  [T.hearts + 0.4, 'heart'], [T.banner, 'happy'], [T.h5, 'sparkle', 1, -1], [T.l6, 'happy', 1, -1], [T.send, 'wink', 1, -1], [T.send + 0.6, 'happy', 1, -1]]
YOU.sweat = [[0, 0], [T.chaos[0] + 0.8, 1], [T.whistle + 0.6, 0]]
YOU.shake = [[0, 0], [T.chaos[0] + 1.5, 3], [T.chaos[1], 0]]
YOU.out = T.out
const PIS = { color: SG.pisces.color, seed: 17, pos: [[0, 935, 1360, 150]], glow: 0.8, out: T.out,
  mood: [[0, 'happy'], [T.chaos[0], 'wide', -1, -1], [T.whistle, 'wide', 0, 0], [T.l4, 'sparkle'], [T.hush[0], 'wide', -1, -1, false], [T.hearts, 'happy'], [T.h5, 'sparkle'], [T.send, 'wide', -1, -1, false]],
  tears: [[0, [1, true]], [T.chaos[0], [0.6, false]], [T.whistle, 0], [T.l4, [0.4, false]], [T.hush[0], 0], [T.hearts + 0.3, [1, true]], [T.banner, [0.6, false]], [T.send, 0]],
  hops: [T.hearts + 0.3, T.hearts + 0.75, T.banner + 0.15], squash: [[0, 0]], shake: [[0, 0], [T.scream[0], 3]] }
const VIRGO = { color: SG.virgo.color, glyph: SG.virgo.glyph, seed: 5, clipboard: true, whistle: true, in: T.vIn, out: T.vOut,
  pos: [[0, 590, 1280, 260]], blow: [[T.whistle, T.whistle + 0.55], [T.l4 - 0.6, T.l4 - 0.35]],
  mood: [[0, 'squint', 0, 0], [T.l3 + 0.6, 'squint', 0, 0], [T.l4, 'neutral', 0, 0], [T.l4 + 0.8, 'sparkle', -1, 0]],
  hops: [T.vIn + 0.02, ...talkHops(LINES2, VIR_TAG, { cps: CPS })] }

const pop1 = (t, t0, d = 0.3) => easeOutBack(prog(t, t0, t0 + d), 2.2)

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The group chat | has *opinions.*', { top: 150, size: 104, accentSize: 156, at: -1, late: 1, lateAt: -0.6, wobble: true })
  const H1 = popText(root, 'Twelve stars. | *One* text.', { top: 150, size: 112, accentSize: 160, at: T.h1, late: 0, wobble: true, accentColor: PINK })
  const H2 = popText(root, '*Chaos.*', { top: 210, size: 120, accentSize: 190, at: T.h2, wobble: true, accentColor: RED, late: 1, lateAt: T.h2 })
  const H3 = popText(root, '*Time out.*', { top: 210, size: 120, accentSize: 190, at: T.h3, wobble: true, accentColor: SG.virgo.color, late: 2, lateAt: T.h3Land, lateGap: 0.14 })
  const H4 = popText(root, 'Just | *you.*', { top: 150, size: 112, accentSize: 168, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: YOU_COL })
  const H5 = popText(root, 'Talk *cards.*', { top: 210, size: 120, accentSize: 170, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: LAV })
  const LESSON = popText(root, 'Your friends | love you. | Your *gut* | knows you.', { top: 640, size: 104, accentSize: 150, at: T.lesson, gap: 0.09, late: 2, lateAt: T.lessonLate, lateGap: 0.18, wobble: true, lineHeight: 1.04 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [LESSON, T.lessonOut]]
  const BOX_Y = 1450
  const box1 = dialogueBox(root, { lines: LINES1, y: BOX_Y, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: BOX_Y, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const box4 = dialogueBox(root, { lines: LINES4, y: BOX_Y, width: 960, height: 290, open: T.open4, close: T.close4, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES3, y: BOX_Y, width: 960, height: 290, open: T.open3, close: T.close3, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── the phone
  function phoneK(t) {
    if (t >= T.phoneOut[1] && t < T.phoneIn[0]) return 0
    if (t >= T.phoneIn[0]) return pop1(t, T.phoneIn[0], 0.35) * popOut(t, T.out)
    return 1
  }
  function shakeAt(t) {
    if (inR(t, [T.chaos[0] + 0.6, T.chaos[1]])) return 7 * prog(t, T.chaos[0] + 0.6, T.chaos[1]) * Math.sin(t * 57)
    if (inR(t, [T.whistle, T.whistle + 0.3])) return 10 * Math.sin(t * 80) * (1 - prog(t, T.whistle, T.whistle + 0.3))
    return 0
  }
  function drawPhone(t) {
    const k = phoneK(t)
    if (k <= 0.01) return
    const cx = PH.x + PH.w / 2, cy = PH.y + PH.h / 2
    x.save(); x.translate(cx + shakeAt(t), cy); x.scale(k, k); x.translate(-cx, -cy)
    // body
    pixelPanel(x, PH.x, PH.y, PH.w, PH.h, { P: 10, fill: '#120d2a', border: '#8f86c8', glow: 0.25 })
    R(x, '#0b0820', SCR.x, PH.y + 28, SCR.w, PH.h - 56)
    // header
    const inChat = t >= T.fwd[0] + 0.2
    const hk = inChat ? pop1(t, T.fwd[0] + 0.2, 0.3) : 1
    R(x, '#1d1640', SCR.x, PH.y + 28, SCR.w, 66)
    x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.save(); x.translate(cx, PH.y + 62); x.scale(1, hk)
    x.fillStyle = inChat ? GOLD : PINK
    x.fillText(inChat ? '★ THE GROUP CHAT · 12' : '♥ DATE', 0, 0)
    x.restore()
    // unread badge (climbs in the chaos)
    if (inChat && t > T.m[0]) {
      const n = MSGS.filter(m => m.t <= t && m.who !== 'you').length
      const lbl = n > 99 || t > T.chaos[0] + 2.4 ? '99+' : String(n)
      const bk = pop1(t, T.m[0], 0.3)
      x.save(); x.translate(SCR.x + SCR.w - 54, PH.y + 61); x.scale(bk, bk)
      R(x, RED, -40, -20, 80, 40); R(x, RED, -44, -16, 88, 32)
      x.font = `700 26px ${MONO}`; x.fillStyle = '#fff'; x.fillText(lbl, 0, 1); x.restore()
    }
    // screen content
    x.save(); x.beginPath(); x.rect(SCR.x, SCR.y - 4, SCR.w, INPUT_Y - SCR.y - 16); x.clip()
    if (!inChat || t < T.fwd[1]) drawDM(t)
    if (inChat) drawThread(t)
    x.restore()
    drawInput(t)
    // the "paused" stamp while Virgo holds the room
    if (inR(t, [T.whistle + 0.1, T.type[0]])) {
      const sk = pop1(t, T.whistle + 0.1, 0.25) * (1 - prog(t, T.type[0] - 0.3, T.type[0]))
      x.save(); x.translate(cx, 860); x.rotate(-0.12); x.scale(sk, sk)
      x.strokeStyle = RED; x.lineWidth = 10; x.strokeRect(-210, -56, 420, 112)
      x.font = `700 62px ${MONO}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PAUSED', 0, 4)
      x.restore()
    }
    x.restore()
  }
  function drawDM(t) {
    // the date's text, big, left; slides out as you forward it
    const sl = ease.inCubic(prog(t, ...T.fwd))
    x.save(); x.translate(-sl * 760, 0)
    const by = 760
    x.font = `700 26px ${MONO}`; x.fillStyle = rgba(BONE, 0.6); x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.fillText('today 9:41 PM', SCR.x + 34, by - 96)
    bubble(x, SCR.x + 34 + 190, by, 380, 120, { fill: '#3a3358', tail: 'l' })
    x.font = `800 58px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('had fun!', SCR.x + 34 + 190, by + 2)
    // FORWARD button
    const press = inR(t, [T.tap - 0.05, T.tap + 0.18]) ? 0.9 : 1
    const glow = 0.5 + 0.5 * Math.sin(t * 9)
    x.save(); x.translate(SCR.x + SCR.w / 2, 990); x.scale(press, press)
    pixelPanel(x, -190, -50, 380, 100, { P: 8, fill: '#2a1f52', border: GOLD, glow: 0.4 + 0.5 * glow })
    x.font = `700 40px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('FORWARD ➜', 0, 4)
    x.restore()
    if (t > T.tap - 0.05 && t < T.tap + 0.5) sparkBurst(x, t, SCR.x + SCR.w / 2, 990, T.tap, { n: 10, R: 200, size: 24, seed: 4 })
    x.restore()
  }
  // message rows, newest at the bottom; each arrival pushes the stack up
  function drawThread(t) {
    const bottom = INPUT_Y - 30
    let off = 0
    const vis = []
    for (let i = MSGS.length - 1; i >= 0; i--) {
      const m = MSGS[i]
      if (m.t > t) continue
      const h = m.who === 'you' ? ROW + 6 : ROW
      const e = ease.outCubic(prog(t, m.t, m.t + (m.pour ? 0.12 : 0.2)))
      vis.push({ m, y: bottom - off - h * e, h, e })
      off += h * e
      if (off > SCR.h + 200) break
    }
    // the forwarded text: the first row (right, blue), pinned at the top until the thread pushes it away
    const fwdY = bottom - off - 110
    if (fwdY > SCR.y - 120) {
      const fk = pop1(t, T.fwd[1] - 0.1, 0.35)
      const fx = SCR.x + SCR.w - 230
      x.save(); x.translate(fx, fwdY + 55); x.scale(fk, fk)
      bubble(x, 0, 0, 380, 92, { fill: BLUE, tail: 'r' })
      x.font = `700 22px ${MONO}`; x.fillStyle = rgba('#ffffff', 0.7); x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('FWD', -170, -22)
      x.font = `800 40px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText('“had fun!”', 10, 12)
      x.restore()
    }
    const blur = inR(t, [T.chaos[0] + 1.6, T.chaos[1]]) ? prog(t, T.chaos[0] + 1.6, T.chaos[1]) : 0
    for (const v of vis) drawRow(t, v, blur)
  }
  function drawRow(t, { m, y, h, e }, blur) {
    if (y + h < SCR.y - 10) return
    const k = m.pour ? 1 : pop1(t, m.t, 0.3)
    if (m.who === 'you') {
      const w = 600, cx = SCR.x + SCR.w - w / 2 - 34, cy = y + h / 2
      x.save(); x.translate(cx, cy); x.scale(k, k)
      bubble(x, 0, 0, w, h - 14, { fill: BLUE, tail: 'r' })
      x.font = `800 36px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(m.text, 0, 1)
      x.restore()
      // the hearts on your message
      if (t >= T.hearts) {
        const n = Math.min(12, Math.floor((t - T.hearts) / 0.085) + 1)
        for (let i = 0; i < n; i++) {
          const hk = pop1(t, T.hearts + i * 0.085, 0.22)
          const hx = cx + w / 2 - 30 - i * 24, hy = cy + h / 2 - 8
          x.save(); x.translate(hx, hy); x.scale(hk, hk); x.font = `700 34px ${INTER}`; x.fillStyle = SG[SIGN_IDS[i]].color; x.textAlign = 'center'; x.fillText('♥', 0, 0); x.restore()
        }
        if (n >= 12) {
          const ck = pop1(t, T.hearts + 12 * 0.085, 0.3)
          x.save(); x.translate(cx - w / 2 + 50, cy + h / 2 - 6); x.scale(ck, ck)
          R(x, PINK, -44, -20, 88, 40); x.font = `700 26px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥ 12', 0, 1); x.restore()
        }
      }
      return
    }
    const S = SG[m.who], ax = SCR.x + 52, cy = y + h / 2
    x.save(); x.globalAlpha *= clamp(e * 2) * (1 - blur * 0.35)
    // avatar
    drawStarChar(x, ax, cy + 4, 62, t, { color: S.color, mood: m.big ? 'squint' : 'neutral', look: [1, 0], blink: false, bob: 0, seed: 3, glow: 0.4, tips: false, pop: k })
    x.font = `800 ${m.big ? 40 : 34}px ${INTER}`
    const tw = x.measureText(m.text).width, bw = Math.min(SCR.w - 130, tw + 56)
    const bx = ax + 44 + bw / 2
    x.save(); x.translate(bx - bw / 2, cy); x.scale(k, k); x.translate(bw / 2, 0)
    bubble(x, 0, 0, bw, h - 16, { fill: '#2b2350', tail: 'l', shine: false })
    R(x, S.color, -bw / 2 + 8, -(h - 16) / 2 + 16, 6, h - 48)
    x.fillStyle = m.big ? '#ffdd6e' : '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(m.text, 4, 1)
    x.restore()
    // the brief's four get a little sign tag
    if (!m.pour) { x.font = `700 22px ${MONO}`; x.fillStyle = S.color; x.textAlign = 'left'; x.fillText(S.glyph, ax + 30, cy - 32) }
    x.restore()
    if (blur > 0) { x.fillStyle = `rgba(11,8,32,${(blur * 0.25).toFixed(3)})`; x.fillRect(SCR.x, y, SCR.w, h) }
  }
  function drawInput(t) {
    const y = INPUT_Y, x0 = SCR.x + 18, w = SCR.w - 36
    R(x, '#1d1640', x0, y, w, 64); R(x, '#2c2459', x0 + 4, y + 4, w - 8, 56)
    let txt = '', typing = false
    if (t >= T.type[0] && t < T.post) { const n = Math.floor(clamp(prog(t, ...T.type)) * DRAFT.length); txt = DRAFT.slice(0, n); typing = true }
    if (t >= T.phoneIn[0] && t < T.send) txt = DRAFT
    x.font = `700 32px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    if (txt) {
      x.fillStyle = '#fff'; x.fillText(txt, x0 + 22, y + 33)
      if ((typing || t < T.send) && Math.sin(t * 12) > 0) R(x, '#fff', x0 + 26 + x.measureText(txt).width, y + 14, 4, 38)
    } else { x.fillStyle = rgba(BONE, 0.35); x.fillText(t >= T.send ? 'Delivered ✓' : 'message…', x0 + 22, y + 33) }
    // send button
    const hot = (t > T.type[1] && t < T.post + 0.2) || (t >= T.phoneIn[0] && t < T.send + 0.2)
    const pk = inR(t, [T.post - 0.08, T.post + 0.12]) || inR(t, [T.send - 0.08, T.send + 0.12]) ? 0.85 : 1
    x.save(); x.translate(x0 + w - 40, y + 32); x.scale(pk, pk)
    x.fillStyle = hot ? (Math.sin(t * 10) > 0 ? GOLD : '#ffe7a0') : '#5b5287'
    x.beginPath(); x.moveTo(-16, -20); x.lineTo(22, 0); x.lineTo(-16, 20); x.lineTo(-8, 0); x.closePath(); x.fill()
    x.restore()
    if (t >= T.post && t < T.post + 0.6) sparkBurst(x, t, x0 + w - 40, y + 32, T.post, { n: 8, R: 120, size: 20, seed: 7 })
  }

  // ── the twelve around the phone
  function ringStar(t, i) {
    const P = RING[i], S = SG[P.id]
    if (t < T.ring + i * 0.06) return
    if (t > T.phoneOut[0] && t < T.banner) return
    if (P.id === 'virgo' && t >= T.vIn - 0.05 && t < T.vOut[1]) return          // Virgo hops out to run the room
    const pk = (t < T.phoneOut[0] ? pop1(t, T.ring + i * 0.06, 0.35) : pop1(t, T.banner + 0.3 + i * 0.03, 0.3)) * popOut(t, T.out)
    if (P.id === 'virgo' && t >= T.vOut[1]) { /* back in its slot */ }
    const side = i < 6 ? 1 : -1
    let mood = 'squint', look = [side, 0], shake = 0, sq = 0, blink, dy = 0
    const mi = MSGS.findIndex(m => !m.pour && m.who === P.id)
    if (t < T.chaos[0]) { mood = mi >= 0 && t > MSGS[mi].t ? 'wide' : 'squint'; if (P.id === 'leo' && t > T.m[3]) mood = 'squint' }
    else if (t < T.whistle) { mood = (i + Math.floor(t * 3)) % 3 ? 'wide' : 'squint'; shake = 4 * prog(t, T.chaos[0], T.chaos[1]); look = [side, (i % 2) ? -1 : 1] }
    else if (t < T.type[0]) { mood = t < T.whistle + 0.6 ? 'wide' : 'neutral'; look = [0, 1]; sq = t < T.whistle + 0.6 ? -0.12 : 0.08; dy = t < T.whistle + 0.6 ? -18 : 10 }
    else if (t < T.hush[0]) { mood = 'wide'; look = [side, 1] }
    else if (t < T.hearts + i * 0.085) { mood = 'wide'; look = [side, 0]; blink = false }
    else if (t < T.phoneOut[0]) { mood = 'heart' }
    else if (t < T.h5) mood = 'happy'
    else if (t < T.send) { mood = 'sparkle'; look = [side, 0] }
    else { mood = 'wide'; blink = false; shake = 8 * clamp(prog(t, T.scream[0], T.scream[0] + 0.3)); sq = 0.1 * Math.sin(t * 30 + i); look = [side, 0] }
    const hops = []
    if (mi >= 0) hops.push(MSGS[mi].t - 0.05)
    hops.push(T.whistle + i * 0.02, T.hearts + i * 0.085)
    const sx = P.x + (shake ? Math.sin(t * 63 + i * 1.7) * shake : 0)
    const r = drawStarChar(x, sx, P.y + dy, P.s, t, { color: S.color, mood, look, blink, squash: sq, hops, seed: i + 2, pop: pk, glow: 0.7 })
    // typing dots
    if (pk > 0.6 && ((t > T.ring + 0.6 && t < T.whistle) || inR(t, [T.type[0], T.post]))) {
      const typing = t >= T.chaos[0] || (mi >= 0 ? t > MSGS[mi].t - 1.1 && t < MSGS[mi].t : false) || inR(t, [T.type[0], T.post])
      if (typing) {
        const bx = P.x + side * 18, by = P.y - P.s * 0.62
        bubble(x, bx, by, 70, 34, { fill: '#efe6d6', P: 4, shine: false })
        for (let d = 0; d < 3; d++) { const b = Math.sin(t * 10 - d * 0.9 + i) > 0.3 ? -3 : 0; R(x, '#3a3358', bx - 20 + d * 16, by - 4 + b, 9, 9) }
      }
    }
    // screaming quietly: tiny pixel "!" that pop above, no sound
    if (t > T.scream[0]) {
      const ph = ((t - T.scream[0]) * 1.6 + i * 0.37) % 1
      x.save(); x.globalAlpha *= Math.sin(Math.PI * ph) * pk; x.font = `800 52px ${INTER}`; x.fillStyle = [GOLD, PINK, BONE][i % 3]; x.textAlign = 'center'
      x.fillText('!!', sx + side * 10, P.y - P.s * 0.5 - ph * 50); x.restore()
    }
    return r
  }

  // ── the talk card (tie-in)
  function drawTalkCard(t) {
    if (t < T.card[0] || t > T.cardOut[1]) return
    const k = easeOutBack(prog(t, ...T.card), 1.8) * (1 - ease.inCubic(prog(t, ...T.cardOut)))
    if (k <= 0.01) return
    x.save(); x.translate(540, 900); x.rotate(-0.04 + 0.015 * Math.sin(t * 2)); x.scale(k, k)
    pixelPanel(x, -330, -270, 660, 400, { P: 10, fill: '#f6eee0', border: LAV, glow: 0.6 })
    x.font = `700 26px ${MONO}`; x.fillStyle = '#7a6aa8'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -215)
    x.font = `800 46px ${INTER}`; x.fillStyle = INK
    x.fillText('What made you', 0, -140); x.fillText('laugh this week?', 0, -86)
    // two face-down answers
    for (const [i, lbl] of [[-1, 'YOU'], [1, 'THEM']]) {
      const ax = i * 150, ay = 30
      const fl = i < 0 ? prog(t, T.flip, T.flip + 0.3) : 0
      x.save(); x.translate(ax, ay); x.scale(1 - 2 * Math.min(fl, 0.5) * (fl < 0.5 ? 1 : 0), 1)
      pixelPanel(x, -110, -60, 220, 120, { P: 6, fill: '#2a1f52', border: GOLD, glow: 0.2 })
      x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.fillText(lbl, 0, -20)
      x.font = `700 40px ${INTER}`; x.fillStyle = BONE; x.fillText('?', 0, 22)
      x.restore()
    }
    x.font = `700 24px ${MONO}`; x.fillStyle = '#7a6aa8'; x.fillText('hidden till you both play', 0, 112)
    x.restore()
    // a lock on top
    const lk = pop1(t, T.card[1] + 0.6, 0.3) * (1 - ease.inCubic(prog(t, ...T.cardOut)))
    if (lk > 0.01) { x.save(); x.translate(540, 932); x.scale(lk, lk); R(x, GOLD, -16, -6, 32, 26); x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(0, -8, 11, Math.PI, 0); x.stroke(); R(x, INK, -3, 2, 6, 10); x.restore() }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        for (let i = 0; i < 12; i++) ringStar(t, i)
        drawPhone(t)
        if (t > T.fwd[0] && t < T.fwd[1] + 0.3) speedLines(x, t, 800, 760, 160, -1, 1 - prog(t, T.fwd[1], T.fwd[1] + 0.3))
        if (inR(t, [T.phoneOut[0], T.phoneIn[1] + 0.3])) {
          veil(x, t, T.banner - 0.1, T.lessonOut, 0.35)
        }
        drawTalkCard(t)
        actor(x, t, PIS)
        actor(x, t, YOU)
        actor(x, t, VIRGO)
        if (inR(t, [T.whistle, T.whistle + 0.5])) sparkBurst(x, t, 470, 1300, T.whistle, { n: 12, R: 420, size: 28, seed: 9, cols: [BONE, GOLD] })
        if (inR(t, T.think)) {        // your star's thought dots
          for (let d = 0; d < 3; d++) { const k = pop1(t, T.think[0] + d * 0.3, 0.25); if (k > 0.01) { x.save(); x.translate(250 + d * 34, 1215 - d * 40); x.scale(k, k); bubble(x, 0, 0, 24 + d * 12, 24 + d * 12, { fill: BONE, P: 4, shine: false }); x.restore() } }
        }
        if (t >= T.hearts && t < T.hearts + 1.8) drawHearts(x, t, T.hearts + 0.6, 540, 1000, { n: 9, px: 8, spread: 500, life: 1.4 })
        if (t >= T.send && t < T.send + 0.8) sparkBurst(x, t, 860, INPUT_Y + 32, T.send, { n: 10, R: 220, size: 24, seed: 3 })
        lessonBanner(x, t, T.banner, T.lessonOut)
      }
      box1.update(t); box4.update(t); box2.update(t); box3.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates; the default selection keeps 15.3 (→ time out) and 26.9 (→ the lesson)
export const CUTS = [4.35, { t: T.cut1, kind: 'deal' }, 21.25, { t: T.cut2, kind: 'flip' }, 34.6]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop, C major-ish; the score is pop in D)
const D = { D5: 587.33, Fs5: 739.99, A5: 880 }
export const CUES = [
  
  ['pop', T.tap, 1174.66, 0.045, 0], ['tick', T.tap, 0.05], ['whoosh', T.fwd[0], 0.45, 0.06], ['pop', T.fwd[1], 880, 0.04, 0.3], ['glitter', T.fwd[1], T.fwd[1] + 0.4],
  ...head(T.h1, 4, T.h1 + 0.35, 2),
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => ['pop', +(T.ring + i * 0.06).toFixed(3), [523.25, 587.33, 659.25, 783.99][i % 4] * 2, 0.018, i < 6 ? -0.5 : 0.5]),
  // the four the brief names: a phone "ding" each (rising)
  ...T.m.map((t, i) => ['pop', t, [880, 987.77, 1174.66, 1318.51][i], 0.05, (i % 2 ? 0.3 : -0.3)]),
  ...T.m.map((t, i) => ['pluck', t + 0.02, [1760, 1975.53, 2349.32, 2637.02][i] / 2, 0.025, 0.4, 0]),
  ['boom', T.m[3] + 0.05, 0.08],
  // the pour: a ding per message, faster and faster
  ...MSGS.filter(m => m.pour).map((m, i) => ['pop', m.t, [880, 1046.5, 1174.66, 1318.51, 987.77][i % 5], 0.022 + 0.01 * (i / POUR.length), (i % 2 ? 0.4 : -0.4)]),
  ...head(T.h2, 1, T.h2 + 0.05, 5),
  ['riser', T.chaos[0] + 0.8, T.chaos[1]],
  // time out
  ...scratch(T.whistle - 0.05), ...whistleBlow(T.whistle, 0.6), ['boom', T.whistle, 0.1],
  ...head(T.h3, 2, T.h3Land, 1),
  ['pop', T.open2, 659.25, 0.04, 0],
  ...whistleBlow(T.l4 - 0.6, 0.25),
  ...crickets(T.think[0], T.think[1] + 0.2),
  // just you
  ...head(T.h4, 2, T.h4Land, 3),
  ...Array.from({ length: 13 }, (_, i) => ['tick', +(T.type[0] + i * 0.15).toFixed(3), 0.03]),
  ['whoosh', T.post, 0.3, 0.05], ['pop', T.post + 0.05, 1174.66, 0.045, 0.3],
  ...crickets(T.hush[0] + 0.15, T.hush[1] - 0.2, 0.022),
  ...Array.from({ length: 12 }, (_, i) => ['pop', +(T.hearts + i * 0.085).toFixed(3), NOTE_UP(i), 0.04, (i - 5.5) / 8]),
  ...cheer(T.hearts + 1.0, 1.4, 0.05),
  // lesson
  ...levelUp(T.banner, [D.D5, D.Fs5, D.A5]), ...cheer(T.banner, 1.6, 0.05), ['pop', T.banner + 0.45, 1567.98, 0.03, 0.4],
  ...wordPops(T.lesson, 4, 0.09, 0, 0.022), ['pop', T.lessonLate, 1046.5, 0.05, 0], ['pluck', T.lessonLate, 1318.51, 0.045, 0.8, 0], ['pop', T.lessonLate + 0.18, 1174.66, 0.045, 0],
  ['whoosh', T.lessonOut[0], 0.35, 0.03],
  // talk card
  ...head(T.h5, 2, T.h5Land, 4), ['whoosh', T.card[0], 0.4, 0.04], ['pop', T.card[1] + 0.6, 783.99, 0.035, 0], ['tick', T.flip, 0.04],
  ['pop', T.open3, 659.25, 0.035, 0],
  ['pop', T.phoneIn[0], 880, 0.04, 0], ['whoosh', T.send, 0.3, 0.05], ['pop', T.send + 0.04, 1318.51, 0.04, 0.3], ['tick', T.send + 0.3, 0.03],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [STARS_TAG]: 783.99 } }),
  ...talkCues(LINES4, { cps: CPS, pitch: { [STARS_TAG]: 783.99 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [VIR_TAG]: 880 } }),
  ...talkCues(LINES3, { cps: CPS, pitch: { [STARS_TAG]: 783.99, [CHAT_TAG]: 987.77 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
].filter(c => c[1] >= 0)
function NOTE_UP(i) { return [587.33, 659.25, 739.99, 880, 987.77, 1174.66][i % 6] * (i >= 6 ? 2 : 1) }
export const HOLDS = holds(BOXES, lineTimes, CPS)
