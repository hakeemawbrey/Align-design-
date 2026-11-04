// nx2e11 (55 s vertical, "Star Talk Explains, Volume 2", episode 11) · story 0–50.6, then the shared end card.
//   ❓ "How do 12 signs fit in *one grid*?"  ♊ GEMINI asks; ♑ CAPRICORN teaches: ✦ 4 elements × 3 modalities = 12; the
//   grid fills row by row (cardinal Aries, Capricorn, Libra, Cancer · fixed Leo, Taurus, Aquarius, Scorpio · mutable
//   Sagittarius, Virgo, Gemini, Pisces) · ✦ no two signs share both · ♥ same element, different mode can mean a different
//   pace: ask about pace, don't guess it. The Pisces classmate cries happy tears.
//   Last line (Capricorn): "Twelve signs. Twelve *combos*."
// Engine: ../../nx2e01/scenes/x2kit.js · drawings: ../../nx2e01/scenes/x2draw.js. Pure f(t).
import { signStar } from '../../startalk.js'
import { chalkLine, chalkCircle, chalkText, EX } from '../../stexplain.js'
import { makeEpisode, checkLengths } from '../../nx2e01/scenes/x2kit.js'
import { popK } from '../../nx2e01/scenes/x2draw.js'

const GEM = signStar('gemini'), CAP = signStar('capricorn')
const TAG = (k, dy = 14) => ({ kind: k, dx: 800, dy, align: 'right' })
const COLS = [['FIRE', '#ff9a6a'], ['EARTH', EX.chalkGreen], ['AIR', EX.chalkYellow], ['WATER', EX.chalkBlue]]
const ROWS = [['CARD.', ['ARIES', 'CAP', 'LIBRA', 'CANCER']], ['FIXED', ['LEO', 'TAURUS', 'AQUA', 'SCORPIO']], ['MUT.', ['SAG', 'VIRGO', 'GEMINI', 'PISCES']]]
const GX = 150, CW = 160, GY = 120, RH = 92

/** the grid: lines + headers from `at`; row r's cells written from rows[r] (null = not yet) */
function grid(x, t, B, at, rows, fast = false) {
  const d = fast ? 0.15 : 0.5
  for (let c = 0; c <= 4; c++) chalkLine(x, t, { pts: [[B.x0 + GX + c * CW, B.y0 + GY - 46], [B.x0 + GX + c * CW, B.y0 + GY + 3 * RH]], at: at + c * 0.05, dur: d, width: 2, alpha: 0.6 })
  for (let r = 0; r <= 3; r++) chalkLine(x, t, { pts: [[B.x0 + 10, B.y0 + GY + r * RH], [B.x0 + GX + 4 * CW, B.y0 + GY + r * RH]], at: at + 0.2 + r * 0.05, dur: d, width: 2, alpha: 0.6 })
  COLS.forEach(([n, col], c) => chalkText(x, t, { text: n, x: B.x0 + GX + c * CW + CW / 2, y: B.y0 + GY - 30, at: at + (fast ? 0 : 0.4 + c * 0.2), size: 26, align: 'center', color: col, cps: fast ? 200 : 26 }))
  ROWS.forEach(([n, cells], r) => {
    chalkText(x, t, { text: n, x: B.x0 + 16, y: B.y0 + GY + r * RH + 56, at: at + (fast ? 0 : 0.8 + r * 0.2), size: 24, cps: fast ? 200 : 26 })
    if (rows[r] == null) return
    cells.forEach((s, c) => chalkText(x, t, { text: s, x: B.x0 + GX + c * CW + CW / 2, y: B.y0 + GY + r * RH + 58, at: rows[r] + (fast ? 0 : c * 0.35), size: 30, align: 'center', color: COLS[c][1], cps: fast ? 200 : 26 }))
  })
}

const CFG = {
  id: 'nx2e11', duration: 55, key: 'D',
  q: 'How do 12 signs fit in *one grid?*', qAccent: EX.chalkGreen,
  teacher: { tag: '♑ CAPRICORN', color: CAP.color, glyph: CAP.glyph, pitch: 466 },
  student: { tag: '♊ GEMINI', color: GEM.color, glyph: GEM.glyph, pitch: 760 },
  boardTitle: 'THE GRID',
  beats: [
    { // ✦ 4 × 3 = 12, filled row by row
      lines: [
        ['student', '12 signs, 4 elements, 3 modes… *math?*'],
        ['teacher', '4 elements times 3 modes makes *12.*', { tag: TAG('astro'), point: [400, 120] }],
        ['teacher', 'cardinal row: Aries, Capricorn, Libra, *Cancer.*', { point: [400, 180] }],
        ['teacher', 'fixed row: Leo, Taurus, Aquarius, *Scorpio.*', { point: [400, 270] }],
        ['teacher', 'mutable row: Sag, Virgo, Gemini, *Pisces.*', { point: [400, 360] }],
      ],
      draw(x, t, B, b) {
        grid(x, t, B, b.lines[1].t, [b.lines[2].t + 0.4, b.lines[3].t + 0.4, b.lines[4].t + 0.4])
      },
    },
    { // ✦ no two share both
      lines: [
        ['teacher', 'no two signs share *both.* each is one combo.', { tag: TAG('astro'), point: [600, 360] }],
        ['student', 'so i’m mutable air. *the* original combo.'],
      ],
      draw(x, t, B, b) {
        grid(x, t, B, b.at, [b.at, b.at, b.at], true)
        const a = b.lines[1].t
        chalkCircle(x, t, { x: B.x0 + GX + 2 * CW + CW / 2, y: B.y0 + GY + 2 * RH + 46, r: 62, at: a + 0.5, dur: 0.5, color: EX.chalkPink, width: 6 })
      },
    },
    { // ♥ different pace
      lines: [
        ['teacher', 'same element, different mode: different *pace.*', { tag: TAG('tip'), point: [400, 200] }],
        ['teacher', 'so ask about pace. don’t *guess* it.', { point: [400, 360] }],
      ],
      draw(x, t, B, b) {
        const a = b.lines[0].t
        chalkLine(x, t, { pts: [[B.x0 + 80, B.y0 + 150], [B.x0 + 700, B.y0 + 150]], at: a + 0.4, dur: 0.5, color: '#ff9a6a', width: 8, arrow: true })
        chalkLine(x, t, { pts: [[B.x0 + 80, B.y0 + 250], [B.x0 + 400, B.y0 + 250]], at: a + 0.9, dur: 1.2, color: '#ff9a6a', width: 8, arrow: true })
        const k = popK(t, b.lines[1].t + 0.4)
        if (k > 0) { x.save(); x.globalAlpha *= Math.min(1, k); chalkText(x, t, { text: '“WHAT PACE *FEELS GOOD?*”', x: B.x0 + 400, y: B.y0 + 380, at: b.lines[1].t + 0.4, size: 34, align: 'center' }); x.restore() }
      },
      chalk: [{ dt: 0.6, line: 0, text: 'FAST', x: 720, y: 165, size: 28 }, { dt: 1.4, line: 0, text: 'STEADY', x: 420, y: 265, size: 28 }],
    },
  ],
  bulb: 'so every sign’s a *combo meal.*',
  items: ['4 elements × *3 modes*', 'Each sign: *one* combo', 'Ask about *pace*'],
  last: 'Twelve signs. Twelve *combos*.', lastWho: 'teacher',
}
const bad = checkLengths(CFG)
if (bad.length) throw new Error('nx2e11: too long: ' + bad.join(' | '))
const EP = makeEpisode(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
