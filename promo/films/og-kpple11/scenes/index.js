// og-kpple11: social rework of kpple11 (static HOOK box 0–2.9 replaces the slam title; kit copy ../plutokit.js: no bug /
//   shake / whip / scratch freeze / loop; the FEELINGS.EXE glitch is a still dialog (no camera jitter or scan bars);
//   bubbles and the last line moved into the safe zone; crazier lines). Was: kpple11 · Planet Talk: Pluto · "Pluto to Aquarius: Totally Detached" (24 s vertical, loop) · synthwave · Gm
//   0      Pluto mid-beam-down in a purple light column, Aquarius mid-meditation, floating, eyes wide ·
//          "AQUARIUS. | You're *not* fine." · 0.5 lands · 0.9 record scratch "I'm *completely* detached."
//   3.2    a text drops: "saw your ex today btw" · the lamp flickers · 5.0 ♒ "feelings are just *data.*"
//   7.6    another: "they said to say hi" · 8.2 FEELINGS.EXE has stopped responding (glitch)
//   9.8    ♇ "you can't out-think a *feeling.*" · 12.6 "feeling it is how it *leaves.*"
//   15.0   one pixel tear · ♒ "this is purely *scientific.*" · 18.0 Pisces, sobbing louder: "I'll cry *for* both of us"
//   20.6   ♇ "one tear. still *counts.*" · 22.2 "Felt it. | *Purely* scientific." · loops into the frame-0 beam
import { plutoFilm, HK } from '../plutokit.js'

export const HOOK = 'Totally over my ex. | *The lamp disagrees.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.9

const D = 24
const PL = 'pluto', AQ = 'aquarius', PI = 'pisces'
const N1 = { at: 3.2, out: [5.4, 5.7], title: 'GROUP CHAT', body: 'saw your ex today *btw*', glyph: '♊', color: '#7fe3ff', time: 'now', y: 860 }
const N2 = { at: 7.6, out: [9.4, 9.7], title: 'GROUP CHAT', body: 'they said to say *hi*', glyph: '♊', color: '#7fe3ff', time: 'now', y: 860 }
const GL = { at: 8.2, len: 1.3, text: 'FEELINGS.EXE has stopped responding', buttons: ['WAIT', 'FEEL IT'] }
const FLICK = [[3.5, 4.7], [7.9, 9.5]]

