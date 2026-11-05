// kpsae06 · Planet Talk: Saturn · "Standards or a Wall, Virgo?" (30 s vertical, loop) · lofi · D
//   0      Saturn has just crashed through a checklist scroll taller than the room, paper strips mid-flight, Virgo
//          clutching a pen. "VIRGO. | That list has *forty* rules."  · 0.12 whip zoom + flash
//   2.5    ♄ "VIRGO. Put. The pen. *Down.*" · 4.6 notification: "had the *best* time tonight :)"
//   5.0    ♍ "lovely! checking the *list…*" · 7.0 caught: "37. must like the same soup" · ♍ "rule 37. it's *over.*"
//   11.2   ♄ "standards protect you." · 13.2 "*walls* keep everyone out." · 15.2 three dealbreaker cards slam down:
//          KIND · HONEST · SHOWS UP · 16.4 ♄ "keep these three. *gently* lose the rest." · 18.8 the scroll → confetti
//   19.4   ♍ "and the rest of the *list?*" · 21.4 ♄ "*curiosity.*" · 23.0 Pisces the intern: "soup is not a *dealbreaker!!*"
//   25.2   ♍ "sending: 'me too. *second date?*'" · 27.1 ♄ "Three dealbreakers. Room for *surprise.*" · 29.55 loop to frame 0
import { saFilm, HK } from '../../kpsae01/sakit.js'
import { prog, ease, lerp, clamp, rng } from '../../../src/lib.js'

const D = 30
const N = { at: 4.6, out: [6.9, 7.15], title: 'texts', body: 'had the *best* time tonight :)', glyph: '♡', y: 330 }
const RULES = ['replies within 1 hr', 'owns a plant (alive)', 'knows a fork from a spork', 'folds towels in thirds', 'no typos. ever.', 'likes early mornings', 'reads the manual', 'labels the leftovers',
  'same bedtime as me', 'never says "irregardless"', 'one (1) emoji max', 'tidy shoes', 'irons the tea towels', 'books dentist on time', 'matching socks']
