// khookdemo: the HOOK KIT demo (promo/films/hookkit.js): every effect in sequence, ~20 s vertical, loops seamlessly.
// No end card, no card transition. Leo and Pisces (who cries, the house gag) are the cast; the kit does the rest.
//   0.00   frame 0: slam title "Every hook. | *One* video." already landed, mid whip zoom (blurred), a shake at 0.3
//   1.10   record scratch + freeze frame: "yep. *that's me.*"; 1.30 caught in 4K circle on Pisces (crying)
//   2.70   notification drop: "Leo: we need to *talk.*"
//   4.10   loading bar: "overthinking…" stalls at 99 %, then "Error: too many feelings"
//   6.50   full-screen incoming call from Leo; answered at 7.90
//   8.60   3-2-1 countdown, GO!
//  10.60   game HUD (timer + splits); 12.55 ACHIEVEMENT UNLOCKED
//  13.50   news desk: BREAKING, lower third, ticker
//  15.80   chapter sticker "1 · THE FIRST TEXT"; 16.30 glitch "LEO.EXE has stopped responding"
//  17.60   slam title "Pisces is *fine.*" + shake (Pisces fountains)
//  19.60–20.0  loop helper eases back into frame 0
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { drawStarChar, signStar } from '../../startalk.js'
import {
  whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, screenShake, shakeCues,
  caught, caughtCues, incomingCall, incomingCallCues, notification, notificationCues, loadingBar, loadingBarCues,
  countdown, countdownCues, newsDesk, newsDeskCues, gameHud, gameHudCues, achievement, achievementCues, chapter,
  chapterCues, glitch, glitchCues, loopBack, loopCues,
} from '../../hookkit.js'

export const DURATION = 20
const LEO = signStar('leo'), PIS = signStar('pisces')

// ── the kit effects (one opts object each, shared by picture and sound)
const HOOK = { at: -1, text: 'Every hook. | *One* video.', top: 240, out: [0.95, 1.08] }
const WHIP = { at: -0.08, len: 0.45 }
const SHAKE1 = { at: 0.3, len: 0.4, amp: 22 }
const REC = { at: 1.1, len: 1.5, caption: 'yep. *that’s me.*', sub: 'you’re probably wondering how I got here' }
const CAUGHT = { at: 1.3, x: 750, y: 1080, r: 175, out: [2.5, 2.62], arrow: 'tl' }
const NOTIF = { at: 2.7, out: [4.0, 4.25], title: 'texts', body: 'Leo: we need to *talk.*', glyph: LEO.glyph, color: LEO.color }
const LOAD = { at: 4.1, len: 2.4, label: 'overthinking…' }
const CALL = { at: 6.5, out: [8.45, 8.55], name: 'Leo', sub: 'incoming call…', glyph: LEO.glyph, color: LEO.color, answerAt: 7.9 }
const COUNT = { at: 8.6, from: 3, gap: 0.5 }
const HUD = { at: 10.6, out: [13.25, 13.45], title: 'PISCES · NOT CRYING · ANY%', splits: [{ at: 11.0, name: 'eye contact' }, { at: 11.5, name: 'first text' }, { at: 12.0, name: 'hang out?' }, { at: 12.45, name: 'tears', best: false }] }
const ACH = { at: 12.55, out: [13.25, 13.45], text: 'cried at a *sunset.*' }
const NEWS = { at: 13.5, out: [15.6, 15.78], headline: 'Leo replied in under *three minutes.*', ticker: ['Pisces is fine, sources say', 'Pisces is not fine', 'more at eleven'] }
const CHAP = { at: 15.8, out: [17.5, 17.62], n: 1, title: 'the first text' }
const GLITCH = { at: 16.3, len: 1.2, text: 'LEO.EXE has stopped *responding*' }
const SLAM2 = { at: 17.6, text: 'Pisces is *fine.*', top: 300, out: [19.45, 19.58] }
const SHAKE2 = { at: 17.88, len: 0.5, amp: 30 }

