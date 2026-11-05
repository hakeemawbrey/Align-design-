// kwme10: WAIT, THAT'S ME, "Scheduling my feelings for next Tuesday" (9 s loop, star_advice trial, music: cinematic · Dm).
//   0.00  frame 0: ♑ Capricorn mid-stamp at a planner, a pink feelings bubble mid-escape from its head; hook on.
//   0.32  scratch + freeze.  1.3 the bubble is shoved into TUES "7:00–7:15 · feel things", stamp: SCHEDULED.
//   3.0–3.7 the TUES box rattles…  3.8 it bursts open: hearts everywhere.  5.0–6.5 the slow turn.
//   6.6  last line: "it’s only Thursday."   8.55–9 loop back.
import { makeWM, wmMusic, box, label, drawBits, pop01, outK, prog, ease, lerp, clamp, HEART, GOLD, RED, INK, BONE } from '../../kwme01/wmkit.js'

const H = { x: 290, y: 1240, s: 380, face: 1 }
const P = { x: 730, y: 880, w: 520, h: 600 }
const SHOVE = [0.85, 1.3], RATTLE = [3.0, 3.75], BURST = 3.8, TURN = 5.0
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const cell = i => ({ x: P.x - 125 + (i % 2) * 250, y: P.y - 140 + Math.floor(i / 2) * 175 })
function planner(x, t) {
  box(x, P.x - P.w / 2, P.y - P.h / 2, P.w, P.h, '#efe6d6', { bw: 8 })
  label(x, 'THIS WEEK', P.x, P.y - P.h / 2 + 44, { size: 38, col: INK, stroke: null })
  DAYS.forEach((d, i) => {
    const C = cell(i), today = d === 'THU'
    let jx = 0
    if (d === 'TUE' && t > RATTLE[0] && t < BURST) jx = 8 * Math.sin(t * 60) * prog(t, ...RATTLE)
    x.save(); x.translate(C.x + jx, C.y)
    box(x, -115, -72, 230, 150, today ? '#ffe9a8' : '#ffffff', { bw: 4, ink: '#8a84a8' })
    label(x, d + (today ? ' · today' : ''), -102, -48, { size: 24, col: today ? '#b06a2f' : '#5a5470', stroke: null, align: 'left' })
    if (d === 'TUE' && t > SHOVE[1]) {
      const open = t > BURST
      x.fillStyle = open ? '#ffd8e2' : '#ff8fb1'; x.fillRect(-104, -22, 208, 86)
      label(x, open ? 'feel things' : '7:00–7:15', 0, 0, { size: 24, col: INK, stroke: null, font: "'Space Mono', monospace", weight: 700 })
      label(x, open ? 'NOW.' : 'feel things', 0, 36, { size: 24, col: open ? RED : INK, stroke: null, font: "'Space Mono', monospace", weight: 700 })
    }
    x.restore()
  })
}
function feelings(x, t) {
  if (t > SHOVE[1] + 0.05) return
  const p = ease.inOutCubic(prog(t, ...SHOVE)), C = cell(1)
  const bx = lerp(H.x + 60, C.x, p), by = lerp(H.y - 300 - 40 * Math.sin(t * 4), C.y + 20, p), s = lerp(1, 0.45, p)
  drawBits(x, ['..PPPP..', '.PPPPPP.', 'PPPPPPPP', 'PPPPPPPP', '.PPPPPP.', '..PP....', '.P......'], { P: '#ff8fb1' }, bx, by, 22 * s)
  drawBits(x, HEART, { H: RED }, bx, by - 10 * s, 10 * s)
}
function burst(x, t) {
  const tt = t - BURST
  if (tt < 0 || tt > 1.8) return
  const C = cell(1)
  for (let i = 0; i < 12; i++) {
    const a = -Math.PI / 2 + (i - 5.5) * 0.28, d = 60 + tt * 520
    drawBits(x, HEART, { H: i % 2 ? '#ff5c8e' : '#ff8fb1' }, C.x + Math.cos(a) * d, C.y + Math.sin(a) * d + tt * tt * 200, 9, { alpha: 1 - tt / 1.8 })
  }
}
const EP = makeWM({
  id: 'kwme10', dur: 9, sign: 'capricorn', turn: TURN, brk: 'scratch',
  hook: '*Scheduling* my feelings | for next Tuesday',
  last: 'it’s only Thursday.',
  hero: H, wash: '#3a5a8a',
  heroOpts: (t) => ({ mood: t > BURST && t < BURST + 0.9 ? 'wide' : 'squint', look: [1, -0.5], hops: [-0.1, SHOVE[1], SHOVE[1] + 0.4, BURST], tilt: 0.06 }),
  back(x, t) { planner(x, t) },
  front(x, t) {
    feelings(x, t); burst(x, t)
    const k = pop01(t, SHOVE[1] + 0.3, 0.2, 3) * outK(t, [RATTLE[0], RATTLE[0] + 0.15])
    if (k > 0.01) { x.save(); x.translate(cell(1).x + 30, cell(1).y - 60); x.rotate(-0.15); x.scale(k, k); x.strokeStyle = RED; x.lineWidth = 7; x.strokeRect(-130, -34, 260, 68); label(x, 'SCHEDULED', 0, 2, { size: 40, col: RED, stroke: null }); x.restore() }
  },
  cues: [['whoosh', SHOVE[0], 0.45, 0.04], ['boom', SHOVE[1] + 0.3, 0.14], ['tick', SHOVE[1] + 0.3, 0.08], ...Array.from({ length: 6 }, (_, i) => ['tick', +(RATTLE[0] + i * 0.12).toFixed(2), 0.04]), ['pop', BURST, 1318.51, 0.05, 0], ['glitter', BURST, BURST + 0.6], ['bell', BURST + 0.02, 1760, 0.03, 0.8, 0]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'cinematic', key: 'D', seed: 2610 })
void [GOLD, BONE, clamp]
