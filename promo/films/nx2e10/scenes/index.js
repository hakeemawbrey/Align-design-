// nx2e10 (50 s vertical, "Star Talk Explains, Volume 2", episode 10) · story 0–45.6, then the shared end card.
//   ❓ "Why does Saturn go *backwards* every year?"  ♋ CANCER asks; ♄ SATURN teaches: ✓ it doesn't: Earth circles the
//   Sun faster and overtakes Saturn about once a year, so for a few months Saturn seems to drift back (the loop on the
//   board) · ✓ before it turns it seems to pause: a station · ✦ astrologers call it a time to review · ♥ check your plans
//   still fit, gently. The Pisces classmate cries happy tears. Last line (Saturn): "Not backwards. *Just* passed."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, EX } from '../../stexplain.js'
import { SATURN, drawSaturn } from '../../st5cast.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { sunChalk, earthChalk, disc, popK, fadeK } from '../../nx2e01/scenes/x2draw.js'

const CAN = signStar('cancer')
const SATC = '#f7dca0'
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })
const SATMOOD = { sparkle: 'happy', heart: 'happy', wink: 'happy' }

/** the apparent path against the stars: drifting right, with a backwards loop in the middle */
const LR = 185
const loopPt = (B, p) => [B.x0 + 110 + 580 * p + LR * Math.sin(2 * Math.PI * p), B.y0 + 240 + 95 * Math.cos(2 * Math.PI * p)]
const loopPts = (B, n = 60) => Array.from({ length: n + 1 }, (_, i) => loopPt(B, i / n))
// the two stations, where the apparent motion turns (dx/dp = 0)
const STAT = [Math.acos(-580 / (2 * Math.PI * LR)) / (2 * Math.PI), 1 - Math.acos(-580 / (2 * Math.PI * LR)) / (2 * Math.PI)]
function stars(x, B, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= 0.6 * k; x.fillStyle = EX.chalk
  for (let i = 0; i < 26; i++) { const X = B.x0 + 30 + ((i * 137) % 740), Y = B.y0 + 70 + ((i * 89) % 330); x.fillRect(X, Y, 4, 4) }
  x.restore()
}

