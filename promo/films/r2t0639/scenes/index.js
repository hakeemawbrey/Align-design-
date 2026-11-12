// r2t0639: star_talk, BELIKE (twelve signs), "One nice photo? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · D).
// Each sign trying (and failing, extremely) to take one nice photo. Ending: lesson.
//   ♈ took one, posted it blurry · ♉ won't pose until fed · ♊ 400 photos, 400 faces · ♋ put it in a
//   locket · ♌ brought their own ring light · ♍ fixed everyone's collar, missed the photo · ♎ asked their match "left
//   side or right?" · ♏ in every photo, only as a shadow · ♐ jump shot, still airborne · ♑ made it a headshot
//   · ♒ shot it from the floor · ♓ saw the photo, cried, it's beautiful
//   lesson "The blurry ones | are *the best ones.*"  MEMORY: SAVED
//   last "Aries already | *posted it.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -180 }
const LOCKET = ['...YY...', '..Y..Y..', '...YY...', '.YYYYYY.', 'YYPPPPYY', 'YPPHHPPY', 'YPPHHPPY', 'YYPPPPYY', '.YYYYYY.', '..YYYY..']

// a polaroid: cream frame, a dark photo area where `inner(cx, cy, w, h)` draws
function polaroid(x, cx, cy, w, h, k, rot, inner) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  const pw = w - 36, ph = h - 90
  x.fillStyle = '#2a3a6a'; x.fillRect(-pw / 2, -h / 2 + 18, pw, ph)
  x.save(); x.beginPath(); x.rect(-pw / 2, -h / 2 + 18, pw, ph); x.clip()
  if (inner) inner(0, -h / 2 + 18 + ph / 2, pw, ph)
  x.restore(); x.restore()
}
const flash = (x, t, t0, a = 0.55) => { const d = t - t0; if (d > 0 && d < 0.25) { x.save(); x.globalAlpha = a * (1 - d / 0.25); x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() } }

