// kdde01: DEEP DIVE: ARIES IN LOVE (118 s vertical, star_advice post, music: synthwave · Em). Hard cut.
// The look lives in ./divekit.js (shared by kdde01–06): a deep-sea dive in four depths, Pisces's helmet filling with tears.
//   0–6.2      frame 0: Aries mid-cannonball off the boat ("3, 2—" never finished), spray mid-air, hook slammed on screen,
//              whip zoom · SPLASH 0.9 · Pisces jumps in crying · "everything nobody tells you…" · "wait for the bottom."
//   6.2        1 HOW THEY FLIRT: like a dare (race you to the door) · text first, text fast · the lens (cardinal fire, Mars)
//  32.2        2 WHAT THEY NEED: someone who keeps up · say it plain · and slow down (talk card)
//  58.2        3 HOW THEY FIGHT: the temper gauge (hot, then gone) · the better way (ten minutes, then talk) · over by dinner
//  84.2        4 WHAT MAKES THEM STAY: feeling chosen · cheer their wins · adventures for two
// 110.2        the sea floor: the chest rattles, opens: "loyal, brave, all in." · 117.05 the last line · hard cut 118.
import { makeDive, bubbleTxt } from './divekit.js'

const EP = makeDive({
  id: 'kdde01', sign: 'aries', name: 'Aries', article: 'an', D: 118, accent: '#ff7a5a',
  hook: 'Loving an Aries: | nobody *warns* you.',
  hookPose: (x, t) => bubbleTxt(x, t, 170, 1010, -2, 0.85, '3, 2—', { size: 40, tail: -0.3 }),
  lens: { element: 'fire', mode: 'cardinal', ruler: 'Mars' },
  chapters: [
    { beats: [
      { type: 'duo', head: 'They flirt like a *dare.*', sayA: 'race you to the door!', sayB: 'wait, what—', actA: 'zoom', moodB: u => u < 3.6 ? 'wide' : 'happy', icon: 'flag', iconAt: 2.2,
        say: ['an Aries flirts like a *dare*: fast, playful, a little competitive.', "P: they always win. it's so *cute.*"] },
      { type: 'chat', head: 'They text *first.* And fast.', title: '♈︎ them', gap: 0.75, msgs: [['L', 'hey'], ['L', 'i had fun today'], ['L', 'like a LOT'], ['R', 'haha me too'], ['L', 'great. lunch tomorrow?']],
        say: ["no games. if an Aries likes you, you'll know by *lunch.*"] },
      { type: 'lens', head: 'Fire sign. Ruled by *Mars.*',
        say: ['through the stars: a *cardinal fire* sign. a starter.', "ruled by *Mars*: they go first, so you don't have to."] },
    ] },
    { beats: [
      { type: 'list', head: 'They need someone who *keeps up.*', title: 'WHAT AN ARIES NEEDS', items: ['energy back', 'a yes to the random plan', 'a partner, not a fan'],
        say: ['they need *energy* back. a yes to the random 9 p.m. plan.'] },
      { type: 'duo', head: 'Say it *plain.*', sayA: 'so… are we good?', sayB: 'yes. I really like you.', moodA: u => u < 3.4 ? 'neutral' : 'sparkle', icon: 'heart', iconAt: 4.0,
        say: ['hints wear them out. say the real thing, *kindly* and clearly.', "P: I could never. I'd write a *poem.*"] },
      { type: 'card', head: 'And sometimes, *slow down.*', q: 'Best day of your year so far?',
        say: ['the secret? they love someone who can make them *pause.*', "a slow question, a long answer. that's an Aries *date.*"] },
    ] },
    { beats: [
      { type: 'meter', head: 'They fight *hot.*', label: 'TEMPER', curve: [[0, 0.08], [1.0, 0.95], [3.6, 0.95], [5.6, 0.08]],
        say: ["when an Aries fights, it's fast and *loud.* and then…", "P: …it's just gone?? where did it *go?*"] },
      { type: 'better', head: 'The *better* way.', bad: 'say it all right now, at full volume', good: 'ten minutes to cool off, then talk it through',
        say: ['give the fire *ten minutes.* then talk, face to face.'] },
      { type: 'duo', head: 'Over by *dinner.*', sayA: 'sorry I yelled. pasta?', sayB: 'yes. sorry too.', moodA: 'happy', moodB: u => u < 3.4 ? 'neutral' : 'happy', icon: 'soup', iconAt: 4.2,
        say: ['no grudges, no cold war. they drop the fight, and keep the *lesson.*'] },
    ] },
    { beats: [
      { type: 'duo', head: 'They stay when they feel *chosen.*', sayA: 'you picked ME?', sayB: 'every time.', moodA: u => u < 3.4 ? 'wide' : 'sparkle', moodB: 'happy', icon: 'crown', iconAt: 4.0,
        say: ['what keeps an Aries? feeling *picked.* on purpose, out loud.', "P: chosen. I'm going to need a *minute.*"] },
      { type: 'chat', head: 'Cheer their *wins.*', title: '♈︎ them', gap: 0.8, msgs: [['L', 'I GOT IT'], ['L', 'the thing!! I got it!!'], ['R', 'I KNEW IT'], ['R', 'celebrating tonight. my treat.']],
        say: ['be their *loudest* fan. they will be yours, ten times over.'] },
      { type: 'list', head: 'Make it an *adventure.*', title: 'ARIES DATE IDEAS', items: ['a sunrise hike', 'a new food, first try', 'a race home, no rules'],
        say: ['adventures for two: new places, new *firsts*, together.', 'P: and snacks. please pack *snacks.*'] },
    ] },
  ],
  payoff: { pisces: 'is it… is it *treasure?*', say: 'the bottom of an Aries heart: *loyal, brave, all in.*' },
  last: 'Race them. Then *hold* their hand.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
