import Navbar from "../../Components/NavBar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
function Dashboard() {
  const [isRTL, setIsRTL] = useState(false);
  const { i18n } = useTranslation();
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
  }, [i18n]);
  // Update RTL state and localStorage when language changes
  useEffect(() => {
    const currentLanguage = i18n.language;
    setIsRTL(currentLanguage === "ar");
    localStorage.setItem("selectedLanguage", currentLanguage);
  }, [i18n.language]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-0">
          <Navbar />
          <div className="mt-0 bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
