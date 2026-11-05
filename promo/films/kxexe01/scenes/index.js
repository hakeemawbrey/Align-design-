// kxexe01 · STAR TALK EXPLAINS: EXTENDED, ep 1 (118 s vertical, star_advice) · rows: promo/films/month2/m46.md
//   ❓ "Why does the Moon *follow* my car?"   ♋ CANCER (driving home from the ex's) asks; ☽ THE MOON teaches.
//   frame 0: Cancer mid-scream in front of a car window, street lights streaking, the Moon pinned in the corner (caught).
//   1 the question · 2 what's really happening: ✓ ~384,000 km away (almost ten trips round Earth) · ✓ near things whip
//   past, the Moon's direction barely changes (parallel sight lines) · ✓ everyone in town sees it "follow" them · ✓ it
//   still rises and sets · 3 the astrology lens: ✦ feelings and memory · 4 what it means for love: ♥ a big feeling about
//   an ex seems to follow you because it's big and far; let it ride along, don't steer toward it; it sets ·
//   5 the short version. Pisces (classmate) cries. Hard cut on "Not following you. *Just far.*"
// Engine: ./xxkit.js (shared by kxexe01–06). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { earthChalk, moonPhase, disc, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'
import { makeEpisode, checkLengths, R, INK } from './xxkit.js'

const CAN = signStar('cancer')
const MOONC = '#e9e4ff', MOONLIGHT = '#bcd2ff'
const SKY = { kind: 'sky', dx: 800, dy: 14, align: 'right' }, ASTRO = { kind: 'astro', dx: 800, dy: 14, align: 'right' }, TIP = { kind: 'tip', dx: 800, dy: 14, align: 'right' }

/** a tiny chalk car (side view), facing right */
function car(x, cx, cy, s = 1, col = EX.chalkPink, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(s, s)
  x.strokeStyle = col; x.lineWidth = 5 / s; x.lineJoin = 'round'; x.shadowColor = col; x.shadowBlur = 8
  x.beginPath(); x.moveTo(-46, 8); x.lineTo(-46, -8); x.lineTo(-24, -10); x.lineTo(-12, -28); x.lineTo(18, -28); x.lineTo(30, -10); x.lineTo(46, -8); x.lineTo(46, 8); x.closePath(); x.stroke()
  x.beginPath(); x.arc(-26, 10, 9, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(26, 10, 9, 0, Math.PI * 2); x.stroke()
  x.restore()
}
function tree(x, cx, cy, s = 1, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.strokeStyle = EX.chalkGreen; x.lineWidth = 5; x.shadowColor = EX.chalkGreen; x.shadowBlur = 8
  x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx, cy - 30 * s); x.stroke()
  x.beginPath(); x.moveTo(cx - 24 * s, cy - 26 * s); x.lineTo(cx, cy - 80 * s); x.lineTo(cx + 24 * s, cy - 26 * s); x.closePath(); x.stroke()
  x.restore()
}
const wrap = (v, a, b) => a + ((((v - a) % (b - a)) + (b - a)) % (b - a))

