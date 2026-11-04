// nsage07: SAG SEASON TAKEOVER, ep 7, "Sag on the Couch" (25 s vertical, music: dreamy · Eb). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Sag trying to sit | *still* for one movie."  Frame 0: Sag on the couch next to Taurus, mid-bounce.
//   2.6–7.2    "Sag's *brain:*"  Thought clouds pop up: a mountain, a ferris wheel, a hot-air balloon.
//   7.2–11.6   "Taurus *pauses* it."  TAURUS: "where are you right now?"  SAG: "…somewhere far. sorry."
//  11.6        card cut.
//  11.6–16.1   "Right *here.*"  TAURUS: "take me next time."  SAG: "deal. right now I'm here."  The clouds pop; Sag
//              scoots over and snuggles in under the blanket.
//  16.1–20.6   THE STARS: "Be *here* first. Then go far."  Pisces fountains.
import { makeTakeover, R, box, couch, floor, shadow, glow, sparkles, hearts, drawBits, prog, lerp, clamp, ease, pop01, outK, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

const MOUNT = ['.....W.....', '....WWW....', '...WWGWW...', '..GGGGGGG..', '.GGGGGGGGG.', 'GGGGGGGGGGG']
const BALLOON = ['.RRRR.', 'RRYYRR', 'RRYYRR', 'RRYYRR', '.RRRR.', '..BB..', '..BB..']
function ferris(x, cx, cy, r, t) {
  x.save(); x.translate(cx, cy)
  R(x, INK, -6, 0, 12, r + 30)
  for (let i = 0; i < 8; i++) { const a = t * 0.8 + i * Math.PI / 4; x.save(); x.rotate(a); R(x, '#8a7fb0', 0, -2, r, 4); x.restore() }
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; R(x, '#c9c3dd', Math.cos(a) * r - 3, Math.sin(a) * r - 3, 6, 6) }
  for (let i = 0; i < 8; i++) { const a = t * 0.8 + i * Math.PI / 4; R(x, INK, Math.cos(a) * r - 9, Math.sin(a) * r - 4, 18, 16); R(x, [RED, GOLD, '#5fb8ff', '#9fe6b0'][i % 4], Math.cos(a) * r - 7, Math.sin(a) * r - 2, 14, 12) }
  x.restore()
}
// a thought cloud with a picture inside; k = pop, at (cx, cy)
function cloud(x, t, cx, cy, k, kind) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, -90, 220, 180, BONE, { b: 6 })
  box(x, -130, -50, 260, 100, BONE, { b: 0 })
  if (kind === 0) drawBits(x, MOUNT, { W: '#ffffff', G: '#6a8f5a' }, 0, 10, 16)
  if (kind === 1) ferris(x, 0, -6, 60, t)
  if (kind === 2) drawBits(x, BALLOON, { R: RED, Y: GOLD, B: '#8a5a3a' }, 0, 0 + 6 * Math.sin(t * 2), 18)
  x.restore()
}
const CLOUDS = [[230, 560, 0.5], [540, 470, 1.4], [850, 560, 2.3]]
function tv(x, a) { glow(x, 540, 1400, 600, 0.2 * a, '140,190,255') }
function blanket(x, cx, cy, w, col = '#ff8fb1') { box(x, cx - w / 2, cy, w, 120, col, { b: 6, hi: '#ffb3cd' }); for (let i = 0; i < 6; i++) R(x, '#ffe0ea', cx - w / 2 + 20 + i * (w - 40) / 6, cy + 50, 20, 20) }

