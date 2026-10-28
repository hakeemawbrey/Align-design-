#!/usr/bin/env python3
"""Align Gradient Reels review dashboard — approve/reject rendered reels in the browser.

Run:  python3 review/server.py   (serves on http://localhost:4319)

Approved reels are copied to approved/ with a .txt sidecar containing the
IG caption + pinned first comment, ready to upload.
"""

import base64
import hmac
import json
import os
import random
import re
import shutil
import subprocess
import sys
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# where renders and review decisions live; point it at a persistent disk on
# a cloud host (defaults to this folder, as on the Mac)
DATA = os.environ.get("REELS_DATA", ROOT)
OUT = os.path.join(DATA, "out")
APPROVED = os.path.join(DATA, "approved")
INSPO = os.path.join(DATA, "inspo")
STATE_FILE = os.path.join(DATA, "review-state.json")
MANIFEST_FILE = os.path.join(DATA, "out-manifest.json")
PORT = int(os.environ.get("PORT", 4319))
# 127.0.0.1 keeps it private on a laptop; a cloud host sets HOST=0.0.0.0
HOST = os.environ.get("HOST", "127.0.0.1")
# set REVIEW_PASSWORD when the dashboard is reachable from the internet
PASSWORD = os.environ.get("REVIEW_PASSWORD", "")

sys.path.insert(0, ROOT)
import render  # caption banks + IG caption templates


def load_state():
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            return json.load(f)
    return {}


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def guess_entry(base):
    """Bank entry for a render the manifest doesn't know, from its filename:
    "houston_scorpio_2" is the 2nd houston/scorpio line, matching how
    render.py numbers files."""
    m = re.match(r"([a-z]+)_([a-z]+?)(?:_(\d+))?$", base)
    if not m:
        return None
    entries = [e for e in render.load_bank()
               if e["mode"] == m.group(1) and e["sign"] == m.group(2)]
    if not entries:
        return None
    n = int(m.group(3) or 1)
    return entries[n - 1] if n <= len(entries) else entries[0]


def list_reels():
    state = load_state()
    manifest = load_manifest()
    reels = []
    for dirpath, _, files in os.walk(OUT):
        for fn in sorted(files):
            if not fn.endswith((".mp4", ".png")):
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, OUT)
            base = fn[:-4]
            info = manifest.get(rel)
            if info:
                mode, sign = info["mode"], info["sign"]
                entry = {"mode": mode, "sign": sign, "text": info["text"]}
            else:
                m = re.match(r"([a-z]+)_([a-z]+?)(?:_\d+)?$", base)
                mode = m.group(1) if m and m.group(1) in render.PALETTES else "random"
                sign = m.group(2) if m else ""
                entry = guess_entry(base)
            st = state.get(rel, {})
            caption = st.get("caption")
            if caption is None:
                caption = render.ig_caption(entry) if entry else \
                    f"waitlist → comealign.com (link in bio)\n\n{render.HASHTAGS_BASE}"
            reels.append({
                "id": rel,
                "name": fn,
                "type": "image" if fn.endswith(".png") else "video",
                "folder": os.path.dirname(rel) or "out",
                "mode": mode,
                "sign": sign,
                "text": entry["text"] if entry else "",
                "caption": caption,
                "comment": render.FIRST_COMMENT,
                "status": st.get("status", "pending"),
                "mtime": os.path.getmtime(full),
            })
    reels.sort(key=lambda r: -r["mtime"])
    return reels


def load_manifest():
    if os.path.exists(MANIFEST_FILE):
        with open(MANIFEST_FILE) as f:
            return json.load(f)
    return {}


def save_manifest(m):
    with open(MANIFEST_FILE, "w") as f:
        json.dump(m, f, indent=2)


def extract_colors(img):
    """Sample 3 dominant colors (top/mid/bottom) from an inspo image."""
    raw = subprocess.run(
        [render.FFMPEG, "-y", "-hide_banner", "-loglevel", "error", "-i", img,
         "-vf", "scale=1:3", "-frames:v", "1", "-f", "rawvideo",
         "-pix_fmt", "rgb24", "-"],
        capture_output=True, check=True).stdout
    return ["#%02x%02x%02x" % (raw[i], raw[i+1], raw[i+2])
            for i in range(0, 9, 3)]


MODEL = os.environ.get("REELS_MODEL", "claude-opus-5-5")


