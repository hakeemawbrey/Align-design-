// kdwe20 · Don't Watch This If You're a ___ · "Everything Gemini Hides" (75 s vertical, loop) · pop · C
//   0      Gemini with both faces squashed on the lens; "GEMINI. | Both of you. *Scroll.*" · scratch · whip out
//   1.5    the promise: "Five secrets. | Number five is *sweet,* actually."
//   5      SECRET 1 · TWO VOICES: arguing with itself about texting them (and losing to itself)
//   17     SECRET 2 · FOUR HOBBIES THIS WEEK: yarn, a ukulele, sourdough, juggling
//   29     SECRET 3 · THE NICKNAMES: a secret (kind) nickname for everyone in the chat
//   41     SECRET 4 · THE “SEEN” PANIC: opens the crush's text, sees "Seen", throws the phone onto the couch
//   53     SECRET 5 · IT REMEMBERS: your order, your dog's name, the day of your exam
//          ♎ "you *remembered??*" · Pisces sobbing: "it *REMEMBERED!!*"
//   70.8   "Chaotic. | *Remembers* everything." · 74.55 Gemini lunges back at the lens → frame 0 (loop)
import { dwFilm, tag, HK } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const GA = '♊︎ GEMINI (A)', GB = '♊︎ GEMINI (B)', GE = tag('gemini'), LI = tag('libra'), PI = tag('pisces')
const RW = 1400
const S = [5, 17, 29, 41, 53], LAST = 70.8, THROW = 45.6
const TITLES = ['TWO VOICES', 'FOUR HOBBIES THIS WEEK', 'THE NICKNAMES', 'THE “SEEN” PANIC', 'IT REMEMBERS']
const CH = S.map((at, i) => ({ at: at - 0.1, out: [at + 9.8, at + 10.1], n: i + 1, title: TITLES[i], x: 60, y: 330, color: i === 4 ? '#ff8fb1' : '#ffe27a' }))
const regionAt = t => t < S[1] ? 0 : t < S[2] ? 1 : t < S[3] ? 2 : t < S[4] ? 3 : 4
const cam = (r, z = 1, dx = 0, dy = 0) => [z, r * RW + 540 + dx, 960 + dy]
const HOBBIES = [[17.8, 'MON', 'yarn'], [19.4, 'TUE', 'ukulele'], [21.0, 'WED', 'sourdough'], [22.6, 'THU', 'juggling']]
const NICKS = [['♌ LEO', 'Sunshine Supervisor', 29.8], ['♍ VIRGO', 'Spreadsheet Angel', 30.9], ['♈ ARIES', 'Speed Limit', 32.0], ['♓ PISCES', 'Tiny Waterfall', 33.1], ['♑ CAPRICORN', 'CEO of Naps', 34.2]]
const MEMS = [[56.2, 'oat milk, extra hot', 260, 760], [57.8, 'your dog: Biscuit', 820, 820], [59.4, 'exam on the 14th: good luck!', 540, 640]]
const F = dwFilm({
  id: 'kdwe20', sign: 'gemini', dur: 75, ending: 'loop',
  hook: 'GEMINI.|Both of you. *Scroll.*', hookOut: 1.3, scratch: 'both of you: *busted.*',
  lens: { mood: 'wide', look: [0, 0] }, pull: { x: 540, y: 1250, s: 320 },
  shots: [
    { at: 0, cam: cam(0) }, { at: 11.0, cam: cam(0, 1.25, 0, 180) },
    { at: S[1], cam: cam(1) }, { at: 23.2, cam: cam(1, 1.15, 0, 120) },
    { at: S[2], cam: cam(2) },
    { at: S[3], cam: cam(3) }, { at: THROW, cam: cam(3, 1.1, 120, 120) },
    { at: S[4], cam: cam(4) }, { at: 62.4, cam: cam(4, 1.15, 0, 160) }, { at: 70.4, cam: cam(4) },
  ],
  shakes: [THROW + 0.7],
  heads: [
    { text: 'Five secrets.|Number five is *sweet,* actually.', at: 1.5, out: [4.5, 4.75], top: 470, size: 80 },
    { text: 'Lost an argument.|To *itself.* Twice.', at: 13.2, out: [16.4, 16.7], top: 470, size: 88 },
    { text: 'Four hobbies.|*One* week.', at: 23.6, out: [28.4, 28.7], top: 470 },
    { text: 'Everyone gets one.|All *nice.*', at: 35.4, out: [40.4, 40.7], top: 470, size: 92 },
    { text: '“Seen.”|*Deny everything.*', at: 47.2, out: [52.4, 52.7], top: 470, size: 92 },
    { text: 'Chaotic.|*Remembers* everything.', at: LAST, out: [74.25, 74.5], top: 300, size: 96 },
  ],
  boxes: [
    { open: 5.5, close: 12.8, lines: [{ t: 5.65, speaker: GA, text: 'we should text them.', color: '#ffe27a' }, { t: 7.5, speaker: GB, text: 'we should *not.*', color: '#ffb36b' }, { t: 9.3, speaker: GA, text: 'you’re not even *real.*', color: '#ffe27a' }, { t: 11.1, speaker: GB, text: 'i’m *literally* you.', color: '#ffb36b' }] },
    { open: 42.0, close: 45.2, lines: [{ t: 42.15, speaker: GE, text: 'okay. just *open* it. casually.', color: '#ffe27a' }] },
    { open: 61.8, close: 70.2, lines: [{ t: 61.95, speaker: LI, text: 'wait. you *remembered??*', color: '#ffc6e0' }, { t: 64.2, speaker: PI, text: 'it *REMEMBERED!!*', color: '#9fd7ff' }, { t: 66.6, speaker: GE, text: 'i remember *everything* about you.', color: '#ffe27a' }] },
  ],
  pitch: { [GA]: 783.99, [GB]: 659.25, [GE]: 783.99, [LI]: 698.46, [PI]: 1046.5 },
  fx: CH.map(o => ({ f: HK.chapter, c: HK.chapterCues, o })),
  paint(x, t, K) {
    const r = regionAt(t)
    x.save(); x.translate(r * RW, 0)
    const ge = o => { if (!K.hide) K.star(x, t, 'gemini', { s: 320, seed: 7, ...o }) }
    if (r === 0) {
      K.room(x, t, { wall: '#3a3050', wall2: '#1e1834', floor: '#2e2840', window: true, frame: '#ffe27a' })
      K.box(x, 120, 1340, 840, 30, '#7a6a9a')
      const side = t < 5.65 ? 0 : [5.65, 7.5, 9.3, 11.1].filter(a => t >= a).length % 2 ? -1 : 1
      const flip = t > 5.6 ? ease.outBack(prog(t, [5.65, 7.5, 9.3, 11.1].filter(a => t >= a).pop() ?? 0, ([5.65, 7.5, 9.3, 11.1].filter(a => t >= a).pop() ?? 0) + 0.25)) : 1
      ge({ x: 540 + side * 160 * flip, y: 1250, mood: t < 5 ? 'happy' : side < 0 ? 'sparkle' : 'squint', look: [side ? -side : 0, 0], rot: side * 0.08 })
      if (t > 5.6) K.label(x, side < 0 ? 'A' : 'B', 540 + side * 160, 1000, { size: 40, bg: side < 0 ? '#ffe27a' : '#ffb36b' })
    } else if (r === 1) {
      K.room(x, t, { wall: '#30284a', wall2: '#18142a', floor: '#2a2440', window: true })
      HOBBIES.forEach(([at, day, what], i) => {
        const k = K.pop01(t, at, 0.35); if (k <= 0) return
        const X = 180 + i * 240, Y = 820
        x.save(); x.translate(X, Y); x.scale(k, k)
        if (what === 'yarn') { x.fillStyle = '#140c28'; x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ef5c94'; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#ff9ac0'; x.lineWidth = 6; for (let a = 0; a < 4; a++) { x.beginPath(); x.arc(0, 0, 40 - a * 8, a, a + 2.4); x.stroke() } }
        else if (what === 'ukulele') { x.save(); x.rotate(-0.5); K.box(x, -10, -120, 20, 120, '#8a5a3a', { o: 4 }); x.fillStyle = '#140c28'; x.beginPath(); x.ellipse(0, 30, 54, 64, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c99a5a'; x.beginPath(); x.ellipse(0, 30, 46, 56, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a3a2a'; x.beginPath(); x.arc(0, 30, 16, 0, Math.PI * 2); x.fill(); x.restore() }
        else if (what === 'sourdough') { K.box(x, -50, -60, 100, 120, '#cfe9f0'); K.rect(x, -46, -10, 92, 66, '#efe0c0'); K.rect(x, -56, -70, 112, 16, '#8a6a4a'); for (let b = 0; b < 4; b++) K.rect(x, -30 + b * 18, 10 + (b % 2) * 14, 8, 8, '#d9c8a0') }
        else { for (let b = 0; b < 3; b++) { const ph = t * 4 + b * 2.1; x.fillStyle = ['#ff3b4e', '#7fd0f0', '#f2c75c'][b]; x.beginPath(); x.arc(Math.sin(ph) * 50, -Math.abs(Math.cos(ph)) * 80 + 20, 20, 0, Math.PI * 2); x.fill() } }
        x.restore()
        K.label(x, `${day} · ${what}`, X, 960, { size: 20, pop: k })
      })
      ge({ x: 540, y: 1250, mood: t < 22.6 ? 'sparkle' : 'wide', look: [Math.sin(t * 1.3), -0.6] })
      if (t > 23.2) for (let b = 0; b < 3; b++) { const ph = t * 5 + b * 2.1; x.fillStyle = ['#ff3b4e', '#7fd0f0', '#f2c75c'][b]; x.beginPath(); x.arc(540 + Math.sin(ph) * 120, 1020 - Math.abs(Math.cos(ph)) * 140, 22, 0, Math.PI * 2); x.fill() }
    } else if (r === 2) {
      K.room(x, t, { wall: '#3a3050', wall2: '#1e1834', floor: '#2e2840', window: true })
      ge({ x: 260, y: 1300, s: 260, mood: t < 35 ? 'wink' : 'happy', look: [1, -1] })
    } else if (r === 3) {
      K.room(x, t, { wall: '#30284a', wall2: '#18142a', floor: '#2a2440', window: true })
      K.box(x, 520, 1220, 480, 140, '#6a4a8a'); K.box(x, 520, 1140, 70, 220, '#6a4a8a'); K.box(x, 930, 1140, 70, 220, '#6a4a8a')
      // the phone flies onto the couch, Gemini dives under a cushion
      if (t > THROW) {
        const p = prog(t, THROW, THROW + 0.7), X = lerp(420, 780, p), Y = lerp(1120, 1190, p) - Math.sin(p * Math.PI) * 360
        x.save(); x.translate(X, Y); x.rotate(p * 9); K.box(x, -30, -55, 60, 110, '#1a1236', { o: 3 }); K.rect(x, -24, -48, 48, 96, '#ff8fb1'); x.restore()
      }
      const hide = ease.outCubic(prog(t, THROW + 0.9, THROW + 1.4))
      ge({ x: lerp(330, 640, hide), y: lerp(1250, 1180, hide), mood: t < 44.6 ? 'neutral' : t < THROW + 0.9 ? 'wide' : 'squint', look: [1, -0.5], squash: hide * 0.25, rot: hide * 0.2 })
      if (hide > 0) { x.save(); x.translate(660, 1130 - hide * 10); x.rotate(-0.1); K.box(x, -110, -40, 220, 80, '#ffb3c6'); x.restore() }
    } else {
      K.room(x, t, { wall: '#3a2440', wall2: '#1e1226', floor: '#2e2030', window: true, warm: 0.5 })
      K.box(x, 380, 1220, 320, 30, '#c9a07a'); K.rect(x, 526, 1250, 26, 520, '#6a4a3a')
      K.box(x, 420, 1160, 60, 60, '#efe6d6', { o: 3 }); K.box(x, 600, 1160, 60, 60, '#efe6d6', { o: 3 })
      K.star(x, t, 'libra', { x: 840, y: 1180, s: 280, mood: t < 61.8 ? 'happy' : t < 64 ? 'wide' : 'heart', look: [-1, 0], seed: 5 })
      if (t > 63.8) K.pisces(x, t, { x: 560, y: 900, s: 230, pop: K.pop01(t, 63.8, 0.4), look: [0, 1], tears: 3 })
      ge({ x: 260, y: 1190, s: 290, mood: t < 56 ? 'happy' : t < 61.8 ? 'sparkle' : 'happy', look: [1, 0] })
      if (t > 66.6) for (let i = 0; i < 5; i++) { const p = (t * 0.6 + i / 5) % 1; K.txt(x, '♡', 340 + i * 90, 1040 - p * 260, { size: 44, color: `rgba(255,143,177,${1 - p})` }) }
    }
    x.restore()
  },
  over(x, t, K) {
    // SECRET 3: the contacts with nicknames
    const k3 = K.inOut(t, S[2] + 0.4, 40.6)
    if (k3 > 0.01) K.phone(x, t, {
      X: 640, Y: 1060, w: 520, h: 740, pop: k3, rot: 0.03, title: 'CONTACTS (edited)', time: '4:20',
      screen: (c, tt, w, h) => NICKS.forEach(([who, nick, at], i) => {
        const p = K.pop01(tt, at, 0.3); if (p <= 0) return
        c.save(); c.translate(0, -h / 2 + 210 + i * 100); c.scale(p, p)
        K.rrect(c, -w / 2 + 24, -40, w - 48, 80, 16, '#2c2450')
        K.txt(c, who, -w / 2 + 44, -14, { size: 18, align: 'left', color: '#bdb3d8' }); K.txt(c, nick, -w / 2 + 44, 14, { size: 26, align: 'left', color: '#ffe27a' })
        c.restore()
      }),
    })
    // SECRET 4: the crush's text, then "Seen"
    const k4 = K.inOut(t, S[3] + 0.4, THROW - 0.05)
    if (k4 > 0.01) K.phone(x, t, {
      X: 560, Y: 1000, w: 460, h: 700, pop: k4, rot: -0.04, title: 'CRUSH ♡', time: '11:42',
      bubbles: [{ side: 'L', text: 'hey! what are you up to this weekend?', at: 41.6 }, ...(t > 44.4 ? [{ side: 'C', text: 'Seen 11:42', color: 'rgba(0,0,0,0)', ink: '#ff3b4e', size: 24, at: 44.4 }] : [])], size: 28,
    })
    // SECRET 5: the memories
    for (const [at, s, X, Y] of MEMS) {
      const p = K.inOut(t, at, 61.6)
      if (p <= 0.01) continue
      x.save(); x.translate(X, Y + Math.sin(t * 2 + X) * 8); x.scale(p, p)
      x.font = `700 28px ${K.MONO}`; const w = x.measureText(s).width + 60
      K.rrect(x, -w / 2, -42, w, 84, 42, '#efe6d6'); K.txt(x, s, 0, 0, { size: 28, color: '#1a1236' })
      x.fillStyle = '#efe6d6'; x.beginPath(); x.arc(-w / 2 + 30, 60, 12, 0, Math.PI * 2); x.arc(-w / 2 + 14, 84, 7, 0, Math.PI * 2); x.fill()
      x.restore()
    }
  },
  cues: [
    ...[5.65, 7.5, 9.3, 11.1].map((t, i) => ['whoosh', t - 0.05, 0.2, 0.04]),
    ...HOBBIES.map(([at], i) => ['pop', at, 659.25 + i * 110, 0.045, i / 2 - 0.75]), ['glitter', 23.2, 24.4],
    ...NICKS.map(([_, __, at], i) => ['pop', at, 880 + i * 60, 0.035, 0.2]),
    ['pop', 41.62, 987.77, 0.04, 0], ['tick', 44.4, 0.08], ['pop', 44.42, 1567.98, 0.04, 0],
    ['whoosh', THROW, 0.7, 0.08], ['boom', THROW + 0.7, 0.08], ['whoosh', THROW + 0.9, 0.4, 0.04],
    ...MEMS.map(([at]) => ['bell', at, 1174.66, 0.035, 1.2, 0]), ['glitter', 63.8, 65.4], ['bell', 66.7, 1567.98, 0.04, 2, 0],
  ],
  music: { style: 'pop', key: 'C', seed: 4120, sections: { drop: 1.42, breakdown: [S[2], S[4]], lift: [S[3], 61.8] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
