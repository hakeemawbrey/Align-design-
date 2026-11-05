// kdye01: DATE YOURSELF, "The Out-of-Office Date" (≈21.6 s vertical, star_advice post, lofi · F). Row: promo/films/month2/m16.md.
// Feeling: you can't switch off. The format engine is ./../dykit.js (shared by kdye01–kdye20), props in ./../props.js.
//   0.0–3.0   FRAME 0: ♑ Capricorn mid-leap away from its desk, the laptop mid-slam, papers mid-flight, a whip zoom out.
//             Hook: "Capricorn. Laptop *closed.* | Date starts *now.*"  The stamp slams at 1.3: SOLO DATE IDEA for a ♑ Capricorn.
//   3.0–8.4   STOP 1 the gallery: one painting for ten whole minutes (the counter ticks up); Pisces cries at the painting.
//   8.4–13.6  STOP 2 a warm pastry on a bench at golden hour; the "check email?" thought gets crossed out.
//  13.6–19.4  STOP 3 the away message: "OUT OF OFFICE: on a date with me." SENT. Pisces fountains.
//  19.5–end   last line "Resting is a skill. | *Practise it.*" holds, then a hard cut.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { makeDate } from '../dykit.js'
import {
  INK, BONE, GOLD, PINK, RED, MONO, INTER, R, box, room, park, bench, plate, mug, laptop, painting, tissues, phone, shadow, glow,
  sparkles, hearts, bubble, label, plateText, speedLines, drawBits, pop01, outK, r3,
} from '../props.js'

const D = 21.6
const S1 = [3.0, 8.4], S2 = [8.4, 13.6], S3 = [13.6, 19.4]

// ── frame 0: the office, mid-chaos
function opener(x, t, S) {
  room(x, { wall: '#2c3a5e', wall2: '#283556', floor: '#1e2440', floorY: 1220, win: { x: 640, y: 300, w: 340, h: 300, sky: 'night' } })
  // wall clock stuck at 7:58 pm
  box(x, 150, 480, 150, 150, BONE, { b: 8 }); R(x, INK, 222, 500, 8, 58); R(x, INK, 222, 550, 52, 8)
  // the desk
  box(x, 120, 1000, 640, 34, '#6b4428', { b: 7, hi: '#8a5a3a' }); R(x, INK, 150, 1034, 22, 186); R(x, INK, 708, 1034, 22, 186)
  // the laptop mid-slam (closes over the first 0.35 s)
  const shut = ease.inCubic(clamp(t / 0.35))
  laptop(x, 440, 1000, { open: lerp(0.55, 0, shut), screen: '#7fd0ff' })
  if (t > 0.33 && t < 0.7) { const k = 1 - prog(t, 0.33, 0.7); label(x, 'SLAM', 440, 900, { size: 64 * (1 + 0.3 * k), col: GOLD, font: INTER, weight: 800, alpha: k, rot: -0.1 }) }
  // papers mid-flight
  for (let i = 0; i < 9; i++) {
    const tt = t + 0.35, a = -1.4 + i * 0.35, v = 620 + (i * 73) % 300
    const px = 440 + Math.cos(a) * v * tt * 0.8, py = 940 + Math.sin(a) * v * tt * 0.7 + 380 * tt * tt
    x.save(); x.translate(px, py); x.rotate(tt * (3 + i % 4) + i); box(x, -38, -50, 76, 100, BONE, { b: 4 }); for (let j = 0; j < 4; j++) R(x, '#b8acd0', -26, -36 + j * 20, 52, 6); x.restore()
  }
  // Capricorn mid-leap toward the door
  const leap = clamp(t / 3)
  speedLines(x, t, { a: 0.55 * (1 - prog(t, 1.2, 2.2)), dir: 1 })
  shadow(x, 780, 1230, 240)
  S.hero(x, t, { x: lerp(760, 820, leap), y: 1000 - 40 * Math.sin(Math.min(1, t / 0.9) * Math.PI), s: 280, mood: t < 2.0 ? 'wide' : 'sparkle', look: [1, -0.3], hops: [2.2], squash: -0.08 })
  // Pisces at the door, already crying (a co-worker waving it off)
  S.pis(x, t, { x: 960, y: 1450, s: 150, mood: 'happy', look: [-1, -0.6] }, 2)
  bubble(x, t, 840, 1300, 2.2, 3.0, 'go go go!!', { size: 30, col: '#c9ecfb', tail: 0.5 })
}

