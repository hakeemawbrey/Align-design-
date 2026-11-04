// nf16e20: MEET THE FAMILY, "Homesick at Their Table" (40 s vertical, star_advice post, music: house · A).
// Story 0–35.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–5.0    HOOK "First holiday away | from *my* family."  ♑ Capricorn's family table. ♎ Libra mid-smile with a tiny rain
//              cloud over its head; Dad ♈ Aries raises a mug of cocoa: "to *family!*"
//   5.0–11.4   "The cloud | *grows.*"  A thought panel: Libra's own family kitchen, Mom ♓ Pisces at the stove. The cloud
//              doubles. CAPRICORN notices: "hey. you ok?"
//   11.4–17.0  "Say it *kindly.*"  LIBRA: "I love this. I just miss *my mom.*" CAPRICORN: "of course you do."
//   17.0       card cut → NOTES: it's okay to miss home here · say it out loud, kindly · make a little room for both.
//   25.6–35.6  "Room | *for both.*"  CAPRICORN: "call her. we'll all *say hi.*" A tablet on the table: Libra's mom on video,
//              crying happy; the whole table waves; the cloud pops into sparkles. MOM: "hi everyone!! *I'm crying!*"
//              THE STARS: "Miss them *out loud.*"
import { makeFamily, bubble, hearts, sparkles, drawStarChar, signStar, label, R, box, puff, prog, clamp, ease, lerp, BONE, GOLD, PINK, INK, SKYB } from '../../nf16e13/famkit.js'

