// sxdiary2 (45 s vertical, Star Talk Shows · BETA DIARIES ep 2: "Day 2: My first blind card.") · story 0–40.6, end card.
//   Same ♉ diarist, same confessional bedroom and diary-cam as sxdiary1 (the kit lives in sxdiary1/scenes/diary.js).
//   0.0   CONF   frame 0: "DAY 2" tape + "My first | *blind card.*"   "diary. tonight's deck just dealt."
//   6.2   PHONE  tonight's deck: one mystery card, "Sol, 29", NO PHOTO (a nebula where the face would be), the words veiled.
//   10.6  CONF   overthinking: "I'm not nervous. I made a list."  1. what if they're cool  2. what if I'm not
//                3. what if they hate BREAD (gasp; Pisces gasps too)
//   15.6  OUTFITS (jump cuts, rule of three): bow tie "too formal? it's a card." · shades + scarf "too mysterious? I can't
//                see." · robe + towel + cucumber mask "robe. face mask. perfect."
//   26.8  PHONE  the veil lifts: "Sunday mornings: slow coffee, warm bread, no alarms."
//   30.6  CONF   heart-eyes melt: "…I'd like to know them."
//   33.94 ★ LESSON "Let them in | before you *look.*"  +1 BRAVE BULL
//   38.1  "Card first. | *Face* last."  wink, REC pauses.
// One canvas (sky + room + cast + phone), DOM type + box + lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import { dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { drawRecFrame, vlogCam, vlogCutCues } from '../../st9day.js'
import { TAU, GOLD, BONE, INK, PINK, MINT, INTER, SERIF, DIARY_FONTS, pop01, pix, rr, txt,
  drawRoom, drawPiscesWindow, drawTaurus, drawPhone, showBug, dayTitle, heads, headCues, drawRoomBlurred } from '../../sxdiary1/scenes/diary.js'

export const DURATION = 45
const KEY = 'Ab'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6

const T = {
  title: [2.5, 2.8], l1: 2.9,
  phone1: 6.2, deal: 6.35, l2: 6.6,
  conf2: 10.6, l3: 10.75, n: [11.3, 12.1, 13.5], gasp: 14.95, l4: 13.5,
  o1: 15.6, l5: 16.55, o2: 19.2, l6: 19.6, o3: 22.8, l7: 23.2,
  phone2: 26.8, veil: [27.0, 27.9], l8: 27.6,
  conf3: 30.6, l9: 30.8, close: 33.6,
  lesson: 33.94, lessonOut: [38.0, 38.25],
  last: 38.1, pause: 40.15, lastOut: [40.3, 40.55],
}
const SEG = [[0, 'conf'], [T.phone1, 'phone'], [T.conf2, 'conf'], [T.o1, 'conf'], [T.phone2, 'phone'], [T.conf3, 'conf']]
const segAt = t => { let s = SEG[0]; for (const q of SEG) if (t >= q[0]) s = q; return s }
const CAMCUTS = [T.phone1, T.conf2, T.o1, T.o2, T.o3, T.phone2, T.conf3]

const TAUN = '♉ TAURUS · DIARY'
const LINES = [
  { t: T.l1, speaker: TAUN, text: "diary. tonight's deck just *dealt*.", color: TAU.color },
  { t: T.l2, speaker: TAUN, text: 'a card. a blind one. no *face*.', color: TAU.color },
  { t: T.l3, speaker: TAUN, text: 'not nervous. made a *list*.', color: TAU.color },
  { t: T.l4, speaker: TAUN, text: 'item three: what if they hate *BREAD*.', color: TAU.color },
  { t: T.l5, speaker: TAUN, text: "too formal? it's a *card*.", color: TAU.color },
  { t: T.l6, speaker: TAUN, text: "too mysterious? I can't *see*.", color: TAU.color },
  { t: T.l7, speaker: TAUN, text: 'robe. face mask. *perfect*.', color: TAU.color },
  { t: T.l8, speaker: TAUN, text: 'slow coffee. warm bread. no *alarms*.', color: TAU.color },
  { t: T.l9, speaker: TAUN, text: "…I'd like to *know* them.", color: TAU.color },
]
const CPS = 26
export const LT = lineTimes(LINES, { cps: CPS })
const HOPS = talkHops(LINES, TAUN, { cps: CPS })

