import axios from 'axios';
import BASE_URL from '../utils/constant';

export const loginBreeder = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed. Please try again.");
  }
};
