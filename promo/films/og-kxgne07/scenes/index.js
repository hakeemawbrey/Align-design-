// og-kxgne07: social rework of kxgne07 ("Leo vs Scorpio: Advice, Reversed", the full game, ≈ 116 s, house · G).
// Static HOOK (box) 0–3.5 replaces the slam-title hook; set, timeline and sound in ../fullgame.js (the OG social copy of
// the full-game kit). The ticker runs past the frame edges (the set is drawn scaled). Crazier lines: Leo has given
// 10,000 pieces of advice and taken zero; Scorpio stares at the phone like it owes rent.
//   10 R1 → Scorpio · 30 R2 → both · 50 R3 → both · 70 LIGHTNING · 90 FINAL ×2 → both
//   110    Scorpio 9–7. THE STARS: "Take your *own* advice. Once."  Loops back to frame 0.
import { makeFullGame, R, box, INK, BONE, RED, MONO, INTER, clamp, prog } from '../fullgame.js'

const TICK = 'BREAKING: LOCAL STAR GIVES 10,000 PIECES OF ADVICE, TAKES ZERO  ·  FRIENDS “NOT SURPRISED”  ·  '
function ticker(x, t) {
  if (t >= 6.0) return
  const o = clamp(1 - prog(t, 5.6, 6.0)), y = 690
  x.save(); x.globalAlpha = o
  R(x, INK, -140, y - 6, 1360, 64); R(x, '#f2f2f2', -140, y, 1360, 52); box(x, -140, y, 340, 52, RED, { b: 0 })
  x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('LIVE', 70, y + 27)
  x.save(); x.beginPath(); x.rect(200, y, 1020, 52); x.clip()
  x.font = `700 30px ${MONO}`; x.fillStyle = INK
  const w = x.measureText(TICK).width, off = ((t + 2) * 260) % w
  for (let k = 0; k < 3; k++) x.fillText(TICK, 220 - off + k * w, y + 27)
  x.restore(); x.restore()
}
function scroll(x, t) {
  if (t >= 6.0) return
  const o = clamp(1 - prog(t, 5.6, 6.0)), len = 260 + 30 * Math.sin(t * 3)
  x.save(); x.globalAlpha = o
  // the scroll unrolling from Leo's point down over the podium front to the floor
  R(x, INK, 64, 1080, 92, len); R(x, '#f4ead2', 70, 1084, 80, len - 8)
  for (let i = 0; i < Math.floor(len / 26); i++) R(x, i % 4 === 3 ? RED : '#8a7f9e', 80, 1100 + i * 26, i % 3 === 2 ? 40 : 60, 5)
  box(x, 56, 1066, 108, 26, '#d8c9a0', { b: 4 })
  x.font = `800 20px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('MY ADVICE', 110, 1080)
  // the mic in Leo's other point
  R(x, INK, 370, 960, 16, 90); R(x, '#5a5470', 374, 964, 8, 82); box(x, 358, 920, 40, 44, '#cfd3e6', { b: 5 })
  x.restore()
}

export const HOOK = 'Great advice. | *Never* taken.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

const EP = makeFullGame({
  id: 'og-kxgne07',
  A: { sign: 'leo', stat: 'advice given: 10,000', intro: { mood: 'wide', look: [1, -0.2], squash: -0.06 } },
  B: { sign: 'scorpio', stat: 'advice taken: 0', intro: { mood: 'squint', look: [0, -1] } },
  hook: '',
  accent: '#ffb347',
  welcome: 'tonight the advice is *for them.*',
  rounds: [
    { prompt: 'you told a friend “don’t text them.” now they text YOU. you: ___', first: 'A', buzzAt: 1.4,
      a: { text: '“heyyyyyy” …wait. no. NO. (already sent)', mood: 'wide', lose: 'squint' },
      b: { text: 'nothing. my own advice. (staring at the phone like it owes me rent)' },
      point: 'B', gag: 'AUDIENCE: (gasps)', host: 'your *own* advice. point, Scorpio!', cam: '(sobbing) so STRONG' },
    { prompt: 'You tell everyone “communicate!” You haven’t.', first: 'B',
      a: { text: 'RED. I communicate. LOUDLY. through a megaphone. not clearly.', flag: 'R' },
      b: { text: 'RED. guilty. calling them after this. maybe. probably.', flag: 'R' },
      point: 'both', gag: 'AUDIENCE: (laughs)', host: 'guilty *and* honest. both!', cam: '(sobbing) CALL THEM' },
    { prompt: 'Your advice saved a friend. Your own life: chaos.', first: 'A',
      a: { text: 'take a bow. take three bows. then take the advice.' },
      b: { text: 'ask that friend for advice back.' },
      point: 'both', gag: 'AUDIENCE: (claps)', host: 'advice goes *both* ways. both!', cam: '(sobbing) friends HELP friends' },
  ],
  lightning: [
    { prompt: 'Sleep before replying?', a: { text: 'GREEN. 14 hours of beauty sleep.', flag: 'G' }, b: { text: 'GREEN. always.', flag: 'G' }, point: 'both' },
    { prompt: 'Say “I’m fine” when you’re not?', a: { text: 'RED. say it.', flag: 'R' }, b: { text: 'RED. …noted. in my secret notebook.', flag: 'R' }, point: 'both' },
    { prompt: 'Ask a friend for help?', a: { text: 'GREEN!!', flag: 'G' }, b: { text: '…GREEN.', flag: 'G' }, point: 'both' },
    { prompt: 'Ignore your own red flags?', a: { text: 'what flags?', flag: 'GR', mood: 'squint' }, b: { text: 'RED. I see them now.', flag: 'R' }, point: 'B' },
  ],
  final: { prompt: 'Read the advice you’d give your best friend. Out loud. To yourself.', first: 'B',
    a: { text: 'you’re enough without the spotlight.', mood: 'happy' },
    b: { text: 'you deserve someone who texts back.' },
    point: 'both', gag: 'AUDIENCE: (sobbing, all of it)', host: 'best advice? *yours.* double, both!', cam: '(sobbing) say it AGAIN' },
  last: 'Take your *own* advice. Once.',
  talk: 'card-talk-1.png',
  ending: 'loop',
  draw(x, t) { scroll(x, t); ticker(x, t) },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
