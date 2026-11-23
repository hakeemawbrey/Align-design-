// Houston Star Talk · w09 · the weather-map segment as its own show: STAR WEATHER (hst224–hst235).
// A forecaster star with a pointer at the Houston map (three loops, the freeways, the Gulf), a weather bar with a
// "NOW" readout, a scrolling neighborhood strip, and field cut-ins. Joke readings only; never a real forecast.
import {
  BADGE, STING, Kp, fadeK, Y, partyCard, studio,
  bayou, street, strip, bungalow, park, bridge, bats, beach, tunnel, cafe, office, village, oakPollen, mosquito, loveBugs, sweatDrops, frizz, sweater, sunnies, readers, clipboard, phone,
  wxStudio, houMap, PL, wxIcon, tempTag, strip5, pointer, front, bigNum, meter, tree, ots,
  box, txt, FLOOR, label, sparkles, hearts, pop01, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV, skyline, freeway, car, shield, streetSign, heatSun, HGREEN, BRAKE, clamp, ease, prog,
} from './w09.js'

// ── the show's look
export const THEME = {
  blue:   { a: '#1c3a6a', b: '#0c1a3a', floor: '#14244a', accent: '#5ec8ff', bar: '#2b5fb0', land: '#2f6a4a' },
  dusk:   { a: '#4a2a6a', b: '#1a0c3a', floor: '#2a1446', accent: '#ff8fb1', bar: '#8a3fb0', land: '#3a5a4a' },
  heat:   { a: '#6a2a1c', b: '#3a0c0c', floor: '#4a1a14', accent: '#ffb36b', bar: '#d0402a', land: '#4a6a3a' },
  mint:   { a: '#1c5a5a', b: '#0c2a3a', floor: '#14404a', accent: '#7dffb0', bar: '#1f8a8a', land: '#2a5a5a' },
  gold:   { a: '#5a4a1c', b: '#2a1a0c', floor: '#40300e', accent: '#ffd36b', bar: '#c98a1a', land: '#4a6a3a' },
  rose:   { a: '#6a1c4a', b: '#2a0c22', floor: '#4a1438', accent: '#ff8fb1', bar: '#c03a7a', land: '#3a5a4a' },
}
const NB = 'MONTROSE 81°  ·  THE HEIGHTS 82°  ·  KATY 84°  ·  PEARLAND 83°  ·  THE WOODLANDS 80°  ·  CLEAR LAKE 79°  ·  SUGAR LAND 83°  ·  EADO 82°  ·  CYPRESS 84°  ·  '
/** the STAR WEATHER bar: a sun logo, a headline, a NOW box, and a scrolling neighborhood strip */
export function wxBar(x, t, head, { th = THEME.blue, now = '81°', strip = NB, icon = 'sun' } = {}) {
  const g = x.createLinearGradient(0, 1400, 0, 1530); g.addColorStop(0, th.bar); g.addColorStop(1, th.b); x.fillStyle = INK; x.fillRect(0, 1394, 1080, 8)
  x.fillStyle = g; x.fillRect(0, 1400, 1080, 130)
  box(x, 0, 1400, 250, 130, th.accent, 0); wxIcon(x, icon, 62, 1465, 0.42, t); txt(x, 'STAR', 168, 1440, { size: 30, col: INK, font: MONO, weight: 700 }); txt(x, 'WEATHER', 168, 1484, { size: 30, col: INK, font: MONO, weight: 700 })
  x.font = `800 48px ${INTER}`; let sz = 48; while (sz > 28 && (x.font = `800 ${sz}px ${INTER}`, x.measureText(head).width > 560)) sz -= 2
  txt(x, head, 545, 1466, { size: sz, col: BONE })
  box(x, 860, 1412, 200, 106, INK, 0); txt(x, 'NOW', 960, 1436, { size: 22, col: th.accent, font: MONO, weight: 700 }); txt(x, now, 960, 1484, { size: now.length > 4 ? 40 : 52, col: BONE })
  box(x, 0, 1530, 1080, 56, '#0b0820', 0)
  x.save(); x.beginPath(); x.rect(0, 1530, 1080, 56); x.clip(); x.font = `700 28px ${MONO}`; const w = x.measureText(strip).width + 60, off = (t * 120) % w
  for (let k = -1; k < 3; k++) { x.fillStyle = th.accent; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(strip, k * w - off, 1558) }
  x.restore()
}
const MAP = { cx: 500, cy: 820, w: 900, h: 640 }
const FC = [900, 1250, 210]                        // the forecaster's usual spot
const deskAt = (x, y) => [x, y, 210]
/** a full weather-wall scene: studio, the map (with o.map options), extra drawing, the bar */
const wall = (head, o = {}) => (x, t, lt) => {
  const th = o.th || THEME.blue
  wxStudio(x, t, th)
  if (o.map !== false) houMap(x, t, { ...MAP, land: th.land, ...(typeof o.map === 'function' ? o.map(lt) : o.map || {}) })
  o.draw?.(x, t, lt)
  wxBar(x, t, typeof head === 'function' ? head(lt) : head, { th, now: typeof o.now === 'function' ? o.now(lt) : o.now || '81°', strip: o.strip || NB, icon: o.icon || 'sun' })
}
/** a field cut-in under the weather bar */
const cut = (bg, head, o = {}) => (x, t, lt) => { bg(x, t, lt); o.draw?.(x, t, lt); wxBar(x, t, head, { th: o.th || THEME.blue, now: o.now || '81°', strip: o.strip || NB, icon: o.icon || 'sun' }) }
const P2M = (p, k = 1) => [MAP.cx + (p[0] - 540) * (MAP.w / 960), MAP.cy + (p[1] - 830) * (MAP.h / 720)]   // place → map position
const pl = (...names) => names.map(n => { const [px, py] = P2M(PL[n]); return [px, py, PL[n][2]] })
const lesson = (sign, text, th, now = '♥') => ({ dur: 3.4, set: wall("TONIGHT'S TAKEAWAY", { th, map: false, now, draw: (x, t) => { box(x, 120, 520, 840, 600, th.floor, 10); sparkles(x, t, 540, 820, 0, 8, 360, 2) } }), cast: { [sign]: [[0, 540, 1080, 260]] }, mood: { [sign]: 'wink' }, lines: [[0.2, 2.9, sign, text]], stick: [[0.6, 2.4, '★ LESSON UNLOCKED', GOLD]] })
const outro = (sign, text, th, head = 'NEXT: HOUSTON BETA PARTY · JAN 9') => ({ dur: 2.8, set: wall(head, { th, map: false, now: 'JAN 9', draw: (x, t) => { box(x, 120, 520, 840, 600, th.floor, 10); txt(x, 'JAN 9', 540, 700, { size: 150, col: GOLD }); txt(x, 'HOUSTON BETA PARTY', 540, 820, { size: 48, col: BONE }) } }), cast: { [sign]: [[0, 540, 1150, 240]] }, mood: { [sign]: 'happy' }, hops: { [sign]: [1.4] }, lines: [[0.3, 2.2, sign, text]] })

