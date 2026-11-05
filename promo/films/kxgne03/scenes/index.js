// kxgne03: STAR TALK GAME NIGHT: FULL GAMES, Ep 3, "Gemini vs Virgo: Overthinking Finals" (≈ 115 s vertical,
// music: chiptune · E). The feeling: overthinking a text, the 2 a.m. scroll. Set + timeline: ../../kxgne01/fullgame.js.
//   0.0    frame 0: Virgo mid-scream, clipboard pages flying everywhere; a loading bar "overthinking… 97%" already
//          stalling; Gemini mid-type on two phones. Hook: "Overthinking finals. *Both* qualified."  0.5 record scratch.
//   10 R1 → Virgo · 30 R2 → both · 50 R3 → Gemini · 70 LIGHTNING (Gemini 4, Virgo 3) · 90 FINAL ×2 → both
//   110    Gemini 8–7. THE STARS: "Put the phone *down.* Goodnight."  Hard cut.
import { makeFullGame, drawPhone, screamLines, R, INK, BONE } from '../../kxgne01/fullgame.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const BAR = { at: -2.2, len: 5.0, label: 'overthinking…', stallAt: 99, error: 'Error: too many drafts', y: 600 }

const EP = makeFullGame({
  id: 'kxgne03',
  A: { sign: 'gemini', stat: 'drafts open: 8', intro: { mood: 'wide', look: [0, 0.8] } },
  B: { sign: 'virgo', stat: 'rereads tonight: 14', prop: 'clipboard', propUntil: 10, intro: { mood: 'wide', look: [0, -1], squash: -0.1 } },
  hook: 'Overthinking finals. | *Both* qualified.',
  accent: '#9fe6b0',
  scratch: 'it said “ok.” *just* “ok.”',
  welcome: 'game night. *full game!*',
  rounds: [
    { prompt: 'they texted “we need to talk.” you: ___', first: 'A', buzzAt: 1.4,
      a: { text: 'WHAT. WHY. WHEN. now? NOW?', mood: 'wide', lose: 'squint' },
      b: { text: 'okay. call at 7? I’m listening.' },
      point: 'B', gag: 'AUDIENCE: (deep breath)', host: 'calm *and* kind. point, Virgo!', cam: '(sobbing) I’m listening TOO' },
    { prompt: 'They take a while to text back.', first: 'B',
      a: { text: 'GREEN. I’ll go do something fun meanwhile.', flag: 'G' },
      b: { text: 'RED.', flag: 'R', mood: 'wide', then: { at: 7.6, text: '…GREEN. people have lives.', flag: 'G', mood: 'happy' } },
      point: 'both', host: 'give them *time.* both score!', cam: '(sobbing) people have LIVES' },
    { prompt: 'Your reply is four paragraphs long.', first: 'B',
      a: { text: 'send one line. save the rest for in person.' },
      b: { text: 'edit it to three. with footnotes.', lose: 'squint' },
      point: 'A', gag: 'AUDIENCE: (laughs)', host: 'say it *in person.* point, Gemini!', cam: '(sobbing) FOOTNOTES' },
  ],
  lightning: [
    { prompt: 'Reread the chat ten times?', a: { text: 'RED. once is plenty.', flag: 'R' }, b: { text: 'RED. …nine, max.', flag: 'R' }, point: 'both' },
    { prompt: 'Ask instead of guessing?', a: { text: 'GREEN. just ask!', flag: 'G' }, b: { text: 'GREEN. saves hours.', flag: 'G' }, point: 'both' },
    { prompt: 'Decode one emoji for an hour?', a: { text: 'RED. it’s a smiley.', flag: 'R' }, b: { text: '…twenty minutes?', flag: 'GR', mood: 'squint' }, point: 'A' },
    { prompt: 'Phone down at 2 a.m.?', a: { text: 'GREEN. goodnight!', flag: 'G' }, b: { text: 'GREEN. charging. far away.', flag: 'G' }, point: 'both' },
  ],
  final: { prompt: 'Your friend is overthinking a text. It’s 2 a.m.', first: 'A',
    a: { text: 'read it out loud. we laugh. then sleep.' },
    b: { text: 'it’s fine. and if it isn’t, we handle it tomorrow.', mood: 'happy' },
    point: 'both', gag: 'AUDIENCE: (yawns, happily)', host: 'tomorrow is *soon.* double, both!', cam: '(sobbing) it’s 2 a.m. for me too' },
  last: 'Put the phone *down.* Goodnight.',
  talk: 'card-talk-1.png',
  ending: 'cut',
  scenes: [loadingBar(BAR)],
  cues: loadingBarCues(BAR),
  draw(x, t) {
    // Gemini's two phones, thumbs going
    if (t < 6.1) {
      const k = t > 5.8 ? 1 - (t - 5.8) / 0.3 : 1, j = 5 * Math.sin(t * 22)
      drawPhone(x, t, 70, 1010 + j, k, { lines: ['typing…', 'hey', 'HEY', 'heyy'], rot: -0.14, col: '#ffd23a', w: 100, h: 180, size: 18 })
      drawPhone(x, t, 440, 1010 - j, k, { lines: ['typing…', 'no', 'wait', 'ok'], rot: 0.14, col: '#ffd23a', w: 100, h: 180, size: 18 })
    }
    // Virgo's clipboard pages flying everywhere
    if (t < 4) {
      for (let i = 0; i < 9; i++) {
        const tt = t + 0.9 + i * 0.13, a = -Math.PI / 2 + (i - 4) * 0.33
        const px = 830 + Math.cos(a) * 420 * tt + 30 * Math.sin(t * 5 + i), py = 1000 + Math.sin(a) * 300 * tt + 160 * tt * tt
        if (py > 1500) continue
        x.save(); x.globalAlpha = Math.max(0, 1 - t / 4); x.translate(px, py); x.rotate(tt * (2 + i % 3) + i)
        R(x, INK, -34, -44, 68, 88); R(x, BONE, -30, -40, 60, 80)
        for (let l = 0; l < 4; l++) R(x, '#6a6488', -22, -28 + l * 16, 44, 4)
        x.restore()
      }
    }
    screamLines(x, t, 830, 1040, 2.8, { text: 'AAAA!', col: '#9fe6b0', r: 150 })
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
