// nrde17: RATE MY DATE IDEA, "Leo plans a gala at home" (16 s vertical trial reel, music: synthwave · Bbm).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “A winter gala. *At home.* Dress code: sparkle.”  ♌ Leo in a sparkly cape on a tiny red carpet.
//   2.6–5.8   THE PLAN "red carpet. velvet rope. *VIP* sign."  The living-room gala sets up, piece by piece.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "their date shows up in *pyjamas.*"  The ♑ Capricorn date arrives in striped pyjamas; Leo pauses…
//             swaps the cape for matching pyjamas; slow dance under one string of lights.
//   9.32      THE STARS RATE IT 9/10 *flexible glamour*.  Pisces: 10/10.   9.8 THE STARS: "Match their *mood*, not your plan."
import { makeDate, R, box, bubble, shadow, hearts, card, sparkles, starFrame, floor, fairyLights, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, RED } from '../../nrde01/scenes/datekit.js'

function cape(x, t, o, k = 1) {
  if (k <= 0.01) return
  const F = starFrame(o.x, o.y, o.s, t, o), w = o.s * 0.9, h = o.s * 0.75, top = F.cy - o.s * 0.08
  x.save(); x.globalAlpha *= k
  x.fillStyle = INK; x.beginPath(); x.moveTo(o.x - w * 0.3 - 6, top - 6); x.lineTo(o.x + w * 0.3 + 6, top - 6); x.lineTo(o.x + w / 2 + 8, top + h + 6); x.lineTo(o.x - w / 2 - 8, top + h + 6); x.closePath(); x.fill()
  x.fillStyle = '#b0182e'; x.beginPath(); x.moveTo(o.x - w * 0.3, top); x.lineTo(o.x + w * 0.3, top); x.lineTo(o.x + w / 2, top + h); x.lineTo(o.x - w / 2, top + h); x.closePath(); x.fill()
  for (let i = 0; i < 10; i++) if (Math.sin(t * 6 + i * 2.3) > 0.2) R(x, i % 2 ? GOLD : BONE, o.x - w * 0.4 + ((i * 41) % (w * 0.8)), top + 20 + ((i * 59) % (h - 30)), 8, 8)
  x.restore()
}
function pjs(x, t, o, col = '#7fd0ff') {
  const F = starFrame(o.x, o.y, o.s, t, o), top = F.cy + o.s * 0.15, w = o.s * 0.62
  R(x, INK, o.x - w / 2 - 4, top - 4, w + 8, o.s * 0.22 + 8)
  for (let i = 0; i < 6; i++) R(x, i % 2 ? '#ffffff' : col, o.x - w / 2 + (i * w) / 6, top, w / 6 + 1, o.s * 0.22)
}
function carpet(x, cx, by, w = 360, k = 1) { if (k <= 0.01) return; x.save(); x.translate(cx, by); x.scale(1, k); R(x, INK, -w / 2 - 6, -6, w + 12, 70); R(x, '#d8203e', -w / 2, 0, w, 58); R(x, GOLD, -w / 2, 0, w, 6); x.restore() }
function rope(x, x0, x1, by, k = 1) {
  if (k <= 0.01) return
  for (const px of [x0, x1]) { R(x, INK, px - 10, by - 150, 20, 150); R(x, GOLD, px - 6, by - 146, 12, 146); box(x, px - 18, by - 172, 36, 26, GOLD, { b: 4 }) }
  x.save(); x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(x0, by - 140); x.quadraticCurveTo((x0 + x1) / 2, by - 140 + 70 * k, x1, by - 140); x.stroke()
  x.strokeStyle = '#8a1a3a'; x.lineWidth = 9; x.stroke(); x.restore()
}

