import axios from "axios";
const live = sessionStorage.getItem("live")

export const addUser = async (formData) => {
  try {
    const response = await axios.post(`https://${live}/api/admin/users/store`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${sessionStorage.getItem("admin token")}`,
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
