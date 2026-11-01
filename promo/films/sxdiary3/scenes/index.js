// sxdiary3 (45 s vertical, Star Talk Shows · BETA DIARIES ep 3: "Day 3: We matched answers.") · story 0–40.6, end card.
//   Same ♉ diarist, same confessional bedroom and diary-cam as sxdiary1 (the kit lives in sxdiary1/scenes/diary.js).
//   0.0   CONF   frame 0: "DAY 3" tape + "We *matched* | answers."  "diary. update: we're talking."
//   6.2   PHONE  a talk card: "What's a small thing that makes your day?" + the real rule: "You both answer, and neither
//                answer shows until you both have."
//   10.6  CONF   honest drafts, rule of three: world peace (too big ✗) · my morning run ("…I don't even run." ✗) · fresh
//                bread. (✓)
//   15.8  CONF   waiting: three punch-ins on Taurus staring down the lens. "it's been four seconds."
//   21.0  PHONE  both answers flip together: "fresh bread." / "fresh bread!!"  ✓ ✓
//   26.4  CONF   meltdown of joy: bread rains, Pisces sobs: "I ALREADY AM."
//   32.82 ★ LESSON "Small things | are *big* things."  +1 CARB-COMPATIBLE
//   37.6  "Day three: | *butter* believe it."  REC pauses.
// One canvas (sky + room + cast + phone), DOM type + box + lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import { dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawRecFrame, vlogCam, vlogCutCues } from '../../st9day.js'
import { TAU, GOLD, BONE, INK, PINK, MINT, INTER, SERIF, MONO, DIARY_FONTS, pop01, pix, rr, txt,
  drawRoom, drawPiscesWindow, drawTaurus, drawPhone, showBug, dayTitle, heads, headCues, drawRoomBlurred } from '../../sxdiary1/scenes/diary.js'

export const DURATION = 45
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const PIS = signStar('pisces')

const T = {
  title: [2.5, 2.8], l1: 2.9,
  phone1: 6.2, card: 6.35, l2: 6.6,
  conf2: 10.6, l3: 10.75, d: [11.0, 12.2, 14.6], dx: [11.7, 13.3], dok: 15.1, l4: 13.65,
  wait: 15.8, l5: 16.2, p: [16.9, 17.9, 18.9], l6: 18.8,
  phone2: 21.0, roll: [21.3, 22.5], flip: 22.6, ok: 23.1, l7: 23.5,
  conf3: 26.4, l8: 26.6, l9: 29.8, close: 32.0,
  lesson: 32.82, lessonOut: [37.4, 37.65],
  last: 37.6, pause: 40.15, lastOut: [40.3, 40.55],
}
const SEG = [[0, 'conf'], [T.phone1, 'phone1'], [T.conf2, 'conf'], [T.phone2, 'phone2'], [T.conf3, 'conf']]
const segAt = t => { let s = SEG[0]; for (const q of SEG) if (t >= q[0]) s = q; return s }
const CAMCUTS = [T.phone1, T.conf2, T.wait, T.phone2, T.conf3]

const TAUN = '♉ TAURUS · DIARY', PISN = '♓ PISCES · OUTSIDE'
const LINES = [
  { t: T.l1, speaker: TAUN, text: "diary. update: we're *talking*.", color: TAU.color },
  { t: T.l2, speaker: TAUN, text: 'a talk card. answers stay *hidden*.', color: TAU.color },
  { t: T.l3, speaker: TAUN, text: 'drafting. honest answers *only*.', color: TAU.color },
  { t: T.l4, speaker: TAUN, text: '…I don’t even *run*.', color: TAU.color },
  { t: T.l5, speaker: TAUN, text: 'sent. now we *wait*.', color: TAU.color },
  { t: T.l6, speaker: TAUN, text: 'it’s been four *seconds*.', color: TAU.color },
  { t: T.l7, speaker: TAUN, text: '…they said fresh *bread*.', color: TAU.color },
  { t: T.l8, speaker: TAUN, text: "we're carb-compatible. I'm gonna *cry*.", color: TAU.color },
  { t: T.l9, speaker: PISN, text: 'I ALREADY *AM*.', color: PIS.color },
]
const CPS = 26
export const LT = lineTimes(LINES, { cps: CPS })
const HOPS = talkHops(LINES, TAUN, { cps: CPS })

