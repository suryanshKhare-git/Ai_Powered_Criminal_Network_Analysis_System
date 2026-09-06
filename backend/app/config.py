import os
from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "SETU Intelligence Backend"
    version: str = "1.0.0"
    api_v1_prefix: str = "/api/v1"
    
    # Cryptographic keys (default test secrets; in production injected via Vault / AWS KMS)
    encryption_master_key: str = os.getenv("SETU_ENC_KEY", "setu-test-master-key-32bytes-len!")
    blind_index_salt: str = os.getenv("SETU_BLIND_SALT", "setu-pii-blind-index-salt-secret-99102")
    audit_chain_hmac_secret: str = os.getenv("SETU_AUDIT_SECRET", "setu-audit-ledger-hmac-sha256-root-secret")
    
    # Rate Limiting & Anomaly Thresholds
    rate_limit_per_minute: int = 60
    anomaly_burst_threshold: int = 15
    
    # Retention Policies (in days)
    cdr_retention_days: int = 730  # 2 years per statutory Indian telecom mandates
    cctv_logs_retention_days: int = 90
    financial_logs_retention_days: int = 2555  # 7 years per PMLA banking regulations
    
    # CORS
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173"
    ]

settings = Settings()
