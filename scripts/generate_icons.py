from PIL import Image, ImageDraw, ImageFont

def make_icon(size: int, path: str, maskable: bool = False) -> None:
    image = Image.new('RGB', (size, size), '#080b11')
    draw = ImageDraw.Draw(image)
    for radius in range(size // 2, 0, -1):
        mix = radius / (size / 2)
        color = (int(115 - 70 * mix), int(58 - 38 * mix), int(64 - 42 * mix))
        draw.ellipse((size // 2 - radius, size // 2 - radius, size // 2 + radius, size // 2 + radius), fill=color)
    margin = int(size * (.22 if maskable else .16))
    draw.ellipse((margin, margin, size - margin, size - margin), outline='#d9b477', width=max(2, size // 90))
    try:
        font = ImageFont.truetype('C:/Windows/Fonts/georgia.ttf', int(size * .36))
    except OSError:
        font = ImageFont.load_default()
    draw.text((size / 2, size / 2), '♡', fill='#f0c4ba', font=font, anchor='mm')
    image.save(path, optimize=True)

make_icon(192, 'public/icon-192.png')
make_icon(512, 'public/icon-512.png')
make_icon(512, 'public/icon-maskable-512.png', True)
make_icon(180, 'public/apple-touch-icon.png')
