// kwoe24: WHICH ONE ARE YOU? · "Single for the Holidays" (60 s trial reel, pop · Bb, loop).
// The long format lives in kwoe01/scenes/wokit.js (makeWhichLong). "Single at the holidays? Keep count."
//   Number N is always the same type: 1 the Deflector · 2 the Honest One · 3 the Party Starter · 4 the Cozy One.
//   R1 "So, seeing anyone?" · R2 The couples' photo · R3 The kids' table · R4 The gift swap · R5 The slow dance ·
//   R6 Midnight. Then the verdict, one warm line per type, and Pisces (#5 every round, crying harder each time):
//   "Mostly 5s? Come cry with me."  Loops back to frame 0.
import { makeWhichLong, simplePanel as S, phone, card, glow, hearts, clock, couch, mug, sandwich, pillow, confetti, sparkles, actionLines, drawBits, HEART, drawStarChar, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

const fam = (x, t, X = 390, Y = 360, s = 110, c = '#e9b24a', mood = 'happy', sd = 101) => drawStarChar(x, X, Y, s, t, { color: c, mood, look: [-1, 0], seed: sd, glow: 0.5, tips: false })
const tree = (x, X = 400, Y = 300) => { for (let i = 0; i < 4; i++) { const w = 40 + i * 30; R(x, INK, X - w / 2 - 4, Y - 90 + i * 40 - 4, w + 8, 44); R(x, '#3fb08a', X - w / 2, Y - 90 + i * 40, w, 36) } R(x, '#8a6440', X - 10, Y + 70, 20, 30); drawBits(x, ['.G.', 'GGG', '.G.'], { G: GOLD }, X, Y - 110, 7) }
const lights = (x, t) => { for (let i = 0; i < 8; i++) { R(x, [GOLD, PINK, MINT, BLUE][i % 4], 20 + i * 58, 36 + 10 * Math.sin(i), 12, 12); glow(x, 26 + i * 58, 42, 34, '255,230,170', 0.12 + 0.08 * osc(t, 1.4, i * 0.3)) } }
const pie = (x, X, Y) => { R(x, INK, X - 54, Y - 24, 108, 34); R(x, '#e9b24a', X - 50, Y - 20, 100, 26); R(x, '#c0587a', X - 40, Y - 16, 80, 8) }
const kid = (x, t, X, c, sd) => drawStarChar(x, X, 390, 80, t, { color: c, mood: 'happy', look: [0, -0.4], seed: sd, glow: 0.4, tips: false })

const ROUNDS = [
  { title: 'Seeing anyone?', line: '"So… are you | *seeing anyone?*"', panels: [
    { sign: 'gemini', bg: 'cafe', caption: 'changes the subject *to the pie*', draw: S({ star: { mood: 'wide' }, back: (x, t) => { lights(x, t); fam(x, t); pie(x, 300, 450) }, say: 'have you TRIED this pie?', sayY: 120, size: 23 }) },
    { sign: 'virgo', bg: 'cafe', caption: '*"not right now, and I’m happy"*', draw: S({ star: { mood: 'happy' }, back: (x, t) => { lights(x, t); fam(x, t) }, say: 'not right now. I’m happy!', sayY: 120, size: 23 }) },
    { sign: 'leo', bg: 'stage', caption: 'turns it into *a stand-up set*', draw: S({ star: { mood: 'sparkle' }, back: (x, t) => { lights(x, t); fam(x, t, 400, 380, 100, '#e9b24a', 'happy'); R(x, INK, 262, 300, 12, 90); x.fillStyle = '#9aa4c0'; x.fillRect(254, 276, 28, 28) }, say: 'so my love life, folks…', sayY: 120, size: 23 }) },
    { sign: 'cancer', bg: 'kitchen', caption: 'hides in the kitchen *with the dog*', draw: S({ star: { x: 160, mood: 'happy' }, back: (x, t) => { drawBits(x, ['B...B', 'BBBBB', 'BWBWB', 'BBBBB', 'B.B.B'], { B: '#a07850', W: INK }, 340, 420 + 4 * Math.abs(osc(t, 2)), 12) }, say: 'we’re fine in here.', sayY: 120 }) },
  ] },
  { title: 'The couples’ photo', line: 'Time for | *the couples’ photo.*', panels: [
    { sign: 'aquarius', bg: 'wedding', caption: 'volunteers to *take the photo*', draw: S({ star: { x: 140, mood: 'happy' }, back: (x, t) => { fam(x, t, 330, 360, 90, '#ffb36b', 'happy', 111); fam(x, t, 410, 360, 90, '#7fd0ff', 'heart', 112) }, front: (x, t) => { phone(x, 220, 300, { s: 0.6, rot: 0.1 }); if (saw(t, 1.2) < 0.1) glow(x, 220, 300, 200, '255,255,240', 0.5) }, say: 'say cheese!', sayY: 120 }) },
    { sign: 'capricorn', bg: 'wedding', caption: '*"I’ll sit this one out, thanks"*', draw: S({ star: { x: 150, mood: 'neutral' }, back: (x, t) => { couch(x, 60, 520, 200, '#6b4a9a'); mug(x, 300, 430, t) }, say: 'I’ll sit this one out!', sayY: 120, size: 24 }) },
    { sign: 'sagittarius', bg: 'wedding', caption: '*photobombs it* gloriously', draw: S({ star: (P, t) => ({ x: 250, y: 280 - 40 * Math.abs(Math.sin(t * 5)), mood: 'happy', bob: 0, squash: -0.08 }), back: (x, t) => { fam(x, t, 130, 370, 100, '#ffb36b', 'wide', 113); fam(x, t, 370, 370, 100, '#7fd0ff', 'wide', 114) }, front: (x, t) => actionLines(x, t, 250, 260, 110, 150, 8, GOLD, 0.5) }) },
    { sign: 'taurus', bg: 'bedroom', caption: 'takes a selfie *with the cat*', draw: S({ star: { x: 170, mood: 'heart' }, back: (x) => drawBits(x, ['O...O', 'OOOOO', 'OWOWO', 'OOOOO', '.OOO.'], { O: '#ffb36b', W: INK }, 320, 400, 12), front: (x) => phone(x, 360, 200, { s: 0.6, rot: -0.2 }) }) },
  ] },
  { title: 'The kids’ table', line: 'You’re at | *the kids’ table.*', panels: [
    { sign: 'libra', bg: 'cafe', caption: 'jokes: *"VIP section!"*', draw: S({ star: { x: 140, mood: 'wink' }, back: (x, t) => { kid(x, t, 320, '#9fe6b0', 121); kid(x, t, 420, '#ff8fb1', 122); card(x, 370, 200, 140, 60, 'VIP', { size: 34, col: GOLD }) } }) },
    { sign: 'scorpio', bg: 'cafe', caption: '*"honestly? best table"*', draw: S({ star: { x: 140, mood: 'happy' }, back: (x, t) => { kid(x, t, 320, '#9fe6b0', 123); kid(x, t, 420, '#7fd0ff', 124) }, say: 'honestly? best table.', sayY: 120, size: 24 }) },
    { sign: 'aries', bg: 'party', caption: 'starts *a paper-hat contest*', draw: S({ star: { x: 140, mood: 'sparkle' }, back: (x, t) => { kid(x, t, 320, '#ffb36b', 125); kid(x, t, 420, '#c9a6ff', 126) }, front: (x, t) => { for (const [X, Y] of [[140, 220], [320, 330], [420, 330]]) { x.fillStyle = INK; x.beginPath(); x.moveTo(X - 34, Y); x.lineTo(X, Y - 50); x.lineTo(X + 34, Y); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.moveTo(X - 28, Y - 4); x.lineTo(X, Y - 44); x.lineTo(X + 28, Y - 4); x.fill() } } }) },
    { sign: 'cancer', bg: 'kitchen', caption: 'colours *with the kids* all night', draw: S({ star: { x: 140, mood: 'heart' }, back: (x, t) => { kid(x, t, 320, '#9fe6b0', 127); kid(x, t, 420, '#ff8fb1', 128); box(x, 220, 440, 240, 40, BONE, { b: 4 }); for (let i = 0; i < 5; i++) R(x, [PINK, MINT, GOLD, BLUE, '#ff6b7f'][i], 240 + i * 44, 448, 30, 8) } }) },
  ] },
  { title: 'The gift swap', line: 'The secret | *gift swap.*', panels: [
    { sign: 'gemini', bg: 'party', caption: 'gives *a joke gift*, fast', draw: S({ star: { mood: 'wink' }, back: (x, t) => { lights(x, t); card(x, 370, 330, 120, 110, '?', { size: 60, col: PINK }) }, say: 'it’s a rubber duck!', sayY: 120 }) },
    { sign: 'virgo', bg: 'party', caption: '*asked* what they’d like', draw: S({ star: { mood: 'happy' }, back: (x, t) => { lights(x, t); card(x, 370, 330, 120, 110, '♥', { size: 60, col: MINT }) }, say: 'I asked. it’s socks.', sayY: 120 }) },
    { sign: 'leo', bg: 'stage', caption: 'unwraps it *with a drumroll*', draw: S({ star: { mood: 'sparkle' }, back: (x, t) => { lights(x, t); card(x, 370, 330 - 20 * Math.abs(osc(t, 2)), 120, 110, '★', { size: 60, col: GOLD }) }, front: (x, t, P) => confetti(x, t, P.turn[0] + 0.8, 360, 300), say: 'drumroll please!!', sayY: 120 }) },
    { sign: 'taurus', bg: 'kitchen', caption: 'brought *homemade cookies*', draw: S({ star: { mood: 'happy' }, back: (x, t) => { box(x, 290, 380, 160, 50, '#c9a6ff', { b: 5 }); for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.beginPath(); x.arc(315 + i * 38, 372, 18, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e9b24a'; x.beginPath(); x.arc(315 + i * 38, 372, 14, 0, Math.PI * 2); x.fill() } }, say: 'baked them myself!', sayY: 120 }) },
  ] },
  { title: 'The slow dance', line: 'Couples only: | *slow dance.*', panels: [
    { sign: 'aquarius', bg: 'party', caption: '*"gotta check the snacks!"*', draw: S({ star: (P, t) => ({ x: 150 + 30 * Math.sin(t * 2), mood: 'wide' }), back: (x, t) => { fam(x, t, 370, 360, 100, '#ffb36b', 'heart', 131); sandwich(x, 380, 450, 0.8) }, say: 'gotta check the snacks!', sayY: 120, size: 24 }) },
    { sign: 'scorpio', bg: 'party', caption: 'dances *with grandma*, proudly', draw: S({ star: (P, t) => ({ x: 190, mood: 'happy', squash: 0.05 * Math.sin(t * 3) }), back: (x, t) => { fam(x, t, 320, 350, 120, '#cfc8e8', 'happy', 132); hearts(x, t, 0, 250, 220, { n: 3, loop: 1.4 }) } }) },
    { sign: 'sagittarius', bg: 'party', caption: '*solo dances* anyway', draw: S({ star: (P, t) => ({ x: 240 + 60 * Math.sin(t * 3), y: 330 - 20 * Math.abs(Math.sin(t * 6)), mood: 'happy', bob: 0 }), front: (x, t) => actionLines(x, t, 240 + 60 * Math.sin(t * 3), 310, 110, 140, 8, PINK, 0.5) }) },
    { sign: 'capricorn', bg: 'bedroom', caption: 'cosy on the couch *with cocoa*', draw: S({ star: { x: 200, y: 360, mood: 'happy', bob: 2 }, back: (x) => couch(x, 60, 520, 360, '#8a3a6a'), front: (x, t) => mug(x, 310, 400, t, '#e9b24a') }) },
  ] },
  { title: 'Midnight', line: '*Midnight.* | Everyone pairs up.', panels: [
    { sign: 'libra', bg: 'party', caption: 'starts *a group hug* instead', draw: S({ star: { x: 240, mood: 'heart' }, back: (x, t) => { fam(x, t, 110, 370, 100, '#7fd0ff', 'happy', 141); fam(x, t, 380, 370, 100, '#ffb36b', 'happy', 142) }, front: (x, t, P) => confetti(x, t, P.turn[0] + 0.2, 240, 200) }) },
    { sign: 'aries', bg: 'party', caption: 'hugs *their best friend*', draw: S({ star: { x: 190, mood: 'happy' }, back: (x, t) => fam(x, t, 330, 350, 140, '#9fe6b0', 'happy', 143), front: (x, t) => hearts(x, t, 0, 260, 220, { n: 4, loop: 1.2 }) }) },
    { sign: 'leo', bg: 'stage', caption: 'leads the cheer *from a chair*', draw: S({ star: { x: 240, y: 270, mood: 'sparkle' }, back: (x) => { box(x, 180, 380, 120, 20, '#8a6440', { b: 5 }); R(x, INK, 190, 400, 12, 80); R(x, INK, 278, 400, 12, 80) }, say: 'HAPPY NEW YEAR!!', sayY: 100 }) },
    { sign: 'taurus', bg: 'bedroom', caption: 'already *in pyjamas*, smiling', draw: S({ star: { x: 220, y: 360, mood: 'sleepy', squash: 0.08 }, back: (x) => { pillow(x, 230, 440, 260, 70, '#c9c2ff'); clock(x, 370, 110, '12:00', { col: MINT, s: 0.7 }) } }) },
  ] },
]

const EP = makeWhichLong({
  id: 'kwoe24', hero: 0, flash: '#f2c75c', deep: '#7a3aa0',
  hook: 'Single at the *holidays?* | Keep count.',
  freeze: 'here *we go.*',
  rounds: ROUNDS,
  verdicts: [
    '*Mostly 1s: the Deflector.* Jokes are fine. A true answer is braver.',
    '*Mostly 2s: the Honest One.* "Not right now, and I’m good" is a full answer.',
    '*Mostly 3s: the Party Starter.* You warm up the room. Rest counts too.',
    '*Mostly 4s: the Cozy One.* Staying in is self-care. Say yes to one plan.',
  ],
  pisces: 'Mostly 5s? *Come cry with me.*',
  ending: 'loop',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [sparkles, HEART, prog, clamp, lerp, INTER]
