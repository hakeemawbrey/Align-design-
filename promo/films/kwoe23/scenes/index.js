// kwoe23: WHICH ONE ARE YOU? · "The Whole Situationship" (60 s trial reel, synthwave · Em, hard cut).
// The long format lives in kwoe01/scenes/wokit.js (makeWhichLong). "Keep count. Your verdict's at the end."
//   Number N is always the same type: 1 the Overthinker · 2 the Cool One · 3 the Honest One · 4 the Romantic.
//   R1 The first text · R2 The slow reply · R3 The cancelled plan · R4 Meeting their friends · R5 The talk ·
//   R6 The answer. Then the verdict, one warm line per type, and Pisces (#5 in every round, crying harder each time):
//   "Mostly 5s? Same. Tissues are on us."  Hard cut.
import { makeWhichLong, simplePanel as S, phone, chat, card, glow, hearts, clock, mirror, couch, desk, laptop, sandwich, mug, pillow, bed, windowFrame, sweat, actionLines, sparkles, drawBits, HEART, drawStarChar, R, box, osc, saw, prog, clamp, lerp, BONE, GOLD, PINK, INK, MINT, BLUE, INTER } from '../../kwoe01/scenes/wokit.js'

const them = (x, t, X = 390, Y = 360, s = 110, mood = 'happy') => drawStarChar(x, X, Y, s, t, { color: '#f7a6c8', mood, look: [-1, 0], seed: 81, glow: 0.6, tips: false })
const ph = (msgs, X = 360, Y = 300, s = 1.05) => (x, t) => phone(x, X, Y, { s, glowA: 0.25, screen: (x, w, h) => chat(x, w, h, msgs) })
const friends = (x, t) => { for (const [X, c, sd] of [[300, '#7fd0ff', 91], [380, '#ffb36b', 92], [450, '#c9a6ff', 93]]) drawStarChar(x, X, 380, 90, t, { color: c, mood: 'happy', look: [-1, 0], seed: sd, glow: 0.4, tips: false }) }

