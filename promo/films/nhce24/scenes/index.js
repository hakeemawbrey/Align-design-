// nhce24: HOT TAKE, COLD TAKE, "They Planned Everything" (14 s vertical star_advice trial reel, music: funk · D).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #24.
import { makeHC } from '../../nhce01/scenes/hckit.js'

const EP = makeHC({
  id: 'nhce24',
  hook: 'They planned the *whole* | winter date.',
  hot: { sign: 'capricorn', take: 'Plan three *bigger* ones back.', say: 'I booked through April.', prop: 'calendar', n: 25, propAt: [760, 880], propK: 0.9, propOpts: { title: 'JAN–APR', mark: 'x' } },
  cold: { sign: 'pisces', take: 'Say “cool, thanks.” Look at the *floor.*', say: 'cool. thanks. (sniff)', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'wide', look: [0, 1], still: true },
  last: 'Tell them what you *loved* about it.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
