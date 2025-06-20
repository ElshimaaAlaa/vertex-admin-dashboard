import axios from "axios";
const live = "https://vrtex.duckdns.org/api/";
export const handleUpdatePassword = async (password, password_confirmation) => {
  try {
    const response = await axios({
      url: `${live}admin/update-password`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": "ar",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
      data: {
        password,
        password_confirmation,
      },
    });
    if (response.status === 200) {
      console.log("Password updated successfully");
      return response.data;
    } else {
      console.error("Failed to update password");
    }
  } catch (error) {
    console.error("Failed to update password", error);
    throw error;
  }
};
