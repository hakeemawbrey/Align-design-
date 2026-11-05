import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'

// Point every folder at a scratch area before the modules read them.
const TMP = mkdtempSync(path.join(os.tmpdir(), 'align-study-'))
process.env.STUDY_MEDIA_DIR = path.join(TMP, 'media')
process.env.STUDY_PACK_DIR = path.join(TMP, 'pack')
process.env.STUDY_HOME = path.join(TMP, 'home')

const { handleOf } = await import('../src/paths.mjs')
const { readPosts, isoDate, hashtagsOf, mergeNumbers } = await import('../src/posts.mjs')
const { galleryArgs, parseProfile, classify, cursorOf } = await import('../src/download.mjs')
const { fromYtdlp, fromMeta, ytdlpArgs } = await import('../src/numbers.mjs')
const { frameTimes, cleanTranscript, parseOcr, uniqueLines, processPost, sheetLayout, makeSheet } = await import('../src/process.mjs')
const { buildRecords, buildReport, repeatedOpeners, toCsv, median, fmt, firstSentence, captionHook, writePack } = await import('../src/report.mjs')

const HAS_FFMPEG = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0

/** One gallery-dl --write-metadata file, shaped like the real thing. */
function meta(code, num, { type = 'post', video = false, count = 1, caption = '', likes = 100, date = '2026-10-03 17:04:11', pinned = [] } = {}) {
  return {
    category: 'instagram', subcategory: 'posts', post_id: '3' + code.length, post_shortcode: code,
    likes, liked: false, pinned, description: caption, username: 'tylerinthemaking', fullname: 'Tyler',
    post_date: date, date, type, post_url: `https://www.instagram.com/${type === 'reel' ? 'reel' : 'p'}/${code}/`,
    num, count, media_id: `${code}${num}`, shortcode: code, display_url: 'https://cdn/x.jpg',
    video_url: video ? 'https://cdn/x.mp4' : null, width: 1080, height: video ? 1920 : 1350, extension: video ? 'mp4' : 'jpg',
    ...(type === 'post' && count > 1 ? { sidecar_shortcode: code } : {}),
  }
}

function fixture(dir, { real = false } = {}) {
  mkdirSync(dir, { recursive: true })
  const put = (name, m) => {
    const file = path.join(dir, name)
    if (real && name.endsWith('.mp4')) {
      spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc2=size=540x960:rate=24:duration=9', '-f', 'lavfi', '-i', 'sine=frequency=330:duration=9', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', file])
    } else if (real) {
      spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc=size=1080x1350:rate=1', '-frames:v', '1', file])
    } else writeFileSync(file, 'x')
    writeFileSync(file + '.json', JSON.stringify(m))
  }
  // count 2: gallery-dl counts the reel's music track, which isn't downloaded.
  put('REEL1.01.mp4', meta('REEL1', 1, { type: 'reel', video: true, count: 2, caption: '3 red flags she\'s not the one 🚩\n\nComment "PROTOCOL" and I\'ll send you the guide #dating #relationships', likes: 5400, date: '2026-10-20 23:10:00', pinned: ['123'] }))
  put('CARO1.01.jpg', meta('CARO1', 1, { count: 3, caption: 'How to plan a first date she remembers. Save this for later.', likes: 900, date: '2026-10-10 14:00:00' }))
  put('CARO1.02.jpg', meta('CARO1', 2, { count: 3 }))
  put('CARO1.03.mp4', meta('CARO1', 3, { count: 3, video: true }))
  put('PHOTO1.01.jpg', meta('PHOTO1', 1, { caption: 'Sunday.', likes: 300, date: '2026-09-01 09:00:00' }))
  writeFileSync(path.join(dir, '_profile.json'), JSON.stringify({ username: 'tylerinthemaking', name: 'Tyler', followers: 12000, posts: 3, bio: 'Becoming the man she prays for.' }))
}

test('handles come out of whatever gets pasted', () => {
  assert.equal(handleOf('@TylerInTheMaking'), 'tylerinthemaking')
  assert.equal(handleOf('https://www.instagram.com/tylerinthemaking?mdxt=a21xcHNk'), 'tylerinthemaking')
  assert.equal(handleOf('instagram.com/tyler.in_the.making/'), 'tyler.in_the.making')
  assert.equal(handleOf('https://www.instagram.com/reel/ABC/'), null)
  assert.equal(handleOf('not a handle!'), null)
})