const CAMEOS = [
  { sign: 'aries', cap: 'Took one photo. | *Posted it blurry.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      flash(x, t, P.t0 + 0.3)
      polaroid(x, 800, 830, 300, 360, pop01(t, P.t0 + 0.5, 0.3, 2), 0.06, (cx, cy) => {
        x.save(); x.globalAlpha = 0.35; for (let i = 0; i < 4; i++) bits(x, 'STAR5', cx - 30 + i * 20, cy, 16); x.restore()
      })
      L(x, 800, 1110, 'POSTED: 0.4 SEC AGO', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Won’t pose | *until fed.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      L(x, 800, 650, 'SAY CHEESE!', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.04, 36)
      bubble(x, 800, 820, 'say pasta.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 48, tail: 'bl' })
      bits(x, 'BOWL', 800, 1040, 18 * pop01(t, P.t0 + 1.3, 0.3, 2))
      flash(x, t, P.t0 + 1.7)
    } },
  { sign: 'gemini', cap: '400 photos. | *400 faces.*', mood: lt => ['wink', 'wide', 'sparkle', 'squint', 'happy'][Math.floor(lt * 3) % 5], look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) polaroid(x, 720 + (i % 2) * 170, 740 + Math.floor(i / 2) * 230, 150, 190, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), (i - 1.5) * 0.08, (cx, cy) => friend(x, t, 'gemini', cx, cy + 8, 100, 1, { mood: ['wink', 'wide', 'squint', 'eyeroll'][i] }))
      L(x, 800, 1140, `PHOTO ${Math.min(400, Math.floor(lerp(1, 400, clamp((lt - 0.3) / 1.6))))}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.04, 34)
      flash(x, t, P.t0 + (Math.floor(lt * 3) / 3), 0.25)
    } },
  { sign: 'cancer', cap: 'Got one good photo. | Put it *in a locket.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LOCKET, { Y: GOLD, P: PINK, H: '#ff4f86' }, 800, 860, 26 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.08 * Math.sin(t * 2) })
      L(x, 800, 1130, 'WORN: FOREVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32)
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Brought their own | *ring light.*', mood: 'sparkle', star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.35 * k; const g = x.createRadialGradient(360, 880, 20, 360, 880, 320); g.addColorStop(0, '#fff6c8'); g.addColorStop(1, 'rgba(255,246,200,0)'); x.fillStyle = g; x.fillRect(110, 480, 860, 740); x.restore() }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(800, 820); x.scale(k, k); x.lineWidth = 40; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.stroke(); x.lineWidth = 28; x.strokeStyle = '#fff6c8'; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.stroke(); x.fillStyle = INK; x.fillRect(-8, 150, 16, 200); x.restore() }
      L(x, 800, 1130, 'LIGHTING: DIVINE', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'virgo', cap: 'Fixed everyone’s collar. | *Missed the photo.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.35))
      ;['leo', 'libra', 'gemini'].slice(0, n).forEach((id, i) => friend(x, t, id, 680 + i * 120, 930, 120, pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2), { mood: 'happy' }))
      flash(x, t, P.t0 + 1.4)
      L(x, 800, 690, lt < 1.4 ? 'ONE SEC…' : 'PHOTO: TAKEN', pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.4 ? BONE : RED, -0.04, 36)
      L(x, 800, 1120, 'VIRGO: NOT IN IT', pop01(t, P.t0 + 1.7, 0.3, 2.2), '#2fc79a', 0.04, 32)
    } },
  { sign: 'libra', cap: 'Asked their match: | *“Left side or right?”*', mood: lt => lt > 1.6 ? 'wide' : 'wink', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 830, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH: TAURUS', headCol: PINK, size: 30,
        lines: [['left or right?', PINK, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['both cute!', GOLD, pop01(t, P.t0 + 1.0, 0.25, 2), false], ['…but which', PINK, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
      L(x, 790, 1150, 'SENT: 1 HOUR AGO', pop01(t, P.t0 + 1.9, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'In every photo. | *Only as a shadow.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) polaroid(x, 680 + i * 120, 820 + (i % 2) * 70, 190, 240, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), (i - 1) * 0.1, (cx, cy) => {
        x.save(); x.fillStyle = '#0a0614'; x.beginPath(); x.arc(cx + 30, cy - 18, 24, 0, Math.PI * 2); x.fill(); x.fillRect(cx + 4, cy + 4, 52, 60); x.restore()
      })
      L(x, 800, 1120, 'IDENTITY: UNCONFIRMED', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#c97bff', 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Jump shot! | *Still airborne.*', mood: 'sparkle', look: [0, -1], star: { x: -180, y: -110 },
    front(x, t, lt, P) {
      flash(x, t, P.t0 + 0.6)
      L(x, 800, 700, 'TAKE: MID-AIR', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, -0.04, 36)
      L(x, 800, 1100, 'LANDING: TBD', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Group photo? | Made it *a headshot.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      polaroid(x, 800, 820, 300, 360, pop01(t, P.t0 + 0.3, 0.3, 2), 0.04, (cx, cy) => { friend(x, t, 'capricorn', cx, cy + 10, 160, 1, { mood: 'neutral' }); x.fillStyle = INK; x.fillRect(cx - 20, cy + 70, 40, 60) })
      L(x, 800, 1110, 'SKILLS: SMILING (NEW)', pop01(t, P.t0 + 1.3, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Took it | *from the floor.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 1], star: { x: -180, y: -40 },
    front(x, t, lt, P) {
      phone(x, t, 800, 1060, 0.7 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'ART.', headCol: '#6fc3ff', rot: -0.9, size: 30 })
      L(x, 800, 660, 'ANGLE: NOSTRIL', pop01(t, P.t0 + 0.9, 0.3, 2), '#6fc3ff', -0.05, 36)
      L(x, 800, 800, '“it’s a vibe”', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, 0.05, 32)
    } },
  { sign: 'pisces', cap: 'Saw the photo. | Cried. *It’s beautiful.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.0, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      polaroid(x, 800, 820, 300, 360, pop01(t, P.t0 + 0.3, 0.3, 2), 0.05, (cx, cy) => { for (let i = 0; i < 5; i++) bits(x, 'STAR5', cx - 90 + i * 45, cy + 10 * Math.sin(i), 6) })
      hearts(x, t, 800, 700, P.t0 + 0.9, { n: 6, life: 2.0, spread: 220, cell: 7, seed: 6 })
      L(x, 800, 1110, 'NEW WALLPAPER', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0639', key: 'D', accent: ACC, ending: 'lesson',
  title: 'One nice photo? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve takes. | *Zero* nice ones.' },
  lesson: { text: 'The blurry ones | are *the best ones.*', chip: 'MEMORY: SAVED' },
  last: { text: 'Aries already | *posted it.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
