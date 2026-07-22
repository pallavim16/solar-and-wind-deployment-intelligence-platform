import joblib

model = joblib.load("app/ai/model.pkl")

def predict_site(latitude, longitude, land_area, elevation):

    prediction = model.predict([[
        latitude,
        longitude,
        land_area,
        elevation
    ]])

    if prediction[0] == 1:
        return "Suitable"

    return "Not Suitable"