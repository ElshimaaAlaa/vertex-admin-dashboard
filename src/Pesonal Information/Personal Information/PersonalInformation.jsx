import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { GetPersonalInfo } from "../../ApiServices/GetPersonalInfo";
import UpdatePassword from "./UpdatePassword";
import { useTranslation } from "react-i18next";
function PersonalInformation() {
  const navigate = useNavigate();
  const [personalInfo, setPersonalInfo] = useState({});
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await GetPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
        setError(
          "Failed to load personal information. Please try again later."
        );
      }
    };
    getInfo();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Personal Information</title>
        <meta name="description" content="Edit personal information" />
        <meta property="og:title" content="Edit Personal Information" />
        <meta property="og:description" content="Edit personal information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/personal-information"
        />
      </Helmet>
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bold text-xl rtl:text-[20px]">{t("profile")}</h1>
          <button
            onClick={() => navigate("EditInfo", { state: personalInfo })}
            className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-3 w-24 rounded-md rtl:text-[16px]"
            aria-label="Edit personal information"
          >
            <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-7" />
            {t("edit")}
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5 my-5 border rounded-md p-3 w-full rtl:flex-row-reverse">
          <img
            src={personalInfo?.image || "/assets/images/user.png"}
            alt="User profile"
            className="rounded-lg w-32 h-24 md:w:24 md:h-24 object-cover"
            onError={(e) => {
              e.target.src = "/assets/images/user.png";
            }}
          />
          <div className="text-center md:text-left">
            <h2 className="font-semibold text-16">
              {personalInfo?.name || "N/A"}
            </h2>
            <p className="text-gray-400 text-14 mt-1">
              {personalInfo?.role || "Admin"}
            </p>
          </div>
        </div>
        <div className="border rounded-md p-3 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-96">
            <div>
              <p className="text-gray-400 text-15 rtl:text-[15px]">{t("name")}</p>
              <h3 className="text-15">{personalInfo?.name || "N/A"}</h3>
            </div>
            <div>
              <p className="text-gray-400 text-15 rtl:text-[15px]">{t("email")}</p>
              <h3 className="text-15">{personalInfo?.email || "N/A"}</h3>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-gray-400 text-15 rtl:text-[15px]">{t("profile")}</p>
            <h3 className="text-15">{personalInfo?.phone || "N/A"}</h3>
          </div>
        </div>
      </section>
      <UpdatePassword />
    </div>
  );
}
export default PersonalInformation;