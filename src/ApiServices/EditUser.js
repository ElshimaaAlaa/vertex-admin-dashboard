import axios from "axios";

const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");

export const handleUpdateUserData = async (userId, formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/admin/users/${userId}`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
      data: formData,
    });
    
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to update user data");
  } catch (error) {
    console.error("Failed to update user data", error);
    throw error;
  }
};