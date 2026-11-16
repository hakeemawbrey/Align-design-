// og-ktre13: social rework of ktre13 (TEXT RESCUE, "The strong friend needs a minute"). Static HOOK (outline) replaces the
// slam title; kit copy ../rescuekit.js (no bug, no shakes/flashes, safe-zone layout); crazier lines; ends on the last beat.
// Leo gives everyone advice and never takes it. The group chat shows up.
import { rescue } from '../rescuekit.js'

const F = rescue({ id: 'og-ktre13', len: 22,
ending: 'cut', sender: 'leo', title: '✦ the group chat',
  hook: '', hookColor: '#ffb347',
  thread: [{ side: 'L', text: '♓︎ leo your voice note fixed my whole life' }, { side: 'L', text: '♊︎ ok but how are YOU tho' }],
  rounds: [{
    draft: "I'm THRIVING!! anyway how are YOU",
    caught: "I'm THRIVING!!",
    head: 'Let them *hold* you.',
    lines: [
      { text: 'you gave everyone a pep talk today. let them *hold you*.' },
      { who: 'sender', text: "but I'm the *strong* one. I own a cape." },
      { text: 'even capes get a *wash day*.' },
      { who: 'pisces', text: 'I have been crying about this for MONTHS (sob)' },
    ],
    rewrite: "actually, could I vent for a sec? it's been a week.",
    replies: ['♋︎ ALWAYS', '♉︎ calling you now. pick up.', '♓︎ on my way with snacks and tissues'],
  }],
  last: 'The strong friend | gets to *text too.*',
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, T = F.T
export const HOOK = 'Fixes everyone. | *Never* himself.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = F.T.hookUntil
