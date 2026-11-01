// trromehome: MY ROMAN EMPIRE, "Text me when you get home." (20 s vertical, Star Talk Trends §7.3, music: cinematic · Ebm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./rome.js (identical in all five episodes).
//   0.0–3.7   "What's your | *Roman Empire?*"  Columns rise; ♋ Cancer (laurel wreath) stands on a plinth and dreams.
//   3.9–7.4   "“Text me when | you get *home.*”"  On the drop a marble TEXT BUBBLE booms up, the words carved inside
//             it; the pedestal reads THEY WORRIED. / ABOUT ME · DATE ONE. Cancer clutches its little phone to its heart.
//   7.5–11.0  "Every. *Single.* | Day."  Cancer now reports in, always: 6:10 PM home from work: *texted them*
//             · 9:40 PM back from the store: *texted them* · 3:00 AM got up for water: “*home!*” (never left).
//             Each sticker pops a tiny "home!" bubble off the phone.
//  11.2       card cut.
//  11.3–13.4 "Home *safe.*"  ♋ CANCER: "someone wanted me home *safe*. me!"
//  13.45–15.5 "*Home*, apparently."  Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, drawBits, carved, POS, INTER, pop01, outK } from './rome.js'

// a marble chat bubble (tail bottom-left)
function bubble(w, h) {
  const rows = []
  for (let j = 0; j < h; j++) {
    let r = ''
    for (let i = 0; i < w; i++) {
      const cx = Math.min(i, w - 1 - i), cy = Math.min(j, h - 1 - j)
      if (cx + cy < 2) { r += '.'; continue }
      r += (cx === 0 || cy === 0 || cx + cy === 2) ? 'm' : (j === 1 && i > 2 && i < w - 3 ? 'W' : 'M')
    }
    rows.push(r)
  }
  const pad = s => s.padEnd(w, '.')
  rows.push(pad('...mMMm'), pad('..mMm'), pad('.mm'))
  return rows
}
const STATUE = bubble(27, 11)
const CELL = 12
// Cancer's little phone (sprite cells)
const PHONE = ['kkkkk', 'kSSSk', 'kSSSk', 'kSSSk', 'kkGkk']

const EP = makeEpisode({
  id: 'trromehome', key: 'Ebm', seed: 703,
  hero: { sign: 'cancer', lineColor: '#bfe3ff' },
  h1: '“Text me when | you get *home.*”', h1Accent: '#bfe3ff', h1Late: 1,
  h3: 'Home *safe.*', h3Accent: '#bfe3ff',
  last: '*Home*, apparently.', lastLate: 2, lastAccent: GOLD,
  mon: { bits: STATUE, cell: CELL, inscription: ['THEY WORRIED.', 'ABOUT ME · DATE ONE'], size1: 32, size2: 24, dy: 4 },
  monDraw(x, t, T) {
    // the words, carved inside the bubble (with the inscription's chisel timing, a beat earlier)
    const h = STATUE.length * CELL, top = POS.mon.pedTop - h - 6 + 4
    const f = Math.min(1, Math.max(0, (t - T.land - 0.05) / 0.9))
    carved(x, 'TEXT ME WHEN', POS.mon.cx, top + 44, { size: 34, maxW: 270, frac: Math.min(1, f * 2) })
    carved(x, 'YOU GET HOME.', POS.mon.cx, top + 92, { size: 34, maxW: 270, frac: Math.max(0, f * 2 - 1) })
  },
  stickers: [
    { time: '6:10 PM', text: 'home from work: *texted them*' },
    { time: '9:40 PM', text: 'back from the store: *texted them*' },
    { time: '3:00 AM', text: 'got up for water: “*home!*”' },
  ],
  line: { who: 'hero', text: 'someone wanted me home *safe*. me!' },
  moods(ph, t, T) {
    if (ph === 'mon' && t > 5.9) return { mood: 'sparkle', look: [0, -1] }
    if (ph === 'daily' && t > T.stk[2]) return { mood: 'happy' }
    if (ph === 'twist') return t > T.lineDone ? { mood: 'sparkle', look: [0, 0] } : { mood: 'happy' }
    return null
  },
  front(x, t, T, ctx) {
    if (!ctx.hero || t < 5.9 || t > T.out[1]) return
    const F = ctx.hero.F
    const k = pop01(t, 5.9, 0.3, 2) * outK(t, T.out)
    // the little phone, held to the heart (mon) then out front (daily)
    const daily = t > T.h2 - 0.2
    const px = F.ox + (daily ? F.S * 0.44 : F.S * 0.18), py = F.oy - F.S * (daily ? 0.42 : 0.36)
    drawBits(x, PHONE, { k: '#3a2f63', S: '#9fdcff', G: GOLD }, px, py, 9 * k, { rot: daily ? 0.15 : -0.1 })
    // heart pulses over it while it's held close
    if (!daily && t > 6.1) { const b = 1 + 0.15 * Math.sin(t * 9); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff5d8f' }, px + 30, py - 70, 6 * b * k) }
    // a tiny "home!" bubble off the phone on every sticker
    if (daily) for (const s of T.stk) {
      const p = t - s
      if (p < 0 || p > 0.9) continue
      const a = 1 - Math.max(0, (p - 0.6) / 0.3)
      x.save(); x.globalAlpha = a; x.translate(px + 40, py - 70 - p * 60); x.scale(Math.min(1, p * 5), Math.min(1, p * 5))
      x.font = `800 30px ${INTER}`; const w = x.measureText('home!').width + 28
      R(x, INK, -w / 2 - 4, -26, w + 8, 52); R(x, '#7fd0ff', -w / 2, -22, w, 44)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('home!', 0, 1)
      x.restore()
    }
    void BONE
  },
  cues: T => [
    ['pluck', 6.1, 523.25, 0.03, 0.3, 0.2], ['pluck', 6.5, 659.25, 0.03, 0.3, 0.2],
    ...T.stk.map(s => ['pop', +(s + 0.12).toFixed(3), 1975.53, 0.03, 0.35]),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
