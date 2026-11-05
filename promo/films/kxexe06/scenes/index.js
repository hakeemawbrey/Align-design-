// kxexe06 · STAR TALK EXPLAINS: EXTENDED, ep 6 (118 s vertical, star_advice) · rows: promo/films/month2/m46.md
//   ❓ "Why do *shooting stars* come back every December?"   ♓ PISCES (wishing that they'd text back; cries itself) asks;
//   ♒ AQUARIUS teaches. frame 0: Pisces mid-wish, a streak crossing the frame, a 3·2·1 countdown (caught on the streak).
//   2 ✓ a shooting star is a bit of space dust, often smaller than a pebble, burning up high in the air · ✓ comets and
//   some asteroids leave dust trails along their orbits · ✓ Earth crosses the same trail at the same point every year,
//   so the shower returns on the same dates · ✓ December: the Geminids, peaking around the 13th–14th; their dust comes
//   from an asteroid called Phaethon; they seem to fly out of Gemini · ✓ best far from city lights · 3 ✦ wishing is an old
//   tradition, not astronomy; astrologers read wishes as intentions · 4 ♥ a wish is a start; text first, honestly, and
//   let them answer however they answer. Pisces fountains. Hard cut on "Make the wish. *Then* text first."
// Engine: ../../kxexe01/scenes/xxkit.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { sunChalk, earthChalk, disc, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'
import { countdown, countdownCues, notification, notificationCues } from '../../hookkit.js'
import { makeEpisode, checkLengths } from '../../kxexe01/scenes/xxkit.js'

const PIS = signStar('pisces'), AQU = signStar('aquarius')
const TAG = k => ({ kind: k, dx: 800, dy: 14, align: 'right' })

/** a meteor streak from (x0,y0) heading along (dx,dy), progress p 0…1 */
function streak(x, x0, y0, dx, dy, p, len = 180, col = '#fff3c4', w = 6) {
  if (p <= 0 || p >= 1.3) return
  const hx = x0 + dx * p, hy = y0 + dy * p, d = Math.hypot(dx, dy)
  const tx = hx - dx / d * len, ty = hy - dy / d * len
  x.save(); x.globalAlpha *= clamp(1.3 - p)
  const g = x.createLinearGradient(tx, ty, hx, hy); g.addColorStop(0, 'rgba(255,243,196,0)'); g.addColorStop(1, col)
  x.strokeStyle = g; x.lineWidth = w; x.lineCap = 'round'; x.shadowColor = col; x.shadowBlur = 16
  x.beginPath(); x.moveTo(tx, ty); x.lineTo(hx, hy); x.stroke(); x.restore()
}
const rep = (t, period, off = 0) => (((t + off) % period) + period) % period / period

