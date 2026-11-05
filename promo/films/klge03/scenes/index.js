// klge03 · Your Sign's Love Glitch · "Scorpio.exe: One Dry Text" (21 s vertical, star_advice post, hard cut).
//   0.0   frame 0: SCORPIO.EXE: worst case loading… Scorpio mid-squint at a phone that only says "ok"; the WORST CASE
//         renderer is already at 67 %. 0.5 whip onto the "ok".
//   3.0   the glitch: four worst cases render (bored of me · met someone · hates the plan · it's over?)
//   7.6   a pixel firewall slams up in front of Scorpio. Error: FIREWALL ON, messages blocked: yours.
//   9.4   Pisces pops out of the tray, crying.   11.5 THE STARS: "when a text feels cold, *ask.* don't write the story alone."
//   14.8  patch 1.3 installs.   16.4 the wall drops; Scorpio sends "all good?" → "yes! just driving, call you in 10"
//   18.6  last line "Ask before you *armor up.*", held to the cut at 21.0.
import { makeGlitch, R, box, label, phone, progressBar, hearts, sparkles, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const WALL = [7.6, 16.4]
const CHAT = [
  { from: 'AVERY', text: 'ok', at: -1 },
  { from: 'me', text: 'all good?', at: 16.7 },
  { from: 'AVERY', text: 'yes! just driving, call you in 10', at: 17.4 },
]
const WORST = [
  { at: -9, text: 'they’re bored of me', v0: 0.67 },
  { at: 3.4, text: 'they met someone', v0: 0 },
  { at: 4.5, text: 'they hate the plan', v0: 0 },
  { at: 5.6, text: 'it’s over (?)', v0: 0 },
]

function wall(x, t) {
  const up = ease.outBack ? 0 : 0
  void up
  const k = ease.outCubic(prog(t, WALL[0], WALL[0] + 0.3)) * (1 - ease.inCubic(prog(t, WALL[1], WALL[1] + 0.4)))
  if (k <= 0) return
  const top = lerp(1436, 1316, k)
  for (let row = 0; top + row * 60 < 1436; row++) for (let c = -1; c < 10; c++) {
    const bx = 80 + c * 110 + (row % 2) * 55, by = top + row * 60
    box(x, bx, by, 100, 50, '#b0402e', { b: 4 }); R(x, '#d0604a', bx, by, 100, 8)
  }
  label(x, 'FIREWALL: ON', 760, top + 34, { size: 34, col: BONE, stroke: INK })
}

function scene(x, t, K) {
  R(x, '#170f30', 70, 556, 940, 880)
  // the worst-case renderer (right)
  const on = t < WALL[1]
  if (on) {
    box(x, 560, 620, 420, 600, '#2a1440', { b: 5 }); R(x, '#8a1f3a', 560, 620, 420, 50)
    label(x, 'WORST CASE RENDERER', 770, 646, { size: 22, col: BONE })
    WORST.forEach((w, i) => {
      if (t < w.at) return
      const k = pop01(t, w.at, 0.25, 2.2)
      const v = clamp(w.v0 + (t - Math.max(0, w.at)) * 0.28)
      x.save(); x.translate(770, 740 + i * 120); x.scale(k, k); x.translate(-770, -(740 + i * 120))
      label(x, w.text, 590, 720 + i * 120, { size: 28, align: 'left', col: v >= 1 ? '#ff9aa8' : BONE, font: INTER, weight: 800 })
      progressBar(x, 590, 744 + i * 120, 360, v, { h: 36, col: v >= 1 ? RED : GOLD, text: `${Math.round(v * 100)}%`, size: 20 })
      x.restore()
    })
  } else {
    // after the patch: a calm sky window
    box(x, 560, 620, 420, 600, '#14284a', { b: 5 }); R(x, '#2f9a6e', 560, 620, 420, 50)
    label(x, 'WHAT’S ACTUALLY TRUE', 770, 646, { size: 22, col: BONE })
    label(x, 'they’re driving.', 770, 800, { size: 40, col: MINT, font: INTER, weight: 900, alpha: clamp(prog(t, 17.5, 17.9)) })
    label(x, 'that’s it.', 770, 870, { size: 40, col: MINT, font: INTER, weight: 900, alpha: clamp(prog(t, 17.9, 18.3)) })
  }
  // the phone + Scorpio
  phone(x, t, { cx: 310, cy: 850, w: 400, h: 500, title: 'AVERY', lines: CHAT, typing: [16.95, 17.4], size: 32, rot: -0.04, clock: t < 16 ? '6:12' : '6:13', accent: '#8a1f3a' })
  const calm = t >= WALL[1]
  K.hero(x, t, 310, 1240, 240, { mood: calm ? (t > 17.4 ? 'happy' : 'neutral') : t > 7.6 && t < 9.4 ? 'eyeroll' : 'squint', look: calm ? [0, 0] : [0, -1], squash: calm ? -0.03 : 0.06, hops: [3.4, 4.5, 5.6, 16.7, 17.5] })
  wall(x, t)
  if (t > 17.4) hearts(x, t, 17.4, 310, 1080, { n: 5 })
}

const F = makeGlitch({
  id: 'klge03', sign: 'scorpio', len: 21, ending: 'cut',
  hook: 'SCORPIO.EXE: worst case *loading…*',
  err: { msg: ['Text received: "ok"', 'Tone: unknown. Panic: yes.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.8, 9.3]],
  hits: [{ kind: 'whip', at: 0.5, x: 310, y: 760, z: 0.4, hold: 0.5 }, { kind: 'shake', at: WALL[0] + 0.3, dur: 0.5, amp: 22 }, { kind: 'glitch', at: 7.8, dur: 0.4 }, { kind: 'flash', at: WALL[1], col: MINT }],
  caps: [{ at: 3.0, out: 7.4, text: 'the glitch: assuming the *worst*' }, { at: 7.6, out: 9.3, text: 'then going *silent*', col: '#ff9aa8' }],
  errs: [{ at: 7.9, out: 9.3, msg: ['FIREWALL ON.', 'Blocked: your feelings.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.4, out: 11.4, text: 'it was just an "ok"… *sob*', tears: 3 }],
  stars: [{ t: 11.55, text: 'when a text feels cold, *ask.* don’t write the story alone.' }],
  box: { close: 14.8 },
  patch: { at: 14.8, ver: '1.3', name: 'ASK, DON’T ASSUME', dur: 1.0, out: 16.4 },
  last: { at: 18.6, text: 'Ask before you *armor up.*' },
  scene, accent: '#8a1f3a',
  cues: [['tom', WALL[0] + 0.3, 70, { gain: 0.3 }], ['whoosh', WALL[1], 0.4, 0.05], ['pop', 16.7, 880, 0.04, 0.3], ['pop', 17.4, 659.25, 0.04, -0.3], ['bell', 17.9, 1318.51, 0.03, 1, 0]],
  music: { style: 'synthwave', key: 'C#m', seed: 1803, drop: 3.0, breakdown: [9.4], lift: [WALL[1]] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