def ask_claude(prompt, image=None):
    """Run one prompt on Claude Opus 5.5 and return the reply text, or None.

    With ANTHROPIC_API_KEY set (a hosted server) it calls the API through the
    anthropic SDK; otherwise it uses the Claude Code CLI like before, so a
    signed-in Mac or a Claude Code cloud session needs no key."""
    if os.environ.get("ANTHROPIC_API_KEY"):
        return _ask_api(prompt, image)
    if not shutil.which("claude"):
        return None
    if image:
        prompt = f"Read the image file at {image} — {prompt}"
    try:
        r = subprocess.run(["claude", "-p", "--model", MODEL, prompt],
                           capture_output=True, text=True, timeout=300)
        return r.stdout
    except Exception:
        return None


def _ask_api(prompt, image=None):
    try:
        import anthropic
    except ImportError:
        print("note: pip install anthropic to write captions with an API key")
        return None
    content = []
    if image:
        ext = os.path.splitext(image)[1].lower()
        media = {".jpg": "image/jpeg", ".jpeg": "image/jpeg",
                 ".webp": "image/webp", ".gif": "image/gif"}.get(ext, "image/png")
        with open(image, "rb") as f:
            data = base64.standard_b64encode(f.read()).decode()
        content.append({"type": "image", "source": {
            "type": "base64", "media_type": media, "data": data}})
        prompt = f"The attached image — {prompt}"
    content.append({"type": "text", "text": prompt})
    try:
        resp = anthropic.Anthropic().beta.messages.create(
            model=MODEL, max_tokens=16000,
            output_config={"effort": "high"},
            # if Opus declines, let the API retry on a fallback model
            betas=["server-side-fallback-2026-07-01"],
            extra_body={"fallbacks": "default"},
            messages=[{"role": "user", "content": content}])
    except anthropic.APIError as e:
        print(f"claude api error: {e}")
        return None
    if resp.stop_reason == "refusal":
        return None
    return "".join(b.text for b in resp.content if b.type == "text")


def parse_json_array(text):
    m = re.search(r"\[.*\]", text or "", re.S)
    try:
        return json.loads(m.group(0)) if m else None
    except ValueError:
        return None


def inspo_captions(img, sign):
    """Ask headless Claude to write zodiac captions in the inspo image's style."""
    signs = render.SIGNS if sign in (None, "", "all") else [sign]
    prompt = (
        f"it's an example of a meme post whose "
        f"voice, humor style, and format we want to copy. Write one short funny "
        f"caption in that exact style for each of these zodiac signs: "
        f"{', '.join(signs)}. Zodiac/dating themed, lowercase unless the style "
        "says otherwise, no links, no hashtags, no emoji, under 140 characters "
        'each. Reply with ONLY a JSON array like '
        '[{"sign":"aries","text":"..."}] and nothing else.'
    )
    caps = parse_json_array(ask_claude(prompt, image=img))
    if caps and all(isinstance(c, dict) and c.get("sign") and c.get("text")
                    for c in caps):
        return caps
    return None


def voice_line(mode):
    voice = render.load_voices().get(mode)
    return f"\nThe '{mode}' genre is: {voice}." if voice else ""


def variation_captions(mode, sign, n=12):
    """Ask headless Claude for N unique captions in this mode's voice for one
    sign, using the sign's bank entries (if any) as style examples."""
    examples = [e["text"] for e in render.load_bank()
                if e["mode"] == mode and e["sign"] == sign]
    example_line = "".join(f'\nExample of the tone/format to match: "{t}"'
                           for t in examples)
    prompt = (
        f"Write {n} completely different short zodiac meme captions about "
        f"the sign {sign}, all in the '{mode}' voice/genre for a zodiac "
        f"dating app's Instagram.{voice_line(mode)}{example_line} Each one "
        f"must be a distinct joke/angle — no rephrasing the same idea twice. Lowercase unless "
        "the style needs caps for emphasis, no links, no hashtags, no emoji, "
        'under 220 characters each. Reply with ONLY a JSON array of strings '
        'like ["caption one", "caption two", ...] and nothing else.'
    )
    caps = parse_json_array(ask_claude(prompt))
    if caps and all(isinstance(c, str) and c.strip() for c in caps):
        return caps[:n]
    return None


