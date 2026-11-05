// kxrde02: RATE MY DATE IDEA: EXTENDED, "Cancer plans walking shelter dogs" (75 s vertical, star_talk post, pop · D).
// The format lives in ../../kxrde01/rdkit.js. No end card, no card transition: hard cut on the last line.
// ♋ Cancer's idea: volunteer at the shelter and walk the dogs. All of them. ♑ Capricorn comes along.
//   0.0–3.0    HOOK: Cancer mid-yank by six leashes, dogs pulling six ways; the pitch sticker.
//   3–13 THE PLAN · 13–23 THE TANGLE (Capricorn spun like a maypole) · 23–33 THE PARK (the shyest dog picks Capricorn)
//   33–43 BUT… (Cancer falls for one old dog and cries: "is this too much?") · 43–53 THE SAVE (Capricorn sits in the
//   grass, no rush) · 53–63 THE MOMENT (Capricorn laughs) · 63–75 RATING 10/10 *muddy* · Pisces 11/10 · THE STARS ·
//   the old dog's kiss · "Show them what | makes you *soft.*"
import { makeRD, R, box, shadow, glow, hearts, sparkles, floor, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM } from '../../kxrde01/rdkit.js'

const GROUND = 1300
const DOGS = [['#c98e5e', '#8a5a3a'], ['#efe6d6', '#c9bba4'], ['#3a2d26', '#5a4a3a'], ['#e8b25a', '#b07a3a'], ['#9a9aa8', '#6a6a7a'], ['#d9734a', '#a04a2a']]
/** a pixel dog, facing dir (1 = right); run 0…1 animates the legs; s scale */
function dog(x, t, cx, cy, { col = DOGS[0], dir = 1, s = 1, run = 1, old = false, sit = false, seed = 0 } = {}) {
  const [c, d] = col
  x.save(); x.translate(cx, cy); x.scale(dir * s, s)
  const ph = t * 14 * run + seed, bob = sit ? 0 : Math.abs(Math.sin(ph)) * 6 * run
  x.translate(0, -bob)
  // legs
  if (!sit) for (const [lx, o] of [[-40, 0], [-24, Math.PI], [24, Math.PI / 2], [40, Math.PI * 1.5]]) { const sw = Math.sin(ph + o) * 10 * run; R(x, INK, lx - 7 + sw, 10, 14, 34); R(x, d, lx - 4 + sw, 12, 8, 30) }
  else { R(x, INK, -48, -4, 40, 40); R(x, d, -44, 0, 32, 32); R(x, INK, 20, 6, 14, 38); R(x, d, 23, 8, 8, 34) }
  // body + tail
  box(x, -56, -30, 112, 48, c, { b: 6 })
  const wag = Math.sin(t * 18 + seed) * 0.6
  x.save(); x.translate(-56, -24); x.rotate(-0.8 + wag); R(x, INK, -6, -40, 14, 44); R(x, c, -3, -37, 8, 38); x.restore()
  // head
  box(x, 40, -66, 52, 46, c, { b: 6 }); R(x, INK, 84, -50, 20, 18); R(x, c, 86, -48, 14, 12); R(x, INK, 100, -48, 6, 6)
  R(x, INK, 62, -54, 7, 7); R(x, d, 34, -70, 18, 34)
  if (old) { R(x, '#d8d2c8', 80, -46, 24, 16); R(x, '#d8d2c8', 46, -66, 30, 8) }
  x.restore()
}
function leash(x, x0, y0, x1, y1) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + 40, x1, y1); x.stroke(); x.restore() }
function park(x, t, dusk = false) {
  R(x, dusk ? '#3a2d6a' : '#7ac8f0', 0, 300, 1080, 700); if (dusk) R(x, '#e88a6a', 0, 860, 1080, 140); glow(x, 840, dusk ? 860 : 420, 200, '255,200,150', 0.5)
  for (let i = 0; i < 5; i++) { const tx = 80 + i * 240; R(x, '#6b4a2f', tx - 10, 700, 20, 300); x.fillStyle = INK; x.beginPath(); x.arc(tx, 680, 100, 0, Math.PI * 2); x.fill(); x.fillStyle = i % 2 ? '#4fae6a' : '#5fbe7a'; x.beginPath(); x.arc(tx, 680, 92, 0, Math.PI * 2); x.fill() }
  floor(x, 1000, '#5fae5a', '#7fce7a'); R(x, '#4f9e4a', 0, GROUND + 100, 1080, 600)
  for (let i = 0; i < 20; i++) R(x, '#7fce7a', (i * 113) % 1080, 1060 + (i * 47) % 500, 8, 16)
}
function shelter(x, t) {
  R(x, '#9ad0f0', 0, 300, 1080, 700)
  box(x, 140, 560, 800, 440, '#f2e2c8', { b: 8 }); R(x, '#d84a3a', 120, 520, 840, 60)
  box(x, 460, 760, 160, 240, '#8a5a3a', { b: 6 }); for (const wx of [220, 720]) box(x, wx, 660, 160, 120, '#1a2a56', { b: 6 })
  // a paw-print sign (no words)
  box(x, 480, 600, 120, 120, BONE, { b: 6 }); R(x, INK, 520, 650, 40, 36); for (const [px, py] of [[510, 628], [530, 618], [552, 618], [572, 628]]) R(x, INK, px, py, 14, 14)
  floor(x, 1000, '#b8a890', '#d0c0a8'); R(x, '#a89880', 0, GROUND + 100, 1080, 600)
}
const mud = (x, cx, cy) => { R(x, '#6b4a2f', cx, cy, 18, 12); R(x, '#6b4a2f', cx + 22, cy - 14, 12, 10); R(x, '#6b4a2f', cx - 8, cy + 18, 10, 8) }

