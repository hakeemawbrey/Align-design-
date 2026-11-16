// og-ktte08 score (drop moved to the first pick): synthwave, C# (arranged by the style engine in promo/scripts/teaser-sound.mjs). drop on the scratch · lift on ASK · lands under the last line.
import { DURATION, CUES, LIFT, FIRST } from './scenes/index.js'
export default { id: 'og-ktte08', duration: DURATION, music: { style: 'synthwave', key: 'C#', seed: 2908, sections: { drop: FIRST, lift: [LIFT], outroAt: DURATION - 1.6 }, hits: [LIFT] }, cues: CUES }
