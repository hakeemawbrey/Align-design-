// kbxe05: BEFORE YOU TEXT YOUR EX, Ep 5, "The photo memory hit" (22 s vertical, star_advice post, dreamy · F).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line. Pisces is the texter here.
//   0.00   frame 0: Pisces mid-sob, a "1 YEAR AGO TODAY" photo popping up over the room, thumb already on SEND, a whole
//          paragraph in the draft, STOP mid-drop. Hook "The photo memory hit. *Hard.*"
//   0.35   STOP + freeze ("one photo. *every* feeling.")
//   5.6    the check: 1 Do I miss them, or that day? 2 Has anything changed? 3 Who can I tell this to instead?
//   14.5   instead: the photo slides into a folder called IT WAS GOOD; Pisces texts Cancer; Cancer arrives with soup.
//   20.0   "It was real. It's also *done.*" lands 21.05, hard cut at 22.
import {
  shortBX, roomBedroom, sign, drawPhone, R, box, label, bubble, sparkles, drawBits, hearts, glowAt, tag, drawPixelStar,
  pop01, outK, prog, ease, clamp, lerp, easeOutBack, INK, BONE, GOLD, INTER, MONO,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'i saw our photo from the lake and i keep thinking about how happy we were and maybe we could'
const OLD = [{ stamp: 'NOV 1, LAST YEAR' }, { side: 'L', text: 'best day ever' }, { stamp: 'MAR 9' }, { side: 'R', text: 'i think we need to stop' }]

/** the lake photo: a little polaroid of two stars on a dock at sunset */
function photo(x, cx, cy, s, rot, k = 1, cap = true) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  R(x, 'rgba(6,4,18,0.45)', -150, -170, 320, 370)
  R(x, INK, -166, -186, 332, 372); R(x, '#fbf6ea', -160, -180, 320, 360)
  const g = x.createLinearGradient(0, -160, 0, 100); g.addColorStop(0, '#ff9a6a'); g.addColorStop(1, '#7a4fa8')
  x.fillStyle = g; x.fillRect(-140, -160, 280, 260)
  x.fillStyle = '#ffd98a'; x.beginPath(); x.arc(0, -20, 40, 0, Math.PI * 2); x.fill()
  R(x, '#3a2d66', -140, 30, 280, 70); R(x, '#5a3d2a', -140, 50, 280, 14)
  drawPixelStar(x, -40, 10, 54, 2, '#9a7be0'); drawPixelStar(x, 40, 10, 54, 2, '#e8628a')
  if (cap) { x.font = `italic 500 34px 'EB Garamond', Georgia, serif`; x.fillStyle = '#3a2d66'; x.textAlign = 'center'; x.fillText('the lake ♡', 0, 150) }
  x.restore()
}
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.35) return
  const k = easeOutBack(prog(t, -0.6, 0.15), 1.6)
  photo(x, 250, 800, 0.95, -0.12 + 0.03 * Math.sin(t * 2), k)
  tag(x, '1 YEAR AGO TODAY', 250, 600, { size: 24, bg: GOLD, k, rot: -0.12 })
  glowAt(x, 250, 800, 380, '255,190,140', 0.18)
}

