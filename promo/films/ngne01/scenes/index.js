// ngne01: STAR TALK GAME NIGHT, Ep 1, "Aries vs Libra: Fastest Buzzer Loses" (33 s vertical, opposite signs,
// music: funk · Em). Story 0–30.6, then the short end card. The set, timeline and sound live in ../gamekit.js.
//   0.0    hook "Fastest buzzer *loses.* | Kindest answer wins."  Aries is already hammering its buzzer before the host
//          has said hello; Libra is still deciding how to stand (the ? keeps flipping).  THE STARS: "kindest answer
//          *wins.* buzzers up!"
//   3.0    R1 FINISH THE TEXT "sorry I'm late, I ___": Aries buzzes before the card even lands. "was racing a pigeon.
//          it won." / Libra: "should've texted. 5 min out, ordering your fries." → Libra.
//   10.4   R2 GREEN OR RED "They ask where YOU want to eat.": Aries "GREEN!! they asked!" / Libra holds up
//          BOTH flags: "…can I get back to you?" → Aries.
//   17.8   R3 WHAT WOULD YOU DO? "Your date is nervous and talks nonstop.": Aries "let them finish. I'm practicing."
//          / Libra "match their pace. then ask about their dog." → both.
//   25.2   2–2, a tie: "Kindest hearts: | both of them."  Two talk cards, face down, then flipped. Pisces fountains.
//          THE STARS: "Two winners. *That's* the game."
import { makeGame, label, prog } from '../gamekit.js'

const EP = makeGame({
  id: 'ngne01',
  A: { sign: 'aries', intro: { mood: 'wide', look: [0.3, 0.6], buzz: true } },
  B: { sign: 'libra', intro: { mood: 'neutral', look: [0, -1] } },
  hook: 'Fastest buzzer *loses.* | Kindest answer wins.',
  accent: '#e163d6',
  welcome: 'kindest answer *wins.* ready?',
  rounds: [
    { prompt: "sorry I'm late, I ___", first: 'A', buzzAt: 0.15,
      a: { text: 'was racing a pigeon. it won.', lose: 'squint' },
      b: { text: "should've texted. 5 min out, ordering your fries." },
      point: 'B', host: 'an apology *with* fries. point, Libra!' },
    { prompt: 'They ask where YOU want to eat.', first: 'A',
      a: { text: 'GREEN!! they asked!', flag: 'G' },
      b: { text: '…can I get back to you?', flag: 'GR', mood: 'wide', lose: 'happy' },
      point: 'A', host: 'fast *and* kind. point, Aries!' },
    { prompt: 'Your date is nervous and talks nonstop.', first: 'A',
      a: { text: "let them finish. I'm practicing." },
      b: { text: 'match their pace. then ask about their dog.' },
      point: 'both', host: 'both kind. *both* score!' },
  ],
  last: "Two winners. *That's* the game.",
  talk: 'card-talk-2.png',
  draw(x, t) {
    // Libra can't decide how to stand: a ? flips sides above it in the intro
    if (t < 2.8) {
      const side = Math.floor(t * 2.5) % 2 ? 1 : -1
      label(x, '?', 830 + side * 70, 860, { size: 70, col: '#e163d6', font: "Inter, Arial, sans-serif", weight: 800, alpha: 1 - prog(t, 2.5, 2.8), rot: side * 0.2 })
    }
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
