// klge09 · Your Sign's Love Glitch · "Sagittarius.exe: Exit Plan" (21 s vertical, star_advice post, loop).
//   0.0   frame 0: SAGITTARIUS.EXE is planning an escape. Sag mid-leap toward a giant BOOK TRIP button, backpack on,
//         a world map behind it. Its partner's text: "meet my family sunday?" 0.5 whip onto the button.
//   3.0   the glitch: leaving when it gets serious. Pins pop on the map (Lisbon, Osaka, Quito), the bag zips itself.
//   7.4   error: EXIT PLAN READY.   9.1 Pisces pops out of the tray, crying.
//   11.1  THE STARS: "say the itch *out loud* instead of running from it."   13.8 patch 1.9 installs.
//   15.7  the bag drops. Sag: "honestly? this scares me." Partner: "me too. still in?" Sag: "still in."
//   19.0  last line "Say it before you *run.*"   20.55 loop back into frame 0.
import { makeGlitch, R, box, label, bubble, hearts, sparkles, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const STAY = 15.7
const PINS = [[3.3, 300, 760, 'LISBON'], [4.0, 760, 700, 'OSAKA'], [4.7, 420, 900, 'QUITO']]
function map(x, t, a) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  box(x, 110, 600, 860, 400, '#1e4a6e', { b: 6 })
  // pixel continents
  const land = [[160, 660, 220, 120], [200, 780, 120, 160], [420, 640, 140, 110], [460, 750, 120, 180], [620, 640, 300, 140], [800, 800, 120, 90]]
  for (const [X, Y, W, H] of land) { R(x, '#3a8a5a', X, Y, W, H); R(x, '#4aa06a', X + 8, Y + 8, W - 30, 16) }
  // home pin + dotted flights
  R(x, GOLD, 540 - 10, 840 - 10, 20, 20)
  for (const [at, px, py, name] of PINS) {
    if (t < at) continue
    const p = clamp(prog(t, at, at + 0.5))
    const n = 14
    for (let i = 0; i < n * p; i++) { const q = i / n; R(x, BONE, lerp(540, px, q) - 3, lerp(840, py, q) - Math.sin(Math.PI * q) * 80 - 3, 6, 6) }
    const k = pop01(t, at + 0.4, 0.25, 2.6)
    if (k > 0.01) { x.save(); x.translate(px, py); x.scale(k, k); R(x, INK, -14, -40, 28, 28); R(x, RED, -10, -36, 20, 20); R(x, INK, -3, -12, 6, 16); label(x, name, 0, -60, { size: 24, col: BONE, stroke: INK }); x.restore() }
  }
  x.restore()
}
function bag(x, t, bx, by, zip) {
  box(x, bx - 50, by - 60, 100, 120, '#a35c3a', { b: 5 }); R(x, '#c47a4a', bx - 40, by - 50, 80, 20)
  R(x, INK, bx - 40, by - 4, 80 * zip, 6)
  R(x, GOLD, bx - 40 + 80 * zip - 4, by - 8, 10, 14)
}

