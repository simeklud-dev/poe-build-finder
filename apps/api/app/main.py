from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db import get_db
from app.routers import admin, auth, builds, favorites, reports, saved_filters

app = FastAPI(title="PoE Build Finder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(builds.router)
app.include_router(admin.router)
app.include_router(auth.router)
app.include_router(favorites.router)
app.include_router(saved_filters.router)
app.include_router(reports.router)


@app.get("/health")
def health(db: Session = Depends(get_db)) -> dict:
    db.execute(text("SELECT 1"))
    builds_count = db.execute(text("SELECT count(*) FROM builds")).scalar_one()
    return {"status": "ok", "builds_count": builds_count}
