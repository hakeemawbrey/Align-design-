// kine05: IS THIS NORMAL?, "My best friend got a partner" (19.6 s vertical, star_advice post, music: pop · G).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "Best friend's in love. | I'm… *happy?*" landed; ♌ Leo mid-wave at a brunch table for two, the
//              other chair empty; a heart balloon is floating away.
//   0.60       notification drop: "bestie: can't make brunch!! date ran late, sorry". Punch.
//   1.9–5.8    "Happy for them. | Also… *lonely.*"  Leo's big smile glitches; two plates, one fork. ♓ Pisces at the
//              next table cries into a napkin.
//   5.95–9.7   NORMAL-O-METER: NORMAL.
//   9.8–17.6   THE STARS: "you can be glad for them *and* miss them." → "say 'I miss you.' book a *standing* friend
//              night."  Leo texts "I miss you! friend night thursdays?" → "YES. every thursday." A calendar stamps FRIEND
//              NIGHT on every Thursday; Pisces happy-cries at the invite.
//  17.8–19.6   last line: "Glad for them, missing | them. *Both.*"  Hard cut.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, HEART, sparkles, hearts, bubble, label, shadow, glowAt,
  room, miniPhone, pop01, outK, prog, lerp, clamp, ease, r3, signStar,
} from '../../kine01/normalkit.js'

const D = 19.6, FLOOR = 1420
const AQU = signStar('aquarius')
const T = {
  notif: 0.6, h0Out: [1.75, 1.9], h1: 1.9, h1Out: [5.6, 5.8], glitch: 3.3, pisIn: 2.6,
  meter: 5.95, mOut: [9.55, 9.8],
  starsIn: 9.7, l1: 9.95, l2: 13.4, boxClose: 17.5, sms: 13.7, reply: 15.0, cal: 15.6,
  last: 17.8,
}
const NOTIF = { at: T.notif, out: [1.75, 1.95], title: 'texts', body: 'bestie: can’t make brunch!! date ran *late*, sorry', glyph: AQU.glyph, color: AQU.color, y: 640 }
const GLITCH = { at: T.glitch, len: 0.55, dialog: false, amp: 0.6 }

