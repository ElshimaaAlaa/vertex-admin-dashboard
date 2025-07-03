import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { sendSupport } from "../../ApiServices/Support";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import "./support.scss";
import { LuSend } from "react-icons/lu";
import MainBtn from "../../Components/Main Button/MainBtn";
import InputField from "../../Components/InputFields/InputField";
import ContactInfo from "./ContactInfo";
import { useTranslation } from "react-i18next";
function Support() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showModal]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
    phone: Yup.string().required("Phone number is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setError(null);
    try {
      await sendSupport(
        values.name,
        values.email,
        values.phone,
        values.message
      );
      resetForm();
      setShowModal(true);
    } catch (error) {
      setError("Failed to send the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div className={`bg-white ${isRTL ? "ltr-style" : ""}`}>
      <Helmet>
        <title>Support | Vertex</title>
        <meta name="description" content="Support Page" />
        <meta property="og:title" content="Support | Vertex" />
        <meta property="og:description" content="Support Page" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo (2).png" />
        <meta property="og:url" content="https://vertex.com/support" />
      </Helmet>

      <h1 className="font-bold text-center text-17 mt-5 m-auto w-330 rtl:text-[21px]">
        {t("send")}
      </h1>
      <div className={`flex justify-center gap-5 mx-20 ${isRTL?"flex-row-reverse":""}`}>
        <ContactInfo />
        <section className="bg-customOrange-mediumOrange p-5 mt-10 w-[430px] md:w-[430px] lg:w-500 rounded-md">
          <div className="flex justify-center">
            <img
              src="/assets/svgs/chats.svg"
              alt="messages"
              className="w-14 mt-4 mb-2"
            />
          </div>
          <h2 className="font-bold text-17 text-center mb-1 rtl:text-[19px] ">
            {t("sendProblem")}
          </h2>
          <p className="text-gray-400 text-14 text-center mb-2 rtl:text-[15px]  ">
            {t("helpYou")}
          </p>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-2">
                <InputField name="name" placeholder={t("name")} />
                <AuthInputField
                  name="email"
                  placeholder={t("email")}
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <InputField name="phone" placeholder={t("phone")} />
                <Field
                  as="textarea"
                  placeholder={t("message")}
                  name="message"
                  className={`w-full bg-white outline-none border-2 rounded-lg p-2 h-24 block placeholder:text-14 
                  ${
                    errors.message && touched.message
                      ? "border-red-500 focus:border-red-500"
                      : touched.message
                      ? "border-green-500 focus:border-green-500"
                      : "border-gray-200 focus:border-primary"
                  }`}
                />
                {error && (
                  <p className="text-red-500 text-center mt-2">{error}</p>
                )}
                <MainBtn
                  btnType={"submit"}
                  text={
                    isLoading ? (
                      <ClipLoader color="#fff" size={22} />
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <LuSend />
                        {t("sendMessage")}
                      </div>
                    )
                  }
                />
              </Form>
            )}
          </Formik>
        </section>
      </div>
      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 rtl:text-[19px]">{t("doneMessage")}</p>
          <button
            className="bg-primary text-white font-bold p-2 w-40 mt-4 rounded-md rtl:text-[17px]"
            type="button"
            onClick={() => setShowModal(false)}
          >
            {t("done")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default Support;