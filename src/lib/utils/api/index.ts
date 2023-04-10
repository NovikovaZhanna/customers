import { ENDPOINT } from "@/lib/server";

export const getFetch = async (endpoint: ENDPOINT) => {
  return fetch(endpoint).then((response) => response.json());
};
