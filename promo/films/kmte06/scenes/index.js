// kmte06: MIRROR TALK No. 6, "Not dating until I'm perfect." (20 s vertical, star_advice post, jazzy · G). Hard cut.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Virgo mid-scrub, polishing the mirror at top speed (squeak sparkles), a checklist mid-unroll to the
//          floor. Hook "Not dating until | I'm *perfect.*"
//   2.9    "Item 1 of *40.*"  VIRGO: "just 39 more things and I'm *ready*."
//   6.2    REFLECTION: "would you make a *friend* finish this first?"  VIRGO: "…no. they're great *now*."
//   11.4   REFLECTION: "so are *you*." (whip + shake) → the list rolls up into one item: "be kind to me" ✓
//   15.8   Pisces sends Virgo a tiny gold star, sobbing.  18.2 last line "You're *dateable* | right now."  Hard cut at 20.
import { makeMirror, drawPixelStar, hearts, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, drawBits, INK, GOLD, r3, INTER } from '../../kmte01/mirrorkit.js'

const T = { scrub: 0.55, unroll: [-0.6, 2.6], s1: 3.3, m1: 6.2, s2: 9.2, m2: 11.4, roll: [12.9, 13.5], one: 13.6, check: 14.4, gift: 15.8, last: 18.2 }
const ITEMS = ['fix posture', 'learn French', 'be calm. always.', '6 a.m. runs', 'never overthink', 'read 50 books', 'cook like a chef', 'fold fitted sheets', 'perfect handwriting', 'zero awkward pauses', 'reply in 3 min', 'own a houseplant (alive)', 'learn to whistle', 'remember every birthday', 'clear skin forever', 'know wine words', 'fix my laugh', 'be less "a lot"']

