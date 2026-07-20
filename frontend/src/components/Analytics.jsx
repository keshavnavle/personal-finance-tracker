/** @format */

function Analytics({ incomePercentage, expensePercentage, totalTransactions }) {
  return (
    <div className="mt-10 bg-slate-900 rounded-3xl p-8 border border-slate-800">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">📊 Analytics</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-2">Income Ratio</p>

          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{
                width: `${incomePercentage}%`,
              }}></div>
          </div>

          <p className="mt-2 text-green-400">{incomePercentage}%</p>
        </div>

        <div>
          <p className="mb-2">Expense Ratio</p>

          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full"
              style={{
                width: `${expensePercentage}%`,
              }}></div>
          </div>

          <p className="mt-2 text-red-400">{expensePercentage}%</p>
        </div>
      </div>

      <div className="mt-8 text-gray-300">
        Total Transactions
        <span className="text-white font-bold ml-2">{totalTransactions}</span>
      </div>
    </div>
  );
}

export default Analytics;
