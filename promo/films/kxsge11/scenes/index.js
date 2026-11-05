// kxsge11 · Your Star Guide: Extended · ♒ The Aquarius Guide: Gone Quiet · hard cut
//   HOOK   Aquarius mid-teleport out of a conversation, pixels scattering, headphones flying on; a glitch error dialog.
//   ch1    HOW YOU LOVE: Aquarius builds a weird little robot that rolls over holding a sign: HI.
//   ch2    WHAT YOU NEED: two stars in matching odd hats; the hats get taller each beat.
//   ch3    WHERE IT GETS HARD: headphones on; a whiteboard of theories about the feeling fills up; the other star waits.
//   ch4    TRY THIS WEEK: headphones off: "I need a minute. I'll be back." A timer; Aquarius comes back. Hug.
//   Last line: "Come back. They're waiting."
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const GL = { at: 0.5, len: 1.3, text: 'AQUARIUS has gone quiet', buttons: ['WAIT', 'COME BACK'] }
const ODD = ['..TTT..', '.TTTTT.', '..TTT..', '.TTTTT.', 'TTTTTTT']
function scatter(K, x, t, cx, cy, n, spread, col, seed = 1) {
  for (let i = 0; i < n; i++) {
    const r1 = Math.abs(Math.sin(i * 12.9898 + seed) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + seed) * 24634.63) % 1
    const ang = r1 * Math.PI * 2, d = spread * (0.3 + r2) + Math.sin(t * 3 + i) * 10
    x.fillStyle = i % 3 ? col : '#ffffff'; x.globalAlpha = 0.85; x.fillRect(cx + Math.cos(ang) * d, cy + Math.sin(ang) * d * 0.8, 10 + r2 * 8, 10 + r2 * 8); x.globalAlpha = 1
  }
}
const F = guideXFilm({
  id: 'kxsge11', sign: 'aquarius',
  hook: 'AQUARIUS. MID-FEELING. | *VANISHED.*',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'AQUARIUS: FIXED AIR,|RULED BY SATURN AND URANUS', chipCh: 0,
  last: 'Come back. | They’re *waiting.*', late: 2, ending: 'cut',
  hookScene: K => ({
    fx: [{ scene: HK.glitch(GL), cues: HK.glitchCues(GL) }],
    draw(x, t) {
      // the other star mid-sentence on the left
      K.mini(x, t, { x: 250, y: 1200, size: 190, color: K.THEM, mood: 'wide', look: [1, 0], seed: 9 })
      K.bubble(x, 'so… how do you feel?', 300, 980, { size: 32, color: '#6f5bd6' })
      // Aquarius dissolving into pixels on the right, headphones flying onto its head
      const fade = 0.55 + 0.25 * Math.sin(t * 9)
      x.save(); x.globalAlpha = fade
      K.mini(x, t, { x: 740, y: 1160, size: 260, color: K.ME.color, glyph: K.ME.glyph, mood: 'squint', look: [-1, 0], seed: 4, bob: 0 })
      x.restore()
      scatter(K, x, t, 740, 1140, 40, 230 + 20 * Math.sin(t * 4), K.ME.color, 3)
      K.drawBits(x, K.BM.HEADPH, K.COL, 740 + Math.sin(t * 6) * 10, 990 - 30 * Math.abs(Math.sin(t * 3)), 16)
      K.label(x, 'USER HAS GONE QUIET', 540, 1480, 40, '#7fe0ff')
    },
    cues: [['whoosh', 0.05, 0.5, 0.04], ['pop', 0.2, 523.25, 0.03, 0.3]],
  }),
  chapters: [
    { lines: ['you love in big, strange, *brilliant* ideas.', 'you’d build a robot just to say *hi*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, build: C + 1.2, roll: C + 7.2, arrive: C + 9.0, laugh: C + 9.8, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 260, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.laugh ? 'heart' : 'sparkle', look: [1, 0], seed: 4, pop: a, hops: [B.build + 1, B.build + 2.5, B.build + 4, B.roll] })
            K.mini(x, t, { x: 820, y: K.ACT_Y, size: 145, color: K.THEM, mood: t > B.laugh ? 'heart' : t > B.arrive ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.arrive + 0.2, B.laugh] })
            const parts = Math.min(7, Math.floor(K.prog(t, B.build, B.roll - 0.6) * 7) + 1)
            const rx = t < B.roll ? 420 : K.lerp(420, 680, K.ease.inOutCubic(K.prog(t, B.roll, B.arrive)))
            const rows = K.BM.ROBOT.slice(K.BM.ROBOT.length - parts)
            if (t > B.build) K.drawBits(x, rows, K.COL, rx, K.GROUND - 20 - rows.length * 5 - (t > B.roll && t < B.arrive ? Math.abs(Math.sin(t * 12)) * 8 : 0), 10 * a)
            if (t > B.build && t < B.roll) for (let i = 0; i < 3; i++) { const ph = (t * 1.6 + i / 3) % 1; x.fillStyle = '#ffd34d'; x.globalAlpha = (1 - ph) * a; x.fillRect(rx - 40 + i * 40, K.GROUND - 140 - ph * 70, 8, 8); x.globalAlpha = 1 }
            if (t > B.roll - 0.4) K.banner(x, 'HI', rx, K.GROUND - 220, { size: 40, s: K.pop01(t, B.roll - 0.4, 0.3, 2.6) * a, color: '#f5eedf', ink: K.INK, border: K.ME.color })
            if (t > B.laugh) K.label(x, 'this is the best hi ever', 680, 900, 34, '#9fe6b0', K.pop01(t, B.laugh, 0.3, 3) * a)
          },
          cues: [...Array.from({ length: 7 }, (_, i) => ['tick', +(B.build + i * 0.8).toFixed(2), 0.035]), ['pop', B.roll - 0.4, 1174.66, 0.04, 0], ['whoosh', B.roll, 0.8, 0.03], ['glitter', B.laugh, B.laugh + 0.5]],
        }
      } },
    { lines: ['you need someone who’s your *best friend* first…', '…and wears the *weird hat* with you.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, h1: C + 1.6, h2: C + 4.2, h3: C + 7.4, h4: C + 9.4, pose: C + 11.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const lvl = [B.h1, B.h2, B.h3, B.h4].filter(h => t > h).length
            for (const [px, sd, col, gl, hs] of [[380, 4, K.ME.color, K.ME.glyph, [B.h1, B.h3, B.pose]], [700, 9, K.THEM, null, [B.h2, B.h4, B.pose + 0.1]]]) {
              const r = K.mini(x, t, { x: px, y: K.ACT_Y, size: 150, color: col, glyph: gl, mood: t > B.pose ? 'sparkle' : 'happy', look: [px < 540 ? 1 : -1, 0], seed: sd, pop: a, hops: hs })
              const mine = px < 540 ? Math.ceil(lvl / 2) : Math.floor(lvl / 2)
              for (let k = 0; k < mine; k++) K.drawBits(x, ODD, { T: ['#3ce6cf', '#ff8fb1'][k % 2] }, px, (r && r.top ? r.top : K.ACT_Y - 80) - 14 - k * 34, 6 * a)
            }
            if (t > B.pose) { K.label(x, 'MATCHING. OBVIOUSLY.', 540, 900, 38, '#ffd34d', K.pop01(t, B.pose, 0.3, 3) * a); K.sparkles(x, t, 540, K.ACT_Y - 120, B.pose, 12, 200, 3) }
          },
          cues: [['pop', B.h1, 987.77, 0.035, -0.3], ['pop', B.h2, 1108.73, 0.035, 0.3], ['pop', B.h3, 1174.66, 0.035, -0.3], ['pop', B.h4, 1318.51, 0.035, 0.3], ['glitter', B.pose, B.pose + 0.5]],
        }
      } },
    { lines: ['you *explain* feelings instead of feeling them.', 'a theory isn’t a *hug*. they’re still there.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, phones: C + 1.0, board: C + 1.8, wait: C + 7.2, sigh: C + 10.4, out: C + 14.6 }
        const TH = ['feelings = data?', 'if A then… hmm', 'see: chart 3', 'hypothesis: fine', 'error: too real']
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: 'squint', look: [0, -1], seed: 4, pop: a, hops: [B.phones] })
            K.drawBits(x, K.BM.HEADPH, K.COL, 300, K.ACT_Y - 70, 10 * K.pop01(t, B.phones, 0.3, 3) * a)
            K.mini(x, t, { x: 820, y: K.ACT_Y, size: 140, color: K.THEM, mood: t > B.sigh ? 'neutral' : 'happy', look: [-1, 0], seed: 9, pop: a, tears: t > B.sigh ? 1 : 0 })
            const bp = K.pop01(t, B.board, 0.35, 2.4) * a
            if (bp > 0.01) {
              x.save(); x.translate(500, 980); x.scale(bp, bp); x.fillStyle = K.INK; x.fillRect(-230, -130, 460, 260); x.fillStyle = '#f5f8ff'; x.fillRect(-222, -122, 444, 244)
              x.font = '700 24px Space Mono, monospace'; x.fillStyle = '#3a6bd6'; x.textAlign = 'left'
              const n = Math.min(5, Math.floor((t - B.board) * 0.9) + 1)
              TH.slice(0, n).forEach((s, i) => x.fillText(s, -200, -80 + i * 44)); x.restore()
            }
            if (t > B.wait) { const dots = '.'.repeat(1 + Math.floor((t * 2) % 3)); K.bubble(x, 'still there' + dots, 800, K.ACT_Y - 170, { size: 24, color: '#6f5bd6', s: K.pop01(t, B.wait, 0.3, 2.6) * a, tail: -1 }) }
          },
          cues: [['pop', B.phones, 523.25, 0.035, -0.3], ...Array.from({ length: 5 }, (_, i) => ['tick', +(B.board + i / 0.9).toFixed(2), 0.04]), ['pop', B.wait, 739.99, 0.03, 0.3], ['pluck', B.sigh, 587.33, 0.03, 0.7, 0.3]],
        }
      } },
    { lines: ['this week: say “I need a *minute*.”', 'then *come back*. that’s the whole promise.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, off: C + 1.6, say: C + 2.6, away: C + 4.4, timer: C + 5.0, back: C + 8.6, hug: C + 9.8 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            const gone = K.ease.inOutCubic(K.prog(t, B.away, B.away + 0.8)) * (1 - K.ease.inOutCubic(K.prog(t, B.back, B.back + 0.8)))
            const hugP = K.ease.inOutCubic(K.prog(t, B.hug, B.hug + 0.5))
            K.mini(x, t, { x: K.lerp(K.lerp(320, 140, gone), 560, hugP), y: K.ACT_Y, size: K.lerp(150, 110, gone), color: K.ME.color, glyph: K.ME.glyph, mood: t > B.hug ? 'heart' : t > B.off ? 'happy' : 'squint', look: [1, 0], seed: 4, pop: a, hops: [B.off, B.back + 0.8, B.hug] })
            if (t < B.off + 0.6) { const p = K.prog(t, B.off, B.off + 0.6); K.drawBits(x, K.BM.HEADPH, K.COL, 320 - p * 120, K.ACT_Y - 70 - Math.sin(Math.PI * p) * 120, 10 * a, { alpha: 1 - p }) }
            K.mini(x, t, { x: K.lerp(780, 690, hugP), y: K.ACT_Y, size: 145, color: K.THEM, mood: t > B.hug ? 'heart' : t > B.say + 0.6 ? 'happy' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.say + 0.6, B.back + 0.9] })
            if (t > B.say && t < B.away + 0.4) K.bubble(x, 'I need a minute. I’ll be back.', 470, K.ACT_Y - 180, { size: 26, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.say, 0.3, 2.6) * a })
            if (t > B.timer && t < B.back + 0.6) {
              const secs = Math.min(60, Math.floor(K.prog(t, B.timer, B.back) * 60))
              K.label(x, `0:${String(secs).padStart(2, '0')}`, 540, 940, 60, '#7fe0ff', K.pop01(t, B.timer, 0.3, 3) * a)
              K.label(x, '(a breather)', 540, 1010, 30, BONE(K), a)
            }
            if (t > B.back + 0.6 && t < B.hug + 2) K.bubble(x, 'ok. I’m back. I felt hurt.', 470, K.ACT_Y - 180, { size: 26, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.back + 0.6, 0.3, 2.6) * a })
            if (t > B.hug) { K.heart(x, 625, K.ACT_Y - 170 - (t - B.hug) * 16, 9 * K.pop01(t, B.hug, 0.35, 3)); K.sparkles(x, t, 625, K.ACT_Y - 70, B.hug, 14, 220, 6) }
          },
          cues: [['whoosh', B.off, 0.3, 0.03], ['pop', B.say, 1174.66, 0.035, -0.3], ['whoosh', B.away, 0.5, 0.03], ...Array.from({ length: 4 }, (_, i) => ['tick', +(B.timer + i * 0.9).toFixed(2), 0.03]), ['whoosh', B.back, 0.5, 0.03], ['pop', B.back + 0.6, 987.77, 0.035, -0.3], ['glitter', B.hug, B.hug + 0.6], ['pop', B.hug, 1318.51, 0.045, 0]],
        }
      } },
  ],
})
function BONE(K) { return K.BONE }
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
