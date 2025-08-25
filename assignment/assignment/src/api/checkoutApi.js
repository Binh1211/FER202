import { checkoutClient } from "./axiosClient";

const checkoutApi = {
  getAll: () => checkoutClient.get("/checkouts"),
  getById: (id) => checkoutClient.get(`/checkouts/${id}`),
  create: (data) => checkoutClient.post("/checkouts", data),
  update: (id, data) => checkoutClient.put(`/checkouts/${id}`, data),
  delete: (id) => checkoutClient.delete(`/checkouts/${id}`),
};

export default checkoutApi;
