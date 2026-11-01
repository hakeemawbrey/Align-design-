// yrcancer: THEN vs NOW, "Cancer dating in 2016 / 2026" (20 s vertical, Star Talk Then vs Now, Block A #4, music: pop · F)
// The format's look lives in ./thennow.js (identical in yraries, yrtaurus, yrgemini, yrcancer, yrleo).
//   0–6.71    2016, a craft desk at night (old-phone grade, "06·21·2016"). ♋ Cancer (side-swept bangs) is making a
//             scrapbook, "US ♥ WEEK 1": printed photos thump down one by one, washi tape, stickers, glitter. ♍ Virgo
//             peeks in: "it's been… a week?" Cancer holds it up, proud, a little teary: "this is volume ONE."
//             ♓ Pisces cries by the lamp.
//   6.71      card cut; the year sticker flips to 2026.
//   6.71–12.8 2026, the two on a couch with a shared album on screen, "US · WEEK 1": photos pop in, each one captioned
//             ("day 2: their laugh", "day 3: shoes!!" …). Then Virgo adds one: "day 7: you". Cancer melts: "I'm not
//             crying." (crying).
//   12.8–15.6 the 2016 polaroid next to 2026; THE STARS: "feelings, *archived with love.*"; last "*Soft* never left."
import {
  makeThenNow, drawStarChar, signStar, R, speech, hearts, sparkles, drawBits, pisces, starFrame, inSprite, tearsCells, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, MONO, SERIF, INTER, HEART, HEART_BM, SW, lerp, prog, ease, easeOutBack,
} from './thennow.js'

const CAN = signStar('cancer'), VIR = signStar('virgo')
const MINI = ['..X..', '.XXX.', 'XXXXX', '.XXX.', '.X.X.']
const TILE_BG = ['#ffd6a0', '#c9e8ff', '#ffd1e3', '#d6f5d0', '#e8dcff', '#fff1a8']

function tile(x, cx, cy, w, h, i, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -w / 2 - 4, -h / 2 - 4, w + 8, h + 8); R(x, '#fffaf0', -w / 2, -h / 2, w, h)
  const m = Math.max(6, w * 0.07)
  R(x, TILE_BG[i % 6], -w / 2 + m, -h / 2 + m, w - 2 * m, h - 2 * m - (rot ? m * 1.5 : 0))
  const c = w / 22
  drawBits(x, MINI, { X: CAN.color }, -w * 0.16, -m * 0.4, c)
  drawBits(x, MINI, { X: VIR.color }, w * 0.16, -m * 0.4, c)
  if (i % 3 === 1) drawBits(x, HEART_BM, { H: HEART }, 0, -h * 0.3, c * 0.8)
  x.restore()
}

