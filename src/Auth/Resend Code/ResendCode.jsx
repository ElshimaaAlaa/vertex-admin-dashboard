import axios from "axios";
const live = sessionStorage.getItem("live");
function ResendCode() {
  const resndCode = async () => {
    const email = sessionStorage.getItem("Admin Email");
    const response = await axios({
      url: `https://${live}/api/admin/send-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${sessionStorage.getItem("admin token")}`,
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