function scroll(x, t) {
  const u = clamp(prog(t, ...T.unroll)), up = 1 - ease.inCubic(prog(t, ...T.roll))
  const Lh = (180 + 1180 * ease.outCubic(u)) * up
  if (t > T.roll[1] || Lh < 4) return
  const cx = 815, top = 520, w = 300
  R(x, 'rgba(6,4,18,0.45)', cx - w / 2 + 12, top + 14, w, Lh)
  box(x, cx - w / 2, top, w, Lh, '#fff4dc', { b: 5 })
  x.save(); x.beginPath(); x.rect(cx - w / 2, top, w, Lh); x.clip()
  const off = (t * 26) % 56
  x.font = `600 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  for (let i = 0; i < 26; i++) {
    const y = top + 50 + i * 56 - (t > 3 ? off : 0)
    R(x, 'rgba(120,150,220,0.35)', cx - w / 2 + 16, y + 22, w - 32, 2)
    R(x, INK, cx - w / 2 + 18, y - 12, 24, 24); R(x, '#fff4dc', cx - w / 2 + 22, y - 8, 16, 16)
    x.fillStyle = '#3a2a5a'; x.fillText(`${i + 1}. ${ITEMS[i % ITEMS.length]}`, cx - w / 2 + 54, y, w - 70)
  }
  x.restore()
  // the roll at the bottom
  box(x, cx - w / 2 - 14, top + Lh - 18, w + 28, 36, '#f1e2bf', { b: 5, hi: '#fff8e8' })
}

const F = makeMirror({
  id: 'kmte06', sign: 'virgo', dur: 20,
  hook: { text: 'Not dating until | I’m *perfect.*', accentColor: '#9fe6b0', out: [2.65, 2.9] },
  fx: [
    { k: 'screenShake', at: T.scrub, amp: 12, len: 0.35 },
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.3 },
    { k: 'whipZoom', at: T.m2 - 0.08, from: 1.4 },
    { k: 'screenShake', at: T.m2 + 0.5, amp: 16, len: 0.45 },
    { k: 'whipZoom', at: T.gift - 0.06, from: 1.2 },
  ],
  caps: [
    { at: 2.95, out: [11.1, 11.3], text: 'Item 1 of *40.*', accent: '#9fe6b0', size: 104, accentSize: 140 },
    { at: 11.35, out: [17.9, 18.1], text: 'So are *you.*', accent: '#8fe9ff', size: 110, accentSize: 150, late: 1, lateAt: T.m2 + 0.35 },
    { at: T.last, out: [99, 100], text: 'You’re *dateable* | right now.', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: "just 39 more things and I'm *ready*." },
    { t: T.m1, who: 'M', text: 'would you make a *friend* finish this first?' },
    { t: T.s2, who: 'S', text: "…no. they're great *now*." },
    { t: T.m2, who: 'M', text: 'so are *you*.' },
  ],
  boxes: [[3.1, 13.6]],
  cam(t) { const w = 1 - ease.outCubic(prog(t, 0, 0.55)); return { zoom: 1 + 0.22 * w, dx: -20 * w, dy: 30 * w } },
  pose(t) {
    const b = ease.outCubic(prog(t, T.scrub, T.scrub + 0.5))
    const p = { x: lerp(470, 300, b), y: lerp(1040, 1225, b), s: lerp(310, 280, b), mood: 'squint', look: [0.4, -0.6], blink: false, squash: t < T.scrub ? 0.06 * Math.sin(t * 50) : 0, rot: t < T.scrub ? 0.06 * Math.sin(t * 25) : 0 }
    if (t > T.scrub) { p.mood = 'neutral'; p.look = [1, -0.5]; p.blink = undefined }
    if (t > T.s1) { p.mood = 'sparkle'; p.look = [1, -0.6] }
    if (t > T.m1) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.s2) { p.mood = 'neutral'; p.look = [0.4, -0.2] }
    if (t > T.m2 + 0.3) { p.mood = 'wide'; p.look = [1, -1]; p.blink = false }
    if (t > T.check) { p.mood = 'happy'; p.look = undefined; p.blink = undefined }
    if (t > T.gift + 0.8) p.mood = 'heart'
    p.draw = (x, tt, Fr) => {
      if (tt < T.scrub + 0.2) {
        // the polishing cloth, in fast circles on the glass
        const a = tt * 22, k = 1 - prog(tt, T.scrub, T.scrub + 0.2)
        x.save(); x.globalAlpha = k; x.translate(Fr.ox + 120 + Math.cos(a) * 30, Fr.cy - 90 + Math.sin(a) * 24); x.rotate(0.3)
        R(x, INK, -40, -30, 80, 60); R(x, '#ffd0e0', -34, -24, 68, 48); R(x, '#ff9fc0', -34, 4, 68, 8); x.restore()
      }
    }
    return p
  },
  refl(t) {
    if (t < T.scrub) return { x: 560, y: 900, s: 300, mood: 'squint', look: [-0.4, 0.6], squash: 0.06 * Math.sin(t * 50 + 1) }
    const b = ease.outCubic(prog(t, T.scrub, T.scrub + 0.5))
    const p = { x: lerp(560, 470, b), y: lerp(900, 870, b), s: lerp(300, 240, b), mood: 'neutral', look: [-1, 0.6] }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.m2) p.mood = 'sparkle'
    if (t > T.check) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { x: 575, tears: 1, mood: 'wide' }
    if (t > T.m2) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.gift) { p.tears = 3; p.mood = 'happy' }
    p.draw = undefined
    return p
  },
  pisHops: [T.gift, T.gift + 0.4],
  tissuePulls: [T.m2 + 0.6, T.m2 + 1.0, T.gift + 0.3],
  glass(x, t) {
    // squeaky-clean sparkle streaks on the glass while Virgo scrubs
    if (t < 1.2) for (let i = 0; i < 6; i++) {
      const ph = ((t * 2.2 + i / 6) % 1)
      drawPixelStar(x, 330 + (i * 97) % 420, 600 + (i * 131) % 500, 30 * Math.sin(Math.PI * ph), 2, '#ffffff')
    }
  },
  front(x, t) {
    scroll(x, t)
    // the one item left
    if (t > T.one) {
      const k = easeOutBack(prog(t, T.one, T.one + 0.35), 2) * outK(t, [T.last - 0.15, T.last + 0.15])
      if (k > 0.01) {
        x.save(); x.translate(760, 760); x.rotate(-0.04); x.scale(k, k)
        R(x, 'rgba(6,4,18,0.45)', -200, -66, 420, 150); box(x, -210, -80, 420, 150, '#fff4dc', { b: 6 })
        x.font = `700 22px 'Space Mono', monospace`; x.fillStyle = '#8a7aa8'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('THE LIST · 1 ITEM', -180, -48)
        R(x, INK, -180, -6, 44, 44); R(x, '#fff4dc', -173, 1, 30, 30)
        if (t > T.check) drawBits(x, ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...'], { G: '#2fbf71' }, -158, 14, 9 * pop01(t, T.check, 0.25, 2.6))
        x.font = `800 40px ${INTER}`; x.fillStyle = '#3a2a5a'; x.fillText('be kind to me', -116, 18)
        x.restore()
      }
    }
    // Pisces' gift: a tiny gold star flies to Virgo
    if (t > T.gift) {
      const p = ease.inOutCubic(prog(t, T.gift, T.gift + 0.8))
      const gx = lerp(575, 380, p), gy = lerp(1060, 1050, p) - Math.sin(Math.PI * p) * 240
      drawPixelStar(x, gx, gy, 54 * (1 + 0.15 * Math.sin(t * 8)), 2, GOLD)
    }
    sparkles(x, t, 760, 760, T.check, 10, 230, 2)
    sparkles(x, t, 380, 1050, T.gift + 0.8, 10, 140, 3)
    hearts(x, t, T.gift + 0.9, 300, 1080, { n: 5, cell: 7, spread: 140 })
  },
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['pluck', r3(i * 0.07), 2637 - i * 120, 0.012, 0.08, 0.2]),
    ['whoosh', 0.3, 0.6, 0.03], ['whoosh', 1.2, 0.8, 0.025],
    ['whoosh', T.roll[0], 0.5, 0.04], ['pop', T.one, 1174.66, 0.05, 0], ['pop', T.check, 1567.98, 0.05, 0], ['bell', T.check + 0.05, 2349.32, 0.025, 1.0, 0], ['glitter', T.check, T.check + 0.4],
    ['whoosh', T.gift, 0.6, 0.03], ['bell', T.gift + 0.8, 1760, 0.03, 1.0, -0.2], ['glitter', T.gift + 0.8, T.gift + 1.2],
    ['bell', T.last + 0.5, 1567.98, 0.03, 1.0, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
