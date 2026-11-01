// trhearearly: HEAR ME OUT, "They show up five minutes early." (20 s vertical, Star Talk Trends §15.5, music: cinematic · Bb)
// Story 0–15.6, then the shared end card. The format look and timing live in ./hear.js (identical in all five episodes).
//   0.0–3.7   "Hear me *out.*"  The curtains open; ♑ Capricorn pops up behind the podium, taps the mic: tap, tap, EEEEEE.
//             The front row (♌ ♉ ♒ + ♓) flinches. Sticker: "an *unpopular* crush opinion:".
//   3.9–7.4   "They show up | *five minutes early.*"  On the drop the screen unrolls on a big clock at 6:55; the caption
//             types on: DATE: 7:00. THEM: 6:55. Front row: "?", "…" (Taurus's eye-roll), "?".
//   7.5–11.0  "Okay. *Listen.*"  REASON 1 date at 7. they're here at *6:55.* · REASON 2 they used it to get *the good
//             table.* · REASON 3 and texted me: "*no rush* :)"  The row comes round one by one; the needle climbs.
//  11.2       card cut.
//  11.3–13.4 "Calm. Kind. *Early.*"  ♑ CAPRICORN: "early says: *I couldn't wait to see you.*"
//  13.45–15.5 "*On time* is a | love language."  The clock ticks to 7:00 on the hit (ding); the needle pins past SWOON;
//             Taurus faints; Pisces fountains; and ♐ Sagittarius bursts in stage left, late, sweating: "sorry!!"
import { prog, ease } from '../../../src/lib.js'
import { makeEpisode, R, INK, GOLD, BONE, INTER, MONO, pop01, r3 } from './hear.js'

const EP = makeEpisode({
  id: 'trhearearly', key: 'Bb', seed: 1505,
  hero: { sign: 'capricorn', lineColor: '#e9d8a6' },
  crowd: ['leo', 'taurus', 'aquarius'],
  guest: { sign: 'sagittarius', at: 13.6 },
  h1: 'They show up | *five minutes early.*', h1Accent: '#9fd8ff', h1Late: 3,
  h3: 'Calm. Kind. *Early.*', h3Accent: '#9fd8ff',
  last: '*On time* is a | love language.', lastAccent: '#9fd8ff', lastLate: 2,
  screen: { bits: ['.'], cols: {}, cell: 1, caption: 'DATE: 7:00. THEM: 6:55.', capColor: '#9fd8ff' },
  stickers: ['date at 7. they’re here at *6:55.*', 'they used it to get *the good table.*', 'and texted me: “*no rush* :)”'],
  line: { who: 'hero', text: 'early says: I couldn’t *wait to see you.*' },
  fainter: 1,
  guestMoods(t, T) { return { mood: 'wide', look: [1, -1] } },
  screenDraw(x, t, T, ctx, S) {
    const pk = pop01(t, T.land - 0.1, 0.35, 2.2)
    if (pk <= 0.01) return
    const cx = S.cx, cy = S.cy + 4, r = 92 * pk
    // pixel clock face
    x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 12, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#9fd8ff'; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fffdf7'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, i % 3 ? '#b7ab9a' : INK, cx + Math.sin(a) * r * 0.82 - 5, cy - Math.cos(a) * r * 0.82 - 5, 10, 10) }
    // 6:55 → 7:00 on the hit
    const m = 55 + 5 * ease.outBack(prog(t, T.lastLand - 0.05, T.lastLand + 0.2))
    const ma = m / 60 * Math.PI * 2, ha = (6 + m / 60) / 12 * Math.PI * 2
    const hand = (a, L, w, c) => { x.save(); x.translate(cx, cy); x.rotate(a); R(x, INK, -w / 2 - 3, -L - 3, w + 6, L + 6); R(x, c, -w / 2, -L, w, L); x.restore() }
    hand(ha, r * 0.5, 12, INK); hand(ma, r * 0.78, 8, '#ff6b7a')
    R(x, GOLD, cx - 8, cy - 8, 16, 16)
    // the little bell-ring wiggles + "7:00" ding
    if (t > T.lastLand) {
      const k = pop01(t, T.lastLand + 0.05, 0.3, 2.6)
      x.save(); x.translate(cx + 190, cy - 50); x.scale(k, k)
      x.font = `800 44px ${INTER}`; x.fillStyle = '#ff6b7a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ding!', 0, 0)
      x.restore()
    }
  },
  front(x, t, T, ctx) {
    // Sagittarius, late: sweat drops + "sorry!!"
    if (!ctx.guest || t < T.guestIn + 0.2) return
    const G = ctx.guest
    for (let i = 0; i < 3; i++) {
      const ph = (t * 1.6 + i / 3) % 1
      x.globalAlpha = 1 - ph
      R(x, INK, G.x + 70 + i * 16 - 2, G.F.cy - 80 + ph * 40 - 2, 12, 16); R(x, '#8fe3ff', G.x + 70 + i * 16, G.F.cy - 80 + ph * 40, 8, 12)
      x.globalAlpha = 1
    }
    const k = pop01(t, T.guestIn + 0.35, 0.25, 2.6)
    if (k > 0.01) {
      x.save(); x.translate(G.x + 40, G.F.cy - 150); x.scale(k, k)
      x.font = `800 34px ${INTER}`
      const w = x.measureText('sorry!!').width + 30
      R(x, INK, -w / 2 - 5, -30, w + 10, 60); R(x, BONE, -w / 2, -25, w, 50)
      R(x, INK, -6, 30, 12, 10); R(x, BONE, -3, 25, 6, 8)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('sorry!!', 0, 2)
      x.restore()
    }
    void MONO
  },
  cues: T => [
    ['bell', r3(T.lastLand + 0.05), 1760, 0.035, 1.2, 0.3], ['bell', r3(T.lastLand + 0.2), 2349.32, 0.025, 1.0, 0.3],
    ...[0, 1, 2, 3].map(i => ['tick', r3(T.guestIn + i * 0.09), 0.035]), ['pop', r3(T.guestIn + 0.35), 1318.51, 0.04, -0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
