import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { useTranslation } from "react-i18next";
const RevenueTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="text-teal-500 font-medium">${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const RevenueChart = ({ data }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = data?.map((item) => ({
    month: monthNames[item.month - 1],
    value: parseFloat(item.income),
    highlight: parseFloat(item.income) > 0,
  }));

  const maxValue = Math.max(...chartData.map((item) => item.value), 0);
  const { t } = useTranslation();
  return (
    <div className="relative z-10 ">
      <h3 className="font-bold text-17 rtl:text-[17px]">{t("monthlyRevenue")}</h3>
      <div className="flex items-center justify-between my-3">
        <p className="text-primary font-bold text-lg">
          ${chartData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
        </p>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#69ABB5]"></div>
          <span className="text-gray-400 text-14">{t("monthlyRevenue")}</span>
        </div>
      </div>

      <div className="h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              tickFormatter={(value) => `$${value}`}
              domain={[0, maxValue * 1.1]}
            />
            <Tooltip content={<RevenueTooltip />} />
            <Bar
              dataKey="value"
              fill="#F6BA6F"
              radius={[0, 0, 0, 0]}
              barSize={30}
            />
            {chartData.map(
              (item, index) =>
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
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default RevenueChart;