// ── hst224 · Your Houston hair forecast: frizz
const hair = (() => {
  const th = THEME.rose, H = 'FRIZZ INDEX: HIGH  ·  INSIDE THE LOOP: FRIZZ  ·  OUTSIDE THE LOOP: ALSO FRIZZ  ·  HATS: ADVISED  ·  CURLS: THRIVING  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: H, icon: 'fog', now: '100%', ...o })
  const C = (bg, head, o = {}) => cut(bg, head, { th, strip: H, icon: 'fog', now: '100%', ...o })
  const tags = (lt) => pl('montrose', 'heights', 'katy', 'woodlands', 'pearland').map(([px, py], i) => () => null)
  return {
    hook: 'Your Houston hair | forecast: frizz', badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Come as you are. Jan 9.', stars: ['leo', 'libra', 'sagittarius', 'pisces'] }),
    scenes: [
      { dur: 3.0, set: W('TODAY: FRIZZ', { map: { tint: 'rgba(120,220,255,0.18)' }, draw: (x, t) => bigNum(x, '100%', 420, 760, 1, SKYB, 170) }), front: (x, t, lt, P) => { pointer(x, P, 'leo', 470, 760); frizz(x, P, 'leo', t, clamp(lt / 2)) },
        cast: { leo: [[0, ...FC]] }, mood: { leo: 'wide' }, hops: { leo: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'leo', 'your hair forecast: | frizz. all day.']] },
      { dur: 3.2, set: W('BY NEIGHBORHOOD', { draw: (x, t, lt) => pl('montrose', 'heights', 'katy', 'woodlands', 'pearland').forEach(([px, py], i) => tempTag(x, px, py + 40, 'FRIZZ', { col: '#c03a7a', k: Kp(lt, 0.2 + i * 0.35), size: 32 })) }), front: (x, t, lt, P) => frizz(x, P, 'leo', t, 1),
        cast: { leo: [[0, ...FC]] }, mood: { leo: 'squint' },
        lines: [[0.3, 2.6, 'leo', 'inside the Loop: frizz. | outside: also frizz.']] },
      { dur: 3.0, set: C((x, t) => street(x, t), 'LIVE: MIDTOWN'), front: (x, t, lt, P) => frizz(x, P, 'libra', t, clamp((lt - 0.8) / 1.2)),
        cast: { libra: [[0, 540, Y - 30, 260]] }, mood: { libra: lt => lt < 1 ? 'sparkle' : 'wide' },
        lines: [[0.3, 2.4, 'libra', 'I spent | an hour on this.']] },
      { dur: 3.2, set: W('THE FRIZZ INDEX', { map: false, draw: (x, t, lt) => { bigNum(x, 'FRIZZ INDEX', 540, 600, 1, BONE, 90); for (let k = 0; k < 5; k++) { const on = clamp(lt * 2.2 - k * 0.35); box(x, 140 + k * 165, 980 - k * 70, 140, 120 + k * 70, on > 0.5 ? ['#7dffb0', '#ffd36b', '#ffb36b', '#ff7a5a', '#ff5aa0'][k] : '#2a1438', 6) } if (lt > 1.8) bigNum(x, 'OFF THE CHART', 540, 1180, Kp(lt, 1.8), '#ff8fb1', 70) } }), front: (x, t, lt, P) => clipboard(x, P, 'virgo', -1),
        cast: { virgo: [[0, 900, 760, 200]] }, mood: { virgo: 'squint' },
        lines: [[0.2, 2.8, 'virgo', 'the index is | past the top.']] },
      { dur: 3.0, set: C((x, t) => bayou(x, t), 'LIVE: THE BAYOU TRAIL'), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aries'); box(x, cx - s * 0.38, cy - s * 0.62, s * 0.76, s * 0.18, '#2b5fb0', 4); box(x, cx - s * 0.1, cy - s * 0.48, s * 0.6, s * 0.08, '#2b5fb0', 3) },
        cast: { aries: [[0, 540, Y - 30, 250]] }, mood: { aries: 'sparkle' },
        lines: [[0.3, 2.4, 'aries', 'I just | wear a hat.']] },
      { dur: 3.0, set: W('SEARCHING FOR A DRY SPOT', { map: (lt) => ({ tint: 'rgba(120,220,255,0.2)' }), draw: (x, t, lt) => { const a = lt * 2.2; x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.arc(480 + Math.cos(a) * 220, 820 + Math.sin(a) * 140, 60, 0, Math.PI * 2); x.stroke() } }), front: (x, t, lt, P) => { pointer(x, P, 'leo', 480 + Math.cos(lt * 2.2) * 220, 820 + Math.sin(lt * 2.2) * 140); frizz(x, P, 'leo', t, 1) },
        cast: { leo: [[0, ...FC]] }, mood: { leo: 'squint' },
        lines: [[0.3, 2.4, 'leo', 'a dry pocket | over... nowhere.']] },
      { dur: 3.0, set: C((x, t) => park(x, t), 'LIVE: THE PARK'), front: (x, t, lt, P) => frizz(x, P, 'pisces', t, 1),
        cast: { pisces: [[0, 540, Y - 30, 250]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 1.2] },
        lines: [[0.3, 2.4, 'pisces', 'even my hair | is crying.']] },
      { dur: 3.2, set: W('UPDATE: FRIZZ ACCEPTED', { map: { tint: 'rgba(255,143,177,0.15)' } }), front: (x, t, lt, P) => frizz(x, P, 'leo', t, 1 + clamp(lt / 1.5) * 1.2),
        back: (x, t, lt) => { if (lt > 1.2) sparkles(x, t, 900, 1150, t - lt + 1.2, 10, 220, 5) },
        cast: { leo: [[0, ...FC]] }, mood: { leo: lt => lt > 1.2 ? 'heart' : 'neutral' },
        lines: [[0.3, 2.6, 'leo', 'you know what? | I love it.']] },
      { dur: 3.2, set: C((x, t) => cafe(x, t, { wall: '#c96a8a', sign: 'COFFEE' }), 'LIVE: A FIRST DATE'), front: (x, t, lt, P) => frizz(x, P, 'libra', t, 1),
        back: (x, t, lt) => { if (lt > 1.4) hearts(x, t, 540, 930, t - lt + 1.4, { n: 6, spread: 200 }) },
        cast: { libra: [[0, 330, Y - 30, 240]], sagittarius: [[0, 760, Y - 30, 240]] }, mood: { libra: lt => lt > 1.4 ? 'heart' : 'wide', sagittarius: 'happy' }, look: { libra: [1, 0], sagittarius: [-1, 0] },
        lines: [[0.2, 1.2, 'libra', 'sorry about | the hair.'], [1.5, 1.4, 'sagittarius', 'I like it | big.']] },
      lesson('leo', 'date someone who likes you | at full humidity.', th, '100%'),
      outro('leo', 'Jan 9. | come as you are.', th),
    ],
  }
})()

// ── hst225 · Your forecaster explains Houston's four seasons
const seasons = (() => {
  const th = THEME.mint, S = 'SEASON 1: SUMMER  ·  SEASON 2: STILL SUMMER  ·  SEASON 3: SECOND SUMMER  ·  SEASON 4: THE COLD DAY  ·  '
  const SL = [['SUMMER', '#ff7a2a', 0.34], ['STILL SUMMER', '#ff5a6e', 0.3], ['SECOND SUMMER', '#ffb36b', 0.32], ['THE COLD DAY', '#5ec8ff', 0.04]]
  const wheel = (hi = -1, k = 1) => (x, t) => {
    const cx = 480, cy = 860, R = 300 * k; let a = -Math.PI / 2
    SL.forEach(([n, c, f], i) => { const b = a + f * Math.PI * 2, out = i === hi ? 24 : 0, m = (a + b) / 2; x.save(); x.translate(Math.cos(m) * out, Math.sin(m) * out); x.fillStyle = INK; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, R + 6, a, b); x.fill(); x.fillStyle = c; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, R, a, b); x.closePath(); x.fill(); x.restore(); a = b })
    a = -Math.PI / 2; SL.forEach(([n, c, f], i) => { const m = a + f * Math.PI; if (i < 3) n.split(' ').forEach((w, j, A) => txt(x, w, cx + Math.cos(m) * R * 0.55, cy + Math.sin(m) * R * 0.55 + (j - (A.length - 1) / 2) * 34, { size: 32, col: INK })); a += f * Math.PI * 2 })
    txt(x, 'THE COLD DAY →', cx - 150, cy - R - 40, { size: 30, col: '#5ec8ff', font: MONO, weight: 700 })
  }
  const W = (head, hi, o = {}) => wall(head, { th, strip: S, map: false, draw: wheel(hi), ...o })
  const C = (bg, head, o = {}) => cut(bg, head, { th, strip: S, ...o })
  return {
    hook: "Houston's seasons: | all four of them", badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Dressed for all four. Jan 9.', stars: ['virgo', 'cancer', 'libra', 'gemini'] }),
    scenes: [
      { dur: 3.0, set: W('THE FOUR SEASONS', -1), front: (x, t, lt, P) => pointer(x, P, 'virgo', 600, 700),
        cast: { virgo: [[0, ...FC]] }, mood: { virgo: 'happy' }, hops: { virgo: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'virgo', 'your seasons. | all four of them.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); heatSun(x, 820, 520, t, 90) }, 'SEASON 1: SUMMER', { now: '7AM 88°', icon: 'sun' }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aries'); sweatDrops(x, cx + s * 0.3, cy - s * 0.35, t) },
        cast: { aries: [[0, 400, Y - 30, 250]] }, mood: { aries: 'squint' },
        lines: [[0.3, 2.4, 'aries', "it's 7am. | why."]] },
      { dur: 3.0, set: C((x, t) => bungalow(x, t, { col: '#d08a4a' }), 'SEASON 2: STILL SUMMER', { now: 'OCT 89°' }), front: (x, t, lt, P) => { sweater(x, P, 'libra', '#c96a3a'); const [cx, cy, s] = P.at('libra'); sweatDrops(x, cx + s * 0.3, cy - s * 0.35, t) },
        cast: { libra: [[0, 400, Y - 30, 250]] }, mood: { libra: 'squint' },
        lines: [[0.3, 2.4, 'libra', "it's October! | I'm wearing it."]] },
      { dur: 3.0, set: C((x, t) => { street(x, t); x.fillStyle = '#2f7a46'; x.beginPath(); x.moveTo(820, 820); x.lineTo(700, 1300); x.lineTo(940, 1300); x.fill(); for (let k = 0; k < 6; k++) { x.fillStyle = [GOLD, PINK, SKYB][k % 3]; x.beginPath(); x.arc(760 + (k * 37) % 130, 950 + k * 55, 12, 0, Math.PI * 2); x.fill() } }, 'SEASON 3: SECOND SUMMER', { now: 'DEC 82°' }),
        front: (x, t, lt, P) => { const [cx, cy, s] = P.at('gemini'); box(x, cx - s * 0.3, cy + s * 0.12, s * 0.26, s * 0.2, '#5ec8ff', 4); box(x, cx + s * 0.04, cy + s * 0.12, s * 0.26, s * 0.2, '#5ec8ff', 4) },
        cast: { gemini: [[0, 380, Y - 30, 250]] }, mood: { gemini: 'sparkle' },
        lines: [[0.3, 2.4, 'gemini', 'shorts by | the tree.']] },
      { dur: 3.2, set: W('SEASON 4: THE COLD DAY', 3, { now: '55°', icon: 'cloud' }), front: (x, t, lt, P) => { pointer(x, P, 'virgo', 475, 575) },
        cast: { virgo: [[0, ...FC]] }, mood: { virgo: 'wide' },
        lines: [[0.3, 2.6, 'virgo', 'and the cold day. | singular.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); box(x, 640, 1160, 220, 120, '#8f96a0', 6) }, 'LIVE: THE COLD DAY', { now: '55°', icon: 'cloud' }),
        front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); for (let k = 0; k < 3; k++) box(x, cx - s * 0.36, cy + s * 0.02 + k * s * 0.13, s * 0.72, s * 0.12, '#e05a3a', 4); for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(700 + k * 50, 1140 - ph * 120); x.quadraticCurveTo(720 + k * 50, 1100 - ph * 120, 700 + k * 50, 1060 - ph * 120); x.stroke() } },
        cast: { cancer: [[0, 360, Y - 30, 250]] }, mood: { cancer: 'heart' },
        lines: [[0.3, 2.4, 'cancer', 'the one day. | I made soup.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); heatSun(x, 820, 520, t, 80) }, 'THE NEXT MORNING', { now: '80°' }),
        front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); for (let k = 0; k < 3; k++) box(x, cx - s * 0.36, cy + s * 0.02 + k * s * 0.13, s * 0.72, s * 0.12, '#e05a3a', 4); sweatDrops(x, cx + s * 0.3, cy - s * 0.35, t) },
        cast: { cancer: [[0, 360, Y - 30, 250]] }, mood: { cancer: 'wide' },
        lines: [[0.3, 2.4, 'cancer', "it's 80 | again."]] },
      { dur: 3.2, set: C((x, t) => office(x, t), 'BONUS SEASON: INDOORS', { now: '62°', icon: 'wind' }),
        front: (x, t, lt, P) => sweater(x, P, 'capricorn', '#5a7ab0'),
        cast: { capricorn: [[0, 620, Y - 30, 240]] }, mood: { capricorn: 'squint' },
        lines: [[0.3, 2.6, 'capricorn', 'bonus season: | the office.']] },
      lesson('virgo', 'love someone who | dresses for all four.', th, '81°'),
      outro('virgo', 'Jan 9. | season: party.', th),
    ],
  }
})()

