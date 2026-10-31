// st12textback — Star Talk S12 "Hot Takes" E01 (20 s vertical, music: pop · E). Story 0–15.6, then the end card.
//   0.00–2.85  🔥 HOT TAKE: "Texting back fast | isn't *desperate.*"  ♍ Virgo (left, mid-smirk) holds its phone: a
//              "hey :)" lands and its reply is already sent ("hi!! ✓✓ 0:02"). HEAT 3/5 fills top-right.
//   2.9–5.0    VIRGO: "it buzzed. i replied. i *like* you."  The phone keeps sending little hearts.
//   5.04       OBJECTION! (the drop, a record scratch) ♏ Scorpio slides in from the right with a pixel hourglass.
//   5.3–8.3    SCORPIO: "no. make them *wait.* three days." The hourglass flips; Virgo eye-rolls.
//   8.38       THE VERDICT: the gavel slams. "THE STARS RULE: games make tired people. | reply when you can, *mean it.*"
//   12.27      AGREE / DISAGREE? pill (the cursor taps 🔥).
//   13.38–15.4 "Fast is *fine.* | Fake isn't."  Scorpio's own phone buzzes; it hesitates… and replies fast. Both smile.
// One canvas (the debate set + cast + props), DOM type / box / verdict above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues,
  drawHotSet, objectionShake, slamShake, loadHotFonts, HOT, easeOutBack, outK, r3, rgba,
} from '../../sthot.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const KEY = 'E'
const VIR = signStar('virgo'), SCO = { ...signStar('scorpio'), color: '#9a5cf0' }

// ── the beats
const TAKE = { take: 'Texting back fast | isn’t *desperate.*', at: 0, out: [2.7, 2.9] }
const HEAT = { level: 3, at: 0.55 }
const OBJ = BEAT(8)                               // 5.044, the drop
const SV = `${VIR.glyph}︎ VIRGO`, SS = `${SCO.glyph}︎ SCORPIO`
const CPS = 28
const LINES = [
  { t: 2.95, speaker: SV, color: '#b6f0a0', text: 'it buzzed. i replied. i *like* you.' },
  { t: OBJ + 0.3, speaker: SS, color: '#d88cff', text: 'no. make them *wait.* three days.' },
]
const LT = lineTimes(LINES, { cps: CPS })
const VERDICT = { at: BEAT(14), text: 'games make tired people. | reply when you can, *mean it.*' }
const PILL = { at: BEAT(21), dur: 0.75, pick: 'agree' }
const LAST = { text: 'Fast is *fine.* | Fake isn’t.', at: BEAT(23) }
const T = {
  close: r3(VERDICT.at - 0.1),
  vOut: [r3(PILL.at - 0.2), r3(PILL.at + 0.02)],
  slide: [OBJ - 0.05, OBJ + 0.3],
  flip: [LT[1].chars[16], LT[1].chars[16] + 0.4],
  roll: LT[1].done + 0.1,
  buzz: LAST.at + 0.45, reply: LAST.at + 1.05,
  out: [STORY_END - 0.45, STORY_END - 0.1],
}
const HOPS = {
  vir: [0.35, ...talkHops(LINES, SV, { cps: CPS }), LAST.at + 0.2],
  sco: [OBJ + 0.32, ...talkHops(LINES, SS, { cps: CPS }), T.reply + 0.1],
}
const VIR_P = { x: 300, y: 1060, size: 300 }, SCO_P = { x: 790, y: 1060, size: 290 }

// ── moods: [t, { mood, look, ... }]
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const keyed = (t, K) => { let v = K[0][1]; for (const [k, s] of K) if (t >= k) v = s; return v }
const VIR_K = [
  [0, S_('wink', [1, 0])], [0.9, S_('happy', [1, 0])], [LINES[0].t, S_('happy', [0, 0])], [OBJ, S_('wide', [1, 0], { blink: false })],
  [T.roll, S_('eyeroll')], [T.roll + 1.1, S_('squint', [1, 0])], [VERDICT.at, S_('neutral', [0, -1])], [LAST.at, S_('happy', [1, 0])], [T.reply + 0.15, S_('sparkle', [1, 0])],
]
const SCO_K = [
  [0, S_('squint', [-1, 0])], [LINES[1].t, S_('squint', [-1, 0])], [T.flip[0], S_('wink', [-1, 0])], [T.flip[1] + 0.3, S_('squint', [-1, 0])],
  [VERDICT.at, S_('neutral', [0, -1])], [T.buzz, S_('wide', [0, 1], { blink: false })], [T.buzz + 0.35, S_('neutral', [0, 1])], [T.reply, S_('happy', [0, 1])],
]

