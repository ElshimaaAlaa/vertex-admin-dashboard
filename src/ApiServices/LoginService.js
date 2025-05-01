import axios from "axios";

const API_BASE_URL = "https://";
const live_shop_domain = localStorage.getItem("live_shop_domain");
export const loginService = async (email, password) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live_shop_domain}/api/admin/login`,
      method: "POST",
      data: {
        email,
        password,
      },
    });
    if(response.status === 200) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("admin name", response.data.data.name);
        console.log(response.data.data);
        return response.data.data;
    }
  } catch (error) {
    throw new Error("Failed to login");
  }
};