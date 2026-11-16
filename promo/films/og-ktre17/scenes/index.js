// og-ktre17: social rework of ktre17 (static HOOK outline replaces the slam title; kit copy ../rescuekit.js: no bug, no
// numbered chapter stickers, no shakes/flashes, safe-zone layout; crazier lines; ends on the last beat). Was: TEXT RESCUE, "The cancel that became a plan" (66 s vertical, Month 2 boost m12, star_advice post, music: lofi · C)
// Long: Libra cancels, then rescues it into a better plan in four chapters. Loop.
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre17', len: 68,
ending: 'cut', sender: 'libra', partner: 'capricorn', chapters: true, promise: 'WATCH IT TURN INTO A PLAN', padMax: 1.0,
  hook: '', hookColor: '#f59cc4',
  thread: [{ side: 'L', text: 'see you at 7 tonight!' }],
  rounds: [
    { chapter: 'THE CANCEL', draft: "can't tonight sorry", caught: 'sorry', head: 'Add a *new day.*',
      lines: [
        { text: 'a cancel with no plan B feels like a *no*.' },
        { who: 'sender', text: 'but I *do* want to see them! I made a pros and cons list about it.' },
        { text: 'then say that, and offer a *new night*.' },
      ],
      rewrite: "I'm so sorry, work ran late and I'm wiped. can we pick another night this week?",
      replies: ['ok.'] },
    { chapter: 'THE "OK."', draft: 'are you mad?? are you mad. you are mad. I would be mad', caught: 'you are mad', head: "Don't guess. *Name it.*",
      lines: [
        { text: "'ok.' is two letters, not a *verdict*." },
        { text: 'name the feeling kindly, *both sides*.' },
      ],
      rewrite: "totally ok if you're bummed. I am too. I was looking forward to it.",
      replies: ['honestly a little bummed', 'but thank you for saying that'] },
    { chapter: 'PICKING A NIGHT', draft: 'whatever works! any day! up to you! or me! or both!', caught: 'up to you!', head: 'Make it *easy.*',
      lines: [
        { text: 'make it easy for them to say *yes*.' },
        { retry: 'whatever works for you works for me!!', caught: 'whatever works' },
        { text: 'one day, one place, one *time*.' },
      ],
      rewrite: 'thursday at 7, the bookshop café? my treat.',
      replies: ['thursday works', 'I love that café'] },
    { chapter: 'THE DAY OF', keep: true, draft: "still on for tonight? I saved us the good table", head: 'Show up *warm.*',
      lines: [
        { who: 'sender', text: 'is it too much to *check in*? I checked in four times in my head.' },
        { text: 'no. this is just *warm*. send it.' },
        { who: 'pisces', text: 'they saved the GOOD TABLE (sob)' },
      ],
      replies: ['see you there', 'already on my way'] },
  ],
  last: 'A cancel can be | *a plan in disguise.*', rec: 'hold on. *no plan B?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Cancelling a date? | *Do it like this.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.T.hookUntil
