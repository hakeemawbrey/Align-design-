import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { findOnMeta, shortcodeOf, idFilter, extFor, galleryArgs } from '../src/download.mjs'
import { makeBrief, merge } from '../src/brief.mjs'
import { cleanDecision, loadItems, mediaIndex, USES } from '../src/items.mjs'
import { build } from '../src/build.mjs'

test('every spreadsheet row became a post with a unique shortcode', () => {
  const items = loadItems()
  assert.equal(items.length, 1068)
  assert.equal(new Set(items.map((i) => i.shortcode)).size, items.length)
  for (const i of items) assert.equal(shortcodeOf(i.url), i.shortcode)
})

test('shortcodes come out of every Instagram link shape', () => {
  assert.equal(shortcodeOf('https://www.instagram.com/reel/DfFvQ2Gugdh/'), 'DfFvQ2Gugdh')
  assert.equal(shortcodeOf('https://instagram.com/p/De-Kc55uoO2/?img_index=1'), 'De-Kc55uoO2')
  assert.equal(shortcodeOf('https://www.instagram.com/someone/reel/Abc_123/'), 'Abc_123')
  assert.equal(shortcodeOf('https://example.com/x'), null)
})

test('id ranges', () => {
  const f = idFilter('i0001-i0003,10')
  assert.deepEqual(['i0001', 'i0002', 'i0004', 'i0010'].map(f), [true, true, false, true])
})

test('file extensions follow the media link', () => {
  assert.equal(extFor('video', 'https://cdn.example/x/abc.mp4?oh=1'), 'mp4')
  assert.equal(extFor('image', 'https://cdn.example/x/abc'), 'jpg')
})

function fakeMeta(pages) {
  const calls = []
  return { calls, fetch: async (url) => { calls.push(decodeURIComponent(url)); const body = pages[calls.length - 1] ?? { business_discovery: { media: { data: [] } } }; return { ok: !body.error, status: body.error ? 400 : 200, json: async () => body } } }
}

test('Meta: pages until every wanted post is found, carousels give every slide', async () => {
  const m = fakeMeta([
    { business_discovery: { media: { data: [{ permalink: 'https://www.instagram.com/reel/AAA/', media_type: 'VIDEO', media_url: 'https://cdn/a.mp4' }], paging: { cursors: { after: 'c1' }, next: 'x' } } } },
    { business_discovery: { media: { data: [{ permalink: 'https://www.instagram.com/p/BBB/', media_type: 'CAROUSEL_ALBUM', children: { data: [{ media_type: 'IMAGE', media_url: 'https://cdn/1.jpg' }, { media_type: 'VIDEO', media_url: 'https://cdn/2.mp4' }] } }], paging: { cursors: { after: 'c2' }, next: 'y' } } } },
  ])
  const r = await findOnMeta('someone', ['AAA', 'BBB'], { token: 't', userId: '1', fetch: m.fetch })
  assert.equal(m.calls.length, 2, 'stops once both are found')
  assert.match(m.calls[1], /media\.after\(c1\)/)
  assert.deepEqual(r.found.AAA, [{ url: 'https://cdn/a.mp4', kind: 'video' }])
  assert.equal(r.found.BBB.length, 2)
  assert.equal(r.missing, null)
})

test('Meta: a reel with withheld media is reported missing, not crashed on', async () => {
  const m = fakeMeta([{ business_discovery: { media: { data: [{ permalink: 'https://www.instagram.com/reel/AAA/', media_type: 'VIDEO' }] } } }])
  const r = await findOnMeta('someone', ['AAA'], { token: 't', userId: '1', fetch: m.fetch })
  assert.deepEqual(r.found, {})
  assert.match(r.missing, /licensed music|too old/)
})

test('Meta: a personal account gives a readable reason; rate limits throw so the run can wait', async () => {
  const m = fakeMeta([{ error: { message: 'Invalid user id', code: 110 } }])
  const r = await findOnMeta('someone', ['AAA'], { token: 't', userId: '1', fetch: m.fetch })
  assert.match(r.missing, /Meta said: Invalid user id/)
  const m2 = fakeMeta([{ error: { message: 'Application request limit reached', code: 4 } }])
  await assert.rejects(findOnMeta('x', ['A'], { token: 't', userId: '1', fetch: m2.fetch }), (e) => e.rateLimited)
})

