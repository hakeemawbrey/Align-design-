// st13houses (60 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E10) · story 0–55.6, then the end card.
//   ❓ "What are the *12 houses*?"  Teacher: ♍ VIRGO (clipboard). Student: ♐ SAGITTARIUS ("do I pay rent?").
//   THE BOARD: a chart wheel cut into 12 houses with the horizon and ASC (✦ astrologers split a chart into 12 areas of
//   life; ✦ house 1 starts at the rising sign, then they count round in order), then PLANET = WHAT, SIGN = HOW,
//   HOUSE = WHERE (✦). Gag: the wheel turns into a 12-room pixel apartment building, planets in the windows.
//   Lightbulb: "so I don't pay rent. my planets do." Last line (Sagittarius): "Every planet needs a *room*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkCircle, chalkLine, EX } from '../../stexplain.js'
import { drawClipboard } from './props.js'
import { makeEpisode, R, INK, pop01 } from './classkit.js'

const VIR = signStar('virgo'), SAG = signStar('sagittarius')

const EP = makeEpisode({
  id: 'st13houses', numeral: 'S13 E10', duration: 60, key: 'D',
  q: 'What are the | *12 houses*?', qAccent: '#9fe8c8',
  teacher: { tag: '♍ VIRGO', color: VIR.color, glyph: VIR.glyph, pitch: 587,
    prop: (x, r, t, T) => { let flip = 0; for (const v of [T.M.trick, T.M.rooms]) if (t > v) flip = 1 - flip; drawClipboard(x, r.x + r.size * 0.4, r.y + r.size * 0.12, 6, { rot: 0.18, page: flip }) } },
  student: { tag: '♐ SAGITTARIUS', color: SAG.color, glyph: SAG.glyph, pitch: 698 },
  boardTitle: 'THE 12 HOUSES',
  lines: [
    ['student', 'my chart has *houses?* do I pay rent?'],
    ['teacher', 'no rent. let me *draw* it.', { mark: 'wheel' }],
    ['teacher', 'astrologers split a chart into *12 houses.*', { tag: 'astro', mark: 'twelve' }],
    ['teacher', 'each house is an *area of life.*', { mark: 'areas' }],
    ['teacher', 'house 1 starts at your *rising sign.*', { tag: 'astro', mark: 'asc' }],
    ['teacher', 'then they count round, *in order,* to 12.', { mark: 'order' }],
    ['student', 'ok. but what *goes* in them?'],
    ['teacher', 'your planets. here’s the trick:', { mark: 'trick' }],
    ['teacher', 'the planet is the *what.*', { tag: 'astro', mark: 'what' }],
    ['teacher', 'the sign is the *how.*', { mark: 'how' }],
    ['teacher', 'the house is the *where.*', { mark: 'where' }],
    ['student', 'wait. so it’s an *apartment building?*', { mark: 'apt' }],
    ['teacher', 'twelve rooms. every planet *lives* in one.', { mark: 'rooms' }],
    ['student', 'so I don’t pay rent. my *planets* do.', { bulb: true }],
  ],
  items: ['*12* areas of life', 'House 1 = your *rising*', 'What · how · *where*'],
  last: 'Every planet needs a *room*.', lastWho: 'student',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'neutral' }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 0) return [{ mood: 'squint', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (ph === 6) return [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, -1] }]
    if (ph === 11) return [{ mood: 'wide', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 12) return [{ mood: 'wink', look: [1, 0] }, { mood: 'happy', look: [-1, -1] }]
    if (ph === 13) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    if (ph === 'recap' || ph === 'last') return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [0, 0] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  chalk: M => [
    { text: '12 HOUSES =', at: M.twelve + 1.2, u: 0.54, v: 0.17, size: 34 },
    { text: '*12 AREAS OF LIFE*', at: M.areas + 0.4, u: 0.54, v: 0.27, size: 34 },
    { text: 'HOUSE 1 = *RISING*', at: M.asc + 0.9, u: 0.54, v: 0.4, size: 34 },
    { text: 'PLANET = *WHAT*', at: M.what + 0.6, u: 0.54, v: 0.6, size: 36 },
    { text: 'SIGN   = *HOW*', at: M.how + 0.5, u: 0.54, v: 0.72, size: 36 },
    { text: 'HOUSE  = *WHERE*', at: M.where + 0.5, u: 0.54, v: 0.84, size: 36 },
  ],
  board(x, t, B, M) {
    const W = B.x1 - B.x0, H = B.y1 - B.y0
    const cx = B.x0 + 0.25 * W, cy = B.y0 + 0.57 * H, r = 178
    // the wheel, fading as the building rises
    const bk = clamp(prog(t, M.apt + 0.4, M.apt + 1.4))
    const wk = 1 - bk
    if (wk > 0) {
      x.save(); x.globalAlpha *= wk
      chalkCircle(x, t, { x: cx, y: cy, r, at: M.wheel + 0.2, dur: 0.8, width: 6 })
      chalkCircle(x, t, { x: cx, y: cy, r: 64, at: M.wheel + 0.5, dur: 0.6, width: 4, color: 'rgba(244,241,232,0.6)' })
      for (let i = 0; i < 12; i++) {
        const a = Math.PI - i * Math.PI / 6
        const horizon = i === 0 || i === 6
        chalkLine(x, t, { pts: [[cx + Math.cos(a) * 64, cy + Math.sin(a) * 64], [cx + Math.cos(a) * r, cy + Math.sin(a) * r]], at: M.twelve + 0.2 + i * 0.07, dur: 0.18, width: horizon ? 6 : 4, color: horizon ? EX.chalkYellow : 'rgba(244,241,232,0.75)' })
      }
      // the horizon, extended, and ASC on the left (the eastern horizon in a chart)
      chalkLine(x, t, { pts: [[cx - r - 18, cy], [cx + r + 18, cy]], at: M.asc + 0.1, dur: 0.4, color: EX.chalkYellow, width: 6 })
      x.font = "700 24px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
      if (t > M.asc + 0.5) { x.fillStyle = EX.chalkYellow; x.fillText('ASC', cx - r + 4, cy - 22) }
      // house numbers, counted counter-clockwise from just below ASC; the count lights each one in turn
      for (let i = 0; i < 12; i++) {
        const shown = i === 0 ? t > M.asc + 0.6 : t > M.order + 0.4 + i * 0.16
        if (!shown) continue
        const a = Math.PI - (i + 0.5) * Math.PI / 6, rr = 122
        const hot = t > M.order + 0.4 + i * 0.16 && t < M.order + 0.75 + i * 0.16
        x.fillStyle = i === 0 ? EX.chalkYellow : hot ? EX.chalkPink : EX.chalk
        x.font = `700 ${hot ? 34 : 28}px 'Space Mono', monospace`
        x.fillText(String(i + 1), cx + Math.cos(a) * rr, cy + Math.sin(a) * rr + 2)
      }
      x.restore()
    }
    // the gag: a 12-room pixel apartment building (4 floors × 3 rooms), planets moving in
    if (bk > 0) {
      const bw = 300, bh = 372, bx = cx - bw / 2, by = B.y1 - 10 - bh
      const grow = ease.outBack ? ease.outBack(bk) : bk
      x.save(); x.beginPath(); x.rect(B.x0, B.y1 - 10 - bh * Math.min(1.05, grow), W * 0.5, bh * 1.1); x.clip()
      R(x, INK, bx - 6, by - 6, bw + 12, bh + 12); R(x, '#8a5a8a', bx, by, bw, bh); R(x, '#a374a3', bx, by, bw, 8)
      R(x, INK, bx + bw * 0.62, by - 46, 6, 46); R(x, EX.red, bx + bw * 0.62 - 4, by - 52, 14, 10)            // the antenna
      const PL = ['#f2c75c', '#ff86b8', '#d4532e', '#c3c8d6', '#9fdcff', '#f7dca0', '#a8f0b8', '#c9a6ff']
      for (let i = 0; i < 12; i++) {
        const col = i % 3, row = Math.floor(i / 3)          // room 1 bottom left, counting up floor by floor
        const wx = bx + 22 + col * 94, wy = by + bh - 84 - row * 88
        R(x, INK, wx - 4, wy - 4, 72, 60); R(x, '#ffe9a8', wx, wy, 64, 52); R(x, '#ffd36e', wx, wy + 40, 64, 12)
        R(x, INK, wx + 30, wy, 4, 52)
        x.font = "700 18px 'Space Mono', monospace"; x.textAlign = 'left'; x.textBaseline = 'top'; x.fillStyle = INK
        x.fillText(String(i + 1), wx + 4, wy + 2)
        // a planet peeks out of some windows (moving in on the "rooms" line)
        if ([0, 2, 4, 6, 9, 11].includes(i)) {
          const p = pop01(t, M.rooms + 0.2 + i * 0.07, 0.3, 2.4)
          if (p > 0) { const s = 22 * p, pc = PL[i % PL.length]; R(x, INK, wx + 46 - s / 2 - 3, wy + 30 - s / 2 - 3, s + 6, s + 6); R(x, pc, wx + 46 - s / 2, wy + 30 - s / 2, s, s); R(x, '#ffffff', wx + 46 - s / 2, wy + 30 - s / 2, s * 0.35, s * 0.3) }
        }
      }
      x.restore()
    }
  },
  cues: T => [
    ...Array.from({ length: 11 }, (_, i) => ['pop', +(T.M.order + 0.4 + (i + 1) * 0.16).toFixed(3), 523.25 * Math.pow(2, i / 12), 0.025, (i % 2 ? 0.2 : -0.2)]),
    ['whoosh', +(T.M.apt + 0.4).toFixed(3), 0.6, 0.04], ['snare', +(T.M.apt + 1.0).toFixed(3), { gain: 0.06, tone: 220, decay: 0.1, snappy: 0.7, rev: 0.2 }],
    ...[0, 2, 4, 6, 9, 11].map((i, k) => ['pop', +(T.M.rooms + 0.2 + i * 0.07).toFixed(3), 880 + k * 110, 0.03, 0]),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
