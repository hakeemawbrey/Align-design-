// nf16e08: MEET THE FAMILY, Ep 8, "Give them a heads-up, not a warning." (40 s vertical, star_advice, music: jazzy · F).
// Story 0–35.6, then the shared end card. The series look lives in ../../nf16e01/scenes/familykit.js.
// Pisces is the partner here, so Pisces cries in every beat as itself (overwhelmed, then happy).
//   0.0–3.2    DEAR STARS: "“My family can be | *a lot.*”" — a Capricorn, three days out. ♑ Capricorn mid-hop with a
//              clipboard titled BRIEFING.
//   3.2–11.0   "The briefing: | *page nine.*"  The pages flip 1 → 9. CAPRICORN: "section four: the *uncles.*" ♓ PISCES
//              (welling up): "how many sections *are* there?"
//  11.0–19.8   "Prepare. | *Don't* apologize."  The pages flutter away. THE STARS: "a heads-up helps. a *manual* doesn't."
//              → "say what to expect, kindly. no *sorry* for your people."
//  19.8        card cut.
//  19.8–26.2   "Three honest | *lines.*"  One cue card writes on: MY UNCLE LOVES A DEBATE · MOM WILL FEED YOU TWICE · I'LL BE
//              RIGHT THERE. CAPRICORN: "my uncle loves a debate. my mom will feed you *twice.*" PISCES: "and you'll be
//              *right* there?"
//  26.2        ★ LESSON UNLOCKED: "A heads-up | is a *kindness.*"  +1 FOLDER CLOSED
//  30.2–35.6   "Ready. | *Together.*"  The front door, both of them on the step. THE STARS: "Tell them what to expect.
//              Then trust them."
import { makeFamily, K, box, R, ink, sparkles, hearts, shadow, clipboard, cueCard, frontDoor, snow, drawBits,
  pop01, outK, prog, lerp, clamp, ease, easeOutBack, GOLD, BONE, PINK, MINT, SKYB, RED, INTER } from '../../nf16e01/scenes/familykit.js'

const CAP = K.tag('capricorn'), PIS = K.tag('pisces')
const T = { b1: 3.2, b2: 11.0, b3: 19.8, lesson: 26.2, b4: 30.2, end: 35.61, card: [20.4, 21.6, 24.0] }
const BOXES = [
  { open: 5.6, close: 10.8, lines: [
    { t: 5.8, speaker: CAP, color: '#c9c3dc', text: 'section four: the *uncles.*' },
    { t: 8.2, speaker: PIS, color: '#c9a6ff', text: 'how many sections *are* there?' },
  ] },
  { open: 11.4, close: 19.6, lines: [
    { t: 11.6, speaker: K.STARS, text: "a heads-up helps. a *manual* doesn't." },
    { t: 14.4, speaker: K.STARS, text: 'say what to expect, kindly. no *sorry* for your people.' },
  ] },
  { open: 20.0, close: 26.0, lines: [
    { t: 20.2, speaker: CAP, color: '#c9c3dc', text: 'my uncle loves a debate. my mom will feed you *twice.*' },
    { t: 23.3, speaker: PIS, color: '#c9a6ff', text: "and you'll be *right* there?" },
  ] },
  { open: 30.75, close: 35.1, lines: [{ t: 30.95, speaker: K.STARS, text: 'Tell them what to expect. Then trust them.' }] },
]
const LINES3 = ['MY UNCLE LOVES A DEBATE.', 'MOM WILL FEED YOU TWICE.', "I'LL BE RIGHT THERE."]

