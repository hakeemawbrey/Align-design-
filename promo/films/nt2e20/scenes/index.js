// nt2e20: DELULU OR SOLULU: a follow-up question (25 s vertical, Trends Vol. 2 format 4; row in
// promo/films/next30/b11.md; music chiptune · A). Format look: ../../nt2e16/scenes/delulukit.js.
//   0.0        hook (frame 0): "They asked a follow-up question… | so they're my *person*." Aquarius mid-pitch with a
//              blueprint.
//   2.0 / 5.0 / 8.0  evidence: asked about *my invention* · asked *a second question* · *nodded slowly*.
//   11.0       card cut · THE STARS: "…or you could just *ask?*"
//   13.0       Aquarius to Virgo: "hang out? like, a date?"  14.3 "as friends? I'd love that!"  15.2 the needle still
//              slams to SOLULU: now you know, and you've got a friend. Aquarius smiles; Pisces sobs happily.
//   15.75      THE STARS: "Clear beats *maybe*, every time."
import { makeDelulu, box, R, label, bubble, pop01, INK, GOLD, BONE, MONO } from '../../nt2e16/scenes/delulukit.js'

function blueprint(x, cx, cy, t) {
  x.save(); x.translate(cx, cy); x.rotate(-0.1 + 0.04 * Math.sin(t * 3))
  box(x, -80, -60, 160, 120, '#3f7cf0', { b: 6 })
  x.strokeStyle = BONE; x.lineWidth = 3; x.strokeRect(-56, -36, 60, 50); x.beginPath(); x.arc(30, 0, 22, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(-56, 30); x.lineTo(56, 30); x.stroke()
  x.restore()
}

const EP = makeDelulu({
  id: 'nt2e20', sign: 'aquarius', crush: 'virgo', accent: '#38c4ec', crushMood: 'happy-friend',
  claim: 'They asked a follow-up question… | so they’re my *person.*',
  prop: (x, t, o) => { if (t < 11) blueprint(x, o.x + 160, o.y - 10, t) },
  ev: [
    { caption: 'asked about *my invention*', draw(x, t, S) { bubble(x, t, 820, 1030, S.t0 + 0.4, S.t1 - 0.2, '“how does it work?”', { size: 28, col: '#c9f2d4' }) } },
    { caption: 'asked *a second question*', draw(x, t, S) { bubble(x, t, 820, 1030, S.t0 + 0.4, S.t1 - 0.2, '“and then what?”', { size: 28, col: '#c9f2d4' }) } },
    { caption: '*nodded slowly*', draw(x, t, S) { label(x, 'nod… nod…', 860, 1060, { size: 30, col: GOLD, font: MONO, alpha: pop01(t, S.t0 + 0.4, 0.2, 2) }) } },
  ],
  ask: 'hang out? like, a date?', answer: 'as friends? I’d love that!',
  last: 'Clear beats *maybe*, every time.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, INK]