const HEADS = [
  { text: 'My first | *blind card.*', at: -1.2, out: [2.55, 2.85], top: 410, size: 100 },
  { text: 'Tonight’s | *deck.*', at: 3.0, out: [5.9, 6.15], top: 262 },
  { text: 'One card. | *No face.*', at: 6.3, out: [10.3, 10.55], top: 262 },
  { text: 'Overthinking: | *level 3.*', at: 10.7, out: [15.25, 15.5] , top: 262 },
  { text: 'Outfit | *change.*', at: 15.7, out: [18.9, 19.15], top: 262, accentColor: PINK },
  { text: 'Outfit change | *#2.*', at: 19.3, out: [22.5, 22.75], top: 262, accentColor: PINK },
  { text: 'Outfit change | *#3.*', at: 22.9, out: [26.5, 26.75], top: 262, accentColor: PINK },
  { text: 'Then it *read* | the card.', at: 26.9, out: [30.3, 30.55], top: 250, size: 84, late: 2 },
  { text: 'Sunday | *mornings.*', at: 30.7, out: [33.6, 33.85], top: 262 },
  { text: 'Card first. | *Face* last.', at: T.last, out: T.lastOut, top: 300, size: 110, late: 2, accentColor: TAU.color },
]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Let them in | before you *look.*', chip: '+1 BRAVE BULL', accentColor: TAU.color }

const NOTE = [
  { text: 'NOT NERVOUS. LIST:', at: 10.95, size: 22, gap: 44 },
  { text: '1. what if they', at: T.n[0], size: 24 }, { text: "   are cool", at: T.n[0] + 0.4, size: 24 },
  { text: "2. what if I'm not", at: T.n[1], size: 24 },
  { text: '3. what if they', at: T.n[2], size: 24, color: '#c0283c' }, { text: '   hate BREAD', at: T.n[2] + 0.4, size: 24, color: '#c0283c' },
]

