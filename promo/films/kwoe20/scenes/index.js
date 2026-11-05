// kwoe20: WHICH ONE ARE YOU? · "Writing the Dating Bio" (trial reel, jazzy · D, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  whip zoom out of panel 1: Virgo mid-backspace, a comma flying. The profile screen is a fictional app.
//   1 Virgo edits one comma for an hour · 2 Aries: "I like winning." · 3 Aquarius writes it as a riddle ·
//   4 Capricorn attaches a résumé.  5 Pisces: cries typing "loves dogs."  Hard cut.
import { makeWhich, laptop, bubble, label, glow, floor, desk, card, clock, actionLines, R, box, osc, saw, prog, clamp, lerp, ease, BONE, GOLD, PINK, INK, MINT, INTER } from '../../kwoe01/scenes/wokit.js'

const bioScreen = (txt, cursor = true) => (x, w, h) => {
  R(x, '#2a2148', 0, 0, w, h); R(x, PINK, 0, 0, w, 14); x.font = `800 8px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('MY BIO', 4, 7)
  x.font = `700 11px ${INTER}`; x.fillStyle = BONE
  String(txt).split('\n').forEach((l, i) => x.fillText(l, 6, 28 + i * 15))
  if (cursor) R(x, BONE, 6 + x.measureText(String(txt).split('\n').pop()).width + 1, 22 + 15 * (String(txt).split('\n').length - 1), 2, 12)
}

function p1(x, t, P) {   // Virgo: one comma, an hour (frame-0 panel)
  desk(x, 20, 420, 440)
  clock(x, 380, 80, `${1 + Math.floor(t / 2)}:${String(Math.floor(t * 20) % 60).padStart(2, '0')}`, { col: GOLD, s: 0.7 })
  const comma = Math.floor(t / 0.5) % 2
  laptop(x, 300, 420, { s: 1.2, screen: bioScreen(comma ? 'Hi, I like books' : 'Hi I like books') })
  // the flying comma
  const f = saw(t, 1.0); x.save(); x.globalAlpha = 1 - f; x.font = `800 60px ${INTER}`; x.fillStyle = BONE; x.fillText(',', 300 + 120 * f, 300 - 120 * f + 160 * f * f); x.restore()
  P.star(x, t, { x: 110, y: 310, s: 160, mood: 'squint', look: [1, 0.3] })
  bubble(x, t, 220, 110, P.turn[0] + 0.35, Infinity, 'comma? no comma?', { size: 26 })
}

function p2(x, t, P) {   // Aries: "I like winning."
  desk(x, 20, 420, 440)
  laptop(x, 310, 420, { s: 1.2, screen: bioScreen('I like winning.', saw(t, 0.5) < 0.5) })
  P.star(x, t, { x: 120, y: 310, s: 170, mood: 'sparkle', look: [1, 0], hops: [P.turn[0] + 0.4] })
  actionLines(x, t, 120, 290, 100, 130, 8, '#ff6b7f', 0.5)
  bubble(x, t, 220, 110, P.turn[0] + 0.4, Infinity, 'done. next.', { size: 28 })
}

function p3(x, t, P) {   // Aquarius: a riddle
  desk(x, 20, 420, 440)
  laptop(x, 310, 420, { s: 1.2, screen: bioScreen('I am not a cat\nbut I stay up\nall night. Who am I?') })
  P.star(x, t, { x: 110, y: 310, s: 160, mood: 'sparkle', look: [1, -0.2] })
  bubble(x, t, 230, 110, P.turn[0] + 0.35, Infinity, 'mysterious. perfect.', { size: 25 })
}

function p4(x, t, P) {   // Capricorn: attaches a résumé
  desk(x, 20, 420, 440)
  laptop(x, 310, 420, { s: 1.2, screen: bioScreen('see attached (2 pages)', false) })
  const k = P.u < 0 ? 1 : clamp(ease.outBack(prog(P.u, 0.3, 0.6)))
  if (k > 0.01) { x.save(); x.translate(350, 180); x.scale(k, k); card(x, 0, 0, 150, 190, 'RÉSUMÉ\n————\n————\n————', { size: 20, rot: 0.08 }); x.restore() }
  P.star(x, t, { x: 110, y: 310, s: 160, mood: 'neutral', look: [1, 0] })
  bubble(x, t, 170, 110, P.turn[0] + 0.7, Infinity, 'references available.', { size: 22 })
}

const EP = makeWhich({
  id: 'kwoe20', hero: 0, flash: '#ff8fb1', deep: '#c0587a',
  hook: 'Writing your | *dating profile bio.*',
  freeze: 'be *yourself.*',
  panels: [
    { sign: 'virgo', bg: 'night', caption: 'edits one comma *for an hour*', draw: p1, cues: [['tick', 0.0, 0.04], ['tick', 0.5, 0.04], ['tick', 1.0, 0.04]] },
    { sign: 'aries', bg: 'office', caption: '"I like *winning.*"', draw: p2, cues: [['tick', 0.4, 0.06], ['pop', 0.42, 1318.51, 0.035, 0]] },
    { sign: 'aquarius', bg: 'blue', caption: 'writes it *as a riddle*', draw: p3, cues: [['pluck', 0.3, 739.99, 0.03, 0.4, 0]] },
    { sign: 'capricorn', bg: 'office', caption: 'attaches *a résumé*', draw: p4, cues: [['whoosh', 0.3, 0.2, 0.03], ['pop', 0.45, 880, 0.03, 0]] },
  ],
  pisces: 'cries typing *"loves dogs."*',
  ending: 'cut',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [label, glow, floor, box, osc, lerp, MINT]
