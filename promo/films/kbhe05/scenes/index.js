// kbhe05: BRAIN VS HEART, Ep 5 "The Accidental Post" (11.6 s vertical, star_talk post, music: funk · G). LOOPS.
// Inside ♌ Leo's head. The window is the phone camera: a selfie, posted "accidentally" so the crush sees it.
//   0.00   frame 0: mid whip zoom; Heart mid-spin under a ring light, Brain jumping in front of the window, arms spread
//          (blocking the lens). Title "Leo vs. the | *'accidental'* crush post."
//   1.10   BRAIN: "posting so they *see* it is a lot."   2.70 HEART: "it's called *ART.*"
//   3.90   Heart slams POST. The window: the post, 0 likes. 4.50–6.90 Heart yanks REFRESH again and again (posted 1s, 2s, 3s…).
//   7.10   notification drop: "Jordan liked your photo". Achievement "SEEN BY *the one.*" Heart spins; Brain facepalms, smiles.
//   8.90   HEART: "Art was made. Art was *liked.*"   10.6 Heart drifts back to the ring light; 11.1–11.6 loop-back to frame 0.
// Pisces cam: nervous sniffles, then happy fountains at the like. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, notification, notificationCues, achievement, achievementCues, loopBack, loopCues, loopK } from '../../hookkit.js'
import { makeBuild, drawLever, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO, drawStarChar, signStar } from '../../kbhe01/bhkit.js'

export const DURATION = 11.6
const SIGN = 'leo', LEO = signStar('leo')
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "Leo vs. the | *'accidental'* crush post.", top: 168, size: 96 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const NOTIF = { at: 7.1, out: [9.3, 9.6], title: 'photos', body: 'Jordan *liked* your photo', glyph: '♓', time: 'now', y: 110 }
const ACH = { at: 7.6, out: [9.7, 10.0], text: 'SEEN BY *the one.*', y: 1700 }
const T = { post: 3.9, refresh: [4.5, 5.1, 5.7, 6.3], like: 7.1, last: 8.9 }
const BUB = [
  { t0: 1.1, t1: 2.55, who: 'brain', x: 400, y: 1195, tail: -140, text: 'posting so they *see* it is a lot.', size: 42, maxW: 560 },
  { t0: 2.7, t1: 3.8, who: 'heart', x: 690, y: 1195, tail: 130, text: "it's called *ART.*", size: 54 },
  { t0: 8.9, t1: 10.95, who: 'heart', x: 640, y: 1195, tail: 180, text: 'Art was made. Art was *liked.*', size: 46, maxW: 560 },
]

