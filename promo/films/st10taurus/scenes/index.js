// st10taurus (60 s vertical, Star Talk season 10 "Little Stars", S10 E02: Taurus) · story 0–55.6, then the shared end card.
// The home-video scrapbook (st10kids.js): the Star Nursery high chair, the Zodiac Academy lunch hall, a night of
// stargazing in the yard, then lunch again.
//   0.00  HOOK  frame 0: "Baby Taurus has *one* food." Baby Taurus in its high chair mid-bite of mashed peas, the Moon
//               (night nurse) holding out a carrot, "AGE 1". Slowly, firmly, it turns away: "no."
//   3.20  WANT  BABY TAURUS: "Peas. Only *peas*. Forever." · ☾ THE MOON: "Just *one* bite of carrot?" ·
//               BABY TAURUS: "I like what I *like*."
//  12.00  TRY   The DAY counter: a new food every day (banana, broccoli, toast, a tiny cake), each refused slowly and
//               firmly, plate pushed away. "AGE 5": the Academy lunch hall, everyone trading snacks, Taurus alone with
//               its peas thermos. KID GEMINI: "Wanna *trade*?" · "…no thank you." Kid Cancer watches, holding a cookie.
//  30.00  TURN  Stargazing at night in the yard with the Moon and Kid Cancer. ☾: "See the *Bull*? That's you."
//               ★ REAL SKY: the Pleiades, the "Seven Sisters", ride on the Bull: a young star cluster, babies by star
//               standards, whose stars formed together. TAURUS: "Baby stars… *together*." CANCER: "Want to try my
//               *cookie*?"
//  42.40  WIN   One slow, suspicious bite: CRUNCH. Sparkle eyes. "…it's *good*." Next day, lunch: Taurus arrives with a
//               basket of snacks for everyone (cookies and peas), a hug with Cancer. "I brought *enough* for everyone."
//  50.60        growUp: Kid Taurus → today's adult Taurus, at the same table spot as frame 0's high chair.
//  52.20  LAST  "Try one *new* thing. Then share it."
// Rewatch bait: the DAY counter's foods all come back in the snack basket at the end; the high chair cushion is the
// same knit throw as adult Taurus' armchair (st9taurushome), and a little monstera sprout sits beside the high chair.
// Callback: Kid Cancer's blanket is the same patchwork as the st9cancercrew blanket fort.
// Ghost: a baby ghost (cell 2) peeks up into the classroom door's window while Taurus eats alone.
import { prog, ease, clamp, lerp, tw } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { buildEndcard, endcardCues, ENDCARD_LEN } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import {
  drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues, drawMoonNurse,
  drawHomeVideo, kidSign, KIDS_FONTS, crayonPow, crayonPowCues, confetti,
} from '../../st10kids.js'

export const DURATION = 60
const KEY = 'Ab'
const STORY_END = DURATION - ENDCARD_LEN        // 55.6
const INK = '#1b1236', BONE = '#efe6d6', PEA = '#8fd16a', PEA_DK = '#5fa047'
const TA = kidSign('taurus'), CA = kidSign('cancer'), GE = kidSign('gemini')
const BABY = TA.tag, KID = TA.kidTag, MOON = '☾ THE MOON', CAN_TAG = CA.kidTag, GEM_TAG = GE.kidTag
const ACC = '#ffd27a'

