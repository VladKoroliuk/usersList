import { getUsers } from "@/services/users.js";

const userModule = {
  state: {
    users: [],
  },
  getters: {},
  mutations: {
    setUsers(state, users) {
      state.users = getUsers(users);
    },
  },
  actions: {
    fetchUsers(context) {
      const users = getUsers();
      context.commit("setUsers", users);
    },
  },
};

export default userModule;
