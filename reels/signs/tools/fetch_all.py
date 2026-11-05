"""Fetch candidates for every pool in catalog/plan.json (or the ones named).

  python3 tools/fetch_all.py                 # everything (resumes: already-fetched pools are skipped)
  python3 tools/fetch_all.py letters garden  # just these
  python3 tools/fetch_all.py --again garden  # fetch more for a pool that already has candidates
"""
import argparse, json, os, subprocess, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
plan = json.load(open(os.path.join(HERE, "catalog", "plan.json")))
ap = argparse.ArgumentParser()
ap.add_argument("pools", nargs="*")
ap.add_argument("--again", action="store_true")
ap.add_argument("--more", action="store_true", help="run the second-round queries in plan[\"more\"]")
a = ap.parse_args()
for pool, queries in (plan["more"] if a.more else plan["pools"]).items():
    if a.pools and pool not in a.pools:
        continue
    if not (a.again or a.more) and os.path.exists(os.path.join(HERE, "cache", pool, "candidates.json")):
        print(f"[{pool}] already fetched, skipping")
        continue
    src = ",".join(plan["space_sources"]) if pool == "space" else "commons,aic,met"
    n = ["-n", "14"] if pool == "space" else []
    subprocess.run([sys.executable, os.path.join(HERE, "fetch.py"), pool, *queries, "--sources", src, *n], cwd=HERE)
