import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
export const getHome = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/admin/dashboard`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch home data: ", error);
    throw error;
  }
};
