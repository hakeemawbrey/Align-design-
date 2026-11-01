// trwronglang: WRONG ANSWERS ONLY, "What's your love language?" (20 s vertical, Star Talk Trends §17, music: chiptune · C).
// Story 0–15.6, then the shared end card. The format look lives in ./wrongkit.js (identical in all five).
//   0.0–2.3    hook: the question card "What's your | love *language?*" pops, the tape slaps on, ♉ ♊ ♏ hop.
//   2.3–5.0    ♉ TAURUS "Fluent in *snacks.*"  Fries, a donut, a cookie and a pretzel rain into a pile; Taurus is
//              heart-eyed: "say it with fries."
//   5.0–7.7    ♊ GEMINI "English, Spanish | and *sarcasm.*"  A chalkboard: hello · hola · "oh, GREAT." Gemini rolls its
//              eyes: "wow. love that."
//   7.7        card cut.
//   7.7–10.6   ♏ SCORPIO (the unhinged third) "Eye contact. *Unblinking.*"  A close-up: wide eyes, a NO-BLINK timer,
//              the date sweats… then stares right back.
//   10.6       the turn: Pisces sniffles "*sniff*… the real one?"
//   11.75      PISCES: "*All five,* please."  13.0 RIGHT ANSWER stamp. In the middle: five little cards fan out
//              (WORDS, TIME, GIFTS, HUGS, HELP) and all light up at once.
import { makeWrong, drawStarChar, R, box, bubble, label, shadow, sparkles, hearts, drawBits, starFrame, inSprite, pop01, outK, prog, lerp, clamp, ease, signStar, INK, BONE, GOLD, PINK, RED, INTER, MONO, PAPER, T } from './wrongkit.js'

const mate = (SIGN, seed) => (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: SIGN.color, glyph: o.s >= 150 ? SIGN.glyph : null, seed, glow: 1, ...o })
const libra = mate(signStar('libra'), 11), virgo = mate(signStar('virgo'), 13)

// ── ANSWER 1: fluent in snacks
const SNACKS = [
  { bm: ['R.R.R', 'RYRYR', 'RYRYR', 'RRRRR', 'RRRRR'], c: { R: '#e8344e', Y: '#ffd23a' } },                          // fries
  { bm: ['.DDD.', 'DPPPD', 'DP.PD', 'DPPPD', '.DDD.'], c: { D: '#c98a4a', P: '#ff8fb1' } },                          // donut
  { bm: ['.CCC.', 'CKCCC', 'CCCKC', 'CKCCC', '.CCC.'], c: { C: '#d9a35a', K: '#5a3520' } },                          // cookie
  { bm: ['B.B.B', 'BBBBB', '.B.B.', 'BBBBB', 'B.B.B'], c: { B: '#b06a2a' } },                                        // pretzel
]
function ans1(x, t, S) {
  const { u, t0, t1, hero } = S
  shadow(x, 540, 1150, 260)
  hero(x, t, { x: 540, y: 960, s: 250, mood: u > 0.5 ? 'heart' : 'happy', look: [0, -1], hops: [t0 + 0.3, t0 + 1.0, t0 + 1.7, t0 + 2.2] })
  for (let i = 0; i < 16; i++) {
    const at = 0.2 + i * 0.11, p = prog(u, at, at + 0.55)
    if (p <= 0) continue
    const sx = 540 + Math.sin(i * 2.9) * 380, ex = 540 + (i % 2 ? 1 : -1) * (170 + (i * 37) % 170), ey = 1120 - Math.floor(i / 4) * 34 - (i % 3) * 10
    const px = lerp(sx, ex, p), py = lerp(380, ey, ease.inQuad(p)) - Math.sin(Math.PI * p) * 40
    const sn = SNACKS[i % 4]
    drawBits(x, sn.bm, sn.c, px, py, 13, { rot: (1 - p) * (i % 2 ? 2 : -2) })
  }
  bubble(x, t, 560, 730, t0 + 1.8, t1, 'say it with fries.', { size: 34, tail: 0 })
}

