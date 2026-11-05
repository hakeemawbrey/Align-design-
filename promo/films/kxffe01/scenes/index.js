// kxffe01 · Friends First: Extended, ep 1 · "The Friend You Drifted From" (60 s vertical, star_advice post, lofi · F)
// No end card, no card transition. Hard cut on the punchline. The look lives in ../../kxase01/xkit.js (Friends First
// look: the orange FRIENDS FIRST bug, the sets, the CHECK-IN card).
//   0.00   frame 0: ♍ Virgo mid-tumble off a step-stool, an old dusty friendship photo mid-flight (dust puffs).
//          Slam title "We haven't talked in a *year.*"  0.8 record scratch "found the photo. | *felt* everything."
//   2.2    promise "the *hard part* is at the end"
//   3.0    1 · THE SITUATION  the chat: the last message is from last winter. "no fight. we just… *drifted.*"
//  12.5    2 · THE URGE  draft "wow, so you just forgot me?" — struck. THE STARS: "lead with *warmth.*"
//  21.5    3 · THE CHECK-IN  the card "hey, I miss you. | *no pressure to catch up on everything.*" → an incoming call.
//  37.0    4 · THE HARD PART  "I was hurt when we stopped *talking.*" ♐ Sagittarius: "I'm sorry I went *quiet.*"
//  48.5    5 · AFTER  "same time next *month?*" both calendars; a new photo on the shelf.
//  58.2    last line "Drifted. | *Rowed* back."
import {
  makeX, say, stars, star, box, R, label, hearts, sparkles, phoneSmall, bigPhone,
  signStar, INK, BONE, GOLD, PINK, RED, MINT, MONO, INTER, prog, ease, clamp, lerp, pop01, outK, inR,
} from '../../kxase01/xkit.js'

const VIR = 'virgo', SAG = 'sagittarius'
const VC = '#d6f0b0', SAGC = signStar(SAG)

function photo(x, t, cx, cy, s, rot, { dusty = true, fresh = false } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -110, -80, 220, 160, fresh ? '#ffb37a' : '#b9a27a', { b: 7 }); R(x, '#1c1640', -94, -64, 188, 128)
  star(x, t, VIR, { x: -40, y: 10, s: 80, mood: 'happy', tips: false, look: [1, 0] }); star(x, t, SAG, { x: 40, y: 10, s: 80, mood: 'happy', tips: false, look: [-1, 0] })
  if (dusty) { x.globalAlpha = 0.35; R(x, '#c9c4d8', -94, -64, 188, 128) }
  x.restore()
}
function shelf(x, y = 640) { box(x, 620, y, 360, 22, '#8a5a3a', { b: 6, hi: 'rgba(255,255,255,0.2)' }) }
function calCard(x, t, cx, cy, at, name, col) {
  const k = pop01(t, at, 0.35, 2.2)
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -200, -110, 400, 220, BONE, { b: 7 }); R(x, col, -200, -110, 400, 50)
  x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, -85)
  R(x, INK, -170, -30, 340, 100); R(x, '#ffb37a', -164, -24, 328, 88)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('✦ CALL', 0, 2); x.font = `700 22px ${MONO}`; x.fillText('every month', 0, 40)
  x.restore()
}