test('decisions are cleaned before they are written', () => {
  const d = cleanDecision({ status: 'nope', uses: ['hook', 'evil'], feedback: 'x'.repeat(5000), extra: 1 })
  assert.equal(d.status, null)
  assert.deepEqual(d.uses, ['hook'])
  assert.equal(d.feedback.length, 4000)
  assert.equal('extra' in d, false)
})

test('merge keeps the newer edit', () => {
  const a = { i0001: { status: 'accepted', updatedAt: '2026-11-02T10:00:00Z' } }
  const b = { i0001: { status: 'rejected', updatedAt: '2026-11-01T10:00:00Z' }, i0002: { status: 'maybe', updatedAt: '2026-11-02T11:00:00Z' } }
  const m = merge(a, b)
  assert.equal(m.i0001.status, 'accepted')
  assert.equal(m.i0002.status, 'maybe')
})

test('brief groups accepted posts by use and carries the Align spin', () => {
  const items = loadItems()
  const decisions = {
    i0002: { status: 'accepted', uses: ['series', 'caption'], feedback: 'Audience votes decide each part', spin: 'Followers vote on which card gets dealt next' },
    i0004: { status: 'accepted', uses: ['pipeline'], feedback: '', spin: '' },
    i0012: { status: 'rejected', uses: [], feedback: 'Horoscope bait, too cheap', spin: '' },
    i0013: { status: 'rejected', uses: [], feedback: '', spin: '' },
  }
  const { md, data, csv, reels } = makeBrief(items, decisions, { 'De-Kc55uoO2': ['01.mp4'] })
  assert.match(md, /### Series \(1\)/)
  assert.match(md, /\*\*Align spin:\*\* Followers vote/)
  assert.match(md, /inspo\/media\/De-Kc55uoO2\//)
  assert.match(md, /## Skipped, and why[\s\S]*too cheap/)
  assert.match(md, /Skipped without notes: 1/)
  assert.equal(data.counts.accepted, 2)
  assert.deepEqual(data.accepted[0].media, ['inspo/media/De-Kc55uoO2/01.mp4'])
  assert.equal(reels, 2)
  assert.match(csv.split('\n')[1], /^https:\/\/www\.instagram\.com\/reel\/De-Kc55uoO2\/,inspo,/)
  assert.match(csv, /ALIGN SPIN: Followers vote/)
})

test('media index lists downloaded files and ignores partial ones', () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'inspo-'))
  mkdirSync(path.join(dir, 'AAA')); writeFileSync(path.join(dir, 'AAA', '02.jpg'), ''); writeFileSync(path.join(dir, 'AAA', '01.mp4'), ''); writeFileSync(path.join(dir, 'AAA', '03.mp4.part'), '')
  mkdirSync(path.join(dir, 'BBB'))
  writeFileSync(path.join(dir, '_failed.json'), '{}')
  assert.deepEqual(mediaIndex(dir), { AAA: ['01.mp4', '02.jpg'] })
})

test('the review page has every post and use baked in, with no placeholders left', () => {
  const { out, items } = build()
  const html = readFileSync(out, 'utf8')
  assert.equal(items, 1068)
  assert.doesNotMatch(html, /\/\*INSPO_|\/\*ALIGN_VOICE/)
  for (const u of USES) assert.ok(html.includes(`"key":"${u.key}"`))
  assert.ok(USES.length <= 10, 'number keys 1–0 cover every use')
  assert.doesNotMatch(html, /<\/script>[^]*<\/script>[^]*<\/script>/, 'one inline script')
})

