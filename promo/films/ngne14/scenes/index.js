// ngne14: STAR TALK GAME NIGHT, Ep 14 "Virgo Says It's Fine (Twice)" (36 s vertical, promo/films/next30/b08.md,
// music: jazzy · F). The show lives in ../../ngne13/gamekit.js (shared by ngne13–ngne24).
//   0.0 hook: Taurus mid-bite of a cookie, Virgo straightening things with a pen.
//   R1 'sorry I'm late, traffic': Taurus 'no stress. I ordered us snacks.' vs Virgo 'it's fine. 14 minutes. it's fine.' (Taurus)
//   R2 'They remember your order' both GREEN · R3 'Your date apologizes' both kind → Taurus 3, Virgo 2
import { makeGame } from '../../ngne13/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne14", "ep": 14, "a": "taurus", "b": "virgo", "accent": "#7fcf6a", "hookMood": {"a": "happy", "b": "neutral"}, "hookProps": {"a": "cookie", "b": "pen"}},
  hook: "Two earth signs. | Zero *rushing.*",
  intro: "earth night. *no* rushing.",
  rounds: [
    {"prompt": "sorry I'm late, traffic.", "buzz": "a", "a": {"text": "“no stress. I ordered us snacks.”"}, "b": {"text": "“it’s fine. 14 minutes. it’s fine.”", "mood": "squint"}, "win": "a", "line": "Virgo, “it’s fine” twice is not *fine.*"},
    {"prompt": "They remember your order without asking.", "buzz": "b", "a": {"flag": "green", "text": "that’s basically a love letter."}, "b": {"flag": "green", "text": "and they got it exactly right."}, "win": "ab", "line": "two greens. Taurus is *emotional.*"},
    {"prompt": "Your date apologizes for a small mistake.", "buzz": "a", "a": {"text": "Say thanks for saying sorry. Let it go."}, "b": {"text": "Thank them. No notes. (So hard.)"}, "win": "ab", "line": "Virgo held back the notes. *growth.*"},
  ],
  final: "And the kindest | is… *Taurus!*",
  last: "Kindness doesn't need *notes.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
