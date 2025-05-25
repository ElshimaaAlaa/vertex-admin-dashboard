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

function UpdatePassword() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal || showSuccessModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showModal, showSuccessModal]);

  const initialValues = {
    password: "",
    password_confirmation: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
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
        className="flex items-center gap-2 text-15 border border-primary rounded-md p-3 text-primary mt-5"
        onClick={() => setShowModal(true)}
        aria-label="Update password"
      >
        <img
          src="/assets/images/password_svgrepo.com.png"
          alt="update-password"
          className="w-5 h-5"
        />
        Update Password
      </button>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <button
          className="absolute rounded-md top-1 right-1 bg-red-600 text-white w-10 p-2 text-center"
          onClick={() => setShowModal(false)}
        >
          <IoClose size={23} />
        </button>
        <div className="w-300 ">
          <h1 className="text-primary text-[17px] font-bold ps-4 pb-4 pt-5">
            Update Password
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="ps-3 pb-3">
              <PasswordInput
                name="password"
                placeholder="New Password"
                showPassword={showNewPassword}
                togglePasswordVisibility={() =>
                  setShowNewPassword(!showNewPassword)
                }
              />
              <PasswordInput
                name="password_confirmation"
                placeholder="Confirm New Password"
                showPassword={showConfirmPassword}
                togglePasswordVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
              {error && (
                <div className="text-red-600 text-sm mt-3">{error}</div>
              )}
              <div className="mt-3">
                <MainBtn
                  text={
                    isLoading ? <ClipLoader color="#fff" size={22} /> : "Save"
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
          <h1 className="font-bold">Password Updated Successfully</h1>
        </div>
      </SuccessModal>
    </div>
  );
}
export default UpdatePassword;