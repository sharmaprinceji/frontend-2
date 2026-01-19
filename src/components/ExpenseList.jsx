import React, { useState, useEffect } from "react";
import { fetchExpenses } from "../api/expenses";
import "./ExpenseList.css";

export default function ExpenseList({ reload }) {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  const getAmount = (amount) => {
    if (typeof amount === "object" && amount.$numberDecimal) {
      return Number(amount.$numberDecimal);
    }
    return Number(amount);
  };

  // const loadExpenses = async () => {
  //   const res = await fetchExpenses(category, sort);
  //   const result = res.data.data ?? res.data;
  //   setExpenses(result);
  // };
  
  const loadExpenses = async () => {
  try {
    setLoading(true);
    setError("");
    const res = await fetchExpenses(category, sort);
    setExpenses(res.data.data ?? res.data);
  } catch(err) {
    setError("Failed to load expenses");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadExpenses();
  }, [category, sort, reload]);

  const total = expenses.reduce((sum, e) => sum + getAmount(e.amount), 0);
  const formattedTotal = total.toLocaleString("en-IN");

  return (
    <div className="expense-list-container">
      <div className="controls-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">No Sort</option>
          <option value="date_desc">Date: Newest First</option>
        </select>
      </div>

      <div className="total-display">
        Showing {expenses.length} expenses • Total: ₹{formattedTotal}
      </div>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e._id}>
              <td>₹{getAmount(e.amount)}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
