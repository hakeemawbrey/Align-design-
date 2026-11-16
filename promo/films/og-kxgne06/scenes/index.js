// og-kxgne06: social rework of kxgne06 ("Sagittarius vs Pisces: Crush Confession", the full game, ≈ 115 s, dreamy · F).
// Static HOOK (outline) 0–3.5 replaces the slam-title hook; set, timeline and sound in ../fullgame.js (the OG social copy
// of the full-game kit). Crazier lines: Pisces sobs onto its buzzer all game and writes a 40-page poem; Sagittarius
// confesses mid-jump and books a trip in the same breath.
//   10 R1 → both · 30 R2 → both · 50 R3 → both · 70 LIGHTNING · 90 FINAL ×2 → both
//   110    Sagittarius 9–8. THE STARS: "Say it. *Then* cry."  Hard cut on the last line.
import { makeFullGame, label, prog, FIN } from '../fullgame.js'

export const HOOK = 'Confess your crush. | Pisces: *sobbing.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

const EP = makeFullGame({
  id: 'og-kxgne06',
  A: { sign: 'sagittarius', stat: 'crushes this year: 1 (HUGE)', intro: { mood: 'sparkle', look: [0.6, -0.4] },
    dy: t => (t > -0.6 && t < 1.7 ? -300 * Math.sin(Math.PI * (t + 0.6) / 2.3) : 0) },
  B: { sign: 'pisces', stat: 'tissues: 9 boxes', intro: { mood: 'wide', look: [0, -0.6], buzz: true }, cry: [[0, 3], [4, 2], [12, 3], [16, 2], [92, 3], [FIN, 3]] },
  hook: '',
  accent: '#b48cff',
  welcome: 'crush night. the buzzer is *wet.*',
  rounds: [
    { prompt: 'I have to tell you something. I ___', first: 'A', buzzAt: 1.4,
      a: { text: '…booked a trip to a volcano! also I like you. bye!' },
      b: { text: 'really like you. (sob) (sob) (SOB) that’s it.' },
      point: 'both', gag: 'AUDIENCE: AWWW', host: 'you both *said it.* both score!', cam: '(sobbing) they SAID it' },
    { prompt: 'They laugh at your jokes. Even the bad ones.', first: 'B',
      a: { text: 'GREEN. or they’re polite. ask them!', flag: 'G' },
      b: { text: 'GREEN. (crying) that’s marriage.', flag: 'G' },
      point: 'both', gag: 'AUDIENCE: (laughs)', host: 'bad jokes, *good* sign. both!', cam: '(sobbing) my jokes are bad too' },
    { prompt: 'Your crush likes someone else.', first: 'A',
      a: { text: 'be sad. hike a mountain. two mountains. be okay.' },
      b: { text: 'cry for a week. soup. wish them well.' },
      point: 'both', gag: 'AUDIENCE: (sniffles)', host: 'sad *and* kind. both score!', cam: '(sobbing) soup helps' },
  ],
  lightning: [
    { prompt: 'Text them first?', a: { text: 'GREEN. go!', flag: 'G' }, b: { text: 'GREEN. (shaking violently)', flag: 'G' }, point: 'both' },
    { prompt: 'Scroll their whole friends list?', a: { text: 'RED. outside instead.', flag: 'R' }, b: { text: 'RED. …RED.', flag: 'R' }, point: 'both' },
    { prompt: 'Write them a poem?', a: { text: 'GREEN. a short one. like, four words.', flag: 'G' }, b: { text: 'GREEN. 40 pages. (sobbing)', flag: 'G' }, point: 'both' },
    { prompt: 'Tell the group chat before them?', a: { text: 'RED. tell THEM first!', flag: 'R' }, b: { text: '…already did.', flag: 'GR', mood: 'squint' }, point: 'A' },
  ],
  final: { prompt: 'They say: “I like you too.”', first: 'B',
    a: { text: 'WAIT. REALLY? coffee, Saturday? I’ll drive. I’ll RUN.', mood: 'sparkle' },
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