const HEADS = [
  { text: 'We *matched* | answers.', at: -1.2, out: [2.55, 2.85], top: 410, size: 100, late: 2 },
  { text: 'Day three: | *talking.*', at: 3.0, out: [5.9, 6.15], top: 262 },
  { text: 'A talk | *card.*', at: 6.3, out: [10.3, 10.55], top: 262 },
  { text: 'Honest answers | *only.*', at: 10.7, out: [15.5, 15.75], top: 262 },
  { text: 'Waiting for | *their* answer.', at: 15.9, out: [20.7, 20.95], top: 262, late: 2 },
  { text: 'Both answers | flip *together.*', at: 21.1, out: [26.1, 26.35], top: 262 },
  { text: 'Carb- | *compatible.*', at: 26.5, out: [32.5, 32.75], top: 262, accentColor: PINK },
  { text: 'Day three: | *butter* believe it.', at: T.last, out: T.lastOut, top: 300, size: 104, late: 3, accentColor: TAU.color },
]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Small things | are *big* things.', chip: '+1 CARB-COMPATIBLE', accentColor: TAU.color }

const NOTE = [
  { text: 'SMALL THING THAT', at: 10.8, size: 22, gap: 30 }, { text: 'MAKES MY DAY:', at: 10.9, size: 22, gap: 44 },
  { text: '1. world peace', at: T.d[0], size: 24, strike: T.dx[0] },
  { text: '2. my morning run', at: T.d[1], size: 24, strike: T.dx[1] },
  { text: '3. fresh bread.', at: T.d[2], size: 24, check: T.dok, color: '#2f7a4a' },
]

