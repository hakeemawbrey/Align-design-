// sxdiary1 (45 s vertical, Star Talk Shows · BETA DIARIES ep 1: "Day 1: What's my birth time?") · story 0–40.6, end card.
//   A diary-cam: a fictional ♉ Taurus films confessionals in Align's beta (handheld wobble, REC frame, "DAY 1" tape).
//   0.0   CONF   frame 0: "DAY 1" tape + "What's my *birth time?*"  Taurus waves at the camera, notebook shut.
//   2.9          "diary. day one of the beta. I'm thrilled."
//   6.2   PHONE  onboarding step 2 (real copy: "Where the sky was standing.", "I don't know the minute", "Cast my sky")
//                — the time wheel reads ? ? : ? ?  "my birth TIME? I know my birth day."
//   10.7  CONF   notebook guesses, rule of three: morning? (✗) lunch?? (✗) …ask mom. (✓)  "I was a baby. no watch."
//   15.0  CALL   video call to Mom (a silhouette), Taurus in the corner PiP. Mom rummages: first tooth (no) · macaroni
//                art (no) · THE BABY BOOK (a choir of light).
//   26.85 BOOK   the baby-book page: "ARRIVED 5:42 AM" circled, "already stubborn ♥".  "I've never SEEN 5:42 AM."
//   30.4  PHONE  the wheel rolls to 5:42 AM, "Cast my sky", then "One card has your name.": the face-down card charges.
//   33.9  CONF   ★ LESSON "Know where you *came from.* | Literally."  +1 CALLED MOM
//   38.1         "Day one: *done.*"  Taurus closes the notebook, REC pauses.
//   Pisces cries outside the window in every confessional (day one is very emotional for Pisces).
// One canvas (sky + room + cast + phone), DOM type + box + lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { drawRecFrame, vlogCam, vlogCutCues } from '../../st9day.js'
import { TAU, GOLD, BONE, INK, PINK, MINT, INTER, MONO, SERIF, DIARY_FONTS, pop01, popOut, pix, rr, txt,
  drawRoom, drawPiscesWindow, drawTaurus, drawPhone, drawCardBack, showBug, dayTitle, heads, headCues } from './diary.js'

export const DURATION = 45
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6

const T = {
  title: [2.5, 2.8], l1: 2.9,
  phone1: 6.2, l2: 6.6,
  conf2: 10.7, g: [11.0, 11.8, 12.6], gx: [11.55, 12.35], gok: 13.2, l3: 10.9, l4: 13.6,
  call: 15.0, ring: [15.1, 15.6, 16.1], pick: 16.35, l5: 16.6, rum: 18.6,
  i1: 19.6, i2: 22.0, i3: 24.4, l6: 19.6, l7: 22.0, l8: 24.4,
  book: 26.85, l9: 27.3, circ: 27.6,
  phone2: 30.4, l10: 30.6, wheel: [30.7, 31.5], tap: 31.7, cardIn: 32.05, charge: [32.3, 33.6], close: 33.7,
  conf3: 33.9, lesson: 33.94, lessonOut: [38.0, 38.25],
  last: 38.1, shut: 38.4, pause: 40.15, lastOut: [40.3, 40.55],
}
const SEG = [[0, 'conf'], [T.phone1, 'phone1'], [T.conf2, 'conf'], [T.call, 'call'], [T.book, 'book'], [T.phone2, 'phone2'], [T.conf3, 'conf']]
const segAt = t => { let s = SEG[0]; for (const q of SEG) if (t >= q[0]) s = q; return s }
const CAMCUTS = [T.phone1, T.conf2, T.call, T.book, T.phone2, T.conf3]

