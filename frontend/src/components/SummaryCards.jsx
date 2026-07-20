/** @format */

function SummaryCards({ balance, income, expenses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-3xl p-7 shadow-xl">
        <p className="text-lg">Balance</p>
        <h2 className="text-4xl font-bold mt-3">₹{balance}</h2>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl p-7 shadow-xl">
        <p className="text-lg">Income</p>
        <h2 className="text-4xl font-bold mt-3">₹{income}</h2>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-7 shadow-xl">
        <p className="text-lg">Expenses</p>
        <h2 className="text-4xl font-bold mt-3">₹{expenses}</h2>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-7 shadow-xl">
        <p className="text-lg">Savings</p>
        <h2 className="text-4xl font-bold mt-3">₹{balance}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;
