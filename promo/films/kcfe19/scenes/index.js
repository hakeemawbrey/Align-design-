// kcfe19: ZODIAC CONFESSIONAL ep 19 (long), "Episode: The Seating Chart" (80 s vertical, music: jazzy · C). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition. Chapter stickers from the hook kit.
// Cast: ♎ Libra, ♒ Aquarius, ♑ Capricorn, and the crush, ♏ Scorpio. Pisces runs the boom and cries all episode.
//   0.0–4.2   COLD OPEN: Libra mid-FLIP of the seating chart, name cards flying (whip); hook "Libra seated their crush
//             *next to them.*" · record scratch: "wait for *the toast.*"
//   4.2–16    CH 1 · THE PLAN: Capricorn's clipboard "run-of-show: *toast at 8:40.*" · Aquarius "I'm on *bread.*" · Libra
//             swaps two name cards (caught) "…*nothing* happened." · Capricorn "did the cards *move?*"
//   16–41     CH 2 · CONFESSIONALS: Libra "it was an *accident.*" / PRODUCER "you moved it twice." / "…it was *two
//             accidents.*" / "they smell like *cinnamon.*" · Aquarius "I'm just here for the *vibes.*" / "and the *bread.*" /
//             PRODUCER "and Libra?" / "Libra's in love. *it's very obvious.*" · Capricorn "I made a *run-of-show.*" /
//             "there's a toast at *8:40.*" / PRODUCER "who's giving it?" / "…I didn't *assign* that."
//   41–57     CH 3 · THE DINNER: elbows bump: "sorry! elbow! *my elbow.*" · Aquarius, nature-show voice: "here we see a
//             Libra, *unable to speak.*" "fascinating." · 3-2-1 → "it's 8:40. *toast time.*" · Capricorn: "to… the *bread?*"
//             · Aquarius "*thank you.*"
//   57–80     CH 4 · THE TOAST: Libra stands: "I'm really glad you're here." / "next to me. *on purpose.*" · Scorpio "…I
//             swapped the cards *too.*" (Pisces bawls) · Capricorn "that's not on the *run-of-show.*" / writes "8:41 · LOVE"
//             · Aquarius "nature is *healing.*"
//   76.0      last line "Two swapped cards. *One* table." holds → hard cut at 80.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, RED, INTER, MONO, SERIF,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawDiningRoom, drawTable, recChrome, blk, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import {
  slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues, caught, caughtCues,
  countdown, countdownCues,
} from '../../hookkit.js'

