import axios from "axios";
const live = localStorage.getItem("live");
export const loginService = async (email, password) => {
  try {
    const response = await axios({
      url: `https://${live}/api/admin/login`,
      method: "POST",
      headers:{
        "Accept":"application/json",
        "Accept-Language":"en"
      },
      data: {
        email,
        password,
      },
    });
    if(response.status === 200) {
        localStorage.setItem("admin token", response.data.data.token);
        console.log("admin token", response.data.data.token);
        localStorage.setItem("admin name", response.data.data.name);
        console.log(response.data.data);
        return response.data.data;
    }
  } catch (error) {
    throw new Error("Failed to login");
  }
};