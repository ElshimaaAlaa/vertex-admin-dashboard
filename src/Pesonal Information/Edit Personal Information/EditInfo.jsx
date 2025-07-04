import { Form, Formik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import InputField from "../../Components/InputFields/InputField";
import { AiOutlineDelete } from "react-icons/ai";
import { LuUpload } from "react-icons/lu";
import EndButtons from "../../Components/End Buttons/EndButtons";
import { useTranslation } from "react-i18next";
function EditInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();
  const personalInfo = state || {};
  const live = localStorage.getItem("live");

  const initialValues = {
    name: personalInfo?.name || "",
    email: personalInfo?.email || "",
    phone: personalInfo?.phone || "",
    image: personalInfo?.image || null,
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      const response = await axios.post(
        `https://${live}/api/admin/update-profile`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "ar",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("admin token")}`,
          },
        }
      );
      console.log("Profile updated:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Edit Personal Information</title>
      </Helmet>
      <section>
        <h1 className="font-bold text-[18px] rtl:text-[20px]">{t("editProfile")}</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="my-3 gap-3">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border rounded-md p-3">
                  {selectedImage || personalInfo?.image ? (
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : personalInfo.image
                      }
                      alt="Profile"
                      className="w-32 h-24 rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-15">
                     {t("noImage")}
                    </span>
                  )}
                  <div className="flex items-center gap-3 font-bold text-14">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="imageUpload"
                      onChange={(e) => {
                        setSelectedImage(e.target.files[0]);
                        setFieldValue("image", e.target.files[0]);
                      }}
                      aria-label="Upload new image"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer flex items-center gap-2 rtl:text-[16px]"
                    >
                      <LuUpload size={18} />
                    {t("uploadPic")}
                    </label>
                    {(selectedImage || personalInfo?.image) && (
                      <button
                        type="button"
                        className="bg-red-50 p-2 rounded-md border border-red-400"
                        onClick={() => {
                          setSelectedImage(null);
                          setFieldValue("image", null);
                        }}
                        aria-label="Delete image"
                      >
                        <AiOutlineDelete
                          color="#DC2626"
                          size={22}
                          height={25}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="border p-3 rounded-md bg-gray-50 w-full">
                <div className="flex flex-col md:flex-row gap-2">
                  <InputField placeholder={t("name")} name="name" />
                  <InputField placeholder={t("email")} name="email" />
                </div>
                <div className="mt-2">
                  <InputField placeholder={t("phone")} name="phone" />
                </div>
              </div>
              <EndButtons
                onclick={() => navigate("/Dashboard/MainInfo")}
                isLoading={isLoading}
              />
            </Form>
          )}
        </Formik>
      </section>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal}>
        <div className="flex flex-col w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 text-center">
            {t("updateProfile")}
          </p>
          <button
            className="bg-primary font-bold text-white rounded-md p-2 text-14 mt-4 w-60 "
            onClick={() => navigate("/Dashboard/MainInfo")}
          >
            {t("done")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default EditInfo;
