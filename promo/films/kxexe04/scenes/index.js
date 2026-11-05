// kxexe04 · STAR TALK EXPLAINS: EXTENDED, ep 4 (118 s vertical, star_advice) · rows: promo/films/month2/m46.md
//   ❓ "Is the North Star the *brightest* star?"   ♐ SAGITTARIUS ("I only fall for the brightest ones") asks; ♑ CAPRICORN
//   teaches. frame 0: Sag mid-leap with a telescope, a quiz buzzer slamming WRONG (caught circle on the star).
//   2 ✓ no: plenty are brighter; Sirius is the brightest star in the night sky · ✓ Earth's axis points almost straight at
//   it, so the sky turns around it while it barely moves (star trails) · ✓ travellers used it to find north · ✓ from far
//   in the Southern Hemisphere you can't see it · ✓ Earth wobbles like a slow top over about 26,000 years; one day Vega
//   has the job · 3 ✦ Saturn read as commitment · 4 ♥ the one worth keeping is the one you can find in the dark.
//   Pisces (classmate) cries. Hard cut on "Not the brightest. *The one you find.*"
// Engine: ../../kxexe01/scenes/xxkit.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { earthChalk, disc, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'
import { notification, notificationCues } from '../../hookkit.js'
import { makeEpisode, checkLengths, R, INK } from '../../kxexe01/scenes/xxkit.js'

const SAG = signStar('sagittarius'), CAP = signStar('capricorn')
const TAG = k => ({ kind: k, dx: 800, dy: 14, align: 'right' })

function star(x, cx, cy, r, col = EX.chalkYellow, a = 1, glow = 16) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.fillStyle = col; x.shadowColor = col; x.shadowBlur = glow; x.beginPath()
  for (let i = 0; i < 10; i++) { const g = i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * 0.42 : r; x.lineTo(cx + Math.cos(g) * rr, cy + Math.sin(g) * rr) }
  x.closePath(); x.fill(); x.restore()
}
/** star trails: arcs around a centre, sweeping with time */
function trails(x, t, cx, cy, n, sweep, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.lineWidth = 3; x.lineCap = 'round'
  for (let i = 0; i < n; i++) {
    const r = 40 + i * 30, g0 = i * 1.37
    x.strokeStyle = i % 3 ? EX.chalk : EX.chalkBlue
    x.beginPath(); x.arc(cx, cy, r, g0, g0 + sweep); x.stroke()
  }
  x.restore()
}

/** frame 0: a big buzzer card slamming WRONG over a starfield, the North Star small and steady */
function hook(x, t) {
  x.save()
  for (let i = 0; i < 26; i++) star(x, 160 + (i * 173) % 780, 430 + (i * 97) % 560, 6 + (i % 4) * 3, '#f4f1e8', 0.7, 6)
  star(x, 820, 520, 30, '#ffe27a', 1, 30)                 // a bright star
  star(x, 300, 560, 14, '#bcd2ff', 1, 10)                 // the North Star, steadier, smaller
  const p = clamp(t / 0.25), s = lerp(1.8, 1, ease.outCubic(p)) * (1 + 0.04 * Math.sin(t * 40))
  x.translate(560, 820); x.rotate(-0.08); x.scale(s, s)
  x.fillStyle = '#e8455e'; x.strokeStyle = INK; x.lineWidth = 10
  x.beginPath(); x.roundRect(-260, -80, 520, 160, 26); x.fill(); x.stroke()
  x.font = "800 110px Inter, 'Helvetica Neue', Arial, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = '#fff8ea'; x.fillText('✕ WRONG', 0, 6)
  x.restore()
}