const EP = makeRD({
  id: 'kxrde02', sign: 'cancer', date: 'capricorn', accent: GOLD, deep: '#2a6ab0',
  idea: 'We walk the *shelter dogs.* All of them.',
  hook(x, t, S) {
    park(x, t)
    const cx = 540 + 20 * Math.sin(t * 13), cy = 1120
    const pts = [[160, 1180, -1], [260, 1300, -1], [380, 1420, -1], [700, 1420, 1], [830, 1300, 1], [930, 1180, 1]]
    pts.forEach(([dx, dy, dir], i) => { leash(x, cx + dir * 60, cy, dx - dir * 40, dy - 40); dog(x, t, dx, dy, { col: DOGS[i], dir, s: 1.0, seed: i * 1.3 }) })
    shadow(x, cx, GROUND + 10, 240)
    S.hero(x, t, { x: cx, y: cy, s: 250, mood: 'wide', look: [0, 0], squash: -0.06 + 0.04 * Math.sin(t * 20), hops: [0.1, 0.5, 0.9] })
    S.pisces(x, t, { x: 960, y: 920, s: 130, tears: 2, mood: 'sparkle' })
  },
  chapters: [
    { title: 'THE PLAN', caption: 'A volunteer walk. *Six dogs.*',
      draw(x, t, S) {
        shelter(x, t)
        shadow(x, 360, GROUND + 10, 220); shadow(x, 700, GROUND + 10, 200)
        S.hero(x, t, { x: 360, y: 1110, s: 250, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 0.8, S.t0 + 1.4] })
        S.date(x, t, { x: 700, y: 1120, s: 230, mood: S.u > 4 && S.u < 6 ? 'wide' : 'neutral', look: [-1, 0], hops: [S.t0 + 4.2] })
        box(x, 780, 1080, 70, 90, CREAM, { b: 4 }); for (let i = 0; i < 4; i++) R(x, '#7a8aa8', 790, 1096 + i * 16, 46, 5)
        if (S.u > 6.5) for (let i = 0; i < 6; i++) { const k = pop01(t, S.t0 + 6.5 + i * 0.15, 0.25, 2.4); if (k > 0.01) dog(x, t, 120 + i * 170, 1430, { col: DOGS[i], s: k * 0.8, run: 0.4, sit: true, seed: i }) }
      },
      bubbles: [[0.8, 3.4, 'the shelter needs walkers. so do i!', { x: 420, y: 800 }], [4.2, 6.4, 'six dogs? okay. i have a system.', { x: 680, y: 820 }]],
      cues: [['pop', 6.5, 880, 0.03, -0.4], ['pop', 6.65, 987.77, 0.03, -0.2], ['pop', 6.8, 1174.66, 0.03, 0], ['pop', 6.95, 1318.51, 0.03, 0.2]] },
    { title: 'THE TANGLE', caption: 'Capricorn: *spun like a maypole.*', cuts: [5.0],
      draw(x, t, S) {
        park(x, t)
        const spin = S.u * 5
        for (let i = 0; i < 6; i++) { const a = spin + i * Math.PI / 3, dx = 540 + Math.cos(a) * 330, dy = 1250 + Math.sin(a) * 110; leash(x, 540, 1080, dx, dy - 40); dog(x, t, dx, dy, { col: DOGS[i], dir: Math.sin(a) > 0 ? -1 : 1, s: 0.85, seed: i }) }
        // leashes wrapped round Capricorn
        x.save(); x.globalAlpha = clamp(S.u / 3)
        for (let k = 0; k < 4; k++) R(x, RED, 430, 1030 + k * 30, 220, 8)
        x.restore()
        S.date(x, t, { x: 540, y: 1080, s: 240, mood: 'wide', look: [Math.sin(spin) > 0 ? 1 : -1, 0], squash: 0.05 * Math.sin(t * 20) })
        S.hero(x, t, { x: 180, y: 1110, s: 200, mood: S.u > 5 ? 'happy' : 'wide', look: [1, 0], hops: [S.t0 + 5.2, S.t0 + 5.6] })
      },
      bubbles: [[1.0, 3.0, 'the system is failing', { x: 600, y: 760 }], [5.2, 7.4, 'hold on, i’ll untangle you!', { x: 330, y: 820 }]],
      cues: [['whoosh', 0.2, 1.5, 0.03], ['whoosh', 2.0, 1.5, 0.03], ['pop', 8.0, 659.25, 0.035, 0]] },
    { title: 'THE PARK', caption: 'The shyest dog *picks Capricorn.*', cuts: [4.6],
      draw(x, t, S) {
        park(x, t)
        for (let i = 0; i < 5; i++) dog(x, t, 120 + ((i * 210 + t * 60) % 1100) - 50, 1400 + (i % 2) * 60, { col: DOGS[i], s: 0.7, seed: i })
        const walk = ease.inOutCubic(prog(S.u, 1.0, 4.0))
        dog(x, t, lerp(1100, 760, walk), 1240, { col: DOGS[4], dir: -1, s: 0.9, run: walk < 1 ? 0.5 : 0, sit: walk >= 1, seed: 9 })
        shadow(x, 620, GROUND + 10, 200); shadow(x, 300, GROUND + 10, 200)
        S.date(x, t, { x: 620, y: 1100, s: 230, mood: S.u > 4.6 ? 'sparkle' : 'neutral', look: S.u > 4 ? [1, 1] : [0, 0], blush: S.u > 4.6 ? 0.9 : 0 })
        S.hero(x, t, { x: 300, y: 1110, s: 220, mood: S.u > 4.6 ? 'heart' : 'happy', look: [1, 0], hops: [S.t0 + 5.0] })
        if (S.u > 4.6) hearts(x, t, S.t0 + 4.8, 700, 1000, { n: 4, rise: 160 })
      },
      bubbles: [[5.0, 7.4, 'she doesn’t go to anyone. she picked you.', { x: 380, y: 820 }]],
      cues: [['pluck', 4.6, 1567.98, 0.035, 0.4, 0.3]] },
    { title: 'BUT…', tag: 'BUT…', caption: 'Cancer falls for *one old dog.* And cries.', cuts: [4.4],
      draw(x, t, S) {
        shelter(x, t)
        dog(x, t, 480, 1330, { col: ['#b0a090', '#8a7a6a'], dir: 1, s: 1.1, sit: true, old: true, run: 0.2 })
        shadow(x, 300, GROUND + 10, 220); shadow(x, 760, GROUND + 10, 200)
        S.hero(x, t, { x: 300, y: 1110, s: 240, mood: 'sparkle', look: [1, 1], tears: S.u > 1.6 ? 2 : 1 })
        S.date(x, t, { x: 760, y: 1120, s: 220, mood: S.u > 4.4 ? 'wide' : 'neutral', look: [-1, 0] })
      },
      bubbles: [[1.6, 3.8, 'he’s been here the longest…', { x: 360, y: 820 }], [4.6, 7.2, 'sorry. is this too much?', { x: 360, y: 820 }]],
      pis: { tears: 3, mood: 'sparkle' },
      cues: [['pluck', 1.6, 1174.66, 0.03, 0.6, -0.2], ['tick', 4.4, 0.05]] },
    { title: 'THE SAVE', caption: 'Capricorn sits down *in the grass.* No rush.', cuts: [3.6],
      draw(x, t, S) {
        park(x, t)
        const sit = ease.inOutCubic(prog(S.u, 0.6, 2.4))
        dog(x, t, 540, 1360, { col: ['#b0a090', '#8a7a6a'], dir: 1, s: 1.0, sit: true, old: true, run: 0.2 })
        S.hero(x, t, { x: 330, y: 1150, s: 230, mood: S.u > 6 ? 'happy' : 'sparkle', look: [1, 0], tears: S.u > 6 ? 1 : 2 })
        S.date(x, t, { x: lerp(820, 740, sit), y: lerp(1120, 1180, sit), s: 220, mood: 'happy', look: [-1, 0], squash: 0.08 * sit })
        if (S.u > 3.6) mud(x, 700, 1240)
      },
      bubbles: [[3.8, 6.2, 'not too much. take your time.', { x: 700, y: 840 }], [6.6, 8.6, 'he likes you, you know', { x: 380, y: 860 }]],
      cues: [['whoosh', 0.6, 1.6, 0.02]] },
    { title: 'THE MOMENT', caption: 'Capricorn *laughs.* Out loud.', cuts: [4.0],
      draw(x, t, S) {
        park(x, t)
        for (let i = 0; i < 6; i++) dog(x, t, 120 + i * 170, 1430 + (i % 2) * 40, { col: DOGS[i], s: 0.75, seed: i, run: 0.6, dir: i % 2 ? -1 : 1 })
        shadow(x, 360, GROUND + 10, 220); shadow(x, 700, GROUND + 10, 200)
        S.hero(x, t, { x: 360, y: 1110, s: 240, mood: 'happy', look: [1, 0], hops: [S.t0 + 4.2, S.t0 + 4.6] })
        S.date(x, t, { x: 700, y: 1120, s: 230, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.0, S.t0 + 1.35, S.t0 + 1.7, S.t0 + 2.05] })
        mud(x, 650, 1060); mud(x, 330, 1080); mud(x, 760, 1140)
        hearts(x, t, S.t0 + 6.5, 540, 940, { n: 6, rise: 240 })
      },
      bubbles: [[1.0, 3.6, 'i haven’t laughed this much in ages', { x: 680, y: 820 }], [4.2, 6.4, 'same time next week?', { x: 380, y: 840 }], [6.6, 8.4, 'bring the old guy.', { x: 680, y: 820 }]],
      cues: [['pop', 1.0, 880, 0.04, 0.3], ['pop', 1.35, 987.77, 0.04, 0.3], ['pop', 1.7, 1174.66, 0.04, 0.3], ['glitter', 6.5, 7.0]] },
  ],
  ratingBg(x, t) { park(x, t, true) },
  epilogue(x, t) {
    if (t < 69.5) return
    dog(x, t, lerp(1200, 740, ease.outCubic(prog(t, 69.5, 70.6))), 1360, { col: ['#b0a090', '#8a7a6a'], dir: -1, s: 1.0, old: true, run: t < 70.6 ? 0.5 : 0, sit: t >= 70.6 })
    if (t > 70.8) hearts(x, t, 70.9, 720, 980, { n: 5, rise: 200 })
  },
  finale(x, t, S) {
    shadow(x, 400, GROUND + 10, 220); shadow(x, 690, GROUND + 10, 200)
    S.hero(x, t, { x: 400, y: 1110, s: 250, mood: 'happy', look: [1, 0], hops: [63.84, 64.3] })
    S.date(x, t, { x: 690, y: 1120, s: 220, mood: t > 70.9 ? 'heart' : 'happy', look: t > 70 ? [1, 1] : [-1, 0], hops: [63.9, 71.0, 71.4] })
  },
  score: '10/10', word: 'muddy', pisScore: '11/10',
  starsLine: 'kind, patient, a bit *muddy.* perfect.',
  last: 'Show them what | makes you *soft.*',
  hookCues: [['pop', 0.2, 1318.51, 0.03, -0.3], ['pop', 0.35, 1567.98, 0.03, 0.3], ['whoosh', 0.0, 0.6, 0.04]],
  extraCues: [['pop', 70.6, 659.25, 0.035, 0.3], ['glitter', 70.9, 71.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, outK, PINK, BONE]
