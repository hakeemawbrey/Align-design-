// kxrde03: RATE MY DATE IDEA: EXTENDED, "Leo plans a living-room talent show" (75 s vertical, star_talk post, funk · G).
// The format lives in ../../kxrde01/rdkit.js. No end card, no card transition: hard cut on the last line.
// ♌ Leo's idea: a talent show, just the two of them, in the living room. ♍ Virgo is the audience. Mostly.
//   0.0–3.0    HOOK: Leo mid-leap through a tinsel curtain in a cape, spotlight swinging, confetti frozen mid-air.
//   3–13 THE PLAN (six acts, all Leo) · 13–23 THE SHOW (dramatic oranges, the cape twirl) · 23–33 ACT SEVEN (Virgo: one
//   card trick) · 33–43 BUT… (the trick fails, cards everywhere) · 43–53 THE SAVE (Leo's standing ovation, hands over the
//   cape) · 53–63 THE MOMENT (the finale: two bad dance moves) · 63–75 RATING 10/10 *standing ovation* · Pisces 11/10 ·
//   THE STARS · Virgo bows in the cape · "Cheer *loudest* | for their act."
import { makeRD, R, box, shadow, glow, hearts, sparkles, confetti, spotlight, floor, card, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, INTER } from '../../kxrde01/rdkit.js'

const GROUND = 1300
function room(x, t, { spot = 0, sx = 540, curtain = true } = {}) {
  R(x, '#3a2a5a', 0, 300, 1080, 1000)
  // fairy lights
  for (let i = 0; i < 14; i++) { const px = 40 + i * 74, py = 360 + 30 * Math.sin(i * 0.7); glow(x, px, py, 40, '242,199,92', 0.2); R(x, [GOLD, PINK, '#7fd0ff', '#9fe6b0'][i % 4], px - 6, py - 6, 12, 14) }
  // tinsel curtain (centre stage)
  if (curtain) for (let i = 0; i < 26; i++) { const px = 300 + i * 19, sw = Math.sin(t * 3 + i) * 6; x.fillStyle = i % 2 ? '#e8c45c' : '#f6dc8a'; x.fillRect(px + sw, 420, 8, 560) }
  // a sofa at the right (the audience), a lamp at the left
  box(x, 780, 1080, 300, 140, '#c0384a', { b: 8, hi: '#e05a6a' }); box(x, 760, 1020, 40, 200, '#9a2a3a', { b: 6 })
  R(x, INK, 110, 760, 16, 460); box(x, 60, 720, 116, 60, '#f7d48e', { b: 6 }); glow(x, 118, 760, 200, '255,214,150', 0.2)
  floor(x, GROUND - 80, '#5a3a2e', '#7a5240'); R(x, '#4a2e24', 0, GROUND + 100, 1080, 600)
  box(x, 260, GROUND - 40, 560, 60, '#c96f4a', { b: 6 })            // the rug stage
  if (spot > 0) spotlight(x, sx, 300, sx, GROUND - 20, 380, spot)
}
function cape(x, cx, cy, s = 1, flap = 0, col = '#d8263e') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-60, -40); x.lineTo(60, -40); x.lineTo(90 + flap * 40, 120); x.lineTo(-90 - flap * 40, 120); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-52, -34); x.lineTo(52, -34); x.lineTo(80 + flap * 40, 112); x.lineTo(-80 - flap * 40, 112); x.closePath(); x.fill()
  R(x, GOLD, -60, -46, 120, 12)
  x.restore()
}
function orange(x, cx, cy) { R(x, INK, cx - 22, cy - 22, 44, 44); R(x, '#f2862e', cx - 18, cy - 18, 36, 36); R(x, '#4fae6a', cx - 4, cy - 28, 10, 10) }
function playingCard(x, cx, cy, rot, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -26, -36, 52, 72, BONE, { b: 4 }); R(x, RED, -8, -10, 16, 20); x.restore() }

