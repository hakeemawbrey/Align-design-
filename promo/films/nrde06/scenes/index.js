// nrde06: RATE MY DATE IDEA, "Virgo plans a spontaneous day" (18 s vertical trial reel, music: chiptune · A).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “A *spontaneous* day. Itinerary attached.”  ♍ Virgo unrolls a long paper itinerary.
//   2.6–5.8   THE PLAN "9:00 fun. 9:15 *more* fun."  The scroll keeps unrolling down past the floor, line
//             after timed line; the ♉ Taurus date reads along, eyes widening.
//   5.8       card cut.
//   5.8–9.3   BUT… "their date spots a *cosy café.*"  The date points at a glowing café window that isn't on the list;
//             Virgo looks, crosses out the rest of the scroll with one big red line, and smiles.
//   9.32      THE STARS RATE IT 8/10 *room to wiggle*.  Pisces: 10/10.   9.8 THE STARS: "Plan the start. Let the *rest* happen."
import { makeDate, R, box, bubble, shadow, hearts, card, mug, floor, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, RED, MONO } from '../../nrde01/scenes/datekit.js'

const ITEMS = ['9:00 spontaneous fun', '9:15 more fun', '9:40 laugh (natural)', '10:05 hot cocoa', '10:20 a surprise', '10:45 small talk', '11:00 big talk', '11:30 debrief']
function scroll(x, cx, top, len, { cross = 0, n = ITEMS.length } = {}) {
  const w = 420
  box(x, cx - w / 2, top, w, len, '#fbf6ea', { b: 6 })
  for (let y = top + 30; y < top + len; y += 54) R(x, 'rgba(120,150,200,0.25)', cx - w / 2 + 16, y + 34, w - 32, 3)
  x.save(); x.beginPath(); x.rect(cx - w / 2, top, w, len); x.clip()
  x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ITEMS.slice(0, n).forEach((s, i) => { x.fillStyle = i === 0 ? '#2f6a3a' : INK; x.fillText(s, cx - w / 2 + 24, top + 50 + i * 54) })
  x.restore()
  R(x, INK, cx - w / 2 - 20, top - 22, w + 40, 34); R(x, '#d9c9a6', cx - w / 2 - 14, top - 16, w + 28, 22)
  if (cross > 0) { const y0 = top + 104, y1 = top + 104 + 6 * 54 * cross; x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - w / 2 + 20, y0); x.lineTo(cx + w / 2 - 20, y1); x.stroke(); x.restore() }
}
function cafe(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, -220, 340, 260, '#5a3d6a', { b: 7 })
  R(x, INK, -190, -250, 380, 40); for (let i = 0; i < 8; i++) R(x, i % 2 ? '#ff8fb1' : BONE, -184 + i * 46, -244, 46, 30)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, -90, 10, 0, -90, 260); g.addColorStop(0, 'rgba(255,214,140,0.45)'); g.addColorStop(1, 'rgba(255,214,140,0)'); x.fillStyle = g; x.fillRect(-300, -380, 600, 560); x.restore()
  box(x, -130, -180, 260, 150, '#ffd98c', { b: 6 }); R(x, INK, -4, -180, 8, 150)
  x.restore()
  mug(x, t, cx - 60, cy - 40, 0.8, '#e8605c'); mug(x, t, cx + 60, cy - 40, 0.8, '#4f7cd8')
}

const EP = makeDate({
  id: 'nrde06', sign: 'virgo', date: 'taurus', accent: '#9fe6b0', deep: '#2f7a4a',
  idea: 'A *spontaneous* day. Itinerary attached.',
  hook(x, t, S) {
    floor(x, 1330, '#2a2148', '#3a2f62', 190)
    const len = 260 + 220 * ease.outCubic(Math.min(1, (t + 0.4) / 2.2))
    scroll(x, 720, 840, len, { n: 4 + Math.floor(t * 1.5) })
    shadow(x, 330, 1340, 220)
    S.hero(x, t, { x: 330, y: 1120, s: 290, mood: 'squint', look: [1, 0], hops: S.HOOK_HOPS })
  },
  beats: [
    { caption: '9:00 fun. 9:15 *more* fun.', draw(x, t, S) {
      const { u, hero, date } = S
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      scroll(x, 540, 620, lerp(200, 700, ease.outCubic(prog(u, 0, 2.6))), { n: 8 })
      shadow(x, 180, 1190, 160); shadow(x, 900, 1190, 170)
      hero(x, t, { x: 180, y: 1030, s: 180, mood: 'happy', look: [1, -0.5], hops: [S.t0 + 0.4, S.t0 + 1.2, S.t0 + 2.0] })
      date(x, t, { x: 900, y: 1030, s: 190, mood: u < 1.4 ? 'neutral' : 'wide', look: [-1, -0.6], hops: [S.t0 + 1.4] })
      bubble(x, t, 860, 820, S.t0 + 1.6, S.t1, 'is a nap on there?', { size: 32, tail: 0.3 })
    }, cues: [['riser', 0.0, 2.4, 0.012], ['tick', 0.5, 0.04], ['tick', 1.0, 0.04], ['tick', 1.5, 0.04], ['tick', 2.0, 0.04], ['pop', 1.62, 880, 0.035, 0.4]] },
    { caption: 'their date spots a *cosy café.*', draw(x, t, S) {
      const { u, hero, date } = S
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      cafe(x, t, 780, 1140, pop01(t, S.t0 + 0.1, 0.35, 2))
      scroll(x, 225, 640, 520, { n: 8, cross: ease.inOutCubic(prog(u, 1.4, 1.9)) })
      shadow(x, 540, 1190, 170)
      hero(x, t, { x: 540, y: 1060, s: 170, mood: u < 1.4 ? 'wide' : 'happy', look: u < 1.4 ? [1, -0.2] : [-1, -0.3], hops: [S.t0 + 1.4, S.t0 + 2.1] })
      date(x, t, { x: 720, y: 1070, s: 160, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 0.8] })
      bubble(x, t, 760, 880, S.t0 + 0.3, S.t0 + 1.6, 'ooh. in there?', { size: 34 })
      card(x, 540, 860, 220, 80, 'SURE!', { size: 44, col: GOLD, k: pop01(t, S.t0 + 2.0, 0.3, 2.6), rot: -0.05 })
      hearts(x, t, S.t0 + 2.2, 630, 1040, { n: 5 })
    }, cues: [['pop', 0.12, 880, 0.04, 0.3], ['pop', 0.47, 1174.66, 0.035, 0.3], ['whoosh', 1.4, 0.4, 0.04], ['pop', 2.02, 1318.51, 0.05, 0], ['pluck', 2.1, 1760, 0.035, 0, 0.3]] },
  ],
  score: '8/10', word: 'room to wiggle',
  last: 'Plan the start. Let the *rest* happen.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
