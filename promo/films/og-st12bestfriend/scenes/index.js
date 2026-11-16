// og-st12bestfriend — the OG social cut of st12bestfriend (Star Advice). Same set, cast, chart and ending; static HOOK
// (outline) from frame 0 instead of the HOT TAKE stamp, no heat meter / agree pill / episode numeral, louder signs.
//   0.00   HOOK "In love with your | *best friend?*"  Cancer (left) clutches a friendship bracelet it made at 3 a.m.
//   2.6    OBJECTION! Capricorn wheels in a RISK chart that says FLEE. Cancer has rehearsed the speech for four years.
//   last   "Ask *kindly*. | Keep the friend."  The chart's bars turn into a heart; "still friends?" "always. chart updated."
import { HOT, clamp, rgba } from '../../sthot.js'
import { hotEpisode } from './hotsocial.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "i ran the risk chart. it says *flee.*" }, { who: "pro", text: "i've rehearsed this for *four years.*" }], verdict: "talk first, kindly. a friendship that | survives the question is *strong.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const BRACE = ['.PYBPYB.', 'P......Y', 'B......P', '.YBPYBP.']

const EP = hotEpisode({
  duration: 20, key: 'Ab',
  take: { text: "Falling for your best friend? | *Worth* the talk.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: castSign('cancer', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { bits(x, BRACE, { P: '#ff8fb1', Y: HOT.gold, B: '#7fe0ff' }, r.x + r.size * 0.28, r.y + r.size * 0.0, 15) } }),
  con: castSign('capricorn', { x: 770, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Ask *kindly*. | Keep the friend.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { const heart = t > T.last + 0.5
    card(x, 740, 820, 320, 220, '#fffbea'); txt(x, heart ? 'STILL FRIENDS' : 'RISK: FLEE', 740, 738, 30, heart ? HOT.ink : HOT.red)
    if (!heart) { [[0.4, HOT.red], [0.8, HOT.orange], [0.55, HOT.gold], [0.9, HOT.red]].forEach(([h, c], i) => R(x, c, 630 + i * 60, 900 - 120 * h, 40, 120 * h)) }
    else bits(x, ['.RR.RR.', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...'], { R: HOT.red }, 698, 770, 12) },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 300, y: 960, text: 'still friends?', at: T.last + 0.4, color: '#ffe0c0' }); bubble(x, t, { x: 740, y: 960, text: 'always. chart updated.', size: 26, at: T.last + 1.0, color: '#d0f0d8' }) },
  cues: [['pop', LAST + 0.4, 987.77, 0.03, -0.3], ['pop', LAST + 1.0, 1318.51, 0.03, 0.3], ['glitter', LAST + 0.5, LAST + 1.0]],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'In love with your | *best friend?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.5
