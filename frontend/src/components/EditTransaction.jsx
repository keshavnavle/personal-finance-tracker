/** @format */

import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
function EditTransaction({ transaction, closeEdit, fetchTransactions }) {
  const [formData, setFormData] = useState({
    title: transaction.title,
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/transactions/${transaction._id}`, formData);

      toast.success("Transaction Updated Successfully");
      fetchTransactions();

      closeEdit();
    } catch (error) {
      console.log(error);

      toast.error("Failed to Update Transaction");
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/60
      flex
      items-center
      justify-center
      z-50
      px-4
    ">
      <div
        className="
        bg-slate-900
        rounded-3xl
        p-6
        w-full
        max-w-md
      ">
        <h2
          className="
          text-2xl
          font-bold
          text-purple-400
          mb-5
        ">
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <input
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-800">
            <option>Income</option>
            <option>Expense</option>
          </select>

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-slate-800"
          />

          <button
            className="
              w-full
              bg-purple-600
              py-3
              rounded-xl
              font-bold
            ">
            Update Transaction
          </button>

          <button
            type="button"
            onClick={closeEdit}
            className="
              w-full
              bg-red-500
              py-3
              rounded-xl
            ">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTransaction;
