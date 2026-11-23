// Houston Star Talk (hst468): see promo/posting/htx/FARM.md and htxstar/w19-weather.js
import { makeEpisode } from '../../starrace/ep.js'
import { W19W } from '../../htxstar/w19-weather.js'
export const { HOOK, HOOK_STYLE, HOOK_UNTIL, SCENES, DURATION, STORY_END, CUES, T } = makeEpisode({ id: 'hst468', ...W19W.hst468 })
