// kbne06: BREAKING NEWS: THE STARS, Ep 6 · "Cancer archived the old chat" (16 s vertical, star_talk post, music: dreamy · Db).
// No end card, no card cut: the last 0.4 s blends back into frame 0 (kit loopBack). Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor is a 2 a.m. window shot: ♋ Cancer mid-scroll, the
//        old chat glowing. Hook: "BREAKING: Cancer archived | *the old chat.*"
//   1.30 cut: the phone. The old chat scrolls by (MAR 14 "goodnight :)"…). Record scratch at 2.2: "the 2 a.m. *scroll.*"
//   4.10 the thumb finds ARCHIVE; the chat slides into a little box: ARCHIVED · NOT DELETED.
//   5.50 cut: LIVE outside Cancer's window. ♎ Libra reports softly: "the memories are safe. so are *they.*"
//   8.60 a notification drops: "breakfast tmrw? *my treat*". Cancer smiles and types "yes."
//  11.00 cut: the desk. ♓ Pisces cries into a mug, in solidarity: "that's *growth* and I can't."
//  13.40 last headline: "Archive isn't | *erase.*"  15.6–16.0 loops back to frame 0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, phone, street, windowFrame, caught, bubble, chip, txt, px, mic,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, CYAN,
} from '../../kbne01/newskit.js'
import { notification, notificationCues } from '../../hookkit.js'

