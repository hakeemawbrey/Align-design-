// kdwe12 · Don't Watch This If You're a ___ · "Pisces' Tear Bucket System" (18 s vertical, hard cut) · dreamy · Db
//   Capricorn holds the camera this time (CAPRICORN CAM).
//   0      Pisces slapping its fin on the lens, eyes already wet; "PISCES. | Please. *Don't* look." · scratch · whip out
//   1.5    at the sink: ♓ "i *barely* cry."
//   4.2    whip zoom: a row of labelled buckets: SAD · HAPPY · DOG IN A SCARF · A NICE TEXT · "The *system.*"
//   6.6    a nice text drops: BESTIE "proud of you ♡" → Pisces sobs, the A NICE TEXT bucket fills and overflows
//   9.8    a BACKUP bucket slides in · ♑ (behind the camera) "…that's the *fourth* bucket today."
//   12.8   ♓ "these are *happy* ones!!" · 15.8 "Not crying. | *Hydrating.*" · hard cut at 18
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const PI = tag('pisces'), CP = tag('capricorn')
const SYS = 4.2, TEXT = 6.6, SOB = 7.3, BACKUP = 9.8
const BUCKETS = [['SAD', 0.55], ['HAPPY', 0.8], ['DOG IN|A SCARF', 0.7], ['A NICE|TEXT', 0.15]]
const BX = i => 470 + i * 150
function bucket(x, K, X, Y, label, level, t) {
  K.box(x, X - 66, Y - 160, 132, 160, '#c9d4dc', { o: 5 }); K.rect(x, X - 66, Y - 160, 132, 12, '#8a9aa4')
  const L = clamp(level) * 144
  K.rect(x, X - 62, Y - 4 - L, 124, L, '#7fd0f0'); if (L > 2) K.rect(x, X - 62, Y - 4 - L, 124, 6, '#c9f0ff')
  label.split('|').forEach((l, i) => K.txt(x, l, X, Y + 34 + i * 30, { size: 24, color: '#efe6d6' }))
  if (level > 1) for (let q = 0; q < 4; q++) { const p = (t * 1.5 + q / 4) % 1; K.rect(x, X + 64 + p * 30, Y - 156 + p * p * 160, 10, 12, '#7fd0f0') }
}
const F = dwFilm({
  id: 'kdwe12', sign: 'pisces', dur: 18, ending: 'cut', cam: 'CAPRICORN CAM',
  hook: 'PISCES.|Please. *Don’t* look.', hookOut: 1.3, scratch: 'we’re looking. *gently.*',
  lens: { mood: 'sparkle', look: [0, 0] }, pull: { x: 220, y: 1230, s: 300 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: SYS, cam: [1.08, 620, 1160] },
    { at: BACKUP, cam: [1, 600, 1060] },
  ],
  heads: [
    { text: 'The *system.*', at: 4.5, out: [6.3, 6.55], top: 260, size: 110 },
    { text: 'Not crying.|*Hydrating.*', at: 15.8, top: 250, size: 104 },
  ],
  boxes: [
    { open: 1.45, close: 4.0, lines: [{ t: 1.6, speaker: PI, text: 'i *barely* cry.', color: '#9fd7ff' }] },
    { open: 10.2, close: 15.4, lines: [{ t: 10.35, speaker: CP, text: '…that’s the *fourth* bucket today.', color: '#9fe6b0' }, { t: 12.8, speaker: PI, text: 'these are *happy* ones!!', color: '#9fd7ff' }] },
  ],
  pitch: { [PI]: 1046.5, [CP]: 349.23 },
  fx: [{ f: HK.notification, c: HK.notificationCues, o: { at: TEXT, out: [8.9, 9.15], title: 'messages', body: 'BESTIE: proud of *you* ♡', glyph: '♓', y: 150 } }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#203a4a', wall2: '#10202e', floor: '#22303a', window: true, frame: '#9fd7ff' })
    // the sink
    K.box(x, 40, 1260, 300, 40, '#c9d4dc'); K.rect(x, 70, 1300, 240, 470, '#5a6a74'); K.box(x, 170, 1150, 20, 110, '#8a9aa4', { o: 3 }); K.box(x, 170, 1150, 80, 20, '#8a9aa4', { o: 3 })
    BUCKETS.forEach(([l, lv], i) => {
      let level = lv
      if (i === 3) level = lv + 1.0 * ease.inOutQuad(prog(t, SOB + 0.2, BACKUP - 0.3))
      bucket(x, K, BX(i), 1380, l, level, t)
    })
    // the BACKUP bucket slides in
    const sl = ease.outBack(prog(t, BACKUP, BACKUP + 0.5))
    if (sl > 0) bucket(x, K, lerp(1400, BX(3) + 150, sl), 1380, 'BACKUP', 0.08 + 0.5 * prog(t, BACKUP + 0.6, 15), t)
    if (t > SOB + 0.1 && t < BACKUP - 0.2) for (let q = 0; q < 10; q++) {
      const p = (t * 1.2 + q / 10) % 1, X = lerp(300, BX(3), p), Y = 1170 - Math.sin(p * Math.PI) * 300 + p * 40
      K.box(x, X - 8, Y - 10, 16, 22, '#8fe3ff', { o: 3 })
    }
    if (!K.hide) {
      const sob = t > SOB
      K.star(x, t, 'pisces', { x: 220, y: 1230, s: 300, mood: t < SYS ? 'happy' : t < TEXT ? 'wink' : t < SOB ? 'wide' : 'sparkle', look: t < SYS ? [0, 0] : [1, 0], seed: 6, glow: 0.85, tears: t < SOB ? 1 : 3, squash: sob ? 0.05 * Math.sin(t * 12) : 0 })
    }
  },
  cues: [
    ['whoosh', SYS - 0.05, 0.3, 0.05], ...BUCKETS.map((_, i) => ['pop', +(SYS + 0.3 + i * 0.15).toFixed(2), 659.25 + i * 90, 0.035, i / 2 - 0.75]),
    ['glitter', SOB, SOB + 2.4], ...[0, 0.4, 0.8, 1.2, 1.6, 2.0].map(d => ['pluck', +(SOB + 0.2 + d).toFixed(2), 1318.51 - d * 100, 0.025, 0.3, 0.3]),
    ['whoosh', BACKUP, 0.4, 0.05], ['tick', BACKUP + 0.45, 0.06],
  ],
  music: { style: 'dreamy', key: 'Db', seed: 4112, sections: { drop: 1.42, lift: [SOB] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
