// og-n3ae07: social rework of n3ae07 (static HOOK box 0–3.5 replaces the animated caption; no bug, no end card;
// Libra never stops moving the couch). Kit: ../amkit.js (og copy of ../../n3ae01/amkit.js).
// Was: n3ae07 · 3 AM IN WINTER 7: "Libra moves the couch for a date night in" (16 s vertical, star_advice trial reel, lofi Ebm).
// Rows: promo/films/next30/b40.md. The original engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "Date night tomorrow. | *Libra* is redecorating."  A little couch slides left and right with each thought; fourteen candles pop up along the floor.
//   1.5 / 3.6 / 5.7   thoughts: couch *here*? · no… *there*. · candles: 1, 2, 3… *14*.
//   7.5    beat change. THE STARS in the window: "They're coming to see *you*, not the couch."
//   ~10.4  last line: "They're coming for *you*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK, lerp, ease, prog } from '../amkit.js'

export const HOOK = '3 AM. *Libra* is still | moving the *couch.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

const AM = makeAM({
  sign: 'libra',
  caption: "Date night tomorrow. | *Libra* is redecorating.", captionAccent: '#f0a0ff',
  thoughts: ["couch *here*? (try eleven)", "no. back. no… *THERE.*", "14 candles. *not enough?*"],
  line: "They're coming to see *you*, not the couch.",
  last: "They're coming for *you*.", lastAccent: '#f0a0ff',
  me: { x: 300, y: 1228, s: 250 },
  under(x, t, W) {
    const { T } = W

    // og: the couch never stops moving: a new spot every 0.6 s from the first thought until the beat change
    const cxs = [600, 520, 620, 540, 610, 500, 620, 560, 615, 530, 590]   // og: stays left of the nightstand clock
    const AT = Array.from({ length: cxs.length - 1 }, (_, i) => T.th[0] + i * 0.6)
    let seg = 0; AT.forEach((v, i) => { if (t >= v) seg = i + 1 })
    seg = Math.min(seg, cxs.length - 1)
    const from = cxs[Math.max(0, seg - 1)], to = cxs[seg], at = seg ? AT[seg - 1] : 0
    const cx = lerp(from, to, ease.inOutCubic(prog(t, at, at + 0.4)))
    R(x, INK, cx - 90, 1300, 180, 110); R(x, '#d070c8', cx - 84, 1306, 168, 60); R(x, '#b058a8', cx - 84, 1360, 168, 44)
    R(x, INK, cx - 104, 1330, 28, 80); R(x, INK, cx + 76, 1330, 28, 80); R(x, '#e090d8', cx - 100, 1334, 20, 72); R(x, '#e090d8', cx + 80, 1334, 20, 72)
  },
  over(x, t, W) {
    const { T } = W

    // fourteen candles along the floor
    const n = t < T.th[2] ? 0 : Math.min(14, Math.floor((t - T.th[2]) * 9) + 1)
    for (let i = 0; i < n; i++) {
      const u = 70 + i * 68, v = 1455   // og: on the front of the floor (drawn OG_DY lower), above the caption band
      R(x, INK, u - 12, v - 34, 24, 50); R(x, '#fff3d8', u - 8, v - 30, 16, 42)
      const f = 0.8 + 0.2 * Math.sin(t * 12 + i)
      R(x, '#ffb84a', u - 5, v - 50 * f, 10, 16 * f); R(x, '#fff2a8', u - 2, v - 44 * f, 4, 8)
    }
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