const D = 16
const T = { slam: 0.15, cut1: 1.3, rec: 2.2, press: 2.9, cut2: 5.5, note: 8.6, yes: 9.9, cut3: 11.0, sob: 11.3, last: 13.4 }
const CUTS = [T.cut1, T.cut2, T.cut3]
const REC = { at: T.rec, len: 1.2, caption: 'the 2 a.m. *scroll.*', top: 1180 }
const NOTE = { at: T.note, out: [10.7, 10.95], title: 'messages · bestie', body: 'breakfast tmrw? *my treat*', glyph: '♌', color: '#f39a3a', time: '2:09 AM', y: 140 }
const S = 'THE STARS', LI = '♎︎ LIBRA · LIVE', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.6, speaker: S + ' · V.O.', text: '2:07 a.m. the old chat. *again.*' },
  { t: 5.8, speaker: LI, color: '#f6b3d8', text: '(softly) the memories are safe. so are *they.*' },
  { t: 11.3, speaker: PI, color: '#8fd0ff', text: 'that’s *growth* and I can’t.' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'phone' : t < T.cut3 ? 'window' : 'desk2'
const OLD = [
  { at: -9, side: 'L', text: 'goodnight :)', time: 'MAR 14' },
  { at: -9, side: 'R', text: 'night!! talk tmrw', time: 'MAR 14' },
  { at: -9, side: 'L', text: 'thinking of you', time: 'APR 2' },
  { at: -9, side: 'R', text: 'same', time: 'APR 2' },
  { at: -9, side: 'L', text: 'I think we want different things', time: 'JUN 9' },
]

function cancerRoom(x, t, R, phoneGlow = 1) {
  room(x, R, { top: '#1a1440', bot: '#120c30' })
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(R.x0 + (R.x1 - R.x0) * 0.55, R.y0 + (R.y1 - R.y0) * 0.6, 10, R.x0 + (R.x1 - R.x0) * 0.55, R.y0 + (R.y1 - R.y0) * 0.6, (R.x1 - R.x0) * 0.6)
  g.addColorStop(0, `rgba(120,170,255,${0.28 * phoneGlow})`); g.addColorStop(1, 'rgba(120,170,255,0)'); x.fillStyle = g; x.fillRect(R.x0, R.y0, R.x1 - R.x0, R.y1 - R.y0); x.restore()
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne06', duration: D, end: 'loop',
  heads: [
    { text: 'BREAKING: Cancer archived | *the old chat.*', at: -1, out: [5.3, 5.5], accent: '#c9e6ff' },
    { text: 'LIVE: a quiet | *window.*', at: T.cut2 + 0.05, out: [8.4, 8.6], accent: '#f6b3d8' },
    { text: 'Co-anchor: | *hydrating.*', at: T.cut3 + 0.05, out: [13.2, 13.4], accent: '#8fd0ff' },
    { text: 'Archive isn’t | *erase.*', at: T.last, gap: 0.08, accent: GOLD, size: 108, accentSize: 156 },
  ],
  lines: LINES, box: { open: 1.4, close: 15.5 },
  cuts: CUTS, recs: [REC], fx: [notification(NOTE)], fxCues: notificationCues(NOTE),
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          cancerRoom(xx, tt, M, fin ? 0.3 : 1)
          sign(xx, tt, 'cancer', { x: 500, y: 740, s: 170, mood: fin ? 'happy' : 'sleepy', look: [1, 0.6], seed: 12, zzz: false })
          if (!fin) { px(xx, 590, 660, 64, 110, INK); px(xx, 596, 666, 52, 98, '#7fb0ff'); for (let i = 0; i < 4; i++) px(xx, 602, 676 + ((i * 22 + tt * 120) % 88), 40, 8, 'rgba(255,255,255,0.6)') }
          chip(xx, 700, 600, '2:07 AM', { size: 20, color: CYAN })
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [11.5, 12.3, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 2, tissue: 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [11.3, 11.65, 12.0, 12.5, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut3 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'BREAKFAST CONFIRMED · CO-ANCHOR MOVED' : 'CANCER · OLD CHAT · ARCHIVED, NOT DELETED' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
      if (fin) { // Pisces's mug of tears
        const k = pop01(t, T.sob, 0.3, 2)
        px(x, 720, 1090, 70 * k, 64 * k, INK); px(x, 726, 1096, 58 * k, 52 * k, BONE); px(x, 730, 1100, 50 * k, 14 * k, '#8fe3ff')
      }
    } else if (sh === 'phone') {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const slide = ease.inCubic(prog(st, T.press + 0.15, T.press + 0.7))
      if (slide < 1) {
        x.save(); x.translate(lerp(0, 700, slide), lerp(0, 120, slide)); x.globalAlpha = 1 - slide
        phone(x, st, { cx: 540, cy: 900, w: 620, h: 760, s: 1 - 0.5 * slide, title: '♈︎ them (old)', msgs: OLD, font: 30 })
        x.restore()
      }
      // the ARCHIVE button and the thumb
      if (st < T.press + 0.15) {
        const u = ease.outCubic(prog(st, T.rec + 0.2, T.press))
        px(x, 760, 1080, 200, 70, INK); px(x, 766, 1086, 188, 58, '#3b3466'); txt(x, 'ARCHIVE', 860, 1116, { size: 26, weight: 800, font: INTER, shadow: false })
        const ty = lerp(1400, 1110, u)
        px(x, 820, ty, 92, 260, INK); px(x, 826, ty + 6, 80, 250, '#e9b48a'); px(x, 838, ty + 16, 56, 40, '#f6d0b0')
      }
      // the little archive box
      const bk = pop01(st, T.press + 0.55, 0.3, 2)
      if (bk > 0.01) {
        x.save(); x.translate(540, 900); x.scale(bk, bk)
        px(x, -130, -90, 260, 180, INK); px(x, -122, -82, 244, 164, '#c48a5a'); px(x, -140, -110, 280, 40, INK); px(x, -132, -104, 264, 28, '#d8a070'); px(x, -40, -40, 80, 20, INK)
        x.restore()
        chip(x, 540, 1100, 'ARCHIVED · NOT DELETED', { size: 28, color: GOLD, border: GOLD, k: bk })
        sign(x, st, 'cancer', { x: 860, y: 1250, s: 150, mood: 'happy', look: [-1, -1], seed: 12, hops: [T.press + 0.6] })
      }
      chyron(x, t, { t0: T.cut1, label: 'BREAKING', text: 'OLD CHAT · ARCHIVED · CANCER: OK' })
    } else {
      live(x, t, FULL, {
        place: 'OUTSIDE CANCER’S WINDOW', clock: t < T.note ? '2:08 AM' : '2:09 AM', draw: (xx, tt, R) => {
          street(xx, tt, R, { lit: 0.2, sky: '#0c0828' })
          windowFrame(xx, 720, 780, 340, 300, w => {
            const g = w.createLinearGradient(0, 630, 0, 930); g.addColorStop(0, '#2a3a7a'); g.addColorStop(1, '#1a2458'); w.fillStyle = g; w.fillRect(550, 630, 340, 300)
            sign(w, tt, 'cancer', { x: 720, y: 850, s: 170, mood: tt > T.note + 0.4 ? 'happy' : 'neutral', look: tt > T.note ? [0, 1] : [0, 0], seed: 12, hops: [T.note + 0.5, T.yes] })
          })
          bubble(xx, tt, 720, 590, T.yes, T.cut3 - 0.1, 'yes.', { size: 34, col: '#4f8df0', color: BONE })
          const F = sign(xx, tt, 'libra', { x: 300, y: 1110, s: 240, mood: tt > T.yes ? 'happy' : 'squint', look: [0, 0], seed: 17, hops: [6.0, 6.6, 7.2, T.yes + 0.1] })
          mic(xx, tt, F, { flag: 'STARS' })
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'REPORTER WHISPERING · CANCER OFFLINE SOON' })
    }
    ticker(x, t, { y: 1404, items: ['OLD CHAT: ARCHIVED', 'MEMORIES: SAFE', 'BREAKFAST: TOMORROW', 'BED: EVENTUALLY'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2),
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.cut1 + 0.15 + i * 0.12).toFixed(2), 0.02]),
    ['tick', T.press + 1.2, 0.06], popCue(T.press + 1.25, 880, 0.04, 0.2), ['whoosh', T.press + 1.35, 0.5, 0.04], popCue(T.press + 1.8, 1174.66, 0.045, 0), ['bell', T.press + 1.85, 1760, 0.025, 1.0, 0],
    popCue(T.yes, 1318.51, 0.04, 0.2),
    ...sobCues(T.sob, 3), ...sobCues(12.4, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