// ── hst226 · It's 95° outside, 62° in your office
const ac = (() => {
  const th = THEME.heat, S = 'OUTSIDE: HOT  ·  INSIDE: ARCTIC  ·  SWEATER CARRY: ADVISED  ·  SHADE PARKING: COMPETITIVE  ·  PATIO REQUESTS: BRAVE  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, ...o })
  const C = (bg, head, o = {}) => cut(bg, head, { th, strip: S, ...o })
  const split = (x, t) => { box(x, 60, 500, 440, 640, '#d0402a', 8); box(x, 580, 500, 440, 640, '#2b6aa0', 8); heatSun(x, 280, 700, t, 80); txt(x, 'OUTSIDE', 280, 560, { size: 38, col: BONE, font: MONO, weight: 700 }); txt(x, 'INSIDE', 800, 560, { size: 38, col: BONE, font: MONO, weight: 700 }); bigNum(x, '95°', 280, 940, 1, BONE, 130); bigNum(x, '62°', 800, 940, 1, BONE, 130); wxIcon(x, 'wind', 800, 700, 1, t) }
  return {
    hook: "It's 95° outside, | 62° in your office", badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Bring layers. Jan 9.', stars: ['cancer', 'libra', 'pisces', 'capricorn'] }),
    scenes: [
      { dur: 3.0, set: W('THE TWO CLIMATES', { map: false, draw: split, now: '95°' }),
        cast: { capricorn: [[0, 540, 1250, 220]] }, mood: { capricorn: 'wide' }, hops: { capricorn: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'capricorn', 'your day: | 95, then 62.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); tree(x, 820, FLOOR + 20, 1.3) }, 'LIVE: THE PARKING LOT', { now: '95°' }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('taurus'); sweatDrops(x, cx + s * 0.3, cy - s * 0.35, t) },
        cast: { taurus: [[0, 300, Y - 30, 240], [1.8, 760, Y - 30, 240]] }, mood: { taurus: 'squint' },
        lines: [[0.3, 1.4, 'taurus', 'the one spot | in the shade.']] },
      { dur: 3.0, set: C((x, t) => office(x, t), 'LIVE: YOUR OFFICE', { now: '62°', icon: 'wind' }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('pisces'); box(x, cx - s * 0.44, cy + s * 0.12, s * 0.88, s * 0.26, '#c9a6ff', 5) },
        cast: { pisces: [[0, 560, Y - 30, 250]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.4, 0.5, 1.4, 1.5] },
        lines: [[0.3, 2.4, 'pisces', 'my fingers | are frozen.']] },
      { dur: 3.2, set: W('SWEATER CARRY FORECAST', { map: false, now: '62°', draw: (x, t, lt) => strip5(x, t, [['MON', 'puffer', 'BRING'], ['TUE', 'puffer', 'BRING'], ['WED', 'puffer', 'BRING'], ['THU', 'puffer', 'BRING'], ['FRI', 'puffer', 'BRING']], 620, { k: clamp(lt / 1.4) }) }),
        cast: { capricorn: [[0, 540, 1250, 220]] }, mood: { capricorn: 'squint' },
        lines: [[0.3, 2.6, 'capricorn', 'sweater carry: | every day.']] },
      { dur: 3.0, set: C((x, t, lt) => { x.fillStyle = (lt * 1.6) % 1 < 0.5 ? '#d0402a' : '#2b6aa0'; x.fillRect(0, 0, 1080, 1920); box(x, 420, 560, 240, 640, '#6b3b1f', 8); txt(x, (lt * 1.6) % 1 < 0.5 ? 'OUT' : 'IN', 540, 520, { size: 60, col: BONE }) }, 'LIVE: THE DOORWAY'),
        front: (x, t, lt, P) => { if ((lt * 1.6) % 1 >= 0.5) sweater(x, P, 'gemini', '#7ab07a') },
        cast: { gemini: [[0, 540, 1060, 240]] }, mood: { gemini: 'wide' },
        lines: [[0.3, 2.4, 'gemini', 'on. off. | on. off.']] },
      { dur: 3.0, set: C((x, t) => cafe(x, t, { wall: '#d08a4a', sign: 'PATIO →' }), 'LIVE: A RESTAURANT'),
        cast: { scorpio: [[0, 400, Y - 30, 240]] }, mood: { scorpio: 'eyeroll' },
        lines: [[0.3, 2.4, 'scorpio', 'inside is too cold. | patio, please.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); car(x, 600, 1250, '#e0a030', { s: 1.4 }) }, 'LIVE: A HOT CAR', { now: '95°' }),
        front: (x, t) => { for (let k = 0; k < 5; k++) { const ph = (t * 1.2 + k / 5) % 1; x.fillStyle = `rgba(143,227,255,${(0.8 * (1 - ph)).toFixed(2)})`; x.fillRect(560 + k * 20, 1150 - ph * 100, 8, 24) } },
        cast: { sagittarius: [[0, 260, Y - 30, 230]] }, mood: { sagittarius: 'squint' },
        lines: [[0.3, 2.4, 'sagittarius', 'AC on max. | ten minutes.']] },
      { dur: 3.4, set: C((x, t) => cafe(x, t, { wall: '#5a7ab0', sign: 'COFFEE' }), 'LIVE: A DATE, 62° INSIDE', { now: '62°', icon: 'wind' }),
        back: (x, t, lt) => { if (lt > 1.6) hearts(x, t, 540, 930, t - lt + 1.6, { n: 6, spread: 200 }) },
        front: (x, t, lt, P) => { if (lt > 1.2) sweater(x, P, 'libra', '#c96a8a'); sweater(x, P, 'cancer', '#c96a8a') },
        cast: { cancer: [[0, 330, Y - 30, 240]], libra: [[0, 760, Y - 30, 240]] }, mood: { cancer: 'happy', libra: lt => lt > 1.4 ? 'heart' : 'squint' }, look: { cancer: [1, 0], libra: [-1, 0] },
        lines: [[0.2, 1.4, 'cancer', 'I brought you | a sweater.'], [1.8, 1.3, 'libra', "you're | the one."]] },
      lesson('capricorn', 'bring a second sweater. | for them.', th, '62°'),
      outro('capricorn', 'Jan 9. | bring layers.', th),
    ],
  }
})()

// ── hst227 · Love bug season: your windshield is booked
const lovebugs = (() => {
  const th = THEME.dusk, S = 'LOVE BUGS: TRAVELING IN PAIRS  ·  WINDSHIELDS: BOOKED  ·  TIP: A DRYER SHEET  ·  THEY VISIT IN SPRING AND FALL  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, icon: 'lovebug', now: 'PAIRS', ...o })
  const C = (bg, head, o = {}) => cut(bg, head, { th, strip: S, icon: 'lovebug', now: 'PAIRS', ...o })
  const swarm = (x, t) => loveBugs(x, t, 16, 1)
  return {
    hook: 'Love bugs are back. | Your car knows.', badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Bring your pair. Jan 9.', stars: ['taurus', 'cancer', 'gemini', 'pisces'] }),
    scenes: [
      { dur: 3.0, set: W('LOVE BUG SEASON', { draw: (x, t) => { for (let k = 0; k < 9; k++) wxIcon(x, 'lovebug', 180 + (k * 97) % 640 + 20 * Math.sin(t * 2 + k), 560 + (k * 61) % 480, 0.8, t) } }), front: (x, t, lt, P) => pointer(x, P, 'libra', 500, 760),
        cast: { libra: [[0, ...FC]] }, mood: { libra: 'wide' }, hops: { libra: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'libra', 'love bug season. | yes, again.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); swarm(x, t) }, 'LIVE: 290 OUTBOUND'),
        cast: { aries: [[0, 540, Y - 30, 250]] }, mood: { aries: 'wide' },
        lines: [[0.3, 2.4, 'aries', 'they fly | in PAIRS?!']] },
      { dur: 3.0, set: C((x, t) => { park(x, t); swarm(x, t) }, 'LIVE: THE PARK'),
        cast: { pisces: [[0, 540, Y - 30, 250]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 1.2] },
        lines: [[0.3, 2.4, 'pisces', 'even the bugs | have someone.']] },
      { dur: 3.2, set: W('WHEN THEY VISIT', { map: false, draw: (x, t, lt) => strip5(x, t, [['SPRING', 'lovebug', 'YES'], ['SUMMER', 'sun', 'NO'], ['FALL', 'lovebug', 'YES'], ['WINTER', 'cloud', 'NO']], 620, { k: clamp(lt / 1.4) }) }),
        cast: { libra: [[0, 540, 1250, 220]] }, mood: { libra: 'squint' },
        lines: [[0.3, 2.6, 'libra', 'spring and fall. | twice a year.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); swarm(x, t) }, 'LIVE: MONTROSE'),
        cast: { scorpio: [[0, 540, Y - 30, 250]] }, mood: { scorpio: 'eyeroll' },
        lines: [[0.3, 2.4, 'scorpio', 'they are | so clingy.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); car(x, 700, 1250, '#5ec8ff', { s: 1.3 }) }, 'TIP: A DRYER SHEET'), front: (x, t, lt, P) => { clipboard(x, P, 'virgo', 1); const [cx, cy, s] = P.at('virgo'); box(x, cx - s * 0.7, cy - 10, 70, 50, BONE, 3) },
        cast: { virgo: [[0, 360, Y - 30, 240]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 2.4, 'virgo', 'wet dryer sheet. | trust me.']] },
      { dur: 3.0, set: C((x, t) => { bayou(x, t); swarm(x, t) }, 'LIVE: THE BAYOU'),
        cast: { gemini: [[0, 540, Y - 30, 250]] }, mood: { gemini: 'heart' },
        lines: [[0.3, 2.4, 'gemini', 'honestly? | goals.']] },
      { dur: 3.4, set: C((x, t) => { bayou(x, t) }, 'LIVE: A WALK'), back: (x, t, lt) => { if (lt > 0.4) hearts(x, t, 540, 930, t - lt + 0.4, { n: 5, spread: 200 }) },
        cast: { cancer: [[0, 380, Y - 30, 230]], taurus: [[0, 640, Y - 30, 230]] }, mood: { cancer: 'heart', taurus: lt => lt > 1.8 ? 'eyeroll' : 'happy' }, look: { cancer: [1, 0], taurus: [-1, 0] },
        lines: [[0.2, 1.4, 'cancer', "we're like | love bugs."], [1.8, 1.3, 'taurus', 'please | never say that.']] },
      lesson('libra', 'stay close. | not windshield close.', th, 'PAIRS'),
      outro('libra', 'Jan 9. | bring your pair.', th),
    ],
  }
})()
// ── hst228 · It's raining on your side only (the Houston pop-up shower)
const popup = (() => {
  const th = THEME.blue, S = 'POP-UP SHOWER: ONE STREET WIDE  ·  OTHER SIDE: SUNNY  ·  ADVICE: WAIT TEN MINUTES  ·  UMBRELLAS: ARRIVING LATE  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, icon: 'rain', now: '50/50', ...o })
  const rainHalf = (x, t, l, r, k = 1) => { if (k <= 0) return; x.fillStyle = `rgba(30,40,70,${(0.35 * k).toFixed(2)})`; x.fillRect(l, 0, r - l, 1400); for (let i = 0; i < 60 * k; i++) { const px = l + (i * 61) % (r - l), py = ((i * 137 + t * 900) % 1300); x.fillStyle = '#8fe3ff'; x.fillRect(px, py, 6, 28) } wxIcon(x, 'cloud', (l + r) / 2, 420, 1.6, t) }
  const twoSides = (lt, cloudL = 0, cloudR = 540, k = 1) => (x, t) => { street(x, t); heatSun(x, 880, 440, t, 70); rainHalf(x, t, cloudL, cloudR, k) }
  return {
    hook: "It's raining on | your side only", badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Rain or shine. Jan 9.', stars: ['cancer', 'leo', 'gemini', 'virgo'] }),
    scenes: [
      { dur: 3.0, set: W('POP-UP SHOWER', { draw: (x, t) => { const [px, py] = P2M(PL.montrose); x.fillStyle = 'rgba(94,200,255,0.55)'; x.beginPath(); x.arc(px, py, 50 + 6 * Math.sin(t * 4), 0, Math.PI * 2); x.fill(); wxIcon(x, 'rain', px, py - 120, 0.8, t); const [qx, qy] = P2M(PL.midtown); wxIcon(x, 'sun', qx + 120, qy + 40, 0.7, t) } }), front: (x, t, lt, P) => pointer(x, P, 'gemini', ...P2M(PL.montrose)),
        cast: { gemini: [[0, ...FC]] }, mood: { gemini: 'wink' }, hops: { gemini: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'gemini', 'rain on your side. | sun on mine.']] },
      { dur: 3.2, set: cut(twoSides(0), 'LIVE: WESTHEIMER', { th, strip: S, icon: 'rain', now: '50/50' }),
        cast: { cancer: [[0, 270, Y - 30, 230]], leo: [[0, 810, Y - 30, 230]] }, mood: { cancer: 'squint', leo: 'sparkle' }, look: { cancer: [1, 0], leo: [-1, 0] },
        lines: [[0.2, 1.4, 'cancer', "it's pouring | over here."], [1.8, 1.3, 'leo', "it's lovely | over here."]] },
      { dur: 3.0, set: W('THE CLOUD IS FOLLOWING SOMEONE', { draw: (x, t, lt) => { const p = clamp(lt / 2.4), px = 380 + p * 200, py = 820; x.fillStyle = 'rgba(94,200,255,0.55)'; x.beginPath(); x.arc(px, py, 60, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ff8fb1'; x.fillRect(px - 10, py - 10, 20, 20); txt(x, 'CANCER', px, py + 90, { size: 26, col: BONE, font: MONO, weight: 700 }) } }), front: (x, t, lt, P) => pointer(x, P, 'gemini', 380 + clamp(lt / 2.4) * 200, 820),
        cast: { gemini: [[0, ...FC]] }, mood: { gemini: 'wide' },
        lines: [[0.3, 2.4, 'gemini', 'the cloud | is following you.']] },
      { dur: 3.0, set: (x, t, lt) => { const c = 540 * clamp(lt / 2); twoSides(0, c, c + 540)(x, t); wxBar(x, t, 'LIVE: STILL FOLLOWING', { th, strip: S, icon: 'rain', now: '50/50' }) },
        cast: { cancer: [[0, 270, Y - 30, 230], [2.0, 680, Y - 30, 230]], leo: [[0, 810, Y - 30, 230], [1.6, 960, Y - 10, 180]] }, mood: { cancer: 'wide', leo: 'wide' },
        lines: [[0.3, 2.4, 'cancer', 'why ME?']] },
      { dur: 3.0, set: C2((x, t) => { street(x, t); rainHalf(x, t, 0, 1080, 0.4) }, 'ADVICE: WAIT TEN MINUTES'), front: (x, t, lt, P) => clipboard(x, P, 'virgo', -1),
        cast: { virgo: [[0, 600, Y - 30, 240]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 2.4, 'virgo', 'wait ten minutes. | it passes.']] },
      { dur: 3.2, set: C2((x, t, lt) => { street(x, t); heatSun(x, 880, 440, t, 70); const k = clamp(lt / 1.2); ['#ff5a6e', '#ffb36b', '#ffd36b', '#7dffb0', '#5ec8ff', '#c9a6ff'].forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 18; x.globalAlpha = k * 0.8; x.beginPath(); x.arc(540, 1200, 560 - i * 18, Math.PI, Math.PI * (1 + k)); x.stroke() }); x.globalAlpha = 1 }, 'UPDATE: IT PASSED', '81°'),
        cast: { cancer: [[0, 330, Y - 30, 240]], leo: [[0, 780, Y - 30, 240]] }, mood: { cancer: 'sparkle', leo: 'happy' }, look: { cancer: [1, -0.4], leo: [-1, 0] },
        lines: [[0.3, 1.2, 'cancer', 'oh.'], [1.6, 1.4, 'leo', 'umbrella? | ...oh. never mind.']] },
      { dur: 3.2, set: C2((x, t) => { street(x, t); heatSun(x, 880, 440, t, 70) }, 'FORECAST: COFFEE', '81°'), back: (x, t, lt) => { if (lt > 1.0) hearts(x, t, 540, 930, t - lt + 1.0, { n: 6, spread: 200 }) },
        cast: { cancer: [[0, 330, Y - 30, 240], [1.4, 430, Y - 30, 240]], leo: [[0, 780, Y - 30, 240], [1.4, 660, Y - 30, 240]] }, mood: { cancer: 'heart', leo: 'heart' }, look: { cancer: [1, 0], leo: [-1, 0] },
        lines: [[0.2, 2.6, 'leo', 'coffee | while it is sunny?']] },
      lesson('gemini', 'bad weather passes. | wait ten minutes.', th, '81°'),
      outro('gemini', 'Jan 9. | rain or shine.', th),
    ],
  }
  function C2(bg, head, now = '50/50') { return cut(bg, head, { th, strip: S, icon: now === '81°' ? 'sun' : 'rain', now }) }
})()

// ── hst229 · Your 5pm forecast: brake lights
const brakes = (() => {
  const th = THEME.heat, S = '610: RED  ·  I-10: RED  ·  59: RED  ·  FEEDER ROADS: PINK-ISH  ·  CLEARING: EVENTUALLY  ·  BEST ROUTE TO LOVE: LEAVE EARLY  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, icon: 'brake', now: '5:00', ...o })
  const C = (bg, head, o = {}) => cut(bg, head, { th, strip: S, icon: 'brake', now: '5:15', ...o })
  const radar = (k = 1, zoom = 0) => (x, t, lt) => {
    const m = MAP, mx = m.cx - 40 * (m.w / 960), my = m.cy - 30 * (m.h / 720)
    x.save(); x.beginPath(); x.rect(m.cx - m.w / 2, m.cy - m.h / 2, m.w, m.h); x.clip()
    for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2, r = 0.33 * 400 * (m.w / 960); const px = mx + Math.cos(a) * r * (1 + zoom), py = my + Math.sin(a) * r * 0.65 * (1 + zoom); x.fillStyle = `rgba(255,58,78,${(0.55 + 0.35 * Math.sin(t * 4 + i)) * k})`; x.beginPath(); x.arc(px, py, 22 * (1 + zoom), 0, Math.PI * 2); x.fill() }
    for (let i = 0; i < 14; i++) { const u = i / 14, px = m.cx - m.w / 2 + u * m.w, py = my + 10 - u * 20; x.fillStyle = `rgba(255,58,78,${(0.5 + 0.4 * Math.sin(t * 3 + i)) * k})`; x.beginPath(); x.arc(px, py, 18, 0, Math.PI * 2); x.fill() }
    x.restore()
  }
  return {
    hook: 'Your 5pm forecast: | brake lights', badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Show up early. Jan 9.', stars: ['scorpio', 'pisces', 'aries', 'taurus'] }),
    scenes: [
      { dur: 3.0, set: W('5PM RADAR', { draw: radar(1) }), front: (x, t, lt, P) => pointer(x, P, 'aries', 440, 800),
        cast: { aries: [[0, ...FC]] }, mood: { aries: 'wide' }, hops: { aries: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'aries', 'your 5pm forecast: | red. everywhere.']] },
      { dur: 3.0, set: W('HEAVY RED ON THE 610', { draw: radar(1, 0.4), now: '5:05' }), front: (x, t, lt, P) => { pointer(x, P, 'aries', 440, 640); shield(x, 160, 580, '610', 0.7) },
        cast: { aries: [[0, ...FC]] }, mood: { aries: 'squint' },
        lines: [[0.3, 2.4, 'aries', 'a strong band | over the Loop.']] },
      { dur: 3.0, set: C((x, t) => { skyline(x, 1010, t, { alpha: 0.85 }); freeway(x, 1000, 400, 2, 0); [[200, 1110], [500, 1110], [800, 1110], [350, 1300], [700, 1300]].forEach(([cx, cy], i) => car(x, cx, cy, ['#5ec8ff', '#e0a030', '#7ab07a', '#c96a8a', '#8a6ac9'][i], { brake: 1 })) }, 'LIVE: THE 610'),
        cast: { taurus: [[0, 500, 900, 210]] }, mood: { taurus: 'sleepy' },
        lines: [[0.3, 2.4, 'taurus', 'I can see | my house.']] },
      { dur: 3.0, set: C((x, t) => { street(x, t); box(x, 0, 1100, 1080, 260, '#2a2638', 0); txt(x, 'FEEDER ROAD', 840, 1130, { size: 30, col: BONE, font: MONO, weight: 700 }) }, 'LIVE: THE FEEDER'),
        cast: { virgo: [[0, -100, 1000, 210], [3.0, 300, 1000, 210]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 2.4, 'virgo', 'feeder road. | moving. slightly.']] },
      { dur: 3.0, set: W('CLEARING: EVENTUALLY', { draw: radar(0.5), now: '6:30' }),
        cast: { aries: [[0, ...FC]] }, mood: { aries: 'eyeroll' },
        lines: [[0.3, 2.4, 'aries', 'clearing | by... later.']] },
      { dur: 3.0, set: C((x, t) => { skyline(x, 1010, t, { alpha: 0.85 }); freeway(x, 1000, 400, 2, 0); car(x, 300, 1300, '#c96a8a', { brake: 1 }); car(x, 760, 1300, '#5ec8ff', { brake: 1 }) }, 'LIVE: A CAR CONCERT'),
        front: (x, t, lt, P) => { const [cx, cy] = P.at('sagittarius'); car(x, cx, 1200, '#8a6ac9', { open: true, brake: 1 }); for (let k = 0; k < 3; k++) { const ph = (t * 0.8 + k / 3) % 1; txt(x, '♪', cx + 120 + k * 40, cy - 60 - ph * 120, { size: 52, col: GOLD }) } },
        cast: { sagittarius: [[0, 540, 1085, 190]] }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.3, 0.8, 1.3, 1.8] },
        lines: [[0.3, 2.4, 'sagittarius', 'full concert | in my car.']] },
      { dur: 3.0, set: C((x, t) => bungalow(x, t, { col: '#8a6ac9' }), 'MEANWHILE: LEAVING AT 4', { now: '4:00', icon: 'sun' }),
        cast: { scorpio: [[0, 400, Y - 30, 240]] }, mood: { scorpio: 'wink' },
        lines: [[0.3, 2.4, 'scorpio', 'I leave early. | always.']] },
      { dur: 3.4, set: C((x, t) => cafe(x, t, { wall: '#c96a5a', sign: 'HALFWAY COFFEE' }), 'LIVE: ON TIME. EARLY, EVEN.', { now: '4:55', icon: 'heart' }),
        back: (x, t, lt) => { if (lt > 1.6) hearts(x, t, 540, 930, t - lt + 1.6, { n: 6, spread: 200 }) },
        cast: { scorpio: [[0, 330, Y - 30, 240]], pisces: [[0, 1250, Y - 30, 240], [0.6, 760, Y - 30, 240]] }, mood: { scorpio: 'happy', pisces: 'heart' }, look: { scorpio: [1, 0], pisces: [-1, 0] },
        lines: [[0.8, 2.4, 'pisces', "you're EARLY? | nobody's early."]] },
      lesson('aries', 'showing up early | says "I care."', th, '♥'),
      outro('aries', 'Jan 9. | leave early.', th),
    ],
  }
})()

// ── hst230 · Today's humidity, by your sign
const humid = (() => {
  const th = THEME.mint, S = 'HUMIDITY: YES  ·  SHADE: PRECIOUS  ·  ICED TEA: RECOMMENDED  ·  HUGS: STILL ALLOWED  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, icon: 'fog', now: '98%', ...o })
  const duo = (a, b, la, lb, va, vb, bg = (x, t) => street(x, t), head = 'BY SIGN') => ({
    dur: 3.4, set: cut((x, t, lt) => { bg(x, t, lt); meter(x, 290, 1340, 420, clamp(lt / 1.2) * va, { lab: a.toUpperCase(), col: '#5ec8ff' }); meter(x, 790, 1340, 420, clamp(lt / 1.2) * vb, { lab: b.toUpperCase(), col: '#7dffb0' }) }, head, { th, strip: S, icon: 'fog', now: '98%' }),
    front: (x, t, lt, P) => { for (const id of [a, b]) { const [cx, cy, s] = P.at(id); sweatDrops(x, cx + s * 0.3, cy - s * 0.35, t, 2) } },
    cast: { [a]: [[0, 290, 1130, 220]], [b]: [[0, 790, 1130, 220]] }, mood: { [a]: 'squint', [b]: 'squint' },
    lines: [[0.1, 1.5, a, la], [1.7, 1.5, b, lb]] })
  return {
    hook: "Today's humidity, | by your sign", badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Hugs still count. Jan 9.', stars: ['taurus', 'cancer', 'aquarius', 'pisces'] }),
    scenes: [
      { dur: 3.0, set: W('HUMIDITY BY SIGN', { map: { tint: 'rgba(125,255,176,0.16)' }, draw: (x, t) => bigNum(x, '98%', 460, 780, 1, MINT, 170) }), front: (x, t, lt, P) => pointer(x, P, 'taurus', 470, 790),
        cast: { taurus: [[0, ...FC]] }, mood: { taurus: 'squint' }, hops: { taurus: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'taurus', 'your humidity, | by your sign.']] },
      { ...duo('aries', 'leo', 'ran here. | why.', 'glowing. | not sweating.', 1, 0.9, (x, t) => bayou(x, t)), mood: { aries: 'wide', leo: 'wink' } },
      duo('virgo', 'gemini', 'I brought | a towel.', 'changed | twice.', 0.6, 0.95, (x, t) => street(x, t)),
      { ...duo('cancer', 'pisces', 'I made you | iced tea.', "it's tears | AND sweat.", 0.7, 1, (x, t) => bungalow(x, t, { col: '#7ab0a0' })), mood: { cancer: 'happy', pisces: 'heart' } },
      { ...duo('scorpio', 'capricorn', "I don't | sweat.", 'AC set | to 68.', 0.85, 0.3, (x, t) => office(x, t, { cold: 0 })), mood: { scorpio: 'eyeroll', capricorn: 'happy' } },
      { ...duo('sagittarius', 'aquarius', 'Galveston | trip!', 'I invented | a fan hat.', 0.8, 0.5, (x, t) => beach(x, t)), mood: { sagittarius: 'sparkle', aquarius: 'sparkle' } },
      { ...duo('libra', 'taurus', 'my hair | gave up.', 'staying | inside.', 1, 0.2, (x, t) => cafe(x, t, { wall: '#5aa0a0', sign: 'ICED TEA' })), mood: { libra: 'wide', taurus: 'happy' } },
      { dur: 3.2, set: W('RELIEF: THE SHADE', { map: false, draw: (x, t) => { tree(x, 480, 1180, 2.2); x.fillStyle = 'rgba(0,0,0,0.25)'; x.beginPath(); x.ellipse(480, 1190, 300, 40, 0, 0, Math.PI * 2); x.fill() } }),
        back: (x, t, lt) => { if (lt > 1.4) hearts(x, t, 480, 860, t - lt + 1.4, { n: 6, spread: 200 }) },
        cast: { cancer: [[0, 380, 1130, 200]], aquarius: [[0, 1250, 1130, 200], [0.8, 590, 1130, 200]] }, mood: { cancer: 'happy', aquarius: lt => lt > 1.4 ? 'heart' : 'squint' }, look: { cancer: [1, 0], aquarius: [-1, 0] },
        lines: [[0.9, 2.1, 'cancer', 'room in | the shade?']] },
      lesson('taurus', 'sweaty hugs | still count.', th, '98%'),
      outro('taurus', 'Jan 9. | hugs still count.', th),
    ],
  }
})()

// ── hst231 · Tonight's sunset: bring someone
const sunset = (() => {
  const th = THEME.dusk, S = 'SUNSET: 10/10  ·  BEST VIEWS: THE BAYOU, THE PARK LAKE, THE SEAWALL, A GARAGE ROOF  ·  BRING SOMEONE  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, icon: 'sunset', now: '10/10', ...o })
  const C = (bg, head) => cut(bg, head, { th, strip: S, icon: 'sunset', now: '10/10' })
  const roof = (x, t) => { const g = x.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#3a1a5a'); g.addColorStop(1, '#ff8a5a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#ffd36b'; x.beginPath(); x.arc(760, 1060, 120, Math.PI, 0); x.fill(); skyline(x, 1100, t, { alpha: 0.9, col: '#2a1d52' }); box(x, 0, 1160, 1080, 300, '#6a6a7a', 6); for (let k = 0; k < 6; k++) { x.fillStyle = BONE; x.fillRect(60 + k * 180, 1250, 100, 8) } box(x, 0, 1140, 1080, 24, '#8f96a0', 4) }
  const spots = (lt) => (x, t) => [[[250, 700], 'THE PARK LAKE'], [[520, 600], 'THE BAYOU'], [P2M(PL.galveston), 'THE SEAWALL'], [[560, 900], 'A GARAGE ROOF']].forEach(([[px, py], lab], i) => { const k = Kp(lt, 0.2 + i * 0.4); wxIcon(x, 'sunset', px, py, 0.6, t, k); if (k > 0) txt(x, lab, px, py + 50, { size: 24, col: BONE, font: MONO, weight: 700 }) })
  return {
    hook: "Tonight's sunset: | bring someone", badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Bring someone. Jan 9.', stars: ['pisces', 'leo', 'sagittarius', 'cancer'] }),
    scenes: [
      { dur: 3.0, set: W('SUNSET OUTLOOK: 10/10', { map: { tint: 'rgba(255,140,90,0.25)' }, draw: (x, t) => wxIcon(x, 'sunset', 470, 800, 2.2, t) }), front: (x, t, lt, P) => pointer(x, P, 'pisces', 470, 800),
        cast: { pisces: [[0, ...FC]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.05, 0.5, 1.4] },
        lines: [[0.3, 2.5, 'pisces', "tonight's sunset? | bring someone."]] },
      { dur: 3.0, set: C((x, t) => bayou(x, t, { dusk: 1 }), 'SPOT 1: THE BAYOU'),
        cast: { libra: [[0, 330, Y - 30, 230]], aries: [[0, -150, Y - 30, 230], [1.0, 760, Y - 30, 230]] }, mood: { libra: 'happy', aries: 'sparkle' }, look: { libra: [1, 0], aries: [-1, 0] },
        lines: [[1.1, 1.7, 'aries', 'run club, | then sunset?']] },
      { dur: 3.2, set: C((x, t) => { park(x, t); x.fillStyle = 'rgba(255,140,90,0.3)'; x.fillRect(0, 0, 1080, FLOOR) }, 'SPOT 2: THE PARK LAKE'), front: (x, t, lt, P) => { const [cx] = P.at('cancer'); paddle(x, cx + 120, 1250, t) },
        cast: { cancer: [[0, 420, 1150, 190]], taurus: [[0, 600, 1150, 190]] }, mood: { cancer: 'heart', taurus: 'happy' }, look: { cancer: [1, 0], taurus: [-1, 0] },
        lines: [[0.3, 2.5, 'taurus', 'paddle | slower.']] },
      { dur: 3.2, set: W('THE BEST VIEWS TONIGHT', { draw: (x, t, lt) => spots(lt)(x, t) }), front: (x, t, lt, P) => pointer(x, P, 'pisces', ...P2M(PL.galveston)),
        cast: { pisces: [[0, ...FC]] }, mood: { pisces: 'sparkle' },
        lines: [[0.3, 2.6, 'pisces', 'four spots. | all free.']] },
      { dur: 3.0, set: C(roof, 'SPOT 3: A GARAGE ROOF'),
        cast: { scorpio: [[0, 380, 1060, 220]], virgo: [[0, 700, 1060, 220]] }, mood: { scorpio: 'wink', virgo: 'heart' }, look: { scorpio: [1, 0], virgo: [-1, 0] },
        lines: [[0.3, 2.4, 'scorpio', 'best view | in town.']] },
      { dur: 3.0, set: C((x, t) => beach(x, t, { dusk: 1 }), 'SPOT 4: THE SEAWALL'),
        cast: { gemini: [[0, 540, Y - 20, 240]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.4, 1.0] },
        lines: [[0.3, 2.4, 'gemini', "the water's | GOLD!"]] },
      { dur: 3.0, set: W('YOUR FORECASTER IS FINE', { map: { tint: 'rgba(255,140,90,0.25)' } }),
        cast: { pisces: [[0, 540, 1100, 260]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 1.1, 1.9] },
        lines: [[0.3, 2.4, 'pisces', "I'm not crying. | it's the forecast."]] },
      { dur: 3.4, set: C((x, t) => bayou(x, t, { dusk: 1 }), 'LIVE: ROOM FOR ONE MORE'),
        back: (x, t, lt) => { if (lt > 1.8) hearts(x, t, 540, 930, t - lt + 1.8, { n: 6, spread: 200 }) },
        cast: { sagittarius: [[0, 360, Y - 30, 230]], leo: [[0, 1250, Y - 30, 230], [0.8, 720, Y - 30, 230]] }, mood: { sagittarius: lt => lt > 1.8 ? 'heart' : 'neutral', leo: 'happy' }, look: { sagittarius: [1, 0], leo: [-1, 0] },
        lines: [[0.9, 2.2, 'leo', 'room for | one more?']] },
      lesson('pisces', 'the plan can be simple: | look at the sky together.', th, '10/10'),
      outro('pisces', 'Jan 9. | bring someone.', th),
    ],
  }
  function paddle(x, cx, cy, t) { box(x, cx - 170, cy - 30, 340, 60, '#ffd36b', 5); x.fillStyle = INK; x.beginPath(); x.arc(cx + 150, cy, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; for (let k = 0; k < 4; k++) { const a = t * 4 + k * Math.PI / 2; x.fillRect(cx + 150 + Math.cos(a) * 20 - 4, cy + Math.sin(a) * 20 - 4, 8, 8) } }
})()

// ── hst232 · The Jan 9 forecast for your outfit
const outfit = (() => {
  const th = THEME.gold, S = 'JAN 9 WEATHER: UNKNOWN  ·  OUTFIT: READY ANYWAY  ·  LAYERS: ADVISED  ·  SANDALS AND A BEANIE: ACCEPTED  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, icon: 'cloud', now: '??°', ...o })
  const C = (bg, head) => cut(bg, head, { th, strip: S, icon: 'cloud', now: '??°' })
  const beanie = (x, P, id, col = '#e05a3a') => { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.3, cy - s * 0.62, s * 0.6, s * 0.16, col, 4); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy - s * 0.66, s * 0.07, 0, Math.PI * 2); x.fill() }
  const shorts = (x, P, id) => { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.3, cy + s * 0.14, s * 0.26, s * 0.18, '#5ec8ff', 4); box(x, cx + s * 0.04, cy + s * 0.14, s * 0.26, s * 0.18, '#5ec8ff', 4) }
  const puff = (x, P, id) => { const [cx, cy, s] = P.at(id); for (let k = 0; k < 2; k++) box(x, cx - s * 0.36, cy + s * 0.04 + k * s * 0.13, s * 0.72, s * 0.12, '#e05a3a', 4) }
  return {
    hook: 'The Jan 9 forecast | for your outfit', badge: BADGE, cues: [...STING], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Wear the layers. Jan 9.', stars: ['leo', 'aquarius', 'cancer', 'virgo'] }),
    scenes: [
      { dur: 3.0, set: W('JAN 9: OUTFIT FORECAST', { draw: (x, t) => bigNum(x, '?', 460, 790, 1 + 0.05 * Math.sin(t * 4), GOLD, 320) }), front: (x, t, lt, P) => pointer(x, P, 'sagittarius', 470, 800),
        cast: { sagittarius: [[0, ...FC]] }, mood: { sagittarius: 'wide' }, hops: { sagittarius: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'sagittarius', 'Jan 9 weather? | nobody knows.']] },
      { dur: 3.4, set: W('OUTFIT PROBABILITY', { map: false, draw: (x, t, lt) => { [['PUFFER', 0.6, '#e05a3a'], ['SHORTS', 0.7, '#5ec8ff'], ['BOTH', 1, GOLD]].forEach(([lab, v, c], i) => meter(x, 520, 640 + i * 150, 760, clamp((lt - i * 0.4) / 0.8) * v, { lab, col: c })) } }),
        cast: { sagittarius: [[0, 900, 1240, 200]] }, mood: { sagittarius: 'squint' },
        lines: [[0.3, 2.8, 'sagittarius', 'most likely: | both.']] },
      { dur: 3.0, set: C((x, t) => street(x, t), 'LIVE: BOTH, AT ONCE'), front: (x, t, lt, P) => { puff(x, P, 'leo'); shorts(x, P, 'leo'); beanie(x, P, 'leo') },
        cast: { leo: [[0, 540, Y - 30, 260]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.6, 1.8] },
        lines: [[0.3, 2.4, 'leo', 'puffer AND | shorts. a look.']] },
      { dur: 3.0, set: C((x, t) => bungalow(x, t, { col: '#d0a060' }), 'LIVE: THE PACKING LIST'), front: (x, t, lt, P) => clipboard(x, P, 'virgo', 1),
        cast: { virgo: [[0, 400, Y - 30, 250]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 2.4, 'virgo', 'three layers | and a fan.']] },
      { dur: 3.0, set: C((x, t) => street(x, t), 'LIVE: A HOUSTON WINTER FIT'), front: (x, t, lt, P) => { beanie(x, P, 'aquarius', '#7a3fb0'); const [cx, cy, s] = P.at('aquarius'); for (const d of [-1, 1]) box(x, cx + d * s * 0.2 - 30, cy + s * 0.42, 60, 16, '#c98e5a', 3) },
        cast: { aquarius: [[0, 540, Y - 40, 260]] }, mood: { aquarius: 'sparkle' },
        lines: [[0.3, 2.4, 'aquarius', 'beanie. | sandals. done.']] },
      { dur: 3.2, set: W('COULD BE 80. COULD BE 50.', { map: (lt) => ({ heat: 0.5 + 0.5 * Math.sin(lt * 3) }), now: '50–80°' }), front: (x, t, lt, P) => pointer(x, P, 'sagittarius', 470, 800),
        cast: { sagittarius: [[0, ...FC]] }, mood: { sagittarius: 'eyeroll' },
        lines: [[0.3, 2.6, 'sagittarius', 'could be 80. | could be 50.']] },
      { dur: 3.0, set: C((x, t) => cafe(x, t, { wall: '#c98a1a', sign: 'THE GROUP CHAT' }), 'LIVE: EXTRAS FOR Y\'ALL'), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); for (let k = 0; k < 3; k++) box(x, cx + s * 0.35 + k * 14, cy - 20 + k * 30, 120, 26, ['#c96a8a', '#5a7ab0', '#7ab07a'][k], 3) },
        cast: { cancer: [[0, 380, Y - 30, 250]] }, mood: { cancer: 'happy' },
        lines: [[0.3, 2.4, 'cancer', 'extra sweaters | for y\'all.']] },
      { dur: 3.2, set: C((x, t) => street(x, t, { night: true }), 'LIVE: READY'),
        back: (x, t, lt) => { if (lt > 0.8) sparkles(x, t, 540, 1000, t - lt + 0.8, 14, 380, 6) },
        front: (x, t, lt, P) => { puff(x, P, 'leo'); beanie(x, P, 'aquarius', '#7a3fb0'); shorts(x, P, 'virgo') },
        cast: { leo: [[0, 200, Y - 30, 200]], aquarius: [[0, 420, Y - 30, 200]], cancer: [[0, 640, Y - 30, 200]], virgo: [[0, 870, Y - 30, 200]] }, mood: { leo: 'sparkle', aquarius: 'happy', cancer: 'heart', virgo: 'wink' }, hops: { leo: [0.3], aquarius: [0.45], cancer: [0.6], virgo: [0.75] },
        lines: [[0.8, 2.2, 'cancer', 'every forecast: | covered.']] },
      lesson('sagittarius', 'layers are | a love language.', th, '??°'),
      outro('sagittarius', 'Jan 9. | wear the layers.', th),
    ],
  }
})()

