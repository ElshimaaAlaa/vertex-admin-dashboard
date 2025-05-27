import axios from "axios";
const API_BASE_URL = "https://";
const live = localStorage.getItem("live");
function ResendCode() {
  const resndCode = async () => {
    const email = localStorage.getItem("Email Admin");
    const response = await axios({
      url: `${API_BASE_URL}${live}/api/admin/send-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("admin token")}`,
      },
      data: { email },
    });
    if (response.status === 200) {
      console.log("Resend code successfully");
    } else {
      console.error("Failed to resend code");
    }
  };
  return (
    <div>
      <p
        onClick={resndCode}
        className="font-bold text-primary text-15 cursor-pointer"
      >
        Resend
      </p>
    </div>
  );
}
export default ResendCode;