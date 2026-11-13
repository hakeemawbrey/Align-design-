// Social mode for the OG Star Talk films (render.mjs --social, teaser-sound.mjs --social): the old stories keep their own
// look, but the shared pieces that made them feel like ads/episodes switch off:
//   • endcard.js  → no "come Align" end card; the film ends where its story ends (socialEnd.t = the end card's start)
//   • cardfx.js   → no card-flip / deal / shuffle cuts, no tarot border with the episode numeral (cardFrame)
// main.js reads it to cut DURATION; teaser-sound reads socialEnd.t to cut the score. Off by default (nothing changes).
export const SOCIAL = (typeof location !== 'undefined' && new URLSearchParams(location.search).has('social')) ||
  (typeof process !== 'undefined' && process.env && process.env.SOCIAL === '1')
export const socialEnd = { t: Infinity }
export const noScene = async () => ({ start: 0, end: 0, root: null, update() {} })
