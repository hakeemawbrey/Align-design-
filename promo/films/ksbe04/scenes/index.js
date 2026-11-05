// ksbe04: SAY IT BETTER ep 4, "You never text back" (♋ Cancer to ♒ Aquarius). dreamy · Ab. Hard cut.
//   frame 0: Cancer mid-scream at a phone, a stack of "??" bubbles mid-drop, the bubble "YOU NEVER TEXT BACK!" mid-slam.
//   freeze ("fourteen *question marks.*") → "I was at *work*…" + loading bar "overthinking… 99%" → THE STARS →
//   the better line → a notification drops: "busy, talk later ♡" → Pisces at the window cries at the heart.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { rect, drawPhoneSmall, INK, BONE } from '../../ksbe01/scenes/sbkit.js'
import { loadingBar, loadingBarCues, notification, notificationCues } from '../../hookkit.js'
import { prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
const LOAD = { at: 2.55, len: 2.2, label: 'overthinking…', stallAt: 99, error: 'Error: too many feelings', y: 1520 }
const NOTE = { at: 13.75, out: [15.6, 15.85], title: 'texts', body: 'Aquarius: busy, talk later *♡*', glyph: '♒', time: 'now' }
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 4, room: 'bedroom',
  A: { sign: 'cancer', red: 0.8 }, B: { sign: 'aquarius' }, P: { x: 330, y: 640, s: 120, look: [1, 1] },
  hook: 'Fourteen question marks. | *Zero* replies.', caption: 'the *never.*',
  caught: { x: 560, y: 790, r: 190 },
  bad: { text: 'You *never* text back!' }, react: 'I was at *work*…',
  stars: ['the worry is *real*.', 'say the worry, *not the charge.*'],
  better: 'When I don’t hear from you, my brain *spirals*. Could you send a quick ‘busy, talk later’?',
  replies: ['oh! *easy.*', 'sent. *see?*'],
  last: 'Ask for the | *small* text.',
  T: { r1: 14.0 },
  front(x, w, K) {
    const a = K.st.A; if (!a || w > 4.6) return
    drawPhoneSmall(x, a.x + 120, a.y - 40, 1, w, { rot: 0.15, lines: [60, 40, 70] })
    for (let i = 0; i < 6; i++) { // the "??" stack
      const k = easeOutBack(prog(w, -0.6 + i * 0.12, -0.35 + i * 0.12), 2) * (1 - ease.inCubic(prog(w, 4.2, 4.6)))
      if (k <= 0.01) continue
      const X = 120 + (i % 3) * 60, Y = 900 - i * 52
      x.save(); x.translate(X, Y); x.scale(k, k); rect(x, -44, -26, 88, 52, INK); rect(x, -38, -20, 76, 40, '#4f8df0')
      x.fillStyle = BONE; x.font = "900 34px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('??', 0, 2); x.restore()
    }
  },
  kit: [[loadingBar, loadingBarCues, LOAD], [notification, notificationCues, NOTE]],
})
