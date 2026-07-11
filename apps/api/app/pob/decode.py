"""Dekódování Path of Building export kódů (url-safe base64 + zlib -> XML).

Tento modul NIKDY sám nestahuje obsah z pobb.in/pastebin.com/poe.ninja — pracuje jen
s kódem, který mu někdo přímo dodá (uživatel ve formuláři, nebo pokud je kód doslova
vložený v textu crawlovaného postu). Jejich `robots.txt` výslovně zakazuje endpointy
potřebné pro programové stažení (`/raw`, `/api/`, `/json`), takže je nefetchujeme —
viz README.md, sekce "PoB parsování", kde je rozhodnutí zdůvodněné.
"""

import base64
import zlib


def decode_pob_code(code: str) -> str:
    """Vrátí XML string. Vyhodí výjimku (ValueError/zlib.error), pokud kód není platný."""
    stripped = code.strip()
    padding = "=" * (-len(stripped) % 4)
    raw = base64.urlsafe_b64decode(stripped + padding)
    return zlib.decompress(raw).decode("utf-8")


def encode_pob_code(xml: str) -> str:
    """Opak `decode_pob_code` — používá se hlavně v testech pro round-trip."""
    compressed = zlib.compress(xml.encode("utf-8"))
    return base64.urlsafe_b64encode(compressed).decode("ascii").rstrip("=")
