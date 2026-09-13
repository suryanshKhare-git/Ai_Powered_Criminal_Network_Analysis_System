from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os


# ============================================================
# DATABASE CONFIGURATION
# ============================================================

# PostgreSQL database
#
# You can also set DATABASE_URL as an environment variable.
# Otherwise this default URL will be used.
#
# IMPORTANT:
# Replace YOUR_PASSWORD with your PostgreSQL password.

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:0730@localhost:5432/setu_db"
)


# ============================================================
# DATABASE ENGINE
# ============================================================

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    echo=False
)


# ============================================================
# SESSION
# ============================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# ============================================================
# BASE MODEL
# ============================================================

Base = declarative_base()


# ============================================================
# DATABASE DEPENDENCY
# ============================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()