// og-ktre14: social rework of ktre14 (TEXT RESCUE, "Happy holidays (not in a weird way)"). Static HOOK (box) replaces the
// slam title; kit copy ../rescuekit.js (no bug, no shakes/flashes, safe-zone layout); crazier lines; hard cut.
// Gemini texts a crush holiday wishes, smothered in brackets.
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre14', len: 24,
ending: 'cut', sender: 'gemini', partner: 'capricorn',
  hook: '', hookColor: '#8fe3ff',
  thread: [{ side: 'L', text: 'good luck with your last exam!' }, { side: 'R', text: 'thank you!! you too' }],
  rounds: [{
    draft: 'happy holidays!!! (not in a weird way) (unless) (jk) (unless)',
    caught: '(not in a weird way)',
    head: 'Warm. Simple. *Open.*',
    lines: [
      { text: 'the brackets are having *their own conversation*.' },
      { retry: 'happy holidays to you and only you and your cat specifically', caught: 'only you' },
      { who: 'sender', text: 'but I want them to know I *like* them! in four languages!' },
      { text: 'one language. warm, simple, an *open door*.' },
    ],
    rewrite: 'happy holidays! hope your week is cozy. coffee in january?',
    replies: ['happy holidays!!', 'yes to coffee'],
  }],
  last: 'Leave out | *the brackets.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Texting my crush: | *(not in a weird way)*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = F.T.hookUntil
