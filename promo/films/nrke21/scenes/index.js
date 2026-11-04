// nrke21: RANKING THE SIGNS, "Who sends the most voice notes" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// chiptune · D). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who sends the / most *voice notes?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Virgo → #4 Pisces slam in.   6.3 card cut.   6.8 #3 Sagittarius · 7.7 #2 Leo
//   8.5–9.3    drumroll → #1 Gemini: "a twelve-minute voice note"
//   10.2       THE STARS: "Long or short, *your voice* is the good part."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke21',
  hook: "Who sends the | most *voice notes?*",
  ranks: [
    ["gemini", "a twelve-minute voice note"],
    ["leo", "voice notes with a voice"],
    ["sagittarius", "voice notes from a hike"],
    ["pisces", "voice note, mostly sniffles"],
    ["aries", "voice notes while running"],
    ["cancer", "a lullaby voice note"],
    ["libra", "a polite, perfect minute"],
    ["aquarius", "a podcast, basically"],
    ["taurus", "one. very calm. very slow."],
    ["scorpio", "a whisper. four seconds."],
    ["capricorn", "“call me.” (voice note)"],
    ["virgo", "sent a transcript too"],
  ],
  last: "Long or short, *your voice* is the good part.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
