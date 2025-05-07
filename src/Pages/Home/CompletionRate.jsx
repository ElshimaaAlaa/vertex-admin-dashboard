import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const CompletionRate = () => {
  const [activeSort, setActiveSort] = useState("Weekly");
  const popularProducts = [
    { name: "Item 1", percentage: 95 },
    { name: "Item 2", percentage: 80 },
    { name: "Item 3", percentage: 70 },
    { name: "Item 4", percentage: 65 },
    { name: "Item 5", percentage: 55 },
  ];

  return (
    <div className="relative z-10">
      <h3 className="font-bold text-17 mb-4">Completion Rate</h3>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-15">
          Top
          <span className="text-primary text-lg font-bold mx-1.5">5</span>
          Popular Products
        </h3>
        <div className="ml-auto flex items-center gap-1 text-sm px-2 py-1 cursor-pointer">
          <p className="text-black text-14">
            Sort by:
            <span className="text-gray-400 ms-2 text-13">{activeSort}</span>
          </p>
          <IoIosArrowDown />
        </div>
      </div>

      <div className="space-y-3">
        {popularProducts.map((product, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-24 text-sm underline">{product.name}</div>
            <div className="flex-1 bg-gray-100 h-6 rounded-sm overflow-hidden">
              <div
                className="h-full bg-primary flex items-center justify-end pr-2 font-bold text-white text-sm"
                style={{ width: `${product.percentage}%` }}
              >
                {product.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CompletionRate;