const RIP = 18.8
const CARDS = [['KIND', 15.2, 300], ['HONEST', 15.6, 540], ['SHOWS UP', 16.0, 780]]
const F = saFilm({
  id: 'kpsae06', sign: 'virgo', dur: D, ending: 'loop',
  hook: 'VIRGO.|That list has *forty* rules.', hookY: 1700, hookSize: 84, hookOut: 2.4,
  arrive: { kind: 'crash', at: -0.66, x: 720, y: 640, size: 380 },
  flashes: [0.12],
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 7.0, cam: [1.45, 790, 1000] },
    { at: 9.2, cam: [1, 540, 960] },
    { at: 15.1, cam: [1.1, 540, 1150] },
    { at: 18.7, cam: [1, 540, 960] },
  ],
  says: [
    { t0: 2.5, t1: 4.4, who: 'saturn', text: 'VIRGO. Put. The pen. *Down.*', x: 540, y: 185 },
    { t0: 5.0, t1: 6.8, who: 'virgo', text: 'lovely! checking the *list…*', x: 380, y: 1680, tailUp: true, tail: -40 },
    { t0: 9.3, t1: 11.0, who: 'virgo', text: "rule 37. it's *over.*", x: 380, y: 1680, tailUp: true, tail: -40 },
    { t0: 11.2, t1: 13.0, who: 'saturn', text: 'standards protect you.', x: 540, y: 185 },
    { t0: 13.2, t1: 15.0, who: 'saturn', text: '*walls* keep everyone out.', x: 540, y: 185 },
    { t0: 16.4, t1: 18.6, who: 'saturn', text: 'keep these three. *gently* lose the rest.', x: 540, y: 185 },
    { t0: 19.4, t1: 21.2, who: 'virgo', text: 'and the rest of the *list?*', x: 380, y: 1680, tailUp: true, tail: -40 },
    { t0: 21.4, t1: 22.8, who: 'saturn', text: '*curiosity.*', x: 540, y: 185, size: 56 },
    { t0: 23.0, t1: 25.0, who: 'pisces', text: 'soup is not a *dealbreaker!!*', x: 640, y: 1480, tail: 260 },
    { t0: 25.2, t1: 27.0, who: 'virgo', text: "sending: 'me too. *second date?*'", x: 420, y: 1680, tailUp: true, tail: -60 },
    { t0: 27.1, t1: 29.45, who: 'saturn', text: 'Three dealbreakers. Room for *surprise.*', x: 540, y: 185, size: 48 },
  ],
  heads: [{ text: 'rule 37:|*same* soup.', at: 7.25, out: [9.0, 9.2], top: 1150, size: 84 }],
  fx: [{ f: HK.notification, c: HK.notificationCues, o: N }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#22304a', wall2: '#121a2e', floor: '#2a2a3e', floorY: 1470, window: false, warm: 0.3 })
    // the scroll (torn by Saturn's crash; ripped to confetti at RIP)
    const rip = prog(t, RIP, RIP + 0.6)
    const hole = t > K.LAND - 0.05 ? 1 : 0
    if (rip < 1) {
      x.save(); x.globalAlpha *= 1 - rip
      x.beginPath(); x.rect(600, -60, 360, 1530)
      if (hole) { const R = rng(3); x.moveTo(720 + 230, 600); for (let i = 1; i <= 24; i++) { const a = i / 24 * Math.PI * 2, rr = 210 + R() * 40; x.lineTo(720 + Math.cos(a) * rr, 600 + Math.sin(a) * rr) } x.closePath() }
      x.clip('evenodd')
      K.rect(x, 590, -60, 380, 1530, K.INK); K.rect(x, 600, -60, 360, 1530, '#fffaf0')
      for (let i = 0; i < 44; i++) {
        const yy = -20 + i * 26, n = i - 2
        if (n < 1 || n > 40) continue
        const rule = n === 37 ? 'must like the same soup' : RULES[(n * 7) % RULES.length]
        K.txt(x, `${n}. ${rule}`, 620, yy, { size: 19, align: 'left', color: n === 37 ? '#c8243a' : '#3a2f5a' })
      }
      x.restore()
    }
    // paper strips: mid-flight at frame 0, confetti at RIP
    for (const [b0, n, cx, cy, sp] of [[-0.3, 26, 720, 600, 900], [RIP, 40, 780, 700, 500]]) {
      const P = rng(b0 > 0 ? 21 : 13)
      for (let i = 0; i < n; i++) {
        const a = P() * Math.PI * 2, v = sp * (0.4 + P()), d = t - b0, rot = P() * 6
        if (d < 0 || d > 2.8) continue
        const X = cx + Math.cos(a) * v * d + (b0 > 0 ? (P() - 0.5) * 300 : 0), Y = cy + Math.sin(a) * v * d * 0.6 + 600 * d * d
        x.save(); x.translate(X, Y); x.rotate(rot + d * 5); K.rect(x, -26, -8, 52, 16, b0 > 0 ? ['#fffaf0', '#ffd99a', '#ff8fb1', '#7fe3ff'][i % 4] : '#fffaf0'); x.restore()
      }
    }
    // the table + Virgo with its pen
    K.box(x, 60, 1450, 960, 36, '#8a6a4a')
    const vMood = t < 2.4 ? 'wide' : t < 7 ? 'happy' : t < 11 ? 'squint' : t < 18.7 ? 'neutral' : t < 21.3 ? 'wide' : t < 25.1 ? 'sparkle' : 'happy'
    K.sign(x, t, 'virgo', { x: 330, y: 1290, s: 300, mood: vMood, look: t > 4.9 && t < 11 ? [1, -0.6] : [0.6, -1], sweat: t < 1.5 })
    x.save(); x.translate(470, 1300); x.rotate(-0.6 + (t < 11 ? 0.15 * Math.sin(t * 9) : 0)); K.box(x, -8, -90, 16, 140, '#3a6ae0'); K.rect(x, -8, 50, 16, 20, '#c9c9d8'); x.restore()
    // the dealbreaker cards
    for (const [w, at, cx] of CARDS) {
      const k = K.pop01(t, at, 0.3, 2.4)
      if (k <= 0.01) continue
      const drop = (1 - ease.outCubic(prog(t, at, at + 0.2))) * -200
      x.save(); x.translate(cx, 1610 + drop); x.rotate((cx - 540) * 0.0005 + 0.04 * Math.sin(cx)); x.scale(k, k)
      K.box(x, -100, -130, 200, 260, '#1a1236', { o: 6 }); K.rect(x, -88, -118, 176, 236, '#2a1d4e')
      K.txt(x, 'DEALBREAKER', 0, -80, { size: 16, color: K.GOLD }); K.txt(x, w, 0, 6, { size: w.length > 6 ? 30 : 38, color: K.BONE })
      K.txt(x, '★', 0, 76, { size: 40, color: K.GOLD })
      x.restore()
    }
    // Saturn, through the scroll
    const sMood = t < 2.4 ? 'wide' : t < 9.2 ? 'neutral' : t < 15 ? 'sly' : t < 21.3 ? 'neutral' : t < 23 ? 'proud' : 'happy'
    K.arriving(x, t, { mood: sMood, look: [-0.8, 0.6] })
    K.intern(x, t, { x: 930, y: 1300, s: 200, pop: K.pop01(t, 1.6, 0.4), tears: t > 22.9 ? 3 : 2, mood: t > 22.9 ? 'wide' : 'sparkle' })
  },
  over(x, t, K) {
    // rule 37, caught (shot 7.0: zoom 1.45 on (790, 1000) → screen)
    K.caught(x, t, { at: 7.1, X: 520, Y: 950, r: 150, out: 9.15 })
  },
  cues: [
    ...[0.0, 0.06, 0.12].map(t => ['tick', t, 0.06]), ['whoosh', 0.02, 0.3, 0.05],
    ['tick', 7.12, 0.05], ['pop', 7.2, 392, 0.05, 0],
    ...CARDS.map(([, at], i) => ['boom', at + 0.05, 0.05]), ...CARDS.map(([, at], i) => ['pop', at + 0.08, [659.25, 783.99, 987.77][i], 0.05, 0]),
    ['whoosh', RIP, 0.4, 0.05], ...[RIP + 0.05, RIP + 0.12, RIP + 0.2, RIP + 0.3].map(t => ['tick', t, 0.04]), ['glitter', RIP + 0.1, RIP + 1.6],
    ['bell', 21.5, 1174.66, 0.04, 1.2, 0], ['glitter', 23.0, 24.4],
  ],
  music: { style: 'lofi', key: 'D', seed: 7106, sections: { lift: [15.2] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
