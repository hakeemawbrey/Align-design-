// kcfe15: ZODIAC CONFESSIONAL ep 15, "Single at the holiday dinner" (20.4 s vertical, music: cinematic · D). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: a holiday dinner table, four singles behind it, a fork MID-FALL from Leo's hand, a speech bubble
//          from off-screen: "so… seeing anyone?"; hook "“So… *seeing* anyone?” Booth. Now."
//   0.4    record scratch + freeze: "the *question.*"
//   1.6–12.0  rapid booths: ♑ "I said I'm seeing *my goals.*" · ♒ "I said I'm seeing *the stars.* literally." ·
//             ♌ "I said *'stay tuned.'*" · ♓ (the stagehand takes the boom) "I cried into the *mashed potatoes.*" ·
//             "then grandma *hugged me.*"
//   12.2–13.6 PRODUCER: "and how do you feel?"
//   13.8–18.6 back at the table: "…*actually great.*" · plates refill one by one: "seconds, *please.*"
//   19.0      last line "Single at the table. *Still* got seconds." holds → hard cut at 20.4.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawDiningRoom, drawTable, recChrome, blk, rr, sparkles, step, pop01, wrapText,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen } from '../../hookkit.js'

export const DURATION = 20.4
const SEATS = [{ id: 'capricorn', x: 190 }, { id: 'aquarius', x: 420 }, { id: 'leo', x: 660 }, { id: 'pisces', x: 890 }]
const BOOTHS = [{ id: 'capricorn', at: 1.6 }, { id: 'aquarius', at: 3.8 }, { id: 'leo', at: 6.1 }, { id: 'pisces', at: 8.2 }]
const T = { scratch: 0.4, prod: 12.2, back: 13.8, great: 13.95, seconds: [16.2, 16.5, 16.8, 17.1], please: 16.3, last: 19.0 }
const HOOK = { at: -1, text: '“So… *seeing* anyone?” | Booth. Now.', top: 150, size: 98, accentColor: '#ff8a5a', out: [1.45, 1.6] }
const REC = { at: T.scratch, len: 1.1, caption: 'the *question.*', sub: 'holiday dinner · 7:42 pm', top: 1560 }
const WHIPS = [...BOOTHS.map(b => ({ at: b.at - 0.04, len: 0.38, from: 1.6 })), { at: T.prod - 0.04, len: 0.38, from: 1.4 }, { at: T.back - 0.04, len: 0.4, from: 1.6 }]
const w = id => { const s = SIGN(id); return { who: `${s.glyph}︎ ${s.name}`, color: s.color } }
const CAPS = [
  { t: 1.75, end: 3.7, ...w('capricorn'), text: "I said I'm seeing *my goals.*" },
  { t: 3.95, end: 6.0, ...w('aquarius'), text: "I said I'm seeing *the stars.* literally." },
  { t: 6.25, end: 8.1, ...w('leo'), text: "I said *'stay tuned.'*" },
  { t: 8.35, end: 10.2, ...w('pisces'), text: 'I cried into the *mashed potatoes.*' },
  { t: 10.3, end: 12.05, ...w('pisces'), text: 'then grandma *hugged me.*', accent: PINK },
  { t: T.prod, end: 13.65, kind: 'prod', text: 'and how do you feel?' },
  { t: T.great, end: 16.1, who: 'ALL FOUR', color: BONE, text: '…*actually great.*' },
  { t: T.please, end: 18.7, who: 'ALL FOUR', color: BONE, text: 'seconds, *please.*' },
  { t: T.last, end: 99, who: 'ALL FOUR', color: BONE, text: 'Single at the table. *Still* got seconds.' },
]
const TAGS = { capricorn: '“married to my goals”', aquarius: '“seeing the stars”', leo: '“stay tuned”', pisces: '“cries at dinner (happily)”' }
const boothAt = t => { if (t < BOOTHS[0].at || t >= T.back) return null; let b = null; for (const q of BOOTHS) if (t >= q.at) b = q; return t >= T.prod ? BOOTHS[3] : b }

