// kdde04: DEEP DIVE: CANCER IN LOVE (118 s vertical, star_advice post, music: dreamy · Db). Hard cut.
// The look lives in ../../kdde01/scenes/divekit.js. Frame 0: Cancer mid-leap off the pier with a picnic basket, sandwiches
// flying. Chapters: shy, sideways · "did you eat?" · the lens (cardinal water, the Moon) · safe · reassurance out loud ·
// home (talk card) · into the shell · the better way (stay close, no rush) · the shell opens · they remember your little
// things · make home together · soup on the stairs · the chest: "soft, loyal, home."
import { makeDive, icon } from '../../kdde01/scenes/divekit.js'

const EP = makeDive({
  id: 'kdde04', sign: 'cancer', name: 'Cancer', article: 'a', D: 118, accent: '#bfe3ff',
  hook: 'Loving a Cancer? | Bring *tissues.*',
  hookPose: (x, t, P) => { icon(x, 'basket', P.x + 175, P.y + 10, 11, { rot: 0.2 }); icon(x, 'sandwich', P.x - 200, P.y - 160, 8, { rot: -0.5 }); icon(x, 'sandwich', P.x + 120, P.y - 230, 7, { rot: 0.6 }); icon(x, 'soup', P.x - 160, P.y + 140, 7) },
  lens: { element: 'water', mode: 'cardinal', ruler: 'the Moon' },
  chapters: [
    { beats: [
      { type: 'duo', head: 'They flirt *sideways.*', sayA: 'oh! hi. didn’t see you there.', sayB: 'you walked over sideways.', actA: 'zoom', moodB: 'happy', icon: 'shell', iconAt: 2.4,
        say: ['a Cancer flirts shy and sideways. a little crab-walk *closer.*'] },
      { type: 'chat', head: '“Did you *eat?*”', title: '♋︎ them', gap: 0.8, msgs: [['L', 'did you eat today?'], ['L', 'real food?'], ['L', 'I made way too much soup'], ['R', 'is that an invite?'], ['L', '…maybe']],
        say: ['"did you eat?" is a Cancer saying *I like you.*', "P: soup. as a love letter. I *can't.*"] },
      { type: 'lens', head: 'Water sign. Ruled by the *Moon.*',
        say: ['through the stars: a *cardinal water* sign. deep feelers.', 'ruled by the *Moon*: moods that change, love that stays.'] },
    ] },
    { beats: [
      { type: 'list', head: 'They need to feel *safe.*', title: 'WHAT A CANCER NEEDS', items: ['a soft place to land', 'plans that stay plans', 'feelings never teased'],
        say: ['they need to feel *safe* before the shell opens.'] },
      { type: 'duo', head: 'Say it *out loud.*', sayA: 'are we… okay?', sayB: 'we’re more than okay.', moodA: u => u < 3.4 ? 'neutral' : 'sparkle', icon: 'heart', iconAt: 4.0,
        say: ["reassurance, out loud. they can't read it from your *face.*", 'P: I also need that. always. *forever.*'] },
      { type: 'card', head: 'A place that feels like *home.*', q: 'What smell reminds you of home?',
        say: ["they're always building a *home*: a person, a kitchen, a nook."] },
    ] },
    { beats: [
      { type: 'meter', head: 'They go into the *shell.*', label: 'SHELL', hi: 'CLOSED', lo: 'OPEN', curve: [[0, 0.1], [1.5, 0.95], [6, 0.95]],
        say: ['when a Cancer is hurt, the shell closes. quiet. far *away.*'] },
      { type: 'better', head: 'The *better* way.', bad: 'knock on the shell until they come out', good: 'sit close and say: "I’m here. no rush."',
        say: ["don't pry the shell open. stay close, and *wait.*", 'P: "no rush." two words. I\'m a *mess.*'] },
      { type: 'duo', head: 'The shell *opens.*', sayA: 'I felt left out tonight.', sayB: 'I hear you. come here.', moodA: u => u < 3.4 ? 'neutral' : 'happy', icon: 'hug', iconAt: 4.2,
        say: ["when they open up, hold it gently. that's the *trust.*"] },
    ] },
    { beats: [
      { type: 'duo', head: 'Remember the *little* things.', sayA: 'you remembered my mum’s birthday?', sayB: 'of course I did.', moodA: u => u < 3.4 ? 'wide' : 'sparkle', icon: 'gift', iconAt: 4.0,
        say: ['what keeps a Cancer? you remember *their* little things too.', "P: the MUM'S BIRTHDAY. I'm *gone.*"] },
      { type: 'list', head: 'Make *home* together.', title: 'CANCER DATE IDEAS', items: ['cook the family recipe', 'a blanket-fort movie night', 'a walk under a full moon'],
        say: ['make home together: the recipe, the fort, the *moon.*'] },
      { type: 'chat', head: 'And they *stay.*', title: '♋︎ them', gap: 0.85, msgs: [['L', 'you okay?'], ['R', 'long day'], ['L', 'coming over with soup'], ['R', 'you don’t have to'], ['L', 'already on the stairs']],
        say: ['loved well, a Cancer is the most loyal person you will *meet.*'] },
    ] },
  ],
  payoff: { pisces: 'I brought tissues. is it *treasure?*', say: 'the bottom of a Cancer heart: *soft, loyal, home.*' },
  last: 'Be their home, *too.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
