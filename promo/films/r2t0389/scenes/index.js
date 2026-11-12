// r2t0389: star_talk, BELIKE (twelve signs), "Lost the remote? | Zodiacs be like." (signs3kit social cut, music: lofi · D).
// Ending: group ("Under Taurus. | The whole time." — Scorpio's suspect board, paid off).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, zzz, confetti, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Can’t find the remote? | *Flipped* the couch.', mood: 'wide', look: [1, 0], star: ST, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      const f = ease.outBack ? ease.outBack(prog(lt, 0.5, 0.9)) : prog(lt, 0.5, 0.9)
      bits(x, 'COUCH', 790, 960 - 60 * Math.sin(Math.PI * clamp(f)), 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.PI * clamp(f) })
      L(x, 790, 720, 'NOT HERE EITHER', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Remote’s across the room. | Watched *the menu* instead.', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 800, 'MENU', pop01(t, P.t0 + 0.4, 0.3, 2), STEEL, 0, 30)
      L(x, 800, 1040, `HOUR ${1 + Math.floor(clamp((lt - 0.6) / 1.4) * 2)}`, pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'gemini', cap: 'Found the remote. | *Lost it again.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.7],
    front(x, t, lt, P, F) {
      const has = lt > 0.5 && lt < 1.2
      if (has) bits(x, 'REMOTE', F.x + 150, F.cy, 14, { rot: 0.3 })
      if (lt > 0.5) L(x, 790, 760, has ? 'FOUND IT!' : 'WAIT. WHERE?', pop01(t, P.t0 + 0.5, 0.3, 2.2), has ? MINT : RED, 0.04, 34)
      sparkles(x, t, F.x + 150, F.cy, P.t0 + 0.5, 6, 80, 0.2)
    } },
  { sign: 'cancer', cap: 'Lost the remote. | *Called Mom.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM', headCol: PINK, lines: [['have u seen it', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2), true], ['left cushion.', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2)], ['love you', PINK, pop01(t, P.t0 + 1.6, 0.25, 2.2)]] })
    } },
  { sign: 'leo', cap: 'Lost the remote. | Performed *the show* instead.', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: 0, y: -10, s: 260 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      x.save(); x.fillStyle = RED; const o = clamp((lt - 0.3) / 0.6) * 160
      x.fillRect(110, 470, 260 - o, 760); x.fillRect(710 + o, 470, 260 - o, 760); x.restore()
    },
    front(x, t, lt, P) {
      sparkles(x, t, 540, 860, P.t0 + 1.0, 8, 220, 0.3)
      L(x, 540, 1140, 'ENCORE (THEIRS)', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.03, 30)
    } },
  { sign: 'virgo', cap: 'Lost the remote. | Built *a search grid.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-168, -168, 336, 336); x.fillStyle = CREAM; x.fillRect(-160, -160, 320, 320)
        const n = Math.floor(clamp((lt - 0.4) / 1.4) * 16)
        for (let i = 0; i < 16; i++) { const cx = -120 + (i % 4) * 80, cy = -120 + Math.floor(i / 4) * 80; x.fillStyle = i < n ? '#ffb0b0' : '#e8e0d0'; x.fillRect(cx - 36, cy - 36, 72, 72); if (i < n) { x.fillStyle = RED; x.font = `800 40px Inter`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('×', cx, cy + 2) } }
        x.restore()
      }
      L(x, 790, 1080, 'SECTOR C4: CLEAR', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Found the remote. | Can’t *pick a show.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      bits(x, 'REMOTE', F.x + 150, F.cy + 10, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 })
      bits(x, 'TV', 800, 760, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const shows = ['DRAMA?', 'COMEDY?', 'COOKING?', 'NATURE?']
      L(x, 800, 740, shows[Math.floor(lt * 3) % 4], pop01(t, P.t0 + 0.5, 0.3, 2), [PINK, GOLD, MINT, SKYB][Math.floor(lt * 3) % 4], 0, 26)
      L(x, 800, 1040, 'SCROLLING: 1 HR', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Lost the remote? | Already *has a suspect.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      bits(x, 'LENS', F.x + 130, F.cy - 10, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) {
        sheet(x, 800, 830, k, { w: 300, h: 340, rot: 0.04, head: 'SUSPECT', headBg: LAV, headInk: INK, lines: [], size: 30 })
        x.save(); x.translate(800, 830); x.rotate(0.04); x.translate(-800, -830)
        friend(x, t, 'taurus', 800, 880, 170, k, { mood: 'happy', look: [0, 0], seed: 21 })
        x.restore()
      }
      L(x, 800, 1080, 'MOTIVE: COMFY', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Lost the remote. | Went *outside* instead.', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P, F) {
      bits(x, 'BACKPACK', F.x + 120, F.cy + 20, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'MAP', 800, 780, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1020, 'BACK IN 3 DAYS', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Lose the remote? | Never. It’s *on a lanyard.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(F.x - 60, F.top + 40); x.lineTo(F.x, F.cy + 90); x.lineTo(F.x + 60, F.top + 40); x.stroke(); x.restore(); bits(x, 'REMOTE', F.x, F.cy + 120, 10 * k) }
      L(x, 800, 760, 'REMOTE: LABELLED', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.04, 30)
      L(x, 800, 900, 'BATTERIES: SPARE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Lost the remote. | Built *a better one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 * Math.sin(t * 8) })
      if (lt > 1.2) sparkles(x, t, 790, 760, P.t0 + 1.2, 6, 120, 0.4)
      L(x, 790, 1080, 'ALSO MAKES TOAST', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Lost the remote. | Held *a little vigil.*', mood: 'sparkle', tears: 3, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'CANDLE', 700 + i * 90, 960, 12 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2))
      L(x, 790, 780, 'IN LOVING MEMORY', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, -0.04, 28)
      L(x, 790, 1120, 'GONE TOO SOON', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0389', key: 'D', accent: ACC, ending: 'group',
  title: 'Lost the remote? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Under *Taurus.* | The whole time.',
    moods: ['wide', 'sleepy', 'wide', 'happy', 'wink', 'squint', 'wide', 'wink', 'sparkle', 'neutral', 'wide', 'sparkle'],
    draw(x, t, lt) {
      // Taurus is photo slot 1 (top row): the remote peeks out under them
      const k = pop01(t, t - lt + 1.4, 0.4, 2.2)
      bits(x, 'REMOTE', 296, 1188, 11 * k, { rot: Math.PI / 2 })
      L(x, 300, 800, 'FOUND IT', pop01(t, t - lt + 1.8, 0.3, 2.4), MINT, -0.05, 30)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
