// kxrke05: RANKING THE SIGNS: FULL COUNTDOWN, "Who makes the first move" (≈88 s vertical star_talk post, promo/films/month2/m43.md,
// music: funk · A). No end card, no card cut; hard cut on the last line.
// The whole format lives in ../../kxrke01/scenes/rankfull.js (imported read-only): frame-0 crash + slam title, ranks
// #12 → #2 every 6 s with chapter stickers, 3-2-1 drumroll, #1 at 73.6, the twist at 80, THE STARS' last line, hard cut.
import { makeRankFull } from '../../kxrke01/scenes/rankfull.js'

const EP = makeRankFull({
  id: 'kxrke05',
  hook: 'Who makes the | *first move?*',
  hookProp: { kind: 'sign', text: 'HI!', label: 'the first move', k: 1.2 },
  ranks: [
    { sign: 'aries', tag: 'asked them out twice, by accident', say: 'wanna hang? …wait, again?', gag: { kind: 'sign', text: 'HI! AGAIN!', w: 380, size: 48, label: 'twice. same day.' } },
    { sign: 'leo', tag: 'walked over with a compliment', say: 'your laugh? iconic.', gag: { kind: 'heart', label: 'smooth', labelDy: 170 } },
    { sign: 'sagittarius', tag: '“want to go on an adventure?”', say: 'adventure? tonight? yes?', gag: { kind: 'map', label: 'first move: a road trip' } },
    { sign: 'gemini', tag: 'talked first, about everything', say: 'hi! so, fun fact, also—', gag: { kind: 'phone', text: 'hiii', typing: true, label: 'never stopped talking' } },
    { sign: 'aquarius', tag: 'opened with a space fact. it worked.', say: 'Venus spins backwards. hi.', gag: { kind: 'moon', label: 'it worked' } },
    { sign: 'libra', tag: 'let the friends “arrange” it', say: 'oh! you’re here? what luck!', gag: { kind: 'note', lines: ['SEATING PLAN', 'you + them', '(the friends)'], label: 'totally natural' } },
    { sign: 'taurus', tag: 'one slow, perfect text', say: 'dinner sometime?', gag: { kind: 'phone', text: 'dinner sometime?', sub: 'drafted for 3 days', label: 'worth the wait' } },
    { sign: 'cancer', tag: 'becomes friends first. for a year.', say: 'we’re friends! (for now)', gag: { kind: 'calendar', text: '1 YEAR', size: 50, sub: 'FRIENDS FIRST', label: 'the long game' } },
    { sign: 'virgo', tag: 'researched the perfect opener', say: 'opener 37 of 40. ready.', gag: { kind: 'list', lines: ['opener 1', 'opener 2', 'opener 37'], label: 'over-prepared' } },
    { sign: 'pisces', tag: 'wrote forty hellos. sent none.', say: 'hi… no. hello… no.', gag: { kind: 'tissues', label: 'forty drafts' } },
    { sign: 'capricorn', tag: 'planned the move for next quarter', say: 'first move: scheduled.', gag: { kind: 'calendar', text: 'Q2', sub: 'FIRST MOVE', label: 'on the roadmap' } },
    { sign: 'scorpio', tag: 'waits for a sign. literally.', say: 'I’m waiting for a sign.', mood: 'squint', gag: { kind: 'sign', text: 'THIS IS A SIGN', w: 460, size: 42, label: 'still waiting' } },
  ],
  twist: { who: 'THE CRUSH', say: 'wait, I was about to ask YOU', gag: { kind: 'heart', label: 'mutual', labelDy: 170 }, cheer: 'BOTH OF THEM!!!' },
  last: 'Brave is just *hello,* said first.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
