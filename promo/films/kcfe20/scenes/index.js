// kcfe20: ZODIAC CONFESSIONAL ep 20 (long), "Episode: Who Says It First" (90 s vertical, music: dreamy · Bb). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition. Chapter stickers from the hook kit.
// Cast: ♉ Taurus and ♒ Aquarius (a couple), ♓ Pisces (the host, crying from minute one). The grey stagehand runs the boom.
//   0.0–4.2   COLD OPEN: Taurus mid-GASP at the dinner table, a cake frozen mid-air above it (whip); hook "Someone says *I love
//             you* tonight." · record scratch: "wait for *dessert.*"
//   4.2–16    CH 1 · THE PREP: Taurus stirs "made their favourite. *from scratch.*" · Aquarius lines up forks "the forks are
//             in *order.*" · Pisces frosts YOU TWO on a cake (crying) · Taurus: "tonight's *the night.*"
//   16–42     CH 2 · CONFESSIONALS: Taurus "I've been holding it in for *three weeks.*" / "I almost said it at the *bus stop.*"
//             · Aquarius "I'll say it when it's *logical.*" / PRODUCER "when is that?" / "I have a *chart.*" / "it says
//             *soon.*" · Pisces "I say it to my *plants.*" / "daily. *they're thriving.*" / PRODUCER "and tonight?" / "I'm
//             *not* crying."
//   42–66     CH 3 · THE DINNER: three almost-moments, each interrupted: a kitchen timer DING ("the potatoes!"), a dog WOOF
//             ("was that a *dog?*"), the lights flicker out ("it's the *fuse.*"). Lights back. Aquarius, plainly: "I love
//             you." · Taurus "…*you* said it first??" · Aquarius "it was *logical.*"
//   66–90     CH 4 · DESSERT: Taurus "I love you *too.* SO much." · Pisces "I love you BOTH." (floods) · the cake: "I love
//             this *cake.*" "I love these *potatoes.*" "I love *everyone!*" · PRODUCER "anyone else?" · the stagehand: "…I
//             love you guys too."
//   86.8      last line "Say it. *Dessert* can wait." holds → hard cut at 90.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, RED, INTER, MONO, SERIF, TEAR,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawRoom, recChrome, blk, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, buildSlam, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { dinner, flicker, CAST3 } from '../../kcfe16/scenes/longkit.js'
import {
  slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues, screenShake, shakeCues,
} from '../../hookkit.js'

