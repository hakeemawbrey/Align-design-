// kwme23: WAIT, THAT'S ME (long), "Every crush stage. Wait for stage six." (60 s loop, star_advice trial, music: pop · C).
// Six stages, each whips in with a hook-kit chapter sticker, plays its gag and ends on ♐ Sagittarius' slow turn to camera
// with a stage punchline. Pisces (corner) cries more every stage. The format pieces live in ../longkit.js.
//   0–10     1 · NOTICING      frame 0: Sag mid-trip as the crush strolls past. Then a bow tie, a tiny hat and shades pop
//                              on: "it’s a normal Tuesday."  → "it’s a regular outfit."
//   10–19.5  2 · THE “HAHA”     their text: "haha". Detective labels: 2 ha’s = into me? · no "!" = bored?? · lowercase =
//                              calm. good?  → "it was two letters. twice."
//   19.5–29  3 · TELLING FRIENDS "it’s nothing, really." The friends trade looks; one holds up a talk card: "So… who is it?"
//                              → "it was not nothing."
//   29–38.5  4 · THEY SAID HI   the crush: "hi!"  Sag: "hi! I’m— uh—"  a HELLO MY NAME IS ??? sticker.  → "I forgot my own name."
//   38.5–48  5 · THE ALMOST     typed "want to get noodles friday?" … deleted … typed again, thumb hovering.
//                              → "the thumb is hovering."
//   48–60    6 · ASKING         in person, honest and kind: "want to get noodles Friday?"  "yes!! I’d love that."  Confetti,
//                              Pisces fountains. → last line "they said yes. I’m being normal."  59.55–60 loop back to frame 0.
import { makeLong } from '../longkit.js'
import { box, bubble, label, phone, sms, drawBits, drawStarChar, signStar, inSprite, pop01, outK, prog, ease, lerp, clamp, HEART, GOLD, RED, INK, BONE, MINT } from '../../kwme01/wmkit.js'

const CR = signStar('libra'), F1 = signStar('aries'), F2 = signStar('taurus')
const crush = (x, t, cx, cy, s, o = {}) => drawStarChar(x, cx, cy, s, t, { color: CR.color, glyph: s >= 120 ? CR.glyph : null, seed: 9, mood: 'happy', look: [-1, 0], ...o })

// ── stage 1: noticing
const OUTFIT = [3.2, 3.9, 4.6]
function s1after(x, t, u, F) {
  inSprite(x, F, () => {
    if (t > OUTFIT[0]) { x.fillStyle = RED; x.fillRect(14, 27, 3, 3); x.fillRect(19, 27, 3, 3); x.fillStyle = '#7a1a3a'; x.fillRect(17, 27.5, 2, 2) }
    if (t > OUTFIT[1]) { x.fillStyle = INK; x.fillRect(13, 2.5, 10, 2); x.fillRect(15, -1.5, 6, 4.5); x.fillStyle = GOLD; x.fillRect(15, 2, 6, 1) }
    if (t > OUTFIT[2]) { x.fillStyle = INK; x.fillRect(7, 17, 22, 5.5); x.fillStyle = '#3a2d66'; x.fillRect(8, 18, 8, 3.5); x.fillRect(20, 18, 8, 3.5) }
  })
}
// ── stage 2: the haha
const CLUES = [[11.8, '2 ha’s = into me?'], [12.8, 'no “!” = bored??'], [13.8, 'lowercase = calm. good?']]
// ── stage 5: the almost
const DRAFT = 'want to get noodles friday?'
function draftAt(t) {
  if (t < 39.2) return ''
  if (t < 41.0) return DRAFT.slice(0, Math.round(DRAFT.length * prog(t, 39.2, 40.6)))
  if (t < 41.9) return DRAFT.slice(0, Math.round(DRAFT.length * (1 - prog(t, 41.0, 41.5))))
  return DRAFT.slice(0, Math.round(DRAFT.length * prog(t, 41.9, 43.0)))
}
function confetti(x, t, t0) {
  const tt = t - t0
  if (tt < 0) return
  const C = [GOLD, '#ff8fb1', MINT, '#7fd0ff']
  for (let i = 0; i < 30; i++) { const ph = ((tt * 0.6 + i * 0.137) % 1); x.fillStyle = C[i % 4]; x.save(); x.translate(80 + (i * 131) % 920 + 30 * Math.sin(t * 3 + i), 300 + ph * 1100); x.rotate(t * 5 + i); x.fillRect(-9, -5, 18, 10); x.restore() }
}

