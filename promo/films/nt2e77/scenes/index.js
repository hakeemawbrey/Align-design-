// nt2e77: LITTLE TREAT, "Little Treat: Cancer went out" (18 s vertical, Star Talk Trends Vol. 2 ep 77,
// promo/films/next30/b14.md; music: chiptune · D). Story 0–15.6, then the shared short end card. Format: ../../nt2e76/scenes/treat.js.
//   0.0–2.1    hook (frame 0): "Little treat for | *leaving the house.*"  Cancer in a coat at the open door, one foot out;
//              the soup pot behind it steams goodbye.
//   2.1–4.85   WIN 1 "went *out* instead of staying in."  Out into the night; Leo waiting: "you came!" → a warm bun.
//   4.85–7.6   WIN 2 "didn't cry at the *movie.*"  Two seats, a glowing screen; Cancer holds it together ("I'm fine.") while
//              Pisces, in the next seat, cries for both of them. → a gold-star sticker.
//   7.6–10.95  WIN 3 (the twist) "said what I *need,* out loud."  "I need us to text when plans change." Leo: "deal.
//              thank you for telling me." → a whole cake.
//   11.35      the stamp "TREAT *EARNED.*"  Pisces holds up a 10/10, fountaining.
//   11.95      THE STARS: "Needs said, *cake* earned."
import { makeTreat, treatIcon, FLOOR, R, box, bubble, label, shadow, sparkles, hearts, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, T } from '../../nt2e76/scenes/treat.js'
import { door } from '../../nt2e61/scenes/house.js'

function coat(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -70, -10, 140, 90, '#c8703a', { b: 5 }); R(x, INK, -4, -10, 8, 90); R(x, GOLD, -16, 14, 8, 8); R(x, GOLD, -16, 44, 8, 8); x.restore() }
function pot(x, t, cx, cy) {
  box(x, cx - 80, cy - 60, 160, 100, '#8a8aa0', { b: 6, hi: '#b8b8c8' }); R(x, INK, cx - 110, cy - 40, 30, 14); R(x, INK, cx + 80, cy - 40, 30, 14)
  for (let i = 0; i < 4; i++) { const ph = (t * 0.8 + i / 4) % 1; x.save(); x.globalAlpha = (1 - ph) * 0.7; R(x, BONE, cx - 40 + i * 26 + 16 * Math.sin(t * 3 + i), cy - 90 - ph * 120, 12, 26); x.restore() }
}

