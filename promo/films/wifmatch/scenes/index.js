// wifmatch (24 s, vertical): "What if you could see your love match with everyone?"  Zodiac love explainers, Part 1.
// Faceless "what if" format: a dark lounge, round characters, glowing number bubbles, the headline on screen all film.
//   0.0   fade up; headline pops line by line (stays all film)
//   0.6   "One morning, everyone has a number."  bubbles pop over three strangers and count up
//   3.6   "It's how well their sign matches yours."  you look around
//   6.4   "Leo: 12. Still waving."  the Leo bounces and waves, you go flat
//   9.6   "Then a Libra walks in."  strangers dim and slide out, the Libra walks in; 11.0 the bubble counts to 97, burst
//  13.2   "Why so high? You're both ruled by Venus."  ♀ rises between you, two links
//  17.4   "Same planet. Different love language."  Venus glows, both soften
//  19.6   "Then Libra looks at you…"  the Libra turns, a bubble pops over YOUR head, digits scramble, cut
//  21.9   PART 2 tag; fade to black 23.3–24.0
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { layerCanvas } from '../../sky.js'
import { makeRoom, person, bubble, countUp, makeHeadline, makeCaptions, captionWordTimes, makeBurst, drawBurst, orb, link, partTag, pop01, wob, sign, GOLD, PINK } from '../../whatif/kit.js'

export const DURATION = 24
const ARIES = sign('aries'), LEO = sign('leo'), CAP = sign('capricorn'), LIBRA = sign('libra'), TAURUS = sign('taurus')

const T = { strangers: [1.0, 1.4, 1.8], wave: 6.4, out: 9.6, enter: [9.7, 11.0], score: 11.0, hit: 11.75, venus: 14.4, links: 15.0, soft: 17.4, turn: 19.6, mine: 20.3, freeze: 21.7, part: 21.9, fade: 23.3 }
const CAPS = [
  { t0: 0.6, t1: 3.4, text: 'One morning, | everyone has a *number.*' },
  { t0: 3.6, t1: 6.2, text: "It's how well their sign | matches *yours.*" },
  { t0: 6.4, t1: 9.4, text: 'Leo: *12.* | Still waving.' },
  { t0: 9.7, t1: 13.0, text: 'Then a Libra walks in. | *97.*' },
  { t0: 13.2, t1: 17.2, text: 'Why so high? | Both ruled by *Venus.*', hl: PINK },
  { t0: 17.4, t1: 19.4, text: 'Same planet. | Different love *language.*', hl: PINK },
  { t0: 19.6, t1: 21.8, text: 'Then Libra | looks at *you…*' },
]
const HEAD_OPTS = { small: 54, big: 112, top: 130 }
const HEAD = [{ text: 'What if you could see' }, { text: 'your love match', big: true }, { text: 'with everyone?' }]

