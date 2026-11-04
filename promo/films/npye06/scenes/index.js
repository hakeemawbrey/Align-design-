// npye06: YOUR SIGN AT THE HOLIDAY PARTY, "Virgo at the holiday party" (14 s vertical trial reel, music: chiptune · C).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Virgo* at the | holiday party:" — Virgo mid-nudge of a crooked garland, a little level in hand.
//   2.4–5.2   1 "straightens the *garland.* twice." Level. A guest bumps it. Level again: "okay, NOW it’s festive."
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "makes sure *everyone* has a ride home." A RIDES HOME clipboard ticks: ARIES, LEO, LIBRA. Guests in
//             scarves wave goodbye.
//   8.0–11.6  THE STARS: "Care is a *ride home,* not a lecture."
import { makeEp, R, box, bubble, shadow, sparkles, hatCells, scarfCells, prog, lerp, ease, INK, BONE, GOLD, PINK, MINT, RED, INTER } from '../../npye01/scenes/kit.js'

function garland(x, t, rot) {
  x.save(); x.translate(700, 600); x.rotate(rot)
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i <= 22; i++) {
    const u = i / 22, X = -250 + u * 500, Y = 70 * Math.sin(Math.PI * u)
    if (pass === 0) R(x, INK, X - 18, Y - 18, 36, 36)
    else { R(x, i % 2 ? '#2f8a4e' : '#3fa862', X - 14, Y - 14, 28, 28); if (i % 4 === 2) R(x, [GOLD, RED, PINK][i % 3], X - 6, Y + 8, 12, 12) }
  }
  R(x, INK, -262, -30, 24, 30); R(x, INK, 238, -30, 24, 30)
  x.restore()
}
function level(x, cx, cy, rot, ok) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -80, -14, 160, 28, '#f2cf4a', { b: 5 }); R(x, ok ? MINT : '#cfe9ff', -22, -9, 44, 18); R(x, INK, -4 + (ok ? 0 : 14), -9, 8, 18)
  x.restore()
}
function check(x, cx, cy, s, col = '#2fa86a') { x.save(); x.strokeStyle = col; x.lineWidth = s * 0.28; x.lineCap = 'square'; x.beginPath(); x.moveTo(cx - s * 0.45, cy); x.lineTo(cx - s * 0.1, cy + s * 0.35); x.lineTo(cx + s * 0.5, cy - s * 0.4); x.stroke(); x.restore() }

