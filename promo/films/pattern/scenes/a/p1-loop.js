// P1 · THE LOOP (0–8.0). Cold, dark room. Frame 0: a profile card — the type (dark tee, the chain, that look) with the
// same three red-flag chips. "You keep falling / for the same person." Every ~0.9s a new card is dealt on top: a new
// face, a new name, the SAME three red flags; the old ones sink into a pile behind. Then a generic chat thread on a
// phone replays the same ending under a different name each time (Jun → Theo → Cole → Kofi → Dev), faster and faster:
// "you're honestly amazing" / "so… what are we?" / "it's not you, it's me." — "Different name. / Same ending."
// The screen goes dark at 7.6–7.82; p2 picks up from the dark room at 7.85.
import { clamp, lerp, prog, ease, noise1, el } from '../../../../src/lib.js'
import { W, H, SANS, MONO, fill } from '../../../../src/scenes/common.js'
import { BONE, ROOM_BG, PEOPLE, PHOTO, COLD_FILTER, grainLayer, words, capStyle, makeProfileCard } from './common.js'

export const P1_END = 8.0
// ── part 1: the pile of cards
const CX = 560, CY = 548, S1 = 0.95
const ARR = [-1, 1.05, 1.95, 2.75]                 // card k is dealt on top at ARR[k] (card 0 is there from frame 0)
const DEAL = 0.34
const ROT = [-1.2, 1.4, -0.6, 0.9]
const PILE_OUT0 = 3.5, PILE_OUT1 = 3.9
// ── part 2: the phone
const PHONE_IN0 = 3.72, PHONE_IN1 = 4.15
const CYC = [4.0, 5.6, 6.45, 7.05, 7.48]             // header + thread replaced at each
const SCREEN_OFF0 = 7.6, SCREEN_OFF1 = 7.82
const PW = 600, PH = 1300
const PX = 560, PY = 568, PS = 0.84, PR = -2

