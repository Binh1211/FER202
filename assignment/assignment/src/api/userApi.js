import { userClient } from "./axiosClient";

const userApi = {
  getAll: () => userClient.get("/users"),
  getById: (id) => userClient.get(`/users/${id}`),
  create: (data) => userClient.post("/users", data),
  update: (id, data) => userClient.put(`/users/${id}`, data),
  delete: (id) => userClient.delete(`/users/${id}`),

  login: async (identifier, password) => {
    const [byUsername, byEmail] = await Promise.all([
      userClient.get(`/users?username=${identifier}&password=${password}`),
      userClient.get(`/users?email=${identifier}&password=${password}`),
    ]);

    if (byUsername.data.length > 0) return byUsername.data[0];
    if (byEmail.data.length > 0) return byEmail.data[0];

    return null; // login thất bại
  },
};

export default userApi;
