// og-kbge24: social rework (static HOOK outline, og kit copy ./biokit.js: no series label, no hook slam, no shakes, no loop;
//   crazier glow-ups; ends on the last line). Was: kbge24 BIO GLOW-UP, "Twelve bios, twelve glow-ups" (60 s vertical, star_advice trial reel, long). Kit: ../../kbge01/biokit.js
//   0.00  frame 0: twelve mini profile cards mid-shuffle across the sky, Aries' card mid-slam at the front;
//         hook "Twelve bad bios. | *Wait* for Pisces’s."   0.3 whip zoom · 2.6 the cards fly off, Aries' card fills the frame
//   3.2   one sign every 4.4 s, a chapter sticker each (1 · ARIES … 11 · AQUARIUS): the bad line, the red circle, the strike,
//         the glow-up, GLOWED UP, and Pisces the bio judge sobbing every time.
//  51.6   12 · PISCES (the promise): "Hopeless romantic." → "*Hopeful* romantic. Big difference." Pisces reads its own glow-up
//         and floods; a message drops · 56.0 last line "Twelve signs. | Zero *fake* bios." · 59.5–60 loops into frame 0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { makeBio, sequence, sequenceCues, signStar, drawStarChar, rrect, R, INK, PAPER, INKT, INTER, GLYPH, GOLD, KIT } from '../biokit.js'
import { el } from '../../../src/lib.js'

export const DURATION = 60
const SEG = 4.4, S0 = 3.2
const BIOS = [
  ['aries', 'Aries', 26, 'Gym. Work. Gym again.', 'Gym at five, pancakes at six. You can *skip the first part.*', 'ON REPEAT'],
  ['taurus', 'Taurus', 31, 'I like food.', 'Will share my fries. My dumplings have *a lawyer.*', 'THAT’S IT?'],
  ['gemini', 'Gemini', 24, 'Ask me anything.', 'Ask me about the documentary. I have *four opinions* on it.', 'ANYTHING?'],
  ['cancer', 'Cancer', 30, 'Family is everything.', 'Sunday dinner at my mum’s. She already *set you a plate.*', 'AND YOU?'],
  ['leo', 'Leo', 27, 'Main character.', 'Main character who learns the *side characters’* birthdays.', 'AND THEM?'],
  ['virgo', 'Virgo', 29, 'Clean, organised, sane.', 'I made the itinerary. Laminated it. You *just enjoy it.*', 'A FORM?'],
  ['libra', 'Libra', 28, 'Lover of beautiful things.', 'I’ll find us the *prettiest bench.* Give me three hours.', 'WHICH ONE?'],
  ['scorpio', 'Scorpio', 33, 'Read between the lines.', 'Shy at first. Ask *one deep question.* I’ll know if you mean it.', 'HINT, PLEASE'],
  ['sagittarius', 'Sagittarius', 25, 'Free spirit.', 'Free spirit who *still answers texts.* From another country.', 'AND REPLIES?'],
  ['capricorn', 'Capricorn', 34, 'Busy.', 'Busy. But I’ve *scheduled you in.* Thursday, quarter past seven.', 'TOO BUSY?'],
  ['aquarius', 'Aquarius', 29, 'Ask me about aliens.', 'I’ll explain my alien theory. *Bring yours.* Slides welcome.', 'JUST ALIENS?'],
]
const segs = BIOS.map(([sign, name, age, bad, good, label], i) => ({
  at: S0 + i * SEG, len: SEG,
  ep: makeBio({ id: 'kbge24-' + sign, sign, name, age, D: SEG, noTitles: true, bad, good, circle: { word: bad, label }, cps: 42,
    T: { fx: 0.01, circle: 0.4, strike: [1.2, 1.45], swap: 1.55 }, zoom0: 1.0 }),
}))
const PIS_AT = S0 + BIOS.length * SEG            // 51.6
const PSEG = makeBio({
  id: 'kbge24-pisces', sign: 'pisces', name: 'Pisces', age: 23, D: DURATION - PIS_AT, noTitles: true, noJudge: true,
  bad: 'Hopeless romantic.', good: '*Hopeful* romantic. Big difference.', circle: { word: 'Hopeless', label: 'HOPELESS?' }, cps: 30,
  T: { fx: 0.01, circle: 0.5, strike: [1.4, 1.7], swap: 1.85 }, zoom0: 1.0,
  says: [{ t: 0.9, text: 'saved the best for *last.*' }],
  mood: (t, S) => t >= S.T.glow ? 'happy' : 'wide',
  photo: (x, t, S) => KITT.tears(x, t, S),
})
const KITT = { tears: () => {} }
import { starFrame, tearsAt } from '../biokit.js'
KITT.tears = (x, t, S) => { const sx = S.PHOTO.x + S.PHOTO.w / 2, sy = S.PHOTO.y + S.PHOTO.h * 0.56; tearsAt(x, t, starFrame(sx, sy, 250, t, { hops: [S.T.glow + 0.05, S.T.glow + 0.4], seed: 3 }), t < S.T.glow ? 2 : 3) }
segs.push({ at: PIS_AT, len: DURATION - PIS_AT, ep: PSEG })

