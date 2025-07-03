import axios from "axios";
const live = localStorage.getItem("live");

export const ForgotPasswordService = async (email) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://${live}/api/admin/send-otp`,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
      data: { email },
    });
    if (response.status === 200) {
      localStorage.setItem("admin Email", email);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Email not found. Please check your email address.");
    } else {
      throw new Error("Failed to send OTP. Please try again.");
    }
  }
};
