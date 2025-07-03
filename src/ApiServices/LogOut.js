import axios from "axios";

export const logOut = async () => {
  try {
    const response = await axios({
      url: `https://demo.vrtex.duckdns.org/api/admin/logout`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
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