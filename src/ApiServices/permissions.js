import axios from "axios";
const live = sessionStorage.getItem("live");
export const getPermissions = async () => {
  try {
    const response = await axios({
      url: `https://${live}/api/admin/roles`,
      method: "GET",
      headers: {
        "Accept-Language": "en",
        Authorization: `Bearer ${sessionStorage.getItem("admin token")}`,
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
