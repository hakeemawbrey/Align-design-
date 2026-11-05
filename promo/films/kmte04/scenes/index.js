// kmte04: MIRROR TALK No. 4, "2 a.m. and missing them." (24 s vertical, star_advice post, dreamy · Db). Hard cut.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Cancer mid-sob in the dark, phone glow on its face, old photos mid-swipe across the glass, the clock
//          at 1:59. Hook "2 a.m. Missing them. *Again.*"  0.7: the clock flips to 2:00 (flash, thud, the bulbs die).
//   3.0    "Old photos. *Bad* idea."  CANCER: "remember this day? we were so *happy*."
//   6.4    the reflection sits down beside it in the glass: "missing someone doesn't mean *go back*." → "it means it
//          *mattered*."  CANCER: "so what do I *do* with it?"  REFLECTION: "write it in your *notes*. not in their DMs."
//   16.4   a notes page: "I miss you." · "I'm glad it happened." · "I'm okay to keep going." → SAVED. The bulbs warm up.
//   20.0   Pisces sends a tissue flying. 22.2 last line "Missing is a feeling. | Not a *plan.*"  Hard cut at 24.
import { makeMirror, drawPhoto, drawNote, drawClock, hearts, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, INK, r3, INTER } from '../../kmte01/mirrorkit.js'

const T = { flip: 0.7, s1: 3.4, sit: 6.2, m1: 6.4, m2: 9.4, s2: 11.8, m3: 14.2, note: 16.4, nl: [16.9, 17.7, 18.5], saved: 19.3, tissue: 20.0, last: 22.2 }
const PHOTOS = [
  { a: '#f6a2c8', b: '#7fd0ff', capt: 'the beach' }, { a: '#f6a2c8', b: '#7fd0ff', capt: 'your bday' },
  { a: '#f6a2c8', b: '#7fd0ff', capt: 'that café' }, { a: '#f6a2c8', b: '#7fd0ff', capt: 'us :)' },
]

