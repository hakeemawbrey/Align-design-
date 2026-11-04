// nhse16: HOLIDAY SURVIVAL GUIDE No. 16, "The quiet one" (28 s vertical, star_advice post, music: dreamy · Ab).
// The show look lives in ../../nhse13/scenes/survkit.js. Story 0–25.6, then the shared 2.4 s short end card.
//   0.0–5.4    hook "Your friend went | *quiet.*" Frame 0: ♈ Aries on a beanbag mid-scroll through a buzzing group chat
//              (party plans, gift lists, a dog photo); ♏ Scorpio's last bubble sits at the top: "4 DAYS AGO".
//              ♓ Pisces on the rug, crying at a cookie video. SITUATION: "december is hard for them."
//   5.4–9.4    1 "Notice who's gone *quiet.*" The chat scrolls; a magnifier stops on SCORPIO · last message 4 days ago.
//   9.4–13.4   2 "Send a no-pressure text." A one-to-one chat: "no need to reply. thinking of you ♡" → SENT.
//   13.4–17.4  3 "Offer something *specific.*" "walk on thursday? I'll bring cocoa." Typing… "yes. thank you."
//   17.4–25.6  THE STARS: "some people find december *heavy.*" A snowy path: Aries and Scorpio walking with two cocoas,
//              Scorpio smiling a little; Pisces on a bench, happy-crying. endHead "Thursday. | *Two* cocoas."
//              Last line: "Check on the | *quiet* ones."
import { makeSurvival, R, box, drawBits, label, bubble, star, pisces, sparkles, hearts, snow, room, phone, mug, windowPane, lerp, prog, ease, clamp, pop01, outK, INK, BONE, GOLD, RED, PINK, MINT, INTER, MONO, PANEL, drawPixelStar } from '../../nhse13/scenes/survkit.js'

const P = PANEL
const FLOOR = 1120
const ARI = 'aries', SCO = 'scorpio'
const ACC = '#ff8f9a'

function bedroom(x, t) {
  room(x, { wall: '#262250', floor: '#3e3466', floorY: FLOOR })
  windowPane(x, 820, 620, 200, 190, t)
  // fairy lights along the top
  for (let i = 0; i < 16; i++) { const on = Math.sin(t * 2.5 + i * 1.3) > -0.2; R(x, on ? [GOLD, PINK, '#7fd0ff'][i % 3] : '#5a5470', P.x + 30 + i * 58, P.y + 30 + 10 * Math.sin(i * 0.9), 12, 12) }
}
function beanbag(x, cx, base, col = '#c8604a') {
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, base - 60, 166, 76, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, base - 62, 158, 68, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.15)'; x.beginPath(); x.ellipse(cx - 40, base - 90, 80, 22, -0.2, 0, Math.PI * 2); x.fill()
}
const GROUP = [
  { side: 'L', name: 'SCORPIO', nameCol: '#e23d66', text: 'see you all soon', at: -9 },
  { side: 'L', name: 'LEO', nameCol: '#f39a3a', text: 'PARTY AT MINE SAT!!', at: -8 },
  { side: 'L', name: 'GEMINI', nameCol: '#f2cf4a', text: 'what do we bring', at: -7 },
  { side: 'L', name: 'SAG', nameCol: '#a35cf0', text: 'snacks. obviously', at: 0.6 },
  { side: 'R', text: 'i call dibs on the dip', at: 1.6 },
  { side: 'L', name: 'GEMINI', nameCol: '#f2cf4a', text: 'look at this dog in a hat', at: 2.6 },
]

