// nh15e04: HOME FOR THE HOLIDAYS, "Cancer already has a stocking" (30 s vertical, Season 15 ep 4; rows in
// promo/films/next30/b03.md; music dreamy · Eb). Story 0–25.6, then the shared end card. Show look: ../../nh15e01/homekit.js.
//   0.0–6.0    "*Cancer* brings someone | home to *Mom.*"  Frame 0: Cancer mid-pace on the porch, wringing its claws; the
//              Scorpio date holds a gift. CANCER: "what if she's *polite*?" → "polite is *BAD*."
//   6.0        the door flies open. "She hugs | *the date* first."  Mom (Cancer) sweeps past her own kid and hugs the
//              Scorpio. MOM: "you must be *Scorpio*!" Cancer's jaw drops.
//  10.4        inside, by the fire. "Over the | *fireplace…*"  A row of stockings: MOM, GRAN, CANCER… and a brand-new one,
//              already stitched: SCORPIO. Two Cancers cry; the Pisces aunt cries harder.
//  13.6        card cut. "Worried vs. | *ready.*"  THE STARS: "you were *worried*." → "she was *ready*."
//  21.7–25.5   last line "Already | *a stocking.*"
import { makeHome, drawHouse, drawYard, drawRoom, gift, tissueBox, bubble, nameTag, hearts, sparkles, snow, shadow, drawBits, R, INK, BONE, GOLD, PINK, RED, pop01, outK, prog, lerp, clamp, ease, win, stand, tagOf, r3 } from '../../nh15e01/homekit.js'

const CAN = tagOf('cancer'), MOM = '♋︎ MOM', STARS = 'THE STARS'
const T = { door: [6.0, 6.35], hug: [6.5, 7.1], inside: 10.4, sew: 11.7, cut: 13.6, last: 21.7 }
const LINES = [
  { t: 0.9, speaker: CAN, color: '#9fd8f6', text: "what if she's *polite*?" },
  { t: 3.3, speaker: CAN, color: '#9fd8f6', text: 'polite is *BAD*.' },
  { t: 7.5, speaker: MOM, color: '#ffb3c8', text: 'you must be *Scorpio*!' },
  { t: 14.4, speaker: STARS, text: 'you were *worried*.' },
  { t: 17.0, speaker: STARS, text: 'she was *ready*.' },
]
const SCO = '#b04a7a'

