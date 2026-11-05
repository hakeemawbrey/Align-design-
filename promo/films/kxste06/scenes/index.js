// kxste06 · Single and Thriving: Extended, ep 6 · "Saturday In, on Purpose" (75 s vertical, star_advice post, lofi · G)
// No end card, no card transition. LOOP: the last 0.45 s eases back into the frame-0 couch fall. Engine: kxmue01/m47kit.js.
//   0.00   frame 0: ♍ Virgo mid-fall backwards onto the couch in pyjamas, the phone mid-flight, party stories spraying out
//          of it like confetti. Slam "Saturday night. *Everyone's* out. | Except me."  0.75 record scratch.
//   2.3    promise "wait for *11 PM*"   (♓ Pisces is the neighbour across the street, crying at its own night in)
//   3.0    1 · STAYING IN      "I *chose* this." — the notifications keep coming
//  14.5    2 · THE MOMENT      FOMO: loading "missing out?…", the coat half on
//  26.0    3 · THE STARS       "a night in is a *plan.* not a backup." / "…*enjoy* it on purpose."
//  35.0    4 · THE MOVE        phone in the drawer, face mask, soup, the puzzle, a book: an achievement each
//  57.0    5 · 11 PM           "wish I'd stayed in tbh" · the last puzzle piece
//  68.0    "Virgo: *thriving.*"   72.8 last line "Stayed in. | *Missed* nothing." → loop back into frame 0 (74.55–75)
import {
  makeM47, say, stars, star, box, R, label, hearts, sparkles, confetti, bubble, phoneSmall, couch, mug, glow, pisces,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, ORANGE, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxmue01/scenes/m47kit.js'

const VIR = 'virgo', LEO = 'leo'
const STORIES = ['this is SO fun!!', 'best night EVER', 'where r u??', 'dance floor!!', 'party pics (12)']

// the neighbour's window across the street (seen through Virgo's window): ♓ Pisces crying at its own TV
function neighbour(x, t, { tears = 2, mood = 'sparkle' } = {}) {
  box(x, 690, 420, 200, 170, '#3a2a58', { b: 6 }); R(x, '#ffd89a', 700, 430, 180, 150)
  glow(x, 790, 505, 140, 0.4)
  R(x, INK, 820, 540, 50, 34); R(x, '#7fe0ff', 824, 544, 42, 26)
  pisces(x, t, { x: 760, y: 520, s: 80, tears, mood, look: [1, 0.3], tissue: false })
}
function drawerBox(x, cx, cy, open = 0) { box(x, cx - 90, cy, 180, 120, '#7a5a48', { b: 6 }); box(x, cx - 72 + open * 50, cy + 24, 144, 46, '#8e6a54', { b: 5 }); R(x, INK, cx - 16 + open * 50, cy + 42, 32, 8) }
function puzzle(x, t, cx, cy, done) {
  box(x, cx - 170, cy - 20, 340, 40, '#8a5a3a', { b: 6 })
  const n = 24, k = Math.floor(done * n)
  for (let i = 0; i < n; i++) { const col = i % 8, row = Math.floor(i / 8); const on = i < k; R(x, on ? ['#5fa8ff', '#9fe6b0', '#f2c75c', '#c0577a'][(col + row) % 4] : 'rgba(255,255,255,0.12)', cx - 150 + col * 38, cy - 110 + row * 30, 34, 26) }
  R(x, INK, cx - 154, cy - 114, 308, 4); R(x, INK, cx - 154, cy - 22, 308, 4)
}
function mask(x, t, F) {
  // cucumber slices over the eyes
  for (const dx of [-38, 38]) { x.fillStyle = INK; x.beginPath(); x.arc(F.x + dx, F.y - 10, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9fe6b0'; x.beginPath(); x.arc(F.x + dx, F.y - 10, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d6f5d6'; x.beginPath(); x.arc(F.x + dx, F.y - 10, 12, 0, Math.PI * 2); x.fill() }
}
function book(x, cx, cy, k = 1) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -70, -50, 140, 100, '#c0577a', { b: 6 }); R(x, INK, -3, -50, 6, 100); R(x, BONE, -60, -40, 54, 80); R(x, BONE, 6, -40, 54, 80); x.restore() }

