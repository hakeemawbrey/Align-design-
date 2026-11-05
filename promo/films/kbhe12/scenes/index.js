// kbhe12: BRAIN VS HEART, Ep 12 "The 12-Second Video" (12.4 s vertical, star_talk post, music: dreamy · Db). Hard cut.
// Inside ♓ Pisces' OWN head. The window: a 12-second puppy video. Pisces cries the whole time: tears run down the
// window (Pisces' eyes) and get heavier; the console cam shows THE STARS handing over tissues.
//   0.00   frame 0: mid whip zoom; Heart mid-sob into a tower of tissues, Brain holding a tiny umbrella. Title
//          "Inside Pisces' head: | a *puppy video.*"
//   1.00   BRAIN: "it's *twelve seconds* long. stay strong."   2.70 HEART: "the puppy has a *TINY* bandana."
//   4.00   a kitten wanders in. 6.00 (video 0:09) the puppy shares its toy: Heart fountains, the window streams.
//   6.60   Brain's lip wobbles. 7.20 BRAIN: "I'm fine. I'm *fine.*"   8.40 the video ends; HEART: "again?"
//   9.60   BRAIN, crying too: "Brain cried too. Don't tell *anyone.*"
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues } from '../../hookkit.js'
import { makeBuild, bubbleCues, key, stepObj, step, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO, SKYB } from '../../kbhe01/bhkit.js'

export const DURATION = 12.4
const SIGN = 'pisces'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "Inside Pisces' head: | a *puppy video.*", top: 168, size: 96 }
const SHAKE = { at: 0.3, len: 0.4, amp: 16 }
const SOB = { at: 6.0, len: 0.6, amp: 20 }
const T = { kitten: 4.0, share: 6.0, wobble: 6.6, end: 8.4, last: 9.6 }
const vt = t => Math.min(12, 3 + Math.max(0, t) * (9 / T.end)) // video time
const BUB = [
  { t0: 1.0, t1: 2.55, who: 'brain', x: 400, y: 1195, tail: -140, text: "it's *twelve seconds* long. stay strong.", size: 42, maxW: 560 },
  { t0: 2.7, t1: 3.95, who: 'heart', x: 680, y: 1195, tail: 140, text: 'the puppy has a *TINY* bandana.', size: 44, maxW: 520 },
  { t0: 7.2, t1: 8.3, who: 'brain', x: 390, y: 1195, tail: -130, text: "I'm fine. I'm *fine.*", size: 50 },
  { t0: 8.5, t1: 9.45, who: 'heart', x: 700, y: 1195, tail: 130, text: '*again?*', size: 56 },
  { t0: T.last, t1: 99, who: 'brain', x: 430, y: 1200, tail: -170, text: "Brain cried too. Don't tell *anyone.*", size: 46, maxW: 560 },
]

