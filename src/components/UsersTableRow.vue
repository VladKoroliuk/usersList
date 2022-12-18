<template>
  <tr
    class="table-row"
    @click="toggleSelect"
    :class="{ 'table-row_selected': isSelected }"
  >
    <td>{{ user.id }}</td>
    <td>{{ user.name }}</td>
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
  </tr>
</template>
<script>
export default {
  name: "UsersTableRow",
  emits: ["select", "unselect"],
  props: {
    user: {
      type: Object,
      required: true,
    },
    selectedRows: {
      type: Array,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    toggleSelect() {
      this.$emit("select", this.user.id);
    },
  },
};
</script>
