// trhearhate: HEAR ME OUT, "They hate the same song." (20 s vertical, Star Talk Trends §15.4, music: cinematic · Ab)
// Story 0–15.6, then the shared end card. The format look and timing live in ./hear.js (identical in all five episodes).
//   0.0–3.7   "Hear me *out.*"  The curtains open; ♏ Scorpio pops up behind the podium, taps the mic: tap, tap, EEEEEE.
//             The front row (♈ ♍ ♐ + ♓) flinches. Sticker: "an *unpopular* crush opinion:".
//   3.9–7.4   "They hate | *the same song.*"  On the drop the screen unrolls on a boombox and a made-up song title,
//             “Wiggle Wiggle (Extended Mix)”, which gets a big red NO sign. Front row: "?", "…" (Virgo's eye-roll), "?".
//   7.5–11.0  "Okay. *Listen.*"  REASON 1 it came on at a *party.* · REASON 2 we made *eye contact.*
//             · REASON 3 we groaned. *same pitch.*  The row comes round one by one; the needle climbs.
//  11.2       card cut.
//  11.3–13.4 "Oh no. It's *on.*"  The boombox starts bouncing: the song is playing again. ♐ SAGITTARIUS: "ugh. not *this*
//             song again." The whole front row AND Scorpio groan "UGH" at the same moment.
//  13.45–15.5 "*United.*"  The needle pins past SWOON; Virgo faints; Pisces fountains.
import { prog } from '../../../src/lib.js'
import { makeEpisode, R, INK, INTER, drawBits, pop01, r3 } from './hear.js'

const BOOM = [
  '....HHHHHHHHHHHH....',
  '...H............H...',
  'BBBBBBBBBBBBBBBBBBBB',
  'BkkkkkBBDDDDBBkkkkkB',
  'BkgggkBBDyyDBBkgggkB',
  'BkgGgkBBDDDDBBkgGgkB',
  'BkgggkBBBBBBBBkgggkB',
  'BkkkkkBBrBrBrBkkkkkB',
  'BBBBBBBBBBBBBBBBBBBB',
]
const BOOM_COLS = { H: '#5b5670', B: '#7f6fd6', k: '#2a2440', g: '#5b5670', G: '#cfc6b4', D: '#2a2440', y: '#9fe6b0', r: '#ff6b7a' }
const NOTE_BITS = ['..NN', '..NN', '..N.', '..N.', 'NNN.', 'NNN.']

