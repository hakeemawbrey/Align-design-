// Houston Star Talk (hst308): reality dating show parody. See promo/posting/htx/FARM.md and htxstar/w12real.js
import { makeEpisode } from '../../starrace/ep.js'
import { realEp, W12R } from '../../htxstar/w12real.js'
export const { HOOK, HOOK_STYLE, HOOK_UNTIL, SCENES, DURATION, STORY_END, CUES, T } = makeEpisode({ id: 'scorpio', ...realEp(W12R.hst308) })