export const MARK = { drop: S0, breaks: [S0 + 3 * SEG, S0 + 7 * SEG], lift: PIS_AT + PSEG.T.glow, last: 57.0 }

// ── the intro: twelve mini cards shuffling, Aries slams to the front, then fills the frame
const SIGNS12 = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
function mini(x, t, cx, cy, s, rot, sign) {
  const sg = signStar(sign), w = 260 * s, h = 340 * s
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; rrect(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 22 * s); x.fill()
  x.fillStyle = PAPER; rrect(x, -w / 2, -h / 2, w, h, 18 * s); x.fill()
  R(x, '#2a1f5a', -w / 2 + 14 * s, -h / 2 + 14 * s, w - 28 * s, 150 * s)
  drawStarChar(x, 0, -h / 2 + 100 * s, 120 * s, t, { color: sg.color, mood: 'wide', seed: SIGNS12.indexOf(sign), glow: 0.6, tips: false })
  x.font = `500 ${Math.round(34 * s)}px ${GLYPH}`; x.fillStyle = sg.color; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(sg.glyph + '︎', -w / 2 + 18 * s, 0 + 30 * s)
  x.font = `800 ${Math.round(26 * s)}px ${INTER}`; x.fillStyle = INKT; x.fillText(sign[0].toUpperCase() + sign.slice(1), -w / 2 + 56 * s, 30 * s)
  for (let i = 0; i < 3; i++) R(x, '#d8d0c0', -w / 2 + 18 * s, 70 * s + i * 30 * s, (w - 36 * s) * (1 - i * 0.25), 12 * s)
  x.restore()
}
function intro(stage) {
  return (async () => {
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    // og: no series label
    return {
      start: -1e9, end: S0, root,
      update(t) {
        drawSky(x, t, SKY_H)
        const off = ease.inCubic(prog(t, 2.5, 3.05))
        SIGNS12.slice(1).forEach((sg, i) => {
          const a = i / 11 * Math.PI * 2 + t * 0.9, r = 330 + 60 * Math.sin(t * 1.3 + i)
          const cx = 540 + Math.cos(a) * r * (1 + off * 2.2), cy = 960 + Math.sin(a) * r * 1.25 * (1 + off * 2.2)
          mini(x, t, cx, cy, 0.62, Math.sin(a * 2 + t) * 0.35, sg)
        })
        // Aries: mid-slam at the front on frame 0, then grows to fill the frame
        const slam = 1 - ease.outBack(prog(t, -0.15, 0.3)) * 1
        const grow = ease.inOutCubic(prog(t, 2.55, S0))
        const s = lerp(1.0 + 0.5 * slam, 2.6, grow)
        mini(x, t, 540, lerp(1010, 920, grow) + 8 * Math.sin(t * 20) * (1 - prog(t, 0, 0.6)), s, lerp(-0.08 + 0.1 * slam, 0, grow), 'aries')
        if (grow > 0) { x.fillStyle = `rgba(5,4,12,${grow})`; x.fillRect(0, 0, 1080, 1920) }
        drawGrain(gx, t)
      },
    }
  })()
}

const HOOK0 = { at: -1, text: 'Twelve bad bios. | *Wait* for Pisces’s.', top: 180, size: 104, accentColor: '#c9b8ff', out: [2.9, 3.1] }
const WHIP = { at: 0.3, from: 1.12, len: 0.45, flash: 0 }   // og (calm): softer, no flash
const CHAPS = [...BIOS.map(b => b[1].toUpperCase()), 'PISCES'].map((title, i) => ({ at: segs[i].at + 0.05, out: [segs[i].at + segs[i].len - 0.25, segs[i].at + segs[i].len - 0.08], n: i + 1, title, y: 250 }))
CHAPS[11].out = [MARK.last - 0.4, MARK.last - 0.2]
const PROMISE = { at: PIS_AT - 0.6, len: 0.5, amp: 22 }
const REPLY = { at: PIS_AT + PSEG.T.glow + 0.5, out: [MARK.last - 0.35, MARK.last - 0.15], title: 'new message', body: 'hopeful is *so* much better. (also crying)', glyph: signStar('cancer').glyph, color: signStar('cancer').color, y: 236 }
const LAST = { at: MARK.last, text: 'Twelve signs. | Zero *fake* bios.', top: 262, size: 84, accentColor: GOLD, gap: 0.12, shake: 0 }   // og: stays to the end

export const SCENES = [
  sequence(segs), intro, KIT.whipZoom(WHIP),
  ...CHAPS.map(c => KIT.chapter(c)), KIT.notification(REPLY), KIT.slamTitle(LAST),
]   // og: no hook slam (static HOOK), no promise shake, no loop back
export const CUES = [
  ...sequenceCues(segs), ['whoosh', 0.4, 0.4, 0.04],
  ['whoosh', 2.55, 0.6, 0.06], ['riser', 2.2, 3.1, 0.04],
  ...CHAPS.flatMap(c => KIT.chapterCues(c)), ...KIT.notificationCues(REPLY), ['pop', MARK.last + 0.15, 987.77, 0.03, 0],
]
void HOOK0; void PROMISE
export const HOOK = 'Twelve bad bios. | *Wait* for Pisces.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0

void clamp
