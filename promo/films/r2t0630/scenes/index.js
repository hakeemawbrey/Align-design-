// r2t0630: star_talk, BE LIKE, "Thank-you notes? | Zodiacs *be like.*" (batch topic "Zodiacs writing a thank-you note,
// be like", phrased to fit two lines) (signs3kit social cut, music: lofi · F). Ending: group.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one thank-you note per sign (3.8 s each):
//              ♈ "thx." done · ♉ thanks for the cake, is there more? · ♊ sent it in six texts · ♋ a thank-you note
//              for the thank-you note · ♌ signed it with an autograph · ♍ included feedback on the gift
//              · ♎ envelope, pen, stamp: all matching · ♏ wrote three pages, sent one word · ♐ three months late,
//              from a mountain · ♑ on company letterhead · ♒ wrote it in their own alphabet · ♓ cried on it, ink everywhere
//  49.2        "Grandma got | *twelve weird notes.*" (the ending: a pile of notes lands)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }

/** a note card with a hand-drawn squiggle "signature" */
function scrawl(x, cx, cy, w, p, col = INK, lw = 7) {
  x.save(); x.strokeStyle = col; x.lineWidth = lw; x.lineCap = 'round'; x.beginPath()
  const n = Math.floor(40 * clamp(p))
  for (let i = 0; i <= n; i++) { const u = i / 40; const px = cx - w / 2 + u * w, py = cy + Math.sin(u * 22) * 22 * (1 - u * 0.4) - u * 10; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Wrote “thx.” | *Done.* Next.', mood: lt => lt > 0.8 ? 'sparkle' : 'squint', star: ST, hops: [0.7],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 220, head: 'THANK YOU', headBg: '#ff8a5a', lines: [lt > 0.5 ? 'thx.' : ''], size: 60 })
      L(x, 800, 1080, 'TIME: 0.4 SEC', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: 'taurus', cap: 'Thanks for the cake. | Is there *more?*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 270, head: 'DEAR AUNTIE', headBg: '#5fd068', headInk: INK, lines: ['loved the cake.', 'truly. deeply.', ['…any more?', RED]], size: 30, progress: clamp((lt - 0.3) / 1.4) })
      bits(x, 'FORK', 920, 1080, 14 * pop01(t, P.t0 + 1.5, 0.3, 2.2), { rot: 0.3 })
    } },
  { sign: 'gemini', cap: 'Sent the thank-you | in *six texts.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['thank', 'you', 'SO', 'much', 'omg', 'also hi']
      const n = Math.floor(clamp((lt - 0.2) / 1.6) * 6)
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'GRANDMA ♡', headCol: GOLD, lines: W.slice(Math.max(0, n - 4), n).map((w, i) => [w, GOLD, 1, true]), size: 22 })
    } },
  { sign: 'cancer', cap: 'A thank-you note | *for the thank-you note.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 760, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 260, h: 200, head: 'THANK YOU', headBg: SKYB, headInk: INK, lines: ['for the note'], size: 28, rot: -0.08 })
      sheet(x, 840, 940, pop01(t, P.t0 + 0.9, 0.3, 2), { w: 260, h: 200, head: 'THANK YOU', headBg: PINK, headInk: INK, lines: ['for thanking me'], size: 26, rot: 0.06 })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Signed it | with *an autograph.*', mood: 'sparkle', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'YOU’RE WELCOME', headBg: '#ffb34a', headInk: INK, lines: ['thanks, darling.'], size: 30 })
      scrawl(x, 800, 930, 230, prog(lt, 0.6, 1.4), '#c98f2a', 8)
      sparkles(x, t, 800, 900, P.t0 + 1.4, 7, 170, 0.3)
      L(x, 800, 1110, 'FRAME IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  { sign: 'virgo', cap: 'Thank you! | Also: *feedback.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 330, head: 'THANK YOU!', headBg: '#5fd068', headInk: INK, lines: ['love the scarf!', 'notes:', '1) tape: visible', '2) bow: lopsided'], size: 28, progress: clamp((lt - 0.4) / 1.4) })
      bits(x, 'PEN', 900, 1060, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.3 })
    } },
  { sign: 'libra', cap: 'Pen, stamp, envelope: | *all matching.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 880); x.scale(k, k); x.rotate(0.05); x.fillStyle = INK; x.fillRect(-160, -100, 320, 200); x.fillStyle = PINK; x.fillRect(-152, -92, 304, 184); x.fillStyle = '#ffb3cc'; x.beginPath(); x.moveTo(-152, -92); x.lineTo(0, 10); x.lineTo(152, -92); x.closePath(); x.fill(); x.restore() }
      bits(x, 'PEN', 700, 1060, 12 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.2 })
      L(x, 800, 660, 'ALL: ROSE PINK', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 36)
      sparkles(x, t, 800, 880, P.t0 + 1.3, 6, 170, 0.4)
    } },
  { sign: 'scorpio', cap: 'Wrote three pages. | Sent *one word.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sent = lt > 1.2
      if (!sent) for (let i = 0; i < 3; i++) bits(x, 'PAPERS', 800 + i * 14, 900 - i * 40, 16 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { rot: -0.05 + i * 0.04 })
      else sheet(x, 800, 880, pop01(t, P.t0 + 1.2, 0.3, 2), { w: 280, h: 180, lines: ['thanks.'], size: 54, bg: CREAM })
      L(x, 800, 660, sent ? 'SENT: 1 WORD' : 'DRAFT: 3 PAGES', 1, '#b04ad0', 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Three months late. | *From a mountain.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 860); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.moveTo(-170, 110); x.lineTo(-30, -130); x.lineTo(40, -20); x.lineTo(90, -80); x.lineTo(190, 110); x.closePath(); x.fill(); x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(-156, 102); x.lineTo(-30, -114); x.lineTo(40, -6); x.lineTo(90, -66); x.lineTo(176, 102); x.closePath(); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-58, -66); x.lineTo(-30, -114); x.lineTo(-2, -66); x.closePath(); x.fill(); x.restore() }
      L(x, 800, 1090, 'P.S. SORRY! VIEW’S GREAT', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#ff9a4a', -0.04, 26)
    } },
  { sign: 'capricorn', cap: 'Sent it on | *company letterhead.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 330, head: 'CAPRICORN LLC', headBg: STEEL, headInk: INK, lines: ['Re: the socks', 'Gratitude: noted.', 'Regards,', ['C. (CEO)', '#2f8a48']], size: 28, progress: clamp((lt - 0.4) / 1.3) })
    } },
  { sign: 'aquarius', cap: 'Wrote it | in *their own alphabet.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 260, head: 'THANK YOU', headBg: '#3a8ad0', lines: ['⊹ ⟡ ⌖ ⋔ ⟐', '⌬ ⊶ ⋇ ✧'], size: 40, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'TRANSLATION: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried on it. | *Ink everywhere.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 260, head: 'THANK YOU', headBg: SKYB, headInk: INK, lines: ['you’re so', 'kind i'], size: 34 })
      const b = clamp((lt - 0.8) / 1.0)
      x.save(); x.fillStyle = '#3a6ad0'; x.globalAlpha = 0.6
      for (let i = 0; i < 5; i++) if (b > i / 5) { x.beginPath(); x.arc(720 + (i * 53) % 170, 860 + (i * 37) % 90, 22 + i * 4, 0, Math.PI * 2); x.fill() }
      x.restore()
      L(x, 800, 1090, 'SMUDGED WITH LOVE', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0630', key: 'F', accent: ACC, ending: 'group',
  title: 'Thank-you notes? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Grandma got | *twelve weird notes.*',
    draw(x, t, lt) {
      for (let i = 0; i < 6; i++) sheet(x, 240 + i * 120, 680 - (i % 2) * 30, pop01(t, t - lt + 1.6 + i * 0.12, 0.3, 2), { w: 150, h: 100, head: '♡', headBg: [PINK, GOLD, SKYB, MINT, LAV, '#ff9a4a'][i], headInk: INK, lines: [], rot: (i - 2.5) * 0.08 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
