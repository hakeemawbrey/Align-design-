// kxthe08: THE THREAD: EXTENDED, episode 8, "Pisces Can't Sleep (Night Shift)" (92 s vertical,
// promo/films/month2/m38.md row 8, music: dreamy · E). One whole night in the chat → the last voice note. Hard cut.
//   0.0    frame 0: "Pisces sent | *voice note number nine.*"  Pisces mid-sob; three voice notes stacked; the counter chip
//          VOICE NOTES: #9.
//   0.35   record scratch on the ninth note; 1.3 the promise: "wait for the last voice note".
//   11 PM  first date tomorrow, can't sleep; Capricorn's NIGHT SHIFT ROTA (Leo, Scorpio, Taurus, Sag, Virgo).
//   Leo    pep talk: "I AM A CATCH"; pinned.      Scorpio  "what are you actually scared of?" "that I'll cry."
//   Taurus warm milk (jam works); Gemini sneaks in a triple.      Sag  a bedtime story, typo storm, falls asleep.
//   Cancer (not on the rota) hums a lullaby voice note.
//   3 AM   Virgo: "nerves are just caring, loudly. and crying means you're you." Pisces' last voice note: snoring, one
//          happy tear. 9 AM: "on my way. crying (the good kind)". Last line, hard cut at 92.
import { makeXThread, hearts, confetti } from '../../kxthe01/xthread.js'
import { xfx } from '../../kxthe01/xfx.js'

const LEN = 92

