// nh15e16: HOME FOR THE HOLIDAYS, "The photo." (30 s vertical, Star Talk Season 15 ep 16, music: pop · D)
// Story 0–25.6, then the shared end card. The season's look lives in ../../nh15e13/scenes/holikit.js.
//   0.0–3.0    hook "Everyone *squeeze in!*"  AUNTIE at the camera on its tripod; the family lines up by the tree, Leo
//              front and centre mid-pose; Scorpio (Leo's date) hovering at the edge.
//   3.0–8.0    "Take *one.*"  The timer counts 3 · 2 · 1; Scorpio sidesteps out ("it's a family photo"). FLASH. The print
//              pops up: the family… and the edge of a Scorpio.
//   8.0–12.8   "Take *two.*"  Leo finds its best angle and fills the whole frame. FLASH. The print: one giant Leo.
//   12.8       card cut. "Take *three.*"  Grandma waves Scorpio in; Leo steps aside to make room.
//              LEO: "you're in this one. that's the *point.*"
//   19.0       the print: everyone, Scorpio in the middle, Pisces crying in every take. "Make space in the *photo.*"
import { makeEp, room, tree, tissues, rel, sign, pisces, sparkles, hearts, bubble, label, box, R, glow, gift,
  tagOf, pop01, outK, prog, lerp, clamp, ease, talkHops, INK, BONE, GOLD, PINK, RED, CPS } from '../../nh15e13/scenes/holikit.js'

const LEO = 'leo', SCO = 'scorpio'
const LC = '#ffb35c', SCC = '#ff7aa8'
const LINES = [{ t: 14.9, speaker: tagOf(LEO), color: LC, text: "you're in this one. that's the *point.*" }]
const BOXES = [{ open: 14.7, close: 18.75, from: 0, to: 1 }]
const FLASH = [6.6, 11.2, 18.95]
const LEO_HOPS = [-0.1, 0.9, 3.3, 8.2, 8.7, 9.3, 13.9, ...talkHops(LINES, tagOf(LEO), { cps: CPS }), 19.3]