export const DURATION = 80
const SHOTS = [
  [0, 4.2, 'cold'], [4.2, 16, 'plan'],
  [16, 24.4, 'booth', 'libra'], [24.4, 32.4, 'booth', 'aquarius'], [32.4, 41, 'booth', 'capricorn'],
  [41, 80.1, 'dinner'],
]
const T = { scratch: 0.9, swap: [10.0, 10.8], elbow: 41.6, count: 49.3, stand: 57.0, reveal: 63.0, write: 68.4, hands: 73.0, last: 76.0 }
const HOOK = { at: -1, text: 'Libra seated their crush | *next to them.*', top: 150, size: 92, accentColor: SIGN('libra').color, out: [4.0, 4.2] }
const WHIP0 = { at: -0.26, len: 0.5, from: 1.7, blur: 12 }
const REC = { at: T.scratch, len: 1.7, caption: 'wait for *the toast.*', sub: '8:40 pm, allegedly', top: 1560 }
const CAUGHT = { at: 10.3, x: 540, y: 1180, r: 240, label: null, arrow: null, rec: false, out: [12.6, 12.9] }
const COUNT = { at: T.count, from: 3, gap: 0.5, go: '8:40', y: 760, color: GOLD }
const CH = [
  { at: 4.3, out: [15.7, 16], n: 1, title: 'THE PLAN', color: GOLD },
  { at: 16.1, out: [40.7, 41], n: 2, title: 'CONFESSIONALS', color: '#7fd0f0' },
  { at: 41.1, out: [56.7, 57], n: 3, title: 'THE DINNER', color: PINK },
  { at: 57.1, out: [75.6, 76], n: 4, title: 'THE TOAST', color: '#9fe6b0' },
]
const WHIPS = [...SHOTS.slice(1).map(s => ({ at: s[0] - 0.04, len: 0.4, from: 1.5 })), { at: T.stand - 0.04, len: 0.4, from: 1.4 }, { at: T.reveal - 0.04, len: 0.4, from: 1.3 }]
const w = id => { const s = SIGN(id); return { who: `${s.glyph}︎ ${s.name}`, color: s.color } }
const CAPS = [
  { t: 4.8, end: 7.4, ...w('capricorn'), text: 'run-of-show: arrivals 7:00, *toast at 8:40.*' },
  { t: 7.6, end: 9.4, ...w('aquarius'), text: "I'm on *bread.*" },
  { t: 11.2, end: 13.4, ...w('libra'), text: '…*nothing* happened.' },
  { t: 13.6, end: 15.8, ...w('capricorn'), text: 'did the cards *move?*' },
  { t: 16.4, end: 18.4, ...w('libra'), text: 'it was an *accident.*' },
  { t: 18.6, end: 20.0, kind: 'prod', text: 'you moved it twice.' },
  { t: 20.2, end: 22.4, ...w('libra'), text: '…it was *two accidents.*' },
  { t: 22.5, end: 24.3, ...w('libra'), text: 'they smell like *cinnamon.*', accent: PINK },
  { t: 24.8, end: 26.8, ...w('aquarius'), text: "I'm just here for the *vibes.*" },
  { t: 27.0, end: 28.6, ...w('aquarius'), text: 'and the *bread.*' },
  { t: 28.8, end: 30.2, kind: 'prod', text: 'and Libra?' },
  { t: 30.4, end: 32.3, ...w('aquarius'), text: "Libra's in love. *it's very obvious.*" },
  { t: 32.8, end: 34.8, ...w('capricorn'), text: 'I made a *run-of-show.*' },
  { t: 35.0, end: 37.0, ...w('capricorn'), text: "there's a toast at *8:40.*" },
  { t: 37.2, end: 38.6, kind: 'prod', text: "who's giving it?" },
  { t: 38.8, end: 40.9, ...w('capricorn'), text: "…I didn't *assign* that.", accent: RED },
  { t: 42.2, end: 44.4, ...w('libra'), text: 'sorry! elbow! *my elbow.*' },
  { t: 44.8, end: 47.4, ...w('aquarius'), text: 'here we see a Libra, *unable to speak.*' },
  { t: 47.5, end: 49.1, ...w('aquarius'), text: '*fascinating.*' },
  { t: 51.4, end: 52.6, ...w('capricorn'), text: "it's 8:40. *toast time.*" },
  { t: 52.8, end: 54.6, ...w('capricorn'), text: 'to… the *bread?*' },
  { t: 54.8, end: 56.6, ...w('aquarius'), text: '*thank you.*' },
  { t: 57.6, end: 60.0, ...w('libra'), text: "I'm really glad you're here." },
  { t: 60.2, end: 62.7, ...w('libra'), text: 'next to me. *on purpose.*', accent: PINK },
  { t: T.reveal, end: 65.6, ...w('scorpio'), text: '…I swapped the cards *too.*', accent: PINK },
  { t: 66.0, end: 68.2, ...w('capricorn'), text: "that's not on the *run-of-show.*" },
  { t: 68.4, end: 70.4, ...w('capricorn'), text: '*adding it.*' },
  { t: 70.8, end: 72.8, ...w('aquarius'), text: 'nature is *healing.*' },
  { t: T.last, end: 99, who: 'THE HOUSE', color: BONE, text: 'Two swapped cards. *One* table.' },
]
const LOWER = { libra: '“moved one (1) name card”', aquarius: '“here for the vibes”', capricorn: '“wrote the run-of-show”' }
const shotAt = t => SHOTS.find(s => t >= s[0] && t < s[1]) || SHOTS[SHOTS.length - 1]
const SEAT4 = [190, 420, 660, 890]

