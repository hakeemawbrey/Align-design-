// kcfe14: ZODIAC CONFESSIONAL ep 14, "Left on read: the support group" (17.6 s vertical, music: jazzy · Eb). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: the group-confessional set (three folding chairs in a circle) mid-whip, a red "READ 9:12 PM" stamp
//          mid-SLAM; hook "Left on read. Day *three.*"
//   1.0–7.0   one confession each: ♍ Virgo "I've reread my text *forty ways.*" · ♐ Sagittarius "I'm not waiting. I'm just
//             *near my phone.*" · ♉ Taurus "I made a *casserole* about it."
//   7.2–10.8  PRODUCER: "how do you feel?" · ALL: "like we *said too much.*" (everyone slumps)
//   11.0      a phone buzzes: "sorry!! my phone *died*" → everyone exhales: "…oh." Pisces sobs with joy on the boom.
//   14.1–16.0 Taurus passes the casserole round: "casserole, *anyone?*"
//   16.4      last line "Sometimes the phone *just died.*" holds → hard cut at 17.6.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, RED, INTER, MONO,
  SIGN, seat, boomOp, drawRoom, recChrome, blk, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, notification, notificationCues, screenShake, shakeCues } from '../../hookkit.js'

export const DURATION = 17.6
const P = { virgo: { x: 220, y: 1060, s: 260 }, sagittarius: { x: 540, y: 980, s: 260 }, taurus: { x: 860, y: 1060, s: 260 } }
const T = { vir: 1.0, sag: 3.0, tau: 5.1, prod: 7.2, all: 8.8, buzz: 11.0, oh: 12.3, cass: 14.1, last: 16.4 }
const HOOK = { at: -1, text: 'Left on read. | Day *three.*', top: 150, size: 112, accentColor: RED, out: [2.85, 3.0] }
const WHIP = { at: -0.26, len: 0.5, from: 1.6, blur: 12 }
const SHAKE = { at: 0.02, len: 0.4, amp: 22 }
const NOTE1 = { at: T.buzz, out: [13.9, 14.1], title: 'messages', body: 'sorry!! my phone *died*', glyph: '♌', time: 'now', y: 470 }
const w = id => { const s = SIGN(id); return { who: `${s.glyph}︎ ${s.name}`, color: s.color } }
const CAPS = [
  { t: T.vir, end: 2.9, ...w('virgo'), text: "I've reread my text *forty ways.*" },
  { t: T.sag, end: 5.0, ...w('sagittarius'), text: "I'm not waiting. I'm just *near my phone.*" },
  { t: T.tau, end: 7.0, ...w('taurus'), text: 'I made a *casserole* about it.' },
  { t: T.prod, end: 8.65, kind: 'prod', text: 'how do you feel?' },
  { t: T.all, end: 10.8, who: 'ALL THREE', color: BONE, text: 'like we *said too much.*', accent: '#9fc4ff' },
  { t: T.oh, end: 13.9, who: 'ALL THREE', color: BONE, text: '…*oh.*' },
  { t: T.cass, end: 16.2, ...w('taurus'), text: 'casserole, *anyone?*' },
  { t: T.last, end: 99, who: 'THE GROUP', color: BONE, text: 'Sometimes the phone *just died.*' },
]
const SPEAKER = t => t < T.sag ? 'virgo' : t < T.tau ? 'sagittarius' : t < T.prod ? 'taurus' : t >= T.cass && t < T.last ? 'taurus' : null

