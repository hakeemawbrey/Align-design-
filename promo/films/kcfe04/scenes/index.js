// kcfe04: ZODIAC CONFESSIONAL ep 4, "Cancer still has the hoodie" (17 s vertical, music: lofi · F). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Cancer mid-sniff of an oversized grey hoodie, red CAUGHT circle already on it ("THE EX'S HOODIE");
//          hook "Cancer kept the ex's *hoodie.*"
//   0.55   record scratch + freeze: "it's *just* a hoodie."
//   2.0–6.3   B-ROLL: a lit shelf "museum": the hoodie on a hanger, a ticket stub, a mug, one sock, each with a plaque.
//             "it's a shelf. it's a *small museum.*"
//   6.4–10.8  booth. PRODUCER: "do you miss them?" · "I miss who I was *in it.*" Pisces bawls on the boom.
//   11.0–14.3 Cancer folds the hoodie into a box labelled GIVE BACK: "folding it. *gently.*"
//   15.9      last line "I can miss it *and* give it back." holds → hard cut at 17.0.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  clamp, lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER, SERIF,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawRoom, recChrome, blk, rr, sparkles, step, wob, pop01,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, caught, caughtCues } from '../../hookkit.js'

export const DURATION = 17
const CAN = SIGN('cancer')
const T = { scratch: 0.55, broll: [2.0, 6.4], plaques: [2.5, 3.2, 3.9, 4.6], booth2: 6.4, miss: 8.4, bawl: 8.9, box: [11.0, 11.4], fold: [11.6, 13.2], drop: [13.2, 13.7], last: 15.9 }
const HOOK = { at: -1, text: 'Cancer kept | the ex’s *hoodie.*', top: 150, size: 104, accentColor: CAN.color, out: [1.85, 2.0] }
const CAUGHT = { at: -1, x: 690, y: 990, r: 190, label: 'EX’S HOODIE', arrow: 'bl', rec: false, out: [0.5, 0.55] }
const REC = { at: T.scratch, len: 1.3, caption: 'it’s *just* a hoodie.', sub: 'cancer, allegedly', top: 1560 }
const WHIP2 = { at: T.broll[0] - 0.04, len: 0.4, from: 1.5 }, WHIP3 = { at: T.booth2 - 0.04, len: 0.4, from: 1.5 }
const WHO = `${CAN.glyph}︎ CANCER`
const CAPS = [
  { t: 4.95, end: 6.3, who: WHO, color: CAN.color, text: "it's a shelf. it's a *small museum.*" },
  { t: 6.65, end: 8.2, kind: 'prod', text: 'do you miss them?' },
  { t: T.miss, end: 10.85, who: WHO, color: CAN.color, text: 'I miss who I was *in it.*' },
  { t: 11.4, end: 14.3, who: WHO, color: CAN.color, text: 'folding it. *gently.*' },
  { t: T.last, end: 99, who: WHO, color: CAN.color, text: 'I can miss it *and* give it back.' },
]
const PLAQUES = ['THE HOODIE', 'ONE (1) TICKET STUB', 'THEIR MUG', 'A SOCK. JUST ONE.']

