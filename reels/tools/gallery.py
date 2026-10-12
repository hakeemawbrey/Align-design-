"""Build a phone-friendly gallery page of the 12 reels, with web-size copies.

  python3 tools/gallery.py OUT_DIR [--seed 0]

Writes OUT_DIR/index.html and OUT_DIR/v/<sign>.mp4 (720p copies, ~5MB each),
ready to publish as one page with its video files.
"""
import argparse
import html
import json
import os
import re
import subprocess

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIGNS = json.load(open(os.path.join(HERE, "signs.json")))
ORDER = ["aries", "taurus", "gemini", "cancer", "leo", "virgo",
         "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]

CSS = """
/* layout: one column of reels on a phone, a 3-4 column wall on desktop; the night sky is the page */
:root {
  --night: #0b0a0f; --ink: #ece6d8; --dim: #9a93a6; --rule: #2a2733; --gold: #d7b46a;
  --display: "IM Fell English SC", "Iowan Old Style", Georgia, serif;
  --body: "Spectral", Georgia, serif;
  --mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
  color-scheme: dark;
}
body { background: var(--night); color: var(--ink); font-family: var(--body); font-size: 16px; line-height: 1.5; }
main { max-width: 1240px; margin: 0 auto; padding-inline: 16px; padding-block: 40px 64px; }
header { display: grid; gap: 10px; margin-bottom: 36px; max-width: 62ch; }
h1 { font-family: var(--display); font-weight: 400; font-size: clamp(2.4rem, 7vw, 4rem); line-height: 1; margin: 0; letter-spacing: .02em; text-wrap: balance; }
.lede { color: var(--dim); margin: 0; }
.meta { font-family: var(--mono); font-size: .75rem; color: var(--dim); letter-spacing: .06em; text-transform: uppercase; }
.wall { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 36px 20px; }
.reel { display: grid; gap: 10px; min-width: 0; }
.frame { position: relative; aspect-ratio: 9 / 16; max-width: 100%; background: #000; border: 1px solid var(--rule); }
.frame video { width: 100%; height: 100%; display: block; object-fit: cover; }
.head { display: flex; align-items: baseline; gap: 10px; }
.num { font-family: var(--display); color: var(--gold); font-size: 1.1rem; min-width: 2.4em; }
h2 { font-family: var(--display); font-weight: 400; font-size: 1.6rem; margin: 0; letter-spacing: .03em; }
.facts { font-family: var(--mono); font-size: .72rem; color: var(--dim); letter-spacing: .05em; text-transform: uppercase; }
.cap { margin: 0; font-style: italic; }
details { font-size: .8rem; color: var(--dim); }
summary { cursor: pointer; font-family: var(--mono); font-size: .72rem; letter-spacing: .05em; text-transform: uppercase; }
summary:focus-visible, video:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
details ul { padding-left: 1.1em; margin: 8px 0 0; display: grid; gap: 4px; overflow-wrap: anywhere; }
footer { margin-top: 56px; color: var(--dim); font-size: .85rem; max-width: 62ch; }
"""


def credits(sign, seed):
    p = os.path.join(HERE, "out", f"{sign}-s{seed}.txt")
    lines = open(p).read().split("Imagery:\n", 1)[1].strip().splitlines() if os.path.exists(p) else []
    out = []
    for ln in lines:
        parts = [x.strip() for x in ln.lstrip("- ").split(" / ")]
        title, creator, lic, url = (parts + ["", "", "", ""])[:4]
        title = re.sub(r"^File:", "", title)
        who = f" — {html.escape(creator)}" if creator else ""
        out.append(f'<li>{html.escape(title)}{who} · {html.escape(lic)}'
                   + (f' · <a href="{html.escape(url)}" style="color:inherit">source</a>' if url.startswith("http") else "")
                   + "</li>")
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("out")
    ap.add_argument("--seed", type=int, default=0)
    a = ap.parse_args()
    os.makedirs(os.path.join(a.out, "v"), exist_ok=True)
    cards = []
    for s in ORDER:
        src = os.path.join(HERE, "out", f"{s}-s{a.seed}.mp4")
        dst = os.path.join(a.out, "v", f"{s}.mp4")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", "scale=720:1280",
                        "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-maxrate", "2.2M",
                        "-bufsize", "4.4M", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k",
                        "-movflags", "+faststart", dst], check=True)
        poster = os.path.join(a.out, "v", f"{s}.jpg")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1.6", "-i", src, "-frames:v", "1",
                        "-vf", "scale=480:-1", "-q:v", "4", poster], check=True)
        c = SIGNS[s]
        cards.append(f"""
<article class="reel" id="{s}">
  <div class="frame"><video src="v/{s}.mp4" poster="v/{s}.jpg" controls playsinline preload="none" aria-label="{c['name']} reel"></video></div>
  <div class="head"><span class="num">{c['numeral']}</span><h2>{c['name']}</h2></div>
  <div class="facts">{c['dates']} · {c['element']} · ruled by {c['ruler']}</div>
  <p class="cap">{html.escape(c['caption'])}</p>
  <details><summary>Image credits</summary><ul>{credits(s, a.seed)}</ul></details>
</article>""")
    page = f"""<title>Zodiac Reels</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=Spectral:ital,wght@0,400;1,400&family=IBM+Plex+Mono:wght@400&display=swap">
<style>{CSS}</style>
<main>
  <header>
    <div class="meta">Align · 12 reels · 18.4s · 1080×1920</div>
    <h1>Zodiac Reels</h1>
    <p class="lede">One reel per sign, cut to the tarot-card format: the card alone on black, a hit at 2.2 seconds, then the sign's motifs every 0.6 seconds behind the ghosted card. Tap a reel to play it with sound.</p>
  </header>
  <section class="wall">{''.join(cards)}
  </section>
  <footer>These are 720p previews. The full-resolution files for posting come from <span class="meta">reels/out/</span> in the repo. Every image is open-licensed or public domain. Credit lines for CC BY and BY-SA images belong in the post caption.</footer>
</main>"""
    open(os.path.join(a.out, "index.html"), "w").write(page)
    print(os.path.join(a.out, "index.html"))


if __name__ == "__main__":
    main()
