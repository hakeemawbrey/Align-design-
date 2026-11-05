// kxexe05 · STAR TALK EXPLAINS: EXTENDED, ep 5 (118 s vertical, star_advice) · rows: promo/films/month2/m46.md
//   ❓ "Why can't I see my *sign* on my birthday?"   ♈ ARIES ("nobody even noticed my birthday") asks; ♎ LIBRA teaches.
//   frame 0: Aries mid-scream under a party hat, the candle on a cake blowing out (caught circle on the candle).
//   2 ✓ through the year the Sun seems to move through the zodiac constellations · ✓ on your birthday it sits in front of
//   your sign's part of the sky, so those stars are up in the daytime, hidden by sunlight · ✓ about six months later
//   they're high at night · 3 ✦ your Sun sign is named for where the Sun was on the zodiac wheel; astrologers measure that
//   wheel from the March equinox: a lens, not a star map · 4 ♥ feeling unseen on your birthday is real; say what you'd
//   love ("a small fuss, please"); three cakes arrive. Pisces (classmate) cries. Hard cut on "Not invisible. *Just daytime.*"
// Engine: ../../kxexe01/scenes/xxkit.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { sunChalk, earthChalk, disc, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'
import { notification, notificationCues } from '../../hookkit.js'
import { makeEpisode, checkLengths, R, INK } from '../../kxexe01/scenes/xxkit.js'

const ARI = signStar('aries'), LIB = signStar('libra')
const TAG = k => ({ kind: k, dx: 800, dy: 14, align: 'right' })
const GLY = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

