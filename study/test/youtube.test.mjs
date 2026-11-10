import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const TMP = mkdtempSync(path.join(os.tmpdir(), 'align-study-yt-'))
process.env.STUDY_MEDIA_DIR = path.join(TMP, 'media')
process.env.STUDY_PACK_DIR = path.join(TMP, 'pack')
process.env.STUDY_HOME = path.join(TMP, 'home')

const { channelOf, videoIdOf, linksOf, mergeLinks, captionsOf, captionFileOf, metaOf, whyFailed, videoArgs, settle } = await import('../src/youtube.mjs')
const { withLift, compare, quickReport, TITLE_SHAPES } = await import('../src/quick.mjs')
const { handleOf, readJson } = await import('../src/paths.mjs')
const { loadPosts } = await import('../src/posts.mjs')
const { writePack } = await import('../src/report.mjs')

test('channel links become a yt- handle', () => {
  assert.deepEqual(channelOf('https://www.youtube.com/@MKBHD/videos?x=1'), { handle: 'yt-mkbhd', url: 'https://www.youtube.com/@MKBHD' })
  assert.deepEqual(channelOf('@mkbhd'), { handle: 'yt-mkbhd', url: 'https://www.youtube.com/@mkbhd' })
  assert.deepEqual(channelOf('youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ'), { handle: 'yt-ucbjycsmduvyel83r_u4jriq', url: 'https://www.youtube.com/channel/UCBJycsmduvYEL83R_U4JriQ' })
  assert.deepEqual(channelOf('yt-mkbhd'), { handle: 'yt-mkbhd', url: null })
  assert.equal(channelOf('https://www.youtube.com/watch?v=jNQXAC9IVRw'), null)
  assert.equal(channelOf('https://www.instagram.com/mkbhd/'), null)
  assert.equal(handleOf('yt-mkbhd'), 'yt-mkbhd')
})

test('video ids come out of every kind of video link', () => {
  for (const s of ['https://www.youtube.com/watch?v=jNQXAC9IVRw&t=3', 'youtu.be/jNQXAC9IVRw?si=x', 'https://youtube.com/shorts/jNQXAC9IVRw', 'https://m.youtube.com/live/jNQXAC9IVRw']) assert.equal(videoIdOf(s), 'jNQXAC9IVRw', s)
  assert.equal(videoIdOf('https://www.youtube.com/@mkbhd'), null)
})

test('listings merge, one per id, shorts get shorts links', () => {
  const v = linksOf({ entries: [{ id: 'aaaaaaaaaaa', title: 'A', view_count: 10, duration: 600 }, { id: 'bad' }] }, 'video')
  const s = linksOf({ entries: [{ id: 'bbbbbbbbbbb', title: 'B', view_count: 5 }, { id: 'aaaaaaaaaaa' }] }, 'short')
  assert.equal(v.length, 1)
  assert.equal(s[0].url, 'https://www.youtube.com/shorts/bbbbbbbbbbb')
  assert.deepEqual(mergeLinks(v, s).map((l) => [l.id, l.kind]), [['aaaaaaaaaaa', 'video'], ['bbbbbbbbbbb', 'short']])
})

test('json3 captions become a transcript with timings', () => {
  const t = captionsOf({ events: [{ tStartMs: 0, dDurationMs: 1500, segs: [{ utf8: 'Hey' }, { utf8: ' everyone,' }] }, { tStartMs: 1500, segs: [{ utf8: '\n' }] }, { tStartMs: 2000, dDurationMs: 1000, segs: [{ utf8: '[Music] this is it' }] }] })
  assert.equal(t.text, 'Hey everyone, this is it')
  assert.deepEqual(t.segments[0], { from: 0, to: 1.5, text: 'Hey everyone,' })
  assert.equal(t.words, 5)
  assert.equal(t.speech, true)
})

test('failures are told apart', () => {
  assert.equal(whyFailed('ERROR: Sign in to confirm you’re not a bot'), 'login')
  assert.equal(whyFailed('HTTP Error 429: Too Many Requests'), 'slowDown')
  assert.equal(whyFailed('Video unavailable'), 'failed')
})

