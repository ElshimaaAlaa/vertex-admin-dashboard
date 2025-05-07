import axios from "axios";

export const getFaqs = async () => {
  try {
    const token = localStorage.getItem("admin token");
    const role = localStorage.getItem("role");
    const live_shop_domain = localStorage.getItem("live_shop_domain");

    console.log("Domain:", live_shop_domain);
    console.log("Role:", role);
    console.log("Token:", token);

    const response = await axios({
      url: `https://${live_shop_domain}/api/${role}/faqs`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch faqs: ", error.response?.data || error.message);
    throw error;
  }
};