// ── hst233 · A Gulf breeze is headed for your love life
const breeze = (() => {
  const th = THEME.blue, S = 'GULF BREEZE: MOVING NORTH  ·  CLEAR LAKE: BREEZY  ·  PEARLAND: BREEZY  ·  MIDTOWN: NOTES IN THE AIR  ·  THE WOODLANDS: STILL WAITING  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, icon: 'wind', now: 'BREEZY', ...o })
  const C = (bg, head, o = {}) => cut(bg, head, { th, strip: S, icon: 'wind', now: 'BREEZY', ...o })
  const arrows = (p) => (x, t) => { const [gx, gy] = P2M(PL.galveston), [wx, wy] = P2M(PL.woodlands); for (let k = 0; k < 6; k++) { const u = clamp(p - k * 0.08), px = gx + (wx - gx) * u, py = gy + (wy - gy) * u + (k % 2 ? 30 : -30); if (u > 0) wxIcon(x, 'wind', px, py, 0.8, t) } }
  const note = (x, cx, cy, t, text) => { x.save(); x.translate(cx, cy); x.rotate(0.15 * Math.sin(t * 3)); box(x, -140, -80, 280, 160, BONE, 5); const L = text.split(' | '); L.forEach((l, j) => txt(x, l, 0, (j - (L.length - 1) / 2) * 44, { size: 36 })); x.restore() }
  const wind = (x, t) => { for (let k = 0; k < 10; k++) { const ph = (t * 0.9 + k / 10) % 1; x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 6; x.beginPath(); x.moveTo(ph * 1300 - 200, 400 + k * 90); x.lineTo(ph * 1300 - 60, 400 + k * 90); x.stroke() } }
  return {
    hook: 'A Gulf breeze is | headed for your | love life', badge: BADGE, cues: [...STING, ['whoosh', 13.0, 0.6, 0.02]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Say hi first. Jan 9.', stars: ['gemini', 'virgo', 'aquarius', 'scorpio'] }),
    scenes: [
      { dur: 3.0, set: W('GULF BREEZE: INCOMING', { draw: (x, t, lt) => arrows(0.3 + lt * 0.1)(x, t) }), front: (x, t, lt, P) => pointer(x, P, 'aquarius', ...P2M(PL.galveston)),
        cast: { aquarius: [[0, ...FC]] }, mood: { aquarius: 'sparkle' }, hops: { aquarius: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'aquarius', 'a Gulf breeze | is headed your way.']] },
      { dur: 3.0, set: C((x, t) => { beach(x, t); for (let k = 0; k < 3; k++) { box(x, 120 + k * 300, FLOOR - 240, 140, 40, BONE, 4); box(x, 186 + k * 300, FLOOR - 400, 8, 160, '#8f96a0', 2) } wind(x, t) }, 'LIVE: CLEAR LAKE'),
        cast: { capricorn: [[0, 540, Y - 20, 240]] }, mood: { capricorn: 'happy' },
        lines: [[0.3, 2.4, 'capricorn', 'finally. | air.']] },
      { dur: 3.0, set: C((x, t) => { bungalow(x, t, { col: '#a0c080' }); wind(x, t) }, 'LIVE: PEARLAND'),
        cast: { taurus: [[0, 540, Y - 30, 250]] }, mood: { taurus: 'sparkle' }, hops: { taurus: [0.5, 1.5] },
        lines: [[0.3, 2.4, 'taurus', 'my hair | is MOVING.']] },
      { dur: 3.0, set: W('IT IS CARRYING SOMETHING', { draw: (x, t, lt) => { arrows(0.6)(x, t); const [px, py] = P2M(PL.midtown); wxIcon(x, 'heart', px, py - 40, 0.6, t, Kp(lt, 0.6)) } }),
        cast: { aquarius: [[0, ...FC]] }, mood: { aquarius: 'wide' },
        lines: [[0.3, 2.4, 'aquarius', "it's carrying | something."]] },
      { dur: 3.4, set: C((x, t, lt) => { street(x, t); wind(x, t) }, 'LIVE: MIDTOWN'), front: (x, t, lt) => note(x, 120 + clamp(lt / 1.0) * 600, 760 + 30 * Math.sin(t * 3), t, 'hi from | Pearland'),
        cast: { gemini: [[0, 360, Y - 30, 240]] }, mood: { gemini: lt => lt > 1.0 ? 'sparkle' : 'neutral' },
        lines: [[1.2, 2.0, 'gemini', "a note? | 'hi from Pearland.'"]] },
      { dur: 3.2, set: C((x, t, lt) => { bungalow(x, t, { col: '#7ab0a0' }); wind(x, t) }, 'LIVE: THE HEIGHTS'), front: (x, t, lt) => note(x, 760, 820, t, 'hi back! | ♥ Heights'),
        cast: { virgo: [[0, 360, Y - 30, 240]] }, mood: { virgo: 'wide' },
        lines: [[0.3, 2.6, 'virgo', 'oh no. | this is a whole thing.']] },
      { dur: 3.0, set: W('BREEZE ENDS NEAR THE WOODLANDS', { draw: (x, t) => { arrows(1)(x, t); const [px, py] = P2M(PL.woodlands); x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.arc(px, py, 50, 0, Math.PI * 2); x.stroke() } }), front: (x, t, lt, P) => pointer(x, P, 'aquarius', ...P2M(PL.woodlands)),
        cast: { aquarius: [[0, ...FC]] }, mood: { aquarius: 'squint' },
        lines: [[0.3, 2.4, 'aquarius', 'and it stops | at the Woodlands.']] },
      { dur: 3.0, set: C((x, t) => { park(x, t, { lake: false }); for (const cx of [200, 880]) tree(x, cx, FLOOR, 1.4) }, 'LIVE: THE WOODLANDS'),
        cast: { scorpio: [[0, 540, Y - 30, 250]] }, mood: { scorpio: 'eyeroll' },
        lines: [[0.3, 2.4, 'scorpio', 'nothing | reaches us here.']] },
      lesson('aquarius', "say hi. the wind | won't do it for you.", th, 'BREEZY'),
      outro('aquarius', 'Jan 9. | say hi in person.', th),
    ],
  }
})()

