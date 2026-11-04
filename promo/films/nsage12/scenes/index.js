// nsage12: SAG SEASON TAKEOVER, ep 12, "The Scrapbook" (20 s vertical, music: dreamy · Ab). promo/films/next30/b10.md.
// Story 0–15.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.3    hook "Sag made a | *scrapbook* of the month."  Frame 0: Sag mid-slam of a giant scrapbook onto the table.
//   2.3–5.2    "Page one: | the *packing list.*"  The backpack doodle, a talk card taped in, a ticket stub (callback, ep 2).
//   5.2–8.1    "Page two: | the *toast.*"  Mug doodles, the party lights, "ROAST NOBODY" (callbacks, eps 8–9).
//   8.1        card cut.
//   8.1–11.2   "Next page: | *who's this?*"  The page turns… Capricorn peeks in from the edge with a planner (a tease).
//              Pisces cries onto the page and smudges it.
//  11.2–15.6   SAG: "Keep the *ticket stubs.* All of them."
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, table, mug, cardImg, drawBits, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

const BOOK = { cx: 540, cy: 900, w: 880, h: 560 }
function book(x, k = 1, turn = 0) {
  const { cx, cy, w, h } = BOOK
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2 - 14, -h / 2 - 14, w + 28, h + 28, '#7a3f5a', { b: 7 })
  box(x, -w / 2, -h / 2, w / 2 - 4, h, '#f6efe0', { b: 4 }); box(x, 4, -h / 2, w / 2 - 4, h, '#f6efe0', { b: 4 })
  R(x, '#d9cdb5', -6, -h / 2, 12, h)
  if (turn > 0 && turn < 1) { const pw = (w / 2) * Math.cos(Math.PI * turn); R(x, INK, pw >= 0 ? 0 : pw, -h / 2 - 4, Math.abs(pw) + 4, h + 8); R(x, '#ece2cc', pw >= 0 ? 2 : pw + 2, -h / 2, Math.abs(pw), h) }
  x.restore()
}
function stub(x, cx, cy, rot, text = 'ADMIT TWO') {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -100, -36, 200, 72, '#ffd36b', { b: 5 }); R(x, INK, 40, -36, 4, 72)
  ink(x, text, -30, 0, { size: 20 }); x.restore()
}
function tape(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.globalAlpha = 0.75; R(x, '#fff7d0', -40, -12, 80, 24); x.restore() }
const PACK = ['.OOOO.', 'GGGGGG', 'GGGGGG', 'GDDDDG', 'GDDDDG', 'GGGGGG']

