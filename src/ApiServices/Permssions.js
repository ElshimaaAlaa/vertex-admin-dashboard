import axios from "axios";
const API_BASE_URL = "https://";
const live = localStorage.getItem("live");
export const getPermissions = async () => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live}/api/admin/roles`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
    });
    if (response.status === 200) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch roles: ", error);
    throw error;
  }
};
