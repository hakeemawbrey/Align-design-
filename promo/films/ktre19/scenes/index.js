// ktre19: TEXT RESCUE, "The mixed signals night" (78 s vertical, Month 2 boost m12, star_advice post, music: house · Bb)
// Long: Gemini gets slow, cold replies all night, and asks clearly instead of guessing. Five chapters. Loop.
// Built on promo/films/ktre01/rescuekit.js (+ hookkit.js). No end card, no card transition.
import { rescue } from '../../ktre01/rescuekit.js'

const F = rescue({ id: 'ktre19', len: 78,
ending: 'loop', sender: 'gemini', partner: 'scorpio', chapters: true, promise: 'WAIT FOR THE HONEST ANSWER', padMax: 1.0,
  hook: 'Mixed signals. | *All night.*', hookColor: '#ffe27a',
  thread: [{ side: 'R', text: 'how was your day?' }],
  receipt: 'Read 1 hour ago',
  rounds: [
    { chapter: 'THE SLOW REPLY', draft: '?? ok then forget it', caught: '??', head: 'Slow is not *cold.*',
      lines: [
        { text: 'one hour is not a *message*. breathe.' },
        { who: 'sender', text: 'but they always reply *fast*!' },
        { text: 'people have nights. just keep it *light*.' },
      ],
      rewrite: 'hope your night is going ok!',
      replies: ['fine'] },
    { chapter: 'THE "FINE"', draft: 'what does fine mean. FINE?? fine how', caught: 'FINE??', head: "Don't guess. *Ask.*",
      lines: [
        { text: "you can't decode 'fine'. you can *ask*." },
        { text: 'gently, with an *exit* for them.' },
      ],
      rewrite: 'you seem a bit quiet tonight. want to talk, or want space? both are ok.',
      replies: ['sorry. long day.', 'talking to you is nice though'] },
    { chapter: 'THE HOT AND COLD', incoming: ['also can I ask you something', 'nvm'], draft: "you're so confusing", caught: 'so confusing', head: 'Say where *you* are.',
      lines: [
        { text: 'blame starts a fight. *clarity* starts a talk.' },
        { who: 'sender', text: 'ok. I want to *know* where we are.' },
      ],
      rewrite: "I can't tell where we're at, and I'd honestly like to know. no pressure.",
      replies: [] },
    { chapter: 'THE HONEST ANSWER', incoming: ['ok honestly?', 'I really like you', "I'm just nervous it's going fast"], keep: true, draft: 'oh. ok. thank you for telling me', head: '*Hear* the answer.',
      lines: [
        { who: 'sender', text: 'they like me. they are *nervous*. that is not mixed.' },
        { text: 'exactly. now answer *kindly*. send.' },
        { who: 'pisces', text: 'THEY LIKE YOU (sob)' },
      ],
      replies: ['phew', 'ok'] },
    { chapter: 'THE CLEAR SIGNAL', draft: 'so you like me??? say it again', caught: 'say it again', head: 'Send a *clear* one.',
      lines: [
        { text: 'cute, but meet them where they *are*.' },
        { text: 'slow is good. *offer* something small.' },
      ],
      rewrite: 'I like you too. slow sounds really good to me. walk tomorrow?',
      replies: ['yes. 10am?', 'goodnight :)'] },
  ],
  last: 'Mixed signals? | *Send a clear one.*', rec: 'hold on. *one hour?*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
