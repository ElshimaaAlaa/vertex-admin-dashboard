import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { getSubscriptions } from "../../../ApiServices/Sub";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
function ShopSub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [filteredSubscription, setFilteredSubscription] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [itemsPerPage] = useState(5);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      setIsLoading(true);
      try {
        const response = await getSubscriptions();
        setSubscriptionData(response.data || response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchSubscriptions();
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  useEffect(() => {
    if (subscriptionData.length > 0) {
      const filtered = subscriptionData.filter((subscription) => {
        if (!searchQuery) return true;
        const searchTerm = searchQuery.toLowerCase();
        return (
          subscription.user_name?.toLowerCase().includes(searchTerm) ||
          subscription.payment_method?.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredSubscription(filtered);
    }
  }, [searchQuery, subscriptionData]);

  const pageCount = Math.ceil(filteredSubscription.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentSub = filteredSubscription.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="h-[89vh] pt-3">
      <Helmet>
        <title>Shop Subscriptions | Vertex</title>
      </Helmet>
      <div className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13 rtl:text-[16px]">
          {t("shopSubHead")}
        </p>
        <h3 className="font-bold mt-2 text-16 rtl:text-[19px]">
          {t("shopSub")}
        </h3>
      </div>
      <div className="bg-white rounded-md p-5 mt-3 mx-5">
        <div className="relative w-full mt-3">
          <Search
            className="absolute rtl:right-3 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
            color="#E0A75E"
          />
          <input
            type="text"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 rtl:pr-10 rtl:text-[17px] pl-10 pr-10 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-primary"
          />
        </div>
        {error ? (
          <div className="text-red-500 text-center mt-10 rtl:text-[18px]">
            {t("error")}
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : filteredSubscription.length === 0 ? (
          <div className="text-gray-400 text-center mt-10 rtl:text-[18px]">
            {searchQuery ? t("noMatchResults") : ""}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-16 border-t border-b text-left cursor-pointer rtl:text-right rtl:text-[17px]">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all shops"
                        />
                        {t("userName")}
                      </p>
                    </th>
                    <th className="px-3 py-3 text-16 text-left border rtl:text-right rtl:text-[18px]">
                      {t("transactionId")}
                    </th>
                    <th className="px-3 py-3 text-16 text-left border rtl:text-right rtl:text-[18px]">
                      {t("plan")}
                    </th>
                    <th className="px-3 py-3 text-16 text-left border rtl:text-right rtl:text-[18px]">
                      {t("duration")}
                    </th>
                    <th className="px-3 py-3 text-16 text-left border rtl:text-right rtl:text-[18px]">
                      {t("paymentMethod")}
                    </th>
                    <th className="px-3 py-3 text-left border w-24 rtl:text-right rtl:text-[18px]">
                      {t("status")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentSub.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td
                        className="px-3 py-3 border-t border-r text-gray-600 text-14 cursor-pointer"
                        onClick={() => navigate(`/Dashboard/ShopSub/${sub.id}`)}
                      >
                        <p className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select user"
                          />
                          {sub.user_name || "unavailable"}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        <div className="flex items-center gap-2">
                          {sub.transaction_id || 0}
                        </div>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        {sub.plan || "unavailable"}
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14 w-180 ">
                        <p className="bg-customOrange-lightOrange text-primary rounded-md py-1 ps-2  w-28">
                          {sub.duration || "unavailable"}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14 w-180 ">
                        {sub.payment_method || "unavailable"}
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14 w-32 ">
                        <span
                          className={
                            sub.status === "active"
                              ? "bg-[#E7F6E5] text-[#28A513] rounded-md p-2 font-bold"
                              : "bg-red-50 text-red-600 rounded-md p-2 font-bold"
                          }
                        >
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName="flex items-center justify-end mt-5 space-x-1"
              pageClassName="px-3 py-1 text-14 text-gray-400 rounded "
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={
                isRTL ? (
                  <ChevronRight className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-primary" />
                )
              }
              nextLabel={
                isRTL ? (
                  <ChevronLeft className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-primary" />
                )
              }
              previousClassName={`px-3 py-1 rounded ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              nextClassName={`px-3 py-1 rounded ${
                currentPage === pageCount - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </>
        )}
      </div>
    </div>
  );
}
export default ShopSub;
