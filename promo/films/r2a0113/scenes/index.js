// r2a0113: star_advice, ADVICE SOLO, "How to apologise | to a Scorpio." (~46 s vertical, signs3kit social cut, lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable truth about making up with a Scorpio + a warm
// reframe, one gag each.
//   0.0–3.6    "How to apologise | *to a Scorpio.*"
//   3.6–37.8   skip the text, say it face to face · be specific (they kept notes) · no "sorry if", just sorry
//              · give them space (like, two feet) · bring a warm drink · they'll go quiet, wait it out kindly
//              · mean it, they can tell · ask what they need, then listen · forgiven? back in their top matches
//  37.8        "Deep feelings. | *Deeper loyalty.*"
//  41.2        CALLBACK: "And the notes? | Filed: *forgiven.*"  The notebook comes back, stamped FORGIVEN.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, chat, RED, CREAM, ORANGE, SAGE, WOOD, BROWN, MUG, HEARTBM } from './props.js'

const PLUM = '#d0559a'
const GLASS = ['..KKKKK...', '.KHHHHHK..', 'KHHHHHHHK.', 'KHHHHHHHK.', 'KHHHHHHHK.', '.KHHHHHK..', '..KKKKK...', '..KHHHK...', '...KHK....', '..KHHHK...', '.KHHHHHK..', 'KHHHHHHHK.', 'KHSSSSSHK.', '.KSSSSSK..', '..KKKKK...']

// the notebook: dated entries, optional FORGIVEN stamp
function notebook(x, cx, cy, k, lt, { stamp = 0, rot = 0.03 } = {}) {
  card(x, cx, cy, 320, 360, CREAM, { k, rot }, x => {
    x.fillStyle = '#b0386b'; x.fillRect(-160, -180, 30, 360)
    txt(x, 'NOTES', 20, -138, 28, '#b0386b', { font: MONO, weight: 700 })
    const rows = ['3/14 8:02pm', 'said "fine"', 'tone: off', 'see p.2']
    const n = Math.floor(prog(lt, 0.3, 1.4) * 4) + (stamp ? 4 : 0)
    rows.slice(0, n).forEach((s, i) => txt(x, s, -110, -78 + i * 54, 26, INK, { font: MONO, weight: 700, align: 'left' }))
    if (stamp > 0.01) {
      x.save(); x.rotate(-0.25); x.scale(stamp, stamp); x.globalAlpha = 0.92
      x.strokeStyle = '#2f9a4a'; x.lineWidth = 8; x.strokeRect(-140, -40, 280, 80)
      txt(x, 'FORGIVEN', 0, 4, 46, '#2f9a4a')
      x.restore()
    }
  })
}

