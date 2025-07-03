import { useState, useEffect } from "react";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./UpdatePassword.scss";
import { ClipLoader } from "react-spinners";
import { handleUpdatePassword } from "../../ApiServices/UpdatePassword";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Password Input/PasswordInput";
import MainBtn from "../../Components/Main Button/MainBtn";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
function UpdatePassword() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    if (showModal || showSuccessModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    setIsRTL(i18n.language === "ar");
  }, [showModal, showSuccessModal, i18n.language]);

  const initialValues = {
    password: "",
    password_confirmation: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, t("passwordLenght"))
      .required(t("passwordRequired")),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], t("matchPassword"))
      .required(t("confirmRequired")),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      await handleUpdatePassword(values.password, values.password_confirmation);
      setShowSuccessModal(true);
      setShowModal(false);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/Dashboard/MainInfo");
      }, 2500);
    } catch (error) {
      console.error("Failed to update password", error);
      setError("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="flex items-center gap-2 text-15 border border-primary rounded-md p-3 text-primary mt-5 rtl:text-[16px]"
        onClick={() => setShowModal(true)}
        aria-label="Update password"
      >
        <img
          src="/assets/images/password_svgrepo.com.png"
          alt="update-password"
          className="w-5 h-5"
        />
        {t("updatePassword")}
      </button>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <button
          className="absolute rounded-md top-1 right-1 bg-red-600 text-white w-10 p-2 text-center"
          onClick={() => setShowModal(false)}
        >
          <IoClose size={23} />
        </button>
        <div className="w-350">
          <h1 className="text-primary text-[17px] font-bold ps-4 pb-4 pt-5 rtl:text-[21px]">
            {t("updatePassword")}
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="ps-3 pb-3 rtl:pe-3">
              <PasswordInput
                name="password"
                placeholder={t("newPassword")}
                showPassword={showNewPassword}
                togglePasswordVisibility={() =>
                  setShowNewPassword(!showNewPassword)
                }
                dir={isRTL ? "rtl" : "ltr"}
              />
              <PasswordInput
                name="password_confirmation"
                placeholder={t("confirmNewPass")}
                showPassword={showConfirmPassword}
                togglePasswordVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                dir={isRTL ? "rtl" : "ltr"}
              />
              {error && (
                <div className="text-red-600 text-sm mt-3">{error}</div>
              )}
              <div className="mt-3">
                <MainBtn
                  text={
                    isLoading ? (
                      <ClipLoader color="#fff" size={22} />
                    ) : (
                      t("save")
                    )
                  }
                />
              </div>
            </Form>
          </Formik>
        </div>
      </SuccessModal>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="flex flex-col items-center justify-center gap-3 w-350 p-5">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <h1 className="font-bold rtl:text-[19px]">{t("successUpdatePass")}</h1>
        </div>
      </SuccessModal>
    </div>
  );
}
export default UpdatePassword;
