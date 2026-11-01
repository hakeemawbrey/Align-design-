// trratecooked: RATING MY DATE, HONESTLY, "Rating the dinner they cooked me." (30 s vertical, Star Talk Trends §14,
// music: funk · Bm). Story 0–25.5, then the shared end card. The format look lives in ./ratekit.js (identical in all five).
//   0.0–2.6    hook: "Rating the dinner | they *cooked me.*" ♉ Taurus, clipboard in hand: "honest review. no bias."
//              THE STARS take the judges' desk; Pisces takes the fourth seat (tissues, soggy heart card).
//   2.6–8.0    1 · The *pasta.*  ♈ Aries (chef hat) presents a plate with a flourish. Taurus takes a bite: CRUNCH.
//              CRUNCH. Aries sweats. Cards: 6 · CRUNCHY · 6.5. Taurus: "al dente. very. VERY al dente."
//   8.0–13.4   2 · The *sauce.*  The plate up close: the sauce is a little smoky (a grey puff)… then the spoon draws a
//              heart in it. Cards: TASTE 4 · HEART 10 · AVG 7. "taste: smoky. the heart in it: *perfect.*"
//  13.4        card cut.
//  13.4–19.2   3 · The *effort.* (the twist)  Aries unrolls a handwritten menu "for Taurus ♥" (dessert: store-bought,
//              sorry). Taurus melts. Cards: 11 · /10 · CHEF'S KISS.
//  19.2–25.5   Final *score.*  Drumroll, huddle, the cards flip ∞ · EFFORT · ∞, the meter overfills and shatters, the
//              stamp: "EFFORT: *INFINITE*". THE STARS: "Effort: *infinite.*" They share the crunchy pasta. Pisces fountains.
import { makeRate, R, box, room, nightWindow, shadow, bubble, label, sparkles, hearts, drawBits, starFrame, inSprite, clipboardCells,
  pop01, outK, prog, lerp, ease, easeOutBack, INK, BONE, GOLD, PINK, RED, INTER, MONO, CLIP, FLOOR } from './ratekit.js'

const TAU = '#e9b24a'
const GND = FLOOR + 40

// a chef hat on the sprite (sprite cells)
function chefHatCells(x) {
  x.fillStyle = INK; x.fillRect(10, -7, 16, 9); x.fillRect(12, 1, 12, 4)
  x.fillStyle = '#ffffff'; x.fillRect(11, -6, 14, 7); x.fillRect(13, 1, 10, 3)
  x.fillStyle = '#dcd6ea'; x.fillRect(13, 2.4, 10, 0.8); x.fillRect(16, -6, 0.8, 6); x.fillRect(20, -6, 0.8, 6)
}
const chef = (x, t, date, o) => { date(x, t, o); inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => chefHatCells(x)) }

