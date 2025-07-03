import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Field, Form, Formik } from "formik";
import InputField from "../../Components/InputFields/InputField";
import { getAdminPermissions } from "../../ApiServices/AdminPermissions";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { addRole } from "../../ApiServices/AddRole";
import { useTranslation } from "react-i18next";
function AddRole() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [isFetchingPermissions, setIsFetchingPermissions] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  const initialValues = {
    name: "",
    description: "",
    can_access_panel: false,
    publish: false,
    permissions: [],
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await getAdminPermissions();
        if (response) {
          setPermissions(response);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setIsFetchingPermissions(false);
      }
    };

    fetchPermissions();
    setIsRTL(i18n.language === "ar");
  }, [i18n.language, setIsRTL]);

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description[ar]", values.description);
    formData.append("description[en]", values.description);
    formData.append("can_access_panel", values.can_access_panel ? 1 : 0);
    formData.append("publish", values.publish ? 1 : 0);
    values.permissions.forEach((id) => {
      formData.append("permissions[]", parseInt(id));
    });

    try {
      await addRole(formData);
      resetForm();
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const handleSelectAll = (setFieldValue) => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      setFieldValue(
        "permissions",
        permissions.map((perm) => perm.id.toString())
      );
    } else {
      setFieldValue("permissions", []);
    }
  };

  const groupedPermissions = permissions.reduce((groups, permission) => {
    const prefix = permission.name.split("_")[0];
    if (!groups[prefix]) {
      groups[prefix] = [];
    }
    groups[prefix].push(permission);
    return groups;
  }, {});

  if (showModal) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return (
    <div className="min-h-screen pt-5 relative pb-32">
      <Helmet>
        <title>Add Role | Vertex</title>
      </Helmet>
      <section className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13 rtl:text-[15px]">
          {t("addHead")}
        </p>
        <h3 className="font-bold mt-2 text-16 rtl:text-[18px]">{t("addUserRole")}</h3>
      </section>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="mt-3">
            <div className="bg-white rounded-md p-5 mx-5">
              <section className="flex flex-col gap-2 bg-gray-50 border-1 border-gray-200 p-3 rounded-md">
                <InputField name={"name"} placeholder={t("roleName")} required />
                <Field
                  name={"description"}
                  placeholder={t("description")}
                  as="textarea"
                  className="w-full h-24 p-3 border-2 rounded-lg outline-none transition-all duration-200 placeholder:text-14 focus:border-primary placeholder:text-gray-400"
                  required
                />
              </section>

              <section className="bg-gray-50 border-1 mt-3 border-gray-200 p-5 rounded-md flex items-center gap-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="can_access_panel"
                    checked={values.can_access_panel}
                    onChange={(e) =>
                      setFieldValue("can_access_panel", e.target.checked)
                    }
                    className="hidden"
                  />
                  <span
                    className={`relative w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                      values.can_access_panel
                        ? "bg-primary border-primary"
                        : "border-gray-300"
                    }`}
                    onClick={() =>
                      setFieldValue(
                        "can_access_panel",
                        !values.can_access_panel
                      )
                    }
                  >
                    {values.can_access_panel && (
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
                  <p className="text-15 font-bold ml-2 rtl:mr-2 rtl:text-[16px]">
                    {t("accessPanel")} 
                  </p>
                </label>
              </section>

              <section className="bg-gray-50 border-1 border-gray-200 p-5 rounded-md mt-3">
                <h3 className="font-bold text-15 mb-3 rtl:text-[16px]">{t("status")}</h3>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="publish"
                    checked={values.publish}
                    onChange={(e) => setFieldValue("publish", e.target.checked)}
                    className="hidden"
                  />
                  <span
                    className={`relative w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                      values.publish
                        ? "bg-primary border-primary"
                        : "border-gray-300"
                    }`}
                    onClick={() => setFieldValue("publish", !values.publish)}
                  >
                    {values.publish && (
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
                  <p className="text-15 text-gray-500 ml-2 rtl:mr-2 rtl:text-[15px]">{t("publish")}</p>
                </label>
              </section>

              <section className="border-1 border-gray-200 rounded-md mt-3">
                <div className="flex justify-between bg-customOrange-lightOrange p-5 rounded-t-md">
                  <h3 className="text-16 font-bold text-black rtl:text-[17px]">{t("permissions")}</h3>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={() => handleSelectAll(setFieldValue)}
                      className="hidden"
                    />
                    <span
                      className={`relative w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                        selectAll
                          ? "bg-primary border-primary"
                          : "border-gray-300 bg-white"
                      }`}
                      onClick={() => handleSelectAll(setFieldValue)}
                    >
                      {selectAll && (
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
                    <p className="text-14 font-bold text-primary ml-2 rtl:mr-2 rtl:text-[16px]">
                      {t("selectAll")}
                    </p>
                  </label>
                </div>

                <div className="bg-white p-5">
                  {isFetchingPermissions ? (
                    <p>{t("loadingPermission")}</p>
                  ) : (
                    Object.entries(groupedPermissions).map(([group, perms]) => (
                      <div key={group} className="mb-6">
                        <h3 className="font-bold text-15 mb-3 capitalize">
                          {group}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {perms.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-center gap-3"
                            >
                              <label className="inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="permissions"
                                  value={permission.id.toString()}
                                  checked={values.permissions.includes(
                                    permission.id.toString()
                                  )}
                                  onChange={(e) => {
                                    const newPermissions = e.target.checked
                                      ? [...values.permissions, e.target.value]
                                      : values.permissions.filter(
                                          (id) => id !== e.target.value
                                        );
                                    setFieldValue(
                                      "permissions",
                                      newPermissions
                                    );
                                    if (!newPermissions.length)
                                      setSelectAll(false);
                                  }}
                                  className="hidden"
                                />
                                <span
                                  className={`relative w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                                    values.permissions.includes(
                                      permission.id.toString()
                                    )
                                      ? "bg-primary border-primary"
                                      : "border-gray-300"
                                  }`}
                                  onClick={() => {
                                    const exists = values.permissions.includes(
                                      permission.id.toString()
                                    );
                                    const updated = exists
                                      ? values.permissions.filter(
                                          (id) =>
                                            id !== permission.id.toString()
                                        )
                                      : [
                                          ...values.permissions,
                                          permission.id.toString(),
                                        ];
                                    setFieldValue("permissions", updated);
                                    if (!updated.length) setSelectAll(false);
                                  }}
                                >
                                  {values.permissions.includes(
                                    permission.id.toString()
                                  ) && (
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
                                <p className="text-14 text-gray-600 ml-2 rtl:mr-2">
                                  {permission.name}
                                </p>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
            <Footer
              saveText={t("save")}
              cancelText={t("cancel")}
              cancelBtnType={"button"}
              saveBtnType={"submit"}
              cancelOnClick={() => navigate("/Dashboard/AllPermissions")}
              isLoading={isLoading}
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
          <p className="font-bold text-16 mt-5 text-center rtl:text-[19px]">
            {t("successAddRole")}
          </p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 mt-4 w-36 rtl:text-[17px]"
            onClick={() => navigate("/Dashboard/AllPermissions")}
          >
            {t("done")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default AddRole;