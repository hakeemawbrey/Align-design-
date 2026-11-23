// Houston Star Talk · worker w01 · 25 ADVICE episodes (hst011–hst035). Engine: ./w01.js (advice) on starrace/ep.js.
import { advice, GY } from './w01.js'

export const W01 = {
  // ♉ Taurus · stuck on 59 · lofi
  hst011: advice({
    sign: 'taurus', hook: 'Taurus, stuck on | 59 again?', close: 'New exit: Jan 9.', stars: ['taurus', 'cancer', 'virgo', 'pisces'],
    lesson: ['Comfort is home.', 'Growth is the date.'],
    beats: [
      { set: 'freeway', o: { road: '59', speed: 12 }, mood: 'squint', say: ['Hey Taurus. Yes, *you*.'] },
      { set: 'freeway', o: { road: '59', speed: 0 }, mood: 'eyeroll', say: ['Same lane. Same exit. Same playlist.'] },
      { set: 'tacotruck', mood: 'neutral', say: ['Same taco order since 2019.'], stick: 'BEAN + CHEESE. AGAIN.' },
      { set: 'porch', mood: 'sleepy', say: ['And every date idea is "maybe next week."'] },
      { set: 'porch', mood: 'wide', say: ['Comfort is your *superpower*.', 'But love needs one new exit.'] },
      { set: 'bellaire', mood: 'sparkle', say: ['Say yes to their side of town.'], stick: ['NEW EXIT UNLOCKED', '#7dffb0'] },
      { set: 'bats', mood: 'heart', say: ['Bellaire food crawl. Bats at sunset.', 'Let someone show you *their* Houston.'] },
    ],
  }),
}
