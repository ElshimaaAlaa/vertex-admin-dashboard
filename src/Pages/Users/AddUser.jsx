import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import InputField from "../../Components/InputFields/InputField";
import { FiUpload } from "react-icons/fi";
import { addUser } from "../../ApiServices/AddUser";
import { ImageUpload } from "../../Components/Upload Image/UploadImage";
import { ClipLoader } from "react-spinners";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    role_id: "",
    image: null,
    password: "",
    password_confirmation: "",
  };

  const roleOptions = [
    { id: 1, name: "Admin Role", description: "وصف الدور بالعربية" },
    { id: 2, name: "User Role", description: "User role description" },
    { id: 3, name: "Guest Role", description: "Guest role description" },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    role_id: Yup.number().required("Role is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
    image: Yup.mixed().required("Image is required"),
  });

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
    setSubmitSuccess(false);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("role_id", values.role_id); 
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("image", values.image);

      const response = await addUser(formData);
      console.log("API Response:", response);

      if (response.status) {
        setSubmitSuccess(true);
        resetForm();
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[89vh] mx-5 py-10">
      <section className="bg-white rounded-md p-5">
        <h3 className="font-bold text-17 mb-5">Add Users</h3>
        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            User added successfully!
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="flex items-center justify-between border-gray-200 border-1 p-4 rounded-md bg-gray-50">
                <ImageUpload
                  previewImage={previewImage}
                  onImageChange={(e) => handleImageChange(e, setFieldValue)}
                  name="image"
                />
                <p className="font-bold flex items-center gap-2 text-14">
                  <FiUpload size={18} />
                  Upload Picture
                </p>
              </div>

              <div className="border-gray-200 border-1 bg-gray-50 rounded-md p-4 mt-3">
                <div className="flex items-center gap-2">
                  <InputField
                    name="name"
                    placeholder="Name"
                    label="Full Name"
                    required
                  />
                  <InputField
                    name="email"
                    placeholder="Email"
                    type="email"
                    label="Email Address"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <InputField
                    name="phone"
                    placeholder="Phone Number"
                    label="Phone Number"
                    required
                  />

                  <div className="relative w-full">
                    <Field name="role_id">
                      {({ field, form, meta }) => (
                        <div>
                          <button
                            type="button"
                            className={`w-full text-14 h-14 p-3 text-left bg-white border ${
                              meta.touched && meta.error
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-md shadow-sm focus:outline-none focus:border-primary ${
                              values.role_id ? "text-black" : "text-gray-400"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById("role-dropdown")
                                .classList.toggle("hidden");
                            }}
                          >
                            {values.role_id
                              ? roleOptions.find(
                                  (opt) => opt.id === Number(values.role_id)
                                )?.name
                              : "Select a role"}
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </button>

                          {meta.touched && meta.error && (
                            <p className="mt-1 text-sm text-red-600">
                              {meta.error}
                            </p>
                          )}

                          <div
                            id="role-dropdown"
                            className="hidden absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg"
                          >
                            <ul className="py-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {roleOptions.map((option) => (
                                <li
                                  key={option.id}
                                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                                  onClick={() => {
                                    setFieldValue("role_id", option.id);
                                    document
                                      .getElementById("role-dropdown")
                                      .classList.add("hidden");
                                  }}
                                >
                                  <div className="flex items-center">
                                    <span className="ml-3 block font-normal truncate">
                                      {option.name}
                                    </span>
                                  </div>
                                  {values.role_id === option.id && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                      <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <InputField
                    name="password"
                    placeholder="Password"
                    type="password"
                    label="Password"
                    required
                  />
                  <InputField
                    name="password_confirmation"
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    required
                  />
                </div>
                <div className="mt-4 flex items-center gap-3 justify-end">
                  <button
                    onClick={() => navigate("/Dashboard/Users")}
                    type="button"
                    className="bg-gray-100 text-gray-400 p-3 w-32 rounded-md "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="p-3 bg-primary text-white rounded-md w-32 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <ClipLoader size={22} color="#fff" />
                    ) : (
                      <>
                        <FaCircleCheck size={17} />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
      {/* success modal */}

    </div>
  );
}
export default AddUser;