const EP = makeDate({
  id: 'nrde17', sign: 'leo', date: 'capricorn', accent: '#ffb35c', deep: '#b35a10',
  idea: 'A winter gala. *At home.* Dress code: sparkle.',
  hook(x, t, S) {
    floor(x, 1330, '#2a2148', '#3a2f62', 190)
    carpet(x, 540, 1330, 560)
    rope(x, 220, 860, 1330)
    shadow(x, 540, 1340, 230)
    const o = { x: 540, y: 1100, s: 290, mood: 'sparkle', look: [0, 0], hops: S.HOOK_HOPS }
    cape(x, t, o); S.hero(x, t, o)
    sparkles(x, t, 540, 1040, 0.05, 10, 220, 1); sparkles(x, t, 540, 1040, 1.2, 8, 200, 2)
  },
  beats: [
    { caption: 'red carpet. velvet rope. *VIP* sign.', draw(x, t, S) {
      const { u, hero } = S
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      carpet(x, 540, 1180, 620, ease.outCubic(prog(u, 0.1, 0.5)))
      rope(x, 200, 880, 1180, pop01(t, S.t0 + 0.9, 0.3, 2))
      card(x, 540, 700, 260, 100, 'VIP', { size: 64, col: GOLD, ink: RED, k: pop01(t, S.t0 + 1.7, 0.3, 2.6), rot: -0.05 })
      const o = { x: 540, y: 1000, s: 200, mood: 'sparkle', look: [0, 0], hops: [S.t0 + 0.1, S.t0 + 0.9, S.t0 + 1.7] }
      cape(x, t, o); hero(x, t, o)
      sparkles(x, t, 540, 700, S.t0 + 1.7, 10, 180, 1)
    }, cues: [['whoosh', 0.1, 0.4, 0.03], ['pop', 0.92, 987.77, 0.04, 0], ['pop', 1.72, 1318.51, 0.05, 0], ['glitter', 1.72, 2.2]] },
    { caption: 'their date shows up in *pyjamas.*', draw(x, t, S) {
      const { u, hero, date } = S
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      fairyLights(x, t, 120, 640, 960, 640, { n: 10, sag: 60 })
      const swap = u > 1.3
      const dance = ease.inOutCubic(prog(u, 1.7, 2.2))
      const lx = lerp(330, 450, dance), dx = lerp(760, 640, dance), sway = dance * Math.sin(t * 2.4) * 30
      shadow(x, lx + sway, 1190, 160); shadow(x, dx + sway, 1190, 160)
      const o = { x: lx + sway, y: 1030, s: 190, mood: u < 0.5 ? 'sparkle' : u < 1.3 ? 'wide' : 'heart', look: [1, 0], hops: [S.t0 + 0.55, S.t0 + 1.3] }
      if (!swap) cape(x, t, o, 1 - prog(u, 1.1, 1.3))
      hero(x, t, o); if (swap) pjs(x, t, o, '#ffb35c')
      const od = { x: dx + sway, y: 1030, s: 180, mood: u < 1.7 ? 'sleepy' : 'heart', zzz: false, look: [-1, 0], hops: [S.t0 + 0.1] }
      date(x, t, od); pjs(x, t, od, '#7fd0ff')
      sparkles(x, t, lx, 1000, S.t0 + 1.3, 8, 120, 1)
      bubble(x, t, 760, 800, S.t0 + 0.2, S.t0 + 1.3, 'is this… fancy?', { size: 32 })
      bubble(x, t, 330, 800, S.t0 + 1.35, S.t0 + 2.0, 'one sec!', { size: 34 })
      hearts(x, t, S.t0 + 2.2, 540, 950, { n: 6 })
    }, cues: [['pop', 0.22, 659.25, 0.03, 0.3], ['pop', 0.57, 1567.98, 0.04, -0.3], ['whoosh', 1.1, 0.3, 0.035], ['glitter', 1.3, 1.6], ['pluck', 2.2, 1318.51, 0.035, 0, 0.4], ['pluck', 2.5, 1567.98, 0.03, 0, 0.4]] },
  ],
  score: '9/10', word: 'flexible glamour',
  last: 'Match their *mood*, not your plan.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK]
