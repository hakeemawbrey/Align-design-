// kine10: IS THIS NORMAL?, "My ex moved on first" (19.2 s vertical, star_advice post, music: cinematic · Dm).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "My ex moved on. | I'm *not* okay." landed; ♑ Capricorn mid-spit-take of tea at a phone showing
//              the ex's new couple photo (two silhouettes and a heart).
//   0.60       record scratch + freeze, caught circle on the phone: "it's been *three weeks.*"
//   2.0–5.9    "They're happy. | I'm *spiralling.*"  An HP bar drains: "−40 EMOTIONAL DAMAGE". Capricorn scrolls
//              their own photos for comparison. ♓ Pisces fountains.
//   6.05–9.8   NORMAL-O-METER: SO NORMAL.
//   9.9–17.4   THE STARS: "it stings even when you don't want them *back.*" → "mute. don't compare. do one *kind*
//              thing for you."  The phone's MUTE switch flips; a to-do card: "one kind thing: a long walk" gets
//              ticked; Capricorn walks in the sun, the HP bar refills.
//  17.5–19.2   last line: "Their timeline isn't | your *scoreboard.*"  Hard cut.
import {
  makeNormal, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, HEART, sparkles, hearts, bubble, label, shadow, glowAt,
  room, pop01, outK, prog, lerp, clamp, ease, r3,
} from '../../kine01/normalkit.js'

const D = 19.2, FLOOR = 1480
const T = {
  rec: 0.6, h0Out: [1.85, 2.0], h1: 2.0, h1Out: [5.7, 5.9], dmg: 2.7, scroll: 3.6, pisIn: 2.4,
  meter: 6.05, mOut: [9.65, 9.9],
  starsIn: 9.8, l1: 10.05, l2: 13.3, boxClose: 17.35, mute: 13.7, todo: 14.6, tick: 15.3, walk: [15.5, 17.4],
  last: 17.5,
}
const REC = { at: T.rec, len: 1.25, caption: 'it’s been *three weeks.*', top: 1660 }

