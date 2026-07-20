/** @format */

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ income, expenses }) {
  const data = [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expense",
      value: expenses,
    },
  ];

  return (
    <div
      className="
      bg-slate-800
      rounded-3xl
      p-6
      shadow-xl
      mt-10
    ">
      <h2
        className="
        text-2xl
        font-bold
        mb-5
        text-purple-400
      ">
        📊 Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label>
            <Cell fill="#22c55e" />

            <Cell fill="#ef4444" />
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
