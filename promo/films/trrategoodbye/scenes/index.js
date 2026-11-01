// trrategoodbye: RATING MY DATE, HONESTLY, "Rating the goodbye at my door." (30 s vertical, Star Talk Trends §14,
// music: funk · Dm). Story 0–25.5, then the shared end card. The format look lives in ./ratekit.js (identical in all five).
//   0.0–2.6    hook: "Rating the goodbye | at my *door.*" ♍ Virgo, clipboard in hand: "door goodbye. full review."
//              THE STARS take the judges' desk; Pisces takes the fourth seat (tissues, soggy heart card).
//   2.6–8.0    1 · Goodbye *#1.*  At the door: "ok, bye!" "bye!"… "oh, also—" "wait, and—". The porch light's timer
//              clicks off; they keep talking in the dark (just eyes). Cards: 8 · STILL TALKING · 8.5.
//   8.0–13.4   2 · Goodbye *#2.*  A hug; ♌ Leo strides off… the wrong way, comes back past the door ("wrong way!"),
//              and goes the wrong way again. Cards: 9 · WRONG WAY · 9.5.
//  13.4        card cut.
//  13.4–19.2   3 · Goodbye *#3.* (the twist)  The wave: from the gate, from the corner (smaller), then a tiny dot on the
//              hill, still waving, circled with a magnifier. Virgo waves back every time. Cards: 11 · ONE WAVE TOO MANY
//              · ADORABLE.
//  19.2–25.5   Final *score.*  Virgo leans on the closed door, heart-eyed; KNOCK KNOCK; Leo is back: "forgot to say…
//              tomorrow?" The meter shatters; the stamp: "AGAIN *TOMORROW*". THE STARS: "Again. *Tomorrow.*"
import { makeRate, R, box, room, nightWindow, shadow, bubble, label, sparkles, hearts, drawPixelStar,
  pop01, outK, prog, lerp, ease, INK, BONE, GOLD, INTER, MONO, CLIP, FLOOR } from './ratekit.js'

const GND = FLOOR + 40

// the porch at night: the house wall on the left with the door, a path, a fence, a hill on the horizon
function porch(x, t, light = 1) {
  R(x, '#141036', CLIP.x, CLIP.y, CLIP.w, CLIP.h)
  for (let i = 0; i < 14; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 1.7 + i * 2.1); R(x, `rgba(255,241,200,${0.3 + 0.6 * tw})`, CLIP.x + 330 + ((i * 67) % 480), CLIP.y + 40 + ((i * 41) % 220), 5, 5) }
  // hill + far road
  x.fillStyle = '#231c4a'; x.beginPath(); x.ellipse(820, 700, 360, 70, 0, Math.PI, 0); x.fill(); R(x, '#231c4a', 460, 700, 440, 300)
  R(x, '#2e2660', 330, 820, 570, 400)
  // fence
  for (let i = 0; i < 8; i++) box(x, 600 + i * 40, 800, 22, 70, '#8c86a8', { b: 4 })
  R(x, INK, 590, 820, 320, 10)
  // path
  x.fillStyle = '#4a3f7a'; x.beginPath(); x.moveTo(300, GND + 60); x.lineTo(560, GND + 60); x.lineTo(700, 860); x.lineTo(640, 860); x.closePath(); x.fill()
  // house wall + door frame
  R(x, '#3b2e66', CLIP.x, CLIP.y, 290, CLIP.h)
  for (let j = 0; j < 12; j++) R(x, 'rgba(6,4,18,0.25)', CLIP.x, CLIP.y + j * 56, 290, 4)
  R(x, INK, CLIP.x + 280, CLIP.y, 12, CLIP.h)
  box(x, 110, 620, 160, GND - 620, '#1a1238', { b: 8 })
  // porch light
  box(x, 214, 560, 40, 46, light > 0.5 ? '#fff1c8' : '#5a5470', { b: 5 })
  if (light > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(234, 590, 10, 234, 590, 420); g.addColorStop(0, `rgba(255,236,180,${0.3 * light})`); g.addColorStop(1, 'rgba(255,236,180,0)'); x.fillStyle = g; x.fillRect(CLIP.x, CLIP.y, CLIP.w, CLIP.h); x.restore() }
  R(x, '#5a4a8a', CLIP.x, GND - 4, 360, 16)
}
function door(x, open) {
  const w = 144 * (1 - 0.85 * open)
  box(x, 118, 628, w, GND - 636, '#8a5a3a', { b: 4, hi: '#a87048' })
  if (w > 40) R(x, GOLD, 118 + w - 26, 780, 12, 12)
}
const dark = (x, a) => { if (a <= 0) return; x.save(); x.globalAlpha = a; R(x, '#05030e', CLIP.x, CLIP.y, CLIP.w, CLIP.h); x.restore() }

