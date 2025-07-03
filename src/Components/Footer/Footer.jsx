import { ClipLoader } from "react-spinners";
import { FaCircleCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
function Footer({
  saveText,
  cancelText,
  cancelOnClick,
  saveOnClick,
  isLoading,
  saveBtnType,
  cancelBtnType,
}) {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div
      className={`flex gap-5 items-center border-t justify-end rtl:justify-start bg-white rounded p-5 w-full mt-5 absolute bottom-0`}
    >
      {isRTL ? (
        <>
          <button
            type={"submit"}
            className="bg-primary font-bold text-white rounded-md rtl:text-[16px] p-3 w-40 flex items-center gap-2 justify-center"
            onClick={saveOnClick}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={22} />
            ) : (
              <>
                <FaCircleCheck /> {saveText}
              </>
            )}
          </button>
          <button
            type={"button"}
            className="bg-gray-100 font-bold text-gray-400 p-3 rtl:text-[16px] w-40 rounded-md"
            onClick={cancelOnClick}
          >
            {cancelText}
          </button>
        </>
      ) : (
        <>
          <button
            type={"button"}
            className="bg-gray-100 font-bold text-gray-400 p-3 w-40 rounded-md"
            onClick={cancelOnClick}
          >
            {cancelText}
          </button>
          <button
            type={"submit"}
            className="bg-primary font-bold text-white rounded-md p-3 w-40 flex items-center gap-2 justify-center"
            onClick={saveOnClick}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={22} />
            ) : (
              <>
                <FaCircleCheck /> {saveText}
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
export default Footer;