const TAUN = '♉ TAURUS · DIARY', MOMN = 'MOM · ON SPEAKER'
const MOMC = '#ffb3c8'
const LINES = [
  { t: T.l1, speaker: TAUN, text: "diary. day one of the beta. I'm *thrilled*.", color: TAU.color },
  { t: T.l2, speaker: TAUN, text: 'my birth TIME? I know my birth *day*.', color: TAU.color },
  { t: T.l3, speaker: TAUN, text: 'I was a baby. no *watch*.', color: TAU.color },
  { t: T.l4, speaker: TAUN, text: 'calling the only *witness*.', color: TAU.color },
  { t: T.l5, speaker: MOMN, text: 'hi baby! birth time? hold on…', color: MOMC },
  { t: T.l6, speaker: MOMN, text: 'your first tooth! no…', color: MOMC },
  { t: T.l7, speaker: MOMN, text: 'your macaroni art! no…', color: MOMC },
  { t: T.l8, speaker: MOMN, text: 'THE BABY *BOOK*.', color: MOMC },
  { t: T.l9, speaker: TAUN, text: "5:42 AM?! I've never SEEN 5:42 AM.", color: TAU.color },
  { t: T.l10, speaker: TAUN, text: "typing it in… the card's *charging*!", color: TAU.color },
]
const CPS = 26
export const LT = lineTimes(LINES, { cps: CPS })
const HOPS = talkHops(LINES, TAUN, { cps: CPS })
const MOMHOPS = talkHops(LINES, MOMN, { cps: CPS })

const HEADS = [
  { text: "What's my | *birth time?*", at: -1.2, out: [2.55, 2.85], top: 410, size: 100 },
  { text: 'Day one: | *onboarding.*', at: 3.0, out: [5.9, 6.15], top: 262 },
  { text: 'It wants my | *birth time.*', at: 6.3, out: [10.4, 10.65], top: 262 },
  { text: 'Educated | *guesses.*', at: 10.8, out: [14.7, 14.95], top: 262 },
  { text: 'Calling the | *witness.*', at: 15.1, out: [19.25, 19.5], top: 262, accentColor: MOMC },
  { text: 'Mom is | *digging.*', at: 19.6, out: [26.5, 26.8], top: 262, accentColor: MOMC },
  { text: 'Found: | *5:42 AM.*', at: 26.95, out: [30.1, 30.35], top: 262 },
  { text: 'One card has | your *name.*', at: 30.45, out: [33.6, 33.85], top: 262, accentColor: MINT },
  { text: 'Day one: | *done.*', at: T.last, out: T.lastOut, top: 300, size: 110, accentColor: TAU.color },
]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Know where you | *came from.* | Literally.', chip: '+1 CALLED MOM', accentColor: TAU.color }

const NOTE = [
  { text: 'BIRTH TIME??', at: 10.75, color: '#2a2a6a', size: 24, gap: 44 },
  { size: 26, text: '1. morning?', at: T.g[0], strike: T.gx[0] },
  { size: 26, text: '2. lunch??', at: T.g[1], strike: T.gx[1] },
  { size: 26, text: '3. ask mom.', at: T.g[2], check: T.gok, color: '#2f7a4a' },
]

