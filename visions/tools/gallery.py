"""Build a phone-friendly gallery page of rendered reels, with web-size copies.

  python3 tools/gallery.py OUT_DIR out/love-03-s0.mp4 out/aries-02-s1.mp4 ...
  python3 tools/gallery.py OUT_DIR --last 24        # the newest 24 in out/state.json

Writes OUT_DIR/index.html, OUT_DIR/v/<name>.mp4 (720p, ~2MB) and a poster jpg each,
ready to publish as one page with its video files.
"""
import argparse
import html
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, HERE)
import render  # noqa: E402

CSS = """
/* layout: one column of reels on a phone, a wall of them on desktop; night page, white type like the reels */
:root {
  --night: #07070d; --ink: #f2f0f7; --dim: #9b98ad; --rule: #24233a; --moon: #8fb4ff;
  --display: "Sofia Sans Condensed", "Arial Narrow", sans-serif;
  --word: "EB Garamond", Georgia, serif;
  --mono: ui-monospace, Menlo, monospace;
  color-scheme: dark;
}
body { background: var(--night); color: var(--ink); font-family: var(--display); font-size: 17px; line-height: 1.45; }
main { max-width: 1280px; margin: 0 auto; padding-inline: 16px; padding-block: 40px 64px; }
header { display: grid; gap: 10px; margin-bottom: 32px; max-width: 64ch; }
h1 { font-family: var(--word); font-style: italic; font-weight: 700; font-size: clamp(2.6rem, 8vw, 4.4rem); line-height: 1; margin: 0; }
.lede { color: var(--dim); margin: 0; }
.meta { font-family: var(--mono); font-size: .72rem; color: var(--dim); letter-spacing: .06em; text-transform: uppercase; }
.filters { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 28px; }
.filters button { font: inherit; font-size: .9rem; color: var(--ink); background: transparent; border: 1px solid var(--rule); border-radius: 999px; padding: 6px 14px; cursor: pointer; min-height: 36px; }
.filters button[aria-pressed="true"] { background: var(--ink); color: var(--night); border-color: var(--ink); }
.filters button:focus-visible, summary:focus-visible, video:focus-visible { outline: 2px solid var(--moon); outline-offset: 2px; }
.wall { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 32px 18px; }
.reel { display: grid; gap: 8px; min-width: 0; align-content: start; }
.reel[hidden] { display: none; }
.frame { aspect-ratio: 9 / 16; background: #000; border: 1px solid var(--rule); }
.frame video { width: 100%; height: 100%; display: block; object-fit: cover; }
.line { margin: 0; font-weight: 700; font-size: 1.05rem; line-height: 1.25; }
details { font-size: .85rem; color: var(--dim); }
summary { cursor: pointer; font-family: var(--mono); font-size: .7rem; letter-spacing: .05em; text-transform: uppercase; }
details pre { white-space: pre-wrap; font-family: var(--display); font-size: .9rem; color: var(--ink); margin: 8px 0 0; overflow-wrap: anywhere; }
footer { margin-top: 56px; color: var(--dim); font-size: .9rem; max-width: 64ch; }
"""

JS = """
const btns = [...document.querySelectorAll('.filters button')];
btns.forEach(b => b.addEventListener('click', () => {
  btns.forEach(x => x.setAttribute('aria-pressed', x === b));
  document.querySelectorAll('.reel').forEach(r => { r.hidden = b.dataset.f !== 'all' && r.dataset.theme !== b.dataset.f; });
}));
// play the reel in view, muted, like a feed; tap for sound
const io = new IntersectionObserver(es => es.forEach(e => {
  const v = e.target;
  if (e.isIntersecting && e.intersectionRatio > 0.6) { v.play().catch(() => {}); } else { v.pause(); }
}), { threshold: [0, 0.6, 1] });
document.querySelectorAll('video').forEach(v => io.observe(v));
"""

LABELS = {"love": "Love", "soul": "Soul", "align": "Alignment", "sky": "Sky", "sign": "Signs"}


