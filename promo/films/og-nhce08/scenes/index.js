// og-nhce08: the social rework of nhce08, HOT TAKE, COLD TAKE, "The Winter Playlist" (star_advice, lofi · Em).
// Same split-screen fire/frost format, cast and story; a static HOOK caption (box) from frame 0 instead of the
// film's own hook title, crazier takes, no series bug, no end card (the film ends on the warm take).
// Social kit copy: ./hckit.js (see its header). Timeline: hook 0–2.4 · HOT 2.4–5.3 · COLD 5.3–8.2 · WARM 8.2–11.6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce08',
  hook: '',
  hot: { sign: 'libra', take: 'Reply with *six volumes.* Nine hours each.', say: 'vol. 1 of 6. intermission at hour 4.', prop: 'phone', text: ['>WINTER VOL. 1 (9 hrs)', '>VOL. 2 (9 hrs)', '>VOL. 3 to 6 loading…'], propOpts: { title: 'playlists' }, propAt: [770, 880] },
  cold: { sign: 'cancer', take: 'Cry at track 3. Reply *“nice.”*', say: 'nice. (cried four times)', prop: 'phone', text: ['made you a winter playlist!', '>nice.'], propOpts: { title: 'crush' }, propAt: [770, 880], mood: 'neutral' },
  last: 'Tell them which song you *replayed.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the film's own hook title is removed in ./hckit.js)
export const HOOK = 'They made you | a *winter playlist.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4         // the "Hot take:" header lands at 2.46 (3 s on screen at the calm 0.8× speed)
