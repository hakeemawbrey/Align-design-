// nwfe11: WAIT FOR IT, "Sent the true part." (20 s vertical trial reel, Wait for It Vol. 2 ep 11, music: screwed · Ebm)
// Story 0–15.6, then the shared end card. The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Gemini is typing | *a reply.*" + "wait for it…". ♊ Gemini, mid-tap, types into a giant phone; the
//             draft fills with lines. ♋ Cancer waits on the right for the reply.
//   3.95–9.3  "It's writing | *a novel…*"  Stickers: "typing… *typing…*" · "deleted it. *typing again*" ·
//             "…it's *four screens long?!*". The draft is wiped, refills, and the scrollbar shrinks to a sliver.
//   9.45      card cut.
//   9.5–13.4  "What did it send? | *Three words.*"  On the drop the draft collapses into one sent bubble: "I like you."
//             ♊ GEMINI: "wrote a novel. sent *the true part*."
//   13.45–15.5 "Sent the *true* part."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, pop01, outK, popOut, r3, plate, sparkles, snowfall, INTER, MONO } from '../../nwfe01/scenes/wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const PH = { x: 545, y: 990, w: 280, h: 440 }
const WIPE = 6.0

/** draft fill 0…1 (lines of the draft on screen) and the scroll "length" (screens) */
function draft(t, T) {
  if (t < WIPE) return { fill: clamp(0.15 + t / 5.2), screens: 1 + Math.max(0, (t - 3) * 0.3) }
  const f = clamp((t - WIPE - 0.25) / 1.6)
  return { fill: f, screens: f < 1 ? 1 : 1 + 3 * clamp((t - WIPE - 1.85) / 1.2) }
}

