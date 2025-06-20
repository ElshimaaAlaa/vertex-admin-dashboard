import { IoCalendarNumberOutline } from "react-icons/io5";

const ActivityCard = ({ description, date }) => (
  <div className="flex items-center justify-between bg-white px-4 py-6 rounded-lg ">
    <p className="text-sm text-gray-700 flex-1 truncate">{description}</p>
    <div className="flex items-center gap-2 text-gray-500 text-14 ">
      <span>{date}</span>
      <IoCalendarNumberOutline color="#69ABB5" size={15} />
    </div>
  </div>
);

export default ActivityCard;
