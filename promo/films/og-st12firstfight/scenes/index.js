// og-st12firstfight: the social rework of st12firstfight (Star Talk "Hot Takes", no HOT TAKE stamp / HEAT meter / end card, see hotkit.js; 20 s vertical, music: cinematic · Bbm). Story 0–15.6; the film ends on its last beat.
//   0.00   HOOK (static) replaces the take "Your first fight can be | *good* news."  ♉ Taurus (left, calm, mid-smirk) beside a pixel heart with a
//          crack down the middle. HEAT 4/5.
//   2.6    OBJECTION! ♓ Pisces, in tears: "it's *over.*" Two lines, THE VERDICT.
//   last   "*Repair* | is romance."  The crack is stitched with gold (rewatch: one stitch per beat); Pisces sniffles, smiles.
import { hotEpisode, HOT, clamp, rgba } from './hotkit.js'
import { hotPlan, castSign, R, bits, bubble } from './more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "a fight?! i already wrote our *eulogy.*" }, { who: "pro", text: "i'm not leaving. i'm too *comfortable.*" }], verdict: "how you repair matters more | than never *disagreeing.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  duration: 20, key: 'Bbm',
  take: { text: '', out: [0, 0.01] },   // og: unused (the HOOK replaces the stamp)
  heat: { level: 4, at: -1 },
  pro: castSign('taurus', { x: 290, y: 1170, size: 340, seed: 2 }),
  con: castSign('pisces', { x: 760, y: 1170, size: 330, seed: 7 }),   // og: hotkit.js draws the Pisces tears
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "*Repair* | is romance.", gap: 0.1 },
  moods: { pro: [[0, { mood: 'happy', look: [0, 0] }], [OBJ + 0.4, { mood: 'neutral', look: [1, 0] }]], con: [[OBJ + 0.4, { mood: 'wide', look: [-1, 0] }], [LAST + 0.6, { mood: 'happy', look: [-1, 0] }]] },
  back: (x, t, T) => { const H = ['.RR...RR.', 'RRRR.RRRR', 'RRRRRRRRR', 'RRRRRRRRR', '.RRRRRRR.', '..RRRRR..', '...RRR...', '....R....']
    bits(x, H, { R: HOT.red }, 432, 700, 24)
    const k = clamp((t - T.verdict) / (LAST + 0.6 - T.verdict)), n = Math.round(k * 6)
    for (let j = 0; j < 8; j++) R(x, HOT.ink, 534 + (j % 2 ? 10 : -10), 700 + j * 24, 12, 24)
    for (let j = 0; j < n; j++) R(x, HOT.gold, 506, 718 + j * 30, 68, 8) },
  front: (x, t, T, rp, rc) => {  },
  cues: [['bell', LAST + 0.6, 1396.91, 0.025, 1.2, 0]],
})
export const { SCENES, CUES, DURATION } = EP

// social hook: static caption from frame 0 (the HOT TAKE stamp is removed in hotkit.js)
export const HOOK = "Your first fight | isn't the *end.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.55
