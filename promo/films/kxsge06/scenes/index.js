// kxsge06 · Your Star Guide: Extended · ♍ The Virgo Guide: Draft Fourteen · loop
//   HOOK   Virgo mid-rehearsal of a voice note, the waveform glitching, "DRAFT 14" counter; a red CAUGHT IN 4K circle.
//   ch1    HOW YOU LOVE: Virgo hands over a checklist: scarf ✓ snacks ✓ charger ✓ — each item pops out.
//   ch2    WHAT YOU NEED: a gold THANK YOU ribbon lands on Virgo; Virgo glows.
//   ch3    WHERE IT GETS HARD: the red pen hovers over the other star; they just wanted a hug.
//   ch4    TRY THIS WEEK: Virgo sends draft one, unedited; a heart comes back.
//   Last line: "Draft one was perfect."  Loops back into draft 14.
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const CAUGHT = { at: 0.45, x: 540, y: 1120, r: 210, out: [3.0, 3.3], arrow: null }
function wave(K, x, t, cx, cy, w, amp, a = 1, glitch = 0) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a
  const n = 26
  for (let i = 0; i < n; i++) {
    const h = amp * (0.25 + 0.75 * Math.abs(Math.sin(t * 9 + i * 0.9) * Math.sin(i * 0.37 + t * 2)))
    const gx = glitch && Math.sin(t * 50 + i) > 0.7 ? 8 : 0
    x.fillStyle = i % 5 === 0 && glitch ? '#ff4d6d' : '#7fe0ff'
    x.fillRect(cx - w / 2 + i * (w / n) + gx, cy - h / 2, w / n - 6, h)
  }
  x.restore()
}
const F = guideXFilm({
  id: 'kxsge06', sign: 'virgo',
  hook: 'VIRGO. VOICE NOTE. | DRAFT *FOURTEEN.*',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'VIRGO: MUTABLE EARTH,|RULED BY MERCURY', chipCh: 0,
  last: 'Draft one | was *perfect.*', late: 1, ending: 'loop',
  hookScene: K => ({
    fx: [{ scene: HK.caught(CAUGHT), cues: HK.caughtCues(CAUGHT) }],
    draw(x, t) {
      K.mini(x, t, { x: 540, y: 1150, size: 280, color: K.ME.color, glyph: K.ME.glyph, mood: 'squint', look: [0, 0], squash: 0.05 * Math.sin(t * 12), seed: 4, bob: 0 })
      K.drawBits(x, K.BM.MIC, K.COL, 700, 1080, 12, { rot: -0.3 })
      wave(K, x, t, 540, 850, 600, 120, 1, 1)
      K.label(x, '● REC  0:0' + Math.floor(t % 10), 540, 950, 36, '#ff4d6d')
      K.stamp(x, t, -0.3, 'DELETE?', 330, 1350, { size: 40, color: '#ffd34d', rot: -0.1 })
    },
    cues: [['tick', 0.05, 0.05], ['pop', 0.1, 523.25, 0.03, 0], ['pop', 0.25, 587.33, 0.03, 0]],
  }),
  chapters: [
    { lines: ['you love in *lists*. thoughtful, careful lists.', 'scarf. snacks. *their* charger. sorted.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, list: C + 1.4, give: C + 9.2, out: C + 14.6 }
        const ITEMS = [['scarf', C + 2.4, ['RRRRRR', 'RWRWRW', '....RR']], ['snacks', C + 4.4, ['.CCC.', 'CcCcC', 'CCCCC']], ['charger', C + 7.4, ['AAA.', 'A.AA', 'AAA.', '.A..']]]
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 320, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.give ? 'heart' : 'happy', look: [1, 0], seed: 4, pop: a, hops: ITEMS.map(i => i[1]).concat([B.give]) })
            K.mini(x, t, { x: 770, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.give + 0.4 ? 'heart' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.give + 0.4] })
            const lp = K.pop01(t, B.list, 0.35, 2.4) * a
            if (lp > 0.01) {
              x.save(); x.translate(540, 980); x.scale(lp, lp); x.rotate(0.03)
              x.fillStyle = K.INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#f5eedf'; x.fillRect(-164, -114, 328, 228)
              x.font = '700 30px Space Mono, monospace'; x.textAlign = 'left'; x.fillStyle = K.INK
              ITEMS.forEach(([w, it], i) => { x.fillText(w, -100, -50 + i * 60); if (t > it) { x.fillStyle = '#3fae6a'; x.fillText('✓', -145, -50 + i * 60); x.fillStyle = K.INK } })
              x.restore()
            }
            ITEMS.forEach(([, it, bm], i) => { if (t > it) { const p = K.prog(t, it, it + 0.6); K.drawBits(x, bm, K.COL, K.lerp(540, 620 + i * 60, p), K.lerp(980, K.ACT_Y - 30, K.ease.inCubic(p)) - Math.sin(Math.PI * p) * 80, 7 * a) } })
          },
          cues: [['pop', B.list, 739.99, 0.035, 0], ...[2.4, 4.4, 7.4].map((d, i) => ['pop', +(C + d).toFixed(2), 987.77 + i * 130, 0.04, 0.2]), ['glitter', B.give, B.give + 0.4]],
        }
      } },
    { lines: ['you need someone who *notices* how much you do.', 'and says thank you. *out loud*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, work: C + 1.0, ribbon: C + 7.6, glow: C + 8.4, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const busy = t > B.work && t < B.ribbon
            const vx = busy ? 420 + Math.sin((t - B.work) * 2.4) * 160 : 420
            K.mini(x, t, { x: vx, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.glow ? 'sparkle' : busy ? 'squint' : 'neutral', look: [busy ? Math.cos((t - B.work) * 2.4) : 1, 0], seed: 4, pop: a, glow: t > B.glow ? 1.6 : 0.8, hops: busy ? [B.work + 1, B.work + 2.3, B.work + 3.6, B.work + 4.9] : [B.glow], tears: t > B.glow + 1 ? 1 : 0 })
            K.mini(x, t, { x: 790, y: K.ACT_Y, size: 150, color: K.THEM, mood: 'happy', look: [-1, 0], seed: 9, pop: a, hops: [B.ribbon - 0.4] })
            // little chores flying around while Virgo works
            if (busy) for (let i = 0; i < 3; i++) { const ph = ((t - B.work) * 0.7 + i / 3) % 1; K.label(x, ['folded', 'fixed', 'booked'][i] + ' ✓', 250 + i * 270, 960 - ph * 60, 30, '#9fe6b0', (1 - ph) * a) }
            if (t > B.ribbon) {
              const p = K.prog(t, B.ribbon, B.ribbon + 0.7)
              K.drawBits(x, ['.YYY.', 'YYYYY', 'YYYYY', '.YYY.', '.Y.Y.', 'Y...Y'], K.COL, K.lerp(790, 420, K.ease.inOutCubic(p)), K.ACT_Y - 40 - Math.sin(Math.PI * p) * 140, 8 * a)
              K.banner(x, 'THANK YOU', 540, 940, { size: 44, s: K.pop01(t, B.glow, 0.35, 2.6) * a, color: '#e8b42c', ink: K.INK })
              K.sparkles(x, t, 420, K.ACT_Y - 40, B.glow, 12, 170, 4)
            }
          },
          cues: [...Array.from({ length: 5 }, (_, i) => ['tick', +(B.work + 1 + i * 1.3).toFixed(2), 0.03]), ['whoosh', B.ribbon, 0.4, 0.03], ['pop', B.glow, 1318.51, 0.045, 0], ['glitter', B.glow, B.glow + 0.6]],
        }
      } },
    { lines: ['you fix people when they just want a *hug*.', 'they’re a person. not a *project*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, sad: C + 1.0, pen: C + 2.6, mark: C + 4.0, stop: C + 7.6, drop: C + 8.6, hug: C + 10.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const hugP = K.ease.inOutCubic(K.prog(t, B.hug, B.hug + 0.6))
            K.mini(x, t, { x: K.lerp(320, 600, hugP), y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.hug ? 'heart' : t > B.stop ? 'wide' : 'squint', look: [1, 0], seed: 4, pop: a, hops: [B.stop, B.hug] })
            K.mini(x, t, { x: 760, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.hug + 0.4 ? 'happy' : 'neutral', look: [-1, 0.6], squash: t < B.hug ? 0.1 : 0, seed: 9, pop: a, tears: t > B.sad && t < B.hug + 0.8 ? 1 : 0 })
            if (t > B.sad && t < B.stop) K.bubble(x, 'rough day…', 780, K.ACT_Y - 170, { size: 24, color: '#6f5bd6', s: K.pop01(t, B.sad, 0.3, 2.6) * a, tail: -1 })
            // the red pen and the marks
            if (t > B.pen && t < B.drop + 0.8) {
              const fall = K.prog(t, B.drop, B.drop + 0.6)
              K.drawBits(x, K.BM.PEN, K.COL, 470 + Math.sin(t * 6) * 20, K.ACT_Y - 140 + fall * fall * 240, 9 * K.pop01(t, B.pen, 0.3, 2.4) * a, { rot: fall * 1.5 })
            }
            if (t > B.mark && t < B.stop) ['step 1: sleep more', 'step 2: hydrate', 'step 3: rethink life'].forEach((s, i) => K.label(x, s, 540, 900 + i * 50, 30, '#ff4d6d', K.pop01(t, B.mark + i * 0.9, 0.3, 3) * a * (1 - K.prog(t, B.stop - 0.3, B.stop))))
            if (t > B.stop && t < B.hug) K.label(x, 'oh. they need a hug.', 540, 960, 40, '#ffd34d', K.pop01(t, B.stop, 0.3, 3) * a)
            if (t > B.hug) K.heart(x, 680, K.ACT_Y - 170 - (t - B.hug) * 18, 8 * K.pop01(t, B.hug + 0.4, 0.35, 3), a)
          },
          cues: [['pluck', B.sad, 587.33, 0.03, 0.6, 0.3], ['pop', B.pen, 659.25, 0.035, -0.2], ...[0, 1, 2].map(i => ['tick', +(B.mark + i * 0.9).toFixed(2), 0.05]), ['boom', B.stop, 0.08], ['tick', B.drop + 0.6, 0.05], ['glitter', B.hug, B.hug + 0.6]],
        }
      } },
    { lines: ['this week: send the *first draft*.', 'no re-recording. they want *you*, not polish.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, rec: C + 1.6, itch: C + 4.6, send: C + 7.2, play: C + 8.4, heart: C + 10.0 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            K.mini(x, t, { x: 320, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.heart ? 'heart' : t > B.itch && t < B.send ? 'squint' : 'happy', look: [1, 0], squash: t > B.itch && t < B.send ? 0.05 * Math.sin(t * 30) : 0, seed: 4, pop: a, hops: [B.send, B.heart] })
            K.mini(x, t, { x: 770, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.play + 0.6 ? 'heart' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.play + 0.6] })
            if (t > B.rec && t < B.send) { wave(K, x, t, 540, 960, 420, 80, a); K.label(x, 'DRAFT 1', 540, 870, 40, '#ffd34d', K.pop01(t, B.rec, 0.3, 3) * a) }
            if (t > B.itch && t < B.send) { K.banner(x, 'RE-RECORD?', 380, 1040, { size: 30, s: K.pop01(t, B.itch, 0.3, 2.6) * a, color: '#ff4d6d', rot: -0.06 }); K.label(x, 'no.', 700, 1040, 44, '#9fe6b0', K.pop01(t, B.itch + 1.2, 0.3, 3) * a) }
            K.stamp(x, t, B.send, 'SENT AS IS', 540, 960, { size: 44, color: '#ffd34d', life: 1.4 })
            if (t > B.play) { const p = K.prog(t, B.play - 0.6, B.play); K.drawBits(x, ['..T..', '.TTT.', 'TTTTT'], K.COL, K.lerp(380, 700, p), K.ACT_Y - 120 - Math.sin(Math.PI * p) * 100, 7 * a, { alpha: 1 - K.prog(t, B.play, B.play + 0.3) }); if (t > B.play) wave(K, x, t, 770, K.ACT_Y - 170, 200, 40, a * (1 - K.prog(t, B.heart, B.heart + 0.4))) }
            if (t > B.heart) { K.heart(x, 545, K.ACT_Y - 170 - (t - B.heart) * 18, 9 * K.pop01(t, B.heart, 0.35, 3)); K.bubble(x, 'I love this :)', 740, 960, { size: 26, color: '#6f5bd6', s: K.pop01(t, B.heart, 0.3, 2.6) * a, tail: -1 }) }
          },
          cues: [['tick', B.rec, 0.05], ['pop', B.itch, 466.16, 0.035, -0.3], ['pop', B.itch + 1.2, 1174.66, 0.035, 0.3], ['whoosh', B.send, 0.4, 0.04], ['pop', B.send, 1318.51, 0.04, 0], ['pluck', B.play, 880, 0.03, 0.5, 0.3], ['glitter', B.heart, B.heart + 0.6], ['pop', B.heart, 1567.98, 0.045, 0]],
        }
      } },
  ],
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
