import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
const role = localStorage.getItem("role");

export const getCustomers = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/${role}/customers`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to add FAQ", error);
    throw error;
  }
};
