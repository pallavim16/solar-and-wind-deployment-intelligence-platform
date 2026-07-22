from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Project, User
from ..schemas import ProjectCreate, ProjectOut
from ..deps import get_current_user

router = APIRouter(prefix="/projects", tags=["Projects"])


# -----------------------------
# Create Project
# -----------------------------
@router.post("/", response_model=ProjectOut)
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = Project(
        name=payload.name,
        description=payload.description,
        region=payload.region,
        owner_id=current_user.id
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


# -----------------------------
# Get All Projects
# -----------------------------
@router.get("/", response_model=list[ProjectOut])
def get_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Project)
        .filter(Project.owner_id == current_user.id)
        .all()
    )


# -----------------------------
# Delete Project
# -----------------------------
@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.owner_id == current_user.id
        )
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    db.delete(project)
    db.commit()

    return {
        "message": "Project deleted successfully"
    }