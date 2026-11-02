// hxdiarymatch (45 s vertical, BETA DIARIES, Houston: "Matched with someone *across town*.") · story 0–40.6, end card.
//   A diary-cam: ♒ Aquarius, a beta tester in Houston, films confessionals (handheld wobble, REC frame, a DIARY tape).
//   0.0   CONF   frame 0: the DIARY tape + "Matched with someone | *across town.*"  Aquarius waves, phone in hand.
//   2.9          "diary. new match. they live *across town.*"
//   6.2   PHONE  a mystery card (Card first. Face last.), tagged ACROSS TOWN.  "i like their card. their *commute,* less."
//   10.7  CONF   the plan, rule of three: • my side? (✗) • their side? (✗) • the middle. (✓)
//   15.0  MAP    (the one card cut) ME and THEM on the map; the line draws in from both ends; HALFWAY ✦ drops: a park.
//   19.0  DRIVE  the dash cam: "phone down. eyes up. *driving* now." A neon road, the lights streak by.
//   23.0  PARK   the halfway park at dusk: Gemini is already on the bench… holding the same snacks. They laugh.
//   26.85 PHOTO  a snapshot: the two of them under the park lamp, "halfway ♥".  "okay. *worth* the drive."
//   30.4  PHONE  a text from Gemini: "next time I drive to you ♥". Aquarius: "deal ✦".
//   33.9  CONF   ★ LESSON "Fair is | *halfway.*"  WORTH THE DRIVE ✓
//   38.1         "Meet in the *middle*."  Aquarius closes the notebook; REC pauses (frame 0's pose, now heart-eyed).
//   Pisces cries outside the window in every confessional (a cross-town love story is a lot for Pisces).
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
import { GOLD, BONE, INK, MINT, INTER, SERIF, DIARY_FONTS, pop01, pix, rr, txt,
  drawRoom, drawPiscesWindow, drawDiarist, drawPhone, drawCardBack, showBug, tapeTitle, heads, headCues, drawRoomBlurred } from './diary.js'
import { drawSunsetSky, drawBayou, drawBench, drawWordBubble, drawHalfMap, drawRoadView } from './props.js'
import { drawBits } from './lab.js'

export const DURATION = 45
const KEY = 'C#'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const AQU = signStar('aquarius'), GEM = signStar('gemini')
const ROOM = { glyph: AQU.glyph, color: '#3a5ab8' }

const T = {
  title: [2.5, 2.8], l1: 2.9,
  phone1: 6.2, l2: 6.6, cardIn: 6.45, tag: 7.2,
  conf2: 10.7, g: [11.0, 11.8, 12.6], gx: [11.55, 12.35], gok: 13.2, l3: 10.9,
  map: 15.0, line: [15.3, 16.3], flag: 16.4, cars: [17.2, 18.8], l4: 15.6,
  drive: 19.0, l5: 19.3, go: 20.6, sing: [21.4, 22.8],
  park: 23.0, l6: 23.6, snack: 24.4, laugh: 25.2, heart: 26.0,
  photo: 26.85, snap: 26.9, l7: 27.1,
  phone2: 30.4, l9: 30.6, msg: 30.7, type: [31.7, 32.3], sent: 32.5, close: 33.7,
  conf3: 33.9, lesson: 33.94, lessonOut: [38.0, 38.25],
  last: 38.1, shut: 38.4, pause: 40.15, lastOut: [40.3, 40.55],
}
const SEG = [[0, 'conf'], [T.phone1, 'phone1'], [T.conf2, 'conf'], [T.map, 'map'], [T.drive, 'drive'], [T.park, 'park'], [T.photo, 'photo'], [T.phone2, 'phone2'], [T.conf3, 'conf']]
const segAt = t => { let s = SEG[0]; for (const q of SEG) if (t >= q[0]) s = q; return s }
const CAMCUTS = [T.phone1, T.conf2, T.map, T.drive, T.park, T.photo, T.phone2, T.conf3]

