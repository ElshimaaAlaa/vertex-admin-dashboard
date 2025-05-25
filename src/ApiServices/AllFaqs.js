import axios from "axios";
const API_BASE_URL = "https://";
const live_customer_domain = localStorage.getItem("live_customer_domain");
const role = localStorage.getItem("role");
export const getFaqs = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_customer_domain}/api/${role}/faqs`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      console.log("get faqs success");
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to get faqs", error);
    throw error;
  }
};