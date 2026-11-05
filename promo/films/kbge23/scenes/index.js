// kbge23: BIO GLOW-UP, "The full bio makeover" (60 s vertical, star_advice trial reel, long). Kit: ../../kbge01/biokit.js
// One Aquarius bio rebuilt from zero, in seven chapter stickers; THE STARS coach, Aquarius answers from the photo,
// Pisces the bio judge sniffles from second one and sobs hardest at the reply (the payoff promised in the hook).
//   0.00  frame 0: Aquarius' card mid-crash onto the screen (shake), a blurry cloud as the photo, the red pen uncapped;
//         hook "One bio. One minute. | *Wait* for the reply."
//   3.2   1 · THE BEFORE   "Ask me about my theories." + a photo of a cloud. THE STARS: "ok. who *is* this?"  Aquarius: "it's me! I'm the cloud."
//  11.0   2 · THE RED PEN  three notes: VAGUE (the bio) · NO FACE (the photo) · NO WAY IN (nothing to reply to)
//  20.0   3 · THE TRUE THING  "what do you do on a *Thursday?*"  → "I fix old radios at the library *repair café.*"
//  28.0   4 · THE PHOTO     the cloud swaps for Aquarius holding a little radio
//  35.0   5 · THE WAY IN    "give them an easy *first message.*" → "bring me something broken. I'll try."
//  42.0   6 · THE GLOW-UP   strike, the new bio types on, GLOWED UP, a 10
//  50.0   7 · THE REPLY     "wait. my radio's been broken for a *year.*" Aquarius: "BRING IT." · 58.3 last line. Hard cut at 60.
import { makeBio, signStar, tag, photoDefault, drawBits, icon, ICONS, KIT, PHOTO, prog, ease, lerp } from '../../kbge01/biokit.js'

