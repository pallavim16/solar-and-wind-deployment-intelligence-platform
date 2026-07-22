import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Sample training data
data = {
    "latitude": [12.9, 13.2, 14.5, 15.2, 16.1],
    "longitude": [77.5, 78.2, 75.8, 76.4, 74.5],
    "land_area": [10, 15, 20, 30, 25],
    "elevation": [900, 850, 1000, 700, 950],
    "suitable": [1, 1, 0, 1, 0]
}

df = pd.DataFrame(data)

X = df[["latitude", "longitude", "land_area", "elevation"]]
y = df["suitable"]

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "app/ai/model.pkl")

print("Model trained successfully!")