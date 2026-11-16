// og-khse22: social rework of khse22, ZODIAC HOT SEAT, New Year round: Capricorn. Kit: ./hotkit.js (og social copy).
// Static HOOK (outline) 0–2.9 instead of the slammed title; no whip zoom, no series bug; Capricorn at full spreadsheet.
//   0.00  Capricorn mid-unroll of a resolution scroll so long it rolls off the stage ("wake 4:15", "fun: Tue 7:05").
//   Q1 "Which one's *fun?*" → "…‘scheduled fun, 5 minutes.’"  Q2 "Which one's about *love?*" → "…that's a Q3 problem."
//   the last question (silence): "Add *one?*" → Capricorn writes it on the scroll: "let someone in."
//   THE STARS: "Resolution one: *let someone in.*"  Hard cut.
import { makeHotSeat, box, R, label, prog, ease, lerp, INK, BONE, RED, INTER, MONO } from './hotkit.js'

const LINES = ['wake 4:15', 'inbox zero/hr', 'read 104 books', 'learn 3 langs', 'fun: Tue 7:05', 'gym 9×/week', 'sleep: optional', 'rest: 2031']
function scroll(x, t, k, extra) {
  const u = ease.outCubic(prog(t, -0.8, 1.0))
  x.save(); x.globalAlpha = k
  // the paper: from the hands down over the seat and off the stage
  const len = lerp(300, 500, u)
  box(x, 200, 900, 250, len, '#f6ecd6', { b: 6 })   // og: the left side, clear of the booth and the app buttons
  LINES.forEach((l, i) => { if (30 + i * 46 < len - 10) label(x, `${i + 1}. ${l}`, 214, 930 + i * 46, { size: 19, col: INK, font: MONO, align: 'left' }) })
  box(x, 190, 880, 270, 30, '#c8a46a', { b: 5 })
  x.restore()
  if (extra > 0) { x.save(); x.translate(560, 1150); x.rotate(-0.04); x.scale(extra, extra); box(x, -230, -46, 460, 92, '#fff3d6', { b: 7 }); label(x, '1. let someone in', 0, 2, { size: 44, col: RED, font: INTER, weight: 800 }); x.restore() }
}

const EP = makeHotSeat({
  id: 'og-khse22', sign: 'capricorn', name: 'Capricorn', accent: '#8fb0d8',
  hook: 'Capricorn wrote | *147 resolutions.*',
  hero0: { x: 610, y: 1036, s: 290, mood: 'squint', look: [-1, 0.5] },
  props(x, t, S) {
    const k = 1 - ease.inOutCubic(prog(t, ...S.T.settle))
    const extra = ease.outCubic(prog(t, S.T.fa + 0.2, S.T.fa + 1.0))
    if (k > 0.01 || extra > 0) scroll(x, t, k, extra)
  },
  qs: [
    { q: 'Which one’s *fun?*', a: '…“scheduled fun, 5 minutes.”', mood: 'squint' },
    { q: 'Which one’s about *love?*', a: '…that’s a next-quarter problem.', mood: 'neutral' },
  ],
  final: { q: 'Add *one?*', a: '…okay. writing it down.', mood: 'neutral', endMood: 'happy' },
  last: 'Resolution one: *let someone in.*',
  ending: 'cut',
  music: { style: 'pop', key: 'A', seed: 3522 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void [R, BONE]

// social hook: static caption from frame 0 (the kit's slammed title is removed in ./hotkit.js)
export const HOOK = 'Capricorn wrote | *147 resolutions.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.9
