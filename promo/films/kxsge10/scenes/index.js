// kxsge10 · Your Star Guide: Extended · ♑ The Capricorn Guide: Single at the Dinner · loop
//   HOOK   Capricorn at a family dinner table, a giant "SO, SEEING ANYONE?" flying at them, a laptop raised as a shield; shake.
//   ch1    HOW YOU LOVE: at dawn Capricorn shovels a clear path to someone's door, then tiptoes off.
//   ch2    WHAT YOU NEED: two mountain flags planted side by side on two little peaks.
//   ch3    WHERE IT GETS HARD: an inbox counter climbs and the emails pile over a little heart.
//   ch4    TRY THIS WEEK: the laptop closes at 7:00; Capricorn texts someone they like; then the dinner question comes back
//          and Capricorn just smiles: "not yet. I'm good."
//   Last line: "Not yet. And that's fine."  Loops back into the dinner.
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const SHAKE = { at: 0.3, len: 0.55, amp: 22 }
function table(K, x, cx, cy, w, a = 1) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha *= a
  x.fillStyle = K.INK; x.fillRect(cx - w / 2 - 6, cy - 6, w + 12, 40); x.fillStyle = '#f5eedf'; x.fillRect(cx - w / 2, cy, w, 28)
  x.fillStyle = '#e2453c'; for (let i = 0; i < w; i += 40) x.fillRect(cx - w / 2 + i, cy + 28, 20, 14)
  x.fillStyle = K.INK; x.fillRect(cx - w / 2 + 20, cy + 30, 16, 110); x.fillRect(cx + w / 2 - 36, cy + 30, 16, 110)
  x.restore()
}
const F = guideXFilm({
  id: 'kxsge10', sign: 'capricorn',
  hook: 'CAPRICORN. *“SO, SEEING* | *ANYONE?”*',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'CAPRICORN: CARDINAL EARTH,|RULED BY SATURN', chipCh: 0,
  last: 'Not yet. | And that’s *fine.*', late: 2, ending: 'loop',
  hookScene: K => ({
    fx: [{ scene: HK.screenShake(SHAKE), cues: HK.shakeCues(SHAKE) }],
    draw(x, t) {
      table(K, x, 540, 1240, 900)
      // the relatives (side stars) leaning in
      K.mini(x, t, { x: 190, y: 1140, size: 150, color: '#ffb38a', mood: 'sparkle', look: [1, 0], seed: 11 })
      K.mini(x, t, { x: 890, y: 1140, size: 150, color: '#9fe6b0', mood: 'sparkle', look: [-1, 0], seed: 12 })
      K.mini(x, t, { x: 540, y: 1120, size: 230, color: K.ME.color, glyph: K.ME.glyph, mood: 'wide', look: [0, -1], squash: 0.12, seed: 4, bob: 0 })
      K.drawBits(x, K.BM.LAPTOP, K.COL, 540, 1010 + Math.sin(t * 10) * 4, 22)
      // the question flying in
      const z = 1 + 0.25 * Math.sin(t * 4)
      K.bubble(x, 'SO, SEEING ANYONE?', 540, 800, { size: 52, color: '#ff8fb1', ink: K.INK, s: z })
      K.drawBits(x, ['YYYYYY', 'Y.YY.Y', 'YYYYYY'], K.COL, 440, 1220, 6); K.drawBits(x, ['YYYYYY', 'Y.YY.Y', 'YYYYYY'], K.COL, 640, 1220, 6)
    },
    cues: [['pop', 0.05, 1318.51, 0.035, 0], ['tick', 0.2, 0.05]],
  }),
  chapters: [
    { lines: ['you love by *showing up*. reliably.', 'you shovel their path before they’re *awake*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, dawn: C + 1.0, shovel: C + 2.0, done: C + 8.4, tiptoe: C + 9.0, door: C + 10.6, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            // snow on the ground, cleared behind the shovel
            const cleared = K.prog(t, B.shovel, B.done)
            x.save(); x.globalAlpha *= a; x.fillStyle = '#dfe7ff'
            for (let i = 0; i < 1080; i += 8) { const h = 18 + 6 * Math.sin(i * 0.05); const cx = 140 + cleared * 600; if (i > 140 && i < cx) continue; x.fillRect(i, K.GROUND - h, 8, h) }
            x.restore()
            // the door on the right
            x.save(); x.globalAlpha *= a; x.fillStyle = K.INK; x.fillRect(780, K.GROUND - 260, 180, 260); x.fillStyle = '#8a5a33'; x.fillRect(790, K.GROUND - 250, 160 - 120 * K.prog(t, B.door, B.door + 0.5), 250); x.fillStyle = '#ffd34d'; x.fillRect(930, K.GROUND - 130, 10, 10); x.restore()
            K.label(x, '6:00 AM', 540, 920, 44, '#ffd34d', K.pop01(t, B.dawn, 0.3, 3) * a * (1 - K.prog(t, B.done, B.done + 0.4)))
            const cx = t < B.done ? 140 + cleared * 600 : K.lerp(740, 300, K.ease.inOutCubic(K.prog(t, B.tiptoe, B.door)))
            K.mini(x, t, { x: cx - 40, y: K.ACT_Y, size: 145, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.door + 0.4 ? 'heart' : 'squint', look: [t > B.tiptoe ? -1 : 1, 0], seed: 4, pop: a, hops: t < B.done ? Array.from({ length: 8 }, (_, i) => B.shovel + i * 0.8) : [B.door + 0.4] })
            if (t < B.done) { x.save(); x.strokeStyle = '#9aa3b8'; x.lineWidth = 8; x.beginPath(); x.moveTo(cx + 20, K.ACT_Y); x.lineTo(cx + 90, K.GROUND - 10 - Math.abs(Math.sin(t * 4)) * 30); x.stroke(); x.restore(); const ph = (t * 1.25) % 1; x.fillStyle = '#f4f6ff'; x.globalAlpha = 1 - ph; x.fillRect(cx + 100 + ph * 60, K.GROUND - 40 - Math.sin(ph * Math.PI) * 120, 14, 14); x.globalAlpha = 1 }
            if (t > B.door) { K.mini(x, t, { x: 870, y: K.ACT_Y, size: 130, color: K.THEM, mood: 'heart', look: [-1, 0], seed: 9, pop: K.pop01(t, B.door + 0.2, 0.35, 2.4) * a }); K.label(x, 'who did this?!', 760, 960, 36, '#9fe6b0', K.pop01(t, B.door + 0.5, 0.3, 3) * a) }
          },
          cues: [['pop', B.dawn, 739.99, 0.03, 0], ...Array.from({ length: 8 }, (_, i) => ['tick', +(B.shovel + i * 0.8).toFixed(2), 0.03]), ['whoosh', B.tiptoe, 0.5, 0.025], ['pop', B.door, 587.33, 0.035, 0.4], ['glitter', B.door + 0.5, B.door + 1]],
        }
      } },
    { lines: ['you need someone with their *own* goals…', '…who cheers for yours. a *team*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, climb: C + 1.4, top: C + 5.2, flag: C + 5.8, wave: C + 8.4, link: C + 10.2, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            x.save(); x.globalAlpha *= a
            for (const [mx, col] of [[330, '#6c7489'], [750, '#8c78d6']]) { x.fillStyle = K.INK; x.beginPath(); x.moveTo(mx - 220, K.GROUND); x.lineTo(mx, K.GROUND - 300); x.lineTo(mx + 220, K.GROUND); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(mx - 206, K.GROUND - 4); x.lineTo(mx, K.GROUND - 290); x.lineTo(mx + 206, K.GROUND - 4); x.fill(); x.fillStyle = '#f4f6ff'; x.beginPath(); x.moveTo(mx - 50, K.GROUND - 220); x.lineTo(mx, K.GROUND - 290); x.lineTo(mx + 50, K.GROUND - 220); x.fill() }
            x.restore()
            const p = K.ease.inOutCubic(K.prog(t, B.climb, B.top))
            K.mini(x, t, { x: K.lerp(170, 330, p), y: K.lerp(K.ACT_Y, K.GROUND - 360, p), size: 120, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.wave ? 'heart' : 'squint', look: [1, -0.3], seed: 4, pop: a, hops: [B.flag, B.wave] })
            K.mini(x, t, { x: K.lerp(910, 750, p), y: K.lerp(K.ACT_Y, K.GROUND - 360, p), size: 115, color: K.THEM, mood: t > B.wave ? 'heart' : 'squint', look: [-1, -0.3], seed: 9, pop: a, hops: [B.flag + 0.3, B.wave + 0.2] })
            if (t > B.flag) { K.drawBits(x, K.BM.FLAG, { ...K.COL, P: K.ME.color }, 400, K.GROUND - 330, 7 * K.pop01(t, B.flag, 0.3, 3) * a); K.drawBits(x, K.BM.FLAG, { ...K.COL, P: '#b7a6f2' }, 820, K.GROUND - 330, 7 * K.pop01(t, B.flag + 0.3, 0.3, 3) * a) }
            if (t > B.wave) K.label(x, 'NICE CLIMB!', 540, 880, 40, '#ffd34d', K.pop01(t, B.wave, 0.3, 3) * a)
            if (t > B.link) { x.save(); x.globalAlpha *= a; x.strokeStyle = '#ff8fb1'; x.lineWidth = 6; x.setLineDash([12, 10]); x.lineDashOffset = -t * 40; x.beginPath(); x.moveTo(380, K.GROUND - 400); x.quadraticCurveTo(540, K.GROUND - 520, 700, K.GROUND - 400); x.stroke(); x.restore(); K.heart(x, 540, K.GROUND - 470, 7 * K.pop01(t, B.link, 0.35, 3) * a) }
          },
          cues: [['whoosh', B.climb, 1.4, 0.03], ['pop', B.flag, 1174.66, 0.04, -0.3], ['pop', B.flag + 0.3, 1318.51, 0.04, 0.3], ['pop', B.wave, 987.77, 0.035, 0], ['glitter', B.link, B.link + 0.5]],
        }
      } },
    { lines: ['you schedule love *after* the work.', 'it waits. it shouldn’t have to wait *forever*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, lap: C + 0.9, pile: C + 1.6, dig: C + 9.6, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 290, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.dig ? 'wide' : 'squint', look: t > B.dig ? [1, 0] : [0, 1], seed: 4, pop: a, hops: [B.dig] })
            K.drawBits(x, K.BM.LAPTOP, K.COL, 400, K.ACT_Y + 40, 10 * K.pop01(t, B.lap, 0.3, 2.4) * a)
            const n = Math.min(12, Math.floor(Math.max(0, t - B.pile) * 1.6))
            K.heart(x, 700, K.GROUND - 40, 7 * a)
            for (let i = 0; i < n; i++) { const dig = t > B.dig ? K.prog(t, B.dig + i * 0.08, B.dig + i * 0.08 + 0.5) : 0; K.drawBits(x, ['WWWWWWW', 'WQWWWQW', 'WWQWQWW', 'WWWQWWW', 'WWWWWWW'], K.COL, 700 + ((i * 37) % 60 - 30) + dig * (i % 2 ? 300 : -260), K.GROUND - 40 - i * 26 - dig * 200, 8 * a, { rot: (i % 3 - 1) * 0.15 + dig * 3, alpha: 1 - dig }) }
            K.label(x, `INBOX: ${String(n * 7 + 3)}`, 700, 900, 38, '#ff4d6d', K.pop01(t, B.pile, 0.3, 3) * a * (1 - K.prog(t, B.dig, B.dig + 0.4)))
            if (t > B.dig) K.label(x, 'oh. it was under there.', 640, 950, 36, '#ff8fb1', K.pop01(t, B.dig + 0.6, 0.3, 3) * a)
          },
          cues: [['pop', B.lap, 587.33, 0.03, -0.3], ...Array.from({ length: 12 }, (_, i) => ['tick', +(B.pile + i / 1.6).toFixed(2), 0.025]), ['whoosh', B.dig, 0.6, 0.04], ['pluck', B.dig + 0.6, 880, 0.03, 0.5, 0.3]],
        }
      } },
    { lines: ['this week: log off at *seven*. once.', 'text someone you like. the inbox can *wait*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, clock: C + 1.2, close: C + 2.4, text: C + 4.0, reply: C + 6.4, dinner: C + 8.4, ans: C + 9.8 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            const closeP = K.prog(t, B.close, B.close + 0.3)
            if (t < B.dinner) {
              K.label(x, '7:00 PM', 540, 900, 50, '#ffd34d', K.pop01(t, B.clock, 0.3, 3) * a * (1 - K.prog(t, B.text, B.text + 0.3)))
              K.drawBits(x, closeP < 1 ? K.BM.LAPTOP : ['AAAAAAAAAA', 'AAAAAAAAAA'], K.COL, 420, K.ACT_Y + 40, 10 * a)
              K.stamp(x, t, B.close, 'LOGGED OFF', 420, K.ACT_Y - 60, { size: 34, color: '#9fe6b0', life: 1.6 })
              K.phone(x, 760, 960, 0.5 * K.pop01(t, B.text, 0.3, 2.4) * a, { header: 'SAM', rows: [{ text: 'free this weekend?', me: true }, ...(t > B.reply ? [{ text: 'yes!! finally :)' }] : [])] })
            } else {
              table(K, x, 540, K.GROUND - 40, 860, K.pop01(t, B.dinner, 0.35, 2.4) * a)
              K.mini(x, t, { x: 180, y: K.ACT_Y - 30, size: 120, color: '#ffb38a', mood: 'sparkle', look: [1, 0], seed: 11, pop: K.pop01(t, B.dinner, 0.35, 2.4) * a })
              K.bubble(x, 'so, seeing anyone?', 560, 920, { size: 30, color: '#ff8fb1', ink: K.INK, s: K.pop01(t, B.dinner + 0.3, 0.3, 2.6) * a * (1 - K.prog(t, B.ans, B.ans + 0.3)) })
              if (t > B.ans) K.bubble(x, 'not yet. I’m good :)', 470, 920, { size: 30, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.ans, 0.3, 2.6) * a })
            }
            K.mini(x, t, { x: t < B.dinner ? 300 : 420, y: t < B.dinner ? K.ACT_Y : K.ACT_Y - 40, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.ans ? 'sparkle' : t > B.reply ? 'heart' : 'happy', look: [1, 0], seed: 4, pop: a, hops: [B.close, B.reply, B.ans] })
            if (t > B.ans) K.sparkles(x, t, 420, K.ACT_Y - 80, B.ans, 14, 200, 5)
          },
          cues: [['pop', B.clock, 987.77, 0.035, 0], ['tick', B.close, 0.06], ['pop', B.close, 523.25, 0.04, -0.3], ['pop', B.text, 1174.66, 0.035, 0.3], ['pop', B.reply, 1318.51, 0.04, 0.3], ['whoosh', B.dinner, 0.4, 0.03], ['pop', B.dinner + 0.3, 880, 0.035, 0], ['pop', B.ans, 1567.98, 0.045, -0.2], ['glitter', B.ans, B.ans + 0.6]],
        }
      } },
  ],
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
