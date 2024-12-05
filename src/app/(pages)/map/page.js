"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Dynamically import the Map component to ensure it only runs on the client
const Map = dynamic(() => import("../../../components/Map"), { ssr: false });

const Index = () => {
  const router = useRouter();
  const [searchItem, setSearchItem] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const allPets = []; // Add your actual pets array here.

  useEffect(() => {
    // Ensure this block only runs on the client
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const searchItemParam = queryParams.get("searchItem");
      setSearchItem(searchItemParam || "");
    }
  }, []);

  console.log(filteredData)

  useEffect(() => {
    if (searchItem) {
      const query = searchItem.toLowerCase();
      const filtered = allPets.filter((pet) => {
        return (
          pet.type?.toLowerCase().includes(query) ||
          pet.name?.toLowerCase().includes(query) ||
          pet.breed?.toLowerCase().includes(query) ||
          pet.location?.toLowerCase().includes(query)
        );
      });
      setFilteredData(filtered);
    }
  }, [searchItem, allPets]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isValidUser = localStorage.getItem("authToken");
      if (!isValidUser) {
        toast.error("User or Breeder Must be logged in");
        router.push("/");
      }
    }
  }, [router]);

  return (
    <>
      <Map />
    </>
  );
};

export default Index;
