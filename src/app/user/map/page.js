import React from "react";
import Map from "../../../components/Map";
import "leaflet/dist/leaflet.css";
import ProtectedRoute from "../../context/ProtectedRoute";
const index = () => {

  return (
      <ProtectedRoute>
          <Map />
      </ProtectedRoute>
  );
};

export default index;
