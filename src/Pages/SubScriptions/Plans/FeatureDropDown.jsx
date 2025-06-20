import { useState } from "react";
import { Field } from "formik";
export const FeaturesDropdown = ({ features, values, setFieldValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFeature = (feature) => {
    const currentFeatures = values.features || [];
    if (currentFeatures.includes(feature)) {
      setFieldValue(
        "features",
        currentFeatures.filter((f) => f !== feature)
      );
    } else {
      setFieldValue("features", [...currentFeatures, feature]);
    }
  };

  return (
    <div className="relative w-full">
      <Field name="features">
        {({ field, form, meta }) => (
          <div>
            <button
              type="button"
              className={`w-full text-14 h-14 p-3 text-left bg-white border ${
                meta.touched && meta.error
                  ? "border-red-500"
                  : "border-gray-200"
              } rounded-md shadow-sm focus:outline-none focus:border-primary ${
                values.features?.length > 0 ? "text-black " : "text-gray-400"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
            >
              {values.features?.length > 0
                ? `${values.features.length} selected`
                : "Select features"}
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
              <p className="mt-1 text-sm text-red-600">{meta.error}</p>
            )}

            {/* Selected features chips */}
            <div className="flex flex-wrap gap-2 mt-3 ">
              {values.features?.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center p-2 rounded-md text-xs font-medium bg-primary/10 text-primary"
                >
                  {feature}
                  <button
                    type="button"
                    className="ml-1.5 inline-flex text-red-600 text-lg rounded-full focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFeature(feature);
                    }}
                  >
                    <span className="sr-only">Remove</span>
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                <ul className="py-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="cursor-pointer select-none relative text-13 py-2 pl-3 pr-9 hover:bg-blue-50"
                      onClick={() => toggleFeature(feature)}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                          checked={values.features?.includes(feature)}
                          onChange={() => {}}
                        />
                        <span className="ml-3 block font-normal truncate">
                          {feature}
                        </span>
                      </div>
                      {values.features?.includes(feature) && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
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
            )}
          </div>
        )}
      </Field>
    </div>
  );
};