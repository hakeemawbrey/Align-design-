// THE BARE MINIMUM: the shared format of Trends Vol. 2 eps 21–25 (nt2e21–nt2e25), on ./trendkit.js.
// A literal pixel bar lies on the floor, tagged THE BAR. In beats 1 and 2 the date hops over it with a tiny gesture and
// the sign celebrates like it's a proposal. In beat 3 (the twist, under the one card cut) THE STARS raise the bar to
// head height; the date runs, clears it with something genuinely thoughtful, and the sign goes quiet. A stamp slams
// "NEW *STANDARD.*", THE STARS say the last line and Pisces holds up a card, fountaining.
//
// 18 s (slate 20 s) · story 0–15.6 · then the 2.4 s short end card. No card-back cut: the old cut time is a white flash.
//   0.00–2.10  hook (on screen at t = 0): "They did the *bare minimum.* | (I'm a <Sign>.)" + the sign mid-celebration.
//   2.10–4.85  beat 1 · 4.85–7.60 beat 2 · 7.60–11.40 beat 3 (card cut at 7.6) · 11.45 stamp · 12.0 last line.
//
//   makeBare(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.sign, cfg.date (sign ids), cfg.deep (sticker accent ink), cfg.accent (hook accent colour)
//     cfg.hookDraw(x, t, S) the hero's hook prop, cfg.beats: 3 × { caption, gesture, reply, draw(x, t, S), cues }
//     cfg.last (THE STARS), cfg.stamp ('NEW *STANDARD.*'), cfg.pisCard (Pisces' card)
import {
  makeFilm, buildSticker, buildStamp, stampCues, drawStampTool, star, pisces, tissues, theStars, heldCard, at, wordPops,
  R, box, label, shadow, sparkles, hearts, confetti, bubble, shout, pop01, outK, popOut, prog, lerp, clamp, ease, r3,
  talkHops, NAMES, article, GOLD, BONE, INK, PINK, RED, INTER, CPS,
} from './trendkit.js'

export const DURATION = 20   // the slate length; the film itself is 2.0 s shorter (short end card, CHANGE 4 Nov, see trendkit.js makeFilm)
const STORY_END = DURATION - 4.4
export const T = {
  hookOut: [1.95, 2.1],
  beats: [[2.1, 4.85], [4.85, 7.6], [7.6, 11.45]],
  cut: 7.6, raise: [0.35, 0.95], run: [1.0, 1.3], leap: [1.3, 1.85], say: 1.95, reply: 2.75,
  stamp: 11.45, starsIn: 11.55, pisIn: 11.65, card: 12.45, last: 12.0, boxClose: 15.1, out: [15.1, 15.5],
}
const FLOOR = 1170, BAR_X = [300, 560], LOW = 1120, HIGH = 800
const STRIPE = ['#f2f0ea', RED]

// ── the bar: two striped posts, a striped pole at height y, the tag "THE BAR"
function drawBar(x, t, y, { glow = 0, tag = 1 } = {}) {
  const [a, b] = BAR_X
  for (const px of [a - 18, b + 4]) { R(x, INK, px - 4, y - 14, 22, FLOOR - y + 14); for (let yy = y - 10; yy < FLOOR; yy += 24) R(x, (Math.floor((yy - y) / 24) % 2) ? '#8c86a8' : '#c9c2dc', px, yy, 14, Math.min(24, FLOOR - yy)) ; R(x, INK, px - 14, FLOOR - 8, 42, 12) }
  if (glow > 0) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient((a + b) / 2, y, 10, (a + b) / 2, y, 320)
    g.addColorStop(0, `rgba(255,220,130,${0.35 * glow})`); g.addColorStop(1, 'rgba(255,220,130,0)')
    x.fillStyle = g; x.fillRect(a - 320, y - 320, b - a + 640, 640); x.restore()
  }
  R(x, INK, a - 26, y - 13, b - a + 52, 26)
  for (let i = 0; i < 10; i++) R(x, glow > 0.5 ? (i % 2 ? GOLD : '#fff3c4') : STRIPE[i % 2], a - 20 + i * (b - a + 40) / 10, y - 7, (b - a + 40) / 10 + 1, 14)
  if (tag > 0.01) {
    const cx = (a + b) / 2, sw = 0.08 * Math.sin(t * 3.2)
    x.save(); x.translate(cx, y + 6); x.rotate(sw); x.globalAlpha *= clamp(tag)
    R(x, INK, -3, 0, 6, 20)
    box(x, -88, 20, 176, 50, BONE, { b: 5 })
    x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('THE BAR', 0, 47)
    x.restore()
  }
}
function floor(x) {
  R(x, '#1e1838', 0, FLOOR, 1080, 750); R(x, '#2c2450', 0, FLOOR, 1080, 10)
  for (let i = 0; i < 9; i++) R(x, 'rgba(239,230,214,0.06)', i * 130 - 20, FLOOR + 60 + (i % 2) * 40, 80, 6)
}
const strip = s => s.replace(/\*/g, '')

