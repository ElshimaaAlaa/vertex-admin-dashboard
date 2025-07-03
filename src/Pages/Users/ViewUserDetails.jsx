import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RxCopy } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
function ViewUserDetails() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const live = localStorage.getItem("live");
  const { id } = useParams();
  const { t } = useTranslation(); 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios({
          url: `https://${live}/api/admin/users/${id}`,
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
          toast.error("Failed to load user details");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Failed to load user details");
      }
    };
    fetchUserDetails();
  }, [id, live]);

  const copyToClipboard = (text) => {
    if (!text) {
      toast.warning(t("noPhone"));
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(t("phoneCopy"));
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="h-[89vh] pt-10">
      <Helmet>
        <title>User Details | Vertex</title>
        <meta name="description" content="View user information" />
        <meta property="og:title" content="User Information | Vertex" />
        <meta property="og:description" content="View user information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/user-information"
        />
      </Helmet>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <section className="bg-white mx-5 p-5 rounded-md">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bold text-[18px] rtl:text-[19px]">{t("viewUser")}</h1>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/Dashboard/Users/Edit/${userInfo.id}`, {
                state: { userInfo: userInfo },
              });
            }}
            className="text-white font-semibold flex items-center justify-center gap-3 bg-primary p-2 w-24 rounded-md hover:bg-primary-dark transition-colors rtl:text-[17px]"
          >
            <img src="/assets/svgs/edit.svg" alt="Edit icon" className="w-7" />
            {t("edit")}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5 my-3 border rounded-md p-3 w-full rtl:flex-row-reverse">
          <div className="w-32 h-24 flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 ">
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
          <div className="text-center md:text-left ">
            <h2 className="font-semibold text-16">{userInfo?.name || "N/A"}</h2>
            <p className="text-gray-400 text-14 mt-2">
              {userInfo?.role?.name || "Vertex CEO"}
            </p>
          </div>
        </div>

        <div className="border rounded-md p-3 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <p className="text-gray-400 text-15 rtl:text-[16px]">{t("name")}</p>
              <h3 className="text-13">{userInfo?.name || "N/A"}</h3>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-400 text-15 rtl:text-[16px]">{t("email")}</p>
              <h3 className="text-13">{userInfo?.email || "N/A"}</h3>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <p className="text-gray-400 text-15 rtl:text-[16px]">{t("phone")}</p>
              <h3 className="text-13 flex items-center gap-2">
                {userInfo?.phone || "N/A"}
                {userInfo?.phone && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(userInfo.phone);
                    }}
                    className="text-primary hover:text-primary-dark transition-colors"
                    title="Copy phone number"
                    aria-label="Copy phone number"
                  >
                    <RxCopy size={15} />
                  </button>
                )}
              </h3>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-400 text-15 rtl:text-[16px]">{t("role")}</p>
              <h3 className="text-13">{userInfo?.role?.name || "N/A"}</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ViewUserDetails;