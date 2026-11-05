// kxexe03 · STAR TALK EXPLAINS: EXTENDED, ep 3 (118 s vertical, star_advice) · rows: promo/films/month2/m46.md
//   ❓ "Why do stars *twinkle* but planets don't?"   ♌ LEO (whose crush is "so sparkly, then gone") asks; ♍ VIRGO teaches.
//   frame 0: Leo mid-gasp at a star flickering on and off like a bad bulb (caught circle on it), a glitch flash.
//   2 ✓ stars are so far they reach us as points · ✓ moving air bends a point's light this way and that: twinkling ·
//   ✓ planets are close enough to show tiny discs; the flicker averages out, steadier light · ✓ low in the sky = more air =
//   more twinkle; above the air, stars don't twinkle · 3 ✦ planets as the steady parts of a chart (Venus love, Mars drive) ·
//   4 ♥ mixed signals often come from the static in between; ask one clear question. Leo asks; "yes!"
//   Pisces (classmate) cries. Hard cut on "Less flicker. *More* signal."
// Engine: ../../kxexe01/scenes/xxkit.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { earthChalk, disc, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'
import { glitch, glitchCues, notification, notificationCues } from '../../hookkit.js'
import { makeEpisode, checkLengths, R } from '../../kxexe01/scenes/xxkit.js'

const LEO = signStar('leo'), VIR = signStar('virgo')
const TAG = k => ({ kind: k, dx: 800, dy: 14, align: 'right' })
const flick = (t, s = 1) => clamp(0.55 + 0.45 * Math.sin(t * 23 * s + 1.3) * Math.sin(t * 7.7 * s + s))

