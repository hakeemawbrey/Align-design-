// nsage01: SAG SEASON TAKEOVER, ep 1, "Sag Has the Password" (25 s vertical, music: pop · D). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. The series look lives in ./takekit.js (shared by all 20 Takeover films).
//   0.0–2.6    hook "Sag season. | *Sag* has the password."  Frame 0: Sag mid-leap through a glowing door, backpack on,
//              the huge account keyring jangling in the air.
//   2.6–7.6    "Rule one: every date | is an *adventure.*"  A whiteboard: DINNER gets crossed out → NIGHT HIKE, SNOW MINI
//              GOLF. TAURUS (hugging a menu): "can the adventure have breadsticks?"  SAG: "obviously."
//   7.6–12.1   "Rule two: *no* | small talk."  A café table. SAG: "what's your biggest dream?"  VIRGO: "…we just sat down."
//  12.1        card cut.
//  12.1–16.1   "Rule three: | *everybody* comes."  A tiny car pulls up and the whole cast piles in; Pisces happy-cries in
//              the back seat.
//  16.1–20.6   Sag twirls the keyring. SAG: "Buckle up. It's *my* month."  Pisces fountains.
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, confetti, keyring, door, car, table, mug, drawBits, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, RED, PINK } from './takekit.js'

// the whiteboard of date ideas
function whiteboard(x, t, u) {
  box(x, 60, 520, 480, 440, '#f4f1ea', { b: 8 })
  R(x, '#c9c3dd', 60, 960, 480, 16)
  ink(x, 'DATE IDEAS', 300, 575, { size: 36 })
  R(x, INK, 100, 602, 400, 4)
  const strike = clamp(prog(u, 0.9, 1.25))
  ink(x, 'dinner', 110, 670, { size: 44, align: 'left', strike: strike > 0 ? strike : false, font: "'EB Garamond', serif", weight: 500 })
  const w1 = prog(u, 1.35, 1.75), w2 = prog(u, 1.9, 2.3)
  if (w1 > 0) { x.save(); x.beginPath(); x.rect(100, 700, 440 * w1, 80); x.clip(); ink(x, 'NIGHT HIKE', 110, 745, { size: 46, align: 'left', col: '#3a6b2e' }); x.restore() }
  if (w2 > 0) { x.save(); x.beginPath(); x.rect(100, 790, 440 * w2, 80); x.clip(); ink(x, 'SNOW MINI GOLF', 110, 835, { size: 36, align: 'left', col: '#2e5fb0' }); x.restore() }
  // the marker
  const mx = u < 1.35 ? lerp(130, 270, prog(u, 0.9, 1.25)) : u < 1.9 ? lerp(110, 380, prog(u, 1.35, 1.75)) : lerp(110, 430, prog(u, 1.9, 2.3))
  const my = u < 1.35 ? 670 : u < 1.9 ? 745 : 835
  if (u > 0.85 && u < 2.5) { x.save(); x.translate(mx, my - 30); x.rotate(0.5); box(x, -8, -50, 16, 60, '#3a6b2e', { b: 4 }); x.restore() }
}
function menu(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -70, -95, 140, 190, '#7a2f3a', { b: 6 })
  R(x, GOLD, -50, -70, 100, 8)
  ink(x, 'MENU', 0, -35, { size: 26, col: GOLD })
  for (let i = 0; i < 4; i++) R(x, '#d8b8a0', -45, -5 + i * 22, 90 - (i % 2) * 24, 7)
  x.restore()
}

