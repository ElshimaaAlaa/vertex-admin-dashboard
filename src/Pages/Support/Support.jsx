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
import EmailAddress from "../../Svgs/EmailAddress";
import PhoneNum from "../../Svgs/PhoneNum";
import { settings } from "../../ApiServices/Settings";
import InputField from "../../Components/InputFields/InputField";

function Support() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [settingData, setSettingData] = useState([]);

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
    name: Yup.string()
      .min(3, "Name should be at least 3 characters long")
      .max(50, "Name should not exceed 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .min(10, "Phone number should be at least 10 digits long")
      .max(15, "Phone number should not exceed 15 digits")
      .required("Phone number is required"),
    message: Yup.string()
      .min(10, "Message should be at least 10 characters long")
      .max(500, "Message should not exceed 500 characters")
      .required("Message is required"),
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

  const ContactCard = ({ icon, title, value, link }) => (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md mb-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <div>
          <h3 className="font-bold text-16 mb-2">{title}</h3>
          <a href={link} className="text-gray-400 mt-5 text-15">
            {value}
          </a>
        </div>
      </div>
      <img
        src="/assets/svgs/arrow_forward.svg"
        alt="arrow"
        className="w-6 h-4"
      />
    </div>
  );
  useEffect(() => {
    const fetchGeneralSetting = async () => {
      const data = await settings();
      console.log("settings data", data);
      setSettingData(data);
    };
    fetchGeneralSetting();
  }, []);
  return (
    <div className="bg-white">
      <Helmet>
        <title>Support | Vertex</title>
        <meta name="description" content="Support Page" />
        <meta property="og:title" content="Support | Vertex" />
        <meta property="og:description" content="Support Page" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo (2).png" />
        <meta property="og:url" content="https://vertex.com/support" />
      </Helmet>

      <h1 className="font-bold text-center text-17 mt-6">
        Send us Your Problem and we are <br /> contact with you
      </h1>
      <div className="flex justify-center gap-5 mx-20">
        <section className="bg-white rounded-md drop-shadow-lg p-5 w-450 h-72 mt-10">
          <h2 className="font-bold text-17 mb-3 mt-2 relative pb-1 gradient-border-bottom">
            Contact information
          </h2>
          <ContactCard
            icon={<PhoneNum />}
            title="Call us"
            value={settingData.phone || "Not provided"}
          />
          <ContactCard
            icon={<EmailAddress />}
            title="Email"
            value={settingData.email || "Not provided"}
            link="mailto:Vertex@gmail.com"
          />
        </section>

        <section className="bg-customOrange-mediumOrange p-5 mt-10 w-[430px] md:w-[430px] lg:w-500 rounded-md">
          <div className="flex justify-center">
            <img
              src="/assets/svgs/chats.svg"
              alt="messages"
              className="w-14 mt-4 mb-2"
            />
          </div>
          <h2 className="font-bold text-17 text-center mb-1">
            Send your problem
          </h2>
          <p className="text-gray-400 text-14 text-center mb-2">
            We are here to help you
          </p>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col gap-2">
                <InputField name="name" placeholder="Name" />
                <AuthInputField name="email" placeholder="Email" />
                <InputField name="phone" placeholder="Phone Number" />
                <Field
                  as="textarea"
                  placeholder="Message"
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
                        Send Message
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
          <p className="font-bold mt-5">Message sent successfully!</p>
          <button
            className="bg-primary text-white font-bold p-2 w-40 mt-4 rounded-md"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Done!
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default Support;
