// tr2amlove (20 s vertical, Star Talk Trends · ME AT 2 PM vs ME AT 2 AM · 3) "Poet hours." · synthwave Dbm.
// The format's shared look lives in ./tam.js (identical in all five tr2am films). Story 0–15.6, then the end card.
//   2 PM   "My belief | in *love.*"  A sunny home office. ♑ CAPRICORN at the laptop (a bar chart): "Love? I have | meetings."
//          A sticker slaps on: ROMANCE: NOT IN BUDGET.
//   2 AM   "2 AM: | writing a *poem.*"  The same star in bed, the lamp on, a quill and a page: "Ode to Your Laugh".
//          Three stickers as the clock ticks: RHYMED "MOON" WITH "SOON" (the line writes on) · DRAFT #11 (crumpled pages
//          fly) · the twist: READ IT TO PISCES (♓ pops up on the nightstand and fountains). Up top the 2 PM self
//          squints… gapes… sweats.
//   TURN   a hush… the 2 AM self reads it once more, smiles, and folds the page into a paper star that floats up.
//   card cut.  The stitch opens: the paper star settles in the window by the moon and glows.
//          "Okay. Maybe | love is *real.*"  Box (2 AM CAPRICORN): "fine. I believe in *love.*"
//   LAST   "*Poet* hours."  A neon sign flickers on: OPEN FOR FEELINGS.
import { makeTAM, BEAT, r3, INK, BONE, GOLD, PINK, HOT, NEON, CYAN, INTER, SERIF, clamp, lerp, prog, ease } from './tam.js'

const G = [BEAT(9), BEAT(11), BEAT(13)]
const ME_AM = { x: 250, y: 1372, s: 180 }, ME_PM = { x: 290, y: 862, s: 184 }
const T2 = { fold: BEAT(15) + 0.3, rise: BEAT(15) + 0.9 }
const PAGE = { x: 360, y: 1170, w: 360, h: 200 }
const POEM = [
  { text: 'Ode to Your Laugh', at: 4.95, d: 0.5, title: true },
  { text: 'your laugh is like the moon,', at: G[0] + 0.05, d: 0.5 },
  { text: 'please text me back soon.', at: G[0] + 0.6, d: 0.45 },
]
const LAPTOP = ['LLLLLLLLLLLL', 'LssssssssssL', 'LsssssssbssL', 'LssssbssbssL', 'LsbssbssbssL', 'LsbssbssbssL', 'LLLLLLLLLLLL', 'KKKKKKKKKKKKKK']
const BALL = ['.ww.', 'wWww', 'wwWw', '.ww.']
const PSTAR = ['....Y....', '...YYY...', 'YYYYyYYYY', '.YYyyyYY.', '..YYyYY..', '.YYY.YYY.', 'YY.....YY']

function writeOn(x, line, t, X, Y) {
  const p = clamp((t - line.at) / line.d)
  if (p <= 0) return
  x.save(); x.font = line.title ? `italic 700 32px ${SERIF}` : `italic 600 26px ${SERIF}`
  x.fillStyle = line.title ? '#7a2a4a' : INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  const n = Math.round(line.text.length * p); x.fillText(line.text.slice(0, n), X, Y)
  x.restore()
}

