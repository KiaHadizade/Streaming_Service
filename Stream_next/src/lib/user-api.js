import { api } from "./api";

export async function syncUserWithDatabase() {
  try {
    const response = await api.post("/user");

    return response.data;
  } catch (error) {
    console.error("Failed to sync user:", error);

    return null;
  }
}