function instead(x, t, S, I) {
  roomBedroom(x, t)
  const u = t - I.I0
  // 1. the photo slides into a folder named IT WAS GOOD
  const fk = pop01(t, I.I0 + 0.1, 0.35, 1.8) * outK(t, [I.I0 + 2.4, I.I0 + 2.7])
  if (fk > 0.01) {
    x.save(); x.translate(540, 900); x.scale(fk, fk)
    R(x, INK, -250, -150, 220, 60); R(x, '#f2c75c', -244, -144, 208, 54)
    R(x, INK, -256, -100, 512, 330); R(x, '#f2c75c', -250, -94, 500, 318); R(x, '#ffe08a', -250, -94, 500, 30)
    x.font = `900 46px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('IT WAS GOOD', 0, 120)
    x.restore()
    const slide = ease.inOutCubic(prog(t, I.I0 + 0.6, I.I0 + 1.4))
    if (slide < 1) photo(x, lerp(820, 540, slide), lerp(560, 860, slide), lerp(0.9, 0.45, slide), lerp(0.2, 0, slide), 1, slide < 0.5)
    if (u > 1.4) sparkles(x, t, 540, 860, I.I0 + 1.4, 10, 140, 2, [GOLD, BONE, '#ff9a6a'])
  }
  // 2. the text goes to Cancer instead
  const pk = pop01(t, I.I0 + 2.6, 0.35, 1.6) * outK(t, [I.D - 2.3, I.D - 2.0])
  if (pk > 0.01) {
    const msgs = [{ stamp: 'NOW' }, { side: 'R', text: 'the lake photo got me. can you talk' }]
    if (u > 3.6) msgs.push({ side: 'L', text: 'omw. bringing soup.' })
    x.save(); x.translate(560, 930); x.scale(pk * 0.8, pk * 0.8); x.translate(-560, -930)
    drawPhone(x, t, { cx: 560, cy: 930, w: 560, h: 760, contact: '♋︎ Cancer', sub: 'best friend · online', clock: '9:31 PM', old: msgs, draft: '', avatar: '#bfe0ff' })
    x.restore()
  }
  // 3. Cancer arrives with soup; Pisces (the texter) cries, happy
  const ck = pop01(t, I.I0 + 4.3, 0.35, 2)
  sign(x, t, 'pisces', { x: lerp(200, 330, ck), y: 1250, s: 230, mood: u < 4.3 ? 'sparkle' : 'happy', look: [1, -0.3], tears: u < 4.3 ? 2 : 3, hops: [I.I0 + 1.4, I.I0 + 3.6, I.I0 + 4.5] })
  if (ck > 0.01) {
    sign(x, t, 'cancer', { x: 760, y: 1240, s: 230, pop: ck, mood: 'happy', look: [-1, 0], hops: [I.I0 + 4.5] })
    // the soup pot
    box(x, 840, 1270, 150, 90, '#c9402a', { b: 6 }); R(x, '#e86a50', 840, 1270, 150, 16)
    for (let i = 0; i < 3; i++) { const p = ((t * 0.6 + i / 3) % 1); x.save(); x.globalAlpha = 0.5 * (1 - p); R(x, '#f0e8ff', 880 + i * 30 + Math.sin(p * 6) * 10, 1240 - p * 160, 18, 18); x.restore() }
    hearts(x, t, I.I0 + 4.7, 540, 1100, { n: 6 })
  }
}

const EP = shortBX({
  id: 'kbxe05', sign: 'pisces', duration: 22, ending: 'cut', DE: 5.4, QL: 3.0, noPis: true,
  hook: { text: 'The photo memory hit. | *Hard.*', out: [5.1, 5.3], accentColor: '#ff9a6a' },
  rec: { sub: '9:24 PM', caption: 'one photo. *every* feeling.' },
  room: (x, t, S, a = 1) => roomBedroom(x, t, { a }), contact: 'Avery', sub: 'last seen in March', clock: '9:24 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1250, s: 220, mood0: 'sparkle', mood: 'wide', look: [1, -0.5], tears: t => t < 0.35 ? 3 : 2 },
  checkHero: { tears: 2 },
  stars: ['oh, Pisces. come here.', 'feel all of it. then three questions.'],
  qs: [
    { q: 'Do I miss them, or that day?', a: '…that day. the sun. the snacks.', mood: 'sparkle' },
    { q: 'Has anything changed since March?', a: '…no. not really.', mood: 'neutral', look: [0, 1] },
    { q: 'Who can I tell this to instead?', a: 'CANCER. obviously.', mood: 'happy' },
  ],
  head: 'Pisces kept | the *memory.*',
  lines: [{ t: 0.4, text: 'keep the photo. keep the *good.*' }, { t: 2.9, text: 'send the feeling to a friend.' }],
  instead,
  last: 'It was real. | It’s also *done.*',
  cues: I => [
    ['pluck', 0.5, 659.25, 0.035, 0.5, 0], ['pluck', 0.64, 587.33, 0.035, 0.5, 0],
    ['whoosh', I.I0 + 0.6, 0.6, 0.035], ['pop', I.I0 + 1.4, 1174.66, 0.05, 0], ['bell', I.I0 + 1.45, 1760, 0.025, 1, 0],
    ['whoosh', I.I0 + 2.6, 0.35, 0.035], ['pop', I.I0 + 2.9, 987.77, 0.04, 0.2], ['pop', I.I0 + 3.6, 659.25, 0.045, -0.2],
    ['whoosh', I.I0 + 4.3, 0.35, 0.035], ['pop', I.I0 + 4.5, 880, 0.04, 0.3], ['glitter', I.I0 + 4.7, I.I0 + 5.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, bubble, drawBits, clamp, MONO]
