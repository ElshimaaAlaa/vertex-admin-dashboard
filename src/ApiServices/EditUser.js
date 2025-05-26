import axios from "axios";
const API_BASE_URL = "https://";
const live = localStorage.getItem("live");

export const handleUpdateUserData = async (userId, formData) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live}/api/admin/users/update/${userId}`,
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
    throw new Error("Failed to update user data");
  } catch (error) {
    console.error("Failed to update user data", error);
    throw error;
  }
};