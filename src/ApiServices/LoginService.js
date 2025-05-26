import axios from "axios";
const live = "https://vrtex.duckdns.org/api/";
export const loginService = async (email, password) => {
  try {
    const response = await axios({
      url: `${live}admin/login`,
      method: "POST",
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