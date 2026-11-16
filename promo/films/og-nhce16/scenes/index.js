// og-nhce16: the social rework of nhce16, HOT TAKE, COLD TAKE, "Snow Day" (star_advice, chiptune · G).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (box) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce16',
  hook: '',
  hot: { sign: 'aries', take: 'A *fourteen-hour* date. Starts in 4 minutes.', say: 'stop 9: sledding! run!', prop: 'clipboard', text: ['8AM pancakes', '9AM snow walk', '11AM skating', '1PM cocoa', '3PM sledding', '…14 stops'], propAt: [760, 880], propK: 0.9 },
  cold: { sign: 'virgo', take: 'Text “enjoy.” Fold *every* sock. Twice.', say: 'the socks needed me more.', prop: 'folded', propOpts: { tag: '✓ TIDY' }, propAt: [760, 900], mood: 'neutral', still: true },
  last: 'Ask for *one* cozy hour.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'Snow day. They’re | *free all day.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
