"""Write qr.svg for the card back. Usage: python3 make-qr.py https://your-demo-link"""
import sys

import segno

url = sys.argv[1] if len(sys.argv) > 1 else 'https://comealign.com'
qr = segno.make(url, error='m')
# dark violet modules on a transparent ground; the card puts it on a pearl tile
qr.save('qr.svg', scale=1, border=0, dark='#1e1240', light=None, xmldecl=False, svgns=True)
# add a viewBox so the code scales to whatever size the card gives it
svg = open('qr.svg').read()
n = qr.symbol_size(scale=1, border=0)[0]
svg = svg.replace(f'width="{n}" height="{n}"', f'width="{n}" height="{n}" viewBox="0 0 {n} {n}" shape-rendering="crispEdges"', 1)
open('qr.svg', 'w').write(svg)
print('qr.svg →', url, f'({qr.version})')
