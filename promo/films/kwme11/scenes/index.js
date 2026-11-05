// kwme11: WAIT, THAT'S ME, "Saying “we're just friends” while blushing" (8 s loop, star_advice trial, music: dreamy · G).
//   0.00  frame 0: ♒ Aquarius mid-blush, cheeks glowing like heaters, steam puffing; its friend ♊ waves nearby; hook on.
//   0.32  colour flash.  1.0 Aquarius: "we’re JUST friends."  1.7 → 3.8 heart pixels leak out of its head, one by one.
//   4.3–5.8  the slow turn (still glowing).  5.9  last line: "very scientific friends."   7.55–8 loop back.
import { makeWM, wmMusic, bubble, drawBits, inSprite, drawStarChar, signStar, glow, prog, pop01, HEART, BONE } from '../../kwme01/wmkit.js'

const H = { x: 380, y: 1170, s: 420, face: 1 }
const SAY = 1.0, LEAKS = [1.7, 2.2, 2.6, 3.0, 3.3, 3.6, 3.8], TURN = 4.3
const FR = signStar('gemini')
const EP = makeWM({
  id: 'kwme11', dur: 8, sign: 'aquarius', turn: TURN, brk: 'flash',
  hook: 'Saying *“we’re just friends”* | while blushing',
  last: 'very scientific friends.',
  hero: H, wash: '#b03a5a',
  heroOpts: () => ({ mood: 'happy', look: [1, 0], hops: [SAY, SAY + 0.35], blush: 1, tilt: 0.05 }),
  heroAfter(x, t, a, F) {
    const p = 0.75 + 0.25 * Math.sin(t * 6)
    inSprite(x, F, () => { x.globalAlpha = p; x.fillStyle = '#ff3b5c'; x.fillRect(7, 22, 6, 3); x.fillRect(23, 22, 6, 3); x.globalAlpha = 1 })
  },
  back(x, t) {
    drawStarChar(x, 820, 1080, 280, t, { color: FR.color, glyph: FR.glyph, mood: 'happy', look: [-1, 0], seed: 8, hops: [0.2, 0.6, 1.0, 2.6] })
    glow(x, H.x, H.y - 30, 330, '#ff5c7a', 0.28 + 0.06 * Math.sin(t * 6))
  },
  front(x, t) {
    // steam puffs (periodic)
    for (let i = 0; i < 4; i++) { const ph = ((t * 0.9 + i / 4) % 1 + 1) % 1; x.globalAlpha = 0.7 * (1 - ph); x.fillStyle = BONE; x.fillRect(H.x - 150 + i * 90 + 20 * Math.sin(ph * 8 + i), H.y - 260 - ph * 220, 22, 22); x.globalAlpha = 1 }
    LEAKS.forEach((v, i) => {
      const tt = t - v
      if (tt < 0) return
      const y = H.y - 230 - tt * 110, xx = H.x - 60 + ((i * 53) % 140) + 18 * Math.sin(tt * 4 + i)
      drawBits(x, HEART, { H: i % 2 ? '#ff5c8e' : '#ff8fb1' }, xx, y, 9 * Math.min(1, pop01(t, v, 0.25, 2.5)), { alpha: Math.max(0, 1 - tt / 4) })
    })
    bubble(x, t, 470, 780, SAY, TURN - 0.2, 'we’re JUST friends.', { size: 44, tail: -0.3 })
  },
  cues: [['pop', SAY, 987.77, 0.04, -0.2], ...LEAKS.map((v, i) => ['pluck', v, 1174.66 * (1 + (i % 3) * 0.12), 0.025, 0.4, -0.2])],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'dreamy', key: 'G', seed: 2611 })
void prog
