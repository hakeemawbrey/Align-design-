// kwoe14: WHICH ONE ARE YOU? · "Meeting the Friend's New Partner" (trial reel, jazzy · Bb, hard cut). Format: kwoe01/scenes/wokit.js.
//   frame 0  freeze-frame energy: Virgo mid-question with a clipboard, a spotlight snapping on (whip out of panel 1).
//   The friend's new partner (a mint star with a little bow) is in every panel.
//   1 Virgo runs a gentle interview · 2 Sagittarius is best friends with them already · 3 Taurus watches quietly from
//   the couch · 4 Gemini tells every embarrassing story.  5 Pisces: cries "take care of them."  Hard cut.
import { makeWhich, bubble, thought, label, glow, floor, couch, sandwich, sparkles, actionLines, hearts, drawBits, drawStarChar, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

function partner(x, t, X, Y = 360, s = 120, mood = 'happy', look = -1) {
  drawStarChar(x, X, Y, s, t, { color: '#9fe6b0', mood, look: [look, 0], seed: 41, glow: 0.6 })
  drawBits(x, ['P...P', 'PP.PP', 'PPPPP', 'PP.PP', 'P...P'], { P: PINK }, X, Y - s * 0.62, s / 26)
}

function p1(x, t, P) {   // Virgo: a gentle interview
  glow(x, 360, 300, 200, '255,236,180', 0.3)
  floor(x)
  partner(x, t, 370, 360, 130, 'wide', -1)
  P.star(x, t, { x: 140, y: 340, s: 170, mood: 'squint', look: [1, 0] })
  // clipboard
  x.save(); x.translate(230, 330); x.rotate(0.1); box(x, -40, -55, 80, 110, '#a07850', { b: 5 }); R(x, BONE, -32, -44, 64, 92); for (let i = 0; i < 4; i++) R(x, i < 1 + Math.floor((t * 2) % 4) ? MINT : 'rgba(27,18,54,0.3)', -26, -36 + i * 20, 52, 6); x.restore()
  bubble(x, t, 240, 100, -10, Infinity, 'and your intentions?', { size: 26 })
}

function p2(x, t, P) {   // Sagittarius: instant best friends
  floor(x)
  const hi5 = saw(t, 1.0) < 0.15
  P.star(x, t, { x: 170, y: 330, s: 180, mood: 'happy', look: [1, 0], hops: [0.2, 1.2].map(v => P.turn[0] + v) })
  partner(x, t, 330, 335, 150, 'happy', -1)
  if (hi5) { sparkles(x, t, 250, 220, t - saw(t, 1.0), 8, 70, 0.1); label(x, 'HIGH FIVE!', 250, 170, { size: 26, col: GOLD }) }
  bubble(x, t, 240, 470, P.turn[0] + 0.35, Infinity, 'we have a handshake now', { size: 24 })
}

function p3(x, t, P) {   // Taurus: watches quietly from the couch
  couch(x, 70, 520, 340, '#6b4a9a')
  P.star(x, t, { x: 160, y: 380, s: 160, mood: P.u > 0.9 ? 'happy' : 'squint', look: [1, 0], bob: 3 })
  sandwich(x, 230, 420, 0.8)
  partner(x, t, 370, 380, 120, 'neutral', -1)
  thought(x, t, 170, 140, P.turn[0] + 0.4, Infinity, 'hm. they’re nice.', { size: 24 })
}

function p4(x, t, P) {   // Gemini: every embarrassing story
  floor(x)
  // the photo album
  x.save(); x.translate(250, 250); box(x, -110, -70, 220, 140, '#c0587a', { b: 5 }); R(x, BONE, -100, -60, 96, 120); R(x, BONE, 4, -60, 96, 120)
  const pg = Math.floor(t / 0.5) % 4
  R(x, ['#7fd0ff', GOLD, PINK, MINT][pg], -90, -50, 76, 60); R(x, ['#ffb36b', '#c9a6ff', MINT, PINK][pg], 14, -50, 76, 60); x.restore()
  P.star(x, t, { x: 110, y: 380, s: 160, mood: 'sparkle', look: [1, -0.3], hops: [0.2, 0.6, 1.0].map(v => P.turn[0] + v) })
  partner(x, t, 390, 390, 120, 'heart', -1)
  bubble(x, t, 240, 90, P.turn[0] + 0.3, Infinity, 'and THIS one time…', { size: 27 })
}

const EP = makeWhich({
  id: 'kwoe14', hero: 0, flash: '#f2c75c', deep: '#7a3aa0',
  hook: 'Meeting your friend’s | *new partner.*',
  freeze: 'be *nice.*',
  panels: [
    { sign: 'virgo', bg: 'office', caption: 'runs a *gentle interview*', draw: p1, cues: [['tick', 0.3, 0.05], ['tick', 0.8, 0.05]] },
    { sign: 'sagittarius', bg: 'party', caption: 'best friends *with them already*', draw: p2, cues: [['clap', 0.0, { gain: 0.12 }], ['clap', 1.0, { gain: 0.12 }]] },
    { sign: 'taurus', bg: 'bedroom', caption: 'watches quietly *from the couch*', draw: p3, cues: [['pluck', 0.4, 587.33, 0.03, 0.4, 0]] },
    { sign: 'gemini', bg: 'cafe', caption: 'tells *every embarrassing story*', draw: p4, cues: [['whoosh', 0.0, 0.1, 0.02], ['whoosh', 0.5, 0.1, 0.02], ['whoosh', 1.0, 0.1, 0.02]] },
  ],
  pisces: 'cries *"take care of them."*',
  ending: 'cut',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [actionLines, hearts, osc, prog, clamp, lerp, BLUE, INTER]