export function makeBare(cfg) {
  const HERO = cfg.sign, DATE = cfg.date
  const LINES = [{ t: T.last, speaker: 'THE STARS', text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, 'THE STARS', { cps: CPS })]
  const B = T.beats
  const hero = (x, t, o) => star(x, t, HERO, { seed: 3, glow: 1.1, ...o })
  const date = (x, t, o) => star(x, t, DATE, { seed: 7, ...o })

  function hookPaint(x, t) {
    if (t >= B[0][0]) return
    floor(x); drawBar(x, t, LOW)
    shadow(x, 560, FLOOR, 280)
    const o = { x: 560, y: 930, s: 400, mood: 'heart', look: [0, -0.4], hops: [0.25, 0.95, 1.6], squash: 0.02 * Math.sin(t * 9) }
    hero(x, t, o)
    if (cfg.hookDraw) cfg.hookDraw(x, t, { hero, date, o })
    hearts(x, t, -0.4, 560, 700, { n: 6, cell: 8 }); hearts(x, t, 0.9, 600, 700, { n: 5, cell: 7 })
    pisces(x, t, { x: 925, y: 1600, s: 150 }, 2, 'sparkle', [-1, -0.8]); tissues(x, 820, 1645, 74)
  }

  function beatPaint(x, t, i) {
    const [a, b0] = B[i], b = i === 2 ? T.stamp : b0
    if (t < a || t >= b) return
    const u = t - a, bt = cfg.beats[i]
    const punch = 1 + 0.07 * (1 - ease.outCubic(prog(u, 0, 0.28)))
    x.save(); x.translate(540, 1000); x.scale(punch, punch); x.translate(-540, -1000)
    floor(x)
    let barY = LOW, glow = 0
    if (i === 2) { barY = lerp(LOW, HIGH, ease.inOutCubic(prog(u, ...T.raise))); glow = clamp(prog(u, T.say - 0.1, T.say + 0.4)) }
    drawBar(x, t, barY, { glow })
    // THE STARS lift the bar in beat 3
    if (i === 2) {
      const k = pop01(t, a + 0.1, 0.3, 2) * outK(t, [b - 0.2, b])
      if (k > 0.01) theStars(x, t, { x: 150, y: lerp(1080, 760, ease.inOutCubic(prog(u, ...T.raise))), s: 150, pop: k, mood: u < 1 ? 'squint' : 'happy', look: [1, 0], hops: [a + 0.3, a + 1.0] })
      if (u > T.raise[0] && u < T.raise[1] + 0.2) label(x, '↑', 150, lerp(940, 620, prog(u, ...T.raise)), { size: 70, col: GOLD, font: INTER, weight: 800 })
    }
    // the date: hops over the low bar (beats 1, 2) or runs + leaps the high one (beat 3)
    let dx, dy, dm = 'happy', dlook = [1, 0], dsq = 0
    if (i < 2) {
      const p = ease.inOutQuad(prog(u, 0.25, 0.85))
      dx = lerp(150, 660, p); dy = 1010 - Math.sin(Math.PI * p) * 150
      dsq = u > 0.85 && u < 1.0 ? 0.12 : 0
      dm = u < 0.25 ? 'neutral' : 'happy'
    } else {
      const back = ease.inOutQuad(prog(u, ...T.run)), lp = prog(u, ...T.leap)
      dx = lerp(lerp(160, 90, back), 660, ease.inOutQuad(lp)); dy = 1010 - Math.sin(Math.PI * lp) * 420 * (lp > 0 ? 1 : 0)
      if (u < T.leap[0] && u > T.run[0]) dsq = 0.08
      dm = u < T.leap[0] ? 'squint' : u < T.say ? 'wide' : 'happy'
    }
    shadow(x, dx, FLOOR, 200)
    date(x, t, { x: dx, y: dy, s: 215, mood: dm, look: dlook, squash: dsq, hops: i < 2 ? [a + 0.95] : [a + T.leap[1]] })
    if (i < 2) sparkles(x, t, 430, LOW - 40, a + 0.55, 6, 70, i, [GOLD, BONE])
    else sparkles(x, t, 430, barY - 40, a + T.leap[0] + 0.25, 10, 120, 2, [GOLD, BONE, PINK])
    // the hero: celebrates hugely (beats 1, 2) or goes quiet then melts (beat 3)
    let hm, hlook = [-1, 0], hhops
    if (i < 2) { hm = u < 1.15 ? 'sparkle' : 'heart'; hhops = [a + 1.2, a + 1.45, a + 1.7, a + 1.95, a + 2.2] }
    else { hm = u < T.reply - 0.05 ? (u < T.say ? 'neutral' : 'wide') : 'sparkle'; hhops = [a + T.reply] }
    shadow(x, 900, FLOOR, 210)
    const ho = { x: 905, y: 985, s: 250, mood: hm, look: hlook, hops: hhops, blush: i === 2 && u > T.reply ? 1 : undefined }
    if (bt.draw) bt.draw(x, t, { u, a, b, hero, date, ho, dx, dy, i, barY, under: true })
    hero(x, t, ho)
    if (bt.draw) bt.draw(x, t, { u, a, b, hero, date, ho, dx, dy, i, barY, under: false })
    if (i < 2) { hearts(x, t, a + 1.2, 900, 820, { n: 6 }); shout(x, t, '!!!', 1000, 760, a + 1.18, { size: 80, col: GOLD, rot: 0.15 }) }
    else hearts(x, t, a + T.reply + 0.1, 900, 820, { n: 5, cols: ['#ff8fb1', '#ff5c8a'] })
    // speech
    if (i < 2) {
      bubble(x, t, Math.min(700, Math.max(260, dx)), 800, a + 0.95, b, strip(bt.gesture), { size: 32, tail: -0.1, col: '#c9f2d4' })
      bubble(x, t, 700, 650, a + 1.55, b, strip(bt.reply), { size: 38, tail: 0.6 })
    } else {
      bubble(x, t, 540, 560, a + T.say, b, strip(bt.gesture), { size: bt.gestureSize || 30, tail: 0.2, col: '#c9f2d4' })
      bubble(x, t, 640, 670, a + T.reply, b, strip(bt.reply), { size: 36, tail: 0.7 })
    }
    // Pisces in the back, sniffling more each beat
    const pk = pop01(t, a + 0.25, 0.3, 2) * outK(t, [b - 0.15, b])
    if (pk > 0.01) { tissues(x, 822, 1650, 74 * Math.min(1, pk)); pisces(x, t, { x: 925, y: 1600, s: 150, pop: pk }, i === 2 ? 3 : 2, i === 2 ? 'sparkle' : 'wide', [-1, -0.7]) }
    x.restore()
  }

  function finale(x, t) {
    if (t < T.stamp || t > T.out[1]) return
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    floor(x)
    drawBar(x, t, 660, { glow: 1, tag: 0 })
    shadow(x, 430, 1080, 220 * ok); shadow(x, 690, 1090, 190 * ok)
    hero(x, t, { x: 430, y: 900, s: 260, pop: ok, mood: 'sparkle', look: [1, 0], hops: [T.stamp + 0.05, T.stamp + 0.5, T.last + 1.6] })
    date(x, t, { x: 690, y: 920, s: 210, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.stamp + 0.12, T.last + 1.8] })
    if (cfg.finaleDraw) cfg.finaleDraw(x, t, { ok, hero, date })
    const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
    if (sk > 0.01) theStars(x, t, { x: 190, y: 1225, s: 170, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk })
    const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
    if (pk > 0.01) {
      const F = pisces(x, t, { x: 890, y: 1230, s: 160, pop: pk, hops: [T.pisIn + 0.3, T.card + 0.02, T.card + 0.6] }, t > T.card ? 3 : 2, 'sparkle', [-1, -1])
      heldCard(x, t, 894, F.cy - 158, pop01(t, T.card, 0.3, 2.6) * ok, cfg.pisCard || 'NEW BAR!', { size: 40 })
    }
  }

  const film = makeFilm({
    id: cfg.id, duration: DURATION,
    bug: { main: 'THE BARE', dim: 'MINIMUM' },
    hook: { text: `They did the *bare minimum.* | (I’m ${article(HERO)} ${NAMES[HERO]}.)`, color: cfg.accent, out: T.hookOut, size: 76, accentSize: 108 },
    paint(x, t) {
      const dS = t - T.stamp
      x.save(); x.translate(0, 90)
      hookPaint(x, t)
      for (let i = 0; i < 3; i++) beatPaint(x, t, i)
      x.restore()
      finale(x, t)
      void dS
    },
    top(x, t) { drawStampTool(x, t, T.stamp); sparkles(x, t, 540, 330, T.stamp + 0.02, 14, 430, 1, [GOLD, BONE, PINK]) },
    shake(t) { const d = t - T.stamp; return d > 0 && d < 0.45 ? 18 * Math.exp(-d * 9) * Math.sin(d * 60) : 0 },
    dom(root) {
      return [
        ...cfg.beats.map((bt, i) => buildSticker(root, { badge: i + 1, badgeCol: i === 2 ? PINK : GOLD, text: bt.caption, deep: cfg.deep, at: B[i][0] + (i === 2 ? 0.55 : 0.35), out: i === 2 ? [T.stamp - 0.2, T.stamp] : [B[i][1] - 0.18, B[i][1]], tilt: [-2.2, 1.8, -1.4][i], top: 1420 })),
        buildStamp(root, { text: cfg.stamp || 'NEW *STANDARD.*', at: T.stamp, out: T.out, size: 112 }),
      ]
    },
    lines: LINES, box: { open: T.last - 0.22, close: T.boxClose },
    flashes: [B[0][0], B[1][0]],
    cuts: [{ t: T.cut, kind: 'flip' }],
    cues: [
      ['pop', 0.3, 987.77, 0.04, 0], ['glitter', 0.25, 0.7], ['pop', 0.95, 1174.66, 0.03, 0.3], ['pop', 1.6, 1318.51, 0.03, -0.3],
      ...cfg.beats.flatMap((bt, i) => {
        const a = B[i][0], st = a + (i === 2 ? 0.55 : 0.35)
        const base = [['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1], ['tick', r3(st + 0.02), 0.04]]
        const move = i < 2
          ? [['whoosh', r3(a + 0.3), 0.5, 0.025], ['tick', r3(a + 0.86), 0.05], ['pop', r3(a + 0.95), 880, 0.035, -0.3], ['glitter', r3(a + 1.15), r3(a + 1.7)], ['pop', r3(a + 1.2), 1318.51, 0.045, 0.4], ['pop', r3(a + 1.55), 1046.5, 0.035, 0.4],
            ['clap', r3(a + 1.3), { gain: 0.12, pan: 0.3 }], ['clap', r3(a + 1.55), { gain: 0.12, pan: 0.4 }], ['clap', r3(a + 1.8), { gain: 0.13, pan: 0.35 }]]
          : [['pop', r3(a + 0.15), 739.99, 0.035, -0.4], ['riser', r3(a + T.raise[0]), r3(a + T.raise[1]), 0.02], ['tick', r3(a + T.raise[1]), 0.06],
            ['whoosh', r3(a + T.run[0]), 0.3, 0.02], ['whoosh', r3(a + T.leap[0]), 0.5, 0.035], ['tick', r3(a + T.leap[1]), 0.06], ['glitter', r3(a + T.say - 0.1), r3(a + T.say + 0.5)],
            ['pop', r3(a + T.say), 880, 0.035, -0.2], ['pluck', r3(a + T.reply), 1174.66, 0.04, 0.5, 0.3], ['pluck', r3(a + T.reply + 0.12), 1567.98, 0.035, 0.5, 0.3]]
        return [...base, ...move, ...at(a, bt.cues)]
      }),
      ...stampCues(T.stamp),
      ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
      ['pop', T.card, 1318.51, 0.045, 0.4], ['pop', r3(T.card + 0.08), 1760, 0.035, 0.4], ['glitter', T.card, r3(T.card + 0.3)],
      ...wordPops(T.last - 0.2, 1, 0.1),
    ],
  })
  return film
}
void [STORY_END, confetti, GOLD, label]
