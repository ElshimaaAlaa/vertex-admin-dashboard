import axios from "axios";
export const getDomain = async (email) => {
  try {
    const response = await axios({
      url: "https://vrtex.duckdns.org/api/get-domain?=",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email },
    });
    if (response.status === 200) {
      console.log("Domain fetched successfully", response.data.data);
      sessionStorage.setItem("live", response.data.data.domain);
      sessionStorage.setItem("live_email", response.data.data.email);
      sessionStorage.setItem("role", response.data.data.role);
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch domain", error);
    throw error;
  }
};