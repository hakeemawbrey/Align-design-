// kcfe18: ZODIAC CONFESSIONAL ep 18 (long), "Episode: The Situationship Summit" (75 s vertical, music: house · F). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition. Chapter stickers from the hook kit.
// Cast: ♐ Sagittarius, ♊ Gemini, ♉ Taurus. Pisces runs the boom and cries all episode.
//   0.0–4.2   COLD OPEN: Gemini mid-SLAM of a spoon "gavel" on a plate, plates rattling (shake); hook "Three
//             situationships. *One* dinner." · record scratch: "someone says it *out loud* tonight."
//   4.2–14    CH 1 · ARRIVALS: Sag with a plant ("brought a plant. *it's ours.*"), Gemini texting on the path ("one sec,
//             I'm *texting them.*"), Taurus with a basket ("I brought snacks. *for the tension.*")
//   14–40     CH 2 · CONFESSIONALS: Sag "we have *a plant.*" / "I mean. *another* plant." / PRODUCER "are you dating?" / "we've
//             never *said.*" · Gemini "we text *every day.*" / "good morning, good night, *memes at lunch.*" / PRODUCER "so are
//             you dating?" / "*unclear.*" · Taurus "they met my mum. *by accident.*" / "in the *bread aisle.*" / PRODUCER
//             "what did your mum say?" / "'*so is this the one?*'"
//   40–58     CH 3 · THE SUMMIT: name cards, a gavel spoon: "this summit is *in session.*" · a talk card slides in: "What are
//             we?" · "you go first." "no, *you* go first." Taurus chews · all three reach at once: "…we'll *all* ask." ·
//             PRODUCER "tonight?" · ALL "*tonight.*"
//   58–71.2   CH 4 · THE ASK: three phones, three honest asks: Sag → "I'd love to be *your person.*" ("*yes,* let's.") ·
//             Gemini → "I was hoping you'd ask. yes." · Taurus → "I really like you, but as friends." ("…ok. *thank you for
//             telling me.*")
//   71.2–75   back at the table: a three-way hug, Taurus in the middle. Pisces floods.
//   72.0      last line "Ask *what are we.* Then listen." holds → hard cut at 75.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, RED, INTER, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, blk, rr, sparkles, step, pop01, drawTalkCard,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { drawHouse, walker, phoneShot, dinner, CAST3 } from '../../kcfe16/scenes/longkit.js'
import {
  slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues, screenShake, shakeCues,
} from '../../hookkit.js'