const VPOS = { x: 540, y: 990, s: 260 }
const P0 = prog(0, -0.6, 2.6), ROT0 = -0.35 * (1 - ease.outCubic(P0)), LIFT0 = 60 * (1 - P0)   // the frame-0 pose
function room0(x, t, z = 1) {
  neighbour(x, t)
}

const F = makeM47({
  id: 'kxste06', series: 'single', dur: 75, ending: 'loop', loopLen: 0.45,
  hook: { text: 'Saturday night. *Everyone’s* out. | Except me.', out: 2.9, top: 200, size: 100 },
  promise: { at: 2.3, out: [6.0, 6.3], text: 'wait for *11 PM*', top: 1290 },
  chapters: [{ at: 3.0, title: 'staying in' }, { at: 14.5, title: 'the moment' }, { at: 26.0, title: 'the stars' }, { at: 35.0, title: 'the move' }, { at: 57.0, title: '11 PM' }],
  fx: [
    { k: 'whip', at: -0.1, len: 0.5, from: 1.55, cx: 760, cy: 760 },
    { k: 'scratch', at: 0.75, len: 1.35, caption: 'their night: *loud.* | my night: *mine.*', top: 1500 },
    { k: 'notif', at: 6.2, out: [9.0, 9.3], title: 'the group', body: 'party pics *(12)*', glyph: '♌', y: 330 },
    { k: 'notif', at: 9.8, out: [12.8, 13.1], title: 'leo', body: 'are you SURE you’re *not coming?*', glyph: '♌', y: 330 },
    { k: 'loading', at: 15.0, len: 3.2, label: 'missing out?…', error: 'Error: maybe?', y: 520 },
    { k: 'ach', at: 37.6, out: [40.4, 40.7], title: 'ACHIEVEMENT UNLOCKED', text: 'phone: *in the drawer*', icon: '★', y: 660 },
    { k: 'ach', at: 41.4, out: [44.2, 44.5], title: 'ACHIEVEMENT UNLOCKED', text: 'face mask: *on*', icon: '★', y: 660 },
    { k: 'ach', at: 45.2, out: [48.0, 48.3], title: 'ACHIEVEMENT UNLOCKED', text: 'soup: *perfect*', icon: '★', y: 660 },
    { k: 'ach', at: 49.0, out: [51.8, 52.1], title: 'ACHIEVEMENT UNLOCKED', text: '1000 pieces: *started*', icon: '★', y: 660 },
    { k: 'ach', at: 52.8, out: [55.6, 55.9], title: 'ACHIEVEMENT UNLOCKED', text: 'chapter 7: *finished*', icon: '★', y: 660 },
    { k: 'notif', at: 58.0, out: [61.6, 61.9], title: 'leo', body: 'wish I’d stayed in *tbh*', glyph: '♌', y: 330 },
  ],
  lines: [
    say(3.4, VIR, "I *chose* this. I'm staying in."),
    say(7.4, VIR, '…good for them. *genuinely.*'),
    say(11.2, VIR, "I'm sure. *mostly.*"),
    say(22.0, VIR, 'what if the *best* night is happening without me?'),
    stars(26.6, 'a night in is a *plan.* not a backup.'),
    stars(30.4, "if it's what you want, *enjoy* it on purpose."),
    say(38.8, VIR, 'the drawer can have it till *Sunday.*'),
    say(46.4, VIR, 'best soup ever. made it. *for me.*'),
    say(60.0, VIR, '…honestly? same night. *better* pyjamas.'),
  ],
  boxes: [{ from: 0, to: 3, close: 14.3 }, { from: 3, to: 4, close: 25.8 }, { from: 4, to: 6, close: 34.8 }, { from: 6, to: 7, close: 42.6 }, { from: 7, to: 8, close: 50.4 }, { from: 8, to: 9, close: 65.0 }],
  meter: [[3.6, 0.5], [15.0, 0.3], [22.0, 0.15], [31.0, 0.4], [37.6, 0.55], [45.2, 0.7], [52.8, 0.85], [63.6, 1.0]],
  thrive: { at: 68.0, text: 'Virgo: | *thriving.*' },
  last: { at: 72.8, text: 'Stayed in. | *Missed* nothing.', top: 300 },
  beats: [18.6, 35.6, 56.0, 63.6],
  shots: [
    // A · the fall (0–3) — frame 0 and the loop target
    { at: 0, set: 'room', setOpts: { couchX: 540, couchW: 700, lamp: true, lampX: 120 }, cam: [1.1, 540, 900], push: 0.03,
      draw(x, t) {
        room0(x, t)
        const p = prog(t, -0.6, 2.6)
        x.save(); x.translate(VPOS.x, VPOS.y); x.rotate(-0.35 * (1 - ease.outCubic(p))); x.translate(-VPOS.x, -VPOS.y)
        star(x, t, VIR, { ...VPOS, y: VPOS.y - 60 * (1 - p), mood: 'wide', look: [1, -1], hops: [-0.1], scarf: '#7fd0c0' })
        x.restore()
        phoneSmall(x, t, lerp(700, 800, p), 760 - 160 * Math.sin(Math.PI * p), { rot: 3 * p, s: 0.8 })
      },
      pis: null },
    // B · staying in (3–14.5)
    { at: 3.0, set: 'room', setOpts: { couchX: 540, couchW: 700, lamp: true, lampX: 120 }, cam: [1.08, 540, 920], push: 0.05,
      draw(x, t, S) {
        room0(x, t)
        star(x, t, VIR, { ...VPOS, mood: t < 7 ? 'happy' : t < 11 ? 'neutral' : 'squint', look: t > 6.2 && t < 13 ? [1, 0.5] : [0, 0], hops: S.hopsFor(VIR), scarf: '#7fd0c0' })
        phoneSmall(x, t, 700, 1060, { rot: 0.3, s: 0.6, buzz: inR(t, 6.2, 7.0) || inR(t, 9.8, 10.6) ? 1 : 0 })
      } },
    // C · the moment (14.5–26): the coat
    { at: 14.5, set: 'room', setOpts: { couchX: 540, couchW: 700, lamp: true, lampX: 120 }, cam: [1.14, 540, 940], push: 0.05,
      draw(x, t, S) {
        room0(x, t)
        const up = ease.inOutCubic(prog(t, 18.6, 19.6)), down = ease.inOutCubic(prog(t, 24.0, 25.2))
        star(x, t, VIR, { x: lerp(540, 760, up * (1 - down)), y: lerp(990, 960, up * (1 - down)), s: 250, mood: t < 21.8 ? 'squint' : 'wide', look: [1, 0], hops: [...S.hopsFor(VIR), 18.7], scarf: '#7fd0c0' })
        if (up > 0.5 && down < 0.5) { x.save(); x.translate(lerp(540, 760, up), 1080); x.rotate(-0.3); box(x, -20, -30, 180, 80, '#6a4fa8', { b: 6 }); x.restore() }
      } },
    // D · THE STARS (26–35)
    { at: 26.0, set: 'sky', push: 0.05,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 980, s: 380, mood: t > 30 ? 'happy' : 'neutral', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, VIR, { x: 190, y: 1210, s: 150, mood: t > 31 ? 'sparkle' : 'neutral', look: [1, -1], hops: [31.2], scarf: '#7fd0c0' })
        const k = pop01(t, 31.0, 0.3, 2) * outK(t, [34.4, 34.8])
        if (k > 0.01) { label(x, 'PLAN A:', 860, 1110, { size: 30, col: GOLD, font: INTER, weight: 800, alpha: k }); label(x, 'pyjamas', 860, 1160, { size: 34, col: BONE, alpha: k }) }
      },
      pis: { x: 900, y: 1330, s: 90, tears: 1, mood: 'sparkle', look: [-1, -1], tissue: false } },
    // E · the move (35–57): the cosy montage
    { at: 35.0, set: 'room', setOpts: { couchX: 540, couchW: 700, lamp: true, lampX: 120 }, cam: [1.08, 540, 920], push: 0.05,
      draw(x, t, S) {
        room0(x, t)
        drawerBox(x, 900, 1060, 1 - ease.inOutCubic(prog(t, 36.6, 37.4)))
        const p = prog(t, 35.6, 36.6)
        if (p < 1) phoneSmall(x, t, lerp(700, 900, p), lerp(1040, 1070, p) - 80 * Math.sin(Math.PI * p), { rot: p * 3, s: 0.55 })
        star(x, t, VIR, { ...VPOS, mood: t < 41.4 ? 'happy' : 'sleepy', zzz: false, look: [0, 0], hops: [...S.hopsFor(VIR), 41.5, 45.3, 49.1, 52.9], scarf: '#7fd0c0' })
        if (t > 41.4 && t < 49.0) mask(x, t, { x: VPOS.x, y: VPOS.y - 10 })
        if (t > 45.2) mug(x, t, 380, 1080, 1.1, '#e86a5a', true)
        if (t > 49.0) puzzle(x, t, 540, 1190, 0.2 + 0.3 * prog(t, 49, 57))
        book(x, 700, 1060, pop01(t, 52.8, 0.3, 2.2))
        if (inR(t, 54.6, 57.0)) label(x, '♪ hmm hmm ♪', 540, 760 + 8 * Math.sin(t * 4), { size: 34, col: MINT })
      } },
    // F · 11 PM (57–75): back to the frame-0 couch for the loop
    { at: 57.0, set: 'room', setOpts: { couchX: 540, couchW: 700, lamp: true, lampX: 120 }, cam: [1.1, 540, 900], push: 0.0,
      draw(x, t, S) {
        room0(x, t)
        label(x, '11:00 PM', 300, 470, { size: 40, col: GOLD, font: MONO, alpha: outK(t, [66.0, 66.6]) })
        const z = ease.inOutCubic(prog(t, 72.4, 74.55))
        if (t < 72.4) puzzle(x, t, 540, 1190, t < 63.6 ? 0.96 : 1)
        sparkles(x, t, 540, 1120, 63.6, 12, 160, 1, [GOLD, MINT, BONE])
        sparkles(x, t, 540, 960, 68.3, 12, 260, 1, [ORANGE, GOLD, BONE])
        x.save(); x.translate(VPOS.x, VPOS.y); x.rotate(ROT0 * z); x.translate(-VPOS.x, -VPOS.y)
        star(x, t, VIR, { ...VPOS, y: VPOS.y - LIFT0 * z, mood: z > 0.5 ? 'wide' : 'happy', look: z > 0.5 ? [1, -1] : [0, 0], hops: [...S.hopsFor(VIR), 63.7, 64.0, 68.3, 68.6], scarf: '#7fd0c0' })
        x.restore()
      } },
  ],
  overlay(x, t) {
    // frame 0: the party stories spraying out of the phone
    if (t < 2.9) STORIES.forEach((s2, i) => {
      const p = clamp(prog(t, -1.4 + i * 0.2, 2.4))
      const a = -2.4 + i * 0.45
      bubble(x, t, 760 + Math.cos(a) * 340 * p, 760 + Math.sin(a) * 260 * p + 60 * i * p * 0.3, -1, 2.9, s2, { size: 28, col: ['#ffe0d0', '#e0ecff', '#fff1c8', '#ffd0ec', '#d6f0b0'][i] })
    })
  },
  cues: [
    ['whoosh', 0.0, 0.5, 0.04], ['pop', 0.2, 880, 0.03, 0.3], ['pop', 0.35, 987.77, 0.03, -0.3], ['pop', 0.5, 1174.66, 0.03, 0.3], ['tick', 0.6, 0.04],
    ['whoosh', 18.6, 0.5, 0.03], ['whoosh', 24.0, 0.5, 0.03],
    ['whoosh', 35.6, 0.6, 0.03], ['tick', 37.4, 0.06],
    ['pluck', 54.6, 1567.98, 0.02, 0.4, 0], ['pluck', 55.2, 1318.51, 0.02, 0.4, 0], ['pluck', 55.8, 1174.66, 0.02, 0.4, 0],
    ['tick', 63.6, 0.07], ['pop', 63.6, 1174.66, 0.045, 0], ['glitter', 63.6, 64.2],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