function phone(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const { x: cx, y: cy, w, h } = PH
  x.save(); x.globalAlpha = k
  x.translate(cx, cy); x.rotate(-0.04 + 0.01 * Math.sin(t * 1.3))
  R(x, INK, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20); R(x, '#3a3a5a', -w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  R(x, '#f4f1fa', -w / 2 + 8, -h / 2 + 30, w - 16, h - 60)
  R(x, INK, -30, -h / 2 + 10, 60, 10)
  // header: a generic contact chip
  R(x, '#e2dcf0', -w / 2 + 8, -h / 2 + 30, w - 16, 50)
  R(x, '#9fd8ff', -w / 2 + 20, -h / 2 + 40, 30, 30)
  x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('♋︎ Cancer', -w / 2 + 60, -h / 2 + 56)
  const sent = t >= T.reveal
  if (!sent) {
    // the received message at the top
    R(x, '#ffffff', -w / 2 + 20, -h / 2 + 96, 170, 44); R(x, INK, -w / 2 + 20, -h / 2 + 140, 170, 3)
    x.font = `500 22px ${INTER}`; x.fillStyle = INK; x.fillText('do you like me?', -w / 2 + 30, -h / 2 + 119)
    // the draft: grey lines in a typing box
    const d = draft(t, T)
    const lines = Math.floor(d.fill * 9)
    R(x, '#d8ecff', -w / 2 + 20, -h / 2 + 160, w - 40, 250)
    for (let i = 0; i < lines; i++) R(x, '#7a8aa8', -w / 2 + 34, -h / 2 + 176 + i * 26, (w - 80) * (0.55 + 0.45 * ((i * 37) % 10) / 10), 10)
    if (Math.floor(t * 3) % 2 === 0) R(x, INK, -w / 2 + 34 + (lines ? 120 : 0), -h / 2 + 172 + lines * 26, 4, 20)
    // scrollbar (longer draft → thinner thumb)
    const th = 230 / d.screens
    R(x, '#c9c3dc', w / 2 - 22, -h / 2 + 164, 8, 240); R(x, '#7a5ac8', w / 2 - 22, -h / 2 + 164 + (240 - th) * clamp(d.fill), 8, th)
    // "deleted" flash
    const dk = clamp(1 - Math.abs(t - WIPE - 0.1) / 0.25)
    if (dk > 0.01) { x.save(); x.globalAlpha *= dk; R(x, '#ff6262', -w / 2 + 20, -h / 2 + 160, w - 40, 250); x.restore() }
  } else {
    R(x, '#ffffff', -w / 2 + 20, -h / 2 + 96, 170, 44)
    x.font = `500 22px ${INTER}`; x.fillStyle = INK; x.fillText('do you like me?', -w / 2 + 30, -h / 2 + 119)
    const a = pop01(t, T.reveal + 0.05, 0.4, 2.2)
    x.save(); x.translate(w / 2 - 110, 30); x.scale(a, a)
    R(x, INK, -100, -38, 200, 76); R(x, '#7a5ac8', -96, -34, 192, 68)
    x.font = `800 30px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.fillText('I like you.', 0, 2)
    x.restore()
    x.font = `700 16px ${MONO}`; x.fillStyle = '#7a7a9a'; x.textAlign = 'right'
    x.globalAlpha *= clamp(prog(t, T.reveal + 0.6, T.reveal + 0.8)); x.fillText('sent', w / 2 - 20, 90)
  }
  x.restore()
}

// Gemini's tapping thumb (hook + build)
function thumb(x, t, T, ctx) {
  if (!ctx.hero || t > T.reveal) return
  const H = ctx.hero
  const tap = Math.abs(Math.sin(t * 11))
  const tx = PH.x - 70 + 40 * Math.sin(t * 3.7), ty = PH.y + 120 + 12 * tap
  x.save(); x.globalAlpha = clamp(popOut(t, T.out))
  x.strokeStyle = INK; x.lineWidth = 26; x.beginPath(); x.moveTo(H.x + 90, H.F.cy + 10); x.lineTo(tx, ty); x.stroke()
  x.strokeStyle = '#ffd27a'; x.lineWidth = 16; x.beginPath(); x.moveTo(H.x + 90, H.F.cy + 10); x.lineTo(tx, ty); x.stroke()
  x.restore()
}

const EP = makeEpisode({
  id: 'nwfe11', key: 'Ebm', seed: 4711,
  hero: { sign: 'gemini', lineColor: '#ffe28a' },
  date: { sign: 'cancer' },
  pos: { hero: { x: 195, y: 1085, s: 220 }, date: { x: 915, y: 1090, s: 200 }, pis: { x: 990, y: 640, s: 110 } },
  h0: 'Gemini is typing | *a reply.*', h0Accent: '#ffe28a',
  h1: 'It’s writing | *a novel…*',
  h2: 'What did it send? | *Three words.*', h2Accent: PINK,
  last: 'Sent the *true* part.', lastAccent: GOLD,
  stickers: ['typing… *typing…*', 'deleted it. *typing again*', '…it’s *four screens long?!*'],
  line: { who: 'hero', text: 'wrote a novel. sent *the true part*.' },
  focus: { x: PH.x, y: 980 },
  glow: { x: PH.x + 30, y: 1000 },
  moods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: t > WIPE && t < WIPE + 0.6 ? 'wide' : 'squint', look: [1, 0.8] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: t > T.stk[2] ? 'wide' : 'neutral', look: [-1, 0.2], squash: 0.02 * Math.sin(t * 20) }
    if (ph === 'reveal' && t > T.reveal + 0.5) return { mood: 'heart', look: [-1, 0] }
    return null
  },
  back(x, t, T) { snowfall(x, t, { n: 18, seed: 16, alpha: 0.35 * clamp(popOut(t, T.out)), y1: 940, speed: 0.5 }) },
  mid(x, t, T) {
    phone(x, t, T)
    const D = { x: 915, y: 1090 }
    const wk = clamp(popOut(t, T.out)) * outK(t, [T.reveal, T.reveal + 0.15])
    if (wk > 0.01) plate(x, 'waiting…', D.x, D.y + 150, { size: 24, bg: BONE, alpha: wk })
  },
  front(x, t, T, ctx) {
    thumb(x, t, T, ctx)
    sparkles(x, t, PH.x + 30, PH.y + 30, T.reveal + 0.1, 12, 200, 1, [GOLD, '#7a5ac8', BONE])
  },
  cues: T => [
    ...Array.from({ length: 40 }, (_, i) => ['tick', r3(0.1 + i * 0.22), 0.008]).filter(c => c[1] < T.stall && Math.abs(c[1] - WIPE - 0.1) > 0.2),
    ['whoosh', r3(WIPE), 0.3, 0.035], ['pop', r3(WIPE + 0.05), 261.63, 0.03, 0],
    ['whoosh', r3(T.reveal + 0.02), 0.25, 0.04], ['pop', r3(T.reveal + 0.1), 1567.98, 0.04, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [lerp, ease]
