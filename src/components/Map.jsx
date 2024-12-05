"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

// Dynamically import the MapContainer to avoid issues with SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// Mock Data: Store data with unique images for each store
const storeData = [
  { id: 1, name: "John Doe", lat: 28.5665, lng: 77.3039 }, 
  { id: 2, name: "Jane Smith", lat: 28.5380, lng: 77.3750 }, 
  { id: 3, name: "Michael Johnson", lat: 28.5254, lng: 77.3830 }, 
  { id: 4, name: "Emily Davis", lat: 28.5881, lng: 77.3563 }, 
  { id: 5, name: "Chris Brown", lat: 28.6328, lng: 77.3713 }, 
  { id: 6, name: "Sarah Miller", lat: 28.5277, lng: 77.3766 }, 
  { id: 7, name: "David Wilson", lat: 28.5037, lng: 77.3824 }, 
  { id: 8, name: "Jessica Moore", lat: 28.5292, lng: 77.3430 }, 
  { id: 9, name: "Daniel Taylor", lat: 28.5615, lng: 77.3245 }, 
  { id: 10, name: "Sophia Anderson", lat: 28.5032, lng: 77.3710 },
  ];
  
const StoreMap = () => {
  // const [stores, setStores] = useState(storeData);
  const stores = storeData;
  const [center, setCenter] = useState([28.5665, 77.3039]); // Default to New York City

  useEffect(() => {
    if (stores.length > 0) {
      setCenter([stores[0].lat, stores[0].lng]);
    }
  }, [stores]);

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer center={center} zoom={10} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stores.map((store) => {
          // Create a custom icon for each store
          const storeIcon = new L.Icon({
            iconUrl: "/images/Nextpet-imgs/location-icon.png", // URL of the store image
            iconSize: [40, 40], // Size of the icon
            iconAnchor: [20, 40], // Point of the icon that will be at the marker's position
            popupAnchor: [0, -40], // Popup position relative to the marker
          });

          return (
            <Marker key={store.id} position={[store.lat, store.lng]} icon={storeIcon}>
              <Popup >
                <div style={{ display: "flex", flexDirection: "column", gap:"5px", justifyContent:"center", alignItems: "center", minWidth:"200px"}}>
                  <Image src={"/images/Nextpet-imgs/contact-default.webp"} alt="profile" width={40} height={40} style={{ borderRadius: "50%"}}/>
                  
                  <div style={{ color: '#e49a01', fontWeight: "bold", padding: "0" }}>
                    {store.name}
                  </div>
                  <div className="flex gap-1 py-1">
                    <FaStar style={{ color: "green", marginBottom: "4px", }} />
                    <FaStar style={{ color: "green", marginBottom: "4px", }} />
                    <FaStar style={{ color: "green", marginBottom: "4px", }} />
                    <FaStar style={{ color: "green", marginBottom: "4px", }} />
                    <FaStar style={{ color: "gray", marginBottom: "4px", }} />
                  </div>

                  <button style={{ color: "white", background:"#e49a01", padding: "4px 8px", borderRadius:"20px", fontSize: "10px", border: "#e49a01"}}> View Details </button>
                </div>
                
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default StoreMap;