function hoodie(x, cx, cy, s, { fold = 0, rot = 0 } = {}) {
  const g = '#9aa3b5', d = '#7c8498'
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (fold < 0.5) {
    const k = 1 - fold * 1.2
    // sleeves
    blk(x, -170 * k - 40, -60, 80, 220 * k, d, { r: 30, ink: 6 })
    blk(x, 170 * k - 40, -60, 80, 220 * k, d, { r: 30, ink: 6 })
    // hood
    blk(x, -80, -170, 160, 120, d, { r: 60, ink: 6 })
    // body
    blk(x, -130 * k, -90, 260 * k, 290 * k, g, { r: 30, ink: 6 })
    x.fillStyle = d; rr(x, -80 * k, 60 * k, 160 * k, 70 * k, 14); x.fill()
    x.fillStyle = BONE; x.fillRect(-26, -86, 6, 70); x.fillRect(20, -86, 6, 70)
  } else {
    const k = 1 - (fold - 0.5) * 0.6
    blk(x, -120 * k, -70 * k, 240 * k, 140 * k, g, { r: 16, ink: 6 })
    x.fillStyle = d; x.fillRect(-120 * k, -6, 240 * k, 12)
  }
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function giveBox(t, k) {
    if (k <= 0.01) return
    x.save(); x.translate(250, 1130); x.scale(k, k)
    blk(x, -150, -90, 300, 180, '#c89a5a', { r: 6 })
    x.fillStyle = '#a87a3a'; x.fillRect(-150, -90, 300, 26)
    blk(x, -100, -30, 200, 64, BONE, { r: 4, ink: 4, hi: 0, lo: 0 })
    x.font = `900 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GIVE BACK', 0, 3)
    x.restore()
  }

  function booth(t) {
    drawBooth(x, t, { sign: 'cancer' })
    const mood = step(t, [[-1, 'sparkle'], [T.scratch, 'wide'], [T.booth2, 'neutral'], [T.miss, 'neutral'], [T.box[0], 'neutral'], [T.drop[1], 'happy'], [T.last, 'sparkle']])
    const look = step(t, [[-1, [1, 0]], [T.booth2, [0, 0]], [T.miss, [0, 1]], [T.box[0], [-1, 1]], [T.drop[1], [0, 0]]])
    const F = seat(x, t, 'cancer', { ...SUBJ, hops: [8.45, 9.1, 11.45, 12.1, T.last + 0.05] }, { mood, look, seed: 5, tears: t > T.miss && t < T.box[0] ? 1 : 0 })
    // the hoodie: held to the face, then on the lap, then folded into the box
    if (t < T.booth2) hoodie(x, SUBJ.x + 175, F.cy + 30 + Math.sin(t * 4) * 6, 0.85, { rot: -0.35 })
    else if (t < T.drop[1]) {
      const fold = ease.inOutCubic(prog(t, ...T.fold)), dp = ease.inCubic(prog(t, ...T.drop))
      const cx = lerp(lerp(SUBJ.x + 40, SUBJ.x - 40, fold), 250, dp), cy = lerp(F.cy + 160, 1080, dp)
      hoodie(x, cx, cy, lerp(0.75, 0.6, fold), { fold, rot: lerp(0.05, 0, fold) })
    }
    drawChairFront(x)
    giveBox(t, easeOutBack(prog(t, ...T.box), 1.6))
    if (t > T.drop[1]) sparkles(x, t, 250, 1040, T.drop[1], 10, 150, 1, [GOLD, BONE, PINK])
    const bawl = t > T.bawl && t < T.last
    boomOp(x, t, { tears: bawl ? 4 : 2, mood: t > T.drop[1] ? 'happy' : 'sparkle', sway: bawl ? 2.2 : 1 })
    recChrome(x, t, { tc0: 11220, y0: 440 })
  }

  function broll(t) {
    x.save(); x.translate(wob(t, 1.2, 6, 1), wob(t, 1, 5, 2))
    drawRoom(x, t, { wall: '#2c3a5a', floor: '#1a1e30', window: false, lamp: false })
    // museum spotlights
    for (const sx of [200, 540, 880]) { const g = x.createRadialGradient(sx, 760, 0, sx, 760, 330); g.addColorStop(0, 'rgba(255,240,200,0.25)'); g.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = g; x.fillRect(sx - 340, 380, 680, 900) }
    // shelf
    blk(x, 60, 1000, 960, 40, '#8a5a3a', { r: 4 })
    blk(x, 60, 640, 960, 30, '#8a5a3a', { r: 4 })
    // items
    const show = i => pop01(t, T.plaques[i], 0.3, 2)
    hoodie(x, 290, 840, 0.62 * show(0))
    if (show(0) > 0) { x.fillStyle = INK; x.fillRect(282, 690, 16, 40) }
    const k1 = show(1); if (k1 > 0) { x.save(); x.translate(640, 590); x.scale(k1, k1); x.rotate(0.1); blk(x, -80, -36, 160, 72, '#f2c06a', { r: 4 }); x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ADMIT ONE', 0, 2); x.restore() }
    const k2 = show(2); if (k2 > 0) { x.save(); x.translate(650, 935); x.scale(k2, k2); blk(x, -60, -60, 120, 120, '#e8e0f0', { r: 10 }); x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(72, 0, 30, -1.2, 1.2); x.stroke(); x.fillStyle = PINK; x.fillRect(-20, -12, 40, 30); x.restore() }
    const k3 = show(3); if (k3 > 0) { x.save(); x.translate(880, 940); x.scale(k3, k3); x.rotate(-0.2); blk(x, -26, -70, 52, 100, '#ff9a5a', { r: 8 }); blk(x, -26, 10, 90, 50, '#ff9a5a', { r: 18 }); x.restore() }
    // plaques
    x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    ;[[290, 1080], [640, 690], [650, 1080], [880, 1080]].forEach(([px, py], i) => {
      const k = show(i); if (k <= 0) return
      x.save(); x.translate(px, py); x.scale(k, k)
      const w = x.measureText(PLAQUES[i]).width + 30
      blk(x, -w / 2, -22, w, 44, '#c9a24a', { r: 4, ink: 4, hi: 0, lo: 0 }); x.fillStyle = INK; x.fillText(PLAQUES[i], 0, 2)
      x.restore()
    })
    // Cancer peeks in, tearful, bottom right; Pisces' boom drifts in
    seat(x, t, 'cancer', { x: 860, y: 1330, s: 230, pop: pop01(t, 3.0, 0.4, 2) }, { mood: 'sparkle', look: [-1, -1], tears: 1, seed: 5 })
    boomOp(x, t, { tears: 3, mic: [700, 1150], op: [980, 1000], size: 140 })
    x.restore()
    recChrome(x, t, { label: 'B-ROLL', tc0: 3410, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const inB = t >= T.broll[0] && t < T.broll[1]
      if (inB) broll(t); else booth(t)
      lower.update(t, { k: inB ? 0 : t < T.booth2 ? 1 : pop01(t, T.booth2 + 0.1, 0.4, 1.2), name: WHO, color: CAN.color, tag: t < T.drop[1] ? '“totally over it”' : '“getting there”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), slamTitle(HOOK), caught(CAUGHT), recordScratch(REC), whipZoom(WHIP2), whipZoom(WHIP3)]
export const CUES = [
  ['boom', 0.02, 0.15], ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...whipZoomCues(WHIP2), ...whipZoomCues(WHIP3), ...capCues(CAPS),
  ...T.plaques.map((p, i) => ['bell', p, [1046.5, 1174.66, 1318.5, 1567.98][i], 0.03, 0.8, (i - 1.5) * 0.3]),
  ...sobCues(T.bawl, 4, 0.45),
  ['pop', T.box[0] + 0.1, 659.25, 0.035, -0.3], ['whoosh', T.fold[0], 0.5, 0.02], ['tom', T.drop[1], 120, { gain: 0.2, decay: 0.25 }], ['glitter', T.drop[1], T.drop[1] + 0.4],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
