// The offline "remix" engine. No API key needed.
//
// A carousel is one running sentence (two at most). The bank builds it in
// one of three shapes, so a daily feed doesn't feel like one template:
//
//   turn   virgo, / you tell them about the spinach, / and still / you went quiet on them / ... / <closer>
//   blunt  taurus, / you don't let go easily, / but you can't out-wait a no, / and you're rereading old texts / ... / <closer>
//   open   nobody worth having / needs chasing, / aries, / you love a challenge, / but a no isn't a dare, / <closer>
//
// Every slide has to do work: there are no bridge lines ("you knew that
// already"). The open shape is the hand-written aries shape: a general
// truth, the sign, its trait, the blunt flip, then the closer lands it.
//
// Pieces:
//   traits   true things about the sign (app/src/data/signFacts.ts). `s` marks
//            a strength: 'w' (worth: you're a catch), 'i' (insight: you read
//            people, you know what you want) or 'h' (honesty: you say it).
//            Only strengths take the contrast turn ("and still"), and only
//            when the arc says that kind of strength is the irony (`turn`):
//            "you can smell a fake, and still you fell for forever on date
//            two" works, "you plan great birthdays, and still you're
//            rereading old texts" doesn't. A trait can carry `b`, its blunt
//            flip side, used only with the arcs listed in `arcs`, and/or
//            `flips` ({ arc: line }) for a flip that only fits one arc; blunt
//            and open shapes need one.
//   arcs     ~20 advice themes. Each body is a clause starting at "you" (it
//            reads after any turn) and ends on a comma. Openers are general
//            truths that stand alone as slide 1. Closers answer the arc's
//            situation, so they follow from any body or opener of that arc.
//   pools    generic closers per core key, used only by arcs that list the
//            key in `pools` (where they truly fit).
//
// Guards: no content word (4+ letters, not a sign name, not a function
// word) may appear on two different slides, so a carousel never says
// "heart" twice or ends on the word it opened with. Anything that trips it
// is re-rolled.
//
// Rules for every fragment: lowercase, <= 6 words, <= 32 chars, no emoji, no
// exclamation marks. The source uses typographic apostrophes for readability;
// output is converted to straight ones to match content/*.json.

import { SIGNS, CORE, LIMITS, validate } from './schema.mjs'
import { assignBackgrounds } from './backdrop.mjs'
import { makeRng, hash } from './rng.mjs'

// ---------------------------------------------------------------------------
// signs

