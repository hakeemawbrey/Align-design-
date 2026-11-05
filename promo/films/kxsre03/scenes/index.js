// kxsre03: SILENT REVIEW: EXTENDED, "Capricorn meets the texter in person" (60 s vertical, star_talk post, lofi · F).
// The format lives in ../../kxsre01/srkit.js. No end card, no card transition: hard cut on the last line.
// ♑ Capricorn reviews the first in-person date with ♌ Leo after three months of texting. Not one word from Capricorn.
//   0.0–3.0    HOOK: frame 0 mid-collision: one goes for a hug, one for a handshake, arms tangled; a ticker crawls.
//              "Three months of texting. | *Now: real life.*" record scratch: "the *ending,* though." ◀◀ REWIND
//   3.0–14.0   1 · HELLO: the hello in slow-mo. [ internal screaming ] → 5/10
//   14.0–25.0  2 · COFFEE: Leo, ALL CAPS in texts, is quiet in person. [ head tilt ] [ quietly charmed ] → 6/10
//   25.0–36.0  3 · THE PAUSE: a long silence (loading bar "awkward silence…"), then both snort at the same second. → 8/10
//   36.0–48.5  4 · THE WALK: Leo: "i was so nervous to meet you." [ a single tear ] → 10/10
//   48.5–60.0  THE VERDICT: The greeting ★ · The quiet ★★★★ · The laugh ★★★★★ · The real them *better* · 9/10.
//              "Better in person. | *Way* better."
import { makeSR, R, box, mug, label, glow, sparkles, hearts, bubble, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, DATE, REV, INTER, MONO } from '../../kxsre01/srkit.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

