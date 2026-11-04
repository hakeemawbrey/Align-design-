// ngwe46 · Your Star Guide: Winter · ♓ Pisces, winter note 2 / 4: the holiday blind spot (25 s; story 0–20.6, then the end card)
//   0.00  "Pisces, that's not all yours to carry."  Pisces wobbling under a tower of other people's scarves, sniffling.
//   3.0   ♓ YOUR STAR: "you carry everyone's feelings at the holidays."  Another scarf lands. Then another. Then a big one.
//   7.4   "their stress. their worries. now yours?"  The tower sways; Pisces staggers.
//  11.8   "you can care without carrying it all."  Three stars pop in and Pisces hands each scarf back, one by one,
//         a little lighter each time.
//  15.45  "Hand some | of it back."  Pisces with just its own scarf, standing tall. Happy tears.
import { winterGuide, drawStarChar, signStar, prog, ease, lerp, clamp, INK, R, box, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const SC = [['#e8344e', 'aries'], ['#2fc79a', 'capricorn'], ['#f2cf4a', 'gemini'], ['#38c4ec', 'aquarius'], ['#f39a3a', 'leo']]
const LAND = [-1, -1, 4.3, 5.3, 6.4]          // when each scarf lands on the pile (first two already there)
const BACK = [13.0, 13.6, 14.2, 14.8, 15.2]   // when each one is handed back (top first)
const TO = [[150, 1120], [930, 1120], [150, 900], [930, 900], [540, 600]]

const F = winterGuide({
  sign: 'pisces', note: 2, duration: 25,
  hook: "*Pisces,* that's not | all yours to carry.", hookSize: 94,
  lines: [
    { t: 3.0, text: "you carry everyone's feelings at the *holidays.*" },
    { t: 7.4, text: 'their stress. their worries. now *yours?*' },
    { t: 11.8, text: 'you can care without *carrying* it all.' },
  ],
  fact: 'PISCES: RULED BY JUPITER (TRADITIONAL)|AND NEPTUNE (MODERN)', factAt: 4.4, factDur: 2.6,
  last: '*Hand* some | of it back.',
  pisces: null,
  guide(t) {
    const load = SC.filter((_, i) => t > LAND[i] && t < BACK[SC.length - 1 - i]).length
    const sway = load * 0.012 * Math.sin(t * 3.5)
    const tears = t < 7.4 ? 1 : t < 13 ? 2 : t < 15.45 ? 1 : 3
    const mood = t < 13 ? (load >= 5 ? 'squint' : 'wide') : t < 15.45 ? 'sparkle' : 'happy'
    return { x: 540, y: 1160, size: 260, mood, look: [0, -1], tears, squash: 0.02 * load + sway, lanternSize: 66, hops: [...BACK.map(b => b + 0.05), 15.7, 16.3] }
  },
  drawFront(x, t, K, r) {
    const o = K.outAll(t)
    if (!r) return
    x.save(); x.globalAlpha *= o
    // the three owners who pop in to take theirs back
    TO.forEach(([tx, ty], j) => {
      if (j > 4) return
      const b = BACK[j]
      if (t < b - 0.3) return
      const id = SC[SC.length - 1 - j][1], S = signStar(id)
      drawStarChar(x, tx, ty + 30, 130, t, { color: S.color, glyph: null, seed: 20 + j, pop: K.pop01(t, b - 0.3, 0.3, 2.4), mood: t > b + 0.5 ? 'happy' : 'neutral', look: [tx < 540 ? 1 : -1, 0], hops: [b + 0.5] })
    })
    // the pile on Pisces' head
    let n = 0
    SC.forEach(([col], i) => {
      const back = BACK[SC.length - 1 - i]
      if (t < LAND[i]) return
      const land = ease.outBack(prog(t, LAND[i], LAND[i] + 0.4))
      const sway = Math.sin(t * 3.5 + 0.4) * n * 7 * (t < 13 ? 1 : 0.4)
      let sx = r.x + sway, sy = r.top + 10 - n * 34
      sy = lerp(sy - 300, sy, LAND[i] < 0 ? 1 : land)
      if (t > back) { const p = ease.inOutCubic(prog(t, back, back + 0.5)); const [tx, ty] = TO[SC.length - 1 - i]; sx = lerp(sx, tx, p); sy = lerp(sy, ty + 78, p) }
      const sw = t > back ? lerp(220, 130, clamp(prog(t, back, back + 0.5))) : 220
      box(x, sx - sw / 2, sy - 16, sw, 32, col, { b: 5 })
      for (let k = 0; k < 4; k++) R(x, 'rgba(255,255,255,0.4)', sx - sw / 2 + 20 + k * sw / 4.4, sy - 16, 12, 32)
      if (t < back) n++
    })
    // Pisces' own scarf, always on
    box(x, r.x - 70, r.y + 66, 140, 28, '#c9b8f0', { b: 5 }); box(x, r.x + 30, r.y + 92, 28, 40, '#c9b8f0', { b: 5 })
    x.restore()
    LAND.forEach((l, i) => { if (l > 0) K.burst(r.x + 150, r.top - 80 - i * 20, 60, t, l + 0.35, { word: 'FLOP', size: 26, life: 0.5 }) })
    heartsUp(x, t, 540, 940, 16.3, { n: 3, c: 6 })
  },
  cues: [
    ['tick', 0.5, 0.03], ['tick', 1.5, 0.03],
    ...LAND.filter(l => l > 0).map(l => ['whoosh', l, 0.4, 0.03]), ...LAND.filter(l => l > 0).map(l => ['boom', l + 0.35, 0.07]),
    ['whoosh', 9.0, 0.6, 0.02], ['tick', 9.6, 0.04],
    ...BACK.map((b, i) => ['pop', b + 0.5, [987.77, 1174.66, 1318.51, 1567.98, 1760][i], 0.04, (i % 2 ? 0.3 : -0.3)]), ['glitter', 15.3, 15.8],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
