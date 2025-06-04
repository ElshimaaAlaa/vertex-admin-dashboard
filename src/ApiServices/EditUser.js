import axios from "axios";

const API_BASE_URL = "https://vrtex.duckdns.org/api/";

export const handleUpdateUserData = async (userId, formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}admin/users/update/${userId}`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
      data: formData,
    });

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.data.message || "Failed to update user data");
  } catch (error) {
    console.error("Failed to update user data", error);
    throw error;
  }
};