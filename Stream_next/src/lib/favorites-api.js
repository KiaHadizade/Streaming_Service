import { api } from "./api";

export async function getFavoriteStatus(content_id) {
  const response = await api.get("/favorites", {
    params: { content_id },
  });

  return response.data;
}

export async function addFavorite(content_id) {
  const response = await api.post("/favorites", {
    content_id,
  });

  return response.data;
}

export async function removeFavorite(content_id) {
  const response = await api.delete("/favorites", {
    data: {
      content_id,
    },
  });

  return response.data;
}