function set(x, t, S) {
  if (!S.end) {
    bedroom(x, t)
    beanbag(x, 330, FLOOR + 40)
    star(x, t, ARI, { x: 330, y: 960, s: 210, mood: t < 3.2 ? 'neutral' : 'squint', look: [1, -1], hops: [0.6, 1.6, 2.6] })
    pisces(x, t, { x: 140, y: 1090, s: 115, tears: 2, mood: 'wide', look: [1, -1], tissue: true })
    // Pisces' little phone (the cookie video)
    box(x, 176, 1040, 46, 70, '#2a2148', { b: 4 }); drawBits(x, ['.CC.', 'CCCC', 'CDCC', '.CC.'], { C: '#c98a4a', D: '#5a3a22' }, 199, 1072, 6)
    phone(x, t, { cx: 735, cy: 830, w: 470, h: 660, title: 'the crew ✦', msgs: GROUP, accent: '#ff8f9a', rot: 0.03, size: 27 })
    // the "4 DAYS AGO" stamp on Scorpio's old bubble
    if (t > 3.2) label(x, '4 DAYS AGO', 740, 600, { size: 26, col: '#ff9a9a', font: MONO, weight: 700, alpha: pop01(t, 3.2, 0.25, 2) * outK(t, [5.0, 5.3]) })
    return
  }
  // the ending: a snowy path, two cocoas
  const u = S.u
  R(x, '#1a1840', P.x, P.y, P.w, P.h)
  for (let i = 0; i < 10; i++) drawPixelStar(x, P.x + 40 + ((i * 131) % (P.w - 80)), P.y + 30 + ((i * 61) % 180), 12, 1, BONE)
  // trees + lamp post
  for (const tx of [160, 920]) { x.fillStyle = INK; x.beginPath(); x.moveTo(tx - 90, 980); x.lineTo(tx, 640); x.lineTo(tx + 90, 980); x.fill(); x.fillStyle = '#2a6a4a'; x.beginPath(); x.moveTo(tx - 80, 970); x.lineTo(tx, 660); x.lineTo(tx + 80, 970); x.fill(); R(x, '#f4f8ff', tx - 50, 860, 100, 10); R(x, '#f4f8ff', tx - 30, 760, 60, 8) }
  R(x, INK, 760, 640, 14, 440); box(x, 742, 610, 50, 40, '#ffe2a0', { b: 5 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(767, 630, 10, 767, 630, 260); g.addColorStop(0, 'rgba(255,226,160,0.3)'); g.addColorStop(1, 'rgba(255,226,160,0)'); x.fillStyle = g; x.fillRect(500, 380, 540, 540); x.restore()
  R(x, '#dfe8f6', P.x, FLOOR - 40, P.w, P.y + P.h - FLOOR + 40); R(x, '#c4cfe4', P.x, FLOOR + 10, P.w, 50)
  snow(x, t, { X: P.x, Y: P.y, w: P.w, h: P.h, n: 34, speed: 40, seed: 16 })
  // a bench with Pisces
  box(x, 820, 1000, 170, 24, '#8a5a3a', { b: 4 }); R(x, INK, 836, 1024, 14, 50); R(x, INK, 960, 1024, 14, 50)
  pisces(x, t, { x: 905, y: 950, s: 120, tears: 3, mood: 'happy', look: [-1, 0], tissue: true })
  const walk = ease.inOutQuad(prog(u, 0, 4))
  const cx = lerp(300, 470, walk)
  star(x, t, ARI, { x: cx - 100, y: 1010, s: 200, mood: 'happy', look: [1, 0], hops: [17.8, 18.4, 19.0, 19.6, 21.5] })
  star(x, t, SCO, { x: cx + 100, y: 1010, s: 200, mood: u > 1.5 ? 'happy' : 'neutral', look: [-1, 0], hops: [18.1, 18.7, 19.3, 21.55] })
  mug(x, cx - 10, 1040, '#e8344e', 1, t); mug(x, cx + 200, 1040, '#38c4ec', 1, t)
  hearts(x, t, 19.4, cx, 860, { n: 4 })
}

// ── step 1: notice who's gone quiet
function step1(x, t, S) {
  const u = S.u
  bedroom(x, t)
  const sc = ease.inOutCubic(prog(u, 0, 1.4))
  const msgs = [
    ...GROUP,
    { side: 'L', name: 'LEO', nameCol: '#f39a3a', text: 'secret gifts! $20 max', at: S.t0 + 0.2 },
    { side: 'L', name: 'SAG', nameCol: '#a35cf0', text: 'who is bringing a game', at: S.t0 + 0.5 },
    { side: 'L', name: 'GEMINI', nameCol: '#f2cf4a', text: 'me!! and a second game', at: S.t0 + 0.8 },
  ]
  phone(x, t, { cx: 540, cy: 830, w: 560, h: 760, title: 'the crew ✦', msgs: msgs.map(m => ({ ...m, at: m.at < 0 ? -9 : m.at })), accent: '#ff8f9a', size: 26 })
  // the member list strip: everyone's avatar dot, Scorpio's grey
  const names = [['♈︎', '#f0603a'], ['♌︎', '#f39a3a'], ['♊︎', '#f2cf4a'], ['♐︎', '#a35cf0'], ['♓︎', '#7c74f0'], ['♏︎', '#6a6488']]
  names.forEach(([g, c], i) => { box(x, 290 + i * 90, 470, 64, 64, c, { b: 5 }); label(x, g, 322 + i * 90, 503, { size: 34, col: BONE, stroke: null }) })
  // the magnifier stops on Scorpio
  const mp = ease.inOutCubic(prog(u, 0.6, 1.6))
  const mx = lerp(300, 772, mp), my = 502
  x.save(); x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.arc(mx, my, 56, 0, Math.PI * 2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 8; x.stroke()
  x.lineWidth = 18; x.strokeStyle = INK; x.beginPath(); x.moveTo(mx + 40, my + 40); x.lineTo(mx + 90, my + 90); x.stroke(); x.restore()
  if (u > 1.7) bubble(x, t, 760, 640, S.t0 + 1.7, S.t1, 'last message: 4 days ago', { size: 28, col: '#ffd6dc', tail: 0.2 })
  star(x, t, ARI, { x: 200, y: 1150, s: 170, mood: u > 1.7 ? 'wide' : 'neutral', look: [1, -1], hops: [S.t0 + 1.7] })
  void sc
}

// ── step 2: a no-pressure text
function step2(x, t, S) {
  const u = S.u
  bedroom(x, t)
  const msgs = [{ side: 'R', text: 'no need to reply. thinking of you ♡', at: S.t0 + 1.2 }]
  phone(x, t, { cx: 610, cy: 760, w: 500, h: 520, title: '♏︎ scorpio', msgs, accent: '#ff8f9a', size: 32 })
  // Aries typing with its thumb (the draft pops in as it types)
  if (u < 1.2) { const n = Math.floor(prog(u, 0.1, 1.1) * 34); box(x, 380, 1070, 460, 60, BONE, { b: 4 }); x.font = `600 25px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('no need to reply. thinking of you ♡'.slice(0, n), 396, 1100) }
  if (u > 1.25) label(x, 'SENT ✓', 740, 1080, { size: 28, col: MINT, font: MONO, weight: 700, alpha: pop01(u, 1.25, 0.25, 2) })
  star(x, t, ARI, { x: 230, y: 1060, s: 220, mood: u > 1.3 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 1.3] })
}

// ── step 3: offer something specific
function step3(x, t, S) {
  const u = S.u
  bedroom(x, t)
  const msgs = [
    { side: 'R', text: 'no need to reply. thinking of you ♡', at: -9 },
    { side: 'R', text: "walk on thursday? i'll bring cocoa.", at: S.t0 + 0.4 },
    { side: 'L', text: 'yes. thank you.', at: S.t0 + 2.2 },
  ]
  phone(x, t, { cx: 620, cy: 790, w: 500, h: 620, title: '♏︎ scorpio', msgs, accent: '#ff8f9a', size: 32, typing: [S.t0 + 1.0, S.t0 + 2.2] })
  const got = u > 2.2
  star(x, t, ARI, { x: 210, y: 1060, s: 190, mood: got ? 'sparkle' : 'neutral', look: [1, 0], hops: got ? [S.t0 + 2.25, S.t0 + 2.55] : [] })
  pisces(x, t, { x: 230, y: 760, s: 120, tears: got ? 3 : 1, mood: got ? 'happy' : 'wide', look: [1, 0] })
  if (got) sparkles(x, t, 700, 1000, S.t0 + 2.2, 10, 160, 2)
}

const EP = makeSurvival({
  no: 16,
  accent: ACC,
  hook: 'Your friend went | *quiet.*',
  situation: 'december is hard for them.',
  guide: 'How to survive: | *checking in.*',
  endHead: 'Thursday. | *Two* cocoas.',
  line: 'some people find december *heavy.*',
  last: 'Check on the | *quiet* ones.',
  set,
  steps: [
    { text: "Notice who's gone *quiet.*", draw: step1, cues: [['pop', 0.2, 880, 0.03, 0.3], ['pop', 0.5, 987.77, 0.03, 0.3], ['pop', 0.8, 1174.66, 0.03, 0.3], ['whoosh', 0.6, 1.0, 0.025], ['tick', 1.6, 0.06], ['pluck', 1.7, 659.25, 0.035, 0.6, 0.2]] },
    { text: 'Send a no-pressure text.', draw: step2, cues: [...Array.from({ length: 10 }, (_, i) => ['tick', +(0.1 + i * 0.1).toFixed(2), 0.015]), ['whoosh', 1.15, 0.25, 0.03], ['pop', 1.2, 1318.51, 0.04, 0.2]] },
    { text: 'Offer something *specific.*', draw: step3, cues: [['whoosh', 0.35, 0.25, 0.03], ['pop', 0.4, 1318.51, 0.04, 0.2], ['tick', 1.0, 0.02], ['tick', 1.13, 0.02], ['tick', 1.26, 0.02], ['pop', 2.2, 659.25, 0.045, -0.2], ['bell', 2.25, 1567.98, 0.03, 1.2, 0], ['glitter', 2.2, 2.7]] },
  ],
  cues: [['pop', 0.6, 880, 0.03, 0.3], ['pop', 1.6, 1318.51, 0.03, 0.3], ['pop', 2.6, 987.77, 0.03, 0.3], ['pluck', 3.2, 523.25, 0.03, 0.8, 0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, clamp]