const STAGES = [
  { t0: 0, t1: 10, sign: 'sagittarius', x: 400, y: 1190, s: 400, turn: 7.0, line: 'it’s a regular outfit.', chapter: { n: 1, title: 'noticing' },
    heroOpts: (t) => ({ mood: t < 1.4 ? 'wide' : t < OUTFIT[0] ? 'heart' : 'sparkle', look: t < 2.6 ? [1, -0.3] : [1, 0], tilt: t < 1.0 ? 0.35 * (1 - prog(t, -0.5, 1.0)) : 0.04, squash: t < 0.8 ? 0.12 : 0, hops: [0.9, ...OUTFIT] }),
    after: s1after,
    back(x, t) { const p = prog(t, -1.0, 2.8); if (p < 1) crush(x, t, lerp(980, -200, p), 1080, 280, { hops: [-0.6, -0.2, 0.2, 0.6, 1.0, 1.4, 1.8, 2.2] }) },
    front(x, t) { bubble(x, t, 600, 860, 5.0, 6.8, 'it’s a normal Tuesday.', { size: 40, tail: -0.4 }); OUTFIT.forEach(v => { const k = pop01(t, v, 0.2, 3) * outK(t, [v + 0.5, v + 0.6]); if (k > 0.01) label(x, '+ style', 640, 1000 - (v - 3) * 60, { size: 40 * k, col: GOLD }) }) } },
  { t0: 10, t1: 19.5, sign: 'sagittarius', x: 330, y: 1220, s: 380, turn: 16.2, line: 'it was two letters. twice.', chapter: { n: 2, title: 'the “haha”' },
    heroOpts: (t) => ({ mood: t < 11.6 ? 'sparkle' : 'squint', look: [1, -0.5], hops: CLUES.map(c => c[0]), tilt: 0.06 }),
    front(x, t) {
      phone(x, 780, 1080, { w: 400, h: 600, rot: 0.04, draw: (c, w) => { sms(c, 'lol you’re so random', 'R', 40, w, { size: 28 }); if (t > 10.5) sms(c, 'haha', 'L', 170, w, { size: 40 }) } })
      // detective string + clue cards
      CLUES.forEach(([v, s], i) => {
        const k = pop01(t, v, 0.25, 2.4)
        if (k <= 0.01) return
        const cx = [300, 520, 330][i], cy = [560, 700, 860][i]
        x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.moveTo(720, 1000); x.lineTo(cx, cy); x.stroke()
        x.save(); x.translate(cx, cy); x.rotate([-0.06, 0.05, -0.03][i]); x.scale(k, k); box(x, -200, -40, 400, 80, '#fff6e8', { bw: 5 }); label(x, s, 0, 2, { size: 28, col: INK, stroke: null, font: "'Space Mono', monospace", weight: 700 }); x.restore()
      })
      const mk = pop01(t, 10.9, 0.3, 2) * outK(t, [15.8, 16.0])
      if (mk > 0.01) { x.save(); x.translate(800, 960 + 10 * Math.sin(t * 3)); x.scale(mk, mk); x.strokeStyle = GOLD; x.lineWidth = 12; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.stroke(); x.fillStyle = 'rgba(255,255,255,0.12)'; x.fill(); x.fillStyle = '#8a6a4a'; x.save(); x.rotate(0.8); x.fillRect(80, -14, 110, 28); x.restore(); x.restore() }
    } },
  { t0: 19.5, t1: 29, sign: 'sagittarius', x: 540, y: 1200, s: 380, turn: 25.8, line: 'it was not nothing.', chapter: { n: 3, title: 'telling friends' },
    heroOpts: (t) => ({ mood: t < 24.5 ? 'happy' : 'wide', look: t < 22 ? [-1, 0] : [1, 0], hops: [20.6, 21.0, 24.5], blush: t > 24.5 ? 1 : 0, tilt: 0 }),
    back(x, t) {
      drawStarChar(x, 190, 1080, 260, t, { color: F1.color, glyph: F1.glyph, seed: 12, mood: t > 22 ? 'squint' : 'neutral', look: t > 22 && t < 23 ? [1, 0] : [1, 0.3], hops: [22.0, 23.3] })
      drawStarChar(x, 890, 1080, 260, t, { color: F2.color, glyph: F2.glyph, seed: 13, mood: t > 22 ? 'wink' : 'neutral', look: [-1, 0.3], hops: [22.1] })
    },
    front(x, t) {
      bubble(x, t, 540, 880, 20.6, 22.0, 'it’s nothing, really.', { size: 42 })
      const lk = pop01(t, 22.0, 0.25, 2) * outK(t, [23.2, 23.4])
      if (lk > 0.01) { label(x, '…sure.', 190, 860, { size: 44 * lk, col: GOLD }); label(x, '…sure.', 890, 860, { size: 44 * lk, col: GOLD }) }
      // the talk card, held up by the friend on the right
      const ck = ease.outBack(prog(t, 23.3, 23.7))
      if (ck > 0.01 && t < 28.6) { x.save(); x.translate(820, lerp(1300, 820, ck)); x.rotate(0.06); box(x, -150, -100, 300, 200, '#1b1236', { bw: 6, ink: GOLD }); label(x, 'TALK CARD', 0, -62, { size: 22, col: GOLD, stroke: null, font: "'Space Mono', monospace", weight: 700 }); label(x, 'So… who', 0, -8, { size: 40, col: BONE, stroke: null, font: "'EB Garamond', serif", weight: 500 }); label(x, 'is it?', 0, 40, { size: 40, col: BONE, stroke: null, font: "'EB Garamond', serif", weight: 500 }); x.restore() }
    } },
  { t0: 29, t1: 38.5, sign: 'sagittarius', x: 330, y: 1210, s: 400, turn: 35.0, line: 'I forgot my own name.', chapter: { n: 4, title: 'they said hi' },
    heroOpts: (t) => ({ mood: t < 29.7 ? 'neutral' : t < 33.3 ? 'wide' : 'heart', look: [1, 0], hops: [29.8, 30.8, 31.2, 33.4], tilt: 0.05 }),
    back(x, t) { crush(x, t, 800, 1150, 320, { pop: ease.outBack(prog(t, 29.3, 29.7)), hops: [29.6, 33.3, 33.6] }) },
    front(x, t, u, S) {
      bubble(x, t, 800, 880, 29.6, 30.6, 'hi!', { size: 50 })
      bubble(x, t, 380, 880, 30.8, 33.2, 'hi! I’m— uh—', { size: 44, tail: -0.2 })
      const nk = ease.outBack(prog(t, 32.0, 32.25))
      if (nk > 0.01) { x.save(); x.translate(330, 1310); x.rotate(-0.1); x.scale(nk * 0.8, nk * 0.8); box(x, -140, -60, 280, 130, '#ffffff', { bw: 5 }); x.fillStyle = RED; x.fillRect(-140, -60, 280, 44); label(x, 'HELLO my name is', 0, -38, { size: 22, col: BONE, stroke: null }); label(x, '???', 0, 30, { size: 56, col: INK, stroke: null }); x.restore() }
      bubble(x, t, 800, 880, 33.3, 34.8, 'haha you’re funny', { size: 38 })
      void S
    } },
  { t0: 38.5, t1: 48, sign: 'sagittarius', x: 330, y: 1220, s: 380, turn: 44.5, line: 'the thumb is hovering.', chapter: { n: 5, title: 'the almost' },
    heroOpts: (t) => ({ mood: t > 41.0 && t < 41.9 ? 'wide' : 'squint', look: [1, 0.3], hops: [39.2, 41.0, 41.9, 43.3], tilt: 0.05 }),
    front(x, t) {
      const d = draftAt(t)
      phone(x, 780, 1060, { w: 420, h: 640, rot: -0.04, draw: (c, w, h) => { c.fillStyle = '#1d1838'; c.fillRect(0, 0, w, 60); c.font = "700 26px 'Space Mono', monospace"; c.fillStyle = '#d9d4ff'; c.textAlign = 'center'; c.fillText('♎︎ them', w / 2, 40); sms(c, 'haha', 'L', 90, w, { size: 30 }); c.fillStyle = '#2a2148'; c.fillRect(10, h - 160, w - 20, 140); c.font = "700 26px 'Space Mono', monospace"; c.fillStyle = BONE; c.textAlign = 'left'; const half = d.length > 16 ? [d.slice(0, 16), d.slice(16)] : [d, '']; c.fillText(half[0], 24, h - 112); c.fillText(half[1] + (Math.floor(t * 3) % 2 ? '|' : ''), 24, h - 72) } })
      if (t > 41.0 && t < 41.6) label(x, '⌫ ⌫ ⌫', 780, 640, { size: 50, col: RED })
      const hk = pop01(t, 43.3, 0.3, 2) * outK(t, [47.5, 47.7])
      if (hk > 0.01) { const by = 1290 + 18 * Math.sin(t * 5); drawBits(x, ['.SS.', 'SSSS', 'SSSS', 'SSSS', '.SS.'], { S: '#f39a3a' }, 880, by, 16 * hk); label(x, 'SEND?', 880, by - 80, { size: 34 * hk, col: GOLD }) }
    } },
  { t0: 48, t1: 60, sign: 'sagittarius', x: 330, y: 1200, s: 400, turn: 53.5, line: 'they said yes. I’m being normal.', chapter: { n: 6, title: 'asking', color: '#ff8fb1' },
    heroOpts: (t) => ({ mood: t < 51.0 ? 'neutral' : 'heart', look: [1, 0], hops: [49.0, 49.4, 51.1, 51.5, 52.0], tilt: 0.04, endMood: 'happy' }),
    back(x, t) { crush(x, t, 790, 1170, 320, { mood: t < 51 ? 'sparkle' : 'heart', hops: [51.0, 51.4], blush: t > 50.4 ? 1 : 0 }) },
    front(x, t) {
      bubble(x, t, 400, 880, 49.0, 51.2, 'want to get noodles Friday?', { size: 40, tail: -0.2, maxW: 560 })
      bubble(x, t, 790, 880, 51.0, 53.4, 'yes!! I’d love that.', { size: 42, tail: 0.1 })
      confetti(x, t, 51.2)
      for (let i = 0; i < 6; i++) { const tt = t - 51.1 - i * 0.2; if (tt > 0 && tt < 2.2) drawBits(x, HEART, { H: i % 2 ? '#ff5c8e' : '#ff8fb1' }, 560 + Math.sin(i * 2) * 120, 1000 - tt * 260, 9, { alpha: 1 - tt / 2.2 }) }
      void clamp
    } },
]