const EP = makeTakeover({
  id: 'nsage01', host: 'sag', duration: 25, dy: 240,
  hook: {
    text: 'Sag season. | *Sag* has the password.', dur: 2.6,
    draw(x, t, S) {
      floor(x, 1220)
      door(x, 820, 1220, 1)
      const u = t
      // Sag leaps out of the door (frame 0: mid-air)
      const p = ease.outCubic(clamp(prog(u, 0, 0.9)))
      const hx = lerp(700, 470, p), hy = lerp(820, 990, p) - 140 * Math.sin(Math.PI * clamp(prog(u, -0.2, 0.9)))
      shadow(x, hx, 1215, 260 * lerp(0.7, 1, p))
      S.host(x, t, { x: hx, y: hy, s: 330, mood: u < 0.9 ? 'wide' : 'happy', look: [0, 0], squash: u < 0.9 ? -0.12 : 0, hops: [0.95, 1.6, 2.1] })
      const sw = 0.7 * Math.sin(u * 9) * Math.exp(-u * 0.6)
      keyring(x, hx + 230, hy - 170, 1.25, sw)
      sparkles(x, t, hx + 230, hy - 150, 0.95, 8, 120, 1)
    },
    cues: [['whoosh', 0, 0.4, 0.04], ['tick', 0.95, 0.06], ['pluck', 0.2, 2637, 0.02, 0.3, 0.4], ['pluck', 0.45, 3135.96, 0.02, 0.3, -0.4], ['pluck', 0.7, 2637, 0.02, 0.3, 0.2]],
  },
  beats: [
    { dur: 5.0, head: 'Rule one: every date | is an *adventure.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1230)
        whiteboard(x, t, u)
        shadow(x, 300, 1225, 220)
        S.host(x, t, { x: 300, y: 1080, s: 230, mood: u > 1.35 ? 'sparkle' : 'happy', look: [-1, -1], hops: [S.t0 + 0.3, S.t0 + 1.4, S.t0 + 1.95, S.t0 + 3.65] })
        shadow(x, 780, 1225, 240)
        const tm = u < 1.0 ? 'happy' : u < 2.0 ? 'wide' : u < 3.6 ? 'squint' : 'heart'
        S.star(x, t, 'taurus', { x: 780, y: 1060, s: 250, mood: tm, look: [-1, -0.4], hops: [S.t0 + 1.0, S.t0 + 2.2, S.t0 + 3.7] })
        menu(x, 900, 1160, -0.15 + 0.04 * Math.sin(t * 3))
      },
      says: [
        { at: 2.2, text: 'can the adventure have breadsticks?', x: 810, y: 800, who: 'taurus', tail: -0.1, size: 34, maxW: 400 },
        { at: 3.55, text: 'obviously.', x: 300, y: 905, who: 'host', tail: 0, size: 38 },
      ],
      pis: { x: 950, y: 1660, s: 120 },
      cues: [['tick', 0.95, 0.05], ['whoosh', 1.0, 0.25, 0.02], ['tick', 1.4, 0.03], ['tick', 1.5, 0.03], ['tick', 1.95, 0.03], ['tick', 2.05, 0.03], ['pluck', 3.7, 1567.98, 0.03, 0.5, 0.3]],
    },
    { dur: 4.5, head: 'Rule two: *no* | small talk.',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260, '#2a1f40')
        glow(x, 540, 700, 520, 0.16)
        // a hanging café lamp
        R(x, INK, 536, 380, 8, 220); box(x, 470, 600, 140, 60, GOLD, { b: 6 })
        S.host(x, t, { x: 290, y: 1020, s: 240, mood: u < 1.6 ? 'sparkle' : 'happy', look: [1, 0], hops: [S.t0 + 0.55, S.t0 + 0.9, S.t0 + 1.2] })
        const vm = u < 1.3 ? 'happy' : 'wide'
        S.star(x, t, 'virgo', { x: 790, y: 1020, s: 240, mood: vm, look: [-1, 0], squash: u > 1.3 && u < 1.6 ? -0.08 : 0, hops: [S.t0 + 1.3, S.t0 + 2.0] })
        table(x, 540, 1140, 760, '#8a5a3a')
        mug(x, 400, 1110, 1.1, '#e86a5a', 1, t); mug(x, 690, 1110, 1.1, '#5fb8ff', 1, t)
        // a tiny steaming bead of sweat on Virgo
        if (u > 1.5) { const p = ((u - 1.5) * 0.9) % 1; R(x, INK, 880 - 2, 900 + p * 50 - 2, 16, 20); R(x, '#8fe3ff', 880, 900 + p * 50, 12, 16) }
      },
      says: [
        { at: 0.5, text: "what's your biggest dream?", x: 360, y: 760, who: 'host', tail: -0.3, size: 36 },
        { at: 2.0, text: '…we just sat down.', x: 760, y: 610, who: 'virgo', tail: 0.2, size: 36 },
      ],
      pis: { x: 960, y: 1650, s: 120, look: [-1, -1] },
      cues: [['pop', 1.3, 1318.51, 0.04, 0.4], ['pluck', 2.05, 659.25, 0.03, 0.5, 0.4]],
    },
    { dur: 4.0, head: 'Rule three: | *everybody* comes.',
      draw(x, t, S) {
        const { u } = S
        // the street
        R(x, '#231c3c', 0, 1150, 1080, 770); R(x, '#2e2650', 0, 1150, 1080, 10)
        for (let i = 0; i < 7; i++) R(x, 'rgba(239,230,214,0.35)', i * 170 + 20, 1300, 90, 8)
        const a = ease.outCubic(prog(u, 0, 0.6))
        const cx = lerp(1500, 540, a), bounce = u > 0.6 ? 10 * Math.abs(Math.sin(u * 9)) * Math.exp(-(u - 0.6) * 1.2) : 0
        // the cast piles in one by one (heads poke above the roof)
        const CAST = [['aries', -200, 0.75], ['leo', -80, 1.0], ['gemini', 40, 1.2], ['taurus', 160, 1.4], ['virgo', -140, 1.6], ['cancer', 100, 1.8]]
        CAST.forEach(([id, dx, at], j) => {
          const k = pop01(t, S.t0 + at, 0.3, 2.4)
          if (k > 0.01) S.star(x, t, id, { x: cx + dx, y: 990 - bounce - (j > 3 ? 90 : 0), s: 150, pop: k, mood: 'happy', hops: [S.t0 + at + 0.05, S.t0 + 2.6 + j * 0.08] })
        })
        // Pisces in the back window, happy-crying
        const pk = pop01(t, S.t0 + 2.0, 0.3, 2.4)
        if (pk > 0.01) S.pisces(x, t, { x: cx + 270, y: 985 - bounce, s: 150, pop: pk, hops: [S.t0 + 2.05] }, 3, 'happy', [-1, -0.5])
        car(x, cx, 1260 - bounce, '#c58bff', 760)
        // Sag drives, waving out the window
        S.host(x, t, { x: cx - 210, y: 1120 - bounce, s: 140, mood: 'happy', look: [-1, 0], acc: false, hops: [S.t0 + 0.7, S.t0 + 2.4, S.t0 + 3.0] })
        confetti(x, t, S.t0 + 2.6, cx, 900)
      },
      pis: false,
      cues: [['whoosh', 0, 0.5, 0.05], ['tick', 0.6, 0.06], ['pop', 0.75, 880, 0.04, -0.3], ['pop', 1.0, 987.77, 0.04, -0.1], ['pop', 1.2, 1174.66, 0.04, 0.1], ['pop', 1.4, 1318.51, 0.04, 0.2], ['pop', 1.6, 1174.66, 0.04, -0.2], ['pop', 1.8, 1567.98, 0.04, 0.3], ['pluck', 2.05, 1760, 0.03, 0.5, 0.5], ['glitter', 2.6, 3.0], ['pop', 2.6, 1760, 0.04, 0]],
    },
  ],
  last: { who: 'host', text: "Buckle up. It's *my* month." },
  finale(x, t, S) {
    const { ok, u } = S
    shadow(x, 540, 1120, 260 * ok)
    S.host(x, t, { x: 540, y: 900, s: 300, pop: ok, mood: u > 1.8 ? 'wink' : 'happy', look: [0, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    keyring(x, 770, 700, 1.05 * ok, 0.5 * Math.sin(t * 7))
  },
  finaleCues: [['pluck', 0.2, 2637, 0.02, 0.3, 0.4], ['pluck', 0.5, 3135.96, 0.02, 0.3, 0.4]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, PINK, BONE, drawBits, outK]