const ME_BG = '#34425c', THEM_BG = '#1d2129'
const bubbleCss = (me) => ({ position: 'absolute', [me ? 'right' : 'left']: '28px', maxWidth: '420px', padding: '16px 26px', borderRadius: '30px',
  [me ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '10px', background: me ? ME_BG : THEM_BG,
  fontFamily: SANS, fontSize: '33px', lineHeight: 1.3, color: me ? '#eef1f6' : '#d6d9e0', fontWeight: 400, transformOrigin: me ? '100% 100%' : '0 100%' })
const STAMPS = [['FEB 27 · 9:02 PM', 'MAR 2 · 11:48 PM'], ['AUG 16 · 8:40 PM', 'AUG 19 · 1:12 AM'], ['JAN 4 · 9:15 PM', 'JAN 7 · 12:30 AM'],
  ['JUN 27 · 10:02 PM', 'JUN 30 · 2:04 AM'], ['SEP 30 · 8:55 PM', 'OCT 3 · 11:57 PM']]
const CLOCK = STAMPS.map(s => s[1].split('· ')[1].replace(/ [AP]M/, ''))

/** bubble times for cycle k: the last three land, faster each cycle */
function bubbleTimes(k) {
  const c = CYC[k], n = k + 1 < CYC.length ? CYC[k + 1] : 7.6
  if (k === CYC.length - 1) return [c + 0.02, c + 0.02, c + 0.04]
  const lead = k === 0 ? 0.25 : 0.12, span = n - c - lead - (k === 0 ? 0.55 : 0.2)
  return [c + lead, c + lead + span / 2, c + lead + span]
}

export default async function build(stage) {
  const root = fill(stage, { background: ROOM_BG })
  // the room: near-black, a cold spill of light behind the card/phone
  const spill = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px',
    background: 'radial-gradient(40% 62% at 29% 52%, rgba(120,140,180,0.2) 0%, rgba(60,72,98,0.09) 45%, rgba(8,9,12,0) 100%)' }, root)

  // ── the pile
  const pile = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, root)
  const cards = ARR.map((a, k) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(10 + k) }, pile)
    return { holder, a, ...makeProfileCard(holder, PEOPLE[k]) }
  })

  // ── the phone
  const world = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformOrigin: '0 0' }, root)
  const phone = el('div', { position: 'absolute', left: '-14px', top: '-14px', width: PW + 28 + 'px', height: PH + 28 + 'px', borderRadius: '84px',
    background: 'linear-gradient(160deg, #2a2e36 0%, #111318 40%, #0b0c10 100%)', boxShadow: '0 40px 120px rgba(0,0,0,0.7), inset 0 0 0 2px rgba(190,200,220,0.12)' }, world)
  const screen = el('div', { position: 'absolute', left: '14px', top: '14px', width: PW + 'px', height: PH + 'px', borderRadius: '70px', overflow: 'hidden', background: '#0c0e12' }, phone)
  const content = el('div', { position: 'absolute', inset: 0 }, screen)
  el('div', { position: 'absolute', inset: 0, borderRadius: '70px', pointerEvents: 'none',
    background: 'linear-gradient(118deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.03) 100%)' }, screen)
  // status bar
  const status = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: '70px', zIndex: 5 }, content)
  const clock = el('div', { position: 'absolute', left: '56px', top: '24px', fontFamily: SANS, fontWeight: 600, fontSize: '25px', color: '#d9dce3' }, status, '11:48')
  const bars = el('div', { position: 'absolute', right: '120px', top: '30px', display: 'flex', gap: '4px', alignItems: 'flex-end' }, status)
  for (let i = 0; i < 4; i++) el('div', { width: '6px', height: 8 + i * 4 + 'px', borderRadius: '2px', background: i < 3 ? '#d9dce3' : 'rgba(217,220,227,0.35)' }, bars)
  const batt = el('div', { position: 'absolute', right: '52px', top: '29px', width: '50px', height: '22px', borderRadius: '6px', border: '2px solid rgba(217,220,227,0.6)', boxSizing: 'border-box' }, status)
  el('div', { position: 'absolute', left: '2px', top: '2px', width: '9px', height: '14px', borderRadius: '3px', background: '#d9dce3' }, batt)
  // header chrome (shared): back chevron, dots, divider
  el('div', { position: 'absolute', left: '28px', top: '88px', fontFamily: SANS, fontWeight: 300, fontSize: '64px', lineHeight: 1, color: '#8a93a6' }, content, '‹')
  el('div', { position: 'absolute', right: '40px', top: '114px', fontFamily: SANS, fontSize: '40px', color: '#8a93a6', letterSpacing: '2px' }, content, '···')
  el('div', { position: 'absolute', left: 0, top: '198px', width: PW + 'px', height: '1px', background: 'rgba(255,255,255,0.07)' }, content)
  // composer (shared)
  const comp = el('div', { position: 'absolute', left: '26px', top: PH - 118 + 'px', width: PW - 52 - 84 + 'px', height: '74px', borderRadius: '37px',
    border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', boxSizing: 'border-box' }, content)
  el('div', { position: 'absolute', left: '28px', top: '19px', fontFamily: SANS, fontSize: '27px', color: '#5d6472' }, comp, 'Message')
  const send = el('div', { position: 'absolute', right: '26px', top: PH - 118 + 'px', width: '74px', height: '74px', borderRadius: '50%', background: '#232833' }, content)
  el('div', { position: 'absolute', left: '22px', top: '14px', fontFamily: SANS, fontSize: '36px', color: '#5d6472' }, send, '↑')

  // one group per cycle: header (avatar + name) + the thread. Only the name, the face and the date change.
  const groups = CYC.map((c, k) => {
    const p = PEOPLE[k % PEOPLE.length]
    const g = el('div', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: PH + 'px', opacity: 0 }, content)
    const head = el('div', { position: 'absolute', left: 0, top: '70px', width: PW + 'px', height: '128px' }, g)
    const av = el('div', { position: 'absolute', left: '82px', top: '22px', width: '84px', height: '84px', borderRadius: '50%', overflow: 'hidden', background: '#222' }, head)
    const avImg = el('img', { position: 'absolute', left: '-10%', top: '-6%', width: '120%', height: '120%', objectFit: 'cover', objectPosition: '50% 30%', filter: COLD_FILTER }, av)
    avImg.src = PHOTO(p.face)
    el('div', { position: 'absolute', inset: 0, background: 'rgba(84,110,150,0.26)', mixBlendMode: 'color' }, av)
    el('div', { position: 'absolute', left: '188px', top: '28px', fontFamily: SANS, fontWeight: 600, fontSize: '36px', color: '#eceef2' }, head, p.name.split(',')[0])
    el('div', { position: 'absolute', left: '189px', top: '76px', fontFamily: SANS, fontSize: '21px', color: '#7d8494' }, head, 'Active now')
    const msgs = el('div', { position: 'absolute', left: 0, top: '198px', width: PW + 'px', height: PH - 198 - 130 + 'px', overflow: 'hidden' }, g)
    const stamp = (text, top, o = 1) => el('div', { position: 'absolute', left: 0, width: PW + 'px', top: top + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '19px', letterSpacing: '0.12em', color: '#5d6472', opacity: o }, msgs, text)
    const bub = (me, text, top, o = 1) => el('div', { ...bubbleCss(me), top: top + 'px', opacity: o }, msgs, text)
    stamp(STAMPS[k][0], 290, 0.7)
    bub(true, 'last night was really fun', 336, 0.6)
    bub(false, 'it was :) you’re different', 430, 0.6)
    stamp(STAMPS[k][1], 566)
    const big = { fontSize: '44px', maxWidth: '540px', padding: '18px 30px', borderRadius: '36px' }
    const lands = [bub(false, 'you’re honestly amazing', 610), bub(true, 'so… what are we?', 722), bub(false, 'it’s not you, it’s me.', 834)]
    lands.forEach((b, i) => Object.assign(b.style, big, i === 2 ? { color: '#efe6d6', background: '#3a4150', boxShadow: '0 0 0 1px rgba(239,230,214,0.12)' } : {}))
    return { g, msgs, lands, times: bubbleTimes(k), c, next: k + 1 < CYC.length ? CYC[k + 1] : 99 }
  })

  // ── copy (right): "You keep falling / for the same person." then "Different name. / Same ending."
  const capBox = el('div', { position: 'absolute', left: '1000px', width: '880px', top: '414px', textAlign: 'center' }, root)
  const c1a = words(capBox, 'You keep falling', { ...capStyle(100), position: 'relative', display: 'block' }, 0.1, 0.09, 0.28)
  const c1b = words(capBox, 'for the same person.', { ...capStyle(100), position: 'relative', display: 'block' }, 0.5, 0.09, 0.28)
  const capBox2 = el('div', { position: 'absolute', left: '1000px', width: '880px', top: '414px', textAlign: 'center' }, root)
  const c2a = words(capBox2, 'Different name.', { ...capStyle(108), position: 'relative', display: 'block' }, 4.3, 0.12, 0.3)
  const c2b = words(capBox2, 'Same ending.', { ...capStyle(108), position: 'relative', display: 'block' }, 5.1, 0.12, 0.3)

  const grain = grainLayer(root)
  const lift = grainLayer(root, 0.07, '3999', 'screen')            // silver in the blacks: the dark room is never flat

  return {
    start: 0, end: P1_END, root,
    update(t) {
      const hx = (noise1(t * 0.6, 11) - 0.5) * 8, hy = (noise1(t * 0.5, 23) - 0.5) * 6     // a slow hand-held breath

      // ── the pile
      const pOut = ease.inOutCubic(prog(t, PILE_OUT0, PILE_OUT1))
      pile.style.display = pOut < 1 ? 'block' : 'none'
      if (pOut < 1) {
        cards.forEach((c, k) => {
          const arrive = c.a < 0 ? 1 : ease.outCubic(prog(t, c.a, c.a + DEAL))
          if (arrive <= 0) { c.holder.style.display = 'none'; return }
          c.holder.style.display = 'block'
          let d = 0
          for (let j = k + 1; j < cards.length; j++) d += ease.inOutCubic(prog(t, cards[j].a, cards[j].a + DEAL))
          const x = CX - 58 * d - 70 * pOut + hx, y = CY - 30 * d - 60 * (1 - arrive) + hy
          const s = S1 * (1 - 0.05 * d) * (1 + 0.07 * (1 - arrive))
          const rot = ROT[k] * (1 + 1.4 * d) + 5 * (1 - arrive)
          c.holder.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${s})`
          const br = 1 - 0.24 * d
          c.holder.style.opacity = String(arrive * clamp(br * 1.6) * (1 - pOut))
          const bl = (1 - arrive) * 8
          c.card.style.filter = [br < 1 ? `brightness(${Math.max(0.2, br).toFixed(3)})` : '', bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : ''].join(' ').trim() || 'none'
        })
      }

      // ── the phone
      const pin = ease.outCubic(prog(t, PHONE_IN0, PHONE_IN1))
      world.style.display = pin > 0 ? 'block' : 'none'
      const off = ease.inQuad(prog(t, SCREEN_OFF0, SCREEN_OFF1))
      if (pin > 0) {
        const push = lerp(PS, PS * 1.035, ease.inOutQuad(prog(t, PHONE_IN0, SCREEN_OFF0)))
        world.style.transform = `translate(${PX + hx}px, ${PY + 90 * (1 - pin) + hy}px) rotate(${PR}deg) scale(${push}) translate(${-PW / 2}px, ${-PH / 2}px)`
        world.style.opacity = String(pin * (1 - off))
        const on = (1 - 0.9 * off)
        content.style.filter = on < 0.999 ? `brightness(${on.toFixed(3)})` : 'none'
        { let ci = 0; while (ci + 1 < CYC.length && t >= CYC[ci + 1]) ci++; clock.textContent = CLOCK[ci] }
        for (const gr of groups) {
          const inn = ease.outCubic(prog(t, gr.c - 0.04, gr.c + 0.12)), out = ease.inCubic(prog(t, gr.next - 0.12, gr.next + 0.02))
          const vis = gr.c === CYC[0] ? 1 : inn
          const o = vis * (1 - out)
          gr.g.style.display = o > 0 ? 'block' : 'none'
          if (o <= 0) continue
          gr.g.style.opacity = String(o)
          gr.msgs.style.transform = `translateY(${-70 * out + 24 * (1 - vis)}px)`
          gr.lands.forEach((b, i) => {
            const a = prog(t, gr.times[i], gr.times[i] + 0.08)
            b.style.opacity = String(a)
            let sc
            if (i === 2) { const p1 = ease.outCubic(prog(t, gr.times[i], gr.times[i] + 0.12)), p2 = ease.inOutQuad(prog(t, gr.times[i] + 0.12, gr.times[i] + 0.3)); sc = lerp(lerp(0.86, 1.04, p1), 1, p2) }
            else sc = lerp(0.82, 1, clamp(ease.outBack(prog(t, gr.times[i], gr.times[i] + 0.16)), 0, 1.2))
            b.style.transform = `scale(${sc.toFixed(4)})`
          })
        }
      }
      spill.style.opacity = String((1 - off) * (0.85 + 0.15 * noise1(t * 2, 5)))

      // ── copy
      const out1 = 1 - ease.inOutQuad(prog(t, 3.48, 3.78))
      c1a.update(t, out1); c1b.update(t, out1)
      const out2 = 1 - ease.inOutQuad(prog(t, 7.42, 7.74))
      c2a.update(t, out2); c2b.update(t, out2)
      grain.update(t); lift.update(t)
      void BONE
    },
  }
}

export const cues = [
  ['tick', 0.03, 0.05],
  ['bell', 0.12, 220, 0.035, 2.6, -0.2],                                  // "You keep falling"
  ['bell', 0.52, 174.61, 0.03, 2.8, -0.1],
  ...ARR.slice(1).flatMap(a => [['whoosh', a - 0.06, 0.3, 0.05], ['tick', a + 0.1, 0.045]]),   // a new card dealt on top
  ['whoosh', PHONE_IN0, 0.45, 0.06],
  ['bell', 4.3, 196, 0.035, 2.6, 0.15],                                   // "Different name."
  ['bell', 5.1, 164.81, 0.035, 2.8, 0.1],                                 // "Same ending."
  ...CYC.flatMap((c, k) => bubbleTimes(k).map((bt, i) => ['tick', bt, i === 2 ? 0.05 : 0.025])),
  ...CYC.slice(1).map(c => ['whoosh', c - 0.1, 0.18, 0.04]),
  ['riser', 6.3, 7.5, 0.05],
  ['tick', SCREEN_OFF0, 0.07],                                            // screen off
]
