// og-kute12: the social rework of kute12, THE UNSENT TEXT, "3 a.m., Pisces is drafting" (11.3 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title).
//   0.00 frame 0: Pisces mid-sob, tears on the screen, "do you ever think about us (i do. hourly)" mid-delete.
//        HOOK (static outline, until 3.3): "3 a.m. Pisces is | *drafting* again." · 0.45 record scratch
//   1.60 "saw a dog that looked like you. hope you're well." ✗ · 5.00 the screen goes dark; a notebook slides up and
//   Pisces writes it there instead · 8.70 THE STARS, hard cut on the last line.
import { makeUnsent } from '../unsentkit.js'
import { box, R, INK, BONE, SERIF, ease, clamp } from '../unsentkit.js'

export const HOOK = '3 a.m. Pisces is | *drafting* again.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.3

const D = 1.3   // the notebook beat starts D s later than in kute12 (the second draft is longer)
// the notebook: slides up over the dark phone, the feeling gets written there in ink, a tear lands on the page
const NOTE = ['i miss us sometimes.', 'that’s allowed.', 'goodnight, 3 a.m.']
function notebook(c, t) {
  const k = ease.outCubic(clamp((t - 3.9 - D) / 0.45))
  if (k <= 0) return
  const x0 = 330, y0 = 1700 - k * 840, w = 500, h = 560
  c.save(); c.translate(x0 + w / 2, y0 + h / 2); c.rotate(-0.04); c.translate(-(x0 + w / 2), -(y0 + h / 2))
  box(c, x0, y0, w, h, BONE, { b: 8 })
  R(c, '#e8344e', x0 + 58, y0, 4, h)
  for (let i = 0; i < 8; i++) R(c, '#c9d6f2', x0, y0 + 90 + i * 60, w, 3)
  c.font = `italic 500 46px ${SERIF}`; c.fillStyle = INK; c.textBaseline = 'alphabetic'
  let tt = 4.4 + D
  NOTE.forEach((ln, j) => { const n = Math.max(0, Math.min(ln.length, Math.floor((t - tt) * 16))); c.fillText(ln.slice(0, n), x0 + 80, y0 + 140 + j * 120); tt += ln.length / 16 + 0.25 })
  if (t > 6.2 + D) { const a = clamp((t - 6.2 - D) / 0.3); c.globalAlpha = 0.7 * a; c.fillStyle = '#8fe3ff'; c.beginPath(); c.ellipse(x0 + 360, y0 + 470, 26 * a, 16 * a, 0, 0, Math.PI * 2); c.fill() }
  c.restore()
}
const EP = makeUnsent({
  id: 'og-kute12', duration: 11.3,
  sign: 'pisces', name: 'Pisces', to: 'Theo', status: 'last seen 9 months ago', statusCol: '#ff9fb8', avatar: '#7fd0ff',
  hook: '', ending: 'cut', draftBase: 6, pisHero: true, pis: false,
  msgs: [{ text: 'i think we should stop here.', at: -9, stamp: '9 months ago' }, { text: 'ok. take care', at: -8.8, from: 'me' }],
  drafts: [
    { text: 'do you ever think about us (i do. hourly)', at: -3.0, cps: 15, del: -0.25, delCps: 40 },
    { text: 'saw a dog that looked like you. hope you’re well.', at: 1.6, cps: 22, del: 3.9, delCps: 50 },
  ],
  breaks: [{ kind: 'scratch', at: 0.45, len: 0.85, caption: 'it’s *3:07 a.m.* again.' }],
  heroTears: t => t < 5.8 + D ? 3 : 2,
  screen: (c, t, S) => { const k = clamp((t - 3.7 - D) / 0.3); if (k > 0) { c.save(); c.globalAlpha = 0.85 * k; c.fillStyle = '#05030c'; c.fillRect(S.SCR.x, S.SCR.y, S.SCR.w, S.SCR.h); c.restore() } },
  front: (c, t) => notebook(c, t),
  moods: [[-9, 'wide', [1, -0.5]], [1.6, 'sparkle', [1, -0.3]], [3.9, 'wide', [0, 0]], [3.8 + D, 'sparkle', [1, 0.3]], [6.6 + D, 'happy', [1, 0.3]]],
  lines: [{ t: 7.4 + D, text: 'Write it down. *Sleep* on it.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