async function build(stage) {
  try { await Promise.all(DIARY_FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const title = dayTitle(root, { day: 2, at: 0, out: T.title, top: 236 })
  const H = heads(root, HEADS)
  const box = dialogueBox(root, { lines: LINES, y: 1478, width: 960, height: 250, open: T.l1 - 0.22, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function conf(t) {
    drawRoom(x, t)
    let pis = { mood: 'sparkle', cry: 0.6 }
    if (t >= T.conf2 && t < T.o1) pis = t > T.gasp ? { mood: 'wide', cry: 1.6, look: [-1, 1] } : { mood: 'neutral', cry: 0.8, look: [-1, 1] }
    else if (t >= T.o1 && t < T.phone2) pis = t >= T.o3 ? { mood: 'heart', cry: 1.2 } : { mood: 'squint', cry: 0.6, look: [-1, 1] }
    else if (t >= T.conf3) pis = { mood: 'heart', cry: 1.9 }
    drawPiscesWindow(x, t, { ...pis, pop: pop01(t, 0.6, 0.4) })
    let mood = 'happy', look = [0, 0], nb = { open: 0 }, outfit = null, squash = 0, pen = false
    if (t < T.phone1) mood = t < T.l1 ? 'sparkle' : 'happy'
    else if (t < T.o1) {
      mood = t > T.gasp ? 'wide' : t > T.n[1] ? 'squint' : 'neutral'; look = t > T.gasp ? [0, 0] : [1, 1]
      nb = { open: 1, lines: NOTE, dx: 0, dy: 255, s: 0.92, rot: -0.04 }; pen = t < T.n[2] + 0.8
      squash = t > T.gasp && t < T.gasp + 0.5 ? -0.12 * (1 - prog(t, T.gasp, T.gasp + 0.5)) : 0
    } else if (t < T.phone2) {
      if (t < T.o2) { outfit = 'bowtie'; mood = t < T.l5 + 0.6 ? 'wink' : 'squint' }
      else if (t < T.o3) { outfit = ['shades', 'scarf']; mood = 'neutral' }
      else { outfit = ['robe', 'towel', 'mask']; mood = t < T.l7 + 0.8 ? 'neutral' : 'happy' }
      look = [0, 0]
    } else {
      outfit = ['robe', 'towel']; mood = t < T.last + 0.6 ? 'heart' : t < T.pause - 0.6 ? 'happy' : 'wink'; look = [0, 0]
      squash = t < T.close ? 0.1 + 0.05 * Math.sin(t * 3) : 0
    }
    const hops = [0.15, 0.55, ...HOPS, T.gasp, T.o1 + 0.1, T.o2 + 0.1, T.o3 + 0.1, T.last + 0.4]
    drawTaurus(x, 540, 1040, 400, t, { mood, look, hops, squash }, { notebook: nb, outfit, pen })
    // shades gag: bumps into nothing — a "?" floats
    if (t >= T.o2 && t < T.o3) txt(x, '?', 700 + Math.sin(t * 3) * 10, 800 - (t - T.o2) * 20, { size: 70, color: BONE, font: INTER, weight: 800, alpha: clamp((t - T.l6 - 0.6) * 3) })
    // gasp lines
    if (t > T.gasp && t < T.gasp + 0.9 && t < T.o1) for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28; const r0 = 240 + (t - T.gasp) * 120; pix(x, 540 + Math.cos(a) * r0 - 6, 960 + Math.sin(a) * r0 - 6, 12, 12, BONE) }
    // melting hearts
    if (t >= T.conf3) for (let i = 0; i < 5; i++) { const p = ((t - T.conf3) * 0.5 + i / 5) % 1; txt(x, '♥', 400 + i * 70 + Math.sin(t * 2 + i) * 20, 900 - p * 360, { size: 40, color: PINK, font: INTER, alpha: (1 - p) * 0.9 }) }
  }

  // the mystery card from tonight's deck (no photo: a nebula where the face would be)
  function mystery(t, cx, cy, w, veil) {
    const h = w * 1.5
    x.save(); x.translate(cx, cy)
    x.save(); x.shadowColor = 'rgba(255,92,160,0.6)'; x.shadowBlur = 40; x.fillStyle = '#ff5ca0'; rr(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 24); x.fill(); x.restore()
    x.fillStyle = '#160b2c'; rr(x, -w / 2, -h / 2, w, h, 20); x.fill()
    txt(x, 'Sol, 29', -w / 2 + 30, -h / 2 + 50, { size: 40, color: BONE, font: SERIF, weight: 500, italic: true, align: 'left', shadow: false })
    x.fillStyle = '#c77dff'; x.beginPath(); x.arc(w / 2 - 44, -h / 2 + 50, 22, 0, 6.28); x.fill(); txt(x, '☾', w / 2 - 44, -h / 2 + 52, { size: 26, color: INK, font: SERIF, shadow: false })
    // the nebula photo slot
    const py = -h / 2 + 90, ph = h * 0.36
    x.save(); rr(x, -w / 2 + 24, py, w - 48, ph, 12); x.clip()
    x.fillStyle = '#2a0f3a'; x.fillRect(-w / 2, py, w, ph)
    for (let i = 0; i < 4; i++) { const g = x.createRadialGradient(Math.sin(t * 0.6 + i) * 60 + (i - 1.5) * 50, py + ph * 0.55, 10, 0, py + ph * 0.55, ph * 0.8); g.addColorStop(0, ['rgba(255,110,150,0.8)', 'rgba(255,170,120,0.5)', 'rgba(200,90,255,0.5)', 'rgba(255,90,120,0.4)'][i]); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(-w / 2, py, w, ph) }
    x.restore()
    txt(x, 'NO PHOTO · FACE LAST', -w / 2 + 34, py + ph - 18, { size: 14, color: '#ffd0e0', align: 'left', shadow: false, spacing: 2 })
    // sign
    const sy = py + ph + 46
    txt(x, 'CANCER', -w / 2 + 30, sy, { size: 30, color: '#ff8fb1', font: SERIF, weight: 500, align: 'left', shadow: false, spacing: 2 })
    x.strokeStyle = '#7fd0ff'; x.lineWidth = 2; rr(x, -w / 2 + 170, sy - 17, 96, 34, 17); x.stroke(); txt(x, 'WATER', -w / 2 + 218, sy, { size: 15, color: '#7fd0ff', shadow: false })
    // the words: veiled, then read
    const qy = sy + 56
    const Q = ['“Sunday mornings:', 'slow coffee, warm bread,', 'no alarms.”']
    Q.forEach((q, i) => txt(x, q, -w / 2 + 30, qy + i * 40, { size: 30, color: BONE, font: SERIF, weight: 500, italic: true, align: 'left', shadow: false, alpha: clamp(1 - veil * 1.4 + i * 0) }))
    if (veil > 0) {
      x.save(); x.globalAlpha = veil
      for (let i = 0; i < 3; i++) { const bw = [w * 0.6, w * 0.8, w * 0.4][i]; x.fillStyle = 'rgba(200,180,255,0.35)'; rr(x, -w / 2 + 30, qy + i * 40 - 14, bw, 26, 13); x.fill() }
      for (let i = 0; i < 18; i++) { const sx = -w / 2 + 30 + ((i * 53 + t * 40) % (w - 60)), syy = qy - 14 + (i * 37 % 100); pix(x, sx, syy, 5, 5, 'rgba(255,255,255,0.7)') }
      txt(x, 'TAP TO READ', 0, qy + 140, { size: 18, color: '#cfc6e8', shadow: false, spacing: 4, alpha: 0.5 + 0.5 * Math.sin(t * 5) })
      x.restore()
    }
    txt(x, 'ALIGN · ✦ 027/∞', -w / 2 + 30, h / 2 - 28, { size: 13, color: '#8a80a8', align: 'left', shadow: false, spacing: 2 })
    txt(x, 'MYSTERY CARD', w / 2 - 30, h / 2 - 28, { size: 13, color: '#8a80a8', align: 'right', shadow: false, spacing: 2 })
    x.restore()
  }
  function phone(t) {
    drawRoomBlurred(x, t)
    const first = t < T.conf2
    const k = pop01(t, first ? T.phone1 : T.phone2, 0.35, 1.8)
    drawPhone(x, 540, 990, 540, 930, { rot: -0.02 + Math.sin(t * 1.3) * 0.01, pop: 0.6 + 0.4 * k }, (xx, sx, sy, sw, sh) => {
      const cx = sx + sw / 2
      txt(x, '9:41', sx + 44, sy + 40, { size: 22, align: 'left', shadow: false, font: INTER, weight: 700 })
      txt(x, 'Tonight’s deck', sx + 36, sy + 108, { size: 44, color: BONE, font: SERIF, weight: 500, italic: true, align: 'left', shadow: false })
      // the deck behind + the dealt card
      const dk = first ? pop01(t, T.deal, 0.45, 1.6) : 1
      for (let i = 2; i >= 1; i--) { x.fillStyle = ['', '#3a2470', '#2a1a58'][i]; rr(x, cx - 200 + i * 10, sy + 170 - i * 10, 400, 600, 22); x.fill() }
      const veil = first ? 1 : 1 - ease.inOutCubic(prog(t, ...T.veil))
      x.save(); x.translate(0, (1 - dk) * 400); x.globalAlpha = clamp(dk * 2)
      mystery(t, cx, sy + 470, 400, veil); x.restore()
      txt(x, 'RELEASE', sx + 70, sy + sh - 70, { size: 16, color: '#9a8fc0', shadow: false, align: 'left', spacing: 3 }); txt(x, 'ALIGN', sx + sw - 70, sy + sh - 70, { size: 16, color: '#9a8fc0', shadow: false, align: 'right', spacing: 3 })
    })
    // a little ♉ point taps the card on the second visit
    if (!first && t < T.veil[1]) {
      const p = prog(t, T.phone2 + 0.1, T.veil[0])
      x.save(); x.translate(lerp(840, 640, ease.outCubic(p)), lerp(1700, 1240, ease.outCubic(p))); x.rotate(-0.4)
      x.fillStyle = TAU.color; x.beginPath(); x.moveTo(0, -60); x.lineTo(40, 80); x.lineTo(-40, 80); x.closePath(); x.fill(); x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.8 })
      const seg = segAt(t)[1]
      const cam = vlogCam(t, { cuts: CAMCUTS, punches: [{ at: T.gasp, out: T.o1 - 0.1, zoom: 1.2, x: 540, y: 980 }, { at: T.l8, out: T.conf3 - 0.1, zoom: 1.16, x: 540, y: 1180 }] })
      x.save(); cam.apply(x)
      if (seg === 'conf') conf(t); else phone(t)
      x.restore()
      if (cam.flash > 0) { x.save(); x.globalAlpha = cam.flash * 0.35; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawRecFrame(x, t, { rec: t < T.pause, battery: lerp(0.8, 0.45, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      showBug(x, t, { day: 2 })
      title.update(t); H.update(t); box.update(t); lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [T.o1, T.phone2]
export const KEPT_CUTS = CUTS
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: 'DAY 2', fadeIn: 0 }), cardCuts(CUTS, { all: true })]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ['pop', 0.02, 622.25, 0.05, 0], ['boom', 0.1, 0.12], ['tick', 0.1, 0.06],
  ...HEADS.filter(h => h.at > 0).flatMap(h => headCues(h)),
  ...vlogCutCues(CAMCUTS.filter(c => !CUTS.includes(c))),
  ...talkCues(LINES, { cps: CPS, pitch: { [TAUN]: 622.25 } }),
  ['whoosh', T.deal, 0.4, 0.04], ['pop', r3(T.deal + 0.4), 1244.51, 0.04, 0], ['glitter', r3(T.deal + 0.3), r3(T.deal + 1.2)],
  ...T.n.map(n => ['tick', r3(n), 0.03]),
  ['boom', T.gasp, 0.14], ['pop', T.gasp, 1661.22, 0.05, 0], ['whoosh', T.gasp, 0.3, 0.04],
  ...[T.o1, T.o2, T.o3].flatMap(o => [['pop', r3(o + 0.12), 1046.5, 0.04, 0.2], ['tick', r3(o + 0.2), 0.04]]),
  ['riser', T.veil[0], T.veil[1], 0.04], ['glitter', T.veil[0], T.veil[1]], ['bell', T.veil[1], 1244.51, 0.04, 2.0, 0], ['bell', r3(T.veil[1] + 0.1), 1567.98, 0.03, 2.0, 0.2],
  ['bell', T.conf3, 830.61, 0.03, 1.8, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['pluck', r3(T.pause - 0.55), 1661.22, 0.04, 0.5, 0.2], ['tick', T.pause, 0.05], ['pop', T.pause, 415.3, 0.03, 0],
  ...cardCutCues(CUTS, { all: true }),
  ...endcardCues(STORY_END),
]
