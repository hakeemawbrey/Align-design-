// nhce22: HOT TAKE, COLD TAKE, "The Longest Night" (14 s vertical star_advice trial reel, music: dreamy · Gb).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #22.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce22',
  hook: 'The *longest night* | of the year.',
  hot: { sign: 'aquarius', take: 'Stay up all night. Confess *everything.*', say: 'confession forty-one…', prop: 'moon', propAt: [770, 820], propK: 0.9, mood: 'wide' },
  cold: { sign: 'sagittarius', take: 'Make it a *solo* stargazing trip.', say: 'just me and the telescope.', prop: 'telescope', propAt: [760, 960], propK: 0.9, mood: 'happy' },
  last: 'Long night? Pull a *talk card.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
