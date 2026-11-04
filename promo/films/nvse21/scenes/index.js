// nvse21: SIGN VS SIGN, "Who packs for a holiday trip better?" ♊ Gemini vs ♑ Capricorn (16 s trial reel, b46,
// music: funk · G). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: two suitcases between them, one bulging.
//   ROUND 1 ♊ "packs in *five minutes* flat." a countdown, things fly into the case; then: socks? "packed!" → "…are socks important?"
//   ROUND 2 ♑ "packed *a week early.*" the list ticks itself, PACKED 7 DAYS AGO. "socks: seven pairs." → "want some?"
//   VERDICT "BOTH. | *Shared socks.*" a pair of socks sails across.  THE STARS: "Pack light. Share generously."
import { makeVersus, drawProp, paper, label, pop01, prog, lerp, ease, SW, T, MINT } from '../../nvse01/scenes/versuskit.js'

const ITEMS = ['scarf', 'mitten', 'gift', 'cookie', 'mug']

const EP = makeVersus({
  id: 'nvse21', a: 'gemini', b: 'capricorn', accent: '#ffe27a',
  hook: 'Who packs for | a *holiday trip* better?',
  hookMoods: ['sparkle', 'neutral'],
  hookDraw(x, t) { drawProp(x, 'suitcase', 450, 660, 9, { sy: 1 + 0.08 * Math.sin(t * 8) }); drawProp(x, 'suitcase', 640, 660, 9) },
  rounds: [
    {
      caption: 'packs in *five minutes* flat.', deep: '#b8860b',
      set: 'room', tint: '#2a1f4a',
      moods: ['sparkle', 'wide'], fx: ['questions'],
      hero: { x: 330, y: 980, s: 260 },
      draw(x, t, S) {
        drawProp(x, 'suitcase', 770, 1090, 16, { sy: 1 + 0.1 * Math.abs(Math.sin(t * 9)) * (S.u < SW ? 1 : 0) })
        ITEMS.forEach((it, i) => { const p = ease.inCubic(prog(t, S.t0 + 0.3 + i * 0.25, S.t0 + 0.6 + i * 0.25)); if (p > 0 && p < 1) drawProp(x, it, lerp(300 + i * 40, 770, p), lerp(700, 1050, p) - 160 * Math.sin(Math.PI * p), 7, { rot: p * 4 }) })
        const left = Math.max(0, 5 - Math.floor(S.u * 2.2))
        label(x, S.u < SW ? `0${left}:00` : 'DONE!', 770, 880, { size: 40, col: MINT })
        if (S.u > SW) drawProp(x, 'sock', 560, 780, 9 * pop01(t, S.sw, 0.3, 2.4))
      },
      bubbles: ['packed!', '…are socks important?'],
      bubblePos: [[330, 640, 0], [360, 750, 0]],
      cues: [0.3, 0.55, 0.8, 1.05, 1.3].map(c => ['whoosh', c, 0.18, 0.02]).concat([['tick', 1.76, 0.07]]),
    },
    {
      caption: 'packed *a week early.*', deep: '#2f6a5a',
      set: 'room', tint: '#1f2a3a',
      moods: ['neutral', 'happy'], fx: ['sparkle'],
      hero: { x: 790, y: 990, s: 250 },
      draw(x, t, S) {
        const ticks = Math.max(0, Math.min(4, Math.floor((S.u - 0.2) / 0.35) + 1))
        paper(x, 310, 760, 400, 340, { title: 'PACKING LIST', lines: ['socks × 7', 'scarf', 'charger', 'snacks'], ticks, size: 28, rot: -0.03, k: pop01(t, S.t0 + 0.1) })
        drawProp(x, 'suitcase', 310, 1080, 12)
        label(x, 'PACKED 7 DAYS AGO', 310, 980, { size: 24, col: MINT })
        if (S.u > SW) drawProp(x, 'sock', 640, 1020, 9 * pop01(t, S.sw + 0.05, 0.3, 2.4))
      },
      bubbles: ['socks: seven pairs.', 'want some?'],
      bubblePos: [[760, 640, 0.2], [760, 750, 0.2]],
      cues: [0.2, 0.55, 0.9, 1.25].map(c => ['tick', c, 0.05]),
    },
  ],
  verdict: {
    who: 'both', text: 'BOTH. | *Shared socks.*', late: 2,
    draw(x, t, S) { const p = ease.inOutCubic(prog(t, T.crown + 0.5, T.crown + 1.2)); if (t > T.crown + 0.5) drawProp(x, 'sock', lerp(760, 320, p), 1080 - 160 * Math.sin(Math.PI * p), 8 * S.ok, { rot: p * 6 }) },
  },
  last: 'Pack light. Share generously.',
  cues: [['whoosh', 10.6, 0.5, 0.03]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
