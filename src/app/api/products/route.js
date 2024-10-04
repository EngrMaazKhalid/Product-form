// import { db } from "../../../lib/db"; // Adjust this path as needed

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { category_id, name, description, price, stock_quantity } = req.body;

//     if (!category_id || !name || !price || !stock_quantity) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//       await db.query(
//         'INSERT INTO product_table (category_id, name, description, price, stock_quantity) VALUES (?, ?, ?, ?, ?)',
//         [category_id, name, description, price, stock_quantity]
//       );
//       res.status(201).json({ message: 'Product added successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error adding product' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
import { db } from "@/lib/db"; // Adjust the path as per your structure
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { category_id, name, description, price, stock_quantity } = await req.json();

    if (!category_id || !name || !price || !stock_quantity) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await db.query(
      'INSERT INTO product_table (category_id, name, description, price, stock_quantity) VALUES (?, ?, ?, ?, ?)',
      [category_id, name, description, price, stock_quantity]
    );

    return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: 'Error adding product' }, { status: 500 });
  }
}
