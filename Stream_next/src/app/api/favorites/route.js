import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

async function getUserId(pool, clerkId) {
  const result = await pool.request().input("clerkId", clerkId).query(`
      SELECT user_id
      FROM Users
      WHERE clerk_id = @clerkId
    `);

  return result.recordset[0]?.user_id;
}

export async function GET(request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ isFavorite: false }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const content_id = parseInt(searchParams.get("content_id"));

    const pool = await getConnection();

    const userId = await getUserId(pool, clerkId);

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const result = await pool.request().input("userId", userId).input("contentId", content_id).query(`
        SELECT *
        FROM Favorites
        WHERE user_id = @userId
        AND content_id = @contentId
      `);

    return NextResponse.json({
      isFavorite: result.recordset.length > 0,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to check favorite" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content_id } = await request.json();

    const pool = await getConnection();

    const userId = await getUserId(pool, clerkId);

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await pool.request().input("userId", userId).input("contentId", content_id).query(`
        IF NOT EXISTS (
          SELECT 1
          FROM Favorites
          WHERE user_id = @userId
          AND content_id = @contentId
        )
        BEGIN
          INSERT INTO Favorites (
            user_id,
            content_id
          )
          VALUES (
            @userId,
            @contentId
          )
        END
      `);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content_id } = await request.json();

    const pool = await getConnection();

    const userId = await getUserId(pool, clerkId);

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await pool.request().input("userId", userId).input("contentId", content_id).query(`
        DELETE FROM Favorites
        WHERE user_id = @userId
        AND content_id = @contentId
      `);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
  }
}
