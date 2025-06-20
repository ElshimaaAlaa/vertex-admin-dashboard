import axios from "axios";
const live = sessionStorage.getItem("live");
export const logOut = async () => {
  try {
    const response = await axios({
      url: `https://${live}/api/admin/logout`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
      },
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
