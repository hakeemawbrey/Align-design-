// kbxe06: BEFORE YOU TEXT YOUR EX, Ep 6, "It's cold and you miss them" (19 s vertical, star_advice post, lofi · G).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: the last 0.45 s loop back into frame 0.
//   0.00   frame 0: Taurus mid-shiver in a huge blanket, frost on the window, snow falling, thumb on SEND, STOP mid-drop.
//          Hook "It's cold. You *miss* them."  Draft: "remember our soup nights?"  0.35 STOP + freeze ("a cold night
//          is a *liar.*")
//   5.2    the check: 1 Do I miss them, or being warm? 2 Will this text keep me warm? 3 Who else likes soup?
//   12.9   instead: Taurus makes the soup (a big pot, steam), then knocks next door; the neighbour (Pisces) cries at the bowl.
//   17.0   "Miss the soup. Make the *soup.*"
import {
  shortBX, roomBedroom, roomKitchen, pisces, sign, R, box, bubble, sparkles, hearts, glowAt, tag, label,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'remember our soup nights?'
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
  x.save(); x.translate(175 + sh, 1300)
  R(x, INK, -170, -70, 340, 200); R(x, '#d8b26a', -164, -64, 328, 188); for (let i = 0; i < 4; i++) R(x, '#c49a50', -164, -40 + i * 44, 328, 10)
  x.restore()
  label(x, 'brrr', 175 + sh, 1060, { size: 40, col: '#bfe8ff', rot: -0.15 })
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
    tag(x, 'SOUP FOR SIX', 830, 960, { size: 24, bg: GOLD, k: pop01(t, I.I0 + 1.2, 0.3, 2) })
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
    bubble(x, t, 780, 860, I.I0 + 3.7, I.D + 1, 'is that… for ME?', { size: 32, col: '#c9f2ff' })
  }
  snow(x, t, 0.15)
}

const EP = shortBX({
  id: 'kbxe06', sign: 'taurus', duration: 19, ending: 'loop', DE: 5.0, QL: 2.6,
  hook: { text: 'It’s cold. | You *miss* them.', out: [4.7, 4.9], accentColor: '#bfe8ff' },
  rec: { sub: '−4° · 10:12 PM', caption: 'a cold night is a *liar.*' },
  room: coldRoom, contact: 'Quinn', sub: 'last seen in April', clock: '10:12 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1220, s: 220, mood0: 'sleepy', mood: 'wide', look: [1, -0.5] },
  pisRole: 'ROOMMATE',
  stars: ['easy, Taurus. it’s *freezing.*', 'freezing. still: three questions.'],
  qs: [
    { q: 'Do I miss them, or being warm?', a: '…the warm part. and the soup.', mood: 'squint' },
    { q: 'Will this text keep me warm?', a: 'no. it’ll keep me up.', mood: 'neutral', look: [0, 1] },
    { q: 'Who else likes soup?', a: 'literally everyone??', mood: 'happy' },
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
