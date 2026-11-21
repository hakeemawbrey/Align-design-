// whop-remix · "Feature Remix": the Align Houston Beta product-page film, retold with the 30s feature's own scene code
// (16:9, or 9:16 with &v). ~96 bpm feel; one idea per section; cuts are transitions (pixel wipes, mound, pushes).
//   0.00– 3.55  S1 hook      nebula + film grain, "The stars have aligned in Space City." word by word, crescent moon
//   2.95– 3.55               stepped pixel-star wipe
//   3.45– 6.95  S2 bracket   "{ cards, not swipes }" → "{ Houston ▣ beta }" (chip of real cards) → "{ Houston beta }",
//                            a constellation of people; ticks converge → pixel mound (6.2–6.9) floods into…
//   6.90–10.60  S3 mystery   Juniper's mystery card, camera eases back, slow 3D turn, gold foil · "No photos until you both align."
//  10.30–14.45  S4 deck      cards dealt into a 3D stack, camera pulls back · "every night / a new deck" · Juniper's card lands in front
//  14.05–19.05  S5 founder   her card glides to centre and flips into the founders card (holo border, FOUNDER № 0112),
//                            "Both align. Then you see them." → slow push onto the badge · "Numbered. Holo. Houston first."
//  18.75–23.00  S6 talk      talk cards drifting in 3D · "Then you talk in cards." → glass pill, camera eases onto the caret:
//                            "Night owl. You?" → tap send
//  22.40–25.75  S7 tagline   aurora nebula rises from below, "Dating, dealt by the stars" in corner ticks, constellation of people
//  25.25–25.65               pixel-star wipe from the bottom
//  25.60–29.10  S8 end       Align mark draws in, "Align", HOUSTON BETA, moon row new → full, fade to black
import { sceneHook, fxStairWipe } from './s1-hook.js'
import { sceneBracket } from './s2-bracket.js'
import { sceneMystery, S3 } from './s3-mystery.js'
import { sceneDeck } from './s4-deck.js'
import { sceneFounder } from './s5-founder.js'
import { sceneTalk } from './s6-talk.js'
import { sceneTagline } from './s7-tagline.js'
import { sceneEnd } from './s8-end.js'
import { fxMound } from './kit.js'
import { CUES as C } from './cues-list.js'

export const DURATION = 29.1
export const CUES = C
const MOUND = { start: 6.2, dur: S3.start - 6.2 }
const WIPE1 = { start: 2.95, dur: 0.6, color: '#140a30' }
const WIPE2 = { start: 25.25, dur: 0.4, color: '#0b0620', fromBottom: true, seed: 9 }

let s3 = null
/** pin a scene's stacking (films/main.js numbers roots by list order; S3 must sit above S4 while it pushes out) */
const z = (build, zi) => (stage) => { const s = build(stage); const u = s.update; s.update = (t) => { s.root.style.zIndex = String(zi); u(t) }; return s }
export const SCENES = [
  z(sceneHook, 20),
  z(sceneBracket, 21),
  (stage) => (s3 = sceneMystery(stage)),
  z(sceneDeck, 22),
  sceneFounder,
  sceneTalk,
  sceneTagline,
  sceneEnd,
  // transitions on the fx canvas (above everything)
  () => ({
    start: 0, end: DURATION, root: null, update() {},
    fx(ctx, t) {
      fxStairWipe(ctx, t, WIPE1)
      if (t < S3.start) fxMound(ctx, t, { ...MOUND, paint: s3.paint })
      fxStairWipe(ctx, t, WIPE2)
    },
  }),
]
