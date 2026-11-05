// klge01 · Your Sign's Love Glitch · "Leo.exe: How Are You, Really?" (20 s vertical, star_advice post, hard cut).
//   0.0   frame 0: LEO.EXE has stopped responding. The error dialog mid-slam, RGB tearing, Leo frozen mid-pose under a
//         stage spotlight; the friend's text "how are you, really?" is on the phone. 0.45 whip zoom onto Leo.
//   3.0   the glitch plays: Leo performs a highlight reel (curtains, CLAP! stickers) and types "AMAZING. thriving!!"
//   6.6   error: VULNERABLE.DLL not found.   8.5 Pisces pops out of the tray, sobbing.
//   10.7  THE STARS: "you don't have to *perform* for people who love you."   13.6 patch 1.1 installs.
//   15.6  the curtains drop: a warm lamp, Leo types "honestly? tired." The friend: "same. call?"
//   17.9  last line "Unfiltered is still *loved.*", held to the cut at 20.0.
import { makeGlitch, R, box, label, sticker, sparkles, hearts, phone, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK } from '../../klge01/scenes/glitchkit.js'

const LEO = '#f39a3a'
const CHAT = [
  { from: 'SAM', text: 'how are you, really?', at: -1 },
  { from: 'me', text: 'AMAZING. thriving!! never better', at: 4.9 },
  { from: 'SAM', text: 'ok but… really?', at: 7.4 },
  { from: 'me', text: 'honestly? tired.', at: 16.2 },
  { from: 'SAM', text: 'same. call?', at: 17.0 },
]
const CURTAIN_DROP = 15.6

