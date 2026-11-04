// nhce01: HOT TAKE, COLD TAKE, "First Snow Text" (16 s vertical star_advice trial reel, music: pop · C).
// Story 0–11.6, then the shared end card. The format look lives in ./hckit.js (imported by nhce02–24).
//   0.0–2.4   hook: "Your crush texts: | *“it’s snowing!!”*"  Split screen: ♈ Aries mid-hop on the fire half,
//             ♑ Capricorn shivering on the frost half, the thermometer on the seam, Pisces sniffling below.
//   2.4–5.3   HOT TAKE (Aries): "Sprint over. Build a snowman. *Now.*"  A snowman builds itself ball by ball;
//             Aries: "already outside!!"  The thermometer shoots up and rattles.
//   5.3       card cut.
//   5.3–8.2   COLD TAKE (Capricorn): "Reply Thursday. Stay *composed.*"  The phone shows "it’s snowing!!" unanswered,
//             a draft types and stops; Capricorn: "will respond in due course."  The thermometer drops.
//   8.2–11.6  WARM TAKE: the frost melts to amber, the thermometer settles on JUST RIGHT. THE STARS:
//             "Send a snow photo back. *Joy* is allowed."  Pisces: happy-tear fountains.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'nhce01',
  hook: 'Your crush texts: | *“it’s snowing!!”*',
  accent: '#9fdcff',
  hot: {
    sign: 'aries', take: 'Sprint over. Build a snowman. *Now.*', say: 'already outside!!',
    prop: 'snowman', propAt: [760, 900], propK: 0.95,
    cues: [['pop', 0.2, 659.25, 0.04, 0.3], ['pop', 0.56, 783.99, 0.04, 0.3], ['pop', 0.83, 987.77, 0.04, 0.3]],
  },
  cold: {
    sign: 'capricorn', take: 'Reply Thursday. Stay *composed.*', say: 'will respond in due course.', mood: 'neutral', still: false,
    prop: 'phone', propAt: [770, 880], text: ['it’s snowing!!', 'come see!!'], propOpts: { title: 'crush', status: 'draft saved: Thu' },
    cues: [['tick', 0.5, 0.03], ['tick', 0.65, 0.03], ['tick', 0.8, 0.03]],
  },
  last: 'Send a snow photo back. *Joy* is allowed.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
