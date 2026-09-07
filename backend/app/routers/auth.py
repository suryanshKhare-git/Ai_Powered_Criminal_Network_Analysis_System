from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ============================================================
# PROTOTYPE INVESTIGATOR STORAGE
# ============================================================

investigators = {}


# ============================================================
# REQUEST MODELS
# ============================================================

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    investigatorId: str
    mobile: str
    department: str
    designation: str
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ============================================================
# REGISTER
# ============================================================

@router.post("/register")
def register(data: RegisterRequest):

    email = str(data.email).lower().strip()

    # Check if investigator already exists
    if email in investigators:
        raise HTTPException(
            status_code=400,
            detail="Investigator already registered"
        )

    # Store prototype investigator
    investigators[email] = {
        "name": data.name,
        "email": email,
        "investigatorId": data.investigatorId,
        "mobile": data.mobile,
        "department": data.department,
        "designation": data.designation,
        "password": data.password,
        "role": "investigator"
    }

    return {
        "success": True,
        "message": "Investigator registered successfully",

        "investigator": {
            "name": data.name,
            "email": email,
            "investigatorId": data.investigatorId,
            "mobile": data.mobile,
            "department": data.department,
            "designation": data.designation,
            "role": "investigator"
        }
    }


# ============================================================
# LOGIN
# ============================================================

@router.post("/login")
def login(data: LoginRequest):

    email = str(data.email).lower().strip()

    investigator = investigators.get(email)

    # Investigator does not exist
    if not investigator:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Wrong password
    if investigator["password"] != data.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "success": True,
        "message": "Login successful",

        # Prototype token only
        "access_token": "prototype-session-token",

        "token_type": "bearer",

        "investigator": {
            "name": investigator["name"],
            "email": investigator["email"],
            "investigatorId": investigator["investigatorId"],
            "mobile": investigator["mobile"],
            "department": investigator["department"],
            "designation": investigator["designation"],
            "role": investigator["role"]
        }
    }


# ============================================================
# LOGOUT
# ============================================================

@router.post("/logout")
def logout():

    return {
        "success": True,
        "message": "Investigator logged out successfully"
    }