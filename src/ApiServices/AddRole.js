import axios from "axios";
const live = localStorage.getItem("live")

export const addRole = async (formData) => {
  try {
    const response = await axios.post(`https://${live}/api/admin/roles/store`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
    });
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
