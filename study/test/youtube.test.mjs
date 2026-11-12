import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const TMP = mkdtempSync(path.join(os.tmpdir(), 'align-study-yt-'))
process.env.STUDY_MEDIA_DIR = path.join(TMP, 'media')
process.env.STUDY_PACK_DIR = path.join(TMP, 'pack')
process.env.STUDY_HOME = path.join(TMP, 'home')

const yt = await import('../src/youtube.mjs')
const { channelOf, channelFromHandle, tabsOf, listArgs, entriesOf, mergeEntries, profileOf, videoArgs, whyFailed, exitFor, metaOf, json3Segments, vttSegments, pickCaption, captionTranscript, saveCaptions, videoFileOf } = yt
const { handleOf, readJson } = await import('../src/paths.mjs')
const { readPosts, loadPosts } = await import('../src/posts.mjs')
const { fromYtdlp } = await import('../src/numbers.mjs')
const { processPost } = await import('../src/process.mjs')
const { writePack } = await import('../src/report.mjs')

test('channel links and @handles become a channel and a yt- handle', () => {
  const g = { handle: 'yt-greenbrorants', url: 'https://www.youtube.com/@greenbrorants' }
  assert.deepEqual(channelOf('https://youtube.com/@greenbrorants'), g)
  assert.deepEqual(channelOf('https://youtube.com/@greenbrorants?si=AbCdEf123_xyz'), g)
  assert.deepEqual(channelOf('youtube.com/@greenbrorants/shorts?si=x&feature=share'), g)
  assert.deepEqual(channelOf('https://m.youtube.com/@greenbrorants/videos'), g)
  assert.deepEqual(channelOf('@greenbrorants'), g)
  assert.deepEqual(channelOf('  https://www.youtube.com/@GreenBro.Rants-1/featured  '), { handle: 'yt-greenbro.rants-1', url: 'https://www.youtube.com/@GreenBro.Rants-1' })
  assert.deepEqual(channelOf('https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv?si=1'), { handle: 'yt-ucabcdefghijklmnopqrstuv', url: 'https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv' })
  assert.deepEqual(channelOf('youtube.com/c/GreenBro'), { handle: 'yt-greenbro', url: 'https://www.youtube.com/c/GreenBro' })
  assert.deepEqual(channelOf('youtube.com/user/greenbro'), { handle: 'yt-greenbro', url: 'https://www.youtube.com/user/greenbro' })
  // A single video isn't a channel; neither is another site.
  assert.equal(channelOf('https://youtube.com/shorts/dQw4w9WgXcQ?si=abc'), null)
  assert.equal(channelOf('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), null)
  assert.equal(channelOf('https://youtu.be/dQw4w9WgXcQ?si=abc'), null)
  assert.equal(channelOf('https://www.instagram.com/greenbrorants/'), null)
  assert.equal(channelOf('https://evilyoutube.com/@x'), null)

  // The later steps take the yt- handle as it is.
  assert.equal(handleOf('yt-greenbrorants'), 'yt-greenbrorants')
  assert.deepEqual(channelFromHandle('yt-greenbrorants', null), g)
  assert.deepEqual(channelFromHandle('yt-ucabcdefghijklmnopqrstuv', { handle: 'yt-ucabcdefghijklmnopqrstuv', url: 'https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv' }).url, 'https://www.youtube.com/channel/UCabcdefghijklmnopqrstuv')
  assert.equal(channelFromHandle('yt-ucabcdefghijklmnopqrstuv', null), null)   // the case was lost; needs the link
  assert.deepEqual(tabsOf(g).map((t) => t.url), ['https://www.youtube.com/@greenbrorants/videos', 'https://www.youtube.com/@greenbrorants/shorts'])
})

test('yt-dlp arguments: your browser\'s login, flat listing, 720p with captions, nothing else', () => {
  const l = listArgs({ kind: 'short', url: 'https://www.youtube.com/@g/shorts' }, { limit: 5 }).join(' ')
  assert.equal(l, '--cookies-from-browser chrome --flat-playlist -J --no-warnings --no-progress --playlist-end 5 https://www.youtube.com/@g/shorts')
  assert.match(listArgs({ url: 'u' }, { cookiesFromBrowser: 'safari' }).join(' '), /^--cookies-from-browser safari /)
  assert.match(listArgs({ url: 'u' }, { cookies: '/c.txt' }).join(' '), /^--cookies \/c\.txt /)
  const a = videoArgs({ id: 'abcdefghijk', url: 'https://www.youtube.com/shorts/abcdefghijk' }, '/m/yt-g', {})
  const s = a.join(' ')
  assert.match(s, /^--cookies-from-browser chrome /)
  assert.match(s, /height<=720/)
  assert.match(s, /--write-subs --write-auto-subs --sub-langs en\.\* --sub-format json3\/vtt\/best/)
  assert.match(s, /-o infojson:\/m\/yt-g\/_yt\/abcdefghijk /)
  assert.match(s, /-o subtitle:\/m\/yt-g\/_yt\/abcdefghijk /)
  assert.match(s, /-o \/m\/yt-g\/abcdefghijk\.01\.%\(ext\)s https:\/\/www\.youtube\.com\/shorts\/abcdefghijk$/)
  assert.doesNotMatch(s, /extractor-args|player.client|po.token/i)
})

test('a channel listing becomes videos and a profile', () => {
  const shorts = {
    _type: 'playlist', id: 'UCxyz', title: 'Green Bro Rants - Shorts', channel: 'Green Bro Rants', channel_id: 'UCxyz', uploader_id: '@greenbrorants',
    channel_url: 'https://www.youtube.com/channel/UCxyz', channel_follower_count: 48100, description: 'Rants about plants. ',
    entries: [
      { _type: 'url', id: 'AAAAAAAAAAA', url: 'https://www.youtube.com/shorts/AAAAAAAAAAA', title: 'Stop overwatering', view_count: 1200 },
      { _type: 'url', id: 'BBBBBBBBBBB', url: 'https://www.youtube.com/shorts/BBBBBBBBBBB', title: 'Pothos myths' },
      { _type: 'url', id: 'not-an-id', url: 'x' },
    ],
  }
  const videos = { _type: 'playlist', entries: [{ _type: 'url', id: 'CCCCCCCCCCC', url: 'https://www.youtube.com/watch?v=CCCCCCCCCCC', title: 'My whole setup' }, { _type: 'url', id: 'AAAAAAAAAAA', url: 'https://www.youtube.com/shorts/AAAAAAAAAAA' }] }
  const s = entriesOf(shorts, 'short')
  assert.deepEqual(s.map((e) => [e.id, e.kind, e.url]), [['AAAAAAAAAAA', 'short', 'https://www.youtube.com/shorts/AAAAAAAAAAA'], ['BBBBBBBBBBB', 'short', 'https://www.youtube.com/shorts/BBBBBBBBBBB']])
  const v = entriesOf(videos, 'video')
  assert.deepEqual(v.map((e) => [e.id, e.kind]), [['CCCCCCCCCCC', 'video'], ['AAAAAAAAAAA', 'short']])
  assert.deepEqual(mergeEntries(v, s).map((e) => e.id), ['CCCCCCCCCCC', 'AAAAAAAAAAA', 'BBBBBBBBBBB'])
  assert.deepEqual(entriesOf({ entries: [{ _type: 'playlist', entries: [{ id: 'DDDDDDDDDDD' }] }] }, 'video').map((e) => e.id), ['DDDDDDDDDDD'])

  const p = profileOf(shorts, channelOf('@greenbrorants'))
  assert.equal(p.site, 'youtube')
  assert.equal(p.username, 'yt-greenbrorants')
  assert.equal(p.name, 'Green Bro Rants')
  assert.equal(p.followers, 48100)
  assert.equal(p.bio, 'Rants about plants.')
  assert.equal(p.link, 'https://www.youtube.com/@greenbrorants')
})

test('the bot check and 429 mean "wait 30 minutes" (exit 75)', () => {
  const bot = "ERROR: [youtube] AAAAAAAAAAA: Sign in to confirm you’re not a bot. Use --cookies-from-browser or --cookies for the authentication. See  https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp"
  assert.equal(whyFailed(bot), 'slowDown')
  assert.equal(exitFor(whyFailed(bot)), 75)
  assert.equal(exitFor(whyFailed("ERROR: [youtube] x: Sign in to confirm you're not a bot")), 75)
  assert.equal(exitFor(whyFailed('ERROR: unable to download video data: HTTP Error 429: Too Many Requests')), 75)
  assert.equal(exitFor(whyFailed("ERROR: [youtube] x: Video unavailable. This content isn't available, try again later.")), 75)
  assert.equal(exitFor(whyFailed('ERROR: [youtube] x: The provided YouTube account cookies are no longer valid.')), 77)
  assert.equal(whyFailed('ERROR: [youtube] x: Sign in to confirm your age. This video may be inappropriate for some users.'), 'skip')
  assert.equal(whyFailed('ERROR: [youtube] x: Private video. Sign in if you\'ve been granted access to this video'), 'skip')
  assert.equal(exitFor(whyFailed('ERROR: [youtube] x: Private video')), null)
  assert.equal(whyFailed('ERROR: something odd'), 'failed')
  assert.equal(exitFor('failed'), null)
})

test('info.json becomes the details posts.mjs reads', () => {
  const info = { id: 'AAAAAAAAAAA', title: 'Stop overwatering your pothos #plants', description: 'Water when the top inch is dry.\n#houseplants', timestamp: 1790000000, upload_date: '20260921', view_count: 52000, like_count: 3100, comment_count: 140, duration: 41, width: 720, height: 1280, channel: 'Green Bro Rants', webpage_url: 'https://www.youtube.com/shorts/AAAAAAAAAAA' }
  const m = metaOf(info, { id: info.id, kind: 'short' })
  assert.equal(m.category, 'youtube')
  assert.equal(m.subcategory, 'short')
  assert.equal(m.post_shortcode, 'AAAAAAAAAAA')
  assert.equal(m.post_url, 'https://www.youtube.com/shorts/AAAAAAAAAAA')
  assert.equal(m.title, 'Stop overwatering your pothos #plants')
  assert.equal(m.description, 'Stop overwatering your pothos #plants\n\nWater when the top inch is dry.\n#houseplants')
  assert.equal(m.date, new Date(1790000000 * 1000).toISOString())
  assert.equal(m.likes, 3100)

  const long = metaOf({ id: 'CCCCCCCCCCC', title: 'My whole setup', description: 'My whole setup', upload_date: '20250102', width: 1280, height: 720, duration: 900 }, { id: 'CCCCCCCCCCC', kind: 'video' })
  assert.equal(long.subcategory, 'video')
  assert.equal(long.post_url, 'https://www.youtube.com/watch?v=CCCCCCCCCCC')
  assert.equal(long.description, 'My whole setup')   // no repeat when the description is just the title
  assert.equal(long.date, '2025-01-02T12:00:00Z')
  assert.deepEqual(fromYtdlp(info), { views: 52000, likes: 3100, comments: 140, duration: 41, from: 'yt-dlp' })
})

const JSON3 = {
  wireMagic: 'pb3',
  events: [
    { tStartMs: 0, dDurationMs: 41000, id: 1, wpWinPosId: 1, wsWinStyleId: 1 },
    { tStartMs: 160, dDurationMs: 2400, wWinId: 1, segs: [{ utf8: 'stop', acAsrConf: 0 }, { utf8: ' overwatering', tOffsetMs: 320 }, { utf8: ' your', tOffsetMs: 800 }] },
    { tStartMs: 1500, dDurationMs: 900, wWinId: 1, aAppend: 1, segs: [{ utf8: '\n' }] },
    { tStartMs: 2560, dDurationMs: 3000, wWinId: 1, segs: [{ utf8: 'pothos' }, { utf8: ' seriously' }] },
    { tStartMs: 6000, dDurationMs: 1000, wWinId: 1, segs: [{ utf8: '[Music]' }] },
  ],
}

const VTT = `WEBVTT
Kind: captions
Language: en

00:00:00.160 --> 00:00:02.550 align:start position:0%

stop<00:00:00.480><c> overwatering</c><00:00:00.960><c> your</c>

00:00:02.550 --> 00:00:02.560 align:start position:0%
stop overwatering your


00:00:02.560 --> 00:00:05.560 align:start position:0%
stop overwatering your
pothos<00:00:02.900><c> seriously</c>

00:00:05.560 --> 00:00:05.570 align:start position:0%
pothos seriously


00:00:06.000 --> 00:00:07.000
[Music]
`

test('YouTube captions (json3 or vtt) become transcript segments', () => {
  assert.deepEqual(json3Segments(JSON3), [
    { from: 0.16, to: 2.56, text: 'stop overwatering your' },
    { from: 2.56, to: 5.56, text: 'pothos seriously' },
    { from: 6, to: 7, text: '[Music]' },
  ])
  assert.deepEqual(vttSegments(VTT), [
    { from: 0.16, to: 2.55, text: 'stop overwatering your' },
    { from: 2.56, to: 5.56, text: 'pothos seriously' },
    { from: 6, to: 7, text: '[Music]' },
  ])
  // Numbered cues, as other tools write them; numbers that are words stay.
  assert.deepEqual(vttSegments('WEBVTT\n\n1\n00:00:01.000 --> 00:00:02.000\nthree\n\n2\n00:00:02.000 --> 00:00:03.500\nsigns\n7\n'), [
    { from: 1, to: 2, text: 'three' },
    { from: 2, to: 3.5, text: 'signs 7' },
  ])
  const a = captionTranscript(JSON.stringify(JSON3), 'json3')
  const b = captionTranscript(VTT, 'vtt', { auto: false })
  assert.deepEqual(a.segments, [{ from: 0.2, to: 2.6, text: 'stop overwatering your' }, { from: 2.6, to: 5.6, text: 'pothos seriously' }])
  assert.equal(a.text, 'stop overwatering your pothos seriously')
  assert.equal(a.words, 5)
  assert.equal(a.speech, true)
  assert.equal(a.model, 'youtube-auto-captions')
  assert.equal(b.text, a.text)
  assert.equal(b.model, 'youtube-captions')
  assert.equal(captionTranscript('not json', 'json3').speech, false)

  // The creator's own captions first, then the untranslated automatic ones, json3 before vtt.
  const files = ['AAAAAAAAAAA.en.vtt', 'AAAAAAAAAAA.en-orig.json3', 'AAAAAAAAAAA.en.json3', 'AAAAAAAAAAA.info.json', 'BBBBBBBBBBB.en.json3']
  assert.equal(pickCaption(files, 'AAAAAAAAAAA', {}).file, 'AAAAAAAAAAA.en-orig.json3')
  assert.deepEqual(pickCaption(files, 'AAAAAAAAAAA', { subtitles: { en: [] } }), { file: 'AAAAAAAAAAA.en.json3', lang: 'en', format: 'json3', auto: false })
  assert.equal(pickCaption(['AAAAAAAAAAA.en-US.vtt'], 'AAAAAAAAAAA', {}).lang, 'en-US')
  assert.equal(pickCaption(['AAAAAAAAAAA.fr.json3', 'AAAAAAAAAAA.info.json'], 'AAAAAAAAAAA', {}), null)
  assert.equal(pickCaption(['-AAAAAAAAAA.en.json3'], '-AAAAAAAAAA', {}).file, '-AAAAAAAAAA.en.json3')
})

test('a downloaded Short reads like a reel, its captions are its transcript, and it packs', async () => {
  const handle = 'yt-greenbrorants'
  const dir = path.join(TMP, 'media', handle)
  mkdirSync(path.join(dir, '_yt'), { recursive: true })
  const info = { id: 'AAAAAAAAAAA', title: 'Stop overwatering your pothos', description: 'Seriously. #plants', timestamp: 1790000000, view_count: 52000, like_count: 3100, comment_count: 140, duration: 41, width: 720, height: 1280 }
  const entry = { id: info.id, kind: 'short', url: `https://www.youtube.com/shorts/${info.id}` }
  writeFileSync(path.join(dir, `${info.id}.01.mp4`), 'x')
  writeFileSync(path.join(dir, `${info.id}.01.mp4.json`), JSON.stringify(metaOf(info, entry)))
  writeFileSync(path.join(dir, '_yt', `${info.id}.info.json`), JSON.stringify(info))
  writeFileSync(path.join(dir, '_yt', `${info.id}.en.json3`), JSON.stringify(JSON3))
  writeFileSync(path.join(dir, '_numbers.json'), JSON.stringify({ [info.id]: fromYtdlp(info) }))
  writeFileSync(path.join(dir, '_profile.json'), JSON.stringify(profileOf({ channel: 'Green Bro Rants', uploader_id: '@greenbrorants', channel_follower_count: 48100 }, channelOf('@greenbrorants'))))
  assert.equal(videoFileOf(dir, info.id), `${info.id}.01.mp4`)
  assert.equal(saveCaptions(dir, info.id, info).words, 5)
  assert.equal(readJson(path.join(dir, '_captions', `${info.id}.json`)).lang, 'en')
  assert.equal(saveCaptions(dir, 'ZZZZZZZZZZZ', {}), null)

  const [p] = readPosts(dir)
  assert.equal(p.type, 'reel')
  assert.equal(p.url, entry.url)
  assert.equal(p.title, 'Stop overwatering your pothos')
  assert.deepEqual(p.hashtags, ['#plants'])
  const [n] = loadPosts(handle)
  assert.deepEqual([n.views, n.likes, n.comments, n.duration], [52000, 3100, 140, 41])

  // Pretend the stills are already made, so only the transcript step runs: no whisper, no ffmpeg needed.
  const wdir = path.join(dir, '_work')
  mkdirSync(path.join(wdir, info.id), { recursive: true })
  writeFileSync(path.join(wdir, `${info.id}.json`), JSON.stringify({ v: 1, type: 'reel', frames: [], sheet: null, duration: 41, hasAudio: true }))
  const did = await processPost(p, dir, wdir, { ffmpeg: false, whisper: null, ocr: null })
  assert.match(did.join(' '), /5 words spoken \(YouTube's captions\)/)
  assert.equal(readJson(path.join(wdir, `${info.id}.json`)).transcript.text, 'stop overwatering your pothos seriously')

  const { out, recs } = writePack(handle)
  assert.equal(recs.length, 1)
  assert.equal(recs[0].title, 'Stop overwatering your pothos')
  assert.equal(recs[0].speech, true)
  assert.equal(recs[0].hook.spoken, 'stop overwatering your pothos seriously')
  assert.equal(recs[0].hook.caption, 'Stop overwatering your pothos')
  assert.ok(existsSync(path.join(out, 'report.md')))
  assert.match(readJson(path.join(out, 'posts.json')).profile.link, /@greenbrorants/)
})
