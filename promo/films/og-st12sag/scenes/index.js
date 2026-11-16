// og-st12sag — the OG social cut of st12sag (Star Advice). Same backpack, road sign, cast and ending;
// static HOOK (box) from frame 0 instead of the HOT TAKE stamp, no heat meter / agree pill / episode numeral.
//   0.00   HOOK "Sagittarius scared | of *commitment?*"  Sagittarius (left) with a huge backpack: "packed since birth."
//   2.6    OBJECTION! Taurus: "*unpack* the bag. i'll guard it. forever."
//   last   "Free, | and *here*."  The sign reads ADVENTURES → (FOR 2); Taurus wears a matching backpack: "mine has snacks."
import { hotEpisode } from './hotsocial.js'
import { HOT, clamp, rgba } from '../../sthot.js'
import { hotPlan, castSign, R, bits, bubble } from '../../st12more.js'

const MONO = "'Space Mono', ui-monospace, monospace"
const P = hotPlan({ duration: 15, lines: [{ who: "con", text: "*unpack* the bag. i'll guard it. forever." }], verdict: "freedom and commitment can live | together. talk about *both.*" })
export const OBJ = P.objection, VERDICT_AT = P.VERDICT_AT
const LAST = P.last.at
const txt = (x, s, cx, cy, size, col, align = 'center') => { x.font = `700 ${size}px ${MONO}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(s, cx, cy) }
const card = (x, cx, cy, w, h, fill, border = HOT.ink) => { R(x, border, cx - w / 2 - 6, cy - h / 2 - 6, w + 12, h + 12); R(x, fill, cx - w / 2, cy - h / 2, w, h) }
const PACK = ['.KKKK.', 'KGGGGK', 'KGYYGK', 'KGGGGK', 'KGGGGK', '.KKKK.']

const EP = hotEpisode({
  duration: 15, key: 'Em',
  take: { text: "Sagittarius isn't scared | of *commitment*.", out: [2.5, 2.65] },
  heat: { level: 4, at: -1 },
  pro: castSign('sagittarius', { x: 290, y: 1170, size: 340, seed: 2, draw(x, t, r) { bits(x, PACK, { K: HOT.ink, G: '#3f8a5a', Y: HOT.gold }, r.x - r.size * 0.62, r.y - r.size * 0.25, 16) } }),
  con: castSign('taurus', { x: 770, y: 1170, size: 330, seed: 7, draw(x, t, r, T) { if (t > T.last + 0.3) bits(x, PACK, { K: HOT.ink, G: '#3f8a5a', Y: HOT.gold }, r.x + r.size * 0.32, r.y - r.size * 0.2, 11) } }),
  lines: P.lines, objection: OBJ, verdict: P.verdict, pill: { ...P.pill, pick: 'agree' },
  last: { at: LAST, text: "Free, | and *here*.", gap: 0.1 },
  moods: {},
  back: (x, t, T) => { card(x, 540, 800, 500, 110, '#2a8a4a', HOT.ink)   // og: wider so 'ADVENTURES → (FOR 2)' fits; R(x, '#5a5470', 532, 860, 16, 300)
    txt(x, t > T.last + 0.3 ? 'ADVENTURES → (FOR 2)' : 'ADVENTURES →', 540, 802, 36, '#fffbea') },
  front: (x, t, T, rp, rc) => { bubble(x, t, { x: 290, y: 900, text: 'packed since birth.', at: 0.5, out: T.obj - 0.2, color: '#fffbea', size: 26 }); bubble(x, t, { x: 770, y: 920, text: 'mine has snacks.', at: T.last + 0.6, color: '#ffe0a0', size: 28 }) },
  cues: [['pop', LAST + 0.3, 1318.51, 0.035, 0.3], ['glitter', LAST + 0.3, LAST + 0.8]],
})
export const { SCENES, CUES, DURATION, STORY_END } = EP
export const HOOK = 'Sagittarius scared | of *commitment?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.5