function venue(x, t) {
  R(x, '#3a3046', -300, 300, 1680, 800); R(x, '#2a2236', -300, 960, 1680, 110)
  // shelves of mugs and a big plant, a round window with the evening sky
  for (const sy of [430, 560]) { R(x, INK, 80, sy, 380, 14); R(x, '#8a5a3a', 84, sy + 2, 372, 8)
    for (let i = 0; i < 5; i++) { const c = ['#e8605c', GOLD, '#7fd0ff', '#9fe6b0', PINK][(i + sy) % 5]; box(x, 100 + i * 72, sy - 54, 44, 50, c, { b: 4 }) } }
  x.fillStyle = INK; x.beginPath(); x.arc(780, 520, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2b2a6a'; x.beginPath(); x.arc(780, 520, 138, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f28a5c'; x.beginPath(); x.arc(780, 600, 70, Math.PI, 0); x.fill()
  R(x, INK, 776, 382, 8, 276); R(x, INK, 642, 516, 276, 8)
  const sw = 0.04 * Math.sin(t * 1.3)
  for (const [dx, a, len] of [[-30, -0.6, 140], [30, 0.55, 150], [0, 0, 180]]) { x.save(); x.translate(990 + dx, 960); x.rotate(a + sw); R(x, INK, -16, -len - 6, 32, len + 8); R(x, '#4fae6a', -10, -len, 20, len); x.restore() }
  box(x, 940, 950, 100, 90, '#c96f4a', { b: 6 })
  glow(x, 540, 820, 520, '255,210,170', 0.12)
}

const LOAD = { at: 26.0, len: 3.2, label: 'awkward silence…', error: 'Error: someone say something', y: 820 }

/** the ticker under the hook */
function ticker(tx, t) {
  if (t > 3.0) return
  const s = 'THREE MONTHS OF TEXTING  ✦  FIRST TIME IN PERSON  ✦  NOBODY KNOWS HOW TO SAY HI  ✦  '
  tx.save(); R(tx, RED, 0, 1395, 1080, 64); tx.font = `800 34px ${INTER}`; tx.fillStyle = BONE; tx.textBaseline = 'middle'
  const w = tx.measureText(s).width, off = -((t + 0.6) * 220 % w)
  for (let k = 0; k < 3; k++) tx.fillText(s, off + k * w, 1428)
  tx.restore()
}

const EP = makeSR({
  id: 'kxsre03', reviewer: 'capricorn', date: 'leo', accent: GOLD,
  hookLine: 'Three months of texting. | *Now: real life.*',
  promise: 'the *ending,* though.', rewindSub: '5 MINUTES EARLIER',
  plate: 'CAPRICORN · CRITIC', cloth: '#efe2cf', check: '#d9c3a3',
  venue,
  hook: {
    circle: { x: 520, y: 880, r: 175 },
    draw(x, t) {
      // tangled arms: one going in for a hug, one for a handshake
      const w = Math.sin(t * 9) * 8
      x.save(); x.lineCap = 'square'
      for (const [a, b, c] of [[[470, 900], [620, 860 + w], '#9b6b4a'], [[640, 920], [480, 860 - w], '#f0603a'], [[650, 880], [520, 940 + w], '#f0603a']]) {
        x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.stroke()
        x.strokeStyle = c; x.lineWidth = 22; x.beginPath(); x.moveTo(...a); x.lineTo(...b); x.stroke()
      }
      x.restore()
      label(x, '?!', 560, 700 - 10 * Math.abs(Math.sin(t * 6)), { size: 70, col: GOLD, font: INTER, weight: 800 })
    },
  },
  hookFace: () => ({ mood: 'wide', look: [1, 0], brows: { l: 1, r: 1, sl: 0.4, sr: 0.4 }, mouth: 'o', shake: 2 }),
  hookDate: (t) => ({ x: 650, y: 880, s: 250, mood: 'wide', look: [-1, 0], rot: 0.15, mouth: 'o' }),
  courses: [
    { title: 'HELLO',
      shots: [[0, 'two'], [2.5, 'tight'], [3.6, 'date'], [5.6, 'wide']],
      cc: [[0.3, '[ replaying the hello ]'], [2.5, '[ internal screaming ]'], [5.6, '[ sits. *carefully.* ]'], [7.4, '[ pretends that didn’t happen ]']],
      face: [[0, 'wide'], [2.5, 'scream'], [3.6, 'poker'], [5.6, 'poker'], [7.4, 'fight']],
      date: (u, t, t0) => ({ x: lerp(650, DATE.x, ease.inOutCubic(prog(u, 4.8, 5.6))), mood: u < 5.6 ? 'wide' : 'happy', look: [-1, 0], hops: [t0 + 3.7, t0 + 5.6, t0 + 7.6] }),
      bubbles: [[3.7, 5.3, 'hug? handshake? both?']],
      over(tx, t, P) { if (P.u < 2.5) label(tx, 'SLOW-MO ×0.25', 980, 1420, { size: 34, col: GOLD, align: 'right', alpha: Math.floor(P.u * 3) % 2 ? 0.5 : 1 }) },
      card: '5/10', pis: { at: 6.0, tears: 1, mood: 'wide' },
      cues: [['whoosh', 0.1, 1.2, 0.03], ['pluck', 2.5, 1567.98, 0.04, 0.3, 0], ['pop', 3.7, 880, 0.035, 0.3], ['tick', 5.6, 0.05]] },
    { title: 'COFFEE',
      shots: [[0, 'wide'], [2.2, 'date'], [4.8, 'rev'], [7.4, 'two']],
      cc: [[0.3, '[ sips. *assesses.* ]'], [2.4, '[ head tilt ]'], [5.0, '[ cross-referencing the texts ]'], [7.5, '[ quietly charmed ]']],
      face: [[0, 'poker'], [2.4, 'tilt'], [5.0, 'squint'], [7.5, 'nod', { n: 2 }]],
      date: (u, t, t0) => ({ mood: 'neutral', look: [-1, 1], blush: 0.9, hops: [t0 + 2.6] }),
      bubbles: [[2.6, 4.6, '…hi. i like your scarf.', { tail: 0.3 }]],
      draw(x) { mug(x, 0, 470, 1200, 1.1, '#7fd0ff'); mug(x, 0, 700, 1200, 1.1, '#e8605c') },
      over(tx, t, P) {
        // the memory: what Leo's texts looked like
        const k = pop01(t, P.t0 + 4.9, 0.3, 2.2) * outK(t, [P.t0 + 7.2, P.t0 + 7.4])
        if (k <= 0.01) return
        tx.save(); tx.translate(560, 470); tx.rotate(0.03); tx.scale(k, k)
        box(tx, -330, -90, 660, 180, '#2b2140', { b: 6 })
        tx.font = `700 26px ${MONO}`; tx.fillStyle = GOLD; tx.textAlign = 'center'; tx.fillText('LEO, IN TEXTS:', 0, -52)
        box(tx, -260, -20, 520, 80, '#ffd36b', { b: 4 }); tx.font = `800 40px ${INTER}`; tx.fillStyle = INK; tx.textBaseline = 'middle'; tx.fillText('OMG YES!!! CAN’T WAIT!!!', 0, 20)
        tx.restore()
      },
      card: '6/10', pis: { at: 0.6, tears: 2 },
      cues: [['pop', 2.6, 659.25, 0.03, 0.3], ['pop', 4.95, 1318.51, 0.035, 0], ['pop', 5.05, 1760, 0.03, 0], ['tom', 7.9, 72, { gain: 0.12, decay: 0.22 }], ['tom', 8.75, 70, { gain: 0.12, decay: 0.22 }]] },
    { title: 'THE PAUSE',
      shots: [[0, 'wide'], [4.6, 'two'], [6.5, 'rev']],
      cc: [[0.3, '[ silence ]'], [1.2, '[ *more* silence ]'], [4.7, '[ *snort* ]'], [6.5, '[ both laughing. *same second.* ]']],
      face: [[0, 'poker'], [1.2, 'blink'], [3.0, 'side'], [4.6, 'grin'], [6.5, 'smile']],
      date: (u, t, t0) => ({ mood: u > 4.6 ? 'happy' : 'neutral', look: u > 4.6 ? [-1, 0] : [1, -1], hops: [t0 + 4.65, t0 + 5.0, t0 + 5.35, t0 + 5.7, t0 + 6.6] }),
      bubbles: [[4.7, 6.4, 'HAHAHA'], [6.8, 8.6, 'ok i’m less nervous now']],
      draw(x, t, P) {
        mug(x, t, 470, 1200, 1.1, '#7fd0ff'); mug(x, t, 700, 1200, 1.1, '#e8605c')
        // the wall clock ticking through the silence
        R(x, INK, 480, 330, 130, 130); R(x, BONE, 488, 338, 114, 114)
        const a = Math.floor(P.u * 2) * Math.PI / 15
        x.save(); x.translate(545, 395); x.rotate(a); R(x, INK, -3, -48, 6, 50); x.restore()
        if (P.u > 4.6) sparkles(x, t, 600, 820, P.t0 + 4.65, 12, 200, 1)
      },
      card: '8/10', pis: { at: 4.8, tears: 2, mood: 'happy' },
      cues: [['tick', 0.5, 0.05], ['tick', 1.0, 0.05], ['tick', 1.5, 0.05], ['tick', 2.0, 0.05], ['tick', 2.5, 0.05], ['tick', 3.0, 0.05], ['tick', 3.5, 0.05], ['tick', 4.0, 0.05], ['pop', 4.65, 739.99, 0.05, -0.3], ['pop', 4.66, 1174.66, 0.05, 0.3], ['glitter', 4.7, 5.2]] },
    { title: 'THE WALK',
      shots: [[0, 'two'], [2.0, 'date'], [3.8, 'rev'], [5.4, 'tight'], [8.8, 'wide']],
      cc: [[0.3, '[ walks them to the bus ]'], [2.3, '[ oh. ]'], [3.9, '[ was *also* nervous, actually ]'], [5.5, '[ a single tear ]'], [9.0, '[ nods. *same.* ]']],
      face: [[0, 'side'], [2.2, 'wide'], [3.8, 'touched'], [5.4, 'tear'], [8.8, 'smile']],
      date: (u, t, t0) => ({ mood: u > 6.8 ? 'heart' : 'sparkle', look: [-1, 0], blush: 0.9, hops: [t0 + 2.1, t0 + 6.9] }),
      bubbles: [[2.1, 4.6, 'i was so nervous to meet you'], [6.8, 8.8, 'you’re even better in person']],
      draw(x, t) { mug(x, t, 470, 1200, 1.1, '#7fd0ff'); hearts(x, t, 36 + 8.9, 600, 760, { n: 6, rise: 220 }) },
      card: '10/10', pis: { at: 0.4, tears: 3 },
      cues: [['pop', 2.1, 880, 0.035, 0.3], ['bell', 5.5, 2637.02, 0.026, 1.8, -0.2], ['pop', 6.8, 987.77, 0.035, 0.3], ['glitter', 8.9, 9.4]] },
  ],
  over(tx, t) { ticker(tx, t) },
  fx: [{ scene: loadingBar(LOAD), cues: loadingBarCues(LOAD) }],
  verdict: { rows: [['The greeting', 1], ['The quiet', 4], ['The laugh', 5], ['The real them', '*better*']], total: '9/10' },
  verdictDate: (t) => ({ mood: t > 55.3 ? 'heart' : 'happy', look: [-1, 0], hops: [55.3, 55.8, 56.7] }),
  last: 'Better in person. | *Way* better.',
  hookCues: [['tom', 0.1, 90, { gain: 0.2, decay: 0.2 }], ['pop', 0.3, 659.25, 0.04, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, CREAM, REV, DATE, RED, PINK, clamp]
