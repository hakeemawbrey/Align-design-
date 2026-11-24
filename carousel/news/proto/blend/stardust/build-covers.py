from PIL import Image, ImageDraw, ImageFont
N='/home/user/Align-design-/carousel/news/'
ids=['jan-10-mars-retrograde-who-this-hits','dec-23-full-moon-cancer','feb-06-annular-eclipse-aquarius','dec-15-ranked-december','feb-14-valentines-venus-report','dec-02-sky-note-ophiuchus']
tw,th,g,lab=432,540,16,44
W=len(ids)*tw+(len(ids)+1)*g; H=2*th+3*g+2*lab
o=Image.new('RGB',(W,H),(5,3,15)); d=ImageDraw.Draw(o)
try: f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
except Exception: f=ImageFont.load_default()
for r,(src,name) in enumerate([(N+'proto/blend/stardust/out/%s/01.jpg','STARDUST GRADE'),(N+'out/%s/01.jpg','PRODUCTION')]):
  y=g+r*(th+lab+g)
  d.text((g,y+8),name,fill=(239,230,214) if r==0 else (179,166,196),font=f)
  for k,i in enumerate(ids): o.paste(Image.open(src%i).resize((tw,th),Image.LANCZOS),(g+k*(tw+g),y+lab))
o.save(N+'proto/blend/stardust/covers.jpg',quality=90)
