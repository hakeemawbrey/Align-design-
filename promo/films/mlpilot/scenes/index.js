// mlpilot — kit sampler (temporary: replaced by Ep 1 "The Blind Card"). Shows every mlkit piece in turn.
import { prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { buildLesson } from '../../lesson.js'
import {
  loadFonts, drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, buildTitle, buildPreviously, buildAdvise, buildNextTime, drawMysteryCard, drawBubble, drawPhone, drawPastry,
} from './mlkit.js'

export const DURATION = 30
export const CUES = []
async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const bug = showBug(root, 1)
  const cap = buildCaption(root, { text: 'Too busy | to *date.*', kicker: 'MONDAY · 6:58 PM', at: 0.2, out: [2.8, 3] })
  const title = buildTitle(root, { ep: 1, title: 'The Blind Card', at: 6, len: 3 })
  const scene = ctx => drawLane(ctx, 1, { pan: 300 }, c => drawSign(c, 'libra', 1890, standY(200), 200, 1, { mood: 'happy' }))
  const prev = buildPreviously(root, { at: 9, len: 2, stills: [{ caption: 'A blind card.', scene }, { caption: 'A hard stop.', scene }, { caption: 'Stayed.', scene }] })
  const adv = buildAdvise(root, { at: 17, out: [24.7, 25], cards: [
    { at: 17.8, icon: 'door', head: 'Make room *first.*', body: 'A full calendar can be a hiding place.' },
    { at: 19.6, icon: 'question', head: 'Curious beats *impressive.*', body: 'Ask one real question, then listen to the answer.' },
    { at: 21.4, icon: 'clock', head: 'Stay past the *hard stop.*', body: 'If it’s going well, let it run.' },
  ], lines: [{ t: 18.2, text: 'Capricorn, this one’s *yours.*' }] })
  const next = buildNextTime(root, { at: 25.5, out: [28.6, 29], teaser: 'Aries has a plan. A *big* one.' })
  const lesson = buildLesson(root, { at: 14.2, out: [16.6, 16.8], text: 'Make *room.*', chip: '+1 FREE TIME' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  return {
    start: 0, end: DURATION, root,
    update(t) {
      if (t < 3) drawLane(x, t, { pan: t * 120 }, c => {
        drawSign(c, 'capricorn', 600, standY(230), 230, t, { mood: 'neutral' })
        drawSign(c, 'gemini', 800, standY(200), 200, t, { mood: 'happy' })
        drawSign(c, 'scorpio', 1000, standY(200), 200, t, { mood: 'neutral' })
        drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 2 })
        drawMysteryCard(c, 700, 900, 160, t, { sign: 'taurus' })
      })
      else if (t < 6) drawLane(x, t, { time: 'dusk', pan: 900, lampsAt: 3.3 }, c => {
        drawSign(c, 'libra', 1890, standY(210), 210, t, { mood: 'happy' })
        drawSign(c, 'taurus', 1190, standY(200, LANE.bench.seatY), 200, t, { mood: 'happy' })
        drawBubble(c, 1600, 1000, 'is this seat taken?', { tail: 'down' })
      })
      else if (t < 12.5) { drawCafe(x, t, { chairsUp: prog(t, 11, 12.5), behind: c => drawSign(c, 'taurus', CAFE.counter.x, standY(200, CAFE.counter.y), 200, t, {}) }); drawSign(x, 'capricorn', CAFE.seats[0].x, standY(220, CAFE.seats[0].y), 220, t, {}); drawSign(x, 'virgo', CAFE.seats[1].x, standY(220, CAFE.seats[1].y), 220, t, { mood: 'happy' }); drawCafeTable(x, t, {}) }
      else if (t < 17) { drawApartment(x, t, {}); drawSign(x, 'gemini', APT.couch.seats[0], standY(220, APT.couch.seatY), 220, t, { mood: 'wink' }); drawPhone(x, 760, 700, 380, 600, t, { title: '♉︎ the date', msgs: [{ at: 13, side: 'L', text: 'hi! tonight still on?' }, { at: 13.5, side: 'R', text: 'is the café still open? I cancelled my 9 PM.' }] }) }
      else drawSky(x, t, SKY_H)
      cap.update(t); title.update(t); prev.update(t); adv.update(t); next.update(t); lesson.update(t)
      bug.update(t, title.on(t) || prev.on(t) ? 0 : 1)
      drawGrain(gx, t)
    },
  }
}
export const SCENES = [build]