const TAM = makeTAM({
  id: 'tr2amlove', sign: 'capricorn',
  heads: {
    topic: 'My belief | in *love.*',
    spiral: '2 AM: | writing a *poem.*',
    turn: 'Okay. Maybe | love is *real.*',
    last: '*Poet* hours.',
  },
  accents: { topic: '#ff8fb1', spiral: NEON, turn: '#ffd25a', last: '#c9a2ff' },
  stickers: [{ text: 'RHYMED MOON / SOON', x: 790 }, { text: 'DRAFT #11', x: 860 }, { text: 'READ IT TO PISCES', x: 700, y: 1268 }],
  clock: { am: t => t < G[0] ? '2:00 AM' : t < G[1] ? '2:09 AM' : t < G[2] ? '2:33 AM' : '2:58 AM' },
  lampOn: t => t > 4.4 ? 1 : 0.35,
  neon: 'OPEN FOR FEELINGS', neonColor: '#c9a2ff', neonAt: { y: 1040 },
  line: { who: 'me', text: 'fine. I believe in *love.*' },

  pmScene(x, t, W) {
    const { T } = W
    // the desk + laptop with a bar chart
    W.px(500, 900, 300, 16, INK); W.px(504, 902, 292, 10, '#a86a3a'); W.px(520, 916, 14, 40, INK); W.px(766, 916, 14, 40, INK)
    W.bits(LAPTOP, { L: '#3a3f58', s: '#dff3ff', b: '#3fae6a', K: '#5a6378' }, 650, 862, 9)
    let mood = 'neutral', look = [1, 0.3], sweat = false
    if (t > T.pmSay) { mood = 'squint'; look = [1, 0] }
    if (t > T.AMin[1] + 0.2) { mood = 'squint'; look = [0.3, 1] }
    if (t > G[0]) { mood = 'wide'; look = [0.2, 1] }
    if (t > G[1]) sweat = true
    if (t > G[2]) { mood = 'wide'; look = [0, 1] }
    if (t > T2.fold) { mood = 'heart'; look = undefined; sweat = false }
    W.me(ME_PM.x, ME_PM.y, ME_PM.s, { mood, look, sweat, seed: 3, pop: W.pop01(t, T.pmIn, 0.35, 2), hops: [T.pmIn + 0.3, T.pmSay - 0.1, T.pmGag + 0.05, G[0] + 0.02, G[2] + 0.02, T2.fold + 0.1],
      squash: t > G[2] && t < G[2] + 0.5 ? -0.1 * Math.sin((t - G[2]) * 20) : 0 })
    W.bubble(t, 330, 640, T.pmSay, 'Love? I have|meetings.', { t1: T.h0Out[1] + 2.2, size: 38, tx: ME_PM.x + 20, ty: ME_PM.y - 90 })
    const k = W.pop01(t, T.pmGag, 0.3, 2.6)
    if (k > 0.01) {
      x.save(); x.translate(760, 770); x.rotate(0.05); x.scale(k, k)
      x.font = `800 28px ${INTER}`; const s = 'ROMANCE: NOT IN BUDGET', w = x.measureText(s).width + 34
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -28, w + 8, 56); x.fillStyle = '#fffaf0'; x.fillRect(-w / 2, -24, w, 48)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore()
    }
  },

  amScene(x, t, W) {
    const { T } = W
    // the 2 AM self in bed, quill in hand
    let mood = 'sparkle', look = [1, -0.4], tears = 0
    if (t > G[0]) { mood = 'heart'; look = undefined }
    if (t > G[1]) { mood = 'squint'; look = [1, -0.5] }
    if (t > G[2]) { mood = 'wide'; look = [1, 0] }
    if (t > G[2] + 0.5) { mood = 'happy'; tears = 1 }
    if (t > T.hush[0]) { mood = 'neutral'; look = [1, -0.6]; tears = 0 }
    if (t > T2.fold - 0.2) { mood = 'happy'; look = undefined }
    if (t > T.open[1]) { mood = 'sparkle'; look = [-1, -1] }
    if (t > T.line + 1.1) { mood = 'heart'; look = undefined }
    const F = W.me(ME_AM.x, ME_AM.y, ME_AM.s, { mood, look, tears, seed: 3, pop: W.pop01(t, T.amIn, 0.35, 2),
      hops: [T.amIn + 0.3, G[0] + 0.3, G[1] + 0.02, G[2] + 0.5, T2.fold, T.open[1], T.line + 1.1, T.neon + 0.3] })
    // the quill (scribbles while the poem writes)
    const scrib = t > 4.9 && t < G[1] + 0.3 ? Math.sin(t * 40) * 0.12 : 0
    if (t > T.amIn + 0.3 && t < T2.fold) {
      x.save(); x.translate(F.ox + 100, F.oy - 70 + 6 * scrib * 10); x.rotate(0.6 + scrib)
      W.bits(['..f', '.ff', 'fFf', 'fF.', 'F..', 'k..'], { f: '#fff1f6', F: '#ff8fb1', k: INK }, 0, 0, 7)
      x.restore()
    }
    W.blanket(t, '#7a4ab0', '#a07ad8', 1438)
    // crumpled drafts: on the floor + bed (they pile up from the second gag)
    for (let i = 0; i < 7; i++) {
      const b = G[1] + i * 0.12, q = ease.outQuad(prog(t, b, b + 0.45))
      if (q <= 0) continue
      const ex = 120 + ((i * 97) % 560), ey = 1470 + ((i * 37) % 90)
      const X = lerp(PAGE.x, ex, q), Y = lerp(PAGE.y, ey, q) - Math.sin(Math.PI * q) * 160
      W.bits(BALL, { w: '#f4efe2', W: '#d8cfb8' }, X, Y, 8, { rot: q * 6 + i })
    }
    // ♓ Pisces hears it read aloud (nightstand), fountains; stays for the room
    const pk = W.pop01(t, G[2] + 0.1, 0.32, 2.4)
    if (pk > 0.01) W.pisces(890, 1326, 130, 3, 'happy', { pop: pk, look: [-1, 0], hops: [G[2] + 0.45, G[2] + 0.8, T.open[1] + 0.1, T.neon + 0.35] })
    // the page (writes on), then folds into a paper star that floats up to the window
    const fold = ease.inOutCubic(prog(t, T2.fold, T2.fold + 0.5))
    const pg = W.pop01(t, T.amIn + 0.25, 0.3, 2.2)
    if (pg > 0.01 && fold < 1) {
      x.save(); x.translate(PAGE.x, PAGE.y); x.rotate(-0.04 + fold * 3); x.scale(pg * (1 - fold), pg * (1 - fold * 0.6))
      const { w, h } = PAGE
      x.fillStyle = 'rgba(4,2,12,0.4)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10); x.fillStyle = '#fbf5e6'; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = 'rgba(120,150,220,0.35)'; for (let Y = -h / 2 + 52; Y < h / 2; Y += 40) x.fillRect(-w / 2 + 10, Y + 14, w - 20, 2)
      x.fillStyle = 'rgba(255,120,150,0.5)'; x.fillRect(-w / 2 + 28, -h / 2, 2, h)
      // draft number, top right
      if (t > G[1]) { x.font = `700 20px ${INTER}`; x.fillStyle = HOT; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText('#11', w / 2 - 12, -h / 2 + 18) }
      POEM.forEach((L, i) => writeOn(x, L, t, -w / 2 + 40, -h / 2 + 32 + i * 44 + (i ? 14 : 0)))
      // the little doodle heart at the end
      if (t > G[0] + 1) W.bits(['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: HOT }, w / 2 - 40, h / 2 - 30, 5)
      x.restore()
    }
    // the paper star: rises from the page, settles by the moon in the window, glows
    if (fold > 0.6) {
      const r = ease.inOutCubic(prog(t, T2.rise, T.open[1] + 0.3))
      const X = lerp(PAGE.x, 330, r), Y = lerp(PAGE.y, 760, r) + 6 * Math.sin(t * 2.4)
      const k = W.pop01(t, T2.fold + 0.3, 0.3, 2.4)
      const glow = 0.5 + 0.3 * Math.sin(t * 3)
      const gg = x.createRadialGradient(X, Y, 0, X, Y, 90); gg.addColorStop(0, `rgba(255,226,140,${glow * 0.6})`); gg.addColorStop(1, 'rgba(255,226,140,0)')
      x.fillStyle = gg; x.fillRect(X - 90, Y - 90, 180, 180)
      W.bits(PSTAR, { Y: '#fbf5e6', y: '#ffd98a' }, X, Y, 9 * k, { rot: 0.1 * Math.sin(t * 1.7) })
      if (t > T.open[1] + 0.3 && t < T.open[1] + 1) W.sparkles(t, X, Y, T.open[1] + 0.3, 8, 70, 2, [GOLD, '#fff', PINK])
    }
  },

  cues(T) {
    return [
      // the 2 PM sticker: a stamp-ish clunk
      ['tom', r3(T.pmGag), 120, { gain: 0.1, decay: 0.15 }],
      // the quill scratches (the title, the moon/soon couplet)
      ...POEM.flatMap(L => Array.from({ length: Math.floor(L.d / 0.07) }, (_, i) => ['tick', r3(L.at + i * 0.07), 0.012])),
      ['bell', r3(G[0] + 0.95), 1318.51, 0.02, 0.8, -0.2],
      // DRAFT #11: crumple + seven paper balls
      ...Array.from({ length: 7 }, (_, i) => ['tick', r3(G[1] + i * 0.12 + 0.4), 0.03 + 0.01 * (i % 2)]),
      ['whoosh', r3(G[1] + 0.05), 0.3, 0.03],
      // Pisces pops up and fountains
      ['pop', r3(G[2] + 0.12), 1567.98, 0.04, 0.4], ['pluck', r3(G[2] + 0.5), 659.25, 0.025, 0.5, 0.4], ['pluck', r3(G[2] + 0.85), 587.33, 0.025, 0.5, 0.4],
      // the fold + the paper star floats up
      ['whoosh', r3(T2.fold), 0.25, 0.03], ['tick', r3(T2.fold + 0.25), 0.04], ['tick', r3(T2.fold + 0.4), 0.04],
      ['pluck', r3(T2.fold + 0.55), 1174.66, 0.03, 0.8, -0.1], ['riser', r3(T2.rise), r3(T.open[1] + 0.3), 0.02],
      ['bell', r3(T.open[1] + 0.3), 1760, 0.03, 1.4, -0.3],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TAM
