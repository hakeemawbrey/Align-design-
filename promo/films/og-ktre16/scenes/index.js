// og-ktre16: social rework of ktre16 (static HOOK box replaces the slam title; kit copy ../rescuekit.js: no bug, no numbered
// chapter stickers, no shakes/flashes, safe-zone layout; crazier lines). Was: TEXT RESCUE, "From "hey" to Saturday" (72 s vertical, Month 2 boost m12, star_advice post, music: pop · A)
// Long: one new-match chat rescued in five chapters, from "hey" to a Saturday plan. Hard cut.
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre16', len: 76,
ending: 'cut', sender: 'scorpio', partner: 'taurus', chapters: true, promise: 'WAIT FOR THE PLANS', padMax: 1.0,
  hook: '', hookColor: '#c9283c',
  thread: [{ side: 'L', text: "you matched! say hi" }],
  rounds: [
    { chapter: 'THE OPENER', draft: 'hey', caught: 'hey', head: 'Open with *them.*',
      lines: [
        { text: "'hey' is a door with *no handle*. and no house." },
        { who: 'sender', text: 'I studied their profile for an hour. they make *terrible* pancakes.' },
        { text: 'perfect. ask about *that*.' },
      ],
      rewrite: 'hi! your profile says you make terrible pancakes. how terrible?',
      replies: ['LOL like, fire-alarm terrible', 'but I keep trying'] },
    { chapter: 'THEIR QUESTION', incoming: ['what are you up to this weekend?'], draft: 'nothing lol', caught: 'nothing lol', head: 'Answer, then *ask back.*',
      lines: [
        { text: 'a dead end. give them something to *hold*.' },
        { who: 'sender', text: 'I was going to the *night market*. alone. mysteriously.' },
      ],
      rewrite: "might hit the night market saturday! what about you?",
      replies: ['ok I LOVE the night market', 'the dumpling stall??'] },
    { chapter: 'THE WAIT', bar: { label: 'they went quiet…', error: 'Error: they are just busy' }, draft: 'nvm. forget it. deleting my number', caught: 'deleting my number', head: 'Quiet is not a *no.*',
      lines: [
        { text: 'forty minutes is not a *verdict*.' },
        { text: "you already wrote the breakup speech. reply like it's *fine*." },
      ],
      rewrite: 'the dumpling stall is the whole reason I go',
      replies: ['sorry, was at the gym!', 'ok we have to compare dumpling notes'] },
    { chapter: 'THE REAL BIT', keep: true, draft: "full honesty, I'm kind of shy at first", head: 'Honest is *attractive.*',
      lines: [
        { who: 'sender', text: "do I delete this? it's a bit *real*." },
        { text: 'keep it. honest is *attractive*. send.' },
      ],
      replies: ['same honestly', 'I talk a lot when I am nervous'] },
    { chapter: 'THE ASK', draft: 'so maybe we could possibly at some point', caught: 'possibly at some point', head: 'Ask *clearly.*',
      lines: [
        { text: 'you were doing so well. *say the plan*.' },
        { who: 'pisces', text: 'THEY ARE SO CUTE I NEED A TISSUE (sob)' },
      ],
      rewrite: 'pancake contest at mine, then the night market saturday?',
      replies: ['deal.', '11am. bring your worst pancake'] },
  ],
  last: 'Five honest texts. | *One Saturday.*', rec: "hold on. *just 'hey'?*",
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'From "hey" to a | *Saturday date.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = F.T.hookUntil
