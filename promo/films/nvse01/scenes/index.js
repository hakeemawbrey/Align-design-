// nvse01: SIGN VS SIGN, "Who handles a late date better?" ♈ Aries vs ♉ Taurus (16 s vertical trial reel,
// promo/films/next30/b46.md, music: chiptune · A). Story 0–13.6, then the short end card. The format lives in ./versuskit.js.
//   0.0–2.6    hook: "Who handles | a *late date* better?" split screen, VS badge; a message pops between them:
//              "running 10 min late!"
//   2.6–6.0    ROUND 1 ♈ ARIES "paces the *whole sidewalk.*" on a snowy street: laps left and right, a LAP counter.
//              "where ARE they?" → "ok. ten more laps."
//   6.0–9.4    ROUND 2 ♉ TAURUS "orders a *pastry* and waits." at a café table: one pastry, then two.
//              "10 minutes? that's pastry time." → "…okay, two pastries."
//   9.4–13.6   VERDICT "TAURUS. | *Pastry in hand.*" Taurus is crowned and slides the second pastry to Aries.
//              THE STARS: "Ten minutes late isn't a crisis. Breathe, then say hi."
import { makeVersus, bubble, drawProp, speedLines, label, cafeTable, pop01, prog, lerp, ease, clamp, GOLD, BONE, SW, T } from './versuskit.js'

const EP = makeVersus({
  id: 'nvse01', a: 'aries', b: 'taurus', accent: '#ff9a6a',
  hook: 'Who handles | a *late date* better?',
  hookMoods: ['wide', 'happy'],
  hookDraw(x, t) {
    const buzz = Math.sin(t * 5) > 0.3 ? 6 * Math.sin(t * 60) : 0
    label(x, 'NEW MESSAGE', 540 + buzz, 560, { size: 26, col: '#9fe6b0' })
    bubble(x, t, 540 + buzz, 625, -1, 2.6, 'running 10 min late!', { size: 40, col: '#c9f2d4', tail: 0 })
  },
  rounds: [
    {
      caption: 'paces the *whole sidewalk.*', deep: '#c0392b',
      set: 'street', setOpts: { snow: 0.6 },
      moods: ['wide', 'squint'], fx: ['sweat'],
      hero: { x: 540, y: 990, s: 280 },
      pose(u) {
        const p = Math.sin(u * 3.2)
        return { x: 540 + 300 * p, look: [Math.cos(u * 3.2) > 0 ? 1 : -1, 0], squash: 0.05 * Math.abs(Math.cos(u * 6.4)) }
      },
      front(x, t, S) {
        const v = Math.cos(S.u * 3.2)
        speedLines(x, t, 540 + 300 * Math.sin(S.u * 3.2), 980, v > 0 ? 1 : -1, 0.8)
        if (S.u > SW) label(x, `LAP ${Math.min(9, 3 + Math.floor((S.u - SW) * 3))}`, 900, 540, { size: 40, col: GOLD })
      },
      bubbles: ['where ARE they?', 'ok. ten more laps.'],
      bubblePos: [[320, 600, 0.4], [720, 700, -0.4]],
      cues: [['whoosh', 0.45, 0.25, 0.025], ['whoosh', 1.4, 0.25, 0.025], ['whoosh', 2.4, 0.25, 0.025], ['tick', 1.8, 0.05], ['tick', 2.15, 0.05], ['tick', 2.5, 0.05]],
    },
    {
      caption: 'orders a *pastry* and waits.', deep: '#2f8a5a',
      set: 'room', tint: '#3a2a4a', setOpts: { window: true, lampX: 180 },
      moods: ['happy', 'sparkle'], fx: ['hearts'],
      hero: { x: 540, y: 900, s: 290 },
      front(x, t, S) {
        cafeTable(x, 540, 1060, 560)
        drawProp(x, 'mug', 380, 1015, 9)
        drawProp(x, 'pastry', 560, 1030, 9)
        const k = pop01(t, S.sw, 0.3, 2.6)
        if (k > 0.01) drawProp(x, 'pastry', 700, 1030 - 10 * Math.sin(t * 6), 9 * k)
      },
      bubbles: ['10 minutes? that’s pastry time.', '…okay, two pastries.'],
      bubblePos: [[540, 560, 0], [720, 680, -0.4]],
      cues: [['pop', 1.76, 1318.51, 0.045, 0.3], ['pluck', 0.9, 880, 0.02, 0.4, -0.2]],
    },
  ],
  verdict: {
    who: 'b', text: 'TAURUS. | *Pastry in hand.*', late: 3,
    draw(x, t, S) {
      // Taurus slides the second pastry across to Aries
      const p = ease.inOutCubic(prog(t, T.crown + 0.7, T.crown + 1.3))
      if (t > T.crown + 0.3) drawProp(x, 'pastry', lerp(860, 360, p), lerp(1060, 1070, p) - 60 * Math.sin(Math.PI * p), 8 * S.ok)
      if (t > T.crown + 0.3) drawProp(x, 'pastry', 740, 1070, 8 * S.ok)
      void clamp; void BONE
    },
  },
  last: 'Ten minutes late isn’t a crisis. Breathe, then say hi.',
  cues: [['whoosh', 11.0, 0.3, 0.03], ['pop', 11.42, 987.77, 0.04, -0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
