// nsge12: REMIX: SNOW GLOBE CITIES, Winnipeg, "Winnipeg: tears that sparkle" (28 s vertical, music: screwed · Eb)
// Rows: promo/films/next30/b16.md. Look + timeline: ../../nsge01/globekit.js.
//   0–6.4    "I cried and it | turned to glitter."  Pisces inside the globe on the frozen river trail, tears freezing into sparkles.
//            (This time a Cancer is the one pressed to the glass outside, crying too.)
//   6.4–12.7 "Cry. Freeze. | Sparkle."  happy tear, frozen · sad tear, frozen · an ice statue of my crush (twist).
//   13–20    A Capricorn skates up with spare mittens. THE STARS: you feel everything. that's a gift.
//   20.2–25.6 the shake; talk card "Morning person or night owl?"; "Feel it. Then skate."
import { globeFilm } from '../../nsge01/globekit.js'

export const CFG = {
  city: 'WINNIPEG', hero: 'pisces', partner: 'capricorn', frozenTears: true, pisOutside: { id: 'cancer' },
  music: { style: 'screwed', key: 'Eb', seed: 1612 },
  inside: { top: '#141a46', bottom: '#46508e' },
  heads: ['I cried and it | turned to *glitter.*', 'Cry. Freeze. | *Sparkle.*', 'Skate the | *river trail.*', 'Feel it. *Then* skate.'],
  accents: ['#ffd23a', '#bfe6ff', '#d9c19a', '#ffd23a'], lateWords: 2,
  lines: [
    { who: 'hero', text: 'so cold my tears come out *as sparkles.*' },
    { who: 'stars', text: "that's… *honestly beautiful*, babe." },
    { who: 'hero', text: "it's a tribute, *not a shrine.*" },
    { who: 'stars', text: "you feel everything. *that's a gift.*" },
    { who: 'partner', text: 'you can cry *on my mitten.*' },
  ],
  gags: [
    { bm: 'tear', label: 'happy tear:|frozen' },
    { bm: 'tear', label: 'sad tear:|frozen' },
    { bm: 'statue', label: 'an ice statue|of my crush' },
  ],
  tie: { kind: 'talk', img: 'card-talk-2.png' },
  skyline: [
    { k: 'blocks', x0: 190, x1: 900, seed: 121, min: 70, max: 180, col: '#20285a' },
    { k: 'tower', x: 600, w: 70, h: 280, col: '#2a3266', tip: 'flat' },
    { k: 'trees', x0: 190, x1: 900, seed: 12, h: 50 },
    { k: 'river', y0: -70, y1: 4, col: '#c4dcf2' },
  ],
  pos: { part: { x: 700, y: 1000, s: 150 } },
  draw(x, t, layer, K) {
    if (layer === 'front') {
      // the frozen tears glitter on the ice around the Pisces
      for (let i = 0; i < 7; i++) { const a = 0.5 + 0.5 * Math.sin(t * 4 + i * 1.9); x.fillStyle = `rgba(255,241,200,${a.toFixed(3)})`; x.fillRect(330 + i * 26, 1080 + (i % 3) * 12, 6, 6) }
      if (t > K.T.partnerIn + 0.4 && t < K.T.together) { const b = K.BITS.mittens; K.drawBits(x, b.rows, b.cols, 780, 1010, 6) }
    }
  },
}
const F = globeFilm(CFG)
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES
