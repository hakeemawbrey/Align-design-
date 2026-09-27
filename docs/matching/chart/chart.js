// Align birth chart calculator — birth data → six sign indexes (0–11).
// Deps (both MIT): astronomy-engine (planet positions), luxon (historical time zones).
// Run the self-check: cd docs/matching/chart && npm install && node chart.js
//
// Input comes from onboarding + geocoding of the birth city:
//   { date: '1994-05-04', time: '14:30' | null, lat: 29.76, lon: -95.37, tz: 'America/Chicago' }
// `tz` is an IANA zone id from the geocoder (e.g. Google Time Zone API or the geo-tz package),
// NOT the user's current phone time zone.

const A = require('astronomy-engine');
const { DateTime } = require('luxon');

const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const signOf = (longitudeDeg) => Math.floor((((longitudeDeg % 360) + 360) % 360) / 30);

// Local birth time → UTC, using the historical rules for that place and date
// (daylight saving, zone changes). This is the #1 source of wrong charts.
function birthUtc({ date, time, tz }) {
  const local = DateTime.fromISO(`${date}T${time || '12:00'}`, { zone: tz }); // no time → noon
  if (!local.isValid) throw new Error(`Bad birth date/time/zone: ${local.invalidExplanation}`);
  return local.toUTC().toJSDate();
}

// Tropical ecliptic longitude (degrees, ecliptic of date) for each body.
function longitudes(utc) {
  const t = A.MakeTime(utc);
  const planet = (body) => A.Ecliptic(A.GeoVector(body, t, true)).elon;
  return {
    sun: A.SunPosition(t).elon,
    moon: A.EclipticGeoMoon(t).lon,
    mercury: planet(A.Body.Mercury),
    venus: planet(A.Body.Venus),
    mars: planet(A.Body.Mars),
  };
}

// Ascendant (Rising) from local sidereal time, latitude and the tilt of Earth's axis.
function ascendant(utc, lat, lon) {
  const t = A.MakeTime(utc);
  const ramc = ((A.SiderealTime(t) * 15 + lon) % 360 + 360) % 360; // local sidereal time in degrees
  const T = t.tt / 36525; // Julian centuries since J2000
  const eps = 23.4392911 - 0.0130042 * T; // mean obliquity, degrees
  const r = Math.PI / 180;
  const asc = Math.atan2(Math.cos(ramc * r),
    -(Math.sin(ramc * r) * Math.cos(eps * r) + Math.tan(lat * r) * Math.sin(eps * r))) / r;
  return (asc + 360) % 360;
}

// The only function the app needs. Output is what gets stored on the user.
function castChart(birth) {
  const utc = birthUtc(birth);
  const lon = longitudes(utc);
  const hasBirthTime = Boolean(birth.time);
  const chart = { hasBirthTime, birthUtc: utc.toISOString() };
  for (const [k, v] of Object.entries(lon)) chart[k] = signOf(v);
  chart.rising = hasBirthTime ? signOf(ascendant(utc, birth.lat, birth.lon)) : null;
  return chart;
}

module.exports = { SIGNS, signOf, birthUtc, longitudes, ascendant, castChart };

// ─── Self-check ───────────────────────────────────────────────────
if (require.main === module) {
  const assert = require('assert');
  const angle = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
  const houston = { lat: 29.7604, lon: -95.3698, tz: 'America/Chicago' };

  // 1. Known anchor: J2000 (2000-01-01 12:00 TT ≈ 11:59 UTC). Sun ≈ 280.4° (Capricorn).
  const j2000 = longitudes(new Date('2000-01-01T12:00:00Z'));
  assert(angle(j2000.sun, 280.37) < 0.1, 'Sun at J2000');
  assert.strictEqual(signOf(j2000.sun), 9);

  // 2. Historical time zones: Houston 1994-05-04 14:30 is daylight time (UTC-5) → 19:30 UTC.
  assert.strictEqual(birthUtc({ date: '1994-05-04', time: '14:30', ...houston }).toISOString(), '1994-05-04T19:30:00.000Z');
  // ...and 1994-01-15 14:30 is standard time (UTC-6) → 20:30 UTC.
  assert.strictEqual(birthUtc({ date: '1994-01-15', time: '14:30', ...houston }).toISOString(), '1994-01-15T20:30:00.000Z');

  // 3. Rising check without any outside data: when the Sun's centre is exactly on the
  //    horizon (geometric, no refraction) the Ascendant sits on the Sun at sunrise and
  //    opposite the Sun at sunset. Measured error of this formula: ~0.01°.
  for (const [lat, lon] of [[29.76, -95.37], [40.71, -74.0], [51.5, -0.12], [-33.87, 151.2]]) {
    const obs = new A.Observer(lat, lon, 0);
    for (const month of [0, 3, 6, 9]) {
      const start = A.MakeTime(new Date(Date.UTC(2024, month, 10)));
      const rise = A.SearchAltitude(A.Body.Sun, obs, +1, start, 2, 0).date;
      const set = A.SearchAltitude(A.Body.Sun, obs, -1, start, 2, 0).date;
      assert(angle(ascendant(rise, lat, lon), longitudes(rise).sun) < 0.1, `ASC at sunrise ${lat},${month}`);
      assert(angle(ascendant(set, lat, lon), longitudes(set).sun + 180) < 0.1, `ASC at sunset ${lat},${month}`);
    }
  }

  // 4. Physics sanity: Mercury never > 28° from the Sun, Venus never > 48°.
  for (let d = 0; d < 3650; d += 7) {
    const L = longitudes(new Date(Date.UTC(1990, 0, 1) + d * 864e5));
    assert(angle(L.mercury, L.sun) < 28.5 && angle(L.venus, L.sun) < 47.5, `inner planets day ${d}`);
  }

  // 5. Example output.
  const you = castChart({ date: '1994-05-04', time: '14:30', ...houston });
  const named = Object.fromEntries(['sun', 'moon', 'mercury', 'venus', 'mars', 'rising'].map((k) => [k, SIGNS[you[k]]]));
  assert.strictEqual(named.sun, 'Taurus');
  console.log('Example, Houston 1994-05-04 14:30:', named);
  console.log('No birth time:', castChart({ date: '1994-05-04', time: null, ...houston }).rising === null ? 'rising = null ✓' : 'ERROR');
  console.log('All chart self-checks passed.');
}
