import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const TMP = mkdtempSync(path.join(os.tmpdir(), 'align-study-x-'))
process.env.STUDY_MEDIA_DIR = path.join(TMP, 'media')
process.env.STUDY_PACK_DIR = path.join(TMP, 'pack')
process.env.STUDY_HOME = path.join(TMP, 'home')

const { accountOf, galleryArgs, metaOf, settle } = await import('../src/twitter.mjs')
const { platformOf, postOf } = await import('../src/quick.mjs')
const { handleOf, readJson } = await import('../src/paths.mjs')
const { loadPosts } = await import('../src/posts.mjs')
const { writePack } = await import('../src/report.mjs')

test('X links become an x- handle', () => {
  assert.deepEqual(accountOf('https://x.com/SomeOne/media'), { handle: 'x-someone', user: 'SomeOne', status: null })
  assert.deepEqual(accountOf('twitter.com/someone/status/123456?s=20'), { handle: 'x-someone', user: 'someone', status: '123456' })
  assert.deepEqual(accountOf('@someone'), { handle: 'x-someone', user: 'someone', status: null })
  assert.equal(accountOf('https://x.com/home'), null)
  assert.equal(accountOf('https://x.com/i/status/1'), null)
  assert.equal(accountOf('https://www.instagram.com/someone/'), null)
  assert.equal(handleOf('x-someone'), 'x-someone')
})

test('any pasted link is matched to its platform', () => {
  assert.equal(platformOf('https://youtu.be/jNQXAC9IVRw'), 'youtube')
  assert.equal(platformOf('https://x.com/a/status/1'), 'x')
  assert.equal(platformOf('https://twitter.com/a'), 'x')
  assert.equal(platformOf('https://www.instagram.com/reel/abc/'), 'instagram')
  assert.equal(platformOf('https://www.facebook.com/share/r/abc/'), 'facebook')
  assert.equal(platformOf('https://www.tiktok.com/@a/video/1'), 'tiktok')
  assert.equal(platformOf('https://netflix.com/x'), null)
})

test('a single post read keeps the text and numbers', () => {
  const p = postOf({ id: '9', description: 'Look at this', uploader: 'Fox', upload_date: '20260417', duration: 54.2, view_count: 446000, like_count: 4400, comment_count: 132, repost_count: 900 }, 'x', 'u')
  assert.deepEqual([p.text, p.date, p.views, p.reposts], ['Look at this', '2026-04-17', 446000, 900])
})

test('gallery-dl reads the Media tab, no reposts, with the login', () => {
  const a = galleryArgs('someone', '/d', { cookiesFromBrowser: 'chrome', limit: 5 }).join(' ')
  assert.match(a, /x\.com\/someone\/media$/)
  assert.match(a, /retweets=false/)
  assert.match(a, /--cookies-from-browser chrome/)
  assert.match(a, /max-posts=5/)
})

test('downloaded X posts settle into records with views, replies and reposts', () => {
  const dir = path.join(TMP, 'media', 'x-someone')
  mkdirSync(dir, { recursive: true })
  const user = { name: 'someone', nick: 'Some One', followers_count: 5000, friends_count: 10, statuses_count: 900, description: 'bio' }
  const raw = (id, num, ext, extra) => ({ tweet_id: Number(id), num, extension: ext, content: `Post ${id} https://t.co/abc`, date: '2026-10-01 10:00:00', favorite_count: 50, reply_count: 5, retweet_count: 7, view_count: 1000, author: user, user, width: 720, height: 1280, ...extra })
  for (const [id, num, ext, extra] of [['111', 1, 'mp4', { view_count: 3000 }], ['222', 1, 'mp4', {}], ['333', 1, 'jpg', {}], ['333', 2, 'jpg', {}]]) {
    const f = `${id}.${String(num).padStart(2, '0')}.${ext}`
    writeFileSync(path.join(dir, f), 'x')
    writeFileSync(path.join(dir, `${f}.json`), JSON.stringify(raw(id, num, ext, extra)))
  }
  assert.equal(settle(dir, 'x-someone', 'someone'), 3)
  assert.equal(settle(dir, 'x-someone', 'someone'), 3)   // safe to run again
  assert.equal(readJson(path.join(dir, '111.01.mp4.json')).description, 'Post 111')
  assert.equal(readJson(path.join(dir, '_numbers.json'))['111'].reposts, 7)
  assert.equal(readJson(path.join(dir, '_profile.json')).followers, 5000)
  const posts = loadPosts('x-someone')
  assert.deepEqual(posts.map((p) => p.type).sort(), ['carousel', 'reel', 'reel'])
  assert.equal(posts.find((p) => p.shortcode === '111').url, 'https://x.com/someone/status/111')
  const { recs } = writePack('x-someone')
  const r = recs.find((x) => x.shortcode === '111')
  assert.equal(r.views, 3000); assert.equal(r.reposts, 7); assert.equal(r.lift, 1.5)
  assert.equal(metaOf({ tweet_id: 1, extension: 'mp4' }, 'u').subcategory, 'video')
})

test('TikTok: links, captions and records', async () => {
  const { accountOf: tt, vttTranscript, metaOf: ttMeta, numbersOf: ttNum } = await import('../src/tiktok.mjs')
  assert.deepEqual(tt('https://www.tiktok.com/@JettFranzen/video/1?x=1'), { handle: 'tt-jettfranzen', user: 'JettFranzen' })
  assert.deepEqual(tt('@someone'), { handle: 'tt-someone', user: 'someone' })
  assert.equal(tt('https://www.instagram.com/someone'), null)
  assert.equal(handleOf('tt-jettfranzen'), 'tt-jettfranzen')
  const t = vttTranscript('WEBVTT\n\n00:00:00.120 --> 00:00:01.500\nYou are not\ncrazy\n\n00:00:01.500 --> 00:00:03.000\n<c>something</c> is off\n\n00:01:01.000 --> 00:01:02.000\nsomething is off\n')
  assert.equal(t.text, 'You are not crazy something is off')
  assert.deepEqual(t.segments[0], { from: 0.1, to: 1.5, text: 'You are not crazy' })
  assert.equal(t.words, 7)
  const m = ttMeta({ description: 'cap', timestamp: 1794082317, like_count: 5 }, { id: '7', url: 'u' })
  assert.equal(m.post_shortcode, '7'); assert.equal(m.category, 'tiktok'); assert.match(m.date, /^2026-11/)
  assert.equal(ttNum({ view_count: 10, repost_count: 3, duration: 30 }).reposts, 3)
})