test('downloads become one record per post: reels, carousels, photos', () => {
  const dir = path.join(TMP, 'read')
  fixture(dir)
  writeFileSync(path.join(dir, 'GONE.01.mp4.json'), JSON.stringify(meta('GONE', 1, { video: true })))   // details but no file
  const posts = readPosts(dir)
  assert.deepEqual(posts.map((p) => [p.shortcode, p.type, p.files.length]), [['REEL1', 'reel', 1], ['CARO1', 'carousel', 3], ['PHOTO1', 'photo', 1]])
  const [reel, caro] = posts
  assert.equal(reel.date, '2026-10-20T23:10:00.000Z')
  assert.equal(reel.pinned, true)
  assert.equal(caro.pinned, false)
  assert.deepEqual(reel.hashtags, ['#dating', '#relationships'])
  assert.equal(reel.url, 'https://www.instagram.com/reel/REEL1/')
  assert.deepEqual(caro.files.map((f) => f.kind), ['image', 'image', 'video'])
  assert.equal(isoDate('2026-01-02T03:04:05Z'), '2026-01-02T03:04:05.000Z')
  assert.equal(isoDate('nope'), null)
  assert.deepEqual(hashtagsOf('#Love #love #ÉTÉ'), ['#love', '#été'])
})

test('gallery-dl is asked for the whole grid, politely, resumable', () => {
  const a = galleryArgs('tylerinthemaking', '/m/t', { cookiesFromBrowser: 'chrome' })
  const s = a.join(' ')
  assert.match(s, /--download-archive \/m\/t\/_archive\.sqlite3/)
  assert.match(s, /--write-metadata/)
  assert.match(s, /-f \{post_shortcode\}\.\{num:>02\}\.\{extension\}/)
  assert.match(s, /-o include=posts /)
  assert.match(s, /--cookies-from-browser chrome/)
  assert.equal(a.at(-1), 'https://www.instagram.com/tylerinthemaking/')
  assert.match(galleryArgs('x', '/d', { reelsTab: true, limit: 12 }).join(' '), /include=posts,reels.*max-posts=12/)
  assert.match(galleryArgs('x', '/d', { check: true }).join(' '), /--simulate -o max-posts=1/)
})

test('the profile reads from either shape Instagram answers with', () => {
  const web = parseProfile(JSON.stringify([[2, { username: 't', full_name: 'Tyler', biography: 'bio', edge_followed_by: { count: 1200 }, edge_follow: { count: 50 }, edge_owner_to_timeline_media: { count: 80 }, bio_links: [{ title: 'Guide', url: 'https://beacons.ai/t' }] }]]))
  assert.deepEqual([web.followers, web.following, web.posts, web.links[0].url], [1200, 50, 80, 'https://beacons.ai/t'])
  const rest = parseProfile(JSON.stringify([[2, { username: 't', follower_count: 9, media_count: 3, is_private: true }]]))
  assert.deepEqual([rest.followers, rest.posts, rest.private], [9, 3, true])
  assert.equal(parseProfile('not json'), null)
  assert.equal(parseProfile(JSON.stringify([[-1, { error: 'HttpError' }]])), null)
})

test('a stopped download says why', () => {
  assert.equal(classify(0, ''), 'ok')
  assert.equal(classify(4, '[instagram][error] HttpError: \'429 Too Many Requests\''), 'slowDown')
  assert.equal(classify(4, 'Please wait a few minutes before you try again.'), 'slowDown')
  assert.equal(classify(4, 'AbortExtraction: HTTP redirect to login page (https://www.instagram.com/accounts/login/)'), 'login')
  assert.equal(classify(8, 'NotFoundError: Requested user could not be found'), 'missing')
  assert.equal(classify(1, 'something odd'), 'failed')
  // Info lines and file names don't count: a cookie note isn't a login problem, a shortcode with 404 isn't a missing user.
  const noisy = '[cookies][info] Extracted 41 cookies from chrome\n[download][error] Failed to download DAb404xQ.01.jpg\n'
  assert.equal(classify(4, noisy), 'failed')
  assert.equal(classify(4, '[cookies][info] Extracted 41 cookies from chrome\n[instagram][error] HttpError: \'429 Too Many Requests\''), 'slowDown')
  assert.equal(cursorOf("[instagram][info] Use '-o cursor=QVFE_abc-12' to continue downloading from the current position"), 'QVFE_abc-12')
  assert.equal(cursorOf('nothing'), null)
  assert.match(galleryArgs('x', '/d', { cursor: 'QVFE' }).join(' '), /-o cursor=QVFE/)
  assert.match(galleryArgs('x', '/d', {}).join(' '), /--sleep-request 8-16/)
})

