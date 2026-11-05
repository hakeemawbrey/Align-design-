// ksre07: FALLING IN LOVE: SPEEDRUN · Libra: Stuck on the Menu Screen (15 s vertical, star_talk post, Month 2 boost m03)
// music: jazzy · Bb. Hard cut. No end card, no card cut. Kit: ../../ksre01/srkit.js.
//   0.0   frame 0: a game menu CHOOSE YOUR DATE SPOT mid-scroll, the cursor whipping, Libra dizzy; the hook line.
//   0.5   record scratch + freeze: "this menu has *four* options."  The premise (can't decide where to go) by 2 s.
//   2.0   the cursor cycles (taco place / the pier / mini golf / picnic), a worry for each · 4.6 Libra spins
//   5.6   Pisces crying "pick for ME too" · 7.2 the date leans in: "the pier?" · SELECTED · 8.2 PICK THE SPOT gold
//   9.0   the pier at night, both happy · 10.2 FIRST DATE gold · 10.6 achievement · 13.4 last line · cut 15.0.
import { makeRun, splitCues, fmtClock, runAt, GOLD, BONE, INK, PINK, RED, GREEN, BLUE, MONO, INTER, clamp, lerp, prog, ease, pop01, outK, sparkles } from '../../ksre01/srkit.js'

