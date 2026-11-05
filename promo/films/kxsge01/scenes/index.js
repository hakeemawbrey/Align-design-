// kxsge01 · Your Star Guide: Extended · ♈ The Aries Guide: Love at Full Speed · 68 s · hard cut
//   0–3.6   HOOK: tiny Aries mid-sprint, phone already sent ("SENT 0.4s" stamp), motion lines, whip zoom.
//           "ARIES. YOU TEXTED BACK INSTANTLY. AGAIN."  Promise sticker: STAY FOR CHAPTER 4.
//   ch1 HOW YOU LOVE        Aries races a heart across the stage to the other star in one second.
//   ch2 WHAT YOU NEED       a cozy campfire (not a wildfire); the other star stays calm and warms its hands.
//   ch3 WHERE IT GETS HARD  Aries revs, the other star is still reading the menu; "OVERTHINKING THEIR PACE" bar.
//   ch4 TRY THIS WEEK       a stopwatch; Aries asks one big question and listens to the whole answer.
//   Last line: "Fast heart. Long listen."  Pisces (right) cries through it all.
import { guideXFilm, HK } from '../sgxkit.js'

const WHIP = { at: 0.55, from: 1.5 }

const F = guideXFilm({
  id: 'kxsge01', sign: 'aries',
  hook: 'ARIES. YOU TEXTED BACK | *INSTANTLY.* AGAIN.',
  promise: 'STAY FOR CHAPTER 4',
  chip: 'ARIES: CARDINAL FIRE,|RULED BY MARS', chipCh: 0,
  last: 'Fast heart. | *Long* listen.', late: 2, ending: 'cut',
  hookScene: K => {
    const RUN = t => K.lerp(330, 820, K.prog(t, -0.2, 3.0))
    return {
      fx: [{ scene: HK.whipZoom(WHIP), cues: HK.whipZoomCues(WHIP) }],
      shake: t => K.shake(t, 0.05, 10, 0.35),
      draw(x, t) {
        const z = 1 + 0.5 * (1 - K.ease.outCubic(K.prog(t, 0, 0.5)))   // whip zoom settling
        const zc = RUN(t); x.save(); x.translate(zc, 1100); x.scale(z, z); x.translate(-zc, -1100)
        // motion lines
        x.fillStyle = 'rgba(255,214,140,0.7)'
        for (let i = 0; i < 9; i++) { const ph = (t * 3 + i / 9) % 1; x.fillRect(RUN(t) - 160 - ph * 360, 980 + i * 34, 120 - ph * 60, 7) }
        const ax = RUN(t)
        K.mini(x, t, { x: ax, y: 1130, size: 300, color: K.ME.color, glyph: K.ME.glyph, mood: 'squint', look: [1, 0], squash: 0.14 + 0.05 * Math.sin(t * 22), seed: 4, bob: 0 })
        K.phone(x, ax + 200, 1010, 0.62, { header: 'THEM', rows: [{ text: 'hey :)' }, { text: 'HEY!!! hi!!', me: true, color: '#e2453c' }], rot: 0.18, glow: 0.6 })
        K.stamp(x, t, -0.3, 'SENT 0.4s', ax + 200, 1180, { size: 44, color: '#ffd34d', rot: -0.12 })
        x.restore()
      },
      cues: [['boom', 0.02, 0.14], ['whoosh', 0.02, 0.5, 0.05], ['pop', 0.05, 1318.51, 0.04, 0.3], ['whoosh', 2.6, 0.5, 0.03]],
    }
  },
  chapters: [
    { // 1 HOW YOU LOVE: you love like a starting gun
      lines: ['you love like a *starting gun*.', 'one look and you’re already *running*.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, go: C + 2.4, arrive: C + 3.4, back: C + 7.5, two: C + 9.0, hug: C + 10.4, out: C + 14.6 }
        const ax = t => t < B.go ? 260 : t < B.arrive ? K.lerp(260, 650, K.ease.inOutCubic(K.prog(t, B.go, B.arrive))) : t < B.back ? 650 : K.lerp(650, 300, K.ease.inOutCubic(K.prog(t, B.back, B.back + 0.8)))
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out)
            if (a <= 0.01) return
            // the starting gun flag
            K.banner(x, 'GO!', 200, 1000, { s: K.pop01(t, B.go - 0.2, 0.3, 3) * a, size: 40, color: '#e2453c', rot: -0.1 })
            K.mini(x, t, { x: 780, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.arrive ? (t > B.hug ? 'heart' : 'wide') : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.arrive + 0.05, B.hug] })
            K.mini(x, t, { x: ax(t), y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t < B.arrive ? 'squint' : 'happy', look: [t > B.back && t < B.back + 0.8 ? -1 : 1, 0], squash: t > B.go && t < B.arrive ? 0.16 : 0, seed: 4, pop: a, hops: [B.in, B.hug] })
            // the heart she carries
            if (t > B.in) K.heart(x, ax(t) + 70, K.ACT_Y - 110 + Math.sin(t * 6) * 6, 7 * a)
            if (t > B.go && t < B.arrive) { x.fillStyle = 'rgba(255,214,140,0.7)'; for (let i = 0; i < 5; i++) x.fillRect(ax(t) - 120 - i * 30, K.ACT_Y - 50 + i * 24, 70, 6) }
            K.burst(x, 560, K.ACT_Y - 180, 100, t, B.arrive - 0.05, { word: 'ZOOM!', size: 36, color: '#ffd34d', life: 0.9 })
            K.stamp(x, t, B.arrive + 0.2, '1.0 s', 640, 940, { size: 46, color: '#ffd34d', life: 2.6 })
            // the second gag: Aries runs back and does it again, with flowers
            if (t > B.two) { const p = K.pop01(t, B.two, 0.35, 2.5); K.drawBits(x, K.BM.ROSE, K.COL, 420, K.ACT_Y - 150, 9 * p * a); K.label(x, 'AGAIN?!', 420, K.ACT_Y - 230, 40, '#ff9a7a', p * a * (1 - K.prog(t, B.two + 2.6, B.two + 3))) }
            if (t > B.hug) K.heart(x, 600, K.ACT_Y - 170 - (t - B.hug) * 22, 8 * K.pop01(t, B.hug, 0.35, 3), (1 - K.prog(t, B.hug + 2, B.hug + 2.6)) * a)
          },
          cues: [['pop', B.in, 880, 0.03, -0.3], ['boom', B.go - 0.2, 0.1], ['whoosh', B.go, 0.6, 0.05], ['tick', B.arrive, 0.05], ['pop', B.arrive + 0.2, 1318.51, 0.04, 0.2], ['whoosh', B.back, 0.4, 0.03], ['pop', B.two, 1567.98, 0.035, -0.2], ['glitter', B.hug, B.hug + 0.4], ['pop', B.hug, 1318.51, 0.04, 0]],
        }
      },
    },
    { // 2 WHAT YOU NEED: a campfire, not a wildfire
      lines: ['someone who loves your *fire*…', '…and stays *calm* when it flares.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, flare: C + 3.2, calm: C + 7.4, warm: C + 9.6, marsh: C + 11.4, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out)
            if (a <= 0.01) return
            const flare = t > B.flare && t < B.calm ? 1 + 0.6 * K.ease.outCubic(K.prog(t, B.flare, B.flare + 0.4)) : t >= B.calm ? K.lerp(1.6, 1, K.ease.inOutCubic(K.prog(t, B.calm, B.calm + 1))) : 1
            const fy = K.GROUND - 40
            x.save(); x.globalAlpha *= a
            const g = x.createRadialGradient(540, fy - 30, 10, 540, fy - 30, 220 * flare); g.addColorStop(0, 'rgba(255,170,80,0.45)'); g.addColorStop(1, 'rgba(255,120,60,0)')
            x.fillStyle = g; x.fillRect(200, fy - 300, 680, 400); x.restore()
            const flick = 1 + 0.08 * Math.sin(t * 19)
            K.drawBits(x, K.BM.FIRE, K.COL, 540, fy - 20 * flare, 12 * flare * flick * a)
            K.mini(x, t, { x: 320, y: K.ACT_Y, size: 150, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.flare && t < B.calm ? 'wide' : 'happy', look: [1, 0], seed: 4, pop: a, hops: [B.flare] })
            K.mini(x, t, { x: 760, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.calm ? 'happy' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: [B.calm, B.warm] })
            K.label(x, t < B.calm ? 'WILDFIRE?' : 'CAMPFIRE.', 540, 960, 52, t < B.calm ? '#ff7a5c' : '#ffd34d', K.pop01(t, t < B.calm ? B.flare : B.calm, 0.3, 3) * a * (t > B.flare ? 1 : 0))
            // the calm star warms its hands; then a marshmallow on a stick
            if (t > B.warm) { K.sparkles(x, t, 680, K.ACT_Y - 20, B.warm, 8, 70, 3) }
            if (t > B.marsh) { const p = K.prog(t, B.marsh, B.marsh + 0.6); x.save(); x.strokeStyle = '#7a4a2a'; x.lineWidth = 6; x.beginPath(); x.moveTo(720, K.ACT_Y - 10); x.lineTo(K.lerp(720, 600, p), K.ACT_Y - 60); x.stroke(); x.fillStyle = '#fff6e8'; x.fillRect(K.lerp(720, 600, p) - 12, K.ACT_Y - 74, 24, 22); x.restore() }
          },
          cues: [['pop', B.in, 659.25, 0.03, 0], ['boom', B.flare, 0.1], ['whoosh', B.flare, 0.5, 0.04], ['pluck', B.calm, 880, 0.035, 0.5, 0], ['glitter', B.warm, B.warm + 0.5], ['pop', B.marsh, 1174.66, 0.03, 0.3]],
        }
      },
    },
    { // 3 WHERE IT GETS HARD: fast feels like proof; slow isn't rejection
      lines: ['fast feels like *proof* to you.', 'slow isn’t *rejection*. it’s pace.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, menu: C + 1.0, bar: C + 2.6, err: C + 5.6, stop: C + 8.0, sit: C + 9.2, pick: C + 11.6, out: C + 14.6 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in, B.out)
            if (a <= 0.01) return
            const revving = t < B.stop
            const vib = revving ? Math.sin(t * 70) * 3 : 0
            K.mini(x, t, { x: 300 + vib, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: revving ? 'squint' : t < B.pick ? 'neutral' : 'happy', look: [1, 0], squash: revving ? 0.16 : t > B.sit ? 0.2 : 0, seed: 4, pop: a, bob: revving ? 0 : undefined, hops: [B.stop, B.pick] })
            K.mini(x, t, { x: 760, y: K.ACT_Y, size: 150, color: K.THEM, mood: t > B.pick ? 'happy' : 'neutral', look: [0, 1], seed: 9, pop: a, hops: [B.pick] })
            // the menu the other star is reading
            const mp = K.pop01(t, B.menu, 0.35, 2.4) * a * (1 - K.prog(t, B.pick + 0.6, B.pick + 1))
            if (mp > 0.01) { K.banner(x, 'MENU', 760, K.ACT_Y - 150, { s: mp, size: 30, color: '#f5eedf', ink: '#1b1236', border: '#c08552', rot: Math.sin(t * 1.3) * 0.05 }) }
            if (t > B.pick) K.label(x, '“the tacos!”', 760, K.ACT_Y - 170, 40, '#9fe6b0', K.pop01(t, B.pick, 0.3, 3) * a * (1 - K.prog(t, B.pick + 2.4, B.pick + 2.8)))
            // the overthinking bar
            if (t > B.bar && t < B.stop + 0.6) {
              const ba = K.pop01(t, B.bar, 0.3, 2.4) * (1 - K.prog(t, B.stop, B.stop + 0.6)) * a
              const pct = Math.min(99, Math.round(K.prog(t, B.bar, B.err) * 99))
              x.save(); x.globalAlpha *= ba
              x.fillStyle = 'rgba(16,10,38,0.92)'; x.fillRect(150, 900, 780, 120); x.strokeStyle = '#ff4d6d'; x.lineWidth = 6; x.strokeRect(150, 900, 780, 120)
              x.font = '700 28px Space Mono, monospace'; x.fillStyle = '#ffd9e0'; x.textAlign = 'left'; x.fillText(t < B.err ? `“are they even into me?” ${pct}%` : 'ERROR: they’re just reading.', 176, 945)
              x.fillStyle = '#3a3168'; x.fillRect(176, 968, 728, 26); x.fillStyle = t < B.err ? '#ff4d6d' : '#ffd34d'; x.fillRect(176, 968, 728 * (pct / 99), 26)
              x.restore()
            }
            if (revving) { x.save(); for (let i = 0; i < 5; i++) { const ph = (t * 2.6 + i / 5) % 1; x.fillStyle = `rgba(239,230,214,${0.55 * (1 - ph)})`; const s = 8 + ph * 22; x.fillRect(Math.round(220 - ph * 140), Math.round(K.ACT_Y + 60 - ph * 40 - i * 4), s, s) } x.restore() }
            K.burst(x, 250, K.ACT_Y - 150, 90, t, C + 1.6, { word: 'VRRM!', color: '#ffd34d', size: 34, life: 0.9 })
            K.burst(x, 250, K.ACT_Y - 150, 90, t, C + 4.4, { word: 'VRRM!', color: '#ff9a7a', size: 34, life: 0.9 })
            // Aries sits down next to them
            if (t > B.sit) K.label(x, 'take your time.', 420, K.ACT_Y - 150, 34, BONE_(K), K.pop01(t, B.sit, 0.3, 3) * a * (1 - K.prog(t, B.pick - 0.4, B.pick)))
          },
          cues: [['pop', B.menu, 739.99, 0.03, 0.3], ['boom', C + 1.6, 0.1], ['boom', C + 4.4, 0.1], ['tick', B.bar, 0.04], ['tick', B.bar + 1, 0.03], ['tick', B.bar + 2, 0.03], ['boom', B.err, 0.08], ['pop', B.err, 392, 0.04, 0], ['tick', B.stop, 0.04], ['pluck', B.sit, 880, 0.035, 0.5, 0], ['pop', B.pick, 1318.51, 0.04, 0.3], ['glitter', B.pick, B.pick + 0.4]],
        }
      },
    },
    { // 4 TRY THIS WEEK: one big question, then listen to the end
      lines: ['ask *one* big question this week.', 'then listen to the *whole* answer.'],
      gag: (C, K) => {
        const B = { in: C + 0.3, q: C + 2.0, watch: C + 3.4, talk: C + 4.2, itch: C + 8.6, hold: C + 9.6, done: C + 12.2 }
        return {
          draw(x, t) {
            const a = K.appear(t, B.in)
            if (a <= 0.01) return
            const listening = t > B.talk && t < B.done
            K.mini(x, t, { x: 330, y: K.ACT_Y, size: 160, color: K.ME.color, glyph: K.ME.glyph, mood: t > B.done ? 'heart' : t > B.itch && t < B.hold ? 'squint' : 'happy', look: [1, 0], squash: t > B.itch && t < B.hold ? 0.12 + 0.04 * Math.sin(t * 30) : 0, seed: 4, pop: a, hops: [B.q, B.done] })
            K.mini(x, t, { x: 740, y: K.ACT_Y, size: 150, color: K.THEM, mood: listening ? 'happy' : t > B.done ? 'heart' : 'neutral', look: [-1, 0], seed: 9, pop: a, hops: listening ? [B.talk, B.talk + 1.3, B.talk + 2.7, B.talk + 4.0, B.talk + 5.4, B.talk + 6.6] : [B.done] })
            K.bubble(x, 'what made you happy this year?', 470, 1000, { size: 26, s: K.pop01(t, B.q, 0.3, 2.6) * a * (1 - K.prog(t, B.talk, B.talk + 0.3)), color: '#e2453c' })
            if (listening) { const dots = '.'.repeat(1 + Math.floor((t * 3) % 3)); K.bubble(x, ['so, my grandma', 'and then the dog', 'and THEN', 'anyway it was nice'][Math.min(3, Math.floor((t - B.talk) / 2))] + dots, 700, 1000, { size: 26, color: '#6f5bd6', s: K.pop01(t, B.talk, 0.3, 2.6) * a, tail: -1 }) }
            // the stopwatch the guide holds up
            const wp = K.pop01(t, B.watch, 0.35, 2.4) * a * (1 - K.prog(t, B.done + 0.8, B.done + 1.2))
            if (wp > 0.01) {
              K.drawBits(x, K.BM.WATCH, K.COL, 540, 880, 12 * wp)
              const secs = Math.max(0, Math.min(t, B.done) - B.talk)
              K.label(x, `0:${String(Math.floor(secs)).padStart(2, '0')}`, 540, 960, 40, '#ffd34d', wp)
            }
            if (t > B.itch && t < B.hold) K.label(x, 'don’t interrupt…', 330, K.ACT_Y - 150, 34, '#ff9a7a', K.pop01(t, B.itch, 0.3, 3))
            if (t > B.done) { K.heart(x, 535, K.ACT_Y - 150 - (t - B.done) * 20, 9 * K.pop01(t, B.done, 0.35, 3)); K.sparkles(x, t, 535, K.ACT_Y - 60, B.done, 12, 160, 5) }
          },
          cues: [['pop', B.q, 1174.66, 0.04, -0.3], ['tick', B.watch, 0.05], ...Array.from({ length: 8 }, (_, i) => ['tick', +(B.talk + i).toFixed(2), 0.02]), ['pop', B.itch, 466.16, 0.035, -0.3], ['pluck', B.hold, 880, 0.035, 0.5, -0.3], ['glitter', B.done, B.done + 0.5], ['pop', B.done, 1318.51, 0.045, 0]],
        }
      },
    },
  ],
})
function BONE_(K) { return K.BONE }
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, LINES_EXPORT = F.LINES_EXPORT
