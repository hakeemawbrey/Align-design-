// The Star Race · the night before Race 2: leo-aries (see promo/films/starrace/episodes.js, NIGHT)
import { makeEpisode } from '../../starrace/ep.js'
import { NIGHT } from '../../starrace/episodes.js'
export const { HOOK, HOOK_STYLE, HOOK_UNTIL, SCENES, DURATION, STORY_END, CUES, T } = makeEpisode({ id: 'leo', ...NIGHT['leo-aries'] })
