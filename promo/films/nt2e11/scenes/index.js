// nt2e11: SOFT LAUNCH vs HARD LAUNCH: telling the friends (20 s vertical, Trends Vol. 2 format 3; row in
// promo/films/next30/b11.md; music house · Ab). Format look: ./launchkit.js (shared with nt2e12–nt2e15).
//   0.0        hook (frame 0): "Gemini: *telling the friends*", the split screen, Gemini mid-hop with two phones.
//   2.1        SOFT: the group chat: "met someone…" "ANYWAY" — the friends reply "???" "WHO".
//   5.6        HARD: a slideshow; title slide "MEET MY PERSON", Gemini with a pointer, three slides in.
//   9.1        card cut · THE REAL LAUNCH: Gemini opens the door to tell them… the friends already hold a banner
//              "WE KNEW!!" and cheer.
//   12.75      THE STARS: "Your friends *saw it coming*."
import { makeLaunch, starOf, phone, box, R, bubble, label, confetti, hearts, shadow, pop01, prog, ease, lerp, INK, BONE, GOLD, PINK, INTER } from './launchkit.js'

const GEM = starOf('gemini', 3, 1.1), F = [starOf('aries', 10), starOf('libra', 11), starOf('cancer', 12)]

function screen(x, cx, cy, w, h, title, sub) {
  box(x, cx - w / 2, cy - h / 2, w, h, BONE, { b: 6 })
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.font = `800 34px ${INTER}`; title.split('|').forEach((l, i) => x.fillText(l, cx, cy - 20 + i * 40))
  if (sub) { x.font = `700 22px ${INTER}`; x.fillStyle = '#8a2a5a'; x.fillText(sub, cx, cy + h / 2 - 26) }
}

const EP = makeLaunch({
  id: 'nt2e11', sign: 'gemini', name: 'Gemini', topic: 'telling the friends', accent: '#f2cf4a',
  hook(x, t) {
    phone(x, t, 330, 900, { w: 130, h: 220, rot: -0.25 + 0.08 * Math.sin(t * 5), rows: [] })
    phone(x, t, 750, 900, { w: 130, h: 220, rot: 0.25 - 0.08 * Math.sin(t * 5), rows: [] })
  },
  soft: { caption: 'soft: *“met someone… anyway”*',
    draw(x, t, S) {
      phone(x, t, 280, 760, { w: 420, h: 600, size: 32, title: 'THE GROUP', rows: [
        { text: 'met someone…', me: true, at: S.t0 + 0.3 }, { text: 'ANYWAY', me: true, at: S.t0 + 0.9 },
        { text: '???', me: false, at: S.t0 + 1.5 }, { text: 'WHO', me: false, at: S.t0 + 1.8 }, { text: 'GEMINI.', me: false, at: S.t0 + 2.1 }] })
      GEM(x, t, { x: 200, y: 1150, s: 150, mood: S.u > 1.5 ? 'wink' : 'happy', look: [1, -0.6], hops: [S.t0 + 0.3, S.t0 + 0.9] })
    },
    cues: [['pop', 0.3, 880, 0.03, -0.4], ['pop', 0.9, 987.77, 0.03, -0.4], ['pop', 1.5, 659.25, 0.03, -0.3], ['pop', 1.8, 739.99, 0.03, -0.3], ['pop', 2.1, 587.33, 0.035, -0.3]] },
  hard: { caption: 'hard: *a slideshow*',
    draw(x, t, S) {
      const n = S.u < 0.8 ? 0 : S.u < 1.6 ? 1 : 2
      const slides = [['MEET MY|PERSON', 'a presentation'], ['FUN FACTS', 'slide 2 of 30'], ['OUR FIRST|COFFEE', 'slide 3 of 30']]
      screen(x, 800, 700, 420, 300, ...slides[n])
      const g = { x: 700, y: 1080, s: 170, mood: 'sparkle', look: [1, -0.6], hops: [S.t0 + 0.8, S.t0 + 1.6] }
      GEM(x, t, g)
      x.save(); x.translate(760, 980); x.rotate(-0.7); R(x, INK, -4, -130, 8, 140); R(x, '#e8344e', -4, -138, 8, 12); x.restore()
      if (S.u > 2.0) label(x, 'slide 3 of 30', 900, 1180, { size: 24, col: GOLD })
    },
    cues: [['tick', 0.8, 0.06], ['pop', 0.82, 1174.66, 0.035, 0.4], ['tick', 1.6, 0.06], ['pop', 1.62, 1318.51, 0.035, 0.4]] },
  real: { caption: '',
    draw(x, t, S) {
      // a banner held up by the friends
      const bk = pop01(t, S.t0 + 0.9, 0.35, 2.2)
      F.forEach((f, i) => { shadow(x, 300 + i * 240, 1110, 160); f(x, t, { x: 300 + i * 240, y: 960, s: 160, mood: S.u > 0.9 ? 'happy' : 'neutral', look: [0, 0], hops: [S.t0 + 0.9 + i * 0.08, S.t0 + 1.6, S.t0 + 2.3] }) })
      if (bk > 0.01) { x.save(); x.translate(540, 700); x.rotate(-0.03); x.scale(bk, bk); box(x, -400, -70, 800, 140, PINK, { b: 8 }); x.font = `800 84px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WE KNEW!!', 0, 6); x.restore() }
      confetti(x, t, S.t0 + 0.95, 540, 680)
      GEM(x, t, { x: 540, y: 1180, s: 180, mood: S.u < 0.9 ? 'neutral' : S.u < 1.5 ? 'wide' : 'happy', look: [0, -0.8], hops: [S.t0 + 0.95, S.t0 + 2.0] })
      if (S.u < 0.9) bubble(x, t, 540, 1020, S.t0 + 0.2, S.t0 + 0.9, 'so… I met someone', { size: 32 })
      hearts(x, t, S.t0 + 1.6, 540, 1080, { n: 6 })
    },
    cues: [['pop', 0.2, 880, 0.03, 0], ['boom', 0.9, 0.18], ['pop', 0.92, 1318.51, 0.045, 0], ['glitter', 0.95, 1.5], ['clap', 1.1, { gain: 0.13, pan: -0.3 }], ['clap', 1.4, { gain: 0.13, pan: 0.3 }], ['clap', 1.7, { gain: 0.13 }]] },
  last: 'Your friends *saw it coming*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [prog, ease, lerp, BONE]
