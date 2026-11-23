// Log into Instagram once in a Chrome window of the study's own, and save that login for the downloads.
//
//   node src/instagram-login.mjs            # opens the window only if you're not logged in yet
//   node src/instagram-login.mjs --show     # always open it (to switch accounts, say)
//
// The window has its own profile in ~/.align-study/instagram-browser, so it never touches your everyday
// Chrome and needs no Keychain or Full Disk Access. You type your own password in it; this script never
// sees it. Once you're in, it writes the window's Instagram cookies to ~/.align-study/instagram-cookies.txt
// (only you can read it) and the other steps use that file: --cookies ~/.align-study/instagram-cookies.txt
//
// Exit codes: 0 logged in · 77 not logged in after 15 minutes · 1 anything else.
import { chmodSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { EXIT } from './download.mjs'
import { HOME, ensureDir, sleep } from './paths.mjs'

const IG = 'https://www.instagram.com'
export const cookieFile = () => path.join(HOME, 'instagram-cookies.txt')

/** Netscape cookie file (what gallery-dl and yt-dlp read), Instagram cookies only. */
export function cookiesTxt(cookies) {
  const lines = ['# Netscape HTTP Cookie File', '# Written by Align Study from its own Instagram window. Keep private.']
  for (const c of cookies) {
    if (!/(^|\.)instagram\.com$/.test(c.domain.replace(/^\./, ''))) continue
    const domain = c.domain.startsWith('.') ? c.domain : `.${c.domain}`
    lines.push([domain, 'TRUE', c.path || '/', c.secure ? 'TRUE' : 'FALSE', c.expires > 0 ? Math.round(c.expires) : 0, c.name, c.value].join('\t'))
  }
  return lines.join('\n') + '\n'
}

export const isLoggedIn = (cookies) => cookies.some((c) => c.name === 'sessionid' && c.value && /instagram\.com$/.test(c.domain))

async function open(headless) {
  let chromium
  try { ({ chromium } = await import('playwright-core')) } catch {
    console.error('Missing a piece: run `npm install` in the study folder.'); process.exit(EXIT.failed)
  }
  const profile = ensureDir(path.join(HOME, 'instagram-browser'))
  const base = { headless, viewport: { width: 480, height: 860 } }
  const tries = process.env.STUDY_CHROME ? [{ executablePath: process.env.STUDY_CHROME }] : [{ channel: 'chrome' }, { channel: 'msedge' }, { channel: 'chromium' }, {}]
  let last
  for (const t of tries) {
    try { return await chromium.launchPersistentContext(profile, { ...base, ...t }) } catch (e) { last = e }
  }
  console.error(`Couldn't open a browser window: ${last?.message?.split('\n')[0]}\nInstall Google Chrome (google.com/chrome) and run again.`)
  process.exit(EXIT.failed)
}

function save(cookies) {
  const file = cookieFile()
  writeFileSync(file, cookiesTxt(cookies), { mode: 0o600 })
  chmodSync(file, 0o600)
  return file
}

async function main(argv) {
  const show = argv.includes('--show')
  if (!show) {
    // Quietly check the saved window first, so a logged-in study doesn't flash a window every time.
    const ctx = await open(true)
    const cookies = await ctx.cookies(IG)
    await ctx.close()
    if (isLoggedIn(cookies)) { save(cookies); console.log('Already logged into Instagram in the study window. Login saved.'); return EXIT.ok }
  }
  const ctx = await open(false)
  const page = ctx.pages()[0] ?? await ctx.newPage()
  await page.goto(`${IG}/accounts/login/`, { waitUntil: 'domcontentloaded' }).catch(() => {})
  console.log('\nLog into Instagram in the Chrome window that just opened (any account that can see the page you want to study).')
  console.log("It carries on by itself once you're in, and remembers the login next time.")
  const until = Date.now() + 15 * 60 * 1000
  while (Date.now() < until) {
    await sleep(2000)
    const cookies = await ctx.cookies(IG).catch(() => [])
    if (isLoggedIn(cookies)) {
      await sleep(3000) // let Instagram finish setting its other cookies
      save(await ctx.cookies(IG))
      console.log('Logged in. Login saved for the downloads.')
      await ctx.close()
      return EXIT.ok
    }
    if (!ctx.pages().length) break // window closed
  }
  await ctx.close().catch(() => {})
  console.error("Not logged in. Run again (or press Resume) when you're ready.")
  return EXIT.login
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exit(await main(process.argv.slice(2)))
