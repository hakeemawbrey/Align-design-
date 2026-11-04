// nrde08: RATE MY DATE IDEA, "Scorpio's midnight telescope date" (18 s vertical trial reel, music: cinematic · Dm).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Midnight. A telescope. Very *quiet.*”  ♏ Scorpio squints into a telescope on a dark hill.
//   2.6–5.8   THE PLAN "whispering. *intensely.*"  Scorpio whispers "shh… look."; the ♋ Cancer date leans in, nervous.
//   5.8       card cut.
//   5.8–9.3   BUT… "it's just the Moon. *their favourite.*"  The eyepiece view: the Moon, craters and all. Scorpio's eyes
//             go soft: "I come here when I miss people."  The date: heart eyes.
//   9.32      THE STARS RATE IT 10/10 *let them in*.  Pisces: 11/10.   9.8 THE STARS: "Show them a place you *love*."
import { makeDate, R, box, bubble, shadow, hearts, card, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function hill(x, y) {
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, y + 40); x.quadraticCurveTo(540, y - 60, 1080, y + 40); x.lineTo(1080, 1320); x.lineTo(0, 1320); x.closePath(); x.fill()
  x.fillStyle = '#1f1840'; x.beginPath(); x.moveTo(0, y + 50); x.quadraticCurveTo(540, y - 48, 1080, y + 50); x.lineTo(1080, 1320); x.lineTo(0, 1320); x.closePath(); x.fill()
}
function telescope(x, cx, by, s = 1, rot = -0.5) {
  x.save(); x.translate(cx, by)
  for (const d of [-1, 1]) { x.save(); x.rotate(d * 0.32); R(x, INK, -6 * s, -200 * s, 12 * s, 200 * s); x.restore() }
  x.translate(0, -200 * s); x.rotate(rot)
  box(x, -40 * s, -30 * s, 260 * s, 60 * s, '#d9dce8', { b: 6, hi: '#ffffff' })
  box(x, 220 * s, -40 * s, 40 * s, 80 * s, '#8c86a8', { b: 6 })
  box(x, -80 * s, -18 * s, 40 * s, 36 * s, '#5a5470', { b: 5 })
  x.restore()
}
function moonView(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.beginPath(); x.arc(0, 0, r + 14, 0, Math.PI * 2); x.fillStyle = INK; x.fill()
  x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fillStyle = '#d9dce8'; x.fill()
  x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fillStyle = '#0a0818'; x.fill(); x.clip()
  const mr = r * 0.62
  x.beginPath(); x.arc(0, 0, mr, 0, Math.PI * 2); x.fillStyle = '#f1ead2'; x.fill()
  for (const [a, b, c] of [[-0.3, -0.25, 0.22], [0.25, 0.1, 0.16], [-0.1, 0.35, 0.12], [0.35, -0.35, 0.09], [-0.45, 0.15, 0.08]]) { x.beginPath(); x.arc(a * mr * 1.4, b * mr * 1.4, c * mr, 0, Math.PI * 2); x.fillStyle = '#cfc6a8'; x.fill() }
  x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, mr * 0.9, 0, 0, mr * 1.5); g.addColorStop(0, 'rgba(255,248,220,0.25)'); g.addColorStop(1, 'rgba(255,248,220,0)'); x.fillStyle = g; x.fillRect(-r, -r, 2 * r, 2 * r)
  x.restore()
  void t
}

const EP = makeDate({
  id: 'nrde08', sign: 'scorpio', date: 'cancer', accent: '#e5687a', deep: '#9a1f3a',
  idea: 'Midnight. A telescope. Very *quiet.*',
  sky: { dim: 0.8 },
  hook(x, t, S) {
    hill(x, 1240)
    telescope(x, 720, 1300, 1.05, -0.55)
    shadow(x, 430, 1300, 220)
    S.hero(x, t, { x: 470, y: 1080, s: 290, mood: 'squint', look: [1, -0.6], hops: S.HOOK_HOPS })
  },
  beats: [
    { caption: 'whispering. *intensely.*', draw(x, t, S) {
      const { u, hero, date } = S
      hill(x, 1100)
      telescope(x, 540, 1170, 0.9, -0.6)
      shadow(x, 300, 1160, 180); shadow(x, 800, 1160, 170)
      hero(x, t, { x: 300, y: 980, s: 200, mood: 'squint', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 1.6] })
      const lean = ease.inOutCubic(prog(u, 1.2, 2.0))
      date(x, t, { x: lerp(840, 760, lean), y: 990, s: 190, mood: 'wide', look: [-1, 0], squash: Math.sin(t * 30) * 0.02 * lean })
      bubble(x, t, 300, 760, S.t0 + 0.4, S.t1, 'shh… look.', { size: 30, col: '#d9d2ff', tail: 0 })
      bubble(x, t, 800, 760, S.t0 + 1.7, S.t1, 'is this a mystery?', { size: 32, tail: 0.3 })
    }, cues: [['pop', 0.42, 440, 0.025, -0.3], ['pop', 1.72, 880, 0.03, 0.3], ['riser', 1.2, 1.6, 0.01]] },
    { caption: 'it’s the Moon. *Their favourite.*', draw(x, t, S) {
      const { u, hero, date } = S
      moonView(x, t, 540, 820, 250, pop01(t, S.t0 + 0.05, 0.35, 1.8))
      hill(x, 1150)
      shadow(x, 300, 1200, 170); shadow(x, 780, 1200, 170)
      hero(x, t, { x: 300, y: 1050, s: 190, mood: u < 1.2 ? 'neutral' : 'sparkle', look: [1, -0.6], hops: [S.t0 + 1.2] })
      date(x, t, { x: 780, y: 1050, s: 180, mood: u < 1.6 ? 'wide' : 'heart', look: [-1, -0.4], hops: [S.t0 + 1.7] })
      bubble(x, t, 340, 1230, S.t0 + 1.2, S.t1, 'I come here when I miss people.', { size: 30, tail: -0.4 })
      hearts(x, t, S.t0 + 1.8, 780, 960, { n: 5 })
    }, cues: [['bell', 0.08, 1318.51, 0.035, 1.6, 0], ['glitter', 0.1, 0.6], ['pop', 1.22, 880, 0.03, -0.3], ['pluck', 1.75, 1567.98, 0.04, 0.3, 0.3]] },
  ],
  score: '10/10', word: 'let them in',
  last: 'Show them a place you *love*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, GOLD, PINK, card]
