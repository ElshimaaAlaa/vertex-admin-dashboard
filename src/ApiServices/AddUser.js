import axios from "axios";
const API_BASE_URL = "https://";
const live_customer_domain = localStorage.getItem("live_customer_domain");

export const addUser = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${live_customer_domain}/api/admin/users/store`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin token")}`,
        },
        transformRequest: (data) => {
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