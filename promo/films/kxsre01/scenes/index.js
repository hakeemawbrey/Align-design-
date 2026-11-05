// kxsre01: SILENT REVIEW: EXTENDED, "Virgo silently reviews a first date" (60 s vertical, star_talk post, jazzy · C).
// The format lives in ../srkit.js (shared by kxsre01–kxsre06). No end card, no card transition: hard cut on the last line.
// ♍ Virgo, the strictest critic in the house, reviews a whole first date with ♐ Sagittarius at a dumpling bar. Not one
// word from Virgo. Pisces is the server and cries at every course.
//   0.0–3.0    HOOK: frame 0 mid-whip: Sag mid-trip through the door, a dumpling mid-air toward Virgo, Virgo's eyebrow up.
//              "Silent review: | a *whole first date.*" 0.55 record scratch: "wait for the *final score.*" + caught circle
//              on the eyebrow. 2.25 ◀◀ REWIND.
//   3.0–14.0   1 · ARRIVAL: Sag bursts in breathless, jacket inside out. [ one eyebrow ] [ notices the *jacket* ] → 4/10
//   14.0–25.0  2 · STARTER: dumplings; a chopstick goes flying, Sag laughs at itself. [ fighting a smile ] → 6/10
//   25.0–36.0  3 · MAIN: Sag remembers what Virgo texted weeks ago (the sister's new puppy). [ eyebrows: *both* ] → 8/10
//   36.0–48.5  4 · DESSERT: Sag slides over the last dumpling. [ a single tear ] → 10/10
//   48.5–60.0  THE VERDICT: First impression ★★ · Listening ★★★★★ · Chopsticks ★ · The last dumpling *priceless* · 9/10.
//              "Judged the door. *Loved* the dessert."
import { makeSR, R, box, plate, dumpling, label, shadow, sparkles, hearts, glow, scrawl, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, DATE, REV } from '../srkit.js'

const C1 = 3.0, C2 = 14.0, C3 = 25.0, C4 = 36.0

// the dumpling bar: a warm red wall, paper lanterns, a menu board of pixel tiles, the door on the right
function venue(x, t) {
  R(x, '#4a1f2c', -300, 300, 1680, 800); R(x, '#36141f', -300, 960, 1680, 110)
  // the menu board (tiles only, no words)
  box(x, 150, 360, 420, 230, '#1f1a2e', { b: 8 })
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) R(x, (i + j) % 3 ? '#efe6d6' : GOLD, 180 + i * 64, 392 + j * 48, 40 + (i * j) % 3 * 6, 12)
  // the door (right)
  box(x, 860, 520, 210, 440, '#6b3a2a', { b: 8 }); R(x, '#1a2a56', 890, 560, 150, 180); R(x, GOLD, 1030, 760, 14, 14)
  for (let i = 0; i < 5; i++) R(x, i % 2 ? GOLD : PINK, 900 + i * 28, 580 + (i * 37) % 120, 8, 8)
  // paper lanterns
  for (const [lx, ly] of [[90, 420], [640, 380], [760, 440]]) {
    const sw = Math.sin(t * 1.4 + lx) * 0.06
    x.save(); x.translate(lx, ly - 80); x.rotate(sw)
    R(x, INK, -2, 0, 4, 60)
    glow(x, 0, 110, 120, '255,120,90', 0.18)
    box(x, -46, 60, 92, 96, '#e8443a', { b: 6 }); R(x, '#ff7a5a', -46, 60, 20, 96); R(x, INK, -50, 72, 100, 6); R(x, INK, -50, 140, 100, 6)
    x.restore()
  }
  glow(x, 540, 820, 520, '255,200,160', 0.12)
}

// the inside-out jacket tag on Sag (sprite cells)
function tag(x) { R(x, INK, 27.5, 15.5, 6, 5); R(x, CREAM, 28, 16, 5, 4); R(x, '#c9bba4', 28.6, 16.8, 3.6, 0.6); R(x, '#c9bba4', 28.6, 18, 2.4, 0.6) }

