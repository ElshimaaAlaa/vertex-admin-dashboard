import axios from "axios";
const live = "https://vrtex.duckdns.org/api/";
export const getShops = async () => {
  try {
    const response = await axios({
      url:`${live}admin/shops?dashboard=1`,
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
    console.error("Failed to fetch shops: ", error);
    throw error;
  }
};