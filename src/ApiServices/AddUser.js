import axios from "axios";

const API_BASE_URL = "https://demo.vrtex.duckdns.org";
const live_shop_domain = localStorage.getItem("live_shop_domain");

export const addUser = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/users/store`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin token")}`,
        },
        transformRequest: (data) => {
          // Convert role object to JSON string if it exists
          if (data instanceof FormData) {
            const role = data.get("role");
            if (role && typeof role === "object") {
              data.set("role", JSON.stringify(role));
            }
          }
          return data;
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw error;
    }
  }
};