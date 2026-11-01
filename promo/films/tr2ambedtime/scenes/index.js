// tr2ambedtime (20 s vertical, Star Talk Trends · ME AT 2 PM vs ME AT 2 AM · 4) "Worth it." · synthwave Ebm.
// The format's shared look lives in ./tam.js (identical in all five tr2am films). Story 0–15.6, then the end card.
//   2 PM   "My sacred | *bedtime.*"  A sunny room. ♉ TAURUS hugs a pillow, sleep mask on its forehead: "In bed by 10. |
//          Non-negotiable." A sticker slaps on: BEDTIME: 10:00 PM SHARP.
//   2 AM   "2 AM: | still *talking.*"  The same star in bed, phone to its ear, mask still on its forehead. A call card:
//          ♊ on the line, the call timer racing. Three stickers as the clock ticks: TOPIC #9: BEST CLOUD · SNORT-LAUGHED
//          (TWICE) · the twist: GOODNIGHT #6 (FAKE) ("goodnight!! …wait, also"). Up top the 2 PM self gapes, sweats,
//          and falls asleep standing up.
//   TURN   a hush… "ok. goodnight. for real." The window turns to dawn; the clock jumps to 7:00 AM.
//   card cut.  The stitch opens: a sunrise room, the alarm rings, the star wakes with eye bags… and grins at a
//          "good morning :)" text. ♓ Pisces on the shelf, happy-sobbing. "Morning. | *Still* smiling."
//          Box (2 AM TAURUS): "zero sleep. *zero regrets.*"
//   LAST   "*Worth* it."  A neon sign flickers on: WORTH EVERY YAWN.
import { makeTAM, BEAT, r3, INK, BONE, GOLD, PINK, HOT, NEON, CYAN, INTER, MONO, clamp, lerp, prog, ease } from './tam.js'

const G = [BEAT(9), BEAT(11), BEAT(13)]
const ME_AM = { x: 250, y: 1372, s: 180 }, ME_PM = { x: 290, y: 862, s: 184 }
const T2 = { gn: BEAT(15) - 0.2, dawn: BEAT(15) + 0.35, ring: BEAT(18), text: BEAT(20) }   // 8.733 · 9.283 · 10.6 · 11.711
const CALL = { x: 330, y: 1140 }
const MASK = (x, up) => { x.fillStyle = INK; x.fillRect(7.5, 13.2 - up, 21, 5.4); x.fillStyle = '#ff8fb1'; x.fillRect(8.2, 13.9 - up, 19.6, 4); x.fillStyle = '#ffd0e0'; x.fillRect(10, 14.6 - up, 5, 1.2); x.fillRect(21, 14.6 - up, 5, 1.2) }
const BAGS = x => { x.fillStyle = 'rgba(90,60,140,0.85)'; x.fillRect(10.2, 22.4, 6, 1.1); x.fillRect(19.8, 22.4, 6, 1.1) }
const PILLOW = ['.WWWWWWWWW.', 'WWwwwwwwwWW', 'WwwwwwwwwwW', 'WWwwwwwwwWW', '.WWWWWWWWW.']
const ALARM = ['b.......b', '.bRRRRRb.', 'RRWWWWWRR', 'RWWWkWWWR', 'RWWWkWWWR', 'RWWWkkWWR', 'RRWWWWWRR', '.RRRRRRR.', '.R.....R.']

