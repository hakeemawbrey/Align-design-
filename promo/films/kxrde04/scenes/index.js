// kxrde04: RATE MY DATE IDEA: EXTENDED, "Capricorn plans half a date" (75 s vertical, star_talk post, jazzy · Bb).
// The format lives in ../../kxrde01/rdkit.js. No end card, no card transition: hard cut on the last line.
// ♑ Capricorn's idea: we each plan half the date, no peeking. ♐ Sagittarius plans the other half.
//   0.0–3.0    HOOK: split screen mid-slam: Capricorn with a clipboard | Sag mid-cartwheel, a NO PEEKING tape ripping.
//   3–13 THE PLAN (two sealed envelopes) · 13–23 HALF ONE (Capricorn's: a greenhouse walk with a printed map) ·
//   23–33 HALF TWO (Sag's: a beginners' street-dance class) · 33–43 BUT… (Capricorn freezes in the dance circle; record
//   scratch) · 43–53 THE SAVE (Sag dances badly on purpose until Capricorn laughs and moves) · 53–63 THE MOMENT (both
//   envelopes say the same thing: "planned for you") · 63–75 RATING 9/10 *two halves, one date* · Pisces 10/10 ·
//   THE STARS · one tiny Capricorn dance move · "Half yours. Half mine. | *All* ours."
import { makeRD, R, box, shadow, glow, hearts, sparkles, floor, card, scrawl, prog, lerp, clamp, ease, pop01, outK, drawStarChar, signStar, INK, BONE, GOLD, PINK, RED, CREAM, INTER } from '../../kxrde01/rdkit.js'

const GROUND = 1300
function greenhouse(x, t) {
  R(x, '#cfeee0', 0, 300, 1080, 1000)
  for (let i = 0; i < 7; i++) R(x, '#e6f6ee', i * 160, 300, 8, 760)
  for (let j = 0; j < 4; j++) R(x, '#e6f6ee', 0, 360 + j * 180, 1080, 8)
  for (let i = 0; i < 8; i++) { const px = 60 + i * 135, h = 160 + (i * 53) % 140, sw = 0.05 * Math.sin(t * 1.3 + i)
    x.save(); x.translate(px, 1000); x.rotate(sw); for (const [dx, a] of [[-14, -0.5], [14, 0.5], [0, 0]]) { x.save(); x.rotate(a); R(x, INK, dx - 12, -h - 6, 24, h + 6); R(x, i % 2 ? '#4fae6a' : '#3f9e5a', dx - 8, -h, 16, h); x.restore() } x.restore()
    box(x, px - 40, 990, 80, 60, '#c96f4a', { b: 5 }); box(x, px - 26, 1060, 52, 30, CREAM, { b: 3 }) }
  floor(x, 1090, '#b8a890', '#d0c0a8'); R(x, '#a89880', 0, GROUND + 100, 1080, 600)
}
function studio(x, t, { mirror = true } = {}) {
  R(x, '#2a2a4a', 0, 300, 1080, 1000)
  if (mirror) { box(x, 60, 380, 960, 560, '#3a4a7a', { b: 8 }); for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.1)', 120 + i * 230, 400, 40, 520) }
  R(x, INK, 0, 940, 1080, 14); R(x, '#c9c9d9', 0, 944, 1080, 6)          // the barre
  for (let i = 0; i < 3; i++) glow(x, 200 + i * 340, 320, 220, ['255,143,177', '127,208,255', '242,199,92'][i], 0.22 + 0.08 * Math.sin(t * 4 + i))
  floor(x, 1060, '#8a6a4a', '#a8865e'); for (let i = 0; i < 9; i++) R(x, '#7a5a3a', i * 130, 1060, 6, 900)
}
function envelope(x, cx, cy, rot = 0, s = 1, open = 0, note = null) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -70, -46, 140, 92, CREAM, { b: 5 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -46); x.lineTo(0, open > 0 ? -46 - 70 * open : 8); x.lineTo(70, -46); x.closePath(); x.fill()
  x.fillStyle = '#e9dcc6'; x.beginPath(); x.moveTo(-64, -42); x.lineTo(0, open > 0 ? -42 - 64 * open : 2); x.lineTo(64, -42); x.closePath(); x.fill()
  R(x, RED, -10, -10, 20, 20)
  x.restore()
  if (note && open > 0.6) { const k = pop01(clamp(open), 0.6, 0.3, 2.4); x.save(); x.translate(cx, cy - 150); x.scale(k, k); box(x, -170, -56, 340, 112, BONE, { b: 5 }); scrawl(x, note, 0, 0, { size: 40, col: '#2a2a6a' }); x.restore() }
}
function clipboard(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -40, -54, 80, 108, '#8a5a3a', { b: 4 }); R(x, CREAM, -32, -42, 64, 88); for (let i = 0; i < 5; i++) R(x, '#7a8aa8', -24, -32 + i * 16, 48 - (i % 2) * 14, 5); R(x, '#c9c9d9', -16, -60, 32, 12); x.restore() }
function circle(x, t, k = 1) {
  ['leo', 'aries', 'gemini', 'aquarius'].forEach((id, i) => { const S = signStar(id); drawStarChar(x, [110, 260, 820, 970][i], 1210, 130, t, { color: S.color, mood: 'happy', look: [i < 2 ? 1 : -1, 0], seed: 20 + i, pop: k, hops: [t - ((t * 2 + i * 0.25) % 1) / 2] }) })
}

