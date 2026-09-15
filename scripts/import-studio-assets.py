from pathlib import Path
from pillow_heif import register_heif_opener
from PIL import Image

register_heif_opener()

src = Path(r"C:\Users\cheta\OneDrive\Desktop\mbpics")
out = Path(r"C:\Users\cheta\OneDrive\Desktop\MB jewellers\cursor\public\pics\studio")
out.mkdir(parents=True, exist_ok=True)

# Curated jewellery stills only. Skip people, screenshots, and password photos.
mapping = {
    "IMG_2260.HEIC": "diamond-emerald-leaf-set.jpg",
    "IMG_2265.HEIC": "diamond-floral-necklace-set.jpg",
    "IMG_2272.HEIC": "diamond-emerald-drop-set.jpg",
    "IMG_2284.HEIC": "diamond-tennis-necklace.jpg",
    "IMG_2290.HEIC": "diamond-emerald-festoon-set.jpg",
    "IMG_2309.HEIC": "diamond-sapphire-choker-set.jpg",
    "IMG_2320.HEIC": "diamond-drop-necklace-set.jpg",
    "IMG_2333.HEIC": "diamond-ruby-pearl-set.jpg",
    "IMG_2348.HEIC": "diamond-sapphire-pearl-set.jpg",
    "IMG_2381.HEIC": "gold-bridal-pendant-set.jpg",
    "IMG_E2436.HEIC": "gold-temple-choker-set.jpg",
    "IMG_E2443.HEIC": "gold-kundan-choker-set.jpg",
    "IMG_E2453.HEIC": "gold-coin-ranihaar.jpg",
    "IMG_E2463.HEIC": "gold-ranihaar-cinematic.jpg",
    "IMG_E2473.HEIC": "gold-bead-necklace.jpg",
    "IMG_E2483.HEIC": "gold-layered-chain.jpg",
}

for source_name, dest_name in mapping.items():
    source = src / source_name
    dest = out / dest_name
    im = Image.open(source).convert("RGB")
    im.thumbnail((1600, 1600))
    im.save(dest, "JPEG", quality=84, optimize=True)
    print(f"{dest_name} {im.size} {dest.stat().st_size // 1024}kb")
