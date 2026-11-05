// kbxe07: BEFORE YOU TEXT YOUR EX, Ep 7, "The closure essay, draft twelve" (24 s vertical, star_advice post, jazzy · Bb).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line.
//   0.00   frame 0: Virgo mid-scream at a phone tagged DRAFT 12, crumpled drafts raining down, thumb on SEND, STOP mid-drop.
//          Hook "Closure essay. Draft *twelve.*"  0.35 STOP + freeze ("footnotes. it has *footnotes.*")
//   5.6    the check: 1 Have I already said this? 2 Will their reply give me peace? 3 Who is this essay really for?
//   15.1   instead: Virgo reads it aloud to the mirror (the scroll unrolls to the floor), then deletes it: the pages
//          crumple and fly off; one slow breath. Pisces (roommate) cries at the reading.
//   22.0   "Edit your life, not the *essay.*" lands 23.05, hard cut at 24.
import {
  shortBX, roomBedroom, pisces, sign, R, box, bubble, sparkles, tag, label, glowAt, wrap,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD, INTER,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'Dear Sam, I’ve thought a lot about how things ended, and I want to say, point one, that I'
const OLD = [{ stamp: 'MAY 18' }, { side: 'L', text: 'i hope you find what you need' }, { side: 'R', text: 'you too. really.' }]

function paperBall(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -s - 4, -s - 4, 2 * s + 8, 2 * s + 8); R(x, '#f4eee4', -s, -s, 2 * s, 2 * s); R(x, '#d8cdb4', -s * 0.6, -s * 0.2, s * 1.2, 4); R(x, '#d8cdb4', -s * 0.2, s * 0.3, s * 0.9, 4); x.restore() }
function draftExtra(x, t, S, { P }) {
  if (t > S.T.C0 - 0.3) return
  for (let i = 0; i < 9; i++) { const p = ((t + 0.5) * 0.45 + i / 9) % 1; paperBall(x, 60 + ((i * 131) % 980), 380 + p * 1300, 22 + (i % 3) * 6, p * 5 + i) }
  tag(x, 'DRAFT 12', P.cx - 170, P.cy - 455, { size: 26, bg: '#ff8fa0', rot: -0.08 })
}