export const DURATION = 90
const SHOTS = [
  [0, 4.2, 'cold'], [4.2, 16, 'prep'],
  [16, 24.6, 'booth', 'taurus'], [24.6, 33, 'booth', 'aquarius'], [33, 42, 'booth', 'pisces'],
  [42, 90.1, 'dinner'],
]
const T = { scratch: 0.9, ding: 44.6, woof: 49.8, dark: [54.4, 55.8], ily: 58.6, too: 66.6, cake: 71.8, stage: 80.8, last: 86.8 }
const HOOK = { at: -1, text: 'Someone says *I love you* | tonight.', top: 150, size: 96, accentColor: PINK, out: [4.0, 4.2] }
const WHIP0 = { at: -0.26, len: 0.5, from: 1.7, blur: 12 }
const REC = { at: T.scratch, len: 1.7, caption: 'wait for *dessert.*', sub: 'dinner for three · 7:00 pm', top: 1560 }
const CH = [
  { at: 4.3, out: [15.7, 16], n: 1, title: 'THE PREP', color: GOLD },
  { at: 16.1, out: [41.7, 42], n: 2, title: 'CONFESSIONALS', color: '#7fd0f0' },
  { at: 42.1, out: [65.7, 66], n: 3, title: 'THE DINNER', color: PINK },
  { at: 66.1, out: [86.4, 86.8], n: 4, title: 'DESSERT', color: '#9fe6b0' },
]
const WHIPS = [...SHOTS.slice(1).map(s => ({ at: s[0] - 0.04, len: 0.4, from: 1.5 })), { at: T.ily - 0.1, len: 0.5, from: 1.4, to: 1, cx: 540, cy: 1000 }]
const SHAKES = [{ at: T.ding, len: 0.4, amp: 18 }, { at: T.woof, len: 0.4, amp: 18, seed: 3 }]
const w = id => { if (id === 'stage') return { who: 'THE STAGEHAND', color: '#c8d4e6' }; const s = SIGN(id); return { who: `${s.glyph}︎ ${s.name}`, color: s.color } }
const CAPS = [
  { t: 4.8, end: 7.0, ...w('taurus'), text: 'made their favourite. *from scratch.*' },
  { t: 7.2, end: 9.2, ...w('aquarius'), text: 'the forks are in *order.*' },
  { t: 9.4, end: 11.8, ...w('pisces'), text: "the cake says *'you two'.*", accent: PINK },
  { t: 12.0, end: 15.7, ...w('taurus'), text: "tonight's *the night.*", accent: PINK },
  { t: 16.4, end: 18.8, ...w('taurus'), text: "I've been holding it in for *three weeks.*" },
  { t: 19.0, end: 21.4, ...w('taurus'), text: 'I almost said it at the *bus stop.*' },
  { t: 21.6, end: 24.4, kind: 'prod', text: 'what stopped you?' },
  { t: 25.0, end: 27.2, ...w('aquarius'), text: "I'll say it when it's *logical.*" },
  { t: 27.4, end: 28.8, kind: 'prod', text: 'when is that?' },
  { t: 29.0, end: 30.8, ...w('aquarius'), text: 'I have a *chart.*' },
  { t: 31.0, end: 32.9, ...w('aquarius'), text: 'it says *soon.*', accent: PINK },
  { t: 33.4, end: 35.4, ...w('pisces'), text: 'I say it to my *plants.*' },
  { t: 35.6, end: 37.6, ...w('pisces'), text: "daily. *they're thriving.*", accent: '#7ac46a' },
  { t: 37.8, end: 39.2, kind: 'prod', text: 'and tonight?' },
  { t: 39.4, end: 41.9, ...w('pisces'), text: "I'm *not* crying.", accent: '#9fc4ff' },
  { t: 42.8, end: 44.5, ...w('taurus'), text: 'so… I wanted to say—' },
  { t: 45.0, end: 46.8, ...w('pisces'), text: 'the *potatoes!*' },
  { t: 47.8, end: 49.7, ...w('taurus'), text: 'what I mean is, I—' },
  { t: 50.2, end: 52.0, ...w('aquarius'), text: 'was that a *dog?*' },
  { t: 52.8, end: 54.3, ...w('taurus'), text: 'ok. I lo—' },
  { t: 55.9, end: 57.8, ...w('pisces'), text: "I'm FINE. it's the *fuse.*" },
  { t: T.ily, end: 61.0, ...w('aquarius'), text: 'I *love* you.', accent: PINK },
  { t: 61.4, end: 63.4, ...w('taurus'), text: '…*you* said it first??' },
  { t: 63.6, end: 65.8, ...w('aquarius'), text: 'it was *logical.*' },
  { t: T.too, end: 69.2, ...w('taurus'), text: 'I love you *too.* SO much.', accent: PINK },
  { t: 69.6, end: 71.6, ...w('pisces'), text: 'I love you *BOTH.*', accent: PINK },
  { t: 72.4, end: 74.4, ...w('aquarius'), text: 'I love this *cake.*' },
  { t: 74.6, end: 76.6, ...w('taurus'), text: 'I love these *potatoes.*' },
  { t: 76.8, end: 79.0, ...w('pisces'), text: 'I love *everyone!*' },
  { t: 79.2, end: 80.6, kind: 'prod', text: 'anyone else?' },
  { t: T.stage, end: 83.2, ...w('stage'), text: '…I love you guys *too.*' },
  { t: T.last, end: 99, who: 'THE HOUSE', color: BONE, text: 'Say it. *Dessert* can wait.' },
]
const LOWER = { taurus: '“holding it in (3 weeks)”', aquarius: '“waiting for it to be logical”', pisces: '“the host (crying)”' }
const shotAt = t => SHOTS.find(s => t >= s[0] && t < s[1]) || SHOTS[SHOTS.length - 1]