const tells = [
  { caption: 'went *out* instead of staying in.', treat: 'bun',
    draw(x, t, S) {
      const { u, hero, date } = S
      R(x, '#141a3e', 0, 0, 1080, FLOOR); for (let i = 0; i < 24; i++) R(x, `rgba(255,247,220,${0.3 + 0.4 * Math.abs(Math.sin(t * 2 + i))})`, (i * 151) % 1080, 140 + (i * 223) % 700, 5, 5)
      R(x, '#3a4a3e', 0, FLOOR, 1080, 740); R(x, INK, 0, FLOOR, 1080, 8)
      door(x, 200, FLOOR, { open: 1, col: '#7a4a8a', h: 420, w: 200 })
      const step = ease.outCubic(prog(u, 0.2, 0.9))
      shadow(x, lerp(220, 430, step), FLOOR + 30, 190); shadow(x, 760, FLOOR + 30, 190)
      hero(x, t, { x: lerp(220, 430, step), y: 1020, s: 210, mood: u > 0.9 ? 'happy' : 'wide', look: [1, 0], hops: [S.t0 + 0.3, S.t0 + 0.6, S.t0 + 0.9] })
      coat(x, lerp(220, 430, step), 1080, 0.9)
      date(x, t, { x: 760, y: 1010, s: 210, mood: u > 0.9 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.0, S.t0 + 1.3] })
      bubble(x, t, 760, 780, S.t0 + 1.0, S.t1, 'you came!', { size: 38, tail: 0 })
    },
    treatPos: [560, 560], pis: { x: 960, y: 1660 },
    cues: [['tick', 0.3, 0.04], ['tick', 0.6, 0.04], ['tick', 0.9, 0.04], ['pop', 1.0, 1318.51, 0.04, 0.3]] },
  { caption: 'didn’t cry at the *movie.*', treat: 'sticker',
    draw(x, t, S) {
      const { u, hero, pisces } = S
      R(x, '#0c0a1e', 0, 0, 1080, 1920)
      // the screen glow
      box(x, 90, 440, 900, 380, '#cfd8ff', { b: 8 }); x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createLinearGradient(0, 820, 0, 1400); g.addColorStop(0, 'rgba(180,200,255,0.25)'); g.addColorStop(1, 'rgba(180,200,255,0)'); x.fillStyle = g; x.fillRect(0, 820, 1080, 600); x.restore()
      drawSunset(x, t)
      // seats
      for (const sx of [330, 750]) { box(x, sx - 150, 1120, 300, 120, '#8a2a3a', { b: 6 }); box(x, sx - 150, 980, 300, 150, '#a8344a', { b: 6 }) }
      hero(x, t, { x: 330, y: 980, s: 210, mood: 'squint', look: [0, -0.8], squash: 0.02 * Math.sin(t * 30), hops: [S.t0 + 1.0] })
      pisces(x, t, { x: 750, y: 980, s: 210, hops: [S.t0 + 0.4, S.t0 + 0.8, S.t0 + 1.2, S.t0 + 1.6] }, 3, 'sparkle', [0, -0.8])
      bubble(x, t, 330, 760, S.t0 + 0.7, S.t1, 'I’m fine. totally fine.', { size: 30, tail: 0 })
    },
    treatPos: [540, 1260 - 130], pis: { none: true },
    cues: [['pop', 0.7, 880, 0.03, -0.3], ['pop', 0.4, 659.25, 0.02, 0.4], ['pop', 0.8, 622.25, 0.02, 0.4]] },
  { caption: 'said what I *need,* out loud.', treat: 'cake', treatAt: 2.1,
    draw(x, t, S) {
      const { u, hero, date } = S
      shadow(x, 300, FLOOR + 30, 200); shadow(x, 780, FLOOR + 30, 200)
      hero(x, t, { x: 300, y: 1000, s: 230, mood: u < 0.4 ? 'neutral' : 'sparkle', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 0.9] })
      bubble(x, t, 380, 760, S.t0 + 0.4, S.t0 + 1.9, 'I need us to text when plans change.', { size: 28, tail: -0.4 })
      date(x, t, { x: 780, y: 1000, s: 220, mood: u > 1.3 ? 'happy' : 'neutral', look: [-1, 0], hops: [S.t0 + 1.95] })
      bubble(x, t, 640, 760, S.t0 + 1.95, S.t1, 'deal. thank you for telling me.', { size: 28, tail: 0.5 })
    },
    treatPos: [540, 560], pis: { x: 960, y: 1660 },
    cues: [['pop', 0.4, 1174.66, 0.035, -0.3], ['pop', 1.95, 987.77, 0.035, 0.3]] },
]

// a soft pixel sunset playing on the movie screen
function drawSunset(x, t) {
  const g = x.createLinearGradient(0, 440, 0, 820); g.addColorStop(0, '#ff9a7a'); g.addColorStop(1, '#ffd27a'); x.fillStyle = g; x.fillRect(90, 440, 900, 380)
  x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(540, 760, 90, Math.PI, 0); x.fill()
  R(x, '#5a3a6a', 90, 760, 900, 60)
  for (let i = 0; i < 2; i++) { const px = 420 + i * 200 + 10 * Math.sin(t + i); x.fillStyle = '#3a2a4a'; x.beginPath(); x.moveTo(px, 760); x.lineTo(px + 30, 700); x.lineTo(px + 60, 760); x.fill() }
}

const EP = makeTreat({
  id: 'nt2e77', sign: 'cancer', name: 'Cancer', date: 'leo', deep: '#2f7fb0', accent: '#ffd23f',
  hookText: 'Little treat for | *leaving the house.*',
  hook(x, t, S) {
    pot(x, t, 820, 900)
    door(x, 420, FLOOR, { open: 1, col: '#7a4a8a', h: 470, w: 240 })
    shadow(x, 470, FLOOR + 30, 220)
    S.hero(x, t, { x: 470, y: 1000, s: 260, mood: 'wide', look: [1, 0], squash: -0.04, hops: [0.2, 0.9, 1.6] })
    coat(x, 470, 1070, 1.05)
  },
  hookCues: [['tick', 0.2, 0.04], ['tick', 0.9, 0.04]],
  tells,
  finale(x, t, S) {
    const { hero, date, ok, HERO_FIN_HOPS } = S
    hero(x, t, { x: 420, y: 700, s: 230, pop: ok, mood: 'sparkle', look: [1, 0], hops: HERO_FIN_HOPS })
    date(x, t, { x: 680, y: 710, s: 210, pop: ok, mood: 'happy', look: [-1, 0], hops: [T.stamp + 0.1, T.last + 1.7] })
  },
  last: 'Needs said, *cake* earned.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [treatIcon, label, sparkles, hearts, pop01, outK, clamp, PINK, RED, INTER]