const EP = makeXThread({
  id: 'kxthe08', len: LEN, chat: 'say it out loud',
  heads: [
    { at: -1, text: 'Pisces sent | *voice note number nine.*', accent: '#b9a6ff' },
    { at: 3.0, text: 'First date tomorrow. | *Can\'t sleep.*' },
    { at: 4.8, text: 'Capricorn made | *a rota.*' },
    { at: 10.8, text: "Leo's shift: | *the pep talk.*" },
    { at: 21.6, text: "Scorpio's shift: | *the real question.*" },
    { at: 33.6, text: "Taurus's shift: | *warm milk.*" },
    { at: 44.0, text: "Sag's shift: | *a bedtime story.*" },
    { at: 57.6, text: 'Off the rota: | *a lullaby.*' },
    { at: 62.2, text: "Virgo's shift: | *3 a.m.*" },
    { at: 73.4, text: 'The *last* | voice note.' },
  ],
  last: { at: 90.25, text: 'Nerves are just caring, | *loudly.*' },
  pins: [[15.4, { from: 'leo', text: 'Leo: PISCES IS A CATCH (Leo said it first)' }], [81.4, { from: 'leo', text: 'Leo: pinning the snore. historic' }]],
  msgs: [
    { at: -1, kind: 'divider', text: '11:04 PM' },
    { at: -0.95, kind: 'voice', from: 'pisces', dur: '0:41', note: '(#7: what if I say something weird)' },
    { at: -0.7, kind: 'voice', from: 'pisces', dur: '1:03', note: '(#8: what if I cry at the menu)' },
    { at: -0.4, kind: 'voice', from: 'pisces', dur: '2:12', note: '(#9: sobbing, words unclear)' },
    { at: 1.2, from: 'leo', text: 'Pisces. *number NINE*' },
    { at: 2.4, from: 'pisces', text: "first date tomorrow. *I can't sleep*", big: true },
    { at: 4.8, kind: 'agenda', from: 'capricorn', title: 'NIGHT SHIFT ROTA', gap: 0.3, items: ['11 PM: Leo', '12 AM: Scorpio', '1 AM: Taurus', '2 AM: Sag', { text: '3 AM: Virgo', hi: true }] },
    { at: 8.4, kind: 'triple', from: 'gemini', items: [{ to: 'capricorn', text: 'a ROTA??' }, { to: 'pisces', text: "you've got this" }, { to: 'leo', text: "you're up first" }] },
    { at: 10.4, kind: 'divider', text: "11:20 PM · LEO'S SHIFT" },
    { at: 10.8, from: 'leo', text: 'you are a *CATCH.* say it with me', big: true },
    { at: 12.6, from: 'pisces', text: 'I am… a catch?' },
    { at: 13.6, from: 'leo', text: '*louder*' },
    { at: 14.4, from: 'pisces', text: 'I AM A *CATCH*', big: true, react: [[15.0, 'star', 11]] },
    { at: 15.4, kind: 'system', text: '♌︎ Leo pinned a message' },
    { at: 16.4, kind: 'voice', from: 'pisces', dur: '0:22', note: '(#10: crying, but confidently)' },
    { at: 18.6, from: 'sagittarius', text: "can I take an early shift, I'm awake anyway" },
    { at: 19.8, from: 'capricorn', text: 'no. *the rota.*', react: [[20.4, 'ha', 8]] },
    { at: 21.0, kind: 'divider', text: "12:05 AM · SCORPIO'S SHIFT" },
    { at: 21.6, from: 'scorpio', text: 'what are you *actually* scared of?' },
    { at: 24.6, from: 'pisces', text: "that I'll cry. I always cry. what if it's *too much*", big: true, react: [[25.6, 'heart', 10], [25.9, 'tear', 9]] },
    { at: 27.2, from: 'scorpio', text: 'crying means you *feel things.* that is the good stuff' },
    { at: 29.2, kind: 'voice', from: 'pisces', dur: '1:40', note: '(#11: crying about crying)' },
    { at: 31.4, from: 'aquarius', text: 'objectively, the tears are *a feature*' },
    { at: 33.0, kind: 'divider', text: "1:10 AM · TAURUS'S SHIFT" },
    { at: 33.6, from: 'taurus', text: 'warm milk. honey. *socks.* trust me' },
    { at: 35.2, from: 'pisces', text: "I don't have honey" },
    { at: 36.2, from: 'taurus', text: 'jam works. *I have tested this*' },
    { at: 37.8, kind: 'triple', from: 'gemini', items: [{ to: 'taurus', text: 'JAM??' }, { to: 'capricorn', text: "I know I'm not on shift" }, { to: 'pisces', text: 'drink the jam milk' }] },
    { at: 39.8, from: 'capricorn', text: 'Gemini is *not on the rota.*', react: [[40.4, 'ha', 10]] },
    { at: 41.2, kind: 'voice', from: 'pisces', dur: '0:15', note: '(#12: sipping jam milk, still crying)' },
    { at: 43.4, kind: 'divider', text: "2:00 AM · SAG'S SHIFT" },
    { at: 44.0, from: 'sagittarius', text: 'story time. once upon a *tiem*' },
    { at: 45.4, from: 'sagittarius', text: 'there was a fsh who went on a date' },
    { at: 46.8, from: 'sagittarius', text: 'the fish was nervus and then the fish was fne' },
    { at: 48.2, from: 'libra', text: 'Sag is *falling asleep* on shift' },
    { at: 49.4, from: 'sagittarius', text: 'I am AWAKE. the fsih was fine.', react: [[50.0, 'ha', 11]] },
    { at: 51.0, from: 'pisces', text: 'the fish was fine?' },
    { at: 52.0, from: 'sagittarius', text: '*THE FISH WAS FINE.*', big: true },
    { at: 54.2, kind: 'system', text: 'Sag fell asleep on shift' },
    { at: 55.4, kind: 'voice', from: 'pisces', dur: '0:31', note: '(#13: the fish was fine (crying))' },
    { at: 57.6, from: 'cancer', text: 'not on the rota. still here. *lullaby incoming*' },
    { at: 59.0, kind: 'voice', from: 'cancer', dur: '1:12', note: '(humming, very softly)', react: [[60.6, 'heart', 9]] },
    { at: 61.6, kind: 'divider', text: "3:00 AM · VIRGO'S SHIFT" },
    { at: 62.2, from: 'virgo', text: "my shift. honestly? *I'm nervous for you too*" },
    { at: 64.0, from: 'pisces', text: 'YOU get nervous??' },
    { at: 65.2, from: 'virgo', text: 'always. *nerves are just caring, loudly.*', big: true, react: [[66.2, 'heart', 11]] },
    { at: 67.6, from: 'virgo', text: "and crying means you're *you.* they'll like you.", react: [[68.4, 'tear', 11]] },
    { at: 70.0, from: 'pisces', text: 'ok. ok. *going to sleep*' },
    { at: 73.4, kind: 'voice', from: 'pisces', dur: '0:12', note: '(#14, the last one: snoring. one happy tear)', react: [[75.4, 'heart', 12], [75.8, 'ha', 12]] },
    { at: 76.6, from: 'virgo', text: '*shift over.*' },
    { at: 77.6, kind: 'system', text: 'Pisces is asleep' },
    { at: 78.6, kind: 'agenda', from: 'capricorn', title: 'NIGHT SHIFT ROTA (DONE)', items: [{ text: 'every shift covered', hi: true }] },
    { at: 80.6, from: 'leo', text: 'pinning the snore' },
    { at: 81.4, kind: 'system', text: '♌︎ Leo pinned a message (again)' },
    { at: 82.6, from: 'scorpio', text: 'goodnight, *catch.*' },
    { at: 84.0, kind: 'divider', text: '9:12 AM' },
    { at: 84.6, from: 'pisces', text: 'on my way to the date. *crying (the good kind)*', big: true, react: [[85.8, 'heart', 12], [86.1, 'star', 12]] },
    { at: 87.4, from: 'sagittarius', text: "I'm up. *the fish was fine.* GO" },
  ],
  typing: [{ label: '11 people are typing', a: 0.2, b: 1.15 }, { from: 'pisces', a: 22.4, b: 24.5 }, { from: 'pisces', a: 70.8, b: 73.3 }],
  stage: [
    { at: -1, sign: 'capricorn', mood: 'wide', look: [1, 0], noPhone: false },
    { at: 1.2, sign: 'leo', mood: 'wide' },
    { at: 4.8, sign: 'capricorn', mood: 'neutral', look: [1, -1] },
    { at: 8.4, sign: 'gemini', mood: 'happy', hops: [8.6, 8.8] },
    { at: 10.8, sign: 'leo', mood: 'sparkle', look: [0, 0], hops: [11.0, 11.4] },
    { at: 13.6, sign: 'leo', mood: 'wide', hops: [13.8] },
    { at: 14.4, sign: 'leo', mood: 'sparkle', hops: [14.6, 15.0] },
    { at: 18.6, sign: 'sagittarius', mood: 'happy', two: { sign: 'capricorn', mood: 'squint', at: 19.8 } },
    { at: 21.6, sign: 'scorpio', mood: 'neutral', look: [1, 0] },
    { at: 27.2, sign: 'scorpio', mood: 'happy' },
    { at: 31.4, sign: 'aquarius', mood: 'neutral' },
    { at: 33.6, sign: 'taurus', mood: 'happy', look: [1, 0] },
    { at: 36.2, sign: 'taurus', mood: 'sparkle' },
    { at: 37.8, sign: 'gemini', mood: 'happy', hops: [38.0, 38.2] },
    { at: 39.8, sign: 'capricorn', mood: 'squint' },
    { at: 44.0, sign: 'sagittarius', mood: 'sleepy', look: [1, 0] },
    { at: 48.2, sign: 'libra', mood: 'squint' },
    { at: 49.4, sign: 'sagittarius', mood: 'wide', hops: [49.6] },
    { at: 52.0, sign: 'sagittarius', mood: 'wide', hops: [52.2, 52.5] },
    { at: 54.2, sign: 'sagittarius', mood: 'sleepy' },
    { at: 57.6, sign: 'cancer', mood: 'sparkle', look: [1, 0] },
    { at: 62.2, sign: 'virgo', mood: 'neutral', look: [1, 0] },
    { at: 65.2, sign: 'virgo', mood: 'happy', look: [0, 0] },
    { at: 70.0, sign: 'virgo', mood: 'happy', look: [1, 0] },
    { at: 76.6, sign: 'virgo', mood: 'sleepy' },
    { at: 78.6, sign: 'capricorn', mood: 'happy' },
    { at: 80.6, sign: 'leo', mood: 'sparkle' },
    { at: 82.6, sign: 'scorpio', mood: 'happy' },
    { at: 84.6, sign: 'sagittarius', mood: 'wide', two: { sign: 'virgo', mood: 'happy', at: 84.6 } },
    { at: 87.4, sign: 'sagittarius', mood: 'sparkle', hops: [87.6, 87.9] },
  ],
  cry: [[-1, 3], [2.4, 2], [14.4, 3], [16.4, 3], [18.4, 2], [24.6, 3], [27.2, 2], [29.2, 3], [33.0, 2], [41.2, 3], [43.4, 1], [52.0, 2], [55.4, 3], [57.6, 2], [65.2, 3], [70.0, 2], [73.4, 1], [84.6, 3]],
  pisMood: [[-1, 'wide'], [2.4, 'wide'], [14.4, 'sparkle'], [21.6, 'neutral'], [24.6, 'wide'], [33.6, 'happy'], [44.0, 'neutral'], [52.0, 'wide'], [57.6, 'sleepy'], [64.0, 'wide'], [67.6, 'sparkle'], [70.0, 'sleepy'], [84.6, 'sparkle']],
  extra(x, t) {
    hearts(x, t, 14.6, 300, 1520, { n: 6 })
    hearts(x, t, 65.4, 300, 1520, { n: 6 })
    hearts(x, t, 73.6, 918, 1600, { n: 5, cols: ['#b9a6ff', '#ff8fb1', '#f2c75c'] })
    confetti(x, t, 84.65, 918, 1560)
  },
  overlays: xfx({
    len: LEN,
    scratch: { at: 0.35, caption: 'yep. *voice note nine.*' },
    promise: { at: 1.3, text: 'wait for the *last* voice note' },
    chapters: [[10.4, "LEO · 11 PM"], [21.0, "SCORPIO · 12 AM"], [33.0, "TAURUS · 1 AM"], [43.4, "SAG · 2 AM"], [61.6, "VIRGO · 3 AM"]],
    counter: { label: 'VOICE NOTES', steps: [[-1, '#9'], [16.4, '#10'], [29.2, '#11'], [41.2, '#12'], [55.4, '#13'], [73.4, '#14', 'LAST VOICE NOTE']] },
    shakes: [14.4, 52.0],
    flashes: [[24.6, '#b9a6ff'], [65.2, '#7fe0c0'], [84.6, '#ff8fb1']],
  }),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
