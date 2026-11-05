// kroe23: RATE THE OPENER, "12 Signs, 12 Openers" (60 s vertical, long star_advice trial reel, Month 2 boost m37,
// chiptune · C). Built from ../../kroe01/openerkit.js + promo/films/hookkit.js. No end card, no card cut. Hard cut.
//   0.00   frame 0: all 12 signs mid-stampede at the lens, twelve bubbles mid-flight, both paddles mid-flip;
//          hook "12 signs. 12 openers. | Rated." slammed. 0.35 whip zoom. 1.0 promise sticker "WAIT FOR THE 10/10".
//   2.6    chapter FIRE: Aries · Leo · Sagittarius     15.5 chapter EARTH: Taurus · Virgo · Capricorn
//  28.4    chapter AIR: Gemini · Libra · Aquarius      41.3 chapter WATER: Cancer · Scorpio · #12 Pisces
//          each sign (4.3 s): hops onto the phone, its opener flies in, THE STARS' paddle flips, the nameplate says why
//          (Virgo's "question 1 of 30" gets the red pen: "just #1, then"). Pisces judges, sobbing, until #12.
//  52.2    #12: Pisces leaves the judge's seat for the phone: "hi! I cried at a dog video today. what made you smile?"
//          10/10 · the whole panel stands, all 12 signs pop up cheering · 55.4 last line "The best opener sounds like you."
import {
  R, box, label, star, paddle, desk, nameplate, tissues, chatCard, chatBubble, measureBubble, slash, pen, sparkles, confetti, hearts,
  tint, buildBug, loadFonts, signStar, fill, drawSky, drawGrain, layerCanvas, SKY_H, GRAIN_H, pop01, outK, prog, clamp, lerp, ease, easeOutBack,
  JUDGES, DESK, CARD, SLOT, INK, BONE, GOLD, RED, GREEN, INTER, MONO, r3,
} from '../../kroe01/openerkit.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, chapter, chapterCues } from '../../hookkit.js'

