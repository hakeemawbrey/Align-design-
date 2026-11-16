// og-kute15: the social rework of kute15, THE UNSENT TEXT, "Replying three weeks late" (10.5 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title, no whip zoom, hard cut).
//   0.00 frame 0: Gemini mid-wince under a "3 WEEKS AGO" stamp, "omg just saw this!! (lie)" mid-delete.
//        HOOK (static box, until 3.3): "Gemini replied | *three weeks* late."
//   1.30 "sorry, my other twin had my phone" ✗ · 4.20 "sorry i went quiet. i'd still love to catch up." → SENT 7.00
//   7.30 THE STARS, hard cut on the last line.
import { makeUnsent } from '../unsentkit.js'
import { RED, INTER, clamp } from '../unsentkit.js'

export const HOOK = 'Gemini replied | *three weeks* late.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.3

const EP = makeUnsent({
  id: 'og-kute15', duration: 10.5,
  sign: 'gemini', name: 'Gemini', to: 'Priya', status: 'online', avatar: '#9fe6b0',
  hook: '', ending: 'cut', draftBase: 4,
  msgs: [{ text: 'are we still on for the gallery thing?', at: -9, stamp: '3 WEEKS AGO' }],
  drafts: [
    { text: 'omg just saw this!! (lie)', at: -2.0, cps: 14, del: -0.15, delCps: 34 },
    { text: 'sorry, my other twin had my phone', at: 1.3, cps: 18, del: 3.3, delCps: 44 },
    { text: 'sorry i went quiet. i’d still love to catch up.', at: 4.2, cps: 18, send: 7.0 },
  ],
  top: (c, t) => {   // the 3 WEEKS AGO stamp on the old message
    const k = 1 - clamp((t - 1.2) / 0.3); if (k <= 0) return
    c.save(); c.globalAlpha = k; c.translate(600, 800); c.rotate(-0.12); c.strokeStyle = RED; c.lineWidth = 8; c.strokeRect(-200, -46, 400, 92)
    c.font = `800 54px ${INTER}`; c.fillStyle = RED; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('3 WEEKS AGO', 0, 4); c.restore()
  },
  sob: t => t > 7.05 ? 3 : 2,
  lines: [{ t: 7.35, text: 'Late and *honest* beats never.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
