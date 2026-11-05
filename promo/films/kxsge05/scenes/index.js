// kxsge05 · Your Star Guide: Extended · ♌ The Leo Guide: Who Clapped? · hard cut
//   HOOK   Leo mid-bow in a spotlight, roses frozen mid-air; one lonely clap; record scratch freeze: "one clap. ONE."
//   ch1    HOW YOU LOVE: Leo throws a surprise party; confetti cannons, a banner, the other star gasps.
//   ch2    WHAT YOU NEED: two foam fingers, cheering each other, louder each time.
//   ch3    WHERE IT GETS HARD: the spotlight shrinks; Leo waits for applause; a cricket chirps.
//   ch4    TRY THIS WEEK: the spotlight widens into two circles; Leo asks "how was your day?" and asks again.
//   Last line: "Two spotlights. One stage."
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const REC = { at: 0.75, len: 1.4, caption: 'one clap. *ONE.*', top: 1500 }
function spot(K, x, cx, w, a = 1, top = 640) {
  if (a <= 0.01 || w <= 1) return
  x.save(); x.globalAlpha *= a
  const g = x.createLinearGradient(0, top, 0, K.GROUND + 30); g.addColorStop(0, 'rgba(255,240,190,0.04)'); g.addColorStop(1, 'rgba(255,236,170,0.32)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - w * 0.25, top); x.lineTo(cx + w * 0.25, top); x.lineTo(cx + w, K.GROUND + 20); x.lineTo(cx - w, K.GROUND + 20); x.closePath(); x.fill()
  x.fillStyle = 'rgba(255,240,190,0.35)'; x.beginPath(); x.ellipse(cx, K.GROUND + 14, w, w * 0.16, 0, 0, Math.PI * 2); x.fill()
  x.restore()
}
const F = guideXFilm({
  id: 'kxsge05', sign: 'leo',
  hook: 'LEO. DID THEY | EVEN *NOTICE?*',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'LEO: FIXED FIRE,|RULED BY THE SUN', chipCh: 0,
  last: 'Two *spotlights.* | One stage.', late: 2, ending: 'cut',
  hookScene: K => ({
    freeze: [REC],
    fx: [{ scene: HK.recordScratch(REC), cues: HK.recordScratchCues(REC) }],
    draw(x, t) {
      const g = 1272
      spot({ ...K, GROUND: g }, x, 540, 300, 1, 560)
      K.mini(x, t, { x: 540, y: 1140, size: 300, color: K.ME.color, glyph: K.ME.glyph, mood: 'sparkle', look: [0, 1], squash: -0.08 + 0.18 * K.ease.outCubic(K.prog(t, 0, 0.5)), seed: 4, bob: 0 })
      for (let i = 0; i < 5; i++) {
        const ph = t * 0.8 + i
        K.drawBits(x, K.BM.ROSE, K.COL, 300 + i * 120 + Math.sin(ph) * 10, 860 + (i % 2) * 70 + t * 40, 9, { rot: Math.sin(ph * 2) * 0.6 })
      }
      K.label(x, '*clap*', 880, 1000, 40, '#efe6d6', 1, 0.1)
    },
    cues: [['pop', 0.02, 1318.51, 0.035, 0], ['tick', 0.3, 0.08]],
  }),
  chapters: [
    { lines: ['you love *out loud*. big gestures, big heart.', 'a surprise party for a *tuesday*. iconic.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, hide: C + 1.2, door: C + 3.0, boom: C + 3.8, banner: C + 4.4, again: C + 9.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const themX = t < B.door ? 1100 : K.lerp(1000, 760, K.ease.outCubic(K.prog(t, B.door, B.door + 0.7)))
            K.mini(x, t, { x: 300, y: K.ACT_Y + (t < B.boom ? 40 : 0), size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t < B.boom ? 'squint' : 'sparkle', look: [1, 0], seed: 4, pop: a, hops: [B.boom, B.again, B.again + 0.5] })
            K.mini(x, t, { x: themX, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.boom + 0.5 ? 'heart' : t > B.boom ? 'wide' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.boom + 0.1] })
            if (t < B.boom && t > B.hide) K.label(x, 'shh…', 300, K.ACT_Y - 130, 36, BONE(K), K.pop01(t, B.hide, 0.3, 3))
            for (const t0 of [B.boom, B.again]) {
              if (t < t0) continue
              for (let i = 0; i < 26; i++) {
                const r1 = Math.abs(Math.sin(i * 12.9898 + t0) * 43758.5453) % 1, r2 = Math.abs(Math.sin(i * 78.233 + t0) * 24634.63) % 1
                const dt = t - t0, ang = -Math.PI / 2 + (r1 - 0.5) * 2.2
                const px = 540 + Math.cos(ang) * 600 * r2 * Math.min(1, dt * 2), py = K.ACT_Y - 60 + Math.sin(ang) * 520 * r2 * Math.min(1, dt * 2) + dt * dt * 120
                x.fillStyle = ['#ffd34d', '#ff8fb1', '#7fe0ff', '#9fe6b0'][i % 4]; x.globalAlpha = a * (1 - K.prog(t, t0 + 2.4, t0 + 3.2)); x.fillRect(px, py, 12, 8); x.globalAlpha = 1
              }
            }
            K.banner(x, 'HAPPY TUESDAY!!', 540, 960, { size: 40, s: K.pop01(t, B.banner, 0.35, 2.6) * a, color: '#e8b42c', ink: K.INK, rot: -0.04 })
            K.burst(x, 540, K.ACT_Y - 160, 120, t, B.boom, { word: 'SURPRISE!', size: 36, color: '#ffd34d', life: 1.1 })
          },
          cues: [['pop', B.hide, 523.25, 0.025, -0.3], ['tick', B.door, 0.05], ['boom', B.boom, 0.14], ['glitter', B.boom, B.boom + 0.8], ['pop', B.banner, 1174.66, 0.04, 0], ['boom', B.again, 0.1], ['glitter', B.again, B.again + 0.6]],
        }
      } },
    { lines: ['you need someone who *cheers* for you…', '…and lets you cheer *louder* back.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, f1: C + 1.8, f2: C + 4.4, f3: C + 7.6, f4: C + 9.6, hug: C + 11.6, out: C + 14.6 }
        const FINGER = ['..Y..', '..Y..', '.YYY.', 'YYYYY', 'YYYYY', '.YYY.', '.YYY.']
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const near = K.ease.inOutCubic(K.prog(t, B.hug, B.hug + 0.6))
            K.mini(x, t, { x: K.lerp(300, 440, near), y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.f1 + 0.3 ? 'heart' : 'neutral', look: [1, 0], seed: 4, pop: a, hops: [B.f2, B.f4, B.hug] })
            K.mini(x, t, { x: K.lerp(780, 640, near), y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.f2 + 0.3 ? 'heart' : 'happy', look: [-1, 0], seed: 9, pop: a, hops: [B.f1, B.f3, B.hug] })
            // foam fingers, growing each round
            const s1 = t > B.f1 ? (t > B.f3 ? 9 : 6) : 0, s2 = t > B.f2 ? (t > B.f4 ? 9.5 : 6.5) : 0
            if (s1) K.drawBits(x, FINGER, { Y: '#7fe0ff' }, K.lerp(780, 640, near) + 90, K.ACT_Y - 120 + Math.sin(t * 9) * 8, s1 * a * K.pop01(t, B.f1, 0.3, 3))
            if (s2) K.drawBits(x, FINGER, { Y: '#ff9a4a' }, K.lerp(300, 440, near) - 90, K.ACT_Y - 120 + Math.cos(t * 9) * 8, s2 * a * K.pop01(t, B.f2, 0.3, 3))
            K.label(x, 'GO LEO!', 760, 900, 46, '#7fe0ff', K.pop01(t, B.f1, 0.3, 3) * a * (1 - K.prog(t, B.f2 - 0.2, B.f2)))
            K.label(x, 'NO, GO *YOU*!'.replace(/\*/g, ''), 320, 900, 46, '#ff9a4a', K.pop01(t, B.f2, 0.3, 3) * a * (1 - K.prog(t, B.f3 - 0.2, B.f3)))
            K.label(x, 'GO US!!', 540, 900, 60, '#ffd34d', K.pop01(t, B.f4, 0.3, 3) * a)
            if (t > B.hug) K.heart(x, 540, K.ACT_Y - 170 - (t - B.hug) * 18, 8 * K.pop01(t, B.hug, 0.35, 3), a)
          },
          cues: [['pop', B.f1, 987.77, 0.04, 0.3], ['pop', B.f2, 1108.73, 0.04, -0.3], ['pop', B.f3, 1174.66, 0.04, 0.3], ['pop', B.f4, 1318.51, 0.045, 0], ['glitter', B.f4, B.f4 + 0.5], ['glitter', B.hug, B.hug + 0.4]],
        }
      } },
    { lines: ['not getting noticed feels like not being *loved*.', 'it isn’t. sometimes they’re just *tired*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, shrink: C + 2.0, wait: C + 4.0, cricket: C + 5.4, yawn: C + 7.4, blanket: C + 10.2, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const w = K.lerp(240, 90, K.ease.inOutCubic(K.prog(t, B.shrink, B.shrink + 1.6))) * K.lerp(1, 0, K.prog(t, B.blanket, B.blanket + 0.6))
            spot(K, x, 330, w, a, 700)
            K.mini(x, t, { x: 330, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.blanket ? 'happy' : t > B.wait ? 'neutral' : 'sparkle', look: t > B.yawn ? [1, 0] : [0, -0.5], squash: t > B.wait && t < B.yawn ? -0.06 : 0, seed: 4, pop: a, hops: [B.shrink, B.blanket] })
            K.mini(x, t, { x: 770, y: K.ACT_Y + 10, size: 145, color: K.THEM, mood: t > B.blanket + 0.4 ? 'heart' : t > B.yawn ? 'squint' : 'neutral', look: [-1, 0.6], squash: 0.12, seed: 9, pop: a, blink: t > B.yawn && t < B.blanket ? 0.6 : undefined })
            if (t > B.wait && t < B.yawn) K.label(x, '…applause?', 330, K.ACT_Y - 150, 36, '#ffd34d', K.pop01(t, B.wait, 0.3, 3) * a)
            if (t > B.cricket && t < B.yawn + 1) { K.label(x, 'chirp', 560 + Math.sin(t * 20) * 4, K.GROUND - 30, 26, '#9fe6b0', 0.85 * a) }
            if (t > B.yawn && t < B.blanket) K.bubble(x, 'long day… *yawn*'.replace(/\*/g, ''), 770, K.ACT_Y - 170, { size: 24, color: '#6f5bd6', s: K.pop01(t, B.yawn, 0.3, 2.6) * a, tail: -1 })
            // Leo brings a blanket
            if (t > B.blanket) { const p = K.prog(t, B.blanket, B.blanket + 0.7); K.drawBits(x, ['RRRRRRRR', 'RWRWRWRW', 'RRRRRRRR', 'WRWRWRWR'], K.COL, K.lerp(380, 760, K.ease.inOutCubic(p)), K.ACT_Y + 30 - Math.sin(Math.PI * p) * 120, 9 * a); if (p >= 1) K.sparkles(x, t, 760, K.ACT_Y, B.blanket + 0.7, 10, 120, 3) }
          },
          cues: [['whoosh', B.shrink, 0.8, 0.03], ['tick', B.wait, 0.04], ...Array.from({ length: 4 }, (_, i) => ['pop', +(B.cricket + i * 0.5).toFixed(2), 2349.32, 0.012, 0.4]), ['pluck', B.yawn, 587.33, 0.03, 0.8, 0.3], ['whoosh', B.blanket, 0.4, 0.03], ['glitter', B.blanket + 0.7, B.blanket + 1.2]],
        }
      } },
    { lines: ['this week: ask about *their* day.', 'then ask *again*. watch them light up.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, widen: C + 1.6, ask: C + 3.2, talk: C + 4.4, again: C + 7.4, glow: C + 9.0 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            const split = K.ease.inOutCubic(K.prog(t, B.widen, B.widen + 1.0))
            spot(K, x, K.lerp(540, 330, split), K.lerp(110, 170, split), a, 700)
            spot(K, x, K.lerp(540, 760, split), K.lerp(0, 170, split) * (1 + 0.25 * K.prog(t, B.glow, B.glow + 0.6)), a, 700)
            K.mini(x, t, { x: 330, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.glow ? 'heart' : 'happy', look: [1, 0], seed: 4, pop: a, hops: [B.ask, B.again] })
            K.mini(x, t, { x: 760, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.glow ? 'sparkle' : t > B.talk ? 'happy' : 'neutral', look: [-1, 0], seed: 9, pop: a, glow: t > B.glow ? 1.6 : 0.8, hops: t > B.talk ? [B.talk, B.talk + 1, B.glow, B.glow + 0.6] : [] })
            if (t > B.ask && t < B.talk + 0.4) K.bubble(x, 'how was your day?', 380, K.ACT_Y - 180, { size: 26, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.ask, 0.3, 2.6) * a })
            if (t > B.talk && t < B.again) K.bubble(x, 'fine. busy.', 740, K.ACT_Y - 180, { size: 26, color: '#6f5bd6', s: K.pop01(t, B.talk, 0.3, 2.6) * a, tail: -1 })
            if (t > B.again && t < B.glow) K.bubble(x, 'no, really. how was it?', 420, K.ACT_Y - 180, { size: 26, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.again, 0.3, 2.6) * a })
            if (t > B.glow) { K.bubble(x, 'ok SO. you won’t believe…', 700, K.ACT_Y - 190, { size: 24, color: '#6f5bd6', s: K.pop01(t, B.glow, 0.3, 2.6) * a, tail: -1 }); K.sparkles(x, t, 760, K.ACT_Y - 40, B.glow, 14, 180, 5) }
          },
          cues: [['whoosh', B.widen, 0.6, 0.035], ['pop', B.widen + 1, 1174.66, 0.035, 0.3], ['pop', B.ask, 987.77, 0.035, -0.3], ['pop', B.talk, 659.25, 0.03, 0.3], ['pop', B.again, 1108.73, 0.035, -0.3], ['glitter', B.glow, B.glow + 0.6], ['pop', B.glow, 1318.51, 0.045, 0.3]],
        }
      } },
  ],
})
function BONE(K) { return K.BONE }
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
