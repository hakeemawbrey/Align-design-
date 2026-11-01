import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { accountsFromEnv, client } from '../src/ig.mjs'
import { resolveReel, pickAccounts, rank, toCsv } from '../src/cli.mjs'

/** A stand-in for Meta: answers by URL pattern and records every call. */
function fakeMeta(routes) {
  const calls = []
  const fetch = async (url, init = {}) => {
    const body = init.body && typeof init.body === 'string' ? Object.fromEntries(new URLSearchParams(init.body)) : null
    calls.push({ url, method: init.method ?? 'GET', body, headers: init.headers ?? {} })
    for (const [re, answer] of routes) {
      if (re.test(url)) {
        const out = typeof answer === 'function' ? answer(url, body) : answer
        return { ok: !out.error, status: out.error ? 400 : 200, json: async () => out }
      }
    }
    return { ok: false, status: 404, json: async () => ({ error: { message: `no route for ${url}`, code: 0 } }) }
  }
  return { fetch, calls }
}

test('accounts come from IG_<NAME>_TOKEN, with the old single pair as "default"', () => {
  const env = {
    IG_MAIN_TOKEN: 'EAAmain', IG_MAIN_USER_ID: '111',
    IG_SIDE_HUSTLE_TOKEN: 'IGAAside',
    IG_ACCESS_TOKEN: 'EAAlegacy', IG_USER_ID: '999',
    IG_EMPTY_TOKEN: '',
  }
  const got = accountsFromEnv(env)
  assert.deepEqual(got.map((a) => [a.name, a.userId, a.login]), [
    ['default', '999', 'facebook'],
    ['main', '111', 'facebook'],
    ['side_hustle', null, 'instagram'],
  ])
})

test('picking accounts: one is implicit, several need --account or --all', () => {
  const one = [{ name: 'main' }]
  const two = [{ name: 'main' }, { name: 'alt' }]
  assert.deepEqual(pickAccounts(one, {}), one)
  assert.throws(() => pickAccounts(two, {}), /--account/)
  assert.deepEqual(pickAccounts(two, { account: 'alt,MAIN' }).map((a) => a.name), ['alt', 'main'])
  assert.equal(pickAccounts(two, { everyone: true }).length, 2)
  assert.throws(() => pickAccounts(two, { account: 'nope' }), /No account called/)
  assert.throws(() => pickAccounts([], {}), /IG_<NAME>_TOKEN/)
})

test('a local file is posted as a trial reel: container, upload, wait, publish', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'ig-'))
  const file = path.join(dir, 'reel.mp4')
  writeFileSync(file, Buffer.alloc(2048, 1))
  let polls = 0
  const meta = fakeMeta([
    [/rupload\.facebook\.com\/ig-api-upload\/v24\.0\/C1$/, { success: true }],
    [/graph\.facebook\.com\/v24\.0\/111\/media$/, { id: 'C1' }],
    [/\/C1\?/, () => ({ status_code: ++polls < 2 ? 'IN_PROGRESS' : 'FINISHED' })],
    [/\/111\/media_publish$/, { id: 'M1' }],
    [/\/M1\?/, { permalink: 'https://www.instagram.com/reel/abc/', timestamp: '2026-11-01T00:00:00+0000' }],
    [/\/111\?/, { username: 'align' }],
  ])
  const c = client({ name: 'main', token: 'EAAsecret', userId: '111', login: 'facebook' }, { fetch: meta.fetch, wait: async () => {} })
  const res = await c.postReel({ file, caption: 'for the leos', trial: 'manual' })
  assert.equal(res.mediaId, 'M1')
  assert.equal(res.permalink, 'https://www.instagram.com/reel/abc/')

  const create = meta.calls.find((x) => /\/111\/media$/.test(x.url))
  assert.equal(create.body.media_type, 'REELS')
  assert.equal(create.body.upload_type, 'resumable')
  assert.deepEqual(JSON.parse(create.body.trial_params), { graduation_strategy: 'MANUAL' })
  assert.equal(create.body.caption, 'for the leos')

  const upload = meta.calls.find((x) => /rupload/.test(x.url))
  assert.equal(upload.headers.Authorization, 'OAuth EAAsecret')
  assert.equal(upload.headers.file_size, '2048')
  assert.equal(upload.headers.offset, '0')
  assert.equal(polls, 2)
})

