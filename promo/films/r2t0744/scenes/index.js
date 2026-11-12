// r2t0744: THE SIGNS AS… v3, SOLO film (capricorn), "Capricorns making plans | *be like.*" (~51 s vertical, signs3kit
// social cut, music: lofi · D). One sign the whole way: nine plans, each the most extreme Capricorn version. Ending: lesson.
//   casual brunch, RSVP by Monday · beach day, checked the tide twice · birthday dinner, booked next year's too
//   · plan B? they're on plan F · free time, scheduled for Tuesday · group trip, everyone got a role · weekend away,
//   packed in March · picnic rained out, rain plan activated · a wedding in two years, gift wrapped
//   group "Plans the fun. | *Then has it.*"   LESSON "Their plans are | *how they care.*"   last "Let them plan. | *You bring the snacks.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, rain, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'capricorn', ST = { x: -190 }
const FOLDER = ['KKKK......', 'KYYYKKKKKK', 'KYYYYYYYYK', 'KYYYYYYYYK', 'KYYYYYYYYK', 'KYYYYYYYYK', 'KKKKKKKKKK']

/** a little tide chart: a wave line with a dot that runs along it */
function tide(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(0.03)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 312, 208)
  x.fillStyle = INK; x.fillRect(-164, -110, 328, 220)
  x.fillStyle = '#e8f6ff'; x.fillRect(-156, -102, 312, 204)
  x.strokeStyle = '#3a7ac8'; x.lineWidth = 8; x.beginPath()
  for (let i = 0; i <= 40; i++) { const u = i / 40, xx = -130 + u * 260, yy = Math.sin(u * Math.PI * 2.5) * 50; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke()
  const u = clamp(lt / 1.8); x.fillStyle = RED; x.fillRect(-130 + u * 260 - 10, Math.sin(u * Math.PI * 2.5) * 50 - 10, 20, 20)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Casual brunch? | *RSVP by Monday.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'YOU’RE INVITED', headBg: '#2f8a48', lines: ['casual brunch', 'sat · 10:00', ['RSVP BY MON', RED], '☐ yes  ☐ yes'], size: 30, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'DRESS CODE: RELAXED (SEE p.2)', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 22)
    } },
  { sign: S, cap: 'Beach day? | *Checked the tide. Twice.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      tide(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 690, 'HIGH TIDE: 2:14 PM', pop01(t, P.t0 + 0.5, 0.3, 2.2), '#6fc3ff', -0.04, 30)
      L(x, 800, 1060, 'TOWEL: PLACED 2:15', pop01(t, P.t0 + 1.5, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Birthday dinner? | *Booked next year’s too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST,
    front(x, t, lt, P) {
      L(x, 800, 720, 'TABLE FOR 6 · THIS YEAR ✓', pop01(t, P.t0 + 0.3, 0.3, 2), CREAM, -0.04, 26)
      L(x, 800, 860, 'TABLE FOR 6 · NEXT YEAR ✓', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.03, 26)
      L(x, 800, 1000, 'THE YEAR AFTER: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, -0.03, 26)
    } },
  { sign: S, cap: 'Plan B? | *They’re on plan F.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (const [i, ch] of ['B', 'C', 'D', 'E', 'F'].entries()) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2.2)
        drawBits(x, FOLDER, { K: INK, Y: ['#ffd23a', '#ffb34a', '#ff8fb1', '#8fe3ff', '#7dffb0'][i] }, 690 + (i % 3) * 110, 790 + Math.floor(i / 3) * 170, 14 * k)
        if (k > 0.5) { x.fillStyle = INK; x.font = "800 44px Inter, Arial"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(ch, 690 + (i % 3) * 110, 800 + Math.floor(i / 3) * 170) }
      }
      L(x, 800, 1110, 'PLAN A: STILL ON', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Free time? | *Scheduled for Tuesday.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 340, head: 'TUESDAY', headBg: RED, lines: ['2:00 meeting', '2:30 meeting', ['3:00 HAVE FUN', '#2f8a48'], '3:05 meeting'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'FUN: 5 MINUTES', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Group trip? | *Everyone got a role.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      for (const [i, [id, role, c]] of [['gemini', 'MAPS', '#ffd23a'], ['taurus', 'SNACKS', '#5fd068'], ['leo', 'PHOTOS', '#ffb34a']].entries()) {
        const fx = 620 + i * 140, k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.35, 2)
        friend(x, t, id, fx, 960 - (i % 2) * 40, 130, k, { mood: 'happy', look: [-1, 0] })
        L(x, fx, 800 - (i % 2) * 40, role, pop01(t, P.t0 + 0.8 + i * 0.3, 0.3, 2.2), c, (i - 1) * 0.06, 24)
      }
      L(x, 760, 1120, 'CAPRICORN: EVERYTHING ELSE', pop01(t, P.t0 + 1.9, 0.3, 2.2), MINT, 0.03, 24)
    } },
  { sign: S, cap: 'Weekend away in June? | *Packed in March.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST,
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'PACKED: MARCH 2', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1090, 'TRIP: JUNE 14', pop01(t, P.t0 + 1.4, 0.3, 2.2), '#6fc3ff', 0.04, 32)
    } },
  { sign: S, cap: 'Picnic rained out? | *Rain plan: activated.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'CLOUD', 800, 640, 16 * pop01(t, P.t0 + 0.1, 0.3, 2))
      rain(x, t, 800, 680, { w: 300, h: 360, n: 11 })
      const d = ease.outCubic(clamp((lt - 0.8) / 0.4))
      if (lt > 0.8) bits(x, 'UMB', F.x, lerp(560, F.top - 70, d), 14)
      L(x, 800, 1060, 'INDOOR BLANKET: READY', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Wedding in two years? | *Gift: wrapped.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 880, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 680, 'ENGAGED: YESTERDAY', pop01(t, P.t0 + 0.2, 0.3, 2), PINK, -0.04, 30)
      L(x, 800, 1090, 'CARD: ALSO SIGNED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
      sparkles(x, t, 800, 880, P.t0 + 1.0, 7, 170, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0744', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Capricorns | making plans | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Plans the fun. | *Then has it.*', mood: 'sparkle' },
  lesson: { text: 'Their plans are | *how they care.*', chip: 'STATUS: TAKEN CARE OF' },
  last: { text: 'Let them plan. | *Bring snacks.*' },
})

// the long hook: shrink the title so it fits the width and stays above the stage card's name tab
function fitTitleScenes(SCENES, maxW = 940, maxH = 268) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const prev = tb.style.display; tb.style.display = 'block'
      const scale = k => { tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'; for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px' }
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) scale((maxW - 8) / widest)
      for (let i = 0; i < 8 && tb.offsetHeight > maxH; i++) scale(0.94)
      tb.style.display = prev
    }
    return r
  }]
}
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
