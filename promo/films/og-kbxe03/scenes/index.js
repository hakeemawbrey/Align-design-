// og-kbxe03: the social rework of kbxe03 ("Big news, wrong first call"), star_advice. Same living room, Leo, the PROMOTED
// letter, the group call and story; static HOOK (box) from frame 0 instead of the slam title, no series bug, louder Leo.
// Kit: ./bxkit.js (og social copy of ../../kbxe01/bxkit.js; opening stretched 2.1 s so the hook reads over the draft).
//   0.00  frame 0: Leo mid-leap with the PROMOTED letter, confetti, the draft to the ex, thumb creeping to SEND.
//   2.45  STOP slams ("first instinct: tell *them.*")   6.9 the three questions   14.0 the instead: Leo calls the group
//         chat, four friends pop in cheering, Pisces sobs with joy.   17.1 "Good news deserves | a *front row.*"
import {
  shortBX, roomLiving, pisces, sign, R, box, label, bubble, sparkles, confetti, drawBits, glowAt, tag,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD, INTER, MONO,
} from './bxkit.js'

const DRAFT = 'guess who got PROMOTED!!! u were my first call. (2nd: the press)'
const OLD = [{ stamp: 'AUG 2' }, { side: 'L', text: 'good luck with everything' }, { side: 'R', text: 'thanks. u too' }]

function letter(x, cx, cy, rot, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -96, -66, 192, 132); R(x, '#fff6e0', -90, -60, 180, 120)
  x.font = `900 30px ${INTER}`; x.fillStyle = '#c9402a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PROMOTED!', 0, -18)
  for (let i = 0; i < 3; i++) R(x, '#d8cdb4', -66, 10 + i * 14, 132, 5)
  x.restore()
}
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  confetti(x, t, -0.4, 200, 900, { n: 30, life: 2.6 })
  letter(x, 200, 960 + 14 * Math.sin(t * 7), -0.2 + 0.06 * Math.sin(t * 6))
}

// the video-call grid: four friends pop in, cheering
const FRIENDS = [['aries', 'ARIES'], ['sagittarius', 'SAG'], ['gemini', 'GEMINI'], ['pisces', 'PISCES']]
function instead(x, t, S, I) {
  roomLiving(x, t)
  const u = t - I.I0
  // Leo centre-bottom holding the phone up, beaming
  sign(x, t, 'leo', { x: 540, y: 1250, s: 250, mood: u < 0.6 ? 'neutral' : 'sparkle', look: [0, -1], hops: [I.I0 + 0.8, I.I0 + 1.6, I.I0 + 2.4] })
  letter(x, 720, 1180, 0.15)
  // the call frame
  const fk = pop01(t, I.I0 + 0.1, 0.35, 1.6)
  if (fk <= 0.01) return
  x.save(); x.translate(540, 820); x.scale(fk, fk)
  R(x, INK, -440, -330, 880, 660); R(x, '#120d26', -430, -320, 860, 640)
  x.font = `700 24px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('● GROUP CALL · THE GOOD ONES', -410, -296)
  x.restore()
  FRIENDS.forEach(([id, name], i) => {
    const at = I.I0 + 0.45 + i * 0.3, k = pop01(t, at, 0.3, 2.2) * fk
    if (k <= 0.01) return
    const cx = 540 + (i % 2 ? 212 : -212), cy = 820 + (i < 2 ? -120 : 170)
    x.save(); x.translate(cx, cy); x.scale(k, k)
    R(x, INK, -206, -136, 412, 272); R(x, ['#3a2558', '#2a3a58', '#3a3a28', '#28304a'][i], -200, -130, 400, 260)
    x.restore()
    if (id === 'pisces') pisces(x, t, { x: cx, y: cy + 20, s: 170 * k, tears: 3, mood: 'happy' })
    else sign(x, t, id, { x: cx, y: cy + 20, s: 170 * k, mood: 'happy', glyph: false, hops: [at + 0.3, at + 0.9, at + 1.5, at + 2.1], seed: i + 3 })
    tag(x, name, cx - 130, cy + 106, { size: 18, k, bg: BONE })
    const cheer = ['LET’S GOOO', 'SPEECH! SPEECH!', 'I MADE A BANNER', '(sobbing)'][i]
    bubble(x, t, cx, cy - 110, at + 0.5, I.D + 1, cheer, { size: 26, col: i === 3 ? '#c9f2ff' : '#fff1a8' })
    sparkles(x, t, cx, cy, at + 0.05, 8, 120, i, [GOLD, BONE])
  })
  confetti(x, t, I.I0 + 1.8, 540, 700, { n: 34 })
  glowAt(x, 540, 820, 600, '255,214,150', 0.08 * fk)
}

const EP = shortBX({
  id: 'og-kbxe03', sign: 'leo', duration: 17, ending: 'cut', DE: 4.6, QL: 2.4,
  rec: { caption: 'first instinct: tell *them.*' },
  room: (x, t, S, a = 1) => roomLiving(x, t, { a }), contact: 'Morgan', sub: 'last seen in August', clock: '4:12 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1230, s: 230, mood0: 'sparkle', mood: 'wide', look: [1, -0.5] },
  pisRole: 'ROOMMATE',
  stars: ['Leo, you hired a *trumpet.*', 'before the parade: three questions.'],
  qs: [
    { q: 'Who do I want cheering?', a: '…everyone. the whole planet. standing.', mood: 'happy' },
    { q: 'Do I want them proud, or back?', a: 'oof. proud… and a LITTLE back.', mood: 'squint', look: [0, 1] },
    { q: 'Who’s been here all year?', a: 'MY PEOPLE. my loyal fans.', mood: 'sparkle' },
  ],
  head: 'Leo called | the *right* people.',
  lines: [{ t: 0.5, text: 'a standing ovation. from *day-one* people.' }],
  instead,
  last: 'Good news deserves | a *front row.*',
  cues: I => [
    ...[0, 1, 2, 3].map(i => ['pop', +(I.I0 + 0.45 + i * 0.3).toFixed(2), [880, 987.77, 1174.66, 1318.51][i], 0.045, (i % 2 ? 0.3 : -0.3)]),
    ['clap', I.I0 + 1.6, { gain: 0.14 }], ['clap', I.I0 + 1.85, { gain: 0.14, pan: 0.3 }], ['clap', I.I0 + 2.1, { gain: 0.16, pan: -0.3 }],
    ['glitter', I.I0 + 1.8, I.I0 + 2.6], ['pluck', I.I0 + 2.0, 659.25, 0.035, 0.5, 0.4], ['pluck', I.I0 + 2.14, 587.33, 0.035, 0.5, 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, label, drawBits, outK, prog, ease, clamp, lerp]
export const LEAD = EP.T.L

// social hook: static caption from frame 0 (the film's own slam title is gone)
export const HOOK = 'Got promoted. | First call: my *ex.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