const S = 'scorpio'
const CAMEOS = [
  { sign: S, cap: 'Skip the text. | *Say it face to face.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.15, 0.3, 2), (x, w, h) => {
        chat(x, 'sry', w / 2 - 14, -h / 2 + 80, { right: true, col: LAV, size: 26 })
        if (lt > 0.9) { x.fillStyle = RED; x.fillRect(-w / 2 + 20, -h / 2 + 76, w - 40, 8) }
        if (lt > 1.2) txt(x, 'DECLINED', 0, 30, 34, RED, { font: MONO, weight: 700 })
      })
      label(x, 790, 1110, 'IN PERSON ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Be specific. | *They kept notes.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notebook(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 640, 'VOLUME 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PLUM, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No “sorry if…” | *Just sorry.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 820, 340, 170, BONE, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: -0.03 }, x => {
        txt(x, 'sorry if…', 0, 0, 52, INK)
        if (lt > 0.9) { x.fillStyle = RED; x.fillRect(-150, -6, 300 * prog(lt, 0.9, 1.2), 10) }
      })
      label(x, 790, 1040, 'SORRY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 60, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Give them space. | *Like, two feet.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), ext = ease.outCubic(prog(lt, 0.4, 1.1))
      if (k > 0.01) signChar(x, t, 'cancer', 830, 900, 200 * k, { mood: 'neutral', look: [-1, 0], seed: 21, glyph: false })
      const w = lerp(20, 340, ext)
      x.fillStyle = INK; x.fillRect(460, 1060, w + 8, 44); x.fillStyle = GOLD; x.fillRect(464, 1064, w, 36)
      x.fillStyle = INK; for (let i = 0; i < w / 20; i++) x.fillRect(468 + i * 20, 1064, 3, i % 5 ? 12 : 22)
      label(x, 640, 640, 'NOT TOO FAR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bring a warm drink. | *It helps.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: BONE, C: BROWN }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { x.fillStyle = `rgba(239,230,214,${0.55 * Math.sin(Math.PI * ((t * 0.8 + i / 3) % 1))})`; x.fillRect(730 + i * 45, 760 - ((t * 60 + i * 40) % 110), 14, 40) }
      label(x, 790, 1100, 'PEACE OFFERING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 780, P.t0 + 1.3, { n: 3, life: 1.4, spread: 100, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'They go quiet? | *Wait it out, kindly.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: INK, H: 'rgba(200,236,255,0.5)', S: GOLD }, 790, 860, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: Math.sin(t * 1.5) * 0.04 })
      label(x, 790, 1110, 'STILL HERE ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mean it. | *They can tell.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 840, 340, 260, '#1c1640', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        x.strokeStyle = MINT; x.lineWidth = 6; x.beginPath()
        for (let i = 0; i <= 60; i++) { const px = -150 + i * 5, a = i < 25 ? 40 : 6; const py = Math.sin(i * 1.3 + t * 8) * a * (lt > 0.9 ? (i < 25 ? 1 : 0.4) : 1); i ? x.lineTo(px, py - 20) : x.moveTo(px, py - 20) }
        x.stroke()
        txt(x, 'SINCERITY SCAN', 0, -100, 22, MINT, { font: MONO, weight: 700 })
        if (lt > 1.2) txt(x, 'GENUINE ✓', 0, 90, 34, GOLD, { font: MONO, weight: 700 })
      })
    } },
  { sign: S, cap: 'Ask what they need. | *Then listen.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'what do | you need?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      label(x, 790, 940, 'LISTENING…', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Forgiven? | Back in *their top matches.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 850, 330, 360, '#2a2350', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        txt(x, '✦ TOP MATCHES', 0, -140, 24, LAV, { font: MONO, weight: 700 })
        const up = ease.inOutCubic(prog(lt, 0.7, 1.3))
        ;['taurus', 'cancer', 'pisces'].forEach((id, i) => {
          const y = -70 + i * 90 + (i === 0 ? 0 : 0)
          x.fillStyle = '#140c30'; x.fillRect(-140, y - 38, 280, 76)
          signChar(x, t, id, -96, y + 4, 64, { mood: 'happy', seed: 60 + i, glyph: false, glow: 0.4, tears: id === 'pisces' ? 1 : 0 })
          txt(x, id.toUpperCase(), 20, y, 22, BONE, { font: MONO, weight: 700 })
        })
        const yy = lerp(200, -70, up)
        x.fillStyle = INK; x.fillRect(-146, yy - 44, 292, 88); x.fillStyle = GOLD; x.fillRect(-140, yy - 38, 280, 76)
        txt(x, 'YOU ♡ #1', 20, yy, 28, INK, { font: MONO, weight: 700 })
        drawBits(x, HEARTBM, { H: RED, W: '#fff' }, -96, yy, 6)
      })
      sparkles(x, t, 790, 760, P.t0 + 1.3, 7, 170, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0113', key: 'C', accent: PLUM, solo: 'scorpio', ending: 'callback',
  title: 'How to apologise | *to a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Deep feelings. | *Deeper loyalty.*', mood: 'heart' },
  last: {
    text: 'And the notes? | Filed: *forgiven.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'scorpio', 360, 1080, 240 * k, { mood: lt > 1.5 ? 'heart' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      notebook(x, 700, 1070, pop01(t, t - lt + 0.6, 0.35, 2), 2.4, { stamp: pop01(t, t - lt + 1.3, 0.3, 2.6), rot: 0.05 })
      sparkles(x, t, 700, 1060, t - lt + 1.4, 8, 200, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
