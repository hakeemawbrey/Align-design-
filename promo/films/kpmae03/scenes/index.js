// kpmae03: PLANET TALK: MARS, Ep 3 · ♊ Gemini · "Fourteen drafts, one send" (24 s vertical, star_talk, chiptune · A).
// Hard cut on the punchline. Look: ../../kpmae01/marskit.js (planetkit Mars + his two moons, hookkit hooks).
//   0.00 frame 0: Mars mid-spin-in, 14 draft bubbles flying round him, ♊ Gemini frozen mid-gasp. Whip zoom.
//        Hook: "GEMINI. Pick. ONE. Draft."   0.55 Mars lands (shake, red dust).
//   0.9  Mars: "FOURTEEN drafts? For one hello?"   2.9 the phone slides up, the drafts fly into it.
//   3.3  Gemini: "they're all slightly different!"   6.0 loading bar "choosing opener… 99%" → error.
//   8.8  Mars swats the drafts away one by one ("Delete. Delete. DELETE.") until one is left.
//  12.6  Gemini: "…okay, that one IS the best one."   14.5 SENT.   16.2 the reply: "YES!! was hoping you'd ask".
//  17.4  ♓ Pisces sends a crying voice note to the group chat and sobs.   20.2 Mars: "Bold isn't fancy. Bold is sent."
//  22.5  the punchline slams: "Fourteen drafts. One send."  Hold, hard cut at 24.
import {
  makeEpisode, drawSign, drawSpace, entrance, drawEntranceFx, entranceCues, pisces, dust, phone, stamp, flash, hearts,
  speedLines, rr, txt, pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { whipZoom, whipZoomCues, screenShake, shakeCues, loadingBar, loadingBarCues } from '../../hookkit.js'

const D = 24
const IN = { at: -0.45, x: 300, y: 640, size: 400 }
const T = { land: 0.55, phoneIn: [-1, -0.5], fly: [2.9, 3.4], swat: 9.7, keep: 12.45, send: 14.5, typing: [15.2, 16.2], reply: 16.2, pis: 17.4, out: [22.2, 22.5] }
const DRAFTS = ['hey', 'heyy', 'hi :)', 'hiii', 'so funny story', 'ok random but', 'hey stranger', 'yo', 'hello!!', 'is this weird', 'how’s ur week', 'hi it’s me', 'heyyy (casual)', 'want to get noodles thursday?']
const KEEP = DRAFTS.length - 1
const PH = { cx: 540, cy: 1480, w: 640, h: 760 }
const BUB = [
  { t0: 0.9, t1: 2.85, x: 520, y: 1010, who: 'mars', text: 'FOURTEEN drafts? For *one* hello?', tail: -160, tailUp: true },
  { t0: 3.3, t1: 5.75, x: 560, y: 1010, who: 'gemini', text: 'they’re all *slightly* different!', tail: 220, tailUp: true },
  { t0: 8.8, t1: 12.3, x: 520, y: 1010, who: 'mars', text: 'Delete. Delete. *DELETE.*', tail: -160, tailUp: true },
  { t0: 12.6, t1: 14.3, x: 560, y: 1010, who: 'gemini', text: '…okay, that one *is* the best one.', tail: 220, tailUp: true },
  { t0: 14.6, t1: 16.0, x: 520, y: 1010, who: 'mars', text: 'SENT! Now *breathe.*', tail: -160, tailUp: true },
  { t0: 17.6, t1: 20.0, x: 560, y: 1010, who: 'pisces', text: 'it’s just NOODLES and I’m *sobbing.*', tail: -200, tailUp: false },
  { t0: 20.1, t1: 22.0, x: 520, y: 1010, who: 'mars', text: 'Bold isn’t fancy. Bold is *sent.*', tail: -160, tailUp: true },
]
const LOAD = { at: 6.0, len: 2.6, label: 'choosing opener…', error: 'Error: 14 drafts, 0 sent', y: 1010 }
const WHIP = { at: 0.12, from: 1.35, blur: 8 }
const SHAKE = { at: T.land, len: 0.45, amp: 30 }

// a draft pill
function pill(x, s, cx, cy, { rot = 0, a = 1, k = 1, sent = false, size = 30 } = {}) {
  if (a <= 0.01 || k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); x.globalAlpha *= a
  x.font = `700 ${size}px ${INTER}`
  const w = x.measureText(s).width + 44, h = size * 1.55
  x.fillStyle = sent ? RED : '#ffffff'; rr(x, -w / 2, -h / 2, w, h, h / 2); x.fill()
  if (!sent) { x.setLineDash([8, 6]); x.strokeStyle = '#9a8fb0'; x.lineWidth = 3; x.stroke(); x.setLineDash([]) }
  x.fillStyle = sent ? '#fff' : INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
  x.restore()
}
const slotY = i => PH.cy - PH.h / 2 + 150 + i * 44.5
const slotX = i => PH.cx + PH.w / 2 - 40 - 130 - (i % 3) * 30

function draw(x, t, K) {
  drawSpace(x, t, { planet: 'mars', seed: 3 })
  speedLines(x, t, 300, 640, 1 - prog(t, 0, 0.6))
  // Mars
  const P = entrance('spin', t, IN)
  drawEntranceFx(x, 'mars', 'spin', t, IN)
  dust(x, t, T.land, 300, 760, { R: 380, seed: 2 })
  const swat = t > T.swat - 0.1 && t < T.keep ? Math.sin((t - T.swat) * 31.4) : 0
  const mood = t < 3 ? 'angry' : t < 6 ? 'wide' : t < T.keep ? 'angry' : t < T.reply ? 'happy' : 'proud'
  K.mars(P.x + swat * 22, P.y, P.size, { rot: P.rot + swat * 0.12, squash: P.squash, alpha: P.alpha, mood, look: [1, 0.6], sweat: t > 6 && t < 8.7, panic: t > 6 && t < 8.7, hops: [9.0, 9.6, 10.3, 11.0, 14.7, 20.3, 20.9] })
  // Gemini
  const gm = t < 3 ? 'wide' : t < 6 ? 'happy' : t < T.keep ? 'wide' : t < T.reply ? 'neutral' : 'heart'
  drawSign(x, 'gemini', 830, 700, 250, t, { mood: gm, look: t < T.fly[0] ? [-1, 0] : [-0.3, 1], hops: [3.4, 3.8, 4.3, 12.7, 13.2, T.reply + 0.1, T.reply + 0.5, T.reply + 0.9], sweat: t > 6 && t < T.keep, squash: t > T.reply && t < T.reply + 0.4 ? 0.12 : 0 })
  // the phone
  const pin = ease.outBack(prog(t, ...T.phoneIn)), pout = ease.inCubic(prog(t, ...T.out))
  const cy = lerp(2500, PH.cy, pin) + pout * 1000
  if (pin > 0) {
    const sentY = slotY(0)
    const msgs = t > T.send ? [] : []
    phone(x, t, { ...PH, cy, title: '♊︎ gemini → them', msgs })
    const dy = cy - PH.cy
    if (t < T.fly[1] + 0.1) {
      const a = 1 - prog(t, T.fly[0], T.fly[1])
      x.save(); x.globalAlpha = a; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = INK; x.font = `800 64px ${INTER}`; x.fillText('DRAFTS: 14', PH.cx, PH.cy - 40 + dy)
      x.fillStyle = RED; x.fillText('SENT: 0', PH.cx, PH.cy + 50 + dy)
      x.restore()
    }
    // drafts (+ the kept one becoming the sent message)
    DRAFTS.forEach((s, i) => {
      if (i === KEEP || t < T.fly[1]) return
      const die = T.swat + (i % 13) * 0.2
      const dk = prog(t, die, die + 0.35)
      if (dk >= 1) return
      pill(x, s, slotX(i) + dk * 700, slotY(i) + dy - dk * 200, { rot: dk * 1.4, a: 1 - dk })
    })
    const mv = ease.inOutCubic(prog(t, T.keep, T.keep + 0.5))
    const kx = lerp(slotX(KEEP), PH.cx + PH.w / 2 - 230, mv), ky = lerp(slotY(KEEP), sentY + 20, mv) + dy
    if (t >= T.fly[1]) pill(x, DRAFTS[KEEP], kx, ky, { sent: t > T.send, k: 1 + 0.15 * Math.sin(Math.PI * prog(t, T.send, T.send + 0.25)), size: t > T.keep ? 34 : 30 })
    if (t > T.send) stamp(x, t, T.send, 'SENT', PH.cx + 150, sentY + 120 + dy, { size: 70 })
    // typing + the reply
    if (t > T.typing[0] && t < T.typing[1]) {
      x.fillStyle = '#fff'; rr(x, PH.cx - PH.w / 2 + 30, sentY + 210 + dy, 130, 64, 28); x.fill()
      for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.globalAlpha = 0.35 + 0.65 * Math.max(0, Math.sin(t * 9 - i)); x.beginPath(); x.arc(PH.cx - PH.w / 2 + 65 + i * 30, sentY + 242 + dy, 9, 0, Math.PI * 2); x.fill() }
      x.globalAlpha = 1
    }
    if (t > T.reply) {
      const k = pop01(t, T.reply, 0.3, 2.4)
      x.save(); x.translate(PH.cx - 60, sentY + 250 + dy); x.scale(k, k)
      x.font = `800 40px ${INTER}`; const w = x.measureText('YES!! was hoping you’d ask').width + 50
      x.fillStyle = '#fff'; rr(x, -w / 2, -38, w, 76, 30); x.fill(); x.strokeStyle = '#d8cfc2'; x.lineWidth = 3; x.stroke()
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YES!! was hoping you’d ask', 0, 2)
      x.restore()
      hearts(x, t, T.reply + 0.05, 830, 700, { n: 12, R: 260 })
    }
    // Pisces's voice note in the group chat
    if (t > T.pis + 0.1) {
      const k = pop01(t, T.pis + 0.1, 0.3, 2.2)
      x.save(); x.translate(PH.cx - 40, sentY + 380 + dy); x.scale(k, k)
      x.fillStyle = '#8fd0ff'; rr(x, -230, -46, 460, 92, 40); x.fill()
      x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText('♓︎ ▶ voice note · 0:47', -200, -10)
      x.font = `700 22px ${MONO}`; x.fillText('(it’s just crying)', -200, 22)
      x.restore()
    }
  }
  // frame 0: the drafts flying round Mars, then into the phone
  if (t < T.fly[1] + 0.05) {
    const k = ease.inOutCubic(prog(t, T.fly[0], T.fly[1]))
    DRAFTS.forEach((s, i) => {
      const a = i / DRAFTS.length * Math.PI * 2 + t * 1.6, R = 330 + 90 * Math.sin(i * 2.3)
      const fx = 540 + Math.cos(a) * R, fy = 860 + Math.sin(a) * R * 0.75
      const tx = slotX(i), ty = slotY(i) + lerp(2500, PH.cy, ease.outBack(prog(t, ...T.phoneIn))) - PH.cy
      if (k >= 1) return
      pill(x, s, lerp(fx, tx, k), lerp(fy, ty, k), { rot: (1 - k) * 0.5 * Math.sin(i * 1.7 + t * 3), size: 30 })
    })
  }
  // Pisces
  if (t > T.pis) {
    const k = pop01(t, T.pis, 0.35, 2) * (1 - ease.inCubic(prog(t, ...T.out)))
    pisces(x, t, 170, 1270, 210, { pop: k, look: [1, -0.3], hops: [T.pis + 0.4, 17.9, 18.3, 18.7, 19.2], squash: t < 20 ? 0.05 * Math.sin(t * 22) : 0 })
  }
}

