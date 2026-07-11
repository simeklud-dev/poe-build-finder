from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.auth import create_access_token, get_current_user, hash_password, verify_password
from app.config import settings
from app.db import get_db
from app.models.user import User
from app.rate_limit import is_rate_limited, record_attempt
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse, UserOut
from app.security import hash_ip

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _check_auth_rate_limit(request: Request, db: Session) -> None:
    client_ip = request.client.host if request.client else "unknown"
    ip_hash = hash_ip(f"auth:{client_ip}")
    if is_rate_limited(db, ip_hash, settings.auth_rate_limit_per_hour):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many attempts from this address, try again later.",
        )
    record_attempt(db, ip_hash)


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, request: Request, db: Session = Depends(get_db)) -> TokenResponse:
    _check_auth_rate_limit(request, db)

    user = User(email=payload.email.lower(), password_hash=hash_password(payload.password))
    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="An account with this email already exists."
        )
    db.refresh(user)

    return TokenResponse(access_token=create_access_token(user.id), user=UserOut.model_validate(user))


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, request: Request, db: Session = Depends(get_db)) -> TokenResponse:
    _check_auth_rate_limit(request, db)

    user = db.scalar(select(User).where(User.email == payload.email.lower()))
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")

    return TokenResponse(access_token=create_access_token(user.id), user=UserOut.model_validate(user))


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)) -> User:
    return current_user
