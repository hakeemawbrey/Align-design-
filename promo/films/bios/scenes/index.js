// bios · "Everyone sounds the same." → "Your sky doesn't." → "Your sky says more." (15s, LOOK A / film 1)
// Layers (bottom → top): bg (space moods + one grain) · hook (bios, line) · sky (answer, phone) · end (line, lockup) · overlay (badge, sparks, black)
import bg from './bg.js'
import hook, { cues as cHook } from './hook.js'
import sky, { cues as cSky } from './sky.js'
import end, { cues as cEnd } from './end.js'
import overlay from './overlay.js'
export const DURATION = 15
export const SCENES = [bg, hook, sky, end, overlay]
export const CUES = [...cHook, ...cSky, ...cEnd]