test('numbers from yt-dlp and from Meta', () => {
  assert.deepEqual(fromYtdlp({ view_count: 120000, like_count: 5400, comment_count: 310, duration: 34.5 }), { views: 120000, likes: 5400, comments: 310, duration: 34.5, from: 'yt-dlp' })
  assert.deepEqual(fromYtdlp({ _type: 'playlist', like_count: 900, comment_count: 12, entries: [{ duration: 8 }] }), { views: null, likes: 900, comments: 12, duration: 8, from: 'yt-dlp' })
  assert.deepEqual(fromMeta([{ permalink: 'https://www.instagram.com/reel/REEL1/', like_count: 1, comments_count: 2, view_count: 3 }]), { REEL1: { views: 3, likes: 1, comments: 2, duration: null, from: 'meta' } })
  assert.ok(ytdlpArgs('u', { cookiesFromBrowser: 'safari' }).includes('--ignore-no-formats-error'))
  const merged = mergeNumbers({ shortcode: 'a', likes: 5 }, { views: 10, likes: null, comments: 2, from: 'yt-dlp' })
  assert.deepEqual([merged.views, merged.likes, merged.comments], [10, 5, 2])
})

test('stills lean on the hook', () => {
  assert.deepEqual(frameTimes(30), [0.2, 1.2, 2.5, 12, 19.5, 27])
  assert.deepEqual(frameTimes(2), [0.2, 0.8, 1.8])
  assert.deepEqual(frameTimes(0), [0])
  assert.equal(frameTimes(100).length, 6)
  assert.deepEqual(sheetLayout('reel', 6), { cols: 3, w: 240 })
  assert.deepEqual(sheetLayout('carousel', 8), { cols: 5, w: 360 })
})