// two chopsticks resting by a plate; one flies (start..end) in a spin
function chopsticks(x, t, cx, cy, fly = null) {
  const stick = (X, Y, rot) => { x.save(); x.translate(X, Y); x.rotate(rot); R(x, INK, -66, -6, 132, 12); R(x, '#d9a96a', -62, -3, 124, 6); x.restore() }
  stick(cx, cy, -0.12)
  if (!fly || t < fly[0]) { stick(cx + 6, cy + 14, -0.08); return }
  const p = clamp((t - fly[0]) / (fly[1] - fly[0]))
  if (p >= 1) { stick(cx + 220, cy + 70, 1.4); return }
  stick(lerp(cx + 6, cx + 220, p), cy + 14 - 420 * p + 476 * p * p, -0.08 + p * 14)
}

const EP = makeSR({
  id: 'kxsre01', reviewer: 'virgo', date: 'sagittarius', accent: '#9fe6b0',
  hookLine: 'Silent review: | a *whole first date.*',
  plate: 'VIRGO · CRITIC',
  venue,
  hook: {
    circle: { x: 405, y: 835, r: 150 },
    draw(x, t) {
      // a dumpling mid-air on its way to Virgo, then plop on the table
      const p = clamp((t + 0.35) / 2.2)
      const dx = lerp(820, 470, p), dy = 760 - 260 * Math.sin(Math.PI * p) + 420 * p * p
      if (p < 1) { x.save(); x.translate(dx, dy); x.rotate(t * 9); dumpling(x, 0, 0, 1.4); x.restore() }
      else { dumpling(x, 470, 1160, 1.4); sparkles(x, t, 470, 1140, 1.85, 8, 70, 1) }
      // motion streaks behind the trip
      x.save(); x.globalAlpha = 0.6
      for (let i = 0; i < 4; i++) R(x, BONE, 980 + i * 18, 760 + i * 40, 120 - i * 20, 6)
      x.restore()
    },
  },
  hookFace: (t) => ({ look: [1, -0.4], brows: { l: 1, r: -0.25, sl: -0.7, sr: -0.3 }, mouth: t > 1.8 ? 'tight' : 'o', mood: t > 1.8 ? 'squint' : 'wide' }),
  hookDate: (t) => ({ x: 880 - 30 * Math.sin(t * 2), y: 830 + 40 * Math.sin(t * 3), s: 250, rot: -0.55 + 0.1 * Math.sin(t * 5), mood: 'wide', look: [-1, 1], extra: tag }),
  courses: [
    { title: 'ARRIVAL',
      shots: [[0, 'wide'], [2.6, 'rev'], [5.2, 'date'], [7.0, 'rev']],
      cc: [[0.4, '[ checks the time ]'], [2.7, '[ one eyebrow ]'], [4.2, '[ notices the *jacket* ]'], [7.1, '[ files it under: *first impression* ]']],
      face: [[0, 'side'], [2.6, 'eyebrow'], [4.2, 'squint'], [7.0, 'eyebrow']],
      date: (u, t, t0) => ({ x: lerp(1250, DATE.x, ease.outCubic(clamp(u / 0.8))), mood: u < 5.2 ? 'happy' : u < 7 ? 'wide' : 'happy', look: u > 5.6 && u < 7 ? [1, 1] : [-1, 0], hops: [t0 + 0.2, t0 + 0.5, t0 + 0.8, t0 + 1.2, t0 + 5.3], extra: tag }),
      bubbles: [[1.0, 2.5, 'sorry!! ran here. hi!!'], [5.3, 6.9, 'is my jacket… oh no.']],
      draw(x, t, P) {
        // an arrow + INSIDE OUT label on the tag in the date close-up
        const k = pop01(t, P.t0 + 5.4, 0.25, 2.4) * outK(t, [P.t0 + 6.9, P.t0 + 7.0])
        if (k > 0.01) label(x, 'INSIDE OUT', DATE.x + 120, 830, { size: 30, col: GOLD, alpha: k })
        // Pisces' menus
        if (P.u > 1.8) { box(x, 520, 1110, 120, 80, '#7a2a33', { b: 5 }); R(x, GOLD, 540, 1130, 80, 8) }
      },
      card: '4/10', pis: { at: 1.2, tears: 1, mood: 'wide' },
      cues: [['whoosh', 0.0, 0.5, 0.04], ['tick', 0.8, 0.06], ['pop', 1.0, 880, 0.035, 0.3], ['pop', 5.3, 659.25, 0.035, 0.3], ['pluck', 4.2, 1318.51, 0.035, 0.4, 0]] },
    { title: 'STARTER',
      shots: [[0, 'wide'], [2.8, 'two'], [4.0, 'rev'], [6.4, 'tight']],
      cc: [[0.5, '[ inspects the dumplings ]'], [3.1, '[ watches the chopstick *fly* ]'], [4.1, '[ fighting a smile ]'], [6.6, '[ losing the fight ]']],
      face: [[0, 'squint'], [2.9, 'wide'], [4.0, 'fight'], [6.4, 'smile']],
      date: (u, t, t0) => ({ mood: u > 3.4 ? 'happy' : 'neutral', look: u < 2.8 ? [-1, 1] : u < 3.4 ? [1, -1] : [-1, 0], hops: [t0 + 3.5, t0 + 3.9, t0 + 4.3], extra: tag }),
      bubbles: [[3.6, 5.6, 'i am SO bad at these'], [7.0, 8.6, 'teach me?']],
      draw(x, t, P) {
        if (P.u > 1.1) plate(x, 560, 1180, 200, { food: (q) => { dumpling(q, -50, -18, 0.9); dumpling(q, 20, -16, 0.9); dumpling(q, 70, -22, 0.8) } })
        chopsticks(x, t, 760, 1210, [P.t0 + 2.9, P.t0 + 3.7])
      },
      card: '6/10', pis: { at: 0.6, tears: 2 },
      cues: [['pop', 1.1, 1174.66, 0.035, 0], ['whoosh', 2.9, 0.5, 0.04], ['tick', 3.7, 0.06], ['pop', 3.62, 739.99, 0.035, 0.3], ['pluck', 4.1, 987.77, 0.03, 0.4, -0.2]] },
    { title: 'MAIN',
      shots: [[0, 'wide'], [1.5, 'date'], [3.0, 'rev'], [4.6, 'two'], [7.0, 'rev']],
      cc: [[0.3, '[ chewing. *judging.* ]'], [3.0, '[ eyebrows: *both* ]'], [4.6, '[ slow nod ]'], [7.0, '[ impressed. *visibly.* ]']],
      face: [[0, 'chew'], [1.6, 'poker'], [3.0, 'wide'], [4.6, 'nod'], [7.0, 'smile']],
      date: (u, t, t0) => ({ mood: u > 1.5 && u < 7 ? 'sparkle' : 'happy', look: [-1, 0], hops: [t0 + 1.6, t0 + 2.2, t0 + 2.9, t0 + 4.9, t0 + 5.5], extra: tag }),
      bubbles: [[1.6, 4.4, 'wait, your sister got a puppy? how is it?'], [4.8, 6.8, 'you texted me about it weeks ago!']],
      draw(x, t, P) {
        plate(x, 560, 1180, 230, { kind: 'bowl', col: '#f4efe6', food: (q) => { for (let i = 0; i < 6; i++) R(q, '#f2d58a', -80 + i * 28, -14 - (i % 2) * 8, 16, 18); R(q, '#7fd38a', 30, -26, 22, 10) } })
        // a heart thought over Virgo on the slow nod
        if (P.u > 5) hearts(x, t, P.t0 + 5.2, REV.x + 150, 720, { n: 3, cell: 5, rise: 120 })
        // a tiny pixel puppy pops in a thought bubble over Sag
        const k = pop01(t, P.t0 + 1.9, 0.3, 2.4) * outK(t, [P.t0 + 4.3, P.t0 + 4.5])
        if (k > 0.01) {
          x.save(); x.translate(DATE.x + 40, 560); x.scale(k, k)
          box(x, -70, -50, 140, 100, BONE, { b: 5 }); R(x, '#c98e5e', -34, -16, 60, 34); R(x, '#c98e5e', 18, -34, 30, 30); R(x, INK, 30, -24, 6, 6); R(x, '#8a5a3a', 10, -36, 10, 16); R(x, '#c98e5e', -40, -28, 10, 14)
          x.restore()
        }
      },
      card: '8/10', pis: { at: 0.5, tears: 2 },
      cues: [['pop', 1.92, 1318.51, 0.03, 0.3], ['pluck', 3.0, 1567.98, 0.04, 0.5, 0], ['tom', 5.4, 72, { gain: 0.12, decay: 0.22 }], ['tom', 6.25, 70, { gain: 0.12, decay: 0.22 }]] },
    { title: 'DESSERT',
      shots: [[0, 'two'], [2.2, 'date'], [3.6, 'rev'], [5.4, 'tight'], [8.0, 'wide']],
      cc: [[0.3, '[ eyes on the *last dumpling* ]'], [2.3, '[ it’s being *offered* ]'], [3.7, '[ deeply moved ]'], [5.5, '[ a single tear ]'], [8.1, '[ eats it. *gracefully.* ]']],
      face: [[0, 'squint'], [2.2, 'wide'], [3.6, 'touched'], [5.4, 'tear'], [8.0, 'grin']],
      date: (u, t, t0) => ({ mood: u > 8 ? 'heart' : 'happy', look: [-1, u < 2 ? 1 : 0], hops: [t0 + 2.0, t0 + 2.6, t0 + 8.2], extra: tag }),
      bubbles: [[2.4, 4.8, 'you have it. you were eyeing it.']],
      draw(x, t, P) {
        // the last dumpling slides from Sag's side to Virgo's
        const sp = ease.inOutCubic(prog(t, P.t0 + 2.0, P.t0 + 2.8))
        const gone = t > P.t0 + 8.4
        plate(x, lerp(720, 470, sp), 1180, 170, { food: gone ? null : (q) => dumpling(q, 0, -18, 1.0) })
        if (sp > 0 && sp < 1) for (let i = 0; i < 3; i++) R(x, BONE, lerp(720, 470, sp) + 90 + i * 22, 1160 + i * 10, 40, 4)
        if (gone) sparkles(x, t, 470, 1150, P.t0 + 8.4, 10, 90, 2)
      },
      card: '10/10', pis: { at: 0.4, tears: 3 },
      cues: [['whoosh', 2.0, 0.6, 0.03], ['tick', 2.8, 0.05], ['bell', 5.5, 2637.02, 0.026, 1.8, -0.2], ['glitter', 5.6, 6.2], ['pop', 8.4, 1567.98, 0.035, 0], ['glitter', 8.4, 8.8]] },
  ],
  verdict: { rows: [['First impression', 2], ['Listening', 5], ['Chopsticks', 1], ['The last dumpling', '*priceless*']], total: '9/10' },
  verdictDate: (t) => ({ mood: t > 55.3 ? 'heart' : 'happy', look: [-1, 0], hops: [55.3, 55.8, 56.7], extra: tag }),
  last: 'Judged the door. | *Loved* the dessert.',
  hookCues: [['whoosh', 0.0, 0.35, 0.04], ['pop', 1.85, 659.25, 0.04, -0.2], ['tick', 1.86, 0.06]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [scrawl, shadow, RED]