// ── STOP 1: the gallery, one painting for ten whole minutes
function gallery(x, t, S) {
  const { u } = S
  room(x, { wall: '#e8dfcc', wall2: '#e0d5bf', floor: '#b79a78', floorY: 1220, stripes: false })
  R(x, '#cbbfa6', 0, 1180, 1080, 40)
  glow(x, 540, 640, 520, '255,240,200', 0.4)
  painting(x, 540, 640, 560, 380, { t, kind: 'sea' })
  plateText(x, 'Untitled (Calm)', 540, 900, { size: 26, bg: '#3b2c5e' })
  // the gallery bench
  box(x, 260, 1260, 560, 40, '#6b4428', { b: 6, hi: '#8a5a3a' }); R(x, INK, 300, 1300, 20, 120); R(x, INK, 760, 1300, 20, 120)
  shadow(x, 470, 1430, 260)
  const calm = prog(u, 1.2, 3.2)
  S.hero(x, t, { x: 470, y: 1180, s: 260, mood: calm > 0.5 ? 'sparkle' : 'neutral', look: [0.2, -1], hops: [S.a + 0.3] })
  // the minutes counter (a little gallery-guard clicker)
  const mins = 1 + Math.floor(9 * ease.inOutQuad(prog(u, 0.6, 4.6)))
  box(x, 690, 930, 300, 92, INK, { b: 6 })
  label(x, `MINUTES: ${String(mins).padStart(2, '0')}`, 840, 976, { size: 34, col: GOLD })
  if (mins >= 10) sparkles(x, t, 840, 976, S.a + 4.6, 8, 120, 1)
  // Pisces, deeply moved by the calm sea
  tissues(x, 920, 1360, 80)
  S.pis(x, t, { x: 880, y: 1240, s: 150, mood: 'sparkle', look: [-0.6, -1] }, u > 2.2 ? 3 : 2)
  bubble(x, t, 830, 1110, S.a + 2.4, S.b - 0.1, "it's so BLUE", { size: 28, col: '#c9ecfb', tail: 0.3 })
}

// ── STOP 2: a warm pastry on a bench, golden hour
function bench2(x, t, S) {
  const { u } = S
  park(x, t, { horizon: 1060, top: '#ff9f7a', bottom: '#ffd8a0', sun: 0.9, trees: [110, 990] })
  bench(x, 540, 1330, 600)
  shadow(x, 540, 1340, 520)
  // the pastry, steaming
  plate(x, 700, 1170, 170, { food: (c, px, py) => drawBits(c, ['..CCCC..', '.CHHHHC.', 'CHCHHCHC', 'CCCCCCCC'], { C: '#e0a050', H: '#ffd38a' }, px, py - 12, 10) })
  for (let i = 0; i < 3; i++) { const p = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, '#fff6ea', 680 + i * 20 + 8 * Math.sin(t * 3 + i), 1110 - p * 110, 10, 24); x.restore() }
  S.hero(x, t, { x: 420, y: 1150, s: 260, mood: u > 3.0 ? 'happy' : u > 1.2 && u < 2.6 ? 'squint' : 'sparkle', look: u > 1.2 && u < 2.6 ? [1, 0.5] : [0.6, 0.2], hops: [S.a + 0.3, S.a + 3.1] })
  // the "check email?" thought, crossed out
  const th = pop01(t, S.a + 1.2, 0.3, 2.2) * outK(t, [S.a + 4.3, S.a + 4.6])
  if (th > 0.01) {
    x.save(); x.translate(380, 800); x.scale(th, th)
    box(x, -230, -60, 460, 120, BONE, { b: 6 })
    drawBits(x, ['EEEEEEE', 'EWEEEWE', 'EEWEWEE', 'EEEWEEE', 'EEEEEEE'], { E: '#7fd0ff', W: BONE }, -160, 0, 9)
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('check email?', -110, 2)
    const cross = ease.outCubic(prog(t, S.a + 2.6, S.a + 2.9))
    if (cross > 0) { x.save(); x.rotate(-0.12); R(x, RED, -230, -8, 460 * cross, 16); x.restore() }
    x.restore()
    for (let i = 0; i < 3; i++) R(x, BONE, 400 - i * 20, 900 + i * 40, 18 - i * 4, 18 - i * 4)
  }
  if (u > 2.6 && u < 3.4) label(x, 'NOPE', 380, 680, { size: 54, col: RED, font: INTER, weight: 800, rot: 0.1, alpha: outK(t, [S.a + 3.2, S.a + 3.4]) })
  // Pisces jogs by, crying at the sunset
  const jx = lerp(1180, 820, ease.outCubic(prog(u, 0.2, 1.4)))
  S.pis(x, t, { x: jx, y: 980, s: 130, mood: 'sparkle', look: [0, -1], hops: [S.a + 0.5, S.a + 0.9, S.a + 1.3] }, 3)
}