def mix_captions(mode):
    """Ask headless Claude for one fresh caption per zodiac sign in this
    mode's voice, so one click gives a post for every sign."""
    examples = [e["text"] for e in render.load_bank() if e["mode"] == mode]
    random.shuffle(examples)
    example_line = "".join(f'\nExample of the tone/format to match: "{t}"'
                           for t in examples[:6])
    prompt = (
        f"Write 12 short zodiac meme captions, exactly one for each sign "
        f"({', '.join(render.SIGNS)}), all in the '{mode}' voice/genre for "
        f"a zodiac dating app's Instagram.{voice_line(mode)}{example_line} "
        "Each caption is about its own sign and is a different joke, not "
        "the same joke with the sign swapped. Lowercase unless the style "
        "needs caps for emphasis, no links, no hashtags, no emoji, under "
        "220 characters each. Reply with ONLY a JSON array like "
        '[{"sign":"aries","text":"..."}] and nothing else.'
    )
    caps = parse_json_array(ask_claude(prompt))
    if not caps:
        return None
    by_sign = {}
    for c in caps:
        if isinstance(c, dict) and isinstance(c.get("text"), str) \
                and c["text"].strip():
            sign = str(c.get("sign", "")).lower().strip()
            if sign in render.SIGNS:
                by_sign.setdefault(sign, c["text"].strip())
    # accept a reply that misses a sign or two; the caller fills the gaps
    return by_sign if len(by_sign) >= 9 else None


def more_like_this(mode, sign, seed_text, n=6):
    """Ask headless Claude for N captions riffing on this SPECIFIC post's
    joke/angle for the same sign — a tighter ask than variation_captions,
    which only anchors on the mode's generic bank example."""
    prompt = (
        f"Here is one zodiac meme caption for {sign}, in the '{mode}' "
        f'voice for a zodiac dating app\'s Instagram: "{seed_text}"'
        f"{voice_line(mode)}\n\n"
        f"Write {n} more captions that riff on this exact same joke/idea/"
        f"angle — same specific premise or structure, different wording or "
        f"a fresh punchline on the same setup — still about {sign}, still "
        f"in the '{mode}' voice. Not a generic new joke, a variation ON "
        "this one. Lowercase unless the style needs caps for emphasis, no "
        "links, no hashtags, no emoji, under 220 characters each. Reply "
        'with ONLY a JSON array of strings like ["caption one", "caption '
        'two", ...] and nothing else.'
    )
    caps = parse_json_array(ask_claude(prompt))
    if caps and all(isinstance(c, str) and c.strip() for c in caps):
        return caps[:n]
    return None


def resolve_entry(rel):
    """Recover {mode, sign, text[, colors]} for a rendered file, from the
    manifest if present, else by parsing the filename against the bank."""
    manifest = load_manifest()
    info = manifest.get(rel)
    if info:
        return info
    entry = guess_entry(os.path.basename(rel)[:-4])
    if not entry:
        return None
    return {"mode": entry["mode"], "sign": entry["sign"], "text": entry["text"]}


def render_entries(mode, entries):
    """Render each {sign, text} as a fresh still in out/ and record it."""
    manifest = load_manifest()
    made = []
    for e in entries:
        path = free_path(mode, e["sign"])
        render.render(e["text"], mode, path, still=True,
                      watermark=False, cta=False)
        rel = os.path.relpath(path, OUT)
        manifest[rel] = {"mode": mode, "sign": e["sign"], "text": e["text"]}
        made.append(rel)
    save_manifest(manifest)
    return made


def free_path(mode, sign):
    # never reuse a filename that still has an approve/reject decision on
    # file, even if the image itself was deleted — otherwise a fresh caption
    # rendered at that path silently inherits a stale verdict from whatever
    # used to live there
    state = load_state()
    base = f"{mode}_{sign}"
    i = 1
    name = base + ".png"
    while os.path.exists(os.path.join(OUT, name)) or name in state:
        i += 1
        name = f"{base}_{i}.png"
    os.makedirs(OUT, exist_ok=True)
    return os.path.join(OUT, name)


def approved_paths(rel):
    flat = rel.replace(os.sep, "__")
    return (os.path.join(APPROVED, flat),
            os.path.join(APPROVED, flat[:-4] + ".txt"))


