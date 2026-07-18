import hashlib
import secrets

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBasic, HTTPBasicCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.auth import decode_access_token
from app.config import settings
from app.db import get_db
from app.models.user import User

_basic_auth = HTTPBasic(auto_error=False)
_bearer_auth = HTTPBearer(auto_error=False)


def require_admin(
    basic_credentials: HTTPBasicCredentials | None = Depends(_basic_auth),
    bearer_credentials: HTTPAuthorizationCredentials | None = Depends(_bearer_auth),
    db: Session = Depends(get_db),
) -> str:
    """Přístup do administrace: buď běžný uživatelský účet s is_admin=True (Bearer
    JWT, stejný token jako pro oblíbené/uložené filtry), nebo sdílené HTTP Basic
    přihlášení (admin_username/admin_password) jako záloha."""
    if bearer_credentials is not None:
        user_id = decode_access_token(bearer_credentials.credentials)
        if user_id is not None:
            user = db.get(User, user_id)
            if user is not None and user.is_admin:
                return user.email

    if basic_credentials is not None:
        is_correct_username = secrets.compare_digest(basic_credentials.username, settings.admin_username)
        is_correct_password = secrets.compare_digest(basic_credentials.password, settings.admin_password)
        if is_correct_username and is_correct_password:
            return basic_credentials.username

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid admin credentials",
        headers={"WWW-Authenticate": "Basic"},
    )


def hash_ip(ip_address: str) -> str:
    """Solí a hashuje IP adresu — do DB se ukládá jen hash, ne syrová IP (viz submission_attempts)."""
    return hashlib.sha256(f"{settings.ip_hash_salt}:{ip_address}".encode("utf-8")).hexdigest()