// ── STOP 3: the away message
function away(x, t, S) {
  const { u } = S
  room(x, { wall: '#3b2c5e', wall2: '#34274f', floor: '#2a1f40', floorY: 1500, win: { x: 90, y: 300, w: 260, h: 280, sky: 'night' } })
  glow(x, 560, 880, 600, '255,214,150', 0.18)
  const msg = 'OUT OF OFFICE: on a date with me. back monday.'
  const typed = Math.floor(msg.length * clamp(prog(u, 0.5, 2.6)))
  const sent = u > 3.0
  phone(x, 560, 900, { s: 2.6, rot: -0.03, screen: '#14102a', draw: (c) => {
    c.font = `700 9px ${MONO}`; c.fillStyle = '#9fe6b0'; c.textAlign = 'center'; c.fillText('AUTO-REPLY', 0, -92)
    c.fillStyle = BONE; c.fillRect(-50, -82, 100, 1)
    const words = msg.slice(0, typed).split(' '), rows = ['']
    for (const w of words) { if ((rows[rows.length - 1] + ' ' + w).length > 15) rows.push(w); else rows[rows.length - 1] = (rows[rows.length - 1] + ' ' + w).trim() }
    c.font = `700 11px ${MONO}`; c.textAlign = 'left'
    rows.forEach((r, i) => { c.fillStyle = i === 0 && r.startsWith('OUT') ? GOLD : BONE; c.fillText(r, -48, -60 + i * 16) })
    if (!sent && Math.floor(t * 3) % 2) c.fillRect(-48 + Math.min(96, (rows[rows.length - 1].length) * 6.6), -70 + (rows.length - 1) * 16, 2, 12)
    c.fillStyle = sent ? '#5fd38a' : '#5a4e88'; c.fillRect(-40, 60, 80, 26)
    c.font = `800 11px ${INTER}`; c.fillStyle = INK; c.textAlign = 'center'; c.fillText(sent ? 'SENT ✓' : 'TURN ON', 0, 77)
  } })
  if (sent) sparkles(x, t, 560, 1110, S.a + 3.0, 12, 180, 2, [GOLD, '#5fd38a', BONE])
  S.hero(x, t, { x: 210, y: 1360, s: 230, mood: sent ? 'happy' : 'neutral', look: [1, -0.6], hops: [S.a + 3.05] })
  tissues(x, 980, 1520, 80)
  S.pis(x, t, { x: 900, y: 1380, s: 160, mood: sent ? 'happy' : 'sparkle', look: [-1, -0.6], hops: [S.a + 3.1] }, sent ? 3 : 2)
  hearts(x, t, S.a + 3.1, 900, 1250, { n: 5 })
}

const EP = makeDate({
  id: 'kdye01', sign: 'capricorn', name: 'Capricorn', D, ending: 'cut',
  hook: 'Capricorn. Laptop *closed.* | Date starts *now.*', hookSize: 104, hookAccent: '#ffcf6b',
  fx: [{ kind: 'whip', o: { at: 0.12, len: 0.5, from: 1.5 } }],
  opener,
  stops: [
    { a: S1[0], b: S1[1], sticker: 'one painting, *ten whole minutes*', draw: gallery,
      cues: [['pop', 0.6, 880, 0.03, 0.3], ['tick', 1.5, 0.03], ['tick', 2.5, 0.03], ['tick', 3.5, 0.03], ['bell', 4.6, 1760, 0.03, 1.0, 0.3], ['pluck', 2.4, 659.25, 0.03, 0.5, 0.4]] },
    { a: S2[0], b: S2[1], sticker: 'a warm *pastry,* no inbox', draw: bench2,
      cues: [['whoosh', 0.02, 0.4, 0.035], ['pop', 1.2, 739.99, 0.035, -0.3], ['tick', 2.6, 0.06], ['pop', 2.75, 440, 0.05, -0.2]] },
    { a: S3[0], b: S3[1], sticker: 'the *away message*', draw: away,
      cues: [['whoosh', 0.02, 0.4, 0.035], ...Array.from({ length: 14 }, (_, i) => ['tick', r3(0.5 + i * 0.15), 0.02]), ['pop', 3.0, 1318.51, 0.05, 0], ['glitter', 3.0, 3.5], ['pluck', 3.1, 1174.66, 0.04, 0.5, 0.3]] },
  ],
  lines: [
    { t: 3.7, who: 'stars', text: 'no meetings. just *one* painting.' },
    { t: 6.0, who: 'stars', text: "take your time. it's not *billable.*" },
    { t: 9.2, who: 'hero', text: 'is this… *allowed?*' },
    { t: 11.2, who: 'stars', text: "it's *required.*" },
    { t: 14.4, who: 'stars', text: 'now set the *away message.*' },
    { t: 17.2, who: 'hero', text: 'busy. with *me.*' },
  ],
  boxes: [[3.5, 8.25, [0, 1]], [9.0, 13.45, [2, 3]], [14.2, 19.25, [4, 5]]],
  last: { t: 19.6, text: 'Resting is a skill. | *Practise it.*', top: 300, size: 96 },
  cues: [
    ['boom', 0.33, 0.18], ['tick', 0.34, 0.07],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, mug, glow]
