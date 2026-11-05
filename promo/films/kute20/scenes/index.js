// kute20: THE UNSENT TEXT, "Texting your best friend… feelings" (11 s vertical trial reel, music: synthwave · C#m).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Scorpio buried in a hoodie, hearts flying, "i think i like you" mid-delete · 0.40 record scratch
//   1.20 "random question" ✗ · 2.90 "if i liked someone hypothetically" ✗ (wipe) · 5.60 "can we talk tomorrow? in person." · 7.80 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
// a hood pulled over Scorpio's top point (hiding), pushed back once the honest draft starts
function hoodie(c, t, o) {
  const up = t < 5.6 ? 1 : 1 - ease.inOutCubic(clamp((t - 5.6) / 0.5))
  if (up <= 0.02) return
  const top = o.y - o.s * 0.5, x = o.x
  c.save(); c.globalAlpha = up; c.translate(x, top + 10 - (1 - up) * 50)
  c.fillStyle = INK; c.beginPath(); c.arc(0, 30, 92, Math.PI * 1.05, Math.PI * 1.95); c.lineTo(80, 60); c.lineTo(-80, 60); c.closePath(); c.fill()
  c.fillStyle = '#5a3d78'; c.beginPath(); c.arc(0, 30, 84, Math.PI * 1.08, Math.PI * 1.92); c.lineTo(72, 54); c.lineTo(-72, 54); c.closePath(); c.fill()
  c.restore()
}
const EP = makeUnsent({
  id: 'kute20', duration: 11,
  sign: 'scorpio', name: 'Scorpio', to: 'Wren', status: 'online', avatar: '#9fe6b0',
  hook: 'Texting your *best* friend… | feelings.', ending: 'loop', draftBase: 3,
  msgs: [{ text: 'ok but who’s your favorite person', at: -9, stamp: '11:40 pm' }, { text: 'obviously you lol', at: -8.8, from: 'me' }],
  drafts: [
    { text: 'i think i like you', at: -1.8, cps: 15, del: -0.3, delCps: 24 },
    { text: 'random question', at: 1.2, cps: 14, del: 2.5, delCps: 30 },
    { text: 'if i liked someone hypothetically', at: 2.9, cps: 17, del: 5.2, wipe: true },
    { text: 'can we talk tomorrow? in person.', at: 5.6, cps: 18 },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.85, caption: 'it’s your *best friend.*' }],
  onHero: (c, t, S, o) => hoodie(c, t, o),
  front: (c, t) => { for (const t0 of [-1.2, 5.8]) hearts(c, t, t0, 200, 1050, { n: 6, cell: 7 }) },
  heroTears: t => t > 5.2 && t < 7.6 ? 1 : 0,
  sob: t => t > 5.3 ? 3 : 2,
  lines: [{ t: 7.8, text: 'Big feelings? Say them *face to face.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