export const SIGN_BANK = {
  aries: {
    traits: [
      { t: 'you say it to their face', s: 'h', b: 'not when it’s goodbye', arcs: ['ghosting'] },
      { t: 'you’d go to war for them', s: 'w' },
      { t: 'you’re loyal to the bone', s: 'w' },
      { t: 'you know what you want fast', s: 'i' },
      { t: 'you can smell a bluff', s: 'i' },
      { t: 'you call things as they are', s: 'h', b: 'never the red ones', arcs: ['red-flags'] },
      { t: 'you text first and mean it', b: 'they never go second', arcs: ['texting-first', 'chasing'] },
      { t: 'you fall at full speed', b: 'a crash isn’t chemistry', arcs: ['love-bombing', 'rushing', 'the-idea'] },
      { t: 'you love a challenge', b: 'a no isn’t a dare', arcs: ['chasing', 'mixed-signals', 'breadcrumbs'] },
      { t: 'you can’t sit still', b: 'slow isn’t a red flag', arcs: ['love-bombing', 'rushing'] },
    ],
  },
  taurus: {
    traits: [
      { t: 'you remember their coffee order', s: 'w' },
      { t: 'you build things that last', s: 'w', flips: { fixing: 'people aren’t flat-pack' } },
      { t: 'you love through food and touch', s: 'w', flips: { venus: 'you ask for neither' } },
      { t: 'you don’t play games', s: 'h' },
      { t: 'you know quality on sight', s: 'i' },
      { t: 'you can smell a fake', s: 'i', b: 'you ate this one up', arcs: ['love-bombing', 'red-flags'] },
      { t: 'you stay when it’s hard', s: 'w', b: 'stuck isn’t loyal', arcs: ['situationship', 'settling', 'breadcrumbs'] },
      { t: 'you don’t let go easily', b: 'you can’t out-wait a no', arcs: ['the-ex', 'chasing', 'mixed-signals'] },
      { t: 'you like what you know', b: 'familiar isn’t safe', arcs: ['the-ex', 'settling', 'red-flags'] },
    ],
  },
  gemini: {
    traits: [
      { t: 'you can talk to anyone', s: 'w', b: 'chatting isn’t dating', arcs: ['situationship', 'breadcrumbs', 'texting-first'], flips: { 'over-explaining': 'nobody asked for a podcast' } },
      { t: 'you fall for minds first', s: 'w', flips: { 'pretty-face': 'you swipe like you don’t' } },
      { t: 'you say what others won’t', s: 'h' },
      { t: 'you can spot a script', s: 'i' },
      { t: 'you read between every line', s: 'i', b: '“k” has no subtext', arcs: ['mixed-signals'] },
      { t: 'you could flirt in your sleep', s: 'w', b: 'charm isn’t a feeling', arcs: ['love-bombing', 'the-idea'] },
      { t: 'you’ve got three chats going', b: 'nobody knows the real you', arcs: ['situationship', 'playing-cool'] },
      { t: 'you’re never the same twice', b: 'gone isn’t a mood', arcs: ['ghosting'] },
    ],
  },
  cancer: {
    traits: [
      { t: 'you take care of everyone', s: 'w', b: 'they’re not a project', arcs: ['fixing', 'potential'] },
      { t: 'you remember every anniversary', s: 'w' },
      { t: 'you love like a home', s: 'w', flips: { settling: 'you’re living in “fine”' } },
      { t: 'you never hide how you feel', s: 'h', flips: { 'over-explaining': 'a no needs no preface' } },
      { t: 'you sense a lie early', s: 'i' },
      { t: 'you feel a mood change first', s: 'i', flips: { jealousy: 'it’s not always about you' } },
      { t: 'you hold onto everything', b: 'a memory isn’t a maybe', arcs: ['the-ex', 'late-night'] },
      { t: 'you feed the people you love', s: 'w', b: 'caring isn’t a contract', arcs: ['texting-first', 'chasing'] },
      { t: 'you forgive too fast', b: 'a pattern isn’t a mistake', arcs: ['red-flags', 'the-ex'] },
    ],
  },
  leo: {
    traits: [
      { t: 'you love out loud', s: 'w', b: 'lately you whisper', arcs: ['playing-cool', 'venus'] },
      { t: 'you plan the best birthdays', s: 'w', b: 'yours get a text', arcs: ['settling', 'breadcrumbs'] },
      { t: 'you say it with your chest', s: 'h' },
      { t: 'you spot a fake fan instantly', s: 'i' },
      { t: 'you dress for the occasion', b: 'a fit isn’t a feeling', arcs: ['pretty-face'] },
      { t: 'you know who’s really clapping', s: 'i', flips: { 'the-ex': 'they left mid-show', testing: 'they’re already standing' } },
      { t: 'you light up every room', s: 'w', b: 'you’re not their only sun', arcs: ['jealousy'] },
      { t: 'you give like it’s nothing', s: 'w', b: 'you can’t buy a yes', arcs: ['chasing', 'over-explaining'], flips: { fixing: 'you’re not a charity' } },
      { t: 'you do grand gestures properly', b: 'they don’t do them back', arcs: ['texting-first', 'breadcrumbs', 'chasing'] },
    ],
  },
  virgo: {
    traits: [
      { t: 'you notice everything', s: 'i', flips: { jealousy: 'nothing here is evidence' } },
      { t: 'you clock a haircut instantly', s: 'i', flips: { 'pretty-face': 'you miss the personality' } },
      { t: 'you remember the little things', s: 'w' },
      { t: 'you love in small details', s: 'w', flips: { venus: 'you ask for nothing' } },
      { t: 'you tell them about the spinach', s: 'h' },
      { t: 'you fix what others ignore', b: 'people aren’t a to-do list', arcs: ['fixing', 'potential'] },
      { t: 'you read the fine print', s: 'i', b: 'nobody’s perfect on paper', arcs: ['testing'] },
      { t: 'you have a list for everything', b: 'you hide the big one', arcs: ['dealbreakers'] },
      { t: 'you think it through twice', b: 'a draft isn’t a decision', arcs: ['over-explaining', 'late-night'] },
    ],
  },
  libra: {
    traits: [
      { t: 'you make everyone feel chosen', s: 'w' },
      { t: 'you love romance done right', s: 'w' },
      { t: 'you can say no beautifully', s: 'h' },
      { t: 'you can read any room', s: 'i' },
      { t: 'you clock bad manners instantly', s: 'i' },
      { t: 'you love beautiful things', b: 'pretty isn’t kind', arcs: ['pretty-face', 'red-flags'] },
      { t: 'you can charm a whole crowd', s: 'w', b: 'liked isn’t known', arcs: ['playing-cool', 'the-idea'] },
      { t: 'you see both sides, always', b: 'you’re allowed an opinion', arcs: ['dealbreakers', 'situationship', 'red-flags'] },
      { t: 'you take ages to choose', b: 'maybe isn’t an answer', arcs: ['situationship', 'mixed-signals'], flips: { 'the-ex': 'they already chose' } },
      { t: 'you hate a scene', b: 'quiet isn’t peace', arcs: ['ghosting', 'jealousy', 'dealbreakers'] },
    ],
  },
  scorpio: {
    traits: [
      { t: 'you know their whole story', s: 'i', flips: { 'over-explaining': 'they don’t need yours' } },
      { t: 'you never fake a feeling', s: 'h' },
      { t: 'you’re loyal to a fault', s: 'w' },
      { t: 'you see straight through people', s: 'i', b: 'not everyone is a suspect', arcs: ['testing', 'jealousy'], flips: { 'pretty-face': 'except the pretty ones' } },
      { t: 'you love all or nothing', s: 'w', b: 'intensity isn’t intimacy', arcs: ['love-bombing', 'rushing'] },
      { t: 'you never forget a thing', b: 'a grudge isn’t closure', arcs: ['the-ex', 'late-night'] },
      { t: 'you can read a room cold', s: 'i', b: 'silence isn’t a strategy', arcs: ['playing-cool', 'ghosting'] },
      { t: 'you keep your cards close', b: 'guarded isn’t deep', arcs: ['playing-cool', 'dealbreakers'] },
    ],
  },
  sagittarius: {
    traits: [
      { t: 'you say the funny true thing', s: 'h' },
      { t: 'you make it all an adventure', s: 'w', flips: { settling: 'this is a waiting room' } },
      { t: 'you’re honest to a fault', s: 'h', flips: { 'over-explaining': 'the truth is short' } },
      { t: 'you make strangers laugh', s: 'w' },
      { t: 'you call a bluff fast', s: 'i' },
      { t: 'you spot a dead end fast', s: 'i', flips: { 'pretty-face': 'not if it’s cute' } },
      { t: 'you suggest a road trip early', b: 'a map isn’t a plan', arcs: ['rushing', 'situationship'] },
      { t: 'you need room to breathe', b: 'space isn’t vanishing', arcs: ['ghosting'] },
      { t: 'you hate feeling boxed in', b: 'commitment isn’t a cage', arcs: ['situationship'] },
      { t: 'you laugh off the serious stuff', b: 'a joke isn’t an answer', arcs: ['situationship', 'dealbreakers'] },
    ],
  },
  capricorn: {
    traits: [
      { t: 'you’re built for the long run', s: 'w', flips: { settling: 'endurance isn’t love' } },
      { t: 'you have the driest humor alive', s: 'w' },
      { t: 'you show love by showing up', s: 'w' },
      { t: 'you mean every word you say', s: 'h', flips: { 'over-explaining': 'you say too many' } },
      { t: 'you read people like contracts', s: 'i' },
      { t: 'you’re never fooled twice', s: 'i', flips: { jealousy: 'they haven’t lied once' } },
      { t: 'you have a five-year plan', s: 'w', b: 'a person isn’t a milestone', arcs: ['potential', 'the-idea', 'rushing'], flips: { fixing: 'they didn’t sign up' } },
      { t: 'you date like it’s a merger', b: 'they’re not an interview', arcs: ['testing'] },
      { t: 'you work through everything', b: '“busy” isn’t a goodbye', arcs: ['ghosting'] },
    ],
  },
  aquarius: {
    traits: [
      { t: 'you love like a best friend', s: 'w', flips: { venus: 'you date like a stranger' } },
      { t: 'you’d rather be weird than fake', s: 'h' },
      { t: 'you make any night interesting', s: 'w' },
      { t: 'you see the pattern first', s: 'i' },
      { t: 'you think before you feel', s: 'i', b: 'detached isn’t deep', arcs: ['playing-cool', 'ghosting', 'the-idea'] },
      { t: 'you send memes mid-date', b: 'a gif isn’t a feeling', arcs: ['playing-cool'] },
      { t: 'you need your own orbit', b: 'distance isn’t depth', arcs: ['situationship', 'ghosting'], flips: { 'the-ex': 'you’re still circling them' } },
    ],
  },
  pisces: {
    traits: [
      { t: 'you feel everything first', s: 'i' },
      { t: 'you feel it and say it', s: 'h' },
      { t: 'you read moods through a screen', s: 'i' },
      { t: 'you see the best in people', s: 'w', b: 'potential isn’t a person', arcs: ['potential', 'fixing', 'red-flags'] },
      { t: 'you love like the movies', s: 'w', b: 'this isn’t a plot twist', arcs: ['red-flags', 'mixed-signals'], flips: { settling: 'this is a rerun' } },
      { t: 'you make the playlist early', b: 'a song isn’t a promise', arcs: ['rushing', 'love-bombing', 'the-idea'] },
      { t: 'you write the ending in advance', b: 'a daydream isn’t a date', arcs: ['the-idea', 'potential', 'late-night'], flips: { 'the-ex': 'this one’s already written' } },
    ],
  },
}

