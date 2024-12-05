// services/authService.js

import axios from "axios";
import BASE_URL from "../utils/constant";

export const signUpUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/UserLogin_first`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

//Delete Breeder
export const DeleteBreeder = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/delete_breed`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
