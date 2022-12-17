<template>
  <div>
    <div class="controls">
      <div class="search">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter your search query"
          @input="page = 1"
        />
      </div>
      <div class="pagination">
        <button @click="prevPage">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 19L8.5 12L15.5 5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button @click="nextPage">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 19L15.5 12L8.5 5"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
        <tr v-for="user in paginatedAndSearchedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colspan="2">Total users</th>
          <td colspan="2">{{ users.length }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  name: "UserTable",
  data: function () {
    return {
      page: 1,
      perPage: 10,
      searchQuery: "",
    };
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    nextPage() {
      const isEnd = this.page == this.pages - 1;
      if (isEnd) {
        return;
      }
      this.page++;
    },
    prevPage() {
      if (this.page === 1) {
        return;
      }
      this.page--;
    },
  },
  computed: {
    pages() {
      const length = this.searchedUsers.length;

      if (length < this.perPage) {
        return 1;
      }
      return Math.ceil(length / this.perPage);
    },
    paginatedAndSearchedUsers() {
      const start = this.page * this.perPage;
      const end = start + this.perPage;
      return this.searchedUsers.slice(start - 1, end);
    },
    searchedUsers() {
      if (!this.searchQuery) {
        return this.users;
      }

      const query = this.searchQuery.toLowerCase();

      return this.users.filter(
        (user) => user.name.toLowerCase().indexOf(query) > -1
      );
    },
  },
};
</script>