function curtains(x, t, open) {
  // red stage curtains framing the window; `open` 0 = shut … 1 = open
  const w = lerp(470, 120, open)
  for (const side of [0, 1]) {
    const X = side ? 1010 - w : 70
    R(x, '#8e1f34', X, 556, w, 880)
    for (let i = 0; i < w; i += 46) R(x, '#b02a44', X + i + 8, 556, 14, 880)
    R(x, INK, side ? X - 6 : X + w, 556, 6, 880)
  }
  R(x, '#6e1428', 70, 556, 940, 64); for (let i = 0; i < 940; i += 60) R(x, '#b02a44', 70 + i, 600, 40, 20)
  void t
}
function spot(x, cx, by, w, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, 560, 0, by)
  g.addColorStop(0, `rgba(255,236,180,${0.05 * a})`); g.addColorStop(1, `rgba(255,236,180,${0.3 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, 560); x.lineTo(cx + 40, 560); x.lineTo(cx + w / 2, by); x.lineTo(cx - w / 2, by); x.closePath(); x.fill()
  x.fillStyle = `rgba(255,236,180,${0.3 * a})`; x.beginPath(); x.ellipse(cx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill(); x.restore()
}
function room(x, t) {
  // after the curtain drop: a warm little room, a lamp and a couch
  R(x, '#2a1d3e', 70, 556, 940, 880); R(x, '#3a2850', 70, 1260, 940, 176)
  R(x, '#5a3d6e', 70, 1256, 940, 8)
  // lamp
  R(x, INK, 896, 760, 12, 500); box(x, 840, 700, 124, 80, '#f7d98a', { b: 5 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(900, 760, 20, 900, 760, 520); g.addColorStop(0, 'rgba(255,214,140,0.32)'); g.addColorStop(1, 'rgba(255,214,140,0)'); x.fillStyle = g; x.fillRect(380, 300, 1040, 1000); x.restore()
  // couch
  box(x, 130, 1160, 520, 120, '#7a4a8e', { b: 6 }); box(x, 110, 1110, 70, 170, '#6a3a7e', { b: 6 }); box(x, 600, 1110, 70, 170, '#6a3a7e', { b: 6 })
  void t
}

function scene(x, t, K) {
  const drop = ease.inCubic(prog(t, CURTAIN_DROP, CURTAIN_DROP + 0.45))
  if (t < CURTAIN_DROP + 0.45) {
    R(x, '#1b1236', 70, 556, 940, 880)
    R(x, '#3b2a20', 70, 1290, 940, 146); R(x, '#5a4030', 70, 1286, 940, 8)
    for (let i = 0; i < 940; i += 80) R(x, '#4a3428', 70 + i, 1320, 4, 116)
    spot(x, 330, 1300, 420, 1)
    // the highlight reel: CLAP! stickers + sparkles while Leo performs
    const pose = t < 3 ? 0 : Math.floor((t - 3) / 0.9) % 3
    const looks = [[-1, -1], [1, -0.6], [0, -1]]
    K.hero(x, t, 330, 1190, 300, { mood: t < 8.4 ? 'sparkle' : 'wide', look: t < 3 ? [-1, -1] : looks[pose], squash: t < 3 ? -0.12 : pose === 1 ? 0.08 : -0.06, hops: [3.1, 3.9, 4.8, 5.7, 6.4] })
    for (const [i, c] of [3.4, 4.2, 5.1].entries()) {
      sticker(x, t, 'CLAP!', [220, 470, 300][i], [760, 720, 860][i], c, c + 0.8, { col: GOLD, size: 46, rot: [-0.18, 0.14, -0.06][i] })
      sparkles(x, t, [220, 470, 300][i], [760, 720, 860][i], c, 8, 70, i)
    }
    if (t >= 3 && t < 8.4) sticker(x, t, 'HIGHLIGHT REEL', 330, 1380, 3.2, 8.3, { col: '#ffd98a', size: 30, rot: 0 })
    // the curtains, dropping shut at the turn
    curtains(x, t, 1 - drop)
  }
  if (t >= CURTAIN_DROP + 0.2) {
    x.save(); x.globalAlpha = clamp(prog(t, CURTAIN_DROP + 0.2, CURTAIN_DROP + 0.6)); room(x, t)
    K.hero(x, t, 390, 1130, 260, { mood: t < 17.2 ? 'neutral' : 'happy', look: t < 17.2 ? [1, 0.4] : [0, 0], hops: [16.3, 17.2] })
    if (t > 17.2) hearts(x, t, 17.2, 390, 980, { n: 4 })
    x.restore()
  }
  if (t >= CURTAIN_DROP && t < CURTAIN_DROP + 0.7) { x.save(); x.globalAlpha = 1 - prog(t, CURTAIN_DROP + 0.2, CURTAIN_DROP + 0.7); curtains(x, t, 0); x.restore() }
  // the phone (always on the right)
  phone(x, t, { cx: 790, cy: 990, w: 380, h: 720, title: 'SAM', lines: CHAT, typing: [6.6, 7.4], size: 30, rot: 0.03, clock: t < CURTAIN_DROP ? '11:48' : '11:52' })
}

const F = makeGlitch({
  id: 'klge01', sign: 'leo', len: 20, ending: 'cut',
  hook: 'LEO.EXE has *stopped responding.*',
  err: { msg: ['Question received:', '"how are you, really?"'], out: 2.75 },
  notResp: [[-1, 2.7], [6.6, 8.4]],
  hits: [{ kind: 'whip', at: 0.45, x: 330, y: 1080, z: 0.4, hold: 0.45 }, { kind: 'glitch', at: 6.6, dur: 0.5, g: 0.7 }, { kind: 'flash', at: CURTAIN_DROP, col: '#ffd98a' }],
  caps: [
    { at: 3.1, out: 6.5, text: 'the glitch: *performing* instead of sharing' },
    { at: 15.8, out: 17.6, text: 'after the patch:' },
  ],
  errs: [{ at: 6.6, out: 8.4, msg: ['VULNERABLE.DLL', 'not found.'], buttons: ['RETRY', 'OK'], cy: 1000 }],
  pis: [{ at: 8.5, out: 10.6, text: '"thriving!!" …i’m sobbing', tears: 3 }],
  stars: [{ t: 10.75, text: 'Leo, you don’t have to *perform* for people who love you.' }],
  box: { close: 13.6 },
  patch: { at: 13.6, ver: '1.1', name: 'SHOW ONE PERSON THE REAL YOU', dur: 1.3, out: 15.5 },
  last: { at: 17.9, text: 'Unfiltered is still *loved.*' },
  scene, accent: '#c4622a',
  cues: [['clap', 3.4, { gain: 0.16 }], ['clap', 4.2, { gain: 0.16 }], ['clap', 5.1, { gain: 0.16 }], ['whoosh', CURTAIN_DROP - 0.1, 0.5, 0.05], ['tom', CURTAIN_DROP + 0.4, 80, { gain: 0.18 }], ['pop', 16.2, 659.25, 0.04, 0.3], ['pop', 17.0, 880, 0.04, -0.3]],
  music: { style: 'chiptune', key: 'Em', seed: 1801, drop: 3.0, breakdown: [8.5], lift: [15.6] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