function view(x, t, Rw) {
  const posted = t >= T.post
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, posted ? '#1d1640' : '#ffcf8a'); g.addColorStop(1, posted ? '#120c2a' : '#ff8a6a')
  x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  if (!posted) {
    // the selfie preview: Leo, glowing
    drawStarChar(x, 540, Rw.y + 300, 330, t, { color: LEO.color, glyph: LEO.glyph, mood: 'wink', look: [0, 0], seed: 5 })
    x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 4
    for (const [a, b] of [[Rw.x + 40, Rw.y + 40], [Rw.x + Rw.w - 40, Rw.y + 40], [Rw.x + 40, Rw.y + Rw.h - 40], [Rw.x + Rw.w - 40, Rw.y + Rw.h - 40]]) { const sx = a < 540 ? 1 : -1, sy = b < 700 ? 1 : -1; x.beginPath(); x.moveTo(a, b + sy * 50); x.lineTo(a, b); x.lineTo(a + sx * 50, b); x.stroke() }
    x.fillStyle = INK; x.beginPath(); x.arc(540, Rw.y + Rw.h - 70, 44, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(540, Rw.y + Rw.h - 70, 34, 0, 7); x.fill()
    return
  }
  // the post card
  const cx = 540
  x.fillStyle = '#231a48'; rrect(x, cx - 300, Rw.y + 24, 600, Rw.h - 48, 24); x.fill()
  x.fillStyle = LEO.color; x.beginPath(); x.arc(cx - 250, Rw.y + 70, 24, 0, 7); x.fill()
  x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.textAlign = 'left'; x.fillText('leo.shines', cx - 214, Rw.y + 80)
  const secs = Math.max(1, Math.floor((t - T.post) * 1.6))
  x.fillStyle = '#9a90c8'; x.font = `600 22px ${INTER}`; x.fillText(`posted ${secs}s ago`, cx + 90, Rw.y + 80)
  x.save(); x.beginPath(); x.rect(cx - 280, Rw.y + 106, 560, 300); x.clip()
  const g2 = x.createLinearGradient(0, Rw.y + 106, 0, Rw.y + 406); g2.addColorStop(0, '#ffcf8a'); g2.addColorStop(1, '#ff8a6a'); x.fillStyle = g2; x.fillRect(cx - 280, Rw.y + 106, 560, 300)
  drawStarChar(x, cx, Rw.y + 270, 230, t, { color: LEO.color, glyph: LEO.glyph, mood: 'wink', look: [0, 0], seed: 5 })
  x.restore()
  const liked = t >= T.like
  const hk = liked ? 1 + 0.35 * Math.sin(Math.PI * clamp((t - T.like) / 0.4)) : 1
  x.save(); x.translate(cx - 250, Rw.y + 450); x.scale(hk, hk); x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = liked ? '#ff3b5c' : '#6a6290'; x.fillText(liked ? '♥︎' : '♡︎', 0, 0); x.restore()
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(liked ? 'liked by Jordan' : '0 likes', cx - 210, Rw.y + 452)
  x.fillStyle = '#c9c2dc'; x.font = `600 24px ${INTER}`; x.fillText('just vibing. not for anyone.', cx - 280, Rw.y + 500)
  // refresh spinner
  for (const r of T.refresh) { const d = t - r; if (d >= 0 && d < 0.5) { x.save(); x.translate(cx, Rw.y + 150); x.rotate(d * 14); x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 30, 0, 4.5); x.stroke(); x.restore() } }
}

function ringLight(x, t, cx, cy, on) {
  if (on > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, 60, cx, cy, 420); g.addColorStop(0, `rgba(255,248,225,${0.3 * on})`); g.addColorStop(1, 'rgba(255,248,225,0)'); x.fillStyle = g; x.fillRect(cx - 420, cy - 420, 840, 840); x.restore() }
  const N = 40, Rr = 175
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, px = cx + Math.cos(a) * Rr, py = cy + Math.sin(a) * Rr
    if (pass === 0) R(x, INK, px - 15, py - 15, 30, 30); else R(x, i % 2 ? '#fffbea' : '#fff1c8', px - 10, py - 10, 20, 20)
  }
}

