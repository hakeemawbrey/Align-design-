// kose18 — OVERTHINKING SIMULATOR, Ep 18 (long): "The new profile photo (full simulation)" (75 s vertical, star_talk,
// pop · E). Seamless loop. Promise: "the truth at 100%". Chapter stickers, a new beat every ~8 s.
//   0.0  FRAME 0: Leo mid-gasp, the new profile photo spinning in a scanner beam, PROFILE PHOTO UPDATED; hook on screen.
//   3.0  CH 1 DETECTED.  12.0 CH 2 ENHANCE: the background · the hoodie · the smile (a tiny dog ear sits in the corner).
//  28.0  CH 3 THEORIES (DELETED).  44.0 CH 4 COUNTER-PIC: Leo stages twelve selfies.  58.0 CH 5 TRUTH: "my dog finally sat
//        still for a photo!!" and the zoom-out shows the dog.  70.0 "The photo was about | their dog."  74.55 loop.
import { simFilm, GOLD, PINK, RED, CYAN, BONE, INK, icon, drawSign, richText, bubble } from '../../kose01/scenes/simkit.js'
const CRUSH = 'libra'
const MONO = "'Space Mono', monospace"
// the profile photo: crush in a hoodie at a café; a dog sits just off the left edge (only an ear shows until the reveal)
function photo(x, t, cx, cy, w, { reveal = 0, zoomOn = null, z = 1, rot = 0 } = {}) {
  const h = w * 1.15
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  x.scale(z, z); if (zoomOn) x.translate(-zoomOn[0] * w, -zoomOn[1] * h)
  const sh = lerp2(0, 0.42, reveal) * w   // the reveal pans right so the dog comes into frame
  x.translate(sh, 0)
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#ffcf9a'); g.addColorStop(1, '#c66a8a'); x.fillStyle = g; x.fillRect(-w, -h / 2, w * 2.2, h)
  x.fillStyle = '#7a3c2c'; x.fillRect(-w, h * 0.18, w * 2.2, h * 0.4)                       // café counter
  x.fillStyle = '#fff4dc'; for (let i = 0; i < 4; i++) x.fillRect(-w * 0.4 + i * w * 0.25, -h * 0.4, w * 0.1, w * 0.14)  // café lights
  x.fillStyle = '#3a6ad6'; x.fillRect(-w * 0.2, h * 0.02, w * 0.4, h * 0.42)                  // the hoodie
  drawSign(x, t, CRUSH, { x: 0, y: -h * 0.06, s: w * 0.46 }, { mood: 'happy', look: [-1, 0.3], seed: 12 })
  icon(x, 'dog', -w * 0.62, h * 0.3, w * 0.05)
  x.restore()
  x.restore()
}
const lerp2 = (a, b, k) => a + (b - a) * Math.max(0, Math.min(1, k))
const detected = (x, t, R) => {
  const cx = R.x + R.w / 2, cy = R.y + R.h / 2 + 30
  photo(x, t, cx, cy, 380, { rot: Math.sin(t * 3) * 0.08 })
  const by = cy - 230 + ((t * 300) % 460); x.fillStyle = 'rgba(127,227,255,0.35)'; x.fillRect(cx - 240, by, 480, 12)
  richText(x, 'PROFILE PHOTO | *UPDATED*', cx, R.y + 20, { size: 46, acc: RED })
}
const enhance = (label, zoomOn, n) => (x, t, R, k) => {
  const cx = R.x + R.w / 2, cy = R.y + R.h / 2 + 40
  const z = 1 + 1.4 * Math.min(1, Math.max(0, (t - (12 + (n - 1) * 5.3) - 0.6) / 0.8))
  photo(x, t, cx, cy, 420, { zoomOn: z > 1.01 ? zoomOn : null, z })
  x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(cx - 120, cy - 120, 240, 240)
  x.font = `700 32px ${MONO}`; x.fillStyle = CYAN; x.textAlign = 'center'; x.textBaseline = 'top'; x.fillText(`ENHANCE ${n}/3`, cx, R.y + 16)
  richText(x, label, cx, R.y + 58, { size: 46, acc: PINK })
}
const shoot = (x, t, R) => {
  const cx = R.x + R.w / 2, n = Math.min(12, 1 + Math.floor((t - 44.2) / 0.9))
  const flash = ((t - 44.2) % 0.9) < 0.12
  if (flash) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(R.x, R.y, R.w, R.h) }
  const moods = ['wink', 'sparkle', 'happy', 'heart']
  drawSign(x, t, 'leo', { x: cx, y: R.y + 380, s: 300 }, { mood: moods[n % 4], squash: (n % 3 - 1) * 0.08, seed: 3 })
  icon(x, 'camera', cx + 300, R.y + 260, 12)
  x.font = `800 54px Inter`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'top'; x.fillText(`SELFIE ${n}/12`, cx, R.y + 24)
  const tags = ['the smoulder', 'the side profile', 'the “candid”', 'the mane flip', 'the soft smile', 'the laugh (fake)', 'the laugh (real)', 'the sunset', 'the mirror', 'the moody one', 'the “oops”', 'the one']
  x.font = `700 34px ${MONO}`; x.fillStyle = BONE; x.fillText(tags[n - 1], cx, R.y + R.h - 80)
}
const truth = (x, t, R) => {
  const cx = R.x + R.w / 2, cy = R.y + R.h / 2 + 40
  const rv = Math.min(1, Math.max(0, (t - 59.4) / 1.4))
  photo(x, t, cx, cy, 420 + 100 * rv, { reveal: rv })
  if (rv >= 1) { x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.ellipse(cx - 30, cy + 130, 110, 90, 0, 0, Math.PI * 2 * Math.min(1, (t - 60.8) / 0.4)); x.stroke() }
  richText(x, 'ZOOM *OUT*', cx, R.y + 20, { size: 46, acc: GOLD })
}
export const CFG = {
  ep: 18, sign: 'leo', duration: 75, ending: 'loop',
  hook: 'New profile pic. | Is it *about you?*',
  promise: { t: 1.0, d: 4.2, text: 'the truth at 100%', y: 1876 },
  heads: [
    { t: 2.95, text: 'Change | *detected.*', color: RED },
    { t: 11.95, text: 'Enhance. | *Enhance.*', color: CYAN },
    { t: 27.95, text: 'Generating | *theories…*', color: PINK },
    { t: 43.95, text: 'Preparing a | *counter-pic…*', color: GOLD },
    { t: 57.95, text: 'The | *truth:*', color: '#7ff0a0' },
    { t: 70.0, text: 'The photo was about | *their dog.*', color: GOLD, slam: true },
  ],
  chapters: [
    { t: 3.0, n: 1, text: 'DETECTED', color: RED }, { t: 12.0, n: 2, text: 'ENHANCE', color: CYAN }, { t: 28.0, n: 3, text: 'THEORIES', color: PINK },
    { t: 44.0, n: 4, text: 'COUNTER-PIC', color: GOLD }, { t: 58.0, n: 5, text: 'TRUTH', color: '#7ff0a0' },
  ],
  bar: { label: 'Scanning new photo…', keys: [[0, 7], [0.4, 7], [3, 9], [28, 45], [44, 80], [58, 92], [61, 100]], err: [[0, 0.4], [42.5, 44]],
    labels: [[0, 'Scanning new photo…'], [12, 'Enhancing…'], [28, 'Theorising…'], [44, 'Posing…'], [58, 'Message received'], [61, 'Truth: 100% dog']] },
  panels: [
    { t0: -1, t1: 11.95, kind: 'custom', draw: detected },
    { t0: 12.0, t1: 17.3, kind: 'custom', draw: enhance('the *background* (a date spot??)', [-0.25, -0.25], 1) },
    { t0: 17.3, t1: 22.6, kind: 'custom', draw: enhance('the *hoodie* (new? from WHO?)', [0, 0.2], 2) },
    { t0: 22.6, t1: 27.95, kind: 'custom', draw: enhance('the *smile* (for WHO?)', [0, -0.06], 3) },
    { t0: 28.0, t1: 32.0, kind: 'theory', chip: 'THEORY 1/4', title: 'They’re *moving on.*', scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'neutral' }, { icon: 'plane', x: 0.66, y: 0.6, cell: 12, bob: 1 }] } },
    { t0: 32.0, t1: 36.0, kind: 'theory', chip: 'THEORY 2/4', title: 'It’s a *hint.* | For me.', scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'wink' }, { icon: 'eye', x: 0.66, y: 0.6, cell: 12 }] } },
    { t0: 36.0, t1: 40.0, kind: 'theory', chip: 'THEORY 3/4', title: 'A message to *Leo.* | Specifically.', size: 54, scene: { items: [{ sign: 'leo', x: 0.34, y: 0.7, s: 200, mood: 'sparkle' }, { icon: 'star', x: 0.66, y: 0.6, cell: 12, bob: 1 }] } },
    { t0: 40.0, t1: 43.95, kind: 'theory', chip: 'THEORY 4/4', title: 'A *haircut.* | Notice it. NOW.', size: 56, scene: { items: [{ sign: CRUSH, x: 0.34, y: 0.7, s: 200, mood: 'happy' }, { icon: 'camera', x: 0.66, y: 0.6, cell: 11 }] } },
    { t0: 44.0, t1: 55.0, kind: 'custom', draw: shoot },
    { t0: 55.0, t1: 57.95, kind: 'error', text: 'storage full: | *too many selfies.*', ok: 'KEEP ALL' },
    { t0: 58.0, t1: 62.6, kind: 'custom', draw: truth },
    { t0: 62.6, t1: 76, kind: 'chat', who: CRUSH, title: 'them', keep: true, msgs: [
      { at: 62.7, side: 'L', text: 'my dog finally sat still for a photo!!', col: '#bff5cf', size: 50 },
      { at: 64.2, side: 'R', text: 'WAIT. the dog is in it??' },
      { at: 65.6, side: 'L', text: 'the dog IS the photo', col: '#bff5cf' },
      { at: 67.2, side: 'R', text: '10/10 dog. sending you selfie 12' },
    ] },
  ],
  notifs: [{ t: 58.2, d: 2.4, from: 'THEM · now', text: 'my dog finally sat still for a photo!!', sign: CRUSH }],
  says: [
    { t: 0.9, who: 'sign', text: 'a NEW photo. on a TUESDAY.', d: 1.8 },
    { t: 5.6, who: 'sup', text: 'it’s a nice photo though', d: 1.8 },
    { t: 8.6, who: 'sign', text: 'nobody changes a photo for no reason.', d: 2.4 },
    { t: 14.2, who: 'sign', text: 'that café. is it a DATE café?', d: 2.0 },
    { t: 19.4, who: 'sup', text: 'it’s just a hoodie', d: 1.6 },
    { t: 24.6, who: 'sign', text: 'that smile is aimed SOMEWHERE.', d: 2.0 },
    { t: 30.0, who: 'sup', text: 'not moving on', d: 1.5 },
    { t: 37.4, who: 'sign', text: 'to me. it’s about me. right?', d: 2.0 },
    { t: 46.0, who: 'sup', text: 'they’re all beautiful', d: 1.8 },
    { t: 50.6, who: 'sign', text: 'one more. ONE more.', d: 1.6 },
    { t: 60.8, who: 'sup', text: 'THE DOG!!', d: 1.6 },
    { t: 66.6, who: 'sign', text: 'a dog. it was a dog. I love it.', d: 2.2 },
  ],
  moods: [[0, 'wide', [0.6, -1]], [3, 'squint', [0.4, -1]], [12, 'wide', [0.4, -1]], [17.3, 'squint', [0.4, -1]], [22.6, 'wide', [0.4, -1]], [28, 'sleepy'], [32, 'sparkle'], [36, 'heart'], [40, 'wide', [0.4, -1]], [44, 'wink'], [55, 'wide', [0, 0]], [58, 'wide', [0.4, -1]], [61, 'happy'], [74.3, 'wide', [0.6, -1]]],
  squash: [[0, -0.12], [0.4, 0], [74.4, -0.12]], steam: [[0, 0.4], [40, 44], [74.55, 76]], panic: [[0, 0.4], [55, 56], [74.55, 76]],
  sup: { moods: [[0, 'wide'], [5.6, 'happy'], [12, 'wide'], [46, 'sparkle'], [55, 'wide'], [60.8, 'sparkle'], [62, 'happy'], [74.3, 'wide']], tears: [[0, 2], [28, 3], [32, 2], [46, 3], [52, 2], [60.8, 3], [74.3, 2]] },
  fx: [{ t: 0.3, kind: 'whip', from: 1.3 }, { t: 0.32, kind: 'flash', color: '#ff3b4e', d: 0.2 }, { t: 12.0, kind: 'whip', from: 1.15 }, { t: 28.0, kind: 'whip', from: 1.15 },
    { t: 55.0, kind: 'glitch', d: 0.6 }, { t: 55.0, kind: 'shake', d: 0.5 }, { t: 58.2, kind: 'whip', from: 1.15 }, { t: 60.8, kind: 'scratch', d: 1.2, caption: 'wait. is that… *a dog?*', top: 1470 }],
  music: { style: 'pop', key: 'E', seed: 818, drop: 3.0, sections: { breakdown: [40, 55], lift: [44, 58.2] }, hits: [28, 60.8], outro: 0.6 },
}
const F = simFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
export const cuesFor = F.cuesDefault
