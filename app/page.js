"use client";
import { useEffect, useState } from "react";
import TransactionList from "@/components/TransactionList";
import AddTransaction from "@/components/AddTransaction";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions on load
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        toast.error("Failed to load transactions.");
      }
    }
    fetchTransactions();
  }, []);
  const data = transactions.map((t) => ({
    month: new Date(t.date).toLocaleString("default", { month: "short" }),
    amount: t.amount,
  }));

  async function handleAddTransaction(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
  }

  function handleEdit(updatedTransaction) {
    setTransactions((prev) =>
      prev.map((t) =>
        t._id === updatedTransaction._id ? updatedTransaction : t
      )
    );
    // toast.success("Transaction updated successfully!");
  }

  async function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t._id !== id));
    // toast.success("Transaction deleted successfully.");
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Tracker</h1>
      <AddTransaction setTransactions={handleAddTransaction} />
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      {/* <Chart transactions={transactions} /> */}
      <h2 className="text-xl font-bold mt-6">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
