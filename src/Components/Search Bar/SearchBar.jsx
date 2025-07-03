import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
function SearchBar({ onclick, value, onchange, text, icon }) {
  const [isRTL, setIsRTL] = useState(false);
  const { i18n, t } = useTranslation();
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div
      className={`flex justify-between items-center gap-2 bg-white mb-5 rounded-md ${
        isRTL ? "flex-row-reverse ltr-style" : ""
      }`}
    >
      <div className="relative w-full">
        <Search
          className="absolute rtl:right-3 left-3  top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
          color="#E0A75E"
        />
        <input
          type="text"
          placeholder={t("search")}
          value={value}
          onChange={onchange}
          className="w-full  h-12 pl-10 rtl:pr-10 pr-4 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-primary rtl:placeholder:text-[16px]"
        />
      </div>
      <div
        className="flex items-center justify-center gap-3 h-12 bg-primary text-white py-4 px-3 rounded-md w-72 cursor-pointer"
        onClick={onclick}
      >
        <div className="font-bold">{icon}</div>
        <p className="text-16 font-bold rtl:text-[16px]">{text}</p>
      </div>
    </div>
  );
}
export default SearchBar;
