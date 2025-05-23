import { useEffect, useState } from "react";
import { getHome } from "../../ApiServices/Home";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import ReportsItem from "./ReportsItem";
import RevenueChart from "./RevenueChart";
import SalesChart from "./SalesChart";
import CompletionRate from "./CompletionRate";
import { IoArrowForward } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import ActivitieCard from "./ActivitiesCard";
function Home() {
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
        console.error(error);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen mx-5 py-4">
      {/* Statistics Section */}
      <section className="bg-white p-5 rounded-md mb-3">
        <h3 className="font-bold text-17">Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <ReportsItem
            icon={HiCurrencyDollar}
            title="Total Revenue"
            totalNumber={statistics?.overview?.total_revenue?.amount || 0}
            change_rate={`${
              statistics?.overview?.total_revenue?.change_rate || 0
            }`}
            duration={`Last month: ${
              statistics?.overview?.total_revenue?.last_month || 0
            }`}
          />
          <ReportsItem
            icon={FaUserGroup}
            title="Total Users"
            totalNumber={statistics?.overview?.total_users?.amount || 0}
            change_rate={`${
              statistics?.overview?.total_users?.change_rate || 0
            }`}
            duration={`Last month: ${
              statistics?.overview?.total_users?.last_month || 0
            }`}
          />
          <ReportsItem
            icon={BsShop}
            title="Total Shops"
            totalNumber={statistics?.overview?.total_shops?.amount || 0}
            change_rate={`${
              statistics?.overview?.total_shops?.change_rate || 0
            }`}
            duration={`Last month: ${
              statistics?.overview?.total_shops?.last_month || 0
            }`}
          />
        </div>
      </section>
      {/* Dashboard Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Revenue Generated Chart */}
        <section className="bg-white p-5 border-1 border-gray-200 rounded-md relative overflow-hidden">
          <div className="bg-white absolute inset-0 z-0">
            <div className="grid grid-cols-6 h-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-white"></div>
              ))}
            </div>
          </div>
          <RevenueChart data={statistics.monthly_income} />
        </section>
        {/* Sales Change Rate Chart */}
        <section className="bg-white p-5 border-1 border-gray-200 rounded-md relative overflow-hidden">
          <div className="bg-white absolute inset-0 z-0">
            <div className="grid grid-cols-7 h-full">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="border-r border-white"></div>
              ))}
            </div>
          </div>
          <SalesChart data={statistics.monthly_income} />
        </section>
        {/* Completion Rate */}
        <section className="bg-white border-1 border-gray-200 p-5 rounded-md relative overflow-hidden">
          <div className="bg-gray-50 absolute inset-0 z-0">
            <div className="grid grid-cols-6 h-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-white"></div>
              ))}
            </div>
          </div>
          <CompletionRate />
        </section>
      </div>
      {/* Recent Activity */}
      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Recent Activity</h2>
          <button className="bg-primary text-white flex items-center gap-2 justify-center rounded-md p-3 font-bold">
            View All <IoArrowForward size={20} />
          </button>
        </div>
        <ul className="flex flex-col gap-3 mt-3">
          {statistics.activities?.slice(0, 4).map((activity) => {
            const icon =
              activity.type === "subscription" ? (
                <BsShop size={18} color="#E0A75E" />
              ) : (
                <TbUsers size={18} color="#E0A75E" />
              );

            const description =
              activity.description ||
              (activity.type === "subscription"
                ? "New subscription registered"
                : "New contact message received");

            return (
              <li key={activity.id}>
                <ActivitieCard
                  icon={icon}
                  description={description}
                  date={activity.date}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
export default Home;