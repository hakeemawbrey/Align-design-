// nt2e02: THINGS THAT JUST MAKE SENSE: texting (20 s vertical, Trends Vol. 2 format 1; row in
// promo/films/next30/b11.md; music dreamy · F). Format look: ../../nt2e01/scenes/sensekit.js.
//   0.0–2.1    hook (frame 0): "Things that just *make sense:* | texting". Virgo mid-type on a big phone.
//   2.1–5.0    1 "Virgo + *a proofread "on my way"*": "on my wya" → red underline → "on my way." with a full stop.
//   5.0–7.9    2 "Gemini + *three voice notes* in a row": the voice notes stack up, Gemini still talking.
//   7.9        card cut.
//   7.9–11.3   3 (twist) "Scorpio + *"home safe?"* at 11 PM": 11:02 PM, "home safe?" … "yes." in two seconds;
//              Libra glows.
//   11.35      stamp MAKES SENSE. · THE STARS: "Care lives in the *small print*." · Pisces: SO TRUE.
import { makeSense, starOf, withProps, bubble, shadow, box, R, hearts, label, phone, pop01, prog, ease, lerp, INK, BONE, GOLD, RED, MONO } from '../../nt2e01/scenes/sensekit.js'

const VIRGO = starOf('virgo', 3), GEM = starOf('gemini', 4), SCO = starOf('scorpio', 5), LIB = starOf('libra', 7)

function voiceNote(x, t, cx, cy, k, len) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, '#7f6bff', -120, -28, 240, 56)
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-100, -14); x.lineTo(-100, 14); x.lineTo(-78, 0); x.fill()
  for (let i = 0; i < 9; i++) R(x, BONE, -62 + i * 13, -4 - 8 * Math.abs(Math.sin(i * 1.7)), 6, 8 + 16 * Math.abs(Math.sin(i * 1.7)))
  x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(len, 110, 2)
  x.restore()
}

const EP = makeSense({
  id: 'nt2e02', topic: 'texting', accent: '#ef5c94', deep: '#b0306a', badge: '#ef5c94',
  hook(x, t) {
    shadow(x, 460, 1180, 320)
    const o = { x: 420, y: 960, s: 300, mood: 'squint', look: [1, -0.3], hops: [-0.2, 0.45, 0.9, 1.35, 1.8] }
    VIRGO(x, t, o)
    phone(x, t, 760, 860, { w: 300, h: 500, rot: 0.08, title: 'DRAFT', rows: [{ text: 'on my way', me: true, at: -1 }, { text: `${'|'.repeat(1 + Math.floor(t * 4) % 2)}`, me: true, at: -1 }] })
    label(x, 'tap tap tap', 420, 660, { size: 34, col: GOLD, rot: -0.08 })
  },
  hookCues: [0.45, 0.9, 1.35, 1.8].map((c, i) => ['tick', c, 0.04 + i * 0.005]),
  eqs: [
    { caption: 'Virgo + *a proofread* “on my way”', check: [880, 520],
      draw(x, t, S) {
        const fixed = S.u > 1.0
        VIRGO(x, t, { x: 300, y: 1000, s: 240, mood: fixed ? 'happy' : 'squint', look: [1, -0.4], hops: [S.t0 + 1.0, S.t0 + 1.6] })
        phone(x, t, 700, 920, { w: 380, h: 560, title: 'TO: DATE', rows: [{ text: fixed ? 'on my way.' : 'on my wya', me: true, at: S.t0 - 1, size: 34 }] })
        if (!fixed && S.u > 0.4) { const w = 120 * ease.outCubic(prog(S.u, 0.4, 0.7)); R(x, RED, 700 + 30, 800, w, 6) }
        if (S.u > 1.0 && S.u < 1.3) label(x, 'fixed', 560, 760, { size: 30, col: '#7be3a0' })
        bubble(x, t, 330, 720, S.t0 + 1.7, S.t1, 'and a full stop.', { size: 36 })
      },
      cues: [['tick', 0.4, 0.05], ['tick', 0.6, 0.04], ['pop', 1.0, 1174.66, 0.04, 0.3], ['pluck', 1.72, 1318.51, 0.03, 0, 0]] },
    { caption: 'Gemini + *three voice notes* in a row', check: [880, 500],
      draw(x, t, S) {
        GEM(x, t, { x: 300, y: 1020, s: 240, mood: 'happy', look: [1, -0.2], hops: [S.t0 + 0.35, S.t0 + 0.85, S.t0 + 1.35, S.t0 + 1.85, S.t0 + 2.35] })
        box(x, 520, 640, 420, 600, '#2a2148', { b: 8 }); R(x, '#14102a', 534, 680, 392, 530)
        const lens = ['0:42', '1:15', '2:03']
        lens.forEach((l, i) => voiceNote(x, t, 730, 760 + i * 110, pop01(t, S.t0 + 0.35 + i * 0.5, 0.25, 2.4), l))
        const blah = 'blah '.repeat(1 + Math.floor((S.u * 3) % 3))
        label(x, blah, 300, 760, { size: 30, col: GOLD, rot: -0.06 })
        bubble(x, t, 340, 690, S.t0 + 1.95, S.t1, 'okay, last one!', { size: 34, tail: 0.3 })
      },
      cues: [['pop', 0.35, 880, 0.04, 0.3], ['pop', 0.85, 987.77, 0.04, 0.3], ['pop', 1.35, 1174.66, 0.04, 0.3], ['pluck', 1.96, 1318.51, 0.03, -0.2, 0]] },
    { caption: 'Scorpio + *“home safe?”* at 11 PM', check: [880, 480], pis: { x: 940, y: 1690 },
      draw(x, t, S) {
        const replied = S.u > 1.2
        SCO(x, t, { x: 260, y: 1020, s: 220, mood: replied ? 'happy' : 'neutral', look: [1, -0.3], hops: [S.t0 + 1.25] })
        phone(x, t, 560, 880, { w: 340, h: 520, title: '11:02 PM', titleCol: GOLD, rows: [{ text: 'home safe?', me: false, at: S.t0 + 0.3, size: 30 }, { text: 'yes.', me: true, at: S.t0 + 1.2, size: 30, col: '#2fa06a' }] })
        const l = { x: 860, y: 1040, s: 200, mood: S.u > 1.2 ? 'heart' : 'happy', look: [-1, -0.2], hops: [S.t0 + 1.15, S.t0 + 1.9], blush: S.u > 1.2 ? 1 : 0.4 }
        LIB(x, t, l)
        if (S.u > 0.5 && S.u < 1.2) label(x, '2 seconds', 860, 830, { size: 28, col: BONE })
        hearts(x, t, S.t0 + 1.3, 860, 900, { n: 6 })
        bubble(x, t, 560, 560, S.t0 + 1.9, S.t1, 'goodnight then.', { size: 34 })
      },
      cues: [['pop', 0.3, 739.99, 0.035, -0.2], ['pop', 1.2, 1318.51, 0.045, 0.3], ['pluck', 1.3, 1174.66, 0.04, 0.5, 0.3], ['pluck', 1.42, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  finale(x, t, { ok }) {
    shadow(x, 420, 1060, 220 * ok); shadow(x, 680, 1070, 200 * ok)
    SCO(x, t, { x: 420, y: 880, s: 240, pop: ok, mood: 'happy', look: [1, 0], hops: [11.4, 12.2] })
    LIB(x, t, { x: 680, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [11.5, 13.5] })
  },
  last: 'Care lives in the *small print*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [withProps, lerp, INK]