function ugh(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const w = 108, h = 58
  R(x, INK, -w / 2 - 5, -h / 2, w + 10, h); R(x, INK, -w / 2, -h / 2 - 5, w, h + 10)
  R(x, '#c9f0a8', -w / 2, -h / 2, w, h)
  R(x, INK, -6, h / 2 + 4, 12, 10); R(x, '#c9f0a8', -3, h / 2, 6, 8)
  x.font = `800 38px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('UGH', 0, 3)
  x.restore()
}

const EP = makeEpisode({
  id: 'trhearhate', key: 'Ab', seed: 1504,
  hero: { sign: 'scorpio', lineColor: '#ff9fb8' },
  crowd: ['aries', 'virgo', 'sagittarius'],
  h1: 'They hate | *the same song.*', h1Accent: '#c9f0a8', h1Late: 3,
  h3: 'Oh no. It’s *on.*', h3Accent: '#ff6b7a',
  last: '*United.*', lastAccent: '#c9f0a8',
  screen: { bits: ['.'], cols: {}, cell: 1, caption: 'WE HATE THE SAME SONG.', capColor: '#c9f0a8' },
  stickers: ['it came on at a *party.*', 'we made *eye contact.*', 'we groaned. *same pitch.*'],
  line: { who: 2, text: 'ugh. not *this* song again.' },
  crowdLineColor: '#ffb27a',
  fainter: 1,
  moods(ph, t, T) {
    if (ph === 'twist' && t < T.line + 0.15) return { mood: 'wide', look: [0, -1] }
    if (ph === 'twist' && t < T.lineDone + 0.35) return { mood: 'squint', squash: 0.05 }
    return null
  },
  crowdMoods(i, ph, t, T) {
    if (ph === 'twist' && t < T.line + 0.15) return { mood: 'wide', look: [0, -1] }
    if (ph === 'twist' && t < T.lineDone + 0.35) return { mood: 'squint', bubble: null }
    return null
  },
  screenDraw(x, t, T, ctx, S) {
    const pk = pop01(t, T.land - 0.1, 0.35, 2.2)
    if (pk <= 0.01) return
    const playing = t > T.cut && t < T.lineDone + 0.4
    const b = playing ? Math.abs(Math.sin((t - T.cut) * Math.PI * 108 / 60)) : 0
    const cx = S.cx, cy = S.cy + 18
    // the song title (made up)
    x.font = `italic 700 28px ${INTER}`; x.fillStyle = '#5b5246'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.globalAlpha = pk > 1 ? 1 : pk; x.fillText('♪ “Wiggle Wiggle (Extended Mix)”', cx, S.y0 + 38); x.globalAlpha = 1
    drawBits(x, BOOM, BOOM_COLS, cx, cy, 11 * pk, { sx: 1 + 0.06 * b, sy: 1 - 0.05 * b })
    // notes float out while it plays
    if (playing) for (let i = 0; i < 6; i++) {
      const ph = ((t - T.cut) * 0.7 + i / 6) % 1, d = i % 2 ? 1 : -1
      drawBits(x, NOTE_BITS, { N: i % 3 ? '#7f6fd6' : '#ff6b7a' }, cx + d * (130 + ph * 150), cy - 10 - ph * 70 + Math.sin(ph * 9) * 8, 4.5, { alpha: Math.sin(Math.PI * ph) })
    }
    // the NO sign (circle + slash) slams on after the reveal, and fades while the case is made
    const nk = pop01(t, T.land + 0.55, 0.3, 2.8) * (1 - 0.6 * prog(t, T.h2, T.h2 + 0.4))
    if (nk > 0.01) {
      x.save(); x.translate(cx, cy); x.scale(nk, nk); x.globalAlpha = Math.min(1, nk)
      x.strokeStyle = '#e8364f'; x.lineWidth = 16
      x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.stroke()
      x.beginPath(); x.moveTo(-80, -80); x.lineTo(80, 80); x.stroke()
      x.restore()
    }
  },
  front(x, t, T, ctx) {
    // everyone groans at once: UGH bubbles over the whole front row and Scorpio
    const a = r3(T.lineDone - 0.35), b = r3(T.lineDone + 0.35)
    if (t < a || t > b + 0.2) return
    const k = t < b ? pop01(t, a, 0.2, 2.8) : 1 - prog(t, b, b + 0.2)
    ctx.crowd.forEach((C, i) => { if (C) ugh(x, C.x + (i < 2 ? 40 : -40), C.y - 0.82 * C.s, k) })
    if (ctx.hero) ugh(x, ctx.hero.x - 150, ctx.hero.F.cy - 70, k)
  },
  cues: T => {
    // the made-up song: a cheesy little loop while it plays again
    const mel = [784, 784, 659, 784, 880, 784, 659, 523]
    const out = []
    for (let n = 0, tt = T.cut + 0.05; tt < T.lineDone + 0.3; n++, tt += 60 / 108 / 2) out.push(['pluck', r3(tt), mel[n % 8], 0.03, 0.25, (n % 2 ? 0.3 : -0.3)])
    out.push(['tom', r3(T.lineDone - 0.35), 110, { gain: 0.18, decay: 0.3 }], ['pop', r3(T.lineDone - 0.35), 196, 0.05, 0])
    out.push(['pop', r3(T.land + 0.55), 330, 0.05, 0], ['tick', r3(T.land + 0.56), 0.05])
    return out
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
