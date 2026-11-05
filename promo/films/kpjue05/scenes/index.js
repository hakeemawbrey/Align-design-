// kpjue05 · PLANET TALK: JUPITER → LEO · "Two Giants, One Spotlight" (24 s, star_talk, loop).
//   0.0  frame 0: Jupiter and Leo shoulder to shoulder mid-shove under one wobbling spotlight. Hook "Only room for
//        one big star." Record scratch + freeze at 0.45.
//   3.0  "You're not even a star." / "True. I'm the biggest planet though."   8.8  Leo waits for a grand gesture.
//  12.8  "Be the generous one. Compliment first."   16.8  Leo compliments the crush, who blushes.
//  19.2  Pisces sobbing in the front row.   21.2  "Biggest planet. Biggest heart. Tied."  → the shove again (loop).
import { drawSpace, drawSign, planetSize } from '../../planetkit.js'
import { recordScratch, recordScratchCues, frozen } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 24
const HOOK = { at: -1, text: 'Only room for | *one* big star.', top: 1430, size: 104, out: [2.7, 2.95] }
const REC = { at: 0.45, len: 1.2, caption: 'two main *characters.*', top: 1180 }
const DATE = 16.8, SHOVE2 = 23.2

const B = [
  { t0: 3.0, t1: 5.6, x: 700, y: 760, who: 'leo', text: 'You’re not even a *star.*', tail: 80 },
  { t0: 5.8, t1: 8.6, x: 480, y: 360, who: 'jupiter', text: 'True. I’m the *biggest planet* though.', tail: -100 },
  { t0: 8.8, t1: 12.6, x: 620, y: 780, who: 'leo', text: 'Anyway. I’m waiting for my crush to ask ME out. With a *grand gesture.*', tail: 120, maxW: 720 },
  { t0: 12.8, t1: 16.6, x: 520, y: 360, who: 'jupiter', text: 'Kiddo, I’m generosity. Be the generous one. *Compliment first.*', tail: -100, maxW: 720 },
  { t0: 17.0, t1: 19.0, x: 600, y: 900, who: 'leo', text: 'your laugh is my *favourite* sound.', tail: 120 },
  { t0: 19.2, t1: 21.0, x: 540, y: 1420, who: 'pisces', text: '*STUNNING* 😭', tail: 0 },
  { t0: 21.2, t1: 23.3, x: 540, y: 360, who: 'jupiter', text: 'Biggest planet. Biggest heart. *Tied.*', tail: -100 },
]

function stage(x, t, cx) {
  drawSpace(x, t, { planet: 'jupiter', seed: 11, stars: 0.6 })
  // curtains
  for (const s of [-1, 1]) { x.fillStyle = '#8a1f3a'; x.beginPath(); x.moveTo(540 + s * 540, 0); x.lineTo(540 + s * 380, 0); x.quadraticCurveTo(540 + s * 470, 800, 540 + s * 420, 1500); x.lineTo(540 + s * 540, 1500); x.closePath(); x.fill() }
  // floor
  x.fillStyle = '#3a2350'; x.fillRect(0, 1340, 1080, 580); x.fillStyle = '#2a1638'; x.fillRect(0, 1500, 1080, 420)
  // spotlight cone
  x.save(); const g = x.createLinearGradient(0, 0, 0, 1400); g.addColorStop(0, 'rgba(255,240,190,0.55)'); g.addColorStop(1, 'rgba(255,240,190,0.12)')
  x.fillStyle = g; x.beginPath(); x.moveTo(500, -20); x.lineTo(580, -20); x.lineTo(cx + 260, 1400); x.lineTo(cx - 260, 1400); x.closePath(); x.fill()
  x.fillStyle = 'rgba(255,240,190,0.35)'; x.beginPath(); x.ellipse(cx, 1400, 260, 50, 0, 0, Math.PI * 2); x.fill(); x.restore()
}