function goodbye1(x, t, S) {
  const { u, t0, hero, date } = S
  const off = prog(u, 1.75, 1.8)
  porch(x, t, 1 - off)
  door(x, 1)
  shadow(x, 250, GND, 170); shadow(x, 470, GND, 190)
  const eyesOnly = off > 0.5
  hero(x, t, { x: 250, y: 880, s: 170, mood: u < 1.8 ? 'happy' : 'wide', look: [1, 0], hops: [t0 + 0.3, t0 + 1.05, t0 + 2.4] })
  date(x, t, { x: 470, y: 860, s: 200, mood: u < 1.8 ? 'happy' : 'sparkle', look: [-1, 0], hops: [t0 + 0.45, t0 + 1.3, t0 + 2.6] })
  dark(x, 0.82 * off)
  if (eyesOnly) for (const [ex, ey] of [[238, 860], [262, 860], [456, 838], [484, 838]]) R(x, '#fffbea', ex - 5, ey - 6, 10, 12)
  bubble(x, t, 230, 690, t0 + 0.3, t0 + 0.9, 'ok, bye!', { size: 32, tail: 0.1 })
  bubble(x, t, 500, 660, t0 + 0.45, t0 + 1.0, 'bye!', { size: 32, tail: -0.1 })
  bubble(x, t, 280, 650, t0 + 1.05, t0 + 1.75, 'oh, also—', { size: 32, tail: 0 })
  bubble(x, t, 520, 620, t0 + 1.3, t0 + 1.8, 'wait, and—', { size: 32, tail: -0.1 })
  if (off > 0) label(x, '*click*', 234, 520, { size: 30, col: BONE, alpha: outK(t, [t0 + 2.3, t0 + 2.6]) })
  bubble(x, t, 380, 640, t0 + 2.3, t0 + 3.5, '…and THEN—', { size: 34, col: '#c9c3dc', tail: 0 })
}

function goodbye2(x, t, S) {
  const { u, t0, hero, date } = S
  porch(x, t, 1)
  door(x, 1)
  // hug (0.2–0.8), then off to the left (the wrong way), back past, then the wrong way again
  let lx = 400
  if (u > 0.85) lx = lerp(400, 40, ease.inOutCubic(prog(u, 0.85, 1.3)))
  if (u > 1.4) lx = lerp(40, 900, ease.inOutCubic(prog(u, 1.4, 2.0)))
  if (u > 2.1) lx = lerp(900, 1000, ease.inCubic(prog(u, 2.1, 2.4)))
  if (u > 2.45) lx = lerp(1000, 680, ease.outCubic(prog(u, 2.45, 2.9)))
  const hug = Math.sin(Math.PI * prog(u, 0.15, 0.85))
  shadow(x, 250 + hug * 40, GND, 170)
  hero(x, t, { x: 250 + hug * 40, y: 880, s: 170, mood: u < 0.85 ? 'heart' : u < 1.4 ? 'wide' : 'happy', look: [lx > 250 ? 1 : -1, 0], hops: [t0 + 0.2, t0 + 1.45] })
  const walking = (u > 0.85 && u < 2.0) || (u > 2.1 && u < 2.9)
  date(x, t, { x: lx, y: 860 + (walking ? -6 * Math.abs(Math.sin(t * 12)) : 0), s: 200, mood: u < 0.85 ? 'heart' : u < 1.4 ? 'happy' : u < 2.1 ? 'squint' : 'happy', look: [u > 1.4 && u < 2.1 ? 1 : -1, 0], hops: [t0 + 0.2, t0 + 1.35] })
  bubble(x, t, 330, 650, t0 + 1.0, t0 + 1.4, 'other way…', { size: 30, tail: -0.4 })
  bubble(x, t, 500, 630, t0 + 1.55, t0 + 2.2, 'wrong way!', { size: 36, col: '#ffe0ea', tail: 0 })
  bubble(x, t, 640, 620, t0 + 2.55, t0 + 3.8, 'ok THIS way.', { size: 34, tail: 0.1 })
}

