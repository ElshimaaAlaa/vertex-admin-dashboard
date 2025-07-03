import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StoreTheme from "../../Svgs/StoreTheme";
import StoreInformation from "../../Svgs/StoreInformation";
import PricingPlan from "../../Svgs/PricingPlan";
import Profile from "../../Svgs/Profile";
import { useTranslation } from "react-i18next";
function InfoSideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);
  const { t } = useTranslation();
  const menuItems = [
    {
      IconComponent: Profile,
      alt: "Personal Information Icon",
      label: t("personalInfo"),
      path: "",
    },
    {
      IconComponent: StoreTheme,
      alt: "Store Theme Icon",
      label: t("storeTheme"),
      path: "StoreTheme",
    },
    {
      IconComponent: StoreInformation,
      alt: "Store Information Icon",
      label: t("storeInfo"),
      path: "StoreInformation",
    },
    {
      IconComponent: PricingPlan,
      alt: "Pricing Plans Icon",
      label: t("pricingPlan"),
      path: "Pricing",
    },
  ];

  const handleItemClick = (path) => {
    navigate(path);
    setActiveItem(path);
  };

  const isActive = (path) => {
    const currentPath = location.pathname.split("/").pop();
    return (
      currentPath === path ||
      (path === "" && location.pathname.endsWith("MainInfo"))
    );
  };

  return (
    <aside className="w-full">
      <div className="flex flex-col gap-7  md:gap-16 border-l p-4 md:pt-10">
        {menuItems.map(({ IconComponent, alt, label, path }, index) => (
          <button
            key={index}
            className={`flex items-center gap-1${
              isActive(path) ? "text-primary" : ""
            }`}
            aria-label={label}
            onClick={() => handleItemClick(path)}
          >
            <div
              className={`w-6 h-6 me-3 ${
                isActive(path) ? "text-primary" : "text-gray-600"
              }`}
            >
              <IconComponent
                className="w-full h-full"
                stroke={isActive(path) ? "#E0A75E" : "#000"}
              />
            </div>
            <p
              className={`font-semibold text-14 mt-1 ${
                isActive(path) ? "text-primary" : ""
              }`}
            >
              {label}
            </p>
          </button>
        ))}
      </div>
    </aside>
  );
}
export default InfoSideBar;