const F = makeX({
  id: 'kxffe01', series: 'friends', dur: 60, ending: 'cut',
  hook: { text: 'We haven’t talked | in a *year.*', out: 2.9, top: 200, size: 112, color: VC },
  promise: { at: 2.2, out: [5.6, 5.9], text: 'the *hard part* is at the end', top: 1300 },
  chapters: [{ at: 3.0, title: 'the situation' }, { at: 12.5, title: 'the urge' }, { at: 21.5, title: 'the check-in' }, { at: 37.0, title: 'the hard part' }, { at: 48.5, title: 'after' }],
  fx: [
    { k: 'whip', at: -0.25, len: 0.5, from: 1.5 },
    { k: 'shake', at: 0.2, len: 0.4, amp: 20 },
    { k: 'scratch', at: 0.8, len: 1.3, caption: 'found the photo. | *felt* everything.', top: 1480 },
    { k: 'shake', at: 15.2, len: 0.3, amp: 14 },
    { k: 'call', at: 28.6, out: [31.3, 31.45], name: 'Sagittarius', sub: 'incoming call…', glyph: SAGC.glyph, color: SAGC.color, answerAt: 30.8 },
  ],
  lines: [
    say(6.0, VIR, 'a whole year. how did that *happen?*'),
    say(9.1, VIR, 'no fight. we just… *drifted.*'),
    stars(16.7, 'the urge is hurt talking.'),
    stars(19.3, 'lead with *warmth.*'),
    say(32.2, SAG, 'VIRGO! I was *just* thinking of you!'),
    say(37.6, VIR, 'I was hurt when we stopped *talking.*'),
    say(41.0, SAG, "I went through a lot. I'm sorry I went *quiet.*"),
    say(45.0, VIR, "thank you. I'm *glad* you're okay."),
    say(49.0, SAG, 'same time next *month?*'),
    say(52.0, VIR, 'already in my *calendar.*'),
  ],
  boxes: [{ from: 0, to: 2, close: 12.2 }, { from: 2, to: 4, close: 21.5 }, { from: 4, to: 5, close: 36.8 }, { from: 5, to: 8, close: 48.3 }, { from: 8, to: 10, close: 55.4 }],
  cards: [{ at: 21.8, out: [27.0, 27.35], text: 'hey, I miss you. | *no pressure to catch up on everything.*', top: 430, size: 56 }],
  last: { at: 58.2, text: 'Drifted. | *Rowed* back.', top: 300, color: VC },
  shots: [
    // A · the tumble (0–3)
    { at: 0, set: 'room', setOpts: { couch: false }, cam: [1.14, 540, 900], push: 0.02,
      draw(x, t) {
        shelf(x)
        x.save(); x.translate(620, 1170); x.rotate(0.5 * ease.inQuad(prog(t, -0.5, 2.6)))
        box(x, -60, -160, 120, 22, '#c98a4a', { b: 6 }); R(x, INK, -50, -138, 14, 138); R(x, INK, 36, -138, 14, 138)
        x.restore()
        const p = prog(t, -0.6, 2.8)
        x.save(); x.translate(lerp(620, 420, p), lerp(860, 1040, ease.inQuad(p))); x.rotate(-0.4 - 0.6 * p)
        star(x, t, VIR, { x: 0, y: 0, s: 280, mood: 'wide', look: [1, -1] })
        x.restore()
        photo(x, t, lerp(760, 820, p), 720 - 120 * Math.sin(Math.PI * p), 1.1, -0.3 + 2.0 * p)
        for (let i = 0; i < 8; i++) { const a = i * 0.8, r = 60 + (t + 0.6) * 80; x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#d8d2e8', 800 + Math.cos(a) * r, 700 + Math.sin(a) * r, 20, 20); x.restore() }
      },
      pis: { x: 940, y: 1250, s: 120, tears: 1, mood: 'wide', look: [-1, -1] } },
    // B · the situation (3–12.5)
    { at: 3.0, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.04,
      draw(x, t, S) {
        star(x, t, VIR, { x: 280, y: 1040, s: 250, mood: t < 9.4 ? 'neutral' : 'sparkle', look: [1, -1], hops: S.hopsFor(VIR) })
        photo(x, t, 330, 1150, 0.6, 0.15)
      },
      pis: t => ({ x: 940, y: 1250, s: 120, tears: t < 9.4 ? 1 : 2, mood: 'sparkle', look: [-1, -1] }) },
    // C · the urge (12.5–16.5), THE STARS (16.5–21.5)
    { at: 12.5, set: 'room', setOpts: { couchX: 540 }, cam: [1.14, 540, 900], push: 0.04, noFlash: true,
      draw(x, t) { star(x, t, VIR, { x: 280, y: 1040, s: 250, mood: t < 15.2 ? 'squint' : 'wide', look: [1, -1] }) },
      pis: { x: 940, y: 1250, s: 120, tears: 2, mood: 'wide', look: [-1, -1] } },
    { at: 16.5, set: 'sky', push: 0.04,
      draw(x, t, S) {
        star(x, t, 'stars', { x: 540, y: 1000, s: 380, mood: 'happy', look: [0, 0], hops: S.hopsFor('stars'), glow: 1.3 })
        star(x, t, VIR, { x: 190, y: 1210, s: 150, mood: 'neutral', look: [1, -1] })
      },
      pis: { x: 900, y: 1230, s: 130, tears: 1, mood: 'sparkle', look: [-1, -1] } },
    // D · the check-in (21.5–32)
    { at: 21.5, set: 'sky', push: 0.04, noFlash: true,
      draw(x, t) {
        star(x, t, VIR, { x: 540, y: 1100, s: 260, mood: t > 27.4 ? 'squint' : 'happy', look: [0, -1], hops: [27.5] })
        if (t > 27.5) { const p = prog(t, 27.5, 28.5); phoneSmall(x, t, lerp(640, 900, p), lerp(1150, 300, p), { rot: p * 6, s: lerp(0.8, 0.3, p) }); sparkles(x, t, 640, 1150, 27.5, 10, 90, 2) }
      },
      pis: { x: 180, y: 1250, s: 130, tears: 2, mood: 'sparkle', look: [1, -1] } },
    // E · the call (31.4–48.5): the split
    { at: 31.4, set: 'split', cam: [1.16, 540, 880], push: 0.03,
      draw(x, t, S) {
        label(x, 'VIRGO', 270, 380, { size: 26, col: VC }); label(x, 'SAGITTARIUS', 810, 380, { size: 26, col: SAGC.color })
        star(x, t, VIR, { x: 270, y: 1030, s: 230, mood: t < 37.4 ? 'happy' : t < 44.8 ? 'sparkle' : 'happy', look: [1, 0], hops: S.hopsFor(VIR) })
        phoneSmall(x, t, 380, 980, { rot: -0.3, s: 0.7 })
        star(x, t, SAG, { x: 810, y: 1030, s: 230, mood: t < 40.8 ? 'happy' : t < 44.8 ? 'sparkle' : 'happy', look: [-1, 0], hops: S.hopsFor(SAG) })
        phoneSmall(x, t, 700, 980, { rot: 0.3, s: 0.7 })
        if (t > 32.6 && t < 36.6) hearts(x, t, 33.0, 540, 820, { n: 5, cell: 5, spread: 300 })
      },
      pis: t => ({ x: 120, y: 1240, s: 90, tears: t < 41 ? 2 : 3, mood: 'sparkle', look: [1, -1], tissue: false }) },
    // F · after (48.5–60)
    { at: 48.5, set: 'split', cam: [1.16, 540, 880], push: 0.03, noFlash: true,
      draw(x, t, S) {
        star(x, t, VIR, { x: 270, y: 1030, s: 230, mood: 'happy', look: [1, 0], hops: S.hopsFor(VIR) })
        star(x, t, SAG, { x: 810, y: 1030, s: 230, mood: 'happy', look: [-1, 0], hops: S.hopsFor(SAG) })
        x.save(); x.translate(270, 720); x.scale(0.62, 0.62); calCard(x, t, 0, 0, 50.0, 'VIRGO', VC); x.restore()
        x.save(); x.translate(810, 720); x.scale(0.62, 0.62); calCard(x, t, 0, 0, 52.4, 'SAGITTARIUS', SAGC.color); x.restore()
        if (t > 55.4) { photo(x, t, 540, 1240 + 600 * (1 - pop01(t, 55.4, 0.4)), 0.8, 0.05, { dusty: false, fresh: true }); sparkles(x, t, 540, 1240, 55.8, 10, 120, 1) }
      },
      pis: t => ({ x: 120, y: 1240, s: 100, tears: 3, mood: 'happy', look: [1, -1], tissue: false, hops: [53.0, 53.6, 54.2] }) },
  ],
  overlay(x, t) {
    if (t >= 3.6 && t < 16.4) {
      const k = pop01(t, 3.6, 0.35, 2) * outK(t, [16.0, 16.4])
      const d = prog(t, 12.9, 14.6)
      bigPhone(x, t, { cx: 650, cy: 720, w: 480, h: 600, title: 'sagittarius ♐︎', pop: k, accent: '#ffb37a',
        draft: t > 12.8 ? { text: 'wow, so you just forgot me?', chars: d * 27, strike: t > 15.1 } : null,
        msgs: [
          { at: -9, from: 'them', name: '— LAST WINTER —', nameCol: 'rgba(239,230,214,0.55)', text: 'miss you!! let’s catch up soon' },
          { at: -9, from: 'me', text: 'yes!! soon' },
        ] })
    }
  },
  cues: [
    ['whoosh', 0.0, 0.5, 0.05], ['pop', 0.2, 196, 0.06, 0],
    ['tick', 13.0, 0.02], ['tick', 13.4, 0.02], ['tick', 13.8, 0.02], ['tick', 14.2, 0.02], ['whoosh', 15.1, 0.25, 0.04], ['pop', 15.15, 220, 0.05, 0],
    ['whoosh', 27.5, 1.0, 0.04], ['pop', 27.55, 1318.51, 0.035, 0], ['glitter', 27.5, 28.1],
    ['pop', 50.0, 1174.66, 0.035, -0.3], ['pop', 52.4, 1318.51, 0.035, 0.3], ['glitter', 55.8, 56.4],
    ['pluck', 41.6, 659.25, 0.03, 0.5, -0.3], ['pluck', 53.1, 659.25, 0.035, 0.5, -0.3], ['pluck', 53.3, 587.33, 0.035, 0.5, -0.3],
  ],
})
export const { DURATION, SCENES, CUES } = F
export default F
