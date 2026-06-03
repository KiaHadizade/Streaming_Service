import { getConnection } from "./db";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function syncClerkUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);

  const email = clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress || "";

  const username = clerkUser.username || email.split("@")[0] || `user_${userId.slice(-8)}`;

  const pool = await getConnection();

  // Check if user already exists
  const existingUser = await pool.request().input("userId", userId).query(`
      SELECT user_id
      FROM Users
      WHERE user_id = @userId
    `);

  if (existingUser.recordset.length > 0) {
    return {
      synced: false,
      userId,
    };
  }

  // Create user
  await pool.request().input("userId", userId).input("username", username).input("email", email).query(`
      INSERT INTO Users (
        user_id,
        username,
        password,
        email,
        name,
        last_name,
        role,
        created_at
      )
      VALUES (
        @userId,
        @username,
        'clerk-managed',
        @email,
        @username,
        @username,
        'user',
        GETDATE()
      )
    `);

  console.log(`✅ User synced: ${username}`);

  return {
    synced: true,
    userId,
  };
}
