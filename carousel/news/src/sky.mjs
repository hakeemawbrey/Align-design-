// The real sky for a date range, computed (not looked up) with
// astronomy-engine: sign ingresses, retrograde stations, exact aspects between
// planets, new and full moons, eclipses, and the Moon's sign each day.
//
//   node news/src/sky.mjs 2026-12-01 2027-03-01 > news/data/sky.json
//
// Tropical zodiac, true ecliptic of date, geocentric. Times are UTC ISO
// strings; `day` fields are the calendar date in America/New_York, which is
// the date a post goes out.

import * as A from 'astronomy-engine'
import { pathToFileURL } from 'node:url'

export const SIGNS = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
]
const PLANETS = ['Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
const ASPECTS = [
  { name: 'conjunction', angle: 0 },
  { name: 'sextile', angle: 60 },
  { name: 'square', angle: 90 },
  { name: 'trine', angle: 120 },
  { name: 'opposition', angle: 180 },
]
const HOUR = 1 / 24

const norm = (x) => ((x % 360) + 360) % 360
const signOf = (lon) => SIGNS[Math.floor(norm(lon) / 30)]
const degIn = (lon) => norm(lon) % 30

export function lon(body, t) {
  if (body === 'Moon') return A.EclipticGeoMoon(t).lon
  return A.Ecliptic(A.GeoVector(body, t, true)).elon
}

const tz = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' })
export const nyDay = (date) => tz.format(date)
const iso = (t) => t.date.toISOString().replace(/\.\d+Z$/, 'Z')

// Bisect a boolean change between two times to ~1 minute.
function bisect(t0, t1, f) {
  let a = t0.ut, b = t1.ut
  const fa = f(A.MakeTime(a))
  while (b - a > 1 / 1440) {
    const m = (a + b) / 2
    if (f(A.MakeTime(m)) === fa) a = m
    else b = m
  }
  return A.MakeTime(b)
}

// Signed difference in (-180, 180].
const sdiff = (x) => { const d = norm(x); return d > 180 ? d - 360 : d }

export function computeSky(startIso, endIso) {
  const start = A.MakeTime(new Date(startIso))
  const end = A.MakeTime(new Date(endIso))
  const events = []
  const add = (e) => events.push(e)
  const step = 2 * HOUR

  // Ingresses and stations (planets incl. Moon for ingress only).
  for (const body of ['Moon', ...PLANETS]) {
    let prev = start
    let prevSign = signOf(lon(body, prev))
    let prevSpeed = body === 'Moon' || body === 'Sun' ? 1 : sdiff(lon(body, prev.AddDays(0.5)) - lon(body, prev.AddDays(-0.5)))
    for (let ut = start.ut + step; ut <= end.ut; ut += step) {
      const t = A.MakeTime(ut)
      const L = lon(body, t)
      const s = signOf(L)
      if (s !== prevSign) {
        const at = bisect(prev, t, (x) => signOf(lon(body, x)))
        const speed = body === 'Moon' || body === 'Sun' ? 1 : sdiff(lon(body, at.AddDays(0.5)) - lon(body, at.AddDays(-0.5)))
        add({ type: body === 'Moon' ? 'moon-ingress' : 'ingress', body: body.toLowerCase(), sign: s, from: prevSign, retrograde: speed < 0, at: iso(at), day: nyDay(at.date) })
        prevSign = s
      }
      if (body !== 'Moon' && body !== 'Sun') {
        const speed = sdiff(lon(body, t.AddDays(0.5)) - lon(body, t.AddDays(-0.5)))
        if (Math.sign(speed) !== Math.sign(prevSpeed)) {
          const at = bisect(prev, t, (x) => sdiff(lon(body, x.AddDays(0.5)) - lon(body, x.AddDays(-0.5))) > 0)
          const L2 = lon(body, at)
          add({ type: 'station', body: body.toLowerCase(), direction: speed < 0 ? 'retrograde' : 'direct', sign: signOf(L2), degree: +degIn(L2).toFixed(1), at: iso(at), day: nyDay(at.date) })
        }
        prevSpeed = speed
      }
      prev = t
    }
  }

  // Exact aspects between planets (no Moon: too many). Find zero crossings of
  // (separation - aspect angle) on both sides of each aspect.
  for (let i = 0; i < PLANETS.length; i++) {
    for (let j = i + 1; j < PLANETS.length; j++) {
      const p = PLANETS[i], q = PLANETS[j]
      if (p === 'Sun' && (q === 'Mercury' || q === 'Venus') ) {
        // Sun–Mercury / Sun–Venus can only conjoin; keep it (cazimi / Venus star point).
      }
      for (const asp of ASPECTS) {
        for (const sideSign of asp.angle === 0 || asp.angle === 180 ? [1] : [1, -1]) {
          const g = (t) => sdiff(lon(p, t) - lon(q, t) - sideSign * asp.angle)
          let prev = start, gp = g(prev)
          for (let ut = start.ut + 6 * HOUR; ut <= end.ut; ut += 6 * HOUR) {
            const t = A.MakeTime(ut)
            const gt = g(t)
            // A real crossing, not the ±180 wrap.
            if (Math.sign(gt) !== Math.sign(gp) && Math.abs(gt - gp) < 20) {
              const at = bisect(prev, t, (x) => g(x) > 0)
              const lp = lon(p, at), lq = lon(q, at)
              add({ type: 'aspect', aspect: asp.name, a: p.toLowerCase(), b: q.toLowerCase(), aSign: signOf(lp), aDeg: +degIn(lp).toFixed(1), bSign: signOf(lq), bDeg: +degIn(lq).toFixed(1), at: iso(at), day: nyDay(at.date) })
            }
            prev = t; gp = gt
          }
        }
      }
    }
  }

  // Lunar phases.
  const PHASES = [[0, 'new moon'], [90, 'first quarter'], [180, 'full moon'], [270, 'last quarter']]
  for (const [angle, name] of PHASES) {
    let t = start
    for (;;) {
      const at = A.SearchMoonPhase(angle, t, 40)
      if (!at || at.ut > end.ut) break
      const L = lon('Moon', at)
      add({ type: 'phase', phase: name, sign: signOf(L), degree: +degIn(L).toFixed(1), at: iso(at), day: nyDay(at.date) })
      t = at.AddDays(1)
    }
  }

  // Eclipses.
  for (let e = A.SearchLunarEclipse(start); e.peak.ut <= end.ut; e = A.NextLunarEclipse(e.peak)) {
    const L = lon('Moon', e.peak)
    add({ type: 'eclipse', kind: 'lunar', subtype: e.kind, sign: signOf(L), degree: +degIn(L).toFixed(1), at: iso(e.peak), day: nyDay(e.peak.date) })
  }
  for (let e = A.SearchGlobalSolarEclipse(start); e.peak.ut <= end.ut; e = A.NextGlobalSolarEclipse(e.peak)) {
    const L = lon('Sun', e.peak)
    add({ type: 'eclipse', kind: 'solar', subtype: e.kind, sign: signOf(L), degree: +degIn(L).toFixed(1), at: iso(e.peak), day: nyDay(e.peak.date),
      where: e.latitude != null ? { lat: +e.latitude.toFixed(1), lon: +e.longitude.toFixed(1) } : null })
  }

  events.sort((x, y) => x.at.localeCompare(y.at))

  // Where everything sits at noon New York time each day (17:00 UTC is noon EST).
  const days = []
  for (let d = new Date(startIso); d < new Date(endIso); d = new Date(d.getTime() + 86400000)) {
    const noon = A.MakeTime(new Date(d.toISOString().slice(0, 10) + 'T17:00:00Z'))
    const pos = {}
    for (const b of ['Sun', 'Moon', ...PLANETS.slice(1)]) {
      const L = lon(b, noon)
      const rx = b !== 'Sun' && b !== 'Moon' && sdiff(lon(b, noon.AddDays(0.5)) - lon(b, noon.AddDays(-0.5))) < 0
      pos[b.toLowerCase()] = { sign: signOf(L), degree: +degIn(L).toFixed(1), ...(rx ? { rx: true } : {}) }
    }
    const illum = A.Illumination('Moon', noon)
    const phaseAngle = A.MoonPhase(noon)
    days.push({ day: d.toISOString().slice(0, 10), moon: { ...pos.moon, illumination: +illum.phase_fraction.toFixed(2), phaseAngle: +phaseAngle.toFixed(0) }, positions: pos })
  }
  return { range: [startIso, endIso], zodiac: 'tropical', generated: 'astronomy-engine 2.1.19', events, days }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [s = '2026-12-01', e = '2027-03-01'] = process.argv.slice(2)
  process.stdout.write(JSON.stringify(computeSky(s, e), null, 1))
}
