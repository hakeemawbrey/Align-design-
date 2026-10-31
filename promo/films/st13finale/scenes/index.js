// st13finale (60 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E40) · story 0–55.6, then the end card.
//   ❓ "What did the stars *teach* us?"  Graduation day in the classroom. ★ THE STARS host; ♓ PISCES (in a cap, already
//   crying) speaks for the class. Season teachers step up one at a time with one line each, chalked on the board with its
//   tag: ♄ Saturn (retrograde only looks backwards ✓), ☽ the Moon (the Moon as feelings, in astrology ✦), ♍ Virgo (houses
//   as rooms ✦), ♀ Venus (ask how they like to be loved ♥), ♎ Libra (same team ♥), ♋ Cancer (attachment styles can grow
//   ♥), the Stars (a chart describes, it never decides ✦). Gag: the Aunties cry harder than Pisces. Caps fly.
//   Recap: "You're a whole chart. And a whole person." Last line (the Stars): "Class *dismissed*. Go love well."
// The engine is ./classkit.js (this folder's copy); the Moon is ./kit.js (copied unchanged from st12sunsign); props are
// ./props.js (copied unchanged from stmeetfriends2); the season look is ../../stexplain.js. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { signStar, STAR, drawStarChar, talkHops } from '../../startalk.js'
import { SATURN, drawSaturn } from '../../st5cast.js'
import { VENUS, drawVenus } from '../../st8cast.js'
import { easeOutBack } from '../../wheel.js'
import { EX } from '../../stexplain.js'
import { MOON, drawMoonChar } from './kit.js'
import { auntie, drawClipboard, drawTears, eyesOf, confetti } from './props.js'
import { makeEpisode, R, INK } from './classkit.js'

const PIS = signStar('pisces'), VIR = signStar('virgo'), LIB = signStar('libra'), CAN = signStar('cancer'), TAU = signStar('taurus')
const CPS = 27
const star = (c, extra) => (ctx, X, Y, s, t, o) => { const r = drawStarChar(ctx, X, Y, s, t, { color: c.color, glyph: c.glyph, ...o }); if (extra) extra(ctx, r, t); return r }
const GUESTS = {
  saturn: { tag: SATURN.tag, color: SATURN.tagColor, pitch: 440, size: 200, draw: (ctx, X, Y, s, t, o) => { const r = drawSaturn(ctx, X, Y - 20, s, t, { ...o, pointer: false }); return { ...r, size: s } } },
  moon: { tag: MOON.tag, color: MOON.color, accent: '#c9c2ff', pitch: 523.25, size: 220, draw: (ctx, X, Y, s, t, o) => { const r = drawMoonChar(ctx, X, Y - 10, s * 0.42, t, o); return { x: r.x, y: r.y, size: s, top: r.top } } },
  virgo: { tag: '♍ VIRGO', color: VIR.color, pitch: 587.33, size: 220, draw: star(VIR, (ctx, r) => drawClipboard(ctx, r.x - r.size * 0.42, r.y + r.size * 0.12, 5, { rot: -0.18 })) },
  venus: { tag: VENUS.tag, color: VENUS.tagColor, pitch: 659.25, size: 220, draw: (ctx, X, Y, s, t, o) => drawVenus(ctx, X, Y, s, t, o) },
  libra: { tag: '♎ LIBRA', color: LIB.color, pitch: 622.25, size: 220, draw: star(LIB) },
  cancer: { tag: '♋ CANCER', color: CAN.color, pitch: 493.88, size: 220, draw: star(CAN) },
  aunt: { tag: 'THE AUNTIES', color: '#ffd98a', pitch: 349.23, size: 170,
    draw: (ctx, X, Y, s, t, o) => {
      const a = auntie(ctx, X - 78, Y + 10, s, t, { ...o, color: CAN.color, seed: 11, glasses: { frame: '#7a1f3d', chain: true, fog: 0.4 } })
      const b = auntie(ctx, X + 78, Y + 10, s, t, { ...o, color: TAU.color, seed: 12, hops: o.hops ? o.hops.map(h => h + 0.12) : null, glasses: { frame: '#3a2f7a' } })
      for (const [r, sd] of [[a, 2], [b, 5]]) { const e = eyesOf(r); drawTears(ctx, t, e.ex, e.ey, e.dx, e.px, { amount: 1, seed: sd }) }
      return { x: X, y: a.y, size: s * 1.6, top: Math.min(a.top, b.top) }
    } },
}
const ORDER = ['saturn', 'moon', 'virgo', 'venus', 'libra', 'cancer']
const ROWS = [
  ['RETROGRADE: *LOOKS* BACK', 'sky'], ['MOON = *FEELINGS*', 'astro'], ['HOUSES = *ROOMS*', 'astro'],
  ['ASK HOW THEY\'RE *LOVED*', 'tip'], ['SAME *TEAM*', 'tip'], ['STYLES CAN *GROW*', 'tip'], ['CHARTS *DESCRIBE*', 'astro'],
]
const rowY = i => 60 + i * 56