const T = {
  no: [1.2, 2.9], hookOut: 2.9,
  peas: [3.3, 6.2], moon: [6.4, 8.9], like: [9.1, 11.7],
  days: [12.0, 14.3, 16.6, 18.9], daysEnd: 21.2,
  hall: 21.4, trade: [22.6, 24.8], nothanks: [25.0, 27.2], alone: 27.3,
  night: 30.0, bull: [30.6, 32.9], chip: 33.1, chipDur: 6.0, babies: [36.6, 38.8], cookie: [39.4, 42.2],
  bite: 43.2, good: [44.2, 46.2], lunch: 46.6, basket: 47.0, enough: [47.6, 50.2], hug: 48.6,
  grow: 50.6, last: 52.2, lastLand: 52.6, out: [55.2, 55.55],
  ghost: 28.0,
}
const CUTS_CAM = [T.peas[0], ...T.days, T.hall, T.night, T.lunch]
const FOODS = [['DAY 2', 'banana'], ['DAY 9', 'broccoli'], ['DAY 30', 'toast'], ['DAY 100', 'cake']]
const pop01 = (t, t0, d = 0.3, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 540, y: 812, where: 'a baby ghost (cell 2) peeks up into the classroom door window while Taurus eats its peas alone' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, "800 104px Inter", "italic 500 158px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Baby Taurus has *one* food.', at: 0, out: T.hookOut, top: 320, accentColor: ACC })
  const last = popText(root, 'Try one *new* thing. | Then share it.', { top: 330, size: 104, accentSize: 158, at: T.last, gap: 0.09, accentColor: ACC, wobble: true, late: 3, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const R = Math.round
  const rect = (xx, y, w, h, c) => { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  const txt = (s, xx, y, font, c, align = 'center') => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }
  const disc = (cx, cy, r, c) => { x.fillStyle = c; x.beginPath(); for (let j = -r; j <= r; j += 6) { const w = R(Math.sqrt(Math.max(0, r * r - j * j)) / 6) * 6; x.rect(R(cx - w), R(cy + j - 3), w * 2, 6) } x.fill() }

  // ── props
  const KNIT = ['#c96a4a', '#efe0c2', '#7a9a6a']
  function highChair(cx, cy) {         // a cloud-white high chair; the cushion is adult Taurus' knit throw
    rect(cx - 150, cy - 10, 16, 300, INK); rect(cx + 134, cy - 10, 16, 300, INK); rect(cx - 146, cy - 6, 8, 292, '#fff2f6'); rect(cx + 138, cy - 6, 8, 292, '#fff2f6')
    rect(cx - 130, cy - 200, 260, 220, INK); rect(cx - 122, cy - 192, 244, 204, '#fff6fb')
    for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) rect(cx - 114 + i * 38, cy - 184 + j * 38, 38, 38, KNIT[(i + j) % 3])
    for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) if ((i + j) % 2) rect(cx - 104 + i * 38, cy - 170 + j * 38, 18, 6, 'rgba(255,255,255,0.35)')
  }
  function tray(cx, cy) { rect(cx - 210, cy - 8, 420, 44, INK); rect(cx - 202, cy - 2, 404, 30, '#ffe3f0'); rect(cx - 202, cy - 2, 404, 8, '#ffffff') }
  function peasBowl(cx, cy, k = 1) {
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(-70, -24, 140, 52, INK); rect(-64, -18, 128, 40, '#ffffff'); rect(-64, 10, 128, 12, '#d8e4f0')
    for (let i = 0; i < 9; i++) disc(-48 + (i % 5) * 24, -28 - (i > 4 ? 14 : 0), 12, i % 3 ? PEA : PEA_DK)
    x.restore()
  }
  function spoon(cx, cy, rot, full) {
    x.save(); x.translate(cx, cy); x.rotate(rot)
    rect(-6, 0, 12, 110, INK); rect(-3, 3, 6, 104, '#cfd8ea'); rect(-26, -30, 52, 36, INK); rect(-22, -26, 44, 28, '#e6ecf6')
    if (full) for (let i = 0; i < 3; i++) disc(-12 + i * 12, -32, 9, PEA)
    x.restore()
  }
  function food(kind, cx, cy, k = 1) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(-90, 10, 180, 22, INK); rect(-84, 12, 168, 14, '#ffffff')       // plate
    if (kind === 'carrot') { for (let i = 0; i < 6; i++) rect(-60 + i * 18, -14 + i * 2, 20, 28 - i * 3, i % 2 ? '#ff9a3a' : '#f2852a'); rect(50, -26, 10, 24, '#6fc05a'); rect(60, -30, 10, 20, '#6fc05a') }
    if (kind === 'banana') { for (let i = 0; i < 7; i++) rect(-60 + i * 18, -20 + Math.abs(i - 3) * 6, 20, 22, '#ffe066'); rect(-70, -6, 10, 10, '#6a4a2a') }
    if (kind === 'broccoli') { rect(-10, -10, 20, 26, '#7fbf5a'); disc(-20, -26, 22, '#4f9a3a'); disc(18, -28, 22, '#4f9a3a'); disc(0, -42, 22, '#5faa48') }
    if (kind === 'toast') { rect(-50, -50, 100, 64, INK); rect(-44, -44, 88, 54, '#e8b06a'); rect(-36, -36, 72, 40, '#ffe0a8'); rect(-10, -24, 24, 14, '#fff6d8') }
    if (kind === 'cake') { rect(-44, -40, 88, 54, INK); rect(-38, -34, 76, 44, '#ffd0e0'); rect(-38, -34, 76, 12, '#ffffff'); rect(-4, -62, 8, 24, '#7fd8ff'); rect(-4, -70, 8, 8, '#ffd36e') }
    if (kind === 'cookie') cookie(0, -14, 1)
    x.restore()
  }
  function cookie(cx, cy, k = 1, bitten = false) {
    x.save(); x.translate(cx, cy); x.scale(k, k)
    disc(0, 0, 40, INK); disc(0, 0, 34, '#d99a52'); disc(-6, -6, 26, '#e8b06a')
    for (const [a, b] of [[-14, -10], [10, -16], [12, 10], [-8, 14], [2, -2]]) rect(a - 5, b - 5, 10, 10, '#5a3420')
    if (bitten) { x.globalCompositeOperation = 'destination-out'; disc(30, -24, 20, '#000'); x.globalCompositeOperation = 'source-over' }
    x.restore()
  }
  function thermos(cx, cy) { rect(cx - 30, cy - 70, 60, 100, INK); rect(cx - 24, cy - 64, 48, 88, PEA_DK); rect(cx - 24, cy - 64, 48, 16, PEA); txt('PEAS', cx, cy - 12, "700 16px 'Space Mono', monospace", '#fffaf0') }
  function sprout(cx, cy) {           // the tiny monstera that grows up into adult Taurus' plant
    rect(cx - 36, cy - 10, 72, 60, INK); rect(cx - 30, cy - 4, 60, 48, '#c96a4a'); rect(cx - 30, cy - 4, 60, 10, '#e08a64')
    rect(cx - 3, cy - 60, 6, 52, '#4f8a4a')
    disc(cx - 26, cy - 62, 22, '#5faa58'); disc(cx + 24, cy - 76, 20, '#6fbf62'); rect(cx - 30, cy - 66, 14, 6, '#3f7a3a'); rect(cx + 22, cy - 80, 12, 6, '#3f7a3a')
  }
  function blanketCape(cx, cy, s) {   // Kid Cancer's patchwork blanket (the st9cancercrew fort pattern), worn as a cape
    const P = ['#f2895a', '#f3e8d2', '#3fb6f0', '#ff9fb8', '#c79bff', '#ffe6a8'], c = s / 5
    rect(cx - s * 0.62 - 6, cy - s * 0.2 - 6, s * 1.24 + 12, s * 0.8 + 12, INK)
    for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) rect(cx - s * 0.62 + i * s * 1.24 / 6, cy - s * 0.2 + j * c, s * 1.24 / 6 + 1, c + 1, P[(i * 3 + j * 2) % P.length])
  }
  function bench(cy) { rect(60, cy, 960, 30, INK); rect(66, cy + 4, 948, 20, '#c98f5f'); rect(66, cy + 4, 948, 6, '#e8b078'); rect(120, cy + 30, 18, 90, INK); rect(940, cy + 30, 18, 90, INK) }
  function table(cy) { rect(40, cy, 1000, 40, INK); rect(46, cy + 4, 988, 30, '#e8b878'); rect(46, cy + 4, 988, 8, '#ffd8a0'); rect(100, cy + 40, 20, 120, INK); rect(960, cy + 40, 20, 120, INK) }
  function basket(cx, cy, k) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    rect(-150, -80, 300, 130, INK); rect(-142, -72, 284, 114, '#c98f5f')
    for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) if ((i + j) % 2) rect(-142 + i * 32, -72 + j * 28, 32, 28, '#a8724a')
    x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, -80, 120, Math.PI, 0); x.stroke(); x.strokeStyle = '#c98f5f'; x.lineWidth = 6; x.stroke()
    // the DAY counter's foods + cookies + peas, piled up
    cookie(-90, -96, 0.8); cookie(-30, -110, 0.8); cookie(40, -100, 0.8); peasBowl(100, -96, 0.6)
    x.restore()
  }
  function night(t) {                 // the night sky over the yard: the Bull, Aldebaran and the Pleiades
    const g = x.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#0d0b2e'); g.addColorStop(1, '#2a2468')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    for (let i = 0; i < 90; i++) { const a = (i * 97) % 1080, b = (i * 211) % 1100; x.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 1.3 + i)); rect(a, b, 3, 3, '#fffaf0') } x.globalAlpha = 1
    // the Bull: a crayon-faint figure, the V of the face, the horns, Aldebaran the orange eye
    const pts = { a: [420, 640], b: [470, 610], c: [500, 590], d: [520, 650], e: [470, 690], h1: [700, 440], h2: [640, 560], s: [300, 560] }
    const L = [['h1', 'c'], ['h2', 'd'], ['c', 'b'], ['b', 'a'], ['a', 'e'], ['e', 'd'], ['a', 's']]
    const k = prog(t, T.bull[0], T.bull[0] + 1.2)
    x.strokeStyle = `rgba(255,214,140,${0.6 * k})`; x.lineWidth = 4; x.setLineDash([10, 8]); x.beginPath()
    for (const [p, q] of L) { x.moveTo(...pts[p]); x.lineTo(...pts[q]) } x.stroke(); x.setLineDash([])
    for (const [n, [px, py]] of Object.entries(pts)) { const big = n === 'a'; const c = big ? '#ffb070' : '#fff6e2'; x.globalAlpha = 0.9; rect(px - (big ? 7 : 4), py - (big ? 7 : 4), big ? 14 : 8, big ? 14 : 8, c) } x.globalAlpha = 1
    // the Pleiades on its shoulder: seven bright + a haze of tiny ones, blue
    const pc = [230, 470], kp = 0.5 + 0.5 * prog(t, T.chip - 0.2, T.chip + 0.6)
    const gg = x.createRadialGradient(pc[0], pc[1], 0, pc[0], pc[1], 120); gg.addColorStop(0, `rgba(140,190,255,${0.45 * kp})`); gg.addColorStop(1, 'rgba(140,190,255,0)')
    x.fillStyle = gg; x.fillRect(pc[0] - 130, pc[1] - 130, 260, 260)
    const SEVEN = [[-40, -10], [-14, -30], [10, -16], [34, -26], [20, 10], [-20, 18], [50, 6]]
    SEVEN.forEach(([u, v], i) => { const tw_ = 0.7 + 0.3 * Math.sin(t * 3 + i); x.globalAlpha = tw_; rect(pc[0] + u - 5, pc[1] + v - 5, 10, 10, '#dff0ff'); rect(pc[0] + u - 1, pc[1] + v - 12, 2, 24, '#dff0ff'); rect(pc[0] + u - 12, pc[1] + v - 1, 24, 2, '#dff0ff') })
    for (let i = 0; i < 26; i++) { x.globalAlpha = 0.5; rect(pc[0] + ((i * 37) % 160) - 80, pc[1] + ((i * 53) % 120) - 60, 3, 3, '#cfe4ff') } x.globalAlpha = 1
    if (k > 0.5) { txt('THE BULL', 560, 750, "800 30px Inter", 'rgba(255,214,140,0.9)'); txt('PLEIADES', pc[0], pc[1] + 90, "800 28px Inter", `rgba(190,220,255,${kp})`) }
    // the yard at night: grass, the fence
    rect(0, 1150, 1080, 770, '#2f5a4a'); rect(0, 1150, 1080, 10, '#3f7a5e')
    for (let i = 0; i < 18; i++) { rect(i * 64, 1090, 14, 70, '#8a90b8') } rect(0, 1110, 1080, 8, '#8a90b8'); rect(0, 1136, 1080, 8, '#8a90b8')
    // a picnic blanket on the grass
    rect(140, 1330, 800, 200, INK); for (let j = 0; j < 4; j++) for (let i = 0; i < 16; i++) rect(146 + i * 49.25, 1336 + j * 47, 49.5, 47.5, (i + j) % 2 ? '#c96a4a' : '#efe0c2')
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = vlogCam(t, { cuts: CUTS_CAM, punches: [{ at: T.peas[0], out: T.peas[1], zoom: 1.18, x: 540, y: 1150 }, { at: T.bite, out: T.good[1], zoom: 1.25, x: 560, y: 1230 }, { at: T.chip, out: T.babies[0], zoom: 1.08, x: 300, y: 600 }] })
      x.save(); cam.apply(x)
      const ZS = t < T.hall ? [1.15, 540, 1250] : t < T.night ? [1.3, 540, 900] : t < T.lunch ? [1, 540, 1250] : [1.3, 540, 900]
      const [Z, ZX, ZY] = ZS, zx = v => ZX + (v - ZX) * Z, zy = v => ZY + (v - ZY) * Z
      const said = [], caps = [], say = o => said.push(o), capt = o => caps.push(o)
      x.save(); x.translate(ZX, ZY); x.scale(Z, Z); x.translate(-ZX, -ZY)
      if (t < T.hall) {
        // ── the nursery high chair (frame 0 … the DAY counter)
        drawNursery(x, t, { cribs: false, mobile: true, glow: 1.0 })
        const CX = 540, CY = 1320
        sprout(860, 1470)
        highChair(CX, CY)
        // Baby Taurus: frame 0 mid-bite; then the slow, firm head turn away from every new food
        const refusing = (t > T.no[0] && t < T.no[1]) || T.days.some(d => t > d + 0.9 && t < d + 2.0)
        const turnK = t < T.no[0] ? 0 : t < T.no[1] ? ease.inOutCubic(prog(t, T.no[0], T.no[0] + 1.0)) : 0
        const mood = refusing ? 'squint' : t < T.no[0] ? 'happy' : t >= T.peas[0] && t < T.peas[1] ? 'heart' : t >= T.moon[0] && t < T.moon[1] ? 'pout' : 'neutral'
        drawBabyStar(x, CX, CY - 120, 230, t, { sign: 'taurus', mood, seed: 2, look: refusing ? [-1, 0] : t < T.no[0] ? [0, 1] : [0, 0], flip: turnK > 0.5 || refusing, squash: t < 0.6 ? 0.08 * Math.sin(t * 14) : 0, bob: 3 })
        tray(CX, CY + 10)
        peasBowl(CX - 110, CY - 20)
        // the spoon: frame 0 it's going in full; then resting
        const sp = t < 1.0 ? 1 - prog(t, 0, 1.0) : 0
        spoon(CX + 30 + sp * 20, CY - 60 - sp * 40, -0.4 - sp * 0.5, t < 0.4)
        // the Moon offers a carrot (frame 0 … 12), then each day a new plate slides in and is pushed away
        drawMoonNurse(x, 830, 830, 100, t, { mood: t >= T.moon[0] && t < T.moon[1] ? 'happy' : t > T.like[0] && t < T.like[1] ? 'wide' : 'neutral', look: [-1, 1], hops: [T.moon[0]] })
        if (t < T.days[0]) food('carrot', 760 - 60 * prog(t, 0, 1.2), 1000 + 30 * Math.sin(t * 2), 1)
        T.days.forEach((d, i) => {
          if (t < d || t > d + 2.3) return
          const inK = ease.outCubic(prog(t, d, d + 0.4)), outP = ease.inCubic(prog(t, d + 1.4, d + 2.1))
          food(FOODS[i][1], lerp(1200, CX + 120, inK) + outP * 600, CY - 20, 1)
          crayonPow(x, t, { text: FOODS[i][0], at: d + 0.05, dur: 2.1, x: 540, y: 820, size: 76, color: ['#ffe066', '#9be08a', '#ffb06a', '#ff9ec7'][i], rot: -0.06 })
          crayonPow(x, t, { text: 'no.', at: d + 1.0, dur: 1.0, x: 300, y: 1060, size: 60, color: '#ffd27a', rot: 0.08 })
        })
        say({ text: 'no.', at: T.no[0], out: T.no[1], x: 470, y: 1060, name: BABY, color: ACC, w: 300 })
        say({ text: 'Peas. Only *peas*. Forever.', at: T.peas[0], out: T.peas[1], x: 540, y: 1060, name: BABY, color: ACC, w: 560 })
        say({ text: 'Just *one* bite of carrot?', at: T.moon[0], out: T.moon[1], x: 800, y: 710, name: MOON, color: '#f4ead8', side: -0.3, w: 520 })
        say({ text: 'I like what I *like*.', at: T.like[0], out: T.like[1], x: 540, y: 1060, name: BABY, color: ACC, w: 520 })
        capt({ text: 'AGE 1', at: -0.4, out: T.days[0] - 0.3, size: 64, sub: 'HOME VIDEO · TAPE 1' })
        capt({ text: 'AGE 1 ½', at: T.days[0] + 0.1, out: T.hall - 0.3, size: 64 })
      } else if (t < T.night) {
        // ── the Academy lunch hall: everyone trades, Taurus eats peas alone
        drawAcademy(x, t, { room: 'hall' })
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.6, from: 'below', cell: 2 })
        table(1160)
        // the traders at the left, laughing
        const TR = [['gemini', 330], ['gemini', 430], ['leo', 530], ['aries', 630]]
        TR.forEach(([s, bx], i) => drawBabyStar(x, bx, 1080, 140, t, { sign: s, age: 'kid', mood: i === 1 && t > T.trade[0] && t < T.trade[1] ? 'happy' : 'laugh', seed: 20 + i, look: [i % 2 ? -1 : 1, 0], hops: [T.hall + 0.4 + i * 0.3, T.hall + 2 + i * 0.4] }))
        // snacks flying between them
        for (let k = 0; k < 3; k++) { const ph = ((t - T.hall) * 0.8 + k / 3) % 1; const sx = lerp(330 + k * 100, 430 + k * 100, ph), sy = 960 - Math.sin(ph * Math.PI) * 110; x.save(); x.translate(sx, sy); x.rotate(ph * 6); rect(-14, -10, 28, 20, ['#ffe066', '#ff9ec7', '#7fd8ff'][k]); x.restore() }
        // Taurus at the far right with its thermos
        const mood = t > T.nothanks[0] && t < T.nothanks[1] ? 'squint' : t > T.alone ? 'pout' : 'neutral'
        drawBabyStar(x, 770, 1075, 170, t, { sign: 'taurus', age: 'kid', mood, seed: 2, look: t > T.alone ? [0, 1] : [-1, 0], backpack: true, backpackColor: '#7a9a6a' })
        thermos(870, 1150)
        // Kid Cancer by the lockers, holding a cookie, watching (the setup)
        blanketCape(215, 1090, 110)
        drawBabyStar(x, 215, 1080, 130, t, { sign: 'cancer', age: 'kid', mood: t > T.alone ? 'sparkle' : 'neutral', seed: 4, look: [1, 0] })
        cookie(262, 1130, 0.55)
        table(1160)
        thermos(870, 1150)
        say({ text: 'Wanna *trade*?', at: T.trade[0], out: T.trade[1], x: 430, y: 990, name: GEM_TAG, color: '#f2cf4a', w: 400 })
        say({ text: '…no thank you.', at: T.nothanks[0], out: T.nothanks[1], x: 770, y: 975, name: KID, color: ACC, w: 440, side: -0.5 })
        capt({ text: 'AGE 5', at: T.hall + 0.1, out: T.night - 0.4, size: 64, sub: 'LUNCH · DAY 1' })
      } else if (t < T.lunch) {
        // ── stargazing: the Bull, the Pleiades; the cookie
        night(t)
        drawMoonNurse(x, 830, 1000, 100, t, { mood: 'happy', look: [-1, -1], hops: [T.bull[0]] })
        blanketCape(700, 1300, 150)
        const cMood = t > T.cookie[0] ? 'happy' : 'sparkle'
        drawBabyStar(x, 700, 1280, 200, t, { sign: 'cancer', age: 'kid', mood: cMood, seed: 4, look: t > T.cookie[0] ? [-1, 0] : [0, -1], hops: [T.cookie[0]] })
        const offered = t > T.cookie[0] + 0.3
        const bitten = t > T.bite
        cookie(offered ? lerp(620, 520, ease.outCubic(prog(t, T.cookie[0] + 0.3, T.cookie[0] + 0.8))) : 640, 1330, 0.8, bitten)
        const tMood = t > T.good[0] ? 'heart' : t > T.bite ? 'wide' : t > T.cookie[0] + 1 ? 'squint' : t > T.babies[0] ? 'sparkle' : 'wide'
        const lean = t > T.bite - 0.6 && t < T.bite ? ease.inOutCubic(prog(t, T.bite - 0.8, T.bite)) * 50 : 0
        drawBabyStar(x, 380 + lean, 1270, 230, t, { sign: 'taurus', age: 'kid', mood: tMood, seed: 2, look: t > T.cookie[0] ? [1, 0] : [0, -1], squash: t > T.bite && t < T.bite + 0.6 ? 0.08 * Math.sin((t - T.bite) * 30) : 0 })
        crayonPow(x, t, { text: 'CRUNCH!', at: T.bite, dur: 0.9, x: 520, y: 1080, size: 76, color: '#e8b06a' })
        say({ text: 'See the *Bull*? That’s you.', at: T.bull[0], out: T.bull[1], x: 810, y: 880, name: MOON, color: '#f4ead8', side: -0.5, w: 560 })
        say({ text: 'Baby stars… *together*.', at: T.babies[0], out: T.babies[1], x: 380, y: 1150, name: KID, color: ACC, w: 520 })
        say({ text: 'Want to try my *cookie*?', at: T.cookie[0], out: T.cookie[1], x: 700, y: 1160, name: CAN_TAG, color: '#7fd0f0', side: -0.2, w: 520 })
        say({ text: '…it’s *good*.', at: T.good[0], out: T.good[1], x: 400, y: 1150, name: KID, color: ACC, w: 360 })
        capt({ text: 'SLEEPOVER', at: T.night + 0.2, out: T.lunch - 0.3, size: 56, rot: 0.03, y: 1690 })
      } else {
        // ── lunch again: Taurus brings snacks for everyone
        drawAcademy(x, t, { room: 'hall' })
        const grown = t >= T.grow
        const TR = [['gemini', 130], ['leo', 240], ['aries', 400], ['libra', 930]]
        TR.forEach(([s, bx], i) => drawBabyStar(x, bx, 1080, 130, t, { sign: s, age: 'kid', mood: t > T.basket + 0.3 ? 'heart' : 'wide', seed: 30 + i, look: [bx < 540 ? 1 : -1, 0], hops: [T.basket + 0.3 + i * 0.12, T.hug + i * 0.1] }))
        if (!grown) {
          blanketCape(720, 1090, 110)
          drawBabyStar(x, 720 - (t > T.hug ? 40 : 0), 1080, 140, t, { sign: 'cancer', age: 'kid', mood: t > T.hug ? 'happy' : 'sparkle', seed: 4, look: [-1, 0], hops: [T.hug] })
        }
        const tx_ = t < T.basket ? lerp(1180, 560, ease.outCubic(prog(t, T.lunch, T.basket))) : 560
        if (!grown) drawBabyStar(x, tx_, 1075, 180, t, { sign: 'taurus', age: 'kid', mood: t > T.hug ? 'happy' : 'laugh', seed: 2, look: [-1, 0], flip: true, hops: [T.basket, T.hug] })
        else {
          drawBabyStar(x, 680, 1080, 140, t, { sign: 'cancer', age: 'kid', mood: 'happy', seed: 4, look: [-1, 0], alpha: 1 - prog(t, T.grow, T.grow + 0.8) })
          growUp(x, t, { sign: 'taurus', at: T.grow, x: 540, y: 1060, size: 230, seed: 2, look: [0, 0], caption: ['AGE 5', 'TODAY'] })
        }
        table(1160)
        basket(300, 1150, pop01(t, T.basket - 0.1, 0.35, 2))
        if (t > T.hug && !grown) { const hk = pop01(t, T.hug, 0.3, 2.5); for (let k = 0; k < 3; k++) { const hy = 960 - ((t - T.hug) * 60 + k * 30) % 90; x.globalAlpha = hk; rect(600 + k * 30, hy, 16, 14, '#ff6f8a'); x.globalAlpha = 1 } }
        confetti(x, t, { x: 300, y: 1000, at: T.basket + 0.1, dur: 2.0, n: 40, spread: 360, colors: ['#8fd16a', '#e8b06a', '#ffe066', '#ff9ec7', '#7fd8ff'] })
        crayonPow(x, t, { text: 'SNACKS!', at: T.basket, dur: 1.0, x: 780, y: 860, size: 84, color: '#8fd16a' })
        say({ text: 'I brought *enough* for everyone.', at: T.enough[0], out: T.enough[1], x: tx_, y: 960, name: KID, color: ACC, w: 600 })
        capt({ text: 'LUNCH · DAY 2', at: T.lunch + 0.1, out: T.grow - 0.2, size: 56 })
      }
      x.restore()
      for (const o of said) speechBubble(x, t, { ...o, x: zx(o.x), y: zy(o.y) })
      x.restore()
      for (const o of caps) ageCaption(x, t, o)
      if (t > T.last - 0.3) { x.fillStyle = `rgba(16,9,38,${(0.5 * prog(t, T.last - 0.3, T.last + 0.2)).toFixed(3)})`; x.fillRect(0, 0, 1080, 900) }
      if (cam.flash > 0) { x.fillStyle = `rgba(255,250,240,${(cam.flash * 0.5).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
      factChip(x, t, { label: '★ REAL SKY', text: 'The Pleiades, the “Seven Sisters”, ride on the Bull. It’s a young star cluster, babies by star standards, and its stars formed together.', at: T.chip, dur: T.chipDur, x: 540, y: 1480, color: '#9fd0ff', w: 880, size: 32 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawCrayonFrame(x, t, { alpha: 1 - 0.6 * prog(t, T.last - 0.4, T.last) })
      drawHomeVideo(x, t, { y0: 232, alpha: 1 - prog(t, T.last - 0.4, T.last), date: t < T.hall ? 'APR 20 · TAPE 1' : 'SEP 08 · TAPE 2' })
      hook.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.night, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E02' }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }), ['pop', 0.3, 659.25, 0.03, 0], ['tick', 0.5, 0.02],
  ...speechCues(T.no[0], { pitch: 330 }), ['whoosh', T.no[0], 1.0, 0.015],
  ...speechCues(T.peas[0], { pitch: 392 }), ...speechCues(T.moon[0], { pitch: 523 }), ...speechCues(T.like[0], { pitch: 392 }),
  ...vlogCutCues(CUTS_CAM.filter(c => c !== T.night), { gain: 0.035 }),
  ...T.days.flatMap(d => [...crayonPowCues(d + 0.05, { kind: 'pop' }), ['whoosh', r3(d), 0.4, 0.02], ['pop', r3(d + 1.0), 196, 0.035, 0], ['whoosh', r3(d + 1.4), 0.5, 0.02]]),
  ...ageCaptionCues(T.days[0] + 0.1), ...ageCaptionCues(T.hall + 0.1),
  ...speechCues(T.trade[0], { pitch: 988 }), ...speechCues(T.nothanks[0], { pitch: 392 }), ['tick', T.ghost + 0.05, 0.012],
  ...ageCaptionCues(T.night + 0.2), ...speechCues(T.bull[0], { pitch: 523 }),
  ['glitter', T.chip - 0.2, T.chip + 1.2], ...factChipCues(T.chip, { dur: T.chipDur }),
  ...speechCues(T.babies[0], { pitch: 440 }), ...speechCues(T.cookie[0], { pitch: 784 }),
  ...crayonPowCues(T.bite, { kind: 'bonk' }), ['bell', T.good[0], 1318.51, 0.03, 1.4, 0], ...speechCues(T.good[0], { pitch: 440 }),
  ...ageCaptionCues(T.lunch + 0.1), ...crayonPowCues(T.basket, { kind: 'yay' }), ...speechCues(T.enough[0], { pitch: 440 }),
  ['pop', T.hug, 1046.5, 0.03, 0],
  ...growUpCues(T.grow),
  ['pop', T.last, 523.25, 0.025, 0], ['pop', T.last + 0.09, 659.25, 0.025, 0], ['pop', T.lastLand, 783.99, 0.04, 0], ['bell', T.lastLand, 1046.5, 0.025, 1.8, 0],
  ['whoosh', T.out[0], 0.3, 0.02],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void clamp; void tw; void BONE