function draw(x, t, H) {
  const shove = t < 2.9 || t > SHOVE2
  const sh = shove ? Math.sin(t * 14) : 0
  const dateK = easeInOut(pr(t, DATE - 0.4, DATE + 0.3)) * (1 - easeInOut(pr(t, 21.0, 21.5)))
  const cx = 540 + sh * 120 + dateK * 120
  stage(x, t, cx)
  // audience row with Pisces
  for (let i = 0; i < 6; i++) { if (i === 2 || i === 3) continue; x.fillStyle = '#1a0f2c'; x.beginPath(); x.arc(110 + i * 172, 1820, 90, Math.PI, 0); x.fill() }
  const pk = t > 19 && t < 21.2 ? 1 : 0.0
  pisces(x, 540, 1720 - 120 * easeOut(pr(t, 19.0, 19.3)) * (1 - pr(t, 21.0, 21.3)), 230, t, { tears: t > 19 ? 3 : 2, mood: 'sparkle', hops: [19.4, 20.0, 20.6] })
  // Jupiter
  const jx = 360 + (shove ? sh * 40 + 40 : 0) - dateK * 140, jy = 880 - dateK * 260, js = planetSize('jupiter', 540) * (1 - 0.3 * dateK)
  drawJupiter(x, jx, jy, js, t, { mood: shove ? 'angry' : t > 21 ? 'proud' : t > 19 ? 'happy' : 'happy', rot: shove ? 0.12 + sh * 0.05 : 0, lines: H.lines, look: [1, 0.3], hops: [5.9, 12.9, 21.3], tears: t > 19.2 && t < 21.2 ? 1 : 0 })
  // Leo
  const lx = 760 + (shove ? -sh * 40 - 40 : 0) + dateK * 30, ly = 1200
  drawSign(x, 'leo', lx, ly, 300, t, { mood: shove ? 'squint' : t < 8.8 ? 'eyeroll' : t < 12.8 ? 'wink' : t < 17 ? 'wide' : 'happy', rot: shove ? -0.15 : 0, lines: H.lines, look: dateK > 0.5 ? [-1, 0] : [-1, -0.4], hops: [3.1, 17.1, 21.5], shadow: true })
  // the crush (Aquarius) walks into the light
  if (dateK > 0) drawSign(x, 'aquarius', 360 + (1 - dateK) * -400, 1220, 270, t, { mood: t > 17.8 ? 'heart' : 'happy', look: [1, 0], hops: [18.0], shadow: true, blush: t > 17.8 ? 1 : undefined })
  if (t > 6.2 && t < 8.6) sticker(x, 'BIGGEST PLANET ✓ (true)', 540, 620, { size: 32, rot: -0.05, bg: '#7dffb0', scale: easeOut(pr(t, 6.3, 6.6)) })
  if (t > 9.6 && t < 12.6) sticker(x, 'WAITING… since forever', 760, 1000, { size: 30, rot: 0.06, scale: easeOut(pr(t, 9.7, 10)) })
  if (t > 17.8 && t < 19.2) for (let i = 0; i < 6; i++) { const k = pr(t, 17.8 + i * 0.12, 18.8 + i * 0.12); x.globalAlpha = 1 - k; x.fillStyle = '#ff8fb1'; x.font = '60px Inter'; x.fillText('♥', 300 + i * 30, 1060 - k * 200); x.globalAlpha = 1 }
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK, loop: true, freeze: [REC],
  overlays: [[recordScratch(REC), recordScratchCues(REC)]],
  cues: [['tom', 0.1, 110], ['tom', 0.3, 95], ['bell', 6.3, 1318.5, 0.06, 1.2, 0], ['whoosh', DATE - 0.3, 0.5, 0.12], ['glitter', 17.8, 18.8], ['glitter', 19.2, 20.4], ['tom', SHOVE2 + 0.1, 110], ['tom', SHOVE2 + 0.35, 95]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
