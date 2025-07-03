import { ClipLoader } from "react-spinners";
import { FaCircleCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
function EndButtons({ isLoading, onclick }) {
  const [t, i18n] = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div className="mt-4 flex items-center gap-3 justify-end rtl:justify-start">
      {isRTL ? (
        <>
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 bg-primary font-bold text-white rounded-md w-36 flex items-center justify-center gap-2 rtl:text-[16px]"
          >
            {isLoading ? (
              <ClipLoader size={22} color="#fff" />
            ) : (
              <>
                <FaCircleCheck size={17} />
                {t("save")}
              </>
            )}
          </button>
          <button
            onClick={onclick}
            type="button"
            className="bg-gray-100 font-bold text-gray-400 p-3 w-36 rounded-md rtl:text-[16px]"
          >
            {t("cancel")}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={onclick}
            type="button"
            className="bg-gray-100 font-bold text-gray-400 p-3 w-36 rounded-md rtl:text-[17px]"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 bg-primary font-bold text-white rounded-md w-36 flex items-center justify-center gap-2 rtl:text-[17px]"
          >
            {isLoading ? (
              <ClipLoader size={22} color="#fff" />
            ) : (
              <>
                <FaCircleCheck size={17} />
                {t("save")}
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
export default EndButtons;