"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddTransaction({ setTransactions }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description || !amount || !date) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount, date }),
      });

      if (!res.ok) throw new Error("Failed to add transaction");

      const newTransaction = await res.json();
      setTransactions(newTransaction); // ✅ Update UI instantly
      toast.success("Transaction added successfully!");

      // Clear form fields
      setDescription("");
      setAmount("");
      setDate("");
    } catch (error) {
      toast.error("Error adding transaction.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full text-black"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full text-black"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full text-black"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded-md"
      >
        Add Transaction
      </button>
    </form>
  );
}
