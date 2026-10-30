// guideair (30 s vertical Align ad, Star Talk "Your Star Guide", element pep talk: the air signs) · story 0–25.6, then the end card.
//   0.00  "Air signs, gather round."  On a little pixel cloud, ♊ Gemini, ♎ Libra and ♒ Aquarius are all talking at once
//         ("ok so—", "but what if—", "fun fact—") while paper planes loop round them. Their guide floats above, lantern lit.
//   3.2   AIR · YOUR STAR: "you talk, think and connect. it's a gift."  Chip: the air signs are Gemini, Libra, Aquarius.
//   7.4   "but feelings aren't always words."  The chatter bubbles go quiet: "…"
//  11.0   "sometimes just sit close."  The paper planes land on the cloud one by one; the three scoot together.
//  14.8   Tie-in: TALK CARDS · ANSWERS STAY HIDDEN UNTIL YOU BOTH PLAY. Yours: "when did you feel close to me?" Theirs flips:
//         "when you just sat with me."
//  19.75  card flip · "Less *talk.* More close."  Same cloud as frame 0: no bubbles, three planes parked, three stars snug.
// One canvas (sky + cloud + four stars + planes), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp, el } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO, INTER, GLYPH } from './guidefilm.js'

const AIRC = '#bfe3ff', ACC = '#8fd3ff'
const SIGNS = [
  { ...signStar('gemini'), id: 'gemini', x0: 275, x1: 385, chat: 'ok so—', seed: 2 },
  { ...signStar('libra'), id: 'libra', x0: 540, x1: 540, chat: 'but what if—', seed: 5 },
  { ...signStar('aquarius'), id: 'aquarius', x0: 805, x1: 695, chat: 'fun fact—', seed: 8 },
]
const T = {
  hookOut: [2.7, 3.0], open: 3.0, l1: 3.2, fact: 4.7,
  l2: 7.4, hush: 7.9, l3: 11.0, land: [12.3, 12.75, 13.2], scoot: [13.4, 14.3], close: 14.6,
  tie: 14.8, guideUp: [14.6, 15.1], card2: 15.15, flip: [17.6, 18.0], tieOut: [19.4, 19.65], guideDown: [19.4, 19.9],
  cut: 19.75, last: 19.85, lastLand: 20.3, snug: 22.0, out: [25.15, 25.5],
}
const LINES = [
  { t: T.l1, text: 'you talk, think and connect. it\'s a *gift.*' },
  { t: T.l2, text: "but feelings aren't always *words.*" },
  { t: T.l3, text: 'sometimes just sit *close.*' },
]
const CLOUD = { x: 540, y: 1190 }
const SY = 1080
const K_out = t => 1 - ease.inCubic(prog(t, ...T.out))
const scoot = t => ease.inOutCubic(prog(t, ...T.scoot))

const PLANE = ['W.......', 'WWW.....', 'WWWWW...', 'WWWWWWWW', 'SSSSS...', 'SSS.....', 'S.......']
const PLANE_C = { W: '#f5eedf', S: '#c9c3d8' }

function drawCloud(x, t) {
  const bob = Math.sin(t * 1.2) * 6
  const puffs = [[-330, 10, 120], [-200, -50, 150], [-40, -80, 170], [130, -60, 160], [290, -10, 130], [0, 30, 380]]
  x.save(); x.translate(CLOUD.x, CLOUD.y + bob)
  // ink outline pass, then fill
  for (const pass of [0, 1]) for (const [px, py, r] of puffs) {
    const rr = r + (pass ? 0 : 10)
    x.fillStyle = pass ? '#eef4ff' : INK
    if (py === 30) { x.fillRect(-rr, py - 30 - (pass ? 0 : 10), rr * 2, 110 + (pass ? 0 : 20)); continue }
    // a stepped (pixel) disc
    const c = 12
    for (let j = -rr; j < rr; j += c) { const w = Math.sqrt(Math.max(0, rr * rr - (j + c / 2) * (j + c / 2))); x.fillRect(px - Math.round(w / c) * c, py + j, Math.round(w / c) * c * 2, c) }
  }
  x.fillStyle = '#c9d8f5'; x.fillRect(-380, 90, 760, 20)
  x.restore()
  return bob
}

