// kdde06: DEEP DIVE: VIRGO IN LOVE (118 s vertical, star_advice post, music: jazzy · G). Hard cut.
// The look lives in ../../kdde01/scenes/divekit.js. Frame 0: Virgo mid-dive still ticking a checklist ("1. JUMP"); record
// scratch. Chapters: flirts by helping · remembers details · the lens (mutable earth, Mercury) · calm · notice the effort ·
// the inner critic (talk card) · stress turns critical · the better way ("what would make today lighter?") · they exhale ·
// notice what they do · let them rest · love in the details · the chest: "careful, devoted, true."
import { makeDive, icon, bubbleTxt } from '../../kdde01/scenes/divekit.js'

const EP = makeDive({
  id: 'kdde06', sign: 'virgo', name: 'Virgo', article: 'a', D: 118, accent: '#a8e6a0',
  hook: 'Loving a Virgo: | it’s all *details.*', rec: 'yes. *still* ticking boxes.',
  hookPose: (x, t, P) => { icon(x, 'list', P.x + 180, P.y, 13, { rot: 0.15 }); bubbleTxt(x, t, P.x + 200, P.y - 180, -2, 0.85, '1. JUMP ✓', { size: 34, tail: 0.2 }) },
  lens: { element: 'earth', mode: 'mutable', ruler: 'Mercury' },
  chapters: [
    { beats: [
      { type: 'duo', head: 'They flirt by *helping.*', sayA: 'your zip was stuck. fixed it.', sayB: 'you… fixed my jacket?', moodB: u => u < 3.4 ? 'wide' : 'heart', icon: 'wrench', iconAt: 1.6,
        say: ['a Virgo flirts with *help.* the stuck zip? already fixed.'] },
      { type: 'chat', head: 'They *remember* details.', title: '♍︎ them', gap: 0.9, msgs: [['L', 'how was the dentist?'], ['R', 'how did you remember that'], ['L', 'you said it once. tuesday.'], ['R', 'wow']],
        say: ['you said it once. they *remembered.* that is the flirt.', 'P: tuesday. they remembered *TUESDAY.*'] },
      { type: 'lens', head: 'Earth sign. Ruled by *Mercury.*',
        say: ['through the stars: a *mutable earth* sign. practical, adaptable.', 'ruled by *Mercury*: a sharp mind that notices everything.'] },
    ] },
    { beats: [
      { type: 'list', head: 'They need *calm.*', title: 'WHAT A VIRGO NEEDS', items: ['a plan they can trust', 'a tidy-ish space', 'someone steady'],
        say: ['they need *calm*: a plan, a quiet room, someone steady.'] },
      { type: 'duo', head: 'Notice the *effort.*', sayA: 'I planned the whole day.', sayB: 'I noticed. thank you.', moodA: u => u < 3.4 ? 'neutral' : 'sparkle', icon: 'list', iconAt: 1.6,
        say: ['notice the effort, out loud. it means more than you *know.*', 'P: they planned snacks for the *snacks.*'] },
      { type: 'card', head: 'Be gentle with the *critic.*', q: 'What are you proud of this week?',
        say: ['their loudest critic lives inside. be the *kind* voice.'] },
    ] },
    { beats: [
      { type: 'meter', head: 'Stress turns *critical.*', label: 'STRESS', hi: 'FIX IT', lo: 'FINE', curve: [[0, 0.1], [2.5, 0.9], [6, 0.9]],
        say: ['stressed, a Virgo gets critical. of you, of *themselves.*', 'P: they alphabetised the *argument.*'] },
      { type: 'better', head: 'The *better* way.', bad: 'list every mistake, one by one', good: 'ask: "what would make today lighter?"',
        say: ['ask what would make today *lighter.* then do that.'] },
      { type: 'duo', head: 'They *exhale.*', sayA: 'honestly? just sit with me.', sayB: 'done. phones away.', moodA: u => u < 3.4 ? 'neutral' : 'happy', icon: 'tea', iconAt: 4.0,
        say: ['sometimes the fix is just sitting together. no *list.*'] },
    ] },
    { beats: [
      { type: 'list', head: 'Notice what they *do.*', title: 'VIRGO LOVE, NOTICED', items: ['refilled your water', 'packed your charger', 'remembered the allergy'],
        say: ['what keeps a Virgo? you notice the quiet things they *do.*'] },
      { type: 'duo', head: 'Let them *rest.*', sayA: 'I didn’t do anything today.', sayB: 'good. you deserved that.', moodA: u => u < 3.4 ? 'neutral' : 'sparkle', icon: 'moon', iconAt: 4.0,
        say: ['let them rest without earning it. that is *love* to them.', 'P: "you deserved that." oh no. oh *NO.*'] },
      { type: 'chat', head: 'Love in the *details.*', title: '♍︎ them', gap: 0.9, msgs: [['R', 'got your favourite tea'], ['L', 'the exact one?'], ['R', 'the exact one.'], ['L', 'you’re the best']],
        say: ["meet their details with yours. they'll *notice.* always."] },
    ] },
  ],
  payoff: { pisces: 'it’s organised. is it *treasure?*', say: 'the bottom of a Virgo heart: *careful, devoted, true.*' },
  last: 'Notice the little things. *They* always do.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