export const DURATION = 60
const SEG = 4.3, START = 2.6
const ORDER = [
  ['aries', 'first to reply picks the restaurant. GO.', '8', 'fun + easy'],
  ['leo', 'I’ll go first: my karaoke song is embarrassing. yours?', '9', 'brave + a question'],
  ['sagittarius', 'mountains or beach? no thinking.', '8', 'quick + playful'],
  ['taurus', 'best bakery near you? asking for my heart.', '9', 'cosy + specific'],
  ['virgo', 'question 1 of 30:', '4', 'that’s a survey'],
  ['capricorn', 'let’s skip small talk. big talk?', '6', 'bold. a bit much.'],
  ['gemini', 'two truths and a lie. go.', '9', 'a game = a door'],
  ['libra', 'can’t decide, so: hi, hello AND hey.', '7', 'cute, pick one'],
  ['aquarius', 'unpopular opinion time. you first?', '8', 'curious'],
  ['cancer', 'what’s your comfort meal when it’s cold?', '9', 'warm + easy'],
  ['scorpio', 'tell me a secret. a small one.', '8', 'intriguing, kind'],
  ['pisces', 'hi! I cried at a dog video today. what made you smile?', '10', 'kind + a question'],
]
const CH = [['FIRE', '#f0603a'], ['EARTH', '#e9b24a'], ['AIR', '#7fd0f0'], ['WATER', '#3f7cf0']]
const seg = i => START + i * SEG
const T = { promise: [1.0, 3.6], pisHop: seg(11) - 0.5, ovation: seg(11) + 2.2, last: 55.4, hook: { out: [2.45, 2.6] } }
const HOOK = { at: -1, text: '12 signs. 12 openers. | *Rated.*', top: 200, size: 100, out: T.hook.out }
const WHIP = { at: 0.35, len: 0.5, from: 1.9, to: 1, cx: 540, cy: 900 }
const LAST = { at: T.last, text: 'The best opener | *sounds like you.*', top: 190, size: 96 }
const CHAPS = CH.map(([name, col], i) => ({ at: seg(i * 3) - 0.05, out: [seg(i * 3 + 3) - 0.3, seg(i * 3 + 3) - 0.12], n: i + 1, title: name, color: col, y: 250, x: 70 }))
const VIRGO = 4

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  buildBug(root)
  const gx = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
  const M = ORDER.map(([, txt]) => measureBubble(x, txt, { size: 52 }))
  const MV = measureBubble(x, 'just #1, then: what’s your perfect Sunday?', { size: 48 })

  function stampede(t) {
    // frame 0 → 2.6: twelve signs charging the lens, twelve bubbles flying past
    const k = 1 - clamp((t - 1.9) / 0.7)
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    ORDER.forEach(([sg, txt], i) => {
      const a = i / 12 * Math.PI * 2 + 0.3, rr = 250 + 70 * (i % 3), z = 1 + 0.25 * t
      const cx = 540 + Math.cos(a) * rr * z, cy = 990 + Math.sin(a) * rr * 0.8 * z
      // bubble streaking outward
      x.save(); x.translate(cx + Math.cos(a) * 120 * (1 + t), Math.max(500, cy + Math.sin(a) * 120 * (1 + t) - 90)); x.rotate(Math.cos(a) * 0.2)
      x.font = `800 30px ${INTER}`; const w = Math.min(330, x.measureText(txt).width + 30)
      R(x, INK, -w / 2 - 5, -27, w + 10, 54); R(x, tint(signStar(sg).color, 0.5), -w / 2, -22, w, 44)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.save(); x.beginPath(); x.rect(-w / 2 + 6, -22, w - 12, 44); x.clip(); x.fillText(txt, 0, 1); x.restore()
      x.restore()
      star(x, t, sg, { x: cx, y: cy, s: 190 + 30 * (i % 2), mood: i === 11 ? 'heart' : ['wide', 'happy', 'sparkle'][i % 3], look: [Math.cos(a) * -1, Math.sin(a) * -1], hops: [0.05 * i, 0.9 + 0.04 * i], seed: i + 1, tears: sg === 'pisces' ? 3 : 0 })
    })
    x.restore()
  }

  function sender(t) {
    for (let i = 0; i < 12; i++) {
      const a = seg(i), b = a + SEG
      if (t < a || t >= b + (i === 11 ? 20 : 0)) continue
      const u = t - a, [sg, txt, sc] = ORDER[i]
      const inK = pop01(t, a, 0.32, 2.2), outk = i === 11 ? 1 : outK(t, [b - 0.25, b])
      const mood = u < 0.6 ? 'wide' : u < 1.6 ? 'neutral' : Number(sc) >= 8 ? (u > 2.0 ? 'heart' : 'sparkle') : 'squint'
      const hx = i === 11 ? lerp(JUDGES.end.x, 160, ease.inOutCubic(prog(t, a - 0.5, a))) : 160
      const hy = i === 11 ? lerp(JUDGES.end.y, 1190, ease.inOutCubic(prog(t, a - 0.5, a))) - 160 * Math.sin(Math.PI * prog(t, a - 0.5, a)) : 1190
      star(x, t, sg, { x: hx, y: hy, s: 240, pop: i === 11 ? 1 : inK * outk, mood: i === 11 && t > T.ovation ? 'happy' : mood, look: [1, -0.6], hops: [a + 0.05, a + 1.65, a + 2.6], seed: 3 + i, tears: sg === 'pisces' ? (t > seg(11) + 1.6 ? 3 : 2) : 0 })
      // the opener
      const fly = 1 - ease.outCubic(prog(t, a + 0.1, a + 0.55))
      const k = (1 + 0.45 * fly) * outk
      const dy = 240 * fly
      if (t > a + 0.1) {
        x.save(); x.translate(-60 * fly, dy)
        chatBubble(x, txt, 'R', SLOT.right, SLOT.top, { col: tint(signStar(sg).color, 0.5), size: 52, k, rot: -0.1 * fly })
        if (i === VIRGO && u > 2.2) slash(x, SLOT.right - M[i].w - 16, SLOT.top + M[i].h + 6, SLOT.right + 16, SLOT.top - 6, ease.outCubic(prog(t, a + 2.2, a + 2.5)))
        x.restore()
        if (i === VIRGO && u > 2.5) {
          chatBubble(x, 'just #1, then: what’s your perfect Sunday?', 'R', SLOT.right, SLOT.top + M[i].h + 36, { col: '#fff6ea', size: 48, k: pop01(t, a + 2.5, 0.25, 2) * outk, chars: Math.floor(42 * prog(t, a + 2.5, a + 3.4)) })
          if (u < 3.5) pen(x, SLOT.right - MV.w + 40 + (MV.w - 80) * prog(t, a + 2.5, a + 3.4), SLOT.top + M[i].h + 80, -0.5, outK(t, [a + 3.4, a + 3.6]))
        }
      }
      // the counter: #N / 12
      label(x, `#${i + 1} / 12`, CARD.x + CARD.w - 90, CARD.y + 56, { size: 34, col: GOLD, alpha: inK })
    }
  }

  function judges(t) {
    const J = JUDGES
    // which score is up: the current segment's after +1.6 s
    let i = Math.floor((t - START) / SEG), u = t - seg(i)
    if (t < START) { i = -1; u = 0 }
    i = Math.min(11, i); if (i === 11) u = t - seg(11)
    const sc = i >= 0 ? ORDER[i][2] : '?'
    const f = i < 0 ? (t * 2.4) % 1 : u < 1.6 ? 0.5 + 0.5 * Math.cos(Math.PI * clamp(u / 0.3)) * 0 + (u < 0.3 ? 0.5 - u / 0.6 : 0) : 1 - clamp((u - 1.6) / 0.32)
    const show = i < 0 ? '?' : u < 1.6 ? '?' : sc
    const spinning = i < 0 || (u > 0.3 && u < 1.6)
    const flip = i < 0 ? (t * 2.4) % 1 : spinning ? ((u - 0.3) * 2.6) % 1 : u < 0.3 ? 0 : f
    const big = Number(sc) >= 7
    const lift = u > 1.6 && u < 2.6 ? -24 * Math.exp(-(u - 1.6) * 4) : 0
    const ovK = clamp((t - T.ovation) / 0.4)
    paddle(x, J.stars.x, J.paddleY + lift - 60 * ovK + 4 * Math.sin(t * 3), show, { flip, ink: show === '?' ? INK : big ? '#1f9e55' : RED, rot: -0.06 })
    const sMood = i < 0 || u < 1.6 ? 'wide' : big ? 'happy' : 'squint'
    star(x, t, 'stars', { ...J.stars, y: J.stars.y - 80 * ovK, mood: t > T.ovation ? 'happy' : sMood, look: [0.6, -1], hops: [seg(Math.max(0, i)) + 1.6, T.ovation, T.ovation + 0.6, T.ovation + 1.2], seed: 2 })
    // Pisces: judges with a paddle (always a 10, sobbing) until #12, then the seat is empty but for the tissues
    if (t < T.pisHop) {
      paddle(x, J.end.x, J.paddleY + 4 * Math.sin(t * 3 + 1), i < 0 || u < 1.6 ? '?' : '10', { flip: i < 0 ? (t * 2.4 + 0.37) % 1 : u < 1.6 ? ((u * 2.6) % 1) : 0, ink: '#1f9e55', rot: 0.07 })
      star(x, t, 'pisces', { ...J.end, mood: u > 1.8 && u < 3 ? 'happy' : 'wide', look: [-0.6, -1], hops: [seg(Math.max(0, i)) + 1.7], tears: u > 1.8 ? 3 : 2, seed: 6 })
    } else if (t > seg(11) + 1.6) {
      paddle(x, J.end.x, J.paddleY - 60 * ovK, '10', { ink: '#1f9e55', rot: 0.07, k: pop01(t, seg(11) + 1.6, 0.3, 2.4) })
    }
    desk(x, t)
    tissues(x, 985, DESK.y + 4, 96)
    label(x, 'THE STARS', J.stars.x, DESK.y + 36, { size: 28, col: GOLD })
    label(x, t < T.pisHop ? 'PISCES' : 'PISCES (AWAY)', J.end.x, DESK.y + 36, { size: 28, col: tint(signStar('pisces').color, 0.4) })
    if (i >= 0) nameplate(x, t, ORDER[i][3], seg(i) + 1.75, i === 11 ? 99 : seg(i) + SEG - 0.2, { col: big ? '#d9f7e3' : '#ffd6dc', rot: i % 2 ? 0.025 : -0.03 })
    if (i >= 0 && big) sparkles(x, t, J.stars.x, J.paddleY, seg(i) + 1.9, 10, 130, i)
  }

  function ovation(t) {
    if (t < T.ovation) return
    confetti(x, t, T.ovation + 0.1, 540, 1100, { n: 40 })
    confetti(x, t, T.ovation + 1.4, 300, 1000, { n: 24 })
    // all 12 signs pop up along the desk edge, cheering
    ORDER.forEach(([sg], i) => {
      if (sg === 'pisces') return
      const cx = 70 + i * 94, k = pop01(t, T.ovation + 0.05 * i, 0.35, 2.4)
      star(x, t, sg, { x: cx, y: 1885 - 26 * Math.abs(Math.sin(t * 6 + i)), s: 120, pop: k, mood: i % 2 ? 'happy' : 'sparkle', look: [0, -1], seed: i + 2, tips: false })
    })
    hearts(x, t, T.ovation + 0.3, 160, 1050, { n: 8, cell: 8 })
    // the reply to Pisces' opener lands
    if (t > T.ovation + 0.8) chatBubble(x, 'a kid laughed at a pigeon. you?', 'L', SLOT.left, SLOT.top + M[11].h + 40, { size: 52, k: pop01(t, T.ovation + 0.8, 0.28, 2.4) })
  }

  function promise(t) {
    const k = pop01(t, T.promise[0], 0.3, 2.6) * outK(t, [T.promise[1] - 0.2, T.promise[1]])
    const small = clamp((t - T.promise[1]) / 0.3) * outK(t, [T.ovation - 0.2, T.ovation])
    const draw = (kk, X, Y, sz) => {
      if (kk <= 0.01) return
      x.save(); x.translate(X, Y); x.rotate(0.06); x.scale(kk, kk)
      x.font = `800 ${sz}px ${INTER}`; const w = x.measureText('WAIT FOR THE 10/10').width + 50, h = sz * 1.7
      R(x, 'rgba(6,4,18,0.6)', -w / 2 + 8, -h / 2 + 8, w, h); box(x, -w / 2, -h / 2, w, h, RED, { b: 6 })
      x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WAIT FOR THE 10/10', 0, 3)
      x.restore()
    }
    draw(k * (1 + 0.04 * Math.sin(t * 10)), 540, 1290, 60)
    draw(small, 860, 150, 26)
  }

  return {
    start: 0, end: DURATION + 1, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom + 0.03 * Math.sin(t * 0.4) })
      // element tint wash per chapter
      const ci = Math.max(0, Math.min(3, Math.floor((t - START) / (SEG * 3))))
      if (t > START) { x.save(); x.globalAlpha = 0.12; x.fillStyle = CH[ci][1]; x.fillRect(0, 0, 1080, 1920); x.restore() }
      chatCard(x, t, { match: t < START ? '12 new matches' : `match #${Math.min(12, Math.floor((t - START) / SEG) + 1)}`, sub: 'first message, rated', avatar: t > START ? tint(signStar(ORDER[Math.min(11, Math.floor((t - START) / SEG))][0]).color, 0.3) : '#7fd0ff' })
      sender(t)
      judges(t)
      ovation(t)
      stampede(t)
      promise(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, whipZoom(WHIP), slamTitle(HOOK), ...CHAPS.map(c => chapter(c)), slamTitle(LAST)]

