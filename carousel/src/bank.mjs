// The offline "remix" engine. No API key needed.
//
// A carousel is one running sentence (two at most). The bank builds it in
// one of three shapes, so a daily feed doesn't feel like one template:
//
//   turn   leo, / you light up every room, / and still / you're checking who / they followed today, / <closer>
//   blunt  leo, / you love out loud, / but applause isn't love, / and you fell for someone / ... / <closer>
//   open   if they wanted to, / they'd walk toward you, / scorpio, / you see straight through people, / you knew that already, / <closer>
//
// Pieces:
//   traits   true things about the sign (app/src/data/signFacts.ts). `s` marks
//            a strength: 'w' (worth: you're a catch) or 'i' (insight: you
//            read people). Only strengths take the contrast turn ("and
//            still"), only insight traits take the open shape ("you knew
//            that already"). A trait can carry `b`, its blunt flip side,
//            used only with the arcs listed in `arcs`, so it never feels
//            pasted in.
//   arcs     ~20 advice themes. Each body is a clause starting at "you" (it
//            reads after any turn) and ends on a comma. Openers are general
//            truths that stand alone as slide 1.
//   closers  the subtle Align line, read after a comma; the last fragment
//            lands the blow. Each arc has its own closers, plus the generic
//            pools for the core keys in `arc.core` (only where they truly fit).
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
      { t: 'you say it to their face', s: 'w' },
      { t: 'you’d go to war for them', s: 'w' },
      { t: 'you call things as they are', s: 'i' },
      { t: 'you text first and mean it', b: 'going first isn’t a plan', arcs: ['chasing', 'rushing'] },
      { t: 'you fall at full speed', b: 'speed isn’t chemistry', arcs: ['love-bombing', 'rushing', 'the-idea'] },
      { t: 'you love the chase', b: 'the chase isn’t the prize', arcs: ['chasing', 'breadcrumbs', 'mixed-signals'] },
      { t: 'you can’t sit still', b: 'calm isn’t a red flag', arcs: ['settling', 'red-flags', 'love-bombing'] },
    ],
  },
  taurus: {
    traits: [
      { t: 'you remember their coffee order', s: 'w' },
      { t: 'you build things that last', s: 'w' },
      { t: 'you love through food and touch', s: 'w' },
      { t: 'you can smell a fake', s: 'i' },
      { t: 'you stay when it’s hard', s: 'w', b: 'staying isn’t always loyal', arcs: ['situationship', 'settling', 'breadcrumbs'] },
      { t: 'you don’t let go easily', b: 'you can’t out-wait a no', arcs: ['the-ex', 'chasing', 'mixed-signals'] },
      { t: 'you like what you know', b: 'familiar isn’t safe', arcs: ['the-ex', 'settling', 'red-flags'] },
    ],
  },
  gemini: {
    traits: [
      { t: 'you can talk to anyone', s: 'w', b: 'talking isn’t dating', arcs: ['situationship', 'breadcrumbs', 'texting-first'] },
      { t: 'you fall for minds first', s: 'w' },
      { t: 'you read between every line', s: 'i' },
      { t: 'you could flirt in your sleep', s: 'w', b: 'flirting isn’t feeling', arcs: ['love-bombing', 'playing-cool', 'the-idea'] },
      { t: 'you’ve got three chats going', b: 'banter isn’t a plan', arcs: ['situationship', 'playing-cool', 'rushing'] },
      { t: 'you’re never the same twice', b: 'mixed is still a signal', arcs: ['mixed-signals', 'ghosting'] },
    ],
  },
  cancer: {
    traits: [
      { t: 'you take care of everyone', s: 'w', b: 'they’re not a project', arcs: ['fixing', 'potential'] },
      { t: 'you remember every anniversary', s: 'w' },
      { t: 'you love like a home', s: 'w' },
      { t: 'you feel a mood change first', s: 'i' },
      { t: 'you hold onto everything', b: 'a memory isn’t a maybe', arcs: ['the-ex', 'late-night'] },
      { t: 'you feed the people you love', s: 'w', b: 'caring isn’t a contract', arcs: ['texting-first', 'chasing', 'over-explaining'] },
    ],
  },
  leo: {
    traits: [
      { t: 'you love out loud', s: 'w', b: 'applause isn’t love', arcs: ['love-bombing', 'the-idea', 'playing-cool'] },
      { t: 'you plan the best birthdays', s: 'w' },
      { t: 'you know who’s really clapping', s: 'i' },
      { t: 'you light up every room', s: 'w', b: 'a crowd isn’t a partner', arcs: ['jealousy', 'settling', 'pretty-face'] },
      { t: 'you give like it’s nothing', s: 'w', b: 'you can’t buy a yes', arcs: ['chasing', 'fixing', 'over-explaining'] },
      { t: 'you do grand gestures properly', b: 'a gesture isn’t an answer', arcs: ['texting-first', 'mixed-signals', 'breadcrumbs'] },
    ],
  },
  virgo: {
    traits: [
      { t: 'you notice everything', s: 'i' },
      { t: 'you clock a haircut instantly', s: 'i' },
      { t: 'you love in small details', s: 'w' },
      { t: 'you fix what others ignore', b: 'people aren’t a to-do list', arcs: ['fixing', 'potential'] },
      { t: 'you read the fine print', s: 'i', b: 'nobody passes every test', arcs: ['testing', 'dealbreakers', 'red-flags'] },
      { t: 'you think it through twice', b: 'a draft isn’t a decision', arcs: ['over-explaining', 'playing-cool', 'late-night'] },
    ],
  },
  libra: {
    traits: [
      { t: 'you make everyone feel chosen', s: 'w' },
      { t: 'you love romance done right', s: 'w' },
      { t: 'you can read any room', s: 'i' },
      { t: 'you can charm a whole room', s: 'w', b: 'liked isn’t known', arcs: ['playing-cool', 'the-idea', 'pretty-face'] },
      { t: 'you see both sides, always', b: 'both sides isn’t a side', arcs: ['dealbreakers', 'situationship', 'red-flags'] },
      { t: 'you take ages to choose', b: 'maybe isn’t an answer', arcs: ['situationship', 'mixed-signals'] },
      { t: 'you hate a scene', b: 'quiet isn’t peace', arcs: ['over-explaining', 'ghosting', 'jealousy', 'dealbreakers'] },
    ],
  },
  scorpio: {
    traits: [
      { t: 'you know their whole story', s: 'i' },
      { t: 'you see straight through people', s: 'i', b: 'not everyone is a suspect', arcs: ['testing', 'jealousy'] },
      { t: 'you love all or nothing', s: 'w', b: 'intensity isn’t intimacy', arcs: ['love-bombing', 'rushing', 'the-ex'] },
      { t: 'you never forget a thing', b: 'a grudge isn’t closure', arcs: ['the-ex', 'late-night', 'ghosting'] },
      { t: 'you can read a room cold', s: 'i', b: 'silence isn’t a strategy', arcs: ['playing-cool', 'ghosting'] },
    ],
  },
  sagittarius: {
    traits: [
      { t: 'you say the funny true thing', s: 'w' },
      { t: 'you make it all an adventure', s: 'w' },
      { t: 'you’re honest to a fault', s: 'i' },
      { t: 'you suggest a road trip early', b: 'a trip isn’t a plan', arcs: ['rushing', 'situationship'] },
      { t: 'you need room to breathe', b: 'space isn’t vanishing', arcs: ['ghosting', 'situationship', 'breadcrumbs'] },
      { t: 'you hate feeling boxed in', b: 'commitment isn’t a cage', arcs: ['situationship', 'dealbreakers', 'settling'] },
    ],
  },
  capricorn: {
    traits: [
      { t: 'you’re built for the long run', s: 'w' },
      { t: 'you have the driest humor alive', s: 'w' },
      { t: 'you show love by showing up', s: 'w' },
      { t: 'you’re never fooled twice', s: 'i' },
      { t: 'you have a five-year plan', s: 'w', b: 'a plan isn’t a partner', arcs: ['potential', 'the-idea', 'rushing'] },
      { t: 'you date like it’s a merger', b: 'they’re not an interview', arcs: ['testing', 'dealbreakers', 'playing-cool'] },
      { t: 'you work through everything', b: 'busy isn’t a personality', arcs: ['ghosting', 'texting-first', 'breadcrumbs'] },
    ],
  },
  aquarius: {
    traits: [
      { t: 'you love like a best friend', s: 'w' },
      { t: 'you’d rather be weird than fake', s: 'w' },
      { t: 'you think before you feel', s: 'i', b: 'detached isn’t deep', arcs: ['playing-cool', 'ghosting', 'the-idea'] },
      { t: 'you send memes mid-date', b: 'a meme isn’t a feeling', arcs: ['mixed-signals', 'breadcrumbs', 'playing-cool'] },
      { t: 'you need your own orbit', b: 'distance isn’t depth', arcs: ['situationship', 'ghosting', 'breadcrumbs'] },
    ],
  },
  pisces: {
    traits: [
      { t: 'you feel everything first', s: 'i' },
      { t: 'you see the best in people', s: 'w', b: 'potential isn’t a person', arcs: ['potential', 'fixing', 'red-flags'] },
      { t: 'you love like the movies', s: 'w', b: 'this isn’t a plot twist', arcs: ['red-flags', 'mixed-signals'] },
      { t: 'you make the playlist early', b: 'a playlist isn’t a promise', arcs: ['rushing', 'love-bombing', 'the-idea'] },
      { t: 'you write the ending in advance', b: 'a daydream isn’t a date', arcs: ['the-idea', 'potential', 'late-night'] },
    ],
  },
}

