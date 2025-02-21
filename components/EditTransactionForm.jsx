"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditTransactionForm({ transaction, onClose, onSave }) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date.split("T")[0]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/transactions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: transaction._id,
          description,
          amount,
          date,
        }),
      });

      if (!res.ok) throw new Error("Failed to update transaction");

      const updatedTransaction = await res.json();

      // ✅ Update parent state immediately
      onSave(updatedTransaction);
      toast.success("Transaction updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("Error updating transaction.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-3 text-black">
          Edit Transaction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
