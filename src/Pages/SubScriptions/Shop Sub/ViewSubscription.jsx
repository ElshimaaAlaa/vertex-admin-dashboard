import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
function ViewSubscription() {
  const [data, setData] = useState([]);
  const [plandata, setPlanData] = useState([]);
  const live = localStorage.getItem("live");
  const { id } = useParams();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchSubscriptionsData = async () => {
      try {
        const response = await axios({
          url: `https://${live}/api/admin/subscriptions/${id}`,
          method: "GET",
          headers: {
            "Accept-Language": "en",
            Authorization: `Bearer ${localStorage.getItem("admin token")}`,
          },
        });
        if (response.status === 200) {
          setData(response.data.data);
          setPlanData(response.data.data.plan);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubscriptionsData();
  }, [id, live]);
  return (
    <div className="h-[89vh] pt-3">
      <Helmet>
        <title>View Shop Subscriptions | Vertex</title>
      </Helmet>
      <section className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13 rtl:text-[16px]">
          {t("shopSubHead")}
        </p>
        <h3 className="font-bold mt-2 text-16 rtl:text[19px]">{t("viewShopSubHead")}</h3>
      </section>
      <section className="bg-white p-5 rounded-md mx-5 mt-3 flex gap-8">
        <div>
          <h3 className="font-bold my-3 rtl:text-[20px] rtl:ms-1">{t("shopSub")}</h3>
          <div className="rounded-md border-1 border-gray-200 py-4 px-5 w-330">
            <p className="text-gray-400 text-14 mb-2 rtl:text-[16px]">{t("status")}</p>
            <span
              className={
                data.status === "active"
                  ? "bg-[#E7F6E5] text-[#28A513] rounded-md py-2 px-4 "
                  : "bg-red-50 text-red-600 rounded-md p-2 font-bold"
              }
            >
              {data.status}
            </span>
            <p className="text-gray-400 text-14 mt-5 rtl:text-[16px]">{t("plan")}</p>
            <span className="text-14">{plandata.name}</span>
            <p className="text-gray-400 text-14 mt-4 rtl:text-[16px]">{t("duration")}</p>
            <span className="text-14">{plandata.duration}</span>
            <p className="text-gray-400 text-14 mt-4 rtl:text-[16px]">{t("salePrice")}</p>
            <span className="text-14">{plandata.sale_price}</span>
            <p className="text-gray-400 text-14 mt-4 rtl:text-[16px]">{t("durationPrice")}</p>
            <span className="text-14">{plandata?.duration_price || "___"}</span>
          </div>
        </div>
        <div>
          <h3 className="font-bold my-3 rtl:text-[20px] rtl:ms-1">{t("transactionInfo")}</h3>
          <div className="rounded-md border-1 border-gray-200 px-5 py-4 w-900">
            <div className="flex gap-72">
              <div>
                <p className="text-gray-400 text-14 rtl:text-[16px]">{t("transactionId")}</p>
                <span className="text-14">
                  {data.transaction_id || "unavailable"}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-14 rtl:text-[16px]">{t("userName")}</p>
                <span className="text-14">
                  {data.user_name || "unavailable"}
                </span>
              </div>
            </div>
            <div className="flex gap-80 mt-3">
              <div>
                <p className="text-gray-400 text-14 rtl:text-[16px]">{t("totalPrice")}</p>
                <span className="text-14">{data.price || "unavailable"}</span>
              </div>
              <div>
                <p className="text-gray-400 text-14 rtl:text-[16px]">{t("paymentMethod")}</p>
                <span className="text-14">
                  {data.payment_method || "unavailable"}
                </span>
              </div>
            </div>
            <div className="flex gap-72 mt-3">
              <div>
                <p className="text-gray-400 text-14 rtl:text-[16px]">{t("purchaseDate")}</p>
                <span className="text-14">
                  {data.start_date || "unavailable"}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-14 rtl:text-[16px]">{t("expireDate")}</p>
                <span className="text-14">
                  {data.end_date || "unavailable"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ViewSubscription;