// ── the base film: night sky, Leo and Pisces. Pisces is crying the whole time (more on the bad beats).
function poses(t) {
  // Leo: bounces in place, leans in during the call, does a victory hop at GO
  const leo = { x: 300, y: 1180, s: 250, mood: 'happy', look: [1, 0] }
  const pis = { x: 760, y: 1110, s: 240, mood: 'wide', look: [-1, 0], tears: 2 }
  if (t > REC.at + REC.len && t < LOAD.at + LOAD.len) { leo.mood = 'neutral'; pis.look = [0, -1]; pis.tears = 1 }
  if (t > LOAD.at + LOAD.len - 0.5 && t < CALL.at) pis.tears = 3
  if (t > COUNT.at && t < HUD.at) { leo.mood = 'wide'; pis.mood = 'squint' }
  if (t > HUD.at && t < NEWS.at) { pis.mood = t > 12.45 ? 'wide' : 'sparkle'; pis.tears = t > 12.45 ? 3 : 1 }
  if (t > NEWS.at && t < GLITCH.at) { leo.mood = 'heart'; leo.y -= 40 * Math.abs(Math.sin((t - NEWS.at) * 4)) }
  if (t > GLITCH.at && t < SLAM2.at) { leo.mood = 'eyeroll' }
  if (t > SLAM2.at) { pis.mood = 'happy'; pis.tears = 3; leo.mood = 'wink' }
  return { leo, pis }
}
const HOPS = [0.3, 2.8, 4.15, 8.6, 9.1, 9.6, 10.1, 11.0, 12.0, 13.55, 15.85, 17.65, 17.9]

/** pixel tears: two streams from the eyes (n = 1 trickle, 2 streams, 3 fountain) */
function tears(x, cx, cy, s, t, n) {
  if (!n) return
  const cell = Math.max(5, Math.round(s / 22))
  const eyeY = cy - s * 0.03, eyes = [cx - s * 0.13, cx + s * 0.13]
  x.save()
  eyes.forEach((ex, side) => {
    const dir = side ? 1 : -1
    const drops = n === 1 ? 3 : n === 2 ? 6 : 10
    for (let i = 0; i < drops; i++) {
      const ph = ((t * (n === 3 ? 1.6 : 1.1)) + i / drops) % 1
      let px, py
      if (n === 3) { px = ex + dir * ph * s * 0.7; py = eyeY - Math.sin(Math.PI * ph) * s * 0.35 + ph * ph * s * 0.5 }
      else { px = ex + dir * ph * s * 0.08; py = eyeY + ph * s * (n === 1 ? 0.25 : 0.42) }
      x.globalAlpha = 1 - ph * 0.6
      x.fillStyle = i % 2 ? '#8fd8ff' : '#cfeeff'
      x.fillRect(Math.round(px - cell / 2), Math.round(py), cell, cell * (n === 3 ? 1 : 2))
    }
  })
  x.restore()
}

async function build(stage) {
  try { await Promise.all(['800 40px Inter', "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const bug = el('div', { position: 'absolute', left: '70px', top: '1790px', font: "800 30px Inter", letterSpacing: '0.32em', fontVariant: 'small-caps', color: 'rgba(239,230,214,0.78)', textShadow: '0 2px 10px rgba(6,4,18,0.9)' }, root, 'hook kit')
  const gx = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
  return {
    start: 0, end: DURATION + 1, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom + 0.02 * Math.sin(t * 0.5) })
      const { leo, pis } = poses(t)
      drawStarChar(x, leo.x, leo.y, leo.s, t, { color: LEO.color, glyph: LEO.glyph, mood: leo.mood, look: leo.look, hops: HOPS, seed: 3 })
      drawStarChar(x, pis.x, pis.y, pis.s, t, { color: PIS.color, glyph: PIS.glyph, mood: pis.mood, look: pis.look, hops: HOPS.map(h => h + 0.12), seed: 6 })
      tears(x, pis.x, pis.y, pis.s, t, pis.tears)
      bug.style.opacity = '1'
      drawGrain(gx, t)
    },
  }
}

const MAIN = frozen(build, [REC])
export const SCENES = [
  MAIN,
  whipZoom(WHIP), screenShake(SHAKE1), screenShake(SHAKE2), recordScratch(REC), glitch(GLITCH),
  caught(CAUGHT), notification(NOTIF), loadingBar(LOAD), incomingCall(CALL), countdown(COUNT),
  gameHud(HUD), achievement(ACH), newsDesk(NEWS), chapter(CHAP), slamTitle(HOOK), slamTitle(SLAM2),
  loopBack([MAIN, whipZoom(WHIP), slamTitle(HOOK)], { duration: DURATION }),
]

export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE1), ...slamTitleCues(HOOK),
  ...recordScratchCues(REC), ...caughtCues(CAUGHT),
  ...notificationCues(NOTIF), ...loadingBarCues(LOAD), ...incomingCallCues(CALL), ...countdownCues(COUNT),
  ...gameHudCues(HUD), ...achievementCues(ACH), ...newsDeskCues(NEWS), ...chapterCues(CHAP), ...glitchCues(GLITCH),
  ...slamTitleCues(SLAM2), ...shakeCues(SHAKE2),
  ['pluck', 18.1, 659.25, 0.035, 0.5, 0.3], ['pluck', 18.25, 587.33, 0.035, 0.5, 0.3],   // Pisces' happy sob
  ...loopCues({ duration: DURATION }),
]
