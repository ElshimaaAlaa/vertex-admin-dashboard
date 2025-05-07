import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import InputField from "../../Components/InputFields/InputField";
import { FiUpload } from "react-icons/fi";

function AddUser() {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    role: "",
    image: null,
  };

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "guest", label: "Guest" },
  ];

  const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();

  };

  return (
    <div className="h-[89vh] mx-5 py-10">
      <section className="bg-white rounded-md p-5">
        <h3 className="font-bold text-17 mb-5">Add Users</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
                <div className="flex items-center justify-between border-gray-200 border-1 p-4 rounded-md bg-gray-50">
                    <img/>
                    <p className="font-bold flex items-center gap-2 text-14"><FiUpload size={18}/>Upload Picture</p>
                </div>
              <div className="border-gray-200 border-1 bg-gray-50 rounded-md p-4 mt-3">
                <div className="flex items-center gap-2">
                  <InputField name={"name"} placeholder={"Name"} />
                  <InputField name={"email"} placeholder={"Email"} />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <InputField
                    name={"phone_number"}
                    placeholder={"Phone Number"}
                  />
                  <div className="relative w-full">
                    <Field name="role">
                      {({ field, form, meta }) => (
                        <div>
                          <button
                            type="button"
                            className={`w-full text-14 h-14 p-3 text-left bg-white border ${
                              meta.touched && meta.error
                                ? "border-red-500"
                                : "border-gray-200"
                            } rounded-md shadow-sm focus:outline-none focus:border-primary ${
                              values.role ? "text-black" : "text-gray-400"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              document
                                .getElementById("role-dropdown")
                                .classList.toggle("hidden");
                            }}
                          >
                            {values.role
                              ? roleOptions.find(
                                  (opt) => opt.value === values.role
                                )?.label
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
                          <div
                            id="role-dropdown"
                            className="hidden absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg"
                          >
                            <ul className="py-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {roleOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                                  onClick={() => {
                                    setFieldValue("role", option.value);
                                    document
                                      .getElementById("role-dropdown")
                                      .classList.add("hidden");
                                  }}
                                >
                                  <div className="flex items-center">
                                    <span className="ml-3 block font-normal truncate">
                                      {option.label}
                                    </span>
                                  </div>
                                  {values.role === option.value && (
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
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default AddUser;