// ---------------------------------------------------------------------------
// hooks, turns, kickers

export const HOOKS = ['{sign},', 'dear {sign},', '{sign}, with love,', 'listen, {sign},', 'okay {sign},', 'with love, {sign},', '{sign}, my love,', '{sign}, honestly,', '{sign}, quick one,']

// the mood turn after "<sign>, you <strength>,"
export const TURNS = ['and still', 'and yet', 'but somehow', 'which is lovely, but', 'a real gift, but', 'all true, and still', 'and somehow', 'it’s a gift, but']

// after "<opener>, <sign>, you <insight trait>,"
export const KICKERS = ['you knew that already,', 'this isn’t news to you,', 'you’ve seen it before,', 'you already know this,', 'you’ve watched it happen,', 'you’d tell a friend the same,', 'you’ve said this to friends,']

// ---------------------------------------------------------------------------
// advice arcs
//   core:    generic closer pools that genuinely fit this arc
//   closers: the arc's own closers

const C = (core, ...lines) => ({ core, lines })

export const ARCS = {
  'chasing': {
    label: 'chasing people who walk away',
    title: '{Sign}, stop chasing people who walk away',
    core: ['mutual', '1111'],
    openers: [['if they wanted to,', 'they’d walk toward you,'], ['nobody worth having', 'needs chasing,']],
    bodies: [
      ['you’re the one chasing', 'someone who keeps', 'walking the other way,'],
      ['you keep running after', 'someone who’s barely jogging,'],
    ],
    closers: [C('1111', 'so stop running,', 'there’s a new deal', 'at 11:11.'), C('mutual', 'so stop,', 'and see who', 'shows up on their own.')],
    captions: ['stop jogging after people', '{sign}, put your running shoes away'],
  },
  'ghosting': {
    label: 'ghosting instead of saying it',
    title: '{Sign}, a goodbye takes ten seconds',
    core: ['release', 'honest'],
    openers: [['a goodbye', 'takes ten seconds,'], ['vanishing', 'is still an answer,', 'just a lazy one,']],
    bodies: [
      ['you went quiet on them', 'instead of sending', 'one honest sentence,'],
      ['you’d rather vanish', 'than send a goodbye', 'that takes ten seconds,'],
    ],
    closers: [C('release', 'so send it,', 'release the card,', 'don’t haunt it.'), C('honest', 'so say it once,', 'kindly,', 'and let them go.')],
    captions: ['ten seconds, {sign}', 'it’s one text'],
  },
  'testing': {
    label: 'testing people who already passed',
    title: '{Sign}, stop testing people who already passed',
    core: [],
    openers: [['a test they never saw', 'isn’t a fair test,']],
    bodies: [
      ['you’re grading them', 'on a test', 'they never got to see,'],
      ['you keep testing someone', 'who already passed,'],
    ],
    closers: [C('mutual', 'so stop grading', 'and flip your card too.'), C('honest', 'so tell them the test', 'or stop giving it.'), C('mutual', 'and trust that isn’t mutual', 'isn’t trust.')],
    captions: ['put the clipboard down', '{sign}, they passed'],
  },
  'over-explaining': {
    label: 'over-explaining',
    title: '{Sign}, "no thanks" is a full sentence',
    core: ['honest'],
    openers: [['“no thanks”', 'is a full sentence,']],
    bodies: [
      ['you send four paragraphs', 'when “no thanks”', 'would have done it,'],
      ['you’re explaining yourself', 'to someone who', 'already decided,'],
    ],
    closers: [C('release', 'so send the short one', 'and release the card.'), C('honest', 'so say it once,', 'shorter,', 'and log off.')],
    captions: ['delete the third paragraph', 'shorter, {sign}'],
  },
  'situationship': {
    label: 'situationships',
    title: '{Sign}, eight months is not "casual"',
    core: ['dealbreakers', 'release'],
    openers: [['eight months in', 'isn’t casual anymore,'], ['if it has no name', 'after eight months,', 'that’s the name,']],
    bodies: [
      ['you’re eight months into', '“let’s not label it,”'],
      ['you’re in a “thing”', 'with no name', 'and no plans,'],
    ],
    closers: [C('dealbreakers', 'so say what you want', 'out loud,', 'it’s allowed.'), C('release', 'so name it', 'or release it,', 'those are the options.')],
    captions: ['so what are you two', '{sign}, it has a name'],
  },
  'love-bombing': {
    label: 'love-bombing',
    title: '{Sign}, forever on date two is a warning',
    core: [],
    openers: [['forever on date two', 'is a sales pitch,']],
    bodies: [
      ['you fell for someone', 'who said forever', 'on the second date,'],
      ['you mistook a flood', 'of compliments', 'for a foundation,'],
    ],
    closers: [C('honest', 'so watch what they do', 'on date ten,', 'not what they say on two.'), C('mutual', 'so slow it down,', 'the real thing', 'can keep up.')],
    captions: ['slow is a love language', '{sign}, it was a lot, fast'],
  },
  'potential': {
    label: 'picking potential over reality',
    title: '{Sign}, date who showed up, not who they could be',
    core: ['not-alone'],
    openers: [['potential', 'is just a guess,'], ['who they could be', 'isn’t who showed up,']],
    bodies: [
      ['you’re dating potential', 'and not the person', 'who actually showed up,'],
      ['you keep loving the trailer', 'and ignoring the movie,'],
    ],
    closers: [C('honest', 'so date who they are', 'today,', 'not the sequel.'), C('not-alone', 'and someone out there', 'is already', 'the finished version.')],
    captions: ['the trailer was better', 'who they are, {sign}'],
  },
  'texting-first': {
    label: 'always texting first',
    title: '{Sign}, eleven days of texting first',
    core: ['mutual', '1111'],
    openers: [['if you always text first,', 'you’re the only one texting,']],
    bodies: [
      ['you’ve texted first', 'eleven days in a row,'],
      ['you’re the only one', 'who ever starts', 'the conversation,'],
    ],
    closers: [C('mutual', 'so stop,', 'and see if', 'they ever start one.')],
    captions: ['let them start one', 'day twelve, {sign}'],
  },
  'red-flags': {
    label: 'red flags as personality',
    title: '{Sign}, that red flag is not a personality',
    core: ['dealbreakers'],
    openers: [['a red flag', 'with good hair', 'is still a red flag,']],
    bodies: [
      ['you keep calling red flags', '“a bit of character,”'],
      ['you saw the red flag', 'and called it', 'their personality,'],
    ],
    closers: [C('honest', 'so call it what it is,', 'a red flag,', 'not a vibe.'), C('dealbreakers', 'so write it on your card', 'as a dealbreaker,', 'and mean it.')],
    captions: ['that’s not a quirk', 'it’s red, {sign}'],
  },
  'the-ex': {
    label: 'the ex',
    title: '{Sign}, your ex is not a sequel',
    core: ['release', '1111'],
    openers: [['an ex', 'is not a sequel,'], ['the old texts', 'say the same thing', 'every time,']],
    bodies: [
      ['you’re rereading old texts', 'from someone', 'who already left,'],
      ['you keep checking in', 'on an ex', 'like it’s a cliffhanger,'],
    ],
    closers: [C('release', 'so release the card,', 'they’re an ex,', 'not a sequel.')],
    captions: ['no season two', 'close the thread, {sign}'],
  },
  'jealousy': {
    label: 'jealousy',
    title: '{Sign}, put their following list down',
    core: [],
    openers: [['checking who they follow', 'at 1am', 'isn’t love,']],
    bodies: [
      ['you’re checking who', 'they followed today,'],
      ['you’re jealous of someone', 'they met once', 'at a wedding,'],
    ],
    closers: [C('honest', 'so say you felt it,', 'once, plainly,', 'and put the phone down.'), C('mutual', 'and if you can’t trust them,', 'it isn’t aligned.')],
    captions: ['log off, {sign}', 'she was at the wedding'],
  },
  'the-idea': {
    label: 'loving the idea of someone',
    title: '{Sign}, you love the idea of them',
    core: [],
    openers: [['the person you imagined', 'can’t text you back,']],
    bodies: [
      ['you’re in love with', 'a version of them', 'you made up,'],
      ['you fell for the idea', 'and skipped the person,'],
    ],
    closers: [C('face-last', 'so meet the real one,', 'slowly,', 'face last.'), C('honest', 'so ask them something real', 'and listen to the answer.')],
    captions: ['meet the real one', '{sign}, you wrote them'],
  },
  'mixed-signals': {
    label: 'decoding mixed signals',
    title: '{Sign}, "haha ok" is not scripture',
    core: ['mutual', 'release'],
    openers: [['mixed signals', 'are still a signal,'], ['“haha ok”', 'isn’t a riddle,']],
    bodies: [
      ['you’re decoding', 'a “haha ok”', 'like it’s scripture,'],
      ['you’re reading tea leaves', 'in a two-word reply,'],
    ],
    closers: [C('mutual', 'and a clear yes', 'never needs decoding.')],
    captions: ['it said haha ok', 'stop decoding, {sign}'],
  },
  'settling': {
    label: 'settling',
    title: '{Sign}, "fine, i guess" is not a match',
    core: ['not-alone', '1111'],
    openers: [['“fine, i guess”', 'isn’t a match,']],
    bodies: [
      ['you’re settling for', '“fine, i guess”', 'because it’s there,'],
      ['you’re keeping the wrong one', 'because the right one', 'hasn’t shown up yet,'],
    ],
    closers: [C('1111', 'so fold this hand,', 'the deck is bigger', 'than this.'), C('dealbreakers', 'so put your standards', 'on your card,', 'and keep them.')],
    captions: ['fine isn’t the bar', 'more than fine, {sign}'],
  },
  'pretty-face': {
    label: 'choosing by looks',
    title: '{Sign}, you keep picking faces',
    core: ['face-last'],
    openers: [['a good photo', 'isn’t a personality,'], ['the face', 'is the least of it,']],
    bodies: [
      ['you swiped on a face', 'and ended up', 'with a stranger,'],
      ['you keep choosing people', 'by their photos,'],
    ],
    closers: [C('face-last', 'so read the sky first,', 'the face can wait.')],
    captions: ['it was a good photo', 'look past the face, {sign}'],
  },
  'dealbreakers': {
    label: 'hiding dealbreakers',
    title: '{Sign}, say the dealbreaker on date one',
    core: ['dealbreakers', 'honest'],
    openers: [['a dealbreaker', 'at month four', 'is an ambush,']],
    bodies: [
      ['you hide the dealbreaker', 'until month four,'],
      ['you act easy-going', 'and drop the dealbreaker', 'at month four,'],
    ],
    closers: [C('dealbreakers', 'so put it on your card,', 'the right one', 'will still pick you.')],
    captions: ['say it on date one', 'month four, {sign}, really'],
  },
  'late-night': {
    label: 'late-night texts',
    title: '{Sign}, don\'t send the 2am text',
    core: ['1111', 'release'],
    openers: [['nothing good', 'gets typed at 2am,']],
    bodies: [
      ['you’re up at 2am', 'drafting a text', 'you shouldn’t send,'],
      ['you check your phone', 'at midnight', 'for someone who won’t,'],
    ],
    closers: [C('1111', 'so go to sleep,', 'the deck reshuffles', 'at 11:11.')],
    captions: ['go to sleep, {sign}', 'drafts are for deleting'],
  },
  'breadcrumbs': {
    label: 'living on breadcrumbs',
    title: '{Sign}, a like a week is not a relationship',
    core: ['mutual', 'release'],
    openers: [['one like a week', 'isn’t interest,'], ['crumbs', 'aren’t a meal,']],
    bodies: [
      ['you’re living off', 'one like a week', 'and a “we should hang,”'],
      ['you keep calling crumbs', 'a whole meal,'],
    ],
    closers: [C('mutual', 'and if they wanted you,', 'you’d be getting', 'the whole loaf.')],
    captions: ['that was a crumb', 'eat a real meal, {sign}'],
  },
  'fixing': {
    label: 'trying to fix them',
    title: '{Sign}, they are not a renovation',
    core: [],
    openers: [['nobody', 'is a renovation,']],
    bodies: [
      ['you’re trying to fix', 'someone who never asked', 'to be fixed,'],
      ['you date people', 'like renovation projects,'],
    ],
    closers: [C('honest', 'so put the tools down,', 'you’re a date,', 'not a contractor.'), C('not-alone', 'because someone out there', 'already fits.')],
    captions: ['put the toolbox down', 'not a fixer-upper, {sign}'],
  },
  'playing-cool': {
    label: 'playing it cool',
    title: '{Sign}, playing it cool looks like not caring',
    core: ['honest'],
    openers: [['act like you don’t care', 'long enough,', 'and they’ll believe you,']],
    bodies: [
      ['you play it so cool', 'they honestly think', 'you don’t care,'],
      ['you wait three hours', 'to reply', 'so you look busy,'],
    ],
    closers: [C('honest', 'so just reply,', 'warmly,', 'like you mean it.'), C('mutual', 'and nobody aligns', 'with someone', 'pretending not to care.')],
    captions: ['just reply, {sign}', 'nobody’s timing you'],
  },
  'rushing': {
    label: 'rushing it',
    title: '{Sign}, slow down, it was one coffee',
    core: [],
    openers: [['one coffee', 'is not a wedding,']],
    bodies: [
      ['you’re naming the kids', 'after one coffee,'],
      ['you’re picking a song', 'for a third date', 'that hasn’t happened,'],
    ],
    closers: [C('1111', 'so breathe,', 'there’s a new deal at 11:11,', 'not a deadline.'), C('mutual', 'so let them catch up,', 'it takes two.')],
    captions: ['it was one coffee', 'slow down, {sign}'],
  },
  'venus': {
    label: 'loving how they want, not how you do',
    title: '{Sign}, your venus knows how you love',
    core: ['venus'],
    openers: [['you love one way', 'and date another,']],
    bodies: [
      ['you keep loving people', 'the way they want', 'instead of how you do,'],
      ['you date for your sun', 'and ignore your heart,'],
    ],
    closers: [C('venus', 'so love the way you love,', 'that’s your venus,', 'not a flaw.')],
    captions: ['how do you love, {sign}', 'check your venus'],
  },
}