function over(x, t) {
  flash(x, t, T.land, { col: '#ffd0b0', d: 0.2, a: 0.7 })
  flash(x, t, T.send, { col: '#ffffff', d: 0.12, a: 0.3 })
}

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae03', duration: D, end: 'cut',
  hook: { at: -1, text: 'GEMINI. Pick. | *ONE.* Draft.', out: [2.75, 2.95] },
  bubbles: BUB, draw, over,
  overlays: [whipZoom(WHIP), screenShake(SHAKE), loadingBar(LOAD)],
  last: { at: 22.25, text: 'Fourteen drafts. | One *send.*', top: 1000 },
  cues: [
    ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...entranceCues('spin', IN), ...loadingBarCues(LOAD),
    ['whoosh', T.fly[0], 0.45, 0.04], ...DRAFTS.slice(0, 6).map((_, i) => popCue(T.fly[0] + 0.25 + i * 0.05, 1174.66 + i * 60, 0.02, 0.2)),
    ...Array.from({ length: 13 }, (_, i) => ['whoosh', +(T.swat + i * 0.2).toFixed(2), 0.18, 0.025]),
    ...Array.from({ length: 13 }, (_, i) => popCue(T.swat + i * 0.2 + 0.05, 659.25 + (i % 5) * 70, 0.02, 0.3)),
    ['bell', T.keep + 0.3, 1760, 0.03, 0.8, 0],
    ...thud(T.send), ['whoosh', T.send - 0.1, 0.3, 0.05],
    ['tick', 15.3, 0.02], ['tick', 15.45, 0.02], ['tick', 15.6, 0.02],
    popCue(T.reply, 1318.51, 0.05, -0.2), popCue(T.reply + 0.07, 1567.98, 0.04, -0.2), ['glitter', T.reply, T.reply + 0.7],
    popCue(T.pis, 987.77, 0.04, -0.4), ...sobCues(17.8, 4), ...sobCues(19.0, 3),
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
})