const EP = makeTakeover({
  id: 'nsage07', host: 'sag', duration: 25, dy: 160,
  hook: {
    text: 'Sag trying to sit | *still* for one movie.', dur: 2.6,
    draw(x, t, S) {
      floor(x, 1260)
      tv(x, 1)
      couch(x, 540, 1170, 720)
      S.host(x, t, { x: 360, y: 1050, s: 230, mood: 'squint', look: [0, -1], squash: 0.06 * Math.sin(t * 30), hops: [0.2, 0.55, 0.9, 1.25, 1.6, 1.95, 2.3] })
      S.star(x, t, 'taurus', { x: 720, y: 1050, s: 230, mood: 'happy', look: [0, 1] })
      blanket(x, 720, 1090, 230)
    },
    cues: [['tick', 0.2, 0.04], ['tick', 0.55, 0.04], ['tick', 0.9, 0.04], ['tick', 1.25, 0.04], ['tick', 1.6, 0.04], ['tick', 1.95, 0.04]],
  },
  beats: [
    { dur: 4.6, head: "Sag's *brain:*",
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260); tv(x, 1)
        CLOUDS.forEach(([cx, cy, at], i) => { const k = pop01(t, S.t0 + at, 0.35, 2.2); cloud(x, t, cx, cy, k, i); if (k > 0.01) for (let j = 0; j < 2; j++) R(x, BONE, lerp(360, cx, 0.3 + j * 0.25) - 10, lerp(900, cy + 100, 0.3 + j * 0.25) - 10, 20 - j * 4, 20 - j * 4) })
        couch(x, 540, 1170, 720)
        S.host(x, t, { x: 360, y: 1050, s: 230, mood: 'sparkle', look: [0, -1], hops: [S.t0 + 0.5, S.t0 + 1.4, S.t0 + 2.3] })
        S.star(x, t, 'taurus', { x: 720, y: 1050, s: 230, mood: u < 3.0 ? 'happy' : 'neutral', look: u < 3.0 ? [0, 1] : [-1, 0] })
        blanket(x, 720, 1090, 230)
      },
      pis: { x: 950, y: 1690, s: 120 },
      cues: [['pop', 0.5, 880, 0.04, -0.4], ['pop', 1.4, 1174.66, 0.04, 0], ['pop', 2.3, 1318.51, 0.04, 0.4], ['glitter', 0.5, 2.6]],
    },
    { dur: 4.4, head: 'Taurus *pauses* it.', accent: '#e8c84a',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260); tv(x, 0.5)
        CLOUDS.forEach(([cx, cy], i) => cloud(x, t, cx, cy, 0.75, i))
        couch(x, 540, 1170, 720)
        S.host(x, t, { x: 360, y: 1050, s: 230, mood: u < 2.2 ? 'wide' : 'neutral', look: [1, 0], hops: [S.t0 + 2.3] })
        S.star(x, t, 'taurus', { x: 720, y: 1050, s: 230, mood: 'neutral', look: [-1, 0], hops: [S.t0 + 0.35, S.t0 + 0.8] })
        blanket(x, 720, 1090, 230)
        // the pause icon over the "screen"
        const pk = pop01(t, S.t0 + 0.1, 0.3, 2) * 0.9
        if (pk > 0.01) { x.save(); x.translate(540, 1420); x.scale(pk, pk); R(x, INK, -50, -50, 36, 100); R(x, BONE, -44, -44, 24, 88); R(x, INK, 14, -50, 36, 100); R(x, BONE, 20, -44, 24, 88); x.restore() }
      },
      says: [
        { at: 0.35, text: 'where are you right now?', x: 740, y: 880, who: 'taurus', tail: 0.1 },
        { at: 2.3, text: '…somewhere far. sorry.', x: 330, y: 700, who: 'host', tail: -0.1 },
      ],
      pis: { x: 950, y: 1690, s: 125 },
      cues: [['tick', 0.1, 0.07], ['pluck', 2.3, 523.25, 0.03, 0.8, -0.3]],
    },
    { dur: 4.5, head: 'Right *here.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1260); tv(x, 1)
        CLOUDS.forEach(([cx, cy, at], i) => { const pp = prog(u, 2.0 + i * 0.12, 2.25 + i * 0.12); if (pp < 1) cloud(x, t, cx, cy, 0.75 * (1 + 0.3 * pp) * (1 - pp), i); sparkles(x, t, cx, cy, S.t0 + 2.25 + i * 0.12, 8, 100, i) })
        couch(x, 540, 1170, 720)
        const sc = ease.inOutCubic(prog(u, 2.6, 3.2))
        S.host(x, t, { x: lerp(360, 560, sc), y: 1050, s: 230, mood: u < 1.8 ? 'happy' : 'heart', look: [1, 0], hops: [S.t0 + 1.8, S.t0 + 2.6] })
        S.star(x, t, 'taurus', { x: lerp(720, 760, sc), y: 1050, s: 230, mood: u < 2.6 ? 'happy' : 'heart', look: [-1, 0], hops: [S.t0 + 0.3] })
        blanket(x, lerp(720, 660, sc), 1090, lerp(230, 420, sc))
        hearts(x, t, S.t0 + 3.2, 660, 900, { n: 6 })
      },
      says: [
        { at: 0.3, until: 2.6, text: 'take me next time.', x: 720, y: 850, who: 'taurus', tail: 0 },
        { at: 1.8, text: "deal. right now I'm here.", x: 380, y: 720, who: 'host', tail: -0.1 },
      ],
      pis: { x: 950, y: 1690, s: 130, tears: 3 },
      cues: [['pop', 2.25, 1567.98, 0.04, -0.4], ['pop', 2.37, 1567.98, 0.04, 0], ['pop', 2.49, 1567.98, 0.04, 0.4], ['whoosh', 2.6, 0.5, 0.03], ['pluck', 3.2, 1174.66, 0.04, 0.6, 0]],
    },
  ],
  last: { who: 'stars', text: 'Be *here* first. Then go far.' },
  finale(x, t, S) {
    const { ok } = S
    x.save(); x.translate(540, 1000); x.scale(ok * 0.85, ok * 0.85); x.translate(-540, -1180)
    couch(x, 540, 1170, 720)
    S.host(x, t, { x: 560, y: 1050, s: 230, mood: 'sleepy', look: [1, 0], zzz: false })
    S.star(x, t, 'taurus', { x: 760, y: 1050, s: 230, mood: 'happy', look: [-1, 0] })
    blanket(x, 660, 1090, 420)
    x.restore()
  },
  finalePis: { x: 930, y: 1300, s: 140 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, outK, clamp]
