// k3se09: 3-SECOND ADVICE · "Ghosting Because It's Awkward" (6.8 s vertical trial reel, music: house · A).
// Format: k3se01/threekit.js.
//   0.00  frame 0: ♐ Sagittarius mid-sprint out of frame (dust cloud, speed streaks); behind it a phone buzzes on the
//         pavement: "are we still on for friday?"  Hook: "Ghosting them because | it's *awkward?*"  Pisces sniffles.
//   0.50  record scratch: freeze mid-stride.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "A kind *'not for me'* | beats vanishing."  Sag skids back, picks up the phone and sends:
//         "not feeling it, but thank you :)"
//   5.75  the reply: "aw, thanks for telling me!"  Sag exhales, relieved. Hard cut at 6.8.
import { makeThree, R, box, bubble, label, shadow, puff, streaks, phone, chat, sparkles, lerp, prog, ease, clamp, INK, BONE, GOLD, INTER } from '../../k3se01/threekit.js'

function street(x) {
  R(x, '#231c3c', 0, 1150, 1080, 120); R(x, '#8c86a8', 0, 1150, 1080, 14); R(x, '#5f5a7c', 0, 1164, 1080, 30)
  // a lamp post
  R(x, INK, 896, 600, 20, 550); R(x, '#4a4466', 900, 604, 12, 546); box(x, 860, 570, 90, 40, '#4a4466', { b: 6 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(905, 620, 10, 905, 620, 300); g.addColorStop(0, 'rgba(255,230,160,0.3)'); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(605, 320, 600, 600); x.restore()
}
function floorPhone(x, t, cx, cy, buzz) {
  const b = buzz ? 4 * Math.sin(t * 70) : 0
  box(x, cx - 70 + b, cy - 14, 140, 28, '#2a2148', { b: 6 })
  if (buzz) { label(x, 'bzz', cx - 110 + b, cy - 50, { size: 34, col: '#bcd2ff', font: INTER, weight: 800, rot: -0.2 }); label(x, 'bzz', cx + 110 - b, cy - 56, { size: 30, col: '#bcd2ff', font: INTER, weight: 800, rot: 0.2 }) }
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  street(x)
  if (phase === 'hook') {
    floorPhone(x, t, 230, 1140, true)
    bubble(x, t, 300, 1010, 0, 0, 'are we still on for friday?', { size: 36, k: 1, tail: -0.5 })
    const hx = 720 + 160 * t
    puff(x, hx - 230, 1100, 90, 0.9); puff(x, hx - 350, 1120, 60, 0.6)
    streaks(x, hx, 900, [1, 0], { n: 4, len: 160, gap: 50 })
    shadow(x, hx, 1150, 240)
    hero(x, t, { x: hx, y: 940, s: 270, mood: 'wide', look: [1, 0], squash: -0.12 + 0.06 * Math.sin(t * 40) })
    return
  }
  // skid back to the phone
  const back = ease.outCubic(prog(u, 0, 0.6))
  const hx = lerp(800, 290, back)
  if (u < 0.6) { puff(x, hx + 180, 1110, 70 * (1 - back), 0.8); streaks(x, hx, 950, [-1, 0], { n: 3, len: 120, gap: 50 }) }
  const picked = u > 0.8
  if (!picked) floorPhone(x, t, 230, 1140, false)
  shadow(x, hx, 1150, 240)
  const relieved = u > 3.5
  hero(x, t, { x: hx, y: 940, s: 270, mood: u < 0.8 ? 'wide' : relieved ? 'happy' : 'neutral', look: picked ? [1, -0.3] : [-1, 0.5], hops: [2.45 + 0.6, 2.45 + 1.0, 2.45 + 3.5], squash: u < 0.7 ? 0.1 * Math.sin(u * 30) * (1 - back) : 0 })
  if (picked) {
    phone(x, 720, 830, { w: 420, h: 600, rot: 0.05, sc: clamp(prog(u, 0.8, 1.0)), draw: (c, w) => {
      chat(c, w, 30, 'are we still on', { size: 32 }); chat(c, w, 92, 'for friday?', { size: 32 })
      if (u > 1.6) chat(c, w, 180, 'not feeling it,', { mine: true, size: 32, k: clamp(prog(u, 1.6, 1.75)) })
      if (u > 1.8) chat(c, w, 246, 'but thank you :)', { mine: true, size: 32, k: clamp(prog(u, 1.8, 1.95)) })
      if (u > 3.3) chat(c, w, 340, 'aw, thanks for', { size: 32, k: clamp(prog(u, 3.3, 3.45)), col: '#3fa07a' })
      if (u > 3.4) chat(c, w, 406, 'telling me!', { size: 32, k: clamp(prog(u, 3.4, 3.55)), col: '#3fa07a' })
    } })
  }
  if (relieved) { label(x, 'phew.', 300, 720, { size: 56, col: BONE, font: INTER, weight: 800 }); sparkles(x, t, 380, 900, 2.45 + 3.5, 8, 170, 1) }
}

const EP = makeThree({
  id: 'k3se09', sign: 'sagittarius', dur: 6.8, brk: 'freeze', ending: 'cut', focus: [700, 900],
  hook: "Ghosting them because | it's *awkward?*", accent: '#c9a6ff',
  advice: "A kind *'not for me'* | beats vanishing.",
  scene,
  cues: [
    ['whoosh', 0.0, 0.35, 0.04], ['tick', 0.1, 0.05], ['tick', 0.16, 0.05],
    ['whoosh', 2.45, 0.5, 0.05], ['tick', 3.1, 0.08], ['pop', 3.3, 880, 0.035, 0.3],
    ['pop', 4.05, 1174.66, 0.035, 0.3], ['pop', 4.25, 1318.51, 0.035, 0.3], ['pop', 5.75, 987.77, 0.04, -0.2], ['pop', 5.85, 1318.51, 0.04, -0.2], ['glitter', 5.95, 6.4],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
