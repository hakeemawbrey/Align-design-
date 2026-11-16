// og-kute14: the social rework of kute14, THE UNSENT TEXT, "Ending it kindly" (12.9 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title).
//   0.00 frame 0: Taurus mid-gulp of tea, the mug rattling, "we should talk. (in person. i made soup.)" mid-delete.
//        HOOK (static outline, until 3.3): "Taurus ending it | *kindly.* Draft 3." · 0.40 record scratch
//   1.40 "it's not you, it's my 7-year plan" ✗ · 4.40 the honest version, typed slowly (Pisces sobs) · 9.20 THE STARS
import { makeUnsent } from '../unsentkit.js'
import { box, R, INK, BONE } from '../unsentkit.js'

export const HOOK = 'Taurus ending it | *kindly.* Draft 3.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.3

// Taurus' tea mug: rattling at frame 0, steady once the honest draft starts
function mug(c, t, o) {
  const r = t < 4.4 ? 5 * Math.sin(t * 70) * (t < 0.8 ? 1.6 : 0.6) : 0
  const x = o.x + 110 + r, y = o.y + 70
  box(c, x - 34, y - 40, 68, 76, '#e8a35a', { b: 5, hi: '#f4c48a' }); R(c, INK, x + 34, y - 26, 22, 8); R(c, INK, x + 48, y - 26, 8, 40); R(c, INK, x + 34, y + 8, 22, 8)
  for (let i = 0; i < 3; i++) { const p = ((t * 0.8 + i / 3) % 1); c.save(); c.globalAlpha = 0.5 * (1 - p); R(c, BONE, x - 14 + i * 12 + 6 * Math.sin(t * 3 + i), y - 56 - p * 70, 8, 16); c.restore() }
}
const EP = makeUnsent({
  id: 'og-kute14', duration: 12.9,
  sign: 'taurus', name: 'Taurus', to: 'Lou', status: 'online', avatar: '#7fd0ff',
  hook: '', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'free this weekend? :)', at: -9, stamp: 'today 1:05 pm' }],
  drafts: [
    { text: 'we should talk. (in person. i made soup.)', at: -3.1, cps: 14, del: -0.2, delCps: 45 },
    { text: 'it’s not you, it’s my 7-year plan', at: 1.4, cps: 17, del: 3.45, delCps: 44 },
    { text: 'i’ve loved our time, but i don’t see us dating. i wanted to be honest.', at: 4.4, cps: 17 },
  ],
  breaks: [{ kind: 'scratch', at: 0.4, len: 0.85, caption: 'step away from *the tea.*' }],
  onHero: (c, t, S, o) => mug(c, t, o),
  sob: t => t > 6.8 ? 3 : 2,
  lines: [{ t: 9.2, text: 'Clear is the *kindest* goodbye.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
