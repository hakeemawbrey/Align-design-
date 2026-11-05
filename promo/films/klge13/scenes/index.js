// klge13 · Your Sign's Love Glitch · "Cancer.exe: The 2 A.M. Reread" (21 s vertical, star_advice post, loop).
//   0.0   frame 0: CANCER.EXE: rereading the ex. 2 A.M. Cancer in bed mid-scroll, the old chat with ALEX flying past,
//         the scroll bar plunging to "3 YEARS AGO", the clock on 2:04. 0.5 whip onto the scroll bar.
//   3.0   the glitch: replaying only the good parts. Polaroid highlights pop (the beach day, the inside joke, "forever");
//         a GOOD PARTS ONLY filter. The clock runs to 2:47.
//   7.5   error: NOSTALGIA LOOP.   9.2 Pisces pops out of the tray, crying.
//   11.2  THE STARS: "missing them is real. it doesn't mean *going back.*"   13.9 patch 1.13 installs.
//   15.8  Cancer closes the old chat and texts a friend: "up?" → "always. want to talk?"
//   18.8  last line "Missing is not a *map.*"   20.55 loop back into frame 0.
import { makeGlitch, R, box, label, phone, hearts, sparkles, sticker, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const FRIEND = 15.8
const OLD = ['lol you’re ridiculous', 'miss you already', 'the beach was perfect', 'ok but our song', 'forever?', 'forever.', 'goodnight :)', 'remember the ferry', 'haha stop', 'call me']
function oldChat(x, t, cx, cy, w, h) {
  box(x, cx - w / 2 - 10, cy - h / 2 - 10, w + 20, h + 20, '#2a2148', { b: 7 })
  R(x, '#120d26', cx - w / 2, cy - h / 2, w, h)
  R(x, '#8a5a7a', cx - w / 2, cy - h / 2, w, 80); label(x, 'ALEX', cx, cy - h / 2 + 50, { size: 28, col: BONE, font: INTER, weight: 800 })
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2 + 80, w, h - 80); x.clip()
  const speed = t < 3 ? 900 : t < 7.5 ? 260 : 60
  const off = (t * speed) % (OLD.length * 90)
  for (let k = -1; k < 2; k++) OLD.forEach((m, i) => {
    const y = cy - h / 2 + 100 + (i * 90 + off - k * OLD.length * 90) % (OLD.length * 90) - 90
    if (y < cy - h / 2 + 40 || y > cy + h / 2) return
    const me = i % 2 === 0
    x.font = `700 26px ${INTER}`; const bw = x.measureText(m).width + 34
    R(x, me ? '#5b4bd6' : '#e9e4f2', me ? cx + w / 2 - 20 - bw : cx - w / 2 + 20, y, bw, 52)
    label(x, m, me ? cx + w / 2 - 20 - bw / 2 : cx - w / 2 + 20 + bw / 2, y + 27, { size: 26, col: me ? BONE : INK, font: INTER, weight: 700 })
  })
  // the "3 YEARS AGO" divider
  label(x, '— 3 YEARS AGO —', cx, cy - h / 2 + 110, { size: 20, col: GOLD, stroke: INK })
  x.restore()
  // scrollbar plunging
  const sb = t < 3 ? 0.15 + 0.1 * Math.sin(t * 6) : Math.max(0.02, 0.15 - (t - 3) * 0.03)
  R(x, '#3a3060', cx + w / 2 - 12, cy - h / 2 + 90, 8, h - 100); R(x, GOLD, cx + w / 2 - 14, cy - h / 2 + 90 + sb * (h - 140), 12, 40)
  if (t < 3) { x.save(); x.globalAlpha = 0.4; for (let i = 0; i < 6; i++) R(x, BONE, cx - w / 2 + 30, cy - h / 2 + 120 + i * 80, w - 60, 3); x.restore() }
}
function polaroid(x, t, at, px, py, rot, caption, art) {
  const k = pop01(t, at, 0.3, 2.4) * outK(t, [7.3, 7.5])
  if (k <= 0.01) return
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(k, k)
  box(x, -120, -130, 240, 260, '#f4ede0', { b: 5 })
  R(x, '#c9a070', -100, -110, 200, 170)
  art(x)
  label(x, caption, 0, 92, { size: 22, col: INK, font: INTER, weight: 800 })
  x.restore()
}
const BEACH = x => { R(x, '#7fd0f0', -100, -110, 200, 90); R(x, '#f2d48a', -100, -20, 200, 80); x.fillStyle = '#ffd060'; x.beginPath(); x.arc(50, -70, 22, 0, Math.PI * 2); x.fill() }
const JOKE = x => { label(x, 'HA', -30, -30, { size: 60, col: '#a03a5a', font: INTER, weight: 900, rot: -0.2 }); label(x, 'HA', 40, 20, { size: 50, col: '#a03a5a', font: INTER, weight: 900, rot: 0.2 }) }
const FOREVER = x => { label(x, 'forever.', 0, -25, { size: 40, col: '#7a2a5a', font: INTER, weight: 900 }) }