test('gallery-dl numbers carousel slides and uses the browser login', () => {
  const a = galleryArgs({ url: 'https://www.instagram.com/p/X/' }, '/m/X', { cookiesFromBrowser: 'chrome', sleep: 3 })
  assert.deepEqual(a.slice(-3), ['--cookies-from-browser', 'chrome', 'https://www.instagram.com/p/X/'])
  assert.ok(a.includes('{num:>02}.{extension}'))
})

import { SPINS, suggestSpins } from '../src/spins.mjs'
import { generatorSpec } from '../src/spec.mjs'

test('every spin is in Align voice and names real uses', () => {
  assert.equal(new Set(SPINS.map((s) => s.id)).size, SPINS.length)
  for (const s of SPINS) {
    assert.doesNotMatch(s.spin, /!|manifest|download|soulmate|attachment style/i, s.id)
    for (const u of s.uses) assert.ok(USES.some((x) => x.key === u), `${s.id}: ${u}`)
  }
})

test('every post gets three different spins, matched to its caption when it can be', () => {
  const items = loadItems()
  for (const it of items) assert.equal(new Set(suggestSpins(it).map((s) => s.id)).size, 3, it.id)
  const by = (id) => suggestSpins(items.find((i) => i.id === id)).map((s) => s.id)
  assert.ok(by('i0004').includes('built-with-claude'))   // "He asked Claude for a million views"
  assert.ok(by('i0012').includes('dear-sign'))           // "Taurus 👀"
  assert.ok(by('i0013').includes('sound-led'))           // "most used sounds"
  assert.ok(by('i0005').includes('comment-card'))        // "Comment HARVEY"
  assert.ok(by('i0002').includes('deal-night-series'))   // "7 parts, every one decided by your votes"
})

test('the generator instructions carry every note, recipe and avoid rule', () => {
  const items = loadItems()
  const spin = SPINS.find((s) => s.id === 'deal-night-series').spin
  const md = generatorSpec({ items, uses: USES, spins: SPINS, now: '2026-11-02T00:00:00Z', decisions: {
    i0002: { status: 'accepted', uses: ['series'], feedback: 'Votes make people come back', spin },
    i0007: { status: 'maybe', uses: [], feedback: '', spin: '' },
    i0012: { status: 'rejected', uses: [], feedback: 'Too much horoscope bait', spin: '' },
    i0013: { status: 'rejected', uses: [], feedback: '', spin: '' },
  } })
  assert.match(md, /2 to use|1 to use/)
  assert.match(md, /\(use, i0002 @yourtrainerarc\) Votes make people come back/)
  assert.match(md, /\(avoid, i0012 @xoamparo\) Too much horoscope bait/)
  assert.match(md, /### i0002 · @yourtrainerarc · Reel · use \(weight 3\)/)
  assert.match(md, /### i0007 .* maybe \(weight 1\)/)
  assert.match(md, /\*\*Align spin:\*\* A nightly series called Deal Night/)
  assert.match(md, /picked: deal-night-series ×3/)
  assert.match(md, /1 more skipped without a reason/)
  assert.match(md, /## Spin library/)
  assert.match(md, /Built with Claude Code/)
})

test('the local server rewrites out/GENERATOR.md after a save', async () => {
  const { makeServer } = await import('../src/review-server.mjs')
  const fs = await import('node:fs')
  const dec = path.join(import.meta.dirname, '..', 'data', 'decisions.json')
  const gen = path.join(import.meta.dirname, '..', 'out', 'GENERATOR.md')
  const before = fs.readFileSync(dec, 'utf8')
  const server = makeServer().listen(0)
  try {
    const port = server.address().port
    const r = await fetch(`http://127.0.0.1:${port}/api/decision`, { method: 'POST', body: JSON.stringify({ id: 'i0003', decision: { status: 'accepted', uses: ['format'], feedback: 'Test note from the server test', spin: '' } }) })
    assert.equal(r.status, 204)
    await new Promise((res) => setTimeout(res, 1800))
    assert.match(fs.readFileSync(gen, 'utf8'), /Test note from the server test/)
  } finally {
    server.close()
    fs.writeFileSync(dec, before);
    (await import('../src/brief.mjs')).writeSpec()
  }
})
