// kwoe04: WHICH ONE ARE YOU? · "The 2 a.m. Scroll" (trial reel, lofi · F, loop). Format: kwoe01/scenes/wokit.js.
//   frame 0  colour flash: four phone glows in the dark, Gemini's screen mid-swipe (whip out of panel 1).
//   1 Gemini has opened every tab on earth · 2 Cancer scrolls back to old photos · 3 Leo looks at their own profile ·
//   4 Scorpio is deep in an octopus documentary (octopuses really do have three hearts).
//   5 Pisces: cries at a duck family video.  Loops.
import { makeWhich, slam0, phone, bubble, thought, label, glow, bed, clock, drawBits, hearts, drawStarChar, signStar, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER, MONO } from '../../kwoe01/scenes/wokit.js'

function dark(x, t, cx, cy) { glow(x, cx, cy, 260, '170,200,255', 0.32 + 0.05 * osc(t, 0.7)) }

function fx(x, t) {   // the clock slam at frame 0
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(540, 990); x.scale(s * 1.6, s * 1.6); x.rotate(-0.05); clock(x, 0, 0, '2:00', { col: '#ff6b7f' }); x.restore()
}

function p1(x, t, P) {   // Gemini: every tab on earth
  bed(x, 10, 480, 460)
  P.star(x, t, { x: 150, y: 330, s: 180, mood: 'wide', look: [1, 0] })
  dark(x, t, 340, 280)
  const n = 3 + Math.floor((t * 4) % 14)
  phone(x, 340, 290, { s: 1.15, glowA: 0.2, screen: (x, w, h) => { for (let i = 0; i < n; i++) { R(x, ['#5aa0ff', '#9fe6b0', '#ff8fb1', '#f2c75c'][i % 4], 4 + (i % 2) * 6, 6 + i * 9, w - 14, 7) } } })
  label(x, `TABS: ${n * 7}`, 340, 440, { size: 24, col: MINT })
  bubble(x, t, 230, 100, P.turn[0] + 0.35, Infinity, 'just one more tab', { size: 26 })
}

function p2(x, t, P) {   // Cancer: old photos
  bed(x, 10, 480, 460, { col: '#3f7cf0' })
  dark(x, t, 330, 290)
  P.star(x, t, { x: 160, y: 330, s: 180, mood: 'sparkle', look: [1, 0], tears: P.u > 0.6 ? 1 : 0 })
  phone(x, 330, 290, { s: 1.1, screen: (x, w, h) => { const off = (t * 30) % 60; for (let i = -1; i < 3; i++) { R(x, BONE, 8, 8 + i * 60 + off, w - 16, 52); R(x, '#c0587a', 14, 14 + i * 60 + off, w - 28, 34) } } })
  thought(x, t, 220, 100, P.turn[0] + 0.35, Infinity, 'we were so cute', { size: 24 })
}

function p3(x, t, P) {   // Leo: their own profile
  bed(x, 10, 480, 460, { col: '#f39a3a' })
  dark(x, t, 330, 290)
  P.star(x, t, { x: 160, y: 330, s: 180, mood: 'heart', look: [1, 0] })
  phone(x, 330, 290, { s: 1.15, screen: (x, w, h) => { R(x, '#3a2d66', 0, 0, w, h); drawStarChar(x, w / 2, 50, 50, t, { color: signStar('leo').color, mood: 'wink', glow: 0, tips: false }); for (let i = 0; i < 6; i++) R(x, ['#f39a3a', GOLD, PINK][i % 3], 6 + (i % 3) * 24, 90 + Math.floor(i / 3) * 24, 20, 20) } })
  bubble(x, t, 230, 100, P.turn[0] + 0.35, Infinity, 'iconic, honestly.', { size: 26 })
}

function p4(x, t, P) {   // Scorpio: the octopus documentary
  bed(x, 10, 480, 460, { col: '#8a3a6a' })
  box(x, 205, 105, 260, 190, '#6a6488', { b: 7 }); R(x, '#1d4a6a', 220, 120, 230, 160); dark(x, t, 335, 200)
  const wig = t * 4
  drawBits(x, ['..OOOO..', '.OOOOOO.', 'OOWOOWOO', 'OOOOOOOO', '.OOOOOO.', 'O.O..O.O', '.O.OO.O.'], { O: '#e8628a', W: BONE }, 335 + 6 * Math.sin(wig * 0.5), 200 + 4 * Math.sin(wig), 13)
  P.star(x, t, { x: 130, y: 340, s: 170, mood: 'wide', look: [1, -0.4], blink: false })
  bubble(x, t, 300, 440, P.turn[0] + 0.35, Infinity, 'THREE hearts?!', { size: 28 })
}

const EP = makeWhich({
  id: 'kwoe04', hero: 0, flash: '#9a7be0', deep: '#2a6fd0', fx,
  hook: 'It’s *2 a.m.* | You’re still scrolling.',
  freeze: 'go to *sleep.*',
  panels: [
    { sign: 'gemini', bg: 'dark', caption: 'opens *every tab* on earth', draw: p1, cues: [['tick', 0.2, 0.03], ['tick', 0.35, 0.03], ['tick', 0.5, 0.03]] },
    { sign: 'cancer', bg: 'dark', caption: 'scrolls back to *old photos*', draw: p2, cues: [['pluck', 0.6, 659.25, 0.03, 0.5, 0]] },
    { sign: 'leo', bg: 'dark', caption: 'looks at *their own* profile', draw: p3, cues: [['glitter', 0.3, 0.6]] },
    { sign: 'scorpio', bg: 'dark', caption: 'deep in an *octopus documentary*', draw: p4, cues: [['pop', 0.4, 1174.66, 0.03, 0]] },
  ],
  pisces: 'cries at a *duck family* video.',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [hearts, saw, prog, clamp, lerp, GOLD, PINK, INK, BLUE, INTER, MONO]
