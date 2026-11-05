// kbhe04: BRAIN VS HEART, Ep 4 "Old Photos at 2 A.M." (13 s vertical, star_talk post, music: dreamy · Eb). Hard cut.
// Inside ♋ Cancer's head at 2:07 a.m. The window: the camera roll, full of photos with the ex.
//   0.00   frame 0: mid whip zoom; Heart hugging a giant photo album mid-sob, Brain holding out a tiny trash can.
//          Title "Cancer. 2 a.m. | *Old photos.*" 0.3 shake.
//   1.20   BRAIN: "it's been *four months.* delete."   2.80 HEART (sobbing): "but the *BEACH* one." (the beach photo fills
//          the window)   4.20 tug of war over the album (alarm, shake at 5.9: the album flies up and lands on the console).
//   6.50   BRAIN, softer: "you don't have to *delete* it to move on."   8.40 the window: NEW FOLDER, the photos slide in,
//          the name types itself.   10.40 BRAIN: "Folder name: '*someday, maybe.*'" Heart leans on Brain.
// Pisces cam: sobbing the whole time (sad, then soft happy tears). Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues } from '../../hookkit.js'
import { makeBuild, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO } from '../../kbhe01/bhkit.js'

export const DURATION = 12.8
const SIGN = 'cancer'
const WHIP = { at: -0.18, len: 0.5, from: 2.2, cy: 1250 }
const HOOK = { at: -1, text: 'Cancer. 2 a.m. | *Old photos.*', top: 168, size: 104 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const SHAKE2 = { at: 5.9, len: 0.45, amp: 26 }
const T = { beach: 2.8, beachOut: 4.2, tug: 4.2, fly: 5.9, land: 6.3, soft: 6.5, folder: 8.4, slide: [8.7, 9.4], name: 9.5, lean: 9.9, last: 10.4 }
const BUB = [
  { t0: 1.2, t1: 2.65, who: 'brain', x: 390, y: 1195, tail: -130, text: "it's been *four months.* delete." },
  { t0: 2.8, t1: 4.1, who: 'heart', x: 690, y: 1195, tail: 130, text: 'but the *BEACH* one.', size: 50, shake: 2 },
  { t0: 6.5, t1: 8.3, who: 'brain', x: 420, y: 1195, tail: -160, text: "you don't have to *delete* it to move on.", size: 42, maxW: 560 },
  { t0: 10.4, t1: 99, who: 'brain', x: 430, y: 1200, tail: -170, text: "Folder name: '*someday, maybe.*'", size: 46, maxW: 560 },
]
const PHOTOS = [
  ['#ff9a6a', '#ffd08a', '#2f6fd0', 'beach'], ['#203a70', '#6a5acd', '#1a1438', 'stars'], ['#7fd0a0', '#c8f0c0', '#4a8a5a', 'park'], ['#ffb3c6', '#ffe0ea', '#c0607a', 'cake'],
  ['#4a3a8a', '#ff7a9a', '#2a1c50', 'lights'], ['#f0c060', '#fff1c8', '#c08030', 'cafe'], ['#5ab0e0', '#c0ecff', '#2f6fd0', 'lake'], ['#ff8a5a', '#ffd23a', '#7a3a2a', 'fair'],
]
function photo(x, cx, cy, w, h, P, t, big = false) {
  R(x, INK, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, '#fffbea', cx - w / 2, cy - h / 2, w, h)
  const iw = w - 16, ih = h * 0.74, ix = cx - iw / 2, iy = cy - h / 2 + 8
  const g = x.createLinearGradient(0, iy, 0, iy + ih); g.addColorStop(0, P[0]); g.addColorStop(1, P[1]); x.fillStyle = g; x.fillRect(ix, iy, iw, ih)
  x.fillStyle = P[2]; x.fillRect(ix, iy + ih * 0.72, iw, ih * 0.28)
  if (P[3] === 'beach') { x.fillStyle = '#fff3c0'; x.beginPath(); x.arc(cx + iw * 0.22, iy + ih * 0.5, ih * 0.16, 0, 7); x.fill() }
  // two little figures (just silhouettes)
  const fy = iy + ih * 0.72, fs = ih * 0.22
  for (const [dx, col] of [[-0.12, '#3a2a5a'], [0.06, '#5a2a4a']]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * iw, fy - fs * 1.15, fs * 0.32, 0, 7); x.fill(); x.fillRect(cx + dx * iw - fs * 0.32, fy - fs * 0.85, fs * 0.64, fs * 0.85) }
  if (big) { x.fillStyle = '#ff3b5c'; x.font = `800 ${Math.round(h * 0.09)}px ${INTER}`; x.textAlign = 'center'; x.fillText('♥︎ the beach day', cx, cy + h / 2 - h * 0.08) }
}
function roll(x, t, Rw) {
  x.fillStyle = '#100c24'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.fillText('2:07 AM  ·  Photos · "us"', Rw.x + 34, Rw.y + 46)
  const into = ease.inOutCubic(prog(t, ...T.slide))
  PHOTOS.forEach((P, i) => {
    const c = i % 4, r = Math.floor(i / 4)
    let cx = Rw.x + 130 + c * 226, cy = Rw.y + 170 + r * 210
    let s = 1
    if (t > T.folder) { cx = lerp(cx, 540, into); cy = lerp(cy, Rw.y + 300, into); s = 1 - 0.85 * into }
    if (s > 0.05) photo(x, cx, cy, 196 * s, 180 * s, P, t)
  })
  // the beach photo fills the window
  const bk = pop01(t, T.beach, 0.35, 1.8) * (1 - ease.inQuad(prog(t, T.beachOut - 0.2, T.beachOut)))
  if (bk > 0.01) { x.fillStyle = `rgba(8,4,20,${0.6 * bk})`; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h); x.save(); x.translate(540, Rw.y + Rw.h / 2); x.scale(bk, bk); x.rotate(-0.04); photo(x, 0, 0, 520, 470, PHOTOS[0], t, true); x.restore() }
  // NEW FOLDER
  if (t > T.folder) {
    const k = pop01(t, T.folder, 0.3, 2.2)
    x.save(); x.translate(540, Rw.y + 300); x.scale(k, k)
    R(x, INK, -110, -70, 220, 150); R(x, '#f2c75c', -104, -64, 90, 30); R(x, '#f2c75c', -104, -44, 208, 118); R(x, '#ffd98a', -104, -44, 208, 12)
    x.restore()
    const name = "someday, maybe".slice(0, Math.max(0, Math.floor((t - T.name) * 14)))
    x.save(); x.translate(540, Rw.y + 450); x.scale(k, k)
    R(x, INK, -300, -40, 600, 80); R(x, '#231a48', -294, -34, 588, 68)
    x.fillStyle = '#9a90c8'; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillText('NEW FOLDER:', -278, 8)
    x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.fillText(name + (Math.floor(t * 2.4) % 2 ? '|' : ''), -110, 12)
    x.restore()
  }
}
function album(x, cx, cy, s = 1, rot = 0, open = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -110, -84, 220, 168); R(x, '#8a4a3a', -102, -76, 204, 152); R(x, '#a85c48', -102, -76, 204, 14)
  R(x, '#fff1c8', 96, -70, 8, 140)
  if (open > 0) { R(x, INK, -110 - 210 * open, -84, 210 * open, 168); R(x, '#fffbea', -102 - 196 * open, -76, 196 * open, 152) }
  x.fillStyle = '#ff6f86'; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥︎', 0, 4)
  x.restore()
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'angry', mouth: 'open', arms: [0.4, 2.0], look: [1, 0] }],
    [2.8, { mood: 'sad', mouth: 'frown', arms: [0.4, 1.6] }],
    [T.tug, { mood: 'angry', mouth: 'scream', arms: [0.5, 1.75] }],
    [T.fly, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], look: [0.4, -1] }],
    [T.soft, { mood: 'sad', mouth: 'smile', arms: [0.4, 1.3], look: [1, 0] }],
    [T.folder, { mood: 'neutral', mouth: 'smile', arms: [0.4, 0.4], look: [0.5, -1] }],
    [T.lean, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.0], look: [1, 0] }],
  ])
  const xx = key(t, [[T.tug - 0.2, 250], [T.tug + 0.1, 360], [T.fly, 360], [T.fly + 0.3, 300], [T.lean - 0.3, 300], [T.lean, 360]])
  const tugX = t > T.tug && t < T.fly ? 18 * Math.sin(t * 11) : 0
  return { ...P, x: xx + tugX, y: 1440, hops: [1.2, 6.5, 10.4], walk: (t > T.tug - 0.2 && t < T.tug + 0.1) ? t * 3 : null }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'cry', mouth: 'wobble', arms: [1.9, 1.9], tears: 3 }],
    [T.tug, { mood: 'angry', mouth: 'scream', arms: [1.75, 0.5], tears: 2 }],
    [T.fly, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], tears: 1, look: [-0.4, -1] }],
    [T.soft, { mood: 'cry', mouth: 'wobble', arms: [0.4, 0.4], tears: 2 }],
    [T.folder, { mood: 'sad', mouth: 'smile', arms: [0.4, 0.4], tears: 1, look: [-0.5, -1] }],
    [T.lean, { mood: 'happy', mouth: 'smile', arms: [2.0, 0.4], tears: 1, look: [-1, 0] }],
  ])
  const xx = key(t, [[T.tug - 0.2, 830], [T.tug + 0.1, 720], [T.fly, 720], [T.fly + 0.3, 830], [T.lean - 0.3, 830], [T.lean, 715]])
  const tugX = t > T.tug && t < T.fly ? 18 * Math.sin(t * 11) : 0
  return { ...P, x: xx + tugX, y: 1440, rot: t > T.lean ? -0.18 : 0, hops: [2.8, 3.2, T.lean], walk: (t > T.tug - 0.2 && t < T.tug + 0.1) ? t * 3 : null }
}

