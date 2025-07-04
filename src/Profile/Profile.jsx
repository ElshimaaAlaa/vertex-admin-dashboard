import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  PenLine,
  Bell,
  ChevronUp,
} from "lucide-react";
import LogOut from "../Auth/LogOut/LogOut";
import { useNavigate } from "react-router-dom";
import { GetPersonalInfo } from "../ApiServices/GetPersonalInfo";
import { useTranslation } from "react-i18next";
export default function ProfileMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const userImage = localStorage.getItem("admin pic");
  const userName = localStorage.getItem("admin name");
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const [personalInfo, setPersonalInfo] = useState({});
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  // Default image path
  const defaultImage = "/assets/images/user.png";

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await GetPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      }
    };
    getInfo();
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={userImage || defaultImage}
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
        </div>
        <ChevronUp className="w-4 h-4 text-black" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute rtl:-right-52 right-0 mt-2 w-300 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 px-3 flex flex-col gap-3"
        >
          <div className="flex items-center gap-4 py-2 rtl:flex-row-reverse">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src={userImage || defaultImage}
                alt="Profile"
                width={60}
                height={60}
                className="object-cover"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <span className="font-bold text-14 mt-2">{userName}</span>
              <span className="text-14 text-gray-500 rtl:text-left">Admin</span>
            </div>
            <ChevronDown className="w-5 h-5 font-bold text-black ml-auto" />
          </div>
          <div className="border-t-1 border-black"></div>
          <button
            className="w-full flex  justify-between items-center gap-3 p-2 hover:bg-gray-50"
            onClick={() => navigate("/Dashboard/MainInfo")}
          >
            <span className=" flex items-center gap-2 text-left text-gray-600 text-15 rtl:text-[16px]">
              <Eye className="w-6 h-6" />
              {t("myAcc")}
            </span>
            <ChevronRight className="w-5 h-5 text-black" />
          </button>

          <button
            className="w-full flex justify-between items-center gap-3 p-2 hover:bg-gray-50"
            onClick={() =>
              navigate("/Dashboard/MainInfo/EditInfo", { state: personalInfo })
            }
          >
            <span className="flex items-center gap-2 text-left text-gray-600 text-15 rtl:text-[16px]">
              <PenLine className="w-6 h-6" />
              {t("editAccount")}
            </span>
            <ChevronRight className="w-5 h-5 text-black" />
          </button>

          <div className="flex items-center gap-3 p-2">
            <Bell className="w-5 h-5" />
            <span className="flex-grow text-gray-600 text-15 rtl:text-[16px]">
              {t("allowNotify")}
            </span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                notifications ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  notifications
                    ? "translate-x-5 rtl:-translate-x-0"
                    : "translate-x-0 rtl:-translate-x-5"
                }`}
              />
            </button>
          </div>
          <div className="border-t-1  border-black py-2 mt-2">
            <LogOut />
          </div>
        </div>
      )}
    </div>
  );
}
