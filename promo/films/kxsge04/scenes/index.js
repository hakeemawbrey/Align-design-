// kxsge04 · Your Star Guide: Extended · ♋ The Cancer Guide: Everyone's Soup · loop
//   HOOK   Cancer mid-run with a wobbling tower of soup bowls, steam swirling; screen shake.
//   ch1    HOW YOU LOVE: Cancer delivers bowls to three stars, one after another.
//   ch2    WHAT YOU NEED: a sticky note: "you said you like peaches" — someone remembers the little things back.
//   ch3    WHERE IT GETS HARD: Cancer gives advice to three friends; the banner turns on Cancer: TAKE YOUR OWN ADVICE.
//   ch4    TRY THIS WEEK: the other star hands Cancer a bowl; Cancer finally sits down.
//   Last line: "Sit down. Your bowl's here."  Loops back into the run.
import { guideXFilm, HK } from '../../kxsge01/sgxkit.js'

const SHAKE = { at: 0.3, len: 0.6, amp: 20 }
function steam(K, x, t, cx, cy, a = 1) {
  if (a <= 0.01) return
  x.save(); x.fillStyle = '#f4f6ff'
  for (let i = 0; i < 3; i++) for (let k = 0; k < 5; k++) {
    const ph = (t * 0.9 + k / 5 + i * 0.31) % 1
    x.globalAlpha = a * 0.7 * (1 - ph)
    x.fillRect(Math.round(cx + (i - 1) * 14 + Math.sin(ph * 7 + i) * 6), Math.round(cy - ph * 60), 6, 6)
  }
  x.restore()
}
function tower(K, x, t, cx, by, n, a, wob = 1) {
  for (let i = 0; i < n; i++) {
    const w = Math.sin(t * 5 + i * 0.7) * i * 3.2 * wob
    K.drawBits(x, K.BM.BOWL, K.COL, cx + w, by - i * 30, 6 * a)
    if (i === n - 1) steam(K, x, t, cx + w, by - i * 30 - 26, a)
  }
}
const F = guideXFilm({
  id: 'kxsge04', sign: 'cancer',
  hook: 'CANCER. YOU FED | EVERYONE BUT *YOU.*',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'CANCER: CARDINAL WATER,|RULED BY THE MOON', chipCh: 0,
  last: 'Sit down. | Your *bowl’s* here.', late: 2, ending: 'loop',
  hookScene: K => ({
    fx: [{ scene: HK.screenShake(SHAKE), cues: HK.shakeCues(SHAKE) }],
    draw(x, t) {
      const cx = 540 + Math.sin(t * 9) * 16
      x.fillStyle = 'rgba(255,214,140,0.7)'
      for (let i = 0; i < 6; i++) { const ph = (t * 3 + i / 6) % 1; x.fillRect(cx - 200 - ph * 260, 1080 + i * 40, 110 - ph * 50, 7) }
      tower(K, x, t, cx + 10, 1085, 9, 1.35, 1.6)
      K.mini(x, t, { x: cx, y: 1230, size: 280, color: K.ME.color, glyph: K.ME.glyph, mood: 'wide', look: [0, -1], squash: 0.1 + 0.05 * Math.sin(t * 18), seed: 4, bob: 0 })
      K.label(x, 'ORDER UP!', 260, 1450, 50, '#ffd34d', 1, -0.1)
    },
    cues: [['pop', 0.05, 880, 0.03, 0], ['tick', 0.4, 0.04], ['tick', 0.8, 0.04], ['whoosh', 0.1, 0.5, 0.04]],
  }),
  chapters: [
    { lines: ['you love by *taking care*. constantly.', 'soup for the flu, soup for the *breakup*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, out: C + 14.6 }
        const STOPS = [[C + 1.6, 600], [C + 4.6, 760], [C + 8.4, 900]]
        const cx = t => { let x0 = 220; for (const [ts, tx] of STOPS) { if (t < ts) return x0; if (t < ts + 0.8) return K.lerp(x0, tx - 110, K.ease.inOutCubic(K.prog(t, ts, ts + 0.8))); x0 = tx - 110 } return K.lerp(x0, 260, K.ease.inOutCubic(K.prog(t, C + 11.6, C + 12.6))) }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const cols = [K.THEM, '#9fe6b0', '#ffb38a']
            STOPS.forEach(([ts, tx], i) => {
              const got = t > ts + 0.9
              K.mini(x, t, { x: tx, y: K.ACT_Y + 10, size: 120, color: cols[i], mood: got ? 'heart' : i === 1 ? 'squint' : 'neutral', look: [-1, 0], seed: 9 + i, pop: a, hops: [ts + 0.9] })
              if (got) { K.drawBits(x, K.BM.BOWL, K.COL, tx, K.ACT_Y - 80, 5 * a); steam(K, x, t, tx, K.ACT_Y - 100, a) }
            })
            const left = 3 - STOPS.filter(([ts]) => t > ts + 0.9).length
            const px = cx(t)
            K.mini(x, t, { x: px, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: 'happy', look: [1, 0], seed: 4, pop: a, hops: STOPS.map(s => s[0] + 0.9) })
            if (left > 0) tower(K, x, t, px, K.ACT_Y - 110, left, a * 0.85)
            if (t > C + 7.0 && t < C + 9.8) K.label(x, 'the flu', 760, 1010, 34, '#9fe6b0', K.pop01(t, C + 7.0, 0.3, 3))
            if (t > C + 9.4 && t < C + 12.4) K.label(x, 'the breakup', 900, 970, 34, '#ffb38a', K.pop01(t, C + 9.4, 0.3, 3))
          },
          cues: [[0, 1, 2].flatMap(() => [])].flat().concat([['whoosh', C + 1.6, 0.3, 0.03], ['pop', C + 2.5, 880, 0.035, 0], ['whoosh', C + 4.6, 0.3, 0.03], ['pop', C + 5.5, 987.77, 0.035, 0.2], ['whoosh', C + 8.4, 0.3, 0.03], ['pop', C + 9.3, 1174.66, 0.035, 0.4], ['glitter', C + 9.3, C + 9.7]]),
        }
      } },
    { lines: ['you need someone who *remembers* back.', 'the little things. the *peach* thing.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, note: C + 2.2, open: C + 7.4, peach: C + 8.6, cry: C + 10.4, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            K.mini(x, t, { x: 320, y: K.ACT_Y, size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.cry ? 'heart' : t > B.note + 0.8 ? 'wide' : 'neutral', look: [1, -0.4], seed: 4, pop: a, hops: [B.note + 0.8, B.cry], tears: t > B.cry ? 1 : 0 })
            K.mini(x, t, { x: 760, y: K.ACT_Y, size: 150, color: K.THEM, mood: 'happy', look: [-1, 0], seed: 9, pop: a, hops: [B.note, B.open] })
            // the sticky note slaps onto the middle
            const np = K.pop01(t, B.note, 0.35, 2.6) * a
            if (np > 0.01) {
              x.save(); x.translate(540, 990); x.rotate(-0.06 + Math.sin(t * 1.4) * 0.02); x.scale(np, np)
              x.fillStyle = K.INK; x.fillRect(-206, -96, 412, 192); x.fillStyle = '#ffe58a'; x.fillRect(-200, -90, 400, 180); x.fillStyle = '#f2c84d'; x.fillRect(-200, -90, 400, 22)
              x.font = '700 28px Space Mono, monospace'; x.fillStyle = K.INK; x.textAlign = 'center'
              x.fillText('you said you', 0, -20); x.fillText('like peaches :)', 0, 20)
              x.restore()
            }
            // a little box opens: peaches
            if (t > B.open) {
              const op = K.pop01(t, B.open, 0.35, 2.4) * a
              K.drawBits(x, ['YYYYYYY', 'Y.....Y', 'YYYYYYY'], K.COL, 640, K.ACT_Y - 30, 7 * op)
              if (t > B.peach) for (let i = 0; i < 3; i++) K.drawBits(x, ['.G.', 'OOO', 'OOO', '.O.'], K.COL, 610 + i * 30, K.ACT_Y - 70 - Math.sin(Math.PI * K.prog(t, B.peach + i * 0.15, B.peach + i * 0.15 + 0.5)) * 40, 6 * a)
            }
            if (t > B.cry) K.heart(x, 450, K.ACT_Y - 170 - (t - B.cry) * 20, 8 * K.pop01(t, B.cry, 0.35, 3), (1 - K.prog(t, B.cry + 2.4, B.cry + 3)) * a)
          },
          cues: [['pop', B.note, 1174.66, 0.04, 0], ['tick', B.note + 0.1, 0.05], ['pop', B.open, 739.99, 0.035, 0.2], ['pop', B.peach, 1318.51, 0.03, 0.2], ['pop', B.peach + 0.15, 1479.98, 0.03, 0.25], ['pop', B.peach + 0.3, 1567.98, 0.03, 0.3], ['glitter', B.cry, B.cry + 0.5]],
        }
      } },
    { lines: ['you’re the friend with the *advice*.', 'you never take *any* of it.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, f1: C + 1.4, f2: C + 3.0, f3: C + 4.6, turn: C + 7.6, flip: C + 9.0, sweat: C + 10.6, out: C + 14.6 }
        const TIPS = [['just tell them!', B.f1], ['rest. please.', B.f2], ['you deserve better', B.f3]]
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out); if (a <= 0.01) return
            const cols = [K.THEM, '#9fe6b0', '#ffb38a']
            ;[620, 770, 920].forEach((fx, i) => K.mini(x, t, { x: fx, y: K.ACT_Y + 10, size: 115, color: cols[i], mood: t > TIPS[i][1] + 0.4 ? (t > B.flip ? 'wide' : 'happy') : 'squint', look: t > B.flip ? [-1, 0] : [-1, 0], seed: 10 + i, pop: a, hops: [TIPS[i][1] + 0.4, B.flip + 0.1 * i] }))
            K.mini(x, t, { x: 300, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.sweat ? 'wide' : 'sparkle', look: [1, 0], seed: 4, pop: a, hops: TIPS.map(q => q[1]) })
            TIPS.forEach(([tx, tt], i) => { if (t > tt && t < B.turn) K.bubble(x, tx, 470 + i * 40, 930 + i * 70, { size: 24, color: K.ME.color, ink: K.INK, s: K.pop01(t, tt, 0.3, 2.6) * a }) })
            // the banner: "ADVICE BOOTH" → flips to "TAKE YOUR OWN ADVICE"
            const fl = K.prog(t, B.flip, B.flip + 0.4)
            const sy = Math.abs(Math.cos(Math.PI * fl))
            if (t > B.turn) K.banner(x, fl < 0.5 ? 'ADVICE BOOTH: OPEN' : 'TAKE YOUR OWN ADVICE', 540, 960, { size: 36, s: K.pop01(t, B.turn, 0.35, 2.4) * a, color: fl < 0.5 ? '#2a1d55' : '#ff4d6d', rot: -0.03 })
            void sy
            if (t > B.sweat) { x.fillStyle = '#8fe3ff'; for (let i = 0; i < 3; i++) { const ph = (t * 1.5 + i / 3) % 1; x.globalAlpha = 1 - ph; x.fillRect(370 + i * 12, K.ACT_Y - 110 + ph * 50, 8, 12) } x.globalAlpha = 1 }
          },
          cues: [['pop', B.f1, 987.77, 0.035, -0.2], ['pop', B.f2, 1108.73, 0.035, 0], ['pop', B.f3, 1318.51, 0.035, 0.2], ['pop', B.turn, 659.25, 0.035, 0], ['whoosh', B.flip, 0.3, 0.04], ['boom', B.flip + 0.2, 0.09], ['pop', B.flip + 0.2, 392, 0.04, 0], ['tick', B.sweat, 0.04]],
        }
      } },
    { lines: ['this week: let someone take care of *you*.', 'say yes to the soup. sit *down*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, bring: C + 2.0, refuse: C + 3.8, again: C + 7.0, sit: C + 8.8, sip: C + 10.4 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in); if (a <= 0.01) return
            const sitP = K.ease.inOutCubic(K.prog(t, B.sit, B.sit + 0.7))
            // a little cushion
            if (t > B.sit - 0.4) K.drawBits(x, ['.PPPPPPPP.', 'PPPPPPPPPP', 'PPPPPPPPPP', '.PPPPPPPP.'], K.COL, 340, K.GROUND - 14, 10 * K.pop01(t, B.sit - 0.4, 0.3, 2.4) * a)
            const bx = t < B.bring ? 860 : t < B.refuse ? K.lerp(860, 520, K.ease.inOutCubic(K.prog(t, B.bring, B.bring + 0.8))) : t < B.again ? K.lerp(520, 640, K.prog(t, B.refuse, B.refuse + 0.5)) : K.lerp(640, 500, K.ease.inOutCubic(K.prog(t, B.again, B.again + 0.6)))
            K.mini(x, t, { x: bx, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.sip ? 'heart' : 'happy', look: [-1, 0], seed: 9, pop: a, hops: [B.bring, B.again] })
            K.mini(x, t, { x: 340, y: K.lerp(K.ACT_Y, K.ACT_Y - 30, sitP), size: 155, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.sip ? 'heart' : t > B.again ? 'wide' : 'neutral', look: [1, 0], squash: sitP * 0.18 + (t > B.refuse && t < B.again ? 0.03 * Math.sin(t * 20) : 0), seed: 4, pop: a, hops: [B.sit], tears: t > B.sip ? 1 : 0 })
            // the bowl
            const held = t < B.sip
            const bowlX = held ? bx - 80 : 420, bowlY = held ? K.ACT_Y - 40 : K.ACT_Y - 70
            K.drawBits(x, K.BM.BOWL, K.COL, bowlX, bowlY, 6 * a); steam(K, x, t, bowlX, bowlY - 22, a)
            if (t > B.refuse && t < B.again) K.bubble(x, 'oh no, I’m fine!', 340, K.ACT_Y - 180, { size: 26, color: K.ME.color, ink: K.INK, s: K.pop01(t, B.refuse, 0.3, 2.6) * a })
            if (t > B.again && t < B.sip + 0.6) K.bubble(x, 'sit. it’s for you.', 640, K.ACT_Y - 190, { size: 26, color: '#6f5bd6', s: K.pop01(t, B.again, 0.3, 2.6) * a, tail: -1 })
            if (t > B.sip) { K.heart(x, 420, K.ACT_Y - 190 - (t - B.sip) * 18, 8 * K.pop01(t, B.sip, 0.35, 3)); K.sparkles(x, t, 420, K.ACT_Y - 90, B.sip, 12, 160, 6) }
          },
          cues: [['whoosh', B.bring, 0.4, 0.03], ['pop', B.refuse, 587.33, 0.035, -0.3], ['pop', B.again, 880, 0.035, 0.3], ['pop', B.sit - 0.4, 659.25, 0.03, -0.3], ['tick', B.sit + 0.7, 0.04], ['glitter', B.sip, B.sip + 0.6], ['pop', B.sip, 1318.51, 0.045, 0]],
        }
      } },
  ],
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
