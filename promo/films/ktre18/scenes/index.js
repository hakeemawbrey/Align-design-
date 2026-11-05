// ktre18: TEXT RESCUE, "Texting an old friend after a year" (70 s vertical, Month 2 boost m12, star_advice post, music: dreamy · D)
// Long: Pisces reaches out to an old friend after a year of silence. Four chapters. Hard cut.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre18', len: 70,
ending: 'cut', sender: 'pisces', peek: 'virgo', partner: 'sagittarius', chapters: true, promise: 'WAIT FOR THEIR REPLY', padMax: 1.0,
  hook: 'One year of silence. | *One text.*', hookColor: '#8fe3ff',
  thread: [{ side: 'L', text: 'happy birthday!! miss you' }, { side: 'R', text: 'thank you!! let us catch up soon' }],
  receipt: 'Last year',
  rounds: [
    { chapter: 'THE OPENER', draft: 'hey stranger lol you probably forgot me', caught: 'you probably forgot me', head: 'Lead with *the truth.*',
      lines: [
        { text: 'no self-roasting. lead with the *real* thing.' },
        { who: 'sender', text: 'the real thing is I just *miss* them.' },
        { text: 'then that is the *text*.' },
      ],
      rewrite: 'I miss you. saw a dog in a tiny hat today and thought of you.',
      replies: [] },
    { chapter: 'THE WAIT', bar: { label: 'overthinking…', error: 'Error: too many feelings' }, draft: 'sorry that was weird ignore me', caught: 'ignore me', head: 'Let it *land.*',
      lines: [
        { text: 'do not un-send your heart. let it *land*.' },
        { who: 'sender', text: 'ok. breathing. waiting. *crying a bit*.' },
      ],
      rewrite: '(no rush, by the way!)',
      replies: ['I MISS YOU TOO', 'a dog in a TINY HAT??'] },
    { chapter: 'THE SORRY', tall: true, draft: "I'm so sorry I disappeared, I'm the worst, I know I missed your move and your new job and your cat's birthday and honestly I don't deserve", caught: "I'm the worst", head: 'Sorry, *not* a trial.',
      lines: [
        { text: 'an apology, not a *trial*. keep it kind.' },
        { text: 'to them *and* to you.' },
      ],
      rewrite: "I'm sorry I went quiet. life got heavy, and I missed you the whole time.",
      replies: ['you never have to explain', 'I am just happy you are here'] },
    { chapter: 'THE PLAN', draft: 'we should catch up sometime!!', caught: 'sometime', head: 'Make it *real.*',
      lines: [
        { text: "'sometime' is how last year *happened*." },
        { who: 'sagittarius', sign: 'sagittarius', text: 'I would genuinely love a walk.' },
      ],
      rewrite: 'walk on sunday? same park as always?',
      replies: ['already putting my shoes on', '(it is wednesday)'] },
  ],
  last: "Friends don't need | *a perfect reason.*", rec: 'hold on. *forgot you?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
