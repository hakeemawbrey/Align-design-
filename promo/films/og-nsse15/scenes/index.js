// og-nsse15: social rework of nsse15 (SIGN × SIGN, Volume 2: "Virgo × Leo: the helper and the headliner."). Static HOOK
// (box) 0–3.6 replaces the animated cold-open headline; no series bug / FIELD GUIDE label / end card; crazier lines.
// Same notebook page, the same two stars, props and payoff; the look lives in ../ssekit.js (og copy of ../../nsse01/kit.js).
//   0.0   frame 0: the notebook page, ♍ Virgo and ♌ Leo mid-hop, Pisces crying in the corner. HOOK up until 3.6.
//   0.5   Leo: "who fixed my *coat button?* was it me?"  Virgo: "nobody. *it fixed itself.* at 3am."
//   TIP 1 Leo gives Virgo a standing ovation; Virgo survives the thank-you.
//   TIP 2 Virgo's quiet list: the button, the tea, the aunt's dog's name. Leo is stunned there was no spotlight.
//   TIP 3 ↻ the toast card, read out loud with a microphone. The needle sweeps to ALIGN.
//   last  "Seen. Fixed. *Adored.*" both stars in fig. 3, hearts; holds to the end.
import { makeFilm, STORY_END as SE } from '../ssekit.js'

export const HOOK = 'Virgo did the work. | *Leo took the bow.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.6

const F = makeFilm({
  id: 'og-nsse15', a: 'virgo', b: 'leo',
  wants: ['to help, invisibly', 'credit, a spotlight'],
  hook: '',
  moods: { a0: 'squint', b0: 'sparkle' },
  open: [
    { who: 'b', text: 'who fixed my *coat button?* was it me?', mood: 'sparkle', react: 'wide' },
    { who: 'a', text: 'nobody. *it fixed itself.* at 3am.', mood: 'squint', react: 'squint' },
  ],
  tips: [
    {
      head: 'Virgo, take | *the thank-you.*',
      prop: { type: 'note', lines: [
        { text: 'thank-you:', at: 0.4 },
        { text: 'received', at: 'L1', check: 'D1' },
        { text: '(only flinched once)', at: 'D1+0.2', size: 36 },
      ] },
      lines: [
        { who: 'b', text: 'THANK you! *standing ovation!*', mood: 'sparkle', react: 'wide' },
        { who: 'a', text: "…you're welcome. *please sit down.*", mood: 'happy', react: 'heart' },
      ],
    },
    {
      head: 'Leo, notice | *the quiet stuff.*',
      prop: { type: 'list', title: "virgo's secret list", items: [
        { text: 'fixed your button', at: 0.4, mark: 'check', markAt: 0.6 },
        { text: 'refilled your tea', at: 0.8, mark: 'check', markAt: 1.0 },
        { text: "learned your aunt's dog's name", at: 1.2, mark: 'check', markAt: 1.4 },
      ] },
      lines: [
        { who: 'b', text: 'all of this? *with no spotlight?*', mood: 'wide', react: 'happy' },
        { who: 'a', text: 'I *like* helping. quietly.', mood: 'happy', react: 'heart' },
      ],
    },
    {
      head: 'Give Virgo | *a spotlight.*',
      prop: { type: 'card', header: 'A TOAST', q: 'To my Virgo, who fixes everything quietly.', caption: { text: 'read out loud. into a microphone.', at: 'D0' } },
      lines: [
        { who: 'b', text: 'a toast: *to my Virgo!* (and me)', mood: 'sparkle', react: 'wide' },
        { who: 'a', text: 'too much. *keep going.*', mood: 'heart', react: 'heart' },
      ],
    },
  ],
  last: 'Seen. Fixed. | *Adored.*',
  music: { style: 'funk', key: 'Am', seed: 3515 },
})
export const DURATION = F.DURATION
export const STORY_END = SE
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const META = { T: F.T, B: F.B, CUTS: F.CUTS }
