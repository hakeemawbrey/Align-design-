// kxgne01: STAR TALK GAME NIGHT: FULL GAMES, Ep 1, "Aries vs Cancer: The Read Receipt Final" (≈ 115 s vertical,
// music: funk · Am). The feeling: being left on read. The set, timeline and sound live in ../fullgame.js.
//   0.0    frame 0: Aries slammed its buzzer so hard the dome went flying (mid-air, spinning); Cancer mid-sob with
//          a phone that says "Read 12:04". Hook slammed: "Left on read. *Now* it's a game."  0.5 record scratch.
//   1.25   THE STARS welcome; 3.5 the promise "wait for the final. it's worth *double.*" (sticker docks top-right)
//   6 / 8  name cards: ARIES (patience: loading…) · CANCER (tissues packed: 3 boxes)
//   10     R1 FINISH THE TEXT "sorry, just saw this! ___" → Cancer   30  R2 GREEN OR RED → both   50  R3 WWYD → both
//   70     LIGHTNING: four quick calls → all both                       90  THE FINAL ×2 → both
//   110    Cancer 9–8. Prize: a talk card. THE STARS: "Late replies still *count.*"  Hard cut.
import { makeFullGame, drawPhone, flyingDome, label, prog, outK, FIN } from '../fullgame.js'

const EP = makeFullGame({
  id: 'kxgne01',
  A: { sign: 'aries', stat: 'patience: loading…', intro: { mood: 'wide', look: [0.2, -1], buzz: true }, domeOff: [0, 1.7] },
  B: { sign: 'cancer', stat: 'tissues packed: 3 boxes', intro: { mood: 'wide', look: [0, 0.6] }, cry: [[0, 3], [3.2, 0], [93, 1], [96, 2], [FIN, 0]] },
  hook: 'Left on read. | *Now* it’s a game.',
  accent: '#c7d3e6',
  scratch: 'read at 12:04. *no reply.*',
  welcome: 'game night. *full game!*',
  rounds: [
    { prompt: 'sorry, just saw this! ___', first: 'A', buzzAt: 1.4,
      a: { text: 'cool cool cool. RACE YOU TO SATURDAY?', lose: 'squint' },
      b: { text: 'no worries! how was your day?' },
      point: 'B', gag: 'AUDIENCE: awww', host: 'a reply *with* a question. point, Cancer!', cam: '(sobbing) they asked about their DAY' },
    { prompt: 'They reply hours later, but properly.', first: 'A',
      a: { text: 'RED. hours?? I aged.', flag: 'R', mood: 'wide', then: { at: 7.6, text: '…GREEN. a real reply wins.', flag: 'G', mood: 'happy' } },
      b: { text: 'GREEN. a paragraph means they care.', flag: 'G' },
      point: 'both', host: 'slow and real *counts.* both score!', cam: '(sobbing) a whole PARAGRAPH' },
    { prompt: 'You’ve been left on read since lunch.', first: 'B',
      a: { text: 'fourteen more texts. no. a run. phone stays home.' },
      b: { text: 'assume they’re busy. call a friend.' },
      point: 'both', gag: 'AUDIENCE: oooh', host: 'phone *down*, life on. both score!', cam: '(sobbing) call your friends!!' },
  ],
  lightning: [
    { prompt: 'Reply with just “k”?', a: { text: 'RED. never.', flag: 'R' }, b: { text: 'RED. use words.', flag: 'R' }, point: 'both' },
    { prompt: 'Text “home safe?” after a date?', a: { text: 'GREEN!!', flag: 'G' }, b: { text: 'GREEN. always.', flag: 'G' }, point: 'both' },
    { prompt: 'Check if they’re online 40 times?', a: { text: 'RED. once. then outside.', flag: 'R' }, b: { text: 'RED. bath instead.', flag: 'R' }, point: 'both' },
    { prompt: 'Send the meme you saved for them?', a: { text: 'GREEN. ALL OF THEM.', flag: 'G' }, b: { text: 'GREEN. they’ll laugh.', flag: 'G' }, point: 'both' },
  ],
  final: { prompt: 'They finally text back: “sorry. rough week.”', first: 'A',
    a: { text: 'rough week? what snacks do you need?' },
    b: { text: 'no sorry needed. here if you want to talk.', mood: 'happy' },
    point: 'both', gag: 'AUDIENCE: AWWWW', host: 'rough week? *show up.* double, both!', cam: '(sobbing) rough weeks END' },
  last: 'Late replies still *count.*',
  talk: 'card-talk-3.png',
  ending: 'cut',
  draw(x, t) {
    // frame 0: the flying dome; it lands back at 1.7 and stays taped up for round 1
    flyingDome(x, t, 342, 1140, -0.55, 1.7, { height: 640, drift: 150, spins: 2.6 })
    if (t >= 1.7 && t < 30) {
      x.save(); x.globalAlpha = 0.9 * outK(t, [29.6, 30]); x.translate(342, 1128)
      x.fillStyle = '#e8d9b0'; x.rotate(0.5); x.fillRect(-34, -6, 68, 12); x.rotate(-1); x.fillRect(-34, -6, 68, 12)
      x.restore()
    }
    if (t >= 1.7 && t < 2.6) label(x, 'TAPED.', 342, 1060 - 30 * prog(t, 1.7, 2.6), { size: 34, col: '#e8d9b0', alpha: 1 - prog(t, 2.2, 2.6) })
    // Cancer's phone: "Read 12:04"
    if (t < 6.1) drawPhone(x, t, 1010, 1010 + 6 * Math.sin(t * 9), outK(t, [5.8, 6.1]), { lines: ['Read', '12:04', '…'], rot: 0.12, col: '#9fd8f6', w: 110, h: 190, size: 24 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