function brunch(x, t) {
  room(x, { y: FLOOR, wall: '#2a1f4a', floor: '#3a2a52' })
  // a sunny window
  box(x, 640, 470, 330, 300, '#2b4a7a', { b: 8 }); R(x, INK, 801, 470, 8, 300); glowAt(x, 805, 560, 180, '255,226,150', 0.3)
}
function chair(x, cx, empty) {
  box(x, cx - 70, 1020, 140, 210, '#8a6440', { b: 7, hi: '#a87a50' })
  R(x, INK, cx - 74, 1226, 148, 14); R(x, INK, cx - 66, 1240, 12, FLOOR - 1240); R(x, INK, cx + 54, 1240, 12, FLOOR - 1240)
  if (empty) label(x, 'saved.', cx, 1100, { size: 26, col: BONE, alpha: 0.7 })
}
function table(x, cx, cy, w) {
  box(x, cx - w / 2, cy, w, 30, BONE, { b: 8 }); R(x, '#f2c6d0', cx - w / 2, cy + 30, w, 40)
  R(x, INK, cx - 14, cy + 70, 28, FLOOR - cy - 70)
}
function plate(x, cx, cy, food) {
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 82, 24, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff'; x.beginPath(); x.ellipse(cx, cy - 2, 76, 20, 0, 0, Math.PI * 2); x.fill(); x.restore()
  if (food) drawBits(x, ['.PPPPP.', 'PPYPPYP', 'PPPPPPP'], { P: '#e9b24a', Y: '#fff1a8' }, cx, cy - 14, 9)
}
function balloon(x, t, cx, cy) {
  const sw = 10 * Math.sin(t * 2)
  x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(cx + sw, cy + 60); x.quadraticCurveTo(cx + 20, cy + 140, cx - 10 + sw, cy + 220); x.stroke()
  drawBits(x, HEART, { H: '#ff5c8a' }, cx + sw, cy, 18)
}
function calendar(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  box(x, -230, -170, 460, 340, BONE, { b: 8 }); R(x, RED, -230, -170, 460, 56)
  x.font = `800 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEXT MONTH', 0, -142)
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  x.font = `700 20px ${MONO}`; x.fillStyle = INK
  days.forEach((d, i) => x.fillText(d, -195 + i * 65, -92))
  for (let w = 0; w < 4; w++) for (let i = 0; i < 7; i++) {
    const X = -222 + i * 65, Y = -72 + w * 58
    x.strokeStyle = 'rgba(27,18,54,0.25)'; x.lineWidth = 2; x.strokeRect(X, Y, 60, 52)
    if (i === 3) {
      const st = T.cal + 0.15 + w * 0.22, sk = pop01(t, st, 0.2, 2.8)
      if (sk > 0.01) { x.save(); x.translate(X + 30, Y + 26); x.rotate(-0.2); x.scale(sk, sk); drawBits(x, HEART, { H: '#ff5c8a' }, 0, 0, 5); x.restore() }
    }
  }
  if (t > T.cal + 1.1) { x.save(); x.translate(110, 150); x.rotate(-0.1); x.scale(pop01(t, T.cal + 1.1, 0.25, 2.6), pop01(t, T.cal + 1.1, 0.25, 2.6)); box(x, -150, -26, 300, 52, MINT, { b: 6 }); x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.fillText('THURSDAYS = US', 0, 2); x.restore() }
  x.restore()
}

const EP = makeNormal({
  id: 'kine05', D, ending: 'cut', hero: 'leo',
  hook: { text: 'Best friend’s in love. | I’m… *happy?*', out: T.h0Out, accentColor: GOLD },
  fx: [[hook.notification, hook.notificationCues, NOTIF], [hook.glitch, hook.glitchCues, GLITCH]],
  heads: [{ text: 'Happy for them. | Also… *lonely.*', at: T.h1, out: T.h1Out, size: 96, accent: CYAN, late: 1, lateAt: T.h1 + 0.55 }],
  meter: { at: T.meter, land: 'normal', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: 'you can be glad for them *and* miss them.' },
    { t: T.l2, text: "say 'I miss you.' book a *standing* friend night." },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Glad for them, missing | them. *Both.*', at: T.last, lateAt: T.last + 0.55, accent: GOLD, size: 92 },
  punches: [T.notif + 0.1, T.h1, T.meter + 1.75, T.cal],
  shakes: [{ t: T.notif + 0.05, a: 10 }],
  scene(x, t, S) {
    if (t < T.meter) {
      brunch(x, t)
      chair(x, 790, true)
      const wave = t < T.notif + 0.1
      shadow(x, 300, FLOOR, 320)
      S.hero(x, t, { x: 300, y: 1110, s: 370, mood: wave ? 'happy' : t > T.glitch ? 'happy' : 'wide', look: wave ? [1, -0.2] : [0.6, 0.2], squash: wave ? 0.05 * Math.sin(t * 20) : 0, hops: [0.05, T.notif + 0.1, T.h1 + 0.3] })
      if (wave) { x.save(); x.translate(500, 880); x.rotate(0.4 * Math.sin(t * 16)); drawBits(x, ['.Y.Y.', 'YYYYY', 'YYYYY', '.YYY.'], { Y: '#f39a3a' }, 0, 0, 20); x.restore() }
      balloon(x, t, lerp(820, 900, t / 6), lerp(840, 520, ease.inQuad(clamp(t / 5))))
      table(x, 540, 1210, 760)
      plate(x, 380, 1210, true); plate(x, 700, 1210, true)
      if (t > T.h1) label(x, 'one fork. one sad croissant.', 700, 1300, { size: 22, col: BONE, alpha: pop01(t, T.h1 + 1.2, 0.3, 2) * outK(t, [T.meter - 0.2, T.meter]) })
      S.pis(x, t, { x: 930, y: 1590, s: 170, pop: pop01(t, T.pisIn, 0.35, 2.2), tears: 3, mood: 'wide', look: [-1, -0.6], tissues: 'left', say: [T.pisIn + 0.4, T.meter - 0.2, 'I miss my friend too'], sayDx: -150, saySize: 28 })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      brunch(x, t)
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      shadow(x, 300, FLOOR - 40, 300 * k)
      S.hero(x, t, { x: 280, y: 1100, s: 330, pop: k, mood: t > T.reply ? 'sparkle' : 'neutral', look: [1, -0.3], hops: [T.mOut[0] + 0.2, T.sms, T.reply, T.cal] })
      // the texts
      if (t < T.cal + 0.2) {
        const pk = pop01(t, T.sms - 0.3, 0.3, 2.2) * outK(t, [T.cal - 0.1, T.cal + 0.2])
        if (pk > 0.01) {
          x.save(); x.translate(720, 860); x.scale(pk, pk)
          box(x, -220, -200, 440, 400, '#120c2a', { b: 8 }); R(x, '#1f1747', -220, -200, 440, 64)
          x.font = `700 26px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${AQU.glyph}︎ bestie`, 0, -168)
          const bub = (txt, y, side, at) => { if (t < at) return; const kk = pop01(t, at, 0.22, 2.4); x.save(); x.translate(side * 60, y); x.scale(kk, kk); x.font = `600 26px ${INTER}`; const w = x.measureText(txt).width + 36; R(x, side > 0 ? '#4f8df0' : '#3b3466', -w / 2, -28, w, 56); x.fillStyle = BONE; x.fillText(txt, 0, 2); x.restore() }
          bub('I miss you!', -90, 1, T.sms)
          bub('friend night thursdays?', -20, 1, T.sms + 0.5)
          bub('YES. every thursday.', 70, -1, T.reply)
          bub('I miss you too!!', 140, -1, T.reply + 0.4)
          x.restore()
        }
      }
      calendar(x, t, 700, 880, pop01(t, T.cal, 0.35, 2.2))
      S.pis(x, t, { x: 880, y: 1300, s: 170, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.cal ? 3 : 2, mood: t > T.cal ? 'happy' : 'sparkle', look: [-1, -0.6], tissues: 'left', hops: [T.cal + 0.2, T.cal + 1.1, T.last + 0.5] })
      S.stars(x, t, { x: 560, y: 1280, s: 140, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.reply ? 'happy' : 'neutral', look: [-1, -0.3] })
      if (t > T.reply) hearts(x, t, T.reply, 300, 900, { n: 5 })
    }
  },
  cues: [
    ['pop', 0.05, 1318.51, 0.03, -0.3], ['pop', 0.15, 1567.98, 0.025, -0.3],
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, 0.4],
    ['pop', T.sms, 1318.51, 0.04, 0.3], ['pop', T.sms + 0.5, 1567.98, 0.035, 0.3],
    ['pop', T.reply, 1174.66, 0.045, -0.3], ['pop', T.reply + 0.4, 1318.51, 0.04, -0.3],
    ['whoosh', T.cal - 0.05, 0.3, 0.04], ...[0, 1, 2, 3].map(w => ['pop', r3(T.cal + 0.15 + w * 0.22), 880 + w * 110, 0.04, 0.2]),
    ['tom', T.cal + 1.1, 110, { gain: 0.18, decay: 0.2 }], ['bell', T.cal + 1.15, 1760, 0.03, 1.2, 0], ['glitter', T.cal + 1.1, T.cal + 1.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, sparkles, bubble, miniPhone]
