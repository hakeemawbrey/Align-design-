// The visual registry: vis.k in a script → { draw(x, p, s), cues?(p, t0, dur, ctx), min?(p), own? }. See ../SPEC.md.
import core from './core.js'
import astro from './astro.js'
import houston from './houston.js'
import explain from './explain.js'

const VIS = Object.assign({}, core, astro, houston, explain)
export default VIS
