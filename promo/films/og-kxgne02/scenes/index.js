// og-kxgne02: social rework of kxgne02 ("Taurus vs Leo: The Label Round", the full game, ≈ 115 s vertical, pop · D).
// Static HOOK (outline) 0–3.5 replaces the slam-title hook; the set, timeline and sound live in ../fullgame.js (the OG
// social copy of the full-game kit: no show bug, whip zooms, record scratch, chapter stickers, shakes or flash).
// Crazier lines: Leo wants a billboard and sulks in the rain; Taurus answers everything mid-sandwich.
//   0.0    frame 0: a card "WHAT ARE WE?" landed in the marquee; Leo mid-scream ("AAAA!"); Taurus frozen mid-bite.
//   10 R1 → Taurus · 30 R2 → both · 50 R3 → Leo · 70 LIGHTNING · 90 FINAL ×2 → both
//   110    Leo 8–7. THE STARS: "Honest beats *chill.*"  Hard cut on the last line.
import { makeFullGame, drawSlamCard, screamLines, FIN } from '../fullgame.js'

export const HOOK = '“So… what are we?” | Leo *screamed.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

const EP = makeFullGame({
  id: 'og-kxgne02',
  A: { sign: 'taurus', stat: 'snacks packed: 4 bags', prop: 'sandwich', propUntil: 10, intro: { mood: 'wide', look: [0.6, -0.4] } },
  B: { sign: 'leo', stat: 'mirror checks: 47', intro: { mood: 'wide', look: [0, -1], buzz: true, squash: -0.12 } },
  hook: '',
  accent: '#ffb347',
  welcome: 'tonight: *labels.* Leo, sit down.',
  promise: "the final is worth *double.*",
  rounds: [
    { prompt: 'so… what are we? ___', first: 'B', buzzAt: 1.5,
      a: { text: 'I like you. let’s make it official. (still chewing)' },
      b: { text: 'a duo. a legend. a BILLBOARD. of my face.', lose: 'squint' },
      point: 'A', gag: 'AUDIENCE: ooooh', host: 'clear *and* kind. point, Taurus!', cam: '(sobbing) they said OFFICIAL' },
    { prompt: 'They introduce you as “a friend.”', first: 'A',
      a: { text: 'RED. then I ask about it. calmly. after lunch.', flag: 'R' },
      b: { text: 'RED! I am a STAR, not a FRIEND!', flag: 'R', mood: 'wide', then: { at: 7.6, text: '…okay. I’ll ask. (sulking a little)', flag: 'R', mood: 'happy' } },
      point: 'both', host: 'ask about it. *both* score!', cam: '(sobbing) “a friend”?? OUCH' },
    { prompt: 'Three months in. Still no label.', first: 'B',
      a: { text: 'wait three more months. on the couch. with dip.', lose: 'squint' },
      b: { text: 'ask over dinner. one question. no spotlight.' },
      point: 'B', gag: 'AUDIENCE: (gasps)', host: 'one honest question. point, *Leo!*', cam: '(sobbing) Leo said NO SPOTLIGHT' },
  ],
  lightning: [
    { prompt: 'Meet their friends?', a: { text: 'GREEN. I’ll bring four dips.', flag: 'G' }, b: { text: 'GREEN!! they’ll adore me.', flag: 'G' }, point: 'both' },
    { prompt: 'Spend the holidays together?', a: { text: 'GREEN. I’ll cook. for 30.', flag: 'G' }, b: { text: 'GREEN. I’ll host. in a cape.', flag: 'G' }, point: 'both' },
    { prompt: 'Say “I don’t do labels” when you do?', a: { text: '…guilty. RED.', flag: 'R', mood: 'squint' }, b: { text: 'RED. be honest.', flag: 'R' }, point: 'B' },
    { prompt: 'Post them without asking?', a: { text: 'RED. ask first.', flag: 'R' }, b: { text: 'RED. …ask first. (sadly)', flag: 'R' }, point: 'both' },
  ],
  final: { prompt: 'They say: “I’m not ready for a label.”', first: 'A',
    a: { text: 'thanks for being honest. I’ll think about what I need. with a snack.' },
    b: { text: 'then I’ll wait forever. in the rain. dramatically.', mood: 'wide', then: { at: 8.2, text: 'no. I’ll say what I need too.', mood: 'happy' } },
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