export const DURATION = 75
const SHOTS = [
  [0, 4.2, 'cold'], [4.2, 14, 'arrive'],
  [14, 22.4, 'booth', 'sagittarius'], [22.4, 30.8, 'booth', 'gemini'], [30.8, 40, 'booth', 'taurus'],
  [40, 58, 'summit'],
  [58, 62.4, 'phone', 'sagittarius'], [62.4, 66.8, 'phone', 'gemini'], [66.8, 71.2, 'phone', 'taurus'],
  [71.2, 75.1, 'hug'],
]
const T = { scratch: 0.9, gavel: 40.5, card: [42.9, 43.5], reach: 50.6, last: 72.0 }
const HOOK = { at: -1, text: 'Three situationships. | *One* dinner.', top: 150, size: 96, accentColor: SIGN('gemini').color, out: [4.0, 4.2] }
const SHAKE0 = { at: -0.1, len: 0.5, amp: 26 }, SHAKE1 = { at: T.gavel, len: 0.4, amp: 18 }
const REC = { at: T.scratch, len: 1.7, caption: 'someone says it *out loud* tonight.', sub: 'the summit begins…', top: 1560 }
const CH = [
  { at: 4.3, out: [13.7, 14], n: 1, title: 'ARRIVALS', color: GOLD },
  { at: 14.1, out: [39.7, 40], n: 2, title: 'CONFESSIONALS', color: '#7fd0f0' },
  { at: 40.1, out: [57.7, 58], n: 3, title: 'THE SUMMIT', color: PINK },
  { at: 58.1, out: [71.6, 72.0], n: 4, title: 'THE ASK', color: '#9fe6b0' },
]
const WHIPS = SHOTS.slice(1).map(s => ({ at: s[0] - 0.04, len: 0.4, from: 1.5 }))
const w = id => { const s = SIGN(id); return { who: `${s.glyph}︎ ${s.name}`, color: s.color } }
const CAPS = [
  { t: 5.0, end: 7.4, ...w('sagittarius'), text: "brought a plant. *it's ours.*", accent: '#7ac46a' },
  { t: 8.0, end: 10.3, ...w('gemini'), text: "one sec, I'm *texting them.*" },
  { t: 11.0, end: 13.7, ...w('taurus'), text: 'I brought snacks. *for the tension.*' },
  { t: 14.4, end: 16.2, ...w('sagittarius'), text: 'we have *a plant.*', accent: '#7ac46a' },
  { t: 16.3, end: 18.2, ...w('sagittarius'), text: 'I mean. *another* plant.', accent: '#7ac46a' },
  { t: 18.4, end: 19.8, kind: 'prod', text: 'are you dating?' },
  { t: 20.0, end: 22.2, ...w('sagittarius'), text: "we've never *said.*" },
  { t: 22.8, end: 24.8, ...w('gemini'), text: 'we text *every day.*' },
  { t: 25.0, end: 27.2, ...w('gemini'), text: 'good morning, good night, *memes at lunch.*' },
  { t: 27.4, end: 28.8, kind: 'prod', text: 'so are you dating?' },
  { t: 29.0, end: 30.7, ...w('gemini'), text: '*unclear.*' },
  { t: 31.2, end: 33.4, ...w('taurus'), text: 'they met my mum. *by accident.*' },
  { t: 33.6, end: 35.8, ...w('taurus'), text: 'at the shop. in the *bread aisle.*' },
  { t: 36.0, end: 37.4, kind: 'prod', text: 'what did your mum say?' },
  { t: 37.6, end: 39.9, ...w('taurus'), text: "'*so is this the one?*'" },
  { t: 40.6, end: 42.8, ...w('gemini'), text: 'this summit is *in session.*' },
  { t: 45.4, end: 47.0, ...w('sagittarius'), text: 'you go first.' },
  { t: 47.1, end: 48.6, ...w('gemini'), text: 'no, *you* go first.' },
  { t: 48.8, end: 50.4, ...w('taurus'), text: '*(chewing)*' },
  { t: 51.0, end: 53.6, who: 'ALL THREE', color: BONE, text: "…we'll *all* ask." },
  { t: 53.8, end: 55.2, kind: 'prod', text: 'tonight?' },
  { t: 55.4, end: 57.8, who: 'ALL THREE', color: BONE, text: '*tonight.*' },
  { t: 60.2, end: 62.3, ...w('sagittarius'), text: "*yes,* let's.", accent: PINK },
  { t: 64.8, end: 66.7, ...w('gemini'), text: 'we are *dating!*', accent: PINK },
  { t: 68.8, end: 71.1, ...w('taurus'), text: '…ok. *thank you for telling me.*' },
  { t: T.last, end: 99, who: 'THE HOUSE', color: BONE, text: 'Ask *what are we.* Then listen.' },
]
const LOWER = { sagittarius: '“keeping it casual (month six)”', gemini: '“texts daily, labels never”', taurus: '“met the parents (oops)”' }
const shotAt = t => SHOTS.find(s => t >= s[0] && t < s[1]) || SHOTS[SHOTS.length - 1]

