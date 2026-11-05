// kute12: THE UNSENT TEXT, "3 a.m., Pisces is drafting" (10 s vertical trial reel, music: dreamy · D).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Pisces mid-sob, tears on the screen, "do you ever think about us" mid-delete · 0.45 record scratch
//   1.60 "hope you're well." ✗ · 3.70 the screen goes dark; a notebook slides up and Pisces writes it there instead · 7.40 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
// the notebook: slides up over the dark phone at 3.9, the feeling gets written there in ink, a tear lands on the page
const NOTE = ['i miss us sometimes.', 'that’s allowed.', 'goodnight, 3 a.m.']
function notebook(c, t) {
  const k = ease.outCubic(clamp((t - 3.9) / 0.45))
  if (k <= 0) return
  const x0 = 360, y0 = 1700 - k * 840, w = 480, h = 560
  c.save(); c.translate(x0 + w / 2, y0 + h / 2); c.rotate(-0.04); c.translate(-(x0 + w / 2), -(y0 + h / 2))
  box(c, x0, y0, w, h, BONE, { b: 8 })
  R(c, '#e8344e', x0 + 58, y0, 4, h)
  for (let i = 0; i < 8; i++) R(c, '#c9d6f2', x0, y0 + 90 + i * 60, w, 3)
  c.font = `italic 500 46px ${SERIF}`; c.fillStyle = INK; c.textBaseline = 'alphabetic'
  let tt = 4.4
  NOTE.forEach((ln, j) => { const n = Math.max(0, Math.min(ln.length, Math.floor((t - tt) * 16))); c.fillText(ln.slice(0, n), x0 + 80, y0 + 140 + j * 120); tt += ln.length / 16 + 0.25 })
  if (t > 6.2) { const a = clamp((t - 6.2) / 0.3); c.globalAlpha = 0.7 * a; c.fillStyle = '#8fe3ff'; c.beginPath(); c.ellipse(x0 + 360, y0 + 470, 26 * a, 16 * a, 0, 0, Math.PI * 2); c.fill() }
  c.restore()
}
const EP = makeUnsent({
  id: 'kute12', duration: 10,
  sign: 'pisces', name: 'Pisces', to: 'Theo', status: 'last seen 9 months ago', statusCol: '#ff9fb8', avatar: '#7fd0ff',
  hook: '3 a.m. | Pisces is *drafting.*', ending: 'cut', draftBase: 6, pisHero: true, pis: false,
  msgs: [{ text: 'i think we should stop here.', at: -9, stamp: '9 months ago' }, { text: 'ok. take care', at: -8.8, from: 'me' }],
  drafts: [
    { text: 'do you ever think about us', at: -2.2, cps: 15, del: -0.3, delCps: 22 },
    { text: 'hope you’re well.', at: 1.6, cps: 13, del: 3.1, delCps: 30 },
  ],
  breaks: [{ kind: 'scratch', at: 0.45, len: 0.85, caption: 'it’s *3:07 a.m.*' }],
  heroTears: t => t < 5.8 ? 3 : 2,
  screen: (c, t, S) => { const k = clamp((t - 3.7) / 0.3); if (k > 0) { c.save(); c.globalAlpha = 0.85 * k; c.fillStyle = '#05030c'; c.fillRect(S.SCR.x, S.SCR.y, S.SCR.w, S.SCR.h); c.restore() } },
  front: (c, t) => notebook(c, t),
  moods: [[-9, 'wide', [1, -0.5]], [1.6, 'sparkle', [1, -0.3]], [3.1, 'wide', [0, 0]], [3.8, 'sparkle', [1, 0.3]], [6.6, 'happy', [1, 0.3]]],
  lines: [{ t: 7.4, text: 'Write it down. *Sleep* on it.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
