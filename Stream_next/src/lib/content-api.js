// src/lib/content-api.ts

import { api } from "./api";

export async function getContents(params = {}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await api.get("/content", {
    params: params,
  });

  return response.data;
}

/* import { api } from "./api";

export async function getContents(type = "", release = "") {
  const response = await api.get("/content", {
    params: {
      type,
      release,
    },
  });

  return response.data;
}
 */
