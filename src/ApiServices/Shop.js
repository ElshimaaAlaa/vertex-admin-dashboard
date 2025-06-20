import axios from "axios";
const live = sessionStorage.getItem("live")
export const getShops = async () => {
  try {
    const response = await axios({
      url:`https://${live}/api/admin/shops?dashboard=1`,
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
    console.error("Failed to fetch shops: ", error);
    throw error;
  }
};