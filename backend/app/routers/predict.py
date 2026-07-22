from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import os

router = APIRouter(
    prefix="/predict",
    tags=["AI Prediction"]
)

# Load trained model
model_path = os.path.join(
    os.path.dirname(__file__),
    "..",
    "ai",
    "model.pkl"
)

model = joblib.load(model_path)


class PredictionInput(BaseModel):
    latitude: float
    longitude: float
    land_area: float
    elevation: float


@router.post("/")
def predict(data: PredictionInput):

    prediction = model.predict([[
        data.latitude,
        data.longitude,
        data.land_area,
        data.elevation
    ]])[0]

    if prediction == 1:
        result = "Suitable"

    else:
        result = "Not Suitable"

    return {
        "prediction": result
    }