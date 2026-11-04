// ndbe18: DEALBREAKER OR NOT? E18, "They pack a *checklist* | for a day trip." (15 s vertical trial reel, music: lofi · C).
//   0.0–3.9   frame 0: ♍ Virgo mid-tick on a long clipboard list, a backpack open. Items fly in with ticks: MITTENS ✓
//             (0.5), SNACKS ✓ (1.0), PLASTERS ✓ (1.5). 2.1 ♐ Sagittarius bounds in with empty hands: "ready!" 2.9 Sag
//             trips on a snow lump: "ow!" — 3.3 Virgo already holding out a plaster.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    on the snowy trail: Sag (plaster on one point) shares a bag of cookies it brought after all; Virgo beams.
//             THE STARS: "Let them pack. You bring the *snacks.*"
import { makeDeal, R, box, bubble, label, hearts, sparkles, snowGround, snowfall, inSprite, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

function clipboard(x, t, cx, cy, ticks) {
  x.save(); x.translate(cx, cy); x.rotate(-0.06)
  box(x, -110, -150, 220, 300, '#c49a5a', { b: 6 }); R(x, '#fbf7ee', -94, -128, 188, 266); box(x, -40, -164, 80, 26, '#8a8aa0', { b: 4 })
  const L = ['MITTENS', 'SNACKS', 'PLASTERS', 'MAP', 'HAT']
  x.font = "700 22px 'Space Mono', monospace"; x.textBaseline = 'middle'; x.textAlign = 'left'
  L.forEach((s, i) => { R(x, INK, -80, -104 + i * 48, 22, 22); R(x, '#fbf7ee', -77, -101 + i * 48, 16, 16); x.fillStyle = INK; x.fillText(s, -46, -92 + i * 48); if (i < ticks || i >= 3) { x.fillStyle = '#22a85a'; x.fillRect(-76, -96 + i * 48, 6, 10); x.fillRect(-72, -92 + i * 48, 18, 6) } })
  x.restore()
}
function backpack(x, cx, cy) { box(x, cx - 80, cy - 100, 160, 140, '#3a8a7a', { b: 6, hi: '#5ab09a' }); box(x, cx - 60, cy - 40, 120, 50, '#2e6e62', { b: 5 }); R(x, INK, cx - 40, cy - 130, 80, 14) }
function plaster(x, F) { inSprite(x, F, () => { x.save(); x.translate(31, 22); x.rotate(-0.6); x.fillStyle = INK; x.fillRect(-3.4, -1.4, 6.8, 2.8); x.fillStyle = '#f4c89a'; x.fillRect(-3, -1, 6, 2); x.fillStyle = '#e0a876'; x.fillRect(-1, -1, 2, 2); x.restore() }) }
const ITEMS = [[0.5, 'MITTENS', '#e8344e'], [1.0, 'SNACKS', '#ffd23a'], [1.5, 'PLASTERS', '#f4c89a']], SAG = 2.1, TRIP = 2.9, HAND = 3.3
const EP = makeDeal({
  id: 'ndbe18', sign: 'virgo', date: 'sagittarius', verdict: 'not', accent: '#9fe6b0',
  hook: 'They pack a *checklist* | for a day trip.',
  last: 'Let them pack. You bring the *snacks.*',
  scene(x, t, S) {
    const { u, hero, date } = S
    snowGround(x, 1150)
    const ticks = ITEMS.filter(i => u > i[0]).length
    hero(x, t, { x: 250, y: 920, s: 240, mood: u > TRIP ? 'wide' : 'sparkle', look: u > SAG ? [1, 0] : [1, -0.5], hops: ITEMS.map(i => i[0]).concat([HAND]) })
    clipboard(x, t, 470, 820, ticks)
    backpack(x, 250, 1130)
    ITEMS.forEach(([a, s, c]) => { const p = ease.inCubic(prog(u, a - 0.35, a)); if (u > a - 0.35 && u < a + 0.05) { R(x, INK, lerp(470, 250, p) - 24, lerp(700, 1050, p) - 24, 48, 48); R(x, c, lerp(470, 250, p) - 18, lerp(700, 1050, p) - 18, 36, 36) }; const k = pop01(t, a, 0.2, 3) * outK(t, [a + 0.5, a + 0.6]); if (k > 0.01) label(x, s + ' ✓', 250, 760, { size: 40 * k, col: '#5fe397', font: 'Inter, sans-serif', weight: 800 }) })
    if (u > SAG) {
      const tr = clamp(prog(u, TRIP, TRIP + 0.15))
      const sx = lerp(1250, 800, ease.outCubic(prog(u, SAG, SAG + 0.4)))
      R(x, '#ffffff', 700, 1130, 60, 24)
      x.save(); x.translate(sx, 1100); x.rotate(-0.35 * tr * (1 - prog(u, TRIP + 0.4, TRIP + 0.7))); x.translate(-sx, -1100)
      date(x, t, { x: sx, y: 930, s: 230, mood: u > TRIP ? 'squint' : 'happy', look: [-1, 0], hops: [SAG + 0.4, TRIP] })
      x.restore()
    }
    bubble(x, t, 800, 680, SAG + 0.3, TRIP + 0.05, 'ready!', { size: 40, tail: 0 })
    bubble(x, t, 820, 680, TRIP + 0.05, 3.85, 'ow!', { size: 44, tail: 0 })
    if (u > HAND) { const p = ease.outCubic(prog(u, HAND, HAND + 0.3)); x.save(); x.translate(lerp(330, 600, p), 960); x.rotate(-0.3); R(x, INK, -44, -16, 88, 32); R(x, '#f4c89a', -40, -12, 80, 24); R(x, '#e0a876', -12, -12, 24, 24); x.restore() }
    snowfall(x, t, { top: 380, bottom: 1150, n: 24, a: 0.6 })
  },
  sceneCues: [...ITEMS.flatMap(([a], i) => [['tick', a, 0.07], ['pop', a + 0.02, [987.77, 1174.66, 1318.51][i], 0.045, -0.3]]), ['whoosh', SAG, 0.35, 0.03], ['pop', SAG + 0.3, 880, 0.045, 0.3], ['tom', TRIP, 110, { gain: 0.15, decay: 0.2 }], ['pop', TRIP + 0.05, 523.25, 0.045, 0.3], ['pluck', HAND + 0.2, 1567.98, 0.035, 0.5, 0]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date, dateF } = S
    snowGround(x, 1150); snowfall(x, t, { top: 620, bottom: 1150, n: 30 })
    if (k <= 0.01) return
    hero(x, t, { x: 330, y: 930, s: 240, pop: k, mood: u > 1.2 ? 'heart' : 'happy', look: [1, 0], hops: [T.stamp + 1.2] })
    backpack(x, 150, 1130)
    const dO = { x: 740, y: 935, s: 230, pop: k, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.8] }
    date(x, t, dO); plaster(x, dateF(t, dO))
    // the cookie bag, held out
    const p = ease.outCubic(prog(u, 0.8, 1.1))
    x.save(); x.translate(lerp(740, 540, p), 1050); box(x, -50, -60, 100, 110, '#c49a5a', { b: 5 }); for (let i = 0; i < 3; i++) { R(x, INK, -36 + i * 26, -86, 24, 24); R(x, '#d8a060', -33 + i * 26, -83, 18, 18); R(x, '#6a3a2a', -28 + i * 26, -78, 5, 5) } x.restore()
    hearts(x, t, T.stamp + 1.2, 330, 780, { n: 5 })
    sparkles(x, t, 540, 1000, T.stamp + 1.1, 8, 90, 1, [GOLD, PINK, BONE])
  },
  finaleCues: [['whoosh', 0.8, 0.3, 0.025], ['pop', 1.1, 1174.66, 0.04, 0], ['pluck', 1.2, 1567.98, 0.035, 0.5, -0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