const callLine = t => t < G[0] ? 'ok one more thing—' : t < G[1] ? 'which cloud is the best cloud?' : t < G[2] ? 'HA— *snort*' : t < T2.gn ? 'goodnight!! …wait, also' : 'ok. goodnight. for real.'
function timer(t) {
  const s = Math.floor(3 * 3600 + 12 * 60 + Math.max(0, t - 4.6) * 290)
  const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, ss = s % 60
  return `${h}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}

const TAM = makeTAM({
  id: 'tr2ambedtime', sign: 'taurus',
  heads: {
    topic: 'My sacred | *bedtime.*',
    spiral: '2 AM: | still *talking.*',
    turn: 'Morning. | *Still* smiling.',
    last: '*Worth* it.',
  },
  accents: { topic: '#9fe6b0', spiral: NEON, turn: '#ffd25a', last: '#ffb86b' },
  stickers: [{ text: 'TOPIC #9: BEST CLOUD', x: 800 }, { text: 'SNORT-LAUGHED (TWICE)', x: 790 }, { text: 'GOODNIGHT #6 (FAKE)', x: 800 }],
  clock: { am: t => t < G[0] ? '2:00 AM' : t < G[1] ? '2:17 AM' : t < G[2] ? '2:38 AM' : t < T2.dawn + 0.7 ? '2:59 AM' : '7:00 AM' },
  amLabel: t => t < T2.dawn + 0.7 ? '2 AM' : '7 AM',
  dawnAt: T2.dawn,
  lampOn: t => t < T2.dawn ? 0.5 : 0,
  neon: 'WORTH EVERY YAWN', neonColor: '#ffb86b', neonAt: { y: 1040 },
  line: { who: 'me', text: 'zero sleep. *zero regrets.*' },

  pmScene(x, t, W) {
    const { T } = W
    let mood = 'happy', look, sweat = false, sq = 0
    if (t > T.AMin[1] + 0.2) { mood = 'neutral'; look = [0.3, 1] }
    if (t > G[0]) { mood = 'wide'; look = [0.2, 1] }
    if (t > G[1]) sweat = true
    if (t > G[2] + 0.2) { mood = 'sleepy'; look = undefined; sweat = false; sq = 0.05 }
    if (t > T2.dawn) { mood = 'sleepy' }
    const tilt = ease.inOutCubic(prog(t, G[2] + 0.2, G[2] + 0.7)) * 0.18
    x.save(); x.translate(ME_PM.x, ME_PM.y + 90); x.rotate(tilt); x.translate(-ME_PM.x, -ME_PM.y - 90)
    W.me(ME_PM.x, ME_PM.y, ME_PM.s, { mood, look, sweat, seed: 3, squash: sq, pop: W.pop01(t, T.pmIn, 0.35, 2), hops: [T.pmIn + 0.3, T.pmSay - 0.1, T.pmGag + 0.05, G[0] + 0.02],
      prop: () => MASK(x, 3) })
    x.restore()
    W.bits(PILLOW, { W: '#d8d0f0', w: '#fffaf0' }, ME_PM.x + 112, ME_PM.y + 34, 12, { rot: -0.25 + tilt, alpha: clamp(W.pop01(t, T.pmIn, 0.35, 2)) })
    W.bubble(t, 350, 640, T.pmSay, 'In bed by 10.|Non-negotiable.', { t1: T.h0Out[1] + 2.2, size: 38, tx: ME_PM.x + 20, ty: ME_PM.y - 90 })
    const k = W.pop01(t, T.pmGag, 0.3, 2.6)
    if (k > 0.01) {
      x.save(); x.translate(760, 800); x.rotate(-0.05); x.scale(k, k)
      x.font = `800 28px ${INTER}`; const s = 'BEDTIME: 10:00 PM SHARP', w = x.measureText(s).width + 34
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -28, w + 8, 56); x.fillStyle = '#fffaf0'; x.fillRect(-w / 2, -24, w, 48)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore()
    }
  },

  amScene(x, t, W) {
    const { T } = W
    // ♓ Pisces on the shelf (revealed with the room), happy-sobbing at the good-morning text
    W.pisces(880, 868, 130, t > T2.text ? 3 : 2, 'happy', { look: [-1, 0.6], hops: [T.open[1] + 0.05, T2.text + 0.1, T.neon + 0.3] })
    // the alarm clock on the nightstand (rings at 7:00)
    const ring = t > T2.ring && t < T2.ring + 1.2
    W.bits(ALARM, { b: '#c9cfdc', R: '#ff5a6e', W: '#fffaf0', k: INK }, 860 + (ring ? 4 * Math.sin(t * 80) : 0), 1360, 6)
    if (ring) W.txt('RIIING', 880, 1290 - 6 * Math.sin(t * 30), { size: 30, font: INTER, weight: 800, color: '#ffd25a', rot: -0.1 })
    // the 2 AM self in bed, phone to the ear
    const asleep = t > T2.dawn - 0.1 && t < T2.ring
    let mood = 'happy', look, tears = 0, bags = t > T2.ring
    if (t > G[0]) { mood = 'sparkle'; look = [1, -0.5] }
    if (t > G[1]) { mood = 'happy'; look = undefined }
    if (t > G[2]) { mood = 'wink' }
    if (t > T2.gn) { mood = 'happy' }
    if (asleep) mood = 'sleepy'
    if (t > T2.ring) { mood = 'wide'; look = [1, 0] }
    if (t > T2.ring + 0.6) { mood = 'squint'; look = [1, 0.4] }
    if (t > T2.text + 0.15) { mood = 'heart'; look = undefined }
    const laugh = t > G[1] && t < G[1] + 0.9
    const F = W.me(ME_AM.x, ME_AM.y, ME_AM.s, { mood, look, tears, seed: 3, zzz: asleep, pop: W.pop01(t, T.amIn, 0.35, 2),
      hops: [T.amIn + 0.3, G[0] + 0.05, ...[0, 0.25, 0.5].map(d => r3(G[1] + d)), G[2] + 0.05, T2.ring + 0.02, T2.ring + 0.3, T2.text + 0.15, T.neon + 0.3],
      squash: laugh ? 0.07 * Math.sin((t - G[1]) * 30) : 0,
      prop: () => { MASK(x, 3); if (bags) BAGS(x) } })
    // the phone: at the ear on the call, on the pillow once asleep, in hand for the morning text
    const ear = t < T2.dawn
    const px = ear ? F.ox + 92 : ME_AM.x + 130, py = ear ? F.oy - 92 : ME_AM.y + 30
    W.phone(px + (t > T2.text && t < T2.text + 0.4 ? 5 * Math.sin(t * 90) : 0), py, ear ? 46 : 64, ear ? 82 : 104, { rot: ear ? 0.3 : -0.25, glow: t > T.amIn && (ear || t > T2.text) ? 0.8 : 0 })
    W.blanket(t, '#3f8a6a', '#6ac09a', 1438)
    // the good-morning text
    W.bubble(t, 470, 1240, T2.text, 'good morning :)', { size: 34, col: '#e8f6ff', tx: ME_AM.x + 130, ty: ME_AM.y - 10, t1: T.h3 + 0.4 })
    // the call card (the voice on the line), with a racing call timer
    const ck = W.pop01(t, T.amSay - 0.1, 0.3, 2.2) * W.outK(t, [T2.dawn - 0.1, T2.dawn + 0.2])
    if (ck > 0.01) {
      x.save(); x.translate(CALL.x, CALL.y); x.scale(ck, ck)
      const w = 470, h = 150
      x.fillStyle = 'rgba(4,2,12,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
      x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
      x.fillStyle = '#e8ecff'; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = '#5a6ad0'; x.fillRect(-w / 2, -h / 2, w, 40)
      x.font = `700 22px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('ON CALL', -w / 2 + 92, -h / 2 + 21)
      x.textAlign = 'right'; x.fillText(timer(t), w / 2 - 14, -h / 2 + 21)
      // ♊ the caller (a tiny star avatar)
      x.restore()
      W.star('gemini', CALL.x - w / 2 * ck + 48 * ck, CALL.y - 30 * ck, 70 * ck, { mood: t > G[1] && t < G[1] + 0.9 ? 'happy' : 'sparkle', glyph: null, seed: 8 })
      x.save(); x.translate(CALL.x, CALL.y); x.scale(ck, ck)
      x.font = `800 27px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(callLine(t), 26, 30)
      x.restore()
    }
  },

  cues(T) {
    return [
      // the 2 PM sticker
      ['tick', r3(T.pmGag), 0.05],
      // the call: a soft ring when the card pops, the snort, the fake goodnight
      ['pluck', r3(T.amSay - 0.05), 1318.51, 0.025, 0.3, -0.2], ['pluck', r3(T.amSay + 0.1), 1318.51, 0.025, 0.3, -0.2],
      ['pop', r3(G[1] + 0.1), 330, 0.04, -0.2], ['pop', r3(G[1] + 0.35), 311.13, 0.035, -0.2],
      // the 2 PM self falls asleep standing (a slide down)
      ['pluck', r3(G[2] + 0.25), 523.25, 0.025, 0.5, -0.4], ['pluck', r3(G[2] + 0.45), 440, 0.025, 0.6, -0.4],
      // goodnight for real → dawn
      ['bell', r3(T2.gn + 0.05), 1174.66, 0.025, 1.2, 0], ['riser', r3(T2.dawn), r3(T2.dawn + 1.2), 0.02],
      // the alarm RIIING
      ...Array.from({ length: 10 }, (_, i) => ['pluck', r3(T2.ring + i * 0.1), i % 2 ? 2093 : 2349.32, 0.018, 0.08, 0.4]),
      // the good-morning text
      ...[0, 0.09, 0.18].map(d => ['tick', r3(T2.text + d), 0.045]), ['pop', r3(T2.text + 0.05), 1318.51, 0.045, 0.1], ['pop', r3(T2.text + 0.12), 1760, 0.03, 0.1],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TAM
