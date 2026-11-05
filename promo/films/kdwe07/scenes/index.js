// kdwe07 · Don't Watch This If You're a ___ · "Libra's Secret Ranked List" (16 s vertical, loop) · cinematic · Eb
//   0      Libra slapping the lens, scales swinging; "LIBRA. | Keep *scrolling.* Seriously." · scratch + freeze · whip out
//   1.5    a café table, the date (Aries): "so where should we *eat?*" · ♎ "oh, *anywhere's* fine!"
//   4.8    whip zoom behind Libra's back: a ranked scroll unrolls to the floor (and past it) · "*Anywhere* | means number one."
//   9.3    ARIES "the noodle place?" → it's #1: the scroll snaps shut, ♎ "oh! *sure,* that works!"
//   11.9   Pisces at the next table, sobbing: "you're so *organised!!*"
//   13.7   "“Anywhere's fine.” | *Number one* is fine." · 15.55 Libra lunges back at the lens → frame 0 (loop)
import { dwFilm, tag } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const LI = tag('libra'), AR = tag('aries'), PI = tag('pisces')
const SCROLL = [4.9, 8.6], SNAP = 10.9, PIS = 11.9
const ROWS = ['1. the noodle place ★', '   (window seat)', '2. the taco window', '3. that soup spot', '4. picnic (if sunny)', 'BACKUP PLANS', 'A. noodles, to go', 'B. noodles, again', 'BACKUP FOR BACKUP', 'C. cereal at mine']
const F = dwFilm({
  id: 'kdwe07', sign: 'libra', dur: 16, ending: 'loop',
  hook: 'LIBRA.|Keep *scrolling.* Seriously.', hookOut: 1.3, scratch: 'scrolling? *never.*',
  lens: { mood: 'wide', look: [0, 0] }, pull: { x: 400, y: 1230, s: 300 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: 4.8, cam: [1.15, 330, 1180] },
    { at: 9.2, cam: [1, 540, 960] },
  ],
  punch: [{ at: 10.9, dur: 1.0, z: 0.15, x: 400, y: 1150 }],
  heads: [
    { text: '*Anywhere*|means number one.', at: 5.3, out: [8.9, 9.15], top: 240, size: 86 },
    { text: '“Anywhere’s fine.”|*Number one* is fine.', at: 13.7, out: [15.2, 15.45], top: 250, size: 84 },
  ],
  boxes: [
    { open: 1.45, close: 5.0, lines: [{ t: 1.6, speaker: AR, text: 'so where should we *eat?*', color: '#ff9a7a' }, { t: 3.05, speaker: LI, text: 'oh, *anywhere’s* fine!', color: '#ffc6e0' }] },
    { open: 9.25, close: 13.5, lines: [{ t: 9.4, speaker: AR, text: 'the *noodle* place?', color: '#ff9a7a' }, { t: 11.1, speaker: LI, text: 'oh! *sure,* that works!', color: '#ffc6e0' }] },
  ],
  pitch: { [LI]: 698.46, [AR]: 523.25 },
  paint(x, t, K) {
    K.room(x, t, { wall: '#3a2440', wall2: '#1e1226', floor: '#2e2030', window: true, frame: '#ffc6e0', warm: 0.5 })
    // the café table
    K.box(x, 520, 1220, 300, 30, '#c9a07a'); K.rect(x, 656, 1250, 26, 520, '#6a4a3a')
    K.box(x, 560, 1170, 60, 50, '#efe6d6', { o: 3 }); K.box(x, 710, 1170, 60, 50, '#efe6d6', { o: 3 })
    // the date
    K.star(x, t, 'aries', { x: 900, y: 1220, s: 300, mood: t < 9.2 ? 'happy' : 'sparkle', look: [-1, 0], seed: 3 })
    // the scroll behind Libra's back
    const open = ease.inOutQuad(prog(t, ...SCROLL)) * (1 - ease.inCubic(prog(t, SNAP, SNAP + 0.25)))
    if (open > 0.001) {
      const L = 1400 * open
      K.box(x, 20, 1040, 220, 34, '#c99a5a')
      x.save(); x.beginPath(); x.rect(10, 1070, 240, L); x.clip()
      K.rect(x, 30, 1070, 200, 1400, '#f6ecd4')
      ROWS.forEach((r, i) => K.txt(x, r, 40, 1110 + i * 72, { size: r.startsWith('BACKUP') ? 20 : 19, align: 'left', color: r.startsWith('BACKUP') ? K.RED : '#2a1a3a', maxW: 185 }))
      x.restore()
      K.box(x, 20, 1060 + L, 220, 30, '#c99a5a')
    }
    if (t > PIS) K.pisces(x, t, { x: 880, y: 880, s: 220, pop: K.pop01(t, PIS, 0.4), mood: 'sparkle', look: [-1, 0.5], tears: 3 })
    if (!K.hide) {
      const mood = t < 3.0 ? 'neutral' : t < 4.8 ? 'happy' : t < 9.2 ? 'wink' : t < SNAP ? 'wide' : 'sparkle'
      K.star(x, t, 'libra', { x: 400, y: 1230, s: 300, mood, look: t < 4.8 ? [1, 0] : t < 9.2 ? [0, 0] : [1, 0], seed: 5, rot: Math.sin(t * 2) * 0.04 })
    }
  },
  over(x, t, K) {
    K.caught(x, t, { X: 130, Y: 1110, r: 100, at: 9.75, out: 10.9 })
  },
  cues: [
    ['whoosh', SCROLL[0], 3.4, 0.03], ...ROWS.map((_, i) => ['tick', +(SCROLL[0] + 0.3 + i * 0.34).toFixed(2), 0.03]),
    ['whoosh', SNAP, 0.2, 0.06], ['tick', SNAP + 0.2, 0.08], ['bell', SNAP + 0.1, 1567.98, 0.04, 1, 0],
    ['pop', PIS + 0.03, 987.77, 0.05, 0.3], ['glitter', PIS, PIS + 1.4],
  ],
  music: { style: 'cinematic', key: 'Eb', seed: 4107, sections: { drop: 1.42, lift: [SNAP] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
