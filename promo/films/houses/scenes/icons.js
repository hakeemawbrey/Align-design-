// houses · room icons. Bold friendly line art: thick glowing strokes, flat 20–40% fills, no faces.
// Each fn draws centred on (0,0) in the current transform (≈ 130 px tall at scale 1). t drives idle motion only
// (pure fn of t); t0 is the moment the room lit, so one-shot gags (ticks, a vault turning) start from there.
import { clamp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'

export const BONE = '#efe6d6', GOLD = '#f2c75c'
const hexA = (hex, a) => hex + Math.round(clamp(a) * 255).toString(16).padStart(2, '0')

export function ink(x, col, { w = 6, fa = 0.28, glow = 14, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = hexA(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
const loop = (t, t0, per) => (((t - t0) % per) + per) % per / per

function person(x, px, py, s, col, fa = 0.3) {
  x.save(); x.translate(px, py); x.scale(s, s)
  x.beginPath(); x.arc(0, -46, 15, 0, Math.PI * 2); ink(x, col, { fa: 0.9 })
  x.beginPath(); x.moveTo(-28, 14); x.bezierCurveTo(-28, -30, 28, -30, 28, 14); x.closePath(); ink(x, col, { fa })
  x.restore()
}

// 1 · YOU — a hand mirror on a stand, a silhouette inside, a shine sweeping across
function mirror(x, t, t0, col) {
  x.beginPath(); x.moveTo(0, 46); x.lineTo(0, 62); x.moveTo(-30, 64); x.lineTo(30, 64); ink(x, col, { fa: 0 })
  x.beginPath(); x.ellipse(0, -6, 44, 54, 0, 0, Math.PI * 2); ink(x, col, { fa: 0.22, w: 7 })
  x.save(); x.beginPath(); x.ellipse(0, -6, 40, 50, 0, 0, Math.PI * 2); x.clip()
  x.globalAlpha *= 0.85; person(x, 0, 30, 0.95, BONE, 0.35)
  const sw = -90 + 200 * ease.inOutQuad(loop(t, t0, 1.6))
  x.globalAlpha *= 0.8; x.fillStyle = 'rgba(255,255,255,0.55)'
  x.beginPath(); x.moveTo(sw, -70); x.lineTo(sw + 16, -70); x.lineTo(sw - 24, 60); x.lineTo(sw - 40, 60); x.closePath(); x.fill()
  x.restore()
}

// 2 · MONEY — two coin stacks; a coin drops onto the left stack every beat and bounces
function coin(x, cx, cy, col = GOLD) {
  x.beginPath(); x.ellipse(cx, cy, 34, 11, 0, 0, Math.PI * 2); ink(x, col, { fa: 0.4, w: 5 })
}
function coins(x, t, t0) {
  for (let i = 0; i < 3; i++) { x.beginPath(); x.rect(-58, 38 - i * 16, 68, 16); x.fillStyle = hexA(GOLD, 0.25); x.fill(); coin(x, -24, 46 - i * 16) }
  for (let i = 0; i < 2; i++) coin(x, 38, 50 - i * 16)
  const p = loop(t, t0, 1.111), fall = clamp(p / 0.45)
  const y = p < 0.45 ? -90 + 108 * ease.inQuad(fall) : -2 - 22 * Math.sin(Math.PI * clamp((p - 0.45) / 0.3)) * (p < 0.75 ? 1 : 0)
  x.save(); x.globalAlpha *= p > 0.9 ? 1 - (p - 0.9) / 0.1 : 1
  x.beginPath(); x.ellipse(-24, y, 34, p < 0.45 ? 26 : 11, 0, 0, Math.PI * 2); ink(x, GOLD, { fa: 0.55, w: 5 })
  x.fillStyle = GOLD; x.font = "800 30px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (p < 0.45) x.fillText('$', -24, y + 2)
  x.restore()
  if (p > 0.45 && p < 0.7) { x.save(); x.globalAlpha *= 1 - (p - 0.45) / 0.25; drawPixelStar(x, 30, -40, 14, 0, '#fff3c0'); drawPixelStar(x, -70, -30, 10, 1, '#fff3c0'); x.restore() }
}

// 3 · TALK — two speech bubbles, typing dots bouncing
function talk(x, t, t0, col) {
  x.beginPath(); x.roundRect(-78, -62, 108, 64, 22); x.moveTo(-54, 2); x.lineTo(-62, 24); x.lineTo(-36, 2); ink(x, col, { fa: 0.3 })
  const bob = 4 * Math.sin((t - t0) * 6)
  x.save(); x.translate(0, bob)
  x.beginPath(); x.roundRect(-12, -6, 92, 58, 20); x.moveTo(54, 52); x.lineTo(64, 72); x.lineTo(36, 52); ink(x, BONE, { fa: 0.22 })
  for (let i = 0; i < 3; i++) {
    const j = Math.max(0, Math.sin((t - t0) * 9 - i * 0.9)) * 8
    x.beginPath(); x.arc(12 + i * 22, 24 - j, 7, 0, Math.PI * 2); x.fillStyle = BONE; x.fill()
  }
  x.restore()
  x.fillStyle = col; x.font = "800 34px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('hi!', -24, -30)
}

// 4 · HOME — a comfy sofa with a cushion, a lamp glowing
function sofa(x, t, t0, col) {
  x.beginPath(); x.roundRect(-64, -34, 128, 46, 16); ink(x, col, { fa: 0.3 })
  x.beginPath(); x.roundRect(-66, 6, 132, 30, 10); ink(x, col, { fa: 0.38 })
  x.beginPath(); x.roundRect(-84, -12, 26, 50, 12); ink(x, col, { fa: 0.42 })
  x.beginPath(); x.roundRect(58, -12, 26, 50, 12); ink(x, col, { fa: 0.42 })
  x.beginPath(); x.moveTo(-60, 38); x.lineTo(-60, 52); x.moveTo(60, 38); x.lineTo(60, 52); ink(x, col, { fa: 0 })
  const sq = 1 + 0.06 * Math.sin((t - t0) * 4)
  x.save(); x.translate(-24, -12); x.scale(sq, 1 / sq); x.rotate(-0.2)
  x.beginPath(); x.roundRect(-22, -18, 44, 36, 10); ink(x, BONE, { fa: 0.35, w: 5 }); x.restore()
}

// 5 · FUN & ROMANCE — a beating heart in a confetti shower
export function heartPath(x, s = 1) {
  x.beginPath(); x.moveTo(0, 40 * s)
  x.bezierCurveTo(-70 * s, -6 * s, -46 * s, -64 * s, 0, -30 * s)
  x.bezierCurveTo(46 * s, -64 * s, 70 * s, -6 * s, 0, 40 * s); x.closePath()
}
function heart(x, t, t0, col) {
  const b = (t - t0) * 2.2 % 1, beat = 1 + 0.14 * Math.exp(-b * 7) * (b < 0.5 ? 1 : 0) + 0.08 * Math.exp(-Math.max(0, b - 0.18) * 9) * (b > 0.18 ? 1 : 0)
  x.save(); x.scale(beat, beat); heartPath(x, 1.15); ink(x, col, { fa: 0.42, w: 7, glow: 20 }); x.restore()
  const C = ['#f2c75c', '#7fd0f0', '#ff8fb1', '#efe6d6']
  for (let i = 0; i < 7; i++) {
    const p = loop(t, t0 + i * 0.17, 1.2), a = i * 0.9
    x.save(); x.globalAlpha *= Math.sin(Math.PI * p)
    drawPixelStar(x, Math.round(Math.cos(a) * (58 + 30 * p)), Math.round(-30 + Math.sin(a) * 30 - 20 + 70 * p), 10, i % 4, C[i % 4]); x.restore()
  }
}

// 6 · ROUTINE & HEALTH — a clipboard checklist; ticks land one by one
function checklist(x, t, t0, col) {
  x.beginPath(); x.roundRect(-48, -62, 96, 128, 12); ink(x, col, { fa: 0.25 })
  x.beginPath(); x.roundRect(-20, -72, 40, 20, 6); ink(x, BONE, { fa: 0.5, w: 5 })
  for (let i = 0; i < 3; i++) {
    const y = -26 + i * 34
    x.beginPath(); x.roundRect(-34, y - 11, 22, 22, 5); ink(x, BONE, { fa: 0.15, w: 4, glow: 6 })
    x.beginPath(); x.moveTo(0, y); x.lineTo(34, y); ink(x, BONE, { fa: 0, w: 5, glow: 4 })
    const k = ease.outCubic(prog(t, t0 + 0.25 + i * 0.28, t0 + 0.4 + i * 0.28))
    if (k > 0) {
      x.beginPath(); x.moveTo(-31, y - 1); x.lineTo(-24, y + 7 * Math.min(1, k * 2)); if (k > 0.5) x.lineTo(-24 + 24 * (k - 0.5) * 2, y + 7 - 26 * (k - 0.5) * 2)
      ink(x, '#5fdc7a', { fa: 0, w: 7, glow: 12 })
    }
  }
}

// 7 · PARTNERS — two linked rings, a diamond glinting
function rings(x, t, t0, col) {
  const sw = 3 * Math.sin((t - t0) * 3)
  x.save(); x.rotate(sw * Math.PI / 180)
  x.beginPath(); x.arc(-22, 14, 36, 0, Math.PI * 2); ink(x, GOLD, { fa: 0, w: 9, glow: 16 })
  x.beginPath(); x.arc(24, 14, 36, 0, Math.PI * 2); ink(x, col, { fa: 0, w: 9, glow: 16 })
  x.beginPath(); x.moveTo(-36, -30); x.lineTo(-8, -30); x.lineTo(2, -42); x.lineTo(-22, -64); x.lineTo(-46, -42); x.closePath(); ink(x, '#bfe8ff', { fa: 0.45, w: 5 })
  x.restore()
  const g = loop(t, t0, 1.1)
  if (g < 0.5) { x.save(); x.globalAlpha *= Math.sin(Math.PI * g / 0.5); drawPixelStar(x, 6, -64, 18, 0, '#ffffff'); x.restore() }
}

// 8 · SHARED & DEEP — a round vault door whose wheel spins open
function vault(x, t, t0, col) {
  x.beginPath(); x.roundRect(-66, -64, 132, 128, 18); ink(x, col, { fa: 0.2 })
  x.beginPath(); x.arc(0, 0, 48, 0, Math.PI * 2); ink(x, BONE, { fa: 0.18, w: 6 })
  const rot = 2.2 * ease.outCubic(prog(t, t0 + 0.1, t0 + 0.9)) + 0.25 * Math.sin((t - t0) * 1.4)
  x.save(); x.rotate(rot)
  for (let i = 0; i < 3; i++) { x.rotate(Math.PI / 3); x.beginPath(); x.moveTo(-34, 0); x.lineTo(34, 0); ink(x, GOLD, { fa: 0, w: 7, glow: 10 }) }
  x.beginPath(); x.arc(0, 0, 12, 0, Math.PI * 2); ink(x, GOLD, { fa: 0.6 })
  x.restore()
  x.beginPath(); x.moveTo(58, -20); x.lineTo(58, 20); ink(x, BONE, { fa: 0, w: 8 })
}

// 9 · TRAVEL & BIG IDEAS — a plane looping across the room (clipped by the room), a lightbulb-ish sparkle trail
function plane(x, t, t0, col, roomW = 260) {
  const p = loop(t, t0 - 0.45, 1.667), px = -roomW / 2 - 80 + (roomW + 160) * p, py = -6 + 10 * Math.sin(p * Math.PI * 2)
  x.save(); x.setLineDash([12, 14]); x.lineDashOffset = -t * 80
  x.beginPath(); x.moveTo(px - 70, py + 10); x.lineTo(-roomW, py + 10); ink(x, BONE, { fa: 0, w: 4, glow: 6 }); x.restore()
  x.save(); x.translate(px, py); x.rotate(-0.06)
  x.beginPath(); x.moveTo(-56, 0); x.bezierCurveTo(-56, -12, 40, -14, 56, -2); x.bezierCurveTo(60, 4, 50, 10, 40, 10); x.lineTo(-50, 10); x.closePath(); ink(x, col, { fa: 0.4 })
  x.beginPath(); x.moveTo(-8, 2); x.lineTo(-30, 38); x.lineTo(-14, 38); x.lineTo(18, 4); ink(x, col, { fa: 0.45, w: 5 })
  x.beginPath(); x.moveTo(-46, -2); x.lineTo(-58, -30); x.lineTo(-44, -30); x.lineTo(-30, -4); ink(x, col, { fa: 0.45, w: 5 })
  x.restore()
  // little cloud
  x.save(); x.globalAlpha *= 0.7; x.beginPath(); x.arc(-50, 42, 16, Math.PI, 0); x.arc(-26, 36, 20, Math.PI, 0); x.arc(0, 44, 14, Math.PI, 0); x.closePath(); ink(x, BONE, { fa: 0.2, w: 4, glow: 6 }); x.restore()
}

// 10 · CAREER — a ladder and a briefcase climbing it
function career(x, t, t0, col) {
  x.beginPath(); x.moveTo(-70, 66); x.lineTo(-56, -70); x.moveTo(-26, 66); x.lineTo(-12, -70)
  for (let i = 0; i < 5; i++) { const y = 50 - i * 28; x.moveTo(-68 + i * 2.9, y); x.lineTo(-24 + i * 2.9, y) }
  ink(x, BONE, { fa: 0, w: 5, glow: 8 })
  const hop = loop(t, t0, 1.111), up = -18 * Math.abs(Math.sin(Math.PI * hop))
  x.save(); x.translate(38, 12 + up)
  x.beginPath(); x.roundRect(-44, -26, 88, 62, 10); ink(x, col, { fa: 0.38, w: 6 })
  x.beginPath(); x.roundRect(-16, -40, 32, 16, 6); ink(x, col, { fa: 0, w: 5 })
  x.beginPath(); x.moveTo(-44, 0); x.lineTo(44, 0); ink(x, col, { fa: 0, w: 4 })
  x.beginPath(); x.rect(-7, -6, 14, 12); ink(x, GOLD, { fa: 0.7, w: 3 })
  x.restore()
  // up arrow
  x.save(); x.globalAlpha *= 0.85; x.beginPath(); x.moveTo(84, 0); x.lineTo(84, -60); x.moveTo(70, -46); x.lineTo(84, -62); x.lineTo(98, -46); ink(x, GOLD, { fa: 0, w: 6 }); x.restore()
}

// 11 · FRIENDS — three pictogram pals bobbing out of step
function friends(x, t, t0, col) {
  const C = [col, BONE, GOLD]
  ;[[-62, 0.82, 1], [62, 0.82, 2], [0, 1, 0]].forEach(([px, s, c], i) => {
    const b = -10 * Math.abs(Math.sin((t - t0) * 4.3 + i * 1.1))
    person(x, px, 52 + b, s * 1.05, C[c], 0.35)
  })
}

// 12 · REST & SECRETS — a crescent moon over a bed, z's drifting up
function rest(x, t, t0, col) {
  x.beginPath(); x.arc(-48, -40, 30, 0, Math.PI * 2); x.arc(-34, -48, 26, 0, Math.PI * 2, true); ink(x, '#e3ecff', { fa: 0.5, w: 5 })
  x.beginPath(); x.moveTo(-72, 54); x.lineTo(-72, 4); x.moveTo(-72, 30); x.lineTo(76, 30); x.lineTo(76, 54); ink(x, BONE, { fa: 0, w: 6, glow: 8 })
  x.beginPath(); x.roundRect(-66, 4, 136, 26, 8); ink(x, col, { fa: 0.38, w: 5 })
  x.beginPath(); x.roundRect(-64, -10, 40, 18, 9); ink(x, BONE, { fa: 0.4, w: 4 })
  x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 3; i++) {
    const p = loop(t, t0 + i * 0.4, 1.2)
    x.save(); x.globalAlpha *= Math.sin(Math.PI * p); x.font = `800 ${22 + i * 6}px Inter, sans-serif`
    x.fillText('z', 18 + 30 * p + i * 8, -6 - 70 * p); x.restore()
  }
}

export const ICONS = [mirror, coins, talk, sofa, heart, checklist, rings, vault, plane, career, friends, rest]
