"""Shrink a Chromium-printed PDF in place: merge the identical objects it repeats
for every card and recompress page streams (31 MB → ~15 MB for the SF-01 sheets).
Needs pypdf: pip install pypdf"""
import os
import sys

import pypdf

path = sys.argv[1]
writer = pypdf.PdfWriter(clone_from=pypdf.PdfReader(path))
for page in writer.pages:
    page.compress_content_streams(level=9)
writer.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
tmp = path + '.tmp'
writer.write(tmp)
os.replace(tmp, path)
print(f'compacted {path}: {os.path.getsize(path) / 1e6:.1f} MB')