const EP = makeTakeover({
  id: 'nsage12', host: 'sag', duration: 20, dy: 120,
  images: ['card-talk-6.png'],
  hook: {
    text: 'Sag made a | *scrapbook* of the month.', dur: 2.3,
    draw(x, t, S) {
      floor(x, 1260)
      table(x, 540, 1150, 980)
      const p = ease.inCubic(clamp(prog(t, 0, 0.35)))
      const by = lerp(820, 1100, p)
      x.save(); x.translate(620, by); x.rotate(lerp(-0.3, 0, p))
      box(x, -230, -70, 460, 70, '#7a3f5a', { b: 7, hi: '#9a5a78' }); R(x, '#f6efe0', -220, -10, 440, 10)
      ink(x, 'SAG SEASON', 0, -36, { size: 30, col: GOLD })
      x.restore()
      if (t > 0.35) { sparkles(x, t, 620, 1080, 0.36, 10, 260, 1); for (let i = 0; i < 6; i++) { const q = clamp((t - 0.36) * 2); R(x, '#cfc8e8', 620 + (i - 2.5) * 90 * (1 + q), 1140 - 60 * q * Math.sin(i), 14, 14) } }
      S.host(x, t, { x: 270, y: 980, s: 270, mood: t < 0.4 ? 'squint' : 'sparkle', look: [1, 0.5], squash: t < 0.4 ? -0.1 : 0, hops: [0.38, 1.1] })
    },
    cues: [['whoosh', 0, 0.35, 0.05], ['tom', 0.35, 100, { gain: 0.2, decay: 0.25 }], ['tick', 0.36, 0.08]],
  },
  beats: [
    { dur: 2.9, head: 'Page one: | the *packing list.*',
      draw(x, t, S) {
        floor(x, 1260)
        book(x, pop01(t, S.t0, 0.3, 1.6))
        drawBits(x, PACK, { O: '#c96a3b', G: '#5d8a4e', D: '#4c7640' }, 330, 820, 26)
        ink(x, 'the backpack', 330, 1000, { size: 26, font: "'EB Garamond', serif", weight: 500 })
        cardImg(x, S.img['card-talk-6.png'], 760, 860, 180, 0.08); tape(x, 760, 730, -0.1)
        stub(x, 700, 1080, -0.08, 'DATE ONE')
        S.host(x, t, { x: 150, y: 1240, s: 170, mood: 'happy', look: [1, -1], hops: [S.t0 + 0.4] })
      },
      pis: { x: 950, y: 1690, s: 115 },
      cues: [['whoosh', 0, 0.3, 0.03]],
    },
    { dur: 2.9, head: 'Page two: | the *toast.*',
      draw(x, t, S) {
        floor(x, 1260)
        book(x, 1, prog(S.u, 0, 0.35))
        if (S.u > 0.3) {
          mug(x, 280, 820, 1.2, RED); mug(x, 400, 860, 1.2, '#5fb8ff')
          ink(x, 'ROAST NOBODY.', 340, 1000, { size: 28, col: RED })
          for (let i = 0; i < 6; i++) { R(x, INK, 620 + i * 55 - 8, 720 + 14 * Math.sin(i), 16, 22); R(x, [RED, GOLD, '#5fb8ff', '#9fe6b0'][i % 4], 620 + i * 55 - 5, 723 + 14 * Math.sin(i), 10, 16) }
          ink(x, 'the party', 760, 820, { size: 30, font: "'EB Garamond', serif", weight: 500 })
          stub(x, 760, 960, 0.1, 'PARTY OF 40')
        }
        S.host(x, t, { x: 150, y: 1240, s: 170, mood: 'sparkle', look: [1, -1], hops: [S.t0 + 0.5] })
      },
      pis: { x: 950, y: 1690, s: 125 },
      cues: [['whoosh', 0, 0.35, 0.035]],
    },
    { dur: 3.1, head: 'Next page: | *who’s this?*', accent: '#9fd3c7',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260)
        book(x, 1, prog(u, 0, 0.35))
        // Pisces' tear smudges
        if (u > 1.4) for (let i = 0; i < 3; i++) { const k = pop01(t, S.t0 + 1.4 + i * 0.3, 0.2, 2); x.save(); x.globalAlpha = 0.5 * k; x.fillStyle = '#7fb8e8'; x.beginPath(); x.ellipse(380 + i * 120, 860 + (i % 2) * 70, 50 * k, 34 * k, 0, 0, Math.PI * 2); x.fill(); x.restore() }
        // Capricorn peeks in from the right edge with a planner
        const pk = ease.outCubic(prog(u, 0.6, 1.1))
        S.star(x, t, 'capricorn', { x: lerp(1250, 980, pk), y: 760, s: 200, mood: 'neutral', look: [-1, 0.3], hops: [S.t0 + 1.2] })
        if (pk > 0) { x.save(); x.translate(lerp(1250, 980, pk) - 110, 860); x.rotate(-0.1); box(x, -50, -60, 100, 120, '#2e5f5a', { b: 5 }); for (let i = 0; i < 4; i++) R(x, BONE, -36, -40 + i * 24, 72, 6); x.restore() }
        S.host(x, t, { x: 150, y: 1240, s: 170, mood: u < 1.1 ? 'happy' : 'wide', look: [1, -1], hops: [S.t0 + 1.15] })
        S.pisces(x, t, { x: 540, y: 1280, s: 170, hops: [S.t0 + 1.3] }, 3, 'sparkle', [0, -1])
      },
      says: [{ at: 1.2, text: 'is there a schedule for this?', x: 780, y: 560, who: 'capricorn', tail: 0.5, size: 32 }],
      pis: false,
      cues: [['whoosh', 0, 0.35, 0.035], ['pop', 1.1, 659.25, 0.04, 0.5], ['pluck', 1.4, 1567.98, 0.025, 0.4, 0], ['pluck', 1.7, 1567.98, 0.025, 0.4, 0], ['pluck', 2.0, 1567.98, 0.025, 0.4, 0]],
    },
  ],
  last: { who: 'host', text: 'Keep the *ticket stubs.* All of them.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 540, 1120, 240 * ok)
    S.host(x, t, { x: 540, y: 930, s: 270, pop: ok, mood: 'happy', look: [0, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    stub(x, 330, 720, -0.2 + 0.05 * Math.sin(t * 2), 'DATE ONE'); stub(x, 760, 690, 0.15, 'PARTY OF 40')
    hearts(x, t, S.t0 + 0.8, 540, 700, { n: 4 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, BONE]