function pup(x, cx, cy, s, t, wag) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const B = '#e0a868', D = '#a86a38'
  R(x, INK, -64, -40, 128, 70); R(x, B, -58, -34, 116, 58)                        // body
  for (const lx of [-46, -18, 18, 46]) { R(x, INK, lx - 9, 20, 18, 34); R(x, B, lx - 5, 22, 10, 28) }
  x.save(); x.translate(-62, -24); x.rotate(-0.6 + 0.5 * Math.sin(t * (wag ? 22 : 6))); R(x, INK, -38, -8, 44, 16); R(x, B, -34, -4, 38, 8); x.restore()
  R(x, INK, 30, -86, 74, 70); R(x, B, 36, -80, 62, 58)                            // head
  R(x, INK, 26, -92, 22, 40); R(x, D, 30, -88, 14, 32); R(x, INK, 86, -92, 22, 40); R(x, D, 90, -88, 14, 32)
  R(x, INK, 52, -62, 8, 10); R(x, INK, 80, -62, 8, 10); R(x, INK, 94, -44, 12, 10)
  R(x, '#ff3b5c', 34, -26, 66, 12); R(x, '#fff', 44, -24, 8, 8); R(x, '#fff', 70, -24, 8, 8)   // the tiny bandana
  x.restore()
}
function kitten(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const C = '#9aa0b8'
  R(x, INK, -44, -30, 88, 54); R(x, C, -38, -24, 76, 42)
  R(x, INK, -70, -74, 60, 54); R(x, C, -64, -68, 48, 42)
  R(x, INK, -70, -90, 18, 22); R(x, C, -66, -86, 10, 16); R(x, INK, -28, -90, 18, 22); R(x, C, -24, -86, 10, 16)
  R(x, INK, -54, -54, 7, 9); R(x, INK, -34, -54, 7, 9)
  for (const lx of [-30, 26]) { R(x, INK, lx - 8, 18, 16, 24); R(x, C, lx - 4, 20, 8, 18) }
  x.restore()
}
function video(x, t, Rw) {
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#bfe6ff'); g.addColorStop(1, '#e8f6ff'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  R(x, '#9fd890', Rw.x, Rw.y + 380, Rw.w, 200)
  const kx = key(t, [[T.kitten, Rw.x + Rw.w + 80], [T.kitten + 1.2, 720, ease.outCubic]])
  const ballX = key(t, [[0, 520], [T.share - 0.3, 520], [T.share + 0.5, 640, ease.outCubic]])
  pup(x, 400, Rw.y + 380, 1.4, t, t > T.share)
  if (t > T.kitten) kitten(x, kx, Rw.y + 410, 1.4)
  x.fillStyle = INK; x.beginPath(); x.arc(ballX, Rw.y + 440, 26, 0, 7); x.fill(); x.fillStyle = '#ff5c7a'; x.beginPath(); x.arc(ballX, Rw.y + 440, 20, 0, 7); x.fill()
  if (t > T.share) { const k = pop01(t, T.share, 0.3, 2.4); x.save(); x.translate(560, Rw.y + 200); x.scale(k, k); x.fillStyle = '#ff3b5c'; x.font = `800 80px ${INTER}`; x.textAlign = 'center'; x.fillText('♥︎', 0, 0); x.restore() }
  // player chrome
  const v = vt(t)
  R(x, 'rgba(0,0,0,0.45)', Rw.x, Rw.y + Rw.h - 60, Rw.w, 60)
  R(x, '#555', Rw.x + 130, Rw.y + Rw.h - 34, Rw.w - 260, 8); R(x, '#ff3b5c', Rw.x + 130, Rw.y + Rw.h - 34, (Rw.w - 260) * v / 12, 8)
  x.fillStyle = '#fff'; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.fillText(`0:${String(Math.floor(v)).padStart(2, '0')}`, Rw.x + 30, Rw.y + Rw.h - 22); x.textAlign = 'right'; x.fillText('0:12', Rw.x + Rw.w - 30, Rw.y + Rw.h - 22)
  if (t > T.end) { const k = pop01(t, T.end, 0.3, 2.4); x.save(); x.translate(860, Rw.y + 150); x.scale(k, k); x.fillStyle = 'rgba(0,0,0,0.6)'; x.beginPath(); x.arc(0, 0, 70, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 10; x.beginPath(); x.arc(0, 0, 36, 0.6, 5.6); x.stroke(); x.fillStyle = '#fff'; x.beginPath(); x.moveTo(26, -34); x.lineTo(48, -18); x.lineTo(22, -10); x.fill(); x.restore() }
  // Pisces' tears running down the glass, heavier and heavier
  const lvl = t < T.share ? 6 : 14
  for (let i = 0; i < lvl; i++) {
    const sx = Rw.x + 50 + ((i * 137) % (Rw.w - 100)), sp = 0.35 + (i % 4) * 0.1, ph = ((t * sp + i * 0.21) % 1)
    const y = Rw.y + ph * (Rw.h + 60) - 30
    x.fillStyle = 'rgba(143,227,255,0.5)'; x.fillRect(sx, Rw.y, 5, Math.max(0, y - Rw.y))
    x.fillStyle = 'rgba(200,245,255,0.9)'; x.beginPath(); x.ellipse(sx + 2, y, 10, 15, 0, 0, 7); x.fill()
  }
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'wide', mouth: 'o', arms: [2.6, 0.4], look: [1, -1], tears: 0 }],
    [1.0, { mood: 'angry', mouth: 'flat', arms: [2.6, 0.4], look: [0.5, -1] }],
    [T.share, { mood: 'sad', mouth: 'wobble', arms: [2.6, 0.4], look: [0.5, -1] }],
    [T.wobble, { mood: 'sad', mouth: 'wobble', arms: [2.6, 0.4], tears: 1 }],
    [T.end, { mood: 'cry', mouth: 'wobble', arms: [2.6, 0.4], tears: 2 }],
    [T.last, { mood: 'cry', mouth: 'wobble', arms: [2.6, 1.8], tears: 3, look: [1, 0] }],
  ])
  return { ...P, x: 300, y: 1440, hops: [1.0, 7.2, T.last], prop: (x, t2, o) => {
    // the tiny umbrella in Brain's left hand
    const h = o.hl
    x.save(); x.translate(h.x + 60, h.y); R(x, INK, -5, -150, 10, 160); R(x, '#d8dce8', -2, -150, 4, 156)
    x.fillStyle = INK; x.beginPath(); x.arc(0, -150, 108, Math.PI, 0); x.fill(); x.fillStyle = '#7fd0ff'; x.beginPath(); x.arc(0, -150, 100, Math.PI, 0); x.fill()
    for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#5ab0e0' : '#9fe0ff'; x.beginPath(); x.moveTo(0, -150); x.arc(0, -150, 100, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); x.fill() }
    x.restore()
    // tears bouncing off the umbrella
    for (let i = 0; i < 6; i++) { const ph = (t2 * 1.6 + i / 6) % 1; R(x, SKYB, h.x - 30 + i * 34 + ph * 40 * (i % 2 ? 1 : -1), h.y - 260 - 120 * ph * (1 - ph) * 4 + 60 * ph, 8, 12) }
  } }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'cry', mouth: 'wobble', arms: [1.2, 1.2], tears: 3 }],
    [2.7, { mood: 'cry', mouth: 'scream', arms: [2.5, 2.5], tears: 3 }],
    [4.0, { mood: 'cry', mouth: 'wobble', arms: [1.2, 1.2], tears: 2 }],
    [T.share, { mood: 'cry', mouth: 'scream', arms: [2.8, 2.8], tears: 3 }],
    [8.5, { mood: 'love', mouth: 'grin', arms: [2.4, 2.4], tears: 3, look: [-1, -1] }],
    [T.last, { mood: 'cry', mouth: 'smile', arms: [2.2, 0.4], tears: 3, look: [-1, 0] }],
  ])
  return { ...P, x: 820, y: 1440, hops: [2.7, 3.1, T.share, T.share + 0.4, 8.5], rot: 0.05 * Math.sin(t * 16) }
}

