import hashlib
import secrets

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from app.config import settings

_basic_auth = HTTPBasic()


def require_admin(credentials: HTTPBasicCredentials = Depends(_basic_auth)) -> str:
    """Jednoduchá HTTP Basic auth pro jediný admin účet (bez uživatelských účtů, fáze 2)."""
    is_correct_username = secrets.compare_digest(credentials.username, settings.admin_username)
    is_correct_password = secrets.compare_digest(credentials.password, settings.admin_password)
    if not (is_correct_username and is_correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


def hash_ip(ip_address: str) -> str:
    """Solí a hashuje IP adresu — do DB se ukládá jen hash, ne syrová IP (viz submission_attempts)."""
    return hashlib.sha256(f"{settings.ip_hash_salt}:{ip_address}".encode("utf-8")).hexdigest()
