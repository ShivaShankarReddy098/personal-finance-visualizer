import { connectToDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const transactions = await Transaction.find();
  return NextResponse.json(transactions);
}
export async function POST(req) {
  await connectToDB();
  const { amount, date, description } = await req.json();
  const newTransaction = new Transaction({ amount, date, description });
  await newTransaction.save();
  return NextResponse.json(newTransaction, { status: 201 });
}
export async function DELETE(req) {
  await connectToDB();
  const { id } = await req.json();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Transaction deleted.." });
}
export async function PATCH(req) {
    try {
        await connectToDB();
        const { id, description, amount, date } = await req.json();

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { description, amount, date },
            { new: true } 
        );

        if (!updatedTransaction) {
            return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating transaction", error }, { status: 500 });
    }
}
