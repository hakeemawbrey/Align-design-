// Seeded randomness and noise. Every reel is a pure function of its seed,
// so the live player and the headless renderer draw the same frames.

export function hashSeed(input) {
  const s = String(input)
  let h = 1779033703 ^ s.length
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507)
  h = Math.imul(h ^ (h >>> 13), 3266489909)
  return (h ^= h >>> 16) >>> 0
}

function mulberry32(a) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function makeRng(seed) {
  const next = mulberry32(hashSeed(seed))
  const rng = {
    next,
    range: (a, b) => a + (b - a) * next(),
    int: (a, b) => Math.floor(a + (b - a + 1) * next()),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    chance: (p) => next() < p,
    sign: () => (next() < 0.5 ? -1 : 1),
    shuffle(arr) {
      const a = arr.slice()
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
    fork: (label) => makeRng(`${seed}/${label}`),
  }
  return rng
}

// Smooth 2D value noise with fbm, seeded.
export function makeNoise(seed) {
  const r = makeRng(seed)
  const perm = new Uint8Array(512)
  const p = r.shuffle([...Array(256).keys()])
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
  const val = new Float32Array(256).map(() => r.next())
  const fade = (t) => t * t * (3 - 2 * t)
  const lattice = (x, y) => val[perm[(x & 255) + perm[y & 255]]]
  function noise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y)
    const xf = x - xi, yf = y - yi
    const u = fade(xf), v = fade(yf)
    const a = lattice(xi, yi), b = lattice(xi + 1, yi)
    const c = lattice(xi, yi + 1), d = lattice(xi + 1, yi + 1)
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
  }
  function fbm(x, y, oct = 4) {
    let sum = 0, amp = 0.5, f = 1, norm = 0
    for (let i = 0; i < oct; i++) {
      sum += amp * noise(x * f, y * f)
      norm += amp
      amp *= 0.5
      f *= 2.03
    }
    return sum / norm
  }
  return { noise, fbm }
}

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export const lerp = (a, b, t) => a + (b - a) * t
export const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const easeOutBack = (t, s = 2.2) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2)