/** a paper plane on its loop (or landed) */
function planeAt(t, i) {
  const ph = i * 2.1, w = 1.25 + i * 0.15
  const loop = { x: 540 + Math.cos(t * w + ph) * 420, y: 840 + Math.sin(t * w * 2 + ph) * 110 }
  const dx = -Math.sin(t * w + ph), dy = Math.cos(t * w * 2 + ph) * 2 * 120 / 420
  const rest = { x: [300, 540, 780][i], y: CLOUD.y + 60 }
  const p = ease.inOutCubic(prog(t, T.land[i] - 0.7, T.land[i]))
  const slow = 1 - 0.45 * clamp(prog(t, T.hush, T.hush + 1))
  void slow
  return { x: lerp(loop.x, rest.x, p), y: lerp(loop.y, rest.y, p), rot: lerp(Math.atan2(dy, dx), 0, p), flip: dx < 0 && p < 0.5 ? -1 : 1 }
}

function cards(x, t, K) {
  if (t < T.tie) return
  const a = 1 - ease.inCubic(prog(t, ...T.tieOut))
  const p1 = K.pop01(t, T.tie, 0.45, 1.6), p2 = K.pop01(t, T.card2, 0.45, 1.6)
  const fl = prog(t, ...T.flip)
  K.talkCard(lerp(-200, 345, p1), 680, 300, { rot: lerp(-0.5, -0.06, p1), kicker: 'YOUR CARD', text: 'when did you feel close to me?', foot: 'PLAYED ✓', color: ACC, alpha: a })
  const wob = fl <= 0 ? Math.sin(t * 3) * 0.02 : 0
  K.talkCard(lerp(1280, 735, p2), 680, 300, { rot: lerp(0.5, 0.06, p2) + wob, flip: 1 - fl, text: fl < 0.5 ? 'their turn' + '...'.slice(0, 1 + Math.floor(t * 3) % 3) : 'when you just sat with me.', kicker: 'THEIR CARD', foot: fl >= 1 ? 'PLAYED ✓' : '', color: '#e163d6', alpha: a })
  K.sparkles(t, 735, 680, T.flip[1], 12, 260, 0.3, [GOLD, BONE, ACC])
}

function guidePos(t) {
  const up = ease.inOutCubic(prog(t, ...T.guideUp)) * (1 - ease.inOutCubic(prog(t, ...T.guideDown)))
  return { x: lerp(540, 900, up), y: lerp(720, 470, up), size: lerp(240, 150, up) }
}

