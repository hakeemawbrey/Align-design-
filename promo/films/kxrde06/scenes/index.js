// kxrde06: RATE MY DATE IDEA: EXTENDED, "Pisces plans a walk with one umbrella" (75 s vertical, star_talk post,
// cinematic · Cm). The format lives in ../../kxrde01/rdkit.js. Ends on a LOOP: hookkit's loopBack eases the last 0.4 s
// back into frame 0 (Pisces mid-spin under the umbrella). Pisces is the pitcher here and does all the crying.
// ♓ Pisces' idea: a romantic walk in the rain with one umbrella, like in a film. ♏ Scorpio comes along.
//   0.0–3.0    HOOK: Pisces mid-spin under a tiny umbrella, rain streaks frozen mid-air, Scorpio half-soaked beside it.
//   3–13 THE PLAN · 13–23 ONE UMBRELLA (it fits one) · 23–33 THE GUST (inside out) · 33–43 BUT… (a passing bus
//   splashes them both; record scratch; Pisces cries, "it's the rain!!") · 43–53 THE SAVE (Scorpio laughs; the bus
//   shelter) · 53–63 THE MOMENT ("worst weather. best walk.") · 63–75 RATING 10/10 *soaked* · THE STARS · the moon peeks
//   out · "Soaked through. | *Closer* for it."
import { makeRD, rain, R, box, shadow, glow, hearts, sparkles, floor, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, SKYB } from '../../kxrde01/rdkit.js'

const GROUND = 1300
function street(x, t, { wet = 1 } = {}) {
  R(x, '#1e2440', 0, 300, 1080, 1000)
  for (let i = 0; i < 6; i++) { const bx = -40 + i * 200, bh = 360 + (i * 97) % 200; R(x, i % 2 ? '#262c50' : '#2c3360', bx, GROUND - bh - 120, 190, bh + 120)
    for (let j = 0; j < 6; j++) if ((i + j) % 3) R(x, '#e8c45c', bx + 24 + (j % 3) * 54, GROUND - bh - 80 + Math.floor(j / 3) * 80, 26, 34) }
  R(x, INK, 900, 760, 16, GROUND - 760); glow(x, 908, 770, 240, '255,220,150', 0.25); box(x, 870, 740, 76, 40, GOLD, { b: 6 })
  floor(x, GROUND, '#2a3048', '#4a5070'); R(x, '#20253a', 0, GROUND + 120, 1080, 500)
  // puddle reflections
  x.save(); x.globalAlpha = 0.35 * wet; for (let i = 0; i < 4; i++) R(x, '#e8c45c', 120 + i * 250 + 10 * Math.sin(t * 3 + i), GROUND + 40 + (i % 2) * 60, 90, 8); x.restore()
}
/** an umbrella; inv 0…1 turns it inside out */
function umbrella(x, cx, cy, s = 1, { rot = 0, inv = 0, col = '#ff8fb1' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -4, 0, 8, 150); R(x, INK, -4, 140, 26, 8); R(x, INK, 14, 120, 8, 26)
  const d = lerp(1, -1, inv)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-110, 6); x.quadraticCurveTo(0, -120 * d - 6, 110, 6); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-100, 0); x.quadraticCurveTo(0, -108 * d, 100, 0); x.closePath(); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.3)'; x.beginPath(); x.moveTo(-60, -4); x.quadraticCurveTo(-30, -70 * d, 0, -4); x.closePath(); x.fill()
  x.restore()
}
const drips = (x, t, cx, cy, n = 3) => { for (let i = 0; i < n; i++) { const p = ((t * 1.4 + i / n) % 1); R(x, SKYB, cx - 40 + i * 40, cy + p * 90, 8, 14) } }
function shelterBox(x) { R(x, INK, 120, 700, 14, GROUND - 700); R(x, INK, 940, 700, 14, GROUND - 700); box(x, 110, 680, 860, 40, '#4a5070', { b: 6 }); R(x, 'rgba(160,200,255,0.18)', 134, 720, 806, 480); box(x, 300, 1150, 480, 40, '#6b4a2f', { b: 5 }) }