function plant(x, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(Math.sin(t * 1.6) * 0.04)
  for (const [a, l] of [[-0.6, 100], [-0.2, 130], [0.25, 120], [0.65, 95]]) { x.save(); x.rotate(a); x.fillStyle = INK; x.fillRect(-15, -l - 4, 30, l + 4); x.fillStyle = '#5fc46e'; rr(x, -10, -l, 20, l, 10); x.fill(); x.restore() }
  blk(x, -50, -10, 100, 76, '#e07a4a', { r: 8 })
  x.restore()
}
function nameCard(x, cx, cy, text, col) {
  blk(x, cx - 70, cy - 26, 140, 52, BONE, { r: 4, ink: 4, hi: 0, lo: 0 })
  x.font = `900 26px ${INTER}`; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, cx, cy + 2)
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function gavelSpoon(cx, cy, t, t0) {
    const sw = Math.max(0, Math.cos(Math.PI * Math.min(1, Math.max(0, (t - t0 + 0.3) / 0.3)) * 0.5))
    x.save(); x.translate(cx, cy); x.rotate(-0.9 * (1 - sw) + 0.1)
    x.fillStyle = INK; x.fillRect(-10, -160, 20, 170); x.fillStyle = '#d8dbe6'; x.fillRect(-6, -156, 12, 160)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, -170, 30, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8dbe6'; x.beginPath(); x.ellipse(0, -170, 24, 34, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function summitTable(t, moods, { card = 0, cardRot = 0, rattle = 0 } = {}) {
    const ids = ['sagittarius', 'gemini', 'taurus']
    dinner(x, t, ids.map((id, i) => ({ id, ...moods[i] })), { rattle, wall: '#2a3a5a' })
    // name cards
    ids.forEach((id, i) => nameCard(x, CAST3[i].x, 1170, SIGN(id).name.slice(0, 7), SIGN(id).color))
    if (card > 0.01) drawTalkCard(x, 540, 1230, 220, 'What are we?', { k: card, rot: cardRot })
  }

  function cold(t) {
    summitTable(t, [{ mood: 'wide', look: [1, 0] }, { mood: 'squint', look: [0, 1] }, { mood: 'wide', look: [-1, 0] }], { rattle: t < 0.6 ? 5 : 0 })
    gavelSpoon(600, 1060, t, -0.05)
    sparkles(x, t, 560, 1180, -0.05, 10, 160, 1, [BONE, GOLD])
    boomOp(x, t, { tears: 3, mood: 'wide', mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { label: 'COMING UP', tc0: 9300, y0: 440 })
  }
  function arrive(t) {
    drawHouse(x, t)
    const F1 = walker(x, t, 'sagittarius', { t0: 4.4, t1: 5.2, from: -250, to: 230, y: 1190, s: 230, mood: 'happy' })
    if (F1) plant(x, F1.ox - 120, 1250, 0.8, t)
    const F2 = walker(x, t, 'gemini', { t0: 7.6, t1: 8.6, from: 1300, to: 420, y: 1230, s: 230, mood: 'neutral', look: [0, 1] })
    if (F2) { x.fillStyle = INK; rr(x, F2.ox + 70, 1190, 64, 110, 12); x.fill(); x.fillStyle = '#9fd6ff'; rr(x, F2.ox + 77, 1197, 50, 96, 8); x.fill() }
    walker(x, t, 'taurus', { t0: 10.6, t1: 11.6, from: 1300, to: 860, y: 1190, s: 230, mood: 'happy', bag: { color: '#c89a5a', label: 'SNACKS' } })
    boomOp(x, t, { tears: 2, mood: 'sparkle', mic: [700, 760], op: [990, 640], size: 130 })
    recChrome(x, t, { label: 'DAY 1', tc0: 400, y0: 440 })
  }
  function booth(t, id) {
    drawBooth(x, t, { sign: id })
    let mood = 'neutral', look = [0, 0], sq = 0
    if (id === 'sagittarius') mood = step(t, [[14, 'happy'], [16.3, 'wink'], [18.4, 'wide'], [20, 'neutral']])
    if (id === 'gemini') mood = step(t, [[22, 'happy'], [25, 'sparkle'], [27.4, 'wide'], [29, 'squint']])
    if (id === 'taurus') mood = step(t, [[30, 'wide'], [33.6, 'squint'], [36, 'neutral'], [37.6, 'wide']])
    const F = seat(x, t, id, { ...SUBJ, hops: CAPS.filter(c => c.who && c.who.includes(SIGN(id).name) && c.t > 14 && c.t < 40).map(c => c.t + 0.05) }, { mood, look, seed: 3, squash: sq })
    drawChairFront(x)
    if (id === 'sagittarius') { plant(x, SUBJ.x - 200, F.cy + 180, 0.9, t); if (t > 16.3) plant(x, SUBJ.x + 210, F.cy + 180, 0.9 * pop01(t, 16.3, 0.3, 2), t) }
    if (id === 'gemini' && t > 25) ['☀︎ gm!', '☾ gn!', 'lol meme'].forEach((s, i) => { const k = pop01(t, 25.1 + i * 0.5, 0.25, 2); if (k <= 0) return; x.save(); x.translate(200 + i * 340, 620 + (i % 2) * 70); x.scale(k, k); x.fillStyle = INK; rr(x, -110, -38, 220, 76, 30); x.fill(); x.fillStyle = '#4f8dff'; rr(x, -104, -32, 208, 64, 26); x.fill(); x.font = `800 30px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore() })
    if (id === 'taurus' && t > 33.6) { const k = pop01(t, 33.6, 0.3, 2); x.save(); x.translate(SUBJ.x - 220, F.cy + 200); x.scale(k, k); x.rotate(-0.3); blk(x, -100, -36, 200, 72, '#e8b25a', { r: 30 }); x.fillStyle = '#c8823a'; for (let i = 0; i < 4; i++) x.fillRect(-60 + i * 36, -20, 10, 40); x.restore() }
    boomOp(x, t, { tears: id === 'taurus' && t > 37.6 ? 4 : 2, mood: 'sparkle', sway: t > 37.6 && id === 'taurus' ? 2 : 1 })
    recChrome(x, t, { tc0: 4000 + SHOTS.findIndex(s => s[3] === id) * 700, y0: 440 })
  }
  function summit(t) {
    const away = t > 45.2 && t < T.reach
    const reach = t > T.reach
    const moods = [
      { mood: step(t, [[40, 'neutral'], [43.5, 'wide'], [45.4, 'squint'], [T.reach, 'wide'], [51, 'happy']]), look: away ? [-1, -1] : reach ? [1, 1] : [1, 0], hops: [45.45, T.reach, 55.45], pos: reach && t < 52 ? { x: 290 } : undefined },
      { mood: step(t, [[40, 'happy'], [43.5, 'wide'], [47.1, 'squint'], [T.reach, 'wide'], [51, 'happy']]), look: away ? [0, -1] : reach ? [0, 1] : undefined, hops: [40.65, 41.3, 47.15, T.reach, 55.45], pos: reach && t < 52 ? { y: 1040 } : undefined },
      { mood: step(t, [[40, 'happy'], [43.5, 'wide'], [48.8, 'happy'], [T.reach, 'wide'], [51, 'happy']]), look: away ? [1, -1] : reach ? [-1, 1] : [-1, 0], hops: t > 48.8 && t < 50.4 ? [48.85, 49.2, 49.55, 49.9] : [T.reach, 55.45], pos: reach && t < 52 ? { x: 790 } : undefined },
    ]
    const ck = easeOutBack(prog(t, ...T.card), 1.6)
    summitTable(t, moods, { card: ck, cardRot: reach && t < 52 ? (t - T.reach) * 8 : 0.04 })
    if (t > 40 && t < 43) gavelSpoon(640, 1100, t, T.gavel)
    if (reach) sparkles(x, t, 540, 1250, T.reach + 0.1, 14, 220, 1, [PINK, GOLD, BONE])
    boomOp(x, t, { tears: t > 55.4 ? 4 : 2, mood: t > 51 ? 'happy' : 'wide', mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { tc0: 10800, y0: 440 })
  }
  function phone(t, id) {
    if (id === 'sagittarius') phoneShot(x, t, { owner: 'sagittarius', title: '♒︎ them', msgs: [{ at: 58.4, side: 'R', text: 'so… what are we?' }, { at: 59.5, side: 'L', text: "I'd love to be your person." }], typing: [58.8, 59.5], peekMood: t > 59.5 ? 'heart' : 'wide' })
    if (id === 'gemini') phoneShot(x, t, { owner: 'gemini', title: '♌︎ them', msgs: [{ at: 62.6, side: 'R', text: 'ok real question. what are we?' }, { at: 63.8, side: 'L', text: "I was hoping you'd ask. yes." }, { at: 64.3, side: 'L', text: "let's date!!" }], typing: [63.0, 63.8], peekMood: t > 63.8 ? 'heart' : 'wide' })
    if (id === 'taurus') phoneShot(x, t, { owner: 'taurus', title: '♍︎ them', msgs: [{ at: 67.0, side: 'R', text: 'can I ask… what are we?' }, { at: 68.2, side: 'L', text: 'I really like you, but as friends. I hope that is ok.' }], typing: [67.4, 68.2], peekMood: t > 68.8 ? 'happy' : 'neutral', tears: t > 68.8 ? 1 : 0 })
    const yes = { sagittarius: 59.5, gemini: 63.8 }[id]
    if (yes && t > yes) sparkles(x, t, 540, 1200, yes, 10, 200, 1, [PINK, GOLD, BONE])
    // Pisces peeks over the bottom-left of every phone, crying
    seat(x, t, 'pisces', { x: 170, y: 1690, s: 190 }, { mood: 'sparkle', look: [1, -1], tears: id === 'taurus' ? 4 : 3, seed: 6 })
  }
  function hug(t) {
    const k = ease.outBack(prog(t, 71.2, 71.9))
    dinner(x, t, [
      { id: 'sagittarius', mood: 'happy', pos: { x: lerp(250, 400, k) }, hops: [71.3, T.last + 0.05] },
      { id: 'taurus', mood: 'sparkle', pos: { y: 960 }, tears: 1, hops: [71.4, T.last + 0.05] },
      { id: 'gemini', mood: 'happy', pos: { x: lerp(830, 680, k) }, hops: [71.3, T.last + 0.05] },
    ], { wall: '#2a3a5a' })
    sparkles(x, t, 540, 900, 71.5, 16, 360, 1, [PINK, GOLD, BONE])
    sparkles(x, t, 540, 900, T.last, 16, 420, 2, [PINK, GOLD, BONE])
    boomOp(x, t, { tears: 4, mood: 'happy', mic: [560, 640], op: [960, 520], size: 140, sway: 2 })
    recChrome(x, t, { tc0: 11400, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const [, , kind, arg] = shotAt(t)
      if (kind === 'cold') cold(t)
      else if (kind === 'arrive') arrive(t)
      else if (kind === 'booth') booth(t, arg)
      else if (kind === 'summit') summit(t)
      else if (kind === 'phone') phone(t, arg)
      else hug(t)
      const lid = kind === 'booth' ? arg : null
      lower.update(t, { k: lid ? 1 : 0, name: lid ? `${SIGN(lid).glyph}︎ ${SIGN(lid).name}` : '', color: lid ? SIGN(lid).color : GOLD, tag: lid ? LOWER[lid] : '' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), slamTitle(HOOK), screenShake(SHAKE0), recordScratch(REC), ...WHIPS.map(w => whipZoom(w)), ...CH.map(c => chapter(c)), screenShake(SHAKE1)]
export const CUES = [
  ['tom', 0.0, 150, { gain: 0.3, decay: 0.2 }], ['tick', 0.0, 0.09], ['pluck', 0.02, 2093, 0.03, 0.3, 0],
  ...slamTitleCues(HOOK), ...shakeCues(SHAKE0), ...recordScratchCues(REC), ...WHIPS.flatMap(w => whipZoomCues(w)), ...CH.flatMap(c => chapterCues(c)), ...shakeCues(SHAKE1),
  ...capCues(CAPS),
  ['pop', 16.4, 784, 0.035, 0.3], ...[25.1, 25.6, 26.1].map((t, i) => ['pop', t, [880, 988, 1174.66][i], 0.035, -0.2]), ['pop', 33.7, 659.25, 0.035, -0.3],
  ...sobCues(37.8, 4, 0.42),
  ['tom', T.gavel, 150, { gain: 0.25, decay: 0.2 }], ['tick', T.gavel, 0.08], ['whoosh', T.card[0], 0.5, 0.04], ['pluck', T.card[1], 1318.5, 0.04, 0.6, 0],
  ...[48.85, 49.2, 49.55, 49.9].map(t => ['tick', t, 0.03]),
  ['whoosh', T.reach, 0.4, 0.05], ['glitter', T.reach + 0.1, T.reach + 0.6], ['riser', 53.6, 55.4, 0.025], ['boom', 55.4, 0.2],
  ['pop', 59.5, 1318.5, 0.045, 0], ['glitter', 59.5, 60], ['pop', 63.8, 1318.5, 0.045, 0], ['glitter', 63.8, 64.3], ['pop', 68.2, 783.99, 0.04, 0], ...sobCues(68.6, 4, 0.42),
  ['glitter', 71.4, 72], ['bell', 71.45, 1318.5, 0.03, 1.2, 0],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