function goodbye3(x, t, S) {
  const { u, t0, hero, date } = S
  porch(x, t, 1)
  door(x, 1)
  shadow(x, 250, GND, 170)
  const waves = [0.25, 1.15, 2.0].map(v => t0 + v)
  hero(x, t, { x: 250, y: 880, s: 170, mood: u < 2.0 ? 'happy' : 'heart', look: [1, -0.3], hops: waves.map(w => w + 0.15) })
  // waving hand pixel on Virgo
  const wv = Math.sin(t * 14) * 10
  R(x, INK, 320 + wv - 4, 800 - 4, 26, 26); R(x, '#ef5c94', 320 + wv, 800, 18, 18)
  const spots = [{ x: 600, y: 860, s: 200 }, { x: 740, y: 770, s: 110 }, { x: 820, y: 690, s: 34 }]
  const idx = u < 1.1 ? 0 : u < 1.95 ? 1 : 2
  const P = spots[idx], k = pop01(t, waves[idx] - 0.15, 0.3, 2)
  date(x, t, { x: P.x, y: P.y, s: P.s, pop: k, mood: 'happy', look: [-1, 0], hops: [waves[idx], waves[idx] + 0.45] })
  const hw = Math.sin(t * 14) * P.s * 0.06
  R(x, INK, P.x + P.s * 0.42 + hw - 3, P.y - P.s * 0.4 - 3, P.s * 0.12 + 6, P.s * 0.12 + 6); R(x, '#f39a3a', P.x + P.s * 0.42 + hw, P.y - P.s * 0.4, P.s * 0.12, P.s * 0.12)
  if (idx === 2) {
    const mk = pop01(t, t0 + 2.2, 0.3, 2.4)
    if (mk > 0.01) {
      x.save(); x.translate(820, 687); x.scale(mk, mk)
      x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.stroke()
      x.strokeStyle = GOLD; x.lineWidth = 7; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.stroke()
      x.save(); x.rotate(0.8); R(x, INK, 52, -10, 80, 20); R(x, '#a07850', 56, -5, 72, 10); x.restore()
      x.restore()
      label(x, 'still waving', 700, 600, { size: 28, col: GOLD, alpha: mk })
    }
  }
  bubble(x, t, 600, 640, t0 + 0.3, t0 + 1.05, 'bye!!', { size: 36, tail: 0 })
  bubble(x, t, 720, 620, t0 + 1.2, t0 + 1.95, 'bye!', { size: 30, tail: 0.2 })
}