// ---------------------------------------------------------------------------
// hooks, turns

export const HOOKS = ['{sign},', 'dear {sign},', 'listen, {sign},', 'okay {sign},', '{sign}, honestly,', '{sign}, quick one,', '{sign}, my love,', 'oh, {sign},']

// the contrast turn after "<sign>, you <strength>,"
export const TURNS = ['and still', 'and yet', 'and somehow', 'but somehow']

// Kept for compatibility. The open shape used to bridge with these ("you knew
// that already,"); they did no work, so nothing uses them any more.
export const KICKERS = []

// ---------------------------------------------------------------------------
// advice arcs
//   turn:    which strength kinds make the "and still" irony land
//   pools:   generic closer pools that genuinely fit this arc
//   core:    every core key the arc can carry (for --list-themes)
//   closers: the arc's own closers

const C = (core, ...lines) => ({ core, lines })

export const ARCS = {
  'chasing': {
    label: 'chasing people who walk away',
    title: '{Sign}, stop chasing people who walk away',
    core: ['mutual', '1111'],
    pools: ['mutual', '1111'],
    turn: ['w'],
    openers: [['if they wanted to,', 'they’d walk toward you,'], ['nobody worth having', 'needs chasing,']],
    bodies: [
      ['you’re the one chasing', 'someone who keeps', 'walking the other way,'],
      ['you keep running after', 'someone who’s barely jogging,'],
      ['you’re sprinting after', 'someone who won’t', 'even turn around,'],
      ['you’re running a marathon', 'for someone', 'who never signed up,'],
    ],
    closers: [
      C('1111', 'so stop running,', 'there’s a new deal', 'at 11:11.'),
      C('mutual', 'so stand still', 'and see who', 'comes looking.'),
      C('mutual', 'so sit down,', 'you’re a date,', 'not a search party.'),
    ],
    captions: ['stop jogging after people', '{sign}, put your running shoes away'],
  },
  'ghosting': {
    label: 'ghosting instead of saying it',
    title: '{Sign}, a goodbye takes ten seconds',
    core: ['release', 'honest'],
    pools: ['release', 'honest'],
    turn: ['h'],
    openers: [['a goodbye', 'takes ten seconds,'], ['vanishing', 'is still an answer,', 'just a lazy one,']],
    bodies: [
      ['you went quiet on them', 'instead of sending', 'one honest sentence,'],
      ['you’d rather vanish', 'than type a goodbye', 'that takes ten seconds,'],
      ['you left them on read', 'for three weeks', 'and called it “space,”'],
      ['you’re letting a chat', 'die of old age', 'instead of ending it,'],
    ],
    closers: [
      C('release', 'so send it,', 'release the card,', 'don’t haunt it.'),
      C('honest', 'so say it once,', 'kindly,', 'and let them go.'),
      C('release', 'and a kind “no”', 'beats a slow fade.'),
      C('honest', 'so end it like an adult,', 'not a ghost story.'),
    ],
    captions: ['ten seconds, {sign}', 'it’s one text'],
  },
  'testing': {
    label: 'testing people who already passed',
    title: '{Sign}, stop testing people who already passed',
    core: ['mutual', 'honest'],
    pools: [],
    turn: ['i'],
    openers: [['a test they never saw', 'isn’t fair,'], ['trust', 'isn’t a pop quiz,']],
    bodies: [
      ['you’re grading them', 'on a test', 'they never got to see,'],
      ['you keep testing someone', 'who already passed,'],
      ['you set little traps', 'to see if they care,'],
      ['you made them earn', 'your trust', 'three times over,'],
    ],
    closers: [
      C('honest', 'so tell them the test', 'or stop giving it.'),
      C('mutual', 'so put the red pen down', 'and flip your card too.'),
      C('mutual', 'they passed,', 'you’re the one', 'still sitting the exam.'),
    ],
    captions: ['put the clipboard down', '{sign}, they passed'],
  },
  'over-explaining': {
    label: 'over-explaining',
    title: '{Sign}, "no thanks" is a full sentence',
    core: ['honest', 'release'],
    pools: ['honest'],
    turn: ['h'],
    openers: [['“no thanks”', 'is a full sentence,'], ['nobody needs', 'a closing argument,']],
    bodies: [
      ['you send four paragraphs', 'when “no thanks”', 'would have done it,'],
      ['you’re explaining yourself', 'to someone who', 'already decided,'],
      ['you wrote an essay', 'to say', '“i’m not feeling it,”'],
      ['you’re still adding', 'footnotes', 'to a breakup,'],
    ],
    closers: [
      C('release', 'so send the short one', 'and release the card.'),
      C('honest', 'so say it once,', 'shorter,', 'and log off.'),
      C('honest', 'and the kind version', 'fits in one text.'),
      C('honest', 'so delete everything', 'after the first line,', 'and hit send.'),
    ],
    captions: ['delete the third paragraph', 'shorter, {sign}'],
  },
  'situationship': {
    label: 'situationships',
    title: '{Sign}, eight months is not "casual"',
    core: ['dealbreakers', 'release'],
    pools: ['release'],
    turn: ['w'],
    openers: [['eight months in', 'isn’t casual anymore,'], ['“we’re just vibing”', 'isn’t a relationship status,']],
    bodies: [
      ['you’re eight months into', '“let’s not label it,”'],
      ['you’re in a “thing”', 'with no name', 'and no plans,'],
      ['you’ve met their dog', 'but not their friends,'],
      ['you’re doing partner work', 'for situationship pay,'],
    ],
    closers: [
      C('dealbreakers', 'so say what you want', 'out loud,', 'it’s allowed.'),
      C('release', 'so name it', 'or release it,', 'those are the options.'),
      C('dealbreakers', 'so ask “what are we,”', 'and believe the answer.'),
    ],
    captions: ['so what are you two', '{sign}, it has a name'],
  },
  'love-bombing': {
    label: 'love-bombing',
    title: '{Sign}, forever on date two is a warning',
    core: ['honest', 'mutual'],
    pools: [],
    turn: ['i'],
    openers: [['forever on date two', 'is a sales pitch,'], ['a flood of compliments', 'isn’t a foundation,']],
    bodies: [
      ['you fell for someone', 'who said forever', 'on the second date,'],
      ['you mistook a flood', 'of compliments', 'for a foundation,'],
      ['you’re dazzled by someone', 'who called you “soulmate”', 'in week one,'],
    ],
    closers: [
      C('honest', 'so watch what they do', 'on date ten,', 'not what they say on two.'),
      C('mutual', 'so slow it down,', 'the real thing', 'can keep up.'),
      C('honest', 'so let it cool,', 'anything real', 'survives a boring tuesday.'),
    ],
    captions: ['slow is a love language', '{sign}, it was a lot, fast'],
  },
  'potential': {
    label: 'picking potential over reality',
    title: '{Sign}, date who showed up, not who they could be',
    core: ['honest', 'not-alone'],
    pools: [],
    turn: ['i'],
    openers: [['potential', 'is just a guess,'], ['who they could be', 'isn’t who showed up,']],
    bodies: [
      ['you’re dating potential', 'and not the person', 'who actually showed up,'],
      ['you keep loving the trailer', 'and ignoring the movie,'],
      ['you’re waiting on a version', 'of them', 'that lives in your head,'],
      ['you’re holding out', 'for a glow-up', 'they never promised,'],
    ],
    closers: [
      C('honest', 'so date who they are', 'today,', 'not the sequel.'),
      C('not-alone', 'and someone out there', 'is already', 'the finished version.'),
      C('honest', 'so stop scouting,', 'you’re a date,', 'not their agent.'),
    ],
    captions: ['the trailer was better', 'who they are, {sign}'],
  },
  'texting-first': {
    label: 'always texting first',
    title: '{Sign}, eleven days of texting first',
    core: ['mutual', '1111'],
    pools: ['mutual', '1111'],
    turn: ['w'],
    openers: [['if you always go first,', 'you’re the only one playing,'], ['a conversation', 'takes two thumbs,']],
    bodies: [
      ['you’ve texted first', 'eleven days in a row,'],
      ['you’re the only one', 'who ever starts', 'the conversation,'],
      ['you keep sending “morning”', 'into a quiet room,'],
      ['you plan every hangout', 'with someone who', 'never picks a day,'],
    ],
    closers: [
      C('mutual', 'so stop,', 'and see if', 'they ever start one.'),
      C('mutual', 'so put the phone down,', 'if it’s mutual,', 'it’ll ring.'),
      C('1111', 'so log off,', 'there’s a new deal at 11:11,', 'and some of them reply.'),
    ],
    captions: ['let them start one', 'day twelve, {sign}'],
  },
  'red-flags': {
    label: 'red flags as personality',
    title: '{Sign}, that red flag is not a personality',
    core: ['honest', 'dealbreakers'],
    pools: [],
    turn: ['i'],
    openers: [['good hair', 'doesn’t make it', 'less of a red flag,'], ['a red flag', 'isn’t a personality,']],
    bodies: [
      ['you keep calling red flags', '“a bit of character,”'],
      ['you saw the red flag', 'and called it', 'their personality,'],
      ['you call it “mysterious”', 'when they won’t say', 'where they were,'],
      ['you laughed off', 'the rude waiter thing', 'on date one,'],
    ],
    closers: [
      C('honest', 'so call it what it is,', 'a red flag,', 'not a vibe.'),
      C('dealbreakers', 'so put it on your card', 'as a dealbreaker,', 'and mean it.'),
      C('honest', 'so believe them', 'the first time.'),
      C('honest', 'it’s not a quirk,', 'it’s a preview.'),
    ],
    captions: ['that’s not a quirk', 'it’s red, {sign}'],
  },
  'the-ex': {
    label: 'the ex',
    title: '{Sign}, your ex is not a sequel',
    core: ['release', '1111'],
    pools: ['1111'],
    turn: ['i'],
    openers: [['an ex', 'is not a sequel,'], ['the old texts', 'say the same thing', 'every time,']],
    bodies: [
      ['you’re rereading old texts', 'from someone', 'who already left,'],
      ['you keep checking in', 'on an ex', 'like it’s a cliffhanger,'],
      ['you watch every story', 'they post', 'within the minute,'],
      ['you kept the hoodie', 'and the hope,'],
    ],
    closers: [
      C('release', 'so release the card,', 'they’re an ex,', 'not a sequel.'),
      C('1111', 'so close the thread,', 'there’s a new deal', 'at 11:11.'),
      C('release', 'so archive the chat,', 'some stories', 'just end.'),
    ],
    captions: ['no season two', 'close the thread, {sign}'],
  },
  'jealousy': {
    label: 'jealousy',
    title: '{Sign}, put their following list down',
    core: ['honest', 'mutual'],
    pools: [],
    turn: ['w'],
    openers: [['checking who they follow', 'at 1am', 'isn’t love,'], ['their phone', 'isn’t a crime scene,']],
    bodies: [
      ['you’re checking who', 'they followed today,'],
      ['you’re jealous of someone', 'they met once', 'at a wedding,'],
      ['you zoomed in', 'on a stranger’s like', 'at 2am,'],
      ['you’re keeping score', 'of who they laugh with,'],
    ],
    closers: [
      C('honest', 'so say you felt it,', 'once, plainly,', 'and put the phone down.'),
      C('mutual', 'and if you can’t trust them,', 'it isn’t aligned.'),
      C('honest', 'so ask them,', 'like an adult,', 'not a detective.'),
    ],
    captions: ['log off, {sign}', 'she was at the wedding'],
  },
  'the-idea': {
    label: 'loving the idea of someone',
    title: '{Sign}, you love the idea of them',
    core: ['face-last', 'honest'],
    pools: [],
    turn: ['i'],
    openers: [['the person you imagined', 'can’t text you back,'], ['the version in your head', 'never shows up late,']],
    bodies: [
      ['you’re in love with', 'a version of them', 'you made up,'],
      ['you fell for the idea', 'and skipped the person,'],
      ['you wrote their lines', 'before they spoke,'],
      ['you’ve planned a whole life', 'with someone', 'you’ve met twice,'],
    ],
    closers: [
      C('face-last', 'so meet the real one,', 'slowly,', 'face last.'),
      C('honest', 'so ask them something real', 'and listen to the answer.'),
      C('face-last', 'so read who they are,', 'not who you’d cast.'),
    ],
    captions: ['meet the real one', '{sign}, you wrote them'],
  },
  'mixed-signals': {
    label: 'decoding mixed signals',
    title: '{Sign}, "haha ok" is not scripture',
    core: ['mutual', 'release'],
    pools: ['mutual'],
    turn: ['h', 'i'],
    openers: [['mixed signals', 'are a clear answer,'], ['“haha ok”', 'isn’t a riddle,']],
    bodies: [
      ['you’re decoding', 'a “haha ok”', 'like it’s scripture,'],
      ['you’re reading tea leaves', 'in a two-word reply,'],
      ['you sent a screenshot', 'to four friends', 'for a translation,'],
      ['you’re waiting on someone', 'who’s hot on monday', 'and gone by thursday,'],
    ],
    closers: [
      C('mutual', 'and a clear yes', 'never needs decoding.'),
      C('release', 'so take the hint,', 'release the card,', 'and keep your evenings.'),
      C('mutual', 'and someone who wants you', 'doesn’t need translating.'),
    ],
    captions: ['it said haha ok', 'stop decoding, {sign}'],
  },
  'settling': {
    label: 'settling',
    title: '{Sign}, "fine, i guess" is not a match',
    core: ['not-alone', '1111', 'dealbreakers'],
    pools: ['not-alone', '1111'],
    turn: ['w'],
    openers: [['“fine, i guess”', 'isn’t a match,'], ['“they’re nice”', 'isn’t a reason,']],
    bodies: [
      ['you’re settling for', '“fine, i guess”', 'because it’s there,'],
      ['you’re keeping the wrong one', 'because the right one', 'hasn’t shown up yet,'],
      ['you stayed', 'because leaving', 'felt like effort,'],
      ['you call it “comfortable”', 'when you mean “bored,”'],
    ],
    closers: [
      C('1111', 'so fold this hand,', 'the deck is bigger', 'than this.'),
      C('dealbreakers', 'so put your standards', 'on your card,', 'and keep them.'),
      C('not-alone', 'so get up from the table,', 'you were never', 'the consolation prize.'),
    ],
    captions: ['fine isn’t the bar', 'more than fine, {sign}'],
  },
  'pretty-face': {
    label: 'choosing by looks',
    title: '{Sign}, you keep picking faces',
    core: ['face-last'],
    pools: ['face-last'],
    turn: ['i'],
    openers: [['a good photo', 'isn’t a personality,'], ['the face', 'is the least of it,']],
    bodies: [
      ['you swiped on a face', 'and ended up', 'with a stranger,'],
      ['you keep choosing people', 'by their photos,'],
      ['you picked the jawline', 'and got the attitude,'],
      ['you fell for the lighting', 'in picture three,'],
    ],
    closers: [
      C('face-last', 'so read the sky first,', 'the face can wait.'),
      C('face-last', 'so read their chart,', 'not their angles.'),
      C('face-last', 'so start with the sky,', 'the face can wait.'),
    ],
    captions: ['it was a good photo', 'look past the face, {sign}'],
  },
  'dealbreakers': {
    label: 'hiding dealbreakers',
    title: '{Sign}, say the dealbreaker on date one',
    core: ['dealbreakers', 'honest'],
    pools: ['dealbreakers', 'honest'],
    turn: ['h'],
    openers: [['a dealbreaker', 'at month four', 'is an ambush,'], ['the hard part', 'goes first,']],
    bodies: [
      ['you hide the dealbreaker', 'until month four,'],
      ['you act easy-going', 'and drop the dealbreaker', 'at month four,'],
      ['you said “either’s fine”', 'about kids,', 'and it isn’t,'],
      ['you’re saving “i want kids”', 'for date nine,'],
    ],
    closers: [
      C('dealbreakers', 'so put it on your card,', 'the right one', 'will still pick you.'),
      C('honest', 'so lead with it,', 'the wrong ones leave early,', 'that’s the point.'),
    ],
    captions: ['say it on date one', 'month four, {sign}, really'],
  },
  'late-night': {
    label: 'late-night texts',
    title: '{Sign}, don\'t send the 2am text',
    core: ['1111', 'release'],
    pools: ['1111', 'release'],
    turn: ['i'],
    openers: [['nothing good', 'gets typed at 2am,'], ['“you up?”', 'isn’t a love letter,']],
    bodies: [
      ['you’re up at 2am', 'drafting a text', 'you shouldn’t send,'],
      ['you check your phone', 'at midnight', 'for someone who won’t,'],
      ['you’re rereading their bio', 'at 3am', 'like it’s a clue,'],
      ['you typed “hey stranger”', 'at one in the morning,'],
    ],
    closers: [
      C('1111', 'so go to sleep,', 'the deck reshuffles', 'at 11:11.'),
      C('release', 'so mute the chat', 'and release the card.'),
      C('release', 'so put the phone', 'in another room,', 'and go to bed.'),
    ],
    captions: ['go to sleep, {sign}', 'drafts are for deleting'],
  },
  'breadcrumbs': {
    label: 'living on breadcrumbs',
    title: '{Sign}, a like a week is not a relationship',
    core: ['mutual', 'release', 'not-alone'],
    pools: ['mutual', 'release'],
    turn: ['w'],
    openers: [['one like a week', 'isn’t interest,'], ['crumbs', 'aren’t a meal,']],
    bodies: [
      ['you’re living off', 'one like a week', 'and a “we should hang,”'],
      ['you keep calling crumbs', 'a whole meal,'],
      ['you’re rationing', 'one “miss you”', 'for a month,'],
      ['you light up', 'when they watch your story,'],
    ],
    closers: [
      C('mutual', 'and if they wanted you,', 'you’d be getting', 'the whole loaf.'),
      C('release', 'so stop waiting', 'for the next crumb,', 'and go eat.'),
      C('not-alone', 'and someone out there', 'would make you dinner.'),
    ],
    captions: ['that was a crumb', 'eat a real meal, {sign}'],
  },
  'fixing': {
    label: 'trying to fix them',
    title: '{Sign}, they are not a renovation',
    core: ['honest', 'not-alone'],
    pools: [],
    turn: ['i'],
    openers: [['nobody', 'is a renovation,'], ['love', 'isn’t a repair job,']],
    bodies: [
      ['you’re trying to fix', 'someone who never asked', 'for help,'],
      ['you date people', 'like renovation projects,'],
      ['you’re picking out paint', 'for someone', 'who likes the walls,'],
      ['you fell for the before', 'and you’re planning the after,'],
    ],
    closers: [
      C('honest', 'so put the tools down,', 'you’re a date,', 'not a contractor.'),
      C('not-alone', 'and someone out there', 'already fits.'),
      C('honest', 'so take them as is,', 'or not at all.'),
    ],
    captions: ['put the toolbox down', 'not a fixer-upper, {sign}'],
  },
  'playing-cool': {
    label: 'playing it cool',
    title: '{Sign}, playing it cool looks like not caring',
    core: ['honest', 'mutual'],
    pools: ['honest'],
    turn: ['h'],
    openers: [['act like you don’t care', 'long enough,', 'and they’ll believe you,'], ['cool', 'is just cold', 'with better shoes,']],
    bodies: [
      ['you play it so cool', 'they honestly think', 'you don’t care,'],
      ['you wait three hours', 'to reply', 'so you look busy,'],
      ['you answered “lol same”', 'to “i like you,”'],
      ['you’re so unbothered', 'they think you’re bored,'],
    ],
    closers: [
      C('honest', 'so just reply,', 'warmly,', 'like you mean it.'),
      C('mutual', 'and nobody aligns', 'with someone', 'pretending not to care.'),
      C('honest', 'so text back quickly,', 'it’s not desperate,', 'it’s a pulse.'),
    ],
    captions: ['just reply, {sign}', 'nobody’s timing you'],
  },
  'rushing': {
    label: 'rushing it',
    title: '{Sign}, slow down, it was one coffee',
    core: ['1111', 'mutual'],
    pools: [],
    turn: ['i'],
    openers: [['one coffee', 'is not a wedding,'], ['a third date', 'isn’t a lease,']],
    bodies: [
      ['you’re naming the kids', 'after one coffee,'],
      ['you’re picking a song', 'for a third date', 'that hasn’t happened,'],
      ['you’re choosing curtains', 'with someone', 'you met on tuesday,'],
      ['you said “we”', 'by the second drink,'],
    ],
    closers: [
      C('1111', 'so breathe,', 'there’s a new deal at 11:11,', 'not a deadline.'),
      C('mutual', 'so let them catch up,', 'it takes two.'),
      C('mutual', 'so slow down,', 'the good ones', 'don’t expire.'),
    ],
    captions: ['it was one coffee', 'slow down, {sign}'],
  },
  'venus': {
    label: 'loving how they want, not how you do',
    title: '{Sign}, your venus knows how you love',
    core: ['venus'],
    pools: ['venus'],
    turn: ['h'],
    openers: [['you love one way', 'and date another,'], ['your sun', 'is who you are,']],
    bodies: [
      ['you keep loving people', 'the way they want', 'instead of how you do,'],
      ['you date for your sun', 'and forget how you love,'],
      ['you’re shrinking your needs', 'to fit their schedule,'],
      ['you play “low maintenance”', 'and you’re not,'],
    ],
    closers: [
      C('venus', 'so check your venus,', 'it already knows', 'what you need.'),
      C('venus', 'so ask for it,', 'your venus', 'isn’t too much.'),
      C('venus', 'so read the whole thing,', 'your sun is the cover,', 'your venus is the plot.'),
    ],
    captions: ['how do you love, {sign}', 'check your venus'],
  },
}

