// og-nhce14: the social rework of nhce14, HOT TAKE, COLD TAKE, "Family Dinner, Month One" (star_advice, funk · G).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (box) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce14',
  hook: '',
  hot: { sign: 'sagittarius', take: 'Say yes. *Seven gifts.* Plan a family trip.', say: 'I booked us all a road trip!', prop: 'gifts', n: 7, propAt: [760, 900], propK: 0.95 },
  cold: { sign: 'capricorn', take: 'Say you’re booked *until 2030.*', say: 'my calendar is full. of nothing.', prop: 'calendar', n: 0, propAt: [760, 880], propK: 0.9, propOpts: { title: 'BOOKED', col: '#2a2148' }, mood: 'neutral' },
  last: 'Go if you’re ready. *Ask* who’ll be there.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'Month one. Their | *family* invited you.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