// ── local props
const R = (x, c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
function bubble(x, bx, by, w, h, col, txt, { right = false, size = 26, ink = HOT.ink, a = 1 } = {}) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  R(x, HOT.ink, bx - 3, by - 3, w + 6, h + 6); R(x, col, bx, by, w, h)
  R(x, col, right ? bx + w - 14 : bx + 4, by + h, 10, 8)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = ink
  x.fillText(txt, bx + 12, by + h / 2 + 1)
  x.restore()
}
/** a chunky pixel phone; (cx, cy) = its centre; msgs = [{ at, me, text }] chat bubbles appearing on screen */
function drawPhone(x, cx, cy, t, { msgs = [], rot = 0, buzz = 0, k = 1 } = {}) {
  if (k <= 0) return
  const w = 190, h = 300
  x.save(); x.globalAlpha *= k
  x.translate(cx + (buzz ? Math.sin(t * 90) * 5 * buzz : 0), cy); x.rotate(rot)
  R(x, HOT.ink, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, '#3a2a5a', -w / 2, -h / 2, w, h)
  R(x, '#14102a', -w / 2 + 12, -h / 2 + 28, w - 24, h - 60)
  R(x, '#6a5a8a', -24, -h / 2 + 10, 48, 8)
  let y = -h / 2 + 46
  for (const m of msgs) {
    if (t < m.at) continue
    const p = easeOutBack(clamp((t - m.at) / 0.22), 2.4)
    x.font = `700 22px ${MONO}`
    const bw = x.measureText(m.text).width + 24
    const bx = m.me ? w / 2 - 22 - bw : -w / 2 + 20
    x.save(); x.translate(bx + bw / 2, y + 20); x.scale(p, p); x.translate(-(bx + bw / 2), -(y + 20))
    bubble(x, bx, y, bw, 40, m.me ? '#b6f0a0' : '#efe6d6', m.text, { right: m.me, size: 22 })
    x.restore()
    y += 58
  }
  x.restore()
}
function drawHourglass(x, cx, cy, s, t, { flip = 0, k = 1 } = {}) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k; x.translate(cx, cy); x.rotate(Math.PI * ease.inOutCubic(flip))
  const rows = ['KKKKKKKKK', '.KWWWWWK.', '.KSSSSSK.', '..KSSSK..', '...KSK...', '...KWK...', '..KWWWK..', '.KWWSWWK.', '.KWSSSWK.', 'KKKKKKKKK']
  const sand = clamp((t % 3) / 3)
  rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === '.') return; const c = ch === 'K' ? HOT.ink : ch === 'S' ? (j < 5 ? (sand < 0.9 ? HOT.gold : '#fff6d8') : HOT.gold) : '#cfe8ff'; R(x, c, (i - 4.5) * s, (j - 5) * s, s + 0.5, s + 0.5) }))
  x.restore()
}

