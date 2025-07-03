import { useEffect, useState } from "react";
import { getHome } from "../../ApiServices/Home";
import { BsShop } from "react-icons/bs";
import { TbUsers } from "react-icons/tb";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
function ViewAllActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await getHome();

        if (response) {
          setActivities(response.activities);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "subscription":
        return <BsShop color="#E0A75E" />;
      case "contact":
        return <TbUsers color="#E0A75E" />;
      default:
        return "🔹";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "subscription":
        return "bg-blue-100 text-blue-800";
      case "contact":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityDescription = (activity) => {
    if (activity.description) {
      return activity.description;
    }
    return activity.type === "subscription"
      ? "New subscription was created"
      : "Contact message received";
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen mx-5 py-4 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen mx-5 py-4">
      <div className="">
        <h1 className="text-lg font-bold text-black mb-4 rtl:ms-3 rtl:text-[20px]">
          {t("allActivties")}
        </h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-full ${getActivityColor(
                          activity.type
                        )}`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {getActivityDescription(activity)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-16 text-gray-500">{activity.date}</p>
                      <IoCalendarNumberOutline color="#69ABB5" size={15} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 text-14">No activities found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewAllActivities;