const EP = makeRD({
  id: 'kxrde04', sign: 'capricorn', date: 'sagittarius', accent: GOLD, deep: '#2a6ab0',
  idea: 'We each plan *half.* No peeking.',
  hook(x, t, S) {
    // the split screen: greenhouse | studio, a ripping NO PEEKING tape down the middle
    x.save(); x.beginPath(); x.rect(0, 0, 540, 1920); x.clip(); greenhouse(x, t); x.restore()
    x.save(); x.beginPath(); x.rect(540, 0, 540, 1920); x.clip(); studio(x, t, { mirror: false }); x.restore()
    R(x, INK, 532, 300, 16, 1620)
    S.hero(x, t, { x: 280, y: 1110, s: 240, mood: 'squint', look: [1, 0], hops: [0.2] }); clipboard(x, 390, 1110, 0.2)
    S.date(x, t, { x: 800, y: 1060, s: 230, mood: 'happy', look: [-1, 0], rot: (t + 0.4) * 5 })
    x.save(); x.translate(540, 820); x.rotate(-0.5)
    const rip = clamp((t + 0.4) / 1.6)
    box(x, -360, -34, 360 - 40 * rip, 68, '#ffd36b', { b: 5 }); box(x, 40 * rip, -34, 360, 68, '#ffd36b', { b: 5 })
    x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NO PEEK', -180, 2); x.fillText('ING', 180, 2)
    x.restore()
    S.pisces(x, t, { x: 960, y: 1210, s: 120, tears: 2, mood: 'sparkle' })
  },
  chapters: [
    { title: 'THE PLAN', caption: 'Two envelopes. *No peeking.*', cuts: [5.2],
      draw(x, t, S) {
        studio(x, t)
        shadow(x, 330, GROUND - 200, 220); shadow(x, 720, GROUND - 200, 200)
        const peek = S.u > 5.2 && S.u < 7.4
        S.hero(x, t, { x: 330, y: 960, s: 240, mood: peek ? 'squint' : 'happy', look: [1, 0], hops: [S.t0 + 1.0, S.t0 + 7.4] })
        S.date(x, t, { x: peek ? 560 : 720, y: 970, s: 220, mood: peek ? 'wink' : 'sparkle', look: [-1, 0], hops: [S.t0 + 3.6, S.t0 + 5.2] })
        envelope(x, 440, 1040, -0.2); envelope(x, peek ? 470 : 620, peek ? 980 : 1050, peek ? -0.6 : 0.2)
      },
      bubbles: [[1.0, 3.4, 'you plan half. i plan half.', { x: 360, y: 760 }], [3.6, 5.0, 'deal!!', { x: 720, y: 760 }], [5.4, 7.2, 'just a tiny peek—', { x: 600, y: 760 }], [7.4, 9.2, 'no.', { x: 340, y: 760 }]],
      cues: [['whoosh', 5.2, 0.4, 0.03], ['whoosh', 7.4, 0.3, 0.04], ['tick', 7.45, 0.06]] },
    { title: 'HALF ONE', caption: 'Capricorn’s half: *the greenhouse.* With a map.', cuts: [4.6],
      draw(x, t, S) {
        greenhouse(x, t)
        const walk = ease.inOutCubic(prog(S.u, 0, 4))
        shadow(x, lerp(200, 380, walk), GROUND - 100, 200); shadow(x, lerp(420, 700, walk), GROUND - 100, 200)
        S.hero(x, t, { x: lerp(200, 380, walk), y: 1080, s: 220, mood: 'happy', look: [1, 0] })
        x.save(); x.translate(lerp(300, 480, walk), 1060); box(x, -50, -36, 100, 72, BONE, { b: 4 }); R(x, '#4fae6a', -38, -20, 30, 20); R(x, RED, 8, 0, 20, 14); R(x, INK, -38, 8, 60, 4); x.restore()
        S.date(x, t, { x: lerp(420, 700, walk), y: 1090, s: 210, mood: S.u > 4.6 ? 'sparkle' : 'happy', look: S.u > 4.6 ? [1, 1] : [-1, 0], hops: [S.t0 + 4.8, S.t0 + 5.2] })
        if (S.u > 4.6) { const k = clamp(prog(S.u, 5.4, 6.2)); for (let i = 0; i < 4; i++) { x.save(); x.translate(840 + i * 20, 980); x.rotate(-0.6 + k * 1.2 * (i % 2 ? 1 : -1) * 0.5); R(x, '#4fae6a', -6, -60, 12, 60); x.restore() } }
      },
      bubbles: [[0.8, 3.0, 'i printed a map. with a route.', { x: 300, y: 820 }], [4.8, 7.6, 'this plant folds up when you touch it!!', { x: 640, y: 820 }]],
      pis: { x: 960, y: 1210, s: 120 },
      cues: [['pluck', 5.4, 1567.98, 0.03, 0.4, 0.3]] },
    { title: 'HALF TWO', caption: 'Sag’s half: *a beginners’ dance class.*', cuts: [4.0],
      draw(x, t, S) {
        studio(x, t)
        const b = Math.sin(t * 8)
        S.date(x, t, { x: 680, y: 960 - 20 * Math.abs(b), s: 230, mood: 'happy', look: [-1, 0], squash: 0.07 * b, rot: 0.2 * b })
        S.hero(x, t, { x: 360, y: 960, s: 230, mood: 'wide', look: [1, 0], bob: 0, squash: 0 })
        if (S.u > 4) card(x, 360, 700, 300, 74, 'STIFF AS A PLANK', { size: 32, rot: -0.05, k: pop01(t, S.t0 + 4.1, 0.25, 2.4) })
      },
      bubbles: [[0.6, 3.0, 'just feel the music!', { x: 680, y: 760 }], [4.6, 6.8, 'i feel… observed.', { x: 380, y: 860 }]],
      pis: { x: 960, y: 1210, s: 130, tears: 2 },
      cues: [['tick', 0.5, 0.05], ['tick', 1.0, 0.05], ['tick', 1.5, 0.05], ['tick', 2.0, 0.05]] },
    { title: 'BUT…', tag: 'BUT…', caption: 'Capricorn *freezes* in the dance circle.', cuts: [4.4],
      draw(x, t, S) {
        studio(x, t)
        circle(x, t)
        S.hero(x, t, { x: 540, y: 1000, s: 240, mood: 'wide', look: [0, 0], bob: 0 })
        if (S.u > 4.4) { for (let i = 0; i < 2; i++) R(x, '#8fe3ff', 640 + i * 22, 900 + ((t * 1.3 + i / 2) % 1) * 70, 10, 16) }
      },
      bubbles: [[4.6, 7.0, 'your turn, capricorn!', { x: 800, y: 820 }]],
      pis: { x: 960, y: 1340, s: 120, tears: 2, mood: 'wide' },
      cues: [['riser', 0.5, 2.0, 0.03]] },
    { title: 'THE SAVE', caption: 'Sag dances *badly on purpose.*', cuts: [5.2],
      draw(x, t, S) {
        studio(x, t)
        circle(x, t)
        const f = Math.sin(t * 11)
        S.date(x, t, { x: 700, y: 980 - 30 * Math.abs(f), s: 220, mood: 'happy', look: [-1, 0], rot: 0.5 * f, squash: 0.1 * Math.cos(t * 11) })
        const loose = clamp(prog(S.u, 5.2, 6.4))
        S.hero(x, t, { x: 380, y: 1000 - 18 * Math.abs(Math.sin(t * 8)) * loose, s: 230, mood: S.u > 3.6 ? 'happy' : 'wide', look: [1, 0], rot: 0.15 * Math.sin(t * 8) * loose, hops: [S.t0 + 3.8, S.t0 + 4.1, S.t0 + 4.4] })
      },
      bubbles: [[0.6, 3.0, 'behold: the noodle', { x: 700, y: 780 }], [3.8, 5.0, 'HA', { x: 380, y: 820 }], [6.6, 8.8, 'ok. ok. one move.', { x: 400, y: 820 }]],
      pis: { x: 960, y: 1340, s: 120, tears: 3 },
      cues: [['pop', 3.8, 880, 0.04, -0.2], ['pop', 4.1, 987.77, 0.04, -0.2], ['glitter', 6.4, 7.0]] },
    { title: 'THE MOMENT', caption: 'The envelopes say the *same thing.*', cuts: [4.0],
      draw(x, t, S) {
        greenhouse(x, t)
        shadow(x, 330, GROUND - 100, 220); shadow(x, 720, GROUND - 100, 200)
        S.hero(x, t, { x: 330, y: 1080, s: 230, mood: S.u > 4.6 ? 'sparkle' : 'happy', look: [1, 0], blush: S.u > 4.6 ? 0.9 : 0 })
        S.date(x, t, { x: 720, y: 1090, s: 210, mood: S.u > 4.6 ? 'heart' : 'happy', look: [-1, 0], hops: [S.t0 + 4.7] })
        envelope(x, 330, 880, -0.1, 1, prog(S.u, 1.0, 2.0), 'planned for you')
        envelope(x, 720, 880, 0.1, 1, prog(S.u, 2.6, 3.6), 'planned for you')
        hearts(x, t, S.t0 + 4.8, 530, 900, { n: 6, rise: 240 })
      },
      bubbles: [[5.2, 7.6, 'we did the same thing.', { x: 540, y: 1180 }]],
      pis: { x: 960, y: 1210, s: 120, tears: 3 },
      cues: [['whoosh', 1.0, 0.4, 0.03], ['pop', 1.7, 1318.51, 0.035, -0.3], ['whoosh', 2.6, 0.4, 0.03], ['pop', 3.3, 1318.51, 0.035, 0.3], ['glitter', 4.8, 5.3]] },
  ],
  recs: [{ at: 35.4, len: 1.4, caption: 'Capricorn has *frozen.*', sub: 'this is not a pause button' }],
  ratingBg(x, t) { studio(x, t) },
  finale(x, t, S) {
    shadow(x, 400, GROUND - 200, 220); shadow(x, 690, GROUND - 200, 200)
    const mv = t > 69.6 && t < 71.4 ? Math.sin((t - 69.6) * 9) : 0
    S.hero(x, t, { x: 400, y: 980, s: 250, mood: 'happy', look: [1, 0], rot: 0.18 * mv, hops: [63.84, 69.7, 70.4] })
    S.date(x, t, { x: 690, y: 990, s: 220, mood: t > 69.8 ? 'heart' : 'happy', look: [-1, 0], hops: [63.9, 69.9, 70.3, 70.7] })
  },
  score: '9/10', word: 'two halves, one date',
  starsLine: 'plan a half. *share* the whole.',
  last: 'Half yours. Half mine. | *All* ours.',
  hookCues: [['boom', 0.05, 0.2], ['whoosh', 0.0, 0.6, 0.04]],
  extraCues: [['pop', 69.7, 880, 0.035, 0], ['pop', 70.4, 987.77, 0.035, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, outK, PINK, glow, box]
