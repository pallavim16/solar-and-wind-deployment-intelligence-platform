from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine

from .routers import (
    auth_routes,
    projects_routes,
    sites_routes,
    predict,
    location_info,
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Solar & Wind Deployment Intelligence Platform"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_routes.router)
app.include_router(projects_routes.router)
app.include_router(sites_routes.router)
app.include_router(predict.router)
app.include_router(location_info.router)

# Health Check
@app.get("/")
def health():
    return {
        "message": "Solar & Wind Deployment Intelligence Platform API running"
    }