ICONS.RADIO = { bm: ['.......A', '......A.', 'BBBBBBBB', 'BSSSBDDB', 'BSSSBDDB', 'BSSSBBBB', 'BBBBBBBB'], cols: { A: '#c9c2d6', B: '#c98a52', S: '#5a4030', D: '#ffe27a' } }
const AQU = signStar('aquarius'), TAU = signStar('taurus')
export const DURATION = 60
const SWAP_PHOTO = 29.0
const AQ = { col: '#bfe8ff', x: 600, y: 395, tail: 0.2 }
function cloudPhoto(x, t, S) {
  const P = PHOTO
  const g = x.createLinearGradient(0, P.y, 0, P.y + P.h); g.addColorStop(0, '#8cc6f0'); g.addColorStop(1, '#d6ecfb'); x.fillStyle = g; x.fillRect(P.x, P.y, P.w, P.h)
  x.save(); x.filter = 'blur(10px)'
  for (const [dx, dy, r] of [[-120, 10, 90], [-20, -30, 120], [100, 0, 100], [20, 50, 110]]) { x.fillStyle = 'rgba(255,255,255,0.92)'; x.beginPath(); x.arc(P.x + P.w / 2 + dx + 8 * Math.sin(t * 0.7), P.y + P.h / 2 + dy, r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
const EP = makeBio({
  id: 'kbge23', sign: 'aquarius', name: 'Aquarius', age: 28, D: DURATION,
  hook: 'One bio. One minute. | *Wait* for the reply.', hookColor: '#7fe0ff', hookSize: 96, hookOut: [3.0, 3.2],
  bad: 'Ask me about my theories.', bioSize: 50,
  circle: { word: 'my theories.', label: 'VAGUE' },
  good: 'Fixes old radios at the library repair café on Thursdays. Bring me something *broken.* I’ll try.',
  fx: 'shake', fxOpts: { at: 0.05, amp: 30 }, shake0: 10, zoom0: 1.14, cps: 24,
  T: { fx: 0.05, circle: 12.0, strike: [42.4, 43.0], swap: 43.2, last: 58.3 },
  says: [
    { t: 4.2, text: 'ok. who *is* this?', end: 7.3 },
    { t: 7.5, text: 'it’s me! I’m the *cloud.*', ...AQ, end: 10.8 },
    { t: 17.8, text: 'three notes. all *fixable.*', end: 20.3 },
    { t: 20.6, text: 'what do you do on a *Thursday?*', end: 23.3 },
    { t: 23.5, text: 'I fix old radios at the library *repair café.*', ...AQ, end: 26.1 },
    { t: 26.3, text: 'THAT. that’s *the bio.*', end: 29.6 },
    { t: 30.5, text: 'is my face… *allowed?*', ...AQ, end: 32.6 },
    { t: 32.8, text: 'your face is *the point.*', end: 35.4 },
    { t: 35.6, text: 'now give them an easy *first message.*', end: 38.4 },
    { t: 38.6, text: 'bring me something broken. *I’ll try.*', ...AQ, end: 41.8 },
    { t: 52.6, text: 'BRING IT.', ...AQ, end: 55.0 },
    { t: 55.2, text: 'real bio, *real* person.', end: 58.0 },
  ],
  reply: { at: 50.4, out: [52.4, 52.6], body: 'wait. my radio’s been broken for a *year.*', glyph: TAU.glyph, color: TAU.color },
  photoBase: (x, t, S) => {
    if (t < SWAP_PHOTO) { cloudPhoto(x, t, S); return }
    photoDefault(x, t, S, EP_CFG)
    const k = ease.outBack(prog(t, SWAP_PHOTO, SWAP_PHOTO + 0.4))
    icon(x, 'RADIO', PHOTO.x + PHOTO.w / 2 + 150, PHOTO.y + 250 + 4 * Math.sin(t * 3), 12 * k, { rot: -0.08 })
  },
  mood: (t, S) => t >= S.T.glow ? 'sparkle' : t > 50.4 ? 'heart' : t > 23.4 && t < 26.2 ? 'happy' : t > 30.4 && t < 32.7 ? 'wide' : 'neutral',
  top: (x, t) => { tag(x, t, 760, 560, 14.9, 'NO FACE', { life: 4.9, size: 34, rot: 0.06 }); tag(x, t, 300, 1390, 16.7, 'NO WAY IN', { life: 3.1, size: 34, rot: -0.05 }) },
  camera: (t, S, c) => ({ ...c, zoom: c.zoom * (1 + 0.025 * Math.sin(t * 0.6)) }),
  last: 'Real bio. | Real *reply.*',
})
// the photo after the swap reuses the default star (needs the same cfg the kit gave it)
var EP_CFG = { sign: 'aquarius', starS: 230, mood: (t, S) => t >= S.T.glow ? 'sparkle' : t > 30.4 && t < 32.7 ? 'wide' : 'happy', starXY: (t, S) => [PHOTO.x + PHOTO.w / 2 - 40, PHOTO.y + PHOTO.h * 0.56] }

const CH = [[3.2, 'the before'], [11.0, 'the red pen'], [20.0, 'the true thing'], [28.0, 'the photo'], [35.0, 'the way in'], [42.0, 'the glow-up'], [50.0, 'the reply']]
const CHAPS = CH.map(([at, title], i) => ({ at, out: [(CH[i + 1] ? CH[i + 1][0] : 58.0) - 0.3, (CH[i + 1] ? CH[i + 1][0] : 58.0) - 0.12], n: i + 1, title, y: 250 }))
CHAPS[6].out = [50.2, 50.35]; CHAPS.push({ at: 52.65, out: [58.0, 58.15], n: 7, title: 'the reply', y: 250 })
const NOFACE = { at: 14.6, x: 540, y: PHOTO.y + PHOTO.h / 2, r: 300, ry: 150, label: null, arrow: null, rec: false, out: [19.6, 19.85] }
const NOWAY = { at: 16.4, x: 540, y: 1290, r: 330, ry: 70, label: null, arrow: null, rec: false, out: [19.6, 19.85] }
const PHOTOFLASH = { at: SWAP_PHOTO, from: 1.12, len: 0.35, lines: false, flash: 0.8 }
export const SCENES = [...EP.SCENES.slice(0, 1), ...EP.SCENES.slice(1), ...CHAPS.map(c => KIT.chapter(c)), KIT.caught(NOFACE), KIT.caught(NOWAY), KIT.whipZoom(PHOTOFLASH)]
export const CUES = [...EP.CUES, ...CHAPS.flatMap(c => KIT.chapterCues(c)), ...KIT.caughtCues(NOFACE), ...KIT.caughtCues(NOWAY), ...KIT.whipZoomCues(PHOTOFLASH)]
export const T = EP.T
void drawBits; void lerp; void AQU
