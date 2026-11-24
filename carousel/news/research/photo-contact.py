import glob, os, sys
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
fs = sorted(glob.glob(os.path.join(src, '*.jpg')))
T, cols, lab = 360, 6, 28
rows = (len(fs) + cols - 1) // cols
sheet = Image.new('RGB', (cols * (T + 10) + 10, rows * (T + lab + 10) + 10), (58, 58, 58))
d = ImageDraw.Draw(sheet)
try: font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
except Exception: font = None
for i, f in enumerate(fs):
    im = Image.open(f); w, h = im.size
    im = im.convert('RGB').resize((T, T), Image.LANCZOS)
    x = 10 + (i % cols) * (T + 10); y = 10 + (i // cols) * (T + lab + 10)
    sheet.paste(im, (x, y + lab))
    d.text((x, y + 4), f"{os.path.basename(f)[:-4]}  {w}px {os.path.getsize(f)//1024}KB", fill=(255, 220, 120), font=font)
sheet.save(out, quality=86)
print(sheet.size)
