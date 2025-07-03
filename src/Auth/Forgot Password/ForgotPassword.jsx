import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import MainBtn from "../../Components/Main Button/MainBtn";
import Email from "../../Svgs/Email";
import "./forgotpassword.scss";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { ForgotPasswordService } from "../../ApiServices/ForgotPasswordService";
import { useNavigate } from "react-router-dom";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t("invalidEmail")).required(t("emailRequired")),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      await ForgotPasswordService(values.email);
      navigate("/AdminLogin/VerifayPassword");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
  };

  return (
    <div
      className="main-container min-h-screen flex items-center justify-center"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("forgotPasswordTitle")}</title>
        <html dir={isRTL ? "rtl" : "ltr"} lang={i18n.language} />
      </Helmet>
      <div
        className={`forgotpasswordContainer w-96 lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-gray-50 rounded-lg p-6 `}
      >
        <div className="flex justify-between items-center">
          <img
            src="/assets/svgs/vertex.svg"
            alt="logo"
            className="w-48 h-10 mb-3"
          />
          <div className="relative">
            <button
              className="flex items-center gap-1 text-14 bg-customOrange-lightOrange text-primary rounded-md p-2"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              {i18n.language.toUpperCase()}
              <IoIosArrowDown size={20} />
            </button>
            {showLanguageDropdown && (
              <div
                className={`absolute ${
                  isRTL ? "left-0" : "right-0"
                } w-14 bg-white rounded-md shadow-lg z-10`}
              >
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => changeLanguage("en")}
                >
                  EN
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => changeLanguage("ar")}
                >
                  AR
                </button>
              </div>
            )}
          </div>
        </div>

        <h1 className="font-bold text-[21px] mt-2 text-start">
          {t("forgotpassword")}
        </h1>

        <p className="text-secondary mt-2 text-15 text-start ">
          {t("enterForgotEmail")}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-2 flex flex-col items-center w-full">
              <AuthInputField
                name="email"
                placeholder={t("enterEmail")}
                icon={Email}
                error={touched.email && errors.email}
                active={touched.email}
                dir={isRTL ? "rtl" : "ltr"}
              />

              <div className="mt-3 w-full">
                <MainBtn
                  text={
                    isLoading ? (
                      <ClipLoader color="#fff" size={22} />
                    ) : (
                      t("sendCode")
                    )
                  }
                  btnType="submit"
                  disabled={isLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default ForgotPassword;
