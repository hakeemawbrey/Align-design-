// og-st12friendsvote: the social rework of st12friendsvote (Star Talk "Hot Takes", no HOT TAKE stamp / HEAT meter / end card, see hotkit.js; 20 s vertical, music: house · Fm). Story 0–15.6; the film ends on its last beat.
//   0.00   HOOK (static) replaces the take "Your friends' opinion | *matters*."  ♋ Cancer (left, mid-smirk) shows a group chat full of
//          little hearts. HEAT 4/5.
//   2.6    OBJECTION! ♈ Aries: "it's MY love life. *mine.*" Two lines, THE VERDICT.
//   last   "Listen. | Then *decide*."  A new message pops in the chat: "we trust you ♡" (rewatch: the typing dots never stop).
import { hotEpisode, HOT, clamp, rgba } from './hotkit.js'
import { hotPlan, castSign, R, bits, bubble } from './more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "MY love life. i'm eloping. *TONIGHT.*" }, { who: "pro", text: "i made the chat a *slideshow.* sit." }], verdict: "listen to the people who love you. | then decide for *yourself.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  duration: 20, key: 'Fm',
  take: { text: '', out: [0, 0.01] },   // og: unused (the HOOK replaces the stamp)
  heat: { level: 4, at: -1 },
  pro: castSign('cancer', { x: 290, y: 1170, size: 340, seed: 2 }),
  con: castSign('aries', { x: 760, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Listen. | Then *decide*.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { const cx = 540, cy = 800
    card(x, cx, cy, 560, 250, '#140c2c', HOT.bone); txt(x, 'THE GROUP CHAT (47)', cx, cy - 98, 26, HOT.gold)
    const msgs = [['they seem sweet', '#d8d0ff', 0.3], ['be careful ok?', '#ffe0c0', 1.2], ['we want u happy', '#c8f2e0', 2.0], ['we trust you. x', '#ffd0e0', T.last + 0.4]]
    let y = cy - 60; for (const [m, c, at] of msgs) { if (t < at) continue; const w = m.length * 17 + 30; R(x, c, cx - 260, y, w, 34); txt(x, m, cx - 245, y + 18, 24, HOT.ink, 'left'); y += 42 }
    for (let k = 0; k < 3; k++) R(x, Math.floor(t * 4) % 3 === k ? HOT.bone : '#5a5470', cx + 180 + k * 22, cy + 96, 12, 12) },
  front: (x, t, T, rp, rc) => {  },
  cues: [['pop', 0.3, 987.77, 0.025, 0], ['pop', 1.2, 1108.73, 0.025, 0], ['pop', 2.0, 1174.66, 0.025, 0], ['pop', LAST + 0.4, 1318.51, 0.035, 0]],
})
export const { SCENES, CUES, DURATION } = EP

// social hook: static caption from frame 0 (the HOT TAKE stamp is removed in hotkit.js)
export const HOOK = "Do your friends | get a *vote?*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.55
