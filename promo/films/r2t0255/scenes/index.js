// r2t0255: star_talk, ROLLCALL, "The signs | journaling." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each one's most extreme version of themselves keeping a journal.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ wrote one word: "WON." · ♉ every entry is what they ate · ♊ two journals, they disagree
//              · ♋ wrote about one feeling, filled the book · ♌ journal title: "My Legacy." · ♍ colour-coded tabs, wrote nothing
//              · ♎ still choosing a pen · ♏ a locked diary, and a decoy · ♐ every entry from a different country
//              · ♑ it's a spreadsheet · ♒ writes in a code they invented · ♓ every page tear-stained
//  49.2        group ending: "Dear diary: | *we’re all a lot.*"  the group photo, with the twelve journals stacked up.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const INKB = '#b9a6ff', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a'
const HAND = "'EB Garamond', Georgia, serif"
const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

// an open journal; fn draws on the right page (local coords, page spans 0…170 × -120…120)
function journal(x, cx, cy, k, fn, { rot = 0.03, cover = '#7a4a9e', left } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.1, k * 1.1)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-180, -126, 372, 268)
  x.fillStyle = INK; x.fillRect(-194, -140, 388, 280); x.fillStyle = cover; x.fillRect(-186, -132, 372, 264)
  x.fillStyle = INK; x.fillRect(-176, -122, 352, 244); x.fillStyle = CREAM; x.fillRect(-172, -118, 170, 236); x.fillRect(2, -118, 170, 236)
  x.fillStyle = '#e8dcc6'; for (let i = 0; i < 7; i++) { x.fillRect(-160, -84 + i * 30, 146, 2); x.fillRect(14, -84 + i * 30, 146, 2) }
  x.fillStyle = '#c9b89a'; x.fillRect(-4, -118, 8, 236)
  if (left) { x.save(); x.translate(-172, 0); left(x); x.restore() }
  if (fn) { x.save(); x.translate(2, 0); fn(x); x.restore() }
  x.restore()
}
// a closed book seen from the front
function book(x, cx, cy, k, { cover = '#7a4a9e', title = '', w = 240, h = 320, rot = 0.04, tcol = GOLD, size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = cover; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(0,0,0,0.2)'; x.fillRect(-w / 2, -h / 2, 20, h)
  const lines = title.split('|')
  lines.forEach((l, i) => txt(x, l, 8, -((lines.length - 1) * size * 0.6) + i * size * 1.2, size, tcol, HAND, 600))
  x.restore()
}
function pen(x, cx, cy, rot, col, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-14, -110, 28, 190); x.beginPath(); x.moveTo(-14, 80); x.lineTo(0, 118); x.lineTo(14, 80); x.fill()
  x.fillStyle = col; x.fillRect(-8, -104, 16, 178); x.fillStyle = CREAM; x.beginPath(); x.moveTo(-8, 80); x.lineTo(0, 106); x.lineTo(8, 80); x.fill()
  x.restore()
}
const LOCK = ['.KKKK.', 'K....K', 'K....K', 'KKKKKK', 'KYYYYK', 'KYKKYK', 'KYYYYK', 'KKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Wrote one word: | *“WON.”* Closed it.', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      const shut = ease.inCubic(prog(lt, 1.3, 1.55))
      if (shut < 1) journal(x, 765, 880, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - shut * 0.1), x => { if (lt > 0.6) txt(x, 'WON.', 85, 0, 56, RED, INTER, 900) }, { cover: '#f0603a' })
      else book(x, 790, 880, 1, { cover: '#f0603a', title: 'DONE.', tcol: CREAM })
      label(x, 790, 1130, 'ENTRY: 4 SECONDS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Every entry | is *what they ate.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const rows = ['mon: pasta', 'tue: pasta', 'wed: PASTA', 'thu: bread', 'fri: guess']
      journal(x, 765, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => { rows.forEach((r, i) => { if (lt > 0.4 + i * 0.25) txt(x, r, 14, -90 + i * 44, 24, '#3d3470', HAND, 600, 'left') }) },
        { cover: '#e9b24a', left: x => txt(x, 'Dear diary,', 85, -90, 26, '#3d3470', HAND, 600) })
    } },
  { sign: 'gemini', cap: 'Two journals. | *They disagree.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      book(x, 680, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { cover: '#f2cf4a', title: 'today|was|GREAT', w: 190, h: 260, rot: -0.08, tcol: INK, size: 30 })
      book(x, 890, 880, pop01(t, P.t0 + 0.6, 0.3, 2), { cover: '#3d3470', title: 'today|was|awful', w: 190, h: 260, rot: 0.08, tcol: BONE, size: 30 })
      label(x, 790, 1120, 'BOTH TRUE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Wrote about one feeling. | *Filled the book.*', mood: lt => lt > 1.0 ? 'wide' : 'heart', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const thick = Math.floor(clamp((lt - 0.4) / 1.2) * 9)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < thick; i++) { x.fillStyle = INK; x.fillRect(640, 1060 - i * 34, 300, 30); x.fillStyle = i % 2 ? CREAM : '#f2e8d4'; x.fillRect(646, 1064 - i * 34, 288, 22) }
      book(x, 790, 1060 - thick * 34 - 40, k, { cover: '#3fb6f0', title: 'Feelings, vol. 1', w: 300, h: 90, rot: 0, tcol: CREAM, size: 30 })
      label(x, 790, 1150, 'ONE FEELING. 400 PAGES.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: '#3fb6f0', rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Journal title: | *“My Legacy.”*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      book(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { cover: '#b8641c', title: 'MY|LEGACY', tcol: GOLD, size: 48, w: 260, h: 340 })
      sparkles(x, t, 790, 870, P.t0 + 0.8, 8, 220, 0.3)
      label(x, 790, 1140, 'VOL. 1 OF 30', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Colour-coded tabs. | *Wrote nothing yet.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const cols = [PINK, MINT, GOLD, SKYB, LAV, '#ffb34a', RED, '#5cc46e']
      const n = Math.floor(clamp((lt - 0.3) / 1.0) * 16)
      for (let i = 0; i < n; i++) { const c = cols[i % 8]; x.fillStyle = INK; x.fillRect(898, 700 + i * 22, 44, 18); x.fillStyle = c; x.fillRect(900, 702 + i * 22, 40, 14) }
      book(x, 790, 880, k, { cover: '#ef5c94', title: '', w: 240, h: 360, rot: 0 })
      label(x, 790, 1130, 'PAGES WRITTEN: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still choosing | *a pen.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.sin(lt * 5), 0], star: { x: -220 },
    front(x, t, lt, P) {
      const cols = [PINK, MINT, GOLD, SKYB, LAV, '#e163d6']
      cols.forEach((c, i) => { const k = pop01(t, P.t0 + 0.15 + i * 0.12, 0.3, 2); if (k > 0.01) pen(x, 640 + i * 60, 880 + (i % 2) * 30 - (Math.floor(lt * 3) % 6 === i ? 40 : 0), -0.1 + i * 0.05, c, k) })
      label(x, 790, 640, 'HOUR 2', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: '#e163d6', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A locked diary. | *And a decoy.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      book(x, 690, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { cover: '#3d2a4a', title: '', w: 180, h: 250, rot: -0.06 })
      drawBits(x, LOCK, { K: INK, Y: GOLD }, 760, 880, 10 * pop01(t, P.t0 + 0.4, 0.3, 2))
      book(x, 890, 900, pop01(t, P.t0 + 0.8, 0.3, 2), { cover: PINK, title: 'my|diary :)', w: 180, h: 250, rot: 0.08, tcol: INK, size: 30 })
      label(x, 890, 1100, 'DECOY', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 36, bg: '#e23d66', color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Every entry | from *a different country.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      journal(x, 765, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        const st = [[50, -60, PINK], [120, -20, MINT], [60, 40, GOLD], [130, 80, SKYB]]
        st.forEach(([a, b, c], i) => { if (lt < 0.4 + i * 0.3) return; x.save(); x.translate(a, b); x.rotate(i % 2 ? 0.2 : -0.15); x.fillStyle = INK; x.fillRect(-36, -26, 72, 52); x.fillStyle = c; x.fillRect(-32, -22, 64, 44); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 14, 0, 7); x.stroke(); x.restore() })
      }, { cover: '#a35cf0', left: x => txt(x, 'day 1: here', 85, -60, 22, '#3d3470', HAND, 600) })
      label(x, 790, 1130, 'ADDRESS: UNKNOWN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: '#a35cf0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Their journal? | *It’s a spreadsheet.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = CREAM; x.fillRect(-172, -142, 344, 284)
        x.fillStyle = '#2fc79a'; x.fillRect(-172, -142, 344, 44); txt(x, 'FEELINGS · Q3', 0, -120, 22, INK, MONO, 700)
        const hdr = ['DAY', 'MOOD', 'ROI']
        hdr.forEach((h, i) => txt(x, h, -120 + i * 120, -76, 18, '#3d3470', MONO, 700))
        for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) { x.strokeStyle = '#c9b89a'; x.lineWidth = 2; x.strokeRect(-170 + c * 116, -60 + r * 40, 116, 40); if (lt > 0.4 + r * 0.2) txt(x, c === 0 ? ['MON', 'TUE', 'WED', 'THU', 'FRI'][r] : c === 1 ? ['ok', 'ok', 'fine', 'ok', 'GOOD'][r] : ['+2', '+1', '0', '+3', '+9'][r], -112 + c * 116, -40 + r * 40, 18, INK, MONO, 700) }
        x.restore()
      }
    } },
  { sign: 'aquarius', cap: 'Writes in a code | *they invented.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const glyphs = '◇⊹⟡∆◎⌘⊿⋈✕⊡'
      journal(x, 765, 880, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        for (let r = 0; r < 5; r++) { if (lt < 0.4 + r * 0.2) continue; let s = ''; for (let i = 0; i < 6; i++) s += glyphs[(r * 3 + i * 7) % glyphs.length]; txt(x, s, 85, -80 + r * 40, 24, '#2a6a80', "'Segoe UI Symbol', 'Noto Sans Symbols 2', 'Noto Sans Symbols', serif", 400) }
      }, { cover: '#38c4ec', left: x => { for (let r = 0; r < 5; r++) { let s = ''; for (let i = 0; i < 6; i++) s += glyphs[(r * 5 + i * 3) % glyphs.length]; txt(x, s, 85, -80 + r * 40, 24, '#2a6a80', "'Segoe UI Symbol', 'Noto Sans Symbols 2', 'Noto Sans Symbols', serif", 400) } } })
      label(x, 790, 1130, 'KEY: NOT INCLUDED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: '#38c4ec', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Every page | *tear-stained.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      journal(x, 765, 900, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        txt(x, 'dear diary, a', 14, -80, 22, '#3d3470', HAND, 600, 'left'); txt(x, 'dog waved at me', 14, -44, 22, '#3d3470', HAND, 600, 'left')
        x.fillStyle = 'rgba(80,140,220,0.35)'; for (const [a, b, r] of [[60, 20, 26], [120, 60, 20], [40, 80, 16], [130, -10, 14]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill() }
      }, { cover: '#7c74f0', left: x => { x.fillStyle = 'rgba(80,140,220,0.35)'; for (const [a, b, r] of [[60, -40, 24], [110, 30, 30], [50, 80, 18]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill() } } })
      label(x, 790, 650, 'IT WAS A NICE WAVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: '#7c74f0', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const COVERS = ['#f0603a', '#e9b24a', '#f2cf4a', '#3fb6f0', '#b8641c', '#ef5c94', '#e163d6', '#3d2a4a', '#a35cf0', '#2fc79a', '#38c4ec', '#7c74f0']
const F = makeFilm({
  id: 'r2t0255', key: 'F', accent: INKB, ending: 'group',
  title: 'The signs | *journaling.*',
  cameos: CAMEOS,
  group: {
    cap: 'Dear diary: | *we’re all a lot.*',
    moods: ['sparkle', 'happy', 'wink', 'heart', 'sparkle', 'squint', 'happy', 'squint', 'sparkle', 'neutral', 'wink', 'wide'],
    draw(x, t, lt) {
      // the twelve journals drop onto one wobbly stack
      for (let i = 0; i < 12; i++) {
        const d = ease.outBack(prog(lt, 1.2 + i * 0.1, 1.5 + i * 0.1))
        if (d <= 0) continue
        const y = lerp(300, 820 - i * 26, d), sx = Math.sin(i * 2.1) * 20
        x.fillStyle = INK; x.fillRect(540 + sx - 110, y - 14, 220, 28); x.fillStyle = COVERS[i]; x.fillRect(540 + sx - 104, y - 10, 208, 20)
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
