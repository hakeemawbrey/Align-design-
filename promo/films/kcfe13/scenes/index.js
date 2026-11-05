// kcfe13: ZODIAC CONFESSIONAL ep 13, "Everyone's in the booth at 2 a.m." (15 s vertical, music: lofi · D). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: a 2×2 grid of night booths, four signs mid-yawn lit by phone glow, a flip clock SLAMMING onto 2:04
//          (whip zoom); hook "2:04 a.m. *Everyone's* in the booth."
//   1.0–8.4   one booth lights up at a time: ♉ "just checking *one thing.*" · ♎ "rereading our *old texts.*" ·
//             ♈ "typing a reply I *won't send.*" · ♊ "replaying one compliment *from 2019.*"
//   8.5–10.6  whip to Pisces on the boom, sobbing at a video on its phone: "a duck *found its friend.*"
//   10.7–12.2 back to the grid. PRODUCER: "go to sleep."
//   12.3–13.2 the four phones go dark one by one; the clock flips to 2:05.
//   13.6      last line "Phones down. Feelings *tomorrow.*" holds → hard cut at 15.0.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, blk, rr, sparkles, step, pop01, drawBits,
  buildBug, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues } from '../../hookkit.js'

export const DURATION = 15
const CELLS = [{ id: 'taurus', cx: 270, cy: 680 }, { id: 'libra', cx: 810, cy: 680 }, { id: 'aries', cx: 270, cy: 1220 }, { id: 'gemini', cx: 810, cy: 1220 }]
const TALK = [1.0, 2.9, 4.8, 6.7]
const T = { pis: [8.5, 10.65], prod: 10.8, dark: [12.3, 12.5, 12.7, 12.9], tick: 13.15, last: 13.6 }
const HOOK = { at: -1, text: '2:04 a.m. *Everyone’s* | in the booth.', top: 150, size: 100, accentColor: '#9fc4ff', out: [2.75, 2.9] }
const WHIP = { at: -0.26, len: 0.5, from: 1.6, blur: 12 }
const WHIP2 = { at: T.pis[0] - 0.04, len: 0.4, from: 1.6 }, WHIP3 = { at: T.pis[1] - 0.04, len: 0.4, from: 1.5 }
const w = id => { const s = SIGN(id); return { who: `${s.glyph}︎ ${s.name}`, color: s.color } }
const CAPS = [
  { t: TALK[0], end: 2.8, ...w('taurus'), text: 'just checking *one thing.*' },
  { t: TALK[1], end: 4.7, ...w('libra'), text: 'rereading our *old texts.*' },
  { t: TALK[2], end: 6.6, ...w('aries'), text: "typing a reply I *won't send.*" },
  { t: TALK[3], end: 8.4, ...w('gemini'), text: 'replaying one compliment *from 2019.*' },
  { t: T.pis[0] + 0.15, end: 10.55, ...w('pisces'), text: 'a duck *found its friend.*', accent: '#9fc4ff' },
  { t: T.prod, end: 12.2, kind: 'prod', text: 'go to sleep.' },
  { t: T.last, end: 99, who: 'EVERYONE', color: BONE, text: 'Phones down. Feelings *tomorrow.*', accent: '#9fc4ff' },
]
const MOODS = { taurus: 'neutral', libra: 'sparkle', aries: 'squint', gemini: 'happy' }

