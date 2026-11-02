// hxdiarytalkcard (45 s vertical, BETA DIARIES, Houston: "My first *talk card* in Houston.") · story 0–40.6, end card.
//   A diary-cam: ♓ Pisces, a beta tester in Houston, films confessionals (handheld wobble, REC frame, a DIARY tape).
//   0.0   CONF   frame 0: the DIARY tape + "My first *talk card* | in Houston."  Pisces waves, already teary.
//   2.9          "diary. tonight: my first *talk card.*"
//   6.2   PHONE  tonight's deck: three face-down cards, one marked TALK CARD. "a bench by the bayou. at *sunset.* eek."
//   10.7  CONF   the nerves list: • it gets awkward (✗) • I say too much (✗) • I cry (✓ obviously)
//   15.0  BENCH  (the one card cut) selfie-cam on a bayou bench at sunset. "they're here. act *normal.*" Capricorn sits
//                down; the talk card flips in their hands: "What's a dream | you've never | said out loud?"
//   22.4  LAPSE  time-lapse: the sun sets, the Moon comes up, joggers blur past, little bubbles keep popping between them.
//   26.85 PHOTO  a snapshot from the night: the two of them on the bench under the stars, "bayou bench ♥".
//   30.4  PHONE  a text from Capricorn: "same bench soon? ♥"  Pisces types "YES" (tears on the screen).
//   33.9  CONF   ★ LESSON "Small talk is fine. | *Real* talk is better."  REAL TALK ✓
//   38.1         "Ask the *real* one."  Pisces closes the notebook; REC pauses. (frame 0's pose, now heart-eyed)
//   Rewatch bait: Cancer cries in solidarity outside the bedroom window in every confessional.
// One canvas (sky + room + cast + phone), DOM type + box + lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawRecFrame, vlogCam, vlogCutCues } from '../../st9day.js'
import { drawTears as tearFountain } from '../../stmetfirst/props.js'
import { PIS, GOLD, BONE, INK, MINT, INTER, SERIF, DIARY_FONTS, pop01, pix, rr, txt,
  drawRoom, drawPiscesWindow, drawDiarist, drawPhone, drawCardBack, showBug, tapeTitle, heads, headCues, drawRoomBlurred } from './diary.js'
import { drawSunsetSky, drawBayou, drawBench, drawFlipCard, drawWordBubble, WATER } from './props.js'

export const DURATION = 45
const KEY = 'B'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const CAP = signStar('capricorn'), CAN = signStar('cancer')
const ROOM = { glyph: PIS.glyph, color: '#3a7ab8' }

const T = {
  title: [2.5, 2.8], l1: 2.9,
  phone1: 6.2, l2: 6.6, deal: [6.4, 6.6, 6.8], glow: 7.4,
  conf2: 10.7, g: [11.0, 11.8, 12.6], gx: [11.55, 12.35], gok: 13.2, l3: 10.9, l4: 13.4,
  bench: 15.0, l5: 15.5, sit: [16.6, 17.1], l6: 18.7, pull: 20.0, flip: [20.4, 20.9], l7: 21.5,
  lapse: 23.0, l8: 24.0, bub: [23.3, 23.75, 24.2, 24.65, 25.1, 25.55, 26.0],
  photo: 26.85, l9: 27.3, snap: 26.9,
  phone2: 30.4, l10: 30.6, msg: 30.7, type: [31.6, 32.4], sent: 32.6, close: 33.7,
  conf3: 33.9, lesson: 33.94, lessonOut: [38.0, 38.25],
  last: 38.1, shut: 38.4, pause: 40.15, lastOut: [40.3, 40.55],
}
const SEG = [[0, 'conf'], [T.phone1, 'phone1'], [T.conf2, 'conf'], [T.bench, 'bench'], [T.photo, 'photo'], [T.phone2, 'phone2'], [T.conf3, 'conf']]
const segAt = t => { let s = SEG[0]; for (const q of SEG) if (t >= q[0]) s = q; return s }
const CAMCUTS = [T.phone1, T.conf2, T.bench, T.photo, T.phone2, T.conf3]

