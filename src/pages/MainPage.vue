<template>
  <div class="container">
    <UsersTable :users="users" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import UsersTable from "@/components/UsersTable.vue";

export default {
  name: "MainPage",
  components: {
    UsersTable,
  },
  computed: mapState({
    users: (state) => state.user.users,
  }),
  methods: mapActions(["fetchUsers"]),
  created() {
    this.fetchUsers();
  },
};
</script>
