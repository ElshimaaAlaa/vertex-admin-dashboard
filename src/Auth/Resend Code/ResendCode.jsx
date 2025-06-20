import axios from "axios";
const live = "https://vrtex.duckdns.org/api/";
function ResendCode() {
  const resndCode = async () => {
    const email = localStorage.getItem("Admin Email");
    const response = await axios({
      url: `${live}admin/send-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
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
