// og-kbxe06: the social rework of kbxe06 ("It's cold and you miss them"), star_advice. Same frosty bedroom, Taurus in the
// blanket, the soup, the neighbour's door; static HOOK (outline) instead of the slam title, no series bug, extreme Taurus.
// Kit: ./bxkit.js (og social copy of ../../kbxe01/bxkit.js; opening stretched 2.1 s so the hook reads over the draft).
//   0.00  frame 0: Taurus shivering in a huge blanket, frost, snow, "remember our soup nights?", thumb creeping to SEND.
//   2.45  STOP slams ("a cold night is a *liar.*")   7.3 the three questions   15.0 the instead: Taurus makes soup for
//         twelve, knocks next door; the neighbour (Pisces) cries at the bowl.   19.1 "Miss the soup. | Make the *soup.*"
import {
  shortBX, roomBedroom, roomKitchen, pisces, sign, R, box, bubble, sparkles, hearts, glowAt, tag, label,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD,
} from './bxkit.js'

const DRAFT = 'remember our soup nights? i still have your ladle. i will NOT be returning it'
const OLD = [{ stamp: 'APR 22' }, { side: 'L', text: 'i’ll drop your stuff off' }, { side: 'R', text: 'thanks. leave it by the door' }]

function snow(x, t, a = 1) {
  x.save(); x.globalAlpha *= a
  for (let i = 0; i < 40; i++) { const sx = (i * 137 + Math.sin(t * 0.8 + i) * 30) % 1080, sy = ((i * 211 + t * 90) % 1500) + 430; R(x, 'rgba(255,255,255,0.75)', sx, sy, 6, 6) }
  x.restore()
}
function coldRoom(x, t, S, a = 1) {
  roomBedroom(x, t, { a, lamp: false })
  // frost on the window
  x.save(); x.globalAlpha *= 0.55 * a
  for (let i = 0; i < 26; i++) { const fx = 96 + ((i * 53) % 290), fy = 526 + ((i * 97) % 350); R(x, '#dff4ff', fx, fy, 10 + (i % 3) * 6, 4); R(x, '#dff4ff', fx + 4, fy - 4, 4, 12) }
  x.restore()
  snow(x, t, 0.5 * a)
}
// the blanket over Taurus, shivering
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  const sh = 5 * Math.sin(t * 40)
  x.save(); x.translate(175 + sh, 1230)
  R(x, INK, -170, -70, 340, 200); R(x, '#d8b26a', -164, -64, 328, 188); for (let i = 0; i < 4; i++) R(x, '#c49a50', -164, -40 + i * 44, 328, 10)
  x.restore()
  label(x, 'BRRRRRR', 175 + sh, 990, { size: 40, col: '#bfe8ff', rot: -0.15 })
}

