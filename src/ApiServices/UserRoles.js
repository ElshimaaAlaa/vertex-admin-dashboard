import axios from "axios";

const API_BASE_URL = "https://";
const live_customer_domain = localStorage.getItem("live_customer_domain");

export const getRoles = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${live_customer_domain}/api/admin/roles`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin token")}`,
        },
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