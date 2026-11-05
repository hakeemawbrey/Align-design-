// kxsre05: SILENT REVIEW: EXTENDED, "Pisces tries not to cry for a whole date" (60 s vertical, star_talk post, dreamy · E).
// The format lives in ../../kxsre01/srkit.js. Ends on a LOOP: the tear counter resets and hookkit's loopBack eases the
// last 0.4 s into frame 0. Pisces is the reviewer here, so there is no background Pisces: the reviewer does the crying.
// ♓ Pisces reviews a date with ♒ Aquarius and has one rule: zero tears. The TEARS counter disagrees.
//   0.0–3.0    HOOK: Pisces mid-cry, one tear already escaping, TEARS: 0 → 1 glitching, caught circle on the tear.
//              "Pisces. Silent review. | *Zero tears allowed.*" record scratch: "can Pisces make it to *the verdict?*"
//   3.0–14.0   1 · THE DOOR: Aquarius holds the door. [ stoic ] [ *very* stoic ] → ★★★★
//   14.0–25.0  2 · THE MENU: Aquarius remembered the lemon cake. [ lip wobble ] → ★★★★★
//   25.0–36.0  3 · THE NAPKIN: Aquarius draws Pisces' constellation on a napkin (two fish, tied by a cord). → ★★★★★
//   36.0–48.5  4 · THE GOODBYE: under the skylight's real stars, "this was the best night". The counter spins to 99. → 11/10
//   48.5–60.0  THE VERDICT: The date ★★★★★ · Napkin art ★★★★★ · The lemon cake ★★★★★ · Composure *gone* · 11/10.
//              "Tear counter: *broken.* | Heart: full."  The counter resets to 0 and the film loops.
import { makeSR, R, box, plate, label, glow, sparkles, hearts, scrawl, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, PINK, RED, CREAM, SKYB, DATE, REV, INTER, MONO, defaultVenue } from '../../kxsre01/srkit.js'

const TEARS = [8.0, 17.0, 19.0, 27.0, 28.5, 30.0, 31.5]
function nTears(t) {
  if (t < 3.0) return Math.floor(t * 5) % 2 ? 1 : 0          // the hook: glitching 0 → 1
  if (t >= 59.4) return 0                                     // reset for the loop
  if (t >= 41.4) return Math.min(99, 7 + Math.floor(Math.pow(clamp((t - 41.4) / 1.6), 2) * 92))
  return TEARS.filter(c => t >= c).length
}

function venue(x, t, P) {
  defaultVenue(x, t, { wall: '#2e2a5a', trim: '#221f46', win: '#0f1a3a' })
  // a skylight band with real-looking stars (dim, twinkling)
  box(x, 260, 320, 560, 170, '#0b1230', { b: 8 })
  for (let i = 0; i < 16; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 2 + i * 1.7); x.save(); x.globalAlpha = 0.5 + 0.5 * tw; R(x, i % 4 ? BONE : GOLD, 280 + (i * 71) % 520, 340 + (i * 37) % 130, 6, 6); x.restore() }
  if (P.ph === 'course' && P.i === 3) glow(x, 540, 400, 380, '180,200,255', 0.18)
}

/** the napkin with Pisces' constellation: two fish joined by a cord (dot-to-dot, drawn in progressively) */
function napkin(x, t, a, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(s, s)
  box(x, -120, -90, 240, 180, CREAM, { b: 5 }); R(x, '#e7dcc6', -120, -90, 240, 10)
  const pts = [[-90, -40], [-70, -60], [-50, -40], [-70, -20], [-90, -40], [-40, 0], [0, 40], [40, 10], [70, -30], [90, -50], [70, -70], [55, -45]]
  const k = clamp((t - a) / 2.2), n = Math.floor(k * (pts.length - 1))
  x.strokeStyle = '#3a3a8a'; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= n; i++) i ? x.lineTo(...pts[i]) : x.moveTo(...pts[i])
  x.stroke()
  for (let i = 0; i <= n; i++) { R(x, '#3a3a8a', pts[i][0] - 5, pts[i][1] - 5, 10, 10) }
  x.restore()
}