function instead(x, t, S, I) {
  const u = t - I.I0
  const door = u > 2.4
  if (!door) {
    roomKitchen(x, t, { steam: clamp(prog(u, 0.6, 1.4)) })
    // the big pot gets bigger as Taurus cooks
    const pot = 1 + 0.15 * ease.outCubic(prog(u, 0.3, 1.6))
    x.save(); x.translate(830, 1110); x.scale(pot, pot); box(x, -110, -60, 220, 110, '#c9402a', { b: 6 }); R(x, '#e86a50', -110, -60, 220, 18); R(x, INK, -150, -40, 40, 14); R(x, INK, 110, -40, 40, 14); x.restore()
    glowAt(x, 830, 1060, 300, '255,190,120', 0.25)
    sign(x, t, 'taurus', { x: 450, y: 1150, s: 260, mood: u < 0.8 ? 'neutral' : 'happy', look: [1, -0.2], hops: [I.I0 + 0.4, I.I0 + 0.9, I.I0 + 1.4] })
    R(x, INK, 560, 1000, 160, 14); R(x, '#a07850', 600, 990, 140, 10)       // the spoon
    tag(x, 'SOUP FOR TWELVE', 830, 960, { size: 24, bg: GOLD, k: pop01(t, I.I0 + 1.2, 0.3, 2) })
  } else {
    // the hallway: the neighbour's door opens; Pisces cries at the bowl
    R(x, '#2a1d3e', 0, 430, 1080, 1490); box(x, 0, 1420, 1080, 500, '#3a2d58', { b: 8 })
    const open = ease.outCubic(prog(u, 2.7, 3.2))
    box(x, 600, 660, 360, 760, '#120d26', { b: 10 }); glowAt(x, 780, 1000, 380, '255,214,150', 0.25 * open)
    if (open > 0.01) pisces(x, t, { x: 780, y: 1140, s: 250, pop: open, tears: u > 3.6 ? 3 : 2, mood: u > 3.6 ? 'happy' : 'wide', look: [-1, 0.4], role: 'NEIGHBOUR' })
    x.save(); x.translate(600, 660); x.scale(1 - 0.85 * open, 1); box(x, 0, 0, 360, 760, '#7a553a', { b: 8 }); R(x, GOLD, 300, 380, 24, 24); x.restore()
    sign(x, t, 'taurus', { x: 310, y: 1170, s: 250, mood: 'happy', look: [1, 0], hops: [I.I0 + 2.6, I.I0 + 2.75, I.I0 + 3.7] })
    // the bowl
    box(x, 420, 1100, 130, 60, BONE, { b: 5 }); R(x, '#e8a050', 430, 1100, 110, 16)
    for (let i = 0; i < 2; i++) { const p = ((t * 0.6 + i / 2) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#fff', 470 + i * 30, 1080 - p * 120, 14, 14); x.restore() }
    if (u < 2.9) label(x, 'knock knock', 680, 600, { size: 34, col: GOLD, k: pop01(t, I.I0 + 2.55, 0.2, 2) })
    hearts(x, t, I.I0 + 3.6, 620, 1000, { n: 5 })
    bubble(x, t, 780, 860, I.I0 + 3.7, I.D + 1, 'a whole BOWL?? for ME??', { size: 32, col: '#c9f2ff' })
  }
  snow(x, t, 0.15)
}

const EP = shortBX({
  id: 'og-kbxe06', sign: 'taurus', duration: 19, ending: 'cut', DE: 5.0, QL: 2.6,
  rec: { caption: 'a cold night is a *liar.*' },
  room: coldRoom, contact: 'Quinn', sub: 'last seen in April', clock: '10:12 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1220, s: 220, mood0: 'sleepy', mood: 'wide', look: [1, -0.5] },
  pisRole: 'ROOMMATE',
  stars: ['Taurus. that is *four* blankets.', 'and one ladle hostage. three questions.'],
  qs: [
    { q: 'Do I miss them, or being warm?', a: '…the warm part. the soup. the ladle.', mood: 'squint' },
    { q: 'Will this text keep me warm?', a: 'no. but a nap would.', mood: 'neutral', look: [0, 1] },
    { q: 'Who else likes soup?', a: 'everyone. I am making a VAT.', mood: 'happy' },
  ],
  head: 'Taurus made | the *soup.*',
  lines: [{ t: 0.4, text: 'make the warm thing *yourself.*' }, { t: 2.6, text: 'then share it with someone near.' }],
  instead,
  last: 'Miss the soup. | Make the *soup.*',
  cues: I => [
    ['bell', I.I0 + 1.2, 1318.51, 0.025, 0.9, 0.3], ['whoosh', I.I0 + 2.35, 0.4, 0.04],
    ['tom', I.I0 + 2.55, 160, { gain: 0.2, decay: 0.12 }], ['tom', I.I0 + 2.7, 160, { gain: 0.2, decay: 0.12 }],
    ['whoosh', I.I0 + 2.7, 0.4, 0.03], ['pluck', I.I0 + 3.6, 659.25, 0.035, 0.5, 0.3], ['pluck', I.I0 + 3.74, 587.33, 0.035, 0.5, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, sparkles, lerp]
export const LEAD = EP.T.L

// social hook: static caption from frame 0 (the film's own slam title is gone)
export const HOOK = 'It is freezing. | I *miss* my ex.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
