import { Field, Form, Formik } from "formik";
import { Helmet } from "react-helmet";
import { addPlan } from "../../../ApiServices/AddPlan";
import InputField from "../../../Components/InputFields/InputField";
import Footer from "../../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SuccessModal from "../../../Components/Modal/Success Modal/SuccessModal";
import { FeaturesDropdown } from "./FeatureDropDown";

function AddPlan() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const AVAILABLE_FEATURES = [
    "24/7 Support",
    "Advanced Analytics",
    "API Access",
    "Custom Branding",
    "Multiple Users",
    "Priority Support",
    "SSL Security",
    "Unlimited Storage",
    "Video Tutorials",
    "Webinars",
  ];

  const initialValues = {
    name: "",
    duration: "",
    sale_price: "",
    price: "",
    discount_end_date: "",
    is_most_popular: false,
    published: false,
    features: [],
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("sale_price", values.sale_price);
    formData.append("price", values.price);
    formData.append("duration", values.duration);
    formData.append("discount_end_date", values.discount_end_date);
    formData.append("is_most_popular", values.is_most_popular ? 1 : 0);
    formData.append("published", values.published ? 1 : 0);

    values.features.forEach((feature) => {
      formData.append("features[]", feature);
    });

    try {
      await addPlan(formData);
      resetForm();
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-5 py-28 relative">
      <Helmet>
        <title>Add Plans | Vertex</title>
      </Helmet>

      <section className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13">
          Menu / Subscriptions / Plans / Add Plan
        </p>
        <h3 className="font-bold mt-2 text-16">Add Plan</h3>
      </section>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col h-full">
            <div className="mx-5 mt-3 bg-white p-5 rounded-md border-1 border-gray-200">
              <div className="flex items-center gap-2 rounded-md border-1 border-gray-200 bg-gray-50 p-5">
                <InputField name={"name"} placeholder={"Title"} required />
                <InputField
                  name={"duration"}
                  placeholder={"Duration"}
                  required
                />
              </div>

              <div className="rounded-md border-1 border-gray-200 bg-gray-50 p-5 mt-3">
                <h3 className="font-bold text-16 mb-3">Pricing</h3>
                <div className="flex gap-2 items-center">
                  <InputField
                    name={"price"}
                    placeholder={"Price"}
                    required
                  />
                  <InputField
                    name={"sale_price"}
                    placeholder={"Sale Price"}
                  />
                </div>
                <div className="flex w-full gap-4 items-center mt-2">
                  <Field
                    name="discount_end_date"
                    placeholder="Discount End Date"
                    type="date"
                    className={`w-full h-14 p-3 border-2 rounded-lg outline-none transition-all duration-200 placeholder:text-14 focus:border-primary placeholder:text-gray-400`}
                  />
                  <div className="w-full"></div>
                </div>
              </div>

              <div className="rounded-md border-1 border-gray-200 bg-gray-50 p-5 mt-3">
                <h3 className="font-bold text-15 mb-3">Features</h3>
                <FeaturesDropdown
                  features={AVAILABLE_FEATURES}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>

              {/* Most Popular Plan Toggle */}
              <div className="rounded-md border-1 border-gray-200 bg-gray-50 p-5 mt-3">
                <h3 className="font-bold text-15 mb-3">
                  Is Most Popular Plan?
                </h3>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={values.is_most_popular}
                      onChange={(e) =>
                        setFieldValue("is_most_popular", e.target.checked)
                      }
                      className="hidden"
                    />
                    <span
                      className={`relative w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                        values.is_most_popular
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        setFieldValue(
                          "is_most_popular",
                          !values.is_most_popular
                        )
                      }
                    >
                      {values.is_most_popular && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M16.6667 5L7.50004 14.1667L3.33337 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <p className="text-15 text-gray-500 ml-2">Most Popular</p>
                  </label>
                </div>
              </div>

              {/* Publish Status Toggle */}
              <div className="rounded-md border-1 border-gray-200 bg-gray-50 p-5 mt-3">
                <h3 className="font-bold text-15 mb-3">Status</h3>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={values.published}
                      onChange={(e) =>
                        setFieldValue("published", e.target.checked)
                      }
                      className="hidden"
                    />
                    <span
                      className={`relative w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                        values.published
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        setFieldValue("published", !values.published)
                      }
                    >
                      {values.published && (
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M16.6667 5L7.50004 14.1667L3.33337 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <p className="text-15 text-gray-500 ml-2">Publish</p>
                  </label>
                </div>
              </div>
            </div>
            <Footer
              saveBtnType={"submit"}
              cancelBtnType={"button"}
              saveText={"Save"}
              cancelText={"Cancel"}
              isLoading={isLoading}
              cancelOnClick={() => navigate("/Dashboard/Plans")}
            />
          </Form>
        )}
      </Formik>

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold text-16 mt-5 text-center">
            Plan Data Added successfully!
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-60"
            onClick={() => navigate("/Dashboard/Plans")}
          >
            Done! Plan Added Successfully
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}

export default AddPlan;
