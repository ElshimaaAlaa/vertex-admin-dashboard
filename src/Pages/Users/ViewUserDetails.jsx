import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RxCopy } from "react-icons/rx";

function ViewUserDetails() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios({
          url: `${API_BASE_URL}${live_shop_domain}/api/admin/users/${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
            Authorization: `Bearer ${localStorage.getItem("admin token")}`,
          },
        });

        if (response.status === 200) {
          setUserInfo(response.data.data);
        } else {
          setError("Failed to get user data");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } 
    };
    fetchUserDetails();
  }, [id, live_shop_domain]);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Phone number copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  if (error) {
    return (
      <div className="h-[89vh] pt-10 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-[89vh] pt-10">
      <Helmet>
        <title>User Details</title>
        <meta name="description" content="View user information" />
        <meta property="og:title" content="User Information" />
        <meta property="og:description" content="View user information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/user-information"
        />
      </Helmet>
      <section className="bg-white mx-5 p-5 rounded-md">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bold text-[18px]">View User</h1>
          <button
            onClick={() => navigate(`/Dashboard/Users/EditUserInfo/${id}`)}
            className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-2 w-24 rounded-md"
            aria-label="Edit personal information"
          >
            <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-7" />
            Edit
          </button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5 my-3 border rounded-md p-3 w-full">
          <div className="w-32 h-24 flex items-center justify-center overflow-hidden rounded-xl bg-gray-100">
            <img
              src={userInfo.image}
              alt="User profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/user.png";
              }}
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-semibold text-16">{userInfo?.name || "N/A"}</h2>
            <p className="text-gray-400 text-14 mt-1">
              {userInfo?.role?.name || "Vertex CEO"}
            </p>
          </div>
        </div>

        <div className="border rounded-md p-3 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-96">
            <div>
              <p className="text-gray-400 text-15">Name</p>
              <h3 className="text-13">{userInfo?.name || "N/A"}</h3>
            </div>
            <div>
              <p className="text-gray-400 text-15">Email</p>
              <h3 className="text-13">{userInfo?.email || "N/A"}</h3>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-gray-400 text-15">Phone</p>
            <h3 className="text-13 flex items-center gap-2">
              {userInfo?.phone || "N/A"}
              {userInfo?.phone && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(userInfo.phone);
                  }}
                  className="text-primary mt-1 font-bold"
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  <RxCopy size={15} />
                </button>
              )}
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ViewUserDetails;