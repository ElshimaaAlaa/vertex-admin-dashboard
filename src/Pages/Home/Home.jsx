import { useEffect, useState } from "react";
import { getHome } from "../../ApiServices/Home";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import ReportsItem from "./ReportsItem";
import RevenueChart from "./RevenueChart";
import SalesChart from "./SalesChart";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ActivityCard from "./ActivitiesCard";
import { useTranslation } from "react-i18next";
function Home() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const [statistics, setStatistics] = useState({
    overview: {},
    monthly_income: [],
    activities: [],
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await getHome();
        setStatistics(response);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchHomeData();
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <div className={`bg-gray-50 min-h-screen p-5 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Statistics Section */}
      <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 rtl:text-[22px]">{t("statistics")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ReportsItem
            icon={HiCurrencyDollar}
            title={t("totalRevenue")}
            totalNumber={statistics?.overview?.total_revenue?.amount || 0}
            change_rate={`${
              statistics?.overview?.total_revenue?.change_rate || 0
            }`}
            duration={`${t("lastMonth")} ${
              statistics?.overview?.total_revenue?.last_month || 0
            }`}
          />
          <ReportsItem
            icon={FaUserGroup}
            title={t("totalUsers")}
            totalNumber={statistics?.overview?.total_users?.amount || 0}
            change_rate={`${
              statistics?.overview?.total_users?.change_rate || 0
            }`}
            duration={`${t("lastMonth")} ${
              statistics?.overview?.total_users?.last_month || 0
            }`}
          />
          <ReportsItem
            icon={BsShop}
            title={t("totalShops")}
            totalNumber={statistics?.overview?.total_shops?.amount || 0}
            change_rate={`${
              statistics?.overview?.total_shops?.change_rate || 0
            }`}
            duration={`${t("lastMonth")} ${
              statistics?.overview?.total_shops?.last_month || 0
            }`}
          />
        </div>
      </section>

      {/* Dashboard Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium text-gray-700 mb-4 rtl:text-[23px]">
           {t("revenueGenerated")}
          </h4>
          <RevenueChart data={statistics.monthly_income} />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm">
          <SalesChart data={statistics.monthly_income} />
        </section>
      </div>
      {/* Recent Activity */}
      <section className=" p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 rtl:text-[22px]">
            {t("recentActivities")}
          </h2>
          <button
            className="flex items-center gap-2 bg-primary  text-white px-4 py-2 rounded-md transition-colors"
            onClick={() => navigate("/Dashboard/ViewAllActivties")}
          >
           {t("viewAll")} <IoArrowForward size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {statistics.activities?.slice(0, 4).map((activity) => {
            return (
              <ActivityCard
                key={activity.id}
                description={
                  activity.description || "No Subscription registered"
                }
                date={activity.date}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
export default Home;