/** a chalk 4-point star, brightness k */
function twinkle(x, cx, cy, r, k, col = EX.chalkYellow, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a * (0.25 + 0.75 * k); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 20 * k
  x.beginPath()
  for (let i = 0; i < 8; i++) { const g = i * Math.PI / 4 - Math.PI / 2, rr = i % 2 ? r * 0.28 : r * (0.7 + 0.3 * k); x.lineTo(cx + Math.cos(g) * rr, cy + Math.sin(g) * rr) }
  x.closePath(); x.fill(); x.restore()
}
/** wavy "air" lines */
function air(x, t, x0, x1, y, n, a = 1, amp = 10) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a * 0.7; x.strokeStyle = EX.chalkBlue; x.lineWidth = 3
  for (let j = 0; j < n; j++) { x.beginPath(); for (let i = 0; i <= 30; i++) { const px = x0 + (x1 - x0) * i / 30, py = y + j * 26 + Math.sin(i * 0.8 + t * 3 + j * 1.7) * amp; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}

/** frame 0: one big star in the night, flickering on and off like a bad bulb */
function hook(x, t) {
  x.save()
  const g = x.createRadialGradient(560, 720, 10, 560, 720, 420); g.addColorStop(0, 'rgba(60,40,140,0.75)'); g.addColorStop(1, 'rgba(10,8,30,0)')
  x.fillStyle = g; x.fillRect(100, 360, 920, 720)
  const on = Math.sin(t * 31) > -0.2 ? 1 : 0.15
  twinkle(x, 640, 700, 150, on * flick(t, 1.4), '#ffe27a')
  for (let i = 0; i < 14; i++) twinkle(x, 160 + (i * 211) % 800, 420 + (i * 137) % 520, 14, flick(t, 1 + i * 0.1), '#f4f1e8', 0.8)
  x.restore()
}

const CFG = {
  id: 'kxexe03', duration: 118, key: 'F#m',
  q: 'Why do stars *twinkle* but planets don’t?', qAccent: '#ffe27a',
  premise: 'my crush: sparkly. *then gone.*',
  caught: { x: 640, y: 700, r: 170, label: 'MIXED SIGNALS', arrow: 'bl' },
  promise: 'wait for chapter 4',
  scream: 'WHY?!',
  hook,
  teacher: { tag: '♍ VIRGO', color: VIR.color, glyph: VIR.glyph, pitch: 523 },
  student: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, pitch: 659 },
  boardTitle: 'TWINKLE, TWINKLE?',
  music: { style: 'synthwave', seed: 4631 },
  beats: [
    { // 1 · the question
      lines: [
        ['student', 'they’re SO sparkly. then gone for *a week.*'],
        ['student', 'like that star. *on. off. on.*'],
        ['teacher', 'stars do that. planets *don’t.* look.', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        twinkle(x, B.x0 + 250, B.y0 + 230, 70, flick(t), EX.chalkYellow, popK(t, a))
        const l = b.lines[2].t
        if (t > l) disc(x, B.x0 + 560, B.y0 + 230, 34, EX.chalkPink, popK(t, l + 0.3))
      },
      chalk: [
        { dt: 0.8, line: 1, text: 'ON · OFF · ON', x: 250, y: 400, size: 34, align: 'center' },
        { dt: 0.9, line: 2, text: 'PLANET: *steady*', x: 560, y: 400, size: 34, align: 'center', color: EX.chalkPink },
      ],
    },
    { // 2 · what's really happening: points of light
      ch: 'what’s really happening',
      lines: [
        ['teacher', 'stars are *so* far, they reach us as points.', { tag: TAG('sky'), point: [600, 220] }],
        ['teacher', 'a single dot of light. *tiny.*', { point: [600, 220] }],
        ['student', 'rude. they look *huge* to me.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        earthChalk(x, B.x0 + 80, B.y0 + 250, 40, popK(t, a))
        chalkLine(x, t, { pts: [[B.x0 + 130, B.y0 + 250], [B.x1 - 120, B.y0 + 250]], at: a + 0.4, dur: 1.0, width: 3, dash: [12, 12] })
        const k = 1 - 0.85 * ease.inOutCubic(prog(t, a + 0.6, a + 2.2))
        twinkle(x, B.x1 - 80, B.y0 + 250, 70 * k + 6, 0.9, EX.chalkYellow, popK(t, a + 0.3))
        if (t > b.lines[1].t) chalkCircle(x, t, { x: B.x1 - 80, y: B.y0 + 250, r: 34, at: b.lines[1].t + 0.2, dur: 0.5, color: EX.chalkPink, width: 4 })
      },
      chalk: [
        { dt: 1.2, line: 0, text: 'VERY. FAR.', x: 400, y: 200, size: 42, align: 'center' },
        { dt: 0.6, line: 1, text: '• = one point', x: 560, y: 390, size: 34, align: 'center', color: EX.chalkPink },
      ],
    },
    { // ✓ the air bends the light: twinkling
      lines: [
        ['teacher', 'air moving above us *bends* that light.', { tag: TAG('sky'), point: [400, 260] }],
        ['teacher', 'this way, that way: the point *flickers.*', { point: [400, 160] }],
        ['student', 'so the twinkle is… the *air?*'],
        ['teacher', 'the air *between* us. yes. not the star.', { point: [400, 280] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        air(x, t, B.x0 + 40, B.x1 - 40, B.y0 + 230, 4, fadeK(t, a + 0.2), 12)
        const jit = Math.sin(t * 17) * 22 * fadeK(t, b.lines[1].t)
        twinkle(x, B.x0 + 400, B.y0 + 110, 40, flick(t, 1.2), EX.chalkYellow, popK(t, a))
        chalkLine(x, t, { pts: [[B.x0 + 400, B.y0 + 140], [B.x0 + 400 + jit * 0.5, B.y0 + 240], [B.x0 + 400 + jit, B.y0 + 340], [B.x0 + 400 + jit * 0.3, B.y0 + 420]], at: a + 0.6, dur: 0.6, width: 4, color: EX.chalkYellow })
        // the eye at the bottom
        x.save(); x.globalAlpha *= fadeK(t, a + 0.8); x.strokeStyle = EX.chalk; x.lineWidth = 5; x.beginPath(); x.ellipse(B.x0 + 400, B.y0 + 450, 36, 18, 0, 0, Math.PI * 2); x.stroke(); disc(x, B.x0 + 400, B.y0 + 450, 9, EX.chalk, 1, 0.9); x.restore()
      },
      chalk: [
        { dt: 0.6, line: 0, text: 'AIR ~~~', x: 640, y: 210, size: 34, color: EX.chalkBlue },
        { dt: 0.7, line: 3, text: 'NOT the star', x: 140, y: 120, size: 34, align: 'center', color: EX.chalkGreen },
      ],
    },
    { // ✓ planets: tiny discs, the flicker averages out
      lines: [
        ['teacher', 'planets are closer. they show as tiny *discs.*', { tag: TAG('sky'), point: [600, 200] }],
        ['teacher', 'each bit flickers, but it *averages out.*', { point: [600, 200] }],
        ['student', 'so planets shine *steadier.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        air(x, t, B.x0 + 40, B.x1 - 40, B.y0 + 300, 3, 1, 10)
        twinkle(x, B.x0 + 200, B.y0 + 180, 34, flick(t, 1.5), EX.chalkYellow, popK(t, a))
        const cx = B.x0 + 600, cy = B.y0 + 180
        disc(x, cx, cy, 52, EX.chalkPink, popK(t, a + 0.3), 0.4)
        const l = b.lines[1].t
        if (t > l) for (let i = 0; i < 7; i++) { const g = i * 0.9, k = flick(t, 1 + i * 0.3); disc(x, cx + Math.cos(g) * 28 * (i ? 1 : 0), cy + Math.sin(g) * 28 * (i ? 1 : 0), 7, '#fff3c4', fadeK(t, l + 0.2 + i * 0.1) * k, 0.9) }
      },
      chalk: [
        { dt: 0.4, line: 0, text: 'STAR: •', x: 200, y: 260, size: 32, align: 'center' },
        { dt: 0.9, line: 0, text: 'PLANET: ●', x: 600, y: 270, size: 32, align: 'center', color: EX.chalkPink },
        { dt: 0.7, line: 2, text: '*steady* glow', x: 600, y: 440, size: 38, align: 'center' },
      ],
    },
    { // ✓ low = more air; in space, no twinkle
      lines: [
        ['teacher', 'low in the sky there’s more air: *more* twinkle.', { tag: TAG('sky'), point: [160, 380] }],
        ['teacher', 'above the air, in space, stars *don’t* twinkle.', { point: [600, 100] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        chalkLine(x, t, { pts: [[B.x0 + 30, B.y0 + 440], [B.x1 - 30, B.y0 + 440]], at: a, dur: 0.5, width: 5 })
        // a dome of air: thin overhead, thick at the horizon
        chalkLine(x, t, { pts: Array.from({ length: 25 }, (_, i) => [B.x0 + 40 + i * 30, B.y0 + 440 - Math.sin(Math.PI * i / 24) * 260]), at: a + 0.2, dur: 0.9, width: 4, color: EX.chalkBlue })
        twinkle(x, B.x0 + 110, B.y0 + 380, 30, flick(t, 2.1), EX.chalkYellow, popK(t, a + 0.6))
        twinkle(x, B.x0 + 400, B.y0 + 230, 26, flick(t, 1), EX.chalkYellow, popK(t, a + 0.8))
        const l = b.lines[1].t
        twinkle(x, B.x0 + 620, B.y0 + 90, 26, 1, EX.chalk, popK(t, l + 0.3))
      },
      chalk: [
        { dt: 1.0, line: 0, text: 'more air', x: 110, y: 300, size: 30, align: 'center', color: EX.chalkBlue },
        { dt: 0.8, line: 1, text: 'SPACE: *still*', x: 640, y: 160, size: 32, align: 'center' },
      ],
    },
    { // 3 · the astrology lens
      ch: 'the astrology lens',
      lines: [
        ['teacher', 'in astrology, planets are your *steady* parts.', { tag: TAG('astro'), point: [250, 200] }],
        ['teacher', 'Venus for love. Mars for *drive.*', { point: [250, 300] }],
        ['student', 'so i should date a *planet?*'],
        ['teacher', 'you should date someone who *answers.*', { point: [400, 400] }],
      ],
      draw(x, t, B, b) {
        disc(x, B.x1 - 150, B.y0 + 200, 50, EX.chalkPink, popK(t, b.lines[1].t), 0.4)
        disc(x, B.x1 - 150, B.y0 + 340, 40, '#ff8a5c', popK(t, b.lines[1].t + 0.6), 0.4)
      },
      chalk: [
        { dt: 0.4, line: 0, text: 'PLANETS =', x: 60, y: 140, size: 46 },
        { dt: 0.9, line: 0, text: '*STEADY* YOU', x: 60, y: 210, size: 50 },
        { dt: 0.3, line: 1, text: '♀ Venus · love', x: 60, y: 300, size: 34, color: EX.chalkPink },
        { dt: 1.2, line: 1, text: '♂ Mars · drive', x: 60, y: 360, size: 34, color: '#ff8a5c' },
      ],
    },
    { // 4 · what it means for love: the static in between
      ch: 'what it means for love',
      lines: [
        ['teacher', 'mixed signals often come from the *static.*', { tag: TAG('tip'), point: [400, 230] }],
        ['teacher', 'busy weeks. guesses. *silence.*', { point: [400, 230] }],
        ['student', 'i’ve been reading *the flicker.* for weeks.'],
        ['teacher', 'so skip the flicker. ask one *clear* question.', { point: [400, 380] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        pixHeart(x, B.x0 + 130, B.y0 + 230, 8, popK(t, a), '#ffd27a')
        pixHeart(x, B.x1 - 130, B.y0 + 230, 8, popK(t, a + 0.2), '#ff5c8a')
        air(x, t, B.x0 + 220, B.x1 - 220, B.y0 + 190, 3, fadeK(t, a + 0.4), 14)
        const l1 = b.lines[1].t
        ;['busy', 'guess', '…'].forEach((w, i) => { const k = popK(t, l1 + 0.3 + i * 0.4); if (k > 0) { x.save(); x.globalAlpha *= k; x.font = "700 30px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = EX.chalkBlue; x.fillText(w, B.x0 + 300 + i * 100, B.y0 + 140 + Math.sin(t * 4 + i) * 6); x.restore() } })
        const l3 = b.lines[3].t
        if (t > l3) chalkLine(x, t, { pts: [[B.x0 + 190, B.y0 + 320], [B.x1 - 190, B.y0 + 320]], at: l3 + 0.4, dur: 0.6, width: 6, color: EX.chalkYellow, arrow: true })
      },
      chalk: [{ dt: 1.1, line: 3, text: '*ONE CLEAR QUESTION*', x: 400, y: 420, size: 38, align: 'center' }],
    },
    { // ♥ Leo asks
      lines: [
        ['student', 'ok. “are we hanging out *friday?*”'],
        ['teacher', 'clear. kind. no games. *send it.*', { tag: TAG('tip'), point: [400, 250] }],
        ['student', 'sent. i’m not looking. i’m *looking.*'],
        ['student', 'THEY SAID YES. with *three* exclamation marks.'],
        ['teacher', 'see? that’s a *signal*, not a flicker.', { point: [400, 250] }],
      ],
      draw(x, t, B, b) {
        const L0 = b.lines[0].t, L3 = b.lines[3].t
        const k = fadeK(t, L0)
        x.save(); x.globalAlpha *= k; x.strokeStyle = EX.chalk; x.lineWidth = 5; x.beginPath(); x.roundRect(B.x0 + 270, B.y0 + 70, 260, 380, 28); x.stroke(); x.restore()
        const bub = (at, txt, me, y, col) => { const p = popK(t, at); if (p <= 0) return; x.save(); x.translate(B.x0 + (me ? 500 : 300), B.y0 + y); x.scale(p, p); x.font = "700 24px 'Space Mono', monospace"; const w = x.measureText(txt).width + 28; x.strokeStyle = col; x.lineWidth = 4; x.beginPath(); x.roundRect(me ? -w : 0, -24, w, 48, 18); x.stroke(); x.fillStyle = EX.chalk; x.textAlign = me ? 'right' : 'left'; x.textBaseline = 'middle'; x.fillText(txt, me ? -14 : 14, 2); x.restore() }
        bub(L0 + 1.0, 'friday?', true, 150, EX.chalkBlue)
        bub(b.lines[2].t + 1.2, '•'.repeat(1 + Math.floor(t * 4) % 3), false, 230, EX.chalkPink)
        bub(L3 + 0.1, 'YES!!!', false, 310, EX.chalkPink)
        if (t > L3) for (let i = 0; i < 8; i++) { const ph = ((t - L3) * 0.7 + i / 8) % 1; twinkle(x, B.x0 + 400 + Math.cos(i * 0.8) * 320, B.y0 + 420 - ph * 330, 14, 1, EX.chalkYellow, 1 - ph) }
      },
    },
  ],
  bulb: 'so stop reading the static. *just ask.*',
  items: ['Stars are *points*: they flicker', 'Planets are *discs*: steady', 'Mixed signal? *Ask*'],
  last: 'Less flicker. *More* signal.', lastWho: 'teacher',
  fx: T => {
    const b = T.beats[7]
    return [
      [glitch, { at: 0.08, len: 0.5, dialog: false, amp: 0.8 }, glitchCues],
      [notification, { at: b.lines[3].t - 0.3, out: [b.lines[3].t + 2.4, b.lines[3].t + 2.7], title: 'texts', body: 'YES!!! friday. *can’t wait.*', glyph: '♓', time: 'now' }, notificationCues],
    ]
  },
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('kxexe03: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
