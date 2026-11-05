// ktre17: TEXT RESCUE, "The cancel that became a plan" (66 s vertical, Month 2 boost m12, star_advice post, music: lofi · C)
// Long: Libra cancels, then rescues it into a better plan in four chapters. Loop.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre17', len: 66,
ending: 'loop', sender: 'libra', partner: 'capricorn', chapters: true, promise: 'WATCH IT TURN INTO A PLAN', padMax: 1.0,
  hook: "Cancelling? | Don't kill the *date.*", hookColor: '#f59cc4',
  thread: [{ side: 'L', text: 'see you at 7 tonight!' }],
  rounds: [
    { chapter: 'THE CANCEL', draft: "can't tonight sorry", caught: 'sorry', head: 'Add a *new day.*',
      lines: [
        { text: 'a cancel with no plan B feels like a *no*.' },
        { who: 'sender', text: 'but I *do* want to see them! work just ate me.' },
        { text: 'then say that, and offer a *new night*.' },
      ],
      rewrite: "I'm so sorry, work ran late and I'm wiped. can we pick another night this week?",
      replies: ['ok.'] },
    { chapter: 'THE "OK."', draft: 'are you mad?? are you mad. you are mad', caught: 'you are mad', head: "Don't guess. *Name it.*",
      lines: [
        { text: "'ok.' is two letters, not a *verdict*." },
        { text: 'name the feeling kindly, *both sides*.' },
      ],
      rewrite: "totally ok if you're bummed. I am too. I was looking forward to it.",
      replies: ['honestly a little bummed', 'but thank you for saying that'] },
    { chapter: 'PICKING A NIGHT', draft: 'whatever works! any day! up to you!', caught: 'up to you!', head: 'Make it *easy.*',
      lines: [
        { text: 'make it easy for them to say *yes*.' },
        { retry: 'whatever works for you works for me!!', caught: 'whatever works' },
        { text: 'one day, one place, one *time*.' },
      ],
      rewrite: 'thursday at 7, the bookshop café? my treat.',
      replies: ['thursday works', 'I love that café'] },
    { chapter: 'THE DAY OF', keep: true, draft: "still on for tonight? I saved us the good table", head: 'Show up *warm.*',
      lines: [
        { who: 'sender', text: 'is it too much to *check in*?' },
        { text: 'no. this is just *warm*. send it.' },
        { who: 'pisces', text: 'the GOOD table (sob)' },
      ],
      replies: ['see you there', 'already on my way'] },
  ],
  last: 'A cancel can be | *a plan in disguise.*', rec: 'hold on. *no plan B?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
