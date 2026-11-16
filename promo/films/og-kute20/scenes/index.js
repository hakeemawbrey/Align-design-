// og-kute20: the social rework of kute20, "Texting your best friend… feelings" (11 s vertical, synthwave · C#m).
// Same phone, Scorpio, hoodie and story; kit copy ../unsentkit.js (no series bug, no slam title, no scratch flash).
// Static HOOK (outline, until 3.5): "Your best friend | is *the one.*"; Scorpio's drafts pushed to full Scorpio; hard cut on THE STARS' line.
//   0.00 frame 0: Scorpio buried in a hoodie, hearts flying, "i think i'm in love with you" mid-delete
//   1.20 "random question. no reason. none." ✗ · 2.90 "if someone hypothetically reread our chat 40 times" ✗ (wipe)
//   5.60 "can we talk tomorrow? in person." · 7.80 THE STARS · hard cut at 11 on the line
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../unsentkit.js'
// a hood pulled over Scorpio's top point (hiding), pushed back once the honest draft starts
function hoodie(c, t, o) {
  const up = t < 5.6 ? 1 : 1 - ease.inOutCubic(clamp((t - 5.6) / 0.5))
  if (up <= 0.02) return
  const top = o.y - o.s * 0.5, x = o.x
  c.save(); c.globalAlpha = up; c.translate(x, top + 10 - (1 - up) * 50)
  c.fillStyle = INK; c.beginPath(); c.arc(0, 30, 92, Math.PI * 1.05, Math.PI * 1.95); c.lineTo(80, 60); c.lineTo(-80, 60); c.closePath(); c.fill()
  c.fillStyle = '#5a3d78'; c.beginPath(); c.arc(0, 30, 84, Math.PI * 1.08, Math.PI * 1.92); c.lineTo(72, 54); c.lineTo(-72, 54); c.closePath(); c.fill()
  c.restore()
}
const EP = makeUnsent({
  id: 'og-kute20', duration: 11,
  hero: { x: 205 },   // og full frame: Scorpio clears the left edge
  sign: 'scorpio', name: 'Scorpio', to: 'Wren', status: 'online', avatar: '#9fe6b0',
  hook: '', ending: 'cut', draftBase: 3,
  msgs: [{ text: 'ok but who’s your favorite person', at: -9, stamp: '11:40 pm' }, { text: 'obviously you. forever. no notes.', at: -8.8, from: 'me' }],
  drafts: [
    { text: 'i think i’m in love with you', at: -2.2, cps: 17, del: -0.3, delCps: 30 },
    { text: 'random question. no reason. none.', at: 1.2, cps: 22, del: 2.6, delCps: 40 },
    { text: 'if someone hypothetically reread our chat 40 times', at: 2.9, cps: 22, del: 5.2, wipe: true },
    { text: 'can we talk tomorrow? in person.', at: 5.6, cps: 18 },
  ],
  onHero: (c, t, S, o) => hoodie(c, t, o),
  front: (c, t) => { for (const t0 of [-1.2, 5.8]) hearts(c, t, t0, 200, 1050, { n: 6, cell: 7 }) },
  heroTears: t => t > 5.2 && t < 7.6 ? 1 : 0,
  sob: t => t > 5.3 ? 3 : 2,
  lines: [{ t: 7.8, text: 'Big feelings? Say them *face to face.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Your best friend | is *the one.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5