const PISN = '♓ PISCES · DIARY', CAPN = '♑ CAPRICORN'
const LINES = [
  { t: T.l1, speaker: PISN, text: 'diary. tonight: my first *talk card.*', color: PIS.color },
  { t: T.l2, speaker: PISN, text: 'a bench by the bayou. at *sunset.* eek.', color: PIS.color },
  { t: T.l3, speaker: PISN, text: 'what if i cry? (i will *definitely* cry.)', color: PIS.color },
  { t: T.l5, speaker: PISN, text: '(whispering) they’re here. act *normal.*', color: PIS.color },
  { t: T.l6, speaker: CAPN, text: 'hi. should we flip the *card?*', color: CAP.color },
  { t: T.l7, speaker: PISN, text: 'oh. it’s a *real* one.', color: PIS.color },
  { t: T.l8, speaker: CAPN, text: 'okay. *your* turn. same question.', color: CAP.color },
  { t: T.l9, speaker: PISN, text: 'we talked till the stars came *out.*', color: PIS.color },
  { t: T.l10, speaker: PISN, text: 'they texted. i’m crying. *again.*', color: PIS.color },
]
const CPS = 26
export const LT = lineTimes(LINES, { cps: CPS })
const HOPS = talkHops(LINES, PISN, { cps: CPS })
const CAPHOPS = talkHops(LINES, CAPN, { cps: CPS })

const HEADS = [
  { text: 'My first *talk card* | in Houston.', at: -1.2, out: [2.55, 2.85], top: 410, size: 96 },
  { text: 'Tonight’s | *plan.*', at: 3.0, out: [5.9, 6.15], top: 262 },
  { text: 'A bench on | the *bayou.*', at: 6.3, out: [10.4, 10.65], top: 262 },
  { text: 'Nerves | *report.*', at: 10.8, out: [14.7, 14.95], top: 262 },
  { text: 'They’re | *here.*', at: 15.1, out: [19.8, 20.05], top: 262, accentColor: CAP.color },
  { text: 'The card | *says…*', at: 20.1, out: [22.75, 23.0], top: 262 },
  { text: 'Talking. | *Still* talking.', at: 23.1, out: [26.5, 26.8], top: 262, accentColor: MINT },
  { text: 'We lost | track of *time.*', at: 26.95, out: [30.1, 30.35], top: 262 },
  { text: 'They | *texted.*', at: 30.45, out: [33.6, 33.85], top: 262, accentColor: MINT },
  { text: 'Ask the | *real* one.', at: T.last, out: T.lastOut, top: 300, size: 110, accentColor: PIS.color },
]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Small talk is fine. | *Real* talk | is better.', chip: 'REAL TALK ✓', accentColor: PIS.color }

const NOTE = [
  { text: 'NERVES:', at: 10.75, color: '#2a2a6a', size: 24, gap: 44 },
  { size: 24, text: '• it gets awkward', at: T.g[0], strike: T.gx[0] },
  { size: 24, text: '• i say too much', at: T.g[1], strike: T.gx[1] },
  { size: 24, text: '• i cry', at: T.g[2], check: T.gok, color: '#2f7a4a' },
]
const Q = ['What’s a dream', 'you’ve never', 'said out loud?']
const BUBS = ['ha!', 'no way', 'me too!', '♥', 'tell me more', 'wait, really?', '✦']

