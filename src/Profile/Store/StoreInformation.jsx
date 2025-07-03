import { Helmet } from "react-helmet";
import { FaRegEye } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
function StoreInformation() {
  const storeInformation = JSON.parse(
    localStorage.getItem("storeProfileData") || "{}"
  );
  const banner = JSON.parse(localStorage.getItem("storeThemeData") || "{}");
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>Store Information</title>
        <meta name="description" content="Edit Store Information" />
        <meta property="og:title" content="Edit Store Information" />
        <meta property="og:description" content="Edit Store Information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/Store Information"
        />
      </Helmet>
      <section>
        <h1 className="font-bold text-[18px] mb-3 rtl:text-[20px]">{t("storeInfo")}</h1>
        <div className=" border border-gray-200 rounded-md p-5 w-full">
          <div className="flex flex-col md:flex-row items-center gap-x-96">
            <div className="text-center md:text-left">
              <h2 className="text-15  text-gray-400 rtl:text-[15px]">{t("name")}</h2>
              <p className="mt-2 text-14">
                {storeInformation.store_name || "N/A"}
              </p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-15 text-gray-400 rtl:text-[15px]">{t("location")}</h2>
              <p className="mt-2 text-14">
                {storeInformation.address || "N/A"}
              </p>
            </div>
          </div>
          <h2 className="text-15 mt-5 text-gray-400 rtl:text-[15px]">{t("bio")}</h2>
          <p className="mt-2 text-14">{storeInformation.bio || "N/A"}</p>
          <div className="flex flex-col lg:flex-row md:flex-row items-end gap-x-[360px]">
            <div>
              <p className="text-17 font-bold mb-3 mt-7 rtl:text-[18px]">{t("banners")}</p>
              <div className="flex flex-wrap gap-4">
                {banner.banners &&
                  Array.isArray(banner.banners) &&
                  banner.banners.map((file, index) => (
                    <div key={index}>
                      <img
                        src={URL.createObjectURL(
                          new File([file], file.name, { type: file.type })
                        )}
                        alt={`Banner`}
                        className=" object-cover rounded"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex items-center gap-10 mb-3">
              <div className="flex items-center gap-2">
                <FaRegEye color="#E0A75E" size={20} />
                <p className="text-15 rtl:text-[16px]">{t("view")}</p>
              </div>
              <div className="flex items-center gap-2">
                <IoDownloadOutline color="#E0A75E" size={20} />
                <p className="text-15 rtl:text-[16px]">{t("download")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default StoreInformation;