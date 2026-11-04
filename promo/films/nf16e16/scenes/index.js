// nf16e16: MEET THE FAMILY, "The Baby Photos" (35 s vertical, star_advice post, music: pop · F).
// Story 0–30.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–5.4    HOOK "Mom just got out | the *baby photos.*"  The couch: Mom ♉ Taurus mid-flip of a giant album, ♑ Capricorn
//              delighted beside her, ♊ Gemini mid-lunge to stop it. MOM: "page one! *the pumpkin hat.*"
//   5.4–12.8   "Page two. | Page *three.*"  The album flips: the bowl haircut · the school play (Gemini was a tree, one line).
//              GEMINI melts into the cushions: "it had *one line!*"
//   12.8       card cut → NOTES: laugh along, it means they love you · one kind "okay, last one, Mom" is fine ·
//              partners: be sweet about it, never mean.
//   21.2–30.6  "Laugh along. | *Then turn the page.*"  CAPRICORN: "can I get a *copy* of the tree?" Mom tears up; Grandma ♓ Pisces
//              sobs at the tree. GEMINI: "…fine. *one copy.*" THE STARS: "Laugh along. *Then turn the page.*"
import { makeFamily, bubble, mark, hearts, sparkles, drawStarChar, signStar, R, box, prog, clamp, ease, lerp, BONE, GOLD, PINK, INK } from '../../nf16e13/famkit.js'