/** frame 0: night sky, a big meteor mid-streak, smaller ones behind */
function hook(x, t) {
  x.save()
  const g = x.createLinearGradient(0, 380, 0, 1040); g.addColorStop(0, 'rgba(8,6,30,0.9)'); g.addColorStop(1, 'rgba(40,24,90,0.4)')
  x.fillStyle = g; x.fillRect(80, 380, 920, 660)
  for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(244,241,232,${0.4 + 0.3 * Math.sin(t * 3 + i)})`; x.fillRect(100 + (i * 197) % 880, 400 + (i * 113) % 600, 4, 4) }
  streak(x, 980, 400, -780, 420, 0.55 + t * 0.35, 420, '#fff3c4', 12)
  streak(x, 900, 480, -400, 260, rep(t, 1.1, 0.4) * 1.3, 160, '#bcd2ff', 5)
  streak(x, 700, 420, -300, 220, rep(t, 0.9, 0.1) * 1.3, 120, '#ffadc6', 4)
  x.restore()
}

const CFG = {
  id: 'kxexe06', duration: 118, key: 'Dm',
  q: 'Why do *shooting stars* come back every December?', qAccent: '#fff3c4',
  premise: 'me, wishing they’d *text me back.*',
  caught: { x: 560, y: 650, r: 140, label: 'MAKE A WISH', arrow: 'tr' },
  promise: 'wait for chapter 4',
  scream: 'WISH!!',
  hook,
  teacher: { tag: '♒ AQUARIUS', color: AQU.color, glyph: AQU.glyph, pitch: 587 },
  student: { tag: '♓ PISCES', color: PIS.color, glyph: PIS.glyph, pitch: 830 },
  boardTitle: 'SHOOTING STARS',
  music: { style: 'cinematic', seed: 4661 },
  beats: [
    { // 1 · the question
      lines: [
        ['student', 'i wished they’d text me. on *every* one.'],
        ['student', 'and they come back *every* December. why?'],
        ['teacher', 'great question. first: they’re *not stars.*', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        for (let i = 0; i < 4; i++) streak(x, B.x1 - 40 - i * 120, B.y0 + 70 + i * 30, -360, 220, rep(t - a, 1.6, i * 0.4) * 1.3, 120, EX.chalkYellow, 5)
        const l = b.lines[2].t
        if (t > l) chalkLine(x, t, { pts: [[B.x0 + 160, B.y0 + 380], [B.x0 + 640, B.y0 + 380]], at: l + 0.4, dur: 0.4, width: 6, color: EX.chalkPink })
      },
      chalk: [
        { dt: 0.6, line: 0, text: 'WISH × 40', x: 200, y: 420, size: 40, align: 'center', color: EX.chalkPink },
        { dt: 0.6, line: 2, text: 'NOT STARS', x: 400, y: 340, size: 46, align: 'center' },
      ],
    },
    { // 2 · dust, burning up high in the air
      ch: 'what’s really happening',
      lines: [
        ['teacher', 'it’s *space dust*, often tinier than a pebble.', { tag: TAG('sky'), point: [200, 250] }],
        ['teacher', 'it hits our air so fast it *burns up*, high up.', { point: [560, 200] }],
        ['student', 'a *pebble* made me cry forty times?'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        disc(x, B.x0 + 200, B.y0 + 250, 10, EX.chalk, popK(t, a + 0.4), 0.9)
        chalkCircle(x, t, { x: B.x0 + 200, y: B.y0 + 250, r: 44, at: a + 0.9, dur: 0.5, color: EX.chalkPink, width: 4 })
        const l = b.lines[1].t
        chalkLine(x, t, { pts: Array.from({ length: 14 }, (_, i) => [B.x0 + 330 + i * 34, B.y0 + 360 - Math.sin(i * 0.3) * 30]), at: l, dur: 0.6, width: 4, color: EX.chalkBlue })
        if (t > l) streak(x, B.x1 - 40, B.y0 + 80, -300, 240, rep(t - l, 1.4) * 1.2, 160, EX.chalkYellow, 6)
      },
      chalk: [
        { dt: 1.2, line: 0, text: 'DUST • (tiny)', x: 200, y: 340, size: 30, align: 'center' },
        { dt: 0.9, line: 1, text: 'AIR', x: 560, y: 420, size: 34, align: 'center', color: EX.chalkBlue },
      ],
    },
    { // ✓ comets and some asteroids leave trails of dust
      lines: [
        ['teacher', 'comets and some asteroids leave dust *trails.*', { tag: TAG('sky'), point: [400, 200] }],
        ['teacher', 'the dust stays spread along *their orbit.*', { point: [400, 260] }],
        ['student', 'like crumbs. *space crumbs.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 400, cy = B.y0 + 260
        sunChalk(x, cx, cy, 26, t, popK(t, a))
        x.save(); x.globalAlpha *= fadeK(t, a + 0.4); x.strokeStyle = EX.chalk; x.lineWidth = 3; x.setLineDash([3, 9]); x.beginPath(); x.ellipse(cx + 60, cy, 330, 160, 0.15, 0, Math.PI * 2); x.stroke(); x.restore()
        const g = (t - a) * 0.6
        disc(x, cx + 60 + Math.cos(g) * 330, cy + Math.sin(g) * 160, 12, EX.chalkBlue, popK(t, a + 0.2), 0.9)
        const l = b.lines[1].t
        for (let i = 0; i < 40; i++) { const gg = i * 0.157; const k = fadeK(t, l + i * 0.03); if (k > 0) { x.fillStyle = `rgba(255,226,122,${0.8 * k})`; x.fillRect(cx + 60 + Math.cos(gg) * 330 - 2, cy + Math.sin(gg) * 160 - 2, 5, 5) } }
      },
      chalk: [{ dt: 0.7, line: 2, text: 'SPACE *CRUMBS*', x: 400, y: 460, size: 36, align: 'center' }],
    },
    { // ✓ Earth crosses the same trail at the same point every year
      lines: [
        ['teacher', 'Earth crosses that trail at the *same point*…', { tag: TAG('sky'), point: [600, 240] }],
        ['teacher', '…of its orbit, every year. so: *same dates.*', { point: [600, 240] }],
        ['student', 'a shower with a *calendar invite.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 330, cy = B.y0 + 260
        sunChalk(x, cx, cy, 26, t, popK(t, a))
        chalkCircle(x, t, { x: cx, y: cy, r: 200, at: a + 0.2, dur: 0.8, width: 3, color: EX.chalkBlue })
        // the dust trail crossing Earth's orbit at the right
        for (let i = 0; i < 30; i++) { const k = fadeK(t, a + 0.5 + i * 0.02); x.fillStyle = `rgba(255,226,122,${0.8 * k})`; x.fillRect(cx + 120 + i * 14, cy - 220 + i * 15, 5, 5) }
        const g = -Math.PI * 0.85 + ((t - a) * 0.5) % (Math.PI * 2)
        earthChalk(x, cx + Math.cos(g) * 200, cy + Math.sin(g) * 200, 22, 1)
        const l = b.lines[1].t
        if (t > l) chalkCircle(x, t, { x: cx + 200 * Math.cos(0.15), y: cy + 200 * Math.sin(0.15), r: 46, at: l + 0.3, dur: 0.5, width: 5, color: EX.chalkPink })
      },
      chalk: [{ dt: 1.0, line: 1, text: 'EVERY YEAR', x: 680, y: 440, size: 32, align: 'center', color: EX.chalkPink }],
    },
    { // ✓ December: the Geminids
      lines: [
        ['teacher', 'in December it’s the *Geminids.*', { tag: TAG('sky'), point: [300, 200] }],
        ['teacher', 'they peak around the *13th and 14th.*', { point: [600, 160] }],
        ['teacher', 'their dust comes from an asteroid: *Phaethon.*', { point: [300, 300] }],
        ['student', 'and why are they called *Geminids?*'],
        ['teacher', 'they seem to fly out of *Gemini.*', { point: [250, 220] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        // Gemini's two bright stars, meteors radiating out from near them
        const rx = B.x0 + 250, ry = B.y0 + 220
        disc(x, rx - 20, ry - 30, 9, EX.chalkYellow, popK(t, a), 0.9); disc(x, rx + 24, ry + 18, 9, EX.chalkYellow, popK(t, a + 0.1), 0.9)
        const l4 = b.lines[4].t
        if (t > l4) for (let i = 0; i < 8; i++) { const g = i * Math.PI / 4 + 0.3; streak(x, rx + Math.cos(g) * 40, ry + Math.sin(g) * 40, Math.cos(g) * 230, Math.sin(g) * 160, rep(t - l4, 1.3, i * 0.16) * 1.2, 70, EX.chalkYellow, 4) }
        const l1 = b.lines[1].t, k = popK(t, l1 + 0.3)
        if (k > 0) {
          x.save(); x.globalAlpha *= k; x.strokeStyle = EX.chalk; x.lineWidth = 4; x.strokeRect(B.x0 + 500, B.y0 + 90, 240, 170)
          x.font = "700 26px 'Space Mono', monospace"; x.fillStyle = EX.chalk; x.textAlign = 'center'; x.fillText('DECEMBER', B.x0 + 620, B.y0 + 125)
          for (let i = 0; i < 14; i++) { const cx = B.x0 + 520 + (i % 7) * 32, cy = B.y0 + 165 + Math.floor(i / 7) * 46; const hot = i === 12 || i === 13; x.fillStyle = hot ? EX.chalkPink : 'rgba(244,241,232,0.6)'; x.font = "700 22px 'Space Mono', monospace"; x.fillText(String(i + 1), cx + 10, cy) }
          x.restore()
        }
      },
      chalk: [
        { dt: 0.6, line: 0, text: 'GEMINIDS', x: 250, y: 120, size: 40, align: 'center', color: EX.chalkYellow },
        { dt: 0.8, line: 2, text: 'from: *Phaethon*', x: 250, y: 400, size: 34, align: 'center' },
      ],
    },
    { // ✓ best far from city lights
      lines: [
        ['teacher', 'tip: you see more far from *city lights.*', { tag: TAG('sky'), point: [400, 260] }],
        ['student', 'a blanket. a hill. *maybe snacks.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        chalkLine(x, t, { pts: Array.from({ length: 21 }, (_, i) => [B.x0 + 20 + i * 38, B.y0 + 420 - Math.sin(Math.PI * i / 20) * 90]), at: a, dur: 0.7, width: 4, color: EX.chalkGreen })
        for (let i = 0; i < 5; i++) { const k = fadeK(t, a + 0.3); x.fillStyle = `rgba(255,226,122,${0.5 * k})`; x.fillRect(B.x0 + 30 + i * 24, B.y0 + 330 - i * 14, 14, 90 + i * 14) }
        for (let i = 0; i < 3; i++) streak(x, B.x1 - 60 - i * 80, B.y0 + 60, -260, 160, rep(t - a, 1.5, i * 0.5) * 1.2, 100, EX.chalkYellow, 5)
      },
      chalk: [
        { dt: 0.9, line: 0, text: 'CITY ✗', x: 90, y: 300, size: 30, align: 'center', color: EX.chalkPink },
        { dt: 0.6, line: 1, text: 'HILL ✓', x: 400, y: 280, size: 34, align: 'center', color: EX.chalkGreen },
      ],
    },
    { // 3 · the astrology lens
      ch: 'the astrology lens',
      lines: [
        ['teacher', 'wishing on them is an old *tradition.*', { tag: TAG('astro'), point: [250, 200] }],
        ['teacher', 'not astronomy. astrologers call it *intention.*', { point: [250, 300] }],
        ['student', 'so the wish is… a *plan?*'],
        ['teacher', 'it’s the *first step* of one.', { point: [600, 250] }],
      ],
      draw(x, t, B, b) { streak(x, B.x1 - 60, B.y0 + 100, -240, 200, rep(t, 1.8) * 1.2, 120, EX.chalkPink, 6) },
      chalk: [
        { dt: 0.4, line: 0, text: 'A WISH =', x: 60, y: 140, size: 46 },
        { dt: 0.9, line: 1, text: '*INTENTION*', x: 60, y: 220, size: 52 },
        { dt: 0.6, line: 3, text: 'step 1 of a plan', x: 60, y: 320, size: 34 },
      ],
    },
    { // 4 · what it means for love
      ch: 'what it means for love',
      lines: [
        ['teacher', 'a wish is a start. the *brave* part is yours.', { tag: TAG('tip'), point: [400, 240] }],
        ['student', 'you mean… *i* text first?'],
        ['teacher', 'honestly. kindly. no *games.*', { point: [400, 240] }],
        ['teacher', 'and let them answer however they *answer.*', { point: [400, 320] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        streak(x, B.x1 - 80, B.y0 + 80, -320, 200, clamp(prog(t, a, a + 1.4)) * 1.1, 160, EX.chalkYellow, 6)
        pixHeart(x, B.x0 + 400, B.y0 + 260, 9, popK(t, b.lines[1].t + 0.3))
      },
      chalk: [
        { dt: 0.5, line: 2, text: '✓ honest  ✓ kind', x: 400, y: 380, size: 34, align: 'center', color: EX.chalkGreen },
        { dt: 0.9, line: 3, text: 'their answer is *theirs*', x: 400, y: 440, size: 32, align: 'center' },
      ],
    },
    { // ♥ Pisces texts first
      lines: [
        ['student', '“been thinking of you. *how are you?*”'],
        ['student', 'sent. i’m going to *cry.* i’m crying.'],
        ['teacher', 'you were *brave.* that part’s done.', { tag: TAG('tip'), point: [400, 250] }],
        ['student', 'THEY SAID “i was hoping you’d *text!*”'],
      ],
      draw(x, t, B, b) {
        const L0 = b.lines[0].t, L3 = b.lines[3].t
        x.save(); x.globalAlpha *= fadeK(t, L0); x.strokeStyle = EX.chalk; x.lineWidth = 5; x.beginPath(); x.roundRect(B.x0 + 270, B.y0 + 70, 260, 380, 28); x.stroke(); x.restore()
        const bub = (at, txt, me, y, col) => { const p = popK(t, at); if (p <= 0) return; x.save(); x.translate(B.x0 + (me ? 500 : 300), B.y0 + y); x.scale(p, p); x.font = "700 22px 'Space Mono', monospace"; const w = x.measureText(txt).width + 28; x.strokeStyle = col; x.lineWidth = 4; x.beginPath(); x.roundRect(me ? -w : 0, -24, w, 48, 18); x.stroke(); x.fillStyle = EX.chalk; x.textAlign = me ? 'right' : 'left'; x.textBaseline = 'middle'; x.fillText(txt, me ? -14 : 14, 2); x.restore() }
        bub(L0 + 1.4, 'how are you?', true, 150, EX.chalkBlue)
        bub(b.lines[2].t, '•'.repeat(1 + Math.floor(t * 4) % 3), false, 230, EX.chalkPink)
        bub(L3 + 0.1, 'hoping you’d text!', false, 310, EX.chalkPink)
        if (t > L3) for (let i = 0; i < 6; i++) streak(x, B.x1 - 20 - i * 60, B.y0 + 40, -300, 220, rep(t - L3, 1.2, i * 0.2) * 1.2, 100, EX.chalkYellow, 4)
      },
    },
  ],
  bulb: 'so: wish on the dust. *then* be brave.',
  items: ['Shooting star = *space dust*', 'Same trail, *same dates*', 'Wish, then *text first*'],
  last: 'Make the wish. *Then* text first.', lastWho: 'teacher',
  fx: T => {
    const b = T.beats[8], at = b.lines[3].t - 0.3
    return [
      [countdown, { at: 0.02, from: 3, gap: 0.2, go: null, y: 1250 }, countdownCues],
      [notification, { at, out: [at + 2.6, at + 2.9], title: 'texts', body: 'i was hoping you’d *text!*', glyph: '♋', time: 'now' }, notificationCues],
    ]
  },
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('kxexe06: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
