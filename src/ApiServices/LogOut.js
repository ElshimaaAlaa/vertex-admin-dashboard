import axios from "axios";
const live = "https://vrtex.duckdns.org/api/";
export const logOut = async () => {
  try {
    const response = await axios({
      url: `${live}admin/logout`,
      method: "POST",
    });
    if (response.status === 200) {
      console.log("Logged out successfully");
      localStorage.removeItem("token");
      return true;
    } else {
      console.error("Failed to log out");
    }
  } catch (error) {
    console.error("Failed to log out", error);
  }
};
