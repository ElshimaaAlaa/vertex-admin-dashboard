import { RiUploadCloud2Line } from "react-icons/ri";

export const ImageUpload = ({ previewImage, onImageChange, name, error }) => {
  const inputId = `image-upload-${name}`;
  
  return (
    <div className="relative border-2 w-28 h-24 border-dashed bg-customOrange-lightOrange border-primary rounded-md p-1 flex items-center justify-center overflow-hidden">
      <input
        type="file"
        name={name}
        onChange={onImageChange}
        className="hidden"
        id={inputId}
        accept="image/*"
        aria-label="Upload user image"
      />
      <label
        htmlFor={inputId}
        className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center"
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-full object-cover rounded-md p-1"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-gray-500">
            <RiUploadCloud2Line size={21} color="#E0A75E" />
          </div>
        )}
      </label>
      {error && (
        <p className="absolute -bottom-5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};