// og-kxpye04: social rework of kxpye04 (static HOOK, outline, 0–3.8; kit copied to ./partyfull.js without the bug, slam title,
// whip, promise sticker, chapter stickers or flashes; lines pushed further; ends on THE STARS' last line).
// Original notes:
// kxpye04: YOUR SIGN AT THE PARTY: EXTENDED, "The party where your crush is" (≈89 s vertical star_talk post, promo/films/month2/m43.md,
// music: pop · E). No end card, no card cut; hard cut on the last line.
// The format lives in ../../kxpye01/scenes/partyfull.js (imported read-only): frame-0 chaos + slam title, twelve 6.6 s
// sign moments in six chapters (THE DOOR · THE SNACK TABLE · THE MIRROR · THE ROOM · THE MUSIC · THE GOODBYE), the goodbye with THE STARS at 83.2.
import { makeParty } from './partyfull.js'
import { cookie } from '../../npye01/scenes/kit.js'
import { clamp } from '../../../src/lib.js'
// the cookie flying out of Gemini's hand on frame 0
const flyCookie = (x, t) => { if (t > 1.2) return; const p = clamp(t / 1.2); x.save(); x.translate(560 + 260 * p, 820 - 380 * p + 520 * p * p); x.rotate(t * 9); cookie(x, 0, 0, 34); x.restore() }

const EP = makeParty({
  id: 'og-kxpye04',
  title: 'My crush is | *at this party.*',
  promise: 'WAIT FOR THE GOODBYE',
  chapters: ['THE DOOR', 'THE SNACK TABLE', 'THE MIRROR', 'THE ROOM', 'THE MUSIC', 'THE GOODBYE'],
  hook: { sign: 'gemini', act: 'trip', mood: 'wide', prop: { kind: 'meter', to: 1, at: 'side', from: 0, k: 0.75, label: 'heart rate' }, guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'l', mood: 'wide' }, say: 'I’m fine!! hi!!', sayAt: 1.2, draw: flyCookie },
  moments: [
    { sign: 'aries', cap: 'walks past the crush. *fourteen times.*', act: 'laps', say: 'oh! you’re here?? cool.', prop2: { kind: 'big', text: 'LAP 14', size: 110, label: 'extremely casual', labelDy: 100 }, guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'l', from: 3.0 }, say2: 'hi again, Aries!' },
    { sign: 'libra', cap: 'the friends *nudge them closer.*', act: 'dodge', say: 'stop pushing! …okay, push HARDER.', crowd2: true, guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'r', from: 3.0 }, say2: 'oh, hi Libra!', hearts: true },
    { sign: 'taurus', cap: 'offers the crush *the entire cookie tray.*', guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'r' }, prop: { kind: 'cookies', from: 0.3 }, say: 'I saved you all of them.', say2: 'you’re my favourite person here.', hearts: true },
    { sign: 'gemini', cap: 'tells their life story *in 9 seconds.*', act: 'shiver', guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'l' }, say: 'hi so I love this song also my cousin—', say2: 'haha, breathe! I’m listening.' },
    { sign: 'virgo', cap: 'rehearses “hi” *for forty minutes.*', prop: { kind: 'mirror', col: '#9fe6b0', at: 'side', from: 0.2, k: 0.8 }, say: 'hi. hey. hello. HI.', say2: 'take 87. still not ready.' },
    { sign: 'leo', cap: 'changes outfits. *during the conversation.*', act: 'spin', act2: 'spin', say: 'is this one better?', prop2: { kind: 'camera', label: 'outfit number seven' }, dress: 'sweater', sw: ['#f0a020', '#ff8fb1'], say2: 'wait, don’t look yet.' },
    { sign: 'scorpio', cap: 'eye contact. *crush waves.* becomes a plant.', mood: 'squint', guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'r', mood2: 'happy' }, say: 'I’ll just look over… once.', say2: 'hi, Scorpio!', act2: 'freeze', mood2: 'wide', prop2: { kind: 'plant', pos: [540, 1040], k: 1.5, label: 'Scorpio, technically', labelDy: 120 } },
    { sign: 'cancer', cap: 'knows *the crush’s dog’s birthday.*', guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'l' }, say: 'Biscuit turns four Tuesday, right?', say2: 'you REMEMBERED?', hearts: true },
    { sign: 'sagittarius', cap: 'asks the crush to dance. *and the plant.*', act: 'dance', guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'r' }, say: 'dance? come on!', say2: 'okay, ONE song!', confetti: true },
    { sign: 'aquarius', cap: 'explains the universe. *crush stays two hours.*', guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'l' }, say: 'that bright one? a planet.', prop2: { kind: 'moon', label: 'they stayed two hours' }, say2: 'tell me more!', hearts: true },
    { sign: 'capricorn', cap: 'books coffee *with a printed agenda.*', guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'r' }, say: 'coffee Tuesday. 10:00. agenda attached.', prop2: { kind: 'calendar', text: 'TUE', sub: 'COFFEE', label: 'in the calendar' }, say2: 'it’s a date!', hearts: true },
    { sign: 'pisces', cap: 'gets one compliment. *floods the room.*', dress: 'sweater', sw: ['#ff8fb1', '#c9a6ff'], guest: { color: '#ffc0d8', name: 'THE CRUSH', side: 'r' }, sayBy: 'guest', say: 'I like your sweater.', say2By: 'hero', say2: 'thank you (SOBBING) it’s NEW', hearts: true, crowd2: true },
  ],
  last: 'Say hi. Worst case, a *nice chat.*',
  loop: false,
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the kit's slam title and promise sticker are removed in ./partyfull.js)
export const HOOK = 'My crush is here. | Every sign *panics.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.8
