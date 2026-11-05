// kxsge12 · Your Star Guide: Extended · ♓ The Pisces Guide: Crying at the Playlist · loop
//   HOOK   Pisces mid-sob, a fountain of tears arcing across the frame, an old photo of the ex floating in a bubble; flash.
//   ch1    HOW YOU LOVE: Pisces paints a whole future in a dream bubble (a picnic, a dog, a little house). Happy tears.
//   ch2    WHAT YOU NEED: Pisces floats up like a balloon; the other star gently holds the string. Grounded.
//   ch3    WHERE IT GETS HARD: the ex-photo bubble keeps drifting back; Pisces reaches for the phone; tears.
//   ch4    TRY THIS WEEK: Pisces builds a little fence with a heart gate, lets the ex bubble float away, texts a friend
//          instead; the friend arrives with snacks. Happy tears.
//   Pisces is the hero here, so the sidekick is off and the hero cries the whole film.
//   Last line: "Cry it out. Then call a friend."  Loops back into the sob.
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const WHIP = { at: 0.4, from: 1.4, flash: 0.6 }
function exPhoto(K, x, t, cx, cy, s, a = 1) {
  if (a <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(s, s); x.rotate(Math.sin(t * 1.3) * 0.06)
  x.strokeStyle = 'rgba(191,227,255,0.8)'; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(191,227,255,0.12)'; x.fill()
  x.fillStyle = K.INK; x.fillRect(-66, -76, 132, 140); x.fillStyle = '#f5eedf'; x.fillRect(-60, -70, 120, 128)
  x.fillStyle = '#9aa3b8'; x.fillRect(-50, -60, 100, 90)
  x.restore()
  K.mini(x, t, { x: cx, y: cy - 18 * s, size: 70 * s, color: '#9aa3b8', mood: 'happy', look: [0, 0], seed: 13, glow: 0, pop: a })
  K.label(x, 'the ex', cx, cy + 46 * s, 22 * s, K.INK, a)
}
const F = guideXFilm({
  id: 'kxsge12', sign: 'pisces', pisces: false,
  hook: 'PISCES. CRYING ABOUT | THE *EX.* AGAIN.',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'PISCES: MUTABLE WATER,|RULED BY JUPITER AND NEPTUNE', chipCh: 0,
  last: 'Cry it out. | Then call a *friend.*', late: 2, ending: 'loop',
  hookScene: K => ({
    fx: [{ scene: HK.whipZoom(WHIP), cues: HK.whipZoomCues(WHIP) }],
    draw(x, t) {
      exPhoto(K, x, t, 760, 820 + Math.sin(t * 1.5) * 12, 1.3)
      const o = { x: 460, y: 1180, size: 300, color: K.ME.color, glyph: K.ME.glyph, mood: 'squint', look: [1, -0.5], seed: 4, bob: 0, squash: 0.05 * Math.sin(t * 16) }
      K.mini(x, t, { ...o, tears: 3 })
      // big arcing tear streams across the frame
      for (const d of [-1, 1]) for (let i = 0; i < 10; i++) {
        const ph = (t * 1.4 + i / 10) % 1
        const px = 460 + d * (60 + ph * 420), py = 1110 - Math.sin(ph * Math.PI) * 260 + ph * 300
        x.fillStyle = K.INK; x.fillRect(px - 2, py - 2, 18, 22); x.fillStyle = '#8fe3ff'; x.fillRect(px, py, 14, 18); x.fillStyle = '#fff'; x.fillRect(px, py, 6, 6)
      }
      K.label(x, 'WAAAH', 300, 1430, 54, '#8fe3ff', 1, -0.08)
    },
    cues: [['pluck', 0.05, 587.33, 0.04, 0.8, 0], ['pluck', 0.5, 523.25, 0.035, 0.8, 0]],
  }),
  chapters: [
    { lines: ['you love like a *daydream*. all in.', 'one date and you’ve named the *dog*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, bubble: C + 1.6, p1: C + 2.6, p2: C + 4.4, p3: C + 7.6, name: C + 9.4, pop: C + 12.2, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.pop ? 'wide' : 'heart', look: [1, -1], seed: 4, pop: a, hops: [B.p1, B.p2, B.p3, B.pop], tears: t > B.name ? 2 : 1 })
            K.mini(x, t, { x: 800, y: K.ACT_Y, size: 140, color: K.THEM, mood: t > B.pop ? 'happy' : 'neutral', look: [-1, 0], seed: 9, pop: a })
            const bp = K.pop01(t, B.bubble, 0.4, 2.4) * a * (1 - K.prog(t, B.pop, B.pop + 0.2))
            if (bp > 0.01) {
              x.save(); x.globalAlpha *= bp; x.fillStyle = 'rgba(245,238,255,0.92)'; x.strokeStyle = K.INK; x.lineWidth = 6
              x.beginPath(); x.ellipse(560, 960, 330 * bp, 150 * bp, 0, 0, Math.PI * 2); x.fill(); x.stroke()
              for (const [cx, cy, r] of [[380, 1100, 22], [340, 1140, 14]]) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.stroke() }
              x.restore()
              if (t > B.p1) K.drawBits(x, ['RWRWRW', 'WRWRWR', 'RWRWRW'], K.COL, 420, 1000, 10 * K.pop01(t, B.p1, 0.3, 3) * bp)
              if (t > B.p2) K.drawBits(x, ['..R..', '.RRR.', 'RRRRR', 'WWBWW', 'WWBWW'], K.COL, 560, 960, 12 * K.pop01(t, B.p2, 0.3, 3) * bp)
              if (t > B.p3) K.drawBits(x, ['.B..B', '.BBBB', 'BBBB.', 'B..B.'], K.COL, 700, 1010, 10 * K.pop01(t, B.p3, 0.3, 3) * bp)
              if (t > B.name) K.label(x, '“Biscuit”', 700, 930, 32, '#c08552', K.pop01(t, B.name, 0.3, 3) * bp)
            }
            if (t > B.pop) K.label(x, '…we’ve had one coffee.', 560, 960, 36, '#ffd34d', K.pop01(t, B.pop, 0.3, 3) * a)
          },
          cues: [['pop', B.bubble, 739.99, 0.035, 0], ['pop', B.p1, 987.77, 0.035, -0.2], ['pop', B.p2, 1108.73, 0.035, 0], ['pop', B.p3, 1318.51, 0.035, 0.2], ['pluck', B.name, 1567.98, 0.03, 0.5, 0.2], ['pop', B.pop, 392, 0.045, 0], ['tick', B.pop, 0.06]],
        }
      } },
    { lines: ['you need someone *gentle* with your heart…', '…who keeps you *grounded* when you float.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, float: C + 1.6, high: C + 5.6, catch: C + 7.0, down: C + 8.6, land: C + 10.4, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const up = K.ease.inOutCubic(K.prog(t, B.float, B.high)) * (1 - K.ease.inOutCubic(K.prog(t, B.down, B.land)))
            const px = 460 + Math.sin(t * 1.3) * 30 * up, py = K.ACT_Y - up * 300
            K.mini(x, t, { x: 720, y: K.ACT_Y, size: 140, color: K.THEM, mood: t > B.land ? 'heart' : 'happy', look: [-1, -0.8], seed: 9, pop: a, hops: [B.catch, B.land] })
            if (t > B.catch) { x.save(); x.globalAlpha *= a; x.strokeStyle = '#efe6d6'; x.lineWidth = 4; x.beginPath(); x.moveTo(680, K.ACT_Y - 20); x.quadraticCurveTo(560, (py + K.ACT_Y) / 2 + 40, px, py + 60); x.stroke(); x.restore() }
            K.mini(x, t, { x: px, y: py, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.land ? 'heart' : t > B.high ? 'wide' : 'sparkle', look: [0.6, 0.6], seed: 4, pop: a, tears: t > B.land ? 2 : 1, hops: [B.land] })
            if (t > B.float && t < B.catch) K.label(x, 'floating away…', px, py - 130, 30, '#c9b8f0', a)
            if (t > B.catch && t < B.land) K.label(x, 'got you.', 760, 900, 40, '#9fe6b0', K.pop01(t, B.catch, 0.3, 3) * a)
            if (t > B.land) { K.heart(x, 590, K.ACT_Y - 170 - (t - B.land) * 14, 8 * K.pop01(t, B.land, 0.35, 3), a); K.sparkles(x, t, 520, K.ACT_Y, B.land, 10, 150, 3) }
          },
          cues: [['whoosh', B.float, 1.6, 0.03], ['pop', B.catch, 880, 0.04, 0.3], ['whoosh', B.down, 1.2, 0.025], ['tick', B.land, 0.05], ['glitter', B.land, B.land + 0.5]],
        }
      } },
    { lines: ['missing them doesn’t mean *go back*.', 'it means it *mattered*. both can be true.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, drift: C + 1.2, reach: C + 4.6, phone: C + 5.4, stop: C + 8.4, hold: C + 10.0, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const bx = 760 + Math.sin(t * 0.8) * 60, by = 960 + Math.sin(t * 1.3) * 30
            exPhoto(K, x, t, bx, by, K.pop01(t, B.drift, 0.4, 2.4), a)
            K.mini(x, t, { x: 330, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.hold ? 'neutral' : 'squint', look: [1, -0.6], seed: 4, pop: a, tears: t > B.hold ? 2 : 3, hops: [B.reach, B.stop] })
            if (t > B.phone) K.phone(x, 500, K.ACT_Y - 60, 0.42 * K.pop01(t, B.phone, 0.3, 2.4) * a * (1 - K.prog(t, B.stop + 0.6, B.stop + 1)), { header: 'THE EX', rows: [{ text: 'hey… u up?', me: true, color: '#3a3168' }], rot: -0.1 })
            K.stamp(x, t, B.stop, 'DRAFT DELETED', 520, 1000, { size: 40, color: '#9fe6b0', life: 2.2 })
            if (t > B.hold) K.label(x, 'it mattered. it’s over. both.', 540, 870, 34, '#ffd34d', K.pop01(t, B.hold, 0.3, 3) * a)
          },
          cues: [['pop', B.drift, 659.25, 0.03, 0.3], ['pluck', B.reach, 523.25, 0.03, 0.7, -0.2], ['pop', B.phone, 739.99, 0.035, 0], ['tick', B.stop, 0.06], ['pop', B.stop, 1174.66, 0.04, 0], ['pluck', B.hold, 880, 0.03, 0.6, 0]],
        }
      } },
    { lines: ['this week: let it hurt. then text a *friend*.', 'not the ex. a friend with *snacks*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, fence: C + 1.4, wave: C + 3.4, text: C + 6.8, friend: C + 8.4, snack: C + 9.8 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            // the ex bubble floats away up and off
            const away = K.prog(t, B.wave, B.wave + 3)
            exPhoto(K, x, t, 760 + away * 300, 960 - away * 400, 0.9 * (1 - away * 0.5), a * (1 - away))
            if (t > B.wave && t < B.wave + 2.4) K.label(x, 'bye. thank you.', 700, 1060, 34, '#c9b8f0', K.pop01(t, B.wave, 0.3, 3) * a)
            // the little fence with a heart gate
            const fp = K.pop01(t, B.fence, 0.4, 2.4) * a
            K.drawBits(x, K.BM.FENCE, K.COL, 520, K.GROUND - 30, 8 * fp); K.heart(x, 520, K.GROUND - 70, 4 * fp)
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.snack ? 'heart' : t > B.text ? 'happy' : 'neutral', look: [1, 0], seed: 4, pop: a, tears: t > B.snack ? 3 : 1, hops: [B.fence, B.wave, B.snack] })
            if (t > B.text && t < B.snack + 1) K.phone(x, 540, 920, 0.45 * K.pop01(t, B.text, 0.3, 2.4) * a, { header: 'BEST FRIEND', rows: [{ text: 'rough night. come over?', me: true }, ...(t > B.text + 0.8 ? [{ text: 'omw w/ snacks' }] : [])] })
            const fx = t < B.friend ? 1150 : K.lerp(1100, 760, K.ease.outCubic(K.prog(t, B.friend, B.friend + 0.8)))
            K.mini(x, t, { x: fx, y: K.ACT_Y, size: 145, color: '#9fe6b0', mood: 'sparkle', look: [-1, 0], seed: 12, pop: a, hops: [B.friend + 0.8, B.snack] })
            if (t > B.snack) { K.drawBits(x, ['.CCC.', 'CcCcC', 'CCCCC'], K.COL, 660, K.ACT_Y - 90, 8 * a); K.drawBits(x, K.BM.CUP, K.COL, 580, K.ACT_Y - 80, 6 * a); K.sparkles(x, t, 530, K.ACT_Y - 60, B.snack, 14, 220, 5) }
          },
          cues: [['pop', B.fence, 659.25, 0.035, 0], ['whoosh', B.wave, 2.4, 0.03], ['pop', B.text, 1174.66, 0.035, 0], ['pop', B.text + 0.8, 1318.51, 0.035, 0.3], ['whoosh', B.friend, 0.5, 0.03], ['glitter', B.snack, B.snack + 0.6], ['pop', B.snack, 1567.98, 0.04, 0.2]],
        }
      } },
  ],
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
