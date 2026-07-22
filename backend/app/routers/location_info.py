from fastapi import APIRouter
import requests

router = APIRouter(prefix="/location", tags=["Location"])


@router.get("/details")
def get_location_details(lat: float, lon: float):
    try:
        # Reverse Geocoding
        geo = requests.get(
            "https://nominatim.openstreetmap.org/reverse",
            params={
                "format": "json",
                "lat": lat,
                "lon": lon,
                "addressdetails": 1,
            },
            headers={"User-Agent": "SolarWindPlatform"},
        )

        geo_data = geo.json()
        address = geo_data.get("address", {})

        # Elevation
        elev = requests.get(
            "https://api.open-elevation.com/api/v1/lookup",
            params={
                "locations": f"{lat},{lon}"
            }
        )

        elevation_data = elev.json()
        elevation = elevation_data["results"][0]["elevation"]

        # Infrastructure
        infrastructure = "Basic"

        if address.get("highway"):
            infrastructure = "Highway Access"

        elif address.get("road"):
            infrastructure = "Road Access Available"

        elif address.get("industrial"):
            infrastructure = "Industrial Area"

        # Ownership
        ownership = "Unknown"

        if address.get("landuse") == "farmland":
            ownership = "Agricultural"

        elif address.get("landuse") == "residential":
            ownership = "Private"

        # -------- Taluk --------
        taluk = (
            address.get("subdistrict")
            or address.get("taluk")
            or address.get("county")
            or ""
        )

        # -------- Locality --------
        location = (
            address.get("suburb")
            or address.get("neighbourhood")
            or address.get("quarter")
            or address.get("hamlet")
            or address.get("village")
            or address.get("town")
            or address.get("city_district")
            or address.get("city")
            or ""
        )

        return {
            "location": location,
            "taluk": taluk,
            "district": address.get("state_district", ""),
            "state": address.get("state", ""),
            "country": address.get("country", ""),
            "postcode": address.get("postcode", ""),
            "display_name": geo_data.get("display_name", ""),
            "latitude": lat,
            "longitude": lon,
            "elevation": elevation,
            "infrastructure": infrastructure,
            "ownership": ownership,
        }

    except Exception as e:
        return {"error": str(e)}