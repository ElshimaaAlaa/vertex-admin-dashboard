import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { FaArrowRight } from "react-icons/fa";

const SalesTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.highlight) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="font-bold text-primary">${data.value}</p>
          <p className="text-gray-600 text-sm">Sales in {data.month}</p>
        </div>
      );
    }
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="text-teal-500 font-medium">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const SalesChart = ({ data }) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const chartData = data.map(item => ({
    month: monthNames[item.month - 1],
    value: parseFloat(item.income),
    highlight: parseFloat(item.income) > 0
  }));

  const calculatePerformance = () => {
    if (data.length === 0) return 0;
    
    const lastMonthIncome = parseFloat(data[data.length - 1].income);
    const firstMonthIncome = parseFloat(data[0].income) || 1;
    
    return Math.round((lastMonthIncome / firstMonthIncome) * 100);
  };

  return (
    <div className="relative z-10">
      <div className="flex flex-col items-center justify-center gap-1">
        <h3 className="font-bold text-17">Sales Change Rate</h3>
        <span className="text-gray-400 text-12">Jan - Dec</span>
      </div>

      <div className="h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f8f8f8"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
              hide
            />
            <Tooltip content={<SalesTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4aadb5"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 8,
                fill: "#4aadb5",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
            {chartData?.map((item, index) => (
              item.highlight && (
                <ReferenceDot
                  key={index}
                  x={item.month}
                  y={item.value}
                  r={4}
                  fill="#4aadb5"
                  stroke="none"
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-3 items-center justify-center mt-5">
        <div className="flex gap-2">
          <h1 className="text-lg font-bold">
            {calculatePerformance()}%
          </h1>
          <p className="text-13 leading-normal text-gray-600 w-64 text-center">
            Your sales performance compared to the beginning of the year
          </p>
        </div>
        <button className="text-primary text-15 flex items-center gap-3 font-semibold">
          View Details <FaArrowRight />
        </button>
      </div>
    </div>
  );
};
export default SalesChart;