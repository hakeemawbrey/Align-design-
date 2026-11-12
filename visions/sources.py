"""Image sources for Align Visions (copied from the zodiac reels, plus Wikimedia Commons).

Every search returns candidates in one shape so the fetcher can mix them:
{id, source, title, creator, license, landing, url, w, h}

Sources (all open or public-domain):
  openverse  Wikimedia Commons, rawpixel, Flickr CC (anon limit 20/min, 200/day)
  aic        Art Institute of Chicago, public-domain works only
  met        The Met Open Access, public-domain works only
  nasa       NASA Image Library
  commons    Wikimedia Commons file search (public domain and CC BY / BY-SA only)
"""
import json
import re
import time
import urllib.parse
import urllib.request

UA = "AlignVisions/0.1 (align reels; github.com/hakeemawbrey)"
_last_ov = [0.0]


def _get(url, headers=None, tries=5, raw=False):
    h = {"User-Agent": UA, **(headers or {})}
    delay = 2
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=h), timeout=60) as r:
                body = r.read()
                return body if raw else json.loads(body)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and i < tries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            raise
        except (urllib.error.URLError, TimeoutError):
            if i < tries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            raise


def openverse(q, n=12):
    # stay under the 20/min anonymous burst limit
    wait = 3.2 - (time.time() - _last_ov[0])
    if wait > 0:
        time.sleep(wait)
    _last_ov[0] = time.time()
    params = {"q": q, "page_size": n, "license_type": "commercial,modification",
              "size": "large", "mature": "false"}
    d = _get("https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(params))
    out = []
    for r in d.get("results", []):
        out.append({
            "id": f"ov-{r['id']}", "source": f"openverse/{r.get('source')}",
            "title": r.get("title") or "", "creator": r.get("creator") or "",
            "license": f"{r.get('license')} {r.get('license_version') or ''}".strip(),
            "landing": r.get("foreign_landing_url"),
            "url": f"https://api.openverse.org/v1/images/{r['id']}/thumb/?full_size=true",
            "alt_url": r.get("url"),
            "w": r.get("width") or 0, "h": r.get("height") or 0,
        })
    return out


def aic(q, n=12):
    params = {"q": q, "limit": n * 3, "query[term][is_public_domain]": "true",
              "fields": "id,title,artist_display,image_id,thumbnail,artwork_type_title"}
    d = _get("https://api.artic.edu/api/v1/artworks/search?" + urllib.parse.urlencode(params),
             headers={"AIC-User-Agent": UA})
    out = []
    for r in d.get("data", []):
        if not r.get("image_id") or r.get("artwork_type_title") not in ("Painting", "Photograph"):
            continue
        t = r.get("thumbnail") or {}
        out.append({
            "id": f"aic-{r['id']}", "source": "aic", "title": r.get("title") or "",
            "creator": (r.get("artist_display") or "").split("\n")[0], "license": "public domain",
            "landing": f"https://www.artic.edu/artworks/{r['id']}",
            "url": f"https://www.artic.edu/iiif/2/{r['image_id']}/full/1686,/0/default.jpg",
            "w": t.get("width") or 0, "h": t.get("height") or 0,
        })
    return out[:n]


def met(q, n=12):
    d = _get("https://collectionapi.metmuseum.org/public/collection/v1.1/search?"
             + urllib.parse.urlencode({"q": q, "hasImages": "true", "medium": "Paintings"}))
    out = []
    for oid in (d.get("objectIDs") or [])[: n * 3]:
        try:
            o = _get(f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{oid}", tries=2)
        except Exception:
            continue
        if not (o.get("isPublicDomain") and o.get("primaryImage")):
            continue
        out.append({
            "id": f"met-{oid}", "source": "met", "title": o.get("title") or "",
            "creator": o.get("artistDisplayName") or "", "license": "public domain (CC0)",
            "landing": o.get("objectURL"), "url": o["primaryImage"], "w": 0, "h": 0,
        })
        if len(out) >= n:
            break
    return out


def nasa(q, n=12):
    d = _get("https://images-api.nasa.gov/search?"
             + urllib.parse.urlencode({"q": q, "media_type": "image"}))
    out = []
    for it in d.get("collection", {}).get("items", [])[:n]:
        meta = it["data"][0]
        nid = meta["nasa_id"]
        out.append({
            "id": f"nasa-{nid}", "source": "nasa", "title": meta.get("title") or "",
            "creator": meta.get("center") or "NASA", "license": "public domain (NASA)",
            "landing": f"https://images.nasa.gov/details/{urllib.parse.quote(nid)}",
            "url": f"https://images-assets.nasa.gov/image/{urllib.parse.quote(nid)}/{urllib.parse.quote(nid)}~orig.jpg",
            "w": 0, "h": 0,
        })
    return out


# AI images, event photos and the like that Commons file search turns up
JUNK = re.compile(r"imagen|ai[- ]generated|midjourney|stable diffusion|dall-?e|wikimedia|wikipedia|meetup|"
                  r"editathon|screenshot|logo|\bmap\b|diagram|by-nc|nc-sa|nc-nd", re.I)
OK_LICENSES = ("public domain", "pd", "cc0", "cc by", "cc-by")


def commons(q, n=12):
    """Wikimedia Commons full-text file search. Keeps public domain, CC0, CC BY and
    CC BY-SA; drops NC/ND and anything unlabelled."""
    import html
    params = {"action": "query", "format": "json", "generator": "search",
              "gsrsearch": f"filetype:bitmap {q}", "gsrnamespace": 6, "gsrlimit": n * 2,
              "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": 1600}
    d = _get("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params))
    out = []
    pages = sorted((d.get("query") or {}).get("pages", {}).values(), key=lambda p: p.get("index", 0))
    for p in pages:
        ii = (p.get("imageinfo") or [{}])[0]
        md = ii.get("extmetadata") or {}
        lic = (md.get("LicenseShortName") or {}).get("value", "")
        low = lic.lower()
        if not low.startswith(OK_LICENSES) or "nc" in low.split("-") or "nd" in low.split("-"):
            continue
        if JUNK.search(p["title"]):
            continue
        artist = html.unescape(re.sub(r"<[^>]+>", "", (md.get("Artist") or {}).get("value", ""))).strip()
        title = p["title"].removeprefix("File:").rsplit(".", 1)[0]
        out.append({
            "id": f"wc-{p['pageid']}", "source": "commons", "title": title,
            "creator": artist[:120], "license": lic,
            "landing": ii.get("descriptionurl"), "url": ii.get("thumburl") or ii.get("url"),
            "alt_url": ii.get("url"), "w": ii.get("width") or 0, "h": ii.get("height") or 0,
        })
        if len(out) >= n:
            break
    return out


SOURCES = {"openverse": openverse, "aic": aic, "met": met, "nasa": nasa, "commons": commons}


def wiki_thumb(url, width=1280):
    """upload.wikimedia.org originals are rate-limited; standard-size thumbs are not."""
    m = re.match(r"https://upload\.wikimedia\.org/wikipedia/commons/(\w/\w\w)/([^/]+)$", url or "")
    if not m:
        return None
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{m[1]}/{m[2]}/{width}px-{m[2]}"


def download(c, path):
    """Download a candidate to path. Returns True on success."""
    for url in [wiki_thumb(c.get("alt_url")), c["url"], c.get("alt_url")]:
        if not url:
            continue
        try:
            data = _get(url, raw=True, tries=4,
                        headers={"AIC-User-Agent": UA} if c["source"] == "aic" else None)
            if len(data) > 20000:
                with open(path, "wb") as f:
                    f.write(data)
                return True
        except Exception:
            continue
    return False
