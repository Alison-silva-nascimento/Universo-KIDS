"""Converte as fotografias fornecidas pela loja para WebP, sem alterar os originais."""
from pathlib import Path
from PIL import Image, ImageOps

SOURCE = Path(r"C:\Users\alison.nascimento\Downloads")
DEST = Path(__file__).resolve().parents[1] / "assets"
ASSETS = {
    "09.50.25": "editorial/irmaos-combinando.webp",
    "09.50.16": "products/romper-azul-estampado.webp",
    "09.50.05": "editorial/look-amarelo-campanha.webp",
    "09.49.57": "products/conjunto-preto-cerejas.webp",
    "09.49.49": "products/conjunto-roxo-coracoes.webp",
    "09.49.43": "products/conjunto-rosa-cerejas.webp",
    "09.49.35": "products/conjunto-azul.webp",
    "09.49.28": "products/camiseta-verde-short-preto.webp",
    "09.49.22": "products/polo-azul-short-claro.webp",
    "09.45.46": "logo/logo-universo-kids.webp",
}
for time, relative in ASSETS.items():
    source = SOURCE / f"WhatsApp Image 2026-09-15 at {time}.jpeg"
    if not source.is_file():
        raise FileNotFoundError(source)
    target = DEST / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        if image.width > 1800:
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=82, method=6)
    print(f"{target.relative_to(DEST)}: {target.stat().st_size:,} bytes")