const EP = makeRD({
  id: 'kxrde03', sign: 'leo', date: 'virgo', accent: GOLD, deep: '#c0282e',
  idea: 'A talent show. *Just us two.*',
  hook(x, t, S) {
    room(x, t, { spot: 1, sx: 520 + 120 * Math.sin(t * 2.4) })
    const ly = 1000 - 120 * Math.abs(Math.sin((t + 0.2) * 1.6))
    cape(x, 540, ly - 20, 1.3, 0.6 + 0.3 * Math.sin(t * 8))
    S.hero(x, t, { x: 540, y: ly, s: 280, mood: 'sparkle', look: [0, 0], squash: -0.06 })
    confetti(x, (t + 0.5) % 3 + 10, 10, 540, 700, { n: 34, life: 3 })
    S.date(x, t, { x: 900, y: 1010, s: 170, mood: 'wide', look: [-1, -1] })
    S.pisces(x, t, { x: 980, y: 1170, s: 120, tears: 2, mood: 'sparkle' })
  },
  chapters: [
    { title: 'THE PLAN', caption: 'Six acts. *All by Leo.*',
      draw(x, t, S) {
        room(x, t)
        // the poster: ACT 1–6, each a star
        const k = pop01(t, S.t0 + 0.6, 0.3, 2.2)
        if (k > 0.01) { x.save(); x.translate(470, 680); x.rotate(-0.04); x.scale(k, k); box(x, -170, -200, 340, 400, CREAM, { b: 7 })
          x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
          for (let i = 0; i < 7; i++) { const on = i < 6 || S.u > 7.2; if (!on) continue; x.fillStyle = i === 6 ? RED : INK; x.fillText(`ACT ${i + 1}`, -130, -160 + i * 52); R(x, i === 6 ? RED : GOLD, 30, -172 + i * 52, 24, 24) }
          x.restore() }
        shadow(x, 300, GROUND, 200)
        S.hero(x, t, { x: 260, y: 1090, s: 230, mood: 'sparkle', look: [1, -1], hops: [S.t0 + 1.0, S.t0 + 1.5, S.t0 + 7.0] })
        S.date(x, t, { x: 900, y: 1010, s: 190, mood: S.u > 4 && S.u < 7 ? 'squint' : 'happy', look: [-1, 0], hops: [S.t0 + 4.2] })
      },
      bubbles: [[1.0, 3.6, 'tonight: six acts. all me.', { x: 300, y: 860 }], [4.2, 6.6, 'where’s my act?', { x: 860, y: 820 }], [7.0, 9.4, 'oh! you can be act seven!', { x: 330, y: 860 }]],
      pis: { x: 980, y: 1170, s: 120 },
      cues: [['pop', 7.2, 1318.51, 0.04, 0]] },
    { title: 'THE SHOW', caption: 'Act one: *dramatic oranges.*', cuts: [5.0],
      draw(x, t, S) {
        room(x, t, { spot: 1, sx: 520 })
        if (S.u < 5) {
          for (let i = 0; i < 3; i++) { const a = t * 5 + i * 2.1; orange(x, 520 + Math.cos(a) * 120, 760 - Math.abs(Math.sin(a)) * 220) }
          S.hero(x, t, { x: 520, y: 1060, s: 250, mood: 'happy', look: [0, -1], hops: [S.t0 + 0.4, S.t0 + 1.4, S.t0 + 2.4, S.t0 + 3.4] })
        } else {
          const sp = (S.u - 5) * 9
          cape(x, 520, 1040, 1.2, 0.5 + 0.5 * Math.sin(sp))
          S.hero(x, t, { x: 520, y: 1060, s: 250, mood: 'sparkle', look: [Math.sin(sp) > 0 ? 1 : -1, 0], squash: 0.04 * Math.sin(sp) })
          for (let i = 0; i < 6; i++) { const a = sp + i; R(x, BONE, 520 + Math.cos(a) * 200, 1060 + Math.sin(a) * 60, 30, 6) }
        }
        S.date(x, t, { x: 900, y: 1010, s: 190, mood: 'happy', look: [-1, 0], hops: [S.t0 + 4.2, S.t0 + 4.5, S.t0 + 8.8] })
        if (S.u > 4) card(x, 900, 840, 220, 70, 'clap. clap.', { size: 32, rot: 0.05, k: pop01(t, S.t0 + 4.1, 0.25, 2.4) * outK(t, [S.t0 + 4.9, S.t0 + 5.0]) })
        if (S.u > 5) card(x, 300, 600, 300, 80, 'ACT 2: THE CAPE', { size: 34, rot: -0.05, k: pop01(t, S.t0 + 5.1, 0.25, 2.4) })
      },
      bubbles: [[0.4, 2.4, 'behold: ORANGES', { x: 420, y: 560 }], [7.0, 9.0, 'and… twirl!!', { x: 420, y: 760 }]],
      pis: { x: 980, y: 1170, s: 120 },
      cues: [['tick', 0.8, 0.04], ['tick', 1.4, 0.04], ['tick', 2.0, 0.04], ['tick', 2.6, 0.04], ['whoosh', 5.2, 1.4, 0.03], ['whoosh', 6.8, 1.4, 0.03], ['tick', 4.2, 0.05], ['tick', 4.5, 0.05]] },
    { title: 'ACT SEVEN', caption: 'Virgo’s act: *one card trick.*', cuts: [4.2],
      draw(x, t, S) {
        room(x, t, { spot: 1, sx: 520 })
        S.date(x, t, { x: 520, y: 1070, s: 240, mood: S.u > 4.2 ? 'neutral' : 'wide', look: [0, 0], squash: 0.02 * Math.sin(t * 30), hops: [S.t0 + 0.6] })
        // a fan of cards in Virgo's hand
        for (let i = 0; i < 5; i++) playingCard(x, 640 + i * 18, 1040 - i * 4, -0.4 + i * 0.2, 0.9)
        S.hero(x, t, { x: 880, y: 1010, s: 200, mood: 'sparkle', look: [-1, 0], hops: [S.t0 + 2.0, S.t0 + 2.4] })
      },
      bubbles: [[0.6, 2.6, 'um. pick a card…', { x: 520, y: 820 }], [2.8, 4.4, 'ooh! this one!', { x: 860, y: 800 }], [5.0, 7.6, 'is your card… the seven?', { x: 520, y: 820 }]],
      pis: { x: 980, y: 1170, s: 120 },
      cues: [['tick', 2.8, 0.05], ['riser', 5.0, 2.4, 0.03]] },
    { title: 'BUT…', tag: 'BUT…', caption: 'The trick *fails.* Cards *everywhere.*', cuts: [3.0, 6.0],
      draw(x, t, S) {
        room(x, t, { spot: 0.6, sx: 520 })
        const fly = S.u - 0.4
        for (let i = 0; i < 18; i++) { if (fly < 0) break
          const a = -Math.PI / 2 + (i / 18 - 0.5) * 2.6, v = 600 + (i * 37) % 300, tt = Math.min(fly, 1.4)
          playingCard(x, 520 + Math.cos(a) * v * tt, Math.min(GROUND - 60, 980 + Math.sin(a) * v * tt + 700 * tt * tt), tt * (6 + i % 4), 0.9) }
        S.date(x, t, { x: 520, y: 1070, s: 240, mood: S.u > 3 ? 'squint' : 'wide', look: [0, 1], squash: S.u > 3 ? 0.1 : 0, mouth: S.u > 3 ? 'wobble' : null })
        S.hero(x, t, { x: 880, y: 1010, s: 200, mood: S.u < 3 ? 'wide' : 'neutral', look: [-1, 0] })
      },
      bubbles: [[1.2, 2.8, 'that’s not your card.', { x: 520, y: 820 }], [3.2, 5.8, 'sorry. that was bad.', { x: 520, y: 820 }]],
      pis: { x: 980, y: 1170, s: 120, tears: 3, mood: 'wide' },
      cues: [['whoosh', 0.4, 1.0, 0.05], ['tick', 0.6, 0.05], ['tick', 0.8, 0.05], ['tick', 1.0, 0.05], ['pop', 1.6, 330, 0.035, 0]] },
    { title: 'THE SAVE', caption: 'The loudest *standing ovation* of the night.', cuts: [4.4],
      draw(x, t, S) {
        room(x, t, { spot: 1, sx: 520 })
        for (let i = 0; i < 8; i++) playingCard(x, 120 + i * 120, GROUND - 60, i * 0.7, 0.9)
        const give = ease.inOutCubic(prog(S.u, 4.4, 5.6))
        S.date(x, t, { x: 520, y: 1070, s: 240, mood: S.u > 1.2 ? 'sparkle' : 'squint', look: [1, 0], blush: S.u > 1.2 ? 0.9 : 0 })
        if (S.u > 4.4) cape(x, lerp(800, 520, give), lerp(990, 1050, give), 1.15, 0.3)
        S.hero(x, t, { x: 840, y: 1010, s: 220, mood: 'happy', look: [-1, 0], hops: Array.from({ length: 10 }, (_, k) => S.t0 + 0.3 + k * 0.4) })
        hearts(x, t, S.t0 + 1.4, 620, 820, { n: 6, rise: 220 })
        confetti(x, t, S.t0 + 1.2, 540, 700, { n: 30 })
      },
      bubbles: [[0.4, 2.4, 'BRAVO!!! ENCORE!!', { x: 820, y: 780 }], [5.6, 8.4, 'you wear the cape. you earned it.', { x: 760, y: 780 }]],
      pis: { x: 980, y: 1170, s: 120, tears: 3 },
      cues: [['tick', 0.4, 0.06], ['tick', 0.6, 0.06], ['tick', 0.8, 0.06], ['tick', 1.0, 0.06], ['tick', 1.2, 0.06], ['glitter', 1.2, 1.8], ['whoosh', 4.4, 1.0, 0.03]] },
    { title: 'THE MOMENT', caption: 'The finale: *two bad dance moves.*', cuts: [5.0],
      draw(x, t, S) {
        room(x, t, { spot: 1, sx: 540 + 140 * Math.sin(t * 2) })
        const b = Math.sin(t * 8)
        cape(x, 420, 1050 - 10 * Math.abs(b), 1.0, 0.4 + 0.3 * b)
        S.date(x, t, { x: 420, y: 1070 - 20 * Math.abs(b), s: 230, mood: 'happy', look: [1, 0], squash: 0.06 * b })
        S.hero(x, t, { x: 680, y: 1070 - 20 * Math.abs(Math.cos(t * 8)), s: 230, mood: 'happy', look: [-1, 0], squash: -0.06 * b })
        if (S.u > 5) hearts(x, t, S.t0 + 5.2, 550, 860, { n: 6, rise: 240 })
      },
      bubbles: [[1.0, 3.2, 'is this a dance or a sneeze', { x: 420, y: 780 }], [5.4, 7.6, 'best act of the night.', { x: 680, y: 780 }]],
      pis: { x: 980, y: 1170, s: 120, tears: 3 },
      cues: [['tick', 0.5, 0.05], ['tick', 1.0, 0.05], ['tick', 1.5, 0.05], ['tick', 2.0, 0.05]] },
  ],
  ratingBg(x, t) { room(x, t, { spot: 0.7, sx: 540, curtain: false }) },
  epilogue(x, t) { if (t > 69.6) confetti(x, t, 69.7, 400, 760, { n: 30 }) },
  finale(x, t, S) {
    const bow = t > 69.6 && t < 71.6 ? Math.sin(Math.PI * prog(t, 69.6, 71.6)) : 0
    shadow(x, 400, GROUND, 220); shadow(x, 690, GROUND, 200)
    cape(x, 400, 1000 + 40 * bow, 1.1, 0.3)
    S.date(x, t, { x: 400, y: 1000 + 40 * bow, s: 240, mood: 'happy', look: [1, bow > 0.3 ? 1 : 0], squash: 0.08 * bow, hops: [63.84] })
    S.hero(x, t, { x: 690, y: 1010, s: 220, mood: 'heart', look: [-1, 0], hops: [63.9, 69.8, 70.2, 70.6] })
  },
  score: '10/10', word: 'standing ovation', pisScore: '11/10',
  starsLine: 'big heart, bigger cheering. *bravo.*',
  last: 'Cheer *loudest* | for their act.',
  hookCues: [['whoosh', 0.0, 0.6, 0.04], ['glitter', 0.1, 0.7]],
  extraCues: [['glitter', 69.7, 70.3], ['tick', 69.9, 0.05], ['tick', 70.2, 0.05], ['tick', 70.5, 0.05]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, clamp, lerp]
