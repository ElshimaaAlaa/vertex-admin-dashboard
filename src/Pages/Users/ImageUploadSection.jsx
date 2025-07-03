import { FiUpload } from "react-icons/fi";
import { ImageUpload } from "../../Components/Upload Image/UploadImage";
import { useTranslation } from "react-i18next";
const ImageUploadSection = ({
  previewImage,
  handleImageChange,
  setFieldValue,
  errors,
  touched,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between border-gray-200 border-1 p-3 rounded-md bg-gray-50">
      <ImageUpload
        previewImage={previewImage}
        onImageChange={(e) => handleImageChange(e, setFieldValue)}
        name="image"
      />
      <label
        htmlFor="image-upload-image"
        className="font-bold flex items-center gap-2 text-14 cursor-pointer rtl:text-[16px]"
      >
        <FiUpload size={18} />
        {t("uploadPic")}
      </label>
      {errors.image && touched.image && (
        <div className="text-red-500 text-sm mt-1">{errors.image}</div>
      )}
    </div>
  );
};

export default ImageUploadSection;