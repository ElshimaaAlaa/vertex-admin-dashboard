import axios from "axios";
const live = localStorage.getItem("live");
export const CreateNewPasswordService = async (
  password,
  password_confirmation,
  email
) => {
  try {
    const response = await axios({
      url: `https://${live}/api/admin/reset-password`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
      },
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
