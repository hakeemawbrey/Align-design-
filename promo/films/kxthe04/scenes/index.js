// kxthe04: THE THREAD: EXTENDED, episode 4, "Liked a Photo From Three Years Ago" (92 s vertical,
// promo/films/month2/m38.md row 4, music: dreamy · Db). One whole night in the chat → the 3 a.m. voice note. Hard cut.
//   0.0    frame 0: "Cancer liked their | *ex's old photo.*"  Cancer mid-scream, thumb on a glowing heart; the chat renamed
//          "CODE RED"; Cancer: "I LIKED IT" "FROM THREE YEARS AGO".
//   0.3    shake + colour flash; 1.3 the promise: "wait for the 3 a.m. voice note".
//   11 PM  rewind: "not looking at my ex's page" (on the fictional photo app Glimpse); the chat: sure.
//   1 AM   the like. Gemini triple, Scorpio: "screenshot?", Leo pins it, Capricorn's crisis agenda, Aries: "own it".
//   1:30   unliked; loading bar "did they see…"; Virgo: "missing someone isn't a crime. put the phone down. tell us."
//   2 AM   Cancer tells the chat what they miss; realises: "I miss how I felt, not them"; mutes the page; Taurus: soup sunday.
//   3 AM   Pisces' 3 a.m. voice note: "I miss my ex's DOG". Last line, hard cut at 92.
import { makeXThread, R, MONO, BONE, LAV, INK, GOLD, RED, drawBits, HEART, hearts, prog, ease, clamp } from '../../kxthe01/xthread.js'
import { xfx } from '../../kxthe01/xfx.js'

const LEN = 92

// the fictional "Glimpse" photo post from three years ago, with a heart that fills (liked) then empties (unliked)
function oldPost(x, t, w, h, m) {
  R(x, '#140e2c', 0, 0, w, h)
  x.font = `700 22px ${MONO}`; x.fillStyle = LAV; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('Glimpse · @the_ex · 3 years ago', 16, 22)
  // the photo: a beach at sunset in pixels
  R(x, '#ff9a6a', 16, 44, w - 32, 70); R(x, '#ffcf8a', 16, 114, w - 32, 30); R(x, '#3a6ab0', 16, 144, w - 32, 56)
  R(x, '#ffe7a8', w / 2 - 26, 92, 52, 30)
  const liked = t >= m.liked && t < m.unliked
  const k = liked ? ease.outBack(prog(t, m.liked, m.liked + 0.3)) : 1
  drawBits(x, HEART, { H: liked ? '#ff5c8a' : '#3b3466' }, 50, h - 30, 5 * k, { outline: liked ? INK : '#8a83b8' })
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.fillText(liked ? 'liked by you' : '…', 90, h - 30)
}

