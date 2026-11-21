// The Star Race · between Race 1 and Race 2: Gemini's training episode (see promo/films/starrace/episodes.js)
import { makeEpisode } from '../../starrace/ep.js'
import { EPISODES } from '../../starrace/episodes.js'
export const { HOOK, HOOK_STYLE, HOOK_UNTIL, SCENES, DURATION, STORY_END, CUES, T } = makeEpisode({ id: 'gemini', ...EPISODES.gemini })
