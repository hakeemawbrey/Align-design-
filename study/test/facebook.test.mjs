import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const TMP = mkdtempSync(path.join(os.tmpdir(), 'align-study-fb-'))
process.env.STUDY_MEDIA_DIR = path.join(TMP, 'media')
process.env.STUDY_PACK_DIR = path.join(TMP, 'pack')
process.env.STUDY_HOME = path.join(TMP, 'home')

const { pageOf, tabsOf, videoLinks, countOf, cookiesTxt, captionOf, metaOf, whyFailed, ytdlpVideoArgs, videoFileOf, collect } = await import('../src/facebook.mjs')
const { handleOf } = await import('../src/paths.mjs')
const { readPosts, loadPosts } = await import('../src/posts.mjs')
const { fromYtdlp } = await import('../src/numbers.mjs')
const { writePack } = await import('../src/report.mjs')

test('Facebook page links become a page and a handle', () => {
  assert.deepEqual(pageOf('https://www.facebook.com/people/Astriva/61595402754931/?mibextid=wwXIfr&rdid=x'), { handle: 'fb-astriva', id: '61595402754931', name: 'Astriva' })
  assert.deepEqual(pageOf('https://m.facebook.com/profile.php?id=61595402754931&sk=reels_tab'), { handle: 'fb-61595402754931', id: '61595402754931' })
  assert.deepEqual(pageOf('facebook.com/AstrivaPage/reels/'), { handle: 'fb-astrivapage', vanity: 'AstrivaPage' })
  assert.equal(pageOf('https://www.facebook.com/share/1KezBxmTFj/?mibextid=wwXIfr'), null)   // needs opening first
  assert.equal(pageOf('https://www.facebook.com/reel/123456789'), null)
  assert.equal(pageOf('https://www.instagram.com/astriva/'), null)
  assert.deepEqual(tabsOf({ id: '615' }), ['https://www.facebook.com/profile.php?id=615&sk=reels_tab', 'https://www.facebook.com/profile.php?id=615&sk=videos'])
  assert.deepEqual(tabsOf({ vanity: 'AstrivaPage' }), ['https://www.facebook.com/AstrivaPage/reels/', 'https://www.facebook.com/AstrivaPage/videos/'])
  // The later steps take the fb- handle as it is.
  assert.equal(handleOf('fb-astriva'), 'fb-astriva')
  assert.equal(handleOf('@tylerinthemaking'), 'tylerinthemaking')
})

test('reel and video links are picked out of a page, once each', () => {
  const got = videoLinks([
    '/reel/1234567890123/?s=ifu_see_all', 'https://www.facebook.com/reel/1234567890123',
    '/Astriva/videos/what-your-sign-says/9876543210/', '/watch/?v=5555555555&ref=x', '/watch?v=4444444444',
    '/photo/?fbid=111111111', '/Astriva/', '#', null,
  ])
  assert.deepEqual(got, [
    { id: '1234567890123', url: 'https://www.facebook.com/reel/1234567890123' },
    { id: '9876543210', url: 'https://www.facebook.com/watch/?v=9876543210' },
    { id: '5555555555', url: 'https://www.facebook.com/watch/?v=5555555555' },
    { id: '4444444444', url: 'https://www.facebook.com/watch/?v=4444444444' },
  ])
})