// a pixel mortarboard; (cx, cy) = the bottom of the cap, w = board width
function cap(x, cx, cy, w, rot = 0, t = 0, tassel = EX.gold) {
  const s = w / 14
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -4.5 * s, -3 * s, 9 * s, 4 * s); R(x, '#2a2244', -3.5 * s, -2.5 * s, 7 * s, 3 * s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-7.6 * s, -4 * s); x.lineTo(0, -7.6 * s); x.lineTo(7.6 * s, -4 * s); x.lineTo(0, -0.4 * s); x.closePath(); x.fill()
  x.fillStyle = '#3a3060'; x.beginPath(); x.moveTo(-6.4 * s, -4 * s); x.lineTo(0, -6.8 * s); x.lineTo(6.4 * s, -4 * s); x.lineTo(0, -1.2 * s); x.closePath(); x.fill()
  R(x, tassel, -0.6 * s, -4.6 * s, 1.2 * s, 1.2 * s)
  const sw = Math.sin(t * 4) * 0.8 * s
  R(x, tassel, 0, -4 * s, 3.6 * s, 0.7 * s); R(x, tassel, 3.4 * s + sw * 0.3, -4 * s, 0.7 * s, 4 * s); R(x, tassel, 3 * s + sw * 0.5, -0.4 * s, 1.5 * s, 1.6 * s)
  x.restore()
}

const script = [
  { who: 's', text: "graduation day and I'm ALREADY crying." },
  { who: 't', text: 'One last lesson. Teachers: the short version!', mark: 'open' },
  { who: 'saturn', text: 'Retrograde only *looks* backwards.', mark: 'g0' },
  { who: 'moon', text: 'In astrology, I stand for your *feelings*.', mark: 'g1' },
  { who: 'virgo', text: 'Astrologers read houses as *rooms* in a chart.', mark: 'g2' },
  { who: 'venus', text: 'Ask your person how they like to be *loved*.', mark: 'g3' },
  { who: 'libra', text: "In a fight, you're on the *same* team.", mark: 'g4' },
  { who: 'cancer', text: 'Attachment styles can *grow*.', mark: 'g5' },
  { who: 't', text: 'And a chart *describes*. It never decides.', mark: 'g6' },
  { who: 's', text: 'the Aunties are crying harder than me.', mark: 'gag' },
  { who: 'aunt', text: 'they grow up so *FAST*.', mark: 'aunt' },
  { who: 's', text: "so I'm a whole chart. AND a whole person?", mark: 'bulb' },
  { who: 't', text: 'Exactly. Caps in the air, class!', mark: 'caps' },
]
script.forEach(L => { const m = /^g(\d)$/.exec(L.mark || ''); if (m) { const i = +m[1]; L.tag = { kind: ROWS[i][1], x: 820, y: rowY(i) + 15, align: 'right', scale: 0.78, delay: 0.5 } } })

const window_ = (key, EPT) => {
  const L = EPT.lines, tm = EPT.times
  const idx = L.map((l, i) => (l.who === key ? i : -1)).filter(i => i >= 0)
  let a = L[idx[0]].t - 0.35, b = tm[idx[idx.length - 1]].done + 1.1
  if (key === 'aunt') a = EPT.M.gag + 0.6
  const next = L[idx[idx.length - 1] + 1]
  if (next && next.who !== 's' && next.who !== 't') b = Math.min(b, next.t - 0.4)
  if (key === 'aunt') b = EPT.M.caps - 0.2
  return [a, b]
}