// ── hst234 · This cold front is dating the Gulf air
const fronts = (() => {
  const th = THEME.rose, S = 'COLD FRONT: FROM THE NORTH  ·  GULF AIR: WARM  ·  CHEMISTRY: HIGH  ·  LIGHT RAIN, THEN CALM  ·  OUTFIT CHANGES: SEVERAL  ·  '
  const W = (head, o = {}) => wall(head, { th, strip: S, icon: 'heart', now: '♥', ...o })
  const C = (bg, head, o = {}) => cut(bg, head, { th, strip: S, icon: 'heart', now: '♥', ...o })
  const scarf = (x, P, id) => { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.32, cy + s * 0.1, s * 0.64, s * 0.1, '#5ec8ff', 4); box(x, cx + s * 0.12, cy + s * 0.16, s * 0.1, s * 0.22, '#5ec8ff', 3) }
  const glow = (x, P, id) => { const [cx, cy, s] = P.at(id); const g = x.createRadialGradient(cx, cy, s * 0.2, cx, cy, s * 0.9); g.addColorStop(0, 'rgba(255,150,80,0.45)'); g.addColorStop(1, 'rgba(255,150,80,0)'); x.fillStyle = g; x.fillRect(cx - s, cy - s, 2 * s, 2 * s) }
  const meet = (p) => (x, t) => { const m = MAP, y0 = m.cy - m.h / 2 + 40, y1 = m.cy + m.h / 2 - 40, cy = lerpN(y0 + 40, m.cy - 30, p), wy = lerpN(y1 - 40, m.cy + 30, p); front(x, m.cx - m.w / 2 + 20, cy, m.cx + m.w / 2 - 20, cy + 30, 'cold', 8); front(x, m.cx - m.w / 2 + 20, wy, m.cx + m.w / 2 - 20, wy - 30, 'warm', 8); if (p >= 1) { for (let k = 0; k < 6; k++) wxIcon(x, 'heart', m.cx - 300 + k * 120, m.cy, 0.35, t) } }
  function lerpN(a, b, u) { return a + (b - a) * clamp(u) }
  return {
    hook: 'This cold front | is dating the | Gulf air', badge: BADGE, cues: [...STING, ['riser', 9.2, 11.4, 0.05], ['boom', 11.5, 0.2]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Bring your opposite. Jan 9.', stars: ['capricorn', 'leo', 'cancer', 'pisces'] }),
    scenes: [
      { dur: 3.0, set: W('TONIGHT: A WEATHER ROMANCE', { draw: (x, t) => meet(0.2)(x, t) }), front: (x, t, lt, P) => pointer(x, P, 'cancer', 500, 600),
        cast: { cancer: [[0, ...FC]] }, mood: { cancer: 'heart' }, hops: { cancer: [0.05, 0.5] },
        lines: [[0.3, 2.5, 'cancer', 'big romance | over your city tonight.']] },
      { dur: 3.2, set: W('TWO SYSTEMS APPROACH', { draw: (x, t, lt) => meet(0.2 + 0.5 * lt / 3.2)(x, t) }), front: (x, t, lt, P) => pointer(x, P, 'cancer', 500, 1000),
        cast: { cancer: [[0, ...FC]] }, mood: { cancer: 'sparkle' },
        lines: [[0.2, 1.4, 'cancer', 'one from | up north.'], [1.7, 1.4, 'cancer', 'one from | the Gulf.']] },
      { dur: 3.2, set: C((x, t) => street(x, t), 'LIVE: THE FIRST MEETING'), front: (x, t, lt, P) => { scarf(x, P, 'capricorn') }, back: (x, t, lt, P) => glow(x, P, 'leo'),
        cast: { capricorn: [[0, 300, Y - 30, 240], [1.0, 400, Y - 30, 240]], leo: [[0, 800, Y - 30, 240], [1.0, 680, Y - 30, 240]] }, mood: { capricorn: 'wide', leo: 'wink' }, look: { capricorn: [1, 0], leo: [-1, 0] },
        lines: [[0.2, 1.3, 'capricorn', "you're | so warm."], [1.6, 1.4, 'leo', "you're | so chill."]] },
      { dur: 3.0, set: W('CONTACT', { draw: (x, t, lt) => { meet(1)(x, t); if (lt > 0.3) sparkles(x, t, 500, 820, t - lt + 0.3, 16, 380, 9) } }),
        cast: { cancer: [[0, ...FC]] }, mood: { cancer: 'wide' },
        lines: [[0.4, 2.3, 'cancer', 'and... | chemistry.']] },
      { dur: 3.2, set: C((x, t) => { street(x, t, { night: true }); for (let i = 0; i < 40; i++) { const px = (i * 61) % 1080, py = ((i * 137 + t * 700) % 1300); x.fillStyle = 'rgba(143,227,255,0.6)'; x.fillRect(px, py, 5, 22) } }, 'LIVE: A LIGHT RAIN'), front: (x, t, lt, P) => scarf(x, P, 'capricorn'), back: (x, t, lt, P) => glow(x, P, 'leo'),
        cast: { capricorn: [[0, 340, Y - 30, 230], [1.6, 400, Y - 50, 230], [3.2, 340, Y - 30, 230]], leo: [[0, 740, Y - 30, 230], [1.6, 680, Y - 50, 230], [3.2, 740, Y - 30, 230]] }, mood: { capricorn: 'heart', leo: 'heart' }, hops: { capricorn: [0.4, 1.2, 2.0], leo: [0.6, 1.4, 2.2] },
        lines: [[0.3, 2.6, 'leo', 'dance in | the drizzle?']] },
      { dur: 3.0, set: C((x, t) => { street(x, t, { night: true }); for (let i = 0; i < 30; i++) { const px = (i * 61) % 1080, py = ((i * 137 + t * 700) % 1300); x.fillStyle = 'rgba(143,227,255,0.6)'; x.fillRect(px, py, 5, 22) } }, 'LIVE: A WITNESS'), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('pisces'); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy - s * 0.65, s * 0.62, Math.PI, 0); x.fill(); x.fillStyle = '#ff8fb1'; x.beginPath(); x.arc(cx, cy - s * 0.65, s * 0.56, Math.PI, 0); x.fill(); box(x, cx - 4, cy - s * 0.65, 8, s * 0.6, INK, 0) },
        cast: { pisces: [[0, 540, Y - 30, 230]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.3, 1.2] },
        lines: [[0.3, 2.4, 'pisces', "it's | beautiful."]] },
      { dur: 3.0, set: C((x, t, lt) => bungalow(x, t, { col: '#c0a0d0' }), 'TEMPERATURE: ALL OVER', { now: '80° → 55°' }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('taurus'); const k = Math.floor(lt * 1.4) % 3; box(x, cx - s * 0.32, cy + s * 0.1, s * 0.64, s * 0.24, ['#e05a3a', '#5ec8ff', '#7ab07a'][k], 4) },
        cast: { taurus: [[0, 540, Y - 30, 250]] }, mood: { taurus: 'eyeroll' },
        lines: [[0.3, 2.4, 'taurus', 'I changed | three times.']] },
      { dur: 3.0, set: W('BY MORNING: BALANCED', { now: 'MILD', map: { tint: 'rgba(255,143,177,0.12)' }, draw: (x, t) => { for (let k = 0; k < 6; k++) wxIcon(x, 'heart', 220 + k * 110, 820 + 20 * Math.sin(t * 2 + k), 0.4, t) } }),
        cast: { cancer: [[0, ...FC]] }, mood: { cancer: 'heart' },
        lines: [[0.3, 2.4, 'cancer', 'by morning? | they found balance.']] },
      lesson('cancer', "you don't have to match. | you have to meet.", th, '♥'),
      outro('cancer', 'Jan 9. | bring your opposite.', th),
    ],
  }
})()

