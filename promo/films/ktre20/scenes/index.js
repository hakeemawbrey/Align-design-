// ktre20: TEXT RESCUE, "The first "I like you"" (84 s vertical, Month 2 boost m12, star_advice post, music: jazzy · Eb)
// Long: Taurus finally says it. Five chapters, THE STARS hand the big text back untouched. Hard cut.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre20', len: 84,
ending: 'cut', sender: 'taurus', partner: 'aquarius', chapters: true, promise: 'THE ENDING, THOUGH', padMax: 1.5,
  hook: 'Taurus is saying it. | *Tonight.*', hookColor: '#9fe6b0',
  thread: [{ side: 'L', text: 'that was the best movie night' }, { side: 'R', text: 'agreed!!' }],
  rounds: [
    { chapter: 'THE WARM-UP', draft: "ok random question but no it's nothing", caught: "no it's nothing", head: 'Keep *going.*',
      lines: [
        { who: 'sender', text: 'I typed this *eleven* times tonight.' },
        { text: 'you started. that was the *hard* part.' },
        { text: 'just do not take it back *in the same breath*.' },
      ],
      rewrite: 'ok random question',
      replies: ['go on…'] },
    { chapter: 'THE DODGE', draft: 'nvm it is dumb, how is your cat', caught: 'nvm it is dumb', head: 'No *dodging.*',
      lines: [
        { text: 'they said *go on*. that is a green light.' },
        { retry: 'haha anyway', caught: 'anyway' },
        { text: 'also a dodge, sweet bull. *breathe*.' },
      ],
      rewrite: 'ok. give me one sec, I am being brave.',
      replies: ['take your time :)'] },
    { chapter: 'THE BIG TEXT', keep: true, draft: 'I like you. like, a lot.', head: 'This one is *perfect.*',
      lines: [
        { who: 'sender', text: 'is it too much? fix it! *fix it*!' },
        { text: 'nothing to fix. honest and kind. *send it*.' },
      ],
      replies: [] },
    { chapter: 'THE WAIT', bar: { label: 'waiting…', error: 'Error: holding breath' }, draft: 'I mean it is fine if not!! forget I said', caught: 'forget I said', head: 'Let it *stand.*',
      lines: [
        { text: 'you said a true thing. let it *stand*.' },
        { who: 'pisces', text: 'I cannot breathe (sob)' },
      ],
      rewrite: '(no pressure at all)',
      replies: ['I like you too.', 'I was scared to say it first.'] },
    { chapter: 'THE PLAN', draft: 'omg ok so what now. are we. do we. what', caught: 'what now', head: 'Now *plan something.*',
      lines: [
        { text: 'now? you plan something *nice*.' },
        { who: 'sender', text: 'friday is a clear night. *stargazing*?' },
      ],
      rewrite: 'stargazing on friday? I will bring blankets and snacks.',
      replies: ['yes', 'yes yes yes'] },
  ],
  endMood: 'heart',
  last: 'Sometimes the rescue | is *just sending it.*', rec: 'hold on. *eleven times?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