function scene(x, t, K) {
  R(x, '#141034', 70, 556, 940, 880)
  const stay = t >= STAY
  map(x, t, stay ? 1 - prog(t, STAY + 0.3, STAY + 0.8) : 1)
  // the BOOK TRIP button
  if (!stay || t < STAY + 0.5) {
    const k = stay ? 1 - prog(t, STAY, STAY + 0.4) : 1
    const pulse = 1 + 0.05 * Math.sin(t * 8)
    x.save(); x.translate(780, 1140); x.scale(k * pulse, k * pulse)
    box(x, -150, -50, 300, 100, RED, { b: 7, hi: 'rgba(255,255,255,0.3)' }); label(x, 'BOOK TRIP', 0, 2, { size: 40, col: BONE, font: INTER, weight: 900 })
    x.restore()
    // countdown over the button
    if (t > 5.4 && t < 7.4) label(x, String(3 - Math.min(2, Math.floor((t - 5.4) / 0.66))), 780, 1050, { size: 60, col: GOLD, font: INTER, weight: 900, stroke: INK })
  }
  // the partner (Cancer star)
  K.star(x, t, 'cancer', stay ? 720 : 860, stay ? 1250 : 1330, stay ? 250 : 170, { mood: stay ? (t > 16.9 ? 'happy' : 'neutral') : t > 3 ? 'wide' : 'neutral', look: [-1, 0], seed: 2, hops: [16.9] })
  // Sag: mid-leap at the button, then sitting down beside the partner
  if (!stay) {
    const leap = t < 3 ? 0.6 + 0.04 * Math.sin(t * 20) : 0.3 + 0.2 * Math.abs(Math.sin(t * 3))
    K.hero(x, t, 520 + (t < 3 ? 20 : 0), 1300 - leap * 160, 260, { mood: t > 7.4 && t < 9.1 ? 'wide' : 'sparkle', look: [1, 0], squash: -0.12, hops: [3.3, 4.0, 4.7] })
    bag(x, t, 420, 1240 - leap * 160, t < 3 ? 0.6 : clamp(0.6 + prog(t, 5.0, 5.5) * 0.4))
  } else {
    const p = ease.outCubic(prog(t, STAY, STAY + 0.6))
    bag(x, t, lerp(420, 180, p), lerp(1250, 1370, p), 1)
    K.hero(x, t, lerp(520, 400, p), lerp(1220, 1250, p), 260, { mood: t > 17.8 ? 'heart' : t > 16.9 ? 'happy' : 'neutral', look: [1, 0], hops: [15.9, 17.8] })
  }
  if (stay) { const k = pop01(t, STAY + 0.8, 0.3, 2.4); if (k > 0.01) { x.save(); x.translate(540, 760); x.scale(k, k); box(x, -300, -110, 600, 220, '#f4f0fa', { b: 6 }); R(x, '#6a3ab0', -300, -110, 600, 56); label(x, 'SUNDAY', 0, -82, { size: 28, col: BONE }); label(x, 'lunch with ELI’s family', 0, -10, { size: 38, col: INK, font: INTER, weight: 900 }); label(x, 'going ✓  (nervous ✓)', 0, 50, { size: 30, col: '#2f9a6e', font: INTER, weight: 800 }); x.restore() } }
  bubble(x, t, 330, 1010, 15.9, 17.6, 'honestly? this scares me.', { size: 30, maxW: 380 })
  bubble(x, t, 760, 1010, 16.9, 18.9, 'me too. still in?', { size: 30, col: '#d8f4ff' })
  bubble(x, t, 400, 1030, 17.8, 20.4, 'still in.', { size: 34 })
  if (t > 17.8) hearts(x, t, 17.8, 560, 1100, { n: 6 })
}
function overlay(x, t) {
  // the partner's text: a notification at the top of the window (frame 0 → 3.0)
  const k = outK(t, [2.9, 3.1])
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  box(x, 150, 1010, 560, 84, '#f4f0fa', { b: 5 }); label(x, 'ELI', 176, 1032, { size: 20, align: 'left', col: '#6a5a9a' }); label(x, 'meet my family sunday?', 176, 1068, { size: 30, align: 'left', col: INK, font: INTER, weight: 800 })
  x.restore()
}

const F = makeGlitch({
  id: 'klge09', sign: 'sagittarius', len: 21, ending: 'loop',
  hook: 'SAGITTARIUS.EXE is planning *an escape.*', hookSize: 76,
  err: { msg: ['Text: "meet my family?"', 'Now opening: maps.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.4, 9.0]],
  hits: [{ kind: 'whip', at: 0.5, x: 700, y: 1140, z: 0.4, hold: 0.5 }, { kind: 'glitch', at: 7.4, dur: 0.45 }, { kind: 'flash', at: STAY, col: '#ffd98a' }],
  caps: [{ at: 3.0, out: 7.2, text: 'the glitch: *leaving* when it gets serious' }],
  errs: [{ at: 7.4, out: 9.0, msg: ['EXIT PLAN READY.', 'Feelings: left behind.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.1, out: 11.0, text: 'don’t go!! *sob*', tears: 3 }],
  stars: [{ t: 11.15, text: 'say the itch *out loud* instead of running from it.' }],
  box: { close: 13.8 },
  patch: { at: 13.8, ver: '1.9', name: 'NAME THE ITCH. STAY AND TALK.', dur: 1.0, out: 15.6 },
  last: { at: 19.0, text: 'Say it before you *run.*' },
  scene, overlay, accent: '#6a3ab0',
  cues: [['pop', 3.7, 880, 0.04, 0], ['pop', 4.4, 987.77, 0.04, 0], ['pop', 5.1, 1046.5, 0.04, 0], ['whoosh', 5.0, 0.4, 0.04], ['tick', 5.4, 0.05], ['tick', 6.06, 0.05], ['tick', 6.72, 0.05], ['tom', STAY + 0.4, 90, { gain: 0.2 }], ['pop', 15.9, 783.99, 0.04, 0], ['pop', 16.9, 659.25, 0.04, 0.3], ['bell', 17.8, 1318.51, 0.04, 1, 0]],
  music: { style: 'house', key: 'Bm', seed: 1809, drop: 3.0, breakdown: [9.1], lift: [STAY] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