/** a chalk cake with candles (n), flames lit (k 0…1) */
function cake(x, t, cx, cy, s, n, lit, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(s, s)
  x.strokeStyle = EX.chalkPink; x.lineWidth = 5; x.fillStyle = 'rgba(255,173,198,0.25)'
  x.beginPath(); x.roundRect(-90, -40, 180, 80, 12); x.fill(); x.stroke()
  x.strokeStyle = EX.chalk; x.beginPath(); x.moveTo(-90, -10); for (let i = 0; i <= 9; i++) x.lineTo(-90 + i * 20, -10 + (i % 2) * 12); x.stroke()
  for (let i = 0; i < n; i++) {
    const px = (i - (n - 1) / 2) * 34
    x.strokeStyle = EX.chalkBlue; x.beginPath(); x.moveTo(px, -40); x.lineTo(px, -74); x.stroke()
    if (lit > 0) { x.fillStyle = EX.chalkYellow; x.globalAlpha *= 1; x.beginPath(); x.ellipse(px + Math.sin(t * 9 + i) * 2, -88, 8 * lit, 14 * lit, 0, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}
/** the zodiac belt: 12 glyph cells in a row */
function belt(x, t, B, y, at, hi = -1) {
  for (let i = 0; i < 12; i++) {
    const k = popK(t, at + i * 0.06)
    if (k <= 0) continue
    const cx = B.x0 + 40 + i * 66
    x.save(); x.globalAlpha *= k; x.strokeStyle = i === hi ? EX.chalkPink : 'rgba(244,241,232,0.6)'; x.lineWidth = i === hi ? 5 : 3
    x.strokeRect(cx - 30, y - 30, 60, 60)
    x.font = "700 34px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = i === hi ? EX.chalkPink : EX.chalk
    x.fillText(GLY[i], cx, y + 2); x.restore()
  }
}

/** frame 0: a party hat, a cake whose candle has just blown out (a smoke curl), confetti mid-fall */
function hook(x, t) {
  x.save()
  for (let i = 0; i < 30; i++) { const ph = (t * 0.5 + i / 30) % 1; x.fillStyle = ['#ff5c8a', '#ffe27a', '#9fdcff', '#a8f0b8'][i % 4]; x.save(); x.translate(130 + (i * 157) % 820, 380 + ph * 640); x.rotate(t * 3 + i); x.fillRect(-8, -4, 16, 8); x.restore() }
  cake(x, t, 700, 760, 1.6, 1, 0, 1)
  // smoke curl from the blown-out candle
  x.strokeStyle = 'rgba(244,241,232,0.7)'; x.lineWidth = 6; x.beginPath()
  for (let i = 0; i < 20; i++) { const py = 760 - 120 - i * 9, px = 700 + Math.sin(i * 0.6 + t * 4) * 16; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  x.font = "800 64px Inter, 'Helvetica Neue', Arial, sans-serif"; x.textAlign = 'center'; x.fillStyle = '#efe6d6'; x.fillText('happy birthday… to me?', 540, 960)
  x.restore()
}
/** Aries' party hat, seated on its head while the hook is up */
function hat(x, r, t, T) {
  const k = 1 - clamp(prog(t, T.hookOut[0], T.hookOut[1]))
  if (k <= 0) return
  x.save(); x.globalAlpha *= k; x.translate(r.x + 20, r.top + 10); x.rotate(0.25)
  x.fillStyle = '#ff5c8a'; x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-40, 0); x.lineTo(0, -110); x.lineTo(40, 0); x.closePath(); x.fill(); x.stroke()
  x.fillStyle = '#ffe27a'; x.beginPath(); x.arc(0, -112, 14, 0, Math.PI * 2); x.fill(); x.stroke()
  x.restore()
}

const CFG = {
  id: 'kxexe05', duration: 118, key: 'G',
  q: 'Why can’t I see my *sign* on my birthday?', qAccent: '#ffadc6',
  premise: 'me, on my birthday, *feeling invisible.*',
  caught: { x: 700, y: 640, r: 110, label: 'NOBODY NOTICED', arrow: 'bl' },
  promise: 'wait for chapter 4',
  scream: 'HELLO?!',
  hook,
  teacher: { tag: '♎ LIBRA', color: LIB.color, glyph: LIB.glyph, pitch: 523 },
  student: { tag: '♈ ARIES', color: ARI.color, glyph: ARI.glyph, pitch: 784, prop: (x, r, t, T) => hat(x, r, t, T) },
  boardTitle: 'YOUR SIGN, MISSING?',
  music: { style: 'pop', seed: 4651 },
  beats: [
    { // 1 · the question
      lines: [
        ['student', 'i looked up on my birthday. my stars? *gone.*'],
        ['student', 'even the *sky* forgot my birthday.'],
        ['teacher', 'the sky didn’t forget. it’s *hiding* them.', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        cake(x, t, B.x0 + 400, B.y0 + 300, 1.2, 3, 1, popK(t, a))
        if (t > b.lines[1].t) chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 140, r: 90, at: b.lines[1].t + 0.2, dur: 0.6, color: EX.chalkPink, width: 4 })
      },
      chalk: [{ dt: 0.9, line: 1, text: '*???*', x: 400, y: 150, size: 60, align: 'center', color: EX.chalkPink }],
    },
    { // 2 · the Sun moves through the zodiac constellations
      ch: 'what’s really happening',
      lines: [
        ['teacher', 'through the year, the Sun *seems* to move…', { tag: TAG('sky'), point: [400, 120] }],
        ['teacher', '…past the zodiac constellations, *one by one.*', { point: [400, 120] }],
        ['student', 'like a world tour. *starring the Sun.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        belt(x, t, B, B.y0 + 120, a + 0.2)
        const p = ((t - a - 0.8) * 0.12) % 1
        if (t > a + 0.8) sunChalk(x, B.x0 + 40 + p * 726, B.y0 + 230, 30, t, 1)
        earthChalk(x, B.x0 + 400, B.y0 + 400, 34, popK(t, b.lines[1].t))
      },
      chalk: [{ dt: 0.8, line: 2, text: 'THE SUN’S WORLD TOUR', x: 400, y: 460, size: 30, align: 'center', color: EX.chalkYellow }],
    },
    { // ✓ on your birthday the Sun is in front of your sign: daytime stars
      lines: [
        ['teacher', 'on your birthday, the Sun parks *in front* of ♈.', { tag: TAG('sky'), point: [80, 140] }],
        ['teacher', 'so your stars are up *in the daytime.*', { point: [80, 140] }],
        ['teacher', 'and sunlight *drowns* them out.', { point: [80, 220] }],
        ['student', 'the Sun is *photobombing* my birthday?'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        belt(x, t, B, B.y0 + 120, a - 1, 0)
        const park = ease.outCubic(prog(t, a + 0.4, a + 1.8))
        const sx = lerp(B.x0 + 460, B.x0 + 40, park)
        const glow = fadeK(t, b.lines[2].t + 0.2, 0.8)
        if (glow > 0) { x.save(); const g = x.createRadialGradient(sx, B.y0 + 130, 10, sx, B.y0 + 130, 220); g.addColorStop(0, `rgba(255,226,122,${0.55 * glow})`); g.addColorStop(1, 'rgba(255,226,122,0)'); x.fillStyle = g; x.fillRect(B.x0, B.y0, 460, 380); x.restore() }
        sunChalk(x, sx, B.y0 + 130, 34, t, popK(t, a))
        earthChalk(x, B.x0 + 400, B.y0 + 380, 40, 1)
        chalkLine(x, t, { pts: [[B.x0 + 370, B.y0 + 350], [sx + 30, B.y0 + 170]], at: b.lines[1].t + 0.3, dur: 0.5, color: EX.chalkYellow, width: 3, dash: [8, 8], arrow: true })
      },
      chalk: [
        { dt: 0.9, line: 1, text: 'DAYTIME ☀', x: 640, y: 330, size: 36, align: 'center', color: EX.chalkYellow },
        { dt: 0.7, line: 3, text: 'PHOTOBOMB', x: 640, y: 420, size: 34, align: 'center', color: EX.chalkPink },
      ],
    },
    { // ✓ six months later they're high at night
      lines: [
        ['teacher', 'six months on, Earth is *across* its orbit.', { tag: TAG('sky'), point: [600, 240] }],
        ['teacher', 'then your stars are high *at night.*', { point: [620, 120] }],
        ['student', 'so my sign throws its party in *autumn?*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 400, cy = B.y0 + 260
        sunChalk(x, cx, cy, 34, t, popK(t, a))
        chalkCircle(x, t, { x: cx, y: cy, r: 150, at: a + 0.2, dur: 0.8, width: 3, color: EX.chalkBlue })
        const g = Math.PI + Math.PI * ease.inOutCubic(prog(t, a + 1.0, a + 3.0))
        earthChalk(x, cx + Math.cos(g) * 150, cy + Math.sin(g) * 150 * 0.9, 22, 1)
        const l = b.lines[1].t
        ;[0, 1, 2].forEach(i => { const k = popK(t, l + 0.3 + i * 0.15); if (k > 0) { x.save(); x.globalAlpha *= k; x.font = "700 44px 'Space Mono', monospace"; x.fillStyle = EX.chalkPink; x.textAlign = 'center'; x.fillText('♈', B.x1 - 60 - i * 10, B.y0 + 140 + i * 70); x.restore() } })
        if (t > l) chalkLine(x, t, { pts: [[cx + 170, cy], [B.x1 - 110, B.y0 + 200]], at: l + 0.2, dur: 0.4, color: EX.chalkPink, width: 3, dash: [8, 8], arrow: true })
      },
      chalk: [
        { dt: 0.8, line: 0, text: '~6 MONTHS', x: 160, y: 120, size: 36, align: 'center' },
        { dt: 0.7, line: 1, text: 'NIGHT ☾', x: 680, y: 440, size: 34, align: 'center', color: EX.chalkPink },
      ],
    },
    { // 3 · the astrology lens
      ch: 'the astrology lens',
      lines: [
        ['teacher', 'astrologers name your *Sun sign* after…', { tag: TAG('astro'), point: [250, 200] }],
        ['teacher', 'where the Sun was on the wheel *at birth.*', { point: [250, 240] }],
        ['teacher', 'they start that wheel at the *March equinox.*', { point: [250, 300] }],
        ['student', 'so it’s a *lens*, not a star map.'],
        ['teacher', 'exactly. a way of *looking*, not a location.', { point: [600, 250] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x1 - 170, cy = B.y0 + 250
        chalkCircle(x, t, { x: cx, y: cy, r: 120, at: a + 0.2, dur: 0.8, width: 4 })
        for (let i = 0; i < 12; i++) { const g = -Math.PI / 2 + i * Math.PI / 6; chalkLine(x, t, { pts: [[cx + Math.cos(g) * 80, cy + Math.sin(g) * 80], [cx + Math.cos(g) * 120, cy + Math.sin(g) * 120]], at: a + 0.6 + i * 0.04, dur: 0.15, width: 3 }) }
        const l = b.lines[2].t
        if (t > l) { const g = -Math.PI / 2 + Math.PI / 12; disc(x, cx + Math.cos(g) * 100, cy + Math.sin(g) * 100, 14, EX.chalkPink, popK(t, l + 0.3), 0.8) }
        const s = b.lines[1].t
        if (t > s) sunChalk(x, cx, cy, 24, t, popK(t, s + 0.3))
      },
      chalk: [
        { dt: 0.4, line: 0, text: 'SUN SIGN =', x: 40, y: 140, size: 42 },
        { dt: 1.0, line: 1, text: 'the Sun *at birth*', x: 40, y: 210, size: 38 },
        { dt: 0.8, line: 2, text: 'START: March equinox', x: 40, y: 290, size: 30, color: EX.chalkPink },
        { dt: 0.5, line: 3, text: '*LENS* ≠ map', x: 40, y: 380, size: 44 },
      ],
    },
    { // 4 · what it means for love: feeling unseen on your birthday
      ch: 'what it means for love',
      lines: [
        ['teacher', 'feeling *unseen* on your birthday is real.', { tag: TAG('tip'), point: [400, 240] }],
        ['student', 'i wanted a fuss. i didn’t *say* that.'],
        ['teacher', 'people can’t read the sky *in your head.*', { point: [400, 160] }],
        ['teacher', 'say what you’d love. *out loud.*', { tag: TAG('tip'), point: [400, 320] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        // a thought bubble with "fuss?" inside, unseen; then a speech bubble that says it
        const L2 = b.lines[2].t, L3 = b.lines[3].t
        x.save(); x.globalAlpha *= fadeK(t, a) * (1 - fadeK(t, L3 + 0.2)); x.strokeStyle = EX.chalk; x.lineWidth = 4; x.setLineDash([10, 10])
        x.beginPath(); x.ellipse(B.x0 + 400, B.y0 + 180, 220, 90, 0, 0, Math.PI * 2); x.stroke(); x.restore()
        if (t > L3) { x.save(); x.globalAlpha *= popK(t, L3 + 0.3); x.strokeStyle = EX.chalkYellow; x.lineWidth = 6; x.beginPath(); x.roundRect(B.x0 + 160, B.y0 + 100, 480, 160, 30); x.stroke(); x.beginPath(); x.moveTo(B.x0 + 300, B.y0 + 260); x.lineTo(B.x0 + 260, B.y0 + 320); x.lineTo(B.x0 + 360, B.y0 + 260); x.stroke(); x.restore() }
        if (t > L2) for (let i = 0; i < 4; i++) disc(x, B.x0 + 120 + i * 190, B.y0 + 400, 22, EX.chalkBlue, popK(t, L2 + 0.3 + i * 0.1), 0.3)
      },
      chalk: [
        { dt: 0.8, line: 1, text: 'a fuss, maybe?', x: 400, y: 190, size: 40, align: 'center', color: 'rgba(244,241,232,0.6)' },
        { dt: 0.7, line: 3, text: '“A SMALL *FUSS*, PLEASE.”', x: 400, y: 180, size: 36, align: 'center' },
      ],
    },
    { // ♥ Aries texts the group; cakes arrive
      lines: [
        ['student', 'ok. texting the group: “*birthday dinner?*”'],
        ['student', 'is that too much? that’s *too* much.'],
        ['teacher', 'it’s honest. and very *you.*', { tag: TAG('tip'), point: [400, 250] }],
        ['student', 'THREE people brought cake. *THREE.*'],
        ['teacher', 'see? they just needed the *invite.*', { point: [400, 250] }],
      ],
      draw(x, t, B, b) {
        const L3 = b.lines[3].t
        for (let i = 0; i < 3; i++) cake(x, t, B.x0 + 160 + i * 240, B.y0 + 320, 0.9, 2 + i, 1, popK(t, L3 + 0.2 + i * 0.35))
        if (t > L3) for (let i = 0; i < 8; i++) { const ph = ((t - L3) * 0.6 + i / 8) % 1; pixHeart(x, B.x0 + 60 + i * 95, B.y0 + 200 - ph * 160, 4, 1 - ph, i % 2 ? '#ffadc6' : '#ffe27a') }
      },
      chalk: [{ dt: 0.8, line: 0, text: 'BIRTHDAY *DINNER?*', x: 400, y: 120, size: 40, align: 'center' }],
    },
  ],
  bulb: 'so my sign wasn’t gone. *it was daytime.*',
  items: ['The Sun *hides* your sign', 'Six months on: *night*', 'Want a fuss? *Say so*'],
  last: 'Not invisible. *Just daytime.*', lastWho: 'teacher',
  fx: T => {
    const b = T.beats[6], at = b.lines[1].t + 0.8
    return [[notification, { at, out: [at + 2.6, at + 2.9], title: 'the group', body: 'YES. *we’re bringing cake.*', glyph: '♌', time: 'now' }, notificationCues]]
  },
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('kxexe05: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
