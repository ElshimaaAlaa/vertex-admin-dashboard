import axios from "axios";
const API_BASE_URL = "https://";
const live = localStorage.getItem("live");
export const CreateNewPasswordService = async (
  password,
  password_confirmation,
  email
) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${live}/api/admin/reset-password`,
      method: "POST",
      data: {
        password,
        password_confirmation,
        email,
      },
    });
    if (response.status === 200) {
      console.log("Password reset successfully");
      return true;
    }
  } catch (error) {
    console.error("Failed to reset password: ", error);
    return false;
  }
};