import axios from "axios";
const live = sessionStorage.getItem("live");
export const VerifayPasswordService = async (otp, email) => {
  try {
    const response = await axios({
      method: "post",
      url: `https://${live}/api/admin/verify-otp`,
      data: { otp, email },
      headers: {
        "Accept": "application/json",
        "Accept-Language": "ar",
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "OTP Verification Error");
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};