// ── sound
const segCues = ORDER.flatMap(([, , sc], i) => {
  const a = seg(i), big = Number(sc) >= 7
  return [
    ['pop', r3(a + 0.05), 987.77, 0.04, -0.3], ['whoosh', r3(a + 0.1), 0.3, 0.05], ['tick', r3(a + 0.55), 0.06],
    ['tom', r3(a + 0.4), 70, { gain: 0.08, decay: 0.4 }],
    ...(big ? [['bell', r3(a + 1.6), 1760, 0.045, 1.1, -0.2], ['pop', r3(a + 1.72), 2349.32, 0.03, 0.2]]
      : [['chip', r3(a + 1.6), 110, 0.3, { gain: 0.045, wave: 'square', slide: -30 }], ['tom', r3(a + 1.6), 90, { gain: 0.18, decay: 0.2 }]]),
    ['pop', r3(a + 1.75), 1174.66, 0.03, 0],
    ['pluck', r3(a + 1.85), 659.25, 0.03, 0.4, 0.45], ['pluck', r3(a + 2.0), 587.33, 0.026, 0.4, 0.45],   // Pisces sobbing
  ]
})
export const CUES = [
  ...slamTitleCues(HOOK), ['whoosh', 0, 0.4, 0.06], ['crash', 0, { gain: 0.04 }], ...whipZoomCues(WHIP),
  ['tom', T.promise[0], 110, { gain: 0.2, decay: 0.2 }], ['pop', r3(T.promise[0] + 0.05), 1318.51, 0.04, 0],
  ...CHAPS.flatMap(c => chapterCues(c)),
  ...segCues,
  // Virgo's red pen
  ['whoosh', r3(seg(VIRGO) + 2.2), 0.2, 0.06], ...Array.from({ length: 8 }, (_, k) => ['tick', r3(seg(VIRGO) + 2.5 + k * 0.11), 0.035]),
  // Pisces leaves the judges' seat
  ['whoosh', r3(T.pisHop), 0.5, 0.05], ['pluck', r3(T.pisHop + 0.2), 880, 0.035, 0.4, 0],
  // the ovation
  ['crash', T.ovation, { gain: 0.07 }], ['glitter', T.ovation, r3(T.ovation + 1.2)],
  ...Array.from({ length: 10 }, (_, k) => ['clap', r3(T.ovation + 0.1 + k * 0.22), { gain: 0.12, pan: k % 2 ? 0.3 : -0.3 }]),
  ['bell', r3(T.ovation + 0.8), 2349.32, 0.04, 1.4, 0],
  ...slamTitleCues(LAST),
].filter(c => c[1] >= 0 && c[1] < DURATION)
export { T }
void [easeOutBack, BONE, MONO, GREEN, DESK]