test('a downloaded video settles into files process and report read, with captions and thumbnail', () => {
  const dir = path.join(TMP, 'media', 'yt-demo')
  mkdirSync(path.join(dir, '_yt'), { recursive: true }); mkdirSync(path.join(dir, '_thumbs'), { recursive: true })
  const links = [
    { id: 'aaaaaaaaaaa', kind: 'video', title: 'Why I quit', url: 'https://www.youtube.com/watch?v=aaaaaaaaaaa' },
    { id: 'bbbbbbbbbbb', kind: 'video', title: 'Second', url: 'https://www.youtube.com/watch?v=bbbbbbbbbbb' },
    { id: 'ccccccccccc', kind: 'short', title: 'A short', url: 'https://www.youtube.com/shorts/ccccccccccc' },
  ]
  const views = { aaaaaaaaaaa: 3000, bbbbbbbbbbb: 1000, ccccccccccc: 50 }
  for (const l of links) {
    writeFileSync(path.join(dir, `${l.id}.01.mp4`), 'x')
    writeFileSync(path.join(dir, '_yt', `${l.id}.info.json`), JSON.stringify({ id: l.id, title: l.title, description: 'More below #tag', upload_date: '20261001', view_count: views[l.id], like_count: 10, comment_count: 2, duration: 300, chapters: [{ start_time: 0, title: 'Intro' }] }))
    writeFileSync(path.join(dir, '_thumbs', `${l.id}.jpg`), 'jpg')
  }
  writeFileSync(path.join(dir, '_yt', 'aaaaaaaaaaa.en.json3'), JSON.stringify({ events: [{ tStartMs: 0, dDurationMs: 900, segs: [{ utf8: 'I quit my job today' }] }] }))
  assert.equal(captionFileOf(path.join(dir, '_yt'), 'aaaaaaaaaaa'), 'aaaaaaaaaaa.en.json3')
  const numbers = {}
  for (const l of links) numbers[l.id] = { views: views[l.id], likes: 10, comments: 2, duration: 300, from: 'yt-dlp' }
  for (const l of links) assert.ok(settle(dir, l))
  writeFileSync(path.join(dir, '_numbers.json'), JSON.stringify(numbers))
  assert.equal(readJson(path.join(dir, '_captions', 'aaaaaaaaaaa.json')).text, 'I quit my job today')

  const meta = metaOf({ title: 'T', description: 'D', upload_date: '20261001' }, links[0])
  assert.equal(meta.description, 'T\n\nD')
  assert.equal(meta.date, '2026-10-01T12:00:00Z')

  const posts = loadPosts('yt-demo')
  assert.equal(posts.length, 3)
  assert.equal(posts.find((p) => p.shortcode === 'ccccccccccc').subtype, 'short')
  const { out, recs } = writePack('yt-demo')
  const a = recs.find((r) => r.shortcode === 'aaaaaaaaaaa')
  assert.equal(a.title, 'Why I quit')
  assert.equal(a.thumb, 'thumbs/aaaaaaaaaaa.jpg')
  assert.equal(a.lift, 1.5)   // against the long videos' median (2000), not the Short
  assert.equal(recs.find((r) => r.shortcode === 'ccccccccccc').lift, 1)
  assert.match(readJson(path.join(out, 'posts.json')).posts[0].url, /youtube/)
})

test('download args keep it small and bring captions and thumbnails', () => {
  const args = videoArgs({ id: 'aaaaaaaaaaa', url: 'u' }, '/d', { cookiesFromBrowser: 'chrome' }).join(' ')
  assert.match(args, /height<=480/)
  assert.match(args, /--write-auto-subs/)
  assert.match(args, /--write-thumbnail/)
  assert.match(args, /--cookies-from-browser chrome/)
})

test('quick read: lift per kind, title shapes, a report', () => {
  const recs = withLift([
    ...[100, 200, 300, 400, 5000, 50, 60, 70].map((v, i) => ({ id: `v${i}`, kind: 'video', title: i === 4 ? 'I Tried This for 30 Days: WOW?' : `plain title ${i}`, views: v, duration: 600, url: `u${i}` })),
    { id: 's0', kind: 'short', title: 'short', views: 9, url: 's' },
  ])
  const best = recs.find((r) => r.id === 'v4')
  assert.ok(best.lift > 10)
  assert.ok(best.shapes.includes('challenge') && best.shapes.includes('question') && best.shapes.includes('colon-dash'))
  assert.equal(recs.find((r) => r.id === 's0').lift, 1)
  const c = compare(recs.filter((r) => r.kind === 'video'), (r) => r.shapes.includes('question'))
  assert.equal(c.count, 1); assert.equal(c.top, 0.5); assert.equal(c.bottom, 0)
  const md = quickReport({ handle: 'yt-demo', about: { name: 'Demo', followers: 1000, link: 'x' }, recs })
  assert.match(md, /## Long videos \(8\)/)
  assert.match(md, /### Title shapes/)
  assert.ok(TITLE_SHAPES.every(([k, l, t]) => k && l && typeof t === 'function'))
})
