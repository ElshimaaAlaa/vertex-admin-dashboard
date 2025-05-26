import axios from "axios";
const API_BASE_URL = "https://";
const live = localStorage.getItem("live");

export const addUser = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${live}/api/admin/users/store`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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