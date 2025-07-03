import { useEffect, useState } from "react";
import axios from "axios";
import FailedModal from "../../Components/Modal/Failed Modal/FailedModal";
import { ClipLoader } from "react-spinners";
import "./shopStyle.scss";
import { useTranslation } from "react-i18next";
function DeleteShop({ id, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const live = localStorage.getItem("live");
  const handleDeleteShop = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `https://${live}/api/admin/shops/delete/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin token")}`,
          Accept: "application/json",
          "Accept-Language": "ar",
        },
      });
      if (response.status === 200) {
        console.log("shop deleted successfully");
        setShowModal(false);
        setIsLoading(false);
        onDelete(id);
      } else {
        setIsLoading(false);
        console.error("Failed to delete shop");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to delete shop", error);
    }
  };
  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div>
      <div className="flex justify-center">
        <button onClick={() => setShowModal(true)}>
          <img
            src="/assets/svgs/deleteIcon.svg"
            alt="delete product"
            className="w-5 ms-2"
          />
        </button>
      </div>
      <FailedModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-5">
          <img
            src="/assets/images/delete_svgrepo.com.png"
            alt="delete-img"
            className="h-14 w-14 p-1"
          />
        </div>
        <p className="font-bold w-72 text-center rtl:text-[18px]">
          {t("deleteShop")}
        </p>
        <p className="text-gray-500 text-13 mt-2 w-80 text-center rtl:text-[14px]">
          {t("confirm")}
        </p>
         <div
          className={`flex gap-3 mt-5 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <button
            className="rounded p-3 bg-gray-100 text-gray-400 font-bold w-32 rtl:text-[16px]"
            onClick={() => setShowModal(false)}
          >
           {t("cancel")}
          </button>
          <button
            className="rounded text-white bg-customred font-bold p-3 w-32 rtl:text-[16px]"
            onClick={handleDeleteShop}
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={"22px"} className="text-center" />
            ) : (
              t("delete")
            )}
          </button>
        </div>
      </FailedModal>
    </div>
  );
}
export default DeleteShop;
