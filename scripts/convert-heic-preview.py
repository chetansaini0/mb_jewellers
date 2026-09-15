from pathlib import Path
from pillow_heif import register_heif_opener
from PIL import Image

register_heif_opener()
src = Path(r"C:\Users\cheta\OneDrive\Desktop\mbpics")
out = Path(r"C:\Users\cheta\OneDrive\Desktop\MB jewellers\cursor\public\pics\_preview")
out.mkdir(parents=True, exist_ok=True)

samples = [
    "IMG_2255.HEIC",
    "IMG_2260.HEIC",
    "IMG_2265.HEIC",
    "IMG_2272.HEIC",
    "IMG_2279.HEIC",
    "IMG_2284.HEIC",
    "IMG_2290.HEIC",
    "IMG_2296.HEIC",
    "IMG_2301.HEIC",
    "IMG_2309.HEIC",
    "IMG_2314.HEIC",
    "IMG_2320.HEIC",
    "IMG_2326.HEIC",
    "IMG_2333.HEIC",
    "IMG_2340.HEIC",
    "IMG_2348.HEIC",
    "IMG_2366.HEIC",
    "IMG_2373.HEIC",
    "IMG_2381.HEIC",
    "IMG_2389.HEIC",
    "IMG_E2436.HEIC",
    "IMG_E2443.HEIC",
    "IMG_E2453.HEIC",
    "IMG_E2463.HEIC",
    "IMG_E2473.HEIC",
    "IMG_E2483.HEIC",
]

for name in samples:
    p = src / name
    if not p.exists():
        print("missing", name)
        continue
    im = Image.open(p)
    im = im.convert("RGB")
    im.thumbnail((900, 900))
    dest = out / f"{p.stem}.jpg"
    im.save(dest, "JPEG", quality=82, optimize=True)
    print(dest.name, im.size)
