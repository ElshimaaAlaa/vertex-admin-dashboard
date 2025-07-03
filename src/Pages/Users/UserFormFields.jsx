import InputField from "../../Components/InputFields/InputField";
import RoleDropdown from "./RoleDropdown";
import PasswordInput from "../../Components/Password Input/PasswordInput";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
const UserFormFields = ({
  values,
  errors,
  touched,
  rolesLoading,
  roleOptions,
  setFieldValue,
  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
}) => {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div className="border-gray-200 border-1 bg-gray-50 rounded-md p-4 mt-3">
      <div className="flex items-center gap-2">
        <InputField
          name="name"
          placeholder={t("name")}
          label="Full Name"
          required
        />
        <InputField
          name="email"
          placeholder={t("email")}
          type="email"
          label="Email Address"
          required
        />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <InputField
          name="phone"
          placeholder={t("phone")}
          label="Phone Number"
          required
        />

        <RoleDropdown
          roleOptions={roleOptions}
          rolesLoading={rolesLoading}
          values={values}
          setFieldValue={setFieldValue}
        />
      </div>
      <div className="flex items-center gap-2 ">
        <PasswordInput
          name="password"
          placeholder={t("password")}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          error={touched.password && errors.password}
          active={touched.password}
          dir={isRTL ? "rtl" : "ltr"}
        />
        <PasswordInput
          placeholder={t("confirmPassword")}
          name="password_confirmation"
          showPassword={showConfirmPassword}
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
          error={touched.password_confirmation && errors.password_confirmation}
          active={touched.password_confirmation}
          label="Confirm Password"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>
    </div>
  );
};

export default UserFormFields;
