// r2t0647: star_talk, BELIKE, "Zodiacs choosing | an outfit *be like.*" (~54 s vertical, signs3kit social cut, music: lofi · E).
// Ending: group.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one outfit decision per sign (3.8 s each):
//              ♈ wore the first thing: pajamas · ♉ same sweater, year four · ♊ two outfits, wore both · ♋ comfiest one,
//              never left the house · ♌ asked for opinions, only wanted "wow" · ♍ ironed the socks, twice
//              · ♎ three hours, still in a towel · ♏ all black, obviously · ♐ hiking boots to a wedding
//              · ♑ outfits planned through next year · ♒ wore a cape to the grocery store · ♓ couldn't pick, cried in the closet
//  49.2        GROUP (the ending): "Everyone’s ready. | *Except Libra.*"  Group photo, Libra's HOUR 4 sticker.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff'
const R = { x: -170 }
const SWEATER = ['..SS..SS..', '.SSSSSSSS.', 'SSSWSSWSSS', 'SSSSSSSSSS', 'SS.SSSS.SS', 'SS.SWWS.SS', 'SS.SSSS.SS', '...SSSS...', '...SSSS...']
const SOCK = ['.WWW.', '.WWW.', '.SSS.', '.SSS.', '.SSS.', '.SSSS', 'SSSSS', 'SSSSS', 'WWWW.']
const BOOT = ['.BBBB.....', '.BBBB.....', '.BBBB.....', '.BBBBB....', '.BBBBBBBB.', 'BBBBBBBBBB', 'KKKKKKKKKK']
const CAPE = ['..YY..YY..', '..RRRRRR..', '.RRRRRRRR.', '.RRRRRRRR.', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RR.RRRR.RR']

const CAMEOS = [
  { sign: 'aries', cap: 'Wore the first thing. | It was *pajamas.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: R, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: '#8fd8ff', W: CREAM }, 790, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      L(x, 790, 1060, 'PICKED IN 0.2 SEC', pop01(t, P.t0 + 0.6, 0.3, 2.2), RED, -0.04, 32)
      bubble(x, 560, 680, 'let’s GO', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Same comfy sweater. | *Year four.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: R,
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: '#a8d86a', W: CREAM }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      const y = 1 + Math.min(3, Math.floor(Math.max(0, lt - 0.5) / 0.35))
      L(x, 790, 1070, `YEAR ${y}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.05, 48)
    } },
  { sign: 'gemini', cap: 'Two outfits. | Wore *both.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: '#ffd23a', W: CREAM }, 720, 860, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      drawBits(x, SWEATER, { S: PINK, W: CREAM }, 860, 860, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 })
      L(x, 790, 1050, 'OUTFIT A + B', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: 'cancer', cap: 'Picked the comfy one. | *Never left the house.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: R,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 790, 840, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1060, 'PLANS: CANCELLED', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, -0.05, 32)
    } },
  { sign: 'leo', cap: 'Asked for opinions. | Only wanted *“wow.”*', mood: 'sparkle', star: R, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'thoughts?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 960, 'ACCEPTED: “WOW”', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#ffb34a', 0.05, 34)
      sparkles(x, t, 400, 860, P.t0 + 1.3, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Ironed the socks. | *Twice.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, SOCK, { W: CREAM, S: '#2fc79a' }, 740, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      drawBits(x, SOCK, { W: CREAM, S: '#2fc79a' }, 850, 860, 22 * pop01(t, P.t0 + 0.35, 0.3, 2), { rot: 0.08 })
      L(x, 790, 1070, 'WRINKLES: 0', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 38)
    } },
  { sign: 'libra', cap: 'Three hours deciding. | Still *in a towel.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2.2) % 2 ? 1 : -1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 800, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const h = 1 + Math.min(2, Math.floor(Math.max(0, lt - 0.4) / 0.5))
      L(x, 790, 1010, `HOUR ${h}`, pop01(t, P.t0 + 0.4, 0.3, 2), PINK, 0.05, 48)
    } },
  { sign: 'scorpio', cap: 'All black. | *Obviously.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'SHADES', 790, 830, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1020, 'COLOR OPTIONS: BLACK', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#c97bff', -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Hiking boots. | To a *wedding.*', mood: 'sparkle', star: R, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, BOOT, { B: '#a8552a', K: INK }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1060, 'trail after!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Outfits planned | *through next year.*', mood: 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      sheet(x, 790, 880, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 300, h: 320, head: 'OUTFIT PLAN', headBg: STEEL, headInk: INK, lines: ['MON: navy', 'TUE: navy', 'WED: navy', ['THU: NAVY', RED]], size: 30, progress: prog(lt, 0.5, 1.6) })
    } },
  { sign: 'aquarius', cap: 'Wore a cape. | To *the grocery store.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: R, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAPE, { Y: GOLD, R: '#6fc3ff' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 5) })
      L(x, 790, 1060, 'IT’S A STATEMENT', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Couldn’t pick. | *Cried* in the closet.', mood: lt => lt < 1.0 ? 'neutral' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'they’re ALL | so pretty', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 790, 1010, 'OUTFITS TRIED: 31', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0647', key: 'E', accent: ACC, ending: 'group',
  title: 'Zodiacs choosing | an outfit *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Everyone’s ready. | *Except Libra.*',
    draw(x, t, lt) { L(x, 540, 740, 'LIBRA: HOUR 4', pop01(t, t - lt + 1.6, 0.3, 2.4), PINK, -0.05, 40) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
