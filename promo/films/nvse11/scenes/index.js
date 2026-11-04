// nvse11: SIGN VS SIGN, "Who handles a surprise video call better?" ♏ Scorpio vs ♒ Aquarius (18 s trial reel, b46,
// music: synthwave · Am). Story 0–13.6, then the shared end card. Format: ../../nvse01/scenes/versuskit.js.
//   hook: INCOMING CALL, a phone buzzing between them.
//   ROUND 1 ♏ "answers *from the dark.*" a call frame, only its eyes show; then a tiny lamp clicks on. "hi." → "the lights? they’re… ambient."
//   ROUND 2 ♒ "answers *mid-experiment.*" goggles on, a flask bubbling over. "hi! one sec, it’s bubbling." → "wanna see?"
//   VERDICT "BOTH. | *Picked up.*"  THE STARS: "Messy hair, real smile. That's the call."
import { makeVersus, phone, label, drawProp, inSprite, R, INK, pop01, clamp, prog, SW, T, MINT, PAL } from '../../nvse01/scenes/versuskit.js'

function callFrame(x, t, S) {
  R(x, INK, 70, 360, 940, 10); R(x, INK, 70, 1210, 940, 10); R(x, INK, 70, 360, 10, 860); R(x, INK, 1000, 360, 10, 860)
  label(x, `● VIDEO CALL  0:0${Math.min(9, 1 + Math.floor(S.u * 2))}`, 540, 400, { size: 28, col: MINT })
}
function goggles(x, F) {
  inSprite(x, F, () => {
    for (const ex of [13.4, 22.6]) { x.fillStyle = INK; x.fillRect(ex - 4, 15.6, 8, 6.4); x.fillStyle = 'rgba(160,230,255,0.55)'; x.fillRect(ex - 3, 16.6, 6, 4.4); x.fillStyle = '#ffffff'; x.fillRect(ex - 2.4, 17, 1.4, 1) }
    x.fillStyle = INK; x.fillRect(2, 18, 7.4, 1.4); x.fillRect(26.6, 18, 7.4, 1.4)
  })
}

const EP = makeVersus({
  id: 'nvse11', a: 'scorpio', b: 'aquarius', accent: '#9fe6b0',
  hook: 'Who handles a | *surprise video call?*',
  hookMoods: ['wide', 'sparkle'],
  hookDraw(x, t) { const bz = Math.sin(t * 6) > 0 ? 6 * Math.sin(t * 70) : 0; label(x, 'INCOMING CALL', 540, 540, { size: 26, col: MINT }); phone(x, 540 + bz, 660, 0.45, { title: '', msgs: [], rot: 0.05, glow: 1 }) },
  rounds: [
    {
      caption: 'answers *from the dark.*', deep: '#8a1f3a',
      set: 'room', tint: '#1a1430', setOpts: { window: false },
      moods: ['neutral', 'wide'], fx: [],
      hero: { x: 540, y: 900, s: 300 },
      front(x, t, S) {
        // the dark: everything but the eyes
        const lamp = clamp(prog(t, S.sw, S.sw + 0.15))
        const g = x.createRadialGradient(540, 860, 30, 540, 860, 150 + 160 * lamp)
        g.addColorStop(0, 'rgba(6,4,14,0)'); g.addColorStop(0.5, `rgba(6,4,14,${0.75 - 0.3 * lamp})`); g.addColorStop(1, `rgba(6,4,14,${0.94 - 0.2 * lamp})`)
        x.fillStyle = g; x.fillRect(80, 370, 920, 840)
        if (lamp > 0) drawProp(x, 'lamp', 820, 1080, 7, { alpha: lamp })
        callFrame(x, t, S)
      },
      bubbles: ['hi.', 'the lights? they’re… ambient.'],
      bubblePos: [[540, 600, 0], [540, 700, 0]],
      cues: [['tick', 1.75, 0.08]],
    },
    {
      caption: 'answers *mid-experiment.*', deep: '#2a7ab0',
      set: 'room', tint: '#1f3a3a', setOpts: { window: false },
      moods: ['sparkle', 'happy'], fx: ['sparkle'],
      hero: { x: 420, y: 950, s: 270 },
      front(x, t, S) {
        if (S.F) goggles(x, S.F)
        drawProp(x, 'flask', 790, 1050, 14)
        for (let i = 0; i < 6; i++) { const p = ((t * 1.2 + i / 6) % 1); x.save(); x.globalAlpha = 1 - p; R(x, PAL.E, 790 + 30 * Math.sin(i * 2 + t * 3) - 8, 960 - p * 260, 16 + (i % 2) * 8, 16 + (i % 2) * 8); x.restore() }
        callFrame(x, t, S)
      },
      bubbles: ['hi! one sec, it’s bubbling.', 'wanna see?'],
      bubblePos: [[440, 600, 0], [720, 700, 0.2]],
      cues: [0.5, 0.8, 1.1, 1.4, 1.7, 2.0].map(c => ['pop', c, 1567.98, 0.015, 0.4]),
    },
  ],
  verdict: { who: 'both', text: 'BOTH. | *Picked up.*', late: 2 },
  last: 'Messy hair, real smile. That’s the call.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
void [pop01, SW, T]