const F = makeMirror({
  id: 'kmte04', sign: 'cancer', dur: 24,
  hook: { text: '2 a.m. Missing them. | *Again.*', accentColor: '#c9a6ff', out: [2.75, 3.0] },
  glassTint: ['#152a48', '#1a1236'],
  bulbs: t => t < T.flip ? 0.55 : t < T.note ? 0.08 : lerp(0.08, 1, ease.inOutCubic(prog(t, T.note, T.saved))),
  fx: [
    { k: 'screenShake', at: T.flip, amp: 18, len: 0.45 },
    { k: 'whipZoom', at: T.sit - 0.08, from: 1.3 },
    { k: 'whipZoom', at: T.note - 0.08, from: 1.25 },
    { k: 'screenShake', at: T.saved, amp: 10, len: 0.35 },
  ],
  flashes: [[T.flip, '#c9a6ff', 0.22]],
  caps: [
    { at: 3.0, out: [9.1, 9.3], text: 'Old photos. | *Bad* idea.', accent: '#c9a6ff' },
    { at: 9.35, out: [21.9, 22.1], text: 'It *mattered.*', accent: '#8fe9ff', size: 104, accentSize: 140 },
    { at: T.last, out: [99, 100], text: 'Missing is a feeling. | Not a *plan.*', accent: '#ffd36b', size: 88, accentSize: 116, gap: 0.09 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'remember this day? we were so *happy*.' },
    { t: T.m1, who: 'M', text: "missing someone doesn't mean *go back*." },
    { t: T.m2, who: 'M', text: 'it means it *mattered*.' },
    { t: T.s2, who: 'S', text: 'so what do I *do* with it?' },
    { t: T.m3, who: 'M', text: 'write it in your *notes*. not in their DMs.' },
  ],
  boxes: [[3.2, 16.9]],
  cam(t) { const w = 1 - ease.outCubic(prog(t, 0, 0.7)); return { zoom: 1 + 0.18 * w, dy: 40 * w } },
  pose(t) {
    const p = { mood: 'wide', look: [0.6, 1], blink: false, squash: t < 3 ? 0.05 * Math.sin(t * 22) : 0 }
    if (t > T.s1) { p.mood = 'sparkle'; p.look = [1, 0.6]; p.blink = undefined }
    if (t > T.m1) { p.mood = 'wide'; p.look = [1, -0.8] }
    if (t > T.m2) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.s2) { p.mood = 'neutral'; p.look = [0.5, -0.2] }
    if (t > T.note) { p.mood = 'neutral'; p.look = [1, -0.6] }
    if (t > T.saved) { p.mood = 'happy'; p.look = undefined }
    p.draw = (x, tt, Fr) => {
      // phone glow on the face (dark room) until the note opens
      const g = clamp(1 - prog(tt, T.note - 0.3, T.note + 0.4))
      if (g > 0.01) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const gr = x.createRadialGradient(Fr.ox + 70, Fr.cy - 10, 10, Fr.ox + 70, Fr.cy - 10, 220)
        gr.addColorStop(0, `rgba(140,190,255,${0.35 * g})`); gr.addColorStop(1, 'rgba(140,190,255,0)')
        x.fillStyle = gr; x.fillRect(Fr.ox - 200, Fr.cy - 240, 500, 480); x.restore()
        // the phone itself, held up
        x.save(); x.translate(Fr.ox + 130, Fr.cy + 10); x.rotate(-0.25)
        R(x, INK, -38, -62, 76, 124); R(x, '#9fc8ff', -30, -54, 60, 100); R(x, '#f6a2c8', -22, -40, 44, 44); x.restore()
      }
      // tear streams
    }
    return p
  },
  refl(t) {
    const s = ease.inOutCubic(prog(t, T.sit, T.sit + 0.6))
    const p = { x: lerp(650, 540, s), y: lerp(905, 990, s), s: lerp(250, 215, s), mood: 'neutral', look: [-1, 0.4], alpha: lerp(0.55, 1, clamp(prog(t, 2.5, 3.5))) }
    if (t < T.sit) { p.look = [-1, 1] }
    if (t > T.m1) { p.mood = 'happy'; p.look = [-1, 0.6] }
    if (t > T.note) { p.mood = 'happy'; p.look = [1, -0.5] }
    if (t > T.saved) { p.mood = 'sparkle'; p.look = [-1, 0.6] }
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'wide', look: [-1, -0.2] }
    if (t > T.m2) p.tears = 3
    if (t > T.saved) { p.mood = 'happy'; p.tears = 3 }
    if (t > T.tissue - 0.1 && t < T.tissue + 0.5) p.squash = 0.12
    return p
  },
  pisHops: [T.tissue, T.tissue + 0.5],
  tissuePulls: [T.m2 + 0.4, T.tissue, T.tissue + 0.25, T.tissue + 0.5],
  glass(x, t) {
    // the photo carousel, swiping across the glass (fast at frame 0, slower as Cancer lingers)
    const fade = 1 - ease.inCubic(prog(t, T.sit - 0.2, T.sit + 0.5))
    if (fade > 0.01) {
      const pos = t < T.s1 ? 0.6 + t * 1.6 : 0.6 + T.s1 * 1.6 + (t - T.s1) * 0.12
      PHOTOS.forEach((P, i) => {
        const u = ((pos - i * 1.1) % 4.4 + 4.4) % 4.4 - 2.2
        drawPhoto(x, { cx: 560 + u * 330, cy: 760, w: 250, rot: u * 0.06, k: fade, a: P.a, b: P.b, capt: P.capt })
      })
    }
  },
  front(x, t) {
    // the clock: 1:59 → 2:00 → 2:07
    const txt = t < T.flip ? '1:59' : t < T.saved ? '2:00' : '2:07'
    const bump = t > T.flip ? 1 + 0.3 * Math.exp(-(t - T.flip) * 8) : 1
    drawClock(x, 760, 560, txt + ' AM', { k: bump * outK(t, [T.last - 0.1, T.last + 0.2]), size: 48, col: '#c9a6ff' })
    // the notes page
    if (t > T.note) {
      const k = easeOutBack(prog(t, T.note, T.note + 0.35), 1.6) * outK(t, [T.last - 0.15, T.last + 0.2])
      drawNote(x, t, { cx: 640, cy: 850, w: 460, h: 440, rot: 0.03, k, title: 'notes · 2:00 AM', size: 32, lines: [
        { text: 'I miss you.', at: T.nl[0] }, { text: "I'm glad it happened.", at: T.nl[1] }, { text: "I'm okay to keep going.", at: T.nl[2], col: '#7a3ec8', bold: true },
      ] })
      if (t > T.saved) {
        const sk = pop01(t, T.saved, 0.25, 2.6) * outK(t, [T.last - 0.15, T.last + 0.2])
        x.save(); x.translate(760, 1000); x.rotate(-0.15); x.scale(sk, sk)
        R(x, INK, -96, -34, 192, 68); R(x, '#2fbf71', -88, -26, 176, 52)
        x.font = `800 34px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAVED ✓', 0, 2); x.restore()
      }
    }
    // the tissue Pisces sends flying to Cancer
    if (t > T.tissue && t < T.tissue + 0.9) {
      const p = ease.inOutCubic(prog(t, T.tissue, T.tissue + 0.8))
      x.save(); x.translate(lerp(800, 360, p), lerp(1100, 1080, p) - Math.sin(Math.PI * p) * 260); x.rotate(p * 6)
      R(x, INK, -20, -20, 40, 40); R(x, '#fff', -16, -16, 32, 32); x.restore()
    }
    hearts(x, t, T.saved + 0.2, 300, 1080, { n: 5, cell: 7, spread: 140 })
    sparkles(x, t, 760, 1000, T.saved, 10, 160, 2)
  },
  cues: [
    ['boom', T.flip, 0.18], ['tick', T.flip, 0.06], ['pluck', T.flip + 0.05, 277.18, 0.04, 0.9, 0],
    ...Array.from({ length: 5 }, (_, i) => ['whoosh', r3(0.05 + i * 0.6), 0.3, 0.02]),
    ['whoosh', T.note, 0.4, 0.035], ...T.nl.flatMap(n => Array.from({ length: 6 }, (_, i) => ['tick', r3(n + i * 0.08), 0.015])),
    ['pop', T.saved, 1108.73, 0.05, 0.2], ['bell', T.saved + 0.05, 2217.46, 0.025, 1.0, 0.2], ['glitter', T.saved, T.saved + 0.4],
    ['whoosh', T.tissue, 0.5, 0.03], ['pop', T.tissue + 0.8, 1396.91, 0.035, -0.2],
    ['bell', T.last + 0.6, 1760, 0.03, 1.0, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