const F = guideFilm({
  duration: 30, speaker: 'AIR · YOUR STAR', color: AIRC, accent: ACC, glyph: null,
  chip: { label: 'STAR GUIDE · AIR SIGNS · PEP TALK' },
  hook: { text: '*Air* signs, | gather round.', out: T.hookOut },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'THE AIR SIGNS:|GEMINI, LIBRA, AQUARIUS', at: T.fact, dur: T.l2 - T.fact - 0.25, x: 540, y: 1356 },
  heads: [{ text: 'Less *talk.* | More close.', at: T.last, out: T.out, top: 196, size: 120, accentSize: 176, accentColor: ACC, late: 2, lateAt: T.lastLand }],
  dom(root) {
    const cap = el('div', { position: 'absolute', left: 0, width: '1080px', top: '300px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none' }, root, 'TALK CARDS · ANSWERS STAY HIDDEN<br>UNTIL YOU BOTH PLAY')
    return { update(t) { const k = clamp(prog(t, T.tie, T.tie + 0.3)) * (1 - clamp(prog(t, ...T.tieOut))); cap.style.display = k > 0.01 ? 'block' : 'none'; cap.style.opacity = String(k) } }
  },
  guide(t) {
    const g = guidePos(t)
    const mood = t < T.l1 ? { mood: 'happy' } : t < T.l2 ? { mood: 'happy', look: [0, 0.5] } : t < T.l3 ? { mood: 'neutral', look: [0, 0.6] } : t < T.tie ? { mood: 'sparkle', look: [0, 0.6] } : t < T.flip[1] ? { mood: 'neutral', look: [-1, 0.5] } : { mood: 'heart' }
    return { ...g, ...mood, pop: K_out(t), side: 1, glow: 1.2 }
  },
  drawBack(x, t, K) {
    const ko = K_out(t)
    x.save(); x.globalAlpha = ko
    const bob = drawCloud(x, t)
    x.restore()
    // the three signs on the cloud
    if (ko <= 0.01) return
    const sc = scoot(t)
    SIGNS.forEach((s, i) => {
      const talking = t < T.hush
      const mood = t < T.hush ? { mood: i === 1 ? 'happy' : 'neutral', look: [i === 0 ? 1 : i === 2 ? -1 : 0, 0] } : t < T.l3 ? { mood: 'neutral', look: [0, -1] } : t < T.scoot[1] ? { mood: 'happy' } : t < T.snug ? { mood: 'happy' } : { mood: 'sleepy', zzz: false }
      const chatter = talking ? 0.05 * Math.abs(Math.sin(t * (9 + i * 2) + i)) : 0
      const lean = t > T.snug ? Math.sin(t * 1.5 + i) * 0.02 : 0
      K.star({ x: lerp(s.x0, s.x1, sc), y: SY + bob, size: 180, t, color: s.color, glyph: s.glyph, ...mood, seed: s.seed, hops: [], squash: chatter + lean, pop: ko, blush: t > T.scoot[1] })
    })
  },
  drawFront(x, t, K) {
    const ko = K_out(t)
    if (ko > 0.01) {
      // the chatter bubbles (they go quiet), staggered so they flicker like a group chat
      SIGNS.forEach((s, i) => {
        const on = t < T.hush || t < T.l3 - 0.2
        if (!on) return
        const ph = Math.floor(t * 1.6 + i * 0.6) % 3 === i ? 1 : 0.85
        const text = t < T.hush ? s.chat : '…'
        const k = t < T.hush ? ph : K.pop01(t, T.hush + i * 0.15, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.l3 - 0.5, T.l3 - 0.2)))
        K.bubble(lerp(s.x0, s.x1, scoot(t)) + (i - 1) * 20, SY - 170 - (i === 1 ? 50 : 0), text, { size: 36, k: k * ko, color: '#2a2050' })
      })
      // the paper planes
      for (let i = 0; i < 3; i++) {
        const p = planeAt(t, i)
        K.drawBits(PLANE, PLANE_C, p.x, p.y, 7 * ko, { rot: p.rot, flipX: p.flip < 0 })
        K.sparkles(t, p.x, p.y, T.land[i], 6, 60, i, [GOLD, BONE, ACC])
      }
    }
    cards(x, t, K)
  },
  cues: [
    ...Array.from({ length: 14 }, (_, i) => ['pop', +(0.1 + i * 0.19).toFixed(2), [987.77, 1174.66, 1318.51][i % 3], 0.014, (i % 3 - 1) * 0.5]),
    ['whoosh', 0.5, 0.4, 0.02], ['whoosh', 1.7, 0.4, 0.02],
    ...Array.from({ length: 10 }, (_, i) => ['pop', +(3.4 + i * 0.4).toFixed(2), [987.77, 1174.66, 1318.51][i % 3], 0.008, (i % 3 - 1) * 0.5]),
    ['pop', T.hush, 659.25, 0.03, -0.5], ['pop', T.hush + 0.15, 587.33, 0.03, 0], ['pop', T.hush + 0.3, 523.25, 0.03, 0.5],
    ...T.land.flatMap((v, i) => [['whoosh', v - 0.7, 0.6, 0.025], ['tick', v, 0.04], ['pluck', v, [1174.66, 1318.51, 1567.98][i], 0.03, 0.6, (i - 1) * 0.5]]),
    ['whoosh', T.scoot[0], 0.6, 0.025], ['glitter', T.scoot[1] - 0.2, T.scoot[1] + 0.3],
    ['whoosh', T.tie, 0.35, 0.035], ['pop', T.tie + 0.3, 880, 0.035, -0.3], ['whoosh', T.card2, 0.35, 0.035], ['pop', T.card2 + 0.3, 659.25, 0.035, 0.3],
    ['whoosh', T.flip[0], 0.3, 0.03], ['pluck', T.flip[1], 1318.51, 0.045, 0.6, 0.3], ['glitter', T.flip[1], T.flip[1] + 0.4], ['whoosh', T.tieOut[0], 0.35, 0.03],
    ['pluck', T.snug, 1174.66, 0.03, 1.0, 0], ['bell', T.snug + 0.4, 1567.98, 0.02, 1.4, 0],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
