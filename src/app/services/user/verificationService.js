// services/verificationService.js
import axios from 'axios';
import BASE_URL from '../../utils/constant';

export const verifyOtp = async (email, otp) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otp", otp);

  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error verifying OTP.");
  }
};

export const breederSignUp = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw new Error("Error during breeder sign-up.");
  }
};
