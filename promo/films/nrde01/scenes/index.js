// nrde01: RATE MY DATE IDEA, "Aries plans ice skating at 7 AM" (16 s vertical trial reel, music: pop · E).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ./datekit.js (shared by nrde01–nrde24).
//   0.0–2.6   hook: "Rate my *date idea:*" + “Ice skating. *7 AM.* Be ready.”  ♈ Aries on skates, mid-spin, speed lines.
//   2.6–5.8   THE PLAN "Laps. *Fast* laps."  Aries zooms round the rink; the ♎ Libra date clings to the rail.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "their date is *holding the wall.*"  Aries skids to a stop (ice spray), holds out a hand; the two glide
//             slowly, side by side, a heart between them.
//   9.32      THE STARS RATE IT 8/10 *once you slowed down*.  Pisces: 10/10, fountaining.
//   9.8       THE STARS: "Fast is fun. *Together* is better."
import { makeDate, R, box, bubble, label, shadow, sparkles, hearts, starFrame, speedLines, snow, card, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, HOOK } from '../../nrde01/scenes/datekit.js'

// a pair of skate boots + blades under a star (follows the sprite's hops)
function skates(x, t, o) {
  const F = starFrame(o.x, o.y, o.s, t, o)
  const fy = F.oy, w = o.s * 0.2
  for (const d of [-1, 1]) {
    const cx = o.x + d * o.s * 0.29
    box(x, cx - w / 2, fy - w * 0.35, w, w * 0.5, '#f4f0ff', { b: 4 })
    R(x, '#ff6b7f', cx - w / 2, fy - w * 0.35, w, 6)
    R(x, INK, cx - w * 0.62, fy + w * 0.2, w * 1.24, 9); R(x, '#cfe6ff', cx - w * 0.58, fy + w * 0.2 + 2, w * 1.16, 4)
  }
}
function rink(x, t) {
  R(x, '#bfe3f7', 0, 980, 1080, 340); R(x, '#d8f0ff', 0, 980, 1080, 12)
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.45)', ((i * 210 + t * 30) % 1200) - 100, 1040 + (i % 3) * 70, 120, 5)
  // the rail
  R(x, INK, 0, 900, 1080, 16); R(x, '#e8eef8', 0, 904, 1080, 8)
  for (let i = 0; i < 9; i++) R(x, INK, 30 + i * 130, 910, 12, 78)
  R(x, '#33407a', 0, 988, 1080, 6)
}

