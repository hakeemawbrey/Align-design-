// kute06: THE UNSENT TEXT, "Virgo’s text has footnotes" (12 s vertical trial reel, music: jazzy · Bb).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: a wall-of-text essay mid select-all wipe, letters bursting · 0.45 record scratch
//   1.50 bullet points ✗ · 5.10 "i like you. do you like me?" (Pisces sobs at its beauty) · 7.50 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute06', duration: 12,
  sign: 'virgo', name: 'Virgo', to: 'Ari', status: 'online', avatar: '#ff8fb1',
  hook: 'Virgo’s text | has *footnotes.*', ending: 'loop', draftBase: 4,
  drafts: [
    { text: 'hi! so i’ve been thinking about us and i wanted to lay out a few points. first of all', at: -6.5, cps: 16, del: -0.12, wipe: true },
    { text: '- you’re great - i like you - thoughts?', at: 1.5, cps: 16, del: 4.6, delCps: 40 },
    { text: 'i like you. do you like me?', at: 5.1, cps: 14 },
  ],
  breaks: [{ kind: 'scratch', at: 0.45, len: 0.85, caption: 'that was *page one.*' }],
  screen: (c, t, S) => {   // red edit marks over the essay at frame 0 (fade with the wipe)
    const k = 1 - clamp((t + 0.1) / 0.5); if (k <= 0) return
    c.save(); c.globalAlpha = k; c.strokeStyle = RED; c.lineWidth = 6
    for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(S.SCR.x + 60, S.F.fy + 50 + i * 70); c.lineTo(S.SCR.x + 300 + i * 30, S.F.fy + 40 + i * 70); c.stroke() }
    c.restore()
  },
  sob: t => t > 6.8 ? 3 : 2, pisMood: t => t > 6.8 ? 'heart' : 'sparkle',
  lines: [{ t: 7.5, text: 'Ten words beat ten *paragraphs.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