def decide(rel, status, caption):
    state = load_state()
    src = os.path.normpath(os.path.join(OUT, rel))
    if not src.startswith(OUT) or not os.path.exists(src):
        return False
    state[rel] = {"status": status, "caption": caption}
    save_state(state)
    vid_dst, txt_dst = approved_paths(rel)
    if status == "approved":
        os.makedirs(APPROVED, exist_ok=True)
        shutil.copy2(src, vid_dst)
        with open(txt_dst, "w") as f:
            f.write(f"CAPTION:\n{caption}\n\nPIN AS FIRST COMMENT:\n"
                    f"{render.FIRST_COMMENT}\n\nreminder: add a trending "
                    f"sound in the IG app before posting\n")
    else:
        for p in (vid_dst, txt_dst):
            if os.path.exists(p):
                os.remove(p)
    return True


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def authorized(self):
        if not PASSWORD:
            return True
        auth = self.headers.get("Authorization", "")
        try:
            given = base64.b64decode(auth.split(" ", 1)[1]).decode().split(":", 1)[1] \
                if auth.startswith("Basic ") else ""
        except Exception:
            given = ""
        if hmac.compare_digest(given.encode(), PASSWORD.encode()):
            return True
        self.send_response(401)
        self.send_header("WWW-Authenticate", 'Basic realm="Align Gradient Reels"')
        self.send_header("Content-Length", "0")
        self.end_headers()
        return False

    def send_json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if not self.authorized():
            return
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/":
            with open(os.path.join(ROOT, "review", "index.html"), "rb") as f:
                body = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        elif parsed.path == "/api/reels":
            self.send_json(list_reels())
        elif parsed.path == "/video":
            qs = urllib.parse.parse_qs(parsed.query)
            rel = qs.get("id", [""])[0]
            download = qs.get("dl", ["0"])[0] == "1"
            full = os.path.normpath(os.path.join(OUT, rel))
            if not full.startswith(OUT) or not os.path.isfile(full):
                self.send_error(404)
                return
            if full.endswith(".png"):
                with open(full, "rb") as f:
                    body = f.read()
                self.send_response(200)
                self.send_header("Content-Type", "image/png")
                self.send_header("Content-Length", str(len(body)))
                if download:
                    self.send_header("Content-Disposition",
                        f'attachment; filename="{os.path.basename(rel)}"')
                self.end_headers()
                self.wfile.write(body)
            else:
                self.serve_video(full, download)
        else:
            self.send_error(404)

    def serve_video(self, path, download=False):
        size = os.path.getsize(path)
        rng = self.headers.get("Range")
        start, end = 0, size - 1
        if rng:
            m = re.match(r"bytes=(\d*)-(\d*)", rng)
            if m:
                if m.group(1):
                    start = int(m.group(1))
                if m.group(2):
                    end = min(int(m.group(2)), size - 1)
        length = end - start + 1
        self.send_response(206 if rng else 200)
        self.send_header("Content-Type", "video/mp4")
        self.send_header("Accept-Ranges", "bytes")
        if rng:
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(length))
        if download:
            self.send_header("Content-Disposition",
                f'attachment; filename="{os.path.basename(path)}"')
        self.end_headers()
        with open(path, "rb") as f:
            f.seek(start)
            remaining = length
            while remaining > 0:
                chunk = f.read(min(65536, remaining))
                if not chunk:
                    break
                try:
                    self.wfile.write(chunk)
                except BrokenPipeError:
                    return
                remaining -= len(chunk)

    def do_POST(self):
        if not self.authorized():
            return
        length = int(self.headers.get("Content-Length", 0))
        data = json.loads(self.rfile.read(length)) if length else {}
        if self.path == "/api/decide":
            ok = decide(data["id"], data["status"], data.get("caption", ""))
            self.send_json({"ok": ok})
        elif self.path == "/api/generate":
            mode = data.get("mode")
            sign = data.get("sign", "all")
            if mode not in render.PALETTES:
                self.send_json({"ok": False, "error": "unknown mode"}, 400)
                return
            entries = [e for e in render.load_bank() if e["mode"] == mode
                       and (sign == "all" or e["sign"] in (sign, "all"))]
            # locking to one sign means "give me 12 unique jokes for this
            # sign" — ask Claude for 12 distinct captions in this mode's
            # voice rather than repeating the bank's one line 12 times
            used_claude = False
            if sign != "all":
                variations = variation_captions(mode, sign, 12)
                if variations:
                    entries = [{"mode": mode, "sign": sign, "text": t}
                               for t in variations]
                    used_claude = True
                elif entries:
                    entries = entries * 12
            made = render_entries(mode, entries)
            self.send_json({"ok": True, "count": len(made), "files": made,
                            "claude": used_claude})
        elif self.path == "/api/mix":
            # one post per sign, all 12, in the chosen genre
            mode = data.get("mode")
            if mode not in render.PALETTES:
                self.send_json({"ok": False, "error": "unknown mode"}, 400)
                return
            written = mix_captions(mode) or {}
            bank = [e for e in render.load_bank() if e["mode"] == mode]
            entries = []
            for sign in render.SIGNS:
                text = written.get(sign)
                if not text:
                    # no Claude, or it skipped this sign: a random bank line
                    # for the sign, else any line from the genre
                    pool = [e["text"] for e in bank if e["sign"] == sign] \
                        or [e["text"] for e in bank]
                    if not pool:
                        continue
                    text = random.choice(pool)
                entries.append({"sign": sign, "text": text})
            made = render_entries(mode, entries)
            self.send_json({"ok": True, "count": len(made), "files": made,
                            "claude": bool(written)})
        elif self.path == "/api/regen":
            rel = data["id"]
            full = os.path.normpath(os.path.join(OUT, rel))
            if not full.startswith(OUT) or not os.path.isfile(full):
                self.send_json({"ok": False, "error": "not found"}, 404)
                return
            info = resolve_entry(rel)
            if not info:
                self.send_json({"ok": False, "error": "no caption known"}, 400)
                return
            mode = info["mode"] if info["mode"] in render.PALETTES else "random"
            render.render(info["text"], mode, full, still=True,
                          watermark=False, cta=False,
                          colors=info.get("colors"))
            state = load_state()
            prev = state.get(rel, {})
            decide(rel, "pending", prev.get("caption", ""))
            self.send_json({"ok": True})
        elif self.path == "/api/more":
            rel = data["id"]
            src = os.path.normpath(os.path.join(OUT, rel))
            if not src.startswith(OUT) or not os.path.isfile(src):
                self.send_json({"ok": False, "error": "not found"}, 404)
                return
            info = resolve_entry(rel)
            if not info:
                self.send_json({"ok": False, "error": "no caption known"}, 400)
                return
            mode = info["mode"] if info["mode"] in render.PALETTES else "random"
            sign = info["sign"]
            variations = more_like_this(mode, sign, info["text"], 6)
            used_claude = variations is not None
            if not variations:
                variations = [info["text"]] * 6
            manifest = load_manifest()
            made = []
            for text in variations:
                path = free_path(mode, sign)
                render.render(text, mode, path, still=True,
                              watermark=False, cta=False)
                out_rel = os.path.relpath(path, OUT)
                manifest[out_rel] = {"mode": mode, "sign": sign, "text": text}
                made.append(out_rel)
            save_manifest(manifest)
            self.send_json({"ok": True, "count": len(made), "files": made,
                            "claude": used_claude})
        elif self.path == "/api/inspo":
            name = re.sub(r"[^A-Za-z0-9._-]", "_", data.get("name", "inspo.png"))
            raw = base64.b64decode(data["data"].split(",")[-1])
            os.makedirs(INSPO, exist_ok=True)
            img = os.path.join(INSPO, name)
            with open(img, "wb") as f:
                f.write(raw)
            colors = extract_colors(img)
            sign = data.get("sign", "all")
            caps = inspo_captions(img, sign)
            used_claude = caps is not None
            if not caps:
                mode = data.get("mode", "random")
                caps = [{"sign": e["sign"], "text": e["text"]}
                        for e in render.load_bank() if e["mode"] == mode
                        and (sign == "all" or e["sign"] in (sign, "all"))]
            manifest = load_manifest()
            made = []
            for c in caps:
                path = free_path("inspo", c["sign"])
                render.render(c["text"], "random", path, still=True,
                              watermark=False, cta=False, colors=colors)
                rel = os.path.relpath(path, OUT)
                manifest[rel] = {"mode": "inspo", "sign": c["sign"],
                                 "text": c["text"], "colors": colors}
                made.append(rel)
            save_manifest(manifest)
            self.send_json({"ok": True, "count": len(made),
                            "claude": used_claude, "colors": colors})
        else:
            self.send_error(404)


if __name__ == "__main__":
    print(f"Align Gradient Reels review → http://localhost:{PORT}")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
