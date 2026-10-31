// st12mercury (20 s vertical Align ad, Star Talk season 12 "Hot Takes", EP 17) · story 0–15.6, then the shared end card.
//   🔥 HOT TAKE: "Mercury retrograde didn't make you text your *ex*."  Heat 5.
//   0.00   THE TAKE. A phone glows on a nightstand: a chat with "ex", "u up?" sent. Saturn (left) points at it, squinting.
//   3.10   OBJECTION! Retro, the gold ☿ orb, rolls in spinning backwards. RETRO: "it was me. *sorry.*"
//   5.40   SATURN: "retrograde is an *optical illusion.*"
//   7.90   A little orbit diagram pops over the phone: Mercury laps Earth on the inside track and, seen from Earth, seems
//          to slide backwards. SATURN: "Mercury laps us. it only *looks* backwards."
//  10.80   THE VERDICT: "it's an optical illusion from Earth. the thumbs were yours."
//  13.70   AGREE / DISAGREE? pill.  14.0  last line: "Own the *text*."  A new bubble goes out: "sorry, late text. take care!"
// Real astronomy: apparent retrograde happens when Mercury, on its faster inside orbit, overtakes Earth; nothing reverses.
// No ghost cameo or seed constellation this season. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import {
  hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues,
  drawHotSet, objectionShake, slamShake, loadHotFonts, HOT, easeOutBack, outK, r3, rgba, verdictTimes,
} from '../../sthot.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const KEY = 'Gm'
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CYAN = '#7fdcff', PINK = '#ff8fb1', BLUE = '#5fa8ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const SATN = SATURN.tag, RETN = '☿︎ RETRO'

// ── the beats
const TAKE = { take: 'Mercury retrograde didn’t | make you text your *ex.*', at: 0, out: [2.85, 3.05], accentColor: PINK }
const HEAT = { level: 5, at: 0.5 }
const OBJ = 2.9
const CPS = 34
function chain(lines, t0) {
  let t = t0
  return lines.map(l => { const L = { ...l, t: r3(t) }; t = lineTimes([L], { cps: CPS })[0].done + 1.5; return L })
}
const LINES = chain([
  { speaker: RETN, color: GOLD, text: 'it was me. *sorry.*' },
  { speaker: SATN, color: SATURN.tagColor, text: 'retrograde is an *optical illusion.*' },
  { speaker: SATN, color: SATURN.tagColor, text: 'Mercury laps us. it only *looks* backwards.' },
], OBJ + 0.1)
const LT = lineTimes(LINES, { cps: CPS })
const CLOSE = r3(LT[2].done + 1.5)
const VERDICT = { at: r3(CLOSE + 0.05), text: 'it’s an optical illusion from Earth. | the thumbs were yours.' }
export const TIMING = { lines: LINES.map(l => l.t), done: LT.map(l => r3(l.done)), close: CLOSE, verdict: VERDICT.at, vEnd: verdictTimes(VERDICT.at, VERDICT.text).end }
const PILL = { at: 13.2, dur: 0.6, pick: 'agree' }
const LAST = { text: 'Own the | *text.*', at: 13.75 }
const T = {
  retroIn: [OBJ - 0.05, OBJ + 0.5],
  orbit: [r3(LINES[2].t - 0.15), r3(CLOSE + 0.05)],
  vOut: [r3(PILL.at - 0.15), r3(PILL.at + 0.02)],
  sorry: r3(LAST.at + 0.3),
  out: [STORY_END - 0.45, STORY_END - 0.1],
}
const SAT0 = { x: 205, y: 1100, size: 320 }
const RET0 = { x: 900, y: 1070, r: 100 }
const PH0 = { x: 560, y: 975 }
const STAND = 1225

const SAT_HOPS = [0.3, ...talkHops(LINES, SATN, { cps: CPS })]
const RET_HOPS = talkHops(LINES, RETN, { cps: CPS })

