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
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    role_id: "",
    image: "",
  });
  const fileInputRef = useRef(null);

  // Fetch user data if not passed via state
  useEffect(() => {
    if (state?.userInfo) {
      setInitialValues({
        name: state.userInfo.name || "",
        email: state.userInfo.email || "",
        phone: state.userInfo.phone || "",
        role_id: state.userInfo.role_id?.toString() || "",
        image: state.userInfo.image || "",
      });
    } else {
      // Add API call here to fetch user data if needed
      console.warn("No user data passed via state");
    }
  }, [state]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    role_id: Yup.string().required("Role is required"),
    image: Yup.mixed().test(
      "is-valid-image",
      "Image is required",
      (value, context) => {
        // Allow existing image or new selected image
        return context.parent.image || selectedImage;
      }
    ),
  });

  const roleOptions = [
    { id: "1", name: "Admin Role", description: "وصف الدور بالعربية" },
    { id: "2", name: "User Role", description: "User role description" },
    { id: "3", name: "Guest Role", description: "Guest role description" },
  ];

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFieldValue("image", file); // Update Formik value
    }
  };

  const handleImageDelete = (setFieldValue) => {
    setSelectedImage(null);
    setFieldValue("image", ""); // Clear Formik value
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
    } else if (values.image && typeof values.image === "string") {
      // If keeping existing image (URL string)
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
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
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
                      onClick={() => handleImageDelete(setFieldValue)}
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

              {/* Rest of your form fields... */}
              {/* ... (keep your existing form field code) ... */}

              <EndButtons onclick={() => navigate("/DashBoard/Users")} isLoading={isLoading} />
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default EditUserInfo;