function pair(x, t, S, { capMood = 'neutral', pisMood = 'wide', tears = 1, capY = 1180, pisY = 1180 } = {}) {
  shadow(x, 280, capY + 150, 220); shadow(x, 800, pisY + 150, 220)
  S.asker(x, t, { x: 280, y: capY, s: 220, mood: capMood, look: [1, -0.3] })
  S.partner(x, t, { x: 800, y: pisY, s: 220, mood: pisMood, look: [-1, -0.3], tears })
}
function hook(x, t, S) {
  shadow(x, 400, 1340, 280)
  S.asker(x, t, { x: 400, y: 1170, s: 270, mood: 'neutral', look: [1, -0.6], hops: [-0.12, 1.2, 2.4] })
  clipboard(x, 760, 960, { title: 'BRIEFING', page: 'p. 1', rot: 0.08 })
}
function beat1(x, t, S) {
  const u = t - S.t0, page = Math.min(9, 1 + Math.floor(u * 1.4))
  clipboard(x, 540, 760, { w: 420, h: 520, title: 'BRIEFING', lines: 8, page: `p. ${page}`, rot: -0.02 * Math.sin(t * 2) })
  // page flips: a sheet lifts off the top every 0.7 s
  const ph = (u * 1.4) % 1
  if (page < 9) { x.save(); x.globalAlpha = 1 - ph; x.translate(540, 560 - ph * 200); x.rotate(-ph * 1.2); box(x, -170, -20, 340, 40, BONE, { b: 3 }); x.restore() }
  pair(x, t, S, { capMood: 'happy', pisMood: 'wide', tears: u > 4.8 ? 3 : 2 })
}
function beat2(x, t, S) {
  for (let i = 0; i < 6; i++) {
    const p = ease.inCubic(prog(t, 11.4 + i * 0.18, 12.6 + i * 0.18))
    if (p < 1) { x.save(); x.globalAlpha = 1 - p; x.translate(540 + (i - 2.5) * 80 + p * (i - 2.5) * 260, 760 - p * 600); x.rotate(p * (i % 2 ? 2 : -2)); box(x, -150, -190, 300, 380, BONE, { b: 4 }); x.restore() }
  }
  pair(x, t, S, { capMood: t > 14.4 ? 'happy' : 'wide', pisMood: t > 15.5 ? 'happy' : 'neutral', tears: 2 })
}
function beat3(x, t, S) {
  x.save(); x.translate(540, 760); x.rotate(-0.02)
  box(x, -400, -200, 800, 400, '#fffbea', { b: 7 })
  for (let i = 0; i < 6; i++) R(x, 'rgba(127,176,255,0.45)', -380, -120 + i * 60, 760, 3)
  LINES3.forEach((s, j) => { const p = prog(t, T.card[j], T.card[j] + 0.6); if (p > 0) { x.save(); x.beginPath(); x.rect(-380, -140 + j * 110, 760 * p, 100); x.clip(); ink(x, s, -360, -90 + j * 110, { size: 44, align: 'left', font: INTER, weight: 800, col: j === 2 ? '#c2334f' : '#2a2a6a' }); x.restore() } })
  x.restore()
  for (const a of T.card) sparkles(x, t, 900, 760, a + 0.6, 6, 60, 1)
  pair(x, t, S, { capMood: 'happy', pisMood: t > T.card[2] ? 'sparkle' : 'neutral', tears: t > T.card[2] ? 3 : 2 })
  hearts(x, t, T.card[2] + 0.4, 800, 1020, { n: 5 })
}
function beat4(x, t, S) {
  frontDoor(x, t, { cx: 540, floor: 1250, s: 0.95, open: 0 })
  snow(x, t, { n: 50, y0: 380, y1: 1380, seed: 8 })
  shadow(x, 400, 1350, 220); shadow(x, 680, 1350, 220)
  S.asker(x, t, { x: 400, y: 1200, s: 210, mood: 'happy', look: [1, -0.4], hops: [S.t0 + 0.4, 33.4] })
  S.partner(x, t, { x: 680, y: 1200, s: 210, mood: t > 33.3 ? 'heart' : 'happy', look: [-1, -0.4], tears: 3, hops: [S.t0 + 0.55, 33.3] })
  hearts(x, t, 33.3, 540, 1020, { n: 6 })
}

const EP = makeFamily({
  id: 'nf16e08', D: 40, key: 'F', asker: 'capricorn', partner: 'pisces',
  askerAcc: [['glasses']], partnerAcc: [['scarf', '#9fe6b0']],
  q: { text: '“My family can be | *a lot.*”', sign: '— a Capricorn, three days out', out: [2.9, 3.2], accentSize: 130 },
  hook,
  hookPis: { x: 950, y: 1350, s: 120, at: 0.6, tears: 1, look: [-1, -1] },
  beats: [
    { t0: T.b1, t1: T.b2, head: 'The briefing: | *page nine.*', accent: PINK, draw: beat1, stars: null, pis: null },
    { t0: T.b2, t1: T.b3, head: 'Prepare. | *Don’t* apologize.', accent: GOLD, draw: beat2, stars: { x: 540, y: 1250, s: 150 }, pis: null },
    { t0: T.b3, t1: T.lesson, head: 'Three honest | *lines.*', accent: MINT, draw: beat3, stars: null, pis: null },
    { t0: T.lesson, t1: T.b4, head: null, draw: beat3, stars: null, pis: null, punch: false },
    { t0: T.b4, t1: T.end, head: 'Ready. | *Together.*', accent: PINK, draw: beat4, stars: { x: 140, y: 1300, s: 140 }, pis: null },
  ],
  boxes: BOXES,
  lesson: { at: T.lesson, out: [30.0, 30.2], text: 'A heads-up | is a *kindness.*', chip: '+1 FOLDER CLOSED', accentColor: GOLD, dim: 0.6 },
  cuts: [T.b2, { t: T.b3, kind: 'flip' }, T.b4],
  flashes: [T.b1, T.b2],
  cues: [
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.b1 + (i + 1) / 1.4).toFixed(3), 0.03]),
    ...Array.from({ length: 6 }, (_, i) => ['whoosh', +(11.4 + i * 0.18).toFixed(3), 0.3, 0.02]),
    ...T.card.map((a, i) => ['pop', +(a + 0.6).toFixed(3), [1174.66, 1318.51, 1567.98][i], 0.04, 0]),
    ['bell', T.card[2] + 0.7, 1760, 0.025, 1, 0], ['pluck', 33.3, 1174.66, 0.035, 0.5, 0],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [cueCard, drawBits, SKYB, RED, lerp, clamp, pop01, outK, easeOutBack]
