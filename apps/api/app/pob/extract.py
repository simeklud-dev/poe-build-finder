"""Detekce PoB kódu vloženého přímo v textu (ne odkazu) — bez síťových volání.

PoB kódy jsou dlouhé url-safe base64 bloky (písmena/čísla/-/_), typicky stovky až
tisíce znaků, bez mezer. Hledáme takový blok a zkusíme ho dekódovat — pokud se to
nepovede, prostě ho ignorujeme. Odkazy na pobb.in/pastebin (bez samotného kódu) se
tímto záměrně nedetekují/nefetchují, viz app/pob/decode.py.
"""

import re

from app.pob.decode import decode_pob_code

INLINE_CODE_RE = re.compile(r"[A-Za-z0-9_-]{300,}")


def find_inline_pob_code(text: str) -> str | None:
    for match in INLINE_CODE_RE.finditer(text):
        candidate = match.group(0)
        try:
            decode_pob_code(candidate)
        except Exception:
            continue
        return candidate
    return None