const D = 15
const T = { rec: 0.5, cyc: 2.0, spin: 4.6, beg: 5.6, lean: 7.2, sel: 7.6, s3: 8.2, pier: 9.0, s4: 10.2, ach: 10.6, last: 13.4 }
const OPTS = ['TACO PLACE', 'THE PIER', 'MINI GOLF', 'PICNIC']
const WORRY = ['what if they hate tacos', 'what if it’s windy', 'what if I’m bad at golf', 'what if it rains']
const SPLITS = [
  { name: 'ASKED THEM OUT', at: -1, time: '0:03.10', state: 'gold', delta: '-0:02' },
  { name: 'THEY SAID YES', at: -1, time: '0:04.00', state: 'gold', delta: '-0:01' },
  { name: 'PICK THE SPOT', at: T.s3, time: '26:41.00', state: 'red', delta: '+26:30' },
  { name: 'FIRST DATE', at: T.s4, time: '26:52.00', state: 'gold', delta: '' },
]
const KEYS = [[0, 18 * 60 + 40], [T.sel, 26 * 60 + 41], [T.pier, 26 * 60 + 42], [T.s4, 26 * 60 + 52]]
const timer = t => ({ text: fmtClock(runAt(KEYS, t), { cs: false }), col: t > T.s4 ? GOLD : t < T.sel ? RED : GREEN, sub: t < T.sel ? 'STUCK ON MENU' : t < T.s4 ? 'ROUTE FOUND' : 'DATE ON', subCol: t < T.sel ? RED : undefined })
const cam = t => {
  if (t < T.beg) return { mood: 'wide', tears: 1, look: [-1, 0.8] }
  if (t < T.lean) return { mood: 'wide', tears: 3, look: [-1, 0.8], say: 'pick for ME too', sayAt: T.beg, sayEnd: T.lean - 0.1, sayX: 690, sayY: 650 }
  return { mood: t > T.s3 ? 'heart' : 'sparkle', tears: 3, look: [-1, 0.6], hops: [T.sel, T.s3, T.s4] }
}
// the cursor index (fractional while whipping)
function cursorAt(t) {
  if (t >= T.sel) return 1
  if (t < T.cyc) return (t * 9) % 4                       // frame 0: whipping
  const sp = t < T.spin ? 1.1 : 2.6
  return ((t - T.cyc) * sp) % 4
}
function menu(x, t, S, k) {
  if (k <= 0.01) return
  x.save(); x.translate(560, 962); x.scale(k * 0.84, k * 0.84)
  S.pbox(x, -360, -230, 720, 470, 'rgba(16,10,40,0.95)', { b: 8 })
  x.fillStyle = GOLD; x.fillRect(-352, -222, 704, 8)
  x.font = `700 30px ${MONO}`; x.letterSpacing = '4px'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD
  x.fillText('CHOOSE YOUR DATE SPOT', 0, -180)
  const c = cursorAt(t), ci = Math.round(c) % 4, whip = t < T.cyc || (t > T.spin && t < T.sel)
  OPTS.forEach((o, i) => {
    const y = -100 + i * 82, on = i === ci
    const sel = t > T.sel && i === 1
    if (on) { x.fillStyle = sel ? 'rgba(242,199,92,0.35)' : 'rgba(111,184,255,0.25)'; x.fillRect(-320, y - 34, 640, 68) }
    x.font = `800 44px ${INTER}`; x.letterSpacing = '1px'; x.textAlign = 'left'; x.fillStyle = on ? BONE : 'rgba(239,230,214,0.5)'
    if (whip && on) { x.globalAlpha = 0.35; x.fillText(o, -220, y - 18); x.fillText(o, -220, y + 18); x.globalAlpha = 1 }
    x.fillText(o, -220, y + 2)
    if (on) { x.fillStyle = sel ? GOLD : BLUE; x.beginPath(); x.moveTo(-290, y - 20); x.lineTo(-250, y); x.lineTo(-290, y + 20); x.fill() }
  })
  if (t > T.sel) S.stamp(x, 'SELECTED', 210, -235, pop01(t, T.sel, 0.2, 2.8), { size: 40, col: GOLD, rot: -0.1 })
  x.restore()
}
function world(x, t, S) {
  const pier = ease.inOutCubic(prog(t, T.pier - 0.2, T.pier + 0.3))
  S.level(x, t, { theme: pier > 0.5 ? 'night' : 'street', floor: 1300, scroll: pier * 400 })
  if (pier > 0.5) {
    // the pier: planks and posts, the water line
    x.fillStyle = '#1f3c6a'; x.fillRect(0, 1322, 1080, 600)
    for (let i = 0; i < 12; i++) { x.fillStyle = 'rgba(159,216,255,0.25)'; x.fillRect(((i * 137 + t * 30) % 1180) - 100, 1380 + (i % 4) * 60, 90, 6) }
    x.fillStyle = INK; x.fillRect(0, 1290, 1080, 34); x.fillStyle = '#8a5a3c'; x.fillRect(0, 1294, 1080, 24)
    for (let i = 0; i < 9; i++) { x.fillStyle = INK; x.fillRect(40 + i * 130, 1180, 16, 112); x.fillStyle = '#a07850'; x.fillRect(44 + i * 130, 1184, 8, 106) }
    x.fillStyle = INK; x.fillRect(0, 1176, 1080, 12); x.fillStyle = '#c9a07a'; x.fillRect(0, 1178, 1080, 6)
  }
  menu(x, t, S, outK(t, [T.pier - 0.35, T.pier - 0.1]))
  // Libra: dizzy → spinning → relieved → happy on the pier
  let lx = 230, ly = 1210, mood = 'squint', rot = 0, look = [1, -1]
  if (t > T.cyc) { look = [Math.sin(t * 3), -1]; mood = 'neutral' }
  if (t > T.spin && t < T.sel) { rot = (t - T.spin) * 9; mood = 'squint' }
  if (t > T.sel) { mood = 'happy'; rot = 0; look = [1, 0] }
  if (pier > 0.5) { lx = 380; ly = 1110; mood = 'heart' }
  S.shadow(x, lx, pier > 0.5 ? 1210 : 1302, 180)
  S.star(x, t, { id: 'libra', x: lx, y: ly, s: 200, mood, look, rot, squash: t > T.sel && t < T.sel + 0.5 ? 0.15 : 0, seed: 7, hops: [T.sel + 0.4, T.s3, T.s4] })
  if (t > T.cyc && t < T.lean) { const i = Math.round(cursorAt(t)) % 4; if (t < T.spin) S.bubble(x, t, 560, 1170, T.cyc, T.spin, WORRY[i], { size: 32, tail: -0.8, maxW: 600 }) }
  if (t > T.spin && t < T.sel) for (let i = 0; i < 3; i++) { const a = t * 6 + i * 2.1; S.txt(x, '★', lx + Math.cos(a) * 110, ly - 130 + Math.sin(a) * 30, { size: 36, col: GOLD }) }
  // the date leans in from the right
  const dk = pop01(t, T.lean - 0.3, 0.35, 2.2)
  if (dk > 0.01) {
    const dx = pier > 0.5 ? 640 : lerp(1200, 880, ease.outCubic(prog(t, T.lean - 0.3, T.lean + 0.2)))
    S.shadow(x, dx, pier > 0.5 ? 1210 : 1302, 180)
    S.star(x, t, { id: 'sagittarius', x: dx, y: pier > 0.5 ? 1110 : 1210, s: 200, mood: pier > 0.5 ? 'happy' : 'sparkle', look: [-1, 0], seed: 2, hops: [T.lean, T.pier + 0.4, T.s4] })
    S.bubble(x, t, 820, 1060, T.lean, T.pier - 0.3, 'the pier?', { size: 40, tail: 0.3 })
  }
  if (pier > 0.5) { S.bubble(x, t, 380, 930, T.pier + 0.3, T.last - 0.3, 'I love the pier.', { size: 38, tail: -0.1 }); S.heartBits(x, 510, 960 - 30 * prog(t, T.s4, T.s4 + 1), 8, PINK, outK(t, [T.s4 + 1, T.s4 + 1.3]) * (t > T.s4 ? 1 : 0)) }
}
const HOOK = { at: -1, text: 'LIBRA STUCK ON THE | *menu screen.*', top: 612, size: 100, out: [1.85, 2.05] }
const REC = { at: T.rec, len: 1.3, caption: 'this menu has *four* options.', sub: 'libra has been here for eighteen minutes', top: 1520 }
const ACH = { at: T.ach, out: [T.last - 0.4, T.last - 0.15], text: 'let someone else *choose*', y: 1520 }
const LAST = { at: T.last, text: 'Let them pick. | *Split saved.*', top: 620, size: 112 }
const EP = makeRun({
  id: 'ksre07', duration: D, runner: 'libra', category: 'FIRST DATE%',
  fx: [['slamTitle', HOOK, true], ['recordScratch', REC], ['achievement', ACH], ['slamTitle', LAST]],
  splits: SPLITS, timer, cam, world, current: t => t < T.s3 ? 2 : 3, ending: { type: 'cut' },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
const ticks = (a, b, sp) => { const o = []; for (let t = a; t < b; t += 1 / sp) o.push(['tick', +t.toFixed(3), 0.035]); return o }
export const CUES = [
  ...EP.CUES, ...splitCues(SPLITS.filter(s => s.at > 0)),
  ...ticks(0, T.rec, 9), ...ticks(T.cyc, T.spin, 1.1), ...ticks(T.spin, T.sel, 2.6), ['whoosh', T.spin, 0.8, 0.05],
  ['pluck', T.beg + 0.1, 440, 0.035, 0.5, 0.4], ['pluck', T.beg + 0.3, 415.3, 0.035, 0.5, 0.4],
  ['pop', T.lean, 987.77, 0.04, 0.3], ['bell', T.sel, 1760, 0.05, 1, 0], ['glitter', T.sel, T.sel + 0.5],
  ['whoosh', T.pier - 0.2, 0.5, 0.05], ['pop', T.pier + 0.3, 1174.66, 0.035, -0.2],
]
void [RED, GREEN, sparkles, lerp, clamp]