const AQN = '♒ AQUARIUS · DIARY', GEMN = '♊ GEMINI'
const LINES = [
  { t: T.l1, speaker: AQN, text: 'diary. new match. they live *across town.*', color: AQU.color },
  { t: T.l2, speaker: AQN, text: 'i like their card. their *commute,* less.', color: AQU.color },
  { t: T.l3, speaker: AQN, text: 'my side? their side? or… the *middle?*', color: AQU.color },
  { t: T.l4, speaker: AQN, text: 'we each drive *half.* fair is fair.', color: AQU.color },
  { t: T.l5, speaker: AQN, text: 'phone down. eyes up. *driving* now.', color: AQU.color },
  { t: T.l6, speaker: GEMN, text: 'hi! wait. you brought *snacks* too?!', color: GEM.color },
  { t: T.l7, speaker: AQN, text: 'okay. *worth* the drive.', color: AQU.color },
  { t: T.l9, speaker: AQN, text: 'next time, *they* drive to me.', color: AQU.color },
]
const CPS = 26
export const LT = lineTimes(LINES, { cps: CPS })
const HOPS = talkHops(LINES, AQN, { cps: CPS })
const GEMHOPS = talkHops(LINES, GEMN, { cps: CPS })

const HEADS = [
  { text: 'Matched with someone | *across town.*', at: -1.2, out: [2.55, 2.85], top: 410, size: 92 },
  { text: 'New | *match.*', at: 3.0, out: [5.9, 6.15], top: 262 },
  { text: 'Card first. | *Face* last.', at: 6.3, out: [10.4, 10.65], top: 262 },
  { text: 'The big | *plan.*', at: 10.8, out: [14.7, 14.95], top: 262 },
  { text: 'Meet | *halfway.*', at: 15.1, out: [18.7, 18.95], top: 262 },
  { text: 'Phone *down.* | Eyes up.', at: 19.1, out: [22.7, 22.95], top: 262, accentColor: MINT },
  { text: 'Halfway | *there.*', at: 23.1, out: [26.5, 26.8], top: 262, accentColor: GEM.color },
  { text: 'Worth | the *drive.*', at: 26.95, out: [30.1, 30.35], top: 262 },
  { text: 'They | *texted.*', at: 30.45, out: [33.6, 33.85], top: 262, accentColor: MINT },
  { text: 'Meet in the | *middle.*', at: T.last, out: T.lastOut, top: 300, size: 110, accentColor: AQU.color },
]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Fair is | *halfway.*', chip: 'WORTH THE DRIVE ✓', accentColor: AQU.color }

