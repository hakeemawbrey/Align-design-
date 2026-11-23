// Houston Star Talk (hst215): see promo/posting/htx/FARM.md and htxstar/w09news.js
import { makeEpisode } from '../../starrace/ep.js'
import { NEWS } from '../../htxstar/w09news.js'
export const { HOOK, HOOK_STYLE, HOOK_UNTIL, SCENES, DURATION, STORY_END, CUES, T } = makeEpisode({ id: 'leo', ...NEWS.hst215 })
