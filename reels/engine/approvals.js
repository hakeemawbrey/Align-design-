// Approved reels: kept in the artifact's shared store when it's available
// (so they survive reloads and Claude can render final MP4s from them), in
// this browser otherwise. Each one can be turned into a video here and saved,
// one at a time or all together as a zip.
import { captionFor, GLYPH } from './signs.js'

const LOCAL_KEY = 'zexe.approved.v1'

const capability = async (name) => {
  try {
    return window.claude?.use ? await window.claude.use(name) : null
  } catch {
    return null
  }
}

// Saves through the viewer's download prompt inside claude.ai, or a plain
// browser download when the page runs on its own.
export async function saveFile(filename, data) {
  const downloads = await capability('downloads')
  if (downloads) {
    try {
      await downloads.save({ filename, data })
      return 'saved'
    } catch (e) {
      if (e?.code === 'declined') return 'declined'
      throw e
    }
  }
  const blob = data instanceof Blob ? data : new Blob([data])
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 60000)
  return 'saved'
}

let zipLib = null
function loadZip() {
  if (zipLib) return zipLib
  zipLib = new Promise((resolve, reject) => {
    if (window.JSZip) return resolve(window.JSZip)
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
    s.onload = () => resolve(window.JSZip)
    s.onerror = () => {
      zipLib = null
      reject(new Error('zip library did not load'))
    }
    document.head.appendChild(s)
  })
  return zipLib
}

export const baseName = (item) => `${item.sign}-${(item.id || '').split('-')[1] || 'reel'}-${String(item.seed).split(':').pop()}`

export async function createApprovals() {
  const db = await capability('db')
  const listeners = new Set()
  let rows = []
  const emit = () => listeners.forEach((fn) => fn(rows))

  const fromDoc = (d) => ({ key: d.id, ...d.data() })
  if (db) {
    db.collection('approved').orderBy('at', 'desc').onSnapshot(
      (snap) => {
        rows = snap.docs.map(fromDoc)
        emit()
      },
      () => {},
    )
  } else {
    try {
      rows = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
    } catch {
      rows = []
    }
  }
  const persistLocal = () => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(rows))
    } catch {}
  }
  const keyFor = (item) => String(item.seed).replace(/[^a-zA-Z0-9_-]/g, '_')

  return {
    shared: !!db,
    get rows() {
      return rows
    },
    onChange(fn) {
      listeners.add(fn)
      fn(rows)
    },
    has: (item) => rows.some((r) => r.key === keyFor(item)),
    async add(item, world) {
      const row = {
        sign: item.sign, topic: item.topic, text: item.text, caption: item.caption || '',
        id: item.id, seed: String(item.seed), world: world || '', at: Date.now(),
      }
      const key = keyFor(item)
      if (db) {
        rows = [{ key, ...row }, ...rows.filter((r) => r.key !== key)]
        emit()
        await db.doc(`approved/${key}`).set(row)
      } else {
        rows = [{ key, ...row }, ...rows.filter((r) => r.key !== key)]
        persistLocal()
        emit()
      }
      return key
    },
    async remove(key) {
      rows = rows.filter((r) => r.key !== key)
      emit()
      if (db) await db.doc(`approved/${key}`).delete()
      else persistLocal()
    },
    // A JSON list the repo's renderer can turn into final MP4s:
    //   npm run render -- --from approved.json
    exportList() {
      return JSON.stringify(rows.map(({ key, ...r }) => r), null, 2)
    },
  }
}

export async function zipAll(entries) {
  const JSZip = await loadZip()
  const zip = new JSZip()
  for (const { item, blob, ext } of entries) {
    const base = baseName(item)
    zip.file(`${base}.${ext}`, blob)
    zip.file(`${base}.txt`, captionFor(item) + '\n')
  }
  return zip.generateAsync({ type: 'blob', compression: 'STORE' })
}

export function glyphFor(sign) {
  return GLYPH[sign] + '︎'
}
