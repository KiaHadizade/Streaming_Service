import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const pool = await getConnection();

    // Check if user already exists
    const existingUser = await pool.request().input("clerkId", userId).query(`
        SELECT user_id
        FROM Users
        WHERE clerk_id = @clerkId
      `);

    if (existingUser.recordset.length > 0) {
      return NextResponse.json({
        message: "User already exists",
      });
    }

    const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";

    const firstName = clerkUser.firstName || "";
    const lastName = clerkUser.lastName || "";

    let username = clerkUser.username || email.split("@")[0] || `user_${userId.slice(0, 8)}`;

    // Ensure username is unique
    const usernameCheck = await pool.request().input("username", username).query(`
        SELECT user_id
        FROM Users
        WHERE username = @username
      `);

    if (usernameCheck.recordset.length > 0) {
      username = `${username}_${Date.now()}`;
    }

    await pool
      .request()
      .input("clerkId", userId)
      .input("username", username)
      .input("email", email)
      .input("firstName", firstName)
      .input("lastName", lastName).query(`
        INSERT INTO Users (
          clerk_id,
          username,
          email,
          first_name,
          last_name
        )
        VALUES (
          @clerkId,
          @username,
          @email,
          @firstName,
          @lastName
        )
      `);

    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
