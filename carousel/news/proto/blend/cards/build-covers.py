# Six new covers in a row, the production cover for each underneath.
#   python3 news/proto/blend/cards/build-covers.py   (from carousel/)
import os
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__))
PROD = os.path.join(HERE, '../../../out')
ids = ['jan-10-mars-retrograde-who-this-hits', 'dec-23-full-moon-cancer', 'feb-06-annular-eclipse-aquarius',
       'dec-15-ranked-december', 'feb-14-valentines-venus-report', 'dec-02-sky-note-ophiuchus']
tw, th, g = 432, 540, 16
im = Image.new('RGB', (6 * tw + 7 * g, 2 * th + 3 * g + 40), (5, 3, 15))
d = ImageDraw.Draw(im)
for i, id in enumerate(ids):
    x = g + i * (tw + g)
    im.paste(Image.open(f'{HERE}/out/{id}/01.jpg').resize((tw, th), Image.LANCZOS), (x, g + 20))
    im.paste(Image.open(f'{PROD}/{id}/01.jpg').resize((tw, th), Image.LANCZOS), (x, 2 * g + th + 20))
d.text((g, 4), 'ALIGN CARDS', fill=(239, 230, 214))
d.text((g, g + th + 24), 'production', fill=(179, 166, 196))
im.save(f'{HERE}/covers.jpg', quality=90)
