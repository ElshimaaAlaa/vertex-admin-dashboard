// import InputField from "../InputFields/InputField";
// import PasswordInput from "../Password Input/PasswordInput";
// import RoleDropdown from "../RoleDropdown/RoleDropdown";
import InputField from "../../Components/InputFields/InputField";
import RoleDropdown from "./RoleDropdown";
import PasswordInput from "../../Components/Password Input/PasswordInput";
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
  return (
    <div className="border-gray-200 border-1 bg-gray-50 rounded-md p-4 mt-3">
      <div className="flex items-center gap-2">
        <InputField name="name" placeholder="Name" label="Full Name" required />
        <InputField
          name="email"
          placeholder="Email"
          type="email"
          label="Email Address"
          required
        />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <InputField
          name="phone"
          placeholder="Phone Number"
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
          placeholder={"Password"}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          error={touched.password && errors.password}
          active={touched.password}
        />
        <PasswordInput
          placeholder={"Confirm Password"}
          name="password_confirmation"
          showPassword={showConfirmPassword}
          togglePasswordVisibility={toggleConfirmPasswordVisibility}
          error={touched.password_confirmation && errors.password_confirmation}
          active={touched.password_confirmation}
          label="Confirm Password"
        />
      </div>
    </div>
  );
};

export default UserFormFields;