const EP = makeHome({
  id: 'nh15e04', duration: 30, hero: 'cancer', date: 'scorpio',
  heads: [
    { text: '*Cancer* brings someone | home to *Mom.*', at: -1, out: [5.8, 6.0], size: 88, accentSize: 120 },
    { text: 'She hugs | *the date* first.', at: T.door[0] + 0.1, out: [10.2, 10.4], accent: PINK },
    { text: 'Over the | *fireplace…*', at: T.inside + 0.1, out: [13.4, 13.6], accent: GOLD },
    { text: 'Worried vs. | *ready.*', at: 13.8, out: [21.45, 21.65], accent: '#9fd8f6' },
    { text: 'Already | *a stocking.*', at: T.last, out: [25.05, 25.45], size: 108, accentSize: 156, late: 2, lateAt: T.last + 0.6, wobble: true },
  ],
  lines: LINES,
  boxes: [{ from: 0, to: 1, close: 5.8 }, { from: 2, to: 2, close: 10.2 }, { from: 3, to: 4, close: 21.5 }],
  flashes: [T.door[0], T.inside], shakes: [],
  cuts: [T.door[0], { t: T.cut, kind: 'flip' }, T.last],
  draw(x, t, K) {
    if (t < T.inside) {
      const op = ease.inOutCubic(prog(t, ...T.door))
      drawHouse(x, t, { open: op, wall: '#4a6a8a', trim: '#3f5d7a', door: '#c04a5a' })
      drawYard(x, t)
      // Cancer paces before the door opens; after, it stands frozen
      const pace = t < T.door[0] ? 0.5 + 0.5 * Math.sin(t * 2.6 - 1.2) : 0.6
      const cx = lerp(200, 380, pace)
      shadow(x, cx, 1350, 190)
      K.hero(x, t, { x: cx, y: stand(240), s: 240, mood: t < T.door[0] ? (t > 3.3 ? 'wide' : 'squint') : t < T.hug[1] ? 'wide' : 'happy', look: t < T.door[0] ? [Math.cos(t * 2.6 - 1.2) > 0 ? 1 : -1, 0.3] : [1, 0], hops: [-0.1, ...K.hops(CAN), T.hug[0] + 0.3], scarf: '#9fd8f6', blink: false })
      // wringing claws: two little pincers bobbing at the front
      if (t < T.door[0]) for (const d of [-1, 1]) drawBits(x, ['C.C', 'CCC', '.C.'], { C: '#ff9aa8' }, cx + d * 40, stand(240) + 60 + 8 * Math.sin(t * 12 + d), 7)
      // the date: holding a gift, then hugged
      const hugged = ease.outCubic(prog(t, ...T.hug))
      const mx = lerp(545, 730, hugged)
      shadow(x, 800, 1350, 180)
      K.date(x, t, { x: 820, y: stand(230), s: 230, mood: t < T.hug[0] ? 'neutral' : 'heart', look: t < T.hug[0] ? [-1, 0] : [-1, 0], hops: [T.hug[0] + 0.05], blush: t > T.hug[0] ? 1 : 0.4 })
      if (t < T.hug[0]) gift(x, 820, stand(230) + 70, 0.9, '#7fd0ff', '#b04a7a')
      if (op > 0.3) K.fam(x, t, 'cancer', { x: mx, y: stand(230), s: 230, pop: pop01(t, T.door[0] + 0.15, 0.35, 2.1), mood: t < T.hug[0] ? 'sparkle' : 'heart', look: [1, 0], tag: 'MOM', hat: PINK, hops: [T.door[0] + 0.3, ...K.hops(MOM)] })
      hearts(x, t, T.hug[1], 780, 1050, { n: 8 })
      snow(x, t, { n: 60 })
      return
    }
    // ── inside: the stockings
    const sk = pop01(t, T.sew, 0.45, 2.6)
    // camera push onto the new stocking, then back out for THE STARS
    const zp = ease.inOutCubic(prog(t, T.inside + 0.3, T.inside + 1.0)) * (1 - ease.inOutCubic(prog(t, 13.0, 13.6)))
    const Z = 1 + 0.75 * zp
    x.save(); x.translate(680, 1010); x.scale(Z, Z); x.translate(-680, -1010 + 60 * zp)
    drawRoom(x, t, { fireX: 540, treeX: 920, windowX: 100, wall: '#5a4a7a', stripe: '#62528a', stockings: [{ col: '#ff9aa8' }, { col: '#9fd8f6' }, { col: GREEN() }, { col: SCO, k: sk }] })
    const names = ['MOM', 'GRAN', 'CANCER', 'SCORPIO']
    names.forEach((n, i) => nameTag(x, n, 540 - 150 + i * 100 - 10, 1090, { size: 17, col: i === 3 ? GOLD : BONE, alpha: i === 3 ? clamp(sk) : 1 }))
    sparkles(x, t, 680, 1000, T.sew + 0.1, 12, 130, 1, [GOLD, PINK, BONE])
    const cry = t > T.sew + 0.6
    shadow(x, 260, 1350, 190); shadow(x, 520, 1350, 190); shadow(x, 760, 1350, 180)
    const c = K.hero(x, t, { x: 270, y: stand(230), s: 230, mood: cry ? 'sparkle' : 'wide', look: [1, -1], tears: cry ? 2 : 0, scarf: '#9fd8f6', hops: [T.sew + 0.6, T.last + 0.3] })
    K.fam(x, t, 'cancer', { x: 510, y: stand(230), s: 230, mood: cry ? 'sparkle' : 'happy', look: [1, -0.6], tears: cry ? 2 : 0, tag: 'MOM', hat: PINK, hops: [T.sew + 0.7] })
    K.date(x, t, { x: 750, y: stand(220), s: 220, mood: t < T.sew + 0.3 ? 'wide' : 'heart', look: [-0.5, -1], blush: 1, hops: [T.sew + 0.4, T.last + 0.4] })
    K.pisces(x, t, { x: 960, y: stand(160), s: 160, tears: cry ? 3 : 2, look: [-1, -0.4], tag: 'AUNT' })
    x.restore()
    if (win(t, 13.7, T.last)) K.stars(x, t, { x: 860, y: 640, s: 170, pop: pop01(t, 13.9, 0.36, 2.1) * outK(t, [21.4, 21.6]), mood: t > 17 ? 'happy' : 'neutral', look: [-1, 0.6], hops: K.hops(STARS) })
    hearts(x, t, T.last + 0.4, 520, 1000, { n: 8 })
    if (t > T.last) sparkles(x, t, 540, 1000, T.last + 0.6, 12, 260, 3)
    void [c, bubble, R, INK, RED]
  },
  cues: [
    ['pop', 0.9, 659.25, 0.02, 0], ['whoosh', T.door[0] + 0.02, 0.5, 0.035], ['pop', T.door[0] + 0.2, 880, 0.04, 0],
    ['pluck', T.hug[0], 1174.66, 0.04, 0.6, 0.3], ['pluck', T.hug[0] + 0.12, 1567.98, 0.035, 0.6, 0.3], ['glitter', T.hug[1], T.hug[1] + 0.5],
    ['riser', T.inside + 0.4, T.sew, 0.02], ['pop', T.sew, 1318.51, 0.05, 0.3], ['bell', T.sew + 0.05, 1760, 0.03, 1.2, 0.3], ['glitter', T.sew, T.sew + 0.5],
    ['pluck', T.sew + 0.7, 2349.32, 0.015, 0.3, 0.6], ['pluck', T.sew + 1.4, 2349.32, 0.015, 0.3, 0.6],
    ['pop', T.last + 0.6, 1174.66, 0.05, 0], ['bell', T.last + 0.65, 1760, 0.03, 1.1, 0], ['glitter', T.last + 0.6, T.last + 1.1],
  ],
})
function GREEN() { return '#9fe6b0' }

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
