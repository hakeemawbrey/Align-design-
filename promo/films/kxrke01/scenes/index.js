// kxrke01: RANKING THE SIGNS: FULL COUNTDOWN, "Who takes being left on read the hardest" (≈88 s vertical star_talk post,
// promo/films/month2/m43.md, music: lofi · Em). No end card, no card cut; hard cut on the last line.
// The format lives in ./rankfull.js (shared by kxrke01–06, built on promo/films/hookkit.js).
//   0.0      frame 0: the twelve "? ? ?" plates mid-flight, a phone with "Read 9:14 PM" mid-slam, the slam title,
//            Pisces mid-sob. 0.42 whip zoom as the plates fly home, 1.27 shake as they land, 1.2 "WAIT FOR #1".
//   4.2–70.2 #12 Capricorn → #2 Cancer, one every 6 s, chapter stickers at 4.2 / 28.2 / 52.2 / 70.2.
//   71.0     3-2-1 drumroll · 73.6 #1 Pisces · 80.0 the twist: a notification, "sorry!! my phone died", everyone cheers
//   84.6     THE STARS: "Their silence isn't *your score.*"  Hard cut.
import { makeRankFull, SKYB } from './rankfull.js'
import { notification, notificationCues } from '../../hookkit.js'

const NOTIF = { at: 80.15, out: [83.7, 84.0], title: 'texts', body: 'sorry!! my phone *died*', glyph: '♥', time: 'now', y: 1122 }

const EP = makeRankFull({
  id: 'kxrke01',
  hook: 'Left on read. | Who *spirals* worst?',
  hookProp: { kind: 'phone', text: 'hey :)', sub: 'Read 9:14 PM', glow: true, s: 1.0, label: 'left on read', k: 1.1 },
  ranks: [
    { sign: 'pisces', tag: 'wrote a poem called “Read 9:14”', say: 'it’s called “Read 9:14”…', gag: { kind: 'tissues', label: 'a poem in six tissues' } },
    { sign: 'cancer', tag: 'already drafting the goodbye', say: 'it was nice knowing you…', gag: { kind: 'note', lines: ['dear you,', 'it was lovely.', 'goodbye x'], label: 'one hour in' } },
    { sign: 'scorpio', tag: '“not bothered.” reread it forty times', say: 'I’m not bothered.', mood: 'squint', gag: { kind: 'meter', to: 1, label: 'bothered-o-meter' } },
    { sign: 'virgo', tag: 'screenshots, with timestamps', say: 'read 9:14. it’s 9:41. noted.', gag: { kind: 'list', lines: ['9:14  read', '9:20  still read', '9:41  noted'], label: 'the evidence' } },
    { sign: 'gemini', tag: 'told three friends, live', say: 'update: STILL nothing!!', gag: { kind: 'phone', text: 'update #7', typing: true, label: 'live coverage' } },
    { sign: 'libra', tag: 'polled the group chat', say: 'okay, everyone vote. now.', gag: { kind: 'phone', text: 'is it over?', sub: 'POLL', label: 'everyone said: ask them' } },
    { sign: 'leo', tag: 'posted a selfie, just in case', say: 'so they see I’m fine. great.', gag: { kind: 'camera', label: 'totally unbothered' } },
    { sign: 'aries', tag: 'sent “??” after four minutes', say: 'HELLO?? ??', mood: 'wide', gag: { kind: 'phone', text: '??', sub: 'sent 9:18', label: 'four minutes. a record.' } },
    { sign: 'taurus', tag: 'made a snack. stayed calm.', say: 'I’ll check after the snack.', gag: { kind: 'snack', label: 'priorities' } },
    { sign: 'aquarius', tag: 'wrote a theory on read receipts', say: 'fascinating. a case study.', gag: { kind: 'slide', title: 'READ RECEIPTS: A THEORY', label: 'peer reviewed (by me)' } },
    { sign: 'sagittarius', tag: 'no signal. on a hike.', say: 'no bars, no problem!', gag: { kind: 'map', label: 'off-grid' } },
    { sign: 'capricorn', tag: 'didn’t notice. was working.', say: 'they replied? I was busy.', gag: { kind: 'calendar', text: '9–9', sub: 'WORK MODE', label: 'busy. happy.' } },
  ],
  twist: { who: null, say: null, gag: { kind: 'phone', text: 'sorry!! phone died', buzz: true, glow: true, s: 1.0, k: 0.75, label: 'they replied', labelCol: SKYB }, cheer: 'THEY REPLIED!!!' },
  last: 'Their silence isn’t *your score.*',
  scenes: [notification(NOTIF)],
  extraCues: notificationCues(NOTIF),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
