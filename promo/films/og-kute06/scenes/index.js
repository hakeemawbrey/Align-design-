// og-kute06: social rework of kute06, THE UNSENT TEXT, "Virgo’s text has footnotes" (star_advice). Same phone, cast and story.
// Static HOOK instead of the slammed title, no series bug, no flash / whip / shake / glitch (a calm caption sticker keeps
// the joke), no loop (hard cut on THE STARS' last line), layout inside the full-frame safe zone, Virgo writes agendas and footnotes before the ten honest words.
// Built on the og copy of the kit (../unsentkit.js).
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'og-kute06', duration: 12,
  sign: 'virgo', name: 'Virgo', to: 'Ari', status: 'online', avatar: '#ff8fb1',
  hook: '', ending: 'loop', draftBase: 4,
  drafts: [
    { text: 'hi! so i’ve been thinking about us and prepared a short agenda. item one (of nine)', at: -6.5, cps: 16, del: -0.12, wipe: true },
    { text: '- you’re great - i like you - see footnote 3', at: 1.5, cps: 16, del: 4.6, delCps: 40 },
    { text: 'i like you. do you like me?', at: 5.1, cps: 14 },
  ],
  breaks: [{ kind: 'note', at: 0.45, len: 1.2, caption: 'that was *page one* of nine.' }],
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
export const HOOK = 'Virgo’s text | has *footnotes.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.2
