// Small seeded PRNG so every generated carousel can be reproduced from its seed.

/** FNV-1a string hash -> uint32 */
export function hash(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** mulberry32: returns a function giving floats in [0, 1) */
export function makeRng(seed) {
  let a = (typeof seed === 'string' ? hash(seed) : seed >>> 0) || 0x9e3779b9
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  next.int = (n) => Math.floor(next() * n)
  next.pick = (list) => list[Math.floor(next() * list.length)]
  next.range = (lo, hi) => lo + next() * (hi - lo)
  next.shuffle = (list) => {
    const out = [...list]
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1))
      ;[out[i], out[j]] = [out[j], out[i]]
    }
    return out
  }
  return next
}
