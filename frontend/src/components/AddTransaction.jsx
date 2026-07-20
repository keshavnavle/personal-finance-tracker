/** @format */

import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

function AddTransaction({ fetchTransactions }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "Income",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/transactions", {
        title: formData.title,
        amount: Number(formData.amount),
        type: formData.type,
        category: formData.category,
      });

      toast.success("Transaction Added Successfully");
      setFormData({
        title: "",
        amount: "",
        type: "Income",
        category: "",
      });

      fetchTransactions();
    } catch (error) {
      console.log(error);
      console.log(error.response);

      toast.error(error.response?.data?.message || "Failed to Add Transaction");
    } finally {
      setLoading(false);
    }
  };

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
        text-3xl
        font-bold
        mb-6
        text-purple-400
      ">
        ➕ Add Transaction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        ">
        <input
          type="text"
          name="title"
          placeholder="Transaction Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="
            p-4
            rounded-xl
            bg-slate-900
            border
            border-slate-700
            text-white
            outline-none
            focus:border-purple-500
          "
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount ₹"
          value={formData.amount}
          onChange={handleChange}
          required
          className="
            p-4
            rounded-xl
            bg-slate-900
            border
            border-slate-700
            text-white
            outline-none
            focus:border-purple-500
          "
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="
            p-4
            rounded-xl
            bg-slate-900
            border
            border-slate-700
            text-white
            outline-none
          ">
          <option value="Income">Income</option>

          <option value="Expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category (Food, Salary etc.)"
          value={formData.category}
          onChange={handleChange}
          required
          className="
            p-4
            rounded-xl
            bg-slate-900
            border
            border-slate-700
            text-white
            outline-none
            focus:border-purple-500
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            md:col-span-2
            bg-gradient-to-r
            from-purple-600
            to-pink-600
            hover:scale-105
            transition
            py-4
            rounded-xl
            font-bold
            text-lg
            disabled:opacity-50
          ">
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
