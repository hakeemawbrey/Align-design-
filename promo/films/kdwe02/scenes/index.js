// kdwe02 · Don't Watch This If You're a ___ · "Virgo's Off-Camera Room" (15 s vertical, hard cut) · lofi · D
//   0      Virgo pressed to the lens, a label maker mid-click; "VIRGO. | Look *away.* Please." · scratch + freeze · whip out
//   1.5    the spotless corner: a desk, a plant, labelled jars · "First-date Virgo." · 2.6 the label maker prints PLANT
//   4.6    whip pan right: the rest of the room. A clothes mountain, cups, a sock on the lamp · "Tuesday Virgo."
//   5.4    CAUGHT: the sock (hook kit) · 6.0 Virgo slides into frame, eyes wide
//   7.9    ♍ "it's not a mess. it's a *system.*" · 10.6 Pisces pops out of the clothes mountain sobbing: "it's so *human!!*"
//   12.7   whip back to the spotless corner, Virgo posing · 13.0 "Spotless. | *From this angle.*" · hard cut at 15
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const VI = tag('virgo'), PI = tag('pisces')
const PAN = 4.6, BACK = 12.7
const JARS = [['TEA', '#9fd8a8'], ['PENS', '#f2c75c'], ['CALM', '#c9a6ff']]
const CLOTHES = ['#e8628a', '#7fd0f0', '#f2c75c', '#9a7be0', '#2fc79a', '#f29a4a', '#efe6d6', '#5a78b4', '#ff8fb1']
const F = dwFilm({
  id: 'kdwe02', sign: 'virgo', dur: 15, ending: 'cut',
  hook: 'VIRGO.|Look *away.* Please.', hookOut: 1.3, scratch: 'too late. *we saw.*',
  lens: { mood: 'wide', look: [0, 0] }, pull: { x: 360, y: 1250, s: 340 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: PAN, cam: [1, 1640, 960] },
    { at: 10.4, cam: [1.2, 1640, 1100] },
    { at: BACK, cam: [1, 540, 960] },
  ],
  heads: [
    { text: 'First-date *Virgo.*', at: 1.5, out: [4.3, 4.55], top: 240 },
    { text: '*Tuesday* Virgo.', at: 4.8, out: [7.5, 7.75], top: 240 },
    { text: 'Spotless.|*From this angle.*', at: 13.0, top: 250 },
  ],
  boxes: [
    { open: 7.8, close: 10.3, lines: [{ t: 7.95, speaker: VI, text: "it's not a mess. it's a *system.*", color: '#9fe6b0' }] },
    { open: 10.7, close: 12.55, lines: [{ t: 10.85, speaker: PI, text: "it's so *human!!*", color: '#9fd7ff' }] },
  ],
  pitch: { [VI]: 659.25, [PI]: 1046.5 },
  fx: [{ f: HK.caught, c: HK.caughtCues, o: { at: 5.4, x: 380, y: 700, r: 110, out: [7.4, 7.7], label: 'THE SOCK', arrow: 'br', rec: false } }],
  paint(x, t, K) {
    K.room(x, t, { wall: '#24304a', wall2: '#141a30', floor: '#2f2a3e', window: false, frame: '#9fd8a8' })
    // ── the spotless corner (x 0…1080)
    K.box(x, 80, 1300, 760, 36, '#d9cbb0'); K.rect(x, 120, 1336, 26, 440, '#8a7a60'); K.rect(x, 780, 1336, 26, 440, '#8a7a60')
    JARS.forEach(([l, c], i) => { K.box(x, 470 + i * 120, 1200, 90, 100, c); K.label(x, l, 515 + i * 120, 1250, { size: 18, pad: 8 }) })
    K.box(x, 700, 1150, 90, 150, '#c96a3a'); for (let i = 0; i < 5; i++) { x.save(); x.translate(745, 1150); x.rotate(-0.9 + i * 0.45 + 0.05 * Math.sin(t * 2 + i)); K.box(x, -14, -150, 28, 140, '#3fae6a', { o: 3 }); x.restore() }
    K.label(x, 'PLANT', 745, 1230, { size: 20, pad: 8, pop: K.pop01(t, 2.6, 0.3) })
    K.rect(x, 880, 300, 6, 900, 'rgba(255,255,255,0.05)')
    // ── the rest of the room (x 1100…2200)
    x.save(); x.beginPath(); x.rect(1090, -800, 2000, 3000); x.clip()
    K.room(x, t, { wall: '#3a2a40', wall2: '#201628', floor: '#3a2a30', window: false, lamp: false })
    // the lamp with a sock on it
    K.rect(x, 1460, 820, 14, 520, '#4a3a4a'); K.box(x, 1380, 740, 180, 110, '#f2d28a')
    x.save(); x.translate(1470, 740); x.rotate(0.2 + 0.05 * Math.sin(t * 3)); K.box(x, -30, -40, 60, 50, '#ff8fb1', { o: 3 }); K.box(x, 10, -40, 50, 26, '#ff8fb1', { o: 3 }); x.restore()
    // the clothes mountain
    for (let i = 0; i < 26; i++) { const c = CLOTHES[i % CLOTHES.length], cx = 1620 + ((i * 97) % 420) - 160 + 30 * Math.sin(i), cy = 1330 - Math.floor(i / 5) * 70 - ((i * 37) % 40); x.save(); x.translate(cx, cy); x.rotate(((i * 53) % 10 - 5) * 0.06); K.box(x, -80, -36, 160, 72, c, { o: 4 }); x.restore() }
    // cups everywhere
    for (const [cx, cy] of [[1250, 1340], [1300, 1360], [1980, 1350], [2050, 1330], [1900, 1000]]) { K.box(x, cx - 22, cy - 50, 44, 50, '#efe6d6', { o: 3 }); K.rect(x, cx - 14, cy - 44, 28, 8, '#7a4a2a') }
    x.restore()
    // Pisces, sobbing out of the clothes mountain
    if (t > 10.5 && t < BACK) K.pisces(x, t, { x: 1720, y: 1060, s: 280, pop: K.pop01(t, 10.55, 0.4), mood: 'wide', look: [-1, 0], tears: 3 })
    // Virgo
    if (!K.hide) {
      if (t < PAN) K.star(x, t, 'virgo', { x: 360, y: 1250, s: 340, mood: t < 2.6 ? 'wide' : 'happy', look: [1, -0.3], seed: 5 })
      else if (t < BACK) { const sl = ease.outBack(prog(t, 6.0, 6.45)); K.star(x, t, 'virgo', { x: lerp(1060, 1330, sl), y: 1260, s: 320, mood: t < 7.9 ? 'wide' : t < 10.5 ? 'squint' : 'eyeroll', look: [1, 0], seed: 5, rot: (1 - sl) * 0.3 }) }
      else K.star(x, t, 'virgo', { x: 360, y: 1250, s: 340, mood: 'sparkle', look: [0, 0], seed: 5 })
    }
  },
  over(x, t, K) {
    // the label maker click at 2.6: a tiny ticket flies out
    const p = prog(t, 2.45, 2.75)
    if (p > 0 && p < 1) K.label(x, '✓', 470 + p * 200, 1150 - Math.sin(p * Math.PI) * 120, { size: 26, bg: '#9fe6b0' })
  },
  cues: [
    ['pop', 2.5, 1318.51, 0.04, -0.2], ['tick', 2.55, 0.05], ['tick', 2.62, 0.04],
    ['pop', 6.05, 523.25, 0.04, 0], ['whoosh', 6.0, 0.3, 0.04],
    ['pop', 10.58, 783.99, 0.05, 0.3], ['glitter', 10.6, 11.8],
  ],
  music: { style: 'lofi', key: 'D', seed: 4102, sections: { drop: 1.42, lift: [PAN] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
