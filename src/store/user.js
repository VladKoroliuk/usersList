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
    deleteUsers(state, users) {
      users.forEach((userID) => {
        state.users = state.users.filter((user) => userID !== user.id);
      });
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