// ── ANSWER 2: English, Spanish, and sarcasm
function ans2(x, t, S) {
  const { u, t0, t1, hero } = S
  const CX = 540, top = 430
  box(x, CX - 330, top, 660, 360, '#24453a', { b: 10 })
  R(x, '#8a5a3c', CX - 340, top + 360, 680, 16)
  const words = [['hello', 0.3], ['hola', 0.8], ['oh, GREAT.', 1.3]]
  words.forEach(([w, at], i) => {
    const p = prog(u, at, at + 0.35)
    if (p <= 0) return
    x.save(); x.beginPath(); x.rect(CX - 300, top + 30 + i * 105, 600 * p, 100); x.clip()
    x.font = i === 2 ? `italic 500 76px 'EB Garamond'` : `700 54px ${MONO}`; x.fillStyle = i === 2 ? '#ffe27a' : '#e8f0e8'; x.textBaseline = 'middle'
    x.fillText(w, CX - 280, top + 85 + i * 105); x.restore()
  })
  if (u > 1.7) { x.save(); x.strokeStyle = '#ffe27a'; x.lineWidth = 6; x.beginPath(); x.ellipse(CX - 80, top + 295, 230, 56, -0.03, 0, Math.PI * 2 * ease.outCubic(prog(u, 1.7, 2.0))); x.stroke(); x.restore() }
  shadow(x, 540, 1150, 220)
  hero(x, t, { x: 540, y: 990, s: 230, mood: u > 1.3 ? 'eyeroll' : 'happy', look: [0, -1], hops: [t0 + 0.35, t0 + 0.85, t0 + 1.35] })
  bubble(x, t, 760, 850, t0 + 1.9, t1, 'wow. love that.', { size: 32, tail: -0.5 })
}

// ── ANSWER 3: eye contact, unblinking
function ans3(x, t, S) {
  const { u, t0, t1, hero } = S
  // a slow push-in on Scorpio
  const z = lerp(1, 1.35, ease.inOutCubic(prog(u, 0, 2.6)))
  x.save(); x.translate(380, 880); x.scale(z, z); x.translate(-380, -880)
  hero(x, t, { x: 380, y: 880, s: 340, mood: 'wide', look: [1, 0], blink: 0, bob: 2, glyph: null })
  x.restore()
  // the date: holds, sweats, then stares right back
  const back = u > 1.8
  virgo(x, t, { x: 850, y: 1000, s: 190, mood: back ? 'wide' : 'neutral', look: [-1, 0], blink: back ? 0 : undefined, hops: [t0 + 1.8] })
  if (!back) for (let i = 0; i < 3; i++) { const p = ((t * 1.3 + i / 3) % 1); drawBits(x, ['.S.', 'SSS', '.S.'], { S: '#8fe3ff' }, 905 + i * 12, 930 + p * 60, 5, { alpha: 1 - p }) }
  // the eye-line
  x.save(); x.globalAlpha = 0.5 + 0.3 * Math.sin(t * 12); R(x, '#ff5a6e', 520, 862, 260, 4); R(x, '#ff5a6e', 520, 878, 260, 4); x.restore()
  // the NO-BLINK timer
  const s = Math.floor(u * 7)
  box(x, 640, 470, 360, 110, '#1a1430', { b: 6 })
  label(x, 'NO BLINK', 820, 500, { size: 24, col: '#ff8fa0' })
  label(x, `0:${String(s).padStart(2, '0')}`, 820, 550, { size: 48, col: BONE })
  if (back) bubble(x, t, 850, 800, t0 + 1.9, t1, '…oh, it’s ON.', { size: 32, tail: 0 })
}

