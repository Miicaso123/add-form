import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./../styles/formm.css"; 

const Form = () => {
  const [date, setDate] = useState("");
  const [sum, setSum] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { dateTime: date, sum, category, comment, author: "User" };

    console.log("Data being sent:", data);

    const response = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Expense added!", { position: "top-center" });
      setDate("");
      setSum("");
      setCategory("");
      setComment("");
    } else {
      toast.error("Failed to add expense.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="expense-form">
        <h2 className="text-center mb-4">Add Expense</h2>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input 
            type="date" 
            id="date"
            className="form-control" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sum" className="form-label">Sum:</label>
          <input 
            type="number" 
            inputmode="decimal"
            id="sum"
            className="form-control" 
            value={sum} 
            onChange={(e) => {
              const value = e.target.value;
              if(value >= 0 || value === "") {
                setSum(value);
              }
            }} 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <select 
            id="category" 
            className="form-select" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
          >
            <option value="">Select...</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comment:</label>
          <input 
            type="text" 
            id="comment" 
            className="form-control" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Form;