function nameCard(x, cx, cy, text, col, rot = 0, k = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  blk(x, -70, -26, 140, 52, BONE, { r: 4, ink: 4, hi: 0, lo: 0 })
  x.font = `900 24px ${INTER}`; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function room(t, cast, { cards = null, swapK = 0 } = {}) {
    drawDiningRoom(x, t, { wall: '#2a4a4a' })
    // wall clock
    blk(x, 760, 470, 120, 120, BONE, { r: 60, hi: 0, lo: 0 })
    const ang = t > T.count + 2 && t < T.stand + 10 ? 0.7 : -0.5
    x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(820, 530); x.lineTo(820 + Math.cos(ang - Math.PI / 2) * 40, 530 + Math.sin(ang - Math.PI / 2) * 40); x.stroke(); x.beginPath(); x.moveTo(820, 530); x.lineTo(820 + 26 * Math.cos(1.8), 530 + 26 * Math.sin(1.8)); x.stroke()
    cast.forEach((c, i) => { if (c) seat(x, t, c.id, { x: c.x ?? SEAT4[i], y: c.y ?? 1020, s: 230, hops: c.hops }, { mood: c.mood || 'neutral', look: c.look, tears: c.tears || 0, seed: 50 + i, sweat: c.sweat || 0, blush: c.blush }) })
    drawTable(x, t, { y: 1150, plates: SEAT4, candles: [305, 775] })
    // bread basket
    blk(x, 480, 1170, 120, 50, '#c89a5a', { r: 18 }); x.fillStyle = '#e8b25a'; for (let i = 0; i < 3; i++) { x.beginPath(); x.ellipse(510 + i * 30, 1166, 22, 14, 0.3, 0, Math.PI * 2); x.fill() }
    // name cards (the swap: Libra's neighbour seat 3 trades with seat 4)
    const names = cards || [['CAPRICORN', SIGN('capricorn').color], ['LIBRA', SIGN('libra').color], ['SCORPIO', SIGN('scorpio').color], ['AQUARIUS', SIGN('aquarius').color]]
    names.forEach(([n, c], i) => {
      let cx = SEAT4[i], cy = 1290
      if (swapK > 0 && (i === 2 || i === 3)) { const d = i === 2 ? 1 : -1; cx = lerp(SEAT4[i], SEAT4[i + d], swapK); cy -= Math.sin(Math.PI * swapK) * 80 }
      nameCard(x, cx, cy, n, c)
    })
  }

  function cold(t) {
    room(t, [{ id: 'capricorn', mood: 'wide', look: [1, 0] }, { id: 'libra', mood: 'squint', look: [0, 1] }, null, { id: 'aquarius', mood: 'happy', look: [-1, 0] }], { cards: [] })
    // the seating chart mid-flip + flying name cards
    const p = prog(t, -0.6, 1.2)
    x.save(); x.translate(420, 820); x.rotate(-0.2 + p * 0.5); x.scale(1, Math.cos(p * 3)); blk(x, -150, -100, 300, 200, '#fbf0d8', { r: 6, hi: 0, lo: 0 }); x.font = `900 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('SEATING', 0, -40); x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(-110, -10, 220, 80); x.restore()
    ;[['SCORPIO', SIGN('scorpio').color], ['LIBRA', SIGN('libra').color], ['AQUARIUS', SIGN('aquarius').color], ['CAPRICORN', SIGN('capricorn').color]].forEach(([n, c], i) => {
      const a = -Math.PI / 2 + (i - 1.5) * 0.7, r = 200 + (t + 0.6) * 260
      nameCard(x, 420 + Math.cos(a) * r, 820 + Math.sin(a) * r * 0.8 + 200 * (t + 0.6) * (t + 0.6), n, c, (t + 0.6) * (i % 2 ? 4 : -4))
    })
    boomOp(x, t, { tears: 3, mood: 'wide', mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { label: 'COMING UP', tc0: 9800, y0: 440 })
  }
  function plan(t) {
    const swapK = ease.inOutCubic(prog(t, ...T.swap))
    room(t, [
      { id: 'capricorn', mood: step(t, [[4, 'neutral'], [13.6, 'squint']]), look: t > 13.6 ? [1, 1] : [0, 0], hops: [4.85, 5.5, 13.65] },
      { id: 'libra', mood: step(t, [[4, 'happy'], [9.8, 'squint'], [11.2, 'happy']]), look: t > 9.8 && t < 11 ? [1, 1] : [0, 0], hops: [11.25, 11.9], blush: t > 10 ? 1 : undefined },
      null,
      { id: 'aquarius', mood: 'happy', hops: [7.65, 8.2] },
    ], { cards: [['CAPRICORN', SIGN('capricorn').color], ['LIBRA', SIGN('libra').color], ['AQUARIUS', SIGN('aquarius').color], ['SCORPIO', SIGN('scorpio').color]], swapK })
    if (t > 4.8 && t < 8) { const k = pop01(t, 4.8, 0.3, 2); x.save(); x.translate(190, 780); x.scale(k, k); x.rotate(-0.06); blk(x, -110, -130, 220, 260, '#c89a5a', { r: 8 }); blk(x, -90, -100, 180, 210, '#fbf7ee', { r: 4, ink: 3, hi: 0, lo: 0 }); x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; ['7:00 arrive', '7:30 eat', '8:40 TOAST', '9:00 pie'].forEach((s, i) => x.fillText(s, -76, -60 + i * 44)); x.restore() }
    boomOp(x, t, { tears: 2, mood: 'sparkle', mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { tc0: 700, y0: 440 })
  }
  function booth(t, id) {
    drawBooth(x, t, { sign: id })
    let mood = 'neutral', look = [0, 0], sweat = 0
    if (id === 'libra') mood = step(t, [[16, 'happy'], [18.6, 'wide'], [20.2, 'squint'], [22.5, 'heart']])
    if (id === 'aquarius') mood = step(t, [[24, 'happy'], [27, 'sparkle'], [28.8, 'neutral'], [30.4, 'wink']])
    if (id === 'capricorn') { mood = step(t, [[32, 'neutral'], [35, 'happy'], [37.2, 'wide'], [38.8, 'wide']]); sweat = t > 38.8 ? 1 : 0 }
    const F = seat(x, t, id, { ...SUBJ, hops: CAPS.filter(c => c.who && c.who.includes(SIGN(id).name) && c.t > 16 && c.t < 41).map(c => c.t + 0.05) }, { mood, look, sweat, seed: 3, blush: id === 'libra' && t > 22.5 ? 1 : undefined })
    drawChairFront(x)
    if (id === 'aquarius' && t > 27) { const k = pop01(t, 27, 0.3, 2); x.save(); x.translate(SUBJ.x - 200, F.cy + 200); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 80, 46, 0.3, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8b25a'; x.beginPath(); x.ellipse(0, -4, 72, 38, 0.3, 0, Math.PI * 2); x.fill(); x.restore() }
    boomOp(x, t, { tears: id === 'libra' && t > 22.5 ? 4 : 2, mood: 'sparkle', sway: id === 'libra' && t > 22.5 ? 2 : 1 })
    if (id === 'libra' && t > 22.5) sparkles(x, t, 540, 880, 22.5, 12, 280, 1, [PINK, GOLD, BONE])
    recChrome(x, t, { tc0: 4000 + SHOTS.findIndex(s => s[3] === id) * 700, y0: 440 })
  }
  function dinnerShot(t) {
    const bump = t > T.elbow && t < T.elbow + 0.4 ? Math.sin(Math.PI * prog(t, T.elbow, T.elbow + 0.4)) * 30 : 0
    const stand = t > T.stand
    const toast = t > T.stand && t < T.last
    const hands = ease.inOutCubic(prog(t, T.hands, T.hands + 0.8))
    room(t, [
      { id: 'capricorn', mood: step(t, [[41, 'neutral'], [T.count, 'wide'], [51.4, 'happy'], [52.8, 'squint'], [T.stand, 'wide'], [66, 'squint'], [68.4, 'happy']]), look: toast ? [1, 0] : undefined, y: t > 52.4 && t < 56.6 ? 980 : 1020, hops: [51.45, 52.85, 66.05, 68.45, T.last + 0.05], sweat: t > T.count && t < 52.6 ? 1 : 0 },
      { id: 'libra', mood: step(t, [[41, 'happy'], [T.elbow, 'wide'], [44.8, 'squint'], [T.stand, 'neutral'], [60.2, 'heart'], [T.reveal, 'wide'], [65, 'heart'], [T.last, 'sparkle']]), x: 420 + bump * 0.5 + hands * 50, y: stand && t < T.reveal ? 960 : 1020, look: [1, 0], blush: 1, hops: [42.25, 57.65, 60.25, T.last + 0.05] },
      { id: 'scorpio', mood: step(t, [[41, 'happy'], [T.elbow, 'wide'], [44, 'happy'], [57.6, 'sparkle'], [T.reveal, 'heart'], [T.last, 'sparkle']]), x: 660 - bump * 0.5 - hands * 50, look: [-1, 0], blush: t > 57 ? 1 : undefined, hops: [T.reveal + 0.05, T.reveal + 0.7, T.last + 0.05] },
      { id: 'aquarius', mood: step(t, [[41, 'happy'], [44.8, 'squint'], [47.5, 'wink'], [54.8, 'happy'], [70.8, 'sparkle']]), look: [-1, 0], hops: [44.85, 45.6, 47.55, 54.85, 70.85, T.last + 0.05] },
    ])
    if (t > T.elbow && t < T.elbow + 0.8) sparkles(x, t, 540, 1000, T.elbow + 0.1, 8, 90, 1, [PINK, GOLD])
    // the nature-show caption box
    if (t > 44.8 && t < 49.1) { x.save(); x.font = `700 26px ${MONO}`; x.fillStyle = 'rgba(0,0,0,0.6)'; x.fillRect(60, 1340, 520, 50); x.fillStyle = '#9fe6b0'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('▶ WILDLIFE CAM · LIBRA IN LOVE', 76, 1366); x.restore() }
    // Libra's breadstick toast
    if (toast) { x.save(); x.translate(470, 830); x.rotate(-0.4); blk(x, -14, -90, 28, 180, '#e8b25a', { r: 12 }); x.restore() }
    // Capricorn writes the new line
    if (t > T.write && t < T.last + 4) { const k = pop01(t, T.write, 0.3, 2); x.save(); x.translate(200, 760); x.scale(k, k); x.rotate(-0.06); blk(x, -110, -110, 220, 220, '#fbf7ee', { r: 4, ink: 3, hi: 0, lo: 0 }); x.font = `700 20px ${MONO}`; x.fillStyle = INK; x.textAlign = 'left'; ['8:40 TOAST ✓', '8:41 LOVE'].forEach((s, i) => { const vis = i === 0 ? 1 : prog(t, T.write + 0.3, T.write + 1.4); x.save(); x.beginPath(); x.rect(-90, -60 + i * 56 - 26, 190 * vis, 40); x.clip(); x.fillStyle = i ? RED : INK; x.fillText(s, -86, -60 + i * 56); x.restore() }); x.restore() }
    if (t > T.reveal) sparkles(x, t, 540, 900, T.reveal + 0.1, 16, 300, 1, [PINK, GOLD, BONE])
    if (hands > 0.8) sparkles(x, t, 540, 1000, T.hands + 0.8, 12, 160, 2, [PINK, BONE])
    boomOp(x, t, { tears: t > T.reveal ? 4 : t > 57.6 ? 3 : 2, mood: t > T.reveal ? 'happy' : 'sparkle', mic: [560, 640], op: [960, 520], size: 140, sway: t > T.reveal ? 2 : 1 })
    recChrome(x, t, { tc0: 11000, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const [, , kind, arg] = shotAt(t)
      if (kind === 'cold') cold(t)
      else if (kind === 'plan') plan(t)
      else if (kind === 'booth') booth(t, arg)
      else dinnerShot(t)
      const lid = kind === 'booth' ? arg : null
      lower.update(t, { k: lid ? 1 : 0, name: lid ? `${SIGN(lid).glyph}︎ ${SIGN(lid).name}` : '', color: lid ? SIGN(lid).color : GOLD, tag: lid ? LOWER[lid] : '' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), whipZoom(WHIP0), slamTitle(HOOK), recordScratch(REC), caught(CAUGHT), countdown(COUNT), ...WHIPS.map(w => whipZoom(w)), ...CH.map(c => chapter(c))]
export const CUES = [
  ['whoosh', 0.0, 0.5, 0.06], ...[0.1, 0.25, 0.4, 0.55].map(t => ['pop', t, 1174.66, 0.025, 0]),
  ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...caughtCues(CAUGHT), ...countdownCues(COUNT), ...WHIPS.flatMap(w => whipZoomCues(w)), ...CH.flatMap(c => chapterCues(c)),
  ...capCues(CAPS),
  ['whoosh', T.swap[0], 0.5, 0.03], ['tick', T.swap[1], 0.05],
  ['glitter', 22.5, 23.0], ...sobCues(22.8, 3, 0.42),
  ['tom', T.elbow, 140, { gain: 0.2, decay: 0.2 }], ['pop', T.elbow + 0.1, 1318.5, 0.03, 0],
  ['bell', 57.65, 1318.5, 0.025, 1.0, 0], ['glitter', 60.3, 60.8], ['boom', T.reveal, 0.16], ['glitter', T.reveal + 0.1, T.reveal + 0.6], ['bell', T.reveal + 0.15, 1567.98, 0.03, 1.4, 0], ...sobCues(T.reveal + 0.3, 6, 0.42),
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.write + 0.3 + i * 0.13).toFixed(3), 0.025]),
  ['glitter', T.hands + 0.8, T.hands + 1.3],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