function saturnState(t) {
  if (t < OBJ) return { mood: 'squint', look: [1, 0] }
  if (t < LINES[1].t) return { mood: 'wide', look: [1, 0] }
  if (t < VERDICT.at) return { mood: 'neutral', look: [1, 0] }
  if (t < LAST.at) return { mood: 'neutral', look: [1, -1] }
  return { mood: 'happy' }
}

async function build(stage) {
  await loadHotFonts()
  const root = fill(stage, { background: '#0a0616' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, TAKE)
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: LINES[0].t - 0.2, close: CLOSE, cps: CPS })
  const verdict = verdictCard(root, { ...VERDICT, out: T.vOut })
  const last = popText(root, LAST.text, { top: 250, size: 120, accentSize: 200, at: LAST.at, gap: 0.12, accentColor: HOT.gold, wobble: true })
  const ov = layerCanvas(root), ox = ov.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function glow(cx, cy, r, col, a) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2); x.restore()
  }
  function nightstand() {
    x.save()
    x.fillStyle = INK; x.fillRect(360, STAND - 6, 400, 30); x.fillRect(388, STAND + 20, 344, 120)
    x.fillStyle = '#5a3f2e'; x.fillRect(366, STAND, 388, 18); x.fillStyle = '#7a563c'; x.fillRect(366, STAND, 388, 6)
    x.fillStyle = '#4a3326'; x.fillRect(394, STAND + 24, 332, 110)
    x.fillStyle = '#2e1f17'; x.fillRect(400, STAND + 76, 320, 4); x.fillStyle = GOLD; x.fillRect(548, STAND + 48, 24, 8); x.fillRect(548, STAND + 100, 24, 8)
    x.restore()
  }
  function bubble(bx, by, w, text, mine, k, col = '#4f8cff') {
    if (k <= 0) return
    x.save(); x.translate(bx, by); x.scale(k, k)
    x.fillStyle = mine ? col : '#e8e2f4'; x.beginPath(); x.roundRect(mine ? -w : 0, -22, w, 44, 16); x.fill()
    x.fillStyle = mine ? '#ffffff' : INK; x.font = `700 21px ${MONO}`; x.textAlign = mine ? 'right' : 'left'; x.textBaseline = 'middle'
    x.fillText(text, mine ? -16 : 16, 1)
    x.restore()
  }
  /** the phone on the nightstand: chat with "ex", "u up?" sent; at the end, the owning-it follow-up */
  function phone(t) {
    const W = 300, H = 420, cx = PH0.x, cy = PH0.y
    const tilt = -0.06 + 0.012 * Math.sin(t * 1.3)
    glow(cx, cy, 380, CYAN, 0.55)
    x.save(); x.translate(cx, cy); x.rotate(tilt); x.scale(1.2, 1.2)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-W / 2 - 10, -H / 2 - 10, W + 20, H + 20, 34); x.fill()
    x.fillStyle = '#2b2350'; x.beginPath(); x.roundRect(-W / 2, -H / 2, W, H, 26); x.fill()
    x.fillStyle = '#120c2a'; x.beginPath(); x.roundRect(-W / 2 + 12, -H / 2 + 12, W - 24, H - 24, 18); x.fill()
    // header
    x.fillStyle = '#1f1842'; x.fillRect(-W / 2 + 12, -H / 2 + 12, W - 24, 62)
    x.fillStyle = '#8d86b8'; x.beginPath(); x.arc(-W / 2 + 50, -H / 2 + 43, 17, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('ex', -W / 2 + 80, -H / 2 + 44)
    // messages
    bubble(W / 2 - 26, -40, 150, 'u up?', true, 1)
    x.fillStyle = '#8d86b8'; x.font = `700 16px ${MONO}`; x.textAlign = 'right'; x.fillText('delivered', W / 2 - 28, -6)
    const s = easeOutBack(prog(t, T.sorry, T.sorry + 0.35), 2)
    bubble(W / 2 - 26, 50, 236, 'sorry, late text.', true, s, '#3fbf7f')
    bubble(W / 2 - 26, 104, 152, 'take care!', true, easeOutBack(prog(t, T.sorry + 0.25, T.sorry + 0.6), 2), '#3fbf7f')
    x.restore()
  }
  /** the orbit diagram: Sun in the middle, Mercury on the fast inside track, Earth outside; the sight line from Earth to
   *  Mercury sweeps back while Mercury overtakes (apparent retrograde) */
  function orbit(t) {
    const p = prog(t, ...T.orbit)
    if (p <= 0 || p >= 1) return
    const k = easeOutBack(prog(t, T.orbit[0], T.orbit[0] + 0.35), 2) * (1 - ease.inCubic(prog(t, T.orbit[1] - 0.3, T.orbit[1])))
    const cx = PH0.x, cy = PH0.y - 10, R1 = 70, R2 = 135
    x.save(); x.translate(cx, cy); x.scale(k * 1.3, k * 1.3)
    x.fillStyle = 'rgba(10,6,28,0.94)'; x.beginPath(); x.roundRect(-170, -190, 340, 380, 26); x.fill()
    x.lineWidth = 4; x.strokeStyle = GOLD; x.stroke()
    x.fillStyle = GOLD; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEEN FROM EARTH', 0, -164)
    x.lineWidth = 2; x.strokeStyle = 'rgba(239,230,214,0.35)'
    x.beginPath(); x.arc(0, 10, R1, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 10, R2, 0, Math.PI * 2); x.stroke()
    x.fillStyle = '#ffcc4a'; x.beginPath(); x.arc(0, 10, 18, 0, Math.PI * 2); x.fill()
    const dt = t - T.orbit[0], aE = Math.PI / 2 - 0.5 + dt * 0.35, aM = Math.PI / 2 - 1.4 + dt * 1.3   // Mercury is faster
    const ex = Math.cos(aE) * R2, ey = 10 + Math.sin(aE) * R2, mx = Math.cos(aM) * R1, my = 10 + Math.sin(aM) * R1
    // the sight line from Earth through Mercury
    x.strokeStyle = rgba(PINK, 0.8); x.lineWidth = 3; x.setLineDash([8, 8])
    const dx = mx - ex, dy = my - ey, L = Math.hypot(dx, dy)
    x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex + dx / L * 300, ey + dy / L * 300); x.stroke(); x.setLineDash([])
    x.fillStyle = '#c9b38a'; x.beginPath(); x.arc(mx, my, 11, 0, Math.PI * 2); x.fill()
    x.fillStyle = BLUE; x.beginPath(); x.arc(ex, ey, 14, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `700 15px ${MONO}`
    x.fillText('EARTH', ex, ey + 30); x.fillText('MERCURY', mx, my - 24)
    x.restore()
  }
  /** Retro: a gold pixel orb with the ☿ glyph, spinning backwards (rewind arrows), contrite after its line */
  function retro(t, ok) {
    if (t < T.retroIn[0]) return
    const p = ease.outCubic(prog(t, ...T.retroIn))
    const sorry = t > LINES[0].t + 0.4
    let h = -1e9; for (const v of RET_HOPS) if (v <= t && v > h) h = v
    const hop = t - h < 0.35 ? Math.sin(Math.PI * (t - h) / 0.35) * 18 : 0
    const rx = lerp(1250, RET0.x, p), ry = RET0.y - Math.abs(Math.sin(p * Math.PI * 3)) * 40 * (1 - p) + Math.sin(t * 2.3) * 6 - hop
    const r = RET0.r * ok
    if (r <= 1) return
    glow(rx, ry, r * 3, GOLD, 0.8)
    const spin = -t * (sorry ? 1.2 : 4)
    // rewind arrows orbiting backwards
    for (let i = 0; i < 3; i++) {
      const a = spin + i * Math.PI * 2 / 3, R = r * 1.55
      x.save(); x.translate(rx + Math.cos(a) * R, ry + Math.sin(a) * R); x.rotate(a - Math.PI / 2)
      x.fillStyle = INK; x.fillRect(-12, -12, 24, 24); x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(-9, 0); x.lineTo(0, -9); x.lineTo(0, 9); x.closePath(); x.fill(); x.beginPath(); x.moveTo(1, 0); x.lineTo(10, -9); x.lineTo(10, 9); x.closePath(); x.fill()
      x.restore()
    }
    // the orb: chunky pixel disc
    const c = 8
    x.save(); x.translate(Math.round(rx), Math.round(ry))
    for (let j = -Math.ceil(r / c); j <= Math.ceil(r / c); j++) for (let i = -Math.ceil(r / c); i <= Math.ceil(r / c); i++) {
      const d = Math.hypot(i * c, j * c); if (d > r) continue
      x.fillStyle = d > r - c ? INK : (i + j) < -4 ? '#ffe9a8' : d > r - 3 * c ? '#d9a23a' : '#f2c75c'
      x.fillRect(i * c - c / 2, j * c - c / 2, c, c)
    }
    x.font = `700 ${Math.round(r * 0.8)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('☿︎', 0, r * 0.4)
    const e = Math.max(3, Math.round(r / 12))
    for (const s of [-1, 1]) {
      const ex = s * 3 * e - e / 2, ey = -r * 0.42
      x.fillStyle = INK
      if (sorry) { x.fillRect(ex - e, ey + e, 3 * e, e); x.fillRect(ex - e * 0.5 + s * e * 0.5, ey + 2 * e, 2 * e, e) }   // sheepish
      else { x.fillRect(ex, ey - e, 2 * e, 3 * e); x.fillStyle = '#ffffff'; x.fillRect(ex, ey - e, e * 0.8, e * 0.8) }
    }
    if (sorry) { x.fillStyle = 'rgba(255,143,177,0.75)'; for (const s of [-1, 1]) x.fillRect(s * 6 * e - e, -r * 0.1, 2 * e, e) }
    // a sweat drop while it apologises
    if (sorry && t < VERDICT.at) { x.fillStyle = '#9fe4ff'; x.fillRect(r * 0.6, -r * 0.75 + ((t * 40) % 20), e * 1.5, e * 2.5) }
    x.restore()
  }

  const speakerAt = t => { let sp = null; for (const l of LINES) if (t >= l.t) sp = l.speaker; return t < CLOSE ? sp : null }
  function scene(t) {
    const sh = objectionShake(t, OBJ) + slamShake(t, verdict.slam, 6)
    const ok = 1 - ease.inOutQuad(prog(t, ...T.out))
    x.clearRect(0, 0, 1080, 1920)
    x.save(); x.translate(sh, 0); x.globalAlpha = ok
    const sp = speakerAt(t)
    drawHotSet(x, t, { heat: 0.55 + 0.4 * clamp((t - OBJ) / 0.5), dim: 0.35, spot: sp === SATN ? 'left' : sp === RETN ? 'right' : null })
    nightstand()
    phone(t)
    orbit(t)
    drawSaturn(x, SAT0.x, SAT0.y, SAT0.size, t, { ...saturnState(t), pointer: true, rot: -0.12, hops: SAT_HOPS })
    retro(t, 1)
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

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E17', corners: 'tl bl br' })]

const NOTE = [587.33, 698.46, 783.99, 932.33, 1174.66, 1396.91]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY, level: HEAT.level, meterAt: HEAT.at }),
  ...objectionCues(OBJ, { key: KEY }),
  ['whoosh', T.retroIn[0], 0.5, 0.05], ['pop', T.retroIn[1], 783.99, 0.04, 0.5],
  ['pop', r3(T.orbit[0] + 0.05), 932.33, 0.04, 0], ['pluck', r3(T.orbit[0] + 0.1), 1174.66, 0.04, 0.5, 0],
  ...verdictCues(VERDICT.at, { text: VERDICT.text, key: KEY }),
  ...agreeCues(PILL.at, PILL),
  ...wordPops(LAST.at, 3, 0.12, 1), ['pluck', r3(LAST.at + 0.24), 1396.91, 0.045, 0.6, 0],
  ['pop', T.sorry, 1567.98, 0.04, 0.2], ['pop', r3(T.sorry + 0.25), 1864.66, 0.035, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATN]: 466.16, [RETN]: 1174.66 } }),
  ...endcardCues(STORY_END),
]