test('follower counts, cookies, captions', () => {
  assert.equal(countOf('Astriva. 9,433 followers · 16,881 talking about this.', 'followers'), 9433)
  assert.equal(countOf('9.4K followers', 'followers'), 9400)
  assert.equal(countOf('1.2M followers', 'followers'), 1200000)
  assert.equal(countOf('no numbers', 'followers'), null)

  const txt = cookiesTxt([
    { name: 'c_user', value: '42', domain: '.facebook.com', path: '/', expires: 1893456000.5, secure: true },
    { name: 'presence', value: 'x', domain: 'www.facebook.com', path: '/', expires: -1, secure: false },
    { name: 'other', value: 'y', domain: '.example.com', path: '/', expires: -1, secure: false },
  ])
  const lines = txt.trim().split('\n')
  assert.match(lines[0], /^# Netscape HTTP Cookie File/)
  assert.deepEqual(lines.slice(2), ['.facebook.com\tTRUE\t/\tTRUE\t1893456001\tc_user\t42', '.www.facebook.com\tTRUE\t/\tFALSE\t0\tpresence\tx'])

  assert.equal(captionOf({ description: 'Scorpios love like this ♏️ #zodiac' }), 'Scorpios love like this ♏️ #zodiac')
  assert.equal(captionOf({ title: '12K views · 340 reactions | 3 signs who fall fast | Astriva' }, 'Astriva'), '3 signs who fall fast')
  assert.equal(captionOf({ title: 'Video' }), '')
  assert.equal(whyFailed('ERROR: [facebook] 123: This video is only available for registered users. Use --cookies'), 'login')
  assert.equal(whyFailed('HTTP Error 429: Too Many Requests'), 'slowDown')
  assert.equal(whyFailed('ERROR: Unsupported URL'), 'failed')
  const a = ytdlpVideoArgs({ id: '99', url: 'https://www.facebook.com/reel/99' }, '/m/fb-x', '/h/c.txt').join(' ')
  assert.match(a, /--cookies \/h\/c\.txt/)
  assert.match(a, /-o infojson:\/m\/fb-x\/_fb\/99 -o \/m\/fb-x\/99\.01\.%\(ext\)s https:\/\/www\.facebook\.com\/reel\/99$/)
})

test('a downloaded Facebook reel reads like an Instagram one, and packs', () => {
  const dir = path.join(TMP, 'media', 'fb-astriva')
  mkdirSync(dir, { recursive: true })
  const info = { id: '1234567890123', title: '8.1K views · 250 reactions | x', description: 'POV: a Pisces falls for you 🌊 #pisces #zodiac', timestamp: 1790000000, view_count: 8100, like_count: 250, comment_count: 31, duration: 14.2, width: 1080, height: 1920 }
  const link = { id: info.id, url: `https://www.facebook.com/reel/${info.id}` }
  writeFileSync(path.join(dir, `${info.id}.01.mp4`), 'x')
  writeFileSync(path.join(dir, `${info.id}.01.mp4.json`), JSON.stringify(metaOf(info, link, 'Astriva')))
  writeFileSync(path.join(dir, '_numbers.json'), JSON.stringify({ [info.id]: fromYtdlp(info) }))
  writeFileSync(path.join(dir, '_profile.json'), JSON.stringify({ site: 'facebook', username: 'fb-astriva', name: 'Astriva', followers: 9433, link: 'https://www.facebook.com/profile.php?id=61595402754931' }))
  assert.equal(videoFileOf(dir, info.id), `${info.id}.01.mp4`)
  assert.equal(videoFileOf(dir, '000'), null)

  const [p] = readPosts(dir)
  assert.equal(p.type, 'reel')
  assert.equal(p.url, link.url)
  assert.equal(p.date, new Date(1790000000 * 1000).toISOString())
  assert.deepEqual(p.hashtags, ['#pisces', '#zodiac'])
  const [n] = loadPosts('fb-astriva')
  assert.deepEqual([n.views, n.likes, n.comments, n.duration], [8100, 250, 31, 14.2])

  const { out, recs } = writePack('fb-astriva')
  assert.equal(recs.length, 1)
  assert.ok(existsSync(path.join(out, 'report.md')))
})

// The scroller, against a fake Reels tab that loads more links as you scroll.
const CHROME = process.env.STUDY_CHROME ?? ['/opt/pw-browsers/chromium-1243/chrome-linux64/chrome'].find(existsSync)
test('the Reels tab is scrolled until nothing new loads', { skip: !CHROME && 'no Chromium here' }, async () => {
  const { chromium } = await import('playwright-core')
  const html = path.join(TMP, 'reels.html')
  writeFileSync(html, `<!doctype html><body style="margin:0"><div id="g"></div><script>
    let n = 0
    function more() { for (let i = 0; i < 6 && n < 20; i++, n++) { const a = document.createElement('a'); a.href = '/reel/' + (1000000 + n) + '/?s=tab'; a.textContent = 'reel ' + n; a.style.cssText = 'display:block;height:400px'; g.append(a) } }
    more(); addEventListener('scroll', () => { if (innerHeight + scrollY > document.body.scrollHeight - 200) more() })
  </script>`)
  const browser = await chromium.launch({ executablePath: CHROME })
  try {
    const page = await browser.newPage({ viewport: { width: 800, height: 900 } })
    const all = await collect(page, pathToFileURL(html).href, { pause: [0.2, 0.3], settle: [0.2, 0.3] })
    assert.equal(all.blocked, false)
    assert.equal(all.links.length, 20)
    assert.equal(all.links[0].url, 'https://www.facebook.com/reel/1000000')
    const some = await collect(page, pathToFileURL(html).href, { limit: 8, pause: [0.2, 0.3], settle: [0.2, 0.3] })
    assert.ok(some.links.length >= 8 && some.links.length < 20)
  } finally { await browser.close() }
})
