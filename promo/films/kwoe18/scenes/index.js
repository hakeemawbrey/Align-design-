// kwoe18: WHICH ONE ARE YOU? · "Missing Your Ex at Midnight" (trial reel, dreamy · Fm, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  a clock flipping to 12:00 slammed over the grid, Leo mid-dramatic-window-lean (whip out of panel 4).
//   1 Cancer hugs their old hoodie · 2 Capricorn writes a pros and cons list · 3 Aquarius texts a friend instead ·
//   4 Leo does a dramatic window stare.  5 Pisces: cries, then sleeps. That's growth.  Hard cut.
import { makeWhich, slam0, phone, chat, bubble, thought, label, glow, floor, bed, windowFrame, card, clock, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, INTER } from '../../kwoe01/scenes/wokit.js'

function fx(x, t) {
  const { s, a } = slam0(t, [0.8, 1.0])
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.translate(540, 990); x.scale(s * 2, s * 2); x.rotate(-0.05)
  clock(x, 0, 0, t < 0.12 ? '11:59' : '12:00', { col: '#c9a6ff' }); x.restore()
}

function p1(x, t, P) {   // Cancer: the old hoodie
  bed(x, 10, 480, 460, { col: '#3f7cf0' })
  P.star(x, t, { x: 230, y: 320, s: 190, mood: 'sparkle', look: [0, 0.3], tears: 1, squash: 0.04 * osc(t, 0.8) })
  // the hoodie, hugged
  x.save(); x.translate(230, 370); box(x, -90, -40, 180, 90, '#7a5aa0', { b: 6 }); R(x, '#5a3a80', -20, -40, 40, 30); R(x, BONE, -6, -10, 4, 30); R(x, BONE, 4, -10, 4, 30); x.restore()
  thought(x, t, 240, 100, P.turn[0] + 0.35, Infinity, 'it still smells nice', { size: 24 })
}

function p2(x, t, P) {   // Capricorn: pros and cons
  floor(x)
  P.star(x, t, { x: 120, y: 340, s: 160, mood: 'squint', look: [1, 0.2] })
  x.save(); x.translate(320, 250); x.rotate(0.04); box(x, -110, -150, 220, 300, BONE, { b: 6 }); R(x, INK, -3, -110, 6, 250)
  x.font = `800 20px ${INTER}`; x.textAlign = 'center'; x.fillStyle = MINT; x.fillText('PROS', -55, -122); x.fillStyle = '#e8344e'; x.fillText('CONS', 55, -122)
  const n = P.u < 0 ? 3 : Math.min(5, Math.floor(P.u * 4))
  for (let i = 0; i < 5; i++) { R(x, i < Math.min(n, 2) ? MINT : 'rgba(0,0,0,0)', -95, -90 + i * 40, 70, 8); R(x, i < n ? '#e8344e' : 'rgba(0,0,0,0)', 25, -90 + i * 40, 70, 8) }
  x.restore()
  bubble(x, t, 200, 470, P.turn[0] + 0.5, Infinity, 'the list has spoken.', { size: 25 })
}

function p3(x, t, P) {   // Aquarius: texts a friend instead
  floor(x)
  P.star(x, t, { x: 160, y: 330, s: 180, mood: P.u > 0.9 ? 'happy' : 'neutral', look: [1, 0.2] })
  phone(x, 350, 290, { s: 1.15, glowA: 0.3, screen: (x, w, h) => chat(x, w, h, [{ me: true, text: 'u up? (friend)' }, ...(P.u > 0.6 || P.u < 0 ? [{ me: false, text: 'always. call?' }] : [])]) })
  bubble(x, t, 220, 100, P.turn[0] + 0.3, Infinity, 'texting a friend instead', { size: 23 })
}

function p4(x, t, P) {   // Leo: the dramatic window stare (frame-0 panel)
  windowFrame(x, 210, 50, 240, 300)
  glow(x, 380, 120, 240, '200,210,255', 0.25)
  floor(x)
  P.star(x, t, { x: 170, y: 330, s: 200, mood: 'sparkle', look: [1, -0.6], squash: -0.06, glow: 1.2 })
  // a dramatic curtain sway
  R(x, '#8a3a6a', 440 + 8 * osc(t, 0.5), 40, 30, 330)
  label(x, '(sighs, cinematically)', 240, 470, { size: 22, alpha: 0.9 })
}

const EP = makeWhich({
  id: 'kwoe18', hero: 3, flash: '#c9a6ff', deep: '#7a3aa0', fx,
  hook: '*Midnight.* | You miss your ex.',
  freeze: 'it’s *late.*',
  panels: [
    { sign: 'cancer', bg: 'bedroom', caption: 'hugs *their old hoodie*', draw: p1, cues: [['pluck', 0.4, 587.33, 0.03, 0.6, 0]] },
    { sign: 'capricorn', bg: 'office', caption: 'writes a *pros and cons* list', draw: p2, cues: [['tick', 0.25, 0.04], ['tick', 0.5, 0.04], ['tick', 0.75, 0.04], ['tick', 1.0, 0.04]] },
    { sign: 'aquarius', bg: 'night', caption: 'texts *a friend* instead', draw: p3, cues: [['pop', 0.3, 1174.66, 0.03, 0], ['pop', 0.65, 880, 0.03, 0]] },
    { sign: 'leo', bg: 'dark', caption: 'does a *dramatic window stare*', draw: p4, cues: [['whoosh', 0.2, 0.6, 0.02]] },
  ],
  pisces: 'cries, then sleeps. *That’s growth.*',
  ending: 'cut',
  cues: [['tick', 0.12, 0.08], ['bell', 0.12, 880, 0.03, 1.2, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [card, saw, prog, clamp, lerp, GOLD, PINK]