// ---------------------------------------------------------------------------
// generic closer pools, per core key (used only by arcs that list the key in `pools`)

export const CLOSERS = {
  'face-last': [
    ['so lead with your sky,', 'your face comes last.'],
    ['so let them read you', 'before they see you.'],
    ['and the right one', 'reads your chart', 'before your face.'],
  ],
  'mutual': [
    ['and if it’s one-sided,', 'it’s not alignment,', 'it’s a hobby.'],
    ['so wait for someone', 'who flips their card too.'],
    ['and the right one', 'meets you halfway,', 'at least.'],
  ],
  'honest': [
    ['so say the true thing,', 'not the cute one.'],
    ['so just say it,', 'plainly, once.'],
  ],
  'dealbreakers': [
    ['so put it on your card', 'and let them choose.'],
    ['so say it on date one,', 'not in year two.'],
  ],
  'release': [
    ['so release the card,', 'don’t haunt it.'],
    ['and a clean goodbye', 'beats a slow fade.'],
  ],
  '1111': [
    ['and there’s a new deal', 'at 11:11.'],
    ['so fold the bad hand,', 'new deal at 11:11.'],
  ],
  'venus': [
    ['so read your venus,', 'not just your sun.'],
    ['and your venus', 'already knows the way.'],
  ],
  'not-alone': [
    ['so don’t settle,', 'your people are out there.'],
    ['and you don’t have to', 'arrive alone.'],
  ],
}

