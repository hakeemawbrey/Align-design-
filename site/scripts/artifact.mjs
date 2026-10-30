// Turns the artifact build into one page plus the card's three images, ready to publish
// as a claude.ai Artifact: artifact/align-beta.html and artifact/img/…
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

const dist = 'dist-artifact/assets'
const out = 'artifact'
const files = readdirSync(dist)
const read = (ext) => files.filter((f) => f.endsWith(ext)).map((f) => readFileSync(join(dist, f), 'utf8')).join('\n')
// keep a literal </script> inside the bundle from closing the tag early
const js = read('.js').replaceAll('</script', '<\\/script')
const css = read('.css')

const fonts = 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap'
const page = `<title>Align Beta</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="theme-color" content="#0B0620">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fonts}">
<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
`
rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })
writeFileSync(join(out, 'align-beta.html'), page)

// Juniper's card: her aura, her sign figure (the deck card's fallback) and her photo
for (const img of ['img/aura/libra.jpg', 'img/figure/libra.jpg', 'img/juniper.jpg']) {
  mkdirSync(join(out, dirname(img)), { recursive: true })
  copyFileSync(join('../app/public', img), join(out, img))
}
console.log(`artifact/align-beta.html  ${(page.length / 1024).toFixed(0)} kB`)
