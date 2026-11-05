// kpmae05: PLANET TALK: MARS, Ep 5 · ♌ Leo · "The 40-step ask" (26 s vertical, star_talk, pop · Bb). Hard cut.
// Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-burst through a paper banner ("WILL YOU…"), paper flying; ♌ Leo mid-spotlight cue on a stage.
//        Hook: "LEO. It's ONE question."   0.38 Mars lands (shake).   1.0 Mars: "Leo. What is ALL of this?"
//   3.4  Leo's plan unrolls: THE ASK, 40 STEPS (choir, balloon arch, a 14-minute slideshow…). Leo: "step 1: choir…"
//   7.8  Mars: "Too long. I'm editing." Red strikes rip through the list; it rolls up into a card: "DINNER. FRIDAY. ME?"
//  11.0  Mars: "Three words. No spotlight."  The spotlight clicks off; Leo, nervous, without the glow.
//  13.2  Leo asks ♎ (the crush): "um. dinner… Friday… me?"   16.0 "Yes! …wait, where's the choir?"
//  18.6  ♓ Pisces, the hired choir of one, bursts from the curtain singing and sobbing.   21.2 Mars: "Fine. A choir of ONE."
//  24.6  the punchline slams: "Spotlight optional."  Hold, hard cut at 26.
import {
  makeEpisode, drawSign, entrance, drawEntranceFx, entranceCues, pisces, dust, flash, hearts, rr, txt, panel,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const D = 26
const IN = { at: -0.52, x: 800, y: 600, size: 360 }
const T = { land: 0.38, plan: [3.4, 7.6], cut: [8.4, 10.2], card: 10.4, off: 12.0, crush: 12.6, ask: 13.2, yes: 16.0, pis: 18.6, cardOut: [12.9, 13.2] }
const STEPS = ['choir enters', 'balloon arch', 'slideshow (14 min)', 'fog machine', 'second choir', 'confetti (a LOT)', 'interpretive dance', 'speech, part 1', 'speech, part 2', 'costume change', 'the drumroll', '… 29 more steps', 'THE QUESTION']
const BUB = [
  { t0: 1.0, t1: 3.2, x: 520, y: 980, who: 'mars', text: 'Leo. What is *ALL* of this?', tail: 220, tailUp: true },
  { t0: 4.0, t1: 7.5, x: 640, y: 420, who: 'leo', text: 'step 1: choir. step 2: *balloon arch.*', tail: -160, size: 42, maxW: 620 },
  { t0: 7.8, t1: 10.2, x: 480, y: 330, who: 'mars', text: 'Too long. I’m *editing.*', tail: 220 },
  { t0: 11.0, t1: 12.9, x: 560, y: 980, who: 'mars', text: 'Three words. *No* spotlight.', tail: 220, tailUp: true },
  { t0: 13.3, t1: 15.8, x: 420, y: 980, who: 'leo', text: 'um. dinner… Friday… *me?*', tail: -40, tailUp: false, size: 40 },
  { t0: 16.0, t1: 18.4, x: 620, y: 980, who: 'libra', text: 'Yes! …wait, where’s the *choir?*', tail: 220, tailUp: false },
  { t0: 18.9, t1: 21.0, x: 540, y: 1720, who: 'pisces', text: '♪ AAAAH— *(sob)* ♪', tail: -260, tailUp: true },
  { t0: 21.2, t1: 24.3, x: 540, y: 980, who: 'mars', text: 'Fine. A choir of *ONE.*', tail: 220, tailUp: true },
]
const SHAKE = { at: T.land, len: 0.45, amp: 28 }

function stage(x, t, on) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#1a0c2e'); g.addColorStop(0.7, '#2a1440'); g.addColorStop(0.71, '#5a3328'); g.addColorStop(1, '#3a2018')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // floor boards
  x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 4; for (let i = 0; i < 8; i++) { x.beginPath(); x.moveTo(0, 1365 + i * 75); x.lineTo(1080, 1365 + i * 75); x.stroke() }
  // spotlight on Leo
  if (on > 0.01) {
    x.save(); x.globalAlpha = on
    const sg = x.createLinearGradient(0, 0, 0, 1500); sg.addColorStop(0, 'rgba(255,240,190,0.05)'); sg.addColorStop(1, 'rgba(255,240,190,0.38)')
    x.fillStyle = sg; x.beginPath(); x.moveTo(330, 0); x.lineTo(470, 0); x.lineTo(620, 1470); x.lineTo(180, 1470); x.closePath(); x.fill()
    x.fillStyle = 'rgba(255,240,190,0.35)'; x.beginPath(); x.ellipse(400, 1470, 230, 50, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  // curtains
  for (const s of [-1, 1]) {
    x.save(); x.translate(s < 0 ? 0 : 1080, 0); x.scale(s < 0 ? 1 : -1, 1)
    x.fillStyle = '#a52a2a'; x.beginPath(); x.moveTo(0, 0); x.lineTo(170, 0); x.quadraticCurveTo(120, 800, 150, 1400); x.lineTo(0, 1400); x.closePath(); x.fill()
    x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 6; for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(i * 40, 0); x.quadraticCurveTo(i * 32, 800, i * 38, 1400); x.stroke() }
    x.restore()
  }
  x.fillStyle = '#8c1f1f'; x.fillRect(0, 0, 1080, 120); x.fillStyle = GOLD; x.fillRect(0, 112, 1080, 10)
}
function banner(x, t) {
  // the paper banner Mars bursts through: torn halves + flying scraps
  const p = clamp((t + 0.3) / 1.4)
  if (p >= 1) return
  x.save(); x.globalAlpha = 1 - p
  for (const s of [-1, 1]) {
    x.save(); x.translate(800 + s * (150 + p * 500), 600 + p * 300); x.rotate(s * (0.3 + p * 1.2))
    x.fillStyle = CREAM; x.fillRect(-170, -90, 340, 180); x.fillStyle = RED; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(s < 0 ? 'WILL' : 'YOU…', 0, 0); x.restore()
  }
  for (let i = 0; i < 18; i++) {
    const a = i * 2.4, r = 120 + p * (500 + i * 20)
    x.save(); x.translate(800 + Math.cos(a) * r, 600 + Math.sin(a) * r * 0.8 + p * 200); x.rotate(a + t * 6)
    x.fillStyle = i % 3 ? CREAM : GOLD; x.fillRect(-26, -18, 52, 36); x.restore()
  }
  x.restore()
}
function plan(x, t) {
  if (t < T.plan[0] || t > T.card + 0.4) return
  const open = ease.outCubic(prog(t, T.plan[0], T.plan[0] + 0.8)) * (1 - ease.inCubic(prog(t, T.cut[1], T.card)))
  const h = 80 + 720 * open, X = 420, Y = 1000
  x.save(); x.translate(X, Y)
  x.fillStyle = INK; rr(x, -300, -h / 2 - 8, 600, h + 16, 20); x.fill()
  x.fillStyle = '#fbf3df'; rr(x, -290, -h / 2, 580, h, 14); x.fill()
  x.save(); rr(x, -290, -h / 2, 580, h, 14); x.clip()
  x.fillStyle = RED; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE ASK · 40 STEPS', 0, -h / 2 + 46)
  const scroll = 300 * ease.inOutQuad(prog(t, 5.2, 7.4))
  x.beginPath(); x.rect(-290, -h / 2 + 76, 580, h - 76); x.clip()
  STEPS.forEach((s, i) => {
    const y = -h / 2 + 110 + i * 54 - scroll
    x.fillStyle = INK; x.font = `700 34px ${INTER}`; x.textAlign = 'left'; x.fillText(`${i === 11 ? '' : (i < 11 ? i + 1 : 40) + '. '}${s}`, -250, y)
    const st = T.cut[0] + Math.max(0, i - 5) * 0.15
    if (t > st && i < STEPS.length) {
      const k = ease.outCubic(prog(t, st, st + 0.12))
      x.strokeStyle = RED; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(-260, y + 2); x.lineTo(-260 + 520 * k, y - 4); x.stroke()
    }
  })
  x.restore(); x.restore()
}
function card(x, t) {
  if (t < T.card) return
  const k = pop01(t, T.card, 0.35, 2.2) * outK(t, T.cardOut)
  if (!panel(x, 540, 1000, 760, 200, { k, rot: -0.04, fill: CREAM })) return
  x.fillStyle = RED; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DINNER. FRIDAY. ME?', 0, 4)
  x.restore()
}

function draw(x, t, K) {
  const on = 1 - ease.inOutQuad(prog(t, T.off, T.off + 0.15))
  stage(x, t, on)
  // the crush slides in from the wings
  const cx = lerp(1250, 840, ease.outBack(prog(t, T.crush, T.crush + 0.5)))
  if (t > T.crush) drawSign(x, 'libra', cx, 1330, 250, t, { mood: t < T.yes ? 'neutral' : t < 17.6 ? 'heart' : 'wide', look: [-1, 0], hops: [16.1, 16.5, 16.9, 17.6], shadow: true })
  // Leo
  const lm = t < 3.4 ? 'wide' : t < 7.6 ? 'sparkle' : t < 11 ? 'wide' : t < T.yes ? 'squint' : t < 18.6 ? 'heart' : 'happy'
  drawSign(x, 'leo', 400, 1300, 300, t, { mood: lm, look: t < 3.4 ? [1, -1] : t < 12.6 ? [1, -0.6] : [1, 0], glow: 0.4 + 1.1 * on, hops: [4.1, 4.6, 5.1, 5.6, 13.4, 14.0, 14.6, T.yes + 0.1, T.yes + 0.5], sweat: t > T.off && t < T.yes, squash: t > T.off && t < T.ask ? -0.05 : 0, shadow: true })
  hearts(x, t, T.yes + 0.05, 620, 1230, { n: 14 })
  // Pisces bursts out of the curtain
  if (t > T.pis) {
    const k = ease.outBack(prog(t, T.pis, T.pis + 0.4))
    pisces(x, t, lerp(-120, 150, k), 1480, 220, { look: [1, -0.5], hops: [19.0, 19.3, 19.6, 19.9, 20.3, 20.7], squash: 0.05 * Math.sin(t * 22) })
    x.save(); x.fillStyle = GOLD; x.font = `800 60px ${INTER}`; x.globalAlpha = clamp(prog(t, T.pis + 0.3, T.pis + 0.6))
    for (let i = 0; i < 3; i++) x.fillText('♪', 250 + i * 70 + 10 * Math.sin(t * 3 + i), 1320 - ((t * 120 + i * 60) % 200))
    x.restore()
  }
  plan(x, t)
  card(x, t)
  // Mars
  banner(x, t)
  const P = entrance('zoom', t, IN)
  drawEntranceFx(x, 'mars', 'zoom', t, IN)
  dust(x, t, T.land, 800, 700, { R: 340, seed: 9, col: '#e5573b' })
  const mm = t < 3.4 ? 'angry' : t < 7.8 ? 'wide' : t < 13.2 ? 'angry' : t < T.yes ? 'neutral' : t < 18.6 ? 'happy' : t < 21.2 ? 'wide' : 'proud'
  K.mars(P.x, P.y, P.size, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: mm, look: t < 13 ? [-1, 0.8] : [-0.3, 1], panic: t > 3.4 && t < 7.8, sweat: t > 5 && t < 7.8, hops: [1.1, 1.6, 2.3, 7.9, 8.5, 11.1, 11.7, 21.3, 21.9] })
}
function over(x, t) {
  flash(x, t, T.land, { col: '#fff3d0', d: 0.2, a: 0.7 })
  // the click of the spotlight going off
  if (t > T.off && t < T.off + 0.1) { x.fillStyle = 'rgba(0,0,0,0.4)'; x.fillRect(0, 0, 1080, 1920) }
}

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae05', duration: D, end: 'cut',
  hook: { at: -1, text: 'LEO. It’s *ONE* | question.', out: [3.2, 3.4] },
  bubbles: BUB, draw, over,
  overlays: [screenShake(SHAKE)],
  last: { at: 24.6, text: 'Spotlight | *optional.*', top: 1600, size: 118 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('zoom', IN), ['whoosh', -0.0, 0.5, 0.05], ['crash', 0.05, 0.05],
    ['whoosh', T.plan[0], 0.6, 0.04], ...Array.from({ length: 8 }, (_, i) => ['tick', +(5.2 + i * 0.27).toFixed(2), 0.02]),
    ...STEPS.map((_, i) => ['whoosh', +(T.cut[0] + i * 0.12).toFixed(2), 0.12, 0.02]),
    popCue(T.card, 1174.66, 0.05, 0), ['bell', T.card + 0.05, 1760, 0.03, 0.8, 0],
    ['tick', T.off, 0.08], ['tom', T.off, 55, { gain: 0.15, decay: 0.2 }],
    ['whoosh', T.crush, 0.4, 0.03], popCue(T.yes, 1318.51, 0.05, 0.3), ['glitter', T.yes, T.yes + 0.8],
    ['whoosh', T.pis, 0.3, 0.04], ['bell', T.pis + 0.3, 1318.51, 0.04, 1.4, -0.4], ['bell', T.pis + 0.8, 1567.98, 0.04, 1.4, -0.4], ...sobCues(19.5, 4), ...sobCues(20.6, 3),
  ],
})