// ── THEN: the week-one scrapbook
const A = { photos: [1.2, 1.65, 2.1, 2.55, 3.0], tape: 3.3, glitter: 3.55, peek: [3.7, 4.0], week: 4.15, hold: [4.95, 5.25], one: 5.45 }
const SLOTS = [[-250, -40, -0.08], [-120, 90, 0.06], [110, -60, 0.05], [250, 60, -0.07], [140, 120, 0.1]]
function sceneA(x, t) {
  // a bedroom wall at night, a lamp
  R(x, '#5a3a5a', 0, 0, SW, 1060)
  for (let i = 0; i < 12; i++) R(x, '#62406a', i * 80, 0, 4, 820)
  R(x, INK, 700, 80, 170, 200); R(x, '#1f1a3a', 708, 88, 154, 184); R(x, '#fff1c8', 740, 120, 5, 5); R(x, '#fff1c8', 820, 200, 5, 5)
  // ♓ by the lamp (left), crying at the craftsmanship
  pisces(x, t, 785, 215, 110, t > A.hold[0] ? 3 : 2, { mood: t > A.hold[0] ? 'sparkle' : 'wide', look: [-1, 1], seed: 6 })
  // the desk
  R(x, INK, 0, 812, SW, 30); R(x, '#a06a40', 0, 818, SW, 20); R(x, '#7a4f2e', 0, 838, SW, 222)
  // the scrapbook: open spread, lifted up at the end
  const hold = ease.outBack(prog(t, ...A.hold))
  x.save(); x.translate(450, lerp(500, 480, hold)); x.scale(lerp(1, 1.05, hold), lerp(1, 1.05, hold)); x.rotate(lerp(0, -0.03, hold))
  R(x, INK, -390, -200, 780, 400); R(x, '#c65a6a', -384, -194, 768, 388)
  R(x, '#fff3e2', -370, -182, 366, 364); R(x, '#fff3e2', 4, -182, 366, 364); R(x, INK, -4, -190, 8, 380)
  x.font = `italic 600 60px ${SERIF}`; x.fillStyle = '#c65a6a'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('us', -250, -130); drawBits(x, HEART_BM, { H: HEART }, -190, -132, 7)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#7a5cc4'; x.fillText('WEEK 1', -250, -80)
  A.photos.forEach((p, i) => {
    if (t < p) return
    const k = easeOutBack(prog(t, p, p + 0.25), 1.8), [sx, sy, r] = SLOTS[i]
    tile(x, sx, lerp(sy - 120, sy, k), 150 * lerp(1.3, 1, k), 130 * lerp(1.3, 1, k), i, r)
  })
  if (t > A.tape) for (const [sx, sy] of [[-250, -105], [110, -125], [250, -5]]) { x.save(); x.globalAlpha = pop01(t, A.tape, 0.2, 2); R(x, 'rgba(255,214,120,0.85)', sx - 34, sy - 10, 68, 20); x.restore() }
  if (t > A.glitter) { drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'], { Y: GOLD }, 300, -150, 6 * pop01(t, A.glitter, 0.2, 3)); drawBits(x, HEART_BM, { H: PINK }, -60, 150, 6 * pop01(t, A.glitter + 0.1, 0.2, 3)) }
  x.restore()
  sparkles(x, t, 450, 470, A.glitter, 12, 280, 1, [GOLD, PINK, BONE], 24)
  // ♋ Cancer at the desk (glue stick in hand), later holding the book up
  const ch = [...A.photos, A.hold[0], A.one]
  const CY = 905
  let cm = 'happy'
  if (t > A.week) cm = 'sparkle'
  drawStarChar(x, 300, CY, 250, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: t > A.week && t < A.hold[0] ? [1, -1] : undefined, seed: 4, hops: ch })
  const F = starFrame(300, CY, 250, t, { hops: ch, seed: 4 })
  bangs(x, F)
  if (t > A.hold[0]) inSprite(x, F, () => tearsCells(x, t, 1))
  if (t < A.hold[0]) { R(x, INK, 404, 846, 26, 64); R(x, '#fffaf0', 408, 850, 18, 40); R(x, '#7a5cc4', 408, 890, 18, 16) }
  // a pile of printed photos
  for (let i = 0; i < 4 - Math.min(4, A.photos.filter(p => t > p).length); i++) tile(x, 640 + i * 6, 900 - i * 8, 120, 100, i + 2, 0.1 - i * 0.06)
  // ♍ Virgo peeks in from the right
  const pk = ease.outCubic(prog(t, ...A.peek))
  if (pk > 0) drawStarChar(x, lerp(1000, 790, pk), 700, 210, t, { color: VIR.color, glyph: VIR.glyph, mood: 'wide', look: [-1, 0], seed: 9, hops: [A.week] })
  speech(x, t, 700, 520, A.week, 'it’s been…\na week?', { size: 36, tail: 1, life: 1.3 })
  speech(x, t, 300, 730, A.one, 'this is\nvolume ONE.', { size: 38, tail: -1, life: 1.2, col: '#d6f2ff' })
}