function cake(x, cx, cy, s, t, { candles = false } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  blk(x, -130, -40, 260, 110, '#fbe0ea', { r: 14 })
  blk(x, -100, -120, 200, 86, '#ffd0e0', { r: 12 })
  x.fillStyle = PINK; for (let i = 0; i < 10; i++) x.fillRect(-120 + i * 26, -42, 14, 16)
  x.font = `italic 600 36px 'EB Garamond'`; x.fillStyle = '#c42a3f'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('you two ♥︎', 0, 18)
  if (candles) for (let i = 0; i < 3; i++) { blk(x, -60 + i * 60 - 6, -170, 12, 50, '#fff3d6', { r: 3, ink: 3 }); const f = 1 + 0.15 * Math.sin(t * 17 + i); x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(-60 + i * 60, -184, 7 * f, 14 * f, 0, 0, Math.PI * 2); x.fill() }
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const ding = buildSlam(root, 'DING!', { top: 560, size: 150, color: '#ffe14d', rot: -8 })
  const woof = buildSlam(root, 'WOOF!', { top: 560, size: 150, color: '#ffffff', rot: 7 })
  const said = buildSlam(root, 'AQUARIUS SAID IT', { top: 520, size: 84, color: '#ffffff', rot: -4, bg: '#e8407a' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function table(t, moods, { cakeK = 0, candles = false, puddle = 0 } = {}) {
    const ids = ['taurus', 'aquarius', 'pisces']
    dinner(x, t, ids.map((id, i) => ({ id, ...moods[i] })), { wall: '#3a2a5a' })
    if (cakeK > 0.01) cake(x, 540, 1170, 0.9 * cakeK, t, { candles })
    if (puddle > 0) { x.fillStyle = 'rgba(143,227,255,0.5)'; x.beginPath(); x.ellipse(830, 1480, 120 + puddle * 260, 26 + puddle * 30, 0, 0, Math.PI * 2); x.fill() }
  }

  function cold(t) {
    table(t, [{ mood: 'wide', look: [1, -1], squash: -0.1 }, { mood: 'wide', look: [0, -1] }, { mood: 'wide', look: [-1, -1], tears: 3 }])
    const p = prog(t, -0.6, 1.6)
    cake(x, 540 + 30 * Math.sin(p * 3), 780 - 140 * Math.sin(Math.PI * p), 0.8, t)
    x.save(); x.strokeStyle = BONE; x.lineWidth = 6; for (let i = 0; i < 6; i++) { const a = i * 1.05; x.beginPath(); x.moveTo(540 + Math.cos(a) * 200, 760 + Math.sin(a) * 120); x.lineTo(540 + Math.cos(a) * 260, 760 + Math.sin(a) * 160); x.stroke() } x.restore()
    boomOp(x, t, { who: 'stage', glyph: false, mood: 'wide', tears: 0, mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { label: 'COMING UP', tc0: 9400, y0: 440 })
  }
  function prep(t) {
    drawRoom(x, t, { wall: '#4a3a2a', floor: '#2a2018', window: true, lamp: false })
    // the counter
    blk(x, 40, 1140, 1000, 60, '#e8d6b8', { r: 6 }); blk(x, 60, 1200, 960, 160, '#8a5a3a', { r: 4, hi: 0 })
    seat(x, t, 'taurus', { x: 230, y: 1000, s: 250, hops: [4.85, 5.5, 12.05, 12.7] }, { mood: t > 12 ? 'heart' : 'happy', look: t > 12 ? [1, 0] : [0, 1], seed: 9 })
    seat(x, t, 'aquarius', { x: 540, y: 1000, s: 250, hops: [7.25, 7.9] }, { mood: 'squint', look: [0, 1], seed: 16 })
    seat(x, t, 'pisces', { x: 850, y: 1000, s: 250, hops: [9.45, 10.1, 12.4] }, { mood: t > 12.2 ? 'wide' : 'sparkle', look: [-1, 1], tears: t > 12.2 ? 4 : 2, seed: 6 })
    // pot (steam), forks in a perfect row, the cake
    blk(x, 170, 1080, 140, 70, '#5a6078', { r: 10 }); x.fillStyle = 'rgba(255,255,255,0.45)'; for (let i = 0; i < 3; i++) x.fillRect(200 + i * 36, 1010 - ((t * 60 + i * 30) % 80), 10, 34)
    for (let i = 0; i < 5; i++) { const ok = t > 7.2 + i * 0.25; x.save(); x.translate(470 + i * 34, 1120); x.rotate(ok ? 0 : (i - 2) * 0.4); x.fillStyle = INK; x.fillRect(-5, -40, 10, 60); x.fillStyle = '#d8dbe6'; x.fillRect(-3, -38, 6, 56); x.restore() }
    if (t > 9.3) cake(x, 850, 1110, 0.55 * pop01(t, 9.3, 0.3, 2), t)
    boomOp(x, t, { who: 'stage', glyph: false, mood: 'neutral', tears: 0, mic: [560, 640], op: [960, 520], size: 140 })
    recChrome(x, t, { label: 'KITCHEN', tc0: 500, y0: 440 })
  }
  function booth(t, id) {
    drawBooth(x, t, { sign: id })
    let mood = 'neutral', look = [0, 0], tears = 0
    if (id === 'taurus') mood = step(t, [[16, 'sparkle'], [19, 'squint'], [21.6, 'wide']])
    if (id === 'aquarius') mood = step(t, [[24, 'neutral'], [27.4, 'squint'], [29, 'happy'], [31, 'wink']])
    if (id === 'pisces') { mood = step(t, [[33, 'sparkle'], [35.6, 'happy'], [37.8, 'wide'], [39.4, 'sparkle']]); tears = t > 37.8 ? 4 : 2 }
    const F = seat(x, t, id, { ...SUBJ, hops: CAPS.filter(c => c.who && c.who.includes(SIGN(id).name) && c.t > 16 && c.t < 42).map(c => c.t + 0.05) }, { mood, look, tears, seed: 3, blush: id === 'taurus' ? 1 : undefined })
    drawChairFront(x)
    if (id === 'aquarius' && t > 29) {
      const k = pop01(t, 29, 0.3, 2)
      x.save(); x.translate(250, 760); x.scale(k, k); x.rotate(-0.05)
      blk(x, -150, -130, 300, 260, '#fbf7ee', { r: 6, hi: 0, lo: 0 })
      x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(-120, -110); x.lineTo(-120, 100); x.lineTo(130, 100); x.stroke()
      x.strokeStyle = PINK; x.lineWidth = 8; x.beginPath(); for (let i = 0; i <= 10; i++) { const px = -110 + i * 22, py = 90 - i * i * 1.8; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
      x.font = `800 22px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.fillText('FEELINGS', -110, -110); if (t > 31) { x.fillStyle = RED; x.fillText('★ NOW?', 60, -100) }
      x.restore()
    }
    if (id === 'pisces' && t > 33.4) for (let i = 0; i < 3; i++) { const k = pop01(t, 33.5 + i * 0.3, 0.3, 2); if (k <= 0) continue; x.save(); x.translate(200 + i * 340, 1250); x.scale(k * 0.8, k * 0.8); for (const [a, l] of [[-0.5, 120], [0, 150], [0.5, 120]]) { x.save(); x.rotate(a); x.fillStyle = '#5fc46e'; rr(x, -12, -l, 24, l, 12); x.fill(); x.restore() } blk(x, -50, -10, 100, 70, '#e07a4a', { r: 8 }); if (t > 35.6) { x.fillStyle = PINK; x.fillRect(-10, -170, 20, 20) } x.restore() }
    boomOp(x, t, id === 'pisces' ? { who: 'stage', glyph: false, mood: 'squint', tears: 0 } : { who: 'stage', glyph: false, mood: 'neutral', tears: 0 })
    if (id !== 'pisces') seat(x, t, 'pisces', { x: 120, y: 1640, s: 170 }, { mood: 'sparkle', look: [1, -1], tears: 3, seed: 6 })
    recChrome(x, t, { tc0: 4000 + SHOTS.findIndex(s => s[3] === id) * 700, y0: 440 })
  }
  function dinnerShot(t) {
    const love = t > T.ily
    const moods = [
      { mood: step(t, [[42, 'sparkle'], [44.6, 'wide'], [47.8, 'squint'], [49.8, 'wide'], [52.8, 'squint'], [T.dark[0], 'wide'], [T.ily, 'wide'], [61.4, 'wide'], [63.6, 'happy'], [T.too, 'heart'], [74.6, 'happy'], [T.last, 'sparkle']]), look: love && t < T.too ? [1, 0] : t > 42.6 && t < T.dark[0] ? [1, 0] : undefined, hops: [42.85, 47.85, 52.85, 61.45, T.too + 0.05, 74.65, T.last + 0.05], blush: 1, pos: t > T.too ? { x: 300 } : undefined },
      { mood: step(t, [[42, 'neutral'], [44.6, 'wide'], [50.2, 'squint'], [T.dark[1], 'neutral'], [T.ily, 'happy'], [63.6, 'wink'], [T.too, 'heart'], [72.4, 'happy'], [T.last, 'sparkle']]), look: t > T.ily - 0.5 && t < T.too ? [-1, 0] : undefined, hops: [50.25, T.ily + 0.05, 63.65, 72.45, T.last + 0.05], blush: love ? 1 : undefined, pos: t > T.too ? { x: 500 } : undefined },
      { mood: step(t, [[42, 'sparkle'], [44.6, 'wide'], [47, 'sparkle'], [55.9, 'squint'], [T.ily, 'wide'], [T.too, 'sparkle'], [76.8, 'happy']]), tears: t > T.ily ? 4 : 2, hops: [45.05, 55.95, 69.65, 76.85, T.last + 0.05], look: [-1, 0] },
    ]
    const cakeK = t > T.cake ? easeOutBack(prog(t, T.cake, T.cake + 0.5), 1.6) : 0
    table(t, moods, { cakeK, candles: t > T.cake, puddle: t > T.ily ? Math.min(1, (t - T.ily) / 20) : 0 })
    // the interruptions
    if (t > T.ding && t < T.ding + 1.4) { blk(x, 860, 640, 120, 120, '#e8604a', { r: 60 }); x.fillStyle = BONE; x.fillRect(915, 660, 10, 50) }
    if (t > T.woof && t < T.woof + 1.6) { const WOOF = ['..BB..BB..', '.BBBBBBBB.', '.BEBBBBEB.', '.BBBNNBBB.', '..BBBBBB..']; x.save(); x.translate(860, 600); for (let j = 0; j < WOOF.length; j++) for (let i = 0; i < 10; i++) if (WOOF[j][i] !== '.') { x.fillStyle = { B: '#c88a4a', E: INK, N: '#3a2a20' }[WOOF[j][i]]; x.fillRect(-100 + i * 20, -50 + j * 20, 20, 20) } x.restore() }
    const dk = t > T.dark[0] && t < T.dark[1] ? 0.85 : flicker(t, [T.dark[0] - 0.4])
    if (dk) { x.fillStyle = `rgba(2,1,8,${dk})`; x.fillRect(0, 0, 1080, 1920); for (const cx of [395, 685]) { const g = x.createRadialGradient(cx, 1090, 0, cx, 1090, 160); g.addColorStop(0, 'rgba(255,200,120,0.4)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(cx - 170, 930, 340, 340) } }
    if (love) sparkles(x, t, 400, 900, T.ily + 0.05, 14, 260, 1, [PINK, GOLD, BONE])
    if (t > T.too) sparkles(x, t, 400, 900, T.too + 0.05, 16, 320, 2, [PINK, GOLD, BONE])
    if (t > T.last) sparkles(x, t, 540, 900, T.last, 16, 420, 3, [PINK, GOLD, BONE])
    boomOp(x, t, { who: 'stage', glyph: false, mood: t > T.stage ? 'sparkle' : t > T.ily ? 'wide' : 'neutral', tears: t > T.stage ? 3 : 0, mic: [560, 640], op: [960, 520], size: 150, sway: t > T.stage ? 1.5 : 1 })
    recChrome(x, t, { tc0: 11000, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const [, , kind, arg] = shotAt(t)
      if (kind === 'cold') cold(t)
      else if (kind === 'prep') prep(t)
      else if (kind === 'booth') booth(t, arg)
      else dinnerShot(t)
      const lid = kind === 'booth' ? arg : null
      lower.update(t, { k: lid ? 1 : 0, name: lid ? `${SIGN(lid).glyph}︎ ${SIGN(lid).name}` : '', color: lid ? SIGN(lid).color : GOLD, tag: lid ? LOWER[lid] : '' })
      ding.update(t, [T.ding, T.ding + 1.2]); woof.update(t, [T.woof, T.woof + 1.2]); said.update(t, [T.ily + 0.5, T.ily + 2.3])
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), whipZoom(WHIP0), slamTitle(HOOK), recordScratch(REC), ...WHIPS.map(w => whipZoom(w)), ...CH.map(c => chapter(c)), ...SHAKES.map(s => screenShake(s))]
export const CUES = [
  ['whoosh', 0.0, 0.6, 0.06], ['pop', 0.05, 1318.5, 0.035, 0],
  ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...WHIPS.flatMap(w => whipZoomCues(w)), ...CH.flatMap(c => chapterCues(c)), ...SHAKES.flatMap(s => shakeCues(s)),
  ...capCues(CAPS),
  ...sobCues(9.6, 3, 0.42), ...sobCues(12.4, 3, 0.4), ...sobCues(38.0, 5, 0.42),
  ['bell', T.ding, 2093, 0.06, 0.8, 0.4], ['bell', T.ding + 0.05, 2637, 0.04, 0.6, 0.4],
  ['tom', T.woof, 180, { gain: 0.25, decay: 0.15 }], ['tom', T.woof + 0.22, 160, { gain: 0.22, decay: 0.15 }],
  ['tick', T.dark[0] - 0.4, 0.07], ['tick', T.dark[0], 0.09], ['tick', T.dark[1], 0.09],
  ['glitter', T.ily + 0.05, T.ily + 0.6], ['bell', T.ily + 0.1, 1318.5, 0.035, 1.6, 0], ['boom', T.ily + 0.5, 0.14],
  ['glitter', T.too + 0.05, T.too + 0.6], ['bell', T.too + 0.1, 1567.98, 0.035, 1.6, 0], ...sobCues(69.7, 6, 0.42),
  ['pop', T.cake + 0.2, 880, 0.04, 0], ['glitter', T.cake + 0.2, T.cake + 0.6], ...sobCues(T.stage + 0.3, 3, 0.4),
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