function flipClock(x, t, cx, cy, s) {
  const txt = t < T.tick ? '2:04' : '2:05'
  const slam = easeOutBack(prog(t, -0.35, 0.05), 2.2)
  x.save(); x.translate(cx, cy); x.scale(s * lerp(1.8, 1, slam), s * lerp(1.8, 1, slam))
  x.fillStyle = INK; rr(x, -180, -76, 360, 152, 22); x.fill()
  x.fillStyle = '#1e1a2e'; rr(x, -170, -66, 340, 132, 16); x.fill()
  x.fillStyle = '#000'; x.fillRect(-170, -2, 340, 4)
  const fl = t > T.tick && t < T.tick + 0.25 ? Math.cos(Math.PI * prog(t, T.tick, T.tick + 0.25)) : 1
  x.save(); x.scale(1, Math.abs(fl) * 0.9 + 0.1)
  x.font = `700 104px ${MONO}`; x.fillStyle = '#ffd98a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 6)
  x.restore()
  x.font = `800 26px ${INTER}`; x.fillStyle = '#ffd98a'; x.fillText('AM', 140, 52)
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = buildCaps(root, CAPS, { y: 1560 }), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function cell(t, i) {
    const C = CELLS[i]
    const active = t >= TALK[i] && t < (TALK[i + 1] ?? 8.45)
    const dark = t >= T.dark[i]
    const anyTalk = t >= TALK[0] && t < 8.45
    x.save(); x.beginPath(); x.rect(C.cx - 270, C.cy - 270, 540, 540); x.clip()
    x.translate(C.cx - 270, C.cy - 270 - 190); x.scale(0.5, 0.5)
    drawBooth(x, t, { sign: C.id, ring: dark ? 0 : 0.35, dim: dark ? 0.85 : 0.55, plant: false, neon: false })
    const yawn = t < 1 ? Math.sin(Math.PI * prog(t, -0.7, 1.0)) : 0
    const mood = dark ? 'sleepy' : t < 1 ? 'squint' : active ? 'wide' : MOODS[C.id]
    const F = seat(x, t, C.id, { ...SUBJ, hops: active ? [TALK[i] + 0.05, TALK[i] + 0.6] : [] }, { mood, look: dark ? undefined : [0, 1], seed: 3 + i, squash: -0.12 * yawn })
    drawChairFront(x)
    // the phone glow on the face
    if (!dark) {
      const g = x.createRadialGradient(SUBJ.x, F.cy + 40, 0, SUBJ.x, F.cy + 40, 360); g.addColorStop(0, 'rgba(160,200,255,0.4)'); g.addColorStop(1, 'rgba(160,200,255,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1100)
      x.fillStyle = INK; rr(x, SUBJ.x - 70, F.cy + 130, 140, 200, 18); x.fill(); x.fillStyle = '#bcd8ff'; rr(x, SUBJ.x - 58, F.cy + 142, 116, 176, 12); x.fill()
    }
    x.restore()
    // dim the cells that aren't talking
    if (anyTalk && !active) { x.fillStyle = 'rgba(4,2,12,0.55)'; x.fillRect(C.cx - 270, C.cy - 270, 540, 540) }
    if (active) { x.strokeStyle = SIGN(C.id).color; x.lineWidth = 10; x.strokeRect(C.cx - 265, C.cy - 265, 530, 530) }
    // the cell's name tag
    x.font = `900 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    const nm = `${SIGN(C.id).glyph}︎ ${SIGN(C.id).name}`, tw = x.measureText(nm).width + 28
    x.fillStyle = SIGN(C.id).color; x.fillRect(C.cx - 250, C.cy - 250, tw, 46); x.fillStyle = INK; x.fillText(nm, C.cx - 236, C.cy - 226)
  }

  function grid(t) {
    x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920)
    for (let i = 0; i < 4; i++) cell(t, i)
    x.fillStyle = INK; x.fillRect(531, 410, 18, 1080); x.fillRect(0, 941, 1080, 18)
    flipClock(x, t, 540, 950, 0.75)
    recChrome(x, t, { tc0: 7440, y0: 380, y1: 1500 })
  }

  function pisces(t) {
    drawBooth(x, t, { sign: 'pisces', dim: 0.5, ring: 0.4 })
    boomOp(x, t, { tears: 0, mood: 'neutral', who: 'stage', glyph: false, op: [930, 560] })
    seat(x, t, 'pisces', { ...SUBJ, hops: [T.pis[0] + 0.2, T.pis[0] + 0.8] }, { mood: 'wide', look: [0, 1], tears: 4, seed: 6 })
    drawChairFront(x)
    // the phone: a duck finds its friend
    x.save(); x.translate(SUBJ.x + 200, SUBJ.y + 100); x.rotate(0.12)
    x.fillStyle = INK; rr(x, -120, -180, 240, 360, 30); x.fill(); x.fillStyle = '#9fd6ff'; rr(x, -104, -164, 208, 328, 22); x.fill()
    x.fillStyle = '#4a8ad8'; x.fillRect(-104, 40, 208, 124)
    const DUCK = ['.YY..', 'YYYO.', '.YYY.', 'YYYYY']
    const m = Math.min(1, prog(t, T.pis[0] + 0.3, T.pis[0] + 1.6))
    drawBits(x, DUCK, { Y: '#ffd94a', O: '#ff8a2a' }, lerp(-60, -24, m), 20, 14)
    drawBits(x, DUCK, { Y: '#ffd94a', O: '#ff8a2a' }, lerp(60, 26, m), 20, 14, { sx: -1 })
    if (m >= 1) { x.fillStyle = PINK; x.fillRect(-8, -60, 16, 16); x.fillRect(-16, -68, 12, 12); x.fillRect(4, -68, 12, 12) }
    x.restore()
    if (t > T.pis[0] + 1.6) sparkles(x, t, SUBJ.x + 200, SUBJ.y + 40, T.pis[0] + 1.6, 8, 140, 1, [PINK, GOLD, BONE])
    recChrome(x, t, { tc0: 7448, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      if (t >= T.pis[0] && t < T.pis[1]) pisces(t); else grid(t)
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, whipZoom(WHIP), whipZoom(WHIP2), whipZoom(WHIP3), slamTitle(HOOK)]
export const CUES = [
  ['tom', 0.02, 110, { gain: 0.25, decay: 0.25 }], ['tick', 0.0, 0.08],
  ...whipZoomCues(WHIP), ...whipZoomCues(WHIP2), ...whipZoomCues(WHIP3), ...slamTitleCues(HOOK), ...capCues(CAPS),
  ...TALK.map((a, i) => ['pluck', a - 0.05, [659.25, 783.99, 880, 987.77][i], 0.025, 0.4, (i % 2 ? 0.4 : -0.4)]),
  ...sobCues(T.pis[0] + 0.3, 5, 0.38), ['glitter', T.pis[0] + 1.6, T.pis[0] + 2.0],
  ...T.dark.map((d, i) => ['tick', d, 0.06]), ...T.dark.map((d, i) => ['pop', d + 0.02, [523.25, 440, 392, 329.63][i], 0.03, 0]),
  ['tick', T.tick, 0.08],
  ['pop', T.last, 783.99, 0.04, 0], ['bell', T.last + 0.05, 1567.98, 0.022, 1.0, 0],
]