// ── the finale: all five
const ICONS = [
  { lab: 'WORDS', bm: ['BBBBBBB', 'BDBDBDB', 'BBBBBBB', '.B.....'], c: { B: BONE, D: INK } },
  { lab: 'TIME', bm: ['.YYYYY.', 'YYYKYYY', 'YYYKYYY', 'YYYKKYY', 'YYYYYYY', '.YYYYY.'], c: { Y: '#ffe27a', K: INK } },
  { lab: 'GIFTS', bm: ['..R.R..', '...R...', 'PPPRPPP', 'PPPRPPP', 'PPPRPPP'], c: { P: '#c9a6ff', R: '#e8344e' } },
  { lab: 'HUGS', bm: ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], c: { H: '#ff5c8a' } },
  { lab: 'HELP', bm: ['.S.S.', 'MMMMM', 'MMMMMM', 'MMMM.M', '.MMM.'], c: { S: BONE, M: '#7fd0ff' } },
]
function finale(x, t, S) {
  const { ok } = S
  ICONS.forEach((ic, i) => {
    const k = pop01(t, T.undock[0] + 0.2 + i * 0.09, 0.4, 2.4) * ok
    if (k <= 0.01) return
    const a = (i - 2) * 0.2, cx = 540 + (i - 2) * 150, cy = 960 + Math.abs(i - 2) * 30 - 6 * Math.sin(t * 3 + i)
    const lit = t > T.right + 0.1 * i
    x.save(); x.translate(cx, cy); x.rotate(a); x.scale(k, k)
    if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 10, 0, 0, 140); g.addColorStop(0, 'rgba(255,226,122,0.3)'); g.addColorStop(1, 'rgba(255,226,122,0)'); x.fillStyle = g; x.fillRect(-140, -140, 280, 280); x.restore() }
    box(x, -68, -98, 136, 196, lit ? '#2a1f55' : '#1f1840', { b: 5 })
    R(x, lit ? GOLD : '#4a3d80', -60, -90, 120, 6)
    drawBits(x, ic.bm, ic.c, 0, -18, 12)
    x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = lit ? GOLD : '#9b90c8'; x.fillText(ic.lab, 0, 72)
    x.restore()
  })
  hearts(x, t, T.right + 0.5, 540, 820, { n: 7, spread: 400 })
  sparkles(x, t, 540, 1000, T.right + 0.3, 12, 300, 2, [GOLD, PINK, BONE])
}

const EP = makeWrong({
  q: 'What’s your | love *language?*', deep: '#b8326a',
  answers: [
    { sign: 'taurus', text: '“Fluent in *snacks.*”', draw: ans1,
      cues: [...Array.from({ length: 16 }, (_, i) => ['tick', +(0.75 + i * 0.11).toFixed(3), 0.03]), ['pluck', 0.55, 1174.66, 0.03, 0.5, 0], ['pop', 1.8, 659.25, 0.035, 0.1]] },
    { sign: 'gemini', text: '“English, Spanish, | and *sarcasm.*”', draw: ans2,
      cues: [['tick', 0.3, 0.04], ['tick', 0.8, 0.04], ['tick', 1.3, 0.05], ['pop', 1.32, 1567.98, 0.035, 0], ['whoosh', 1.7, 0.3, 0.02], ['pop', 1.9, 880, 0.035, 0.4]] },
    { sign: 'scorpio', text: '“Eye contact. | *Unblinking.*”', draw: ans3, pis: { look: [-1, -1], mood: 'wide' },
      cues: [['riser', 0.0, 1.8, 0.02], ...Array.from({ length: 6 }, (_, i) => ['tick', +(0.15 + i * 0.29).toFixed(3), 0.025]), ['pop', 1.8, 1318.51, 0.045, 0.4], ['pop', 1.9, 587.33, 0.035, 0.4]] },
  ],
  hookBubbles: ['snacks?', 'ooh me!', '…me.'],
  speaker: 'PISCES', askY: 760, ask: '*sniff*… the real one?',
  last: '*All five,* please.',
  finale,
  finaleCues: [...[0, 1, 2, 3, 4].map(i => ['pop', +(T.undock[0] + 0.22 + i * 0.09).toFixed(3), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.03, (i - 2) * 0.3]), ['bell', +(T.right + 0.3).toFixed(3), 2349.32, 0.025, 1.0, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, clamp, starFrame, inSprite, libra, RED, PAPER, INTER]
