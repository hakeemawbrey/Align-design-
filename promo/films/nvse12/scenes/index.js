// nvse12: SIGN VS SIGN, "Who writes a holiday card better?" ♑ Capricorn vs ♓ Pisces (16 s trial reel, b46,
// music: lofi · Em). Story 0–13.6, then the short end card. Format: ../../nvse01/scenes/versuskit.js.
// Pisces plays this one, so it cries on its own side (no corner Pisces).
//   hook: both mid-hop, pens up, a blank card between them.
//   ROUND 1 ♑ "writes a *formal letter.*" Season’s greetings. Regards. Crumpled drafts pile up: DRAFT 12. "draft twelve." → "too warm? too cold?"
//   ROUND 2 ♓ "writes *nine pages* and a flower." the pages stack, then SENT. "it’s just a card!" → "*sniff* it’s a lot of card."
//   VERDICT "PISCES. | *Hit send.*" Capricorn sends draft twelve too, smiling.  THE STARS: "The card you send beats the perfect one."
import { makeVersus, paper, drawProp, bubble, label, R, INK, BONE, pop01, SW, T, MINT } from '../../nvse01/scenes/versuskit.js'

const EP = makeVersus({
  id: 'nvse12', a: 'capricorn', b: 'pisces', accent: '#9fe6b0',
  hook: 'Who writes | a *holiday card* better?',
  hookMoods: ['neutral', 'sparkle'],
  hookDraw(x, t) { paper(x, 540, 660, 190, 130, { title: '♥', titleSize: 40, rot: 0.06 * Math.sin(t * 2), accent: '#d23a5a' }) },
  rounds: [
    {
      caption: 'writes a *formal letter.*', deep: '#2f6a5a',
      set: 'room', tint: '#1f2a3a', setOpts: { lampX: 940 },
      moods: ['neutral', 'squint'], fx: ['sweat'],
      hero: { x: 790, y: 1000, s: 250 },
      draw(x, t, S) {
        paper(x, 320, 800, 420, 330, { title: 'Dear you,', lines: ['Season’s greetings.', '', 'Regards,', '— Capricorn'], size: 30, k: pop01(t, S.t0 + 0.15), rot: -0.03, font: "'EB Garamond', serif" })
        for (let i = 0; i < 7; i++) { const k = pop01(t, S.t0 + 0.6 + i * 0.18, 0.25, 2.4); if (k <= 0.01) continue; const bx = 150 + (i * 97) % 520, by = 1130 + (i % 3) * 28; x.save(); x.translate(bx, by); x.scale(k, k); R(x, INK, -22, -20, 44, 40); R(x, BONE, -18, -16, 36, 32); R(x, '#c9bfa8', -10, -6, 14, 6); x.restore() }
        if (t > S.sw) label(x, 'DRAFT 12', 320, 1010, { size: 34, col: '#ff8fa0' })
      },
      bubbles: ['draft twelve.', 'too warm? too cold?'],
      bubblePos: [[760, 620, 0.2], [760, 730, 0.2]],
      cues: [0.6, 0.78, 0.96, 1.14, 1.32, 1.5, 1.68].map(c => ['tick', c, 0.04]),
    },
    {
      caption: 'writes *nine pages* and a flower.', deep: '#6a4ab0',
      set: 'room', tint: '#2a2a5a', setOpts: { lampX: 940 },
      moods: ['sparkle', 'sparkle'], fx: ['hearts'],
      hero: { x: 790, y: 1000, s: 250 },
      pose: (u) => ({ tears: u > SW ? 3 : 2 }),
      draw(x, t, S) {
        for (let i = 0; i < 6; i++) { const k = pop01(t, S.t0 + 0.2 + i * 0.12, 0.25, 2.2); paper(x, 300 + i * 12, 820 - i * 14, 380, 420, { title: i === 5 ? 'Dear you,' : null, lines: i === 5 ? ['you make winter', 'feel like a', 'warm window', '(page 1 of 9)'] : [], size: 28, k, rot: -0.06 + i * 0.02, font: "'EB Garamond', serif" }) }
        drawProp(x, 'flower', 470, 960, 9)
        if (t > S.sw) label(x, 'SENT ✓', 360, 1080, { size: 36 * pop01(t, S.sw, 0.3, 2.4), col: MINT })
      },
      bubbles: ['it’s just a card!', '*sniff* it’s a lot of card.'],
      bubblePos: [[760, 620, 0.2], [740, 730, 0.2]],
      cues: [0.2, 0.32, 0.44, 0.56, 0.68, 0.8].map(c => ['tick', c, 0.04]).concat([['pop', 1.78, 1318.51, 0.045, -0.3]]),
    },
  ],
  verdict: {
    who: 'b', text: 'PISCES. | *Hit send.*', late: 2,
    draw(x, t) { bubble(x, t, 290, 690, T.crown + 0.7, 13.4, 'sent: draft twelve ✓', { size: 28, col: '#c9f2d4' }) },
  },
  last: 'The card you send beats the perfect one.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
