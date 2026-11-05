// kxsge03 · Your Star Guide: Extended · ♊ The Gemini Guide: Twelve Tabs Open · hard cut
//   HOOK   Gemini mid-juggle of twelve chat bubbles, a 2:00 AM clock glitching; record scratch + freeze: "yep. 2 a.m."
//   ch1    HOW YOU LOVE: bubbles fly like confetti; Gemini lights up mid-sentence.
//   ch2    WHAT YOU NEED: Gemini goes quiet on a bench; the other star stays, happy, in the quiet.
//   ch3    WHERE IT GETS HARD: the bubbles pile into a wobbling tower ("lol", "haha", "anyway") that topples.
//   ch4    TRY THIS WEEK: eleven bubbles pop, one call rings, Gemini laughs out loud.
//   Last line: "Fewer chats. Louder laugh."
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const REC = { at: 0.7, len: 1.4, caption: 'yep. *2 a.m.* again.', top: 1500 }
const WORDS = ['hey!!', 'lol', 'wait', 'omg', 'ok but', 'haha', 'srsly?', 'brb', 'nooo', 'also', 'ANYWAY', 'hiii']
const CBG = ['#6f5bd6', '#3a3168', '#e8b42c', '#3ca9e6', '#ff8fb1', '#6f5bd6']
const F = guideXFilm({
  id: 'kxsge03', sign: 'gemini',
  hook: 'GEMINI. IT’S *2 A.M.* | TWELVE CHATS.',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'GEMINI: MUTABLE AIR,|RULED BY MERCURY', chipCh: 0,
  last: 'Fewer chats. | *Louder* laugh.', late: 2, ending: 'cut',
  hookScene: K => ({
    freeze: [REC],
    fx: [{ scene: HK.recordScratch(REC), cues: HK.recordScratchCues(REC) }],
    draw(x, t) {
      const gx = 540, gy = 1180
      for (let i = 0; i < 12; i++) {
        const ang = t * 2.6 + i * Math.PI * 2 / 12
        const rx = 330, ry = 260
        K.bubble(x, WORDS[i], gx + Math.cos(ang) * rx, gy - 180 + Math.sin(ang) * ry, { size: 26, color: CBG[i % CBG.length], tail: 0 })
      }
      K.mini(x, t, { x: gx, y: gy, size: 280, color: K.ME.color, glyph: K.ME.glyph, mood: 'wide', look: [Math.sin(t * 5), -0.5], squash: 0.06 * Math.sin(t * 14), seed: 4, bob: 0 })
      // the glitching clock
      const g = Math.sin(t * 40) > 0.6 ? 6 : 0
      K.label(x, '2:00 AM', 540 + g, 880, 64, '#ff8fb1')
      K.label(x, '2:00 AM', 540 - g, 880, 64, '#7fe0ff', g ? 0.5 : 0)
    },
    cues: [['pop', 0.02, 1318.51, 0.035, -0.3], ['pop', 0.18, 1567.98, 0.03, 0.3], ['pop', 0.36, 1174.66, 0.03, 0], ['pop', 0.52, 1567.98, 0.03, -0.2]],
  }),
  chapters: [
    { lines: ['you love in *words*. so many words.', 'voice notes, links, “ok one more thing”. *love*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, burst: C + 1.8, burst2: C + 7.2, catch: C + 10.4, out: C + 14.6 }
        const fly = (t, t0, i) => { const p = K.prog(t, t0, t0 + 1.6); const ang = -Math.PI / 2 + (i - 3.5) * 0.32; return [330 + Math.cos(ang) * 560 * K.ease.outCubic(p), K.ACT_Y - 60 + Math.sin(ang) * 380 * K.ease.outCubic(p) + 260 * p * p, 1 - K.prog(t, t0 + 1.4, t0 + 2.2)] }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 330, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: 'sparkle', look: [1, 0], seed: 4, pop: a, hops: [B.burst, B.burst2, B.catch] })
            K.mini(x, t, { x: 760, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.catch ? 'heart' : t > B.burst ? 'happy' : 'neutral', look: [-1, -0.4], seed: 9, pop: a, hops: [B.burst + 0.8, B.catch + 0.2] })
            for (const [t0, words] of [[B.burst, ['hi!', 'ok so', 'lol', 'wait', 'listen', 'and', 'ALSO', '!!']], [B.burst2, ['la la', 'link', 'voice note', 'lol', 'one more', 'ok', 'last one', 'promise']]]) {
              if (t < t0) continue
              words.forEach((w, i) => { const [bx, by, ba] = fly(t, t0 + i * 0.07, i); K.bubble(x, w, bx, by, { size: 24, color: CBG[i % 5], a: ba * a, tail: 0 }) })
            }
            if (t > B.catch) { K.bubble(x, 'tell me more :)', 760, K.ACT_Y - 170, { size: 26, color: '#ff8fb1', s: K.pop01(t, B.catch, 0.3, 2.6) * a, tail: -1 }) }
          },
          cues: [...[0, 1, 2, 3, 4, 5, 6, 7].flatMap(i => [['pop', +(B.burst + i * 0.07).toFixed(2), 880 + i * 60, 0.022, (i % 2 ? 0.3 : -0.3)], ['pop', +(B.burst2 + i * 0.07).toFixed(2), 987.77 + i * 50, 0.022, (i % 2 ? -0.3 : 0.3)]]), ['glitter', B.catch, B.catch + 0.4], ['pop', B.catch, 1318.51, 0.04, 0.3]],
        }
      } },
    { lines: ['you need someone who keeps up with your brain…', '…and likes you when you’re *quiet* too.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, race: C + 1.2, quiet: C + 6.9, sit: C + 8.0, lean: C + 10.6, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            // a race of thoughts: Gemini and them bouncing ideas like a ping-pong ball
            if (t < B.quiet) {
              const ph = ((t - B.race) * 1.4) % 2, p = ph < 1 ? ph : 2 - ph
              const bx = K.lerp(400, 680, p), by = K.ACT_Y - 120 - Math.sin(Math.PI * p) * 160
              if (t > B.race) { K.drawBits(x, ['.YY.', 'YQQY', 'YQQY', '.YY.'], K.COL, bx, by, 9 * a); K.label(x, 'IDEA!', bx, by - 50, 28, '#ffd34d', 0.8 * a) }
            }
            const sitP = K.ease.inOutCubic(K.prog(t, B.sit, B.sit + 0.8))
            if (t > B.quiet) { const bp = K.pop01(t, B.quiet, 0.4, 2.4) * a; x.save(); x.translate(540, K.GROUND - 40); x.scale(bp, bp); x.fillStyle = K.INK; x.fillRect(-220, -60, 440, 40); x.fillRect(-200, -20, 24, 60); x.fillRect(176, -20, 24, 60); x.fillStyle = '#7fb0e6'; x.fillRect(-214, -54, 428, 28); x.restore() }
            const lean = t > B.lean ? 10 * K.ease.outCubic(K.prog(t, B.lean, B.lean + 0.5)) : 0
            K.mini(x, t, { x: K.lerp(300, 450, sitP) + lean, y: K.lerp(K.ACT_Y, K.ACT_Y - 70, sitP), size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.quiet ? (t > B.lean ? 'happy' : 'neutral') : 'sparkle', look: [1, 0], seed: 4, pop: a, hops: t < B.quiet ? [C + 2, C + 3.4, C + 4.8] : [] })
            K.mini(x, t, { x: K.lerp(780, 630, sitP) - lean, y: K.lerp(K.ACT_Y, K.ACT_Y - 70, sitP), size: 145, color: K.THEM, mood: t > B.lean ? 'heart' : 'happy', look: [-1, 0], seed: 9, pop: a, hops: t < B.quiet ? [C + 2.7, C + 4.1, C + 5.5] : [] })
            if (t > B.sit + 0.6) K.label(x, '. . .', 540, 980, 60, 'rgba(239,230,214,0.8)', K.pop01(t, B.sit + 0.6, 0.3, 2) * a * (1 - K.prog(t, B.lean - 0.3, B.lean)))
            if (t > B.lean) K.label(x, 'nice quiet.', 540, 980, 44, '#9fe6b0', K.pop01(t, B.lean, 0.3, 3) * a)
          },
          cues: [...Array.from({ length: 8 }, (_, i) => ['tick', +(B.race + i * 0.714).toFixed(2), 0.03]), ['pop', B.quiet, 587.33, 0.035, 0], ['whoosh', B.sit, 0.3, 0.025], ['pluck', B.lean, 880, 0.035, 0.5, 0], ['glitter', B.lean, B.lean + 0.4]],
        }
      } },
    { lines: ['you keep it light so it never gets *real*.', '“lol” is a lovely word. it’s not a *feeling*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, fall: C + 9.4, oops: C + 10.4, out: C + 14.6 }
        const STACK = ['lol', 'haha', 'anyway', 'lmao', 'jk', 'lol', 'haha ok', 'anyway!!', 'lol']
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 270, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.oops ? 'wide' : 'happy', look: [1, -0.5], seed: 4, pop: a, hops: [B.fall] })
            K.mini(x, t, { x: 800, y: K.ACT_Y, size: 150, color: K.THEM, mood: 'neutral', look: [-1, -0.5], seed: 9, pop: a })
            const fall = K.prog(t, B.fall, B.fall + 1)
            STACK.forEach((w, i) => {
              const bt = C + 1.2 + i * 0.8; if (t < bt) return
              const drop = 1 - K.ease.outCubic(K.prog(t, bt, bt + 0.3))
              const wob = Math.sin(t * 3 + i) * i * 2.2 * (t > C + 6 ? 1.6 : 1)
              const fx = fall * (i % 2 ? 1 : -1) * (80 + i * 40), fy = fall * fall * (500 - i * 30)
              K.bubble(x, w, 540 + wob + fx, K.GROUND - 34 - i * 58 - drop * 400 + Math.max(0, fy), { size: 26, color: CBG[i % 5], tail: 0, a: a * (1 - K.prog(t, B.fall + 0.6, B.fall + 1.2)) })
            })
            K.label(x, 'TOO LIGHT?!', 540, 840, 54, '#ff4d6d', K.pop01(t, B.fall, 0.3, 3) * a * (1 - K.prog(t, B.fall + 2.4, B.fall + 2.8)))
            if (t > B.oops) K.bubble(x, 'can I say a real thing?', 520, K.ACT_Y - 170, { size: 26, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.oops + 0.8, 0.3, 2.6) * a })
          },
          cues: [...STACK.map((_, i) => ['pop', +(C + 1.2 + i * 0.8 + 0.25).toFixed(2), 659.25 + i * 50, 0.025, (i % 2 ? 0.2 : -0.2)]), ['boom', B.fall, 0.12], ['whoosh', B.fall, 0.7, 0.05], ['pop', B.oops + 0.8, 1174.66, 0.035, -0.2]],
        }
      } },
    { lines: ['this week: one *real* call. just one.', 'no typing. let them *hear* you laugh.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, pop: C + 2.0, ring: C + 4.6, answer: C + 7.4, laugh: C + 9.2 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            K.mini(x, t, { x: 320, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.laugh ? 'sparkle' : t > B.answer ? 'happy' : 'neutral', look: [1, 0], squash: t > B.laugh ? 0.06 * Math.abs(Math.sin(t * 14)) : 0, seed: 4, pop: a, hops: t > B.laugh ? [B.laugh, B.laugh + 0.7, B.laugh + 1.4, B.laugh + 2.1] : [B.ring] })
            K.mini(x, t, { x: 760, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.laugh ? 'sparkle' : t > B.answer ? 'happy' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: t > B.laugh ? [B.laugh + 0.35, B.laugh + 1.05, B.laugh + 1.75] : [] })
            // eleven bubbles pop one by one, leaving one
            for (let i = 0; i < 12; i++) {
              const pt = B.pop + i * 0.2
              if (i < 11 && t > pt + 0.15) continue
              const ang = i * Math.PI * 2 / 12 + t * 0.6
              const s = i < 11 ? 1 + 0.4 * K.prog(t, pt, pt + 0.15) : 1
              if (i === 11 && t > B.ring) continue
              K.bubble(x, WORDS[i], 540 + Math.cos(ang) * 300, 950 + Math.sin(ang) * 120, { size: 24, color: CBG[i % 5], tail: 0, s: s * a, a: a * (i < 11 ? 1 - K.prog(t, pt, pt + 0.15) : 1) })
            }
            if (t > B.ring) {
              const ringing = t < B.answer
              const wig = ringing ? Math.sin(t * 40) * 0.08 : 0
              K.phone(x, 540, 960, 0.55 * K.pop01(t, B.ring, 0.3, 2.4), { header: ringing ? 'CALLING…' : '0:' + String(Math.floor(t - B.answer)).padStart(2, '0'), rows: [{ text: ringing ? 'THEM' : 'HAHAHA', center: true, color: ringing ? '#3fae6a' : '#e8b42c', ink: K.INK }], rot: wig, glow: ringing ? 0.8 : 0.4 })
            }
            if (t > B.laugh) { K.label(x, 'HA', 250, K.ACT_Y - 180 - (t - B.laugh) * 20, 48, '#ffd34d', 1 - K.prog(t, B.laugh + 2, B.laugh + 2.6)); K.label(x, 'HA!', 820, K.ACT_Y - 200 - (t - B.laugh) * 16, 44, '#ffd34d', 1 - K.prog(t, B.laugh + 2.2, B.laugh + 2.8)); K.sparkles(x, t, 540, K.ACT_Y - 80, B.laugh, 12, 220, 7) }
          },
          cues: [...Array.from({ length: 11 }, (_, i) => ['pop', +(B.pop + i * 0.2).toFixed(2), 1567.98 - i * 60, 0.03, (i % 2 ? 0.3 : -0.3)]), ...Array.from({ length: 3 }, (_, i) => ['pluck', +(B.ring + i * 0.9).toFixed(2), 1318.51, 0.035, 0.2, 0]), ['pop', B.answer, 880, 0.04, 0], ['glitter', B.laugh, B.laugh + 0.6], ['pop', B.laugh, 1174.66, 0.035, -0.3], ['pop', B.laugh + 0.35, 1318.51, 0.035, 0.3]],
        }
      } },
  ],
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