const ESSAY = ['Dear Sam,', 'I’ve thought a lot about', 'how things ended. Point', 'one: I was right about', 'the thermostat. Point two:', 'I miss you. Point three:', 'see footnote 4. Point', 'four: closure. Point five:', 'I’m ok. Mostly. Point six:']
function instead(x, t, S, I) {
  roomBedroom(x, t, { lamp: true })
  const u = t - I.I0
  // the mirror
  box(x, 600, 580, 380, 760, '#a8c8e8', { b: 12 }); R(x, 'rgba(255,255,255,0.25)', 630, 610, 60, 700)
  const breathe = u > 4.4 ? 0.06 * Math.sin((u - 4.4) * 2.4) : 0
  // Virgo and its reflection (the reflection mirrors the mood, a beat late)
  const mood = u < 3.3 ? 'neutral' : u < 4.2 ? 'wide' : 'happy'
  sign(x, t, 'virgo', { x: 790, y: 1050, s: 200, mood, look: [-1, 0], alpha: 0.75, glyph: false, seed: 9, squash: -breathe })
  sign(x, t, 'virgo', { x: 360, y: 1180, s: 250, mood, look: [1, -0.3], hops: [I.I0 + 0.5, I.I0 + 1.2, I.I0 + 1.9, I.I0 + 2.6], squash: -breathe })
  // the scroll unrolls, being read aloud
  const unroll = ease.outCubic(prog(u, 0.2, 2.6)), crumple = ease.inCubic(prog(u, 3.3, 3.9))
  if (crumple < 1) {
    const h = 760 * unroll * (1 - crumple)
    x.save(); x.translate(300, 560); x.rotate(-0.05 + crumple * 1.5); x.scale(1 - crumple * 0.8, 1 - crumple * 0.8)
    R(x, INK, -150, -24, 300, h + 48); R(x, '#f4eee4', -144, -18, 288, h + 36)
    x.font = `600 22px ${INTER}`; x.fillStyle = '#3a2d66'; x.textAlign = 'left'; x.textBaseline = 'middle'
    ESSAY.forEach((l, i) => { if (16 + i * 40 < h) x.fillText(l, -126, 10 + i * 40) })
    R(x, '#d8b26a', -160, -30, 320, 22)
    x.restore()
  }
  if (u > 3.3 && u < 5) for (let i = 0; i < 6; i++) { const p = prog(u, 3.6 + i * 0.05, 4.6 + i * 0.05); if (p > 0 && p < 1) paperBall(x, 300 + Math.cos(i * 1.2) * 700 * p, 700 - 500 * p + 600 * p * p, 20, p * 8) }
  if (u > 3.3) tag(x, '⌫ DELETED', 330, 760, { size: 28, bg: '#ff8fa0', k: pop01(t, I.I0 + 3.4, 0.3, 2) * outK(t, [I.I0 + 4.6, I.I0 + 4.9]) })
  // the breath
  if (u > 4.4) {
    const b = 0.5 + 0.5 * Math.sin((u - 4.4) * 2.4 - Math.PI / 2)
    x.save(); x.globalAlpha = 0.5; x.strokeStyle = '#9fe6b0'; x.lineWidth = 8; x.beginPath(); x.arc(360, 1150, 160 + 60 * b, 0, Math.PI * 2); x.stroke(); x.restore()
    label(x, b > 0.5 ? 'breathe in…' : 'and out.', 360, 900, { size: 32, col: '#9fe6b0' })
  }
  pisces(x, t, { x: 960, y: 1450, s: 150, tears: u < 1.4 ? 2 : 3, mood: u > 4.4 ? 'happy' : 'sparkle', look: [-1, -0.6], role: 'ROOMMATE', pop: pop01(t, I.I0 + 0.4, 0.3, 2) })
  if (u > 1.5 && u < 3.3) bubble(x, t, 860, 1260, I.I0 + 1.5, I.I0 + 3.3, 'point SIX?? (sob)', { size: 28, col: '#c9f2ff' })
}

const EP = shortBX({
  id: 'kbxe07', sign: 'virgo', duration: 24, ending: 'cut', DE: 5.4, QL: 3.2,
  hook: { text: 'Closure essay. | Draft *twelve.*', out: [5.1, 5.3], accentColor: '#9fe6b0' },
  rec: { sub: 'WORD COUNT: 2,104', caption: 'footnotes. it has *footnotes.*' },
  room: (x, t, S, a = 1) => roomBedroom(x, t, { a }), contact: 'Sam', sub: 'last seen in May', clock: '11:48 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisRole: 'ROOMMATE',
  stars: ['Virgo. *twelve* drafts.', 'before thirteen: three questions.'],
  qs: [
    { q: 'Have I already said this?', a: '…yes. in May. twice.', mood: 'squint' },
    { q: 'Will their reply give me peace?', a: 'only if it’s perfect. so no.', mood: 'neutral', look: [0, 1] },
    { q: 'Who is this essay really for?', a: '…me. it’s for me.', mood: 'sparkle' },
  ],
  head: 'Virgo read it | *out loud.*',
  lines: [{ t: 0.3, text: 'say it out loud. let it be *heard.*' }, { t: 4.4, text: 'you were the reader. that’s enough.' }],
  instead,
  last: 'Edit your life, | not the *essay.*',
  cues: I => [
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(0.5 + i * 0.5).toFixed(2), 0.02]),
    ['whoosh', I.I0 + 0.2, 1.8, 0.02], ['riser', I.I0 + 1.6, I.I0 + 3.3, 0.02],
    ['whoosh', I.I0 + 3.35, 0.4, 0.05], ['pop', I.I0 + 3.4, 1174.66, 0.05, 0], ['tick', I.I0 + 3.6, 0.05], ['tick', I.I0 + 3.7, 0.05],
    ['bell', I.I0 + 4.5, 1318.51, 0.025, 1.6, 0], ['pluck', I.I0 + 1.6, 659.25, 0.03, 0.5, 0.5], ['pluck', I.I0 + 1.74, 587.33, 0.03, 0.5, 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, glowAt, wrap, clamp, lerp, BONE, GOLD]
