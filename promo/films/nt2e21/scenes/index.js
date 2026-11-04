// nt2e21 · THE BARE MINIMUM · "Cancer Frames a Text" (20 s vertical, Trends Vol. 2 ep 21, music: funk · E).
// The format lives in ./barekit.js (shared by nt2e21–nt2e25) on ./trendkit.js (shared by the whole batch).
//   0.0   hook: "They did the *bare minimum.* | (I'm a Cancer.)" ♋ mid-swoon, hugging a framed phone.
//   2.1   1 "they texted back *the same day.*"  ♑ hops the floor-level bar: "hey! how was your day?"
//         Cancer: "i'm framing this." (a gold frame pops up around the text)
//   4.85  2 "they said *'get home safe.'*"  Cancer writes it in a diary, hearts on every line: "they CARE."
//   7.6   card cut. 3 "then THE STARS *raised the bar.*"  THE STARS lift the bar to head height; Capricorn runs, clears
//         it: "how did the talk with your mom go?"  Cancer, quiet: "you… remembered?"
//   11.45 stamp "NEW *STANDARD.*"  12.0 THE STARS: "Don't frame the *floor.*"  Pisces: NEW BAR!, fountaining.
import { makeBare } from './barekit.js'
import { frameProp, phoneProp, bookProp, label, pop01, outK, R, INK, INTER, ease, prog } from './trendkit.js'

const CANCER = '#3fb6f0'
function framedText(x, t, cx, cy, k, s = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s); x.rotate(0.05 * Math.sin(t * 2))
  frameProp(x, 0, 0, 230, 120, (c) => {
    R(c, '#e9f3ff', -115, -60, 230, 120)
    R(c, '#c9f2d4', -96, -30, 192, 50)
    c.font = `800 17px ${INTER}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = INK; c.fillText('hey! how was your day?', 0, -5)
    c.font = `700 14px 'Space Mono', monospace`; c.fillStyle = '#7a6a9a'; c.fillText('6:02 PM · same day', 0, 38)
  })
  x.restore()
}

const EP = makeBare({
  id: 'nt2e21', sign: 'cancer', date: 'capricorn', deep: '#1f6f9a', accent: CANCER,
  hookDraw(x, t, { o }) { framedText(x, t, o.x, o.y + 120, 1, 0.8) },
  beats: [
    { caption: 'they texted back *the same day.*', gesture: 'hey! how was your day?', reply: 'i’m framing this.',
      draw(x, t, S) { if (!S.under) framedText(x, t, 820, 470, pop01(t, S.a + 1.25, 0.35, 2.4) * outK(t, [S.b - 0.15, S.b])) },
      cues: [['pop', 1.25, 1567.98, 0.04, 0.4], ['bell', 1.3, 1318.51, 0.025, 0.8, 0.4]] },
    { caption: 'they said *‘get home safe.’*', gesture: 'get home safe!', reply: 'they CARE.',
      draw(x, t, S) {
        if (S.under) return
        const k = pop01(t, S.a + 1.2, 0.35, 2.2) * outK(t, [S.b - 0.15, S.b])
        if (k <= 0.01) return
        x.save(); x.translate(800, 470); x.scale(k, k)
        bookProp(x, 0, 0, { rot: -0.06, writing: prog(t, S.a + 1.3, S.a + 2.2), hearts: prog(t, S.a + 1.6, S.a + 2.4) })
        x.restore()
        label(x, 'DEAR DIARY', 800, 360, { size: 26, alpha: k, col: '#ffd1de' })
      },
      cues: [['tick', 1.35, 0.03], ['tick', 1.5, 0.03], ['tick', 1.65, 0.03], ['pluck', 1.8, 1567.98, 0.03, 0.4, 0.3]] },
    { caption: 'then THE STARS *raised the bar.*', gesture: 'how did the talk with your mom go?', reply: 'you… remembered?',
      draw(x, t, S) {
        if (S.under || S.u < 2.75) return
        // the old framed text slips out of frame, forgotten
        const p = ease.inQuad(prog(S.u, 2.8, 3.4))
        if (p < 1) framedText(x, t, 1010, 1000 + p * 500, 0.55 * (1 - p * 0.3))
      } },
  ],
  last: 'Don’t frame the *floor.*',
  pisCard: 'NEW BAR!',
})
void phoneProp
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
