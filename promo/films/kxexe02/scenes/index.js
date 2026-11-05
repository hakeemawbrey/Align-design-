// kxexe02 · STAR TALK EXPLAINS: EXTENDED, ep 2 (118 s vertical, star_advice) · rows: promo/films/month2/m46.md
//   ❓ "Is the Moon *leaving* us?"   ♊ GEMINI (whose best friend slowly stopped replying) asks; ♄ SATURN teaches.
//   frame 0: Gemini mid-scream, grabbing at a Moon on a string that stretches away (caught circle on the knot).
//   2 what's really happening: ✓ about 3.8 cm farther each year, roughly as fast as fingernails grow · ✓ mirrors left on
//   the Moon in 1969 bounce lasers back · ✓ tides: Earth's spin drags the tidal bulge ahead, it tugs the Moon into a
//   slightly wider orbit · ✓ Earth's day lengthens a tiny bit; it isn't going anywhere soon · 3 ✦ the Moon as safe places ·
//   4 ♥ friendships drift by centimetres, not fights; the pull back is small: one text (the reply pops).
//   Pisces (classmate) cries. Hard cut on "Drifting is slow. *Texting is fast.*"
// Engine: ../../kxexe01/scenes/xxkit.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { SATURN, drawSaturn } from '../../st5cast.js'
import { earthChalk, moonPhase, disc, pixHeart, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'
import { notification, notificationCues } from '../../hookkit.js'
import { makeEpisode, checkLengths, R, INK } from '../../kxexe01/scenes/xxkit.js'

const GEM = signStar('gemini')
const MOONC = '#e9e4ff', SATC = '#f7dca0'
const TAG = k => ({ kind: k, dx: 800, dy: 14, align: 'right' })
const SATMOOD = { sparkle: 'happy', heart: 'happy', wink: 'happy' }

/** a chalk phone with message bubbles: rows [{ at, text, me }] */
function phone(x, t, cx, cy, rows, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  x.strokeStyle = EX.chalk; x.lineWidth = 5; x.shadowColor = EX.chalk; x.shadowBlur = 6
  x.beginPath(); x.roundRect(cx - 130, cy - 200, 260, 400, 28); x.stroke()
  x.font = "700 22px 'Space Mono', monospace"; x.textBaseline = 'middle'
  rows.forEach((r, i) => {
    const k = popK(t, r.at)
    if (k <= 0) return
    const y = cy - 140 + i * 80
    x.save(); x.translate(r.me ? cx + 100 : cx - 100, y); x.scale(k, k)
    const w = Math.min(220, x.measureText(r.text).width + 30)
    x.fillStyle = r.me ? 'rgba(159,220,255,0.35)' : 'rgba(255,173,198,0.35)'; x.strokeStyle = r.me ? EX.chalkBlue : EX.chalkPink
    x.beginPath(); x.roundRect(r.me ? -w : 0, -24, w, 48, 18); x.fill(); x.stroke()
    x.fillStyle = EX.chalk; x.textAlign = r.me ? 'right' : 'left'; x.shadowBlur = 0
    x.fillText(r.typing ? '•'.repeat(1 + Math.floor(t * 4) % 3) : r.text, r.me ? -14 : 14, 2)
    x.restore()
  })
  x.restore()
}

/** frame 0: a Moon on a string, the string stretching as it drifts up and away */
function hook(x, t, T, rs) {
  const mx = 700 + 30 * Math.sin(t * 1.3), my = 640 - 40 * t
  x.save()
  x.strokeStyle = '#efe6d6'; x.lineWidth = 5; x.setLineDash([2, 0])
  x.beginPath(); x.moveTo(rs.x + 40, rs.top + 30); x.quadraticCurveTo(620, 900, mx, my + 70); x.stroke()
  x.shadowColor = '#bcd2ff'; x.shadowBlur = 50; x.fillStyle = MOONC
  x.beginPath(); x.arc(mx, my, 92, 0, Math.PI * 2); x.fill(); x.shadowBlur = 0
  x.fillStyle = 'rgba(160,150,210,0.55)'; [[-30, -20, 18], [26, 22, 12], [10, -40, 9]].forEach(([dx, dy, r]) => { x.beginPath(); x.arc(mx + dx, my + dy, r, 0, Math.PI * 2); x.fill() })
  // a "bye" wave from the Moon, a measuring tape unspooling
  x.font = "800 44px Inter, 'Helvetica Neue', Arial, sans-serif"; x.textAlign = 'center'; x.fillStyle = '#bcd2ff'
  x.fillText('bye?', mx - 150, my - 40)
  x.restore()
}

const CFG = {
  id: 'kxexe02', duration: 118, key: 'Bb',
  q: 'Is the Moon *leaving* us?', qAccent: '#bcd2ff',
  premise: 'me and my best friend, *slowly.*',
  caught: { x: 700, y: 620, r: 130, label: 'IT’S DRIFTING', arrow: 'bl' },
  promise: 'wait for chapter 4',
  scream: 'NO WAIT!',
  hook,
  teacher: { tag: SATURN.tag, color: SATURN.tagColor, pitch: 440,
    draw: (ctx, X, Y, s, t, o) => { const r = drawSaturn(ctx, X, Y - 24, s * 1.15, t, { ...o, mood: SATMOOD[o.mood] || o.mood, pointer: false }); return { ...r, size: s } } },
  student: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 740 },
  boardTitle: 'IS THE MOON LEAVING?',
  music: { style: 'lofi', seed: 4621 },
  beats: [
    { // 1 · the question
      lines: [
        ['student', 'my best friend and i just… *drifted.*'],
        ['student', 'no fight. we just *stopped* texting.'],
        ['teacher', 'that’s exactly what the *Moon* is doing.', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, gap = 60 + (t - a) * 18
        pixHeart(x, B.x0 + 400 - gap, B.y0 + 240, 8, popK(t, a), '#9fdcff')
        pixHeart(x, B.x0 + 400 + gap, B.y0 + 240, 8, popK(t, a + 0.3), '#ffadc6')
        chalkLine(x, t, { pts: [[B.x0 + 400 - gap + 40, B.y0 + 320], [B.x0 + 400 + gap - 40, B.y0 + 320]], at: b.lines[1].t, dur: 0.4, width: 3, dash: [8, 10] })
      },
      chalk: [
        { dt: 0.6, line: 0, text: 'ME', x: 160, y: 360, size: 36, align: 'center' },
        { dt: 0.9, line: 0, text: 'BESTIE', x: 640, y: 360, size: 36, align: 'center' },
        { dt: 0.6, line: 1, text: 'no fight?', x: 400, y: 120, size: 38, align: 'center', color: EX.chalkPink },
      ],
    },
    { // 2 · what's really happening: 3.8 cm a year
      ch: 'what’s really happening',
      lines: [
        ['teacher', 'the Moon moves about *3.8 cm* farther a year.', { tag: TAG('sky'), point: [560, 240] }],
        ['teacher', 'roughly as fast as your *fingernails* grow.', { point: [300, 340] }],
        ['student', 'so slow nobody would *even notice.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 230, cy = B.y0 + 250
        earthChalk(x, cx, cy, 52, popK(t, a))
        const r = 300 + 10 * clamp(prog(t, a + 0.8, a + 6))
        chalkCircle(x, t, { x: cx, y: cy, r: 300, at: a + 0.2, dur: 0.9, width: 3, color: EX.chalkBlue, from: -0.6, sweep: 1.2 })
        moonPhase(x, cx + r, cy, 26, 0.5, popK(t, a + 0.5))
        // a tiny ruler between the old and new position
        if (t > a + 1.5) chalkLine(x, t, { pts: [[cx + 300, cy + 50], [cx + r + 8, cy + 50]], at: a + 1.5, dur: 0.4, width: 4, color: EX.chalkYellow, arrow: true })
        const l = b.lines[1].t
        if (t > l) { x.save(); x.globalAlpha *= fadeK(t, l + 0.4); x.strokeStyle = EX.chalkPink; x.lineWidth = 5; x.beginPath(); x.ellipse(B.x0 + 190, B.y0 + 410, 24, 34, 0, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(B.x0 + 168, B.y0 + 395); x.lineTo(B.x0 + 212, B.y0 + 395); x.stroke(); x.restore() }
      },
      chalk: [
        { dt: 1.4, line: 0, text: '*3.8 cm* / year', x: 560, y: 360, size: 38, align: 'center' },
        { dt: 0.6, line: 1, text: '= a fingernail', x: 250, y: 410, size: 32 },
      ],
    },
    { // ✓ the mirrors and the lasers
      lines: [
        ['teacher', 'people left *mirrors* on the Moon in 1969.', { tag: TAG('sky'), point: [640, 240] }],
        ['teacher', 'we bounce *lasers* off them and time it.', { point: [400, 240] }],
        ['student', 'space has a *read receipt?*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, ex = B.x0 + 110, mx = B.x1 - 110, y = B.y0 + 250
        earthChalk(x, ex, y, 56, popK(t, a))
        moonPhase(x, mx, y, 54, 0.5, popK(t, a + 0.2))
        if (t > a + 0.8) { const k = popK(t, a + 0.8); x.save(); x.globalAlpha *= k; x.strokeStyle = EX.chalkYellow; x.lineWidth = 4; x.strokeRect(mx - 18, y - 16, 30, 30); x.restore() }
        const l = b.lines[1].t
        if (t > l + 0.2) {
          chalkLine(x, t, { pts: [[ex + 56, y], [mx - 54, y]], at: l + 0.2, dur: 0.4, width: 2, color: '#ff5c8a', dash: [6, 10] })
          const ph = ((t - l - 0.2) * 0.7) % 1, p = ph < 0.5 ? ph * 2 : 2 - ph * 2
          disc(x, lerp(ex + 60, mx - 60, p), y, 10, '#ff5c8a', 1, 0.9)
        }
        const s = b.lines[2].t
        if (t > s) chalkLine(x, t, { pts: [[mx - 40, y + 70], [mx - 28, y + 84], [mx - 6, y + 62]], at: s + 0.5, dur: 0.3, width: 5, color: EX.chalkGreen })
      },
      chalk: [
        { dt: 1.0, line: 0, text: 'MIRROR', x: 690, y: 360, size: 30, align: 'center', color: EX.chalkYellow },
        { dt: 1.0, line: 1, text: 'there… and back', x: 400, y: 160, size: 34, align: 'center' },
        { dt: 0.6, line: 2, text: 'READ ✓', x: 690, y: 420, size: 30, align: 'center', color: EX.chalkGreen },
      ],
    },
    { // ✓ why: tides
      lines: [
        ['teacher', 'why? *tides.* the Moon pulls the oceans.', { tag: TAG('sky'), point: [250, 250] }],
        ['teacher', 'Earth’s spin drags that bulge *a bit ahead.*', { point: [250, 190] }],
        ['teacher', 'the bulge tugs the Moon into a *wider* orbit.', { point: [620, 180] }],
        ['student', 'so it’s nobody’s *fault.* it’s physics.'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 250, cy = B.y0 + 260
        const lead = 0.38 * ease.inOutCubic(prog(t, b.lines[1].t + 0.3, b.lines[1].t + 1.6))
        if (t > a) { x.save(); x.globalAlpha *= fadeK(t, a + 0.3); x.translate(cx, cy); x.rotate(-lead); x.fillStyle = 'rgba(159,220,255,0.25)'; x.strokeStyle = EX.chalkBlue; x.lineWidth = 4; x.beginPath(); x.ellipse(0, 0, 112, 78, 0, 0, Math.PI * 2); x.fill(); x.stroke(); x.restore() }
        earthChalk(x, cx, cy, 60, popK(t, a))
        // the spin arrow
        chalkCircle(x, t, { x: cx, y: cy, r: 132, at: b.lines[1].t, dur: 0.8, width: 4, color: EX.chalkYellow, from: 0.4, sweep: -1.6 })
        const l2 = b.lines[2].t
        const grow = 40 * ease.outCubic(prog(t, l2 + 0.6, l2 + 3))
        const mx = B.x0 + 600 + grow * 0.6, my = B.y0 + 150 - grow * 0.4
        moonPhase(x, mx, my, 30, 0.5, popK(t, a + 0.4))
        if (t > l2) chalkLine(x, t, { pts: [[mx + 10, my - 40], [mx + 90, my - 90]], at: l2 + 0.2, dur: 0.4, width: 5, color: EX.chalkPink, arrow: true })
      },
      chalk: [
        { dt: 0.8, line: 0, text: 'OCEAN *BULGE*', x: 250, y: 440, size: 32, align: 'center', color: EX.chalkBlue },
        { dt: 0.7, line: 2, text: 'TUG →', x: 640, y: 290, size: 36, align: 'center', color: EX.chalkPink },
        { dt: 0.6, line: 3, text: 'NO FAULT', x: 620, y: 420, size: 40, align: 'center', color: EX.chalkGreen },
      ],
    },
    { // ✓ slow, and the day gets a tiny bit longer
      lines: [
        ['teacher', 'it’s not going anywhere *soon.* promise.', { tag: TAG('sky'), point: [220, 240] }],
        ['teacher', 'and Earth’s day gets *a tiny bit* longer.', { point: [560, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, cx = B.x0 + 220, cy = B.y0 + 240
        // a slow spiral path for the Moon
        chalkLine(x, t, { pts: Array.from({ length: 60 }, (_, i) => { const g = i * 0.21, r = 70 + i * 1.6; return [cx + Math.cos(g) * r, cy + Math.sin(g) * r * 0.8] }), at: a + 0.2, dur: 1.4, width: 3, color: EX.chalkBlue })
        earthChalk(x, cx, cy, 34, popK(t, a))
        const l = b.lines[1].t, k = popK(t, l)
        if (k > 0) {
          const ccx = B.x0 + 580, ccy = B.y0 + 230
          x.save(); x.globalAlpha *= k; x.strokeStyle = EX.chalk; x.lineWidth = 5; x.beginPath(); x.arc(ccx, ccy, 90, 0, Math.PI * 2); x.stroke()
          const g = (t - l) * 2.4; x.beginPath(); x.moveTo(ccx, ccy); x.lineTo(ccx + Math.cos(g) * 70, ccy + Math.sin(g) * 70); x.stroke(); x.restore()
        }
      },
      chalk: [
        { dt: 1.4, line: 1, text: '24 h + *a sliver*', x: 580, y: 400, size: 34, align: 'center' },
        { dt: 1.6, line: 0, text: 'slow. *very* slow.', x: 220, y: 440, size: 32, align: 'center', color: EX.chalkYellow },
      ],
    },
    { // 3 · the astrology lens
      ch: 'the astrology lens',
      lines: [
        ['teacher', 'astrologers read the Moon as *safe places.*', { tag: TAG('astro'), point: [250, 200] }],
        ['teacher', 'home. old friends. the *people* you call.', { point: [250, 320] }],
        ['student', 'she was my *safe place.* since forever.'],
      ],
      draw(x, t, B, b) { moonPhase(x, B.x1 - 150, B.y0 + 250, 82 + 4 * Math.sin(t * 2), 0.3, popK(t, b.lines[0].t)) },
      chalk: [
        { dt: 0.4, line: 0, text: 'MOON =', x: 60, y: 140, size: 46 },
        { dt: 0.9, line: 0, text: '*SAFE PLACES*', x: 60, y: 210, size: 50 },
        { dt: 0.5, line: 1, text: 'home · old friends', x: 60, y: 300, size: 34 },
        { dt: 1.4, line: 1, text: '· your *people*', x: 60, y: 360, size: 34 },
      ],
    },
    { // 4 · what it means for friendship
      ch: 'what it means for love',
      lines: [
        ['teacher', 'friendships drift by *centimetres*, not fights.', { tag: TAG('tip'), point: [400, 240] }],
        ['teacher', 'nobody did anything *wrong.*', { point: [400, 300] }],
        ['student', 'then how do you *un-drift?*'],
        ['teacher', 'the pull back is small too: *one text.*', { point: [400, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, L3 = b.lines[3].t
        const back = ease.inOutCubic(prog(t, L3 + 0.8, L3 + 2.6))
        const gap = lerp(80 + clamp(prog(t, a, L3)) * 170, 70, back)
        pixHeart(x, B.x0 + 400 - gap, B.y0 + 200, 9, popK(t, a), '#9fdcff')
        pixHeart(x, B.x0 + 400 + gap, B.y0 + 200, 9, popK(t, a + 0.2), '#ffadc6')
        // centimetre ticks under them
        for (let i = 0; i < 9; i++) { const k = fadeK(t, a + 0.6 + i * 0.25); if (k > 0) R(x, EX.chalk, B.x0 + 160 + i * 60, B.y0 + 300, 4, 20 + (i % 2) * 14) }
        if (t > L3) chalkLine(x, t, { pts: [[B.x0 + 400 - gap + 50, B.y0 + 200], [B.x0 + 400 + gap - 50, B.y0 + 200]], at: L3 + 0.3, dur: 0.5, width: 4, color: EX.chalkYellow, dash: [10, 10] })
      },
      chalk: [
        { dt: 1.0, line: 0, text: '1 cm… 2 cm… 3 cm…', x: 400, y: 390, size: 32, align: 'center' },
        { dt: 0.4, line: 1, text: 'NO VILLAIN', x: 400, y: 100, size: 40, align: 'center', color: EX.chalkGreen },
        { dt: 0.9, line: 3, text: '*ONE TEXT*', x: 400, y: 440, size: 44, align: 'center' },
      ],
    },
    { // ♥ the text, sent
      lines: [
        ['student', 'what do i even *say* after a year?'],
        ['teacher', 'try: “saw this and *thought of you.*”', { tag: TAG('tip'), point: [400, 200] }],
        ['student', 'sent. oh no. oh no. *it’s typing.*'],
        ['teacher', 'see? a *small* pull. a big difference.', { point: [400, 300] }],
        ['student', 'she said “I MISSED YOU.” *in caps.*'],
      ],
      draw(x, t, B, b) {
        const L1 = b.lines[1].t, L2 = b.lines[2].t, L4 = b.lines[4].t
        phone(x, t, B.x0 + 400, B.y0 + 250, [
          { at: L1 + 1.0, text: 'thought of you!', me: true },
          { at: L2 + 0.8, text: '', typing: true, me: false },
          { at: L4 + 0.2, text: 'I MISSED YOU!!', me: false },
        ], fadeK(t, b.lines[0].t))
        if (t > L4) for (let i = 0; i < 6; i++) { const ph = ((t - L4) * 0.6 + i / 6) % 1; pixHeart(x, B.x0 + 400 + Math.sin(i * 2.1) * 240, B.y0 + 420 - ph * 300, 4, 1 - ph) }
      },
    },
  ],
  bulb: 'so drifting’s slow, and coming back is *fast.*',
  items: ['Moon: *3.8 cm* a year', 'Tides *nudge* it out', 'One text *pulls* back'],
  last: 'Drifting is slow. *Texting is fast.*', lastWho: 'teacher',
  fx: T => {
    const b = T.beats[7], at = b.lines[4].t - 0.4
    return [[notification, { at, out: [at + 2.6, at + 2.9], title: 'texts', body: 'bestie: I MISSED *YOU!!*', glyph: GEM.glyph, time: 'now' }, notificationCues]]
  },
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('kxexe02: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.MUSIC
export const T = EP.T
