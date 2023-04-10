import { createServer, Model } from "miragejs";
import data from "../data/index.json";

export enum ENDPOINT {
  CUSTOMERS = "CUSTOMERS",
}

export enum MODEL {
  CUSTOMER = "CUSTOMER",
}

export const server = createServer({
  models: {
    [MODEL.CUSTOMER]: Model,
  },

  routes() {
    this.get(ENDPOINT.CUSTOMERS, () => data.customers);
  },
});