const F = plutoFilm({
  id: 'og-kpple11', sign: AQ, dur: D, ending: 'cut', topY: 520,   // og social: no loop
  hook: { text: 'AQUARIUS. | You’re *not* fine.', out: [2.5, 2.75] },   // og social: unused (static HOOK above)
  enter: { kind: 'drop', at: -0.8, len: 1.0, x: 540, y: 700, size: 260 },   // og: nearly landed on frame 0, below the hook
  shots: [{ at: 14.8, z: 1.25, cx: 540, cy: 1240, d: 0.6 }, { at: 17.7, z: 1, cx: 540, cy: 960, d: 0.4 }],
  says: [
    { t0: 5.0, t1: 7.4, who: AQ, text: 'feelings are just *data.* I made a *graph.*', x: 540, y: 1090, tail: 0 },
    { t0: 9.8, t1: 12.4, who: PL, text: "you can't out-think a *feeling.*", x: 540, y: 525, maxW: 820 },
    { t0: 12.6, t1: 14.8, who: PL, text: 'feeling it is how it *leaves.*', x: 540, y: 525, maxW: 820 },
    { t0: 15.2, t1: 17.6, who: AQ, text: 'this tear is for *science.* peer-reviewed.', x: 540, y: 1090, tail: 0 },
    { t0: 18.0, t1: 20.4, who: PI, text: "I'll cry *for* both of us. already *am.*", x: 420, y: 1060, tail: -160 },
    { t0: 20.6, t1: 22.0, who: PL, text: 'one tear. still *counts.*', x: 540, y: 525, maxW: 820 },
  ],
  last: { text: 'Felt it. | *Purely* scientific.', at: 22.2, y: 960 },
  fx: [{ f: HK.notification, c: HK.notificationCues, o: N1 }, { f: HK.notification, c: HK.notificationCues, o: N2 }],   // og social: the glitch is drawn still in over() (no jitter)
  bg(x, t, K) {
    K.room(x, t, { wall: '#1e2a48', wall2: '#0e1428', floor: '#22263a', floorY: 1560, window: true, lamp: false })
    // the beam Pluto rides down
    const bk = 1 - K.prog(t, 1.6, 2.6)
    if (bk > 0) { x.save(); x.globalAlpha = 0.35 * bk; x.globalCompositeOperation = 'lighter'; const g = x.createLinearGradient(380, 0, 700, 0); g.addColorStop(0, 'rgba(160,90,255,0)'); g.addColorStop(0.5, 'rgba(190,130,255,1)'); g.addColorStop(1, 'rgba(160,90,255,0)'); x.fillStyle = g; x.fillRect(380, -100, 320, 1700); x.restore() }
    // the lamp (flickers when the ex comes up)
    const on = FLICK.some(([a, b]) => t > a && t < b) ? (Math.sin(t * 47) > 0.1 ? 1 : 0.15) : 1
    K.rect(x, 900, 1080, 12, 480, '#4a4a5a'); K.box(x, 830, 980, 150, 110, '#f2d28a')
    K.glow(x, 905, 1060, 380, '#ffd68c', 0.35 * on)
    // the mat
    K.box(x, 330, 1540, 420, 30, '#3fae9a')
  },
  paint(x, t, K) {
    K.pluto(x, t, { mood: t < 9.6 ? 'sly' : t > 20.5 ? 'proud' : t > 17.9 ? 'happy' : 'neutral', look: t > 4.9 && t < 9.7 ? [0, 1] : undefined })
    const flick = FLICK.some(([a, b]) => t > a && t < b)
    const float = 30 * Math.sin(t * 1.6)
    K.sign(x, t, AQ, { x: 540, y: 1330 + float, size: 290, shadow: false, mood: t < 2.7 ? 'wide' : flick ? 'wide' : t < 9.7 ? 'sleepy' : t < 15 ? 'neutral' : t < 17.8 ? 'squint' : 'happy', tears: t > 15 && t < 22 ? 1 : 0, squash: flick ? 0.06 * Math.sin(t * 40) : 0, look: flick ? [1, -0.6] : undefined })
    if (t > 17.8) K.pisces(x, t, { x: 200, y: 1400, size: 220, pop: K.pop01(t, 17.8, 0.35), look: [1, -0.2] })
  },
  over(x, t, K) {
    // og social: FEELINGS.EXE as a still error dialog (was HK.glitch: camera jitter + scan bars)
    if (t > GL.at && t < GL.at + GL.len) {
      const k = K.inOut(t, GL.at, GL.at + GL.len, 0.2)
      x.save(); x.translate(540, 1240); x.scale(k, k)   // og: below the group-chat notification
      K.box(x, -400, -130, 800, 260, '#efe6d6', { o: 6 }); K.rect(x, -400, -130, 800, 56, '#3a4a8a')
      K.txt(x, 'ERROR', -370, -102, { size: 26, align: 'left', color: '#fff' })
      K.txt(x, GL.text, 0, -18, { size: 28, color: K.INK, maxW: 740 })
      GL.buttons.forEach((b, i) => { K.box(x, -250 + i * 290, 40, 210, 60, i ? '#ffb0c8' : '#d8d0c0', { o: 4 }); K.txt(x, b, -145 + i * 290, 72, { size: 26, color: K.INK }) })
      x.restore()
    }
  },
  cues: [
    ['pop', GL.at, 220, 0.04, 0],
    ['tick', 3.55, 0.05], ['tick', 3.75, 0.05], ['tick', 4.1, 0.05], ['tick', 7.95, 0.05], ['tick', 8.15, 0.05],
    ['pop', 15.0, 1567.98, 0.035, 0], ['glitter', 18.0, 19.0],
  ],
  music: { style: 'synthwave', key: 'Gm', seed: 11111, sections: { breakdown: [9.8], lift: [15.0] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