// ── NOW: a shared album, captioned
const B = { open: 7.1, adds: [7.45, 7.9, 8.35, 8.8, 9.25], hers: 10.25, melt: 10.75, notCrying: 11.15 }
const CAPS = ['day 1: hi!!', 'day 2: their laugh', 'day 3: shoes!!', 'day 4: rain walk', 'day 5: same order']
function sceneB(x, t) {
  // living room, warm and clean
  R(x, '#ffe9d6', 0, 0, SW, 1060)
  R(x, '#ffd6c0', 0, 640, SW, 420)
  R(x, INK, 40, 70, 150, 120); R(x, '#c9e8ff', 48, 78, 134, 104); drawBits(x, MINI, { X: CAN.color }, 96, 130, 6); drawBits(x, MINI, { X: VIR.color }, 136, 130, 6)
  // the couch
  R(x, INK, 30, 760, 840, 260); R(x, '#7a5cc4', 36, 766, 828, 248); R(x, '#8f74d8', 36, 766, 828, 30)
  R(x, INK, 30, 880, 840, 8)
  // ♓ on the armrest, crying again
  pisces(x, t, 820, 700, 110, t > B.melt ? 3 : 2, { mood: t > B.melt ? 'happy' : 'sparkle', look: [-1, 0], seed: 6 })
  // the phone: the shared album
  const PX = 450, PY = 380, PW = 470, PH = 520
  const pk = easeOutBack(prog(t, B.open - 0.3, B.open + 0.1), 1.4)
  x.save(); x.translate(PX, PY); x.scale(pk, pk)
  R(x, INK, -PW / 2 - 14, -PH / 2 - 14, PW + 28, PH + 28); R(x, BONE, -PW / 2 - 8, -PH / 2 - 8, PW + 16, PH + 16); R(x, '#fffaf0', -PW / 2, -PH / 2, PW, PH)
  x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('US · WEEK 1', -PW / 2 + 24, -PH / 2 + 40)
  const n = B.adds.filter(a => t > a).length + (t > B.hers ? 1 : 0)
  x.font = `700 22px ${MONO}`; x.fillStyle = '#7a5cc4'; x.textAlign = 'right'; x.fillText(`${n} photos`, PW / 2 - 22, -PH / 2 + 42)
  const items = [...CAPS.map((c, i) => ({ c, at: B.adds[i], i })), { c: 'day 7: you', at: B.hers, i: 5, mine: true }]
  items.forEach((it, k) => {
    if (t < it.at) return
    const col = k % 2, row = Math.floor(k / 2)
    const cx = -PW / 4 + col * PW / 2, cy = -PH / 2 + 140 + row * 148
    const s = pop01(t, it.at, 0.3, 2.4)
    x.save(); x.translate(cx, cy); x.scale(s, s)
    if (it.mine) { R(x, HEART, -112, -66, 224, 156); }
    tile(x, 0, -10, 190, 104, it.i)
    x.font = `700 21px ${MONO}`; x.fillStyle = it.mine ? '#fffaf0' : INK; x.textAlign = 'center'
    x.fillText(it.c, 0, 66)
    x.restore()
  })
  x.restore()
  sparkles(x, t, PX + PW / 4, PY - PH / 2 + 436, B.hers, 10, 140, 1, [HEART, GOLD, BONE], 24)
  // the two on the couch
  let cm = 'happy'
  if (t > B.hers) cm = 'wide'
  if (t > B.melt) cm = 'heart'
  const cH = [...B.adds, B.melt, B.notCrying]
  drawStarChar(x, 260, 830, 240, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: [1, -1], seed: 4, hops: cH, squash: t > B.melt ? 0.08 * Math.min(1, (t - B.melt) * 3) : 0 })
  const F = starFrame(260, 830, 240, t, { hops: cH, seed: 4 })
  if (t > B.melt) inSprite(x, F, () => tearsCells(x, t, 3))
  drawStarChar(x, 620, 830, 240, t, { color: VIR.color, glyph: VIR.glyph, mood: t > B.hers ? 'wink' : 'happy', look: [-1, -1], seed: 9, hops: [B.hers, B.hers + 0.3] })
  speech(x, t, 300, 690, B.notCrying, 'I’m not crying.', { size: 38, tail: -1, life: 1.55, col: '#d6f2ff' })
  if (t > B.melt) hearts(x, t, 560, 760, B.melt, { n: 7, life: 1.5, cell: 6, spread: 200 })
}

const EP = makeThenNow({
  id: 'yrcancer', thing: 'Cancer dating in', then: '2016', stamp: '06·21·2016', accent: '#7fd0ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: week one. a *whole scrapbook.*' },
    { t: 9.4, text: 'a shared album now. *still captioned.*' },
    { t: 12.92, text: 'feelings, *archived with love.*' },
  ],
  last: '*Soft* never | left.',
  cues: () => [
    ...A.photos.map((p, i) => ['tom', p + 0.2, 160 + i * 10, { gain: 0.14, decay: 0.12 }]), ...A.photos.map((p, i) => ['pop', r3(p + 0.2), 880 + i * 110, 0.03, -0.2]),
    ['tick', A.tape, 0.04], ['tick', r3(A.tape + 0.08), 0.04], ['glitter', A.glitter, r3(A.glitter + 0.4)],
    ['whoosh', A.peek[0], 0.25, 0.03], ['pop', A.week, 659.25, 0.035, 0.4], ['whoosh', A.hold[0], 0.3, 0.03], ['pop', A.one, 1046.5, 0.04, -0.3],
    ['whoosh', B.open - 0.3, 0.3, 0.03], ...B.adds.map((a, i) => ['pop', a, 1046.5 + i * 90, 0.035, 0]), ...B.adds.map(a => ['tick', r3(a + 0.15), 0.02]),
    ['pluck', B.hers, 1567.98, 0.05, 0.5, 0.3], ['bell', r3(B.hers + 0.05), 2093, 0.025, 1.0, 0.3], ['glitter', B.hers, r3(B.hers + 0.4)],
    ['pop', B.melt, 783.99, 0.035, -0.3], ['pop', B.notCrying, 880, 0.035, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