async function build(stage) {
  try { await Promise.all(DIARY_FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const backIm = await loadImg('card-back.png')
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const title = dayTitle(root, { day: 3, at: 0, out: T.title, top: 236 })
  const H = heads(root, HEADS)
  const box = dialogueBox(root, { lines: LINES, y: 1478, width: 960, height: 250, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function loaf(cx, cy, s, rot = 0) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
    x.fillStyle = INK; rr(x, -44, -26, 88, 52, 22); x.fill()
    x.fillStyle = '#d8964a'; rr(x, -40, -22, 80, 44, 20); x.fill()
    x.fillStyle = '#f2c27a'; rr(x, -34, -18, 68, 14, 7); x.fill()
    for (let i = 0; i < 3; i++) pix(x, -22 + i * 18, -14, 8, 18, '#a8642a')
    x.restore()
  }

  function conf(t) {
    drawRoom(x, t)
    let pis = { mood: 'sparkle', cry: 0.6 }
    if (t >= T.wait && t < T.phone2) pis = { mood: 'wide', cry: 0.9, look: [-1, 1] }
    if (t >= T.conf3) pis = { mood: t < T.l9 ? 'heart' : 'sparkle', cry: 2, size: 190, dy: -10 }
    drawPiscesWindow(x, t, { ...pis, pop: pop01(t, 0.6, 0.4) })
    let mood = 'happy', look = [0, 0], nb = { open: 0 }, pen = false, squash = 0, outfit = null
    if (t < T.phone1) { mood = 'sparkle'; squash = 0.04 * Math.sin(t * 40) }                       // vibrating with news
    else if (t < T.wait) { mood = t > T.dok ? 'happy' : t > T.dx[1] - 0.2 && t < T.d[2] ? 'eyeroll' : 'squint'; look = [1, 1]; nb = { open: 1, lines: NOTE, dx: 0, dy: 255, s: 0.92, rot: -0.04 }; pen = t < T.dok }
    else if (t < T.phone2) { mood = t < T.p[0] ? 'neutral' : 'wide'; look = [0, 0]; nb = { open: 0, rot: -0.12 }; squash = t > T.p[2] ? 0.03 * Math.sin(t * 30) : 0 }
    else {
      mood = t < T.last + 0.5 ? 'heart' : t < T.pause - 0.6 ? 'happy' : 'wink'; look = [0, 0]; nb = { open: 0, rot: -0.3 }
      squash = t < T.close ? 0.1 * Math.abs(Math.sin((t - T.conf3) * 7)) : 0
      if (t >= T.last) outfit = null
    }
    const hops = [0.15, 0.55, ...HOPS, T.dok, T.conf3 + 0.1, T.conf3 + 0.5, T.conf3 + 0.9, T.last + 0.4]
    const r = drawTaurus(x, 540, 1040, 400, t, { mood, look, hops, squash }, { notebook: nb, outfit, pen })
    // sweat while waiting
    if (t > T.p[1] && t < T.phone2) for (let i = 0; i < 2; i++) { const p = (t * 1.2 + i * 0.5) % 1; pix(x, r.x + (i ? 150 : -160), r.y - 90 + p * 70, 12, 18, '#8fd8ff') }
    // the meltdown: bread rain
    if (t >= T.conf3) {
      const R = rng(9)
      for (let i = 0; i < 18; i++) {
        const sx = R() * 1080, sp = 260 + R() * 260, ph = R(), rs = R() * 2 - 1
        const yy = ((t - T.conf3) * sp + ph * 1600) % 1600 - 100
        x.save(); x.globalAlpha = 1 - prog(t, T.lesson - 0.3, T.lesson + 0.2); loaf(sx, yy, 0.8 + R() * 0.5, rs + t * rs * 2); x.restore()
      }
    }
  }

  function waitChip(t) {
    // the waiting chip: typing dots under the lens
    if (t >= T.wait && t < T.phone2) {
      const k = pop01(t, T.l5 + 0.4, 0.3)
      x.save(); x.translate(540, 610); x.scale(k, k)
      x.fillStyle = 'rgba(16,9,38,0.9)'; rr(x, -230, -36, 460, 72, 36); x.fill(); x.strokeStyle = GOLD; x.lineWidth = 3; x.stroke()
      txt(x, 'SOL IS ANSWERING', -40, 0, { size: 24, color: BONE })
      for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 7 - i * 0.9)); pix(x, 150 + i * 22, -6 - b * 8, 12, 12, GOLD) }
      x.restore()
    }
  }

  // ── the talk card (tarot-style, like the real hand)
  function talkCard(cx, cy, w) {
    const h = w * 1.6
    x.save(); x.translate(cx, cy)
    x.save(); x.shadowColor = 'rgba(242,199,92,0.6)'; x.shadowBlur = 40; x.fillStyle = '#e9c45a'; rr(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 22); x.fill(); x.restore()
    x.fillStyle = '#1e1450'; rr(x, -w / 2, -h / 2, w, h, 16); x.fill()
    x.strokeStyle = GOLD; x.lineWidth = 3; rr(x, -w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 10); x.stroke()
    txt(x, '— XVII —', 0, -h / 2 + 60, { size: 30, color: GOLD, font: SERIF, weight: 500, shadow: false, spacing: 4 })
    // the arch + a pixel star
    x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.moveTo(-w * 0.3, -h * 0.05); x.lineTo(-w * 0.3, -h * 0.25); x.arc(0, -h * 0.25, w * 0.3, Math.PI, 0); x.lineTo(w * 0.3, -h * 0.05); x.stroke()
    for (const [a, b, c] of [[0, -0.2, 26], [-0.12, -0.27, 10], [0.13, -0.12, 8]]) { pix(x, w * a - c / 2, h * b - c * 1.5, c, c * 3, GOLD); pix(x, w * a - c * 1.5, h * b - c / 2, c * 3, c, GOLD) }
    txt(x, 'THE STAR', 0, -h * 0.01, { size: 28, color: GOLD, font: SERIF, weight: 500, shadow: false, spacing: 5 })
    pix(x, -w * 0.3, h * 0.03, w * 0.6, 2, GOLD)
    txt(x, 'What’s a small thing', 0, h * 0.13, { size: 36, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    txt(x, 'that makes your day?', 0, h * 0.13 + 44, { size: 36, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
    txt(x, 'EVERYDAY', -w / 2 + 34, h / 2 - 36, { size: 13, color: GOLD, align: 'left', shadow: false, spacing: 3 })
    txt(x, 'QUESTION', w / 2 - 34, h / 2 - 36, { size: 13, color: GOLD, align: 'right', shadow: false, spacing: 3 })
    x.restore()
  }
  // an answer card: face-down (the real card back) → flips to the answer
  function answer(cx, cy, w, t, who, text, flipAt) {
    const h = w * 1.45
    const p = prog(t, flipAt, flipAt + 0.36), sx = Math.abs(Math.cos(p * Math.PI)), face = p > 0.5
    const wig = t < flipAt && t > T.roll[0] ? Math.sin(t * 40) * 0.02 : 0
    txt(x, who, cx, cy - h / 2 - 34, { size: 24, color: who === 'YOU' ? TAU.color : PINK, spacing: 4 })
    x.save(); x.translate(cx, cy); x.rotate(wig); x.scale(Math.max(0.02, sx), 1)
    if (!face) { if (backIm) { const ih = w * backIm.height / backIm.width; x.drawImage(backIm, -w / 2, -ih / 2, w, ih) } else { x.fillStyle = '#3a2a8a'; rr(x, -w / 2, -h / 2, w, h, 16); x.fill() } }
    else {
      x.fillStyle = '#fbf5e6'; rr(x, -w / 2, -h / 2, w, h, 16); x.fill(); x.strokeStyle = GOLD; x.lineWidth = 6; x.stroke()
      txt(x, text[0], 0, -20, { size: 36, color: INK, font: SERIF, weight: 500, italic: true, shadow: false })
      txt(x, text[1], 0, 24, { size: 36, color: INK, font: SERIF, weight: 500, italic: true, shadow: false })
    }
    x.restore()
    if (t > T.ok) { const k = pop01(t, T.ok + (who === 'YOU' ? 0 : 0.12), 0.3, 3); x.save(); x.translate(cx, cy + h / 2 + 50); x.scale(k, k); x.fillStyle = '#2fa05a'; x.beginPath(); x.arc(0, 0, 34, 0, 6.28); x.fill(); txt(x, '✓', 0, 2, { size: 40, color: '#ffffff', font: INTER, weight: 800 }); x.restore() }
  }
  function phone(t, which) {
    drawRoomBlurred(x, t)
    const k = pop01(t, which === 1 ? T.phone1 : T.phone2, 0.35, 1.8)
    drawPhone(x, 540, 990, 540, 930, { rot: 0.02 + Math.sin(t * 1.2) * 0.01, pop: 0.6 + 0.4 * k }, (xx, sx, sy, sw, sh) => {
      const cx = sx + sw / 2
      txt(x, '9:41', sx + 44, sy + 40, { size: 22, align: 'left', shadow: false, font: INTER, weight: 700 })
      txt(x, 'Sol', cx, sy + 92, { size: 40, color: BONE, font: SERIF, weight: 500, italic: true, shadow: false })
      if (which === 1) {
        const ck = pop01(t, T.card, 0.45, 1.8)
        x.save(); x.translate(cx, sy + 470); x.scale(ck, ck); x.translate(-cx, -(sy + 470)); talkCard(cx, sy + 450, 330); x.restore()
        txt(x, 'You both answer, and neither', cx, sy + sh - 120, { size: 21, color: '#cfc6e8', shadow: false, font: INTER, weight: 600 })
        txt(x, 'answer shows until you both have.', cx, sy + sh - 88, { size: 21, color: '#cfc6e8', shadow: false, font: INTER, weight: 600 })
      } else {
        txt(x, 'What’s a small thing that makes your day?', cx, sy + 160, { size: 20, color: GOLD, shadow: false, font: SERIF, weight: 500, italic: true })
        answer(cx - 115, sy + 440, 200, t, 'YOU', ['fresh', 'bread.'], T.flip)
        answer(cx + 115, sy + 440, 200, t, 'SOL', ['fresh', 'bread!!'], T.flip)
        if (t > T.ok + 0.3) { const k2 = pop01(t, T.ok + 0.3, 0.3, 3); x.save(); x.translate(cx, sy + sh - 130); x.rotate(-0.08); x.scale(k2, k2); pix(x, -150, -36, 300, 72, INK); pix(x, -144, -30, 288, 60, MINT); txt(x, 'SAME ANSWER', 0, 2, { size: 30, color: INK, shadow: false }); x.restore() }
      }
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.8 })
      const seg = segAt(t)[1]
      const cam = vlogCam(t, { cuts: CAMCUTS, punches: [
        { at: T.p[0], out: T.p[1], zoom: 1.15, x: 540, y: 1000 }, { at: T.p[1], out: T.p[2], zoom: 1.32, x: 540, y: 1000 }, { at: T.p[2], out: T.phone2 - 0.05, zoom: 1.55, x: 540, y: 1000 },
        { at: T.flip, out: T.conf3 - 0.1, zoom: 1.08, x: 540, y: 1100 }] })
      x.save(); cam.apply(x)
      if (seg === 'conf') conf(t); else phone(t, seg === 'phone1' ? 1 : 2)
      x.restore()
      if (seg === 'conf') waitChip(t)
      if (cam.flash > 0) { x.save(); x.globalAlpha = cam.flash * 0.35; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawRecFrame(x, t, { rec: t < T.pause, battery: lerp(0.7, 0.3, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      showBug(x, t, { day: 3 })
      title.update(t); H.update(t); box.update(t); lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [T.wait, T.conf3]
export const KEPT_CUTS = CUTS
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: 'DAY 3', fadeIn: 0 }), cardCuts(CUTS, { all: true })]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ['pop', 0.02, 466.16, 0.05, 0], ['boom', 0.1, 0.12], ['tick', 0.1, 0.06],
  ...HEADS.filter(h => h.at > 0).flatMap(h => headCues(h)),
  ...vlogCutCues(CAMCUTS.filter(c => !CUTS.includes(c))),
  ...talkCues(LINES, { cps: CPS, pitch: { [TAUN]: 698.46, [PISN]: 1174.66 } }),
  ['whoosh', T.card, 0.4, 0.04], ['bell', r3(T.card + 0.4), 932.33, 0.04, 1.6, 0], ['glitter', r3(T.card + 0.3), r3(T.card + 1.2)],
  ...T.d.map(d => ['tick', r3(d), 0.03]), ...T.dx.map(s => ['whoosh', r3(s), 0.18, 0.03]), ['pop', T.dok, 1174.66, 0.05, 0], ['pluck', T.dok, 1396.91, 0.04, 0.5, 0],
  ['pop', r3(T.l5 + 0.4), 932.33, 0.04, 0], ...T.p.flatMap(p => [['boom', r3(p), 0.1], ['tick', r3(p), 0.05]]),
  ...Array.from({ length: 12 }, (_, i) => ['snare', r3(T.roll[0] + i * 0.1), { gain: 0.05 + i * 0.004, decay: 0.08 }]),
  ['whoosh', T.flip, 0.3, 0.05], ['crash', r3(T.flip + 0.2), { gain: 0.06, len: 2.0 }], ['pop', T.ok, 1396.91, 0.05, -0.2], ['pop', r3(T.ok + 0.12), 1864.66, 0.05, 0.2], ['glitter', T.ok, r3(T.ok + 1.4)],
  ['boom', T.conf3, 0.12], ['glitter', T.conf3, r3(T.conf3 + 2)], ...Array.from({ length: 8 }, (_, i) => ['pop', r3(T.conf3 + 0.2 + i * 0.35), 600 + (i % 4) * 120, 0.025, (i % 2 ? 0.4 : -0.4)]),
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['pluck', r3(T.pause - 0.55), 1396.91, 0.04, 0.5, 0.2], ['tick', T.pause, 0.05], ['pop', T.pause, 466.16, 0.03, 0],
  ...cardCutCues(CUTS, { all: true }),
  ...endcardCues(STORY_END),
]
