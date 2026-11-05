// kdde03: DEEP DIVE: GEMINI IN LOVE (118 s vertical, star_advice post, music: pop · B). Hard cut.
// The look lives in ../../kdde01/scenes/divekit.js. Frame 0: Gemini mid-dive talking into two phones at once.
// Chapters: forty questions · banter · the lens (mutable air, Mercury) · a mind to play with · room to change their mind ·
// curiosity back (talk card) · the fast talk-it-out · the better way ("joke, or real?") · the real answer · 2 a.m. "one
// more thing" · keep it new · two sides, one heart · the chest: "curious, funny, never boring."
import { makeDive, icon, bubbleTxt } from '../../kdde01/scenes/divekit.js'

const EP = makeDive({
  id: 'kdde03', sign: 'gemini', name: 'Gemini', article: 'a', D: 118, accent: '#ffd23a',
  hook: 'Loving a Gemini: | never *one* conversation.',
  hookPose: (x, t, P) => { icon(x, 'phone', P.x - 190, P.y - 20, 12, { rot: -0.3 }); icon(x, 'phone', P.x + 190, P.y - 20, 12, { rot: 0.3 })
    bubbleTxt(x, t, P.x - 230, P.y - 170, -2, 0.85, 'and ANOTHER thing—', { size: 30, tail: 0.4 }); bubbleTxt(x, t, P.x + 220, P.y - 240, -2, 0.85, 'wait so—', { size: 30, tail: -0.4 }) },
  lens: { element: 'air', mode: 'mutable', ruler: 'Mercury' },
  chapters: [
    { beats: [
      { type: 'chat', head: 'They flirt by *talking.*', title: '♊︎ them', gap: 0.7, msgs: [['L', 'ok question'], ['L', 'favourite smell?'], ['L', 'worst haircut?'], ['L', 'would you rather—'], ['R', 'is this an interview?'], ['L', 'yes. next question']],
        say: ['a Gemini flirts with *questions.* forty of them, minimum.'] },
      { type: 'duo', head: 'Banter is a *love language.*', sayA: 'you’re trouble.', sayB: 'takes one to know one.', moodB: 'happy', icon: 'chat', iconAt: 2.0,
        say: ['banter is how they test the spark: can you keep *up?*', "P: they're so quick. I'm still on the first *joke.*"] },
      { type: 'lens', head: 'Air sign. Ruled by *Mercury.*',
        say: ['through the stars: a *mutable air* sign. curious, quick.', 'ruled by *Mercury*, the messenger. of course they talk.'] },
    ] },
    { beats: [
      { type: 'list', head: 'They need a *mind* to play with.', title: 'WHAT A GEMINI NEEDS', items: ['a good friendly debate', 'a new idea every week', 'someone who asks back'],
        say: ['they need a *mind* to play with, not just a face to look at.'] },
      { type: 'duo', head: 'Room to change their *mind.*', sayA: 'sushi. no, tacos. no—', sayB: 'take your time.', moodA: 'wide', moodB: 'happy', icon: 'heart', iconAt: 4.0,
        say: ['let them change their mind without making it a *crime.*'] },
      { type: 'card', head: 'And curiosity, *back.*', q: 'What’s something you changed your mind about?',
        say: ['ask them back. curiosity is how a Gemini feels *loved.*', "P: I'd answer that one for three *hours.*"] },
    ] },
    { beats: [
      { type: 'meter', head: 'They talk it out, *fast.*', label: 'WORDS/MIN', hi: 'MANY', lo: 'FEW', curve: [[0, 0.2], [1.2, 1], [4.5, 1], [6, 0.3]],
        say: ['a Gemini fights with *words.* so many words.', 'P: and a joke in the middle. to *dodge.*'] },
      { type: 'better', head: 'The *better* way.', bad: 'laugh it off and change the subject', good: 'ask gently: "joke, or real?" then listen',
        say: ['ask *"joke, or real?"* then really listen to the second answer.'] },
      { type: 'duo', head: 'The *real* answer.', sayA: 'real. it hurt a little.', sayB: 'thank you for telling me.', moodA: u => u < 3.4 ? 'neutral' : 'happy', icon: 'hug', iconAt: 4.2,
        say: ['under the jokes is a real feeling. make it safe to *say.*'] },
    ] },
    { beats: [
      { type: 'chat', head: 'They stay for the *talk.*', title: '♊︎ them', gap: 0.9, msgs: [['L', 'ok one more thing'], ['R', 'it’s 2 a.m.'], ['L', 'I know. I just like talking to you'], ['R', 'me too. go on.']],
        say: ['what keeps a Gemini? being their favourite person to *talk* to.'] },
      { type: 'list', head: 'Keep it *new.*', title: 'GEMINI DATE IDEAS', items: ['a class neither of you can do', 'a new street, no map', 'a debate over dessert'],
        say: ['new things together: a class, a street, a *question.*', "P: a debate date?? I'd cry. *happily.*"] },
      { type: 'duo', head: 'Two sides. *One* heart.', sayA: 'both of me like you.', sayB: 'lucky me, twice.', moodA: 'sparkle', icon: 'heart', iconAt: 4.0,
        say: ['restless? sometimes. but loyal to whoever keeps them *curious.*'] },
    ] },
  ],
  payoff: { pisces: 'ok one more thing: is it *treasure?*', say: 'the bottom of a Gemini heart: *curious, funny, never boring.*' },
  last: 'Be the chat they *never* mute.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
