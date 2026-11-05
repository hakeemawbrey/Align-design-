// kute03: THE UNSENT TEXT, "The old friend you lost touch with" (10 s vertical trial reel, music: chiptune · E).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Gemini juggling a second phone, "omg hiii long time no see" mid-delete · 0.40 record scratch
//   1.40 "so sorry i vanished" ✗ · 3.70 "saw this and thought of you" hovers · 6.00 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute03', duration: 10,
  sign: 'gemini', name: 'Gemini', to: 'Rio', status: 'last seen a while ago', statusCol: '#c9a6ff', avatar: '#ffd36b',
  hook: 'Texting an old friend. | *Draft* twelve.', ending: 'loop', draftBase: 10,
  msgs: [{ text: 'happy birthday!! miss you', at: -9, stamp: '1 year ago' }, { text: 'thank you!! miss you too', at: -8.8, from: 'me' }],
  drafts: [
    { text: 'omg hiii long time no see', at: -2.0, cps: 16, del: -0.35, delCps: 26 },
    { text: 'so sorry i vanished', at: 1.4, cps: 14, del: 3.2, delCps: 30 },
    { text: 'saw this and thought of you', at: 3.7, cps: 15 },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.85, caption: 'yep. *a whole year.*' }],
  onHero: (c, t, S, o) => {   // the second phone, juggled in the air
    const a = t * 5.2, px = o.x + 60 * Math.cos(a), py = o.y - 210 - 70 * Math.abs(Math.sin(a))
    c.save(); c.translate(px, py); c.rotate(a * 0.8); box(c, -26, -46, 52, 92, '#2a2148', { b: 5 }); R(c, '#7fd0ff', -18, -36, 36, 66); c.restore()
  },
  lines: [{ t: 6.0, text: 'They’ll be glad. *Just* say hi.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
