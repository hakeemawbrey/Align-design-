// node promo/scripts/loop-check.mjs --teaser=<id>  → renders t=0 and t=LOOP and reports the mean pixel difference
// (a seamless loop should be ~0; anything over ~1/255 means something isn't periodic)
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const here = path.dirname(fileURLToPath(import.meta.url))
const id = (process.argv.find(a => a.startsWith('--teaser=')) || '').split('=')[1]
const dir = `/tmp/claude-0/loopcheck-${id}`
const T = (await import(`../teasers/t${id}.js`)).default
spawnSync('rm', ['-rf', dir])
const r = spawnSync('node', [path.join(here, 'render.mjs'), `--teaser=${id}`, `--stills=0,${T.duration}`, `--dir=${dir}`], { encoding: 'utf8' })
if (r.status) { console.error(r.stderr || r.stdout); process.exit(1) }
const a = path.join(dir, 't000.00.jpg'), b = path.join(dir, `t${T.duration.toFixed(2).padStart(6, '0')}.jpg`)
const d = spawnSync('ffmpeg', ['-v', 'info', '-i', a, '-i', b, '-filter_complex', 'blend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG', '-f', 'null', '-'], { encoding: 'utf8' })
const m = (d.stderr + d.stdout).match(/YAVG=([\d.]+)/)
console.log(`${id}: seam difference (YAVG of |frame0 − frameLOOP|) = ${m ? m[1] : '?'}  (≈0 is seamless; JPEG noise ≈0.3)`)