const EP = makeSR({
  id: 'kxsre05', reviewer: 'pisces', date: 'aquarius', accent: SKYB, noPis: true, loop: true,
  hookLine: 'Pisces. Silent review. | *Zero tears allowed.*',
  promise: 'can Pisces make it to *the verdict?*', recSub: 'day one of no crying',
  plate: 'PISCES · CRITIC', cloth: '#eef0fb', check: '#c9d0ee',
  venue,
  hook: { circle: { x: 320, y: 880, r: 100 } },
  hookFace: (t) => ({ mood: 'sparkle', look: [0, 0], brows: { l: 0.4, r: 0.4, sl: 1, sr: 1 }, mouth: 'wobble', shake: 2, tear: -1.2 }),
  hookDate: () => ({ mood: 'happy', look: [-1, 0] }),
  courses: [
    { title: 'THE DOOR',
      shots: [[0, 'wide'], [2.2, 'date'], [3.8, 'rev'], [6.4, 'tight']],
      cc: [[0.3, '[ composed ]'], [2.3, '[ they held the door ]'], [3.9, '[ stoic ]'], [5.0, '[ *very* stoic ]'], [7.0, '[ one escapes ]']],
      face: [[0, 'poker'], [2.2, 'wide'], [3.8, 'clench'], [6.4, 'tear']],
      date: (u, t, t0) => ({ mood: 'happy', look: [-1, 0], hops: [t0 + 2.3, t0 + 2.8] }),
      bubbles: [[2.3, 3.8, 'after you!']],
      card: 4, pis: { tears: 0 },
      cues: [['pop', 2.3, 880, 0.035, 0.3], ['pluck', 5.0, 1567.98, 0.03, 0.4, 0]] },
    { title: 'THE MENU',
      shots: [[0, 'wide'], [1.8, 'date'], [4.0, 'rev'], [6.2, 'tight'], [8.0, 'wide']],
      cc: [[0.3, '[ reading the menu. *calmly.* ]'], [2.0, '[ they remembered ]'], [4.1, '[ lip wobble ]'], [6.3, '[ two more ]'], [8.1, '[ dabs. *discreetly.* ]']],
      face: [[0, 'poker'], [2.0, 'wide'], [4.0, 'touched'], [6.2, 'sob'], [8.0, 'clench']],
      date: (u, t, t0) => ({ mood: 'sparkle', look: [-1, 0], hops: [t0 + 1.9, t0 + 2.4] }),
      bubbles: [[1.9, 4.0, 'i ordered you the lemon cake. you mentioned it once.']],
      draw(x, t, P) { if (P.u > 1.2) plate(x, 480, 1190, 200, { food: (q) => { box(q, -50, -56, 100, 50, '#fbe27a', { b: 5 }); R(q, '#ffffff', -50, -56, 100, 12) } }) },
      card: 5, pis: { tears: 1 },
      cues: [['pop', 1.2, 1174.66, 0.035, 0], ['pop', 1.9, 880, 0.035, 0.3], ['pluck', 4.1, 1318.51, 0.03, 0.4, 0]] },
    { title: 'THE NAPKIN',
      shots: [[0, 'wide'], [1.4, 'date'], [3.8, 'two'], [6.6, 'tight']],
      cc: [[0.3, '[ holding it together ]'], [1.5, '[ they’re drawing something ]'], [3.9, '[ it’s our *constellation* ]'], [6.7, '[ *not* holding it together ]']],
      face: [[0, 'clench'], [1.5, 'poker'], [3.8, 'wide'], [5.0, 'touched'], [6.6, 'sob']],
      date: (u, t, t0) => ({ mood: 'happy', look: u < 3.8 ? [0, 1] : [-1, 0], hops: [t0 + 3.9, t0 + 4.4] }),
      bubbles: [[4.0, 6.2, 'two fish, tied together. that’s you.']],
      draw(x, t, P) { plate(x, 430, 1190, 170, {}); napkin(x, t, P.t0 + 1.5, 680, 1150, lerp(0.9, 1.25, ease.inOutCubic(prog(P.u, 3.6, 4.2)))) },
      card: 5, pis: { tears: 2 },
      cues: [['tick', 1.6, 0.04], ['tick', 2.0, 0.04], ['tick', 2.4, 0.04], ['tick', 2.8, 0.04], ['tick', 3.2, 0.04], ['pop', 4.0, 880, 0.035, 0.3], ['glitter', 3.8, 4.3]] },
    { title: 'THE GOODBYE',
      shots: [[0, 'wide'], [2.4, 'date'], [4.2, 'rev'], [5.4, 'tight'], [9.0, 'wide']],
      cc: [[0.3, '[ almost made it ]'], [2.5, '[ oh no ]'], [4.3, '[ *all* the tears ]'], [7.0, '[ counter: *broken* ]'], [9.1, '[ happy. *so* happy. ]']],
      face: [[0, 'clench'], [2.4, 'wide'], [4.2, 'sob'], [9.0, 'grin']],
      date: (u, t, t0) => ({ mood: u > 5 ? 'heart' : 'sparkle', look: [-1, 0], hops: [t0 + 2.5, t0 + 9.2] }),
      bubbles: [[2.5, 4.4, 'this was the best night. same time next week?']],
      draw(x, t, P) { napkin(x, t, -9, 680, 1150, 0.9); hearts(x, t, P.t0 + 9.1, 600, 760, { n: 6, rise: 220 }) },
      card: '11/10', pis: { tears: 3 },
      cues: [['pop', 2.5, 880, 0.035, 0.3], ['riser', 5.4, 1.6, 0.03], ['glitter', 7.0, 7.6], ['pop', 9.1, 1318.51, 0.035, 0]] },
  ],
  verdictFace: (t, f) => ({ ...f, tears: 3, mood: 'sparkle', mouth: t > 56.6 ? 'grin' : 'wobble' }),
  over(tx, t, P) {
    // the TEARS counter, top right: flashes on every new tear, glitches in the hook, spins to 99, resets for the loop
    if (P.ph === 'verdict' && t > 49.2 && t < 59.4) return
    const n = nTears(t), last = Math.max(-9, ...TEARS.filter(c => t >= c))
    const fl = t < 3 ? 1 : t > 41.4 && t < 43 ? 1 : clamp(1 - (t - last) / 0.6)
    tx.save(); tx.translate(1010, t < 3 || t >= 59.4 ? 500 : 225); tx.scale(1 + 0.2 * fl, 1 + 0.2 * fl)
    if (t < 3) tx.translate(Math.floor(t * 20) % 2 ? 6 : -6, 0)
    tx.font = `800 44px ${INTER}`; tx.textAlign = 'right'; tx.textBaseline = 'middle'
    const s = `TEARS: ${n}`, w = tx.measureText(s).width + 40
    box(tx, -w, -36, w, 72, fl > 0.3 ? RED : 'rgba(16,9,38,0.92)', { b: 5 })
    tx.fillStyle = BONE; tx.fillText(s, -20, 2)
    tx.restore()
  },
  verdict: { rows: [['The date', 5], ['Napkin art', 5], ['The lemon cake', 5], ['Composure', '*gone*']], total: '11/10' },
  verdictDate: (t) => ({ mood: t > 55.3 ? 'heart' : 'happy', look: [-1, 0], hops: [55.3, 55.8, 56.7] }),
  last: 'Tear counter: *broken.* | Heart: full.',
  hookCues: [['pluck', 0.1, 1567.98, 0.03, 0.4, 0], ['tick', 0.2, 0.04], ['tick', 0.4, 0.04]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, sparkles, scrawl, glow, MONO, GOLD, PINK, DATE, REV, pop01, outK]