function kitchen(x, t) {
  room(x, '#2c3a5e', '#251c40', {})
  for (let j = 0; j < 7; j++) for (let i = 0; i < 12; i++) R(x, 'rgba(255,255,255,0.05)', CLIP.x + i * 72 + (j % 2) * 36, CLIP.y + 120 + j * 52, 66, 46)
  nightWindow(x, 240, 560, 220, 150, t)
  // stove + pot (no flames: just a cosy pot with steam)
  box(x, 600, 700, 240, GND - 700, '#8c86a8', { b: 8, hi: '#a9a3c4' })
  R(x, INK, 620, 760, 200, 8); R(x, INK, 650, 800, 40, 40); R(x, INK, 750, 800, 40, 40)
  box(x, 650, 630, 140, 64, '#4f7cd8', { b: 6, hi: '#7aa0ee' })
  for (let i = 0; i < 3; i++) { const p = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = 0.45 * (1 - p); R(x, '#e8e4f4', 690 + i * 22 + 8 * Math.sin(t * 3 + i), 600 - p * 120, 16, 16); x.restore() }
}
function plate(x, cx, cy, s, { sauce = false, heart = 0, smoke = 0, t = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 128, 52, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4f0fa'; x.beginPath(); x.ellipse(0, -2, 120, 46, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#dcd6ea'; x.beginPath(); x.ellipse(0, 0, 84, 30, 0, 0, Math.PI * 2); x.fill()
  // pasta: stiff straight pixel sticks (very al dente)
  for (let i = 0; i < 9; i++) { x.save(); x.rotate(-0.5 + i * 0.12); R(x, '#a87a2a', -62, -6 + (i % 3) * 5 - 2, 124, 7); R(x, '#f2cf6a', -60, -6 + (i % 3) * 5, 120, 4); x.restore() }
  if (sauce) {
    x.fillStyle = '#5a1f26'; x.beginPath(); x.ellipse(0, -4, 64, 22, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#7a2a30'; x.beginPath(); x.ellipse(-10, -8, 40, 12, 0, 0, Math.PI * 2); x.fill()
    if (heart > 0) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ffd0dc' }, 0, -6, 4 * (0.6 + 0.4 * heart), { outline: null, sy: 0.55, alpha: heart })
  }
  x.restore()
  if (smoke > 0) for (let i = 0; i < 5; i++) { const p = (t * 0.5 + i / 5) % 1; x.save(); x.globalAlpha = 0.5 * smoke * (1 - p); R(x, '#8f8aa6', cx - 60 + i * 30 + 14 * Math.sin(t * 2 + i), cy - 40 - p * 220, 30 + p * 30, 30 + p * 30); x.restore() }
}

function pasta(x, t, S) {
  const { u, t0, hero, date } = S
  kitchen(x, t)
  box(x, 100, 860, 470, 34, '#8a5a3a', { b: 8, hi: '#a87048' }); R(x, INK, 140, 900, 22, 100); R(x, INK, 510, 900, 22, 100)
  const ap = ease.outCubic(prog(u, 0.05, 0.5)), pres = easeOutBack(prog(u, 0.55, 0.85), 2)
  const crunch = [1.45, 1.75, 2.05].map(v => t0 + v)
  hero(x, t, { x: 220, y: 760, s: 220, mood: u < 1.4 ? 'sparkle' : u < 2.3 ? 'squint' : 'neutral', look: [1, 0], hops: crunch })
  const ax = lerp(900, 640, ap)
  shadow(x, ax, GND, 200)
  chef(x, t, date, { x: ax, y: 840, s: 220, mood: u < 1.45 ? 'sparkle' : 'wide', look: [-1, 0], hops: [t0 + 0.55, t0 + 0.75] })
  plate(x, lerp(ax - 120, 380, pres), lerp(820, 850, pres), 0.9)
  if (u > 0.6) sparkles(x, t, 380, 820, t0 + 0.85, 8, 110, 1, [GOLD, BONE])
  bubble(x, t, 640, 590, t0 + 0.6, t0 + 1.4, 'ta-da!', { size: 40, tail: 0 })
  crunch.forEach((c, i) => {
    const k = pop01(t, c, 0.2, 3) * outK(t, [c + 0.55, c + 0.75])
    if (k > 0.01) label(x, 'CRUNCH', [300, 460, 200][i], [600, 560, 520][i], { size: 50 * k, col: GOLD, font: INTER, weight: 800, rot: [-0.12, 0.1, -0.05][i] })
  })
  // nervous sweat on the chef
  if (u > 1.5) for (let i = 0; i < 2; i++) { const p = (t * 1.3 + i / 2) % 1; R(x, '#8fe3ff', ax + 70 + i * 16, 740 + p * 50, 8, 12) }
}

function sauce(x, t, S) {
  const { u, t0, hero, date } = S
  R(x, '#3a2a55', CLIP.x, CLIP.y, CLIP.w, CLIP.h)
  for (let i = 0; i < 8; i++) R(x, i % 2 ? '#e8344e' : '#f2e6e0', CLIP.x + i * 105, CLIP.y + 380, 105, 260)   // tablecloth
  for (let i = 0; i < 8; i++) R(x, i % 2 ? '#f2e6e0' : '#e8344e', CLIP.x + i * 105, CLIP.y + 510, 105, 130)
  R(x, INK, CLIP.x, CLIP.y + 372, CLIP.w, 8)
  const heart = ease.inOutQuad(prog(u, 1.2, 2.1))
  plate(x, 470, 830, 2.2, { sauce: true, heart, smoke: 1 - prog(u, 1.0, 1.6) * 0.8, t })
  // the spoon drawing the heart
  if (u > 1.1 && u < 2.4) {
    const a = prog(u, 1.2, 2.1) * Math.PI * 2, sx = 470 + 70 * Math.sin(a), sy = 800 - 30 * Math.cos(a)
    x.save(); x.translate(sx, sy); x.rotate(-0.6); box(x, -10, -150, 20, 140, '#c9c3dc', { b: 5 }); box(x, -26, -12, 52, 34, '#c9c3dc', { b: 5 }); x.restore()
  }
  hero(x, t, { x: 170, y: 600, s: 170, mood: u < 0.9 ? 'squint' : u < 2.1 ? 'wide' : 'heart', look: [1, 1], hops: [t0 + 0.9, t0 + 2.15] })
  date(x, t, { x: 790, y: 600, s: 170, mood: u < 1.1 ? 'wide' : 'happy', look: [-1, 1], hops: [t0 + 1.15] })
  bubble(x, t, 470, 520, t0 + 0.4, t0 + 1.2, '…smoky.', { size: 38, tail: -0.6 })
  if (u > 2.1) { hearts(x, t, t0 + 2.15, 470, 760, { n: 5, spread: 200 }); sparkles(x, t, 470, 800, t0 + 2.1, 10, 160, 1) }
}

function effort(x, t, S) {
  const { u, t0, hero, date } = S
  kitchen(x, t)
  const un = ease.outCubic(prog(u, 0.6, 1.3))
  hero(x, t, { x: 230, y: 840, s: 220, mood: u < 1.3 ? 'neutral' : u < 1.9 ? 'wide' : 'heart', look: [1, -0.4], hops: [t0 + 1.35, t0 + 2.0, t0 + 2.4], blush: u > 1.9 ? 1 : undefined })
  shadow(x, 230, GND, 200); shadow(x, 700, GND, 200)
  chef(x, t, date, { x: 700, y: 860, s: 210, mood: u < 2 ? 'happy' : 'sparkle', look: [-1, 0], hops: [t0 + 0.5] })
  // the handwritten menu
  if (un > 0.01) {
    x.save(); x.translate(480, 470); x.rotate(-0.03)
    const h = 360 * un
    box(x, -190, 0, 380, h, '#fff6e2', { b: 6 })
    R(x, '#c9b48a', -198, -12, 396, 18); R(x, '#c9b48a', -198, h - 6, 396, 18)
    x.save(); x.beginPath(); x.rect(-190, 0, 380, h); x.clip()
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2c2a7a'
    x.font = `800 40px ${INTER}`; x.fillText('MENU', 0, 40)
    x.font = `italic 500 34px 'EB Garamond', Georgia, serif`; x.fillStyle = RED; x.fillText('for Taurus ♥', 0, 84)
    x.font = `700 20px ${MONO}`; x.fillStyle = '#2c2a7a'
    ;['1. pasta', '   (crunchy edition)', '2. sauce, with a heart', '3. dessert', '   (store-bought, sorry)'].forEach((s, i) => { x.textAlign = 'left'; x.fillText(s, -168, 136 + i * 40) })
    x.restore(); x.restore()
  }
  if (u > 1.9) { hearts(x, t, t0 + 1.95, 230, 700, { n: 6 }); sparkles(x, t, 480, 650, t0 + 1.3, 12, 220, 2) }
}

function finale(x, t, S) {
  const { t0, ok, hero, date } = S
  kitchen(x, t)
  box(x, 130, 860, 700, 34, '#8a5a3a', { b: 8, hi: '#a87048' })
  hero(x, t, { x: 290, y: 760, s: 230, pop: ok, mood: t < 21.3 ? 'squint' : 'heart', look: [1, 0], hops: [t0 + 0.4, 21.32, 22.0, 23.0] })
  chef(x, t, date, { x: 670, y: 760, s: 230, pop: ok, mood: t < 21.3 ? 'wide' : 'happy', look: [-1, 0], hops: [21.36, 22.4, 23.4] })
  plate(x, 480, 850, 0.95 * ok)
  if (t > 21.5) [0, 1].forEach(i => { const c = 21.9 + i * 0.9; const k = pop01(t, c, 0.2, 3) * outK(t, [c + 0.5, c + 0.7]); if (k > 0.01) label(x, 'crunch', 480 + (i ? 120 : -120), 700, { size: 34 * k, col: GOLD, font: INTER, weight: 800 }) })
  hearts(x, t, 21.4, 480, 680, { n: 7, spread: 340 })
}

const EP = makeRate({
  id: 'trratecooked', hero: 'taurus', heroName: 'TAURUS', date: 'aries', accent: '#ff8a5c', heroInk: '#f4c86a',
  title: 'Rating the dinner | they *cooked me.*',
  hookTime: '9:30 PM', hookSay: 'honest review. no bias.',
  moments: [
    { caption: 'The *pasta.*', time: '7:05 PM', draw: pasta, cards: ['6', 'CRUNCHY', '6.5'], level: 6,
      line: 'al dente. very. *VERY* al dente.',
      cues: [['whoosh', 0.05, 0.35, 0.03], ['pop', 0.6, 1174.66, 0.04, 0.3], ['glitter', 0.85, 1.2],
        ['tick', 1.45, 0.08], ['tick', 1.5, 0.05], ['tick', 1.75, 0.08], ['tick', 1.8, 0.05], ['tick', 2.05, 0.09], ['tick', 2.1, 0.06]] },
    { caption: 'The *sauce.*', time: '7:20 PM', draw: sauce, cards: ['TASTE|4', 'HEART|10', 'AVG|7'], level: 7,
      line: 'taste: smoky. the heart in it: *perfect.*',
      cues: [['pop', 0.4, 659.25, 0.03, 0], ['riser', 1.2, 2.1, 0.015], ['pluck', 2.15, 1174.66, 0.04, 0.5, 0], ['pluck', 2.27, 1567.98, 0.035, 0.5, 0], ['glitter', 2.1, 2.5]] },
    { caption: 'The *effort.*', time: '7:45 PM', draw: effort, cards: ['11', '/10', 'CHEF’S|KISS'], level: 11,
      line: 'they wrote a *menu.* by hand. for me.',
      cues: [['whoosh', 0.6, 0.5, 0.03], ['tick', 1.3, 0.05], ['pop', 1.35, 1318.51, 0.04, 0], ['pluck', 1.95, 1174.66, 0.04, 0.5, -0.3], ['pluck', 2.07, 1567.98, 0.035, 0.5, -0.3]] },
  ],
  final: { caption: 'Final *score.*', time: '9:30 PM', draw: finale, cards: ['∞', 'EFFORT', '∞'], stamp: 'EFFORT: *INFINITE*',
    cues: [['tick', 2.7, 0.06], ['tick', 3.6, 0.06]] },
  last: 'Effort: *infinite.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [TAU, PINK, clipboardCells]