// offhand captions that work for any carousel
export const CAPTIONS = [
  'said with love', 'a gentle intervention', '{sign}, please', 'for the {sign} in the group chat',
  'tag your {sign}', 'not a subtweet', 'you know who you are', 'just saying', 'consider this your sign',
  'read twice, {sign}', 'okay that’s all', 'a note for {sign} season',
]

const TAG_POOL = ['astrology', 'zodiac', 'datingadvice', 'zodiacsigns', 'astrologymemes', 'datingtips']

export const THEMES = Object.keys(ARCS)

// ---------------------------------------------------------------------------
// repetition guard

// function words that may repeat freely (only words of 4+ letters matter)
const STOP = new Set(`
  you're your yours you've you'd you'll yourself they they're their theirs them they'd they've they'll
  with that that's this these those isn't it's what what's when where which while who's whose
  someone somebody something anyone everyone still just don't doesn't didn't can't won't wasn't aren't
  haven't hasn't about have having been then than every only like really even also into onto from
  over some more most much very there there's here here's because would could should wouldn't
  couldn't shouldn't does doing being ever before after each other until
`.trim().split(/\s+/))

const stem = (w) => {
  let s = w.replace(/'s$/, '')
  for (const suf of ['ing', 'ly', 'ed', 'es', 's']) {
    if (s.endsWith(suf) && s.length - suf.length >= 3 && !s.endsWith('ss') && !s.endsWith('eed')) {
      s = s.slice(0, -suf.length)
      break
    }
  }
  if (/([b-df-hj-np-tv-z])\1$/.test(s)) s = s.slice(0, -1)
  return s.replace(/e$/, '')
}

/**
 * Content words (4+ letters, not a sign name or function word) that appear on
 * two different slides. Empty means the carousel passes the guard.
 */
export function repeatedWords(texts) {
  const seen = new Map()
  const dupes = new Set()
  texts.forEach((text, i) => {
    const words = plain(text).toLowerCase().match(/[a-z][a-z'-]*/g) ?? []
    for (const w of new Set(words)) {
      if (w.replace(/'/g, '').length < 4 || STOP.has(w) || SIGNS.includes(w)) continue
      const k = stem(w)
      if (seen.has(k) && seen.get(k) !== i) dupes.add(w)
      else if (!seen.has(k)) seen.set(k, i)
    }
  })
  return [...dupes]
}

// ---------------------------------------------------------------------------

const fits = (frag) => {
  const flat = frag.trim()
  return flat.split(/\s+/).length <= LIMITS.maxWords && flat.length <= LIMITS.maxChars
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const plain = (s) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
const fill = (s, sign) => plain(s.replaceAll('{sign}', sign).replaceAll('{Sign}', cap(sign)))
const firstWord = (s) => s.split(/\s+/)[0]
// a trailing comma goes inside a closing quote, as in the bodies (“let’s not label it,”)
const comma = (s) => (s.endsWith('”') ? `${s.slice(0, -1)},”` : `${s},`)

/** pick from list, preferring items not in `used` (keys are namespaced) */
function pickFresh(rng, list, used, ns, keyOf = (x) => JSON.stringify(x)) {
  let fresh = list.filter((x) => !used.has(`${ns}:${keyOf(x)}`))
  if (!fresh.length) {
    // every option used: start a new round so repeats stay evenly spread
    for (const x of list) used.delete(`${ns}:${keyOf(x)}`)
    fresh = list
  }
  const choice = rng.pick(fresh)
  used.add(`${ns}:${keyOf(choice)}`)
  return choice
}

/** every closer an arc may use: its own first, then the generic pools it lists */
export function arcClosers(arc) {
  return [
    ...arc.closers.map((c) => ({ ...c, own: true })),
    ...(arc.pools ?? arc.core).flatMap((k) => CLOSERS[k].map((lines) => ({ core: k, lines, own: false }))),
  ]
}

/** which shapes this sign/arc pair supports, with weights */
function shapesFor(data, theme, arc) {
  const blunt = data.traits
    .flatMap((x) => [
      ...(x.b && x.arcs?.includes(theme) ? [{ t: x.t, b: x.b }] : []),
      ...(x.flips?.[theme] ? [{ t: x.t, b: x.flips[theme] }] : []),
    ])
    .filter((x) => fits(`but ${x.b},`))
  const strong = data.traits.filter((x) => x.s && (arc.turn ?? ['w', 'i', 'h']).includes(x.s))
  const shapes = []
  if (blunt.length) shapes.push(['blunt', 5])
  if (strong.length) shapes.push(['turn', 3])
  if (blunt.length && arc.openers?.length) shapes.push(['open', 3.5])
  return { shapes, blunt, strong }
}

function weighted(rng, pairs) {
  const total = pairs.reduce((a, [, w]) => a + w, 0)
  let r = rng() * total
  for (const [v, w] of pairs) if ((r -= w) < 0) return v
  return pairs[pairs.length - 1][0]
}

/** one attempt at a carousel's slides; mutates `used` */
function composeTexts({ sign, theme, arc, data, rng, used, strict }) {
  const { shapes, blunt, strong } = shapesFor(data, theme, arc)
  if (!shapes.length) return null
  // rotate shapes across a batch so the feed doesn't repeat one rhythm
  const last = [...used].find((k) => k.startsWith('shape-last:'))
  const shape = weighted(rng, shapes.map(([s, w]) => [s, last === `shape-last:${s}` ? w / 4 : w]))
  if (last) used.delete(last)
  used.add(`shape-last:${shape}`)

  const hook = pickFresh(rng, HOOKS, used, 'hook')
  const body = pickFresh(rng, arc.bodies, used, `body-${theme}`)
  let lead
  if (shape === 'blunt') {
    const tr = pickFresh(rng, blunt, used, `trait-${sign}`, (x) => x.t)
    const first = fits(`and ${body[0]}`) ? `and ${body[0]}` : body[0]
    lead = [hook, `${tr.t},`, comma(`but ${tr.b}`), first, ...body.slice(1)]
  } else if (shape === 'turn') {
    const tr = pickFresh(rng, strong, used, `trait-${sign}`, (x) => x.t)
    // no "and still / you're still ..." echoes
    const echo = (t) => t.split(/\W+/).some((w) => w.length > 2 && body.join(' ').includes(w))
    const turn = pickFresh(rng, TURNS.filter((t) => !echo(t)), used, 'turn')
    lead = [hook, `${tr.t},`, turn, ...body]
  } else {
    // the hand-written aries shape: truth, sign, trait, flip, closer
    const opener = pickFresh(rng, arc.openers, used, `opener-${theme}`)
    const tr = pickFresh(rng, blunt, used, `trait-${sign}`, (x) => x.t)
    lead = [...opener, '{sign},', `${tr.t},`, comma(`but ${tr.b}`)]
  }
  // the mood turn: "and still" / "but <flip>"
  const turnAt = shape === 'open' ? lead.length - 1 : 2

  // closer: keep 6–9 slides; after an "and ..." lead, don't start the closer with "and"
  // and never repeat the last fragment's first word ("so you look busy, / so just reply")
  const leadAnd = lead.some((f, i) => i > 1 && firstWord(f) === 'and')
  const lastFirst = firstWord(lead[lead.length - 1])
  const options = arcClosers(arc).filter((c) => {
    const n = lead.length + c.lines.length
    if (n < LIMITS.minSlides || n > LIMITS.maxSlides) return false
    if (leadAnd && firstWord(c.lines[0]) === 'and') return false
    if (firstWord(c.lines[0]) === lastFirst) return false
    // the guard, early: only closers that don't echo the lead
    return !repeatedWords([...lead, ...c.lines].map((f) => fill(f, sign))).length
  })
  if (!options.length) return null
  const own = options.filter((c) => c.own)
  const pool = own.length && rng() < 0.7 ? own : options
  const closer = pickFresh(rng, pool, used, 'closer', (c) => c.lines.join('/'))
  const texts = [...lead, ...closer.lines].map((f) => fill(f, sign))
  if (repeatedWords(texts).length) return null
  // within a batch, don't open two posts with the same trait and turn
  const at = lead.findIndex((f) => f.startsWith('you'))
  const opening = `opening:${sign}:${lead[at]}|${shape === 'turn' ? '' : lead[at + 1]}`
  if (strict && used.has(opening)) return null
  used.add(opening)
  return { texts, closer, turnAt }
}

/**
 * Compose one bank carousel (without validation retries).
 * `used` is a Set shared across a batch so lines don't repeat between posts.
 * Returns null when no combination passes the repetition guard.
 */
export function composeBank({ sign, theme, seed, used = new Set() }) {
  if (!SIGNS.includes(sign)) throw new Error(`unknown sign: ${sign}`)
  const arc = ARCS[theme]
  if (!arc) throw new Error(`unknown theme: ${theme} (try --list-themes)`)
  const rng = makeRng(hash(`${sign}|${theme}|${seed}`))
  const data = SIGN_BANK[sign]

  let got = null
  for (let attempt = 0; attempt < 40 && !got; attempt++) {
    const trial = new Set(used)
    const r = composeTexts({ sign, theme, arc, data, rng, used: trial, strict: attempt < 30 })
    if (r) {
      got = r
      used.clear()
      for (const k of trial) used.add(k)
    }
  }
  if (!got) return null
  const { texts, closer, turnAt } = got

  const caption = fill(pickFresh(rng, rng() < 0.6 ? arc.captions : CAPTIONS, used, 'caption'), sign)
  const extra = rng.shuffle(TAG_POOL).slice(0, 1 + rng.int(2))
  const carousel = {
    id: `g-${sign}-${theme}-${seed}`,
    title: fill(arc.title, sign),
    signs: [sign],
    core: [closer.core],
    caption,
    hashtags: [sign, 'zodiacdating', ...extra],
    theme,
    engine: 'bank',
    seed,
    slides: texts.map((text) => ({ text })),
  }
  return assignBackgrounds(carousel, seed, { turn: turnAt })
}

/**
 * Compose with validation: anything that fails validate() is regenerated
 * with the next seed. Returns the carousel (its id carries the seed used).
 */
export function generateBankOne({ sign, theme, seed, used = new Set(), maxTries = 50 }) {
  let lastErrs = ['repetition guard: no combination without a repeated word']
  for (let s = seed, tries = 0; tries < maxTries; s++, tries++) {
    const trial = new Set(used)
    const c = composeBank({ sign, theme, seed: s, used: trial })
    if (!c) continue
    const errs = validate(c)
    if (!errs.length) {
      used.clear()
      for (const k of trial) used.add(k)
      return c
    }
    lastErrs = errs
  }
  throw new Error(`bank: no valid carousel for ${sign}/${theme} after ${maxTries} seeds: ${lastErrs.join('; ')}`)
}

/** Generate a batch for a list of { sign, theme } jobs. Seeds run seed, seed+1, ... */
export function generateBank({ jobs, seed }) {
  const used = new Set()
  return jobs.map((job, i) => generateBankOne({ ...job, seed: seed + i, used }))
}

export { CORE }
