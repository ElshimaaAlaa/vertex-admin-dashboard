import { Field } from "formik";

const RoleDropdown = ({ roleOptions, rolesLoading, values, setFieldValue }) => {
  return (
    <div className="relative w-full">
      <Field name="role_id">
        {({ field, form, meta }) => (
          <div>
            <button
              type="button"
              className={`w-full text-14 h-14 p-3 text-left bg-white border-2 border-gray-200 ${
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
              disabled={rolesLoading}
            >
              {rolesLoading
                ? "Loading roles..."
                : values.role_id
                ? roleOptions.find((opt) => opt.id === Number(values.role_id))
                    ?.name || "Select a role"
                : "Select a role"}
              {!rolesLoading && (
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
              )}
            </button>
            {meta.touched && meta.error && (
              <p className="mt-1 text-sm text-red-600">{meta.error}</p>
            )}
            {!rolesLoading && (
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
                      {Number(values.role_id) === option.id && (
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
            )}
          </div>
        )}
      </Field>
    </div>
  );
};

export default RoleDropdown;