const build = makeBuild({
  sign: SIGN, blinks: [T.folder - 0.05],
  view: roll,
  desk: t => ({ button: { label: 'DELETE', press: [], glow: t < T.soft ? 0.6 : 0.1, col: '#ff3b5c', alpha: 1 }, score: { b: [[0, 0], [T.name, 1]], h: [[0, 0], [T.name, 1]] }, cam: { tears: [[0, 3]], mood: [[0, 'wide'], [T.soft, 'sparkle']], look: [0, -1] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > T.tug && t < T.fly ? 0.45 : 0),
  back: (x, t) => { if (t >= T.land) album(x, 540, 1300, 0.55, 0.06) },
  front: (x, t, B, H) => {
    if (!B || !H) return
    // the tiny trash can in Brain's hand (until the soft moment)
    if (t < T.soft) { const h = B.hr; x.save(); x.translate(h.x + 10, h.y - 30); R(x, INK, -26, -34, 52, 66); R(x, '#9aa0b8', -20, -28, 40, 56); R(x, '#c9cfe0', -26, -40, 52, 12); x.restore() }
    // the album: hugged → tugged → flies → on the console
    if (t < T.tug) album(x, H.cx, H.cy + 30, 0.9, 0.08)
    else if (t < T.fly) album(x, (B.hr.x + H.hl.x) / 2, (B.hr.y + H.hl.y) / 2, 0.85, 0.12 * Math.sin(t * 11))
    else if (t < T.land) { const p = prog(t, T.fly, T.land); album(x, 540, lerp(1250, 1330, p) - Math.sin(Math.PI * p) * 380, lerp(0.8, 0.55, p), (1 - p) * 6) }
    sparkles(x, t, 540, 1300, T.land, 10, 150, 3, [GOLD, BONE, '#ff8fa0'])
    sparkles(x, t, 540, 800, T.slide[1], 12, 200, 1, [GOLD, BONE])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(SHAKE2), slamTitle(HOOK)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ['whoosh', T.beach, 0.3, 0.05], ['pluck', T.beach + 0.2, 622.25, 0.04, 0.8, 0.2],
  ...Array.from({ length: 8 }, (_, i) => ['whoosh', +(T.tug + i * 0.21).toFixed(2), 0.12, 0.02]),
  ...shakeCues(SHAKE2), ['whoosh', T.fly, 0.4, 0.05], ['tom', T.land, 90, { gain: 0.22, decay: 0.25 }], ['tick', T.land + 0.3, 0.05],
  ['pop', T.folder, 1244.51, 0.05, 0], ['whoosh', T.slide[0], 0.6, 0.04], ['glitter', T.slide[1], T.slide[1] + 0.4],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.name + i / 14).toFixed(2), 0.02]),
  ...bubbleCues(BUB), ['bell', T.last + 0.05, 1244.51, 0.03, 1.4, 0],
]