async function build(stage) {
  await loadHotFonts()
  const root = fill(stage, { background: '#0a0616' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, TAKE)
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: LINES[0].t - 0.2, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { ...VERDICT, out: T.vOut })
  const last = popText(root, LAST.text, { top: 250, size: 112, accentSize: 160, at: LAST.at, gap: 0.12, accentColor: HOT.gold, wobble: true })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  void el

  function scene(t) {
    const sh = objectionShake(t, OBJ) + slamShake(t, verdict.slam, 6)
    const fade = 1 - ease.inOutQuad(prog(t, ...T.out))
    x.clearRect(0, 0, 1080, 1920)
    x.save(); x.translate(sh, 0); x.globalAlpha = fade
    const speaking = t >= LINES[1].t && t < T.close ? 'right' : t >= LINES[0].t && t < LINES[1].t ? 'left' : null
    drawHotSet(x, t, { heat: 0.35 + 0.4 * clamp((t - OBJ) / 0.5), dim: 0.35, spot: speaking })
    // ♍ Virgo + its phone
    const vs = keyed(t, VIR_K)
    const vr = drawStarChar(x, VIR_P.x, VIR_P.y, VIR_P.size, t, { color: VIR.color, glyph: VIR.glyph, ...vs, hops: HOPS.vir, seed: 3, squash: t > OBJ && t < OBJ + 0.4 ? -0.08 : 0 })
    const msgs = [{ at: -1, me: false, text: 'hey :)' }, { at: -1, me: true, text: 'hi!! ✓✓' }, { at: 3.6, me: true, text: '♡' }, { at: LAST.at + 0.2, me: true, text: 'same ♡' }]
    drawPhone(x, vr.x + 175, vr.y + 30, t, { msgs, rot: 0.14 + 0.03 * Math.sin(t * 2), k: 1 })
    x.font = `700 20px ${MONO}`; x.fillStyle = rgba(HOT.bone, 0.75); x.textAlign = 'center'
    if (t < TAKE.out[1]) x.fillText('REPLIED IN 0:02', vr.x + 175, vr.y + 215)
    // ♏ Scorpio slides in on the objection
    const inK = ease.outBack ? ease.outBack(prog(t, ...T.slide)) : easeOutBack(prog(t, ...T.slide), 1.6)
    if (t >= T.slide[0]) {
      const ss = keyed(t, SCO_K)
      const sx = lerp(1300, SCO_P.x, inK)
      const sr = drawStarChar(x, sx, SCO_P.y, SCO_P.size, t, { color: SCO.color, glyph: SCO.glyph, ...ss, hops: HOPS.sco, seed: 8, squash: t < T.slide[1] + 0.2 ? 0.1 * Math.sin((t - OBJ) * 20) * (1 - prog(t, OBJ, OBJ + 0.5)) : 0 })
      if (t < LAST.at) drawHourglass(x, sr.x - 150, sr.y + 30, 9, t, { flip: prog(t, ...T.flip) })
      else drawPhone(x, sr.x - 165, sr.y + 30, t, { msgs: [{ at: -1, me: false, text: 'hi ♡' }, { at: T.reply, me: true, text: 'hi!! ✓✓' }], rot: -0.14, buzz: t > T.buzz && t < T.buzz + 0.5 ? 1 : 0, k: easeOutBack(prog(t, LAST.at, LAST.at + 0.3), 2) })
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      scene(t)
      stamp.update(t)
      box.update(t)
      verdict.update(t)
      last.update(t, t < LAST.at ? 0 : outK(t, T.out))
      ox.clearRect(0, 0, 1080, 1920)
      heatMeter(ox, t, { ...HEAT, out: [VERDICT.at - 0.2, VERDICT.at] })
      objection(ox, t, { at: OBJ, x: 560, y: 760 })
      agreePill(ox, t, PILL)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E01', corners: 'tl bl br' })]

const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY, level: HEAT.level, meterAt: HEAT.at }),
  ['pop', 3.6, 1318.51, 0.03, -0.3],
  ...objectionCues(OBJ, { key: KEY }), ['whoosh', T.slide[0], 0.35, 0.05],
  ['whoosh', T.flip[0], 0.3, 0.03], ['tick', r3(T.flip[1]), 0.04], ['pop', r3(T.roll), 330, 0.03, -0.3],
  ...verdictCues(VERDICT.at, { text: VERDICT.text, key: KEY }),
  ...agreeCues(PILL.at, PILL),
  ...wordPops(LAST.at, 5, 0.12, 1), ['pluck', r3(LAST.at + 0.12), 1174.66, 0.04, 0.6, 0],
  ['pop', r3(LAST.at + 0.2), 1318.51, 0.03, -0.3], ['tick', r3(T.buzz), 0.03], ['tick', r3(T.buzz + 0.08), 0.03], ['tick', r3(T.buzz + 0.16), 0.03],
  ['pluck', r3(T.reply), 1567.98, 0.04, 0.5, 0.3], ['glitter', r3(T.reply), r3(T.reply + 0.5)],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [SV]: 987.77, [SS]: 659.25 } }),
  ...endcardCues(STORY_END),
]