const EP = makeRD({
  id: 'kxrde06', sign: 'pisces', date: 'scorpio', accent: SKYB, deep: '#2a6ab0', loop: true,
  idea: 'One umbrella. Two people. *Rain.*',
  hook(x, t, S) {
    street(x, t)
    rain(x, t, { frozenAt: 0.3 + t * 0.05, a: 0.6 })
    const sp = (t + 0.3) * 2.2
    shadow(x, 440, GROUND + 10, 240)
    umbrella(x, 440, 880, 0.9, { rot: 0.35 * Math.sin(sp * 3) })
    S.hero(x, t, { x: 440, y: 1110, s: 250, mood: 'sparkle', look: [Math.sin(sp * 3) > 0 ? 1 : -1, -1], tears: 2, rot: 0.2 * Math.sin(sp * 3) })
    shadow(x, 760, GROUND + 10, 200)
    S.date(x, t, { x: 760, y: 1120, s: 220, mood: 'squint', look: [-1, -1] })
    drips(x, t, 760, 1000, 4)
  },
  chapters: [
    { title: 'THE PLAN', caption: 'A rainy walk. *Like in a film.*',
      draw(x, t, S) {
        street(x, t); rain(x, t)
        shadow(x, 360, GROUND + 10, 220); shadow(x, 700, GROUND + 10, 200)
        umbrella(x, 360, 880, 0.9)
        S.hero(x, t, { x: 360, y: 1110, s: 240, mood: 'sparkle', look: [1, -1], tears: 1, hops: [S.t0 + 0.8, S.t0 + 5.6] })
        S.date(x, t, { x: 700, y: 1120, s: 220, mood: S.u > 3 ? 'squint' : 'neutral', look: [-1, -1] })
        drips(x, t, 700, 1000)
      },
      bubbles: [[0.8, 3.0, 'one umbrella. so romantic.', { x: 360, y: 720 }], [3.4, 5.4, 'it’s a very small umbrella.', { x: 700, y: 760 }], [5.8, 8.0, 'that’s the romantic part!', { x: 360, y: 720 }]] },
    { title: 'ONE UMBRELLA', caption: 'It fits *one.* Barely.', cuts: [4.6],
      draw(x, t, S) {
        street(x, t); rain(x, t)
        const sq = ease.inOutCubic(prog(S.u, 0.5, 2.0))
        shadow(x, 520, GROUND + 10, 300)
        umbrella(x, 540, 860, 0.9, { rot: 0.05 * Math.sin(t * 3) })
        S.hero(x, t, { x: lerp(420, 470, sq), y: 1110, s: 230, mood: 'happy', look: [1, 0], tears: 1 })
        S.date(x, t, { x: lerp(720, 630, sq), y: 1120, s: 210, mood: S.u > 4.6 ? 'squint' : 'neutral', look: [-1, 0] })
        drips(x, t, 700, 990, 4); drips(x, t, 380, 990, 3)
        if (S.u > 4.6) { R(x, SKYB, 690, 1040, 60, 8); R(x, SKYB, 360, 1050, 50, 8) }
      },
      bubbles: [[2.2, 4.4, 'my left half is in the umbrella', { x: 720, y: 760 }], [4.8, 6.8, 'and your right half?', { x: 420, y: 720 }], [7.0, 9.0, 'swimming.', { x: 720, y: 760 }]],
      cues: [['tick', 4.6, 0.05]] },
    { title: 'THE GUST', caption: 'The wind flips it *inside out.*', cuts: [4.0],
      draw(x, t, S) {
        street(x, t); rain(x, t, { slant: 0.55, speed: 2400 })
        const inv = ease.outBack(prog(S.u, 0.8, 1.2)), fly = ease.inOutCubic(prog(S.u, 4.0, 6.0))
        umbrella(x, lerp(440, 900, fly), lerp(860, 600, fly) - 60 * Math.sin(fly * 6), 0.9, { inv, rot: 0.3 + fly * 3 })
        shadow(x, 440, GROUND + 10, 220); shadow(x, 700, GROUND + 10, 200)
        S.hero(x, t, { x: lerp(440, 560, fly), y: 1110, s: 230, mood: 'wide', look: [1, -1], tears: 2, hops: [S.t0 + 4.2, S.t0 + 4.6, S.t0 + 5.0, S.t0 + 5.4] })
        S.date(x, t, { x: 700, y: 1120, s: 210, mood: S.u > 1 ? 'wide' : 'neutral', look: [0, -1] })
        drips(x, t, 440, 990, 4); drips(x, t, 700, 990, 4)
      },
      bubbles: [[1.4, 3.4, 'NO. NO NO NO.', { x: 420, y: 720 }], [6.4, 8.6, '…it’s fine. it’s romantic.', { x: 520, y: 760 }]],
      cues: [['whoosh', 0.8, 0.8, 0.05], ['pop', 1.1, 330, 0.04, 0], ['whoosh', 4.0, 1.8, 0.04]] },
    { title: 'BUT…', tag: 'BUT…', caption: 'A passing bus *splashes them both.*', cuts: [5.2],
      draw(x, t, S) {
        street(x, t); rain(x, t)
        const bx = lerp(1300, -900, prog(S.u, 1.6, 3.4))
        if (S.u > 1.4 && S.u < 3.6) { box(x, bx, GROUND - 420, 760, 360, '#5a6a9a', { b: 8 }); for (let i = 0; i < 5; i++) box(x, bx + 40 + i * 140, GROUND - 370, 110, 120, '#1a2a56', { b: 5 }) }
        const sp = prog(S.u, 2.2, 3.4)
        if (sp > 0 && sp < 1) for (let i = 0; i < 20; i++) { const a = -Math.PI / 2 + (i / 20 - 0.5) * 2.2; R(x, SKYB, 560 + Math.cos(a) * 500 * sp, GROUND - Math.sin(-a) * 600 * sp + 700 * sp * sp, 14, 14) }
        shadow(x, 440, GROUND + 10, 220); shadow(x, 700, GROUND + 10, 200)
        const soaked = S.u > 2.6
        S.hero(x, t, { x: 440, y: 1110, s: 230, mood: soaked ? 'sparkle' : 'happy', look: [1, 0], tears: soaked ? 3 : 1, squash: soaked && S.u < 3.4 ? 0.1 : 0 })
        S.date(x, t, { x: 700, y: 1120, s: 210, mood: soaked ? 'wide' : 'neutral', look: [-1, 0], squash: soaked && S.u < 3.4 ? 0.1 : 0 })
        if (soaked) { drips(x, t, 440, 990, 5); drips(x, t, 700, 990, 5) }
      },
      bubbles: [[5.4, 7.0, 'are you… crying?', { x: 700, y: 760 }], [7.2, 9.2, 'IT’S THE RAIN!!', { x: 420, y: 720 }]],
      cues: [['whoosh', 1.6, 1.8, 0.05], ['boom', 2.6, 0.15], ['glitter', 2.6, 3.2]] },
    { title: 'THE SAVE', caption: 'Scorpio *laughs.* First time all night.', cuts: [4.8],
      draw(x, t, S) {
        street(x, t); rain(x, t)
        if (S.u > 4.8) shelterBox(x)
        const sit = S.u > 4.8
        S.hero(x, t, { x: sit ? 440 : 420, y: sit ? 1080 : 1110, s: 230, mood: 'happy', look: [1, 0], tears: 2, hops: [S.t0 + 1.2] })
        S.date(x, t, { x: sit ? 640 : 700, y: sit ? 1090 : 1120, s: 210, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.6, S.t0 + 0.9, S.t0 + 1.2, S.t0 + 1.5, S.t0 + 1.8] })
        if (!sit) { drips(x, t, 420, 990, 5); drips(x, t, 700, 990, 5) }
      },
      bubbles: [[0.6, 2.8, 'HA. we look ridiculous.', { x: 700, y: 760 }], [5.2, 7.6, 'shelter! come on!', { x: 640, y: 860 }]],
      cues: [['pop', 0.6, 880, 0.04, 0.3], ['pop', 0.9, 987.77, 0.04, 0.3], ['pop', 1.2, 1174.66, 0.04, 0.3]] },
    { title: 'THE MOMENT', caption: 'The bus shelter. *Closer.*', cuts: [5.0],
      draw(x, t, S) {
        street(x, t); rain(x, t, { a: 0.4 }); shelterBox(x)
        S.hero(x, t, { x: 470, y: 1080, s: 230, mood: S.u > 5 ? 'sparkle' : 'happy', look: [1, 0], tears: S.u > 5 ? 3 : 1, blush: 0.8 })
        S.date(x, t, { x: 620, y: 1090, s: 210, mood: S.u > 2.6 ? 'heart' : 'happy', look: [-1, 0], blush: 0.8 })
        hearts(x, t, S.t0 + 2.8, 545, 880, { n: 6, rise: 220 })
      },
      bubbles: [[1.0, 3.6, 'worst weather. best walk.', { x: 640, y: 820 }], [5.2, 7.6, 'same umbrella next time?', { x: 460, y: 820 }]] },
  ],
  ratingBg(x, t) { street(x, t, { wet: 1 }); rain(x, t, { a: lerp(0.4, 0, prog(t, 69.0, 70.5)) }); shelterBox(x) },
  epilogue(x, t) {
    // the rain stops and the moon peeks out over the rooftops
    if (t < 69.4) return
    const k = ease.outCubic(prog(t, 69.6, 71.0))
    glow(x, 860, lerp(560, 450, k), 200, '230,240,255', 0.4 * k)
    x.fillStyle = '#f4f1e6'; x.beginPath(); x.arc(860, lerp(560, 450, k), 56, 0, Math.PI * 2); x.fill()
  },
  finale(x, t, S) {
    S.hero(x, t, { x: 470, y: 1080, s: 240, pop: S.ok, mood: 'sparkle', look: [1, t > 70 ? -1 : 0], tears: 3, hops: [63.84, 64.3, 70.2] })
    S.date(x, t, { x: 640, y: 1090, s: 210, pop: S.ok, mood: 'heart', look: [-1, t > 70 ? -1 : 0], hops: [63.9, 70.3] })
  },
  score: '10/10', word: 'soaked',
  starsLine: 'two wet socks. one big laugh. *ten.*',
  recs: [{ at: 36.4, len: 1.4, caption: 'a bus. a puddle. *both of them.*', sub: 'the romantic walk, versus' }],
  last: 'Soaked through. | *Closer* for it.',
  hookCues: [['whoosh', 0.0, 0.7, 0.04]],
  extraCues: [['glitter', 69.7, 70.4], ['bell', 70.0, 1760, 0.025, 1.4, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, outK, pop01, clamp, BONE, PINK, RED, CREAM]
