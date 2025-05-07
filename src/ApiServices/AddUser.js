import axios from "axios";
const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
export const addUser = async (formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/admin/users/store`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
      data: { formData },
    });
    if (response.status === 200) {
      console.log("user added successfully");
    }
  } catch (error) {
    console.error("Failed to add user", error);
    throw error;
  }
};