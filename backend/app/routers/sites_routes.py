from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Site, Project, User
from ..schemas import SiteCreate, SiteOut
from ..deps import get_current_user

router = APIRouter(prefix="/sites", tags=["Sites"])

@router.post("/", response_model=SiteOut)
def create_site(
    payload: SiteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(
        Project.id == payload.project_id,
        Project.owner_id == current_user.id
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    site = Site(
        site_name=payload.site_name,
        latitude=payload.latitude,
        longitude=payload.longitude,
        land_area=payload.land_area,
        elevation=payload.elevation,
        infrastructure=payload.infrastructure,
        land_ownership=payload.land_ownership,
        project_id=payload.project_id
    )
    db.add(site)
    db.commit()
    db.refresh(site)
    return site

@router.get("/project/{project_id}", response_model=list[SiteOut])
def get_sites_by_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.owner_id == current_user.id
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return db.query(Site).filter(Site.project_id == project_id).all()