const GEM = signStar('gemini')
// one baby-photo (polaroid) at (cx, cy): kind 0 pumpkin hat · 1 bowl haircut · 2 the tree
function photo(x, t, cx, cy, kind, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -95, -110, 190, 220, '#fffaf0', { b: 5 })
  R(x, ['#ffd0a0', '#bfe0ff', '#2a2240'][kind], -80, -96, 160, 160)
  if (kind === 2) { // the school play: a spotlight, a cardboard tree with a star face
    x.fillStyle = 'rgba(255,240,190,0.25)'; x.beginPath(); x.moveTo(-20, -96); x.lineTo(20, -96); x.lineTo(70, 64); x.lineTo(-70, 64); x.closePath(); x.fill()
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, -86); x.lineTo(58, 40); x.lineTo(-58, 40); x.closePath(); x.fill()
    x.fillStyle = '#2f8f5a'; x.beginPath(); x.moveTo(0, -78); x.lineTo(50, 34); x.lineTo(-50, 34); x.closePath(); x.fill()
    drawStarChar(x, 0, -6, 52, t, { color: GEM.color, mood: 'wide', seed: 3, glow: 0.3, tips: false, bob: 0 })
    R(x, '#6b4a2f', -10, 40, 20, 22)
  } else {
    drawStarChar(x, 0, -10, 110, t, { color: GEM.color, mood: kind ? 'neutral' : 'happy', seed: 3, glow: 0.4, tips: false, bob: 0 })
    if (kind === 0) { box(x, -26, -78, 52, 26, '#ff8a2a', { b: 4 }); R(x, '#3a8a4a', -4, -92, 8, 14) }
    else { box(x, -40, -66, 80, 26, '#7a4a22', { b: 4 }); R(x, '#7a4a22', -44, -48, 14, 14); R(x, '#7a4a22', 30, -48, 14, 14) }
  }
  x.fillStyle = INK; x.font = "700 20px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(['PUMPKIN!', 'THE BOWL', 'TREE #2'][kind], 0, 86)
  x.restore()
}
// the giant album, open: left page shows `l`, right page `r`; flip 0…1 turns the right page over
function album(x, t, cx, cy, l, r, flip = 0, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -330, -190, 660, 380, '#7a2f3e', { b: 7 })
  R(x, '#f6eedd', -315, -175, 310, 350); R(x, '#efe4cc', 5, -175, 310, 350); R(x, INK, -4, -180, 8, 360)
  if (l != null) photo(x, t, -160, 0, l, 1.25)
  if (r != null && flip < 0.5) { x.save(); x.scale(1 - 2 * flip, 1); x.translate(160, 0); photo(x, t, 0, 0, r, 1.25); x.restore() }
  if (flip > 0 && flip < 1) { const w = 310 * Math.abs(Math.cos(Math.PI * flip)); R(x, INK, flip < 0.5 ? 5 : -5 - w, -182, w + 4, 364); R(x, '#fffaf0', flip < 0.5 ? 7 : -3 - w, -175, w, 350) }
  x.restore()
}
const LIV = { couchX: 540, couchW: 520, tree: false, winX: 860, frames: false }
const EP = makeFamily({
  id: 'nf16e16', key: 'F',
  cast: {
    you: { sign: 'gemini', role: 'GEMINI', acc: { scarf: '#7fd0ff' }, text: '#fff1a8' },
    them: { sign: 'capricorn', role: 'CAPRICORN', acc: { bow: '#c9a6ff' }, text: '#e0d8ff' },
    mom: { sign: 'taurus', role: 'MOM', acc: { pearls: 1, glasses: 1 }, text: '#d8ffd8' },
  },
  beats: [
    { len: 5.4, room: 'living', roomOpts: LIV, head: 'Mom just got out | the *baby photos.*',
      lines: [{ u: 0.8, who: 'mom', text: 'page one! *the pumpkin hat.*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'mom', { x: 430, y: 1060, s: 190, mood: 'sparkle', look: [0, -1] })
        S.cast(x, t, 'them', { x: 650, y: 1060, s: 190, mood: u > 1.4 ? 'heart' : 'happy', look: [-1, -1], hops: [S.t0 + 1.4] })
        album(x, t, 540, 760, 0, null, 0, 0.82)
        // Gemini mid-lunge from the left
        const lg = 0.5 + 0.5 * Math.sin(t * 6)
        S.cast(x, t, 'you', { x: 170 + 30 * lg, y: 960 - 20 * lg, s: 190, mood: 'wide', look: [1, -0.5], squash: -0.08 })
        mark(x, t, 200, 790, S.t0 - 1, S.t0 + 5.3, '!', GOLD)
      },
      cues: [['pluck', 1.4, 1174.66, 0.035, 0.4, 0.2]] },
    { len: 7.4, room: 'living', roomOpts: LIV, head: 'Page two. | Page *three.*',
      lines: [{ u: 0.4, who: 'mom', text: 'the *bowl* haircut!' }, { u: 2.6, who: 'mom', text: 'and the school play. *a tree.*' }, { u: 5.0, who: 'you', text: 'it had *one line!*' }],
      draw(x, t, S) {
        const u = S.u
        const f1 = prog(u, 0, 0.45), f2 = prog(u, 2.3, 2.75)
        const l = u < 0.22 ? 0 : u < 2.52 ? 1 : 2
        const r = u < 0.22 ? 1 : u < 2.52 ? 2 : null
        album(x, t, 540, 760, l === 0 ? 0 : l, u < 2.3 ? (u < 0.22 ? null : 2) : null, u < 0.6 ? f1 : f2 < 1 && u > 2.3 ? f2 : 0, 0.82)
        void r
        S.cast(x, t, 'mom', { x: 430, y: 1080, s: 170, mood: 'sparkle', look: [0, -1], hops: [S.t0 + 0.4, S.t0 + 2.6] })
        S.cast(x, t, 'them', { x: 650, y: 1080, s: 170, mood: u > 2.8 ? 'heart' : 'happy', look: [-1, -1], hops: [S.t0 + 0.6, S.t0 + 3.0, S.t0 + 3.3] })
        // Gemini melts into the cushion, a bit more each page
        const melt = clamp(prog(u, 0.4, 6.0))
        S.cast(x, t, 'you', { x: 180, y: lerp(1060, 1130, melt), s: 170, mood: u > 5.0 ? 'squint' : 'wide', look: [1, -0.6], squash: 0.25 * melt })
        bubble(x, t, 650, 920, S.t0 + 3.1, S.t0 + 4.9, 'ICONIC', { size: 28, col: '#e0d8ff' })
      },
      cues: [['whoosh', 0.0, 0.25, 0.035], ['whoosh', 2.3, 0.25, 0.035], ['pop', 3.1, 1318.51, 0.03, 0.3]] },
    { len: 8.4, kind: 'notes',
      tips: ['Laugh along. *It means they love you.*', 'One kind “okay, last one, Mom” *is fine.*', 'Partners: be *sweet* about it, never mean.'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9, S.t0 + 3.2] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0], hops: [S.t0 + 5.5] })
      } },
    { len: 9.4, room: 'living', roomOpts: LIV, head: 'Laugh along. | *Then turn the page.*', pis: false,
      lines: [{ u: 0.4, who: 'them', text: 'can I get a *copy* of the tree?' }, { u: 2.9, who: 'you', text: '…fine. *one copy.*' }],
      lastU: 5.0, last: 'Laugh along. *Then turn the page.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        album(x, t, 540, 760, 2, null, 0, 0.82 * ok)
        S.pisces(x, t, { x: 900, y: 1070, s: 150, mood: 'happy', tears: 3, acc: { glasses: 1, bun: '#c9c2d8' }, pop: ok })
        S.cast(x, t, 'mom', { x: 430, y: 1080, s: 170, mood: u > 0.9 ? 'happy' : 'sparkle', look: [1, 0], pop: ok, tears: u > 1.0 ? 1 : 0 })
        S.cast(x, t, 'them', { x: 650, y: 1080, s: 170, mood: 'heart', look: [-1, -1], pop: ok, hops: [S.t0 + 0.4] })
        S.cast(x, t, 'you', { x: 200, y: 1070, s: 170, mood: u > 2.9 ? 'happy' : 'squint', look: [1, 0], pop: ok, hops: [S.t0 + 3.0] })
        hearts(x, t, S.t0 + 0.6, 650, 940, { n: 5 })
        sparkles(x, t, 400, 760, S.t0 + 3.0, 10, 160, 2, [GOLD, PINK, BONE])
      },
      cues: [['pluck', 0.6, 1318.51, 0.035, 0.5, 0.2], ['glitter', 3.0, 3.5]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void ease