const EP = makeXThread({
  id: 'kxthe04', len: LEN, chat: 'CODE RED', renames: [[3.0, 'say it out loud'], [27.0, 'CODE RED (again)'], [66.0, 'say it out loud']],
  heads: [
    { at: -1, text: 'Cancer liked their | *ex\'s old photo.*', accent: '#9fd8f6' },
    { at: 3.0, text: 'Missing an ex | *at 1 a.m.*' },
    { at: 4.6, text: 'Earlier: | *"I\'m fine."*' },
    { at: 17.6, text: 'The *2 a.m.* | scroll.', accent: '#9fd8f6' },
    { at: 26.4, text: 'Thumb. Heart. | *Three years ago.*', accent: '#ff5c8a' },
    { at: 36.4, text: 'The crisis | *agenda.*' },
    { at: 45.0, text: 'Virgo has | *the answer.*' },
    { at: 52.6, text: 'What Cancer | *actually misses.*' },
    { at: 62.6, text: 'Muted. | *Not deleted. Muted.*' },
    { at: 74.4, text: 'The *3 a.m.* | voice note.' },
  ],
  last: { at: 90.25, text: 'Miss the feeling. | *Mute the page.*' },
  pins: [[31.0, { from: 'leo', text: 'Leo: CANCER LIKED A PHOTO FROM THREE YEARS AGO' }], [70.0, { from: 'leo', text: 'Leo: proud of Cancer (pinned by Leo, about Leo being proud)' }]],
  msgs: [
    { at: -1, kind: 'divider', text: '1:41 AM' },
    { at: -0.9, kind: 'image', from: 'cancer', w: 640, h: 270, draw: oldPost, liked: -5, unliked: 39.2 },
    { at: -0.5, from: 'cancer', text: '*I LIKED IT*', big: true },
    { at: -0.3, from: 'cancer', text: 'FROM *THREE YEARS AGO*' },
    { at: 3.8, kind: 'divider', text: 'earlier · 11:02 PM' },
    { at: 4.6, from: 'cancer', text: "I'm fine. I'm *not* looking at my ex's page" },
    { at: 6.0, from: 'scorpio', text: 'sure.' },
    { at: 6.8, from: 'libra', text: 'sure!!' },
    { at: 7.6, kind: 'triple', from: 'gemini', items: [{ to: 'cancer', text: 'sure' }, { to: 'scorpio', text: 'sure' }, { to: 'libra', text: 'sure' }] },
    { at: 9.6, from: 'cancer', text: "it's the holidays. I'm *a little sad.* that's all" },
    { at: 11.2, kind: 'voice', from: 'pisces', dur: '0:40', note: '(crying: the holidays are a LOT)' },
    { at: 13.2, from: 'taurus', text: 'do you want soup. I can make soup' },
    { at: 14.6, from: 'cancer', text: "no. going to bed. *phone down.* goodnight" },
    { at: 16.0, kind: 'system', text: 'Cancer went quiet' },
    { at: 17.0, kind: 'divider', text: '1:38 AM' },
    { at: 17.6, from: 'cancer', text: 'ok so I did not go to bed' },
    { at: 19.0, from: 'cancer', text: 'I was *just looking.* scrolling. back. and back.' },
    { at: 20.6, from: 'aquarius', text: 'the archaeology scroll. *dangerous*' },
    { at: 22.0, from: 'cancer', text: 'and then my thumb' },
    { at: 23.0, from: 'cancer', text: 'my thumb *slipped*' },
    { at: 24.2, kind: 'image', from: 'cancer', w: 640, h: 270, draw: oldPost, liked: 26.4, unliked: 39.2 },
    { at: 27.0, kind: 'system', text: '♋︎ Cancer renamed the chat CODE RED (again)' },
    { at: 29.5, kind: 'triple', from: 'gemini', items: [{ to: 'cancer', text: 'UNLIKE IT' }, { to: 'cancer', text: "DON'T, they'll get two alerts" }, { to: 'cancer', text: "they've seen it" }] },
    { at: 30.5, from: 'scorpio', text: 'screenshot?' },
    { at: 31.0, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 32.2, from: 'aries', text: '*own it.* comment "nice beach"' },
    { at: 33.2, from: 'virgo', text: 'no comments.', react: [[33.8, 'ha', 9]] },
    { at: 34.4, kind: 'voice', from: 'pisces', dur: '1:11', note: '(sobbing: I would have DIED)' },
    { at: 36.4, kind: 'agenda', from: 'capricorn', title: 'CRISIS AGENDA', items: ['unlike, calmly', 'phone face-down', { text: 'feelings (all of them)', hi: true }] },
    { at: 39.2, from: 'cancer', text: 'unliked. *shaking.* did they see' },
    { at: 44.0, from: 'cancer', text: 'what if they think I *miss* them' },
    { at: 45.0, from: 'virgo', text: "you probably do. *missing someone isn't a crime.* put the phone down and tell us what you miss.", big: true, react: [[46.2, 'heart', 11], [46.5, 'tear', 4]] },
    { at: 48.8, from: 'cancer', text: '…okay' },
    { at: 50.0, kind: 'divider', text: '2:10 AM' },
    { at: 50.4, from: 'cancer', text: 'the sunday soup. the dumb jokes. falling asleep on the couch' },
    { at: 52.6, from: 'cancer', text: 'someone who texted *"home safe?"*', react: [[53.2, 'tear', 9]] },
    { at: 54.2, from: 'libra', text: 'those are lovely things to miss' },
    { at: 55.6, from: 'scorpio', text: 'do you miss *them* or those things' },
    { at: 57.2, from: 'cancer', text: '…the things.' },
    { at: 58.4, from: 'cancer', text: '*I miss how I felt.* not them.', big: true, react: [[59.4, 'heart', 11]] },
    { at: 60.6, from: 'aquarius', text: 'that is a very clean sentence for 2 a.m.' },
    { at: 62.0, kind: 'system', text: "Cancer muted @the_ex's page" },
    { at: 62.6, from: 'cancer', text: 'muted. *not blocked, not deleted.* just quiet for a while' },
    { at: 64.4, from: 'taurus', text: 'sunday. my place. *I make the soup now*', react: [[65.0, 'heart', 10]] },
    { at: 66.0, kind: 'system', text: '♋︎ Cancer renamed the chat say it out loud' },
    { at: 67.2, from: 'sagittarius', text: 'and I will text you "home safe?" *every single time*' },
    { at: 68.8, from: 'leo', text: 'the chat says home safe. *pinning my feelings about this*' },
    { at: 70.0, kind: 'system', text: '♌︎ Leo pinned a message (its own)' },
    { at: 71.4, kind: 'system', text: '11 people said goodnight' },
    { at: 73.6, kind: 'divider', text: '3:02 AM' },
    { at: 74.4, kind: 'voice', from: 'pisces', dur: '3:02', note: '(sobbing: I miss my ex\'s DOG)', react: [[76.4, 'heart', 11], [76.8, 'ha', 11]] },
    { at: 77.6, from: 'cancer', text: 'Pisces. *the dog.*' },
    { at: 78.6, from: 'pisces', text: 'his name was Pancake and he LOVED me', big: true },
    { at: 80.6, from: 'scorpio', text: 'grief is grief.', react: [[81.2, 'tear', 6]] },
    { at: 82.0, from: 'gemini', text: 'I will draw you a Pancake' },
    { at: 83.4, from: 'cancer', text: 'thank you all. *phone down for real.* goodnight' },
    { at: 85.4, kind: 'system', text: 'Cancer is asleep' },
    { at: 86.6, from: 'virgo', text: 'proud of you. *sleep.*' },
  ],
  typing: [{ label: '11 people are typing', a: 0.2, b: 3.7 }, { from: 'cancer', a: 40.0, b: 43.9 }, { from: 'virgo', a: 43.2, b: 44.95 }],
  stage: [
    { at: -1, sign: 'cancer', mood: 'wide', look: [1, -0.5], hops: [-0.15] },
    { at: 4.6, sign: 'cancer', mood: 'neutral' },
    { at: 6.0, sign: 'scorpio', mood: 'squint', two: { sign: 'libra', mood: 'squint', at: 6.8 } },
    { at: 7.6, sign: 'gemini', mood: 'squint', hops: [7.8, 8.0] },
    { at: 9.6, sign: 'cancer', mood: 'neutral', tears: 1 },
    { at: 13.2, sign: 'taurus', mood: 'happy' },
    { at: 14.6, sign: 'cancer', mood: 'sleepy' },
    { at: 17.6, sign: 'cancer', mood: 'squint', look: [1, -1] },
    { at: 20.6, sign: 'aquarius', mood: 'wide' },
    { at: 22.0, sign: 'cancer', mood: 'wide', look: [1, -1] },
    { at: 26.4, sign: 'cancer', mood: 'wide', look: [0, 0], hops: [26.6, 26.9] },
    { at: 29.5, sign: 'gemini', mood: 'wide', hops: [29.7, 29.9] },
    { at: 30.5, sign: 'scorpio', mood: 'squint' },
    { at: 32.2, sign: 'aries', mood: 'happy', two: { sign: 'virgo', mood: 'squint', at: 33.2 } },
    { at: 36.4, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 39.2, sign: 'cancer', mood: 'wide', tears: 1 },
    { at: 45.0, sign: 'virgo', mood: 'happy', look: [1, -1] },
    { at: 48.8, sign: 'cancer', mood: 'neutral', tears: 1 },
    { at: 54.2, sign: 'libra', mood: 'happy' },
    { at: 55.6, sign: 'scorpio', mood: 'neutral' },
    { at: 57.2, sign: 'cancer', mood: 'neutral', look: [0, 0] },
    { at: 58.4, sign: 'cancer', mood: 'sparkle', tears: 2 },
    { at: 60.6, sign: 'aquarius', mood: 'happy' },
    { at: 62.6, sign: 'cancer', mood: 'happy' },
    { at: 64.4, sign: 'taurus', mood: 'happy', hops: [64.6] },
    { at: 67.2, sign: 'sagittarius', mood: 'happy' },
    { at: 68.8, sign: 'leo', mood: 'sparkle' },
    { at: 77.6, sign: 'cancer', mood: 'squint' },
    { at: 80.6, sign: 'scorpio', mood: 'neutral' },
    { at: 82.0, sign: 'gemini', mood: 'happy' },
    { at: 83.4, sign: 'cancer', mood: 'sleepy' },
    { at: 86.6, sign: 'virgo', mood: 'happy' },
  ],
  cry: [[-1, 2], [11.2, 3], [13.0, 1], [26.4, 2], [34.4, 3], [36.4, 2], [45.0, 3], [47.0, 2], [58.4, 3], [60.4, 2], [74.4, 3]],
  pisMood: [[-1, 'wide'], [11.2, 'sparkle'], [17.6, 'neutral'], [26.4, 'wide'], [34.4, 'sparkle'], [50.4, 'happy'], [73.6, 'sleepy'], [74.4, 'sparkle']],
  extra(x, t) {
    hearts(x, t, 58.6, 300, 1520, { n: 6, cols: ['#9fd8f6', '#ff8fb1', GOLD] })
    hearts(x, t, 74.6, 918, 1600, { n: 6 })
  },
  overlays: xfx({
    len: LEN,
    shake0: true,
    promise: { at: 1.3, text: 'wait for the *3 a.m.* voice note' },
    rewind: { at: 3.8, text: 'EARLIER · 11 PM' },
    chapters: [[3.8, '11 PM'], [17.0, '1:38 AM'], [36.4, '1:45 AM'], [50.0, '2 AM'], [73.6, '3 AM']],
    loading: { a: 40.0, b: 43.9, text: 'did they see it…' },
    shakes: [26.4, 29.5, 78.6],
    flashes: [[0.3, '#ff5c8a'], [26.4, '#ff5c8a'], [58.4, '#9fd8f6']],
    caught: [{ at: 27.35, x: 228, y: 1312, rx: 70, ry: 50, text: 'the thumb', arrow: 'tr' }],
  }),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
