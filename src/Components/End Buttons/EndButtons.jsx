import { ClipLoader } from "react-spinners";
import { FaCircleCheck } from "react-icons/fa6";

function EndButtons({ isLoading , onclick}) {
  return (
    <div className="mt-4 flex items-center gap-3 justify-end">
      <button
        onClick={onclick}
        type="button"
        className="bg-gray-100 font-bold text-gray-400 p-3 w-36 rounded-md"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="p-3 bg-primary font-bold text-white rounded-md w-36 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <ClipLoader size={22} color="#fff" />
        ) : (
          <>
            <FaCircleCheck size={17} />
            Save
          </>
        )}
      </button>
    </div>
  );
}
export default EndButtons;