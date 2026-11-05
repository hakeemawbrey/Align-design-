// kdde05: DEEP DIVE: LEO IN LOVE (118 s vertical, star_advice post, music: funk · F). Hard cut.
// The look lives in ../../kdde01/scenes/divekit.js. Frame 0: Leo mid-swan-dive under a spotlight, sunglasses flying; freeze
// frame. Chapters: flirts big · grand gestures · the lens (fixed fire, the Sun) · appreciation said out loud · loyalty ·
// play (talk card) · pride flares · the better way (love first, then the problem) · they soften fast · biggest fan · let
// them be yours · keep the spark lit · the chest: "warm, loyal, golden."
import { makeDive, icon } from '../../kdde01/scenes/divekit.js'

const EP = makeDive({
  id: 'kdde05', sign: 'leo', name: 'Leo', article: 'a', D: 118, accent: '#ffb03a',
  hook: 'Loving a Leo: | get ready to *glow.*', rec: 'yes. *mid-pose.*',
  hookPose: (x, t, P) => { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,241,168,0.18)'; x.beginPath(); x.moveTo(P.x - 30, -40); x.lineTo(P.x + 30, -40); x.lineTo(P.x + 260, P.y + 220); x.lineTo(P.x - 260, P.y + 220); x.closePath(); x.fill(); x.restore()
    icon(x, 'shades', P.x + 170, P.y - 170, 11, { rot: 0.7 }) },
  lens: { element: 'fire', mode: 'fixed', ruler: 'the Sun' },
  chapters: [
    { beats: [
      { type: 'duo', head: 'They flirt *big.*', sayA: 'you look incredible tonight!', sayB: 'oh! you too!', moodB: u => u < 3.4 ? 'wide' : 'happy', icon: 'spot', iconAt: 1.4,
        say: ['a Leo flirts *big*: loud compliments, warm attention, full beam.'] },
      { type: 'list', head: 'Grand *gestures.*', title: 'HOW A LEO FLIRTS', items: ['flowers for no reason', 'a toast in your honour', 'the best seat, saved for you'],
        say: ['grand gestures are their first language. they mean *every* one.', 'P: a toast?? for ME?? I would *melt.*'] },
      { type: 'lens', head: 'Fire sign. Ruled by the *Sun.*',
        say: ['through the stars: a *fixed fire* sign. warm and constant.', 'ruled by the *Sun*: they want to shine, and to warm you.'] },
    ] },
    { beats: [
      { type: 'chat', head: 'They need it *said.*', title: '♌︎ them', gap: 0.9, msgs: [['R', 'you were amazing today'], ['L', 'wait really??'], ['R', 'really. I was so proud'], ['L', 'saving this text forever']],
        say: ['appreciation, *out loud.* thinking it is not enough.'] },
      { type: 'duo', head: 'Loyalty, *first.*', sayA: 'you had my back in there.', sayB: 'always.', icon: 'crown', iconAt: 4.0,
        say: ['loyalty is everything. they want a teammate, in public *too.*'] },
      { type: 'card', head: 'And *play.*', q: 'What did you love doing as a kid?',
        say: ['keep it playful. a Leo in love is part kid, part *sun.*', 'P: tiny Leo in a cape. my *heart.*'] },
    ] },
    { beats: [
      { type: 'meter', head: 'Pride *flares.*', label: 'PRIDE', hi: 'ROAR', lo: 'PURR', curve: [[0, 0.1], [1.0, 0.95], [4.5, 0.95], [6, 0.4]],
        say: ['when a Leo feels ignored, the pride roars. big *exit.*', 'P: the dramatic exit. the cape *swish.*'] },
      { type: 'better', head: 'The *better* way.', bad: 'list everything they did wrong, first', good: 'start with what you love, then the problem',
        say: ['say what you *love* first. then the problem.'] },
      { type: 'duo', head: 'They *soften* fast.', sayA: 'okay. you’re right. I’m sorry.', sayB: 'still my favourite.', moodA: u => u < 3.4 ? 'neutral' : 'happy', icon: 'heart', iconAt: 4.0,
        say: ['feeling respected, a Leo softens fast. the roar was a *hurt.*'] },
    ] },
    { beats: [
      { type: 'duo', head: 'Be their *biggest* fan.', sayA: 'you came to my thing!', sayB: 'front row. loudest one.', moodA: 'sparkle', icon: 'spot', iconAt: 3.8,
        say: ['what keeps a Leo? you, in the front row, *clapping.*'] },
      { type: 'chat', head: 'And let them be *yours.*', title: '♌︎ them', gap: 0.8, msgs: [['L', 'GO GET THEM TODAY'], ['L', 'you are a STAR'], ['L', 'I made a sign for later'], ['R', 'a SIGN??']],
        say: ["a Leo fan is the best fan you'll ever have. let them *cheer.*", 'P: they made a SIGN. I need a *bucket.*'] },
      { type: 'list', head: 'Keep the *spark* lit.', title: 'LEO DATE IDEAS', items: ['dress up for no reason', 'a karaoke duet', 'a rooftop at sunset'],
        say: ['dress up, sing loud, chase the sunset. let them *shine.*'] },
    ] },
  ],
  payoff: { pisces: 'it’s glowing. is it *treasure?*', say: 'the bottom of a Leo heart: *warm, loyal, golden.*' },
  last: 'Clap for them. They’ll clap *louder.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
