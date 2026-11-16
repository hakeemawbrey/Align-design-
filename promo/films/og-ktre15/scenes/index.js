// og-ktre15: social rework of ktre15 (TEXT RESCUE, "Had fun I guess"). Static HOOK (outline) replaces the slam title;
// kit copy ../rescuekit.js (no bug, no shakes/flashes, safe-zone layout); crazier lines; ends on the last beat (no loop-back).
// Cancer undersells a great first date. Say the good part out loud.
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre15', len: 20,
ending: 'cut', sender: 'cancer', partner: 'aries',
  hook: '', hookColor: '#ffb347',
  thread: [{ side: 'L', text: 'home safe? :)' }],
  rounds: [{
    draft: 'had fun i guess. whatever. k',
    caught: 'i guess',
    head: 'Say it was *good.*',
    lines: [
      { text: "you're allowed to say it was *good*." },
      { who: 'sender', text: "what if I'm more into it than *they* are? I already named our *dog*." },
      { text: 'then they get to know a *nice* thing. (skip the dog.)' },
    ],
    rewrite: 'I had a really good time tonight. can I see you again?',
    replies: ['I was literally typing the same thing', 'yes please. same table?'],
  }],
  last: 'Say the good part | *out loud.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Perfect first date. | *"had fun i guess."*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.T.hookUntil