test('auto trials graduate on performance; --url sends video_url; public reels send no trial', async () => {
  const meta = fakeMeta([
    [/\/media$/, { id: 'C2' }],
    [/\/C2\?/, { status_code: 'FINISHED' }],
    [/\/media_publish$/, { id: 'M2' }],
    [/\/M2\?/, {}],
    [/graph\.instagram\.com\/v24\.0\/222\?/, { user_id: '222', username: 'alt' }],
  ])
  const c = client({ name: 'alt', token: 'IGAAx', userId: '222', login: 'instagram' }, { fetch: meta.fetch, wait: async () => {} })
  await c.postReel({ videoUrl: 'https://cdn.example/leo.mp4', trial: 'auto' })
  await c.postReel({ videoUrl: 'https://cdn.example/leo.mp4', trial: null })
  const [auto, pub] = meta.calls.filter((x) => /\/media$/.test(x.url))
  assert.deepEqual(JSON.parse(auto.body.trial_params), { graduation_strategy: 'SS_PERFORMANCE' })
  assert.equal(auto.body.video_url, 'https://cdn.example/leo.mp4')
  assert.equal(pub.body.trial_params, undefined)
  assert.ok(meta.calls.every((x) => !/rupload/.test(x.url)))
})

test('Instagram Login accounts refuse local files up front', async () => {
  const c = client({ name: 'alt', token: 'IGAAx', userId: '222', login: 'instagram' }, { fetch: async () => { throw new Error('should not call') } })
  await assert.rejects(c.postReel({ file: '/x.mp4' }), /--url/)
})

test('a failed video stops before publishing', async () => {
  const meta = fakeMeta([
    [/\/media$/, { id: 'C3' }],
    [/\/C3\?/, { status_code: 'ERROR', status: 'bad codec' }],
    [/\/111\?/, { username: 'align' }],
  ])
  const c = client({ name: 'main', token: 'EAA', userId: '111', login: 'facebook' }, { fetch: meta.fetch, wait: async () => {} })
  await assert.rejects(c.postReel({ videoUrl: 'https://x/v.mp4' }), /bad codec/)
  assert.ok(!meta.calls.some((x) => /media_publish/.test(x.url)))
})

test('errors never leak the token', async () => {
  const meta = fakeMeta([[/./, { error: { message: 'Invalid OAuth access token', code: 190 } }]])
  const c = client({ name: 'main', token: 'EAAverysecret', userId: '111', login: 'facebook' }, { fetch: meta.fetch })
  await assert.rejects(c.whoami(), (e) => /code 190/.test(e.message) && !/verysecret/.test(e.message))
})

test('a Facebook token with no id finds its linked Instagram account', async () => {
  const meta = fakeMeta([
    [/me\/accounts\?/, { data: [{ id: 'page', instagram_business_account: { id: '333', username: 'align' } }] }],
    [/\/333\?/, { username: 'align' }],
  ])
  const c = client({ name: 'main', token: 'EAA', userId: null, login: 'facebook' }, { fetch: meta.fetch })
  assert.deepEqual(await c.whoami(), { id: '333', username: 'align' })
})

test('insights keep the metrics Meta offers when one is rejected', async () => {
  const meta = fakeMeta([[/\/M1\/insights\?/, (url) => {
    const metric = new URL(url).searchParams.get('metric')
    if (metric.includes('reels_skip_rate') && metric.includes(',')) return { error: { message: 'metric not supported', code: 100 } }
    if (metric === 'reels_skip_rate') return { error: { message: 'metric not supported', code: 100 } }
    return { data: metric.split(',').map((name) => ({ name, values: [{ value: name === 'views' ? 1200 : 7 }] })) }
  }]])
  const c = client({ name: 'main', token: 'EAA', userId: '111', login: 'facebook' }, { fetch: meta.fetch })
  const s = await c.insights('M1', ['views', 'reels_skip_rate', 'shares'])
  assert.deepEqual(s, { views: 1200, shares: 7 })
})

test('reels resolve by id, by short name and by sign, with caption and hashtags', () => {
  const leo = resolveReel('leo')
  assert.equal(leo.id, '05-leo')
  assert.match(leo.file, /reels\/out\/05-leo\.mp4$/)
  assert.match(leo.caption, /^for the leos[^\n]*\n\n#leo #astrology/)
  assert.equal(resolveReel('05-leo').id, '05-leo')
  const town = resolveReel('full-moon-taurus')
  assert.match(town.file, /reels\/out\/town\/01-full-moon-taurus\.mp4$/)
  assert.ok(town.hook)
  assert.throws(() => resolveReel('nonsense-reel'), /No reel called/)
})

test('ranking puts the lowest skip rate first; CSV quotes captions safely', () => {
  const posts = [
    { account: 'a', reel: 'x', stats: { reels_skip_rate: 40, ig_reels_avg_watch_time: 5000 } },
    { account: 'a', reel: 'y', hook: 'dear leo, "hi"', stats: { reels_skip_rate: 20, ig_reels_avg_watch_time: 3000 } },
    { account: 'b', reel: 'z', stats: null },
  ]
  assert.deepEqual(rank(posts).map((p) => p.reel), ['y', 'x', 'z'])
  const csv = toCsv(rank(posts))
  assert.match(csv, /"dear leo, ""hi"""/)
  assert.match(csv, /,3\.0,20,/)
})
