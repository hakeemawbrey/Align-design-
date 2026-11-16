// og-kwoe15: OG social cut (static HOOK, crazier signs, no bug/slam title/comment headline/scratch/loop; ends on Pisces).
// Was kwoe15: WHICH ONE ARE YOU? · "Getting a Compliment" (trial reel, pop · G, loop). Kit: ./wokit.js (og copy).
//   frame 0  sparkle flash: a giant "you look great" bubble mid-pop, Leo mid-hair-flip (whip out of panel 1).
//   1 Leo: "I know." · 2 Capricorn: "thanks. you too. bye." · 3 Cancer saves it in their notes forever ·
//   4 Aquarius politely argues with it.  5 Pisces: cries "nobody's ever said that."  Loops.
import { makeWhich, slam0, phone, bubble, label, glow, floor, sparkles, actionLines, drawBits, HEART, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, INTER, SERIF } from './wokit.js'

function fx(x, t) {
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(540, 1000); x.scale(s, s); x.rotate(0.05)
  box(x, -360, -90, 720, 180, '#ffe9a8', { b: 10 })
  x.font = `800 84px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('you look ', -90, 6)
  x.font = `italic 500 104px ${SERIF}`; x.fillStyle = '#c0587a'; x.fillText('great.', 200, 4)
  x.restore()
  sparkles(x, t, 540, 1000, -0.1, 12, 380, 0.2, [GOLD, BONE, PINK], 30)
}

function p1(x, t, P) {   // Leo: "I know."
  floor(x)
  const flip = saw(t + 0.1, 1.4) < 0.25
  P.star(x, t, { x: 220, y: 330, s: 200, mood: flip ? 'wink' : 'sparkle', look: [0.5, -0.4], squash: flip ? -0.1 : 0 })
  // the hair flip: a gold swoosh over the head
  if (flip) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 10; x.beginPath(); x.arc(240, 230, 90, -2.6, -0.6); x.stroke(); x.restore(); actionLines(x, t, 240, 220, 100, 130, 6, GOLD, 0.6) }
  bubble(x, t, 240, 100, P.turn[0] + 0.3, Infinity, 'I KNOW. say it again.', { size: 30 })
}

function p2(x, t, P) {   // Capricorn: thanks. you too. bye.
  floor(x)
  const go = clamp(prog(P.u, 0.6, 1.4))
  P.star(x, t, { x: lerp(200, 520, ease.inCubic(go)), y: 330, s: 180, mood: 'neutral', look: [1, 0] })
  bubble(x, t, 240, 100, P.turn[0] + 0.25, Infinity, 'thanks. noted. bye.', { size: 25 })
  if (go > 0.5) label(x, 'whoosh', 200, 360, { size: 26, alpha: 1 - go })
}

function p3(x, t, P) {   // Cancer: saved in the notes forever
  floor(x)
  P.star(x, t, { x: 150, y: 340, s: 170, mood: 'heart', look: [1, 0] })
  phone(x, 350, 290, { s: 1.2, glowA: 0.3, screen: (x, w, h) => {
    R(x, '#fff1c8', 0, 0, w, h); x.font = `800 10px ${INTER}`; x.textAlign = 'left'; x.fillStyle = INK; x.fillText('NICE THINGS', 6, 16)
    ;['"great smile"', '"so kind"', '"funny!!"', '"you look great"'].forEach((s, i) => { if (i < 3 || P.u > 0.4 || P.u < 0) { x.fillStyle = i === 3 ? '#c0587a' : INK; x.fillText(s, 6, 36 + i * 18) } })
  } })
  drawBits(x, HEART, { H: PINK }, 440, 170 + 6 * osc(t, 2), 6)
  bubble(x, t, 220, 100, P.turn[0] + 0.5, Infinity, 'framing this. FOREVER.', { size: 28 })
}

function p4(x, t, P) {   // Aquarius: politely argues
  floor(x)
  P.star(x, t, { x: 180, y: 330, s: 190, mood: 'squint', look: [1, -0.2] })
  R(x, INK, 300, 250 - 10 * Math.abs(osc(t, 2)), 12, 60)   // one raised finger
  bubble(x, t, 240, 100, P.turn[0] + 0.3, Infinity, 'source? citation?', { size: 28 })
}

const EP = makeWhich({
  id: 'og-kwoe15', hero: 0, flash: '#ffd98a', deep: '#c0587a', fx,
  panels: [
    { sign: 'leo', bg: 'stage', caption: '"I know." *Again, please.*', draw: p1, cues: [['glitter', 0.3, 0.6]] },
    { sign: 'capricorn', bg: 'office', caption: 'leaves *mid-compliment*', draw: p2, cues: [['whoosh', 0.8, 0.4, 0.03]] },
    { sign: 'cancer', bg: 'bedroom', caption: 'saves it *for 40 years*', draw: p3, cues: [['pop', 0.4, 1318.51, 0.03, 0]] },
    { sign: 'aquarius', bg: 'blue', caption: 'asks *for a source*', draw: p4, cues: [['tick', 0.3, 0.05]] },
  ],
  pisces: 'cries *"no one’s EVER said that"*',
  ending: 'loop',
  cues: [['glitter', 0.02, 0.4]],
})

export const HOOK = 'Someone says | *"you look great."*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.2
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [glow, MINT]