const EP = makeEp({
  id: 'npye06', series: 'party', sign: 'virgo', name: 'Virgo', room: { wreathOn: false },
  hook(x, t, S) {
    const { hero, heroHat } = S
    const rot = lerp(0.14, 0.05, ease.outCubic(Math.min(1, t / 1.6)))
    garland(x, t, rot)
    shadow(x, 430, 1125, 230)
    const o = { x: 430, y: 950, s: 260, mood: 'squint', look: [1, -1], hops: [-0.2, 0.7, 1.4], squash: -0.05 }
    hero(x, t, o); heroHat(x, t, o)
    level(x, 640, 760, rot, false)
    bubble(x, t, 430, 650, 1.0, 2.35, 'hmm. 2 degrees off.', { size: 36 })
  },
  hookCues: [['tick', 0.7, 0.05], ['tick', 1.4, 0.05], ['pop', 1.0, 880, 0.03, 0]],
  beats: [
    { caption: 'straightens the *garland.* twice.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        const rot = u < 0.5 ? lerp(0.05, 0, u / 0.5) : u < 1.05 ? 0 : u < 1.2 ? lerp(0, -0.16, (u - 1.05) / 0.15) : u < 1.7 ? -0.16 : lerp(-0.16, 0, ease.outCubic(prog(u, 1.7, 2.0)))
        garland(x, t, rot + 0.015 * Math.sin(u * 20) * (u > 1.05 && u < 1.5 ? 1 : 0))
        // a dancing guest bumps it
        const gx = lerp(1150, 900, ease.outCubic(prog(u, 0.6, 1.05)))
        guest(x, t, 'sagittarius', { x: gx, y: 760, s: 140, mood: u > 1.1 ? 'wide' : 'happy', look: [-1, 0], hops: [S.t0 + 0.7, S.t0 + 1.05], seed: 14 })
        shadow(x, 430, 1110, 230)
        const o = { x: 430, y: 950, s: 250, mood: u < 1.2 ? 'happy' : u < 1.7 ? 'wide' : 'sparkle', look: [1, -1], hops: [0.4, 1.2, 1.9].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        level(x, 640, 760, rot, Math.abs(rot) < 0.01)
        sparkles(x, t, 780, 640, S.t0 + 2.0, 10, 260, 1, [MINT, GOLD, BONE])
        bubble(x, t, 460, 560, S.t0 + 2.0, S.t1, 'okay, NOW it’s festive.', { size: 34 })
      },
      cues: [['pop', 0.5, 1318.51, 0.03, 0], ['tom', 1.05, 120, { gain: 0.14, decay: 0.15 }], ['whoosh', 1.7, 0.3, 0.025], ['pop', 2.0, 1567.98, 0.04, 0], ['glitter', 2.0, 2.4]] },
    { caption: 'makes sure *everyone* has a ride home.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest, dress } = S
        // guests in scarves, waving at the door side
        ;[['aries', 760, RED], ['leo', 880, MINT], ['libra', 1000, GOLD]].forEach(([id, gx, sc], i) => {
          const g = { x: gx, y: 1010, s: 130, mood: u > 0.4 + i * 0.45 ? 'happy' : 'neutral', look: [-1, 0], hops: [S.t0 + 0.5 + i * 0.45], seed: 40 + i }
          guest(x, t, id, g); dress(x, t, g, () => scarfCells(x, sc, BONE))
        })
        shadow(x, 300, 1110, 220)
        const o = { x: 300, y: 950, s: 240, mood: 'happy', look: [1, 0], hops: [0.5, 0.95, 1.4].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        // the clipboard
        x.save(); x.translate(560, 700); x.rotate(-0.04)
        box(x, -170, -150, 340, 300, '#c9a06a', { b: 6 }); box(x, -150, -120, 300, 260, '#fffaf0', { b: 3 })
        box(x, -50, -170, 100, 36, '#8a8aa0', { b: 4 })
        x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
        x.fillText('RIDES HOME', -128, -82)
        ;['ARIES', 'LEO', 'LIBRA'].forEach((n, i) => { x.fillStyle = INK; x.fillText(n, -128, -22 + i * 52); R(x, INK, 70, -40 + i * 52, 36, 36); R(x, '#fff', 74, -36 + i * 52, 28, 28); if (u > 0.5 + i * 0.45) check(x, 88, -22 + i * 52, 34) })
        x.restore()
      },
      pis: { x: 960, y: 760, s: 110 },
      cues: [['tick', 0.5, 0.05], ['pop', 0.52, 1174.66, 0.035, 0], ['tick', 0.95, 0.05], ['pop', 0.97, 1318.51, 0.035, 0], ['tick', 1.4, 0.05], ['pop', 1.42, 1567.98, 0.04, 0]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, dress, ok, HOPS } = S
    shadow(x, 430, 1110, 230 * ok); shadow(x, 700, 1110, 170 * ok)
    const o = { x: 430, y: 900, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    const g = { x: 700, y: 950, s: 180, pop: ok, mood: 'happy', look: [-1, 0], hops: [8.7, 9.9], seed: 41 }
    guest(x, t, 'leo', g); dress(x, t, g, () => scarfCells(x, MINT, BONE))
    bubble(x, t, 700, 740, 8.6, 11.0, 'home safe. thank you!', { size: 28, col: '#ffe8cc' })
  },
  last: 'Care is a *ride home,* not a lecture.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void hatCells