function poseAt(t) {
  const b = stepObj(t, [
    [0, { mood: 'wide', mouth: 'scream', arms: [2.0, 2.0], look: [0, 0] }],
    [1.1, { mood: 'angry', mouth: 'open', arms: [1.6, 1.6] }],
    [2.7, { mood: 'sad', mouth: 'frown', arms: [1.0, 1.0], look: [1, 0] }],
    [T.post, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], look: [1, -1] }],
    [4.6, { mood: 'shut', mouth: 'flat', arms: [0.4, 2.9] }],
    [T.like, { mood: 'wide', mouth: 'o', arms: [2.7, 2.7], look: [0.5, -1] }],
    [7.8, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4], look: [1, 0] }],
  ])
  const h = stepObj(t, [
    [0, { mood: 'love', mouth: 'grin', arms: [2.6, 2.2], look: [0, 0] }],
    [2.7, { mood: 'angry', mouth: 'grin', arms: [2.7, 2.7], look: [-1, 0] }],
    [T.post - 0.4, { mood: 'angry', mouth: 'grin', arms: [2.9, 2.9] }],
    [T.refresh[0] - 0.2, { mood: 'wide', mouth: 'o', arms: [0.5, 2.6], look: [0, -1] }],
    [T.like, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }],
    [8.9, { mood: 'love', mouth: 'smile', arms: [0.6, 2.4], look: [-1, 0] }],
    [10.4, { mood: 'love', mouth: 'grin', arms: [2.6, 2.2], look: [0, 0] }],
  ])
  const bx = key(t, [[0, 540], [0.6, 540], [1.0, 250, ease.outCubic]]), by = key(t, [[0, 1250], [0.6, 1250], [1.0, 1440, ease.inQuad]])
  let hx = key(t, [[T.post - 0.5, 830], [T.post - 0.1, 610, ease.inCubic], [T.post + 0.4, 610], [T.post + 0.7, 760], [7.0, 760], [7.4, 830]])
  let hy = key(t, [[T.post - 0.5, 1440], [T.post - 0.3, 1300, ease.outQuad], [T.post, 1380, ease.inQuad], [T.post + 0.4, 1380], [T.post + 0.7, 1440]])
  const spin = t < 0.9 || t > T.like + 0.2 ? Math.sin(t * 9) * 0.35 : 0
  return { b: { ...b, x: bx, y: by, hops: [1.1, 4.6, T.like, 8.0] }, h: { ...h, x: hx, y: hy, rot: spin + (t > T.post - 0.4 && t < T.post + 0.4 ? -0.5 : 0), hops: [2.7, 3.1, ...T.refresh, T.like, T.like + 0.4, 8.9, 9.3] } }
}
// loop: everything eases back into its frame-0 place over the last 0.5 s
const LOOP = 0.5
const blend = (a, b, k) => { const o = { ...a }; for (const kk of ['x', 'y', 'rot']) if (typeof a[kk] === 'number' || typeof b[kk] === 'number') o[kk] = lerp(a[kk] ?? 0, b[kk] ?? 0, k); if (k > 0.5) { o.mood = b.mood; o.mouth = b.mouth; o.arms = b.arms; o.look = b.look } return o }
function poses(t) { const p = poseAt(t), k = loopK(t, DURATION, LOOP); if (k <= 0) return p; const z = poseAt(0); return { b: blend(p.b, z.b, k), h: blend(p.h, z.h, k) } }

const build = makeBuild({
  sign: SIGN, blinks: [T.post + 0.05],
  view,
  desk: t => ({ button: { label: 'POST', press: [T.post], glow: t < T.post + 0.3 ? 0.8 : 0.2, col: '#f39a3a' }, score: { b: [[0, 0]], h: [[0, 0], [T.like + 0.3, 1]] }, cam: { tears: [[0, 1], [T.like, 3]], mood: [[0, 'wide'], [T.like, 'happy']], look: [0, -1], hops: [T.like, T.like + 0.4] } }),
  brain: t => poses(t).b, heart: t => poses(t).h,
  back: (x, t) => {
    const on = t < 1 ? 1 : clamp(1 - prog(t, 1, 1.4)) + clamp(prog(t, 10.2, 10.8))
    ringLight(x, t, 860, 1250, Math.min(1, on))
    let a = 0; for (const r of T.refresh) { const d = t - r; if (d >= 0 && d < 0.45) a = Math.max(a, d < 0.12 ? d / 0.12 : 1 - (d - 0.12) / 0.33) }
    drawLever(x, t, { x: 700, y: 1442, a, label: 'REFRESH', col: '#7fd0ff' })
  },
  front: (x, t) => { sparkles(x, t, 540, 1380, T.post + 0.02, 12, 160, 1, [GOLD, BONE, '#f39a3a']); sparkles(x, t, 830, 1250, T.like + 0.1, 12, 170, 2, ['#ff3b5c', BONE, GOLD]) },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), slamTitle(HOOK), notification(NOTIF), achievement(ACH), loopBack([build, whipZoom(WHIP), slamTitle(HOOK)], { duration: DURATION, len: LOOP })]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ['boom', T.post, 0.22], ['tom', T.post, 82, { gain: 0.28, decay: 0.3 }], ['pop', T.post + 0.05, 1567.98, 0.05, 0], ['glitter', T.post, T.post + 0.3],
  ...T.refresh.flatMap(r => [['whoosh', r, 0.2, 0.04], ['tick', +(r + 0.12).toFixed(2), 0.06]]),
  ...notificationCues(NOTIF), ['pluck', T.like + 0.05, 1567.98, 0.05, 0.6, 0.3], ['glitter', T.like + 0.1, T.like + 0.6],
  ...achievementCues(ACH), ...bubbleCues(BUB), ...loopCues({ duration: DURATION, len: LOOP }),
]