const CFG = {
  id: 'kxexe04', duration: 118, key: 'Eb',
  q: 'Is the North Star the *brightest* star?', qAccent: '#bcd2ff',
  premise: 'me, only falling for *the brightest.*',
  caught: { x: 300, y: 560, r: 90, label: 'THE NORTH STAR', arrow: 'br' },
  promise: 'wait for chapter 4',
  scream: 'WHAT?!',
  hook,
  teacher: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, pitch: 392 },
  student: { tag: '♐ SAGITTARIUS', color: SAG.color, glyph: SAG.glyph, pitch: 740 },
  boardTitle: 'THE NORTH STAR',
  music: { style: 'jazzy', seed: 4641 },
  beats: [
    { // 1 · the question
      lines: [
        ['student', 'it’s famous. it *must* be the brightest.'],
        ['student', 'i only fall for the *brightest* ones.'],
        ['teacher', 'famous, yes. brightest? *not even close.*', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        star(x, B.x0 + 400, B.y0 + 220, 60 + 6 * Math.sin(t * 3), EX.chalkYellow, popK(t, a))
        if (t > b.lines[2].t) chalkLine(x, t, { pts: [[B.x0 + 320, B.y0 + 140], [B.x0 + 480, B.y0 + 300]], at: b.lines[2].t + 0.3, dur: 0.3, width: 7, color: EX.chalkPink })
      },
      chalk: [{ dt: 0.6, line: 0, text: 'BRIGHTEST?', x: 400, y: 410, size: 44, align: 'center' }],
    },
    { // 2 · what's really happening: plenty are brighter
      ch: 'what’s really happening',
      lines: [
        ['teacher', 'plenty of stars outshine it.', { tag: TAG('sky'), point: [600, 200] }],
        ['teacher', 'the brightest at night is *Sirius.*', { point: [620, 200] }],
        ['student', 'then why is the North Star *famous?*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        for (let i = 0; i < 7; i++) star(x, B.x0 + 120 + i * 95, B.y0 + 300 - (i % 2) * 70, 14 + (i % 3) * 6, EX.chalk, popK(t, a + 0.2 + i * 0.15), 8)
        star(x, B.x0 + 620, B.y0 + 180, 46 + 4 * Math.sin(t * 4), EX.chalkYellow, popK(t, b.lines[1].t + 0.3), 30)
        star(x, B.x0 + 160, B.y0 + 160, 16, EX.chalkBlue, popK(t, a + 0.4), 8)
      },
      chalk: [
        { dt: 1.0, line: 1, text: 'SIRIUS', x: 620, y: 260, size: 34, align: 'center', color: EX.chalkYellow },
        { dt: 0.8, line: 0, text: 'north star', x: 160, y: 220, size: 28, align: 'center', color: EX.chalkBlue },
      ],
    },
    { // ✓ the axis points at it; the sky turns around it
      lines: [
        ['teacher', 'Earth’s axis points almost *right at it.*', { tag: TAG('sky'), point: [400, 200] }],
        ['teacher', 'so the whole sky turns *around* it.', { point: [400, 240] }],
        ['student', 'and it just… *stays put?*'],
        ['teacher', 'it barely moves. *all night.*', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 400, cy = B.y0 + 240
        const l1 = b.lines[1].t
        trails(x, t, cx, cy, 7, 0.2 + 2.6 * ease.inOutCubic(prog(t, l1, l1 + 6)), fadeK(t, l1))
        star(x, cx, cy, 20, EX.chalkBlue, popK(t, a), 18)
        chalkLine(x, t, { pts: [[B.x0 + 120, B.y0 + 450], [cx, cy]], at: a + 0.3, dur: 0.6, width: 4, color: EX.chalkYellow, dash: [10, 10], arrow: true })
        earthChalk(x, B.x0 + 110, B.y0 + 455, 30, popK(t, a))
      },
      chalk: [{ dt: 0.8, line: 3, text: 'STAYS *PUT*', x: 640, y: 440, size: 38, align: 'center' }],
    },
    { // ✓ travellers used it to find north; not visible far south
      lines: [
        ['teacher', 'so travellers used it to find *north.*', { tag: TAG('sky'), point: [400, 120] }],
        ['teacher', 'far in the south, you can’t see it *at all.*', { point: [400, 400] }],
        ['student', 'a star with a *job.* respect.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 400, cy = B.y0 + 250
        star(x, cx, B.y0 + 70, 18, EX.chalkBlue, popK(t, a), 18)
        chalkLine(x, t, { pts: [[cx, cy + 40], [cx, B.y0 + 110]], at: a + 0.3, dur: 0.5, width: 5, color: EX.chalkYellow, arrow: true })
        // a tiny traveller walking north (up the board, looping)
        const p = ((t - a) * 0.15) % 1
        disc(x, cx + 80, lerp(B.y0 + 330, B.y0 + 150, p), 10, EX.chalkPink, fadeK(t, a + 0.4), 0.9)
        const l = b.lines[1].t
        if (t > l) { earthChalk(x, B.x0 + 650, B.y0 + 300, 60, popK(t, l)); chalkLine(x, t, { pts: [[B.x0 + 590, B.y0 + 320], [B.x0 + 710, B.y0 + 320]], at: l + 0.4, dur: 0.3, width: 3, dash: [6, 6] }); disc(x, B.x0 + 660, B.y0 + 350, 8, EX.chalkPink, fadeK(t, l + 0.7), 0.9) }
      },
      chalk: [
        { dt: 0.6, line: 0, text: 'N', x: 430, y: 60, size: 44, color: EX.chalkYellow },
        { dt: 0.8, line: 1, text: 'from here: no star', x: 650, y: 420, size: 28, align: 'center', color: EX.chalkPink },
      ],
    },
    { // ✓ the wobble: 26,000 years, Vega takes the job
      lines: [
        ['teacher', 'Earth wobbles like a slow *spinning top.*', { tag: TAG('sky'), point: [250, 240] }],
        ['teacher', 'one wobble takes about *26,000 years.*', { point: [250, 240] }],
        ['teacher', 'so one day, a star called *Vega* takes over.', { point: [620, 160] }],
        ['student', 'even the North Star gets *replaced?*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 250, cy = B.y0 + 300
        const g = (t - a) * 1.2
        x.save(); x.globalAlpha *= fadeK(t, a)
        x.strokeStyle = EX.chalk; x.lineWidth = 5
        const tx = cx + Math.cos(g) * 40, ty = cy - 150 + Math.sin(g) * 12
        x.beginPath(); x.moveTo(cx, cy + 80); x.lineTo(tx, ty); x.stroke()
        x.restore()
        earthChalk(x, cx, cy, 70, popK(t, a))
        chalkCircle(x, t, { x: cx, y: cy - 150, r: 42, at: a + 0.6, dur: 0.7, width: 3, color: EX.chalkYellow })
        const l2 = b.lines[2].t
        star(x, B.x0 + 620, B.y0 + 150, 24, '#c9a6ff', popK(t, l2 + 0.3), 20)
      },
      chalk: [
        { dt: 1.0, line: 1, text: '*26,000* YRS', x: 560, y: 360, size: 42, align: 'center' },
        { dt: 1.1, line: 2, text: 'VEGA', x: 620, y: 230, size: 32, align: 'center', color: '#c9a6ff' },
      ],
    },
    { // 3 · the astrology lens
      ch: 'the astrology lens',
      lines: [
        ['teacher', 'astrologers read *Saturn* as commitment.', { tag: TAG('astro'), point: [250, 200] }],
        ['teacher', 'the part of you that keeps *showing up.*', { point: [250, 300] }],
        ['student', 'so Saturn is my *north star?*'],
        ['teacher', 'for some people, yes. *steady* wins.', { point: [600, 250] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x1 - 160, cy = B.y0 + 240
        disc(x, cx, cy, 54, '#f7dca0', popK(t, a), 0.45)
        x.save(); x.globalAlpha *= popK(t, a + 0.3); x.strokeStyle = '#f7dca0'; x.lineWidth = 5; x.beginPath(); x.ellipse(cx, cy, 110, 26, -0.25, 0, Math.PI * 2); x.stroke(); x.restore()
      },
      chalk: [
        { dt: 0.4, line: 0, text: 'SATURN =', x: 60, y: 140, size: 46 },
        { dt: 0.9, line: 0, text: '*COMMITMENT*', x: 60, y: 210, size: 50 },
        { dt: 0.7, line: 1, text: '= showing up', x: 60, y: 300, size: 36 },
      ],
    },
    { // 4 · what it means for love: the one you can find in the dark
      ch: 'what it means for love',
      lines: [
        ['teacher', 'the one worth keeping isn’t always *brightest.*', { tag: TAG('tip'), point: [400, 240] }],
        ['teacher', 'it’s the one you can find *in the dark.*', { point: [400, 240] }],
        ['student', 'at 2 a.m., when everything is *spinning?*'],
        ['teacher', 'exactly. the one who *stays put.*', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 400, cy = B.y0 + 240
        const l2 = b.lines[2].t
        trails(x, t, cx, cy, 6, 0.4 + (t - a) * 0.25, fadeK(t, l2) * 0.8)
        for (let i = 0; i < 5; i++) star(x, B.x0 + 100 + i * 150, B.y0 + 100 + (i % 2) * 260, 22, EX.chalkYellow, popK(t, a + 0.3 + i * 0.1) * (0.5 + 0.5 * Math.sin(t * 6 + i)), 24)
        pixHeart(x, cx, cy, 7 + Math.sin(t * 3), popK(t, b.lines[1].t + 0.3), '#bcd2ff')
      },
      chalk: [{ dt: 0.8, line: 3, text: '*STAYS PUT*', x: 400, y: 430, size: 44, align: 'center' }],
    },
    { // ♥ Sag looks at the friend who always answers
      lines: [
        ['student', 'wait. who answers me at *2 a.m.?*'],
        ['student', 'it’s… my *best friend.* every single time.'],
        ['teacher', 'then tell them. *tonight.*', { tag: TAG('tip'), point: [400, 260] }],
        ['student', '“you’re my north star.” *sent.*'],
        ['student', 'they replied with *eleven* hearts.'],
      ],
      draw(x, t, B, b) {
        const L1 = b.lines[1].t, L4 = b.lines[4].t
        star(x, B.x0 + 400, B.y0 + 200, 40, '#bcd2ff', popK(t, L1 + 0.4), 30)
        chalkCircle(x, t, { x: B.x0 + 400, y: B.y0 + 200, r: 80, at: L1 + 0.8, dur: 0.6, width: 5, color: EX.chalkPink })
        if (t > L4) for (let i = 0; i < 11; i++) { const p = popK(t, L4 + 0.2 + i * 0.12); pixHeart(x, B.x0 + 100 + i * 60, B.y0 + 390 + Math.sin(t * 4 + i) * 8, 4, p) }
      },
      chalk: [{ dt: 0.6, line: 1, text: 'BEST FRIEND', x: 400, y: 320, size: 36, align: 'center', color: '#bcd2ff' }],
    },
  ],
  bulb: 'so brightest isn’t best. *steady* is.',
  items: ['Sirius is *brighter*', 'The sky turns *around* it', 'Love: who *stays put*'],
  last: 'Not the brightest. *The one you find.*', lastWho: 'teacher',
  fx: T => {
    const b = T.beats[7], at = b.lines[4].t - 0.3
    return [[notification, { at, out: [at + 2.6, at + 2.9], title: 'texts', body: 'bestie: *always.* ♥♥♥', glyph: '♉', time: '2:04 AM' }, notificationCues]]
  },
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('kxexe04: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
