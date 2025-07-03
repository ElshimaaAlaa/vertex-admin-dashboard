import axios from "axios";
import { useTranslation } from "react-i18next";
const live = localStorage.getItem("live");
function ResendCode() {
  const { t } = useTranslation();
  const resndCode = async () => {
    const email = localStorage.getItem("Admin Email");
    const response = await axios({
      url: `https://${live}/api/admin/send-otp`,
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
        {t("resend")}
      </p>
    </div>
  );
}
export default ResendCode;
