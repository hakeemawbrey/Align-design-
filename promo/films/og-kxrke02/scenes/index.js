// og-kxrke02: social rework of kxrke02 (static outline HOOK over the board; the plates already sit home on frame 0;
// no slam title, no bug, no whip/shakes/flashes; board, cast, bubbles and the last-line box inside the full-frame safe
// zones; signs pushed further). The format lives in ./rankfull.js (an og copy of ../../kxrke01/scenes/rankfull.js).
// Was:
// kxrke02: RANKING THE SIGNS: FULL COUNTDOWN, "Who asks “what are we?” first" (≈88 s vertical star_talk post, promo/films/month2/m43.md,
// music: jazzy · Bb). No end card, no card cut; hard cut on the last line.
// The whole format lives in ../../kxrke01/scenes/rankfull.js (imported read-only): frame-0 crash + slam title, ranks
// #12 → #2 every 6 s with chapter stickers, 3-2-1 drumroll, #1 at 73.6, the twist at 80, THE STARS' last line, hard cut.
import { makeRankFull } from './rankfull.js'

const EP = makeRankFull({
  id: 'og-kxrke02',
  hook: '‘What are we?’ | Who *blinks* first?',
  hookProp: { kind: 'big', text: '?', size: 320, label: 'the question', labelDy: 190, k: 1.0 },
  ranks: [
    { sign: 'aries', tag: 'asked at the door. before “hi”.', say: 'what ARE we? also, hi.', gag: { kind: 'sign', text: 'WHAT ARE WE?', w: 440, size: 46, label: 'date one, minute one' } },
    { sign: 'cancer', tag: 'asked on date two, with soup', say: 'soup? also: are we dating?', gag: { kind: 'note', lines: ['soup (two bowls)', 'feelings (lots)'], w: 420, label: 'tonight’s menu' } },
    { sign: 'virgo', tag: 'made a 40-slide deck. with charts.', say: 'slide one: us.', gag: { kind: 'slide', title: 'US: A PROPOSAL', label: 'with an appendix' } },
    { sign: 'libra', tag: 'rehearsed it in the mirror. 14 times.', say: 'hi. so. um. what are we?', gag: { kind: 'mirror', col: '#ff8fb1', label: 'take fourteen' } },
    { sign: 'taurus', tag: 'asked at month six. mid-nap.', say: 'so… are we a thing?', gag: { kind: 'calendar', text: 'MONTH 6', size: 46, sub: 'NO RUSH', label: 'slow and steady' } },
    { sign: 'pisces', tag: 'asked through tears, at brunch', say: 'I just love brunch with you…', gag: { kind: 'tissues', label: 'brunch, with feelings' } },
    { sign: 'leo', tag: 'announced it. didn’t ask.', say: 'we’re dating. you’re welcome.', gag: { kind: 'megaphone', text: 'OFFICIAL!', label: 'a press release' } },
    { sign: 'scorpio', tag: 'knows the answer. waits. forever.', say: 'I know. do you?', mood: 'squint', gag: { kind: 'clock', h: 11, m: 0, spin: 300, label: 'patience: legendary' } },
    { sign: 'gemini', tag: 'asked as a joke, then panicked', say: 'haha jk… unless?', mood: 'wide', gag: { kind: 'meter', to: 0.9, label: 'panic level' } },
    { sign: 'capricorn', tag: 'scheduled the talk for Q1', say: 'the talk is booked. Q1.', gag: { kind: 'calendar', text: 'Q1', sub: 'THE TALK', label: 'agenda attached' } },
    { sign: 'aquarius', tag: '“define ‘label’.”', say: 'what even IS a label?', gag: { kind: 'big', text: '??', size: 120, label: 'a whole philosophy', labelDy: 110 } },
    { sign: 'sagittarius', tag: '“labels? we’re free birds.”', say: 'we’re free birds, babe!', gag: { kind: 'map', label: 'flying (for now)' } },
  ],
  twist: { who: 'THE DATE', say: 'honestly? I hoped you’d ask.', gag: { kind: 'heart', label: 'it’s mutual', labelDy: 170 }, cheer: 'IT’S OFFICIAL!!!' },
  last: 'Clarity is kind. Ask it *softly.*',
})

export const HOOK = '“What are we?” | Who *asks* first?'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 4.0

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
