/** @format */
import Analytics from "../components/Analytics";
import SummaryCards from "../components/SummaryCards";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import AddTransaction from "../components/AddTransaction";
import ExpenseChart from "../components/ExpenseChart";
import EditTransaction from "../components/EditTransaction";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);

  const [editTransaction, setEditTransaction] = useState(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [monthFilter, setMonthFilter] = useState("All");

  // Fetch Transactions

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");

      setTransactions(res.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Delete Transaction

  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);

      toast.success("Transaction Deleted Successfully");
      fetchTransactions();
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed");
    }
  };

  // Logout

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out Successfully");
    navigate("/login");
  };

  // Income

  const income = useMemo(() => {
    return transactions

      .filter((item) => item.type === "Income")

      .reduce((sum, item) => sum + Number(item.amount), 0);
  }, [transactions]);

  // Expenses

  const expenses = useMemo(() => {
    return transactions

      .filter((item) => item.type === "Expense")

      .reduce((sum, item) => sum + Number(item.amount), 0);
  }, [transactions]);

  const balance = income - expenses;

  const totalTransactions = transactions.length;

  const incomePercentage =
    income + expenses === 0
      ? 0
      : ((income / (income + expenses)) * 100).toFixed(1);

  const expensePercentage =
    income + expenses === 0
      ? 0
      : ((expenses / (income + expenses)) * 100).toFixed(1);

  const availableMonths = [
    "All",
    ...new Set(
      transactions.map((item) =>
        new Date(item.date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
      ),
    ),
  ];

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesType = filter === "All" || item.type === filter;

    const matchesCategory =
      categoryFilter === "All" ||
      item.category.toLowerCase() === categoryFilter.toLowerCase();

    const transactionMonth = new Date(item.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const matchesMonth =
      monthFilter === "All" || transactionMonth === monthFilter;

    return matchesSearch && matchesType && matchesCategory && matchesMonth;
  });

  return (
    <div
      className="
min-h-screen
w-full
overflow-x-hidden
bg-slate-950
text-white
scrollbar-hide
">
      {/* Navbar */}

      <nav
        className="
sticky
top-0
z-50
bg-slate-900/90
backdrop-blur
border-b
border-slate-800
">
        <div
          className="
max-w-7xl
w-full
mx-auto
flex
justify-between
items-center
px-6
py-4
">
          <div>
            <h1
              className="
text-3xl
font-bold
text-purple-400
">
              💰 Finance Tracker
            </h1>

            <p
              className="
text-gray-400
text-sm
">
              Personal Expense Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
bg-red-500
hover:bg-red-600
px-6
py-2
rounded-xl
font-semibold
transition
">
            Logout
          </button>
        </div>
      </nav>

      {/* Main */}

      <div
        className="
max-w-7xl
w-full
mx-auto
px-5
py-10
overflow-hidden
">
        <div className="mb-10">
          {" "}
          <h2
            className="
text-5xl
font-bold
">
            Welcome 👋
          </h2>
          <p
            className="
text-gray-400
mt-3
">
            Manage your income and expenses easily.
          </p>
        </div>
        {/* Cards */}
        <SummaryCards balance={balance} income={income} expenses={expenses} />

        <Analytics
          incomePercentage={incomePercentage}
          expensePercentage={expensePercentage}
          totalTransactions={totalTransactions}
        />
        {/* Expense Chart */}
        <div className="mt-12">
          <ExpenseChart income={income} expenses={expenses} />
        </div>
        {/* Add Transaction */}
        <div className="mt-12">
          <AddTransaction fetchTransactions={fetchTransactions} />
        </div>
        {/* Recent Transactions */}
        <div className="mt-12">
          {/* Header */}
          <div
            className="
    flex
    flex-col
    lg:flex-row
    lg:items-center
    lg:justify-between
    gap-5
    mb-8
  ">
            <div>
              <h2
                className="
        text-3xl
        sm:text-4xl
        font-bold
        text-white
      ">
                Recent Transactions
              </h2>

              <p
                className="
        text-gray-400
        mt-2
        text-sm
        sm:text-base
      ">
                Manage your income and expenses easily
              </p>
            </div>

            {/* Records */}
            <div
              className="
      bg-slate-800
      border
      border-slate-700
      px-5
      py-3
      rounded-2xl
      text-gray-300
      font-semibold
      w-fit
    ">
              📊 {filteredTransactions.length} Records
            </div>
          </div>

          {/* Search */}

          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
        w-full
        rounded-2xl
        bg-slate-800
        border
        border-slate-700
        px-5
        py-4
        text-white
        placeholder-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-purple-500
        transition
      "
            />
          </div>

          {/* Filters */}

          <div
            className="
    flex
    flex-col
    lg:flex-row
    gap-4
    mb-8
  ">
            {/* Buttons */}

            <div
              className="
      flex
      flex-col
      sm:flex-row
      gap-3
      flex-1
    ">
              <button
                onClick={() => setFilter("All")}
                className={`
          flex-1
          py-3
          rounded-2xl
          font-semibold
          transition
          ${
            filter === "All"
              ? "bg-gradient-to-r from-purple-600 to-pink-600"
              : "bg-slate-800 hover:bg-slate-700"
          }
        `}>
                📋 All
              </button>

              <button
                onClick={() => setFilter("Income")}
                className={`
          flex-1
          py-3
          rounded-2xl
          font-semibold
          transition
          ${
            filter === "Income"
              ? "bg-green-600"
              : "bg-slate-800 hover:bg-slate-700"
          }
        `}>
                💰 Income
              </button>

              <button
                onClick={() => setFilter("Expense")}
                className={`
          flex-1
          py-3
          rounded-2xl
          font-semibold
          transition
          ${
            filter === "Expense"
              ? "bg-red-600"
              : "bg-slate-800 hover:bg-slate-700"
          }
        `}>
                💸 Expense
              </button>
            </div>

            {/* Category */}

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="
        w-full
        lg:w-64
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        px-5
        py-3
        text-white
        font-medium
        outline-none
        focus:ring-2
        focus:ring-purple-500
      ">
              <option value="All">All Categories</option>

              <option value="Salary">Salary</option>

              <option value="Food">Food</option>

              <option value="Shopping">Shopping</option>

              <option value="Bills">Bills</option>

              <option value="Travel">Travel</option>

              <option value="Entertainment">Entertainment</option>
            </select>

            {/* Month */}

            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="
        w-full
        lg:w-64
        bg-slate-800
        border
        border-slate-700
        rounded-2xl
        px-5
        py-3
        text-white
        font-medium
        outline-none
        focus:ring-2
        focus:ring-purple-500
      ">
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {transactions.length === 0 ? (
            <div
              className="
bg-slate-800
rounded-2xl
p-10
text-center
">
              <h3
                className="
text-2xl
">
                No Transactions Found
              </h3>

              <p
                className="
text-gray-400
mt-3
">
                Add your first transaction above.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredTransactions.map((item) => (
                <div
                  key={item._id}
                  className="
      bg-slate-800/80
      border
      border-slate-700
      hover:border-purple-500
      rounded-3xl
      p-5
      shadow-lg
      hover:shadow-purple-500/20
      transition-all
      duration-300
    ">
                  {/* Top Section */}

                  <div className="flex justify-between items-start gap-4">
                    {/* Left */}

                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white break-words">
                        {item.title}
                      </h3>

                      <p className="text-gray-400 text-sm mt-1">
                        {item.category}
                      </p>

                      <div className="flex items-center mt-3 text-gray-400 text-sm">
                        <span>📅</span>

                        <span className="ml-2">
                          {new Date(item.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Right */}

                    <div className="text-right min-w-[120px]">
                      <p
                        className={`text-xl sm:text-2xl font-bold ${
                          item.type === "Income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}>
                        {item.type === "Income" ? "+" : "-"} ₹{item.amount}
                      </p>

                      <span
                        className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold ${
                          item.type === "Income"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}

                  <div className="border-t border-slate-700 my-5"></div>

                  {/* Buttons */}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setEditTransaction(item)}
                      className="
          flex-1
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          hover:scale-105
          transition-all
          duration-300
          py-3
          rounded-2xl
          font-bold
          shadow-lg
        ">
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => deleteTransaction(item._id)}
                      className="
          flex-1
          bg-gradient-to-r
          from-red-600
          to-pink-600
          hover:scale-105
          transition-all
          duration-300
          py-3
          rounded-2xl
          font-bold
          shadow-lg
        ">
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Developer Credit */}

      <div
        className="
fixed
bottom-4
right-4
max-w-[90%]
bg-slate-900/90
backdrop-blur
px-4
py-2
rounded-full
text-sm
text-gray-400
border
border-slate-700
shadow-lg
">
        Developed by
        <span
          className="
text-purple-400
font-semibold
ml-1
">
          Keshav Navale
        </span>
      </div>

      {/* Edit Popup */}

      {editTransaction && (
        <EditTransaction
          transaction={editTransaction}
          closeEdit={() => setEditTransaction(null)}
          fetchTransactions={fetchTransactions}
        />
      )}
    </div>
  );
}

export default Dashboard;
