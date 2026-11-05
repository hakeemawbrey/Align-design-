// khse24: ZODIAC HOT SEAT, "Twelve signs, one hot seat" (60 s LONG trial reel, loops). Kit: ../../khse01/scenes/hotkit.js.
// Every sign gets one question (fair to all twelve; the joke is on the situation). The chair spins between signs, a
// counter ticks 1/12…12/12, four element chapters (astrology as a lens). Pisces is last, in the chair; Leo takes the
// buzzer for that one.
//   0.00  frame 0: the chair mid-spin with twelve signs flung round it in a blur; the hook "12 signs. One chair.
//         *No skipping.*" 0.3 record scratch: "the last one gets *everybody.*"
//   ① FIRE (Aries, Leo, Sag) ② EARTH (Taurus, Virgo, Capricorn) ③ AIR (Gemini, Libra, Aquarius) ④ WATER (Cancer,
//   Scorpio, then Pisces: "Who are you crying for today?" → "…all of them. they were so honest.")
//   THE STARS: "Everyone gets *nervous* in the chair."  Loops back to the spinning chair.
import { makeHotSeat, HK, drawStarChar, signStar, tearsCells, label, box, prog, ease, lerp, INK, GOLD, INTER } from '../../khse01/scenes/hotkit.js'

const H = 2.0, GAP = 4.68
const SIGNS = ['aries', 'leo', 'sagittarius', 'taurus', 'virgo', 'capricorn', 'gemini', 'libra', 'aquarius', 'cancer', 'scorpio', 'pisces']
const QS = [
  { q: 'Aries: how long can you *wait for a reply?*', a: 'wait for what?', mood: 'squint' },
  { q: 'Leo: *favourite person?*', a: '…you, today.', mood: 'sparkle' },
  { q: 'Sag: staying *in tonight?*', a: 'staying… near in.', mood: 'happy' },
  { q: 'Taurus: *share your fries?*', a: '…one. a small one.', mood: 'squint' },
  { q: 'Virgo: messy room *or tidy?*', a: 'tidy room. messy heart.', mood: 'neutral' },
  { q: 'Capricorn: a *day off* this week?', a: '…I pencilled one in.', mood: 'happy' },
  { q: 'Gemini: call or *voice note?*', a: 'voice note. four of them.', mood: 'sparkle' },
  { q: 'Libra: *pick the movie.*', a: '…okay. this one!', mood: 'wide' },
  { q: 'Aquarius: *hug or wave?*', a: 'wave. okay fine, hug.', mood: 'happy' },
  { q: 'Cancer: still have *their hoodie?*', a: 'it’s a blanket now.', mood: 'happy' },
  { q: 'Scorpio: *trust me?*', a: '…getting there.', mood: 'neutral' },
].map(q => ({ ...q, gap: GAP, ansDelay: 0.75 }))
const at = QS.map((_, i) => H + i * GAP), FQ = H + QS.length * GAP
const starts = [...at, FQ]
const idxAt = t => { let k = 0; for (let i = 0; i < starts.length; i++) if (t >= starts[i] - 0.25) k = i; return k }
// the swivel between signs: [s − 0.5, s] around each start after the first
const swivel = t => { for (let i = 1; i < starts.length; i++) { const p = prog(t, starts[i] - 0.5, starts[i]); if (p > 0 && p < 1) return p } return 0 }
const hookSpin = t => 1 - ease.inOutCubic(prog(t, H - 0.5, H))

const EL = [[0, 'fire'], [3, 'earth'], [6, 'air'], [9, 'water']]
const chapters = EL.map(([i, title], n) => { const a = at[i] - 0.4, b = n + 1 < EL.length ? at[EL[n + 1][0]] - 0.45 : FQ + 4.0; return [HK.chapter, HK.chapterCues, { at: a, out: [b - 0.15, b], n: n + 1, title, x: 56, y: 1440 }] })

function ring(x, t, k) {
  if (k <= 0.01) return
  SIGNS.forEach((s, i) => {
    const a = t * 3.2 + i * Math.PI * 2 / 12, C = signStar(s)
    x.save(); x.globalAlpha = k * (0.55 + 0.45 * Math.max(0, Math.sin(a)))
    drawStarChar(x, 540 + Math.cos(a) * 390, 1000 + Math.sin(a) * 150, 110, t, { color: C.color, glyph: null, mood: i % 3 ? 'wide' : 'happy', seed: i, glow: 0.6, look: [Math.cos(a), 0] })
    x.restore()
  })
}

const EP = makeHotSeat({
  id: 'khse24', sign: 'aries', name: 'Twelve signs', accent: GOLD,
  hook: '12 signs. One chair. | *No skipping.*',
  hookLen: H, breakFx: 'scratch', breakAt: 0.3, scratch: 'the last one gets *everybody.*',
  booth: { sign: t => (t >= FQ - 0.25 ? 'leo' : 'pisces') }, noSweat: true,
  chair: { spin: t => (t < H ? hookSpin(t) * ((t * 2.6) % 2 - 1) : Math.sin(Math.PI * swivel(t))) },
  hero0: { x: 540, y: 1036, s: 290, mood: 'wide' },
  heroDraw(x, t, S, o) {
    const i = idxAt(t), C = signStar(SIGNS[i])
    const sx = t < H ? Math.max(0.15, Math.abs(Math.cos(Math.PI * (t * 2.6)))) * hookSpin(t) + (1 - hookSpin(t)) : Math.max(0.12, Math.abs(Math.cos(Math.PI * swivel(t))))
    x.save(); x.translate(o.x, 0); x.scale(sx, 1); x.translate(-o.x, 0)
    drawStarChar(x, o.x, o.y, o.s, t, { ...o, color: C.color, glyph: C.glyph, seed: 3 + i, glow: 1.1 })
    x.restore()
  },
  onHero(x, t, S) { if (idxAt(t) === 11) tearsCells(x, t, t >= S.T.fa ? 3 : 2) },
  frame0(x, t, S) { ring(x, t, S.k) },
  overlay(x, t, S) {
    // the counter pill (bottom-left, under the chapter sticker)
    const n = idxAt(t) + 1
    box(x, 56, 1566, 190, 70, '#2a2050', { b: 6 })
    label(x, `${n}/12`, 151, 1603, { size: 44, col: GOLD, font: INTER, weight: 800 })
    const d = t - (starts[n - 1] - 0.25)
    if (d >= 0 && d < 0.3) { x.save(); x.globalAlpha = 1 - d / 0.3; box(x, 56 - 12 * d / 0.3, 1566 - 12 * d / 0.3, 190 + 24 * d / 0.3, 70 + 24 * d / 0.3, 'rgba(242,199,92,0.0)', { b: 6 }); x.restore() }
  },
  qs: QS,
  fx: chapters,
  final: { q: 'Pisces: who are you *crying for today?*', a: '…all of them. they were so honest.', mood: 'sparkle', endMood: 'happy', ansDelay: 1.3, hold: 2.6, size: 46 },
  last: 'Everyone gets *nervous* in the chair.',
  tail: 1.5,
  ending: 'loop',
  cues: [...starts.slice(1).map(s => ['whoosh', +(s - 0.5).toFixed(3), 0.45, 0.04])],
  music: { style: 'funk', key: 'C', seed: 3524 },
})
export const { DURATION, SCENES, CUES, T, META } = EP
void [lerp, INK]