test('a sheet keeps every slide even when slides differ in size', { skip: !HAS_FFMPEG && 'ffmpeg not installed' }, async () => {
  const dir = path.join(TMP, 'mixed'); mkdirSync(dir, { recursive: true })
  const sizes = ['720x900', '720x1280', '540x900']
  const colors = ['red', 'blue', 'green']
  sizes.forEach((sz, i) => spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', `color=c=${colors[i]}:size=${sz}`, '-frames:v', '1', path.join(dir, `0${i + 1}.jpg`)]))
  const out = path.join(dir, 'sheet.jpg')
  assert.ok(await makeSheet(dir, 3, out, { cols: 3, w: 120 }))
  // Sample the middle of each cell: none may be white.
  for (const x of [66, 192, 318]) {
    const px = spawnSync('ffmpeg', ['-v', 'error', '-i', out, '-vf', `crop=2:2:${x}:70`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], { encoding: 'buffer' }).stdout
    assert.ok(px.length === 12 && Math.min(...px) < 200, `cell at x=${x} is blank: ${[...px]}`)
  }
})

test('transcripts drop music tags and keep timings', () => {
  const t = cleanTranscript({ transcription: [
    { offsets: { from: 0, to: 1800 }, text: ' [Music]' },
    { offsets: { from: 1800, to: 4200 }, text: ' If she does this on the first date,' },
    { offsets: { from: 4200, to: 6000 }, text: ' she is not the one. (laughs) ♪' },
  ] })
  assert.equal(t.text, 'If she does this on the first date, she is not the one.')
  assert.deepEqual(t.segments.map((s) => [s.from, s.to]), [[1.8, 4.2], [4.2, 6]])
  assert.equal(t.speech, true)
  assert.equal(cleanTranscript({ transcription: [{ offsets: {}, text: ' (upbeat music)' }] }).speech, false)
})

test('on-screen text: one line per still, repeats shown once', () => {
  const files = ['/a/01.jpg', '/a/02.jpg', '/a/03.jpg']
  const per = parseOcr('{"file":"/a/02.jpg","lines":["3 RED FLAGS"," she\'s not the one "]}\n{"file":"/a/01.jpg","lines":["3 red flags"]}\nnoise\n', files)
  assert.deepEqual(per, [['3 red flags'], ['3 RED FLAGS', "she's not the one"], []])
  assert.deepEqual(uniqueLines(per), ['3 red flags', "she's not the one"])
})

test('report helpers', () => {
  assert.equal(median([3, 1, 2]), 2)
  assert.equal(median([1, 2, 3, 4]), 2.5)
  assert.equal(median([null, undefined]), null)
  assert.deepEqual([fmt(950), fmt(1234), fmt(45678), fmt(2500000), fmt(null)], ['950', '1.2K', '46K', '2.5M', '–'])
  assert.equal(firstSentence('Men, listen. This is the rest.'), 'Men, listen.')
  assert.equal(captionHook('#tag\n\nFirst real line here. More.'), 'First real line here.')
})

function fakeRecs() {
  const posts = Array.from({ length: 16 }, (_, i) => ({
    shortcode: `P${i}`, url: `https://www.instagram.com/reel/P${i}/`, type: i % 4 === 3 ? 'carousel' : 'reel',
    date: new Date(Date.UTC(2026, 9, 1 + i, 23)).toISOString(), pinned: false,
    caption: i < 4 ? `Ladies, ${i + 3} red flags on a first date. Comment "FLAGS" for the list` : 'Fellas, open the door for her. Follow for more #gentleman',
    hashtags: i < 4 ? [] : ['#gentleman'], mentions: [], coauthors: [], location: null,
    views: i % 4 === 3 ? null : 1000 * (16 - i), likes: 100 * (16 - i), comments: 10, duration: 20 + i,
    files: [{ file: 'x' }, { file: 'y' }], numbersFrom: 'yt-dlp',
  }))
  const work = (code) => ({ frames: [{ t: 0.2 }, { t: 1.2 }, { t: 9 }], onScreen: [[code === 'P0' ? 'POV: you finally met a gentleman' : 'Fellas listen'], [], ['end card']], transcript: { text: 'If you want her to stay, take the lead. Plan the date.', segments: [{ from: 0, to: 3, text: 'If you want her to stay, take the lead.' }], speech: true, words: 11 } })
  return buildRecords(posts, work)
}

test('records: hook, topics, shapes, asks, and lift against the typical post', () => {
  const recs = fakeRecs()
  const p0 = recs[0]
  assert.equal(p0.hook.screen, 'POV: you finally met a gentleman')
  assert.equal(p0.hook.spoken, 'If you want her to stay, take the lead.')
  assert.equal(p0.hook.caption, 'Ladies, 3 red flags on a first date.')
  for (const t of ['standards', 'first-dates', 'gentleman']) assert.ok(p0.topics.includes(t), t)
  for (const f of ['speech', 'screen-hook', 'pov', 'list', 'to-women', 'you']) assert.ok(p0.formats.includes(f), f)
  assert.ok(p0.ctas.includes('comment-word'))
  assert.ok(recs[5].ctas.includes('follow'))
  // Reels by views, carousels by likes, each against its own median.
  const reels = recs.filter((r) => r.type === 'reel')
  assert.equal(median(reels.map((r) => r.lift)), 1)
  assert.equal(recs[3].metric, 'likes')
  assert.ok(recs[0].lift > recs[14].lift)
})

test('the report has every section and repeated openers', () => {
  const recs = fakeRecs()
  const md = buildReport({ handle: 'tylerinthemaking', profile: { name: 'Tyler', followers: 12000, posts: 16, bio: 'b', links: [{ title: 'Guide', url: 'https://x' }] }, recs, now: new Date('2026-11-05') })
  for (const h of ['## The page', '## At a glance', '## Formats', '## Top 16 posts', '## Top quarter vs bottom quarter', '## Reel length', '## Topics', '## Openers they reuse', '## Calls to action', '## When they post (America/Chicago)']) assert.ok(md.includes(h), h)
  assert.match(md, /Being a gentleman/)
  assert.match(md, /"fellas listen…"/)
  const op = repeatedOpeners(recs)
  assert.equal(op[0].opener, 'fellas listen')
  const csv = toCsv(recs)
  assert.equal(csv.split('\n')[0].split(',')[0], 'shortcode')
  assert.match(csv, /"Ladies, 3 red flags on a first date. Comment ""FLAGS"" for the list"/)
})

test('a whole run on real files: stills, sheet, speech, on-screen text, pack', { skip: !HAS_FFMPEG && 'ffmpeg not installed' }, async () => {
  const handle = 'tylerinthemaking'
  const mdir = path.join(process.env.STUDY_MEDIA_DIR, handle)
  fixture(mdir, { real: true })
  writeFileSync(path.join(mdir, '_numbers.json'), JSON.stringify({ REEL1: { views: 120000, likes: 5400, comments: 310, duration: 9, from: 'yt-dlp' } }))

  // Stand-ins for whisper.cpp and the macOS text reader, so this runs anywhere.
  const bin = path.join(TMP, 'bin'); mkdirSync(bin, { recursive: true })
  const whisper = path.join(bin, 'whisper-cli')
  writeFileSync(whisper, `#!/usr/bin/env node
const a = process.argv.slice(2), of = a[a.indexOf('-of') + 1], f = a[a.indexOf('-f') + 1]
if (!require('fs').existsSync(f)) process.exit(1)
require('fs').writeFileSync(of + '.json', JSON.stringify({ transcription: [{ offsets: { from: 0, to: 2500 }, text: ' Three red flags she is not the one.' }, { offsets: { from: 2500, to: 5000 }, text: ' Number one, she never asks about you.' }] }))
`)
  const ocr = path.join(bin, 'align-ocr')
  writeFileSync(ocr, `#!/usr/bin/env node
for (const f of process.argv.slice(2)) console.log(JSON.stringify({ file: f, lines: f.endsWith('01.jpg') ? ['3 RED FLAGS', "she's not the one"] : ['@tylerinthemaking'] }))
`)
  chmodSync(whisper, 0o755); chmodSync(ocr, 0o755)
  const t = { ffmpeg: true, whisper, model: '/m.bin', modelName: 'small.en', modelReady: true, ocr }

  const wdir = path.join(mdir, '_work')
  for (const p of readPosts(mdir)) await processPost(p, mdir, wdir, t)
  const reel = JSON.parse(readFileSync(path.join(wdir, 'REEL1.json'), 'utf8'))
  assert.equal(reel.duration, 9)
  assert.equal(reel.type, 'reel')   // not a carousel, despite count 2
  assert.deepEqual(reel.frames.map((f) => f.t), [0.2, 1.2, 2.5, 3.6, 5.9, 8.1])
  assert.ok(existsSync(path.join(wdir, 'REEL1', 'sheet.jpg')))
  assert.equal(reel.transcript.text, 'Three red flags she is not the one. Number one, she never asks about you.')
  assert.deepEqual(reel.onScreen[0], ['3 RED FLAGS', "she's not the one"])
  const caro = JSON.parse(readFileSync(path.join(wdir, 'CARO1.json'), 'utf8'))
  assert.deepEqual(caro.frames.map((f) => [f.slide, f.kind]), [[1, 'image'], [2, 'image'], [3, 'video']])
  assert.equal(caro.transcript, undefined)

  // A second run has nothing left to do.
  for (const p of readPosts(mdir)) assert.deepEqual(await processPost(p, mdir, wdir, t), [])

  const { out, recs } = writePack(handle, { tz: 'America/Chicago' })
  assert.equal(recs.length, 3)
  const pack = JSON.parse(readFileSync(path.join(out, 'posts.json'), 'utf8'))
  const r = pack.posts.find((p) => p.shortcode === 'REEL1')
  assert.equal(r.views, 120000)
  assert.equal(r.hook.screen, "3 RED FLAGS / she's not the one")
  assert.equal(r.hook.spoken, 'Three red flags she is not the one.')
  assert.ok(existsSync(path.join(out, r.sheet)))
  assert.ok(existsSync(path.join(out, 'sheets', 'CARO1.jpg')))
  assert.match(readFileSync(path.join(out, 'report.md'), 'utf8'), /12K followers/)
  assert.ok(readFileSync(path.join(out, 'posts.csv'), 'utf8').includes('REEL1'))
})

test('the Mac scripts parse', () => {
  for (const f of ['install.sh', 'run.sh']) {
    const r = spawnSync('bash', ['-n', path.join(import.meta.dirname, '..', 'mac', f)], { encoding: 'utf8' })
    assert.equal(r.status, 0, `${f}: ${r.stderr}`)
  }
})
