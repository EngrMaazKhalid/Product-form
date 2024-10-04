import { db } from "../../../lib/db"; // Adjust this path as needed

export async function GET(req) {
  try {
    const categories = await db.query(
      "SELECT * FROM categories ORDER BY level, parent_id"
    );
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching categories" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(req) {
  try {
    const { name, parent_id, level } = await req.json();
    await db.query(
      "INSERT INTO categories (name, parent_id, level) VALUES (?, ?, ?)",
      [name, parent_id, level]
    );
    return new Response(
      JSON.stringify({ message: "Category added successfully" }),
      { status: 201,
        headers: {
        'Content-Type': 'application/json',
      },
       }
    );
  } catch (error) {
    console.error("Error adding category:", error);
    return new Response(JSON.stringify({ message: "Error adding category" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