const EP = makeLong({
  id: 'kwme23', dur: 60, hook: 'Every crush stage. | Wait for *stage six.*', hookAccent: '#ff8fb1', wash: '#8a3ab0',
  stages: STAGES,
  pisTears: t => t < 29 ? 2 : 3,
  cues: [
    ['boom', 0.0, 0.12], ['pop', 0.9, 330, 0.04, 0], ...OUTFIT.map((v, i) => ['pop', v, 1174.66 + i * 150, 0.045, 0.3]), ['pop', 5.0, 880, 0.035, 0.2],
    ['pop', 10.5, 987.77, 0.05, 0.3], ...CLUES.map(([v], i) => ['tick', v, 0.07]), ...CLUES.map(([v], i) => ['pluck', v + 0.02, 659.25 * (1 + i * 0.12), 0.035, 0.4, -0.2]),
    ['pop', 20.6, 880, 0.04, 0], ['pluck', 22.0, 330, 0.035, 0.4, 0], ['whoosh', 23.3, 0.35, 0.04], ['bell', 23.6, 1760, 0.025, 0.8, 0.3], ['riser', 24.3, 24.6, 0.02],
    ['pop', 29.6, 1318.51, 0.05, 0.3], ['pop', 30.8, 659.25, 0.04, -0.2], ['tick', 32.0, 0.08], ['boom', 32.05, 0.1], ['pop', 33.3, 1174.66, 0.04, 0.3],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(39.2 + i * 0.14).toFixed(2), 0.02]), ...[0, 1, 2].map(i => ['pop', +(41.0 + i * 0.17).toFixed(2), 220, 0.04, 0.2]), ...Array.from({ length: 8 }, (_, i) => ['tick', +(41.9 + i * 0.14).toFixed(2), 0.02]), ['riser', 43.3, 44.4, 0.015],
    ['pop', 49.0, 880, 0.04, -0.2], ['pop', 51.0, 1318.51, 0.05, 0.3], ['pop', 51.08, 1567.98, 0.04, 0.3], ['glitter', 51.2, 52.2], ['bell', 51.3, 2349.32, 0.03, 1.2, 0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = { style: 'pop', key: 'C', seed: 2623, sections: { drop: 0.6, breakdown: [25.8, 44.5], lift: [29.0, 48.0], outroAt: EP.LOOP[0] }, hits: [0.0, 51.0] }