const tissueReact = (x, t, Rw) => {
  // THE STARS hold out a tissue in the cam
  const k = 0.9 + 0.1 * Math.sin(t * 4)
  x.save(); x.translate(Rw.x + Rw.w - 60, Rw.y + Rw.h - 70); x.rotate(-0.2 + 0.1 * Math.sin(t * 3)); x.scale(k, k)
  R(x, INK, -34, -30, 68, 60); R(x, '#fff', -28, -24, 56, 48); R(x, '#e8eef8', -28, 0, 56, 8)
  x.restore()
}

const build = makeBuild({
  sign: SIGN, blinks: [],
  view: video,
  desk: t => ({ button: { label: 'STAY STRONG', press: [], glow: 0.2, col: '#7fd0ff' }, score: { b: [[0, 0]], h: [[0, 0], [T.share + 0.3, 1], [T.last, 2]] }, cam: { who: 'stars', mood: [[0, 'neutral'], [T.share, 'happy']], look: [1, 0], react: tissueReact } }),
  brain: brainP, heart: heartP,
  back: (x, t) => {
    // the tissue tower on the console by Heart
    const n = 6 + Math.floor(prog(t, 0, 9) * 6)
    for (let i = 0; i < n; i++) { const wob = Math.sin(t * 3 + i) * 4; R(x, INK, 640 + wob, 1430 - i * 22, 90, 22); R(x, '#fff', 644 + wob, 1432 - i * 22, 82, 16) }
  },
  front: (x, t) => { sparkles(x, t, 540, 700, T.share, 12, 220, 1, [GOLD, BONE, '#ff8fa0']) },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(SOB), slamTitle(HOOK)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ['pluck', 0.8, 1108.73, 0.03, 0.8, 0.2], ['pop', T.kitten + 0.6, 1396.91, 0.04, 0.4], ['pop', T.kitten + 0.75, 1661.22, 0.03, 0.4],
  ...shakeCues(SOB), ['bell', T.share, 1864.66, 0.035, 1.4, 0], ['glitter', T.share, T.share + 0.6],
  ['pluck', T.wobble, 554.37, 0.04, 0.6, -0.3], ['tick', T.end, 0.06], ['pop', T.end + 0.05, 1108.73, 0.04, 0],
  ...bubbleCues(BUB), ['bell', T.last + 0.05, 1108.73, 0.03, 1.4, 0],
]