async function build(stage) {
  try { await Promise.all([...DIARY_FONTS, "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const title = tapeTitle(root, { text: 'DIARY', at: 0, out: T.title, top: 236 })
  const H = heads(root, HEADS)
  const box = dialogueBox(root, { lines: LINES, y: 1478, width: 960, height: 250, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── the confessional
  function conf(t) {
    drawRoom(x, t, ROOM)
    const late = t >= T.conf3
    const can = t < T.phone1 ? { mood: 'sparkle', cry: 0.8 } : !late ? { mood: 'wide', cry: 1.2, look: [-1, 1] } : { mood: 'heart', cry: 1.8 }
    drawPiscesWindow(x, t, { ...can, who: CAN, pop: pop01(t, 0.6, 0.4) })
    let mood = 'sparkle', look = [0, 0], nb = { open: 0 }, pen = false, squash = 0, cry = 0.9
    if (t < T.phone1) { mood = t < 1.6 ? 'happy' : t < T.l1 ? 'wink' : 'sparkle' }
    else if (!late) {
      mood = t < T.gok ? 'squint' : t < T.l4 ? 'wide' : 'sparkle'; look = t < T.gok ? [1, 1] : [0, 0]; cry = t < T.gok ? 0.5 : 1.6
      nb = { open: 1, lines: NOTE, dx: 0, dy: 255, s: 0.92, rot: -0.04 }; pen = t < T.gok + 0.2
    } else {
      mood = t < T.last ? 'sparkle' : t < T.pause - 0.6 ? 'heart' : 'wink'; cry = 1.8
      nb = { open: 0, rot: -0.12 }
      squash = t > T.shut && t < T.shut + 0.4 ? 0.12 * Math.sin((t - T.shut) * 25) * (1 - prog(t, T.shut, T.shut + 0.4)) : 0
    }
    const hops = [0.15, 0.55, 0.95, ...HOPS, T.gok, T.last + 0.4, T.shut]
    const r = drawDiarist(x, PIS, 540, 1040, 400, t, { mood, look, hops, squash, seed: 7 }, { notebook: nb, pen })
    tearFountain(x, r.x - 400 * 0.17, r.y - 400 * 0.05, 400 / 36, t, cry, -1, 1); tearFountain(x, r.x + 400 * 0.17, r.y - 400 * 0.05, 400 / 36, t, cry, 1, 2)
    if (t < 2.2) { const a = Math.sin(t * 12) * 0.5; x.save(); x.translate(330, 870); x.rotate(a); txt(x, '✦', 0, -40, { size: 54, color: GOLD, font: INTER, alpha: 1 - prog(t, 1.8, 2.2) }); x.restore() }
    if (t > T.shut + 0.3) {
      const k = pop01(t, T.shut + 0.3, 0.3, 3)
      x.save(); x.translate(540 + 0.42 * 400, 1040 + 0.3 * 400 - 60); x.rotate(-0.25); x.scale(k, k)
      pix(x, -96, -28, 192, 56, INK); pix(x, -90, -22, 180, 44, MINT); txt(x, 'ASKED ✓', 0, 1, { size: 28, color: INK, shadow: false })
      x.restore()
    }
  }

  // ── phone screens
  function deckScreen(t, sx, sy, sw, sh) {
    const cx = sx + sw / 2
    txt(x, 'TONIGHT’S DECK', cx, sy + 120, { size: 17, color: '#9a8fc0', shadow: false, spacing: 3 })
    txt(x, 'Card first.', cx, sy + 176, { size: 46, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    txt(x, 'Face last.', cx, sy + 228, { size: 46, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    for (let i = 0; i < 3; i++) {
      const k = pop01(t, T.deal[i], 0.35, 2), mid = i === 1
      const cxx = cx + (i - 1) * 140, cyy = sy + 470 - (mid ? 30 : 0)
      drawCardBack(x, cxx, cyy, mid ? 150 : 120, t, { charge: mid ? 0.4 * clamp((t - T.glow) * 2) : 0, rot: (i - 1) * 0.12, pop: k })
    }
    if (t > T.glow) {
      const k = pop01(t, T.glow, 0.3, 2.4)
      x.save(); x.translate(cx, sy + 640); x.scale(k, k)
      x.fillStyle = MINT; rr(x, -110, -26, 220, 52, 26); x.fill(); txt(x, 'TALK CARD', 0, 2, { size: 24, color: INK, shadow: false })
      x.restore()
      txt(x, 'Meet at a bench on the bayou.', cx, sy + 720, { size: 24, color: '#cfc6e8', shadow: false, font: INTER, weight: 600, alpha: clamp((t - T.glow - 0.3) * 3) })
    }
    txt(x, 'TAP TO FLIP TOGETHER', cx, sy + sh - 70, { size: 16, color: '#9a8fc0', shadow: false, spacing: 3, alpha: 0.5 + 0.5 * Math.sin(t * 5) })
  }
  function textScreen(t, sx, sy, sw, sh) {
    const cx = sx + sw / 2
    txt(x, '♑ Capricorn', cx, sy + 110, { size: 30, color: BONE, font: INTER, weight: 800, shadow: false })
    txt(x, 'from tonight’s deck', cx, sy + 148, { size: 18, color: '#9a8fc0', font: INTER, weight: 600, shadow: false })
    const bub = (bx, by, w, text, col, tcol, k) => { if (k <= 0) return; x.save(); x.translate(bx, by); x.scale(k, k); x.fillStyle = col; rr(x, -w / 2, -38, w, 76, 30); x.fill(); txt(x, text, 0, 2, { size: 30, color: tcol, font: INTER, weight: 600, shadow: false }); x.restore() }
    bub(sx + 210, sy + 290, 340, 'that was so nice', '#3a3456', BONE, pop01(t, T.msg, 0.3, 2))
    bub(sx + 210, sy + 390, 340, 'same bench soon? ♥', '#3a3456', BONE, pop01(t, T.msg + 0.6, 0.3, 2))
    // typing → YES
    const typed = 'YES!!'.slice(0, Math.floor(clamp(prog(t, ...T.type)) * 5))
    if (t < T.sent) { x.fillStyle = 'rgba(255,255,255,0.08)'; rr(x, sx + 30, sy + sh - 120, sw - 60, 70, 35); x.fill(); txt(x, typed + (Math.floor(t * 3) % 2 ? '|' : ''), sx + 60, sy + sh - 85, { size: 30, color: BONE, align: 'left', font: INTER, weight: 700, shadow: false }) }
    else bub(sx + sw - 150, sy + 500, 200, 'YES!!', '#ff8fb1', INK, pop01(t, T.sent, 0.3, 2.4))
    // tears landing on the screen
    for (let i = 0; i < 5; i++) { const ph = (t * 0.7 + i * 0.23) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph); x.fillStyle = '#9fe0ff'; x.beginPath(); x.ellipse(sx + 80 + ((i * 131) % (sw - 160)), sy + 260 + ((i * 197) % 420), 14 + ph * 10, 18 + ph * 12, 0, 0, 6.28); x.fill(); x.restore() }
  }
  function phone(t, which) {
    drawRoomBlurred(x, t, undefined, ROOM)
    const k = pop01(t, which === 1 ? T.phone1 : T.phone2, 0.35, 1.8)
    drawPhone(x, 540, 990, 540, 930, { rot: -0.03 + Math.sin(t * 1.3) * 0.01, pop: 0.6 + 0.4 * k }, (xx, sx, sy, sw, sh) => {
      if (which === 1) deckScreen(t, sx, sy, sw, sh); else textScreen(t, sx, sy, sw, sh)
    })
  }

  // ── the bench: selfie-cam on the bayou; the card; the time-lapse
  function bench(t) {
    const lapse = ease.inOutQuad(prog(t, T.lapse, T.photo - 0.3))
    const k = 1 - lapse
    drawSunsetSky(x, t, { k })
    // the Moon rising during the lapse
    if (lapse > 0) { const mx = lerp(140, 380, lapse), my = lerp(900, 420, lapse); x.save(); x.globalAlpha = clamp(lapse * 2); x.fillStyle = '#fff4d0'; x.beginPath(); x.arc(mx, my, 46, 0, 6.28); x.fill(); x.fillStyle = 'rgba(200,190,160,0.6)'; x.fillRect(mx - 14, my - 10, 12, 10); x.fillRect(mx + 10, my + 12, 10, 8); x.restore() }
    drawBayou(x, t, { scroll: 900, k: Math.max(0.2, k) })
    // joggers blurring past in the lapse
    if (t > T.lapse) for (let i = 0; i < 6; i++) { const ph = ((t - T.lapse) * 1.6 + i / 6) % 1; const jx = lerp(-100, 1180, ph), col = ['#ff8fb1', '#7fe0ff', GOLD, MINT, '#c9a6ff', '#ff9a4a'][i]; x.save(); x.globalAlpha = 0.55; x.fillStyle = col; x.fillRect(jx - 60, 1200, 120, 40); x.fillRect(jx - 20, 1170, 40, 30); x.restore() }
    drawBench(x, t, { lamp: lapse })
    // Capricorn slides in and sits
    const sit = ease.outCubic(prog(t, ...T.sit))
    const capMood = t < T.sit[1] ? 'happy' : t < T.flip[1] ? 'neutral' : t < T.lapse ? 'sparkle' : 'happy'
    if (t >= T.sit[0]) drawStarChar(x, lerp(1240, 760, sit), 1120, 300, t, { color: CAP.color, glyph: CAP.glyph, mood: capMood, look: [-1, 0], seed: 62, glow: 1, hops: [T.sit[1], ...CAPHOPS] })
    // Pisces, close to the selfie cam (left), crying a little the whole time
    const pm = t < T.sit[0] ? 'wide' : t < T.flip[1] ? 'squint' : t < T.lapse ? 'sparkle' : 'heart'
    const r = drawStarChar(x, 330, 1110, 340, t, { color: PIS.color, glyph: PIS.glyph, mood: pm, look: t < T.sit[0] ? [0, 0] : [1, 0], seed: 7, glow: 1, hops: HOPS })
    const cry = t < T.flip[1] ? 0.5 : 1.4
    tearFountain(x, r.x - 340 * 0.17, r.y - 340 * 0.05, 340 / 36, t, cry, -1, 1); tearFountain(x, r.x + 340 * 0.17, r.y - 340 * 0.05, 340 / 36, t, cry, 1, 2)
    // the talk card: pulled up between them, flips (a prop in their hands, not a transition)
    if (t >= T.pull) {
      const pk = pop01(t, T.pull, 0.4, 1.8), fp = ease.inOutCubic(prog(t, ...T.flip))
      const away = ease.inCubic(prog(t, T.lapse, T.lapse + 0.5))
      drawFlipCard(x, 560, lerp(780, 1400, away) + Math.sin(t * 2) * 8, 320, t, { flip: fp, pop: pk * (1 - away), q: Q, rot: Math.sin(t * 1.4) * 0.04 })
    }
    // the bubbles in the lapse
    T.bub.forEach((b, i) => {
      if (t < b || t > b + 1.4) return
      const p = prog(t, b, b + 1.4), left = i % 2 === 0
      drawWordBubble(x, left ? 330 : 760, 840 - p * 180, BUBS[i], pop01(t, b, 0.25, 2.4) * (1 - ease.inQuad(clamp((p - 0.7) / 0.3))), { col: left ? '#ffe0ec' : '#e4ffe0' })
    })
  }

  // ── the snapshot from the night
  function photo(t) {
    x.fillStyle = '#120a26'; x.fillRect(-100, -100, 1300, 2200)
    const k = pop01(t, T.snap, 0.4, 1.8)
    x.save(); x.translate(540, 980); x.rotate(-0.05); x.scale(0.7 + 0.25 * k, 0.7 + 0.25 * k)
    pix(x, -400, -470, 800, 940, INK); pix(x, -390, -460, 780, 920, '#f6efdc')
    x.save(); x.beginPath(); x.rect(-350, -420, 700, 700); x.clip()
    x.translate(-350, -420); x.scale(700 / 1080, 700 / 1080); x.translate(0, -560)
    drawSunsetSky(x, t, { k: 0 }); drawBayou(x, t, { scroll: 900, k: 0.2 }); drawBench(x, t, { lamp: 1 })
    drawStarChar(x, 380, 1120, 300, t, { color: PIS.color, mood: 'heart', look: [1, 0], seed: 7 })
    drawStarChar(x, 720, 1120, 300, t, { color: CAP.color, mood: 'happy', look: [-1, 0], seed: 62 })
    for (let i = 0; i < 14; i++) drawPixelStar(x, (i * 211) % 1080, 120 + (i * 97) % 560, 20, 1, '#fff6d8')
    x.restore()
    txt(x, 'bayou bench ♥', 0, 360, { size: 56, color: '#4a5aa8', font: SERIF, weight: 500, italic: true, shadow: false })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.8 })
      const [, seg] = segAt(t)
      const cam = vlogCam(t, { cuts: CAMCUTS, punches: [{ at: T.l7, out: T.lapse - 0.1, zoom: 1.14, x: 560, y: 820 }, { at: T.l4, out: T.bench - 0.1, zoom: 1.12, x: 540, y: 960 }] })
      x.save(); cam.apply(x)
      if (seg === 'conf') conf(t)
      else if (seg === 'phone1') phone(t, 1)
      else if (seg === 'phone2') phone(t, 2)
      else if (seg === 'bench') bench(t)
      else if (seg === 'photo') photo(t)
      x.restore()
      if (cam.flash > 0) { x.save(); x.globalAlpha = cam.flash * 0.35; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawRecFrame(x, t, { rec: t < T.pause, battery: lerp(0.9, 0.35, t / STORY_END) })
      showBug(x, t)
      title.update(t); H.update(t); box.update(t); lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// one Align card cut, into the bench (no other card transitions; the end card has none)
const CUTS = [T.bench]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0 }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ['pop', 0.02, 493.88, 0.05, 0], ['boom', 0.1, 0.12], ['tick', 0.1, 0.06],
  ...HEADS.filter(h => h.at > 0).flatMap(h => headCues(h)),
  ...vlogCutCues(CAMCUTS.filter(c => !CUTS.includes(c))),
  ...talkCues(LINES, { cps: CPS, pitch: { [PISN]: 739.99, [CAPN]: 493.88 } }),
  // the deck deals; the talk card glows
  ...T.deal.map(d => ['tick', d, 0.04]), ['bell', T.glow, 1479.98, 0.035, 1.4, 0], ['glitter', T.glow, T.glow + 0.6],
  // nerves list
  ...[0, 1, 2].map(i => ['tick', r3(T.g[i]), 0.03]), ...T.gx.map(s => ['whoosh', r3(s), 0.18, 0.03]), ['pop', T.gok, 1174.66, 0.05, 0], ['pluck', T.gok, 1479.98, 0.04, 0.5, 0],
  // the bench
  ['whoosh', T.sit[0], 0.4, 0.035], ['tom', T.sit[1], 110, { gain: 0.12, decay: 0.2 }],
  ['whoosh', T.pull, 0.3, 0.035], ['pop', T.pull + 0.2, 987.77, 0.04, 0],
  ['whoosh', T.flip[0], 0.3, 0.03], ['tick', r3((T.flip[0] + T.flip[1]) / 2), 0.05], ['bell', T.flip[1], 1479.98, 0.04, 2.0, 0], ['bell', r3(T.flip[1] + 0.1), 1975.53, 0.03, 1.8, 0.2], ['glitter', T.flip[1], T.flip[1] + 0.8],
  // the lapse
  ['riser', T.lapse, T.photo - 0.3, 0.03], ...T.bub.map((b, i) => ['pop', b, [987.77, 1174.66, 1318.51, 1479.98][i % 4], 0.03, i % 2 ? 0.4 : -0.4]),
  // the snapshot
  ['tick', T.snap, 0.08], ['whoosh', T.snap - 0.05, 0.3, 0.04], ['crash', T.snap, { gain: 0.025, len: 1.2 }],
  // the text
  ['pop', T.msg, 1318.51, 0.04, -0.2], ['pop', r3(T.msg + 0.6), 1479.98, 0.04, -0.2], ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.type[0] + i * 0.16), 0.03]), ['pop', T.sent, 1975.53, 0.05, 0.2], ['pluck', T.sent, 1479.98, 0.04, 0.5, 0.2],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['boom', T.shut, 0.08], ['tick', T.shut, 0.06], ['pop', r3(T.shut + 0.3), 1318.51, 0.05, 0.2], ['tick', T.pause, 0.05], ['pop', T.pause, 440, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void WATER; void rr