const ROUNDS = [
  { title: 'The first text', line: 'You want to | *text first.*', panels: [
    { sign: 'virgo', bg: 'night', caption: 'drafts it *in the notes app* first', draw: S({ star: { mood: 'squint' }, back: ph([{ me: true, text: 'draft 9: hey :)' }]), think: 'is ":)" too much?', sayY: 110 }) },
    { sign: 'capricorn', bg: 'office', caption: 'waits for *them* to text', draw: S({ star: { mood: 'neutral', look: [0, 0] }, back: (x, t) => clock(x, 370, 120, `${9 + Math.floor(t % 3)}:00`, { col: MINT, s: 0.8 }), say: 'they’ll text. eventually.', sayY: 470, size: 23 }) },
    { sign: 'aries', bg: 'cafe', caption: 'texts *"I liked meeting you"*', draw: S({ star: { mood: 'sparkle' }, back: ph([{ me: true, text: 'I liked meeting you!' }]), say: 'sent. no notes.', sayY: 110 }) },
    { sign: 'cancer', bg: 'bedroom', caption: 'writes them *a little poem*', draw: S({ star: { mood: 'heart' }, back: (x, t) => { card(x, 360, 290, 170, 150, 'roses r red\nyou r nice\nmeet again?', { size: 20, rot: 0.06 }); hearts(x, t, 0, 360, 200, { n: 3, loop: 1.2 }) } }) },
  ] },
  { title: 'The slow reply', line: 'They take *a day* | to reply.', panels: [
    { sign: 'gemini', bg: 'dark', caption: 'builds *seven theories*', draw: S({ star: { mood: 'wide' }, back: (x, t, P) => { for (let i = 0; i < 4; i++) { const k = P.u < 0 ? 0 : clamp(P.u * 3 - i * 0.6); if (k > 0) card(x, 330 + (i % 2) * 70, 120 + i * 70, 150, 50, ['lost phone?', 'shy?', 'abroad??', 'hates me?'][i], { size: 18, rot: (i % 2 ? 0.1 : -0.1) }) } } }) },
    { sign: 'taurus', bg: 'bedroom', caption: 'didn’t notice. *Napping.*', draw: S({ star: { mood: 'sleepy', look: [0, 0], squash: 0.08, y: 360 }, back: (x) => bed(x, 10, 480, 460, { col: '#e9b24a' }), floorCol: null }) },
    { sign: 'sagittarius', bg: 'street', caption: 'asks *"busy week?"*', draw: S({ star: { mood: 'happy' }, back: ph([{ me: false, text: 'sorry! late reply' }, { me: true, text: 'busy week? all good' }]) }) },
    { sign: 'leo', bg: 'stage', caption: 'assumes they’re *writing a love letter*', draw: S({ star: { mood: 'sparkle', look: [1, -0.5] }, think: 'it must be LONG.', sayY: 110, back: (x, t) => hearts(x, t, 0, 360, 300, { n: 5, loop: 1.4 }) }) },
  ] },
  { title: 'The cancelled plan', line: 'They *cancel* | last minute.', panels: [
    { sign: 'scorpio', bg: 'dark', caption: 'replays *every word* they said', draw: S({ star: { mood: 'squint', blink: false }, back: (x, t) => { for (let i = 0; i < 3; i++) R(x, 'rgba(201,166,255,0.6)', 300, 140 + i * 50, 120 - i * 20, 14) }, say: '"something came up"… what?', sayY: 470, size: 22 }) },
    { sign: 'aquarius', bg: 'blue', caption: '*"cool, rain check"* and means it', draw: S({ star: { mood: 'happy' }, back: ph([{ me: false, text: 'so sorry, can’t tonight' }, { me: true, text: 'cool, rain check!' }]) }) },
    { sign: 'libra', bg: 'cafe', caption: '*"bummer! Thursday?"*', draw: S({ star: { mood: 'neutral' }, back: (x) => card(x, 360, 200, 150, 120, 'THU\n7 pm?', { size: 28, col: MINT }), say: 'no stress. thursday?', sayY: 470, size: 24 }) },
    { sign: 'cancer', bg: 'bedroom', caption: 'sends *"no worries ♥"*', draw: S({ star: { mood: 'heart' }, back: ph([{ me: true, text: 'no worries ♥ rest up' }]) }) },
  ] },
  { title: 'Meeting their friends', line: 'Meeting | *their friends.*', panels: [
    { sign: 'virgo', bg: 'party', caption: 'memorised *everyone’s names*', draw: S({ star: { x: 130, mood: 'squint' }, back: (x, t) => { friends(x, t); card(x, 370, 170, 170, 110, 'Sam: dogs\nJo: jazz\nKit: tacos', { size: 18, rot: 0.06 }) } }) },
    { sign: 'sagittarius', bg: 'party', caption: 'plays it cool *by the snacks*', draw: S({ star: { x: 120, mood: 'neutral', look: [1, 0] }, back: (x, t) => { friends(x, t); sandwich(x, 160, 420, 0.8) }, say: 'sup.', sayX: 140, sayY: 150 }) },
    { sign: 'taurus', bg: 'party', caption: '*"I’m nervous! hi!"*', draw: S({ star: { x: 130, mood: 'happy' }, back: friends, say: 'I’m nervous! hi!', sayY: 150 }) },
    { sign: 'libra', bg: 'party', caption: 'already planning *a group trip*', draw: S({ star: { x: 130, mood: 'sparkle' }, back: (x, t) => { friends(x, t); card(x, 360, 170, 170, 90, 'GROUP TRIP\nspring?', { size: 20, col: GOLD }) } }) },
  ] },
  { title: 'The talk', line: 'Time for | *the talk.*', panels: [
    { sign: 'gemini', bg: 'bedroom', caption: 'rehearses *both sides* in the mirror', draw: S({ star: { x: 150, mood: 'wide' }, back: (x, t) => { mirror(x, 360, 280, 160, 300); drawStarChar(x, 360, 300, 120, t, { color: '#f2d36b', mood: 'squint', look: [-1, 0], seed: 95, glow: 0.3, alpha: 0.7 }) }, say: '"so… what are we?"', sayY: 470, size: 24 }) },
    { sign: 'capricorn', bg: 'cafe', caption: 'shrugs: *"we’ll see"*', draw: S({ star: { mood: 'neutral' }, back: (x, t) => them(x, t), say: 'we’ll see.', sayY: 110 }) },
    { sign: 'aries', bg: 'cafe', caption: '*"I like you. You?"*', draw: S({ star: { mood: 'sparkle' }, back: (x, t) => them(x, t, 390, 360, 110, 'wide'), say: 'I like you. you?', sayY: 110 }) },
    { sign: 'leo', bg: 'stage', caption: 'brings *a speech* and a candle', draw: S({ star: { mood: 'sparkle' }, back: (x, t) => { them(x, t, 400, 380, 100, 'heart'); R(x, BONE, 300, 400, 14, 50); glow(x, 307, 392, 50, '255,220,150', 0.5 + 0.2 * osc(t, 3)); R(x, GOLD, 302, 384, 10, 14) }, front: (x) => card(x, 240, 450, 150, 60, 'page 1 of 4', { size: 18 }) }) },
  ] },
  { title: 'The answer', line: 'They say | *"I like you too."*', panels: [
    { sign: 'scorpio', bg: 'dark', caption: 'asks *"are you sure?"* three times', draw: S({ star: { mood: 'wide' }, back: (x, t) => them(x, t, 390, 360, 110, 'happy'), say: 'sure? SURE sure?', sayY: 110 }) },
    { sign: 'aquarius', bg: 'blue', caption: '*"cool."* (screams later)', draw: S({ star: { mood: 'neutral' }, back: (x, t) => them(x, t), say: 'cool. cool cool.', sayY: 110 }) },
    { sign: 'libra', bg: 'cafe', caption: '*"me too. let’s eat!"*', draw: S({ star: { mood: 'happy' }, back: (x, t) => them(x, t, 390, 360, 110, 'heart'), say: 'me too! let’s eat!', sayY: 110 }) },
    { sign: 'taurus', bg: 'park', caption: 'plans *the next ten dates*', draw: S({ star: { mood: 'heart' }, back: (x, t) => { them(x, t, 400, 380, 100, 'heart'); card(x, 330, 170, 180, 120, '1. picnic\n2. bakery\n3. more picnic', { size: 18 }) } }) },
  ] },
]

const EP = makeWhichLong({
  id: 'kwoe23', hero: 0, flash: '#ff7eb6', deep: '#7a3aa0',
  hook: 'Keep count. | *Verdict* at the end.',
  freeze: 'grab *a pen.*',
  rounds: ROUNDS,
  verdicts: [
    '*Mostly 1s: the Overthinker.* Your care is real. Ask, don’t guess.',
    '*Mostly 2s: the Cool One.* Calm is great. Let them see you care.',
    '*Mostly 3s: the Honest One.* Keep saying it kindly. It works.',
    '*Mostly 4s: the Romantic.* Big heart. Let them earn it, too.',
  ],
  pisces: 'Mostly 5s? Same. *Tissues are on us.*',
  ending: 'cut',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
void [couch, desk, laptop, mug, pillow, windowFrame, sweat, actionLines, sparkles, drawBits, HEART, box, saw, prog, lerp, PINK, INK, BLUE, INTER]