// ---------------------------------------------------------------------------
// generic closer pools, per core key (used only by arcs that list the key)

export const CLOSERS = {
  'face-last': [
    ['so lead with your sky,', 'your face comes last.'],
    ['because a face is a cover,', 'not the book.'],
    ['so let them read you', 'before they see you.'],
    ['and the right one', 'reads your chart', 'before your face.'],
  ],
  'mutual': [
    ['and if it’s one-sided,', 'it’s not alignment,', 'it’s a hobby.'],
    ['and love you have to chase', 'isn’t aligned.'],
    ['so wait for someone', 'who turns their card too.'],
    ['and the right one', 'meets you halfway,', 'at least.'],
  ],
  'honest': [
    ['so say the true thing,', 'not the cute one.'],
    ['and the honest version', 'is always shorter.'],
    ['so just say it,', 'plainly, once.'],
    ['because the truth up front', 'saves you a whole season.'],
  ],
  'dealbreakers': [
    ['so put it on your card', 'and let them choose.'],
    ['so say it on date one,', 'not in year two.'],
    ['so lead with the hard part,', 'the right one stays.'],
  ],
  'release': [
    ['so release the card,', 'don’t haunt it.'],
    ['so let it go cleanly,', 'a release, not a ghost.'],
    ['and a clean goodbye', 'beats a slow fade.'],
    ['because a release', 'is kinder than a ghost.'],
  ],
  '1111': [
    ['and there’s a new deal', 'at 11:11.'],
    ['so fold the bad hand,', 'new deal at 11:11.'],
    ['and the deck resets', 'every night at 11:11.'],
    ['so stop clinging to this hand,', 'there’s another deal tonight.'],
  ],
  'venus': [
    ['so read your venus,', 'not just your sun.'],
    ['and venus, not your sun,', 'is how you love.'],
    ['because venus runs your heart,', 'not their schedule.'],
  ],
  'not-alone': [
    ['so don’t settle,', 'your people are out there.'],
    ['because someone out there', 'reads your sky', 'and stays.'],
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

const fits = (frag) => {
  const flat = frag.trim()
  return flat.split(/\s+/).length <= LIMITS.maxWords && flat.length <= LIMITS.maxChars
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const plain = (s) => s.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
const fill = (s, sign) => plain(s.replaceAll('{sign}', sign).replaceAll('{Sign}', cap(sign)))
const firstWord = (s) => s.split(/\s+/)[0]

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

/** every closer an arc may use: its own first, then the generic pools */
export function arcClosers(arc) {
  return [
    ...arc.closers.map((c) => ({ ...c, own: true })),
    ...arc.core.flatMap((k) => CLOSERS[k].map((lines) => ({ core: k, lines, own: false }))),
  ]
}

/** which shapes this sign/arc pair supports, with weights */
function shapesFor(data, theme, arc) {
  const blunt = data.traits.filter((x) => x.b && x.arcs.includes(theme) && fits(`but ${x.b},`))
  const strong = data.traits.filter((x) => x.s)
  const insight = data.traits.filter((x) => x.s === 'i')
  const shapes = []
  if (blunt.length) shapes.push(['blunt', 5])
  if (strong.length) shapes.push(['turn', 4])
  if (insight.length && arc.openers?.length) shapes.push(['open', 2.5])
  return { shapes, blunt, strong, insight }
}

function weighted(rng, pairs) {
  const total = pairs.reduce((a, [, w]) => a + w, 0)
  let r = rng() * total
  for (const [v, w] of pairs) if ((r -= w) < 0) return v
  return pairs[pairs.length - 1][0]
}

/**
 * Compose one bank carousel (without validation retries).
 * `used` is a Set shared across a batch so lines don't repeat between posts.
 */
export function composeBank({ sign, theme, seed, used = new Set() }) {
  if (!SIGNS.includes(sign)) throw new Error(`unknown sign: ${sign}`)
  const arc = ARCS[theme]
  if (!arc) throw new Error(`unknown theme: ${theme} (try --list-themes)`)
  const rng = makeRng(hash(`${sign}|${theme}|${seed}`))
  const data = SIGN_BANK[sign]
  const { shapes, blunt, strong, insight } = shapesFor(data, theme, arc)
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
    lead = [hook, `${tr.t},`, `but ${tr.b},`, first, ...body.slice(1)]
  } else if (shape === 'turn') {
    const tr = pickFresh(rng, strong, used, `trait-${sign}`, (x) => x.t)
    // no "and still / you're still ..." echoes
    const echo = (t) => t.split(/\W+/).some((w) => w.length > 3 && body[0].includes(w))
    const turn = pickFresh(rng, TURNS.filter((t) => !echo(t)), used, 'turn')
    lead = [hook, `${tr.t},`, turn, ...body]
  } else {
    const opener = pickFresh(rng, arc.openers, used, `opener-${theme}`)
    const tr = pickFresh(rng, insight, used, `trait-${sign}`, (x) => x.t)
    // don't follow "you know ..." with "you knew that already"
    const kicks = /\bknow/.test(tr.t) ? KICKERS.filter((k) => !/\bkn[eo]w/.test(k)) : KICKERS
    const kicker = pickFresh(rng, kicks, used, 'kicker')
    lead = [...opener, '{sign},', `${tr.t},`, kicker]
  }
  // the mood turn: "and still" / "but <blunt>", or the kicker in the open shape
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
    return true
  })
  if (!options.length) return null
  const own = options.filter((c) => c.own)
  const pool = own.length && rng() < 0.6 ? own : options
  const closer = pickFresh(rng, pool, used, 'closer', (c) => c.lines.join('/'))

  const texts = [...lead, ...closer.lines].map((f) => fill(f, sign))
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
  let lastErrs = []
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
