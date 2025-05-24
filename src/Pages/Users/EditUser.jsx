import { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { LuUpload } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import InputField from "../../Components/InputFields/InputField";
import { handleUpdateUserData } from "../../ApiServices/EditUser";
import EndButtons from "../../Components/End Buttons/EndButtons";

function EditUserInfo() {
  const { userId } = useParams();
  const { state } = useLocation();
  const userData = state?.userInfo || {};
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const initialValues = {
    name: userData.name || "",
    email: userData.email || "",
    phone: userData.phone || "",
    role_id: userData.role_id?.toString() || "1", // Default to "1" if null
    image: userData.image || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    role_id: Yup.string().required("Role is required"),
    image: Yup.mixed().test(
      "is-valid-image",
      "Image is required",
      (value) => value || selectedImage
    ),
  });

  const roleOptions = [
    { id: "1", name: "Admin Role", description: "وصف الدور بالعربية" },
    { id: "2", name: "User Role", description: "User role description" },
    { id: "3", name: "Guest Role", description: "Guest role description" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("role_id", values.role_id);

    // Handle image data
    if (selectedImage) {
      formData.append("image", selectedImage);
    } else if (values.image) {
      // If no new image selected but existing image exists
      formData.append("image", values.image);
    }

    try {
      await handleUpdateUserData(userId, formData);
      navigate(`/Dashboard/Users/ViewUserDetails/${userId}`, {
        state: { updated: true },
      });
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[89vh] pt-10">
      <Helmet>
        <title>Edit User | Vertex</title>
      </Helmet>
      <section className="bg-white mx-5 p-5 rounded-md">
        <h1 className="font-bold text-[18px] mb-5">Edit User</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              {/* Image Upload Section */}
              <div className="bg-gray-50 rounded-md p-3 border-1 border-gray-200">
                {(values.image || selectedImage) && (
                  <div className="mt-2 w-32 h-32">
                    <img
                      src={
                        selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : values.image
                      }
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/images/user.png";
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center gap-3 font-bold text-14 mt-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    aria-label="Upload new image"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <LuUpload size={18} />
                    Upload Picture
                  </label>
                  {(selectedImage || values.image) && (
                    <button
                      type="button"
                      className="bg-red-50 p-2 rounded-md border border-red-400"
                      onClick={handleImageDelete}
                      aria-label="Delete image"
                    >
                      <AiOutlineDelete color="#DC2626" size={22} height={25} />
                    </button>
                  )}
                </div>
                {touched.image && errors.image && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.image}
                  </div>
                )}
              </div>

              {/* Form Fields Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 border-1 border-gray-200 rounded-md p-3">
                <div>
                  <InputField name="name" placeholder="Name" />
                </div>

                <div>
                  <InputField name="email" placeholder="Email" type="email" />
                </div>

                <div>
                  <InputField name="phone" placeholder="Phone Number" />
                </div>

                {/* Role Dropdown */}
                <div className="relative w-full">
                  <Field name="role_id">
                    {({ field, meta }) => (
                      <div>
                        <button
                          type="button"
                          className={`w-full text-14 h-12 p-3 text-left bg-white border ${
                            meta.touched && meta.error
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded-md shadow-sm focus:outline-none focus:border-primary ${
                            values.role_id ? "text-black" : "text-gray-400"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            const dropdown =
                              document.getElementById("role-dropdown");
                            dropdown.classList.toggle("hidden");
                          }}
                        >
                          {values.role_id
                            ? roleOptions.find(
                                (opt) => opt.id === values.role_id
                              )?.name || `Role ID: ${values.role_id}`
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
              <EndButtons onclick={() => navigate("/DashBoard/Users")} />
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}
export default EditUserInfo;