// where everyone stands for take n (0: hook / take 1 · 1: take 2 · 2: take 3)
function lineup(x, t, take, { k = 1 } = {}) {
  const leoFwd = take === 1 ? ease.inOutCubic(prog(t, 8.2, 8.9)) : 0
  const scoOut = take === 0 ? ease.inOutCubic(prog(t, 4.4, 5.2)) : take === 1 ? 1 : 1 - ease.inOutCubic(prog(t, 13.4, 14.3))
  const leoAside = take === 2 ? ease.inOutCubic(prog(t, 13.9, 14.6)) : 0
  rel(x, t, 'GRANDMA', { x: 250, y: 1000, s: 250, mood: take === 1 && t > 9.2 ? 'eyeroll' : take === 2 ? 'happy' : 'happy', look: take === 2 && t < 14 ? [1, 0] : [0, 0], hops: [1.2, 13.25, 13.6] })
  rel(x, t, 'MOM', { x: 430, y: 980, s: 240, mood: 'happy', look: [0, 0], hops: [2.0] })
  pisces(x, t, { x: 790, y: 990, s: 220, look: [0, 0], mood: 'sparkle' }, take === 2 ? 3 : 2)
  sign(x, t, SCO, { x: lerp(640, 1180, scoOut), y: 1000, s: 250, mood: take === 2 && t > 14.3 ? 'happy' : 'neutral', look: [take === 0 && t > 4 ? 1 : -1, 0], hops: [4.4, 13.4, 14.3, 19.4] })
  sign(x, t, LEO, { x: lerp(540, 450, leoAside), y: lerp(1080, 980, leoFwd) - leoAside * 20, s: lerp(300, 620, leoFwd), mood: take === 1 ? 'wink' : take === 2 && t > 14.6 ? 'happy' : 'sparkle', look: [0, 0], hops: LEO_HOPS, squash: -0.04 })
  void k
}
function set(x, t) {
  room(x, t, { wall: '#3c3a6a', wains: '#2a2850', tree: true, treeX: 900, treeH: 520, window: true, winX: 120, winY: 480, winW: 260, winH: 300, wreath: false })
  gift(x, 760, 1300, 110, 80, RED); gift(x, 1010, 1310, 90, 70, '#3a7fd0', BONE)
}
function camera(x, t, take) {
  // the tripod + camera, bottom left foreground, with AUNTIE behind it
  rel(x, t, 'AUNTIE', { x: 210, y: 1470, s: 230, mood: t > FLASH[take] && t < FLASH[take] + 1.6 ? 'happy' : 'squint', look: [1, -1], hops: [0.3, 3.1, 8.1, 12.9] })
  for (const d of [-1, 0, 1]) { x.save(); x.translate(330, 1480); x.rotate(d * 0.35); R(x, INK, -7, 0, 14, 300); R(x, '#5a5470', -3, 0, 6, 300); x.restore() }
  box(x, 260, 1400, 150, 90, '#2a2840', { b: 7 }); box(x, 392, 1420, 60, 50, '#4a4a7a', { b: 6 }); R(x, '#9fd8f6', 404, 1432, 36, 26)
  const blink = Math.floor(t * 4) % 2 ? 1 : 0.3
  R(x, `rgba(255,70,70,${blink})`, 280, 1416, 14, 14)
}
function countdown(x, t, t0) {
  for (let n = 0; n < 3; n++) {
    const a = t0 + n * 0.55, k = pop01(t, a, 0.2, 2.6) * outK(t, [a + 0.45, a + 0.55])
    if (k <= 0.01) continue
    x.save(); x.translate(540, 760); x.scale(k, k)
    box(x, -80, -80, 160, 160, BONE, { b: 8 }); label(x, String(3 - n), 0, 6, { size: 110, col: RED, shadow: false, font: "'Inter', sans-serif", weight: 800 })
    x.restore()
  }
}
/** the print: the lineup re-drawn small inside a white-bordered photo */
function print(x, t, take, k, at) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 900); x.rotate(-0.05 + 0.02 * Math.sin(t * 2)); x.scale(k, k)
  R(x, 'rgba(6,4,18,0.6)', -340 + 16, -300 + 18, 680, 640)
  box(x, -340, -300, 680, 640, '#fffaf0', { b: 6 })
  x.save(); x.beginPath(); x.rect(-310, -270, 620, 500); x.clip()
  x.translate(-310, -270); x.scale(620 / 1080, 500 / 870); x.translate(0, -560)
  const tt = at                                     // the frozen moment of the flash
  set(x, tt); lineup(x, tt, take)
  x.restore()
  R(x, 'rgba(255,255,255,0.25)', -310, -270, 620, 30)
  label(x, ['take 1', 'take 2', 'take 3 ♡'][take], 0, 290, { size: 30, col: INK, shadow: false })
  x.restore()
}
const shots = [
  { at: 0, cam: [1.2, 580, 1080], draw(x, t) { set(x, t); lineup(x, t, 0); camera(x, t, 0); bubble(x, t, 330, 1330, -1, 3.0, 'squeeze in!', { size: 34, tail: 0 }) } },
  { at: 3.0, cam: [1.2, 580, 1080], draw(x, t) {
    set(x, t); lineup(x, t, 0); camera(x, t, 0); countdown(x, t, 4.9)
    bubble(x, t, 900, 760, 4.5, 6.5, "it's a family photo", { size: 30, tail: 0.3 })
    print(x, t, 0, pop01(t, 7.0, 0.35, 2.2), 6.6)
  } },
  { at: 8.0, cam: [1.2, 580, 1080], draw(x, t) {
    set(x, t); lineup(x, t, 1); camera(x, t, 1); countdown(x, t, 9.5)
    bubble(x, t, 540, 640, 8.9, 11.1, 'my good side!', { size: 34, col: '#ffe3b8' })
    print(x, t, 1, pop01(t, 11.55, 0.35, 2.2), 11.2)
  } },
  { at: 12.8, cam: [1.2, 580, 1080], draw(x, t) {
    set(x, t); lineup(x, t, 2); camera(x, t, 2)
    bubble(x, t, 260, 760, 13.0, 14.6, 'get in here!', { size: 34, col: '#ece0ff', tail: -0.2 })
    hearts(x, t, 14.5, 620, 900, { n: 5 })
    countdown(x, t, 17.3)
  } },
  { at: 19.0, flash: false, cam: [1.2, 580, 1080], draw(x, t) {
    set(x, 18.95); lineup(x, 18.95, 2); camera(x, t, 2)
    print(x, t, 2, pop01(t, 19.1, 0.4, 2.0) * 1.08, 18.95)
    sparkles(x, t, 540, 900, 19.3, 14, 380, 1)
  } },
]
const CUTS = [8.0, { t: 12.8, kind: 'flip' }, 19.0]
export const { DURATION, SCENES, CUES } = makeEp({
  duration: 30,
  hook: { text: 'Everyone | *squeeze in!*', out: [2.8, 3.0], color: LC, size: 90, accentSize: 140 },
  heads: [
    { at: 3.15, out: [7.8, 8.0], text: 'Take *one.*', color: SCC },
    { at: 8.15, out: [12.6, 12.8], text: 'Take *two.*', color: LC },
    { at: 12.95, out: [18.8, 19.0], text: 'Take *three.*', color: '#d8c6f2' },
  ],
  shots, lines: LINES, boxes: BOXES,
  last: { at: 19.7, text: 'Make space in the *photo.*', color: LC },
  cuts: CUTS,
  pitch: { [tagOf(LEO)]: 739.99 },
  overlay(x, t) {
    // the camera flash (canvas, over the headlines' layer)
    for (const f of FLASH) { const p = prog(t, f, f + 0.35); if (p > 0 && p < 1) { x.save(); x.globalAlpha = 0.85 * (1 - ease.outQuad(p)); x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore() } }
  },
  cues: [
    ...[4.9, 9.5, 17.3].flatMap(a => [0, 1, 2].map(n => ['pop', a + n * 0.55, 880 + n * 110, 0.04, 0])),
    ...FLASH.flatMap(f => [['tick', f, 0.09], ['whoosh', f, 0.2, 0.04], ['bell', f + 0.02, 2349.32, 0.02, 0.6, 0]]),
    ['whoosh', 4.4, 0.3, 0.025], ['whoosh', 8.2, 0.4, 0.03], ['pop', 8.9, 1318.51, 0.04, 0],
    ['pop', 7.05, 987.77, 0.04, 0], ['pop', 11.6, 987.77, 0.04, 0], ['pop', 13.0, 1174.66, 0.04, -0.3], ['whoosh', 13.4, 0.5, 0.03],
    ['glitter', 19.3, 20.0], ['pop', 19.2, 1318.51, 0.05, 0],
  ],
})
