// Launches headless Chromium for rendering. Uses Playwright's own browser when
// it's installed, else a system one (PLAYWRIGHT_CHROMIUM, or the cloud image's
// /opt/pw-browsers build), since Playwright and the machine's browser can drift.
import fs from 'node:fs'
import { chromium } from 'playwright'

const ARGS = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required']

export async function launchBrowser() {
  try {
    return await chromium.launch({ args: ARGS })
  } catch (e) {
    const fallback = [process.env.PLAYWRIGHT_CHROMIUM, '/opt/pw-browsers/chromium_headless_shell', '/opt/pw-browsers/chromium'].find((p) => p && fs.existsSync(p))
    if (!fallback) throw e
    return chromium.launch({ args: ARGS, executablePath: fallback })
  }
}
