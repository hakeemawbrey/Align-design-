// kxpye05: YOUR SIGN AT THE PARTY: EXTENDED, "The housewarming party" (≈89 s vertical star_talk post, promo/films/month2/m43.md,
// music: lofi · Ab). No end card, no card cut; loop (kit loop helper back into frame 0).
// The format lives in ../../kxpye01/scenes/partyfull.js (imported read-only): frame-0 chaos + slam title, twelve 6.6 s
// sign moments in six chapters (THE DOOR · THE BOXES · THE WALLS · THE FIXES · THE NIGHT · THE LAST GUEST), the goodbye with THE STARS at 83.2.
import { makeParty } from '../../kxpye01/scenes/partyfull.js'
import { partyProp } from './../../kxpye01/scenes/partyfull.js'
import { signStar } from '../../startalk.js'
import { clamp } from '../../../src/lib.js'
// the keys flying out of Cancer's hand on frame 0
const flyKeys = (x, t) => { if (t > 1.3) return; const p = clamp(t / 1.3); partyProp(x, t, { kind: 'keys' }, 620 + 240 * p, 800 - 360 * p + 560 * p * p, 0.8, 0) }

const EP = makeParty({
  id: 'kxpye05',
  title: 'First place alone. | *Party* time.',
  promise: 'WAIT FOR THE LAST GUEST',
  chapters: ['THE DOOR', 'THE BOXES', 'THE WALLS', 'THE FIXES', 'THE NIGHT', 'THE LAST GUEST'],
  hook: { sign: 'cancer', act: 'trip', mood: 'wide', prop: { kind: 'box', text: 'KITCHEN', from: 0 }, say: 'coming!! one second!!', sayAt: 1.0, draw: flyKeys },
  moments: [
    { sign: 'aries', cap: 'carries the couch *up alone.*', act: 'carry', prop: { kind: 'couch', at: 'hold', from: 0, k: 0.55 }, say: 'where does this go?!', say2: 'by the window? on it!' },
    { sign: 'taurus', cap: 'brings a plant. *named Gerald.*', prop: { kind: 'plant', from: 0.3, label: 'this is gerald' }, say: 'meet Gerald. water weekly.', say2: 'he likes slow jazz.', hearts: true },
    { sign: 'virgo', cap: 'labels *every* box.', prop: { kind: 'box', text: 'MUGS', from: 0.3 }, say: 'this one says “misc.” no.', prop2: { kind: 'box', text: 'BOXES', at: 'side', k: 0.6, label: 'a box for boxes' }, say2: 'there. order.' },
    { sign: 'gemini', cap: 'gives the tour. *gets it wrong.*', act: 'laps', say: 'and THIS is the kitchen!', guest: { sign: 'cancer', name: 'CANCER', side: 'r', from: 2.8 }, say2: 'that’s the closet, Gemini.' },
    { sign: 'leo', cap: 'hangs a giant portrait. *of Leo.*', say: 'for your wall! you’re welcome.', prop2: { kind: 'portrait', col: signStar('leo').color, at: 'side', k: 0.7, label: 'a housewarming gift' }, crowd2: true, say2: 'it really ties the room together.' },
    { sign: 'libra', cap: 'moves the couch *nine times.*', prop: { kind: 'couch', from: 0, k: 0.7 }, say: 'left a bit. no, right.', prop2: { kind: 'big', text: 'TRY 9', size: 100, at: 'hold', label: 'the first spot was best', labelDy: 100 }, say2: 'perfect. like the first time.' },
    { sign: 'capricorn', cap: 'fixes *the wobbly table.*', prop: { kind: 'table', fixed: true, from: 0.2, label: 'fixed. you’re welcome.' }, say: 'pass me the little wrench.', say2: 'sturdy. like you.' },
    { sign: 'scorpio', cap: 'finds *the coziest nook.*', mood: 'squint', say: 'this corner? mine now.', prop2: { kind: 'note', lines: ['THE NOOK', 'reserved for', 'deep talks'], w: 400 }, mood2: 'happy', say2: 'let’s talk here later.' },
    { sign: 'sagittarius', cap: 'brings a map *of the neighbourhood.*', prop: { kind: 'map', from: 0.3, label: 'best bakery: here' }, say: 'I walked it already!', say2: 'the bakery opens at seven!' },
    { sign: 'aquarius', cap: 'sets up *a star projector.*', say: 'lights off, everybody!', prop2: { kind: 'projector', label: 'your new ceiling' }, crowd2: true, mood2: 'sparkle', say2: 'now you live in space.' },
    { sign: 'pisces', cap: 'cries in *every room.* then washes up.', say: 'the bathroom is SO cute…', prop2: { kind: 'big', text: 'ROOM 5 OF 5', size: 80, label: 'cried in all of them', labelDy: 90 }, say2: 'I’ll do the dishes. (sniff)' },
    { sign: 'cancer', cap: 'alone with the gifts: *“it feels like home.”*', act: 'sway', prop: { kind: 'gift', from: 0.2 }, prop2: { kind: 'keys', at: 'side', k: 0.8 }, say: 'everyone came…', say2: 'it feels like home.', hearts: true },
  ],
  last: 'Home is where *your people* show up.',
  loop: true,
  room: { wreath: false, wallSign: 'HOME!', wallW: 240, wallSize: 54, wallCol: '#9fe6b0' },
  extraCues: [['bell', 0.05, 1318.51, 0.04, 0.6, 0], ['bell', 0.4, 1046.5, 0.04, 0.6, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