function front(x, t, T, M, rt, rs, sp) {
  // the guest at centre stage
  for (const key of Object.keys(GUESTS)) {
    const [a, b] = window_(key, T)
    if (t < a || t > b + 0.3) continue
    const G = GUESTS[key]
    const pin = easeOutBack(prog(t, a, a + 0.35), 2.2), pout = 1 - ease.inCubic(prog(t, b, b + 0.3))
    const pop = pin * pout
    if (pop <= 0.01) continue
    const hops = talkHops(T.lines, G.tag, { cps: CPS })
    const mood = key === 'aunt' ? 'sparkle' : 'happy'
    const r = G.draw(x, 540, 1196, G.size, t, { pop, hops, mood, look: [0, 0], seed: 20 + ORDER.indexOf(key) })
    if (sp === key && pop > 0.9) {
      const y = r.top - 34 + Math.sin(t * 8) * 6
      x.fillStyle = INK; x.beginPath(); x.moveTo(r.x - 22, y - 16); x.lineTo(r.x + 22, y - 16); x.lineTo(r.x, y + 10); x.fill()
      x.fillStyle = G.color; x.beginPath(); x.moveTo(r.x - 15, y - 12); x.lineTo(r.x + 15, y - 12); x.lineTo(r.x, y + 4); x.fill()
    }
  }
  // the class photo under the recap: every guest teacher, small, in a row
  const ph = prog(t, T.recap + 0.2, T.recap + 0.8)
  if (ph > 0) {
    ORDER.forEach((key, i) => {
      const G = GUESTS[key], p = easeOutBack(clamp(ph * 6 - i * 0.6), 2.2)
      if (p <= 0.01) return
      const gx = 250 + i * 116
      const r = G.draw(x, gx, 1330, key === 'saturn' ? 110 : 112, t, { pop: p, mood: 'happy', look: [0, 0], seed: 30 + i, hops: [M.last + 0.05 + i * 0.06] })
      cap(x, r.x, r.top + 16, 56, -0.1 + 0.05 * i, t, i % 2 ? EX.chalkPink : EX.gold)
    })
  }
  // Pisces' tears (graduation day, then again at the Aunties) and everyone's caps
  const cry = Math.max(clamp(1 - prog(t, M.open + 0.4, M.open + 1.4)), clamp(prog(t, M.gag, M.gag + 0.4)) * clamp(1 - prog(t, M.bulb - 0.3, M.bulb + 0.2)))
  if (cry > 0) { const e = eyesOf(rs); drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: cry, seed: 3 }) }
  const toss = M.caps + 0.7
  const fly = (r, w, seed, col) => {
    const d = t - toss - seed * 0.04
    if (d < 0) { cap(x, r.x, r.top + w * 0.3, w, -0.12, t, col); return }
    const vx = (seed % 2 ? 1 : -1) * (60 + seed * 23), y = r.top + w * 0.3 - 1400 * d + 520 * d * d
    if (y < -200) return
    cap(x, r.x + vx * d, y, w, -0.12 + d * (seed % 2 ? 7 : -6), t, col)
  }
  if (rt) fly(rt, rt.size * 0.42, 1, EX.gold)
  fly(rs, rs.size * 0.42, 2, EX.chalkPink)
  // the rest of the class's caps, thrown from the floor
  for (let i = 0; i < 10; i++) {
    const d = t - toss - 0.1 - i * 0.05
    if (d < 0 || d > 2.6) continue
    const sx = 120 + i * 92, vy = 1300 + (i * 137 % 300)
    const y = 1330 - vy * d + 560 * d * d
    if (y < -120 || y > 1400) continue
    cap(x, sx + Math.sin(i * 2.3) * 140 * d, y, 64 + (i % 3) * 10, d * (i % 2 ? 6 : -6), t, i % 3 ? EX.gold : EX.chalkPink)
  }
  confetti(x, t, toss + 0.1, { x0: 540, y0: 1250, n: 90, seed: 13, life: 5.5 })
}

const EP = makeEpisode({
  id: 'st13finale', numeral: 'S13 E40', duration: 60, key: 'C',
  q: 'What did the stars *teach* us?', qAccent: EX.chalkYellow,
  teacher: { tag: '★ THE STARS', color: STAR.sky, pitch: 523.25 },
  student: { tag: '♓ PISCES', color: PIS.color, glyph: PIS.glyph, pitch: 739.99 },
  guests: GUESTS,
  board: { title: 'CLASS OF S13' },
  script,
  bulb: 'bulb',
  chalk: ROWS.map(([text], i) => ({ text, x: 0, y: rowY(i), at: `g${i}+0.3`, size: 26, cps: 26 })),
  recap: ["You're a whole *chart*.", 'And a whole *person*.'],
  last: 'Class *dismissed*. Go love well.', lastWho: 't',
  front,
  moods(t, who, ph, M) {
    if (who === 't') {
      if (ph === 'last' || ph === 'recap' || ph === 'bulb') return { mood: 'happy', look: [1, 0] }
      if (t >= M.g0 && t < M.g6 - 0.2) return { mood: 'sparkle', look: [1, 0] }
      if (t >= M.gag && t < M.bulb) return { mood: 'heart', look: [1, 0] }
      return { mood: 'happy', look: [1, -1] }
    }
    if (ph === 'q') return { mood: 'wide', look: [0, -1] }
    if (ph === 'last' || ph === 'recap') return { mood: 'happy', look: [-1, -1] }
    if (ph === 'bulb') return { mood: 'sparkle', look: [-1, -1] }
    if (t >= M.gag && t < M.bulb) return { mood: 'squint', look: [-1, 0] }
    if (t < M.open + 1) return { mood: 'squint', look: [0, 0] }
    return { mood: 'sparkle', look: [-1, 0] }
  },
  cues: (T, M) => {
    const toss = M.caps + 0.7
    return [
      ...Object.keys(GUESTS).map(k => ['whoosh', +(window_(k, T)[0]).toFixed(3), 0.3, 0.02]),
      ['whoosh', +toss.toFixed(3), 0.6, 0.04], ['glitter', +(toss + 0.2).toFixed(3), +(toss + 1.8).toFixed(3)],
      ...[0, 0.12, 0.24].map((d, i) => ['pop', +(toss + d).toFixed(3), [1046.5, 1318.51, 1567.98][i], 0.04, 0]),
    ]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