const EP = makeDate({
  id: 'nrde01', sign: 'aries', date: 'libra', accent: '#ff6b5a', deep: '#c0282e',
  idea: 'Ice skating. *7 AM.* Be ready.',
  hook(x, t, S) {
    // a fast spin: the star swings left-right with speed lines, skates on
    const sw = Math.sin(t * 5.2) * 70
    snow(x, t, { n: 22, a: 0.5, y0: 520, y1: 1500 })
    R(x, '#bfe3f7', 0, 1300, 1080, 220); R(x, '#d8f0ff', 0, 1300, 1080, 12)
    for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.5)', ((i * 290 + t * 80) % 1200) - 100, 1350 + (i % 2) * 70, 140, 6)
    shadow(x, 540 + sw, 1320, 260)
    const o = { x: 540 + sw, y: 1080, s: 330, mood: 'happy', look: [Math.sign(Math.cos(t * 5.2)), 0], hops: S.HOOK_HOPS, squash: -0.04 }
    speedLines(x, o.x, o.y, Math.cos(t * 5.2) > 0 ? -1 : 1, 4, 130, 0.55)
    S.hero(x, t, o); skates(x, t, o)
  },
  hookPis: { x: 940, y: 1700 },
  beats: [
    { caption: 'Laps. *Fast* laps.', draw(x, t, S) {
      const { u, hero, date } = S
      rink(x, t)
      // the date at the rail, wobbling
      const wob = Math.sin(t * 11) * 0.06
      shadow(x, 190, 1010, 160)
      const od = { x: 190, y: 880, s: 190, mood: 'wide', look: [1, 0], squash: wob, hops: [S.t0 + 0.9, S.t0 + 1.9] }
      date(x, t, od); skates(x, t, od)
      // Aries laps: left↔right in a long ellipse
      const a = u * 3.4 + 0.6, ax = 600 + Math.cos(a) * 330, ay = 1110 + Math.sin(a) * 60
      const sc = 1 + Math.sin(a) * 0.12
      shadow(x, ax, ay + 120 * sc, 200 * sc)
      const oa = { x: ax, y: ay, s: 220 * sc, mood: 'happy', look: [-Math.sign(Math.sin(a)), 0], hops: [S.t0 + 0.5, S.t0 + 1.4, S.t0 + 2.3] }
      speedLines(x, ax, ay, Math.sin(a) > 0 ? 1 : -1, 4, 140, 0.6)
      hero(x, t, oa); skates(x, t, oa)
      card(x, 860, 720, 220, 90, `LAP ${Math.min(12, 1 + Math.floor(u * 3.4 / (Math.PI * 2) * 4))}`, { size: 44, rot: 0.06, k: pop01(t, S.t0 + 0.6, 0.3, 2.4) })
      bubble(x, t, 330, 700, S.t0 + 1.5, S.t1, 'is it meant to be slippery??', { size: 34, tail: -0.5 })
    }, cues: [['whoosh', 0.3, 0.3, 0.03], ['whoosh', 1.2, 0.3, 0.03], ['whoosh', 2.1, 0.3, 0.03], ['pop', 0.62, 1318.51, 0.035, 0.4], ['pop', 1.52, 659.25, 0.03, -0.4]] },
    { caption: 'their date is *holding the wall.*', draw(x, t, S) {
      const { u, hero, date } = S
      rink(x, t)
      // Aries skids in from the right (ice spray), stops, offers a hand; then they glide together
      const stop = ease.outCubic(prog(u, 0.0, 0.6))
      const glide = ease.inOutCubic(prog(u, 1.5, 3.4))
      const dx = lerp(0, 380, glide)
      const ax = lerp(1000, 440, stop) + dx, dateX = 220 + dx
      if (u < 0.75) for (let i = 0; i < 10; i++) { const p = (u * 3 + i / 10) % 1; x.save(); x.globalAlpha = 0.8 * (1 - p); R(x, '#ffffff', ax + 80 + p * 120 + i * 6, 1100 - p * 120 - (i % 4) * 20, 10, 10); x.restore() }
      shadow(x, dateX, 1080, 170); shadow(x, ax, 1090, 190)
      const od = { x: dateX, y: 950, s: 200, mood: u < 1.3 ? 'wide' : 'happy', look: [1, 0], squash: u < 1.3 ? Math.sin(t * 11) * 0.06 : 0, hops: [S.t0 + 1.35] }
      const oa = { x: ax, y: 960, s: 210, mood: u < 0.6 ? 'wide' : 'sparkle', look: [-1, 0.2], hops: [S.t0 + 0.62, S.t0 + 1.3] }
      date(x, t, od); skates(x, t, od); hero(x, t, oa); skates(x, t, oa)
      // the held hands: a little pink link + heart
      const hk = pop01(t, S.t0 + 1.3, 0.3, 2.4)
      if (hk > 0.01) { const mx = (dateX + ax) / 2; R(x, INK, dateX + 80, 990, ax - dateX - 160, 14); R(x, PINK, dateX + 84, 993, ax - dateX - 168, 8); hearts(x, t, S.t0 + 1.4, mx, 900, { n: 5 }) }
      bubble(x, t, ax, 740, S.t0 + 0.7, S.t0 + 1.9, 'wait. hand?', { size: 34, tail: 0.1 })
      label(x, 'slow lap', 540 + dx * 0.4, 1240, { size: 34, col: INK, alpha: clamp(prog(u, 1.6, 2.0)) * 0.8 })
    }, cues: [['whoosh', 0.0, 0.5, 0.04], ['tick', 0.55, 0.06], ['pop', 0.72, 880, 0.035, 0.3], ['pop', 1.32, 1318.51, 0.04, 0], ['pluck', 1.45, 1174.66, 0.04, 0.3, 0.3], ['pluck', 1.6, 1567.98, 0.035, 0.3, 0.3]] },
  ],
  score: '8/10', word: 'once you slowed down',
  last: 'Fast is fun. *Together* is better.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, GOLD, BONE, outK, sparkles, HOOK]
