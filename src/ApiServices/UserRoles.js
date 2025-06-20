import axios from "axios";

const live = sessionStorage.getItem("live")

export const getRoles = async () => {
  try {
    const response = await axios.get(`https://${live}/api/admin/roles`, {
      headers: {
        "Content-Type": "application/json",
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
