// kaue06 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E06 "A Friday night with a 1,000-piece puzzle" (16 s, dreamy · D, hard cut).
//   0.0  Frame 0: Virgo mid-slam of the second-to-last piece, pieces bouncing. Hook "Friday night. *Puzzle* night."
//   0.9  record scratch freeze: "one piece. *missing.*"
//   2.6  the loading bar of panic: "finding the last piece…" 99% → Error: piece not found
//   5.4  Virgo hops: the piece was under its own foot. "…it was under me."  6.6 it slots in → 7.2 ★ LAST PIECE · NO HELP
//   9.0  Pisces cam sobbing at the finished picture: "it’s a SUNSET"   11.0 ★ FRIDAY NIGHT, WELL SPENT
//   13.8 last line "Missing piece? *Found* it myself." · hard cut at 16.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, sparkles, prog, ease, lerp, clamp, INK, BONE, GOLD } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawVirgoHome } from '../../st9virgohome.js'

// the picture: a sunset over hills, 8 × 5 pieces
const COLS = 8, ROWS = 5, PW = 104, PH = 84, X0 = 540 - COLS * PW / 2, Y0 = 1300
function colAt(i, j) {
  const sky = ['#3a2470', '#7a3a8a', '#e8628a', '#f29a4a', '#ffd24a'][j]
  if (j >= 3 && (i + j) % 3 !== 0 && j === 4) return '#3f8a4a'
  if (j === 3 && Math.abs(i - 4) < 2) return '#ffe39a'
  return sky
}
const SLAM = [5, 1], LAST = [2, 3]
function puzzle(x, t) {
  box(x, X0 - 30, Y0 - 30, COLS * PW + 60, ROWS * PH + 60, '#c98a4a', { b: 8, hi: '#e0a060' })
  for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
    const isSlam = i === SLAM[0] && j === SLAM[1], isLast = i === LAST[0] && j === LAST[1]
    let dx = 0, dy = 0, show = 1
    if (isLast) { if (t < 6.6) { R(x, '#2a1a10', X0 + i * PW + 4, Y0 + j * PH + 4, PW - 8, PH - 8); continue } dy = -lerp(260, 0, ease.outBounce ? ease.outBounce(prog(t, 6.6, 7.0)) : ease.outCubic(prog(t, 6.6, 7.0))) }
    if (isSlam) dy = -Math.max(0, 1 - t / 0.25) * 120
    // the bounce of every piece on the slam
    const b = Math.max(0, 1 - Math.abs(t - 0.1) / 0.4) * Math.sin((i * 3 + j) * 1.7) * 18
    const px = X0 + i * PW + dx, py = Y0 + j * PH + dy - Math.abs(b)
    R(x, INK, px, py, PW, PH)
    R(x, colAt(i, j), px + 3, py + 3, PW - 6, PH - 6)
    R(x, 'rgba(255,255,255,0.18)', px + 3, py + 3, PW - 6, 6)
    if ((i + j) % 2) R(x, colAt(i, j), px + PW - 6, py + PH / 2 - 12, 14, 24)        // a little tab
    void show
  }
  // the sun
  if (t > 6.6) { x.save(); x.globalAlpha = clamp((t - 6.9) * 2); x.fillStyle = '#fff3b0'; x.fillRect(X0 + 3.6 * PW, Y0 + 2.4 * PH, PW * 0.8, PH * 0.6); x.restore() }
}
function scene(x, t, S) {
  daySky(x, t, { hour: 21 })
  drawVirgoHome(x, t, { room: 'desk' })
  puzzle(x, t)
  // Virgo stands behind the board; at 5.4 it hops and the last piece is under its foot
  const hop = t > 5.4 && t < 6.2 ? Math.sin(Math.PI * prog(t, 5.4, 6.0)) * 70 : 0
  const vy = 1160 - hop
  hero(x, t, 'virgo', 770, vy, 270, { mood: t < 0.9 ? 'squint' : t < 5.4 ? 'wide' : t < 7.2 ? 'squint' : 'sparkle', look: t < 5.4 ? [-1, 1] : [0, 1], seed: 6, blink: t < 0.9 ? false : undefined, squash: t < 0.25 ? 0.15 : 0 })
  if (t >= 5.6 && t < 6.6) {   // the piece, revealed under the foot, then lifted
    const k = prog(t, 6.2, 6.6)
    const px = lerp(770, X0 + LAST[0] * PW + PW / 2, k), py = lerp(1290, Y0 + LAST[1] * PH - 200, k)
    R(x, INK, px - PW / 2, py - PH / 2, PW, PH); R(x, colAt(...LAST), px - PW / 2 + 3, py - PH / 2 + 3, PW - 6, PH - 6)
  }
  sparkles(x, t, X0 + LAST[0] * PW + 50, Y0 + LAST[1] * PH + 40, 7.0, 12, 160, 0.3)
  sparkles(x, t, 540, Y0 + 200, 11.0, 14, 420, 0.8)
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 16, ending: 'cut', key: 'D',
  shots: [{ at: 0, cam: [1.08, 540, 1300] }, { at: 5.4, cam: [1.3, 700, 1250] }, { at: 6.6, cam: [1.1, 540, 1300], silent: true }, { at: 9.0, cam: [1.06, 540, 1300], noBlink: true, silent: true }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 700, cy: 1300 }, { at: 6.6, from: 1.4 }],
  freezes: [{ at: 0.9, dur: 1.5, text: 'one piece. *missing.*', sub: 'friday night. 999 pieces.', top: 760 }],
  shakes: [{ at: 0.02, dur: 0.35, amp: 18 }, { at: 6.95, dur: 0.3, amp: 12 }],
  kit: [['loadingBar', { at: 2.6, len: 2.6, label: 'finding the last piece…', stallAt: 99, error: 'Error: piece not found', y: 760 }]],
  hook: { text: 'Friday night. | *Puzzle* night.', out: 0.9 },
  bubbles: [{ at: 5.8, out: 7.0, x: 700, y: 940, text: '…it was under me.', tail: 0.3 }],
  achs: [
    { at: 7.2, out: 9.0, title: 'LAST PIECE · NO HELP', xp: 300, icon: 'star' },
    { at: 11.0, out: 12.8, title: 'FRIDAY NIGHT, WELL SPENT', xp: 100, size: 40, icon: 'heart' },
  ],
  cams: [{ at: 9.0, out: 12.4, line: 'it’s a SUNSET', lineAt: 9.4, tears: 3, x: 852, y: 640 }],
  last: { at: 13.8, text: 'Missing piece? | *Found* it myself.', top: 330 },
})