/** frame 0: the car window at night: streaking street lights, the Moon pinned top-right */
function hook(x, t) {
  const X0 = 130, Y0 = 520, W = 820, H = 470
  x.save()
  R(x, INK, X0 - 14, Y0 - 14, W + 28, H + 28)
  const g = x.createLinearGradient(0, Y0, 0, Y0 + H); g.addColorStop(0, '#0b1240'); g.addColorStop(1, '#2a1d5c')
  x.fillStyle = g; x.fillRect(X0, Y0, W, H)
  x.beginPath(); x.rect(X0, Y0, W, H); x.clip()
  for (let i = 0; i < 40; i++) { const sx = X0 + ((i * 197) % W), sy = Y0 + ((i * 83) % (H * 0.6)); x.fillStyle = `rgba(244,241,232,${0.3 + 0.3 * Math.sin(t * 2 + i)})`; x.fillRect(sx, sy, 3, 3) }
  // the Moon: fixed in the window, glowing
  x.shadowColor = MOONLIGHT; x.shadowBlur = 40; x.fillStyle = MOONC
  x.beginPath(); x.arc(X0 + 640, Y0 + 120, 62, 0, Math.PI * 2); x.fill(); x.shadowBlur = 0
  x.fillStyle = 'rgba(160,150,210,0.5)'; x.beginPath(); x.arc(X0 + 622, Y0 + 104, 12, 0, Math.PI * 2); x.arc(X0 + 662, Y0 + 138, 8, 0, Math.PI * 2); x.fill()
  // street lights + trees whipping past (fast), a far hill line (slow)
  x.strokeStyle = '#3e2f7a'; x.lineWidth = 6; x.beginPath(); for (let i = 0; i <= 20; i++) { const px = X0 + i * W / 20, py = Y0 + 330 + Math.sin(i * 0.9 + t * 0.2) * 14; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  for (let i = 0; i < 5; i++) {
    const px = wrap(X0 + W - (t * 1900 + i * 230), X0 - 120, X0 + W + 120)
    x.fillStyle = 'rgba(255,226,122,0.85)'; x.fillRect(px, Y0 + 150, 160, 8)
    x.fillStyle = '#120a2e'; x.fillRect(px + 60, Y0 + 160, 14, H)
  }
  x.restore()
  // window frame + raindrop streaks
  x.save(); x.strokeStyle = '#d8d0ff'; x.lineWidth = 10; x.strokeRect(X0, Y0, W, H); x.restore()
}

const CFG = {
  id: 'kxexe01', duration: 118, key: 'E',
  q: 'Why does the Moon *follow* my car?', qAccent: MOONLIGHT,
  premise: 'me, driving home *from my ex’s.*',
  caught: { x: 770, y: 640, r: 105, label: 'IT’S FOLLOWING ME', arrow: 'bl' },
  promise: 'wait for chapter 4',
  scream: 'AAAH!',
  hook,
  teacher: { tag: '☽ THE MOON', color: MOONC, glyph: '☽', accent: MOONLIGHT, pitch: 392 },
  student: { tag: '♋ CANCER', color: CAN.color, glyph: CAN.glyph, pitch: 698 },
  boardTitle: 'FOLLOWING YOU?',
  music: { style: 'dreamy', seed: 4611 },
  beats: [
    { // 1 · the question
      lines: [
        ['student', 'it followed me *all the way* home.'],
        ['student', 'like my feelings. is it *stalking* me?'],
        ['teacher', 'i promise i’m not. let me *show* you.', { point: [400, 260] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 380
        chalkLine(x, t, { pts: [[B.x0 + 20, Y + 24], [B.x1 - 20, Y + 24]], at: a, dur: 0.6, width: 5 })
        const p = (t - a) * 0.09
        car(x, lerp(B.x0 + 90, B.x1 - 90, clamp(p)), Y, 1.1, EX.chalkPink, fadeK(t, a, 0.3))
        moonPhase(x, B.x1 - 120 - 0 * p, B.y0 + 130, 46, 0.5, fadeK(t, a + 0.4))
        // a dotted "?" trail from the Moon to the car
        if (t > b.lines[1].t) chalkLine(x, t, { pts: [[B.x1 - 150, B.y0 + 170], [lerp(B.x0 + 90, B.x1 - 90, clamp(p)) + 10, Y - 40]], at: b.lines[1].t + 0.2, dur: 0.6, color: EX.chalkYellow, width: 4, dash: [10, 12] })
      },
      chalk: [{ dt: 1.0, line: 1, text: 'STALKING?', x: 220, y: 150, size: 48, align: 'center', color: EX.chalkPink }],
    },
    { // 2 · what's really happening: the distance
      ch: 'what’s really happening',
      lines: [
        ['teacher', 'i’m about *384,000 km* away.', { tag: SKY, point: [400, 230] }],
        ['teacher', 'that’s almost *ten trips* around Earth.', { point: [200, 240] }],
        ['student', 'so i drove… *none* of the way to you?'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 250
        earthChalk(x, B.x0 + 80, Y, 44, popK(t, a))
        moonPhase(x, B.x1 - 60, Y, 22, 0.5, popK(t, a + 0.3))
        chalkLine(x, t, { pts: [[B.x0 + 130, Y], [B.x1 - 90, Y]], at: a + 0.5, dur: 1.0, color: EX.chalkYellow, width: 4, dash: [12, 12], arrow: true })
        // ten loops around Earth, drawn one by one
        const l = b.lines[1].t
        for (let i = 0; i < 10; i++) chalkCircle(x, t, { x: B.x0 + 80, y: Y, r: 56 + i * 7, at: l + 0.2 + i * 0.16, dur: 0.25, color: EX.chalkBlue, width: 2 })
        // the tiny car, a dot near Earth
        const s = b.lines[2].t
        if (t > s) { car(x, B.x0 + 150, Y + 90, 0.5, EX.chalkPink, fadeK(t, s)); chalkCircle(x, t, { x: B.x0 + 150, y: Y + 86, r: 40, at: s + 0.6, dur: 0.5, color: EX.chalkPink, width: 4 }) }
      },
      chalk: [
        { dt: 1.0, line: 0, text: '*384,000 KM*', x: 420, y: 180, size: 48, align: 'center' },
        { dt: 1.0, line: 2, text: 'YOU: *here*', x: 150, y: 390, size: 34, align: 'center', color: EX.chalkPink },
      ],
    },
    { // ✓ parallax: trees whip past, the Moon's direction barely changes
      lines: [
        ['teacher', 'trees by the road are *close*. they whip past.', { tag: SKY, point: [300, 330] }],
        ['teacher', 'i’m so far, my direction *barely changes.*', { point: [600, 140] }],
        ['student', 'so it *looks* like you’re keeping up.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 400
        chalkLine(x, t, { pts: [[B.x0 + 20, Y + 20], [B.x1 - 20, Y + 20]], at: a - 0.2, dur: 0.5, width: 5 })
        for (let i = 0; i < 4; i++) tree(x, wrap(B.x1 - (t - a) * 420 - i * 210, B.x0 + 20, B.x1 - 20), Y + 20, 0.9, fadeK(t, a))
        car(x, B.x0 + 250, Y, 1, EX.chalkPink, fadeK(t, a))
        // two car positions, two parallel sight lines up to a far Moon
        const l = b.lines[1].t
        const mx = B.x0 + 560, my = B.y0 + 90
        moonPhase(x, mx + 120, my, 36, 0.5, fadeK(t, l - 0.3))
        chalkLine(x, t, { pts: [[B.x0 + 200, Y - 30], [mx + 70, my + 30]], at: l + 0.2, dur: 0.6, color: EX.chalkYellow, width: 4, arrow: true })
        chalkLine(x, t, { pts: [[B.x0 + 330, Y - 30], [mx + 200, my + 30]], at: l + 0.7, dur: 0.6, color: EX.chalkYellow, width: 4, arrow: true })
        if (t > b.lines[2].t) chalkCircle(x, t, { x: mx + 120, y: my, r: 60, at: b.lines[2].t + 0.2, dur: 0.6, color: EX.chalkPink, width: 5 })
      },
      chalk: [{ dt: 0.8, line: 1, text: 'SAME *angle*', x: 300, y: 150, size: 40, align: 'center' }],
    },
    { // ✓ everyone in town; it rises and sets on its own schedule
      lines: [
        ['teacher', 'everyone in town sees me *follow* them.', { tag: SKY, point: [400, 260] }],
        ['student', 'wait. you’re following *everyone?*'],
        ['teacher', 'nobody. i rise and set on *my* schedule.', { point: [400, 120] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        for (let j = 0; j < 3; j++) {
          chalkLine(x, t, { pts: [[B.x0 + 40, B.y0 + 220 + j * 90], [B.x1 - 40, B.y0 + 220 + j * 90]], at: a + j * 0.15, dur: 0.4, width: 3, alpha: 0.6 })
          for (let i = 0; i < 4; i++) {
            const cx = wrap(B.x0 + 80 + i * 200 + (t - a) * (60 + j * 25) * (j % 2 ? -1 : 1), B.x0 + 60, B.x1 - 60)
            car(x, cx, B.y0 + 205 + j * 90, 0.45, [EX.chalkPink, EX.chalkBlue, EX.chalkGreen][(i + j) % 3], popK(t, a + 0.3 + (i + j) * 0.1))
            if (t > b.lines[1].t) chalkLine(x, t, { pts: [[cx, B.y0 + 190 + j * 90], [cx + 40, B.y0 + 150 + j * 90]], at: b.lines[1].t + 0.1 + i * 0.05, dur: 0.2, color: EX.chalkYellow, width: 3, arrow: true })
          }
        }
        // the Moon arcs over: rising, high, setting
        const l = b.lines[2].t
        const p = clamp(prog(t, l, l + 3.5))
        if (t > l) {
          chalkLine(x, t, { pts: Array.from({ length: 13 }, (_, i) => [B.x0 + 60 + i * 56, B.y0 + 150 - Math.sin(Math.PI * i / 12) * 100]), at: l, dur: 0.8, width: 3, dash: [8, 10], alpha: 0.7 })
          moonPhase(x, B.x0 + 60 + p * 672, B.y0 + 150 - Math.sin(Math.PI * p) * 100, 26, 0.5, 1)
        }
      },
      chalk: [{ dt: 0.9, line: 2, text: 'RISE ↗  ↘ SET', x: 400, y: 470, size: 32, align: 'center', color: EX.chalkYellow }],
    },
    { // 3 · the astrology lens
      ch: 'the astrology lens',
      lines: [
        ['teacher', 'astrologers read me as your *feelings.*', { tag: ASTRO, point: [250, 200] }],
        ['teacher', 'and *memory*: the stuff that rides along.', { point: [250, 300] }],
        ['student', 'that explains *the whole drive.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        moonPhase(x, B.x1 - 150, B.y0 + 250, 80 + 4 * Math.sin(t * 2), 0.28, popK(t, a))
      },
      chalk: [
        { dt: 0.4, line: 0, text: 'MOON =', x: 60, y: 150, size: 46 },
        { dt: 0.9, line: 0, text: '*FEELINGS*', x: 60, y: 220, size: 52 },
        { dt: 0.6, line: 1, text: '+ *MEMORY*', x: 60, y: 300, size: 52 },
        { dt: 0.8, line: 2, text: '(the café. the song.)', x: 60, y: 390, size: 30, color: EX.chalkPink },
      ],
    },
    { // 4 · what it means for love: why the ex-feeling follows you
      ch: 'what it means for love',
      lines: [
        ['teacher', 'a big feeling about an ex works the *same.*', { tag: TIP, point: [400, 240] }],
        ['teacher', 'it seems to follow you *everywhere.*', { point: [300, 300] }],
        ['student', 'the café. the song. *the car.*'],
        ['teacher', 'not because it’s chasing you. it’s *big.*', { point: [620, 220] }],
        ['teacher', 'and it’s *far*. it’s already behind you.', { point: [160, 300] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, Y = B.y0 + 300
        chalkLine(x, t, { pts: [[B.x0 + 40, Y], [B.x1 - 40, Y]], at: a, dur: 0.7, width: 5, arrow: true })
        // the three places, each with the same heart hovering above
        const L2 = b.lines[2].t
        const spots = [['CAFÉ', 160], ['SONG', 400], ['CAR', 640]]
        spots.forEach(([n, px], i) => {
          const k = popK(t, L2 + 0.2 + i * 0.4)
          if (k <= 0) return
          pixHeart(x, B.x0 + px, B.y0 + 150 + Math.sin(t * 3 + i) * 6, 7, k)
          chalkLine(x, t, { pts: [[B.x0 + px, B.y0 + 190], [B.x0 + px, Y - 8]], at: L2 + 0.3 + i * 0.4, dur: 0.3, width: 3, dash: [6, 8], color: EX.chalkPink })
        })
        // "big": one heart grows; "far": it slides off to the left, behind you
        const L3 = b.lines[3].t, L4 = b.lines[4].t
        if (t > L3) {
          const g = ease.outCubic(prog(t, L3 + 0.3, L3 + 1.4)), f = ease.inOutCubic(prog(t, L4 + 0.3, L4 + 2.0))
          pixHeart(x, lerp(B.x0 + 620, B.x0 + 90, f), lerp(B.y0 + 150, B.y0 + 140, f), lerp(7, 16, g) * lerp(1, 0.6, f), 1)
        }
      },
      chalk: [
        { dt: 0.5, line: 0, text: 'NOW →', x: 640, y: 330, size: 30, color: EX.chalkYellow },
        { dt: 1.2, line: 4, text: '← BEHIND YOU', x: 60, y: 420, size: 32, color: EX.chalkYellow },
      ],
    },
    { // ♥ what to do with it
      lines: [
        ['student', 'so i don’t have to *text it?*'],
        ['teacher', 'let it ride along. *don’t steer* toward it.', { tag: TIP, point: [300, 160] }],
        ['teacher', 'call a friend. sleep. it *sets*, like me.', { point: [300, 300] }],
        ['student', 'and it comes back *lighter?*'],
        ['teacher', 'a little lighter *every time.*', { point: [560, 380] }],
      ],
      draw(x, t, B, b) {
        const L1 = b.lines[1].t, L2 = b.lines[2].t
        const rows = [['let it ride along', L1 + 0.6, true], ['call a friend', L2 + 0.3, true], ['sleep', L2 + 0.9, true], ['text the ex at 1 AM', L1 + 1.3, false]]
        rows.forEach(([, at, ok], i) => {
          const y = B.y0 + 130 + i * 80
          if (t < at + 0.6) return
          const k = fadeK(t, at + 0.6, 0.2)
          x.save(); x.globalAlpha *= k; x.strokeStyle = ok ? EX.chalkGreen : EX.chalkPink; x.lineWidth = 6; x.lineCap = 'round'; x.beginPath()
          if (ok) { x.moveTo(B.x0 + 50, y); x.lineTo(B.x0 + 64, y + 14); x.lineTo(B.x0 + 90, y - 16) } else { x.moveTo(B.x0 + 50, y - 14); x.lineTo(B.x0 + 84, y + 16); x.moveTo(B.x0 + 84, y - 14); x.lineTo(B.x0 + 50, y + 16) }
          x.stroke(); x.restore()
        })
        // the Moon setting behind a chalk hill on the right, then a smaller, lighter heart rising
        const s = prog(t, L2 + 0.5, L2 + 3.5)
        chalkLine(x, t, { pts: [[B.x0 + 560, B.y0 + 330], [B.x0 + 660, B.y0 + 290], [B.x1 - 20, B.y0 + 320]], at: L2, dur: 0.5, width: 4 })
        if (t > L2) { x.save(); x.beginPath(); x.rect(B.x0 + 540, B.y0, 300, 310); x.clip(); moonPhase(x, B.x0 + 680, lerp(B.y0 + 150, B.y0 + 360, ease.inOutCubic(clamp(s))), 40, 0.5, 1); x.restore() }
        const L4 = b.lines[4].t
        if (t > L4) pixHeart(x, B.x0 + 680, B.y0 + 200 - 30 * ease.outCubic(prog(t, L4, L4 + 1.2)), 6, fadeK(t, L4, 0.4), '#ffadc6')
      },
      chalk: [
        { dt: 0.6, line: 1, text: 'let it ride along', x: 110, y: 130, size: 34 },
        { dt: 1.3, line: 1, text: 'text the ex at 1 AM', x: 110, y: 370, size: 34, color: EX.chalkPink },
        { dt: 0.3, line: 2, text: 'call a *friend*', x: 110, y: 210, size: 34 },
        { dt: 0.9, line: 2, text: '*sleep*', x: 110, y: 290, size: 34 },
      ],
    },
  ],
  bulb: 'so it’s not chasing me. it’s *just big.*',
  items: ['I’m *384,000 km* away', 'Far things seem to *follow*', 'Big feelings *set*, too'],
  last: 'Not following you. *Just far.*', lastWho: 'teacher',
  fx: T => {
    const at = T.beats[6].at + 0.2
    return [[loadingBar, { at, len: 2.6, label: 'texting the ex…', stallAt: 99, error: 'Error: it’s *1 AM.*', y: 880 }, loadingBarCues]]
  },
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('kxexe01: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