const PIS = signStar('pisces')
// a small grey rain cloud over a head; k scales it, a fades it
function cloud(x, t, cx, cy, k, a = 1) {
  if (k <= 0.01 || a <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(k * 1.6, k * 1.6)
  for (const [ox, oy, w, h] of [[-50, -10, 100, 40], [-34, -34, 50, 40], [0, -44, 50, 50]]) { R(x, INK, ox - 5, oy - 5, w + 10, h + 10) }
  for (const [ox, oy, w, h] of [[-50, -10, 100, 40], [-34, -34, 50, 40], [0, -44, 50, 50]]) { R(x, '#8c86a8', ox, oy, w, h) }
  R(x, '#aca6c8', -30, -30, 30, 10)
  for (let i = 0; i < 4; i++) { const p = ((t * 1.6 + i / 4) % 1); R(x, SKYB, -36 + i * 22, 34 + p * 40, 5, 12) }
  x.restore()
}
function mug(x, cx, cy, col = '#ff8fb1', rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -22, -26, 44, 52, col, { b: 5 }); R(x, INK, 22, -12, 14, 26); R(x, '#7a4a22', -18, -22, 36, 8); x.restore() }
// the flashback: a thought panel with Libra's family kitchen
function memory(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -180, -120, 360, 240, '#2b5070', { b: 7 })
  R(x, '#e9dcc6', -180, 40, 360, 80); R(x, '#d8cfc0', -180, 34, 360, 10)
  box(x, 60, -10, 80, 44, '#8c86a8', { b: 5 }); for (let i = 0; i < 2; i++) R(x, 'rgba(239,230,214,0.5)', 80 + i * 30, -40 - 12 * Math.sin(t * 4 + i), 14, 14)
  drawStarChar(x, -40, -6, 130, t, { color: PIS.color, mood: 'happy', seed: 6, glow: 0.5, tips: false })
  x.restore()
  for (const [ox, oy, r] of [[-120, 150, 18], [-150, 200, 11]]) { R(x, INK, cx + ox * k - r - 4, cy + oy * k - r - 4, 2 * r + 8, 2 * r + 8); R(x, BONE, cx + ox * k - r, cy + oy * k - r, 2 * r, 2 * r) }
}
function tablet(x, t, cx, cy, k, S) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -170, -125, 340, 250, '#2a2148', { b: 8 })
  R(x, '#2b5070', -150, -105, 300, 210)
  R(x, '#e9dcc6', -150, 50, 300, 55)
  x.restore()
  S.pisces(x, t, { x: cx, y: cy - 4 * k, s: 170 * k, mood: 'happy', tears: 3, look: [0, 0] })
  label(x, '● LIVE', cx - 100 * k, cy - 92 * k, { size: 22 * k, col: '#ff6b7f' })
}
const TOPTS = { roastX: -1000, plates: [[180, '#e8b25a'], [420, '#7fbf5a'], [650, '#e8b25a'], [880, '#7fbf5a']], candles: [300, 770] }
const SEATS = { dad: 180, you: 420, them: 650, sis: 880 }
function family(x, t, S, { wave = 0, ok = 1, dadMood = 'happy', sisMood = 'happy' } = {}) {
  const hp = wave ? [S.t0 + wave, S.t0 + wave + 0.4, S.t0 + wave + 0.8] : []
  S.cast(x, t, 'dad', { x: SEATS.dad, y: 1030, s: 200, mood: dadMood, look: [1, 0], pop: ok, hops: hp })
  S.cast(x, t, 'sis', { x: SEATS.sis, y: 1030, s: 190, mood: sisMood, look: [-1, 0], pop: ok, hops: hp.map(h => h + 0.15) })
}
const EP = makeFamily({
  id: 'nf16e20', key: 'A',
  cast: {
    you: { sign: 'libra', role: 'LIBRA', acc: { scarf: '#ff8fb1' }, text: '#ffd8ec' },
    them: { sign: 'capricorn', role: 'CAPRICORN', acc: { beanie: '#4f7cd8' }, text: '#e0d8ff' },
    dad: { sign: 'aries', role: 'DAD', acc: { glasses: 1 }, text: '#ffd0c0' },
    sis: { sign: 'gemini', role: 'SISTER', acc: { bow: '#7fd0ff' } },
    mom: { sign: 'pisces', role: 'MOM', text: '#cfe4ff' },
  },
  beats: [
    { len: 5.0, room: 'table', roomOpts: TOPTS, head: 'First holiday away | from *my* family.',
      lines: [{ u: 0.6, who: 'dad', text: 'to *family!*' }],
      draw(x, t, S) {
        const u = S.u
        family(x, t, S, { dadMood: 'sparkle' })
        mug(x, SEATS.dad + 90, 900 - 30 * clamp(prog(u, -1, 0.5)), '#ffd25a', -0.2)
        S.cast(x, t, 'you', { x: SEATS.you, y: 1040, s: 200, mood: 'happy', look: [-1, 0] })
        S.cast(x, t, 'them', { x: SEATS.them, y: 1040, s: 200, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.7] })
        cloud(x, t, SEATS.you, 820, 0.6)
        bubble(x, t, SEATS.dad + 60, 780, S.t0 - 1, S.t0 + 2.2, 'CHEERS!', { size: 30, col: '#ffd0c0' })
      },
      cues: [['pop', 0.6, 1318.51, 0.04, -0.3], ['tick', 0.65, 0.05]] },
    { len: 6.4, room: 'table', roomOpts: TOPTS, head: 'The cloud | *grows.*',
      lines: [{ u: 3.7, who: 'them', text: 'hey. *you ok?*' }],
      draw(x, t, S) {
        const u = S.u
        family(x, t, S)
        S.cast(x, t, 'you', { x: SEATS.you, y: 1040, s: 200, mood: u > 1.5 ? 'neutral' : 'happy', look: [1, -1] })
        S.cast(x, t, 'them', { x: SEATS.them, y: 1040, s: 200, mood: u > 3.4 ? 'wide' : 'happy', look: u > 3.4 ? [-1, -0.4] : [1, 0], hops: [S.t0 + 3.4] })
        cloud(x, t, SEATS.you, 820 - 30 * clamp(prog(u, 0.3, 2)), lerp(0.6, 1.1, ease.outBack(prog(u, 0.3, 1.2))))
        memory(x, t, 540, 640, ease.outBack(prog(u, 0.6, 1.0)) * (1 - prog(u, 3.3, 3.6)))
      },
      cues: [['whoosh', 0.6, 0.35, 0.03], ['pluck', 1.0, 659.25, 0.03, 0.6, 0], ['pop', 3.4, 1567.98, 0.035, 0.2]] },
    { len: 5.6, room: 'table', roomOpts: TOPTS, head: 'Say it *kindly.*',
      lines: [{ u: 0.3, who: 'you', text: 'I love this. I just miss *my mom.*' }, { u: 2.9, who: 'them', text: 'of course *you do.*' }],
      draw(x, t, S) {
        const u = S.u
        family(x, t, S)
        S.cast(x, t, 'you', { x: SEATS.you, y: 1040, s: 200, mood: 'happy', look: [1, 0] })
        S.cast(x, t, 'them', { x: SEATS.them, y: 1040, s: 200, mood: u > 2.9 ? 'happy' : 'neutral', look: [-1, 0] })
        cloud(x, t, SEATS.you, 820, lerp(1.1, 0.7, clamp(prog(u, 2.9, 4))))
        hearts(x, t, S.t0 + 3.2, SEATS.them, 900, { n: 4 })
      } },
    { len: 8.6, kind: 'notes',
      tips: ['It’s okay to miss home, *here.*', 'Say it out loud, *kindly.*', 'Make a little room *for both.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 3.2] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0], hops: [S.t0 + 5.5] })
      } },
    { len: 10.0, room: 'table', roomOpts: TOPTS, head: 'Room | *for both.*', pis: false,
      lines: [{ u: 0.3, who: 'them', text: 'call her. we’ll all *say hi.*' }, { u: 2.8, who: 'mom', text: 'hi everyone!! *I’m crying!*' }],
      lastU: 5.4, last: 'Miss them *out loud.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        family(x, t, S, { wave: 2.4, ok, dadMood: u > 2.4 ? 'sparkle' : 'happy', sisMood: u > 2.4 ? 'heart' : 'happy' })
        S.cast(x, t, 'you', { x: SEATS.you, y: 1040, s: 200, mood: u > 2.0 ? 'heart' : 'happy', look: [1, -0.5], pop: ok, hops: [S.t0 + 2.4, S.t0 + 2.8] })
        S.cast(x, t, 'them', { x: SEATS.them, y: 1040, s: 200, mood: 'happy', look: [-1, -0.5], pop: ok, hops: [S.t0 + 2.6] })
        cloud(x, t, SEATS.you, 820, 0.7, 1 - prog(u, 1.7, 2.0))
        sparkles(x, t, SEATS.you, 820, S.t0 + 1.9, 10, 120, 1, [GOLD, BONE, SKYB])
        tablet(x, t, 540, 720, ease.outBack(prog(u, 1.4, 1.9)) * ok, S)
        hearts(x, t, S.t0 + 3.0, 540, 600, { n: 6 })
      },
      cues: [['pluck', 1.9, 1318.51, 0.04, 0.6, 0], ['glitter', 1.9, 2.4], ['pop', 2.4, 987.77, 0.03, -0.3], ['pop', 2.6, 1174.66, 0.03, 0.3]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [puff, PINK]
