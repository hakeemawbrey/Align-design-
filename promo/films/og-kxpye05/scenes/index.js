// og-kxpye05: social rework of kxpye05 (static HOOK, box, 0–3.8; kit copied to ./partyfull.js without the bug, slam title,
// whip, promise sticker, chapter stickers or flashes; no loop back to frame 0, it ends on THE STARS' line; lines pushed further).
// Original notes:
// kxpye05: YOUR SIGN AT THE PARTY: EXTENDED, "The housewarming party" (≈89 s vertical star_talk post, promo/films/month2/m43.md,
// music: lofi · Ab). No end card, no card cut; loop (kit loop helper back into frame 0).
// The format lives in ../../kxpye01/scenes/partyfull.js (imported read-only): frame-0 chaos + slam title, twelve 6.6 s
// sign moments in six chapters (THE DOOR · THE BOXES · THE WALLS · THE FIXES · THE NIGHT · THE LAST GUEST), the goodbye with THE STARS at 83.2.
import { makeParty, partyProp } from './partyfull.js'
import { signStar } from '../../startalk.js'
import { clamp } from '../../../src/lib.js'
// the keys flying out of Cancer's hand on frame 0
const flyKeys = (x, t) => { if (t > 1.3) return; const p = clamp(t / 1.3); partyProp(x, t, { kind: 'keys' }, 620 + 240 * p, 800 - 360 * p + 560 * p * p, 0.8, 0) }

const EP = makeParty({
  id: 'og-kxpye05',
  title: 'First place alone. | *Party* time.',
  promise: 'WAIT FOR THE LAST GUEST',
  chapters: ['THE DOOR', 'THE BOXES', 'THE WALLS', 'THE FIXES', 'THE NIGHT', 'THE LAST GUEST'],
  hook: { sign: 'cancer', act: 'trip', mood: 'wide', prop: { kind: 'box', text: 'KITCHEN', from: 0 }, say: 'coming!! one second!!', sayAt: 1.0, draw: flyKeys },
  moments: [
    { sign: 'aries', cap: 'carries the couch *up six floors. alone.*', act: 'carry', prop: { kind: 'couch', at: 'hold', from: 0, k: 0.55 }, say: 'WHERE DOES THIS GO?! no time!', say2: 'by the window? on it!' },
    { sign: 'taurus', cap: 'brings a plant. *with a care contract.*', prop: { kind: 'plant', from: 0.3, label: 'this is gerald' }, say: 'this is Gerald. sign here.', say2: 'he likes slow jazz.', hearts: true },
    { sign: 'virgo', cap: 'labels *the labels.*', prop: { kind: 'box', text: 'MUGS', from: 0.3 }, say: '“misc”?? in THIS house??', prop2: { kind: 'box', text: 'BOXES', at: 'side', k: 0.6, label: 'a box for boxes' }, say2: 'there. order.' },
    { sign: 'gemini', cap: 'gives the tour. *of the wrong apartment.*', act: 'laps', say: 'and THIS is the kitchen! probably!', guest: { sign: 'cancer', name: 'CANCER', side: 'r', from: 2.8 }, say2: 'that’s the closet, Gemini.' },
    { sign: 'leo', cap: 'hangs a portrait of Leo. *it’s life-size.*', say: 'for your wall. and your soul.', prop2: { kind: 'portrait', col: signStar('leo').color, at: 'side', k: 0.7, label: 'a housewarming gift' }, crowd2: true, say2: 'it really ties the room together.' },
    { sign: 'libra', cap: 'moves the couch *twenty-two times.*', prop: { kind: 'couch', from: 0, k: 0.7 }, say: 'left. no. right. no. hm.', prop2: { kind: 'big', text: 'TRY 22', size: 100, at: 'hold', label: 'the first spot was best', labelDy: 100 }, say2: 'perfect. like the first time.' },
    { sign: 'capricorn', cap: 'fixes the table. *drafts a maintenance plan.*', prop: { kind: 'table', fixed: true, from: 0.2, label: 'fixed. you’re welcome.' }, say: 'pass me the little wrench.', say2: 'sturdy. like you.' },
    { sign: 'scorpio', cap: 'claims a dark corner. *forever.*', mood: 'squint', say: 'this corner? mine. legally.', prop2: { kind: 'note', lines: ['THE NOOK', 'reserved for', 'deep talks'], w: 400 }, mood2: 'happy', say2: 'let’s talk here later.' },
    { sign: 'sagittarius', cap: 'already explored *the entire neighbourhood.*', prop: { kind: 'map', from: 0.3, label: 'best bakery: here' }, say: 'I met all your neighbours!', say2: 'the bakery opens at seven!' },
    { sign: 'aquarius', cap: 'installs *a galaxy on the ceiling.*', say: 'lights off, everybody!', prop2: { kind: 'projector', label: 'your new ceiling' }, crowd2: true, mood2: 'sparkle', say2: 'now you live in space.' },
    { sign: 'pisces', cap: 'cries in *every single room.*', say: 'the bathroom is SO cute (sob)', prop2: { kind: 'big', text: 'ROOM 5 OF 5', size: 80, label: 'cried in all of them', labelDy: 90 }, say2: 'I’ll do the dishes. (sniff)' },
    { sign: 'cancer', cap: 'alone with the gifts: *“it feels like home.”*', act: 'sway', prop: { kind: 'gift', from: 0.2 }, prop2: { kind: 'keys', at: 'side', k: 0.8 }, say: 'everyone came…', say2: 'it feels like home.', hearts: true },
  ],
  last: 'Home is where *your people* show up.',
  loop: false,
  room: { wreath: false, wallSign: 'HOME!', wallW: 240, wallSize: 54, wallCol: '#9fe6b0' },
  extraCues: [['bell', 0.05, 1318.51, 0.04, 0.6, 0], ['bell', 0.4, 1046.5, 0.04, 0.6, 0]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0 (the kit's slam title and promise sticker are removed in ./partyfull.js)
export const HOOK = 'First place alone. | Every sign *shows up.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.8
