import React from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";

const ActivitieCard = ({ icon, description, date }) => (
  <div className="flex items-center justify-between bg-white p-3 rounded-md">
    <span className="flex items-center text-14 gap-2">
      {icon}
      {description}
    </span>
    <span className="flex items-center gap-2 text-gray-400 text-13 bg-gray-100 rounded-md p-3">
      <IoCalendarNumberOutline color="#69ABB5" size={15} />
      {date}
    </span>
  </div>
);

export default ActivitieCard;