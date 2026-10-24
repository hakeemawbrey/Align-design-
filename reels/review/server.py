#!/usr/bin/env python3
"""Align Gradient Reels review dashboard — approve/reject rendered reels in the browser.

Run:  python3 review/server.py   (serves on http://localhost:4319)

Approved reels are copied to approved/ with a .txt sidecar containing the
IG caption + pinned first comment, ready to upload.
"""

import base64
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "out")
APPROVED = os.path.join(ROOT, "approved")
INSPO = os.path.join(ROOT, "inspo")
STATE_FILE = os.path.join(ROOT, "review-state.json")
MANIFEST_FILE = os.path.join(ROOT, "out-manifest.json")
PORT = 4319

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


def bank_lookup():
    by_slug = {}
    for e in render.load_bank():
        by_slug.setdefault(f"{e['mode']}_{e['sign']}", e)
    return by_slug


def list_reels():
    state = load_state()
    bank = bank_lookup()
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
                entry = bank.get(f"{mode}_{sign}")
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


def inspo_captions(img, sign):
    """Ask headless Claude to write zodiac captions in the inspo image's style."""
    if not shutil.which("claude"):
        return None
    signs = render.SIGNS if sign in (None, "", "all") else [sign]
    prompt = (
        f"Read the image file at {img} — it's an example of a meme post whose "
        f"voice, humor style, and format we want to copy. Write one short funny "
        f"caption in that exact style for each of these zodiac signs: "
        f"{', '.join(signs)}. Zodiac/dating themed, lowercase unless the style "
        "says otherwise, no links, no hashtags, no emoji, under 140 characters "
        'each. Reply with ONLY a JSON array like '
        '[{"sign":"aries","text":"..."}] and nothing else.'
    )
    try:
        r = subprocess.run(["claude", "-p", prompt], capture_output=True,
                           text=True, timeout=240)
        m = re.search(r"\[.*\]", r.stdout, re.S)
        caps = json.loads(m.group(0)) if m else None
        if caps and all(c.get("sign") and c.get("text") for c in caps):
            return caps
    except Exception:
        pass
    return None


def variation_captions(mode, sign, n=12):
    """Ask headless Claude for N unique captions in this mode's voice for one
    sign, using the existing bank entry (if any) as a style example."""
    if not shutil.which("claude"):
        return None
    example = bank_lookup().get(f"{mode}_{sign}")
    example_line = f'\nExample of the tone/format to match: "{example["text"]}"' \
        if example else ""
    prompt = (
        f"Write {n} completely different short zodiac meme captions about "
        f"the sign {sign}, all in the '{mode}' voice/genre for a zodiac "
        f"dating app's Instagram.{example_line} Each one must be a distinct "
        f"joke/angle — no rephrasing the same idea twice. Lowercase unless "
        "the style needs caps for emphasis, no links, no hashtags, no emoji, "
        'under 220 characters each. Reply with ONLY a JSON array of strings '
        'like ["caption one", "caption two", ...] and nothing else.'
    )
    try:
        r = subprocess.run(["claude", "-p", prompt], capture_output=True,
                           text=True, timeout=240)
        m = re.search(r"\[.*\]", r.stdout, re.S)
        caps = json.loads(m.group(0)) if m else None
        if caps and all(isinstance(c, str) and c.strip() for c in caps):
            return caps[:n]
    except Exception:
        pass
    return None


def more_like_this(mode, sign, seed_text, n=6):
    """Ask headless Claude for N captions riffing on this SPECIFIC post's
    joke/angle for the same sign — a tighter ask than variation_captions,
    which only anchors on the mode's generic bank example."""
    if not shutil.which("claude"):
        return None
    prompt = (
        f"Here is one zodiac meme caption for {sign}, in the '{mode}' "
        f'voice for a zodiac dating app\'s Instagram: "{seed_text}"\n\n'
        f"Write {n} more captions that riff on this exact same joke/idea/"
        f"angle — same specific premise or structure, different wording or "
        f"a fresh punchline on the same setup — still about {sign}, still "
        f"in the '{mode}' voice. Not a generic new joke, a variation ON "
        "this one. Lowercase unless the style needs caps for emphasis, no "
        "links, no hashtags, no emoji, under 220 characters each. Reply "
        'with ONLY a JSON array of strings like ["caption one", "caption '
        'two", ...] and nothing else.'
    )
    try:
        r = subprocess.run(["claude", "-p", prompt], capture_output=True,
                           text=True, timeout=240)
        m = re.search(r"\[.*\]", r.stdout, re.S)
        caps = json.loads(m.group(0)) if m else None
        if caps and all(isinstance(c, str) and c.strip() for c in caps):
            return caps[:n]
    except Exception:
        pass
    return None


def resolve_entry(rel):
    """Recover {mode, sign, text[, colors]} for a rendered file, from the
    manifest if present, else by parsing the filename against the bank."""
    manifest = load_manifest()
    info = manifest.get(rel)
    if info:
        return info
    base = os.path.basename(rel)[:-4]
    m = re.match(r"([a-z]+)_([a-z]+?)(?:_\d+)?$", base)
    entry = bank_lookup().get(f"{m.group(1)}_{m.group(2)}") if m else None
    if not entry:
        return None
    return {"mode": entry["mode"], "sign": entry["sign"], "text": entry["text"]}


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

    def send_json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
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
            manifest = load_manifest()
            made = []
            for e in entries:
                path = free_path(mode, e["sign"])
                render.render(e["text"], mode, path, still=True,
                              watermark=False, cta=False)
                rel = os.path.relpath(path, OUT)
                manifest[rel] = {"mode": mode, "sign": e["sign"],
                                 "text": e["text"]}
                made.append(rel)
            save_manifest(manifest)
            self.send_json({"ok": True, "count": len(made), "files": made,
                            "claude": used_claude})
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
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