function scene(x, t, K) {
  const fr = t >= FRIEND
  R(x, '#120e2a', 70, 556, 940, 880)
  // the window with the moon (flashes on frame 0)
  box(x, 110, 600, 240, 220, '#0a0a24', { b: 7 }); x.fillStyle = t < 0.6 && Math.floor(t * 12) % 2 ? '#fff' : '#f4ecc8'; x.beginPath(); x.arc(230, 700, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = '#0a0a24'; x.beginPath(); x.arc(250, 690, 46, 0, Math.PI * 2); x.fill(); R(x, INK, 226, 600, 8, 220)
  // the clock
  const mins = fr ? 51 : t < 3 ? 4 : Math.min(47, 4 + Math.floor((t - 3) * 9.6))
  box(x, 120, 860, 220, 90, '#1a1338', { b: 5 }); label(x, `2:${String(mins).padStart(2, '0')} AM`, 230, 906, { size: 40, col: RED, font: INTER, weight: 900 })
  // bed + Cancer under the covers
  box(x, 90, 1250, 560, 140, '#5a4a8a', { b: 6 }); box(x, 90, 1190, 120, 70, '#efe6d6', { b: 5 })
  K.hero(x, t, 300, 1170, 250, { mood: fr ? (t > 17.0 ? 'happy' : 'neutral') : t > 7.5 && t < 9.2 ? 'wide' : 'sparkle', look: [1, -0.5], tears: fr ? 1 : 2, hops: [3.3, 4.3, 5.3, 16.2, 17.0] })
  R(x, INK, 150, 1236, 520, 100); R(x, '#7a6ab0', 156, 1242, 508, 88); for (let i = 0; i < 508; i += 44) R(x, '#8a7ac0', 156 + i, 1242, 22, 88)
  // the phone
  if (!fr) oldChat(x, t, 780, 980, 380, 700)
  else {
    const sw = ease.inCubic(prog(t, FRIEND, FRIEND + 0.3))
    if (sw < 1) { x.save(); x.translate(sw * 500, 0); oldChat(x, t, 780, 980, 380, 700); x.restore() }
    if (t > FRIEND + 0.2) phone(x, t, { cx: 780 + (1 - ease.outCubic(prog(t, FRIEND + 0.2, FRIEND + 0.5))) * -500, cy: 980, w: 380, h: 700, title: 'MAYA', lines: [{ from: 'me', text: 'up?', at: 16.2 }, { from: 'MAYA', text: 'always. want to talk?', at: 17.0 }], size: 30, accent: '#2f9a6e', clock: '2:51', typing: [16.5, 17.0] })
  }
  polaroid(x, t, 3.3, 270, 620 + 120, -0.12, 'the beach day', BEACH)
  polaroid(x, t, 4.3, 540, 700, 0.08, 'the inside joke', JOKE)
  polaroid(x, t, 5.3, 400, 900, -0.04, '"forever"', FOREVER)
  sticker(x, t, 'GOOD PARTS ONLY', 540, 1100, 5.9, 7.4, { col: '#ffd98a', size: 36, rot: 0.04 })
  if (t > 17.0) { hearts(x, t, 17.0, 300, 1000, { n: 5 }); sparkles(x, t, 780, 900, 17.0, 10, 150, 1) }
}

const F = makeGlitch({
  id: 'klge13', sign: 'cancer', len: 21, ending: 'loop',
  hook: 'CANCER.EXE: rereading the ex. *2\u00a0A.M.*',
  err: { msg: ['Scrolling: 3 years back.', 'Sleep: postponed.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.5, 9.1]],
  hits: [{ kind: 'whip', at: 0.5, x: 780, y: 900, z: 0.35, hold: 0.5 }, { kind: 'glitch', at: 7.5, dur: 0.45 }, { kind: 'flash', at: FRIEND, col: MINT }],
  caps: [{ at: 3.0, out: 7.3, text: 'the glitch: replaying only the *good* parts' }],
  errs: [{ at: 7.5, out: 9.1, msg: ['NOSTALGIA LOOP.', 'Bad parts: hidden.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.2, out: 11.1, text: 'i’m rereading mine too *sob*', tears: 3 }],
  stars: [{ t: 11.25, text: 'missing them is real. it doesn’t mean *going back.*' }],
  box: { close: 13.9 },
  patch: { at: 13.9, ver: '1.13', name: 'FEEL IT. DON’T REOPEN IT.', dur: 1.0, out: 15.7 },
  last: { at: 18.8, text: 'Missing is not a *map.*' },
  trayCry: t => 2,
  scene, accent: '#8a5a7a',
  cues: [['vinyl', 3.0, 7.4, { gain: 0.012 }], ['pop', 3.3, 523.25, 0.04, -0.3], ['pop', 4.3, 587.33, 0.04, 0], ['pop', 5.3, 659.25, 0.04, 0.3], ['whoosh', FRIEND, 0.3, 0.05], ['pop', 16.2, 880, 0.04, 0.3], ['bell', 17.0, 1318.51, 0.04, 1, 0]],
  music: { style: 'lofi', key: 'Gm', seed: 1813, drop: 3.0, breakdown: [9.2], lift: [FRIEND] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