function finale(x, t, S) {
  const { u, t0, ok, hero, date } = S
  // inside now: the hallway side of the same door
  room(x, '#3a2a5e', '#2a1f45', { stripe: '#5a4a8a' })
  nightWindow(x, 780, 560, 180, 150, t)
  const open = ease.outCubic(prog(u, 1.5, 1.8))
  const DX = 400, DW = 200, DT = 580
  box(x, DX - 14, DT - 14, DW + 28, GND - DT + 14, '#6b4a2f', { b: 6 })
  R(x, '#141036', DX, DT, DW, GND - DT)
  for (let i = 0; i < 5; i++) R(x, '#fff1c8', DX + 20 + i * 37, DT + 30 + (i % 2) * 40, 5, 5)
  if (open > 0.05) date(x, t, { x: DX + DW / 2, y: 860, s: 180, pop: ok, mood: 'happy', look: [-1, 0], hops: [t0 + 1.8, 21.4, 22.8] })
  const w = DW * (1 - 0.85 * open)
  box(x, DX + DW - w, DT, w, GND - DT, '#8a5a3a', { b: 4, hi: '#a87048' })
  if (w > 50) R(x, GOLD, DX + DW - w + 18, 790, 12, 12)
  if (open < 0.5) {
    x.save(); x.translate(DX - 30, GND); x.rotate(0.14); x.translate(-(DX - 30), -GND)
    hero(x, t, { x: DX - 70, y: 880, s: 170, pop: ok, mood: 'heart', look: [-1, -0.4], hops: [t0 + 0.4] })
    x.restore()
    hearts(x, t, t0 + 0.3, DX - 80, 760, { n: 4 })
    ;[0.85, 1.15].forEach(v => { const c = t0 + v, k = pop01(t, c, 0.2, 3) * outK(t, [c + 0.45, c + 0.6]); if (k > 0.01) label(x, 'KNOCK', DX + DW / 2 + (v > 1 ? 40 : -40), 640 - (v > 1 ? 50 : 0), { size: 44 * k, col: GOLD, font: INTER, weight: 800, rot: -0.1 }) })
  } else {
    shadow(x, 250, GND, 170)
    hero(x, t, { x: 250, y: 880, s: 170, pop: ok, mood: t < 21.3 ? 'wide' : 'heart', look: [1, 0], hops: [t0 + 1.85, 21.35, 21.75, 23.2] })
  }
  bubble(x, t, 560, 520, t0 + 1.9, t0 + 6.0, 'forgot to say… tomorrow?', { size: 32, col: '#ffe0ea', tail: -0.3 })
  hearts(x, t, 21.4, 380, 720, { n: 7, spread: 300 })
}

const EP = makeRate({
  id: 'trrategoodbye', hero: 'virgo', heroName: 'VIRGO', date: 'leo', accent: '#ff86b4', heroInk: '#ff9ac0',
  title: 'Rating the goodbye | at my *door.*',
  hookTime: '11:30 PM', hookSay: 'door goodbye. full review.',
  moments: [
    { caption: 'Goodbye *#1.*', time: '10:58 PM', draw: goodbye1, cards: ['8', 'STILL|TALKING', '8.5'], level: 8,
      line: 'said bye. then kept talking in the *dark.*',
      cues: [['pop', 0.3, 880, 0.03, -0.3], ['pop', 0.45, 987.77, 0.03, 0.3], ['pop', 1.05, 1174.66, 0.03, -0.3], ['pop', 1.3, 1318.51, 0.03, 0.3],
        ['tick', 1.75, 0.08], ['tick', 1.79, 0.05], ['pop', 2.3, 739.99, 0.03, 0]] },
    { caption: 'Goodbye *#2.*', time: '11:10 PM', draw: goodbye2, cards: ['9', 'WRONG|WAY', '9.5'], level: 9.5,
      line: 'they left the wrong way. *twice.*',
      cues: [['pluck', 0.3, 1174.66, 0.03, 0.4, 0], ['whoosh', 0.85, 0.4, 0.03], ['pop', 1.0, 659.25, 0.03, -0.4], ['whoosh', 1.4, 0.5, 0.035], ['pop', 1.55, 1318.51, 0.04, 0],
        ['whoosh', 2.1, 0.3, 0.025], ['pop', 2.55, 987.77, 0.035, 0.3]] },
    { caption: 'Goodbye *#3.*', time: '11:20 PM', draw: goodbye3, cards: ['11', 'ONE WAVE|TOO MANY', 'ADORABLE'], level: 11,
      line: 'one wave too many. I waved back. *obviously.*',
      cues: [['pop', 0.25, 1174.66, 0.04, 0.3], ['pop', 1.15, 987.77, 0.03, 0.5], ['pop', 2.0, 1567.98, 0.02, 0.7], ['whoosh', 2.2, 0.3, 0.02], ['bell', 2.25, 2349.32, 0.02, 0.8, 0.6]] },
  ],
  final: { caption: 'Final *score.*', time: '11:30 PM', draw: finale, cards: ['∞', 'AGAIN', '∞'], stamp: 'AGAIN *TOMORROW*',
    cues: [['tom', 0.85, 140, { gain: 0.22, decay: 0.15 }], ['tom', 1.15, 140, { gain: 0.24, decay: 0.15 }], ['whoosh', 1.5, 0.3, 0.03], ['pop', 1.9, 1318.51, 0.04, 0]] },
  last: 'Again. *Tomorrow.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, drawPixelStar, MONO, dark]