async function build(stage) {
  try { await Promise.all(DIARY_FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const backIm = await loadImg('card-back.png')
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const title = dayTitle(root, { day: 1, at: 0, out: T.title, top: 236 })
  const H = heads(root, HEADS)
  const box = dialogueBox(root, { lines: LINES, y: 1478, width: 960, height: 250, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── the confessional
  function conf(t) {
    drawRoom(x, t)
    const late = t >= T.conf3
    const pis = t < T.phone1 ? { mood: 'sparkle', cry: 0.7 } : !late ? { mood: 'wide', cry: 1.1, look: [-1, 1] } : t < T.last ? { mood: 'sparkle', cry: 1.4 } : { mood: 'heart', cry: 1.8 }
    drawPiscesWindow(x, t, { ...pis, pop: pop01(t, 0.6, 0.4) })
    let mood = 'happy', look = [0, 0], nb = { open: 0 }, pen = false, squash = 0
    if (t < T.phone1) { mood = t < 1.6 ? 'happy' : t < T.l1 ? 'wink' : 'sparkle' }
    else if (!late) {
      mood = t < T.gok ? 'squint' : t < T.l4 ? 'neutral' : 'wide'; look = t < T.gok ? [1, 1] : [0, 0]
      nb = { open: 1, lines: NOTE, dx: 0, dy: 255, s: 0.92, rot: -0.04 }; pen = t < T.gok + 0.2
    } else {
      mood = t < T.shut ? 'sparkle' : t < T.pause - 0.6 ? 'happy' : 'wink'
      nb = { open: 0, rot: -0.12 }
      squash = t > T.shut && t < T.shut + 0.4 ? 0.12 * Math.sin((t - T.shut) * 25) * (1 - prog(t, T.shut, T.shut + 0.4)) : 0
    }
    const hops = [0.15, 0.55, 0.95, ...HOPS, T.gok, T.last + 0.4, T.shut]
    drawTaurus(x, 540, 1040, 400, t, { mood, look, hops, squash }, { notebook: nb, pen })
    // the wave (a little pixel hand-point wiggle) at the open
    if (t < 2.2) { const a = Math.sin(t * 12) * 0.5; x.save(); x.translate(330, 870); x.rotate(a); txt(x, '✦', 0, -40, { size: 54, color: GOLD, font: INTER, alpha: 1 - prog(t, 1.8, 2.2) }); x.restore() }
    // the shut: a "DONE" sticker slaps on the notebook
    if (t > T.shut + 0.3) {
      const k = pop01(t, T.shut + 0.3, 0.3, 3)
      x.save(); x.translate(540 + 0.42 * 400, 1040 + 0.3 * 400 - 60); x.rotate(-0.25); x.scale(k, k)
      pix(x, -86, -28, 172, 56, INK); pix(x, -80, -22, 160, 44, MINT); txt(x, 'DONE ✓', 0, 1, { size: 28, color: INK, shadow: false })
      x.restore()
    }
  }

  // ── phone screens
  function step2(t, sx, sy, sw, sh, { roll = 0, tap = -1, q = true } = {}) {
    const cx = sx + sw / 2
    txt(x, '9:41', sx + 44, sy + 40, { size: 22, align: 'left', shadow: false, font: INTER, weight: 700 })
    txt(x, 'STEP 2 · TIME AND PLACE', cx, sy + 120, { size: 17, color: '#9a8fc0', shadow: false, spacing: 3 })
    txt(x, 'Where the sky', cx, sy + 172, { size: 46, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    txt(x, 'was standing.', cx, sy + 220, { size: 46, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    // the time wheel
    const wy = sy + 290, wh = 250
    x.fillStyle = 'rgba(255,255,255,0.06)'; rr(x, sx + 30, wy, sw - 60, wh, 22); x.fill()
    x.fillStyle = 'rgba(160,140,255,0.22)'; rr(x, sx + 44, wy + wh / 2 - 34, sw - 88, 68, 14); x.fill()
    const cols = [[cx - 120, ['3', '4', '5', '6', '7'], 2], [cx, ['40', '41', '42', '43', '44'], 2], [cx + 120, ['AM', 'PM'], 0]]
    for (const [ccx, vals, sel] of cols) {
      if (roll <= 0) {
        txt(x, '–', ccx, wy + wh / 2 - 80, { size: 30, color: '#6a6090', shadow: false })
        const qa = q ? 0.6 + 0.4 * Math.sin(t * 6) : 1
        txt(x, '?', ccx, wy + wh / 2, { size: 52, color: q ? PINK : BONE, alpha: qa, shadow: false })
        txt(x, '–', ccx, wy + wh / 2 + 80, { size: 30, color: '#6a6090', shadow: false })
        continue
      }
      const spin = (1 - ease.outCubic(roll)) * 6
      for (let k = -2; k <= 2; k++) {
        const i = sel + k
        const v = vals[((Math.round(i + spin) % vals.length) + vals.length) % vals.length]
        const yy = wy + wh / 2 + k * 64 + ((spin % 1) * 64)
        if (yy < wy + 20 || yy > wy + wh - 16) continue
        txt(x, v, ccx, yy, { size: k === 0 ? 50 : 30, color: k === 0 ? BONE : '#6a6090', shadow: false, font: INTER, weight: 700 })
      }
    }
    // born in
    const by = wy + wh + 30
    x.fillStyle = 'rgba(255,255,255,0.06)'; rr(x, sx + 30, by, sw - 60, 66, 18); x.fill()
    txt(x, 'BORN IN', sx + 56, by + 33, { size: 15, color: '#9a8fc0', align: 'left', shadow: false, spacing: 3 })
    txt(x, 'Houston, Texas', sx + sw - 56, by + 33, { size: 26, color: BONE, align: 'right', shadow: false, font: INTER, weight: 600 })
    txt(x, 'I don’t know the minute', cx, by + 114, { size: 23, color: '#cfc6e8', shadow: false, font: INTER, weight: 600 })
    pix(x, cx - 132, by + 130, 264, 2, '#cfc6e8')
    // the button
    const bk = tap >= 0 && t >= tap ? 1 - 0.08 * Math.sin(Math.PI * clamp((t - tap) / 0.25)) : 1
    x.save(); x.translate(cx, sy + sh - 150); x.scale(bk, bk)
    x.fillStyle = '#f3ecff'; rr(x, -(sw - 90) / 2, -38, sw - 90, 76, 38); x.fill()
    txt(x, 'Cast my sky ✦', 0, 2, { size: 32, color: INK, font: SERIF, weight: 500, italic: true, shadow: false })
    x.restore()
    if (tap >= 0 && t >= tap && t < tap + 0.5) { x.save(); x.globalAlpha = 1 - (t - tap) / 0.5; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.arc(cx + 60, sy + sh - 150, 20 + (t - tap) * 120, 0, Math.PI * 2); x.stroke(); x.restore() }
  }
  function nameCard(t, sx, sy, sw, sh) {
    const cx = sx + sw / 2
    txt(x, 'YOUR FIRST PULL', cx, sy + 120, { size: 17, color: '#9a8fc0', shadow: false, spacing: 3 })
    txt(x, 'One card has your name.', cx, sy + 172, { size: 40, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    const ch = ease.inOutCubic(prog(t, ...T.charge))
    drawCardBack(x, cx, sy + sh * 0.56, sw * 0.62, t, { img: backIm, charge: 0.25 + 0.75 * ch, pop: pop01(t, T.cardIn, 0.4, 2) })
    txt(x, 'TAP TO REVEAL', cx, sy + sh - 70, { size: 16, color: '#9a8fc0', shadow: false, spacing: 4, alpha: 0.5 + 0.5 * Math.sin(t * 5) })
  }
  function phone(t, which) {
    // the room, out of focus behind
    x.save(); x.filter = 'blur(10px) brightness(0.45)'; drawRoom(x, t); x.restore()
    const k = pop01(t, which === 1 ? T.phone1 : T.phone2, 0.35, 1.8)
    drawPhone(x, 540, 990, 540, 930, { rot: -0.03 + Math.sin(t * 1.3) * 0.01, pop: 0.6 + 0.4 * k }, (xx, sx, sy, sw, sh) => {
      if (which === 1) step2(t, sx, sy, sw, sh, { q: true })
      else {
        const sw2 = prog(t, T.cardIn - 0.2, T.cardIn + 0.1)
        if (sw2 < 1) { x.save(); x.globalAlpha = 1 - sw2; step2(t, sx, sy, sw, sh, { roll: prog(t, ...T.wheel), tap: T.tap, q: false }); x.restore() }
        if (sw2 > 0) { x.save(); x.globalAlpha = sw2; nameCard(t, sx, sy, sw, sh); x.restore() }
      }
    })
    // the thumb (a little pixel star-point) tapping
    if (which === 2 && t > T.tap - 0.5 && t < T.cardIn) {
      const p = prog(t, T.tap - 0.5, T.tap)
      x.save(); x.translate(lerp(820, 640, ease.outCubic(p)), lerp(1700, 1340, ease.outCubic(p))); x.rotate(-0.4)
      x.fillStyle = TAU.color; x.beginPath(); x.moveTo(0, -60); x.lineTo(40, 80); x.lineTo(-40, 80); x.closePath(); x.fill(); x.restore()
    }
  }

  // ── the video call with Mom
  function tooth(cx, cy, s) { pix(x, cx - 16 * s, cy - 18 * s, 32 * s, 24 * s, '#fffaf0'); pix(x, cx - 16 * s, cy + 6 * s, 12 * s, 14 * s, '#fffaf0'); pix(x, cx + 4 * s, cy + 6 * s, 12 * s, 14 * s, '#fffaf0'); pix(x, cx - 10 * s, cy - 12 * s, 6 * s, 6 * s, '#ffffff') }
  function macaroni(cx, cy, s) {
    pix(x, cx - 60 * s, cy - 46 * s, 120 * s, 92 * s, '#a8744a'); pix(x, cx - 50 * s, cy - 36 * s, 100 * s, 72 * s, '#fff4dc')
    const R = rng(5); for (let i = 0; i < 14; i++) { const a = R() * 6.28, r = 26 * s * (0.5 + R() * 0.5); x.save(); x.translate(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.8); x.rotate(a); pix(x, -7 * s, -3 * s, 14 * s, 7 * s, '#f2b632'); x.restore() }
    txt(x, '♥', cx, cy, { size: 34 * s, color: '#e0344a', font: INTER, shadow: false })
  }
  function babyBook(cx, cy, s, t) {
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, 10, cx, cy, 170 * s); g.addColorStop(0, 'rgba(255,240,180,0.6)'); g.addColorStop(1, 'rgba(255,240,180,0)'); x.fillStyle = g; x.fillRect(cx - 200 * s, cy - 200 * s, 400 * s, 400 * s); x.restore()
    for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28 + t * 0.8; pix(x, cx + Math.cos(a) * 110 * s - 4, cy + Math.sin(a) * 110 * s - 12, 8, 24, 'rgba(255,240,180,0.7)') }
    pix(x, cx - 54 * s, cy - 68 * s, 108 * s, 136 * s, INK); pix(x, cx - 48 * s, cy - 62 * s, 96 * s, 124 * s, '#9fd0ff'); pix(x, cx - 48 * s, cy - 62 * s, 12 * s, 124 * s, '#7ab0e8')
    txt(x, 'BABY', cx + 6 * s, cy - 20 * s, { size: 20 * s, color: INK, shadow: false }); txt(x, 'BOOK', cx + 6 * s, cy + 6 * s, { size: 20 * s, color: INK, shadow: false })
    txt(x, '♥', cx + 6 * s, cy + 38 * s, { size: 22 * s, color: '#e0344a', font: INTER, shadow: false })
  }
  function call(t) {
    x.save(); x.filter = 'blur(10px) brightness(0.45)'; drawRoom(x, t); x.restore()
    const k = pop01(t, T.call, 0.35, 1.8)
    const picked = t >= T.pick
    drawPhone(x, 540, 990, 560, 930, { rot: 0.02 + Math.sin(t * 1.1) * 0.012, pop: 0.6 + 0.4 * k }, (xx, sx, sy, sw, sh) => {
      const cx = sx + sw / 2
      if (!picked) {
        txt(x, 'calling…', cx, sy + 150, { size: 28, color: '#cfc6e8', shadow: false, font: INTER, weight: 600 })
        txt(x, 'MOM ♥', cx, sy + 210, { size: 56, color: BONE, shadow: false, font: INTER, weight: 800 })
        // the silhouette avatar, pulsing rings
        for (let i = 0; i < 3; i++) { const p = ((t - T.call) * 0.9 + i / 3) % 1; x.save(); x.globalAlpha = 1 - p; x.strokeStyle = MOMC; x.lineWidth = 4; x.beginPath(); x.arc(cx, sy + 480, 120 + p * 120, 0, 6.28); x.stroke(); x.restore() }
        x.fillStyle = '#2a1f3a'; x.beginPath(); x.arc(cx, sy + 480, 120, 0, 6.28); x.fill()
        drawStarChar(x, cx, sy + 490, 170, t, { color: '#3a2c4c', mood: 'neutral', look: [0, 0], glow: 0, blink: 1, tips: false, seed: 40 })
        return
      }
      // the call: Mom's warm kitchen, Mom in silhouette (backlit), the items
      const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#5a3a2a'); g.addColorStop(1, '#2a1a20'); x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
      x.save(); x.globalCompositeOperation = 'lighter'; const wg = x.createRadialGradient(cx, sy + 360, 20, cx, sy + 360, 360); wg.addColorStop(0, 'rgba(255,200,130,0.55)'); wg.addColorStop(1, 'rgba(255,200,130,0)'); x.fillStyle = wg; x.fillRect(sx, sy, sw, sh); x.restore()
      pix(x, cx - 130, sy + 200, 260, 260, '#ffd9a0'); pix(x, cx - 4, sy + 200, 8, 260, '#5a3a2a'); pix(x, cx - 130, sy + 326, 260, 8, '#5a3a2a')   // the bright window behind her
      // rummaging boxes flying up behind
      if (t >= T.rum && t < T.i3 + 0.3) {
        for (let i = 0; i < 6; i++) {
          const ph = ((t - T.rum) * 1.4 + i / 6) % 1, side = i % 2 ? 1 : -1
          const bxp = cx + side * (60 + ph * 170), byp = sy + 620 - Math.sin(ph * Math.PI) * 300
          x.save(); x.translate(bxp, byp); x.rotate(ph * 6 * side); pix(x, -26, -20, 52, 40, '#c8955a'); pix(x, -26, -4, 52, 6, '#8a5a2a'); x.restore()
        }
        txt(x, '*rummage*', cx + Math.sin(t * 9) * 8, sy + 150, { size: 30, color: '#ffe0b0', font: SERIF, weight: 500, italic: true })
      }
      // Mom: a backlit silhouette star (glasses glint), bopping as she talks
      const mm = t >= T.i3 ? 'sparkle' : t >= T.i1 ? 'squint' : 'happy'
      const mr = drawStarChar(x, cx, sy + 660, 330, t, { color: '#3a2c4c', mood: mm, look: [0, 1], glow: 0.15, hops: [T.pick + 0.1, ...MOMHOPS], seed: 41, blush: 0 })
      x.save(); x.globalAlpha = 0.85; x.strokeStyle = '#ffe0b0'; x.lineWidth = 5; const gy = mr.y - 36
      x.strokeRect(cx - 74, gy - 20, 58, 40); x.strokeRect(cx + 16, gy - 20, 58, 40); x.beginPath(); x.moveTo(cx - 16, gy); x.lineTo(cx + 16, gy); x.stroke()
      pix(x, cx - 66, gy - 14, 10, 6, '#ffffff'); x.restore()
      // the items, held up one by one; the no's get tossed
      const item = (at, until, draw, keep = false) => {
        if (t < at) return
        const pk = pop01(t, at, 0.35, 2.4)
        let ix = cx - 140, iy = sy + 560, rot = 0
        if (!keep && t > until) { const p = prog(t, until, until + 0.5); if (p >= 1) return; ix += p * 360; iy -= Math.sin(p * Math.PI) * 220 - p * 200; rot = p * 8 }
        x.save(); x.translate(ix, iy); x.rotate(rot); x.scale(pk, pk); draw(); x.restore()
      }
      item(T.i1, T.i2 - 0.3, () => tooth(0, 0, 3.2))
      item(T.i2, T.i3 - 0.3, () => macaroni(0, 0, 1.4))
      item(T.i3, 99, () => babyBook(0, 0, 1.5, t), true)
      txt(x, 'MOM ♥', sx + 40, sy + 70, { size: 26, color: BONE, align: 'left', font: INTER, weight: 800 })
      txt(x, `00:${String(Math.floor(t - T.pick)).padStart(2, '0')}`, sx + sw - 40, sy + 70, { size: 22, color: MINT, align: 'right' })
      // Taurus in the corner PiP
      const px0 = sx + sw - 180, py0 = sy + sh - 290
      x.fillStyle = INK; rr(x, px0 - 6, py0 - 6, 162, 222, 22); x.fill()
      x.save(); rr(x, px0, py0, 150, 210, 18); x.clip(); x.fillStyle = '#4a2f5c'; x.fillRect(px0, py0, 150, 210)
      const tm = t >= T.i3 ? 'heart' : t >= T.i2 ? 'eyeroll' : t >= T.i1 ? 'squint' : 'happy'
      drawStarChar(x, px0 + 75, py0 + 120, 150, t, { color: TAU.color, mood: tm, look: [0, 0], seed: 7, glow: 0.4, tips: false }); x.restore()
    })
  }

  // ── the baby-book page
  function book(t) {
    x.fillStyle = '#2a1830'; x.fillRect(-100, -100, 1300, 2200)
    const k = pop01(t, T.book, 0.4, 1.8)
    x.save(); x.translate(540, 960); x.rotate(-0.04); x.scale(0.62 + 0.26 * k, 0.62 + 0.26 * k)
    pix(x, -470, -430, 940, 860, INK); pix(x, -460, -420, 920, 840, '#9fd0ff')
    pix(x, -440, -400, 430, 800, '#fffaf0'); pix(x, 10, -400, 430, 800, '#fffaf0'); pix(x, -10, -400, 20, 800, '#d8e8f8')
    for (let i = 0; i < 16; i++) { pix(x, -420, -330 + i * 46, 390, 2, '#d8e2f0'); pix(x, 30, -330 + i * 46, 390, 2, '#d8e2f0') }
    // left page: a footprint + a ♉ sticker + "hello world"
    txt(x, 'hello, world.', -225, -330, { size: 40, color: '#4a5aa8', font: SERIF, weight: 500, italic: true, shadow: false })
    for (const [fx, fy] of [[-260, -90], [-170, 20]]) {
      x.fillStyle = '#f2a0b8'; x.beginPath(); x.ellipse(fx, fy, 38, 60, -0.2, 0, 6.28); x.fill()
      for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(fx - 30 + i * 15, fy - 72 + Math.abs(i - 1) * 4, 9 - i, 0, 6.28); x.fill() }
    }
    x.save(); x.translate(-230, 230); x.rotate(0.15); x.fillStyle = '#3f9a52'; x.beginPath(); x.arc(0, 0, 70, 0, 6.28); x.fill(); txt(x, '♉', 0, 4, { size: 76, color: BONE, font: SERIF, shadow: false }); x.restore()
    // right page: the record
    txt(x, 'ARRIVED', 225, -320, { size: 34, color: '#4a5aa8', shadow: false })
    txt(x, '5:42 AM', 225, -220, { size: 92, color: '#2a2a6a', font: SERIF, weight: 500, italic: true, shadow: false })
    const cp = ease.inOutCubic(prog(t, T.circ, T.circ + 0.6))
    if (cp > 0) { x.save(); x.strokeStyle = '#e0344a'; x.lineWidth = 9; x.beginPath(); x.ellipse(225, -222, 200, 76, -0.06, -1.6, -1.6 + cp * 6.6); x.stroke(); x.restore() }
    txt(x, 'very loud.', 225, -60, { size: 44, color: '#4a5aa8', font: SERIF, weight: 500, italic: true, shadow: false })
    txt(x, 'already stubborn ♥', 225, 30, { size: 40, color: '#4a5aa8', font: SERIF, weight: 500, italic: true, shadow: false })
    txt(x, '— Mom', 300, 120, { size: 36, color: '#4a5aa8', font: SERIF, weight: 500, italic: true, shadow: false })
    x.restore()
    if (cp > 0.9) for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + t * 2; pix(x, 738 + Math.cos(a) * 220 - 5, 773 + Math.sin(a) * 96 - 5, 10, 10, GOLD) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.8 })
      const [s0, seg] = segAt(t)
      void s0
      const cam = vlogCam(t, { cuts: CAMCUTS, punches: [{ at: T.l9 + 0.3, out: T.phone2 - 0.2, zoom: 1.18, x: 738, y: 773 }, { at: T.l4, out: T.call - 0.1, zoom: 1.14, x: 540, y: 960 }] })
      x.save(); cam.apply(x)
      if (seg === 'conf') conf(t)
      else if (seg === 'phone1') phone(t, 1)
      else if (seg === 'phone2') phone(t, 2)
      else if (seg === 'call') call(t)
      else if (seg === 'book') book(t)
      x.restore()
      if (cam.flash > 0) { x.save(); x.globalAlpha = cam.flash * 0.35; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      // diary-cam chrome
      const secs = Math.floor(t)
      drawRecFrame(x, t, { rec: t < T.pause, battery: lerp(0.9, 0.55, t / STORY_END), time: `00:${String(secs).padStart(2, '0')}` })
      showBug(x, t, { day: 1 })
      title.update(t); H.update(t); box.update(t); lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [T.call, T.book]
export const KEPT_CUTS = CUTS
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: 'DAY 1', fadeIn: 0 }), cardCuts(CUTS, { all: true })]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ['pop', 0.02, 587.33, 0.05, 0], ['boom', 0.1, 0.12], ['tick', 0.1, 0.06],
  ...HEADS.filter(h => h.at > 0).flatMap(h => headCues(h)),
  ...vlogCutCues(CAMCUTS.filter(c => !CUTS.includes(c))),
  ...talkCues(LINES, { cps: CPS, pitch: { [TAUN]: 659.25, [MOMN]: 987.77 } }),
  // the guesses: pen scratches, two strikes, one check
  ...[0, 1, 2].map(i => ['tick', r3(T.g[i]), 0.03]), ...T.gx.map(s => ['whoosh', r3(s), 0.18, 0.03]), ['pop', T.gok, 1174.66, 0.05, 0], ['pluck', T.gok, 1567.98, 0.04, 0.5, 0],
  // ringing, pick up
  ...T.ring.flatMap(r => [['bell', r3(r), 1318.51, 0.03, 0.3, 0], ['bell', r3(r + 0.12), 1174.66, 0.03, 0.3, 0]]), ['pop', T.pick, 880, 0.05, 0], ['pop', r3(T.pick + 0.07), 1318.51, 0.04, 0],
  // rummaging + the items
  ...Array.from({ length: 16 }, (_, i) => ['tom', r3(T.rum + i * 0.36), 120 + (i % 3) * 30, { gain: 0.14, decay: 0.2, pan: i % 2 ? 0.3 : -0.3 }]).filter(c => c[1] < T.i3),
  ['pop', T.i1, 1046.5, 0.04, 0.2], ['whoosh', r3(T.i2 - 0.3), 0.3, 0.03], ['pop', T.i2, 932.33, 0.04, -0.2], ['whoosh', r3(T.i3 - 0.3), 0.3, 0.03],
  ['glitter', T.i3, r3(T.i3 + 1.4)], ['bell', T.i3, 587.33, 0.05, 2.4, 0], ['bell', r3(T.i3 + 0.08), 739.99, 0.04, 2.2, -0.2], ['bell', r3(T.i3 + 0.16), 880, 0.04, 2.2, 0.2], ['crash', T.i3, { gain: 0.04, len: 1.6 }],
  // the page, the circle
  ['whoosh', r3(T.book - 0.05), 0.4, 0.04], ['riser', T.circ, r3(T.circ + 0.6), 0.03], ['pop', r3(T.circ + 0.6), 1567.98, 0.05, 0],
  // the wheel, the tap, the charge
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.wheel[0] + i * 0.08), 0.03]), ['pop', T.tap, 739.99, 0.05, 0],
  ['whoosh', T.cardIn, 0.4, 0.04], ['riser', T.charge[0], T.charge[1], 0.05], ['glitter', T.charge[0], T.charge[1]], ['bell', T.charge[1], 1174.66, 0.04, 1.6, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // the shut, the sticker, the pause
  ['boom', T.shut, 0.08], ['tick', T.shut, 0.06], ['pop', r3(T.shut + 0.3), 1318.51, 0.05, 0.2], ['tick', T.pause, 0.05], ['pop', T.pause, 440, 0.03, 0],
  ...cardCutCues(CUTS, { all: true }),
  ...endcardCues(STORY_END),
]
