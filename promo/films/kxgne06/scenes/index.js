// kxgne06: STAR TALK GAME NIGHT: FULL GAMES, Ep 6, "Sagittarius vs Pisces: Crush Confession" (≈ 115 s vertical,
// music: dreamy · F). The feeling: telling a crush. Pisces plays and cries at its podium all game; Cancer sobs in
// the front row. Set + timeline: ../../kxgne01/fullgame.js.
//   0.0    frame 0: Pisces mid-sob, tears fountaining onto its buzzer, which glitches and buzzes on its own;
//          Sagittarius mid-jump high over its own podium. Hook: "Crush round. Pisces is *already* crying."
//   10 R1 → both · 30 R2 → both · 50 R3 → both · 70 LIGHTNING (Sag 4, Pisces 3) · 90 FINAL ×2 → both
//   110    Sagittarius 9–8. THE STARS: "Say it. *Then* cry."  Hard cut.
import { makeFullGame, label, prog, FIN } from '../../kxgne01/fullgame.js'

const EP = makeFullGame({
  id: 'kxgne06',
  A: { sign: 'sagittarius', stat: 'crushes this year: 1 (big)', intro: { mood: 'sparkle', look: [0.6, -0.4] },
    dy: t => (t > -0.6 && t < 1.7 ? -300 * Math.sin(Math.PI * (t + 0.6) / 2.3) : 0) },
  B: { sign: 'pisces', stat: 'tissues: whole box', intro: { mood: 'wide', look: [0, -0.6], buzz: true }, cry: [[0, 3], [4, 2], [12, 3], [16, 2], [92, 3], [FIN, 3]] },
  hook: 'Crush round. | Pisces is *already* crying.',
  accent: '#b48cff',
  scratch: 'the buzzer is *wet.*',
  welcome: 'game night. *crush edition!*',
  rounds: [
    { prompt: 'I have to tell you something. I ___', first: 'A', buzzAt: 1.4,
      a: { text: '…am going on a trip! also I like you.' },
      b: { text: 'really like you. (sob) that’s it.' },
      point: 'both', gag: 'AUDIENCE: AWWW', host: 'you both *said it.* both score!', cam: '(sobbing) they SAID it' },
    { prompt: 'They laugh at your jokes. Even the bad ones.', first: 'B',
      a: { text: 'GREEN. or they’re polite. ask them!', flag: 'G' },
      b: { text: 'GREEN. (crying) that’s love.', flag: 'G' },
      point: 'both', gag: 'AUDIENCE: (laughs)', host: 'bad jokes, *good* sign. both!', cam: '(sobbing) my jokes are bad too' },
    { prompt: 'Your crush likes someone else.', first: 'A',
      a: { text: 'be sad. go hiking. be okay.' },
      b: { text: 'cry. soup. wish them well.' },
      point: 'both', gag: 'AUDIENCE: (sniffles)', host: 'sad *and* kind. both score!', cam: '(sobbing) soup helps' },
  ],
  lightning: [
    { prompt: 'Text them first?', a: { text: 'GREEN. go!', flag: 'G' }, b: { text: 'GREEN. (shaking)', flag: 'G' }, point: 'both' },
    { prompt: 'Scroll their whole friends list?', a: { text: 'RED. outside instead.', flag: 'R' }, b: { text: 'RED. …RED.', flag: 'R' }, point: 'both' },
    { prompt: 'Write them a poem?', a: { text: 'GREEN. a short one.', flag: 'G' }, b: { text: 'GREEN. (sobbing)', flag: 'G' }, point: 'both' },
    { prompt: 'Tell the group chat before them?', a: { text: 'RED. tell THEM first!', flag: 'R' }, b: { text: '…already did.', flag: 'GR', mood: 'squint' }, point: 'A' },
  ],
  final: { prompt: 'They say: “I like you too.”', first: 'B',
    a: { text: 'WAIT. REALLY? coffee, Saturday?', mood: 'sparkle' },
    b: { text: '…', mood: 'wide', then: { at: 8.2, text: '(sobbing) yes. me too. YES.', mood: 'heart' } },
    point: 'both', host: 'a yes, *and* a plan. double, both!', cam: '(sobbing) THEY LIKE THEM TOO' },
  last: 'Say it. *Then* cry.',
  talk: 'card-talk-2.png',
  ending: 'cut',
  draw(x, t) {
    // the buzzer, soaked, glitching: BZZT on its own
    if (t < 3) for (const b of [0.1, 0.9, 1.6, 2.3]) if (t > b && t < b + 0.5) label(x, 'bzzt?', 738, 1090 - 60 * prog(t, b, b + 0.5), { size: 34, col: '#9fd8f6', alpha: 1 - prog(t, b + 0.3, b + 0.5) })
    if (t < 3) for (let i = 0; i < 6; i++) { const q = (t * 1.6 + i / 6) % 1; x.fillStyle = '#8fe3ff'; x.fillRect(740 + 30 * Math.sin(i * 2.1) - 4, 1060 + 80 * q, 8, 12) }
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