def web_copy(src, dst_dir):
    name = os.path.basename(src).replace(".mp4", "")
    v = os.path.join(dst_dir, "v", name + ".mp4")
    p = os.path.join(dst_dir, "v", name + ".jpg")
    os.makedirs(os.path.dirname(v), exist_ok=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", "scale=720:-2", "-c:v", "libx264",
                    "-crf", "27", "-maxrate", "1.8M", "-bufsize", "3.6M", "-preset", "slow", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", v], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1.1", "-i", src, "-frames:v", "1", "-vf", "scale=540:-2",
                    "-q:v", "4", p], check=True)
    return f"v/{name}.mp4", f"v/{name}.jpg"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("out")
    ap.add_argument("files", nargs="*")
    ap.add_argument("--last", type=int)
    ap.add_argument("--title", help="page title (default Align Visions)")
    ap.add_argument("--by-sign", action="store_true", help="filter by sign instead of theme")
    a = ap.parse_args()
    files = a.files
    if a.last:
        st = json.load(open(os.path.join(HERE, "out", "state.json")))
        files = [os.path.join(HERE, m["file"]) for m in st["made"][-a.last:]]
    lines = {ln["id"]: ln for ln in render.load_lines()["lines"]}
    cards, themes = [], []
    for f in files:
        base = os.path.basename(f).replace(".mp4", "")
        lid, seed = base.rsplit("-s", 1)
        ln = lines.get(lid, {"text": lid, "theme": "align"})
        th = ln.get("theme", "align")
        if a.by_sign and ln.get("sign"):
            th = ln["sign"]
        themes.append(th)
        vid, poster = web_copy(f, a.out)
        cap = open(f.replace(".mp4", ".txt")).read() if os.path.exists(f.replace(".mp4", ".txt")) else ""
        label = LABELS.get(th, th.title()) if th != "sign" else (ln.get("sign") or "").title()
        cards.append(f"""<article class="reel" data-theme="{th}">
  <div class="frame"><video src="{vid}" poster="{poster}" controls playsinline muted loop preload="none" aria-label="{html.escape(ln['text'])}"></video></div>
  <div class="meta">{html.escape(label)} · seed {seed}</div>
  <p class="line">{html.escape(ln['text'])}</p>
  <details><summary>Caption and credits</summary><pre>{html.escape(cap)}</pre></details>
</article>""")
    present = list(dict.fromkeys(themes)) if a.by_sign else [t for t in LABELS if t in themes]
    filt = "".join(f'<button type="button" data-f="{t}" aria-pressed="false">{LABELS.get(t, t.title())}</button>'
                   for t in present)
    title = a.title or "Align Visions"
    page = f"""<title>{html.escape(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,700&family=Sofia+Sans+Condensed:wght@400;700&display=swap">
<style>{CSS}</style>
<main>
  <header>
    <div class="meta">Align · {len(cards)} reels · 1080×1920 · 24 fps</div>
    <h1>{html.escape(title)}</h1>
    <p class="lede">An endless reel maker in the moonlit dark-fantasy format: a square of night paintings cutting every quarter second under one line about love, spirit, alignment or the stars, then the Align wordmark. Every line can be re-rolled forever with new pictures, order and music.</p>
  </header>
  <nav class="filters" aria-label="Filter by theme"><button type="button" data-f="all" aria-pressed="true">All</button>{filt}</nav>
  <section class="wall">
{chr(10).join(cards)}
  </section>
  <footer>These are 720p previews; the 1080p files for posting come from <span class="meta">visions/out/</span>. Every picture is public domain or openly licensed. Each reel's caption and credit list is under its video; CC BY and BY-SA images need their credit in the post caption or bio.</footer>
</main>
<script>{JS}</script>
"""
    os.makedirs(a.out, exist_ok=True)
    open(os.path.join(a.out, "index.html"), "w").write(page)
    print(os.path.join(a.out, "index.html"))


if __name__ == "__main__":
    main()
