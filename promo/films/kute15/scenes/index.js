// kute15: THE UNSENT TEXT, "Replying three weeks late" (9 s vertical trial reel, music: pop · A).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Gemini mid-wince under a "3 WEEKS AGO" stamp, "omg just saw this" mid-delete · 0.30 whip zoom
//   1.30 "sorry been SO busy" ✗ · 3.30 "sorry i went quiet. i'd still love to catch up." → SENT 6.10 · 6.30 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'

const EP = makeUnsent({
  id: 'kute15', duration: 9,
  sign: 'gemini', name: 'Gemini', to: 'Priya', status: 'online', avatar: '#9fe6b0',
  hook: 'Replying three | weeks *late.*', ending: 'loop', draftBase: 4,
  msgs: [{ text: 'are we still on for the gallery thing?', at: -9, stamp: '3 WEEKS AGO' }],
  drafts: [
    { text: 'omg just saw this', at: -1.4, cps: 15, del: -0.25, delCps: 26 },
    { text: 'sorry been SO busy', at: 1.3, cps: 15, del: 2.9, delCps: 32 },
    { text: 'sorry i went quiet. i’d still love to catch up.', at: 3.3, cps: 18, send: 6.0 },
  ],
  breaks: [{ kind: 'whip', at: 0.3, from: 1.6, cy: 900 }],
  top: (c, t) => {   // the 3 WEEKS AGO stamp, slammed on the old message
    const k = 1 - clamp((t - 1.0) / 0.3); if (k <= 0) return
    c.save(); c.globalAlpha = k; c.translate(600, 760); c.rotate(-0.12); c.strokeStyle = RED; c.lineWidth = 8; c.strokeRect(-200, -46, 400, 92)
    c.font = `800 54px ${INTER}`; c.fillStyle = RED; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('3 WEEKS AGO', 0, 4); c.restore()
  },
  sob: t => t > 6.05 ? 3 : 2,
  lines: [{ t: 6.35, text: 'Late and *honest* beats never.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