function bubble(x, cx, cy, text, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 46px ${INTER}`
  const rows = wrapText(x, text, 440), bw = Math.max(...rows.map(r => x.measureText(r).width)) + 56, bh = rows.length * 56 + 36
  x.fillStyle = INK; rr(x, -bw / 2 - 6, -bh / 2 - 6, bw + 12, bh + 12, 26); x.fill(); x.fillStyle = BONE; rr(x, -bw / 2, -bh / 2, bw, bh, 22); x.fill()
  x.beginPath(); x.moveTo(bw / 2 - 30, bh / 2 - 4); x.lineTo(bw / 2 + 40, bh / 2 + 40); x.lineTo(bw / 2 - 70, bh / 2 - 4); x.fill()
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; rows.forEach((r, i) => x.fillText(r, 0, (i - (rows.length - 1) / 2) * 56 + 2))
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function dinner(t) {
    drawDiningRoom(x, t, { wall: '#5a2a32' })
    // garland
    for (let i = 0; i < 14; i++) { const px = 20 + i * 80, py = 440 + 26 * Math.sin(i * 0.8); x.fillStyle = '#2f7a4a'; x.beginPath(); x.arc(px, py, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = i % 2 ? GOLD : '#e8403a'; x.fillRect(px - 7, py + 14, 14, 14) }
    const late = t > T.back
    SEATS.forEach((s, i) => {
      let mood = late ? 'happy' : s.id === 'leo' ? 'wide' : 'squint'
      if (t > T.please) mood = 'heart'
      if (t > T.last) mood = 'sparkle'
      seat(x, t, s.id, { x: s.x, y: 1020, s: 250, hops: late ? [T.great + i * 0.1, ...T.seconds.slice(i, i + 1).map(v => v + 0.05), T.last + 0.05] : [] }, { mood, look: late ? [0, 0] : [1, 0], seed: 20 + i, tears: s.id === 'pisces' ? (late ? 3 : 2) : 0 })
    })
    const plateKs = T.seconds.map(v => t > v ? 1 : 0)
    drawTable(x, t, { y: 1150, plates: SEATS.map(s => s.x), candles: [305, 775], food: true })
    // seconds: heaped food pops on each plate
    SEATS.forEach((s, i) => { if (!plateKs[i]) return; const k = easeOutBack(prog(t, T.seconds[i], T.seconds[i] + 0.3), 2.4); x.save(); x.translate(s.x, 1225); x.scale(k, k); x.fillStyle = '#f6e7b8'; x.beginPath(); x.ellipse(0, 0, 60, 30, 0, Math.PI, 0); x.fill(); x.fillStyle = '#e6a24a'; x.beginPath(); x.ellipse(-20, 4, 30, 12, 0, 0, Math.PI * 2); x.fill(); x.restore(); sparkles(x, t, s.x, 1200, T.seconds[i], 6, 70, i) })
    // the fork mid-fall from Leo's hand (frame 0)
    if (!late) {
      const fp = prog(t, -0.5, 1.6), fy = 1080 + 260 * fp * fp, fr = 0.6 + fp * 3
      x.save(); x.translate(700, fy); x.rotate(fr); x.fillStyle = INK; x.fillRect(-8, -70, 16, 140); x.fillStyle = '#d8dbe6'; x.fillRect(-4, -66, 8, 132); for (let i = 0; i < 3; i++) x.fillRect(-14 + i * 10, -100, 6, 34); x.restore()
      bubble(x, 600, 700, 'so… seeing anyone?', 1)
    }
    recChrome(x, t, { tc0: 69120, y0: 440 })
  }

  function booth(t, b) {
    drawBooth(x, t, { sign: b.id })
    const isP = b.id === 'pisces'
    const mood = isP ? (t > 10.3 ? 'sparkle' : 'wide') : b.id === 'capricorn' ? 'squint' : b.id === 'aquarius' ? 'happy' : 'wink'
    seat(x, t, b.id, { ...SUBJ, hops: [b.at + 0.2, b.at + 0.8, b.at + 1.4] }, { mood, look: [0, 0], seed: 30, tears: isP ? 4 : 0 })
    if (isP) {
      // a spoon of mashed potatoes, mid-sob
      x.fillStyle = '#f6e7b8'; x.beginPath(); x.ellipse(SUBJ.x + 180, SUBJ.y + 120, 70, 40, 0, 0, Math.PI * 2); x.fill()
    }
    drawChairFront(x)
    boomOp(x, t, isP ? { who: 'stage', glyph: false, mood: t > 10.3 ? 'sparkle' : 'squint', tears: t > 10.3 ? 2 : 0 } : { tears: 2, mood: 'sparkle' })
    if (isP && t > 10.3) sparkles(x, t, 540, 860, 10.3, 12, 280, 1, [PINK, GOLD, BONE])
    recChrome(x, t, { tc0: 69400 + b.at * 30, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const b = boothAt(t)
      if (b) booth(t, b); else dinner(t)
      lower.update(t, { k: b ? 1 : 0, name: b ? `${SIGN(b.id).glyph}︎ ${SIGN(b.id).name}` : '', color: b ? SIGN(b.id).color : GOLD, tag: b ? TAGS[b.id] : '' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), slamTitle(HOOK), recordScratch(REC), ...WHIPS.map(w => whipZoom(w))]
export const CUES = [
  ['tick', 0.0, 0.06], ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...WHIPS.flatMap(w => whipZoomCues(w)), ...capCues(CAPS),
  ...sobCues(8.4, 4, 0.4), ['glitter', 10.3, 10.8], ['bell', 10.35, 1318.5, 0.03, 1.0, 0],
  ['glitter', T.great, T.great + 0.5],
  ...T.seconds.map((s, i) => ['pop', s, [784, 880, 988, 1174.66][i], 0.04, (i - 1.5) * 0.3]),
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
