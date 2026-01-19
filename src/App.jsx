import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import "./App.css";

export default function App() {
  const [reload, setReload] = useState(false);

  return (
    <div className="layout-container">
      <div className="left-panel">
        <ExpenseForm onAdd={() => setReload(!reload)} />
      </div>

      <div className="right-panel">
        <ExpenseList reload={reload} />
      </div>
    </div>
  );
}
