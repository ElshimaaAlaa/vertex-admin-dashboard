import axios from "axios";
export const getFaqs = async () => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/faqs`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
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