// kpple03 · Planet Talk: Pluto · "Pluto to Gemini: Seventeen Drafts of Closure" (24 s vertical, loop) · pop · G
//   0      Pluto mid-zoom out of Gemini's phone screen, way too close, Gemini mid-typing on two phones ·
//          "GEMINI. | Stop *drafting* closure." · 0.3 lands · 0.45 glitch
//   2.8    the drafts flip on a big phone, DRAFT 1 → 17 (long, short, a poem, a 4-minute voice note…)
//   7.3    ♇ "closure is something you *give yourself.*" · 10.7 ♊ "can I give it to myself in a *voice note?*"
//   13.9   ♇ a long, heavy "……" · 15.5 "*fine.*" · 17.1 Pisces over Gemini's shoulder, sobbing: "draft *nine* made me cry"
//   19.9   draft 18 on the phone: "I'm good." · ♇ "that one. still *counts.*" · 22.1 "Draft eighteen: | *I'm good.*"
//   23.55  loops back into the frame-0 zoom
import { plutoFilm, HK } from '../../kpple01/plutokit.js'

const D = 24
const PL = 'pluto', GE = 'gemini', PI = 'pisces'
const DRAFTS = ['hey so I think we should talk about us', 'no wait. hi.', 'I just want closure :)', 'roses are red, this was confusing', 'VOICE NOTE ▶ 4:32', 'ok. final final draft.']
const GL = { at: 0.45, len: 0.6, dialog: false, amp: 0.8 }

function miniPhone(x, K, X, Y, rot, glowK = 0) {
  x.save(); x.translate(X, Y); x.rotate(rot)
  K.rrect(x, -44, -80, 88, 160, 16, K.INK); K.rrect(x, -36, -70, 72, 140, 10, glowK > 0 ? '#bfe9ff' : '#3a2f5a')
  x.restore()
}

const F = plutoFilm({
  id: 'kpple03', sign: GE, dur: D, ending: 'loop',
  hook: { text: 'GEMINI. | Stop *drafting* closure.', out: [2.5, 2.75] },
  enter: { kind: 'zoom', at: -0.6, len: 0.9, x: 540, y: 720, size: 300 },
  shots: [{ at: 13.8, z: 1.18, cx: 540, cy: 800, d: 1.4 }, { at: 16.9, z: 1, cx: 540, cy: 960, d: 0.5 }],
  says: [
    { t0: 7.3, t1: 10.4, who: PL, text: 'closure is something you *give yourself.*', x: 540, y: 470 },
    { t0: 10.7, t1: 13.6, who: GE, text: 'can I give it to myself in a *voice note?*', x: 540, y: 1740, tailUp: true, tail: 0 },
    { t0: 13.9, t1: 15.3, who: PL, text: '……', x: 540, y: 470 },
    { t0: 15.5, t1: 16.8, who: PL, text: '*fine.*', x: 540, y: 470 },
    { t0: 17.1, t1: 19.6, who: PI, text: 'draft *nine* made me cry', x: 400, y: 1050, tail: -80 },
    { t0: 20.0, t1: 22.0, who: PL, text: 'that one. still *counts.*', x: 540, y: 470 },
  ],
  last: { text: 'Draft eighteen: | *I’m good.*', at: 22.1 },
  fx: [{ f: HK.glitch, c: HK.glitchCues, o: GL }],
  paint(x, t, K) {
    // a bedroom-desk glow
    K.box(x, 140, 1500, 800, 40, '#4a3a6a'); K.glow(x, 540, 1400, 600, '#7fb8ff', 0.18)
    K.pluto(x, t, { mood: t < 7 ? 'angry' : t > 13.8 && t < 15.4 ? 'sly' : t > 19.9 ? 'proud' : 'neutral', look: t > 10.6 && t < 13.7 ? [0, 1] : undefined })
    const typing = t < 7 ? 0.08 * Math.sin(t * 22) : 0
    K.sign(x, t, GE, { x: 540, y: 1360, size: 300, mood: t < 2.7 ? 'wide' : t < 10.6 ? 'squint' : t < 15.4 ? 'neutral' : t < 19.8 ? 'happy' : 'sparkle', squash: typing, look: t < 7 ? [0, 1] : [0, -1] })
    miniPhone(x, K, 370, 1460, -0.2 + typing, t < 7); miniPhone(x, K, 710, 1460, 0.2 - typing, t < 7)
    if (t > 17.0) K.pisces(x, t, { x: 230, y: 1280, size: 210, pop: K.pop01(t, 17.0, 0.35), look: [1, 0.3] })
  },
  over(x, t, K) {
    // the drafts, flipping on a big phone
    if (t > 2.8 && t < 7.2) {
      const k = K.inOut(t, 2.8, 7.2), i = Math.min(DRAFTS.length - 1, Math.floor((t - 3.0) / 0.68))
      const n = Math.min(17, 1 + Math.floor((t - 2.8) * 3.9))
      K.phone(x, t, { X: 540, Y: 1020, w: 600, h: 640, pop: k, title: 'to: them', time: '1:12', bubbles: [{ side: 'R', text: DRAFTS[Math.max(0, i)], size: 34 }] })
      if (k > 0.5) K.label(x, `DRAFT ${n} / 17`, 540, 650, { size: 40, bg: n >= 17 ? '#ff8a8a' : '#f2c75c', rot: -0.04, pop: k })
    }
    // draft eighteen
    if (t > 19.9) {
      const k = K.pop01(t, 19.9, 0.3)
      K.phone(x, t, { X: 830, Y: 1150, w: 300, h: 360, rot: 0.08, pop: k, title: 'DRAFT 18', time: '1:40', bubbles: [{ side: 'R', text: "I'm good.", size: 30 }] })
    }
  },
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(3.0 + i * 0.68).toFixed(2), 0.05]),
    ...Array.from({ length: 6 }, (_, i) => ['pop', +(3.02 + i * 0.68).toFixed(2), 783.99 + i * 60, 0.025, 0.2]),
    ['tom', 6.95, 80, { gain: 0.2, decay: 0.3 }], ['pop', 19.9, 1046.5, 0.04, 0.3], ['glitter', 19.95, 20.8],
  ],
  music: { style: 'pop', key: 'G', seed: 10303, sections: { lift: [7.3], breakdown: [13.9] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