function foldChair(x, cx, cy, s, front) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  if (!front) { blk(x, -110, -150, 220, 200, '#4a5a78', { r: 14 }) }
  else { blk(x, -130, 40, 260, 40, '#5a6a88', { r: 8 }); x.fillStyle = INK; x.fillRect(-110, 80, 16, 130); x.fillRect(94, 80, 16, 130) }
  x.restore()
}
function readStamp(x, t) {
  const k = 1 - ease.outCubic(prog(t, -0.3, 0.05)), o = 1 - prog(t, 2.6, 2.9)
  if (o <= 0) return
  x.save(); x.globalAlpha = o; x.translate(540, 600); x.rotate(-0.12); x.scale(1 + k * 1.2, 1 + k * 1.2)
  x.strokeStyle = RED; x.lineWidth = 12; rr(x, -260, -70, 520, 140, 16); x.stroke()
  x.font = `900 76px ${INTER}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('READ 9:12 PM', 0, 4)
  x.restore()
}
function casserole(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  blk(x, -90, -30, 180, 70, '#f4ead8', { r: 18 }); x.fillStyle = '#e8a24a'; rr(x, -76, -26, 152, 30, 10); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-20, -70, 10, 30); x.fillRect(20, -80, 10, 34)
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawRoom(x, t, { wall: '#3a2a4e', floor: '#2a1e2a', window: true, lamp: true })
      // a banner on the wall
      x.save(); x.translate(330, 520); x.rotate(-0.03); blk(x, -230, -46, 460, 92, '#f4ead8', { r: 6, hi: 0, lo: 0 })
      x.font = `900 40px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEFT ON READ · GROUP', 0, 2); x.restore()
      // a rug
      x.fillStyle = '#5a2a3a'; x.beginPath(); x.ellipse(540, 1300, 500, 90, 0, 0, Math.PI * 2); x.fill()
      const slump = t > T.all && t < T.buzz ? 0.12 : 0
      const relief = t > T.oh
      for (const id of ['sagittarius', 'virgo', 'taurus']) {
        const p = P[id]
        foldChair(x, p.x, p.y, 1, false)
        const spk = SPEAKER(t) === id
        let mood = spk ? 'wide' : 'neutral'
        if (id === 'virgo' && t > T.vir && t < T.sag) mood = 'squint'
        if (id === 'taurus' && t > T.tau && t < T.prod) mood = 'sparkle'
        if (t > T.prod) mood = 'neutral'
        if (t > T.all) mood = 'neutral'
        if (t > T.buzz) mood = 'wide'
        if (relief) mood = 'happy'
        if (t > T.cass && id !== 'taurus') mood = 'heart'
        if (t > T.last) mood = 'sparkle'
        const look = t > T.all && t < T.buzz ? [0, 1] : t > T.buzz && t < T.oh ? [id === 'virgo' ? 0 : -1, 1] : t < T.prod && !spk ? [SPEAKER(t) && P[SPEAKER(t)].x < p.x ? -1 : 1, 0] : [0, 0]
        seat(x, t, id, { ...p, hops: spk ? [t - ((t * 2) % 0.7)] : relief ? [T.oh, T.oh + 0.4, T.last + 0.05] : [] }, { mood, look, seed: { virgo: 8, sagittarius: 14, taurus: 9 }[id], squash: slump, sweat: t > T.all && t < T.buzz ? 1 : 0 })
        foldChair(x, p.x, p.y, 1, true)
      }
      // props: Sag hugs a phone, Taurus holds a casserole, Virgo's phone buzzes
      x.fillStyle = INK; rr(x, P.sagittarius.x + 70, P.sagittarius.y + 10, 70, 120, 12); x.fill(); x.fillStyle = '#9fd6ff'; rr(x, P.sagittarius.x + 78, P.sagittarius.y + 18, 54, 104, 8); x.fill()
      const passK = t > T.cass ? ease.inOutCubic(prog(t, T.cass + 0.2, T.cass + 1.4)) : 0
      casserole(x, lerp(P.taurus.x - 20, P.sagittarius.x, passK), lerp(P.taurus.y + 90, P.sagittarius.y + 60, passK) - Math.sin(Math.PI * passK) * 80, pop01(t, T.tau, 0.3, 2))
      const bz = t > T.buzz && t < T.buzz + 1.2 ? Math.sin(t * 70) * 8 : 0
      x.fillStyle = INK; rr(x, P.virgo.x - 150 + bz, P.virgo.y + 40, 70, 120, 12); x.fill(); x.fillStyle = t > T.buzz ? '#7fe0a0' : '#2a2a40'; rr(x, P.virgo.x - 142 + bz, P.virgo.y + 48, 54, 104, 8); x.fill()
      if (relief) sparkles(x, t, 540, 900, T.oh, 14, 380, 1, [PINK, GOLD, BONE])
      readStamp(x, t)
      boomOp(x, t, { tears: relief ? 4 : t > T.all ? 3 : 2, mood: relief ? 'happy' : 'sparkle', mic: [560, 700], op: [930, 560], sway: relief ? 2 : 1 })
      recChrome(x, t, { tc0: 61200, y0: 440 })
      const sp = SPEAKER(t)
      lower.update(t, { k: sp ? 1 : 0, name: sp ? `${SIGN(sp).glyph}︎ ${SIGN(sp).name}` : '', color: sp ? SIGN(sp).color : GOLD, tag: sp === 'virgo' ? '“reread it. again.”' : sp === 'sagittarius' ? '“not waiting (waiting)”' : t > T.cass ? '“feeds the group”' : '“stress-bakes”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, whipZoom(WHIP), slamTitle(HOOK), screenShake(SHAKE), notification(NOTE1)]
export const CUES = [
  ['boom', 0.02, 0.22], ['tom', 0.02, 90, { gain: 0.25, decay: 0.3 }],
  ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...shakeCues(SHAKE), ...notificationCues(NOTE1), ...capCues(CAPS),
  ['riser', T.all - 0.2, T.all + 0.5, 0.02],
  ['whoosh', T.oh, 0.6, 0.04], ['glitter', T.oh, T.oh + 0.5], ['bell', T.oh + 0.05, 1318.5, 0.03, 1.2, 0], ...sobCues(T.oh + 0.2, 4, 0.4),
  ['whoosh', T.cass + 0.2, 0.8, 0.03], ['pop', T.cass + 1.4, 880, 0.035, 0],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
