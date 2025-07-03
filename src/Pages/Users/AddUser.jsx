import { Form, Formik } from "formik";
import { useState, useCallback, useEffect } from "react";
import * as Yup from "yup";
import { addUser } from "../../ApiServices/AddUser";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../../ApiServices/UserRoles";
import EndButtons from "../../Components/End Buttons/EndButtons";
import ImageUploadSection from "./ImageUploadSection";
import UserFormFields from "./UserFormFields";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
function AddUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    role_id: "",
    image: null,
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
    phone: Yup.string().required("Phone number is required"),
    role_id: Yup.number().required(t("roleRequired")),
    password: Yup.string()
      .required(t("passwordRequired"))
      .min(8, t("passwordLenght")),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], t("matchPassword"))
      .required(t("confirmRequired")),
    image: Yup.mixed().required(t("imageRequired")),
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoleOptions(response.data);
        setRolesLoading(false);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setRolesError(error.message || "Failed to load roles");
        setRolesLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("role_id", values.role_id.toString());
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("image", values.image);

      const response = await addUser(formData);

      if (response.status) {
        setIsLoading(false);
        resetForm();
        setPreviewImage(null);
        setTimeout(() => {
          navigate("/Dashboard/Users");
        }, 1200);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setIsLoading(false);
      setApiError(error.message || "Failed to add user");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <div className="h-[89vh] mx-5 py-10">
      <Helmet>
        <title>Add New User | Vertex</title>
      </Helmet>
      <section className="bg-white rounded-md p-5">
        <h3 className="font-bold text-17 mb-5 rtl:text-[20px]">{t("AddUser")}</h3>

        {apiError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {apiError}
          </div>
        )}

        {rolesError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {rolesError}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <ImageUploadSection
                previewImage={previewImage}
                handleImageChange={handleImageChange}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />

              <UserFormFields
                values={values}
                errors={errors}
                touched={touched}
                rolesLoading={rolesLoading}
                roleOptions={roleOptions}
                setFieldValue={setFieldValue}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                toggleConfirmPasswordVisibility={
                  toggleConfirmPasswordVisibility
                }
              />
              <EndButtons
                onclick={() => navigate("/Dashboard/Users")}
                isLoading={isLoading}
              />
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
export default AddUser;