import axios from "axios";
// const API_BASE_URL = "https://";
const live = "https://vrtex.duckdns.org/api/";
export const getPlans = async () => {
  try {
    const response = await axios({
      url: `${live}admin/plans`,
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
    console.error("Failed to fetch plans: ", error);
    throw error;
  }
};
