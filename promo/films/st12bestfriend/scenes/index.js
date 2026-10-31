// st12bestfriend — Star Talk S12 "Hot Takes" E39 (20 s vertical, music: dreamy · Ab). Story 0–15.6, then the end card.
//   0.00   🔥 HOT TAKE "Falling for your best | friend? *Worth* the talk."  ♋ Cancer (left, mid-smirk) holds a friendship
//          bracelet. HEAT 4/5.
//   2.6    OBJECTION! ♑ Capricorn wheels in a RISK chart. Two lines, THE VERDICT.
//   last   "Ask *kindly*. | Keep the friend."  The chart's bars turn into a heart (rewatch bait); "still friends?" "always."
import { hotEpisode, HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 20, lines: [{ who: "con", text: "my risk chart says *maybe not.*" }, { who: "pro", text: "charts don't know *my* friend." }], verdict: "talk first, kindly. a friendship that | survives the question is *strong.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const BRACE = ['.PYBPYB.', 'P......Y', 'B......P', '.YBPYBP.']

const EP = hotEpisode({
  numeral: 'S12 E39', duration: 20, key: 'Ab',
  take: { text: "Falling for your best friend? | *Worth* the talk.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: castSign('cancer', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { bits(x, BRACE, { P: '#ff8fb1', Y: HOT.gold, B: '#7fe0ff' }, r.x + r.size * 0.28, r.y + r.size * 0.0, 15) } }),
  con: castSign('capricorn', { x: 800, y: 1170, size: 330, seed: 7 }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Ask *kindly*. | Keep the friend.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { const heart = t > T.last + 0.5
    card(x, 760, 820, 320, 220, '#fffbea'); txt(x, heart ? 'STILL FRIENDS' : 'RISK', 760, 738, 30, HOT.ink)
    if (!heart) { [[0.4, HOT.red], [0.8, HOT.orange], [0.55, HOT.gold], [0.9, HOT.red]].forEach(([h, c], i) => R(x, c, 650 + i * 60, 900 - 120 * h, 40, 120 * h)) }
    else bits(x, ['.RR.RR.', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...'], { R: HOT.red }, 718, 770, 12) },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 290, y: 900, text: 'still friends?', at: T.last + 0.4, color: '#ffe0c0' }); bubble(x, t, { x: 800, y: 900, text: 'always.', at: T.last + 1.0, color: '#d0f0d8' }) },
  cues: [['pop', LAST + 0.4, 987.77, 0.03, -0.3], ['pop', LAST + 1.0, 1318.51, 0.03, 0.3], ['glitter', LAST + 0.5, LAST + 1.0]],
})
export const { SCENES, CUES, DURATION } = EP
