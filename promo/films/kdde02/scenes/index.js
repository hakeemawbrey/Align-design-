// kdde02: DEEP DIVE: TAURUS IN LOVE (118 s vertical, star_advice post, music: lofi · Ab). Hard cut.
// The look lives in ../../kdde01/scenes/divekit.js. Frame 0: Taurus mid-fall off the boat on a deck chair, still holding a
// sandwich; record scratch + freeze mid-fall. Chapters: flirts with food · remembers · the lens (fixed earth, Venus) ·
// consistency · showing up · cozy (talk card) · the slow, dug-in fight · the better way (calm, then a night) · they come
// back warmer · rituals · loyalty both ways · steady is the spark · the chest: "steady, warm, forever."
import { makeDive, icon } from '../../kdde01/scenes/divekit.js'

const EP = makeDive({
  id: 'kdde02', sign: 'taurus', name: 'Taurus', article: 'a', D: 118, accent: '#7fe0a0',
  hook: 'Loving a Taurus? | It’s *slow* motion.', rec: 'yep. *mid-fall.* still snacking.',
  hookPose: (x, t, P) => { const R = (c, X, Y, w, h) => { x.fillStyle = c; x.fillRect(X, Y, w, h) }
    R('#1b1236', P.x - 150, P.y + 120, 300, 30); R('#3a7ad8', P.x - 140, P.y + 124, 280, 22); R('#1b1236', P.x - 130, P.y + 150, 14, 90); R('#1b1236', P.x + 116, P.y + 150, 14, 90)
    icon(x, 'sandwich', P.x + 170, P.y - 40, 9, { rot: 0.3 }) },
  lens: { element: 'earth', mode: 'fixed', ruler: 'Venus' },
  chapters: [
    { beats: [
      { type: 'duo', head: 'They flirt with *food.*', sayA: 'I saved you the good half.', sayB: 'the… good half?', icon: 'sandwich', iconAt: 1.5, moodB: u => u < 4 ? 'wide' : 'heart',
        say: ['a Taurus flirts with *food.* the good half is a love letter.', 'P: nobody has EVER saved me the good *half.*'] },
      { type: 'list', head: 'They *remember* everything.', title: 'A TAURUS NOTICED', items: ['your coffee order', 'the tune you hummed', 'that your hands get cold'],
        say: ['slow and steady: they notice what you like, and *keep* it.'] },
      { type: 'lens', head: 'Earth sign. Ruled by *Venus.*',
        say: ['through the stars: a *fixed earth* sign. steady ground.', 'ruled by *Venus*: comfort, beauty, good things, slowly.'] },
    ] },
    { beats: [
      { type: 'chat', head: 'They need *consistency.*', title: '♉︎ them', gap: 0.9, msgs: [['R', 'same time thursday?'], ['L', 'same time thursday.'], ['R', 'and the thursday after?'], ['L', 'always.']],
        say: ['the same plan every week? to a Taurus, that is *romance.*'] },
      { type: 'duo', head: 'Show *up.*', sayA: 'you’re here. on time.', sayB: 'I said I would.', moodA: u => u < 3.4 ? 'wide' : 'sparkle', icon: 'clock', iconAt: 1.6,
        say: ['what they need most: you do what you *said* you would.', "P: on TIME. I'm not crying, the *helmet* is."] },
      { type: 'card', head: 'And make it *cozy.*', q: 'What does a perfect lazy Sunday look like?',
        say: ['comfort is their love language: blankets, soup, no *rush.*', 'ask about the slow stuff. watch them light *up.*'] },
    ] },
    { beats: [
      { type: 'meter', head: 'They fight *slow.*', label: 'STUBBORN', hi: 'DUG IN', lo: 'CALM', curve: [[0, 0.08], [4.2, 0.92], [6, 0.94]],
        say: ['slow to anger. but once a Taurus *digs in…*', "P: …they are NOT moving. it's a *fixed* sign."] },
      { type: 'better', head: 'The *better* way.', bad: 'push harder, right now, until they give in', good: 'say it calmly, then give it a night',
        say: ['no rushing. say it calm, then give it a *night.*'] },
      { type: 'duo', head: 'They come back *warmer.*', sayA: 'I thought about it. you were right.', sayB: 'pancakes?', moodB: u => u < 3.4 ? 'neutral' : 'happy', icon: 'pancake', iconAt: 4.0,
        say: ['given time, a Taurus comes back *softer* than they left.'] },
    ] },
    { beats: [
      { type: 'list', head: 'They stay for *rituals.*', title: 'TAURUS RITUALS', items: ['sunday pancakes', 'the same booth, every time', 'a goodnight text'],
        say: ['what keeps a Taurus? little rituals that stay the *same.*'] },
      { type: 'duo', head: 'Loyalty, *both* ways.', sayA: 'I’ve got you.', sayB: 'and I’ve got you.', icon: 'heart', iconAt: 4.0,
        say: ['loyal to the bone. they need to know *you* are, too.', 'P: both ways. I need a tissue for my *helmet.*'] },
      { type: 'chat', head: 'Steady is the *spark.*', title: '♉︎ them', gap: 0.9, msgs: [['L', 'made it home?'], ['R', 'made it home.'], ['L', 'good. sleep well.'], ['R', 'you too. same time thursday.']],
        say: ['boring to some. to a Taurus, steady *is* the spark.'] },
    ] },
  ],
  payoff: { pisces: 'please be snacks. please be *treasure.*', say: 'the bottom of a Taurus heart: *steady, warm, forever.*' },
  last: 'Slow to fall. *Slower* to leave.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
