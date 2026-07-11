# apps/web — PoE Build Finder frontend

Next.js (App Router, TypeScript, Tailwind).

- `/` — hlavní vyhledávání/filtrování schválených buildů (krok 3), včetně DPS/Life/EHP
  statů zjištěných z PoB kódu (krok 6)
- `/submit` — anonymní formulář pro komunitní přidání buildu (honeypot pole proti
  spamu, nepovinné pole pro PoB export kód — viz kořenový README.md, sekce
  "PoB parsování")
- `/admin` — přihlášení (HTTP Basic proti `apps/api`) + fronta buildů čekajících na
  schválení, schválit/zamítnout

## Spuštění

```bash
cp .env.local.example .env.local   # pokud .env.local ještě neexistuje
npm install
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000). Backend (`apps/api`) musí běžet
na adrese z `NEXT_PUBLIC_API_URL` (výchozí `http://localhost:8000`).

Admin přihlašovací údaje odpovídají `ADMIN_USERNAME`/`ADMIN_PASSWORD` z `apps/api` (resp.
z kořenového `.env`).
