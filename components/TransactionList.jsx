"use client";
import toast from "react-hot-toast";
import EditTransactionForm from "./EditTransactionForm";
import { useState } from "react";

export default function TransactionList({ transactions, onDelete, onEdit }) {
  const [editingTransaction, setEditingTransaction] = useState(null);
  async function handleDelete(id) {
    try {
      await fetch("/api/transactions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      onDelete(id); // ✅ Remove from UI immediately
      toast.success("Transaction deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete transaction.");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
            >
              <div>
                <p className="font-bold text-black">{transaction.description}</p>
                <p className="text-sm text-gray-600">
                  ${transaction.amount} -{" "}
                  {new Date(transaction.date).toDateString()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingTransaction(transaction)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(transaction._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingTransaction && (
        <EditTransactionForm
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSave={onEdit}
        />
      )}
    </div>
  );
}
