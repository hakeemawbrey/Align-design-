// ngne13: STAR TALK GAME NIGHT, Ep 13 "Aries Buzzes Before the Question" (36 s vertical, promo/films/next30/b08.md,
// music: funk · E). Fire night: ♈ Aries × ♌ Leo. The show lives in ../gamekit.js (shared by ngne13–ngne24).
//   0.0   hook "Two fire signs. | One *buzzer.*" Aries is mid-slam on its buzzer (BZZT!) at frame 0; Leo mid-pose.
//   3.4   R1 Finish the text: "my interview went badly." Aries buzzes before the prompt even lands:
//         "who do I need to talk to??" vs Leo "proud you went. want company tonight?" → +1 Leo.
//   10.5  R2 Green or red: "They hype you up louder than they hype themselves." Both GREEN → +1 each.
//   17.6  R3 What would you do: "Your date is nervous and talking really fast." Both kind → +1 each.
//   24.7  Leo 3, Aries 2: Leo wins KINDEST; Aries claps (and it's a good clap).
import { makeGame } from '../gamekit.js'

const EP = makeGame({
  id: 'ngne13', ep: 13, a: 'aries', b: 'leo', accent: '#ff8a3d', hookBuzz: 'a',
  hookMood: { a: 'wide', b: 'sparkle' },
  hook: 'Two fire signs. | One *buzzer.*',
  intro: 'kindest answer wins. *not* the fastest.',
  rounds: [
    { prompt: 'my interview went badly.', buzz: 'a', early: true,
      a: { text: '“who do I need to talk to??”', mood: 'wide' },
      b: { text: '“proud you went. want company tonight?”' },
      win: 'b', line: 'Aries, they wanted *comfort*, not a plan.' },
    { prompt: 'They hype you up louder than they hype themselves.', buzz: 'b',
      a: { flag: 'green', text: 'and I’d hype them back louder.' },
      b: { flag: 'green', text: 'finally, someone at my level.' },
      win: 'ab', line: 'two greens. this podium is *warm.*' },
    { prompt: 'Your date is nervous and talking really fast.', buzz: 'a',
      a: { text: 'Slow down with them. No rush, no buzzer.' },
      b: { text: 'Hand them the spotlight. Ask about them.' },
      win: 'ab', line: 'Aries said *no buzzer.* we’re so proud.' },
  ],
  final: 'And the kindest | is… *Leo!*',
  last: 'Fast is fun. *Kind* wins the night.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