const CFG = {
  id: 'nx2e10', duration: 50, key: 'Ebm',
  q: 'Why does Saturn go *backwards* every year?', qAccent: SATC,
  teacher: { tag: SATURN.tag, color: SATURN.tagColor, pitch: 440,
    draw: (ctx, X, Y, s, t, o) => { const r = drawSaturn(ctx, X, Y - 24, s * 1.15, t, { ...o, mood: SATMOOD[o.mood] || o.mood, pointer: false }); return { ...r, size: s } } },
  student: { tag: '♋ CANCER', color: CAN.color, glyph: CAN.glyph, pitch: 620 },
  boardTitle: 'RETROGRADE',
  beats: [
    { // ✓ Earth laps Saturn
      lines: [
        ['student', 'Saturn, you’re going *backwards* again?'],
        ['teacher', 'i’m not. Earth just *passes* me.', { tag: TAG('sky'), point: [250, 240] }],
        ['teacher', 'Earth laps the Sun faster than i *do.*', { point: [250, 240] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[1].t, cx = B.x0 + 250, cy = B.y0 + 245
        sunChalk(x, cx, cy, 30, t, popK(t, a))
        chalkCircle(x, t, { x: cx, y: cy, r: 80, at: a + 0.2, dur: 0.6, color: EX.chalkBlue, width: 3 })
        chalkCircle(x, t, { x: cx, y: cy, r: 180, at: a + 0.4, dur: 0.8, color: SATC, width: 3 })
        const run = Math.max(0, t - a - 1.0)
        const ge = -0.3 - run * 1.6, gs = -0.15 - run * 0.16            // Earth fast, Saturn slow
        const E = [cx + Math.cos(ge) * 80, cy + Math.sin(ge) * 80], S = [cx + Math.cos(gs) * 180, cy + Math.sin(gs) * 180]
        const k = popK(t, a + 0.9)
        // the sightline, Earth → Saturn → the background stars (right)
        if (k > 0.5) {
          const d = [S[0] - E[0], S[1] - E[1]], L = Math.hypot(...d)
          x.save(); x.beginPath(); x.rect(B.x0, B.y0 + 40, B.x1 - B.x0, B.y1 - B.y0 - 40); x.clip(); x.globalAlpha *= 0.6; x.strokeStyle = EX.chalkPink; x.lineWidth = 3; x.setLineDash([8, 8])
          x.beginPath(); x.moveTo(...E); x.lineTo(E[0] + d[0] / L * 520, E[1] + d[1] / L * 520); x.stroke(); x.restore()
        }
        earthChalk(x, E[0], E[1], 16, k)
        disc(x, S[0], S[1], 20, SATC, k, 0.6)
      },
      chalk: [{ dt: 0.6, line: 2, text: 'EARTH: *FAST*', x: 560, y: 120, size: 30 }, { dt: 1.0, line: 2, text: 'SATURN: SLOW', x: 560, y: 180, size: 30 }],
    },
    { // ✓ once a year; a few months of seeming to drift back
      lines: [
        ['teacher', 'about once a year it *overtakes* me.', { tag: TAG('sky'), point: [400, 250] }],
        ['teacher', 'for a few months i *seem* to drift back.', { point: [400, 180] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t, c = b.lines[1].t
        stars(x, B, fadeK(t, a))
        chalkLine(x, t, { pts: loopPts(B), at: a + 0.4, dur: 2.2, color: SATC, width: 5, arrow: true })
        const p = ease.inOutSine ? ease.inOutSine(prog(t, c, c + 3.5)) : prog(t, c, c + 3.5)
        const P = loopPt(B, p)
        disc(x, P[0], P[1], 18, SATC, popK(t, c), 0.8)
      },
      chalk: [{ dt: 1.2, line: 1, text: '*← BACK?*', x: 400, y: 100, size: 34, align: 'center' }],
    },
    { // ✓ the station
      lines: [
        ['teacher', 'before turning, i seem to pause: a *station.*', { tag: TAG('sky'), point: [400, 200] }],
        ['student', 'a pause before the turn. *dramatic.*'],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        stars(x, B, 1)
        chalkLine(x, t, { pts: loopPts(B), at: a - 0.3, dur: 0.5, color: SATC, width: 5, arrow: true })
        STAT.forEach((s, i) => {
          const [X, Y] = loopPt(B, s)
          chalkCircle(x, t, { x: X, y: Y, r: 30, at: a + 0.8 + i * 0.4, dur: 0.4, color: EX.chalkPink, width: 5 })
          const k = fadeK(t, a + 1.0 + i * 0.4)
          if (k > 0) { x.save(); x.globalAlpha *= k; x.fillStyle = EX.chalkPink; x.fillRect(X - 13, Y - 62, 9, 26); x.fillRect(X + 4, Y - 62, 9, 26); x.restore() }
        })
      },
      chalk: [{ dt: 1.6, line: 0, text: '*STATION*', x: 400, y: 410, size: 34, align: 'center' }],
    },
    { // ✦ review · ♥ check your plans, gently
      lines: [
        ['teacher', 'astrologers call it a time to *review.*', { tag: TAG('astro'), point: [260, 200] }],
        ['teacher', 'check your plans still fit. *gently.*', { tag: TAG('tip', 84), point: [260, 300] }],
      ],
      draw(x, t, B, b) {
        const c = b.lines[1].t
        ;['PLANS', 'PROMISES', 'PACE'].forEach((w, i) => {
          const Y = B.y0 + 160 + i * 95
          chalkLine(x, t, { pts: [[B.x0 + 60, Y - 26], [B.x0 + 112, Y - 26], [B.x0 + 112, Y + 26], [B.x0 + 60, Y + 26], [B.x0 + 60, Y - 26]], at: b.at + 0.4 + i * 0.15, dur: 0.3, width: 4 })
          chalkLine(x, t, { pts: [[B.x0 + 68, Y], [B.x0 + 84, Y + 16], [B.x0 + 110, Y - 22]], at: c + 0.6 + i * 0.45, dur: 0.25, color: EX.mint, width: 7 })
        })
      },
      chalk: [{ dt: 0.5, text: 'PLANS', x: 140, y: 175, size: 38 }, { dt: 0.65, text: 'PROMISES', x: 140, y: 270, size: 38 }, { dt: 0.8, text: 'PACE', x: 140, y: 365, size: 38 }],
    },
  ],
  bulb: 'so you’re not lost. we’re just *passing.*',
  items: ['Earth *overtakes* Saturn', 'It only *looks* like a loop', 'A good time to *review*'],
  last: 'Not backwards. *Just* passed.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e10: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void clamp
