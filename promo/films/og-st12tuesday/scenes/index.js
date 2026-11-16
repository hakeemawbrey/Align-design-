// og-st12tuesday — the OG social cut of st12tuesday (Star Advice). Same sticky note, billboard, cast and ending; static
// HOOK (box) from frame 0 instead of the HOT TAKE stamp, no heat meter / agree pill / episode numeral, louder signs.
//   0.00   HOOK "Billboards are cute. | *Tuesdays* are love."  Taurus (left) holds up a tiny sticky note.
//   2.6    OBJECTION! Leo rolls in a giant light-up billboard with its OWN face on it.
//   last   "Show up on | *Tuesday*."  The billboard now reads SEE YOU TUESDAY (one bulb is out until the end).
import { HOT, clamp, rgba } from '../../sthot.js'
import { hotEpisode } from './hotsocial.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "it's FORTY FEET. with *my face* on it." }, { who: "pro", text: "same mug. same note. *every* Tuesday." }], verdict: "big moments are fun. | showing up on a Tuesday is *love.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }

const EP = hotEpisode({
  duration: 20, key: 'D',
  take: { text: "Small daily effort beats | one *grand gesture*.", out: [2.5, 2.65] },
  heat: { level: 3, at: -1 },
  pro: castSign('taurus', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { card(x, r.x + r.size * 0.5, r.y - r.size * 0.12, 120, 110, '#ffe14a'); txt(x, 'made', r.x + r.size * 0.5, r.y - r.size * 0.12 - 22, 22, HOT.ink); txt(x, 'you tea', r.x + r.size * 0.5, r.y - r.size * 0.12 + 12, 22, HOT.ink); txt(x, 'xo', r.x + r.size * 0.5, r.y - r.size * 0.12 + 40, 22, HOT.red) } }),
  con: castSign('leo', { x: 770, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Show up on | *Tuesday*.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { if (t < OBJ) return
    const cx = 700, cy = 780, w = 520, h = 210, end = t > T.last + 0.3
    card(x, cx, cy, w, h, '#2a1240', HOT.gold); R(x, '#5a5470', cx - 8, cy + h / 2 + 6, 16, 260)
    for (let i = 0; i < 16; i++) { const bx = cx - w / 2 + 16 + i * 32, on = (i === 5 && !end) ? 0 : (Math.floor(t * 6) + i) % 2; R(x, on ? HOT.gold : '#5a4a20', bx, cy - h / 2 + 8, 12, 12); R(x, on ? HOT.gold : '#5a4a20', bx, cy + h / 2 - 20, 12, 12) }
    txt(x, end ? 'SEE YOU' : 'LOOK AT', cx, cy - 26, 60, end ? '#7fe0ff' : '#ff5fa2'); txt(x, end ? 'TUESDAY' : 'MY LOVE!', cx, cy + 40, 60, end ? '#7fe0ff' : '#ff5fa2') },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 770, y: 960, text: 'it was too quiet. huh.', at: T.last + 0.8, color: '#fff6b0', size: 26 }) },
  cues: [['pop', LAST + 0.3, 1174.66, 0.035, 0.3], ['glitter', LAST + 0.3, LAST + 0.8], ['pop', LAST + 0.8, 880, 0.03, 0.3]],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'Billboards are cute. | *Tuesdays* are love.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.5