const NOTE = [
  { text: 'THE PLAN:', at: 10.75, color: '#2a2a6a', size: 24, gap: 44 },
  { size: 26, text: '• my side?', at: T.g[0], strike: T.gx[0] },
  { size: 26, text: '• their side?', at: T.g[1], strike: T.gx[1] },
  { size: 26, text: '• the middle.', at: T.g[2], check: T.gok, color: '#2f7a4a' },
]
const SNACK = ['..RRRR..', '.RYYYYR.', 'RYYOYYYR', 'RYYYYOYR', 'RYOYYYYR', '.RRRRRR.']

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
    const pis = t < T.phone1 ? { mood: 'sparkle', cry: 0.7 } : !late ? { mood: 'wide', cry: 1.1, look: [-1, 1] } : t < T.last ? { mood: 'sparkle', cry: 1.4 } : { mood: 'heart', cry: 1.8 }
    drawPiscesWindow(x, t, { ...pis, pop: pop01(t, 0.6, 0.4) })
    let mood = 'happy', look = [0, 0], nb = { open: 0 }, pen = false, squash = 0
    if (t < T.phone1) { mood = t < 1.6 ? 'happy' : t < T.l1 ? 'wink' : 'sparkle' }
    else if (!late) {
      mood = t < T.gok ? 'squint' : 'sparkle'; look = t < T.gok ? [1, 1] : [0, 0]
      nb = { open: 1, lines: NOTE, dx: 0, dy: 255, s: 0.92, rot: -0.04 }; pen = t < T.gok + 0.2
    } else {
      mood = t < T.last ? 'sparkle' : t < T.pause - 0.6 ? 'heart' : 'wink'
      nb = { open: 0, rot: -0.12 }
      squash = t > T.shut && t < T.shut + 0.4 ? 0.12 * Math.sin((t - T.shut) * 25) * (1 - prog(t, T.shut, T.shut + 0.4)) : 0
    }
    const hops = [0.15, 0.55, 0.95, ...HOPS, T.gok, T.last + 0.4, T.shut]
    const r = drawDiarist(x, AQU, 540, 1040, 400, t, { mood, look, hops, squash, seed: 7 }, { notebook: nb, pen })
    // frame 0: the phone held up, the match on it
    if (t < T.phone1) {
      x.save(); x.translate(r.x - 230, r.y + 40); x.rotate(-0.18 + Math.sin(t * 3) * 0.05)
      pix(x, -50, -86, 100, 172, INK); pix(x, -42, -78, 84, 156, '#1a0f3a'); drawCardBack(x, 0, 0, 52, t, { charge: 0.4 })
      txt(x, '♥', 0, -58, { size: 22, color: '#ff8fb1', font: INTER, shadow: false })
      x.restore()
    }
    if (t < 2.2) { const a = Math.sin(t * 12) * 0.5; x.save(); x.translate(330, 870); x.rotate(a); txt(x, '✦', 0, -40, { size: 54, color: GOLD, font: INTER, alpha: 1 - prog(t, 1.8, 2.2) }); x.restore() }
    if (t > T.shut + 0.3) {
      const k = pop01(t, T.shut + 0.3, 0.3, 3)
      x.save(); x.translate(540 + 0.42 * 400, 1040 + 0.3 * 400 - 60); x.rotate(-0.25); x.scale(k, k)
      pix(x, -96, -28, 192, 56, INK); pix(x, -90, -22, 180, 44, MINT); txt(x, 'MET ✓', 0, 1, { size: 28, color: INK, shadow: false })
      x.restore()
    }
  }

  // ── phone screens
  function cardScreen(t, sx, sy, sw, sh) {
    const cx = sx + sw / 2
    txt(x, 'A MYSTERY CARD', cx, sy + 120, { size: 17, color: '#9a8fc0', shadow: false, spacing: 3 })
    txt(x, 'Card first.', cx, sy + 176, { size: 46, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    txt(x, 'Face last.', cx, sy + 228, { size: 46, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    drawCardBack(x, cx, sy + sh * 0.56, sw * 0.5, t, { charge: 0.5 + 0.3 * Math.sin(t * 3), pop: pop01(t, T.cardIn, 0.4, 2) })
    if (t > T.tag) {
      const k = pop01(t, T.tag, 0.3, 2.6)
      x.save(); x.translate(cx + 120, sy + sh * 0.56 - 190); x.rotate(0.12); x.scale(k, k)
      x.fillStyle = INK; rr(x, -134, -30, 268, 60, 14); x.fill(); x.fillStyle = '#ff8a3a'; rr(x, -128, -24, 256, 48, 12); x.fill(); txt(x, 'ACROSS TOWN', 0, 2, { size: 24, color: INK, shadow: false })
      x.restore()
    }
    txt(x, 'TAP TO SAY HI', cx, sy + sh - 70, { size: 16, color: '#9a8fc0', shadow: false, spacing: 4, alpha: 0.5 + 0.5 * Math.sin(t * 5) })
  }
  function textScreen(t, sx, sy, sw, sh) {
    const cx = sx + sw / 2
    txt(x, '♊ Gemini', cx, sy + 110, { size: 30, color: BONE, font: INTER, weight: 800, shadow: false })
    const bub = (bx, by, w, text, col, tcol, k) => { if (k <= 0) return; x.save(); x.translate(bx, by); x.scale(k, k); x.fillStyle = col; rr(x, -w / 2, -38, w, 76, 30); x.fill(); txt(x, text, 0, 2, { size: 28, color: tcol, font: INTER, weight: 600, shadow: false }); x.restore() }
    bub(sx + 220, sy + 270, 360, 'best halfway ever', '#3a3456', BONE, pop01(t, T.msg, 0.3, 2))
    bub(sx + 230, sy + 370, 380, 'next time I drive to you ♥', '#3a3456', BONE, pop01(t, T.msg + 0.6, 0.3, 2))
    const typed = 'deal ✦'.slice(0, Math.floor(clamp(prog(t, ...T.type)) * 6))
    if (t < T.sent) { x.fillStyle = 'rgba(255,255,255,0.08)'; rr(x, sx + 30, sy + sh - 120, sw - 60, 70, 35); x.fill(); txt(x, typed + (Math.floor(t * 3) % 2 ? '|' : ''), sx + 60, sy + sh - 85, { size: 30, color: BONE, align: 'left', font: INTER, weight: 700, shadow: false }) }
    else bub(sx + sw - 150, sy + 480, 200, 'deal ✦', AQU.color, INK, pop01(t, T.sent, 0.3, 2.4))
  }
  function phone(t, which) {
    drawRoomBlurred(x, t, undefined, ROOM)
    const k = pop01(t, which === 1 ? T.phone1 : T.phone2, 0.35, 1.8)
    drawPhone(x, 540, 990, 540, 930, { rot: -0.03 + Math.sin(t * 1.3) * 0.01, pop: 0.6 + 0.4 * k }, (xx, sx, sy, sw, sh) => {
      if (which === 1) cardScreen(t, sx, sy, sw, sh); else textScreen(t, sx, sy, sw, sh)
    })
  }

  // ── the map: the line draws in from both ends, the flag drops, two cars drive half each
  function map(t) {
    const M = drawHalfMap(x, t, { line: ease.inOutCubic(prog(t, ...T.line)), flag: pop01(t, T.flag, 0.4, 2), cars: prog(t, ...T.cars) })
    if (t > T.cars[1]) { const k = pop01(t, T.cars[1], 0.3, 2.6); x.save(); x.translate(M[0], M[1] - 260); x.scale(k, k); txt(x, '♥', 0, 0, { size: 70, color: '#ff4f86', font: INTER }); x.restore() }
    // Aquarius in the corner, pointing at the map
    drawStarChar(x, 880, 1330, 210, t, { color: AQU.color, glyph: AQU.glyph, mood: t < T.flag ? 'squint' : 'sparkle', look: [-1, -1], seed: 7, hops: HOPS })
  }

  // ── the drive: the dash cam (phone mounted, nobody touching it)
  function drive(t) {
    const sp = clamp((t - T.go) * 0.8)
    drawRoadView(x, t, { speed: sp })
    // Aquarius in the driver's seat, from the dash (only the top shows), eyes on the road
    const sing = t > T.sing[0] && t < T.sing[1]
    drawStarChar(x, 300, 1260, 300, t, { color: AQU.color, glyph: AQU.glyph, mood: sing ? 'happy' : 'neutral', look: [1, -1], seed: 7, glow: 0.6, bob: 4, hops: sing ? [21.5, 21.9, 22.3] : HOPS })
    if (sing) for (let i = 0; i < 3; i++) { const ph = ((t - T.sing[0]) * 0.9 + i / 3) % 1; txt(x, '♪', 440 + ph * 120, 1100 - ph * 220, { size: 50, color: MINT, font: INTER, alpha: Math.sin(Math.PI * ph) }) }
    // the mounted phone: DRIVING — BACK SOON
    x.save(); x.translate(820, 1230); pix(x, -80, -130, 160, 260, INK); pix(x, -70, -120, 140, 240, '#1a0f3a')
    txt(x, 'DRIVING', 0, -40, { size: 24, color: MINT, shadow: false }); txt(x, 'back soon', 0, 0, { size: 24, color: '#cfc6e8', font: INTER, weight: 600, shadow: false }); txt(x, '✦', 0, 50, { size: 34, color: GOLD, font: INTER, shadow: false })
    pix(x, -20, 130, 40, 40, INK); x.restore()
    // a little air freshener star swinging from the mirror
    x.save(); x.translate(540, 120); x.rotate(Math.sin(t * 2.4) * 0.3); pix(x, -2, 0, 4, 140, '#cfc6e8'); drawPixelStar(x, 0, 170, 46, 2, GOLD); x.restore()
  }

  // ── the halfway park at dusk
  function park(t) {
    drawSunsetSky(x, t, { k: 0.4 })
    drawBayou(x, t, { scroll: 1400, k: 0.35 })
    drawBench(x, t, { lamp: 0.8 })
    const arrive = ease.outCubic(prog(t, T.park, T.park + 0.6))
    const laugh = t > T.laugh && t < T.laugh + 1.2
    drawStarChar(x, 740, 1110, 300, t, { color: GEM.color, glyph: GEM.glyph, mood: t < T.snack ? 'happy' : laugh ? 'happy' : 'wide', look: [-1, 0], seed: 62, glow: 1, hops: [...GEMHOPS, T.laugh, T.laugh + 0.35], squash: laugh ? 0.05 * Math.sin(t * 30) : 0 })
    const r = drawStarChar(x, lerp(-200, 330, arrive), 1110, 320, t, { color: AQU.color, glyph: AQU.glyph, mood: t < T.snack ? 'sparkle' : laugh ? 'happy' : t < T.heart ? 'wide' : 'heart', look: [1, 0], seed: 7, glow: 1, hops: [...HOPS, T.laugh + 0.1, T.laugh + 0.45], squash: laugh ? 0.05 * Math.sin(t * 30 + 1) : 0 })
    // the same snacks, held up at the same time
    if (t > T.snack) {
      const k = pop01(t, T.snack, 0.3, 2.4)
      drawBits(x, SNACK, { R: '#ff5a6e', Y: '#ffd27a', O: '#c9773e' }, r.x + 150, 1000 - 20 * k, 9 * k, { rot: -0.2 })
      drawBits(x, SNACK, { R: '#ff5a6e', Y: '#ffd27a', O: '#c9773e' }, 590, 1000 - 20 * k, 9 * k, { rot: 0.2 })
    }
    if (laugh) { drawWordBubble(x, 330, 760, 'ha!', pop01(t, T.laugh, 0.25, 2.4)); drawWordBubble(x, 760, 740, 'haha!', pop01(t, T.laugh + 0.2, 0.25, 2.4)) }
    if (t > T.heart) { const k = pop01(t, T.heart, 0.35, 2.4); x.save(); x.translate(545, 780 - 8 * Math.sin(t * 3)); x.scale(k, k); txt(x, '♥', 0, 0, { size: 90, color: '#ff4f86', font: INTER }); x.restore() }
  }

  // ── the snapshot
  function photo(t) {
    x.fillStyle = '#120a26'; x.fillRect(-100, -100, 1300, 2200)
    const k = pop01(t, T.snap, 0.4, 1.8)
    x.save(); x.translate(540, 980); x.rotate(0.05); x.scale(0.7 + 0.25 * k, 0.7 + 0.25 * k)
    pix(x, -400, -470, 800, 940, INK); pix(x, -390, -460, 780, 920, '#f6efdc')
    x.save(); x.beginPath(); x.rect(-350, -420, 700, 700); x.clip()
    x.translate(-350, -420); x.scale(700 / 1080, 700 / 1080); x.translate(0, -560)
    drawSunsetSky(x, t, { k: 0.05 }); drawBayou(x, t, { scroll: 1400, k: 0.2 }); drawBench(x, t, { lamp: 1 })
    drawStarChar(x, 380, 1120, 300, t, { color: AQU.color, mood: 'heart', look: [1, 0], seed: 7 })
    drawStarChar(x, 720, 1120, 300, t, { color: GEM.color, mood: 'happy', look: [-1, 0], seed: 62 })
    x.restore()
    txt(x, 'halfway ♥', 0, 360, { size: 60, color: '#4a5aa8', font: SERIF, weight: 500, italic: true, shadow: false })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.8 })
      const [, seg] = segAt(t)
      const cam = vlogCam(t, { cuts: CAMCUTS, punches: [{ at: T.flag, out: T.drive - 0.1, zoom: 1.12, x: 540, y: 960 }, { at: T.laugh, out: T.photo - 0.1, zoom: 1.14, x: 540, y: 1000 }] })
      x.save(); cam.apply(x)
      if (seg === 'conf') conf(t)
      else if (seg === 'phone1') phone(t, 1)
      else if (seg === 'phone2') phone(t, 2)
      else if (seg === 'map') map(t)
      else if (seg === 'drive') drive(t)
      else if (seg === 'park') park(t)
      else if (seg === 'photo') photo(t)
      x.restore()
      if (cam.flash > 0) { x.save(); x.globalAlpha = cam.flash * 0.35; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawRecFrame(x, t, { rec: t < T.pause, battery: lerp(0.9, 0.4, t / STORY_END) })
      showBug(x, t)
      title.update(t); H.update(t); box.update(t); lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// one Align card cut, onto the map (no other card transitions; the end card has none)
const CUTS = [T.map]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br', fadeIn: 0 }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ['pop', 0.02, 554.37, 0.05, 0], ['boom', 0.1, 0.12], ['tick', 0.1, 0.06],
  ...HEADS.filter(h => h.at > 0).flatMap(h => headCues(h)),
  ...vlogCutCues(CAMCUTS.filter(c => !CUTS.includes(c))),
  ...talkCues(LINES, { cps: CPS, pitch: { [AQN]: 830.61, [GEMN]: 1108.73 } }),
  // the mystery card + tag
  ['whoosh', T.cardIn, 0.4, 0.04], ['glitter', T.cardIn, T.cardIn + 0.6], ['pop', T.tag, 392, 0.045, 0.3], ['tick', T.tag, 0.06],
  // the plan
  ...[0, 1, 2].map(i => ['tick', r3(T.g[i]), 0.03]), ...T.gx.map(s => ['whoosh', r3(s), 0.18, 0.03]), ['pop', T.gok, 1108.73, 0.05, 0], ['pluck', T.gok, 1661.22, 0.04, 0.5, 0],
  // the map
  ['riser', T.line[0], T.line[1], 0.03], ['whoosh', T.flag - 0.2, 0.25, 0.04], ['tom', T.flag + 0.3, 90, { gain: 0.14, decay: 0.25 }], ['bell', T.flag + 0.35, 1661.22, 0.04, 1.4, 0],
  ['whoosh', T.cars[0], 1.4, 0.025], ['pop', T.cars[1], 1108.73, 0.045, -0.3], ['pop', r3(T.cars[1] + 0.06), 1108.73, 0.045, 0.3], ['glitter', T.cars[1], T.cars[1] + 0.6],
  // the drive
  ['tom', T.go, 60, { gain: 0.1, decay: 0.6 }], ['swell', T.go, T.park - 0.2, { gain: 0.025 }],
  ...[0, 1, 2].map(i => ['pluck', r3(21.5 + i * 0.4), [1108.73, 1244.51, 1661.22][i], 0.03, 0.5, -0.3]),
  // the park
  ['pop', T.snack, 1318.51, 0.04, -0.3], ['pop', r3(T.snack + 0.04), 1318.51, 0.04, 0.3], ['tick', T.snack, 0.06],
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(T.laugh + i * 0.13), [1108.73, 1244.51, 1396.91, 1244.51, 1661.22][i], 0.03, i % 2 ? 0.4 : -0.4]),
  ['bell', T.heart, 1661.22, 0.035, 1.4, 0],
  // the snapshot
  ['tick', T.snap, 0.08], ['whoosh', T.snap - 0.05, 0.3, 0.04], ['crash', T.snap, { gain: 0.025, len: 1.2 }],
  // the text
  ['pop', T.msg, 1318.51, 0.04, -0.2], ['pop', r3(T.msg + 0.6), 1479.98, 0.04, -0.2], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.type[0] + i * 0.1), 0.03]), ['pop', T.sent, 1661.22, 0.05, 0.2], ['pluck', T.sent, 1244.51, 0.04, 0.5, 0.2],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['boom', T.shut, 0.08], ['tick', T.shut, 0.06], ['pop', r3(T.shut + 0.3), 1318.51, 0.05, 0.2], ['tick', T.pause, 0.05], ['pop', T.pause, 440, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void rr
