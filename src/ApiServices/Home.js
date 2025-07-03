import axios from "axios";
const live = localStorage.getItem("live");
export const getHome = async () => {
  try {
    const response = await axios({
      url: `https://${live}/api/admin/dashboard`,
      method: "GET",
      headers: {
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
    });
    if (response.status === 200) {
      console.log("home data", response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch home data: ", error);
    throw error;
  }
};
