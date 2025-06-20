import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
function ViewSubscription() {
  const [data, setData] = useState([]);
  const [plandata, setPlanData] = useState([]);
const live = "https://vrtex.duckdns.org/api/";
  const { id } = useParams();
  useEffect(() => {
    const fetchSubscriptionsData = async () => {
      try {
        const response = await axios({
          url: `${live}admin/subscriptions/${id}`,
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
        <p className="text-gray-400 text-13">
          Subscriptions / Shops Subscriptions / view
        </p>
        <h3 className="font-bold mt-2 text-16">View Shops Subscriptions</h3>
      </section>
      <section className="bg-white p-5 rounded-md mx-5 mt-3 flex gap-8">
        <div>
          <h3 className="font-bold my-3">Shop Subscription</h3>
          <div className="rounded-md border-1 border-gray-200 py-4 px-5 w-330">
            <p className="text-gray-400 text-14 mb-2">Status</p>
            <span
              className={
                data.status === "active"
                  ? "bg-[#E7F6E5] text-[#28A513] rounded-md py-2 px-4 "
                  : "bg-red-50 text-red-600 rounded-md p-2 font-bold"
              }
            >
              {data.status}
            </span>
            <p className="text-gray-400 text-14 mt-5">Plan</p>
            <span className="text-14">{plandata.name}</span>
            <p className="text-gray-400 text-14 mt-4">Duration</p>
            <span className="text-14">{plandata.duration}</span>
            <p className="text-gray-400 text-14 mt-4">Sale Price</p>
            <span className="text-14">{plandata.sale_price}</span>
            <p className="text-gray-400 text-14 mt-4">Duration Price</p>
            <span className="text-14">{plandata?.duration_price || "___"}</span>
          </div>
        </div>
        <div>
          <h3 className="font-bold my-3">Transaction Information</h3>
          <div className="rounded-md border-1 border-gray-200 px-5 py-4 w-900">
            <div className="flex gap-72">
              <div>
                <p className="text-gray-400 text-14">Transaction ID</p>
                <span className="text-14">{data.transaction_id || "unavailable"}</span>
              </div>
              <div>
                <p className="text-gray-400 text-14 ">User Name</p>
                <span className="text-14">{data.user_name || "unavailable"}</span>
              </div>
            </div>
            <div className="flex gap-80 mt-3">
              <div>
                <p className="text-gray-400 text-14">Total Price</p>
                <span className="text-14">{data.price || "unavailable"}</span>
              </div>
              <div>
                <p className="text-gray-400 text-14">Payment Method</p>
                <span className="text-14">{data.payment_method || "unavailable"}</span>
              </div>
            </div>
            <div className="flex gap-72 mt-3">
              <div>
                <p className="text-gray-400 text-14">Purchased Date</p>
                <span className="text-14">{data.start_date || "unavailable"}</span>
              </div>
              <div>
                <p className="text-gray-400 text-14">Expired Date</p>
                <span className="text-14">{data.end_date || "unavailable"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewSubscription;
