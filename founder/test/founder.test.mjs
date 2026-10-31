import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { craftScore, scoreVideo, scoreScript, proofScore } from '../src/score.mjs'
import { classify, adapt, remix, build } from '../src/adapt.mjs'
import { ANGLES, HOOKS, FORMATS, BRIDGES } from '../src/library.mjs'
import { parseCsv, normalize, num } from '../src/parse.mjs'

const rubric = JSON.parse(readFileSync(new URL('../data/rubric.json', import.meta.url)))
const brief = { bridges: BRIDGES }

test('rubric weights add to 100', () => {
  assert.equal(rubric.dimensions.reduce((s, d) => s + d.weight, 0), 100)
})

test('a sharp founder script outscores a corporate one', () => {
  const sharp = { hook: 'I built a dating app with no photos.', beats: ['I was tired of being judged by one picture.', 'But then I saw 15 people a night actually get read.'], cta: 'Follow along.' }
  const flat = { hook: 'Hey guys, so today we are excited to announce our innovative solution that will empower users to leverage synergy.', beats: ['Our platform is seamless.'], cta: '' }
  assert.ok(craftScore(sharp, rubric).score > craftScore(flat, rubric).score + 15)
})

test('numbers parse the way search snippets write them', () => {
  assert.equal(num('1.6M'), 1600000)
  assert.equal(num('464.8K'), 464800)
  assert.equal(num('~300K'), 300000)
  assert.equal(num('16.4K-16.9K'), 16400)
  assert.equal(num('1,985'), 1985)
  assert.equal(num(''), null)
})

test('proof is null without numbers and discounted when estimated', () => {
  const set = [{ metrics: { likes: 10 } }, { metrics: { likes: 1000 } }]
  assert.equal(proofScore({ metrics: null }, set), null)
  const est = proofScore({ metrics: { likes: 1000, verified: false } }, set)
  const real = proofScore({ metrics: { likes: 1000, verified: true } }, set)
  assert.ok(real > est && est > 50)
})

test('csv import handles quotes, commas and newlines', () => {
  const rows = parseCsv('url,hook,likes\n"https://x/1","Stop, look.\nThen go",1.2K\n')
  assert.equal(rows.length, 1)
  const v = normalize(rows[0], 0, 'mine')
  assert.equal(v.hook, 'Stop, look.\nThen go')
  assert.equal(v.metrics.likes, 1200)
  assert.equal(v.metrics.verified, true)
})

test('classify reads her moves', () => {
  assert.equal(classify({ hook: 'THE LOVE LETTER METHOD', format: 'talking head tutorial' }).hookKey, 'named_method')
  assert.equal(classify({ hook: 'Replying to @someone', format: 'reply-to-comment' }).formatKey, 'reply_to_hate')
  assert.equal(classify({ hook: 'repeat these for 7 days', format: 'talking head affirmation + skit/interruption (co-star)' }).formatKey, 'skit_interrupt')
})

test('every angle, hook and format builds a script with no unfilled slots', () => {
  const src = { id: 't' }
  for (const a of ANGLES) for (const h of HOOKS) for (const f of FORMATS) {
    const s = build(src, { angleKey: a.key, hookKey: h.key, formatKey: f.key })
    const all = [s.hook, ...s.beats.map((b) => b.line), s.cta].join(' ')
    assert.ok(!/\{\w+\}/.test(all), `${a.key}/${h.key}/${f.key}: ${all}`)
    assert.ok(!/undefined/.test(all), `${a.key}/${h.key}/${f.key}`)
    assert.ok(!/!/.test(all.replace(/\[[^\]]*\]/g, '')), `exclamation in ${a.key}/${h.key}/${f.key}`)
    assert.ok(!/manifest|download align/i.test(all), `banned word in ${a.key}/${h.key}/${f.key}`)
    assert.equal(s.needsFacts, /\[[^\]]+\]/.test(all))
  }
})

