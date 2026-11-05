// kxsge02 · Your Star Guide: Extended · ♉ The Taurus Guide: Slow, Sure, Stubborn · loop
//   HOOK   Taurus mid-flop into a beanbag, the phone flying up, a notification "3 days, no text" frozen mid-air; shake.
//   ch1    HOW YOU LOVE: the same snack every Friday, a calendar of hearts.
//   ch2    WHAT YOU NEED: a sturdy bench for two; the other star sits, and stays.
//   ch3    WHERE IT GETS HARD: a brick wall builds up while Taurus waits for them to text first.
//   ch4    TRY THIS WEEK: Taurus pulls one brick and texts first: "hi. thinking of you." A heart comes back.
//   Last line: "Text first. The wall can wait."  Loops back into the flop.
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const SHAKE = { at: 0.35, len: 0.5, amp: 22 }
const F = guideXFilm({
  id: 'kxsge02', sign: 'taurus',
  hook: 'TAURUS IS WAITING | FOR THEM TO *TEXT.*',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'TAURUS: FIXED EARTH,|RULED BY VENUS', chipCh: 0,
  last: 'Text first. | The *wall* can wait.', late: 3, ending: 'loop',
  hookScene: K => ({
    fx: [{ scene: HK.screenShake(SHAKE), cues: HK.shakeCues(SHAKE) }],
    draw(x, t) {
      // the beanbag
      const sq = 0.25 + 0.12 * Math.exp(-t * 3) * Math.cos(t * 16)
      x.save(); x.fillStyle = '#1b1236'; x.beginPath(); x.ellipse(540, 1250, 330, 130 * (1 - sq * 0.3), 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#8c6bd6'; x.beginPath(); x.ellipse(540, 1250, 318, 118 * (1 - sq * 0.3), 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#a98af0'; x.beginPath(); x.ellipse(500, 1215, 200, 50, -0.1, 0, Math.PI * 2); x.fill(); x.restore()
      K.mini(x, t, { x: 540, y: 1110, size: 300, color: K.ME.color, glyph: K.ME.glyph, mood: 'neutral', look: [0, -1], squash: 0.22, seed: 4, bob: 0, blink: 0 })
      // the phone, frozen mid-air with the notification
      const py = 700 + Math.sin(t * 2.5) * 10
      K.phone(x, 540, py, 0.7, { header: 'TODAY', rows: [{ text: 'no new messages', center: true, color: '#3a3168' }], rot: -0.25 + Math.sin(t * 1.7) * 0.04, glow: 0.5 })
      K.stamp(x, t, -0.3, '3 DAYS. NO TEXT.', 540, 920, { size: 46, color: '#ff4d6d', rot: 0.06 })
      x.fillStyle = 'rgba(255,214,140,0.7)'
      for (let i = 0; i < 4; i++) x.fillRect(430 + i * 70, 960 + (i % 2) * 20, 8, 40)
    },
    cues: [['boom', 0.03, 0.14], ['pop', 0.05, 392, 0.04, 0], ['tick', 1.0, 0.04], ['tick', 1.5, 0.04], ['tick', 2.0, 0.04]],
  }),
  chapters: [
    { lines: ['you love by showing up the *same way* twice.', 'every friday. same snack. *their* favorite.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, give: C + 2.2, cal: C + 4.0, more: C + 8.0, hug: C + 11.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 330, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.hug ? 'heart' : 'happy', look: [1, 0], seed: 4, pop: a, hops: [B.give, B.more, B.hug] })
            K.mini(x, t, { x: 740, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.give + 0.6 ? 'happy' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.give + 0.6, B.hug] })
            // the snack: a cup handed over
            const p = K.prog(t, B.give, B.give + 0.6), cx = K.lerp(420, 650, K.ease.inOutCubic(p))
            if (t > B.in) K.drawBits(x, K.BM.CUP, K.COL, cx, K.ACT_Y - 30 - Math.sin(Math.PI * p) * 60, 6 * a)
            // the calendar: every Friday gets a heart, one after another
            const cp = K.pop01(t, B.cal, 0.35, 2.4) * a
            if (cp > 0.01) {
              x.save(); x.globalAlpha *= Math.min(1, cp); x.translate(540, 990); x.scale(cp, cp)
              x.fillStyle = K.INK; x.fillRect(-250, -90, 500, 180); x.fillStyle = '#f5eedf'; x.fillRect(-244, -84, 488, 168); x.fillStyle = '#e2453c'; x.fillRect(-244, -84, 488, 36)
              x.font = '800 24px Inter'; x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText('FRIDAYS', 0, -58)
              const n = Math.min(8, Math.floor((t - B.cal) * 1.3) + 1)
              for (let i = 0; i < 8; i++) { const gx = -210 + (i % 4) * 140, gy = -10 + Math.floor(i / 4) * 64; x.fillStyle = '#d8cdb8'; x.fillRect(gx - 4, gy - 22, 72, 50); if (i < n) K.heart(x, gx + 32, gy + 3, 5) }
              x.restore()
            }
          },
          cues: [['pop', B.give, 880, 0.035, 0], ['pop', B.cal, 739.99, 0.03, 0], ...Array.from({ length: 8 }, (_, i) => ['pop', +(B.cal + i / 1.3).toFixed(2), 987.77 + i * 40, 0.022, 0.2]), ['glitter', B.hug, B.hug + 0.4]],
        }
      } },
    { lines: ['you need someone who means it *the boring way*.', 'not fireworks. a *bench* that holds two.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, fw: C + 1.8, bench: C + 6.8, sit: C + 8.6, lean: C + 11.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            // fireworks fizzle out (sparkles, then gone) → the bench
            if (t > B.fw && t < B.bench) { K.sparkles(x, t, 400, 960, B.fw, 12, 160, 2); K.sparkles(x, t, 680, 920, B.fw + 1.4, 12, 160, 4); K.label(x, 'fireworks?', 540, 1040, 44, '#ffd34d', K.pop01(t, B.fw, 0.3, 3) * (1 - K.prog(t, B.bench - 0.6, B.bench))) }
            const bp = K.pop01(t, B.bench, 0.4, 2.4) * a
            if (bp > 0.01) { x.save(); x.translate(540, K.GROUND - 40); x.scale(bp, bp); x.fillStyle = K.INK; x.fillRect(-220, -60, 440, 40); x.fillRect(-200, -20, 24, 60); x.fillRect(176, -20, 24, 60); x.fillStyle = '#c08552'; x.fillRect(-214, -54, 428, 28); x.fillStyle = '#8a5a33'; x.fillRect(-194, -20, 12, 54); x.fillRect(182, -20, 12, 54); x.restore() }
            const sitP = K.ease.inOutCubic(K.prog(t, B.sit, B.sit + 0.8))
            const lean = t > B.lean ? 12 * K.ease.outCubic(K.prog(t, B.lean, B.lean + 0.5)) : 0
            K.mini(x, t, { x: K.lerp(240, 450, sitP) + lean, y: K.lerp(K.ACT_Y, K.ACT_Y - 70, sitP), size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.lean ? 'heart' : 'happy', look: [1, 0], squash: sitP * 0.15, seed: 4, pop: a })
            K.mini(x, t, { x: K.lerp(840, 630, sitP) - lean, y: K.lerp(K.ACT_Y, K.ACT_Y - 70, sitP), size: 145, color: K.THEM, mood: t > B.lean ? 'heart' : 'happy', look: [-1, 0], squash: sitP * 0.15, seed: 9, pop: a })
            if (t > B.lean) K.heart(x, 540, K.ACT_Y - 220 - (t - B.lean) * 15, 8 * K.pop01(t, B.lean, 0.35, 3), 1 - K.prog(t, B.lean + 2.6, B.lean + 3.2))
          },
          cues: [['pop', B.fw, 1567.98, 0.03, -0.3], ['pop', B.fw + 1.4, 1318.51, 0.03, 0.3], ['boom', B.bench, 0.08], ['pop', B.bench, 587.33, 0.04, 0], ['whoosh', B.sit, 0.4, 0.03], ['tick', B.sit + 0.8, 0.04], ['glitter', B.lean, B.lean + 0.5]],
        }
      } },
    { lines: ['you dig in. even when you’d *rather talk*.', 'waiting for them to text first is a *wall*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, out: C + 14.6 }
        const brickT = i => C + 1.6 + i * 0.75
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t < C + 9 ? 'squint' : 'neutral', look: [1, 0], seed: 4, pop: a, hops: [C + 6.9] })
            K.mini(x, t, { x: 780, y: K.ACT_Y, size: 150, color: K.THEM, mood: 'neutral', look: [-1, 0], seed: 9, pop: a })
            // the wall rises between them, one brick at a time
            for (let i = 0; i < 14; i++) {
              const bt = brickT(i); if (t < bt) continue
              const row = Math.floor(i / 2), col = i % 2
              const drop = 1 - K.ease.outCubic(K.prog(t, bt, bt + 0.25))
              K.drawBits(x, K.BM.BRICK, K.COL, 540 + (col ? 30 : -30) + (row % 2 ? 15 : 0), K.GROUND - 22 - row * 48 - drop * 300, 5 * a)
            }
            // both phones, both waiting
            const ph = K.pop01(t, C + 3, 0.35, 2.4) * a
            K.phone(x, 210, 930, 0.42 * ph, { header: 'THEM', rows: [{ text: '…', center: true }] })
            K.phone(x, 870, 930, 0.42 * ph, { header: 'TAURUS', rows: [{ text: '…', center: true }] })
            K.label(x, 'they’re waiting too.', 540, 820, 44, '#ffd34d', K.pop01(t, C + 9.4, 0.3, 3) * a)
          },
          cues: [...Array.from({ length: 14 }, (_, i) => ['tick', +brickT(i).toFixed(2) + 0.2, 0.04]), ['pop', C + 3, 659.25, 0.03, 0], ['pluck', C + 9.4, 880, 0.035, 0.5, 0]],
        }
      } },
    { lines: ['this week: *text first*. once.', '“hi. thinking of you.” it costs *nothing*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, pull: C + 2.2, type: C + 4.0, send: C + 7.6, reply: C + 9.2, down: C + 10.4 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.reply ? 'heart' : t > B.pull ? 'happy' : 'squint', look: [1, 0], seed: 4, pop: a, hops: [B.pull, B.send, B.reply] })
            K.mini(x, t, { x: 780, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.send + 0.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.send + 0.4, B.down + 0.5] })
            // the wall: one brick pulled, then the whole thing tumbles down at the reply
            const fall = K.prog(t, B.down, B.down + 0.9)
            for (let i = 0; i < 14; i++) {
              if (i === 13 && t > B.pull) continue
              const row = Math.floor(i / 2), col = i % 2
              const dx = fall * (col ? 1 : -1) * (60 + row * 30), dy = fall * fall * 400
              K.drawBits(x, K.BM.BRICK, K.COL, 540 + (col ? 30 : -30) + (row % 2 ? 15 : 0) + dx, K.GROUND - 22 - row * 48 + Math.min(dy, row * 48), 5 * a, { alpha: 1 - K.prog(t, B.down + 0.6, B.down + 1.2), rot: fall * (col ? 0.6 : -0.6) })
            }
            if (t > B.pull && t < B.down) K.drawBits(x, K.BM.BRICK, K.COL, K.lerp(570, 380, K.prog(t, B.pull, B.pull + 0.5)), K.ACT_Y - 120, 5 * a)
            const typed = 'hi. thinking of you.'.slice(0, Math.floor(Math.max(0, t - B.type) * 7))
            const pp = K.pop01(t, B.type - 0.3, 0.35, 2.4) * a
            K.phone(x, 540, 920, 0.6 * pp, { header: 'THEM', rows: t > B.send ? [{ text: 'hi. thinking of you.', me: true }, ...(t > B.reply ? [{ text: 'omg me too!!' }] : [])] : [{ text: typed + (t % 0.6 < 0.3 ? '|' : ''), me: true, color: '#3a3168' }] })
            K.stamp(x, t, B.send, 'SENT', 700, 1000, { size: 40, color: '#ffd34d', life: 1.4 })
            if (t > B.reply) { K.heart(x, 540, 760 - (t - B.reply) * 18, 9 * K.pop01(t, B.reply, 0.35, 3)); K.sparkles(x, t, 540, 900, B.reply, 12, 180, 6) }
          },
          cues: [['pop', B.pull, 523.25, 0.04, -0.3], ['tick', B.pull + 0.5, 0.04], ...Array.from({ length: 10 }, (_, i) => ['tick', +(B.type + i * 0.29).toFixed(2), 0.015]), ['whoosh', B.send, 0.3, 0.04], ['pop', B.send, 1174.66, 0.04, 0], ['pop', B.reply, 1318.51, 0.045, 0.2], ['boom', B.down, 0.1], ['glitter', B.down, B.down + 0.6]],
        }
      } },
  ],
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
