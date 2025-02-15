import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react";





export default function DisplayMap() {

    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (err) => {
                setError("Geolocation permission denied.");
                console.error("Geolocation error:", err);
            }
          );
        } else {
            setError("Geolocation is not supported by this browser.");
            console.log("Geolocation is not supported by this browser.");
        }
      }, []);

      console.log("User location:", userLocation);


return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      {/* 🛑 Prevents rendering the Map until userLocation is available */}
      {userLocation ? (
        <Map
          style={{ width: "100%", height: "500px" }}
          defaultZoom={13}
          defaultCenter={userLocation} // ✅ No more undefined value
          mapId="875f56ec4179bc84"
        >
          <AdvancedMarker position={userLocation} title="You are here" />
        </Map>
      ) : (
        <p>Loading map...</p> // ✅ Prevents undefined map error
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </APIProvider>
  );
}