// Houston Star Talk (hst292): game-show parody. See promo/posting/htx/FARM.md and htxstar/w12game.js
import { makeEpisode } from '../../starrace/ep.js'
import { gameEp, W12G } from '../../htxstar/w12game.js'
export const { HOOK, HOOK_STYLE, HOOK_UNTIL, SCENES, DURATION, STORY_END, CUES, T } = makeEpisode({ id: W12G.hst292.host, ...gameEp(W12G.hst292) })
