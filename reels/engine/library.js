// The line library in the browser: loads content/*.json and deals lines
// forever without repeating until everything that fits the filter is used.
import { SIGNS } from './signs.js'

function lineId(sign, text) {
  let h = 2166136261
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return `${sign}-${(h >>> 0).toString(36)}`
}

export async function loadLibrary(base = new URL('../content/', import.meta.url)) {
  const all = await Promise.all(
    SIGNS.map(async (sign) => {
      try {
        const r = await fetch(new URL(`${sign}.json`, base))
        const d = await r.json()
        return d.lines.map((l) => ({ ...l, sign, id: lineId(sign, l.text) }))
      } catch {
        return []
      }
    }),
  )
  return all.flat()
}

const KEY = 'zexe.seen.v1'
const read = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || '[]'))
  } catch {
    return new Set()
  }
}
const write = (s) => {
  try {
    localStorage.setItem(KEY, JSON.stringify([...s].slice(-2000)))
  } catch {}
}

export function makeDealer(lines) {
  const seen = read()
  let filter = { sign: 'all', topic: 'all' }
  const fits = (l) => (filter.sign === 'all' || l.sign === filter.sign) && (filter.topic === 'all' || l.topic === filter.topic)
  return {
    setFilter(f) {
      filter = { ...filter, ...f }
    },
    get filter() {
      return filter
    },
    count: () => lines.filter(fits).length,
    next() {
      const pool = lines.filter(fits)
      if (!pool.length) return null
      let fresh = pool.filter((l) => !seen.has(l.id))
      if (!fresh.length) {
        // everything here has been dealt: start that filter's deck over
        for (const l of pool) seen.delete(l.id)
        fresh = pool
      }
      const l = fresh[Math.floor(Math.random() * fresh.length)]
      seen.add(l.id)
      write(seen)
      // A new seed every deal: the same line never looks the same twice.
      return { ...l, seed: `${l.id}:${Math.floor(Math.random() * 1e9).toString(36)}` }
    },
  }
}