test('adapt spreads angles, remix honors choices, scripts score', () => {
  const used = new Map()
  const src = { id: 's', hook: 'I built an app with Claude', format: 'talking head' }
  for (let i = 0; i < 5; i++) adapt({ ...src, id: 's' + i }, { used })
  assert.ok([...used.values()].every((n) => n <= 3))
  const r = remix(src, null, { seed: 7, angleKey: 'talk-cards', hookKey: 'unpopular_opinion', formatKey: 'pov_skit' })
  assert.equal(r.angleKey, 'talk-cards')
  assert.match(r.hook, /^Unpopular opinion/)
  const sc = scoreScript(r, { rubric, brief })
  assert.ok(sc.total > 0 && sc.total <= 100)
  assert.ok(scoreVideo(src, { rubric, brief }).total > 0)
})

test('pasted reels split on links and blank lines, numbers need labels', async () => {
  const { parsePasted } = await import('../src/parse.mjs')
  const rows = parsePasted(`https://www.instagram.com/reel/ABC/
THE LOVE LETTER METHOD
write it tonight
1.2M views · 85K likes · 1,204 comments
https://www.tiktok.com/@x/video/1
day 3 of building

just a caption with 3 ideas`)
  assert.equal(rows.length, 3)
  assert.equal(rows[0].url, 'https://www.instagram.com/reel/ABC/')
  assert.equal(rows[0].caption, 'THE LOVE LETTER METHOD\nwrite it tonight')
  assert.equal(num(rows[0].views), 1200000)
  assert.equal(num(rows[0].comments), 1204)
  assert.equal(rows[1].caption, 'day 3 of building')
  assert.equal(rows[2].url, undefined)
  assert.equal(rows[2].caption, 'just a caption with 3 ideas')
  assert.equal(parsePasted('url,hook,likes\nhttps://a,Hi,5\n')[0].hook, 'Hi')
})

test('instagram import pages through Business Discovery and drops views when Meta refuses them', async () => {
  const { fetchCreator, toRow } = await import('../src/import-ig.mjs')
  const urls = []
  const page = (ids, after) => ({ business_discovery: { username: 'x', media_count: 3, media: { data: ids.map((id) => ({ id, caption: `hook ${id}\nmore`, like_count: 10, comments_count: 2, media_product_type: 'REELS', media_type: 'VIDEO', permalink: `https://www.instagram.com/reel/${id}/`, timestamp: '2026-10-01T10:00:00+0000' })), paging: after ? { cursors: { after }, next: 'n' } : { cursors: {} } } } })
  const answers = [
    { ok: false, status: 400, body: { error: { message: '(#100) Tried accessing nonexisting field (view_count)', code: 100 } } },
    { ok: true, body: page(['a', 'b'], 'CUR') },
    { ok: true, body: page(['c']) },
  ]
  const fetch = async (u) => { urls.push(u); const a = answers.shift(); return { ok: a.ok, status: a.status ?? 200, json: async () => a.body } }
  const { posts, views } = await fetchCreator('x', { token: 'SECRET', userId: '1', fetch, limit: 2 })
  assert.equal(posts.length, 3)
  assert.equal(views, false)
  assert.match(decodeURIComponent(urls[0]), /view_count/)
  assert.doesNotMatch(decodeURIComponent(urls[1]), /view_count/)
  assert.match(decodeURIComponent(urls[2]), /media\.after\(CUR\)/)
  const row = toRow(posts[0], 'x')
  assert.equal(row.hook, 'hook a')
  assert.equal(row.format, 'instagram reel')
  assert.equal(row.date, '2026-10-01')
  const v = normalize(row, 0, 'ig-x')
  assert.equal(v.creator, 'x')
  assert.equal(v.metrics.likes, 10)
  assert.equal(v.metrics.verified, true)
  const bad = async () => ({ ok: false, status: 400, json: async () => ({ error: { message: 'Invalid OAuth access token', code: 190 } }) })
  await assert.rejects(fetchCreator('x', { token: 'SECRET', userId: '1', fetch: bad }), (e) => /code 190/.test(e.message) && !/SECRET/.test(e.message))
})
