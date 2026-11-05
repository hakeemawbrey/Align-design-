// kxgne02: STAR TALK GAME NIGHT: FULL GAMES, Ep 2, "Taurus vs Leo: The Label Round" (≈ 115 s vertical, music: pop · D).
// The feeling: the situationship ("so… what are we?"). The set, timeline and sound live in ../../kxgne01/fullgame.js.
//   0.0    frame 0: a card "WHAT ARE WE?" mid-slam into the marquee; Leo mid-scream (scream lines, "AAAA!"); Taurus
//          frozen mid-bite of a sandwich. Hook: "“What are we?” Buzzers *up.*"  0.5 record scratch.
//   10 R1 → Taurus · 30 R2 → both · 50 R3 → Leo · 70 LIGHTNING (Leo 4, Taurus 3) · 90 FINAL ×2 → both
//   110    Leo 8–7. THE STARS: "Honest beats *chill.*"  Hard cut.
import { makeFullGame, drawSlamCard, screamLines, FIN } from '../../kxgne01/fullgame.js'

const EP = makeFullGame({
  id: 'kxgne02',
  A: { sign: 'taurus', stat: 'snacks packed: yes', prop: 'sandwich', propUntil: 10, intro: { mood: 'wide', look: [0.6, -0.4] } },
  B: { sign: 'leo', stat: 'mirror checks: 11', intro: { mood: 'wide', look: [0, -1], buzz: true, squash: -0.12 } },
  hook: '“What are we?” | Buzzers *up.*',
  accent: '#ffb347',
  scratch: 'month three. *no label.*',
  welcome: 'game night. *full game!*',
  rounds: [
    { prompt: 'so… what are we? ___', first: 'B', buzzAt: 1.5,
      a: { text: 'I like you. I’d like to make it official.' },
      b: { text: 'a duo. a legend. a POSTER.', lose: 'squint' },
      point: 'A', gag: 'AUDIENCE: ooooh', host: 'clear *and* kind. point, Taurus!', cam: '(sobbing) they said OFFICIAL' },
    { prompt: 'They introduce you as “a friend.”', first: 'A',
      a: { text: 'RED. then I ask about it. kindly.', flag: 'R' },
      b: { text: 'RED! I am a STAR, not a friend!', flag: 'R', mood: 'wide', then: { at: 7.6, text: '…okay. ask, don’t sulk.', flag: 'R', mood: 'happy' } },
      point: 'both', host: 'ask about it. *both* score!', cam: '(sobbing) “a friend”?? OUCH' },
    { prompt: 'Three months in. Still no label.', first: 'B',
      a: { text: 'wait three more months. comfortably.', lose: 'squint' },
      b: { text: 'ask over dinner. one question, no speech.' },
      point: 'B', gag: 'AUDIENCE: (gasps)', host: 'one honest question. point, *Leo!*', cam: '(sobbing) ASK THEM' },
  ],
  lightning: [
    { prompt: 'Meet their friends?', a: { text: 'GREEN. I’ll bring dip.', flag: 'G' }, b: { text: 'GREEN!! they’ll love me.', flag: 'G' }, point: 'both' },
    { prompt: 'Spend the holidays together?', a: { text: 'GREEN. I’ll cook.', flag: 'G' }, b: { text: 'GREEN. I’ll host.', flag: 'G' }, point: 'both' },
    { prompt: 'Say “I don’t do labels” when you do?', a: { text: '…guilty. RED.', flag: 'R', mood: 'squint' }, b: { text: 'RED. be honest.', flag: 'R' }, point: 'B' },
    { prompt: 'Post them without asking?', a: { text: 'RED. ask first.', flag: 'R' }, b: { text: 'RED. …ask first.', flag: 'R' }, point: 'both' },
  ],
  final: { prompt: 'They say: “I’m not ready for a label.”', first: 'A',
    a: { text: 'thanks for being honest. I’ll think about what I need.' },
    b: { text: 'then I’ll wait forever. dramatically.', mood: 'wide', then: { at: 8.2, text: 'no. I’ll say what I need too.', mood: 'happy' } },
    point: 'both', host: 'honest *both* ways. double, both!', cam: '(sobbing) growth!! GROWTH' },
  last: 'Honest beats *chill.*',
  talk: 'card-talk-5.png',
  ending: 'cut',
  draw(x, t) {
    drawSlamCard(x, t, { at: -0.4, out: [5.5, 5.9], lines: ['WHAT ARE WE?'], col: '#ffb347', sub: 'THE QUESTION' })
    screamLines(x, t, 830, 1040, 3.0, { text: 'AAAA!', col: '#ffb347', r: 150 })
  },
})
void FIN

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
