<template>
  <div>
    <div class="controls">
      <div>
        <div class="search">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Enter your search query"
            @input="page = 0"
          />
          <div>
            <select v-model="sortBy">
              <option value="id" selected>No sorting</option>
              <option value="name">Name</option>
              <option value="username">User name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>
        </div>
      </div>
      <div v-if="selected.length != 0">
        <button class="default-btn" @click="removeUsers">
          Delete {{ selected.length }}
          {{ selected.length > 1 ? "users" : "user" }}
        </button>
      </div>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>User name</th>
          <th>email</th>
          <th>phone</th>
        </tr>
      </thead>
      <tbody>
        <UsersTableRow
          v-for="user in paginatedAndSearchedAndSortedUsers"
          :key="user.id"
          :user="user"
          :selectedRows="selected"
          :isSelected="isUserSelected(user.id)"
          @select="toggleSelect"
        />
      </tbody>
      <tfoot>
        <tr>
          <td scope="row" colspan="2">Total users</td>
          <td colspan="2">{{ users.length }}</td>
        </tr>
      </tfoot>
    </table>
    <div>
      <UsersPagination
        v-model="page"
        :contentLength="sortedAndSearchedUsers.length"
        :contentPerPage="usersPerPage"
      />
    </div>
  </div>
</template>
<script>
import UsersTableRow from "./UsersTableRow.vue";
import UsersPagination from "./UsersPagination.vue";
import { mapMutations } from "vuex";

export default {
  name: "UserTable",
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  components: {
    UsersTableRow,
    UsersPagination,
  },
  data: function () {
    return {
      page: 0,
      usersPerPage: 10,
      searchQuery: "",
      selected: [],
      sortBy: "id",
    };
  },
  methods: {
    ...mapMutations(["deleteUsers"]),
    toggleSelect(userID) {
      if (this.isUserSelected(userID)) {
        this.selected = this.selected.filter((id) => userID !== id);
      } else {
        this.selected = [...this.selected, userID];
      }
    },
    isUserSelected(userId) {
      const candidate = this.selected.find((id) => id === userId);
      return !!candidate;
    },
    removeUsers() {
      const sure = confirm("Are you sure?");
      if (sure) {
        this.deleteUsers(this.selected);
      }
      this.selected = [];
    },
  },
  computed: {
    paginatedAndSearchedAndSortedUsers() {
      const start = this.page * this.usersPerPage;
      const end = start + this.usersPerPage;
      return this.sortedAndSearchedUsers.slice(start, end);
    },
    sortedAndSearchedUsers() {
      const users = JSON.parse(JSON.stringify(this.searchedUsers));

      const sortForNumbers = (a, b) => {
        return a[this.sortBy] - b[this.sortBy];
      };

      const sortForStrings = (a, b) => {
        return a[this.sortBy].localeCompare(b[this.sortBy]);
      };

      const sorted = users.sort(
        typeof this.users[0][this.sortBy] === "string"
          ? sortForStrings
          : sortForNumbers
      );
      return sorted;
    },
    searchedUsers() {
      if (!this.searchQuery) {
        return this.users;
      }

      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>
