"""Fetch the Urania's Mirror plate for each sign straight from Wikimedia Commons.

The Commons API is often rate-limited from shared IPs, but thumbnail URLs can be
computed from a filename (md5 path), so no API call is needed. Tries filename
variants; 404 means wrong name, 429 means wait and retry.

  python3 plates.py              # every sign missing cache/<sign>/plate/commons.jpg
  python3 plates.py taurus virgo
"""
import hashlib
import json
import os
import sys
import time
import urllib.parse

import sources

HERE = os.path.dirname(os.path.abspath(__file__))
VARIANTS = {
    "aries": ["Aries and Musca Borealis"],
    "taurus": ["Taurus Poniatovii and Taurus", "Taurus Poniatowski and Taurus", "Taurus",
               "Taurus Poniatovii, Taurus"],
    "gemini": ["Gemini"],
    "cancer": ["Cancer"],
    "leo": ["Leo Major and Leo Minor"],
    "virgo": ["Virgo"],
    "libra": ["Libra", "Libra, Scorpio", "Libra and Scorpio"],
    "scorpio": ["Scorpio", "Scorpius"],
    "sagittarius": ["Sagittarius and Corona Australis, Microscopium, and Telescopium",
                    "Sagittarius and Corona Australis", "Sagittarius"],
    "capricornus": [],
    "capricorn": ["Capricornus", "Capricornus and Sagittarius"],
    "aquarius": ["Aquarius and Piscis Australis", "Aquarius, Piscis Australis and Ballon Aerostatique",
                 "Aquarius"],
    "pisces": ["Pisces"],
}


def thumb(filename, width=1280):
    fn = filename.replace(" ", "_")
    h = hashlib.md5(fn.encode()).hexdigest()
    q = urllib.parse.quote(fn)
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{q}/{width}px-{q}"


def fetch(sign):
    out = os.path.join(HERE, "cache", sign, "plate")
    os.makedirs(out, exist_ok=True)
    dest = os.path.join(out, "commons.jpg")
    if os.path.exists(dest):
        return True
    for v in VARIANTS[sign]:
        fn = f"Sidney Hall - Urania's Mirror - {v}.jpg"
        url = thumb(fn)
        delay = 15
        for _ in range(8):
            try:
                data = sources._get(url, raw=True, tries=1)
            except Exception as e:
                code = getattr(e, "code", None)
                if code == 404:
                    break
                time.sleep(delay)
                delay = min(delay * 2, 120)
                continue
            open(dest, "wb").write(data)
            meta = {"file": f"cache/{sign}/plate/commons.jpg", "id": f"commons-{fn}", "url": url,
                    "title": f"Urania's Mirror: {v} (1824)", "creator": "Sidney Hall",
                    "license": "public domain",
                    "landing": "https://commons.wikimedia.org/wiki/File:" + urllib.parse.quote(fn.replace(" ", "_"))}
            json.dump(meta, open(os.path.join(out, "commons.json"), "w"), indent=1)
            print(f"{sign}: {v}")
            return True
    print(f"{sign}: not found")
    return False


if __name__ == "__main__":
    signs = sys.argv[1:] or [s for s in VARIANTS if VARIANTS[s]]
    for s in signs:
        fetch(s)
        time.sleep(3)
