import React, { useState } from "react";
import { createExpense } from "../api/expenses";
import "./ExpenseForm.css";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExpense(form);
    onAdd && onAdd(); // notify parent (App)
    setForm({ amount: "", category: "", description: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>Add Expense</h3>

      <input name="amount" type="number" placeholder="Amount" value={form.amount}
        onChange={handleChange} required />

      <input name="category" type="text" placeholder="Category" value={form.category}
        onChange={handleChange} required />

      <input name="description" type="text" placeholder="Description" value={form.description}
        onChange={handleChange} />

      <input name="date" type="date" value={form.date}
        onChange={handleChange} required />

      <button type="submit">Add Expense</button>
    </form>
  );
}