// ── hst235 · Your 10-day forecast ends at a party
const tenday = (() => {
  const th = THEME.dusk, S = 'DAY 1 TO DAY 9: GETTING READY  ·  DAY 10: JAN 9, THE HOUSTON BETA PARTY  ·  FORECAST: SHOW UP  ·  '
  const DAYS = [['DAY 1', 'sun', 'GO'], ['DAY 2', 'sun', 'GO'], ['DAY 3', 'cloud', 'PLAN'], ['DAY 4', 'cloud', 'PLAN'], ['DAY 5', 'wind', 'CHAT'], ['DAY 6', 'wind', 'CHAT'], ['DAY 7', 'sun', 'LIST'], ['DAY 8', 'drizzle', 'NERVES'], ['DAY 9', 'sun', 'FIT'], ['JAN 9', 'heart', 'PARTY', PINK]]
  const board = (cur, k = 1) => (x, t) => { strip5(x, t, DAYS.slice(0, 5), 640, { k, cur: cur < 5 ? cur : -1, h: 250 }); strip5(x, t, DAYS.slice(5), 920, { k, cur: cur >= 5 ? cur - 5 : -1, h: 250 }) }
  const W = (head, cur, o = {}) => wall(head, { th, strip: S, icon: DAYS[Math.max(0, cur)][1], now: cur >= 0 ? DAYS[cur][0] : '10 DAYS', map: false, draw: board(cur), ...o })
  const day = (cur, sign, line, mood, bg, head) => ({ dur: 3.0, set: cut((x, t, lt) => { bg(x, t, lt); box(x, 60, 470, 260, 90, '#1a0c3a', 5); txt(x, DAYS[cur][0], 190, 515, { size: 44, col: GOLD, font: MONO, weight: 700 }) }, head, { th, strip: S, icon: DAYS[cur][1], now: DAYS[cur][0] }), cast: { [sign]: [[0, 540, Y - 30, 250]] }, mood: { [sign]: mood }, hops: { [sign]: [0.3] }, lines: [[0.3, 2.4, sign, line]] })
  return {
    hook: 'Your 10-day | forecast ends | at a party', badge: BADGE, cues: [...STING, ['glitter', 24.2, 25.0]], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Forecast: you, there. Jan 9.', stars: ['scorpio', 'aries', 'leo', 'pisces'] }),
    scenes: [
      { dur: 3.2, set: (x, t, lt) => W('YOUR 10-DAY OUTLOOK', -1, { draw: board(-1, clamp(lt / 1.2 + 0.3)) })(x, t, lt),
        cast: { scorpio: [[0, 900, 1270, 190]] }, mood: { scorpio: 'wink' }, hops: { scorpio: [0.05, 0.5] },
        lines: [[0.3, 2.6, 'scorpio', 'your 10 days. | it ends at a party.']] },
      day(0, 'aries', 'new year | energy!', 'sparkle', (x, t) => { bayou(x, t); heatSun(x, 860, 520, t, 70) }, 'DAY 1: SUNNY, MOTIVATED'),
      day(2, 'taurus', 'planning | the outfit.', 'squint', (x, t) => bungalow(x, t, { col: '#c0a0d0' }), 'DAY 3: CLOUDY, PLANNING'),
      day(4, 'gemini', 'group chat: | very active.', 'wide', (x, t) => street(x, t), 'DAY 5: WINDY GROUP CHAT'),
      day(6, 'virgo', 'the checklist | is ready.', 'happy', (x, t) => cafe(x, t, { wall: '#6a5a9a', sign: 'LIST' }), 'DAY 7: CLEAR, ORGANIZED'),
      { ...day(7, 'pisces', 'nervous | happy crying.', 'heart', (x, t) => park(x, t), 'DAY 8: LIGHT DRIZZLE (PISCES)'), hops: { pisces: [0.3, 1.2] } },
      day(8, 'leo', 'outfit | reveal.', 'sparkle', (x, t) => street(x, t, { night: true }), 'DAY 9: SUNNY, SHINING'),
      { dur: 3.4, set: (x, t, lt) => W('DAY 10: JAN 9', 9)(x, t, lt), back: (x, t, lt) => { if (lt > 0.4) sparkles(x, t, 540, 950, t - lt + 0.4, 16, 420, 7) },
        cast: { scorpio: [[0, 900, 1270, 190]] }, mood: { scorpio: 'heart' }, hops: { scorpio: [0.4, 1.2] },
        lines: [[0.3, 2.8, 'scorpio', 'day 10: | the beta party.']] },
      lesson('scorpio', 'whatever the forecast, | show up.', th, 'JAN 9'),
      outro('scorpio', 'see you | Jan 9.', th),
    ],
  }
})()

export const WX = { hst230: humid, hst231: sunset, hst232: outfit, hst233: breeze, hst234: fronts, hst235: tenday, hst224: hair, hst225: seasons, hst226: ac, hst227: lovebugs, hst228: popup, hst229: brakes }