function phoneBig(x, t, cx, cy, s, mode, muteK = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(0.06)
  box(x, -150, -260, 300, 520, '#2a2148', { b: 9 }); R(x, '#120c2a', -134, -240, 268, 470)
  if (mode === 'couple') {
    R(x, '#ffb38a', -120, -200, 240, 240)
    for (const d of [-1, 1]) drawBits(x, ['..SS..', '.SSSS.', '.SSSS.', '..SS..', 'SSSSSS', 'SSSSSS', 'SSSSSS'], { S: '#5a3a6a' }, d * 50, -60, 14, { outline: null })
    drawBits(x, HEART, { H: '#ff5c8a' }, 0, -170, 7)
    x.font = `700 22px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('♥ 212   new chapter', 0, 80)
  } else {
    x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('them', 0, -150)
    box(x, -90, -60, 180, 80, muteK > 0.5 ? MINT : '#4a4270', { b: 5 })
    box(x, lerp(-80, 10, muteK), -50, 70, 60, BONE, { b: 4 })
    x.font = `800 26px ${INTER}`; x.fillStyle = BONE; x.fillText(muteK > 0.5 ? 'MUTED' : 'MUTE', 0, 70)
  }
  x.restore()
}
function hpBar(x, t, cx, cy, v, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('HP', -250, 0)
  box(x, -190, -22, 420, 44, '#1a1238', { b: 6 })
  R(x, v > 0.5 ? MINT : v > 0.25 ? GOLD : RED, -184, -16, 408 * v, 32)
  x.restore()
}
function todo(x, t, cx, cy, k, ticked) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  box(x, -220, -90, 440, 180, '#f4e8cc', { b: 7 })
  x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('ONE KIND THING:', -190, -44)
  box(x, -190, 10, 40, 40, BONE, { b: 4 }); x.fillText('a long walk', -130, 30)
  if (ticked > 0) drawBits(x, ['....M', '...M.', 'M.M..', '.M...'], { M: '#2f9d5a' }, -170, 28, 10 * ticked, { outline: null })
  x.restore()
}

const EP = makeNormal({
  id: 'kine10', D, ending: 'cut', hero: 'capricorn',
  hook: { text: 'My ex moved on. | I’m *not* okay.', out: T.h0Out, accentColor: '#ff8b9b' },
  rec: REC,
  catch: { at: T.rec + 0.12, x: 730, y: 870, r: 200, out: [T.rec + 1.1, T.rec + 1.25], label: null, arrow: null },
  heads: [{ text: 'They’re happy. | I’m *spiralling.*', at: T.h1, out: T.h1Out, size: 96, accent: '#ff8b9b', late: 1, lateAt: T.h1 + 0.55 }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: "it stings even when you don't want them *back.*" },
    { t: T.l2, text: "mute. don't compare. do one *kind* thing for you." },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Their timeline isn’t | your *scoreboard.*', at: T.last, lateAt: T.last + 0.55, accent: GOLD, size: 94 },
  punches: [T.h1, T.dmg, T.meter + 1.75, T.tick],
  shakes: [{ t: 0, a: 16 }, { t: T.dmg, a: 22 }],
  scene(x, t, S) {
    if (t < T.meter) {
      room(x, { y: FLOOR, wall: '#1d1838', floor: '#2a2448' })
      // Capricorn mid-spit-take: tea spray at frame 0
      shadow(x, 300, FLOOR, 320)
      S.hero(x, t, { x: 300, y: 1170, s: 360, mood: t < 2 ? 'wide' : t > T.dmg ? 'squint' : 'wide', look: [1, -0.5], squash: t < 0.4 ? -0.08 : 0, hops: [0.0, T.dmg, T.scroll] })
      // the cup
      box(x, 400, 1150, 80, 90, BONE, { b: 6 }); R(x, '#a8743a', 406, 1156, 68, 14)
      // the spray (frame 0 is mid-spray)
      const sp = prog(t, -0.3, 0.7)
      if (sp < 1) { x.save(); x.globalAlpha = 1 - sp; for (let i = 0; i < 16; i++) { const a = -0.9 + (i / 16) * 0.9, v = 280 + (i * 37) % 160; const q = sp + 0.7, px = 380 + Math.cos(a) * v * q, py = 1130 + Math.sin(a) * v * q + 200 * q * q; R(x, INK, px - 4, py - 4, 30, 30); R(x, '#e8b880', px, py, 22, 22) } x.restore() }
      phoneBig(x, t, 730, 880, 1, 'couple')
      // HP bar and damage
      const hp = t < T.dmg ? 1 : lerp(1, 0.6, ease.outCubic(prog(t, T.dmg, T.dmg + 0.4))) - (t > T.scroll ? 0.25 * ease.outCubic(prog(t, T.scroll, T.scroll + 0.4)) : 0)
      hpBar(x, t, 560, 560, hp, pop01(t, T.dmg - 0.3, 0.3, 2.2) * outK(t, [T.meter - 0.2, T.meter]))
      if (t > T.dmg && t < T.dmg + 1.2) label(x, '−40 EMOTIONAL DAMAGE', 560, lerp(640, 600, prog(t, T.dmg, T.dmg + 1.2)), { size: 34, col: RED, font: INTER, weight: 800, alpha: outK(t, [T.dmg + 0.9, T.dmg + 1.2]) })
      if (t > T.scroll && t < T.scroll + 1.4) label(x, '−25 COMPARING', 560, lerp(640, 600, prog(t, T.scroll, T.scroll + 1.4)), { size: 34, col: RED, font: INTER, weight: 800, alpha: outK(t, [T.scroll + 1.1, T.scroll + 1.4]) })
      S.pis(x, t, { x: 860, y: 1650, s: 190, pop: pop01(t, T.pisIn, 0.35, 2.2), tears: 3, mood: 'wide', look: [-1, -0.8], tissues: 'left' })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'sparkle' : 'squint', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      const walking = t > T.walk[0]
      room(x, { y: FLOOR, wall: walking ? '#2a3a5a' : '#1d1838', floor: walking ? '#2e4a36' : '#2a2448' })
      if (walking) { glowAt(x, 860, 560, 300, '255,214,120', 0.4 * prog(t, T.walk[0], T.walk[0] + 0.6)); drawBits(x, ['..Y.Y..', '.YYYYY.', 'YYYYYYY', '.YYYYY.', '..Y.Y..'], { Y: GOLD }, 860, 560, 16 * prog(t, T.walk[0], T.walk[0] + 0.4)) }
      if (t < T.walk[0]) phoneBig(x, t, 760, 820, 0.85 * pop01(t, T.l1 + 1.6, 0.3, 2.2) * outK(t, [T.walk[0] - 0.3, T.walk[0]]), t < T.mute - 0.15 ? 'couple' : 'mute', ease.outCubic(prog(t, T.mute, T.mute + 0.25)))
      if (t > T.l1 + 1.7 && t < T.mute - 0.2) label(x, 'still stings.', 760, 1120, { size: 30, col: '#ff8b9b', font: INTER, weight: 800 })
      todo(x, t, 540, 620, pop01(t, T.todo, 0.3, 2.2) * outK(t, [T.walk[1] - 0.6, T.walk[1] - 0.3]), ease.outCubic(prog(t, T.tick, T.tick + 0.2)))
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      const wx = walking ? lerp(300, 520, prog(t, ...T.walk)) : 300
      shadow(x, wx, 1340, 280 * k)
      S.hero(x, t, { x: wx, y: 1140, s: 320, pop: k, mood: t > T.tick ? 'happy' : t > T.l1 + 1 ? 'neutral' : 'squint', look: [1, -0.4], hops: [T.mOut[0] + 0.2, T.mute, T.tick, ...(walking ? [15.9, 16.3, 16.7, 17.1] : [])] })
      hpBar(x, t, 540, 470, lerp(0.35, 1, ease.inOutCubic(prog(t, T.tick, T.walk[1]))), pop01(t, T.tick, 0.3, 2.2))
      S.pis(x, t, { x: 880, y: 1260, s: 180, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.tick ? 3 : 2, mood: t > T.tick ? 'happy' : 'wide', look: [-1, -0.4], hops: [T.tick + 0.1, T.last + 0.5] })
      S.stars(x, t, { x: 150, y: 820, s: 140, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.tick ? 'happy' : 'neutral', look: [1, 0.3] })
    }
  },
  cues: [
    ['pop', 11.65, 880, 0.04, 0.3], ['pluck', 11.75, 587.33, 0.03, 0.4, 0.3],
    ['whoosh', 0.0, 0.25, 0.05], ...Array.from({ length: 4 }, (_, i) => ['tick', r3(0.03 + i * 0.05), 0.03]),
    ['boom', T.dmg, 0.22], ['pop', T.dmg + 0.05, 330, 0.05, 0], ['pop', T.scroll + 0.05, 294, 0.05, 0],
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, 0.4],
    ['tick', T.mute, 0.08], ['pop', T.mute + 0.05, 1318.51, 0.04, 0.3],
    ['pop', T.todo, 880, 0.035, 0], ['pop', T.tick, 1567.98, 0.045, 0], ['glitter', T.tick, T.tick + 0.4],
    ['riser', T.tick, T.walk[1] - 0.3, 0.02], ['bell', T.walk[0] + 0.3, 1760, 0.025, 1.2, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, CYAN, MONO, sparkles, hearts, bubble, clamp]
