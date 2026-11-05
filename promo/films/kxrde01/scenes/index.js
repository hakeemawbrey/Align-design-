// kxrde01: RATE MY DATE IDEA: EXTENDED, "Gemini plans a bus to the last stop" (75 s vertical, star_talk post, house · A).
// The format lives in ../rdkit.js (shared by kxrde01–kxrde06). Ends on a LOOP: the bus pulls up again and hookkit's
// loopBack eases into frame 0 (Gemini sprinting for the bus).
// ♊ Gemini's idea: no plan, just the bus to the very last stop. ♎ Libra comes along.
//   0.0–3.0    HOOK: Gemini mid-sprint after a pulling-away bus, the ticket flying; "Rate my *date idea:*" + the pitch.
//   3–13       1 · THE PLAN: "No plan. *On purpose.*"
//   13–23      2 · THE RIDE: Gemini narrates every window; Libra smiles a bit.
//   23–33      3 · THE LAST STOP: record scratch: "the last stop is… *a car park.*"
//   33–43      4 · BUT…: Libra shivers, Gemini panics (loading bar "this was a terrible idea…").
//   43–53      5 · THE SAVE: they follow a smell to a tiny soup window.
//   53–63      6 · THE MOMENT: sharing on the kerb. "i'd never have found this."
//   63–75      RATING 9/10 *lost, together* · Pisces 10/10 · THE STARS · the bus again · "The last stop was | the *best* stop."
import { makeRD, R, box, label, shadow, glow, sparkles, hearts, speedLines, floor, mug, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, SKYB } from '../rdkit.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const GROUND = 1300
function street(x, t, { lamp = true } = {}) {
  // night buildings, a lamp, the pavement
  for (let i = 0; i < 6; i++) { const bx = -40 + i * 200, bh = 380 + (i * 97) % 220; R(x, i % 2 ? '#241a4a' : '#2e2258', bx, GROUND - bh - 120, 190, bh + 120)
    for (let j = 0; j < 6; j++) if ((i + j) % 3) R(x, (i * j) % 4 ? GOLD : '#7fd0ff', bx + 24 + (j % 3) * 54, GROUND - bh - 80 + Math.floor(j / 3) * 80, 26, 34) }
  if (lamp) { R(x, INK, 140, 760, 18, GROUND - 760); glow(x, 150, 770, 220, '255,220,150', 0.25); box(x, 110, 740, 80, 40, GOLD, { b: 6 }) }
  floor(x, GROUND, '#3a3350', '#57506e')
  R(x, '#2a2540', 0, GROUND + 120, 1080, 500)
  for (let i = 0; i < 8; i++) R(x, '#e8d26a', (i * 160 - t * 0) % 1180, GROUND + 300, 90, 12)
}
function busStop(x) { R(x, INK, 880, 820, 14, GROUND - 820); box(x, 830, 800, 120, 90, '#e8443a', { b: 6 }); drawBusIcon(x, 890, 845, 0.5) }
function drawBusIcon(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -50, -34, 100, 60, BONE, { b: 5 }); R(x, INK, -36, -20, 72, 18); R(x, INK, -34, 26, 18, 14); R(x, INK, 16, 26, 18, 14); x.restore() }
/** the bus (side view), front at the right; wx = left edge */
function bus(x, t, wx, { faces = null } = {}) {
  const y = GROUND - 420
  box(x, wx, y, 760, 360, '#f2b33c', { b: 8, hi: '#ffd36b' })
  R(x, '#d9932a', wx, y + 270, 760, 20)
  for (let i = 0; i < 5; i++) { box(x, wx + 40 + i * 140, y + 50, 110, 120, '#1a2a56', { b: 5 }); R(x, 'rgba(255,255,255,0.2)', wx + 50 + i * 140, y + 60, 16, 90) }
  box(x, wx + 700, y + 40, 50, 180, '#1a2a56', { b: 5 })
  for (const wxx of [wx + 140, wx + 600]) { x.fillStyle = INK; x.beginPath(); x.arc(wxx, y + 360, 60, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a5a6a'; x.beginPath(); x.arc(wxx, y + 360, 28, 0, Math.PI * 2); x.fill() }
  glow(x, wx + 760, y + 260, 120, '255,240,180', 0.3)
  if (faces) faces(x, y)
}

const LOAD = { at: 35.5, len: 3.0, label: 'this was a terrible idea…', error: 'Error: plan not found', y: 780 }

const EP = makeRD({
  id: 'kxrde01', sign: 'gemini', date: 'libra', accent: GOLD, deep: '#c0282e',
  idea: 'The bus to the *last stop.* Wherever.',
  hook(x, t, S) {
    street(x, t)
    const bx = 420 + (t + 0.3) * 260
    bus(x, t, bx)
    // Gemini mid-sprint, the ticket flying off behind
    const gx = 300 + 40 * Math.sin(t * 2)
    shadow(x, gx, GROUND + 10, 220)
    speedLines(x, gx, 1120, -1, 5, 160, 0.7)
    S.hero(x, t, { x: gx, y: 1110, s: 270, mood: 'wide', look: [1, 0], hops: [-0.2, 0.25, 0.7, 1.15, 1.6, 2.05, 2.5], squash: -0.05 })
    const tp = (t + 0.6) % 3
    x.save(); x.translate(gx - 120 - tp * 120, 980 - tp * 90); x.rotate(tp * 4); box(x, -40, -22, 80, 44, CREAM, { b: 4 }); R(x, RED, -30, -6, 60, 6); x.restore()
    S.pisces(x, t, { x: 960, y: 1180, s: 140, tears: 2, mood: 'wide', look: [-1, 0] })
  },
  chapters: [
    { title: 'THE PLAN', caption: 'No plan. *On purpose.*',
      draw(x, t, S) {
        street(x, t); busStop(x)
        shadow(x, 360, GROUND + 10, 220); shadow(x, 660, GROUND + 10, 200)
        S.hero(x, t, { x: 360, y: 1110, s: 260, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 0.8, S.t0 + 1.3, S.t0 + 6.5] })
        S.date(x, t, { x: 660, y: 1120, s: 230, mood: S.u > 3 && S.u < 6 ? 'wide' : 'happy', look: [-1, 0], hops: [S.t0 + 3.2] })
        if (S.u > 6) bus(x, t, lerp(1100, 260, ease.outCubic(prog(S.u, 6, 7.4))))
      },
      bubbles: [[0.8, 2.9, 'we take the next bus to the very end', { x: 400, y: 760 }], [3.2, 5.2, 'wherever it goes?', { x: 680, y: 780 }], [7.6, 9.6, 'that’s the plan!', { x: 420, y: 760 }]],
      cues: [['whoosh', 6.0, 1.2, 0.04], ['tick', 7.4, 0.06]] },
    { title: 'THE RIDE', caption: 'Gemini is *narrating* every window.', cuts: [5.0],
      draw(x, t, S) {
        // inside the bus: the window strip scrolling past
        R(x, '#f2b33c', 0, 300, 1080, 1620); R(x, '#d9932a', 0, 1220, 1080, 30)
        box(x, 60, 520, 960, 380, '#101a40', { b: 10 })
        x.save(); x.beginPath(); x.rect(60, 520, 960, 380); x.clip()
        for (let i = 0; i < 9; i++) { const px = ((i * 260 - t * 420) % 2340 + 2340) % 2340 - 300, ph = 200 + (i * 71) % 200
          R(x, i % 2 ? '#2e2258' : '#3a2a6a', px, 900 - ph, 220, ph); for (let j = 0; j < 4; j++) R(x, GOLD, px + 30 + (j % 2) * 100, 920 - ph + Math.floor(j / 2) * 70, 30, 30) }
        x.restore()
        R(x, INK, 530, 520, 14, 380)
        box(x, 160, 1150, 760, 90, '#3a6a9a', { b: 6 })
        S.hero(x, t, { x: 380, y: 1060, s: 240, mood: 'sparkle', look: [-1, -1], hops: [S.t0 + 0.6, S.t0 + 2.4, S.t0 + 4.2, S.t0 + 6.0, S.t0 + 7.8] })
        S.date(x, t, { x: 690, y: 1070, s: 220, mood: S.u > 7 ? 'happy' : 'neutral', look: S.u > 7 ? [-1, 0] : [0, -1] })
      },
      bubbles: [[0.6, 2.2, 'ooh, a bakery', { x: 380, y: 430 }], [2.4, 4.0, 'ooh, a dog', { x: 380, y: 430 }], [5.4, 7.0, 'ooh, the MOON', { x: 380, y: 430 }], [7.4, 9.6, 'you’re kind of fun, you know', { x: 680, y: 430 }]],
      cues: [['pluck', 0.6, 1318.51, 0.03, 0.3, -0.2], ['pluck', 2.4, 1567.98, 0.03, 0.3, -0.2], ['pluck', 5.4, 1760, 0.03, 0.3, -0.2]] },
    { title: 'THE LAST STOP', caption: 'The last stop is… *a car park.*', cuts: [4.4],
      draw(x, t, S) {
        // an empty car park: painted lines, one flickering lamp, the bus driving off
        R(x, '#1a1a33', 0, 300, 1080, 1000); floor(x, GROUND - 200, '#3a3a4a', '#52525e')
        R(x, '#2a2a3a', 0, GROUND + 100, 1080, 600)
        for (let i = 0; i < 6; i++) R(x, BONE, 60 + i * 180, GROUND - 120, 12, 200)
        const fl = Math.sin(t * 23) > -0.7 ? 1 : 0.2
        R(x, INK, 900, 700, 16, GROUND - 900); glow(x, 908, 710, 260, '220,230,255', 0.22 * fl); box(x, 870, 690, 76, 34, BONE, { b: 5 })
        if (S.u < 2.4) bus(x, t, lerp(260, 1300, ease.inCubic(prog(S.u, 0.2, 2.4))))
        shadow(x, 380, GROUND + 10, 220); shadow(x, 680, GROUND + 10, 200)
        S.hero(x, t, { x: 380, y: 1110, s: 250, mood: S.u > 3 ? 'wide' : 'happy', look: [0, 0], hops: [S.t0 + 2.6, S.t0 + 5.0] })
        S.date(x, t, { x: 680, y: 1120, s: 220, mood: S.u > 3 ? 'wide' : 'neutral', look: [-1, 0] })
        // a tumbleweed of a paper bag rolling through
        if (S.u > 4.4 && S.u < 9) { const p = (S.u - 4.4) / 4.6; x.save(); x.translate(lerp(-80, 1160, p), GROUND - 10 - 30 * Math.abs(Math.sin(p * 18))); x.rotate(p * 20); box(x, -26, -26, 52, 52, '#c9a46a', { b: 4 }); x.restore() }
      },
      bubbles: [[5.0, 7.0, '…it’s a car park.', { x: 400, y: 800 }], [7.4, 9.4, 'very… flat.', { x: 680, y: 820 }]],
      cues: [['whoosh', 0.2, 2.2, 0.04], ['whoosh', 4.4, 0.8, 0.03]] },
    { title: 'BUT…', tag: 'BUT…', caption: 'Libra is *cold.* Gemini is *panicking.*', cuts: [6.2],
      draw(x, t, S) {
        R(x, '#1a1a33', 0, 300, 1080, 1000); floor(x, GROUND - 200, '#3a3a4a', '#52525e'); R(x, '#2a2a3a', 0, GROUND + 100, 1080, 600)
        for (let i = 0; i < 6; i++) R(x, BONE, 60 + i * 180, GROUND - 120, 12, 200)
        shadow(x, 380, GROUND + 10, 220); shadow(x, 680, GROUND + 10, 200)
        S.hero(x, t, { x: 380 + 30 * Math.sin(t * 9) * (S.u > 2 && S.u < 6 ? 1 : 0), y: 1110, s: 250, mood: 'wide', look: [1, 0], hops: [S.t0 + 0.5, S.t0 + 6.4] })
        S.date(x, t, { x: 680 + 4 * Math.sin(t * 40), y: 1120, s: 220, mood: S.u > 7 ? 'happy' : 'squint', look: [-1, 0], squash: 0.02 * Math.sin(t * 40) })
        // cold breath puffs
        for (let i = 0; i < 3; i++) { const p = ((t * 0.7 + i / 3) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, BONE, 600 - p * 60, 1060 - p * 80, 30 + p * 20, 20); x.restore() }
        // sweat drops on Gemini
        for (let i = 0; i < 2; i++) { const p = ((t * 1.3 + i / 2) % 1); R(x, SKYB, 470 + i * 20, 1000 + p * 60, 10, 16) }
      },
      bubbles: [[0.6, 2.2, 'brr', { x: 700, y: 820 }], [6.4, 8.4, 'wait. do you smell that?', { x: 640, y: 800 }]],
      cues: [['pluck', 6.4, 1567.98, 0.035, 0.4, 0]] },
    { title: 'THE SAVE', caption: 'They follow a smell to a *tiny soup window.*', cuts: [4.0],
      draw(x, t, S) {
        // a brick wall with one glowing hatch; steam; two bowls handed out
        R(x, '#4a2a30', 0, 300, 1080, 1000)
        for (let j = 0; j < 20; j++) for (let i = 0; i < 11; i++) R(x, (i + j) % 3 ? '#5a3238' : '#3e2228', i * 110 + (j % 2) * 55 - 40, 300 + j * 50, 104, 44)
        floor(x, GROUND, '#3a3350', '#57506e'); R(x, '#2a2540', 0, GROUND + 120, 1080, 500)
        glow(x, 540, 700, 360, '255,200,120', 0.4)
        box(x, 380, 560, 320, 240, '#ffcf7a', { b: 10 }); R(x, '#e8a24a', 380, 700, 320, 100)
        box(x, 360, 800, 360, 30, '#8a5a3a', { b: 6 })
        for (let i = 0; i < 4; i++) { const p = ((t * 0.6 + i / 4) % 1); x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * p); R(x, BONE, 460 + i * 40 + Math.sin(t * 2 + i) * 14, 540 - p * 220, 16, 40); x.restore() }
        const walk = ease.inOutCubic(prog(S.u, 0, 3.6))
        shadow(x, lerp(120, 330, walk), GROUND + 10, 200); shadow(x, lerp(-80, 760, walk), GROUND + 10, 200)
        S.hero(x, t, { x: lerp(120, 330, walk), y: 1110, s: 240, mood: S.u > 4 ? 'sparkle' : 'happy', look: [1, -1], hops: [S.t0 + 0.4, S.t0 + 1.2, S.t0 + 2.0, S.t0 + 4.2] })
        S.date(x, t, { x: lerp(-80, 760, walk), y: 1120, s: 220, mood: S.u > 4 ? 'heart' : 'wide', look: [-1, -1], hops: [S.t0 + 0.8, S.t0 + 1.6, S.t0 + 4.6] })
        if (S.u > 5.6) { const k = pop01(t, S.t0 + 5.6, 0.3, 2.4); x.save(); x.translate(540, 860); x.scale(k, k); mug(x, t, -60, 0, 1.2, '#f4efe6'); mug(x, t, 70, 0, 1.2, '#f4efe6'); x.restore() }
      },
      bubbles: [[4.2, 5.8, 'SOUP.', { x: 330, y: 900 }], [6.6, 8.8, 'two, please!', { x: 400, y: 900 }]],
      pis: { x: 540, y: 690, s: 130, tears: 3, look: [0, 1] },
      cues: [['pop', 5.6, 1174.66, 0.035, 0], ['pop', 5.7, 1567.98, 0.03, 0]] },
    { title: 'THE MOMENT', caption: 'Sitting on the kerb. *Sharing.*', cuts: [5.2],
      draw(x, t, S) {
        street(x, t, { lamp: true })
        R(x, '#57506e', 0, GROUND - 20, 1080, 30)
        S.hero(x, t, { x: 400, y: 1170, s: 230, mood: 'happy', look: [1, 0], hops: [S.t0 + 5.4] })
        S.date(x, t, { x: 650, y: 1180, s: 210, mood: S.u > 2.2 ? 'sparkle' : 'happy', look: [-1, 0], hops: [S.t0 + 2.4] })
        mug(x, t, 470, 1300, 1.0, '#f4efe6'); mug(x, t, 580, 1300, 1.0, '#f4efe6')
        hearts(x, t, S.t0 + 7.6, 530, 980, { n: 6, rise: 240 })
      },
      bubbles: [[2.2, 4.8, 'i’d never have found this', { x: 660, y: 860 }], [5.4, 7.4, 'me neither, honestly', { x: 400, y: 860 }]],
      cues: [['glitter', 7.6, 8.2]] },
  ],
  ratingBg(x, t) { street(x, t); R(x, '#57506e', 0, GROUND - 20, 1080, 30) },
  epilogue(x, t) {
    // the bus pulls up again behind them
    if (t < 69.5) return
    bus(x, t, lerp(1200, 200, ease.outCubic(prog(t, 69.5, 71.2))) )
  },
  finale(x, t, S) {
    shadow(x, 400, GROUND + 10, 220 * S.ok); shadow(x, 690, GROUND + 10, 200 * S.ok)
    S.hero(x, t, { x: 400, y: 1110, s: 250, pop: S.ok, mood: t > 69.6 ? 'wide' : 'happy', look: [1, 0], hops: [63.84, 64.3, 71.3, 71.7] })
    S.date(x, t, { x: 690, y: 1120, s: 220, pop: S.ok, mood: 'heart', look: [-1, 0], hops: [63.9, 71.4] })
  },
  score: '9/10', word: 'lost, together',
  starsLine: 'no plan. two soups. *no notes.*',
  recs: [{ at: 26.0, caption: 'the last stop is… *a car park.*', sub: 'the dream, versus' }],
  fx: [{ scene: loadingBar(LOAD), cues: loadingBarCues(LOAD) }],
  last: 'The last stop was | the *best* stop.',
  loop: true,
  hookCues: [['whoosh', 0.0, 0.6, 0.04]],
  extraCues: [['whoosh', 69.5, 1.6, 0.04], ['tick', 71.2, 0.06], ['pop', 71.3, 880, 0.035, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, sparkles, outK, clamp, PINK]
