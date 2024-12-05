import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const PetMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Fetch the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          console.log("Unable to retrieve location.");
        }
      );
    }
  }, []);

  // If location data is not available yet, return a loading state or nothing
  if (!location) {
    return <div>Loading map...</div>;
  }

  // Custom icon SVG in yellow
  const yellowLocationIcon = {
    path: MdLocationOn().props.children.props.d, // Using the `MdLocationOn` icon's SVG path
    fillColor: "#FFCC00", // Yellow color
    fillOpacity: 1,
    strokeColor: "#FFCC00", // Stroke color same as fill for a cleaner look
    strokeWeight: 2,
    scale: 1.5, // Size of the icon
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={{
          height: "400px",
          width: "100%",
        }}
        center={{ lat: location.lat, lng: location.lon }}
        zoom={12}
      >
        <Marker
          position={{ lat: location.lat, lng: location.lon }}
          icon={yellowLocationIcon}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default PetMap;