async function build(stage) {
  try { await Promise.all(["900 92px Inter", "800 62px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const x = layerCanvas(root).getContext('2d')
  const room = makeRoom(11)
  const headline = makeHeadline(HEAD, HEAD_OPTS)
  const captions = makeCaptions(CAPS)
  const B1 = makeBurst(5, 14, 170), B2 = makeBurst(9, 10, 120), B3 = makeBurst(13, 10, 120)

  function update(t) {
    x.clearRect(0, 0, 1080, 1920)
    // camera: a slow push, a nudge to the Leo, a push to the Libra, a pull back for Venus
    const zoom = 1 + 0.03 * prog(t, 0, 6) + 0.06 * ease.inOutCubic(prog(t, 6.3, 7)) * (1 - ease.inOutCubic(prog(t, 9.2, 9.9))) + 0.07 * ease.inOutCubic(prog(t, 10.6, 11.6)) * (1 - ease.inOutCubic(prog(t, 13.4, 14.2))) + 0.05 * ease.inOutCubic(prog(t, 19.6, 21.6))
    const panX = 90 * ease.inOutCubic(prog(t, 6.3, 7)) * (1 - ease.inOutCubic(prog(t, 9.2, 9.9))) + 110 * ease.inOutCubic(prog(t, 10.6, 11.6)) * (1 - ease.inOutCubic(prog(t, 13.4, 14.2))) - 60 * ease.inOutCubic(prog(t, 19.6, 21.6))
    room(x, t, { shift: panX })
    x.save()
    x.translate(540, 1150); x.scale(zoom, zoom); x.translate(-540 - panX, -1150)

    // ── strangers (back row): Aries, Capricorn, Leo
    const outK = ease.inCubic(prog(t, T.out, T.out + 0.6))
    const strangers = [
      { s: ARIES, cx: 430, cy: 960, sc: 0.8, body: '#c94f3a', hair: 'spikes', hairCol: '#2a1a18', n: 41, dx: -260, expr: 'flat' },
      { s: CAP, cx: 690, cy: 920, sc: 0.74, body: '#3a8f74', hair: 'cap', hairCol: '#1d2b26', n: 74, dx: 260, expr: 'smile' },
      { s: LEO, cx: 880, cy: 1060, sc: 0.92, body: '#e8913a', hair: 'curls', hairCol: '#a5621f', n: 12, dx: 300, expr: 'grin' },
    ]
    strangers.forEach((p, i) => {
      const isLeo = p.s === LEO
      const enter = pop01(t, 0.25 + i * 0.12, 0.45, 1.6)
      const a = clamp(enter * 2) * (1 - outK)
      const cx = p.cx + p.dx * outK, bounce = isLeo && t > T.wave && t < T.out ? Math.abs(Math.sin((t - T.wave) * 7)) * -18 : 0
      const cy = p.cy + (1 - enter) * 60 + bounce + Math.sin(t * 1.6 + i) * 3
      const waveK = isLeo ? prog(t, T.wave, T.wave + 0.3) * (1 - prog(t, T.out - 0.1, T.out + 0.3)) : 0
      person(x, { cx, cy, s: p.sc, body: p.body, rim: p.s.color, hair: p.hair, hairCol: p.hairCol, expr: p.expr, look: [isLeo ? -10 : -6, 0], blink: blinkAt(t, 2.3 + i * 1.7), a, wave: waveK, waveT: (t - T.wave) * 11 })
      const bt = T.strangers[i]
      const k = pop01(t, bt, 0.35, 2.6) * (1 - outK)
      bubble(x, { cx, tipY: cy - 110 * p.sc - 10, glyph: p.s.glyph, text: countUp(t, bt, p.n, 0.7), color: p.s.color, k: k * 0.85, size: 62, pulse: isLeo && t > T.wave ? 0.3 + 0.3 * Math.sin(t * 9) : 0 })
    })

    // ── the Libra walks in from the right
    if (t > T.enter[0]) {
      const p = ease.outCubic(prog(t, ...T.enter))
      const walk = t < T.enter[1] ? Math.abs(Math.sin((t - T.enter[0]) * 9)) * -16 : 0
      const lx = lerp(1300, 770, p), ly = 990 + walk + Math.sin(t * 1.4) * 3
      const turned = ease.inOutCubic(prog(t, T.turn, T.turn + 0.35))
      const expr = t > T.mine + 0.25 ? 'shock' : t > T.soft ? 'soft' : 'smile'
      person(x, { cx: lx, cy: ly, s: 1.12, body: '#b45bb0', rim: LIBRA.color, hair: 'long', hairCol: '#5a2a5e', expr, look: [lerp(6, -14, turned), 0], blink: blinkAt(t, 12.6) + blinkAt(t, 16.1), blush: prog(t, T.soft, T.soft + 0.6) })
      const k = pop01(t, T.score, 0.4, 2.6)
      const pulse = t > T.hit ? 0.5 + 0.5 * Math.sin((t - T.hit) * 6) : 0
      const kk = k * (1 + 0.18 * wob(t, T.hit, 1, 16, 4))
      bubble(x, { cx: lx, tipY: ly - 110 * 1.12 - 10, glyph: LIBRA.glyph, text: countUp(t, T.score, 97, T.hit - T.score), color: t > T.hit ? GOLD : LIBRA.color, k: kk, size: 80, pulse })
      drawBurst(x, B1, lx, ly - 230, t, T.hit, GOLD, 0.9)
      // Venus link
      venus(t, lx, ly)
    }

    // ── you (foreground, left)
    const yx = 290, yy = 1330 + Math.sin(t * 1.3) * 3
    const lookAround = t < T.wave ? [Math.sin(t * 1.1) * 14 + 6, -4] : t < T.out ? [16, -6] : t < T.turn ? [18, -8] : [18, -4]
    const yexpr = t > T.mine ? 'shock' : t > T.soft ? 'soft' : t > T.hit - 0.1 ? 'shock' : t > T.wave + 0.6 && t < T.out ? 'meh' : 'flat'
    person(x, { cx: yx, cy: yy, s: 1.6, body: '#e9824a', rim: GOLD, hair: 'swoop', hairCol: '#5a3a24', expr: yexpr, look: lookAround, blink: blinkAt(t, 4.1) + blinkAt(t, 8.4), blush: prog(t, T.soft + 0.3, T.soft + 0.9) * (t < T.mine ? 1 : 0.6) })
    // your own bubble, digits scramble
    const mk = pop01(t, T.mine, 0.4, 2.8)
    if (mk > 0) {
      const settled = t > T.freeze
      bubble(x, { cx: yx, tipY: yy - 110 * 1.6 - 10, glyph: TAURUS.glyph, text: settled ? '??' : countUp(t, 0, null), color: TAURUS.color, k: mk * (1 + 0.15 * wob(t, T.freeze, 1, 18, 5)), size: 84, pulse: 0.4 + 0.4 * Math.sin(t * 12) })
      drawBurst(x, B3, yx, yy - 290, t, T.mine, TAURUS.color, 0.8)
    }
    x.restore()

    // ── type (screen space)
    // ── end: dim the room, then type on top
    const dk = ease.inOutQuad(prog(t, T.freeze, T.part + 0.2)) * 0.6
    if (dk > 0) { x.fillStyle = `rgba(4,3,8,${dk})`; x.fillRect(0, 0, 1080, 1920) }
    headline(x, t, 0.08)
    captions(x, t)
    partTag(x, t, T.part, 'PART 2', 'follow for the answer')
    // fade in / out
    const black = Math.max(1 - prog(t, 0, 0.35), ease.inQuad(prog(t, T.fade, DURATION - 0.03)))
    if (black > 0) { x.fillStyle = `rgba(0,0,0,${black})`; x.fillRect(0, 0, 1080, 1920) }
  }

  function venus(t, lx, ly) {
    const k = pop01(t, T.venus, 0.5, 2.4) * (1 - ease.inCubic(prog(t, T.turn, T.turn + 0.4)))
    if (k <= 0) return
    const vx = 530, vy = 740 + Math.sin(t * 2) * 10
    const lp = ease.outCubic(prog(t, T.links, T.links + 0.6)) * k
    link(x, vx, vy, 290, 1330 - 180, lp, PINK, t)
    link(x, vx, vy, lx, ly - 125, lp, PINK, t)
    orb(x, vx, vy, 58 * k * (1 + 0.08 * Math.sin(t * 5) * (t > T.soft ? 1 : 0)), PINK, clamp(k * 2), '♀')
    drawBurst(x, B2, vx, vy, t, T.venus + 0.05, PINK, 0.8)
  }
  return { start: 0, end: DURATION, root, update }
}
// a quick blink centred on tb
const blinkAt = (t, tb) => 1 - Math.min(1, Math.abs(t - tb) / 0.07)

export const SCENES = [build]

// ── sound: pops on caption words (soft), bubble pops, a counter tick run, a big hit on 97, a sparkle for Venus
const words = captionWordTimes(CAPS)
export const CUES = [
  ...[0.08, 0.2, 0.32].map((t, i) => ['pop', t, [700, 880, 1050][i], 0.055, 0]),
  ...words.map((t, i) => ['pop', t, 900 + (i % 4) * 90, 0.022, (i % 2 ? 0.15 : -0.15)]),
  ...T.strangers.map((t, i) => ['pluck', t, [523, 659, 784][i], 0.06, 0.4, [-0.3, 0.2, 0.4][i]]),
  ...Array.from({ length: 8 }, (_, i) => ['tick', T.score + i * 0.09]),
  ['whoosh', T.enter[0]],
  ['bell', T.hit, 1318.5, 0.08, 2.2, 0.2], ['glitter', T.hit + 0.05, T.hit + 0.7], ['pop', T.hit, 1320, 0.07, 0.3],
  ['pluck', T.venus, 880, 0.06, 0.6, 0], ['glitter', T.links, T.links + 0.6],
  ['riser', T.turn - 0.6, T.mine, 0.08], ['pop', T.mine, 1200, 0.07, -0.3],
  ...Array.from({ length: 12 }, (_, i) => ['tick', T.mine + 0.1 + i * 0.11]),
  ['boom', T.part],
]
